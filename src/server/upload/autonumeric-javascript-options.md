Phần trước mình có giới thiệu về [autoNumeric](https://viblo.asia/p/autonumeric-javascript-V3m5WPVgKO7) 
và tiếp tục bây giờ mình sẽ viết tiếp về các option của autoNumeric.

Có rất nhiều option để tùy chỉnh theo ý của mình, sau đây là một số oprion chính nhé


| Option | Mô tả | Giá trị mặc định |
| -------- | -------- | -------- |
| `allowDecimalPadding`| Xác định xem các vị trí thập phân có nên được đệm bằng các số 0 hay không|`true`|
| `alwaysAllowDecimalCharacter`|Xác định xem ký tự thập phân hoặc ký tự thập phân thay thế có được chấp nhận hay không khi đã có một ký tự thập phân được hiển thị trong phần tử.|`false`|
| `caretPositionOnFocus`|Xác định vị trí nên đặt dấu mũ trên tiêu điểm|`null`|
| `createLocalList`|Xác định xem có nên giữ một danh sách cục bộ các đối tượng AutoNumeric khi khởi tạo đối tượng này hay không.|`true`|
| `currencySymbol`|Xác định chuỗi ký hiệu tiền tệ.|`''`|
| `currencySymbolPlacement`|Xác định nơi ký hiệu tiền tệ sẽ được đặt (trước sau các số)|`'p'`|
| `decimalCharacter`|Xác định ký tự phân tách thập phân nào được sử dụng|`'.'`|
| `decimalCharacterAlternative`|Cho phép khai báo dấu phân tách thập phân thay thế được tự động thay thế bằng `decimalCharacter` khi được nhập|`null`|
| `decimalPlaces`|Xác định số vị trí thập phân mặc định để hiển thị trên giá trị được định dạng và giữ cho độ chính xác|`2`|
| `decimalPlacesRawValue`|	Xác định số lượng chữ số thập phân nên được giữ cho giá trị thô rawValue|`null`|
| `decimalPlacesShownOnBlur`|Xác định số vị trí thập phân sẽ được hiển thị khi phần tử không tập trung|`null`|
| `decimalPlacesShownOnFocus`|Xác định số vị trí thập phân sẽ được hiển thị khi phần tử có tiêu điểm|`null`|
| `defaultValueOverride`|	Tùy chọn người trợ giúp cho đăng lại Asp.net|`null`|
| `digitalGroupSpacing`|	Xác định bao nhiêu số nên được nhóm lại với nhau|`'3'`|
| `digitGroupSeparator`|	Xác định ký tự phân cách nhóm nghìn|`','`|
| `divisorWhenUnfocused`|	Số phân chia giá trị phần tử trên tiêu điểm|`null`|
| `emptyInputBehavior`|Xác định những gì sẽ được hiển thị trong phần tử nếu giá trị thô là một chuỗi trống ' '|`'focus'`|
| `eventBubbles`|	Xác định xem các sự kiện tùy chỉnh và tự nhiên do AutoNumeric kích hoạt có nên nổi lên hay không|`true`|
| `eventIsCancelable`|	Xác định xem có thể hủy các sự kiện tùy chỉnh và sự kiện gốc do AutoNumeric kích hoạt hay không|`true`|
| `failOnUnknownOption`|Tùy chọn này là "chế độ nghiêm ngặt" của AutoNumeric (hay còn gọi là chế độ 'gỡ lỗi') , cho phép AutoNumeric phân tích chặt chẽ các tùy chọn do người dùng đưa ra và không thành công nếu một tùy chọn không xác định được sử dụng trong đối tượng cài đặt|`false`|
| `formatOnPageLoad`|Xác định xem giá trị mặc định sẽ được định dạng khi khởi tạo|`true`|
| `formulaMode`|Xác định xem người dùng có thể kích hoạt chế độ công thức hay không|`false`|
| `historySize`|Đặt kích thước bảng lịch sử hoàn tác / làm lại|`20`|
| `isCancellable`|Cho phép người dùng hủy và hoàn tác các thay đổi anh ta đã thực hiện đối với phần tử được quản lý bằng số tự động nhất định, bằng cách nhấn Escapephím|`true`|
| `leadingZero`|	Kiểm soát hành vi số 0 hàng đầu|`deny`|
| `maximumValue`|	Xác định giá trị tối đa có thể mà người dùng có thể nhập|`'10000000000000'`|
| `minimumValue`|	Xác định giá trị tối thiểu có thể mà người dùng có thể nhập|`'-10000000000000'`|
| `modifyValueOnWheel`|Cho phép người dùng tăng hoặc giảm giá trị phần tử bằng con lăn chuột|`true`|
| `negativeBracketsTypeOnBlur`|Thêm các ký tự giống như dấu ngoặc nhọn vào các giá trị âm khi không tập trung|`null`|
| `negativePositiveSignPlacement`|	Vị trí của dấu âm / dương liên quan đến currencySymboltùy chọn|`null`|
| `negativeSignCharacter`|Xác định ký hiệu dấu âm để sử dụng|`'-'`|
| `noEventListeners`|Xác định xem phần tử có nên kích hoạt trình nghe sự kiện trên đó không|`false`|
| `onInvalidPaste`|Quản lý cách AutoNumeric phản ứng khi người dùng cố gắng dán một số không hợp lệ|`'error'`|
| `outputFormat`|Xác định cách định dạng giá trị khi muốn có phiên bản bản địa hóa của nó|`'string'`|
| `overrideMinMaxLimits`|Ghi đè giới hạn tối thiểu và tối đa|`'ceiling'`|
| `positiveSignCharacter`|Xác định biểu tượng dấu tích cực để sử dụng|`'+'`|
| `rawValueDivisor`|Chia giá trị được định dạng hiển thị trong phần tử AutoNumeric và lưu trữ kết quả được chia trong rawValue|`null`|
| `readOnly`|Xác định xem phần tử ( <input>hoặc một thẻ html được phép khác) có nên được đặt là chỉ đọc khi khởi tạo hay không|`false`|
| `roundingMethod`|Xác định phương pháp làm tròn để sử dụng|`'s'`|
| `saveValueToSessionStorage`|Đặt thành trueđể cho phép decimalPlacesShownOnFocusgiá trị được lưu vớisessionStorage|`false`|
| `selectNumberOnly`|	Xác định xem lệnh chọn tất cả bàn phím sẽ chọn văn bản đầu vào hoàn chỉnh hay chỉ giá trị số đầu vào|`true`|
| `selectOnFocus`|Xác định xem giá trị phần tử có nên được chọn trên tiêu điểm hay không|`true`|
| `serializeSpaces`|Xác định cách các hàm tuần tự hóa sẽ xử lý các khoảng trắng|`'+'`|
| `showOnlyNumbersOnFocus`|Xác định xem giá trị phần tử có nên được chuyển đổi thành giá trị thô trên focushoặc mouseenter, (và quay lại định dạng trên blurhoặc mouseleave)|`false`|
| `showPositiveSign`|Cho phép biểu tượng dấu dương positiveSignCharacterđược hiển thị cho các số dương|`false`|
| `showWarnings`|Xác định xem cảnh báo có được hiển thị trong bảng điều khiển hay không|`true`|
| `styleRules`|Xác định các quy tắc tính toán (các) lớp CSS để áp dụng trên phần tử, dựa trên giá trị thô chưa được định dạng|`null`|
| `suffixText`|Thêm văn bản ở phía bên phải của giá trị phần tử|`' '`|
| `symbolWhenUnfocused`|Xác định biểu tượng được đặt dưới dạng hậu tố khi không nằm trong tiêu điểm hoặc bị di chuột|`' '`|
| `unformatOnHover`|Xác định xem giá trị phần tử có nên không được định dạng khi người dùng di chuột qua nó trong khi giữ Altphím hay không|`true`|
| `unformatOnSubmit`|	Khi một submitsự kiện được phát hiện trong formphần tử mẹ , hãy tạm thời xóa định dạng và đặt rawValuetrong mỗi phần tử con AutoNumeric|`false`|
| `valuesToStrings`|	Cung cấp cách tự động thay thế giá trị đã định dạng bằng một chuỗi được xác định trước, khi giá trị thô bằng một giá trị cụ thể|`null`|
| `watchExternalChanges`|Xác định xem phần tử AutoNumeric có nên xem các thay đổi bên ngoài được thực hiện mà không sử dụng hay không .set()|`false`|
| `wheelOn`|Xác định thời điểm wheelsự kiện sẽ tăng hoặc giảm giá trị phần tử|`focus`|
| `wheelStep`|Xác định giá trị phần tử sẽ được tăng / giảm bao nhiêu đối với wheelsự kiện|`progressive`|

### Các tùy chọn về ngôn ngữ
Cú pháp :
```js
// Use the methods
new AutoNumeric('.mySelector > input').french();
// ...or just create the AutoNumeric object with the language option
new AutoNumeric('.mySelector > input', AutoNumeric.getPredefinedOptions().French);
```
Hiện tại các ngôn ngữ được xác định trước là :
||Option name|
|----|----|
|🇫🇷|	French|
|🇪🇸|	Spanish|
|🇺🇸|	NorthAmerican|
|🇬🇧|	British|
|🇨🇭|	Swiss|
|🇯🇵|	Japanese|
|🇨🇳|	Chinese|
|🇧🇷|	Brazilian|
|🇹🇷|	Turkish|

### Ngoài ra autoNumeric còn có các tùy chọn về số như :
Cú pháp :
```js
new AutoNumeric('.mySelector > input', AutoNumeric.getPredefinedOptions().integerPos);
```
|Tên tùy chọn|Mô tả|Ví dụ|
| -------- | -------- | -------- |
|dotDecimalCharCommaSeparator	|Đặt ký tự thập phân dưới dạng dấu chấm `.` và dấu phân tách nhóm thành dấu phẩy `,`	|1,234.56|
|commaDecimalCharDotSeparator|	Đặt ký tự thập phân dưới dạng dấu phẩy `,` và dấu phân tách nhóm thành dấu chấm `.`	|1.234,56|
|integer|	Đặt giá trị nhỏ nhất và lớn nhất để chỉ có thể nhập một số nguyên mà không có bất kỳ vị trí thập phân nào|	42, -42|
|integerPos|	Đặt giá trị nhỏ nhất và lớn nhất để chỉ có thể nhập một số nguyên dương|	42|
|integerNeg|	Đặt giá trị nhỏ nhất và lớn nhất để chỉ có thể nhập số nguyên âm|	-42|
|float|	Đặt giá trị nhỏ nhất và lớn nhất để có thể nhập số thực mà không có 2 vị trí thập phân mặc định|	1.234, -1.234|
|floatPos|	Đặt giá trị nhỏ nhất và lớn nhất để chỉ có thể nhập một số thực dương	|1.234|
|floatNeg|	Đặt giá trị nhỏ nhất và lớn nhất để chỉ có thể nhập một số thực âm	|-1.234|
|numeric|	Định dạng giá trị dưới dạng chuỗi số (không có dấu phân tách nhóm chữ số và dấu chấm cho dấu thập phân)|	1234.56|
|numericPos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|1234.56|
|numericNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-1234.56|
|euro|	Cấu hình giống với `French`	|1.234,56 €|
|euroF|	Cùng một cấu hình `euro`, với chế độ công thức được kích hoạt	|1.234,56 €|
|euroPos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|1.234,56 €|
|euroNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-1.234,56 €|
|euroSpace|	Cấu hình tương tự `French` ngoại trừ dấu cách được sử dụng cho dấu phân tách nhóm thay vì dấu chấm	|1 234,56 €|
|euroSpacePos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|1 234,56 €|
|euroSpaceNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-1 234,56 €|
|dollar	|Cấu hình giống với `NorthAmerican`	|$1,234.56|
|dollarF|	Cùng một cấu hình `dollar`, với chế độ công thức được kích hoạt	|$1,234.56|
|dollarPos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|$1,234.56|
|dollarNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-$1,234.56|
|percentageEU2dec|	Cấu hình tương tự Frenchnhưng hiển thị `%` dấu phần trăm thay vì dấu tiền tệ, với 2 vị trí thập phân	12,34 %
|percentageEU2decPos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|12,34 %|
|percentageEU2decNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-12,34 %|
|percentageEU3dec	|Cấu hình tương tự Frenchnhưng hiển thị `%` dấu phần trăm thay vì dấu tiền tệ, với 3 vị trí thập phân|	12,345 %|
|percentageEU3decPos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|12,345 %|
|percentageEU3decNeg|Idem ở trên, nhưng chỉ cho phép các giá trị âm|	-12,345 %|
|percentageUS2dec|	Cấu hình tương tự `NorthAmerican` nhưng hiển thị `%` dấu phần trăm thay vì dấu tiền tệ, với 2 vị trí thập phân	|12.34%|
|percentageUS2decPos	|Idem ở trên, nhưng chỉ cho phép các giá trị dương	|12.34%|
|percentageUS2decNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-12.34%|
|percentageUS3dec|	Cấu hình tương tự NorthAmericannhưng hiển thị `%` dấu phần trăm thay vì dấu tiền tệ, với 3 vị trí thập phân	|12.345%|
|percentageUS3decPos|	Idem ở trên, nhưng chỉ cho phép các giá trị dương	|12.345%|
|percentageUS3decNeg|	Idem ở trên, nhưng chỉ cho phép các giá trị âm	|-12.345%|

Mình tham khảo trong trang này ạ
http://autonumeric.org/guide#decimalPlacesShownOnBlur