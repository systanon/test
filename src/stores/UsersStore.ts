import { defineStore } from 'pinia'
import { users } from '../services'
import { ApiUser } from "../services/users.service";


interface UserPage  {
  users: Array<ApiUser>
  usersByKey: Record<string, ApiUser>
}


export const useUsersStore = defineStore('usersStore', {
  state: (): UserPage => {
    return {
      users: [],
      usersByKey: {}
    }
  },
  actions: {
    getUsers() {
      users.getUsers().then(users => {
        users.forEach(this.setUsers)
        this.users = users
      })

    },
    setUsers(user: ApiUser) {
      const {username, phone}: {username: string, phone: string} = user
      const key = `${username}:${phone}`
      this.usersByKey[key] = user
    }
  },
})