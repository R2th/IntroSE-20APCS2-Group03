Ngày nay việc build một client app(React Js, Vue Js, Android, iOS,...) làm việc trực tiếp với `firebase` là rất phổ biến, dễ dàng và nhanh chóng. Từ một app đơn giản cho đến app có business phức tạp, firebase đều có thể đáp ứng được. Vì client app connect trực tiếp đến `firebase` nên các vấn đề securities: authentication, authorization, validate data,... luôn được quan tâm hàng đầu.

Thông thường client app thực hiện việc `CRUD` thông qua các api, và việc check security được thực hiện ở ngay các api này. Còn đối với app thực hiện `CRUD` trực tiếp đến `firebase` thì các vấn đề securities sẽ được xử lý thông qua bộ quy tắc security rules.

### 1. Giới thiệu firebase security rules
**Firebase security rules** cho phép ai được quyền read, write data trong Cloud Firestore, Realtime Database, và Cloud Storage. Security rules được viết theo cú pháp tương tự javascript dưới dạng cấu trúc JSON.
* **.read**: mô tả với điều kiện nào thì cho phép user đọc data bao gồm: get, list
* **.write**: mô tả với điều kiện nào thì cho phép user ghi data bao gồm: create, update, delete

Sau đây chúng ta sẽ cùng tìm hiểu cách viết security rules cho **Cloud Firestore,** một service lưu trữ data NOSQL, mạnh mẽ, linh động, realtime data phổ biến nhất hiện nay.

### 2. Cloud firestore rules
Mặc định thì **firestore rules** sẽ không cho phép bất kỳ user/anonymous nào từ client app có thể truy cập được database. Việc này sẽ bảo vệ database không được truy cập trái phép cho đến khi chúng ta customize lại rules.

**Cú pháp:**
```js
service cloud.firestore {
  // Match the resource path.
  match <<path>> {
    // Allow the request if the following conditions are true.
    allow <<methods>> : if <<condition>>
  }
}
```

Quy tắc rules được tóm tắt như sau: Firebase sẽ cho phép phương thức (`methods`) truy cập data vào những `path` cụ thể dựa vào điều kiện(`condition`) được định nghĩa sẵn.

### 3. Một số rules thường dùng
#### 3.1. Cho phép truy cập vào database
```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
 Cho phép tất cả các truy cập vào collections, subcollections của database


#### 3.2. Chặn tất cả truy cập vào database
```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
Chặn tất cả các truy cập vào collections, subcollections của database


#### 3.3. Cho phép truy cập nếu user đã xác thực (Firebase authentication)
```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
Chỉ cho phép `read/write` vào database những user đã login thông qua firebase authentication(Email/password, Phone, Google, Facebook, Twitter, Github, ...)


#### 3.4. Cho phép truy cập data thuộc user đang login
```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /some_collection/{userId}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId
    }
  }
}
```
Đầu tiên chúng ta tạo một collection(`some_collection`), dùng `userId` để định danh mỗi document trong collection. Rules ở trên chỉ cho phép truy cập vào data thuộc user đang login, không cho phép truy cập vào những data không thuộc user đó thông qua `userId`.


#### 3.5. Phân quyền truy cập data
```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access, but only content owners can write
    match /some_collection/{document} {
      allow read: if true // 1
      allow create: if request.auth.uid == request.resource.data.author_uid; // 2
      allow update, delete: if request.auth.uid == resource.data.author_uid; // 3
    }
    
    match /public_collection/{document=**} {
      allow read, write: if true; // 4
    }
  }
}
```
1. Cho phép `read` public trên `some_collection`
2. Chỉ cho phép `create` data có field `author_uid`(data chuẩn bị tạo mới) của user đang login
3. Chỉ cho phép `update/delete` data có `author_uid`(data đã tạo trước đó) thuộc user đang login
4. Cho phép `read/write` public trên `public_collection` và tất cả subcollections


#### 3.6. Phân quyền truy cập data theo role
```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true; // 1
    }

    // For role-based access, assign specific roles to users
    match /some_collection/{document} {
     allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Reader" // 2
     allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Writer" // 3
   }
  }
}
```
1. Chỉ admin mới có quyền `read/write` trên tất cả collections, dựa vào field `admin` của document có id là `userId` của user đang login(document `users/{userId}` chứa data liên quan đến user được tạo mỗi khi đăng ký mới một user)
2. Cho phép `read` trên `some_collection` đối với user có role là `Reader`
3. Cho phép `write` trên `some_collection` đối với user có role là `Writer`


#### 3.7. Sử dụng function
```js
service cloud.firestore {
  match /databases/{database}/documents {
  
    function isAuthenticated() {
      return request.auth.uid != null;
    }
    
    function isDeleted() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.deleted_flg == false;
    }
    
    match /some_collection/{document} {
      allow read, write: if isAuthenticated() && isDeleted()
    }
  }
}
```
Cho phép `read/write` trên `some_collection` nếu user đã login và có `deleted_flg = false`

### 4. Kết luận
**Lưu ý:**

1. Nêú có nhiều rules apply cho 1 path thì chỉ cần có 1 rule hợp lệ thì có thể access được data của path đó.
2. Rule apply trên `children path` không ảnh hưởng đến rule của `parent path`, tức là nếu set rules cho `read` ở tất cả các collection và set rule không cho `read` ở `private_collection` thì data ở `private_collection` vẫn có thể `read` được.


Trên đây là một số cách viết firestore rules cơ bản, hy vọng mọi người có thể apply vào các projects một cách hợp lý, xin cám ơn.