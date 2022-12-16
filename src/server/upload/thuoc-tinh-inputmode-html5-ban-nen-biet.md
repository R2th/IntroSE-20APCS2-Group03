Thuộc tính inputmode cho phép chúng ta hiển thị loại bàn phím ảo nào sẽ được hiển thị trên các thiết bị có bàn phím ảo, ví dụ iphone, điện thoại android, tablet...
Các loại bàn phím ảo thường có khi ta click vào 1 input đó là Numeric, Tel, Decimal, Email, Url, Search ...
Với mỗi bàn phím ảo được chỉ đinh cụ thể, bản thân thiết bị sẽ được ra được những suggest tương ứng với loại bàn phím ảo đó.

### Numeric

```
<input type="text" inputmode="numeric" />
```

Đây là loại inputmode phổ biến nhất được dùng để xác đinh loại bàn phím trong thực tế. Người dùng sẽ chỉ muốn hiển thị bàn phím số trong một số trường hợp cụ thể để đỡ mất nhiều thao tác không cần thiết ví dụ như là PIN entry, zip codes, credit card numbers ...
Có thể bạn sẽ thắc mắc tại sao lại ko sử dụng type là number cho rồi, thực ra với inputmode numeric chỉ hiện thị số và type là text thì ta có thể sử dụng thêm được inputmode="numeric" maxlength, minlength và pattern attributes, khiến cho nó chở nên linh hoạt hơn trong các trường hợp khác nhau.


Có dev sẽ sử dụng type=tel để giải quyết vấn đề, nhưng nó lại không đúng về mặt ngữ nghĩa. Hơn nữa bàn phím sẽ chỉ loại bỏ các letter thôi, trên ios nó vẫn hiển thị các ký tự đặc biệt, tuy nhiên ta có thể sử dụng các pattern để loại bỏ bớt. Ví dụ như là `pattern="\d*"`, tuy nhiên hãy chắc chắn rằng với input đó bạn phải chắc chắn là chỉ show ra số thôi, nếu không thì không chọn loại bàn phím khác được đâu.

Pen:
{@embed: https://codepen.io/buiduccuong30051989/pen/aryvJN}

Tin vui là

Chromium-based browsers trên Android — như là Microsoft Edge, Brave and Opera — chia sẻ chung một inputmode behavior như Chrome.