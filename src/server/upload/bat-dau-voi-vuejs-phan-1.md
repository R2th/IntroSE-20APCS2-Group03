![](https://images.viblo.asia/c036f522-cf02-4ebe-89eb-b29f5315dbda.png)

Đây là một bài viết dành cho người mới bắt đầu với VueJS, một JavaScript framework mã nguồn mở để xây dựng giao diện người dùng.

Hiện nay, VueJS được sử dụng chủ yếu cho các ứng dụng web (SPA, PWAs, ...), nhưng VueJS cũng có thể được sử dụng để target native.

Bắt đầu nào!

# Environment Setup
## Installing NodeJS
Trước khi bạn có thể chạy ứng dụng VueJS dưới local, bạn phải cài đặt NodeJS. NodeJs là một môi trường runtime chạy JavaScript thực thi JS code mà không cần trình duyệt.

* [**macOS NodeJS** and **HomeBrew** Installation Instructions](https://dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew) or [**macOS NodeJS** Installation Instructions](https://nodejs.org/en/download/package-manager/#macos)
* [**Windows NodeJS** Installation Instructions](https://nodejs.org/en/download/)
* [**Linux NodeJS** Installation Instructions](https://nodejs.org/en/download/package-manager/)

Sau khi cài đặt, restart terminal/CLI và nhập `npm -v`.

Bạn sẽ thấy phiên bản hiện tại, chẳng hạn như:

`6.4.1`

`npm` là Node Package Manager  - chúng tôi sẽ sử dụng nó để cài đặt các project dependencies với các lệnh như `npm install package-name --save` và để spin up VueJS app bên trong một Node server với các lệnh như `npm run serve` và `npm start`.

## Installing vue-cli
**Vue-cli** là command line helper để khởi tạo và quản lý các ứng dụng VueJS.

Hãy cài đặt nó **globally** với npm để có thể sử dụng nó từ CLI:

```
npm install -g @vue/cli
```

Sau khi cài đặt, hãy restart CLI terminal của bạn để đảm bảo nó có các lệnh mới nhất được tải và kiểm tra **vue-cli** hoạt động bằng cách chạy:

```
vue --version
```

# Generating a Project
Hãy tạo một project với **router** sử dụng **vue-cli**

1. Trên CLI của bạn, điều hướng đến thư mục mà bạn muốn tạo dự án của mình.
2. Chạy lệnh sau:

```
vue create hello-world
```

3. Sử dụng các phím mũi tên để highlight `default` và nhấn **enter/return**:

![](https://images.viblo.asia/b24025ed-7cd1-4268-b45c-4c27406d2972.png)

Lưu ý: **Babel** là một bộ chuyển mã chuyển đổi cú pháp JavaScript cực kỳ hiện đại của chúng tathành JavaScript, HTML và CSS có thể đọc được trên trình duyệt.

4. Đợi project của bạn được tạo và cd `hello-world`
5. Chạy `npm run serve`. Đợi ứng dụng biên dịch và bạn sẽ thấy một cái gì đó như sau:

![](https://images.viblo.asia/433aa616-e855-4460-a5fd-aa6c8f3cc79e.png)

`npm run serve` bắt đầu một máy chủ phát triển theo dõi source code của chúng ta thay đổi. Lưu ý rằng những người khác trong mạng của bạn có thể truy cập ứng dụng của bạn bằng địa chỉ `-Network` IP được hiển thị trên CLI của bạn.

6. Mở trình duyệt của bạn và điều hướng đến URL được hiển thị trên terminal của bạn, trong trường hợp trên `http://localhost:8080` bạn sẽ thấy như sau:

![](https://images.viblo.asia/53b8dd51-811e-4077-9589-cf463d77c3af.png)

Xin chúc mừng! Bạn đã tạo ra ứng dụng VueJS đầu tiên của mình!

# Our Project Files
Mở thư mục dự án của bạn. Chúng ta hãy xem những gì `vue create` ra cho chúng ta với các tùy chọn mặc định:

## — package.json
`package.json` chứa một ** JSON object** chứa tên dự án của chúng ta, các `npm packages` được cài đặt trong dự án của chúng ta, các `scripts` được sử dụng để chạy dự án của chúng ta (ví dụ: `npm run serve`) và cấu hình ứng dụng khác:

![](https://images.viblo.asia/fc7e2c1e-c350-44d3-91b7-75a4999b36f7.png)

**Lưu ý  re: dependencies**: thư mục **.gitignored** trong cây thư mục bên trái: `node_modules`; Thư mục này chứa tất cả các dependencies  được cài đặt ở trên (hoặc node packages).

Khi bạn commit dự án này với version control (ví dụ: git repo), theo mặc định thư mục này là `.gitignore`, vì vậy mỗi lần bạn lấy một bản sao mới của dự án từ version control, bạn phải chạy `npm install` để cài đặt các dependencies của bạn khai báo trong package.json.

## — public/index.html
File **public/index.html** của bạn nơi ứng dụng VueJS của chúng ta renders:

![](https://images.viblo.asia/9cfb5a33-c246-4913-a16a-dad4d3e82c31.png)

Mã JavaScript của chúng ta targets `<div>` với id của "app" và renders ứng dụng của chúng ta ở đó. Đây cũng là một targeting method được sử dụng bởi ReactJS SPAs và sử dụng cùng HTML tag ID  targeting common trong plain JS và JQuery.

## — src/
Thư mục `/src `của chúng ta là nơi phép màu xảy ra - đây là nơi chúng ta viết mã VueJS và là nơi chúng ta đặt các assets used trong code VueJS.

### — src/main.js
`src/main.js` là nơi root Vue instance của chúng ta được khai báo và cấu hình:

![](https://images.viblo.asia/d1cd4252-ef22-45ec-a15e-337c1fe0a31c.png)

### — src/app.vue
`src/app.vue` chứa root Vue component của chúng ta. Giống như tất cả các Vue components, components này bao gồm ba phần có trong các thẻ:

1. Thẻ `<template>...</template>` có chứa component của HTML
2. Thẻ `<script>...</script>` chứa component của JavaScript và thông tin instance component của chúng ta (trong `export default{}`)
3. Các thẻ `<style>...</style>` chứa component-specific CSS.

![](https://images.viblo.asia/15e50cfa-b47b-4ee9-a761-0a861741b8aa.png)

### — src/components/
Thư mục `src/components/` là nơi chúng ta đặt các Vue components có thể được sử dụng trên một hoặc nhiều chế độ xem ứng dụng web hoặc các trang của chúng ta.

### — src/components/HelloWorld.vue
**HelloWorld** component nằm trong thư mục components và chứa các `<template> , <script>  và  <style>` đã nói ở trên, xác định tương ứng component của HTML , JavaScript và CSS.

![](https://images.viblo.asia/da136596-0511-4484-b757-3de2f59819ce.png)

### Còn tiếp ...

# Tham khảo
https://medium.com/js-dojo/getting-started-with-vuejs-for-web-and-native-285dc64f0f0d