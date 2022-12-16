## 1. Làm thế nào để chọn đó là kỹ thuật tốt nhất? 
![](https://images.viblo.asia/24d67896-8210-4eaf-b2ce-90e4f0988f24.jpeg)

Đây là câu hỏi sai!
Mỗi kỹ thuật tốt theo cách riêng của nó trong việc tìm ra loại lỗi nhất định và không tốt để tìm ra loại lỗi khác. 

Khi bạn là một tester mới, bạn sẽ rất bối rối khi tiếp cận với công việc, vô vàn câu hỏi được đặt ra như: Với chức năng năng này mình cần viết các testcase nào? Làm sao để testcase có độ bao phủ cao nhất? Mình sẽ sử dụng kỹ thuật test nào để đạt hiệu quả cao nhất?...

Mỗi kỹ thuật sẽ có những đặc thù riêng mà sẽ đạt được hiệu quả cao nhất cho từng chức năng nhất định. Vì vậy, làm thế nào để chọn kỹ thuật kiểm tra nào là tốt nhất, quyết định sẽ dựa trên một số yếu tố, cả bên trong và bên ngoài.

## 2. Làm thế nào để lựa chọn được kỹ thuật test phù hợp nhất?

![](https://images.viblo.asia/a46c02da-78c1-46df-87c3-0ba60b9afb14.png)

Trên thực tế đây cũng là một câu hỏi không có câu trả lời chính xác, trong mỗi trường hợp cụ thể thì từng kỹ thuật lại có thể phát huy hiệu quả nhất định, mỗi kỹ thuật có thể tốt cho việc tìm thấy những lỗi này, nhưng lại không tìm được những lỗi khác. Ví dụ:

Kỹ thuật dựa trên cấu trúc có thể tìm ra những khuyết điểm hoặc những thứ dư thừa trong code mà về nguyên tắc là không thể có mặt tại đó, chẳng hạn như các mã Trojan hoặc mã độc hại khác.
Tuy nhiên, nếu có các phần của spec bị thiếu trong code, chỉ có các kỹ thuật dựa trên đặc tả mới thấy được sự vắng mặt đó, các kỹ thuật dựa trên cấu trúc chỉ có thể kiểm tra những gì đang có ở đó mà thôi.
Ngoài ra còn những lỗi mà cả 2 loại kỹ thuật kiểm tra dựa trên cấu trúc và kiểm tra dựa trên đặc tả đều không phát hiện ra, thì cần tester sử dụng đến kỹ thuật kiểm tra dựa trên kinh nghiệm mới có thể tìm thấy chúng. Do đó, mỗi kỹ thuật riêng lẻ đều nhằm vào các loại lỗi cụ thể. Ví dụ, sử dụng bảng chuyển đổi trạng thái thì không thể tìm thấy các bug về validate.
Vì thế muốn tìm được nhiều lỗi nhất có thể thì cần kết hợp nhiều kỹ thuật đồng thời cho từng yêu cầu cụ thể. Vậy, cơ sở nào để lựa chọn ra những kỹ thuật kiểm tra phù hợp nhất? Quyết định sẽ được dựa trên một số yếu tố, cả các yếu tố trong và ngoài
### 2.1 Các yếu tố nội tại ảnh hưởng đến quyết định sử dụng một kỹ thuật

* **Các mô hình được sử dụng để phát triển hệ thống** 

Vì các kỹ thuật kiểm thử dựa trên các mô hình được sử dụng để phát triển hệ thống đó, ở một mức độ nào đó sẽ chi phối các kỹ thuật kiểm thử nào có thể được sử dụng. Ví dụ, nếu đặc điểm kỹ thuật chứa một sơ đồ chuyển đổi trạng thái, kiểm tra chuyển đổi trạng thái sẽ là một kỹ thuật tốt để sử dụng.

* **Kiến thức và kinh nghiệm của người kiểm thử**

Mức độ hiểu biết của người kiểm tra về hệ thống và về kỹ thuật kiểm thử sẽ ảnh hưởng rõ ràng đến sự lựa chọn của họ về kỹ thuật kiểm tra. Bản thân kiến ​​thức này sẽ bị ảnh hưởng bởi kinh nghiệm thử nghiệm của họ và hệ thống đang thử nghiệm.

* **Các loại lỗi tương tự**

Kiến thức về loại khuyết tật tương tự sẽ rất hữu ích trong việc lựa chọn các kỹ thuật kiểm tra (vì mỗi kỹ thuật đều có khả năng tìm ra một loại khuyết tật cụ thể). Kiến thức này có thể đạt được thông qua kinh nghiệm thử nghiệm phiên bản trước của hệ thống và các mức thử nghiệm trước đó trên phiên bản hiện tại.

* **Mục tiêu kiểm thử**

Nếu mục tiêu kiểm tra chỉ đơn giản là để đạt được niềm tin rằng phần mềm sẽ đáp ứng được các tác vụ hoạt động điển hình thì các ca sử dụng sẽ là một cách tiếp cận hợp lý. Nếu mục tiêu là để kiểm tra rất kỹ lưỡng thì nên chọn các kỹ thuật chi tiết và chặt chẽ hơn (bao gồm cả các kỹ thuật dựa trên cấu trúc).

* **Tài liệu**

Việc tài liệu (ví dụ: đặc tả yêu cầu) có tồn tại hay không và có cập nhật hay không sẽ ảnh hưởng đến việc lựa chọn kỹ thuật kiểm tra. Nội dung và phong cách của tài liệu cũng sẽ ảnh hưởng đến việc lựa chọn các kỹ thuật (ví dụ, nếu các bảng quyết định hoặc biểu đồ trạng thái đã được sử dụng thì các kỹ thuật kiểm tra liên quan sẽ được sử dụng).

* **Mô hìnhphát triển phần mềm được sử dụng**

Mô hình vòng đời tuần tự sẽ cho phép sử dụng các kỹ thuật chính thức hơn trong khi mô hình vòng đời lặp lại có thể phù hợp hơn với việc sử dụng phương pháp thử nghiệm khám phá.

### 2.2 Các yếu tố bên ngoài ảnh hưởng đến quyết định sử dụng kỹ thuật kiểm thử

* **Đánh giá rủi ro**

Rủi ro càng lớn (ví dụ các hệ thống quan trọng về an toàn) thì nhu cầu kiểm tra kỹ lưỡng hơn và chính thức hơn càng lớn. Rủi ro thương mại có thể bị ảnh hưởng bởi các vấn đề chất lượng (vì vậy việc kiểm tra kỹ lưỡng hơn sẽ là phù hợp) hoặc bởi các vấn đề về thời gian đưa ra thị trường (do đó, kiểm tra thăm dò sẽ là lựa chọn thích hợp hơn).

* **Yêu cầu của khách hàng và hợp đồng**

Đôi khi hợp đồng chỉ định các kỹ thuật kiểm tra cụ thể để sử dụng (thông thường nhất là tuyên bố hoặc phạm vi chi nhánh).

* **Loại hệ thống được sử dụng**

Loại hệ thống (ví dụ: nhúng, đồ họa, tài chính, v.v.) sẽ ảnh hưởng đến việc lựa chọn kỹ thuật. Ví dụ, một ứng dụng tài chính liên quan đến nhiều phép tính sẽ được hưởng lợi từ phân tích giá trị ranh giới.

* **Yêu cầu quy định**

Một số ngành công nghiệp có các tiêu chuẩn hoặc hướng dẫn quy định chi phối các kỹ thuật thử nghiệm được sử dụng. Ví dụ, ngành công nghiệp máy bay yêu cầu sử dụng phân vùng tương đương, phân tích giá trị biên và kiểm tra chuyển đổi trạng thái cho các hệ thống toàn vẹn cao cùng với tuyên bố, quyết định hoặc quyết định điều kiện sửa đổi tùy thuộc vào mức độ toàn vẹn của phần mềm được yêu cầu.

* **Thời gian và ngân sách của dự án**

Cuối cùng thì bao nhiêu thời gian có sẵn sẽ luôn ảnh hưởng đến việc lựa chọn các kỹ thuật kiểm thử. Khi có nhiều thời gian hơn, chúng ta có thể đủ khả năng để chọn nhiều kỹ thuật hơn và khi thời gian có hạn, chúng ta sẽ giới hạn ở những kỹ thuật mà giúp tìm ra những khiếm khuyết quan trọng nhất.

**Tham khảo:**

http://tryqa.com/how-to-choose-that-which-testing-technique-is-best/