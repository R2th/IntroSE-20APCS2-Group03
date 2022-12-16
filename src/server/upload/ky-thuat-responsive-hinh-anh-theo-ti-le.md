## Tổng quan
![](https://images.viblo.asia/0da7b76e-ec4a-443f-a31a-5a1de8fdb538.PNG)
Chúng ta thấy ảnh ở hầu hết các trang web với những định dạng và kích thước khác nhau. Một số trang web sẽ xử lí hình ảnh trước khi upload lên (resize kích thước, dung lượng, thay đổi meta), còn hầu hết những trang web chuyên đi craw tài nguyên từ nơi khác sẽ không resize lại kích thước ảnh. Khi sử dụng ảnh từ nhiều nguồn như vậy, họ đã kiểm soát việc hiển thị ảnh với đủ thể loại kích thước như vậy thế nào?
## Image và background-image
![](https://images.viblo.asia/fbc1aab7-4489-4085-a499-7a748df861f4.PNG)

Hình ảnh trên web có thể được nhúng vào thông qua thẻ img, thuộc tính background-image, hoặc được vẽ bằng canvas. Nếu chỉ nhìn vào những gì được hiển thị trên màn hình, rất khó để có thể phân biệt. Tuy nhiên, giữa image và background-image có sự khác biệt cơ bản: **background-image không được coi là một phần nội dung của trang web**, vì thế nó không xuất hiện trong bất cứ kết quả tìm kiếm nào (khi tìm kiếm bằng search engine). Đây là vấn đề cần chú ý khi SEO.

Ảnh khi được đưa vào trang web qua thuộc tính src của thẻ img sẽ hiển thị theo kích thước và tỉ lệ gốc của nó mà không phụ thuộc vào kích thước vùng chứa. Còn background-image phụ thuộc hoàn toàn vào vùng chứa của nó, tức là kích thước ảnh sẽ không bao giờ vượt khỏi phạm vị này. 

Theo tính chất trên, chúng ta sẽ giải quyết 2 vấn đề để có thể hiển thị những bức ảnh có kích thước khác nhau theo cùng 1 tỉ lệ:

* Kiểm soát vùng chứa theo tỉ lệ mong muốn (không cần quan tâm đến kích thước ảnh)
* Để bức ảnh che phủ toàn bộ vùng chứa mà không mất đi tỉ lệ gốc (không cần quan tâm đến tỉ lệ vùng chứa)

## Cover vùng chứa ảnh
Chúng ta có thể sử dụng 2 thuộc tính css tương ứng để có thể giúp bức ảnh cover được toàn bộ vùng chứa là object-fit: cover và background-size: cover.

(object-fit hoàn toàn không được hỗ trợ bởi IE, nên cân nhắc trước khi sử dụng)
```CSS
.thumbnail > img {
  /* Sử dụng cho image
  <related image properties> */
  object-fit: cover;
}
.thumbnail {
  /* Sử dụng cho background-image
  <related background properties> */
  background-size: cover;
}
```
## Tạo vùng chứa theo tỉ lệ
Vùng chứa cần có chiều rộng và chiều cao theo tỉ lệ chúng ta mong muốn. Thủ thuật ở đây là việc sử dụng padding-top theo % (so với chiều rộng được set sẵn hoặc phụ thuộc thành phần cha).

Ví dụ: 

Với chiều rộng 400px, để tạo ra chiều cao 300px (tỉ lệ 4:3), chúng ta cần cho nó padding-top: 75%. Tương tự cho các trường hợp khác.

Công thức: **padding-top = (height / width) * 100%**

Dĩ nhiên, nếu chỉ như vậy thì vùng chứa sẽ chiếm diện tích và đẩy phần content phía sau ra ngoài nó. Để giải quyết, chúng ta chỉ cần set cho nó thuộc tính position: relative và thẻ img thuộc tính absolute.
```CSS
/* Cấu trúc chung */
.block.block---modifier
  <img | none>
/* Ví dụ */ 
.thumbnail.thumbnail--1by1
  img(src=link)
.thumbnail.thumbnail--4by3.thumbnail--bg(style="background-image: url(link)")
```
Trong đó:

* class thumbnail: tạo vùng chứa chung
* class thumbnail--bg: chỉ định sử dụng background-image thay vì image (cần cung cấp link ảnh thông qua thuộc tính url)
* class thumbnail--1by1, thumbnail--4by3...: tạo vùng chứa theo tỉ lệ (width / height)
* Thẻ img: Cung cấp link ảnh để hiển thị qua thuộc tính src

## Tạo bộ khung linh hoạt
Đôi khi chúng ta cần một bộ khung linh hoạt để có thể tác động cùng lúc lên nhiều phần tử. Trong trường hợp này, sử dụng một hệ thống lưới như của Bootstrap là một giải pháp khá hữu ích. Hệ thống cột sẽ giúp kiểm soát độ rộng của phần tử, còn chiều cao sẽ được tính toán lại tự động dựa theo công thức mà chúng ta đã áp dụng.

Source code cụ thể với pug và scss
```js
/* pug */
-
	var imgs = [
		"https://tinyurl.com/w38zued",
		"https://tinyurl.com/u8ztbtp",
		"https://tinyurl.com/rsykhur",
		"https://tinyurl.com/wcvvety"
	];
.container
	.row
		.col-6
			.thumbnail.thumbnail--1by1
				img(src=imgs[0])
		.col-6
			.thumbnail.thumbnail--4by3
				img(src=imgs[1])
		.col-6
			.thumbnail.thumbnail--16by9.thumbnail--bg(style=`background-image: url(${imgs[2]})`)
		.col-6
			.thumbnail.thumbnail--4by5.thumbnail--bg(style=`background-image: url(${imgs[3]})`)
```
```CSS
/* scss */
@function aspectRatio($w, $h) {
	@return ($h / $w) * 100%;
}
@mixin genAspectRatioClass($w, $h) {
	&--#{$w}by#{$h} {
		padding-top: aspectRatio($w, $h);
	}
}
.thumbnail {
	display: block;
	position: relative;
	
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}
	
	&--bg {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	
	@include genAspectRatioClass(1, 1);
	@include genAspectRatioClass(4, 3);
	@include genAspectRatioClass(16, 9);
	@include genAspectRatioClass(4, 5);
}
```
{@embed: https://codepen.io/ChimSeDiNang/pen/ExxeRBw}

Dĩ nhiên đây chỉ là giải pháp tình thế, các bức ảnh sẽ hiển thị không được hoàn hảo nếu tỉ lệ gốc của nó sai lệch quá nhiều so với tỉ lệ chúng ta thiết lập. Dù sao, đây cũng là một cách phổ biến và đơn giản để có thể thực hiện. :beers: