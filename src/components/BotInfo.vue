<template>
  <!-- Date time selector -->
  <div class="modal fade" role="dialog" id="bot-info-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <button type="button"
                  class="close"
                  data-dismiss="modal">
            &times;
          </button>
          <!-- Title -->
          <h4 class="modal-title">
            {{ infoMode == 'add' ? 'Add new bot' : 'Bot info' }}
          </h4>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- String (input) item -->
          <div class="form-horizontal" v-for="item in inputData">
            <div class="form-group">
              <!-- Label -->
              <label class="control-label col-sm-2">
                {{ item[0].toUpperCase() + item.slice(1) }}:
              </label>

              <div class="col-sm-8">
                <!-- Add mode -->
                <input v-if="infoMode == 'add'"
                       type="text" class="form-control"
                       v-model="newBot[item]">

                <!-- Info mode -->
                <div v-if="infoMode == 'info'
                           && !editCheckbox[item]
                           && item != 'msg'"
                     class="form-control">
                  {{ bot[item] }}
                </div>

                <textarea rows="3"
                          readonly
                          v-if="infoMode == 'info'
                                && !editCheckbox[item]
                                && item == 'msg'"
                          class="form-control"
                          v-model="bot[item]">
                </textarea>

                <!-- Edit mode -->
                <input v-if="infoMode == 'info'
                             && editCheckbox[item]
                             && item != 'msg'"
                       type="text"
                       class="form-control"
                       v-model="botChanges[item]">

                <textarea rows="3"
                          v-if="infoMode == 'info'
                                && editCheckbox[item]
                                && item == 'msg'"
                          class="form-control"
                          v-model="botChanges[item]">
                </textarea>
              </div>

              <!-- Edit button -->
              <div v-if="infoMode == 'info'" class="col-sm-1">
                <button v-if="!editCheckbox[item] && item != 'name'"
                        @click="setEdit(item)"
                        class="btn btn-primary">
                  Edit
                </button>
                <button v-if="editCheckbox[item]"
                        @click="setEdit(item)"
                        class="btn btn-danger">
                  Reset
                </button>
              </div>
            </div>
          </div>

          <!-- Picker item -->
          <div class="form-horizontal"
               v-if="infoMode == 'info'"
               v-for="item in pickerData">
            <div class="form-group">
              <!-- Label -->
              <label class="control-label col-sm-2">
                {{ item[0].toUpperCase() + item.slice(1) }}:
              </label>

              <!-- Content -->
              <div class="col-sm-8">
                <!-- Info mode -->
                <div class="form-control" v-if="!editCheckbox[item]">
                  {{ parseTime(bot[item]) }}
                </div>

                <!-- Edit mode -->
                <input v-if="editCheckbox[item]"
                       type="time"
                       v-model="botChanges[item]">
              </div>

              <!-- Edit button -->
              <div class="col-sm-1">
                <button v-if="!editCheckbox[item] && item != 'start'"
                        @click="setEdit(item)"
                        class="btn btn-primary">
                  Edit
                </button>
                <button v-if="editCheckbox[item]"
                        @click="setEdit(item)"
                        class="btn btn-danger">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button v-if="infoMode == 'add'"
                  class="btn btn-primary"
                  @click="addNewBot">
            Add
          </button>
          <button v-if="infoMode == 'add'"
                  class="btn btn-warning"
                  @click="discardNewBot">
            Discard
          </button>
          <button v-if="isRunning()"
                  @click="stopRunningTimer"
                  class="btn btn-warning">
            Stop timer
          </button>
          <button v-if="Object.keys(botChanges) != 0"
                  @click="editBotInfo"
                  class="btn btn-primary">
            Set changes
          </button>
          <button v-if="infoMode == 'info'"
                  data-toggle="collapse"
                  data-target="#are-you-sure"
                  @click="setDeleteMode('delete')"
                  class="btn btn-danger">
            Delete
          </button>
          <button class="btn btn-info"
                  data-dismiss="modal">
            Close
          </button>
          <div class="collapse" id="are-you-sure">
            <p>Are you sure ?</p>
            <button class="btn btn-primary"
                    v-if="deleteMode == 'delete'"
                    @click="deleteBot">
              Yes
            </button>
            <button class="btn btn-danger"
                    data-toggle="collapse"
                    data-target="#are-you-sure">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addBot, editBot, removeBot } from '../../utils/model';
import { setTimer, stopTimer, updateTimer } from '../../utils/api';

export default {
  name: 'BotInfo',
  props: ['infoMode', 'bot'],
  data() {
    return {
      inputData: ['name', 'email', 'msg'],
      pickerData: ['start', 'stop'],
      editCheckbox: {
        name: false,
        email: false,
        msg: false,
        start: false,
        stop: false,
      },

      newBot: {
        name: '',
        email: '',
        msg: '',
      },

      botChanges: {},
      deleteMode: '',
    }
  },

  mounted() {
    $('#bot-info-modal').on('hidden.bs.modal', () => {
      this.discardChanges();
      $('#are-you-sure').collapse('hide');
      $('textarea').css('height', '15vh');
    });

    $('#are-you-sure').on('show.bs.collapse', () => {
      $("#bot-info-modal").animate({
        scrollTop: $('#bot-info-modal').prop("scrollHeight")
      }, 400);
    });
  },

  methods: {
    // Refresh
    refresh() {
      $('#bot-info-modal').modal('hide');
      this.$parent.getBotList();
    },

    // Handling checkbox
    setEdit(item) {
      if (!this.editCheckbox[item]) {
        this.botChanges[item] = this.bot[item];
      } else {
        delete this.botChanges[item];
      }

      this.editCheckbox[item] = !this.editCheckbox[item];
    },

    // Set delete mode for yes button of are-you-sure
    setDeleteMode(mode) {
      this.deleteMode = mode;
    },

    // Parse time string to date
    parseTime(time) {
      if (!time) return 'none';
      const date = new Date(parseInt(time));
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    // Get real stop
    getStop(stopString) {
      let picker = stopString.split(':');

      // Get the start-of-the-day point
      let now = new Date();
      let stop = now.getTime();
      stop -= now.getHours() * 3600000;
      stop -= now.getMinutes() * 60000;
      stop -= now.getSeconds() * 1000;
      if (now.getHours() > parseInt(picker[0])) {
        stop += 24 * 3600000;
      }

      // Plus picker to get real stop
      stop += parseInt(picker[0]) * 3600000 + parseInt(picker[1]) * 60000;
      return stop;
    },

    // Clear data in add mode
    discardNewBot() {
      Object.keys(this.newBot).forEach(key => {
        this.newBot[key] = '';
      });
    },

    // Clear all changes
    discardChanges() {
      let keys = Object.keys(this.botChanges)
      if (keys.length != 0) {
        keys.forEach(key => {
          delete this.botChanges[key];
          this.editCheckbox[key] = false;
        });
      }
    },

    // Check if bot is running
    isRunning() {
      return this.bot.stop
        && parseInt(this.bot.stop) > new Date().getTime();
    },

    // Stop timer
    stopRunningTimer() {
      window.plugins.spinnerDialog.show('Stop timer', 'Please wait', true);
      stopTimer(this.bot.email).then(isSuccess => {
        window.plugins.spinnerDialog.hide();
        if (isSuccess) {
          editBot(this.bot.name, { stop: 'null' });
          this.refresh();
        }
      });
    },

    // Add bot
    addNewBot() {
      addBot(this.newBot);
      this.refresh();
    },

    // Update running bot
    updateRunningBot() {
      window.plugins.spinnerDialog.show(
        'Sending update to server', 'Please wait', true
      );
      let update = { email: this.bot.email };
      if (this.botChanges.stop) {
        update.stop = this.getStop(this.botChanges.stop);
      }

      if (this.botChanges.msg) {
        update.msg = this.botChanges.msg;
      }

      updateTimer(update).then(isSuccess => {
        window.plugins.spinnerDialog.hide();
        if (isSuccess) {
          editBot(this.bot.name, this.botChanges);
          this.refresh();
        } else {
          this.discardChanges();
        }
      });
    },

    // Set timer
    startBotTimer() {
      // Use appstate or not
      navigator.notification.confirm(
        'Do you want to login using appstate ?',
        (button) => {
          this.bot.useAppstate = button == 1;
          window.plugins.spinnerDialog.show(
            'Starting timer', 'Please wait', true
          );
          setTimer({
            stop: this.getStop(this.botChanges.stop),
            email: this.bot.email,
            msg: this.botChanges.msg || this.bot.msg,
            useAppstate: this.bot.useAppstate,
          }).then(isSuccess => {
            window.plugins.spinnerDialog.hide();
            if (isSuccess) {
              editBot(this.bot.name, this.botChanges);
              this.refresh();
            } else {
              this.discardChanges();
            }
          });
        },

        'Before you go',
        ['Yes','No']
      );
    },

    // Edit bot info
    editBotInfo() {
      if (this.isRunning()) {
        if (this.botChanges.stop || this.botChanges.msg) {
          this.updateRunningBot();
          return;
        }
      }

      if (!this.isRunning()) {
        if (this.botChanges.stop) {
          this.startBotTimer();
          return;
        }
      }

      editBot(this.bot.name, this.botChanges);
      this.refresh();
    },

    deleteBot() {
      if (this.isRunning()) {
        alert('Please stop this bot first');
        return;
      }

      removeBot(this.bot.name);
      this.refresh();
    },
  },
}
</script>

<style scoped>

textarea {
  resize: vertical;
}

.modal-title {
  word-wrap: break-word;
  text-align: center;
}

.modal-footer {
  text-align: center;
}

.modal-body label {
  float: left;
}

.modal-body button {
  float: left;
}

.modal-header, .modal-footer {
  background-color: #eeeeee;
}

.form-control {
  word-wrap: break-word;
  overflow-y: scroll;
}

#are-you-sure {
  margin-top: 5px;
  background-color: #eeeeee;
}

#are-you-sure button {
  margin-bottom: 6px;
}

</style>
