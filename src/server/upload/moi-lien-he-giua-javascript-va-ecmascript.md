## Đặt vấn đề
Có bao giờ bạn thử google với từ khóa *“Sự khác biệt giữa JavaScript và ECMAScript”* chưa? 
<br/>
Kết quả cho ra sẽ là một biển các định nghĩa mà mới đọc lần đầu sẽ không khỏi bàng hoàng vì tính mơ hồ và không-thống-nhất của chúng nó.

*“ECMAScript is a standard.”*

*“JavaScript is a standard.”*

*“ECMAScript is a specification.”*

*“JavaScript is an implementation of the ECMAScript standard.”*

*“ECMAScript is standardized JavaScript.”*

*“ECMAScript is a language.”*

*“ECMAScript is JavaScript.”*
<br/>
![](https://images.viblo.asia/468607a9-bf00-44ad-8328-96d443b69a96.gif)

Để các bạn đi sau không rơi vào trạng thái hoảng loạn, chúng ta sẽ cùng lao vào mớ lộn xộn này để tìm ra lời giải thích hợp lý và chính xác nhất để không còn bị bối rối mỗi khi nói về ES6, ECMAScript 2015 hay JavaScript nữa 😺😺
## Đối tượng của bài viết
Bài viết này dành cho những bạn nào đã khá quen thuộc với JavaScript và mong muốn hiểu được một cách rõ ràng nhất mối quan hệ giữa ECMAScript, web browser, Babel và một vài thứ khác. Ngoài ra, ta sẽ hiểu thêm về ngôn ngữ script nói chung, JavaScript engine và JavaScript runtimes.

Okay, bắt đầu nhé ! 👌👌

## Các thuật ngữ chính
### ECMA International
![](https://images.viblo.asia/c0b3ef2a-11bb-4aa5-aa72-f4a7a45b4024.jpg)
> Là một tổ chức tạo ra tiêu chuẩn (standard) cho các công nghệ.

Tiêu chuẩn” là gì? Để hiểu khái niệm này, hãy nghĩ về chiếc bàn phím mà các bạn hay sử dụng trên chiếc điện thoại, laptop hay PC. Mặc dù các loại bàn phím này khác nhau về hãng sãn xuất, nhưng chúng vẫn dùng chung một layout (vị trí các phím chữ cái, phím số, phím chức năng, Enter đều nằm trên các vị trí giống nhau). Đó là vì các hãng sản xuất bàn phím đang tuân thủ theo ***QWERTY layout standard***.

*Như vậy tiêu chuẩn có thể được hiểu là một văn-bản được một tổ chức có-uy-tín trong một cộng đồng công bố và đòi hỏi tất cả các sản phẩm liên quan ra đời sau đó cần tuân theo các quy định trong tài liệu này.*
### ECMA-262

![](https://images.viblo.asia/8c87b26c-a8d3-415c-ba98-6508c642b878.png)
<br/>
> Đây là một tiêu chuẩn được tổ chức ECMA International công bố, chứa các đặc tả hay quy định cho các ngôn ngữ script nói chung.

<br/>

***Nhưng tại sao lại là con số 262 =)))***

*Giả sử bạn đang ở trong một tổ chức khá lớn, tổ chức này viết rất nhiều tiêu chuẩn cho công nghệ nói chung, mỗi lần tổ chức cần viết ra một tài liệu gì đều lập ra một cái lịch biểu, trong lịch biểu đó mỗi task đều được tổ chức đề cho nó 1 mã như một ID để phân biệt, trường hợp này ECMA-262 chính là mã nhiệm vụ tạo tài liệu ECMAScript*

### Scripting language 
![](https://images.viblo.asia/e0c3f672-89e0-4090-9d53-0e9652dc59a2.jpg)
> Một loại ngôn ngữ được thiết kế ra để sử dụng lại các “thực thể hoặc hệ thống” đã được định nghĩa sẵn từ đầu.
> 

Nôm na là như này, khi bạn có một thư viện đã có sẵn các hàm như “walk”, “run”, “jump”, những hàm này có chức năng di chuyển một đồ vật hoặc di chuyển một nhân vật trong game. Tuy nhiên, các hàm này không thể được thực thi nếu không có chỗ nào gọi đến chúng. Lúc ấy, tập hợp đoạn gọi ra các hàm này được gọi là scripting-language, đây là *một loại ngôn ngữ tập trung vào việc sử dụng lại các thư viện đã có trong hệ thống*.

### ECMAScript
*Từ khóa tương đương:  ECMAScript specification* <br/>
![](https://images.viblo.asia/a02cf348-c5ea-4930-ac07-88d697b67487.jpg)
<br/>
Đặc tả này được định nghĩa trong `ECMA-262` nhằm mục đích tạo ra tiêu chuẩn cho ngôn ngữ Script nói chung, nó cung cấp một bộ các quy tắc, đặc tả và hướng dẫn mà bắt buộc các ngôn ngữ script phải theo dõi và cân nhắc trong quá trình được triển khai nếu các tác giả của các ngôn ngữ này muốn được công nhận là phù hợp với tiêu chuẩn ECMAScript.
#### JavaScript

![](https://images.viblo.asia/c9814e98-55a5-45b7-94bb-025cd9b56192.jpg)
Đây là một ngôn ngữ Script đã được triển khai dựa vào các chỉ dẫn trong tài liệu ECMAScript.

> JavaScript is dialect of the ECMAScript language
>
Một ngôn ngữ được coi là “dialect” *(biến thể)* của ngôn ngữ khác khi nó kế thừa hầu hết các khai báo, cú pháp của ngôn ngữ tiền bối của nó nhưng vẫn có một ít đặc trưng đủ để khiến nó trở nên khác biệt với các ngôn ngữ còn lại.<br/>
**JavaScript chính là một biến thể của ngôn ngữ ECMAScript.**
<br/>
Các lập trình viên tạo lên Javascript đã dựa vào tiêu chuẩn của ECMAScript để tạo ra, cập nhật và phát triển ngôn ngữ này. Như vậy, chúng ta có thể đi đến kết luận, nếu chúng ta đọc đặc tả trong tài liệu ECMAScript, chúng ta sẽ biết cách tạo-ra một ngôn ngữ Script. Nhưng nếu chúng ta đọc tài liệu JavaScript, chúng ta sẽ biết được cách để sử dụng một ngôn ngữ script.

### A JavaScript engine
*Từ khóa tương đương: JavaScript interpreter, JavaScript implementation.*
![](https://images.viblo.asia/cfcef4e4-24fd-48a8-a8cb-d831f2e28b33.png)

> Một chương trình hiểu được và thực thi được các đoạn code được viết bằng JavaScript.

Các JavaScript engine thường được tìm thấy trong các trình duyệt Web như *V8 ( của Chrome), SpiderMonkey ( của Firefox), Chakra ( của Edge)*. Mỗi engine tương tự như một language-module tương ứng với ứng dụng của nó, cho phép hỗ trợ một tập hợp các tập con của ngôn ngữ JavaScript.
<br/>

#### Hiệu năng của Javascript trên các trình duyệt

Cũng tương tự như sự khác biệt giữa những người cùng nói và hiểu chung một ngôn ngữ (một số người có thể biết một vài từ mới, một vài cách diễn đạt và một vài quy tắc mà một số khác lại không biết và ngược lại), các trình duyệt cũng như vậy. <br/>
> Dù các JavaScript engines của trình duyệt hiểu được JavaScript, nhưng một số trình duyệt lại có khả năng hiểu biết JavaScript tốt hơn.

<br/>
Liên quan đến sự hỗ trợ của trình duyệt, mọi người thường nói về ECMAScript compatibility , mặc dù JavaScript engines phân tích cú pháp và thực thi JavaScript chứ không phải là ECMAScript. 
<br/>
Đoạn này nghe có vẻ không liên quan lắm, tuy nhiên có một lời giải thích hợp lý cho điều này:
<br/>
ECMAScript là một đặc tả chứa một loạt các yêu cầu đòi hỏi các nhà phát hành ngôn ngữ Script phải tuân theo. 

**Việc phát hành một phiên bản mới của ECMAScript không có nghĩa là toàn bộ JavaScript engines của các hãng phần mềm hiện tại bắt buộc phải có các tính năng mới này**. Nó phụ thuộc vào các nhóm hoặc các tổ chức chịu trách nhiệm cho việc JavaScript engines phải là-bản-mới-nhất tương ứng với các đặc tả ECMAScript mới-nhất. Họ không cập nhật toàn bộ các tính năng mới vào một lúc mà chỉ cập nhật dần dần theo kế hoạch

### JavaScript runtime
> Môi trường mà các đoạn code JavaScript được chạy trong đó và được thông dịch bởi JavaScript engine. 
> 
Môi trường runtime cung cấp các **host-objects** *(host environment)*, đây là những objects mà JavaScript sẽ điều khiển và thao tác trên đó.
JavaScript runtime chính là “thực thể hoặc hệ thống” đã được đề cập trong phần định nghĩa *Scripting Language* ở trên. 
<br/>
![](https://images.viblo.asia/b8b1fd8f-d9bd-47c2-b68a-0797d0bb8fef.png)
> > Các đoạn code được đưa vào JavaScript engine, JavaScript engine sẽ phân tích các đoạn code này xem chúng tương ứng với những hành động nào được định nghĩa trong JavaScript runtime và thực thi những hành động này.

Các ứng dụng nếu muốn hỗ trợ ngôn ngữ JavaScript, chúng phải tạo ra được các “host objects” tại thời điểm runtime. Cụ thể:
* Với phía client:
    * JavaScript runtime: trình duyệt Web
    * Host objects: window, document, các đối tượng chứa trong nó các phương thức để điều khiển logic hiển thị các thành phần trên trình duyệt
* Với phía server:
    * JavaScript runtime: Node.js
    * Host objects: file system, processs, requests trong Node.js


Bạn nào đã từng code JavaScript cho các ứng dụng Web chắc chắn ít nhất một lần sử dụng `document` hoặc `window`. **`window` và `document` không phải là một tính năng mặc định được JavaScript cung cấp. Chúng chỉ là các Web APIs được cung cấp bởi trình duyệt và xuất hiện với vai trò là JavaScript-host-environment**. 
Có một điểm khá thú vị: 
> Các JavaScript runtime khác nhau có thể chia sẻ chung một JavaScript engine. 
> 
Ví dụ như V8 là JavaScript engine được sử dụng trên cả Google Chrome và Node.js  — Đây là hai môi trường khác hẳn nhau. 😃😃

### ECMAScript 6
*Từ khóa tương đương:  ES6, ECMAScript 2015* <br/>
![](https://images.viblo.asia/99edfe92-70ac-4691-bafd-35f8636e2b48.jpg)
Đây là phiên bản thứ 6 của tiêu chuẩn ECMA-262 với những thay đổi lớn và cản thiện văn bản đặc tả ECMAScript.
*Phiên bản ECMAScript thay đổi từ ES6 sang ES2015 bởi vì vào năm 2015, tổ chức ECMA International quyết định sẽ hàng năm xuất bản tài liệu này. Theo đó, đặc tả ECMAScript được dựa trên năm mà chúng được công bố.*
### Babel
*Transpiler (transforming + compiler) là một cách gọi các công cụ có tác dụng chuyển đổi code từ một phiên bản A về một phiên bản B đối với từng ngôn ngữ.*

> Babel là một transpiler có tác dụng chuyển đổi code ES6 về code ES5.
> 
![](https://images.viblo.asia/7e37d3a4-09ad-4686-9d6c-0b3f608412aa.png)
Babel dành cho các developer muốn đưa các tính năng mới nhất của ES6 vào ứng dụng của mình nhưng vẫn cần chạy các tính năng này trên tất hầu hết các trình duyệt. Babel sẽ giúp developer chuyển đổi code ES6 về ES5, vì phiên bản ES5 đã được hỗ trợ trên hầu hết tất cả các trình duyệt.

## Kết
 Trước khi kết bài, mình muốn chia sẻ thêm một chút thông tin dành cho các developer trẻ chưa có nhiều kinh nghiệm như mình:
#### Câu chuyện con gà hay quả trứng
JavaScript được tạo ra năm 1996, sau đó được gửi tới tổ chức ECMA International năm 1997 để viết ra văn bản ECMAScript. Về mặt logic mà nói, ngay tại thời điểm này, JavaScript vừa thỏa mãn tất cả các đặc tả viết trong văn bản ECMAScript, vừa là một ví dụ cho ngôn ngữ implement đặc tả này tốt nhất.

**Như vậy, ECMAScript được xây dựng dựa trên JavaScript và JavaScript cũng được xây dựng dựa vào ECMAScript.😭😭???**

Đây có lẽ là lời giải thích mình cảm thấy hài lòng cho câu hỏi: ECMAScript, JavaScript, cái nào có trước? 😄

Hi vọng các thông tin trong bài viết này giúp các bạn cảm thấy tự tin mỗi khi nói về JavaScript hay ECMAScript.
<br/>
![](https://images.viblo.asia/a37ee87c-8f15-4d2d-bfd1-aed1ce07926e.gif)
<br/>
Thanks for reading ❤
<br/><br/>
Reference: [Medium](https://medium.freecodecamp.org/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5)