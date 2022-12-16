Trong mỗi dự án, công việc của Tester từ file quản lý Q&A, test plan, test case, test report đến những file tài liệu đặc tả, take note, làm tài liệu hướng dẫn sử dụng,...hầu hết, đều sử dụng Excel. Có lẽ, vì thế mà Excel được liệt kê là một trong những công cụ hỗ trợ đắc lực cho Tester.

Mình đã từng rơi vào trường hợp sau khi hoàn thành tes tcase thì cần thay đổi, phải thêm/bớt một vài test case, sau đó còn phải đánh test case ID và thống kê tổng số test case lại nữa. Hay đơn giản, tester nào cũng phải thống kê số test case đã test, bao nhiêu case pass, fail, pending, not test, còn lại bao nhiêu case cần test...để làm báo cáo. Nếu làm thủ công thì thực sự rất vả vả, trong khi công việc này sẽ lặp đi lặp lại nhiều lần. Nhiều khi mình cũng loay hoay không biết trình bày như thế nào, sử dụng hàm excel nào để công việc trở nên dễ dàng, đỡ mất thời gian hơn với sheet ~2000 test case....Nhưng Excel có thể hỗ trợ tester mình làm điều đó. 

Mình xin chia sẻ một vài hàm excel gần đây mình rất hay dùng và cũng học hỏi được từ đồng nghiệp là nhiều thôi ạ. Dự án mình sử dụng chủ yếu là google sheet, còn file excel offline đôi khi có hơi khác vị trí đặt menu nhưng cơ bản là tương tự nhau.

### 1. Hàm 'ROW() - number' đánh số tự động tăng.
Đánh số tự động tăng thường dùng để đánh test case ID, sử dụng hàm **'ROW() - number'**, kể cả những test case được thêm vào giữa, xóa đi cũng sẽ được đánh STT đúng.

Ví dụ: Test case đầu tiên bắt đầu từ dòng thứ 9, ở cột test case ID sẽ ghi "=ROW()-8"
![](https://images.viblo.asia/17a278aa-94f8-43ce-bbfc-bbf2a37a5535.png)

### 2. Sử dụng 'Data Validation' để tạo Select Box.
Giả sử như cột kết quả test trong file test case có các giá trị: Pass, Fail, Pending, Not Test. Mình muốn chọn một trong các giá trị, để không phải điền nhiều lần, do đó có thể sử dụng **'Data Validation'** để tạo Select Box.
- Bước 1: Chọn ô của cột cần tạo Select Box.
- Bước 2: Chọn Data trên thanh ToolBar--> Data Validation (Hoặc chọn ô cần tạo Select Box, rồi chuột phải --> chọn Data Validation).

![](https://images.viblo.asia/d69cfc39-d403-46e8-8dc8-1f6cbfe26373.png)
   
- Bước 3: Tạo list value cho Select Box. Sau bước 2 sẽ xuất hiện bảng:
  ![](https://images.viblo.asia/979c6e4b-447b-4fd4-bd10-acb8a35dbb41.png)
  
  Cách đơn giản nhất mình thường dùng là:
  - Tại Cell range: Là vùng áp dụng.
  - Tại Criteria: Chọn "List of items" và Input list value vào textbox bên phải, ngăn cách nhau bằng dấu phẩy.
  - Tại On invalid data: chọn “Show warning” thì có thể điền giá trị khác vào ô combobox đó, nhưng sẽ hiển thị warning. Chọn “Reject input” thì chỉ được chọn những value từ select box.
  - Remove validation: Nếu bạn muốn bỏ Validation ở ô đó.

  Kết quả khi click vào ô sẽ show dropdown list:
  ![](https://images.viblo.asia/4f24c7dc-b206-4cae-8094-d9af726a4d5f.png)
### 3. Sử dụng ‘Conditional Formatting'.
Mục đích của chức năng này là để tự động format theo những điều kiện đã định nghĩa từ trước. Giả sử khi add thêm test case mới, sử dụng cách này sẽ tiết kiệm nhiều thời gian đấy.
- Bước 1: Chọn ô hoặc cột muốn tạo Format.
- Bước 2: Chuột phải --> Conditional Formatting –> Xuất hiện bảng Conditional format rules.

  ![](https://images.viblo.asia/0ec05093-9ee7-4ce7-aba2-b42a3dfe6741.png)
- Bước 3: Chọn điều kiện ở chỗ “Format cells if” và chọn format bạn muốn ở “Formatting style”. Và ấn "Done" là được rồi.

Ví dụ 1: Ở cột D, nếu chọn "Done" thì ô đó được mark màu xanh, nếu chọn "In-progress" thì được mark màu cam. 

   Thiết lập cho option "Done" như sau ạ:
     
   ![](https://images.viblo.asia/84932934-5509-4144-8c5b-1c7417da8bb9.png)
   
   Để add thêm rule cho option "In-Progress" thì chọn "Add another rule" và set tương tự.
   
   ![](https://images.viblo.asia/7d12896f-8ba9-4b6f-a124-db53caa6cb97.png)

Ví dụ 2: Ở cột E, nếu cứ bắt đầu bằng "2020/06" thì text được bôi đậm và ô đó được mark màu xanh da trời.

   ![](https://images.viblo.asia/b79b2192-e88c-4424-8dc3-c2bb7feb628a.png)

### 4. Tạo group cho dòng và cột.
Chức năng này giúp mở rộng/thu hẹp các dòng, cột để có thể dễ quản lý. Mình thường dùng chức năng này để group các loại test case (ví dụ như test case UI, test case function...), hay test case của từng phần/function sẽ được group lại với nhau...nhất là những sheet có cả nghìn test case, dễ dàng thấy phần nào mình đang cần tìm, và không mất quá nhiều thời gian để lăn chuột nữa.

**Cách làm:** Chọn dòng/cột cần group --> Chuột phải --> Chọn "Group rows/columns ..."

   ![](https://images.viblo.asia/3eb44d33-29a0-45e5-9fbe-bed5b9b8d339.png)
          
   Ting!Ting! Kết quả hiển thị như này:
   - Group cột
   
![](https://images.viblo.asia/895dcc88-03aa-4397-9a97-a31b20b1142e.png)
- Group dòng:

![](https://images.viblo.asia/f3fa47e7-a185-49c8-9b8a-b09e596495d4.png)

Click chuột phải vào biểu tượng đã group để setting thêm nha...

![](https://images.viblo.asia/0620f13b-1993-4d42-aae5-fe3628e083c8.png)

### 5. Sao chép định dạng với ‘Format Painter’.
Khi cần phải sao chép định dạng, Format Painter là một trong những công cụ hiệu quả nhất. Nó sẽ copy định dạng của 1 ô và áp dụng định dạng cho ô khác.

- Chỉ với vài cái nhấp chuột, bạn có thể sao chép hầu hết các định dạng bao gồm:
  - Định dạng số (General, Percentage, Currency)
  - Font, cỡ và màu chữ
  - Đặc điểm font chữ như đậm, nghiêng, gạch chân
  - Màu nền
  - Căn chỉnh chữ và hướng chữ
  - Đường viền ô
- Bước 1: Chọn ô có định dạng mà bạn muốn sao chép. (Có thể chọn 1 vùng nhiều ô hoặc cả nhiều dòng, nhiều cột).
- Bước 2: Nhấn nút Format Painter ở ToolBar

   ![](https://images.viblo.asia/082272e2-c9af-4fdc-bdec-f16a5dbd3632.png)
- Bước 3: Click chuột vào ô muốn sao chép định dạng (hoặc ô trên cùng, bên trái của vùng, hoặc dòng đầu, cột đầu...tùy theo vùng đã chọn để sao chép).

###  6. F4 để giữ ô/vùng tham chiếu cố định.
- Bước 1: Đặt con trỏ chuột vào vị trí của vùng tham chiếu cần cố định.
- Bước 2: Nhấn F4, khi đó kí hiệu ($) sẽ xuất hiện trong công thức
 ---> Khi đó copy công thức sang ô khác, vùng tham chiếu sẽ được cố định, không thay đổi theo nữa.
 
  Ví dụ: Xét ô A1:
  
  ![](https://images.viblo.asia/47b16d86-986c-49de-a2ef-f8b21be78d84.png)
  
A1 được cố định trong công thức như sau:
![](https://images.viblo.asia/de7e96b5-c6fd-4fcd-b658-6b25833384da.png)

### 7. Đếm tổng số với 'COUNTIFS' và 'COUNTIF'.
   7.1 'COUNTIF' dùng để count khi chỉ có 1 điều kiện duy nhất.
  - Công thức: =COUNTIF(criteria_range, criteria)
    - riteria_range: xác định vùng áp dụng điều kiện criteria.
    - criteria: điều kiện cho dạng số, ô tham chiếu, chuỗi văn bản, một mảng hoặc một hàm excel khác. Ví dụ có thể biểu diễn là: 10, “<=32”, "<>2020/06/30", $A$6, “candy”.
    
  - Ví dụ: Có bảng dữ liệu sau, count số task đã hoàn thành, có trạng thái "Done"
![](https://images.viblo.asia/74dd64fd-54e1-4722-8bbd-343dbcab2b26.png)

7.2 'COUNTIFS' dùng để count với nhiều điều kiện.
  - Công thức: =COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2]…)
  - Ví dụ: Count số test case đã test qua (cả Pass, Fail, Pending, Not test) trong tháng 6, được thực hiện bởi tester "MaiHTP"
  
![](https://images.viblo.asia/921a2ff5-df3f-4025-8896-93b4342daa74.png)

  
### 8. Tính tổng theo điều kiện với 'SUMIFS'.
- Hàm này sử dụng để tính tổng theo nhiều điều kiện đó các tester ạ. Đôi khi mình hay có mấy task tổng hợp đều phải vận dụng triệt để mấy hàm này.
- Công thức: =SUMIFS(sum_range, criteria_range1, criteria1, [criter_range2, criteria2], …)
- Ví dụ: Tính tổng số giờ trong tháng 6 cho các task đã hoàn thành.

![](https://images.viblo.asia/4ebd9a75-10ab-4804-9530-fa3c8599658c.png)

Trên đây, mình có note lại một số hàm execel mình hay sử dụng để viết test case, tổng hợp tiến độ, làm file test plan,... trước đây mình cũng lúng túng lắm, được chỉ cho nên mới biết. Đó là lý do mình viết bài này, chỉ là các hàm ở mức rất cơ bản thôi, để sau này chính bản thân mình cũng sẽ xem lại khi cần thiết, mong là cũng sẽ hữu ích cho các bạn.