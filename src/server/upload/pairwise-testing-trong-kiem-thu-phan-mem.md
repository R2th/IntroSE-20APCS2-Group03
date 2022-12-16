# Giới thiệu
- Khi test chúng ta cần đảm bảo mức độ cover các test cases đạt mức cao nhất có thể. Mục đích của việc làm này nhằm đảm bảo tất cả các cách kết hợp có thể xảy ra của các tham số đầu vào (input) và đầu ra (output) đều được kiểm tra. Tuy nhiên, liệu chúng ta có thể cover được 100% phạm vi cần test? Nhưng liệu để cover được 100% đó thì testcase sẽ ngắn gọn hay dài dòng? Và để cover được 100% phạm vi test với test case ngắn gọn đó chúng ta hãy áp dụng phương pháp thử nghiệm “ ***Pairwise Testing*** ” hoặc “ ***All-Pairs testing*** ”. 

- “ ***Pairwise Testing*** ” có thể được định nghĩa là một trong những phướng thức kiểm thử hộp đen, nó đảm bảo gần như 100% phạm vi kiểm tra mà không cần viết các test case dài dòng và tốn nhiều thời gian để thực hiện test.

- Với kỹ thuật này, team test có thể cover được 100% phạm vi kiểm, tăng tỷ lệ phát hiện bug/defect có thể xảy ra mà không cần test application behavior với tất cả các cách kết hợp valid giữa input - đầu vào và output - đầu ra . Đôi khi chúng ta không có nhiều thời gian để test nhưng dựa án lại yêu cầu test trong thời gian ngắn và phạm vi test phải bao gồm hầu hết các kịch bản có thể xảy ra. Lúc này, các kỹ thuật test như boundary value analysis (phân tích giá trị biên), equivalence partitioning (phân vùng tương đương),... có thể áp dụng nhưng lại không cover được phạm vi kiểm tra tối đa. Do đó, cách tiếp cận thử nghiệm của ***Pairwise*** được tiến hành để cover được phạm vi kiểm tra tối đa.

![](https://images.viblo.asia/12c3d422-14a6-4df7-abfb-09c438e64ec9.png)

# Ưu điểm
- Làm giảm số lượng các testcase khi exe test.
- Tăng phạm vi kiểm tra lên đến 100%.
- Tăng tỷ lệ phát hiện bug / defect.
- Tốn ít thời gian để test toàn bộ test cases.
- Làm giảm ngân sách cho việc test của dự án.
# Nhược điểm
- Khi các giá trị được chọn cho các biến không phù hợp nó sẽ gây bất lợi cho việc viết testcase và thực hiện test.
- Sự kết hợp giữa các input đầu vào có xác suất lỗi xảy ra cao có thể bị bỏ lỡ trong khi chọn data test. Điều này có thể dẫn đến việc giảm tỷ lệ tìm ra bug / defect.
- Nếu các biến kết hợp cũng như data test không được hiểu một cách chính xác, thì case đó không sử dụng được.
# Ví dụ
Hãy exe test ứng dụng *Automated “Public Library System”* với các yêu cầu sau:
- Thư viện public Toronto cung cấp sách phục vụ cho việc đọc sách. Sách có thể được đặt trước và mang về nhà đọc. Tuy nhiên một số quyển sách không được đặt trước và chỉ có thể đọc tại cửa hàng.
- Thư viện public Toronto chỉ dành cho cư dân của Toronto. Cư dân các thành phố khác có thể đọc sách nhưng không thể đặt sách trước và mang về nhà.
- Sách có thể được đặt trước trực tuyến thông qua trang web và nhận tại thư viện hoặc đặt và nhận trực tiếp tại thư viện.
- Sách được viết bằng hai ngôn ngữ: tiếng Anh và tiếng Pháp.
- Các thể loại sách có sẵn tại thư viện là: bách khoa toàn thư, tiểu thuyết và học thuật.

Áp dụng  Pairwise Testing trong việc tạo data test chuẩn bị cho việc exe test.

**✾ Bước 1:** Xác định các biến và tập giá trị.
- *Member Residence* - Nơi cư trú của thành viên gồm 4 thành phố của Ontario:
  + Toronto.
  + Hamilton.
  + Mississauga.
  + Brampton.
- *Book BarCode* - Barcode của sách tổng số hiện có 80,000 sách trong thư viện với status là:
  + Reserve - Có thể đặt trước.
  + Non-reserve - Không thể đặt trước.
- *Book Language* - Ngôn ngữ của sách. Sách có 2 ngôn ngữ:
  + English - Tiếng Anh.
  + French - Tiếng Pháp.
- *Book Reserve Method* - Phương thức đặt sách:
  + Online - Đặt online.
  + In-house - Đặt tại thư viện.
- *Book Categories* - Thể loại sách:
  + Encyclopedia - Bách khoa toàn thư.
  + Fiction - Tiểu thuyết.
  + Academics - Học thuật.
  
**=>**  Từ các biến và tập giá trị trên chúng ta sẽ có ***(4 x 80,000 x 2 x 2 x 3) = 3,840,000 valid test cases***.

Tuy nhiên nếu xét đến các trường hợp negative tests và invalid test thì tổng số các test case có thể tăng lên đến một giá trị không xác định được.

**✾ Bước 2:** Đơn giản hóa các biến và tập giá trị
- Giảm các biến của *Book BarCode* từ 80,000 quyển sách có 2 status thành 2 biến:
  + Reserve - Có thể đặt trước. 
  + Non-reserve - Không thể đặt trước.
- Giảm các biến của *Member Residence* từ 4 thành 2:
  + Toronto 
  + Non-Toronto

Ngoài kỹ thuật trên, chúng ta có thể áp dụng kỹ thuật *group* và *boundary conditions* (điều kiện biên). Sau khi giảm số lượng các biến của các thuộc tính, chúng ta sẽ có ***(2 X 2 X 2 X 2 X 3) = 48 Valid test cases***.

**✾ Bước 3:** 
- Sắp xếp giá trị các biến tương ứng với các dữ liệu đầu vào.

| Member Residence| Book  BarCode | Book Language | Book Reserve Method | Book Categories |
| -------- | -------- | -------- | -------- | -------- |
| Toronto     | Reserve      | English     | Online     | Encyclopedia     |
| Non -  Toronto     | Non - Reserve      | French     | In - house     | Fiction     |
|      |       |      |     | Academics     |

- Sắp xếp dữ liệu của các cột theo thứ tự giảm dần, ta sẽ được bảng sau:

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
| 3     | 2      | 2     | 2     | 2     |
**✾ Bước 4:**   Sắp xếp bảng để chuẩn bị dữ liệu cho việc test

 - Chọn cột đầu tiên sẽ là cột có số lượng permissible values lớn nhất và đặt các giá trị cho các biến tương ứng như bảng sau. 
 - Số lượng các hàng sẽ là bội số của hai số cột đầu tiên (ở đây là 3 X 2 = 6).
 
| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |       |      |      |      |
|   Encyclopedia   |       |      |      |      |
|   Fiction   |       |      |      |      |
|    Fiction  |       |      |      |      |
|  Academics    |       |      |      |      |
|Academics      |       |      |      |      |

- Dựa trên dữ liệu của cột thứ hai theo thứ tự giảm dần đã được sắp xếp trong bảng trước đó (ở đây là cột *Book  BarCode*) tiếp tục chuẩn bị dữ liệu theo bảng như sau:

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |  Toronto     |      |      |      |
|   Encyclopedia   |   Non - Toronto    |      |      |      |
|   Fiction   |    Toronto   |      |      |      |
|    Fiction  |    Non - Toronto   |      |      |      |
|  Academics    |  Toronto     |      |      |      |
|Academics      |     Non - Toronto  |      |      |      |

- Theo như thông tin bảng trên. Sách sẽ được cung cấp cho cư dân ở Toronto và Non - Toronto đọc. 
- Tiếp tục sắp xếp dữ liệu với cột tiếp theo chúng ta sẽ có bảng sau:

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |  Toronto     |  Online    |      |      |
|   Encyclopedia   |   Non - Toronto    |  In - House    |      |      |
|   Fiction   |    Toronto   |    Online  |      |      |
|    Fiction  |    Non - Toronto   |  In - House    |      |      |
|  Academics    |  Toronto     |   Online   |      |      |
|Academics      |     Non - Toronto  |   In - House   |      |      

- Với bảng dữ liệu bên trên, chúng ta chỉ có bộ dữ liệu:
     + Toronto vs Online.
     + Non - Toronto vs In - house.
- Mà thiếu đi bộ dữ liệu sau:
   + Toronto vs In - house.
   + Non - Toronto vs Online.
- Vì thế chúng ta sẽ swap vị trí của *In - house* và *Online* tại cột *Book Reserve Method* ở 2 ô. Sau khi swap chúng ta sẽ có được bảng sau:

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |  Toronto     |  Online    |      |      |
|   Encyclopedia   |   Non - Toronto    |  In - House    |      |      |
|   Fiction   |    Toronto   |    **In - House** |      |      |
|    Fiction  |    Non - Toronto   |   **Online**    |      |      |
|  Academics    |  Toronto     |   Online   |      |      |
|Academics      |     Non - Toronto  |   In - House   |      |      |

- Dữ liệu cột *Book BarCode* cũng tương tự như dữ liệu cột *Book Reserve Method*. Ban đầu khi đặt dữ liệu vào *Book BarCode* chúng ta sẽ có bảng sau:

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |  Toronto     |  Online    |   Reserve    |      |
|   Encyclopedia   |   Non - Toronto    |  In - House    |    Non - Reserve  |      |
|   Fiction   |    Toronto   |    ***In - House*** |   Reserve    |      |
|    Fiction  |    Non - Toronto   |   ***Online***    |   Non - Reserve   |      |
|  Academics    |  Toronto     |   Online   |    Reserve   |      |
|Academics      |     Non - Toronto  |   In - House   |  Non - Reserve    |      |

- Và chúng ta cũng sẽ chỉ có bộ dữ liệu:
    + Toronto vs Reserve.
    + Non - Toronto vs Non - Reserve.
- Mà thiếu đi bộ dữ liệu:
     + Toronto vs Non - Reserve.
     + Non - Toronto vs Reserve.
- Vì thế chúng ta sẽ lại swap vị trí của *Non - Reserve* và *Reserve*. Sau khi swap chúng ta sẽ có bảng dữ liệu sau:

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |  Toronto     |  Online    |   Reserve    |      |
|   Encyclopedia   |   Non - Toronto    |  In - House    |    Non - Reserve  |      |
|   Fiction   |    Toronto   |    ***In - House*** |   Reserve    |      |
|    Fiction  |    Non - Toronto   |   ***Online***    |   Non - Reserve   |      |
|  Academics    |  Toronto     |   Online   |    ***Non - Reserve***   |      |
|Academics      |     Non - Toronto  |   In - House   |    ***Reserve***  |      |

- Tương tự như cách sắp xếp dữ liệu của 2 cột *Book Reserve Method* và *Book BarCode*. Chúng ta sẽ sắp xếp dữ liệu cho cột *Book Language*.

| Book Categories| Book  BarCode | Book Language | Book Reserve Method | Member Residence |
| -------- | -------- | -------- | -------- | -------- |
|  Encyclopedia    |  Toronto     |  Online    |   Reserve    |     ***French*** |
|   Encyclopedia   |   Non - Toronto    |  In - House    |    Non - Reserve  |   ***English***   |
|   Fiction   |    Toronto   |    ***In - House*** |   Reserve    |   English   |
|    Fiction  |    Non - Toronto   |   ***Online***    |   Non - Reserve   |  French    |
|  Academics    |  Toronto     |   Online   |    ***Non - Reserve***   |    English  |
|Academics      |     Non - Toronto  |   In - House   |    ***Reserve***  |    French  |
**=>** Từ các bước trên, chúng ta sẽ còn lại 6 cách kết hợp giữa các input đầu vào để kiểm tra tất cả các kịch bản có thể valid mà trước đó chúng ta đã ước tính là **48 valid test cases**. Và đó là kết quả của việc áp dụng kỹ thuật test ***Pair Pairwise***.
# Kết luận
- Thông qua ví dụ trên chúng ta có thể thấy khi áp dụng kỹ thuật **Pairwise Testing** số lượng test cases đã được giảm xuống đáng kể. 
- Nhìn vào bảng phân bố giá trị các biến đã tạo tester sẽ dễ dàng viết testcase và bảng dữ liệu đó hầu như đã cover được 100% phạm vi các trường hợp cần test.
- Bên cạnh đó **Pairwise Testing** còn giúp tester rút ngắn được thời gian test so với khi không áp dụng **Pairwise Testing**.

**=>** Tóm lại “***Pairwise Testing***” đòi hỏi tester phải hiểu được ý nghĩa, số lượng các giá trị của các biến để từ đó chọn ra các input khả thi, có ý nghĩa cho dữ liệu đầu vào. Khi dữ liệu này có hiệu quả nó sẽ tăng tỷ lệ tìm ra được nhiều bug/ defect nhất có thể. Và tăng khả năng cover phạm vi test đạt 100%. Đây là một trong những kỹ thuật test mang lại hiệu quả test cao nhất với thời gian test và effort ít nhất.

----------------------------------------------------------------------------------------------------------------------------------
*Link tham khảo:*
- https://www.softwaretestingclass.com/pairwise-testing-in-software-testing/