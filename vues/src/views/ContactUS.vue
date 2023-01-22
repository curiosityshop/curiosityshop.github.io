<template>
  <div>
    <button class="fixed-bottom-right" @click="showForm = true">Show Form</button>
    <div v-if="showForm" class="form-popup">
      <div class="form" id="forma">
        <form class="ajaxForm" action="https://formcarry.com/s/JF_YGh9Qp" accept-charset="UTF-8" id="form1">
          <div class="form-group">
            <input type="text" name="name" class="form-control" id="InputName" placeholder="Ваше имя" required>
          </div>
          <div class="form-group">
            <input type="tel" name="phone" class="form-control" id="InputPhone" placeholder="Телефон" required>
          </div>
          <div class="form-group">
            <input type="email" name="email" class="form-control" id="InputEmail" placeholder="E-mail"
              required>
          </div>
          <div class="form-group">
            <textarea name="msg" class="form-control" id="Textarea" rows="3" placeholder="Ваш комментарий" ></textarea>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="Check" required>
            <label class="form-check-label" for="Check">
              <a title = "Отныне и навеки, моя душа будет принадлежать создателю данной страницы">Согласен с политикой обработки персональных данных. </a></label>
          </div>
          <button type="submit" class="form-btn btn-primary" id="b">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      name: '',
      number: '',
      email: '',
      comment: '',
    }
  },
  computed: {
    nameError() {
      return !this.name
    },
    numberError() {
      return !this.number
    },
/*    emailError() {
      if (!this.email) return true
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !emailRegex.test(this.email)
    },*/
  },
  methods: {
    submitForm() {
      if (this.nameError || this.numberError || this.emailError) {
        return
      }
      console.log('Form submitted!')
    },
  },
  name: 'ContactUS',
}
</script>



<style>
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