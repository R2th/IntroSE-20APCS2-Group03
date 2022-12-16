Xin chào tất cả mọi người, dạo gần đây mình có mình có được tham gia một dự án làm về Reactjs, thì mình có tìm hiểu một số phần về Component, JSX, Prop... và một số phần căn bản của Reactjs thì mình thấy phần xử lý sự kiện (Handling Event) tương đối là quan trọng nên viết bài này để vừa ôn tập lại vừa để tài liệu sau này xem lại. :D

**1) Đầu tiên chúng ta cài đặt môi trường để thực hành**
- Khởi tạo một project thông qua lệnh:

    ```
    npm install -g create-react-app
    
    create-react-app myProject
    ```
    
 Ak, để có thể khởi tạo được project thông qua cú pháp trên thì bạn phải chắc chắn là máy tính của bạn đã cài đặt NodeJs, nếu máy của bạn chưa có Nodejs thì có thểm tham khảo link [này](https://nodejs.org/en/download/) để cài đặt Nodejs.
    
 Vậy là đã xong bước chuẩn bị bây giờ chúng ta bắt đầu bắt tay vào một số ví dụ để hiểu rõ hơn.
 
**2) Gọi và xử lý sự kiện (Handling Event) trong Reactjs**
- *Sự kiện không truyền tham số*
```javascript
//App.js
import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';

class App extends Component {
    onClickMe() {
        alert('hello world cup');
    }
    render() {
        return (
            <div>
                 <button type="button" className="btn btn-default" onClick={ this.onClickMe }>
                        Click Me !
                 </button>
            </div>
        );
    }
}

export default App;
```
Sau đó bạn mở cmd (hoặc terminal) lên vào thư mục đang chứa project chạy lện `npm start` và Click thử vào button "Click Me !" thì bạn sẽ nhận được một cái popup với nội dung là "**hello world cup**".

Vấn đề đặt ra là cái "onClick" kia lấy ở đâu ra thì bạn có thể truy cập vào trang [này](https://reactjs.org/docs/events.html) thì tại đây reacjs có hỗ trợ chúng ta rất là nhiều event như: onChange, onSubmit...

- *Sự kiện có truyền thêm tham số*

***Cách 1: Sử dụng hàm bind để truyền tham số***

Ví dụ 1: bind tham số trực tiếp ở hàm:
```javascript
//App.js
import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';

class App extends Component {
    onClick(text) {
        alert(text);
    }
    render() {
        return (
            <div>
                 <button type="button" className="btn btn-default" onClick={ this.onClickMe.bind(this, 'Ahihi') }>
                    Click Me !
                 </button>
            </div>
        );
    }
}

export default App;
```

Ví dụ 2: bind tham số ở trên hàm constructor:

```javascript
//App.js
import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';

class App extends Component {

    constructor(props) {
        super(props);
        this.onClickMe = this.onClickMe.bind(this, 'Ahihi')
    }

    onClick(text) {
        alert(text);
    }
    render() {
        return (
            <div>
                 <button type="button" className="btn btn-default" onClick={ this.onClickMe }>
                    Click Me !
                 </button>
            </div>
        );
    }
}
```

Khi chạy lên cả hai ví dụ trên và click vào button thì đều có cùng kết quả là "**Ahihi**".
![](https://images.viblo.asia/b3b4a18a-67d8-483f-914d-b2e14688afe5.png)

***Cách 2: Sử dụng arrow function trong Es6***

Ví dụ:

```javascript
//App.js
import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';

class App extends Component {
    onClick(text) {
        alert(text);
    }
    render() {
        return (
            <div>
                 <button type="button" className="btn btn-default" onClick={ () =>  this.onClickMe('Ahihi') }>
                    Click Me !
                 </button>
            </div>
        );
    }
}
```
Chạy chương trình lên và click vào button thì kết quả cũng giống hai ví dụ trên dều nhận được là "**Ahihi**"
![](https://images.viblo.asia/d466e224-10a2-44dc-93d6-877d6c81e96c.png)

**3) Kết luận**

Trên đây là một chút kiến thức mà mình biết để gọi và xử lý sự kiện trong Reactjs. Hẹn gặp lại mọi người trong các bài viết tiếp theo.
Cảm ơn mọi người đã xem bài viết của mình. :D