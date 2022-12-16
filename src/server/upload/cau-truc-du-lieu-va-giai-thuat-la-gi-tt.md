***Phần trước:***
* [Giải thuật (thuật toán)  ](https://viblo.asia/p/cau-truc-du-lieu-va-giai-thuat-la-gi-Az45bD8qZxY)
# Cấu trúc dữ liệu
* Vector
* List
* Stack
* Queue
* Tree
* HashTable
* Dictionary
* …

**Cấu trúc dữ liệu (Data Structure) là gì ?**
> Cấu trúc dữ liệu là cách lưu trữ, tổ chức dữ liệu có thứ tự, có hệ thống để dữ liệu có thể được sử dụng một cách hiệu quả.
## 1. Cấu trúc tuyến tính
> **Cấu trúc tuyến tính** là một cấu trúc trong đó các phần tử nằm trên một đường không có nhánh, và các phần tử liên tiếp nhau
*  **Một số ví dụ**: 
    *  Danh sách (lists)
    *  Vector, chuỗi (vectors,  sequences)
    *  Danh sách kiểu ngăn xếp, danh sách kiểu hàng đợi (stack, queue)

![](https://images.viblo.asia/c1027962-73ba-48b1-ba3e-ae918eb63db9.png)
### a. Kiểu dữ liệu trừu tượng vector
> Kiểu dữ liệu trừu tượng **Vector** là sự mở rộng của khái niệm mảng. **Vector** là một mảng lưu trữ một dãy các đối tượng với số lượng tùy ý  
> 
![](https://images.viblo.asia/99157314-c05a-489c-afd4-5ff4cdae3d71.png)
* Một phần tử có thể được truy cập, chèn thêm hoặc loại bỏ đi khi biết chỉ số của nó.
* Khi thực hiện các thao tác trên có thể xảy ra lỗi nếu chỉ số của phần tử không chính xác (Vd, chỉ số âm)

#### Các thao tác trên vector
* int **getAtRank**(int r, object &o): Trả lại phần tử có chỉ số r, nhưng không loại bỏ nó 
* int **replaceAtRank**(int r, object o, object & o1): Thay thế phần tử có chỉ số r bằng phần tử o và trả lại phần tử bị thay thế
* int **insertAtRank**(int r, object o): Chèn phần tử o vào vị trí r 
* int **removeAtRank**(int r, object &o): loại bỏ phần tử tại vị trí r, và trả lại phần tử bị loại bỏ
* int **size**() cho biết kích thước của Vector	
* int  **isEmpty**() cho biết Vector có rỗng hay không?

#### Cài đặt vector bằng mảng
* Sử dụng mảng **V** có kích thước **N**
* Một biến n lưu trữ kích thước của vector (số phần tử được lưu trữ)
* Phép toán **getAtRank**(r,o) được thực hiện trong thời gian **O**(1) bằng việc trả lại **V**[r]

![](https://images.viblo.asia/52a45dd6-000f-4a48-a856-0222f3df5a54.png)

#### Các ứng dụng của vector
* **Ứng dụng trực tiếp**
    * Lưu trữ tập hợp các đối tượng (cơ sở dữ liệu đơn giản)

* **Ứng dụng gián tiếp**
    * Cấu trúc dữ liệu bổ trợ cho các thuật toán
    * Thành phần của các cấu trúc dữ liệu khác

### b. Danh sách liên kết
* Mô hình cấu trúc dữ liệu trừu tượng Linked List là một dãy các vị trí lữu trữ các đối tượng với số lượng tùy ý.  
* Nó thiết lập một mối quan hệ trước/sau giữa các vị trí
    * **Danh sách liên kết đơn**
    * **Danh sách liên kết kép**
 
  ![](https://images.viblo.asia/8234673d-004f-4a74-b7a7-8de86c270eea.png)

#### Danh sách liên kết đơn
* Các nút (node) được cài đặt bao gồm:
    * Phần tử lưu trữ trong nó
    * Một liên kết đến nút kế tiếp

* Sử dụng môt con trỏ **header**, trỏ vào **node** đầu danh sách và con trỏ **trailer** trỏ vào **node** cuối danh sách.

![](https://images.viblo.asia/0109dca5-34a4-4932-8b14-728606db7481.png)

![](https://images.viblo.asia/8eea7a96-b92b-4b18-b0cf-792be775026e.png)

#### Danh sách liên kết kép
* Các nút (node) được cài đặt bao gồm:
    * Phần tử lưu trữ trong nó
    * Một liên kết đến nút trước nó
    * Một liên kết đến nút kế tiếp

* Có hai nút đặc biệt là **trailer** và **header**

![](https://images.viblo.asia/474669cc-b442-42cd-8e0c-c7e993e4c3e6.png)

![](https://images.viblo.asia/913c7ca9-659c-47fb-a537-971a43929477.png)

### c. Stack
> **Stack** là cách tổ chức lưu trữ các đối tượng dưới dạng một danh sách tuyến tính mà việc bổ sung đối tượng và lấy các đối tượng ra được thực hiện ở cùng một đầu của danh sách.  
> **Stack** được gọi là danh sách kiểu LIFO (Last In First Out - vào sau ra trước)  

* **Các phép toán chính**:
    * **push**(Object o): bổ sung đối tượng o vào Stack
    * **pop**(): lấy ra và trả lại phần tử được bổ sung vào cuối cùng của Stack
#### Một số ứng dụng của Stack
* **Các ứng dụng trực tiếp**
    * Lưu lại các trang Web đã thăm trong một trình duyệt
    * Thứ tự Undo trong một trình soạn thảo
    * Lưu chữ các biến khi một hàm gọi tới hàm khác, và hàm được gọi lại gọi tới hàm khác, và cứ tiếp tục như vậy

* **Các ứng dụng gián tiếp**
    * Cấu trúc dữ liệu bổ trợ cho một số thuật toán 
    * Là một thành phần của những cấu trúc dữ liệu khác
### d. Cấu trúc dữ liệu hàng đợi - Queque
> **Queue** là cách tổ chức lưu trữ các đối tượng dưới dạng một danh sách tuyến tính mà việc bổ sung đối tượng được thực hiện ở đầu danh sách và việc lấy đối tượng ra được thực hiện ở cuối của danh sách.  
> **Queue** còn được gọi là danh sách kiểu FIFO (First In First Out - vào trước ra trước)

* Các phép toán chính thực hiện trên queue:
    * **enqueue**(Object o): bổ sung một phần tử o vào cuối của queue.
    * **dequeue**(Object &o): Xóa đi phần tử đầu của queue
#### Một số ứng dụng của Queque
* **Các ứng dụng trực tiếp**
    * Danh sách hàng đợi
    * Truy nhập các nguồn dùng chung (ví dụ máy in trong mạng cục bộ)
    * Đa lập trình

* **Các ứng dụng không trực tiếp**
    * Cấu trúc dữ liệu hỗ trợ cho các thuật toán
    * Làm thành phần của các cấu trúc dữ liệu khác
## 2. Cấu trúc dữ liệu phi tuyến tính - Tree
> Có rất nhiều loại cây, và sự phân biệt giữa chúng là dựa vào bậc của từng cây. Trong thực tế cây có rất nhiều ứng dụng  

![](https://images.viblo.asia/011b9893-0f19-4a3d-a7cc-5fa0ebaf02c8.png)

![](https://images.viblo.asia/24b5b298-68b0-4996-bf1c-3aa9b364a52e.png)

![](https://images.viblo.asia/21ff5a59-386f-43a6-aa13-05644f9cb40f.png)  

###### Một số ứng dụng tiêu biểu:
1. Tổ chức file trong máy tính (được tổ chức theo cấu trúc phân cấp).
2. Ứng dụng cho các thuật toán tìm kiếm.
3. Ứng dụng trong các thuật toán tìm đường.
#### Ví dụ sử dụng cấu trúc dữ liệu dạng cây
##### Cây mô tả sự phân chia hệ thống files:
![](https://images.viblo.asia/c53a82ba-952c-45f7-970a-f6c82d006bbb.png)  
##### Cây nhị phân biểu diễn các biểu thức toán học
###### Một cây nhị phân biểu diễn một biểu thức. Cây này biểu diễn biểu thức ((((3+1)*3/((9-5)+2))-((3*(7-4))+6)). Giá trị được kết hợp lại tại nút trong có nhãn “/” là 2.  
![](https://images.viblo.asia/92f48b5e-4d2b-4e2c-8f9e-9d93c38f4aae.png)

Trên đây một số khái niệm và định nghĩa cơ bản của Cấu trúc dữ liệu  
Bài chia sẻ này mình đã tham khảo các tài liệu trên mạng và đúc kết được khi tham gia buổi talk của cô giáo  Vũ Thị Thanh Huyền Trưởng bộ môn CNTT Trường Cao đẳng thực hành FPT Polytechnic ĐN. Mong mọi nguời bỏ qua sai xót và góp ý cho mình cải thiện . :smiley:  mình xin dừng bài viết ở đây! Cảm ơn mọi người đã theo dõi.  :heart: