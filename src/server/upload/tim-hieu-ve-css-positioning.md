## Mở bài
Chào các bạn, bài viết lần này mình sẽ lại nói về một đề tài rất cơ bản khác của CSS, là "Positioning". Nói nôm na theo tiếng Việt thì nó là cách sử dụng thuộc tính `position` trong CSS để định vị các element trên trang web. Như mọi lần, mình chỉ muốn nhấn mạnh lại rằng phần lý thuyết này là rất cơ bản trong CSS và thường xuyên được hỏi trong các buổi phỏng vấn. Vì thế việc chuẩn bị tốt kiến thức về "CSS Positioning" sẽ giúp bạn tạo ấn tượng cho nhà tuyển dụng đấy nhé.

Các bạn có thể theo dõi bài viết gốc của mình tại đây nhé: https://phucluong.com/tim-hieu-ve-css-positioning/

## Có thật sự cần dùng đến `position`?
Mình lại tiếp tục nói lan man một tí về ngữ cảnh của vấn đề. Việc "định vị một element trên trang web" có rất nhiều cách khác nhau, `position` chỉ là một trong những hướng tiếp cận mà thôi. Ví dụ như sử dụng `float`, `transform`, Flexbox, CSS Grid... Hoặc thậm chí, chả dùng gì hết mà chỉ nương nhờ vào normal flow của trang web. Vì thế, bạn hãy nhớ rằng một bài toán sẽ có nhiều cách giải quyết khác nhau, tùy vào tình huống thực tế mà chọn một phương pháp hiệu quả và "hợp lý". Ví dụ mình có một bài toán đơn giản như sau: "Đưa button về bên phải của khung"


![](https://images.viblo.asia/c32c025a-0489-4d9d-80c9-5cbdf7f379dd.png)


```html
<style>
  .parent { /* ... */ }
  .button { /* ... */ }
</style>

<div class="parent">
  <button class="button">Submit</button>
</div>
```

Cách 1: sử dụng `float`
```css
.parent { /* apply clearfix */ }

.button {
  float: right;
}
```

Cách 2: sử dụng flexbox
```css
.parent {
  display: flex;
  justify-content: flex-end;
}
```

Cách 3: sử dụng grid
```css
.parent {
  display: grid;
  justify-content: end;
}
```

Cách 4: cách khác sử dụng grid
```css
.parent {
  display: grid;
}

.button {
  justify-self: right;
}
```

Cách 5: sử dụng text alignment
```css
.parent {
  text-align: right;
}
```

Cách 6: sử dụng `position`
```css
.parent {
  position: relative;
  /* width & height */
}

.button {
  position: absolute;
  top: 15px;
  right: 15px;
}
```

6 cách trên chưa phải là tất cả, mỗi cách đều có những điểm mạnh và điểm yếu khác nhau. Ví dụ như nếu bạn thêm một button "Cancel" khác bên cạnh button "Submit" ở trên, thì mỗi cách sẽ lộ ra những vấn đề khác nhau. Nhưng điều mình muốn nhấn mạnh ở đây là, một bài toán có thể có nhiều cách giải, không có cách nào là thật sự tối ưu nhất. Tùy vào từng trường hợp cụ thể mà mình sẽ chọn cách phù hợp.

Chém gió đủ rồi, mình quay lại về đề tài chính là thuộc tính `position` nhé.

## Phân nhóm
Về cơ bản thì thuộc tính `position` có 5 giá trị sau:
```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

và 5 giá trị này được chia thành 2 nhóm:
| Positioned | Non-positioned (default) |
| ----------- | ----------- |
| relative, absolute, fixed, sticky | static |

Hiểu được cách phân chia nhóm như vầy sẽ giúp bạn hiểu rõ hơn về cách mà `position` hoạt động.

## Static
Giá trị `static` không có gì đặc biệt để nói. Nó là giá trị mặc định của tất cả element, và các element này sẽ được định vị trí theo normal flow của trang web. Đôi khi nó sẽ hữu ích khi bạn muốn reset position của một element về mặc định.
- Các thuộc tính `top` `right` `bottom` `left` không có tác dụng lên static element (nhóm Non-positioned).
- Giá trị này không tạo ra một `stacking context`, đồng nghĩa với việc thuộc tính `z-index` cũng không có tác dụng.

### Relative
Giá trị `relative` là một giá trị vô cùng đặc biệt. Với relative element, nó vẫn được định vị trí theo normal flow của trang web. Tuy nhiên:
- Các thuộc tính `top` `right` `bottom` `left` sẽ làm thay đổi "vị trí hiển thị" của element, tương ứng với chính vị trí ban đầu của nó.
- Điều đặc biệt là dù vị trí hiển thị của element đã thay đổi, nó KHÔNG hề gây ảnh hưởng gì đến các element xung quanh nó. Nói cách khác, những element xung quanh nó sẽ không bị đẩy ra xa/gần mà sẽ đứng yên vị trí mà nó đang đứng. Thậm chí relative element sẽ "nằm đè" lên những element xung quanh nếu giá trị của các thuộc tính `top` `right` `bottom` `left` là đủ lớn. (nói chính xác hơn thì nó sẽ nằm đè lên hoặc nằm núp bên dưới những element xung quanh tùy vào stacking context của chúng nữa).
- Giá trị này sẽ tạo ra một "stacking context" nếu đi kèm với thuộc tính `z-index` có giá trị khác `auto`. Stacking context là một topic có liên quan, nhưng mình sẽ không trình bày chi tiết trong bài viết này.

![](https://images.viblo.asia/50610cf3-c1fa-4e59-8657-668ddeb37275.png)

```css
.relative-element {
  position: relative;
  top: 20px;
  left: 40px;
}
```

## Absolute
Với absolute element, nó sẽ được gỡ bỏ ra khỏi normal flow của trang. Nói cách khác, các element xung quanh sẽ được sắp xếp vị trí giống như là không hề tồn tại absolute element vậy. Tất nhiên điều đó không có nghĩa là absolute element sẽ biến mất, mà nó sẽ được nằm ở một nơi đặc biệt khác:
- Các thuộc tính `top` `right` `bottom` `left` sẽ làm thay đổi vị trí của element, tương ứng với element cha gần nhất có thuộc tính `position` thuộc nhóm "Positioned" như trên. Các bạn lưu ý điều này nhé, một số bạn nhầm tưởng rằng absolute element sẽ được định vị trí theo relative element cha gần nhất, điều này là chưa chính xác.
- Đặc biệt, nếu nó không có cha thuộc nhóm "positioned", thì nó sẽ được định vị trí theo `body` của trang web.
- Và một điều đặc biệt khác, nó được định vị trí theo "padding box" của element cha (hoặc `body`), có nghĩa là dù cho nó có style là `top: 0; left: 0`, thì nó cũng không nằm đè lên border của element cha.
- Tương tự relative element, giá trị này sẽ tạo ra một "stacking context" nếu đi kèm với thuộc tính `z-index` có giá trị khác `auto`. 

![](https://images.viblo.asia/2fed63fe-f1c3-482b-b8e2-74144a6381e4.png)


```css
.parent {
  position: relative; /* or absolute, fixed, sticky */
}

.absolute-element {
  position: absolute;
  top: 0;
  left: 0;
}
```

## Fixed
Với fixed element, nó cũng sẽ được gỡ bỏ ra khỏi normal flow của trang (giống `absolute`). Tuy nhiên, nó có một số tính chất sau:
- Các thuộc tính `top` `right` `bottom` `left` sẽ làm thay đổi vị trí của element tương ứng với viewport của trình duyệt.
- Nhưng nếu nó có một element cha có các thuộc tính `transform`, `perspective`, hoặc `filter` với giá trị khác `none`, thì nó sẽ được định vị theo element cha đó. Trong trường hợp này, nó sẽ được định vị như là một absolute element.
- Một điều đặc biệt khác, giá trị này sẽ LUÔN LUÔN tạo ra một "stacking context".

![](https://images.viblo.asia/44010943-eaa6-43fd-8232-03732a70391d.png)


```css
.fixed-element {
  position: fixed;
  top: 0;
  left: 0;
}
```

## Sticky
Giá trị `sticky` là một giá trị "mới mà không mới", bạn có thể tự tin sử dụng giá trị này mà không phải lo ngại về [browser support](https://caniuse.com/?search=sticky) (ngoại trừ IE11 trở về trước và một số trình duyệt hiếm gặp khác). Đây là một giá trị rất thú vị mà ngày xưa khi muốn biến một element có hiệu ứng "sticky", chúng ta buộc phải viết code thủ công (hoặc dùng thư viện) để hỗ trợ. Nay nó đã thành một giá trị native mà ta có thể sử dụng vô dùng dễ dàng mà không cần sự can thiệp của JS. Tuy nhiên, giá trị này không thể chỉ nói vài dòng là xong, nên mình xin phép bỏ qua trong bài viết này và sẽ có một bài viết khác dành riêng cho nó.

## Kết bài
Cảm ơn các bạn đã đọc đến hết bài. Nếu các bạn có thắc mắc, muốn bổ sung hay phát hiện lỗi sai nào, xin hãy cho mình biết ở phần bình luận bên dưới nhé, mình sẽ cập nhật bài viết ngay. Chúc các bạn một ngày an lành.