Intl.NumberFormat mặc dù được hỗ trợ trong những brower hiện đại để Javascript format giá tiền nhưng nếu một lúc nào đó devjs muốn viết cho bản thân mình or cho team một chức năng tương tự thì làm như thế nào? Bài dưới đây sẽ có những phương án rất đơn giản mà hiệu quả Javascript format giá tiền.
## Javascript format giá tiền với toFixed()
Ví dụ: 12345.67120398 trở thành 12,345.67. Chúng ta có thể làm đơn giản Kiểu tiền tệ trong JavaScript như ví dụ dưới đây.
```
var yourBalance = 2489.8237;
 
//returns 2489.824 (rounds up)
yourBalance.toFixed(3);
 
//returns 2489.82
yourBalance.toFixed(2);
 
//returns 2489.8237000 (pads the decimals)
yourBalance.toFixed(7);
```

## Định dạng tiền tệ trong JavaScript
Chúng ta có thể làm tương tự khi sử dụng **replace**, như demo dưới đây.
```
function format1(n, currency) {
  return currency + n.toFixed(2).replace(/./g, function(c, i, a) {
    return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
  });
}

function format2(n, currency) {
  return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}


var numbers = [1, 12, 123, 1234, 12345, 123456, 1234567, 12345.67];

for (var i = 0; i < numbers.length; i++) {
 console.log(format1(numbers[i], '£ '));
}

for (var i = 0; i < numbers.length; i++) {
 console.log(format2(numbers[i], 'vnd '));
}
```
Kết qủa:
```
Format #1:

£ 1.00
£ 12.00
£ 123.00
£ 1,234.00
£ 12,345.00
£ 123,456.00
£ 1,234,567.00
£ 12,345.67
Format #2:

vnd 1.00
vnd 12.00
vnd 123.00
vnd 1,234.00
vnd 12,345.00
vnd 123,456.00
vnd 1,234,567.00
vnd 12,345.67
```

## Hàm number_format trong JavaScript
Có một chức năng ECMAScript mới hơn được cung cấp bởi Internationalization API
```
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
 
// "$1,000.00"
formatter.format(1000);
 
// "$10.00"
formatter.format(10);
 
// "$1,234,567,890.00"
formatter.format(1234567890);
```