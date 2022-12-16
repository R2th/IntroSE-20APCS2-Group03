### Biểu thức chính quy (Regular expressions) là gì ?

Để bắt đầu tìm hiểu về biểu thức chính quy, đầu tiên chúng ta hãy xem biểu thức chính quy là gì ?

Theo [Wikipedia](https://en.wikipedia.org/wiki/Regular_expression) :

```
Một biểu thức chính quy , regex hoặc regexp là một chuỗi các ký tự xác định một mô hình tìm kiếm
```

Regex không khác gì hơn một tổ hợp các kí tự chủ yếu sử dụng để tìm các mẫu trong văn bản hay xác thực thông tin nhập của người dùng.

### Công cụ

Để các bạn dễ hiểu hơn, mình sẽ đưa ra một ví dụ. Chẳng hạn mình có một trường đầu vào và mong muốn người dùng nhập theo định dạng sau: ``YYYY/MM/DD`` : đầu tiên là 4 số theo sau là dấu ``/`` , tiếp theo 2 số, dấu ``/`` và 2 số cuối cùng.

Bây giờ khi viết các mẫu regex. Có một số công cụ tuyệt vời có thể giúp bạn thực hiện được. Ở đây, mình đề cập 2 công cụ:

* [RegExr](https://regexr.com/)
* [Regexper](https://regexper.com/)

RegExr giúp bạn hiển thị một bảng cheat sheet và cho phép bạn test ngay tức thì trên thời gian thực. Đây là cách mình đã học ``regex``. Regexer là một công cụ tuyệt vời giúp bạn hình dung mẫu regex của bạn băng một sơ đồ. Quay lại ví dụ trên, kêt quả đơn giản là:

```
/\d{4}\/\d{2}\/\d{2}/g
```
![](https://images.viblo.asia/2aabc1be-8d73-4bdd-9a4b-c0852804b6fe.png)
Trước khi bắt đầu tìm hiểu, mình khuyên các bạn nên copy-paste các ví dụ về regex và hình dung về nó trước (hãy thử với text đơn giản trước nhé)

Bây giờ chúng ta hãy chia nhỏ nó, bắt đầu từ cơ bản trước. Mỗi mẫu regex sẽ hiển thị 2 dấu ``/`` và nằm giữa các con số. Chúng ta cũng có thể có ``flag`` sau dấu ``/``. Có 2 ``flag`` phổ biển bạn hay gặp là ``g`` và ``i`` hoặc kêt hợp cả 2 ``gi``. Chúng có nghĩa là **``g``** lobal (toàn cục) và case **``i``** nsensitive respectively (không phân biệt chữ hoa, chữ thường).

Giả sử bạn có một đoạn văn bản trong đó các chữ số xuất hiện nhiều lần. Để chọn nhiều lần xuất hiện, bạn sẽ phải đặt flag ``g``. Nếu không lúc tìm kiếm theo mẫu regex chúng chỉ tìm đến lần xuất hiện đầu tiên.

Giả sử bạn muốn match cả 2 text ``javascript`` và ``JavaScript``, bạn phải dùng flag ``i``. Trong trương hợp muốn match tất cả text đấy trong một đoạn văn bản thì phải dùng kết hợp ``gi``: ``/javascript/gi`` .

### Lớp kí tự (Character Class)

Regex trong ví dụ đầu tiên là ``\d``.  Đây được gọi là lớp kí tự - cho phép bạn yêu cầu regex match với 1 hoặc một tổ hợp các kí tự. ``\d`` để chọn mọi chữ sô. Có thể chọn một bộ kí tự bằng cách sử dụng dấu ngoặc, bạn có thể dung ``[0-9]``.

Điều này cũng có thể làm tương tự với chữ cái ``[a-z]`` (lưu ý regex này chỉ chọn chữ cái a -> z là chữ in thường), để bao gồm cả chữ in hoa ``[a-zA-Z]``. Hoặc có thể kết hợp giữa chữ cái và chữ số ``[a-z0-9]``.

### Định lượng và thay thế

Tiếp tục, chúng ta có ``{4}`` sau ``\d``.  Đây được gọi là bộ đinh lượng, nó yêu cầu regex tìm kiếm chính xác 4 chữ số. Do đó, / \ d {4} / g sẽ khớp với năm 2019, nhưng không khớp với 20 19, 20, 201 hoặc bất kỳ thứ gì khác không dài bốn chữ số.

Bạn cũng có thể xác định một phạm vi có hai số, bắt đầu từ số nhỏ nhất: ``\d{2,4}``. Thao tác này sẽ nhận được các số có độ dài ít nhất là 2 chữ số nhưng không dài hơn 4. Bạn cũng có thể bỏ qua giá trị lớn nhất``\d{2,}`` và nó sẽ nhận được mọi số dài hơn 2 chữ số.

Ngoài ra còn có bốn cách thay thế khác mà mình muốn đề cập vì chúng thường được sử dụng. Các ``|`` (or) toán tử cho phép bạn xác định nhiều lựa chọn thay thế. Giả sử bạn phải viết regex cho các URL và bạn cần phải đối sánh cả “HTTP” và “WWW”. Kết hợp chúng lại với nhau cho phép bạn so khớp một trong số chúng:``/http|www/g``.

Ba cái còn lại thực sự giống nhau và được sử dụng để xác định số lượng: ``\d*``, ``\d+``, ``\d?``.

* ``\d*`` :  Dấu sao được sử dụng để khớp với 0 hoặc nhiều ký tự đứng trước.
* ``\d+``:  Dấu cộng được sử dụng để khớp với 1 hoặc nhiều ký tự đứng trước.
* ``\d?``:  Dấu chấm hỏi được dùng để khớp với 0 hoặc 1 của ký tự đứng trước. 

### Groups
Bây giờ, giả sử bạn sử dụng regex này trong mã JavaScript của mình và bất cứ khi nào bạn tìm thấy một kết quả phù hợp, bạn muốn trích xuất một phần của nó. Trong trường hợp này, chúng ta có thể truy xuất năm, tháng và ngày một cách riêng biệt để có thể thực hiện các loại nội dung khác nhau sau này với chúng. Trường hợp này ``groups`` có thể được dùng.

```js
// Original example
/\d{4}\/\d{2}\/\d{2}/g.exec('2020/01/02'); // Outputs: ["2020/01/02", index: 0, input: "2020/01/02", groups: undefined]

// With capturing groups
/(\d{4})\/(\d{2})\/(\d{2})/g.exec('2020/01/02'); // Outputs: ["2020/01/02", "2020", "01", "02", index: 0, input: "2020/01/02", groups: undefined]

// With named capturing groups (as of writing, currently in stage 4 for ES2018)
/(?<year>\d{4})\/(?<month>\d{2})\/(?<day>\d{2})/g.exec('2020/01/02'); // Outputs: ["2020/01/02", "2020", "01", "02", index: 0, input: "2020/01/02", groups: {…}]

/**
 * Groups will include the following:
 * groups:
 *   day: "02"
 *   month: "01"
 *   year: "2020"
 */
```

Trong ví dụ ban đầu, khi bạn sử dụng phương thức``exec`` trên regex và chuyển vào một ngày tháng, bạn sẽ nhận lại một mảng. Trong trường hợp này, bạn vẫn cần gọi ``'2020/01 / 02'.split (' / ');`` để có được những gì bạn muốn.

Với ví dụ thứ hai, bạn có thể giải quyết vấn đề này bằng cách nhóm mọi thứ lại với nhau bằng dấu ngoặc đơn. Bây giờ trong đầu ra, bạn lấy lại năm, tháng và ngày riêng biệt và bạn có thể truy cập chúng, bắt đầu từ index đầu tiên của mảng: ``arr[1]``.

Mình cũng bao gồm một ví dụ thứ ba sử dụng các ``groups``  có tên (year, month, day). Điều này sẽ cung cấp cho bạn một object ``groups`` trên mảng đầu ra, object này sẽ chứa các nhóm đã đặt tên của bạn với giá trị của chúng. Tuy nhiên, điều này chưa được chuẩn hóa và không được hỗ trợ trong tất cả các trình duyệt, vì vậy mình khuyên các  bạn nên tránh sử dụng nó trong môi trường production.

### Thực hành
Giả sử tôi muốn tạo một regex match với một URL web và mình muốn nó match với “HTTP”, “HTTPS”, “WWW” hoặc không có giao thức nào cả. Điều đó có nghĩa là mình cần bao gồm bốn trường hợp khác nhau:

* https://webtips.dev
* http://webtips.dev
* www.webtips.dev
* webtips.dev

```js
/https?/g
```

Regex trên sẽ match với “HTTP” và “HTTPS”. Tiếp theo là dấu hai chấm và hai dấu gạch chéo về phía trước.
```js
/https?:\/\//g
```
Và bây giờ chúng ta có thể hoàn thành phần còn lại với chính tên máy chủ:
```js
/https?:\/\/webtips\.dev/g
```

Bây giờ, điều này chắc chắn sẽ hoạt động cho hai trường hợp đầu tiên nhưng chúng ta cũng có thể có “WWW” và không có giao thức nào cả.
```js
/https?:\/\/|www\.webtips\.dev/g
```
Và điều duy nhất cần làm là biến nó thành tùy chọn để chúng ta có regex khi người dùng không cung cấp bất kỳ giao thức nào cả.
```js
/(https?:\/\/|www\.)?webtips\.dev/g
```

### Kết luận

Trên đây là bài chia sẻ cơ bản về biểu thức chính quy (regular expressions) trong Javascript. Bài viết còn nhiều thiếu sót các bạn có thể comment bên dưới để mình bổ sung. Cảm ơn các bạn đã theo dõi. :))