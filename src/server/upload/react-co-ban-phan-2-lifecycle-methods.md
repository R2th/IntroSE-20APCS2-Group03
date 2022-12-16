# Mở đầu
Xin chào các bạn, trong [phần 1 react cơ bản](https://viblo.asia/p/react-co-ban-phan-1-quat-dien-WAyK8MxpZxX), mình đã giới thiệu cho mọi người những khái niệm cơ bản nhất của react, bằng ví dụ sinh động và thực tế để mọi người dễ hiểu hơn. Phần một các bạn đã học và hiểu cách sử dụng của hai khái niệm rất quan trọng trong react đó là `State` và `Prop`, trong phần này mình xin giới thiệu đến các bạn những khái niệm cực kỳ quan trọng trong react vì nếu không nắm vững và hiểu bản chất của chúng các bạn có thể gặp rất nhiều khó khăn trong quá trình làm việc với react. Đó là `lifecycle methods` hay có nhiều tài liệu còn gọi là vòng đời của component.

Thực tế để hiểu về `lifecycle methods` và nó là gì trong react thì các bạn chỉ cần tự hỏi rằng, từ lúc một ứng dụng react được load cho đến khi nó load xong và hiển thị được lên cho người dùng thì đã có những điều gì xảy ra, và điều gì xảy ra trước, điều gì xảy ra sau? Trả lời được những câu hỏi này đã phần nào giúp bạn giải quyết được rất nhiều những khó khăn gặp phải trong quá trình xây dựng một ứng dụng react.

Như bạn đã biết component sẽ được render lại khi có sự thay đổi prop hoặc `state`. Việc component được render lần đầu tiên kể từ khi load trang gọi là trạng thái `Mounting`. Sau đó khi prop hoặc state thay đổi, component sẽ được render lại, và kể từ lần render thứ 2 trở đi thì component đang ở trạng thái `Updating`, và khi chúng ta không cần đến component đó nữa và remove nó ra khỏi DOM thì lúc đó gọi là trang thái `Unmounting`. 

Ở mỗi trạng thái, sẽ có những methods tương ứng được sử dụng, và thứ tự gọi các methods này sẽ được mình giới thiệu ngay dưới đây.

# Mounting
**componentWillMount** – Đây là method sẽ được gọi đầu tiên, trước khi component được render. Và những lần render sau thì method này sẽ không được gọi nữa. Vì chưa có DOM ở thời điểm này nên bạn không thể thao tác gì với DOM hay các thành phần HTML được, mà bạn chỉ có setup một số giá trị default cho component. Method này ít khi được sử dụng.

**Render** - Tiếp theo component sẽ được `render` và hiển thị lên cho người dùng. Sau khi render xong thì một phương thức rất quan trọng sẽ được gọi đó là **componentDidMount**.

**componentDidMount** -  là phương thức được gọi ngay sau khi component được render. Ở đây bạn có thể gọi Ajax hoặc các hành động lấy dữ liệu từ service api, add event listeners … Tại đây bạn cũng có thể gọi function `setState()`.
# Updating
Sau khi component được **render** lần thứ 2 trở đi thì các method sau đây sẽ lần lượt được gọi

**componentWillReceiveProps (nextProp)** – Được gọi trước khi `render`, và phải nhận vào tham số `nextProp`. Tại đây bạn có thể sử dụng prop hiện tại bằng` this.prop` lại vừa có thể sử dụng prop mới là `nextProp`. Mục đích của method này là để check sự thay đổi của prop để kích hoạt những hành động tiếp theo.

**shouldComponentUpdate(nextProp, nextState)** -  là method được gọi ngay sau khi **componentWillReceiveProps**, và vẫn trước khi `re-render` . Được truyền vào hai tham số `nextProp` và `nextState`, method này sẽ return `true` hoặc `false`. Để chắc chắn với bạn rằng component có nên re-render hay không, và default là `true`. Đặc biệt là ở method này bạn không thể sử dụng `setState()`.

**componentWillUpdate**-  Được gọi ngay sau khi **shouldComponentUpdate** hỏi bạn có chắc chắn muốn re-render không, nó hoạt động cũng giống như **componentWillReceiveProps** tuy nhiên trong này bạn không thể thay đổi state được bằng` setState()`.

**render**  - Render lại component bắt đầu được thực hiện

**componentDidUpdate(prevProp, prevState)** – Được gọi sau khi render xong, nhận vào 2 tham số `prevProp` và `prevState`. Ở đây bạn cũng có thể thực hiện thiết lập lại DOM, `setState`.

# Unmount
**componentWillUnmount** – method này sẽ được gọi nếu component của bạn bị `remove` ra khỏi DOM, tại đây bạn sẽ clear tất cả những thứ liên quan đến component này trước khi remove nó. Và vì bị remove nên chúng ta cũng khổng thể dùng `setState` tại đây được. Chỉ đơn giản vậy thôi.

Vậy là chúng ta đã điểm qua được các methods và cách chúng hoạt động trong react. Dưới đây là ví dụ các bạn có thể tự chạy và mở console lên xem kết quả
```
class Hello extends React.Component {
  
  state = {
     count: 2,
     name: ', This is State'
  };
    
  componentWillMount() {
    console.log('1- component will mount');
  }
  
  componentDidMount() {
    console.log('3 - component did mount \r\n waiting 2s ...');
  }
  
  componentWillReceiveProps(nextProp) {
    this.setState({ count: 7, name: ', This is new State'});
    console.log('4- component will receive prop: ' + nextProp.name);
  }
  
  shouldComponentUpdate(nextProp, nextState) {
    if(this.state.name !== nextState.name) {
      console.log('5- should component update: ' + nextProp.name + ' ' + nextState.name);
      return true;
    } else {
      return false;
    }
    
  }
  
  componentWillUpdate(nextProp, nextState) {
    console.log('6- component will update: ' + nextProp.name + ' ' + nextState.name);
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('8- OK component did update: ' + prevProps.name + ' ' + prevState.name);
  }
  
  componentWillUnmount() {
    console.log('9- component has removed');
  }
  
  render() {
    console.log(this.state.count + '- render DOM');
    return <div>{this.props.name}</div>;
  }
}

// Render lần đầu tiên
ReactDOM.render(
  <Hello name="Hello World" />,
  document.getElementById('container')
);


// Sau 2s render lại lần 2. thay đổi prop.name
setTimeout(function(){
  ReactDOM.render(
    <Hello name="My name is Phuc"/>,
    document.getElementById('container')
  );
}, 2000);


// Sau 4s không render component nữa, tức là đã remove component
setTimeout(function(){
  ReactDOM.render(
    <h1>Goodbye component</h1>,
    document.getElementById('container')
  );
}, 4000);
```

Còn đây là kết quả sau khi run code trên, thứ tự các method được gọi các bạn có thể thấy dưới đây.
![](https://images.viblo.asia/ca2de69c-2e72-4203-9df2-a2d26f9dc6e2.PNG)
# Kết luận
Nội dung bài viết phần nào giúp các bạn hiểu được luồng xử lý của các method, cái nào gọi trước cái nào gọi sau, và phần nào giúp bạn hiểu đôi chút về mục đích và cách sử dụng của từng method. Tuy nhiên có thể nhiều phần chưa thực sự rõ ràng và dễ hiểu, vậy nên chỉ có cách tự tiếp tục tìm hiểu và trải nghiệm để thấy ý nghĩa thực sự của chúng. Cảm ơn các bạn đã theo dõi!
# Tài liệu tham khảo
https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1

https://reactjs.org/docs/state-and-lifecycle.html