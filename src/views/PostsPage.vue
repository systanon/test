<script lang="ts">
import { defineComponent } from "vue";
import { posts } from '../services'
import { ApiPost } from "../services/post.service";
import UICheckBox  from "../components/ui/checkbox/UICheckBox.vue"

type PostsPage = {
  posts: Array<ApiPost>
}

export default defineComponent({
  components: {
    UICheckBox
  },

  data: (): PostsPage => ({
    posts: []
  }),
  mounted() {
    posts.getPosts().then(posts => this.posts = posts)
  },
})
</script>

<template>
  <div class="posts">
    <div class="posts-page" v-for="{title, id, userId,} of posts" :key="id">
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
