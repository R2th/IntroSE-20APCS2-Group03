Hi xin chào các bạn, lâu rồi không có chủ đề gì bàn về CSS, trong một ngày thời tiết nóng nực thế này chúng ta sẽ cùng thư giãn với một chút CSS cho mềm mại nhé =)). Chủ đề hôm nay mình muốn giới thiệu đến các bạn đó là hiệu ứng `Skeleton` khi tải trang. Chắc chắn khi sử dụng các app lớn như Facebook, Youtube,... bạn cũng đã gặp nó rồi. 

`Skeleton` hiểu đơn giản là một bộ khung được định hình trước thay thế cho phần nội dung bạn muốn hiển thị trong thời gian chờ đợi dữ liệu được tải xong. Skeleton giúp tăng trải nghiệm người dùng (UX) và đặc biệt hữu ích trong trường hợp trang/app của bạn có quá nhiều thứ để load và quá nhiều thứ phải chờ đợi. Vậy có cách nào để tự tạo ra `Skeleton` với vài dòng CSS mà không phải đao to búa lớn động đến các thư viện không ? Có nhé, kéo xuống dưới nha

![](https://images.viblo.asia/4388b7f9-719f-4346-a22e-938a2c6c864e.jpg)

Cùng xem qua 1 chút demo nhé

{@embed: https://codepen.io/hoanghung96cs/pen/LYWzEGB}

Trong ví dụ này, mình sẽ demo Skeleton với 1 dòng chứa title và 1 dòng chứa content (ảnh, text,...) khá giống với Facebook

### 1. Dựng HTML

Theo mô tả bên trên HTML của chúng ta sẽ như sau

```html
<div class="container">
  <div class="placeholder title"></div>
  <div class="placeholder content"></div>
</div>
```

Theo đó ta sẽ sử dụng class `.placeholder` để style cho phần hiệu ứng Skeleton

### 2. Viết CSS

Trước tiên mình sẽ style cho phần `.container` chứa Skeleton, phần này thì không quan trọng lắm, tuỳ vào UI đề ra mà bạn sẽ style cho phù hợp với yêu cầu

```css
.container {
  width: 300px;
  padding: 10px;
  background: #eee;
  margin: auto;
}
```

Một chút CSS cho phần `.title` và `.content` 

```css
.title {
  width: 80%;
  min-height: 20px;
  margin-bottom: 10px;
}

.content {
  width: 100%;
  min-height: 60px;
}
```

Tiếp theo ta sẽ style cho phần `.placeholder` nơi mà hiệu ứng Skeleton sẽ hoạt động, phần nội dung sẽ như sau

```css
.placeholder {
  position: relative;
  overflow: hidden;
  
  background: #ccc;
  border-radius: 3px;
}
```

Trong đó 2 thuộc tính quan trọng quyết định thành bại đó là `position: relative` => để style absolute cho phần `:after`, ` overflow: hidden` ngăn content tràn ra ngoài

Tiếp theo ta sẽ style cho phần `:after`, phần sẽ nhận nhiệm vụ chạy animation 

```css
.placeholder:after{
  content: "";
  position: absolute;

  height: 100%;
  width: 100px;
  left: -100px;
  top: 0;

  background: linear-gradient(to right, transparent, #ffffff70, transparent);
  animation: reflect 800ms ease-out infinite;
}
```

Như vậy ta sẽ sử dụng animation chạy với thuộc tính left để hiệu ứng chạy từ trái qua phải với số lần lặp là `infinite` khi animation được kích hoạt (bạn chú ý đoạn này nhé)

Cuối cùng ta sẽ định nghĩa ra `keyframes` để chạy animation kia đơn giản như sau

```css
@keyframes reflect {
  to {
    left: calc(100% + 100px);
  }
}
```

Bùm !!! thế là bạn đã tạo xong rồi đó, tổng kết lại source code sẽ như sau

**HTML**

```html
<div class="container">
  <div class="placeholder title"></div>
  <div class="placeholder content"></div>
</div>
```

**CSS**

```css
.container {
  width: 300px;
  padding: 10px;
  background: #eee;
  margin: auto;
}

.title {
  width: 80%;
  min-height: 20px;
  margin-bottom: 10px;
}

.content {
  width: 100%;
  min-height: 60px;
}

.placeholder {
  position: relative;
  overflow: hidden;
  
  background: #ccc;
  border-radius: 3px;
}

.placeholder:after{
  content: "";
  position: absolute;

  height: 100%;
  width: 100px;
  left: -100px;
  top: 0;

  background: linear-gradient(to right, transparent, #ffffff70, transparent);
  animation: reflect 800ms ease-out infinite;
}

@keyframes reflect {
  to {
    left: calc(100% + 100px);
  }
}
```

### 3. Implement

Tuỳ vào ngôn ngữ bạn đang sử dụng bạn sẽ cần cân nhắc thêm vào cho phù hợp. Mình ví dụ đơn giản với luồng chạy: `get data => gán loading true => hiện Skeleton => load xong data => loading = false => ẩn Skeleton => hiện nội dung`. Mô tả đơn giản bằng đoạn code react sau

```js
loading
  ? <Skeleton />
  : <Avatar src={data.avatar} />
```

### 4. Kết luận

Trên đây mình đã giới thiệu đến các bạn cách tạo ra Skeleton loader đơn giản với vài dòng CSS, trên thực tế có rất nhiều cách khác bạn có thể tham khảo để phục 1 cách tốt nhất cho công việc của bạn

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công và hẹn gặp lại ở bài viết sau nhé !