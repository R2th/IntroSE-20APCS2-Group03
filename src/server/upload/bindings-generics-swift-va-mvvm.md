Ở bài viết này mình sẽ trình bày ví dụ đơn giản cơ chế binding bằng việc thực thi observer pattern sử dụng Swift generics và closures.
```
class DynamicString {
  var value: String
 
  init(_ v: String) {
    value = v
  }
}
```

Đây gọi là wrapping hoặc boxing của một object. Nó giúp chúng ta có thể control đối tượng. Chúng ta có thể control với property observers, cho phép ngăn chặn thay đổi giá trị của thuộc tính, như sau: 
```
class DynamicString {
  var value: String {
    didSet {
      println("did set value to \(value)")
    }
  }
  
  init(_ v: String) {
    value = v
  }
}
```

Một vài kết quả của hàm didSet như sau:
```
let name = DynamicString("Steve")   // does not print anything
println(name.value)  // prints: Steve
name.value = "Tim"   // prints: did set value to Tim
println(name.value)  // prints: Tim
```

Bạn có thể nhìn thấy, việc gán giá trị mới cho thuộc tính value (triggers property observer) sẽ in ra giá trị đó. Thay vì in ra giá trị mới, chúng ta sẽ sử dụng property observer để thông báo cho các bên quan tâm, tạm gọi là listeners. Trong MVVM, một listener có thể là một view controller, nó lắng nghe sự thay đổi từ ViewModel để có thể cập nhật views cho phù hợp. Một listener sẽ muốn observe nhiều property, chúng ta sẽ định nghĩa listener bằng một closure, argument là một String:
```
class DynamicString {
  typealias Listener = String -> Void
  var listener: Listener?

  func bind(listener: Listener?) {
    self.listener = listener
  }

  var value: String {
    didSet {
      listener?(value)
    }
  }
  
  init(_ v: String) {
    value = v
  }
}
```

Chúng ta đã sử dụng typealias để giới thiệu một type mới - Listener, là một closure có argument là một Strong, không trả về gì cả. Khai báo mọt property listener có kiểu Listener, là một Optional. Tiếp theo chusnt ta tạo một hàm setter cho thuộc tính listener. Cuối cùng, chúng ta thay đổi property observer để gọi closure listener nếu nó được set. Hãy xem ví dụ bên dưới:
```
let name = DynamicString("Steve")

name.bind({
  value in
  println(value)
})

name.value = "Tim"  // prints: Tim
name.value = "Groot" // prints: Groot
```

Mỗi lần chúng ta set giá trị mới có thuộc tính value, listener được kích hoạt và in ra giá trị đó. Swfit tự động cung cấp các tên tham số viết tắt cho closure, chúng ta có thể sử dụng $0, $1, $2, .... thay thế cho các argument. Áp dụng chúng ta có: 
```
name.bind {
  println($0)
}
```

Thay vì in ra giá trị mới, chúng ta có thể update text cho label như sau: 
```
let name = DynamicString("Steve")
let nameLabel = UILabel()

name.bind {
  nameLabel.text = $0
}

println(nameLabel.text)  // prints: nil

name.value = "Tim"
println(nameLabel.text)  // prints: Tim

name.value = "Groot"
println(nameLabel.text)  // prints: Groot
```
Như bạn đã nhìn thấy, text của label chỉ thay đổi khi giá trị của thuộc tính value thay đổi, vậy còn lần đầu tiên thì sao?. Chú ý răng hàm bind chỉ set listener. Hãy xem hàm sau:

```
class DynamicString {
  ...
  func bindAndFire(listener: Listener?) {
    self.listener = listener
    listener?(value)
  }
  ...
}
```

Sử dụng hàm bindAndFire thay hàm bind, kết quả như sau:

```
...
name.bindAndFire {
  nameLabel.text = $0
}

println(nameLabel.text)  // prints: Steve
...
```

Mở rộng hơn, chúng ta sử dụng một tính năng mạnh mẽ của Swfit - Generics:

```
class Dynamic<T> {
  typealias Listener = T -> Void
  var listener: Listener?
  
  func bind(listener: Listener?) {
    self.listener = listener
  }
  
  func bindAndFire(listener: Listener?) {
    self.listener = listener
    listener?(value)
  }

  var value: T {
    didSet {
      listener?(value)
    }
  }
  
  init(_ v: T) {
    value = v
  }
}
```

Đổi tên class DynamicString thành Dynamic, đánh dấu nó là lớp chung bằng cách gắn <T> vào tên của nó và thay thế tất cả các lần xuất hiện của String bằng T. Bây giờ kiểu Dynamic có thể wrap bất kỳ kiểu nào và mở rộng nó bằng cơ chế listener. Ví dụ:

```
let name = Dynamic<String>("Steve")
let alive = Dynamic<Bool>(false)
let products = Dynamic<[String]>(["Macintosh", "iPod", "iPhone"])
```

Chúng ta có thể viết dễ hiểu hơn như sau: 

```
let name = Dynamic("Steve")
let alive = Dynamic(false)
let products = Dynamic(["Macintosh", "iPod", "iPhone"])
```

```
products.bindAndFire {
  println("First product is \($0.first)")
}
```

Đó là cơ chế binding, nó đơn giản như mạnh mẽ.

Ví dụ trong mô hình MVVM như sau: 
```
protocol ArticleViewViewModel {
  var title: Dynamic<String> { get }
  var body: Dynamic<String> { get }
  var date: Dynamic<String> { get }
  var thumbnail: Dynamic<UIImage?> { get }
}
```

```
class ArticleViewViewModelFromArticle: ArticleViewViewModel {
  let article: Article
  let title: Dynamic<String>
  let body: Dynamic<String>
  let date: Dynamic<String>
  let thumbnail: Dynamic<UIImage?>
  
  init(_ article: Article) {
    self.article = article
    
    self.title = Dynamic(article.title)
    self.body = Dynamic(article.body)
    
    let dateFormatter = NSDateFormatter()
    dateFormatter.dateStyle = NSDateFormatterStyle.ShortStyle
    self.date = Dynamic(dateFormatter.stringFromDate(article.date))
    
    self.thumbnail = Dynamic(nil)
    
    let downloadTask = NSURLSession.sharedSession()
                                   .downloadTaskWithURL(article.thumbnail) {
      [weak self] location, response, error in
      if let data = NSData(contentsOfURL: location) {
        if let image = UIImage(data: data) {
          self?.thumbnail.value = image
        }
      }
    }
    
    downloadTask.resume()
  }
}
```
 Nhìn vào đoạn code trên, chúng ta thấy rằng tất cả các thuộc tính được định nghĩa là let. Lisener được thông báo khi giá trị của Dynamic thay đổi, không phải khi Dynamic tự thay đổi. Có nghĩa là chúng ta phải tạo một hàm khởi tạo.
 Trong view controller:
 ```
 class ArticleViewController {
  var bodyTextView: UITextView
  var titleLabel: UILabel
  var dateLabel: UILabel
  var thumbnailImageView: UIImageView
  
  var viewModel: ArticleViewViewModel {
    didSet {
      viewModel.title.bindAndFire {
        [unowned self] in
        self.titleLabel.text = $0
      }
      
      viewModel.body.bindAndFire {
        [unowned self] in
        self.bodyTextView.text = $0
      }
      
      viewModel.date.bindAndFire {
        [unowned self] in
        self.dateLabel.text = $0
      }
      
      viewModel.thumbnail.bindAndFire {
        [unowned self] in
        self.thumbnailImageView.image = $0
      }
    }
  }
}
 ```