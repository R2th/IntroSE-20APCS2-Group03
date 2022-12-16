> Hello mọi người, hôm nay mình xin mạn phép chia sẻ một chút kiến thức về `Selectors`, `Reselect` mà mình vừa tìm hiểu được, vì mình chỉ vừa tìm hiểu được nên chắc còn khá nhiều thiếu sót nên hy vọng có thể nhận được những lời nhận xét bổ ích của mọi người nhé. Okay, chúng ta bắt đầu nào!

### Selectors là gì?
Nói một cách đơn giản, `Selectors`  một đoạn logic được sử dụng để tính toán ra một giá trị nào đó từ các giá trị có sẵn trong `Store` hoặc chỉ đơn giản là lấy một giá trị có sẵn trong `Store`.

Ví dụ: Hãy tưởng tượng bạn đang trong một cửa hàng quần áo lớn và đang tìm kiếm váy. Bạn nhờ một nhân viên cửa hàng giúp đỡ. Cô ấy biết nơi có thể tìm thấy váy để cô ấy đi và lấy chúng cho bạn. Trong ví dụ này, nhân viên cửa hàng đóng vai trò là một `selector`.

Ví dụ trên có thể viết lại như sau:

```js
const getDress = (state) => state.stores.dress
```


### Tại sao dùng Selectors?
Vậy tại sao chúng ta nên sử dụng `selectors` ?

-  `Selectors` giúp chúng ta dễ dàng lấy hoặc tính toán một giá trị có sẵn trong `Store`.
- Một `selectors` sẽ không tính toán lại trừ khi một trong các đối số của nó thay đổi.
- `Selectors` dễ dàng tái sử dụng, và nó có thể sử dụng để làm đầu vào cho các `selector` khác.

```js
// Select dresses from the store without use of selectos
class DisplayDressese extends React.Component {
  render() {
    return this.props.dresses.map(dress => <img src={dress.imgUrl} />)
  }
}

const mapStateToProps = state => {
  return {
    dresses: state.items.dresses
  }
}
```

Điều gì xảy ra nếu có một component khác cũng cần sử dụng `state.items.dresses`

```js
const getDresses = (state) => state.shop.items.dresses;

// in DisplayDressese.js
class DisplayDressese extends React.Component {
  render() {
    return this.props.dresses.map(dress => <img src={dress.imgUrl} />);
  }
}

const mapStateToProps = state => {
  return {
    dresses: getDresses(state)
  }
}
```

Trong ví dụ trên, bạn có thể thấy rằng bộ chọn cơ bản, `getDresses` chỉ là một `function` trả về một `state` được chỉ định (trong trường hợp này là dress). Nếu trong tương lai, bạn muốn tái cấu trúc lại cửa hàng thì bạn chỉ cần cập nhật lại function `getDresses`.

### Tại sao sử dụng Reselect để tạo selectors?
`Reselect` giúp cải thiện `performance` vì nó cung cấp một cách để tạo `selectors` được ghi nhớ và chỉ tính toán lại khi đầu vào của chúng thay đổi. Điều này có lợi trong các ứng dụng phức tạp được cấu trúc để có thể lưu trữ một cách tối thiểu nhất có thể và do đó dựa vào `selectors` để tính toán dữ liệu dẫn xuất (như `filtering`, `reducing`,, v.v.) có thể là các hoạt động phức tạp.


```js
const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = state => {
  const items = shopItemsSelector(state)
  return items => items.reduce((acc, item) => acc + item.value, 0)
}

const taxSelector = state => {
  const subtotal = subtotalSelector(state)
  const taxPercent = taxPercentSelector(state)
  return (subtotal, taxPercent) => subtotal * (taxPercent / 100)
}

export const totalSelector = state => {
  const subtotal = subtotalSelector(state)
  const tax = taxSelector(state)
  return (subtotal, tax) => ({ total: subtotal + tax })
}
```

### Cú pháp của Reselect
`Reselect` cung cấp function `createSelector()` dùng để tạo bộ nhớ cho các bộ chọn.  Khi tạo một `selector`, lệnh tạo có cấu trúc cơ bản như sau:

```
createSelector(...inputSelector | [inputSelectors], resultFunc)
```

Để hiểu rõ hơn, chúng ta cùng quan sát ví dụ dưới đây nhé:

```js
import { createSelector } from 'reselect'

const shopItemsSelector = state => state.shop.items
const taxPercentSelector = state => state.shop.taxPercent

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
)

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)
```

Như các bạn có thể thấy  `createSelector` là lệnh dùng để tạo `selector` với 2 tham số chính:

*  Tham số đầu tiên là các `funtion` được gọi trong `selector`.
*  Tham só thứ 2 là một `funtion` dùng để tính toán dữ liệu trả ra của `selector` với các tham số đầu vào là các giá trị trả về của các `funtion` trong tham số đầu tiên.

### Sử dụng Reselect

Để lấy `state` trong một `component`:

```js
import {totalSelector} from 'path/to/selector'

class Inventory extends React.Component {
  render() {
    return <h1>`The shop's total inventory is: ${this.props.inventoryValue}`</h1>
  }
}

const mapStateToProps = (state) => {
  return {
    inventoryValue: totalSelector(state)
  }
}
```

Đây là trường hợp sử dụng cơ bản nhất và được triển khai giống như cách bạn sẽ sử dụng `selector` được tạo ra với `Reselect`.

***Thay thế hàm mapStateToProps bằng selector***

Là một công cụ nâng cao `performance`, hơn nữa có thể thay thế `MapStateToProps` bằng `selector` để cắt giảm số lần `re-rendered`.

```js
import {totalSelector} from 'path/to/selector'
import {createSelector} from 'reselect'

class Inventory extends React.Component {
  render() {
    return <h1>`The shop's total inventory is: ${this.props.inventoryValue}`</h1>
  }
}

const mapStateToPropsSelector = createSelector(
  totalSelector,
  (total) => {
    return {inventoryValue: total}
  }
)
```

***Sử dụng CreateStructuredSelector***

```js
import {subtotalSelector, taxPercentSelector, taxSelector, totalSelector} from 'path/to/selector'
import {createStructuredSelector} from 'reselect'

class Inventory extends React.Component {
  render() {
    return (
      <h1>`The shop's total inventory is: ${this.props.inventoryValue}`</h1>
      <h3>`The shop's subtotal inventory is ${this.props.inventorySubtotal}`</h3>
      <h3>`The shop's tax percent is ${this.props.taxPercent}`</h3>
      <h3>`This shop's total tax percent is ${this.props.totalTaxPercent}`</h3>
    )
  }
}

const mapStateToPropsSelector = createStructuredSelector({
  inventorySubtotal: subtotalSelector,
  inventoryValue: totalSelector,
  taxPercent: taxPercentSelector,
  totalTaxPercent: taxSelector
})
```

### Truyền đối số cho một selector

***Truyền một đối số là props:***

```js
// In a selector file
import { createSelector } from 'reselect'

const getShopItemsByCategory = (state, props) =>
  state.shop.items[props.category]

const getInStockShopItems = createSelector(
  getItemsByCategory,
  (items) => items.filter(item => item.in_stock)
)

// Used in a component
class ShopItems extends React.Component {
  // display shop items
}
const mapStateToProps = (state, props) => {
  return {
    itemsInStock: getInStockShopItems(state, props)
  }
}
```

***Truyền một đối số là giá trị động:***

```js
import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const expensiveSelector = createSelector(
  state => state.items,
  items => memoize(
    minValue => items.filter(item => item.value > minValue)
  )
)

const expensiveFilter = expensiveSelector(state)
```

### Tổng kết

Với những lợi ích mà `Reselect` mang lại không có lí do gì mà không áp dụng liền vào những dự án của chính mình các bạn nhỉ. Hy vọng sẽ giúp ích cho các bạn. Hẹn gặp lại các bạn ở các bài chia sẻ tiếp theo nhé.


![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)