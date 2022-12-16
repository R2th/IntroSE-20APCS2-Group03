## Giới thiệu
Trong React, app của bạn càng lớn, thì số bug liên quan tới việc check kiểu càng nhiều. Để giải quyết vấn đề thì bạn có thể sử dụng Flow hoặc TypeScript để check kiểu cho toàn bộ app của mình. Tuy nhiên nếu vì lý do nào đó mà bạn không muốn dùng 2 cái trên, thì React cung cấp một giải pháp check kiểu khác được tích hợp sẵn đó là `PropTypes`. 

Để sử dụng `PropTypes` với một Component, bạn assign thuộc tính `propTypes` cho Component đó như sau
```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

`PropTypes` export một loạt các validator để có thể đảm bảo rằng data đầu vào là đúng. Trong ví dụ trên, chúng ta sử dụng `PropTypes.string`. **Vì lý do về mặt hiệu năng, `PropTypes` chỉ nên check ở chế độ development.**
## Các loại PropTypes
Sau đây là vài ví dụ về các loại validator khác. 
```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Bạn có thể khai báo prop là một kiểu JS nào đó.
  // Default thì những bọn này là optional
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Bất cứ thứ gì có thể dược rende: numbers, string, element, 
  // hoặc là một array chứa những thứ trên
  optionalNode: PropTypes.node,

  // Một React element.
  optionalElement: PropTypes.element,

  // Một instance của một class
  optionalMessage: PropTypes.instanceOf(Message),

  // Có thể limit props là một trong những kiểu nào đó 
  // bằng cách coi nó như enum
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // một object mà có thể là một trong nhiều kiểu
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Một array của một kiểu
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Một object mà value của nó có thể là một kiểu nào đó
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // một object theo một format nào đó
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // Bạn có thể thêm isRequired phía sau bất cứ cái nào ở trên
  // để xuất hiện warning khi props bị thiếu
  requiredFunc: PropTypes.func.isRequired,

  // bất cứ kiểu nào
  requiredAny: PropTypes.any.isRequired,

  // Ngoài ra bạn cũng có thể định nghĩa một custom validator. 
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

```

## Require Single Child
Với `PropTypes.element` bạn có thể chỉ định một child Component có thể được tryền vào. 
```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Đây phải chính xác là một element, nếu không React sẽ hiện warning
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
``` 

## Giá trị Prop Default
Bạn cũng có thể định nghĩa giá trị default của prop khi mà, prop đó không được set. 
```
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Set giá trị default cho props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);

```