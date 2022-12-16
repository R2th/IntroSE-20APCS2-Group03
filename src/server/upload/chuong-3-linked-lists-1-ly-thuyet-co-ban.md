### 3.1 What is a Linked List?
Linked List là một cấu trúc dữ liệu được sử dụng để lưu trữ các tập hợp dữ liệu.\
Một Linked List có các thuộc tính sau:

* Các phần tử kế tiếp được kết nối bằng con trỏ
* Phần tử cuối cùng trỏ đến NULL
* Có thể tăng hoặc giảm kích thước trong quá trình chương trình thực thi
* Có thể được thực hiện miễn là được yêu cầu (cho đến khi bộ nhớ hệ thống cạn kiệt)
* Không lãng phí bộ nhớ(nhưng tốn thêm cho con trỏ) - Ở đây ý tác giả là so sánh với 1 array, khi khai báo cần size trước để được cấp phát 1 vùng nhớ liên tục, khi lưu không hết sẽ gây lãng phí. Linked List chỉ cấp phát thêm bộ nhớ khi được yêu cầu.

![image.png](https://images.viblo.asia/e5988509-d688-470b-b309-c8feacc92288.png)

### 3.2 Linked Lists ADT
Nếu đã quên ADT là gì, các bạn có thể xem lại [ở đây](https://viblo.asia/p/chuong-1-introduction-1cac-khai-niem-co-ban-W13VM2n74Y7) \
Các operations sau làm linked list trở thành ADT:\
**Main Linked Lists Operations**(Các operation chính)

* Insert: Thêm phần tử vào list
* Delete: loại bỏ và trả về vị trí phần tử đã xác định khỏi danh sách



**Auxiliary Linked Lists Operations**(Các operation phụ trợ)

* Delete List: xóa tất cả các phần tử của danh sách (loại bỏ danh sách)
* Count: trả về số lượng phần tử trong danh sách
* Tìm nút thứ n từ cuối danh sách

### 3.3 Why Linked Lists?
Có rất nhiều cấu trúc dữ liệu khác làm điều tương tự như linked list.\
Trước khi thảo luận về linked list, điều quan trọng là **phải hiểu sự khác biệt giữa linked list và array**.\
Cả hai linked list và array được liên kết đều được sử dụng để lưu trữ tập hợp dữ liệu và vì cả hai đều được sử dụng cho cùng một mục đích nên chúng ta cần phân biệt cách sử dụng của chúng.\
Điều đó có nghĩa là trong trường hợp nào thì array là phù hợp và trường hợp nào thì linked list là phù hợp.

### 3.4 Arrays Overview
Một vùng bộ nhớ liên tục được cấp phát cho toàn bộ mảng để chứa các phần tử của mảng.\
Các phần tử mảng có thể được truy cập trong constant time bằng cách sử dụng chỉ số của phần tử cụ thể làm chỉ số con.

![image.png](https://images.viblo.asia/14b7deb8-2e3f-49c4-b719-bf9d61554c2c.png)

\
**Làm thế nào có thể access tới phần tử của mảng trong constant time?**\
Để truy cập một phần tử mảng, địa chỉ của một phần tử được tính như một offset(phần bù) từ địa chỉ cơ sở của mảng và cần một phép nhân để tính toán những gì được cho là thêm vào địa chỉ cơ sở để lấy địa chỉ bộ nhớ của phần tử.\
Đầu tiên **kích thước của một phần tử của kiểu dữ liệu** đó được tính toán và sau đó nó được **nhân với chỉ số của phần tử** đó để nhận giá trị được thêm vào địa chỉ cơ sở.\
Quá trình này thực hiện một phép nhân và một phép cộng.\
Vì hai hoạt động này mất constant time, chúng ta có thể nói việc truy cập mảng có thể được thực hiện trong constant time.

**Ưu điểm của Mảng**
* Đơn giản và dễ sử dụng
* Truy cập nhanh hơn vào các phần tử (constant time)

\
**Nhược điểm của Mảng**
* Cấp phát trước tất cả các bộ nhớ cần thiết và lãng phí không gian bộ nhớ cho các chỉ mục trong mảng trống.
* **Fixed size**: Kích thước của mảng là tĩnh (chỉ định kích thước mảng trước khi sử dụng).
* **One block allocation**: Để cấp phát mảng ngay từ đầu, đôi khi có thể không lấy được bộ nhớ cho mảng hoàn chỉnh (nếu kích thước mảng lớn).
* **Complex position-based insertion**(Chèn phần tử vào một ví trí bất kỳ phức tạp): Để chèn một phần tử tại một vị trí nhất định, chúng ta có thể cần phải dịch chuyển các phần tử hiện có.
Thao tác này sẽ tạo vị trí để chúng ta chèn phần tử mới vào vị trí mong muốn.
Nếu vị trí mà chúng ta muốn thêm một phần tử nằm ở đầu, thì thao tác dịch chuyển sẽ rất tốn kém.

\
**Dynamic Arrays**\
Dynamic array (còn được gọi là growable array, resizable array, dynamic table, or array list) là cấu trúc dữ liệu danh sách có kích thước có thể thay đổi, truy cập ngẫu nhiên, cho phép thêm hoặc bớt các phần tử.\
Một cách đơn giản để triển khai mảng động là ban đầu hãy bắt đầu với một số mảng có kích thước cố định.
Ngay sau khi mảng đó đầy, hãy tạo mảng mới gấp đôi kích thước của mảng ban đầu.\
Tương tự, hãy giảm kích thước mảng xuống một nửa nếu các phần tử trong mảng có kích thước nhỏ hơn một nửa.\
Note: Việc triển khai cho các mảng động sẽ nằm ở bài viết về các chương Stacks, Queues và Hashing.

\
\
**Ưu điểm của Linked Lists**
Ưu điểm của linked list là chúng có thể được mở rộng trong constant time.\
Để tạo một mảng, chúng ta phải cấp phát bộ nhớ cho một số phần tử nhất định. Để thêm nhiều phần tử vào mảng khi đầy, ta phải tạo một mảng mới và sao chép mảng cũ vào mảng mới.\
=> Điều này có thể mất rất nhiều thời gian. \
Chúng ta có thể ngăn chặn điều này bằng cách cấp phát nhiều không gian ban đầu nhưng sau đó chúng ta có thể cấp phát nhiều hơn mức chúng ta cần và lãng phí bộ nhớ.

Với một linked list, chúng ta có thể bắt đầu với không gian chỉ cho một phần tử được cấp phát và thêm vào các phần tử mới một cách dễ dàng mà không cần thực hiện bất kỳ thao tác sao chép và phân bổ lại nào.

**Nhược điểm của Linked Lists**\
Có một số vấn đề với linked list.\
Nhược điểm chính của danh sách liên kết là thời gian truy cập vào các phần tử.
Mảng là truy cập ngẫu nhiên, có nghĩa là cần constant time $O (1)$ để truy cập bất kỳ phần tử nào trong mảng.\
Linked list lấy $O (n)$ để truy cập vào một phần tử trong danh sách trong trường hợp xấu nhất.
Một ưu điểm khác của mảng trong thời gian truy cập là định vị không gian trong bộ nhớ.\
Mảng được định nghĩa là các khối bộ nhớ liền kề và vì vậy bất kỳ phần tử mảng nào cũng sẽ ở gần các phần tử lân cận của nó.
Điều này được hưởng lợi rất nhiều từ các phương pháp bộ nhớ đệm CPU hiện đại.\
Mặc dù việc cấp phát bộ nhớ phân tán là một lợi thế lớn, nhưng chi phí lưu trữ và truy xuất dữ liệu có thể tạo ra sự khác biệt lớn.\
Đôi khi linked list rất khó để thao tác.\
Nếu mục cuối cùng bị xóa, mục cuối cùng nhưng sau đó phải thay đổi con trỏ của nó để giữ một tham chiếu NULL.\
Điều này yêu cầu rằng danh sách được duyệt qua để tìm liên kết cuối cùng trừ một liên kết và con trỏ của nó được đặt thành tham chiếu NULL.\
Cuối cùng, liên kết liệt kê bộ nhớ lãng phí về các điểm tham chiếu bổ sung.

### 3.5 Comparison of Linked Lists with Arrays & Dynamic Arrays


| Parameter | Linked List | Array |Dynamic array |
| -------- | -------- | -------- | -------- |
| Indexing     | $O(n)$     | $O(1)$     | $O(1)$     |
| Insertion/Deletion at beginning     | $O(1)$     | $O(n)$, nếu array chưa full(Vì phải dịch chuyển các phần tử)    | $O(n)$     |
| Insertion at the ending     | $O(n)$     | $O(1)$, nếu array chưa full     | $O(1)$, nếu array chưa full \\    $O(n)$, nếu array  full   |
| Deletion at the ending     | $O(n)$     | $O(1)$     | $O(n)$     |
| Insertion in middle     | $O(n)$     | $O(n)$, nếu array chưa full(Vì phải dịch chuyển các phần tử)       | $O(n)$     |
| Deletion in middle     | $O(n)$     | $O(n)$, nếu array chưa full(Vì phải dịch chuyển các phần tử)       | $O(n)$     |
| Wasted space     | $O(n)$(Vì con trỏ)     | 0     | $O(n)$     |