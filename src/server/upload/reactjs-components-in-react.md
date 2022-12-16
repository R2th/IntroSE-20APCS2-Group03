Tiếp theo bài mở đầu cho seri học react -- [xây dựng app Hello world](https://viblo.asia/p/xay-dung-ung-dung-dau-tien-voi-reactjs-hello-world-GrLZD8M3Zk0), thì trong bài viết này, chúng tôi sẽ đề cập đến 1 khái niệm cực kì quan trọng trong ReactJS, đó chính là Component. Thứ làm cho ReactJs trở nên tuyệt vời.

Đối với các coder thì khái niệm về component thực sự không còn xa lạ, đối với 1 người mới bắt đầu thì nôn na component nghĩa là 1 thành phần. Nghĩ đơn giản vậy thôi, chúng ta có 1 ví dụ :
![](https://images.viblo.asia/9eb58a7d-3a3e-44d0-9f34-a1cbe8ccbeaf.png)

Ở trên là hình ảnh mô phỏng 1 trang web sau khi chúng ta đã hoàn thành. Dưới khái niệm component, chúng ta sẽ chia trang web trên thành nhiều các thành phần nhỏ lẽ, mỗi thành phần đó được gọi chung là 1 component.

![](https://images.viblo.asia/90e63225-96dc-48d4-9cb3-b361fb71faea.png)

Mỗi 1 ô trong dấu nét đứt đấy là một component, chúng ta có 1 component cha chứa tất cả đám con của nó, cái này lồng vào cái kia để tạo thành 1 website hoàn chỉnh. Nhìu vào có vẻ khó nhưng đừng sợ, chúng ta sẽ thử làm từng thứ 1.
# Quick Review of Functions
Để bắt đầu, chúng ta cùng nhìn nhanh lại cái được gọi là functions( hàm) trong js. Trong js và code các ngôn ngữ khác nói chung, khái niệm hàm là khái niệm cực kì đơn giản, chúng giúp chúng ta viết code clear hơn, gom các thứ trông giống nhau lại và tiện cho việc sử dụng cũng như ... đủ mọi thứ khác. Nếu không có functions, code của chúng ta sẽ trông thật kinh tởm, lặp đi lặp lại rất nhiều:
```js
var speed = 10;
var time = 5;
alert(speed * time);
  
var speed1 = 85;
var time1 = 1.5;
alert(speed1 * time1);
  
var speed2 = 12;
var time2 = 9;
alert(speed2 * time2);
  
var speed3 = 42;
var time3 = 21;
alert(speed3 * time3);
```
Với Functions, bạn có thể đơn giản viết ngắn gọn chúng lại như sau :
```
function getDistance(speed, time) {
    var result = speed * time;
    alert(result);
}
```

Và sau đó chúng ta chỉ đơn giản gọi đến `getDistance` là được:
```js
getDistance(10, 5);
getDistance(85, 1.5);
getDistance(12, 9);
getDistance(42, 21);
```

Nhìn đẹp và ngắn gọn hơn lúc trước. Hơn thể nữa, chúng ta có thể xây dựng nhiều functions, và gọi nó lồng vào nhau, giả sử ở đây chúng ta cần hiển thị ra khoản cách kèm theo "km", đơn giản chúng ta sẽ viết thêm 1 hàm để định dạng lại kết quả trả về :
```js
function formatDistance(distance) {
  return distance + " km";
}

function getDistance(speed, time) {
  var result = speed * time;
  alert(formatDistance(result));
}
```

Các bạn đã thắc mắc vì sao chúng ta lại đề cập tới functions ở đây. Đơn giản bởi vì trong reactjs chúng ta cũng có thể hiểu mỗi một component cũng giống như 1 function. Chúng ta có thể viết ra, custom nó, kế thừa nó , và sử dụng đi lại nhìu lần trong dự án.

# Bắt đầu với component
Chúng ta cùng nhớ lại đoạn code trong phần mở đầu của seri này [xây dựng app Hello world](https://viblo.asia/p/xay-dung-ung-dung-dau-tien-voi-reactjs-hello-world-GrLZD8M3Zk0), 
```js
var destination = document.querySelector("#container");

ReactDOM.render(
  <h1>I'm Iron Man</h1>,
  destination
);	
```
Trong đoạn code trên, chúng ta chỉ hiển thị ra 1 cái tên đơn giản, nếu chúng ta muốn hiển thị nhiều hơn 1 thì sẽ thế nào, thông thường, chúng ta sẽ thêm vài thẻ `h1` rồi gõ thêm vài cái tên :

```html
 <script type="text/babel">
    var destination = document.querySelector("#container");

    ReactDOM.render(
      <div>
        <h1>I'm Iron Man</h1>
        <h1>Thor</h1>
        <h1>Captain</h1>
        <h1>Hulk</h1>
        <h1>ABCD</h1>
        <h1>XXX</h1>
      </div>,
      destination
    );
  </script>
```
Ở đây, chúng ta phải thêm 1 thẻ `div` để bọc các thẻ `h1` chứa các cái tên lại, đảm bảo rằng chúng ta sẽ truyền vào đúng 2 tham số cho `render`. Điều này cũng ổn thôi, nhưng nếu chúng ta không muốn dùng `h1` nữa mà thay vào đó chúng ta muốn đổi chúng sang `h2`. Không có gì sai nếu chúng ta gõ tay và sửa lại hết toàn bộ về `h2` :
![](https://images.viblo.asia/77bc5131-b039-420a-b683-64cff5094f78.png)

Việc này đương nhiên vẫn ổn đối với ví dụ này, nhưng thực tế thì không, vì lượng code của chúng ta sẽ khá lớn và sẽ không đảm bảo nếu chúng ta đi thay đổi thủ công như thế này. Chưa kể đến sau này, mỗi cái `h1` sẽ trở thành 1 `div` và bọc trong nó vô vàng các element phức tạp khác.

Đây là lí do tại sao chúng ta  sử dụng component.

# Tạo 1 Component trong React
Giải pháp cho bài toán đặt ra ở trên là Component. Các React Component là các đoạn code JavaScript có thể tái sử dụng để tạo ra các phần tử HTML thông qua JSX. Chúng ta sẽ đi tới vài ví dụ để thấy React Component mạnh mẽ thế nào.

Hãy cùng bắt đầu cùng nhau với 1 trang React chưa có gì nhé :

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>React Components</title>
  <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
</head>

<body>
  <div id="container"></div>
  <script type="text/babel">

  </script>
</body>

</html>
```

## Tạo Component Hello, World!
Đơn giản như bài viết trước, chúng ta lại gọi `render` để đưa html element ra ngoài. Và vẫn câu nói quen thuộc Hello, World!.

```js
ReactDOM.render(
  <div>
    <p>Hello, world!</p>
  </div>,
  document.querySelector("#container")
);	
```

Chúng ta sẽ bắt đầu lại với việc tạo ra 1 component, đặt nó trên đầu đoạn code của bạn :
```js
class HelloWorld extends React.Component {
    //something here
}

ReactDOM.render(
  <div>
    <p>Hello, world!</p>
  </div>,
  document.querySelector("#container")
);		
```

Ở trên chúng ta đã tạo ra 1 class HelloWorls và kế thừa React.Component. đây sẽ là Component đầu tiên trong sự nghiệp code React của chúng ta :v: 
```js
class HelloWorld extends React.Component {
    render() {
        
    }
}
```

Lại là `render`, cũng giống như ReactDOM.render, method này được React.Component cung cấp và là thành phần bắt buộc của 1 component. Nó giúp chúng ta làm việc được với JSX. 
```js
class HelloWorld extends React.Component {
    render() {
       return <p>Hello, componentized world!</p>;
    }
}
```
Chúng ta cùng viết thêm 1 tý vào trong method `render` này. Ở đây chúng ta dùng `return` để trả về 1 đoạn text " Hello, componentized world!",  Đây là 1 Component đơn giản nhất, và việc sử dụng nó, chúng ta lại nhờ đến bạn già ReactDOM.render
```js
ReactDOM.render(
  <HelloWorld/>,
  document.querySelector("#container")
);
```

Nhìn cách chúng ta gọi lại Component HelloWorld, trông đơn giản giống như gọi 1 thẻ HTML được custom vậy. `<HelloWorld/>` Và chúc mừng, chúng ta đã tạo và sử dụng thành công 1 React Component.

![](https://images.viblo.asia/b55f2be6-6279-44d4-8f1b-90d336626324.png)

Thay vì phải viết thẻ `h1` nhiều lần và khó thay đổi như ví dụ ở đầu bài viết, chúng ta có thể nhốt chúng vào 1 component và gọi đi gọi lại nhiều lần 
```html
<body>
  <div id="container"></div>
  <script type="text/babel">
    class HelloWorld extends React.Component {
      render() {
        return <p>Hello, world!</p>;
      }
    }

    ReactDOM.render(
      <div>
        <HelloWorld/>
        <HelloWorld/>
        <HelloWorld/>
        <HelloWorld/>
        <HelloWorld/>
        <HelloWorld/>
        <HelloWorld/>
      </div>,
      document.querySelector("#container")
    );
  </script>
</body>
```
Đơn giản, dễ chỉnh sửa và thay đổi đổi với nội dung lớn.
![](https://images.viblo.asia/c9cabc57-79d6-4867-a130-c20b33e86c24.png)

Trên đây, chúng ta mới chỉ tiếp cận đến React Component ở mức căn bản. Tiếp theo chúng ta hãy cùng nhau xem, React Component thực sự có những gì nhé.
## Thêm các định nghĩa trong Component
Ở trên mỗi lần gọi đến `<HelloWorld/>`, chúng ta chỉ đơn thuần gọi ra 1 đoạn text, vậy nếu muốn thêm vài giá trị cho nó thì sao. Ở đây chúng ta sẽ ví dụ đến 1 giá trị gọi là greetTarget (hoặc tên gì đó bạn nghĩ ra).
Chúng ta sẽ truyền giá trị đó vào React Component như sau 
```js
class HelloWorld extends React.Component {
    render() {
       return <p>Hello, {this.props.greetTarget}!</p>;
    }
}
```

Ở đây chúng ta thấy có this.props, đây là 1 thuộc tính đặc trưng của React Component, đại loại nó giống như nơi tiếp nhận các tham số truyền vào khi chúng ta gọi tới 1 component vậy. Trong JSX, để parse 1 value ra ngoài chúng ta dùng cặp dấu ` { và }`. Nếu không đặt trong cặp dấu {} thứ bạn sẽ thấy chỉ đơn giản là đoạn text "this.props.greetTarget".

## Thay đổi cách gọi Component
Ở trên chúng ta tạo ra một định nghĩa là greetTarget. Các bạn chưa hiểu nó ở đâu ra thì đây, chúng ta sẽ gọi nó mỗi khi gọi 1 component :
```js
ReactDOM.render(
  <div>
    <HelloWorld greetTarget="Batman"/>
    <HelloWorld greetTarget="Iron Man"/>
    <HelloWorld greetTarget="Nicolas Cage"/>
    <HelloWorld greetTarget="Mega Man"/>
    <HelloWorld greetTarget="Bono"/>
    <HelloWorld greetTarget="Catwoman"/>
  </div>,
  document.querySelector("#container")
);
```
Trông quen thuộc không, nó như 1 thẻ attributes của html vậy. Tự định nghĩa tên và truyền vào tham số.

![](https://images.viblo.asia/4b724ddb-409c-47af-bae2-726afef531e1.png)

Các cái tên chúng ta truyền vào trong thuộc tính greetTarget đã được truyền thẳng xuống Component thông qua thuộc tính this.props. Còn riêng về props này thì chúng ta cứ hiểu nôm na nó là 1 kho lưu trữ các biến giá trị của component thôi :v ( không đúng thì còm men chứ đừng ném đá nhé ae)

## Component con
Các component trong JSX tương tự như các thẻ HTML, chính vì thế mà chúng ta có thể xây dựng thành phần con của 1 component. Để rõ hơn, chúng ta sẽ tạo ra thêm 1 component chứa 1 button.
```js
class Buttonify extends React.Component {
  render() {
    return(
      <div>
        <button type={this.props.behavior}>{this.props.children}</button>
      </div>
    );
  }
}
```
Dĩ nhiên bạn có thể gọi thẳng nó thông qua `ReactDOM.render`
```js
ReactDOM.render(
  <div>
    <Buttonify behavior="submit">SEND DATA</Buttonify>
  </div>,
  document.querySelector("#container")
);    
```

và chúng ta sẽ có được 1 button như hình :
![](https://images.viblo.asia/e7cb398a-a742-41ad-9b74-5a879647703d.png)

Thuộc tính type của button nằm trong component sẽ được nhận giá trị trực tiếp từ `this.props.behavior` thông qua lúc chúng ta gọi đến Component `<Buttonify behavior="submit">`. Và giá trị `children` được nhận trực tiếp qua `SEND DATA`
# Tổng kết
Bài viết này chỉ cho các bạn cái nhìn sơ qua về React Component. 1 thành phần quan trọng khi xây dựng 1 React App, dĩ nhiên các bạn có thể  không dùng đến nó, thế nhưng nó cũng giống như các bạn viết code tràn lan mà ko sài tới Function vậy.
Phần tiếp theo, chúng ta sẽ cùng nhau tìm hiểu về Styling in React. Đưa css vào React App.
Cảm ơn các bạn đã đọc!


*https://www.kirupa.com/react/components.htm*