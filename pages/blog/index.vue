<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-alert show variant="warning" v-if="posts.length == 0">
        <h4 class="alert-heading">Oops!</h4>
        <p>
          We couldn't find any post relating to your account currently. You can decide to create a new post or view other lost of post.
        </p>
        <!-- <hr>
        <p class="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
        </p> -->
      </b-alert>
      <b-row align-h="center" v-else>
        <b-col cols="4" class="mt-3" v-for="(post, index) in posts" :key="index">
          <b-card :title="post.title" :sub-title="post.subtitle">
            <b-card-text>
              {{ post.description.substring(0, 150) }}
            </b-card-text>
            <nuxt-link :to="'blog/' + post.slug">
              Read more
            </nuxt-link>
            <a class="card-link" to></a>
            <b-link href="#" @click.prevent="deletePost(post.id)" class="card-link">Delete</b-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PostService from "@/services/PostService"
export default {
  async asyncData() {},
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
    }
  },
  mounted() {
    this.getPosts()
  },
  data() {
    return {
      loading: false,
      posts: []
    }
  },
  methods: {
    async getPosts () {
      this.$nuxt.$loading.start()
      this.loading = true
      const response = await PostService.getPosts()
        .then((response) => {
          this.posts = response.data.posts
          this.$nuxt.$loading.finish()
          this.loading = false
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
    },
    deletePost (id) {

    }
  }
};
</script>

<style scoped>
/* background: url("http://lorempixel.com/850/280/nature/4/"); */
/* <img alt="" src="http://lorempixel.com/100/100/people/9/"> */
</style>
