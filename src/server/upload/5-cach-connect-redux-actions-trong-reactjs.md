![](https://images.viblo.asia/0fec4f77-bbdc-46ef-bc70-64a508d907c4.png)
## 1: Giới thiệu react-redux
> Redux là một thư viện cực kì đơn giản cho việc quản lý state và nó được tạo ra để làm việc với React một cách dễ dàng cho mọi người. Tuy nhiên, có rất nhiều trường hợp developer tuân theo 1 cách mù quáng những đoạn code sample để tích hợp chúng lại với nhau mà không hề hiểu nguyên nhân sâu xa bên trong
## 2: Ví dụ
Chúng ta sẽ bắt đầu xem một React Component với các action đơn giản là `sendMessage` và `deleteMessage`

```js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage, deleteMessage } from './actions'
class ChatComponent extends Component {
  handleSend = message => {
    this.props.sendMessage(message)
  }
  handleDelete = id => {
    this.props.deleteMessage(id)
  }
  render() {
    // ...
  }
}
const mapStateToProps = state => state
// ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽ ▽
```
Với vị dụ trên ta sẽ có các cách để connect và Dispatch một action .
# Cách 1: Wrap into Dispatch Manually
```js
const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(sendMessage(message)),
  deleteMessage: id => dispatch(deleteMessage(id)),
})
```
Với cú pháp trên thì sẽ có ưu nhược điểm đó là:
* Ưu điểm: full control và khá là dễ hiểu
* Nhược điểm: Nhìn rắc rồi và có thể dẫn đến quên cú pháp.
# Cách 2: Wrap into Dispatch Automatically with Connect
```js
const mapDispatchToProps = {
  sendMessage, // will be wrapped into a dispatch call
  deleteMessage, // will be wrapped into a dispatch call
};
```
Với cú pháp trên thì sẽ có ưu nhược điểm đó là:
* Ưu điểm: Cú pháp ngắn gọi truy xuất nhanh chóng qua các action.
* Nhược điểm: Toàn bộ các props sẽ được gói trong 1 dispatch. Không thể đưa các non-action vào trong props ở đây.
# Cách 3: Use bindActionCreators
```js
import { bindActionCreators } from 'redux'
// ...
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    sendMessage,
    deleteMessage,
  },
  dispatch,
)
```
Với cú pháp trên thì sẽ có ưu nhược điểm đó là:
* Ưu điểm: Có thể control được và không cần viết boilerplate cho toàn bộ các actio creator
* Nhược điểm: Phải dispatch rõ ràng.
# Cách 4: Use bindActionCreators and Extend the Props
```js
import { bindActionCreators } from 'redux'
// ...
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      sendMessage,
      deleteMessage,
    },
    dispatch,
  ),
  otherService, // this is not to be wrapped into dispatch
})
```
Với cú pháp trên thì sẽ có ưu nhược điểm đó là:
* Ưu điểm: Có thể mở rộng các props object mà không cần `dispatch()` toàn bộ
* Nhược điểm: Nhìn rắc rồi và có thể dẫn đến quên cú pháp.
# Cách 5: Wrap into Dispatch Automatically
```js
import * as messageActions from './messageActions'
import * as userActions from './userActions'
// ...
const mapDispatchToProps = {
  ...messageActions,
  ...userActions,
};
```
Với cú pháp trên thì sẽ có ưu nhược điểm đó là:
* Ưu điểm: full control và khá là dễ hiểu
* Nhược điểm:  Import và connect đến toàn bộ actions