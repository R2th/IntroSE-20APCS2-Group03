Như phần 1 mình đã tìm hiểu qua về kiểm thử hộp trắng các khái niệm cũng như sự khác nhau giữa kiểm thử hộp trắng và kiểm thử hộp đen...Phần này mình sẽ đi chi tiết vào các kỹ thuật Test coverage trong kiểm thử hộp trắng 

・Bao phủ câu lệnh (statement coverage) (C0)

・Bao phủ nhánh (branch coverage) (C1)

・Bao phủ path/ đường dẫn (path coverage)

## 1. Các khái niệm trong Test coverage
![](https://images.viblo.asia/d3cc9c21-a0ed-4dad-a2af-9c92c59085b9.png)

**Bao phủ câu lệnh (statement coverage) (C0)**

Bao phủ câu lệnh đó là việc chúng ta thiết kế testcase sao cho bộ testcase bao phủ test toàn bộ các xử lý ( câu lệnh) được gọi là C0. Hay nói cách khác tạo ra test case bằng các điều kiện sao cho tất cả các xử lý đều được thực hiện trên 1 lần.

**Bao phủ nhánh (branch coverage) (C1)**
Bao phủ nhánh đó là việc chúng ta thiết kế Các testcases sao cho các testcases đó phải đi qua cá đường dẫn T / F bắt đầu tại các điểm quyết định(điểm quyết định ở đây là điểm sảy ra 2 nhánh T/F)

**Bao phủ path/ đường dẫn (path coverage)**
Bao phủ đường dẫn đó là việc chúng ta thiết kế các testcase sao cho nó bao quát tất cả các đường dẫn.

## 2. Bài toán
Cho hàm tìm kiếm nhị phân viết bằng C. Input array v đã được sắp xếp theo giá trị tăng dần, n là kích thước mảng, ta cần tìm chỉ số mảng của phần tử x. Nếu không tìm thấy x trong mảng, trả về giá trị -1. 
```
1. int binSearch(int x, int v[], int n){
2. int low, high, mid;
low = 0;
high = n - 1;
3. while (low<=high){
4.   mid = (low + high)/2;
5.   if (x<v[mid])
6.   	high = mid - 1;
7.   else if (x > v[mid])
8.  		low = mid + 1;
9.   else
10.  	return mid;
11. }
12. return -1;
13. }
```

Đồ thị luồng điều khiển
![](https://images.viblo.asia/39b34f1d-6a1d-4582-a718-88b44df26276.png)

**Bao phủ path/ đường dẫn all path coverage**


path 1: 1-2-3T-4-5F-7F-9-10-13

path 2: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7F-9-10-13

path 3: 1-2-3T-4-5F-7T-8-11-3F-12-13

path 4: 1-2-3T-4-5T-6-11-3T-4-5F-7F-9-10-13

path 5: 1-2-3T-4-5T-6-11-3T-4-5F-7T-8-11-3F-12-13

path 6: 1-2-3T-4-5T-6-11-3F-12-13

path 7: 1-2-3F-12-13

path 8: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7T-8-11-3F-12-13

**Bao phủ câu lệnh (statement coverage) (C0)**

path 5: 1-2-3T-4-5T-6-11-3T-4-5F-7T-8-11-3F-12-13

**Bao phủ nhánh (branch coverage) (C1)**

path 1: 1-2-3T-4-5F-7F-9-10-13

path 2: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7F-9-10-13

path 3: 1-2-3T-4-5F-7T-8-11-3F-12-13

path 4: 1-2-3T-4-5T-6-11-3T-4-5F-7F-9-10-13

path 6: 1-2-3T-4-5T-6-11-3F-12-13

path 7: 1-2-3F-12-13

path 8: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7T-8-11-3F-12-13

## **3. Thiết kế các ca kiểm thử**

Để thực hiện test cho các ca kiểm thử trên chúng ta sẽ tìm đầu vào (các giá trị x,v{...},n) sao cho bao phủ từng câu lệnh.

 **Tập đầu vào ca kiểm thử để bao phủ hết câu lệnh**
 
VD:  Nhận thấy với đầu vào là ca kiểm thử : t1= (x=1, v={1,2,5,7,9},n=5)  

 Đường trên đồ thị luồng điều khiển tương ứng với đầu vào t1: path 4: 1-2-3T-4-5T-6-11-3T-4-5F-7F-9-10-13
 
=> Giá trị output trên chính là tập đầu vào ca kiểm thử nhỏ nhất để bao phủ hết câu lệnh

**Tập đầu vào ca kiểm thử nhỏ nhất để bao phủ hết ngã rẽ**

TCs 1: t= (x=5, v={1,2,5},n=3) path 2: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7F-9-10-13

TCs 2: t= (x=2, v={2,5,7},n=3) path 4: 1-2-3T-4-5T-6-11-3T-4-5F-7F-9-10-13

TCs 3: t2= (x=1, v={null},n=0) path 7: 1-2-3F-12-13 

Trong thực tế chúng ta sẽ test cho các yêu cầu cụ thể với bài toán ở trên là một dãy nhị phân cụ thể => chúng ta không cần thiết kế toàn bộ TCs bao phủ hết các ngã rẽ mà sẽ phụ thuộc vào yêu cầu để thiết kế bộ TCs cho phù hợp 

VD: Tập đầu vào ca kiểm thử nhỏ nhất để bao phủ hết đường với n = 4

path 8: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7T-8-11-3F-12-13=>  TCs t= (x=4, v={0,1,2,3},n=4)

path 4: 1-2-3T-4-5T-6-11-3T-4-5F-7F-9-10-13 => TCs t= (x=2, v={1,2,5,7},n=4)

path 2: 1-2-3T-4-5F-7T-8-11-3T-4-5F-7F-9-10-13 => TCs  t= (x=5, v={0,1,2,5},n=4)

## 4. Phương pháp thực hiện kiểm thử hộp trắng
###  4.1 Kiểm thử tĩnh(kiểm thử không cần chạy code):

Đây là quá trình chúng ta phân tích, review từng đoạn code, thử một vài bộ TCs vào và theo logic từng dòng lệnh để tính toán xem kết quả có đúng với mong đợi không. Quá trình này được diễn ra trước khi bản code được build lên  kiểm thử viên/ dev chỉ đọc hiểu code để xác định xem code đúng chưa chứ không cần chạy chương trình

Nhược điểm:
+ Không thể kiểm thử được hết các đường dẫn
+ Kết quả có độ chính xác không cao do con người tự tính toán nên có thể dẫn đến nhầm lẫn
+ Không thể đảm bảo rằng chương trình đã tuân theo đặc tả và cover hết các trường hợp
+ Chương trình sai do thiếu logic
+ Dễ bị miss các case đặc biệt nếu vòng lặp thuật toán phức tạp

Khắc phục những nhược điểm của kiểm thử tĩnh và để đảm bảo các hàm, function hoạt động đúng theo yêu cầu Unit test sẽ được tiến hành.

### 4.2  Kiểm thử động (kiểm thử bằng tool- cần chạy code )
 Kiểm thử hộp trắng sẽ thường được thực hiện bởi dev/ những người có hiểu biết về code. Dev thường sử dụng kiểm thử hộp trắng trong quá trình viết Unit test. Đây là quá trình chạy code để kiểm tra output có đúng với từng bộ TCs đã thiết kế hay không. Và Unit test thường được thực hiện bằng các tool phụ trợ như Junit (Java framework), PHPUnit (PHP framework), NUnit (.Net framework) etc... đây là những tool phổ biến được dùng cho các loại ngôn ngữ khác nhau. 
![](https://images.viblo.asia/75cde32c-187c-4ecf-8ff1-4ff199749fff.png)

***Tài liệu tham khảo:***

Daniel Galin. Sofware Quality Assurance – From Theory to Implemtation. Addion Wesley, 2004.