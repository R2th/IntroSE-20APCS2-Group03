## Hiển thị tất cả các Items
Như ở phần trước ([P1](https://viblo.asia/p/crud-voi-react-va-ruby-on-rails-phan-1-naQZR1pQKvx)) mình có nói tất cả các item sẽ được liệt kê trong component. Trong componentcũng sẽ chứa một biểu mẫu (form) để thực hiện việc thêm dữ liệu. Để thực hiện được việc hiển thị và form thêm dữ liệu chúng ta cần tạo thêm các file sau:
```
app/assets/javascripts/components/_body.js.jsx
app/assets/javascripts/components/_all_items.js.jsx
app/assets/javascripts/components/_new_items.js.jsx
```
Đầu tiên hãy bắt đầu với việc hiển thị tất cả các item. Để làm được việc này chúng ta cần thực hiện một yêu cầu tới máy chủ để lấy tất cả các item bằng cách sử dụng AJAX. Chúng ta phải làm điều này trước khi các component được đưa vào DOM. Trong react có một số method tích hợp để xử lý các sự kiện khác nhau trong suốt dòng đời của một component. Có các method được thực hiện trước và sau khi component được đưa vào DOM hoặc trước và sau khi nó được tháo gỡ khỏi DOM. Trong trường hợp này, chúng ta cần một method được thực hiện khi component được đưa vào DOM. Ở đây mình dùng componentDidMount(), method này được gọi nagy sau khi component được gọi vào DOM. Để tìm hiểu rõ hơn về các method bạn có thể tìm hiểu tại đây [React’s documentation](https://facebook.github.io/react/docs/component-specs.html).
```javascript
// app/assets/javascripts/components/_all_items.js.jsx

var AllItems = React.createClass({
  componentDidMount() {
    console.log("Component mounted");
  },

  render() {
    return (
      <div>
        <h1>All items component</h1>
      </div>
    );
  }
});
```
Đây là cách triển khai của method componentDidMount(). Một lưu ý cho các bạn là các method phải được tách ra bời vì trong hàm React.createClass chúng được định nghĩa là các thuộc tính đối tượng và chúng phải được phân tách nhau bằng dấu phẩy.

Trước khi chúng ta lấy dữ liệu từ máy chủ, chúng ta cần biết cách dữ liệu được lưu trữ trong component. Khi component được đưa vào DOM dữ liệu cần được khởi tạo. Điểu này được thực hiện bằng phương thức getInitialState().
```javascript
// app/assets/javascripts/components/_all_items.js.jsx

var AllItems = React.createClass({
    getInitialState() {
        return { items: [] }
    },
```
Bây giờ chúng ta cần lấy dữ liệu từ máy chủ và gán nó cho đối tượng items.
```javascript
// app/assets/javascripts/components/_all_items.js.jsx

getInitialState() {
        return { items: [] }
},

componentDidMount() {
    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
},
```
Ở đây mình sử dụng method `getJSON` với URL của items.json và sử dụng hàm `setState` của component để đưa dữ liệu vào đối tượng items.

Okay, chúng ta đã có các items, nhưng làm thế nào để hiển thị chúng ra? Để làm được điều này chúng ra chỉ cần lặp các item trong method `render()`.
```javascript
// app/assets/javascripts/components/_all_items.js.jsx

//getInitialState and componentDidMount

render() {
    var items= this.state.items.map((item) => {
        return (
            <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
        )
    });

    return(
        <div>
            {items}
        </div>
    )
}
```
Phương thức `map` được sử dụng để lặp qua mảng items và hiển thị các thuộc tính của item bằng cách sử dụng cặp dấu `{}` . Cặp dấu này được sử dụng để hiển thị các thuộc tính của item trong html. Cuối cùng nó trả về một biến items, mà bây giờ là một phần tử DOM với các thuộc tính của items được bao bọc trong các phần tử html.

Nhưng như vậy vẫn chưa xong, khi chúng ta lặp qua các mục trong React, phải có cách xác định từng item vào DOM của component. Đối với điều này, chúng ta sẽ sử dụng thuộc tính duy nhất của mỗi item, còn được gọi là `key`. Để thêm `key` vào item chúng ta cần sử dụng thuộc tính `key` trong thẻ div bao bọc chúng.

```javascript
// app/assets/javascripts/components/_all_items.js.jsx

    var items= this.state.items.map((item) => {
        return (
            <div key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
            </div>
        )
    });

    return(
        <div>
            {items}
        </div>
    )
}
```
Thuộc tính key để định danh và đảm bảo rằng các component đều ở đúng vị trí của nó, tối ưu hóa việc rendering. Tìm hiểu thêm tại [React’s documentation](https://facebook.github.io/react/docs/reconciliation.html).

Bây giờ hãy xem mọi thứ có hoạt động không? Để kiểm tra xem mọi thứ có hoạt không chúng ta cần đưa component `AllItems` và `NewItem` vào component cha là `Body`.
```javascript
// app/assets/javascripts/components/_body.js.jsx

var Body = React.createClass({
  render() {
    return (
      <div>
        <NewItem />
        <AllItems />
      </div>
    );
  }
});
```
Tiếp tục chúng ta cần phải đưa component `Body` vào component `Main`
```javascript
// app/assets/javascripts/components/_main.js.jsx
var Main = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
});
```
Như vậy chúng ta đã hoàn thành được việc hiển thị tất cả các dữ liệu rồi. Bước tiếp theo chúng ta sẽ cùng nhau làm chức năng thêm mới một dữ liệu.
## Thêm mới dữ liệu
Bây giờ chúng ta sẽ xây dựng component `NewItem`:
```javascript
//app/assets/javascripts/components/_new_item.js.jsx

var NewItem = React.createClass({
  render() {
    return (
      <div>
        <h1>new item</h1>
      </div>
    );
  }
});
```
Để tạo được item mới chúng ta cần tạo các trường đầu vào, ở bài này chúng ta sẽ tạo 2 trường và gửi chúng đến máy chủ thông qua phương thức POST. Khi item mới được tạo chúng ta phải tải lại trang danh sách để item mới được hiển thị. Bây giờ chúng ta sẽ tạo form để xử lý cho việc thêm mới.
```javascript
// app/assets/javascripts/components/_new_item.js.jsx

var NewItem= React.createClass({
    render() {
        return (
            <div>

                <input ref='name' placeholder='Enter the name of the item' />
                <input ref='description' placeholder='Enter a description' />
                  <button>Submit</button>
              </div>
              )

        )
    }
});
```
Thuộc tính `ref` được sử dụng để tham chiếu đến phần tử trong component chức năng của nó tương tự như name. Thay vì tìm kiếm phần tử theo id hay class thì chúng ta sử dụng ref. Trong trường hợp này thì ref sử dụng để lấy giá trị của trường văn bản và gửi nó đến máy chủ.

Bây giờ chúng ta cần thay đổi một chút html của nút submit.
```html
<button onClick={this.handleClick}>Submit</button>
```
Khi chúng ta bấm submit hàm `handleClick()` sẽ được gọi. Và chúng ta phải định nghĩa nó trong tệp JavaScript.
```javascript
// app/assets/javascripts/components/_new_item.js.jsx

// var NewItem = …
handleClick() {
    var name    = this.refs.name.value;
    var description = this.refs.description.value;

   console.log('The name value is ' + name + 'the description value is ' + description);


},

//render()..
```
Bây giờ khi bấm submit bạn sẽ nhận được giá trị của các trường được nhập trong màn hình console của javascript. Ở đây bạn có thể thấy cách mà thuộc tính ref được sử dụng để lấy gía trị ra khỏi đầu vào. Nhưng bây giờ thay vì gửi giá trị cho giao diện console thì chúng ta sẽ gửi giá trị lên máy chủ:
```javascript
// app/assets/javascripts/components/_new_item.js.jsx

var NewItem = React.createClass({
  handleClick() {
    var name = this.refs.name.value;
    var description = this.refs.description.value;
    $.ajax({
      url: "/api/v1/items",
      type: "POST",
      data: { item: { name: name, description: description } },
      success: response => {
        console.log("it worked!", response);
      }
    });
  },
  render() {
    return (
      <div>
        <input ref="name" placeholder="Enter the name of the item" />
        <input ref="description" placeholder="Enter a description" />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }
});
```
Chúng ta sử dụng phương thức POST để gửi yêu cầu đến url cho các mục đang sử dụng `$.ajax` . Okey, chạy và thử chương trình nhé.

Bây giờ chúng ta cần khởi động lại trang danh sách để xem một item mới. Như chúng ta đã biết, chúng ta chỉ có thể gửi dữ liệu xuống component con. Điều này có nghĩa là phải di chuyển việc lưu trữ các items của `<AllItems/>` đến component cha là `<Body/>`. 

Tiếp theo chúng ta sẽ di chuyển `getInitialState()` và `componentDidMount()` từ component AllItems sang Body. Bây giờ, các mục sẽ được tìm nạp khi `<Body />` được tải. Chúng ta gửi các dữ liệu xuống các component con với `props`. Để sử dụng dữ liệu được truyền từ component cha sang component con chúng ta sử dụng `this.props`.

Dưới đây là cách chúng ta truyền dữ liệu từ component cha sang con:
```javascript
// app/assets/javascripts/components/_body.js.jsx

<AllItems items={this.state.items} />
```
Còn đây là cách để component con có thể sử dụng được dữ liệu đó:
```javascript
// app/assets/javascripts/components/_all_items.js.jsx

var items= this.props.items.map((item) => {
    ...
```
Chúng ta cũng có thể di chuyển các hàm cũng như các thuộc tính xuống component con. Hãy thử điều này với `handleSubmit()` trong `<NewItem />`. Bây giờ hãy di chuyển hàm nay sang component `Body`. 
```javascript
// app/assets/javascripts/components/_body.js.jsx

// getInitialState() and componentDidMount()

    handleSubmit(item) {
        console.log(item);
    },

// renders the AllItems and NewItem component
```
Để sử dụng hàm trong component con chúng ta làm như sau:
```javascript
// app/assets/javascripts/components/_body.js.js

<NewItem handleSubmit={this.handleSubmit} />
```
Trong `<NewItem />` chúng ta sẽ sửa lại như sau:
```javascript
// app/assets/javascripts/components/_new_item.js.jsx

handleClick() {
    var name    = this.refs.name.value;
    var description = this.refs.description.value;
    $.ajax({
        url: '/api/v1/items',
        type: 'POST',
        data: { item: { name: name, description: description } },
        success: (item) => {
            this.props.handleSubmit(item);
        }
    });
}
```
Bây giờ, khi bạn nhấp vào nút gửi, bảng điều khiển JavaScript sẽ ghi lại đối tượng mà chúng tôi vừa tạo. Bây giờ chúng ta chỉ cần thêm mục mới vào mảng items thay vì ghi nó vào console.
```javascript
// app/assets/javascripts/components/_body.js.jsx

// getInitialState() and componentDidMount()

    handleSubmit(item) {
        var newState = this.state.items.concat(item);
        this.setState({ items: newState })
    },

// renders the AllItems and NewItemcomponent
```
## Kết luận
Như vậy ở bài này chúng ta đã hoàn thành việc hiển thị dữ liệu và thêm một dữ liệu. Sang bài sau mình sẽ hoàn thành nốt việc sửa dữ liệu và xóa dữ liệu.

Cảm ơn các bạn đã theo dõi.

Tham khảo tại: https://www.pluralsight.com/guides/building-a-crud-interface-with-react-and-ruby-on-rails