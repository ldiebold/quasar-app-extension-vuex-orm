module.exports = function (api) {
  api.render('./templates')

  // Ensure vuex-orm is installed
  api.extendPackageJson({
    dependencies: {
      '@vuex-orm/core': '^0.36.4'
    }
  })
}
