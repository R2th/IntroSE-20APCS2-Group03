# I. Tổng quan:
"The Observer pattern done right. ReactiveX is a combination of the best ideas from the Observer pattern, the Iterator pattern, and functional programming."

Trên đây là concept chính của RxJava
    
Mình có thể tạm dịch nó là: “ Observer pattern đúng, ReactiveX là sự kết hợp những ý tưởng tốt nhất từ Observer pattern, Iterator pattern và functional programing".

Nếu RxJava chỉ đơn thuần là concept như thế thì hẳn là chỉ cần một đứa trẻ biết đọc là chúng có thể nói vanh vách rằng RxJava là gì. Nhưng mọi chuyện không đơn giản như thế.
Ở trong concept trên chúng ta thấy 3 khái khái niệm đó là observer pattern, iterator pattern và functional programming. Vậy 3 cái trên nó là cái gì, dưới đầy chúng ta cùng tìm hiểu chúng
## Observer pattern!
Đây là hình ảnh mô tả Observer pattern mà mình sưu tầm được
[](https://images.viblo.asia/efd21f81-c3f5-413c-ae15-8f44b96693be.jpg)
   Đây là định nghĩa mình tham khảo trên wikipedia về Observer pattern
> The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods.
> 
Có thể hiểu rằng Observer pattern là một design pattern thuộc nhóm Behavioral là một mẫu thiết kế hành vi để cho phép một đối tượng cho phép các đối tượng khác đăng ký theo dõi nó. Khi trạng thái của đối tượng thay đổi nó sẽ gửi thông báo cho tất cả các đối tượng theo dõi nó.

Một ví dụ trong thực tế để các bạn có thể hiểu hơn về Observer pattern là vào cuối tháng chúng ta ai cũng theo dõi tiền lương của mình :smile: và khi có lương ngân hàng sẽ thông báo cho chúng ta. Chúng ta có thể rút hoặc để tiết kiệm đó là việc của chúng ta. Như vậy ngân hàng đóng vai trò là đối tượng được theo dõi và chúng ta là người theo dõi. Bạn hãy tưởng tượng các thành phần trong Observer pattern sẽ tương tự như ví dụ trên nhé :smile: 
## Iterator pattern
Hiểu đơn giản thì Iterator pattern thì đây là cách pattern mà cho phép chúng ta duyệt một mảng của một đối tượng mà không làm lộ ra cách thức biểu diễn bên trong của nó. Vậy nó có ý nghĩa gì trong RxJava? Ở các phần sau chúng ta sẽ có câu trả lời cho câu hỏi này.
## Functional Programming:
Theo cách hiểu của mình functional programming là cách lập trình mà hạn chế sử dụng các biến state để lưu lại trạng thái của chương trình. Nói cách khác là thay vì nó sử dụng các biến để lưu trạng thái thì nó sử dụng các hàm thuần khiết (Hàm chỉ tác động lên các tham số truyền vào mà không sử dụng biến bên ngoài) để biến đối tượng này thành đối tượng khác. Chúng ta sẽ thấy ý tưởng của functional programming xuất hiện trong  RxJava ở  các phần sau.
# II. RxJava
## Định nghĩa
ReactiveX là một thư viện để viết các chương trình không đồng bộ dựa trên sự kiện bằng cách sử dụng các chuỗi có thể quan sát được
## Observable
Như đã nói ở phần trên observable là cái mà sẽ phát ra item để observer xử lý.  Ví dụ chúng ta có 2 công việc đó là A và B. B cần kết quả trả ra từ A để làm thực hiện công việc của mình. Vì vậy khi bất kì khi nào A trả ra giá trị thì B sẽ thực hiện. Việc xử lý không đồng bộ có lợi ích đối với những task mà không phụ thuộc vào nhau. Thông thường chúng ta sẽ phải thực hiện tuần tự từng task. Và task sau muốn thực hiện phải đợi task trước hoàn thành xong như vậy thời gian thực hiên tất cả các task là tổng thời gian thực hiện từng task. Với cách tiếp cận của asynchronous thì các task không phụ thuộc vào nhau sẽ chạy song song nhau từ đó bạn chỉ mất thời gian thực hiện tất cả các task bằng thời gian thực hiện task dài nhất.

Dưới dây là ví dụ sử dụng RxJava:
![](https://images.viblo.asia/3230eddc-c634-4899-889f-512f96aedbdc.png)

Tùy theo các phương thức override của phương thức subscribe thì giá trị trả về của phương thức subscribe sẽ khác nhưng về cơ bản thì nó sẽ chạy qua 2 phương thức đó là onNext() khi Observable phát ra item và khi quá trình phát item kết thúc, nếu có lỗi xảy ra thì sẽ chạy vào onError, nếu không có lỗi gì xảy ra thì sẽ chạy vào onComplete. Phương thức onSubscribe sử dụng để hủy subscribe.

## Operator
Chúng ta hãy xét đến ví dụ dưới đây
Đầu tiên, ta sẽ tạo ra một Observable
![](https://images.viblo.asia/9c4dbe69-afc6-4749-872f-6db4bea1af06.png)
Ở đây chúng ta thấy xuất hiện range. Đây cũng là một operator để tạo nên observable. Đến thời điểm này chúng ta hãy bơ nó đi mà hãy hiểu một cách máy móc rằng nó sẽ tạo ra một observable mà phát ra các item có giá trị từ 1 đến 10 (1,2,3,4,5,...).
Và chúng ta Log ra chúng:
![](https://images.viblo.asia/a7475c0d-7752-4c95-8150-f0b6da8e81a6.png)
Ở đây chúng ta dùng fillter để lọc ra những số là số chẵn sau đó chúng ta mới emit ra để observer xử lý chúng.

Trên đây chỉ là một ví dụ rất đơn giản để cho mọi người hiểu Operator nó là gì.
RxJava là một hàm tác động lên Observerble để khiến chúng phát ra các item hoặc tạo thành một observable khác thỏa mãn nhu cầu của chúng ta
RxJava có rất nhiều operator giúp chúng ta xử lý đến 96,69 các nhu cầu :smile_cat:. Operator thật sự rất mạnh mẽ, chúng giúp biến Observable này thành một observable khác để thỏa mãn yêu nhu cầu của chúng ta và với số lượng rất đồ sộ nó gần như có thể làm mọi việc, bản thân tôi cũng không thể nhớ hết được tất cả các operator. Tôi có thể kể ra một số nhóm operator như sau:

* Creating Observables: Operator để tạo các Observable như create, just, from, range, interval,...
* Transforming Observables: Nhóm operator để thay đổi các item được phát ra bởi một Observable như map, flatMap, groupBy,....
* Filtering Observables: Nhóm operator dùng để chọn lọc các item phát ra từ một Observable gốc như fillter, debound, skip,...
* Combining Observables: Nhóm operator làm việc với nhiều Observable gốc để tạp nên một Observable duy nhất như zip, switch, joint..
* Error Handling Operators: Nhóm operator dùng để lấy lại các thông báo lỗi từ một Observable như catch, retry,...
* Observable Utility Operators: Nhóm operator hữu ích để làm việc với Observable như delay, do , timeout,...
* Conditional and Boolean Operators: Nhóm toán tử dùng để đánh giá một hoặc nhiều Observable hoặc các item phát ra bởi Observable như All, Contains,...
* Mathematical and Aggregate Operators: Nhóm toán tử hoạt động trên toàn bộ chuỗi item phát ra bởi một Observable như Concat, Count, Max,...
* Operators to Convert Observables: Gốm operator To để convert một Observable trong một object khác hoặc một data structure
 
 Do số lượng opeartor rất lớn nên tôi không thể nêu ở đây. Cụ thể về các nhóm operator và các operator các bạn có thể tham khảo thêm ở [đây](http://reactivex.io/documentation/operators.html)
## Single:
Một single giống như một Observable nhưng thay vì phát ra một chuỗi các item nó chỉ phát ra một item duy nhất. Chính vì điều này nên thay vì subscribe có 3 phương thức thì đối với single chỉ trả ra onComplete() hoặc onError() thôi.

## Scheduler
Theo mặc định thì tất cả Observable , Subscribe và Operator đều hoạt động trên cùng một thread nơi mà subscribe được gọi
    Nhưng khi rõ ràng chúng ta không đơn thuần chỉ muốn tất cả chúng chạy trên cùng một thread mà chúng ta muốn nhiều hơn thế
    Scheduler sinh ra để giúp chúng ta quy định từng thành phần được chạy trên luồng nào thông qua 2 phương thức
    + subscribeOn(): Phương thức này sẽ định nghĩa thread mà Observable sẽ được tạo. Nó sẽ được gọi khi có một observer subscribe observable vì thế vị trí của nó trong thứ tự thực hiện hàm là không quan trọng
    + observerOn(): Tất cả những gì đằng sau phương thức observerOn() cho đến khi phương thức ObserverOn tiếp theo được gọi hoặc kết thúc đén subscriber.
    Có các Scheduler sau:
+ immediate(): Tạo ra và trả về 1 Scheduler để thực thi công việc trên thread hiện 
+ trampoline(): Tạo ra và trả về 1 Scheduler để sắp xếp 1 hàng chờ cho công việc trên thread hiện tại để thực thi khi công việc hiện tại kết thúc.
+ newThread(): Tạo ra và trả về 1 Scheduler để tạo ra 1 thread mới cho mỗi đơn vị công việc.
+computation(): Tạo ra và trả về 1 Scheduler với mục đích xử lý các công việc tính toán, được hỗ trợ bởi 1 thread pool giới hạn với size bằng với số CPU hiện có.
+ io(): Tạo ra và trả về 1 Scheduler với mục đích xử lý các công việc không mang nặng tính chất tính toán, được hỗ trợ bởi 1 thread pool không giới hạn có thể mở rộng khi cần. Có thể được dùng để thực thi các tiến trình bất đồng bộ không gây ảnh hưởng lớn tới CPU.

#     III. RxAndroid:              
 RxAndroid là một kế thừa của RxJava. Nó cung cấp một scheduler để run code trên main thread của Android. Nó cũng cung cấp khả năng tạo một scheduler mà chạy trên Android handler class. Với scheduler này , bạn có thể định nghĩa một observable làm việc trên một background thread , và post kết quả của chúng trên main thread. Điều này cho phép ví dụ để thay thế một AsyncTask với RxJava.
 Để sử dụng RxJava ta cần add thư viện của RxAndroid trong build.gradle level app.
#     IV. Một ví dụ về lợi ích của RxJava
Sau khi chỉ đọc qua những thứ ở trên, bạn có thể cảm giác như Rx là một mỡ hỗn độn và chúng ta đang tự làm khó mình khi mà các công cụ chúng ta vẫn hay làm trước kia vẫn có thể giải quyết tốt vấn đề của chúng ta và việc dùng RxJava là vô nghĩa. Nhưng có liệu những công cụ chúng ta thường dùng để giải quyết bài toán liệu nó đã là best choice.

Tôi lấy ví dụ như thế này: Giả sử bạn làm việc với một đài truyền hình chẳng hạn, họ thuê bạn viết cho họ một app xem tivi trức tuyến dựa trên api có sẵn, yêu cầu của họ là lấy tất cả các kênh mà họ đã trả về trong api về và hiển thị nó lên trong app của bạn. Đơn giản quá phải không, chúng ta chỉ cần dùng request data về và đợi data về rồi hiển thị lên cho người dùng. Nếu chỉ có thế thì quả  thực so easy. Nhưng ngặt nỗi, một ngày đẹp trời họ lại muốn rằng ứng dụng phải hiển thị các kênh theo nhóm ngôn ngữ, Tiếng Việt, Tiếng Anh, Tiếng Trung, Tiếng Nhật. Đến đây các bạn sẽ giải quyết như thế nào. Ở đây cách giải quyết đơn giản nhất là mà ai cũng có thể nghĩ đến là trước khi hiển thị lên người dùng phải xử lý logic để phân ra từng loại. Chưa cần làm thử cũng biết nó rất lằng nhằng rồi, thậm chí nó có thể ảnh hưởng đến cấu trúc code mà bạn đang xây dựng nhưng với Rx thì mọi chuyện thật đơn giản. Operator GroupBy có thể giúp bạn. Nó có thể tách các Item phát ra theo nhóm và mọi thứ sẽ rất đơn giản phải không.

Trên đây chỉ là một ví dụ nhỏ cho sự tiện dụng của RxJava trong thực tế. Như tôi nói còn rất nhiều operator nó có thể giúp bạn biến những vấn đề tưởng chừng như phức tạp thành một vấn đề quá chi là đơn giản để giải quyết. 
# VII. Kết
Thông quan bài viết này tôi đã giới thiệu cho các bạn về RxJava và RxAndroid. Hi vọng phần nào giúp các bạn hiểu hơn về RxJava
Cảm ơn các bạn đã đọc bài viết.