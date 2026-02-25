import type { HttpContext } from '@adonisjs/core/http'
import { users } from '#controllers/users_controller'

export default class AuthMiddleware {
  public async handle({ session, view }: HttpContext, next: () => Promise<void>) {
    const userId = session.get('userId')
    const authUser = userId ? users.find(u => u.id === userId) : null

    // Partager l'utilisateur connecté avec toutes les vues
    view.share({ authUser })

    await next()
  }
}