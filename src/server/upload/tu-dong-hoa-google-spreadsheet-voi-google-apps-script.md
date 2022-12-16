Khi sử dụng Google SpreadSheet, đôi khi chúng ta phải lưu trữ rất nhiều thông tin và thực hiện các tác vụ phức tạp. Trong bài này, mình sẽ giới thiệu 2 phương pháp giúp tự động hóa Google SpreadSheet, để chúng ta có thể sử dụng nó một cách chuyên nghiệp, tiện lợi hơn.

2 phương pháp sau đây sẽ sử dụng Google Apps Script. Vậy trước hết mình sẽ giới thiệu qua về Google Apps Script.
## **1. Giới thiệu về Google Apps Script**
Google Apps Script là ngôn ngữ lập trình dựa trên Javascript, với trình biên tập, biên dịch nằm trên máy chủ của google. Do đó, nó rất tiện lợi để có thể tạo các ứng dụng web nhẹ.
Chúng ta có thể mở trình biên tập Google Apps Script trên Google SpreadSheet bằng cách chọn Tool -> Script Editor.

Một số điều Google Apps Script có thể làm:
+  Custom menu, popup cho Google Docs, Google Sheets, Google Forms.
+ Viết custom function cho Google Sheets.
+ Tương tác giữa Google Sheets với các dịch vụ khác của Google như: Google Drive, Gmail, Google Slide,....

Và nhiều điều khác nữa…

Sau đây, mình sẽ giới thiệu phương pháp tự động hóa Google SpreadSheet bằng cách sử dụng hàm Trigger của Google Apps Script và phương pháp chạy Cronjob. 
## **2. Một số loại hàm Triggers**
+ onOpen(e) : tự động chạy khi chúng ta mở bảng tính. (Người mở phải có quyền chỉnh sửa).
+ onInstall(e): tự động chạy khi chúng ta cài đặt Editor Add-on.
+ onEdit(e):  tự động chạy khi chúng ta thay đổi giá trị trong bảng tính.
+ onSelectionChange(e): tự động chạy khi chúng ta thay đổi selection trong bảng tính.
+ doGet(e): tự động chạy khi chúng ta mở một web app hoặc chương trình gửi HTTP GET request đến web app.
+ doPost(e): tự động chạy khi chương trình gửi HTTP POST request đến web app.

Sau đây mình sẽ làm một ví dụ với hàm doEdit()
### Bài toán
Chúng ta đang lập danh sách những đồ cần mua cho chuyến đi picnic sắp tới. Nội dung file như sau:
![](https://images.viblo.asia/7c8de8e8-500f-4725-9d13-913a4cbd6f96.png)
Để thuận tiện cho việc tính toán số tiền tiêu tốn, chúng ta muốn sheet tự động tính tổng giá tiền những món đã được chọn.
### Hướng giải quyết
Dùng hàm onEdit() để kiểm tra sự thay đổi của cột C. Khi cột C có thay đổi, kiểm tra nếu checkbox của ô đang thao tác được check thì lấy giá trị ô bên trái nó (ô giá tiền) và cộng vào Tổng tiền. Ngược lại, nếu checkbox không được check thì lấy Tổng tiền trừ đi giá tiền món đồ đó.
### Code
```javascript
function onEdit() {
  //Lấy ra file SpreadSheet đang thao tác
  var activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  //Lấy ra sheet đang thao tác
  var activeSheet = activeSpreadSheet.getActiveSheet();
  //Lấy ra ô đang được chọn
  var activeRange = SpreadsheetApp.getActiveRange();
  //Lấy ra cột của ô đó
  var activeColumn = activeRange.getColumn();
  //Khi ô được chọn thuộc cột 3 (Cột checkbox)
  if(activeColumn == 3){
    //Lấy ra hàng của ô đó
    var activeRow = activeRange.getRow();
    //Giá tiền của đồ được chọn là giá trị của ô bên trái ô này
    var price = SpreadsheetApp.getActiveSheet().getRange(activeRow,activeColumn-1).getValue();
    //Tổng giá tiền là giá trị của ô E2
    var sumCell = activeSheet.getRange("E2");
    var sumValue = sumCell.getValue();
    //Nếu checkbox được check thì + giá tiền vào sum, và ngược lại
    if(activeRange.isChecked()){
      sumValue += price;
    }else{
      sumValue -= price;
    }
    //Ghi lại giá trị sum vừa tính được vào ô E2 
    sumCell.setValue(sumValue);
   }
}
```
Lưu lại, nhập tên Project và chọn Run. Lần đầu chạy thì Google sẽ yêu cầu xác minh. Sẽ có cảnh báo an toàn nhưng không sợ đâu, code mình tự viết mà :D 

Cuối cùng thì quay lại sheet và tận hưởng thành quả nào.
![](https://images.viblo.asia/ae606172-3170-4e47-b82f-2e0360dcd69b.png)
## 3. Cronjob
### Bài toán 
Chúng ta tạo 1 file SpreadSheet để quản lý thông tin giá BTC. Giá BTC được lấy về bằng việc gọi API. Vì giá BTC biến động liên tục nên chúng ta muốn hệ thống tự chạy hàm lấy giá BTC theo một chu kì cố định, nhờ vậy giá BTC trong file sẽ luôn được cập nhật.

Nội dung file sheet sẽ có dạng như sau:
![](https://images.viblo.asia/65b43ab0-6645-486b-b4db-abda79b52dd4.png)

### Code
```javascript
function btc_price(){
  var url = "https://api.coinbase.com/v2/prices/spot?currency=USD";
  var rsp = UrlFetchApp.fetch(url);
  var json = JSON.parse(rsp.getContentText());

  return json.data.amount;
}
```
Viết hàm trên vào trong Script editor, sau đó gọi hàm btc_price trong bảng tính để lấy giá BTC ở thời điểm hiện tại.
![](https://images.viblo.asia/6f94c7f4-8592-4b83-a320-bf1396db589b.png)
Nếu chỉ thế này thôi thì giá BTC sẽ không được cập nhật mỗi khi ta vào lại. Để nó tự động lấy giá trị mới nhất thì ta sẽ cho hàm btc_price chạy cronjob theo các bước dưới đây.
### Tạo Cronjob
B1: Nhấn vào biểu tượng Current project's triggers (Các kích hoạt của dự án hiện tại)
![](https://images.viblo.asia/58eff54e-22f0-4c34-b484-2de46ca6944e.png)
B2: Nhấn vào Add Trigger (Thêm trình kích hoạt) ở bên dưới màn hình.
Chọn hàm chạy là btc_price, chọn thời gian chạy hàm tùy theo nhu cầu. Như trong hình bên dưới thì mình cho hàm chạy vào khoảng từ 0h-1h mỗi ngày.

![](https://images.viblo.asia/b12cbdf0-9736-43d0-8f5b-835216850355.png)

Như vậy là đã tạo xong Cronjob. Hàm được chọn sẽ tự động chạy theo thời gian được cài đặt.
## Kết
Trên đây là 2 phương pháp giúp chúng ta sử dụng spreadsheet tiện lợi, chuyên nghiệp hơn. Ngoài 2 phương pháp trên, Google Apps Script còn rất nhiều ứng dụng thú vị khác. Nếu có thời gian hãy tìm hiểu thêm nhé. 

Cảm ơn mọi người đã theo dõi. :D

Tài liệu tham khảo:
+ https://developers.google.com/apps-script/guides/triggers
+ https://developers.google.com/apps-script/reference/spreadsheet/sheet
+ https://viblo.asia/p/viet-mot-ung-dung-chat-bot-nhac-lich-hoc-chua-bao-gio-de-dang-den-the-voi-google-script-63vKjkJkZ2R
+ https://hocggsheet.com/gioi-thieu-trigger-app-script-onedit-onopen/