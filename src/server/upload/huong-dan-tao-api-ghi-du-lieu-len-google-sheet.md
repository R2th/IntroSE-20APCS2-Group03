Ở dự án, gần đây mình có được giao 1 task liên quan đến việc lưu giữ liệu lên google sheet sau khi khách hàng merged pull request để thực hiện tính toán và báo cáo lên cấp trên hoặc lấy ví dụ với các bạn đã quá quen việc sử dụng google form nhưng không muốn sử dụng giao diện của google mà muốn tạo riêng 1 form html theo ý mình sau đó lưu lại các phản hồi lên google sheet thì bên google sheet lại không có sẵn api để mình sử dụng nên chúng ta sẽ phải tự xây dựng api để ghi dữ liệu. Trong bài này mình sẽ chia sẻ cho mọi người 1 cách đơn giản để xây dựng api push dữ liệu từ nguồn nào đó vào google sheet.

### Thiết lập google sheet
Đầu tiên chúng ta cần  tạo 1 trang google sheets, bạn nào có rồi có thể bỏ qua bước này, truy cập đường dẫn: https://docs.google.com/spreadsheets/ sẽ mở trang google sheet giao diện như bên dưới sau đó chọn "Blank"

![](https://images.viblo.asia/7170fba5-4ef7-4500-a586-de37cd14c80a.png)

### Thiết lập google script
Sau khi đã có 1 trang google sheet chúng ta sẽ đi viết script để ghi dữ liệu, trên thanh công cụ chọn Tools -> Script editor

![](https://images.viblo.asia/7c61b304-c913-4b1e-a5a4-49592d2b0399.png)

Trình duyệt sẽ mở 1 tab google script

![](https://images.viblo.asia/30fca60f-1697-470f-adcf-d9661f3833f6.png)

Thay đoạn code trong phần Code.gs thành nội dung sau

```js
function doGet(e) {
    return handleResponse(e);
}

var SHEET_NAME = "Sheet1";

var SCRIPT_PROP = PropertiesService.getScriptProperties();

function handleResponse(e) {
    var lock = LockService.getPublicLock();
    lock.waitLock(30000);

    try {
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
        var sheet = doc.getSheetByName(SHEET_NAME);

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1;
        var row = [];

        for (i in headers) {
            row.push(e.parameter[headers[i]]);
        }

        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

        return ContentService
            .createTextOutput(JSON.stringify({"result": "success", "row": nextRow}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({"result": "error", "error": e}))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
```

Chú ý biến SHEET_NAME chính là tên của sheet bên trang google sheet, mặc định khi tạo mới sẽ là "Sheet1"

![](https://images.viblo.asia/fe5800e7-a395-43d2-97eb-e27d2b10d90b.png)

Lưu tập lệnh lại, chọn File -> Save

![](https://images.viblo.asia/4526a58b-4767-4f62-9749-09322002f8fa.png)

Chọn OK

![](https://images.viblo.asia/fd901c42-d4ba-4168-9468-ec247d43959d.png)

Bước tiếp theo cần cấp quyền cho google script sử dụng tài khoản, chọn Run -> Run function -> setup

![](https://images.viblo.asia/8a1b6170-4c1b-4b10-a943-7cd363578afb.png)

Chọn Review Permissions

![](https://images.viblo.asia/1955120f-1a82-4a87-a222-813f96b219e5.png)

Trình duyệt sẽ mở 1 cửa sổ mới, chọn vào tài khoản mình sẽ cấp quyền
![](https://images.viblo.asia/2ec11a61-ee91-4577-b870-b077e70893f4.png)

Chọn Allow
![](https://images.viblo.asia/ffb7f86d-04a1-4e74-8b70-5ba9b4164ce3.png)

Sau khi đã cấp quyền cho tài khoản bước tiếp theo chúng ta sẽ thực hiện lấy URL, chọn Publish -> Deploy as web app

![](https://images.viblo.asia/5eda258f-7267-46fe-b22c-e1a1051ac4d9.png)

Phần Who has access to the app thay đổi từ "Only myself" thành "Anyone, even anonymous" sau đó chọn Deploy

![](https://images.viblo.asia/64348586-f07c-4104-a782-7c4d60d8a503.png)

Copy URL và note lại để sử dụng cho việc push data

![](https://images.viblo.asia/6c2f755e-de09-4905-8f82-7cdf6c9766a4.png)

### Ánh xạ google script qua google sheet
Viết xong phần script rồi chúng ta sẽ quay lại phần google sheet sửa như sau để kiểm tra xem việc ghi dữ liệu đã hoạt động chưa

- Ở hàng 1 thêm 2 giá trị là field_1 và field_2
- Giá trị đặt là gì cũng được nhưng phải tuân theo quy tắc đặt tên biến ở các ngôn ngữ lập trình, thứ tự cũng thế đặt ở đâu cũng được miễn là ở hàng 1

    ![](https://images.viblo.asia/4bbcf994-808f-4e78-b6bf-ed9b35ee4291.png)

- Copy URL (tạo ở phần google script) và thêm vào 1 đoạn như dưới sau đó ném lên trình duyệt ấn Enter chạy thử
    ```
    ?field_1=123&field_2=456
    ```
- Ở màn hình trình duyệt hiển thị như dưới là đã thêm dữ liệu thành công, row chính là số dòng đã thêm vào google sheet
    ![](https://images.viblo.asia/fea6256c-81ea-473d-8925-974141fcf34f.png)

- Quay lại google sheet kiểm tra kết quả

    ![](https://images.viblo.asia/39c426c2-7f6e-4d25-97c4-05864bf7df99.png)

Sau khi đã kiểm tra việc ghi dự liệu thành công giờ mọi người chỉ cần xây dựng chức năng xử lý dữ liệu ở ứng dụng của mình sau đó gọi URL (tạo ở phần google script) bằng phường thức GET và truyền tham số vào sao cho tương ứng với giá trị đặt ở dòng 1 trong google sheet là ok. Phía dưới là 1 ví dụ trong ngôn ngữ javascript (sử dụng thư viện jQuery), các ngôn ngữ khác tương tự mọi người google thêm nhé.

```js
var url = 'https://script.google.com/macros/s/abcdefghijklmnopqrstuvwxyz1234567890/exec';

var data = {
    field_1: 123,
    field_2: 456
};

$.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: data
});
```


### Nguồn tham khảo
- https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
- https://gist.github.com/willpatera/ee41ae374d3c9839c2d6

### Đọc thêm
- [Hướng dẫn tạo API lấy dữ liệu từ google sheet](https://viblo.asia/p/huong-dan-tao-api-lay-du-lieu-tu-google-sheet-maGK70zxZj2)
- [Google Apps Script](https://developers.google.com/apps-script/reference/spreadsheet/sheet)