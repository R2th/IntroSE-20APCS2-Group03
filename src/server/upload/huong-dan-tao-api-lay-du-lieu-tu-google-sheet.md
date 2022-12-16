Hôm trước mình có viết 1 bài [Hướng dẫn tạo API ghi dữ liệu lên google sheet](https://viblo.asia/p/huong-dan-tao-api-ghi-du-lieu-len-google-sheet-1Je5EPRYlnL), thì nay mình tiếp tục chia sẻ cho mọi người cách để `lấy dữ liệu từ google sheet thông qua api`. Bài toán hôm nay của mình là muốn lấy thông tin thành viên của dự án trên google sheet để xử lý 1 số tác vụ bằng code, thông tin nhạy cảm nên mình sẽ dùng dữ liệu demo thôi nhé mọi người.

### Thiết lập google sheet
Đầu tiên chúng ta cần  tạo 1 trang google sheets, bạn nào có rồi có thể bỏ qua bước này, truy cập đường dẫn: https://docs.google.com/spreadsheets/ sẽ mở trang google sheet giao diện như bên dưới sau đó chọn "Blank"

![](https://images.viblo.asia/7170fba5-4ef7-4500-a586-de37cd14c80a.png)

Sau khi tạo trang google sheets xong, chúng ta thêm dữ liệu vào sheet như ảnh dưới (vị trí để giống mình là được còn màu thì mình thêm vào để highlight thôi chứ không cần)

![](https://images.viblo.asia/e98d083b-97cb-4d93-8426-fde55d7d1cc6.png)


### Thiết lập google script
Thêm dữ liệu vào sheet xong chúng ta sẽ đi viết script để lấy dữ liệu ra, mình sẽ lấy toàn bộ nội dung bôi đỏ ở ảnh trên, trên thanh công cụ chọn Tools -> Script editor

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

        var row = 2;
        var column = 3;
        var numRows = 4;
        var numColumns = 1;
      
        var values = sheet.getRange(row, column, numRows, numColumns).getValues();
      
        var names = [];
      
        for (var row in values) {
            if (values[row][0]) {
                names.push(values[row][0]);
            }
        }
      
        var content = {
            "names": names,
        };

        return ContentService
            .createTextOutput(JSON.stringify({"result": "success", "content": content}))
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

SHEET_NAME chính là tên của sheet bên trang google sheet, mặc định khi tạo mới sẽ là "Sheet1"

![](https://images.viblo.asia/fe5800e7-a395-43d2-97eb-e27d2b10d90b.png)

Để lấy giá trị mình dùng hàm [getRange](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns), hàm này nhận vào 4 tham số
- row: hàng bắt đầu
- column: cột bắt đầu
- numRows: số hàng muốn lấy
- numColumns: số cột muốn lấy

![](https://images.viblo.asia/e98d083b-97cb-4d93-8426-fde55d7d1cc6.png)

Bài toán của mình là lấy từ cột C2 đến C5 (phần bôi màu đỏ trên sheet) thì sẽ truyền vào hàm [getRange](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns) lần lượt là
- row = 2 (lấy từ giá trị A nên hàng bắt đầu sẽ bằng 2)
- column = 3 (lấy giá trị ở cột C tương ứng sẽ là 3)
- numRows = 4 (mình muốn lấy hàng 2, 3, 4, 5 nên số hàng sẽ bằng 4)
- numColumns = 1 (mình chỉ muốn lấy nguyên cột C nên số cột bằng 1)

Lấy dữ liệu bằng hàm [getRange](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getrangerow,-column,-numrows,-numcolumns) thì mảng trả về sẽ có dạng như dưới, mọi người dùng cú pháp ngôn ngữ `javascript` để xử lý mảng theo ý mình mong muốn nhé
```js
values = [
    ['A'],
    ['B'],
    ['C'],
    ['D'],
];
```
Ở trên thì mình xử lý như sau
```js
var row = 2;
var column = 3;
var numRows = 4;
var numColumns = 1;

var values = sheet.getRange(row, column, numRows, numColumns).getValues();
      
var names = [];
      
for (var row in values) {
    if (values[row][0]) {
        names.push(values[row][0]);
    }
}
```

Ngoài ra có rất nhiều hàm hỗ trợ lấy dữ liệu từ sheet, mọi người có thể đọc thêm ở đây: [Google Apps Script](https://developers.google.com/apps-script/reference/spreadsheet/sheet)

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

Deploy xong sẽ nhận được URL

![](https://images.viblo.asia/6c2f755e-de09-4905-8f82-7cdf6c9766a4.png)

Sao chép URL và dán vào trình duyệt sẽ nhận được kết quả như dưới

![](https://images.viblo.asia/dc6fac48-3ca8-460a-9a42-ae0cda076c00.png)

Sau khi đã có URL từ google sheet mọi người chỉ cần xây dựng chức năng ở ứng dụng của mình và đó gọi URL bằng phường thức GET là nhận dữ liệu ok nhé.

### Nguồn tham khảo
- https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175
- https://gist.github.com/willpatera/ee41ae374d3c9839c2d6

### Đọc thêm
- [Hướng dẫn tạo API ghi dữ liệu lên google sheet](https://viblo.asia/p/huong-dan-tao-api-ghi-du-lieu-len-google-sheet-1Je5EPRYlnL)
- [Google Apps Script](https://developers.google.com/apps-script/reference/spreadsheet/sheet)