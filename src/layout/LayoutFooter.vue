<template>
  <nav class="layout-footer footer mx-auto" :class="getLayoutFooterBg()">
    <div class="container-fluid container-p-x pb-3">
      © 2017-{{ new Date().getFullYear() }} <b-link href="https://francium.tech/">Francium Tech</b-link>. All Rights Reserved.
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-layout-footer',

  methods: {
    getLayoutFooterBg () {
      return `bg-${this.layoutFooterBg}`
    }
  }
}
</script>
