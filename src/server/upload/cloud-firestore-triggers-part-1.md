Xin chào mọi người, bài viết hôm nay mình xin chia sẻ về `Cloud Firestore triggers` một trong những tính năng của `Cloud Functions`,  trước khi tìm hiểu về  `Cloud Firestore triggers` chúng ta sẽ tìm hiểu `Cloud Functions` là gì? 

`Cloud Functions` là 1 sản phẩm của `Google`. `Cloud Functions` cho phép bạn chạy `code backend` tự động `trigger` các `event` được kích hoạt bởi tính năng của `Firebase (Google)`. 

*Tại sao lại sử dụng `Cloud Functions` ?*

Việc chạy và thiết lập máy chủ có thể là một công việc thật sự khó khăn, bạn phải xử lý các vấn đề như khả năng mở rộng, viết code bằng các ngôn ngữ bên phía máy chủ. Nhưng với `Cloud Functions` sự phức tạp đó sẽ được giảm xuống. Ngoài ra, các tác vụ có tính toán cường độ cao có thể được thực hiện trên cloud thay vì trên thiết bị của máy khách, tính bảo mật sẽ cao hơn.

**Cloud Functions hỗ trợ các kích hoạt sau:**

1. **Realtime Database Triggers**: kích hoạt một hàm khi một sự kiện ghi xảy ra trên một đường dẫn trong một cơ sở dữ liệu.
1. **Authentication Triggers**: kích hoạt một hàm khi một người dùng mới được tạo hoặc khi một người dùng bị xóa.
1. **Analytics Triggers**: kích hoạt một hàm khi một sự kiện chuyển đổi mới được ghi nhật ký (log).
1. **Cloud Storage Triggers**: một hàm có thể được kích hoạt khi có bất kỳ sự thay đổi nào bên trong một nhóm chẳng hạn như một tập tin hoặc thư mục được tải lên, cập nhật hoặc xóa.
1. **Cloud Pub/Sub Triggers**: kích hoạt một hàm khi nhận được một tin nhắn mới trong một chủ đề Google Cloud Pub/Sub.
1. **HTTPS Triggers**: kích hoạt khi một yêu cầu được gới đến một endpoint.


**Vòng đời của `Cloud Firestore function` sẽ thực hiện những việc sau:**

1. Chờ các thay đổi của một `document`.
2.  Kích hoạt một sự kiện xảy ra và thực hiện các tác vụ đó.
3.  Nhận một đối tượng dữ liệu được lưu trữ trong `document` được chỉ định. Đối với sự kiện `onWrite` hoặc `onUpdate` thì data nhận về sẽ gồm `data` trước và `data` sau khi sự kiện được kích hoạt.

### 1. Cloud Firestore function triggers

`Cloud Functions for Firebase SDK` sẽ `exports a functions.firestore` cho phép bạn tạo các xử lý  gắn với các sự kiện` Cloud Firestore` cụ thể.

1. **onCreate**:	Được kích hoạt khi một `document`  được ghi vào lần đầu tiên.
1. **onUpdate**	:  Được kích hoạt khi một `document` đã tồn tại và có sự thay đổi giá trị.
1. **onDelete**: Được kích hoạt khi một `document` bị xoá.
1. **onWrite**	 Được kích hoạt khi `onCreate`, `onUpdate` hoặc `onDelete` được kích hoạt.

*Lưu ý: Sự kiện `Cloud Firestore` sẽ chỉ được kích hoạt khi `document` thay đổi. Không thể thêm các sự kiện cho một trường cụ thể nào.*

### 2. Writing Cloud Firestore-triggered functions

#### 2.1 Định nghĩa một function trigger

Để định nghĩa một `Cloud Firestore trigger`, ta cần chỉ định một `document` cụ thể và một sự kiện đi kèm:

```js
const functions = require('firebase-functions');

exports.myFunction = functions.firestore
  .document('my-collection/{docId}')
  .onWrite((change, context) => { /*  to do */ });
```

***Lưu ý:**  Đường dẫn đến `document` không được chứa dấu / ở cuối.*

#### 2.2 Kích hoạt event cho một document cụ thể.

Nếu muốn kích hoạt một sự kiện cho bất kỳ thay đổi nào của một `document` cụ thể thì bạn có thể sử dụng như sau:

```js
//  Lắng nghe bất kỳ thay đổi nào của document 'id001' trong collection 'users'
exports.myFunctionName = functions.firestore
    .document('users/id001').onWrite((change, context) => {
      // ... Your code here
    });
```

#### 2.3 Kích hoạt event cho tất cả document trong một collection.
Nếu  muốn kích hoạt một nhóm `document`, chẳng hạn như bất kỳ  `document` nào trong  một `collection` nhất định, thì hãy sử dụng `{documentId}` thay cho `id document`:

```js
// Lắng nghe tất cả các document có trong collection 'users'
exports.myFunction = functions.firestore
    .document('users/{userId}')
    .onWrite((change, context) => {
       // Ví dụ như nếu muốn thay đổi name của user có userId === id001 thành Trần Quỳnh
       const { userId } = context.params
       if (userId === 'id001') {
           firestore.collection('users)
            .doc(id0001)
            .update({ name: 'Trần Quỳnh' })
       }
    });

```

Trong ví dụ này, khi bất kỳ trường nào trên bất kỳ `document` của `collection users` thay đổi, thì nó sẽ match với một `userId`

Nếu một `document` trong `collection users` có `subcollection` và một trường nào trong `subcollection` đó thay đổi thì `userId` đó sẽ không được kích hoạt.

Và để giải quyết được vấn đề trên thì chúng ta sử dụng như sau:

```js
// Lắng nghe tất cả document trong collection users and tất cả subcollection
exports.myFunction = functions.firestore
    .document('users/{userId}/{messageCollectionId}/{messageId}')
    .onWrite((change, context) => {
      // to do ...
    });
```

***Lưu ý**: Trigger phải luôn trỏ đến một `document`, nếu bạn sử dụng `users/{userId}/{messageCollectionId}` sẽ không hợp lệ vì nó đang trỏ đến một `collection`. Và hợp lệ nếu bạn sử dụng `users/{userId}/{messageCollectionId}/{messageId} `vì nó đang trỏ tới một `document` cụ thể.*

**Vì bài viết khá dài nên mình xin tạm thời dừng tại đây và nhường lại nội dung trong bài tiếp theo. Hy vọng mọi người sẽ theo dõi và góp ý kiến nhé. Cảm ơn mọi người.**

**Tài liệu tham khảo:** https://firebase.google.com/docs/functions/firestore-events

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)