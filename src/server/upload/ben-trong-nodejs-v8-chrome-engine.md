*V8 Engine được phát triển bởi Chrome, trong dự án dành cho Google Chrome và Chromium, về sau được cả Node.js và MongoDb sử dụng (song từ version 3.2 Mongo đã dùng SpiderMonkey). Vậy V8 Engine là gì mà lại được nhiều ông lớn sử dụng như vậy?  Ở bài này ta sẽ tìm hiểu về từng thành phần và hoạt động của nó.*

# Fast Property Access
## Hidden Class

Mọi thứ trong JavaScript đều là **object**, và mọi thuộc tính của một object thì đều có thể được thêm vào hoặc bỏ đi (thay đổi layout), hoặc thay đổi kiểu dữ liệu (type) bất cứ lúc nào. Điều này khiến cho việc tối ưu một ngôn ngữ "động" như JavaScript (dynamically typed language) trở nên rất khó khăn. Ví dụ đoạn code sau:

```javascript
class Car {
    door_open() {
        // ...
    }
}

class Girl {
    // girls has no door
}

const open_the_door = (object) => {
 object.door_open();
};
```

Có thể thấy, hàm `open_the_door()` nhận vào một **object** và gọi hàm `door_open()` của object đó, tuy nhiên vì không có cách nào quy định cụ thể kiểu dữ liệu nhận vào của hàm `open_the_door` , compiler sẽ không biết **object** nhận vào có hàm `door_open()` hay không. Trong trường hợp phải kiểm tra bằng *lookup*(duyệt hết toàn bộ hàm/thuộc tính trong **obejct** đó). Rõ ràng là nó sẽ giảm hiệu suất đi rất nhiều, nguyên nhân có lẽ nằm ở thiết kế của JavaScript.

Vì lẽ đó **hidden-class** ra đời để giải quyết vấn đề này. Hidden class, gán vào cho mỗi **object** để giúp cho việc theo dõi kiểu và các thuộc tính của chúng một cách thuận tiện hơn. Và mỗi lần **object** thay đổi, thì **hidden class** của nó cũng sẽ thay đổi tương ứng.

Ví dụ như sau:

```javascript
let point = {};
point.x = 0;
point.y = 1;
```

Với đoạn code trên, ta sẽ phải thay đổi cấu trúc của object `point` 3 lần. Đầu tiên, là ở câu lệnh `let point = {}`, lúc này V8 sẽ tạo ra hidden class tạm gọi là **C0** để biểu diễn cấu trúc của `point` (một object rỗng). Khi đến câu lệnh gán `point.x` thì object thay đổi, nên V8 lúc này sẽ thay thế hidden class  **C0** thành **C1** (có thêm thuộc tính `.x`). Và cuối cùng là **C2** có thêm thuộc tính `.y`, quá trình thay đổi diễn ra như hình bên dưới:

![hidden_class1](https://ren0503.github.io/assets/img/v8/hidden_class1.png)

Đoạn code trên giúp ta hiểu về cách hoạt động của hidden class, thực tế thì nó không hề tối ưu ta có thể viết lại như sau:

```javascript
let point = {
    x: 0,
    y: 1,
}
```

Lúc này vì không có sự thay đổi nào xảy ra sau khi thay đổi nên V8 chỉ tạo một hidden-class thôi, tối ưu được hiệu suất.

![hidden_class2](https://ren0503.github.io/assets/img/v8/hidden_class2.png)

Các object có cùng kiểu hoặc cấu trúc (hoặc thuộc cùng một class) thì sẽ có chung một hidden class, V8 sẽ không tạo mới mà sử dụng lại các hidden class đã có nếu trùng khớp.

Ví dụ với câu lệnh sau, hidden class của `point` thay đổi từ C2 về lại C1 chứ không tạo mới:

```javascript
delete point.y;
```

![hidden_class3](https://ren0503.github.io/assets/img/v8/hidden_class3.png)

Tuy nhiên, nếu thuộc tính bị xóa là `.x` thì sẽ lại có một hidden class C3 được tạo ra.

Bằng cách sử dụng hidden class, V8 luôn biết trước được cấu trúc của một class/object, từ đó có thể tối ưu việc truy xuất đến các thuộc tính của chúng bằng nhiều cách, một trong các kĩ thuật tối ưu mà V8 áp dụng đó là **inline caching**.

## Inline Caching

Ví dụ ta có một hàm như sau:

```javascript
function getX(o) {
	return o.x;
}
```

Khi chạy function này sẽ sinh ra byte code như sau:

![inline_caching1](https://ren0503.github.io/assets/img/v8/inline_caching1.png)

Câu lệnh `get_by_id` nhận thuộc tính `x` từ tham số đầu tiên (**arg1**) và lưu kết quả vào `loc0`. Câu lệnh thứ 2 trả về `loc0`.

Compiler cũng nhúng inline cache vào lệnh `get_by_id`, trong đó có 2 slot chưa được khởi tạo.

![inline_caching2](https://ren0503.github.io/assets/img/v8/inline_caching2.png)
*Shape trong hình là Hidden Class*

Giả sử ta gọi `getX` với object là `{x: 'a'}`. Như đã nói, object này có một hidden class chứa thuộc tính x mà chỉ lưu offset và đặc tính của thuộc tính x. Khi thực thi function này lần đầu tiên, `get_by_id` sẽ tìm kiếm `x` và tìm thấy giá trị được lưu ở *offset 0*.

![inline_caching3](https://ren0503.github.io/assets/img/v8/inline_caching3.png)

Inline cache được nhúng trong `get_by_id` sẽ lưu lại hidden class cũng như offset:

![inline_caching4](https://ren0503.github.io/assets/img/v8/inline_caching4.png)

Với các lần chạy hàm tiếp theo, inline cache chỉ cần so sánh hidden class, nếu trùng với cái đã có trước đó thì chỉ cần tải giá trị từ bộ nhớ. Cụ thể, nếu V8 tìm thấy object với hidden class mà inline cache đã ghi lại trước đó, nó sẽ không cần phải tìm thông tin về thuộc tính nữa, phần tìm kiếm đắt đỏ này sẽ bị bỏ qua hoàn toàn. Rõ ràng là sẽ nhanh hơn so với việc phải tìm kiếm thuộc tính lại mỗi lần chạy hàm.

# Garbage Collection

Nói đến công việc dọn rác (thu gom và xoá những object/value không còn dùng đến, trả không gian bộ nhớ cho các tác vụ khác) đây là một phần quan trong nhưng ít được chú ý trong JavaScript. Ngày nay, khi mà JavaScript đã có nhiều ứng dụng cho xây dựng server lẫn các single page application, vòng đời của một app JS ngày một dài ra, vai trò của GC ngày một lớn.

GC của V8 là một **Generational Garbage Collector**. Trong quá trình thực thi, các giá trị (biến, object,...) được tạo ra nằm trong bộ nhớ **heap**. V8 chia **heap** ra làm nhiều khu vực, trong đó ta chỉ đề cập đến hai khu vực chính là **new-space** (chứa các đối tượng nhỏ, có vòng đời ngắn) và **old-space** (chứa các đối tượng lớn và vòng đời dài hơn).

Hai khu vực này cũng là hai đối tượng cho hai loại thuật toán GC khác nhau, đó là **scavenge** và **mark-sweep/mark-compact**.

![garbage_collection1](https://ren0503.github.io/assets/img/v8/garbage_collection1.png)

Khi chúng ta khai báo một giá trị mới, giá trị này sẽ được cấp phát nằm rải rác trong khu vực **new-space**, khu vực này có một kích thước nhất định, thường là rất nhỏ (khoảng 1MB đến 8MB, tùy vào cách hoạt động của ứng dụng). Việc khai báo như thế này tạo ra nhiều khoảng trống không thể sử dụng được trong bộ nhớ.

Khi **new-space** đã đầy, thì **scavenge** sẽ được kích hoạt để dọn dẹp các vùng nhớ "chết", giải phóng bộ nhớ, có thể sẽ gom góp các vùng nhớ rời rạc lại gần nhau cho hợp lý, vì **new-space** rất nhỏ, nên **scavenge** được kích hoạt rất thường xuyên. Trong quá trình giải phóng bộ nhớ của **scavenge**, nếu các vùng nhớ nào còn trụ lại được sau 2 chu kỳ, thì được chuyển lên khu vực **old-space**, nơi mà có sức chứa lên đến hàng trăm megabytes, và là nơi mà thuật toán **mark-sweep** hoặc **mark-compact** hoạt động, với chu kỳ dài hơn, ít thường xuyên hơn.

Tất cả những thuật toán GC trên đều hoạt động thông qua hai bước chính là:

- Bước đánh dấu: thuật toán sẽ duyệt qua tất cả các giá trị có trong khu vực bộ nhớ mà nó quản lý, bước duyệt này đơn giản chỉ là *depth-first search*, tìm gặp và đánh dấu.
- Bước xử lý: sau quá trình duyệt, tất cả những giá trị chưa được đánh dấu, sẽ bị coi là đã "chết", và sẽ bị xóa bỏ, trả lại bộ nhớ trống (*sweep*), hoặc gom góp lại để lấy lại các khoảng trống trong bộ nhớ không sử dụng được (*compact*).

Điểm khác nhau giữa **scavenge** và **mark-sweep/mark-compact** nằm ở cách mà chúng được triển khai, các bạn có thể xem thêm chi tiết về hai thuật toán trên trong bài [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)

Về nguyên lý đánh dấu (*marking*) của các thuật toán trên, chúng ta sẽ làm quen với khái niệm **reachability**.

Tất cả mọi đối tượng được khai báo trong **global scope**, hoặc các **DOM elements** thì được gọi là **root**. Và đứng từ các **roots**, tất cả mọi giá trị local có quan hệ trực tiếp hoặc gián tiếp với các **roots** này sẽ được coi là còn "sống" (*reachable*). Những đối tượng nào không có mối liên hệ trực tiếp hoặc gián tiếp với bất kì **roots** nào, thì coi như là đã "chết" (*unreachable*).

Ví dụ với đoạn code sau:

```javascript
let a = { name: "huy" };

function hello() {
    let b = a;
    // you're here
}
```

Trạng thái của heap và sơ đồ biểu diễn **reachability** của từng giá trị, ngay tại vị trí `// you're here` được thể hiện như sau:

![garbage_collection2](https://ren0503.github.io/assets/img/v8/garbage_collection2.png)

Ở đây ta có `a` và `hello` là hai giá trị thuộc **global scope**, vì thế chúng được gọi là các **root**. Biến `a` tham chiếu đến một object nằm trong **heap**, và biến `b` bên trong hàm `hello` cũng tham chiếu tới chính object này.

Khi hàm `hello()` được thực thi xong, và chúng ta đi ra khỏi **scope** của hàm đó, thì mọi tham chiếu đến các giá trị bên trong hàm đó đều sẽ bị hủy đi, lúc này b trở thành **unreachable**, và sẽ trở thành đối tượng để bị GC xoá bỏ(tuy nhiên bị xoá lúc nào thì không ai biết trước được).

![garbage_collection3](https://ren0503.github.io/assets/img/v8/garbage_collection3.png)

Lưu ý, đối với các **root**, chúng ta không thể sử dụng lệnh `delete` để xóa sổ chúng, ví dụ:

```javascript
delete a; // trả về false
delete hello; // trả về false
```

Nhưng chúng ta có thể gán chúng bằng `null` để cho các giá trị mà chúng tham chiếu tới bị GC xoá (nhưng chính biến đó thì lại vẫn còn tồn tại, ở đây, cả `a` lẫn `hello` đều vẫn được bảo toàn), ví dụ, sau lệnh dưới đây, sơ đồ của chúng ta sẽ là:

```javascript
a = null;
```

![garbage_collection4](https://ren0503.github.io/assets/img/v8/garbage_collection4.png)

Vậy thì đến bao giờ `a` và `hello` mới bị giải phóng khỏi bộ nhớ? Câu trả lời là: chừng nào ứng dụng của chúng ta còn chạy, thì chúng vẫn sẽ còn tồn tại trong bộ nhớ. Dân gian gọi là *memory leak*. Chính vì thế, nên hạn chế việc tạo và sử dụng các biến **global**, nếu không thực sự cần thiết.

Nói tiếp về vấn đề khi sử dụng `delete` và `null`, ở trên chúng ta đã biết `delete` không thể xóa sổ các **root**, tuy nhiên nó vẫn hoạt động tốt thuộc tính của các **object**:

```javascript
delete a.name;
```

Khi chạy lệnh trên, ta có thể chủ động làm cho giá trị `a.name` trở thành mục tiêu của GC, nhưng cách này có một hiệu ứng tiêu cực, đó là nó làm thay đổi hidden class của `a`, mà như chúng ta đã biết ở phần trước, việc này gây ảnh hưởng tới performance. Tương tự, nếu chúng ta gán `a.name` là `null`, nó cũng sẽ trở thành mục tiêu của GC.

```javascript
a.name = null;
```

Nhưng lại một lần nữa, việc gán một biến thành `null` chỉ có thể làm cho giá trị mà biến đó tham chiếu tới trở thành mục tiêu bị xóa sổ, nhưng không thể xóa sổ chính biến đó. Trong trường hợp này thì biến `a.null` vẫn còn tồn tại.

Cách tốt nhất để hủy một giá trị là đưa nó vào một **scope** nào đó, ví dụ như sử dụng *JS Modules* hoặc *IIFE* (immediately invoked function expression):

```javascript
(function() {
    let a = { name: "huy" };
})();

a; // ReferenceError: a is not defined
```

Tiếp, khi truyền một hàm vào `setInterval` hoặc `setTimeout`, một tham chiếu đến hàm đó sẽ được tạo ra, khiến cho hàm này không thể bị GC hốt, dù cho chúng ta đã ra khỏi **scope** chứa nó, và sẽ vẫn tồn tại cho đến chừng nào nó được kích hoạt.

Đối với trường hợp của `setTimeout`, chúng ta có thể yên tâm, vì sau một khoảng thời gian, nó sẽ được chạy, và cuối cùng sẽ bị GC xoá, tuy nhiên đối với `setInterval`, thì lại không hề đơn giản:

```javascript
function do_something() {
    setInterval(function run() {
        // do something
    }, 1000);
}
// you're here
```

![garbage_collection5](https://ren0503.github.io/assets/img/v8/garbage_collection5.png)

Hàm `run` vẫn còn tồn tại và vẫn còn được thực thi sau mỗi 1 giây, kể cả khi hàm `do_something` đã kết thúc vòng đời của nó. Chính vì thế, phải luôn luôn lưu lại tham chiếu của mỗi câu lệnh `setInterval`, và chạy `clearInterval` khi không còn cần đến:

```javascript
function do_something() {
    let runner = setInterval(function run() {
        // do something
    }, 1000);
    
    // do more thing

    clearInterval(runner);
}
```

Một vài lưu ý khác, GC của V8 là **stop-the-world**, có nghĩa là, khi GC chạy thì toàn bộ chương trình sẽ bị dừng lại, thời gian dừng có khi lên đến vài trăm mili giây, là một con số khá lớn.

Team V8 áp dụng một vài kĩ thuật khác gọi là **concurrent marking**, giúp cho ứng dụng JavaScript vẫn có thể được thực thi (tất nhiên là đồng thời) trong khi GC hoạt động. Tuy không hoàn toàn giúp cho ứng dụng tránh bị đứng, nhưng cũng cải thiện được performance rõ rệt, các bạn có thể đọc thêm qua bài [Concurrent marking in V8](https://v8.dev/blog/concurrent-marking).

# Pipeline

Trở lại bài viết trước ta biết javaScript engine sẽ phân giải mã nguồn và chuyển thành AST (Abstract Syntax Tree). Dựa vào AST, trình thông dịch có thể bắt đầu làm việc và sinh ra bytecode. Vậy trong V8 engine trình thông dịch đấy là gì.

Về cơ bản, các javascript engine đều có một pipeline chứa một trình thông dịch và một bộ biên dịch tối ưu. Trình thông dịch sinh nhanh các bytecode chưa tối ưu, và bộ biên dịch sẽ mất thời gian lâu hơn nhưng sẽ sinh ra mã máy (machine code) đã được tối ưu.

![pipeline1](https://ren0503.github.io/assets/img/v8/pipeline1.png)

Trong V8, trình thông dịch là Ignition còn trình biên dịch là TurboFan.

![pipeline2](https://ren0503.github.io/assets/img/v8/pipeline2.png)

### Ignition

Để hiểu về sự cần thiết của Ignition, ta phải ngược dòng chảy thời gian quay về lịch sử để hiểu về cơ chế biên dịch ở các phiên bản cũ. 

Trước đây V8 dùng JIT để dịch ra native code trước khi được thực thi. Đoạn code được dịch bởi JIT sẽ tiêu hao một lượng tương đối bộ nhớ. Thế nên Ignition ra đời biên dịch code thành byte code, với chi phí lưu trữ chỉ 25-50% so với phương pháp cũ.

Kết hợp với TurboFan mã bytecode lúc này có thể xử lý bình thường mà không cần phải biên dịch lại từ đầu.

### TurboFan

Đúng như tên gọi, TurboFan hoạt động như một máy quạt. Khi một đoạn code được gọi, thao tác gọi giống như một hành động sinh nhiệt nên code ban đầu ở trạng thái *cold* sẽ được chuyển thành *warm*, gọi nhiều lần dần nó sẽ chuyển thành *hot*. Lúc này TurboFan sẽ tối ưu hoá chúng.

![pipeline3](https://ren0503.github.io/assets/img/v8/pipeline3.png)

# Tổng kết

Ở trên là các khái niệm về các thành phần trong V8 Engine. Mong là bài viết sẽ có ích với những ai đang muốn tìm hiểu về V8 và Node.js.

# Tham khảo

[**thefullsnack**](https://thefullsnack.com/posts/javascript-v8-notes.html)

[**mathiasbynens**](https://mathiasbynens.be/notes/shapes-ics)

[**mnismtspace**](https://mnismt.space/blog/vai-net-ve-v8-javascript-engine-djang-sau-chrome-va-nodejs)