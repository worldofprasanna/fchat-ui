import { mapGetters } from 'vuex'
export default {
  methods: {
    handleSocketResponse (data) {
      if (data.Type == "User") {
        this.saveUserDetails(data.User)
      } else
      if (data.Type == "Message") {
        this.displayNewMessage(data.Message)
      } else if (data.Type == "UserList") {
        this.loadContacts()
      }
    },
    saveUserDetails (user) {
      let payload = {
        UserName: user.UserName,
        ID: user.ID
      }
      this.$store.dispatch('setUser', payload)
      localStorage.name = user.UserName
      this.$router.push('/chat')
    },
    displayNewMessage (message) {
      this.$store.dispatch('pushMessage', message)
    },
    loadContacts (data) {
      var self = this
      this.$http.get('/users').then((response) => {
        var allUsers = response.data.Users.Value.filter(user => {return user.ID !== self.getUser.ID})
        var activeUsers = Object.keys(response.data.ActiveList)
        var filteredUser = allUsers.filter(user => {return activeUsers.indexOf(user.UserName) != -1})

        this.$store.dispatch('setUserList', filteredUser)
      })
    },
    closingSocket(data) {
      this.loadContacts()
    }
  },
  computed: {
    ...mapGetters(['getUser', 'allMessages', 'getUserList']),
  }
}
