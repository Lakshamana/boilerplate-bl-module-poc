import { LoadUserByEmailRepository } from '@/application/contracts/database'

type User = LoadUserByEmailRepository.Entity

export const loadByEmailTransformer = (users: User[]): User | false => {
  const arrayUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }))
  return (arrayUsers.length > 0) ? arrayUsers[0] : false
}

export const loadByIdTransformer = (users: User[]): { email: string } | false => {
  const arrayUsers = users.map((user) => ({
    email: user.email
  }))
  return (arrayUsers.length > 0) ? arrayUsers[0] : false
}
