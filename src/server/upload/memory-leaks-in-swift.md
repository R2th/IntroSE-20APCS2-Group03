![](https://cdn-images-1.medium.com/max/2000/1*7ISuh6UwWtqCmfzSUpyUBw.png)

Trong bài viết này chúng ta sẽ nói về rò rỉ bộ nhớ (memory leaks). Đây là một đoạn trích:

```
describe("MyViewController"){
    describe("init") {
        it("must not leak"){
            let vc = LeakTest{
                return MyViewController()
            }
            expect(vc).toNot(leak())
        }
    }
}
```

**Quan trọng**: Tôi sẽ giải thích *Memory leaks* là gì, nói về retain cycle và một vài điều liên quan. Phần cuối sẽ giới thiệu về một số phương pháp để phát hiện leaks. Một số phương pháp cụ thể sẽ được giới thiệu ở các bài viết sau.

# Memory Leaks

Sự thật, đây luôn mà vấn đề mà mọi developer phải đối mặt. Chúng ta code các tính năng và phát triển ứng dụng, và sau đó chúng ta tạo ra *menory leaks*. Vậy *Memory leak*  là gì?
Một *Memory leak* là một phần bộ nhớ bị chiếm vĩnh viễn và không thể sử dụng lại được nữa. Chúng là rác, chúng chiếm lĩnh các khoảng trống và chúng gây ra rất nhiều vẫn đề.
> Bộ nhớ được cấp phát tại một thời điểm nào đó nhưng không bao giờ được giải phóng và không được ứng dụng tham chiếu đến đó nữa. Vì không còn tham chiếu đến nó, nên sẽ chẳng thể nào giải phóng nó và bộ nhớ sẽ không được sử dụng lại nữa.
[Apple Docs](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/CommonMemoryProblems.html)

Tất cả chúng ta đều tạo ra leaks ở một vài thời điểm, dù là junior hay senior developer, có kinh nghiệm hay không. Điều quan trọng nhất là loại bỏ chúng để có một ứng dụng sạch sẽ, không bị sự cố. Tại sao ư? Bởi vì chúng rất nguy hiểm.

# Leaks are dangerous

Không chỉ làm tăng dung lương bộ nhớ của ứng dụng, chúng còn gây nên các hiệu ứng phụ và crashes.
Vậy tại sao bộ nhớ bị tăng lên? Chúng là hậu quả của các objects không được giải phóng. Nhưng objects này đều là rác. Khi các thao tác tạo ra nhưng đối tượng này được lặp lại, bộ nhớ chiếm đóng sẽ tăng lên. Quá nhiều rác, điều này sẽ dẫn đến memory warnings, và cuối cùng ứng dụng sẽ bị crashes.

Giải thích các tác dụng phụ không mong muốn cần đòi hỏi một chút chi tiết hơn.
Hãy tưởng tượng một **object** bắt đầu lắng nghe thông báo khi nó được tạo bên trong **init**. Nó phản ứng, lưu mọi thứ vào cơ sở dữ liệu, phát video hoặc đăng sự kiện lên một công cụ phân tích. Vì đối tượng cần sự cân bằng, chúng ta làm cho nó dừng nghe thông báo khi nó được giải phóng, bên trong deinit.

Điều gì xảy ra nếu một **object** như vậy bị leaks?
Nó sẽ không bao giờ chết và không bao giờ dừng nghe thông báo. Môi khi có thông báo, đối tượng sẽ có phản ứng. Nếu người dùng lặp lại hành động tạo ra đối tượng như trên, sẽ có nhiều trường hợp còn sống. Tất cả nhưng trường hợp đó sẽ có phản ứng khi nhân được thông báo và sẽ đè lên nhau.

Trong trường hợp như vậy, Crash có thể là một điều tốt nhất xảy ra

Nhiều leak objects sẽ phản ứng với app notification, thay đổi cơ sở giữ liệu, thay đổi giao diện người dùng, làm hỏng toàn bộ trạng thái ứng dụng. Bạn có thể đọc thêm độ nghiêm trọng của nhưng vấn đề này trong “Dead programs tell no lies” [The Pragmatic Programmer.](https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer)

Leaks sẽ mang đến một trải nghiệm xấu và nhận đánh giá không tôt về ứng dụng

# Where do Leaks come from?

Leak có thể đến từ SDK hoặc framework của bên thứ 3 chẳng hạn. Hoặc có thể đến từ chính Apple như CALayer hay UILabel. Trong những trường hợp đó, chung ta chẳng thể làm được gì ngoài việc chờ bản cập nhật hoặc phải huỷ SDK đó đi.
Nhưng nhiều khả năng leaks là trong chính source code của các bạn. Một trong nhưng lý do đó là retain cycle.
Để tranh leak, chúng ta cần phải hiểu về quản lý bộ nhớ và retain cycle.

# Retain Cycles

Từ **Retain** xuất phát từ **Reference counting** trong **Objective-C**. Trước ARC và Swift và tất cả những điều tốt đẹp chúng ta có thể làm bây giờ với các kiểu giá trị, Đó là Objective-C và MRC. Bạn có thể đọc về MRC và ARC trong [bài viết này](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html)
Trở lại thời điểm đó, chúng ta cần biết một chút về xử lý bộ nhớ. Hiểu được ý nghĩa của *alloc, copy, retain*  và sự cân bằng trong các actions.
Nguyên tắc cơ bản đó là: Bất kỳ khi nào bạn tạo ra một **Object**, bạn sở hữu ít và bạn phải có trách nhiệm giải phóng nó.
Bây giờ mọi thứ trở nên dễ dàng hơn nhiều, nhưng vẫn còn, có một số khái niệm cần được học.

Trong Swift, khi một đối tượng có một liên kết mạnh mẽ với một đối tượng khác, nó sẽ giữ lại nó **(retain)**. Khi đó đối tượng tôi đang nói về các loại tham chiếu, Reference Types, Classes. 

Struct và Enum là value type. Không thể tạo ra retain cyle với value type. Khi capturing và strore sẽ không những thứ như tham chiếu. Các giá trị được sao chép, chứ không phải là tham chiếu, mặc dù giá trị có thể giữ tham chiếu đến các đối tượng.
Khi một object tham chiếu đến một object thứ hai, nó sẽ sở hữu. Object thứ hai sẽ vẫn còn sống cho đến khi nó được giải phóng. Điều này được gọi là **Strong reference**. Chỉ khi bạn đặt thuộc tính là **nil** thì object thứ hai sẽ bị hủy.

```
class Server {
}

class Client {
    var server : Server //Strong association to a Server instance
    
    init (server : Server) {
        self.server = server
    }
}
```

Nếu A retain B và B retain A thì sẽ có một retain cycle

A 👉 B + A 👈 B = 🌀

```
class Server {
    var clients : [Client] //Because this reference is strong
    
    func add(client:Client){
        self.clients.append(client)
    }
}

class Client {
    var server : Server //And this one is also strong
    
    init (server : Server) {
        self.server = server
        
        self.server.add(client:self) //This line creates a Retain Cycle -> Leak!
    }
}
```

Trong ví dụ này, sẽ không thể giải phóng cả client và sever

Để được giải phóng khỏi bộ nhớ, một object trước hết phải giải phóng tất cả các phụ thuộc của nó. Vì chính object là một sự phụ thuộc, nó không thể được giải phóng. Một lần nữa, khi một object có retain cycle, nó không thể chết.
Các **retain cycle** bị phá vỡ khi một trong các tham chiếu trong cycle là **week** hoặc **unowned**. Cycle phải tồn tại bởi vì nó được yêu cầu bởi bản chất của associations chúng ta code. Một trong số chúng phải yếu.

```
class Server {
    var clients : [Client] 
    
    func add(client:Client){
        self.clients.append(client)
    }
}

class Client {
    weak var server : Server! //This one is weak
    
    init (server : Server) {
        self.server = server
        
        self.server.add(client:self) //Now there is no retain cycle
    }
}
```

# How to break retain cycles

> Swift cung cấp hai cách để giải quyết các **strong reference cycles** khi bạn làm việc với các thuộc tính của kiểu **Class**: weak references và unowned references.
weak references và unowned references cho phép một cá thể trong một retain cycle tham chiếu đến cá thể khác mà không giữ một lưu giữ mạnh mẽ trên nó. Các trường hợp sau đó có thể tham chiếu với nhau mà không tạo strong reference cycle.
[Apple’s Swift Programming Language](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID48)

**Week**: Một biến có thể tùy ý không sở hữu một đối tượng mà nó tham chiếu đến. Một weak reference là khi một biến không sở hữu một đối tượng. Một weak reference có thể là nil.

**Unowned**: Giống như weak references, một Unowned không giữ một liên kết mạnh. Tuy nhiên, không giống như weak reference, Unowned được giả thiết là luôn luôn có một giá trị. Bởi vì điều này, Unowned luôn được định nghĩa là một kiểu không bắt buộc. Unowned không thể là nil.

```
class Parent {
    var child : Child
    var friend : Friend
    
    init (friend: Friend) {
        self.child = Child()
        self.friend = friend
    }
    
    func doSomething() {
        self.child.doSomething( onComplete: { [unowned self] in  
              //The child dies with the parent, so, when the child calls onComplete, the Parent will be alive
              self.mustBeAlive() 
        })
        
        self.friend.doSomething( onComplete: { [weak self] in
            // The friend might outlive the Parent. The Parent might die and later the friend calls onComplete.
              self?.mightNotBeAlive()
        })
    }
}
```

Không phải là hiếm để quên một week self một nơi nào đó trong code. Chúng ta thường gây ra leak khi viết block closures. Hoặc khi chúng ta viết observers và delegate.

# How to eliminate Memory Leaks?

1. Đừng tạo ra chúng. Có một sự hiểu biết mạnh mẽ về quản lý bộ nhớ. Có một code style mạnh cho dự án và tôn trọng nó. Sự thiếu vắng của week self sẽ được chú ý, code reviews có thể giúp cho điều này.
2. Sử dụng [SwiftLint](https://github.com/realm/SwiftLint). Một tool rất tuyệt sẽ giúp bạn giữ code-style và rule 1.
3. Phát hiện leaks khi runtime. [LifetimeTracker](https://github.com/krzysztofzablocki/LifetimeTracker) great tool for runtime
4.Profile app thường xuyên. The [memory analysis tools](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/CommonMemoryProblems.html) là các tool tuyệt với đi kèm với Xcode. Xem [bài viết này](https://useyourloaf.com/blog/xcode-visual-memory-debugger/) để học cách sử dụng 
5. Unit Test Leaks với [SpecLeaks](https://cocoapods.org/pods/SpecLeaks). Pod này sử dụng Quick và Nimble và cho phép bạn dễ dàng tạo các kiểm tra cho leaks. Bạn có thể đọc về nó trong phần sau.

[Refer](https://medium.com/flawless-app-stories/memory-leaks-in-swift-bfd5f95f3a74)