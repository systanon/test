import { HTTPClient } from "../lib/http.client";


export type ApiPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export class PostsService {
  #client: HTTPClient;

  constructor(client: HTTPClient) {
    this.#client = client;
  }
  async getPosts(): Promise<Array<ApiPost>> {
    return await this.#client.get<Array<ApiPost>>("/posts", null);
  }
}
