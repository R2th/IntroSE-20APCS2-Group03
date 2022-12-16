Chắc hẳn trong số các bạn đang hoặc mới bắt đầu với framework ReactJS còn chưa nghe nhiều về khái niệm Hooks. Hoặc một số bạn đã làm việc với ReactJS rất lâu rồi và đang theo dõi về những biến động liên tục của ReactJS, gần đây nhất là Hooks. Và mình cũng vậy mình cũng mới nghe khái niệm này gần đây thôi, mình cũng đã lên trang chủ đọc một số thông tin và đặc biệt có một video nói về vấn đề này(các bạn có thể vào link [này](https://www.youtube.com/watch?v=dpw9EHDh2bM) để theo dõi mình thấy nó rất thú vị cũng như hữu ích). Còn bây giờ thì hãy cùng mình tìm hiểu về Hooks trong ReactJS :grinning:.




# 1. Giới thiệu về React Hooks.
Hooks là một bổ sung mới trong bản React 16.8. Nó cho phép chúng ta sử dụng state và một số feature khác mà không cần đụng đến class.

Về motivation của Hooks thì nó tập trung vào 3 vấn đề chính như sau:
* Reusing logic.
* Giant components.
* Confusing classes.

**Rất khó để sử dụng lại statefull logic giữa các components**

   Chắc rất nhiều người trong các bạn đã biết react có cung cấp một số kỹ thuật để bạn có thể làm điều này một cách dễ dàng. Ví dụ như `render props` và `higher-order-components`. Nhưng những kỹ thuật này đòi hỏi bạn phải cấu trúc component một cách hợp lý. Nhiều lúc nó làm bạn không biết là mình đang xử lý sai ở chỗ nào, rất khó để follow. Và một điều nữa với chữ `hell` quen thuộc đó là `wrapper hell` khi bạn nhìn vào `React Devtools` bạn sẽ thấy nhiều warpper hell nhìn thật đẹp :scream: .
 
Với Hooks bạn có thể tách phần xử lý logic một cách riêng biệt và dễ dàng sử dụng lại. Và vì nó riêng biệt nên chúng ta có thể dễ dàng testing, không cần phải wrap, wrap, wrap,... nhiều nữa :innocent:.

**Những component có logic phức tạp trở nên rất khó để hiểu**

Đối với những reuse logic chúng ta đã viết và sử dụng khá ổn. Nhưng sau những lần maintain liên tục liên tục khiến cho đoạn logic đó trở nên ngày càng khổng lồ, khó kiểm xoát đặc biệt là khi chúng ta đụng đến lifecycle. Nhưng trong vài trường hợp chúng ta không thể tách chúng ra được và vẫn tiếp tục phải maintain.

Hooks cho phép chúng ta cắt những logic lớn ra từng logic nhỏ hơn và liên quan đến nhau.

**Những class gây nhầm lẫn cho cả người sử dụng và máy**

Để tạo những logic code có thể sử dụng lại và tổ chức nó không phải điều dễ dàng. Và khái niệm class gần như trở thành rào cản cho chúng ta trong việc tiếp cận React. Để nắm được class chúng ta phải hiểu được `this` hoạt động như thế nào trong `Javascript` và khác biệt với những ngôn ngữ khác. Phân biệt cách sử dụng class và không sử dụng class.

Hooks giúp bạn có thể sử dụng những tính năng của React mà không cần sử dụng đến class.

Mình nghĩ với ba lý do trên đã đủ cho chúng ta muốn biết xem Hooks hoạt động như thế nào trong React. Vậy hãy bắt đầu tạo một vài Hooks nào!

# 2. Play around Hooks .
Đầu tiên hãy bắt đầu một demo Greeting đơn giản.

```javascript
import React, { useState } from 'react'
import { Row, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Greeting(props) {
  const [name, setName] = useState('John')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a name"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
      </Row>
    </Form>
  )
}
```
![](https://images.viblo.asia/100e7d03-3199-4577-b6b0-92e504d1f5e5.PNG)
Ở ví dụ này mình tạo một project mẫu bằng create-react-app cùng với reactstrap. Trong đoạn code trên mình có sử dụng một Hooks mà React cung cấp sẵn là `useState`. Hooks này cho phép bạn sử dụng state trong function mà không cần sử dụng class. Rất thuận tiện và dể hiểu nhỉ?

Chúng ta hãy thử tạo tiếp một field input surname nữa!
```javascript
import React, { useState } from 'react'
import { Row, Form, FormGroup, Label, Input } from 'reactstrap';

export default function Greeting(props) {
  const [name, setName] = useState('John')
  const [surname, setSurname] = useState('Smith')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleSurNameChange(e) {
    setSurname(e.target.value)
  }

  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a name"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
      </Row>
      <Row form>
        <FormGroup>
          <Label for="surname">Surname</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a surname"
            value={surname}
            onChange={handleSurNameChange}
          />
        </FormGroup>
      </Row>
    </Form>
  )
}
```
![](https://images.viblo.asia/a0b3f306-2320-4997-a700-831bf7480083.PNG)
Cool! Khá ok đúng không :grinning:

Tiếp theo hãy thử sử dụng context để thay màu của label.
```javascript
// Initial theme context
import React from 'react';

export const ThemeContext = React.createContext('cyan')
```
```javascript
import React, { Component } from 'react';
import Greeting from './components/Greeting'
import logo from './logo.svg';
import './App.css';
import { ThemeContext } from './contexts/ThemeContext' // Theme context

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main className="App-main">
          <p>Hooks</p>
          <ThemeContext.Provider value="cyan"> // Theme context provider
            <Greeting />
          </ThemeContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;
```
```javascript
import React, { useState, useContext } from 'react'
import { Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { ThemeContext } from '../contexts/ThemeContext' // Theme context

export default function Greeting(props) {
  const [name, setName] = useState('John')
  const [surname, setSurname] = useState('Smith')
  const theme = useContext(ThemeContext) // Using useContext

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleSurNameChange(e) {
    setSurname(e.target.value)
  }

  return (
    <Form>
      <Row form className={theme}> // Set theme for className
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a name"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
      </Row>
      <Row form className={theme}> // Set theme for className
        <FormGroup>
          <Label for="surname">Surname</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a surname"
            value={surname}
            onChange={handleSurNameChange}
          />
        </FormGroup>
      </Row>
    </Form>
  )
}
```
![](https://images.viblo.asia/1ea8891b-93e7-4f1a-8d11-b8ecf0eab432.PNG)

Chúng ta thấy màu của label đã đổi rồi :grinning:!

Cuối cùng hãy thử tạo 1 Hooks tách biệt giúp bạn hiện thị with của window.
```javascript
import React, { useState, useContext, useEffect } from 'react'
import { Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { ThemeContext } from '../contexts/ThemeContext'

export default function Greeting(props) {
  const [name, setName] = useState('John')
  const [surname, setSurname] = useState('Smith')
  const theme = useContext(ThemeContext)
  const width = useWindowWith()

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleSurNameChange(e) {
    setSurname(e.target.value)
  }

  return (
    <Form>
      <Row form className={theme}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a name"
            value={name}
            onChange={handleNameChange}
          />
        </FormGroup>
      </Row>
      <Row form className={theme}>
        <FormGroup>
          <Label for="surname">Surname</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Please input a surname"
            value={surname}
            onChange={handleSurNameChange}
          />
        </FormGroup>
      </Row>
      <Row form className={theme}>
        <p>{width}</p>
      </Row>
    </Form>
  )
}

function useWindowWith() {
  const [width, setWidth] = useState(window.innerWidth); // Initial state logic

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth) // Handle when window resize

    window.addEventListener('resize', handleResize)
    
    return () => { // Same as componentWillUnmount
      window.removeEventListener('resize', handleResize)
    }
  })

  return width
}
```
![](https://images.viblo.asia/8e188129-6e4b-403c-8aed-af0fd130e667.PNG)

Okay Hooks rất thú vị đúng không nào!
# 3. Một số ý kiến về Hooks.
Hooks rất OK nhỉ! Nó giải quyết khá nhiều vấn đề mà chúng ta gặp phải trong React từ trước tới giời. Tuy nhiên nó vẫn còn khá mới và sẽ còn trải qua nhiều lần cải tiến nữa. Vậy ngay từ bây giờ hãy cùng focus vào những cái cũ đã nhé, đó sẽ là nền tảng để chúng ta học cái mới nhanh hơn.

Thì bài chia sẻ của mình cũng hết rồi. Trong bài sau mình sẽ tạo một số logic mẫu để xem với Hooks thì nó sẽ hoạt động như thế nào!

Cảm ơn các bạn đã đọc bài của mình, hãy dùng thử Hooks và trải nghiệm. Hẹn gặp lại trong các bài post tiếp theo.