# **Cloud Firestore**
![](https://images.viblo.asia/9137b67b-dabe-4d5c-9875-f37a0dad5439.png) 


Cloud Firestore là một cơ sở dữ liệu linh hoạt, có thể mở rộng để phát triển thiết bị di động, web và máy chủ từ Firebase và Google Cloud. Giống như Cơ sở dữ liệu thời gian thực Firebase, nó giữ cho dữ liệu của bạn đồng bộ hóa trên các ứng dụng máy khách thông qua trình nghe thời gian thực và cung cấp hỗ trợ ngoại tuyến cho thiết bị di động và web để bạn có thể xây dựng các ứng dụng đáp ứng hoạt động bất kể độ trễ mạng hoặc kết nối Internet. Cloud Firestore cũng cung cấp tích hợp liền mạch với các sản phẩm Firebase và Google Cloud khác, bao gồm Cloud Functions.

# **Cách Cloud Firestore làm việc**

Firestore là một cơ sở dữ liệu đám mây NoSQL linh hoạt, có thể mở rộng để lưu trữ và đồng bộ hóa dữ liệu. Nó giữ cho dữ liệu của bạn đồng bộ hóa trên các ứng dụng khách thông qua trình nghe thời gian thực và cung cấp hỗ trợ ngoại tuyến để bạn có thể xây dựng các ứng dụng đáp ứng hoạt động bất kể độ trễ mạng hoặc kết nối Internet.

# **Tổng quan**
## Cài đặt

### 1. Thêm package
Thêm `cloud_firestore` vào tệp dự án của bạn: `pubspec.yaml`

```
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^1.8.0   //last version
  cloud_firestore: ^2.5.4 //last version
```

### 2. Tải package
```
$ flutter pub get
```
### 3. Rebuild lại project của bạn
```
$ flutter run
```

# **Sử dụng**
Để bắt đầu sử package Cloud Firestore trong dự án của bạn, hãy import package ở đầu tệp của project bạn:

```
import 'package:cloud_firestore/cloud_firestore.dart';
```

Trước khi sử dụng Firestore, trước tiên bạn phải đảm bảo rằng bạn đã [khởi tạo FlutterFire](https://firebase.flutter.dev/docs/overview/#initializing-flutterfire).

Để tạo một phiên bản Firestore mới, hãy gọi instance trên FirebaseFirestore:

```
FirebaseFirestore firestore = FirebaseFirestore.instance;
```

Theo mặc định, điều này cho phép bạn tương tác với Firestore bằng Ứng dụng Firebase mặc định được sử dụng trong khi cài đặt FlutterFire trên nền tảng của bạn. Tuy nhiên, nếu bạn muốn sử dụng Firestore với Ứng dụng Firebase thứ cấp, hãy sử dụng phương thức `instanceFor`:

```
FirebaseApp secondaryApp = Firebase.app('SecondaryApp');
FirebaseFirestore firestore = FirebaseFirestore.instanceFor(app: secondaryApp);
```

## Tìm hiểu về Collections & Documents

Firestore lưu trữ dữ liệu trong "documents", được chứa trong "collections". Documents cũng có thể chứa các collection lồng nhau. Ví dụ: mỗi người dùng của chúng tôi sẽ có "documents" của riêng họ được lưu trữ bên trong collection "Users". Phương pháp `collection` cho phép ta tham chiếu một tập hợp trong code.

Trong ví dụ dưới đây, chúng tôi có thể tham chiếu collection và tạo một user document khi nhấn nút: `users`

```
import 'package:flutter/material.dart';

// Import the firebase_core and cloud_firestore plugin
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AddUser extends StatelessWidget {
  final String fullName;
  final String company;
  final int age;

  AddUser(this.fullName, this.company, this.age);

  @override
  Widget build(BuildContext context) {
    // Create a CollectionReference called users that references the firestore collection
    CollectionReference users = FirebaseFirestore.instance.collection('users');

    Future<void> addUser() {
      // Call the user's CollectionReference to add a new user
      return users
          .add({
            'full_name': fullName, // John Doe
            'company': company, // Stokes and Sons
            'age': age // 42
          })
          .then((value) => print("User Added"))
          .catchError((error) => print("Failed to add user: $error"));
    }

    return TextButton(
      onPressed: addUser,
      child: Text(
        "Add User",
      ),
    );
  }
}
```

## Đọc dữ liệu

Cloud Firestore cung cấp cho bạn khả năng đọc giá trị của một collection hoặc một document. Đây có thể là lần đọc một lần hoặc được cung cấp bởi các bản cập nhật theo thời gian thực khi dữ liệu trong một truy vấn thay đổi.

### Đọc một lần

Để đọc một collection hoặc document một lần, hãy gọi phương thức `Query.get` hoặc `DocumentReference.get`. Trong ví dụ dưới đây, `FutureBuilder` được sử dụng để giúp quản lý trạng thái của yêu cầu:

```
class GetUserName extends StatelessWidget {
  final String documentId;

  GetUserName(this.documentId);

  @override
  Widget build(BuildContext context) {
    CollectionReference users = FirebaseFirestore.instance.collection('users');

    return FutureBuilder<DocumentSnapshot>(
      future: users.doc(documentId).get(),
      builder:
          (BuildContext context, AsyncSnapshot<DocumentSnapshot> snapshot) {

        if (snapshot.hasError) {
          return Text("Something went wrong");
        }

        if (snapshot.connectionState == ConnectionState.done) {
          Map<String, dynamic> data = snapshot.data.data();
          return Text("Full Name: ${data['full_name']} ${data['last_name']}");
        }

        return Text("loading");
      },
    );
  }
}
```

Để tìm hiểu thêm về cách đọc dữ liệu trong khi ngoại tuyến, hãy xem tài liệu [Access Data Offline](https://firebase.flutter.dev/docs/firestore/usage/#access-data-offline).

### Thay đổi thời gian thực

FlutterFire provides hỗ trợ để xử lý các thay đổi trong thời gian thực đối với collection và document. Một sự kiện mới được cung cấp theo yêu cầu ban đầu và mọi thay đổi tiếp theo đối với collection/document bất cứ khi nào xảy ra thay đổi (sửa đổi, xóa hoặc thêm).

Cả `CollectionReference` & `DocumentReference` đều cung cấp một phương thức trả về `Stream`: `snapshots ()`

```
Stream collectionStream = FirebaseFirestore.instance.collection('users').snapshots();
Stream documentStream = FirebaseFirestore.instance.collection('users').doc('ABC123').snapshots();
```

Sau khi được trả lại, bạn có thể đăng ký nhận các bản cập nhật thông qua phương thức này. Ví dụ dưới đây sử dụng `StreamBuilder` giúp tự động quản lý trạng thái stream và việc xử lý stream khi nó không còn được sử dụng trong ứng dụng của bạn: `listen()`

```
class UserInformation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    CollectionReference users = FirebaseFirestore.instance.collection('users');

    return StreamBuilder<QuerySnapshot>(
      stream: users.snapshots(),
      builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
        if (snapshot.hasError) {
          return Text('Something went wrong');
        }

        if (snapshot.connectionState == ConnectionState.waiting) {
          return Text("Loading");
        }

        return new ListView(
          children: snapshot.data.docs.map((DocumentSnapshot document) {
            return new ListTile(
              title: new Text(document.data()['full_name']),
              subtitle: new Text(document.data()['company']),
            );
          }).toList(),
        );
      },
    );
  }
}
```

Theo mặc định, listeners không cập nhật nếu có thay đổi chỉ ảnh hưởng đến metadata. Nếu bạn muốn nhận các sự kiện khi tài liệu hoặc siêu dữ liệu truy vấn thay đổi, bạn có thể chuyển đến phương thức: `includeMetadataChanges` `snapshots`

```
FirebaseFirestore.instance
  .collection('users')
  .snapshots(includeMetadataChanges: true)
  ```
  
##   Document & Query Snapshots

Khi thực hiện một truy vấn, Firestore trả về một `QuerySnapshot` hoặc một `DocumentSnapshot`.

### QuerySnapshot

Ảnh chụp `QuerySnapshot` được trả về từ query collection và cho phép bạn kiểm tra collection, chẳng hạn như có bao nhiêu documents tồn tại bên trong nó, cấp quyền truy cập vào documents trong collection, xem bất kỳ thay đổi nào kể từ query cuối cùng và hơn thế nữa.

Để truy cập documents trong `QuerySnapshot`, hãy gọi thuộc tính `docs`, thuộc tính này trả về một lớp chứa `DocumentSnapshot`. `List`

```
FirebaseFirestore.instance
    .collection('users')
    .get()
    .then((QuerySnapshot querySnapshot) {
        querySnapshot.docs.forEach((doc) {
            print(doc["first_name"]);
        });
    });
  ```

### DocumentSnapshot

`DocumentSnapshot` được trả về từ mộtquery hoặc bằng cách truy cập trực tiếp vào tài liệu. Ngay cả khi không có tài liệu nào tồn tại trong cơ sở dữ liệu, snapshot sẽ luôn được trả về.

Để xác định xem tài liệu có tồn tại hay không, hãy sử dụng thuộc tính `exists`:

```
FirebaseFirestore.instance
    .collection('users')
    .doc(userId)
    .get()
    .then((DocumentSnapshot documentSnapshot) {
      if (documentSnapshot.exists) {
        print('Document exists on the database');
      }
    });
```

Nếu document tồn tại, bạn có thể đọc dữ liệu của nó bằng cách gọi phương thức data, phương thức này trả về a hoặc nếu nó không tồn tại: `Map <String, dynamic>` `null`

```
FirebaseFirestore.instance
    .collection('users')
    .doc(userId)
    .get()
    .then((DocumentSnapshot documentSnapshot) {
      if (documentSnapshot.exists) {
        print('Document data: ${documentSnapshot.data()}');
      } else {
        print('Document does not exist on the database');
      }
    });
```

Một `DocumentSnapshot` cũng cung cấp khả năng truy cập dữ liệu lồng nhau sâu mà không cần lặp lại thủ công trả về thông qua phương thức `get`. Phương thức chấp nhận một đường dẫn được phân tách bằng dấu chấm hoặc một phiên bản `FieldPath`. Nếu không có dữ liệu nào tồn tại trong đường dẫn lồng nhau, một `StateError`: `Map`

```
try {
  dynamic nested = snapshot.get(FieldPath(['address', 'postcode']));
} on StateError catch(e) {
  print('No nested field exists!');
}
```

## Querying

Cloud Firestore cung cấp các khả năng nâng cao để querying collections. Các query hoạt động với cả việc đọc một lần hoặc đăng ký các thay đổi.

### Filtering

Để lọc documents trong một collection, phương thức `where` có thể được xâu chuỗi vào một tham chiếu collection. Filtering hỗ trợ equality checks và "in" queries. Ví dụ: đối với bộ lọc users có tuổi của họ lớn hơn 20:

```
FirebaseFirestore.instance
  .collection('users')
  .where('age', isGreaterThan: 20)
  .get()
  .then(...);
  ```
  
Firestore cũng hỗ trợ các query mảng. Ví dụ: để lọc users nói tiếng Anh (en) hoặc tiếng Ý (it), hãy sử dụng bộ lọc: `arrayContainsAny`

```
FirebaseFirestore.instance
  .collection('users')
  .where('language', arrayContainsAny: ['en', 'it'])
  .get()
  .then(...);
  ```
  
Để tìm hiểu thêm về tất cả các khả năng querying mà Cloud Firestore cung cấp, hãy xem [tài liệu Firebase](https://firebase.google.com/docs/firestore/query-data/queries).

### Limiting

Để giới hạn số lượng documents được trả về từ một query, hãy sử dụng phương pháp `limit` trên một tham chiếu collection:

```
FirebaseFirestore.instance
  .collection('users')
  .limit(2)
  .get()
  .then(...);
  ```
  
Bạn cũng có thể limit đến documents cuối cùng trong query collection bằng cách sử dụng `limitToLast`:

```
FirebaseFirestore.instance
  .collection('users')
  .orderBy('age')
  .limitToLast(2)
  .get()
  .then(...);
  ```
  
### Ordering

Để sắp xếp documents theo một giá trị cụ thể, hãy sử dụng phương thức `orderBy`:

```
FirebaseFirestore.instance
  .collection('users')
  .orderBy('age', descending: true)
  .get()
  .then(...);
  ```
  
### Start & End Cursors

Để start and/or end một query tại một điểm cụ thể trong một collection, bạn có thể chuyển một giá trị cho hoặc các phương thức. Bạn phải chỉ định thứ tự để sử dụng truy vấn con trỏ, ví dụ: `startAt` `endAt` `startAfter` `endBefore`

Bạn có thể chỉ định thêm một DocumentSnapshot thay vì một giá trị cụ thể, bằng cách chuyển nó tới, ,hoặc các phương thức. Ví dụ: `startAfterDocument` `startAtDocument` `endAtDocument` `endBeforeDocument`

```
FirebaseFirestore.instance
  .collection('users')
  .orderBy('age')
  .startAfterDocument(documentSnapshot)
  .get()
  .then(...);
  ```
  
###   Query Limitations

Cloud Firestore không hỗ trợ các loại truy vấn sau:

* Truy vấn có bộ lọc phạm vi trên các trường khác nhau, như được mô tả trong phần trước.

* Truy vấn logic OR. Trong trường hợp này, bạn nên tạo một query riêng cho từng điều kiện OR và hợp nhất các kết quả query trong ứng dụng của bạn.

* Truy vấn với mệnh đề a! =. Vì lý do này, bạn nên chia truy vấn thành truy vấn lớn hơn và truy vấn nhỏ hơn. Ví dụ: mệnh đề truy vấn không được hỗ trợ, tuy nhiên bạn có thể nhận được cùng một tập hợp kết quả bằng cách kết hợp hai truy vấn, một với mệnh đề và một với mệnh đề `where("age", isNotEqualTo: 30)` `where("age", isLessThan: 30)` `where("age", isGreaterThan: 30)`

# Writing Data

[Tài liệu Firebase](https://firebase.google.com/docs/firestore/manage-data/structure-data) cung cấp một số ví dụ tuyệt vời về các phương pháp hay nhất để cấu trúc dữ liệu của bạn. Bạn nên đọc hướng dẫn trước khi xây dựng cơ sở dữ liệu của mình.

Để biết thêm thông tin về những gì có thể khi ghi dữ liệu vào Firestore, vui lòng tham khảo [tài liệu này](https://firebase.google.com/docs/firestore/manage-data/add-data)

## Adding Documents

Để thêm một document mới vào collection, hãy sử dụng phương pháp `add` trên `CollectionReference`:

```
class AddUser extends StatelessWidget {
  final String fullName;
  final String company;
  final int age;

  AddUser(this.fullName, this.company, this.age);

  @override
  Widget build(BuildContext context) {
    // Create a CollectionReference called users that references the firestore collection
    CollectionReference users = FirebaseFirestore.instance.collection('users');

    Future<void> addUser() {
      // Call the user's CollectionReference to add a new user
      return users
          .add({
            'full_name': fullName, // John Doe
            'company': company, // Stokes and Sons
            'age': age // 42
          })
          .then((value) => print("User Added"))
          .catchError((error) => print("Failed to add user: $error"));
    }

    return FlatButton(
      onPressed: addUser,
      child: Text(
        "Add User",
      ),
    );
  }
}
```

Phương thức `add` sẽ thêm tài liệu mới vào collection của bạn với một ID được tạo tự động duy nhất. Nếu bạn muốn chỉ định ID của riêng mình, hãy gọi phương thức `set` trên `DocumentReference` thay thế:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> addUser() {
  return users
    .doc('ABC123')
    .set({
      'full_name': "Mary Jane",
      'age': 18
    })
    .then((value) => print("User Added"))
    .catchError((error) => print("Failed to add user: $error"));
}
```

Gọi `set` có id đã tồn tại trên tập hợp sẽ thay thế tất cả dữ liệu document.

## Updating documents

Đôi khi bạn có thể muốn cập nhật một document, thay vì thay thế tất cả dữ liệu. Phương thức `set` ở trên thay thế mọi dữ liệu hiện có trên `DocumentReference` nhất định. Nếu bạn muốn cập nhật thay thế document, hãy sử dụng phương pháp `update`:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> updateUser() {
  return users
    .doc('ABC123')
    .update({'company': 'Stokes and Sons'})
    .then((value) => print("User Updated"))
    .catchError((error) => print("Failed to update user: $error"));
}
```

Phương pháp này cũng cung cấp hỗ trợ để cập nhật các giá trị lồng nhau sâu sắc thông qua ký hiệu dấu chấm:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> updateUser() {
  return users
    .doc('ABC123')
    .update({'info.address.zipcode': 90210})
    .then((value) => print("User Updated"))
    .catchError((error) => print("Failed to update user: $error"));
}
```

### Field values

Cloud Firestore hỗ trợ lưu trữ và thao tác các giá trị trên cơ sở dữ liệu của bạn, chẳng hạn như Timestamps, GeoPoints, Blobs and array management.

Để lưu trữ các giá trị `GeoPoint`, hãy cung cấp vĩ độ và kinh độ cho lớp GeoPoint:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> updateUser() {
  return users
    .doc('ABC123')
    .update({'info.address.location': GeoPoint(53.483959, -2.244644)})
    .then((value) => print("User Updated"))
    .catchError((error) => print("Failed to update user: $error"));
}
```

Để lưu trữ Blob chẳng hạn như hình ảnh, hãy cung cấp `Uint8List`. Ví dụ dưới đây cho thấy cách lấy một hình ảnh từ thư mục `assets` của bạn và lồng nó vào đối tượng thông tin trong Firestore.

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> updateUser() {
  return rootBundle
    .load('assets/images/sample.jpg')
    .then((bytes) => bytes.buffer.asUint8List())
    .then((avatar) {
      return users
        .doc('ABC123')
        .update({'info.avatar': Blob(avatar)});
      })
    .then((value) => print("User Updated"))
    .catchError((error) => print("Failed to update user: $error"));
}
```

# Removing Data

Để xóa tài liệu bằng Cloud Firestore, bạn có thể sử dụng phương pháp `delete` trên `DocumentReference`:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> deleteUser() {
  return users
    .doc('ABC123')
    .delete()
    .then((value) => print("User Deleted"))
    .catchError((error) => print("Failed to delete user: $error"));
}
```

Nếu bạn cần xóa các thuộc tính cụ thể khỏi tài liệu thay vì chính document, bạn có thể sử dụng phương pháp `delete` với lớp `FieldValue`:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> deleteField() {
  return users
    .doc('ABC123')
    .update({'age': FieldValue.delete()})
    .then((value) => print("User's Property Deleted"))
    .catchError((error) => print("Failed to delete user's property: $error"));
}
```

# Transactions

Transactions là một cách để đảm bảo rằng hoạt động ghi chỉ xảy ra bằng cách sử dụng dữ liệu mới nhất có sẵn trên máy chủ. Các transactions không bao giờ áp dụng một phần ghi, và ghi thực hiện khi kết thúc một transactions thành công.

Transactions hữu ích khi bạn muốn cập nhật một trường dựa trên giá trị hiện tại của nó hoặc giá trị của một trường khác. Nếu bạn muốn viết nhiều tài liệu mà không sử dụng trạng thái hiện tại của tài liệu, bạn nên sử dụng chế độ ghi hàng loạt.

Khi sử dụng các transactions, hãy lưu ý rằng:

* Thao tác đọc phải đến trước khi thao tác ghi

* Transactions sẽ không thành công khi khách hàng ngoại tuyến, họ không thể sử dụng dữ liệu đã lưu trong bộ nhớ cache

Ví dụ về nơi transactions có thể được sử dụng sẽ nằm trong ứng dụng nơi người dùng có thể đăng ký kênh. Khi người dùng nhấn nút đăng ký, trường "người đăng ký" trong tài liệu sẽ tăng lên. Nếu không sử dụng transactions, trước tiên chúng ta cần đọc giá trị hiện có, sau đó tăng giá trị đó bằng hai thao tác riêng biệt.

Trên ứng dụng có lưu lượng truy cập cao, giá trị trên máy chủ có thể đã thay đổi vào thời điểm thao tác ghi đặt giá trị mới, khiến số không nhất quán.

Transactions loại bỏ vấn đề này bằng cách cập nhật nguyên tử giá trị của máy chủ. Nếu giá trị thay đổi trong khi transactions đang thực hiện, nó sẽ thử lại, đảm bảo giá trị trên máy chủ được sử dụng thay vì giá trị máy khách.

Để thực hiện một transactions, hãy gọi phương thức `runTransaction`:

```
// Create a reference to the document the transaction will use
DocumentReference documentReference = FirebaseFirestore.instance
  .collection('users')
  .doc(documentId);

return Firestore.instance.runTransaction((transaction) async {
  // Get the document
  DocumentSnapshot snapshot = await transaction.get(documentReference);

  if (!snapshot.exists) {
    throw Exception("User does not exist!");
  }

  // Update the follower count based on the current count
  // Note: this could be done without a transaction
  // by updating the population using FieldValue.increment()

  int newFollowerCount = snapshot.data()['followers'] + 1;

  // Perform an update on the document
  transaction.update(documentReference, {'followers': newFollowerCount});

  // Return the new count
  return newFollowerCount;
})
.then((value) => print("Follower count updated to $value"))
.catchError((error) => print("Failed to update user followers: $error"));
```

Trong ví dụ trên, nếu tài liệu thay đổi tại bất kỳ thời điểm nào trong quá trình transactions, nó sẽ thử lại tối đa năm lần.

Bạn không nên trực tiếp sửa đổi trạng thái ứng dụng bên trong transactions, vì trình xử lý có thể thực hiện nhiều lần. Thay vào đó, bạn nên trả về một giá trị ở cuối trình xử lý, cập nhật trạng thái ứng dụng khi transactions đã hoàn tất.

Nếu một ngoại lệ được đưa ra trong trình xử lý, toàn bộ transactions sẽ bị hủy bỏ.

# Batch write

Firestore cho phép bạn thực hiện nhiều thao tác ghi dưới dạng một lô duy nhất có thể chứa bất kỳ sự kết hợp nào của các thao tác `set`, `update` hoặc `delete`.

Đầu tiên, tạo một cá thể lô mới thông qua phương thức `batch`, sau đó thực hiện các thao tác trên lô, rồi cam kết khi đã sẵn sàng. Ví dụ dưới đây cho thấy cách xóa tất cả tài liệu trong một bộ sưu tập chỉ trong một thao tác:

```
CollectionReference users = FirebaseFirestore.instance.collection('users');

Future<void> batchDelete() {
  WriteBatch batch = FirebaseFirestore.instance.batch();

  return users.get().then((querySnapshot) {
    querySnapshot.documents.forEach((document) {
      batch.delete(document.reference);
    });

    return batch.commit();
  });
}
```

# Data Security

Điều quan trọng là bạn phải hiểu cách viết quy tắc trong bảng điều khiển Firebase để đảm bảo rằng dữ liệu của bạn được bảo mật. Vui lòng làm theo [tài liệu Firebase Firestore về bảo mật](https://firebase.google.com/docs/firestore/security/get-started).

# Access Data Offline

## Configure Offline Persistence

Firestore cung cấp hỗ trợ ngoại tuyến cho các khả năng ngoại tuyến. Khi đọc và ghi dữ liệu, Firestore sử dụng cơ sở dữ liệu cục bộ tự động đồng bộ hóa với máy chủ. Chức năng Cloud Firestore vẫn tiếp tục khi người dùng ngoại tuyến và tự động xử lý việc di chuyển dữ liệu khi họ lấy lại kết nối.

Chức năng này được bật theo mặc định, tuy nhiên nó có thể bị tắt nếu cần. `Settings` phải được đặt trước khi thực hiện bất kỳ tương tác nào với Firestore:

```
// Web.
await FirebaseFirestore.instance.enablePersistence();

// All other platforms.
FirebaseFirestore.instance.settings =
    Settings(persistenceEnabled: false);
```
    
Nếu bạn muốn xóa bất kỳ dữ liệu tồn tại nào, bạn có thể gọi phương thức `clearPersistence ()`.

```
await FirebaseFirestore.instance.clearPersistence();
```

Các cuộc gọi để cập nhật cài đặt hoặc xóa tình trạng tồn tại phải được thực hiện trước bất kỳ hoạt động sử dụng Firestore nào khác. Nếu được gọi sau đó, chúng sẽ có hiệu lực đối với yêu cầu tiếp theo của Firestore (ví dụ: khởi động lại ứng dụng).

## Configure Cache Size

Khi tính năng duy trì được bật, Firestore lưu trữ mọi tài liệu để truy cập ngoại tuyến. Sau khi vượt quá kích thước bộ nhớ cache, Firestore sẽ cố gắng xóa dữ liệu cũ hơn, không sử dụng. Bạn có thể định cấu hình các kích thước bộ nhớ cache khác nhau hoặc vô hiệu hóa quá trình xóa:

```
// The default value is 40 MB. The threshold must be set to at least 1 MB,
// and can be set to Settings.CACHE_SIZE_UNLIMITED to disable garbage collection.

FirebaseFirestore.instance.settings =
    Settings(cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED);
```

## Disable and Enable Network Access

Có thể vô hiệu hóa quyền truy cập mạng cho ứng dụng Firestore của bạn. Trong khi quyền truy cập mạng bị vô hiệu hóa, tất cả các yêu cầu Firestore đều lấy kết quả từ bộ nhớ đệm. Mọi thao tác ghi đều được xếp hàng đợi cho đến khi quyền truy cập mạng được kích hoạt lại.

```
await FirebaseFirestore.instance.disableNetwork()
```

Để kích hoạt lại quyền truy cập mạng, hãy gọi phương thức `enableNetwork`:

```
await FirebaseFirestore.instance.enableNetwork()
```

# Emulator Usage

Nếu bạn đang sử dụng các [trình giả lập Firestore cục bộ](https://firebase.google.com/docs/rules/emulator-setup), thì bạn có thể kết nối với các trình giả lập này bằng cách chuyển một tham số `host` tới phương thức `settings`, ngay sau khi khởi chạy Firebase. Đảm bảo bạn chuyển đúng cổng mà trình mô phỏng Firebase đang chạy.

Đảm bảo bạn đã bật kết nối mạng với trình giả lập trong ứng dụng của mình theo hướng dẫn sử dụng trình mô phỏng trong ghi chú cài đặt FlutterFire chung cho từng hệ điều hành.

```
On Android emulators, to reference localhost, use the 10.0.2.2 IP address instead.
```

```
// Import foundation for [TargetPlatform].
import 'package:flutter/foundation.dart';

// ...

// Switch host based on platform.
String host = defaultTargetPlatform == TargetPlatform.android
    ? '10.0.2.2:8080'
    : 'localhost:8080';

// Set the host as soon as possible.
FirebaseFirestore.instance.settings =
    Settings(host: host, sslEnabled: false);

// ...
```

**Nguồn tham khảo:**:

https://firebase.flutter.dev/docs/firestore/overview

https://firebase.flutter.dev/docs/firestore/usage/

https://firebase.google.com/docs/firestore