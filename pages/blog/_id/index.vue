<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-alert show variant="warning" v-if="post == null">
        <h4 class="alert-heading">Oops!</h4>
        <p>
          The post you are requesting is temporarily unavailable. You can decide to create a new post or view other lost of post.
        </p>
      </b-alert>
      <b-row align-h="center" v-else>
        <b-col cols="10" class="mt-3">
          <b-card :title="post.title" :sub-title="post.subtitle">
            <b-card-text>
              {{ post.description }}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PostService from "@/services/PostService"
export default {
  head() {
    return {
      title: "Blog | " + this.name,
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
  mounted() {
    this.getPost()
  },
  data() {
    return {
      post: null
    }
  },
  methods: {
    async getPost () {
      this.$nuxt.$loading.start()
      const response = await PostService.getPost(this.$route.params.id)
        .then((response) => {
          this.post = response.data.post
          this.$nuxt.$loading.finish()
        }).catch(err => {
          if (err.response.status == 401) {
            this.$store.dispatch('logout')
            this.$nuxt.$loading.finish()
            this.$router.push({
              name: "login"
            });
          }
          this.$nuxt.$loading.finish()
        })
    }
  }
};
</script>

<style scoped>
/* background: url("http://lorempixel.com/850/280/nature/4/"); */
/* <img alt="" src=""> */
</style>
