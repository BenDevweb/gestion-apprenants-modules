import type { HttpContext } from '@adonisjs/core/http'
import Module from '#models/module'

export default class ModulesController {
    public async show({ params }: HttpContext) {

    const module = await Module
        .query()
        .where('id', params.id)
        .preload('users')
        .firstOrFail()

    return module
    }
    
}