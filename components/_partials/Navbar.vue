<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/">DadJokes</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" v-if="!$store.state.isLoggedIn">
                <b-navbar-nav right>
                    <b-nav-item to="/login">
                        Login
                    </b-nav-item>
                    <b-nav-item to="/register">
                        Register
                    </b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item to="/blog">
                    Blog
                </b-nav-item>
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <strong>User</strong>
                    </template>
                    <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
export default {
    methods: {
        async logout() {
        try {
            this.$nuxt.$loading.start()
            setTimeout(() => {
                this.$router.push({
                    name: 'index'
                })
                this.$store.dispatch('logout')
                this.$nuxt.$loading.finish()
            }, 1500);
        } catch (error) {
          console.log(error)
        }
      }
    }
}
</script>
<style scoped>

</style>