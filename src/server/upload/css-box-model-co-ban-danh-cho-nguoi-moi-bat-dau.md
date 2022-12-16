## Mở đầu
Đây là bài blog đầu tiên của mình, mong các anh chị em góp ý để mình hoàn thiện hơn ở các bài tiếp theo.

Bài viết này nhắm tới các bạn mới bắt đầu hoặc có rất ít kinh nghiệm về lập trình giao diện web nhé. CSS Box Model là một trong những kiến thức rất cơ bản mà bất kì Frontend developer nào cũng cần phải nắm vững.

Các bạn có thể xem serie 3 bài về CSS box model tại đây:  
Phần 1: [CSS Box Model - Cơ bản dành cho người mới bắt đầu](https://phucluong.com/css-box-model-co-ban-danh-cho-nguoi-moi-bat-dau/)  
Phần 2: [CSS Box Model và box-sizing: border-box là gì vậy?](https://phucluong.com/css-box-model-box-sizing-border-box-la-gi-vay/)  
Phần 3: [CSS Box Model - Các cách hiển thị element với thuộc tính display](https://phucluong.com/css-box-model-display-block-inline/)

Các bạn theo dõi các bài blog cá nhân của mình tại đây nhé: [https://phucluong.com/](https://phucluong.com/)

## Lý thuyết &amp; Thuật ngữ

![Bất kì element nào cũng là một hình chữ nhật](https://images.viblo.asia/398e2198-0e86-48cb-985d-cb6aea230738.png)

Nếu bạn là người mới bắt đầu, thì có một điều bạn nên ghi nhớ là bất kì element nào trên một trang web, đều được trình duyệt (browser) thể hiện dưới dạng một hình chữ nhật. Điều đó có nghĩa là, nếu bạn chèn một tấm hình tròn, mình oval, hay cố gắng bo góc tròn các element, thì browser vẫn xem nó là một hình chữ nhật. Và với một hình chữ nhật, bạn sẽ có các thông số đi kèm với nó như chiều rộng `width` và chiều cao `height`, các cạnh biên `border`... Nhưng bấy nhiêu đó thôi thì chưa đủ, browser còn cần phải biết được các thông tin khác như độ dày của border, độ rộng của content bên trong... để có thể render layout được chính xác như mình mong muốn.

![CSS Box model cơ bản](https://images.viblo.asia/4192fc75-db46-405e-a8aa-67d9c5ba2e2a.png)

Hình bên trên sẽ hơi khó hiểu và khó nhớ nếu bạn ít làm việc với box model, nhưng thật ra nó chả có gì phức tạp cả. Bạn có thể nhớ đơn giản thế này: mình có phần content trong cùng, bọc lấy nó là `padding` (nếu có), bọc tiếp tầng nữa là `border`, bọc tiếp tầng cuối là `margin` (nếu có). Nó giống như một cái bánh hamburger kẹp nhiều tầng vậy. Có một điều quan trọng là thứ tự của chúng chính xác và luôn là như vậy, không có cách nào thay đổi thứ tự được đâu nhé.

Các thuật ngữ trên có thể tạm giải thích như sau:

* **content** (hay content area): là vùng chứa nội dung của một element, với chiều rộng/cao được xác định qua thuộc tính width và height. Vùng này thường chứa text, hình ảnh, video…
* **padding** (hay padding area): cho biết độ rộng của vùng padding bao quanh vùng content.
* **border** (hay border area): cho biết độ rộng (và style) của border bao quanh vùng padding.
* **margin** (hay margin area): cho biết độ rộng của vùng margin bao quanh vùng border.
* **edge**: là biên bên ngoài của từng vùng, thuật ngữ này không thật sự nằm trong box model mà chỉ được đưa ra để giải thích cho dễ hiểu hơn thôi. Bạn có thể bỏ qua nó mà không cần phải lo lắng gì.

Là một developer, bạn có thể dễ dàng xem được các thuộc tính này của các element rất trực quan thông qua DevTools của browser. Nếu bạn chưa biết cách mở devtools của browser, thì có rất nhiều cách như sau (với Chrome):

* Click phải chuột vào trang web, chọn "Inspect"
* Với MacOS, bạn có thể nhấn tổ hợp phím: Option + Command + I
* Với Windows, bạn có thể nhấn tổ hợp phím: Ctrl + Shift + I

![Box model được minh họa trực quan trên devtools của trình duyệt.](https://images.viblo.asia/2cd0b140-066c-4daa-b2c0-83c92098d21b.png)

## Các thuộc tính CSS

![Minh họa margin và padding](https://images.viblo.asia/7e2ab372-4a96-4aca-854f-32a1f70584b1.jpg)

#### Thuộc tính Margin: `margin-top`, `margin-right`, `margin-bottom`, `margin-left`, và `margin`

Các thuộc tính này xác định độ rộng của vùng margin bao quanh element. Giá trị của nó thường được dùng là px (pixel), % (percentage), em, auto... Một điều đặc biệt của margin (so với padding) là margin có thể nhận giá trị âm.

```css
.element {
  margin-top: 15px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 20px;

  /* Margin có thể nhận cả giá trị âm:
  margin-top: -10px;
  */
}
```

Thông thường, ta sẽ dùng thuộc tính `margin` để định nghĩa nhanh cho cả 4 hướng, thay vì phải định nghĩa riêng lẻ 4 hướng top, right, bottom, left. Tuy nhiên trong một số trường hợp thì bạn sẽ chỉ muốn dùng 1 hướng mà thôi.

``` css
/* top, right, bottom, left đều là 15px */
.element { margin: 15px; }

/* top &amp; bottom: 10px, left &amp; right: 15px */
.element { margin: 10px 15px; }

/* top: 10px, left &amp; right: 15px, bottom: 30px */
.element { margin: 10px 15px 30px; }

/* top: 10px, right: 15px, bottom: 30px, left: 40px */
.element { margin: 10px 15px 30px 40px; }
```

Nếu bạn thấy khó nhớ thứ tự của các giá trị tương ứng với hướng nào, thì hãy nhớ 2 quy tắc sau:
1. Quy tắc chiều kim đồng hồ, bắt đầu từ đỉnh 12h (top): với `margin: 10px 15px 30px 40px;`, các giá trị sẽ tương ứng là top, right, bottom, left.
2. Quy tắc đối xứng, top đối xứng với bottom, left đối xứng với right: với `margin: 10px 15px;`, top và bottom cùng là 10px, còn left và right là 15px.

Lưu ý là quy tắc số 1 cũng áp dụng được cho cả padding, border, border-radius... nữa nhé.

#### Thuộc tính Padding: `padding-top`, `padding-right,` `padding-bottom`, `padding-left`, và `padding`

Các thuộc tính này xác định độ rộng của vùng padding bao quanh element. Giá trị của nó thường được dùng là px (pixel), % (percentage), em. Khác với margin, padding không nhận giá trị âm hay auto nhé.

``` css
.element {
  padding-top: 15px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 20px;

  /* padding KHÔNG nhận giá trị âm và auto, 2 dòng CSS sau sẽ không chạy:
  padding-top: -10px;
  padding-left: auto;
  */
}
```

Tương tự padding cũng có thể được viết tắt:

``` css
/* top, right, bottom, left đều là 15px */
.element { padding: 15px; }

/* top &amp; bottom: 10px, left & right: 15px */
.element { padding: 10px 15px; }

/* top: 10px, left & right: 15px, bottom: 30px */
.element { padding: 10px 15px 30px; }

/* top: 10px, right: 15px, bottom: 30px, left: 40px */
.element { padding: 10px 15px 30px 40px; }
```

#### Thuộc tính Border:
Border đặc biệt có rất nhiều thuộc tính nhưng cũng khá dễ hiểu và dễ nhớ:

Các thuộc tính thường dùng là các thuộc tính viết tắt: `border-top`, `border-right,` `border-bottom`, `border-left`, và `border`

``` css
.element {
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;

  /* hoặc viết tắt */
  border: 1px solid #ccc;
}
```

Như ví dụ trên, để khai báo border, bạn cần cung cấp 3 thông tin cần thiết, tuy nhiên bạn vẫn có thể bỏ qua color mà không cần khai báo, giá trị mặc định của nó sẽ là `initial`, và sẽ được kế thừa từ color của chính element hoặc cha của nó (CSS Inheritance):

* width: độ dày của border (1px...)
* style: loại border ví dụ như `solid`, `dashed`, `dotted`, `double`, `none`...
* color: màu của border ví dụ như `#ccc`, `black`, `rgba(100, 100, 100, 1)`...

Ngoài các thuộc tính thông dụng trên, bạn có thể khai báo cụ thể cho width, style và color bằng các thuộc tính sau: `border-width`, `border-style`, `border-color`, `border-top-width`, `border-top-style`, `border-top-color`... và cứ thế cho các hướng right, bottom, left.

## Ví dụ

![Các thuộc tính cơ bản của CSS box model.](https://images.viblo.asia/7b08f130-4ff1-4555-96f9-f7228665f28f.jpg)

Mình bắt đầu với 1 ví dụ đơn giản như hình trên (2 element là như nhau, hình bên trái mình inspect bằng devtools thôi). Với một element đơn giản như trên, CSS rút gọn của nó sẽ là: 

```css
.element {
  margin: 0 15px;
  padding: 15px;
  width: 100px;
  height: 120px;
  border: 2px solid steelblue;
}
```

Nếu bạn thắc mắc tại sao `width: 100px;` lại là phần content phía trong, thì mình có bài viết phân tích chi tiết về `box-sizing` trong CSS box model nhé. Ở đây mình giải thích tóm tắt là mọi element đều được gán thuộc tính `box-sizing` với giá trị mặc định là `content-box`, nên thuộc tính `width` sẽ là vùng **content** bên trong, không tính **padding** hay **border** nhé.

**Tuy nhiên**, hiện nay việc dùng `box-sizing: border-box;` gần như là một mặc định của frontend developer (dù nó không phải là default), nên bạn sẽ ít thấy kết quả như ví dụ trên, mà thay vào đó sẽ như sau:

![CSS box model với box-sizing: border-box;](https://images.viblo.asia/48e74ebe-d32e-41db-b116-5dd5bbe36a40.jpg)

CSS của nó cũng không khác trên, chỉ thêm một dòng định nghĩa box-sizing mà thôi:

``` css
.element {
  box-sizing: border-box; /* Thêm dòng này vào */
  margin: 0 15px;
  padding: 15px;
  width: 100px;
  height: 120px;
  border: 2px solid steelblue;
}
```

Với `box-sizing: border-box;` (so với content-box là mặc định), thì `width: 100px;` sẽ bao gồm cả vùng **padding** và **border**, đây là điểm khác biệt cơ bản của **border-box** và **content-box**

## Kết bài
CSS Box model là một kiến thức (hay kĩ thuật) mà gần như 90% sẽ được sử dụng trong bất kì task nào về web layout. Tuy đơn giản và cơ bản nhưng bạn đừng vì thế mà xem nhẹ nó nhé. Bạn hãy dành thời gian nắm vững nó để CSS code của mình ít bug, dễ đọc, dễ maintain và dễ mở rộng trong tương lai nhé.

Các bạn hãy nghiên cứu tiếp phần 2 của serie này nhé:  
Phần 2: [CSS Box Model và box-sizing: border-box là gì vậy?](https://phucluong.com/css-box-model-box-sizing-border-box-la-gi-vay/)