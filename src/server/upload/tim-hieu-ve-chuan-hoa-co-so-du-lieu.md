Khi phát triển ứng dụng trên một cơ sở dữ liệu quan hệ, một trong những khía cạnh quan trọng nhất cần được tính đến là đảm bảo rằng sự nhân đôi dữ liệu được giảm thiểu.

Điều này thực hiện cho hai mục đích:
- *Giảm dung lượng lưu trữ cần thiết để lưu trữ dữ liệu.*
- *Tránh xung đột dữ liệu không cần thiết bởi vì một số bản ghi được sao chép của cùng một dữ liệu được lưu trữ.*

## Chuẩn hóa trong DBMS

Chuẩn hóa cơ sở dữ liệu là một kỹ thuật giúp thiết kế lược đồ của cơ sở dữ liệu một cách tối ưu để đảm bảo các điểm trên.
Ý tưởng cốt lõi của việc chuẩn hóa cơ sở dữ liệu là chia các bảng thành các phần con nhỏ hơn và lưu trữ các con trỏ vào dữ liệu thay vì sao chép nó.
Để hiểu rõ hơn về những gì chúng ta vừa nói, hãy cùng xem một ví dụ đơn giản:

Giả sử chúng ta phải lưu trữ thông tin của các khóa học và giáo viên hướng dẫn trong một trường đại học. Đây là cơ sở dữ liệu mẫu:

| Course code | Course venue      | Instructor Name | Instructor’s phone number |
| ----------- | ------------------| --------------- | ------------------------- |
| CS101       | Lecture Hall 20   | Prof. George    | +1 6514821924             |
| CS152       | Lecture Hall 21   | Prof. Atkins    | +1 6519272918             |
| CS154       | CS Auditorium     | Prof. George    | +1 6514821924             |

Ở đây, dữ liệu về cơ bản lưu trữ mã khóa học, địa điểm khóa học, tên người hướng dẫn và số điện thoại của người hướng dẫn. Lúc đầu, thiết kế này có vẻ là ổn. Tuy nhiên, các vấn đề bắt đầu nảy sinh khi chúng ta cần sửa đổi thông tin. Ví dụ, giả sử, Giáo sư George thay đổi số điện thoại di dộng của mình. Trong tình hướng này, chúng ta sẽ phải chỉnh sửa số điện thoại đối với CS101, nhưng quên chỉnh sửa số đó cho CS154? Điều này sẽ dẫn đến thông tin cũ/sai trong cơ sở dữ liệu.

Tuy nhiên, vấn đề này có thể dễ dàng giải quyết bằng cách chia bảng của chúng ta thành 2 bảng đơn giản hơn:

Bảng 1(Instructor)

- Instructor ID
- Instructor Name
- Instructor mobile number

Bảng 2 (Course):

- Course code
- Course venue
- Instructor ID

Bây giờ, hãy cùng xem dữ liệu của chúng ta ra sao nhé:

Table 1 (Instructor):

| Insturctor's ID | Instructor's name      | Instructor's number |
| --------------- | ---------------------- | ------------------- |
| 1               | Prof. George           | +1 6514821924       |
| 2               | Prof. Atkins           | +1 6519272918       |

Table 2 (Course):

| Course code | Course venue      | Instructor ID |
| ------------| ------------------| ------------- |
| CS101       | Lecture Hall 20   | 1             |
| CS152       | Lecture Hall 21   | 2             |
| CS154       | CS Auditorium     | 1             |

Về cơ bản, chúng ta lưu trữ các giảng viên một cách riêng biệt và trong bảng khóa học, chúng ta không lữu trữ toàn bộ dữ liệu của người hướng dẫn. Điều này cũng tiết kiệm dung lượng lưu trữ. Có thể điều này không được rõ ràng trong ví dụ trên. Tuy nhiên, hãy suy nghĩ về trường hợp khi có hàng trăm khóa học và người hướng dẫn; và mỗi người hướng dẫn, chúng ta phải lưu trữ không chỉ số điện thoại di động, mà còn rất nhiều các thông tin khác như địa chỉ văn phòng, địa chỉ email, chuyên môn, tính khả dụng,... Trong tình huống như vậy, việc sao chép quá nhiều dữ liệu sẽ làm tăng yêu cầu lưu trữ không cần thiết.

Mình vừa giới thiệu với các bạn về một ví dụ đơn giản về cách hoạt động của cơ sở dữ liệu. Bây giờ chúng ta sẽ nghiên cứu nó một cách chính thức hơn nhé!!!!!

**Các loại chuẩn hóa dữ liệu:**

Có nhiều dạng chuẩn hóa cơ sở dữ liệu khác nhau. Mỗi hình thức này có tầm quan trọng trong việc giúp tối ưu cơ sở dữ liệu để lưu trữ và giảm dư thừa dữ liệu.

## Dạng chuẩn hóa 1 (1NF)

Dạng chuẩn hóa 1 chỉ đơn giản nói rằng mỗi ô của một bảng phải chứa duy nhất một giá trị. Chúng ta hãy lấy một ví dụ. Giả sử chúng ta đang lưu trữ các khóa học mà một người hướng dẫn cụ thể thực hiện,
chúng ta có thể lưu trữ như sau:

| Instructor's name | Course code    |
| ----------------- | -------------- |
| Prof. George      | (CS101, CS154) |
| Prof. Atkins      | (CS152)        |

Vấn đề là ở hàng đầu tiên, chúng ta đang lưu trữ 2 khóa học của giáo sư George. Đây không phải là cách tối ưu từ khi cơ sở dữ liệu SQL được thiết kế để sử dụng. Một cách tốt hơn để lưu trữ các khóa học riêng biệt:

| Instructor's name | Course code    |
| ----------------- | -------------- |
| Prof. George      | CS101          |
| Prof. George      | CS154          |
| Prof. Atkins      | CS152          |

Bằng cách này, nếu chúng ta muốn chỉnh sửa một số thông tin liên quan đến CS101, chúng ta sẽ không phải động vào dữ liệu tương ứng với CS154. Ngoài ra, hãy quan sát rằng mỗi hàng lưu trữ chỉ 1 thông tin duy nhất. Không có sự lặp lại dữ liệu. Đây là dạng chuẩn hóa 1.

## Dạng chuẩn hóa 2 (2NF)

Đối với mỗi bảng ở dạng chuẩn 2, cần đáp ứng 2 điều kiện sau:

- *Bảng phải thỏa mãn chuẩn 1 (1NF).*
- *Khóa chính của bảng tương ứng với một cột trong bảng*.

Điều đầu tiên rõ ràng là đơn giản vì chúng ta vừa nghiên cứu 1NF ở trên. Chúng ta hãy tìm hiểu điểm đầu tiên - cột khóa chính. Vâng, khóa chính là tập hợp các cột xác định tính duy nhất cho một hàng. Về cơ bản, không có 2 hàng có cùng một khóa chính. Hãy cùng xem ví dụ:

| Course code | Course venue      | Instructor Name | Instructor’s phone number |
| ----------- | ------------------| --------------- | ------------------------- |
| CS101       | Lecture Hall 20   | Prof. George    | +1 6514821924             |
| CS152       | Lecture Hall 21   | Prof. Atkins    | +1 6519272918             |
| CS154       | CS Auditorium     | Prof. George    | +1 6514821924             |

Trong bảng này, mã khóa học là duy nhất. Vì vậy, nó trở thành khóa chính của chúng ta. Chúng ta hãy lấy một ví dụ khác về lưu trữ các khóa học của các học sinh. Mỗi sinh viên có thể nằm trong nhiều khóa học. Hãy cùng xem bảng dưới đây:

| Student name | Course code |
| ------------ | ----------- |
| Rahul        | CS152       |
| Rajat        | CS101       |
| Rahul        | CS154       |
| Raman        | CS101       |

Cột đầu tiên lưu tên học sinh và cột thứ 2 là khóa học mà sinh viên tham gia. Rõ ràng, cột tên sinh viên không phải là duy nhất vì chúng ta có thể thấy rằng có 2 hàng tương ứng với tên "Rahul" trong hàng 1 và hàng 3. Tương tự, cột mã khóa học không phải là duy nhất vì chúng ta có thể thấy rằng có 2 hàng tương ứng với mã khóa học CS101 là hàng 2 và hàng 4. Tuy nhiên, nếu cặp (tên sinh viên, mã khóa học) thì lại là duy nhất vì sinh viên không thể đăng ký học cùng một khóa học nhiều lần. Vì vậy, 2 cột này khi kết hợp lại thì tạo thành khóa chính cho cơ sở dữ liệu.

Theo định nghĩa của dạng chuẩn hóa 2, bảng đăng ký ở trên không ở dạng chuẩn 2. Để đạt được điều này, chúng ta có thể chia nó thành 2 bảng:

**Students**:

| Student name | Enrolment number |
| ------------ | ---------------- |
| Rahul        | 1                |
| Rajat        | 2                |
| Raman        | 3                |

Với bảng này, cột thứ 2 là duy nhất và cho biết chỉ số của khóa học mà học sinh tham gia. Rõ ràng, chỉ số  của khóa học là duy nhất. Bây giờ, chúng ta có thể đính kèm từng chỉ số  của khóa học với mã khóa học.

**Courses**:

| Course code  | Enrolment number |
| ------------ | ---------------- |
| CS101        | 2                |
| CS101        | 3                |
| CS152        | 1                |
| CS154        | 1                |

Sự kết hợp của hai bảng này cùng cung cấp cho chúng ta thông tin chính xác giống như bảng ban đầu.

## Dạng chuẩn hóa 3 (3NF)

Trước khi tìm hiểu dạng chuẩn hóa 3, hãy cùng tìm hiểu khái niệm về sự phụ thuộc chức năng trên một bảng nhé.

Cột A được cho là phụ thuộc vào chức năng trên cột B, nếu thay đổi giá trị của A có thể yêu cầu thay đổi giá trị của B. Hãy cùng xem ví dụ:

| Course code  | Course venue           | Instructor's name | Department              |
| ------------ | ---------------------- | ----------------- | ----------------------- |
| MA214        | Lecture Hall 18        | Prof. George      | CS Department           |
| ME112        | Auditorium building    | Prof. John        | Electronics Department  |

Trong bảng trên, cột bộ phận (Department) phụ thuộc vào cột tên giáo sư (Instructor's name). Điều này là do nếu trong một hàng cụ thể, chúng ta thay đổi tên của giáo sư (Instructor's name), chúng ta cũng sẽ phải thay đổi giá trị của bộ phần (Department). Ví dụ: giả sử MA214 hiện đang được thực hiện bởi Giáo sư Ronald, người đến từ khoa Toán học, bảng sẽ trông như thế này:

| Course code  | Course venue           | Instructor's name | Department              |
| ------------ | ---------------------- | ----------------- | ----------------------- |
| MA214        | Lecture Hall 18        | Prof. Ronald      | Mathematics Department  |
| ME112        | Auditorium building    | Prof. John        | Electronics Department  |

Ở đây, khi chúng a đổi tên giáo sư, chúng ta cũng phải thay đổi giá trị của cột Department. Điều này là không mong muốn nếu ai đó đang cập nhật cơ sở dữ liệu có thể nhớ thay thế tên của giáo sử, nhưng có thể quên cập nhật giá trị của Department. Điều này có thể gây ra mâu thuẫn trong cơ sở dữ liệu.

Dạng chuẩn hóa 3 sẽ giúp chúng ta tránh được điều này bằng cách chia nhỏ thành các bảng riêng biệt:

| Course code | Course venue         | Instructor's ID |
| ----------- | -------------------- | --------------- |
| MA214       | Lecture Hall 18      | 1               |
| ME112       | Auditorium building  | 2               |

Trong bảng trên, cột thứ 3 là cột ID của giáo sư đứng giảng các khóa học tương ứng.

| Instructor's ID | Instructor's Name  | Department             |
| --------------- | ------------------ | ---------------------- |
| 1               | Prof. Ronald       | Mathematics Department |
| 2               | Prof. John         | Electronics Department |

Ở đây, chúng ta lưu trữ các thông tin chi tiết của các giáo sư với ID tương ứng. Bằng cách này, bất cứ khi nào chúng ta muốn tìm các giáo sư đang dạy ở khóa nào, chúng ta sẽ không cần phải lấy ra các thông tin khác của giáo sư trên bảng một lần nữa. Chúng ta chỉ cần sử dụng Instructor's ID.

Vì vậy, với dạng chuẩn hóa 3 (3NF), các điều kiện sau cần được thỏa mãn:

- *Bảng dữ liệu phải thỏa mãn chuẩn 2.*
- *Không có bất kỳ sự phụ thuộc bắc cầu nào.*

## Dạng chuẩn hóa Boyce-Codd (BCNF)

Chuẩn hóa Boyce-Codd là tổng quát hóa hơn của chuẩn hóa 3. Bảng ở dạng chuẩn hòa Boyce-Codd nếu và chỉ khi có ít nhất một trong các điều kiện sau đây được đáp ứng cho mỗi phụ thuộc chức năng A -> B:

- *Thỏa mãn dạng chuẩn hóa 3.*
- *Và có một phụ thuộc hàm A -> B, A phải là một siêu khóa*: nói một cách đơn giản, nó có nghĩa là đối với một phụ thuộc hàm A -> B, A không thể là một thuộc tính không phải khóa, nếu B là một thuộc tính khóa.

Trước tiên, chúng ta hãy tìm hiểu như thế nào thì là một siêu khóa nhé. Xem xet bảng sau:

| Course code  | Course venue           | Instructor's name | Instructor’s phone number  |
| ------------ | ---------------------- | ----------------- | -------------------------- |
| CS101        | Lecture Hall 20        | Prof. George      | +1 6514821924              |
| CS152        | Lecture Hall 21        | Prof. Atkins      | +1 6519272918              |
| CS154        | CS Auditorium          | Prof. George      | +1 6514821924              |

Ở đây, cột đầu tiên (mã khóa học) là duy nhất trên các hàng khác nhau. Vì vậy, nó là một siêu khóa. Xem xét sự kết hợp của các cột (mã khóa học, tên giáo sư). Nõ cũng là duy nhất trên các hàng khác nhau. Thêm một lần nữa khẳng định đây là một siêu khóa. Siêu khóa về cơ bản là một tập hợp các cột sao cho giá trị của tập hợp các cột đó là duy nhất trên các hàng khác nhau. Tức là, không có 2 hàng nào có cùng một tập hợp các giá trị cho các cột đó.

Một số siêu khóa cho bảng trên là:

- Mã khóa học (Course code)
- Mã khóa học + tên giáo sư (Course code + Instructor Name)
- Mã khóa học + số điện thoại liên hệ của giao sư (Course code + Instructor’s phone number)

Một siêu khóa có kích thước (số cột) nhỏ nhất được gọi là khóa ứng viên. Ví dụ, siêu khóa đầu tiên ở trên chỉ 1 cột, cái thứ 2 và cái cuối cùng nằm trên 2 cột. Vì vậy, siêu khóa đầu tiên (Cource venue) là khóa ứng viên.

Chuẩn hóa Boyce-Codd nói rằng nếu có một sự phụ thuộc hàm A -> B, thì A là siêu khóa hoặc nó là một phụ thuộc hàm. Một phụ thuộc hàm có nghĩa là tất cả các cột của B được chứa trong các cột A. Ví dụ, (mã khóa học, tên giáo sư) -> (mã khóa học) là một phụ thuộc hàm bởi vì chúng ta biết giá trị của mã khóa học và tên giáo sư, chúng ta có thể suy luận ra được giá trị của mã khóa học.

Tài liệu tham khảo:

https://hackr.io/blog/dbms-normalization

https://www.studytonight.com/dbms/database-normalization.php