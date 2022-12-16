# XML là gì?
XML là từ viết tắt của từ Extensible Markup Language là ngôn ngữ đánh dấu mở rộng.
XML có chức năng truyền dữ liệu và mô tả nhiều loại dữ liệu khác nhau. Tác dụng chính của XML là đơn giản hóa việc chia sẻ dữ liệu giữa các nền tảng và các hệ thống được kết nối thông qua mạng Internet.

XML dùng để cấu trúc, lưu trữ và trong trao đổi dữ liệu giữa các ứng dụng và lưu trữ dữ liệu. Ví dụ khi ta xây dựng một ứng dụng bằng Php và một ứng dụng bằng Java thì hai ngôn ngữ này không thể hiểu nhau, vì vậy ta sẽ sử dụng XML để trao đổi dữ liệu. 
Chính vì vậy, XML có tác dụng rất lớn trong việc chia sẻ, trao đổi dữ liệu giữa các hệ thống.

# XML trong các ứng dụng Android
Trong Android gần như ứng dụng nào cũng cần phải có một activity cùng với một giao diện (Interface).
Các file XML trong Android thì đóng vai trò tạo nên các giao diện với các view khác nhau trên màn hình để người dùng có thể tương tác.

# Cách các view trong tệp XML hoạt động
Các view được bố trí và tổ chức theo dạng cây phân cấp.

![image.png](https://images.viblo.asia/496aba89-7c16-4c4d-ad60-39870d8759ef.png)

Như hình trên thì ta có một LinearLayout là view cha chứa 2 view con là TextView và Button.

Với các ứng dụng có giao diện phức tạp với nhiều View và Button khác nhau thì chúng ta cần phải xác định các view cụ thể tương ứng
Do đó mỗi view sẽ có 1 thuộc tính **android:id** có thể đặt tên là bất kỳ nhưng phải là duy nhất trong một ứng dụng.

![image.png](https://images.viblo.asia/a29b46e3-4a1d-4b63-8e8b-e9830e3ceffc.png)

Mỗi khi chúng ta xác định một ID cho một View trong tệp XML, Android Studio sẽ tạo tự động ra một hằng số nguyên với tên của ID đó.
Nó được xác định trong tệp R.class của resource, lớp này chứa một ánh xạ tương ứng với các ID của từng View tồn tại trong project.

Để lấy đối tượng View tương ứng trong acitivity, chúng ta sử dụng phương thức là findViewById để trả về tham chiếu của View đó.

# View binding
Từ phiên bản Android Studio 3.6 trở lên khi cùng với Kotlin được thêm vào chúng ta có thêm một tính năng mới là [View binding](https://developer.android.com/topic/libraries/view-binding) đây là cách tốt nhất có thể thay thế cho việc sử dụng findViewById.

View binding sẽ tự tạo ra liên kết các các đối tượng View với mỗi bố cục XML. Chúng ta có thể xử dụng các đối tượng liên kết này để tham chiếu tới các view bằng cách sử dụng các tên id mà nó tạo ra.

![image.png](https://images.viblo.asia/98da6d5a-4b25-46d0-9e1c-cd317f5313ff.png)

Các lợi ích của View binding so với findViewById:

* **Type safety**: findViewById yêu cầu chỉ định loại View mong muốn được trả về. Vd: nếu bạn vô tình chỉ định mong đợi là Textview trong khi thực tế nó là 1 EditText thì lỗi ClassCastException sẽ được trả về. Với View binding thì các View tự được rằng buộc và trả về chính xác nên sẽ không bị lỗi này.

* **Null safety**:  findViewById yêu cầu tham số truyền vào là số nguyên, là ID của View có trong resource của project. Tuy nhiên ta có thể truyền vào bất kỳ số nguyên nào, nếu nó không được tham chiếu đến các id hợp lệ trong project thì khi ta sử dụng findViewById có thể sẽ trả về NullPointerException.
View binding thì tham chiếu trực tiếp tới các đối tượng View mà không thông qua các ID là số nguyên, do đó sẽ không bị null.