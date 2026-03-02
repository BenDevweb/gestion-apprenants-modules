import router from '@adonisjs/core/services/router'
const ApprenantsController = () => import('#controllers/apprenants_controller')
const UsersController = () => import('#controllers/users_controller')





// Render home with dynamic counts
router.get('/', async ({ view }) => {

  return view.render('pages/home')
})



router.get('/dashbord', async ({ view }) => {

  return view.render('pages/dashboard')
})


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
router.post('/users/:userId/modules/:moduleId', [UsersController, 'attachModule']).as('users.attachModule') 

