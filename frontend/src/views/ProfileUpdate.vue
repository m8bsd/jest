<template>
  <div class="container-fluid pt-5 pb-5">
    <div class="row mt-5 mb-5">
      <form
        class="col col-md-6 col-xl-4 mx-auto bg-white border border-dark rounded p-5"
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
              placeholder="***********"
            />
            <small id="passwordHelp" class="form-text text-muted"
              >Votre mot de passe doit contenir une majuscule, une minuscule, un
              caractère spécial et un chiffre (entre 8 et 15 caractères).</small
            >
          </div>
        </div>
        <div class="form-row justify-content-center">
          <p class="font-italic">Vous serez redirigé vers la page d'accueil.</p>
        </div>
        <div class="form-row justify-content-center mt-4">
          <input
            @click.prevent="modifyUser"
            type="submit"
            class="col-6 btn btn-success"
            value="Mettre à jour"
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
          <router-link to="/feed" class="text-secondary">Retour</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileUpdate",
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
    getUserConnected() {
      const res = localStorage.getItem("groupomaniaUser");

      const data = JSON.parse(res);

      return data;
    },
    async modifyUser() {
      const firstName = this.user.firstName;
      const lastName = this.user.lastName;
      const department = this.user.department;
      const email = this.user.email;
      const password = this.user.password;
      const regexEmail =
        /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
      const regexPassword =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;

      const user = localStorage.getItem("groupomaniaUser");
      const data = JSON.parse(user);
      const id = data.userId;
      const token = data.token;

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
        const userUpdated = {
          firstName,
          lastName,
          department,
          email,
          password,
        };
        const res = await fetch(`http://localhost:5000/users/${id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(userUpdated),
        });

        if (res.status !== 200) {
          alert("Votre profil n'a pas pu être mis à jour !");
        } else {
          alert("Votre profil a bien été mis à jour !");
          localStorage.clear();
          this.$router.push({ name: "Home" });
        }
      }
    },
  },
  created() {
    this.user = this.getUserConnected();
  },
};
</script>