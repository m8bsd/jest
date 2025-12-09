<template>
  <div class="container-fluid col col-lg-10">
    <div class="row justify-content-around">
      <Dashboard />
    </div>
    <div class="row justify-content-around">
      <Posts :posts="posts" />
    </div>
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard.vue";
import Posts from "../components/Posts.vue";

export default {
  name: "Feed",
  components: {
    Dashboard,
    Posts,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async fetchPosts() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;

      const res = await fetch("http://localhost:5000/posts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.posts = await this.fetchPosts();
  },
};
</script>