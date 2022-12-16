### Giới thiệu
Hôm nay mình xin chia sẻ tới anh chị em viblo cách làm 1 list danh sách có đánh số thứ tự và đổ màu theo Gradient theo cách đơn giản bằng CSS.

### HTML

***Pug***
```Pug
ul
  each i in Array(30)
    li Ahihi
    li Hihi
    li Hehe
```
Khi render ra HTML thì thế này<br>

***HTML***
```html

<ul>
  <li>Ahihi</li>
  <li>Hihi</li>
  <li>Hehe</li>
  --- 28 thẻ như trên nữa ---
  <li>Ahihi</li>
  <li>Hihi</li>
  <li>Hehe</li>
</ul>
````

**SASS**
```SASS
li {
  counter-increment: index;
  display: flex;
  align-items: center;
  padding: 12px 0;
  box-sizing: border-box;
  &:before {
      content: counters(index, ".", decimal-leading-zero);
      text-align: right;
      font-weight: bold;
      min-width: 50px;
      padding-right: 12px;
      align-self: flex-start;
      background-image: linear-gradient(to bottom, red, blue);
      background-attachment: fixed;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
}

```

### Demo
{@embed: https://codepen.io/Truelove/pen/BgQeay}

### Lời kết
Hihi, vậy là chỉ cần tí CSS đơn giản là chúng ta đã có thể làm được 1 list counter rất đẹp bằng Gradient Color rất là đẹp,nhìn giống như bảng xếp hạng thứ tự các bài hát mà mọi người vẫn thấy trên các trang nhạc như Nhaccuatui hay Zing nhỉ.
Hi vọng bài viết có ích cho mọi người tham khảo.
Cảm ơn các bạn đã đọc bài nhé!