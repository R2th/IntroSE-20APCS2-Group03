*Một số khái niệm, kiến thức tổng quan khi tìm hiểu về NodeJS*. 

\
Kể từ khi công nghệ NodeJS bắt đầu được giới thiệu vào tháng 3 năm 2009 (first commit) cho đến nay trải qua 10 năm phát triển, NodeJS đã đạt tới hơn 22 nghìn commits trên github và 10 phiên bản. Sự phát triển mạnh mẽ của ngôn ngữ javascript và nodejs còn kéo theo kho mã nguồn mở npm và yarn trở thành kho module mã nguồn mở lớn nhất từ trước đến giờ, biến nodejs thực sự trở thành một hệ sinh thái phát triển phần mềm. Cách mạng công nghiệp 4.0 với xu hướng kết nối con người và vạn vật kết nối, cần một cấu trúc linh hoạt trong thời gian thực và nhẹ khiến việc tìm hiểu và ứng dụng nodejs càng trở nên cần thiết.  
<br>
NodeJS được sử dụng rộng bởi hàng ngàn lập trình viên trên toàn thế giới. NodeJS có thể chạy trên nhiều nền tảng hệ điều hành khác nhau từ Window cho tới Linux, OS X nên đó cũng là một lợi thế. NodeJS cung cấp các thư viện phong phú ở dạng Javascript Module khác nhau giúp đơn giản hóa việc lập trình và giảm thời gian ở mức thấp nhất.   

![](https://images.viblo.asia/b0955209-9f7f-45dc-85b2-de9887c7fbfb.jpg)  

<br>

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.   


<br>


Trên website chính thức của node – nodejs.org, nodejs được định nghĩa như là một nền tảng javascript runtime được xây dựng trên Chrome’s V8 engine, một trình thông dịch JavaScript cực nhanh chạy trên trình duyệt Chrome. Trên w3school, nodejs được định nghĩa như một môi trường máy chủ mã nguồn mở. Nodejs cũng có thể hiểu là một trình thông dịch mã javascript cho ta cách ta cách lập trình javascript để viết máy chủ web.  
Quay lại các khái niệm nền tảng trước nodejs:  

### 1.  Javascript runtime  
Có thể định nghĩa một cách đơn giản như là 1 trình thông dịch để thực thi mã javascript thành bytes code, ta có thể hiểu nó như một trình thông dịch (interpreter) hoặc trình biên dịch JIT (JIT compiter).   
*  Interpreter và Compiler:   
   + Interpreter: trình thông dịch là một thành phần có chức năng thực thi trực tiếp một đoạn mã nguồn (không qua trung gian).
   + Compiler: biên dịch là cách chuyển đổi ngôn ngữ này sang một ngôn ngữ khác tương đương, thường là machine code, từ đó thông dịch ra byte code.  
*    Ahead Of Time (AOT) và Just In Time (JIT) compilation:  Từ time được nhắc ở đây là runtime. AOT dịch mã nguồn trước khi bắt đầu thực hiện chương trình, còn JIT dịch mã nguồn trong khi thực hiện chương trình. Triết lý của JIT compilation là thay vì phải chờ compiler dịch toàn bộ source, việc có thể mất nhiều thời gian, ta dịch từng phần mà ta cần dùng trước rồi bắt đầu chạy với chúng ngay lập tức.
* Một số javascript engine nổi tiếng:  
    + [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey?fbclid=IwAR2ExQDqcSD7dQ5HkEivofjI_rFwsXGutf9U2wbJRtdDfaFwO0YwnyQwQbk) - Javascript engine đầu tiên, được dùng trên trình duyệt web đầu tiên trên thế giới - Netscape Navigator, hiện tại đang được sử dụng trên Firefox, mã nguồn viết bằng C và C++.  
    + [Chakra](https://github.com/Microsoft/ChakraCore?fbclid=IwAR27fnja1c-i-rf9mZN9Z4cO_5tGFixCBcHlmScnk0jiWdvoOhhrOqKHm0w) - Là một Javascript engine cũng khá lâu đời, ban đầu được sử dụng trên Internet Explorer và biên dịch[ JScript,](https://en.wikipedia.org/wiki/JScript?fbclid=IwAR3q5_d2unwHV9zW5I6pUf0XkdYduVM_7q_VMw6jsYMLoCLehSNNIzKRnzY) nay được dùng cho Microsoft Edge, viết bằng C++.  
    +[ Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino?fbclid=IwAR3eRLDFTYH-eQ_CN_rvsKip3eXxchU9joi3-zCGKiJ6dozjIeaci3uTJ3k) - Một engine viết hoàn toàn bằng Java, cũng có lịch sử phát triển lâu đời từ Netscape Navigator, hiện tại được phát triển bởi Mozilla Foundation.
    + JavaScriptCore  -  Javascript engine được Apple phát triển cho Safari 
    + [JerryScript](https://en.wikipedia.org/wiki/JerryScript?fbclid=IwAR0_FDseKnDIPSYULJSgdLcO0OH_QvywSDlcoeMrKe_HWL-TgxK3PNbPTOQ)  - một engine nhẹ được viết riêng cho các ứng dụng Internet of Things.
    + [V8](https://v8.dev/?fbclid=IwAR2gyNp5TkpdhnZOt6Cvbpu_2qv1lBvCicpTZBv4mXugVB7kAszbW7zr2ng)
    
    
### 2.  Chrome’s V8 engine

![](https://images.viblo.asia/9425b413-e4a3-45c3-8683-2086fb0ab3b0.png)

V8 là một open source JavaScript engine viết bằng C++, phát triển bởi Google như là một phần trong dự án Chromium, phát hành lần đầu cùng với phiên bản đầu tiên của trình duyêt Chrome. V8 compile trực tiếp JavaScript thành native machine code thay vì sử dụng interpreting bytecode theo cách truyền thống.   
* V8 thực thi chuẩn ECMAScript 262, 5th edition và chạy trên hầu hết mọi hệ điều hành như Windows (XP trở lên), MACOSX (10.5 trở lên) và Linux (sử dụng IA-32, x64 hoặc bộ xử lý ARM). 
* V8 dịch và thực thi mã nguồn javascript, cấp phát bộ nhớ cho các đối tượng, và “dọn rác” khi các đối tượng không dùng đến. Chính nhờ “bộ dọn rác” này là 1 trong những yếu tố làm cho V8 engine có hiệu năng tốt hơn cả.
* JavaScript được sử dụng chủ yếu ở phía khách (client-side) trong trình duyệt. V8 thao tác với các Document Object Model (DOM) và xử lý các phép toán trên đó.  

Nếu so sánh về về thời điểm ra mắt thì có lẽ V8 là một trong số các engine khá "trẻ". Đây là engine được thiết kế đặc biệt dành và tối ưu hóa hiệu năng cho các dự án Javascript lớn, như Node.js chẳng hạn. Còn cải thiện hiệu năng như thế nào thì còn phụ thuộc vào dòng bao nhiêu dòng code Javascript và bản chất của nó nữa. Ví dụ như nếu các chức năng trong ứng dụng của bạn có khuynh hướng lặp đi lặp lại, hiệu năng sẽ cao hơn các chức năng khác nhau mà chỉ chạy một lần.  
<br>

### 3. Mối liên hệ giữa Nodejs và V8

Được giới thiệu là một JavaScript Runtime, Nodejs có gì khác biệt với một JavaScript Engine? Tham khảo trên Stackoverflow, chúng ta có thể tạm hiểu như sau:  *JavaScript chạy trên một container – một chương trình sẽ nhận source code của bạn và thực thi nó. Chương trình này làm hai điều: Phân thích source code và thực thi từng đơn vị có thể*.  
<br>
Trên thực tế, V8 implement một ECMAScript theo đúng chuẩn, tức là những gì ngoài chuẩn thì không có mặt trong V8. Để tương tác với môi trường, V8 cung cấp các lớp template bọc ngoài các object và function viết bởi C++. Các C++ function này có thể làm nhiệm vụ đọc/ghi file system, thao tác networking hoặc giao tiếp với các process khác trong hệ thống. Bằng cách thiết lập một JavaScript context với global scope chứa các JavaScript instance tạo ra từ các template và chạy source code của chúng ta trong context này, mã của chúng ta đã sẵn sàng để giao tiếp với thế giới.  

![](https://images.viblo.asia/8e4937af-e5cb-4917-9f71-793ee9c97ab9.png)

<br>
Và đó là nhiệm vụ của một Runtime Library: Tạo ra một runtime environment cung cấp các thư viện built-in dưới dạng các biến global để mã javascript có thể sử dụng trong thời gian chạy, đón nhận source code như là một argument và thực thi nó trong context đã tạo.
<br><br>

Với browser runtime environment như Chrome, context mà Chrome cung cấp cho V8 bao gồm các biến global như window, console, DOM, XMLHttpRequest và timer. Tất cả những thứ ấy đến từ Chrome, không phải từ bản thân V8. Thay vào đó, V8 cung cấp các built-in object chuẩn, có mặt trong mọi environment của JavaScript, được miêu tả trong ECMAScript Standard, bao gồm các kiểu dữ liệu, operator, một số object và function đặc biệt như các value property (Infinity,  NaN,  null,  undefined), Object, Function, Boolean, String, Number, Map, Set, Array, parseInt(), eval(),…  
<br>
Đó là V8 phía trên browser, Node core mang đến cho chúng ta nhiều built-in library hơn như fs để giao tiếp với file system, http và https cho networking, tls, tty, cluster, os… Nodejs cung cấp nhóm nhiều chức năng vào các module khác nhau và thực hiện một cơ chế module loading thông qua từ khoá require và exports, cho phép tạo ra những context linh động hơn. Tất nhiên, đằng sau nhữngcơ chế này được implement bằng C/C++.  
<br>
Đó là diễn giải đằng sau lời giới thiệu runtime built on Chromes V8 JavaScript Engine của Nodejs, và đó là cách mã JavaScript thao tác với các low-level API, theo một cách đồng bộ (synchronous). V8 chạy mã trong một single thread, tuần tự từng lệnh một, sử dụng một cấu trúc để quản lý các active subroutine gọi là call stack.  
 <br>
Hiện nay, không chỉ trên V8 engine mà trên các trình dịch mã JavaScript khác như SpiderMonkey hay Charka, NodeJS cũng đang được phát triển dựa trên đó. Tuy nhiên với nhánh chính NodeJS trên github, NodeJS vẫn đang chính thức chạy trên V8. Dù chưa có một đánh giá nào lạc quan về benchmark của node core chạy trên engine này cả, nhưng chúng ta vẫn tin rằng V8 là 1 engine khá trẻ và sẽ còn phát triển hơn nữa.

 <br>
 
### 4. Tóm tắt

*  NodeJS là 1 môi trường (hoặc một nền tảng) mà trên đó ta có thể dùng mã javascript để viết server.
*  Mã javascript được viết ở ứng dụng nodejs sẽ được trình thông dịch (hoặc JIT compiler) dịch ra bytecode.
NodeJS chạy trên V8 engine nên tận dụng được các ưu điểm V8.  
  
### 5. Tại sao cần Nodejs
Trước khi Nodejs chưa ra đời, đề lập trình những ứng dụng realtime, có tốc độ tương tác giữa client và server nhanh, người ta thường sử dụng server C++,C# hoặc flash hoặc java applet. Điều này đòi hỏi lập trình viên cần phải biết thêm 1 ngôn ngữ mới (nếu không dùng javaweb hoặc C) hoặc cài thêm 1 addon của bên thứ 3. Nodejs ra đời nhằm giải quyết vấn đề này.   
<br>
Để lập trình fullstack, tức 1 project web, ngoài HTML,CSS, JS, lập trình viên cần tìm hiểu 1 ngôn ngữ tiếp theo để viết code phía server. Với NodeJs, chỉ cần 3 ngôn ngữ trên là đủ. Đặc biệt với xu hướng hiện nay, javascript đang là một hottrend, các chuẩn được hình thành và biên dịch nhanh hơn.   
<br>
Node.js sử dụng nguyên lý lập trình bất đồng bộ và giảm thiểu thời gian chờ đợi xử lý từ server. Tác vụ phổ biến cho 1 web server là có thể mở 1 tập tin trên server và trả về nội dung cho client (máy khách).  
<br>
**Đây là cách PHP hay ASP xử lý một yêu cầu tập tin (file request):**
* Gửi tác vụ đến hệ thống tập tin máy tính (máy server).
* Đợi trong khi tập tin được mở và đọc nội dung tập tin.
* Trả nội dung về client.
* Sẵn sàng xử lý các yêu cầu tiếp theo.

**Đây là cách Node.js xử lý một yêu cầu tập tin:**
* Gửi tác vụ đến hệ thống tập tin máy tính (máy server).
* Sẵn sàng để xử lý yêu cầu tiếp theo.
* Khi tập tin được mở và đọc tập tin, server trả kết quả về máy client.

![](https://images.viblo.asia/1e57f2ec-56c4-4ddd-9d01-e1c64e94a32f.png)
 

Node.js giảm thiểu thời chờ đợi và tiếp tục các yêu cầu tiếp theo. Node.js có đặc điểm giống như AJAX ở chỗ bất đồng bộ. Node.js chạy đơn luồng, không khóa (non-blocking), lập trình bất đồng bộ và rất hiệu quả bộ nhớ.  
<br>
[Cơ chế Non Blocking I/O ](https://www.slideshare.net/marcusf/nonblocking-io-event-loops-and-nodejs?fbclid=IwAR2B7XxrVysXjsVKY5R2QpiT4-R891_l59JZUumJ_RxWua-ZO9Hk5ECAO68)giúp máy chủ tạo ít process (hoặc thread) hơn, ít phải luân chuyển giữa các thread để xử lý các tác vụ. Máy chủ web Nginx cũng là một ví dụ tốt Non Blocking I/O chạy tốc độ vượt trội, tốn ít bộ nhớ so với máy chủ Apache sử dụng thread switching và thread pool để hứng, xử lý các yêu cầu. Khi tiến hành đo benchmark của NodeJS, dưới đây là 1 thí nghiệm:  
“*Khi tiến hành nhiều phép đo đạc tốc độ trên môi trường máy ảo giống hệt nhau về cấu hình, chúng tôi nhận thấy một thực tế không thể chối cãi, web site viết trên Node.js + Express luôn chạy nhanh hơn 1.5 - 2.5 lần web site PHP + Phalcon cùng cấu trúc, cùng hệ cơ sở dữ liệu, cùng cấu hình máy ảo. Trong nhóm các framework PHP, Phalcon luôn là đứng đầu bảng về tốc độ. Tốc độ xử lý của Phalcon trong vài trường hợp còn nhanh hơn cả HHVM.*”  
\
Có một số ý kiến cho rằng: hiện nay chi phí thuê máy chủ ngày càng rẻ. Có thể chỉ với 20$/tháng, đã có thể thuê một máy chủ ảo hóa 2 core 3.4 GHz, 2 GRAM DDR3, 40 G ổ cứng SSD, rẻ hơn so với năm 2012 khoảng 4 lần. Vậy nếu PHP là một ngôn ngữ phổ biến dễ học, có rất nhiều framework tuyệt vời như Laravel, WordPress, Joomla, Drupal, Magento, có sẵn các theme giao diện tuyệt đẹp chỉ mất khoảng 40 - 120 USD, người dùng có mọi thứ từ một bộ CMS ổn định đến giao diện đồ họa cấu hình là chạy. Tuy nhiên trang web load chậm không phải lúc nào cũng thiếu RAM hay CPU Core. Nếu xử lý không đúng chỗ thì việc bổ xung RAM, hay CPU Core không cải thiện được triệt để.

\
Trên là một số kiến thức nho nhỏ khi tìm hiểu về NodeJS ([To be continue... :ok_hand:](https://www.facebook.com/bkfateam/notes/))  
#### Link bài viết gốc của mình: [BKFA Team](https://www.facebook.com/notes/bkfa-team/nodejs-architecture-concept-p1/322131021648618/) :muscle: