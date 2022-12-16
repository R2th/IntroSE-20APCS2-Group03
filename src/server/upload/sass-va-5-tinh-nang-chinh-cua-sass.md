# **I. Giới thiệu**
**SASS là gì?**
    
   - SASS là một CSS Prepocessor.
   - phải qua một bộ lọc thì SASS hoặc SCSS mới sáng css bình thường.
   - Có 2 loại đuôi mà SASS hỗ trợ đó là: `sass` và `scss`
   - Lưu file theo kiểu SASS thì rất chi tiết về dấu tab cũng như space.
   - Bởi vậy nên thường lưu file theo dạng đuôi là scss.
    
 **Tại sao nên sử dụng SASS?**
    
   Bình thường trước đây ta mà muốn chia 1 đoạn div 1000px chẳng hạn thành 2 div, mỗi div cách nhau khoảng 50px thì khi đó ta lại phải dùng máy tính bấm "1000-50/2" suy ra mỗi div sẽ rộng là 475px. Tuy nhiên với `SASS` thì không cần phải viết làm như vậy bạn chỉ cần trừ và chia đôi nó. Đây chỉ là một trong 5 tính năng chính của SASS.
    
> **Note**: nó có thể đem lập trình  dung nhập vào css.
> Tự động nén tập tin CSS lại để bạn tiết kiệm dung lượng. 

**Cài đặt SASS**

Cài đặt ruby: `sudo apt install ruby`

Sau đó, cài đặt sass: `sudo gem install sass`

Nếu bị lỗi hãy thử cài đặt: `sudo apt-get install ruby-dev` rồi cài lại lặp lại câu lệnh trên, lý do vì gói này chứa các tệp tiêu đề cần thiết cho các thư viện mở rộng cho Ruby.
# **II. So sánh 2 định dạng SASS và SCSS**
File .sass không cần phải có dấu {}, không cần dấu ";" cuối câu nhưng hãy lưu ý dấu tab và dấu cách khi làm việc với file .sass bởi vì nó xử lý rất kỹ về vấn đề này,  chỉ cần sai 1 dấu tab hoặc 1 dấu cách là chương trình lỗi.

`file test.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>
<link rel=stylesheet" href="test.css">
</head>
<body>
    <h2>Demo về SASS</h2>
</body>
</html>
```
>**Note**: Các bạn hãy nhớ kỹ là link tới file có đuôi là .css nhá chứ không phải .sass hay .scss không lát nữa lại phải quay lên xem lại đấy :D 

**Định dạng sass**

`file test.sass`

```sass
$mauvang: yellow
$mauxanh: green
body
    background-color: $mauvang
h2
    background-color: $mauvang
    color: $mauxanh
    padding: 10px
```

> Sau đó bạn hãy mở thư mục chứa project bạn làm nên bằng Terminal (đây là mình sử dụng Ubuntu, các bạn Windows thì gõ từ khóa git bash và cài đặt về nhá!!)  và gõ:
 
> `$ sass --watch test.sass`

Sau khi gõ xong dòng lệnh này nó sẽ tạo ra 2 file đó là:

   > - test.css: file css bình thường chứa nội dung đã được lọc của file test.sass 
   > - test.css.map:  nó như là bản đồ, bạn có thể hiểu là nó cho phép mình biết test.css và test.sass kết nối với nhau.
    
 Các bạn quan sát khi mình thay đổi code trong file sass thì trong Terminal nó cũng tự cập nhật mình thay đổi những gì, nó sẽ check cú pháp và khi code sai nó cũng sẽ thông báo cho chúng ta sai ở dòng nào (các bạn nên mở 2 cửa sổ để quan sát).
 
 **- Ưu điểm**: viết nhanh, không ngoặc, không cần ";"  ở cuối dòng. Suy ra tốt cho người mới học css và đã biết css rồi thì sẽ không quen.
 
 **- Nhược điểm**: vì không cần ngoặc nên dùng khoảng trắng (tab, space để thay cho việc ngăn cách giữa code css với nhau). Chỉ cần sai 1 dấu cách là lỗi.
 
**Định dạng scss**      
      
`file test.scss`

```sass
$mx: #c69;
$bg_color: #d5d5d5;
body {
    background-color: $bg_color;
}
h2 {
    background-color: $bg_color;
    color: $mx;
    padding: 10px
}
```

> **Note**: Bạn cũng nên cần chạy câu lệnh: `$sass --wath test.scss`, và bạn có thể không cần dấu `";"` sau mỗi câu lệnh như sass nhưng khi trong dòng lệnh mà có biến thì cần phải có.
 
**- Ưu điểm**: Chrome nó hiểu được scss như css, cách viết không thay đổi nhiều so với css

**- Nhược điểm**: Nhiều ký tự hơn sass,...

**Kết luận**: Do những ưu điểm và cách viết của scss gần giống với css nên mình chọn scss để làm phần tính năng của sass.

# **III. 5 Tính năng chính của SASS**
### **1. Sử dụng biến**
**Biến là gì?** Biến là  một kí hiệu  để lưu giá trị.

**Tác dụng**: thay thế hàng loạt các thuộc tính của website.

```sass
$mx: #c69;
$bg_color: #c3c3c3;
body {
	background-color: $bg_color;
}
h1.display-3 {
	color: $mx;
}
p {
	color: $mx;
	font-size: 20px
}
```
### **2. Tính năng xếp chồng trong SASS**
Các bạn nhìn qua ví dụ nhá, nó cũng dễ hiểu thôi mà.
```sass
$mx: #FFCC00;
$mx2: #fff;
$fs1: 13px;
$fs2: 15px;
$fs3: 25px;
$fs4: 48px;
$bg_color: #699;
$font_family: seoge;
$t-center: center;

.cart {
	width: 900px;
	margin: auto;
	background: $bcolor;
	h1 {
		text-align: $t_center;
		color: $mx2;
	}
	p {
		text-align: $t_center;
		color: $mx;
		font : {
			family: $font_family;
			size: $fs2;
			weight: bold;
			style: italic;
		}
	}
}
```
### **3. Tính năng sử dụng lại code trong SASS**
- Sử dụng nguyên lại cả đoạn code.
- Sử dụng code có tham số (tương tự như function trong lập trình)

**1. Sử dụng lại code.**

Giả sử hiện tại mình có 2 đoạn div:
```html
<div class="cart">
		<img src="https://kacabiru.files.wordpress.com/2010/11/smilelaughuy0.png" alt="">
		<h1 class="display-3">Hello world!</h1>
		<p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
		</p>
		<p class="">
			<a href="" role="button"></a>
		</p>
	</div>
```
và
```html
<div class="shop">
		<img src="https://pbs.twimg.com/profile_images/913476470495834112/_2q-AF8K_400x400.jpg" alt="">
        <p>
             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        </p>
	</div>
```
Ở đây mình muốn 2 hình ảnh đều căn trái giống nhau, như vậy ở đây chúng ta sẽ phải có 2 đoạn code css cho 2 img, như vậy sẽ dài code. 

Trong SASS có khái niệm là `@mixin`, @mixin các bạn có thể hiểu nó tương tự như 1 hàm trong lập trình vậy.

Đơn giản bạn chỉ cần đặt tên cho `mixin` và ở dưới image bạn gán `@include tên_mixin` là được, hãy theo dõi ví dụ phía dưới nhá.

```sass
@mixin left_image() {
	float: left;
	width: 100px;
	margin-right: 20px;
}
.cart {
	width: 900px;
	margin: auto;
	background: $bg_color;
	img {
		@include left-image;
	}
}
.shop {
	width: 600px;
	margin: auto;
	img {
		@include left_image;
	}
}
```
### **4. Tính năng viết pseudo class nhanh trong SASS**
**Pseudo class là gì?**

   Pseudo là gì? Bạn có thể search với từ khóa là pseudo css sẽ ra kết quả như là :hover, :active, :link,... Các thẻ này chắc ai mà code css rồi thì sẽ rất quen thuộc.
   
   Ví dụ mình muốn khi di chuyển chuột lên 1 thẻ h1 thì sẽ chuyển sang màu khác.
   ```sass
   h1 {
		text-align: $t_center;
		color: $mx2;
		&:hover {
			color: #FF00F0;
		}
	}
   ```
   
   `&` ở đây có thể hiểu là nó lấy địa chỉ của phần tử chứa nó, ở đây là h1.
### **5. Tính năng tính toán trong SASS**
Tính năng cuối cùng mà mình muốn giới thiệu là tính năng tính toán trong SASS.
Ví dụ các bạn có 1 file html có nội dung như sau:
```html
<body>
	<div class="content">
		<div class="col">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis labore dolor provident voluptas fuga, asperiores hic dicta reprehenderit. Maiores praesentium, ad ducimus tenetur omnis? Incidunt blanditiis ipsum, commodi ullam voluptates!</p>
		</div>
		<div class="col">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis labore dolor provident voluptas fuga, asperiores hic dicta reprehenderit. Maiores praesentium, ad ducimus tenetur omnis? Incidunt blanditiis ipsum, commodi ullam voluptates!</p>
		</div>
		<div class="col">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis labore dolor provident voluptas fuga, asperiores hic dicta reprehenderit. Maiores praesentium, ad ducimus tenetur omnis? Incidunt blanditiis ipsum, commodi ullam voluptates!</p>
		</div>
	</div>
</body>
```
Và bây giờ mình muốn chia div có class content ra làm 3 với độ dài width của 3 class con bên trong phải giống nhau. Ví dụ kết quả bằng `33.33333337px` ta cần phải ghi nhớ con số đó và gõ vào ư? Rất mất thời gian phải không, nhưng với SASS nó hỗ trợ sẵn cho chúng ta hết rồi chúng ta chỉ cần khai báo độ dài tổng thể và phương thức tính toán cho nó.

```sass
$height_content: 1000px;
$space: 30px;

.content {
	width: $height_content;
	margin: auto;
	.col {
		background: #6DFF00;
		padding: 20px; 
        //box-sizing giúp độ rộng không bị nở ra, bạn có thể hiểu là class .col có width =100px,
        //và khi padding thì sẽ bằng 100px+40px(2 bên trái và phải) vậy width nó sẽ bằng 140px,
        //nhưng khi ta gán thuộc tính box-sizing thì width của nó vẫn chỉ là 100px;
        box-sizing:border-box;
        float: left;
		width: ($height_content - (2*$space))/3;
		margin-right: $space;
		&:last-child {
			margin-right: 0px;
		}
	}
}
```
Bạn có thể mở inspect nên và kiểm tra và thấy width của `col` là 313.3333333333px nếu gõ bằng tay có thể sẽ thừa hoặc thiếu 1 số đấy :D

# **IV. Kết luận**
Thông qua 5 tính năng của sass chắc các bạn cũng thấy điểm lợi của nó rồi phải không, các bạn ai mà gặp lỗi không chạy được, cứ TO mình nhá mình sẵn sàng giúp đỡ các bạn!! Sắp tới đây mình định viết thêm về:

   - Xử lý Jquery với SASS
   - Viết SASS cho giao diện responsive
   - Xử lý slide và hiệu ứng chuyển động
   
   Mình mong các bạn có thể ủng hộ mình, Thanks!!