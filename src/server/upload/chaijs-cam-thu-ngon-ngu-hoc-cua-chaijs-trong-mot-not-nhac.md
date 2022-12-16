## Vậy Chaijs là gì?

Đầu tiên, đương nhiên các hạ sẽ phải tìm hiểu sơ lược về định nghĩa của **Chaijs**

![Chaijs-logo](https://images.viblo.asia/c04cd2f2-3121-4d88-8bb1-b49ef04cceb8.png)

**Chaijs** đơn giản chỉ là **một assertion library** cho node và trình duyệt. Điểm hay là ở chỗ thư viện này có thể tích hợp với bất cứ **testing framework** nào của **javascripts**.

Nếu các hạ có nhu cầu muốn tìm hiểu chính xác hơn về định nghĩa của **Chaijs** vui lòng bấm nhẹ vào [vùng kín.](https://www.chaijs.com/) Trong trường hợp các hạ vẫn mong muốn tiếp tục đọc bài viết này của tại hạ, vui lòng không bấm gì cả chỉ đơn giản kéo chuột  xuống mà thôi.

## Các kiểu cú pháp để viết expectation

Ngôn ngữ được tích hợp trong Chai.js đôi khi có thể là một chút thách thức đối với những sư huynh muội làm việc nhiều với các nền tảng như RSpec hoặc JUnit hoặc cho những người mới bắt đầu lập trình. Với cú pháp tương tự như tiếng Anh nhưng có lẽ thật khó để hiểu chính xác những gì đang muốn được thể hiện trong một câu lệnh. May mắn thay, tại hạ đã lọc ra các cơ chế hoạt động chính của ngôn ngữ này để giúp các vị huynh đệ dễ dàng hơn trong việc hiểu rõ và viết những expectations của Chai.js.

Còn chờ gì nữa, chúng ta bắt đầu thôi nào!

**Chaijs** cho phép sử dụng 3 loại cú pháp để viết expectations:

```
value.should.XXX 
expect(value).XXX
assert.XXX(value)
```

## Loại cú pháp nào là thích hợp nhất?

Thật sự thì rất khó để có thể phân định loại cú pháp nào là tốt nhất trong những cú pháp kể trên. Tuy nhiên, cá nhân tại hạ cảm thấy loại cú pháp thông dụng nhất mà sử lý được tất cả các trường hợp expections một cách nhanh gọn lẹ thì chính là **expect syntax**.

**Expect** là một hàm lấy một đối số duy nhất **là giá trị** được kiểm tra hoặc cha của giá trị được kiểm tra tùy thuộc vào assertion.

Tất cả các expectations đối với **giá trị** là thuộc tính hoặc phương pháp. Các expectations được thêm hoặc xâu chuỗi vào đầu ra của hàm mong đợi. Hoạt động của nó cũng giống như [builder pattern](https://viblo.asia/p/hieu-biet-co-ban-ve-builder-pattern-5y8Rr7L9Mob3), trong đó trả về của mỗi phương thức hoặc thuộc tính là đối tượng được khởi tạo.

```
expect(valueUnderTest).foo.bar.whatever;
```

## Thuộc thức của Chaijs

**Chai.js** bao gồm **ba loại thuộc tính** và **hai loại phương thức**. Các thuộc tính và phương thức này có thể được kết nối lại với nhau để tạo ra chuỗi expectations. 

Hãy cùng tại hạ đảo qua một vòng xem **thuộc thức** của Chaijs là như thế nào nhé!

Thứ nhất, về thuộc tính, Chaijs bao gồm 3 loại đó là:
* Assertion Property
* Cosmetic Properties
* Flagging Property

Thứ hai, về phương thức, Chaijs có 2 loại đó là:
* Method
* Chainable Method

### Assertion Property

Các từ khóa cơ bản nhất để sau **expect** chính là một **Assertion Property**.

```
expect(‘foo’).undefined; // fails
```

**Assertion Property** áp dụng cho một hoặc nhiều assertions đối với giá trị được kiểm tra. Trong ví dụ trên, chuỗi **foo** được dự kiến là sẽ không được xác định. Tuy nhiên, điều này thực tế là sai vì chuỗi **foo** đã được xác định. Vì vậy, bài test này sẽ trả về kết quả **failed**. Điều quan trọng là việc khai báo **.undefined** thực sự đang chạy một hàm thực thi một xác nhận.

Hành động này là hoàn toàn có thể vì nó giống như cách các thuộc tính Javascript hoạt động. Đơn giản, bạn có thể gọi **obj.property** để lấy ra một giá trị, nhưng **Object.defineProperty** thực sự cho phép lấy một giá trị tĩnh hoặc một hàm được gọi mỗi khi thuộc tính đó được khai báo. Nó là hành vi thứ hai trong Javascript mà Chai.js đang sử dụng để chạy các xác nhận.

**Chai.js** có **13 assertion properties** bao gồm: ok, true, false, null, undefined, NaN, exist, empty, arguments, itself, sealed, frozen, and finite.

### Cosmetic Properties

Không giống như các công cụ trong RSpec, Chai.js bao gồm các **Cosmetic Properties** không có tác dụng đối với hành vi, mà thay vào đó, nó được thêm vào ngôn ngữ tự nhiên để làm cho câu lệnh trở nên rõ ràng và dễ hiểu hơn với con người.

```
expect(‘foo’).to.be.undefined; // fails
```

Trong ví dụ trên đây, việc sử dụng **to** và **be** không làm thay đổi ý nghĩa của expectation. Trước đó, **expect foo undefined** là hơi mơ hồ vì nó không mô tả mối quan hệ giữa **foo** và **undefined**. Việc bổ sung các **Cosmetic Properties** vào làm cho ý nghĩa của mong đợi trở nên rõ ràng hơn rất nhiều.

**Chaijs** bao gồm **15 cosmetic properties**: to, be, been, is, that, which, and, has, have, with, at, of, same, but, and does.

**Lưu ý:** Do các Cosmetic Properties là không có tác dụng, nên một chuỗi expectation chỉ chứa các Cosmetic Properties đương nhiên sẽ luôn luôn passed.
 Ví dụ:
 ```
 expect(‘foo’).have.to.with.same.be; // passes
 ```
 
Trong hi hữu trường hợp, tại hạ đã từng thấy một số huynh đài sử dụng một chuỗi toàn các Cosmetic Properties để đưa ra expectation. Việc này làm cho bài test trở nên vô nghĩa và tốn effort để bảo trì. Không thể phủ nhận rằng có nhiều trường hợp sai phạm xảy ra do quá trình tái cấu trúc lại source code hoặc công việc của các vị huynh đài trên bị gián đoạn. Tuy nhiên, tốt nhất vẫn là nghĩ đến cách giải quyết thay vì tìm ra nhược điểm.
Vì vậy, câu chuyện lưu ý trên là một ví dụ tốt về nguyên tắc TDD rằng **Hãy đảm bảo thử nghiệm thất bại trước khi nó vượt qua**.

### Flagging Property

**Flagging Property** không đưa ra một xác nhận. Thay vào đó, giống như cái tên của thuộc tính này, nó đặt một flag trên chuỗi expectations mà các xác nhận khác trên chuỗi có thể đọc được. Hơn nữa, sự tồn tại của một flag không tự thay đổi bất cứ điều gì mà nó cần kết hợp cùng với các xác nhận riêng khác để quyết định cách giải thích flag. Ví dụ:

```
expect(‘foo’).to.not.be.undefined; // passes
```

Trong ví dụ trên, khi **not** được bao gồm trong chuỗi expectation, nó sẽ thêm một flag với nghĩa phủ định nhưng đúng với chuỗi. Vì vậy, xác nhận sau thời điểm này sẽ trả về mong đợi ngược lại. Trong trường hợp trên, cụm **foo** sẽ được mong đợi là **không bị không xác định** (hay còn có nghĩa là xác định) cho nên kết quả trả ra sẽ là passed.

**Chaijs** bao gồm **7 flagging properties** là: not, deep, nested, own, ordered, any, and all.

Tương tự như Cosmetic Properties, khi chỉ có sự pha trộn giữa các flagging và cosmetic properties sẽ không gây ra bất kỳ xác nhận nào để chạy, và do đó test sẽ không bao giờ thất bại. Ví dụ:

```
expect(‘foo’).to.not.be; // passes
```

### Method

Về khái niệm, phương thức là một thuộc tính khẳng định có một hoặc nhiều giá trị bổ sung. Điều này cho phép (các) khẳng định được tùy chỉnh.

```
expect(‘foo’).to.equal(‘bar’); // fails
```

Chaijs bao gồm khá nhiều phương thức như: a (aliased as an), include (aliased as includes, contain, and contains), equal, eql, above, below, least, most, within, instanceof, property, ownPropertyDescriptor, lengthOf, match, string, keys, throw, respondTo, satisfy, closeTo, members, oneOf, change, increase, decrease, by, and fail.

Hơn nữa, việc trộn lẫn các phương thức và thuộc tính để sử dụng là hoàn toàn khả dụng.

```
expect(‘foo’).to.equal(‘foo’).and.not.be.undefined; // passes
```

Những flagging properties thêm một flag áp dụng cho tất cả các thuộc tính và phương thức xuất hiện sau thuộc tính được flag trong chuỗi expectation. Điều này khẳng định là việc sắp xếp trật tự là quan trọng. Nếu sắp xếp sai trật tự, các hạ hoàn toàn có thể viết ra một câu lệnh sai lệch hoàn toàn.

```
expect(‘foo’).to.not.be.undefined.and.equal(‘foo’) // fails
```

Trong trường hợp trên, **not** đang được áp dụng cho flag phủ định sớm trong chuỗi. Những mệnh đề này, cả **undefined** và **equal** đều được mong đợi là giá trị test sẽ không xác định và không bằng với string **foo**. Điều này sẽ dẫn đến một khẳng định sai.

### Chainable Method

Đúng như tên gọi của nó, **phương thức chuỗi** có thể kết hợp nhiều loại trước đó thành một từ khóa duy nhất. Điều này giúp cho câu lệnh của tại hạ mỗi lần sử dụng trở nên ngắn gọn và đơn giản hơn rất nhiều.  Các **phương thức chuỗi** có thể được sử dụng như một phương thức, cung cấp cho nó một giá trị hoặc như một thuộc tính, không cho nó các giá trị và bao gồm nó trong chuỗi expectation.

```
expect([1, 2, 3).to.include(3); // passes
expect({ a: 1, b: 2 }).to.include.keys('a'); // passes
```

**Chaijs** bao gồm **4 phương thức** có thể coi như là những thuộc tính đó là: a (aliased as an), include (aliased as includes, contain, and contains), length, lengthOf.


Vậy là tại hạ đã dẫn các huynh muội đi dạo qua một vòng các cơ chế ngôn ngữ cơ bản của Chai.js, đã đến lúc các vị bắt đầu đọc tài liệu kĩ càng hơn để tự tìm ra những câu lệnh expectations riêng và viết the awesome things rồi.

See you soon.
Thanks to Titus Stone!

Reference:

https://www.chaijs.com/guide/

https://medium.com/@danesamonica/how-i-use-mocha-js-chai-js-for-testing-4831a7c030c3