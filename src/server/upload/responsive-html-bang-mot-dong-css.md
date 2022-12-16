Trong bài viết này, tôi sẽ hướng dẫn bạn cách sử dụng CSS Grid để tạo ra một lưới hình ảnh cực hay, thay đổi số lượng cột với chiều rộng của màn hình. Cái quan trọng nhất và hay nhất là để làm được việc đó ta chỉ cần một dòng lệnh. 

## Cài đặt

Trong bài viết này, tôi sẽ sử dụng hệ thống lưới CSS Grid để chia layout: 

Code HTML:

```
  <div class="container">
     <div>1</div>
     <div>1</div>
     <div>1</div>
     <div>1</div>
     <div>1</div>
     <div>1</div>
  </div>
```

Code CSS:

```
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 50px 50px;
}
```

Trên đây là những đoạn code  mà chúng ta hay dùng để chia layout, giờ thay vì chúng ta dùng `px` thì chúng ta chuyển nó thành `fr`. Vậy `fr` là gì thì gì thì chúng ta tìm hiểu ngay sau đây!

## `fr` là gì ?

`fr` là đơn vị đo. `fr` mô tả một phần của nhiều phần mà ta chia đều nó, giờ chúng ta viết lại đoạn mã trên như sau:

```
    .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px 50px;
}
```

Vá sau khi chúng ta chia lại thì lưới đã chia toàn bộ chiều rộng thành 3 phần đều nhau, ta thu được kết quả như sau:

![](https://images.viblo.asia/9be09bb8-a6c4-470f-a9b1-47d997eb23e5.gif)

Nếu chúng ta chuyển `grid-template-columns: 1fr 2fr 1fr` thì cột thứ 2 sẽ có chiều rộng gấp đôi hai cột còn lại, tổng chiều rộng hiện đang là 4fr và phần thứ hai đã chiếm 2/4 trong khi các phần khác chiếm 1 phần, kết quả thu được như sau: 

![](https://images.viblo.asia/4eb99db7-6948-441c-9f65-832e2c9ff74f.gif)

## Thay đổi số cột

Giờ chúng ta muốn thay đổi số lượng cột với chiều rộng của container, nhưng để đạt được điều đó, thì chúng ta cần học thêm 3 khái niệm mới:

### Repeat()

Hàm này sẽ chỉ định số cột và hàng của bạn, cú pháp như sau:

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3 1fr);
}
```

Nói cách khác repeat(3, 1fr) giống hệt như  `1fr 1fr 1fr` với tham số đầu tiên chỉ định số lượng của hàng hoặc cột mà bạn mong muốn, tham số thứ hai chỉ định chiều rộng của chúng, như vậy sẽ cho chúng ta một bố cục chính xác

![](https://images.viblo.asia/1cf60569-09c3-4f3f-b559-d08ac90174ab.PNG)

### auto-fit

Thay vì đưa vào cột cố định, `auto-fit` đã giải quyết được việc đó bằng cách chia các cột tự động với breakpoint tương ứng.

```
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, 100px);
    grid-template-rows: repeat(2, 100px);
}
```

Nếu các bạn làm theo thì nó sẽ ra kết quả như sau: 

![](https://images.viblo.asia/22a7f499-0f99-4743-bb68-66a214d31f57.gif)

Bây giờ lưới đã thay đổi số cột và chiều rộng của container.
**Tuy nhiên, nếu tôi đưa tất cả các cột thành chính xác 100px,tôi sẽ không bao giờ có được sự linh hoạt mà tôi muốn, vì chúng không được thêm chiều rộng đầy đủ. Như các bạn thấy thì nó sẽ có một khoảng trắng bên phải =.=**
Để giải quyết vấn đề này, tôi giới thiệu thêm một thuộc tính nữa:

### minmax()

Thuộc tính này đơn giản là thay thế 100px thành minmax(100px 1fr), các bạn theo dõi dưới đây:

```
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: repeat(2, 100px);
}
```

![](https://images.viblo.asia/2035b883-687a-48f9-858d-45e6076184b2.gif)

Và như bạn có thể thấy rằng hoạt động hoàn hảo. Hàm minmax () xác định phạm vi kích thước lớn hơn hoặc bằng min và nhỏ hơn hoặc bằng max.
Vì vậy, các cột bây giờ sẽ luôn luôn ít nhất 100px. Tuy nhiên, nếu có nhiều không gian hơn, grid sẽ chỉ phân phối đều cho từng cột, vì các cột biến thành 1fr thay vì 100px.

## một ví dụ nho nhỏ

Giờ chúng ta thử chia grid và add cho n một bức ảnh

```
<div><img src="img/forest.jpg"/></div>
```

Để làm cho bức ảnh vừa vặn với khối chứa nó, ta cần set chiều cao và chiều rộng của ảnh bằng chính khối đó, sau đó sử dụng thuộc tính object-fit: cover. Thuộc tính này có tác dụng làm cho hình ảnh bao phủ toàn bộ vùng chứa nó

```
.container > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

Kết quả thu được: 

{@embed: https://codepen.io/hoasadoa009/pen/zbwoLw?editors=1100}

Nguồn tham khảo: [https://medium.freecodecamp.org/](https://medium.freecodecamp.org/how-to-make-your-html-responsive-by-adding-a-single-line-of-css-2a62de81e431)