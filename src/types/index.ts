export interface User {
  login: string
  password: string
}

export interface UserResponse {
  token: string
  role: string
  name: string
}

export interface Order {
  id: number
  name: string
  address: string
  date: number
  status: string
  comment: string
}

export interface OrderWithCorrectDate extends Order {
  correctDate: string
}
