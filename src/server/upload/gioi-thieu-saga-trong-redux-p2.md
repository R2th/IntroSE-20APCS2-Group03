> Trong phần trước mình đã giới thiệu với các bạn về khái niệm `redux-saga` và khi nào thì sử dụng nó cũng như 1 số ví dụ cơ bản, trong phần này mình sẽ tiếp tục giới thiệu về các `basic-helpers` thông dụng trong `redux-saga`, mong các bạn đón đọc. Link p1: https://viblo.asia/p/gioi-thieu-ve-saga-trong-redux-p1-GrLZDXA2Zk0

# BASIC HELPERS
Là các helpers hoạt động ở tầng thấp trong `saga APIS`.

Dưới đây là những helpers thông dụng nhất mà bạn có thể dùng để chạy các `effects` của mình:
* `takeEvery()`
* `takeLatest()`
* `take()`
* `put()`
* `call()`
# `takeEvery()`
Trong đoạn code thì nó sẽ như thế này:
```javascript
import { takeLatest } from 'redux-saga/effects'

function* watchMessages() {
  yield takeEvery('ADD_MESSAGE', postMessageToServer)
}
```
Generator `watchMessages` sẽ tạm dừng cho đến khi action `ADD_MESSAGE` được thực thi, và **mỗi khi** `ADD_MESSAGE` được thực thi, nó sẽ gọi đến function `postMessageToServer`(số lần được gọi có thể là vô hạn và `postMessageToServer` sẽ chạy mà không cần biết trước đó function `postMessageToServer` đã chạy xong hay chưa).
# `takeLatest()`
Một helper thông dụng và nổi tiếng khác chính là `takeLatest()`, nó gần như giống hệt người anh em `takeEvery()` của mình, chỉ có cái khác là nó chỉ cho phép một function được chạy trong một thời điểm. Tức là nếu như trước đó có một function đang chạy, nó sẽ hủy function đó và chạy lại lần nữa với dữ liệu mới nhất.

Cũng giống như `takeEvery()`, generator sẽ không bao giờ ngừng lại và tiếp tục chạy cho đến khi một action chỉ định được diễn ra.
# `take()`
`take()` khác biệt ở chỗ nó chỉ đợi đúng một lần duy nhất. Khi action nó đợi được diễn ra, `promise` sẽ được `resolve` và vòng lặp sẽ tiếp tục.

# `put()`
Khi muốn dispatch một action trong redux store, thay vì phải truyền vào redux store hoặc là dispatch action đến saga, bạn có thể dùng luôn `put`:
```javascript
yield put({ type: 'INCREMENT' })
yield put({ type: "USER_FETCH_SUCCEEDED", data: data })
```
`put()` sẽ trả về một plain object, sau này khi viết test cho redux sẽ đơn giản hơn rất nhiều cho chúng ta.
# `call()`
Khi bạn muốn gọi một số function ở trong saga, bạn có thể làm thế bằng cách viết một function trả về promise dạng như:
```javascript
delay(1000)
```
Nhưng viết như trên sẽ rất khó cho chúng ta khi viết test. Thay vào đó, `call()` cho phép bạn bọc function trên  và trả về một object dễ làm việc hơn:
```javascript
call(delay, 1000)
```
Đây là kết quả trả về:
```javascript
{ CALL: {fn: delay, args: [1000]}}
```
# Tạm kết
Vậy là mình đã giới thiệu với các bạn về các `basic helpers` thông dụng trong redux saga, hi vọng sẽ giúp ích được phần nào cho công việc cũng như học tập của các bạn. Tuy rằng bài viết còn nhiều chỗ chưa được tốt nhưng mong các bạn thông cảm, xin cảm ơn rất nhiều!