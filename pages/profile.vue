<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row align-h="center">
        <b-col cols="8">
          <b-card :title="name" :sub-title="email">
            <b-card-text>
              Some quick example text to build on the <em>card title</em> and
              make up the bulk of the card's content.
            </b-card-text>
            <b-card-text>A second paragraph of text in the card.</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Profile | " + this.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Profile information for " + this.name,
        },
      ],
    };
  },
  middleware: 'authenticated',
  mounted() {
  },
  computed: {
    name: function () {
      // `this` points to the vm instance
      return this.$store.state.user.name;
    },
    email: function () {
      // `this` points to the vm instance
      return this.$store.state.user.email;
    },
  },
  data() {
    return {}
  },
  methods: {},
};
</script>

<style scoped>
/* background: url("http://lorempixel.com/850/280/nature/4/"); */
/* <img alt="" src="http://lorempixel.com/100/100/people/9/"> */
</style>
