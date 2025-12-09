<template>
  <div class="container-fluid pt-5 pb-5">
    <div class="row mt-5 mb-5">
      <form
        @submit.prevent="signup"
        class="
          col col-md-6 col-xl-4
          mx-auto
          bg-white
          border border-dark
          rounded
          p-5
        "
      >
        <div class="form-row justify-content-center">
          <div class="form-group col-5 text-align-start">
            <input
              type="text"
              name="firstName"
              v-model="user.firstName"
              class="form-control"
              id="signinInputFirstName"
              placeholder="Prénom"
            />
          </div>
          <div class="form-group col-7 text-align-start">
            <input
              type="text"
              name="lastName"
              v-model="user.lastName"
              class="form-control"
              id="signinInputLastName"
              placeholder="Nom"
            />
          </div>
        </div>
        <div class="form-row justify-content-center">
          <div class="form-group col text-align-start">
            <input
              type="text"
              name="department"
              v-model="user.department"
              class="form-control"
              id="department"
              placeholder="Commercial"
            />
          </div>
        </div>
        <div class="form-row justify-content-center">
          <div class="form-group col text-align-start">
            <input
              type="email"
              name="email"
              v-model="user.email"
              class="form-control"
              id="signinInputEmail"
              aria-describedby="emailHelp"
              placeholder="prenom.nom@exemple.com"
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
              id="signinInputPassword"
              placeholder="Mot de passe"
            />
            <small id="passwordHelp" class="form-text text-muted"
              >Votre mot de passe doit contenir une majuscule, une minuscule, un
              caractère spécial et un chiffre (entre 8 et 15 caractères).</small
            >
          </div>
        </div>
        <div class="form-row justify-content-center mt-4">
          <input
            type="submit"
            class="col-6 btn btn-success"
            value="S'inscrire"
          />
        </div>
        <div
          class="
            form-row
            justify-content-center
            mt-3
            pt-2
            border-top border-secondary
          "
        >
          <router-link to="/" class="text-dark"
            >Vous avez déjà un compte ?</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        department: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async signup() {
      const firstName = this.user.firstName;
      const lastName = this.user.lastName;
      const department = this.user.department;
      const email = this.user.email;
      const password = this.user.password;
      const regexEmail =
        /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
      const regexPassword =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_#])([-+!*$@%_\w]{8,15})$/;

      if (
        !firstName ||
        !lastName ||
        !department ||
        !email ||
        !password ||
        regexEmail.test(email) == false ||
        regexPassword.test(password) == false
      ) {
        alert("Veuillez remplir tous les champs !");
      } else {
        const userSignup = {
          firstName,
          lastName,
          department,
          email,
          password,
        };
        const res = await fetch("http://localhost:5000/users/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userSignup),
        });
        const data = await res.json();

        if (res.status !== 201) {
          alert("Cette adresse email est déjà utilisée");
        } else {
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
        // Optimiser : groupomaniaUser à la place de data idem pour login
      }
    },
  },
};
</script>