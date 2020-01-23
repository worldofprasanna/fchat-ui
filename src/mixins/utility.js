export default {
  methods: {
    handleSocketResponse (data) {
      if (data.Type == "User") {
        this.saveUserDetails(data.User)
      } else
      if (data.Type == "Message") {
        this.displayNewMessage(data.Message)
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
    }
  },

  computed: {

  }
}
