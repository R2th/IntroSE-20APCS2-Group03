Xin chào các bạn! 

Như chúng ta đã biết, hiệu năng là một vấn đề quan trọng trong việc nâng cao chất lượng sản phẩm phầm mềm và nó được quan tâm tới ngay sau khi code của chúng ta đã vận hành hoặc ở các bước review code. Việc tăng hiệu năng đối với các sản phẩm nhỏ hầu như không mang lại lợi ích trông thấy được, nhưng đối với các phần mềm lớn, phức tạp hoặc quy mô dữ liệu nhiều thì việc cải thiện hiệu năng mang lại rất nhiều tác dụng. Trước hết nó làm phần mềm chạy nhanh hơn, thỏa mãn nhu cầu khách hàng và sau đó là mang lại lợi nhuận cho công ty. 

![](https://images.viblo.asia/eab0dfad-53c1-4092-b019-4e41d7ceaf63.jpeg)


Tối ưu hóa hiệu năng có thể được thực hiện ở bất cứ đâu bằng bất cứ cách nào. Bạn có thể tối ưu hóa database, hoặc cải thiện thuật toán trên backend, hay tăng tốc truy vấn dữ liệu sử dụng sql, sử dụng cache ở nhiều mức độ, ... là các cách tối ưu ở backend. Là một frontend developer, cá nhân mình nói riêng và các bạn frontend dev khác nói chung cũng cần lưu ý về hiệu năng ngay trên code của mình. Và trong bài viết hôm nay, mình sẽ giới thiệu một số tip, mẹo nhỏ để tăng tốc hiệu năng code Javascript (JS). Nào, chúng ta bắt đầu nhé!

<h3>1. Tránh sử dụng từ khóa "new"</h3>

Trong JS có 2 loại kiểu dữ liệu: kiểu nguyên thủy (primitives) và kiểu Object. Trong đó, kiểu nguyên thủy bao gồm ```string```, ```number```, ```bigint```, ```boolean```, ```null```, ```undefined``` và ```symbol```. Các dữ liệu kiểu ```Object``` có thể thể hiện mọi đối tượng mà kiểu nguyên thủy thể hiện được như một chuỗi (string), một số (number), ... hoặc các đối tượng mà kiểu nguyên thủy không thể hiện được như một sinh viên, một cái xe, .... 

Câu hỏi đặt ra là, đối với các dữ liệu có thể sử dụng kiểu nguyên thủy, như ```string``` chẳng hạn, thì ta nên khai báo theo kiểu nào?
``` javascript
// which way should we choose?

// 1. Primitive
const str = "demo string";

// 2. Object
const strObj = new String("demo string");
```

Theo khuyến nghị của các chuyên gia, điển hình là theo W3School, tránh khai báo ```Object``` khi mà kiểu nguyên thủy tương ứng có thể sử dụng được. Hãy sử dụng ```string``` thay cho ```new String()```, hãy sử dụng ```number``` thay cho ```new Number()```, ....

Tại sao lại như thế?
Do object có rất nhiều các phương thức hỗ trợ mặc định (như constructor, ...)  nên khi khởi tạo nó chiếm nhiều bộ nhớ hơn và làm chậm hiệu năng. Thêm vào đó, khi thực hiện so sánh tuyệt đối (absolute comparison) ```===``` thì kết quả sẽ không bao giờ là ```true``` vì 2 object có 2 phân vùng địa chỉ khác nhau. Mặt khác, JS engine sẽ tự động convert từ kiểu nguyên thủy sang kiểu object khi cần thiết mà chúng ta không cần phải khai báo sẵn, ví dụ khi sử dụng method ```indexOf```, ...

Ngần ấy lý do là quá đủ để giải thích phải không nào! Tip đầu tiên thật dễ hiểu và dễ áp dụng phải không các bạn!

<h3>2. Tránh sử dụng từ khóa "with" và "eval"</h3>

Từ khóa tiếp theo mà chúng ta nên tránh khi sử dụng đó là ```with``` và ```eval```. 

Sử dụng ```with()``` sẽ chèn thêm biến toàn cục, vì thế nếu có một biến cùng tên có thể gây nhầm lẫn và bị ghi đè.

Bên cạnh đó, ta cần tránh sử dụng ```eval``` vì việc dùng hàm tạo hay hàm ```eval()``` sẽ tiêu tốn nhiều tài nguyên bởi mỗi lần gọi nó là mỗi lần các công cụ biên dịch phải chuyển đổi mã nguồn thành mã thực thi.
```javascript
var func1 = new Function(functionCode);
var func2 = eval(functionCode);
```
<h3>3. Hạn chế sử dụng try - catch - finally</h3>

```try-catch-finally``` là một khối code được sử dụng để bắt các ngoại lệ xảy ra trong JS, nó rất hữu dụng trong một số trường hợp, nhưng lại không được khuyến khích sử dụng nhiều. Tại sao lại như vậy?

Bất cứ khi nào mệnh đề ```catch``` được thực thi, ```exception``` tương ứng sẽ được gán vào một biến, và như thế, khối lệnh ```try-catch-finally``` sẽ tạo ra ít nhất một biến mới trong quá trình thực thi chương trình. Có một số trình duyệt hiện nay không giải quyết được việc đó một cách hiệu quả vì các biến được tạo ra và phá hủy ngay tại thời điểm thực thi. Vậy nên, ta nên tránh sử dụng nó quá nhiều!

```javascript
try {
    // your code will go here
} catch(err) { // ---> variable is created when runtime
    // catching when exception's fired
} finally {
    // final code go here
```
<h3>4. Tránh sử dụng biến toàn cục</h3>

Giả sử như ta đang ở trong một hàm, hàm đó có một biến được khai báo giống tên với tên của một biến toàn cục mà ta đã khai báo trước đó thì với phạm vi nội trong thân hàm đang xét, biến cục bộ sẽ được sử dụng.

```javascript
const demoVar = "demo global var";

// code code ...
function demoFunc(){
    const demoVar = "demo local var";
    
    console.log(demoVar); // ---> this wil be local variable
}
```

Và sau khi thực hiện hàm, biến cục bộ sẽ được loại bỏ bởi JS engine.

![](https://images.viblo.asia/06f794b9-5321-4ac8-9b9a-f405f2c350ee.jpeg)

Cơ chế hoạt động của JS engine trong trường hợp này đó là, nó sẽ tham chiếu tới tất cả các biến toàn cục đã được khai báo từ trước khi ngữ cảnh đang xét đến là một hàm chẳng hạn. Nếu loại bỏ các biến toàn cục không cần thiết thì hiệu năng sẽ được tăng lên phần nào!

<h3>5. Hạn chế truy cập vào các phần tử HTML</h3>

Những câu lệnh truy cập vào phần tử HTML có tốc độ thực thi rất chậm. Nếu muốn truy cập vào cùng một phần tử nhiều lần thì ta nên truy cập một lần rồi sau đó lưu nó vào một biến để sử dụng lại, tránh truy cập nhiều lần.

```javascript
// Avoid
<script>
    document.getElementById("demo").innerHTML = "1";
    document.getElementById("demo").innerHTML = "2";
    document.getElementById("demo").innerHTML = "3";
    document.getElementById("demo").innerHTML = "4";
</script>

// Recommend
<script>
    var a = document.getElementById("demo");
    a.innerHTML = "1";
    a.innerHTML = "2";
    a.innerHTML = "3";
    a.innerHTML = "4";
</script>
```
<h3>6. Các cách khác</h3>

Ngoài các các tăng tốc hiệu năng chương trình được cải thiện trong từng dòng code ở các cách trên, chúng ta cũng có thể sử dụng một số cách khác để tối ưu hóa phần mềm, làm cho chúng trở nên nhanh hơn.

Nén các file JS cũng là một cách phổ biến được sử dụng. Thông thường, chúng ta có file code JS được code và format đẹp đẽ gọn gàng, nhưng chính những khoảng cách hoặc xuống dòng thừa ấy cũng là nguyên nhân làm trang web của chúng ta chậm đi. Xóa dữ liệu dư thừa và không cần thiết khỏi code của bạn mà không ảnh hưởng đến cách browser xử lý tài nguyên đó chính là minification. Việc tạo file ```*.min.js``` sẽ giúp tăng tốc độ load trang ở trình duyệt.

Một cách khác nữa được đề cập tới đó chính là hãy đặt các file JS của bạn ở phía cuối file HTML.

Bên cạnh đó, các bạn nên học cách sử dụng cache, hoặc các thuật ngữ như ```Big O``` để có thể tăng tốc hiệu năng của web lên một tầm cao mới nhé!

<h2>Kết luận</h2>

Sau khi đi qua một vài thủ thuật nho nhỏ để tăng tốc hiệu năng trong JS, mình hy vọng những mẹo này sẽ giúp ích thực sự cho các bạn trong các dự án thực tế chứ nó không phải là lý thuyết suông trên giấy nữa. Giống như được khoác lên mình một bố giáp đầy sức mạnh, web của các bạn sẽ xịn xò hơn bao giờ hết!

![](https://images.viblo.asia/263ff21c-1f75-436a-ba61-12bc3ee67860.gif)

Ngoài ra, có rất nhiều các cách khác để tối ưu hóa tốc độ trong JS mà do dung lượng bài viết cũng như thời gian tìm hiểu nên mình chưa đề cập tại post này. Mình rất mong các bạn để lại comment để mình có thể học hỏi thêm.

Xin cảm ơn các bạn!