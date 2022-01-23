import { Database, install } from '@vuex-orm/core'

export default function () {
  /**
   * Here, we initialize the database, and require all js files
   * in our models direcory
   */
  const database = new Database()
  const modelFileContext = require.context('src/models', false, /\.js$/)
  modelFileContext.keys().forEach(modelPath => {
    const model = modelFileContext(modelPath)
    database.register(model.default)
  })

  return install(database)
}
