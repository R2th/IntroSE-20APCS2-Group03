Làm việc với Javascript chắc hẳn nhiều bạn đã gặp những trường hợp như sau:
```JS
1 * 'foo'; //NaN
1 * 2; //2
'foo' * 1; //NaN
'foo' + 1; //'foo1'
```
Điều này xảy ra là do cái gọi là Javascript Type Coercion. Có thể hiểu đơn giản là JS luôn cố cưỡng ép kiểu dữ liệu. Ví dụ:
```JS
1 + true; //1
```
Trong ví dụ trên, JS trước tiên sẽ ép kiểu boolean true thành number 1 và sau đó thực hiện phép cộng và ta có được kết quả là 2.

Sử dụng các phép toán với những toán tử như `-`, `*`, `/`, và `%`sẽ ép kiểu dữ liệu trả về `number`.
```JS
'3' - '2'; //1
'2' * '4'; //8
'8' / '2'; //4
'8' % '3'; //2
```

Nhưng với toán tử `+` thì chưa chắc kiểu dữ liệu trả về sẽ là `number` bởi vì chúng ta có thể sử dụng `+` để làm phép toán HOẶC ghép các đoạn string lại với nhau. Vì vậy mặc định các phép toán khi sử dụng `+` sẽ ưu tiên trả về kiểu dữ liệu `string`.
```JS
5 + '1'; //'51'
5 + true; //6
```

JS còn có một kiểu ép dữ liệu nữa đó là truthiness. Ví dụ bạn dùng `if/else` với một giá trị nào đó, thì JS có thể ép kiểu dữ liệu của giá trị đó về `true` hoặc `false`.
```JS
let i = 100;
if(i) {
    console.log('true')
}
```

Hầu hết các giá trị trong JS đều được ép kiểu về true ngoại trừ 7 giá trị
- `false`
- `0`
- `-0`
- `NaN`
- `""`
- `null`
- `undefined`
Các giá trị này để được ép kiểu về false