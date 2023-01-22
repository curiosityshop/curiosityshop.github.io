<template>
 <div>
    <button class="fixed-bottom-right" @click="showForm = true" :disabled="isLoading" v-if="!success">Show Form</button>
    <div v-if="showForm" class="form-popup">
      <div class="form" id="forma">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input type="text" v-model="name" name="name" class="form-control" id="InputName" placeholder="Ваше имя" required>
          </div>
          <div class="form-group">
            <input type="tel" v-model="number" name="phone" class="form-control" id="InputPhone" placeholder="Телефон" required>
          </div>
          <div class="form-group">
            <input type="email" v-model="email" name="email" class="form-control" id="InputEmail" placeholder="E-mail" required>
          </div>
          <div class="form-group">
            <textarea v-model="comment" name="msg" class="form-control" id="Textarea" rows="3" placeholder="Ваш комментарий"></textarea>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="Check" required>
            <label class="form-check-label" for="Check">
              <a title = "Отныне и навеки, моя душа будет принадлежать создателю данной страницы">Согласен с политикой обработки персональных данных. </a></label>
          </div>
          <button type="submit" class="form-btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading">Submitting...</span>
            <span v-else>Submit</span>
          </button>
        </form>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <div v-if="success" class="success-message">
          Form submitted successfully!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
  ...mapState({
    isLoading: state => state.isLoading,
    success: state => state.success,
    error: state => state.error
  })
},
  data() {
    return {
      showForm: false,
      name: '',
      number: '',
      email: '',
      comment: ''
    }
  },

methods: {
  async submitForm() {
    this.$store.commit('setLoading', true);
    try {
      const response = await fetch('https://formcarry.com/s/6V6Ujnz1n', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
          name: this.name,
          number: this.number,
          email: this.email,
          comment: this.comment
        })
      });
      if (response.ok) {
        this.$store.commit('setSuccess', true);
      } else {
        throw new Error('Failed to submit form. Please try again.');
      }
    } catch (error) {
      this.$store.commit('setError', error.message);
    } finally {
      this.$store.commit('setLoading', false);
    }
  }
}

}
</script>


<style>
/* existing styles for fixed-bottom-right and form-popup */

.error-message {
  color: red;
}

.success-message {
  color: green;
}
.fixed-bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.form-popup {
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #040613;
  padding: 20px;
}
</style>