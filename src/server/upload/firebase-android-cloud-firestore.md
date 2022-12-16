![](https://images.viblo.asia/09421373-afbf-4983-949e-3a711e0d9e17.png)



## 1. Compare Cloud Firestore and Realtime Database

Chắc hẳn ai cũng biết có một loại database quen thuộc là Relational Database, vậy nó có gì khác so với Firestore ? Dưới đây là bảng chỉ ra sự khác biệt : 

| Concept  | Firestore | Relational database |
| -------- | -------- | -------- |
|  Programing language     | NoSQL     | SQL     |
|Category of object |  Collection group | Table |
| One object | Document | Row |
| Individual data for an object | Field | Column |
| Unique ID for an object | Document ID | Primary key |


Trong Firebase nó lại có 2 loại đó là Cloud Firestore và Realtime Database, nhưng vì sao Cloud Firestore lại được nhắc tới nhiều hơn, mình cùng tìm hiểu nhé !

Firebase đưa ra 2 cloud-based : 
 * **Cloud Firestore** là một database mới nhất của Firebase cho bên mobile. Nó được xây dựng dựa trên Realtime Database với mô hình dữ liệu mới và trực quan hơn. Cloud Firestore cũng đưa ra nhiều tình năng hơn, querry nhanh hơn và quy mô rộng hơn so với Realtime Database.
 * **Realtime Database** là database chính gốc của Firebase. Đó là một giải pháp hiệu quả, có độ trễ thấp dành cho app mobile mà yêu cầu trạng thái được đồng bộ hóa giữa các máy khách trong thời gian thực.

Vậy database nào được Firebase khuyến khích sử dụng? Sự lựa chọn sử dụng database nào còn phụ thuộc vào nhiều yếu tố, tùy vào từng tính năng cụ thể mà người dùng có thể chọn  loại database nào phù hợp.

Cả hai database đều có chung những điểm sau : 
+ Lưu trữ dữ liệu người dùng trên nền tảng đám mây theo dạng noSQL.
 + Client-first SDKs, không cần có server để deploy và maintain.
 + Realtime updates, vẫn khả dụng khi ứng dụng ngoại tuyến.
==> Phù hợp làm các ứng dụng cần thời gian cập nhật dữ liệu nhanh chóng: chat, share data,...


Ngoài ra còn có một số điểm khác biệt nổi bật như sau : 

|  | Cloud Firestore | Realtime Database |
| -------- | -------- | -------- |
|  Data model     |  + Lưu trữ dữ liệu dưới dạng collections và documents. + Dữ liệu đơn giản được lưu trữ trong document, nó khá giống với JSON. + Với những dữ liệu phức tạp, phân cấp thì cũng dễ tổ chức hơn bằng cách sử dụng các subcollections kết nối với các documents. + Ít có những yêu cầu về việc phải chuẩn hóa và làm gọn dữ liệu |  + Lưu trữ dữ liệu dưới dạng một cây JSON lớn. + Những data đơn giản cũng rất dễ dàng lưu trữ. + Với những data phức tạp và phân cấp thì khó quản lý hơn|
| Querying |  + Truy vấn với việc đánh chỉ mục và có thể sử dụng cả sort và filter cùng lúc  |  + Truy vấn sâu bị giới hạn, chỉ được sử dụng sort hoặc filter |
|Writes and transactions| + Có những phương thức viết và chuyển đổi nâng cao.| + Các phương thức này ở mức cơ bản|



 Xem thêm chi tiết tại [đây](https://firebase.google.com/docs/firestore/rtdb-vs-firestore#what_are_some_other_important_things_to_consider) !


Cấu trúc lưu trữ data của Firestore như sau : 

 **Documents** : là cấu trúc thấp nhất, nó lưu trữ được từ string cho đến binary: 

![](https://images.viblo.asia/b8e92175-a748-47ad-b11a-30414b4a1334.png)

**Collections** : chứa một hoặc nhiều các documents, có một số rule cho Collections như sau :
   
   - Collection chỉ chứa document, không có Collection string hay Collection binary.

   - Document không thể chứa document, nhưng nó có thể trỏ tới một subCollection.
        
   - Root của database của bạn chỉ có thể chứa Collections.
       
       Ví dụ về một cấu trúc database của bạn như sau :
       
       ![](https://images.viblo.asia/4beb6c44-7880-4388-a7a1-b328ff806fd7.png)

     
 
## 2. Create and setup a Cloud Firestore

### Cài đặt project

 1. Cài đặt firebase vào project, tham khảo tại [đây](https://viblo.asia/p/firebase-android-overview-3P0lPYL85ox#_4-cai-firebase-vao-project-9) ! 
 2. Trong file *build.gradle* của project, thêm Google's Maven repository trong cả hai khối *buildscript* và *allprojects* .
 3. Thêm thư viện Cloud Firestore vào file *app/build.gradle* : 

```java
implementation 'com.google.firebase:firebase-firestore-ktx:21.6.0'
```

### Build app example

Mình thiết kế một view gồm 2 editText và một button, khi click vào button thì sẽ lưu data ở hai editText này lên Firestore : 

![](https://images.viblo.asia/8e09e246-2ed3-4de4-aa04-358123439c0f.png)

Code như sau : 

```java
private val documentRef = FirebaseFirestore.getInstance().document("sampleData/home")

    private fun setEvent() {
        btnSend.setOnClickListener {
            val dataToSave = HashMap<String, Any>()
            dataToSave["KEY_NAME"] = editTextName.text.toString()
            dataToSave["KEY_ROOM"] = editTextRoom.text.toString()

            documentRef.set(dataToSave)
                .addOnSuccessListener {
                    Log.d("-------->", "FirestoreFragment - initComponent: Add data success!")
                }
                .addOnFailureListener {
                    Log.d("-------->", "FirestoreFragment - initComponent: Add data failure!")
                }
        }
    }
```

Dòng đầu tiên là mình tạo một instance của Firebasestore. Nếu chưa có collection và document thì nó sẽ tự tạo ra trên console với tên tương ứng trong code. Cấu trúc collection và document theo format như sau : 

![](https://images.viblo.asia/4b173297-ecf2-4a9c-a830-efeda3ce1931.png)

Rồi, giờ mình sẽ tạo rule trên console, bạn vào mục Cloud Firestore trên console và click button *Create database*, sau đó nó sẽ mở ra màn hình cài đặt rule để bảo vệ dữ liệu của bạn, các chế độ là production hay test để mình chọn. Production mode hay còn gọi là Locked mode, chế độ này không cho phép bên thứ 3 có thể đọc và viết, thường dùng cho C#, Go, Java, Node.js, PHP, Python, or Ruby server client library. Test mode thì ngược lại, nó cho phép tất cả mọi người có thể đọc và viết vào database, thường được sử dụng bởi web, iOS, hoặc Android SDK.

Xong nhấn button *Next* : 

![](https://images.viblo.asia/aea73cfc-c2d0-481d-a500-7445657cabba.png)

Cứ nhấn next cho đến khi hiển thị màn hình loading tạo database, khi xong nó sẽ là màn hình chính của tab Firestore. Sau khi tạo xong thì để ý tab RULES nhé, mình phải sửa để có quyền update database : 

```java
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  match /sampleData/{anything=**}{
  allow read, write: if true
  }
    match /{document=**} {
      allow read, write: if false
    }
  }
}
```

Xong rồi nhấn button PUBLISH : 

![](https://images.viblo.asia/988fe4b6-86ea-4730-8167-000f1586b7eb.png)

Rồi mình chạy app và xem kết quả trên console : 

![](https://images.viblo.asia/bff6396c-a5e3-4e2e-b1f2-5f2828e3f9fb.png)

Bây giờ mình làm đến phần lấy data từ Firestore về hiển thị trên TextView:

```java
private fun fetchData() {
        documentRef.get()
            .addOnSuccessListener{ documentSnapshot ->
                if (documentSnapshot.exists()) {
                    val name = documentSnapshot.getString(KEY_NAME)
                    val room = documentSnapshot.getString(KEY_ROOM)
                    textFetch.text = "$name-----$room"
                }
            }
            .addOnFailureListener{
                Log.d("-------->", "FirestoreFragment - fetchData: Fail!")
            }
    }
```

Khi chạy app lên và nhấn button Fetch là nó sẽ lấy data từ trên Firestore về : 

![](https://images.viblo.asia/2e62a4f0-5a76-4396-91eb-1a45f174c5d2.png)

Lắng nghe data update realtime về app, đặt trong onStart() để nó lắng nghe :

```java
override fun onStart() {
        super.onStart()
        documentRef.addSnapshotListener { snapshot, e ->
            if (e != null) {
                Log.d("-------->", "FirestoreFragment - Listen fail!")
                return@addSnapshotListener
            }

            if (snapshot != null && snapshot.exists()) {
                val name = snapshot.getString(KEY_NAME)
                val room = snapshot.getString(KEY_ROOM)
                textFetch.text = "$name-----$room"
            } else {
                Log.d("-------->", "FirestoreFragment - Data null!")
            }
        }
    }
```

kết quả : 

![](https://images.viblo.asia/78457c69-05e4-4da3-90a0-c13af90328e3.png)

## Tài liệu tham khảo 

Firebase document : https://firebase.google.com/docs/firestore .