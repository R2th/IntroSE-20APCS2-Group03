**Tìm các phần tử của 1 chuỗi match với Regular expressions (Regex)**

Trong Javascript, chúng được tạo ở giữa các dấu gạch chéo `/.../` hoặc được instance bởi `new RegExp()` và sau đó được sử dụng trong các method như `match()`, `test()`, `replace()`.

![](https://images.viblo.asia/52dd69db-677a-48a9-a3f1-3c09d59aca96.png)

**Match các ký tự riêng lẻ hoặc đặt nhiều ký tự trong dấu ngoặc vuông `[...]` để match bất kỳ ký tự nào phù hợp**

![](https://images.viblo.asia/cc9ec92c-ddf2-4a59-9e09-8be64bcca9d6.png)

**Thêm `flag` tùy chọn vào cuối Regex để sửa đổi cách thức hoạt động**

* `i (insensitive)`: không phân biệt chữ hoa, chữ thường.
* `m (multi line)`: khi có ^ và $ thì ^ sẽ là bắt đầu 1 dòng và $ là kết thúc 1 dòng trong chuỗi, nếu không có flag m thì ^ và $ là bắt đầu và kết thúc của cả chuỗi.
* `g (global)`: tìm tất cả các đoạn ký tự khớp với mẫu tìm kiếm, nếu không có flag g thì việc tìm kiếm sẽ dừng lại ở lần khớp đầu tiên.

![](https://images.viblo.asia/1aed1228-c7d0-445d-8ab4-74071434d590.png)

**Sử dụng `^` và `$`**

* `^` Trùng khớp với phần đầu của chuỗi đích. Ví dụ: `^a` sẽ trùng khớp với chữ a trong chuỗi `abc`.

* `$` Trùng khớp với phần cuối của chuỗi đích. Ví dụ: `c$` sẽ trùng khớp với chữ c trong chuỗi `abc`.

![](https://images.viblo.asia/7dc1fc62-7434-4d07-b49a-eab970bf1f8f.png)

**Sử dụng các ký tự đại diện**

* `\d` Trùng khớp với 1 ký tự số (digit).

* `\D` Ngược lại với `\d`. Trùng khớp với 1 ký tự không phải là số (digit).

* `\s` Trung khớp với 1 ký tự khoảng trắng (whitespace) bao gồm khoảng trắng tạo ra bởi phím Tab.

* `\S` Trùng khớp với 1 ký tự không phải là khoảng trắng (non-whitespace).

* `\w` Trùng khớp với các ký tự là từ (word) bao gồm dấu _ (underscore) và chữ số.

* `\W` Trùng khớp với các ký tự không phải là từ (non-word)

* `\b` Trùng khớp với toàn bộ ký tự đúng trước nó.

* `\B` Ngược lại với \b, sẽ không khớp với toàn bộ mà chỉ 1 phần ký tự đứng trước nó.

![](https://images.viblo.asia/f7fd49a8-8cc0-4969-9dc2-579cbd81f4ca.png)

**Chỉ match 1 số ký tự hoặc nhóm nhất định với 1 bộ định lượng**
* `+` Trùng khớp với 1 hoặc nhiều lần ký tự đứng trước nó.
* `*` Trùng khớp với 0 hoặc nhiều lần ký tự đứng trước nó.
* `?` Trùng khớp với 0 hoặc 1 lần ký tự đứng trước nó.
* `.` Trùng khớp với 1 ký tự đơn bất kỳ ngoại trừ ký tự ngắt dòng (line-break) và cũng không lấy được ký tự có dấu (unicode).
* `x{n}` Trùng khớp đúng với n lần ký tự đứng trước nó (n >= 0).
* `x{n,}` Trùng khớp với ít nhất n lần ký tự đứng trước nó (n >= 0).
* `x{n, m}` Trùng khớp với ít nhất n lần và nhiều nhất là m lần ký tự đứng trước nó (n >= 0, m >= 0, n <= m).

**Sử dụng `(...)` để gộp vào cùng 1 nhóm**

* `(...)` Nhóm các ký tự lại.
* `(x|y)` Trùng khớp với x hoặc y.

![](https://images.viblo.asia/8fccbc66-4ec0-4fec-9593-2e1df4be173b.png)

**Sử dụng các ký tự đặc biệt bằng cách sử dụng `\`**

* Các ký tự đặc biệt trong JS regex: `^ $ \. * +? () [] {} |`
* Cách sử dụng, ví dụ sử dụng `*`: `\*`

![](https://images.viblo.asia/02902c24-4816-4cd5-8945-e4dbaac07b0e.png)

**Match với bất kỳ thứ gì, ngoại trừ ký tự nào đó**

* `[^xyz]` So sánh và không trùng khớp với những ký tự nằm trong khoảng chỉ định. Dấu `^` (dấu mũ) nằm trong dấu ngoặc vuông là một dấu phủ định.

![](https://images.viblo.asia/ae886923-2d6b-400d-afbc-1f3e40516d87.png)

**Tham khảo:**

https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY#_vay-regex-co-the-giup-gi-cho-chung-ta-trong-cac-truong-hop-tren-8

https://dev.to/chrisachard/intro-to-regex-for-web-developers-2fj4