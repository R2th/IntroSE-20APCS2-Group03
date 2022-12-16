[Ở bài viết trước](https://viblo.asia/p/dispatch-queue-trong-swift-phan-1-co-ban-ORNZqPRrK0n) mình đã giới thiệu cho các bạn về 1 số khái niệm cơ bản của Dispatch Queue trong GCD, hôm nay mình sẽ tiếp tục đi sâu về 1 số khái niệm khác trong GCD đó là DispatchWorkItem , DispatchGroup và DispatchSemaphore.

**Delay một tác vụ có thể hủy với DispatchWorkItem**

Một quan niệm sai lầm phổ biến về GCD là “ khi bạn lên lịch cho một task thì nó không thể bị hủy, bạn cần sử dụng API Operation cho điều đó “. Mặc dù điều đó là đúng, nhưng kể từ khi ra đời iOS 8 & macOS 10.10, DispatchWorkItem đã được giới thiệu, nó sẽ giải quyết vấn đề khi bạn muốn huỷ 1 task vụ đã được lên lịch sẵn .

Giả Sử rằng UI của chúng ta có một thanh tìm kiếm và khi người dùng nhập một ký tự, chúng ta sẽ thực hiện tìm kiếm bằng cách call tới server . Vì người dùng có thể nhập khá nhanh, chúng ta không muốn bắt đầu yêu cầu mạng của mình ngay lập tức (điều đó có thể lãng phí rất nhiều dữ liệu và dung lượng server), và thay vào đó, chúng tôi sẽ “gỡ bỏ” các sự kiện đó và chỉ thực hiện một yêu cầu một khi người dùng đã gõ sau 0,25 giây

Đây là nơi mà DispatchWorkItem xuất hiện. Bằng cách đóng code request của chúng ta vào một mục công việc, chúng ta có thể dễ dàng hủy bỏ nó bất cứ khi nào nó được thay thế bằng một cái mới, như dưới đây : 

```
class SearchViewController: UIViewController, UISearchBarDelegate {
    // We keep track of the pending work item as a property
    private var pendingRequestWorkItem: DispatchWorkItem?

    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        // Cancel the currently pending item
        pendingRequestWorkItem?.cancel()

        // Wrap our request in a work item
        let requestWorkItem = DispatchWorkItem { [weak self] in
            self?.resultsLoader.loadResults(forQuery: searchText)
        }

        // Save the new work item and execute it after 250 ms
        pendingRequestWorkItem = requestWorkItem
        DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(250),
                                      execute: requestWorkItem)
    }
}
```

Như chúng ta có thể thấy ở trên, sử dụng DispatchWorkItem thực sự đơn giản và đẹp hơn rất nhiều trong Swift so với việc phải sử dụng Timer hoặc Operation, nhờ vào cú pháp  trailing closure và cách GCD hoạt động trong Swift tốt như thế nào. Chúng ta không cần @objc marked methods hay #selector - tất cả đều có thể được thực hiện với closures .

**Phân nhóm và xâu chuỗi các task vụ với Dispatchgroup**

Đôi khi chúng ta cần thực hiện một nhóm các hoạt động trước khi chúng ta có thể tiếp tục với logic của mình. Ví dụ: giả sử, chúng ta cần load dữ liệu từ một nhóm data sources trước khi  tạo model. Thay vì phải tự theo dõi tất cả các nguồn dữ liệu, chúng ta có thể dễ dàng đồng bộ hóa công việc với DispatchGroup.

Sử dụng DispatchGroup cũng cho chúng ta một lợi thế lớn ở chỗ các task vụ của chúng ta có thể chạy đồng thời, trong các hàng đợi riêng biệt. Điều đó cho phép chúng ta bắt đầu đơn giản, và sau đó dễ dàng thêm concurrency sau này nếu cần, mà không phải viết lại bất kỳ task vụ nào của chúng ta. Tất cả những gì chúng ta phải làm là thực hiện các cuộc gọi cân bằng để enter() và  leave() trên một nhóm điều phối để đồng bộ hóa các task vụ của chúng ta.

Hãy cùng xem một ví dụ, trong đó chúng ta load những ghi chú từ bộ nhớ cục bộ, iCloud Drive và bên server, sau đó kết hợp tất cả các kết quả vào một NoteCollection :

```
// First, we create a group to synchronize our tasks
let group = DispatchGroup()

// NoteCollection is a thread-safe collection class for storing notes
let collection = NoteCollection()

// The 'enter' method increments the group's task count…
group.enter()
localDataSource.load { notes in
    collection.add(notes)
    // …while the 'leave' methods decrements it
    group.leave()
}

group.enter()
iCloudDataSource.load { notes in
    collection.add(notes)
    group.leave()
}

group.enter()
backendDataSource.load { notes in
    collection.add(notes)
    group.leave()
}

// This closure will be called when the group's task count reaches 0
group.notify(queue: .main) { [weak self] in
    self?.render(collection)
}
```

Đoạn code trên hoạt động, nhưng nó có rất nhiều sự trùng lặp trong đó. Thay vào đó, hãy thay đổi cấu trúc lại thành một extension trong Array, sử dụng giao thức DataSource làm ràng buộc cùng loại cho kiểu Element của nó :

```
extension Array where Element == DataSource {
    func load(completionHandler: @escaping (NoteCollection) -> Void) {
        let group = DispatchGroup()
        let collection = NoteCollection()

        // De-duplicate the synchronization code by using a loop
        for dataSource in self {
            group.enter()
            dataSource.load { notes in
                collection.add(notes)
                group.leave()
            }
        }

        group.notify(queue: .main) {
            completionHandler(collection)
        }
    }
}
```

Với extension ở trên, giờ đây chúng ta có thể giảm tải code trước đây của mình như dưới đây :

```
let dataSources: [DataSource] = [
    localDataSource,
    iCloudDataSource,
    backendDataSource
]

dataSources.load { [weak self] collection in
    self?.render(collection)
}
```

Code trông rất đẹp và gọn! 👍

**Chờ các task vụ bất đồng bộ với DispatchSemaphore**

Trong khi Dispatchgroup cung cấp những điểm mạnh và dễ dàng để đồng bộ hóa một nhóm các hoạt động bất đồng bộ trong khi bản thân nó cũng là bất đồng bộ, thì DispatchSemaphore cung cấp một cách để chờ đồng bộ một nhóm các tác vụ không đồng bộ. Điều này rất hữu ích trong các công cụ command line  hoặc scripts, nơi chúng ta không có vòng lặp chạy ứng dụng và thay vào đó chỉ thực hiện đồng bộ trong global context cho đến khi hoàn tất.

Giống như Dispatchgroup, API semaphore rất đơn giản ở chỗ chúng ta chỉ tăng hoặc giảm một bộ đếm nội bộ, bằng cách gọi Wait() hoặc signal(). Gọi Wait() trước signal() sẽ chặn hàng đợi hiện tại cho đến khi nhận được tín hiệu.

Hãy cùng nhau tạo ra một quá tải khác trong extension của chúng  trên Array từ trước đó, nó sẽ trả về NoteCollection một cách đồng bộ hoặc nếu không thì sẽ xảy ra lỗi. Chúng tôi sẽ sử dụng lại mã dựa trên Dispatchgroup của chúng ta từ trước, nhưng chỉ cần phối hợp tác vụ đó bằng cách sử dụng một semaphore.

```
extension Array where Element == DataSource {
    func load() throws -> NoteCollection {
        let semaphore = DispatchSemaphore(value: 0)
        var loadedCollection: NoteCollection?

        // We create a new queue to do our work on, since calling wait() on
        // the semaphore will cause it to block the current queue
        let loadingQueue = DispatchQueue.global()

        loadingQueue.async {
            // We extend 'load' to perform its work on a specific queue
            self.load(onQueue: loadingQueue) { collection in
                loadedCollection = collection

                // Once we're done, we signal the semaphore to unblock its queue
                semaphore.signal()
            }
        }

        // Wait with a timeout of 5 seconds
        semaphore.wait(timeout: .now() + 5)

        guard let collection = loadedCollection else {
            throw NoteLoadingError.timedOut
        }

        return collection
    }
}
```

Sử dụng phương thức mới bên trên trong Array, giờ đây chúng ta có thể tải ghi chú một cách đồng bộ trong một script  hoặc command line tools  như dưới đây :

```
let dataSources: [DataSource] = [
    localDataSource,
    iCloudDataSource,
    backendDataSource
]

do {
    let collection = try dataSources.load()
    output(collection)
} catch {
    output(error)
}
```

**Kết Luận** : Grand Central Dispatch là framework thực sự mạnh mẽ, làm được nhiều hơn so với những gì nó có thể làm lúc mới ra xuất hiện. Hy vọng rằng loạt bài này đã khơi dậy trí tưởng tượng của bạn về những gì bạn có thể sử dụng nó và tôi khuyên bạn nên thử nó vào lần tới khi bạn cần thực hiện một trong những task vụ mà chúng tôi đã xem trong bài đăng này .

Cảm ơn bạn đã theo dõi bài viết của mình , hẹn gặp bạn trong bài viết tới <3