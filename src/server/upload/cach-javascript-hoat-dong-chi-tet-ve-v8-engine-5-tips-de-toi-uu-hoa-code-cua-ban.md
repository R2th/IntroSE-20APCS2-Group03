Nguồn: https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e

Notes: *Bài này là bài dịch từ blog khác, mình sẽ loại bỏ phần quảng cáo không liên quan để các bạn tập trung vào kiến thức được chia sẻ cụ thể trong bài này. Nếu muốn đọc sâu hơn và kỹ hơn thì các bạn nên đọc bài gốc. Cảm ơn ^^!*

[Bài viết đầu tiên trong series này](https://viblo.asia/p/cach-javascript-hoat-dong-khai-niem-ve-engine-runtime-va-call-stack-trong-javascript-3P0lPaa45ox) tập trung vào việc giới thiệu một cách khái quát về engine, runtime và call stack. Với bài này chúng ta sẽ đào sâu hơn vào từng phần bên trong của  **Google’s V8 JavaScript** engine. Chúng tôi cũng xin chia sẻ thêm một vài tips giúp các bạn có thể viết code tốt hơn, tối ưu hơn (best practices).

# Khái quát
**JavaScript engine** là mà một phần mềm hoặc có thể gọi nó là một trình biên dịch xử lý code JavaScript. Một  A JavaScript engine có thể được xây dựng giống như một trình biên dịch chuẩn hoặc trình biên dịch [Just-in-time(JIT)](https://viblo.asia/p/trinh-bien-dich-javascript-jit-just-in-time-jvElaXRdZkw) có thể biên dịch code JavaScript thành [bytecode](https://vi.wikipedia.org/wiki/Bytecode) (mã nhị phân) theo một hình thức nào đó. 

Dưới đây là một danh sách các projects khá phổ biến đang xây dựng một javaScript engine. 

* [**V8**](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)): open source, được phát triển bởi Google, viết bằng C++
* [**Rhino**](https://en.wikipedia.org/wiki/Rhino_(JavaScript_engine)): Được quản lý bởi Mozilla Foundation, cũng là một open source, viết bằng Java.
* [**SpiderMonkey**](https://en.wikipedia.org/wiki/SpiderMonkey): Đây chính là trình biên dịch JavaScript đầu tiên. Trước đây nó được phát triển bởi Netscape Navigator và bây giờ là Firefox.
* [**JavaScriptCore**](https://en.wikipedia.org/wiki/WebKit#JavaScriptCore): Là một open source được giới thiệu với cái tên Nitro và được Apple phát triển cho trình duyệt safari của họ.
* [**KJS**](https://en.wikipedia.org/wiki/KJS_(software)): Nó trước đây là engine của KDE được phát triển bởi Harri Porten cho dự án web browser Konqueror.
* [**Chakra**](https://en.wikipedia.org/wiki/Chakra_(JScript_engine))(JScript9): Internet Explorer
*  [**Chakra**](https://en.wikipedia.org/wiki/Chakra_(JScript_engine))(JavaScript): Microsoft Edge
*  [**Nashorn**](https://en.wikipedia.org/wiki/Nashorn_(JavaScript_engine)): Đây là một open source, một phần của OpenJDK được viết bởi Oracle Java Languages và Tool Group.
* [**JerryScript**](https://en.wikipedia.org/wiki/JerryScript): Là một trình biên dịch nhẹ cho Internet of Things.

# Tại sao lại tạo ra V8 Engine
V8 Engine là một chương trình mã nguồn mở được phát triển bởi google, viết bằng C++. Engine được sử dụng bởi Goolge Chrome. Không giống hầu hết các engine khác. V8 còn được sử dụng trong Nodejs 

![](https://images.viblo.asia/e7e55094-7d71-4807-971a-0b80a1a600ff.png)

V8 là mô hình đầu tiên được tạo ra nhằm mục đích tăng tốc độ thực thi của javaScript trên web browsers. Để đạt được tốc độ tối ưu, V8 engine biên dịch mã code javaSript thành một mã code hiệu quả hơn thay vì sử dụng một thông dịch viên (interpreter). Nó sẽ biên dịch javaScript thành ngôn ngữ máy khi thực thi bằng việc xây dựng một **JIT (Just-In-Time) compiler** cũng tương tự như nhiều engine khá nổi tiếng khác đã làm như SpiderMonkey hay Rhino (Mozilla). Sự khác biệt chính ở đây là V8 không xuất ra bytecode hay bất kỳ một mã code trung gian nào. 

# V8 từng có tới 2 trình biên dịch.

**Trước version 5.9 V8 được ra mắt là một engine với 2 trình biên dịch:**
* full-codegen --- một trình biên dịch đơn giản, tạo ra những đoạn mã máy rất nhanh, đơn giản nhưng những đoạn mã máy này máy tính sẽ đọc tương đối chậm.
* Crankshaft --- một trình biên dịch tối ưu hóa phức tạp hơn (Just-In-Time) tạo ra mã code được tối ưu hóa cao.


**Bên trong V8 cũng sử dụng một số các threads (luồng):**
* Thread chính sẽ thực hiện những thứ mà bạn yêu cầu: fetch code, biên dịch code và thực thi code
* Nó còn có một thread tách biệt khác thực hiện việc biên dịch. Khi đó thread chính vẫn có thể tiếp tục thực thi ngay trong khi các thread trước đó đang được tối ưu hoá.
* Có một thread khác gọi là Profiler thread sẽ thông báo cho runtime biết là method nào chúng ta phải dành nhiều thời gian chạy cho nó, khi đó Crankshaft sẽ tối ưu hoá method đó. 
* Một vài thread khác sẽ xử lý việc dọn dẹp Garbage Collector.

Khi bắt đầu thực thi JavaScript code. Trình biên dịch nhanh nhất như một đòn bẩy **full-codegen** sẽ ngay lập tức biên dịch trực tiếp cú pháp javaScript thành ngôn ngữ máy mà không qua bất kỳ một bước trung gian nào. Điều này khiến cho việc khởi động thực thi ngôn ngữ máy diễn ra nhanh hơn. Chú ý là lúc  này V8 sẽ không dùng mã bytecode (mà nhị phân) làm trung gian nữa nên nó không cần trình biên dịch trung gian nữa. 

Khi đoạn code bạn được thực thi một khoảng thời gian. Lúc đó Profiler thread sẽ tập hợp được một lượng data cần thiết để có thể thông báo cho hệ thống biết phần nào cần được tối ưu.

Lúc đó công việc tối ưu hoá của Crankshaft sẽ lập tức bắt đầu ở một thread khác. Nó biên dịch mã javaScript thành một dạng mã phân bổ đơn tĩnh ở bậc cao (high-level static single-assignment (SSA)) được gọi là **Hydrogen** và nó tiếp tục cố gắng tối ưu hoá Hydrogen graph. Hầu như toàn bộ tiến trình tối ưu hoá mã máy sẽ được thực hiện ở thread này.

# [Inlining (Nội tuyến)](https://vi.wikipedia.org/wiki/H%C3%A0m_n%E1%BB%99i_tuy%E1%BA%BFn)

*(Mọi người nên đọc sơ qua nội tuyết hay hàm nội tuyến là gì đã nhé mình có chèn link wiki ở trên, cái này là một kỹ thuật trong C++)*

Việc đầu tiên trong quá trình tối ưu code là thực hiện nội tuyến càng nhiều càng tốt. Nội tuyến là một quá trình thay thế một phần code (đoạn mã ngay cái nơi mà hàm được gọi) bằng phần thân của hàm được gọi. *(hơi rối rắm nên các bạn đọc kỹ hơn về nó sẽ dễ hiểu hơn nhé)* Bước đơn giản này cho phép các phần tối ưu sau đó sẽ có ý nghĩa hơn. 

![](https://images.viblo.asia/fe0e25de-e97b-4143-bd22-2a414c58cdfa.png)

# Class ẩn
JavaScript là ngôn ngữ dựa trên prototype (prototype-based) (dịch nôm na là dựa trên nguyên mẫu): Nó không có **class** và các object được tạo ra bằng một quá trình sao chép. JavaScript cũng là một ngôn ngữ rất linh động. Sau khi một object được tạo ra, các properties của nó sẽ có thể add vào hoặc remove ra một cách dễ dàng.

Hầu hết các trình biên dịch JavaScript sử dụng các cấu trúc giống như từ điển (dựa trên hàm băm) để lưu trữ vị trí của các giá trị thuộc tính của một đối tượng trong bộ nhớ. Cấu trúc này làm cho việc truy xuất giá trị của một property trong JavaScript tốn kém hơn về mặt tính toán so với ngôn ngữ lập trình non-dynamic như Java hoặc C #. Trong Java, tất cả các properties của object đều được xác định bởi một bố cục cố định của object đó trước khi biên dịch và không thể tự động thêm hoặc xóa lúc runtime (Uhm! , dynamic type trong C# lại là một chủ đề khác). Kết quả là, các giá trị của các properties đó (hoặc con trỏ tới nó) có thể được lưu trữ dưới dạng bộ đệm liên tục trong bộ nhớ với bộ đệm cố định giữa mỗi property. Độ dài của bộ đệm cố định đó có thể dễ dàng được xác định dựa trên prototype của thuộc tính, nhưng đối javaScript, prototype của properties thay đổi liên tục khi runtime thì việc đo như thế này là không thể.

Do việc sử dụng dictionary để tìm vị trí của các thuộc tính của đối tượng trong bộ nhớ rất kém hiệu quả nên V8 sử dụng một phương thức khác thay thế: **Hidden Class**. Hidden Class hoạt động cũng giống các đối tượng có bố cục cố định (classes) như trong Java trừ việc nó được tạo ra ngay lúc runtime. Và bây giờ hãy nhìn xem nó thực tế sẽ như thế nào: 

```
function Point(x, y) {
    this.x = x;
    this.y = y;
}
var p1 = new Point(1, 2);
```

Khi "new Point(1, 2)" được tạo mới. V8 sẽ tạo ra một hidden class gọi là "C0"



Lúc đó Object Point vẫn chưa có properties nào nên lúc đó "C0" sẽ rỗng.

![](https://images.viblo.asia/3c8c2660-482a-428e-9291-44e04a4a05ac.png)


Khi dòng lệnh đầu tiên “this.x = x” đực thực thi (ở trong funciton Point). V8 sẽ tiếp tục tạo một hidden class thứ 2 gọi là "C1" kế thừa "C0". C1 lúc này sẽ chỉ ra vị trí trong vùng nhớ của biến x (liên quan đến con trỏ). Khi đó biến x sẽ được lưu ở [offset](https://en.wikipedia.org/wiki/Offset_%28computer_science%29) 0. Nghĩa là khi chúng ta nhìn vào một điểm của object trong vùng nhớ dưới dạng bộ đệm liên tục. Thì cái vùng đệm đầu tiên (offset đầu tiên) sẽ tương ứng với biến "x". Lúc đó V8 sẽ thêm vào "C0" một "Class transition (Class hoán đổi)", nó sẽ check trạng thái nếu như biến "x" đã được add vào Object Point rồi thì hidden class khi đó sẽ đổi từ "C0" sang "C1". Lúc này object Point sẽ có hidden class là "C1";

![](https://images.viblo.asia/34e10045-45d6-406b-a0e3-f32ecda85743.png)

> Mỗi khi một property được add vào object, hidden class cũ sẽ được update với một transition path link tới hidden class mới. Việc chuyển đổi hidden class rất quan trọng bởi vì nó sẽ cho phép các object có thể chia sẽ các hidden class với nhau khi mà các object được tạo mới từ một cách giống nhau. Khi 2 object chia sẽ hidden class với nhau và cùng lúc đó có 1 property được add đồng thời vào cả hai object, thì trainsitions lúc đó sẽ đảm bảo rằng cả hai object sẽ cùng nhận được một hidden class mới giống nhau có cùng các chức năng tối ưu hoá như nhau.

Tiến trình cứ thế lặp lại với dòng lệnh tiếp theo “this.y = y” (ở trong object Point, đằng sau dòng lệnh "this.x = x").

Một hidden class mới là "C2" được tạo ra. Tiếp đó là một class transition (class chuyển đổi) sẽ được add vào "C1" bắt đầu với việc kiểm tra xem nếu biến y đã được add vào object Point thì hidden class lúc này sẽ đổi thành "C2".

![](https://images.viblo.asia/fd60b529-43cc-4871-9051-4e27e8928029.png)


Việc chuyển đổi các hidden class sẽ phụ thuộc vào vị trí các properties được thêm vào. Xem ví dụ dưới đây:


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

Rồi bây giờ chúng ta có thể thấy p1 và p2 có hidden class và transtion class giống nhau với vì cũng được khởi tạo bởi function Point(x, y). Nhưng mà thực tế không như vậy. Với "p1", property đầu tiên của nó là "a" và sau đó thêm tiếp "b" vào. Nhưng đối với "p2" thì "b" được thêm vào trước rồi sau đó mới là "a". Chính vì vậy "p1" và "p2" thức tế có 2 hidden class và 2 transition path khác nhau. **Vậy trong trường hợp này chúng ta nên khởi tạo và thêm các thuộc tính theo thứ tự giống nhau để các hidden class có thể được reused chứ ko cần tạo mới.(tip1)**

# Inline caching (Bộ nhớ đệm nội tuyến)
V8 còn tận dụng một kỹ thuật khác, một kiểu ngôn ngữ tối ưu hoá tự động được gọi là **inline caching**. Inline caching sẽ quan sát các tác vụ lặp đi lặp lại trên một đối tượng có cùng phương thức. (giải thích cụ thể hơn ở [đây](https://github.com/sq/JSIL/wiki/Optimizing-dynamic-JavaScript-with-inline-caches)).

Chúng tôi sẽ tiếp cận gần hơn với khái niệm chung về **inline caching** (trong trường hợp bạn không có thời gian để đọc phần giải thích sâu ở trên).

Vậy thì nó hoạt động như thế nào? Nghĩa là nó duy trì một cái cache (bộ nhớ đệm) lưu type của một object được truyền vào dưới dạng một parameter trong phương thức vừa mới được gọi. Sau đó nó sẽ dùng thông tin này để tiên đoán một kiểu dữ liệu của object được truyền vào trong theo kiểu parameter trong lần gọi tới. Nếu tiên đoán này có chất lượng tốt thì nó có thể bỏ qua bước tham chiếu tới từng đối tượng. Nó chỉ cần dùng information tiên đoán được để tham chiếu tới cái hidden class bên trong object.

Vậy hidden class và inline caching tham chiếu với nhau như thế nào? Cứ mỗi khi một phương thức được gọi bên trong một object nào đó. V8 engine sẽ truy vấn vào trong hidden class của object đó để xác định được cái offset. Sau 2 lần phương thức đó được gọi thành công trong cùng object với cùng một hidden class. Lúc này V8 sẽ bỏ qua không truy vấn tới lớp ẩn nữa mà chỉ cần đưa cái offset đã xác định trước đó vào trong chính con trỏ trỏ tới object là được. Với những lần gọi tiếp theo của phương thức này. V8 sẽ mặc định cái hidden class của phương thức này không thay đổi, và sẽ nhảy trực tiếp vào địa chỉ vùng nhớ của từng thuộc tính trong phương thức bằng cách sử dụng offset đã lưu trữ trước đó mà không cần duyệt lại lần lượt các lần gọi cho từng property nữa. Điều này cải thiện đáng kể tốc độ chạy của chương trình. 

Inline caching chính là lý do cực kỳ quan trọng cho việc các object có cùng kiểu sẽ shared với nhau các hidden class.  Nếu bạn tạo ra các object cùng kiểu như lại không cùng hidden class (như ví dụ trên). V8 sẽ không thể dùng cơ chế hidden class được bởi khi hidden class khác nhau thì offset cũng đã khác nhau. Không thể dùng lại offset cũ để dự đoán cho cái mới được.

![](https://images.viblo.asia/0fb11bfa-21a1-44ed-9298-86d10017df9b.png)
<div align="center">

  Hai object trên cơ bản là có kiểu giống nhau, cũng có thuộc tính "a" và "b". Nhưng vị trí khác nhau nên chúng có 2 hidden class khác nhau và đương nhiên sẽ có 2 offsets khác nhau. 

</div>

# Biên dịch thành mã máy
Một khi Hydrogen graph đã được tối ưu hoá, Crankshaft sẽ chuyển đổi nó về một mã cấp thấp hơn gọi là Lithium. Hầu hết các Lithium đề được xây dựng với những kiến trúc cụ thể. Việc đăng ký và phân bổ vùng nhớ được thực hiện ở bước này.

Và cuối cùng thì Lithium sẽ được biên dịch thành mã máy. Tiếp sau đó sẽ thêm một thao tác nữa gọi là OSR: on-stack replacement (dịch nôm na là việc sắp xếp các ngăn xếp). Trước khi tiến hành việc biên dịch và tối ưu hoá một đoạn code dài, code thực ra vẫn được chạy. Lúc này V8 sẽ hiểu đây là đoạn khởi động, khá chậm chạp nhưng là để có thời gian để chuẩn bị cho việc tối ưu cấp cao sau đó. Ngay giữa quá trình thực thi, V8 sẽ chuyển đổi toàn bộ context mà chúng ta có hiện tại ( các ngăn xếp, hay thanh ghi) sang phiên bản đã được tối ưu hoá hơn. Đây là một quy trình khá phức tạp. Chúng ta cứ tạm hiểu rằng giai đoạn này là sự chuyển đổi qua lại của các thuật toán tối ưu. Có thể nói V8 lúc này đã thực hiện inlining (nội tuyến) ngay từ ban đầu. Thức ra V8 không phải engine duy nhất thực hiện quy trình phức tạp này. 

Có các biện pháp bảo vệ được gọi là deoptimization để thực hiện chuyển đổi ngược lại và trở lại mã không được tối ưu hóa trong trường hợp nếu engine được thực hiện không còn đúng nữa.

# Garbage collection (thu gom rác)
Đối với Garbage collection. V8 cũng áp dụng các thuật toán cũ để đánh giấu và quét dọn những version code cũ không dùng nữa. Việc đánh giấu được cho là phương thức dừng việc thực thi code javaScript. Để kiểm soát chi phí cho việc clean GC, và giữ cho chúng hoạt động ổn định. V8 sẽ thực hiện phương pháp đánh giấu gia tăng. Nghĩa là nó sẽ không duyệt qua toàn bộ heap, cố gắng đánh giấu mọi đối tượng có thể. Nó sẽ chỉ duyệt một phần rồi lại tiếp tục thực thi code bình thường. GC tiếp theo sẽ tiếp tục chạy ngay chổ cái GC trước đó đã dừng và tiếp tục duyệt thêm một phần nữa. Nó cho phép một khoản thời gian tạm dừng rất nhỏ trong suốt quá trình chạy chương trình. Như chúng tôi đã để cập trước đó thì phần dọn dẹp này được chạy ở một thread riêng biệt với các thread chạy code hay tối ưu hoá code.

# Ignition and TurboFan 
Bản release mới hơn của V8 version 5.9 vào năm 2017. Một tiến trình thực thi tự động mới đã được giới thiệu. Tiến trình này giúp đạt hiệu xuất lớn hơn và tiết kiệm bộ nhớ đáng kể cho các ứng dụng javaScript trong thực tế.

Tiến trình này được xây dựng dựa trên [Ignition](https://github.com/v8/v8/wiki), trình biên dịch V8 và [TurboFan](https://github.com/v8/v8/wiki/TurboFan) -- là trình biên dịch tối ưu hóa mới nhất của V8.

Bạn có thể tìm hiểu thêm về V8 team ở blog [này](https://v8.dev/blog/launching-ignition-and-turbofan).

Kể từ khi phiên bản 5.9 của V8 ra đời, full-codegen và Crankshaft (công nghệ dùng cho V8 từ năm 2010) đã không còn được sử dụng nữa vì nhóm V8 đã phải vật lộn để theo kịp các tính năng của JavaScript mới và tối ưu hóa cần thiết cho các tính năng này.

Điều này có nghĩa là V8 tổng thể sẽ có kiến trúc đơn giản hơn và dễ bảo trì hơn trong tương lai.

![](https://images.viblo.asia/da735a7b-4c0a-4068-ba32-d1072ea5bbd6.png)

Những cải tiến này cũng chỉ mới bắt đầu nhưng nó là một sự mở đường cho việc tối ưu hoá tốt hơn, tăng hiệu suất của javaScript và thu hẹp bớt sự ảnh hưởng của V8 ở chrome và nodejs trong tương lai.

Cuối cùng, đây là một số mẹo và thủ thuật để code JavaScript  tốt hơn. Bạn có thể dễ dàng đối chiếu qua lại với nội dùng ở trên, tuy nhiên, đây là một bản tóm tắt để thuận tiện cho bạn:

# How to write optimized JavaScript

1. **Order of object properties**: Cố gắng khai báo các object của bạn với một thứ tự giống nhau để có tái sử dụng các hidden class cùng với các phương thức ẩn đã được tối ưu trước đó. 
        
2. **Dynamic properties**: Viết thêm vào một property sau khi object được khởi tạo sẽ khiến engine bắc buộc phải thay đổi hidden class và sẽ làm chậm các phương thức đã được tối ưu cho các method trước đó. Thay vì vậy hay hãy assign toàn bộ property của object đó vào bên trong constructor của chính nó.

3. **Methods**: Những đoạn code có method giống nhau được thực thi lặp đi lặp lại sẽ chạy nhanh hơn rất nhiều so với thức hiện nhiều methods khác nhau cùng lúc. (tham khảo inline caching)

4. **Arrays**: Tránh các mảng thưa thớt (sparse arrays) trong đó các keys của nó không phải là một chuỗi số tăng dần. Mảng thưa thớt là mảng mà một số phần tử của nó không phải là một bản băm. Các mảng như vậy rất tốn bộ nhớ để truy cập vào. Cố gắng đừng phân bổ vùng nhớ trước cho các mảng lớn và cuối cùng là đừng xoá các phần từ trong mảng, nó khiến cho mảng của bạn trở nên thưa thớt. 

5. **Tagged values**: V8 biểu diễn các objects và numbers với 32 bit. Nó sử dụng một bit để nhận biết nếu đó là object (flag = 1) hay một số nguyên (flag = 0) được gọi là SMI (SMall Integer) vì 31 bit của nó. Sau đó, nếu một giá trị của một number lớn hơn 31 bit, V8 sẽ đóng hộp cái number đó, biến nó thành một number kép và tạo một đối tượng mới để chứa number đó. Cố gắng sử dụng các số có 31 bit bất cứ khi nào có thể để tránh việc đụng độ giữa các đối tượng bên trong object JS.

Xem tiếp P3 Cách JavaScript hoạt động: quản lý vùng nhớ + 4 cách giải quyết vấn đề thất thoát vùng nhớ tại [đây](https://viblo.asia/p/cach-javascript-hoat-dong-quan-ly-vung-nho-4-cach-giai-quyet-van-de-that-thoat-vung-nho-3Q75w9Q7ZWb)