### **1. Thiết lập môi trường**

* Xcode 9.0 or later
* iOS 8 or above
* Swift 3.0 or later
* CocoaPods 1.4.0 or later

### **2. Tạo project trên [Fibase Console](https://console.firebase.google.com/u/0/)**

Click Add project

Tạo project name, quốc gia ...

Sau khi tạo xong giao diện console sẽ được hiển thị, bạn chọn tab Storage phía bên trái
Thay đổi Security rules :

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Giờ chúng ta đã có nơi để upload cũng như download file trên firebase

### **3. Thiết lập phía client**

Thêm vào podFile: 

```
pod 'Firebase/Core'
pod 'Firebase/Storage'
```

Set up Cloud Storage:
 trong AppDelegate: 
 
```
import Firebase
// func application:didFinishLaunchingWithOptions:
FirebaseApp.configure()
```

Tạo reference

```
let storage = Storage.storage()
let storageRef = storage.reference()
```

### **4. Upload file to Firebase**
Firebase cung cấp 2 cách để upload: 

> Upload from data in memory

> Upload from a URL representing a file on device

Cách 1: Upload from data in memory

```
let data = Data()
let testRef = storageRef.child("PathToFile")

let uploadTask = testRef.putData(data, metadata: nil) { (metadata, error) in
  guard let metadata = metadata else {
      // TODO
    return
  }
  let size = metadata.size
  storageRef.downloadURL { (url, error) in
    guard let downloadURL = url else {
      // TODO
      return
    }
  }
}
```

Cách 2: 

```
let localFile = URL(string: "pathToFile")!
let testRef = storageRef.child("pathToFile")

let uploadTask = testRef.putFile(from: localFile, metadata: nil) { metadata, error in
  guard let metadata = metadata else {
    // TODO
    return
  }
  let size = metadata.size
  storageRef.downloadURL { (url, error) in
    guard let downloadURL = url else {
    // TODO
      return
    }
  }
}
```

Add file MetaData

```
let testRef = storageRef.child("pathToFile")

// Create file metadata including the content type
let metadata = StorageMetadata()
metadata.contentType = "typeOfFile"

// Upload data and metadata
testRef.putData(data, metadata: metadata)

// Upload file and metadata
testRef.putFile(from: localFile, metadata: metadata)
```

Quản lý việc upload:

```
// Start uploading a file
let uploadTask = storageRef.putFile(from: localFile)

// Pause the upload
uploadTask.pause()

// Resume the upload
uploadTask.resume()

// Cancel the upload
uploadTask.cancel()
```

### **5. Download file from firebase**

Firebase cũng cung cấp cho chúng ta 3 cách để thực hiện download
> Download to NSData in memory

> Download to an NSURL representing a file on device

> Generate an NSURL representing the file online

Cách1 :

```
let testRef = storageRef.child("pathToFile")

// Download in memory with a maximum allowed size of 1MB (1 * 1024 * 1024 bytes)
testRef.getData(maxSize: 1 * 1024 * 1024) { data, error in
  if let error = error {
    // TODO
  } else {
    // TODO
    let image = UIImage(data: data!)
  }
}
```

Cách 2:

```
// Create a reference to the file you want to download
let testRef = storageRef.child("pathToFile")

// Create local filesystem URL
let localURL = URL(string: "path/to/image")!

// Download to the local filesystem
let downloadTask = testRef.write(toFile: localURL) { url, error in
  if let error = error {
    // TODO
  } else {
    // Local file URL for "path/to/image" is returned
  }
}
```

Cách 3:

```
let testRef = storageRef.child("path/to/image")

// Fetch the download URL
testRef.downloadURL { url, error in
  if let error = error {
    // TODO
  } else {
    // Get the download URL for 'path/to/image'
  }
}
```

Quản lý tiến trình download:

```
// Start downloading a file
let downloadTask = storageRef.child("pathToFile").write(toFile: localFile)

// Pause the download
downloadTask.pause()

// Resume the download
downloadTask.resume()

// Cancel the download
downloadTask.cancel()
```

### **6: Kết quả**
Chúng ta đã có thể uplaod và download firebase 1 cách đơn giản và nhanh chóng.

Ngoài ra firebase cũng cung cấp cho chúng ta rất nhiều chức năng thú vị như RealTimeDatabase, Hosting, MLKit, Tracking ...

Hi vọng với firebase chúng ta sẽ có thể tạo được những ứng dụng thú vị và áp dụng được nhiều hơn vào thực tế.

Nguồn: https://console.firebase.google.com/u/0/