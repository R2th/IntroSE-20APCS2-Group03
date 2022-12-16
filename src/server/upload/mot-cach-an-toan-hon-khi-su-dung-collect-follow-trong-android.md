![](https://images.viblo.asia/ae729fcb-b7ba-4295-8db1-80616b0be80c.png)

Hầu như mỗi lập trình viên về android đều có một vấn đề nan giải nhất đó là lập trình đa luồng và cách quản lý chúng sao cho gây ra ít chi phí cho bộ nhớ của điện thoại.
<br/>
Ở bài viết này mình sẽ không nói rõ về **coroutines** là gì mà mình chỉ tập trung vào hai hàm `Lifecycle.repeatOnLifecycle` và `Flow.flowWithLifecycle`

## 1. Lãng phí tài nguyên.
Google hướng dẫn chúng ta hãy dùng  `flow`  hoặc `suspend function` để gọi API ở  tầng dưới của ứng dụng xem thêm  [ở đây](https://developer.android.com/kotlin/coroutines/coroutines-best-practices#coroutines-data-layer) . 
Như chúng ta từng được biết khi tạo ra 1 `coroutine` thì nó sẽ chạy trong một `scope` . Điều này có thể không an toàn khi ta sử dụng  `CoroutineScope.launch`, `Flow<T>.launchIn` hoặc `LifecycleCoroutineScope.launchWhenX`  để thực thi coroutine đó trừ khi chúng ta sẽ tự huỷ bằng tay thông qua `Job` khi `activity` đi xuống  background .  Nên điều đó khiến cho các API nó vẫn chạy dưới nền nên gây ra sự lãng phí tài nguyên .

**Ví dụ**:  chúng ta có một đoạn code lấy vị trí người dùng và update lên trên map bằng `callbackFlow` :

![image.png](https://images.viblo.asia/dc063ffa-d2f2-411a-94eb-599f4fa88c0b.png)

Và trên `activity` ta sẽ chạy nó như sau : 
![image.png](https://images.viblo.asia/7cc49283-3963-4616-932d-0288834feeb5.png)

Theo như ở trên ta thấy đã sử dụng `lifecycleScope.launchWhenStarted` để thực thi `flow`   thì ta sẽ lấy được dữ liệu khi activity ở trạng thái `START` . Nhưng khi khi activity sang trạng thái `RESUME` thì các địa điểm mới sẽ không thể được cập nhật mặc dù `callbackFlow` vẫn liên tục gửi các địa điểm. Sử dụng `lifecycleScope.launch` hoặc `launchIn` API nó còn nguy hiểm hơn vì view  tiếp tục cập nhật khi nó ở trong brackground => Điều này có thể gây nên crash app . 

Để giải quyết điều này một cách thủ công thì ta sẽ huỷ bỏ khi activity bắt đầu đi xuống background để tránh lãng phí tài nguyên.
![image.png](https://images.viblo.asia/52f48c55-2dd1-4f75-88b4-d24111e723ca.png)

Chà nhìn có vẻ code chạy ổn hơn rồi đó nhỉ nhưng mà thật chán lần nào cũng phải xử lý kiểu này nó sẽ gây nên phình code. Vậy để khắc phục điều này hãy xem phần dưới nhé.
## 2. Lifecycle.repeatOnLifecycle
chúng ta xem hình dưới đây : 
![image.png](https://images.viblo.asia/ead265c4-e50e-464c-a83b-a4e5ef627506.png)

Theo như anh google nói thì hàm này cần chuyền vào 2 giá trị  : 
 > + State : là trạng thái của Vòng đời để khối lệnh block bên dưới có thể chạy ,nó sẽ bị huỷ khi đi xuống vòng đời bên duới . Và nếu vào lại trạng thái này thì block vẫn sẽ được gọi lại .
 > <br/>
 > + Block : là 1 là **block coroutine** để ta viết khối lệnh thực thi với state  . 

**Note**: có thể xem chi tiết ở  [link sau](https://developer.android.com/reference/kotlin/androidx/lifecycle/package-summary?hl=id#repeatonlifecycle)

Vậy chúng ta sẽ viết lại code ở phần 1 như sau sẽ đỡ phải huỷ bằng tay như sau : 
![image.png](https://images.viblo.asia/f501dc1c-9f3c-4d9b-aeca-154f8b1eb33c.png)

Như đã nói ở phần 1 thì `lifecycleScope.launch` nó sẽ huỷ khi view bị huỷ . Chúng ta sẽ chỉ quan tâm dòng `lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED)` theo như hình ảnh ở trên anh google nói nó sẽ bị huỷ khi xuống vòng đời ở dưới, nên nó sẽ bị huỷ ở `onStop` xem hình dưới đây để rõ hơn : 

![image.png](https://images.viblo.asia/cf8b50aa-9da3-4327-a029-5058e084ffd0.png)


Vậy chúng ta sẽ đỡ lo việc lãng phí bộ nhớ rồi lại còn khỏi phải xử lý thông qua `Job` nữa. Đồ ăn sẵn của google thật là ngon mà :hugs::hugs:

>**Note** :
Bạn có thể xem sơ đồ dưới đây để hiểu rõ hơn nhé về sự khác biệt hai thằng :
![image.png](https://images.viblo.asia/21bfa91d-d8f1-436a-9fb5-e1cde8b00285.png)


## 3. Flow.flowWithLifecycle
Ở mục 2 ta đã nói về `Lifecycle.repeatOnLifecycle`  thì thằng thứ 3 này nó cũng giống như thằng hai chỉ  là phục vụ cho việc clean code hơn . Cùng xem google nói gì về nó nhé .
Đầu tiên là cấu trúc : 
![image.png](https://images.viblo.asia/b08bac88-c464-4ff4-9d27-34a75c72e5c6.png)

Tiếp theo là kiểu trả về : 
![image.png](https://images.viblo.asia/8562b6ef-807e-4026-af15-1506c59853c1.png)

Theo như nó nói thì `flowWithLifecycle`  là một extension function  cần 2 biến đầu vào và trả về 1 `flow` : 
> + `lifecycle` : vòng đời của flow làm việc chắc là vòng đời của view rồi . 
> + `minActiveState`: Trạng thái của vòng đời để flow gọi collect . 

<br/>

Từ những cái trên theo mình hiểu là  nó giống như đang setup 1 cái flow vậy . Nó sẽ setup flow đó sẽ gắn với vòng đời nào (của view, fragment , activity . hay dialog ) sau đó thì nó sẽ quy định khi nào sẽ lắng nghe (hay là collect) của flow thông quan biến `minActiveState` . 
Vậy với cái này mình sử dụng với 1 flow thì nhìn có vẻ clean code hơn . 
Sửa lại ví dụ trên với `flowWithLifecycle` nhé :

![image.png](https://images.viblo.asia/f68b14f8-b1bf-4e2b-b7b4-065f683733d3.png)

Nhìn có vẻ dễ hiểu hơn chút rồi . 
#### Bổ sung  : 
Cái này  cũng tuỳ style code mỗi người . Theo mình thấy nếu chỉ gọi 1 Flow thì sẽ dùng `flowWithLifecycle` còn về khi sử dụng nhiều flow để code thì mình nên sử dụng `lifecycle.repeatOnLifecycle` hơn nó sẽ nhìn tường minh hơn . Có ví dụ cho mấy bạn luôn : 
![image.png](https://images.viblo.asia/4f8dd1ef-46d7-48be-8970-5cdf23742ff8.png)

Đến đây cũng khá dài rồi mình xin dừng ở đây nhé. Nếu các bạn cảm thấy bài này ổn thì cho xin 1 vote để có động lực viết bài sau setup `stateFlow` với `repeatOnLifecycle` này ^^

Nguồn : https://medium.com/androiddevelopers/a-safer-way-to-collect-flows-from-android-uis-23080b1f8bda