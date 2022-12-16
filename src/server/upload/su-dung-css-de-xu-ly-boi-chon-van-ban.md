CSS cho phép việc xử lý việc bôi chọn văn bản trên trang web. Bằng cách này chúng ta có thể ứng dụng để làm một số tính năng hữu ích cũng như làm cho trải nghiệm người dùng được tốt hơn.

### Chọn tất cả
Một ứng dụng cho chức năng chọn tất cả thường gặp là khi có một đoạn văn bản mà muốn cho người dùng copy nhanh hoặc là một đoạn code, thay vì phải bôi đen đoạn đó thì chúng ta có thể xử lý để cho người dùng chỉ cần ấn vào là có thể bôi chọn hết.

```
div {
    -webkit-user-select: all; /* for Safari */
    user-select: all;
}
```

Nhưng cách này có thể gây khó chịu khi người dùng chỉ muốn copy một phần nhỏ văn bản trong đó. Nghĩa là người dùng không thể bôi chọn một phần nhất định vì mỗi khi chọn vào phần từ div trên thì đều bị bôi chọn tất cả.
Để khắc phục chúng ta sử dụng ```tabindex``` để có thể kết hợp ```animation``` người dùng focus vào.

```
<div tabindex="0">make awesome things that better</div>

div {
    -webkit-user-select: all;
    user-select: all;
}

div:focus {
    animation: select 100ms step-end forwards;
}

@keyframes select {
    to {
        -webkit-user-select: text;
        user-select: text;
    }
}
```

### Loại bỏ bôi chọn
Đôi khi chúng ta gặp vấn đề về trải nghiệm người dùng khi có một  button được ấn liên tục thì nó sẽ gây khó chịu khi vô tình lựa chọn đoạn text đó.
Để xử lý vấn đề này chúng ta có thể làm như sau:

```
button {
    -webkit-user-select: none;
    user-select: none;
}
```

### Style bôi chọn
Ngoài ra chúng ta cũng có thể sử dụng CSS để định dạng cho đoạn văn bản được bôi chọn bằng ```::selection``` selector
```
p::selection {
    background-color: yellow;
}
```

Trên đây là một vài cách xử lý ít ỏi, mọi người có thể tìm hiểu thêm[ Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection). Cảm ơn mọi người đã dành thời gian đọc bài viết :kissing_heart: