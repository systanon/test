import { HTTPClient } from "../lib/http.client";
import { AuthService } from "./services/auth.service";
import { PostService } from "./services/post.service";
import { TodoService } from "./services/todo.service";
import { UserService } from "./services/user.service";

export const httpClient = new HTTPClient({
  base: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const todoService = new TodoService(httpClient);
export const postService = new PostService(httpClient);
export const userService = new UserService(httpClient);
export const authService = new AuthService(userService);
