React, Redux, Reselect là nhưng thư viện tuyệt vời. Và khi sử dụng 3 thư viện với nhau thì nó sẽ rất tuyệt để xây dựng một ứng dụng. Và trong bài viết này chúng ta sẽ đi tìm hiểu cách thức làm việc giữa 3 thư viện đó với nhau.
Trước hết chúng ta phải dùng lệnh để cài đặt Reselect trên NodeJS
```markdown
npm install --save reselect
```
Và trước đó. chúng ta cần phải có kiên thức cơ bản về React, Redux và Redux-Connect.

**Reselect tạo các bô nhớ cho các bộ chọn**
Đây là một trong những điều tuyệt với của Reselect, nó có thể  tạo các bộ chọn với dữ liệu trong các bộ chon khác.
Khi tạo một selector,lệnh tạo có cấu trúc cơ bản như sau:
```sql
createSelector(...inputSelector | [inputSelectors], resultFunc)
```
createSelector là lệnh dùng để tạo selector với 2 tham số chính:
- Tham số đầu tiên là các funtion được gọi trong selector.
- Tham só thử 2 là một funtion dùng để tính toán dữ liệu trả ra của selector với các tham số đầu vào là các giá tri trả về của các funtion trong tham sô đầu tiên.
Chúng ta có thể tao một selector như sau
```
const totalSelector = createSelector(
  [
    state => state.values.value1,
    state => state.values.value2
  ],
  (value1, value2) => value1 + value2
)
```
Để hiểu rõ hơn, chúng ta sử dụng nó trong ứng dụng, cụ thể như sau
Tạo một file selector.js dùng để lưu thông tin của selector
```
import { createSelector } from 'reselect'
// selector
const getCustomers = (state) => state.customers
// reselect function
export const getCustomersState = createSelector(
  [ getCustomers ],
  (customers) => customers
)
```
dữ liệu được lấy ra từ selector sẽ được map vào prop của component, trong một funtion gọi là `mapStateToProps`
```
import React from 'react'
import { connect } from 'react-redux'
import { getCustomersState } from '../selectors'
const mapStateToProps = (state) => {
  return {
    customers: getCustomersState(state)
  }
}
class CustomerList extends React.Component {
  ...
}
export default connect(mapStateToProps)(CustomerList)
```
Chúng ta thấy function getCustomersState(state) sẽ thay thế việc gọi state.customers, state sẽ được đưa vào funtion getCustomersState, `getCustomersState` sẽ gọi hàm `getCustomers` với state là tham số, `getCustomers` sẽ lấy dữ liệu customers trong state và trả về, chúng ta sẽ dùng các dữ liệu đó trong các function của selector, Reselect sẽ xử lý việc ghi nhớ này.
Trong Redux, bất cứ một action nào có thể được gọi tại bất cứ nơi nào trong ứng dụng, tất cả các components được gắn kết và kết nối đều gọi hàm mapStateToProps. Đây là lý do tại sao `Reselect` là tuyệt vời. Nó sẽ trả về kết quả đã ghi nhớ nếu không có thành phần nào thay đổi.

**Sử dụng nâng cao**

Trong một ứng dụng react thực tế, chúng ta nhất định cần thông tin của một state object trong nhiều components. Chúng ta cũng sẽ muốn chuyển các props vào trong các selectoe. Để làm điều này, chúng ta cần phải tạo ra một chức năng `Reselect` có thể được sử dụng trên nhiều trường hợp của cùng một thành phần trong cùng một lúc… ,trong khi các selector được ghi nhớ đúng cách.

Do vậy, chúng ta cần thay đổi `selectorFunction` thành một hàm ẩn danh, có thê trả về các selectorFunction.
```javascript
import { createSelector } from 'reselect'

const getCustomer = (state, props) => {
  const id = props.id
  const customerById = state.customers.find((item,i) => item.id === id)
  return customerById
}
export const makeGetCustomerState = () => createSelector(
  [ getCustomer ],
  (customer) => customer
)

```
Bây giờ khi chúng ta gọi hàm makeGetCustomerState, chúng ta sẽ nhận được một khởi tạo của hàm createSelector. Và chúng ta có thể dùng như sau
```javascript
import React from 'react'
import { connect } from 'react-redux'
import { makeGetCustomerState } from '../selectors'

const makeMapStateToProps = () => {
 const getCustomerState = makeGetCustomerState()
 const mapStateToProps = (state, props) => {
   return {
      customer: getCustomerState(state, props)
   }
  }
 return mapStateToProps
}
class CustomerList extends React.Component {
  ...
}
export default connect(makeMapStateToProps)(CustomerList)
```