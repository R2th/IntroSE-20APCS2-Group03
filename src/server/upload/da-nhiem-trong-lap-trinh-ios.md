# Multitasking 
* Đa nhiệm là một phần không thể thiếu trong lập trình một ứng dụng, giả sử nếu chương trình của bạn không có đa nhiệm thì sẽ như thế nào. Tưởng tượng bạn như một ứng dụng và việc coding mỗi ngày của bạn được ví như là ứng dụng đang được chạy. Vậy khi đang coding bạn cảm thấy đói quá, nhưng nếu bạn chạy đi mua đồ ăn mà quán ăn đó lại cách xa chỗ bạn làm 5-6km vậy bạn sẽ xử lý như nào. Chạy đi mua về  rồi code tiếp, nhưng chạy xa thế thì lại không có thời gian code xong đúng deadline cho sếp. 


* Vậy giải pháp là gì chắc mọi người đều không qua xa lạ đó là nhấc em smartphone lên vào ngay ứng dụng foody hoặc now lên rồi order đồ ăn ngay và luôn :rofl::rofl::rofl:. 


* Vậy các bạn cũng có thể dễ dàng hiểu đa nhiệm cũng giống như chúng ta sẽ giao lại một nhiệm vụ cho một bên khác để thực hiện giúp chúng ta, song song đó chúng ta vẫn có thể thực hiện nhiệm vụ của mình một cách trọn vẹn. 


----

* Còn trong lập trình đa nhiệm có rất nhiều ứng dụng chúng ta có thể  sử dụng đa nhiệm để xử lý các tác vụ cần nhiều thời gian như dowload file ảnh hay là gọi api để đổ data về. Nếu không sử dụng thì chương trình của chúng ta sẽ rất nặng nề và sẽ phát sinh ra một số hiện tượng không mong muốn như delay giật lag các kiểu. Vì thế hôm nay mình sẽ giúp các bạn áp dụng đa nhiệm vào trong lập trình IOS.

# GCD Introduce
* GCD là viết tắt của từ Grand Central Dispatch và đây là một low-level API giúp chúng ta trong việc quản lý và thực thi các tác vụ bất đồng bộ. Với GCD chúng ta sẽ tăng được khả năng phản hồi của ứng dụng bằng cách chạy nền các tác vụ cần thời gian. Việc GCD được xây dựng giúp chúng ta dễ dàng thao tác với mô hình bất đồng bộ hơn là phải thao tác với các mô hình như threads hoặc locks.

* Vậy trước khi hiểu GCD vận hành như thế nào trong IOS chúng ta nên tìm hiểu qua bất đồng bộ trong IOS sẽ được xử lý như thế nào. Trong một ứng dụng IOS có thể bao gồm một luồng (one thread) hoặc nhiều luồn (mutiple threads). Và các luồng có thể chạy một cách độc lập và đồng thời với nhau. Công việc phân luồng chạy như thế nào hay chạy ra sao tất cả đều được quyết định bởi operating system. 

* Nhiều bạn sẽ tự hỏi liệu vậy một nhân thì sẽ chạy đa luồng được không. Mình cũng đã tìm hiểu qua thì một nhân vẫn có thể chạy đa luồng tuy có hơi rườm rà tí là nó phỉa thông qua một phương pháp tên là time-slicing. 

* Nó sẽ thực hiện một context switch hay có thể hiểu đơn giản là nó sẽ thực hiện công việc khác. Ví dụ dễ hiểu khi bạn phải vừa coding vừa chém gió vậy. Khi bạn đang code thì có thằng tới hỏi bạn sẽ dừng lại và chém gió với nó tí rồi lại code tiếp, hành động này được xem như một time-slicing.

* Còn với 2 luồng thì cũng với ví dụ trên nhưng bạn phân thân ra một thằng khác để chém gió còn lại bạn code nếu có nhiều luồng hơn bạn có thể xử lý rất nhiều task cùng một lúc hay trong lập trình người ta gọi đó là parallelism( song song đồng thời với nhau).

Còn đây là hình minh hoạ của việc chạy đa luồng: 
![](https://images.viblo.asia/89e99566-b181-4c4e-9163-b3ee5d498965.png)

* Vậy thì GCD hoạt động như thế nào. Chúng ta hãy hiểu đơn giản là GCD cũng dựa vào nguyên lý luồng như trên đề xây dựng ra. Nó sẽ quản lý shared thread pool. Bằng cách thêm những blocks code hay những function vào trong dispatch queues và GCD sẽ quyết định luồng nào sẽ xử lý các work này.

* Một điều lưu ý ở đây GCD sẽ quyết định có bao nhiêu luồng chạy song song phụ thuộc vào system cũng như tài nguyên trên máy của bạn. Nếu mấy bạn nhiều nhân thì việc chạy GCD sẽ rất tối ưu nhưng nếu bạn chỉ 1 nhân thôi thì nó sẽ chạy bất đồng bộ nhưng không đảm bảo đồng thời (parallism)

* Bây giờ chúng ta sẽ tìm hiểu qua các phần liên qua tới GCD như là: dispatch queues, queue opreation, type of queue, async && sync.

## Dispatch Queues
* GCD thực hiện thông qua một class đó là DispatchQueue. DispatchQueue sẽ như một hàng đợi khi bạn cần thực hiện công việc gì thì chỉ cần đẩy công việc đó vào hàng đợi này. Và chắc ai cũng biết hàng đợi theo nguyên tắc FIFO( First in First out) nên sẽ ưu tiên thực hiện công việc được đưa vào hàng đợi đầu tiên


* Dispatch queues là một thread-safe nên các bạn có thể hoàn toàn yên tâm trong việc chạy đa luồng mà không phát sinh race conditions.  

-----

## Queues Opeartion
*  Queues có hai cách vận hàng đó là serial và concurrent, 

* Đối với serial queue thì một task hay job sẽ được chạy trong một khoảng thời gian nhất định, nghĩa là thằng task 1 chạy xong thằng task 2 mới bắt đầu chạy tiếp và GCD sẽ là thằng đứng ra kiểm soát khoảng thời gian chạy của từng task.

![](https://images.viblo.asia/4a717fa3-9165-4c72-86dd-98a3ac7e0821.png)

* Còn với concurrent thì những task của các bạn sẽ có thể chạy một cách đồng thời, nhưng vẫn đảm bảo task được đưa vào đầu tiên sẽ là thằng start đầu tiên chứ không có chuyện start cùng lúc với nhau đâu nhé :D nên mọi người đừng hiểu lầm việc chạy đồng thời không có nghĩa là bắt đầu cùng lúc với nhau.  

* Và cũng như mọi khi thì GCD sẽ quản lý khi nào thì task start nếu 2 task được chạy trong cùng một khoảng thời gian thì GCD sẽ quyết định việc phân chia task cho các luồng khác nhau. Vậy nếu có 1 luồng thì như mình nói ở trên thay vì phân luồng thì sẽ thực hiện context switch để phân chia task ra.

![](https://images.viblo.asia/8a0ba44b-2f7c-486c-a0db-cf8b8c794b9d.png)

-----
## Type of Queues
* GCD cung cấp cho chúng ta 3 loại queues chính:

1.  Main queue: Chạy trên luồng chính (main thread) và đây là một serial queue. Và Queue này cũng là nơi chúng ta thực hiện các chứng năng chính cũng như thực hiện việc cập nhập giao diện (UI) sau khi một task hoàn thành xong  `DispatchQueue.main`
3.  Global Queues: Đây là một concurrent queues và ta có thể dùng nó ở bất kỳ đâu vì nó thuộc về hệ thống quản lý . Và nó có 4 mức độ ưu tiên là : high, default, low và background `DispatchQueue.global()`
4.  Custom queues: Do chúng ta tự tạo ra có thể là serial queue hoặc global queue. `DispatchQueue(label: "name_queue")`

## Synchoronous && Ansynchronous

* Cái này thì chắc hẳn các bạn đã quá quen thuộc với GCD cũng sẽ hỗ trợ việc này

* Synchoronous là thực hiện một cách đồng bộ có nghĩa là task này thực hiện xong mới thực hiện chức năng tiếp theo. Ta sử dụng câu lệnh dispatch sau : `DispatchQueue.sync(execute: )`

* Vậy còn ansynchronous thì task sẽ chạy một cách đồng bộ không phải đợi task xong rồi mới chạy chức năng tiếp theo. Ta sử dụng câu lệnh dispatch sau:
`DispatchQueue.async(excute: )`

# Handling GCD
* Giả sử mình có một trang web như Foody chẳng hạn, nếu bạn vừa mở ứng dụng lên thì có phải các image đồ ăn phải lấy trên Cơ sở dữ liệu về sau đó mới đẩy vào tableview. Nếu bạn chỉ thực hiện lấy ảnh về là load như bình thường thì khi ứng dụng bắt đầu chạy  sẽ đi qua func fetch ảnh từ CSDL đầu tiên, mà đối với quy tắc đồng bộ code sẽ chạy lần lượt, thì điều này có nghĩa là các func ở các line sau sẽ bị  ảnh hưởng ( có thể bị treo hoăc giật lag các kiểu) do ảnh quá nhiều và chưa tải về thành công. Vậy ở đây chúng ta sẽ áp dụng GCD để giải quyết vấn đề đó. Mình sẽ thông qua một ví dụ load một data url trên mạng về để minh hoạ cho các bạn cách ứng dụng GCD vào trong app của chúng ta như thế nào.

* Ở đây mình sẽ tạo một Button để handle sự kiện load image và một ImageView. Tiếp theo chúng ta sẽ tạo một queue và gán label cho nó. Và sau đó đơn giản là dispatch queue đó ra bằng câu lệnh `DispatchQueue.async`:  
![](https://images.viblo.asia/00ad23c8-80bd-4382-8f78-55f440c48374.png)
* Nhưng điều đáng lưu ý ở đây thì đây chưa phải là cách tối ưu nhất, các bạn có thể kiểm tra bằng cách mở Debug Navigator và chú ý và thanh Network. Mặc dù hình đã load xong nhưng image vẫn chưa hiện ra và ngay chỗ output trả về các bạn sẽ thấy những dòng cảnh báo như sau `UIView being called from background thread`:
![](https://images.viblo.asia/9a758329-dfd2-4bca-9502-37cef10f2ab3.png)

* Vậy như chúng ta đã tìm hiểu trước đó, thì việc thay đổi giao diện (UI) không nên chạy trên backgrond thread trong Global Queue như vậy mà chúng ta nên sử dụng Custom Queue kết hợp giữa global và main queue: 
![](https://images.viblo.asia/538647d4-8b41-4a0a-a8b9-a770c197c311.png)


* Vậy là chúng ta đã giải quyết được việc load hình ảnh một cách bất đồng bộ rồi :nerd_face::nerd_face::nerd_face: 

# Ending
* Việc xử lý bất đồng bộ trong một ngôn ngữ luôn là một phần hết sức quan trọng , vì chúng ta không phải chỉ làm việc với các dữ liệu có sẵn trên local mà chúng ta còn phải tương tác với các bên thứ 3, gọi api, send mail, gửi thông báo tự động,... những job này yêu cầu nhiều thời gian nên việc xử lý bất đồng bộ một cách chính xác sẽ làm cho performance của app chúng ta tăng lên một cách đáng kể và có thể hạn chế các bug không đáng có.


* Thật sự chia sẻ mình cũng chưa có kinh nghiệm nhiều về IOS cũng như mobile và thời gian hạn chế nên có sai sót gì mong mọi người có thể góp ý cho mình để những bài viết sau chất lượng hơn nữa nhé. Mình cũng xin cảm ơn mọi người đã dành thời gian đọc qua bài chia sẻ này của mình.

# References
https://www.raywenderlich.com/5370-grand-central-dispatch-tutorial-for-swift-4-part-1-2