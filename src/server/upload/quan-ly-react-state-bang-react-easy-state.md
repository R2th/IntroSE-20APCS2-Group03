# Overview
Trong qúa trình phát triển các application trên nền tảng `React JS`, tôi đã tìm hiểu về `React Easy State`, trong bài viết này tôi sẽ giới thiệu về nó.<br/>
`Easy State` là 1 thư viện để quản lý `React` state, về cơ bản nó không hoàn toàn có 1 triết lý cụ thể, cũng giống như lập trình hướng function, nó chủ yếu hướng đến sự đơn giản trong việc sử dụng `React`. Bạn có thể lưu lại `state` trong những đối tượng đơn giản, sử dụng và thay đổi giá trị theo bất cứ cách nào mà bạn muốn.
Đằng sau các trạng thái được lưu trữ và bao bọc bởi [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), những trạng thái này đã bị chặn tất cả những hành động cơ bản như `get`, `set`. Chúng đăng ký phần nào trong đó được lưu trữ, phần nào được sử dụng và render thành phần cũng như tự động tái render khi cần thiết.<br/>
Điều thú vị về `Proxy` là sự minh bạch. Bạn chỉ cần phải xử lý với các đối tượng đơn giản và các thành phần `React` và cho phép `Easy State` giữ chúng đồng bộ.<br/>
# Cách sử dụng
## Thành phần trong library
`Easy State` có 2 luật sau:
* Luôn bọc các thành phần lại bằng `view`
* Luôn bọc các trạng thái chứa các đối tượng bằng `store`
## Cách cài đặt
```
npm install react-easy-state
```
Ngoài ra `Easy State` hỗ trợ [Create React App](https://github.com/facebook/create-react-app) bạn có thể cài đặt 1 project nhanh chóng bằng cách:
```
npx create-react-app my-app
cd my-app
npm install react-easy-state
npm start
```
## Cách dùng
1. Tạo 1 `store` từ những đối tượng được truyền vào. `store` không khác gì những đối tượng JS thông thường
```Javascript
import { store } from 'react-easy-state';

const user = store({
  name: 'Thi'
});

// stores behave like normal JS objects
user.name = 'Hung';
```
2. Tạo `reactive views` bọc lại bằng `view`. Một `reactive views` được render khi mà các `property` của store được thay đổi
```Javascript
import React, { Component } from 'react';
import { view, store } from 'react-easy-state';

const user = store({ name: 'Bob' });

class HelloComp extends Component {
  onChange = ev => (user.name = ev.target.value);

  // the render is triggered whenever user.name changes
  render() {
    return (
      <div>
        <input value={user.name} onChange={this.onChange} />
        <div>Hello {user.name}!</div>
      </div>
    );
  }
}

// the component must be wrapped with `view`
export default view(HelloComp);
```
# Thực hành
Chúng ta sẽ bắt đầu thực hành với 1 ví dụ đơn giản, đó là tạo 1 đồng hồ để đếm thời gian. Gồm chức năng đơn giản: start, stop<br/>
Đầu tiên chúng ta cần tạo ra 1 cái đồng hồ để lưu trữ các trạng thái. Nó lưu lại số lần nó đếm và nó có thể được start và stop. Đơn giản như sau:
```Javascript
import { store } from 'react-easy-state'

const clock = store({
  ticks: 0,
  start () {
    clock.intervalId = setInterval(() => clock.ticks++, 10)
  },
  stop () {
    clock.intervalId = clearInterval(clock.intervalId)
  }
})

export default clock
```
Sau đó chúng ta cần tạo `view` để hiển thị đồng hồ. Sử dụng cách đơn giản nhất, xây dựng 1 hàm thành phần như sau:
```Javascript
import React from 'react'
import { view } from 'react-easy-state'
import clock from './clock'

function StopWatch () {
  const { ticks, start, stop } = clock

  return (
    <div>
      <div>{ticks}</div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

export default view(StopWatch)
```
Thêm 1 chút css và chạy demo chúng ta sẽ được 1 kết quả với các chức start stop như sau:<br/>
![demo1](https://images.viblo.asia/0ad4e8a7-8e1a-4031-9d1d-11fe9f019135.png)<br/>
Làm thêm 1 chút nâng cao nữa bằng cách thêm format cho đồng hồ theo đơn vị phút, giây, tích tắc, và thêm tính năng reset được.
Add thêm thư viện hỗ trợ moment để hiển thị thời gian theo format.
```Javascript
import { store } from 'react-easy-state'
import moment from 'moment'

// use 'clock' instead of 'this' in the store methods to make them passable as callbacks
const clock = store({
  ticks: 0,
  start () {
    clock.intervalId = setInterval(() => clock.ticks++, 10)
  },
  stop () {
    clock.intervalId = clearInterval(clock.intervalId)
  },
  get time () {
    const time = moment(0).millisecond(clock.ticks * 10)

    return {
      seconds: time.format('mm:ss'),
      fraction: time.format('SS')
    }
  },
  get isTicking () {
    return clock.intervalId !== undefined
  },
  toggle () {
    clock.isTicking ? clock.stop() : clock.start()
  },
  reset () {
    clock.ticks = 0
    clock.stop()
  }
})

export default clock
```
Phần `view` được thay đổi thành như sau:
```Javascript
import React from 'react'
import { view } from 'react-easy-state'
import clock from './clock'

function StopWatch () {
  const { time, toggle, reset, isTicking } = clock
  const label = isTicking ? 'Stop' : 'Start'

  return (
    <div>
      <div>
        {time.seconds}
        <small>{time.fraction}</small>
      </div>
      <button onClick={toggle}>{label}</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default view(StopWatch)
```
Bạn đã có 1 demo hoàn chỉnh về đồng hồ đếm giờ: <br/>
![demo2](https://images.viblo.asia/c6ccb2eb-a153-4a1f-8f4a-9f6583469adb.png)<br>
# Phân tích
Chúng ta đã hiểu phần nào cách sử dụng của `Easy State` qua ví dụ. Vậy về cơ bản thì `Easy State` bí mật theo dõi 2 điều:
* `store` truy theo từng function `get`, `set` mỗi thuộc tính của từng `state`
* `view` truy theo hàm render đang được chạy

Khi một thuộc tính của `store` được sử dụng bên trong một thành phần `render`, nó được ghép nối `render` này và được lưu trong một `list`. Sau đó - khi cùng một thuộc tính bị thay đổi - nó tìm kiếm tất cả các hàm `render` được lưu và thực thi chúng. Bằng cách này, `view` luôn được giữ đồng bộ với `state`.<br/>
Hãy phân tích ví dụ đồng hồ bấm giờ trên. Khi đồng hồ này được render lần đầu tiên, `view` coi như đồng hồ đang được hiển thị.
Đồng hồ này dùng các thuộc tính `time`, `isTicking`, `intervalId` để render. Tất cả những hoạt động này đều được chặn bởi `Proxy` và `Easy State` sẽ lưu lại rằng đồng hồ sử dụng các thuộc tính này.<br/>
Sau đó người dùng ấn start, 1 vòng lặp được khởi tạo kèm theo `intervalId` được set giá trị. Hành động set này được bắt bời `Proxy` cái mà nhận ra rằng thuộc tính: `intervalId` và `isTicking` bị thay đổi, `Easy State` sẽ render mọi thành phần mà giựa trên những thay đổi này<br/>
Vòng lặp thời gian này được đếm mỗi 10 mili giây. `Easy State` hiểu là đồng hồ đã đếm 1 lần và sẽ render lại các thành phần mỗi lần đếm.

# Vậy tại sao chúng ta nên dùng
Easy State dựa trên một ý tưởng cũ - được gọi là lập trình reactive trong suốt - từng được sử dụng bởi VueJS và MobX. Sự đổi mới nằm trong việc thực hiện, không phải là khái niệm.<br/>
Cả MobX và VueJS đều sử dụng getters và bộ định tuyến ES5 để theo dõi quyền truy cập và đột biến thuộc tính trên các cửa hàng. Cách tiếp cận này có những hạn chế.<br/>
Bằng cách sử dụng ES6 Proxies, Easy State cuối cùng có thể hoàn thành tính reactive trong suốt. Nó có thể theo dõi bất cứ điều gì từ các thuộc tính động để xóa các hoạt động, các thuộc tính kế thừa, các phép lặp, đếm và truy cập thuộc tính.<br/>
Việc sử dụng sẽ giúp cho việc quản lý các state trong lập trình React được rõ ràng đơn giản hơn.<br/>

Nguồn tham khảo: https://github.com/solkimicreb/react-easy-state, https://blog.risingstack.com/introducing-react-easy-state/