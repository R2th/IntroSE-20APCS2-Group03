Jquery EasyAutocomplete là một thư viện gợi ý khi gõ từ trong input. Ví dụ khi bạn gõ "Java" nó sẽ gợi ý cho bạn từ "JavaScript".
Để sử dụng thư viện này đầu tiên bạn phải import thư viện JS và CSS.
```
<!-- JS file -->
<script src="path/to/jquery.easy-autocomplete.min.js"></script> 

<!-- CSS file -->
<link rel="stylesheet" href="path/to/easy-autocomplete.min.css"> 

<!-- Additional CSS Themes file - not required-->
<link rel="stylesheet" href="path/to/easy-autocomplete.themes.min.css"> 
```
Các file cần để import có thể download tại [đây](http://easyautocomplete.com/download)
### Cách sử dụng
EasyAutocomplete có thể dùng được với nhiều dạng data.
* data là array
```
// HTML
<input id="basics" />
```
```
//Javascript:
var options = {
    data: ["blue", "green", "pink", "red", "yellow"]
};
$("#basics").easyAutocomplete(options);
```
* data dạng json
```
//HTML
<input id="provider-json" />
```
```
//Javascript:
var options = {
    data: [ 
      {"name": "Afghanistan", "code": "AF"}, 
      {"name": "Aland Islands", "code": "AX"}, 
      {"name": "Albania", "code": "AL"}, 
      {"name": "Algeria", "code": "DZ"}, 
      {"name": "American Samoa", "code": "AS"}, 
     ],
    getValue: "name",
    list: {
        match: {
            enabled: true
        }
    }
};
$("#provider-json").easyAutocomplete(options);
```
* data dạng xml

`countries.xml`
```
<?xml version="1.0" encoding="utf-8"?>
<countries>
    <country>
        <name>Afghanistan</name><iso>AF</iso>
    </country>
    <country>
        <name>Aland Islands</name><iso>AX</iso>
    </country>
    <country>
        <name>Albania</name><iso>AL</iso>
    </country>
    <country>
        <name>Algeria</name><iso>DZ</iso>
    </country>
    <country>
        <name>American Samoa</name><iso>AS</iso>
    </country>
</countries>
```
```
//HTML
<input id="provider-xml" />
```
```
//Javascript
var options = {
    url: "resources/countries.xml",
    dataType: "xml",
    xmlElementName: "country",
    getValue: function(element) {
        return $(element).find("name").text();
    },
    list: {
        match: {
            enabled: true
        }
    }
};
$("#provider-xml").easyAutocomplete(options);
```
### Các thuộc tính của EasyAutocomplete
* Match phrase

Nếu giá trị `match` là `enable` có nghĩa là chỉ hiển thị kết quả tìm kiếm nào match với giá trị của input field đã nhập.
* sort

Giá trị default của sort là `disabled`. Nếu set là `enable` thì kết quả trả về sẽ được sắp xếp theo thứ tự của bảng chữ cái.
* List size

giới hạn số kết quả hiển thị
* Request data delay

Delay request rất cần thiết để tránh trường hợp request lấy data rất nhiều lần. Giá trị defaut của request delay là 0. Ví dụ: nếu set `requestDelay: 1000` (delay 1000ms), lúc này thay vì gọi request mỗi lần gõ trong input thì request sẽ được gọi sau khi nhập chữ 1000ms. Nếu bạn gõ nhanh thì lúc bạn dừng lại mới gọi request.
* Highlight

Highlight cụm từ match với giá trị input đã nhập. Giá trị mặc định là true.
* Placeholder

Giá trị của input placeholder
```
//HTML
<input id="match" />
```
```
#Javascript
var options = {
    data: ["Clark Kent", "Diana Prince", "Tony Stark", "Bruce Wayne", "Selina Kyle"],
    list: {
        match: {
            enabled: true
        },
        sort: {
            enabled: true
        },
        maxNumberOfElements: 10,
        highlightPhrase: false,
        placeholder: "Set up placeholder value"
    },
    requestDelay: 500
};
$("#match").easyAutocomplete(options);
```
Ngoài ra EasyAutocomplete còn có cung cấp các event, function và template. Bạn có thể tham khảo thêm tại đây [EasyAutocomplete](http://easyautocomplete.com/guide)