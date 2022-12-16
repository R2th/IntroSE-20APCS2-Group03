Bài viết này sẽ giới thiệu một số design pattern thường gặp mà Apple thường sử dụng. Hy vọng sẽ giúp các bạn trong việc thiết kết cấu trúc của ứng dụng tốt hơn và dễ dàng hơn.
# Class Clusters
Class clusters là một design pattern được sử dụng rất nhiều trong Foundation framework. Class cluster sẽ tổng hợp nhiều concrete subclass trong một public abstract class, giúp tạo một cách thống nhất khi sử dụng nhiều class khác nhau. Class cluster dựa trên Abstract Factory design pattern.
## Khi không sử dụng Class Clusters: Concept đơn giản nhưng Interface phức tạp
Để thể hiện kiến trúc của class clusters và lợi ích của nó, hãy thử xây dựng lại một class biểu diễn các loại số khác nhau như: char, int, float, double. Do các loại số này có nhiều tính chất tương tự như có thể chuyển đổi từ loại này sang loại khác hoặc chuyển sang string chẳng hạn, chúng hoàn toàn có thể được cấu trúc thành một lớp duy nhất. Tuy nhiên, bộ nhớ cần cấp cho mỗi loại là khác nhau, do đó sẽ không tối ưu về mặt bộ nhớ nếu gộp chung tất cả trong một class duy nhất. Do vậy ta có thể thiết kế một cấu trúc như hình dưới
![](https://images.viblo.asia/9e2be8fb-2d4d-4fad-b8d0-2d4d2179fd86.gif)

Number là một abstract class bao gồm các phương thức chung cho tất cả các loại số. Tuy nhiên, nó không định nghĩa một instance variable để chứa số. Thay vào đó, các subclass sẽ đảm nhận nhiệm vụ này đồng thời tuần theo interface mà Number quy định.
Tuy nhiên có một vấn đề đó là với mỗi loại số mới ta sẽ có thêm class tương ứng khiến interface ngày càng phức tạp 

![](https://images.viblo.asia/3a1122b3-417a-4cf0-9393-98ac91de3bec.gif)

## Sử dụng Class Clusters: Concept đơn giản, Interface đơn giản

Sử dụng class clusters, lúc này các subclass sẽ trở thành private (màu xám) như hình dưới 
![](https://images.viblo.asia/efb4aa69-8636-4f8a-9f65-73a1948d0704.gif)

Lúc này ta chỉ cần làm việc với một class public duy nhất là Number. Tuy vậy, đến đây lại nảy sinh vấn đề khác đó là làm thế nào để tạo mới một instance của một subclass nhưng mong muốn chẳng hạn là int thay vì double?

## Tạo instance
Class Number cần phải định nghĩa các method giúp khởi tạo instance của các lớp con. Ví dụ như class NSNumber ta sẽ có các hàm khởi tạo instance các lớp con char, int, float, double như sau :
```
NSNumber *aChar = [NSNumber numberWithChar:’a’];
NSNumber *anInt = [NSNumber numberWithInt:1];
NSNumber *aFloat = [NSNumber numberWithFloat:1.0];
NSNumber *aDouble = [NSNumber numberWithDouble:1.0];
```

Như vậy, ta không được biết các lớp con là gì mà chỉ cần sử dụng hàm khởi tạo phù hợp từ abstract class. Điều này sẽ làm giảm độ phức tạp của interface.
# MVC
Model-View-Controller design pattern và các biến thể của nó đã có từ lâu, đây là một pattern tổng hợp nhiều pattern khác nhau giúp giải quyết kiến trúc chung của toàn bộ ứng dụng và phân lớp các đối tượng theo vài trò của chúng trong ứng dụng.

Lập trình hướng đối tượng (Object-oriented programing) sẽ được hưởng lợi nhiều từ MVC: các đối tượng có khả năng tái sử dụng cao và interface của chúng cũng được định nghĩa tốt hơn, chương trình của chúng ta cũng có thể đáp ứng tốt hơn khi có thay đổi trong yêu cầu. Trong Cocoa, rất nhiều công nghệ và kiến trúc đều sử dụng MVC chẳng hạn: bindings, the document architecture, scripability.

## Vai trò và mối quan hệ của các đối tượng trong MVC
MVC định nghĩa các đối tượng trong chương trình thành 3 thành phần: model, view, và controller, đồng thời cũng đưa ra cách thức liên kết, liên lạc giữa các đối tượng này. Khi tạo một đối tượng mới, bước quan trọng đầu tiên cần làm đó chính là xác định nó thuộc loại nào trong 3 thành phần trên.
### Model: đóng gói data và chứa các behavior
Model chứa data và các logic sử dụng data ấy. Một ứng dụng MVC tốt sẽ đóng gói toàn bộ data quan trọng của nó trong các đối tượng model bởi trong chương trình các data này sẽ được sử dụng lại thường xuyên.

Trường hợp lý tưởng, đối tượng model sẽ không có sự kết nối trực tiếp với user interface được sử dụng để hiển thị hoặc chỉnh sửa model đó. Ví dụ, khi bạn làm ứng dụng contact chẳng hạn, data của mỗi contact nên được lưu vào một đối tượng model Person. Tuy nhiên, thông tin về định dạng ngày tháng, và cách hiện thị ngày tháng nên được đặt ở chỗ khác.

Tuy nhiên, trong thực tế, sẽ có những trường hợp ràng buộc này có thể nới lỏng một chút. Ví dụ, một ứng dụng vẽ hình có các đối tượng model đại diện cho các hình dạng khác nhau như đường thẳng, đường tròn, điểm... Sẽ là  hợp lý khi các model này chứa các logic sử dụng để vẽ chính nó. Dù vậy, trong trường hợp này, các đối tượng này cũng không nên phụ thuộc vào bất cứ một view cụ thể nào và cũng không được biết khi nào chúng được vẽ. Các đối tượng view muốn vẽ chúng sẽ đảm nhiệm nhiệm vụ này.
### View: hiện thị thông tin tới người dùng
Đối tượng view có thể hiển thị và cho phép người dùng được chỉnh sửa data trong ứng dụng. Đối tượng view không nên được sử dụng để chứa data mà nó hiển thị. Tuy nhiên, điều này không có nghĩa là view không bao giờ được chứa data, một view có thể cache data chẳng hạn để nâng cao performance.

Đối tượng view cần có khả năng tái sử dụng và chỉnh sửa được cho các trường hợp khác nhau nhưng cũng cần có tính nhất quán về cả hiện thị lẫn hành vi trong các ứng dụng khác nhau.

Đối tượng view cần thể hiện chính xác đối tượng model, chính vì vậy, view thường cần phải biết khi model thay đổi dẫn đến đối tượng view sẽ phục thuộc quá nhiều vào model gây khó khăn trong việc tái sử dụng view. Do vậy, ta cần có cách thức phù hợp để thông báo cho view sự thay đổi của model và không làm chúng phụ thuộc vào nhau đó chính là vai trò cuả controller.
### Controller: Kết nối model và view
Controller hoạt động như một thành phần trung gian giữa đối tượng view và model tương ứng. Controller có nhiệm vụ đảm bảo view có thể truy cập tới model và cung cấp thoong tin cho view khi model thay đổi. Ngoài ra, controller còn làm nhiệm vụ khơi tạo và điều phối các nhiệm vụ khác nhau, quản lý life cycle cho các đối tượng khác.
Trong Cocoa MVC, khi người dùng nhập vào một giá trị hay lựa chọn thông qua đối tượng view, giá trị hay sự lựa chọn đó sẽ được kết nối với đối tượng controller. Đối tượng controller sau đó sẽ chuyển đổi dữ liệu vào của người dùng và thoong báo cho model làm gì với dữ liệu này. Chẳng hạn, "thêm bản ghi mới" hay "xoá bản ghi mới nhất". Ngược lại, khi một đối tượng model thay đổi nó sẽ thông báo cho controller, sau đó controller sẽ có nhiệm vụ thông báo cho các đối tượng view cần thiết cập nhật lại tương ứng với sự thay đổi của model.
### Đối tượng với vai trò kết hợp
Trong Cocoa, một đối tượng đồng thời có thể đảm nhiệm 2 vai trò, chẳng hạn vừa là controller vừa là view, lúc này nó sẽ là view controller. Tương tự ta cũng sẽ có model controller..
Đối tượng model controller sẽ tập trung vào làm việc với lớp model. Nó sẽ chứa, quản lý model và làm nhiệm vụ liên lạc với các đối tượng view chẳng hạn NSWindowController.
## Các desing pattern sử dụng trong MVC
MVC là một pattern tổng hợp của nhiều pattern khác nhau. Trong Cocoa, MCV có thay đổi một chút về vai trò của controller và view so với MVC truyền thống.

Trong MVC truyền thống (ngôn ngữ Smalltalk), MVC sử dụng các design pattern sau: Composite, Strategy, Observer.

* Composite: Đối tượng view là một "composite" - tổng hợp từ nhiều view khác nhau, được sắp xếp bởi "view hierarchy".
* Strategy: Đối tượng controller thực thi strategy cho một hoặc nhiều view. Khi đó, các controller khác nhau có thể sử dụng chung một view với những hành vi khác nhau.
* Observer: Đối tượng model sẽ thông báo sự thay đổi của mình cho view một cách gián tiếp qua observer.

Mô hình MVC truyền thống được mô tả như hình dưới đây. Người dùng tương tác với một view nào đó trong composite structure của các view và sinh ra một sự kiện "User action". Controller nhận và chuyển đổi các sự kiện này bằng cách sử dụng strategy. Strategy cập nhật sự thay đổi lên model hoặc view. Đối tượng model thông báo tới tất cả các đối tượng đã đăng ký là observer của nó rằng có sự thay đổi trong model.

![](https://images.viblo.asia/83051b9f-5d15-4880-9a37-b1c1e1b13c41.gif)

MVC của Cocoa có những điểm tương tự như MVC truyền thống, và trên thực tế hoàng toàn có thể xây dựng ứng dụng bằng mô hình MVC truyền thống. Tuy nhiên trong phần lớn ứng dụng Cocoa, sự thay đổi của model sẽ được thông báo cho controller. Với cách này sẽ nâng cao tính tái sử dụng của cả view và model. Hình dưới đây thể hiện Cocoa MVC 
![](https://images.viblo.asia/586e847b-d949-444d-a4ce-79c25aacb524.gif)

Đối tượng controller được xây dựng từ Mediator và Strategy pattern, nó là trung gian của luồng data giữa model và view theo cả 2 hướng. Sự thay đổi của model được cập nhật tới view thông qua controller. Thêm nữa, đối tượng view sử dụng Command pattern thông qua cơ chế target-action
# Tham khảo 
https://developer.apple.com/library/archive/documentation/