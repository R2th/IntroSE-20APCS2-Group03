Xin chào tất cả mọi người, sau một kì nghỉ tại Quảng Ninh với nhiều kỉ niệm. Quay trở lại với công việc hôm nay chúng ta cùng tìm hiểu về **PropTypes trong ReactJs**.

**1) Vậy PropTypes là gì???**

**PropTypes** là một cách tốt để xác thực đầu vào của `component`. Hơn nữa nếu một ai đó muốn sử dụng `component` của bạn, nó cung cấp một cái nhìn tổng quan cho tất cả các `props` và loại dữ liệu của nó. Việc sử dụng `PropTypes` là rất hữu dụng nó tránh được những lỗi khó chịu và cải thiện được tính tái sử dụng `component` của bạn rất nhiều (Hiểu một cách đơn giản `PropTypes` là: Giúp chúng ta kiểm tra các kiểu dữ liệu của các `props` mà component (hoặc container) nhận vào).

**2) Tại sao lại phải sử dụng PropTypes???**

Sử dụng `PropTypes` sẽ mang lại cho chúng ta một số lợi ích như sau:

- Bạn có thể dễ dàng kiểm tra được các kiểu dữ liệu của `props` mà `component` nhận được.
- Khi sử dụng lại các component có `PropTypes` dễ dàng biết rõ các loại dữ liệu của props truyền vào để truyền vào cho đúng.
- Có thể đăt giá trị mặc định cho props thông qua `defaultProps`.

**3) Cách sử dụng PropTypes**

Để sử dụng `PropTypes` đầu tiên chúng ta phải cài đặt thông qua `npm` bằng cú pháp như sau:

```js
npm install --save prop-types
```

Sau đó, chúng ta thêm:
```
import PropTypes from 'prop-types';
```

Vào trong component mà chúng ta muốn `PropTypes` cho nó.

Ví dụ:

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from './../components/Products';
import Product from './../components/Product';
import PropTypes from 'prop-types';
import { actAddToCart, actChangeMessage } from './../actions/index';

const propTypes = {
    products : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            name : PropTypes.string.isRequired,
            description : PropTypes.string.isRequired,
            image : PropTypes.string.isRequired,
            price : PropTypes.number.isRequired,
            inventory : PropTypes.number.isRequired,
            rate : PropTypes.number.isRequired
        })
    ).isRequired, // product nhan vao phai la array .isRequied la yeu cau phai co
    onChangeMessage : PropTypes.func,
    onAddToCart : PropTypes.func
};

const defaultProps = {
    onChangeMessage: () => {},
    onAddToCart: () => {}
};

class ProductsContainer extends Component {
    render() {
        var { products } = this.props;

        return (
            <Products>
                { this.showProducts(products) }
            </Products>
        );
    }
    
    showProducts (products) {
        var result = null;
        var { onAddToCart, onChangeMessage } = this.props;

        if (products.length > 0) {
            result = products.map((product ,index) => {
                return <Product 
                    key={index} 
                    product={product} 
                    onAddToCart = { onAddToCart }
                    onChangeMessage = { onChangeMessage }
                />
            });
        }

        return result;
    }
}

ProductsContainer.propTypes = propTypes;
ProductsContainer.defaultProps = defaultProps;

const mapSateToProps = (state) => {
    return {
        products : state.products // lay du lieu tren store gan vao this.props.products
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart : (product) => {
            dispatch(actAddToCart(product, 1));
        },
        onChangeMessage : (message) => {
            dispatch(actChangeMessage(message));
        }
    }
}

export default connect(mapSateToProps, mapDispatchToProps)(ProductsContainer);
```

Nhìn vào đoạn code trên ta thấy container này nhận vào 3 props đó chính là **products**, **onAddToCart**, **onChangeMessage**

- **products** là một mảng dữ liệu thì chúng ta khai báo `PropTypes.arrayOf()` và muốn định nghĩa cho từng thành phần trong mảng đó thì ta chỉ cần viết là:

```js
PropTypes.arrayOf(
    PropTypes.shape({})
 )
```

Vì trong mảng products chứa là một danh sách các đối tượng nên ta khai báo là: `PropTypes.shape({})` nếu bên trong mảng không phải là các đuối tượng mà là kiểu `number` hoặc `string` thì chúng ta chỉ cần khai báo là `PropTypes.number` hoặc `PropTypes.string`. chắc các bạn thắc mắc các `shape({})`, `number`, `string` kia ở đâu ra thì bạn hay truy cập vào [đây](https://reactjs.org/docs/typechecking-with-proptypes.html).

Trong mảng **products** trên chúng ta nhận vào là một mảng các đối tượng và trong các đối tượng đó chúng ta lại có các property nếu muốn khai báo `propTypes` cho từng property của đối tượng đó thì chúng ta có thể viết như sau:

```js
products : PropTypes.arrayOf(
    PropTypes.shape({
        id : PropTypes.number.isRequired,
        name : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired,
        image : PropTypes.string.isRequired,
        price : PropTypes.number.isRequired,
        inventory : PropTypes.number.isRequired,
        rate : PropTypes.number.isRequired
    })
).isRequired
```

Như vậy, chúng ta có thể  `propTypes` cho từng property trong đối tượng đó. Chắc hăn giờ các bạn thắc mắc **isRequired** kia là cái gì??? **isRequired** chính là bạn muốn ai đó sử dụng `component` của bạn bắt buộc phải truyền một số `props` nào đó thì bạn chỉ cần thêm **isRequired** vào.

- **onChangeMessage, onAddToCart** là các function mà `container` nhận vào, muốn `PropTypes` cho nó rất đơn giản chúng ta chỉ cần:

``` js
const propTypes = {
    onChangeMessage : PropTypes.func,
    onAddToCart : PropTypes.func
};
```

Nhìn vào đoạn code trên chúng ta lại đăt ra câu hỏi là tại sao không thấy **isRequired** cho các props đó. Là vì khi các `props` đó không bắt buộc nên ta không cần phải thêm vào nhưng trong React khi mà `props` không có **isRequired** thì chúng ta phải khai báo một giá trị mặc định cho nó nếu không sẽ bị cảnh báo lỗi.

Để khai báo giá trị mặc định cho `props` chúng ta khai báo như sau:

```js
const defaultProps = {
    onChangeMessage: () => {},
    onAddToCart: () => {}
};
```

Vậy là chúng ta đã khai báo xong giá trị mặc định cho `props` đó.


**4) Kết luận**

Trên đây là chút kiến thức mình tìm hiểu được về PropTypes trong ReacJS. Rất mong được sự góp ý của mọi người.

Cảm ơn mọi người đã xem bài viết của mình. :D


**Nguồn tham khảo:**

- https://reactjs.org/docs/typechecking-with-proptypes.html
- https://viblo.asia/p/react-proptypes-khai-bao-kieu-du-lieu-cho-component-naQZR1aPKvx