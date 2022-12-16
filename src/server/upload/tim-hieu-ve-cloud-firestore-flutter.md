# Tổng quan
Đầu tiên chúng ta cùng xem qua Introducing của Cloud Firestore đã nhé 
{@embed: https://www.youtube.com/watch?v=_tyjqozrEPY&t=4s}
## I. Cloud Firestore là gì?
Cloud Firestore là cơ sở dữ liệu mới của Firebase phát triển dành cho ứng dụng di động. Nó là sự kế thừa của Realtime Database với mô hình dữ liệu mới và trực quan hơn. Cloud Firestore phong phú hơn, nhanh hơn và có khả năng mở rộng siêu việt hơn so với Realtime Database.

Giống như Firebase Realtime Database, nó giúp dữ liệu của chúng ta đồng bộ hóa trên các ứng dụng client thông qua việc đăng ký realtime và cung cấp hỗ trợ ngoại tuyến cho thiết bị di động và web. Cloud Firestore cũng cung cấp tích hợp với các sản phẩm khác của Firebase và Google Cloud Platform, bao gồm cả Cloud Functions.
## II.Tính năng chính
* Tính linh hoạt: Cloud Firestore hỗ trợ các cấu trúc dữ liệu linh hoạt, phân cấp dữ liệu. Lưu trữ dữ liệu của chúng ta trong các document , được tổ chức thành các collection. Các document có thể chứa các đối tượng phức tạp.
* Truy vấn tượng trưng : Chúng ta có thể sử dụng các truy vấn để truy xuất các document riêng lẻ hoặc để truy xuất tất cả các document trong collection khớp với các tham số truy vấn của chúng ta. Các truy vấn của chúng ta có thể bao gồm nhiều bộ lọc, kết hợp giữa bộ lọc và sắp xếp.
* Cập nhật thời gian thực: Cloud Firestore sử dụng đồng bộ hóa dữ liệu để cập nhật dữ liệu trên mọi thiết bị được kết nối. Nó cũng được thiết kế để thực hiện các truy vấn tìm nạp một lần .
* Hỗ trợ offline: Cloud Firestore lưu trữ dữ liệu tại local, vì vậy ứng dụng có thể viết, đọc, nghe và truy vấn dữ liệu ngay cả khi thiết bị ngoại tuyến. Khi thiết bị trở lại trực tuyến, Cloud Firestore sẽ đồng bộ hóa mọi thay đổi cục bộ lên Cloud Firestore.
* Khả năng mở rộng: Mang đến khả năng từ Google Cloud Platform thiết kế để sử dụng cơ sở dữ liệu khó khăn nhất từ các ứng dụng lớn nhất thế giới.
## III.Cách thức hoạt động
Cloud Firestore là một cơ sở dữ liệu NoQuery được lưu trữ trên đám mây mà các ứng dụng IOS, Android, Web có thể truy cập trực tiếp thông qua SDK.Cloud Firestore cũng có sẵn trong Node.js, Java, Python và Go SDKs, REST và RPC APIs.

Được tổ chức theo mô hình dữ liệu NoQuery của Cloud Firestore, dữ liệu lưu trong các document ánh xạ tới các giá trị. Các document này được lưu trữ trong các collection cho chúng ta tổ chức dữ liệu và thực hiện truy vấn.

Bảo vệ quyền truy cập vào dữ liệu của chúng ta trong Cloud Firestore với Firebase Authentication cho Android, iOS và JavaScript hoặc nhận dạng và quản lý truy cập (IAM).
## IV.Cài đặt
### 1. Thêm package
```
dependencies:
  flutter:
    sdk: flutter
  firebase_core: "^0.7.0"
  firebase_storage: "^7.0.0"
```
### 2. Tải package
```
$ flutter pub get
```
### 3. Rebuild lại project
```
$ flutter run
```
## V. Sử dụng 
Để bắt đầu sử dụng Cloud Firestore trong dự án, ta hãy import vào project:
```
import 'package:cloud_firestore/cloud_firestore.dart';
```

Trước khi sử dụng Firestore, trước tiên ta phải đảm bảo rằng ta đã khởi tạo FlutterFire.

Để tạo một phiên bản Firestore mới, hãy gọi instance trên FirebaseFirestore:
```
FirebaseFirestore firestore = FirebaseFirestore.instance;
```
Theo mặc định, điều này cho phép ta tương tác với Firestore bằng Ứng dụng Firebase mặc định được sử dụng trong khi cài đặt FlutterFirestore trên nền tảng của chúng ta. Tuy nhiên, nếu ta muốn sử dụng Firestore với Ứng dụng Firebase thứ cấp, hãy sử dụng phương thức **instanceFor**:
```
FirebaseApp secondaryApp = Firebase.app('SecondaryApp');
FirebaseFirestore firestore = FirebaseFirestore.instanceFor(app: secondaryApp);
```

### 1. Thêm dữ liệu vào Cloud Firestore
Có hai cách để thêm dữ liệu vào Cloud Firestore, cách thứ nhất là chỉ định tên tài liệu và cách thứ hai, Cloud Firestore sẽ tạo một id ngẫu nhiên, chúng ta hãy xem lần lượt cả hai trường hợp nhé. 

Chúng ta sẽ tạo một function **_onPressed()** để khi click vào sẽ add dữ liệu vào Firestore
```
void _onPressed() {
  firestoreInstance.collection("users").add(
  {
   "name" : "john",
    "age" : 50,
    "email" : "example@example.com",
    "address" : {
      "street" : "street 24",
      "city" : "new york"
    }
  }).then((value){
    print(value.id);
  });
}

```
Như bạn có thể thấy ở trên, khi nhấn nút để chạy **_onPressed**, chúng ta tạo một tập hợp user và phương thức add() sẽ tạo một id ngẫu nhiên. Vì phương thức add() trả về **Future<DocumentReference>** do đó chúng ta có thể sử dụng phương thức then() là callback được gọi khi **Future** kết thúc. Biến **value** là một tham số được trả về khi gọi then() có type là DocumentReference, do đó chúng ta có thể sử dụng thuộc tính id để truy xuất id được tạo tự động.
    ![](https://images.viblo.asia/b056b558-6eff-4214-a867-8c4e6f02a3dc.jpg)
    
Như bạn có thể thấy, chúng ta đã thêm Map, String, int và chúng ta cũng có thể thêm một Array.
    
Nếu như bạn đang sử dụng Firebase Authen, thì bạn có thể sử dụng userId làm document id thay vì sử dụng id được generate ngẫu nhiên.
```
void _onPressed(){
  var firebaseUser =  FirebaseAuth.instance.currentUser;
  firestoreInstance.collection("users").doc(firebaseUser.uid).set(
  {
   "name" : "john",
    "age" : 50,
    "email" : "example@example.com",
    "address" : {
      "street" : "street 24",
      "city" : "new york"
    }
  }).then((_){
    print("success!");
  });
}
```
 
 Ở đây, vì chúng ta sử dụng userId làm document id, do đó chúng ta cần sử dụng phương thức set() để thêm dữ liệu vào document. Nếu một document đã tồn tại và bạn muốn cập nhật nó, thì bạn có thể sử dụng optional named parameter là **merge** và đặt nó thành true:
```
void _onPressed() {
  var firebaseUser =  FirebaseAuth.instance.currentUser;
  firestoreInstance.collection("users").doc(firebaseUser.uid).set(
  {
   "username" : "userX",
  },SetOptions(merge: true)).then((_){
      print("success!");
  });
}

```
Bằng cách này, dữ liệu hiện có bên trong document sẽ không bị ghi đè.    
![](https://images.viblo.asia/eb211ac1-757b-4851-94f4-6ed90e544d7d.png)
 
### 2. Cập nhật dữ liệu trong Firestore
Để cập nhật các trường bên trong document, bạn có thể làm như sau:
```
void _onPressed() {
    var firebaseUser = FirebaseAuth.instance.currentUser;
    firestoreInstance
        .collection("users")
        .doc(firebaseUser.uid)
        .update({"age": 60}).then((_) {
      print("success!");
    });
  }

```
Bạn cũng có thể cập nhật field, thêm field mới, cập nhật map và thêm field mới vào map:
```
void _onPressed() {
  var firebaseUser =  FirebaseAuth.instance.currentUser;
  firestoreInstance.collection("users").doc(firebaseUser.uid).update({
    "age": 60,
    "familyName": "Haddad",
    "address.street": "street 50",
    "address.country": "USA"
  }).then((_) {
    print("success!");
  });
}

```
Sau khi run đoạn code trên  thì chúng ta sẽ nhận được:
 ![](https://images.viblo.asia/35f1fd39-f3f1-4635-8194-d913c1ab526b.png)
> Lưu ý: `set()` với `merge:true` sẽ cập nhật các field trong document hoặc tạo nó nếu nó không tồn tại trong khi `update()` sẽ cập nhật các field nhưng sẽ không thành công nếu document không tồn tại.
    
Bây giờ, giả sử chúng ta muốn thêm đặc điểm cho từng người dùng trong Cloud Firestore, chúng ta có thể làm điều đó bằng cách sử dụng array:
    
```
void _onPressed() {
var firebaseUser =  FirebaseAuth.instance.currentUser;
firestoreInstance.collection("users").doc(firebaseUser.uid).update({
  "characteristics" : FieldValue.arrayUnion(["generous","loving","loyal"])
}).then((_) {
  print("success!");
});
}

```
 ![](https://images.viblo.asia/bc6973e1-44ab-42f4-bbca-a09fa24c658a.png)

Như bạn có thể thấy, bằng cách sử dụng `FieldValue.arrayUnion()`, bạn có thể thêm một array nếu nó không tồn tại hoặc bạn có thể cập nhật một phần tử trong array. Nếu bạn muốn xóa một phần tử khỏi array, thì bạn có thể sử dụng `FieldValue.arrayRemove(["generous"])`, thao tác này sẽ xóa phần tử **generous**.
 
###  3. Xóa dữ liệu khỏi Firestore
    
Để xóa dữ liệu khỏi document, bạn có thể sử dụng phương thức `delete()` trả về `Future<void>`:
```
void _onPressed() {
  var firebaseUser =  FirebaseAuth.instance.currentUser;
    firestoreInstance.collection("users").doc(firebaseUser.uid).delete().then((_) {
    print("success!");
  });
}

```
Bạn cũng có thể xóa một field bên trong document , bạn có thể sử dụng `FieldValue.delete()` với `update()`:
```
void _onPressed() {
var firebaseUser =  FirebaseAuth.instance.currentUser;
  firestoreInstance.collection("users").doc(firebaseUser.uid).update({
  "username" : FieldValue.delete()
}).then((_) {
  print("success!");
});
}

```
    
### 4. Lấy dữ liệu từ Firestore
Để truy xuất dữ liệu từ Cloud Firestore, chúng ta có thể lắng nghe các version realtime hoặc có thể sử dụng phương pháp get():
```
void _onPressed() {
  firestoreInstance.collection("users").get().then((querySnapshot) {
    querySnapshot.docs.forEach((result) {
      print(result.data());
    });
  });
}

```
Ở đây chúng ta truy xuất tất cả các document bên trong collection users, **querySnapshot.docs** sẽ trả về **List<DocumentSnapshot>** do đó chúng ta có thể sử dụng forEach(), chúng ta có thể truy xuất từng **DocumentSnapshot** và sau đó có thể sử dụng thuộc tính **data** để truy xuất tất cả dữ liệu của các document.

Kết quả:
```
I/flutter (15013): {address: {city: new york, street: street 14}, name: john, age: 50, email: example@example.com}
I/flutter (15013): {characteristics: [loving, loyal], address: {country: USA, city: new york, street: street 50}, familyName: Haddad, name: john, userName: userX, age: 60, email: example@example.com}
I/flutter (15013): {address: {city: new york, street: street 24}, name: john, age: 50, email: example@example.com}

```
Bạn có thể sử dụng `result.exist` trả về bool để check tồn tại document.

> Trên đây là một số phương thức thêm, sửa, xóa cơ bản trong Cloud Firestore. Ở bài viết sau chúng ta sẽ cùng tìm hiểu về SubCollection, Realtime Update, Perform Queries và Ordering data với FireStore nhé. 
### Tài liệu tham khảo 
[https://firebase.flutter.dev/docs/firestore/usage/](https://firebase.flutter.dev/docs/firestore/usage/)