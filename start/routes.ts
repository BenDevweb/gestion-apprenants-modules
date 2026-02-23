import router from '@adonisjs/core/services/router'
const ApprenantsController = () => import('#controllers/apprenants_controller')


router.on('/').render('pages/home')
router.on('/SignupPage').render('pages/SignupPage')

router.post('/apprenants', [ApprenantsController, 'createApprenant']).as('apprenants.create')
router.get('/apprenants', [ApprenantsController, 'getApprenants']).as('apprenants.getApprenants')
router.get('/apprenants/:id', [ApprenantsController, 'getApprenant']).as('apprenants.getApprenant')
router.get('/apprenants/create', [ApprenantsController, 'createForm']).as('apprenants.createForm')
router.get('/apprenants/:id/edit', [ApprenantsController, 'editForm']).as('apprenants.editForm')
router.put('/apprenants/:id', [ApprenantsController, 'updateApprenant']).as('apprenants.update')
router.post('/apprenants/:id/supprimer', [ApprenantsController, 'supprimerApprenant']).as('apprenants.supprimerApprenant')


