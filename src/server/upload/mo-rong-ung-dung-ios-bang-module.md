Đã bao giờ dự án của bạn phải đối mặt với việc phải nhanh chóng mở rộng số lượng member để phát triển hàng loạt những tính năng mới? Lúc này, tầm quan trọng của cách thức tổ chức, cấu trúc ứng dụng sẽ được thể hiện rất rõ, một dự án có dễ dàng được mở rộng hay không sẽ phụ thuộc rất nhiều vào những nền móng ban đầu trong việc cấu trúc ứng dụng đó.
Trong bài viết này, tác giả Nebil Kriedi sẽ giúp chúng ta cách thức xây dựng kiến trúc ứng dụng để dễ dàng mở rộng, bảo trì và test.

## Tổng quan
Dưới đây là mô hình cấu trúc code mà chúng ta thường gặp.

![](https://images.viblo.asia/34ca70e7-3b6f-4468-ae4a-cb472c572c13.png)

Ở thời điểm mới bắt đầu, chúng ta thông thường sẽ chỉ cần thực hiện một vài tính năng đơn giản, do đó việc cấu trúc codebase như trên dường như không gặp phải trở ngại nào. Tuy nhiên, bạn có thể dễ dàng nhận ra, với cách tiếp cận này, bất cứ tính năng mới nào được thêm vào giữa hàng trăm thứ hỗn độn, không phân chia ranh giới rõ ràng như UI, API, Data,... sẽ là một sự đau đầu rất lớn.
Kết quả tất yếu là lượng bugs, crash và những cơn đau đầu sẽ tăng theo bởi những tác dụng phụ khó đoán trước, mà chủ yếu là do ảnh hưởng đến từ việc phát triển số lượng dev và nhu cầu phát triển tính năng mới tăng cao.
Nếu bạn đã từng làm việc trong một công ty phát triển nhanh chóng thì điều này có vẻ sẽ rất quen thuộc.

## Cách thức khởi tạo
Để tránh mọi thứ trở nên tồi tệ theo thời gian, chúng tôi quyết định tập trung vào việc tạo ranh giới rõ ràng giữa các thành phần chính của code base. Vì vậy chúng tôi quyết định tuân theo cấu trúc truyền thống, chia tách layers.

![](https://images.viblo.asia/80329562-78f6-4ad6-8608-c71450e0b2b6.png)

Mỗi một hộp đại diện cho 1 Xcode Project được thêm vào workspace, và chứa 1 dynamic framework. Target chính của ứng dụng vẫn được đặt bên trong "old features" project và nhúng tất cả các frameworks khác vào đó.
* Blue layer: bao gồm những thành phần UI cho tất cả các tính năng (hầu hết là view controllers) và styling logic và được sử dụng bởi tất cả các features.
* Green layer: bao gồm non-UI logic như DB và API. Tất cả các layers cao hơn đều có thể truy cập trực tiếp đến nó.
* Yellow layer: bao gồm những utility methods and functions, hoàn toàn độc lập về logic với tất cả các features khác và vì vậy được chia sẻ trên toàn bộ codebase.

Chúng tôi bắt đầu nhận ra những lợi ích ngay lập tức, đặc biệt là cho tất cả các tính năng mới, trên thực tế dẫn đến việc ổn định và mạnh mẽ hơn.
Thật không may, sau đó chúng tôi nhận ra rằng cách tiếp cận này chỉ giúp chúng tôi tiết kiệm thời gian và trên thực tế, các lớp này bắt đầu phát triển thành các khối lớn như ban đầu.

## Giải pháp

![](https://images.viblo.asia/6a8c8622-65b3-4f09-8f8e-236586ae076f.png)

* Khối lớn UI layer giờ sẽ được chia thành nhiều module khác nhau, theo các domain của chúng.
* Core Service và Core UI bao gồm những components bậc thấp và chúng được chia sẻ tới tất cả module (API clients, fonts, colors,...)
* Bây giờ mọi module chỉ liên kết các phụ thuộc mà nó yêu cầu như pre-built dynamic frameworks.

Điều này cho chúng tôi sự ổn định hơn nhiều bất cứ khi nào chúng tôi thêm một tính năng mới và nó cũng cho phép chúng tôi thử nghiệm các design patterns mới một cách an toàn.
Chúng tôi cũng giảm đáng kể nguy cơ tạo xung đột khi các Pull request được merged, vì mỗi nhà phát triển sẽ có khả năng làm việc trong một domain duy nhất.
Còn thời gian build thì sao? Cách tiếp cận mà chúng tôi thực hiện rất đơn giản: chúng tôi chỉ build những gì thay đổi, chúng tôi chỉ chạy thử nghiệm những gì cần thiết. Và điều này có thể là nhờ Carthage, đã cung cấp cơ chế caching dễ dàng cho các third party.
Phần còn lại của bài viết sẽ tập trung vào việc áp dụng cách tiếp cận trên vào thực tế với module Chat. Chúng tôi cũng sẽ giải thích chúng tôi đã tiếp cận như nào để tích hợp nó khi mở rộng.

## Module là gì?

Theo định nghĩa về Modular Programming từ Wikipedia:

> Lập trình module là một kỹ thuật thiết kế phần mềm, nhấn mạnh việc tách chức năng của chương trình thành các module độc lập, có thể hoán đổi cho nhau, sao cho mỗi phần chứa mọi thứ cần thiết để chỉ thực hiện một khía cạnh của chức năng mong muốn.

Đối với chúng tôi, một module chứa code thuộc cùng một miền chức năng. Ở đây, nó trông như thế nào:

![](https://images.viblo.asia/b8892ef8-1709-4e1f-8bc7-8fdcfeee0ee2.png)

Tất cả code, resources cần thiết cho mỗi chức năng sẽ được đặt trong 1 framework, bao gồm cả unit tests.
Hầu hết các triển khai chi tiết này sẽ vẫn được tách biệt trong các ranh giới của module này (hoặc framework). Chỉ các giao diện hữu ích cho người tiêu dùng bên ngoài được hiển thị thông qua framework giao diện công khai.
Điều này đóng vai trò quan trọng khi một module cần truy cập vào module khác.

## Truy cập module khác

![](https://images.viblo.asia/8a5eb7ff-2104-453e-b916-388f8f863300.png)

Chúng tôi muốn mọi module hoàn toàn độc lập với nhau. Theo cách này, nếu Module A được chỉnh sửa thì nó sẽ không ảnh hưởng gì đến bất cứ module nào sử dụng chúng. Điều này cũng có nghĩa là chúng tôi chỉ cần re-compile module được chỉnh sửa chứ không phải toàn bộ dự án.
Còn khi muốn truy cập vào module khác thì sao?
Ví dụ: Tôi đang ở module A và tôi muốn điều hướng tới 1 màn hình được định nghĩa trong module B. Đoạn code sẽ trông như sau:

```
func navigateToB() {
    // obtains an instance of ModuleB from the dependency manager
    let module = Dependencies.shared.moduleB()
    // obtains an instance of the view controller for screen B from ModuleB
    let vc = module.screenB(input)
    // Push the view controller
    navigationController.pushViewController(vc, animated: true)
}
```

Theo cách này, các module được kết hợp lỏng lẻo: chúng tôi không cần biết loại cụ thể của view controller mà chúng tôi muốn điều hướng, cũng như không cần biết cách cấu hình nó. Chúng tôi chỉ cần truyền vào bất kỳ đầu vào nào cho phương thức khởi tạo để có được một thể hiện chung sẵn sàng được trình bày.
Chúng tôi sẽ giải thích về lớp Dependencies đó là gì, nhưng trước hết hãy định nghĩa giao diện module chung.

## Giao diện module chung

Tất cả module đều định nghĩa giao diện chung của nó với Swift protocol, miêu tả những hành vi nào sẽ được thể hiện ra bên ngoài. Tất cả những giao diện này được định nghĩa bên trong 1 “Dependencies” layer chung.

```
public protocol ChatModuleProtocol {
    // Returns a new view controller used to show a list of conversations
    func conversationsScreen() -> UIViewController
 
    // Returns a new view controller used to chat with a user about a product (optional)
    func messagesScreen(user: User, product: Product?) -> UIViewController
 
    // Returns a new object which can be used to send a message on the background. See ChatMessageSender for more info.
    func messageSender(to receiver: User, about product: Product?) -> ChatMessageSender
}
 
// An object which can be used to send messages about a particular conversation.
public protocol ChatMessageSender {
    // Sends a new message with a body. The completion handler will be called upon completion. In case of success with a valid identifier for the new message created.
    func sendNewMessage(with body: String, completion: @escaping (_ messageId: String?) -> Void)
}
```

Module có thể hiển thị cả view controllers và các đối tượng đơn giản được sử dụng để thực hiện bất kỳ loại tác vụ nền nào. Trong cả hai trường hợp, loại thực sự của những đối tượng này không bao giờ được tiết lộ ra bên ngoài.

## Triển khai module

Mỗi module phải conform với public interface của nó. Điều này được thực hiện thông qua class này được định nghĩa bên trong module framework:

```
import Dependencies
 
public class ChatModule: ChatModuleProtcol {
    public init() {}
    
    public func messageSender(to receiver: User, about product: Product?) -> ChatMessageSender { 
        // configure and return an object for sending a msg in the background
    }
    public func conversationsScreen() -> UIViewController {
        // configure and return a view controller
    }
    public func messagesScreen(user: User, product: Product?) -> UIViewController {
        // configure and return a view controller
    }
}
```

Bây giờ chúng ta cần một cách để yêu cầu một thể hiện của module này và sử dụng nó. Điều này được thực hiện bởi Dependency Manager.

## The dependency manager

```
public final class Dependencies: DependencyManager {
    // We expose this to every modules via a singleton
    public static let shared = Dependencies()
}
 
extension Dependencies {
    // Now we can obtain a ChatModule
    public var chatModule: ChatModuleProtocol {
        return resolve(ChatModuleProtocol.self)!
    }
}
```

Class này được kế thừa từ DependencyManager, đó là một class đơn giản được sử dụng để đăng ký và giải quyết sự phụ thuộc.
Bây giờ chúng ta có một cách để yêu cầu một thể hiện của một module. Chúng ta chỉ cần một điều cuối cùng trước khi chúng ta có thể sử dụng nó, là nói với dependency manager cách giải quyết sự phụ thuộc.

## Giải quyết sự phụ thuộc

App target chính là nơi phù hợp nhất để cung cấp triển khai cụ thể cho các phụ thuộc này, vì nó nằm phía trên bất kỳ module nào.

```
import Dependencies
import Chat

// Call this after the application has finished launching.
func registerDependencies() {
    let dependencies = Dependencies.shared
    
    dependencies.register(ChatModuleProtocol.self) {
        return ChatModule()
    }
}
```

Chú ý rằng đây là nơi duy nhất trong toàn bộ ứng dụng mà chúng tôi import Chat module.
Target chính của app sẽ được re-compile bất cứ khi nào có sự thay đổi ở bất kỳ module nào. Vì vậy nó phải rất nhẹ và nhanh chóng để biên dịch.

## Kết luận

Dưới đây là tổng quan lại những gì đã làm:

![](https://images.viblo.asia/19fee4a0-22de-4bd6-ba3e-465e4c84ae46.png)

Dự án trước (trái) và sau (phải) thay đổi. Utils đã bị bỏ qua vì không có thay đổi đáng kể.
Quá trình này có thể trở nên khá phức tạp, do đó bạn cần tiếp cận nó tăng dần một module tại một thời điểm.
Điều quan trọng là phải có một ý tưởng sơ bộ về việc bạn cần đầu tư bao nhiêu công sức trước khi bắt tay vào tách các module. Một cách đơn giản để đánh giá nỗ lực này là:
1. Xác định các tập tin cốt lõi thuộc về miền của bạn.
2. Tạo một Xcode project hoàn toàn mới (bên ngoài workspace) và sao chép các tệp đó ở đó.
3. Cố gắng biên dịch. Điều này sẽ tiết lộ tất cả các phụ thuộc ngầm của bạn.
4. Lập danh sách các phụ thuộc này và lập kế hoạch di chuyển của bạn phù hợp.
5. Bắt đầu từ các lớp thấp hơn (các dịch vụ lõi / UI lõi) trước khi di chuyển lên, vì điều này sẽ giúp đạt được các mốc trung gian với các bản dựng xanh hợp lệ.

Thật không may, có rất nhiều mẫu soạn sẵn liên quan đến việc tạo Xcode project mới, thêm phần này vào workspace và liên kết nó với các framework chính xác. Hãy nhớ sự lặp lại làm nên sự hoàn hảo. Hãy tập trung vào mục tiêu của bạn và bạn sẽ tìm cách tối ưu hóa điều này sau.

Hy vọng bài viết trên sẽ giúp ích cho các bạn trong việc cấu trúc lại các module của ứng dụng 1 cách hợp lý để chúng có thể dễ dàng mở rộng sau này.
Bài viết được dịch từ: https://engineering.depop.com/scaling-up-an-ios-app-with-modularisation-8cd280d6b2b8