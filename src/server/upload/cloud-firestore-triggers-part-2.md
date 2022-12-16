Xin chào mọi người, hôm nay mình xin chia sẻ tiếp nội dung của bài viết trước nhé. Nếu bạn nào chưa đọc bài chia sẻ trước thì vào [link](https://viblo.asia/p/cloud-firestore-triggers-part-1-maGK7GqxKj2) này nhé.

*Okay, let't gooo*

### 3. Event Triggers

#### 3.1 Kích hoạt một function khi có một document mới được tạo

Bạn có thể kích hoạt một `function`  bất kỳ lúc nào khi một `document` mới được tạo ra trong một `collection` bằng cách sử dụng `onCreate() `. Trong ví dụ này `function createUser` sẽ được gọi khi có một `document user `được thêm vào:

```js
exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
    // Lấy data vừa được tạo: snap.data()
      const newValue = snap.data();
      
      console.log('User is created', newValue); // { name: 'Trần Quỳnh', age: '20' }

      // to do....
    });
```

#### 3.2 Kích hoạt một function khi có một document được cập nhật

Bạn cũng có thể kích hoạt một `function` khi một `document` được `update` bằng cách sử dụng `function onUpdate() `. Trong ví dụ này `function updateUser` sẽ được gọi nếu một `user` có giá trị thay đổi:

```js
exports.updateUser = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
      // Giá trị sau khi thay đổi
      const nextValue = change.after.data();

      // Giá trị trước khi thay đổi
      const prevValue = change.before.data();
       
       console.log({
           nextValue,
           prevValue,
       })
      // to do...
    });
```

#### 3.3 Kích hoạt một function khi có một document bị xoá

Tương tự, khi một `document` bị xoá đi thì chúng ta sử dụng `function onDelete()`. Trong ví dụ này `function deleteUser` sẽ được gọi khi có một `user` bị xoá đi.

```js
exports.deleteUser = functions.firestore
    .document('users/{userID}')
    .onDelete((snap, context) => {
      // Lấy thông tin user vừa bị xoá
      const deletedValue = snap.data();
      console.log('User is deleted', deletedValue);
      // to do....
    });
```

#### 3.4 Kích hoạt một function cho tất cả thay đổi đối với một document.

Nếu bạn không quan tâm đến loại sự kiện được kích hoạt, bạn có thể lắng nghe tất cả các thay đổi trong `document Cloud Firestore` bằng cách sử dụng hàm `onWrite ()`.  Trong ví dụ dưới thì hàm `modifyUser` sẽ được gọi nếu một `user` được tạo mới, cập nhật hay là bị xoá.

```js
exports.modifyUser = functions.firestore
    .document('users/{userID}')
    .onWrite((change, context) => {
    
      const document = change.after.exists ? change.after.data() : null;

      const oldDocument = change.before.data();

      // to do.....
    });
```

### 4.  Đọc và ghi dữ liệu

Khi một `function` được kích hoạt, nó sẽ cung cấp `snapshot` dữ liệu liên quan đến sự kiện. Bạn có thể sử dụng `snapshot` để đọc hoặc ghi vào `document` mà đã kích hoạt sự kiện đó, hoặc có thể sự dụng  `Firebase Admin SDK` để trung cập vào các thành phần khác trong cơ sở dữ liệu của bạn. 

#### 4.1 Event Data
**Đọc dữ liệu**

Nếu muốn lấy `data` của `document` đã được cập nhật hoặc trước khi cập nhật thì các bạn quan sát ví dụ bên dưới nhé: 

```js
exports.updateUser2 = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
      // Data sau khi thay đổi
      const nextValue = change.after.data();

      // Data trước khi thay đổi
      const prevValue = change.before.data();
    });
```

Hoặc các bạn có thể  truy cập  `properties` như các bạn thao tác trong bất kỳ đối tượng nào. Ngoài ra hàm `get()` để truy cập đến các trường cụ thể nào đó.

```js
const age = snap.data().age;
const name = snap.data()['name'];
const experience = snap.get('experience');
```

**Ghi dữ liệu**

Mỗi lệnh gọi hàm được liên kết với một tài liệu cụ thể trong cơ sở dữ liệu` Cloud Firestore` của bạn. Bạn có thể truy cập tài liệu đó dưới dạng `DocumentReference` trong thuộc tính `ref` của `snapshot` đã được trả về. Và nó bao gồm các phương thức `update()`, `set()`, và `remove()` để bạn có thể cập nhật lại `document`.


```js
// Lắng nghe mọi cập nhật của bất kỳ document users nào
exports.countNameChanges = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
      // Lấy data mới và data cũ
      const nextData = change.after.data();
      const prevData = change.before.data();

      if (nextData.name == prevData.name) {
        return null;
      }

      let count = nextData.name_change_count;
      if (!count) {
        count = 0;
      }
    
    // Gán lại giá trị name_change_count của document
      return change.after.ref.set({
        name_change_count: count + 1
      }, {merge: true});
    });

```

#### 4.2 Kích hoạt event đối với data bên ngoài
`Cloud Functions` thực thi trong một môi trường đáng tin cậy, có nghĩa là chúng được ủy quyền như một `service account` trong dự án của bạn. Bạn có thể thực hiện đọc và ghi bằng `Firebase Admin SDK`:

```js
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.writeToFirestore = functions.firestore
  .document('some/doc')
  .onWrite((change, context) => {
    db.doc('some/otherdoc').set({ ... });
  });
```


**Tài liệu tham khảo:** https://firebase.google.com/docs/functions/firestore-events

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)