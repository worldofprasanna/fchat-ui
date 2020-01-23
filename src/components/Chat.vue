<template>
  <!-- `.chat-wrapper` fills all available space of container -->
  <div class="chat-wrapper container-p-x container-p-y h-100" :class="{'chat-sidebox-open': sideboxOpen}">

    <!-- Make card full height of `.chat-wrapper` -->
    <b-card no-body class="flex-grow-1 position-relative overflow-hidden">

      <!-- Make row full height of `.card` -->
      <div class="row no-gutters h-100">
        <div class="chat-sidebox col">

          <!-- Chat contacts header -->
          <div class="flex-grow-0 px-4">
            <div class="media align-items-center">
              <div class="media-body">
                <b-input class="chat-search my-3" v-model="searchQuery" placeholder="Search..." />
              </div>
              <a @click.prevent="sideboxOpen = !sideboxOpen" href="#" class="chat-sidebox-toggler d-lg-none d-block text-muted text-large font-weight-light pl-3">&times;</a>
            </div>
            <hr class="border-light m-0">
          </div>
          <!-- / Chat contacts header -->

          <!-- Wrap `.chat-scroll` to properly position scroll area. Remove this wtapper if you don't need scroll -->
          <!-- <div class="flex-grow-1 position-relative">
            <perfect-scrollbar :options="{ suppressScrollX: true, wheelPropagation: true }" class="chat-contacts list-group chat-scroll py-3">

              <a v-for="contact in chatContacts" :key="contact.name" :class="{online: contact.online, active: selectedUser && selectedUser.user === contact.username}" href="javascript:void(0)" class="list-group-item list-group-item-action">
                <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" class="d-block ui-w-40 rounded-circle" alt="">
                <div class="media-body ml-3">
                  {{contact.name}}
                  <div v-if="contact.online" class="chat-status small"><span class="badge badge-dot"></span>&nbsp; Online</div>
                  <div v-if="!contact.online" class="chat-status small"><span class="badge badge-dot"></span>&nbsp; Offline</div>
                </div>
                <div v-if="contact.newMessages" class="badge badge-outline-success">{{contact.newMessages}}</div>
              </a>

            </perfect-scrollbar>
          </div> -->

          <div class="flex-grow-1 position-relative">
            <perfect-scrollbar :options="{ suppressScrollX: true, wheelPropagation: true }" class="chat-contacts list-group chat-scroll py-3">
              <a
                v-for="contact in searchQuery.trim().length ? filteredUsers : getUserList"
                :key="contact.ID"
                href="javascript:void(0)"
                @click="getChatData(contact.ID)"
                :class="{active: selectedUser && selectedUser.UserName === contact.UserName}"
                class="list-group-item list-group-item-action"
              >
                <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" class="d-block ui-w-40 rounded-circle" alt="">
                <div class="media-body ml-3 text-capitalize">
                  {{contact.UserName}}
                  <!-- <div v-if="contact.online" class="chat-status small"><span class="badge badge-dot"></span>&nbsp; Online</div>
                  <div v-if="!contact.online" class="chat-status small"><span class="badge badge-dot"></span>&nbsp; Offline</div> -->
                </div>
                <!-- <div v-if="contact.newMessages" class="badge badge-outline-success">{{contact.newMessages}}</div> -->
              </a>

            </perfect-scrollbar><!-- / .chat-contacts -->
          </div>

        </div>
        <div v-if="!selectedUser" class="d-flex col justify-content-center align-items-center">
          <div class="text-lighter text-large">Select a chat</div>
        </div>
        <div v-else class="d-flex col flex-column">

          <!-- Chat header -->
          <div class="flex-grow-0 py-3 pr-4 pl-lg-4">

            <div class="media align-items-center">
              <a @click.prevent="sideboxOpen = !sideboxOpen" href="#" class="chat-sidebox-toggler d-lg-none d-block text-muted text-large px-4 mr-2"><i class="ion ion-md-more"></i></a>

              <div class="position-relative">
                <!-- <span class="badge badge-dot indicator" :class="`badge-${true ? 'success' : 'danger'}`"></span> -->
                <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" class="ui-w-40 rounded-circle" alt="">
              </div>
              <div class="media-body pl-3 text-capitalize">
                <strong>{{selectedUser.UserName}}</strong>
                <!-- <div class="text-muted small"><em>{{selectedUser.status}}</em></div> -->
              </div>
              <div>
                <b-btn variant="primary btn-round icon-btn mr-1" @click="showAlert()"><i class="ion ion-ios-call"></i></b-btn>
                <b-btn variant="secondary btn-round icon-btn mr-1" @click="showAlert()"><i class="ion ion-md-videocam"></i></b-btn>
                <b-btn variant="default btn-round icon-btn" @click="showAlert()"><i class="ion ion-ios-more"></i></b-btn>
              </div>
            </div>

          </div>
          <hr class="flex-grow-0 border-light m-0">
          <!-- / Chat header -->

          <!-- Wrap `.chat-scroll` to properly position scroll area. Remove this wtapper if you don't need scroll -->
          <div class="flex-grow-1 position-relative">

            <!-- Remove `.chat-scroll` and add `.flex-grow-1` if you don't need scroll -->
            <perfect-scrollbar :options="{ suppressScrollX: true, wheelPropagation: true }" class="chat-messages chat-scroll p-4">
              <div v-for="message in allMessages" :key="message.ID" :class="`text-${sentByme(message) ? 'right' : 'left'}`" >
                <!-- <div class="text-muted small text-nowrap mt-2">{{message.CreatedAt}}</div> -->
                <div :class="`chat-message chat-message-${sentByme(message) ? 'right' : 'left'}`" class="mb-4">
                  {{message.text}}
                </div>
              </div>

            </perfect-scrollbar><!-- / .chat-messages -->
          </div>

          <!-- Chat footer -->
          <hr class="border-light m-0">
          <div class="flex-grow-0 py-3 px-4">
            <form @submit.prevent="sendMessage()">
              <b-input-group>
                <b-input v-model="message" placeholder="Type your message" />
                <b-btn type="submit" variant="primary" slot="append">Send</b-btn>
              </b-input-group>
            </form>
          </div>
          <!-- / Chat footer -->

        </div>
      </div><!-- / .row -->

    </b-card><!-- / .card -->

  </div><!-- / .chat-wrapper -->
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/chat.scss" lang="scss"></style>

<script>
import { mapGetters } from 'vuex'
import PerfectScrollbar from '@/vendor/libs/perfect-scrollbar/PerfectScrollbar'

export default {
  name: 'pages-chat',
  metaInfo: {
    title: 'Chat - Pages'
  },
  components: {
    PerfectScrollbar
  },
  data: () => ({
    sideboxOpen: false,

    user: {
      avatar: '1-small.png'
    },
    message: "",
    selectedUser: null,
    webSocket: null,
    searchQuery: ""
  }),
  computed: {
    ...mapGetters(['getUser', 'allMessages', 'getUserList']),
    filteredUsers () {
      if (!!this.searchQuery.trim()) {
        return this.getUserList.filter(user => {
          return user.UserName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) == 0
        })
      } else {
        return []
      }
    }
  },
  methods: {
    getChatData(userID) {
      let user = this.getUserList.find(user => {return user.ID === userID})
      this.selectedUser = user
      this.loadMessages()
      this.resetMessage()
    },
    sendMessage () {
      if (!this.message.trim()) {
        return false
      }
      var self = this
      // let socket = new WebSocket(`ws://${process.env.VUE_APP_API_HOST}/send_message`)
      let socket = new WebSocket("ws://localhost:4040/send_message")
      socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
      };

      setTimeout(function(){
        socket.send(
          JSON.stringify({
            receiver: self.selectedUser.UserName,
            sender: self.getUser.UserName,
            text: self.message
          }
        ))
        self.resetMessage()
      }, 200);
    },
    loadContacts () {
      var self = this
      this.$http.get('/users').then((response) => {
        var allUsers = response.data.Users.Value.filter(user => {return user.ID !== self.getUser.ID})
        var activeUsers = Object.keys(response.data.ActiveList)
        var filteredUser = allUsers.filter(user => {return activeUsers.indexOf(user.UserName) != -1})

        this.$store.dispatch('setUserList', filteredUser)
        this.selectFirstUser()
      })
    },
    loadMessages () {
      var self = this
      this.$http.get(`/messages?sender=${self.getUser.UserName}&receiver=${self.selectedUser.UserName}`)
      .then((response) => {
        self.$store.dispatch('storeMessages', response.data.Value)
      })
    },
    selectFirstUser () {
      this.selectedUser = this.getUserList[0]
      this.getChatData(this.selectedUser.ID)
    },
    sentByme (message) {
      return this.getUser.UserName === message.sender
    },
    resetMessage () {
      this.message = ""
    },
    showAlert() {
      alert('Under Constructions')
    }
  },
  mounted () {
    this.loadContacts()
  },
  watch: {
    allMessages () {
      // scroll to bottom
    }
  }
}
</script>
