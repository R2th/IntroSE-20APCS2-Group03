Đối với một QA/Tester việc viết test case rất quan trọng, khi có một bộ test case tốt thì ta mới có thể test và cover được hết các trường hợp test. Vì vậy để tránh trường hợp bị thiếu case hoặc bị trùng case thì  ta phải áp dụng các kỹ thuật kiểm thử để phân tích và viết test case hiệu quả nhất. Dưới đây mình trình bày về các kỹ thuật trong kiểm thử hộp đen<br><br>
**Kiểm thử hộp đen** là một phương pháp kiểm thử phần mềm được thực hiện mà không cần biết cấu tạo bên trong của phần mềm, là cách mà tester kiểm tra, xem hệ thống như 1 chiếc hộp đen không thể nhìn thấy bên trong của chiếc hộp. QA không cần phải hiểu code.<br><br>
![](https://images.viblo.asia/0919e602-17cc-47bc-9e0e-858654b9fd5a.png)<br><br>
Các kỹ thuật sử dụng:<br>
* Phân vùng tương đương<br>
* Phân tích giá trị biên<br>
* Bảng quyết định<br>
* Chuyển trạng thái<br><br>



## **1. Phân vùng tương đương**<br>
### 1.1. Định nghĩa<br>
Kỹ thuật phân vùng tương đương ***là chia  đầu vào thành nhiều vùng giá trị khác nhau mà khi lấy ra một hoặc một vài giá trị trong cùng một vùng  thì có kết quả tương đương nhau***. Mỗi giá chỉ được thuộc vào một và chỉ một vùng tương đương.<br><br>
![](https://images.viblo.asia/b50ec371-b3b7-4aae-83a4-37267cfc98b2.png)<br><br>
### 1.2. Ví dụ<br>
Tài khoản tiết kiệm trong ngân hàng có tỷ lệ lãi suất khác nhau phụ thuộc vào số dư của tài khoản. Nếu số dư tài khoản trong phạm vi từ 0$ đến 100$ có lãi suất là 3%, số dư tài khoản trên 100$ và đến 1000$ có lãi suất là 5% và số dư tài khoản trên 1000$ có lãi suất là 7%. Hãy chia các vùng tương đương cho trường hợp này?<br><br>

*Giải thích*: Ta sẽ chia đầu vào thành 2 vùng giá trị: Valid (vùng hợp lệ) và Invalid (vùng không hợp lệ)<br>
1. Vùng hợp lệ:<br>
* 0 <= X < 100 $  với lãi suất 3%
* 100 <= X < 1000 $ với lãi suất 5%
* 1000 <= X $ với lãi suất 7%<br>
2. Vùng không hợp lệ:<br>
* X < 0 (số âm)<br><br>

## **2. Phân tích giá trị biên**<br>
### 2.1. Định nghĩa<br>
Kỹ thuật phân tích giá trị biên ***là trường hợp đặc biệt của phân vùng tương đương, nó bổ sung thêm cho phân vùng tương đương các trường hợp tại các giá trị biên mà phân vùng tương đương có thể bị xót***. Nhưng ta chỉ sử dụng kỹ thuật phân tích giá trị biên khi vùng xét bao gồm các số hoặc dữ liệu tuần tự. Giá trị nhỏ nhất (min) và giá trị lớn nhất (max) trong các vùng chính là giá trị biên.<br><br>
![](https://images.viblo.asia/a96634c1-5cc6-4a31-94b4-7069731dd03a.png)<br><br>
### 2.2.Ví dụ<br>
Cho 1 ô test box nhập vào giá trị nguyên từ 1 đến 100<br><br>
*Giải thích*: <br> 
Áp dụng phân tích giá trị biên vào cho bài toán sẽ có 2 cách lấy giá trí biên là 2 biên  và 3 biên.
* Trường hợp 2 biên (nghĩa là tại mỗi giá trị biên sẽ lấy 2 giá trị) và sẽ có các biên:<br>
    + Tại min: min -1, min<br>
  + Tại max: max, max + 1<br>
 
   Vậy áp dụng cho bài toán ta có các giá trị biên như sau: 0;1;100;101<br>
* Trường hợp 3 biên (nghĩa là tại mỗi giá trị ta sẽ lấy 3 giá trị) ta sẽ có các biên:<br>
  + Tại min: min -1, min , min + 1<br>
  + Tại max: max - 1, max, max + 1<br>
  
Vậy áp dụng cho bài toán ta có các giá trị biên như sau: 0;1;2;99;100;101<br><br>
***Chú ý:*** Thường thì sẽ sử dụng kết hợp 2 kỹ thuật phân vùng tương đương và phân tích giá trị biên cùng với nhau để cho bài toán không bị thiếu case hoặc dư thừa case.
Với bài toán trên  áp dụng cả phân vùng tương đương và giá trị biên thì cần test các case:<br>

* Case hợp lệ: 1;50;100<br>
* Case không hợp lệ: 0;101<br>

## **3. Bảng quyết định**<br>
### 3.1.Định nghĩa<br>
Kỹ thuật bảng quyết định ***là một kỹ thuật tốt với các requirement có nhiều điều kiện đầu vào và các kết quả đầu ra tương ứng***. Kỹ thuật bảng quyết định là cách tốt nhất khi kết hợp các luật nghiệp vụ mà hệ thống phải thực hiện. Kỹ thuật bảng quyết định cũng giúp giảm thiểu test case chạy nhưng cũng đủ để bao phủ được các trường hợp test tránh dư thừa test case.<br><br>
### 3.2.Ví dụ<br>
Một cửa hàng áp dụng chương trình khuyến mại. Nếu có thẻ khách hàng thân thiết thì được giảm 15%, mua vào ngày sinh nhật thì được giảm 10% và nếu có phiếu giảm giá thì được giảm 20%. Không áp dụng đồng thời các chương trình. Nếu khách hàng có nhiều hơn 1 trong các chương trình trên thì chỉ áp dụng giảm giá cho chương trình được giảm nhiều nhất<br><br>
*Giải thích*:<br>
**Bước 1:** Đầu tiên sẽ xác định xem bài toán có mấy giá trị đầu vào và xác định số cột của bảng quyết định bằng công thức:<br>
Số cột = số kết quả của mỗi điều kiện nhân với nhau <br>
Trong trường hợp này, có 3 điều kiện đầu vào và mỗi điều kiện có 2 kết quả (T và F) suy ra có 2.2.2 = 8 cột<br>
Trong đó: **T**: có; **F**: không<br><br>
![](https://images.viblo.asia/368a709c-af1f-4c15-b745-85b3dc86b659.png)<br><br>
**Bước 2:** Lược bớt test case nếu có chung hành động  và chỉ khác nhau ở 1 giá trị của điều kiện. Giá trị khác nhau đó sẽ được thay thế bằng dấu "_"<br>
* Từ đó: Case 1 và case 3 ta có thể lược bớt đi do có cùng hành động là 20% và 1 giá trị  của "sinh nhật (10%)" là khác nhau <br><br>
![](https://images.viblo.asia/db5fdab5-b286-40d4-b8f6-4211108e90a4.png)<br>
* Tương tự ta có thể lược bớt được case 2 và case 4<br>
![](https://images.viblo.asia/1af7f732-c95d-4ebb-bab2-9c014f722d0c.png)<br>
* Tương tự ta có thể lượt bớt được case 5 và case 7<br><br>
![](https://images.viblo.asia/a3650d7e-6508-49b2-8ade-4934cd843761.png)<br>
* Tương tự ta có thể rút gọn case 1 với case 5<br>
![](https://images.viblo.asia/c43bc043-d992-4467-8a26-a350dfcbf6da.png)<br>

Vậy từ 8 case ta rút gọn lại chỉ còn 4 case mà vẫn cover được hết các trường hợp test<br>
## **4. Chuyển trạng thái**<br>
### 4.1. Định nghĩa<br>
Kỹ thuật chuyển trạng thái ***được áp dụng trong các trường hợp khi mà kết quả đầu ra được kích hoạt bởi sự thay đổi của các điều kiện đầu vào hoặc thay đổi trạng thái của hệ thống***.
Kỹ thuật kiểm thử chuyển trạng thái rất hữu ích khi bạn cần kiểm thử các cách chuyển đổi khác nhau của hệ thống<br><br>
### 4.2.Ví dụ<br>
Nhập mã PIN ở cây ATM. Nếu nhập đúng mã PIN sẽ truy cập thành công vào hệ thống, nếu nhập sai quá 3 lần thì sẽ bị khóa.<br>
*Giải thích:*
Áp dụng kỹ thuật chuyển trạng thái vào ví dụ trên ta sẽ vẽ ra được sơ đồ sau. Các trạng thái được thể hiện ở dạng hình tròn. Các phiên chuyển đổi là các mũi tên. Các event là dòng text cạnh mũi tên:<br><br>
![](https://images.viblo.asia/da1e665a-40c7-4d63-8f7a-15a45fd1a23c.png)<br><br>
Từ sơ đồ chuyển trạng thái này ta có thể dễ dàng viết test case.<br>
Kỹ thuật này còn được sử dụng khi chuyển trạng thái từ màn hình này sang màn hình khác hay từ trang này sang trang khác<br><br>
Bài viết này mang tính chất chia sẻ kiến thức:grinning:. Rất mong sẽ giúp ích cho các bạn:heart_eyes:<br>
## Tài liệu tham khảo:<br>
https://www.istqb.org/downloads/syllabi/foundation-level-syllabus.html