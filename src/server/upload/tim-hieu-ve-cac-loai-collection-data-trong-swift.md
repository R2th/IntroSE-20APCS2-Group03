Bài viết này được viết dựa trên 1 bài viết trên trang raywenderlich.com, các bạn có thể [vào đây](https://www.raywenderlich.com/1172-collection-data-structures-in-swift) để đọc bài viết gốc của tác giả

# I. Giới thiệu

Trong quá trình viết code trên swift, chúng ta thường xuyên phải sử dụng các loại collection data. Trong đó, phổ biến nhất là Array, Dictionary và Set. Mặc dù khi code dùng suốt, nhưng có khi nào các bạn tự hỏi các loại trên nên dùng trong tình huống nào? độ phức tạp của chúng như thế nào khi create/index/delete hoặc so với NSArray, NSDictionary, NSSet của Cocoa thì tốc độ có khác gì nhau hay chưa? Trong bài viết này, tôi sẽ lần lượt giới thiệu đến các bạn về các vấn đề nêu trên.

# II. Nội dung

## 1. Độ phức tạp

Khi học trong trường đại học, hẳn là tất cả chúng ta đã được học về độ phức tạp của phép toán. Tuy nhiên, có thể có một số bạn trước kia không học CNTT, hoặc cũng có thể các bạn lâu không dùng nên quên mất, nên mình xin phép sẽ nhắc lại về cái này. 

Mỗi một phép toán thì đều có độ phức tạp của riêng nó, và để đo độ phức tạp, người ta dùng “Big-O” Notation. Thông thường, “Big-O” Notation thường thấy nhất là các trường hợp sau:

* O(1): đây là độ phức tạp lý tưởng của phép toán. Không cần biết số lượng data nhiều đến cỡ nào, thì thời gian thực hiện phép toán là không đổi

* O(log n): đây là độ phức tạp rất tốt của phép toán. Với n là số lượng data, thì khi n tăng, hiệu suất của phép toán bị giảm đi không nhiều so với n

* O(n): cái này biểu thị cho sự tuyến tính giữa số lượng data và hiệu suất của phép toán. phép toán có độ phức tạp là O(n) được coi là một phép toán có hiệu suất tương đối tốt, nhưng hiệu suất của phép toán này cũng có thể bị giảm đáng kể khi n trở nên quá lớn

* O(nlog n): phép toán có độ phức tạp là O(nlog n) có độ phức tạp cao hơn O(n), tuy nhiên trong thực tế thì vẫn có thể chấp nhận được.
* O(n^2): đây là độ phức tạp tương đối không tốt của phép toán. độ phức tạp là bình phương của số lượng data.
* O(2^n): đây là độ phức tạp khá tệ, chúng ta không nên sử dụng các phép toán có độ phức tạp như vậy, vì hiệu suất của phép toán sẽ giảm rất nhanh khi kích thước dữ liệu tăng lên.
* O(n!) đây là độ phức tạp cực kỳ tệ, độ phức tạp được tính bằng giai thừa của dữ liệu. thực tế chúng ta sẽ không dùng các phép toán có độ phức tạp như vậy

Dưới đây là biểu đồ sự liên quan giữa kích thước dữ liệu và độ phức tạp của các phép toán:

![](https://images.viblo.asia/f36e0b7f-5fa3-442d-8244-83d1ee6add8a.png)

Bên trên chúng ta vừa nhìn lại một ít kiến thức về độ phức tạp của phép toán, sau đây chúng ta sẽ đi tìm hiểu lần lượt từng loại cấu trúc dữ liệu trong Swift

## 2. Array

Array là một tập hợp các dữ liệu được sắp xếp theo 1 thứ tự nhất định, chúng ta có thể truy cập vào dữ liệu trong Array thông qua index.

Trong Swift, chúng ta sử dụng khai báo let cho array không thể thay đổi và var cho array có thể thay đổi. Tương ứng với let và var trong Swift là NSArray và NSMutableArray của Foundation.

Tất cả item của Array trong Swift cần có chung một kiểu dữ liệu, điều này khác với NSArray của Foundation, mỗi item trong NSArray có thể có kiểu dữ liệu khác nhau.

Vì Array là một tập hợp dữ liệu được sắp xếp theo thứ tự, vì vậy nên chúng ta sử dụng Array khi chúng ta cần dữ liệu được sắp xếp theo thứ tự nhất định.

Về độ phức tạp của các phép toán trong Array, Apple có đề cập đến độ phức tạp của Array trong tài liệu [ở đây](https://opensource.apple.com/source/CF/CF-550.13/CFArray.h)

* Truy cập vào một index bất kỳ của Array: worst case là O(log n), thông thường là O(1)
* Tìm kiếm một dữ liệu chưa biết index trong Array: worst case là O(nlog n), thông thường là O(n)
* Thêm hoặc xoá 1 dữ liệu trong Array: worst case là O(nlog n), thông thường là O(1)

Trong thực tế, các bạn nên nhớ những điều sau về độ phức tạp của Array:

* Nếu index của object trong Array đã biết trước, thì việc lấy object ra rất nhanh.
* Nếu chưa biết index của object trong Array, chúng ta phải tìm kiếm từ đàu đến cuối Array, việc tìm kiếm sẽ chậm hơn.
* Việc thêm/xoá object trong Array có thể làm Array phải re-index, việc này sẽ tốn thời gian hơn.


### Test tốc độ thực tế

Để test tốc độ thực tế của Array trong Swift, và so sánh với NSArray của Foundation, các bạn có thể [vào đây](https://drive.google.com/file/d/1EChwwIClx636XP1_RQrIqLhf8RIwBoR7/view?usp=sharing). Đây là Project được lấy từ bài viết gốc trên raywenderlich.com (link bài viết gốc mình đã để trên đầu bài viết). Các bạn hãy download project về và chạy thử. Vì mỗi máy khác nhau thì có cấu hình khác nhau, nên thời gian chạy trên mỗi máy sẽ có khác nhau. Dưới đây là kết quả máy mình chạy với Number of Items là 1.000 và 10.000.000. 

![](https://images.viblo.asia/3fc8c61e-2faf-4109-b486-5cdf02477e9d.png)

Các bạn lưu ý, mỗi một version mới của Swift lại được cải thiện về hiệu năng, vì thế version Swift càng cao thì kết quả chạy sẽ càng nhanh hơn. Trên đây mình dùng là Swift 4.1 với Simulator iPhone 8, iOS 11.1

Bây giờ chúng ta sẽ so sánh với cùng 1 simulator, tốc độ giữa Array của Swift và NSArray của Foundation khác nhau như thế nào. Để làm được việc này, các bạn chỉ cần vào file ArrayViewController.swift, tìm đến dòng code số 27 với nội dung như sau:
```Swift
let arrayManipulator: ArrayManipulator = SwiftArrayManipulator()
```
Sửa dòng code trên bằng dòng code có nội dung như sau:
```Swift
let arrayManipulator: ArrayManipulator = NSArrayManipulator()
```

Build project và chạy với số lượng item lần lượt 1.000 và 10.000.000 như trên, chúng ta được kết quả như sau:

![](https://images.viblo.asia/f8d072ce-1f84-4d83-9850-0b18edd71efd.png)

Nhìn vào kết quả thực tế bên trên, chúng ta thấy với số lượng Item ít (1.000 item) thời gian chạy của Array và NSArray có phần tương đương nhau, thậm chí khởi tạo NSArray còn có phần nhanh hơn Array. Tuy nhiên, khi số lượng item lớn (10.000.000 item) thì Array thể hiện sự vượt trội hơn so với NSArray.

## 3. Dictionary

Dictionary là một tập hợp dữ liệu mà các dữ liệu trong đó được lưu trữ dưới dạng key/value. Các dữ liệu không cần thiết phải có một thứ tự nhất định, và mỗi key trong dictionary phải duy nhất.

Giống như Array, chúng ta khai báo let và var cho Dictionary không thể và có thể thay đổi được. Foundation cũng có 2 class NSDictionary và NSMutableDictionary tương ứng với let và var trong Dictionary.

Dictionary cũng đòi hỏi các cặp key/value của data trong nó phải có chung một kiểu. Không giống với NSDictionary, các value trong NSDictionary có thể có các kiểu khác nhau.

Chúng ta sử dụng Dictionary khi các dữ liệu không cần thiết phải có thứ tự nhất định, nhưng các dữ liệu phải có liên kết theo cặp.


Apple có đề cập đến độ phức tạp của Dictionary trong tài liệu [ở đây](https://opensource.apple.com/source/headerdoc/headerdoc-8.5.10/ExampleHeaders/CFDictionary.h). Theo đó thì:
* Độ phức tạp để lấy 1 value từ key trong Dictionary worst case là O(log n), thông thường là O(1)
* Độ phức tạp thêm và xoá các cặp key/value có worst case là O(nlog n), thông thường thì gần đạt O(1) vì Apple đã tối ưu hoá phép toán

Vậy là theo tài liệu của Apple, độ phức tạp của Dictionary so với Array không chênh là bao, mặc dù so với kiểu sắp xếp dữ liệu của Array, thì có vẻ kiểu sắp xếp dữ liệu của Dictionary phức tạp hơn. Không biết Apple đã làm điều tuyệt vời gì mà có thể làm cho Dictionary có hiệu suất ngang ngửa với Array

### Test tốc độ thực tế

Chúng ta dùng luôn App test cho Array bên trên để test tốc độ thực tế cho Dictionary. Nếu để ý App test, các bạn sẽ thấy App test có 3 tab cho 3 thể loại test: Array, Set và Dictionary. Để test cho Dictionary, các bạn chuyển qua tab Dictionary và test thôi. Dưới đây là kết quả test thực tế của tôi với số lượng data lần lượt là 1.000 và 10.000.000 item. Tất nhiên là tôi vẫn test với phiên bản Swift 4.1, trên simulator iPhone 8, iOS 11.1

![](https://images.viblo.asia/a137e350-d563-4e07-bc52-5070944ca35d.png)


Trong ảnh kết quả bên trên, chúng ta thấy thời gian truy xuất, thêm, xoá 1 hay 10 entry của Dictionary trong trường hợp ít và nhiều Item là như nhau, đều cực kỳ nhanh, thậm chí có trường hợp nhanh hơn Array khá nhiều. Tuy nhiên quá trình khởi tạo Dictionary trong trường hợp 10.000.000 item lại khá lâu so với Array. Điều này cũng dễ hiểu bởi Dictionary có cấu trúc phức tạp hơn Array.


Bây giờ, chúng ta sẽ test sự khác biệt giữa sử dụng Dictionary và NSDictionary. Để test performance trên NSDictionary, các bạn cũng làm gần tương tự với test Array bên trên. Chúng ta vào file DictionaryViewController.swift trong project, sửa code của dòng 27 với nội dung như sau:
```Swift
let dictionaryManipulator: DictionaryManipulator = SwiftDictionaryManipulator()
```

thành như sau:
```Swift
let dictionaryManipulator: DictionaryManipulator = NSDictionaryManipulator()
```

Build project và chạy với số lượng item lần lượt 1.000 và 10.000.000 như trên, chúng ta được kết quả như sau:

![](https://images.viblo.asia/f1d769d7-d534-4add-b75c-408f55ed1c73.png)

So sánh với kết quả của Dictionary bên trên, với số lượng item ít, thời gian tạo NSDictionary thậm chí nhanh hơn Dictionary, mặc dù thời gian truy xuất/thêm/xoá của NSDictionary không được như Dictionary. Tuy nhiên, khi số lượng item lên đến 10.000.000, Dictionary tỏ ra ưu thế hơn hẳn NSDictionary, Thời gian khởi tạo NSDictionary lên tới hơn 8s, so với hơn 2s của Dictionary. Chúng ta cũng có thể thấy thời gian truy xuất/thêm/xoá của NSDictionary cũng không phụ thuộc vào số lượng item, dù ít hay nhiều item thì performance cũng là tương đương nhau

## 4. Set

Set là một tập hợp dữ liệu không có thứ tự sắp xếp, và các dữ liệu trong Set là giá trị duy nhất. Đây là điểm đặc biệt của Set, các bạn không thể thêm 2 dữ liệu giống hệt nhau vào trong Set.

Chúng ta khai báo let và var cho Set không thể và có thể thay đổi được, tương ứng với NSSet và NSMutableSet trong Foundation.

Set cũng đòi hỏi các dữ liệu trong nó phải có chung 1 kiểu. 

Không như Array và Dictionary được sử dụng ngay từ phiên bản đầu tiên của Swift, Set được giới thiệu muộn hơn, trong phiên bản Swift 1.2. Tuy nhiên giờ chúng ta dùng Swift 4.x hết rồi, còn ai dùng Swift 1 nữa nên cũng không cần bận tâm lắm chỗ này.

Chúng ta sử dụng Set trong trường hợp thứ tự sắp xếp của dữ liệu không quan trọng, nhưng tính duy nhất của dữ liệu thì lại quan trọng. 

Apple không đề cập đến độ phức tạp của Set, vì thế chúng ta không thể biết được chính xác độ phức tạp của Set, chúng ta sẽ đi test peformance thực tế trong phần ngay sau đây.

### Test tốc độ thực tế

Tương tự như test Array và Dictionary bên trên, chúng ta cũng dùng App test bên trên để test Set. Vẫn là phiên bản Swift 4.1, Simulator iPhone 8, iOS 11.1. Tuy nhiên, chúng ta sẽ test với số lượng nhỏ item trong Set, bởi khi tôi thực hiện test với số lượng lớn, cụ thể là 10.000.000 item thì quá trình chờ đợi quá lâu, chờ mãi không chạy xong nên tôi không kiên nhẫn cho nổi  :D. Dưới đây là kết quả test của tôi trong trường hợp 1.000 item và 443.434 item

![](https://images.viblo.asia/dc811ffd-4082-45a7-b8da-dfa34b444713.png)

Nhìn vào kết quả test bên trên, chúng ta thấy khá rõ ràng rằng performance khi khởi tạo và add thêm item của Set bị ảnh hưởng rất nhiều bởi số lượng item trong Set còn các phép toán tìm kiếm và xoá trong Set lại không hề mất nhiều thời gian. Việc khởi tạo Set mất quá nhiều thời gian cũng không khó hiểu, bởi vì mỗi khi tạo thêm 1 item trong Set, Set sẽ phải kiểm tra tất cả các item có sẵn để đảm bảo rằng item mới thêm vào là duy nhất.


Tiếp theo, chúng ta sẽ test performance giữa Set và NSSet. Các bạn vào file SetViewController.swift, sửa dòng 27 với nội dung như sau:
```Swift
let setManipulator = SwiftSetManipulator()
```
thành như sau:
```Swift
let setManipulator = NSSetManipulator()
```

Build project và cũng chạy thử, do app test sử dụng UISlider để kéo số lượng Item, chúng ta rất khó để lấy con số chính xác 443.434 như bên trên, nên các bạn có thể lấy số item lần lượt là 1.000 và số gần nhất có thể với 443.434. Hên là tôi kéo chính xác được số 443.434, nên tôi vẫn sẽ test với 1.000 và 443.434. Kết quả test được như sau:

![](https://images.viblo.asia/aa02900d-05a6-47ef-b5de-17eca5aa1a10.png)


Dựa vào kết quả test thực tế NSSet bên trên, chúng ta có thể thấy Set trong Swfit 4.1 đã được cải tiến so với NSSet. Mặc dù mức độ cải tiến không thật sự rõ rệt nếu so sánh sự cải tiến của Array hay Dictionary, nhưng dù sao đây cũng là sự cải tiến đáng ghi nhận. Trong tương lai, khi các phiên bản Swift sau được release, performance của Set có thể sẽ còn được cải thiện nhiều hơn nữa

# III. Tổng kết

Trên đây chúng ta đã cùng nhau đi sâu hơn về các loại collection data trong Swift, tìm hiểu về độ phức tạp của các phép toán tạo, thêm, tìm kiếm, xoá của các loại collection data. Trong các App thực tế, chúng ta thường chỉ sử dụng các loại collection với số lượng rất ít, thường chỉ lên tới con số hàng nghìn là cùng, nên các con số trong bài này chỉ mang tính chất tham khảo. Nhưng biết đâu được đấy, đến một lúc nào đó các bạn cần giải quyết bài toán ở những con số lớn, thì có thể nội dung bài viết này sẽ đem lại nhiều giá trị cho các bạn. Bên cạnh đó, chúng ta cũng thấy được rằng Array, Dictionary, Set của Swift đã được cải tiến hơn nhiều so với NSArray, NSDictionary, NSSet trong Foundation, vì vậy trong trường hợp sử dụng thông thường, chúng ta nên ưu tiên sử dụng các loại collection data của Swift hơn. Trong tương lai, khi các version Swift mới được phát hành, tốt độ của Array, Dictionary, Set còn có thể được nâng cao hơn nhiều nữa. Hi vọng bài viết này mang lại cho các bạn những thông tin bổ ích về các loại collection data trong Swift.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!