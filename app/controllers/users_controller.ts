import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/login'
import { registerValidator } from '#validators/register'


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

  async store({ request, view }: HttpContext) {
   try {
     const payload = await request.validateUsing(registerValidator)
      const user: User = {
        id: users.length + 1,
        name: payload.name,
        email: payload.email,
        password: payload.password,
      }

    users.push(user)

    return view.render('pages/login', {message: 'Compte créé avec succès. Veuillez vous connecter.'})
    } catch (error: any) {
      const errors = error?.messages ? error.messages : { message: 'Erreur lors de l\'inscription. Veuillez réessayer.'}
      const fields: any = {}
      if (error?.messages) {
        error.messages.map(({ field, message }: any) => {
          fields[field] = message
        })
        return view.render('pages/register', { errors: errors, fields: fields || {} })
      }
      return view.render('pages/register', { errors: errors })
   }

  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

 async login({request, view}: HttpContext) {
  try {
    const payload = await request.validateUsing(loginValidator)
    const user = users.find((u) => u.email === payload.email && u.password === payload.password)

    if(!user) {
      return view.render('pages/login', { errors: { message: 'Email ou mot de passe incorrect.' } })
    }
    return view.render('pages/home', {message: `Bonjour et bienvenue ${user.email} ! Vous êtes connecté(e).`})
  } catch (error: any) {
    const errors = error?.messages ? error.messages : { message: 'Erreur lors de la connexion. Veuillez réessayer.'}
    const fields: any = {}
    if (error?.messages) {
      error.messages.map(({ field, message }: any) => {
        fields[field] = message
      })
      return view.render('pages/login', { errors: errors, fields: fields || {} })
    }
    return view.render('pages/login', { errors: errors })
  }
 }
} 

