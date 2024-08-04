import { HTTPClient } from "../../lib/http.client"
import { ID } from "../types"
import qs from "qs"
import { getPaginationFromResponse, Pagination } from "./common"

export type Todo = {
  userId: ID,
  id: ID,
  title: string,
  completed: boolean,
}

export type GetAllParams = {
  offset: number,
  limit: number,
}

export type CreateTodoDto = Pick<Todo, 'userId' | 'title'>
export type UpdateTodoDto = Partial<Pick<Todo, 'title' | 'completed'>>

const LIMIT = 100
const OFFSET = 0

export class TodoService {
  private client: HTTPClient
  constructor(client: HTTPClient) {
    this.client = client
  }

  async getAll({ offset = OFFSET, limit = LIMIT }: GetAllParams = <GetAllParams>{}): Promise<Pagination<Todo>> {
    var url = '/todos' + '?' + qs.stringify({ offset, limit })
    const response = await this.client.jsonDo<Array<Todo>>(url)
    return getPaginationFromResponse(response, limit)
  }

  async getOne(id: ID): Promise<Todo> {
    var url = '/todos/' + id
    const response = await this.client.jsonDo<Todo>(url)
    return response.body
  }

  async create(dto: CreateTodoDto): Promise<ID> {
    var url = '/todos'
    const response = await this.client.jsonDo<Todo>(url, { method: 'POST', body: dto })
    return response.body.id
  }

  async update(dto: UpdateTodoDto): Promise<ID> {
    var url = '/todos'
    const response = await this.client.jsonDo<Todo>(url, { method: 'PATCH', body: dto })
    return response.body.id
  }
}

