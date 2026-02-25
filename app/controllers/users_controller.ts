import type { HttpContext } from '@adonisjs/core/http'

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

  // Enregistre un utilisateur
  async store({ request, response }: HttpContext) {
    const payload = request.only(['name', 'email', 'password'])

    const user: User = {
      id: users.length + 1,
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }

    users.push(user)

    return response.redirect('/login')
  }

  // Affiche le formulaire de connexion
  async showLogin({ view, session }: HttpContext) {
    const error = session.flashMessages.get('error')?.[0] || null
    return view.render('pages/login', { error })
  }

  // Traitement de la connexion
  async login({ request, response, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      session.flash('error', 'Email ou mot de passe incorrect')
      return response.redirect('/login')
    }

    // Sauvegarde "connexion" dans la session
    session.put('userId', user.id)

    return response.redirect('/')
  }

  // Déconnexion
  async logout({ session, response }: HttpContext) {
    session.forget('userId')
    return response.redirect('/login')
  }
}