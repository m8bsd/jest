<template>
  <form
    @submit.prevent="createPost"
    enctype="multipart/form-data"
    class="col pb-3 mb-3 border-bottom border-secondary"
  >
    <div class="form-row form-group">
      <input
        class="col form-control-lg"
        aria-label="large"
        type="text"
        name="content"
        v-model="post.content"
        placeholder="Que voulez-vous publier ?"
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
      <input
        type="submit"
        class="col-8 col-md-6 col-lg-4 btn btn-primary"
        value="Publier"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        content: "",
        image: "",
      },
    };
  },
  methods: {
    async createPost() {
      const content = this.post.content;
      const image = this.$refs.image.files[0];

      const fd = new FormData();
      fd.append("content", content);
      fd.append("image", image);

      if (!content) {
        alert("Veuillez remplir tous les champs !");
        return;
      } else {
        const data = localStorage.getItem("groupomaniaUser");
        const user = JSON.parse(data);
        const token = user.token;

        const res = await fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: fd,
        });
        if (res.status !== 201) {
          alert("Votre post n'a pas pu être publié !");
          return;
        } else {
          this.$router.go();
        }
      }
    },
  },
};
</script>