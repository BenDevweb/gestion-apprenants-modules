import type { HttpContext } from '@adonisjs/core/http'
import Apprenant from '#models/apprenant'

export default class ApprenantsController {
  public async createApprenant({ request, response }: HttpContext) {
  const { name, lastName, email, genre, phone, password } = request.all()

    const apprenant = await Apprenant.create({
      name,
      lastName,
      email,
      genre,
      phone,
      password
    })

    
    if (request.accepts(['html'])) {
      return response.redirect('/apprenants')
    }

    
    return response.created(apprenant)
  }

  public async createForm({ view }: HttpContext) {
    return view.render('pages/create_apprenant')
  }

  public async getApprenants({ view }: HttpContext) {
    const apprenants = await Apprenant.all()
    return view.render('pages/apprenants', { apprenants })
  }

  public async getApprenant({ params, view }: HttpContext) {
    const apprenant = await Apprenant.find(params.id)
    if (!apprenant) {
      return view.render('pages/create_apprenant', { error: 'Apprenant non trouvé' })
    }
    return view.render('pages/apprenant', { apprenant })
  }

  // Afficher le formulaire avec les données de l'apprenant
public async editForm({ params, view }: HttpContext) {
  const apprenant = await Apprenant.find(params.id)
  if (!apprenant) {
    return view.render('pages/404')
  }
  return view.render('pages/edit_apprenant', { apprenant })
}

// Enregistrer les modifications
public async updateApprenant({ params, request, response }: HttpContext) {
  const apprenant = await Apprenant.find(params.id)
  if (!apprenant) {
    return view.render('pages/404')
  }

  const { name, lastName, email, genre, phone, password } = request.all()

  apprenant.name = name
  apprenant.lastName = lastName
  apprenant.email = email
  apprenant.genre = genre
  apprenant.phone = phone

  // Mettre à jour le mot de passe uniquement s'il est fourni
  if (password) {
    apprenant.password = password
  }

  await apprenant.save()

  return response.redirect('/apprenants')
}

  async supprimerApprenant({ params, response }: HttpContext) {
    const id = Number(params.id)
    const found = this.apprenants.find(apprenant => apprenant.id === id)

    if (!found) {
      return response.status(404).send({ message: 'Apprenant non trouvé' })
    }

    // Supprimer l'apprenant
    this.apprenants = this.apprenants.filter(apprenant => apprenant.id !== id)

    // Rediriger vers la liste
    return response.redirect().toRoute('apprenants.getApprenants')
  }

  
}