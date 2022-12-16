#### Chào mọi người, lại là mình đây, hôm nay chúng ta cùng làm một ví dụ đơn giản về sự kết hợp giữa `react` và `mobx`, xem nó có gì hay ho so với `react` kết hợp `redux`  nhé :grinning:.

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có kiến thức cơ bản về babel.
- Đã có kiến thức cơ bản về webpack.
- Đã có kiến thức cơ bản về react.
- Phải đọc qua các khái niệm, api của [mobx](https://mobx.js.org/README.html) , [mobx-react](https://github.com/mobxjs/mobx-react) .
- Môi trường mình sẽ demo:
  - window 10
  - node v8.11.3
  - yarn v1.7.0

#### Mục đích:
- Xem cách triển khai một app kết hợp react với mobx nó sẽ như thế nào, cần những phần gì, cấu hình như thế nào, v.v.
- Tự kiểm nghiệm ưu và nhược điểm để sử dụng sao cho phù hợp với từng dự án.

#### Những phần bỏ qua:
-  Phần cấu hình mình sẽ không mô tả chi tiết trong bài viết, các bạn có thể theo dõi thông qua repo.
-  Giải thích các thuật ngữ, khái niệm cơ bản mà các bạn hoàn toàn có thể đọc thông qua trang chính thức của các thư viện.

#### Ý tưởng
- Tạo một ứng dụng thêm và hiển thị danh sách `Bird`
- Chúng ta sẽ tạo các file
    - 1 view (phần này mình sẽ sử dụng toàn bộ là function component)
        - 1 form
        - 1 list
    - 1 model (class)
    - 1 store (class)
    
# 2. Tiến hành
#### Luồng hoạt động của mobx như sau
![](https://images.viblo.asia/1e1a0bd2-9a91-48b0-8998-441cc6da885d.png)

Về cơ bản `mobx` sẽ dựa trên nguyên tắc `mutable` thay vì `immutable` như trong `redux`

#### Cài đặt các thư viện quan trọng
- `mobx`: Simple, scalable state management.
- `mobx-react`: React bindings for MobX.
- `@babel/plugin-proposal-decorators`: plugin decorator.
- `@babel/plugin-proposal-class-properties`: plugin class properties.

> Note: Phải cấu hình chính xác thứ tự cho các plugin để có thể hoạt động. Phải có phần này trong `.babelrc`
```js
"plugins": [
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ["@babel/plugin-proposal-class-properties", { "loose": true }]
]
```

#### Các bước
1. File `BirdModel.js` (đối tượng Bird)
```js
import { observable } from 'mobx'

class Bird {
  @observable id
  @observable name
  @observable color

  constructor(bird) {
    this.id = Date.now()
    this.name = bird.name
    this.color = bird.color
  }
}

export default Bird
```

2. File `BirdStore.js` (nơi lưu trữ, xử lý các thay đổi, tính toán, etc. - sử dụng các api core của `mobx`)
```js
import { observable, action, computed } from 'mobx'

import BirdModel from './BirdModel'

class BirdStore {
  @observable birds = []

  @action
  addBird = bird => {
    this.birds.push(new BirdModel(bird))
  }

  @computed
  get birdCount() {
    return this.birds.length
  }
}

export default new BirdStore()
```

3. File `BirdView.js` (Parent component, inject store bird)
```jsx
import React from 'react'
import { inject, observer } from 'mobx-react'

import BirdForm from './BirdForm'
import BirdList from './BirdList'

const BirdView = ({ BirdStore: { birds, birdCount, addBird } }) => (
  <div>
    <h2>Birds</h2>
    <BirdForm addBird={addBird} />
    <br />
    <BirdList birds={birds} birdCount={birdCount} />
  </div>
)

export default inject('BirdStore')(observer(BirdView))
```

4. File `BirdForm.js`(form thêm bird)
```jsx
import React, { useState } from 'react'
import { observer } from 'mobx-react'

const BirdForm = ({ addBird }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('red')

  const handleSubmit = event => {
    event.preventDefault()
    addBird({ name, color })
    setName('')
    setColor('red')
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleColorChange = event => {
    setColor(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Bird Form</h3>
      <input type="text" value={name} onChange={handleNameChange} />
      <br />
      <select value={color} onChange={handleColorChange}>
        <option value="red">red</option>
        <option value="yellow">yellow</option>
        <option value="blue">blue</option>
      </select>
      <br />
      <button type="submit">add bird</button>
    </form>
  )
}

export default observer(BirdForm)
```

5. File `BirdList.js` (danh sách bird)
```jsx
import React from 'react'
import { observer } from 'mobx-react'

const BirdList = ({ birds, birdCount }) => (
  <>
    <h3>Bird List</h3>
    <ul>
      {birds.map(bird => (
        <li key={bird.id} style={{ color: bird.color }}>
          {bird.name}
        </li>
      ))}
    </ul>
    <p>
      Have {birdCount} bird{birdCount > 1 ? 's' : ''}
    </p>
  </>
)

export default observer(BirdList)
```

6. File `app.js` (entry point)
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import BirdStore from './BirdStore'
import BirdView from './BirdView'

const App = () => (
  <Provider BirdStore={BirdStore}>
    <BirdView />
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
```

7. Chạy app lên xem có gì
- Truy cập localhost:6969
![](https://images.viblo.asia/fd38d459-4420-4103-a78a-adc3b411f2f7.PNG)

- Thêm một vài bird
![](https://images.viblo.asia/14ab079e-bdd1-42aa-861a-a04a63546d0b.PNG)

- Như vậy là các tính năng thêm, hiển thị danh sách, đếm số lượng đều chạy tốt.

# 3. Kết luận
Qua bài viết này chúng ta có thể phần nào đó: 
1. Hiểu được cách các component, store, model kết hợp với nhau.
2. Hiểu được cách sử dụng cú pháp decorator.
3. Thêm một sự lựa chọn cho việc quản lý state trong ứng dụng react.

Hi vọng nó mang lai cho bạn thêm một chút kiến thức hay ho gì đó, cảm ơn bạn đã đọc bài viết này.

[Source code](https://github.com/daint2git/viblo.asia/tree/master/react-with-mobx)