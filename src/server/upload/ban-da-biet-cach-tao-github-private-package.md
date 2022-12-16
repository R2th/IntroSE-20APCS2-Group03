## Lời mở đầu
![](https://images.viblo.asia/bf26973d-1b7f-4c38-becd-c28405d4812a.png)

Trước giờ mình làm cũng nhiều dự án, cơ mà các dự án chức năng cũng tương tự nên mình cũng copy paste cho lẹ anh em có hay làm thế không nhỉ :)) . Cuộc sống mùa dịch cũng không trôi cho lắm, cũng vào "một ngày đẹp trời" có một chức năng bị bug (omg). Vậy là mình phải ngồi fix bug rồi sửa ở 1 loạt các project, xong cứ copy qua lại rồi lỗi chỗ nọ thiếu chỗ kia (caycu). Sau một ngày fix, copy, sửa =)) cuối cùng cũng xong xuôi cái bug đó trên các dự án khác nhau của mình. Như vậy thì sẽ không ổn, nếu nay mai lại thêm 1 bug khác thì sao, chả lẽ cứ sửa r copy lại vào các dự án như vậy (khoc)
## Nội dung chính
Giải pháp đơn giản, viết tính năng này ra 1 package chung sau đó install trên tất cả các dự án. Các dự án của mình toàn dự án khách hàng với private repository nên không thể tạo package và public lên npm được, sự lựa chọn hoàn hảo và nhanh gọn chính là Github Private Package.
### 1. Đăng nhập vào [Github.com](https://github.com/login)

![](https://images.viblo.asia/full/24cdca82-d658-4458-9133-e65d59723706.png)

### 2. Tạo 1 repository private (nếu bạn đã có thì bỏ qua)

![](https://images.viblo.asia/full/a4c5aa4b-bd56-4c45-b804-d9a90bbf8c24.png)

### 3. Tạo một personal access tokens
Với github Personal access tokens bạn có thể dùng token để truy cập vào accounts github để thực hiện các actions. Để generate một tokens bạn truy cập vào https://github.com/settings/tokens

![](https://images.viblo.asia/c8f9e894-2128-4aa6-93ec-36e90dd9be1f.png)

Sau đó bạn tạo 1 token với các scopes bạn cho phép, với việc publish package và install package, bạn cần phải chọn các scopes của `repo` và `write:packages` như phía dưới

![](https://images.viblo.asia/e3b3b90c-f2de-42d7-95a2-ab4b90b4890e.png)

Sau khi tạo thành công, github sẽ cung cấp cho chúng ta 1 personal access tokens, các bạn nhớ copy ra và lưu lại nhé, không là github không trả ra cho chúng ta nữa đâu, khi ấy bạn phải regenerate lại token và phải lấy token mới 

![](https://images.viblo.asia/78055186-7d1b-4147-b57d-4e4bc3c7d10c.png)

Nếu accounts của bạn có cái SSO authorized của github thì bạn nhớ enable nhé
![](https://images.viblo.asia/a5bce7c1-a248-4255-badf-bc3640a5b79f.png)

Ok, tiếp theo để có thể truy cập đến package github thì phải phải login qua npm, nếu bạn là accounts cá nhân không trong organization (tổ chức, công ty) nào thì bạn login với:
```
npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: personal access tokens
> Email: PUBLIC-EMAIL-ADDRESS
```
Password ở đây chính là cái personal access tokens được generate ở trên nhé
Sau khi login thành công một file .npmrc sẽ được tạo ra, nếu bạn đang dùng ubuntu thì file này sẽ được tạo ra ở thư mục Home
```.npmrc
//npm.pkg.github.com/:_authToken=[personal access tokens]
```
về cơ bản thì cái authToken chính là cái personal access tokens thôi, bạn cũng có thể tự tạo file như vậy.
### 4. Viết code cho package
Với package bạn muốn đưa lên thì bạn tạo 1 folder như bình thường, ở đây mình sẽ có file chính là index.js
sử dụng ```npm init``` ta được file `package.json`
- name: bạn nhớ đặt tên theo kiểu @[tên owner]/[tên package] để tránh trùng lặp trên registry server của github nha (trùng tên hay có người tạo package rồi thì mình sẽ không publish được lên)
- version: phiên bản package của bạn, mỗi lần publish ta sẽ thay đổi version ở đây, cách đặt version bạn tham khảo tại: https://docs.npmjs.com/about-semantic-versioning
- description: Mô tả qua về package (optional)
- main: File chính của package
- repository: Phần này cũng khá quan trọng, nó sẽ define ra repo mà bạn sẽ push package lên, chi tiết bạn xem ở phần kết quả bên dưới
- publishConfig: Chỉ định registry mà bạn sẽ publish lên
- ...
```package.json
{
  "name": "@vanquynguyen/first-package",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/vanquynguyen/first-package"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Tài khoản của bạn trong organization và các dự án cũng được tạo trong đó thì bạn thêm --scope=@[organization]
```
npm login --scope=@vanquynguyen --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: personal access tokens
> Email: PUBLIC-EMAIL-ADDRESS
```
Sau khi login xong bạn kiểm tra trong thư mục home cũng sẽ thấy có 1 fle .npmrc được tạo ra
```.npmrc
@vanquynguyen:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=[token được sinh ra sau khi login npm]
```
Ở phần repository trong organization thì bạn chú ý 1 chút ở phần publishConfig mình sẽ thêm @[organization] phía sau registry url gốc.
```package.json
{
  "name": "@vanquynguyen/first-package",
  "version": "0.1.0",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/vanquynguyen/first-package.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@vanquynguyen"
  },
  "license": "SEE LICENSE IN LICENSE",
  "bugs": {
    "url": "https://github.com/vanquynguyen/first-package/issues"
  },
  "homepage": "https://github.com/vanquynguyen/first-package#readme",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "description": ""
}
```


### 5. Publish package và thành quả
Cuối cùng sau khi các bạn hoàn thành code của package thì ta Publish package

``` npm publish```

```shell
npm notice 
npm notice 📦  @vanquynguyen/first-package@1.0.0
npm notice === Tarball Contents === 
npm notice 15B  index.js    
npm notice 395B package.json
npm notice 15B  README.md   
npm notice === Tarball Details === 
npm notice name:          @vanquynguyen/first-package             
npm notice version:       1.0.0                                   
npm notice package size:  401 B                                   
npm notice unpacked size: 425 B                                   
npm notice shasum:        092e4da5fb5bf7faa934210efc2d437bcc3c1bfa
npm notice integrity:     sha512-ZEYb0dQaWG22u[...]8mctYUheJOiXw==
npm notice total files:   3                                       
npm notice 
+ @vanquynguyen/first-package@1.0.0

```

Sau khi command hoàn tất bạn đợi khoảng vài giây rồi lên github repo để xem thành quả
![](https://images.viblo.asia/7a959a6f-c76e-4865-a763-24e917c8f327.png)

Bạn click vào package thì sẽ nhìn thấy
![](https://images.viblo.asia/f22f3350-7181-4f8d-9538-5079c8c5261d.png)

Để cài đặt package bạn copy .npmrc vào trong repo mà bạn sẽ cài package private này. 
```.npmrc
@vanquynguyen:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=[personal access token]
```

Chúc các bạn thành công :)
## Tạm kết