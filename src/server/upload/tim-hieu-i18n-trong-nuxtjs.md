## 1. Khởi tạo project

Các bạn có thể cài đặt qua npx:
```
npx create-nuxt-app <project-name>
```
Hoặc có thể sử dụng yarn:
```
yarn create nuxt-app <project-name>
```
Trong quá trình cài đặt sẽ hiển thị một số thông tin như là: name project, programing language, package manager, ... sẽ hỗ trợ cho dự án của bạn nhanh và thuận tiện hơn trong quá trình làm.

## 2. Cài đặt i18n
Cài đặt npm hoặc yarn :
```
npm install nuxt-i18n
hoặc
yarn add nuxt-i18n
```

## 3. Tích hợp i18n trong nuxt
Bạn cần cấu hình i18n vào trong nuxt.config và sử dụng các option tùy chỉnh.
![](https://images.viblo.asia/95e2c3f9-d5e1-472a-933b-ceb9f9d53cfa.png)
### Options:
#### locales:
Danh sách các ngôn ngữ được cấu hình:
![](https://images.viblo.asia/0c2c9553-ab0d-4129-96fc-cbecb3a4794f.png)
Các thuộc tính:
* code: Là định danh duy nhất của ngôn ngữ.
* iso: Yêu cầu khi sử dụng SEO.
* file: Là tên của một file. Được lấy từ đường dẫn langDir.
#### defaultLocale:
Được chỉ định là ngôn ngữ mặc định sử dụng và nó phải khớp với locales.

#### strategy:
* no_prefix: Đầu vào của ngôn ngữ không có gì
* prefix_except_default: Đầu vào ngôn ngữ được thêm vào ngoại trừ ngôn ngữ mặc định
* prefix: Đầu vào ngôn ngữ được thêm vào cho mọi ngôn ngữ.
* prefix_and_default: Đầu vào ngôn ngữ được thêm vào và cả ngôn ngữ mặc định
#### langDir:
Thư mục chứa đường dẫn file ngôn ngữ 

...
## 4. Thư mục locales
Tạo các file để biên dịch cho ứng dụng.
```
locales/en.js
-----
export default: {
    lang: "English"
}
```

## 5. Component
```
<template>
    <div>
        <span>{{ $t('lang') }}</span>
    </div>
</teamplate>
```
Sử dụng phương thức $t(...) nó sẽ tìm theo đường dẫn và lấy ra bản dịch tương ứng.

## 6. Kết luận
Chúc bạn thành công tích hợp đa ngôn ngữ vào trong ứng dụng của mình.
## 7. Tài liệu tham khảo
https://i18n.nuxtjs.org/