# Giới thiệu
Xin chào, trong bài viết lần này tớ xin chia sẻ một số đoạn regex khá hữu dụng mà mình sưu tầm được nhằm rút ngắn thời gian mày mò, tìm kiếm trên mạng, còn về khái niệm thì đã có rất nhiều bài viết giải thích rồi nên mình sẽ không giải thích lại nữa mà đi thẳng vào nội dung chính luôn ha.

# Một số đoạn Regex thường dùng
## Kiểm tra số
```js
// Số nguyên
/^\d+$/

// Số thập phân
/^\d*\.\d+$/

// Số nguyên và số thập phân
/^\d*(\.\d+)?$/

// Số âm, số nguyên dương và số thập phân
/^-?\d*(\.\d+)?$/

// Số nguyên, số thập phân và phân số
/[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/
```

## Kiểm tra ký tự
```js
// Chữ cái và số không bao gồm khoảng trắng
/^[a-zA-Z0-9]*$/

// Chữ cái và số có bao gồm khoảng trắng
/^[a-zA-Z0-9 ]*$/
```

## Kiểm tra Email
```js
/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
```

## Kiểm tra độ mạnh của password
```js
// Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự
/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/ 
```

## Kiểm tra username
```js
// Gồm chuỗi và số từ 3 đến 16 ký tự
/^[a-z0-9_-]{3,16}$/
```

## Kiểm tra URL
```js
// Bao gồm Http(s) Protocol
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/ 

// có hoặc không có Http(s) Protocol đều được
/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ 
```

## Kiểm tra ngày
```js
/* Format YYYY-MM-dd */
/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
 
/* Format dd-MM-YYYY hoặc 
               dd.MM.YYYY hoặc
               dd/MM/YYYY
   và kiểm tra năm nhuận */
/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
 
/* Format dd-mmm-YYYY hoặc
               dd/mmm/YYYY hoặc
               dd.mmm.YYYY */
/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
```

## Kiểm tra HTML Tags
```js
/<\/?[\w\s]*>|<.+[\W]>/
```

## Kiểm tra Javascript Handlers
```js
// Inline JS handler
/\bon\w+=\S+(?=.*>)/
/*
VD:
<img src="foo.jpg" onload=function_xyz />
<img onmessage="javascript:execute()">
<a notonmessage="nomatch-here" onfocus="alert('hey')" onclick=foo() disabled>
<p>
  some content
</p>
*/

// Inline JS handler with element
/(?:<[^>]+\s)(on\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/
/*
VD:
<img src="foo.jpg" onload="something" />
<img onmessage="javascript:foo()">
<a notonmessage="nomatch-here">
<p>
    some string 2
</p>
*/
```
## Kiểm tra Slug
```js
/^[a-z0-9]+(?:-[a-z0-9]+)*$/
```

## Kiểm tra string bị trùng lặp
```js
/(\b\w+\b)(?=.*\b\1\b)/
```

## Kiểm tra Phone Numbers
```js
// Số quốc tế
/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
```

## Kiểm tra đường dẫn
```js
// bao gồm tên và đuôi file
/((\/|\\|\/\/|https?:\\\\|https?:\/\/)[a-z0-9 _@\-^!#$%&+={}.\/\\\[\]]+)+\.[a-z]+$/

// đường dẫn với tên file và extension có hoặc không có đều được
/^(.+)/([^/]+)$/
```

## Kiểm tra URL trang cá nhân FB
```js
/(?:http:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
```

## Thêm rel="nofollow" vào các liên kết
```js
(<a\s*(?!.*\brel=)[^>]*)(href="https?://)((?!(?:(?:www\.)?'.implode('|(?:www\.)?', $follow_list).'))[^"]+)"((?!.*\brel=)[^>]*)(?:[^>]*)>
```

## Cú pháp tìm kiếm Google
```js
/([+-]?(?:'.+?'|".+?"|[^+\- ]{1}[^ ]*))/g
```

# Tổng kết
Trên đây là một số đoạn Regex mà mình tổng hợp lại được, hy vọng nó sẽ giúp ích cho bạn khi cần làm việc với Regex, nếu thấy hữu ích thì nhớ lưu lại bài viết này nhé ! Cảm ơn bạn đã đọc đến đây, Happy coding <3 <3 <3