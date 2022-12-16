## Introduction
Bài viết này nằm trong chuỗi bài viết về kĩ thuật Callbacks trong **Cocoa**, so sánh và chuẩn hoá chúng. Nếu bạn đã quen thuộc với các khái niệm **Closure**, **Target-Action** và **Responder chain** bạn có thể bỏ qua phần giới thiệu mà đi thẳng và ưu/nhược điểm của mỗi phần.

[Callbacks, Part 1: Delegation, NotificationCenter, and KVO](https://viblo.asia/p/callbacks-trong-ung-dung-ios-phan-1-delegate-notificationcenter-and-kvo-Ljy5V2Qb5ra)
[Callbacks, Part 3: Promise, Event, and Stream (Functional Reactive Programming)]()

## Closure(Block)
Mặc dù chuỗi bài viết này được gọi là **Callbacks in Cocoa**, từ **callback** được sử dụng như là một từ đồng nghĩa với **Closure(hay Block)**.
Closure hay Block là hai cái tên về cùng một đối tượng được sử dụng trong Swift và Objective-C một cách tương đối.

Trong tài liệu có nói: "Closure là các khối chức năng tự được đóng gói" cái có thể được truyền đi....

Nếu bạn suy nghĩ về nó, các đối tượng thông thường của bất cứ class nào cũng là những khối tính năng được tự đóng gói cái có thể được truyền đi dựa trên tham chiếu, nhưng Closure vẫn có những đặc điểm của riêng nó.

Giống như các objects, một Closure có liên kết với các tính năng(functionality), nó là một số mã nguồn thực thi, cũng như Closure có thể nắm bắt các biến và tương tác với chúng như là một đối tượng đối đãi với các biến của nó.

Khác biệt chính đó là các tính năng của một đối tượng được khai báo bởi lớp triển khai của nó, cái là một cấu trúc độc lập, nhưng với Closure, chúng ta viết quá trình triển khai của nó tại nơi nó được sử dụng, nơi mà nó được truyền tại bất cứ đâu như là một tham số.

Mặc dù một Closure mang đặc điểm của một đối tượng, nhưng ở một mức độ lớn hơn, nó là một function. Bởi vì function này được khai báo mà không liên quan tới một loại, nó cũng được gọi là **[anonymous function](https://en.wikipedia.org/wiki/Anonymous_function)**.

Các thức dễ dàng nhất để hiểu về khái niệm là xem ví dụ, và nếu chúng ta giải quyết vấn đề Pizzeria trong bài viết trước, chúng ta có thể có đoạn mã bên dưới:

```
// The Closure type can be pre-defined, and since it's an anonymous function, its declaration
// looks like a function signature. In our case - a void function that takes a Pizza
typealias PizzaClosure = (Pizza) -> Void

class Pizzaiolo {

  // "An instance" of the PizzaClosure can be treated just as an object
  private var completion: PizzaClosure?

  // PizzaClosure will be passed in as a parameter
  func makePizza(completion: PizzaClosure) {
    // Save the 'completion' to be able to call it later
    self.completion = completion
    // Cooking the pizza
    ...
  }
  
  private func onPizzaIsReady(pizza: Pizza) {
    // Calling the closure in order to "deliver" the pizza
    self.completion?(pizza)
    self.completion = nil
  }
}

class Customer {

  func askPizzaioloToMakeAPizza(pizzaiolo: Pizzaiolo) {
    // We declare the body of the closure in a place where it is passed as an input parameter
    pizzaiolo.makePizza(completion: { pizza in
      // We're inside the closure! And we've got the pizza!
      // This code gets executed when pizzaiolo calls the closure we passed to him
    })
  }
}
```

### Advantages of using Closure(Block)
* Giảm thiểu ràng buộc([Loose coupling](https://en.wikipedia.org/wiki/Loose_coupling)) - Cả đối tượng gọi và đối tượng lắng nghe đồng ý chữ kí duy nhất của closure, cái có ràng buộc yếu nhất về tên gọi.
* Sự gắn kết cao về business logic - tương tác và phản hồi với những tương tác có thể được khai báo ở cùng một vị trí.
* Quá trình bắt các biến từ phía client giúp quản lý trạng thái bởi vì chúng ta không cần lưu các biến trong lớp và đối mặt với các vấn đề về khả năng truy cập, như là [race condition](https://en.wikipedia.org/wiki/Race_condition).
* Closures nhanh như là gọi một function thông thường.
* Giống như với **delegation**, Closure có thể trả về loại khác void, do đó nó cũng có thể được sử dụng như là một **DataSource** cho quá trình yêu cầu dữ liệu từ client code.
* Là một loại an toàn hoàn toàn(Full type safety). Sử dụng mã nguồn tĩnh để phân tích, IDE có thể kiểm tra chữ kí của closure và xác nhận các tham số truyền vào nó.

### Disadvantages of using Closure(Block)
* Closures và blocks có cú pháp khá phức tạp.
* Đối với những người lần đầu đến với khác niệm [anonymous function](https://en.wikipedia.org/wiki/Anonymous_function)(hoặc [lambda](https://stackoverflow.com/questions/16501/what-is-a-lambda-function)) là khó hiểu hơn hầu hết các cấu trúc của imperative programming.
* Bởi vì Swift và Objective-C sử dụng cơ chế quản lý bộ nhớ [automatic reference counting]((https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html), closures có thể gây ra [memory leaks](https://en.wikipedia.org/wiki/Memory_leak) khi đó chúng được gọi là [retain cycle](https://stackoverflow.com/questions/24042949/block-retain-cycles-in-swift). Chúng ta sẽ luôn phải cẩn thận khi sử dụng Closures và sử dụng **[weak ...]** modificator trong các trường hợp nơi mà các quá trình bắt giữ theo chu kì diễn ra.
* Khi sử dụng như các callbacks cho các hoạt động bất đồng bộ, trong thực tế, mã nguồn của client giá trị trả về thường xuyên có thể được đặt trong một số callbacks khác, cái được gọi là [pyramid of doom - Kim tự tháp diệt vong](https://en.wikipedia.org/wiki/Pyramid_of_doom_(programming)), điều này gây ra sự khó đọc hiểu và hỗ trợ trong team. Hơn nữa, khi luồng code bên trong callbacks được rẽ nhanh(**if - else)** kích thước của khối chóp sẽ tăng lên nhanh chóng.
* Các tham số của closure hay block không thể có các nhãn tham số. Do đó, client code nên được gán tên cho mỗi tham số, cái có thể dẫn tới một sự hiểu sai về các tham số sau bị chỉnh sửa/tái cấu trúc lại chữ kí của closure.
* **Objective-C** blocks nên được kiểm tra **NULL** trước khi được gọi, nếu không ứng dụng sẽ bị crash.

## Target - Action(NSInvocation)
Target-Action bản thân nó là một mô hình thiết kế(design pattern), nhưng về mặt khái niệm, nó là một sự biến hoá của **command**. Một cách truyền thống kĩ thuật callbacks này được sử dụng  trong Cocoa nhằm xử lý các tương tác của người dùng với UI nhưng không hạn chế cho các trường hợp sử dụng ở đây.

Client Code cung cấp 2 tham số để nhận được một callback trong tương lai - một object và một function. Trong ngữ cảnh này, đối tượng là **target** còn function là **action**.

Callback được hoàn thành bằng cách gọi phương thức **action** trên đối tượng **target**.

Nó không phải là một trường hợp đơn giản đối với ngôn ngữ lập trình khi một đối tượng và function của nó được cung cấp một cách riêng rẽ, do đó kĩ thuật này đòi hỏi sự hỗ trợ từ bản thân ngôn ngữ.

Ví dụ, Swift không cho phép chúng ta thực hiện một số chiêu trò trong quá trình gọi một phương thức chuyên biệt cho một đối tượng chuyên biệt, do đó chúng ta cần gọi tới Objectvie-C nếu bạn muốn đạt được điều gì đó tương tự trong một Swift Project.

Nói cách khác, có một vài cách thức chúng ta có thể thực hiện **action** trong **target** trong Objective-C. Trong ví dụ này, Tôi đang sử dụng **NSInvocation**, cái phù hợp nhất với mong muốn của chúng ta.

Quá trình triển khai để xử lý vấn đề **Pizzeria** với target-action sẽ như sau:

```
@interface Pizzaiolo : NSObject

// The target and the action are sent separately
- (void)makePizzaForTarget:(id)target selector:(SEL)selector;

@end

@interface Customer: NSObject

- (void)askPizzaioloToMakePizza:(Pizzaiolo *)pizzaiolo;

@end

// ------ 

@implementation Pizzaiolo

- (void)makePizzaForTarget:(id)target selector:(SEL)selector
{
  NSInvocation *invocation = [self invocationForTarget:target selector:selector];
  // Storing the reference to the invocation object to be used later
  self.invocation = invocation;

  // making pizza
  ...
}

- (void)onPizzaIsReady:(Pizza *)pizza
{
  // Argument indices start from 2, because indices 0 and 1 indicate the hidden arguments self and _cmd
  if (self.invocation.methodSignature.numberOfArguments > 2) {
    [self.invocation setArgument:&pizza atIndex:2];
  }
  [self.invocation invoke];
}

// A helper method that constructs NSInvocation for given target and action
- (NSInvocation *)invocationForTarget:(id)target selector:(SEL)selector
{
  NSMethodSignature *signature = [target methodSignatureForSelector:selector];
  if (signature == nil) return nil;
  NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
  invocation.target = target;
  invocation.selector = selector;
  return invocation;
}

@end

@implementation Customer

- (void)askPizzaioloToMakePizza:(Pizzaiolo *)pizzaiolo
{
  [pizzaiolo makePizzaForTarget:self selector:@selector(takePizza:)];
}

- (void)takePizza:(Pizza *)pizza
{
  // Yeah! Objective "pizza" completed
}

@end
```

### Advantages of using Target - Action
* Ở một số khía cạnh **target-action** là tương đồng với **delegation**, nhưng có hai lợi thế tuyệt vời hơn:
    * Tên của phương thức callback là không được định nghĩa trước và nó được cung cấp bởi mã nguồn của client. Điều này phân tách sự ràng buộc giữa caller và callee một cách tuyệt vời.
    * Nó hỗ trợ nhiều đối tượng nhận với các phương thức độc lập được gọi cho từng trường hợp.
 * **NSInvocation** cung cấp cách thức để lấy các kết quả khác **void** của lời gọi, do đó kĩ thuật này có thể sử dụng cho việc lấy dữ liệu(nhưng tôi sẽ không khuyến nghị thực hiện nó - xem thêm phần nhược điểm).
 * Bộ phân tích mã nguồn tĩnh có khả năng thực hiện việc kiểm tra một cách nông nhất tên phương thức được cung cấp như là **action**. Nó không thể nói rằng **target** thực sự triển khai **action**.

### Disadvantages of using Target - Action
* Cấu trúc phức tạp. Đối với target-action chúng ta cần tự triển khai mọi thứ:
    * Cấu trúc **NSInvocation** đúng cách.
    * Quản lý tập hợp các **NSInvocation** để hỗ trợ nhiều **targets** cũng như **actions**.
* Trình biên dịch không thể kiểm tra rằng đối thượng nhận có xử lý **selector** mà nó cung cấp như một **action** hay không. Điều này thường xuyên dẫn tới crahs trong lúc thực thi sau khi mã nguồn được tái cấu trúc một cách không có chủ ý.
* **NSInvocation** không tự động loại bỏ các tham chiếu **null** tới **target** cái đã được huỷ bỏ, do đó ứng dụng có thể crash lúc thực thi khi các callbacks được kích hoạt. Do đó mọi **target** cần được loại bỏ một cách rõ ràng khỏi **target-action** của chính nó.
* Đối với mã nguồn phía client, nó là không rõ ràng đối với chữ kí của phương thức mà **action** nên có(có bao nhiêu tham số và loại gì). Quá trình truyền qua lại các tham số là khá dễ sinh ra lỗi. Điều tương tự cũng xảy ra với loại dữ liệu được trả về. Bộ phân tích mã nguồn tĩnh không thể cảnh báo về bất cứ loại khác biệt nào.
* Chia sẻ vấn đề với **delegate** về việc phân chia business logic(liên kết yếu - low cohesion) và làm cồng kệnh các view controller.

## Responder chain
Mặc dù **responder chain** là mô hình chính của **UIKit**. Ban đầu được thiết kế cho việc phân phát các sự kiện chạm, cử động đầu vào giữa view và view controller, nó chắc chắn có thể được sử dụng như là một kĩ thuật callback và trong một số trường hợp là một sự thay thế tuyệt vời cho **delegation**.

Trong lõi của **responder chain** là một ứng dụng đẹp về mô hình thiết kế **[chain of responsibility](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern)**. Quyền trung tâp trong responder chain được đặt trong lớp **UIResponder**.

Trong Cocoa hầu hết các lớp liên quan tới UI là lớp con trực tiếp hoặc gián tiếp của lớp **UIResponder**, do đó **responder chain** thực sự xâm nhập vào trong ứng dụng, bao gồm mọi view trên màn hình, view controllers của chúng và ngay cả chính **UIApplication**.

Một tính năng tuyệt vời của **responder chain** đó là nó được duy trì một cách tự động trừ khi nhà phát triển muốn triển khai một **UIResponder** tuỳ chỉnh(cái chúng ta không thể biết trước khi nào cần đến).

Do đó, giả sử bạn có kiến trúc view không quá phức tạp:

**UIApplication** - **UIWindow** - **ViewController A** - **ViewController** - **View** - **SubView B**.

**Responder chain** cho phép **Subview B** gửi một thông điệp tới **ViewController A** một cách dễ dàng. **ViewController A** nên là người đầu tiên trong chuỗi triển khai **selector** cái mà **Subview B** đang gửi đi. Và nếu không cái nào bao gồm cả **UIApplication** có thể xử lý **selector** - Nó được huỷ bỏ và ứng dụng không crash.

Không phải mọi **UIResponder** có thể gửi đi một thông điệp trong luồng - Trong Cocoa, chỉ có 2 lớp có thể thực hiện nó là **UIControl** và **UIApplication**, và **UIControl** trong thực tế sử dụng các API của UIApplication để thực hiện nó.

Nó có thể gửi các **actions** thay cho **UIControl**....

```
let control = UIButton()
// UIControl should be added to the view hierarchy
view.addSubview(control)
control.sendAction(#selector(handleAction(sender:)), to: nil, for: nil)
```

... nhưng thông thường bạn nên sử dụng **UIApplication**.

```
// Triggering callback with UIApplication

UIApplication.shared.sendAction(#selector(handleAction(sender:)), to: nil, from: self, for: nil)
```

Như được viết trong tài liệu, nếu chúng ta cung cấp một đối tượng **UIResponder** không **nil** trong tham số **from**(Ở đây có thể là view hoặc view controller hiện tại của chúng ta), **responder chain** sẽ bắt đầu quá trình duyệt chuỗi từ phần tử này, ngược lại, khi tham số **from** là **nil**, quá trình duyệt chuỗi sẽ bắt đầu từ phần tử(**responder**) đầu tiên.

Đối với nhu cầu gọi lại thông qua một vài lớp của các view controller con lồng nhau, chúng ta nên chỉ rõ tham số **from**, bởi vì **responder** đầu tiên là không nhất thiết thuộc về kiến trúc view con của chúng ta.

### Advantages of using Responder chain
* Được hỗ trợ bởi mọi UIView và UIViewController trong dự án.
* Responder chain được quản lý tự động khi kiến trúc view thay đổi.
* Được hỗ trợ một cách tự nhiên bởi **Interface Builder** - không cần phải viết mã nguồn ở tất cả những nơi bạn chọi nhằm truyền action từ một **UIControl** tới **sponder** đầu tiên trong chuỗi.
* Action được truyền đi một cách an toàn, tránh crash. Nếu khôgn có sponder nhận ở bước tiếp theo thì quá trình xử lý action cũng không có bất cứ điều tồi tệ gì xảy ra.
* Thỉnh thoảng, đây là cách thức dễ nhất để lắng nghe một view, hoặc view controller cái cư trú sâu trong kiến trúc view. Thông thường, bạn cần chuyển callback thông qua tất cả các view controllers bằng tay với một chuỗi các delegates, và điều này có nghĩa với các lớp tuỳ biến chõ mỗi UIViewController và UIView trên chuỗi. Kĩ thuật này thực sự giúp chúng ta không phải viết rất nhiều mã nguồn.

### Disadvantages of using Responder chain
* Responder chain chỉ là con của **UIResponder**. Các đối tượng của các lớp chuyên biệt không được hỗ trợ.
* Bạn không thể gửi bất cứ dữ liệu nào hữu ích với **action**. Các tham số cho action được định nghĩa trước bởi **sender: Any** và **event: UIEvent?**.
* Nó là không thể nhận một kết quả không void(non-void) của một lời gọi.
* Responder chain là một kênh đơn giản([simplex-channel](https://en.wikipedia.org/wiki/Simplex_communication)) và bạn không thể chọn một cách trực tiếp.
* Giống như bất cứ quá trình binding nào từ Interface Builder, kết nối có thể bị phá vỡ bởi vì bạn tái cấu trúc lại mã nguồn của mình. có một số công cụ([tools](https://github.com/fastred/IBAnalyzer)) có thể giúp bạn xác định các trạng thái không chính xác.
* NÓ khá khó hiểu cho người mới bắt đầu bởi vì họ phải sử dụng **responder chain** khá phức tạp cho rất nhiều thứ đơn giản như hiển thị keyboard trên màn hình của iOS.

## Source
#### https://nalexn.github.io/callbacks-part-2-closure-target-action-responder-chain/

## Reference
#### [1. Guide to KVO in Swift 5 with code examples](https://nalexn.github.io/kvo-guide-for-key-value-observing/)
#### [2. KVO Considered Harmful](https://khanlou.com/2013/12/kvo-considered-harmful/)
#### [3. Callbacks trong ứng dụng iOS, Phần 1: Delegate, NotificationCenter, and KVO](https://viblo.asia/p/callbacks-trong-ung-dung-ios-phan-1-delegate-notificationcenter-and-kvo-Ljy5V2Qb5ra)

## VIII. P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))