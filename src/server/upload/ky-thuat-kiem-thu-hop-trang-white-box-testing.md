Bất kỳ 1 sản phẩm phần mềm nào cũng chắc chắn có lỗi, vì sản phẩm phầm mềm do con người xây dựng nên, dù có cẩn trọng, có giỏi đến mức nào thì cũng không thể đảm bảo sản phẩm mình tạo ra là không có lỗi. Do đó, sẽ cần một người, nhóm hoặc tổ chức độc lập kiểm thử xem sản phẩm đó có vấn đề hay có lỗi gì hay không. 
Để kiểm thử phần mềm thì chúng ta cần phải có kế hoạch, chiến lược kiểm thử cũng như các kỹ thuật các phương pháp kỹ thuật hiệu quả cho mỗi mức độ kiểm thử. Kiểm thử phần mềm gồm hai phần việc đòi hỏi những kỹ năng khác nhau đó là kiểm thử hộp trắng (white-box testing) và kiểm thử hộp đen (black-box testing).

Trong đề tài này, tôi sẽ đi sâu vào tìm hiểu kiểm thử hộp trắng. Để hiểu rõ hơn về kỹ thuật kiểm thử hộp trắng (White-box testing) thì chúng ta lần lượt tìm hiểu các nội dung dưới đây :
## 1. Kiểm thử hộp trắng là gì?
Kiểm thử Hộp Trắng (còn gọi là Clear Box Testing, Open Box Testing, Glass Box Testing, Transparent Box Testing, Code-Based Testing hoặc Structural Testing) là một phương pháp kiểm thử phần mềm trong đó tester biết về cấu trúc nội bộ / thiết kế. Người kiểm tra chọn đầu vào để thực hiện các đường dẫn thông qua mã và xác định đầu ra thích hợp. Kiến thức lập trình và kiến thức thực hiện là rất cần thiết trong kiểm thử hộp trắng.

![](https://images.viblo.asia/a33c99c3-2296-493b-a2db-8ac0bd3f0337.png)

Kiểm thử hộp trắng bao gồm phân tích dòng dữ liệu, điều khiển dòng, dòng thông tin, mã thực hành, ngoại lệ và những lỗi trình bày trong hệ thống để kiểm tra những hành động của phần mềm không được định hướng trước.
## 2. Đối tượng áp dụng
Đối tượng ₫ược kiểm thử là 1 thành phần phần mềm (TPPM).TPPM có thể là 1 hàm chức năng, 1 module chức năng, 1 phân hệ  chức năng… 
## 3. Mức độ áp dụng
Phương pháp Kiểm tra Hộp trắng áp dụng cho các mức độ kiểm tra phần mềm sau đây:

*  Unit Testing(Kiểm thử đơn vị): Để kiểm tra đường dẫn trong một đơn vị.
*  Integration Testing(Test tích hợp): Để kiểm tra đường dẫn giữa các đơn vị.
*  System Testing(Test hệ thống): Để kiểm tra các đường dẫn giữa các hệ thống con.

Tuy nhiên, nó là chủ yếu áp dụng cho các kiểm thử đơn vị .
## 4. Ưu điểm và nhược điểm của kiểm thử hộp trắng
* Ưu điểm 
    - Test có thể bắt đầu ở giai đoạn sớm hơn, không cần phải chờ đợi cho GUI để có thể test
    - Test kỹ càng hơn, có thể bao phủ hầu hết các đường dẫn
    - Thích hợp trong việc tìm kiếm lỗi và các vấn đề trong mã lệnh 
    - Cho phép tìm kiếm các lỗi ẩn bên trong 
    - Các lập trình viên có thể tự kiểm tra 
    - Giúp tối ưu việc mã hoá 
    - Do yêu cầu kiến thức cấu trúc bên trong của phần mềm, nên việc kiểm soát lỗi tối đa nhất.
 * Nhược điểm 
    - Vì các bài kiểm tra rất phức tạp, đòi hỏi phải có các nguồn lực có tay nghề cao, với kiến thức sâu rộng về lập trình và thực hiện.
    - Maintenance test script  có thể là một gánh nặng nếu thể hiện thay đổi quá thường xuyên.
    - Vì phương pháp thử nghiệm này liên quan chặt chẽ với ứng dụng đang được test, nên các công cụ để phục vụ cho mọi loại triển khai / nền tảng có thể không sẵn có.

## 5. Các kỹ thuật kiểm thử hộp trắng phổ biến
###  5.1. Kiểm thử đường cơ bản - Đồ thị dòng
*  Là một kỹ thuật dùng trong kiểm thử hộp trắng được Tom McCabe đưa ra đầu tiên. Đồ thị dòng gần giống đồ thị luồng điều khiển của chương trình. 

*  Là một trong nhiều phương pháp miêu tả thuật giải. Đây là phương pháp trực quan cho chúng ta thấy dễ dàng các thành phần của thuật giải và mối quan
*  hệ trong việc thực hiện các thành phần này.

*  Kỹ thuật đường cơ bản - đồ thị dòng có thể giúp những người thiết kế ca kiểm thử nhận được một độ phức tạp của 1 logic thủ tục.

*  Gồm 2 loại thành phần : các nút và các cung nối kết giữa chúng. 
*  Các loại nút trong đồ thị dòng điều khiển : 
 ![](https://images.viblo.asia/aface952-4cc3-461b-8cba-5c265d37cae9.PNG)
*  Các kiểu cấu trúc thành phần đồ thị dòng :
   ![](https://images.viblo.asia/6c1dc1ad-4e60-4e66-9a98-ae7434fb81fd.PNG)
   
   Thí dụ :
  ![](https://images.viblo.asia/2b0b0706-e0ae-4239-b4d0-b77f97c7ba17.PNG)
  Nếu đồ thị dòng điều khiển chỉ chứa các nút quyết định nhị phân thì ta gọi nó là đồ thị dòng điều khiển nhị phân.
  Ta luôn có thể chi tiết hóa 1 đồ thị dòng điều khiển bất kỳ thành đồ thị dòng điều khiển nhị phân. 
  ![](https://images.viblo.asia/e5b97abf-88c4-426b-96cb-3175a8dd0459.PNG)
*   Độ phức tạp Cyclomatic C
      Độ phức tạp Cyclomatic C = V(G) của ₫ồ thị dòng ₫iều khiển   ₫ược tính bởi 1 trong các công thức sau :
          V(G) = E - N + 2, trong ₫ó E là số cung, N là số nút của ₫ồ  thị.
          V(G) = P + 1, nếu là ₫ồ thị dòng ₫iều khiển nhị phân (chỉ chứa các nút quyết ₫ịnh luận lý - chỉ có 2 cung xuất True/False) và P số nút quyết ₫ịnh.
      Độ phức tạp Cyclomatic C chính là số ₫ường thi hành tuyến  tính ₫ộc lập của TPPM cần kiểm thử.
### 5.2 Kiểm thử dựa trên luồng điều khiển
* Đường thi hành (Execution path) : là 1 kịch bản thi hành đơn vị phần mềm tương ứng, cụ thể nó là danh sách có thứ tự các lệnh được thi hành ứng với 1 lần chạy cụ thể của đơn vị phần mềm,
 bắt đầu từ điểm nhập của đơn vị phần mềm đến điểm kết thúc của đơn vị phần mềm.

* Mỗi TPPM có từ 1 đến n (có thể rất lớn) đường thi hành khác nhau. 

* Mục tiêu của phương pháp kiểm thử luồng điều khiển là đảm bảo mọi đường thi hành của ₫ơn vị phần mềm cần kiểm thử đều
 chạy đúng. Rất tiếc trong thực tế, công sức và thời gian để đạt mụctiêu trên đây là rất lớn, ngay cả trên những đơn vị phần mềm nhỏ. 

* Thí dụ ₫oạn code sau :
for (i=1; i<=1000; i++)
for (j=1; j<=1000; j++)
 for (k=1; k<=1000; k++)
 doSomethingWith(i,j,k);
 chỉ có 1 đường thi hành, nhưng rất dài : dài 1000*1000*1000 = 1 tỉ lệnh gọi hàm doSomething(i,j,k) khác nhau.
* Còn đoạn code gồm 32 lệnh if else độc lập sau :
 if (c1) s11 else s12;
  if (c2) s21 else s22;
 if (c3) s31 else s32;
  ...
  if (c32) s321 else s322;
có 2^32 = 4 tỉ đường thi hành khác nhau.
* Mà cho dù có kiểm thử hết được toàn bộ các đường thi hành thì vẫn không thể phát hiện những đường thi hành cần có nhưng không (chưa) được hiện thực :
  if (a>0) doIsGreater();
 if (a==0) dolsEqual();
 // thiếu việc xử lý trường hợp a < 0 - if (a<0) dolsLess(); 
 
* Một ₫ường thi hành đã kiểm tra là đúng nhưng vẫn có thể bị lỗi khi dùng thật (trong 1 vài trường hợp đặc biệt) :
int phanso (int a, int b) {
 return a/b;
 }
 khi kiểm tra, ta chọn b <> 0 thì chạy đúng, nhưng khi dùng thật trong trường hợp b = 0 thì hàm phân số bị lỗi. 
   
  => **Ngoài 2 kỹ thuật kiểm thử trên thì còn có : Kiểm thử dựa trên luồng dữ liệu ( Data - flow Testing) và Kiểm thử đột biến ( Mutation Testing).**
















Tài liệu tham khảo http://softwaretestingfundamentals.com/white-box-testing/