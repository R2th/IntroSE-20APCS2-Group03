# Giới Thiệu
Chào mọi người, hôm nay mình lại quay lại đây, hôm nay mình sẽ hướng dẫn mọi người cài đặt ESLINT để check lỗi khi code js cho đúng chuẩn nhé.

Đầu tiên chúng ta phải hiểu ESLINT là gì và tạo sao lại chọn nó thì mọi người tìm hiểu qua bài này nhé 

[ ESLINT là gì và tạo sao lại chọn nó!](https://viblo.asia/p/hay-su-dung-eslint-cho-du-an-cua-ban-bJzKm07O59N)

Chúng ta vào cài đặt luôn nhé
# Cài đặt
Như bài trước mình đã hướng dẫn mọi người build 1 dự án SPA bằng Laravel và Vuejs rồi đúng không 

[[BackEnd] Build Project Với Laravel - Vuejs](https://viblo.asia/p/xay-dung-spa-app-vuejs-laravel-chuan-det-voi-docker-va-repository-part-i-Qbq5QAaE5D8)

 Mình làm tiếp trên con dự án này nhé
 
Cài đặt thông qua **npm**

```js
sudo  npm install eslint --save-dev
```
cài đăt xong tiếp tục câu lệnh
```js
eslint --init
```
để add file .eslintrc vào project của mình nhé sau đấy nó sẽ đưa ra option cho mình lựa chọn
```js
? How would you like to configure ESLint? Answer questions about your style
? Which version of ECMAScript do you use? ES2017
? Are you using ES6 modules? Yes
? Where will your code run? (Press <space> to select, <a> to toggle all, <i> to invert selection)Browser
? Do you use CommonJS? Yes
? Do you use JSX? Yes
? Do you use React? No
? What style of indentation do you use? Spaces
? What quotes do you use for strings? single
? What line endings do you use? Unix
? Do you require semicolons? Yes
? What format do you want your config file to be in? JavaScript
```
bên trên là những gì mình chọn cho project của mình sau đó sẽ có file .eslintrc.js xuất hiện trong project 
```js
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
```

Trong đó

+ [ **env**](https://eslint.org/docs/user-guide/configuring#specifying-environments): Đây là nơi cấu hình môi trường mà code của chúng ta sẽ chạy. Môi trường khác nhau thì sẽ có những biến toàn cục khác nhau
+ **extends** :
Đây là những config có sẵn được sử dụng, chúng ta sẽ mở rộng chúng bằng cách thêm vào những config của riêng mình. ESLint có một cơ chế khá hay cho phép chúng ta "dùng lại" cấu hình của người khác.

    ...
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    ...
    
+ **parserOptions** :
Mặc định, ESLint kiểm tra cú pháp của ES5, nếu sử dụng ES6 hoặc các phiên bản mới hơn, chúng ta phải cấu hình bằng parserOptions
+ **plugins** :  Đây là những plugin được sử dụng để mở rộng hoạt động của ESLint. 

+ [ **rules**](https://eslint.org/docs/rules/): Đây là chính là phần config những quy tắc mà code cần phải tuân theo. Có nhiều rules đã được config sẵn khi chúng ta extends một cấu hình nào đó thì không cần config lại nữa. Ở đây, chúng ta chỉ cần config thêm những rules mà chúng ta cần tuỳ chỉnh mà thôi. Mỗi rules cần được config hai thông số: giá trị ứng với mức độ áp dụng rules (off, warn, error hoặc 0, 1, 2 cho ngắn gọn) và các tuỳ chọn. Rules ở đây có thể là rules do ESLint cung cấp sẵn hoặc rules của plugin.

+ **globals**
Đây là nơi chúng ta đưa ra danh sách các biến global dùng trong dự án và Eslint có thể bỏ qua nó, phần này mình có thể tự thêm sau khi tạo xong fille .eslintrc.js nhé.
```js
    "globals": {
        "ion": true,
        "trans": true,
        "axios": true,
        "PropTypes": true,
        "Echo": true,
        "moment": true,
        "_": true
    },
```
OK config ngon hết rồi đúng không giờ mn thử vào 1 file js nào đấy trong thư mục **resources/assets/admin/js** rồi chạy **eslint  tenfile.js** nhé
Như mình chạy thử file app.js
```js
eslint app.js
```
kết quả ra rất nhiều lỗi đúng không.
![](https://images.viblo.asia/3fd03ae6-1f2a-413f-8b4f-c1e985e400e3.png)

# Áp dụng ESLint vào dự án
## npm run eslint

Chạy ngon rồi đúng không, giờ chúng ta chỉ cần áp dụng nó vào project là được, làm nó hoạt động như  linter đích thực

Đầu tiên chúng ta t hêm 1 đoạn script vào file **package.json** nhé

```js
"eslint": "eslint 'resources/assets/admin/js/**/*.{js,vue}'",
```
ý nghĩa của đoạn code  này là khi chạy 
> npm run eslint
> 
or

> yarn run eslint
> 
thì eslint nó sẽ truy cập vào tất cả các thư nằm trong **resources/assets/admin/js** và tất cả những file có đuôi là **.js** và **.vue**

Ok mọi người chạy thử 
```js
npm run eslint
``` 

xem kết quả thế nào nhé
![](https://images.viblo.asia/c33a7bf8-5560-4019-841b-965eb0aa7cb2.png)

Ra đống lỗi rồi phải không :)) 

## npm run eslint:fix
Trong eslint có 1 option đó là --fix nó có thể tự  động tìm và fix những lỗi cơ bản cho chúng ta, chúng ta thêm đoạn code này vào file **package.json** nhé
```js
"eslint:fix": "eslint 'resources/assets/admin/js/**/*.{js,vue}' --fix",
```

sau đó chạy 
> npm run eslint:fix

rồi xem kết quả nhé
![](https://images.viblo.asia/f58191f9-f74f-4aa3-90b5-64fc10304d55.png)

nó đã tự động fix được khá là nhiều lỗi rồi phải không
## npm run eslint:watch
Giờ chúng ta sẽ làm 1 chức năng như là **npm run watch** nhé , sịn sò lắm đấy :))
đầu tiên chúng ta cài đặt package **chokidar-cli** nhé

> npm install chokidar-cli --save

package dùng để theo dõi sự thay đổi của các file , sau khi cài xong mình thêm đoạn code sau vào script nhé

```js
"eslint:watch": "chokidar 'resources/assets/admin/js/**/*.js' 'resources/assets/admin/js/**/*.vue' -c 'npm run eslint:fix'",
```

Ok giờ  thử chạy lại 

> npm run dev
> 
sau đó

> npm run eslint:watch 

nhé

![](https://images.viblo.asia/4ca3a904-a093-4fe5-960c-29cbfaa76f8a.png)
 ngon rồi đấy
#  Kết Luận
ESLINT đúng là 1 công cụ tuyệt vời đúng không, giờ chúng ta không phải check convention bằng cơm nữa rồi. mọi người trong team sẽ thống nhất hơn, sẽ chú tâm vào logic hơn vì convention đã có ESLINT lo rồi :)) 
# Pull
+ https://github.com/tranvanmy/ForumMTV/pull/3/files
# Tham khảo
+ [Hãy sử dụng ESLint cho dự án của bạn! ](https://viblo.asia/p/hay-su-dung-eslint-cho-du-an-cua-ban-bJzKm07O59N)