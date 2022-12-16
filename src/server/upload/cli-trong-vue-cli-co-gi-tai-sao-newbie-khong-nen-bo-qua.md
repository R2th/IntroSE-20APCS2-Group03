Trong bài viết này mình hướng đến đối tượng là các bạn **newbie**. Các bạn mới hoặc chưa có nhiều kinh nghiệm làm việc với Vue và các framework khác nói chung.

## Giới thiệu
> Vue CLI aims to be the standard tooling baseline for the Vue ecosystem. It ensures the various build tools work smoothly together with sensible defaults so you can focus on writing your app instead of spending days wrangling with configurations. At the same time, it still offers the flexibility to tweak the config of each tool without the need for ejecting.

Theo như giới thiệu thì các bạn có thể hiểu đơn giản nó được coi như một **tool**. Giúp chúng ta không mất thời gian config mà dành thời gian để phát triển dự án của mình.

Chi tiết bạn xem ở [đây](https://cli.vuejs.org/guide/) 


## Tại sao?
Chắc hẳn anh em sẽ thắc mắc là ngoài kia có một loạt các bài viết về **Vue CLI**. Chi tiết cách cài đặt, sử dụng và cả repo example rồi thì bài viết này sinh ra làm gì nữa phải không nào?

Mình muốn tiếp cận ở một hướng hoàn toàn khác. Tại sao nó sinh ra, được người ta dùng nhiều và nếu như không có Vue CLI thì có chết ai không???

Khi mình phỏng vấn dev, thì thấy đa số các bạn newbie gặp vấn đề như sau:

1. Không biết tại sao lại có các command kiểu như **yarn serve** để các bạn ý dùng.
2. Không biết tại sao browser chỉ hiểu được code HTML, JS, CSS mà mình code Vue, React code lẫn lộn nhau mà browser nó vẫn hiểu được.
3. Đa số là do team lead cấu hình cho hoặc dùng sẵn Boilerplate trên git.

## Chúng ta cần gì?
### Development
Chúng ta cần môi trường để phát triển ứng dụng. Vậy thì làm cách nào để code của chúng ta từ Vue, Sass, Less... test được trên browser một cách nhanh nhất.
1. Một cái gì đấy để compile code sang html, css, js để browser hiểu được **(Webpack, Rollup...)**
2. Một con dev server để serve assets mà con compile đã sinh ra.** (serve...)**
3. Hỗ trợ hot reload để chúng ta đỡ mất tiền thay phím **F5**

Từ yêu cầu trên, chúng ta có thể sử dụng Webpack. Nó đám ứng đủ những gì mà chúng ta cần và nhiều hơn nữa.
Ơ thế là *"Không có Vue CLI"* thì không chết.
![](https://images.viblo.asia/b6f0f66f-5b1e-4114-9053-7367d74dc4ea.png)


### Build
Sau khi đã dành nhiều thời gian cào phím (à quên gõ phím). Ứng dụng của chúng ta cũng tương đối, giờ muốn **build** và **deploy** nó lên **server**.
Chúng ta lại cần:
1. Sau khi build thì vẫn chỉ có html, css, js thôi
2. Static files (image, video, font...) thì phải được minify hay tối ưu để nó nhẹ nhất có thể.
3. Code của chúng ta phải được minify, split... để giảm **bundle size**.
**Webpack** nó có làm được không? Một lần nữa nó lại làm tốt.
Ơ thế lại là *"Không có Vue CLI"* thì không chết.

![](https://images.viblo.asia/c3d54735-61e0-44a7-a9b6-fd825e826fc3.png)

## Trong Vue CLI có gì?
Thực tế thì toàn bộ Vue CLI được code bằng NodeJS. Nó được chia thành nhiều packages khác nhau. Mỗi package có một feature nhất định. 
Nếu bạn tò mò thì xem source code ở [đây](https://github.com/vuejs/vue-cli) nhé.

### Vue CLI Service
[Docs](https://cli.vuejs.org/guide/cli-service.html) của nó. Nôm na là nó cung cấp cho mình các **commands** để cho phép mình có môi trường **development** và **build**.

#### Serve
```bash
vue-cli-service serve
```
> Bạn sẽ có một dev server và dùng Webpack để compile code của dự án. Tất nhiên bạn có thể custom config Webpack theo ý muốn của bạn.

```js
// create server
    const server = new WebpackDevServer(compiler, Object.assign({
      logLevel: 'silent',
      clientLogLevel: 'silent',
      historyApiFallback: {
        disableDotRule: true,
        htmlAcceptHeaders: [
          'text/html',
          'application/xhtml+xml'
        ],
        rewrites: genHistoryApiFallbackRewrites(options.publicPath, options.pages)
      },
      contentBase: api.resolve('public'),
      watchContentBase: !isProduction,
      hot: !isProduction,
      injectClient: false,
      compress: isProduction,
      publicPath: options.publicPath,
      overlay: isProduction // TODO disable this
        ? false
        : { warnings: false, errors: true }
    }, projectDevServerOptions, {
      https: useHttps,
      proxy: proxySettings,
      public: publicHost,
      // eslint-disable-next-line no-shadow
      before (app, server) {
        // launch editor support.
        // this works with vue-devtools & @vue/cli-overlay
        app.use('/__open-in-editor', launchEditorMiddleware(() => console.log(
          `To specify an editor, specify the EDITOR env variable or ` +
          `add "editor" field to your Vue project config.\n`
        )))
        // allow other plugins to register middlewares, e.g. PWA
        api.service.devServerConfigFns.forEach(fn => fn(app, server))
        // apply in project middlewares
        projectDevServerOptions.before && projectDevServerOptions.before(app, server)
      },
      // avoid opening browser
      open: false
    }))

    ;['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        server.close(() => {
          process.exit(0)
        })
      })
    })
```
Source: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/serve.js

#### Build
```bash
vue-cli-service build
```
> Code của bạn sẽ được build theo config mặc định hoặc custom tùy theo ý của bạn.
```js
return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      stopSpinner(false)
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        return reject(new Error('Build failed with errors.'))
      }

      if (!args.silent) {
        const targetDirShort = path.relative(
          api.service.context,
          targetDir
        )
        log(formatStats(stats, targetDirShort, api))
        if (args.target === 'app' && !isLegacyBuild) {
          if (!args.watch) {
            done(`Build complete. The ${chalk.cyan(targetDirShort)} directory is ready to be deployed.`)
            info(`Check out deployment instructions at ${chalk.cyan(`https://cli.vuejs.org/guide/deployment.html`)}\n`)
          } else {
            done(`Build complete. Watching for changes...`)
          }
        }
      }

      // test-only signal
      if (process.env.VUE_CLI_TEST) {
        console.log('Build complete.')
      }

      resolve()
    })
  })
```
Source: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/build/index.js

#### Inspect
```bash
vue-cli-service inspect
```
>  Bạn có thể xem được config của Webpack ở dự án của mình.

Source: https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/commands/inspect.js

## Nếu không có Vue CLI?
### Tự config Webpack
Như đã nói ở trên, thì sau cùng Vue CLI cũng dùng Webpack để **compile** code cho chúng ta. Chỉ khác là nó đã config
sẵn, chúng ta không cần phải config lại. Chính vì vậy chúng ta hoàn toàn có thể tự config bằng **Webpack** được.
- [Docs](https://webpack.js.org/) của nó. Đi từng step một thì bạn cũng sẽ hiểu cách nó hoạt động.
- Ngoài ra các bạn có thể tham khảo example có rất nhiều trên Github. Ví dụ [cái này](https://github.com/samteb/vue-2-webpack-4-boilerplate)

### Dùng Vite
**Vite** là một tool mới toanh được phát triển bởi Evan You (Creator of Vue). Đến đây thì càng khẳng định là Vue CLI không phải là tool duy nhất để compile code.
> A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR). A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

- [Docs](https://vitejs.dev/guide/) của nó. Tương tự như Webpack thì bạn có thể đọc cách config của nó.
- Hoặc xem [example](https://github.com/vitejs/vite/tree/main/packages/playground) nằm trong chính repo của Vite. Bạn sẽ thấy config rất đơn giản, ngoài ra nó còn dùng được cho cả **React**.

![](https://images.viblo.asia/47272b72-0801-4c79-b9dd-3efb47d34718.png)
Source: Medium

### Tự code một CLI được không?
Câu trả lời là hoàn toàn có thể. Các CLI kể trên bản chất cũng chỉ là NodeJS. Mà đã là NodeJS thì bạn hoàn toàn có thể tự build một CLI cho riêng mình. Cá nhân mình đã chính tay build một CLI cho dự án ở cty, tiếc là thời điểm này mình chưa thể public.

## Tạm kết
1. Trong một thế giới đầy những package, framework, tools có sẵn thì chúng ta **không làm mà vẫn có ăn** (Không ăn x, ăn x như  thầy Huấn dạy :v).
2. Để đi nhanh chúng ta có thể sử dụng sẵn những gì đang có. Theo tiêu chí của các framework, library là tập trung vào code feature. Nhưng sau đó bạn nên dành thời gian tìm tòi để hiểu rõ về chúng.
3. Vue CLI chỉ là một ví dụ mình đưa ra ở đây, các CLI khác của React, Angular hoặc một ngôn ngữ khác thì cũng vẫn theo hướng tiếp cận như vậy.
4. Ở bài viết này mình chủ yếu giải thích cho các bạn hiểu về bản chất. Hi vọng có cơ hội chia sẻ với các bạn kỹ hơn về Webpack, Vite...

Cám ơn tất cả anh em đã đọc bài của mình. Hi vọng nhận được ý kiến đóng góp của mọi người để bài viết sau có chất lượng tốt hơn.