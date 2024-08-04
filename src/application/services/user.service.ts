import { HTTPClient } from "../../lib/http.client"
import { ID } from "../types"
import qs from "qs"
import { getPaginationFromResponse, Pagination } from "./common"

export type User = {
  id: ID;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type GetAllParams = {
  offset: number,
  limit: number,
}

export type CreateUserDto = Pick<User, 'name' | 'username' | 'email'>
export type UpdateUserDto = Partial<Omit<User, 'id'>>

const LIMIT = 100
const OFFSET = 0

export class UserService {
  private client: HTTPClient
  constructor(client: HTTPClient) {
    this.client = client
  }

  async getAll({ offset = OFFSET, limit = LIMIT }: GetAllParams = <GetAllParams>{}): Promise<Pagination<User>> {
    var url = '/users' + '?' + qs.stringify({ offset, limit })
    const response = await this.client.jsonDo<Array<User>>(url)
    return getPaginationFromResponse(response, limit)
  }

  async getOne(id: ID): Promise<User> {
    var url = '/users/' + id
    const response = await this.client.jsonDo<User>(url)
    return response.body
  }

  async create(dto: CreateUserDto): Promise<ID> {
    var url = '/users'
    const response = await this.client.jsonDo<User>(url, { method: 'POST', body: dto })
    return response.body.id
  }

  async update(dto: UpdateUserDto): Promise<ID> {
    var url = '/users'
    const response = await this.client.jsonDo<User>(url, { method: 'PATCH', body: dto })
    return response.body.id
  }
}

