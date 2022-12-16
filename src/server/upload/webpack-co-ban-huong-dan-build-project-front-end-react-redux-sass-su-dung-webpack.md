**1. Webpack Cơ bản**

****Webpack****: là static module để gói các ứng dụng JavaScript . Nó nhận vào các module cùng với các dependencies và generate ra các static assets tương ứng. 
Nói chung thì nó dùng để quản lý các asset(js, css, image, font, vv) trong dự án của bạn.

![](https://images.viblo.asia/a8dcfe82-0c02-4c98-a305-0f9110e65f50.png)

**5 Concepts cơ bản trong webpack:**
* Entry: nó sẽ chỉ modules webpack nào nên sử dụng để bắt đầu xây dựng, có nghĩa là webpack sẽ tìm thằng này đầu tiên.

```
module.exports = {
    entry: './index.js'
}
```

* Output: giống như với cái tên của nó, nó sẽ nói với webpack nơi sẽ tạo và đặt tên.
```
const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'js/bundle.js' 
    }
}
```
   ` --> KQ nó sẽ tạo folder dist làm nơi chứa và file bundle.js`

* Loader: bình thường webpack chỉ hiểu được javascript và json file. Loader nó sẽ cho phép webpack xữ lí file có định dạng khác và chuyển đổi chúng để sử dụng. Loader có 2 properties la`: 
    1. `text`: nó xác định file nào nên chuyển đổi.
    2.  `use`: nó xác định Loader nào nên sử dụng để chuyển đổi.   

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
            }
        ]
}
```

* Plugin: dùng để tối ưu hóa, quản lý asset, vv

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```
`HtmlWebpackPlugin: đây là pluin nó sẽ tự động tạo một file html và mặc định nếu ko truyền vào nó sẽ tạo index.html trong folder dist`

* Mode:  bằng cách chỉnh tham số value `mode` = `development`, `production`, `none` bạn có thể cho phép webpack chạy với môi trường nào.  Mặc định nó là `production`

```
module.exports = {
    mode: 'production'
}
```

**2. Hướng dẫn build project front-end (React, Redux, Sass) sử dụng Webpack**

Trước khi bắt đầu, bạn hãy tạo một folder chứa dự án và khởi tạo NPM. 
```
    mkdir react-app
    cd react-app
    npm init -y
```
Sau đó cài React, ở đây mình dùng yarn cho nhanh :muscle: 
Bạn cũng có thể xài npm cũng được.
```
    yarn add react (or) npm install react --save
```
Để render DOM trong React thì chúng ta cần một package là `react-dom`
```
    yarn add react-dom 
```

Tiếp tới mình sẽ cài thằng Redux.
```
yarn add redux 
```
Trong dự án này thì Redux nó sẽ làm việc với React nên mình sẽ cài thêm một module
```
yarn add react-redux 
```

Tiếp tới cài node module SASS
```
yarn add node-sass 
```

Vậy là xong các module chính cho dự án.
Tiếp đến cài webpack, 
```
yarn add webpack webpack-cli --dev 
```

Do trình duyệt hiểu được cú pháp JS ES5, mà React sử dụng khá nhiều cú pháp JS2015(ES6) nên cần một module để có thể chuyển nó thành ES5 cho browser có thể đọc được.
Đây mình sẽ cài Babel
```
yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react --dev 
```

Bạn tạo một file `.babelrc` trong thư mục react-app đã tạo ban đầu để cấu hình transpile của babel.
Và thêm vào như sau :
```
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

Tiếp theo bạn hãy cài tất cả các module còn lại dùng để chỉnh cấu hình webpack
```
yarn add css-loader sass-loader style-loader clean-webpack-plugin html-webpack-plugin html-webpack-template webpack-dev-server webpack-merge mini-css-extract-plugin --dev
```

Mình sẽ giải thích sơ sơ về các module trên 
1. css-loader: nó sẽ phân tích cú pháp vào Javascript 
2. sass-loader: nó biến đổi Sass thành Css
3. style-loader: chèn CSS vào bên trong thẻ <style>
4. clean-webpack-pluin: module này nó sẽ dọn dẹp lại thư mục chứa folder build webpack, xóa bỏ các file không cần thiết.
5. html-webpack-plugin: nó sẽ tự động tạo một file html (nó sẽ tạo file index.html vào folder build webpack)
6. html-webpack-template: đây là một template tiện lợi cho thằng html-webpack-plugin
7. webpack-dev-server: nó là module dùng để chạy trên môi trường development
8. webpack-merge: dùng để ghép các file js với nhau.
9. mini-css-extract-plugin: nó sẽ thu gọn file css lại cho môi trường product.

Sau khi cài đặt các module xong, mình sẽ tạo một vài file index.js và index.sass

`src/js/index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
function App() {
    return <h1>Hello World</h1>;
}

const root = document.getElementById('root');

ReactDOM.render(<App/>, root);
```
    
 `src/sass/index.scss`
```
body {
    padding: 0;
    margin: 0;
    font: {
        size: 3rem;
        weight: 1000;
    };
    color: red;
}
```
    
Giờ bạn đã tới bước tùy chỉnh cấu hình webpack :D
Đầu tiên hãy tạo 3 file `webpack.common.js` `webpack.dev.js` `webpack.prod.js`
1. `webpack.common.js` là file webpack cấu hình chung cơ bản.
2. `webpack.dev.js` là file webpack dành cho `development`.
3. `webpack.prod.js` là file webpack dành cho `product`
 
Mình sẽ bắt đầu cấu hình chung cơ bản trước`webpack.common.js`

```
const path = require('path');

module.exports = {
    // entry chinh de bundle
    entry: ['./src/js/index.js', './src/sass/index.scss'],
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            // các file .js or .jsx được loader bởi 'babel-loader'
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [/node_modules/] // nó sẽ không tìm trong folder /node_modules
        }]
    }
}
```
 Tiếp theo cấu hình môi trường development `webpack.dev.js`

```
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// nó ghép với file webpack`webpack.common.js` đã cấu hình cơ bản để sử dụng.
module.exports = merge(common, {
    // môi trường : development
    mode: 'development',
    
    //  nó sẽ hiển thị lỗi ở đâu (vì khi lỗi nó sẽ hiển thị ở file đã build trong folder dist
    // mà khi build là cú pháp js5 cái ta cần là chính xác lỗi chỗ nào, 
    // đó là lý do bạn nên để 'inline-source-map'
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        // các file scss được loader bởi style-loader, css-loader, sass-loader
        rules: [{
            test: /\.(scss|sass)$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    watch: true,
    plugins: [
        // HotModuleReplacementPlugin: nó giúp tạo ra server riêng tự động reload khi có bất kỳ thay đổi nào từ các file hệ client của project/
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack React Example',
            inject: false,
            template: require('html-webpack-template'),
            meta: [{
                name: 'description',
                content: 'A better default template for html-webpack-plugin.'
            }],
            mobile: true,
            lang: 'en-US',
            bodyHtmlSnippet: '<div id="root"></div>',
        })
    ]
})
```
    
Kế tiếp bạn cấu hình `webpack.prod.js`cho môi trường `production`

```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(scss|sass)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    plugins: [
        // nó sẽ clean thư mục`dist/js & dist/css` trước khi build 
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/js', 'dist/css'],
        }),
        // nó sẽ minify file css
        new MiniCssExtractPlugin({
            filename: "css/index.css"
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack React Example',
            inject: false,
            template: require('html-webpack-template'),
            meta: [{
                name: 'description',
                content: 'A better default template for html-webpack-plugin.'
            }],
            mobile: true,
            lang: 'en-US',
            bodyHtmlSnippet: '<div id="root"></div>',
            filename: 'index.html'
        })
    ]
});
```

Bây giờ còn một công đoạn cuối cùng là chỉnh package.json để chạy thôi :D
```
"scripts": {
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```
Giờ bạn chạy `yarn start` để chạy với môi trường development
Nếu bạn cần build cho product để sử dụng thì `yarn build`
 
Đến đây, mình xin kết thúc bài viết tại đây. Nếu bạn làm bị lỗi hoặc lạc hướng thì có thể xem source: 
    [link](https://github.com/quoctrung163/react-app-webpack)

Đây là bài viết đầu tiên của mình nên có nhiều sai sót mong các bác thông cảm :D