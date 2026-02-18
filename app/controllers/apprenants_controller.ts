import type { HttpContext } from '@adonisjs/core/http'

export default class ApprenantsController {
    public async createApprenant({request}: HttpContext){
        const {name, lastName, genre, phone, email, password} = request.all()
        const apprenant = await Apprenant.create({name, lastName, genre, phone, email, password})
        return apprenant
    }

    async getApprenants({ view }: HttpContext) {
    return view.render('apprenants', { apprenants: this.apprenants })
  }
}