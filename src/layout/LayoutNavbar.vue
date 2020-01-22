<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand -->
    <b-navbar-brand to="/">Francium Chat</b-navbar-brand>

    <!-- Sidenav toggle -->
    <b-navbar-nav class="align-items-lg-center mr-auto mr-lg-4" v-if="sidenavToggle">
      <a class="nav-item nav-link px-0 ml-2 ml-lg-0" href="javascript:void(0)" @click="toggleSidenav">
        <i class="ion ion-md-menu text-large align-middle" />
      </a>
    </b-navbar-nav>

    <!-- Navbar toggle -->
    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>

    <b-collapse is-nav id="app-layout-navbar">
      <b-navbar-nav class="align-items-lg-center ml-auto" v-if="!current_user">
        <b-nav-item href="#">Register</b-nav-item>
        <b-nav-item href="#">Login</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="align-items-lg-center ml-auto" v-else>
        <b-nav-item href="#">Hi, {{ current_user }}</b-nav-item>
        <b-nav-item href="#" @click="logout()">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app-layout-navbar',

  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    current_user() {
      return this.getUser.UserName || localStorage.name
    }
  },

  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },

    logout() {
      // this.$store.dispatch('clearData')
      this.$router.push('/')
    }
  }
}
</script>
