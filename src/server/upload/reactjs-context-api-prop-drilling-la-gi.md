Xin chào mọi nguời, ngày hôm nay mình lại tiếp tục với loạt bài React.js. Ngày hôm nay mình xin giới thiệu một công cụ rất hữu dụng của React.JS là Context. Với React để giải quyết một vấn đề chúng ta có thể sử dụng nhiều công cụ khác nhau. Đấy là điều rất tuyệt vời của React, đơn cử với việc quản lý state, chúng ta có thể sử dụng nhiều công cụ khác nhau để quản lý như Redux  và với Redux chúng ta lại có nhiều loại khác nhau để sử dụng như Redux Toolkit, Redux Thunk, Redux Sagas... À mà thôi mình lại quay lại với chủ đề bài viết đấy là sử dụng Context để quản lý state cho những ứng dụng ít phức tạp. Vậy Context là gì, chúng ta sử dụng nó như thế nào trong dự án React.js. Chúng ta cùng vào bài nhé. 

# 1. Tại sao lại sử dụng Context API?
Khi phát triển một ứng dụng React.js chúng ta khó có thể tránh khỏi việc ứng dụng ngày càng trở nên phình to. Chính vì vậy chúng ta cần xây dựng ứng dụng một cách rõ ràng làm sao để có thể dễ dàng bảo trì nhất. Một trong những cách giúp xây dựng ứng dụng dễ dàng bảo trì hơn và nhìn code thuận mắt hơn đấy chính là chia nhỏ Components. Và khi chia nhỏ Components đôi lúc chúng ta cần lấy dữ liệu từ Components cha xuống những Components con hay ngược lại. 

Context API cũng được ra đời từ việc phát sinh ra vấn đề nhức nhối đó (Redux cũng thế tuy nhiên với những ứng dụng ít phức tạp, mình sẽ tập trung vào Context API nhé ). Quả thật không thể phủ nhận tầm nhìn của các developer đã tạo ra những công cụ hữu ích cho chúng ta sử dụng này. Và trong tài liệu chính thức của React.js chúng ta cũng đã có sẵn một ví dụ khá trực quan: Đoạn code dưới đây được minh hoạ khi chúng ta không sử dụng Context, việc truyền dữ liệu sẽ như thế này:  

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}

```

Như mọi người thấy , đoạn code trên có nhiệm vụ truyền dữ liệu mà ở đây là giao diện (tượng trưng bởi theme) và mục đich cuối cùng là truyền dữ liệu ```"dark"``` tới ThemedButton. Như vậy chúng ta có các bước truyền dữ liệu thông qua props tuần tự :


App -> Toolbar-> ThemedButton


Ví dụ trên đây mới chỉ 3 level Components chúng ta có thể dễ dàng hình dung được. Nhưng khi đã mở rộng ứng dụng, điều không tránh khỏi là lên gấp bội các Components lồng nhau. Và một khái niệm ra đời đấy chính là 
### Prop-drilling

Oke nghe tới Drilling mọi người cũng hình dung nó là gì rồi nhỉ. Drilling có nghĩa là khoan, và việc chúng ta truyền các prop tới các Components lồng nhau như vậy được mọi người gọi với thuật ngữ **Prop-Drilling** . Nhưng không chỉ thế,  **Prop - drilling** còn ám chỉ việc chúng ta truyền props thông qua các Components tuy nhiên có những Components trung gian lại không cần tới dữ liệu từ những ***prop*** đó. Và việc dư thừa dữ liệu không cần thiết như vậy và việc truyền Component lồng nhau như vậy như đã nói ở trên thực sự khá khó bảo trì, hoặc đơn giản chúng ta muốn di chuyển Component liên quan tới chỗ khác. Thật cồng kềnh.

Và mọi thứ đã được giải quyết bởi Context API (tất nhiên so với Redux thì với những ứng dụng lớn, phúc tạp thì theo mình vẫn nên dùng Redux).

Đoạn code với Context API (ví dụ mẫu trong tài liệu)
```jsx
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

Đoạn code trên đã có sử dụng thêm Context API và với việc sử dụng Context  APIchúng ta có thể thấy chúng ta không cần truyền dữ liệu qua props thông qua Component trung gian là Toolbar mà chúng ta có thể tạo ra một đối tượng Context với ```React.createContext()``` và bọc nó vào tầng cao nhất của Component. Như vậy chúng ta có thể sử dụng được ở mọi Component con không kể nó đi sâu tới Component con thứ n+1 nào, chúng ta đều có thể nhận được dữ liệu.

# 2. Sử dụng Context API

### React. createContext

Đây là phuơng thức giúp tạo một đối tượng Context.

```context/DemoContext.jsx
import { createContext } from "react";

export const DemoContext = createContext({
  count: 1,
});
```
### Context.Provider

Mỗi một đối tựong Context, chúng ta có thể sử dụng Provider để subcribe đối tượng đấy bằng cách truyền dữ liệu vào Provider và bao bọc nó cho tất cả các Components cần sử dụng dữ liệu chung này.

```App.jsx
import { useState } from "react";
import logo from './logo.svg';
import './App.css';
import DemoClass from './components/DemoClass';
import  { DemoContext } from './context/DemoContext'

function App() {
  return (
    <DemoContext.Provider value={{ count }} >
      <div className="App">
        <header className="App-header">
          <DemoClass />
        </header>
      </div>
    </DemoContext.Provider>
    
  );
}

export default App;

```

### Class.contextType

Với cách dùng Class Component kế thừa từ React.Component. Chúng ta cần gán thuộc tính này với một đối tượng Context để nhận được dữ liệu từ context thông qua ```this.context```
```components/DemoClass.jsx
import React, { createContext } from "react";
import  { DemoContext } from '../context/DemoContext'
import Content from './Content'

class DemoClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    console.log('componentDidMount', value)
  }
  componentDidUpdate() {
    let value = this.context;
    console.log('componentDidUpdate', value)
  }
  componentWillUnmount() {
    let value = this.context;
    console.log('componentWillUnmount', value)
  }
  render() {
    return <>
      <span> This is content from context </span>
      <Content />
     </>
  }
}

DemoClass.contextType = DemoContext;

export default DemoClass;
```

Kết quả: 

![image.png](https://images.viblo.asia/9230c156-4ab4-4860-935e-f0a9faea65c3.png)

Chúng ta đã nhận được defaultValue từ Context: {count: 1}

Ngoài ra chúng ta cũng có thể dùng với thuộc tính static contextType để nhận Context.
  ```jsx
  class DemoClass extends React.Component {
  static contextType = DemoContext;
      render() {
        let value = this.context;
        /* render something based on the value */
      }
}
  ```
### Context.Consumer

Một Component con có thể subcribes sự thay đổi của Context (thay đổi state chung) bằng cách sử dụng Consumer ở trong Context. Tức là chúng ta nhận ra trị này bằng cách bọc Context.Consumer ở ngoài.
OK chắc tới đây sẽ có nhiều bạn hỏi vậy taị sao chúng ta có ***Class.contextType*** ở trên mà chúng ta lại còn cần tới Context.Consumer. Thực ra contexType chỉ được giới thiệu từ phiên bản v16.6.0 của React và là cách để nhận context bên ngoài phuơng thức render() của Class. Và sử khác biệt lớn nhất cũng chính là contexType giúp chúng ta nhận được Context từ bên ngoài phuơng thức render().
Để sử dụng Context.Consumer: 

```components/Content.jsx
import React from "react";
import  { DemoContext } from '../context/DemoContext'

class Content extends React.Component {
  componentDidMount() {
    let value = this.context;
    console.log('componentDidMount', value)
  }
  componentDidUpdate() {
    let value = this.context;
    console.log('componentDidUpdate', value)

    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    console.log('componentWillUnmount', value)
    /* ... */
  }
  render() {
    return <>
      <DemoContext.Consumer>
        {
          (value) => (
            <span>
              {value.count}
            </span>
          )
        }
      </DemoContext.Consumer>
     </>
  }
}

Content.contextType = DemoContext;

export default Content;
```

### Dynamic Context

Dynamic Context: Đơn giản là việc khi chúng ta muốn thay đổi dữ liệu hay state chung của Context  . Giống như việc thực hiện dispatchAction trong Redux. Với context chúng ta có thể khai báo và thực hiện thay đổi context như sau:

**B1 :
Thêm 2 action mặc định cho đối tượng context**.
```context.DemoContext.jsx
import { createContext } from "react";

export const DemoContext = createContext({
  count: 1,
  increase: () => {},
  decrease: () => {}
});
```


**B2 : Khai báo state từ Component cha bao gồm state + action **.

```App.js
...
function App() {
  const [count, setCount] = useState(0)

  const increase = () => {
     let newCount = count + 1;
     setCount(newCount)
  }
  const decrease = () => {
    let newCount = count - 1;
    setCount(newCount)
 }

  return (
    <DemoContext.Provider value={{ count, increase, decrease }} >
      ...
    </DemoContext.Provider>
    
  );
}
...
```

**B3: Thêm 2 nút thực hiện 2 action ```increase``` và ```decrease```: 

```components\DemoClass.js
...
  render() {
    return <>
      <span> This is content from context </span>
      <button onClick={this.context.increase} > Increase </button>
      <button onClick={this.context.decrease} > Decrease </button>

      <Content />
     </>
  }
...
```

Kết quả: 

![](https://images.viblo.asia/224a110a-e31f-4914-8ab5-1e70f43a966a.gif)



# 3. Làm sao nhận context trong functional component?

Với functional component chúng ta có một hook để sử dụng context đấy là useContext(). Với useContext() chúng ta có thể nhận state global ngay trong Function Component như dưới đây:
```jsx
import React, { useContext } from "react";
import  { DemoContext } from '../context/DemoContext'
import Content from './Content'

export default DemoFunction = () => {
  const context = useContext(DemoContext)

  return <>
      <span> This is content from context </span>
      <button onClick={context.increase}> Increase </button>
      <button onClick={context.decrease}> Decrease </button>
      <Content />
     </>
}
```
Các bạn thử chạy và xem kết quả có như dùng với Class Component không nhé ! 

# 4. Kết bài

Bài viết ngày hôm nay của mình khá là nhiều lý thuyết. Trong bài mình cũng đã nêu rõ các khái niệm khá chi tiết với Context và cách dùng ở Functional Component và Class Component. Cảm ơn mọi người đã đọc đến tận đây, hi vọng bài viết sẽ giúp ích cho mọi người trong con đường lập trình với React của mọi người. Hẹn gặp lại mọi người vào những bài viết sau nhé !! Link github demo mình đính kèm bên dưới mọi người có thể vào tham khảo :D Thanks for peace!!

Reference Doc: https://reactjs.org/