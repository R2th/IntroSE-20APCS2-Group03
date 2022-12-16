## Giới thiệu
Chào các bạn, bài viết này mình sẽ chia sẻ hai khái niệm (function) chính mình sẽ làm việc, chạm mặt rất nhiều lần trong một ứng dụng React và Redux các bạn nhé, đó chính là `connect()`  và `mapStateToProps()`. Mình hi vọng qua bài viết này, đâu đó giúp cho các bạn mới bắt đầu với React và Redux sẽ hiểu sâu hơn về khái niệm, luồng xử lí của hai hàm này, qua đó có cách tiếp cận nhanh hơn, hiệu qủa hơn khi làm việc với React và Redux.

## Phân tích
Trước khi đi vào phân tích cụ thể hai khái niệm chính này: `connect()` và `mapStateToProps()`, mình sẽ review lại một chút về một thành phần quan trọng bậc nhất của redux, đó chính là `store`.

`store` trong redux là một cái thúng chứa (box), nơi chứa tất cả `state` của ứng dụng. Các bạn có thể tưởng tượng cái thùng chứa này có vị trí không xác định.

Các `component` của ứng dụng cần lấy một số thứ ra khỏi cái thùng chứa này, nhưng mỗi một `component` chúng chỉ cần một số thứ trong cái thùng chứa đó thôi. Các `component` biết chúng cần lấy những gì nhưng chúng không thể biết vị trí của thùng chứa.

Vì vậy mà `mapStateToProps()` và `connect()` được sinh ra. Chúng làm gì:

Hàm `mapStateToProps` là một bộ lọc (filter) sử dụng để lấy (select) những thứ trong cái thùng chứa mà `component` yêu cầu. Những thứ được select trở thành `properties` của `component`. Nhưng `mapStateToProps()` thôi là chưa đủ, bởi vì hàm này chỉ lấy được những thứ được yêu cầu trong thùng chứa mà không biết được thùng chứa đó nằm ở đâu. `connect()` sẽ làm điều còn thiếu, hàm này biết vị trí của thùng chứa và truyền (pass) nó vào hàm `mapStateToProps`. Vì vậy, `component` có thể lấy được chính xác những gì nó cần.

Ví dụ:

```Javascript
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

## Kết luận

Nội dung bài viết là kiến thức mình lượm nhặt được trong quá trình tìm hiểu về React và Redux. 

Các bạn có thể tìm hiểu thêm về hai hàm này tại đây nhé: https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md

Chúc các bạn học tốt !