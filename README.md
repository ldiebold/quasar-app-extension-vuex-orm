Quasar App Extension For [VuexORM](https://vuex-orm.org/)

> Streamline integrating VuexORM with Quasar!

# Features
- Auto import and register models!
- Easily create new models using Quasar's cli
- `models` aliases already registered for you

# Install
```bash
quasar ext add vuex-orm
```
Notice you now have a `src/models` directory and an "auto import" function at `src/store/QuasarVuexOrmPlugin.js`

Dive into `src/store/index.js` and use the plugin:
```js
import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import QuasarVuexOrmPlugin from './QuasarVuexOrmPlugin'
                               /*🤿^^^^^^^^^^^^^^^^^^^^*/

export default store(function () {
  const Store = createStore({
    plugins: [QuasarVuexOrmPlugin()],
            /*🤿^^^^^^^^^^^^^^^^^^^^*/
    strict: process.env.DEBUGGING
  })

  return Store
})
```

# Create your first model
Creating models is easy! Quasar VuexORM registers a `new:model` command. Check it out...

```sh
quasar run vuex-orm new:model Todo
```
> You may want to turn the above command into an alias 😉

Note that this model is automatically registered for you. In other words **it does NOT need to be manually registered into the vuex-orm database**...
Open [vue dev tools](https://devtools.vuejs.org/) and take a look!

# IDE Support
You almost certainly want to add the `models` alias to your paths in `jsconfig.json`:
```json
{
  "compilerOptions": {
    ...
    "paths": {
      ...
      "models/*": [
        "src/models/*"
      ]
      ...
    }
  },
  ...
}
```

# Want to learn VuexORM?
If you'd like to learn VuexORM, [checkout the amazing VuexORM docs](https://vuex-orm.org/), or [this YouTube series](https://youtube.com/playlist?list=PLFZAa7EupbB5-MLdEuVP8jXW2WADpvI39).

# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
