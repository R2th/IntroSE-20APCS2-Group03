### I. Tổng quan
Những ngôn ngữ như C có cơ chế quản lý bộ nhớ cấp thấp như ```malloc()``` và ```free()```. Điều này cho phép developer cấp phát và giải phóng bộ nhớ.

Trong khi đó, JavaScript cấp phát bộ nhớ khi object, string, ... được tạo và tự động giải phóng bộ nhớ khi nó không được sử dụng nữa, quá trình này gọi là *garbage collection*. Việc giải phóng tài nguyên tự động này là nguồn gốc của sự nhầm lẫn và dẫn đến việc JavaScript developer bỏ qua việc quản lý bộ nhớ. Đây là một thiếu sót lớn.

Thậm chí khi làm việc với ngôn ngữ bậc cao, developer nên có hiểu biết cơ bản về quản lý bộ nhớ. Thỉnh thoảng có những vấn đề về việc quản lý bộ nhớ tự động (chẳng hạn như bug hoặc cài đặt cơ chế dọn rác... ) mà developer nên hiểu để xử lý chúng một cách chính xác (hoặc tìm cách hợp lý, với chi phí tối thiếu).

#### Vòng đời bộ nhớ
Cho dù bạn sử dụng ngôn ngữ lập trình nào, thì vòng đời bộ nhớ đều giống nhau:

![](https://images.viblo.asia/5d00aeb8-c79a-4601-ba9e-9735626a70fb.png)

Đây là tổng quan những gì sẽ xảy ra ở mỗi bước trong vòng đời này:

* **Cấp phát bộ nhớ**: bộ nhớ được cấp phát bởi hệ điều hành cho chương trình sử dụng. Ở ngôn ngữ cấp thấp (ví dụ C) đây là một thao tác tường minh mà developer nên tự thực hiện. Ở ngôn ngữ bậc cao thì nó sẽ tự làm cho bạn.
* **Sử dụng bộ nhớ**: đây là lúc chương trình thật sự sử dụng bộ nhớ đã được cấp phát từ trước đó. *Read* và *Write* (đọc & ghi) là những thao tác xảy ra khi bạn sử dụng biến được cấp phát trong code.
* **Giải phóng bộ nhớ**: đây là lúc giải phóng toàn oboj bộ nhớ mà bạn không cần nữa. Cũng như việc cấp phát bộ nhớ thì đây là một thao tác tường minh ở những ngôn ngữ bậc thấp.

### II. Bộ nhớ là gì?
Trước khi đề cập đến bộ nhớ trong JavaScript, chúng ta sẽ thảo luận sơ bộ về bộ nhớ là gì và cách nó hoạt động.

Ở cấp độ phần cứng, bộ nhớ máy tính bao gồm một tập các *[flip flop](https://en.wikipedia.org/wiki/Flip-flop_%28electronics%29)*.  Mỗi *flip flop* chứa vài transistor và có thể lưu trữ một bit, và được đánh địa chỉ bằng một định danh duy nhất, nên ta có thể độc và ghi đè chúng. Bởi vậy, về mặt khái niệm, ta có thể nghĩ toàn bộ bộ nhớ máy tính như một mảng khổng lồ các bit để đọc và ghi.

Chúng ta sắp xếp chúng vào các nhóm lớn hơn để biểu diễn các con số. 8 bits được gọi là 1 byte.

Nhiều thứ được lưu trữ trong bộ nhớ này:

1. Tất cả các biến và dữ liệu được sử dụng bởi chương trình
2. Đoạn mã của chương trình, bao gồm cả mã của hệ điều hành.

Trình biên dịch và hệ điều hành làm việc với nhau để giám sát phần lớn việc quản lý bộ nhwos cho bạn, nhưng chúng tôi khuyến khích bạn quan sát xem nó hoạt động như thế nào.

Khi bạn biên dịch code, bộ biên dịch kiểm tra dữ liệu kiểu primitive và tính toán số lượng bộ nhớ chúng sẽ cần, sau đó cấp phát cho chương trình ở **stack space**.

```
int n; // 4 bytes
int x[4]; // array of 4 elements, each 4 bytes
double m; // 8 bytes
```

Bộ biên dịch sẽ thấy rằng đoạn code yêu cầu:
4 + 4 * 4 + 8 = 28 bytes

Bộ biên dịch sẽ yêu cầu số lượng byte cần thiết trên stack để lưu trữ biến.

Ở ví dụ trên, bộ biên dịch biết chính xác địa chỉ của mỗi biến. Thực tế, khi ta viết biến *n*, nó sẽ được dịch thành một dạng đại loại như *bộ nhớ địa chỉ 4127963*.

Lưu ý rằng nếu chúng ta thử truy cập ```x[4]```, chúng ta có thể truy cập dữ liệu được kết nối với ```m```. Đó là vì chúng ta đang truy xuất một phần tử không tồn tại trong array - nó cách 4 byte so với phần tử cuối cùng được cấp phát cho array (```x[3]```), và có thể dẫn đến việc độc (hoặc ghi đè) một vài bit của ```m```, và rất có thể dẫn đến một số kết quả không mong muốn cho phần còn lại của chương trình.

![](https://images.viblo.asia/0f9c1cfd-bbf4-4f5e-a715-e8caa7c7e44e.png)

Khi một function gọi một function khác, mỗi function sẽ có một block trong stack khi nó được gọi, để lưu tất cả các biến cục bộ ở đó, đồng thời cũng là bộ đếm của chương trình để ghi nhớ nơi nó được thực thi. Khi function hoàn thành, block bộ nhớ được giải phóng cho mục đích khác.

### II. Cấp phát bộ nhớ động
Khôn#g may là những điều này không dễ dàng nếu ta không biết tại thời gian biên dịch một biến sẽ cần bao nhiêu bộ nhớ. Giả sử ta muốn làm một số thứ như sau:

```
int n = readInput(); // reads input from the user
...
// create an array with "n" elements
```

Ở thời điểm biên dịch, trình biên dịch không biết array cần bao nhiêu bộ nhớ vì nó phu thuộc vào giá trị được cung cấp bởi user.

Bởi vậy mà nó không thể cấp phát bộ nhớ cho biến trên stack. Thay vì vậy, chương trình cần hỏi hệ điều hành ở thời gian chạy (run-time). BỘ nhớ được gán từ **heap space**. Sự khác biệt giữa cấp phát bộ nhớ tĩnh và động được tóm tắt như bảng dưới:

![](https://images.viblo.asia/ef07a7da-cef4-4136-9657-f4bf307c5c49.png)

#### Cấp phát bộ nhớ trong JavaScript
Sử dụng bộ nhớ được cấp phát trong JavaScript, về cơ bản tức là đọc và ghi, tức là đọc hoặc ghi giá trị của một biến hoặc một thuộc tính của đối tượng, truyền nó như tham số của hàm.

### IV. Giải phóng bộ nhớ
Hầu hết vấn đề về quản lý bộ nhớ bắt nguồn từ đây.

Nhiệm vụ khó nhất là xác định khi nào bộ nhớ không cần sử dụng nữa. Điều này yêu cầu developer phải xác định nơi nào trong chương trình những phần bộ nhớ này không cần sử dụng nữa và giải phóng nó.

Ngôn ngữ bậc cao được nhúng một chức năng gọi là **garbage collector** với nhiệm vụ theo dõi việc cấp phát bộ nhớ và tìm xem phần bộ nhớ được cấp phát nào không cần dùng nữa, nếu thấy thì sẽ giải phóng nó.

Không may là quá trình này chỉ là ước chừng vì việc phát hiện nơi nào cần bộ nhớ là không thể giải quyết bằng giải thuật.

Hầu hết bộ dọn rác làm việc bằng cách thu thập bộ nhớ không còn được truy cập. Tuy nhiên, một phần xấp xỉ bộ không gian bộ nhớ vẫn sẽ được thu thập, vì có những biến trỏ đến những không bao giờ truy cập nữa.

### V. Garbage collection
Chính vì việc tìm bộ nhớ không cần sử dụng nữa là việc khó giải quyết, nên các bộ dọn rác chỉ cài đặt giải pháp hạn chế cho những vấn đề thông thường. Phần này sẽ trình bày một số giải thuật chính của garbage collection và hạn chế.

#### Memory reference
Khái niệm chính của giải thuật này là dựa vào tham chiếu.

Trong ngữ cảnh quản lý bộ nhớ, một đối tượng được gọi là tham chiếu đến đối tượng khác nếu nó có truy cấp đến cái sau. Chẳng hạn, một đối tượng có tham chiếu đến prototype của nó và giá trị của thuộc tính.

Trong ngữ cảnh này, ý tưởng về *object* được mở rộng hơn đối tượng JavaScript thông thường, và cũng chứa cả function scope (hay còn gọi là **global lexicel scope**)

>> Lexical Scoping định nghĩa cách tên biến được resolve trong nest function: function con chứa scope của function cha thậm chí function cha đã được gọi.
>> 

#### Reference-counting garbage collection
Đây là giải thuật đơn giản nhất. Một đối tượng được xem là *có thể bị dọn* nếu không có tham chiếu nào trỏ đến nó.

Hãy xem đoạn code dưới đây:

```
var o1 = {
  o2: {
    x: 1
  }
};
// 2 objects are created. 
// 'o2' is referenced by 'o1' object as one of its properties.
// None can be garbage-collected

var o3 = o1; // the 'o3' variable is the second thing that 
            // has a reference to the object pointed by 'o1'. 
                                                       
o1 = 1;      // now, the object that was originally in 'o1' has a         
            // single reference, embodied by the 'o3' variable

var o4 = o3.o2; // reference to 'o2' property of the object.
                // This object has now 2 references: one as
                // a property. 
                // The other as the 'o4' variable

o3 = '374'; // The object that was originally in 'o1' has now zero
            // references to it. 
            // It can be garbage-collected.
            // However, what was its 'o2' property is still
            // referenced by the 'o4' variable, so it cannot be
            // freed.

o4 = null; // what was the 'o2' property of the object originally in
           // 'o1' has zero references to it. 
           // It can be garbage collected.
```

**Vòng lặp đang tạo ra một số vấn đề**
Có một số hạn chế khi nói đến vòng lặp. Ở ví dụ trên, hai đối tượng được tạo và tham chiếu đến một đối tượng khác, tạo ra một vòng lặp. Chúng sẽ ra khỏi scope khi function được gọi, trở thành vô dụng và được giải phóng. Tuy nhiên, giải thuật *reference-counting* cho rằng vì cả hai đối tượng đều đang tham chiếu đến ít nhất một đối tượng khác nên đều không thể bị dọn rác.

```
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 references o2
  o2.p = o1; // o2 references o1. This creates a cycle.
}

f();
```

![](https://images.viblo.asia/91cea388-a793-4904-925c-e4c2c616fc12.png)

#### Mark-and-sweep
Để quyết định đối tượng nào cần, giải thuật này xác định xem đối tượng nào có thể truy xuất.

Giải thuật này gồm 3 bước:
1. Root: về cơ bản root là biến toàn cục được tham chiếu trong code. Ví dụ ở JavaScript, biến toàn cục có thể xem như *root* chính là *window*.
2. Giải thuật inspect tất cả các root và tập con, đánh dấu chúng là *active*. Bất cứ thứ gì mà *root* không thể chạm tới sẽ bị đánh dấu là rác.
3. Sau cùng, bộ dọn rác sẽ giải phóng các phần bộ nhớ không được đánh dấu là *active* và trả về cho hệ điều hành.

![](https://images.viblo.asia/3656e61a-7d2e-426f-92a2-11c0dc838075.gif)

**Vòng lặp không còn là vấn đề**
Ở ví dụ trên, sau khi gọi hàm, hai đối tượng không còn được truy xuất được từ global nên nó sẽ bị xóa đi.

![](https://images.viblo.asia/da51ae48-ca82-4b2c-9838-ac48621b304c.png)

### VI. Memory leak
Memory leak là một phần bộ nhớ không cần dùng nữa nhưng không được giải phóng.

Ngôn ngữ lập trình có nhiều cách để quản lý bộ nhớ. Tuy nhiên, có những phần bộ nhớ không thể xác định bởi giải thuật, nói cách khác chỉ có developer mới có thể biết phần bộ nhớ nào có thể trả về cho hệ điều hành.

#### Bốn kiểu memory leak thông thường trong JavaScript
##### 1. Biến global
JavaScript xử lý những biến không được khai báo theo cách thú vị: khi một biến chưa khai báo được tham chiếu, một biến được tạo trong phạm vi  toàn cục. Ở browser, biến toàn cục là ```window```, tức là:

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

Giả sử ```bar``` chỉ tham chiếu đến một biến trong function *foo*. Một biến toàn cục dư thừa sẽ được tạo, dù bạn không cần dùng ```var``` để khởi tạo nó. Ở trường hợp trên thì nó không gây hại nhiều lắm. Tuy nhiên trong trường hợp sau thì khác:

```
function foo() {
    this.var1 = "potential accidental global";
}
// Foo called on its own, this points to the global object (window)
// rather than being undefined.
foo();
```

##### 2. Timer và callback bị bỏ quên
Hãy lấy ```setInterval``` làm ví dụ vì nó hay được dùng trong JavaScript.

```
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //This will be executed every ~5 seconds.
```

Đoạn code trên chỉ ra kết quả của việc sử dụng timer tham chiếu đến dữ liệu không còn được sử dụng.

Đối tượng ```renderer``` có thể bị thay thế hoặc xóa tại một thời điểm nào đó, khiến đoạn code trên trở nên thừa thãi. Khi sử dụng observer, bạn cần chắc chắn rằng bạn gọi một cách tường minh để xóa chúng mỗi khi bạn không cần dùng nữa. Rất may là trình duyệt hiện đại sẽ làm thay việc này cho bạn: chúng sẽ tự thu thập những observer handler này khi không còn cần thiết nữa.

Dù vậy, tốt hơn hết là nên xóa observer khi nó hết tác dụng, như sau:

```
var element = document.getElementById('launch-button');
var counter = 0;
function onClick(event) {
   counter++;
   element.innerHtml = 'text ' + counter;
}
element.addEventListener('click', onClick);
// Do stuff
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
// Now when element goes out of scope,
// both element and onClick will be collected even in old browsers // that don't handle cycles well.
```

##### 3. Closures
Một khía cạnh chính của JavaScript là closure: hàm con truy cập đến biến cục bộ của hàm cha.

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

Mỗi lần ```replacething``` được gọi, ```theThing``` nhận một đối tượng mới chứa một array và một closure mới (```someMethod```). Bởi vậy, ```originalThing``` được tham chiếu bởi closure giữ bởi biến ```unused```. Điều cần nhớ là mỗi lần scope của closure được tạo trong scope của parent thì nó sẽ được chia sẻ.

Trong trường hợp này, scope được tạo cho closure ```someMethod``` được chia sẻ với ```unused```. ```unused``` có một tham chiếu đến ```originalThing```. Thậm chí dù ```unused``` chưa được dùng, ```someMethod``` có thể được sử dụng thông qua ```theThing``` ngoài scope của ```replaceThing```. Và vì ```someMethod``` chia sẻ closure scope với ```unused```, tham chiếu mà ```unused``` có với ```originalThing``` buộc nó phải ở trạng thái ```active```.

Điều này có thể xem như memory leak, bạn có thể nhận thấy rõ hơn nếu đoạn code này chạy lặp đi lặp lại. Kích thước của nó sẽ không giảm dù cho bộ dọn rác được chạy. Một danh sách liên kết các closure được tạo ra.

##### 4. Out of DOM reference
Có những trường hợp developer lưu DOM node trong cấu trúc dữ liệu. Giả sử bạn muốn update nhanh nội dung của vài dòng trong bảng. Nếu bạn lưu một tham chiếu đến mỗi DOM row trong một array, sẽ luôn có 2 tham chiếu giống nhau đến cùng một phần tử DOM: một là DOM tree, cái khác chính là từ array. Nếu bạn quyết định xóa những dòng này, bạn cần phải nhớ để cả hai tham chiếu đều không thể gọi tới nữa.

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

Một điều cần lưu ý nữa là khi tham chiếu đến node con của DOM tree. Nếu bạn giữ tham chiếu đến một *table cell* trong code và quyết định xóa table khỏi DOM nhưng vẫn giữ tham chiếu đến cell, bạn sẽ gặp phải một tìm huống *memory leak* nghiêm trọng. Có thể bạn nghĩ *garbage collector* sẽ giải phóng mọi thứ ngoại từ *table cell* này. Nhưng không phải, vì cell là một node con của table, mà children lại giữ tham chiếu đến parent của chúng, nên một tham chiếu đến *table cell* có thể giữ toàn bộ table trong bộ nhớ.


Tham khảo: https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec