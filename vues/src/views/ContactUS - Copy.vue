<template>
  <div>
    <button class="fixed-bottom-right" ref="button" @click="showForm = true" :disabled="isLoading">
      Contact Us
    </button>
    <transition name="fade">
      <div class="dialog" v-show="showForm" @click.stop="hideForm">
        <div @click.stop class="form-popup" ref="formPopup">
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
          <div class="messageD">
            {{ message }}
          </div>
        </div>
      </div>
    </transition>
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
       message:'',
       name: '',
       number: '',
       email: '',
       comment: ''
     }
   },
   mounted() {
    this.$nextTick(() => {
      const button = this.$refs.button;
      this.$refs.formPopup.style.transform = `translate3d(${button.offsetLeft}px, ${button.offsetTop}px, 0)`;
      this.$refs.formPopup.style.setProperty("--x", `${button.offsetLeft}px`);
      this.$refs.formPopup.style.setProperty("--y", `${button.offsetTop}px`);
    });
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
         this.message="Form submitted successfully!";
       } else {
         throw new Error('Failed to submit form. Please try again.');
       }
     } catch (error) {
       this.message="Failed to submit form. Please try again!"
     } finally {
        setTimeout(() => {
          this.showForm = false;
        }, 3000);
        this.$store.commit('setLoading', false);
      }
   },
   hideForm() {
       this.showForm = false;
     }
 }
 
 }
 </script>
 
 
 <style>
.fade-enter-active, .fade-leave-active {
  transition: transform 0.5s ease-in-out;
}
.fade-enter {
  transform: translate3d(var(--x)px, var(--y)px, 0);
}
.fade-leave-to {
  transform: translate3d(var(--x), var(--y), 0);
}
 .form-dialog {
   width:100%;
   padding-left:15px;
   padding-right:15px;
   padding-top:5px;
 }
 
 
 .messageD {
  color:orange;
  padding-top:15px;
  text-align: center;
 }

 .fixed-bottom-right {
   position: fixed;
   bottom: 20px;
   right: 20px;
   z-index: 20000;
 }
 
 .dialog{
   position: fixed;
   z-index:20000;
   top:0;
   bottom:0;
   right:0;
   left:0;
   display:flex;
 }
 .form-popup {
   margin:0 auto;
   margin-top:auto;
   margin-bottom: auto;;
   background-color: #040613;
   padding: 20px;
   border-radius: 12px;
   border: 2px solid #f14d34;
   border-radius: 5px;
 }
 </style>