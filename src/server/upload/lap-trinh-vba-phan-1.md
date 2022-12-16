![](https://images.viblo.asia/4f13f581-d5f9-454a-853e-f3f25bf74cb1.jpg)

## 1. Excel Macros là gì?
Excel Macros là những chương trình nhỏ giúp lặp đi lặp lại những thao tác từ đơn giản đến phức tạp một cách tự động trong Excel. Ngoài Excel Macros, chúng ta còn có thể gặp Word Macro, PowerPoint Macro, Outlook Macro …

## 2. VBA là gì?
VBA viết tắt của Visual Basic for Applications, là một ngôn ngữ lập trình đi kèm với một số phần mềm của Microsoft. Ngoài ra, Excel VBA, Word, PowerPoint, Outlook… được sử dụng rất phổ phiến.

## 3. Ghi và thực hiện macro.
Bạn sử dụng chức năng Macro Recorder là một ý tưởng hay để từng bước thực hiện các công việc, nhất là lúc đầu tìm hiểu về macro. Excel đã hỗ trợ ghi lại (recorder) các công việc bạn đã thực hiện và chỉ không ghi lại khi bạn dừng ghi. Ví dụ, một ô (cell) được chọn (selected) ở hiện tại sẽ không được ghi cho đến khi bạn thực hiện công việc trong ô đó. Ngoài ra, Excel cũng không ghi lại các công việc khi đang sử dụng bảng điều khiển (dialog box) cho đến khi bạn ấn nút OK trên bảng điều khiển đó. 

Điều kiện để có thể tiến hành ghi macro:
* Bảng tính Excel hiện hành (Activate Excel).
* Sử dụng Workbook mới. 
![](https://images.viblo.asia/ac50135e-4b9d-40b4-8ff8-2aac15332a16.png)
### 3.1 Ghi macro trong trường hợp sử dụng tham chiếu địa chỉ ô tuyệt đối.
Thực hiện tạo 1 macro nhập tên tuổi, địa chỉ
* Trong View/Macro, chọn Record New Macro. 
* Trong Macro name: gõ Infor_user để đặt tên macro đó.
* Chuyển sang Shortcut key: để trống (sẽ thực hiện sau). 
* Trong Store macro in: để mặc định là This Workbook.
* Trong Description: bạn gõ nội dung sau "Enter Information User"
![](https://images.viblo.asia/0cd01a91-5d6c-446f-ac92-6d28929405ca.png)
* Bấm OK. 
* Thanh Stop Recording sẽ xuất hiện. Bạn có thể di chuyển nó đến vị trí khác nếu thấy cần thiết.
* Trong Sheet1, bấm vào B3 và gõ tên bạn. Ô ở dưới gõ tuổi, tiếp theo là địa chỉ. 
![](https://images.viblo.asia/45bd5a0b-416c-47fd-8010-cb14caf2eed5.png)
* Trong Stop Recording, bấm vào nút Stop Recording

Kết quả:
![](https://images.viblo.asia/5c57d7f4-cf90-4b0f-83f8-32250d85000d.png)

### 3.2 Chạy macro khi sử dụng bảng điều khiển macro (Macro dialog box) 
Bạn cho chạy macro trên từ Sheet2 như sau: 
* Chọn sang Sheet2 và bấm vào ô nào đó ngoài ô A1.
* Trong menu Tools/Macro, chọn Macros. 
* Bấm vào macro có tên Address_abs trong danh sách macro. 
* Bấm vào nút Run. 
![](https://images.viblo.asia/de52a26a-939a-4893-b685-bb8d93c396f5.png)
![](https://images.viblo.asia/69f0bd7a-b94a-4c61-9f81-ac73c6f54323.png)

### 3.3  Ghi macro trong trường hợp sử dụng tham chiếu địa chỉ ô tương đối
Macro Infor_user sử dụng địa chỉ ô tuyệt đối. Tiếp theo bạn sẽ tạo một macro cũng giống như trên. Macro trước đã chọn các ô (select cells) có quan hệ với vị trí của ô hoạt động (active) trong quá trình chạy, macro sẽ ghi lại quan hệ tham chiếu ô tương đối. 
Sự khác nhau của tham chiếu địa chỉ ô tương đối và địa chỉ ô tuyệt đối là:
Tham chiếu địa chỉ ô tuyệt đối:
```
    ActiveCell.Offset(7, 2).Range("A1").Select
    ActiveCell.FormulaR1C1 = "Phan Van Hieu"
```

 tham chiếu địa chỉ ô tương đối
```
    Range("B3").Select
    ActiveCell.FormulaR1C1 = "Phan Van Hieu"
```

Môt cách khác để thực hiện Recording tương đối và tuyệt đối là:
Để sử dụng tham chiếu tương đối trong suốt quá trình ghi macro, nút Relative Reference luôn sáng (có tác dụng). 
Để sử dụng tham chiếu tuyệt đối trong suốt quá trình ghi macro, nút Relative Reference luôn tối (không tác dụng). 
![](https://images.viblo.asia/b0f6c847-e564-408a-a85a-29ad3850be85.png)

### 3.4 Dùng phím tắt để thực hiện một macro (shortcut key) 
Macro Address_Ref có thể thực hiện như mô tả trong mục 3.2.
Lúc trước phím tắt đã được ấn định để thực hiện công việc đó, hãy sử dụng phương pháp thay thế này: 
* Tại Sheet2 bạn chọn vào 1 ô. 
* Ấn tổ hợp phím Ctrl+Shift+A (phím tắt khi tạo macro). Khi đó tên và địa chỉ sẽ xuất hiện dưới ô đó.
* Bạn hãy thử thực hiện lại macro đó tại các vị trí khác trong Sheet2.

## 4. Những lưu ý về macro
Khi bạn ghi macro đầu tiên, Excel tạo ra molule trong workbook đó. Module đó chứa các lệnh (code) được viết trong VBA. Để thấy được code bạn vào phần edit Macro
![](https://images.viblo.asia/4102642b-d226-48f6-931a-6e272ec788db.png)

Macro không thể thực hiện được các tác vụ sau:
* Các kiểu vòng lặp.
* Các kiểu hành động theo điều kiện (sử dụng If-Then)
* Gán giá trị cho biến.
* Các kiểu dữ liệu đặc biệt.
* Hiện các thông báo (pop-up messages).
* Hiện các hộp thoại (dialog boxes).