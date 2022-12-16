![https://www.facebook.com/bkfateam/notes/](https://images.viblo.asia/062cb151-87f6-4d42-a700-ef813327c1c1.png)
# Giới thiệu 
[**#BKFA_Team**](https://www.facebook.com/bkfateam/notes/) : ***Nothing is impossible!***       :100: 
 <br><br>
Chúng ta đều biết rằng, máy tính vật lý chỉ hiểu được mã máy (machine code), các ngôn ngữ bậc cao khác đều phải có một bộ biên dịch hoặc thông dịch mã nguồn về mã máy. Như C có GCC (GNU complier collection), Java thì có Javac (Java compiler), Ruby - JRuby (trình thông dịch được xây dựng trên Java)... Javascript cũng có các trình thông dịch của nó, mà sau này, ta sẽ gọi chúng là Javascript engine :) 
 <br><br>
Cũng xin lưu ý rằng, javascript là ngôn ngữ lập trình kịch bản nên ở đây, để cho tiện mình sẽ gọi các trình dịch ngôn ngữ javascript là trình thông dịch  (bạn cũng nên phân biệt biên dịch - complier và thông dịch - interpret) . 
 <br><br>
Trên thực tế, thì một ngôn ngữ có thể có rất nhiều các trình thông dịch khác nhau. Và cuộc chiến cạnh tranh giữa các trình thông dịch này là không bao giờ ngừng nghỉ. Các ông lớn như Google, Moliza, Microsoft... thì luôn muốn cộng đồng dùng các sản phẩm của mình. Dưới đây và trong bài viết này, mình xin tóm tắt lại một số trình thông dịch nổi tiếng nhất của ngôn ngữ javascript và đi sâu hơn một chút vào V8 engine là một trình thông dịch tuyệt vời được phát triển bởi các kĩ sư Google.
 <br><br>
> **Nhắc lại:** javascript engine là một chương trình mà có khả năng thông dịch mã nguồn javascript ra mã máy mà máy tính vật lý có thể hiểu được. Javascript engine hoàn toàn có thể được thực thi như  một trình thông dịch (interpreter) thông thường hoặc một trình biên dịch just-in-time (JIT compiler). Các trình thông dịch thì thường nằm trong lõi các trình duyệt hoặc các công nghệ viết trên nền javascript như NodeJS, nó có vai trò như trái tim của các chương trình vậy. 

<br>
Dưới đây, mình xin liệt kê một vài các javascript engine  phổ biến nhất trên thế giới hiện nay:
 <br> 

* V8 -  thằng này nói sau cùng nhưng cho lên đầu 
* Rhino  - trình thông dịch javascript được quản lý bởi Mozilla Foundation và được viết bằng mã nguồn java
* SpiderMonkey  - trình thông dịch javascript lâu đời nhất hiện nay, có thể nói spidermokey là trình thông dịch đầu tiên trên thế giới, hiện nay thì nó đang được sử dụng trong nhân của trình duyệt Firefox
* JavaScriptCore  - trình thông dịch javascript dành cho các bạn iFan, được phát triển bơi Apple cho trình duyệt Safari
* Chakra (JScript9)  - được phát triển bởi Microsoft và dành cho trình duyệt Internet Explorer.
* Chakra (JavaScript)  - cùng cha nhưng khác mẹ, được dùng cho trình duyệt Microsoft Edge
* JerryScript  -  một trình thông dịch khá thú vị, được thiết kế tối ưu cho các nền tảng internet of things.

# V8
Trong khi các ông lớn khác lần lượt cho ra các trình duyệt của riêng mình thì ông lớn Google cũng đưa ra đứa con của mình - V8 engine chạy bên trong hầu hết các trình duyệt nhân chromium hiện nay, trình duyệt Cốc Cốc của VN của chạy trên nhân này. So với các đàn anh thì tuổi đời của V8 còn khá trẻ và đang được phát triển trên repository github:
 <br><br>
https://github.com/v8
 <br><br>
V8 được viết bằng C++ và được sử dụng nhiều nhất trong lõi NodeJS.
 <br><br>
 
![](https://images.viblo.asia/9425b413-e4a3-45c3-8683-2086fb0ab3b0.png) 

 <br><br>
V8 được thiết kế để làm sao có tốc độ nhanh nhất, đúng như cái tên là một engine (động cơ). V8 cũng được thực thi bằng JIT compiler như các engine phổ biến khác như Rhino và SpiderMonkey. Điểm khác biệt nhiều nhất của V8 là nó không thông dịch qua bytecode hay bất kì mã trung gian nào khác. 
 <br><br>
Sau đây ta đi đi chi tiết vào một vài đặc điểm của trình biên dịch JIT của V8: 

**V8 engine bao gồm 2 bộ biên dịch:**

* Full codegen -  bộ biên dịch đơn giản và nhanh gọn tuy nhiên mã máy dịch ra ít optimize
* Crankshaft - bộ biên dịch phức tạp và chậm hơn (JIT) , nhưng mã máy dịch ra optimize tốt hơn

**V8 engine sử dụng nhiều luồng để thực thi biên dịch:**

* Luồng chính: đọc code, biên dịch và thực thi mã nguồn
* Một vài luồng nhỏ optimize code
* Một luồng profiler quyết định đoạn mã nguồn này có cần optimize và đẩy vào Crankshaft không
* Một vài luồng nhỏ khác dùng cho bộ dọn rác (Gabage Collector)
 <br><br>
 
Trong lần đầu tiên, khi biên dịch 1 đoạn mã nguồn JS, V8 sẽ đẩy trực tiếp đoạn code này vào full-codegen compiler. Nhớ lại rằng, đây là trình biên dịch nhanh và nhẹ nên sẽ dịch ra mã máy ngay lập tức.
 <br><br>
Tuy nhiên ở lần thứ 2, giả sử bạn refresh lại trang web, và luồng profiler đã nhận được đủ dữ liệu rằng đoạn code nào cần được tối ưu thì V8 sẽ ưu tiên đẩy chúng vào Crankshaft compiler. 
 Crankshaft sẽ dịch đoạn mã này thành một cây high-level static single-assignment (SSA), chính là biểu diễn một đồ thị Hydrogen graph. Phần lớn công việc tối ưu hoàn thành ở giai đoạn này.
  <br><br>
**Inlining:**
  <br><br>
Inlining là quá trình đầu tiên V8 cần thực hiện để tối ưu quá trình biên dịch. Nôm na, ta có thể hiểu inlining là quá trình mà thay thế dòng gọi hàm bằng nội dung của hàm đang gọi. 

![](https://images.viblo.asia/44f1356d-ce64-49bf-aa09-68755331b40b.png)

Inlining process
Quá trình inlining  chính là nhân tố quan trọng mà ta lợi dụng trong việc tối ưu code.
  <br><br>
**Hidden class (lớp ẩn):**
  <br><br>
Javascript là ngôn ngữ lập trình động, điều đó có nghĩa là các thuộc tính của một đối tượng có thể dễ dàng thêm vào hoặc hủy bỏ một cách linh hoạt. 
  <br><br>
Hầu hết các trình thông dịch JS đều sử dụng cấu trúc hash-function (hàm băm) để lưu giá trị các đối tượng trong bộ nhớ. Đều này làm cho quá trình truy xuất giá trị thuộc tính ở JS tốn kém hơn so với các ngôn ngữ khác như Java hoặc C, các thuộc tính của đối tượng chỉ cố định.  
  <br><br>
Như đã nói, việc sử dụng hàm băm không hiệu quả với trong việc lưu trữ các thuộc tính động. V8 engin sử dụng một cách hoàn toàn khác để giải quyết vẫn đề này, đó chính là hidden class. Các hidden class hoạt động giống như cách fixed object layouts hoạt động trong ngôn ngữ Java, chỉ khác nó được khởi tạo trong quá trình runtime. Giả sử ta có đoạn mã:
  <br><br>
```
function Point(x, y) {
    this.x = x;
    this.y = y;
}
var p1 = new Point(1, 2);
```
  <br><br>
Qúa trình thực thi khởi tạo đối tượng và cập nhật giá trị thuộc tính được miêu tả ở hình dưới:

![](https://images.viblo.asia/40d4d5bd-88b4-4be7-a0ab-cc265a2536f2.png)

Khi đối tượng p1 ban đầu được khởi tạo, hidden class C0 sẽ được khởi tạo cùng lúc runtime. Vì lúc này, thuộc tính x chưa được gán nên C0 hẳn là một class rỗng. Mỗi khi một thuộc tính mới được thêm vào một đối tượng, lớp ẩn cũ được cập nhật với một đường dẫn chuyển tiếp (transition path) đến lớp ẩn mới. Chuyển tiếp lớp ẩn rất quan trọng vì chúng cho phép các lớp ẩn được chia sẻ giữa các đối tượng được tạo theo cùng một cách. Nếu hai đối tượng chia sẻ một lớp ẩn và cùng một thuộc tính được thêm vào cả hai, thì quá trình chuyển đổi sẽ đảm bảo rằng cả hai đối tượng nhận cùng một lớp ẩn mới mà không phải thêm một lớp ẩn nào khác, từ đó tiết kiệm được bộ nhớ lưu nhớ. 
  <br><br>
Nhìn vào đoạn code bên dưới:
  <br><br>
  ```
function Point(x, y) {
    this.x = x;
    this.y = y;
}
var p1 = new Point(1, 2);
p1.a = 5;
p1.b = 6;
var p2 = new Point(3, 4);
p2.b = 7;
p2.a = 8;
```

Ta thấy các đối tượng p1 và p2 được thông dịch theo cách tương tự nhau, cùng hidden class và transition path. Nhưng ... điểm khác biệt chính nằm ở thứ tự gán các thuộc tính động a,b điều này dẫn đến thứ tự của khởi tạo hidden khác nhau và do đó thứ tự của transition khác cũng khác. Trong trường hợp này, tốt hơn ta nên khởi tạo cũng một  thứ tự các thuộc tính động giúp tận dụng việc sử dụng chung các hidden class và tối ưu mã nguồn hơn.
  <br><br>
**Inline Caching:**
  <br><br>
Inline caching là quá trình V8 theo dõi và ‘đưa ra’ quyết định phán đoán sự lặp lại của cùng một phương thức lên cùng một loại đối tượng. V8 sử dụng một bộ cache để lưu trữ loại của đối tượng sẽ được pass vào hàm, qua đó giúp tăng tốc việc sử dụng đối tượng này thông qua sử dụng chung các hidden class. Bạn đọc có thể tìm hiểu chi tiết hơn tại [đây](https://github.com/sq/JSIL/wiki/Optimizing-dynamic-JavaScript-with-inline-caches?fbclid=IwAR367FVlu8t1CEqeZn9ACtx9sNoius2nnfy-bz8RH19U95og7p3LGr3OvFU).
  <br><br>
**Bộ dọn rác (garbage collector):**
  <br><br>
V8 **garbage collector** sử dụng cách tiếp cận mark-and-sweep (tạm dịch: đánh dấu và  quét). Pha mark sẽ đánh dấu những đối tượng không còn được sử dụng trong tương lai thông qua quá trình duyệt tìm trên heap. Sau đó pha sweep sẽ giải phóng các vùng nhớ này.  
  <br><br>
**Ingnition và TurboFan:**
  <br><br>
V8 engine bản 5.9 ra đời vào đầu năm 2017, giới thiệu một kĩ thuật xử lý đường ống mới. Kĩ thuật này đạt được những hiệu quả lớn với hiệu suất và tiết kiệm bộ nhớ hơn nhiều so với các phiên bản trước.
  <br><br>
Kĩ thuật xử lý đường ống mới được xây dựng trên Ignition, trình thông  của V8 và TurboFan, trình biên dịch tối ưu hóa mới nhất của V8.
  <br><br>
Vì nội dung chuyên sâu, nên bạn đọc có thể tham khảo thêm tại đây để biết thêm thông tin.
## Kết Luận: 
**Túm cái đuôi lại**, qua quá trình tìm hiểu một số thành phần cơ bản của V8 engine, ta có thể lợi dụng các đặc điểm này để tối ưu sâu quá trình biên dịch mã nguồn javascript.
  <br><br>
  
1. Thứ tự khởi tạo các thuộc tính của đối tượng: nên là giống nhau cho các đối tượng cùng lớp, điều này sẽ giúp việc các hidden class có thể được chia sẻ và tái sử dụng.
2. Thuộc tính động: thêm một thuộc tính mới vào đối tượng đã có là một công việc rất tốn kém vì phải tìm và thay đối các hidden class đã có. Thay vào đó, cố gắng khởi tạo tất cả thuộc tính cần thiết trong hàm khởi tạo (contructor)
3. Phương thức: các phương thức được gọi lại nhiều lần sẽ thực thi nhanh hơn các phương thức mới được gọi lần đầu tiên.
4. Mảng: tránh khởi tạo các mảng mà key của đối tượng trong mảng không liên tiếp (các dải gía trị trong mảng khi đó sẽ được V8 lưu trong một cấu trúc bảng băm, not mảng) , điều đó đồng nghĩa với việc nên hạn chế xóa các phần tử trong mảng, thay vào đó nên đối chỗ hoặc dịch mảng, nằm tạo ra một dải các key liên tiếp có chứa giá trị trong mảng. 
  <br><br>
  
**Tài liệu tham khảo:**
*  [BKFA Team](https://www.facebook.com/notes/bkfa-team/c%C3%A1c-tr%C3%ACnh-th%C3%B4ng-d%E1%BB%8Bch-javascript-v%C3%A0-v8-engine-t%C3%ACm-hi%E1%BB%83u-v%C3%A0-%E1%BB%A9ng-d%E1%BB%A5ng-v%C3%A0o-vi%E1%BB%87c-t%E1%BB%91i-%C6%B0/380847369110316/)