Flutter là một framework sử dụng ngôn ngữ Dart, dùng để lập trình cross-platform cho Android, iOS, desktop application, web app...
Hôm nay mình sẽ giới thiệu cho các bạn cách để tạo một request HTTP, sử dụng [http package](https://pub.dartlang.org/packages/http).

Chúng ta sẽ sử dụng [JSONPlaceholder](https://jsonplaceholder.typicode.com/) làm target cho ví dụ API dưới đây:

```
GET     /posts
GET     /posts/1
GET     /posts/1/comments
GET     /comments?postId=1
GET     /posts?userId=1
POST    /posts
PUT     /posts/1
PATCH   /posts/1
DELETE  /posts/1
```

## Setup

Thêm [http package](https://pub.dev/packages/http) dependency vào file *pubspec.yaml*.

```dart
dependencies:
    http: ^0.12.0+2
```

Trong mỗi file sử dụng package này, import library bằng cách thêm:

```dart
import 'package:http/http.dart';
```

## GET request

```dart
_makeGetRequest() async {
  // tạo GET request
  String url = 'https://jsonplaceholder.typicode.com/posts';
  Response response = await get(url);
  // data sample trả về trong response
  int statusCode = response.statusCode;
  Map<String, String> headers = response.headers;
  String contentType = headers['content-type'];
  String json = response.body;
  // Thực hiện convert json to object...
}
```

Bây giờ thay thế /posts bằng /post/1 trong url. Sử dụng /posts trả về một array các object JSON trong khi /posts/1 trả về một đối tượng JSON duy nhất, trong đó 1 là ID của post muốn get về.

Bạn có thể sử dụng [dart:convert](https://flutter.io/docs/development/data-and-backend/json#serializing-json-manually-using-dartconvert) để convert JSON raw string to object. Đọc bài viết [này](https://medium.com/@studymongolian/parsing-simple-json-in-flutter-83ee1809a6ab) để biết thêm chi tiết.
 
## POST request

Một request POST dùng để tạo thêm một resource.

```dart
_makePostRequest() async {
  // cài đặt tham số POST request
  String url = 'https://jsonplaceholder.typicode.com/posts';
  Map<String, String> headers = {"Content-type": "application/json"};
  String json = '{"title": "Hello", "body": "body text", "userId": 1}';
  // tạo POST request
  Response response = await post(url, headers: headers, body: json);
  // kiểm tra status code của kết quả response
  int statusCode = response.statusCode;
  // API này trả về id của item mới được add trong body
  String body = response.body;
  // {
  //   "title": "Hello",
  //   "body": "body text",
  //   "userId": 1,
  //   "id": 101
  // }
}
```


## PUT request 

PUT request dùng để thay thế một resource hoặc tạo mới nếu resource đó chưa tồn tại:

```dart
_makePutRequest() async {
  // cài đặt tham số PUT request
  String url = 'https://jsonplaceholder.typicode.com/posts/1';
  Map<String, String> headers = {"Content-type": "application/json"};
  String json = '{"title": "Hello", "body": "body text", "userId": 1}';
  // tạo PUT request
  Response response = await put(url, headers: headers, body: json);
  // kiểm tra status code của kết quả response
  int statusCode = response.statusCode;
  // API này trả về id của item được cập nhật
  String body = response.body;
  // {
  //   "title": "Hello",
  //   "body": "body text",
  //   "userId": 1,
  //   "id": 1
  // }
}
```

## PATCH request

PATCH request dùng để sửa đổi một resource có sẵn:

```dart
_makePatchRequest() async {
  // cài đặt tham số PATCH request
  String url = 'https://jsonplaceholder.typicode.com/posts/1';
  Map<String, String> headers = {"Content-type": "application/json"};
  String json = '{"title": "Hello"}';
  // tạo PATCH request
  Response response = await patch(url, headers: headers, body: json);
  // kiểm tra status code của kết quả response
  int statusCode = response.statusCode;
  // chỉ có title là được update
  String body = response.body;
  // {
  //   "userId": 1,
  //   "id": 1
  //   "title": "Hello",
  //   "body": "quia et suscipit\nsuscipit recusandae... (body text cũ không đổi)",
  // }
}
```

Cần lưu ý rằng chuỗi JSON truyền vào chỉ có title, không phải tất cả các phần khác như ví dụ về PUT request.

## DELETE request

DELETE request dùng để xoá resource:

```dart
_makeDeleteRequest() async {
  // post 1
  String url = 'https://jsonplaceholder.typicode.com/posts/1';
  // tạo DELETE request
  Response response = await delete(url);
  // kiểm tra status code của kết quả response
  int statusCode = response.statusCode;
}
```

## Authentication

Mặc dù trong ví dụ demo ở trên không yêu cầu authen, nhưng thực tế khi thực hiện request, chúng ta sẽ phải thêm authentication header, đặc biệt khi thực hiện những việc khác ngoài GET request. Có thể add header cho bất kì request nào, mặc dù thông thường thông tin đăng nhập cơ bản (username và password) sẽ được thêm vào POST request ban đầu (để đăng nhập) và sau đó sẽ sử dụng token được trả lại để thêm vào các request tiếp theo.

### Basic Authentication

```dart
// import 'dart:convert'
// import 'dart:io';
final username = 'username';
final password = 'password';
final credentials = '$username:$password';
final stringToBase64 = utf8.fuse(base64);
final encodedCredentials = stringToBase64.encode(credentials);
Map<String, String> headers = {
  HttpHeaders.contentTypeHeader: "application/json",
  HttpHeaders.authorizationHeader: "Basic $encodedCredentials",
};
```

Trong thiết lập OAuth, bạn có thể đặt client ID và secret trong auth header và username và password trong body. Đây là những gì máy chủ Dart Aqueduct làm, nhưng điều này sẽ phụ thuộc vào thiết lập máy chủ.

Lưu ý rằng tôi đã sử dụng các hằng số HttpHeaders ở đây, yêu cầu dart:io import. Thay vào đó, hãy sử dụng chuỗi "content-type" và "authorization".

### Bearer (token) Authentication

```dart
final token = 'WIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpv';
Map<String, String> headers = {
  HttpHeaders.contentTypeHeader: "application/json", // or whatever
  HttpHeaders.authorizationHeader: "Bearer $token",
};
```

Trên đây là những HTTP request cơ bản khi sử dụng Flutter cùng với Dart package http. Hy vọng qua bài viết này mọi người có thêm chút tuỳ chọn để sử dụng với ngôn ngữ mới này. Cảm ơn mọi người đã đọc bài của mình :D