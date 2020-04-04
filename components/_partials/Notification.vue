<template>
  <b-alert
    :show="dismissCountDown"
    dismissible
    variant="warning"
    @dismissed="dismissCountDown = 0"
    @dismiss-count-down="countDownChanged"
  >
    <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    <b-progress
      variant="warning"
      :max="dismissSecs"
      :value="dismissCountDown"
      height="4px"
    ></b-progress>
  </b-alert>
</template>
<script>
export default {
  name: "Notification",
  props: {
    errors: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.showAlert();
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>
<style scoped></style>
