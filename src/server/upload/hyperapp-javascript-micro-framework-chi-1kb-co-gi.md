Bạn đã quá quen thuộc với các Javascript framework hàng khủng như Angularjs, Reactjs hay Vuejs, những framework với đầy các tính năng tuyệt vời? Vậy thì trong bài viết này, hãy cùng mình đổi gió với một micro-framework có dung lượng vỏn vẹn chỉ 1kB - Hyperapp, xem nó làm được gì nhé :grinning::grinning:


-----

## Bắt đầu thôi

Cùng xem qua một ví dụ bắt đầu của Hyperapp để biết được các tính năng cơ bản của nó nhé: 

{@embed: https://codepen.io/jorgebucaran/pen/zNxZLP?editors=0010}

```js
import { h, app } from "hyperapp"

const state = {
  count: 0
}

const actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value })
}

const view = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
)

app(state, actions, view, document.body)
```

Giải thích cơ bản:

- Dùng const `state` để lưu object chứa các trạng thái của ứng dụng (count)
- Const `actions` để lưu các methods dùng để update giá trị của các state
- Hàm `view` dùng để tạo ra virtualDOM khi chạy ứng dụng, nhận 2 tham số là `state` và `actions`, dùng 2 tham số này để biểu diễn và update state của ứng dung. Ở đây, khi gọi sự kiện `onclick` vào button `-` sẽ thực hiện gọi `actions down` để giảm đi giá trị của state.count, tương tự với `+`. Hiển thị state: `{state.count}`, DOM cũng được cập nhật ngay khi state được thay đổi.
- Và gọi hàm app(state, actions, view, document.body) để thực thi ứng dụng, hàm app sẽ mount ứng dụng vào `document.body`
- Ở đây có imort hàm `h` nhưng ko sử dụng :grin:, mình sẽ tìm hiểu về hàm này bên dưới

## Cài đặt
Cài đặt sử dụng npm hoặc yarn 
```
npm i hyperapp

// hoặc

yarn add hyperapp
```

Import để sử dụng

```js
import { h, app } from "hyperapp"
```

Hoặc sử dụng cdn, sử dụng được trên tất cả các trình duyệt hổ trợ ES5, dùng `window.hyperapp`

```html
<script src="https://unpkg.com/hyperapp"></script>
```

## Tổng quan
Qua ví dụ bên trên chúng ta cũng biết được ứng Hyperapp gồm 3 thành phần liên kết với nhau:  state, view, và actions.

Khi được khởi tạo, ứng dụng sẽ thực thi các vòng lặp liên tục, thực hiện các actions của người dùng từ các event và cập nhật state và biểu diễn thông qua DOM ảo. Sau mỗi action được thực thi, state sẽ được biểu diễn lại cho người dùng.

## Các khái niệm

### State

Là nơi chứa các trạng thái của ứng dụng, phải là một plain object và một khi được khởi tạo, không thể thay đổi thay đổi trực tiếp giá trị mà phải thông qua actions.

```js
const state = {
  top: {
    count: 0
  },
  bottom: {
    count: 0
  }
}
```

#### Local State

Hyperapp không có khái niêm Local State. Thay vào đó, các components là các hàm thuần túy trả về một biểu diễn DOM ảo của global state.

### Actions

Là cách duy nhất để update state của ứng dụng, các hàm action chỉ nhận 1 tham số

Kết quả trả về của action là một object chứa một phần của state mới. State mới là kết quả của việc shallow merge giữa state hiện tại và object trả về của action. Ngoài cách trả về một object, action còn có thể trả về một hàm nhận tham số là state hiện tại và các action với kết quả trả về là một object chứa một phần của state mới:

```js
const actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value })
}
```

#### Actions bất đồng bộ
Các actions thực hiện side effects (ghi database, gọi đến server) không cần có giá trị trả về. Có thể gọi đến các action khác trong action. Các action trả về một Promise, undefined hay null sẽ không kích hoạt việc cập nhật state.

```js
const actions = {
  upLater: value => (state, actions) => {
    setTimeout(actions.up, 1000, value)
  },
  up: value => state => ({ count: state.count + value })
}
```
 
Các actions có thể là async function, vì async function trả về Promise, không phải một phần của state object nên bạn cần gọi một action khác để update state:

```js
const actions = {
  upLater: () => async (state, actions) => {
    await new Promise(done => setTimeout(done, 1000))
    actions.up(10)
  },
  up: value => state => ({ count: state.count + value })
}
```

#### Nested Actions
Actions có thể nằm trong 1 namespace, dùng để update state nằm trong một namespace cùng tên:

```js
const state = {
  counter: {
    count: 0
  }
}

const actions = {
  counter: {
    down: value => state => ({ count: state.count - value }),
    up: value => state => ({ count: state.count + value })
  }
}
```

#### Interoperability

Bạn có thể gọi đến actions từ bên ngoài ứng dụng theo cách dưới đây:
```js
const main = app(state, actions, view, document.body)

setInterval(main.up, 250, 1)
setInterval(main.down, 500, 1)
```

Một action trả về tham chiếu của state sẽ ko làm cập nhật lại view:

```js
const actions = {
  getState: () => state => state
}
```

### View

Mỗi khi state thay đổi, hàm `view` sẽ được gọi để cập nhật virtual DOM biểu diện giao diện của ứng dụng. Hàm view sẽ trả về virtualDOM mới, Hyperapp sẽ đảm nhiệm việc cập nhật lại DOM thật cho phù hợp

```js
import { h } from "hyperapp"

export const view = (state, actions) =>
  h("div", {}, [
    h("h1", {}, state.count),
    h("button", { onclick: () => actions.down(1) }, "-"),
    h("button", { onclick: () => actions.up(1) }, "+")
  ])
  ```
  
  hàm view sẽ trả về một object như thế này:
  
  ```js
  {
  nodeName: "div",
  attributes: {},
  children: [
    {
      nodeName: "h1",
      attributes: {},
      children: [0]
    },
    {
      nodeName: "button",
      attributes: { ... },
      children: ["-"]
    },
    {
      nodeName:   "button",
      attributes: { ... },
      children: ["+"]
    }
  ]
}
```
### Mounting

Để mount ứng dụng chúng ta cần cung cấp 1 DOM element cho hàm app:
```js
app(state, actions, view, container)
```

Hyperapp sẽ cố gắng sử dụng lại các phần tử có sẵn trong container để tối ưu hóa SEO và cải thiện thời gian tương tác cho ứng dụng của bạn.

Trong ví ở đầu bài viết, chúng sẽ thêm phần HTML như thế này, Hyperapp sẽ sử dụng lại những thành phần trong `document.body`:


```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script defer src="bundle.js"></script>
</head>

<body>
  <div>
    <h1>0</h1>
    <button>-</button>
    <button>+</button>
  </div>
</body>
</html>
```

### Components

Một component là một hàm thuần (pure function) trả về một virtual node.  Không giống như view, component không kết nối với state và action của ứng dụng.

Dưới đây là ví dụ về cách sử dụng component trong ứng dụng của bạn:

{@embed: https://codepen.io/jorgebucaran/pen/zNxRLy}

```js
import { h } from "hyperapp"

const TodoItem = ({ id, value, done, toggle }) => (
  <li
    class={done && "done"}
    onclick={() =>
      toggle({
        value: done,
        id: id
      })
    }
  >
    {value}
  </li>
)

export const view = (state, actions) => (
  <div>
    <h1>Todo</h1>
    <ul>
      {state.todos.map(({ id, value, done }) => (
        <TodoItem id={id} value={value} done={done} toggle={actions.toggle} />
      ))}
    </ul>
  </div>
)
```

Nếu bạn không biết trước  tất cả các thuộc tính mà bạn muốn đặt trong một component, bạn có thể sử dụng spead syntax. Lưu ý rằng các component Hyperapp có thể trả về một mảng các phần tử như trong ví dụ sau. Kỹ thuật này cho phép bạn nhóm một danh sách các children mà không cần thêm các node phụ vào DOM.

```js
const TodoList = ({ todos, toggle }) =>
  todos.map(todo => <TodoItem {...todo} toggle={toggle} />)
  ```
  
  #### Lazy Components
  
 Component thông thường chỉ nhận thuộc tính và component con từ component cha. Các lazy component, tương tự với hàm view, có thể nhận state và action của ứng dụng. Để tạo một lazy component, khai báo một component thông thường và trả về một hàm view bên trong component này.
 
 ```js
 import { h } from "hyperapp"

export const Up = ({ by }) => (state, actions) => (
  <button onclick={() => actions.up(by)}>+ {by}</button>
)

export const Down = ({ by }) => (state, actions) => (
  <button onclick={() => actions.down(by)}>- {by}</button>
)

export const Double = () => (state, actions) => (
  <button onclick={() => actions.up(state.count)}>+ {state.count}</button>
)

export const view = (state, actions) => (
  <main>
    <h1>{state.count}</h1>
    <Up by={2} />
    <Down by={1} />
    <Double />
  </main>
)
```

#### Handling Component State

Giả sử bạn có một danh sách các câu hỏi với các câu trả lời được thu gọn ban đầu. Flag answerIsOpen được sử dụng để xác định câu trả lời của câu hỏi có được mở hay không. Vì không có khái niệm local state trong Hyperapp, global state luôn được cập nhật thay vì state của một component riêng lẻ. Để cập nhật trạng thái của một câu hỏi, toàn bộ mảng câu hỏi sẽ được ánh xạ tới một mảng mới, nơi thuộc tính answerIsOpen sẽ được bật lên nếu câu hỏi khớp với câu hỏi thuộc về thành phần đó, mời xem ví dụ dưới đây:

https://codepen.io/anon/pen/ZogRYP

#### Children Composition

Các component nhận các children element thông qua đố số thứ 2, cho phép bạn cũng như các component khác truyền children tùy ý xuống cho chúng.

```js
const Box = ({ color }, children) => (
  <div class={`box box-${color}`}>{children}</div>
)

const HelloBox = ({ name }) => (
  <Box color="green">
    <h1 class="title">Hello, {name}!</h1>
  </Box>
)
```

### Supported Attributes

Các thuộc tính được hỗ trợ bao gồm các thuộc tính HTML, các thuộc tính của SVG, các sự kiện của DOM, các sự kiện của Lifecycle và khóa. Các thuộc tính HTML không chuẩn không được hỗ trợ, chẳng hạn onClick hay className.

#### Style
Thuộc tính style sẽ nhận một object thay vì string như trong HTML. Tên thuộc tính trong style sẽ được viết dưới dạng camelCase.
```js
import { h } from "hyperapp"

export const Jumbotron = ({ text }) => (
  <div
    style={{
      color: "white",
      fontSize: "32px",
      textAlign: center,
      backgroundImage: `url(${imgUrl})`
    }}
  >
    {text}
  </div>
)
```
### Các sự kiện của Lifecycle
Có 4 sự kiện trong Lifecycle của một phần tử được quản lý bỏi virtualDOM, các sự kiện này được kích hoạt khi phần tử này được tạo, cập nhật hay bị xóa.

#### oncreate
Sự kiện này được kích hoạt sau khi phần tử được tạo vào gắn vào DOM. Sử dụng sự kiện này để xử lý DOM node, tạo network request hay các hiệu ứng slide/fade

```js
import { h } from "hyperapp"

export const Textbox = ({ placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    oncreate={element => element.focus()}
  />
)
```

#### onupdate
Sự kiện này được kích hoạt khi chúng ta cập nhật các thuộc tính của phần tử. Sử dụng tham số oldAttributes bên trong hàm xử lý để kiểm tra xem thuộc tính nào bị thay đổi.

```js
import { h } from "hyperapp"

export const Textbox = ({ placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    onupdate={(element, oldAttributes) => {
      if (oldAttributes.placeholder !== placeholder) {
        // Handle changes here!
      }
    }}
  />
)

```
#### onremove
Sự kiện này được kích hoạt trước khi phần tử bị xóa khỏi DOM. Sử dụng sự kiện này để tạo các hiệu ứng slide/fade out. Gọi tham số done bên trong hàm xử lý để xóa phần tử. Sự kiện này sẽ không kích hoạt bên trong phần tử con của phần tử bị xóa.

```js
import { h } from "hyperapp"

export const MessageWithFadeout = ({ title }) => (
  <div onremove={(element, done) => fadeout(element).then(done)}>
    <h1>{title}</h1>
  </div>
)
```

#### ondestroy
Sự kiện này được kích hoạt sau khi phần tử bị xóa khỏi DOM một cách trực tiếp hoặc phần tử cha của phần tử này bị xóa. Sử dụng sự kiện này để xóa bỏ các timer, hủy network request, bỏ các hàm bắt sự kiện, v..v..

```js
import { h } from "hyperapp"

export const Camera = ({ onerror }) => (
  <video
    poster="loading.png"
    oncreate={element => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => (element.srcObject = stream))
        .catch(onerror)
    }}
    ondestroy={element => element.srcObject.getTracks()[0].stop()}
  />
)
```

### Keys
Keys giúp xác định node mỗi khi DOM được cập nhật. Bằng cách chỉ định keys trên một virtual node, node đó sẽ tương ứng với một phần tử DOM nào đó. Điều này cho phép phần tử được dời đến vị trí mới nếu vị trí của nó thay đổi, thay vì bị xóa bỏ.

```js
import { h } from "hyperapp"

export const ImageGallery = ({ images }) =>
  images.map(({ hash, url, description }) => (
    <li key={hash}>
      <img src={url} alt={description} />
    </li>
  ))
  ```
  
Keys phải duy nhất giữa các node cùng cha. Không sử dụng index của mảng làm khóa nếu index dùng để chỉ định thứ tự của các node cùng cha này. Nếu thứ tự và số lượng các phần tử này cố định thì không có vấn đề gì, nhưng nếu chúng không cố định, keys sẽ bị thay đổi mỗi khi DOM được tạo lại.

```js
import { h } from "hyperapp"

export const PlayerList = ({ players }) =>
  players
    .slice()
    .sort((player, nextPlayer) => nextPlayer.score - player.score)
    .map(player => (
      <li key={player.username} class={player.isAlive ? "alive" : "dead"}>
        <PlayerProfile {...player} />
      </li>
    ))
```

Chúc các bạn vui! :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye: