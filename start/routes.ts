import router from '@adonisjs/core/services/router'
const ApprenantsController = () => import('#controllers/apprenants_controller')
const UsersController = () => import('#controllers/users_controller')
import Apprenant from '#models/apprenant'
import Module from '#models/module'



// Render home with dynamic counts
router.get('/', async ({ view }) => {
  const apprenants = await Apprenant.all()
  const modules = await Module.all()
  return view.render('pages/home', { apprenantsCount: apprenants.length, modulesCount: modules.length })
})

router.post('/logout', async ({ session, response }) => {
  session.forget('userId')   // Supprime la session
  return response.redirect('/login')
}).as('logout')

//routes pour le user
router.get('/register', [UsersController, 'showRegister']).as('users.showRegister')
router.post('/users', [UsersController, 'store']).as('users.store')

router.get('/login', [UsersController, 'showLogin']).as('users.showLogin')
router.post('/login', [UsersController, 'login']).as('users.login')

router.post('/apprenants', [ApprenantsController, 'createApprenant']).as('apprenants.create')
router.get('/apprenants', [ApprenantsController, 'getApprenants']).as('apprenants.getApprenants')
router.get('/apprenants/:id', [ApprenantsController, 'getApprenant']).as('apprenants.getApprenant')
router.get('/apprenants/create', [ApprenantsController, 'createForm']).as('apprenants.createForm')
router.get('/apprenants/:id/edit', [ApprenantsController, 'editForm']).as('apprenants.editForm')
router.put('/apprenants/:id', [ApprenantsController, 'updateApprenant']).as('apprenants.update')
router.post('/apprenants/:id/supprimer', [ApprenantsController, 'supprimerApprenant']).as('apprenants.supprimerApprenant')


