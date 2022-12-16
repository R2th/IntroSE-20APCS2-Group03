Chắc hẳn khi nhắc đến .attr() vs .prop() trong JQuery các bạn đều biết chúng đều có tác dụng lấy ra hoặc gán giá trị cho thuộc tính của 1 đối tượng. Nhưng chúng ta cũng thường hay nhầm lần về 2 phương thức này. Trước khi phân biệt chúng, hãy phân biệt DOM properties và HTML Attributes.
## 1. DOM properties và HTML Attributes
Khi trình duyệt tải trang, nó sẽ đọc dữ liệu (phân tích cú pháp mã hóa) HTML và tạo các đối tượng DOM tương ứng. Đối với các nút phần tử (element node), hầu hết các HTML attributes (các attributes chuẩn) sẽ tự động trở thành properties của các đối tượng DOM. 

Chẳng hạn, nếu thẻ là `<body id="page">`, thì đối tượng DOM có `body.id="page"`.

Nhưng ánh xạ **attribute - property** không phải lúc nào cũng giống nhau! Chúng ta cũng dịch chúng là **thuộc tính** nên thường coi chúng là giống nhau :(. 
| DOM properties | HTML Attributes |
| -------- | -------- |
| Được xác định bởi DOM | Được xác định bởi HTML     |
|Property có thể thay đổi (ví dụ: khi bạn nhập vào ô input, property `value` của nó đã thay đổi) |Một khi đã được khởi tạo, giá trị của một HTML attribute bất kỳ sẽ không thay đổi. (nếu bạn không dùng JS thay đổi nó). |
| Khi thay đổi property, chưa chắc attribute thay đổi| Khi thay đổi attribute, property tương ứng sẽ thay đổi |
| Phân biệt chữ hoa, chữ thường | Không phân biệt chữ hoa, chữ thường  |
|Có nhiều kiểu dữ liệu|Giá trị luôn có kiểu string|
Attribute cung cấp thông tin của thẻ HTML, với các giá trị của attribute đã được khai báo từ đầu trong file HTML. Sau khi trình duyệt đọc file, các đối tượng DOM được tạo với các property tương ứng. Giá trị của chúng sẽ giống nhau nếu bạn không thay đổi nó. Phân biệt đơn giản như vậy để thấy được attribute và property khác nhau hoàn toàn. :) 
## 2. Phân biệt .attr() và .prop()
Trở lại vấn đề chính, **.attr()** và **.prop()** khác nhau như thế nào?


* Ví dụ: 
```
<!DOCTYPE html>
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#p1").text("Giá trị của thuộc tính value ban đầu là " + $('#txtInput').attr('value'));
			$("#p2").text('Sử dụng .attr(): ' + $('#txtInput').attr('value'));
			$("#p3").text('Sử dụng .prop(): ' + $('#txtInput').prop('value'));
			$('#btn1').click(function() {
				$("#p2").text('Sử dụng .attr(): ' + $('#txtInput').attr('value'));
				$("#p3").text('Sử dụng .prop(): ' + $('#txtInput').prop('value'));
			});
		});
	</script>
</head>
<body>
	<p id="p1"></p>
	<div>Thay đổi giá trị trong ô input và nhấn Submit</div>
	<br>
	<input type="text" id="txtInput" value="Value_1">
	<button id="btn1">Submit</button>
	<p id="p2"></p>
	<p id="p3"></p>
</body>
</html>
```
* Ban đầu, mình có 1 thẻ `<input type="text" id="txtInput" value="Value_1">`. Giá trị của thuộc tính value là `Value_1`. Cả **.attr() và .prop()** đều trả về kết quả này. 
* Sau đó, nhập 1 giá trị khác vào ô input, **.attr()** trả về giá trị cũ (Value_1), trong khi **.prop()** trả về giá trị vừa nhập.

Ví dụ này cho thấy:
* Cả .attr() và prop () được sử dụng để lấy hoặc gán giá trị của thuộc tính được chỉ định, nhưng `.attr()` trả về *giá trị mặc định* (original state) của một thuộc tính trong khi `.prop()` trả về *giá trị hiện tại* (current state).
* .attr() thay đổi thuộc tính cho thẻ HTML đó (HTML Attributes)
* .prop() thay đổi các thuộc tính cho thẻ HTML đó theo cây DOM. (DOM properties)

Trong các tình huống cụ thể, việc phân biệt **.attr()** và **.prop()** rất quan trọng. Trước phiên bản JQuery 1.6, **`.attr()`** thỉnh thoảng lấy ra giá trị của property, gây nên sự không nhất quán dữ liệu. Từ JQuery 1.6, **`.prop()`** được sử dụng để lấy ra giá trị property, còn **`.attr()`** lấy ra giá trị attubute. Nên sử dụng `.prop()` nhiều nhất có thể để tránh sai sot nhé.
## Tổng kết
Bài viết này mình đã đưa ra sự khác nhau của .attr() và .prop() trong JQuery. Đây cũng từng là thắc mắc của mình trong thời gian làm việc. Hy vọng bài viết giúp các bạn giải đáp phần nào. 

Thank you :heart_eyes::heart_eyes:
### Tài liệu tham khảo
https://javascript.info/dom-attributes-and-properties

http://net-informations.com/jq/iq/prop.htm

https://viblo.asia/p/co-ban-ve-dom-attribute-va-property-Az45bpYQZxY