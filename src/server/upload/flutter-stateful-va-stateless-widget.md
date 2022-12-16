Mọi người đều đã quen thuộc với định nghĩa, trong Flutter thì tất cả đều là **Widget** và có 2 **Widget** quan trọng nhất là **StatefulWidget** và **StatelessWidget**. Vậy sự khác biệt lớn nhất giữa 2 **Widget** này là gì và trường hợp nào thì chúng ta nên sử dụng chúng.
# I. StatelessWidget
**StatelessWidget** hiểu nôm na là Widget tĩnh và nó không thể tự thay đổi được những gì mà nó hiển thị sau khi đã được **Render** xong. 

![](https://images.viblo.asia/f5aac646-8553-4e9e-8b55-53fabd0dbd42.png)

Nhìn đoạn code demo, bạn thấy cấu trúc của **Stateless** khá là đơn giản đúng không?

Widget này cần 1 hàm `Widget build(BuildContext context)` để render dữ liệu lên màn hình. Hàm `build` chỉ được gọi 1 lần khi ứng dụng đang hoạt động, như vậy thì dữ liệu chỉ được render 1 và không thay đổi suốt quá trình sử dụng ứng dụng. Dữ liệu hiển thị bạn có thể `hard code` hoặc truyền thông qua hàm **Constructors** của class và dữ liệu này sẽ không thay đổi suốt quá trình hiển thị trên màn hình.

Vậy đặt ra vấn đề **Tôi muốn thay đổi text đang hiển thị trên màn hình thì làm thế nào**? 

Tuy **StatelessWidget** không thể tự thay đổi được chính nó, nhưng khi **Widget** cha thay đổi thì **StatelessWidget** sẽ được khởi tạo lại. 

Vậy chúng ta nên sử dụng **StatelessWidget** trong trường hợp nào:
- Hiển thị dữ liệu cứng. ex: Appbar, Title của màn hình vvv
- Sử dụng trong **StatefulWidget** (cái này mình sẽ nói ở phần sau) để khi **StatefulWidget** thay đổi trạng thái thì các item con sẽ được render lại.
- 
![](https://images.viblo.asia/6433b417-aff8-403e-ae05-ef63673b8b6b.png)


# II. StatefulWidget
Khác với **StatelessWidget** thì **StatefulWidget** là 1 `Widget` động và nó có thể thay đổi những gì đang hiển thị bằng cách thay đổi **State** của chính nó.

![](https://images.viblo.asia/5e63546a-dfa3-4c1b-8f10-389b98452cb4.png)
(đây là code mặc định khi bạn new project flutter bằng Android Studio)

Widget này cần hàm `State<StatefulWidget> createState()` để cung cấp **State** cho **StatefulWidget**.

Class **_MyHomePageState** sẽ `overrides` phương thức `Widget build(BuildContext context)` hàm này trả về **Widget**. Đây là nơi bạn định nghĩa UI mà class hiển thị. **StatefulWidget** quản lý trạng thái UI thông qua **State**, khi **State** thay đổi thì **StatefulWidget** sẽ render lại UI mà nó đang hiển thị. 

Vậy câu hỏi đặt ra là **Làm thế nào tôi có thể thay đổi được State của Statefull hay đơn giản là update dữ liệu đang hiển thị trên màn hình?**

Câu trả lời này khá đơn giản. **StatefulWidget** cung cấp phương thức **setState()** để bạn có thể thay đổi **State** của class. Hiểu đơn giản là khi bạn muốn `Update UI` của **StatefulWidget** thì cần gọi phương thức **setState()** để thông báo cho StatefullWidget là tôi muốn bạn UpdateUI. Tất nhiên bạn có thể gọi **setState()** nhiều lần mỗi khi cần thay đổi UI trong vòng đời của ứng dụng.

Vậy chúng ta nên sử dụng **StatefulWidget** trong trường hợp nào:
![](https://images.viblo.asia/4e09c640-7e14-4d30-b67c-a0d512decbeb.png)

Và đặc biệt, nên sử dụng **StatefulWidget** trong Widget con của **ListView** để các item của chúng có thể tự động cập nhật trạng thái mà không cần cả **ListView** thay đổi trạng thái.

Nhìn như này mình đoán sẽ nhiều bạn đặt câu hỏi `Thế tại sao không dùng StatefulWidget vừa có thể hiển thị vừa có thể thay đổi dc UI việc gì phải dùng StatelessWidget`. Thì đúng là như thế, nhưng các bạn lưu ý do `StatelessWidget` không có **State** nên việc render UI của nó nhẹ hơn và nhanh hơn rất nhiều.  Các bạn cần tìm hiểu rõ về **State** để lựa chọn sử dụng giữa `StatelessWidget` và `StatefulWidget` để có thể  dễ dàng trong việc viết code và tối ưu hiệu năng.