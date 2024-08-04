import { HTTPClient } from '../lib/http.client'
import { UsersService } from './users.service'
import { TodosService } from './todo.service'
import { PostsService } from './post.service'


const config = {
  base: import.meta.env.VITE_APP_API_URL,
  headers: {
   'Content-Type': 'application/json'
  }
}
const client = new HTTPClient(config)
export const users = new UsersService(client)
export const todos = new TodosService(client)
export const posts = new PostsService(client)

