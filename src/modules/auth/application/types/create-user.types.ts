export class CreateUserTypes {
  data: {
    id: number
    firstName: string
    lastName?: string
    email: string
  }
  tokens: {
    access_token: string
    refresh_token: string
  }
}
