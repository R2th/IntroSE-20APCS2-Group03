![image.png](https://images.viblo.asia/e99c292c-2958-40c4-95da-17bee0e14532.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Bạn có thể đã đọc những câu này trước đây…

> Node.js là một runtime để run các đoạn code JavaScript được xây dựng trên JavaScript Engine V8 của Chrome

> Node.js sử dụng `I/O` model theo hướng sự kiện, asynchronous Non-blocking

> Node.js hoạt động trên một single thread event loop

…Và bạn tự hỏi tất cả những điều này có nghĩa là gì. Hy vọng rằng đến cuối bài viết này, bạn sẽ hiểu rõ hơn về các thuật ngữ này cũng như Node là gì, nó hoạt động như thế nào, tại sao và khi nào thì nên sử dụng nó.

Hãy bắt đầu bằng cách xem qua các thuật ngữ.

GÉT GÔ 🤣

# `I/O` (Iput/Output)

Viết tắt của Input/Output, **I/O** chủ yếu đề cập đến sự tương tác của chương trình với ổ đĩa và network của hệ thống. Ví dụ về hoạt động `I/O` bao gồm đọc/ghi dữ liệu ổ đĩa, thực hiện các yêu cầu HTTP và giao tiếp với cơ sở dữ liệu. Chúng rất chậm so với việc truy cập bộ nhớ (RAM) hoặc thực hiện một logic nào đó trên CPU.

# **Synchronous (Đồng bộ) vs Asynchronous (Bất đồng bộ)**

[**Synchronous**](https://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js) (hoặc `sync` - Đồng bộ) thường đề cập đến code thực thi theo trình tự. Trong lập trình synchronous, chương trình được thực hiện từng dòng, từng dòng một. Mỗi khi một hàm được gọi, việc thực thi chương trình sẽ đợi cho đến khi hàm đó trả về trước khi tiếp tục đến dòng code tiếp theo.

**Asynchronous** (hoặc `async` - Bất đồng bộ) đề cập đến việc thực thi không chạy theo trình tự mà nó xuất hiện trong code. Trong lập trình asynchronous, chương trình không đợi tác vụ hoàn thành và có thể chuyển sang tác vụ tiếp theo.

Trong ví dụ sau, xử lý synchronous khiến các `alert` kích hoạt theo trình tự. Trong hoạt động asynchronous, trong khi `alert(2)` xuất hiện để thực thi lần thứ hai, thì không.

````js
// Synchronous: 1,2,3
alert(1);
alert(2);
alert(3);

// Asynchronous: 1,3,2
alert(1);
setTimeout(() => alert(2), 0);
alert(3);
````

Hoạt động asynchronous thường liên quan đến I/O, mặc dù `setTimeout` là một ví dụ về một cái gì đó không phải là `I/O` nhưng vẫn asynchronous. Nói chung, bất kỳ thứ gì liên quan đến tính toán đều là synchronous và bất kỳ thứ gì liên quan đến input/output/thời gian đều là asynchronous. Lý do khiến các hoạt động `I/O` được thực hiện asynchronous là chúng rất chậm và nó có khả năng block toàn bộ xử lý phía sau.

# **Blocking so với Non-blocking**

**Blocking** đề cập đến các hoạt động chặn thực thi cho đến khi hoạt động đó kết thúc trong khi **Non-blocking** đề cập đến code sẽ ko chặn thực thi. Hay như [Node.js](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/#blocking) docs có giải thích, *việc Blocking là khi quá trình thực thi JavaScript phải đợi cho đến khi một hoạt động không phải JavaScript hoàn tất*.

Các hàm Blocking thực thi synchronous trong khi các hàm Non-blocking thực thi asynchronous.

```javascript
// Blocking
const fs = require("fs");
const data = fs.readFileSync("/file.md"); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log

// Non-blocking
const fs = require("fs");
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```

Trong ví dụ đầu tiên ở trên, `console.log` sẽ được gọi trước `moreWork()`. Trong ví dụ thứ hai `fs.readFile()` là Non-blocking nên quá trình thực thi JavaScript có thể tiếp tục và `moreWork()`sẽ được gọi đầu tiên.

Trong Node, Non-blocking chủ yếu đề cập đến các hoạt động I/O. Còn lại trạng thái hiệu suất kém do sử dụng nhiều CPU hơn mà không phải những hoạt động như "chờ đợi một hoạt động không phải JavaScript, chẳng hạn như I/O" sẽ không được gọi là Blocking. (Mà đơn giản đó là do logic của bạn chậm 🤣)

Tất cả các hàm `I/O` trong thư viện chuẩn Node.js đều cung cấp các phiên bản asynchronous, Non-blocking và chấp nhận các hàm callback. Một số hàm cũng có thể là Blocking và thường có tên kết thúc bằng `Sync`.

Các hoạt động `I/O Non-blocking` cho phép một quy trình xử lý duy nhất phục vụ nhiều yêu cầu cùng một lúc. Thay vì chương trình bị Blocking và chờ các thao tác `I/O` hoàn tất. Các thao tác nhập/xuất được ủy quyền cho hệ thống để chương trình có thể thực thi đoạn code tiếp theo. Hoạt động `I/O Non-blocking` cung cấp một function callback được gọi khi hoạt động hoàn tất.

# **Callback**

**Callback** là một hàm được truyền dưới dạng đối số vào một hàm khác, sau đó có thể được gọi (`callback`) bên trong một hành động bất động bộ hoặc hàm khác. Lệnh gọi có thể ngay lập tức (`callback synchronous`) hoặc có thể xảy ra sau đó (`callback asynchronous`).

```javascript
// Sync callback
function greetings(callback) {
  callback();
}
greetings(() => {
  console.log("Hi");
});
moreWork(); // will run after console.log

// Async callback
const fs = require("fs");
fs.readFile("/file.md", function callback(err, data) {
  // fs.readFile is an async hàm provided by Node
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```

Trong ví dụ đầu tiên, hàm `callback` được gọi ngay trong hàm `greetings` bên ngoài và ghi vào `Terminal` trước khi `moreWork()` tiếp tục.

Trong ví dụ thứ hai, `fs.readFile` (một hàm `asynchronous` do `Node` cung cấp) đọc tệp và khi kết thúc, nó gọi hàm `callback` trả về lỗi hoặc nội dung tệp. Trong thời gian chờ đợi, chương trình có thể tiếp tục thực thi xử lý khác.

Một lệnh `callback asynchronous` có thể được gọi khi một sự kiện xảy ra hoặc khi một nhiệm vụ hoàn thành. Nó ngăn `Blocking` bằng cách cho phép `code` khác được thực thi trong thời gian chờ đợi.

[Thay vì](https://github.com/maxogden/art-of-node#callbacks) đọc code từ trên xuống dưới theo hướng thủ tục, các chương trình `asynchronous` có thể thực thi các `function` khác nhau tại các thời điểm khác nhau dựa trên thứ tự và tốc độ mà các `function` trước đó đã yêu cầu http hoặc đọc `file` từ tệp trên hệ thống. Chúng được sử dụng khi bạn không biết khi nào một số thao tác `asynchronous` sẽ hoàn tất.

Bạn nên tránh " [**Callback hell**](http://callbackhell.com/) ", tình huống mà các lệnh `callback` được lồng trong các lệnh `callback` và liên tục như vậy, làm cho `code` khó hiểu, khó `maintenance` và `debug`.

# Events và Event-driven programming (Lập trình hướng sự kiện)

**Events** là các hành động do người dùng hoặc hệ thống tạo ra, chẳng hạn như một cú nhấp chuột, một lần tải xuống tệp đã hoàn thành hoặc một lỗi phần cứng hoặc phần mềm.

**Lập trình hướng sự kiện** là một mô hình lập trình trong đó luồng chương trình được xác định bởi các sự kiện. Một event-driven programming thực hiện các hành động để đáp ứng các sự kiện. Khi một sự kiện xảy ra, nó sẽ kích hoạt một hàm `callback`.

Bây giờ, chúng ta hãy cố gắng hiểu `Node` và xem tất cả những thứ này liên quan đến nó sẽ hoạt động như thế nào.

# **Node.js: nó là gì, tại sao nó được tạo ra và nó hoạt động như thế nào?**

Nói một cách đơn giản, **Node.js** là một nền tảng thực thi các chương trình `JavaScript` phía máy chủ có thể giao tiếp với các nguồn `I/O` chẳng hạn như HTTP hoặc tệp trên hệ thống vv

Khi [Ryan Dahl](https://www.youtube.com/watch?v=ztspvPYybIY) tạo ra Node vào năm 2009, anh ấy lập luận rằng `I/O` đang được xử lý không chính xác, `Blocking` toàn bộ quá trình do lập trình `synchronous`.

Các kỹ thuật phục vụ web truyền thống sử dụng mô hình luồng, nghĩa là một luồng cho mỗi yêu cầu. Vì trong một hoạt động `I/O`, yêu cầu dành phần lớn thời gian để chờ nó hoàn thành, các kịch bản `I/O` chuyên sâu đòi hỏi một lượng lớn tài nguyên không sử dụng (chẳng hạn như bộ nhớ) được liên kết với các luồng này. Do đó, mô hình "*one thread per request*" cho một máy chủ không tốt cho việc mở rộng quy mô.

Dahl lập luận rằng phần mềm phải có khả năng đa tác vụ và đề xuất loại bỏ thời gian chờ đợi kết quả `I/O` trả lại kết quả. Thay vì mô hình luồng, Dahl đã đưa ra cách phù hợp để xử lý một số kết nối đồng thời `single-thread`, `event loop` và `I/O Non-blocking`. Ví dụ: khi bạn thực hiện một truy vấn đến cơ sở dữ liệu, thay vì đợi phản hồi, bạn `callback` cho nó để việc thực thi của bạn có thể chạy qua câu lệnh đó và tiếp tục làm những việc khác. Khi kết quả trả về, nó sẽ gọi hàm `callback` đó.

[**Event loop**](https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop) là thứ cho phép Node.js thực hiện các hoạt động `I/O Non-blocking` mặc dù thực tế JavaScript là single-thread. Một vòng lặp, chạy trên cùng một thread với code JavaScript, lấy một task từ code và thực thi nó. Nếu tác vụ `asynchronous` hoặc hoạt động `I/O`, vòng lặp sẽ đẩy nó xuống nhân hệ thống (`system kernel`), giống như trong trường hợp đối với các kết nối mới tới máy chủ hoặc thread pool (nhiều luồng), chẳng hạn như các hoạt động liên quan đến hệ thống tệp. Sau đó, vòng lặp lấy nhiệm vụ tiếp theo và thực hiện nó.

Vì hầu hết các `system kernel` hiện đại là đa luồng, chúng có thể xử lý nhiều hoạt động thực thi ở chế độ nền. Khi một trong các hoạt động này hoàn thành (đó là một sự kiện), `system kernel` sẽ thông báo cho Node.js biết để gọi lệnh `callback` thích hợp (phụ thuộc vào hoạt động hoàn thành) có thể được thêm vào hàng đợi thăm dò để cuối cùng khi mà Stack rỗng thì sẽ thực thi nó.

Node theo dõi các hoạt động `asynchronous` chưa hoàn thành và `event loop` tiếp tục lặp lại để kiểm tra xem chúng đã hoàn thành chưa cho đến khi tất cả chúng được thực hiện.

![image.png](https://images.viblo.asia/95960011-08ec-4ed0-8c9f-adadf0308327.png)

Để phù hợp với `event loop` `single-thread`, `Node.js` sử dụng thư viện [**`libuv`**](https://libuv.org/) để xử lý việc thực thi một số hoạt động `I/O` `asynchronous Non-blocking` song song. Các hàm gọi luồng chính tải các tác vụ lên hàng đợi tác vụ, các luồng trong `thread pool` sẽ kéo về và thực thi dần dần.

Các function ở luồng chính Non-blocking sẽ chạy bình thường, trong khi các function Blocking vốn có như `I/O` tệp chạy theo cách Blocking trên các luồng riêng của chúng được `system kernel` hỗ trợ. Khi một luồng trong `thread pool` hoàn thành một tác vụ, nó sẽ thông báo cho luồng chính về việc này, còn nó sẽ gọi `callback` đã được truyền vào trước đó.

![image.png](https://images.viblo.asia/de2d7c3c-b23b-4649-9aa3-cd036c1f48e5.png)

Tham khảo Philip Roberts tại JSConf EU: [Event loop là cái quái gì vậy?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

Hình ảnh trên được lấy từ bài thuyết trình của Philip Roberts tại JSConf EU: [Event loop là cái quái gì vậy?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) Mình khuyên bạn nên xem toàn bộ video để có thể tưởng tượng được cách hoạt động của `event loop`.

Sơ đồ giải thích cách `event loop` hoạt động với trình duyệt nhưng về cơ bản nó trông giống hệt nhau đối với Node. Thay vì các API web, chúng ta sẽ có các API Node.

Theo bản trình bày, `call Stack` (còn gọi là `ngăn xếp` thực thi hoặc “Stack”) là một cấu trúc dữ liệu ghi lại vị trí của chúng ta trong chương trình. Khi thực hiện một hàm, chúng ta đặt một thứ gì đó lên `call Stack`. Nếu chúng ta trả về từ một hàm, chúng ta lấy nó ra khỏi đầu `call Stack`.

Đây là cách `code` trong sơ đồ được xử lý khi chúng ta chạy nó:

1.  Đẩy `main()` vào `call Stack`
2.  Đẩy `console.log(‘Hi’);` vào `call Stack`, thực thi ngay lập tức ghi “‘Hi’” vào Terminal và được lấy ra khỏi `call Stack`
3.  Đẩy `setTimeout(cb, 5000)` vào `call Stack`. `setTimeout` là một API được cung cấp bởi trình duyệt (trên back-end, nó sẽ là một API Node). Khi `setTimeout` được gọi với hàm `callback` và một đối số `delay`, trình duyệt sẽ khởi động bộ hẹn giờ `Timer` với thời gian `delay`
4.  `setTimeout` được gọi đã hoàn tất và được lấy ra khỏi `call Stack`
5.  Đẩy `console.log(‘JSConfEU’);` vào `call Stack`, thực thi ngay lập tức ghi “JSConfEU” vào Terminal và được lấy ra khỏi `call Stack`
6.  `main()` được lấy ra khỏi `call Stack`
7.  Sau 5000 mili giây, bộ hẹn giờ API hoàn thành và lệnh `callback` được chuyển đến hàng đợi tác vụ
8.  `Event loop` kiểm tra xem `call Stack` có trống không vì `JavaScript` là single-thread và chỉ có thể thực hiện một việc tại một thời điểm. Nếu `call Stack` trống, nó sẽ lấy Item (có thể là `callback`) đầu tiên trên hàng đợi và đẩy nó lên `call Stack`. Do đó, vòng lặp đẩy lệnh `callback` vào `call Stack`
9.  Lệnh `callback` được thực thi, ghi `“there”` vào Terminal và được lấy ra khỏi `call Stack`. Và chúng ta đã hoàn thành.

Nếu bạn muốn đi sâu hơn vào chi tiết về cách `Node.js`, `libuv`, `event loop` và `thread pool` hoạt động, mình khuyên bạn nên xem qua những thứ [này](https://www.youtube.com/watch?v=cCOL7MC4Pl0), [cái này](https://www.youtube.com/watch?v=PNa9OMajw9w) và [cái này](https://www.youtube.com/watch?v=sGTRmPiXD4Y) cùng với [Node docs](https://nodejs.org/de/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop).

![image.png](https://images.viblo.asia/abc11c34-9bb2-40b7-a4f3-073480fc94b9.png)

# `Node.js`: **Sử dụng nó ở đâu và tại sao?**

Vì hầu như không có `Function` nào trong `Node` trực tiếp thực hiện `I/O`, quá trình này không bao giờ `Blocking`, làm cho nó trở thành một lựa chọn tốt để phát triển các hệ thống có khả năng mở rộng cao.

Do `Event loop` hướng sự kiện, đơn luồng và mô hình `I/O Non-blocking` `Asynchronous`, `Node.js` hoạt động tốt nhất trên các ứng dụng `I/O` cường độ cao đòi hỏi tốc độ và khả năng mở rộng với nhiều kết nối đồng thời, như truyền phát video và âm thanh, thực ứng dụng thời gian, trò chuyện trực tiếp, ứng dụng trò chơi, công cụ cộng tác hoặc phần mềm trao đổi chứng khoán.

`Node.js` có thể không phải là lựa chọn phù hợp cho các hoạt động chuyên sâu của `CPU`. Thay vào đó, mô hình luồng truyền thống có thể hoạt động tốt hơn.

# **npm**

![image.png](https://images.viblo.asia/3caf335a-03ff-4671-8c8c-025a785bdcaf.png)

**npm** là trình quản lý gói mặc định cho Node.js và nó được cài đặt vào hệ thống khi Node.js được cài đặt. Nó có thể quản lý các gói phụ thuộc cục bộ của một dự án cụ thể, cũng như các công cụ JavaScript được cài đặt global.

[www.npmjs.com](http://www.npmjs.com) lưu trữ hàng nghìn thư viện miễn phí để tải xuống và sử dụng trong chương trình của bạn nhằm giúp phát triển nhanh hơn và hiệu quả hơn. Tuy nhiên, vì ai cũng có thể tạo thư viện và không có quy trình kiểm duyệt để gửi, bạn phải cẩn thận với những thư viện chất lượng thấp, không an toàn hoặc độc hại. `npm` dựa vào báo cáo của người dùng để gỡ bỏ các gói nếu chúng vi phạm chính sách và để giúp bạn quyết định, nó bao gồm các số liệu thống kê như số lượt tải xuống và số lượng các gói tùy thuộc.

# **Cách chạy code trong Node.js**

Bắt đầu bằng cách cài đặt Node trên máy tính của bạn nếu bạn chưa có. Cách dễ nhất là truy cập [nodejs.org](https://nodejs.org) và nhấp để tải xuống. Trừ khi bạn muốn hoặc cần có quyền truy cập vào các tính năng mới nhất, hãy tải xuống phiên bản LTS (Hỗ trợ dài hạn) cho hệ điều hành của bạn.

Chạy một ứng dụng Node từ Terminal của máy tính bằng cách: tạo một tệp “`app.js`” và thêm `console.log(‘Hi’);` vào tệp đó. Trên Terminal của bạn, hãy thay đổi thư mục thành thư mục chứa tệp đó bằng cách `cd /path/...` và chạy `node app.js`. Nó sẽ ghi “Hi” vào Terminal.

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog21-tat-ca-nhung-gi-ban-can-e-hieu.html