## 1. Giới thiệu
Chào các bạn hôm nay mình xin giới thiệu về MVI (Model-View-Intent), một partern mới nhất của Android. Nó được lấy cảm hứng từ [cycle.js ](https://cycle.js.org/)của André Staltz (một framework xây dựng reactive applications trên javascript) hay Redux js là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng, và được [Hannes Dorfmann](http://hannesdorfmann.com/), người đầu tiên áp dụng trên Android. 
##  2. Tại sao là MVI?
Hiện nay hai mô hình được sử dụng phổ biến nhất trên lập trình android là MVP và MVVM chúng thường được sử dụng cùng với RxJava. Những mô hình này thực sự rất tốt đã được công nhận và kiểm chứng rất nhiều, nhưng nếu xem xét kĩ càng chúng ta đang áp dụng mô hình này sau đó áp dụng nó với Reactive Programming. Khi chúng ta làm điều đó, rất có thể chúng ta không thể sử dụng hết tất cả các chức năng của Reactive Programing một cách đầy đủ nhất. Không sai khi sử dụng MVP hay MVVM với RxJava, nó giúp ta xử lí chương trình một cách tuyệt vời hơn. Nhưng nếu chúng ta có thể đồng bộ hóa chúng thì tại sao không?

MVI được hình thành và được thiết kế riêng cho Reactive Programing. Không giống các mẫu thiết kế khác, tất cả các lớp và tương tác giữa chúng được tạo thông qua stream. Trong MVI, data flow của chương trình chỉ theo một hướng. Điều này làm cho việc thử nghiệm và gỡ lỗi ứng dụng trở nên dễ dàng vì các đầu vào và đầu ra của một thành phần hoặc chức năng nhất định luôn được xác định hoặc có thể đoán trước được.

## 3.Ý tưởng
Cũng giống như hai mô hình MVP và MVVM, MVI cũng dựa trên khuôn mẫu của MVC. MVC được đặc trưng bởi Controller: một thành phần thao tác các phần khác, cập nhật chúng cho phù hợp bất cứ khi nào người dùng thực hiện một hành động.

![](https://images.viblo.asia/558e12e6-b6ad-4604-84c5-3b5a9c2b4895.png)

Ta thấy bộ điều khiển (Controller) không tương thích với Reactive idea bởi nó là thành phần chủ động (điều khiển trực tiếp view).Theo cycle.js, MVI vẫn giữ ý tưởng của MVC và đồng thời tránh điều khiển chủ động, bởi theo nguyên lí của Reactive chúng ta cầm có một luồng dữ liệu đơn một chiều để thiết lập các trạng thái có thể dự đoán được, dẫn đến code sạch hơn, có thể duy trì và ít lỗi hơn.

![](https://images.viblo.asia/bf894830-c8df-40fa-b69e-6cb0d072435c.png)

Bạn có nhìn thấy một luồng một chiều? Chu kỳ? Câu hỏi tiếp theo là làm thế nào để chúng ta thiết lập một vòng tròn như vậy? Vâng, như bạn đã thấy ở trên, máy tính hay thiết bị di động lấy một input và chuyển nó sang output (view). User (người dùng) nhìn thấy đầu ra từ thiết bị và lấy nó làm đầu vào và tạo ra kết quả (các sự kiện của UI như click, scroll ...) mà sau đó sẽ lại là đầu vào cho thiết bị. Vì vậy, khái niệm về lấy một đầu vào và có một đầu ra có vẻ là quen thuộc, phải không? Vâng, đó chính là một function.

Vì vậy, những gì chúng ta về cơ bản muốn có là một chuỗi các chức năng như thế này:
![](https://images.viblo.asia/70d5a452-5edf-4303-bb11-50129bc85745.png)

**intent ()** : Chức năng này lấy dữ liệu đầu vào từ người dùng (ví dụ các sự kiện UI, giống như các sự kiện click, ..) và translate thành action sẽ được truyền như là tham số cho model () . Mục đích của intent chỉ đơn giản mô tả ý định, hành động hoặc lệnh do người dùng tạo ra khi họ tương tác với ứng dụng 

**model ()** : Lấy kết quả từ  intent () làm đầu vào để thao tác với model. Đầu ra của hàm này là một model mới (trạng thái đã thay đổi). 

**view ()** : Phương thức này lấy mô hình được trả về từ hàm model () và cho nó như là đầu vào cho view () . Sau đó, view chỉ hiển thị model này bằng cách nào đó.

![](https://images.viblo.asia/e96a145d-0be3-4372-868f-971008b69ab1.png)

Bạn có thể tham khảo chi tiết tại : https://cycle.js.org/model-view-intent.html 
## 4.MVI với Android 

![](https://images.viblo.asia/845c9dbb-4248-4b62-b00e-cf5d06d04605.png)
### 4.1 Tổng quan
Trên hình ta có thể thấy mô hình MVI có hai phần chính. **ViewModel** và **View**

**View** (User Interface) được tách thành hai thành phần riêng biệt: nghe và hiển thị . Công việc của phần lắng nghe là lắng nghe người dùng khi thao tác với ứng dụng và phát ra ý định của người dùng cho **ViewModel** để lắng nghe. Công việc của phần rending là để hiển thị trạng thái lên màn hình (ví dụ như danh sách hiển thị, loading, ....)

Ta có thể thấy công việc lăng nghe intent và việc render hoàn toàn độc lập với nhau,  phần lắng nghe chỉ do người dùng ,phần render chỉ lắng nghe khi có viewstate đươc phát ra từ viewmodel. 

Một ví dụ đơn giản, khi ta scroll recycleview với mục đích loadmore ,thì chúng sẽ không tự động load tiếp dữ liệu, nó chỉ cần phát một intent (ý định) là có sự kiện scroll từ người dùng, nếu sự kiện này cần thiết nó sẽ được chuyển tiếp vào phần bên trong xử lí. Phần rendering cũng không do người dùng, nó chỉ rendering khi có viewstate được phát ra từ viewmodel
![](https://images.viblo.asia/9731ebf6-c80c-4dac-80df-b6cd7afc0785.gif)

Từ những đặc điểm trên view chỉ có hai phương thức sau: phát ra intent, render view hai phương thức hoàn toàn độc lập với nhau :
```
public interface MviView {
  Observable<MviIntent> intents();    

  void render(MviViewState state);    
}
```
Tương ứng Viewmodel cũng có hai và chỉ hai phương thức, đầu vào là intent đầu ra là các viewstate :
```
public interface MviViewModel {
  void processIntents(Observable<MviIntent> intents);

  Observable<MviViewState> states();
}
```

ViewModel sẽ xử lí các intent đã được phát ra từ người dùng , và phát ra các ViewState để View hiển thị nếu có thay đổi
### 4.2 Data Flow
Trong MVI, User cũng là một phần của luồng dữ liệu, giống như một funtion lấy dữ liệu từ phần trước và phát ra sự kiện mới. Người dùng nhận được một input-màn hình(view) từ ứng dụng và sự kiện ouputs (chạm, nhấp, cuộn ...).  

Sau khi người dùng tương tác với ứng dụng nó tương ứng với intent (ý định). Những intent đó thông qua bộ chuyển đổi (Intent Interpretor) thành các action, nó được định nghĩa các logic sau đó được chạy trong Processor. Trong ViewModel chỉ có Processor (phần xử lí logic của action) tương tác với dữ liệu ( Repository). 

Với mỗi action được thực hiện xong sẽ phát ra một kết quả (result) có thể là sucess, failed, hay gì gì gì đó,...

Sau đó nó sẽ đi qua bộ Reducer? Nếu bạn biết đến Redux thì cũng đã nghe đến khái niệm Reduce, nó là một function có đầu vào với hai tham số là viewstate trước đó và một action, với đầu ra trả về viewstate mới. Trong mvi với android nó cũng tương tự như thế .
![](https://images.viblo.asia/b9d7cb47-f898-49d4-a313-e0d6b1438a60.png)

Trong Rx có toán tử scan(), hỗ trợ rất tốt cho việc này.
Sau khi tạo ra state mới sẽ được view render lên màn hình. Người dùng tiếp tục thao tác với app nó sẽ đi lại vòng tròn như thế.

Ta thấy trong MVI, dữ liệu chỉ có thể được truyền đi thông qua luồng dữ liệu và luồng dữ liệu này chỉ có thể đi một chiều. Mỗi thành phần của kiến trúc chỉ biết loại dữ liệu mà họ đang nghe và chúng sẽ làm gì với nó. Cách duy nhất để các thành phần giao tiếp với nhau là bằng cách truyền một đối tượng vào luồng dữ liệu.

-> Không có bất kì thành phần nào tác động trực tiếp lên nhau, mà chúng chỉ thay đổi hay xử lí khi nhận được data từ thành phần khác phát ra
## 5.Tổng kết
Tóm lại MVI là một mô hình mới được phát triển để lập trình Reactive Programing trên Android, nó cần thời gian để kiếm chứng. Ở bài viết này mình chỉ giới thiệu về MVI và ý tưởng, flow của mô hình này. Ở bài viết sau mình sẽ hướng dẫn triển khai chi tiết MVI trên Android. Cảm ơn các bạn.