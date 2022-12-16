*Xin chào mọi người, tình hình là đợt vừa rồi mình gặp một task liên quan đến phần `firebase rules` nên phải mất kha khá thời gian tìm hiểu mới làm được task này. Nên mình sẽ viết bài này mục đích giúp mọi người tốn ít thời gian tìm tài liệu đọc hơn nhé.*

*Trước tiên, chúng ta cùng tìm hiểu `Cloud Firestore Security Rules` là gì đã nhé.* 


*`Cloud Firestore Security Rules` là một công cụ để xác định kiểm soát truy cập vào `Firestore` . Bạn không phải lo lắng về việc tạo mã xác thực hoặc mã xác thực cho cơ sở dữ liệu của mình. Trong bảng điều khiển của `Cloud Firestore Security Rules` xác định các kết quả khớp với các `collections` hoặc `subcollections` của bạn và tạo điều kiện cho mỗi trong số chúng để quản lý quyền truy cập vào `Firestore`.*

*Okay, chúng ta bắt đầu vào nội dung chính nhé.*

## 1. Chặn quyền truy cập Firestore
Đoạn code bên dưới dùng để khóa bất kỳ hoạt động nào trên `Firestore`.

```js
match /{document=**} {
   allow read, write: if false;
}
```

 `{document=**}` được sử dụng để match all collection và `subcollection` trong `Firestore`.

Với điều kiện false để ngăn chặn tất cả các hoạt động.

## 2. Cho phép truy cập Firestore
Cũng giống như đoạn code ở phần 1, nếu muốn cho phép tất cả các truy cập trên `Firestore` chúng ta chỉ cần viết như bên dưới nhé.

```js
match /{document=**} {
   allow read, write; // or allow read, write: if true;
}
```

`{document=**}` được dùng để match all collection và subcollection trong Firestore.

Với điều kiện true là bạn có thể cho phép tất cả các hoạt động.

## 3. Quy tắc bảo mật đặc biệt đối với một collection cụ thể
```
match /{collectionName}/{documentId} {
   allow read, write : if collectionName != "users";
}
```

Đoạn code trên có nghĩa là: Được quyền `read`, `write` nếu `collectionName` khác `"users"`.
## 4. Truy cập cho người dùng đã được xác thực
Trong quy tắc bảo mật, chúng ta có quyền truy cập vào đối tượng yêu cầu. Yêu cầu bao gồm thông tin xác thực để bạn có thể sử dụng nó để xác minh rằng người dùng được yêu cầu được xác thực.

```
match /products/{productId} {
   allow read: if request.auth != null;
}
```

Đoạn code trên áp dụng cho tất cả `collection products`, nếu user đã được `authenticated` mới có quyền`read` thông tin của `collection products`.

## 5. Truy cập cho một người dùng cụ thể nào đó
Quy tắc bảo mật này cho phép `read` hoặc `write` đối với trường hợp `user` có `uid` giống với `userId` truyền vào. Ví dụ phổ biến nhất về việc sử dụng quy tắcbảo mật này là trên bộ sưu tập người dùng có `ID` người dùng bằng với `ID` trong `colllection`.

```
match /users/{userId} {
   allow read: if request.auth.uid == userId;
}
```

**userId** - được sử dụng để so sánh với id của người dùng được yêu cầu.

## 6. Truy cập cho những người dùng tồn tại trong danh sách document
Cách sử dụng tài nguyên được lưu trữ trong `Firestore` hoặc có sẵn trong thao tác ghi. Một đối tượng tài nguyên bao gồm:

* **_name_**:  Đường dẫn đầy đủ của document.
* **data**: Tất cả dữ liệu document.
* **id**:  Document id.

```
match /posts/{postId} {
   allow read: if request.auth.uid in resource.data.contributors;
}
```

Để mình giải thích chút đoạn code trên nhé, chúng ta sử dụng `resource.data` để lấy tất mảng contributors và xác thực người được reuqest có tồn tại trong mảng không.

* **request.auht.uid**: Thông tin id của người dùng đang request.
* **resource.data.contributors**: Danh sách user có trong `collection contributors`, chúng được lưu dưới dạng `array`.

## 7. Kiểm tra đối tượng có tồn tại hay không?
Khi định nghĩa một quy tắc bảo mật, chúng ta có thể tạo một điều kiện bằng cách sử dụng `function` có sẵn để xác định nếu một document tồn tại trong một `collection` khác. Thật đơn giản khi chỉ cần sử dụng đường dẫn làm đối số của hàm.

Cú pháp: `exists(/databases/$(database)/documents/collectionName/$(documentId))`. Trong đó:

* **$(database)**: Tham số xác định một thể hiện của cơ sở dữ liệu có sẵn dưới dạng ký tự đại diện trong những dòng chính của file `Cloud Firestore Security Rules`.

`match /databases/{database}/documents`

* **collectionName**: Tên của `collection` mà bạn muốn xác minh.

* **documentId**: `ID` của `document` được yêu cầu.

Ví dụ:
```js
match /notificationStrategy/{strategyId} {
   allow write: if exists(/databases/$(database)/documents/
      user/$(request.auth.uid));
}
```

Quyền `write` sẽ được cho phép khi tồn tại `uid` của user(`request.auth.uid` là `uid` của `user` đang request) trong `collection` user.
## 8. Truy cập một document khác
Một phương thức khác có sẵn trong `Cloud Firestore Security Rules` là phương thức `get()`. Phương thức này cũng tương tự với phương thức `exists() `chỉ khác nhau kết quả trả về. Phương thức `get()` sẽ giúp chúng ta truy cập đến data của document bằng cách gọi `get(path).data`.

```js
match /post/{postId} {
   allow update, delete: if isPostOwner() || isAdmin();
   function isPostOwner() {
      return resource.data.ownerId == request.auth.uid;
   }
   function isAdmin() {
      return get(/databases/$(database)/documents/
          user/$(request.auth.uid)).data.role == "ADMIN";
   }
}
```

Quyền được `update`, `delete` được cho phép khi `user` đang `request` là tác giả của bài viết hoặc là `admin` của hệ thống ( tức là `resource.data.ownerId == request.auth.uid hoặc get(path).data.role == "ADMIN"`).

Okay! Trên đây là những chia sẻ của mình về các nguyên tắc cơ bản trong `Cloud Firestore Security Rules` và ví dụ giải thích. Hy vọng có thể giúp ích cho mọi người.

Tài liệu tham khảo: https://medium.com/@khreniak/cloud-firestore-security-rules-basics-fac6b6bea18e