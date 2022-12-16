Chúng ta đều biết rằng kiểm thử hộp đen liên quan đến việc xác nhận hệ thống mà không cần biết đến thiết kế bên trong của nó. Chúng tôi cũng đã thảo luận về những cạm bẫy của Kỹ thuật Phân vùng Tương đương . Trong bài viết này, chúng tôi sẽ thảo luận về một kỹ thuật kiểm tra hộp đen khác được gọi là "Phân tích giá trị biên"  (PTGTB)

- Phân tích giá trị biên (PTGTB) là gì?
- Làm thế nào để thực hiện việc (PTGTB) ?
- Phân tích giá trị biên (PTGTB) với  kỹ thuật "phân vùng tương đương" (PVTD)
- Cạm bẫy của phân tích giá trị biên (PTGTB)

### 1. Phân tích giá trị biên là gì?

Cơ sở của Phân tích giá trị biên (PTGTB) là kiểm tra các ranh giới tại các phân vùng (Hãy tìm hiểu lại Kỹ thuật Phân vùng tương đương!). PTGTB  là một phần mở rộng của PVTD. Các giá trị tối thiểu và tối đa của một phân vùng chính  là các giá trị biên của kỹ thuật này. 

Chúng tôi đã thấy rằng có nhiều khả năng tìm thấy các defects ở ranh giới của một phân vùng (Ví dụ: Một dev sử dụng> 10 thay vì> = 10 cho một điều kiện). Phân vùng tương đương một mình là không đủ để bắt lỗi như vậy. Do đó, cần phải xác định một kỹ thuật mới có thể phát hiện sự bất thường tại các ranh giới của phân vùng phát sinh.

Phân tích giá trị biên có thể thực hiện ở tất cả các cấp độ thử nghiệm và chủ yếu được sử dụng cho một loạt các số, ngày và thời gian.

### 2. Làm thế nào để làm phân tích giá trị biên?

Bây giờ chúng ta đã có một số ý tưởng về phân tích giá trị biên . Vậy Hãy bắt đầu hiểu cách làm thế nào để lấy ra các điều kiện thử nghiệm bằng kỹ thuật này. Chúng ta sẽ đề cập đến cùng một ví dụ về  form đăng nhập Tuổi của ứng dụng phòng tập gym.

![](https://images.viblo.asia/cd7a220a-0de5-4109-a7d5-f3413f0ae182.jpg)

Bước đầu tiên của  (PTGTB) là tạo Phân vùng Tương đương ví dụ như dưới đây.

![](https://images.viblo.asia/9c9c1a6a-0316-4ad1-9543-6b58ba7d5e63.png)

Bây giờ Tập trung vào Phân vùng hợp lệ, nằm trong khoảng từ 16-60. Chúng tôi có cách tiếp cận 3 bước để xác định ranh giới:

![](https://images.viblo.asia/bf8f1af9-fff4-4984-a0f6-d2dba2edbf21.png)



* Xác định giá trị biên (GTB) ở  vùng này là 16 và 60  (1)
* Lấy giá trị biên (GTB) nhỏ hơn GTB ở (1) là 15 và 59.
* Lấy giá trị biên (GTB) lớn hơn GTB ở (1)  là 17 và 61.

Nếu ta kết hợp lại sẽ nhận được các giá trị biên sau : 

* Hợp lệ:  Tuổi = 16, 17, 59, 60

* Không hợp lệ:  Tuổi = 15, 61

Đây là ví dụ đơn giản để thấy rằng các điều kiện biên hợp lệ nằm trong lớp phân vùng hợp lệ và các điều kiện biên không hợp lệ thuộc lớp phân vùng không hợp lệ.

Bạn có biết lý do tại sao chúng tôi không sử dụng 16.1, 15.9, 59.9 và 60.1 làm giá trị tăng và giảm biên ? Hãy để tôi lấy một ví dụ khác để giải thích điều này .
Giả sử rằng bạn đang nhập cân nặng của bạn trên một trang web. Dựa trên cân nặng và chiều cao của bạn, trang web sẽ cho bạn biết Chỉ số khối cơ thể (BMI). Bạn có thể nhập các giá trị từ 30 đến 150 kg trong trường nhập số cân nặng. Trường nhập cân nặng chỉ cho phép số tự nhiên, tức là số nguyên dương!

Trong trường hợp này, nếu bạn sẽ tạo các ranh giới bằng cách sử dụng cùng một phương thức - bạn sẽ kết thúc bằng

* Điều kiện biên hợp lệ: Tuổi = 30, 31, 149, 150

* Điều kiện biên không hợp lệ: Tuổi = 29, 151

Bây giờ hãy xem xét cùng một kịch bản, nhưng trường nhập trọng số cho phép số thập phân lên đến 1 chữ số thập phân. Trong trường hợp này, các điều kiện biên sẽ đến như sau:

* Điều kiện biên hợp lệ: Tuổi = 30, 30.1, 149.9, 150

* Điều kiện biên không hợp lệ: Tuổi = 29,9, 150,1

Bạn có thấy sự khác biệt?  Chúng tôi lấy giá trị tối thiểu chấp nhận được ở hai bên của biên . Đây là một điều kiện thử nghiệm riêng biệt và không nên trộn lẫn với giá trị biên.

### 3. Phân tích giá trị biên với phân vùng tương đương### 

Chúng ta đã có một sự hiểu biết về Phân tích Giá trị Biên.Bây h hãy kết hợp nó với phương pháp "Phân vùng tương đương " PVTD

Quay trở lại ví dụ đầu tiên , hãy để Rà soát lại sơ đồ.

![](https://images.viblo.asia/d6f8690d-38dc-4542-95ea-4b9c95763ff8.png)

Phạm vi là từ 16 - 60 và phân tích Giá trị Ranh giới cung cấp cho ta các điều kiện kiểm tra như 15, 16, 17, 59, 60, 61. Nếu bạn có cái nhìn cận cảnh, bạn không nghĩ rằng ta đã bao phủ phân vùng Tương đương hợp lệ bằng cách bao phủ lên 17, 59 và phân vùng tương đương không hợp lệ bằng cách bao gồm 15 và 61? Sau khi tất cả phân vùng Tương đương nói rằng chúng ta nên chọn một số trong khoảng 16-60 cho phân vùng hợp lệ và dưới 16 hoặc hơn 60 cho phân vùng không hợp lệ. Vì vậy, nếu giá trị biên đã bao trùm phân vùng Tương đương, tại sao chúng ta cần phân vùng như một kỹ thuật riêng biệt? Đây là một khái niệm không rõ ràng đối với hầu hết mọi người, và không có nhiều bài viết đã giải thích rõ ràng.

Về mặt lý thuyết, giá trị Ranh giới thực sự đã bao trùm phân vùng Tương đương, nhưng chúng ta vẫn cần một phân vùng. Nếu ta chỉ áp dụng giá trị Biên và không thành công, chúng ta sẽ không bao giờ biết liệu điều kiện Biên bị lỗi hay toàn bộ phân vùng bị lỗi. 

Để hiểu rõ hơn, ta sẽ nghiên cứu thêm 1 ví dụ. Tiếp tục với ứng dụng gym của chúng tôi, hãy giả sử nhà phát triển đã viết dưới đây logic:

* Nếu (tuổi <= 17) thì Không phát thẻ  thành viên gym 

* Nếu (tuổi > 60 ) thì Không phát thẻ  thành viên gym 

Nếu bạn nhìn vào logic, bạn sẽ nhận ra rằng logic đó phải là If (tuổi <17), nhưng nhà phát triển đã thêm = ký sai. Bạn cũng nhận ra rằng logic cho toàn bộ phân vùng hợp lệ bị thiếu? Nếu (tuổi> = 16 và tuổi <= 60) Sau đó cho phép thành viên phòng tập thể dục!

Nếu chúng ta chỉ sử dụng giá trị điều kiện biên 17, dẫn đến fail kết quả test . Tuy nhiên, nó sẽ không cho bạn biết liệu điều kiện biên failed  hay toàn bộ phân vùng failed. Do đó, nó rất cần thiết để sử dụng giá trị phân vùng Tương đương, không phải là giá trị biên. Trong trường hợp này, nếu chúng ta sử dụng giá trị 20, nó sẽ không thực hiện được. Nó sẽ đưa ra một dấu hiệu rõ ràng rằng nhà phát triển đã bỏ lỡ việc thực hiện toàn bộ phân vùng.

Vì vậy, nếu chúng tôi kết hợp cả Phân vùng giá trị biên và Phân vùng tương đương, các điều kiện thử nghiệm của chúng tôi sẽ là:

* Điều kiện biên hợp lệ: Tuổi = 16, 17, 59, 60

* Điều kiện biên không hợp lệ: Tuổi = 15, 61

* Phân vùng tương đương hợp lệ: Tuổi = 25

* Phân vùng tương đương không hợp lệ: Tuổi = 5, 65


### 4.  Cạm bẫy của PTGTB

Sau khi áp dụng cả giá trị biên và phân vùng Tương đương, chúng ta có thể tự tin nói rằng chúng ta đã cover yêu cầu không ? Thật không may, nó không đơn giản! Phân vùng giá trị biên và phân vùng tương đương giả định rằng ứng dụng sẽ không cho phép bạn nhập bất kỳ ký tự hoặc giá trị nào khác. Những ký tự như @ hoặc giá trị âm hoặc thậm chí cả bảng chữ cái sẽ không được phép nhập. Tuy nhiên, giả định này không hợp lệ đối với tất cả các ứng dụng và điều cần thiết là phải kiểm tra những điều này trước khi chúng ta có thể nói rằng giá trị trường hoàn toàn hoạt động.

Ngoài ra, chúng ta có thể có các tình huống trong đó giá trị đầu vào phụ thuộc vào quyết định của giá trị khác. Ví dụ: Nếu hình thức Phòng tập thể dục có một lĩnh vực Nam và Nữ khác, và giới hạn độ tuổi sẽ thay đổi tùy theo lựa chọn đó. Chỉ riêng giá trị biên không thể xử lý các biến thể như vậy và điều này dẫn chúng ta đến một kỹ thuật hộp đen khác gọi là Thử nghiệm Bảng quyết định. Chúng tôi sẽ thảo luận chi tiết trong bài viết tiếp theo của chúng tôi. Hãy chờ nhé !


Refer: 
https://www.toolsqa.com/software-testing/istqb/boundary-value-analysis/