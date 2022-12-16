## Tổng quan
Những ngôn ngữ như C có các nguyên hàm quản lý bộ nhớ cấp thấp như `malloc()` và `free()`. 

Javascript cấp phát bộ nhớ khi mọi thứ (đối tượng, chuỗi, ...) được tạo ra và tự động giải phóng khi chúng không được sử dụng nữa. Quá trình như vậy gọi là `garbage collection`. Việc tự động giải phóng tài nguyên là nguồn gốc của sự nhầm lẫn và làm cho các nhà phát triển Javascript (và các ngôn ngữ bậc cao khác) có ấn tượng sai lầm và họ có thể lựa chọn việc không quan tâm đến quản lý bộ nhớ. Đây là một sai lầm lớn.

Kể cả khi làm việc với ngôn ngữ bậc cao, các nhà phát triển cũng nên hiểu về quản lý bộ nhớ (ít nhất là ở mức cơ bản). Thỉng thoảng, có một vài vấn đề với việc quản lý bộ nhớ tự động mà các nhà phát triển cần phải hiểu để xử lý chúng đúng cách. 
## Vòng đời bộ nhớ
Cho dù bạn sử dụng ngôn ngữ lập trình nào, vòng đời của bộ nhớ đều giống nhau:

![](https://images.viblo.asia/2050b095-b6d0-4ce1-bbc9-7ca4c9192461.png)

Dưới đây là tổng quan về những gì xảy ra ở mỗi bước của chu kỳ:
* Cấp phát bộ nhớ - bộ nhớ được cấp phát bởi hệ điều hành cho phép các chương trình sử dụng. Trong ngôn ngữ bậc thấp như C, đây là một hoạt động mà các nhà phát triển nên xử lý. Tuy nhiên, trong ngôn ngữ bậc cao, điều này được tự động.
* Sử dụng bộ nhớ - đây là thời điểm chương trình thực sự sử dụng bộ nhớ được cấp phát trước đó. Các hoạt động đọc và ghi diễn ra khi các biến được sử dụng.
* Giải phóng bộ nhớ - đây là lúc giải phóng hoàn toàn bộ nhớ khi không cần dùng đến nữa.

## Bộ nhớ là gì?
Trước khi đi vào bộ nhớ trong Javascript, chúng ta sẽ thảo luận ngắn gọn về bộ nhớ nói chung và cách thức hoạt động của nó.

Ở cấp độ phần cứng, bộ nhớ máy tính bao gồm một lượng lớn các `flip flops`. Mỗi `flip flop` chứa một vài bóng bán dẫn và có khả năng lưu trữ một bit. Các `flip flop` riêng lẻ được đánh địa chỉ bằng một mã định danh duy nhất.

Có rất nhiều thứ được lưu trữ trong bộ nhớ:
1. Tất cả các biến và dữ liệu khác được sử dụng bởi tất cả các chương trình máy tính.
2. Mã chương trình, bao gồm cả hệ điều hành.

Trình biên dịch và hệ điều hành phối hợp với nhau để đảm nhiệm hầu hết việc quản lý bộ nhớ, nhưng chúng ta nên xem những gì đang diễn ra trong chương trình.

Khi biên dịch mã, trình biên dịch kiểm tra kiểu dữ liệu nguyên thủy và tính toán lượng bộ nhớ cần thiết. Số lượng đó sẽ được cấp phát cho chương trình trong không gian `call stack`. Không gian mà các biến được cấp phát được gọi là không gian ngăn xếp vì khi các hàm được gọi, bộ nhớ của chúng sẽ được thêm vào trên bộ nhớ hiện có. Khi kết thúc, chúng sẽ được xóa đi theo thứ tự LIFO (last-in, first-out). Xem xét ví dụ sau:
```
int n; // 4 bytes
int x[4]; // mảng 4 phần tử, mỗi phần tử 4 bytes
double m; // 8 bytes
```
Trình biên dịch có thể ngay lập tức thấy được đoạn mã trên yêu cầu `4 + 4 × 4 + 8 = 28 bytes`

trình biên dịch sẽ chèn mã tương tác với hệ điều hành để yêu cầu số byte cần thiết trên ngăn xếp để các biến được lưu trữ.

Khi các hàm gọi hàm khác, mỗi hàm sẽ có một đoạn riêng của ngăn xếp khi nó được gọi. Nó giữ tất cả các biến cục bộ của nó ở đó và một con trỏ để ghi nhớ vị trí thực thi của nó. Khi hàm kết thúc, khối bộ nhớ của nó được cung cấp cho mục đích khác. 
## Cấp phát động
Thật không may, mọi thứ trở nên không dễ dàng khi chúng ta không biết tại thời điểm biên dịch, một biến cần bao nhiêu bộ nhớ. Ví dụ: 
```
int n = readInput(); // đọc đầu vào
...
// tạo một mảng với "n" phần tử
```
Ở đây, tại thời điểm biên dịch, trình biên dịch không biết bao nhiêu bộ nhớ mà mảng sẽ cần vì nó được xác định bởi dữ liệu cung cấp từ người dùng.

Do đó, không thể cấp phát một chỗ cho biến này trên ngăn xếp. Thay vào đó, chương trình cần yêu cầu rõ hệ điều hành cho đúng dung lượng trong thời gian chạy. Bộ nhớ này được gán từ `heap space`. Sự khác nhau giữa cấp phát bộ nhớ động và tĩnh được tóm tắt trong bảng sau:

| Cấp phát tĩnh | Cấp phát động | 
| -------- | -------- | 
| * Kích thước phải được biết ở thời điểm biên dịch     | * Kích thước có thể không biết tại thời điểm biên dịch     |
| * Thực thi tại thời điểm biên dịch | * Thực thi tại thời gian chạy |
| * Được giao cho Stack | * Được giao cho Heap |
| * LIFO (first-in, last-out) | * Không có thứ tự cụ thể |

## Cấp phát trong javascript
Bây giờ ta sẽ đi vào tìm hiểu bước đầu tiên (cấp phát bộ nhớ) hoạt động như thế nào trong javascript.

Javascript giải phóng nhà phát triển khỏi việc xử lý cấp phát bộ nhớ.
```
var n = 374; // cấp phát bộ nhớ cho 1 số
var s = 'sessionstack'; // cấp phát bộ nhớ cho một chuỗi 
var o = {
  a: 1,
  b: null
}; // cấp phát bộ nhớ cho một đối tượng và giá trị mà nó chứa.
var a = [1, null, 'str'];  // cấp phát bộ nhớ cho một mảng và các giá trị trong nó
function f(a) {
  return a + 3;
} // cấp phát một hàm
someElement.addEventListener('click', function() {
  someElement.style.backgroundColor = 'blue';
}, false);
```

Kết quả của các lời gọi hàm cũng cấp phát các đối tượng:
```
var d = new Date(); // cấp phát một đối tượng Date
var e = document.createElement('div'); // cấp phát một phần tử DOM
```

Phương thức có thể cấp phát các giá trị hay đối tượng mới:
```
var s1 = 'sessionstack';
var s2 = s1.substr(0, 3); // s2 is a new string
// Vì chuỗi là bất biến, 
// JavaScript có thể không cấp phát bộ nhớ, 
// mà chỉ lưu trữ khoảng [0, 3].
var a1 = ['str1', 'str2'];
var a2 = ['str3', 'str4'];
var a3 = a1.concat(a2); 
// một mảng mới gồm 4 phần tử được kết hợp từ a1 và a2
```

## Sử dụng bộ nhớ trong javascript
Sử dụng bộ nhớ được cấp phát trong javascript đơn giản là đọc và viết lên đó. Ví dụ như đọc và ghi giá trị của một biến hay thuộc tính của đối tượng hay kể cả truyền một biến vào một hàm.
## Giải phóng khi không cần bộ nhớ nữa
Hầu hết các vấn đề quản lý bộ nhớ đến từ phần này.

Nhiệm vụ khó nhất ở đây là tìm ra khi nào bộ nhớ được cấp phát không còn cần thiết nữa. Việc này thường yêu cầu nhà phát triển xác định nơi nào trong chương trình không cần một phần bộ nhớ như vậy nữa và giải phóng nó.

Các ngôn ngữ cấp cao nhúng một phần mềm gọi là `garbage collector`, công việc là theo dõi việc cấp phát và sử dụng bộ nhớ để xác định khi một phần bộ nhớ đã được cấp phát không được sử dụng trong mọi trường hợp nữa, nó sẽ tự động giải phóng nó.

Thật không may, quá trình này là xấp xỉ vì vấn đề chung là phải biết phần bộ nhớ đó có còn được sử dụng nữa hay không (không thể giải quyết được bằng thuật toán).

## Garbage collection
Do thực tế là việc tìm kiếm xem một số bộ nhớ có phải là không cần thiết nữa hay không là không hoàn toàn chính xác, `garbage collections` vẫn có những hạn chế. Phần này sẽ giải thích các khái niệm cần thiết để hiểu các thuật toán `garbage collections` chính và các hạn chế của chúng.

## Tham chiếu bộ nhớ
Trong quản lý bộ nhớ, một đối tượng tham chiếu đến một đối tượng khác nếu cái trước có quyền truy cập đến cái sau. Ví dụ, một đối tượng trong javascript có tham chiếu đến thuộc tính và `prototype` của nó.

## Reference-counting garbage collection
Đây là thuật toán `garbage collection` đơn giản nhất. Một đối tượng được coi là "garbage collectible" nếu không có tham chiếu nào trỏ đến nó.

Xem xét đoạn code sau:
```
var o1 = {
  o2: {
    x: 1
  }
};
// 2 đối tượng được tạo ra.
// 'o2' tham chiếu bởi 'o1' như một thuộc tính của nó.

var o3 = o1; // 'o3' là cái thứ 2 có tham chiếu đến đối tượng được trỏ đến bởi 'o1'.
                                                       
o1 = 1;      // bây giờ chỉ còn lại 'o3' trỏ đến đối tượng lúc đầu trỏ đến bởi 'o1'.

var o4 = o3.o2; // tham chiếu đến thuộc tính 'o2'.
                // Đối tượng này có 2 tham chiếu: một là thuộc tính. 
                // còn lại là biến 'o4'

o3 = '374'; // Đối tượng lúc đầu tham chiếu bởi 'o1' giờ không còn tham chiếu nào.
            // nó có thể garbage-collected.
            // Tuy nhiên, thuộc tính 'o2' của nó vẫn được tham chiếu bởi biến 'o4', nên nó không thể được giải phóng.

o4 = null; // Tại thời điểm này, đối tượng lúc đầu tham chiếu bởi 'o1' không còn cái gì tham chiếu đến nó
```
## Chu kỳ tạo ra vấn đề
Có một hạn chế khi nói đến chu kỳ. Trong ví dụ sau, hai đối tượng được tạo và tham chiếu lẫn nhau, do đó tạo ra một chu kỳ. Chúng sẽ đi ra khỏi phạm vi sau khi gọi hàm, vì vậy chúng thực sự không được sử dụng nữa và có thể được giải phóng. Tuy nhiên, thuật toán `reference-counting` cho rằng mỗi đối tượng đều được tham chiếu ít nhất một lần nên chúng không thể `garbage-collected`.
```
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 references o2
  o2.p = o1; // o2 references o1. This creates a cycle.
}

f();
```
## Thuật toán Mark-and-sweep
Để quyết định xem có cần một đối tượng hay không, thuật toán này xác định xem đối tượng có thể truy cập được hay không.

Thuật toán Mark-and-sweep đi qua 3 bước:
1. Roots: là các biến toàn cục được tham chiếu. Ví dụ trong javascript, biến toàn cục là “window” object. Một danh sách đầy đủ của tất cả các `roots` được xây dựng bởi `garbage collector`.
2. Thuật toán sau đó kiểm tra tất cả các `roots` và con cái của chúng và đánh dấu chúng là active (có nghĩa là chúng không phải là rác). Bất cứ điều gì mà một `root` không thể kết nối được sẽ được đánh dấu là rác.
3. Cuối cùng, garbage collector giải phóng tất cả các phần bộ nhớ không được đánh dấu là active và trả lại bộ nhớ đó cho HĐH.

![](https://images.viblo.asia/895a9e92-048b-4586-b8e5-fd97bbfc6878.gif)

Thuật toán này tốt hơn thuật toán trước vì một đối tượng không có tham chiếu nào dẫn đến việc đối tượng này không thể được kết nối. Điều ngược lại là không đúng như chúng ta đã thấy với các chu kỳ.

## Chu kỳ không còn là vấn đề nữa
Trong ví dụ ở trên, sau khi lời gọi hàm kết thúc, hai đối tượng không được tham chiếu nữa bởi một cái gì đó có thể truy cập từ đối tượng toàn cục. Do đó, chúng sẽ được tìm thấy bởi garbage collector.

![](https://images.viblo.asia/b32f3dc5-9a68-44d6-923a-ce62130e1d49.png)

Mặc dù có tham chiếu giữa các đối tượng, nhưng chúng không thể truy cập từ `root`.
## Rò rỉ bộ nhớ là gì?
Rò rỉ bộ nhớ là những phần bộ nhớ mà ứng dụng đã sử dụng trước đây nhưng không còn cần thiết nữa nhưng vẫn chưa được trả lại hệ điều hành. 

Ngôn ngữ lập trình có các cách khác nhau để quản lý bộ nhớ. Tuy nhiên, liệu một phần bộ nhớ nhất định có được sử dụng hay không thực sự là một vấn đề không thể giải quyết được. Nói cách khác, chỉ có các nhà phát triển mới có thể làm rõ liệu một phần bộ nhớ có thể được trả lại cho hệ điều hành hay không.
## Bốn loại rò rỉ phổ biến trong JavaScript
### Biến toàn cục
JavaScript xử lý các biến không được khai báo theo một cách thú vị: khi một biến không được khai báo được tham chiếu, một biến mới sẽ được tạo trong đối tượng toàn cục. Trong một trình duyệt, đối tượng toàn cục là `window`, có nghĩa là
```
function foo(arg) {
    bar = "some text";
}
```
tương đương với:
```
function foo(arg) {
    window.bar = "some text";
}
```
Mục đích của `bar` là chỉ tham chiếu một biến trong hàm `foo`. Tuy nhiên, một biến toàn cục dự phòng sẽ được tạo, nếu bạn không sử dụng `var` để khai báo nó.

Bạn cũng có thể vô tình tạo một biến toàn cục bằng cách sử dụng `this`:
```
function foo() {
    this.var1 = "potential accidental global";
}
// Foo called on its own, this points to the global object (window)
// rather than being undefined.
foo();
```
Toàn cục không mong muốn chắc chắn là vấn đề. Cần chú ý đặc biệt đến các biến toàn cục được sử dụng để tạm thời lưu trữ và xử lý các bit thông tin lớn. Sử dụng các biến toàn cục để lưu trữ dữ liệu nếu bắt buộc nhưng khi thực hiện, hãy đảm bảo gán nó dưới dạng null hoặc gán lại nó sau khi bạn sử dụng xong nó.

### Timers hay callbacks bị lãng quên
Xem xét ví dụ sau:
```
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //Được thực thi mỗi 5 giây.
```
Đối tượng `renderer` có thể được thay thế hoặc loại bỏ tại một số điểm sẽ làm cho khối được đóng gói bởi `interval handler redundant`. Nếu điều này xảy ra, cả trình xử lý, cũng như các phần phụ thuộc của nó sẽ không được thu thập vì `interval` cần phải dừng lại trước tiên (hãy nhớ rằng nó vẫn còn hoạt động). Điều này dẫn đến `serverData` nơi lưu trữ và xử lý việc tải dữ liệu sẽ không được thu thập.

Khi sử dụng trình quan sát, bạn cần đảm bảo rằng bạn thực hiện một cuộc gọi rõ ràng để xóa chúng sau khi bạn đã thực hiện xong.

May mắn thay, hầu hết các trình duyệt hiện đại sẽ thực hiện công việc cho bạn: chúng sẽ tự động thu thập các trình xử lý quan sát một khi đối tượng quan sát trở nên không thể truy cập được ngay cả khi bạn quên xóa `listener`.

### Closures
Closures có thể rò rỉ bộ nhớ theo cách sau:
```
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // a reference to 'originalThing'
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);

```
Khi `replaceThing` được gọi, `theThing` nhận được một đối tượng mới bao gồm một mảng lớn và một closure (`someMethod`). `originalThing` được tham chiếu bởi một closure. Trong trường hợp này, phạm vi được tạo cho closure `someMethod` được chia sẻ với `unused`. `unused` có một tham chiếu đến `originalThing`. `someMethod` có thể được sử dụng thông qua `theThing` bên ngoài phạm vi của `replaceThing`, mặc dù thực tế là `unused` không bao giờ được sử dụng. Tham chiếu không được sử dụng `originalThing` yêu cầu nó vẫn phải active khi `someMethod` chia sẻ closure scope.

Tất cả điều này có thể dẫn đến rò rỉ bộ nhớ đáng kể. Bạn có thể thấy sự tăng đột biến trong việc sử dụng bộ nhớ khi đoạn mã trên được chạy đi chạy lại.
### Tham chiếu DOM
Có những trường hợp nhà phát triển lưu trữ các phần tử DOM bên trong cấu trúc dữ liệu. Giả sử bạn muốn cập nhật nhanh chóng nội dung của một số hàng trong một bảng. Nếu bạn lưu trữ một tham chiếu đến từng hàng DOM trong một từ điển hoặc một mảng, sẽ có hai tham chiếu đến cùng một phần tử DOM: một trong cây DOM và một trong từ điển. Nếu bạn quyết định loại bỏ các hàng này, bạn cần nhớ làm cho cả hai tham chiếu không thể truy cập được.
```
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    // The image is a direct child of the body element.
    document.body.removeChild(document.getElementById('image'));
    // At this point, we still have a reference to #button in the
    //global elements object. In other words, the button element is
    //still in memory and cannot be collected by the GC.
}
```
Có một sự xem xét bổ sung phải được tính đến khi nói đến các tham chiếu đến các nút bên trong hoặc các lá bên trong cây DOM. Nếu bạn giữ một tham chiếu đến một ô của bảng (thẻ `<td>`) trong mã của bạn và quyết định xóa bảng khỏi DOM mà vẫn giữ tham chiếu đến ô cụ thể đó, bạn có thể rò rỉ bộ nhớ chính. Bạn có thể nghĩ rằng trình thu gom rác sẽ giải phóng mọi thứ trừ ô đó. Tuy nhiên nó không xảy ra trong trường hợp này. Vì ô là một nút con của bảng và các con giữ các tham chiếu đến cha mẹ của chúng, nên tham chiếu duy nhất này đến ô bảng sẽ giữ toàn bộ bảng trong bộ nhớ. 
## Tham khảo
[https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)