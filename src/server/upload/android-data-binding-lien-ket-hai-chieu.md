Ở các bài viết trước, mình đã giới thiệu cách sử dụng Android data binding để đưa thông tin từ trong app lên UI người dùng và bind các sự kiện trên UI người dùng với app. Bài toán thường gặp tiếp theo là, nếu chúng ta muốn lấy dữ liệu mà người dùng nhập trở lại vào modal của app thì phải làm thế nào? Câu trả lời chính là two-way data binding, tính năng được giới thiệu trong Android Studio 2.1.

### Two-way Binding
Hãy tưởng tượng chúng ta có một form để người dùng điền vào bao gồm một EditText cho tên của người dùng. One-way data binding trong trường hợp này sẽ có dạng như sau:
```
<EditText
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@{user.firstName}"
    android:id="@+id/firstName" />
```
Thông thường, các bạn sẽ để người dùng nhập dữ liệu và sau đó submit form. Hoặc nếu thích xịn xò hơn nữa thì bạn có thể đập vào thêm một cái listener afterTextChanged để cập nhật model. Tuy nhiên, thay vì làm thế, bạn có thể sử dụng toán tử liên kết hai chiều “@ = {}” để tự động cập nhật các thay đổi của người dùng vào trong view model.
```
<EditText
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@={user.firstName}"/>
```
Vì model được cập nhật khi người dùng nhập dữ liệu, chúng ta không cần phải chủ động truy xuất tên từ EditText nữa. Mình cũng đã xóa ID vì nó không còn cần thiết nữa.
Lưu ý rằng liên kết hai chiều không hỗ trợ tất cả các thuộc tính, mà chỉ những thuộc tính có thông báo sự kiện thay đổi mà thôi. Nhưng rất may là đó đã là bao gồm đa số thứ các bạn cần khi làm việc với input của người dùng rồi. Ngoài ra, các bạn hãy nhớ rằng Android Data Binding được thiết kế để hoạt động cho tất cả các phiên bản sau API 7, vì vậy nó không dựa trên bất kỳ thay đổi nào về framework. Nếu không vì thế thì two-way binding đã có thể được hỗ trợ trên hầu hết mọi thuộc tính vì chúng ta có thể tự thêm notification cho các thuộc tính không được hỗ trợ rồi.

### Các thuộc tính của View
Giờ các bạn có thể access các thuộc tính của View từ trong các biểu thức, cũng giống như các properties trong data model:
```
<CheckBox
    android:id="@+id/showName"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
<TextView
    android:text="@{user.firstName}"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:visibility="@{showName.checked ? View.VISIBLE : View.GONE}"
    />
```
Trong layout trên, TextView show first name của người dùng sẽ chỉ visible khi checkbox showName được check. Sở dĩ chúng ta làm được điều này vì chúng ta đang tham chiếu tới một thuộc tính có thể liên kết 2 chiều. Chúng ta có thể làm điều tương tự với các thuộc tính có biểu thức data binding:
```
<CheckBox
    android:id="@+id/showName"
    android:focusableInTouchMode="@{model.allowFocusInTouchMode}"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
<TextView
    android:text="@{user.firstName}"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:focusableInTouchMode="@{showName.focusableInTouchMode}"
    />
```
Tất nhiên, ví dụ bên trên khá là vô nghĩa, nhưng nó demo cho chúng ta cách sử dụng kiểu nối biểu thức này.
Nguyên lý hoạt động đằng sau những dòng code này là data binding framework nhìn thấy “showName.focusableInTouchMode” và nhận ra đó là dữ liệu được liên kết với “model.allowFocusInTouchMode” và thực hiện một phép thay thế đơn giản.

### Tham chiếu View 
Một điều thú vị khác là bạn cũng có thể tham chiếu View theo ID của chúng trong biểu thức lambda xử lý sự kiện, ví dụ:
```
<EditText
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:id="@+id/firstName"
    android:text="@={user.firstName}" />
<CheckBox
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:onCheckedChanged="@{()->handler.checked(firstName)}" />
```