Ag-grid là một thư viện JavaScript mạnh mẽ trong việc hiển thị dữ liệu dưới dạng bảng, với vô vàn chức năng được support như Sort, search, edit, move columns, Pinned, ...
Trong bài này, mình xin được giới thiệu cách để nhúng DatePicker vào trong cell của table Ag-Grid
Hãy quan sát ví dụ demo dưới đây, chúng ta sẽ có 2 file:

index.html
```
 <!DOCTYPE html>
<html lang="en">
<head>
<script> var __basePath = ''; </script>
<style> html, body { margin: 0; padding: 0; height: 100%; } </style>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css"/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css"/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/ag-grid-enterprise@20.0.0/dist/ag-grid-enterprise.min.js"></script></head>
<body>

<div id="myGrid" style="height: 100%;" class="ag-theme-balham"></div>

    <script src="main.js"></script>
</body>
</html>
```
main.js

```
function getDatePicker() {
    // function to act as a class
    function Datepicker() {}

    // gets called once before the renderer is used
    Datepicker.prototype.init = function(params) {
        // create the cell
        this.eInput = document.createElement('input');
        this.eInput.value = params.value;

        // https://jqueryui.com/datepicker/
        $(this.eInput).datepicker({
            dateFormat: 'dd/mm/yy'
        });
    };

    // gets called once when grid ready to insert the element
    Datepicker.prototype.getGui = function() {
        return this.eInput;
    };

    // focus and select can be done after the gui is attached
    Datepicker.prototype.afterGuiAttached = function() {
        this.eInput.focus();
        this.eInput.select();
    };

    // returns the new value after editing
    Datepicker.prototype.getValue = function() {
        return this.eInput.value;
    };

    // any cleanup we need to be done here
    Datepicker.prototype.destroy = function() {
        // but this example is simple, no cleanup, we could
        // even leave this method out as it's optional
    };

    // if true, then this editor will appear in a popup
    Datepicker.prototype.isPopup = function() {
        // and we could leave this method out also, false is the default
        return false;
    };

    return Datepicker;
}

var columnDefs = [
    {headerName: 'Athlete', field: 'athlete'},
    {headerName: 'Date', field: 'date', editable: true, cellEditor: 'datePicker'},
    {headerName: 'Age', field: 'age'},
    {headerName: 'Country', field: 'country'},
    {headerName: 'Year', field: 'year'},
    {headerName: 'Sport', field: 'sport'},
    {headerName: 'Gold', field: 'gold'},
    {headerName: 'Silver', field: 'silver'},
    {headerName: 'Bronze', field: 'bronze'},
    {headerName: 'Total', field: 'total'}
];

var gridOptions = {
    components:{
        datePicker: getDatePicker()
    },
    columnDefs: columnDefs,
    rowData: null
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});
```
Phần code trông có vẻ khá dài và phức tạp, nhưng chúng ta chỉ cần tập chung vaò 3 vị trí mấu chốt sau:

- `function getDatePicker()`: function nàycó tác dụng khởi tạo các DatePicker, hiển thị lên giao diện, trong function có sử dụng thư viện jquery-ui( thư viện jquery-ui không phải là required, chúng ta có thể thay thế đoạn này bằng bất cứ thư viện DatePicker khác, ví dụ jquery.DatePicker)
- `{headerName: 'Date', field: 'date', editable: true, cellEditor: 'datePicker'}`: Setting type của cell và kích hoạt khả năng editAble
- gridOptions: Khởi tạo Options cài đặt Ag-grid, trong đó có add component Datepicker để khởi tạo DatePicker

Chúng ta cũng có thể thêm các custom 
- Đổi màu của DatePicker: (tùy vào theme của Jquery-ui)
- Thêm các options trong DatePicker như: Hiển thị bộ chọn Month, Year

**Để hiểu rõ cách sử dụng, bạn có thể dùng link demo sau:**

https://next.plnkr.co/edit/?p=preview&utm_source=legacy&utm_medium=worker&utm_campaign=next&preview