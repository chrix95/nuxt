export const state = () => ({
    isLoggedIn: false,
    token: null,
    user: null
})
export const mutations =  {
    SET_USER_DATA (state, userData) {
        state.user = userData.data.user
        state.token = userData.data.token
        state.isLoggedIn = true
        localStorage.setItem('token', JSON.stringify(userData.data.token))
        localStorage.setItem('user', JSON.stringify(userData.data.user))
    },
    RESET_USER_DATA (state) {
        const userString = JSON.parse(localStorage.getItem('user'))
        const userToken = JSON.parse(localStorage.getItem('token'))
        if (userString && userToken) {
            state.isLoggedIn = true
            state.user = userString
            state.token = userToken
        }
    },
    CLEAR_USER_DATA (state) {
        state.user = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        state.token = null
        state.isLoggedIn = false
    }
}

export const actions = {
    register ({ commit }, credentials) {
        commit('SET_USER_DATA', credentials)
    },
    login ({ commit }, credentials) {
        commit('SET_USER_DATA', credentials)
    },
    resetUserData ({ commit }) {
        commit('RESET_USER_DATA')
    },
    logout ({ commit }) {
        commit('CLEAR_USER_DATA')
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.isLoggedIn
    }
}