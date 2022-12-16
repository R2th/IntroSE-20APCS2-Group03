Tìm hiểu làm thế nào để thực hiện các HTTP requests and parse của response sử dụng dạng mới Combine framework với foundation networking.

### API & data structure

Trước hết chúng ta sẽ cần một số loại API để kết nối,  tôi sẽ sử dụng dịch vụ [JSONPlaceholder](https://jsonplaceholder.typicode.com/) với các mô hình dữ liệu sau:

```
enum HTTPError: LocalizedError {
    case statusCode
    case post
}

struct Post: Codable {

    let id: Int
    let title: String
    let body: String
    let userId: Int
}

struct Todo: Codable {

    let id: Int
    let title: String
    let completed: Bool
    let userId: Int
}
```

Không có gì đặc biệt , chỉ một số yếu tố Codable cơ bản, và một lỗi đơn giản, chúng tôi muốn thể hiện một số lỗi nếu có điều gì thất bại. ❌


### The traditional way

<br>

Làm một HTTP request trong Swift là khá dễ dàng, bạn có thể sử dụng được built-in  trong [URLSession](https://developer.apple.com/documentation/foundation/urlsession) chia sẻ với một nhiệm vụ dữ liệu đơn giản, và có response của bạn. Tất nhiên bạn có thể muốn kiểm tra mã trạng thái hợp lệ và nếu mọi thứ đều tốt, bạn có thể phân tích cú pháp JSON response của bạn bằng cách sử dụng các đối tượng [JSONDecoder](https://developer.apple.com/documentation/foundation/jsondecoder) từ Foundation.

```
//somewhere in viewDidLoad
let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

let task = URLSession.shared.dataTask(with: url) { data, response, error in
    if let error = error {
        fatalError("Error: \(error.localizedDescription)")
    }
    guard let response = response as? HTTPURLResponse, response.statusCode == 200 else {
        fatalError("Error: invalid HTTP response code")
    }
    guard let data = data else {
        fatalError("Error: missing response data")
    }

    do {
        let decoder = JSONDecoder()
        let posts = try decoder.decode([Post].self, from: data)
        print(posts.map { $0.title })
    }
    catch {
        print("Error: \(error.localizedDescription)")
    }
}
task.resume()
```

### Data tasks and the Combine framework

<br>

Bây giờ như bạn sẽ nhìn thấy traditional "block-based" cách tiếp cận này là tốt, nhưng chúng ta có thể làm một cái gì đó có lẽ tốt hơn ở đây? Bạn biết đấy, như mô tả toàn bộ điều như một chuỗi, giống như chúng tôi đã từng làm điều này với Promises? Bắt đầu từ iOS13 với sự giúp đỡ của các [Combine framework](https://developer.apple.com/documentation/combine) bạn thực sự có thể đi xa hơn thế nữa! 😃

> My favorite part of Combine is memory management & cancellation.

### Data task with Combine

<br>

Vì vậy, các ví dụ phổ biến nhất thường là:

```
private var cancellable: AnyCancellable?
//...
self.cancellable = URLSession.shared.dataTaskPublisher(for: url)
.map { $0.data }
.decode(type: [Post].self, decoder: JSONDecoder())
.replaceError(with: [])
.eraseToAnyPublisher()
.sink(receiveValue: { posts in
    print(posts.count)
})
//...
self.cancellable?.cancel()
```

* Đầu tiên chúng ta tạo ra một cancellable cho Publisher của bạn
* Sau đó, chúng tôi tạo ra một brand task dữ liệu mới đối tượng publisher
* Map responseg, chúng ta chỉ quan tâm đến phần dữ liệu (bỏ qua lỗi)
* Giải mã nội dung của dữ liệu bằng JSONDecoder
* Nếu bất cứ điều gì sai, chỉ cần đi với một mảng trống
* Xoá bỏ sự phức tạp tiềm ẩn đến một AnyPublisher đơn giản
* Sử dụng sink để hiển thị một số thông tin về giá trị cuối cùng
* Tùy chọn: bạn có thể hủy bỏ yêu cầu network của bạn bất cứ lúc nào

### Error handling

<br>

Hãy giới thiệu một số xử lý lỗi, bởi vì tôi không thích ý tưởng hiding errors. Đó là tốt hơn rất nhiều để trình bày một cảnh báo với các thông báo lỗi thực tế, phải không? 🤔

```
enum HTTPError: LocalizedError {
    case statusCode
}

self.cancellable = URLSession.shared.dataTaskPublisher(for: url)
.tryMap { output in
    guard let response = output.response as? HTTPURLResponse, response.statusCode == 200 else {
        throw HTTPError.statusCode
    }
    return output.data
}
.decode(type: [Post].self, decoder: JSONDecoder())
.eraseToAnyPublisher()
.sink(receiveCompletion: { completion in
    switch completion {
    case .finished:
        break
    case .failure(let error):
        fatalError(error.localizedDescription)
    }
}, receiveValue: { posts in
    print(posts.count)
})
```

Tóm lại, lần này chúng tôi kiểm tra mã phản hồi và nếu họ gặp khó khăn chúng ta ném ra một lỗi. Bây giờ, vì publisher có thể dẫn đến một trạng thái lỗi, sink có một biến thể, nơi bạn có thể kiểm tra kết quả của toàn bộ hoạt động, do đó bạn có thể làm lỗi của riêng bạn thingy ở đó, như hiển thị một cảnh báo. 🚨

### Assign result to property

<br>

Một mô hình phổ biến là để lưu trữ các phản ứng trong một đâu đó biến nội bộ trong bộ điều khiển xem. Bạn chỉ có thể làm điều này bằng cách sử dụng chức năng assign.
```
class ViewController: UIViewController {

    private var cancellable: AnyCancellable?

    private var posts: [Post] = [] {
        didSet {
            print("posts --> \(self.posts.count)")
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

        self.cancellable = URLSession.shared.dataTaskPublisher(for: url)
        .map { $0.data }
        .decode(type: [Post].self, decoder: JSONDecoder())
        .replaceError(with: [])
        .eraseToAnyPublisher()
        .assign(to: \.posts, on: self)
    }
}
```

Rất dễ dàng, bạn cũng có thể sử dụng các **didSet** để nhận được thông báo về những thay đổi.

### Group multiple requests

<br>

Gửi nhiều yêu cầu là một điều đã từng là khó khăn. Bây giờ chúng ta có Compose và nhiệm vụ này chỉ là ridiculously dễ dàng với **Publishers.Zip**. Bạn có nghĩa là có thể kết hợp nhiều yêu cầu togeter và chờ đợi cho đến khi cả hai đã kết thúc. 🤐

```
let url1 = URL(string: "https://jsonplaceholder.typicode.com/posts")!
let url2 = URL(string: "https://jsonplaceholder.typicode.com/todos")!

let publisher1 = URLSession.shared.dataTaskPublisher(for: url1)
.map { $0.data }
.decode(type: [Post].self, decoder: JSONDecoder())

let publisher2 = URLSession.shared.dataTaskPublisher(for: url2)
.map { $0.data }
.decode(type: [Todo].self, decoder: JSONDecoder())

self.cancellable = Publishers.Zip(publisher1, publisher2)
.eraseToAnyPublisher()
.catch { _ in
    Just(([], []))
}
.sink(receiveValue: { posts, todos in
    print(posts.count)
    print(todos.count)
})
```

### Request dependency

<br>

Đôi khi bạn phải tải một tài nguyên từ một URL nhất định, và sau đó sử dụng để mở rộng đối tượng với cái gì khác. Tôi đang nói về yêu cầu phụ thuộc, mà là khá nhiều vấn đề mà không Combine, nhưng bây giờ bạn có thể chuỗi hai HTTP gọi nhau chỉ với một vài dòng code Swift sau đây:

```
override func viewDidLoad() {
    super.viewDidLoad()

    let url1 = URL(string: "https://jsonplaceholder.typicode.com/posts")!

    self.cancellable = URLSession.shared.dataTaskPublisher(for: url1)
    .map { $0.data }
    .decode(type: [Post].self, decoder: JSONDecoder())
    .tryMap { posts in
        guard let id = posts.first?.id else {
            throw HTTPError.post
        }
        return id
    }
    .flatMap { id in
        return self.details(for: id)
    }
    .sink(receiveCompletion: { completion in

    }) { post in
        print(post.title)
    }
}

func details(for id: Int) -> AnyPublisher<Post, Error> {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts/\(id)")!
    return URLSession.shared.dataTaskPublisher(for: url)
        .mapError { $0 as Error }
        .map { $0.data }
        .decode(type: Post.self, decoder: JSONDecoder())
        .eraseToAnyPublisher()
}
```


Bí quyết ở đây là bạn có thể **flatMap** một publisher thành khác.

### Conclusion

<br>

Combine là một framework tuyệt vời, nó có thể làm rất nhiều, nhưng nó chắc chắn có một số  learning curve. Đáng buồn là bạn chỉ có thể sử dụng nó nếu bạn đang nhắm mục tiêu iOS13 hoặc cao hơn nên suy nghĩ trước khi áp dụng công nghệ mới này.

Bạn cũng nên lưu ý rằng hiện nay (b6) không có upload / downloadTaskPublisher, có lẽ trong một phiên bản beta seed sau chúng ta sẽ thấy một cái gì đó như thế. 🤞

Cám ơn các bạn đã quan tâm tới bài viết, [bài viết này được dịch theo bài viết cùng tên của tác giả **Tibor Bödecs**](https://theswiftdev.com/2019/08/15/urlsession-and-the-combine-framework/).