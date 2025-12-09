<template>
  <form
    @submit.prevent="login"
    class="col col-md-6 bg-white border border-dark rounded p-5 text-center"
  >
    <div class="form-row justify-content-center">
      <div class="form-group col text-align-start">
        <input
          type="email"
          name="email"
          v-model="user.email"
          class="form-control"
          id="signinInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Adresse e-mail"
        />
      </div>
    </div>
    <div class="form-row justify-content-center">
      <div class="form-group col">
        <input
          type="password"
          name="password"
          v-model="user.password"
          class="form-control"
          id="signinInputPassword1"
          placeholder="Mot de passe"
        />
      </div>
    </div>
    <div class="form-row justify-content-center mt-3">
      <input type="submit" class="col-8 btn btn-primary" value="Se connecter" />
    </div>
    <div
      class="
        form-row
        justify-content-center
        mt-4
        pt-4
        border-top border-secondary
      "
    >
      <router-link to="/signup" class="col-8 text-primary"
        >Vous n'avez pas de compte ?</router-link
      >
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const email = this.user.email;
      const password = this.user.password;
      const regexEmail =
        /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
      const regexPassword =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_#])([-+!*$@%_\w]{8,15})$/;

      if (
        !email ||
        !password ||
        regexEmail.test(email) == false ||
        regexPassword.test(password) == false
      ) {
        alert("Veuillez remplir tous les champs !");
        return;
      } else {
        const userLogin = {
          email,
          password,
        };
        const res = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userLogin),
        });

        if (res.status !== 200) {
          alert("Utilisateur introuvable !");
        } else {
          const data = await res.json();

          const groupomaniaUser = {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            department: data.department,
            email: data.email,
            token: data.token,
            isAdmin: data.isAdmin,
          };
          localStorage.setItem(
            "groupomaniaUser",
            JSON.stringify(groupomaniaUser)
          );
          this.$router.push({ name: "Feed" });
        }
      }
    },
  },
};
</script>