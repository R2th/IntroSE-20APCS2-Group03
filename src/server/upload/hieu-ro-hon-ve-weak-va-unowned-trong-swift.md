Mặc dù Automatic Reference Counting (ARC) đã giải quyết cho chúng ta khá nhiều vấn đề về việc quản lí bộ nhớ , nhưng đôi khi chúng ta vẫn cần phải quản lí các references khi chúng ta không làm việc với các value types ( kiểu tham trị )

Khi nói về quản lí bộ nhớ , thì chắc hẳn tất cả những ai đã từng code swift đều đã được nghe đến 2 từ khoá weak và unowned 

Việc dùng weak và unowned trong swift sẽ rất dễ gây nhầm lẫn không chỉ riêng những bạn mới học swift , mà kể cả những bạn đã có kinh nghiệm đôi khi cũng hay nhầm lẫn về 2 cách dùng này .

Trong Swift, chúng ta cần sử dụng weak và unowned để cung cấp cho ARC thông tin cần thiết giữa các mối quan hệ trong code của chúng ta. Việc không sử dụng weak hoặc unowned về cơ bản là bạn nói với ARC rằng cần phải có một tham chiếu mạnh ( strong reference ) nhất định và bạn có thể ngăn chặn số lượng tham chiếu về không. Việc không sử dụng đúng các từ khóa này, chúng ta có thể gây rò rỉ bộ nhớ trong ứng dụng của chúng ta . Cái gọi là Strong Reference Cycles hoặc Retain Cycles cũng có thể xảy ra nếu weak và unowned không được sử dụng đúng cách .

> Lưu ý : Reference counting chỉ áp dụng cho các instances của classes ( nôm na là kiểu tham chiếu ). Structures và enumerations là kiểu value types ( kiểu tham trị ) vì thế sẽ không phải lo vấn đề về Reference counting 

**Khi nào dùng Weak ?**

Trước hết , tham chiếu weak luôn được khai báo là các biến kiểu optional vì chúng có thể tự động set là nil bởi ARC khi tham chiếu của nó bị ngắt . Hai class sau sẽ giải thích cho chúng ta khi nào dùng tham chiếu weak .

```
class Blog {
    let name: String
    let url: URL
    var owner: Blogger?

    init(name: String, url: URL) { self.name = name; self.url = url }

    deinit {
        print("Blog \(name) is being deinitialized")
    }
}

class Blogger {
    let name: String
    var blog: Blog?

    init(name: String) { self.name = name }

    deinit {
        print("Blogger \(name) is being deinitialized")
    }
}
```

Khi một class được giải phóng một message sẽ đươc in ra . Đoạn code ví dụ sau đây chúng ta đã định nghĩa hai instances là optional khi việc set chúng bằng nil . Mặc dù một số bạn có thể kỳ vọng sẽ chạy hai câu lệnh print , nhưng nó đã ko xảy ra :

```
var blog: Blog? = Blog(name: "SwiftLee", url: URL(string: "www.google.com")!)
var blogger: Blogger? = Blogger(name: "Antoine van der Lee")

blog!.owner = blogger
blogger!.blog = blog

blog = nil
blogger = nil

// Nothing is printed
```

Đây là kết quả của Retain Cycle. Chúng ta cần đưa ra một tham chiếu weak. Trong ví dụ này, chỉ cần một tham chiếu weak vì điều này sẽ phá vỡ vòng lặp. Ví dụ: chúng tôi có thể đặt tham chiếu yếu từ blog đến chủ sở hữu của nó :

```
class Blog {
    let name: String
    let url: URL
    weak var owner: Blogger?

    init(name: String, url: URL) { self.name = name; self.url = url }

    deinit {
        print("Blog \(name) is being deinitialized")
    }
}

class Blogger {
    let name: String
    var blog: Blog?

    init(name: String) { self.name = name }

    deinit {
        print("Blogger \(name) is being deinitialized")
    }
}

var blog: Blog? = Blog(name: "SwiftLee", url: URL(string: "www.avanderlee.com")!)
var blogger: Blogger? = Blogger(name: "Antoine van der Lee")

blog!.owner = blogger
blogger!.blog = blog

blog = nil
blogger = nil

// Blogger Antoine van der Lee is being deinitialized
// Blog SwiftLee is being deinitialized
```

> Lưu ý: Khi mặc định khai báo bạn để là weak có thể bạn sẽ phải làm việc với optionals trong rất nhiều trường hợp đôi khi nó thực sự không cần thiết .

**Khi nào sử dụng unowned self ?**

Không giống như tham chiếu weak, một tham chiếu không phải dạng optional khi sử dụng unowned. Tuy nhiên, cả unowned  và weak không tạo ra strong reference .

Trích dẫn từ tài liệu của Apple :

> Sử dụng tham chiếu weak bất cứ khi nào nó hợp lệ để tham chiếu đó trở thành nil tại một thời điểm nào đó trong suốt vòng đời của nó. Ngược lại, sử dụng tham chiếu unowned khi bạn biết rằng tham chiếu đó *chắc chắn* sẽ không bao giờ là nil khi nó được set trong quá trình khởi tạo .

Nói chung, phải cẩn thận khi sử dụng unowned. Có thể là bạn đang truy cập vào một instance không còn ở đó nữa, nó sẽ gây ra crash. Lợi ích duy nhất của việc sử dụng unowned so với weak là bạn không phải đối phó với optionals. Túm lại, sử dụng weak luôn an toàn hơn trong mọi tình huống .

**weak và unowned chỉ sử dụng với self trong closures phải ko ?**

Không.  chắc chắn không. Bạn có thể chỉ ra bất kỳ thuộc tính hoặc khai báo biến weak hay unowned miễn nó là kiểu tham chiếu. Do đó, điều này cũng có thể làm việc :

```
download(imageURL, completion: { [weak imageViewController] result in
    // ...
})
```

Và bạn thậm chí có thể tham chiếu nhiều instance vì về cơ bản nó là một mảng :

```
download(imageURL, completion: { [weak imageViewController, weak imageFinalizer] result in
    // ...
})
```

***Kết luận :***
> Nhìn chung, nó là một chủ đề khá khó để hiểu. Tốt nhất là bạn nên bắt đầu với việc đọc tài liệu Swift để hiểu sâu hơn về chủ đề này. Ngoài ra, nếu bạn không chắc chắn, hãy sử dụng weak hơn unowned. Nó có thể cứu bạn khỏi những lỗi phức tạp .

Cảm ơn bạn đã theo dõi bài viết của mình , hẹn gặp lại bạn trong bài viết tiếp theo !