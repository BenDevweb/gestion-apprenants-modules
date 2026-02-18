import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const databaseConfig = defineConfig({
  connection: env.get('DB_CONNECTION'),

  connections: {
    mysql: {
      client: 'mysql2',

      connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'gestion_formation',
      },

      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default databaseConfig
