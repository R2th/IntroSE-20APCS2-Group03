Đã bao giờ trong quá trình phát triển App của mình, bạn cảm thấy ngại ngần vì việc phải xây dựng backend server chỉ cho việc lưu trữ dữ liệu, vừa tốn kém chi phí và effort không cần thiết.
Vậy thì còn chần chờ gì nữa mà không bỏ túi ngay cho mình kỹ năng sử dụng Firebase Firestore để tích hợp vào app của mình, 

# Add thư viện Firebase
Đầu tiên, bạn cần tạo một account Firebase tại firebase.google.com , sau đó truy cập vào dashboard và tạo một project mới.

Sau đó truy cập vào Project overview, chọn Add app -> iOS .

Ở mục Add Firebase to your iOS app, bạn lần lượt làm theo các bước được hướng dẫn để add file Google analytics vào project 

![](https://images.viblo.asia/f1ceb75a-dded-4212-a1cd-67969dae4b09.png)

Sau khi đã add được Firebase vào project của mình, chúng ta thực hiện thêm Firebase Firestore:
- Thêm pod Firestore và install: 
```
pod 'Firebase/Firestore'

# Optionally, include the Swift extensions if you're using Swift.
pod 'FirebaseFirestoreSwift'
```

Như vậy lúc muốn sử dụng Firestore bạn chỉ cần init như sau: 

```
import Firebase

let db = Firestore.firestore()
```

# Thêm data

Cloud Firestore lưu trữ dữ liệu trong các Document, được lưu trữ trong Collection. Cloud Firestore tạo collection và document một cách ngầm định vào lần đầu tiên bạn thêm dữ liệu vào document. Bạn không cần phải tạo document hoặc collection một cách rõ ràng.
Ví dụ:
```
// Add a new document with a generated ID
var ref: DocumentReference? = nil
ref = db.collection("users").addDocument(data: [
    "first": "Ada",
    "last": "Lovelace",
    "born": 1815
]) { err in
    if let err = err {
        print("Error adding document: \(err)")
    } else {
        print("Document added with ID: \(ref!.documentID)")
    }
}
```

Một document có thể chứa nhiều set dữ liệu, ví dụ như bây giờ bạn có thể tạo một user khác: 

```
// Add a second document with a generated ID.
ref = db.collection("users").addDocument(data: [
    "first": "Alan",
    "middle": "Mathison",
    "last": "Turing",
    "born": 1912
]) { err in
    if let err = err {
        print("Error adding document: \(err)")
    } else {
        print("Document added with ID: \(ref!.documentID)")
    }
}
```

# Đọc data
Việc đọc data từ Firestore cũng là rất đơn giản, bạn chỉ cần làm theo như sau: 

```
db.collection("users").getDocuments() { (querySnapshot, err) in
    if let err = err {
        print("Error getting documents: \(err)")
    } else {
        for document in querySnapshot!.documents {
            print("\(document.documentID) => \(document.data())")
        }
    }
}
```

Như vậy là với một ít thời gian tích hợp và tìm hiểu về kiểu dữ liệu NoSql bạn đã có thể sử dụng Firebase Firestore để lưu trữ dữ liệu cho app của mình, tiết kiệm được kha khá chi phí cho việc phát triển app.
Chúc bạn code vui vẻ!