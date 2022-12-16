![](https://images.viblo.asia/7f759921-0745-4e53-9455-f015b6d375b7.png)


Tưởng tượng rằng có một ứng viên đang chuẩn bị CV để đi phỏng vấn, đã chuẩn bị một tâm hồn đẹp và
> Mày râu nhẵn nhụi áo quần bảnh bao

Ngon rồi, vào chém thôi.

![](https://images.viblo.asia/b2215070-14f2-42d4-819f-ea65969c5fc7.png)

Sau khi nhà tuyển dụng hỏi ứng viên một loạt câu hỏi và anh ta trả lời một cách tự tin, ngồi rung đùi cứ đinh ninh nghĩ rằng quả này offer ngon rồi và được hỏi câu tiếp theo:

&nbsp;&nbsp;&nbsp;&nbsp;\- Em có biết quá trình một trang web hiển thị như thế nào không?

Ui xời, tưởng câu gì, cái này ngày nào em chả nhìn, có gì đâu mà gây khó dễ. Ngay tức khắc ứng viên trả lời:

&nbsp;&nbsp;&nbsp;&nbsp;\- Dạ sau khi mình gõ Url của trang Web vào, nó sẽ tìm kiếm địa chỉ IP của trang Web, tải HTML CSS JS về và render ra ạ.

&nbsp;&nbsp;&nbsp;&nbsp;\- Còn gì nữa không em?

&nbsp;&nbsp;&nbsp;&nbsp;\- Dạ...

Có bao nhiêu người trả lời giống bạn ứng viên này. Mình chắc chắn phải 20 đến 30% mọi người cũng trả lời như vậy. Câu trả lời không sai nhưng chưa đầy đủ, nhà tuyển dụng muốn hỏi sâu hơn để kiểm tra kiến thức của bạn. 

Vậy trả lời thế nào để ăn điểm với nhà tuyển dụng ở câu hỏi này? Cùng tìm hiểu cơ chế **Rendering** của Browser nhé!
# Phân tích cú pháp HTML
Bỏ qua các bước liên quan đến phân tích DNS, network, ở đây chúng ta sẽ phân tích sau khi mà đã lấy nội dung **HTML** của 1 trang web về. 

Ngay sau khi nhận được HTML, Browser sẽ phân tích nội dung HTML thành **DOM** (Document Object Model).

Theo lý thuyết thì

> The **Document Object Model** (**DOM**) is the data representation of the objects that comprise the structure and content of a document on the web.

Tạm dịch ra là mô hình của các đối tượng trong HTML. 

**HTML Parsing** tức là chia nhỏ nội dung HTML thành các **Tag** và nội dung của chúng. Từ những Tag này chúng cấu tạo nên **DOM**.

![](https://images.viblo.asia/f98af907-eb05-4979-b7fd-4d9c3b937f2c.png)

# Tải external resources
Khi quá trình phân tích đọc đến CSS hay Javascript files, nó sẽ tải nội dung của chúng về.

Đối với **CSS files**, quá trình phân tích HTML vẫn diễn ra cùng lúc với việc các file CSS được tải. CSS files sẽ ngăn chặn việc Render trang web cho đến khi chúng đã được tải về và được phân tích thành **CSSOM** (sẽ nói ở phần dưới)

Đối với **Javascript files** thì hơi khác một chút. Theo cơ chế mặc định, JS files sẽ ngăn chặn việc phân tích HTML trong khi JS files đang tải về và phân tích. Có 2 kiểu thuộc tính được gắn với thẻ script đó là `defer` và `async`.

## Parser-Blocking Scripts
### Embedded scripts
**Parser-Blocking script** là một Javascript file hoặc đoạn JS code, nó sẽ chặn việc phân tích HTML lại. Khi Browser gặp một phần tử `script`, nếu nó là **embedded script** (nhúng trực tiếp bằng cặp thẻ `<script></script>`), thì Browser sẽ thực hiện đoạn script đó trước, sau đó lại tiếp tục phân tích HTML để cấu thành nên **DOM Tree**. Do đó, toàn bộ **Embedded Scripts** đều là **Parser-Blocking**. 

### External scripts
Nếu phần tử script là một **external file**, Browser sẽ dừng việc phân tích HTML lại, tải file đó về, sau khi tải về sẽ thực hiện, quá trình kết thúc thì Browser mới tiếp tục phân tích HTML thành **DOM**. Nếu Browser tìm thấy một phần tử script khác trong HTML, quá trình này sẽ lặp lại tương tự. 

Thế sao Browser phải dừng lại việc phân tích HTML thành **DOM**, sao không để 2 quá trình chạy cùng lúc với nhau, vậy có phải tiết kiệm thời gian không? File nào mà nặng thì cũng đỡ được kha khá thời gian rồi còn gì. 

![](https://images.viblo.asia/6b96dbca-bf32-49f4-8a9c-061431d3e5ce.jpeg)

Browser cung cấp **DOM API** cho **Javascript Runtime**, điều này cho phép JS truy cập và quản lý các phần tử của DOM. Đó chính là nguyên lý hoạt động của các Dynamic Web Frameworks như React hay Angular. Quay lại câu hỏi trên, thế cả 2 quá trình chạy đồng thời thì "nàm xao"? Thì khi đó có thể sẽ xuất hiện "**Race Conditions**" giữa luồng thực hiện của DOM Parser và luồng thực hiện chính. Ơ thế **Race Conditions** là cái gì?

> A "**race condition**" exists when multithreaded (or otherwise parallel) code that would access **a shared resource** could do so in such a way as to cause unexpected results.

Một **Race Condition** tồn tại khi nhiều luồng cùng truy cập vào **dữ liệu chung** và gây ra kết quả không mong muốn. 

Để mình kể cho bạn một câu chuyện:

> Dạo gần đây đang có phim Bố Già của Trấn Thành rất là hot, bạn muốn rủ cờ rút đi xem phim. 4h bạn đỗ xe kítttt cái trước cửa nhà nàng, nàng hỏi:
> 
> &nbsp;&nbsp;&nbsp;&nbsp; \- Lét gô. Mà anh đặt vé chưa đấy?
> 
> &nbsp;&nbsp;&nbsp;&nbsp; \- Vé á, anh mải nhớ đến em quên cả đặt vé. Giờ mình ra vẫn kịp, em cứ yên tâm.
> 
> Bạn vội vàng gọi điện cho rạp chiếu phim:
> 
> &nbsp;&nbsp;&nbsp;&nbsp; \- Chị ơi suất Bố Già lúc 5h còn vé không ạ?
> 
> &nbsp;&nbsp;&nbsp;&nbsp; \- Còn nhé em ơi.
> 
> Bạn cúp máy và ung dung chở nàng đến rạp. Là một người nghĩ ra câu chuyện, đương nhiên là mình sẽ tạo ra tình huống hết vé. Do phim đang hot, nên lượng người xem rất đông, và khi cặp đôi tới thì đương nhiên là hết vé rồi. Thế là thôi, nàng giận dỗi bỏ luôn về chẳng muốn nói gì nữa.

Anh chàng muốn đặt vé, nhưng cùng lúc đó, cũng có rất nhiều người khác cũng muốn có vé để xem phim. Đó chính là **Race Condition**. Nếu chỉ một mình anh chàng này thôi, thì chắc chắn sẽ mua được vé rồi, nhưng ở đây còn nhiều người khác cũng muốn mua vé nên đã tạo ra kết quả không mong muốn như vậy. 

Tuy nhiên thì chặn quá trình **DOM parsing** trong khi script files đang được tải gần như là không cần thiết trong nhiều trường hợp. Do đó, **HTML5** đã thêm thuộc tính `async` cho thẻ script. Khi quá trình phân tích HTML gặp một **External Script** với thuộc tính `async`, nó sẽ không dừng lại, cùng lúc vẫn phân tích HTML tiếp và tải file trong Background. Nhưng khi file đã được tải xong, thì quá trình parsing sẽ dừng lại và nhường chỗ cho việc thực hiện Script. Vì 1 file sau khi được tải xong là thực hiện nên sẽ trường hợp `async` sẽ gây ra việc thực hiện không theo thứ tự giữa các `async` scripts. 

Ngoài `async` còn một thuộc tính khác cũng cho phép quá trình tải và **DOM parsing** diễn ra đồng thời, đó là `defer`. Tất cả `defer` scripts được thực hiện ngay sau khi quá trình **DOM parsing** hoàn thành. Không giống như `async`, tất cả `defer` scripts được thực hiện theo thứ tự chúng xuất hiện trong HTML.

Túm cái váy lại mấy ý cho **Parser-Blocking**:

- Tất cả **Normal Scripts** (bao gồm **embedded** và **external scripts**) đều là **Parser-Blocking** ngăn chặn quá trình DOM Parsing
- Tất cả `async` scripts đều không chặn quá trình DOM Parsing cho đến khi chúng đã được tải về. Ngay khi 1 file được tải xong, nó sẽ chặn DOM Parsing lại
- Tất cả `defer` scripts đều không chặn quá trình DOM Parsing. Chúng chỉ được thực hiện sau khi DOM Tree đã hoàn thành


![](https://images.viblo.asia/56ac8119-d99b-4c1b-8831-6a6b86e3af33.png)

## Render-Blocking CSS
Vào đời Vua Hùng thứ 18, Vua có một người con gái đã đến tuổi cập kê, công chúa có dung nhan xinh đẹp tuyệt trần, tên của nàng công chúa này là Mỵ Nương. Vua cho ban truyền tìm kiếm nhân kiệt ở khắp nhân gian hòng kén được một người phò mã đủ tài đủ đức. Lúc đó có đến 4 chàng trai, một là Sơn Tinh, có tài chỉ tay tới đâu thì nơi đó mọc lên rừng núi hùng vĩ. Chàng trai thứ hai là Thuỷ Tinh, có tài hô mưa gọi gió, ...

![](https://images.viblo.asia/ee4931a7-b3e6-4106-87f5-a0438a31ac20.jpeg)

Ơ có gì đó sai sai, trong truyện có 2 chàng trai thôi cơ mà??? Thật ra còn có 2 chàng trai nữa. 

Ở một vùng gần đấy, tên là **HTML**, cũng có 2 chàng trai tài năng không kém cạnh gì. Một là chàng **Javascript**, có tài năng chặn DOM Parsing. Chàng xuất hiện ở đâu, DOM Parsing bị chặn ở đó. Hai là chàng **CSS**, có tài chặn quá trình Render lại, nếu còn CSS nghĩa là Render không thể thực hiện. Quá là tài giỏi đúng không nào.

**Browser engines** cấu thành nên **DOM Tree** từ HTML, tương tự như vậy, nó tạo nên **CSSOM Tree** từ **external CSS files** hoặc **embedded CSS** (trong thẻ `<style></style>` hoặc inline style) trong HTML.

Đối với **DOM Tree** thì đó là quá trình tăng cường, có nghĩa là Browser đọc HTML đến đâu sẽ thêm phần tử **DOM** và **DOM Tree** tới đó. Nhưng với **CSSOM** thì lại khác, nó không phải là quá trình tăng cường.

### Embedded  CSS

Khi Browser tìm thấy `<style>`, nó sẽ chuyển đổi toàn bộ **CSS** đó vào **CSSOM Tree**. Sau đó quá trình phân tích HTML lại tiếp tục bình thường. Đối với **Inline Style** cũng tương tự như vậy.

### External CSS
Một **External StyleSheet File** không phải là một **Parser-Blocking**, do đó Browser vẫn có thể tải về dưới Background và thực hiện DOM Parsing cùng lúc. Nhưng không giống **DOM**, Browser không xử lý **Stylesheet** này từng phần một. Lý do là vì quá trình **CSSOM Parsing** không phải là tăng cường, vì có thể có CSS ở cuối file **ghi đè** lên các phần ở trước nó. 

Nếu như Browser thực hiện quá trình xây dựng **CSSOM** tăng cường, sẽ dẫn đến việc Render bị thực hiện nhiều lần vì CSS có thể **ghi đè Style**. Bạn có đồng ý khi mà trang web các thành phần nhảy nhót, màu chữ đổi liên tục, lúc hiện cái này lúc hiện cái khác. CSS styles là `Cascading`, một style có thể ảnh hưởng tới rất nhiều phần tử. 

Do đó, Browser không thực hiện **External CSS** Files tăng cường, **CSSOM** cập nhật chỉ xảy ra khi toàn bộ CSS đã được xử lý. Một khi **CSSOM Tree** được hoàn thiện, **Render Tree** cập nhật và mọi thứ sẽ hiện trên màn hình. 

Túm cái váy lại cho **Render-Blocking**:
- **CSS** là **Render-Blocking**, vì vậy tải chúng sớm nhất có thể

![](https://images.viblo.asia/874f6bd5-27dc-4751-bf8a-312034dfedba.jpeg)


# Kết hợp DOM và CSSOM để cấu tạo nên Tree
Bạn hãy cho biết kết quả của:

```
"DOM" + "CSSOM" = ????
```

Quá dễ dàng đúng không nào. Kết quả hiển nhiên là ```"DOMCSSOM"``` rồi. 

Ở trên chỉ là phép cộng String thôi, còn thực tế mình muốn nói tới **DOM** và **CSSOM Tree** khi kết hợp sẽ tạo nên **Render Tree**, được sử dụng để hiển thị những thứ mà chúng ta thấy trên màn hình. Một số nodes sẽ không có hoặc bị loại bỏ trong Tree này, ví dụ như các thẻ `<head>` hoặc `<link>`, và những thẻ có thuộc tính `display: none`. 

![](https://images.viblo.asia/332ef6c8-6a6b-40f6-8cc7-4f241972da1a.png)


Browser cần phải tính toán **layout** của các thành phần và hiển thị chúng trên màn hình, để làm được điều đó cần phải dựa vào **Render Tree**. Do đó, một khi **Render Tree** chưa hoàn thành, thì không có gì hiển thị trên màn hình cả, đó là lí do tại sao phải cần cả **DOM** và **CSSOM Tree**. 

Không giống như **DOM API** cho phép chúng ta truy cập tới thành phần **DOM**, **CSSOM** là ẩn đối với người dùng. Nhưng khi kết hợp **DOM** và **CSSOM** lại, Browser cho phép truy cập vào **CSSOM** node bằng việc cung cấp API trên thành phần DOM. Do đó, chúng ta có thể truy cập hoặc thay đổi thuộc tính **CSS** của **CSSOM node**. 


# Layout and Paint
Đến đây chúng ta đã biết được **what** cần phải hiển thị, giờ sẽ phải tính đến **where**, là chúng sẽ được hiển thị ở đâu. 

Đầu tiên, Browser sẽ tạo ra **bố cục (layout)** của từng Render Tree node. Bố cục này bao gồm **kích thước (size)** và **vị trí (position)** của từng node được hiển thị trên màn hình. Quá trình này được gọi là **layout** vì Browser sẽ tính toán thông tin bố cục của từng node. 

Quá trình này còn được gọi là **reflow** bởi vì bạn có thể **scroll**, **resize** màn hình hoặc thay đổi thuộc tính của DOM.

Sau khi có được bố cục của từng node rồi, việc cuối cùng là hiển thị chúng lên màn hình.

![](https://images.viblo.asia/7fea13cb-dda3-4a30-9416-70a979ad943d.png)


(Quá trình để hiển thị ra cũng khá phức tạp, nếu bạn cần đọc thêm, có thể vào [**ĐÂY**](https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969#:~:text=When%20a%20web%20page%20is,the%20Render-Tree%20from%20it.) hoặc kéo xuống phần Tham khảo ở cuối bài).

# Events
## Document’s `DOMContentLoaded` Event
Sự kiện `DOMContentLoaded` (**DCL**) xuất hiện khi Browser đã hoàn thiện DOM Tree từ HTML. 

```
document.addEventListener( "DOMContentLoaded", function(e) {
    console.log( "DOM đã hoàn thành roài, bạn có thể truy cập vào thành phần DOM." );
} );
```

Nếu như HTML không chứa bất kì scripts nào, quá trình DOM Parsing sẽ không bị chặn nên sự kiện DCL sẽ xuất hiện nhanh chóng. Ngược lại, nếu có scripts, DCL sẽ phải đợi chúng được tải về và thực hiện. 

## Window’s `load` event
Như ở trên thì chúng ta biết rằng Javascript có thể chặn quá trình DOM Parsing nhưng đối với stylesheet hay files (videos, images, ...) thì không.

Với sự kiện `DOMContentLoaded`, DOM Tree đã hoàn thành và chúng ta có thể truy cập đến thành phần của DOM một cách an toàn, còn với sự kiện `load`, nó xuất hiện khi toàn bộ stylesheet và files đã được tải xuống. 

```
window.addEventListener( "load", function(e) {
  console.log( "Trang web đã được tải về đầy đủ. " );
} )
```

# Kết luận
Sau khi đọc xong những phần trên, chúng ta đã hiểu thêm về DOM, CSSOM và Render Tree. Hiểu được việc hoạt động của chúng là rất quan trọng vì nó có thể cải thiện tốc độ tải trang cũng như trải nghiệm của người dùng. 

Khi một Page được tải về, Browser sẽ đọc nội dung HTML và chuyển chúng thành DOM Tree. Sau đó nó sẽ xử lý CSS dù là inline, embedded hay external CSS và chuyển thành CSSOM Tree. 

Sau khi cả DOM và CSSOM Tree hoàn thành, Browser kết hợp chúng lại tạo nên Render Tree, và sau đó các thành phần sẽ được hiển thị lên màn hình. 

Và đó là tất cả, cũng không phức tạp lắm đúng không! 

> Cứu một người còn hơn xây 7 tòa tháp

Nếu ở đầu câu truyện, anh chàng xin phép ra ngoài 5 phút và gọi điện cho bạn cầu cứu, bạn có sẵn sàng để trợ giúp anh ta?
# Tham khảo
[Medium - How a browser renders a webpage](https://medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969#:~:text=When%20a%20web%20page%20is,the%20Render-Tree%20from%20it.)

[Dev.to - How a browser renders a webpage](https://dev.to/jstarmx/how-the-browser-renders-a-web-page-1ahc)