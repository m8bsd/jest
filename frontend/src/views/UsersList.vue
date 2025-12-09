<template>
  <div class="justify-content-around">
    <div class="row justify-content-center">
      <div class="col col-md-9 col-xl-7">
        <div class="row justify-content-center">
          <router-link to="/feed" class="btn btn-dark text-center mt-2 mb-3">
            Retour
          </router-link>
        </div>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-center bg-white text-dark">
              Utilisateurs inscrits
            </li>
            <li class="list-group-item" :key="user.id" v-for="user in users">
              <p>
                <i class="fas fa-user text-dark"></i> {{ user.firstName }}
                {{ user.lastName }}
              </p>
              <p>
                <i class="fas fa-briefcase text-dark"></i> {{ user.department }}
              </p>
              <p><i class="fas fa-envelope text-dark"></i> {{ user.email }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      const res = await fetch("http://localhost:5000/users");

      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.users = await this.fetchUsers();
  },
};
</script>