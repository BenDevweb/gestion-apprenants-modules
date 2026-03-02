import User from '#models/user'
import { loginValidator } from '#validators/login'
import { registerValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'
// import { normalize } from 'path'

export default class UsersController {
  async showRegister({ view }: HttpContext) {
    return view.render('pages/register')
  }

  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

  async login({ request, response, view, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      if (user) {
        await auth.use('web').login(user)
        return response.redirect('/')
      }

      return view.render('pages/login', {
        messageError: 'Utilisateur non trouve, veuillez vous inscrire',
      })
    } catch (error: any) {
      const errors = error.messages
        ? error.messages
        : { message: 'Email ou mot de passe incorrect.' }
      const fields: any = {}
      if (error.messages) {
        error.messages?.map(({ field, message }: any) => {
          fields[field] = message
        })

        return view.render('pages/login', { errors: errors, fields: fields || {} })
      }

      return view.render('pages/login', { errors: errors })
    }
  }
  async store({ request, response, view }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const newUser = await User.create(payload)
      return view.render('pages/login', {
        message: 'Registration successful, please log in.',
        newUser,
      })
    } catch (error: any) {
      const errors = error.messages
        ? error.messages
        : { message: 'Email ou mot de passe incorrect.' }
      const fields: any = {}
      if (errors) {
        errors?.map(({ field, message }: any) => {
          fields[field] = message
        })
        return view.render('pages/register', { errors: errors, fields: fields || {} })
      }
      return response.status(400).json({ errors: errors })
    }
  }

  public async attachModule({ params }: HttpContext) {
    const user = await User.findOrFail(params.userId)

    await user.related('modules').attach([params.moduleId])

    return { message: 'Module ajouté au user' }
  }

  public async getUserModules({ params }: HttpContext) {
    const user = await User.query().where('id', params.id).preload('modules').firstOrFail()

    return user
  }
}
