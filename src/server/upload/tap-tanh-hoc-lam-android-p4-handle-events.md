Event là cách mà để xử lý các tương tác của người dùng với các thành phần tương tác của ứng dụng. Ví dụ như nhấn vào button, nhập vào textview,... Trong bài viết này cũng mình tìm hiểu về Events trong android
## Events Listeners
### Event cấp cao
- Event cấp cao chỉ xảy ra trong các widget cụ thể. Tuy nhiên, loại sự kiện này có thể không xuất hiện trên các loại widget khác như nút bấm
- Một interface được định nghĩa là listener cho một sự kiện cấp cao thường được lồng vào chính class cho widget tương ứng của nó.
- Hầu hết các Events Listeners xác định một lớp cho trình xử lý sự kiện.

| Package/Class | Nested Interface | Method |
| -------- | -------- | -------- |
| android.widget.TextView     | OnEditorActionListener     | onEditorAction     |
| android.widget.CompoundButton     | OnCheckedChangeListener     | onCheckedChanged     |
| android.widget.RadioButton     | OnCheckedChangedListener     | onCheckedChanged     |
| android.widget.Adapter     | OnItemSelectedListener     | onItemSelected, onNothingSelected|
| android.widget.SeekBar     | OnSeekBarChangeListener    | onProgressChanged, onStartTrackingTouch, onStopTrackingTouch |

### Event cấp thấp
- Event cấp thấp xảy ra cho tất cả các widget. Event listener cần được lồng trong lớp View.
- Bên cạnh việc click thì cũng có thể long click (ấn giữ 1 lúc).

| Package/Class | Nested Interface | Method |
| -------- | -------- | -------- |
| android.view.View     | OnClickListener, OnLongClickListener, OnKeyListener, OnFocusChangeListener, OnTouchListener | onClick, onLongClick, onKey, onFocus, onTouch |
## Các kỹ thuật xử lý event
### Class hiện tại như là listener
- Ví dụ đầu tiên cho thấy cách xử lý event Click cho hai nút bằng cách sử dụng lớp hiện tại như một listener. Code này sử dụng lớp (lớp TipCalculatorActivity) để triển khai phương thức onClick đã định nghĩa bởi interface OnClick. Sau đó, nó kết nối listener với hai nút. Để làm điều đó, nó sử dụng từ khóa được đặt tên để xác định lớp hiện tại là listener.
<br>
VD: ta khai báo bên giao diện như sau:

![](https://images.viblo.asia/71c798ca-f71b-4293-9a52-f93bd871def9.png)

Sau đó bên class activity ta viết hàm division và có thể xử lý được sự kiện onClick
```kotlin
public void division(View view) {
    // todo some thing
}
```
### Sử dụng class hiện tại làm listener
- Bước 1: import interface cho event listener
- Bước 2: Sử dụng class hiện tại implement interface cho listener, sau đó xử lý sự kiện trong phương thức override
- Bước 3: set listener cho widget tương ứng.

VD:
![](https://images.viblo.asia/dbde8a9c-da34-4994-92d1-67e4216f0ba9.png)
### Class được đặt tên là listener
- Bước 1: Tạo một class implement interface của listener, override các phương thức(xử lý sự kiện).
- Bước 2: Khai báo và khởi tạo class ở trên.
- Bước 3: set listener cho các widget với tham số truyền vào là class vừa được khởi tạo ở trên.(cách này ít được dùng)
### Tạo Class ẩn danh như là listener
- Tương tự như cách số 3, tuy nhiên ở đây không tạo class mà sẽ tạo một biến, rồi cho biến đó implement các interface listerner tương ứng, cài đặt, xử lý sự kiện trong biến đó. Sau đó set sự kiện cho các widget với tham số truyền vào là biến được implement ở trên.
### Tạo ẩn danh bên trong Class như là listener
- Ở đây không tạo biến nào cả. biến nào muốn set sự kiện listener thì chỗ truyền tham số ta sẽ khởi tạo luôn một interface listener ở đó và thực hiện xử lý sự kiện qua hàm cài đè ở đó luôn.
## Xử lý event cấp cao
### Checkbox
- Khởi tạo 1 Checkbox là cb và có thể xử lý sự kiện thay đổi lựa chọn check box như sau :

![](https://images.viblo.asia/54f93211-df26-4f4e-a93b-554a546b3cc6.png)
### RadioGroup
- Khởi tạo một radioGroup, và các radioButton bên trong, có chứa ID, và có thể xử lý sự kiện như sau: 

![](https://images.viblo.asia/a23c3e05-8567-4bca-a745-00ed23d2f131.png)
### Seekbar
![](https://images.viblo.asia/2c93b7c7-0758-468f-9c0c-a683448178ed.png)
### Spinner
![](https://images.viblo.asia/4bc6df73-835c-4446-b2c5-cbb4dbcb84e8.png)
## xử lý event cấp thấp
### onClick
![](https://images.viblo.asia/d751fb61-6019-4b2f-bdef-166915b96759.png)
### longClick
![](https://images.viblo.asia/cdd1fcb0-af03-4d5e-b032-530f06619ea3.png)