*[Google Apps Script](https://developers.google.com/apps-script) là một nền tảng phát triển ứng dụng giúp tạo các ứng dụng tích hợp với Google Workspace (Google Sheets, Google Docs, Google Slides…) một cách nhanh chóng và dễ dàng.*

Nếu *spreadsheet* của bạn gồm nhiều *sheet* và mỗi lần chuyển đổi qua lại giữa các *sheet* bạn gặp đôi chút khó khăn thì sao chúng ta không thử tạo [custom menu](https://developers.google.com/apps-script/guides/menus) để việc điều hướng được dễ dàng hơn.
# Khởi đầu
Giả sử bạn có 3 *sheet* với tên lần lượt là "Peter", "Tom" và "Lee". Chúng ta sẽ tạo một [custom menu](https://developers.google.com/apps-script/guides/menus) để mỗi khi nhấn vào tên *sheet* nào thì chỉ hiển thị *sheet* đó.

``` javascript
var names = ['Peter', 'Tom', 'Lee'];

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var nav = ui.createMenu('Navigate');

  names.forEach(function(name) {
    nav.addItem(name, name);
  })
  nav.addToUi();
}

function Peter() {
  SpreadsheetApp.getUi().alert('You call function: Peter');
}

function Tom() {
  SpreadsheetApp.getUi().alert('You call function: Tom');
}

function Lee() {
  SpreadsheetApp.getUi().alert('You call function: Lee');
}
```

Mỗi khi mở file thì hàm [onOpen()](https://developers.google.com/apps-script/guides/triggers#onopene) sẽ chạy và hiển thị [custom menu](https://developers.google.com/apps-script/guides/menus) "Navigate". Khi nhấn vào tên *sheet* thì hàm với tên tương ứng sẽ được gọi và hiển thị thông báo "**You call function…**" (để cho đơn giản thì phần này mình chỉ cho hiển thị *alert*, code hoàn chỉnh được bổ sung ở phần sau).

![](https://images.viblo.asia/b0f269ec-e1fa-4ea3-b6ae-4c263dad31d1.png)

![](https://images.viblo.asia/b329dc5c-3d86-4b62-8a52-4abdbe1094e5.png)

Với cách này thì chúng ta đã tạo được [custom menu](https://developers.google.com/apps-script/guides/menus) đáp ứng yêu cầu. Tuy nhiên, khi số lượng *sheet* cũng như tên *sheet* thay đổi thì chúng ta phải sửa lại code. Do đó, chúng ta sẽ thử viết lại code sao cho tự động lấy tên các *sheet* và tạo [custom menu](https://developers.google.com/apps-script/guides/menus) tương ứng.

# Tự động
Vì [custom menu](https://developers.google.com/apps-script/guides/menus) không cho [truyền tham số](https://stackoverflow.com/questions/51824783/how-to-pass-parameters-with-menu-items-in-apps-script) khi gọi hàm nên chúng ta sẽ tạo những hàm này bằng code với tên hàm là tên của các *sheet*. Chúng ta sẽ sử dụng từ khóa `this` để trỏ về biến toàn cục, sử dụng lệnh `forEach` để duyệt qua mảng các tên *sheet*. Chú ý, code tạo hàm động này không được nằm trong hàm [onOpen()](https://developers.google.com/apps-script/guides/triggers#onopene), nếu nằm trong [onOpen()](https://developers.google.com/apps-script/guides/triggers#onopene) thì từ khóa `this` lại trỏ về hàm [onOpen()](https://developers.google.com/apps-script/guides/triggers#onopene) chứ không phải là biến toàn cục.

``` javascript
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets = ss.getSheets();
var names = sheets.map(function(sheet) {
  return sheet.getName();
})

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var nav = ui.createMenu('Navigate');

  names.forEach(function(name) {
    nav.addItem(name, name);
  });

  nav.addToUi();
}

names.forEach(function(name) {
  this[name] = function() {
    SpreadsheetApp.getUi().alert(name);
    ss.getSheetByName(name).showSheet();
    
    var filteredNames = names.filter(function(item) {return item != name});
    filteredNames.forEach(function(disableSheet) {
      ss.getSheetByName(disableSheet).hideSheet();
    })
  }
})
```
Đoạn code `this[name] = function() {}` sẽ tạo ra các hàm (Peter(), Tom(), Lee()) giống như cách tạo hàm bằng tay ở trên, mặc dù lúc code chạy chúng ta không thấy các hàm này hiển thị ra. Khi click vào custom menu thì chúng ta sẽ thấy `alert` tên hàm được gọi.

Mỗi khi tên *sheet* thay đổi, chỉ cần chạy lại hàm [onOpen()](https://developers.google.com/apps-script/guides/triggers#onopene) thì custom menu "Navigate" cũng tự động thay đổi theo. Tuy nhiên, tên hàm thực thi việc chuyển đối *sheet* giống hệt tên *sheet* nên thỉnh thoảng sẽ phát sinh lỗi.
# Debug
Theo [quy tắc đặt tên hàm](https://www.w3schools.com/js/js_conventions.asp), nếu hàm có chứa khoảng trắng hoặc bắt đầu bằng số/ ký tự đặc biệt thì sẽ phát sinh lỗi. Do đó, nếu tên *sheet* có khoảng trắng (và một số trường hợp khác) thì khi chạy code sẽ báo lỗi **"Script function not found: Tom my".**

Để tránh phát sinh lỗi trường hợp này thì chúng ta sẽ thay tên *sheet* bằng *sheet id* để đặt tên hàm (*id* của mỗi *sheet* là duy nhất trong mỗi *spreadsheet*). Đồng thời gắn thêm *prefix* vì *sheet id* bắt đầu bằng số.

``` javascript
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheets = ss.getSheets();

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var nav = ui.createMenu('Navigate');

  sheets.forEach(function(sheet) {
    nav.addItem(sheet.getName(), 'vk' + sheet.getSheetId());
  });

  nav.addToUi();
}

sheets.forEach(function(sheet) {
  var id = sheet.getSheetId();
  this['vk' + id] = function() {
    SpreadsheetApp.getUi().alert(id);
    getSheetById(id).showSheet();

    var filteredSheets = sheets.filter(function(item) {
        return item.getSheetId() != id
    });
    filteredSheets.forEach(function(disableSheet) {
      getSheetById(disableSheet.getSheetId()).hideSheet();
    })
  }
})
```
Do biến *sheet* đã là 1 mảng các *sheet*, mỗi *sheet* là một object có chứa *sheetName* và *id* nên chúng ta không cần sử dụng mảng tên biến nữa (names). Bên cạnh đó, Apps Script chỉ hỗ trợ hàm `getSheetId()` mà chưa hỗ trợ hàm `getSheetById()` nên chúng ta cần viết hàm này.

``` javascript
function getSheetById(id) {
  return SpreadsheetApp.getActive().getSheets().filter(
    function(s) {return s.getSheetId() === id;}
    )[0];
}
```

# Hoàn thiện
Hiện tại, chúng ta mới chỉ cho hiển thị từng *sheet* một. Chúng ta sẽ thêm lệnh "Show all" trên custom menu để giúp người dùng hiển thị toàn bộ *sheet*.

``` javascript
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var nav = ui.createMenu('Navigate');

  nav.addItem('Show all', 'showAllSheet');
  nav.addSeparator();
  …
}

function showAllSheet() {
  sheets.forEach(function(sheet) {
    sheet.showSheet();
  })
}
```

Như vậy, chúng ta đã sử dụng Apps Script để tạo custom menu cho Google Sheets. Code được viết trong project bound với spreadsheet nên nếu muốn spreadsheet khác cũng hiển thị custom menu "Navigate" thì chỉ cần copy/ paste file code Custom_Menu.gs vào spreadsheet mới.

[Demo Google Sheets file](https://docs.google.com/spreadsheets/d/1UvqQL39B2kYHjs_7G0l5x383N92NVuy9WpKWs7iOAkw/edit?usp=sharing). [Full code tại Github.](https://github.com/ramboviking/apps-script-simplify-office-work/blob/56a5c7ecf46d331526e318a2bcf644adac364a34/Custom%20menu/Sheet_nav.md)