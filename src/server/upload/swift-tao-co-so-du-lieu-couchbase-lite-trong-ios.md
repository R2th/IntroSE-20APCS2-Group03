Bài đăng này chỉ cách bạn bắt đầu với Couchbase Lite trong ứng dụng iOS của bạn.

Couchbase Lite là một cơ sở dữ liệu được nhúng dạng JSON có thể hoạt động độc lập.

## Demo App
Tải xuống Project Demo từ repo Github này. 
Chúng tôi sẽ sử dụng ứng dụng này làm ví dụ trong phần còn lại của blog.
```
git clone git@github.com:couchbaselabs/couchbase-lite-ios-starterapp.git
```

Ứng dụng này sử dụng Cocoapods để tích hợp Couchbase Lite và ứng dụng được thiết kế để làm quen với Couchbase Lite một cách cơ bản nhất. Sau khi tải xuống, build và chạy Ứng dụng. 
Bạn có thể sử dụng ứng dụng này làm điểm bắt đầu và mở rộng ứng dụng theo ý của bạn.

![](https://images.viblo.asia/9960fd6e-e6e0-467f-8f34-de33d726054a.gif)

## Quy trình cơ bản
### Tạo Local Database

Mở DBMainMenuViewController.swift và xem hàm createDBWithName.

Đoạn này sẽ tạo ra một cơ sở dữ liệu với tên được chỉ định trong đường dẫn (/Library/Application Support). 
Bạn có thể chỉ định một thư mục khác cũng được khi bạn khởi tạo lớp CBLManager.
```
do {
    // 1: Tạo Database Options
    let options = CBLDatabaseOptions()
    options.storageType = kCBLSQLiteStorage
    options.create = true
 
     // 2: Tạo một DB nếu nó không tồn tại
     try cbManager.openDatabaseNamed(name.lowercased(), with: options)
}
catch {
// Xử lý error
}
```

1. Tạo đối tượng CBLDatabaseOptions để liên kết với cơ sở dữ liệu. 
Ví dụ, bạn có thể thiết lập key mã hóa để sử dụng với cơ sở dữ liệu của bạn bằng cách sử dụng thuộc tính encryptKey. 
Mọi người có thể khám phá các tùy chọn khác trên lớp CBLDatabaseOptions.

2. Tên cơ sở dữ liệu phải là chữ thường. 
Ứng dụng mẫu sẽ tự động viết tên thường. Nếu thành công, một cơ sở dữ liệu cục bộ mới sẽ được tạo nếu nó không tồn tại. 
Còn nếu nó tồn tại, một đoạn xử lý cho cơ sở dữ liệu hiện có sẽ được trả về.

### Liệt kê các cơ sở dữ liệu

Điều này rất đơn giản. 
Mở tệp DBListTableViewController.swift. 
Thuộc tính allDatabaseNames trên CBLManager liệt kê các cơ sở dữ liệu đã được tạo.

### Thêm một tài liệu mới vào cơ sở dữ liệu

Mở tệp DocListTableViewController.swift và xem hàm createDocWithName.

```
do {
            // 1: Tạo Document với unique ID
            let doc = self.db?.createDocument()
             
            // 2: Xây dựng thuộc tính cho user
            let userProps = [DocumentUserProperties.name.rawValue:name,DocumentUserProperties.overview.rawValue:overview]
           
            // 3: Thêm bản sửa đổi mới với thuộc tính người dùng được chỉ định
            let _ = try doc?.putProperties(userProps)            
        }
        catch  {
         // handle error            
        }

```

1. Document được tạo mới với một ID duy nhất.
2. Bạn có thể chỉ định một tập hợp các thuộc tính người dùng dưới dạng <key:value>. 
Có một sự thay thế trong đó bạn có thể sử dụng đối tượng CBLDocumentModel để chỉ định dữ liệu ứng dụng của bạn. 
CBLDocumentModel chỉ khả dụng cho nền tảng iOS.

### Liệt kê các Document trong cơ sở dữ liệu

Mở tệp DocListTableViewController.swift và xem hàm getAllDocumentForDatabase.
```
do {
      guard let dbName = dbName else {
          return
       }
       // 1. 
       self.db = try cbManager.existingDatabaseNamed(dbName)
            
       // 2. 
       liveQuery = self.db?.createAllDocumentsQuery().asLive()
            
       guard let liveQuery = liveQuery else {
           return
       }
            
       // 3: 
       liveQuery.limit = UInt(UINT32_MAX) // All documents
            
       //   query.postFilter =
            
       //4. 
       self.addLiveQueryObserverAndStartObserving()
            
      // 5: 
      liveQuery.runAsync({ (enumerator, error) in
           switch error {
             case nil:
             // 6: 
             self.docsEnumerator = enumerator                   
           default:    
                }
            })
            
        }
        catch  {
           // handle error
        }
```

1. Xử lý cơ sở dữ liệu với tên được chỉ định

2. Tạo một đối tượng CBLQuery. Truy vấn này được sử dụng để tìm tất cả tài liệu. 
Bạn có thể tạo đối tượng truy vấn thông thường hoặc đối tượng truy vấn "trực tiếp". Đối tượng truy vấn "trực tiếp" thuộc loại CBLLiveQuery tự động làm mới cơ sở dữ liệu mọi lúc.

3. Đối tượng truy vấn có một số thuộc tính có thể được tinh chỉnh để tùy chỉnh kết quả. 
Hãy thử sửa đổi các thuộc tính và thấy hiệu ứng trên các kết quả.

4. Bạn sẽ phải thêm một quan sát vào đối tượng LiveQuery để được thông báo về các thay đổi của cơ sở dữ liệu.
Đừng quên xóa quan sát và ngừng quan sát khi bạn không còn cần đến!

5. Thực thi truy vấn không đồng bộ. Bạn cũng có thể làm điều đó một cách đồng bộ nếu bạn thích, nhưng nên khuyến khích sử dụng không đồng bộ với các tập dữ liệu lớn.

6. Khi truy vấn thực hiện thành công, bạn sẽ nhận được một đối tượng CBLQueryEnumerator. 
Truy vấn cho phép bạn liệt kê các kết quả. Nó như một nguồn dữ liệu cho Table View hiển thị kết quả

### Chỉnh sửa Document hiện có

Mở tệp DocListTableViewController.swift và xem hàm updateDocWithName.
```
do {
       // 1: 
       let doc = self.docAtIndex(index)
  
       // 2: 
       var userProps = [DocumentUserProperties.name.rawValue:name,DocumentUserProperties.overview.rawValue:overview]
            
       // 3: 
      if let revId = doc?.currentRevisionID  {
            userProps["_rev"] = revId
      }
            
      // 4: 
      let savedRev = try doc?.putProperties(userProps)
  }
  catch  {
         // handle error           
   }

 fileprivate func docAtIndex(_ index:Int) -> CBLDocument? {
        // 1. 
        let queryRow = self.docsEnumerator?.row(at: UInt(index))
       
        // 2: 
        let doc = queryRow?.document       
        return doc
 }
```

1. Xử lý tài liệu cần được chỉnh sửa. 
CBLQueryEnumerator có thể được truy vấn để xử lý đến tài liệu tại Index đã chọn

2. Cập nhật thuộc tính người dùng dưới dạng <key:value>. 
Có một sự thay thế là bạn có thể sử dụng đối tượng CBLDocumentModel để chỉ định dữ liệu ứng dụng của bạn. 
Tính năng này chỉ khả dụng trên iOS.

3. Các cập nhật cho tài liệu sẽ yêu cầu một phiên bản sửa đổi để chỉ rõ việc sửa đổi tài liệu cần được cập nhật. 
Điều này được xác định bằng cách sử dụng key "_rev". Điều này là cần thiết để giải quyết xung đột.

### Xóa Document hiện có 

Mở tệp DocListTableViewController.swift và xem hàm deleteDocAtIndex.

```
do {
       // 1: 
       let doc = self.docAtIndex(index)         
             
       // 2: 
       try doc?.delete()
   }
   catch  {
       // Handle error
   }
```

1. Xử lý tài liệu cần được chỉnh sửa. CBLQueryEnumerator có thể được truy vấn để xử lý tài liệu tại Index đã chọn

2. Xóa tài liệu. Thao tác này sẽ xóa tất cả các sửa đổi của tài liệu

### Quan sát các thay đổi của Document trong cơ sở dữ liệu

Mở tệp DocListTableViewController.swift và xem hàm addLiveQueryObserverAndStartObserving

```
   // 1. 
        liveQuery.addObserver(self, forKeyPath: "rows", options: NSKeyValueObservingOptions.new, context: nil)
        
   // 2. 
        liveQuery.start()
```

1. Để được thông báo về những thay đổi đối với cơ sở dữ liệu, ảnh hưởng đến kết quả truy vấn, hãy thêm quan sát vào đối tượng LiveQuery. Đây là trường hợp cho Swift / Obj C khác với các nền tảng di động khác. Nếu bạn đang phát triển trên các nền tảng khác, bạn có thể gọi API addChangeListener trên đối tượng LiveQuery. Tuy nhiên, trong Couchbase Lite 1.4, API này không được hỗ trợ trên nền tảng iOS và thay vào đó chúng tôi sẽ sử dụng mẫu Key-Value-Observer của iOS để được thông báo về các thay đổi. Thêm một quan sát KVO vào đối tượng LiveQuery để bắt đầu quan sát các thay đổi đối với thuộc tính “rows” trên đối tượng truy vấn trực tiếp

2. Bắt đầu quan sát các thay đổi
Bất cứ khi nào có thay đổi đối với cơ sở dữ liệu ảnh hưởng đến thuộc tính "rows" của đối tượng LiveQuery, ứng dụng của bạn sẽ được thông báo về các thay đổi. Khi bạn nhận được thông báo thay đổi, bạn có thể cập nhật giao diện người dùng của mình, trong trường hợp này sẽ tải lại tableView.

```
override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if keyPath == "rows" {
            self.docsEnumerator = self.liveQuery?.rows
            tableView.reloadData()
        }
    }
```

### Xóa cơ sở dữ liệu

Mở tệp DBListTableViewController.swift và xem hàm deleteDatabaseAtIndex.

```
 do {
        // 1.  Get handle to database if exists
        let db = try cbManager.existingDatabaseNamed(dbToDelete)
                    
        // 2. Delete the database
        try db.delete()
                    
        // 3. update local bookkeeping
        self.dbNames?.remove(at: indexPath.row)

        // 4. Update UI
        tableView.deleteRows(at: [indexPath], with: .automatic)
    }
    catch {
         // handle error
     }
```

Việc xóa cơ sở dữ liệu đơn giản chỉ cần gọi lệnh delete().

## Phần kết luận
Như bạn có thể thấy, khá đơn giản để tích hợp Couchbase Lite vào Ứng dụng iOS mới hoặc ứng dụng hiện tại của bạn. 
Bạn có thể tải xuống ứng dụng mẫu từ Github repo và thử khám phá các giao diện khác nhau. 
Cảm ơn bạn đã theo dõi.

Nguồn: https://blog.couchbase.com