<template>
  <div class="pane" v-show="isShow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'pane',
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    }
  },
  watch: {
    label() {
      this.updateNav();
    }
  },
  mounted() {
    this.updateNav();
  }
};
</script>

