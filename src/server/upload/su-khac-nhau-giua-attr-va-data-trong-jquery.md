## 1. Mở đầu
Ở bài viết trước, mình đã viết về cách phân biệt .attr() và .prop() trong JQuery. Các bạn quan tâm có thể click [vào đây](https://viblo.asia/p/phan-biet-attr-va-prop-trong-jquery-GrLZD7dVKk0) nhé. :) Bài viết này, mình sẽ tiếp tục phân biệt giữa **.attr() và .data() trong JQuery** nhé.

Chắc hẳn ai đã từng làm việc với 2 function này đều thắc mắc rằng: rõ ràng tác dụng của chúng giống nhau nhưng lại sinh ra 2 function này với 2 cách dùng khác nhau. Mình cũng đã từng có câu hỏi như vậy, và bài viết này là câu trả lời mà mình đã tìm hiểu được.
## 2. Định nghĩa
Trước tiên, cùng xem document của JQuery viết như thế nào nhé.

### .data()
*Store arbitrary data associated with the matched elements or return the value at the named data store for the first element in the set of matched elements.*


Nghĩa là: Lưu trữ dữ liệu tùy ý được liên kết với các phần tử phù hợp hoặc trả về giá trị của dữ liệu được đặt tên cho phần tử đầu tiên trong tập hợp các phần tử phù hợp.

**Cách sử dụng:** 
* HTML: `<div id="item" data-foo="bar"></div>`
* JQuery: 
    * Gán giá trị: `$('#item').data('foo', 'news')`
    * Lấy giá trị: `let data = $('#item').data('foo')`

### **.attr()**
*Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.*
    
Nghĩa là: lấy ra giá trị của thuộc tính cho phần tử đầu tiên trong tập hợp các phần tử phù hợp, hoặc set giá trị cho các thuộc tính của tất cả các phần tử phù hợp.

**Cách sử dụng**

* HTML: `<div id="item" data-foo="bar"></div>`
* JQuery: 
    * Gán giá trị: `$('#item').attr('data-foo', 'news')`
    * Lấy giá trị: `let data = $('#item').attr('data-foo')`

## 3. Sự khác biệt
**3.1. Cách sử dụng**

Như ví dụ mình đưa ra ở trên, cách dùng của 2 hàm này khác nhau. Để dùng .data(), thuộc tính của bạn phải có tiền tố `data-` trước tên thuộc tính.

**3.2. Cách lưu trữ**
* Về cơ bản , phương thức `.attr()` có ảnh hưởng trực tiếp đến DOM. Do đó, nó sẽ lấy dữ liệu từ HTML hiện tại hoặc thay đổi mã HTML nếu được sử dụng để thay đổi giá trị thuộc tính. 
* Ngược lại, phương thức `.data()` sẽ lấy dữ liệu từ bộ đệm trong (internal cache) và sẽ thay đổi dữ liệu đó nếu một tập hợp được gọi, không có thao tác DOM nào được thực hiện ở đây. 

Như vậy, `.data()` lưu trữ dữ liệu trong bộ đệm trong không thể hiển thị bên trong DOM (ví dụ: kiểm tra phần tử bằng trình duyệt). Điều đó có nghĩa là nếu chúng ta có một thuộc tính và chúng ta thay đổi nó bằng cách sử dụng `.attr()`, sau đó lấy giá trị của nó ra bắng `.data()` thì kết quả trả về sẽ giống như giá trị gốc ban đầu.

Ví dụ:
```
//HTML
<div id="item" data-foo="bar"></div>

//JQuery
$('#item').attr('data-foo')   //return: bar
$('#item').data('foo')    //return: bar

$('#item').data('foo', 'new')    //change value with .data()
$('#item').attr('data-foo')   //return: bar
$('#item').data('foo')    //return: new
//HTML: <div id="item" data-foo="bar"></div>

$('#item').attr('data-foo', 'new2')    //change value with .attr()
$('#item').attr('data-foo')   //return: new2
$('#item').data('foo')    //return: new
//HTML: <div id="item" data-foo="new2"></div>
```
Như đã giải thích trước đó, việc gọi `.data()` để set giá trị sẽ không thao tác với tệp DOM và gọi `.attr()` để thay đổi thuộc tính sẽ không thay đổi dữ liệu bên trong bộ đệm trong. 

## 4. Khi nào nên dùng .attr() hay .data()
* **.data()** nên dùng khi một value được truyền cho client từ server khi render ra view. 

Ví dụ: nếu chúng ta có một ứng dụng web, cần truyền giá trị cho client, khi render view ta có thể dùng: `<div data-foo={{ $data }}>`

Một lợi thế tốt của .data () so với .attr () là các biến được lưu trữ trong node object. Vì vậy chúng ta có thể lưu trữ các đối tượng phức tạp, không chỉ các giá trị chuỗi. Vậy .data () là cách tốt hơn để lưu trữ dữ liệu khi chúng ta phải set/get dữ liệu liên quan đến trạng thái hiện tại của ứng dụng. Nhưng vì `.data()` không thực sự thay đổi giá trị thuộc tính nên khi sử dụng cần phải chú ý hơn.
* **.attr ()** sẽ tốt hơn khi chúng ta xử lý các thay đổi trên cây DOM sẽ có ảnh hưởng trực tiếp đến HTML.

Ví dụ thuộc tính `checked` trong ô checkbox.
## Tổng kết
Vậy là mình đã viết xong về việc phân biệt .attr() và .data() trong JQuery một cách  cơ bản nhất. Cảm ơn bạn đã qua tâm đến chủ đề này. 
### Tài liệu tham khảo
https://api.jquery.com/data/

https://coderwall.com/p/t_cgwq/when-is-better-to-use-data-or-attr

https://stackoverflow.com/questions/7261619/jquery-data-vs-attr/29907463