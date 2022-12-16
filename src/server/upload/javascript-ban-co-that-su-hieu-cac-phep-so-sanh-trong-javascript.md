## Đặt vấn đề
***
Javascript hiện nay đang là một trong những  ngôn ngữ Hot nhất hiện nay bởi độ phổ biến của nó. Hầu như bất kỳ một lập trình viên nào nếu muốn trở thành một nhà phát triển Web thì đều phải tìm hiểu qua. Bạn có thể cần 1 đến 2 tuần là có thể học và viết được Javascript. Tuy nhiên, để thật sự hiểu được javascript bạn cần một thời gian dài tiếp xúc và làm việc với nó. 
Cùng xem qua một số ví dụ sau:
```javascript
false == undefined // false -> OK
undefined == null // false -> Dễ hiểu mà đúng không 
null == undefined // true -> @@!
```
Tiếp tục:
```javascript
0 == [] // true
0 == false // true
[] == false // true
```
Các bạn có thể dùng `console.log` để xem kết quả. Bắt đầu cảm thấy khó hiểu rồi đúng không?
## Phép so sánh bằng
***
### Phép so sánh === (!==)
Nhiều người trong chúng ta vẫn nghĩ so sánh **===** là so sánh cùng kiểu cũng dữ liệu. Điều này về cơ bản là đúng kể cả với giá trị `null` và `undefined`. Nhưng chưa vẫn có những trường hợp không đúng. Như:
```javascript
NaN === NaN // false
String(1) === String(1) // false
```
Trên thực tế, phép so sánh === tuân theo các quy tắc (theo như mình tìm hiểu được, cũng có thể sẽ không đầy đủ) sau:
* Nếu 2 vế của phép so sánh khác kiểu dữ liệu, kết quả là `false`
* Khi cả 2 vế là kiểu **Number**, nếu 1 trong 2 vế là `NaN`, kết quả sẽ là `false`. Nếu không thì so sánh giá trị
* Khi cả 2 vế là kiểu **String** thì so sánh nội dung, nếu nội dung giống nhau là `true`, còn lại là `false`
* Khi cả 2 vế là kiểu **Boolean**, cùng `true` hoặc cùng `false` thì là `true`, còn lại là `false`
* Khi cả 2 về là kiểu **Object tham chiếu**, nếu 2 vế cùng tham chiếu tới **1 Object**
* Khi cả 2 vế là các kiểu đặc biết như `null`, `undefined`, nếu như cùng `null` hoặc cùng `undefined` là `true`, còn lại là `false`
### Phép so sánh ==(!=)
Phép so sánh **==** cũng tuân theo có quy luật sau:
1. Nếu 2 vế cùng kiểu dữ liệu, quy về so sánh **===**
2. Ngược lại, nếu 2 vế khác kiểu dữ liệu:
* Nếu 1 trong 2 vế là **Number**, vế còn lại là kiểu **String**, **String** sẽ được **convert** sang kiểu **Number** để so sánh
* Nếu 1 trong 2 vế là **Number**, vế còn lại là kiểu **Boolean**, **Boolean** sẽ được chuyển qua **Number** để so sánh
* Nếu 1 trong 2 vế là **String**, vế còn lại là kiểu **Boolean**, cả 2 vế sẽ được chuyển qua **Number** để so sánh
* Nếu 1 trong 2 vế là **String**, vế còn lại là kiểu **Object tham chiếu**, **Object tham chiếu** sẽ được chuyển qua **String** để so sánh
* Nếu 1 trong 2 vế là **Number**, vế còn lại là kiểu **Object tham chiếu**, **Object tham chiếu** sẽ được chuyển qua **Number** để so sánh
* Nếu cả 2 vế đều là **null** hoặc **undefined** tính cả trường hợp một vế **null**, vế kia là **undefined** thì là **true** 
## Phép so sánh hơn kém
***
Các phép so sánh hơn kém, bao gồm: `>`, `<`, `>=`, `<=`, đều tuân theo các quy tắc sau:
* **Trường hợp 1:** Cả 2 vế cùng kiểu
    * Cả 2 vế đều cùng kiểu **Number** , so sánh theo giá trị 
    * Cả 2 vế đều cùng kiểu **String** , so sánh theo thứ tự **UniCode**
* **Trường hợp 2:** Cả 2 vế khác kiểu, só sẽ tuân theo các quy tắc sau:
    * Nếu 1 trong 2 vế là kiểu **Number** và vế còn lại có thể chuyển về kiểu **Number**, chuyển về kiểu **Number** và so sánh giá trị. Đặc biệt, nếu 1 trong 2 là **NaN**, thì kết quả là **false**
    * Nếu 1 trong 2 vế là kiểu **String** và vế còn lại có thể chuyển về kiểu **String**, chuyển về kiểu **String** và so sánh theo **Unicode**
    * Nếu 1 trong 2 vế là kiểu **Number**, vế còn lại là kiểu **String**, kiểu **String** sẽ được chuyển về kiểu **Number** và so sánh giá trị số
    * Đặc biệt, nếu 1 trong 2 vế không thể chuyển về kiểu **Number** hoặc **String** hoặc khi chuyển trở thành giá trị **NaN**, kết quả sẽ là **false**
## Tổng kết
***
Trên đây chỉ là một phần nhỏ do mình tham khảo hoặc tìm hiểu được. Có thể sẽ chưa đầy đủ hoặc còn nhiều thiếu sót nên mình mong sẽ nhận được đóng góp của các bạn để bài viết được hoàn thiện hơn. Hi vọng bài viết sẽ có ích cho những lập trình viên đang trên con đường tìm hiểu về Javascript. Xin cảm ơn các bạn đã theo dõi!