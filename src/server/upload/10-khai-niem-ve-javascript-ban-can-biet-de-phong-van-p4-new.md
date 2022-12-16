Xin chào mọi người 😁✌ 👋.

Báu đã trở lại để giới thiệu với các bạn phần 4 của chuỗi bài viết **10 khái niệm về Javascript bạn cần biết để phỏng vấn** được mang tên: `new`.

# I. `Object` trong `Javascript`:
Trước khi tìm hiểu về `new`, mình muốn giới thiệu lại về `Object` trong `Javascript` - `JS`. Như mình từng viết ở số trước, hầu hết các kiểu giá trị trong `JS` đều mang kiểu `Object`. `W3School` có 1 bài giới thiệu về `Object` như sau:
> In JavaScript, objects are king. If you understand objects, you understand JavaScript.

Không phải nói quá đâu, cùng xem qua danh sách phía dưới để hiểu thêm nhé:
1. Booleans can be objects (if defined with the new keyword)
2. Numbers can be objects (if defined with the new keyword)
3. Strings can be objects (if defined with the new keyword)
4. Dates are always objects
5. Maths are always objects
6. Regular expressions are always objects
7. Arrays are always objects
8. Functions are always objects
9. Objects are always objects

>All JavaScript values, except primitives, are objects.

Vậy `Object` có gì liên quan tới `new` không nhỉ?
# II. So sánh `new` với `Object`:
Cùng thử tạo mới 1 `Object` không dùng từ khoá `new` nhé:

![](https://images.viblo.asia/d750a1f5-7488-4f48-8007-f76b9e2cebcf.png)

[Check Code Here!](https://repl.it/@trdbau/normalObj)

Và giờ là 1 `Object` tạo bởi từ khoá `new`:

![](https://images.viblo.asia/e69131b4-93a7-498b-84fb-69615c3e1dc8.png)

[Check Code Here!](https://repl.it/@trdbau/createObjWithNew)

Function `PersonalInformation` với từ khoá `new` và function `personalInformation` đều tạo ra 2 `Object` có các `properties` giống nhau nhỉ?

# III. Sự thật bị ẩn giấu:
Hãy xem qua đoạn code `demo` này của mình nhé:

![](https://images.viblo.asia/4476d4cf-4e37-4485-b535-c65611918a87.png)

[Check Code Here!](https://repl.it/@trdbau/checkPropObjWithNew)

Giờ mình sẽ giải thích 1 chút nha:
1. Khi tạo mới một `Object` kết hợp từ khoá `new`, chúng ta gọi hàm tạo mới là một `constructor`: `console.log(demoInfo.constructor) -> [Function: PersonalInformation]`, đồng thời tạo ra `prototypically inherited` - tính kế thừa trong `lập trình hướng đối tượng`.
2.  Những Function này đồng thời cũng sẽ được viết hoa theo kiểu `PascalCase`, đây là một `common practice`. Hãy nhớ đến [Class](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Classes) được giới thiệu vào năm 2015, nếu bạn nào thường xuyên làm việc với `Class` chắc chắn sẽ thấy `syntax` rất quen phải không nào?
3.  Từ khoá `new` còn thêm một số `implicit code` vào `Object`, mà chúng ta không dễ dàng hiển thị bằng `console.log`, đó là `prototype`.
4.  Tạo ra một `Object` rỗng: `console.log(this) -> PersonalInformation {}`, và tự động `bind` `this` vào `Object` mới:  `this.name = "Bau"`.
5. Lệnh `return` trong trường hợp này sẽ trả về `this`, nếu bạn `return 10` (hoặc một `primitive value`), ngoại trừ trường hợp `return` `Object`, `Array`, `Function`.

Đây chính là tiền đề để `ES6` tạo ra `Class`, bạn có thể cảm nhận được làn gió mới này nếu trải nghiệm bộ môn `Typescript`.
Trên đây là những chia sẻ cơ bản của mình về biến `This`. Cảm ơn các bạn đã theo dõi 🙇‍♂️.
Và ở bài viết tiếp theo, tụi mình thử trải nghiệm 1 thứ gì đó mới mẻ nhé? Như là `VueJS` chẳng hạn 😁🎇🎇🎇🎇.