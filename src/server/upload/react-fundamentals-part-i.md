I.Mở đầu: Mọi người khoẻ, hôm nay mình cùng học React thông qua các ví dụ.(Ở đây các phần được đề cập chỉ là sự ngẫu hứng, không tuân theo thứ tự quan trọng hay features thường gặp trong React)

II.Các ví dụ:
* ---Hàm setState()---

setState là 1 async function, tức là nó không đảm bảo update state ngay lập tức.Nếu nextState phụ thuộc vào prevState chúng ta nên dùng param là 1 function, nếu không, chúng ta có thể dùng Object.Thử làm 1 ví dụ sau:

````
class User extends Component {
  state = {
    showInfo: true,
    count: 1
  };

  togglePickupChange = () => {
    this.setState(state => ({
      showInfo: !state.showInfo
    }))
  }

  incrementCount = () => {
    this.setState(state => ({
      count: state.count + 1
    }));
  };

  render() {
    const { showInfo, count } = this.state;
    return (
      <Fragment>
        <input type="checkbox" onClick={this.togglePickupChange} />
        I'll pick it up<br />
        { showInfo && (
          <div>
            User: HoangTuanAnh<br />
            Email: example@gmail.com
          </div>
        )}
        <br />
        Count: {count}
        <button onClick={this.incrementCount}>Increment</button>
      </Fragment>
    );
  }
}
````
Chúng ta có thể tạo hai biến ở ngoài class:
````
const toggleKey = key => state => ({
  [key]: !state[key]
});

const incrementKey = key => state => ({
  [key]: state[key] + 1
});
````
Và viết lại hai hàm trong class
````
togglePickupChange = () => {
    this.setState(toggleKey("showInfo"));
  };

  incrementCount = () => {
    this.setState(incrementKey("count"));
  };
````
Hoặc chúng ta có thể đi xa hơn như sau:
````
const makeUpdater = apply => key => state => ({
  [key]: apply(state[key])
})
const toggleKey = makeUpdater(previous => !previous)
const incrementKey = makeUpdater(previous => previous + 1)
````
Link vd trên: https://codesandbox.io/s/yq03o84j7v
* ---Forwarding Refs---

Tương tự forward 1 mail cho ai đó, ở đây chúng ta forward ref nghĩa là truyền ref cho các component con của nó.Thử làm ví dụ sau để rõ hơn:
````
class App extends Component {
  state = {
    sendEmail: false
  };

  handleChange = e => {
    this.setState(
      {
        sendEmail: e.target.checked
      },
      () => {
        if (this.state.sendEmail) {
          this.emailRef.focus();
        }
      }
    );
  };
  render() {
    const { sendEmail } = this.state;

    return (
      <Fragment>
        <label>
          <input type="checkbox" onChange={this.handleChange} /> Notify me by
          email
        </label>
        {sendEmail && (
          <p>
            <label>
              Email Address: <input ref={node => (this.emailRef = node)} />
            </label>
          </p>
        )}
      </Fragment>
    );
  }
}
````
Chúng ta muốn click vào checkbox, input email sẽ hiện ra và nó sẽ tự động được focus.Tuy nhiên trong thực tế khi chúng ta viết reusable component, thay vì dùng input tag, chúng ta có thể dùng 1 component khác.
````
const FancyInput = props => (
  <input className="fancy" {...props} />
)
````
Trong class 
````
<label>
  Email Address: <FancyInput ref={node => (this.emailRef = node)} />
</label>
````
Đến đây khi click vào checkbox, chúng ta sẽ nhận được lỗi.Lý do ở đây là chúng ta không thể có ref với 1 stateless component(<FancyInput />).Để giải quyết điều này, trước kia chúng ta thường truyền prop như sau:
````
Email Address: <FancyInput innerRef={node => (this.emailRef = node)} />
````
Và
````
const FancyInput = ({ innerRef, ...props }) => (
  <input className="fancy" ref={innerRef} {...props} />
);
````
Hiện tại chúng ta có thể dùng forwardRef:
````
Email Address: <FancyInput ref={node => (this.emailRef = node)} />
````
Và
````
const FancyInput = React.forwardRef((props, ref) => (
  <input className="fancy" {...props} ref={ref} />
));
````
Link vd trên: https://codesandbox.io/s/v0224pjv90

**************To be continued**************