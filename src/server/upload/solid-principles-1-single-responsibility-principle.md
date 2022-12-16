Có nhiều người đã biết đến nguyên tắc SOLID qua nhiều bài viết trên viblo như:  [đây](https://viblo.asia/p/nguyen-ly-solid-cho-thanh-nien-code-cung-gDVK2WzAZLj) hoặc [đây](https://viblo.asia/p/solid-principles-in-ruby-gDVK2WnwZLj).
Nhưng trong series này mình sẽ giúp các bạn hiểu rõ hơn về từng yếu tố trong nguyên lý SOLID, đừng bỏ lỡ nhé!
Yếu tố đầu tiên mình đề cập trong series này là: Single responsibility principle - Nguyên tắc đơn trách nhiệm.

# Single Responsibility Principle
"Một class (object) có một và chỉ một trách nhiệm duy nhất"

Để có thể giúp mọi người hiểu rõ điều này hơn, thì chúng ta bắt đầu giải thích rõ hơn: 
làm thể nào để định nghĩa class (object) chỉ có một trách nhiệm duy nhất?

Chúng ta hãy xem xét câu sau: "Không nên có nhiều hơn một lý do để sửa đổi (viết lại) một class ”. Mình sẽ cố gắng giải thích lý do này.

Ta có ví dụ sau: Giả sử chúng tôi muốn tạo 1 user. Điều đầu tiên chúng ta cần thực hiện đó là validate dữ liệu. Mình tạo một service object để thực hiện điều đó như sau:

![](https://images.viblo.asia/5802c939-836a-4d97-9260-d337c0d462f0.png)

Class trên có chức năng validate những user input rồi sau đó thực thi dữ liệu. nhưng chúng ta thấy, validate và thực thi dữ liệu là 2  hoạt động tách biệt. Trước khi ta tiến hành sửa chữa, cải thiện giải pháp này cần phải làm rõ tại sao giải pháp đó không tốt.

Trước hết, hai quy trình này được kết hợp chặt chẽ, Không có cách nào dễ dàng để tái sử dụng một trong số chúng một cách riêng biệt.

Nhưng để class như vậy sẽ có khả năng xuất hiện những sai lầm tiềm tàng đồng thời việc kiểm tra lại cũng sẽ khó khăn hơn.

Chính vì vậy chúng ta cần chuyển code validate sang 1 class khác:

![](https://images.viblo.asia/003175db-6eac-43e2-860a-c962bcf76b06.png)

![](https://images.viblo.asia/7f06041e-2f78-4aa5-a4eb-72ee15de1587.png)

Bây giờ, chúng ta có hai lớp, mỗi lớp chỉ có một trách nhiệm duy nhất. 

Lớp đầu tiên xử lý dữ liệu, lớp thứ hai thực hiện validate dữ liệu. Nếu chúng ta phải thay đổi các quy tắc validate, chúng ta chỉ cần sửa trong lớp UserValidation. Tương tự như vậy với việc xử lý dữ liệu, chúng ta không phải thay đổi lớp UserCreateService.
Và chúng ta có thể dễ dàng tái sử dụng lại các lớp này.

Ngoài ra thực thi như vậy còn mang lại lợi thế trong việc test, chúng ta sẽ có thể test riêng biệt cách lớp khác nhau chứ không cần gộp lại như trước, sẽ mất khá nhiều logic.

# Nhưng...
Bạn có thể đã nghe nói về Domain Driven Development (DDD). Khái niệm này liên quan đến các thuật ngữ khác như: information expert hoặc rich domain model.
với rich domain model, khái niệm này giả định rằng chúng ta giữ tất cả hành vi được kết nối chặt chẽ cho mô hình cụ thể trong model. Vì vậy, ta giữ dữ liệu & logic hoạt động ở cùng một vị trí. Nghe như là chúng ta đang nói về OOP đó :))

Cùng xem ví dụ sau nhé:

![](https://images.viblo.asia/dca7447f-a97e-4131-a06a-1c1bdc72229c.png)

Ok, chúng ta đã validate, và thực thi logic để thông báo cho người dùng. có phải ở đây model thực hiện nhiều trách nhiệm khác nhau? Có vi phạm nguyên tắc SRP hay không?

Câu trả lời là: **Không**

Lý do là vì model vẫn chỉ chịu trách nhiệm về dữ liệu và tính toàn vẹn của riêng nó.
# Tổng kết
Như bạn có thể nhận thấy, sự hiểu biết nguyên tắc này không đơn giản như vậy. 

Chủ yếu là xác định được "lý do thay đổi" có thể gây khó khăn và cũng có chỗ thay đổi cách giải quyết thông thường của mình. Thay đổi để tốt lên là luôn luôn cần thiết đúng không nào.
Phấn đấu để có được những lợi ích mà kết quả từ việc sử dụng nó. Đó là lý do tại sao nên sử dụng nó.
Cuối cùng, áp dụng nguyên tắc này một cách chính xác sẽ dẫn đến việc giữ code sạch sẽ, dễ bảo trì hơn và do đó dễ hiểu hơn.

Nguồn: https://www.netguru.co/codestories/solid-principles-1-single-responsibility-principle

cùng đợi các bài viết tiếp theo của mình trong series này nhé