# I. Regex là gì ?
## 1.1 Định nghĩa

- Regex là viết tắt của **Regular Expression**, là một chuỗi miêu tả **một tập hợp các chuỗi khác**, theo những quy tắc và cú pháp nhất định.
- Regex thường được sử dụng với các tiện ích tìm kiếm, xử lý văn bả dựa trên các mẫu được quy định.
- Rất nhiều ngôn ngữ hỗ trợ biểu thức chính quy (Regex) khi xử lý chuỗi như Javascript, Ruby .... và một số khác thông qua thư viện chuẩn như ngôn ngữ Java, Python, C++, .NET.
- Hầu hết các ngôn ngữ đều cung cấp Regex thông qua các thư viện.

Regex được sử dụng để kiểm tra sự hợp lệ của dữ liệu đầu vào là các string, như kiểm tra địa chỉ url, username, password, phone number, email ... Kết quả trả về của Regex có thể hiểu một cách đơn giản là kết quả của sự so sánh khớp nhau giữa biểu thức.
Các bạn có thể viết Regex và thử các trường hợp với trang web http://rubular.com/, https://regexr.com/

## 1.2 Ưu điểm

- Linh hoạt, sử dụng tốt với nhiều ngôn ngữ.
- Xử lý các chuỗi một cách ngắn gọn và tiện lợi.
- Giảm thiểu thời gian và công sức khi lập trình. Vì chỉ cần viết một biểu thức mẫu là có thể đảm bảo được dữ liệu đầu vào.

## 1.3 Nhược điểm

Dễ sai, dễ tiềm ẩn lỗi.
Khó học vì phải nắm bắt tốt các quy tắc cũng như có tư duy logic tốt.

# II. Giải thích ý nghĩa kí tự trong regex

- ^: Bắt đầu string, phù hợp với những chuỗi string bắt đầu bằng ký tự đặt sau dấu ^.
- a*: Xuất hiện kí tự a 0 hoặc nhiều lần.
- a+: Xuất hiện kí tự a ít nhất một lần trong chuỗi string.
- a?: Có hoặc không có kí tự a.
- .: phù hợp với bất kỳ một ký tự nào ngoại trừ ký tự xuống dòng.
- x|y : Hoặc có x hoặc y hoặc có cả 2
- a{n} : Kí tự a xuẩt hiện n lần trong chuỗi, n phải là số nguyên dương.
- a{n, m} : n <= m và n,m phải là số nguyên dương. Kí tự a xuất hiện tối thiểu n lần và tối đa m lần trong chuỗi ký tự. Khi không điền giá trị của m, thì m được xem là có giá trị ∞ 
\d : Các ký tự số [0-9]
\D: Các ký tự không phải số [^0-9]
\s: Khoảng trắng.
\S: Tất cả các chữ ko phải là khoảng trắng.

# III. Một số đoạn regex mẫu.
**- Độ mạnh của mật khẩu**
`^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`

 **- Mã màu Hex**
`\#([a-fA-F]|[0-9]){3, 6}`

**- Xác thực địa chỉ Email**
`/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm`

**- Dấu phân cách hàng nghìn**
`/\d{1,3}(?=(\d{3})+(?!\d))/g`

**- Lấy tên miền từ URL**
`/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i`

**- Sắp xếp các từ khóa bằng cách đếm số từ**
```
^[^\s]*$        matches exactly 1-word keyword
^[^\s]*\s[^\s]*$    matches exactly 2-word keyword
^[^\s]*\s[^\s]*     matches keywords of at least 2 words (2 and more)
^([^\s]*\s){2}[^\s]*$    matches exactly 3-word keyword
^([^\s]*\s){4}[^\s]*$    matches 5-words-and-more keywords (longtail)
```

**- Xác thực số điện thoại**
`^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$`

**- Xác thực ngày trong định dạng DD/MM/YYYY**
`^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(`

**- Phân tích tiêu đề Email**
`/\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/it`

# IV. Tài liệu tham khảo

1. https://freetuts.net/cac-quy-tac-regular-expression-can-ban-65.html
2. https://ruby-doc.org/core-2.6.4/Regexp.html
3. https://techblog.vn/su-dung-regex-trong-ruby