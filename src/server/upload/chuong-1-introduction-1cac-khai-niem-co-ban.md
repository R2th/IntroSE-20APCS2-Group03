## Lời nói đầu

Trước khi có máy tính, đã có các thuật toán. Nhưng bây giờ có máy tính, thậm chí còn có nhiều thuật toán hơn, và các thuật toán luôn là trái tim của mọi của máy tính.

Với các công nghệ máy tính hiện đại, chúng ta hoàn toàn có thể hoàn thành một số nhiệm vụ mà không cần biết nhiều về thuật toán, nhưng với nền tảng tốt về thuật toán, ta có thể làm được nhiều hơn thế.

Chương này chúng ta sẽ bắt đầu suy nghĩ về việc thiết kế và phân tích các thuật toán. Nó nhằm mục đích là một phần giới thiệu nhẹ nhàng về cách chỉ định các thuật toán, một số chiến lược thiết kế mà sẽ sử dụng trong suốt cuốn sách này và nhiều ý tưởng cơ bản được sử dụng trong phân tích thuật toán.

### 1.1 Data Structure
Data structure là **một cách cụ thể để lưu trữ và tổ chức dữ liệu** trong máy tính để nó có thể được sử dụng một cách hiệu quả. \
```sql
Một Data Structure là một định dạng đặc biệt để tổ chức và lưu trữ dữ liệu. 
```

Các kiểu data structure chung gồm arrays, files, linked lists, stacks, queues, trees, graphs, ...

Tùy thuộc vào tổ chức của các phần tử, cấu trúc dữ liệu được phân thành hai loại:
1. **Linear data structures**: Các phần tử được truy cập theo thứ tự tuần tự nhưng nó không bắt buộc phải lưu trữ tất cả các phần tử một cách tuần tự (say, Linked Lists). Examples: Linked Lists, Stacks and Queues.
2. **Non – linear data structures**: Các phần tử của cấu trúc dữ liệu này được lưu trữ / truy cập trong một
thứ tự phi tuyến tính. Examples: Trees and graphs.

### 1.2 Abstract Data Types (ADTs)
Trước khi định nghĩa abstract data types, chúng ta hãy xem xét cách nhìn nhận khác nhau của các data type từ góc nhìn của hệ thống.\
Chúng ta đều biết rằng, mặc định tất các primitive data types(kiểu dữ liệu nguyên thủy như int, float, ....) đều hỗ trợ các phép toán cơ bản như cộng và trừ.\
Hệ thống cung cấp các implementations cho các primitive data types.\
Đối với các data types do người dùng xác định, chúng ta cũng cần xác định các hoạt động(operations).\
Việc implementation cho các operations có thể được thực hiện khi chúng ta thực sự sử dụng tới chúng.\
Điều đó có nghĩa là, nói chung, user defined data types sẽ do người dùng xác định các operations cho chúng.\
Để đơn giản hóa quá trình giải quyết vấn đề, chúng tôi kết hợp các data structures với các operations của chúng và chúng tôi gọi đây là **Abstract Data Types**(ADT).

ADT bao gồm **hai phần**:
1. Declaration of data(Khai báo data)
2. Declaration of operations(Khai báo operations)

Các ADT phổ biến thường được sử dụng: Linked Lists, Stacks, Queues, Priority Queues, Binary Trees, Dictionaries, Disjoint Sets (Union and Find), Hash Tables, Graphs, ... 

Ví dụ, stack sử dụng cơ chế LIFO (Last-In-First-Out) trong khi lưu data trong data structures.\
Phần tử cuối cùng được chèn vào stack là phần tử đầu tiên bị xóa.

-----

Trong khi xác định ADT, đừng lo lắng về các chi tiết implementation.
Chúng chỉ xuất hiện khi ta muốn sử dụng chúng.\
Các loại ADT khác nhau phù hợp với các loại ứng dụng khác nhau và một số có tính chuyên môn hóa cao đối với các nhiệm vụ cụ thể.\
Vào series này, chúng ta sẽ xem qua nhiều trong số chúng và bạn sẽ có thể **liên hệ các cấu trúc dữ liệu với loại vấn đề mà chúng giải quyết**.

### 1.3 What is an Algorithm?
Chúng ta hãy xem xét vấn đề chuẩn bị một món trứng tráng. Để chuẩn bị món trứng tráng, chúng ta làm theo các bước dưới đây:
```markdown
1. Lấy chảo rán.
2. Lấy dầu.
      a. Còn dầu không?
           i. Nếu có, hãy cho dầu vào chảo
           ii. Nếu hết, ta có đi mua dầu không?
              1. Nếu có, ra ngoài và mua.
              2. Nếu không, ta kết thúc công việc.
```

Những gì ta đang làm là, đối với một vấn đề nhất định (ở đây là chuẩn bị một món trứng tráng), là cung cấp một quy trình từng bước để giải quyết nó. Giải thuật cũng tương tự như vậy:

```sql
Một algorithm(giải thuât) là các hướng dẫn rõ ràng từng bước để giải quyết một vấn đề nhất định.
```

Trong nghiên cứu truyền thống về thuật toán, có hai tiêu chí chính để đánh giá giá trị của các thuật toán:
* **correctness**(tính đúng đắn): thuật toán có đưa ra giải pháp cho vấn đề trong một số bước hữu hạn không?
* **efficiency**(tính hiệu quả): cần bao nhiêu tài nguyên (về bộ nhớ và thời gian) để thực hiện