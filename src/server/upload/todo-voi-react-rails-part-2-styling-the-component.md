Trong bài trước (https://viblo.asia/p/todo-voi-react-rails-part-1-basic-component-yMnKMnQgZ7P) mình đã làm hướng dẫn về cách cài đặt và tạo project react mới, và làm demo về cách tạo các basic component. Trong đó cũng có thể thêm mới, xoá và hiển thị list.

![](https://images.viblo.asia/a56a5ac7-9b4a-42cb-bf2f-600c914d1abd.png)
Trong bài này chúng ta sẽ thêm Style cho nó.
Có nhiều cách và thư viện có sẵn để chúng ta có thể dùng.

* **Inline styling**
Cách này là mình viết luôn css ở trong thẻ `style` , hoặc mình viết css ở ngay trong component đó. Cách này, css chỉ dùng được ở trong component đó thôi, không dùng lại ở component khác được.

**ví dụ:**

```js
import React from 'react';

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};

const Box = () => (
  <div style={divStyle}>
    <p style={{fontSize: '15px'}}>Get started with inline style</p>
  </div>
);

export default Box;
```
* **CSS Stylesheet**
Cách này là tách css file ra một file khác. Dùng cách này chúng ta có thể dùng lại các style được.

**ví dụ:**
```css
/* Box.css */

.divStyle {
  margin: '40px',
  border: '5px solid pink'
};
```

```js
import React from 'react';
import './Box.css';

const Box = () => (
  <div style={divStyle}>
    <p>Get started with inline style</p>
  </div>
);

export default Box;
```
* **reactstrap** (https://github.com/reactstrap/reactstrap)
là thư viện component của Bootstrap. 

Ở đây chúng ta sẽ dùng **reactstrap** để style project TODO của mình.

### Install

```
npm install --save bootstrap
npm install --save reactstrap react react-dom
```

import Bootstrap CSS vào trong file src/index.js:
```
import 'bootstrap/dist/css/bootstrap.css';
```

Import reactstrap components trong file src/App.js:
```
import { Button } from 'reactstrap';
```

Done. Bây giờ bạn có thể dùng các component của Bootstrap, xem các components ở đây: 
https://reactstrap.github.io/components/

### Apply vào ToDo project
**Tạo NavBar Component**

Mình sẽ tạo một folder : component để chứa các component , để có thể dùng lại được.

**./src/component/NavHeader.js**

```js
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const NavHeader = () => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">TODO Demo</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/about/">ABOUT</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    </div>
  )
}

export default NavHeader
```

**App.js**

```js
import NavHeader from './component/NavHeader'; // NavHeader 
...

class App extends Component {
  render() {
    return (
        ....
        <NavHeader />
        ...
    );
  }
}
```

**ToDoList.js**
```js
import { Table, Container, Row} from 'reactstrap';
...

class TodoList extends Component {
 ...
 render() {
    return (
        <Container>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.renderItem()}
              </tbody>
            </Table>

            <CreateForm
              onAddItem={(e) => this.onAddItem(e)}
              value={this.state.taskName}
              onChange={(e) => this.onChange(e)}
            />
          </Row>
        </Container>
    )
}
```

**ToDoItem.js**

```js
import { Button } from 'reactstrap';
...

class ToDoItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><Button color="danger" onClick={this.props.onDelete}>Delete</Button></td>
      </tr>
    )
  }
}
```

**CreateForm.js**

```
import { Button, InputGroup, Input } from 'reactstrap';
...

class CreateForm extends Component {
  render() {
    return (
      <div className="formCreate">
        <form onSubmit={this.props.onAddItem}>
        <InputGroup>
          <Input
            placeholder="task name"
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <Button color="primary">Add</Button>
        </InputGroup>
        </form>
      </div>
    )
  }
}

```

Sửa các file trên dùng reactstrap xong, chạy lại bạn sẽ nhận được kết quả như ảnh sau.
![](https://images.viblo.asia/71cf505b-b631-4ec5-aa01-d81535c34fe5.png)

### References
https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
https://github.com/reactstrap/reactstrap