Bài viết gốc [7 Interesting Ruby Code Examples](https://www.rubyguides.com/2019/02/ruby-code-examples/)

Một cách để học các mẹo, mẫu và phương thức là đọc những dòng code của người khác đã viết trước.

Thế nhưng dòng code đó có thể tìm ở đâu ra?

Trên mạng có rất nhiều project open source và code challenge sites cho phép xem các giải pháp từ nhiều người phát triển khi chúng ta cũng đẩy lên giải pháp của minh.

Trong bài viết này sẽ cho bạn thấy một số bình luận với mỗi ví dụ.

### Tổng của 2 số - Sum Of Two Numbers
Trong ví dụ này chúng ta muốn tìm ra nếu cho một mảng có các số duy nhất, tính tổng của 2 số khi bằng số đầu vào cho trước.

![sum_eq_n](https://images.viblo.asia/30c537af-a139-426e-af91-bd47256a9c95.png)

Điều thú vị ở đây là phương thức `product` khi chúng ta sử dụng phương thức này sẽ có một vòng lặp trong một vòng lặp mà ghép các tất cả các giá trị trong mảng A với tất cả gía trị trong mảng B.

ref: [Ruby#product](https://apidock.com/ruby/Array/product)

### Đếm, Sắp xếp và Tìm kiếm - Counting, Mapping & Finding 

Bài toán ở đây là muốn tìm kiếm con số thiếu ở trong dãy như `(2, 4, 6, 10)`.

Chúng ta có thể sử dụng chiến lược tính toán chênh lệch giữa các con số.

```
[2, 2, 4]
```

Mục đích cuối cùng là tìm ra dãy con số.

#### Tăng dần hay giảm dần? nhảy bao nhiều?

Đây là code để cho thấy chênh lệch trong dãy

![diff_sequence](https://images.viblo.asia/9a9907b0-abf9-4535-9d8f-df568ced64ed.png)

Số 2 ở dưới cùng là số tăng giữa các con số trong dãy.

Khi chúng ta biết dãy chúng ta có thể so sánh tất cả các con số để tìm kiếm con số bị thiếu.

![find_missing_seq](https://images.viblo.asia/ab6bc7a1-668c-4db2-a4ae-cd52a0852e3d.png)

Các phương thức ruby trên đã giúp chúng ta giải quyết vấn đề.

### Biểu thức chính quy - Regular Expression

Nếu chúng ta làm việc với string và chúng ta muốn tìm mẫu vậy regular expression là giải pháp.

Bài toàn trong ví dụ này là tìm ra nếu string cho trước theo mẫu ký tự nguyên âm sang ký tự thường.

Ví dụ: `"ateciyu"` 

Tiếp đến chúng ta sử dụng biểu thức chính quy với phương thức `match?` để xác định.

![alternating_characters](https://images.viblo.asia/24039780-847c-491a-bfa8-0e3789799ad3.png)

***Một số thứ cần lưu ý:***

1. Phương thức `cycle` dùng để tiếp tục hoán đổi giữa biểu thức nguyên âm và biểu thức khác nguyên âm.
2. Chúng ta chuyển đổi string tành mảng của các ký tự với `chars` để có thể sử dụng phương thức `all?`

### Đệ quy và Stack - Recursion & Stack

Đệ quy khi một phương thức gọi chính nó nhiều lần để xử lý cho tới giải pháp.

Một số bài toán thú vị có thể giải bằng đệ quy.

Do đệ quy có giới hạn của nó chúng ta có thể dùng [stack data structure](https://www.rubyguides.com/2017/03/computer-science-in-ruby-stacks/) thay thế.

Ví dụ dưới muốn tìm ra "Power Set" của một mảng nhất định. Power Set là một tập của tất cả các tập con tạo ra từ mảng.

Đây là giải pháp dùng đệ quy:
![get_numbers_recursion](https://images.viblo.asia/efc43c56-2955-4e47-b2d5-02b09ef43717.png)

> irb(main):001:0>get_numbers [1,2,3]
> => [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]


Đây là giải pháp dùng stack:
![get_numbers_stack](https://images.viblo.asia/ad7f5d77-f3d0-468c-9a10-751cb2a15284.png)

> irb(main):001:0> get_numbers_stack [1,2,3]
> => [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]

Ý tưởng ở đây là mỗi khi lần gọi thuật toán thì tích hoặc không tích một con số.

Chúng ta chi rễ nhanh và lấy đầu ra của nhánh vậy đã tạo tất cả kết hợp có thể hãy tưởng tượng một cậy mỗi lá là một giải pháp.

***Một số thứ cần lưu ý:***

1. Giải pháp đệ quy ngắn hơn
2. Phần "thực thi" thật của thuật toán (index + 1) hầu như giống nhau.
3. `stack` mà chúng ta dùng chỉ là một mảng vì không có class `Stack` trong Ruby.

### Phương thức móc nối - Method Chaining

Phần này là thú vị nhất vì nó cho thấy sức mạnh của Ruby. Móc nối các phương thức cho phép lấy đầu ra tạo bởi một phương thức và truyền nó cho phương thức khác, giống nhưng dãy sản xuất nhà máy.

Chúng ta bắt đầu từ đầu vào đi qua xử lý bằng gọi các phương thức, dần dần biến đầu vào thành kết quả mà chúng ta mong muốn.

Đây là ví dụ:

![longest_repetition](https://images.viblo.asia/01b1fa9f-48d4-4077-a52b-1829c968a988.png)

Cho trước một string với phương thức trên sẽ tìm ra ký tự lặp lại dài nhất và số lần lặp.

***Chú ý***
* Cách code trên được biến đỏi để dễ dàng đọc hiểu
* Sử dụng mẫu `Symbol#to_proc` với `(&:size)`

### Chỉ số - Index

Khi chúng ta muốn có được chỉ số trong vòng lặp chúng ta có thể sử dụng phương thức`with_index`.

![reverse_alternate](https://images.viblo.asia/7837e3c6-3b36-4467-8432-8a7daadad9cf.png)

***Chú ý***
* Chúng ta kết hợp `with_index` và `even?` để tìm ra từ cần đảo ngược.
* Gsub không có block trả về một đối tượng `Enumerator` cho phép móc nối với các phương thức khác.

### Each With Object

Một phương thức thông dùng là `each_with_object` và `with_object`.

Chúng ta có thể dùng 2 phương thức này khi cần một đối tượng lưu các kết quả.

![clean_string](https://images.viblo.asia/2624420f-52aa-4004-b30e-27ceaf2affdb.png)

Trong ví dụ này chúng ta muốn xóa ký tự `#`.

***Chú ý***
* `each_with_object` nhận đối số là đối tượng cần làm việc với nó. Đối số này sẽ trở thành paramenter của block thứ 2.
* Chúng ta biến đổi string thành mảng của các ký tự `chars` sau đó ghép lại thành string với `join`
* Chúng ta dùng toán tử tam phân(ternary operator) để xác định cần phải làm gì để code gọn gàng hơn.

Cảm ơn đã đọc bài viết này.