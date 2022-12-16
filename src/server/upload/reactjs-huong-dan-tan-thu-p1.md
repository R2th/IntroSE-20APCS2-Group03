## 1. Giới thiệu về React

### 1.1. React là gì?

Nó là một thư viện JavaScript được thiết kế để tạo các single-page applications với các thành phần giao diện người dùng (UI) có thể tái sử dụng (Reusable).

### 1.2. React hoạt động như thế nào??

React lưu trữ thông tin của [DOM](https://css-tricks.com/dom/)(Document Object Model – Mô hình đối tượng tài liệu) bằng cách tạo một DOM ảo (virtual DOM) trong bộ nhớ của nó. Trước khi render các DOM trên trình duyệt, nó sẽ kiểm tra các thay đổi giữa DOM ảo trong quá khứ và hiện tại. Nếu có thay đổi, nó sẽ cập nhật DOM ảo và sau đó hiển thị thành DOM thực trên trình duyệt. Xem sơ đồ bên dưới để hình dung.

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615531024524/zrbfugQl8.png?auto=compress)

Vì các thao tác DOM có thể mất rất nhiều thời gian để load, React chỉ thay đổi các DOM node cần thay đổi.

## 2. Giới thiệu về JSX

Một khái niệm rất quan trọng để học trong React là JSX. Nó là viết tắt của JavaScript XML. Nói một cách đơn giản, nó cho phép bạn viết React Code bằng HTML .

Ví dụ: Hãy xem 2 block code sau ([source](https://www.w3schools.com/react/react_jsx.asp)):

```js
//Using JSX
const myelement = <h1>I Love JSX!</h1>;
ReactDOM.render(myelement, document.getElementById("root"));
```

```js
//Not using JSX
const myelement = React.createElement("h1", {}, "I do not use JSX!");
ReactDOM.render(myelement, document.getElementById("root"));
```

Như bạn có thể thấy, việc sử dụng JSX cho phép chúng ta viết các phần tử HTML trong React dễ dàng hơn và nhanh hơn.

## 3. ReactDOM.render()

Lưu ý rằng có một hàm: `ReactDOM.render()` ở cuối các block code ở trên. `ReactDOM.render()` là một hàm nhận 2 đối số: HTML code và HTML element (phần tử HTML).

Trong React, node trên cùng được gọi là nốt (node) DOM gốc “root” , mọi thứ bên trong nó sẽ được quản lý bởi `ReactDOM`. Các ứng dụng đã xây dựng với React thường có duy nhất một nốt (node) DOM “gốc” (root).

## 4. Components

Components là một khái niệm của React App. Về cơ bản chúng là các hàm React trả về React elements từ đó hiển thị ra cho UI (giao diện người dùng).
Components giúp phân chia các UI thành các phân nhỏ để dễ dàng quản lý và tái sử dụng.

Trong React, tất cả các component này được cấu trúc như các node trong Virtual DOM. Sau đó, chúng sẽ hiển thị trên trình duyệt theo cách chúng ta chỉ định . Xem sơ đồ để hình dung.

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615532625711/30PDbb_Qy.png?auto=compress)

Có 2 loại component hiện tại trong React: Class Components và Functional Components.

### 4.1. Class Components

Đúng như tên gọi của nó, **_Class Components_** về cơ bản là các lớp (class) được viết trong ngữ cảnh của React.
Cách khai báo này khá quen thuộc với những ai đã làm quen với lập trình hướng đối tượng (OOP)

Một quy tắc trong cách đặt tên các component là PascalCase (viết hoa tất cả các chữ cái đầu).

Hãy viết một Class Component "Ngôi nhà" với các bước như sau:

1. Import `react` và `react-dom`
2. Viết class House
3. Gọi `ReactDOM.render()`

```js
//1.
import React from "react";
import ReactDOM from "react-dom";
//2.
class House extends React.Component {
  render() {
    return (
      <div>
        <h2>This is a house</h2>
      </div>
    );
  }
}
//3.
ReactDOM.render(<House />, document.getElementById("root"));
```

Tiếp theo, hãy tạo một lớp "Cửa" và biến nó thành một thành phần con của "Ngôi nhà" (vì cửa nằm trong nhà mà 😁😁😁).

Đầu tiên, chúng ta tạo lớp "Cửa".

```js
class Door extends React.Component {
  render() {
    return (
      <div>
        <h3>This is a door</h3>
      </div>
    );
  }
}
```

Sau đó, chúng ta thêm nó vào bên trong lớp "Ngôi nhà" để biến "Cửa" thành con của "Ngôi nhà".

```js
class House extends React.Component {
  render() {
    return (
      <div>
        <h2>This is a house</h2>
        <Door /> <!--here is the Door component-->
      </div>
    )
  }
}
```

Hình ảnh bên dưới cho thấy ứng dụng được hiển thị như thế nào trong trình duyệt. Tôi đã thêm các outline cho từng component để hiển thị chúng rõ ràng hơn.

Bạn có thể thấy 2 component được hiển thị trên trình duyệt, với "Cửa" là component viền ngoài màu đỏ được hiển thị bên trong "Ngôi nhà" - component viền ngoài màu xanh lam.

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615533228165/21FKl9fr7.png?auto=compress)

### 4.2. Function Components (Stateless Component)

Loại component khác mà chúng ta có thể viết trong React là các **_Function Component_**. Cũng giống như các **_Class Component_**, chúng trả về React element và tên của chúng tuân thủ PascalCase.

Hãy xây dựng cùng một class "Ngôi nhà" và "Cửa" như Class Components.

```js
import React from "react";
import ReactDOM from "react-dom";

function House() {
  return (
    <div>
    <h2>This is a house</h2>
    <Door/> <!--add Door as child-->
  </div>
  );
}

function Door() {
  return (
    <div>
    <h3>This is a door</h3>
  </div>
  );
}

ReactDOM.render(<House />, document.getElementById("root"));
```

Lưu ý rằng đối với các function component, bạn không cần phải có hàm `render()` trước câu lệnh return.

Ban đầu function component được sử dụng để viết các component chỉ với mục đích kết xuất HTML. Với các component với theo hướng tiếp cận này thì bạn sẽ không can thiệp được vào lifecycle của component. Do đó nó thường được biết đến với tên gọi khác là **_Stateless Component_**.

## 5. Props

`props` là một từ viết ngắn gọn của "properties" - thuộc tính. Về cơ bản props là một đối tượng được truyền vào trong một component.

`props` cho phép chúng ta giao tiếp giữa các components với nhau bằng cách truyền tham số qua lại giữa các components.

Trở lại "Ngôi nhà" và "Cửa", giả sử chúng ta có nhiều "Cửa" bên trong "Ngôi nhà". Để làm điều đó, tôi sẽ gán cho mỗi "Cửa" một thuộc tính tiêu đề - `title` như sau:

```js
<Door title="front" />
```

Sau đó, trong component "Cửa", chúng ta có thể in ra `props` của nó như sau.

```js
//pass props as argument first
function Door(props) {
  return (
    <div>
      <h3>This is the {props.title} door</h3>
    </div>
  );
}
```

Kết quả:

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615534532745/Rzn5HqRAw.png?auto=compress)

Bây giờ chúng ta có thể thêm rất nhiều thành phần "Cửa" bên trong "Ngôi nhà" và có tiêu đề để phân biệt chúng.

```js
function House() {
  return (
    <div>
      <h2>This is a house</h2>
      <Door title="front" />
      <Door title="back" />
      <Door title="kitchen" />
      <Door title="bedroom" />
    </div>
  );
}
```

Kết quả sẽ như sau:

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615534626548/0HS_MaAxX.png?auto=compress)

Giống như các đối số đối với một hàm, các prop đối với component chỉ ở chế độ chỉ đọc. Một component không thể thay đổi giá trị của các prop được truyền vào.

## 6. States

Trong React, `state` là một đối tượng để chứa dữ liệu hoặc thông tin về component. `state` có thể được thay đổi bất cứ khi nào mong muốn. Khác với props bạn có thể truyền props sang các components khác nhau thì state chỉ tồn tại trong phạm vi của components chứa nó (trừ khi bạn sử dụng một số công cụ quản lý state như Redux), mỗi khi state thay đổi thì components đó sẽ được render lại.

Hãy thêm một số state vào "Ngôi nhà".

```js
class House extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "white",
      rooms: 4,
    };
  }
  render() {
    return (
      <div>
        <h2>
          This is a {this.state.color} house with {this.state.rooms} rooms.
        </h2>
      </div>
    );
  }
}
```

Trong đoạn code trên, chúng ta đã thêm đối tượng state trong hàm khởi tạo của lớp "Ngôi nhà". Sau đó trả về một phần tử HTML chứa thông tin về màu-`color` và số phòng-`rooms` của "Ngôi nhà".

Kết quả sẽ là:

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615535374961/NI0Hwxlxg.png?auto=compress)

## 7. React Hooks cơ bản

Trong ví dụ trước, chúng ta đã tìm hiểu cách sử dụng các state trong **_Class Component_** "Ngôi nhà". Trong các **_Function Component_**, chúng ta có thể sử dụng React Hooks để quản lý các state.

### 7.1. useState()

Hook này cho phép các function component khởi tạo và cập nhật `state`.Ví dụ:

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";

function House() {
  const [color, setColor] = useState("white");
  return (
    <div>
      <h2>This is a {color} house</h2>
    </div>
  );
}
```

Chúng ta có `state` với giá trị khởi tạo ban đầu (initialStateValue) của `state` là "white". Hook trả về một mảng: giá trị của state (ở đây chính là `color`) và hàm `set` của nó, hàm này được sử dụng để cập nhật trạng thái (ở đây là `setColor`).

Kết quả hiển thị của `state`:

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615604248933/qN7hSPZyB.png?auto=compress)

Để xem giải thích chi tiết hơn về `useState`, vui lòng đọc [bài viết này](https://reactjs.org/docs/hooks-state.html).

### 7.2. useEffect()

Hook hữu ích tiếp theo mà bạn sẽ gặp là `useEffect`. Nó thực hiện một logic bất cứ khi nào một `state` đã được thay đổi.

Quay lại component "Ngôi nhà", chúng ta thêm một biến khác có tên là cửa - `door` để theo dõi ngôi nhà này có bao nhiêu cửa. Trong `useState` Hook, khởi tạo nó thành 0.

Sau đó, chúng ta thêm một button với sự kiện khi `onClick`, sẽ tăng giá trị của `door` lên 1.

Cuối cùng, chúng ta có một `useEffect` sẽ in số lượng cửa trong nhà mỗi khi giá trị của cửa được cập nhật.

Code sẽ như sau:

```js
function House() {
  const [color, setColor] = useState("white");
  const [door, setDoor] = useState(0); //initialize door as 0

  //add 1 to the current value of door on every button click
  const addDoor = () => {
    setDoor(door + 1);
  };

  //finally, trigger the function to print the door value whenever door is updated
  useEffect(() => {
    console.log(`Door count: ${door}`);
  }, [door]);

  return (
    <div>
      <h2>This is a {color} house</h2>
      <button onClick={addDoor}>Add a Door</button>
    </div>
  );
}
```

Kết quả:

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615605282210/AFeGDsAck.gif?auto=format,compress&gif-q=60)

Để xem giải thích chi tiết hơn về `useEffect`, vui lòng đọc [bài viết này](https://reactjs.org/docs/hooks-effect.html).

## 8. Create React App

Sau khi đã tìm hiểu các khái niệm cơ bản về React, chúng ta hãy tìm hiểu về cách để tạo ra một dự án React.

Trước tiên, hãy đảm bảo rằng bạn đã cài đặt npm và Node.js trong máy của mình. Nếu không, hãy download [tại đây](https://nodejs.org/en/download/)

Cách đơn giản nhất để tạo một React App là cài đặt `create-react-app` như sau:

```cmd
npm install -g create-react-app
```

Sau đó, tạo React App bằng lệnh này:

```cmd
npx create-react-app my-react-app
```

Điều hướng đến thư mục ứng dụng.

```cmd
cd my-react-app
```

Và chạy lệnh sau để khởi chạy ứng dụng trong localhost:

```cmd
npm start
```

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615605607893/DzIVZf9Zk.png?auto=compress)

### 8.1. Cấu trúc thư mục React App

Một React App mới sẽ có cấu trúc thư mục sau.

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615605753589/77OWcPSWC.png?auto=compress)

Chúng ta hãy lướt qua từng cái một.

1. `package.json`: hiển thị các dependencies và các scripts được sử dụng trong ứng dụng.
2. `package-lock.json`: để đảm bảo các dependencies đã được cài đặt.
3. `.gitignore`: liệt kê những file git sẽ không bao gồm trong commit.
4. `Readme`: markdown file để mô tả ứng dụng.
5. `node_modules`: nơi cài đặt tất cả các dependencies.
6. `public folder`: chúng ta không thường xuyên thao tác với thư mục này nên tạm thời tôi sẽ bỏ qua.
7. Thư mục `src`: nơi chứa source code.
8. `src / index.js`: chỉ định phần tử 'root'
9. `src / App.js`: App component, chỉnh sửa file này để xem component được hiển thị trên trình duyệt như thế nào.
10. `src / App.css`: Style cho App.js.

Nếu bạn là người mới bắt đầu, hãy cố gắng tập trung vào tệp `src / App.js` trước. Chỉnh sửa code HTML của nó, thêm một số chức năng cơ bản và xem nó hoạt động như thế nào. Khi bạn đã quen thuộc hơn, bạn có thể thêm nhiều file dưới dạng component vào thư mục `src`, như `Home.js` cho Home component, Login.js cho Login component, v.v.

### 8.2. Styling

Sau khi tạo một số function và component cơ bản trong React App, bạn sẽ tự hỏi làm thế nào customize và style cho ứng dụng cho nhu cầu của riêng mình. Trong React, có một số cách để thêm các custom style. Các cách phổ biến nhất là inline styling và import các module css.

#### 8.2.1 Inline styling

Như cái tên của nó, thêm style bên trong phần tử HTML. Ví dụ, hãy thêm một border như là một hàng rào cho "Ngôi nhà". Màu border phụ thuộc vào biến `color`.

```js
function House() {
  const [color, setColor] = useState("red");
  return (
    <div>
      <h2 style={{ border: `1px solid ${color}` }}>This is a {color} house</h2>
    </div>
  );
}
```

Vì giá trị của `color` được khởi tạo là màu đỏ, ứng dụng sẽ hiển thị như sau:

![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615609969528/nRL7-_Dsh.png?auto=compress)

Ngoài ra, bạn có thể tạo một đối tượng `style` và truyền nó vào thuộc tính style như sau:

```js
function House() {
  const [color, setColor] = useState("red");

  //style obj contains the css
  const style = {
    border: `1px solid ${color}`,
  };

  return (
    <div>
      <h2 style={style}>This is a {color} house</h2>
    </div>
  );
}
```

#### 8.2.2. CSS modules

Một cách khác để tạo style là tạo file `.css` và import file đó vào React Component. Ví dụ tạo file `style.css` như sau::

```css
h2 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  padding: 10px 5px;
  border-radius: 10px;
}
```

Sau đó, trong component "Ngôi nhà", hãy import file như bên dưới:

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css"; //import here

//keep everything else the same
function House() {
  const [color, setColor] = useState("red");

  const style = {
    border: `1px solid ${color}`,
  };

  return (
    <div>
      <h2 style={style}>This is a {color} house</h2>
    </div>
  );
}
```

Ứng dụng của chúng ta sẽ hiển thị như sau:
![Alt](https://cdn.hashnode.com/res/hashnode/image/upload/v1615610452233/QNJnggjzy.png?auto=compress)

## 9. Tổng kết

Trên đây là một Cheat Sheet nhỏ dành cho người mới bắt đầu với React (như tôi chẳng hạn 😆). Vì đây chỉ là bài viết ngắn gọn nên nó sẽ không đề cập đến mức độ chi tiết từng khía cạnh của React, nhưng hy vọng nó là một phần giới thiệu hay ho để bất kỳ ai cũng có thể bắt đầu hành trình React một cách dễ dàng hơn.

Cảm ơn bạn đã đọc và nếu thấy hữu ích, hãy bookmark hoặc share bài viết này để nhiều người được tiếp cận hơn. Love all <3

### Link tham khảo

https://lo-victoria.com/react-cheat-sheet-for-beginners

https://reactjs.org/docs/hooks-intro.html