import { HTTPResponse } from "../../lib/http.client"

export const HEADER = {
  TOTAL: 'X-Total-Count',
  PAGES: 'X-Pages-Count',
}

export type Pagination<T> = {
  data: Array<T>,
  total: number,
  pages: number,
}

const calculatePages = (total: number, limit: number): number => Math.ceil(total / limit) || 1

export const getPaginationFromResponse = <T>(response: HTTPResponse<Array<T>>, limit: number): Pagination<T> => {
  const total = Number(response.headers?.[HEADER.TOTAL]) || response.body.length
  const pages = Number(response.headers?.[HEADER.PAGES]) || calculatePages(total, limit)

  return {
    data: response.body ?? [],
    total,
    pages,
  }
}
