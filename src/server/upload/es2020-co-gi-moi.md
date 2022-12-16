Sau khi phát hành phiên bản ES6 năm 2015, Javascript đã có nhiều bước phát triển mạnh mẽ hơn trước. Và trong năm nay, với sự hoàn thiện của `ES2020`, lại một lần nữa hứa hẹn sẽ đem đến cho chúng ta những tính năng tuyệt vời. Cùng nhau điểm qua một vài tính năng mới nổi bật nhé!

### Nullish Coalescing

**Nullish Coalescing** (toán tử `??`) cho phép chúng ta check các giá trị `nullish` thay vì các giá trị `falsey`. Vậy sự khác nhau giữa các giá trị `nullish` và `falsey` là gì?

`Nullish` là các giá trị `null` hoặc `undefined`, còn `falsey` là các giá trị như `''`, number `0`, `undefined`, `null`, `false`, `NaN`, …

Ví dụ,
![](https://images.viblo.asia/7b92a2df-0ddc-456f-b3ed-2bc2600f41e6.png)

Khi khai báo biến là thuộc tính của một object, để phòng trường hợp thuộc tính đó `undefined` hoặc `null`, ta thường sử dụng toán tử `||` để gán giá trị mặc định. Nhưng nếu gặp thuộc tính có giá trị `falsey` như `0`, `false` hay `''` thì `||` sẽ hoạt động không chính xác. Và `??` được đề xuất để giải quyết vấn đề này.

![](https://images.viblo.asia/6bdd918d-dde4-4338-99a8-d5b3758ce424.png)

`??` hoạt động khá giống `||`, nhưng `||` luôn trả về các giá trị `truthy`, trong khi `??` trả về các giá trị `non-nullish`, `??` vẫn hoạt động đúng với các giá trị `falsey`.

### Optional Chaining

**Optional Chaining** (toán tử `?.`) cho phép truy cập an toàn vào các thuộc tính lồng nhau của một object mà không cần phải check sự tồn tại của từng thuộc tính đó. Trả về `undefined` nếu thuộc tính không tồn tại.

![](https://images.viblo.asia/259f4b8a-c606-48a7-9dec-dcf9ee8bf21b.png)

`?.` còn có thể dùng để kiểm tra một method có tồn tại không trước khi gọi, hay truy xuất các phần tử của một Array.

![](https://images.viblo.asia/a8aa4037-f3b9-44c0-b337-e407671f0baa.png)

### Promise.allSettled

**Promise.allSettled(promises)** chỉ resolve khi `tất cả` các Promise đã được thực thi hết - có thể là resolved hoặc rejected.

![](https://images.viblo.asia/a4509235-a28f-4585-8ff0-c83ab7c1ab39.png)

Về cơ bản `Promise.allSettled` khá giống với `Promise.all`, nhưng có sự khác biệt:
- `Promise.all` sẽ **đợi** cho tất cả các promises resolved hoặc rejected. Nhưng nó sẽ bị lỗi nếu một trong các promises bị rejected.
- `Promise.allSettled` chỉ thực thi tất cả các promises bất kể trạng thái của chúng là gì, không quan tâm tới kết quả. Và kết quả trả về sẽ là một mảng các phần tử như ví dụ trên.

### Dynamic Imports

**Dynamic Imports** cho phép import động các files JS dưới dạng các modules nguyên bản giống như khi làm với Webpack hay Babel.

![](https://images.viblo.asia/be216239-f46e-44b3-b799-a2c574a6ad75.png)

Lợi ích dễ thấy nhất của `Dynamic Imports` là cho phép `lazy-loading`: chỉ tải các module khi cần thiết. 

Trước khi ES2020 phát hành, chúng ta bắt buộc phải khai báo import các module dù cho chúng có được sử dụng hay không (`static import`), và đương nhiên, điều này có thể gây nhiễu global `namespace`. Ngoài ra chúng ta cũng không thể import module theo các điều kiện `if-else` mong muốn như như ở ES2020 khi cần.

### BigInt

**BigInt** là một trong những tính năng được mong đợi nhất trong JS, nó cho phép sử dụng các số lớn hơn số tối đa được phép `pow(2, 53) - 1` để xử lý dữ liệu.

![](https://images.viblo.asia/251d6c71-870a-4dba-84f5-e55255364cdb.png)

Cần sử dụng `n` ở cuối để biểu thị đây là một `BigInt` và nên được xử lý khác nhau bằng JavaScript engine (v8 hoặc bất kỳ engine nào nó đang sử dụng). Nhưng tính năng mới này lại không tương thích ngược vì hệ thống số truyền thống là `IEEE 754` không thể hỗ trợ các số có kích thước này.

### String.protype.matchAll

**matchAll()** là một method mới được thêm vào `String protype` và có liên quan đến `Regular Expressions`. Nó sẽ trả về một `iterator` tất cả các kết quả matching, bao gồm cả các `groups`.

![](https://images.viblo.asia/fac1e8ed-1312-4280-ba05-fd9e2fb7317a.png)

### globalThis

Khi viết mã JS trong môi trường đa nền tảng chúng ta sẽ khá khó khăn trong việc nắm bắt các object toàn cục. 
- Browsers: **window**
- Node: **global**
- Web-workers: **self**
- Runtimes: object toàn cục sẽ khác. Vì vậy, bạn sẽ phải có triển khai của riêng mình để detect runtime và sau đó sử dụng chính xác biến toàn cục chính xác.

ES2020 có `globalThis`, luôn tham chiếu đến đối tượng toàn cục, bất kể đang thực thi trong môi trường nào. Ví dụ,

![](https://images.viblo.asia/508362af-743b-46f1-8b21-b3cbd560383d.png)

### Private methods/properties

Thêm tiền tố `#` vào trước tên của thuộc tính hoặc method để khai báo các `thuộc tính/method private` cho `JS Class`. Những methods và thuộc tính này sẽ chỉ được phép truy cập từ bên trong Class được khai báo.
```js
class Demo {
  #value = "Hihi"
  say() {
    console.log(this.#value)
  }
}

const demo = new Demo()
demo.say()
console.log(demo.#value)
```

***Tổng kết***

Trên đây mình chỉ nêu ra một vài tính năng mình cảm thấy là nổi bật nhất trong ES2020, nhưng ngoài ra còn khá nhiều tính năng thú vị khác nữa như `import.meta`, `for-in order`, ... Nếu bạn muốn tìm hiểu thêm về chúng, có thể tham khảo chi tiết tài liệu [tại đây](https://tc39.es).