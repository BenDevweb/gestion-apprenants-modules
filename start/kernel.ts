/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

// Ajout du middleware global AuthMiddleware


/**
 * L’error handler est utilisé pour convertir une exception
 * en réponse HTTP
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * Le stack middleware du serveur s’exécute sur toutes les requêtes HTTP
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('@adonisjs/static/static_middleware'),
  () => import('@adonisjs/vite/vite_middleware'),
  
])

/**
 * Le stack middleware du router s’exécute sur toutes les requêtes avec une route enregistrée
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/session/session_middleware'),
  () => import('@adonisjs/shield/shield_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),
])

/**
 * Named middleware collection doit être explicitement assignée aux routes ou groupes de routes
 */
export const middleware = router.named({
  guest: () => import('#middleware/guest_middleware'),
  auth: () => import('#middleware/AuthMiddleware'),
})