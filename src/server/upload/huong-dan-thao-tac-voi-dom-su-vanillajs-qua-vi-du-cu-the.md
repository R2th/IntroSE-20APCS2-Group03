Trong bài viết này, mình sẽ giới thiệu cho các bạn cách thao tác với DOM bằng VanillaJS thông qua một ví dụ cụ thể. Vậy thì VanillaJS là gì? Nghe có vẻ nhưng là một thư viên, hay là một framework mới của Javascript. Hoàn toàn không phải, VanillaJS là một cái tên để chỉ việc sử dụng Javascript mà không cần bất cứ thư viên hỗ trợ nào, như Jquery,.. Mọi người sử dụng cái tên này giống như một sự đùa cợt để nhắc nhở những developer khác rằng ngày nay có nhiều thứ có thể được thực hiện mà không cần để sử dụng các thư viện của Javascript. Hay nói các khác VanillaJS chính là javascript thuần.

**DOM là gì?**

Khi một trang web được load, browser tạo ra Document Object Model (DOM). DOM được xây dựng dưới dạng cây, các node của cây là các thẻ HTML. Ở trong DOM mỗi thẻ HTML được coi là một Objects, các attribute của thẻ HTML là thuộc tính của Objects. DOM còn cung cấp các methods để truy cập tới các thẻ HTML, và events cho các thẻ HTML.


**Vậy tại sao nên học VanillaJS ?**

Javascript càng ngày càng trở lên phổ biến, có rất nhiều library, framework ra đời. Để có thể dễ dàng nắm bắt được những library, framework mới, kiến thức cốt lõi về javascript là điều cần thiết. Trong những lúc phát triển sản phẩm, sẽ có đôi lúc cần sử dụng đến VanillaJS để xử lí một số trường hợp đặc biết mà library hoặc framework không thể xử lí được. Tất nhiên đây là trường hợp hiếm khi xảy ra, vì các library, framework ngày nay rất hịn hò rồi.

Có một trang web rất phổ biến hiện này, mà developer nào cũng biết đó là github.com. Hiện nay đội ngũ phát triển của github đã loại bỏ hoàn toàn jQuery khỏi trang web của họ và thay vào đó là chỉ sử dụng javascript thuần.

![](https://images.viblo.asia/afb38745-2a7e-4070-8bdd-30e7385d7564.png)

**Ví dụ thực tế**

Mình sẽ hướng dẫn mọi người làm một app đơn giản, chức năng của app sẽ bao gồm thêm task, tìm kiếm task, và xóa task. App này sẽ chỉ sử dụng HTML, CSS, Javascript, sẽ không sử dụng bất cứ thư viện hỗ trợ nào của Javascript. Thông qua ví dụ này, hy vọng mọi người sẽ nắm được cách sử dụng javascript thao tác với DOM, cách sử dụng Local Storage.

**Chuẩn bị**

Link source code: https://github.com/l3duc/TaskList. Mọi người clone về và chạy thử xem app hoạt động như nào nhé.

![](https://images.viblo.asia/b4378fad-a4da-4bd9-9ec2-9f45b9430b1c.gif)

Ok. Bắt tay vào làm thôi (go)

**Chức năng thêm task**

Đầu tiên, khai báo các biến UI

```js
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
```

Có một số method phổ biến được dùng để chọn thẻ HTML trong DOM mà chúng ta muốn thao tác tới chúng.

* document.getElementById(elementID): Trả về thẻ HTML có `id` tương ứng.
* document.querySelector(CSS selectors): Trả về thẻ HTML đầu tiên ứng với CSS selectors.
* document.getElementsByClassName(classname): Trả về một HTMLCollection object, trong đó là những thẻ HTML có class tương ứng.
* document.getElementByTagName(tagname): Trả về một HTMLCollection object, trong đó là những thẻ HTML có tên thẻ tương ứng.
* document.getQuerySelectorAll(CSS selectors): Trả về một `NodeList` object, trong đó là những thẻ HTML tương ứng với CSS selectors.

> An HTMLCollection object is an array-like list of HTML elements.
> 
> A NodeList object is a list (collection) of nodes extracted from a document.

Tiếp theo khởi tạo một function, phụ trách việc load toàn bộ chức năng của app. Mình đặt tên là `loadEventListeners`.

```js
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('submit', addTask);
}
```

Ở đoạn code trên, khi người dùng submit một form, function `addTask` sẽ được gọi, cụ thể ở đây mình có một form để người dùng thêm task. Có một số `event` phổ biến khác phổ biến như `keyup`, `keydown`,  `dbclick`,.. Các bạn có thể đọc thêm ở đây: https://www.w3schools.com/jsref/dom_obj_event.asp

Sau đó, xây dựng function `addTask`:
```js
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}
```

Funcntion `addTask` nhận tham số truyền vào là `e`, đây là một biến tham chiếu tới `event object`.  `Event object` hỗ trợ nhiều `method` xử lí sự kiện trong DOM. `e.preventDefault()` hủy một sự kiện, đồng nghĩa với việc những `action` ở trong sự kiện đó sẽ không xảy ra. Cụ thể, khi người dùng submit form, `e.preventDefault` sẽ ngăn chặn gửi form lên Server.

Để có thể lấy dữ liệu người dùng nhập vào ô input, sử dụng thuộc tính `.value`. Cũng có thể dùng `.value` để set giá trị cho ô input.

Tiếp theo tạo một thẻ `li`, bằng `document.createElement('li')`, sau đó thêm class `collection-item` vào trong thẻ `li` bằng `li.className = 'collection-item'`. Tiếp theo tạo một `text node` bằng `document.createTextNode(taskInput.value)`, cụ thể ở đây mình tạo một `text node` có giá trị là input người dùng nhập vào. Sau đó thêm text node đó vào thẻ `<li>` bằng `li.appendChild(document.createTextNode(taskInput.value))`.

Tiếp theo tạo một thẻ `<a>` bằng `document.createElement('a)`. Thêm class vào thẻ `<a>`, `link.className = 'delete-item secondary-content'`, thêm icon vào trong thẻ `<a>`, `link.innerHTML = '<i class="fa fa-remove"></i>'`

Thêm thẻ `<a>` vào trong thẻ `<li>` bằng method `.appendChild()`, `li.appendChild(link)`.

Thêm thẻ `<li>` vào thẻ `<ul>`, `taskList.appendChild(li)`.  Khi người dùng thêm một task thành công, sẽ xóa input người dùng vừa nhập vào ô input, bằng cách set value của ô input là một chuỗi rỗng. `taskInput.value = ''`.

Mình vừa xây dựng xong function `addTask`

**Kết luận**

Ở trong bài tiếp theo, mình sẽ hướng dẫn mọi người xây dựng những chức năng còn lại của app. Hy vọng sẽ giúp mọi người biết cách thao tác với DOM bằng cách chỉ sử dụng VanillaJS.

**Happy coding**