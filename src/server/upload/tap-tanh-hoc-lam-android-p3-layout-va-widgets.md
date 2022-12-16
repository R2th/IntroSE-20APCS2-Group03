## Layouts
Layout là nơi xác định cấu trúc cho giao diện người dùng trong ứng dụng của bạn, ví dụ như là Activity. Tất cả các thành phần trong `Layouts` được xây dựng bằng cách sử dụng phân cấp các đối tượng `View` và `ViewGroup`. `View` thường là các đối tượng mà người dùng có thể nhìn thấy và tương tác, còn `Viewgroup` là một container xác định cấu trúc layout cho `View` và các đối tượng `ViewGroup` khác

![](https://images.viblo.asia/8eb289f5-6ef7-4360-824b-96c66527dbe4.png)


- Các đối tượng `View` thường được gọi là `Widget` và có thể là một trong các `subclasses` như `Button`, `TextView` hoặc `CheckedTextView`,... Các đối tượng `ViewGroup` thường được gọi là `layouts` có thể là một trong các kiểu cấu trúc layout khác nhau như `RelativeLayout` hoặc `ConstraintLayout`,...
### ConstraintLayout
- `ConstraintLayout` cho phép bạn tạo `layout`lớn và phức tạp với hệ thống phân cấp view không có view group lồng nhau. Nó tương tự như RelativeLayout ở chỗ tất cả các views được đặt theo mối quan hệ giữa các views, nhưng nó linh hoạt hơn RelativeLayout và dễ sử dụng hơn với trình chỉnh sửa `layout` của Android Studio
### RelativeLayout
- RelativeLayout cho phép sắp xếp các control theo vị trí tương đối giữa các control khác trên giao diện (kể cả control chứa nó).
### LinearLayout
- LinearLayout sẽ xếp các phần tử View con theo 2 dạng là dạng cột hoặc dạng hàng, không có view nào đè lên view nào.
### TableLayout
- Cho phép sắp các control theo dạng lưới (dòng và cột). TableLayout sẽ xem dòng nào có số lượng control nhiều nhất để xác định rằng nó có bao nhiêu cột (lấy dòng có số lượng control nhiều nhất làm số cột chuẩn)
### FrameLayout
- Các view con trong FrameLayout là các view sẽ nằm chồng lên nhau, view thêm vào sau sẽ nằm đè lên view nằm phía dưới
### AbsoluteLayout
- Cho phép thiết lập các control giao diện theo vị trí tùy thích.
### GridLayout
- Sử dụng một dạng lưới các dòng mỏng và vô hạn để tách layout của nó thành: các hàng, các cột, và các ô (cell)
## Làm việc với layout 
Ở phần trên mình giới thiệu các dạng layout trong android. Ở trong phần này chúng ta cùng xem áp dụng một số dạng layout như thế nào
- Linearlayout:<br>
Layout này sắp xếp các view con nằm trong nó theo một chiều ngang hoặc dọc thông qua thuộc tính orientation với giá trị là vertical(dọc) và horizontal(ngang). 

![](https://images.viblo.asia/ae7f9994-d285-4aa9-9186-16b1868dcd84.png)

Giao diện:

![](https://images.viblo.asia/e9526ecf-9a7d-4cd1-9b42-c7ea2f960eb7.png)

- FrameLayout:<br>
Framlayout là loại layout đơn giản mà các view con bên trong nó sẽ được đặt chồng lên nhau, view sau sẽ chồng lên view trước và định vị với nhau bằng thuộc tính layout_gravity

![](https://images.viblo.asia/24b2f12d-cc8d-4b0e-9924-50a340ae9d1d.png)

Giao diện:

![](https://images.viblo.asia/8ab33f43-58c4-493a-89dd-f319d260fbb1.png)

- RelaytiveLayout:<br>
Đây là 1 viewgroup mà giúp cho bạn đặt view con ở bất kì vị trí nào mà mình thích, view sau sẽ phụ thuộc vào vị trí của những view trước đó.

![](https://images.viblo.asia/18c157d2-6a15-4103-b003-342b08e5774a.png)

Giao diện:

![](https://images.viblo.asia/77fd53b4-4320-4245-ae1d-ff80779e3393.png)

## Widget
### TextView
- Được sử dụng để hiểnthị text.
### EditText
- Dùng để cho người dùng nhập vào text, ví dụ như: tên, email, địa chỉ,...
- Đây là ô nhập liệu, có thể dùng để lấy dữ liệu, hoặc set dữ liệu lên nó bằng hàm setText() và getText();
- Nó có 2 thuộc tính quan trọng là inputType: kiểu nhập vào, có thể để số, password,… và line: số dòng được hiển thị để nhập liệu
### Button
- Thực hiện một hành động khi người dùng nhấn nút.
### CheckBox
- Cho phép người dùng chọn hoặc bỏ chọn một options.
- Đây là widget để lựa chọn đối tượng. nó có 2 phương thức quan trọng là
    - setChecked, dùng để thiết lập checked. Nếu ta setChecked(true) thì control đó được chọn, còn nếu set bằng false thì có nghĩa hủy đi control
    - isChecked, Phương thức này dùng để kiểm tra trạng thái được chọn hay không. Nếu được chọn thì trả về là true, còn không thì là false.
- Checkbox cho phép ta lựa chọn nhiều đối tượng
- Nó có sự kiện onCheckedChangeListener để xử lý sự kiện khi thay đổi checked của một item
### RadioButton
- Cho phép người dùng chọn một lựa chọn từ một nhóm Radio định trước.
- Đây là 1 widget, tương tự như checkbox, tuy nhiên thì nó không thể lựa chọn nhiều hơn 2 item cùng một lúc.
- Nó được đặt trong Radio Group.
- Ta có thể xử lý sự kiện khi chọn, thay đổi các item dựa vào các id của radio button trong radio group.
### Spinner
- Cho phép người dùng chọn một lựa chọn từ một danh sách.
- Nó là một danh sách xổ xuống các item mà từ đó ta có thể lựa chọn được 1 item ở trong danh sách đó.
- Danh sách data sẽ được đổ vào một adapter(adapter này có thể là array adapter do android studio cung cấp sẵn hoặc mình có thể custom). Sau đó adapter này sẽ được đổ vào spinner
- Các phương thức đặc chưng của spinner:
    - setAdapter(Adapter): set adapter cho spinner(có sẵn hoặc custom)
    - setSelection(index) : lực chọn item ở vị trí index trong spinner
    - getSelectedItemPositon(): trả về vị trí position của item đang được chọn, nếu chưa chọn trả về -1
    - getSelectedItem(): trả về đối tượng đang được chọn 

### ProgressBar
- ProgressBar để biểu thị quá trình của hành động.
### SeekBar
- Cho phép người dùng chọn một giá trị bằng việc kéo thả con trượt qua trái hoặc phải
- Seekbar là một lớp mở rộng từ progessbar, nó có thêm một cần gạt. Người dùng có thể chạm vào cần gạt để kéo sang trái hoặc phải để thiết lập giá trị của tiến trình( progess).
- Các thuộc tính đặc biệt:
    - Id: dùng để định danh seekbar
    - Max: thuộc tính dùng để định nghĩa giá trị tối đa của seekbar
    - Progess: xác định giá trị mặc định ban đầu của progess
    - secondProgess: xác định giá trị ban đầu của tiến trình phụ
    - thumb: đặt icon cho seekbar

### RatingBar
- Cho phép người dùng đánh giá một thứ gì đó bằng việc chọn một hoặc nhiều sao.
### ImageView
- Hiển thị một hình ảnh.
- Có các loại chất lượng cho hình ảnh sau:
    - Ldpi: low-120dpi
    - mdpi (medium) ~160dpi
    - hdpi (high) ~240dpi
    - xhdpi (extra-high) ~320dpi
    - xxhdpi (extra-extra-high) ~480dpi
    - xxxhdpi (extra-extra-extra-high) ~640dpi
- Android hỗ trợ các loại ảnh như PNG,JPG,GIF.

### ImageButton
- Làm việc như một nút nhưng hiển thị một hình ảnh thay vì văn bản.
### DatePicker
- Cho phép người dùng lựa chọn ngày.
### TimePicker
- Cho phép người dùng lựa chọn thời gian
### CalendarView
- Cho phép người dùng chọn lịch
### ScrollView
- Tự động hiển thị thanh cuộn dọc nếu giao diện không vừa màn hình hiện tại.
- ScrollView là một dạng đặc biệt của FrameLayout ở chỗ nó cho phép người dùng di chuyển qua một danh sách các quan điểm mà chiếm nhiều không gian hơn màn hình vật lý. Các ScrollView có thể chứa chỉ một Child View hay ViewGroup, mà thường là một LinearLayout.
- Nó có thuộc tính scrollbar với giá trị là vertical(chiều dọc) hoặc horizontal(chiều ngang)