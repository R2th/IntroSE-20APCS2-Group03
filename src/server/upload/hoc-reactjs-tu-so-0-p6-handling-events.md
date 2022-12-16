# Handle Event

Hôm nay chúng ta tiếp tục với chủ đề Handling Events.
Với React thì việc xử lý các Event cũng giống như là DOM element, chỉ có một vài điểm khác biệt như sau

 - React element thì sử dụng camelCase conventio, ko giống như là DOM element là sử dụng lowercase
 - Với JSX thì bạn có thể xử lý các sự kiện bằng cách sử dụng event handle chứ ko giống DOM truyền vào 1 chuỗi string


Ví dụ
Với DOM element để bind sự kiện chúng ta truyền vào element 1 chuỗi string
```Javascript
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

Còn với React element thì việc xử lý sự kiện như sau

```Javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

Một trong những điểm khác biệt giữa function sử dụng cho DOM và React đó chính là các function của React không thể dừng function bằng việc return false như là DOM.
Với React element để dừng một sự kiện thì các bạn phải sử dụng funtion **preventDefault** 

Ví dụ để chặn sự kiện **onClick**  như sau

```Javascript
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

với DOM element chỉ cần chúng ta return false thì mặc định sự kiện sẽ bị chặn lại.


```Javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
Còn với React element chúng ta phải sự dụng function   **e.preventDefault();** để chặn sự kiện

### Synthetic event

Với React element thì synthetic event **e**  được định nghĩa theo [W3C spec,](https://www.w3.org/TR/DOM-Level-3-Events/)
Các bạn có thể tìm hiểu thêm về [Synthetic event](https://reactjs.org/docs/events.html).

Event khi được bind vào element thì được thêm vào **SyntheticEvent** giống như là các sự kiện của các trình duyệt

Với mỗi SyntheticEvent sẽ bao gồm các thuộc tính sau:
```Javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

```Javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

### Method Refer

Với React element thì các bạn không cần phải sử dụng **addEventListener**  để add event vào các element mới được tạo.
Ví dụ như sau

```Javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

Với ví dụ trên thì khi state thay đổi thì Button sẽ được render lại, và nếu với DOM element thì sau khi render button mới thì các bạn sẽ phải sử dụng **addEventListener** để add sự kiện **onClick** vào cho button mới.
Nhưng với React element thì khi button được render lại thì mặc nhiên element đã được add sự kiên **onClick**.

Nhưng có một lưu ý khi các bạn sử dụng từ khóa **this** trong JSX, do các method của javascript không được **bind** một cách mặc định nên nếu bạn quên làm việc đó thì khi sử dụng **this.method** sẽ trả về undefine. 

Nếu bạn đang sử dụng ES6 thì chắc không cần phải nhớ điều đó làm gì, với ES6 các bạn có một cách nữa đề viết và sử dụng function mà ko cần tới **bind** đó chính là **Arrow Function**

```Javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

chúng ta sửa lại một tí ví dụ ở trên.


Hôm nay chúng ta tạm thời dừng ở đây nhé, hẹn các bạn vào bài sau.

[Nguồn bài viết](https://reactjs.org/docs/conditional-rendering.html)