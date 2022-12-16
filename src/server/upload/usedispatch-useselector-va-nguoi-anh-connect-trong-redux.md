Tháng 9 ghé qua với những cơn gió héo hon rụng giữa lòng mình và miền Trung đầy nắng gió, lác đác sắc lá vàng nhuộm rơi. Đà Nẵng đang độ giao mùa, hương gió nhẹ mang theo mùi chồi non phảng phất khắp các ngả đường, nghe rõ được cả mùi nắng vàng chín mượt trên vòm cây, tán lá... Chợt nhớ đến nắng và gió của Đà Lạt cũng làm hồn mình ngập tràn kỉ niệm. Mình đã định lên kế hoạch để lang thang ở xứ sở sương mù, một nơi mà giúp con người ta có thể bỏ quên đi những bận bịu, mớ tâm tư trong lòng để thư giãn và tìm kiếm vài khoảnh khắc bình lặng. Ấy vậy mà Viblo đã nhắc nhở mình tháng này đừng quên chia sẻ, thế là mình đành bỏ lại dự định rong chơi để ngồi viết một bài gửi đến các bạn.

Hôm nay, vẫn là chủ đề về React mình xin gửi đến các bạn 2 hooks khá thú vị đó là `useDispatch` và `useSelector`, 2 thanh niên này có thể thay thế được HOC `connect()` không. Các bạn hãy cùng xem nhé.

Từ phiên bản `react-redux` đã cho ra đời 2 em hooks thần thánh là `useSelector` và `useDispatch`. Trước đây thì ta có `connect()` – một Higher Order Component (HOC) giúp chúng ta nhận `state` và `dispatch action` từ `store` tại component thay thế cho hàm `connect`. Hiện tại một vài dự án của mình cũng đang sử dụng 2 em này.

![](https://beagledigital.com.au/wp-content/uploads/2019/12/react-JS-image.jpg)

## 1. Cấu trúc thư mục
![](https://images.viblo.asia/e5585a71-5065-424b-b7f3-0c0a20fa1c79.png)

```js
// file: store/store/store.js
--------------------------------------

import { createStore } from 'redux';
import { rootReducer } from './reducer';
export const store = createStore(rootReducer);
```

```js
// file: store/reducer.js
--------------------------------------

const initialState = {
  isOpen: true,
  products: [
    {
      id: '1a',
      name: 'Macbook Pro',
      quantity: 3,
    },
    {
      id: '2b',
      name: 'Iphone X',
      quantity: 6,
    },
    {
      id: '3c',
      name: 'Apple Watch',
      quantity: 4,
    },
  ],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };

    case 'TOGGLE_OPEN_SHOP':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
};

```

```js
// file: store/actions.js
--------------------------------------

export const addToCart = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
};

export const toggleOpenShop = () => {
  return {
    type: 'TOGGLE_OPEN_SHOP',
  };
};
```

## 2. So sánh giữa connect và các hooks
### Connect
Ở ví dụ này mình sẽ sử dụng HOC `connect()` để lấy `state` và `dispatch action`

```js
// file: App.js
--------------------------------------

import React from 'react';
import { connect } from 'react-redux';
import { toggleOpenShop } from './store/actions';
import ProductList from './components/ProductList';
import ProductListHook from './components/ProductListHook';

const App = (props) => {
  const { isOpen, toggleOpenShop } = props;

  return (
    <>
      <div>
        <h1>{isOpen ? 'OPEN' : 'CLOSE'}</h1>
        <button onClick={toggleOpenShop}>
          {isOpen ? 'open' : 'close'} shop
        </button>
      </div>
      <ProductList />
      <ProductListHook />
    </>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.isOpen,
});

const mapDispatch = {
  toggleOpenShop,
};

export default connect(mapStateToProps, mapDispatch)(App);
```

```js
// file: components/ProductList.js
--------------------------------------

import React from 'react';
import ProductItem from './ProductItem';
import { connect } from 'react-redux';
import { addToCart } from '../store/actions';

const  ProductList = ({ productList, addToCart }) => {
  return (
    <>
      <h2 className="title">ProductList use connect Redux</h2>
      <div className="product-list">
        {productList.map((productItem) => (
          <ProductItem
            key={productItem.id}
            productItem={productItem}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  productList: state.products,
});

const mapDispatch = {
  addToCart,
};

export default connect(mapStateToProps, mapDispatch)(ProductList);
```

```js
// file: components/ProductListHook.js
--------------------------------------

import React from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';

export default ProductListHook = () => {
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const dispatchAddToCart = (product) => dispatch(addToCart(product));

  return (
    <>
      <h2 className="title">ProductList use hook Redux</h2>
      <div className="product-list">
        {productList.map((productItem) => (
          <ProductItem
            key={productItem.id}
            productItem={productItem}
            addToCart={dispatchAddToCart}
          />
        ))}
      </div>
    </>
  );
};
```

```js
// file: component/ProductItem.js
--------------------------------------

import React from 'react';

export default ProductItem = ({ productItem, addToCart }) => {
  return (
    <div className="product-item">
      <div className="product-item-title">{productItem.name}</div>
      <div className="product-item-quantity">
        <span>x{productItem.quantity}</span>
        <button
          onClick={() => addToCart(productItem)}
          disabled={productItem.quantity === 0}
        >
          Mua sản phẩm
        </button>
      </div>
    </div>
  );
};
```

### - useSelector là gì?
Hook này cho phép chúng ta lấy `state` từ Redux store bằng cách sử dụng một `selector function` làm tham số đầu vào.  Trong đoạn code phía trên bạn thấy thì mình có trả về mảng products từ store.
Mặc dù nó thực hiện công việc như `mapStateToProps` nhưng nó vẫn có một số khác biệt mà bạn cần phải quan tâm.

- `mapStateToProps` chỉ return về 1 object, còn `useSelector` có thể return bất cứ giá trị nào
- Khi **dispatch một action**, `useSelector` sẽ thực hiện **so sánh tham chiếu** với giá trị được return  trước đó và giá trị hiện tại. Nếu chúng khác nhau, component sẽ bị re-render. Nếu chúng giống nhau, component sẽ không re-render.
`mapStateToProps` là một function sẽ luôn được chạy lại mỗi khi store có một sự thay đổi bất kì nào trong đó. Với `mapStateToProps`, tất cả các trường được return lại thành một dạng object kết hợp. Vậy nên mỗi khi `mapStateToProps` chạy thì nó sẽ return về một object với tham chiếu mới. Hàm `connect()` sẽ thực hiện so sánh nông với object mà `mapStateToProps` trả về, nếu khác nhau thì sẽ re-render lại component. Tức hiểu cặn kẽ hơn là so sánh tham chiếu (so sánh ===) các trường bên trong object mà `mapStateToProps` trả về, chỉ cần 1 trường khác nhau là sẽ bị coi là khác nhau.

Thoạt nhìn cách so sánh `useSelector` vs `connect()` có khác nhau 1 tẹo nhưng nếu ta khai báo nhiều `useSelector` cho mỗi state khác nhau thay vì gom lại một cục object duy nhất thì cách so sánh lại tương đương với `connect()`.
`useSelector` có một nhược điểm là khi một component thay đổi, nó khiến cho toàn bộ cây component phải render lại và việc này gây ảnh hưởng đến performance. Để tránh việc re-render nhiều lần các bạn có thể dùng một HOC là `React.memo()`.

### - useDispatch là gì?

Hook này đơn giản chỉ là return về một tham chiếu đến **dispatch function** từ Redux store và được sử dụng để dispatch các action. Nhưng sẽ có vài điều mà mình cần cho các bạn biết.

```js
// file: components/ProductListHook.js
--------------------------------------

import React from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';

const ProductListHook = () => {
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const dispatchAddToCart = (product) => dispatch(addToCart(product));
  return (
    <>
      <h2 className="title">ProductList use hook Redux</h2>
      <div className="product-list">
        {productList.map((productItem) => (
          <ProductItem
            key={productItem.id}
            productItem={productItem}
            addToCart={dispatchAddToCart}
          />
        ))}
      </div>
    </>
  );
}

export default React.memo(ProductListHook);
```

Ở `ProductListHook.js` component thì sẽ thấy một anonymous function được truyền xuống là `dispatchAddToCart` xuống cho `ProductItem` component.

```js
// file: components/ProductItem.js
--------------------------------------

import React from 'react';

const ProductItem = ({ productItem, addToCart }) => {
  return (
    <div className="product-item">
      <div className="product-item-title">{productItem.name}</div>
      <div className="product-item-quantity">
        <span>x{productItem.quantity}</span>
        <button
          onClick={() => addToCart(productItem)}
          disabled={productItem.quantity === 0}
        >
          Mua sản phẩm
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductItem);

```

```js
// file: components/ProductListHook.js
--------------------------------------

import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/actions';

const ProductListHook = () => {
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const dispatchAddToCart = useCallback(
    (product) => dispatch(addToCart(product)),
    [dispatch]
  );
  
  return (
    <>
      <h2 className="title">ProductList use hook Redux</h2>
      <div className="product-list">
        {productList.map((productItem) => (
          <ProductItem
            key={productItem.id}
            productItem={productItem}
            addToCart={dispatchAddToCart}
          />
        ))}
      </div>
    </>
  );
}

export default React.memo(ProductListHook);

```

## 3. Tổng quan
### Ưu nhược điểm của hooks useDispatch và useSelector
- Không còn `connect()` HOC nên ít node trong hệ thống component hơn.
- Mất tính năng tự động `memo` mà `connect()` cung cấp.
- Thoạt nhìn cứ tưởng đơn giản, nhưng cuối cùng lại dài dòng hơn.

### Lời khuyên
Mình nghĩ nên dùng hooks hơn, React đã đưa ra hooks sẽ còn cải thiện nhiều. Việc sử dụng 2 hooks trên cũng khá phổ biến và tối ưu.

Bài viết của mình được tham khảo tại: https://link.sun-asterisk.vn/4147YT