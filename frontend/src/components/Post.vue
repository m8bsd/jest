<template>
  <div>
    <div class="card mb-5">
      <div class="card-body pl-4 pr-4 pb-0 pt-1 border-bottom border-light">
        <div class="row justify-content-between pb-0 pt-0">
          <p class="card-text font-weight-bold">
            {{ post.User.firstName }} {{ post.User.lastName }}
          </p>
          <p>
            <router-link v-if="post.UserId === user.userId" :to="{ name: 'PostUpdate', params: { id: post.id } }"
              ><i class="far fa-edit text-dark"></i
            ></router-link>
            <a v-if="post.UserId === user.userId || user.isAdmin == true" href="#" type="button" class="ml-2">
              <i
                @click.prevent="deletePost"
                class="fas fa-times text-danger text-right"
              ></i
            ></a>
          </p>
        </div>
        <div class="row pt-0 mt-0">
          <p class="card-text font-italic">{{ post.updatedAt }}</p>
        </div>
      </div>
      <img
        v-if="post.image"
        class="card-img-top"
        :src="post.image"
        :alt="post.content"
      />
      <div class="card-body mt-2 mb-2 bg-white">
        <h5 class="card-title">{{ post.content }}</h5>
      </div>
      <div class="text-center border-top border-light bg-light pt-1 pb-2">
        <router-link
          :to="{ name: 'OnePost', params: { id: post.id } }"
          class="text-info"
          >Voir commentaires
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      user: {},
    };
  },
  props: {
    post: Object,
  },
  methods: {
    async deletePost() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;
      const id = this.post.id;

      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.status === 200) {
        alert("Votre publication a bien été supprimée !");
        this.$router.go();
      } else {
        alert("Votre publication n'a pas pu être supprimée !");
      }
    },
    getUserConnected() {
      const res = localStorage.getItem("groupomaniaUser");

      const data = JSON.parse(res);

      return data;
    },
  },
  created() {
    this.user = this.getUserConnected();
  },
};
</script>