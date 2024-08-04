import { HTTPClient } from "../lib/http.client";

export type ApiTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export class TodosService {
  #client: HTTPClient;

  constructor(client: HTTPClient) {
    this.#client = client;
  }
  async geTodos(): Promise<Array<ApiTodo>> {
    return await this.#client.get<Array<ApiTodo>>("/todos", null);
  }
}
