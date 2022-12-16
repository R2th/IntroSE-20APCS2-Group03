*Tại sao chỉ sử dụng MVC / MVVM / VIPER là không đủ*

![](https://images.viblo.asia/ad5bc0e6-7b1b-47a3-ab8b-cc5e9ee3a27f.jpeg)
# Giới thiệu
Tại sao chỉ sử dụng MVC, MVVM, MVP hoặc VIPER là không đủ?. Các mẫu kiến trúc này chỉ xử lý mức cao hơn (higher level) (UI) của ứng dụng của bạn. Nhưng rất thường xuyên, bạn cũng phải triển khai các trình quản lý mạng (Network manager), ứng dụng khách API(API Client) , nguồn dữ liệu, bộ chứa bền vững (containers), v.v. Kiến trúc hướng dịch vụ làm cho cuộc sống dev của bạn dễ dàng hơn bằng cách cấu trúc sự tương tác giữa các triển khai cấp cao (heigh level) và cấp thấp hơn (Low level).

Trong bài này mình sẽ sử dụng 1 [demo app](https://github.com/zafarivaev/VIPER-Demo-App) trên github của nguồn mình tham khảo để giúp các bạn nắm vấn đề dễ dàng hơn.
# Kết cấu dự án (Project Structure)
![](https://images.viblo.asia/cb7ca587-d44a-4094-bc04-eb735cc0bca8.png)
Thư mục gốc của dự án được chia thành ba thư mục: Classes, Resources và Supporting Files. Thư mục Resources chứa Assets.xcassets và Supporting Files chứa LaunchScreen.storyboard và Info.plist.

Như bạn có thể thấy, trong Classes, chúng ta có các thư mục sau:

* Thư mục ApplicationLayer chứa tệp AppDelegate.swift.
* Thư mục PresentationLayer có hai mô-đun VIPER: Quotes và QuoteDetail.
* Thư mục BusinessLogicLayer chứa Services và Entities [còn gọi là models trong MV (X)].
* Thư mục Services có ba dịch vụ chúng ta sử dụng trong ứng dụng: quoteService, tìm nạp các trích dẫn từ API; KingfisherService, lấy dữ liệu hình ảnh từ một URL; và ImageDataService, tạo ra một hình ảnh từ dữ liệu đó.
* Thư mục CoreLayer chứa tất cả các tệp trợ giúp mà chúng ta sẽ cần để làm việc với các dịch vụ như: ApiUrls, cấu hình và network khách (network clients).
# Xác định Service
Trước tiên, chúng ta cần cung cấp một chức năng cơ bản của một dịch vụ và chúng sẽ được [Subclass](https://viblo.asia/p/tim-hieu-ve-khoi-tao-initialization-trong-swift-part-23-YWOZrDYv5Q0#_3-khoi-tao-voi-subclass-6) theo các dịch vụ cụ thể trong tương lai:
## Service.swift
{@embed: https://gist.github.com/zafarivaev/1e8ac9311cba442ec5c2a08357fa854c#file-service-swift}

Mỗi dịch vụ phải có duy nhất một serviceName và phương thức register.

Bằng cách sử dụng ServiceRegistryImplementation(), chúng ta sẽ đăng ký dịch vụ của mình trong AppDelegate.swift.

Đã thực hiện xong cơ sở, giờ đây chúng tôi đã sẵn sàng xác định các dịch vụ cụ thể cho ứng dụng của mình.
# QuoteService
Service này chịu trách nhiệm tìm nạp các trích dẫn từ API.

Đây là cách chúng ta định nghĩa nó:
## QuoteService.swift
{@embed: https://gist.github.com/zafarivaev/4968f205d4b0da0a6d36d2ff245f4737#file-quoteservice-swift}

Trong phần mở rộng của quoteService, chúng ta triển networking thực tế:
{@embed: https://gist.github.com/zafarivaev/65a16efd929be3d4fae7638552a44e0e#file-quoteservice-swift}

# KingfisherService
Dịch vụ này chịu trách nhiệm tìm nạp dữ liệu hình ảnh từ một URL.
Nó được định nghĩa tương tự như QuoteService:
## KingfisherService.swift
{@embed: https://gist.github.com/zafarivaev/a142c67264a123731617be60db6b52eb#file-kingfisherservice-swift}
Trong phần mở rộng của KingfisherService, chúng ta thực hiện tải xuống dữ liệu hình ảnh:
{@embed: https://gist.github.com/zafarivaev/e4b148de5e8467330fe1fee1635ad22e#file-kingfisherservice-swift}
# ImageDataService
ImageDataService cung cấp UIImage khi được cung cấp Dữ liệu.
Đúng, Tiếp theo. Chúng  sử dụng một triển khai tương tự:
## ImageDataService.swift
{@embed: https://gist.github.com/zafarivaev/d323c2d3b7043d539335303f4e2e9273#file-imagedataservice-swift}
Chuyển đổi dữ liệu thành hình ảnh được thực hiện trong extension:
{@embed: https://gist.github.com/zafarivaev/121715fb01200aa4416f64fa258205be#file-imagedataservice-swift}
# Registering Services
Để cung cấp các dịch vụ có sẵn để sử dụng trong ứng dụng, chúng ta xác định ServiceRegistryImcellenceation bên trong AppDelegate:
## AppDelegate.swift
{@embed: https://gist.github.com/zafarivaev/18736f59c069746760e3a5c62d92ac0c#file-quotesinteractor-swift}
# Sử dụng Services
Chúng ta hãy xem cách sử dụng QuoteService để tìm nạp danh sách các trích dẫn sẽ được hiển thị trong QuotesViewController:
## QuotesInteractor.swift
{@embed: https://gist.github.com/zafarivaev/18736f59c069746760e3a5c62d92ac0c#file-quotesinteractor-swift}

Nếu bạn không quen thuộc với [kiến trúc VIPER](https://medium.com/better-programming/how-to-implement-viper-architecture-in-your-ios-app-rest-api-and-kingfisher-f494a0891c43),  đơn giản bạn chỉ cần biết QuotesInteractor xử lý tất cả logic nghiệp vụ liên quan đến màn hình quotes, bằng cách chuyển QuoteService làm [phụ thuộc](https://viblo.asia/p/dependency-injection-trong-ios-voi-swift-5-1VgZv8X75Aw) và gọi phương thức getQuotes của nó. Bạn có thể gọi phương thức tương tự bên trong UIViewController nếu bạn đang theo kiến trúc MVC hoặc ViewModel trong trường hợp MVVM.

Tương tự, đây là cách chúng tôi sử dụng KingfisherService để hiển thị hình ảnh nhân vật trong QuotesDetailViewController:

{@embed: https://gist.github.com/zafarivaev/120df247f33fe43f19af93ba2bc8cd08#file-quotedetailinteractor-swift}

Việc sử dụng ImageDataService cũng khá đơn giản nhưng với một số sắc thái của VIPER:

{@embed: https://gist.github.com/zafarivaev/fa6f67da3b9b684a2cac07ae3fbe66f5#file-quotedetailpresenter-swift}

Trong VIPER, Presenter chịu trách nhiệm nhận kết quả trả về từ Interactor, chuẩn bị nó thành dạng data để có thể hiển thị UI và chuyển tiếp nó đến ViewContoder - được định nghĩa trong InteractorToPresenterQuoteDetailProtocol.
# Kết thúc
Hãy xem xét việc kiểm tra các tài nguyên này nếu bạn tò mò về cách người khác triển khai kiến trúc hướng dịch vụ: [SOA trong Swift](https://itnext.io/service-oriented-architecture-in-swift-362dc454fc09?gi=35e78b740188), [SOA-Services](https://github.com/mvalentiner/SOA-Services).

Thảm khảo thêm tại:  https://medium.com/better-programming/implement-a-service-oriented-architecture-in-swift-5-fc70b8117616
gitthub Tham khảo: [SOA-Demo-App](https://github.com/zafarivaev/SOA-Demo-App)