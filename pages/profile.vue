<template>
  <div>
    <b-card title="Title" sub-title="subtitle">
      <b-card-text>
        Some quick example text to build on the <em>card title</em> and make up
        the bulk of the card's content.
      </b-card-text>

      <b-card-text>A second paragraph of text in the card.</b-card-text>

      <a href="#" class="card-link" @click.prevent="getPost">Fetch Post</a>
      <b-link href="#" class="card-link">Another link</b-link>
    </b-card>
  </div>
</template>

<script>
import PostService from "@/services/PostService";
export default {
  mounted() {
    this.getPosts()
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async getPosts() {
      this.$nuxt.$loading.start()
      this.loading = true
      const response = await PostService.getPosts()
        .then((response) => {
          console.log('success')
          console.log(response)
          // // this.success = response.data.message
          // this.error = this.success
          // this.variant = 'success'
          // setTimeout(() => {
          //   this.$router.push({
          //     name: "index"
          //   });
          //   this.$store.dispatch("login", response)
          //   this.$nuxt.$loading.finish()
          //   this.loading = false
          // }, 1500)
          this.$nuxt.$loading.finish()
          this.loading = false
        }).catch(err => {
          console.log('err')
          console.log(err)
          this.$nuxt.$loading.fail(err)
          // this.variant = 'warning'
          // this.error = err.response.data.error
          // this.loading = false
        })
    }
  }
};
</script>

<style scoped>
/* background: url("http://lorempixel.com/850/280/nature/4/"); */
/* <img alt="" src="http://lorempixel.com/100/100/people/9/"> */
</style>
