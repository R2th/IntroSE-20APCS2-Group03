Chào mọi người, chắc hẳn mọi người nếu đã xem qua series Vue.JS của mình cũng đã nghe tới Component. Trong React, Component cũng chính là một thành phần không thể thiếu trong thư viện Javascript này. Vậy nếu ai chưa từng nghe về component hay chưa từng đọc qua những bài viết về Vue.js của mình thì mình xin phép giải thích qua đôi điều về Component cũng như Component trong React:
- Component là những thành phần cho phép chúng ta chia tách giao diện thành những phần độc lập để có thể tái sử dụng lại được.  
- Component cũng có thể xem như là những function vì việc tách giao diện cũng như việc chia tách chương trình ra thành nhiều phần.
- Có 2 cách sử dụng Component trong ReactJS đấy là Class Component và Functional Component.

Chúng ta cùng đi vào một số kiến thức cơ bản để sử dụng Component trong ReactJS nhé ! 



# 1 . Khai báo Components. 
```
    Mọi thứ phức tạp đều bắt đầu từ những cái cơ bản và đơn giản nhất! 
```
Qua bài đầu tiên trong chuỗi series về ReactJS mình có hướng dẫn mọi người thử chạy Hello world bằng ReactJS. Nếu mọi người chưa đọc có thể quay lại bài viết đầu tiên trong series này của mình để đọc lại nhé (cái này không bắt buộc =))) các bạn vẫn có thể theo dõi tiếp bài viết nếu không muốn quay lại đọc bài kia, và hãy chắc chắn đã có những kiến thức đầu tiên về Render element hay JSX ) . Và chúng ta cùng quay trở lại với file src/App.js: 
```js
import './App.css';

function App() {
  return (
    <div className="App">
         Helloworld 
    </div>
  );
}

export default App;
```

và file index.js 

```js 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Trên đây là một ví dụ cụ thể tạo ra một Component thông qua việc sử dụng functional component. Đơn giản việc tạo ra một functional Component chính là việc tạo ra một function và return về một thành phần giao diện bằng JSX. 

Ngoài ra chúng ta cũng có thể sử dụng Arrow Function trong ES6 để khởi tạo một Functional Component như đoạn code dưới, cả 2 đều hợp lệ : 

```js
const App = () => {
  return (
    <div className="App">
         Helloworld 
    </div>
  );
}
```

### Với Class Component chúng ta khởi tạo như thế nào ? 
Để sử dụng được Class Component chúng ta sẽ cần biết tới về Class trong ES6. Và tạo một Class Component cũng thật đơn giản : 

```js
class App extends React.Component {
  render() {
    return <h1>Hello </h1>;
  }
}
```

Mọi Component đều phải được thừa kế từ React.Component và thay vì việc return bên trong function thì mọi thứ khi này chúng ta sẽ return vào phương thức render() trong class Component. Và việc khai báo phương thức render() là bắt buộc. 

# 2. Sử dụng Components: 
- Chúng ta lại ngược thời gian quay trở lại với bài hôm trước. Ở file ```index.js``` 
 ```js 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
việc sử dụng một Component rất đơn giản : 
- Đầu tiên chúng ta cần phải import Component vào. 
- Tiếp theo chúng ta sử dụng bằng cách khai báo ```<App />``` Component như việc sử dụng thẻ html
### Props

- Lại một lần nữa nếu bạn nào đã đọc series VueJS của mình hay đã biết về VueJS thì khái niệm props chắc chẳng còn xa lạ gì. 
- Props : những dữ liệu của Component được nhận từ bên ngoài sẽ thông qua props.

Chúng ta cần sử dụng props khi sử dụng cùng một Component nhưng với những thông số khác nhau. 

Ví dụ chúng ta có một component in ra chữ Xin chào, nhưng vì muốn tái sử dụng để in ra Xin Chào  Hieu hay Xin chào bạn, sử dụng props: 


**Functional** : 
```js
const Hello = (props) => {
  return (
    <div className="App">
         Hello {props.name}
    </div>
  );
}
```
**Class Component** : 
```js
class Hello extends React.Component {
  render() {
      return (
        <div className="App">
             Hello {this.props.name}
        </div>
      );  
  }
}
```
và khi tái sử dụng chúng ta chỉ cần : 

```js
 <Hello name="Hieu" />
 <Hello name="You" />
```

### State
Trước khi đi vào phần sau, chúng ta còn một phần rất quan trọng đấy là tìm hiểu qua về state là gì : 
- State là một kho lưu trữ dữ liệu hay trạng thái cho Component và chỉ trong phạm vi Component đó. 
- Khi state thay đổi thì component sẽ được render lại. 
- Ví dụ khi chúng ta có một form nhập dữ liệu. Chúng ta có thể lưu những giá trị của form đấy vào state và lấy ra dữ liệu cũ khi cần thiết. Hoặc chẳng hạn như phần loading trong button chúng ta cũng có thể thiết lập và lưu vào State cho nó khi thực hiện tác vụ là loading hay không để hiển thị ra kết quả hoặc vẫn giữ trạng thái đang loading.


Đơn giản vậy đó nhưng khi chúng ta có thể sử dụng được những thứ cơ bản này thì mình tin chắc rằng những cái phức tạp hơn nữa khi xây dựng ứng dụng bằng ReactJS với mọi người sẽ dễ dàng hơn ! 
# 3. Vậy sự khác nhau giữa Class Component và Functional Component là ?

*Sự khác biệt lớn nhất là* : 


**Class Component - Stateful Components:** 

Với Class Component chúng ta có thể sử dụng  được state một cách dễ dàng khi khởi tạo (init) state ngay trong phương thức constructor của Class Component bằng ```this.state```: 
```js
class Hello extends React.Component {
  render() {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
    return (
      <div className="App">
         Hello {this.props.name}
         {this.state.count} //lấy dữ liệu từ state.
      </div>
    );  
  }
}
```

  Để thay đối state chúng ta có cách duy nhất chính là thông qua sử dụng phương thức ```setState()```

**Functional Component - Stateless Components:** 

Trái ngược với Class Component, Functional Component trước đây vốn không thể làm những thứ phức tạp như làm việc quản lí với state. Nhưng với những bản mới nhất của React đã cập nhật thêm  React Hooks để cho phép chúng ta làm việc đó thông qua những function như ```useState()``` . Các ban có thể vào trang chủ của React để đọc chi tiết về chúng. Những bài viết sau trong series này mình sẽ đề cập về hooks hay lifecycles của Component. 


Tóm lại tùy vào nhu cầu sử dụng mà chúng ta có thể linh hoạt lựa chọn sử dụng Class Components hay Functional Components. Theo xu hướng hiện tại trên cá nhân mình thấy việc sử dụng Functional Components rất tiện lợi cho việc bảo trì (maintain) sau này cũng như nhiều developer đang sử dụng Functional Components thay cho Class Components. Một phần nữa theo cá nhân mình thấy việc sử dụng Functional Components cũng dễ đọc hiểu hơn cho những người phát triển dự án sau này. Mọi người có thể tự sử dụng cả 2 cách để đánh giá xem cách nào tối ưu hơn nhé ! 

# 4. Kết bài
Bài viết ngày hôm nay của mình đến đây là tạm kết. Với chút kiến thức của mình, hi vọng sẽ giúp được mọi người sử dụng cơ bản được Component. Và như câu "Mọi thứ phức tạp đều bắt đầu từ những cái cơ bản và đơn giản nhất!" ở phần trên, chúng ta hãy học thuần thục từ những cái cơ bản để chuẩn bị cho việc thành thạo làm việc với một thư viện không thể bỏ qua là ReactJS nhé. Cảm ơn mọi người đã theo dõi. Tạm biệt và hẹn gặp lại trong những bài viết tiếp theo trong series ReactJS của mình nhé !! Many Thanks.