# I. Giới thiệu
Trong phần 1(https://viblo.asia/p/nhung-cau-hoi-co-the-ban-se-gap-khi-di-phong-van-phan-1-jvEla0ndZkw), chúng ta đã đi được 1 nửa số câu hỏi. Bài viết này tôi sẽ trình bày tiếp các câu hỏi có thể các bạn sẽ gặp phải khi đi phỏng vấn.

# II. Nội dung (tiếp)

**23. Hỏi: ABI trong Swift là gì?**

Trả lời: ABI là viết tắt của Application Binary Interface. Trong phase runtime, các chương trình nhị phân của Swift tương tác với các thư viện khác thông qua ABI. Trong quá trình làm việc thông thường, có thể nhiều bạn còn không biết đến sự tồn tại của ABI. ABI có nhiều ý nghĩa đối với các external library, hiểu đơn giản thì là như thế này: giả sử project swift của bạn dùng 1 version ABI, thì các external frameworks cũng phải dùng chung 1 version ABI thì mới có thể dùng được.
Trong Swift 5.0, chúng ta đã có ABI stability (ABI ổn định), sau này các external library sẽ chỉ cần dùng 1 chuẩn ABI mà thôi. 

**24. Hỏi: Tại sao design patterns lại rất quan trọng?**

Trả lời: Hỏi thừa, design patterns đương nhiên là quan trọng rồi. Design pattern là đúc kết tinh hoa của giới lập trình viên trên toàn thế giới, tạo ra các pattern để đưa ra solution trong software design. Design pattern giúp chúng ta viết code rõ ràng hơn, dễ đọc, dễ hiểu hơn, dễ tái sử dụng hơn. Thông thường các design pattern được chia ra thành 3 loại chính: Creational, Structural và Behavioral

**25. Hỏi: Singleton pattern là gì?**

Trả lời: Singleton design pattern đảm bảo rằng trong 1 class, chỉ có 1 instance được khởi tạo, và có cách để truy cập vào instance này ở bất kỳ đâu. Instance singleton thường được khai báo dạng lazy loading, để tạo 1 instance duy nhất khi cần đến nó lần đầu tiên.

Singleton được xếp vào loại creational pattern

**26. Hỏi: Facade pattern là gì?**

Trả lời: facade design pattern cung cấp 1 interface cho 1 hệ thống con phức tạp bên dưới. Thay vì phải làm việc với từng phần trong hệ thống con, user chỉ cần làm việc với interface thông qua các API, sâu bên dưới interface làm việc với hệ thống con như thế nào thì user không cần quan tâm. Sử dụng facade pattern có nhiều tác dụng:
* tạo interface đơn giản cho hệ thống phức tạp để user dễ sử dụng
* tách biệt các hệ thống phức tạp, dễ chuyển đổi, nâng cấp trong tương lai
* giảm sự phụ thuộc của các hệ thống với nhau
* che dấu các hệ thống con với user

Facade được xếp vào loại structural pattern

**27. Hỏi: Decorator pattern là gì?**

Trả lời: Decolator design pattern giúp thêm các hành vi vào một object mà không cần phải sửa code. Khác với subclass, decorator pattern sẽ gói (wrapping) class bằng một object khác.

Trong Objective-C, decolator pattern được sử dụng phổ biến nhất trong Category và Delegation. Trong Swift thì được sử dụng trong Extensions và Delegation.

Decolator được xếp vào loại structural pattern

**28. Hỏi: Adapter pattern là gì?**

Trả lời: Adapter design pattern giúp các class với các interface không tương thích có thể hoạt động cùng nhau. Nó bao bọc chính nó xung quanh 1 object và hiển thị một giao diện chuẩn để tương tác với đối tượng đó.

Adapter được xếp vào loại structural pattern

**29. Hỏi: Observer pattern là gì?**

Trả lời: Observer design pattern là dạng pattern mà khi 1 object có bất kỳ thay đổi trạng thái nào, nó có thể thông báo cho tất cả các object khác đăng ký nhận sự thay đổi từ nó.

2 ví dụ về Observer pattern trong iOS là Notifications và key-value objserving (KVO).

Observer được xếp vào loại behavior pattern

**30. Hỏi: Memento pattern là gì?**

Trả lời: Memento design pattern là pattern được sử dụng với mục đích lưu trữ trạng thái của một đối tượng nhất định. Sau đó, trạng thái này có thể được khôi phục lại mà không vi phạm đóng gói, có nghĩa là private data sẽ vẫn là private data. 

Memento được xếp vào loại behavior pattern

**31. Hỏi: Giải thích về MVC**

Trả lời: Trong MVC, chúng ta có 3 phần riêng biệt:
* Models: chịu trách nhiệm về domain data hoặc data access layer để truy xuất và thao tác data.
* Views: chịu trách nhiệm về hiển thị giao diện. Trong iOS, mọi view đều bắt đầu với tiền tố UI
* Controllers: Chịu trách nhiệm nhận các hành động từ view, thay đổi data model, và cập nhật thay đổi lại view.

**32. Hỏi: Giải thích về MVVM**

Trả lời: MVVM là viết tắt của View-Model-ViewModel
* View: Tương tự như MVC, View trong MVVM hiển thị giao diện. Trong iOS, UIViewController cũng tính là View.
* models: Tương tự như MVC, model giúp truy xuất và thao tác với data
* ViewModel: lớp trung gian giữa View và Model, có thể xem là thành phần thay thế cho controller trong MVC. ViewModel chỉ đơn thuần chứa business logic, không liên quan đến View. Trong mô hình MVVM, dữ liệu giữa View và ViewModel sẽ được giằng buộc 2 chiều (data binding). Điều này cho phép dữ liệu được tự động cập nhật ở View khi thay đổi trong ViewModel. 

**33. Hỏi: có bao nhiêu annotation khác nhau trong Objective-C**

Trả lời:
* _Null_unspecified: đây là annotation mặc định, dùng làm cầu nối với implicitly unwrapped optional trong Swift.
* _Nonnull: value không thể là nil, dùng làm cầu nối với non-optional trong Swift
* _Nullable: value có thể nil, dùng làm cầu nối với optional trong Swift
* _Null_resettable: chỉ có thể áp dụng với property, không được sử dụng với parameter hoặc return type. Mục đích của annotation này là có thể cho phép reset property bằng cách gán nó bằng nil. 

****34. Hỏi: hạn chế của Json/plist là gì?**

Trả lời: các hạn chế:
* Các trường hợp sử dụng của Json/plist là rất hạn chế.
* không thể sử dụng các câu truy vấn phức tạp để lấy data.
* Tốc độ đọc/ghi/truy vấn data rất chậm
* Mỗi lần cần lấy data, chúng ta phải serialize/deserialize cả file
* Json/plist không phải là thread-safe

**35. Hỏi: Hạn chế của SQLite là gì?**

Trả lời: 
* Cần xác định mối quan hệ (relationship) giữa các bảng, xác định lược đồ (schema) của tất cả các bảng
* Phải tự viết tất cả các câu truy vấn để lấy data
* Phải truy vấn data rồi tự map data vào model

**36. Hỏi: Những lợi ích của Realm là gì?**

Trả lời:
* Realm là open source framework
* Tốc độ chạy nhanh
* Có sẵn các hàm cơ bản, chỉ việc sử dụng
* Mọi thay đổi của Realm object được thực hiện trong closure của Realm
* Có thể nhìn các bảng db một cách trực quan

**37. Hỏi: Có bao nhiêu API để theo dõi vị trí sử dụng pin một cách hiệu quả?**

Trả lời: có 3 API
* Significant location changes: vị trí được trả về mỗi khi khoảng cách xấp xỉ 500m
* Region monitoring: Theo dõi sự kiện vào/ra khỏi khu vực có bán kính 100m hoặc hơn. Region monitoring là API chính xác nhất sau GPS
* Visit events: giám sát các địa điểm ghé thăm vào/ra tại mội địa điểm (nhà, văn phòng)

**38. Hỏi: Những lợi thế chính của Swift là gì?**

Trả lời: So với Objective C thì Swift có rất nhiều lợi thế:
* Có optional type, làm cho ứng dụng khó bị crash
* Tích hợp xử lý lỗi (build-in error handling)
* Closures
* Chạy nhanh hơn rất nhiều so với các ngôn ngữ khác
* Type-safe
* Hỗ trợ pattern matching

**39. Hỏi: Giải thích generics trong Swift**

Trả lời: generic giúp chúng ta viết code mà không cần phải cụ thể hoá data type của biến, giúp chúng ta trong quá trình code chỉ phải khai báo 1 type chung, không phải lặp lại code nhiều lần cho các hàm có type data gần giống nhau.

**40. Hỏi: giải thích về lazy trong Swift**

Trả lời: khi stored property được gán keyword lazy, điều này có nghĩa là property đó sẽ không được khởi tạo ngay lập tức, mà sẽ được khởi tạo khi lần đầu tiên property này được gọi đến. lazy sẽ trở nên rất tiện khi chúng ta có một property mà vừa nặng khi khởi tạo, vừa chưa chắc sẽ được sử dụng trong controller.

**41. Hỏi: giải thích về keyword defer trong Swift**

Trả lời: defer sẽ cung cấp 1 block code, block code này sẽ được thực thi khi execution rời khỏi phạm vi hiện tại.

Ví dụ cho đơn giản dễ hiểu:
func test() {
    defer { print(“end of function test“) }

    print(“start of function test”)
	// code here
	print(“function test is about to end”)
}

// start of function test
// function test is about to end
// end of function test
Bên trên code trong defer sẽ được thực thi ngay trước khi hàm test kết thúc

**42. Hỏi: làm sao để pass variable dạng reference?**

Trả lời: variable có thể là 1 trong 2 dạng: value hoặc reference
* Trường hợp reference: cứ vậy mà pass thôi, nó là pass-by-reference rồi
* Trường hợp value: sử dụng keyword inout, tuy nhiên nên hạn chế sử dụng vì đây là cách không được recommend. cần pass-by-reference thì nên khởi tạo luôn dạng reference

**43. Hỏi: làm sao để pass data giữa các view controller?**

Trả lời: có 3 cách:
* Trong segue: pass data thông qua hàm prepareForSegue
* Sử dụng delegate
* Gán giá trị trực tiếp trước khi present view controller

Ngoài ra các bạn có thể sử dụng các cách dị hơn, như sử dụng notification chẳng hạn :D

**44. Hỏi: concurrency là gì?**

Trả lời: cái tên của nó đã khá rõ ràng, concurrency là thực thi đồng thời nhiều tác vụ trong ứng dụng cùng 1 lúc. Concurrency thường đi cùng với các thuật ngữ: process, thread, multithreading, queue, synchronous, asinchronous,…

**45. Hỏi: Grand Central Dispatch (GCD) là gì?**

Trả lời: GCD là một thư viện low-level, cung cấp các API để chạy các task concurency, các thread sẽ được GCD quản lý ẩn bên trong thư viện. Các thuật ngữ thường dùng trong GCD:
* Dispatch queue: chịu trách nhiệm thực thi task với thứ tự first-in, first-out
* Serial dispatch queue: queue này chỉ thực thi mỗi task 1 lúc
* concurrent dispatch queue: queue này thực thi nhiều task nhất có thể 1 lúc, không cần phải chờ đợi task nào cả.
* main dispatch queue: là global queue có sẵn để thực thi các task trên main thread của ứng dụng.

**46. Hỏi: các vấn đề về đọc-ghi trong concurrency là gì?**

Trả lời: Trong quá trình đọc-ghi dữ liệu, có thể có nhiều thread khác nhau cùng đọc-ghi 1 lúc, dẫn đến bug có thể xảy ra, làm sai khác dữ liệu hoặc thậm chí crash app. Để giải quyết vấn đề này, các bạn cần đảm bảo rằng khi ghi dữ liệu, tất cả các thread khác phải chờ việc ghi dữ liệu kết thúc. Chúng ta có thể sử dụng GCD, cụ thể là barriers của concurent queue để ghi dữ liệu. Việc đọc-ghi dữ liệu sẽ diễn ra trong queue, tuy nhiên việc ghi dữ liệu sẽ phải kèm theo flags barrier.

**47. Hỏi: Giải thích về NSOperation, NSOperationQueue, NSBlockOperation**

Trả lời: 
* NSOperation: Tương tự như GCD, NSOperation sử dụng trong các task concurrency. Tuy nhiên NSOperation hơn GCD ở chỗ chúng ta có thể thêm ràng buộc giữa các operation, có thể re-use, cancel hoặc suspend operation

* NSOperationQueue: OperationQueue cho phép một nhóm các thread được tạo và sử dụng để thực thi NSOperation một cách song song. NSOperationQueue không phải một phần của GCD.

* NSBlockOperation: cho phép chúng ta tạo NSOperation từ một hoặc nhiều closure. NSBlockOperation có thể có nhiều block, các block này được chạy đồng thời.

Trước đây mình đã có một bài viết tìm hiểu về GCD và NSOperation, các bạn có thể tìm hiểu thêm [tại đây](https://viblo.asia/p/concurrency-trong-ios-tim-hieu-ve-grand-central-dispatch-va-nsoperation-DljMbo8ZGVZn)

**48. Hỏi: KVC - KVO là gì?**

Trả lời: 
KVC là viết tắt của Key-Value Coding. Nó là một cơ chế cho phép property của object có thể được truy cập sử dụng các chuỗi trong quá trình runtime. 

KVO là viết tắt của Key-Value Observing, nó cho phép controller hoặc class có thể theo dõi sự thay đổi giá trị của property. Trong KVO, một object có thể theo dõi sự thay đổi bất kỳ của 1 property nhất định, mỗi khi có thay đổi trong property, object sẽ tự động được thông báo.

**49. Hỏi: giải thích các kỹ thuật pattern matching trong Swift**

Trả lời: 
* Tuple pattern: được sử dụng để khớp với giá trị của các tuple tương ứng
* Type-casting pattern: cho phép chúng ta cast hoặc match các type
* Wildcard pattern: match và ignore bất kỳ loại và type nào của value
* Optional pattern: sử dụng để match giá trị optional
* Enumeration case pattern: match các case của các loại enum đã tồn tại
* Expression pattern: cho phép chúng ta so sánh một gía trị cho trước với một biểu thức

**50. Hỏi: giải thích về Guard statement**

Trả lời: Guard statement có 3 lợi ích lớn:
* 1. Tránh lồng nhiều vòng if, giúp code dễ nhìn hơn, không bị đẩy code ra xa lề
* 2. Cung cấp một lối thoát sớm thông qua keyword break hoặc return
* 3. Một cách an toàn để unwrap optional

# III. Tổng kết

Trên đây mình đã giới thiệu một số câu hỏi có thể gặp khi đi phỏng vấn. Theo mình nghĩ thì các câu hỏi này giúp mình củng cố kiến thức nhiều hơn. Hi vọng bài viết này giúp các bạn có thể củng cố lại kiến thức của bản thân, và biết đâu đấy, đi phỏng vấn lại gặp trúng 1 số câu hỏi trong đây thì sao :D

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!