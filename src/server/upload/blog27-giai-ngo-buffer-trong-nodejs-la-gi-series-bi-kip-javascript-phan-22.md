![image.png](https://images.viblo.asia/598d5b26-2d88-4fa2-a846-e4094c172f53.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Bạn có luôn bối rối, giống như mình, bất cứ khi nào bắt gặp các từ như **Buffer, Stream** và **binary data** trong `Node.js` không? Cảm giác đó có khiến mình không hiểu chúng, nghĩ rằng chúng không dành cho mình mà chỉ dành cho các *chuyên gia Node.js* và các *package developers* mới hiểu được?

Thật vậy, những từ đó có thể rất đáng sợ, đặc biệt là khi bạn bắt đầu với `Node.js` mà không qua bất kỳ trường lớp chính quy nào. Nhưng kể cả có cơ hội tiếp cận nó trong giản đường đại học  mình cũng ko nắm được nhiều vì lỡ đánh rơi bút trong giờ học  **binary data** ngẩng đầu lên thì thầy đã viết đầy 3 bảng :D.

Đáng buồn thay, nhiều hướng dẫn và sách thường sẽ chuyển thẳng sang hướng dẫn cách phát triển ứng dụng với các gói `Node.js` mà không cho bạn hiểu các tính năng cốt lõi của `Node.js` và tại sao chúng tồn tại. Và một số sẽ nói với bạn một cách trơ trẽn rằng bạn không cần phải hiểu chúng vì bạn **có thể không bao giờ** làm việc trực tiếp với chúng.

Chà, đúng là, bạn có thể không bao giờ làm việc trực tiếp với chúng nếu bạn vẫn là `Node.js` developer bình thường.

Tuy nhiên, nếu những điều bí ẩn khiến bạn thực sự tò mò và bạn sẽ không dừng lại ở đó để thỏa sự tò mò của mình. Bạn muốn nâng tầm hiểu biết về `Node.js` của mình lên một tầm cao mới, thì bạn thực sự muốn tìm hiểu sâu hơn để hiểu nhiều tính năng cốt lõi của `Node.js`, như **`Buffer`** chẳng hạn. Và đó chính xác là lý do tại sao mình viết bài này. Để giúp làm sáng tỏ một số tính năng và đưa việc học  `Node.js` của chúng ta lên một cấp độ mới :D.

Khi giới thiệu về **Buffer** , [tài liệu chính thức của Node.js](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html#buffer_buffer) có giới thiệu như sau…

> …Cơ chế để đọc hoặc thao tác với các `binary data stream`. Lớp `Buffer` như một phần của API Node.js để giúp nó có thể tương tác với các stream [octet](https://nodejs.org/api/buffer.html#bufindex) trong contexts của những thứ như stream TCP và hoạt động của file system....

Hmmm, trừ khi bạn có kiến ​​thức trước về tất cả các từ trong các câu trên, chúng có thể chỉ là một loạt các **từ ngữ chuyên ngành**. Hãy cố gắng đơn giản hóa điều đó một chút bằng cách diễn đạt lại nó, để có thể tập trung rõ ràng và không bị phân tâm bởi những **từ ngữ chuyên ngành** đó. Có thể giải thích đại khái như sau:

Lớp `Buffer` được giới thiệu như một phần của `API Node.js` để giúp nó có thể thao tác hoặc tương tác với các `binary data stream`.

Bây giờ điều đó đơn giản hơn phải không? Nhưng …`Buffer`, `streams`, `binary data`… những từ này cũng ko giễ mà :D. Ok, chúng ta hãy cố gắng giải quyết những từ này từ cuối cùng đến đầu tiên.

# Binary data (Dữ liệu nhị phân) là gì?

Bạn có thể đã biết rằng máy tính lưu trữ và biểu diễn dữ liệu bằng tệp `nhị phân (Binary)`. Nhị phân chỉ đơn giản là một tập hợp các số 1 và 0. Ví dụ: sau đây là năm `mã nhị phân` khác nhau (năm bộ số 1 và số 0 khác nhau):

`10`,`01`,`001`, `1110`,`00101011`

Mỗi số trong một hệ nhị phân bao gồm các số `1` và `0` được gọi là **Bit** , là một dạng rút gọn của **Binary digIT.**

Để lưu trữ hoặc biểu diễn một phần dữ liệu, máy tính cần chuyển đổi dữ liệu đó sang dạng biểu diễn nhị phân của nó. Ví dụ, để lưu trữ số `12`, máy tính cần chuyển `12` thành biểu diễn nhị phân của nó `1100`.

Làm thế nào để một máy tính biết cách thực hiện chuyển đổi này? :D Thực ra nó chỉ là một phép toán thuần túy và giống như số nhị phân đơn giản mà chúng ta đã học trong `toán` phổ thông - biểu thị một số với cơ số 2. Sử dụng máy tính Casio cũng thực hiện được phép tính này.

Nhưng số không phải là kiểu dữ liệu duy nhất mà chúng ta có thể chuyển thần số nhị phân. String, hình ảnh và thậm chí cả video cũng có thể chuyển thành mã nhị phân. Máy tính biết cách biểu diễn tất cả các loại dữ liệu đó dưới dạng `mã nhị phân`. Ví dụ, làm thế nào máy tính biểu diễn string “L” bằng `mã nhị phân`? Để lưu trữ bất kỳ ký tự nào thành `mã nhị phân`, Đầu tiên Máy tính sẽ chuyển đổi ký tự đó thành một số, sau đó chuyển đổi số đó thành biểu diễn nhị phân của nó. Vì vậy, đối với string “L”, trước tiên máy tính sẽ chuyển đổi **L** thành một số đại diện cho **L.**

Mở Terminal trình duyệt của bạn và dán đoạn code sau, sau đó nhấn enter `"L".charCodeAt(0)`:. Bạn đã thấy gì? là số 76? Đó là đại diện số hoặc **Character Code** hoặc **Code Point** của ký tự **L.** Nhưng làm thế nào một máy tính biết chính xác số nào sẽ đại diện cho mỗi ký tự? Làm thế nào nó biết sử dụng số `76` để biểu diễn **L**?

```console
"L".charCodeAt(0)
76
```

## **Character Sets**

`Character Sets` dùng để xác định các quy tắc về số nào đại diện cho ký tự nào. Chúng ta có các định nghĩa khác nhau về các quy tắc này, những quy tắc rất phổ biến bao gồm **Unicode** và **ASCII**. JavaScript thực sự hoạt động tốt với `Character Sets Unicode`. Trên thực tế, chính `Unicode` trong trình duyệt của bạn đã trả lời `76` là đại diện cho **L.**

Vì vậy, chúng ta đã biết cách máy tính biểu diễn các ký tự dưới dạng số. Bây giờ, đến lượt máy tính sẽ biểu diễn số 76 thành biểu diễn nhị phân. Bạn có thể nghĩ rằng chỉ cần chuyển đổi 76 thành hệ thống số cơ số 2. Không thế thì quá đơn giản :D tiếp tục phần tiếp theo nhé!

## **Character Encoding**

Cũng giống như các quy tắc xác định số nào sẽ đại diện cho một ký tự, cũng có các quy tắc xác định **cách** số đó nên được biểu diễn bằng mã nhị phân. Cụ thể là dùng **bao nhiêu bit** để biểu diễn số. Đây được gọi là **Character Encoding** .

Một trong những định nghĩa dùng cho việc `Character Encoding` là **UTF-8**. `UTF-8` nói rằng các ký tự phải được lập trình theo **byte.** Một byte là một tập hợp 8bit - 8bit bao gồm 1 và 0. Vì vậy, tám số 1 và 0 nên được sử dụng để đại diện cho `Code Point` của bất kỳ ký tự nào trong hệ nhị phân khi sử dụng `UTF-8`. ([Tham khảo thêm một số các Character Encoding khác tại đây](https://en.wikipedia.org/wiki/Character_encoding))

Để hiểu điều này, như chúng ta đã đề cập trước đó, biểu diễn nhị phân của số `12` là `1100`. Vì vậy, khi UTF-8 nói rằng `12` phải ở dạng tám bit, UTF-8 đang nói cho máy tính cần thêm nhiều bit hơn vào bên trái của biểu diễn `cơ số 2` thực tế của số `12` để biến nó thành một byte. Vì vậy, `12` nên được lưu trữ như `00001100`.

Do đó, `76` nên được lưu là `01001100` khi dung `Character Encoding UTF-8`, thay vì `1100` ở dạng cơ số 2 của nó.

Yeah chúng ta đã tìm hiểu cách mà máy tính lưu trữ các `string` bằng mã nhị phân. Tương tự như vậy, máy tính cũng có các quy tắc cụ thể về việc lưu các dữ liệu khác như: `hình ảnh` và `video` đẻ chuyển đổi và lưu trữ bằng dự liệu dưới dạng nhị phân. Tóm lại, máy tính lưu trữ tất cả các kiểu dữ liệu bằng tệp nhị phân được gọi là `binary data`.

Nếu bạn cực kỳ quan tâm đến tính thực tế của `Character Encoding`, bạn có thể thích [phần giới thiệu đơn giản và chi tiết này](https://www.w3.org/International/questions/qa-what-is-encoding) .

Bây giờ chúng ta đã hiểu `binary data` là gì, nhưng **binary data stream** từ phần giới thiệu của chúng ta về `Buffer` là gì?

# Stream

`Stream` trong Node.js chỉ đơn giản là một dữ liệu `string` được di chuyển từ điểm này sang điểm khác trong một thời gian nhất định. Hiểu đơn giản hơn là, bạn có một lượng lớn dữ liệu cần xử lý, nhưng bạn không cần phải đợi tất cả dữ liệu có sẵn rồi mới bắt đầu xử lý. (Chúng ta sẽ xử lý dần dần tới chừng nào xử lý từng đó)

Về cơ bản, dữ liệu lớn này được chia nhỏ và gửi thành nhiều phần (Chunk). Vì vậy, từ định nghĩa ban đầu của `Buffer` (“`binary data stream`… trong `contexts` của… `file system`”), điều này đơn giản có nghĩa là `binary data` được di chuyển trong `file system`. Ví dụ: di chuyển văn bản được lưu trữ trong file `1.txt` sang file `2.txt`.

Nhưng chính xác thì `Buffer` giúp chúng ta tương tác hoặc thao tác với `binary data` như thế nào trong khi truyền dữ liệu? Chính xác thì `Buffer` này là gì?

# Buffer

Chúng ta đã thấy rằng `stream` là sự di chuyển của dữ liệu từ điểm này sang điểm khác, nhưng chúng được di chuyển **chính xác** như thế nào?

Thông thường, sự di chuyển của dữ liệu thường là với mục đích xử lý hoặc đọc nó và xử lý gì đó dựa trên nó. Nhưng có một lượng dữ liệu tối thiểu và tối đa mà một quá trình có thể mất theo thời gian. Vì vậy, nếu tốc độ dữ liệu đến nhanh hơn tốc độ của quá trình xử lý dữ liệu, thì dữ liệu thừa cần phải đợi ở đâu đó cho đến khi đến lượt nó được xử lý.

Mặt khác, nếu quá trình xử lý dữ liệu nhanh hơn dữ liệu đến, thì một số ít dữ liệu đến sớm hơn (vẫn chưa đủ cho 1 lần xử lý. Ví dụ chúng ta xử lý 10 ký tự 1 lần chẳng hạn) thì nó cần phải đợi một lượng dữ liệu nhất định đến trước khi được gửi đi để xử lý.

“`Khu vực chờ đợi`” này là `Buffer`! Đó là một vị trí vật lý nhỏ trong máy tính của bạn, thường là trong `RAM`, nơi dữ liệu tạm thời được thu thập, chờ đợi và cuối cùng được gửi đi để xử lý trong quá trình `steaming`.

Ví dụ trực quan hơn: Chúng ta có thể coi toàn bộ `stream` và quá trình `Buffer` như một trạm xe buýt. Ở một số bến xe, xe buýt không được phép khởi hành cho đến khi có một lượng khách nhất định hoặc đến một giờ khởi hành cụ thể. Ngoài ra, hành khách có thể đến vào các thời điểm khác nhau với tốc độ khác nhau. Cả hành khách và bến xe đều không kiểm soát được việc hành khách sẽ đến bến vào lúc nào và bao nhiều người. `Buffer` chính là trạm chờ xe buýt đó. (*Cơm mưa rơi bên hiên hè văng chúng mình chung đường, ta bên nhau tình cơ trú mưa bên thềm (khả năng cao là nhà chờ xe buýt :D) ... Trú Mưa HKT*)

Trong mọi trường hợp, hành khách đến sớm hơn sẽ phải **đợi** cho đến khi xe xuất phát. Trong khi những hành khách đến khi xe buýt đã đến hoặc khi xe buýt đã khởi hành cần phải **đợi** chuyến xe tiếp theo.

Trong bất kỳ trường hợp nào có thể xảy ra, luôn có một nơi để chờ đợi. Đó là **Buffer**! Node.js không thể kiểm soát tốc độ hoặc thời gian dữ liệu đến, tốc độ của `stream`. Nó chỉ có thể quyết định thời điểm gửi dữ liệu. Nếu chưa đến lúc, Node.js sẽ đặt chúng vào `Buffer` - “`vùng chờ`” - một vị trí nhỏ trong `RAM`, cho đến khi gửi chúng ra ngoài để xử lý.

Một ví dụ điển hình khác mà bạn có thể thấy `Buffer` đang hoạt động là khi bạn xem các video trực tuyến. Nếu kết nối `internet` của bạn đủ nhanh, tốc độ của `stream` sẽ đủ nhanh để lấp đầy `Buffer` ngay lập tức và gửi nó ra ngoài để xử lý, sau đó điền vào một cái khác và gửi nó đi, rồi cái khác, và cái khác… cho đến khi `stream` kết thúc.

Nhưng nếu kết nối của bạn chậm, sau khi xử lý dữ liệu đầu tiên đến, trình phát video sẽ hiển thị biểu tượng đang tải hoặc hiển thị văn bản “`Buffer`”, có nghĩa là thu thập thêm dữ liệu hoặc chờ thêm dữ liệu đến. Và khi `Buffer` được lấp đầy và xử lý, trình phát sẽ hiển thị dữ liệu `video`. Trong khi phát, dữ liệu mới sẽ tiếp tục đến và chờ trong `Buffer`.

Nếu trình phát đã xử lý xong hoặc phát dữ liệu trước đó và Buffer vẫn chưa được lấp đầy, văn bản “Buffer” sẽ được hiển thị lại, thông báo rằng bạn cần chờ thu thập thêm dữ liệu để xử lý.

Đó là **Buffer!**

Từ định nghĩa ban đầu về `Buffer`, nó cho thấy rằng khi ở trong `Buffer`, chúng ta có thể thao tác hoặc tương tác với `binary data` đang được truyền trực tiếp (`stream`). Ngoài ra, chúng ta cũng có thể tương tác với `raw binary data - dạng dữ liệu thô` này. `Buffer` trong `Node.js` cũng cung cấp một danh sách về những gì có thể làm được. Hãy xem một số trong số chúng.

## Tương tác với Buffer

Thậm chí bạn còn có thể tạo `Buffer` của riêng bạn! Thật thú vị phải không? Thay vì phải ngồi chờ các `stream` tạo cho chúng ta. :D
Hãy tạo một cái như thế! (Và bạn cũng có thể tưởng tượng đây chính là `Buffer` mà ta sẽ nhận được trong quá trình `steam` mà chúng ta nhận được như đã nói ở trên)

Tùy thuộc vào những gì bạn muốn đạt được, có những cách khác nhau để tạo một vùng `Buffer`. Ví dụ

```javascript
// Tạo một buffer trống có kích thước 10. // Một buffer đó chỉ có thể chứa 10 byte.
const buf1 = Buffer.alloc(10);

// Tạo buffer với nội dung tùy chọn
const buf2 = Buffer.from("hello buffer");
```

Khi Buffer của bạn đã được tạo, bạn có thể bắt đầu tương tác với nó

```javascript
// Kiểm tra cấu trúc của một Buffer
buf1.toJSON(); // {type: 'Buffer', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}// Buffer trống
buf2.toJSON(); // {type: 'Buffer', data: [104, 101, 108, 108, 111, 32, 98, 117, 102, 102, 101, 114]}
// hàm toJSON() hiển thị dữ liệu dưới dạng các Unicode Code Points của các ký tự

// Kiểm tra kích thước của một Buffer
buf1.length; // 10
buf2.length; // 12. Tự động gán dựa trên nội dung ban đầu khi được tạo.

// Ghi vào Buffer
buf1.write("Buffer really rocks!") 

// Decode một buffer
buf1.toString(); // 'Buffer rea'
// Nó không chưa được toàn bộ string ở trên, bởi vì buf1 được tạo chỉ chứa 10 byte, nó không thể chứa phần còn lại của String
```

Có rất rất nhiều tương tác mà chúng ta có thể có với một Buffer. Hãy truy cập vào [các tài liệu chính thức](https://nodejs.org/dist/latest-v8.x/docs/api/buffer.html) để tìm hiểu hàm này.

Cuối cùng, mình sẽ để lại cho bạn một thử thách nhỏ này: Hãy đọc qua [source code zlib.js](https://github.com/nodejs/node/blob/master/lib/zlib.js), một trong những thư viện cốt lõi của Node.js, để xem cách nó tận dụng sức mạnh của `Buffer` để thao tác các `binary data stream`. Chúng hóa ra là các tệp được `gziped`. Và bạn sẽ hiểu tại sao nó lại là một trong những thứ quan trọng nhất khi chúng ta nhắc tới Node.js:
* Single-Threaded but Scalable
* Quick Code Execution
* **No Buffering**
* MIT License
* Event-driven
* Asynchronous APIs
* ....

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/11/blog27-giai-ngo-ve-buffer-trong-nodejs.html