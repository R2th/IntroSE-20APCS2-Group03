Phát triển dựa trên **component** hiện nay là cách rất phổ biến để xây dựng các giao diện người dùng(UI) và các ứng dụng web. Bất kể là bạn đang sử dụng framework hiện đại nào, Angular, Vue hay React, tất cả đều **dựa trên component**. Vì vậy, hiểu cách sử dụng components hiệu quả sẽ giúp bạn trở thành một Web Developer tốt hơn và để xây dựng được một app React, hay đơn giản là mở rộng thêm kiến thức về lập trình web của mình.

Trong phần thứ 2 của series **React JS**, bạn sẽ học được những topic sau đây:
* React component là gì?
* Functional (Stateless) Components
* Class (Stateful) Components
* Tạo và gọi 1 component như thế nào (code example)

Trước khi đọc phần này, nếu bạn chưa đọc qua, tôi recommend bạn đọc phần 1 trước: [](https://viblo.asia/p/react-js-for-beginners-the-basicsphan-1-eW65G76L5DO)

## 1. React Component là gì?
Đầu tiên, mình sẽ định nghĩa về Component trước:

> **1 component là một block code độc lập, có thể tái sử dụng, nó chia UI thành nhiều phần nhỏ. Mặt khác, có thể nghĩ đơn giản các components như một khối các blocks LEGO. Tương tự, cấu trúc LEGO được tạo từ nhiều blocks LEGO nhỏ, như tạo một web page hoặc UI từ nhiều block code(components).**

 Tất nhiên chúng ta không muốn có hàng ngàn dòng code trong cùng một file. Việc maintain code cũng gặp khó khăn khi project càng ngày càng lớn lên.

Việc chia source code thành các components giúp ta rất nhiều. Mỗi component có code JS và CSS riêng, chúng có thể tái sử dụng, dễ đọc, dễ viết, dễ test.

React có 2 loại component: **Funtional (Stateless)** và **Class (Stateful)**.

## 2. Functional (Stateless) Components
**1 functional component là một hàm Javascript (hoặc ES6) trả về 1 phần tử/1 element React.** Theo official docs của React, hàm dưới đây là một component React hợp lệ:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

> **Function này là một component React hợp lệ vì nó nhận một *"props"* (viết tắt của *properties*) làm tham số và trả về 1 React element - reactjs.org**

Vì vậy mình có thể định nghĩa 1 component như 1 **JS Function:**
```
function Example() {
  return ( <h1>I'm a functional component!</h1> );
};
```

hoặc như ES6 arrow function:
```
const Example = () => {
  return ( <h1>I'm a functional component!</h1> );
};
```
Cả hai functions đều là **React component** hợp lệ. Chúng có thể nhận props làm tham số(nếu nó cần), nhưng chúng bắt buộc phải trả về React element.

> **QUAN TRỌNG: Functional components cũng được nói với một cái tên là stateless components** bởi vì chúng ta không thể làm nhiều thứ phức tạp như quản lý React State (data) hoặc phương thức life-cycle trong functional components.
> 
> Tuy nhiên, React giới thiệu React Hooks trong versions 16.8, giờ nó cho phép chúng ta sử dụng state và những features khác trong functional components. Bạn có thể đọc React Hooks tại [đây](https://reactjs.org/docs/hooks-intro.html).

Vậy 1 **React Functional Component là**:
* một function **Javascript / ES6** function
* phải trả về 1 **React element**
* nhận **props** làm tham số nếu cần
-----
## 3. Class (Stateful) Components
**Các Class components là những class ES6.** Chúng phức tạp hơn functional components ở chỗ nó còn có: phương thức khởi tạo, life-cycle, hàm render() và quản lý state (data). 
Ví dụ dưới đây là class component:
![](https://images.viblo.asia/2186747f-9a89-45be-96ec-1573084d5e4f.png)

Bạn có thể thấy, class **ExampleComponent** kế thừa **Component**, vì vậy React hiểu class này là một component, và nó renders (returns) 1 React Element.

Vì vậy, một React class component là:
* là một class ES6, nó sẽ là một component khi nó "kế thừa" React **component**.
* có thể nhận **props** (trong hàm khởi tạo) nếu cần.
* có thể maintain data của nó với **state**
* phải có 1 method **render()** trả về 1 React element (JSX), or null
-----
## 4. Tạo Component

Các bước mình sẽ tạo component:
* Mình sẽ tạo 1 **class** component, như component **cha**.
* Và một **functional** component như component **con**.
* Rồi mình sẽ gọi **con** trong component **cha**.
* Cuối cùng, mình gọi component **cha** trong **file root (app.js)**
> **NOTE:** Nếu bạn chưa cài React app, xem tại [đây](https://github.com/facebook/create-react-app)

Bắt đầu với việc tạo components cha và con. Đầu tiên, chúng ta tạo một file tên là **parentComponent** và file khác cho con **(firstChild)** với phần mở rộng .js hoặc .jsx

![](https://images.viblo.asia/181509e3-2299-4af8-8d80-9bffd3fc7b01.png)

OK, bây giờ trong file **parentComponent**, đầu tiên chúng ta import **React** và **Component** (vậy thì React hiểu class này là 1 component), rồi định nghĩa 1 **class** như dưới:

![](https://images.viblo.asia/023b50be-696b-4374-9e1a-d37a3ad70ded.png)

Vậy **ParentComponent** bây giờ là 1 **class component** và sẵn sàng để sử dụng.

Xong, bây giờ trong file **firstChild**, chúng ta import React rồi định nghĩa một function ES6 như sau:

![](https://images.viblo.asia/938d8c54-5ecd-4956-9d7f-d28dc1f2f6a0.png)

Component này sẽ return element <p>, nhưng để thấy đc thẻ <p> này đc render, nó cần được gọi ở đâu đó.
### Gọi một component như thế nào? 
Một component được gọi như 1 thẻ HTML vậy, nhưng chỉ khác là chúng sẽ bắt đầu bằng chữ hoa, hay được hiểu là theo kiểu PascalCase.
```
<FirstChild />
```
Bây giờ, chúng ta gọi component con ở trong component cha:
    
![](https://images.viblo.asia/b35acc94-e9df-44aa-a883-fe1e725aa393.png)
    
 Cuối cùng, gọi component cha trong **root (App)** function:
    
![](https://images.viblo.asia/b802103d-b227-4c17-80ef-322354b993b6.png)
    
Bây giờ, **root file** renders **parentComponent**, bao gồm tất cả mọi thứ trong đó. Hãy cùng xem kết quả:
    
![](https://images.viblo.asia/61377750-8c28-4fb4-b71c-28af0fc2b060.png)
    
## 5. Kết luận
Component là core của React. Mở rộng kiến thức về khi nào và cách sử dụng functional và class component không chỉ giúp chúng ta làm React app có hiệu năng tốt hơn, dễ đọc, dễ test, mà nó còn makes you a better programmer.
Cảm ơn các bạn đã đọc.
Hẹn gặp lại các bạn trong phần tới.
    
Bài viết này được dịch từ: https://codeburst.io/react-js-understanding-functional-class-components-e65d723e909