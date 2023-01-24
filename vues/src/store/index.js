import { createStore } from 'vuex'


export default createStore({
  state: {
    isLoading: false,
    success: false,
    error: '',
    errors: {}
  },
  getters: {
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setSuccess(state, success) {
      state.success = success
    },
    setError(state, error) {
      state.error = error
    },
    setErrors(state, errors) {
      state.errors = errors
  },
  },
  actions: {
    validateForm({ commit }, formData) {
      let errors = {}
      if (!formData.name.trim()) {
          errors.name = 'Name is required'
      }
      if (!formData.number.trim()) {
          errors.number = 'Number is required'
      }
      else if(!formData.number.match(/^[\d\s+-]+$/)){
          errors.number = 'Invalid phone number format'
      }
      if (!formData.email.trim()) {
          errors.email = 'Email is required'
      }
      else if(!formData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          errors.email = 'Invalid email format'
      }
      if (!formData.comment.trim()) {
          errors.comment = 'Comment is required'
      }
      commit('setErrors', errors)
  },
},
  modules: {
  }
})