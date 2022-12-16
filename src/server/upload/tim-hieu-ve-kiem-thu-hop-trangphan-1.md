## 1. Kiểm thử hộp trắng là gì?
Là hình thức kiểm thử mà kiểm thử viên biết được các cấu trúc bên trong của chương trình (mã nguồn, xử lý dữ liệu, …). Việc kiểm thử được dựa trên các phân tích về cấu trúc bên trong của thành phần/hệ thống.
  Kiểm tra mã nguồn các chi tiết thủ tục (thuật toán), các con đường logic (luồng điều khiển), các trạng thái của chương trình (dữ liệu)

**Đặc trưng:**

 + Kiểm thử hộp trắng dựa vào thuật giải cụ thể, vào cấu trúc dữ liệu bên trong của đơn vị phần mềm cần kiểm thử để xác định đơn vị phần mềm đó có thực hiện đúng không.
 + Người kiểm thử hộp trắng phải có kỹ năng, kiến thức nhất định để có thể hiểu chi tiết về đoạn code cần kiểm thử.
 + Thường tốn rất nhiều thời gian và công sức nếu mức độ kiểm thử được nâng lên ở cấp kiểm thử tích hợp hay kiểm thử hệ thống.
 + Do đó kỹ thuật này chủ yếu được dùng để kiểm thử đơn vị. Trong lập trình hướng đối tượng, kiểm thử đơn vị là kiểm thử từng tác vụ của 1 class chức năng nào đó.
 + Có 2 hoạt động kiểm thử hộp trắng: Kiểm thử luồng điều khiển và kiểm thử dòng dữ liệu.

## 2. Sự khác nhau giữa kiểm thử hộp trắng và kiểm thử hộp đen?
- Kiểm thử hộp đen (Black-box Testing): Là hình thức kiểm thử mà kiểm thử viên không cần biết đến cách thức hoạt động, mã nguồn, xử lý dữ liệu bên trong một thành phần/hệ thống. Công việc cần làm là nhập dữ liệu đầu vào (input) và kiểm tra kết quả trả về có đúng như mong muốn hay không.

- Kiểm thử hộp trắng (White-box Testing): Là hình thức kiểm thử mà kiểm thử viên biết được các cấu trúc bên trong của chương trình (mã nguồn, xử lý dữ liệu, …). Việc kiểm thử được dựa trên các phân tích về cấu trúc bên trong của thành phần/hệ thống.

## 3. Đồ thị luồng điều khiển?
### 3.1 Đồ thị luồng điều khiển gồm những yếu tố nào?

- Đồ thị luồng/dòng điều khiển là một đồ thị có hướng gồm các đỉnh tương ứng với các câu lệnh/nhóm câu lệnh và các cạnh là các dòng điều khiển giữa các câu lệnh/nhóm câu lệnh. Những yếu tố trong đồ thị luồng điều khiển:
 + Điểm bắt đầu của đơn vị chương trình
 + Khối xử lý chứa các câu lệnh được khai báo hoặc tính toán.
 + Điểm quyết định ứng với các câu lệnh điều kiện trong các khối lệnh rẽ nhánh hoặc lặp.
 + Điểm nối ứng với các câu lệnh ngay sau các lệnh rẽ nhánh.
 + Điểm kết thúc ứng với điểm kết thúc của đơn vị chương trình
 
 ![](https://images.viblo.asia/a17eeb39-3881-41ff-8f9c-8838c8cc166f.png)
 
###  3.2 Đồ thị luồng điều khiển dùng để làm gì?
Mục tiêu của phương pháp kiểm thử luồng điều khiển là đảm bảo mọi đường thi hành của đơn vị phần mềm cần kiểm thử đều chạy đúng. Rất tiếc trong thực tế, công sức và thời gian để đạt mục tiêu trên đây là rất lớn, ngay cả trên những đơn vị phần mềm nhỏ.
	
## 4.  Đồ thị luồng dữ liệu 
### 4.1 Đồ thị luồng dữ liệu gồm những yếu tố nào? 

Định nghĩa:Đồ thị luồng/dòng dữ liệu của một chương trình/đơn vị chương trình là một đồ thị có hướng G = <N; E>, với:
- N là tập các đỉnh tương ứng với các câu lệnh def hoặc c-use của các biến được sử dụng trong đơn vị chương trình. Đồ thị G có hai đỉnh đặc biệt là đỉnh bắt đầu (tương ứng với lệnh def của các biến tham số) và đỉnh kết thúc đơn vị chương trình.
- E là tập các cạnh tương ứng với các câu lệnh p-use của các biến.
Một số khái niệm:
Def: là câu lệnh gán giá trị cho một biến.
Undef: khai báo biên nhưng chưa cấp giá trị cho nó.
Use: là câu lệnh sử dụng một biến (tính toán hoặc kiểm tra các điều kiện).
C-use: là câu lệnh sử dụng biến để tính toán giá trị của một biến khác .
P-use: là câu lệnh sử dụng biến trong các biểu thức điều kiện (câu lệnh rẽ nhánh, lặp,...) .
### 4.2 Đồ thị luồng dữ liệu dùng để làm gì?
Lý do cần kiểm thử dòng dữ liệu:

* Cần chắc chắn biến được gán đúng giá trị, tức là chúng ta phải xác định được một đường đi của biến từ một điểm bắt đầu nơi nó được định nghĩa đến điểm mà biến đó được sử dụng. 
* Ngay cả khi gán đúng giá trị cho biến thì các giá trị được sinh ra chưa chắc đã chính xác do tính toán hoặc các biểu thức điều kiện sai (biến được sử dụng sai).

##  5. Ví dụ về kiểm thử hộp trắng
**Yêu cầu:** Hàm bên dưới trả về chỉ số phần tử cuối cùng trong x có giá trị bằng 0. Nếu không tồn tại, trả về giá trị -1

```
int lastZero(int[] x){
    for (int i = 0; i < x.length; i++){
        if (x[i] == 0) 
            return i;
    }
    return -1;
}

```
Cho đầu vào ca kiểm thử dưới đây:

t1= (x={5})

t2= (x={0})

t3= (x={5,-2,5,7,0})


**Đồ thị luồng điều khiển**

![](https://images.viblo.asia/8df65655-3bfd-4a27-8371-6dfff7fdad2a.png)
Đường trên đồ thị luồng điều khiển tương ứng với mỗi đầu vào trên

t1= (x={5})

 Đường trên đồ thị luồng điều khiển tương ứng với đầu vào t1: 1,2,3
 
t2= (x={0})
 
 Đường trên đồ thị luồng điều khiển tương ứng với đầu vào t2:  1,2,4,7
 
 t3= (x={5,-2,5,7,0})
 
 Đường trên đồ thị luồng điều khiển tương ứng với đầu vào t3:  1,2,4,5,6,4,5,6,4,5,6,4,5,6,7
 
 ***Tài liệu tham khảo:***
 
 Daniel Galin. Sofware Quality Assurance – From Theory to Implemtation. Addion Wesley, 2004.