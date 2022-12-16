![](https://images.viblo.asia/0a225001-33dd-4545-b01f-fbb6b9b0efed.jpg)

Hello mọi người, mình tiếp tục trở lại với series về thủ thuật CSS đây.

### 1. Enable `Show user agent shadow DOM` trong DevTools của trình duyệt để debug CSS dễ dàng hơn

Đã bao giờ bạn code CSS cho:

+ Input có `type="range"` với các pseudo như `::-webkit-slider-runnable-track`, `::-webkit-slider-thumb`
+ Input có `type="text"` với các pseudo như `::placeholder`

mà không biết debug trên trình duyệt như thế nào?

Đơn giản là trong Settings của ChromeDevTools bạn cần enable option **Show user agent shadow DOM**

![alt](https://css-tricks.com/wp-content/uploads/2017/11/enable_in_content_chrome-an.png)

Ở Firefox, bạn có cũng có thể enable tính năng này lên bằng cách mở 1 tab mới, gõ `about:config` và set `devtools.inspector.showAllAnonymousContent` thành true, restart lại trình duyệt rồi thưởng thức :)

![Hình từ nguồn tham khảo](https://css-tricks.com/wp-content/uploads/2017/11/enable_in_content_firefox-an.png)

### 2. Remove khoảng cách thừa ở dưới image

Bình thường khi tạo ra 1 `img` trong HTML, nó sẽ sinh ra khoảng cách nhỏ ở dưới tấm hình đó, nếu bạn tạo wrapper cho tấm ảnh rồi CSS border cho wrapper sẽ thấy rõ. Sinh ra 1 khoảng cách như thế là không ổn chút nào với người làm Frontend. Hãy xem demo bên dưới

{@codepen: https://codepen.io/tinhh/pen/mGypyB/}

Cách khắc phục là luôn luôn set thuộc tính `vertical-align: middle` cho thẻ `img`

{@codepen: https://codepen.io/tinhh/pen/gdboPv/}

### 3. Những thứ hay ho bạn có thể làm với `pointer-events`

[Ở phần 2 của series này](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-2-1VgZvwQMlAw#_4-use-pointer-events-to-control-mouse-events-3), mình cũng có chia sẻ 1 tip sử dụng `pointer-events: none` cho button disabled. Không chỉ dừng lại ở đó, `pointer-events` còn có thể làm nhiều thứ thú vị hơn thế nữa.

Bạn đã từng bó tay khi trong CSS muốn selectors tới `parent` hay `previous` element. Trong sách vở thì nói rằng CSS không support selectors đấy, nhưng `pointer-events` có thể giúp bạn làm được

> Key ở đây là: set `pointer-events: none` cho parent element (scope mà bạn target tới) và reset `pointer-events: auto` cho descendant element (element mà bạn muốn hover lên nó)

Hãy xem kết quả bên dưới:

**Change style của `parent element` khi hover**
{@codepen: https://codepen.io/tinhh/pen/GXJvaB/}

**Change style của `previous element` khi hover**
{@codepen: https://codepen.io/tinhh/pen/JadyQN/}

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS của mình với 3 tips trên.

Nếu thấy thích thì **Upvote**, thấy hay thì **Clip** bài này của mình nhé! ^^

# Tài liệu tham khảo

https://css-tricks.com/sliding-nightmare-understanding-range-input/
https://codepen.io/MartijnCuppens/pen/MBjqbM

**P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!**