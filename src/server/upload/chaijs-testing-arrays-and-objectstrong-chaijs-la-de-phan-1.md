# Lời nói đầu

Trong [màn dạo đầu trước](https://viblo.asia/p/chaijs-cam-thu-ngon-ngu-hoc-cua-chaijs-trong-mot-not-nhac-Ljy5Vp09Zra):relaxed:, các vị huynh muội đã được tại hạ giới thiệu xương xương về khái niệm cũng như cơ chế hoạt động và cách thức viết expectations với Chaijs.

Vậy thì hôm nay quần hùng chúng ta sẽ cùng tề tựu lên đỉnh :100: để tụ tập và tát tới tấp vào testing arrays & objects. Trong thực tiễn, việc lựa chọn sử dụng flagging properties & assertions để viết expectations cho arrays & objects thi thoảng lại trở nên rất dễ nhầm lẫn. Ở bài viết này, tại hạ sẽ dẫn các vị đi vào sâu hơn để tìm ra làm như thế nào chúng ta có thể coi testing arrays & objects với Chaijs là dễ :rofl:

Nếu các vị có chót bỏ lỡ màn dạo đầu thì **chớ xin đừng đi tiếp**! Hãy đọc dạo qua một vòng để có thể hiểu được sự khác biệt giữa flagging property và chainable method nhé.

Còn nếu các vị đã đọc rồi thì còn chờ đợi gì nữa. Chúng ta cùng bắt đầu thôi! :ok_hand:
À quên không nhắc, trong bài viết này, tại hạ xin phép được gọi `Arrays & Object` là `A&O`. Nếu thắc mắc về từ ngữ này khi đọc bên dưới thì chắc chắn các hạ chưa đọc được chú thích ở đây rồi :fist_oncoming:

# Lời nói sau

## Equality
Trọng nguyên của những sự nhầm lẫn xung quanh việc đưa ra các assertions về arrays & objects là khái niệm về sự so sánh bằng trong Javascript. Ví dụ:

```
expect([1, 2, 3]).to.equal([1, 2, 3]); // fails
```

Đối với những các hạ không làm việc nhiều với Javascript, mà thậm chí chính tại hạ cũng đã từng không ít lần cảm thấy rất đau đầu và tương đối nản với cách viết so sánh như thế này. Cứ nghĩ là `true` nhưng thực tế kết quả lại trả về `false`.

Cơ chế viết **so sánh bằng** như ví dụ trên thực chất là một cơ chế core của Javascript chứ không phải của Chaijs. Để kiểm chứng, các hạ có thể mở một node session và thử với lệnh như sau:

```
$ node
> [1,2,3] === [1,2,3]
false
```

Phép so sánh bằng trong Javascript được quy định rất rõ ràng và nghiêm ngặt. Nó kiểm tra nếu biểu thức bên trái đề cập đến cùng một điểm trong bộ nhớ mà biểu thức bên phải đang ở. Trong ví dụ trên, chúng ta có hai bản sao [1,2,3] (một bên trái và một bên phải). Bởi vì mỗi bản sao có địa chỉ riêng của nó trong bộ nhớ và chúng không chia sẻ cùng một định danh, nên Javascript’s strict equality `(===)` coi chúng không bằng nhau. Cho nên đương nhiên kết quả trả về sẽ là `false`.

Trong Chai.js, equal assertion cùng với hầu hết các assertions khác đều có sử dụng Javascipt’s strict equality.
Xuyên suốt trong quá trình test, các hảo hán trong thiên hạ thường không mong muốn strict equality mà thay vào đó họ sẽ hiểu theo nghĩa vế trái và vế phải sẽ bằng nhau vì chúng có cùng một nội dung. Điều này dẫn đến rất nhiều sai lầm trong quá trình viết expectations, cũng như là effort để tìm ra nguyên nhân và sửa lỗi.

## Deep Equality

Chai.js đã giải quyết vấn đề nêu trên cho các hảo hán này bằng cách cung cấp một đẳng thức so sánh bằng khác, đó là `eql`. 

`eql` được xây dựng dựa trên [deep-eql project](https://github.com/chaijs/deep-eql). Nó hoạt động bằng cách xem xét và chỉ chú trọng vào nội dung của các biểu thức được so sánh. Ví dụ:

```
expect([1, 2, 3]).to.eql([1, 2, 3]); // passes
```

Trông bề ngoài có vẻ đơn giản, nhưng nếu để ý kĩ, các vị có thể thấy rằng nó còn so sánh sự giống nhau ở mọi tầng của biểu thức.

```
expect([{a:1}, {b:2}]).to.eql([{a:1}, {b:4}]); // fails
expect([{a:1}, {b:2}]).to.eql([{a:1}, {b:2}]); // passes
```

Tương tự như so sánh trong mảng ở trên, với hai đối tượng cũng sẽ sử dụng `strict or deep equality`.

```
expect({ a: 1 }).to.equal({ a: 1 }); // fails
expect({ a: 1 }).to.eql({ a: 1 }); // passes
```

## Unordered Deep Equality

Deep equality là một cách tiếp cận rất tuyệt vời. Tuy nhiên, không có điều gì là hoàn mỹ và deep equality cũng vậy. Nó sẽ thực thi việc so sánh cả thứ tự và nội dung làm việc với các mảng. Trong thực tế, nhiều khi điều mà các hảo hán quan tâm chỉ là nội dung chứ không phải thứ tự cũng giống như việc họ chỉ cần một cái đao sắc nhọn chứ không cần biết đao liệu có hình thù như thế nào. Khi đó, nếu các hảo hán chỉ sử dụng `deep equality`, kết quả họ nhận được sẽ không còn được như ý muốn. Ví dụ:
```
expect([1,2,3]).to.eql([3,2,1]); // fails
```
Có một cách giải quyết những vấn đề này của các hảo hớn đó chính là việc sử dụng `members`. Nó chỉ so sánh nội dung và cho phép các assertions chỉ quan tâm đến các giá trị tồn tại bên trong mảng.

```
expect([1,2,3]).to.have.members([3,2,1]); // passes
expect([1,2,3]).to.have.members([1,2,3]); // passes 
```

**Cảnh báo quần hùng:** Một lỗi phổ biến khi viết expectations như trên đó là viết assertions với `include` thay vì sử dụng `have`. Ví dụ:
```
expect([1,2,3]).to.include.members([3,2,1]); // passes
```
Vấn đề ở đây chính là ý nghĩa và sự khác biệt giữa `include` và `have`. 

- `have` là một cosmetic property. Mặc dù nó không tạo ra bất cứ ảnh hưởng gì đến expectation nhưng việc sử dụng nó đúng cách sẽ làm cho expectation trở nên dễ đọc hơn.

- `include` là một chainable method. Nó sẽ thiết lập một flag để thay đổi hành vi của expectation. Hơn nữa, nó chỉ kiểm tra các giá trị đã cho (bên vế phải) nằm trong giá trị được kiểm tra (ở bên vế trái), kể cả khi có giá trị khác được thêm vào trong mảng được kiểm tra thì giá trị trả về vẫn đúng. Ví dụ:

```
expect([1,2,3,4]).to.include.members([3,2,1]); // passes
expect([1,2,3,4]).to.have.members([3,2,1]); // fails
```

Trong việc kiểm tra thứ tự và tính chính xác của các phần tử, các hạ có thể sử dụng các trường hợp sau để so sánh:
- **Vấn đề toàn vẹn** - .to.have.ordered.members
- **Vấn đề toàn vẹn không có thứ tự** - .to.have.members
- **Vấn đề không toàn vẹn và không có thứ tự** - .to.include.members
- **Vấn đề không toàn vẹn và có thứ tự** - Trường hợp này không thể xảy ra

Một điểm dễ gây nhầm lẫn khác đó là khi test với mảng phần tử không có thứ tự, Chaijs có 2 loại thuộc tính flag đó là `any` và `all`. Kể từ phiên bản 4.x, những flag này sẽ không thay đổi hành vi của `members` assertion (chúng chỉ ảnh hưởng đến `keys` assertion - chúng ta sẽ thảo luận bên dưới).

`any` và `all` có thể được sử dụng nếu nó làm cho expectation dễ đọc hơn. Tuy nhiên, hãy cẩn thận vì nó là con dao hai lưỡi. Nếu sử dụng quá nhiều hoặc không dùng lúc cần, các hạ sẽ làm cho người khác cảm thấy rất khó hiểu và ức chế vì nghĩ là bị cà khịa. Đặc biệt là những người quen dùng `any` và `all` khi viết các assertion tương tự. Trong ví dụ sau, hai expectation là tương đương nhưng được viết khác nhau:

```
expect([1,2,3]).to.have.members([3,2,1]); // passes
expect([1,2,3]).to.have.all.members([3,2,1]); // passes
```
Ngoài ra, với một mảng các giá trị nguyên thủy (non-objects array), việc viết cùng một expectation với `eql` hoặc `.ordered.members.` là hoàn toàn có thể. Các vị có thể xem ví dụ sau để rõ hơn:
```
expect([1,2,3]).to.eql([1,2,3]); // passes
expect([1,2,3]).to.have.ordered.members([1,2,3]); // passes
```
Tuy nhiên, có một vài sự khác biệt giữa `.ordered.members` và `.eql`:
- Thứ nhất là cách đọc :joy: đương nhiên là sẽ khác nhau.
- Thứ hai là thông báo lỗi.
```
AssertionError: expected [ 1, 2, 3 ] to have the same ordered members as [ 3, 2, 1 ]
```
# Lời cảm ơn và hậu tạ

Nói tóm lại hôm nay chúng ta đã học được
- **Equality**
  - Ý nghĩa
  - Vấn đề mà nó không giải quyết được và cần nhờ đến người anh em **Deep Equality**
- **Deep Equality**
  - Ý nghĩa
  - Vấn đề mà nó không giải quyết được và cần nhờ đến người anh em **Unordered Deep Equality**
- **Unordered Deep Equality**
  - Ý nghĩa
  - Một số sai lầm dễ mắc phải khi làm việc

Vì thời lượng của chương trình có hạn nên tại hạ xin phép được cáo ẩn giang hồ một thời gian. Mời bạn đọc đón xem Chapter 2 của seri **Chaijs là dễ** dự kiến phát sóng ngày 19/10/2019 tới trên Viblo.
Cảm ơn tất cả các bạn đã đón đọc!

![the-end-image](https://images.viblo.asia/638ca81b-8b22-4109-93d3-770999719453.jpg)