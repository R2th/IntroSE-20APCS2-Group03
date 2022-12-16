Hôm nay mình xin giới thiệu 1 tài liệu để viết docs api cực kỳ đơn giản. Chắc hẳn các bạn làm bên Server đã quá quen thuộc với API tuy nhiên để giao tiếp mượt mà giữa client và server thì rõ ràng phải có 1 tài liệu nằm ở giữa. Khi dự án của bạn chạy song hành thì việc viết docs rất quan trọng. Bạn có thể viết docs trước để define cho client biết cấu trúc cũng như api đó thế nào. và khi đã có docs thì lúc đó bên client cứ vậy triển khai theo docs mà ko cần phải đợi bên Server đã implement api đó hay chưa. Hiện nay viết docs api đã có rất nhiều link online các bạn chỉ việc định nghĩa và push lên đó. Cách này cũng hay tuy nhiên nó cũng có 1 vài rắc rối nếu nhiều thành viên trong team cùng sửa 1 tài liệu khi đó sẽ rất khó kiểm soát các version của docs. Mình thì vẫn thíc viết docs ở local hơn và thật tuyệt vời mình đã tìm được 1 công cụ hoàn toàn ưng ý.
![](https://images.viblo.asia/abd8c2b4-3495-487b-a2a4-4f130f2aebaf.png)

## Giới thiệu
[https://github.com/lord/slate](https://github.com/lord/slate)

Link trên chính là repo github chính của mã nguồn này. Mình sẽ giới thiệu qua cách mà nó vận hành.
Mã nguồn này được viết bằng `ruby`, Công việc của nó là convert từ file `.md` sang mã nguồn web với định dạng html một dạng web static để bạn có thể chạy ở bất kỳ đâu. Tuy nhiên với ruby thì cài đặt sẽ phức tạp hơn chút cho các bạn ko rảnh về ngôn ngữ này mình sẽ giới thiệu thêm 1 mã nguồn khác tương tự và đơn giản hơn rất nhiều.

[https://github.com/sdelements/node-slate](https://github.com/sdelements/node-slate)
Mã nguồn này được viết trên môi trường `Nodejs` Tất cả những gì bạn phải làm chỉ cần cài đặt node và npm là xong vô cùng đơn giản.

## Cài đặt
Để cài đặt mã nguồn này trong docs đã hướng dẫn rất chi tiết tuy nhiên mình sẽ vẫn hướng dẫn lại cho các bạn nào ko biết.

Trước hết trên máy các bạn cần cài nodejs và npm tải về tại [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

sau đó bạn clone mã nguồn về

```sh
$ git clone git@github.com:sdelements/node-slate.git

$ cd node-slate

$ npm install

$ npm run build
$ npm start
```

Chỉ cần vậy thôi và mã nguồn sẽ tự mở 1 port `:4000` tại local để các bạn có thể truy cập

## Viết tài liệu

Để viết 1 tài liệu docs rất đơn giản. Ngôn ngữ quen thuộc cho các bạn viết vẫn sử dụng `Markdown`

cấu trúc viết docs bắt đầu từ thư mục `node-slate/source/includes/`

Tại thư mục này các bạn sẽ thấy có 1 file `main.md` hoặc `index.md` file này khi generate ra nó sẽ tương tự như file index.html của các bạn và là file khởi chạy đầu tiên khi vào docs

Có rất nhiều cú pháp ở đây các bạn có thể tách các file tài liệu ra cho dễ quản lý ví dụ ở đây mình có 1 page tài liệu liên quan đến model User mình sẽ viết tạo 1 file với name _user.md và nội dung như sau

```
# Users

## [U-03] - User-info

```

> Response 200

```json
{
    "data": {
        "id": 1,
        "name": "lord slate exemple",
        "email": "lord_slate@example.com",
    },
    "message": [],
    "code": 200
}
```

> Response 400

```json
{
    "code": 400,
    "message": [
        "Bad Request -- Your request sucks"
    ],
    "data": null
}
```

> Response 401

```json
{
    "code": 401,
    "message": [
        "Unauthorized -- Your API key is wrong"
    ],
    "data": null
}
```

**HTTP Request**

`GET https://domain/api/v1/users/info`

Header | Example
--------- | -------
Content-Type | application/json
Authorization | Bearer eyJ0eXAiOiJKV1Q...
````

ở tài file main.md

Mình sẽ include file _user.md như sau

````
---
title: API Reference for your project

includes:
  - users

search: true
---
````

Chỉ cần đơn giản như vậy thôi vậy là các bạn đã có 1 tài liệu docs đầy đủ và hoàn chính dễ quản lý và dễ dàng update sửa đổi 1 cách rõ ràng mạch lạc.

sau khi generate thành file html api của bạn sẽ có nội dung như sau
![](https://images.viblo.asia/33795117-f214-4252-9652-092a78b303fd.png)

Thậm chí mã nguồn này còn giúp bạn search api một cách nhanh chóng nếu bạn config `search: true`

Bạn có thể chạy realtime nếu sử dụng lệnh 

```sh
$ npm start
```

Nếu muốn generate ra đinh dạng html hãy sử dụng lệnh

```sh

$ npm run generate
```

## Tổng kết
Với tài liệu này cách viết sẽ đơn giản và dễ quản lý hơn rất nhiều các bạn có thể đẩy nó lên github để quản lý các version hoặc tự chạy trên local hoặc generate ra file html và quăng nó lên 1 server nào đó để có thể dùng. Mình đã dùng nó cho rất nhiều dự án và đánh giá nó rất hữu dụng docs nhìn đẹp và cách viết rất mạch lạc. Hi vọng nó sẽ mang lại cho các bạn thêm 1 sự lựa chọn cho cách viết tài liệu của mình.