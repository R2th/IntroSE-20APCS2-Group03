> Dưới đây, một hướng dẫn nhỏ để publish package của riêng bạn trên npm.

Bạn đã viết một số đoạn mã nào đó mà bạn nghĩ là thực sự hữu ích! Bây giờ bạn muốn publish nó vào [npm](https://www.npmjs.com/) để người khác có thể sử dụng package tuyệt vời của bạn!
![](https://images.viblo.asia/80c21aec-5c95-45e8-b3d2-4af998c3f510.png)

Có rất nhiều cấu hình cho npm nhưng bài viết này sẽ chỉ đề cập đến các yếu tố cần thiết để các package của bạn được publish vào npm.
> npm được bao gồm với Node.js. Để kiểm tra xem npm có được cài đặt trên hệ thống của bạn không, hãy chạy lệnh này terminal của bạn: `npm -v`

# Tạo thư mục 
```php
# This will create, and navigate
# into the `test-npm-bundle` directory
mkdir test-npm-bundle
cd test-npm-bundle
```
# Khởi tạo npm
Chúng ta sẽ khởi tạo npm bằng lệnh
```
npm init
```
Chạy npm init sẽ hỏi bạn một vài câu hỏi thiết lập (ví dụ: tên package của bạn, mô tả package của bạn, v.v.).

Bạn có thể nhấn vào Enter Enter Enter cho mỗi câu hỏi và bản tóm tắt mặc định này cho `package.json` sẽ được tạo trong thư mục của bạn:
```json
{
  "name": "test-npm-bundle",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
# Package.json là gì?
Bạn coi package.json như là công thức nấu ăn cho món yêu thích của mình vậy

Package.json chứa tất cả các siêu dữ liệu mô tả về dự án (ví dụ về món bánh khoai vậy) và tất cả các phụ thuộc cần thiết để chạy nó (các thành phần: khoai, bột, đường, v.v.).

Sử dụng tất cả các thông tin này, npm kết hợp mọi thứ lại với nhau để package của bạn có thể được người khác tải xuống và chạy một cách dễ dàng.

Hãy để chỉnh sửa package.json để bao gồm một mô tả và thông tin tác giả.

```
{
  "name": "test-npm-bundle",
  "version": "1.0.0",
  "description": "lần đầu làm chuyện ấy",
  "main": "index.js",
  "author": "KhoiPv <phan.van.khoi@sun-asterisk.com>",
  "license": "ISC"
}
```

Các trường duy nhất yêu cầu trong package.json là "name", phiên bản, "version" và "main". Các "scrpit" đã bị xóa vì chúng ta không có bài test nào được viết.
```
touch index.js
```
Tạo file `index.js` và thêm vào như sau
```js
module.exports = function() {
  console.log('Hôm nay thật tuyệt vời');
  return;
};
```
Hãy nhớ export code của bạn giống như cách bạn làm đối với các file local trong dự án của bạn.
# Tạo một README
Nói chung, README thường được sử dụng cho mục đích để người khác biết cách sử dụng package của bạn.

Hãy tạo file README trong thư mục gốc của bạn:
```
touch README
echo "## Làm theo như trên là được!" > README
```
# Và cuối cùng là Publish
Hiện tại, package trông như sau:
```
test-npm-bundle
 |_ index.js
 |_ README
 |_ package.json
```
Về cơ bản, đây là cấu trúc cơ bản của gói npm. 

Bây giờ chúng ta có thể publish nó!
```
npm publish
```
> Bạn sẽ cần một tài khoản trên trang web đăng ký npm và nếu bạn chưa đăng nhập vào nó từ CLI, bạn sẽ được yêu cầu đăng nhập. Bạn cũng phải sử dụng tên package đã được sử dụng

# Kêt thúc
Cuối cùng tóm gọn lại gồm 3 bước để publish một package như sau
* Khởi tạo: npm init
* Thêm code: index.js và tạo README
* Publish: npm publish

Bây giờ nếu muốn sử dụng package đó ta chạy:
```
npm install test-npm-bundle
```
Nó sẽ chạy và cài đặt các phụ thuộc cần thiết.
# Tài liệu tham khảo
* https://docs.npmjs.com/creating-and-publishing-scoped-public-packages
* https://zellwk.com/blog/publish-to-npm/