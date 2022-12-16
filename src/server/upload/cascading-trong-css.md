CSS là viết tắt của Cascading Style Sheets, trong đó "Cascading" có nghĩa là "Xếp tầng".

VD bạn viết 2 đoạn code css như sau:
```css
//custom.css
h1 {
    color: red;
}

//custom2.css
h1 {
    color: blue;
}
```

Vậy trình duyệt nên hiểu đoạn code trên như thế nào ? Đó chính là nhờ cơ chế "Cascading" trong CSS.

Hay nói cách khác, nếu như không có "Cascading" thì CSS sẽ nghĩa là "Conflicting Style Sheets" =)))

Và để áp dụng được Cascading, CSS phải tuân theo 3 bước sau, chúng ta hãy cùng tìm hiểu nhé !

# 1, Importance

Đây là bước đầu tiên để xác định xem "rules" CSS nào sẽ được áp dụng.

Importance sẽ dựa trên "nguồn gốc xuất xứ" của Style Sheets để quyết định xem nó có được áp dụng không.

Ta hãy xem qua ảnh sau:

![](https://images.viblo.asia/fd18e48f-c2a6-4a9d-af4a-b0f6baa45c3a.png)

Có 3 nguồn gốc của Style Sheets mà CSS quy định, được xếp theo thứ tự độ ưu tiên tăng dần (1 là kém ưu tiên nhất, 3 là được ưu tiên cao nhất):

1. User Agent Styles: Đây là những CSS mặc định mà các trình duyệt đặt sẵn, nếu như file HTML của bạn không được style bằng CSS, nó sẽ vẫn có một vài Style mặc định (như là h1 sẽ to và được bôi đậm,...)
2. User Styles: Một vài người dùng sẽ có các Style Custom được cài đặt cho cá nhân họ, những Style này chỉ áp dụng cho bản thân người dùng đó và nó được cài dưới dạng local.
3. Author Styles: Đây là CSS do chúng ta - những developer viết nên và gửi qua các server về máy khách.

Vậy xét theo mức độ Importace, CSS do server gửi đến máy khách luôn được ưu tiên cao nhất, do đó nó sẽ không bị CSS do trình duyệt mặc định hay của máy khách custom ghi đè.

# 2, Specificity

> Specificity is a common reason why your CSS-rules don't apply to some elements, although you think they should. 

*Tạm dịch:* Tính cụ thể là lý do phổ biến cho việc các quy tắc CSS không được áp dụng cho một số elements, mặc dù bạn nghĩ rằng chúng được áp dụng.

Trong CSS có khái niệm [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), khái niệm này liên quan chặt chẽ với "Specificity". Bởi vì CSS sẽ phân cấp các selector này, xem selector nào "specific" hơn thì sẽ áp dụng selector đó.

Hãy nhìn thử vào ví dụ sau đây và tìm ra xem thẻ h1 sẽ được chuyển thành màu gì nhé:

```HTML5
<h1 class="heading" id="heading">Hello World!!</h1>
```

```css
#heading {
    color: orange;
}

.heading {
    color: red;
}

h1 {
    color: blue;
}
```

*Đáp án: **orange***

Các cấp độ "Specific" của CSS được xếp như sau:
1. **Inline styles** - Trong ví dụ trên mình không đề cập đến do kiểu này khá riêng biệt, nhưng bằng cách viết CSS rules trực tiếp trong HTML thông qua thuộc tính style thì CSS ở đó luôn có độ ưu tiên cao nhất.
2. **IDs** - ID được sử dụng như một định danh **duy nhất** cho một thành phần trong trang. Bạn không được phép sử dụng 1 ID cho nhiều element khác nhau trong trang. Nó là **duy nhất**, chỉ đích thị đến element đó cho nên độ ưu tiên của nó chỉ xếp sau Inline styles
3. **Classes, attributes và pseudo-classes** - Selector kiểu này thường chỉ đến những định danh theo nhóm, custom mà người dùng đặt ra. Nó "specific" hơn so với selector theo tên element nên được ưu tiên hơn.
4. **Elements and pseudo-elements** - Đây là loại selector kiểu "chung chung" nhất nên có độ ưu tiên thấp nhất.

Vậy qua các cấp độ như mình đề cập bên trên, các bạn hiểu tại sao đáp án là **orange** rồi chứ ?

# 3, Source Order

Ta xét đến 2 VD sau:

VD thứ 1:
```css
#heading {
    color: orange;
    color: grey;
}

.heading {
    color: red;
}

h1 {
    color: blue;
}
```

Và VD ở đầu bài viết:
```css
//custom.css
h1 {
    color: red;
}

//custom2.css
h1 {
    color: blue;
}
```

Nhắc đến **Source order** chắc các bạn đã đoán được CSS rule nào được áp dụng trong mỗi VD rồi chứ ?

Ở VD 1 đó là `color: grey` và ở VD sau đó là `color: blue`.

Đúng vậy, nếu như các CSS rule có cùng Importance và Specificity thì ta sẽ xét đến thứ tự xuất hiện của nó. CSS rule nào được viết sau thì sẽ được ưu tiên áp dụng hơn so với CSS được viết trước.

Điều này cũng là lý do cho việc ta thường đặt các thẻ style như thế này:

```HTML
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

<link rel="stylesheet" href="custom.css">
```

Trong HTML, file CSS nào được thêm vào sau sẽ có độ ưu tiên cao hơn và được áp dụng. Vậy nên hãy luôn tùy thuộc vào việc bạn muốn ưu tiên file CSS nào được áp dụng mà sắp xếp trong file HTML cho hợp lý nhé !

# Nguồn tham khảo:

https://www.w3schools.com/css/css_specificity.asp

https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade