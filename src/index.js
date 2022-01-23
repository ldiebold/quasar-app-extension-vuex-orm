const fs = require('fs')
const { render } = require('template-file')
const { pascalCase, snakeCase } = require('change-case')
const pluralize = require('pluralize')

module.exports = function (api) {
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // Add webpack alias for models
  api.chainWebpack((chain) => {
    chain.resolve.alias.set('models', api.resolve.src('models'))
  })

  api.registerCommand('new:model', ({ args, params }) => {
    const modelPascal = pascalCase(args[0])
    const modelTable = pluralize(snakeCase(args[0]))

    const file = api.resolve.src('models') + '/' + modelPascal + '.js'

    const result = render(modelTemplate, { modelPascal, modelTable })
    
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