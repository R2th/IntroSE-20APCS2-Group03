Ở phần 1, mình đã nói về cách đơn giản để tự build i18n trong JS với project Laravel. (không dùng thư viện). Bài này mk sẽ chia sẻ nốt cách để build hàm `trans_choice()` trong JS nhé.

## 1. Hàm trans_choice() trong Laravel
Chúng ta đều biết, trong tiếng Việt, dù 1 quả táo hay nhiều quả táo thì dịch ra vẫn là quả táo. Nhưng với tiếng Anh hay một vài ngôn ngữ khác thì nó lại khác nhau. 

Ví dụ: 1 quả: **There is one apple** hoặc nhiều quả: **There are many apples**.

Vì vậy, hàm `trans_choice()` được tạo ra để phục vụ cho sự đa dạng của các ngôn ngữ khác nhau. Khi sử dụng nó, bạn cần truyền thêm 1 params để xác định số đoạn ngôn ngữ được chọn. 

Trong file ngôn ngữ `i18n.php`, mình sẽ khai báo key và đoạn text cần hiện ra theo 2 kiểu luôn.
```
'apples' => 'There is one apple|There are many apples',
```
Sử dụng:
`trans_choice('i18n.apples', $count);`

Nếu biến `$count > 1` thì đoạn code trên sẽ in ra đoạn text dạng số nhiều. Vì vậy, nó chỉ khác hàm `trans()` là cần truyền thêm số lượng vào thôi.
## 2. Viết hàm trans_choice trong JS
Để viết lại hàm `trans_choice()` trong JS khá đơn giản, chúng ta vẫn viết gần giống hàm `trans()` thôi, chỉ thêm 1 câu lệnh điều kiện để xác định đoạn ngôn ngữ cần hiển thị. 
```
function trans_choice(key, count = 1, replace = {})
{
    let translation = key.split('.').reduce((t, i) => t[i] || null, window.translations).split('|');

    translation = count > 1 ? translation[1] : translation[0];

    for (var placeholder in replace) {
        translation = translation.replace(`:${placeholder}`, replace[placeholder]);
    }

    return translation;
}
```
Các bạn có thể thấy, nó gần giống hàm `trans()` mà mình giới thiệu ở Part 1.

Hàm này sẽ thêm `split('|')` để cắt đoạn text trên theo dấu `|`, nên kết quả `translate` sẽ là  mảng chứa 2 đoạn text số ít và số nhiều. Sau đó, mình thêm điều kiện `translation = count > 1 ? translation[1] : translation[0];`. Nếu `count > 1` thì sẽ trả về đoạn text số nhiều thôi. (Quá đơn giản)

Thế là đã xong rồi!!!
### Note
Nhắc nhẹ các bạn mới, với các function dùng chung cho toàn bộ project thì chúng ta nên viết nó vào 1 file `helper.js`. File này tương tự như helper trong code Laravel vậy, nó sẽ lưu các hàm dùng chung. Trong JS, khi cần dùng thì mình sẽ `require/import` những file/function cần thiết vào  để sử dụng nhé.
# Tổng kết
Trên đây mình đã trình bày xong cách để làm i18n trong JS rồi. 

Tuy nhiên, cách làm này chỉ áp dụng với những cú pháp i18n đơn giản thôi. Vậy nên, nếu project của các bạn không cho phép dùng thư viện thì mình dùng cái này, còn nếu được thì cứ xài thư viện cho tiện nhé. Ở Part 1, mình đã ghi lại 1 vài thư viện rồi, các bạn xem lại nhé.

Cảm ơn các bạn đã đọc. 
# Tài liệu tham khảo
https://laravel.com/docs/8.x/localization