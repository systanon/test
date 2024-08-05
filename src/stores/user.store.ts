import { defineStore } from 'pinia'
import { User } from '../application/services/user.service'
import { userService } from '../application'
import { ID } from '../application/types'


type UserStore  = {
  list: Array<User>
  index: Map<ID, User>
  total: number
  pages: number
}


export const useUsersStore = defineStore('usersStore', {
  state: (): UserStore => {
    return {
      list: [],
      index: new Map(),
      total: 0,
      pages: 1
    }
  },
  actions: {
    getUsers() {
      userService.getAll().then(({data, total, pages}) => {
        this.list = data
        data.forEach(user => this.index.set(user.id, user))
        this.total = total
        this.pages = pages
      })
    }
  },
})