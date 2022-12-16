# Thêm dấu ba chấm cho đoạn văn bản nhiều dòng

Thông thường, để thêm dấu ... khi nội dung quá dài, ta thường để overflow: hidden, white-space: nowrap cùng với text-overflow: ellipsis. Tuy nhiên, cách này chỉ có tác dụng làm 1 dòng text thêm dấu ba chấm mà thôi. Nó sẽ không làm được như thế này
![](https://images.viblo.asia/18f1789f-a6a3-48cf-a07d-490ccfcb8d8e.PNG)

Vậy sau đây mình sẽ giới thiệu một vài cách giải quyết.

## Dùng thuộc tính -webkit-line-clamp
Đây là một thuộc tính CSS3, chỉ sử dụng được cho các element có display là box. Sau đây là danh sách các trình duyệt được hỗ trợ
![](https://images.viblo.asia/9ebeadb0-84c9-45d0-8671-6d77cb3e4bda.PNG)

Cách sử dụng rất đơn giản, cho đoạn văn bản những thuộc tính sau:

```
.three-line-paragraph {
    display: block; /* Fallback trong trường hợp trình duyệt không hỗ trợ display dạng box */
    display: -webkit-box;
    line-height: 16px; /* Fallback  */
    max-height: 74px; /* Fallback số dòng bạn muốn giới hạn */
    -webkit-line-clamp: 3; /* Số dòng bạn muốn giới hạn */
    visibility: visible; /* Tránh bug không giới hạn số dòng được do trình duyệt */
    text-overflow: ellipsis;
    overflow:hidden;
    max-width: 300px; /* Mình giới hạn độ dài paragraph để nó xuống dòng phục vụ demo thôi */
}
```

Demo
{@embed: https://codepen.io/terry-do/pen/PowWrNx}

## Dùng thư viện dotdotdot
Nếu bạn không cảm thấy trong việc dùng js để giải quyết, bạn có thể dùng thư viện dotdotdot tại https://github.com/FrDH/dotdotdot-js. 
![](https://images.viblo.asia/d1e1fee2-f39f-4ca8-bbdc-0f0a61c3eda6.PNG)
Thư viện này nhẹ, dễ dùng, và trên hết, nó hỗ trợ được đầy đủ các trình duyệt cũ (với phiên bản dotdotdot jQuery, hoặc bản dotdotdot es5 với polyfill). Đây cũng là phương pháp mình hay sử dụng.

## Cách lầy lội
**Cách này chỉ để cho vui thôi** :joy: :rofl: Ta sẽ xử lý đoạn văn bản này phía server side (hoặc javascript cũng được) :joy: Giả sử nhé, đoạn văn bản dài 4 dòng sẽ chứa từ 80-100 ký tự, 101 ký tự sang dòng 5 (Tùy giao diện), bạn hãy giới hạn nội dung đoạn paragraph chỉ chứa tầm 90 ký tự rồi cộng chuỗi thêm dấu ... là được :rofl: Cách này có tác dụng khi khách hàng không để ý hoặc không test trên các cỡ màn khác nhau nhé :)))

# Tổng kết
Nhìn chung thì việc thêm dấu ba chấm theo số dòng văn bản khá là khó nhằn nếu không có những cập nhật mới của Css3 hay những thư viện hỗ trợ khác (Thực ra tự viết cũng được mà mất thời gian chết lên được) :grinning: Và mình đã giới thiệu những phương pháp đơn giản, hiệu quả nhất rồi. Cảm ơn các bạn đã xem, hi vọng chúng giúp ích được cho các bạn :grinning: Happy coding!