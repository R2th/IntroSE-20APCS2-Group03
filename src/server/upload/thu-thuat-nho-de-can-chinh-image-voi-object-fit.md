Chào các bạn,

Có lẽ trong hành trình code của các bạn thì không ít lần gặp vấn đề méo ảnh do fix cứng cả width, height của ảnh nhỉ? Hoặc kể cả khi bạn set value cho 1 thuộc tính weigth hoặc height còn thuộc tính còn lại để auto thì nhiều lúc ảnh cũng không được hiển thị toàn vẹn cho lắm. Từ đó sẽ dẫn tới việc không đúng ý của người upload image. Chính vì vậy, ở bài viết này mình xin giới thiệu tới các bạn tới 1 thuộc tính css có thể giải quyết vấn đề về căn chỉnh image giúp các bạn, đó là **object-fit**.

**object-fit** là thuộc tính hỗ trợ người dùng resize lại kích thước của **<image>** hoặc **<video>** sao cho vừa vặn với khung sẵn có.
**object-fit** có các giá trị sau:

- **fill**: Đây là giá trị default. Lúc này image sẽ được thay đổi kích thước để có thể lấp kín element chứa nó nhiều nhất có thể. Nếu cần, hình ảnh sẽ được kéo căng hoặc thu nhỏ để vừa.
- **contain**: Hình ảnh vẫn giữ nguyên tỷ lệ co giãn nhưng được thay đổi kích thước để vừa với kích thước đã cho.
- **cover**: Hình ảnh giữ nguyên tỷ lệ co giãn và lấp đầy kích thước đã cho. Hình ảnh sẽ được cắt bớt sao cho vừa khớp với khung của element chứa nó.
- **none**: image không resize
- **scale-down**: Hình ảnh được thu nhỏ xuống phiên bản nhỏ nhất của **none** hoặc **contain**.
    
Ở trong bài này mình chú trọng tới 2 giá trị hay sử dụng nhất là **cover** và  **contain**.
    
### object-fit: cover
    
Như mình đã giải thích bên trên. Khi sử dụng **object-fit: cover** thì hình ảnh sẽ giữ nguyên tỷ lệ và sẽ được cắt bớt sao cho vừa khớp với khung của element chứa nó. Các bạn có thể xem ví dụ dưới đây:

```
<div class="media">
  <h2>No object-fit</h2>
  <div class="none object">
  	<img src="paris.jpg" alt="Paris" style="width: 350px; height: auto">
  </div>
</div>

<div class="media">
  <h2>object-fit: cover</h2>
  <div class="cover object">
  	<img class="contain" src="paris.jpg" alt="Paris" style="width: 350px; height: 350px">
  </div>
</div>
```
    
Giải thích 1 chút với đoạn code trên: Mình có 1 ảnh. 1 bên chỉ set gái trị cho width còn height: auto, 1 bên fix cứng giá trị cho cả 2. Lúc này mình sẽ sử dụng css như sau:

```
.media {
	display: inline-block;
    margin: 30px;
}

.object {
	background: #E6E6FA;
    border: 4px double green;
    width: 350px;
    height: 350px;
}

img {display: block;}

.cover {object-fit: cover;}
```

Và kết quả hiển thị sẽ là như thế này:

![](https://images.viblo.asia/24225fc7-b19b-4e9e-9f78-d9a6c5f7fbfe.png)

Như các bạn thấy đó, 1 phần ảnh ở bên phần **object-fit: cover** đã được cắt bớt sao cho vừa đủ với khung của element chứa nó.


### object-fit: contain

Ngược với **object-fit: cover**, **object-fit: contain** sẽ thay đổi kích thước của ảnh sao cho ảnh đó hiển thị đầy đủ trong khung.
Thực chất có rất nhiều khách hàng họ muốn hiển thị hình ảnh theo kiểu này. Như vậy, họ không cần băn khoăn việc cut image sao cho đúng tỷ lệ, họ chỉ cần chọn ảnh đẹp, vừa ý để upload lên. Mình có 1 đoạn code như sau:

```
<h2>object-fit: contain</h2>

<div class="media">
    <img src="pic_trulli.jpg" alt="Trulli" width="500" height="333">
</div>

<div class="media">
    <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
</div>
```

Đoạn HTML trên mình sử dụng 2 hình ảnh có kích thước khác nhau:

- Ảnh 1: width > height
- Ảnh 2: height > width 

Như vậy có thể nhìn thấy 1 cách trực quan nhất. Và sử dụng css như sau:

```
.media {
	background: #E6E6FA;
    border: 4px double green;
    margin: 30px;
    width: 350px;
    height: 350px;
    display: inline-block;
}

.media img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

Kết quả hiển thị sẽ được như thế này.

![](https://images.viblo.asia/69efd3aa-b86b-4505-92d6-08e3527f1dfe.png)

Nhìn khá là thích mắt đúng không?

### object-position

Thuộc tính **object-position** được sử dụng cùng với **object-fit** để chỉ định vị trí cho  **<img>** hoặc **<video>** với tọa độ **x/y** bên trong content box.

Lấy ví dụ cũng với đoạn HTML trên, nếu như không thêm object-position thì ảnh sẽ mặc định được căn center theo cả chiều ngang và chiều dọc. Vậy nếu như thêm object-position vào thì nó sẽ hiển thị như thế nào?

```
.media {
	background: #E6E6FA;
    border: 4px double green;
    margin: 30px;
    width: 350px;
    height: 350px;
    display: inline-block;
}

.media img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: 5px 10%;
}
```

Và lúc này nó sẽ hiển thị như sau:

![](https://images.viblo.asia/4ac260ec-7583-476f-a755-4e7cf11ccff6.png)

Chỉ đơn giản là như vậy thôi. Thực chất, thuộc tính này khá ít sử dụng vì hầu như ai cũng muốn ảnh căn middle là sẽ đẹp nhất.

Như vậy, qua bài viết này, các bạn có thể bổ sung thêm cho bản thân 1 cách căn chỉnh image sao cho đẹp mắt. Chúc các bạn thành công!