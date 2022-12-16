# Giới thiệu
* Hai cấu trúc dữ liệu được sử dụng nhiều nhất trong JavaScript là **Object** và **Array**.
    * Các đối tượng cho phép chúng ta tạo một thực thể duy nhất lưu trữ các mục **data** theo **key**.
    * Các mảng cho phép chúng ta tập hợp các mục dữ liệu vào một danh sách có thứ tự.
* Mặc dù, khi chúng ta truyền chúng cho một hàm, nó có thể không cần toàn bộ một đối tượng/mảng. Nó có thể cần các giá trị của key nhỏ trong Object hoặc các phần tử lẻ trong Array.
* **Destructuring assignment** là một cú pháp đặc biệt cho phép chúng ta “giải nén” (tách nhỏ) các mảng hoặc đối tượng thành một loạt các biến, đôi khi điều đó thuận tiện hơn.  
* Cấu trúc Destructuring cũng hoạt động tuyệt vời với các function phức tạp khi có rất nhiều tham số, hoặc tham số có giá trị mặc định,... Chúng ta sẽ tìm hiểu điều đó ở phần sau.
# Nội dung
## Array destructuring
* Dưới đây là một ví dụ về cách một mảng bị phân hủy vào các biến:
```
// Mảng ban đầu
let arr = ["John", "Smith"]

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

alert(firstName); // John
alert(surname);  // Smith
```
* Bây giờ chúng ta có thể làm việc với các biến thay vì các phần tử mảng.
* Nó làm việc hiệu quả khi được kết hợp với method "split" hoặc các method trả về mảng khác:
```
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```
### Destructing không làm thay đổi mảng gốc
* Nó được gọi là **destructuring assignment**, bởi vì nó hủy cấu trúc bằng cách sao chép các phần tử của mảng vào các biến. Nhưng bản thân mảng gốc không được sửa đổi.
* Đó chỉ là một cách viết ngắn gọn hơn:
```
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
### Bỏ qua các phần tử sử dụng dấu phẩy
* Các phần tử không mong muốn của mảng cũng có thể bị loại bỏ thông qua một dấu phẩy bổ sung:
```
// second element is not needed
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert(title); // Consul
```
* Trong đoạn mã trên, phần tử thứ hai của mảng bị bỏ qua, phần tử thứ ba được gán cho titlevà phần còn lại của các mục mảng cũng bị bỏ qua (vì không có biến nào gán cho chúng).
### Hoạt động với mọi thứ có thể lặp lại ở phía bên phải
* Trên thực tế, chúng ta có thể sử dụng nó với bất kỳ thứ gì có thể lặp lại, không chỉ mảng:
```
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
* Điều đó hoạt động, bởi vì bên trong một **destructuring assignment** hoạt động bằng cách lặp lại giá trị phù hợp. Đây là loại cú pháp để gọi **for..of** giá trị ở bên phải của dấu **=** và gán các giá trị cho các biến tương ứng ở bên trái.
### Chỉ định cho bất kỳ thứ gì ở phía bên trái
* Chúng tôi có thể sử dụng bất kỳ thứ gì có thể gán được ở phía bên trái. Ví dụ gán thuộc tính đối tượng:
```
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```
### Looping với  .entries()
* Phương thức **Object.entries (obj)** nhận vào đối tượng obj để trả về các mảng **[key, value]**.
* Chúng ta có thể sử dụng nó với cấu trúc hủy để lặp qua các khóa và giá trị của một đối tượng:
```
let user = {
  name: "John",
  age: 30
};

// loop qua các mảng [key, value]
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}
```
* Hoạt động với method Map tương tự như vậy:
```
let user = new Map();
user.set("name", "John");
user.set("age", "30");

// Map tự động lặp các cặp [key, value] dưới dạng mảng
for (let [key, value] of user) {
  alert(`${key}:${value}`); // name:John, then age:30
}
```
### Hoán đổi biến
* Có một thủ thuật rất hay để hoán đổi giá trị của hai biến bằng cách sử dụng phép gán cấu trúc:
```
let guest = "Jane";
let admin = "Pete";

// Hoán đổi giá trị guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```
* Ở đây chúng tôi tạo một mảng tạm thời gồm hai biến và ngay lập tức gán cấu trúc theo thứ tự được hoán đổi.
### Spread Operator (...)
* Thông thường, nếu mảng dài hơn danh sách biến ở bên trái, các mục "bổ sung" sẽ bị bỏ qua.
* Ví dụ: Ở đây chỉ có hai mục được lấy và phần còn lại bị bỏ qua:
```
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Các thành phần khác không được gán ở bất kì đâu
```
* Nếu chúng tôi cũng muốn lấy tất cả những thành phần đằng sau - chúng tôi có thể thêm một tham số nữa để lấy "phần còn lại" bằng cách sử dụng ba dấu chấm "...":
```
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// rest là mảng các items bắt đầu từ phần tử thứ 3
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```
* Giá trị của **rest** là mảng các phần tử còn lại của mảng. Chúng ta có thể sử dụng bất kỳ tên biến nào khác thay thế cho **rest**, chỉ cần đảm bảo rằng nó có spread operator trước nó và đi cuối cùng trong phép destructing assignment.
```
let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// titles = ["Consul", "of the Roman Republic"]
```
### Giá trị mặc định
* Nếu mảng ngắn hơn danh sách các biến ở bên trái, sẽ không có lỗi. Giá trị vắng mặt được coi là không xác định:
```
let [firstName, surname] = [];

alert(firstName); // undefined
alert(surname); // undefined
```
* Nếu chúng tôi muốn một giá trị "mặc định" để thay thế giá trị bị thiếu, chúng tôi có thể cung cấp giá trị đó bằng cách sử dụng =:
```
// giá trị mặc định
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
```
* Giá trị mặc định có thể là các biểu thức phức tạp hơn hoặc thậm chí là các lệnh gọi hàm. Chúng chỉ được đánh giá nếu giá trị không được cung cấp. Ví dụ, ở đây chúng ta sử dụng hàm **prompt** cho hai giá trị mặc định:
```
// Chỉ chạy prompt cho biến bị thiếu giá trị là surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
```
## Object destructuring
* Destructing assignment cũng hoạt động với các đối tượng. Cú pháp cơ bản:
```
let {var1, var2} = {var1:…, var2:…}
```
* Chúng ta nên có một đối tượng hiện có ở phía bên phải, mà chúng ta muốn chia thành các biến. Phía bên trái chứa một “mẫu” giống đối tượng cho các thuộc tính tương ứng. Trong trường hợp đơn giản nhất, đó là danh sách các tên biến trong {...}. Ví dụ:
```
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```
* Thuộc tính options.title, options.width và options.height được gán cho các biến tương ứng. Thứ tự không quan trọng. Ví dụ sau cũng hoạt động:
```
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```
* Mẫu bên trái có thể phức tạp hơn và chỉ định ánh xạ giữa các thuộc tính và biến.
* Nếu chúng ta muốn gán một thuộc tính cho một biến có tên khác, ví dụ options.width thành w, chúng ta có thể đặt tên biến bằng dấu hai chấm:
```
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```
* Đối với các thuộc tính có khả năng bị thiếu, chúng ta có thể đặt các giá trị mặc định bằng cách sử dụng "=", như sau:
```
let options = {
  title: "Menu"
};

let {width = 100, height = 200, title} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```
* Cũng giống như với mảng hoặc tham số hàm, giá trị mặc định có thể là bất kỳ biểu thức nào hoặc thậm chí là lời gọi hàm. Chúng sẽ được đánh giá nếu giá trị không được cung cấp. Trong đoạn mã dưới đây **prompt** được gọi cho **width**, nhưng không được gọi cho **title**:
```
let options = {
  title: "Menu"
};

let {width = prompt("width?"), title = prompt("title?")} = options;

alert(title);  // Menu
alert(width);  // (kết qủa của hàm prompt)
```
* Chúng ta cũng có thể kết hợp cả dấu hai chấm và dấu bằng:
```
let options = {
  title: "Menu"
};

let {width: w = 100, height: h = 200, title} = options;

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```
* Nếu chúng ta có một đối tượng phức tạp với nhiều thuộc tính, chúng ta chỉ nên trích xuất những gì chúng ta cần:
```
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// Chỉ trích xuất title
let {title} = options;

alert(title); // Menu
```
### Spread Operator (...)
* Chúng ta có thể sử dụng mẫu còn lại khi đối tượng có nhiều thuộc tính hơn các biến được gán, giống như chúng ta đã làm với mảng. Nó không được hỗ trợ bởi một số trình duyệt cũ, nhưng hoạt động trong các trình duyệt hiện đại. Ví dụ:
```
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

let {title, ...rest} = options;

alert(rest.height);  // 200
alert(rest.width);   // 100
```
### Xảy ra lỗi nếu không có let
* Trong các ví dụ trên các biến đã được tuyên bố ngay trong công việc: let {…} = {…}. Tất nhiên, chúng tôi cũng có thể sử dụng các biến hiện có mà không cần let. Điều này sẽ không hoạt động:
```
let title, width, height;

// Xảy ra lỗi
{title, width, height} = {title: "Menu", width: 200, height: 100};
```
* Vấn đề là JavaScript xử lý {...} trong luồng mã chính (không phải bên trong một biểu thức khác) như một khối mã. Vì vậy, ở đây JavaScript giả định rằng chúng ta có một khối mã, đó là lý do tại sao có lỗi. Thay vào đó, chúng ta có thể đặt biểu thức trong dấu ngoặc đơn (...):
```
let title, width, height;

// Hoạt động tốt
({title, width, height} = {title: "Menu", width: 200, height: 100});

alert( title ); // Menu
```
### Nested destructuring
* Nếu một đối tượng hoặc một mảng chứa các đối tượng và mảng lồng nhau khác, chúng ta có thể sử dụng các mẫu bên trái phức tạp hơn để trích xuất các phần sâu hơn.
* Trong đoạn mã dưới đây options có một đối tượng khác trong thuộc tính size và một mảng trong thuộc tính items. Mẫu ở bên trái của bài tập có cùng cấu trúc để trích xuất các giá trị từ chúng:
```
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destructuring assignment lồng nhau
let {
  size: { // options[:size]
    width,
    height
  },
  items: [item1, item2], // options[:items]
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```
* Tất cả các thuộc tính của đối tượng options ngoại trừ thuộc tính extra vắng mặt ở phần bên trái, được gán cho các biến tương ứng:
![](https://images.viblo.asia/201f5f76-1b9d-4d05-b388-f5bb9ea6ceee.png)
* Chúng ta có được giá trị của width, height, item1, item2, và title nhận giá trị mặc định.
### Các thông số thông minh cho function
* Đôi khi một hàm có nhiều tham số, hầu hết trong số đó là tùy chọn. Điều đó đặc biệt đúng đối với giao diện người dùng. Hãy tưởng tượng một chức năng tạo menu. Nó có thể có chiều rộng, chiều cao, tiêu đề, danh sách mục,...
* Đây là một cách viết hàm không hề tốt:
```
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```
* Trong thực tế, vấn đề là làm thế nào để nhớ thứ tự của các tham số. Thông thường các IDE cố gắng giúp chúng ta, đặc biệt nếu mã được ghi rõ, nhưng vẫn còn… Một vấn đề khác là làm thế nào để gọi một hàm khi hầu hết các tham số đều có giá trị mặc định. Ví dụ:
```
// không xác định được giá trị mặc định nào là ổn đối với biến nào
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```
* Thật may, chúng ta có thể truyền các tham số dưới dạng một đối tượng và hàm destructing assignment ngay lập tức phân hủy chúng thành các biến:
```
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – lấy từ options
  // width, height – sử dụng giá trị mặc định
  alert(`${title} ${width} ${height}`); // My Menu 200 100
  alert(items); // Item1, Item2
}

showMenu(options);
```
* Chúng ta cũng có thể sử dụng cấu trúc hủy phức tạp hơn với các đối tượng lồng nhau và ánh xạ với dấu hai chấm:
```
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
  alert(`${title} ${w} ${h}`); // My Menu 100 200
  alert(item1); // Item1
  alert(item2); // Item2
}

showMenu(options);
```
* Xin lưu ý rằng destructing assignment như vậy giả định rằng showMenu() có một đối số. Nếu chúng ta muốn tất cả các giá trị theo mặc định, thì chúng ta nên chỉ định một đối tượng trống:
```
showMenu({}); // hoạt động Oke

showMenu(); // Lỗi do không có đối tượng truyền vào
```
* Chúng ta có thể khắc phục điều này bằng cách đặt {} mặc định cho toàn bộ đối tượng của các tham số:
```
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```
* Trong đoạn mã trên, toàn bộ đối số là {} theo mặc định, vì vậy luôn có thứ gì đó để hủy.
# Tổng kết
* **Destructing Assignment** cho phép ánh xạ ngay lập tức một đối tượng hoặc mảng lên nhiều biến.
* Cú pháp đầy đủ với Object Destructing:
```
let {prop : varName = default, ...rest} = object
```
* Điều này có nghĩa là thuộc tính prop phải đi vào biến varName và, nếu không có thuộc tính nào như vậy tồn tại, thì giá trị default sẽ được sử dụng. Các thuộc tính đối tượng không có ánh xạ được sao chép vào đối tượng rest.
* Cú pháp đầy đủ với Array Destructing:
```
let [item1 = default, item2, ...rest] = array
```
* Phần tử đầu tiên đi đến item1; phần thứ hai đi vào item2, tất cả phần còn lại tạo thành mảng rest.
* Có thể trích xuất dữ liệu từ các mảng / đối tượng lồng nhau, miễn là bên trái phải cùng cấu trúc với vế bên phải.
* Destructing Assignment được sử dụng rộng rãi đặc biệt trong React.
* Nguồn tham khảo: [https://javascript.info/destructuring-assignment#array-destructuring](https://javascript.info/destructuring-assignment#array-destructuring)