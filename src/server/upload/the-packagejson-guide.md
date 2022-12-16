## Giới thiệu
Nếu như các bạn đã từng làm việc với JavaScript, Node.js hay những project frontend thì chắc hẳn các bạn đã từng thấy file `package.json`. Vậy `package.json` là file gì  và mục đích của nó là để dùng vào việc gì?

Theo như [Nodejs.dev](https://nodejs.dev/learn) thì `package.json` file dùng để manifest cho dự án của chúng ta. Nó có thể làm được rất nhiều thứ, hoàn toàn không liên quan. Ví dụ, đó là một kho lưu trữ trung tâm của cấu hình cho các công cụ. Nó cũng là nơi [npm](https://www.npmjs.com/) và [yarn](https://yarnpkg.com/) lưu trữ tên và phiên bản cho tất cả các package đã cài đặt.
> The package.json file is kind of a manifest for your project. It can do a lot of things, completely unrelated. It's a central repository of configuration for tools, for example. It's also where npm and yarn store the names and versions for all the installed packages.

## Cấu trúc file
Đây là một ví dụ về một file `package.json`
```json
{}
```
Woala :D, nó hoàn toàn là một chuỗi [JSON](https://www.w3schools.com/js/js_json_intro.asp) rỗng. Không có một yêu cầu cố định nào trong file `package.json` cho ứng dụng của chúng ta. Chỉ có một điều duy nhất chúng ta cần nhớ đó là nó phải tuân theo định dạng `JSON`, nếu không nó không thể được đọc bởi các chương trình cố gắng truy cập các thuộc tính của nó đã được lập trình sẵn.

Nếu như chúng ta muộn tạo ra một package `Node.js` và public nó lên `npm` thì chúng ta cần phải thiết lập những thuộc tính để giúp người khác có thể sử dụng package của chúng ta. Chúng ta sẽ tìm hiểu thêm về các thuộc tính này ở phần sau.

Đây là một ví dụ khác về một file `package.json`
```json
{
  "name": "package-json-guide"
}
```
Ví dụ này định nghĩa thuộc tính `name` là tên của ứng dụng hoặc package của chúng ta, nó dược đặt cùng thư mục chúng ta đang làm việc.

Còn đây là một  ví dụ phức tạp hơn, được tạo ra từ một ứng dụng [Vue.js](https://vuejs.org/) mẫu
```json
{
  "name": "test-project",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "main": "src/main.js",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-eslint": "^8.2.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-jest": "^21.0.2",
    "babel-loader": "^7.1.1",
    "babel-plugin-dynamic-import-node": "^1.2.0",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "eslint": "^4.15.0",
    "eslint-config-airbnb-base": "^11.3.0",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-import-resolver-webpack": "^0.8.3",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-vue": "^4.0.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "jest": "^22.0.4",
    "jest-serializer-vue": "^0.3.0",
    "node-notifier": "^5.1.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-jest": "^1.0.2",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```
hãy xem qua nó chứa những thông tin gì nhé:
* `name`: tên của ứng dụng/package.
* `version`: phiên bản hiện tại của ứng dụng/package.
* `description`: mô tả ngắn gọn về ứng dụng/package.
* `main`: entry point cho ứng dụng.
* `private`: để là `TRUE` nếu không muốn ứng dụng/package chẳng may bị public tại `npm`.
* `scripts`: định nghĩa những node scripts mà chúng ta muốn chạy.
* `dependencies`: danh sách những package `npm` mà chúng ta muốn cài đặt.
* `devDependencies`: danh sách những package `npm` mà chúng ta chỉ muốn cài đặt trên môi trường `development`.
* `engines`: phiên bản `Node.js` mà ứng dụng/package của chúng ta hoạt động.
* `browserslist`: các trình duyệt (và phiên bản của nó) mà ứng dụng/package của chúng ta hỗ trợ.

Tất cả các thuộc tính trên được sử dụng bởi `npm` hoặc các công cụ khác mà chúng ta có thể sử dụng.

## Chi tiết về các thuộc tính

### name
Định nghĩa tên của ứng dụng/package.
```json
{
  "name": "package-json-guide"
}
```
Thuộc tính `name` không được quá **214** ký tự, không được chưa khoảng trắng, chỉ chưa ký tự in thường, dấu gạch ngang (`-`) và dấu gạch dưới (`_`).

Chúng ta cần tuân theo những quy định trên vì khi được public lên `npm` thì nó sẽ có một URL được sinh ra dành riêng cho package của chúng ta dựa trên thuộc tính `name`.

Nếu chúng ta public package này công khai trên GitHub thì chúng ta nên dùng tên của repository GitHub làm giá trị cho thuộc tính này.

### author
Danh sách tên của các tác giả của package.
```json
{
  "author": "John Doe <john.doe@whatever.com> (https://whatever.com)"
}
```
Ta cũng có thể viết theo cách này
```json
{
  "author": {
    "name": "John Doe",
    "email": "john.doe@whatever.com",
    "url": "https://whatever.com"
  }
}
```

### contributors
Cũng như tác giả, dự án có thể có một hoặc nhiều người đóng góp. Thuộc tính này là một mảng liệt kê những người này.
```json
{
  "contributors": "John Doe <john.doe@whatever.com> (https://whatever.com)"
}
```
và cũng giống thuộc tính `author` ta có thể viết như sau
```json
{
  "contributors": {
    "name": "John Doe",
    "email": "john.doe@whatever.com",
    "url": "https://whatever.com"
  }
}
```

### bugs
Đường dẫn đến trang theo dõi các issues của package, thông thường sẽ là trang issues trên Github.
```json
{
  "bugs": "https://github.com/whatever/package/issues"
}
```

### homepage
Đường dẫn đến trang chủ của package.
```json
{
  "homepage": "https://whatever.com/package"
}
```

### version
Phiên bản hiện tại của package
```json
"version": "1.0.0"
```
Thuộc tính này tuân theo ký hiệu đánh dấu phiên bản (`semver`), có nghĩa là thuộc tính này sẽ luôn có dạng số `x.x.x`.

Số đầu tiên là phiên bản chính, số thứ hai là phiên bản phụ và thứ ba là phiên bản vá lỗi.

Có một ý nghĩa trong những con số này: một bản release chỉ sửa lỗi là một bản vá, một bản release giới thiệu những thay đổi `backward-compatible` là một bản phát hành nhỏ, một bản phát hành lớn có thể có những thay đổi lớn (như có thêm feature...v.v).

### license
Chỉ định giấy phép của package.
```json
"license": "MIT"
```

### keywords
Thuộc tính này chứa một loạt các từ khóa liên kết với những gì mà package của chúng ta thực hiện.
```json
"keywords": [
  "email",
  "machine learning",
  "ai"
]
```
Thuộc tính này sẽ giúp mọi người có thể tìm thấy package của chúng ta khi sử dụng những package tương tự hoặc khi họ đang tìm kiếm trên trang chủ của [npm](https://www.npmjs.com/).

### description
Một đoạn mô tả ngắn gọn về package.
```json
"description": "A package to work with strings"
```

Điều này đặc biệt hữu ích nếu ta quyết định public package của chúng ta lên `npm` để mọi người có thể tìm hiểu nội dung của package.

### repository
Chỉ định vị trí repository của package.
```json
"repository": "github:whatever/testing",
```
Lưu ý tiền tố `github`. Chúng ta có thể thay bằng các dịch vụ khác:
```json
"repository": "gitlab:whatever/testing",
```
```json
"repository": "bitbucket:whatever/testing",
```
Ta có thể đặt ra [version control system](https://www.geeksforgeeks.org/version-control-systems/#:~:text=Version%20control%20systems%20are%20a,(snapshots)%20of%20the%20project.) cho package
```json
"repository": {
  "type": "git",
  "url": "https://github.com/whatever/testing.git"
}
```
```json
"repository": {
  "type": "svn",
  "url": "..."
}
```

### main
Thiết lập entry point cho package.

Khi chúng ta import package này vào một ứng dụng, đó sẽ là nơi ứng dụng tìm kiếm các mô-đun đã được export.
```json
"main": "src/main.js"
```

### private
Để là `TRUE`  nếu chúng ta không muốn public trên `npm`.
```json
"private": true
```


### scripts
Định nghĩa các node scripts mà chúng ta cần chạy.
```json
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "start": "npm run dev",
  "unit": "jest --config test/unit/jest.conf.js --coverage",
  "test": "npm run unit",
  "lint": "eslint --ext .js,.vue src test/unit",
  "build": "node build/build.js"
}
```
Các lệnh này chính là những command line của ứng dụng. Chúng ta có thể sử dụng bất kỳ tên nào mà chúng ta muốn cho một lệnh và các tập lệnh có thể thực hiện bất cứ điều gì chúng ta muốn

### dependencies
Danh sách những package mà chúng ta cần cài đặt.
```json
"dependencies": {
  "vue": "^2.5.2"
}
```

Khi chúng ta cài những package này bằng command line
```shell
npm install <PACKAGENAME>
yarn add <PACKAGENAME>
```
thì tên của package này sẽ được tự động thêm vào `dependencies`

### devDependencies
Thuộc tính này cũng tương tự như `dependencies` chỉ có duy nhất một điều khác là những package được liệt kê trong thuộc tính này sẽ được được cài đặt trên môi trường `development`
```json
"devDependencies": {
  "autoprefixer": "^7.1.2",
  "babel-core": "^6.22.1"
}
```

Khi chúng ta cài những package này bằng command line
```shell
npm install --dev <PACKAGENAME>
yarn add --dev <PACKAGENAME>
```
thì tên của package này sẽ được tự động thêm vào `devDependencies`

### engines
Đặt phiên bản Node.js và các lệnh khác mà package/ứng dụng này hoạt động.
```json
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0",
  "yarn": "^0.13.0"
}
```

### browserslist
Được sử dụng để cho biết chúng ta muốn hỗ trợ trình duyệt nào (và phiên bản của chúng). Nó được tham chiếu bởi Babel, Autoprefixer và các công cụ khác, để chỉ thêm polyfills và dự phòng cần thiết cho các trình duyệt mà chúng ta hướng đến.
```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```
Ví dụ trên có nghĩa là chúng ta muốn hỗ trợ 2 phiên bản chính cuối cùng của tất cả các trình duyệt với ít nhất 1% mức sử dụng (theo thống kê của [CanIUse.com](https://caniuse.com/)), ngoại trừ IE8 trở xuống.

Mọi người có thể xem thêm [ở đây](https://www.npmjs.com/package/browserslist)

## Thuộc tính cho các Command-specific
`package.json` cũng có thể lưu các cấu hình cho `command-specific` như là `Babel`, `ESLint`...v.v.

Mỗi loại sẽ lại có những thuộc tính riêng như `eslintConfig` hay `babel`. Những lệnh và thuộc tính này mọi người có thể tìm hiểu thêm ở tài liệu sử dụng của các command này.

## Package versions
Chúng ta đã thấy trong mô tả ở trên số phiên bản như sau: `~ 3.0.0` hoặc `^ 0.13.0`. Ý nghĩa của chúng là gì và chúng ta có thể sử dụng các từ chỉ định phiên bản nào khác?

Những ký tự đó chỉ định bản cập nhật nào mà package của chúng ta chấp nhận.

Chúng ta có những quy định khi đặt đánh phiên bản cho package như sau:
* `~`: nếu ta viết `~0.13.0`, bạn chỉ muốn cập nhật các bản vá lỗi: `0.13.1`, còn `0.14.0` thì không.
* `^`: nếu ta viết `^0.13.0` có nghĩa là ta muốn cập nhật những bản vá và các bản cập nhật phụ: `0.13.1`, `0.14.0` và cứ như thế.
* `*`: ký tự này được dùng khi chúng ta muốn cập nhật **tất cả** các phiên bản.
* `>`: sẽ cập nhật những phiên bản **cao hơn** phiên bản mà chúng ta chỉ định.
* `>=`: sẽ cập nhật những phiên bản **cao hơn** hoặc **bằng** phiên bản mà chúng ta chỉ định.
* `<=`: sẽ cập nhật những phiên bản **thấp hơn** hoặc **bằng** phiên bản mà chúng ta chỉ định.
* `<`: sẽ cập nhật những phiên bản **thấp hơn** phiên bản mà chúng ta chỉ định.

Có một vài quy định khác như sau:
* `no symbol (x.x.x)`: khi cập nhật duy nhất phiên bản mà chúng ta chỉ định.
* `latest`: cập nhật phiên bản mới nhất.

và chúng ta có thể kết hợp hầu hết các giá trị trên trong các phạm vi, như sau: `1.0.0 || > = 1.1.0 <1.2.0`, để sử dụng `1.0.0` hoặc một bản phát hành từ `1.1.0` trở lên, nhưng thấp hơn `1.2.0`.

## Tổng kết
Qua bài viết này thì mình cùng các bạn đã cùng tìm hiểu cơ bản về mục đích, cấu trúc và một số tips khi sử dụng file `package.json`.

## Tham khảo
https://nodejs.dev/learn/the-package-json-guide