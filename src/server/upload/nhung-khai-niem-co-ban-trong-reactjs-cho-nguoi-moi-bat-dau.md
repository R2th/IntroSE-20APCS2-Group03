Xin chào tất cả mọi người! Hiện nay đang có khá nhiều FrameWork hỗ trợ cho các lập trình viên trong việc thiết kế Front-end, có thể kể ra tiêu biểu như là ReactJS, VueJS, AngularJS... Mỗi FrameWork thì đều có ưu điểm và nhược điểm riêng của nó, cho nên việc chọn cái nào thì cũng còn tùy thuộc vào từng người. Còn đối với riêng bản thân mình, nhờ có sự lôi kéo của 1 anh cùng công ty cho nên mình đã quyết định là sẽ đi theo con đường ReactJS :)
<br/><br/>
Và sau 1 thời gian "vật lộn" với ReactJS thì mình sẽ quyết định viết bài để giới thiệu với tất cả mọi người về những thứ được gọi là cơ bản nhất của ReactJS. Vì mới tìm hiểu nên trong bài viết còn nhiều sai sót, mong mọi người giúp đỡ và ủng hộ (bow) 
<br/>
## **Mở đầu** <br/>
![](https://images.viblo.asia/4e90ea56-bba7-4824-993d-c524c4d23740.png)

Đầu tiên, giới thiệu qua 1 chút thì React là 1 thư viện JavaScript được tạo ra bởi facebook và instagram, nó hỗ trợ chúng ta trong việc thiết kế giao diện người dùng (UI) giống như là phần View trong mô hình MVC vậy nhưng thực tế thì nó còn hơn như vậy nhiều. Sau đây mình sẽ điểm qua 1 số khái niệm cơ bản trong React.
<br/>
## **JSX** <br/>
>**JSX** là 1 cú pháp mở rộng cho JavaScript, là kết hợp của JavaScript và XML. Nó chuyển đổi cú pháp dạng gần như XML về thành JavaScript, giúp chúng ta có thể code ReactJS bằng cú pháp của XML thay vì phải dùng JavaScript. <br/>
>
<br/>
Thực sự là quá tuyệt phải không nào, giờ đây thay vì phải truy xuất đến một thẻ HTML bất kì thông qua các thuộc tính như id, class, name... thì ta đã có thể thoải mái sử dụng các thẻ HTML trong code JavaScript rồi :love: Tất cả những gì ta cần làm đó là viết 1 đống thẻ html và sau đó ném chúng vào trong 1 biến, 1 function hoặc 1 class chẳng hạn. Ví dụ:<br/>

```js
const element = <h1>Hello, World</h1>;

function getElement() {
    return <div>{element}</div>
}
```

Những function hay class mà có output là các thẻ html thì sẽ được gọi là **Component**. Vậy Component là gì!?
## **Component**<br/>
Như đã nói ở trên thì **Component** là nơi render ra các mã html thuần, 1 điều quan trọng khác đó là nó cho phép ta chia nhỏ đoạn code của UI thành những phần độc lập với nhau, với mục đích để tiện cho việc quản lý và tái sử dụng. Vậy làm cách nào để có thể gọi đến 1 Component!? Câu trả lời là trong React tên của Component sẽ được dùng để làm tên thẻ và cách sử dụng tương tự với các thẻ tag trong html. Ví dụ:
```js
export default class App extends React.Component {
   render() {
      return(
         <h1>Hello, My name is Tran Duc Trung</h1>
      );
   }
}
ReactDOM.render(
   <App /> //hoặc <App></App>
   , document.getElementById('root')
);
```
Trong đoạn code ở trên, ta có sử dụng cú pháp của ES6 để định nghĩa Component bằng cách khai báo 1 Class tên là `App` và class này sẽ được kế thừa từ React.Component. Sau khi kế thừa từ React.Component thì ta có thể sử dụng hàm `render()` mà nó cung cấp để render ra toàn bộ nội dung bên trong. Định nghĩa xong xuôi rồi ta sẽ export class App ra và sử dụng thôi :D Ở đây, thằng `ReactDOM.render` sẽ có nhiệm vụ là tạo ra DOM ảo từ component `<App />` tại element có id bằng root.
<br/><br/>
Cũng khá dễ hiểu đó chứ! Nhưng mà khoan đã, vậy để tái sử dụng 1 component giống như định nghĩa ở trên thì làm như nào bây giờ?? Thật may là thằng Component có cung cấp cho chúng ta 2 khái niệm để làm điều này, đó là **Props** và **State**.
## **Props** <br/> 
**Props** là viết tắt của Properties, ta có thể hiểu nó như là những thuộc tính của 1 Component. Nếu coi Component như là đối tượng trong lập trình OOP thì Props giống như là những miêu tả về tính chất, đặc trưng của 1 đối tượng. Để định nghĩa Props thì ta khai báo chúng ở bên trong dấu {} của Component. Ví dụ: <br/>
```js
function App(props) {
    return(
        <h1>Hello, My name is {props.myName}</h1>
    )
}; 
```
Như vậy là Component App đã có 1 thuộc tính là `myName` và ta sẽ sử dụng nó bằng cách truyền vào Props `myName` 1 giá trị nào đó, có thể là string, array, function, boolean hoặc object. Trong ví dụ này ta sẽ truyền vào 1 string như sau:
```js
...
ReactDOM.render(
    <div>
       <App myName="Tran Duc Trung" />
       <App myName="Test Account" />
    </div>
   , document.getElementById('root')
);
```
Ngoài ra thì Component còn có 1 Pops đặc biệt nữa là `children`, khác với các Props bình thường thường thì `children` được truyền vào bằng cách đặt giữa 2 thẻ đóng và thẻ mở của 1 Component. Ví dụ: 
```js
...
function App(props) {
    return(
        <h1>{props.children}, My name is {props.myName}</h1>
    )
}; 

ReactDOM.render(
   <App myName="Tran Duc Trung">Konnichiwa</App>
   , document.getElementById('root')
);
```
## **State** <br/>
Trong React, **State** được dùng để biểu diễn trạng thái của Component. Tức là giá trị của State ***có thể thay đổi*** được, trái ngược hoàn toàn với Props là 1 giá trị ***bất biến***. Có vẻ như hơi khó hiểu 1 chút! Lấy ví dụ thế này nhé, ta có 1 Component tên là `Tivi` chẳng hạn và trong Component `Tivi` này có định nghĩa 1 số Props như là `height, width, weight` và 1 state là `status` có giá  trị là "Off". Rõ ràng là trong suốt quá trình sử dụng 1 chiếc Tivi thì bạn không thể nào thay đổi được các thuộc tính của nó như là chiều rộng, chiều cao, cân nặng... Nhưng ngược lại, bạn có thể thay đổi trạng thái của chiếc Tivi đó từ Off sang On hoặc từ On sang Off. Và mỗi lần thay đổi trạng thái như vậy màn hình Tivi cũng sẽ hiển thị thay đổi theo.
<br/><br/>
Nói tóm lại là mỗi khi `state` của 1 Component thì nó sẽ tạo ra các sự thay đổi trong cấu trúc của DOM và nhiệm vụ của thằng React là render lại tất cả những sự thay đổi đó. Nói đến đây thì chắc mọi người cũng hiểu được phần nào về Props và State rồi chứ? Nếu vẫn chưa hiểu thì xem tiếp ví dụ dưới đây để hiểu thêm nhé :D <br/>
```js
class Tivi extends Component {  
   constructor(props){  
      super(props)  
      this.state = {  
         status: "Turned on"  //Khởi tạo giá trị của state 
      } 
      this.handleChangeState = this.handleChangeState.bind(this) //Gán ngữ cảnh cho sự kiện handleChangeState
   }  
   handleChangeState(){
      this.setState({
         status: "Turned off" //Tiến hành update trạng thái của state thông qua hàm setState khi người dùng click vào button On/Off
      })
   }
   render(){  
      return(
          <div>
              <h1>Tivi status: {this.state.status}</h1>
              <button onClick={this.handleChangeState}>On/Off</button> //Thêm sự kiện cho button khi người dùng click
          </div>
      ) 
   }  
} 
```
## **Kết luận** <br/>
Trong ReactJS thì có khá nhiều các khái niệm, tuy nhiên để có thể gói hết tất cả lại trong 1 bài viết thì rất khó để mọi người có thể tiếp nhận được từng đó kiến thức cùng 1 lúc. Vậy nên mình sẽ chỉ giới thiệu những thứ gọi là nền móng của ReactJS, bởi vì nếu như nắm chắc được những khái niệm này thì việc học tiếp những khái niệm tiếp theo chắc chắn sẽ trở nên dễ dàng hơn rất nhiều. Cuối cùng xin được cảm ơn tất cả mọi người đã theo dõi bài viết và hy vọng mọi người sẽ ủng hộ mình trong các bài viết sắp tới nhé!