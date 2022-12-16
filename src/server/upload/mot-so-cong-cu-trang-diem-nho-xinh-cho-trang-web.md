![](https://images.viblo.asia/2131538c-2606-4486-ad67-110ee441ac52.png)

Một cô gái hoàn hảo là không thể thiếu những điều thú vị thông minh phải không nào? Là một developer thì bạn cũng muốn cô gái của mình hiển thị những thứ hấp dẫn và mang lại hữu ích cho người dùng chứ nhỉ? Bạn chỉ cần để ý một số chi tiết nhỏ thì có thể trang trí thêm cho website của mình trở nên thú vị. Các "trick và tip" bên dưới là các dụng cụ makeup thích hợp đấy, cùng xem qua nhé!
### 1. The color picker
Bạn muốn cho trường input chứa một ít màu sắc sinh động thì chỉ cần thêm yếu tố nhỏ "color" (để lấy mã màu thông qua công cụ trực quan).

```html
<!DOCTYPE html>
<html>
<body>
<p>Phụ thuộc vào sự hỗ trợ của các trình duyệt:<br>
Một bộ chọn màu sắc sẽ được hiện lên khi bạn nhập các trường dữ liệu đầu vào.
<form>
  Chọn màu yêu thích của bạn:
  <input type="color" name="favcolor" value="#ff0000">
</form>
</body>
</html>
```
![](https://images.viblo.asia/0d1beb78-bb6d-4376-9296-a491e80dfb20.png)

Tùy thuộc vào sự hỗ trợ của các trình duyệt, một bộ chọn màu sắc có thể hiển thị trong các trường input.
> Lưu ý: Kiểu color chưa được hỗ trợ trong trình duyệt Internet Explorer.
### 2. The document refresher
Tự động load lại trang web là một tính năng nhỏ trong web, cũng ít được biết đến cũng như ứng dụng nó. Sử dụng để xác định khoảng thời gian mà sau đó trang Web của bạn sẽ refresh một cách tự động (như khi bạn nhấn F5).

Cách sau áp dụng rất nhanh gọn dễ làm, tuy nhiên do dùng thẻ meta nên không thể che dấu khi chạy trên trình duyệt cũng như bot tìm kiếm. Cú pháp là bạn cho vào thẻ HEAD của HTML và viết như sau:
* Tự động tải lại trang hiện hành:
```html
<meta http-equiv="refresh" content="number">
```
```html
<meta http-equiv="refresh" content="30">
```

* Tự động refresh về trang chỉ định:
```html
<meta http-equiv="refresh" content="number">
```
```html
<meta http-equiv="refresh" content="30;url=http://web.com">
```

Ví dụ trên là bạn muốn sau 30 giây sẽ tự động refresh lại trang.
> Lưu ý: Code này không nên dùng cho seo web vì bác google rất khó tính, sử dụng cho các công việc khác thì ok.
### 3. Theme color changer
Bạn muốn đồng bộ giao diện, nâng cao tính nhận dạng thương hiệu và tạo sự thú vị cho người dùng thì hãy thay đổi màu chủ đề trang web của bạn, bằng cách sử dụng thuộc tính `name = ”theme-color”`. Chèn vào giữa thẻ mở và đóng <head>...</head> của file với tag meta như sau:
```html
<!DOCTYPE html>
<html>
	<head>
		<meta name="theme-color" content="#ff8800">
	</head>
	<body>
		content
	</body>
</html>
```
Thẻ meta có name="theme-color" sẽ chỉ định cho trình duyệt biết thay đổi màu sắc của trình duyệt phù hợp với màu sắc mong muốn trong thuộc tính content, trong trường hợp này content="#ff8800" với #ff8800, thay đổi mã màu phù hợp với thương hiệu hoặc chủ đề của website.
> Lưu ý: ”theme-color” sẽ chỉ hoạt động trên thiết bị di động. Khi thiết bị người dùng đang cấu hình chế độ bóng tối (dark-mode) có trình duyệt web sẽ không tuân thủ các cấu hình về màu sắc này.
### 4. Icon adder

![](https://images.viblo.asia/e581d56b-b00f-4bf5-b486-d4deedea9133.png)
Được sử dụng để thêm các biểu tượng vào vị trí của favicon. Favicon được hiểu là một biểu tượng không thể thiếu trong việc xây dựng một website. Đó là một hình icon được hiển thị ở góc trên cùng của tab khi truy cập trình duyệt. Người dùng sẽ nhìn thấy các biểu tượng này như những logo đại diện cho chính website của mình.
```html
<!DOCTYPE html> 
<html> 
	<head> 
		<title>Icon adder</title> 
		<meta name="theme-color" content="pink;"> 
		<link rel="icon" href="/icon.ico" type="image/x-icon"/> 
	</head> 
	<body> 
		content
	</body> 
</html>					 
```

Về file ảnh thì ICO khác biệt PNG ở khả năng lưu trữ nhiều kích thước ảnh cùng lúc, khi cần sử dụng ở 1 kích thước phù hợp, trình duyệt web hoặc các chương trình đọc sẽ tìm kích thước ảnh phù hợp đang được lưu trữ trong ICO sẽ cho ra khả năng hiển thị tốt hơn.
### 5. Voice recognition
Được sử dụng để thêm tìm kiếm bằng giọng nói trong trường input. Giống như tìm kiếm của Google, nó tìm kiếm bằng nhận dạng giọng nói.
```html
<!DOCTYPE html> 
<html> 
	<head> 
		<title>Voice recognition</title> 
	</head> 
	<body> 
		<div class="conatiner"> 
		<input type="text" x-webkit-speech> 
		</div> 
	</body> 
</html>					 
```
> Lưu ý: Điều này sẽ chỉ hoạt động trên thiết bị di động (Lolipop chỉ Google Chrome).


Cảm ơn mọi người đã dành thời gian đọc bài viết!

Tham khảo: https://www.geeksforgeeks.org/top-5-html-tricks-that-you-should-know/