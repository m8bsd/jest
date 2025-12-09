<template>
  <div class="border border-secondary rounded mt-3" v-if="this.post">
    <router-link @click.prevent="clearLocalStorage" to="/feed"
      >Retour</router-link
    >
    <div class="col">
      <div
        class="
          row
          justify-content-between
          bg-light
          border-bottom border-secondary
          pl-2
          pr-2
        "
      >
        <p>
          {{ post.User.firstName }} {{ post.User.lastName }}
          {{ post.updatedAt }}
        </p>
        <p>
          <router-link to="/postUpdate"
            ><i class="far fa-edit text-dark"></i
          ></router-link>
        </p>
        <p>
          <a href="#" type="button">
            <i
              @click.prevent="deletePost"
              class="fas fa-times text-danger text-right"
            ></i
          ></a>
        </p>
      </div>
      <div class="card-body">
        <img src="" alt="" />
      </div>
      <div class="card-body">
        <p class="card-text">
          {{ post.content }}
        </p>
      </div>
      <div class="card-body bg-light">
        <input type="text" name="comment" v-model="post.comment.content" />
        <input
          @click.prevent="commentPost"
          class="btn btn-primary"
          type="submit"
          value="Commenter"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnePost",
  data() {
    return {
      post: {
        id: 9,
        content: "Coucou",
        image: null,
        createdAt: "2021-06-22T22:24:50.000Z",
        updatedAt: "2021-06-23T10:04:24.000Z",
        UserId: 4,
        User: {
          id: 4,
          firstName: "Marco",
          lastName: "Polo",
          department: "Admin",
          isAdmin: false,
          email: "marcopolo@gmail.com",
          password:
            "$2b$10$mzoCryfcslkt/sYvHezGe.O0J2fgXtX664f6LX/HBt2OSAU4zwUzC",
          createdAt: "2021-06-22T15:14:14.000Z",
          updatedAt: "2021-06-22T15:22:33.000Z",
        },
        Comments: [
          {
            id: 3,
            content: "Test Commentaire 1",
            createdAt: "2021-06-23T15:24:21.000Z",
            updatedAt: "2021-06-23T15:24:21.000Z",
            UserId: 4,
            PostId: 9,
            User: {
              id: 4,
              firstName: "Marco",
              lastName: "Polo",
              department: "Admin",
              isAdmin: false,
              email: "marcopolo@gmail.com",
              password:
                "$2b$10$mzoCryfcslkt/sYvHezGe.O0J2fgXtX664f6LX/HBt2OSAU4zwUzC",
              createdAt: "2021-06-22T15:14:14.000Z",
              updatedAt: "2021-06-22T15:22:33.000Z",
            },
          },
        ],
      },
    };
  },
  methods: {
    async fetchOnePost() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;
      const id = localStorage.getItem("postId");

      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      console.log(data);
      this.post = data;
      return data;
    },
    async deletePost() {
      const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      const token = user.token;
      const postId = localStorage.getItem("postId");
      const id = JSON.stringify(postId);

      const res = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.status === 200) {
        alert("Votre publication a bien été supprimée !");
        this.$router.push({ name: "Feed" });
      } else {
        alert("Votre publication n'a pas pu être supprimée !");
      }
    },
    commentPost() {
      //   const user = JSON.parse(localStorage.getItem("groupomaniaUser"));
      //   const token = user.token;
      const id = localStorage.getItem("postId");
      const PostId = JSON.stringify(id);
      const content = this.post.comment.content;
      const comment = {
        content,
        PostId,
      };
      console.log(comment);
      //   if (!content) {
      //     alert("Veuillez remplir tous les champs !");
      //   } else {
      //   }
    },
    clearLocalStorage() {
      localStorage.removeItem("postId");
    },
  },
  async created() {
    // await this.fetchOnePost();
    // console.log(this.post);
  },
};
</script>