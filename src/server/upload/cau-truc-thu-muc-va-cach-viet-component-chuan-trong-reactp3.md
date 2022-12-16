**Refs**

Luôn sử dụng ref callbacks. eslint: react/no-string-refs

```
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```

**Dấu ngoặc đơn**

Bao bọc các thẻ JSX trong dấu ngoặc đơn khi chúng dài hơn một dòng. eslint: react/jsx-wrap-multilines

```
// bad
render() {
  return <MyComponent variant="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

**Tag**

Luôn tự đóng các tag không có con. eslint: react/self-closing-comp

```
// bad
<Foo variant="stuff"></Foo>

// good
<Foo variant="stuff" />
If your component has multi-line properties, close its tag on a new line. eslint: react/jsx-closing-bracket-location

// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

**Method**

Sử dụng các chức năng mũi tên để đóng các biến cục bộ.

```
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```

Thêm xử lý sự kiện cho phương thức render trong constructor. eslint: react / jsx-no-bind

Tại sao? Một cuộc gọi bind trong đường dẫn render tạo ra một chức năng hoàn toàn mới trên mỗi render đơn.

```
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />;
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}
```

Không sử dụng tiền tố gạch dưới cho các method nội bộ của một thành phần React.

Tại sao? Tiền tố gạch dưới đôi khi được sử dụng như một quy ước trong các ngôn ngữ khác để biểu thị quyền riêng tư. Nhưng, không giống như các ngôn ngữ đó, không có sự hỗ trợ riêng cho tính riêng tư trong JavaScript, mọi thứ đều công khai. Bất kể ý định của bạn, thêm tiền tố gạch dưới vào thuộc tính của bạn không thực sự làm cho chúng là riêng tư, và bất kỳ thuộc tính nào (gạch dưới có tiền tố hay không) phải được coi là công khai.

```
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  },

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
}
```

Hãy chắc chắn trả về một giá trị trong các phương thức render của bạn. eslint: react / require-render-return

```
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```

**Ordering**

Thứ tự lớp mở rộng React.Component:

1. optional static methods
2. constructor
3. getChildContext
4. componentWillMount
5. componentDidMount
6. componentWillReceiveProps
7. shouldComponentUpdate
8. componentWillUpdate
9. componentDidUpdate
10. componentWillUnmount
11. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
12. getter methods for render like getSelectReason() or getFooterContent()
13. optional render methods like renderNavigation() or renderProfilePicture()
14. render

* Cách xác định propTypes, defaultProps, contextTypes, v.v ...

```
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

class Link extends React.Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
```

Sắp xếp cho React.createClass: eslint: react / sort-comp

1. displayName
2. propTypes
3. contextTypes
4. childContextTypes
5. mixins
6. statics
7. defaultProps
8. getDefaultProps
9. getInitialState
10. getChildContext
11. componentWillMount
12. componentDidMount
13. componentWillReceiveProps
14. shouldComponentUpdate
15. componentWillUpdate
16. componentDidUpdate
17. componentWillUnmount
18. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
19. getter methods for render like getSelectReason() or getFooterContent()
20. optional render methods like renderNavigation() or renderProfilePicture()
21. render

**Mounted**

Không sử dụng isMounted. eslint: react/no-is-mounted
Tại sao? isMounted là một anti-pattern, không có sẵn khi sử dụng các lớp ES6, và không được chính thức chấp nhận.