Xin chào tất cả mọi người sau một thời gian vắng mặt hôm nay mình đã quay trở lại. Hôm nay chúng ta cùng tìm hiểu về vòng đời của một component trong ReactJs.

Hình dưới đây minh học cho một vòng đời của một component:

![](https://images.viblo.asia/21ad41fc-8109-472f-9753-89d3b8fb0834.png)

**1) Initialization**

- Tương tự hàm khởi tạo (constructor) được gọi đến khi một thể hiện của component được tạo ra.

**2) Mounting**

Là các hàm gắn kết, kết nối các component với nhau.

***componentWillMount()***

- Được gọi đến trước khi hiển thị component ra ngoài trình duyệt. Quá trình này diễn ra hết sức nhanh chóng, vì vậy không nên làm quá nhiều điều tại đây và hàm này được thực hiện một lần duy nhất (từ phiên bản 16.3 thì hàm này không được khuyến khích dùng và sẽ bị loại bỏ ở bản 17).

***Render()***

- Được gọi khi hiển thị component ra ngoài trình duyệt.
- Sẽ return về nội dung mà bạn đã viết, có thể là một component hoặc null hoặc là false (trong trường hợp không muốn render gì cả).

***componentDidMount()***

- Được gọi sau khi đã hiển thị component ra ngoài trình duyệt, và hàm này được thực hiện một lần duy nhất.
- Hàm này được gọi để thông báo component đã tồn tại trên DOM, từ đó các thao tác trên DOM có thể thực hiện bình thường với component này.

Để hiểu rõ hơn chúng ta cùng đi qua một số ví dụ.

**Ví dụ:**

```js
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('initialization');
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {
        console.log('render');
        return (
            <div className="App">
                
            </div>
        );
    }
}

export default App;

```

Khi chạy lên ta được kết quả như sau:

![](https://images.viblo.asia/e22664a5-9d65-4b2e-9115-1aac342dba3a.PNG)

Đầu tiên khi component được gọi thì hàm hàm constructor() được gọi, sau đó đến componentWillMount(), tiếp theo là reder() ra ngoài và cuối cùng hàm componentDidMount được gọi khi đã render() xong.


**3) Updation**

- Là các vấn đề khi mình update component về props, về state.

***componentWillReceiveProps(nextProps)***

- Hàm này được chạy khi mà props của component đã được sinh ra có sự thay đổi.
- Phải gọi setState() nếu muốn render lại.

***shouldComponentUpdate(nextProps, nextState)***

- Được thực hiện ngay sau khi state và props thay đổi.
- sẽ trả về kết quả true or false. Phương thức này sẽ xác định 1 component có được update hay không. Mặc định giá trị này là true. Nếu bạn không muốn component render lại sau khi update state hay props thì return giá trị thành false.

***componentWillUpdate(nextProps, nextState)***
- Được gọi khi chúng ta update state của component trước khi nó render lại.
- Bạn không thể gọi this.setState trong componentWillUpdate
- Hàm render sẽ được gọi ngay sau hàm này.
- (từ phiên bản 16.3 thì hàm này không được khuyến khích dùng và sẽ bị loại bỏ ở bản 17)

***componentDidUpdate(prevProps, prevState)***

- Được gọi khi một component instance update, componentDidUpdate sẽ được gọi sau khi render HTML được loading xong.

Sau đây chúng ta sẽ đi vào một số ví dụ để hiểu rõ hơn.

**Ví dụ về updation cho state**
```js
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('initialization');
        this.state = {
            component: 'Component Init'
        }
    }

    updateState = () => {
        this.setState({
            component: 'New State'
        });
    }

    shouldComponentUpdate(nextProps, nextState) {        
        console.log('shouldComponentUpdate ' + nextState.component);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate ' + nextState.component);

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate ' + prevState.component);

    }

    render() {
        console.log('render');
        console.log(this.state.component);
        return (
            <div className="App">
                <button type="button" className="btn btn-primary" onClick={() => this.updateState()}>Click Me</button>
            </div>
        );
    }
}

export default App;

```

Kết quả khi bấm vào button "Click Me":

![](https://images.viblo.asia/a878ae36-8155-4d02-b810-fe29032d355f.PNG)

**Ví dụ updation cho props**

```js
//App.js
import React, { Component } from 'react';
import Content from './Content';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: 'Tí'
        }
    }

    updateState = () => {
        this.setState({
            fullName: 'Tèo Văn Tí'
        });
    }

    render() {
        return (
            <div className="App">
                <Content name={this.state.fullName}></Content>
                <button type="button" className="btn btn-primary" onClick={() => this.updateState()}>Click Me</button>
            </div>
        );
    }
}

export default App;

```

Tạo một file Content.js trong folder src có nội dung như sau:

```js
//Content.js
import React, { Component } from 'react';

class Content extends Component {
    componentWillReceiveProps(nextProps) {
        console.log('shouldComponentUpdate ' + nextProps.name);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate ' + nextProps.name);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate ' + nextProps.name);

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate ' + prevProps.name);

    }
    render() {
        return (
            <div>
                <div>{this.props.name}</div>
            </div>
        );
    }
}

export default Content;

```

Kết quả khi bấm vào button "Click Me"

![](https://images.viblo.asia/4e8ca5e2-0c41-48b8-9cd7-5da759642174.PNG)

**4) Unmounting**

***componentWillUnmount()***
- Được gọi trước khi một component bị remove khỏi một DOM.

**Kết luận**

Trên đây là một chút kiến thức mình biết về vòng đời của một component trong ReactJs.
Cảm ơn mọi người đã xem bài viết của mình. :D

**Nguồn tham khảo:**

- https://viblo.asia/p/vong-doi-cua-component-trong-react-gGJ59XaJlX2
- https://viblo.asia/p/vong-doi-cua-mot-react-component-RQqKLMRzZ7z