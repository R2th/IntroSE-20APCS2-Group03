## Tìm hiểu về  Operations và OperationQueues trong Swift
> Operations trong Swift là một cách mạnh mẽ để phân tách trách nhiệm đối với một số lớp trong khi theo dõi tiến trình và sự phụ thuộc của chúng. Chúng chính thức được gọi là **NSOperations** và được sử dụng kết hợp với **OperationQueue**.

Trước tiên các bạn hãy xem qua bài viết của mình về [concurrency trong Swift](https://viblo.asia/p/grand-central-dispatch-gcd-va-ung-dung-Do7544re5M6), để bạn có thể hiểu được những điều cơ bản về **Queues**(hàng đợi) và **Dispatch**(điều phối). **Operations** có rất nhiều điểm chung với các khối **Dispatch** nhưng đi kèm với một vài lợi ích hơn. Hãy cùng tìm hiểu sâu hơn về chúng nào :grin:

### 1. Operations trong swift là gì ?

**Operations** thường chịu trách nhiệm cho một nhiệm vụ đồng bộ duy nhất. Nó là một class trừu tượng và không bao giờ được sử dụng trực tiếp. Bạn có thể sử dụng subclass **`BlockOperation`** do hệ thống xác định hoặc bằng cách tạo subclass của riêng bạn. Bạn có thể bắt đầu một **Operation** bằng cách thêm nó vào một **OperationQueue** hoặc bằng cách gọi thủ công phương thức start. Tuy nhiên, nó rất khuyến khích giao toàn bộ trách nhiệm cho **OperationQueue** để quản lý.

Việc sử dụng **BlockOperation** do hệ thống xác định sẽ như sau:
```
let blockOperation = BlockOperation {
    print("Executing!")
}

let queue = OperationQueue()
queue.addOperation(blockOperation)
```

Và cũng có thể được thực hiện bằng cách thêm trực tiếp block vào hàng đợi:
```
queue.addOperation {
  print("Executing!")
}
```
Tác vụ đã cho sẽ được thêm vào **`OperationQueue`** và sẽ bắt đầu thực thi sớm nhất có thể.

### 2. Tạo một Operation tuỳ chỉnh 

Bạn tạo sự tách biệt mối quan tâm với các operation tùy chỉnh. Ví dụ, bạn có thể tạo một triển khai tùy chỉnh để nhập nội dung và một nội dung khác để tải lên nội dung.

Ví dụ về đoạn code sau đây cho thấy một subclass tùy chỉnh để nhập nội dung:
```
final class ContentImportOperation: Operation {

    let itemProvider: NSItemProvider

    init(itemProvider: NSItemProvider) {
        self.itemProvider = itemProvider
        super.init()
    }

    override func main() {
        guard !isCancelled else { return }
        print("Importing content..")
        
        // .. import the content using the item provider

    }
}
```

Class là một ItemProvider và nhập nội dung trong phương thức chính. Hàm **`main ()`** là phương thức duy nhất bạn cần ghi đè cho các hoạt động đồng bộ. Thêm Operation vào hàng đợi và thiết lập một blockCompletion để theo dõi việc hoàn thành:

```
let fileURL = URL(fileURLWithPath: "..")
let contentImportOperation = ContentImportOperation(itemProvider: NSItemProvider(contentsOf: fileURL)!)

contentImportOperation.completionBlock = {
    print("Importing completed!")
}

queue.addOperation(contentImportOperation)

// Prints:
// Importing content..
// Importing completed!
```

Việc di chuyển tất cả logic này của bạn để nhập nội dung vào một lớp duy nhất mà bạn có thể theo dõi tiến trình, việc hoàn thành và bạn có thể dễ dàng viết các tests cho nó!

### 3. Các trạng thái khác nhau của một Operation 
Một Operation có thể ở một số trạng thái, tùy thuộc vào trạng thái thực hiện hiện tại của nó.

* **Ready:** Nó chuẩn bị bắt đầu
* **Executing:** Tác vụ hiện đang chạy
* **Finished:** Khi quá trình hoàn thành 
* **Canceled:** Tác vụ đã huỷ 

Điều quan trọng là phải biết rằng một **Operation** chỉ có thể thực hiện một lần. Bất cứ khi nào nó ở trạng thái **Finished** hoặc **Canceled**, bạn không thể khởi động lại cùng một thể hiện.

Trong triển khai tùy chỉnh, bạn cần kiểm tra thủ công trạng thái **Canceled** trước khi thực hiện để đảm bảo một tác vụ hủy bỏ.

**`OperationQueue`** sẽ tự động loại bỏ tác vụ khỏi hàng đợi của nó sau khi hoàn thành, điều này xảy ra cả sau khi thực hiện hoặc hủy bỏ.

### 4. Sử dụng các dependencies

Một lợi ích của việc sử dụng các Operation là việc sử dụng các dependencies Bạn có thể dễ dàng thêm một dependency giữa hai thể hiện. Ví dụ: để bắt đầu tải lên sau khi nội dung được nhập:

```
let fileURL = URL(fileURLWithPath: "..")
let contentImportOperation = ContentImportOperation(itemProvider: NSItemProvider(contentsOf: fileURL)!)
contentImportOperation.completionBlock = {
    print("Importing completed!")
}

let contentUploadOperation = UploadContentOperation()
contentUploadOperation.addDependency(contentImportOperation)
contentUploadOperation.completionBlock = {
    print("Uploading completed!")
}

queue.addOperations([contentImportOperation, contentUploadOperation], waitUntilFinished: true)

// Prints:
// Importing content..
// Uploading content..
// Importing completed!
// Uploading completed!
```

Việc tải lên sẽ chỉ bắt đầu sau khi nhập nội dung kết thúc. Điều đó có nghĩa là nếu thao tác nhập bị hủy, quá trình tải lên vẫn sẽ bắt đầu. Bạn phải thực hiện kiểm tra để xem liệu các dependencies đã bị hủy hay chưa:

```
final class UploadContentOperation: Operation {
    override func main() {
        guard !dependencies.contains(where: { $0.isCancelled }), !isCancelled else {
            return
        }

        print("Uploading content..")
    }
}
```

### 5. Kết luận

Mình mong rằng bạn đã cảm thấy phấn khích khi bắt đầu triển khai các **Operations**  trong Swift. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn!

Vậy là bài viết của mình đến đây là hết 😁. Mong rằng bài viết của mình sẽ giúp các bạn áp dụng được vào project

Cảm ơn các bạn đã theo dõi bài viết. 😃