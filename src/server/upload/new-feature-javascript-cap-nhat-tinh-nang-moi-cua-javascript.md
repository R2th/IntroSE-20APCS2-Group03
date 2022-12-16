**Javascript** là gì? Javascript có lẽ là một ngôn ngữ lập trình thú vị nhất thế giới hiện nay, nó trải rộng khắp từ frontEnd đến Backend bao gồm cả database. Do đó javascript được cập nhật liên tục về các tính năng, nhằm cải thiện về performance và time cho các developer javascript như tôi và các bạn. 

**TC39** (Technical Committee 39)  đã đề xuất thêm một số tính năng hấp dẫn và họ đã hoạt động rất tích cực trong năm nay. Chính vì vậy bài viết đây là tóm tắt về một số đề xuất hiện đang trong "Stage 3", đây là giai đoạn cuối cùng trước khi "finished". Điều này có nghĩa là các tính năng này sẽ sớm được triển khai trong trình duyệt và các công cụ khác.

Nhưng hiện tại những tính năng như **Private fields, Optional Chaining**... đã có thể check được tại Chrome & NodeJS 12. Chúng ta sẽ lần lượt đi tìm hiểu một số tính năng thú vị sau

## 1 - Optional Chaining ?.
Trong chúng ta có ai đã rơi vào trường hợpc check một property trong một object mà có nhiều **objects** con không? hay còn lọi là **object property nested**. Để không mất thời gian giải thích nhiều ta cùng đi ví dụ sau:

Ví dụ 1: Giả sử trong chúng ta nhận được một API response object
```
const player = {
    details: {
        name: {
            firstName: "Quang",
            lastName: "Hai",
	   age: 20
        }
    },
    jobs: [
        "dev js",
        "dev php"
    ]
}
```
Bây giờ chúng ta sẽ đi tìm firstName bằng cách
```
const playerFirstName = player.details.name.firstName;
```
Nhưng đây không phải là một cách chúng ta hay sử dụng với một người lập trình kinh nghiệm, bỏi nếu bị miss một property nào thì sẽ gây ra lỗi như sau: Cannot read property 'firstName' of undefined. Như hình dưới đây, được check trên console chrome.

Do đó thường một dev js thường check một cách kỹ lưỡng như sau:
```
// Checking if firstName exists
if( player &&
    player.details &&
    player.details.name ) {
        const playerFirstName = player.details.name.firstName || 'Ronaldo Cr7';
}
```
Rất khổ sở phải không? Giờ đây tính năng mới "Optional Chaining" trong javascript sẽ giúp chúng ta có thể tiết kiệm được thời gian hơn bằng cách. Nếu tính năng này được triển khai sau giai đoạn "finished" thì chúng ta sẽ sử dụng như cú pháp này.
```
const playerFirstName = player?.details?.name?.firstName;
```
Nếu bạn nào muốn chạy thử nghiệm thì vui lòng làm theo hướng dẫn của tôi từ bản 79 trở lên của chrome đó là, thay đổi Experimental JavaScript = true bằng cách set chrome://flags như hình ảnh dưới đây.
![](https://images.viblo.asia/f9c9a338-b839-438c-8183-dde6e7113bcd.jpg)

Chú ý: Nếu làm như vậy các tính năng an toàn của trình duyệt sẽ bị mất đi, cho nên bạn hãy cận thận khi làm test này
Proposal: https://github.com/tc39/proposal-optional-chaining

## 2 - Private fields #
Tính năng này có thể check trên chrome or node 12.
![](https://images.viblo.asia/21fba7e0-6028-44c4-95ed-5e7e1f8e8b82.jpg)
Cuối cùng javascript cũng đã chấp nhận khai báo private fields trong classes. Nhưng tôi vẫn thắc mắc sao các nhà phát triển không theo những khai báo khác nhử ở java, hay typescript đó là thêm private trước khi khai báo cho quen thuộc, chứ # kiểu này rất khó chịu...

Hình ảnh này tôi check trên nodejs 12, các bạn để sẽ thấy
```
class Foo {
  #b = 15;
  a = 10;
  get() {
    return this.#b;
  }

  increment() {
    ++this.#b;
  }
}
const obj = new Foo();

obj['#b']; // undefined
obj.a = 10;
obj.hasOwnProperty('#b'); // false
```
Proposal: https://github.com/tc39/proposal-class-fields

## 3 - undefined javascript - Nullish Coalescing ??
Chức năng này giống như set default value trong es6 vậy thôi, cụ thể sẽ như thế này.
```
const player = input.player || 'Ronaldo Cr7';
```
Nhưng nếu input.player sẽ là một trong những falsy values thì như thế nào, do đó sử dụng tính năng mới này Nullish Coalescing ??
```
const player = input.player ?? 'Ronaldo Cr7';
```
Proposal: https://github.com/tc39/proposal-nullish-coalescing

## 4 - Top Level await
Available in Chrome
Điều này tôi thấy rất hay, tức là bạn có thể sử dụng await ngay trên console của chrome để debug một cách dễ dàng mà không cần bao bọc bởi async nữa rồi.
![](https://images.viblo.asia/1f4b6665-0148-4830-9598-f27fcc655b3a.jpg)
Ví dụ:
```
hoặc:
// db.mjs
export const connection = await createConnection();

// server.mjs
import { connection } from './db.mjs';

server.start();
```
Trong ví dụ này, không có gì sẽ thực thi trong server.mjs cho đến khi kết nối hoàn tất trong db.mjs.

## 5 - Kết luận
Trên đây là những tính năng chuẩn bị ra mắt ở năm 2020, tôi đoán thế, vì nó ở giai đoạn 3 rồi. Các bạn cũng theo dõi và nắm bắt được xu thế, bởi tôi đoán không nhầm, chắc chắc những new feature javascript 2020 sẽ được bổ sung vào ngân hàng test javascript đấy.

Chúc bạn thành công và cảm ơn các bạn!