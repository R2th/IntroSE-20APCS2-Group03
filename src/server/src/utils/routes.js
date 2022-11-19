const _ = require('lodash')
// auto init routes
const initRoutes = (ctx) => {
  const {app, config} = ctx
  const routePath = path.resolve(__dirname, 'routes')
  const priorityRouters = glob.sync(path.join(routePath, '**/index.js'), {
    dot: true,
  })
  const routers = glob.sync(path.join(routePath, '*/.route.js'), {
    dot: true,
  })
  const view = glob.sync(path.join(routePath, '*/.view.js'), {
    dot: true,
  })
  const orderedPriorityRouters = _.sortBy(
    priorityRouters,
    (filePath) => _.split(filePath, '/').length
  )
  const constructAPI = (files, prefix = '', regex = /(^index$)|(\.route$)/) => {
    _.each(files, (filePath) => {
      const router = require(filePath)
      const {dir: routerDir, name: routerName} = path.parse(filePath)
      const subPath = _.replace(routerName, regex, '')
      const fullPath = path.join(routerDir, subPath)
      const rootPath = path.join('/', path.relative(routePath, fullPath))

      _.each(router.stack, (layer) => {
        if (rootPath != '/') {
          console.log(-> api: ${prefix + rootPath} + layer.route.path.trim())
        } else {
          console.log(-> api:  + layer.route.path.trim())
        }
      })
      app.use(prefix + rootPath, router)
    })
  }
  constructAPI(
    [...orderedPriorityRouters, ...routers],
    '/api/' + config.API_VERSION
  )
  constructAPI([...view], '', /(^index$)|(\.view$)/)
}