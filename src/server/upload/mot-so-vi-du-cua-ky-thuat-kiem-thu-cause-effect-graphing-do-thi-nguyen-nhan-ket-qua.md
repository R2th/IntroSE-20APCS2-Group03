# 1. Giới thiệu
- Như các bạn được biết, Cause & Effect Graphing - Đồ thị nguyên nhân kết quả là là phương pháp tạo các ca kiểm thử có hệ thống mô tả sự kết hợp của các điều kiện. Sự thay đổi sẽ là 1 sự lựa chọn kết hợp không thể dự tính trước, nhưng khi thực hiện như vậy, có vẻ như bạn sẽ bỏ sót nhiều ca kiểm thử “thú vị” được xác định bằng đồ thị nguyên nhân – kết quả.
- Tất cả các nguyên nhân (các đầu vào) và các kết quả (các đầu ra) được liệt kê dựa trên đặc tả và được định danh cho mỗi nhân - quả. 
- Các quan hệ giữa các nguyên nhân (các đầu vào) và các kết quả (các đầu ra) được biểu diễn trong đồ thị làm rõ ràng các quan hệ logic.
- Từ đồ thị tạo ra bảng quyết định biểu diễn các quan hệ giữa nguyên nhân và kết quả. Dữ liệu kiểm thử được sinh ra dựa trên các qui tắc trong các bảng này.
- Trong bài này mình xin đưa ra một số ví dụ cụ thể để các bạn có thể hiểu rõ hơn về phương pháp thú vị này.
# 2. Ví dụ
## A. Ví dụ 1
Để tính thuế thu nhập, người ta có mô tả sau:
* Người vô gia cư nộp 4% thuế thu nhập.
* Người có nhà ở nộp thuế theo bảng sau:
     - Nếu tổng thu nhập <=5.000.000 đồng thì chịu thuế 4%
     - Nếu tổng thu nhập >5.000.000 đồng thì chịu thuế 6%
----------------------------------------
Ở ví dụ này ta có thể phân loại :

Đầu vào:
- Người có nhà ở (có/ không)
- Tổng thu nhập (<=5.000.000 VND/ >5.000.000 VND).

Đầu ra:
- Nộp thuế (4%/ 6%)
---------------------------------------
Chúng ta sẽ phân tích được các testcase như sau
1. Nếu người có nhà ở và thu nhập > 5.000.000 thì phải nộp thuế 6%
2. Nếu người có nhà ở và thu nhập <=5.000.000 thì phải nộp thuế 4%
3. Người không có nhà thì ko cần kiểm tra thu nhập, phải nộp thuế 4%
---------------------------------------
Từ những dữ kiện trên chúng ta có thể lập 1 decision table như sau:

Note: Y - Yes, N- No, X- Expected

![](https://images.viblo.asia/3bb9d6f3-4a3d-4d0f-a6be-5c67b9739973.png)
## B. Ví dụ 2
Mô tả giá vé máy bay như sau:
* Business Class:		
     + Người lớn: 4.000.000 VND	
     + Trẻ em: 1.500.000 VND	
* Economy Class:		
     + Người lớn: 3.000.000 VND	
     + Trẻ em: 700.000 VND	
* Quy định về tuổi:		
     + Trẻ em: < 7 tuổi	
     + Người lớn: >= 7 tuổi	
----------------------------------------
Ở ví dụ này ta có thể phân loại :

Đầu vào:
- Độ tuổi ( Người lớn (tuổi >=7) / Trẻ em (tuổi <7))
- Hạng bay (Business Class / Economy Class)

Đầu ra:
- Giá vé máy bay = ( 4.000.000 VND/ 3.000.000 VND/ 1.500.000 VND/ 700.000 VND)
---------------------------------------
Chúng ta sẽ phân tích được các testcase như sau
1. Nếu là người lớn và đi vé hạng Business thì Price = 4.000.000
2. Nếu là người lớn và đi vé hạng Economy thì Price = 3.000.000
3. Nếu là trẻ em và đi vé hạng Business thì Price = 1.500.000
4. Nếu là trẻ em và đi vé hạng Economy thì Price = 1.500.000
---------------------------------------
Từ các dữ kiện trên chúng ta có thể vẽ được decision table:

Note: Y - Yes, X- Expected

![](https://images.viblo.asia/2fbb26b4-06dc-4ed0-afe0-a0b6cf640302.PNG)

## C. Ví dụ 3
Mô tả tính phí bảo hiểm xe hơi:
* Đối với nữ <65 tuổi, phí bảo hiểm là 500$
* Đối với Nam <25 tuổi, phí bảo hiểm là 3000$
* Đối với nam từ 25~64 tuôi, phí bảo hiểm là 1000$
* Đối với tuổi >=65, phí bảo hiểm là 1500$
----------------------------------------
Ở ví dụ này ta có thể phân loại :

Đầu vào:
- Giới tính ( Nam / Nữ)
- Độ tuổi ( <25 tuổi /  25 tuổi ~ <65 tuổi /  >=65 tuổi)

Đầu ra:
- Nộp thuế ( 500$, 1000$, 1500$, 3000$)
---------------------------------------
Chúng ta sẽ phân tích được các testcase như sau
1. Nếu là Nam và tuổi (<25 tuổi) thì thuế = 3000$
2. Nếu là Nam và tuổi (từ 25 tuổi ~ <65 tuổi) thì thuế = 1000$
3. Nếu là Nam và tuổi (>=65 tuổi) thì thuế = 1.500$
4. Nếu là Nữ và tuổi (>=65 tuổi) thì thuế = 1.500$
5. Nếu là Nữ và tuổi (<25 tuổi) thì thuế = 500 $
6. Nếu là Nữ và tuổi   (từ 25 tuổi ~ <65 tuổi) thì thuế = 500$
---------------------------------------
Từ những dữ kiện trên chúng ta có thể lập 1 decision table như sau:

Note: Y - Yes, X- Expected

![](https://images.viblo.asia/3c928192-fde2-40c1-b83b-96f5064b2364.PNG)

# 3. Kết luận
Qua các ví dụ trên, chúng ta có thể hiểu phần nào về Cause & Effect Graphing - Đồ thị nguyên nhân kết quả và cách áp dụng phương pháp này.