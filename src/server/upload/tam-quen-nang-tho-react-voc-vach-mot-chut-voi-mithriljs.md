**Dạo này ăn dầm nằm dề với "nàng" React nhiều quá, lắm khi không ngóc đầu lên được. Ông bà ta có câu "Chán cơm thèm phở", nên lang thang trên các blog để mong tìm được 1 chút thú vui khác React đã khá quen thuộc, thì vô tình thấy một frameworkJS là **MithrilJS**, tuy nó chưa quá nổi tiếng trên cộng đồng Frontend, nhưng đọc lướt qua phần giới thiệu lại thấy khá ấn tượng...**

![](https://images.viblo.asia/78ec3976-668f-40b4-9eaf-c8896493c897.png)

### 1. Giới thiệu

Như đã đề cập ở tiêu đề bài viết, framework này có tên là **MithrilJS**, cái tên được lấy cảm hứng từ một loại vật liệu hư cấu trong các tác phẩm của nhà văn, giáo sư người Anh ***[J. R. R. Tolkien](https://en.wikipedia.org/wiki/J._R._R._Tolkien).*** Là một frameworkJS phía client dùng để xây dựng các ứng dụng SPA theo mô hình MVC như React hay Vue.

Về chi tiết phần giới thiệu cũng như hướng dẫn để bắt đầu với **MithrilJS** thì mình xin phép không đề cập quá cụ thể ở đây, vì các bạn có thể vào thẳng trang chủ của nó để đọc ở [trang chủ](https://mithril.js.org/index.html#getting-started), khá chi tiết và rõ ràng. Tuy nhiên, phải nói qua cái mà gây ấn tượng ngay lúc đọc phần giới thiệu thì hiện tại đây là một ***Javascript framework có Performance tốt nhất, cũng như có Size nhỏ nhất***, so với các Javascript framework phổ biến hiện nay.

![](https://images.viblo.asia/cacb7b4b-2f74-45cf-b82b-37bb4e227040.png)

### 2. Các đặc trưng và thành phần chính

Mỗi frameworkJS đều xây dựng những đặc trưng và định nghĩa một cấu trúc, cơ chế hoạt động riêng. React thì có VirtualDOM, state/props, life-cycle..., thì với **MithrilJS** cũng vậy. Sau đây là 1 số thành phần chính, hay những giá trị cốt lõi, xương sống của nó.

#### 2.1 Cú pháp

**MithrilJS** được xây dựng một cú pháp viết riêng thông qua từ khóa `m`. Tuy nhiên, nếu bạn đã từng làm việc với React và đã quá quen với cách viết của JSX, thì đừng lo, Webpack và Babel sẽ giúp các bạn làm việc này qua vài bước config đơn giản, hướng dẫn đầy đủ tại [trang chủ](https://mithril.js.org/jsx.html#setup) của **MithrilJS** (hoặc ở cuối bài viết mình có 1 ví dụ, trong đó đã dựng sẵn 1 số config cơ bản).

```javascript
function MyComponent() {
  return {
    view: () =>
      m("main", [
        m("h1", "Hello world"),
      ])
  }
}

// can be written as:
function MyComponent() {
  return {
    view: () => (
      <main>
        <h1>Hello world</h1>
      </main>
    )
  }
}
```

#### 2.2 Virtual node hay `vnodes`

Cũng như React có VirtualDOM, thì ở **MithrilJS** là `vnodes`. `vnodes` là một object đại diện cho các phần tử DOM (hoặc các phần của DOM). Công cụ VirtualDOM của Mithril sử dụng `vnodes` để tạo ra một cây DOM.

`vnodes` được khởi tạo thông qua từ khóa `m()`:

```javascript
m(selector, attributes, children)
```

hoặc 

```javascript
// define a component
var ExampleComponent = {
  view: function(vnode) {
    return m("div", vnode.attrs, ["Hello ", vnode.children])
  }
}

// consume it
m(ExampleComponent, {style: "color:red;"}, "world")

// equivalent HTML:
// <div style="color:red;">Hello world</div>
```

Cấu trúc của một `vnodes`

![](https://images.viblo.asia/6a4c5a0e-617f-4e97-97eb-a1071083f695.png)

#### 2.3 Component

Component trong **MithrilJS** là object có thuộc tính view là một hàm để return ra kết quả cuối cùng ở giao diện, ví dụ:

```javascript
// define your component
var Example = {
  view: function(vnode) {
    return m("div", "Hello")
  }
}

// consume your component
m(Example)

// equivalent HTML
// <div>Hello</div>
```

Vá một loạt các method trong ***Lifecycle methods***, đại khái là giống như các Lifecycle trong React vậy

```javascript
var ComponentWithHooks = {
  oninit: function(vnode) {
    console.log("initialized")
  },
  oncreate: function(vnode) {
    console.log("DOM created")
  },
  onbeforeupdate: function(newVnode, oldVnode) {
    return true
  },
  onupdate: function(vnode) {
    console.log("DOM updated")
  },
  onbeforeremove: function(vnode) {
    console.log("exit animation can start")
    return new Promise(function(resolve) {
      // call after animation completes
      resolve()
    })
  },
  onremove: function(vnode) {
    console.log("removing DOM element")
  },
  view: function(vnode) {
    return "hello"
  }
}
```

#### 2.4 State

Cũng như các frameworkJS khác, để quản lý Virtual DOM hay `vnode` thì **MithrilJS** cũng có state. State trong  **MithrilJS** có thể được khai báo hoặc khởi tạo bằng nhiều cách khác nhau.

* **Closure component state**

```javascript
function ComponentWithState(initialVnode) {
  // Component state variable, unique to each instance
  var count = 0

  // view function which returns a vnode
  return {
    oninit: function(vnode){
      console.log("init a closure component")
    },
    view: function(vnode) {
      return m("div",
        m("p", "Count: " + count),
        m("button", {
          onclick: function() {
            count += 1
          }
        }, "Increment count")
      )
    }
  }
}
```

* **POJO component state**

```javascript
var ComponentWithInitialState = {
  data: "Initial content",
  view: function(vnode) {
    return m("div", vnode.state.data)
  }
}

m(ComponentWithInitialState)

// Equivalent HTML
// <div>Initial content</div>
```
...hoặc 1 số cách khác như thông qua `vnodes` hoặc `this`.

####  2.5 Routing

Một đặc trưng không thể không nhắc đến của **MithrilJS** đó là việc tích hợp sẵn cơ chế quản lý chuyển route giống như trong VueJS hay React-router-dom vậy, bạn không cần phải cài đặt gì thêm...

```javascript
var RoutedComponent = {
  view: function() {
    return [
      // a redraw happens asynchronously after the route changes
      m(m.route.Link, {href: "/"}),
      m("div", {
        onclick: function() {
          m.route.set("/")
        }
      }),
    ]
  }
}

var ListComponent = {
  view () {
    return m('div', 'List data')
  }
}

m.route(document.body, "/", {
  "/": RoutedComponent,
  "/data": ListComponent,
})
```

Và còn khá nhiều thành phần khác nữa, chi tiết hơn các bạn sẽ tìm hiểu dần ở [docs](https://mithril.js.org/api.html) của nó nếu thấy hứng thú nhé :kissing_heart:

### 3 Kết luận

Tuy mới chỉ tìm hiểu về **MithrilJS** nhưng mình thấy cũng khá là thú vị, tuy nhiên do thời gian tìm hiểu chưa nhiều và chưa thấu hiểu hết nên nếu trong bài viết có gì sai sót mong các bạn lượng thứ bỏ qua và góp ý thêm cho mình nhé :wink:

Mình cũng đã thử dựng một ứng dụng TODO nhỏ bằng **MithrilJS**, và đã config sẵn Babel và Webpack cơ bản, các bạn có thể tham khảo code trên Github của mình ở [đây](https://github.com/tranquocy/mithrilJS-todo).

Xin chào và hẹn gặp lại!