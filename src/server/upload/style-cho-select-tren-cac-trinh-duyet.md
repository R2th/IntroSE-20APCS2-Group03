Việc tạo style cho select sao cho đồng đều trên các trình duyệt là một việc khá khó khăn. Có rất nhiều cách để giải quyết, như style cho phần tử parent, add thêm pseudo-elements và thậm chí sử dụng cả Javascript để dựng một select - kiểm soát các yếu tố khác nhau để dễ style hơn. Nhưng hầu như các cách giải quyết trên rất khó để dùng và duy trì, chưa kể việc còn các yếu tố phần tử bên ngoài khác tác động đến.


**1. Ví dụ**

Dưới đây là các kiểu select css đơn lập mà không dùng đến các phần tử bọc ngoài hay sử dụng pseudo-elements (ngoại trừ select dành cho IE10+). Các ví dụ có thể xem trong [link demo](http://filamentgroup.github.io/select-css/demo/) này.


**2. Code**

Dưới đây là HTML và CSS tham khảo:
```
<select class="select-css">
	<option>This is a native select element</option>
	<option>Apples</option>
	<option>Bananas</option>
	<option>Grapes</option>
	<option>Oranges</option>
</select>
```

```
.select-css {
	display: block;
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: .6em 1.4em .5em .8em;
	width: 100%;
	max-width: 100%; 
	box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
	  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
	display: none;
}
.select-css:hover {
	border-color: #888;
}
.select-css:focus {
	border-color: #aaa;
	box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
	box-shadow: 0 0 0 3px -moz-mac-focusring;
	color: #222; 
	outline: none;
}
.select-css option {
	font-weight:normal;
}
```

**3. Lưu ý cho phần CSS**

- Select đang được set mặc định là display: block, tuy nhiên cũng có thể sử dụng display: inline-block; width: auto; nếu muốn đặt cạnh thẻ label.
- Background của select bao gồm hai background-image: đầu tiên là svg icon arrow và phần linear gardient. Có thể thay đổi link Url trong phần background-image nếu muốn. Nếu định thay đổi icon image, hãy chú ý hai phần là background-position và background-size. Nếu kích thước hay đổi, có thể sẽ phải thêm padding right cho phần button arrow để nó không đè lên phần select text, nhưng hãy lưu ý là từ IE9 trở lên, phần custom arrow sẽ không xuất hiện và chỉ có phần arrow mặc định của trình duyệt sẽ hiển thị ở phần padding left, vì thế đừng add thêm padding cho phần arrow trên IE9, nếu không sẽ bị lỗi. 
- Phần linear gradient background khá quan trọng, sẽ giúp ích rất nhiều cho việc hiển thị trên IE, có thể chỉnh lại color của linear gradient nếu muốn dùng color đơn sắc.
- font-size: 16px;  - Mục này cũng khá quan trọng vì iOS Safari sẽ zoom-in site layout nếu select text nhỏ hơn 16px. Để tránh bị như vậy, nên set để mặc định tuỳ chọn này.
- Nếu set background-color thì cũng có thể khiến các thành phần tuỳ chọn khác bị kế thừa theo, nên tránh set background-color.
- Ta có:
```
.select-css::-ms-expand 
```
Dùng rule này trên IE10 và IE11 có thể ẩn được phần arrow mặc định và dùng được phần arrow đã được custom lại.


**4. Hiển thị trên các trình duyệt**

Và đây là kết quả. Trong một số trình duyệt như IE9 và các phiên bản IE cũ hơn, icon design có vẻ không được đẹp lắm những vẫn có thể sử dụng và đủ ổn để đáp ứng cho các mục đích cơ bản.

![](https://images.viblo.asia/919bffb0-6250-4f59-aa12-151b7ff17f82.png)

Link bài viết tham khảo [tại đây](https://www.filamentgroup.com/lab/select-css.html)