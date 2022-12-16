Như chúng ta đã biết, trong React có thể nói component là thành phần quan trọng nhất. Tất cả mọi hoạt động trong React đều xoay quanh component. Vậy luồng hoạt động của một component sẽ diễn ra như thế nào? Chúng ta hãy cùng tìm hiểu nhé! <br>

Quá trình mà tất cả các state tham gia vào component được gọi là vòng đời thành phần và mọi thành phần React đều đi qua nó. React cung cấp một số phương thức thông báo cho chúng ta biết khi quá trình này xảy ra. Các phương thức này được gọi là **lifecycle methods.**<br>

**Lifecycle methods** là những phương thức được gọi tại một thời điểm nào đó trong vòng đời của một component.

Về cơ bản, tất cả cácphương thức trong vòng đời của compoent có thể được chia thành bốn giai đoạn: **initialization**, **mounting**, **updating** and  **unmounting**.


-----


#### Initialization
- Giai đoạn khởi tạo là nơi chúng ta xác định giá trị mặc định và giá trị ban đầu cho `this.props` và `this.state` bằng cách implement `getDefaultProps ()` và `getInitialState ().`
- Phương thức `getDefaultProps() `được gọi một lần và được lưu trong bộ nhớ cache - được chia sẻ giữa các instance - khi lớp được tạo ra. Phương thức này trả về một đối tượng mà các giá trị thuộc tính sẽ được đặt trên this.props nếu prop đó không được chỉ định bởi thành phần cha.
- Phương thức `getInitialState()` cũng được gọi một lần, ngay trước giai đoạn **mounting** . Giá trị trả về của phương thức này sẽ được sử dụng làm giá trị ban đầu của this.state và phải là một đối tượng.
```js
    var Counter = React.createClass({
            getDefaultProps: function() {
                console.log('getDefaultProps');
                return {
                    title: 'Basic counter!!!'
                }
            },

            getInitialState: function() {
                console.log('getInitialState');
                return {
                    count: 0
                }
            },

            render: function() {
                console.log('render');
                return (
                    <div>
                        <h1>{this.props.title}</h1>
                        <div>{this.state.count}</div>
                        <input type='button' value='+' onClick={this.handleIncrement} />
                        <input type='button' value='-' onClick={this.handleDecrement} />
                    </div>
                );
            },

            handleIncrement: function() {
                var newCount = this.state.count + 1;
                this.setState({count: newCount});
            },

            handleDecrement: function() {
                var newCount = this.state.count - 1;
                this.setState({count: newCount});
            },

            propTypes: {
                title: React.PropTypes.string
            }
        });

        ReactDOM.render(
            React.createElement(Counter),
            document.getElementById('app-container')
        );
```
- Ở trên, trong `getDefaultProps()`, chúng ta đã định nghĩa thuộc tính `title` với giá trị mặc định là 'Basic counter!!!'. Ngoài ra, chúng ta thiết lập giá trị state `count` ban đầu là 0 trong phương thức `getInitialState()`. Nếu chúng ta chạy mã này và xem đầu ra của console, ta sẽ thấy thứ tự thực hiện của các phương thức:
![https://images.viblo.asia/4577fa6d-0981-42b5-a8ce-73f93d9850e8.png](https://images.viblo.asia/4577fa6d-0981-42b5-a8ce-73f93d9850e8.png)
- Bây giờ chúng ta sẽ thêm thành phần Counter với chức năng thiết lập giá trị ban đầu của `this.state.count` và giá trị tăng/giảm của `step`
```js
    var Component = React.createClass({
    getDefaultProps: function() {
        console.log('getDefaultProps');
        return {
            title: "Basic counter!!!",
            step: 1
        }
    },
    
    getInitialState: function() {
        console.log('getInitialState');
        return {
            count: (this.props.initialCount || 0)
        };
    },

    render: function() {
        console.log('render');
        var step = this.props.step;
        
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>{this.state.count}</div>
                <input type='button' value='+' onClick={this.updateCounter.bind(this, step)} />
                <input type='button' value='-' onClick={this.updateCounter.bind(this, -step)} />
            </div>
        );
    },
    
    updateCounter: function(value) {
        var newCount = this.state.count + value;
        this.setState({count: newCount});
    }, 
    
    propTypes: {
        title: React.PropTypes.string,
        initialCount: React.PropTypes.number,
        step: React.PropTypes.number
    }
});

ReactDOM.render(
    React.createElement(Component, {initialCount: 5, step: 2}),
    document.getElementById('app-container')
);
```

#### Mounting
- Mounting  là quá trình xảy ra khi một thành phần đang được chèn vào DOM. Giai đoạn này có hai phương thức mà chúng ta cần quan tâm: `componentWillMount()` và `componentDidMount().`
- Phương thức `componentWillMount() `là phương thức đầu tiên được gọi trong giai đoạn này. Nó được gọi một lần và ngay trước khi render ban đầu xảy ra. Nếu chúng ta thêm mã tiếp theo vào thành phần `Counter`, chúng ta sẽ thấy rằng phương thức được gọi sau `getInitialState()` và trước `render()`.
```js
    getInitialState: function() {...},
    componentWillMount: function() {
        console.log('componentWillMount');
    },
    ...
```
- `componentDidMount()` là phương thức thứ hai được gọi trong giai đoạn này, nó chỉ được gọi một lần và ngay sau khi React chèn thành phần vào DOM.
- Giả sử chúng ta muốn khởi tạo thành phần Counter với dữ liệu được nạp từ API. Chúng ta có thể lấy trực tiếp dữ liệu trong phương thức` componentDidMount()`.
```js
    var Container = React.createClass({
    getInitialState: function() {
        return {
            data: null,
            fetching: false,
            error: null
        };
    },
    
    render: function() {
        if (this.props.fetching) {
            return <div>Loading...</div>;
        }
        
        if (this.props.error) {
            return (
                <div className='error'>
                    {this.state.error.message}
                </div>
            );
        }
        
        return <Counter {...data} />
    },
    
    componentDidMount: function() {
        this.setState({fetching: true});
        
        Axios.get(this.props.url).then(function(res) {
            this.setState({data: res.data, fetching: false});
        }).catch(function(res) {
            this.setState({error: res.data, fetching: false});
        });
        (Axios là một HTTP client được viết dựa trên Promises
        được dùng để hỗ trợ cho việc xây dựng các ứng dụng API
        từ đơn giản đến phức tạp và có thể được sử dụng cả ở
        trình duyệt hay Node.js)
    }
}); 
```
#### Updating
- Ngoài ra còn có các phương thức sẽ cho phép chúng ta thực thi mã liên quan đến `state` hoặc các `prop` của thành phần được cập nhật. Các phương thức này là một phần của giai đoạn `updating`  và được gọi theo thứ tự sau:
1. Khi nhận được **prop** mới từ thành phần cha:
![](https://cdn-images-1.medium.com/max/1200/1*5fwo0VC1KtiWH64CENQ8dQ.png)

2. Khi **state** thay đổi thông qua `this.setState()`:
![](https://cdn-images-1.medium.com/max/1200/1*u0CoE_GHlUB4Ce-yZtgv0Q.png)
- Trong giai đoạn này, một thành phần React đã được chèn vào DOM. Do đó, các phương thức này không được gọi cho lần render() đầu tiên.
- Phương thức `componentWillReceiveProps()`, được gọi khi một thành phần nhận **prop** mới. Chúng ta có thể sử dụng phương thức này để chuyển đổi prop trước khi phương thức render () được gọi. Gọi `this.setState ()` trong hàm này sẽ không kích hoạt khi render() được gọi lại và chúng ta có thể truy cập các **prop** cũ thông qua `this.props`.
```js
    ...
    componentWillReceiveProps: function(newProps) {
        this.setState({count: newProps.initialCount});
    },
    ...
```
- Phương thức `ShouldComponentUpdate ()`cho phép chúng ta quyết định liệu state của thành phần tiếp theo có nên trigger render lại hay không. Phương thức này trả về giá trị boolean, theo mặc định là true. Nhưng chúng ta có thể trả về false và các phương thức tiếp theo khi giá trị true sẽ được gọi là:
* **componentWillUpdate()**
* **render()**
* **componentDidUpdate()**
```js
    var TextComponent = React.createClass({
        shouldComponentUpdate: function(nextProps, nextState) {
            if (this.props.text === nextProps.text) return false;
            return true;
        },

        render: function() {
            return <textarea value={this.props.text} />;
        }
    });
```
- Trong ví dụ giả định trên, bất cứ khi nào thành phần cha truyền một thuộc tính text đến TextComponent bằng với prop **text** hiện tại, thì việc render lại sẽ bị tránh.
- Phương thức `componentWillUpdate()` được gọi ngay trước khi render, khi nhận được **prop** hoặc **state** mới. Chúng ta có thể sử dụng nó để thực hiện chuẩn bị thay đổi **prop**, **state** trước khi cập nhật xảy ra, tuy nhiên không được phép sử dụng `this.setState ()`.
```js
    ...
    componentWillUpdate: function(nextProps, nextState) {
        console.log('componentWillUpdate', nextProps, nextState);
    },
    ...
```
- Phương thức `componentDidUpdate ()` được gọi ngay sau khi React cập nhật DOM. Chúng ta có thể sử dụng phương pháp này để tương tác với DOM khi được cập nhật hoặc thực hiện bất kỳ hành động nào sau render. Phương thức này nhận được hai đối số:
1. **prevProps**: đối tượng thuộc tính trước.
2. **prevState**: đối tượng trạng thái trước.
#### Unmounting
- Trong giai đoạn này React chỉ cung cấp cho chúng ta một phương thức:
* **componentWillUnmount()**
- Nó được gọi ngay lập tức trước khi thành phần được ngắt khỏi DOM. Chúng ta có thể sử dụng nó để thực hiện bất kỳ việc cleanup nào chúng tôi có thể cần, chẳng hạn như bộ định thời không hợp lệ hoặc dọn sạch mọi phần tử DOM đã được tạo trong `componentDidMount()/componentDidUpdate()`
- Ví dụ:
```js
    ...
    componetWillUnmount: function(){
       $(this._ref).select2('destroy');
    },
    ...
```
##### Tài liệu tham khảo:
[React component’s lifecycle](https://medium.com/react-ecosystem/react-components-lifecycle-ce09239010df)