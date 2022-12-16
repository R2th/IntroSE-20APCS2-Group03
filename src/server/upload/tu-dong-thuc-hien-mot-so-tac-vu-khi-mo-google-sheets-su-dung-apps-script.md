*[Google Apps Script](https://developers.google.com/apps-script) là một nền tảng phát triển ứng dụng giúp tạo các ứng dụng tích hợp với Google Workspace (Google Sheets, Google Docs, Google Slides…) một cách nhanh chóng và dễ dàng.*

[Google Sheets](https://www.google.com/sheets/about/) là một dịch vụ bảng tính trực tuyến giúp bạn dễ dàng truy cập bất cứ lúc nào, ở bất kỳ nơi đâu và dễ dàng chia sẻ với nhóm của bạn. Do đặc tính cộng tác và cùng chỉnh sửa như vậy nên có thể mỗi lần mở *spreadsheet* thì bạn có thể hơi khó chịu vì *spreadsheet* hơi "bừa bộn". Bạn nhận ra rằng có một số thao tác lặp đi lặp lại mỗi lần mở *spreadsheet* để nó nhìn "đẹp mắt" hơn chẳng hạn như:
* Ẩn bớt các sheet không quan trọng.
* Ẩn bớt các column không cần thiết.
* Lọc và sắp xếp dữ liệu để tập trung vào data quan trọng.

Nếu bạn thấy nhàm chán với các công việc trên và muốn thực hiện tự động bằng code để lúc nào mở *spreadsheet* cũng gọn gàng, sạch đẹp thì bài này sẽ gợi ý cho bạn một số đoạn code để thực hiện một vài tác vụ phổ biến.

# Khởi động spreadsheet
Apps Script hỗ trợ sẵn hàm `onOpen()` theo kiểu [simpple trigger](https://developers.google.com/apps-script/guides/triggers). Code chứa bên trong `onOpen()` sẽ tự động chạy mỗi lần mở *spreadsheet*. Chúng ta sẽ gọi hàm` initSpreadsheet()` để thực thi định dạng cho *spreadsheet* bên  trong `onOpen()`.

``` javascript
function onOpen() {
  initSpreadsheet();
}

function initSpreadsheet() {
  applyHideSheet();
  applyHideColumn();
  applyFilter();
  applySort();
  SpreadsheetApp.getActiveSpreadsheet().toast('Your spreadsheet 's ready.');
}
```

Hàm thực thi định dạng *spreadsheet* như `appHideSheet()`, `applyHideColumn()`… sẽ được gọi bên trong hàm `initSpreadsheet()` mà không được đặt trực tiếp trong `onOpen()`. Điều này giúp người khác đọc code dễ hiểu hơn, các lệnh chung 1 mục đích được gom nhóm lại bên trong hàm `initSpreadsheet()`. Nếu sau này cần chạy thêm các lệnh khác khi mở *spreadsheet* thì thêm trong `onOpen()`. Ngoài ra, sau khi đã thực thi xong các hàm định dạng *spreadsheet* thì chạy hàm `toast` để thông báo cho người dùng.

# Ẩn sheet
Các sheet không quan trọng sẽ được ẩn đi, đồng thời show các sheet cần thiết. Chúng ta viết lại hàm `applyHideSheet()` trong đó thêm vào 2 tham số là mảng các *sheet* cần ẩn và cần hiện.

``` javascript
function initSpreadsheet() {
  var workingSheetName = ['ResponseSheet', 'ArchiveSheet']; // Array of sheets name
  var hiddenSheetName = ['SampleData', 'Sheet4']; 
  applyHideSheet(workingSheetName, hiddenSheetName);
  …
  }
```

Dưới đây là đoạn code để ẩn các *sheet* không quan trọng.

``` javascript
function applyHideSheet(workingSheetName, hiddenSheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (i=0; i<workingSheetName.length; i++) {
    ss.getSheetByName(workingSheetName[i]).showSheet();
  }
  for (i=0; i<hiddenSheetName.length; i++) {
    ss.getSheetByName(hiddenSheetName[i]).hideSheet();
  }
}
```

*Apps Script* sẽ báo lỗi (*throw exception*) nếu chúng ta ẩn tất cả các *sheet*. Do đó, đoạn code `showSheet()` nên chạy trước `hideSheet()`. Nếu một *sheet* đã hiển thị mà chạy lệnh `showSheet()` thì vẫn sẽ không báo lỗi nên chúng ta không cần kiểm tra trạng thái của *sheet* đó là đang ẩn (hay hiển thị) trước khi chạy lệnh.

# Ẩn cột
Tương tự như trên, chúng ta sẽ truyền tham số đầu vào cho hàm `applyHideColumn()` là một mảng các cột cần ẩn dưới dạng ký tự (B, E, G…).
 
 ``` javascript
function initSpreadsheet() {
  …
  var columnName = ['B', 'D']; // Array of Column (by leter) need to hide
  applyHideColumn(columnName);
  …
  }

function applyHideColumn(columnName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ResponseSheet');

  for (i=0; i<columnName.length; i++) {
    sheet.hideColumn(sheet.getRange(columnName[i] + ':' + columnName[i]));
  }
}
```

# Lọc giá trị
Để lọc giá trị cần có số thứ tự của cột cần áp dụng bộ lọc và các điều kiện lọc. Do điều kiện lọc khá phức tạp nên hàm này không truyền tham số vào mà sẽ được viết trực tiếp vào trong code luôn.

``` javascript
function initSpreadsheet() {
  …
  applyFilter();
  …
}

function applyFilter() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ResponseSheet');
  var range = sheet.getDataRange();
  if (sheet.getFilter()===null) {range.createFilter()};
  var criteria = SpreadsheetApp.newFilterCriteria()
    .whenNumberGreaterThan(3)
    .build();
  sheet.getFilter().setColumnFilterCriteria(3, criteria);
}
```

Ở trên là đoạn code mẫu lọc các dòng có giá trị lớn hơn 3 ở cột số 3, nếu bạn cần lọc với điều kiện khác thì chỉnh sửa lại đoạn code trên.

# Sắp xếp giá trị
Sau khi đã lọc giá trị thì chúng ta tiến hành sắp xếp dữ liệu theo thứ tự tăng dần (hoặc giảm dần) của một cột.  Tham số truyền vào là số thứ tự của cột và kiểu sắp xếp tăng dần.

``` javascript
function initSpreadsheet() {
  …
  var columnPosition = 3;
  var isAscending = true;
  applySort(columnPosition, isAscending);
  …
}

function applySort(columnPosition, isAscending) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('ResponseSheet');
  var range = sheet.getDataRange();
  if (sheet.getFilter()==null) {range.createFilter()}
  var filter = sheet.getFilter();
  var isAscending = true;
  filter.sort(columnPosition, isAscending);
}
```
Code sắp xếp giá trị có thể được viết chung với hàm lọc giá trị ở trên bằng (đều sử dụng *class Filter*) nhưng tách riêng ra thành 2 hàm cho dễ đọc.
# Thông báo
Cuối cùng, chúng ta dùng hàm `toast` để thông báo cho người dùng biết *speadsheet* đã sẵn sàng để sử dụng.

``` javascript
function initSpreadsheet() {
  …
  SpreadsheetApp.getActiveSpreadsheet().toast('Your spreadsheet 's ready.');
}
```



-----


Như vậy chúng ta đã tự động định dạng *spreadsheet* mỗi khi mở file thông qua đoạn code ở trên. Nhưng nếu chúng ta mở file khi có một thành viên khác đang thao tác trên file thì code vẫn chạy và có thể gây khó chịu cho đồng đội của chúng ta. Hiện tại, *Apps Script* chưa hỗ trợ để nhận diện có ai đang mở file hay không nên chưa có phương pháp để ngăn ngừa tình trạng này. Bạn có thể sử dụng chức năng filter view của *Google Sheets* để tạo nhiều view độc lập với nhau. Khi đó, view của người khác sẽ không ảnh hưởng đến view của bạn.