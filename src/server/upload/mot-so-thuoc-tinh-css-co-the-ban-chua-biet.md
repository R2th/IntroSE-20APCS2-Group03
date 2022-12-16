**Có 1 số thuộc tính CSS rất hay nhưng lại bị ẩn giấu khá kỹ trong kho tàng CSS đồ sộ, hoặc nói đúng hơn là nó ít được sử dụng vì lý do nào đó, có thể là do chưa được nhiều trình duyệt hỗ trợ hoặc dev nghĩ là để xử lý UI đặc biệt nào đó thì chỉ có JS mới làm được. Hãy cùng điểm qua một số thuộc tính CSS có thể bạn chưa biết (hoặc biết rồi) thú vị dưới đây nhé** :grinning: .

## 1. Tab size
Hầu hết các Editor hiện tại đều có setting (có thể kết hợp thêm với plugin EditorConfig)  cho phép developer chỉ định chiều rộng tab được thực hiện bằng phím Tab. Nhưng gần đây, chúng ta cũng có thể tùy chỉnh tab size được nhúng trên các trang web.

```css
pre {
  tab-size: 2;
}
```

Lưu ý rằng mỗi browsers có thể có cách hiểu riêng về đơn vị chiều rộng của tab nên dài bao nhiêu. Vì vậy, chúng ta có thể thấy một số khác biệt giữa các browsers khác nhau. Về mặt hỗ trợ browsers, tab-size chỉ mới hỗ trợ trên Chrome, Opera, Firefox và Safari theo [CanIUse](http://caniuse.com/#feat=css3-tabsize).

## 2. Scroll behavior
Trước đây, khi làm một số hiệu ứng scroll từ 1 block A đến block B trong cùng 1 trang sẽ cần phải can thiệp một chút JS để handle thêm animation cùng với duration time để giúp cho hiệu ứng scroll trở nên mượt mà. Nhưng hiện tại, thuộc tính `scroll-behavior` của CSS3 đã hỗ trợ rất tốt cho developers công việc này, chỉ cần 1 đoạn CSS:

```css
{
  scroll-behavior: smooth;
}
```

**Demo**:

{@embed: https://codepen.io/tranquocy/pen/JjoXvWb}

## 3. Unicode bidi
Thuộc tính `unicode-bidi` cùng với thuộc tính `direction` sẽ xác định vị trí của đoạn văn bản và được sử dụng cùng với thuộc tính direction để đặt và trả về  cho dù văn bản nên được ghi đè để hỗ trợ nhiều ngôn ngữ trong cùng một tài liệu.

```css
{
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

![](https://images.viblo.asia/1a776c75-474e-48a1-8b9b-8bf3c3280c81.jpg)

## 4. Font stretch
Một số phông chữ cung cấp thêm các font-style khác ngoài các chữ thường, đậm và nghiêng thông thường. Helvetica Neue hoặc Myriad Pro là một ví dụ đi kèm với các font-style như ‘Condensed’, ‘Ultra-condensed’, and ‘Semi-condensed’.

Chúng ta có thể sử dụng `font-stretch` kết hợp với thuộc tính phông chữ, ví dụ , `font-style`. Đây là một ví dụ:
```css
h1 {
  font-style: bold;
  font-stretch: ;
}
```

Lưu ý: thuộc tính `font-stretch` hiện nay chỉ hoạt động trên Firefox và Internet Explorer 9 trở lên.

## 5. Writing Mode
Không phải mọi ngôn ngữ đều được viết từ hướng trái sang phải. Thay vào đó, một vài ngôn ngữ được viết từ trên xuống dưới như tiếng Nhật hoặc từ phải sang trái như tiếng Ả Rập và tiếng Do Thái.

![](https://images.viblo.asia/0df8c9fe-0d84-4866-b240-788b2a778814.jpg)

Để phù hợp với các ngôn ngữ này, một thuộc tính mới có tên `writing-mode` được giới thiệu để cho phép developer thay đổi hướng viết nội dung thông qua CSS. Đoạn CSS này ví dụ điều hướng nội dung từ trái sang phải.

```css
p {
  writing-mode: rl-tb;
}
```

Trên đây là 1 bài viết ngắn chia sẻ 1 số kiến thức của mình và mình nghĩ nó có thể hữu ích cho các bạn. Cảm ơn các bạn đã theo dõi, xin chào và hẹn gặp lại!