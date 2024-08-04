<script lang="ts">
import { defineComponent } from "vue";
import { postService } from '../application/index'
import UICheckBox  from "../components/ui/checkbox/UICheckBox.vue"
import { Post } from "../application/services/post.service";

type PostsPage = {
  posts: Array<Post>
}

export default defineComponent({
  components: {
    UICheckBox
  },

  data: (): PostsPage => ({
    posts: []
  }),
  mounted() {
    postService.getAll().then(({data}) => this.posts = data)
  },
})
</script>

<template>
  <div class="posts">
    <div class="posts-page" v-for="{title, id, userId} of posts" :key="id">
      <p>{{ title }}</p>
    </div>   
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

</style>
