**Lý thuyết chung về cơ sở dữ liệu**

**Tổng quan về cơ sở dữ liệu**

**Cơ sở dữ liệu là gì ?**

   Một cơ sở dữ liệu (CSDL) là một tập hợp các dữ liệu có liên quan với nhau, được lưu trữ trên máy tính, có nhiều người sử dụng và được tổ chức theo một mô hình. Hay nói cách khác, CSDL là một bộ các dữ liệu tác nghiệp được lưu trữ lại và được các hệ ứng
dụng của một đơn vị cụ thể nào đó sử dụng.

   Ví dụ, để quản lý việc học tập trong một môi trường đại học, các dữ liệu là các thông tin về sinh viên, về các môn học, điểm thi... Các dữ liệu đó được tổ chức thành các bảng và lưu giữ chúng vào sổ sách hoặc sử dụng một phần mềm máy tính để lưu giữ chúng trên
máy tính. Ta có một tập các dữ liệu có liên quan đến nhau và mang nhiều ý nghĩa, đó là một cơ sở dữ liệu.

**Mô hình cơ sở dữ liệu**

   Mô hình dữ liệu là một khuôn dạng của dữ liệu cho phép người dùng nhìn thấy dữ liệu dưới cấu trúc thuật ngữ để diễn tả mà ta gọi là lược đồ (scheme). Nó cho ta biết cấu trúc của cơ sở dữ liệu, bao gồm hai thành phần:
*    Hệ thống ký hiệu để mô tả dữ liệu.
*    Tập hợp các phép toán thao tác trên dữ liệu đó.

**Mô hình phân cấp (Hierarchical model)**

   Mô hình phân cấp được đưa ra vào những năm 60, trong mô hình này dữ liệu được tổ chức thành cấu trúc cây. Trong đó các nút (node) là tập các thực thể, các cành (edge) là các mối quan hệ giữa hai nút theo mối quan hệ nhẩt định, cứng nhắc. Hay nói cách khác:
*    Là mô hình dữ liệu trong đó các bản ghi được sắp xếp theo cấu trúc top-down (tree)
*    Một nút con chỉ có một nút cha -> chỉ có một đường truy nhập tới dữ liệu đó trước. Tập dữ liệu được tổ chức theo cấu trúc của mô hình dữ liệu phân cấp gọi là CSDL phân cấp. Ví dụ mô hình phân cấp trong quản lý nhân sự của một công ty.

![](https://images.viblo.asia/6806e09e-1913-4dbe-921e-84ec6a02502f.png)

Ưu điểm :
* Dễ xây dựng và thao tác.
* Tương thích với các lĩnh vực tổ chức phân cấp (ví dụ: tổ chức nhân sự trong các đơn vị, ...).
* Ngôn ngữ thao tác đơn giản (duyệt cây).

Nhược điểm :
* Sự lặp lại của các kiểu bản ghi gây ra dư thừa dữ liệu và dữ liệu không nhất quán.
* Giải pháp là xây dựng các bản ghi ảo.
* Hạn chế trong biểu diễn ngữ nghĩa của các móc nối giữa các bản ghi (chỉ cho phép quan hệ 1-n).

**Mô hình mạng (Network model)**

   Mô hình mạng được sử dụng phổ biến vào cuối những năm 60, và được định nghĩa lại vào năm 1971. Trong mô hình này dữ liệu được tổ chức thành một đồ thị có hướng, trong đó các đỉnh là các thực thể, các cung là quan hệ giữa hai đỉnh, một kiểu bản ghi có thể liên kết với nhiều kiểu bản ghi khác.

   Một con có thể có nhiều cha dẫn tới có thể có nhiều đường truy nhập đến một dữ liệu cho trước. Tập dữ liệu được tổ chức theo cấu trúc của mô hình dữ liệu mạng gọi là CSDL mạng. Ví dụ dữ liệu của một công ty có thể tổ chức theo mô hình mạng như sau.
   ![](https://images.viblo.asia/f5ca375e-fcec-45af-9e67-675465ed2fbd.png)

Ưu điểm :
* Đơn giản.
* Có thể biểu diễn các ngữ nghĩa đa dạng với kiểu bản ghi và kiểu móc nối
* Truy vấn thông qua phép duyệt đồ thị (navigation)

Nhược điểm :
* Số lượng các con trỏ lớn.
* Hạn chế trong biểu diễn ngữ nghĩa của các móc nối giữa các bản ghi.

**Mô hình dữ liệu quan hệ (Relational model)**

   Mô hình này đượcc E.F Codd đưa vào đầu những năm 70, mô hình này dựa trên lý thuyết tập hợp và đại số quan hệ. Vì tính chất chặt chẽ của toán học về lí thuyết tập hợp nên mô hình này đã mô tả dữ liệu một cách rõ ràng, mềm dẻo và là mô hình thông dụng nhất hiện nay. Hầu hết các DBMS đều tổ chức dữ liệu theo mô hình dữ liệu quan hệ.
Trong đó dữ liệu được tổ chức dưới dạng bảng, các phép toán thao tác trên dữ liệu dựa trên lý thuyết tập hợp của toán học. Tập dữ liệu được tổ chức theo cấu trúc của mô hình dữ liệu quan hệ thì được gọi là CSDL quan hệ. Ví dụ dưới đây mô tả dữ liệu được tổ chức theo kiểu quan hệ:
![](https://images.viblo.asia/c751ca21-23e5-4bcc-8794-b2ae05427549.png)

Ưu điểm :
* Dựa trên lý thuyết tập hợp
* Khả năng tối ưu hoá các xử lý phong phú

Nhược điểm :
* Hạn chế trong biểu diễn ngữ nghĩa
* Cấu trúc dữ liệu không linh hoạt

**Mô hình dữ liệu hướng đối tượng (Object Oriented model)**

   Là mô hình dữ liệu trong đó các thuộc tính dữ liệu và các phương thức thao tác trên các thuộc tính đó đều được đóng gói trong các cấu trúc gọi là đối tượng (object).
Tập dữ liệu được tổ chức theo cấu trúc của mô hình dữ liệu hướng đối tượng gọi là CSDL hướng đối tượng.
![](https://images.viblo.asia/00395d84-8607-4a17-8215-e646abb091fb.png)

Ưu điểm :
* Dễ dàng biểu diễn cái mà con người nhận thức từ thế giới thực.
* Biểu diễn ngữ nghĩa phong phú của các thực thể và quan hệ giữa các thực thể.

Nhược điểm :
* Không dễ dàng ánh xạ vào những cấu trúc lưu trữ trên máy tính

**Ưu điểm của cơ sở dữ liệu**

* Giảm sự trùng lặp thông tin xuống mức tối thiểu nhất. Do đó đảm bảo thông tin có tính nhất quán và toàn vẹn dữ liệu.
* Đảm bảo dữ liệu có thể được truy xuất theo nhiều cách khác nhau.
* Nhiều người có thể sử dụng chung một cơ sở dữ liệu.

**Nhược điểm của cơ sở dữ liệu**
* Tính chủ quyền của dữ liệu
* Tính bảo mật và quyền khai thác thông tin của người sử dụng
* Tranh chấp dữ liệu
* Cần đảm bảo an toàn dữ liệu khi có sự cố