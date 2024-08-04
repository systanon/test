import { ID } from "../types";
import { User, UserService } from "./user.service";

export type SignInDto = Pick<User, "username" | "phone">;

export class AuthService {
  private userService: UserService;
  private users: Array<User> = [];

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signIn(dto: SignInDto): Promise<ID> {
    if (this.users.length == 0) {
      const pagination = await this.userService.getAll();
      this.users = pagination.data;
    }

    const user = this.users.find(
      (user) => user.username === dto.username && user.phone === dto.phone
    );
    if (user === undefined) return Promise.reject();

    return user.id;
  }
  async getProfile(id: ID): Promise<User> {
    return this.userService.getOne(id);
  }
}
