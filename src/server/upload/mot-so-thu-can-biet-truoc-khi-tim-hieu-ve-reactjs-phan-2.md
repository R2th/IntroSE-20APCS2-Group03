Xin chào các bạn đã quay lại với series **Cùng nhau tìm hiểu về ReactJS, thư viện do Facebook phát triển**, nay mình sẽ tiếp tục nội dung của bài viết trước, bài viết này mình sẽ xoay quanh về **Props, State, Refs, Hangding Events**.
# I. Props
### Props là gì?
   -  là các thuộc tính của Component.
   -  có thể coi props như là phạm vi `public`, như biến toàn cục.
   -  Truyền dữ liệu từ cha -> con, theo dạng key="value" **không được đặt key = children, lát mình sẽ giải thích**
   -  Value nhận vào sẽ có kiểu dữ liệu là string, nếu muốn truyền đúng kiểu dữ liệu thì bỏ vào dấu **{}**
   -  Nhận lại thông qua từ khóa: **this.props.key**
   -  Nhận lại nội dung bên trong thẻ: **this.props.children**
   
Chúng ta đi vào ví dụ cho dễ hiểu nhá, mình lấy luôn ví dụ của bài trước:

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <Header />
                    <div className="row">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Content
                                    name="Coca cola"
                                    price="20,000 VND"
                                    image="https://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/Journey-brands-Product-Coca-Cola-Classic.jpg"
                                />
                                <Content
                                    name="Sprite"
                                    price="18,000 VND"
                                    image="https://cdn.shopify.com/s/files/1/1335/2603/products/sprite_330.jpg?v=1519188966"
                                />
                                <Content
                                    name="Fanta"
                                    price="25,000 VND"
                                    image="https://www.myamericanmarket.com/9281-large_default/fanta-orange.jpg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Drinks</h1>
         </div>
      );
   }
}

class Content extends React.Component {
    render() {
        return (
            <div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="thumbnail">
                        <img src={ this.props.image } />
                        <div className="caption">
                            <h3>{ this.props.name }</h3>
                            <p>{ this.props.price }</p>
                            <p>
                                <a className="btn btn-primary">Mua</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Ở trên mình mình có tập trung sửa 2 chỗ đó là trong component `Content` mình có gọi đến các **key** được gán ở trong component cha là `Example`. Các bạn quan sát thì thấy mình có đặt tên cho các key bên trong component `Content`, key này nó cũng như các thuộc tính của thẻ `html` thôi, khác là tên sẽ là do mình đặt, các bạn chạy thử và xem kết quả nhá.

Bây giờ mình sẽ giải thích tại sao lại không nên đặt tên là **children**, có một cách truyền dữ liệu khác có tên là **Props đặc biệt-children**, như các bạn đã biết trong HTML có 2 cách viết thẻ đó là:

   - HTML có 1 thẻ mở và 1 thẻ đóng `<Content />`
   - HTML cả đóng cả mở `<Content></Content>`

Ví dụ bây giờ ta sửa lại:
```js
....
<div className="container-fluid">
    <Header />
    <div className="row">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Content
                    price="20,000 VND"
                    image="https://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/Journey-brands-Product-Coca-Cola-Classic.jpg"
                >Coca cola</Content>
                <Content
                    price="18,000 VND"
                    image="https://cdn.shopify.com/s/files/1/1335/2603/products/sprite_330.jpg?v=1519188966"
                >Sprite</Content>
                <Content
                    price="25,000 VND"
                    image="https://www.myamericanmarket.com/9281-large_default/fanta-orange.jpg"
                >Fanta</Content>
            </div>
        </div>
    </div>
</div>

....

class Content extends React.Component {
    render() {
        return (
            <div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="thumbnail">
                        <img src={ this.props.image } />
                        <div className="caption">
                            <h3>{ this.props.children }</h3>
                            <p>{ this.props.price }</p>
                            <p>
                                <a className="btn btn-primary">Mua</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

```
Các bạn có để ý bây giờ mình đã xóa `key=name` trong component `Content` không? Và mình có sửa lại thành `<Content>Coca cola</Content>`. Ở dưới component `Content` thì thay vì gọi `this.props.name` thì mình thay thành `this.props.children`. Vậy **children** là gì?

Nội dung **Coca cola** trong component `Content` nó cũng chính là 1 `props`, tuy nhiên là 1 **props đặc biệt** và tên của props này là children, các bạn có thể sử dụng `this.props.children` để truy xuất tới phần tử nằm trong thẻ đóng và mở của component.

**Nếu các bạn đặt key là children như vậy sẽ sinh ra lỗi vì trùng lặp**

Vậy nếu như có 100 sản phẩm ta cũng phải gõ 100 thẻ Content như trên kia sao, không nhân tiện đây mình cũng muốn giới thiệu với các bạn hàm **map()** trong React, hàm map() là hàm sử dụng vòng lặp và nó sẽ copy cho bạn 1 array nào đó, các bạn xem qua ví dụ nhá:
```js
export default class Example extends Component {
    render() {
        var drinks = [
            {
                id: 1,
                name: 'Coca cola',
                price: '20,000 VND',
                status: true,
                image: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/Journey-brands-Product-Coca-Cola-Classic.jpg',
            },
            {
                id: 2,
                name: 'Sprite',
                price: '18,000 VND',
                status: false,
                image: 'https://cdn.shopify.com/s/files/1/1335/2603/products/sprite_330.jpg?v=1519188966',
            },
            {
                id: 3,
                name: 'Fanta',
                price: '25,000 VND',
                status: true,
                image: 'https://www.myamericanmarket.com/9281-large_default/fanta-orange.jpg',
            },
        ];

        let product = drinks.map((drink, index) => {
            let result = '';
            if(drink.status) {
                result = <Content
                            key = { drink.id }
                            price = { drink.price }
                            image = { drink.image }
                        >{ drink.name }</Content>
            }

            return result;
        });

        return (
            <div>
                <div className="container-fluid">
                    <Header />
                    <div className="row">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                { product }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
```
Ở trên mình có sửa lại component `Example` như sau: mình có tạo 1 biến là `drinks` để chứa tất cả sản phẩm, về sau ta sẽ lấy dữ liệu bên server và cũng cho vào 1 mảng như này, thứ 2 là mình `forEach` mảng drinks ra và kiểm tra xem phần tử nào có `status = true` thì cho hiển thị. Các bạn cứ copy code của mình chạy trước nhá, chạy được trước rồi mới bắt đầu hiểu sau còn hơn là không chạy được code rất dễ nản :v.
# II. Handing Events # 
Trước khi đi tìm hiểu về `State` mình muốn giới thiệu tới các bạn **Handing Events** và **Refs** trước, bởi vì nó sẽ mạch lạc và thực tế hơn!

Mình sẽ giới thiệu với các bạn sự kiện thông dụng nhất đó là `onClick`( các bạn có thể vào trang chủ của nó và xem các events nó hỗ trợ https://reactjs.org/docs/events.html#supported-events ). ĐƠn giản ở đây mình có 1 button và khi click vào sẽ hiển thị tên sản phẩm
```js
class Content extends React.Component {
    getName(name) {
        alert(name);
    }
    render() {
        return (
            <div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="thumbnail">
                        <img src={ this.props.image } />
                        <div className="caption">
                            <h3>{ this.props.children }</h3>
                            <p>{ this.props.price }</p>
                            <p>
                                <a className="btn btn-primary">Mua</a>
                                <button className="btn btn-warning" onClick={ () => {this.getName(this.props.children)} }>Chi tiet</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
```
Ở trên mình có sửa component `Content` như sau, mình có tạo thêm 1 hàm và nhận 1 tham số là `name` và alert nó ra, ở dưới mình sử dụng cú pháp của **arrow function** đó là `{ () => this.onClick(params)}`, ở trong cặp dấu ngoặc nhọn bạn có thể thể viết gì cũng đc bởi vì khi đó nó như là 1 hàm.

Nếu như các bạn truyền theo cú pháp:
```js
<button className="btn btn-warning" onClick={ this.getName(this.props.children) }>Chi tiet</button>
```
**Nó sẽ hiểu là 1 hàm và thực thi luôn ngay khi trình duyệt được tải** các bạn tự kiểm chứng nhá!
**Có 1 giải pháp đó là bạn gọi thông qua 1 hàm khác nhưng cách này sẽ rất bất tiện bởi vì bạn phải tạo thêm 1 hàm khác nên mình không nói tới cách này**

Còn 1 cách nữa mà không cần phải sử dụng arrow function đó là sử dụng **constructor**
```js
class Content extends React.Component {
    constructor(props) {
      super(props);

      this.getName = this.getName.bind(this);
    }

    getName() {
        alert(this.props.children);
    }
    render() {
        return (
            <div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="thumbnail">
                        <img src={ this.props.image } />
                        <div className="caption">
                            <h3>{ this.props.children }</h3>
                            <p>{ this.props.price }</p>
                            <p>
                                <a className="btn btn-primary">Mua</a>
                                <button className="btn btn-warning" onClick={ this.getName }>Chi tiet</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
```
Các bạn nên console.log(props) của **constructor** nên để biết nó chứa những gì nhá!

Ví dụ bây giờ bạn muốn nối thêm `price` thì đơn giản như sau:
```js
getName() {
   alert(this.props.children + '-' +this.props.price);
}
```
**Nếu bạn không sử dụng bind() nó sẽ báo lỗi luôn, bởi vì nó không truy cập được props và giá trị sẽ là null**

Có 1 cách các bạn không cần sử dụng hàm constructor nghĩa là cũng không cần sử dụng bind(), **nhưng mình không hiểu sao nó không sử dụng được với app laravel, mình viết ở app reactjs thì được?, bạn nào biết thì comment chỉ giúp mình nhá :D** luôn đó là:
```js
class Content extends React.Component {

    getName = () => {
        alert(this.props.children + ' - ' + this.props.price);
    }

    render() {
        return (
            <div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="thumbnail">
                        <img src={ this.props.image } />
                        <div className="caption">
                            <h3>{ this.props.children }</h3>
                            <p>{ this.props.price }</p>
                            <p>
                                <a className="btn btn-primary">Mua</a>
                                <button className="btn btn-warning" onClick={ this.getName }>Chi tiet</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
```
Đối với cách này sẽ giúp các bạn phải khai báo constructor và bind().
# III. Refs
  - refs dùng để lấy giá trị, ví dụ như (input, textarea,...)
  - cú pháp: cần phải gán **ref="key"**
  - lấy giá trị: **this.refs.key.value**

ví dụ bây giờ mình sửa component `Example` như sau:
```js
export default class Example extends Component {
    constructor(props) {
      super(props);
      this.AddProduct = this.AddProduct.bind(this);
    }

    AddProduct() {
        console.log(this.refs.name.value);
    }

    render() {
        var drinks = [
            {
                id: 1,
                name: 'Coca cola',
                price: '20,000 VND',
                status: true,
                image: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/Journey-brands-Product-Coca-Cola-Classic.jpg',
            },
            {
                id: 2,
                name: 'Sprite',
                price: '18,000 VND',
                status: false,
                image: 'https://cdn.shopify.com/s/files/1/1335/2603/products/sprite_330.jpg?v=1519188966',
            },
            {
                id: 3,
                name: 'Fanta',
                price: '25,000 VND',
                status: true,
                image: 'https://www.myamericanmarket.com/9281-large_default/fanta-orange.jpg',
            },
        ];

        let product = drinks.map((drink, index) => {
            let result = '';
            if(drink.status) {
                result = <Content
                            key = { drink.id }
                            price = { drink.price }
                            image = { drink.image }
                        >{ drink.name }</Content>
            }

            return result;
        });

        return (
            <div>
                <div className="container-fluid">
                    <Header />
                    <div className="row">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="">Ten san pham</label>
                                        <input type="text" className="form-control" ref="name" />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={ this.AddProduct }>Luu</button>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                { product }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
```
Các bạn để ý thì thấy mình thêm sự kiện `AddProduct` và có gán thuộc tính `ref` ở input nhá!

**Note**: facebook không khuyến khích sử dụng `refs`  dạng `string` nên để props ref={(node) => { this.node= node; }} , access = cách sử dụng this.node .

# IV. State
  - Là trạng thái của component.
  - Dùng để khai báo những `giá trị cần lưu trữ` của riêng component đó.
  - Có thể coi phạm vi của state như `private`.
  - Tạo state trong constructor. Gọi **this.state = { key1: value1, key2: value2,... }**.
  - Gọi state: **this.state.key**
  - Thay đổi state: **this.setState({ key1: value1, key2: value2,... })**
  - Khi setState được gọi => hàm render được gọi.

Mình đi vào ví dụ nhá, có lẽ sẽ thay đổi hơi nhiều các bạn copy code nhá:
```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinks: [
                {
                    id: 1,
                    name: 'Coca cola',
                    price: '20,000 VND',
                    status: true,
                    image: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/Journey-brands-Product-Coca-Cola-Classic.jpg',
                },
                {
                    id: 2,
                    name: 'Sprite',
                    price: '18,000 VND',
                    status: true,
                    image: 'https://cdn.shopify.com/s/files/1/1335/2603/products/sprite_330.jpg?v=1519188966',
                },
                {
                    id: 3,
                    name: 'Fanta',
                    price: '25,000 VND',
                    status: true,
                    image: 'https://www.myamericanmarket.com/9281-large_default/fanta-orange.jpg',
                },
            ],
            isActive: true
        };
    }

    render() {
        let product = this.state.drinks.map((drink, index) => {
            let result = '';
            if(drink.status) {
                result = <tr key = { index }>
                            <td>{ index }</td>
                            <td>{ drink.name }</td>
                            <td>
                                <span className="label label-success">{ drink.price }</span>
                            </td>
                        </tr>
            }

            return result;
        });

        return (
            <div>
                <div className="container-fluid">
                    <Header />
                    <div className="row">
                        <div className="row">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ten san pham</th>
                                        <th>Gia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { product }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
```
Ở trên, trong constructor mình có khai báo 1 state là `drinks` và for nó ra cũng gần giống bài trước. Các bạn lưu ý khi gọi state thì phải đúng cú pháp nhá `this.state.tên_state`

Rồi, vậy bây giờ làm thế nào để mình thay đổi giá trị của state? Các bạn đọc lại ở phía trên nhá, để thay đổi ta sử dụng cú pháp `this.setState({ key : value,... }).`

```js
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.onSetState = this.onSetState.bind(this);
        this.state = {
            drinks: [
                {
                    id: 1,
                    name: 'Coca cola',
                    price: '20,000 VND',
                    status: true,
                    image: 'https://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/Journey-brands-Product-Coca-Cola-Classic.jpg',
                },
                {
                    id: 2,
                    name: 'Sprite',
                    price: '18,000 VND',
                    status: true,
                    image: 'https://cdn.shopify.com/s/files/1/1335/2603/products/sprite_330.jpg?v=1519188966',
                },
                {
                    id: 3,
                    name: 'Fanta',
                    price: '25,000 VND',
                    status: true,
                    image: 'https://www.myamericanmarket.com/9281-large_default/fanta-orange.jpg',
                },
            ],
            isActive: true
        };
    }
    onSetState() {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        let product = this.state.drinks.map((drink, index) => {
            let result = '';
            if (this.state.isActive === true) {
                if(drink.status) {
                    result = <tr key = { index }>
                                <td>{ index }</td>
                                <td>{ drink.name }</td>
                                <td>
                                    <span className="label label-success">{ drink.price }</span>
                                </td>
                            </tr>
                }
            }

            return result;
        });

        return (
            <div>
                <div className="container-fluid">
                    <Header />
                    <div className="row">
                        <div className="row">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Ten san pham</th>
                                        <th>Gia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { product }
                                </tbody>
                            </table>
                            <button type="button" className="btn btn-info" onClick={ this.onSetState }>
                                Active: { this.state.isActive === true ? 'true' : 'flase' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
```
Ở trên mình có thêm 1 nút button, khi click vào sẽ set lại state.isActive là trạng thái ngược lại, các bạn xem qua nhá!


# V. Sự khác nhau giữa Props và State #
Qua các ví dụ trên mình tổng hợp lại theo cách hiểu của mình như sau:

**Props**:
  - Nhận dữ liệu từ bên ngoài (public)
  - Không thể thay đổi giá trị
  
**State**:
  - Dữ liệu nội bộ
  - Có thể thay đổi giá trị
  - Phạm vi private trong component đó
  
Cảm ơn mọi người đã đọc được tới đây!!! Nếu có thắc mắc gì mọ người comment phía dưới nhá!