### Giới thiệu
"Sealed classses được sử dụng để biểu diễn các hệ thống phân lớp bị hạn chế..."
######
Như vậy, Sealed Classses rất hữu ích khi mô hình hóa trạng thái trong các workflows ứng dụng khác nhau. Chúng có thể đại diện cho các hoạt động mạng, các tính năng có sẵn, đại diện cho UI...
######
Tôi đã tận dụng điều này để đơn giản hóa một vài trường hợp sử dụng khác nhau trong ứng dụng của tô và tôi đã chia sẻ một cách sử dụng như vậy và muốn chia sẻ một cách sử dụng khác.
### Những cái thường gặp
Chúng ta thường triển khai một MVVM pattern cho các màn hình mới. Nói chung, chúng ta tạo một lớp ViewModel và sử dụng DataBinding để liên kết dữ liệu ViewModel của chúng ta với UI.
###### 
Theo thời gian, chúng ta bắt đầu nhận thấy một số pattern phổ biến trong mỗi màn hình:
* Ban đầu hiển thị Loading
* Xử lý lỗi phổ biến
* Cung cấp một trạng thái rỗng có ý nghĩa khi không có dữ liệu
* Hiển thị dữ liệu

Rõ ràng là chúng ta có thể hưởng lợi từ một số cơ chế tiêu chuẩn để mô hình hóa và hiển thị những trạng thái này.
### Giải pháp
> Mô hình hóa UI States với Sealed Classes
>
Chúng ta đã tạo hệ thống lớp phân cấp như sau:
![](https://images.viblo.asia/319040ec-7378-4427-ae7d-59d270e86d6f.png)

######
Sau đó chúng ta có thể chuyển đổi qua các trạng thái này trong vòng đời của ViewModel

```
Hiển thị UI States
```
Để hiển thị trạng thái này cho đối tượng Binding hoặc bất kỳ Observers cần thiết nào khác, chúng ta dựa vào một ObservableField

![](https://images.viblo.asia/0dc3e47e-e6cb-48d2-9e3a-32ac19962ba3.png)

Khi dữ liệu của chúng ta đã được tải hoặc xảy ra lỗi, chúng ta chuyển trạng thái bằng cách đặt gía trị phù hợp cho Observable

![](https://images.viblo.asia/5e7918d4-c3c7-4d83-a0d2-28e22a4901c2.png)

Tùy thuộc vào cách mô hình hóa luồng dữ liệu của chúng ta, chúng ta có thể xử lý các chuyển đổi trạng thái này ở một nơi duy nhất, chẳng hạn như trong khối đăng ký của chuỗi rxjava observable hoặc chúng ta có thể xử lý nhiều điểm lỗi.
###### 
Trong hầu hết cách trường hợp, chúng ta có thể xử lý các chuyển đổi trạng thái này trong một tập hợp các vị trí rất hạn chế và dựa vào 1 luồng dữ liệu và chuyển đổi
```
Binding UI States
```
Một khi UI state được cập nhập, chúng ta đã sẵn sàng cập nhập các thành phần views dựa trên UI State
###### 
Để đơn giản hóa và thống nhất quy trình này, chúng ta sẽ tạo một nhóm BindingAdapters để bao quát phần lớn các thường hợp sử dụng phổ biến của chúng ta
![](https://images.viblo.asia/cc7556b8-04fc-414c-93c3-1c1ec25578aa.png)

Với các BindingAdater này, việc kết nối các thành phần View riêng lẻ với UiState của chúng ta trở nên đơn giản và nhất quán trên các màn hình

![](https://images.viblo.asia/c3586437-3f83-43d2-bed4-06f5696d73ba.png)

### Tổng kết
Pattern này đã giúp mang lại tính nhất quán và hiệu quả cho cách chúng ta mô hình hóa và xây dựng các trạng thái UI phổ biến này cho các màn hình mới trong ứng dụng của chúng ta.

Nguồn: [Edacity](https://engineering.udacity.com/simplifying-ui-states-with-kotlin-sealed-classes-and-databinding-2128112d0631)