### Rendering Elements
> Elements are the smallest building blocks of React apps.
> 

Elements được định nghĩa là đối tượng nhỏ nhất trong một ứng dụng React, và nó là gì
 - React element không phải là DOM element
 - React element nó là một **plain objects**
 - Một React element sẽ mô tả những gì sẽ mà bạn muốn hiển thị trên page

Như đã nói ở trên thì React element không phải là một DOM element và nó sẽ được React DOM mapping với brower DOM element.

### Rendering an Element into the DOM
Các ứng dụng được xậy dựng bằng React thì mặc định sẽ có một node gọi là "root" và toàn bộ mọi thứ được chứa trong thẻ "root" thì đều được quản lý bởi React DOM

> We call this a “root” DOM node because everything inside it will be managed by React DOM.
> 

Về cơ bản thì đây sẽ là node ngoài cùng của React, và với ReactJS thì thường sẽ là 1 thẻ `div`

```ReactJS
<div id="root"></div>
```

Note:
  - Giữa các node "root" thì sẽ được cô lập và độc lập với nhau
  - Các ứng dụng có thể define nhiều node root và các "root" được xác định bằng cách truyền **id** vào function **ReactDOM.render()**

```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

[Try it on CodePen](https://reactjs.org/redirect-to-codepen/rendering-elements/render-an-element)

### Updating the Rendered Element
 - Một React element là các đối tượng bất biến (immutable), nói một cách khác thì một khi các element được sinh ra thì ko thể bị thay đổi

> An react element is like a single frame in a movie: it represents the UI at a certain point in time.

Một cách ví von từ phía FB thì mỗi element thì mỗi element như là một khung hình trong một bộ phim vậy nó sẽ không bao giờ bị thay đổi.

Vậy React làm cách nào để update UI. Đơn giản React sẽ tạo ra một element MỚI, đưa nó vào function ReactDOM.render() và toàn bộ giao diện sẽ được render lại. 

### React Only Updates What’s Necessary

Như lúc nãy mình có nói thì để update UI trên page thì React sẽ tạo ra element mới và đưa nó vào ReactDOM.render() để render lại page Nghe thì có vẻ như không được perfomance lắm nhưng trên thực tế trước khi xử lý việc render lại UI thì React có một bước đó là kiểm tra lại toàn bộ các node trong page và chỉ update lại các node có sự thay đổi.

> React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

[Try it on CodePen](https://codepen.io/pen?&editable=true&editors=0010)

![Ví dụ từ phía trang chủ React](https://images.viblo.asia/585f5f8e-0c46-4496-becb-8409621866bf.gif)

### React Render Lifecycle 

Ở các thông tin phía trên thì đã mô tả về cách thức render ra html của React và câu hỏi tiếp theo là quy trình sẽ diễn ra như thế nào.
React sẽ thực hiện Render khi có sự thay đổi về **state** hoặc **prop** tương ứng nhưu vậy thì sẽ có 2 thời điểm mà React sẽ thực hiện việc render

 - Mounting: thời điểm Component được khởi tạo
 - Updating: thời điểm Component được update state hoặc prop

![](https://images.viblo.asia/c904d01b-b340-46ad-af24-099fb8fde672.jpeg)

> In our experience, thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.