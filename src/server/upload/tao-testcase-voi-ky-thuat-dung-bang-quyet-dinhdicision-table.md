**Kỹ thuật dùng bảng quyết định (decision table)**

## **1. Giới thiệu về kỹ thuật dùng bảng quyết định**

Kỹ thuật dùng bảng quyết định là một phương pháp của kiểm thử hộp đen. Bảng quyết định là một kỹ thuật tốt để áp dụng cho những trường hợp cần nhiều sự kết hợp. Miêu tả các qui tắc nghiệp vụ phức tạp mà phần mềm phải thực hiện dưới dạng dễ đọc và dễ kiểm soát 
Bảng quyết định hỗ trợ việc lựa chọn test case một cách có hệ thống và có thể đem lại nhiều lợi ích trong việc nhận biết vấn đề tiềm ẩn và sự không rõ ràng trong đặc tả (specification). Kỹ thuật này cách tốt nhất để đối ứng với sự kết hợp của các điều kiện đôi khi còn được gọi là bảng "Nguyên nhân - kết quả"

## **2. Khi nào thì nên áp dụng kỹ thuật dùng bảng quyết định**

+ Bảng quyết định có thể được sử dụng trong test design, vì chúng giúp tester tìm được những tác động khi kết hợp các yếu tốt đầu vào khác nhau và các trạng thái phần mềm mà phải thực hiện đúng các quy tắc nghiệp vụ khác
+ Trong các dự án có điều kiện đầu vào và đầu ra một cách rõ ràng, gắn kết với nhau
+ Đây là một kỹ thuật hoạt động tốt khi được kết hợp với phân vùng tương đương

## **3. Cách tạo bảng quyết định và ví dụ áp dụng kỹ thuật dùng bảng quyết định**

Ví dụ: Một cửa hàng sách áp dụng các chương trình khuyến mại cho khách hàng như sau
+ Nếu mua hàng vào ngày sinh nhật sẽ được giảm 20% trên hóa đơn.
+ Nếu có thẻ khách hàng thân thiết sẽ giảm 15% trên hóa đơn
+ Với đơn hàng > 2triệu sẽ giảm 30% trên hóa đơn.
Không áp dụng đồng thời các chương trình khuyến mại, nếu có nhiều ưu đãi áp dụng ưu đãi cao nhất.
Nêu các testcase.

Trước hết chúng ta sẽ tìm hiểu về các bước tạo bảng quyết định. Ở đây mình sẽ giới thiệu 2 cách để có thể tạo bảnh quyết định.

**Cách 1:** 
1. Liệt kê tất cả Conditions/Inputs: Dựa vào tài liệu đặc tả
2. Tính số lượng kết hợp có thể (Rules) = **số kết quả của mỗi điều kiện nhân với nhau**
3. Đặt tất cả các kết hợp trong bảng
4. Giảm thiểu các case kết hợp và quyết định test case
  
 
 Hướng dẫn:
 Gồm 3 conditions là sinh nhật, Khách hàng thân thiết, đơn hàng > 2 triệu. Mỗi conditon có 2 giá trị True và False ta sẽ có 2 * 2 * 2=8 rule
 Để đơn giản cách điền Y-N ta lấy 8/2 =4 thì sẽ điền 4 Y và 4 N, tương tự 4/2=2 thì sẽ điền 2 Y-2 N. Cuối cùng điền Y-N.
  
 ![](https://images.viblo.asia/d8f72307-427a-4933-a34c-364a5d9b6f34.png)
 
 Ta có thể rút gọn các rule với nhau R1 với R3 , R5 với R7, R2 với R4
 ![](https://images.viblo.asia/fe033ff2-31b8-4aaf-9756-e2477c27b5c5.png)
 
 Nhìn thấy Rule 1 và Rule 5, có thể rút gọn. Lược bỏ ta được 4 Rule ứng với 4 testcases 
 ![](https://images.viblo.asia/76ac3784-ce58-4452-a714-f86964abe31b.png)
 
 Sau khi thực hiện các bước trên, với số lượng kết hợp case ban đầu là 8 case, đã có thể giảm tới mức tối thiểu còn lại là 4 case, với 4 case này vẫn hoàn toàn cover được toàn bộ function, không gặp phải hiện trạng test trùng lặp, thiếu case, ...giảm thiểu effort test đến mức tối đa.
 
**Cách 2**: Thay vì phải viết tất cả các testcases rồi sau đó rút gọn thì chúng ta có thể lập một bảng quyết định chỉ gồm các test case cover được toàn bộ function.
Ở đây ta sẽ quan tâm đến actions thay vì điều kiện đầu vào. Ứng với mỗi actions sẽ tìm các case phù hợp. 
Từ bảng quyết định chuyển thành bảng các testcase trong đó mỗi cột miêu tả 1 luật được chuyển thành 1 đến n cột miêu tả các testcase tương
ứng với luật đó :
- Nếu điều kiện nhập là trị luận lý thì mỗi cột luật được chuyển thành 1
cột testcase.
- Nếu điều kiện nhập là 1 lớp tương đương (nhiều giá trị liên tục) thì
mỗi cột luật được chuyển thành nhiều testcase dựa trên kỹ thuật lớp
tương đương hay kỹ thuật giá trị biên. 
Trong ví dụ này sẽ có 4 action : giảm giá 15%, giảm 20% giảm 30%, và không được giảm giá

![](https://images.viblo.asia/db3404a2-c444-481e-94bd-bd36acdabc3e.png)


**Hy vọng bài viết có thể giúp ích cho bạn!**

***Tài liệu tham khảo:***
1.  Slide software testing of Framgia Inc
2. http://bis.net.vn/forums/t/699.aspx
3. http://www.testingvn.com/viewtopic.php?t=2750