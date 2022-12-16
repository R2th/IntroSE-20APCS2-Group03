`JavaScript` đã trở thành một trong những ngôn ngữ lập trình phổ biến nhất hiện nay. Nó cũng dẫn đầu về số lượng repository GitHub và là ngôn ngữ lập trình được thảo luận nhiều nhất trên `StackOverflow`.

Do đó, điều rất quan trọng là bạn phải hiểu rõ những điều cơ bản và biết điều gì xảy ra đằng sau bất kỳ chương trình JS nào và nó được thực thi như thế nào, nếu bạn muốn đi sâu vào JS.

## Execution Context (EC)

Mọi thứ trong JS đều xảy ra bên trong `Execution Context`. Nó là môi trường mà mã JS được thực thi. Nó bao gồm giá trị của ‘this’, các biến, đối tượng và funtions mà mã JS có quyền truy cập vào bất kỳ thời điểm cụ thể nào dưới dạng các cặp `key-value`. Mỗi `code block` sẽ có `EC` riêng mà nó đang thực thi.

![](https://images.viblo.asia/2c66423f-b9af-4eb0-a7b0-7e348a10e267.png)

Hãy nhìn vào hình phía trên, nó bao gồm hai phần 
- Bộ nhớ (memory): Tất cả các biến có trong code của bạn được lưu trữ ở đây dưới dạng các cặp `key-value`
- Code: Đây là một thread nơi code được thực thi, một dòng tại một thời điểm

### Types of Execution Contexts

- **Global Execution Context (GEC)** : Nó được tạo một lần cho mọi chương trình theo mặc định. Nó bao gồm code không có bên trong bất kỳ chức năng (function) nào. GEC chịu trách nhiệm chính về hai việc: 
    - nó tạo ra một đối tượng toàn cục (global object) là window object (dành cho các trình duyệt)
    - nó đặt giá trị của `this` bằng `global object`. 
    
    GEC bị clear sau khi quá trình thực thi toàn bộ chương trình kết thúc.

- **Function Execution Context (FEC)** : Mỗi khi một hàm được gọi, một execution context sẽ được tạo cho hàm đó. Nó sẽ được clear khi hàm trả về thứ gì đó hoặc quá trình thực thi của nó kết thúc.

### How is an Execution Context created

![](https://images.viblo.asia/25cef4bc-06c3-449a-a1ad-431a7c5ade58.png)

JavaScript Engine tạo `Execution Context` trong 2 giai đoạn:
- **Creation Phase**: ITrong giai đoạn này, `JS engine` chỉ quét toàn bộ code nhưng không thực thi nó. Nó tạo `scope chain` rồi cấp phát bộ nhớ cho mọi biến (với giá trị của nó là `undefined`) và các `function` trong phạm vi của nó. Sau đó, nó cũng khởi tạo giá trị của `this`.

- **Execution Phase**: Trong giai đoạn này, JS engine thực hiện quét lại code để cập nhật các biến và hoàn tất quá trình thực thi.

Bất cứ khi nào bạn chạy code JS của mình, trong `Creation Phase`, một `Global Execution Context` được tạo để lưu trữ tất cả các biến toàn cục có giá trị là `undefined` và các function với phần thân của nó là giá trị. Sau đó, một unique EC được tạo cho các function khác hoạt động theo cùng một cách :
- trước tiên nó lưu trữ và cấp phát bộ nhớ cho tất cả các biến cục bộ của hàm đó
- thực thi block code và tự hủy sau khi `Execution Phase` của nó kết thúc.

Ví dụ:

```js
var a = 10;

function doubleTheNumber(number) {
    var doubleNumber = 2 * number;
    return doubleNumber;
}

var result = doubleTheNumber(a);
console.log(result);
```

Với đoạn code trên, khi thực thi nó sẽ chạy như sau:
1. Khi đoạn code trên được chạy, đầu tiên nó sẽ vào `Creation Phase`. Toàn bộ code được `JS engine` scan và `Global Execution Context` được tạo.

![](https://images.viblo.asia/cdd44282-2ff1-49ca-b663-35761a972f55.png)

2. Trong lần scan thứ 2, khi nó đang trong `Execution Phase`, mỗi dòng code sẽ được scan từ trên xuống dưới và giá trị của `a` được cập nhật thành `10` - bởi vì JavaScript là ngôn ngữ đồng bộ, đơn luồng nên nó lại phải scan lại từng dòng từ trên xuống.
3. Khi nó scan tới dòng `var result = doubleTheNumber(a)`. Nó sẽ vào `function` này để quét.

![](https://images.viblo.asia/99c05d5e-cf89-41f2-b1eb-aa9f0be0fb65.png)

4. Bây giờ, để thực thi function này, các bước thực thi sẽ tương tự các bước trên. Một `EC` sẽ được tạo cho nó. Trong `creation phase`, bộ nhớ sẽ được tạo cho `DoubleNumber`.

![](https://images.viblo.asia/829e6fbb-a033-4c9f-9b65-78defb3cb6e6.png)

5. Trong giai đoạn thực thi của hàm này, vì giá trị của `number` là 10 nên `doubledNumber` sẽ là 2 * 10, tức là 20. Sau đó nó sẽ trả về `20`

![](https://images.viblo.asia/1e820bff-bf60-44b3-9c8c-1086a95cb4b0.png)

6. Sau câu lệnh `return`, `execution context` cho hàm `doubleTheNumber` sẽ được hủy/clear và JS Engine quay trở lại dòng `var result = doubleTheNumber(a)`, nơi giá trị của `result` sẽ được cập nhật thành 20. 
7. Dòng cuối cùng của code được thực thi - `console.log(result);` - sau đó `Global Execution Context` của chương trình này sẽ được hủy/clear.

Ở ví dụ trên, các bạn có thể hiểu được làm thế nào để một `JS Program` được thực thi. Tuy nhiên, trong thực tế, quá trình thực thi của nó sẽ không thẳng tuột như các bước từ 1-7 như ở trên. JS Engine sử dụng `CALL STACK` để quản lý và thực thi các bước này.

## CALL STACK

Call Stack duy trì thứ tự thực hiện các `Execution Contexts`. Nó còn được gọi bằng những cái tên như `Program Stack`, `Control Stack`, `Runtime Stack`, v.v.

![](https://images.viblo.asia/ecf5ca20-afc5-4bd4-961a-bcb710f76fe7.png)

Nó là một ngăn xếp/stack bao gồm tất cả các EC. GEC luôn là EC đầu tiên được push vào ngăn xếp này và cũng là EC cuối cùng được pop ra. Bất cứ khi nào EC mới được tạo, nó sẽ được push vào stack. Khi quá trình thực thi của nó kết thúc hoặc nó trả về một giá trị nào đó, nó sẽ được pop ra ngoài và JS engine chuyển đến bước tiếp theo trong Call Stack.

Ví dụ:

```js
var a = 10;

function doubleTheNumber(number) {
    var doubleNumber = 2 * number;
    return doubleNumber;
}

var result = doubleTheNumber(10);
console.log(result);
```

Giải thích hoạt động của call stack:

![](https://images.viblo.asia/b4e56a9e-c67d-4e4c-abd1-710d3db1dad6.png)

- Khi chạy đoạn code trên, GEC sẽ được tạo trước tiên và được đẩy vào ngăn xếp. Trong quá trình thực thi, khi JS Engine thực thi function `doubleTheNumber`, một EC mới sẽ được tạo riêng cho hàm này và được đẩy vào ngăn xếp. Khi quá trình thực thi kết thúc, EC này sẽ được lấy ra và JS Engite trở lại GEC. Sau khi thực thi hoàn toàn đoạn code này, GEC này cũng sẽ được lấy ra!

Tương tự, bạn cũng có thể kiểm tra thực tế cách hoạt động của `Call Stack` cho bất kỳ mã JS nhất định nào.
Chạy code JS của bạn trong trình duyệt -> Open console -> Sources. Bạn sẽ `Call Stack` như trong hình dưới đây:

![](https://images.viblo.asia/7424cf1b-af68-4c93-b8a6-e6888059c393.png)

Tại thời điểm này, `Call Stack` sẽ trống vì code đã hoàn thành việc thực thi. Để xem việc tạo và xóa các EC, hãy thêm các breakpoints vào code của bạn và chạy thôi.


### Conclusion

Phía trên, chúng ta đã cùng đi qua xem cách mà một đoạn code được thực thi trong JS như thế nào, cách mà JS quản lý các bước thực hiện ra sao. Mong rằng nó có thể giúp các bạn hiểu thêm về JS và nắm nó rõ hơn :smiley: 

#### Reference
- [How does JavaScript work — Execution Contexts and Call Stacks](https://rupaljain-1699.medium.com/how-does-javascript-work-execution-contexts-and-call-stacks-63121e769a2)