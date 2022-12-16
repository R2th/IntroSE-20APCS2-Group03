## Tại sao chúng ta phải sử dụng [ReactTransitionGroup ?](https://www.npmjs.com/package/react-addons-transition-group)
Một điều chắc chắn là chúng ta có thể làm animations chỉ với CSS. Nhưng khi ứng dụng bắt đầu phình to ra thì điều này thực sự là một thử thách khi chúng ta muốn maintain code về sau.

[ReactTransitionGroup](https://github.com/reactjs/react-transition-group) là một API được xây dựng từ thư viện ReactCSSTransitionGroup. Điểm khác biệt duy nhất là ReactTransitionGroup được viết bằng Javascript, thay vì CSS, và các hàm callback được thực thi một khi animation hoàn thành, thay vì chúng ta phải trigger thông qua các event transition của CSS.
## Warm up
Nào, chúng ta hãy bắt đầu bằng việc tạo ra một cái box với điều kiện ẩn hiện theo một cái cờ tên là shouldShowBox.

P/s: Để cho ví dụ được đơn giản nhất có thể, tác giả sử dụng boilerplate [create-react-app](https://github.com/facebook/create-react-app), bạn đọc có thể cài đặt trước khi bắt đầu: 
```
npm install -g create-react-app
create-react-app react-transition-example
```
Chúng ta sẽ tạo ra một component tên là **Page**, với một button, và gọi ra ở **App.js**

**Page.js**
```
import React from 'react';

class Page extends React.Component {
  state = {
    shouldShowBox: true
  };

  toggleBox = () => {
    this.setState({
      shouldShowBox: !this.state.shouldShowBox
    });
  };

  render () {
    return <div className="page">

      { this.state.shouldShowBox && <div className="box"/>}

      <button
        className="toggle-btn"
        onClick={this.toggleBox}
      >
        toggle
      </button>
    </div>;
  }
}

export default Page
```

Khi shouldShowBox = true, thì thẻ div với class = "box " sẽ hiện ra và ngược lại.
## Thêm React Transition Group 

```
npm install react-addons-transition-group
```

Chúng ta import thư viện vào **Page.js**
```
import TransitionGroup from 'react-addons-transition-group';
```
Component của chúng ta trở thành :
```

// ...
  render () {
    return <div className="page">

      <TransitionGroup>
        { this.state.shouldShowBox && <div className="box"/>} 
      </TransitionGroup>

      <button
        className="toggle-btn"
        onClick={this.toggleBox}
      >
        toggle
      </button>
    </div>;
  }
// ...
```

Để tạo sự linh hoạt cho việc định nghĩa animations của chúng ta sẽ xuất hiện khi nào, thẻ TransitionGroup không tự định nghĩa ( bằng các props ), và thay vào đó chúng ta sẽ "hooks" bằng các component con bên trong nó, và trong trường hợp này, chúng ta có thẻ làm điều kiện ẩn hiện bằng flag shouldShowBox.

Về cơ bản, chúng ta cần hiểu 2 methods sau: 

### componentWillEnter(callback)

Được gọi khi component được thêm một TransitionGroup ( đã tồn tại ), cùng thời điểm với **componentDidMount**. Không được gọi vào lần render đầu tiên ( **componentWillAppear** )

### componentWillLeave(callback)

Được gọi khi TransitionGroup bị unmount, cùng thời điểm với **componentWillUnmount**, và **componentWillUnmount** sẽ không được trigger, một khi callback được gọi.

Sau đó, thêm animations giữa các lifecycle, ở đây mình sử dụng [GSAP’s TweenMax](https://github.com/greensock/GreenSock-JS), code của chúng ta trở thành: 

**Box.js**

```
import React from 'react';

export default class Box extends React.Component {
    componentWillEnter(callback) {
        const el = this.container;
        TweenMax.fromTo(el, 0.3, { y: 100, opacity: 0 }, { y: 0, opacity: 1, onComplete: callback });
    }

    componentWillLeave(callback) {
        const el = this.container;
        TweenMax.fromTo(el, 0.3, { y: 0, opacity: 1 }, { y: -100, opacity: 0, onComplete: callback });
    }

    render() {
        return <div className="box" ref={c => this.container = c} />;
    }
}
```
Thay đổi dòng này ở **Page.js** :
```
{this.state.shouldShowBox && <Box/>}
```
Đừng quên install **gsap** và **styles.css**
```
npm install --save gsap
```

```
.page {
  height: 100%;
}

.box {
  width: 100px;
  height: 100px;
  background-color: #3498DB;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.toggle-btn {
  margin-top: 20px;  
  width: 80px;
}
```

Như vậy là chúng ta đã hoàn thành ví dụ về ReactTransitionGroup rồi ! [Demo](https://gyazo.com/7c794db87d469893f5eebabd20098ebe)

Nguồn: [Medium](https://medium.com/appifycanada/animations-with-reacttransitiongroup-4972ad7da286)