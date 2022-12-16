Như các bạn đã biết, Firestore là một database rất linh hoạt và dễ mở rộng, giúp cho việc thiết kế ứng dụng của lập trình viên trở nên nhanh chóng hơn.

Firestore cho phép ứng dụng phía client có thể trực tiếp truy cập thông qua native SDKs, tuy nhiên trong một vài trường hợp, chúng ta không mong muốn các truy cập tự do từ phía client gây xáo trộn hoặc mất mát dữ liệu, vì vậy trong bài viết này, mình xin chia sẻ một vài cách để ngăn chặn các truy cập không mong muốn có thể gây hại cho database.

### 1. Chuẩn bị
Trong bài viết này mình sẽ thực hiện trên nền tảng **WEB và WEB server Nodejs**, vì vậy các bạn hãy chuẩn bị một project trên Firebase, một project web html + js để có thể thao tác với Firestore từ phía client và một web server nodejs để thực hiện validate dữ liệu.

Các bạn có thể tham khảo cách nhúng và sử dụng Firebase sdk tại đây: [Add Firebase to your JavaScript Project](https://firebase.google.com/docs/web/setup)

### 2. Triển chiêu
#### 2.1 Bảo mật với Security Rules Firestore
Sau khi đăng nhập vào bảng điều khiển của Firebase, các bạn chọn **Database** bên menu phía tay trái sau đó chọn **Cloud Firestore** và chọn tab **Rules**

![](https://images.viblo.asia/8b7d1e0e-9294-47b9-974b-331d498de1bb.png)

Các bạn sẽ thấy dòng:

`allow read, write: if false;`

Điều này có nghĩa là sẽ chặn toàn bộ các quyền đọc và ghi vào Database. Từ phía client, các bạn hãy thử tạo một bản ghi vào Database như sau:

```javascript
    var firestore = firebase.firestore();
    var carsCollection = firestore.collection('cars');
    
    var newCar = {
        brand: 'Mazda',
        name: 'Mazda cx5',
        color: 'silver',
        seats: 5
    };
    
    carsCollection.add(newCar).then(function(ref) {
        console.log('Đã thêm xe mới có mã: ' + ref.id);
    }).catch(function(error) {
        console.log(error);
    });
```

Các bạn sẽ nhận được thông báo lỗi **Missing or insufficient permissions.**

Bây giờ các bạn hãy sửa lại đoạn Rules của Firestore như sau:

```
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read, write: if true;
            }
        }
    }
```

Sau đó chạy lại đoạn code tạo bản ghi bên trên, và kiểm tra lại Data trong Firestore, các bạn sẽ thấy đoạn code trên đã thực hiện thêm một bản ghi mới vào Data của Firestore. Đoạn Rules bên trên có nghĩa là chúng ta sẽ cho phép client có toàn quyền đọc và ghi dữ liệu vào Database.

Firestore cung cấp cho chúng ta các phương thức trong Rules để có thể kiểm tra dữ liệu đầu vào hoặc xác thực trạng thái đăng nhập của user.

Ví dụ chúng ta muốn các user đã đăng nhập mới có quyền ghi dữ liệu thì đoạn Rules sẽ có dạng như sau:

```
     service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read: if true;
                allow write: if request.auth.uid != null;
            }
        }
    }
```

Hoặc việc kiểm tra dữ liệu đúng định dạng mới cho phép ghi thì đoạn Rules sẽ như sau:

```
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read: if true;
                allow write: if request.resource.data.brand == 'Mazda';
            }
        }
    }
```

Đoạn Rules bên trên là chỉ cho phép ghi dữ liệu nếu trường **brand** là **Mazda**.

Các bạn có thể tìm hiểu rõ hơn về Rules của Firestore tại đây: [Cloud Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

#### 2.2 Validate dữ liệu với web server

Trong một vài trường hợp đặc biệt, các Rules của Firestore không thể cung cấp đủ các phương thức để validate các dữ liệu phức tạp. Ví dụ mình có một dữ liệu như sau:

```javascript
    var brand = {
        name: 'Mazda',
        code: 'mazda-001',
        cars: [
            {
                name: 'Mazda 3',
                color: 'black',
                seats: 5
            },
            {
                name: 'Mazda cx5',
                color: 'silver',
                seats: 5
            }
        ]
    };
```

Trường hợp này mình muốn validate từng thuộc tính của các item trong mảng **cars**, nhưng trong Rules của Firestore không cung cấp một phương thức nào để tham chiếu đến các item trong mảng, bởi vậy ý tưởng mình đưa ra là sẽ validate dữ liệu trên một custom web server trước khi đẩy dữ liệu lên Firestore.

* Các bạn hãy tạo cho mình một web server bằng nodejs, có thể dùng expressjs, hapijs, hoặc gì tùy ý các bạn, ở đây mình dùng hapijs, sau đó hãy tích hợp Firebase-Admin-SDK vào.

* Các bạn có thể tham khảo cách nhúng và cài đặt Firebase-Admin-SDK tại đây: [Add the Firebase Admin SDK to Your Server](https://firebase.google.com/docs/admin/setup) 

Trên backend server mình dùng thư viện Joijs để validate dữ liệu.

```javascript
    const Joi = require('joi');
    
    const validate = {
        payload: {
            name: Joi.string().required(),
            code: Joi.string().required(),
            cars: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string(),
                    color: Joi.string(),
                    seats: Joi.number()
                })
            ).required()
        }
    };
```

Nhìn qua đoạn code bên trên chắc hẳn các bạn đã hình dung ra mình đã validate rất chi tiết từng thuộc tính của dữ liệu, các bạn có thể tham khảo thư viện Joijs tại đây: [Joi validator](https://github.com/hapijs/joi)

Sau khi dữ liệu được validate thành công thì chúng ta sẽ tiếp tục ghi dữ liệu đó vào Firestore thông qua Firebase-Admin-SDK

```javascript
    // Init server hapijs
    // ...
    
    const Joi = require('joi');
    
    const validate = {
        payload: {
            name: Joi.string().required(),
            code: Joi.string().required(),
            cars: Joi.array().items(
                Joi.object().keys({
                    name: Joi.string(),
                    color: Joi.string(),
                    seats: Joi.number()
                })
            ).required()
        }
    };
    
    const admin = require('firebase-admin');
    
    const serviceAccount = require('path-to-service-account.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://<your database>.firebaseio.com"
    });
    
    const fireStore = admin.firestore();
    const brandCollection = fireStore.collection('brand');
    
    server.route({
        method: 'POST',
        path: '/brand',
        options: { validate },
        handler: async function(request) {
            try {
                const payload = request.payload;
                return await brandCollection.add(payload).then(ref => ref.id);
            } catch (error) {
                throw error;
            }
        }
    })
    
    // ...
    // Do something
```

Mọi việc đã xong, bây giờ từ client các bạn sẽ không request trực tiếp lên Firestore để ghi dữ liệu mà sẽ request lên Webserver, Webserver sẽ làm nhiệm vụ validate dữ liệu sau đó đẩy lên Firestore.

Để chắc chắn không nhận bất kỳ request nào từ client, các bạn sửa lại Rules của Firestore như sau:

```
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read: if true;
                allow write: if false;
            }
        }
    }
```

Đoạn trên có nghĩa là cho phép các request từ client có thể đọc dữ liệu nhưng không cho phép ghi. Các Rules của Firestore sẽ không bị áp dụng nếu chúng ta request bằng Firebase-Admin-SDK.

Cảm ơn các bạn đã quan tâm và dành thời gian đọc bài viết này, chúc các bạn thành công!