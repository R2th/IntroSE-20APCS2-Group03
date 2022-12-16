**Đây là 2 phương thức đặc biệt trong CSS mà hẳn rất nhiều dev đã dùng nhưng chưa hẳn là đã phân biệt chính xác. Mình đã phỏng vấn qua rất nhiều bạn mới làm Frontend, thậm chí là có những bạn Frontend dev lâu năm cũng bị nhầm lẫn giữa 2 khái niệm này. Trước đây, mình đã có 1 bài viết nói về Pseudo-elements rồi, các bạn có thể xem ở [đây](https://viblo.asia/p/tim-hieu-ve-pseudo-elements-trong-css-gAm5ypp8ldb).**

Pseudo-element là gì thì như ở trên mình đã để link đến bài viết đó. Vậy còn Pseudo-classes là gì, bao gồm những thuộc tính gì và có gì hay ho nhỉ =))

## Giới thiệu

Pseudo-classes được sử dụng để định nghĩa một **trạng thái** đặc biệt nào đó của một phần tử được chọn.

> **Ví dụ, nó có thể được sử dụng để:**
> 
> Thêm style cho phần tử khi người dùng di chuột qua nó.
> 
> Hiển thị các liên kết được truy cập và không được truy cập theo styles khác nhau.
> 
> Thay đổi style cho một phần tử khi focus vào.

## Cú pháp
Cú pháp của một Pseudo-classes như sau:

```
selector:pseudo-class {
    property:value;
}
```

## Một số ví dụ
Dưới đây sẽ là phần giới thiệu và các ví dụ đơn giản mô tả về một số Pseudo-classes rất hữu dụng nhưng lại ít được biết đến, ngoài những Pseudo-classes phổ biến như `:hover`, `:acitve`, `:focus`, `:first-child`...

### 1. `:out-of-range` 
Chỉ chọn và styles cho phần tử HTML `input` nếu value bên trong vượt ra ngoài giới hạn được chỉ định.

**Ví dụ:**

{@codepen: https://codepen.io/tranquocy/pen/vVrvKz}

### 2. `:in-range` 
Ngược lại với `:out-of-range`, `:in-range` chỉ chọn và styles cho phần tử HTML `input` nếu value nằm trong giới hạn được chỉ định.

**Ví dụ**

{@codepen: https://codepen.io/tranquocy/pen/NOzebK}

### 3. `:only-child`
`:only-child` chỉ khớp với mọi phần tử là con duy nhất của cha mẹ của nó.

**Ví dụ:**

{@codepen: https://codepen.io/tranquocy/pen/oayJBd}

### 4. `:target`
`:target` sẽ styles cho các phần tử được chọn nếu atttribute `id` của nó khớp với atttribute `href` của phẩn tử html `a` khi người dùng click vào phần tử `a`.

*Lưu ý: code html phải luôn có dấu # phía trước id trong attribute href của thẻ `a`*

Ví dụ:

{@codepen: https://codepen.io/tranquocy/pen/xyzmPY}


Ngoài ra, còn khá nhiều Pseudo-classes khác nữa mà mình chưa thể liệt kê hết trong bài viết này. Các bạn có thể tham khảo thêm ở [đây](https://www.w3schools.com/css/css_pseudo_classes.asp).

Cảm ơn mọi người đã đọc bài viết, hy vọng qua bài viết này sẽ giúp được các bạn nhiều hơn trong công việc. Xin chào và hẹn gặp lại!