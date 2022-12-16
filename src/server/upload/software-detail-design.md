Xin chào các bạn, bài viết hôm nay mình sẽ viết về quy trình Detail design, và về Software design document trong phát triển phần mềm Công nghệ Thông tin. Bài viết là những kiến thức mình đã được học ở trường, cũng gồm những cái mình đã học hỏi được từ những anh chị đi trước đã từng làm detail design. Trong bài viết có những gì chưa đúng, cần bổ sung thì các bạn comment cho mình với nhé :).

Tài liệu mình có lấy từ cuốn *ISO/IEC FDIS 12207, Systems and software engineering — Software life cycle processes*, các bạn có thể download cuốn sách này về để đọc được nhiều hơn.

## Software Implementation Process 

Trong quá trình đi học, đi làm, chắc hẳn các bạn cũng nghe tới khái niệm Quy trình phát triển phần mềm, theo tài liệu: 

```
Purpose: "to produce a specified system element implemented as a software product or service"
```

nó gồm 6 quy trình nhỏ hơn như sau:
1. Software Requirements Analysis Process
2. Software Architecture Design Process
3. Software Detailed Design Process
4. Software Construction Process
5. Software Integration Process
6. Software Qualification Testing Process

Hồi đầu mới học CNTT mình cứ nghĩ cứ coding, tạo ra sản phẩm là xong quy trình phát triển một phần mềm, nhưng sau đó mình mới biết để tới được nó cần nhiều quy trình hơn, coding chỉ là 1 giao đoạn trong các quy trình đó.

## Software Detailed Design Process
Theo tài liệu, quy trình Detail design phần mềm có mục đích: 
```
Purpose: “to provide a design for the software that implements and can be verified against the requirements and the software architecture and is sufficiently detailed to permit coding and testing [1]
```

Kết quả của quy trình implement Software Detailed Design thành công là:
* một thiết kế chi tiết cho mỗi thành phần phần mềm, mỗi component đã được tinh chỉnh để process bên dưới có thể coded, compiled và tested.
* các external interfaces của mỗi đơn vị phần mềm được xác định
* tính nhất quán và nguồn gốc được thiết lập giữa detail design và các requiment và architectural design.

Nôm na thì kết quả của quy trình này tạo ra một cái gì đó đủ chi tiết cho các lập trình viên có thể lập trình tốt được theo detail design đó. 

## Software design document
Software design document (SDD) là tài liệu thiết kế phần mềm của dự án, được sử dụng cho programmers, testers, maintainers, systems integrators, vv. 
Nó bao gồm việc thiết kế chi tiết cho kiển trúc, thiết kế giao diện và thiết kế lớp cho từng chức năng của hệ thống, cũng như việc thiết kế cơ sở dữ liệu của cả hệ thống để từ đó người đọc sẽ có cái nhìn rõ ràng hơn về phần mềm cần xây dựng và nó sẽ là tài liệu chính thức để từ đó những người xây dựng phần mềm có thể xây dựng nên phần mềm dựa vào tài liệu này.

Bây giờ mình sẽ đi vào phần ví dụ. Mình ví dụ viết tài liệu SDD cho phần mềm Đặt phòng họp, hội thảo. (về user case thì mình chỉ design cho 1 user case demo thôi).

### 1. Thiết kế kiến trúc:
Hệ thống xây dựng theo kiến trúc mô hình MVC

**Phân tích user case [Đặt phòng]**
* Biểu đồ trình tự (biểu đồ này là chỉ ra trình tự các thông điệp (message) được gửi giữa các đối tượng. ):
![](https://images.viblo.asia/869ec3de-e8d2-47aa-a401-070e4f3cae49.png)
* Biểu đồ phân tích lớp:
![](https://images.viblo.asia/749d8254-d078-43f3-8510-85154d170cc2.png)
### 2. Thiết kế giao diện:
* Giao diện với thiết bị phần cứng: 
Không
* Giao diện với phần mềm khác: 
Không
* Giao diện người dùng:
Biểu đồ dịch chuyển màn hình:
![](https://images.viblo.asia/da05cd30-40eb-4a1c-afa1-38093d4a84ca.png)
### 3. Thiết kế Class:
![](https://images.viblo.asia/753d120e-9128-4c88-9c27-8463720a7400.png)
### 4. Thiết kế mô hình dữ liệu:
Biểu đồ liên kết giữa các bảng:
![](https://images.viblo.asia/f944cd2c-47fb-44ee-8451-ea7c072c489f.png)

Mình đã đi qua những khái niệm, những kiến thức mình biết về detail design và SDD, tài liệu SDD vẫn còn nhiều mục nữa và chi tiết hơn nữa nhưng mình chỉ demo một số design như bên trên thôi. 
Mình đính kèm 1 demo về tài liệu SDD mình làm hồi đại học (phiên bản draft thôi ^^): [SDD](https://drive.google.com/file/d/1FHQtZw0FkYgXyJxM00xxobBACSa-WFGb/view?usp=sharing)

Cảm ơn các bạn đã theo dõi bài viết <3