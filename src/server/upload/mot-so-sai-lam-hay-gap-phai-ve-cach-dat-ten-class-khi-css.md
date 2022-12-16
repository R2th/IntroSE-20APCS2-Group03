### Giới thiệu
Bài viết này tôi sẽ chia sẻ về những sai lầm hay gặp phải khi đặt class cho các thẻ HTML để style. Đây là những vấn đề tôi đã gặp phải khi review code của những bạn junior, bản thân tôi cũng đã từng như các bạn ấy. Phạm vi bài viết này tôi sẽ coi cách đặt tên của BEM là chuẩn, cụ thể có 3 thành phần và cách đặt tên như sau:

```css
// Block - Là một khối riêng, ví dụ tôi có một button, tôi có thể coi đây là một khối, cách đặt tên là: .block, VD:
.button {
    //Style for button
}

// Element - Các phần từ ở trong khối, ví dụ trong button tôi có element icon và text, cách đặt tên sẽ là: .block__element, VD:
.button__icon {
    //Style for icon
}

.button__text {
    //Style for text
}

// Modifier - Dạng chỉnh sửa của block, element, tôi cần button có kích thước lớn, và button có color đỏ, cách đặt tên sẽ là: .block--modifier, block__element--modifier, VD: 
.button--size-big {
    //Style for size big
}

.button--color {
    //Style for color red
}
```
Tiếp theo tôi sẽ chỉ ra những sai lầm khi đặt tên class mà mọi người thường gặp phải, đó là:

### 1. Không nhất quán
Khi tôi muốn style cho button nền background màu xanh, tôi có thể phạm phải những sai lầm sau:

```css
// Đúng
.button--bg-blue {
    background: blue;
}

.button__icon {
    // Style for icon
}

//Sai: Class mẫu tôi đang dùng ở trên là: block--(danh từ)-(tính từ), tuy nhiên đoạn code trên lại là block--(tính từ)-(danh từ)
.button--blue-bg {
    background: blue;
}

//Sai: Cách này sai bởi vì không đặt theo class chuẩn block--(danh từ)-(tính từ) mà đổi lại là block-(danh từ)--(tính từ)
.button-bg--blue {
    background: blue;
}

//Sai: Dạng modifier thì cần có kí tự -- để phân biệt là modifier thay vì block 
.button-bg-blue {
    background: blue;
}

//Sai: Dạng modifier nhưng đặt tên đang thể hiện là element của block
.button__bg-blue {
    background: blue;
} 

//Sai: Element đặt tên với 2 kí tự gạch dưới thay vì 1
.button_icon {
    //Style icon
}

//... và những lỗi đặt tên sai chính tả khác.
```
### 2. Style không liên quan gì tới class
Lỗi này cũng khá hay gặp phải, tên class nếu đặt riêng, thì chỉ nên style những phần như trong class đó, một số ví dụ như:
```css
//Đúng: Chỉ style màu đỏ cho class color--red
.color--red {
    color: red;
}

//Sai: Giá trị của thuộc tính không giống như tên
.color--red {
    color: blue;
}

//Sai: Thêm những thuộc tính ngoài phạm vi của class, những thuộc tính không phải là color thì không nên style trong class này
.color--red {
    color: red;
    font-size: 20px;
    margin-top: 10px;
}

```

### 3. Đặt class block theo block cha
Tôi cần style cho block image ở trên header:
```css
// Đúng
.header {
    //Style for header
}
.image {
    //Style for image
}

//Sai
.header-image {
    //Style for image
}
```
Cách đặt tên ở trên sai vì nếu đặt header-image thì block này khi cần sử dụng ở phần khác, ví dụ footer, mà chuyển class này xuống footer thì không hợp lý (Footer chứa header image), còn nếu đặt block này là class footer-image thì sẽ mất công style thêm cho block này. Vì vậy đặt theo class .image là đúng và dễ dàng tái sử dụng khi cần thiết.

### Kết luận
Bài viết này đúc rút từ kinh nghiệm bản thân nên có thể sẽ có những thiếu sót, các bạn hãy comment để bài viết được hoàn thiện hơn nhé. Thanks all.