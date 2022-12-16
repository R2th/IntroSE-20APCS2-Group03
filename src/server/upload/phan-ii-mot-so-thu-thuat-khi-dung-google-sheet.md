Tiếp nối phần I mình xin giới thiệu với các bạn thêm 10 thủ thuật từ Google Sheet nhé. 

**Tham khảo phần I ở đây:**
https://viblo.asia/p/phan-i-mot-so-thu-thuat-khi-dung-google-sheet-Do754er0KM6

### 11. Kéo dữ liệu từ Google Sheets khác
- Dùng hàm IMPORTRANGE
- Công thức:  =IMPORTRANGE("spreadsheet_URL", "Sheet and cell references") 
- Ví dụ: =IMPORTRANGE ("1jghakueH148eLoExb-DNj2j6YgGf5cVOgpuwfCtoo2I", "Sheet1!A2:B6")

**spreadsheet_URL:**

![](https://images.viblo.asia/0bd6210e-fb19-4c00-a448-bf750bce2783.png)

*Sheet and cell references: là sheet và from&to của ô giá trị chúng ta muốn lấy kết quả.*

**Kết quả:**
                                                                                                              
![](https://images.viblo.asia/9b1dc05c-e354-4cb9-8ab6-ed1e130a62a7.png)

**Lưu ý:** sẽ có 1 popup nhỏ show ra yêu cầu chúng ta connect với sheet mà chúng ta muốn lấy dữ liệu. Bạn chỉ việc chọn **Access allow** là dữ liệu của sheet đó sẽ được chuyển sang sheet hiện tại theo như công thức.

![](https://images.viblo.asia/45cd015f-51ed-469f-8a46-3c13fc671cd5.png)

### 12. Khóa các ô để ngăn chặn những thay đổi không mong muốn
**- Mục đích:** muốn giới hạn quyền edit của những thành viên được chia sẻ file. 
**- Cách khóa:**
**Step 1:** bôi đen khu vực muốn khóa
**Step 2:** trên thanh công cụ chọn Data > Protected sheets and ranges
                                                                                                                 ![](https://images.viblo.asia/74dbd058-46e7-42ba-a140-803c2be42e97.png)

**Step 3:** thanh tuỳ chọn Protect Sheets and Ranges sẽ xuất hiện ở bên phải cửa sổ. Tại đây, bạn có thể nhập một dòng mô tả ngắn gọn về lý do cần khoá ở ô **Enter a description**
                                                                                                                 ![](https://images.viblo.asia/6850fdef-6600-43eb-90aa-cd487dabb57c.png)

**Step 4:** nhấn chuột vào nút "Set Permissions" (Thiết lập quyền) màu xanh lá để chuyển sang hộp thoại thiết lập quyền đối với các ô bị khoá.
                                                                                                                 ![](https://images.viblo.asia/76b34769-c6f7-474d-be1e-f654acac6f45.png)

**Step 5:** sau khi thiết lập quyền xong nhấn Done là xong. Nếu muốn show warning khi người khác edit thì sẽ check vào **Show a warning when editing this range**  

### 13.  Chuyển đổi tập tin sang Sheets
**- Cách chuyển:**
**Step 1:** up file  .XLSX lên google drive
**Step 2:** mở file .XLSX bằng Google sheets
                                                                                                                ![](https://images.viblo.asia/c40a9f68-719f-4bf4-8f2c-7e9093ea9820.png)
**
Step 3:** trên thanh công cụ chọn File > Save as Google Sheets
                                                                                                                ![](https://images.viblo.asia/fbd20a25-e9f0-45b3-8f17-dead474f9edf.png)

**Step 4:** sau khi nhấn Save as Google Sheets sẽ sinh ra 1 file mới tương tự với định dạng Google Sheets và bạn có thể xóa đi file định dạng .XLSX cũ. 

### 14.  Chia sẻ Google Sheet của bạn
**- Cách chia sẻ:**

**Step 1:** nhấn vào button Share màu xanh lá bên góc phải màn hình

![](https://images.viblo.asia/1261c6e6-fcc4-408a-bfc8-bfb9bf6120e9.png)

**Step 2:** input những địa chỉ mail mà bạn muốn share. 

![](https://images.viblo.asia/908afdb8-1b37-4910-a656-50d0ddf18370.png)

**Step 3:** chọn quyền cho tài khoản bạn muốn chia sẻ và sau đó nhấn Done là xong. 

 ![](https://images.viblo.asia/5dec18a5-fb7a-4210-ac68-1be5eb48997b.png)

### 15. Sao chép định dạng 
- Dùng **Format Painter** để định dạng ô và sử dụng phong cách tương tự vào các ô khác.
- Các bước thực hiện:

**Step 1:** chọn các ô mà bạn muốn sao chép định dạng. 

![](https://images.viblo.asia/4e3c628c-aecb-42f3-b003-7aeea0f1c916.png)

**Step 2:** nhấp chuột vào **format painter** và kéo qua các ô mà bạn muốn áp dụng các định dạng là được. 

![](https://images.viblo.asia/a2ed944e-29cd-4fad-b66b-c32e82c96451.png)
![](https://images.viblo.asia/4e3c628c-aecb-42f3-b003-7aeea0f1c916.png)

### 16. Nhập từ Form sang Sheets
**Step 1:** tại thanh công cụ của Google spread sheets chọn **Insert** > **Form** 

![](https://images.viblo.asia/76e449ac-2345-46cb-9cc3-f869eb8fb858.png)

**Step 2:** sẽ xuất hiện giao diện như sau và tại đây bạn có thể tạo form tùy ý. 

![](https://images.viblo.asia/c09709af-1ff9-427a-ba57-40c06fd32003.png)
![](https://images.viblo.asia/aac7a372-ebaf-448e-96d7-f13a90241030.png)

**Giải thích các item:**
1: title của form (title này default sẽ được lấy theo title của google sheet)
2: description của form
3: add thêm câu hỏi 
4: import form
5: chỗ để input câu hỏi
6: chỗ để input câu trả lời
7: phương thức trả lời câu hỏi 
8: thiết lập xem câu trả lời có bắt buộc hay không? Nếu câu trả lời là bắt buộc thì bật chức năng này lên 

### 17. Show toàn màn hình
**- Mục đích:** giúp hạn chế những phiền nhiễu xuất hiện trên màn hình máy tính. 
**- Cách show toàn màn hình:**  nhấn **View** > **Full screen**

![](https://images.viblo.asia/b85d174f-b291-4a86-832e-25bcafde8e08.png)

### 18. Định dạng có điều kiện
**- Mục đích:** định dạng điều kiện được dùng cho cách bảng tính lớn, sử dụng công cụ tô màu giúp bạn xem được số lượng lớn dữ liệu một cách dễ dàng để xử lý nó

**- Cách thực hiện định dạng có điều kiện:**

**Step 1:** trên thanh công cụ chọn **Format** > **conditional formatting** 

![](https://images.viblo.asia/83b2566d-adc4-4883-b6e4-3b87b81af033.png)

**Step 2:**  sau đó bên phải sẽ xuất hiện giao diện màn hình khung Conditional format rules để thiết lập các điều kiện cho dữ liệu.

![](https://images.viblo.asia/83b2566d-adc4-4883-b6e4-3b87b81af033.png)
![](https://images.viblo.asia/6e2693a1-2c0a-430a-a195-c69752992408.png)

**Giải thích các item:**

1: ô mà bạn muốn set điều kiện

2: chỗ setting điều kiện. Có các điều kiện như sau:

| English | Vietnamese |
| -------- | -------- |
|Cell is empty|Ô trống|
|Cell is not empty | Ô không trống|
|Text contains |Có chứa văn bản|
|Text does not contain| Không có chứa văn bản|
|Text is exactly| Có văn bản giống chính xác|
|Date is|Có chứa ngày tháng|
|Date if before| Có chứa ngày trước...|
|Date is after| Có chứa ngày sau....|
|Greater than| Lớn hơn...|
|Greater than or equal to| Lớn hơn hoặc bằng|
|Less than| Nhỏ hơn...|
|Less than or equal to| Nhỏ hơn hoặc bằng|
|Is equal to| Bằng với...|
|Is not equal to| Không bằng với...|
|Is not between| Không nằm ở giữa...|
|Custom Formula|Theo công thức|

3: setting màu cho điều kiện

4: nhấn Done để hoàn thành setting điều kiện

5: add thêm điều kiện khác 

### 19. Cố định/đóng băng dòng/cột trong Google sheets 
**-Mục đích:** cố định một dòng hay cột là việc khóa cứng dòng/cột đó ở trên cùng của trang tính, dù bạn cuộn xuống hay kéo bài sang ngang thì dòng/cột đó vẫn giữ nguyên ở vị trí đây. 

**-Cách cố định dòng/cột:**

**Step 1:** mở trang Google Sheets, click con trỏ chuột vào số hoặc chữ của dòng/cột đó.

**Step 2:** chọn **View** >  **Freeze**, sau đó bạn sẽ thấy một bảng tùy chọn hiện ra. Tại bảng tùy chọn này bạn sẽ có thể chọn được hàng/cột mà bạn muốn cố định.

![](https://images.viblo.asia/8612f6a2-b6c9-4992-abc5-2a6a0023fd96.png)

**Step 3:** kết quả là hàng hoặc cột bạn chọn đã được đóng băng và cố định bằng khung viền màu xám để ngăn cách với khu vực còn lại, và không thể di chuyển cho dù bạn kéo chuột tới bất cứ vị trí nào đi chăng nữa.

![](https://images.viblo.asia/e50285c8-c20a-42fa-9ee2-6a9e9fb32184.png)

### 20. Cách để tạo danh sách tùy chọn 
**- Cách tạo danh sách tùy chọn:**

**Step 1:** chọn ô mà bạn muốn tạo danh sách tùy chọn

**Step 2:** tiếp theo chọn **Data** > **Data validation** 

![](https://images.viblo.asia/c7459c4d-d629-4e3e-b19c-3a2a102675ec.png)

**Step 3:** sau đó sẽ show ra các popup với title **Data validation** như dưới đây và bạn có thể setting danh sách tùy chọn bằng cách click vào ô màu đỏ. 

![](https://images.viblo.asia/791cb4ae-b923-4495-bd46-2e567e2661f6.png)

**Step 4:** sau khi click ô đỏ sẽ lại hiển thị ra 1 popup với title **Select a data range** và bạn sẽ select phạm vi danh sách tùy chọn bạn muốn > nhấn **OK** > nhấn **Save** là setting hoàn thành.

![](https://images.viblo.asia/b098c6d6-b959-49d2-a8a1-ece85e87281d.png)