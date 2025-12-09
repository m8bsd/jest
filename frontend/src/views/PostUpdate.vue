<template>
  <div class="justify-content-around">
    <div class="row justify-content-center">
      <router-link to="/feed" class="btn btn-dark text-center mt-2 mb-2"
        >Retour</router-link
      >
    </div>
    <div class="row justify-content-center">
      <form
        @submit.prevent="modifyPost"
        class="col col-md-9 col-xl-7 border border-dark p-3"
      >
        <div class="form-row form-group justify-content-center">
          <input
            class="col form-control-lg"
            aria-label="large"
            type="text"
            name="content"
            v-model="post.content"
          />
        </div>
        <div class="form-row justify-content-center">
          <input
            type="file"
            id="image"
            ref="image"
            accept="image/png, image/jpeg, image/jpg"
            class="btn btn-link"
          />
        </div>
        <div class="form-row justify-content-center">
          <input type="submit" class="col-2 btn btn-primary" value="Modifier" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "PostUpdate",
  data() {
    return {
      post: {
        content: "",
        image: "",
      },
    };
  },
  methods: {
    async modifyPost() {
      const content = this.post.content;
      const image = this.$refs.image.files[0];

      const fd = new FormData();
      fd.append("content", content);
      fd.append("image", image);

      if (!content) {
        alert("Veuillez remplir tous les champs !");
        return;
      } else {
        const id = this.$route.params.id;

        const data = localStorage.getItem("groupomaniaUser");
        const user = JSON.parse(data);
        const token = user.token;

        const res = await fetch(`http://localhost:5000/posts/${id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: fd,
        });
        if (res.status !== 200) {
          alert("Votre publication n'a pas pu être modifiée !");
        } else {
          this.$router.push({ name: "Feed" });
        }
      }
    },
    async fetchOnePost() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;

      const id = this.$route.params.id;

      const res = await fetch(`http://localhost:5000/posts/${id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.post = await this.fetchOnePost();
  },
};
</script>