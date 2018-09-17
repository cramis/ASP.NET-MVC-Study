<template>
  <form @submit.prevent="submit" class="p-2">
    <b-alert variant="danger" :show="regErrors !== null" dismissible @dismissed="regErrors = null">
      <div v-for="(error, index) in regErrors" :key="index">- {{ error }}</div>
    </b-alert>
    <b-form-group label="E-mail">
      <b-form-input v-model.trim="email" />
    </b-form-group>
    <b-form-group label="First Name">
      <b-form-input v-model.trim="firstName" />
    </b-form-group>
    <b-form-group label="Last Name">
      <b-form-input v-model.trim="lastName" />
    </b-form-group>
    <b-form-group label="Password">
      <b-form-input v-model.trim="password" type="password" />
    </b-form-group>
    <b-form-group label="Confirm Password">
      <b-form-input v-model.trim="confirmPassword" type="password" />
    </b-form-group>
    <b-form-group>
      <b-button variant="primary" type="submit" :disabled="loading">Register</b-button>
      <b-button variant="default" @click="close" :disabled="loading">Cancel</b-button>
    </b-form-group>
  </form>
</template>

<script>
export default {
  name: "register-form",
  data() {
    return {
      email: "",
      firstName : "",
      lastName : "",
      password: "",
      confirmPassword: "",
      regErrors: null
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    submit() {
      const payload = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        confirmPassword: this.confirmPassword
      };

      console.log("register payload",payload);

      this.$store
        .dispatch("register", payload)
        .then(response => {
          this.regErrors = null;
          this.email = "";
          this.password = "";
          this.confirmPassword = "";

          this.$emit("success");
        })
        .catch(error => {
          
          console.log("register Error", error);
          if (typeof error.data === "string" || error.data instanceof String) {
            this.regErrors = { error: [error.data] };
          } else {
            
            var errorArr = error.data;
            var newErr = [];
            for(var i in errorArr){
              console.log("error",errorArr[i].description);
              newErr.push(errorArr[i].description);
            }
            this.regErrors = newErr;
          }
        });
    },
    close() {
      this.regErrors = null;
      this.$emit("close");
    }
  }
};
</script>

