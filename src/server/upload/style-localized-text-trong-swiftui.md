Biến đổi ngôn ngữ của ứng dụng (Localizing) thành nhiều ngôn ngữ khác nhau có thể cho ta nhiều cơ hội được truy cập hơn trên App Store bởi vì người dùng có xu hướng thích sử dụng những ứng nào có ngôn ngữ thân thuộc với họ.

Tuy nhiên, trong khi Apple đưa ra khá nhiều API để quản lý những resource như là localize string, thì cũng có những khó khăn gặp phải khi chúng ta muốn kết hợp nhiều phong cách hơn vào các string nằm trong ứng dụng.

Ví dụ như chúng ta muốn hiển thị một danh sách các bộ phim và chúng ta muốn đặc tả chữ "New" ở trong tiêu đề thì bắt buộc chúng ta phải tạo ra những phiên bản ngôn ngữ một cách thủ công mà không có cách nào tinh chỉnh một phần ký tự được.

![](https://images.viblo.asia/dde7d8d4-7bca-45c3-bb30-2f4bb82dfc3d.PNG)

Tiếp theo, chúng ta phải parse format của chuỗi ký tự trên thành từng phần riêng biệt thành **NSAttributedString** (UIKIT) hoặc **Text** (SwiftUI).

Để bắt đầu, hãy tạo ra một loại **LocalizedString** để chúng ta có thể làm được tất cả phần logic. Đầu tiên là tạo ra API để khởi tạo biến với một key.

![](https://images.viblo.asia/248e9bbc-7aa0-432c-9e0d-810dcb58c167.PNG)

## Attributed Strings

Giống như cái tên của nó, một **NSAttributedString** cho phép chúng ta kết xuất ra những thuộc tính cho một chuỗi ký tự nguyên bản, điều mà trong trường hợp này cho phép chúng ta thao tác với một phần của chuỗi ký tự được localize.

Để làm được điều đó, hãy viết thêm cho **LocalizedString** một chức năng để tách phần chuỗi ký tự nguyên bản nằm trong phần đánh dấu mà chúng ta đặt sẵn ( ** ) , và rồi sau đó chúng ta có thể bôi đạm hoặc chỉnh font tùy thích.

![](https://images.viblo.asia/42f44bc2-44f3-4886-86e9-446a81f2f9b5.PNG)

Trước khi chúng ta tiếp tục tạo ra một phiên bản SwiftUI giống như chức năng bên trên, chúng ta sẽ dành một chút thời gian để chỉnh lại đoạn code parse ký tự và logic để dùng lại để tránh việc trùng lặp code.

Một cách để làm việc này đó là dùng kiểu **Generic** :

![](https://images.viblo.asia/65e5c5c5-5a5e-4463-b160-8220e3efaaa5.PNG)

Với đoạn code trên ta có thể làm đơn giản hóa phần code của attributed string đi, nó chỉ cần tập trung vào việc xác định và kết hợp các đoạn string mà chúng ta truyền vào phần **handler**

![](https://images.viblo.asia/b789f8dd-85d4-4ef0-9c9e-fe7005ffeab0.PNG)

## SwiftUI Text

Một điều được giấu của Text thuộc SwiftUI đó là các giá trị text có thể dùng toán tử + để nối chuỗi với nhau vì cơ bản chúng đều là chuỗi ký tự. Do đó việc của chúng ta giờ là tạo thêm API mới vào **LocalizedString** để gọi hàm **render** rồi kết hợp chúng lại.

![](https://images.viblo.asia/b789f8dd-85d4-4ef0-9c9e-fe7005ffeab0.PNG)

## Kết hợp

Tiếp theo, để dễ dàng hơn cho việc sử dụng hàm UIKIT và SWIFTUI, chúng ta sẽ extend UILabel và Text sau đó dùng giá trị của **LocalizedString** : 

![](https://images.viblo.asia/d3a9fd94-a46c-4b58-9c57-cacceae277cd.PNG)

Với đoạn code trên, chúng ta có thể sử dụng giá trị của **LocalizedString** để tạo ra các style, và để sử dụng nó chỉ cần :

![](https://images.viblo.asia/302c2190-2d46-400e-9086-75b23eb48c19.PNG)

## Caching

Vì tất cả các chuỗi ký tự chúng ta parse trên đều lấy từ nguồn cố đinh, nên chúng ta có thể cache chúng lại để giảm thiểu việc tốn thời gian lấy lần nữa khi chúng ta khởi tạo lại giao diện. Một cách để làm điều này đó là sử dụng **Cache** :

![](https://images.viblo.asia/a51851c7-84d7-4100-b6fd-c1e5946ded64.PNG)

Chú ý rằng biến attributedStringCache lưu trữ biến NSMutableAttributedString bởi vì kiểu mà chúng ta sử dụng sẽ gọi render ở trong hàm attributedString. Do đó hãy cập nhận hàm render ở trong 2 kiểu tạo string:

![](https://images.viblo.asia/571ecf4e-a94f-4989-a1ae-1a6331682803.PNG)

Ngoài ra chúng ta có thể dụng một số markup của html để điều chỉnh style cho text của mình

![](https://images.viblo.asia/24fdac01-c209-4a25-854a-79881048c221.PNG)

## Kết luận

Việc kết hợp giữa text động và tĩnh có thể khá khó khăn ở hiện tại tuy nhiên nếu bỏ 1 chút thời gian để nguyên cứu và đặc tả ra phương pháp riêng vào code thì cúng ta có thể đưa ra những kỹ thuật tốt để giải quyết vấn đề này.

REF : https://www.swiftbysundell.com/articles/styled-localized-strings-in-swift/