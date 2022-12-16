Sử dụng render props trong React là một cách hiệu quả để tái sử code. Theo [ React documentation](https://reactjs.org/docs/render-props.html) "một conponent có sử dụng một render props sẽ lấy function đó để trả về React element và gọi nó thay vì thực hiện logic của chính nó". Để hiểu ý nghĩa của điều đó hãy cùng nhìn vào render props pattern và sau đó áp đụng nó cho một vài ví dụ đơn giản.

# render props pattern

Khi làm việc với render props bạn truyền một render function tới conponent đó và sau đó returns React element. Render function này định nghĩa bởi một component khác và nó nhận chia sẻ những gì nó đã truyền qua render function.

Nó sẽ như thế này

``` JavaScript
class BaseComponent extends Component {
  render() {
    return <Fragment>{this.props.render()}</Fragment>
  }
}
```

Hãy tưởng tưởng một **App** là một hộp quà và bản thân nó ở trên top. Nếu chiếc hộp là một component chúng ta có thể tạo và mở nó, chúng ta sẽ show props, states, functions và methods cần thiết để làm cho component có thể hoạt động mỗi khi nó được gọi bởi **render()**.

render của một component bình thường bao gồm JSX và Dom cho bản thận nó. Nhưng thay vì vậy component này có một render function **this.props.render()** nó sẽ hiển thị component được truyền thông qua props.

# Ví dụ: tạo một counter

Hãy làm môt counter đơn giản với chức năng tăng và giảm giá trị dựa trên button khi click.

Đầu tiên chúng ta sẽ tạo một component mà nó sẽ sử dụng để chứa State, methods và rendering ban đầu. Chúng ta sẽ gọi nó là **Wrapper**:

``` JavaScript
class Wrapper extends Component {
    state = {
        count: 0
  };

  // Increase count
  increment = () => {
      const { count } = this.state;
    return this.setState({ count: count + 1 });
  };

  // Decrease count
  decrement = () => {
      const { count } = this.state;
    return this.setState({ count: count - 1 });
  };

  render() {
      const { count } = this.state;

    return (
        <div>
        {this.props.render({
            increment: this.increment,
          decrement: this.decrement,
          count: count
        })}
      </div>
    );
  }
}
```

Trong **Wrapper** chúng ta chỉ định methods và state là những thứ sẽ sử dụng trong component được bọc. Cho ví dụ, chúng ta cần **increment** và **decrement** methods. Chúng ta có giá trị ban đầu của **count** là 0. Logic là hoặc tăng hoặc giảm **count** dựa trên việc method nào được kích hoạt bắt đầu từ 0.

Nếu bạn nhìn vào trong **return()** ban sẽ thấy rằng chúng ta đã tận dụng **this.props.render()** nó sẽ giúp chúng ta truyền những thứ mà chúng ta cần (state, methods) tới component được wrapper và sử dụng nhưng thứ được truyền tới.

Để sử dụng nó cho **App** của chúng ta component sẽ nhìn như thế này:


``` JavaScript
class App extends React.Component {
  render() {
    return (
      <Wrapper
        render={({ increment, decrement, count }) => (
          <div>
            <div>
              <h3>Render Props Counter</h3>
            </div>
            <div>
              <p>{count}</p>
              <button onClick={() => increment()}>Increment</button>
              <button onClick={() => decrement()}>Decrement</button>
            </div>
          </div>
        )}
      />
    );
  }
}
```

## code mẫu của counter
[counter](https://codepen.io/kinsomicrote/pen/pxyvwX)

## Thêm một ví dụ về tạo data list

[data list](https://codepen.io/kinsomicrote/pen/YJNKme)

# Nguồn tham khảo

[Css trick](https://css-tricks.com/an-overview-of-render-props-in-react/?fbclid=IwAR2A509NMCkPbKB1lWzTSQyXpm84snN9vh7il-lLWcuuT6PUbEyTjQdWKNI)