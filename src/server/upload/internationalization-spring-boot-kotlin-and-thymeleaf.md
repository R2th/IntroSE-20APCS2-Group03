Trong bài viết này sẽ đưa ra các bước về phát triển ứng dụng web và cách Spring boot framework xử lý đa ngôn ngữ gồm tiếng Anh, Nhật, Khmer thông qua tải các message resources của Spring boot.

### Prerequisites
- Spring 5.3.6
- Spring boot 2.4.5
- Java SDK 11
- Gradle 6.7.1

### I18n on Spring Boot
Đầu tiên hãy tạo một ứng dụng Spring boot sử dụng Gradle.

![](https://images.viblo.asia/88d558b6-0886-4279-8ae9-e1ac42e36693.png)

Tiếp đến bổ sung các dependencies trong `build.gradle.kts` như sau:

![](https://images.viblo.asia/b39f00a1-2641-468f-b33e-32d2d147e5d5.png)

#### Define messages for internationalize

Tạo 3 file messages tương ứng 3 ngôn ngữ trong `src/main/resources/i18n`

- `messages_en.properties`
```
contact.name=Kimhuor
contact.address=No99, 10BT, 100000
contact.phone=+855 99 999 999
view.title=Contact
view.name=Name
view.address=Address
view.phone=Phone
```

- `messages_kh.properties`
```
contact.name=គឹមហួរ
contact.address=ផ្ទះលេខ ៩៩ ផ្លូវ ១០ ១០០០០០
contact.phone=+៨៥៥ ៩៩ ៩៩៩ ៩៩៩
view.title=ទំនាក់ទំនង
view.name=ឈ្មោះ
view.address=អាស័យដ្នាន
view.phone=ទូរសព្ទ័
```

- `messages_ja.properties`

> Đối với tiếng Nhật trong Java cần biến đổi thành dạng unicode mới hiển thị đúng.
> Ở đây sử dụng https://r12a.github.io/app-conversion/ để biến đổi

```
contact.name=\u30AD\u30DF\u30FC\u30A6\u30A2\u30FC
contact.address=\u3012130-0004 \u6771\u4EAC\u90FD\u58A8\u7530\u533A\u672C\u6240\uFF11\u4E01\u76EE\uFF12\uFF19\u22121 \u30E9\u30F3\u30C0\u30E0\u30B9\u30AF\u30A6\u30A8\u30A2\u672C\u6240\u30D3\u30EB
contact.phone=+855 99 999 999
view.title=\u9023\u7D61\u5148
view.name=\u540D\u524D
view.address=\u4F4F\u6240
view.phone=\u96FB\u8A71
```

#### Config WebMvcConfig

Để Spring boot thực thi internationalize cần
- Bean `messsageSource` giúp Thymeleaf có thể lấy được nội dung định nghĩa trong file message thông qua hàm `setBasename`
- Bean `localeResolver` lưu value locale cookie
- Bean `localeInterceptor` để nhận locale từ param `lang`

![](https://images.viblo.asia/e0e177f4-dd92-4109-88f4-9eecc8bde494.png)

#### Create model, view, controller
- Define một model để định dạng dữ liệu `Contact`
- Ở sử dụng thêm một object `I18n` để giúp tạo dữ liệu theo locale, sử dụng `ResourceBundle` để lấy nội dung

![](https://images.viblo.asia/ee3bee43-e6ef-4b4e-b52b-8771f2a1cdfa.png)

- Define view để biểu diễn dữ liệu trong `src/main/resources/templates/index.html`

![](https://images.viblo.asia/c2ed0746-a9d1-421a-9bba-ae37d61fa0ff.png)

- Define controller để xử lý request đến một trang theo url, ở đây sẽ sử dụng root path để mô phỏng

![](https://images.viblo.asia/08a945ec-c337-4f82-8c40-dabe96344566.png)

### Demo

Sau khi xử lý coding xong chúng ta có thể chạy ứng dụng và truy cập vào http://localhost:8080/

- Default là locale EN
![](https://images.viblo.asia/40678026-47a2-4095-bb1c-3d006ca14ac0.png)

- Tiếng Khmer

![](https://images.viblo.asia/e1bc7f7d-b47a-4daa-ad86-5866e170126c.png)

- Tiếng Nhật

![](https://images.viblo.asia/fae75be9-53f8-4628-b490-017d42890d8e.png)

- Chọn lại tiếng Anh

![](https://images.viblo.asia/f08c97ca-f7a1-4ac7-9084-c5a546facee0.png)

Như đã trình bày chung ta có thể lấy được nội dung từ file message ở trong code logic và trong view

Cảm ơn các bạn đã đọc!

### References
- [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
- [Guide to Internationalization in Spring Boot](https://www.baeldung.com/spring-boot-internationalization)