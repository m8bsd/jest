<template>
  <div class="container-fluid pt-5 pb-5">
    <div class="row text-center mt-2 mb-5">
      <div class="col">
        <h4 class="mt-4 mb-4">
          Venez partager du contenu et restez en contact avec vos collègues.
        </h4>
      </div>
    </div>
    <div class="row justify-content-center">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "Home",
  components: {
    LoginForm,
  },
};
</script>
