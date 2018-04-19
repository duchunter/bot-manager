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
            {{infoMode == 'add' ? 'Add new bot' : bot.name}}
          </h4>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="form-horizontal" v-if="infoMode == 'add'">
            <div class="form-group">
              <!-- Label -->
              <label class="control-label col-sm-2">
                Name:
              </label>

              <div class="col-sm-8">
                <!-- Add mode -->
                <input type="text"
                       class="form-control"
                       v-model="newBot.name">
              </div>
            </div>
          </div>

          <div class="form-horizontal" v-for="item in editable">
            <div class="form-group">
              <!-- Label -->
              <label class="control-label col-sm-2">
                {{item[0].toUpperCase() + item.slice(1)}}:
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
                  {{bot[item]}}
                </div>

                <textarea rows="5"
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

                <textarea rows="5"
                          v-if="infoMode == 'info'
                                && editCheckbox[item]
                                && item == 'msg'"
                          class="form-control"
                          v-model="botChanges[item]">
                </textarea>
              </div>

              <!-- Edit button -->
              <div v-if="infoMode == 'info'" class="col-sm-1">
                <button v-if="!editCheckbox[item]"
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
          <button class="btn btn-info"
                  data-dismiss="modal">
            Close
          </button>
          <button v-if="Object.keys(botChanges) != 0"
                  @click="editBotInfo"
                  class="btn btn-primary">
            Submit changes
          </button>
          <button v-if="infoMode == 'info'"
                  data-toggle="collapse"
                  data-target="#are-you-sure"
                  @click="setDeleteMode('delete')"
                  class="btn btn-danger">
            Delete
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

export default {
  name: 'BotInfo',
  props: ['infoMode', 'bot'],
  data() {
    return {
      editable: ['email', 'msg', 'start', 'stop'],
      editCheckbox: {
        name: false,
        email: false,
        msg: false,
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
    parseDate(time) {
      if (!time) return 'none';
      const date = new Date(parseInt(time));
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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

    // Add bot
    addNewBot() {
      addBot(this.newBot);
      $('#bot-info-modal').modal('hide');
      this.$parent.getBotList();
    },

    // Edit bot info
    editBotInfo() {
      editBot(this.bot.name, this.botChanges);
      $('#bot-info-modal').modal('hide');
      this.$parent.getBotList();
    },

    deleteBot() {
      removeBot(this.bot.name);
      $('#bot-info-modal').modal('hide');
      this.$parent.getBotList();
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
