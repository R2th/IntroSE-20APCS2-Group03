# Vòng đời hoạt động của Acvivity và Fragment

### 1. Các trạng thái cơ bản
Activity và Fragment có 4 trạng thái cơ bản:

**Visible Lifecycle**: Vòng đời có thể nhìn thấy, là một phần của vòng đời giữa onStart() và onStop() khi Activity được hiển thị.

**Focus**: Activity sẽ ở trạng thái focus khi nó là hoạt động mà người dùng có thể tương tác.

**Foreground**: Là khi mà Activity vẫn hiển thị trên màn hình.

**Background**:Lúc này Activity hoàn toàn bị che mất và không còn hiển thị lên màn hình.

### 2. Các trạng thái của vòng đời
Vòng đời của Fragment và Activity đều có 5 trạng thái giống nhau:

**Initialized**: Đây là trạng thái bắt đầu khi bạn thực hiện tạo một Activity mới. Đây là trạng thái tạm thời - nó sẽ ngay lập tức chuyển đến Created.

**Created**: Lúc này Activity vừa được tạo, nhưng nó chưa hiển thị và chưa được focus (bạn không thể tương tác với nó).

**Started**: Activity được hiển thị nhưng bạn vẫn không thể tương tác được do nó chưa được focus. <br>


**Resumed**: Lúc này Activity đang hoạt đông, nó được hiển thị và người dùng có thể tương tác được.

**Destroyed**: Activity đã bị hủy, người dùng không còn tương tác được với nó.

### 3. Sơ đồ vòng đời của Activity
Class Activity và các subclass của nó có thể implement các method (lifecycle callback) vi dụ như onCreate(), onStart(), onResume()... để thay đổi hành vi hoặc chạy một số đoạn code khi trạng thái vòng đời của Activity thay đổi. <br>
Các method này có thể được override trong các class Activity khi bạn muốn thực hiện các tác vụ tùy chỉnh trong ở đó.

![image.png](https://images.viblo.asia/7826c703-a46a-465e-8bd6-fed4670d8187.png)

<div align="center">Vòng đời hoạt động và các quy trình của Activity</div>

### 5. Sơ đồ vòng đời của Fragment
Vòng đời của Fragment cũng tương tự như vòng đời Activity. Ngoài ra, nó còn có một số phương pháp dành riêng cho từng phân đoạn, như được hiển thị trong sơ đồ bên dưới.

![image.png](https://images.viblo.asia/25699c23-4dda-45a5-8ad3-765b06beaf4c.png)

<div align="center">Vòng đời hoạt động và các quy trình của Fragment</div>

# Vòng đời của Activity
Như trên sơ đồ vong đời của Activty lần lượt là : onCreate() -> onStart() -> onResume() -> onPause() -> onStop() -> onDestroy().	\
<br>
**onCreate()**: Được gọi đầu tiên khi Activity bắt đầu và chỉ được gọi một lần trong vòng đời của Activity. Nó thể hiện khi Activity được tạo và khởi tạo. Activity lúc này chưa hiển thị và bạn không thể tương tác với hoạt động đó. <br>
Bạn phải implement method onCreate(). Trong onCreate(), bạn nên:

* Tạo giao diện cho Activity, cho dù đó là sử dụng findViewById hay databinding.
* Khởi tạo các biến.
* Thực hiện bất kỳ quá trình khởi tạo nào khác chỉ diễn ra một lần trong suốt thời gian hoạt động.	
	
**onStart()**: Sẽ được kích hoạt khi hoạt động sắp hiển thị. Nó có thể được gọi nhiều lần khi người dùng thao tác di chuyển khỏi Activity và back lại sau đó. <br>
Ví dụ người dùng "đi chuyển khỏi Activity" là khi họ chuyển đến màn hình chính hoặc đến một Activty khác trong ứng dụng. <br>
Tại thời điểm này, activity vẫn chưa thể tương tác. Trong onStart(), bạn nên:
* Xử lý các logic cần thiết khi Activity được hiển thị.

**onResume()**: Nó được kích hoạt khi Activity đã khởi tạo xong và người dùng có thể tương tác với nó. <br>
Ở đây bạn nên:
* Xử lý các logic cần thiết khi người dùng có đang tương tác với Activity và nó sẽ ở trang thái là focus.


**onPause()**: Nó đối xứng với onResume() . Method này được gọi ngay khi Activity bị mất focus và người dùng không thể tương tác với nó. <br>
Một hoạt động có thể mất focus mà không biến mất hoàn toàn khỏi màn hình (ví dụ: khi hộp thoại xuất hiện che khuất một phần Activity). Ở đây bạn nên:

* Tạm dừng các logic hiện tại hoặc đưa xử lý thành tác vụ ngầm trong nền theo ý muốn của mình. Tuy nhiên bạn nên tránh các logic phức tạp nếu không thời gian xử lý sẽ lâu làm cho Activity không thể chuyển qua method tiếp theo trong vòng đời. 


**onStop()**: onStart() cũng tương ứng với onStart(). Nó được gọi khi Activity bị ẩn đi hoàn toàn và bạn không thể nhìn thấy nó nữa. Ở đây bạn nên:

* Dừng xác xử lý logic khi Activity không hiển thị trên màn hình.
* Lúc này bạn nên lưu lại các dự liệu cần thiết.
* Dừng các logic update giao diện người dùng. Nó sẽ giảm sự lãng phí tài nguyên của thiết bị.

**onDestroy()**: Đây là method tương ứng với onCreate(). Nó được gọi một lần khi Activty bị hủy hoàn toàn. <br>
Điều này xảy ra khi bạn điều hướng hoạt động của ra khỏi Activity (như khi nhấn nút quay lại) hoặc đơn giảm là gọi **finish()**. <br>
Lúc lnày bạn nên dọn dẹp các tài nguyên liên quan đến Activity. Ở đây bạn nên:

* Hủy hoặc giải phóng bất kỳ tài nguyên nào có liên quan đến Activity này. Nếu không sau này bạn rất có thể sẽ gặp mội số lỗi liên quan đến memory leak.

# Vòng đời của Fragment
Các Fragment cũng có các trạng thái vòng đời cũng giống như các trạng thái của Activity. Tuy nhiên sẽ có một vài điểm khác biệt. <br> \
Về cơ bản thì vòng đời của Fragment gồm có: onAttach() -> onCreate() -> onCreate() -> onCreateView() -> onViewCreated() -> onStart() -> onResume() -> onPause() -> onStop() -> onDestroyView() -> onDestroy() -> onDetach().

**onAttach()**: Khi mà Fragment lần đầu được attach vào Activity. Nó chỉ được gọi một lần trong suốt vòng đời của Fragment.

**onCreate()**: Tương tự như onCreate ở Activity. Đây là khi mà Fragment được tạo, nó cũng sẽ chỉ được gọi một lần duy nhất. Ở đây bạn nên:

* Khởi tạo các đối tượng thiết yếu cần cho Fragment.
* Lúc này ta không nên inflate XML, nên thực hiện nó trong onCreateView(). Vì khi hệ thống lần đầu tiên vẽ layout của Fragment sẽ không reference tới Activity vì nó vẫn đang được tạo. Vậy nên hãy xử lý trong onViewCreated().

**onViewCreated()**: Được gọi ngay lập tức ngay sau onCreateView() hoàn thành, nhưng lúc này các trạng thái của view sẽ vẫn chưa được khôi phục nếu có.

**onStart()**: Được gọi ngay trước khi Fragment hiển thị cho người dùng.

**onResume()**: Giống như Activity, lúc này Fragment đã được nhìn thấy và có thể tương tác bởi người dùng.

**onPause()**: Giống như Activity, lúc này người dùng thực hiện rời khỏi Fragment và nó sẽ bị mất trạng thái focus.

**onStop()**: . Được gọi onStop() của Activity được gọi, lúc này khi người dùng thoát khỏi Fragment và nó sẽ không còn trạng thái foucs. Ở đây chúng ta nên:

* Logic lưu lại data hay các trạng thái đang có của Fragment

**onDestroyView()**: Khác với Activity, các view của Fragment sẽ bị hủy mỗi khi chúng không còn được hiển thị. Nên nó sẽ được gọi sau khi view không còn được hiển thị.

* Lúc này chúng ta không thể tham chiếu đến các view, vì chúng đã bị hủy.

**onDestroy()**: Được gọi khi onDestroy() của Activity được gọi.

**onDetach()**: Được gọi khi mối liên kết giữa Fragment và Activity bị hủy.

Chú ý: Trước đó chúng ta có phương thức là onActivityCreated(), tuy nhiên nó đã bị lỗi thời và thay thế bằng phương thức như hiện tại là onViewCreated().

Các bạn có thể tham khảo thêm các tài liệu nâng cao dưới đây:

https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-i-single-activities-e49fd3d202ab <br>
https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-ii-multiple-activities-a411fd139f24 <br>
https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-iii-fragments-afc87d4f37fd <br>