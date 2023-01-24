<template>
  <div>
    
     <button id="btn" class="fixed-bottom-right" @click="showForm = true" :disabled="isLoading">Связь с нами</button>

     <div id="diag" class="dialog" v-if="showForm" @click.stop="hideForm">
     <div @click.stop class="form-popup" >
       <div class="form-dialog" id="forma">
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
             <span v-if="isLoading">Отправка...</span>
             <span v-else>Отправить</span>
           </button>
         </form>
         <div class="messageD">
            {{ message }}
         </div>
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
   }),


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
         this.message="Форма отправлена!";
         this.name='';
         this.number='';
         this.email='';
         this.comment='';
         localStorage.removeItem(this.newName);
         localStorage.removeItem(this.newNumber);
         localStorage.removeItem(this.newEmail);
         localStorage.removeItem(this.newComment);
       } else {
         throw new Error('Failed to submit form. Please try again.');
       }
     } catch (error) {
       this.message="Failed to submit form. Please try again!"
     } finally {
       this.$store.commit('setLoading', false);
     }
   },
   hideForm() {
       this.showForm = false;
       history.pushState(false, null, "\u0000");
     },
     sForm() {
       this.showForm = true;
     }
 },
 created(){

 },
 beforeUnmount(){
this.hideForm();
 },
 mounted() {
  if (location.hash === "#contactus") {
    this.sForm();
  }

  
  window.addEventListener("popstate", () => {
    if(location.hash === "#contactus"){
      this.sForm();
    }
    if(location.hash === ""){
    this.hideForm();}
})

  let c = document.getElementById("btn");
  c.addEventListener("click", () => {
    history.pushState(true, null, "#contactus");



  
    });


    
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.email) {
      this.email = localStorage.email;
    }
    if (localStorage.number) {
      this.number = localStorage.number;
    }
    if (localStorage.comment) {
      this.comment = localStorage.comment;
    }
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    },
    email(newEmail) {
      localStorage.email= newEmail;
    },
    number(newNumber) {
      localStorage.number = newNumber;
    },
    comment(newComment) {
      localStorage.comment = newComment;
    }
  }
}
 </script>
 
 
 <style>
 /* existing styles for fixed-bottom-right and form-popup */
 
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
   bottom: 70px;
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
 @media (min-width:768px) {
  .fixed-bottom-right {

   bottom: 20px;

 }
 }
 </style>