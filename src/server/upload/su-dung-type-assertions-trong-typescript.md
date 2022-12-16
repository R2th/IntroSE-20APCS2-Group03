### Type Assertions trong TypeScript
Khi sử dụng Type Assertions, trình biên dịch sẽ coi một giá trị là một kiểu được chỉ định cụ thể. Nó sử dụng từ khóa **as** để sử dụng:<br>
```TypeScript
expression as targetType
```
Ví dụ:<br>
```TypeScript
function getNetPrice(price: number, discount: number, format: boolean): number | string {
    let netPrice = price * (1 - discount);
    return format ? `$${netPrice}` : netPrice;
}
```
Hàm **getNetPrice ()** chấp nhận các đối số **price**, **discount** và **format**  và trả về giá trị của kiểu number hoặc string.<br>
Nếu **format** là **true** , hàm **getNetPrice ()** trả về giá thực của **price** được định dạng dưới string. Nếu không, nó trả về giá thực của **price** dưới number.<br>
Sử dụng từ khóa **as** để hướng trình biên dịch hiểu rằng giá trị được gán cho biến **netPrice** là string:<br>
```TypeScript
let netPrice = getNetPrice(100, 0.05, true) as string;
console.log(netPrice);
```
Output:<br>
```TypeScript
$95
```
Sử dụng từ khóa **as** để hướng trình biên dịch hiểu rằng giá trị được gán cho viến **netPrice** là number:<br>
```TypeScript
let netPrice = getNetPrice(100, 0.05, false) as number;
console.log(netPrice);
```
Output:<br>
```TypeScript
95
```
### Thay thế cú pháp Type Assertion
Bạn cũng có thể sử dụng cú pháp ngoặc nhọn **<>** để xác nhận một kiểu, như sau:<br>
```
<targetType> value
```
Ví dụ:<br>
```
let netPrice = <number>getNetPrice(100, 0.05, false);
```
Lưu ý rằng bạn không thể sử dụng cú pháp ngoặc nhọn **<>** với một số thư viện như React. Vì lý do này, bạn nên sử dụng từ khóa **as** cho các xác nhận kiểu.<br>
**Tóm tắt**:<br>
- Type assertions hướng dẫn trình biên dịch coi một giá trị là một kiểu được chỉ định.
- Type assertions không thực hiện bất kỳ kiểu ép kiểu nào.
- Type assertions sử dụng từ khóa **as** hoặc cú pháp dấu ngoặc nhọn **<>.**