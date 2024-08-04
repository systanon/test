import { defineStore } from 'pinia'
import { User } from '../application/services/user.service'
import { userService } from '../application'


interface UserPage  {
  users: Array<User>
  total: number
  pages: number
}


export const useUsersStore = defineStore('usersStore', {
  state: (): UserPage => {
    return {
      users: [],
      total: 0,
      pages: 1
    }
  },
  actions: {
    getUsers() {
      userService.getAll().then(({data, total, pages}) => {
        this.users = data
        this.total = total
        this.pages = pages
      })

    }
  },
})