module.exports = function (api) {
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite === true) {
    // Add Vite alias for models
    api.extendViteConf((viteConf) => {
      Object.assign(viteConf.resolve.alias, { models: api.resolve.src('models') })
    })
  } else {
    // Add webpack alias for models
    api.chainWebpack((chain) => {
      chain.resolve.alias.set('models', api.resolve.src('models'))
    })
  }

  api.registerCommand('new:model', ({ args, params }) => {
    var fs = require('fs')
    var { render } = require('template-file')
    var { pascalCase, snakeCase } = require('change-case')
    var pluralize = require('pluralize')

    const modelPascal = pascalCase(args[0])
    const modelTable = pluralize(snakeCase(args[0]))

    const dir = api.resolve.src('models')
    const file = dir + '/' + modelPascal + '.js'

    const result = render(modelTemplate, { modelPascal, modelTable })
    
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    fs.writeFileSync(file, result)
  })
}

var modelTemplate = `import { Model } from '@vuex-orm/core'

export default class {{ modelPascal }} extends Model {
  static entity = '{{ modelTable }}'

  static fields () {
    return {
      id: this.attr(null)
    }
  }
}
`