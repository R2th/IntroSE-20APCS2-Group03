![Webpack từ A đến Á cùng kentrung](https://images.viblo.asia/2090b88e-6ec0-49fe-b677-65e927fafc2e.png) 


Nếu các bạn đã làm qua các bài ví dụ trước ở trong series [này](https://viblo.asia/s/webpack-tu-a-den-a-cung-kentrung-pmleB8Am5rd) thì sẽ thấy folder dist của chúng ta có rất nhiều file và trở nên khá lộn xộn.  Webpack đã tạo các file và đặt chúng vào folder dist giúp bạn nhưng nó không theo dõi những file nào thực sự được sử dụng, sẽ có những file thừa, file rác sinh ra. Plugin **CleanWebpackPlugin** được dùng để dọn dẹp lại thư mục dist được gọn gàng hơn, giúp xóa bỏ các file không cần thiết.

Nói chung nên làm sạch folder dist trước mỗi bản build để chỉ các file được sử dụng sẽ được tạo. Bạn hãy quan tâm đến điều đó.

## 1. Cài đặt
Link plugin: https://www.npmjs.com/package/clean-webpack-plugin
```
npm install clean-webpack-plugin --save-dev
```

## 2. Cách sử dụng

```js:webpack.config.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}
```
Ta thấy với cách sử dụng plugin **CleanWebpackPlugin** đã giúp dọn dẹp các file dư thừa không cần thiết rất gọn, mà không cần tốn thời gian để kiểm tra xem file đó có được sử dụng ở đâu hay không, thử tưởng tượng khi dự án của bạn lớn số lượng file lên đến hàng chục file mà bạn cần dọn dẹp các file không dùng xóa đi thì sẽ khổ như nào.

## 3. Options and Defaults (Optional)
```js
new CleanWebpackPlugin({
  // Simulate the removal of files
  // default: false
  dry: true,

  // Write Logs to Console
  // (Always enabled when dry is true)
  // default: false
  verbose: true,

  // Automatically remove all unused webpack assets on rebuild
  // default: true
  cleanStaleWebpackAssets: false,

  // Do not allow removal of current webpack assets
  // default: true
  protectWebpackAssets: false,

  // **WARNING**
  //
  // Notes for the below options:
  //
  // They are unsafe...so test initially with dry: true.
  //
  // Relative to webpack's output.path directory.
  // If outside of webpack's output.path directory,
  //    use full path. path.join(process.cwd(), 'build/**/*')
  //
  // These options extend del's pattern matching API.
  // See https://github.com/sindresorhus/del#patterns
  //    for pattern matching documentation

  // Removes files once prior to Webpack compilation
  //   Not included in rebuilds (watch mode)
  //
  // Use !negative patterns to exclude files
  //
  // default: ['**/*']
  cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],
  cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns

  // Removes files after every build (including watch mode) that match this pattern.
  // Used for files that are not created directly by Webpack.
  //
  // Use !negative patterns to exclude files
  //
  // default: []
  cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],

  // Allow clean patterns outside of process.cwd()
  //
  // requires dry option to be explicitly set
  //
  // default: false
  dangerouslyAllowCleanPatternsOutsideProject: true,
});
```

-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo.

* Tham khảo [CleanWebpackPlugin](https://www.npmjs.com/package/clean-webpack-plugin)
* Tham khảo trên [webpack](https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder)
* Source code [github](https://github.com/kentrung/webpack-tutorial)
* Series [webpack](https://viblo.asia/s/webpack-tu-a-den-a-cung-kentrung-pmleB8Am5rd)
* Liên hệ: trungnt256