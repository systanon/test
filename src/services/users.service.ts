import { HTTPClient } from "../lib/http.client";

export type ApiUser = {
  id: number;
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

export class UsersService {
  #client: HTTPClient;

  constructor(client: HTTPClient) {
    this.#client = client;
  }
  async getUsers(): Promise<Array<ApiUser>> {
    const users = await this.#client.get<Array<ApiUser>>('/users', null);
    return users
  }
}
