# Regular Expression là gì?
Regular Expression (thường gọi tắt là regex hoặc regxp, hay "biểu thức chính quy" trong tiếng Việt) là một chuỗi các kí tự tạo thành mẫu (pattern), mẫu này được dùng để làm khuông nhằm tìm kiếm các chuỗi trong một văn bản. Nói cách khác, thay vì tìm kiếm các chuỗi với giá trị cụ thể, một pattern viết bằng regex định nghĩa ra một quy luật, ta có thể tìm được tất cả các chuỗi thõa mãn quy luật đó.

# Dùng Regex thì có lợi gì?
Bài viết này sẽ cố gắng cung cấp một cái nhìn tổng quát về Regular Expression và các thành phần cơ bản của nó. Các ví dụ trong bài viết sử dụng ngôn ngữ PHP. PHP cung cấp các hàm phục vụ cho 2 loại Regex là POSIX Regular Expressions và PERL Style Regular Expressions. Bài viết này sẽ bàn về loại thứ hai, PERL Style Regex. Các ngôn ngữ khác thường có các hàm với tác dụng tương tự, chỉ khác nhau ở tên hàm và danh sách tham s.ố

Để thấy được sức mạnh của regex, ta bắt đầu từ bài toán đơn giản. "Cho một đoạn văn bản, được lưu trong biến $text, liệt kê ra tất cả số điện thoại xuất hiện". Nhận thấy tất cả số điện thoại đều bắt đầu bằng số 0 và bao gồm 10 chữ số. Khi chưa biết về regex, phương án đầu tiên ta nghĩ đến là sử dụng vòng lặp duyệt qua từng kí tự để tìm ra chuỗi thỏa mãn điều kiện trên. Dưới đây là một function thực hiện theo cách tiếp cận này:
```
function extractPhoneNumber($text)
{
    $result = [];
    $phoneNumber = '';
    for($i = 0, $len = strlen($text); $i < $len; $i++) {
        if(is_numeric($text[$i])) {
            if (strlen($phoneNumber) === 0 && $text[$i] != 0) {
                continue;
            }
            if (strlen($phoneNumber) < 10) {
                $phoneNumber .= $text[$i];
            } else {
                continue;
            }
        } else {
            if (strlen($phoneNumber) === 10) {
                array_push($result, $phoneNumber);
            }
            $phoneNumber = '';
        }
    }
    return $result;
}
```
Đoạn code thật rối rắm, và chắc rằng không nhiều người thực sự đọc nó. Vậy nếu yêu cầu bài toán thay đổi thì sao? Bên cạnh cách chuỗi số liên tục, ta còn muốn lọc được cả các số điện thoại được viết dưới dạng 0xxx.xxx.xxx? Việc chỉnh sửa đoạn code trên sẽ cực kì đau đầu.
Nhưng nếu ta áp dụng regex, để kiểm tra hết tất cả các chuỗi số liên tục, cần cần gọi hàm preg_match_all trong PHP, truyền vào pattern của regex, biến string chứa đoạn văn bản gốc (subject) và một tham số đầu ra để chứa các chuỗi match được. Đoạn code dưới đây thực hiện chính xác những gì đoạn code ở trên thực hiện:
```
function extractPhoneNumber($text) {
    preg_match_all('/0\d{9}/', $text, $matches);
    return $matches;
}
```
Nếu cần match cả các đoạn có dạng 0xxx.xxx.xxx, chỉ cần thanh đổi pattern trong hàm preg_match_all lại như sau
```
preg_match_all("/0\d{3}(\.?\d{3}){2}/", $text, $matches);
```
Bài toán lọc số điện thoại ở trên vẫn tương đối đơn giản, với các yêu cầu phức tạp hơn (như tìm website, địa chỉ email,..), regex sẽ còn tiết kiệm nhiều dòng code và thời gian hơn nữa.
# Làm sao để bắt đầu dùng Regex?
Việc sử dụng regex, đã làm đoạn code của ta đơn giản và dễ sửa chữa hơn rất nhiều, nhưng những đoạn pattern như `/0\d{8}\d?/` hay `/0\d{3}(\.?\d{3}){2}/` vẫn rất khó hiểu cho người mới tiếp cận. Để sử dụng regex thành thạo chắc chắn đòi hỏi nhiều thời gian và công sức hơn, và chắc chắn không thể bao trọn trong nội dung bài viết này, tuy nhiên, phần dưới đây sẽ cố gắng trình bày một số thành phần cơ bản và phổ biến của regex, cụ thể hơn là PERL Style Regex.
## Các lớp kí tự
Mức độ đơn giản nhất của regex là match chính kí tự đó. /a/ sẽ match với "a" mà không match với "b". Trừu tượng hóa lên một chút, ta có các lớp kí tự, nghĩa là một kí tự của regex sẽ match với một nhóm kí tự khác. Cụ thể
| Regex | Ý nghĩa |
| -------- | -------- |
| \w  | Các kí tự  chữ cái, chữ số và gạch dưới (_) | 
|\W | Ngược lại với \w |
| \d | Chỉ các chữ số | 
| \D | Bất kì thứ gì không phải chữ số, ngược lại với \d | 
| \s | Kí tự khoảng trống, bao gồm space, tab, xuống dòng | 
| \S | Bất cứ thứ gì không phải kí tực khoảng trống |
| . | Tất cả kí tự, ngoại trừ kí tự xuống dòng |
| [ABC] | Nhóm kí tự, match bất kì ký tự nào nằm giữa hai dấu ngoặc vuông. Ví dụ [ABC] sẽ match với A, B hoặc C |
| [^ABC] | Nhóm kí tự nghích đảo, match bất kì ký tự nào trừ những kí tự nằm giữa hai dấu ngoặc vuông |
| [a-z] | Khoảng kí tự, match tất cả các kí tự có mã ASCII nằm giữa a và z (bao gồm cả a và z). Ví dụ để tìm tất cả chữ cái in hoa từ M đến Q thì dùng `[M-Q]` |
Có một vài cách kết hợp các nhóm trên để cho ra kết quả mong muốn. Để tìm chỉ các chữ cái (không bao gồm chữ số) ta có thể dùng `[a-zA-Z]`. Để tìm tất cả các kí tự, bao gồm cả kí tự xuống dòng, ta dùng `[\s\S]`.
Nếu dùng các kí tự trên liên tiếp nhau thì việc match sẽ diễn ra tuần tự, và chuỗi chỉ match khi có tất cả các kí tự thõa mãn pattern theo thứ tự. Ví dụ `\w\d[^A-G]` sẽ match với "a5P" nhưng không match được "%5P".
## Các điểm neo
Điểm neo thể hiện một ví trí trong chuỗi. Sử dụng điểm neo rất hữu dụng khi ta cần match các chuỗi theo vị trí của nó. Dưới đây là danh sách các điểm neo kèm theo ví dụ trong thực thế.
* `^`: xác định vị trí đầu chuỗi. Ví dụ với pattern `^abc` sẽ match được với chuỗi abc trong "abcde" nhưng không match được với "dabce" hay "edabc".
![](https://images.viblo.asia/243d1e99-e669-4133-a41b-412912233407.PNG)
* `$` : vị trí cuối chuỗi. Cùng các chuỗi trên, ta kiểm tra với pattern alf `abc$`
![](https://images.viblo.asia/ebe06a69-8dff-4eb3-9552-ead2a1a01ccd.PNG)
* `\b`: vị trí biên của từ, tức vị trí bắt đầu hoặc kết thúc một từ. Một từ được hiểu là một chuỗi các kí tự không phải khoảng trống, được ngăn cách bởi hai kí tự khoảng trống (space, tab, new line) ở hai đầu. Ví dụ, `\bx` có nghĩa là tìm tất cả các kí tự x đứng ở đầu mỗi từ, và `x\b` nghĩa là tìm tất cả các kí tự x đứng cuối mỗi từ. Thử nghiệm với chuỗi  "xyz xzy yxz yzx zxy zyx" ta có kết quả.
![](https://images.viblo.asia/18954905-ab83-4994-b404-ca35b501ca58.PNG)
![](https://images.viblo.asia/ce2b0a4e-bc21-453e-9337-90abdb6ba301.PNG)
* `\B`: vị trí không phải biên của từ. Đơn giản là ngược lại với `\b`. Sử dụng lại ví dụ trên với regex là `\Bx` và `x\B`.
![](https://images.viblo.asia/1dc5f607-2bc8-4650-81b2-f1cb4e6ce2d2.PNG)
![](https://images.viblo.asia/a69ac934-e0f3-471d-b853-49d914ea5a50.PNG)
## Định lượng
Không chỉ tìm kiếm một kí tự, ta có thể xác định rõ một số lượng kí tự cụ thể cần tìm kiếm. Sử dụng cú pháp `x{N}` sẽ match với N kí tự x. Hoặc x{M,N} sẽ match với khoảng từ M đến N kí tự x (M<N). Đoạn regex `a{3,5}` sẽ tìm một đoạn gồm 3 đến 5 kí tự a liên tiếp.

![](https://images.viblo.asia/add268d0-d4b8-40d1-8cae-0b52e1435ac7.PNG)

Còn `a{4}` sẽ tìm chính xác 4 kí tự a liên tiếp

![](https://images.viblo.asia/2faa0eef-f9bb-413f-be7b-1aa0be38217c.PNG)
## Kí tự thay thế
Giống như tên gọi, nhưng kí tự sau dùng để thay thế một hoặc một số các kí tự khác. Dưới đây trình bày các kí tự thay thế thường dùng
* `+` thay thế cho tối thiểu 1 kí tự liền trước nó. Ví dụ: `ba+c` nghĩa là tìm một đoạn bắt đầu bằng kí tự "b" tiếp đến là một hoặc nhiều chữ a liên tiếp, và kết thúc bằng kí tự "c".

![](https://images.viblo.asia/70ff2980-1696-44a3-9c9d-879cd78f6499.PNG)
* `*` thay thế cho tối thiểu 0 kí tự liền trước nó. Ví dụ `ba*c` sẽ tìm kiếm một đoạn bắt đầu bằng "b", kết thúc bằng "c" và xen giữa nó là các kí tự "a" liên tiếp nhau, không không gì cả.

![](https://images.viblo.asia/a46f1dcb-e939-49dd-86bb-81b8c7f9b503.PNG)
* `?` optional, hiểu đơn giản thì kí tự nào theo sau bởi dấu ? thì có thể có hoặc không đều được. Ví dụ: `ba?c` sẽ match được cả với "bc" và "bac".
* `|` alternation, nó chính là dấu hoặc trong logic. Nó đánh dấu việc chọn 1 trong 2 hoặc nhiều kí tự là tương được nhau. Ví dụ: `(a|b|c)d` sẽ match được cả "ad", "bd" và "cd". Nhận xét thấy `[abc]d` cũng cho kết quả tương tự.
## Nhóm
Nếu muốn áp dụng các kí tự thay thế, định lượng lên một nhóm kí tự (thay vì một kí tự), ta đặt nhóm kí tự trong cặp ngoặc đơn và xem nó như một kí tự bình thường. Đoạn regex sau sẽ match các chuỗi "abcd", "abcbcd" và "abcbcbcd": `a(bc){1-3}d`.
# Kết luận
Bài viết trên đây cố gắng trình bày những khái niệm phổ biến nhất của Regex. Mặc dù không đầy đủ, nhưng hy vọng có thể cung cấp cho người đọc những kiến thức cần thiết để bắt đầu sử dụng regex ngay trong những dòng code tiếp theo. Để tìm hiểu sau hơn, trang [Regexr.com](https://regexr.com/) cung cấp đầy đủ các khái niệm của regex cũng như cung cấp một editor cho phép vọc vạch regex rất thuận tiện.
Chúc các bạn sử dụng regex thành thạo. Xin cảm ơn!