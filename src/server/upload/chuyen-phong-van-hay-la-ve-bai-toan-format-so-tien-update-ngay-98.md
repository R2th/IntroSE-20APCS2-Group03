Vài dòng dẫn chuyện trước khi đọc code

Như đã từng đề cập trong một bài viết cách đây ít lâu, rằng việc phỏng vấn và đánh giá một lập trình viên là không dễ, nhất là chỉ thông qua một buổi phỏng vấn.

Một trong những phương pháp tôi hay dùng trong phỏng vấn trực tiếp ứng viên là đặt câu hỏi về thuật toán, các câu hỏi này nhằm các mục đích đánh các kỹ năng về: phương pháp suy luận, khả năng phân tích, khả năng giải quyết vấn đề của ứng viên. Các ưu nhược điểm của ứng viên có thể được bộc lộ thông qua một vài câu hỏi như vậy.

Một trong những câu hỏi yêu thích của tôi tại Sendo là

> Hãy viết một function `formatCurrency` để format giá tiên với input đầu vào là một số tiền nguyên không âm, và output kết quả trả về là một chuỗi được format theo kiểu VND. Ví dụ: `formatCurrency(1000000)` kết quả là: `1.000.000`

# Lời cảm ơn.

Cảm ơn [TheDevBand - An assistant to developers](https://thedevband.com) và [Sendo.vn - nền tảng thương mại trực tuyến hàng đầu Việt Nam](https://www.sendo.vn/) đã tài trợ bài viết này.

# Cách tiếp cận số 1

Cách này là biến số thành một chuỗi rồi duyệt qua mỗi nhóm 3 phần tử bắt đầu từ hàng đơn vị để thêm vào dấu . Cách này, tôi để ý trong quá trình phỏng vấn là được nhiều ứng viên lựa chọn nhất để làm. Có vẻ vì nó lý luận đơn giản dễ suy nghĩ và dễ viết ra thành code.

```js
function formatCurrency(n, separate = "."){
  var s = n.toString();
  var len = s.length;
  var ret = "";
  for(var i = 1; i <= len; i++) {
    ret = s[(len-i)] + ret;
    if( i % 3  === 0 && i < len) {
      ret = separate + ret;
    }
  }
  return ret;
}
```

# Các tiếp cận số 2

Có một số ứng viên chọn phương pháp chia cho 1000 để lấy phần dư, các này tôi cho rằng là thú vị nhất, và sau đây là cách cài đặt của nó. Cách này trong quá trình phỏng vấn thì được ít ứng viên ưu tiên lựa chọn để cài đặt hơn. Vì tôi cũng thấy nó khá nhập nhằng nhất là ở vụ:

- Phải xử lý khi nó chia cho một 1000 nhưng có gí trị bé hơn 100
- Rồi sau đó xử lý dấu chia tách nữa.

```js
function formatCurrency(n, separate = "."){
  var ret = "";
  do {
    let t = n % 1000;
    n = n / 1000 | 0;
    if( n > 0) {
      ret = ("00" + t).substr(-3) + ret;
      ret = separate + ret;
    } else {
      ret = t + ret;
    }
  } while(n > 0);
  return ret;
}
```

# Các tiếp cận số 2+

Thật thú vị, vì trong quá trình phỏng vấn những ngày gần đây, lại có một bạn giải bài toán này theo phương pháp đệ quy.

Nó giống cách tiếp cận số 2 nhưng mà theo cách đệ quy.

```js
function formatCurrency(n, separate = "."){
  if( n < 1000 ) {
    return n;
  }
  var t = n % 1000;
  var s = ("00" + t).substr(-3);
  return formatCurrency(n / 1000 | 0, separate) + "." + s;
}
```

# Các tiếp cận số 3

Cách giải số 3 nhìn ngắn gọn và có tính thách đố cao nhất, và để hiểu được cách viết như vậy bạn có thể phải tìm hiểu lại về Regular Expression.

Cách này tôi cũng không thấy có ứng viên nào lựa chọn, đơn giản là vì không có mấy người nhớ được cái expression đó, tôi ví dụ ra đây cũng để tham khảo cho vui thôi.

Tham khảo:
- [Positive and Negative Lookahead. Nguồn tại: www.regular-expressions.info](https://www.regular-expressions.info/lookaround.html)
- [Regex lookahead, lookbehind and atomic groups. Nguồn tại: stackoverflow.com](https://stackoverflow.com/questions/2973436/regex-lookahead-lookbehind-and-atomic-groups)

```js
function formatCurrency(n, separate = "."){
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  return ret;
}
```

# Lời kết

Nhân một chiều thú vị, viết một vài để cùng đàm đạo với các bạn gần xa.
Chúc các bạn có một tối chủ nhật vui vẻ, và sang tuần mới có nhiều năng lượng để tiếp tục coding.
Nhưng điều nữa là cảm ơn các bạn đã đọc đến đây.
Nếu thấy bài viết thú vị, hãy comment một điều gì đó, nhưng xin đừng nói lời cay đắng. :)