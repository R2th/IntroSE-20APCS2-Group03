Nếu bạn là người dùng Visual Studio Code và thích phát triển các dự án bằng React, thì có lẽ bạn gõ đi gõ lại những dòng code như React.useState, React.useContext, React.useReducer (reducer, initState), v.v. . thường xuyên.

Các phím riêng lẻ này nằm rải rác ở tất cả các hướng khác nhau trên bàn phím và nó có thể trở nên khó chịu khi những ngón tay nhỏ bé tội nghiệp của chúng ta viết đi viết lại những ký tự này trong tất cả các dự án react của chúng ta.

Nếu bạn nhập React.useState trên bàn phím, các đầu ngón tay của bạn sẽ phải đi theo các hướng sau:
![](https://images.viblo.asia/0b765e69-b0b8-42bd-a54c-1ac0795c5e44.png)

Mình có thể nghiêm trọng hóa quá mức đối với vấn đề đơn giản này, nhưng quan điểm của mình cho bài viết này không chỉ là về tổ hợp phím. Đó là về tổ hợp phím và nhiều thứ khác khi chúng ta phát triển ứng dụng react. Mình đã học được rằng chúng ta nên tận dụng tất cả các cơ hội có sẵn càng nhiều càng tốt để giảm bớt căng thẳng không cần thiết bởi vì sức khỏe và thời gian của chúng ta là rất quý giá.

Như đã nói, mình muốn dành thời gian để viết bài này để giúp các coder React như bạn và mình tìm cách tiết kiệm càng nhiều thời gian và năng lượng càng tốt bằng cách thông báo cho bạn những cách hữu ích mà bạn có thể sử dụng để đẩy nhanh quá trình phát triển ứng dụng của mình!
# 1.Extension: User Snippets
Mình đã thấy nhiều thứ tuyệt vời trong quá trình phát triển ứng dụng React và User Snippets chính là một trong số đó.

VSCode là một extension của VScode cho phép bạn xác định các đoạn tùy chỉnh của riêng mình mà bạn có thể sử dụng lại vô số lần trong các dự án của mình chỉ bằng cách nhấn một vài chữ cái.
Vậy, nó làm được những gì?

Tính năng này cho phép bạn tạo bất kỳ đoạn mã tùy chỉnh nào chỉ bằng cách nhập một vài chữ cái (mà bạn khai báo bằng tiền tố tùy chỉnh).
Ví dụ: khi chúng ta tạo một component  mới sẽ sử dụng API React.useReducer, chúng ta ít nhất sẽ phải khai báo state, reducer  và một cái gì đó như ` [ state ,  ftime ] = React.useReducer (reducer, initState)`  để code có thể chạy được:

```
const initialState = {
  //
}

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

function MyComponent() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return <div />
}
```

Bạn có thể tiết kiệm cả mớ thời gian và năng lượng bằng cách nhét chúng vào snippets như sau:

```
{
  "my React.useReducer snippet": {
    "prefix": "rsr",
    "body": [
      "const initialState = {",
      "  //$1",
      "}",
      "",
      "function reducer(state = initialState, action) {",
      "  switch (action.type) {",
      "    default:",
      "      return state",
      "  }",
      "}",
      "",
      "function MyComponent() {",
      "  const [state, dispatch] = React.useReducer(reducer, initialState)",
      "  ",
      "  return <div />",
      "}"
    ]
  }
}
```

Tất cả những gì bạn càn làm là nhấn **rsr** và đoạn code trên sẽ tự động được viết ra cho bạn.
Dưới đây là 1 số snippets mà mình hay sử dụng

Test nhanh css xem nó hiển thị có đúng không bằng cách cung cấp cho nó borders tạm thời:

```
{
  "border test": {
    "prefix": "b1",
    "body": "border: 1px solid red;"
  },
  "border test2": {
    "prefix": "b2",
    "body": "border: 1px solid green;"
  },
  "border test3": {
    "prefix": "b3",
    "body": "border: 1px solid magenta;"
  },
  "border test4": {
    "prefix": "b4",
    "body": "border: 1px solid blue;"
  },
  "border test5": {
    "prefix": "b5",
    "body": "border: 1px solid #fe7200;"
  }
}
```

Import react:

```
{
  "import react": {
    "prefix": "reaa",
    "body": "import React from 'react'"
  }
}
```

Import 1 số components thường dùng như Button:

```
{
  "import Button from 'components/Button'": {
    "prefix": "btt",
    "body": "import Button from 'components/Button'"
  }
}
```

Trên đây không phải là toàn bộ các đoạn mình sử dụng nhưng mình hy vọng nó giúp bạn hiểu được bạn có thể tiết kiệm được bao nhiêu thời gian và năng lượng bằng cách tận dụng User Snippets.

# 2.Extension: Prettier
Nếu bạn đang không sử dụng Prettier, xin vui lòng, coi như mình đang cầu xin bạn tạm dừng mọi thứ lại và sử dụng [nó](https://prettier.io/) luôn đi.

# 3.Extension + Package: TypeScript + ESLint
Khoảng bốn năm trước, khi Promise chính thức được đưa vào [ECMAScript 2015 Specification](http://www.ecma-international.org/ecma-262/6.0/), hệ sinh thái React có một cuộc bùng nổ công nghệ đã làm thay đổi cách chúng ta phát triển ứng dụng web ngày nay.

TypeScript tại thời điểm này là một trong số đó khi nó đã tham gia vào hệ sinh thái React và dần dần được chấp nhận rộng rãi trong cộng đồng cho đến ngày nay - và vì những lý do chính đáng!

TypeScript đã là một công cụ mạnh mẽ cho phép bạn tiết kiệm nhiều thời gian và năng lượng trước khi các lỗi tiềm ẩn có cơ hội xảy ra.

Ngoài các tính năng thông thường mà nó cung cấp, nó giúp ghi lại các components của bạn, ngăn ngừa các lỗi trong tương lai xảy ra và dạy cho bạn rất nhiều về chính ngôn ngữ JavaScript mà không cần bạn phải dành một xu vào ebook để học những thứ kỳ lạ.

Việc áp dụng TypeScript với ESLint vào các dự án React của bạn sẽ giúp bạn trong các tình huống mà chúng tavô tình quên mất cách React hoạt động:
![](https://images.viblo.asia/c7052c1c-cae0-42b5-9d0b-04f95a65e621.png)

# 4. Phím tắt: Tìm kiếm keyword trong file
Đánh dấu một từ khóa bạn chọn trong một file và nhấn Ctrl + Shift + L sẽ bôi đen tất cả từ khóa trong file.

Điều này khá hữu ích khi bạn muốn đổi tên component  vì rõ ràng chúng ta luôn có ít nhất ba lần xuất hiện khi một component có thành phần con:
```
import React from 'react'

function App() {
  return <h2>Useful content</h2>
}

function Root() {
  return (
    <App>
      <p>Will I even be rendered?</p>
    </App>
  )
}
```

# 5. Phím tắt: Tìm kiếm file
Nó có thể dễ dàng trở nên bực bội khi phải sử dụng File Explorer mọi lúc khi bạn đang tìm kiếm một file cụ thể. Điều này trở thành một vấn đề lớn khi bạn muốn phân tích một file trong thư mục node_modules vì VSCode mang đến điều này cho bạn:

![](https://images.viblo.asia/a1d04310-59ee-4b40-b353-e4814ba06cfd.png)

Đường màu đỏ cho biết quãng đường mà bạn cần cuộn qua và màu xanh biểu thị kích thước của thanh cuộn. Điều này tác động đến hiệu suất khi mở rộng.

Bạn có thể dễ dàng tìm và mở một file nằm ở bất kỳ đâu trong dự án bằng cách tìm kiếm tên của nó mà không phải di chuyển một milimet chuột. Chỉ cần nhấn Ctrl + T, nhập tên file và xong, file cần tìm sẽ hiện ra ngay trước mắt bạn.

# 6.Extension: Custom TODO highlights
Đây là một extension trông có vẻ có chỉ sử dụng cho mục đích trang trí code, nhưng nó đã trở thành một công cụ mạnh mẽ với mình theo thời gian trong các môi trường cần sự cẩn trọng cao.
Trước hết, điều cực kỳ quan trọng là viết ra các todos ở đâu đó miễn là bạn có thể nhìn thấy và được nhắc nhở về một cái gì đó. Nó có thể trên ứng dụng Evernote, sách của bạn, một mảnh giấy, v.v. 

Nếu bạn sử dụng [TODO Highlights](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) như mình, bạn sẽ đặt todo ngay trên đầu đoạn code mà bạn đang viết dưới dạng các nhận xét. Nó cực kỳ hữu ích với TODO Highlights được sử dụng cùng vì chúng ta có thể custom màu khi bạn đặt thêm TODO: vào đằng trước như ví dụ dưới đây:
![](https://images.viblo.asia/40d4072b-ec76-4303-b5f9-45791e1132fb.png)

Điểm mạnh của TODO Highlights là nó cho bạn khả năng điều chỉnh màu sắc theo ý mình
![](https://images.viblo.asia/8c90a802-95d4-48ce-bffb-1d5a981a7f98.jpg)

Điều này đã trở thành một tính năng có giá trị vì chúng ta có thể nhanh chóng lấy lại sự tập trung cũng như sự hiểu biết về những gì đang diễn ra trong mỗi file bất kể ta quay lại từ đâu.
Từ khóa todohighlight yêu thích của mình là BUG: vì nó màu đỏ. Chúng ta thường liên kết màu đỏ với lỗi hoặc một cái gì đó nguy hiểm để điều này dễ dàng thu hút sự chú ý của chúng ta vào các phần quan trọng trong code:

![](https://images.viblo.asia/0a80147e-4784-48e9-a92d-9b9f10e6f113.jpg)

# 7.Extension: Một theme bất kỳ mà bạn thấy thích
Lập trình ứng dụng React kết hợp với các theme màu VSCode thú vị là một cách giúp mình giải trí dẫn đến code chất lượng tốt hơn.

Việc sử dụng một theme bạn thích là vô cùng quan trọng bởi vì màu của các thành phần code React mà bạn có khả năng "giao diện" hoặc "cảm nhận" nhất định với chúng, sẽ giúp bạn dễ dàng trong quá trình lập trình, như chúng ta có thể thấy dưới đây:

**Không phải component**
![](https://images.viblo.asia/794db8f0-b647-41e0-9aaf-2df1ed6a2826.jpg)

**component**
![](https://images.viblo.asia/d969dbf4-3328-408e-a30a-16fbd9513b76.jpg)

# 8.Tính năng: Breadcrumbs
Thời gian trôi qua thật nhanh! Cảm giác như mới ngày hôm qua khi  breadcrumbs được phát hành trong VScode.

Điều này tiếp tục cho mình có một thời gian dễ dàng hơn khi phát triển ứng dụng React.

Do tính chất của hệ thống phân cấp cha / con component  của React, breadcrumbs trở nên rất phù hợp khi code React (miễn là bạn xây dựng cấu trúc thư mục của mình theo phân cấp) vì về cơ bản nó cho bạn thấy rằng một file thành phần được lấy từ thư mục mẹ (mà trong hầu hết các trường hợp của mình luôn là một component  được xuất mặc định từ tệp index.tsx):
![](https://images.viblo.asia/4be22c03-74aa-44fd-99ae-8b77d233f349.jpg)

Breadcrumbs ở trên cho ta thấy rằng Add là con của Birthdays, thứ lại là con của Date, thứ là route Admin component.

Breadcrumbs được bật theo mặc định. Nhưng vấn đề là hầu hết mọi người không để ý đến Breadcrumbs. Nó âm thầm trở nên hữu ích theo những cách bất ngờ, vì vậy hãy chú ý nhiều hơn vào nó!

Trên đây là những extension, những tổ hợp phím và nhiều thứ nhỏ nhặt khác mà giúp ích mình rất nhiều trong quá trình làm việc với React. Hi vọng những điều này sẽ có ích với cách bạn như cách nó gắn với cuộc sống coder React của mình. Nếu có bất kỳ ý kiến gì hay bạn thậm chí có những bí quyết bí mật hơn, đừng ngại, hãy chia sẻ ở phần comment nhé.
[Source](https://dev.to/jsmanifest/10-practices-in-vscode-to-hasten-your-react-development-flow-2jho)