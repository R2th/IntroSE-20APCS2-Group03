### Cài đặt Yarn
Để cài đặt Yarn bạn cần thực hiện các lệnh sau

MacOS
```
brew install yarn
```

Ubuntu

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn
```

### Yarn với dự án thuần javascript

Chúng ta tạo một folder dự án tên là `yarn_test` tiếp đó ta dùng lệnh `yarn init` để khởi tạo file `package.json` chứa các thông tin cơ bản về dự án như tên dự án, phiên bản, mô tả, tác giả ...

```
mkdir yarn_test
cd yarn_test

yarn init
```

Ta có file package.json với nội dung như sau

```
{
  "name": "yarn-test",
  "version": "1.0.0",
  "description": "Yarn test project",
  "main": "index.js",
  "author": "Author name",
  "license": "MIT"
}
```

##### Cài đặt với các gói phần mềm (thư viện)

Để cài đặt các gói thư viện cần cho dự án ta dùng lệnh `yarn add`

Ví dụ tôi sẽ cài thêm gói `react` như sau

```
yarn add react
```

Sau khi chạy lệnh trên ta thấy file `package.json` đã thêm một dependency là react

```
"dependencies": {
  "react": "^16.4.1"
}
```
Do lệnh trên ta không chỉ rõ phiên bản của react, Yarn tự động cài đặt một gói react với phiên bản mới nhất hiện tại là `16.4.1` (trong package.json yêu cầu là phiên bản lớn hơn hoặc bằng 16.4.1 bởi vì có thể phiên bản của react sẽ tăng trong tương lai).

Sử dụng
Với các phiên bản ES cũ (nhỏ hơn 6) bạn dùng require
```
var React = require('react');
```
hoặc với ES6 trở lên
```
import React from('react');
```

### Sử dụng yarn trong dự án Rails

Sử dụng yarn để quản lí các gói thư viện javascript với Rails cũng tương tự, khá đơn giản

Ta tạo một project làm ví dụ

```
rails new yarn_test

cd yarn_test
```

Tiếp đó ta chạy `yarn init` để tạo file `package.json`
```
yarn init
```

Ví dụ dự án cần dùng gói thư viện `moment` chẳng hạn. Ta sẽ làm sư sau

Đầu tiên bạn cài đặt thêm thêm gói `moment` như sau
```
yarn add moment
```

Ta thấy file `package.json` đã thêm gói `moment` này vào trong dependencies của nó

```
"dependencies": {
  "moment": "^2.22.2"
},
```

Kiểm tra trong `node_modules` bạn thấy một thư mục `moment` chứa code của thư viện moment đã được thêm vào
![](https://images.viblo.asia/11133d3a-4380-445b-a6ef-72c4676b50d2.png)

Vậy làm sao để sử dụng được nó với Rails ?

Với rails 5 đã tự thêm vào trong `initializers/assets.rb` như sau. Nếu bạn dùng các phiên bản Rails nhỏ hơn thì bạn cần thêm bằng cách thủ công

```
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

Tiếp đó bạn thêm gói `moment` này vào vào file `application.js` là được

```
//= require moment/moment
```

Nếu bạn muốn sử dụng file `min`

```
//= require moment/min/moment.min
```