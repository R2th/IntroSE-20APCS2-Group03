# Tăng performance cho ứng dụng Android
Phát triển ứng dụng cho hệ điều hành Android mang lại nhiều sự tự do cho các nhà phát triển. Tuy nhiên, các developer phải đối mặt với nhiều thử thách trong quá trình phát triển ứng dụng Android.

*  Có nhiều nhiều phiên bản của hệ điều hành Android mà các developer khó có thể theo kịp.
* Điều này trở thành thách thức lớn trong việc phát triển ứng dụng Andorid bởi vì có tới gần 170+ thiết bị chạy hệ điều hành Android. Mỗi thiết bị có các tính năng khác nhau liên quan đến, kích cỡ màn hình, camera buttons, keyboards form,... làm cho việc phát triển ứng dụng trở thành ác mộng.



Nhớ một vài điều, chúng ta có thể tăng hiệu suất của ứng dụng chúng ta. Sau đây là một vài điều có thể làm giảm hiệu suất của ứng dụng mà chúng ta có thể cỉa thiện được.

## Slow Rendering

Slow Rendering là vấn đề hiệu suất cơ bản nhất. Bở vì những gì những designer muốn chúng ta làm và những gì chúng ta thực sự làm, có thể không giống nhau, và sự cố gắng làm cho chúng trực quan khiến chúng ta bị thất bại trong việc phát triển.

Rendering xác định theo thời gian, đảm bảo ứng dụng đang chạy mượt mà ở 60 FPS mà không có bất kỳ khung hình nào bị mất hoặc bị delay.

### Nguyên nhân của Slow Rendering

Hệ thống cố gắng để vẽ lại activity của chúng ta sau mỗi 16ms. Điều này có nghĩa là ứng dụng của chúng ta phải làm tất cả các logic cần thực hiện cho việc update screen phải được thực hiện trong 16ms.

![](https://images.viblo.asia/7f96c6e2-ad63-49d1-a2c8-47652d99f88c.png)

Đây là những gì xảy ra khi ứng dụng không thể hoàn thành logic trong 16ms:

![](https://images.viblo.asia/a4740cd0-6cee-49c2-8205-2e9ffe6d170f.png)

Điều này được gọi là **dropped frame**. Ví dụ, Nếu xảy ra trường hợp tính toán của bạn mất 24ms, hệ thống cố gắng vẽ một hình mới trên màn hình, nhưng nó không sẵn sàng.  Do đó nó không làm mới bất kì điều gì. Và đây là lý do, người dùng thấy việc làm mới bưcs ảnh xảy ra sau 32ms thay vì 16ms. Nếu có một frame bị bỏ qua, animation sẽ không mượt mà.


## #Những công cụ sau đây có thể sử dụng để cải thiện Rendering
#### 1. Hierarchy Viewer
Hierarchy Viewer là một tool xây dựng trong Android Device Monitor mà cho phép bạn kiểm tra thuộc tính và layout speed cho mỗi view trong layout hierarchy. Nó có thể giúp bạn tìm performance gây ra bởi cấu trúc của view hierarchy của bạn, sau đó giúp bạn đơn giản hoá hierarchy và giảm overdraw.

#### 2. Profile GPU Rendering

Profile GPU Rendering cung cấp một biểu diễn trực quan nhanh về thời gian tiêu tốn để render các frame của một UI window so với  tiêu chuẩn 16ms.

Enable Profile GPU Rendering:
![](https://images.viblo.asia/73fb4c2a-7028-4aa9-b1c1-616e455e1fe6.png)
Trên thiết bị mobule, tới **Setting > Developer Options.**

*  Trong phần Monitoring, chọn **Profile GPU Rendering**
*  Trong Profile GPU Rendering popup, chọn **On screen as bars**
*  Đi tới ứng dụng mà bạn muốn profile.
#### Đầu ra của GPU Profiler

* Trục ngang hiển thị thời gian trôi qua, và thời gian trục dọc trên mỗi khung hình tính bằng milliseconds
* Khi bạn tương tác với ứng dụng của mình, các thanh dọc sẽ hiển thị trên ứng dụng của bạn.
* Mỗi thanh nằm dọc sẽ đại diện cho một frame hiển thị
* Dòng mày xanh đánh dấu mục tiêu 16ms. Mỗi lần một frame vượt quá dòng màu xanh, ứng dụng bị thiếu một frame.
## Application lauch time

Khởi chạy ứng dụng có thể diễn ra ở một trong hai trạng thái, mỗi trạng thái ảnh hưởng đến thời gian ứng dụng sẽ hiển thị cho người dùng:
*   Cold Start
*   Warm Start 
### Cold Start

Một cold start đề cập đến một ứng dụng bắt đầu từ đầu. Cold start xảy ra trong trường hợp như ứng dụng được chạy lần đầu kể từ lúc thiết bị được khởi động, hoặc kể từ khi ứng dụng bị hệ thống kill.

Tại thời điểm bắt đầu của cold start, hệ thống có 3 nhiệm vụ. Những nhiệm vụ đó là:
* Load và chạy ứng dụng.
* Hiển thị một blank starting window cho ứng dụng ngay sau khi chạy.
* Tạo app process.

### Warm Start

Một warm start của ứng dụng của bạn đơn giản và tốn ít tài nguyên hơn nhiều so với cold start. Trong warm start, tất cả những gì mà hệ thống làm là mang activity của bạn lên foreground. Nếu tất cả các activity của ứng dụng của bạn vẫn còn trong bộ nhớ thì ứng dụng của bạn sẽ tránh được việt khởi tạo lại đối tượng, inflate layout và rendering.

### Cách giải quyết app lauching Time delay

* Chỉ khở tạo những đối tượng cần ngay lập tức. Thay vì tạo các global static object, hãy chuyển sang singleton pattern, khi đó ứng dụng khởi tạo đối tượng lần đầu tiên nó truy cập vào chúng.
* Làm thẳng view hierarchy của bạn bằng cách giảm bố cục dư thừa hoặc lồng nhau.
* Di chuyển tất cả các khởi tạo tài nguyên để ứng dụng có thể khởi tạo nó sau đó trên một thread khác.
* Cho phép ứng dụng của bạn load và hiển thị view của bạn, sau đó update visual properties mà phụ thuộc vào bitmap và các resource khác.
## Layout 
Layout là một phần quan trọng của ứng dụng Android mà ảnh hưởng trực tiếp đến trải nghiệm người dùng. Nếu thực hiện kém, layout của bạn có thể khiến cho ứng dụng đói bộ nhớ với giao diện người dùng chậm. Mỗi widget và layout bạn thêm vào ứng dụng của bạn yêu cầu khởi tạo, layout và vẽ. Ví dụ sử dụng nested instance của LinearLayout có thể dẫn tới cấu trúc view quá sâu.
### Cách tăng hiệu suất layout
#### 1. Tối ưu hoá layout hierarchy.
Sử dụng  basic layout structure dẫn tới các layout hiệu quả nhất. Tuy nhiên, mỗi widget và layout thêm vào ứng dụng của bạn yêu cầu khởi tạo, layout và vẽ. Ví dụ, sử dụng nested instance của LinearLayout  có thể dẫn tới cấu trúc view quá sâu. Hơn nữa, nested một số instance của LinearLayout mà sử dụng layout_weight parameter có thể đặc biệt tiêu tốn tài nguyên do cần được measure hai lần. Điều này đặc biệt quan trọng khi layout được inflate liên tục, khi được sử dụng trong một ListView hoặc GridView.

#### 2. Tái sử dụng layout với <layout>

Tái sử dụng layout đặc biệt mạnh mẽ vì nó cho phép bạn tạo cáo layout phức tạp có thể sử dụng lại. Ví dụ, một yes/no button panel, hoặc một custom progress bar với một description text. Nó cũng có nghĩa là bất cứ thành phần nào trong ứng dụng của bạn sử dụng chung trong nhiều layout đều có thể được extract, quản lý riêng rẽ sau đó include trong mỗi layout. Vì vật, trong khi bạn có thể tao các UI component riễng rẽ bằng cách viết một custom View, bạn có thể làm điều đó dễ dàng hơn bằng cách sử dụng một một layout file.

#### 3. Loading Views on Demand
Thỉnh thoảng, layout của bạn có thể cần các view phức tạp mà ít khi đước sử dụng.  Cho dù chúng là item detail, progress indicator, hoặc undo message, bạn có thể giảm memory sử dụng và tăng tôc render bằng cách loading view chỉ khi chúng cần. 
## Power Usage 
**Battery Usage Reduction** cũng là một phần quan trọng của một android development vì vậy việc tối ứu hoá này cuối cùng sẽ dẫn đến việc giữ chân người dùng, vì nhiều lần người dùng gỡ cài đặt vì hao pin
### Tip cho việc tăng thời lượng sử dụng pin trong một ứng dụng android:
* Giảm tối đa các network call.
* Tránh wake lock càng nhiều càng tốt.
* Sử dụng GPS cẩn thận.
* Sử dụng Alarm manager cẩn thận.

# Kết: 
Trên đây là một số điều cần có thể giúp chúng ta tăng hiệu suất của ứng dụng.

Cảm ơn vì đã đã đọc bài viết

# Tài liệu tham khảo 
Bài viết có tham khảo từ: 
https://medium.com/mindorks/android-app-performance-optimization-cdccb422e38e