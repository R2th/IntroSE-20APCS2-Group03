### Giới thiệu
Hi chào mọi người , hôm nay mình lại tiếp tục chia sẻ 1 số mẹo CSS nhỏ nhỏ hay hay cho các bạn làm Frontend tham khảo nhé.
![](https://images.viblo.asia/67c3b781-92d3-4f52-8e74-6b47a3179314.png)

###  CSS Technique
**1.  Make placeholder cho contenteditable bằng CSS**
Để làm được mình sẽ sử dụng `:empty` để style trong trạng thái chưa có gì được nhập vào với pseudo `:before`. 
Khi có nội dung được nhập vào thì sẽ truyền vào `content: attr()`
Cụ thể như sau:

<br>HTML
```CSS
<div contenteditable="true" placeholder="会社名を入力してみてください"></div>
```
CSS<br>
```CSS
[contenteditable=true]:empty:before{
  content: attr(placeholder);
  pointer-events: none;
  display: block; /* For Firefox */
}

div[contenteditable=true] {
  border: 1px dashed #AAA;
  width: 290px;
  padding: 15px;
}
```

**2. Làm background cắt chéo bằng clip-path**
<br>Bình thường chúng ta hay sử dụng transform để làm méo nghiêng nhưng sử dụng clip-path cũng có thể làm được nhé.
<br>HTML
```HTML
<h1 class="title">Make Awesome Things Together <span>17</span></h1>
```
<br>CSS
```CSS
clip-path: polygon(0 0, 100% 0%, 100% 60%, 0% 100%);
```
Sau khi sử dụng clip-path mình được như hình dưới
![](https://images.viblo.asia/ffe0f1ad-2205-45ad-a49f-80392916dc50.png)

**3. Readmore toggle bằng CSS**
<br> Tạo toggle đơn giản readmore và show less đơn giản chỉ với CSS
```HTML
.readmore
    input#post-1.readmore__input(type="checkbox")
    .readmore__text aaaaaa
        span.readmore__text-target
            aaaaaa
            <br> aaaaaa
            <br> aaaaaa
            <br> aaaaaa
            <br> aaaaaa
            <br> aaaaaa
            <br> aaaaaa
            <br> aaaaaa
            <br> aaaaaa
    labe.readmore__trigger(for="post-1")
```
<br>

```CSS
.readmore {
    &__input {
       display: none;
       &:checked ~ .readmore__text . readmore__text-target {
            opacity: 1;
            font-size: inherit;
            max-height: 999em;
       }
       & ~ .readmore__trigger:before {
           content: 'Readmore';
       }
       &:checked ~ .readmore__trigger:before {
           content: 'Close'
       }
    }
    &__text {
        &-target {
            opacity: 0;
            max-height: 0;
            font-size: 0;
            transition: .15s ease;
        }
    }
    &__trigger {
        cursor: pointer;
        display: inline-block;
        padding: 0 .5em;
        color: #666;
        font-size: .9em;
        line-height: 2;
        border: 1px solid #ddd;
        border-radius: .25em;
    }
}
``` 
Demo
{@embed: https://codepen.io/Truelove/pen/ZEWOYXa}

### Lời kết
 Hi vọng những tip nhỏ trên sẽ có ích cho mọi người nhé.