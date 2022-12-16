*Pass JSX elements to components through props*

*Nếu bạn đã biết hoặc đã tìm hiểu về HOC (higher order component), thì chúng ta có thể thấy rằng việc sử dụng lại 1 logic của 1 component khác có thể rất thuận lợi và tiện dụng, việc sử dụng lại logic thành phần có thể rất thuận tiện nếu nhiều thành phần cần truy cập vào cùng một dữ liệu hoặc chứa cùng một logic.
Nếu bạn chưa tìm hiểu về nó, không sao mình nghĩ mình sẽ có 1 bài viết về nó tiếp theo ^^.*
<div align="center"> <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="30"></div>

# Sơ lược.
Một cách khác để làm cho các component có thể tái sử dụng thì bạn nên biết **Render prop pattern**. 1 render prop là 1 prop trong Component mà giá trị đó là 1 hàm và hàm đó lại trả về JSX element. Về bản chất thì 1 Component không render bất cứ bất cứ thứ gì ngoài prop. Thay vào đó 1 component chỉ đơn giản gọi render prop thay vì thực hiện việc logic render của nó.

Hãy tưởng tượng chúng ta có 1 Component Title. Trong trường hợp này, component Title không làm bất cứ điều gì ngoài việc hiển thị giá trị mà chúng ta truyền vào, chúng ta có thể sử dụng 1 render prop cho việc này, hãy truyền giá trị mà chúng ta muốn Component Title hiển trị 1 render prop.
```JavaScript
<Title render={() => <h1>I am a render prop, happy new year!</h1>} />
```

Trong component Title chúng ta có thể render ra giá trị này bằng cách return 1 render prop được gọi.

```JavaScript
const Title = (props) => props.render();
```


Đối với 1 thành phần Component, chúng ta phải truyền 1 prop gọi là render, cũng chính là 1 hàm trả về 1 React element
```JavaScript
import React from "react";
import { render } from "react-dom";

import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title
      render={() => (
        <h1>
          <span role="img" aria-label="emoji">
            ✨
          </span>
          Viblo here! <span role="img" aria-label="emoji">
            ✨
          </span>
        </h1>
      )}
    />
  </div>,
  document.getElementById("root")
);
```
[Chạy thử với CodeSanbox](https://codesandbox.io/s/vigorous-silence-8bn6v?file=/src/index.js)

Perfect!  đây là điều thú vị về render prop, là 1 component mà nó nhận prop có thể rất tái sử dụng 💪, chúng ta có thể sử dụng nó nhiều lần, truyền các giá trị khác nhau mọi lúc.
```JavaScript
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title render={() => <h1>✨ First render prop! ✨</h1>} />
    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />
  </div>,
  document.getElementById("root")
);
```
[Chạy thử với CodeSanbox](https://codesandbox.io/s/jolly-mestorf-x2g0k?file=/src/index.js)

Mặc dù mấy ông thần này được gọi là `render props`, nhưng 1 `render prop` không nhất thiết phải gọi nó là `render`. Bất kỳ prop mà nó render JSX thì được xem như là 1 `render prop`, bây giờ hãy đổi tên `render prop` đã sử dụng trong ví dụ trước và đặt tên cụ thể cho chúng.
```JavaScript
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => (
  <>
    {props.renderFirstComponent()}
    {props.renderSecondComponent()}
    {props.renderThirdComponent()}
  </>
);

render(
  <div className="App">
    <Title
      renderFirstComponent={() => <h1>✨ First render prop! ✨</h1>}
      renderSecondComponent={() => <h2>🔥 Second render prop! 🔥</h2>}
      renderThirdComponent={() => <h3>🚀 Third render prop! 🚀</h3>}
    />
  </div>,
  document.getElementById("root")
);
```
[Chạy thử với CodeSanbox](https://codesandbox.io/s/jovial-voice-x717m?file=/src/index.js)

Great!🐾  thật tuyệt vời, chúng ta thấy rằng chúng ta có thể tái sử dụng các đạo cụ kết xuất để làm cho 1 component có thể tái sử dụng được,  vì chúng ta có thể truyền các data khác nhau đến render prop mọi lúc mọi nơi. Nhưng đọc nãy giờ bạn có hiểu tại sao tao phải dùng cái này không 😂😂

Một Component có một prop render thường làm nhiều hơn một cách đơn giản chỉ cần gọi `render` prop. Thay vào đó chúng ta thường muốn truyền dữ liệu từ 1 component thực hiện việc render prop, đến phần tử mà chúng ta truyền vào như 1 render prop.

```JavaScript
function Component(props) {
  const data = { ... }

  return props.render(data)
}
```

Render prop bây giờ có thể nhận giá trị này mà chúng ta đã truyền làm đối số của nó.
```JavaScript
<Component render={data => <ChildComponent data={data} />}
```

Hãy xem 1 ví dụ, chúng ta có 1 ứng dụng đơn giản, nơi người dúng có thể nhập vào cụ thể là nhiệt độ  (Fahrenheit and Kelvin).

```JavaScript
import React, { useState } from "react";
import "./styles.css";

function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Temp in °C"
    />
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Viblo huhu 🌞</h1>
      <Input />
      <VibloK/>
      <VibloF />
    </div>
  );
}

function VibloK({ value = 0 }) {
  return <div className="temp">{value + 273.15}K</div>;
}

function VibloF({ value = 0 }) {
  return <div className="temp">{(value * 9) / 5 + 32}°F</div>;
}
```
[Chạy thử với CodeSanbox](https://codesandbox.io/s/laughing-cannon-iv5t7?file=/src/App.js)

Hmmmm!.. Hiện tại thì có 1 vấn đề, cái StateFull Input component chứa giá trị đầu vào của người dùng, nghĩa là component VibloK và VibloF không thể truy cập vào khi user nhập

# Lifting state
Một cách để cung cấp thông tin đầu vào của người dùng cho cả 2 thành phần VibloK và VibloF trong ví dụ trên, chúng ta phải lifting state.
Trong trường hợp này, chúng ta có 1 stateful Input component, tuy nhiên các Component anh chị em VibloK và VibloF cũng cần truy cập vào dữ liệu này. Thay vì có một Component Stateful input,  chúng ta có thể lifting state như sau:

```JavaScript
function Input({ value, handleChange }) {
  return <input value={value} onChange={(e) => handleChange(e.target.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input value={value} handleChange={setValue} />
      <VibloK value={value} />
      <VibloF value={value} />
    </div>
  );
}
```

Mặc dù đây là một giải pháp hợp lệ, nó có thể khá khó khăn khi lifting state với các ứng dụng hay dự án lớn hơn với nhiều component xử lý nhiều prop.children, mỗi thay đổi có thể làm render lại tất cả các prop children ngay cả khi các prop này không xử lý dữ liệu -> ảnh hưởng perfomance.

# Render props

Thay vào đó chúng ta có thể sử dụng Render prop. Hãy thay đổi component Input theo cách mà nó có thể nhận được các Render prop (lợi hại chưa 🤩)

```JavaScript
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={(value) => (
          <>
            <VibloK value={value} />
            <VibloF value={value} />
          </>
        )}
      />
    </div>
  );
}
```
Perfect hehe, 2 component VibloK và VibloF truy cập dữ liệu được roài.

# Children as a function
Bên cạnh các thành phần JSX thông thường,  chúng ta có thể chuyển các hàm dưới dạng children đến component React.
Hãy thay đổi Input Component, thay vì truyền render prop cách rõ ràng, chúng ta chỉ truyền 1 hàm như 1 con cho component Input.

```JavaScript
export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {value => (
          <>
            <VibloK value={value} />
            <VibloF value={value} />
          </>
        )}
      </Input>
    </div>
  );
}
```

Như vậy chúng ta có quyền truy cập vào hàm này, thông qua props.children có sẵn trên component Input, thay vì gọi prop.render như trước với giá trị người dùng nhập vào, chúng ta gọi props.children với giá trị mà người dùng nhập vào.

```JavaScript
function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
```

# Kết Luận
Hy vọng sau khi đọc xong bài viết các anh chị cô chú có thể hiểu thêm về 1 kiến thức thú vị trong react là Render prop. Mình xin cảm ơn đã dành thời gian đọc và nay là đầu tháng giêng năm mới nên mình xin phép chúc toàn thể cộng đồng Vibloer 1 năm mới đầy năng lượng để phục vụ công việc 🥰🥰.