<template>
  <div class="row justify-content-around">
    <div class="col col-md-9 col-xl-7 p-3 ml-2 mr-2">
      <div class="row justify-content-center">
        <router-link
          :to="{ name: 'OnePost', params: { id: comment.PostId } }"
          class="btn btn-dark text-center mt-2 mb-2"
          >Retour</router-link
        >
      </div>
      <form @submit.prevent="updateComment">
        <div class="row justify-content-center">
          <div class="card-body border border-dark">
            <div class="row justify-content-center">
              <input
              class="col-8 form-control-lg"
                type="text"
                placeholder="Commentez..."
                name="comment"
                v-model="comment.content"
              />
            </div>
            <div class="row justify-content-center mt-4">
              <input class="btn btn-primary" type="submit" value="Modifier" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "UpdateComment",
  data() {
    return {
      comment: {
        User: {},
      },
    };
  },
  methods: {
    async updateComment() {
      const PostId = this.comment.PostId;
      const content = this.comment.content;
      const id = this.$route.params.id;

      const data = localStorage.getItem("groupomaniaUser");
      const user = JSON.parse(data);
      const token = user.token;

      const modifiedComment = { content };

      if (!content) {
        alert("Veuillez remplir tous les champs !");
      } else {
        const res = await fetch(`http://localhost:5000/posts/comments/${id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(modifiedComment),
        });
        if (res.status !== 200) {
          alert("Votre commentaire n'a pas pu être modifié !");
        } else {
          localStorage.removeItem("commentId");
          this.$router.push({
            name: "OnePost",
            params: { id: PostId },
          });
        }
      }
    },
    async fetchOneComment() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;

      const id = this.$route.params.id;

      const res = await fetch(`http://localhost:5000/posts/comments/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      return data;
    },
  },
  async created() {
    this.comment = await this.fetchOneComment();
  },
};
</script>