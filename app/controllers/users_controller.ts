import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import user from '#models/user'

export type User = {
  id: number
  name: string
  email: string
  password: string
}

// Tableau global en mémoire
export const users: User[] = []

export default class UsersController {

  // Affiche le formulaire d'inscription
  async showRegister({ view }: HttpContext) {
    return view.render('pages/register')
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only(['name', 'email', 'password'])
    const user: User = {
      id: users.length + 1,
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }

    users.push(user)

    return response.json({
      message: 'Utilisateur enregistre en memoire',
      user,
      users,
    })
  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

  async login({ request, response, session }: HttpContext) {
    try {
      const payload = await loginValidator.validate(request.all())

      const user = users.find(u => u.email === payload.email && u.password === payload.password)

      if (!user) {
        return response.status(401).json({ message: 'Invalid credentials' })
      }

      // Stocke l'ID de l'utilisateur dans la session
      session.put('userId', user.id)

      return response.json({ message: 'Login successful', user }) 
    } catch (error: any) {
      return response.status(400).json({ message: 'Validation failed', errors: error.errors })

    }
  }
} 
