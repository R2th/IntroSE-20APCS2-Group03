Nếu bạn là người đã từng sử dụng RxSwift chắc hẳn đã biết đến RxCocoa, và chắc hẳn bạn cũng nghe về những ưu điểm của RxSwift như là code ít hơn, xử lý lỗi dễ dàng hơn, xử lý tác chạy đồng thời đơn giản hơn, .... (nói chung là rất nhiều thứ hơn) Vậy `RxCocoa` là cái gì, nghe cũng giống `RxSwift` đấy, tại sao chúng ta lại còn cần `RxCocoa` khi đã có `RxSwift` thần thánh? Và tại sao đã có `Observable` còn sinh ra thêm các khái niệm như `Single`, `Maybe`, `Completable` hay `Driver`, ... (chắc để làm khó lập trình viên :)) )
Nếu bạn có những câu hỏi như vậy trong đầu thì có lẽ bài viết này sẽ hữu ích với bạn đó. Bài viết này sẽ giúp bạn giải đáp phần nào những câu hỏi trên và một phần là PR cho `Driver`

![Các ưu điểm Reactive được liệt kê trên trang chủ của ReactiveX](https://images.viblo.asia/5560802d-9bb9-477d-a46a-a958ad70a776.png)

Đầu tiên để trả lời được khúc mắc trên thì hãy làm rõ là `RxSwift` không phải là cái gì đó thần thánh và hoàn hảo cả, nó chỉ hoàn hảo khi ta đặt nó đúng nơi, đúng chỗ, đúng trường hợp. `RxCocoa` cũng được xây dựng từ `RxSwift` và nó cũng là một phần của `RxSwift`, nó có thêm các phần mở rộng để giúp chúng ta làm việc với UI một cách dễ dàng hơn.

### Trait
OK, nếu bạn đã rõ là chúng là 2 thư viện hỗ trợ lẫn nhau thì tiếp đến hãy tìm hiểu về những khái niệm đã nêu ở đầu `Single`, `Maybe`, `Completable` hay `Driver` là gì? Tất cả chúng được gọi chung là `Trait`, định nghĩa một các máy móc theo sách giáo khoa thì có thể định nghĩa là: "Trait là một wrapper struct với một thuộc tính là một Observable Sequence nằm bên trong nó. Trait có thể được coi như là một sự áp dụng của Builder Pattern cho Observable." Còn nếu bạn thấy định nghĩa trên hơi khó hiểu thì có thể nghĩ rằng `Trait` là một `Observable đặc biệt`. Tại sao nó đặc biệt ư? vì `Trait` có các đặc điểm khác với `Observable`
* Trait không emit ra lỗi.
* Trait được observe và subscribe trên MainScheduler.
* Trait chia sẻ `Side Effect` (Tiện thể giải thích qua qua thì `Side Effect` là những thay đổi bên ngoài `scope` mà không làm ảnh hưởng đến `scope`, ví dụ: chính là lúc bạn gọi .do(onNext: //sthg here))


Đây là khái niệm chung của `Trait` và tất nhiên các Trait khác nhau sẽ có các đặc điểm khác nhau tạo nên sự đa dạng và giúp chúng ta có thể sử dụng chúng trong các trường hợp khác nhau. Để chứng minh cho luận điểm trên, chúng ta sẽ thử tìm hiểu về `Single`. `Single` có đặc tính là nó sẽ chỉ emit ra hoặc là `.success(value)` hoặc là `.error` (thực chất là `.success(value)` là kết hợp của `.next` và `.completed`. Dựa vào đặc điểm này thì `Single` có thể sử dụng trong các trường hợp mà event được emit ra rời rạc và chỉ có success hay error như là sử dụng để emit event khi call API, khi loading dữ liệu từ disk, khi thực hiện downloading data, ... Hay `Completable` với đặc điểm là chỉ emit ra `.completed` hoặc `.error` sẽ phù hợp với các tác vụ mà bạn lại chỉ quan tâm đến khi nào tác vụ đó hoàn tất, điển hình là ghi dữ liệu vào file.

![](https://images.viblo.asia/44b9c9af-908e-4614-904b-4c23b9289614.png)

Tóm gọn thì `Observable` giúp ích chúng ta rất nhiều và `Trait` còn khiến nó tốt hơn. Giống như `RxSwift` và `RxCocoa` luôn được sử dụng song song vì chúng bổ trợ lẫn nhau rất tốt.

### Driver

![](https://images.viblo.asia/e608e8bc-25dd-4278-b032-bf700f4d687e.jpg)

Phần còn lại của bài viết, hãy tìm hiểu về `Driver`, nó cũng được coi là một `Trait` và là một thành phần của `RxCocoa`. `Driver` không khác gì `Observable` cả, chỉ khác là nó không emit ra lỗi và nó luông thực hiện trên `Main`. Những đặc điểm này thực sự `tuyệt vời` khi chúng ta làm việc với UI. Tại sao ư? Vì Driver sinh ra để làm việc đó. Đừng sử dụng `Observable` rồi sau đó `subscribe` trên ViewController để hiển thị Alert bời vì có thể bạn sẽ quên observe trên `MainScheduler` và nó có thể sẽ gây crash đó. Và nếu bạn sử dụng Observable như một output và lắng nghe nó thì hãy cẩn thận vì có thể sẽ bị `duplicate` đó vì Observable không có sẵn `share`. Chính vì vậy mà `Driver` lại phù hợp và cực kỳ phù hợp khi sử dụng với UI.

### Kết luận 
Qua bài viết rất mong có thể làm rõ cho các bạn được vấn đề "Observable sinh ra không phải làm tất cả mọi thứ", trong ReactiveX sinh ra rất nhiều những khái niệm để bổ trợ và để đảm đương các phần việc khác nhau, nên nếu hiểu rõ được chúng thì chúng ta có thể tìm ra được cách sử dụng tốt nhất. Bài viết hoàn toàn là quan điểm và đánh giá cá nhân nên nếu có gì chưa được chính xác rất mong comment "nhẹ nhàng" và "tình cảm", mình sẽ tiếp thu.