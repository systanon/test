
export type Config = {
  base: string,
  headers?: Record<string, string>;
}

export class HTTPClient {
  #cfg: Config
  constructor(cfg: Config){
this.#cfg = cfg
  }
  async get<T=any> (path: string, body) : Promise<T> {
    console.log(this.#cfg.base, path)
   return (await fetch(this.#cfg.base + path, { headers: this.#cfg.headers })).json()
  }
}

type ApiTodo = {
  title: string
  time: string // ios time string
}

type AppTodo = {
  title: string
  time: number // milliseconds
}

export class TodoService {
  async getTodo (): Promise<AppTodo> {
    const api = await this.client.get<ApiTodo>()
return  {...api, time: new Date(api.time).valueOf() }
  }

}
