import { HTTPClient } from "../../lib/http.client"
import { ID } from "../types"
import qs from "qs"
import { getPaginationFromResponse, Pagination } from "./common"

export type Post = {
  userId: ID,
  id: ID,
  title: string,
  body: string,
}

export type GetAllParams = {
  offset: number,
  limit: number,
}

export type CreatePostDto = Pick<Post, 'userId' | 'title'>
export type UpdatePostDto = Partial<Pick<Post, 'title' | 'body'>>

const LIMIT = 100
const OFFSET = 0

export class PostService {
  private client: HTTPClient
  constructor(client: HTTPClient) {
    this.client = client
  }

  async getAll({ offset = OFFSET, limit = LIMIT }: GetAllParams = <GetAllParams>{}): Promise<Pagination<Post>> {
    const url = '/posts' + '?' + qs.stringify({ offset, limit })
    const response = await this.client.jsonDo<Array<Post>>(url)
    return getPaginationFromResponse(response, limit)
  }

  async getOne(id: ID): Promise<Post> {
    const url = '/posts/' + id
    const response = await this.client.jsonDo<Post>(url)
    return response.body
  }

  async create(dto: CreatePostDto): Promise<ID> {
    const url = '/posts'
    const response = await this.client.jsonDo<Post>(url, { method: 'POST', body: dto })
    return response.body.id
  }

  async update(dto: UpdatePostDto): Promise<ID> {
    const url = '/posts'
    const response = await this.client.jsonDo<Post>(url, { method: 'PATCH', body: dto })
    return response.body.id
  }
}

