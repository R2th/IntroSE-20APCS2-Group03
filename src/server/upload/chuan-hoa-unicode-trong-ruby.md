Trong thực tế, có nhiều hơn một cách để lưu trữ một ký tự Unicode. Chẳng hạn như ký tự "Å" có thể được biểu diển là "\u00c5" hoặc chia thành ký tự A và vòng tròn "A\u030A"

![](https://images.viblo.asia/148fc05c-91c4-44d5-a165-b9a1bef02457.jpg)

Vì vậy, khi tìm kiếm hệ thống của bạn sẽ phân biệt đây là 2 ký tự khác nhau. Để giải quyết vấn đề này, Ruby cung cấp cho bạn hàm [#unicode_normalize](https://ruby-doc.org/stdlib-2.2.1/libdoc/unicode_normalize/rdoc/String.html) để chuẩn hóa Unicode về 1 dạng

```ruby
"A\u030A".unicode_normalize == "\u00c5"
```

Ở ví dụ trên "A\u030A" đã được chuẩn hóa về dạng "\u00c5". Vậy có cách nào để chuẩn hóa ngược lại hay không? Câu trả lời là có. Có 4 cách để chuẩn hóa được gọi là "Hình thức chuẩn hóa": NFD, NFC, NFKD, NFKC

Mặc định, #unicode_normalize sử dụng NFC, để sử dụng hình thức chuyển hóa khác, chúng ta có thể truyền params là một trong 4 cái tên vừa nêu trên dưới dạng symbol như sau

```ruby
"A\u030A".unicode_normalize(:nkfc)
```

Bây giờ chúng ta cùng tìm hiểu 4 hình thức chuẩn hóa này hoạt động như thế nào?

### Các hình thức chuẩn hóa

Có 2 loại chuẩn hóa:
- **Composition**: Chuyển đổi các ký tự nhiều mã thành ký tự một mã, như ví dụ trên là "A\u030A" => "\u00c5"
- **Decomposition** Ngược lại với composition, chuyển đổi ký tự một mã về nhiều mã, "\u00c5" => "A\u030A"

Với mỗi loại trên lại được chia làm 2 cách nữa:
- **Canonical** Tạm dịch là bảo toàn nguyên dạng, ví dụ "2⁵" sau khi chuẩn hóa vẫn sẽ là "2⁵"
- **Compatibility** Ngược lại, có thể sẽ biến dạng so với ban đầu, ví dụ "2⁵" sẽ chuẩn hóa thành "25"

Tổng hợp lại chúng ta sẽ có 4 hình thức chuẩn hóa:

- **NFD**: Canonical Decomposition, (Å) "\u00c5" => (Å) "A\u030A"
- **NFC**: Canonical Composition, (Å) "A\u030A" => (Å) "\u00c5"
- **NFKD** Compatibility Decomposition, (ẛ̣) "\u1e9b\u0323" => (ṩ) "\u0073\u0323\u0307"
- **NFKC** Canonical Composition, (ẛ̣) "\u1e9b\u0323" => (ṩ) "\u1e69"

### Sử dụng hình thức chuẩn hóa

Tùy vào mục đích sử dụng bạn sẽ chọn hình thức chuẩn hóa cho hợp lý. Chẳng hạn

- Nếu bạn muốn thân thiện với người dùng, những string được hiển thị tốt hãy sử dụng **NFC**, đó là một lý do mà **#unicode_normalize** của ruby chọn NFC làm hình thức chuẩn hóa mặc định.
- Trong khi NFKC lại cho bạn độ an toàn với Database, nó sẽ convert những ký tự lạ thành những ký tự an toàn tương ứng

Bài viết của mình đã giới thiệu với các bạn hàm **#unicode_normalize** cùng các phương thức chuẩn hóa, hi vọng bài viết có thể giúp các bạn một phần khi đang xử lý với Unicode. Cảm ơn các bạn đã theo dõi!