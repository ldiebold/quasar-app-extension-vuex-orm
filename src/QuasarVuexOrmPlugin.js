const VuexORM = require('@vuex-orm/core')

module.exports = function QuasarVuexOrmPlugin() {
  /**
   * Here, we initialize the database, and require all js files
   * in our models direcory
   */
  const database = new VuexORM.Database()
  const modelFileContext = require.context('src/models', false, /\.js$/)
  modelFileContext.keys().forEach(modelPath => {
    const model = modelFileContext(modelPath)
    database.register(model.default)
  })

  return VuexORM.install(database)
}