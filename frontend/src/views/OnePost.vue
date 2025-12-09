<template>
  <div class="row justify-content-around mb-5 pb-3">
    <div class="col col-md-8 col-xl-6">
      <div class="row justify-content-center">
        <router-link to="/feed" class="btn btn-dark text-center mt-2 mb-2"
          >Retour</router-link
        >
      </div>
      <div class="card mb-5">
        <div class="card-body pl-4 pr-4 pb-0 pt-1 border-bottom border-light">
          <div class="row justify-content-between pb-0 pt-0">
            <p class="card-text font-weight-bold">
              {{ post.User.firstName }} {{ post.User.lastName }}
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
        <div class="card-body border border-light">
          <div class="row justify-content-center">
            <input
              class="col-7"
              type="text"
              placeholder="Commentez..."
              name="comment"
              v-model="post.Comments.content"
            />
          </div>
          <div class="row justify-content-center mt-2">
            <input
              @click.prevent="commentPost"
              class="btn btn-primary col-4"
              type="submit"
              value="Commenter"
            />
          </div>
        </div>
        <div v-if="post.Comments" class="card-body">
          <ul class="list-group list-group-flush">
            <li
              :key="comment.id"
              v-for="comment in post.Comments"
              class="list-group-item"
            >
              <div class="row justify-content-between">
                <p class="card-text">
                  {{ comment.User.firstName }} {{ comment.User.lastName }}
                </p>
                <p>
                  <router-link
                    v-if="user.userId === comment.UserId"
                    :to="{ name: 'UpdateComment', params: { id: comment.id } }"
                    ><i class="far fa-edit text-dark"></i></router-link
                  ><a
                    v-if="
                      user.userId === comment.UserId ||
                      user.isAdmin == true
                    "
                    href="#"
                    type="button"
                    class="ml-2"
                    ><i
                      @click.prevent="deleteComment(comment.id)"
                      class="fas fa-times text-danger"
                    ></i
                  ></a>
                </p>
              </div>
              <div class="row">
                <p>{{ comment.updatedAt }}</p>
              </div>
              <div class="row">
                <h5>{{ comment.content }}</h5>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnePost",
  data() {
    return {
      user: {},
      post: {
        User: [],
        Comments: [],
      },
    };
  },
  methods: {
    async fetchOnePost() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;
      const id = this.$route.params.id;

      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      return data;
    },

    async commentPost() {
      const content = this.post.Comments.content;

      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;

      const postId = this.$route.params.id;

      const comment = { content, token, postId };

      if (!content) {
        alert("Veuillez écrire votre commentaire !");
      } else {
        const res = await fetch(
          `http://localhost:5000/posts/${postId}/comments`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(comment),
          }
        );
        if (res.status !== 201) {
          alert("Votre commentaire n'a pas pu être publié !");
        } else {
          this.$router.go();
        }
      }
    },
    async deleteComment(id) {
      const commentId = id;

      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;

      const res = await fetch(
        `http://localhost:5000/posts/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status !== 200) {
        alert("Votre commentaire n'a pas pu être supprimé !");
      } else {
        this.$router.go();
      }
    },
    getUserConnected() {
      const res = localStorage.getItem("groupomaniaUser");

      const data = JSON.parse(res);

      return data;
    },
  },
  async created() {
    this.post = await this.fetchOnePost();
    this.user = this.getUserConnected();
  },
};
</script>