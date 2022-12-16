# Giới thiệu

`reduce` là một method khá khó hiểu, lại còn có cơ số những lời giải thích khá mập mờ khó hiểu trôi nổi trên internet. Đây là một method cực kì hữu hiệu và sẽ mang lại cực kì nhiều lợi ích nếu chúng ta có thể hiểu được nó. Tiêu biểu là `reduce` thường xuyên được sử dụng trong các công cụ quản lý state, tiêu biểu là `redux`.

Một cách sử dụng tiêu biểu của method `reduce` trong JavaScript:

```javascript
arr.reduce(callback, initialValue);
```

# Thuật ngữ
`reduce` bắt nguồn từ 2 thuật ngữ **Reducer (bộ giảm)** và **Accumulator (bộ tích luỹ)**. `accumulator` chính là kết quả, và `reducer` là action chúng ta thực hiện để đạt được kết quả đó.

Một điều cần nhớ là `reducer` chỉ trả về một và chỉ một giá trị (Vì tên nó là `reduce` mà ).

Xem một ví dụ điển hình nhé: 

```javascript
let value = 0;

const numbers = [10, 20, 30];

for(let i = 0; i < numbers.length; i++) {
  value += numbers[i];
}
```

Đoạn code trên sẽ trả về `60` (10 + 20 + 30). Trong trường hợp này chúng ta có thể sử dụng `reduce` để không mutate giá trị của biến `value`.

Đoạn code phía dưới cũng sẽ trả về `60`, tuy nhiên sẽ không mutate bíên `value` của chúng ta (chúng ta sẽ gọi là `initialValue`): 

```javascript
// đây là giá trị khơi tạo của chúng ta
const initialValue = 0;

const numbers = [10, 20, 30];

// hàm reducer nhận vào tổng hiện tại và một số
const reducer = (sum, number) => {
  return sum + number;
};

// chúng ta truyền vào method reduce của chúng ta hàm reducer và giá trị khởi tạo.
const total = numbers.reduce(reducer, initialValue);
```

Đoạn code trên có thể nhìn hơi khó hiểu nhỉ ? Để biết được hàm reduce đang chạy như thế nào thì chúng ta đặt  `console.log` vào hàm `reducer` nhé: 

```javascript
const reducer = (sum, number) => {
  console.log('Current sum: ', sum);
  console.log('Current number: ', number);
  console.log('-----');
  return sum + number;
};
```

Mở console lên và chúng ta sẽ thấy log sau:

![](https://images.viblo.asia/9b377277-7dd6-4e63-a7ef-0cb03605cbd1.png)

Điều đầu tiên chúng ta thấy sẽ là hàm `reducer` sẽ chạy 3 lần tương đương với 3 phần tử của mảng `numbers`. Accumulator (Tổng) của chúng ta sẽ bắt đầu từ 0, đây cũng chính là giá trị khởi tạo `initialValue` được truyền vào method `reduce`.

Lần chạy cuối cùng của method sẽ có `sum` với giá trị là 30, và `number` là 30, do đó kết qủa là 30 + 30  = 60. Đây cũng chính là kết quả của method `reduce` của chúng ta.

Đây là 1 ví dụ đơn giản về cách sử dụng method `reduce`, sau đây chúng ta sẽ thử áp dụng nó vào các ví dụ khác phức tạp hơn nhé. 

# Flatten một Array sử dụng Reduce

Ví dụ chúng ta có một mảng sau:

```javascript
const coins = ["BTC", "ETH", ["DOGE", "AQUAGOAT", ["SHIB"]], ["ADA", "XRP"], ["BNB"]];
```

Chúng ta có thể dùng method `.flat` của JavaScript luôn là được nhỉ? Bỗng một ngày đẹp trời, JavaScript bỏ luôn hàm ấy đi thì sao :D. Vậy mình thử tự viết lại bằng `reduce` nhé.

Chúng ta sẽ viết một hàm như sau để flatten tất cả các mảng, bất kể nó sâu thế nào: 

```javascript
const flatten = arr => {
  // tạo một giá trị khởi tạo là một mảng rỗng 
  const initialValue = [];

  // gọi method reduce cho arr

  return arr.reduce((total, value) => {
    // nếu value là một mảng thì chúng ta sẽ dùng đệ quy để gọi lại hàm này
    // nếu value không phải là một hàm thì chỉ việc concat value vào total
    return total.concat(Array.isArray(value) ? flatten(value) : value);
  }, initialValue);
}
```

Thử áp dụng với mảng `numbers` bên trên thì ta được kết quả sau:

![](https://images.viblo.asia/f8016b3a-e6a1-49c1-9b8f-1e5a888bce6a.png)

Thử một ví dụ khác nữa nhé: 

# Thay đổi cấu trúc Object

Ví dụ server trả về một list coins như sau: 

```javascript
const coins = [
  { key: "BTC", name: "BitCoin" },
  { key: "ETH", name: "Ethereum" },
  { key: "ADA", name: "Cardano" }
]
```

Và chúng ta cần thay đổi thành một object dạng như sau:

```javascript
const coins = {
  btc: { name: "BitCoin" },
  eth: { name: "Ethereum" },
  ada: { name: "Cardano" }
}
```

Để làm được vậy thì chúng ta cần viết một hàm như sau: 

```javascript
const getMapFromArray = arr =>
  arr.reduce((obj, item) => {
    // thêm object key vào cho object của chúng ta
    obj[item.key.toLowerCase()] = { name: item.name };
    return obj;
  }, {});
```

Khi chạy thì chúng ta sẽ có kết quả sau:

![](https://images.viblo.asia/45729ba4-2afe-4faf-b811-195beb71d7ae.png)

# Kết

Khi mới tìm hiểu, có thể method `reduce` sẽ hơi khó hiểu và khó tiếp cận hơn một số method khác của `Array` như `map` hoặc `filter`, nhưng chỉ cần hiểu khái niệm, cú pháp và use-case thì nó có thể trở thành một công cụ cực kì hiệu quả trong tay chúng ta.