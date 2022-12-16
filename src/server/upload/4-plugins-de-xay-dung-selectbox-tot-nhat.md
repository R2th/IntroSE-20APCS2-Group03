Hôm nay tôi xin được giới thiệu một số plugins jquery để xây dựng selectbox tốt nhất. Các plugin có nhiều tính năng mà slectbox mặc định không làm được như thay đổi kiểu hiển thị mặc định, điều hướng bàn phím, điều khiển đa lựa chọn,... Các plugin này hoàn toàn miễn phí và dễ dàng sử dụng nên rất được ưa chuộng với các lập trình viên Frontend. 

### 1. jQuery Selectric

jQuery Selectric là một plugin dễ dàng tùy chỉnh. Nó có bản demo đi kèm để bạn có thể dễ dàng hiểu rõ hơn về nó. Tính năng quan trọng nhất của plugin này là tìm kiếm từ chỉ hoạt động với các ký tự Latin ở phương Tây, ví dụ - á, ñ, ç... Plugin này tương thích với các trình duyệt như Firefox, Chrome, Safari, Opera, IE.

#### Đặc trưng: 
- Nó là một plugin nhẹ, giúp tăng tốc độ tải trang mà vẫn đáp ứng đủ tính năng cần thiết 
- Bạn có thể sử dụng các phím điều hướng bàn phím lên, xuống, trái, phải, có thể thực hiện tìm kiếm từ.
- Hộp tùy chọn sẽ luôn được nhìn thấy bằng cách tự hiển thị trên/dưới ô chọn.

#### Sử dụng

- Đầu tiên cần thêm thư viện jquery

- Thêm thư viện jQuery Selectric:
```
<script src="jquery.selectric.min.js"></script>
```

- Thêm css jQuery Selectric 
```
<link rel="stylesheet" href="selectric.css">
```

- Khởi tạo selectbox:
```
$(function() {
  $('select').selectric();
});
```

Xem các option tại: [Selectric](http://selectric.js.org/)

### 2. SelectBoxIt

Đây là plugin jQuery SelectBox phù hợp nhất cho các trình duyệt điện thoại di động, máy tính bảng và máy tính để bàn. Nó sẽ cung cấp đầy đủ cho bạn tìm kiếm bàn phím và hỗ trợ điều hướng.
Trong plugin này, API là một phương pháp cung cấp nhiều cách khác nhau để tương tác với danh sách dropdown. Hơn nữa, bạn có thể dễ dàng chọn, vô hiệu hóa và chọn hỗ trợ nhóm cho danh sách của mình hoặc select boxes.

#### Đặc trưng:
- Plugin này hỗ trợ các giao diện jQueryUI, Twitter Bootstrap và các giao diện jQuery trên mobile. 
- Nó hiển thị như là giao diện mặc định của SelectBoxIt, tương tự như giao diện Twitter Bootstrap.
- SelectBoxIt cũng hỗ trợ tốt cho trình duyệt di động, máy tính bảng và máy tính để bàn.

#### Sử dụng
Tham khảo thêm tại [https://github.com/gfranko/jquery.selectBoxIt.js](https://github.com/gfranko/jquery.selectBoxIt.js)

### 3. PopSelect

Plugin jQuery này biến đổi một hộp chọn thành tagger popover. Bạn có thể hiển thị nhiều cửa sổ bật lên theo bất kỳ hướng nào một cách dễ dàng. PopSelect thuộc giấy phép của MIT.

#### Đặc trưng: 
- Bạn có thể dễ dàng tạo ra các hộp popover qua chọn thẻ đầu vào.
- Nó cũng sẽ cho phép bạn hiển thị trong popovers đa chiều.
- Với sự trợ giúp của plugin này, bạn có thể thêm hỗ trợ cho tùy chọn autofocus option cho ô select, set giá trị được chọn ban đầu, placeholder và nhận giá trị từ select dễ dàng.

#### Sử dụng

- Đầu tiên cần thêm thư viện jquery

- Cài đặt popSelect: 
```
bower install popSelect
```

hoặc 

```
npm install popselect
```

- Thêm js và css thư viện popSelect
```
<link rel="stylesheet" href="css/popSelect.css">
<script src="js/jquery.popSelect.min.js"></script>
```

- Khởi tạo: 
```
<select class="form-control" name="city" id="element" multiple>
	<option value="green">Green</option>
	<option value="red">Red</option>
	<option value="blue">Blue</option>
	<option value="violet">Violet</option>
	<option value="orange">Orange</option>
	<option value="white" selected="selected">White</option>
</select>
$(function() {
	$("#myselect").popSelect({
		showTitle: false,
		maxAllowed: 4
	});
});
```

Tham khảo thêm tại: [popSelect](https://github.com/kanakiyajay/popSelect)

### 4. jQuery SelectBox 

Mục đích chính của plugin này là điều chỉnh lại các điều khiển của bạn để các chức năng không bị ảnh hưởng. Nó đi kèm với một số tùy chọn hữu ích mà bạn có thể kiểm soát dễ dàng.
Plugin này có giấy phép MIT. 

#### Đặc trưng: 
- Nó hỗ trợ optgroups, dropdown,  multi-select & inline controls.
- Trong multi-select, bạn có thể chọn nhiều tùy chọn bằng cách nhấp (shift + click) hoặc (shift + enter).
- Plugin này được thử nghiệm cho IE7-IE9, Firefox, trình duyệt WebKit và Opera.

#### Sử dụng

- Cài đặt jquery 

- Thêm thư viện 
```
<script src="jquery.selectbox.min.js" type="text/javascript"></script>
<link href="jquery.selectbox.css" rel="stylesheet" type="text/css" />
```

- Khởi tạo 
```
// default
$('select').selectBox();

// or with custom settings
$('select').selectBox({
    mobile: true,
    menuSpeed: 'fast'
});
```

Tham khảo thêm tại [jquery-selectBox](http://marcj.github.io/jquery-selectBox/)