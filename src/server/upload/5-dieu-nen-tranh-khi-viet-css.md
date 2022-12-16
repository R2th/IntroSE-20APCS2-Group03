#### Giới thiệu

Chào các bạn, mình đã quay trở lại rồi đây. Lần này mình sẽ chia sẽ với các bạn 5 điều nên tránh khi viết css nha.

Mình bắt đầu luôn nha.

#### 1. Set margin, padding rồi lại reset chúng

Giả sử bạn có một list item và cần set margin-top cho chúng nhưng phần tử đầu tiên thì không cần margin-top thì bạn làm như thế nào. Chắn hẳn sẽ có một số bạn làm như sau:

```css
.item {
  margin-top: 10px;
}

.item:first-child {
  margin-top: 0;
}
```

Cách trên đây không có gì sai cả nhưng tại sao bạn lại không viết ngắn gọn hơn chỉ với 1 selctor:

```css
.item:not(:first-child) {
  margin-top: 10px;
}

/* Hoặc */
.item:nth-child(n+2) {
  margin-top: 10px;
}

/* Hoặc */
.item + .item {
  margin-top: 10px;
}
```

Đấy với cách viết này sẽ giúp cho các bạn viết ngắn gọn hơn và không bị chồng chéo style với nhau nha.


#### 2. Sử dụng transform: translate(-50%, -50%) để canh giữa phần tử

Trước đây nếu chưa có flex thì chắc hẳn có nhiều bạn sẽ dùng translate transform để căn giữa cho phần tử nhỉ. 

```html
<div class="list">
    <div class="item">Item 1</div>
</div>
```

```css
.list {
    position: relative;
    width: 200px;
    height: 200px;
}

.list .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

Nếu các bạn đang sử dụng cách này thì nãy xem lại ngay vì có thể nó sẽ làm mờ phần tử ở một số trình duyệt đó. 
Bây giờ thì các bạn có thể sử dụng flex để canh giữa dễ hơn nhiều.

```
.list {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Hoặc */
.list {
    display: flex;
}

.list .item {
    margin: auto;
}
```


#### 3. Không sử dụng shorthand

Bạn có đang dùng như thế này

```css
.list {
    margin-top: 1px;
    margin-right: 2px;
    margin-bottom: 3px;
    margin-left: 4px;
}
```

Thì hãy chuyển sang sử dụng shorthand nha 

```css
.list {
    margin: 1px 2px 3px 4px;
}
```

Hãy thử tưởng tưởng trong dự án lớn nếu sử dụng như ví dụ ở trên thì chắc hẳn khi load css sẽ rất nặng đúng không. Nên chúng ta rút gọn được thì càng tốt nha. 

#### 4.  Sử dụng inline style

Mình tin rằng lúc mới đầu bạn nào cũng đã từng sử dụng style inline như này.

```html
<div style="width: 200px; height: 200px">
    <div style="color: blue">Item 1</div>
    <div style="color: red;">Item 2</div>
    <div style="color: red;">Item 3</div>
</div>
```

Nếu bạn viết như này thì sẽ làm cho file html của các bạn rất nặng, nó không có tính sử dụng lại và việc viết các class sau này sẽ gặp khó khăn vì không áp dụng được các thuộc tính. Khi đó các bạn chỉ có thể sử dụng !important để áp dụng thôi. 

#### 5. Lạm dụng !important

Giá sử viết 1 class cho 1 phần tử nhưng không hiểu tại sao nó lại không ăn

```html
<div class="list">
    <div class="item"><p class="blue">Item 1</p></div>
    <div class="item"><p>Item 2</p></div>
    <div class="item"><p>Item 3</p></div>
</div>
```

Và style

```css
/* Đây là class bạn mới thêm vào */
.blue {
    color: blue;
}

/* Đây là class đã có trước đó */
.item {
    color: red;
}
```

Và bạn nghĩ ngay đến **!important** và sau khi thêm nó vào style đã ăn ngay.
```css
.blue {
    color: blue !important;
}
```

He he. Điều này không tốt chút nào nha các bạn. Nếu lỡ sau này cần css lại thuộc tính này thì không thì có 10 !important cũng không giúp được bạn đâu nha :)))

Thay vào đó bạn hãy viết nó chi tiết hơn thì nó sẽ ăn ngay. Và nhớ là loại trừ cái style inline ra nha :)

```css
.item.blue {
    color: blue;
}
```

Hoặc đơn giản hơn là bản chỉ cần chuyển dòng code `.blue` xuống dưới là được :)))

```
.item {
    color: red;
}

.blue {
    color: blue;
}
```

Đấy được rồi đúng không nào. Nên bất cứ khi nào tránh được !important thì các bạn nên tránh nha. Lạm dụng nó không tốt đâu

#### Kết luận

Trên đây mình đã chia sẽ với các bạn những điều nên tránh khi viết css, hy vọng nó có thể giúp ích được cho các bạn.

Cảm ơn các bạn đã đọc bài viết. Chúc các bạn có ngày làm việc và học tập hiệu quả nha.