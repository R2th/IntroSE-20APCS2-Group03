Trong lúc code `React` việc sử  dụng lại component của người khác là rất cần thiết. Có thể không ít bạn đã gặp vấn đề là prop này là gì và cần truyền cái gì cho nó thì phù hợp. Vì vậy việc định nghĩa kiểu dữ  liệu cho các `props` đó là rất cần thiết để người khác khi sử dụng component đó có thể hiểu được mà không cần phải lọ mọ vào đọc code phải không nào.
## 1. PropTypes là gì?
`PropTypes` hiểu một cách đơn giản là  giúp bạn có thể check được các `props` được truyền vào component có type là gì.

Khi người khác sử dụng `component` của bạn thì họ sẽ dễ dàng biết được `props` đó là gì và có bắt buộc phải truyền vào hay không.

Ngoài ra bạn còn có thể đặt giá trị mặc định cho props thông qua `defaultProps`.

## 2. Làm thế nào để sử dụng nó?
Muốn dùng nó thì cực kì đơn giản bạn chỉ cần:
```
npm install --save prop-types
```

hoặc

```
yarn add prop-types
```

Sau đó thì:

```js
import PropTypes from 'prop-types';

class Funny extends React.Component {
  render() {
    return (
      <h1>My name is {this.props.name}</h1>
    );
  }
}

Funny.propTypes = {
  name: PropTypes.string
};
```
## 3. PropTypes có những loại gì?
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Đây là một số type cơ bản chắc là ai cũng biết nhỉ
  propArray: PropTypes.array,
  propBool: PropTypes.bool,
  propFunc: PropTypes.func, // Đây là một function
  propNumber: PropTypes.number,
  propObject: PropTypes.object,
  propString: PropTypes.string,
  propSymbol: PropTypes.symbol,

  // Bất cứ thứ gì có thể dược rende: numbers, string, element, 
  // hoặc là một array chứa những thứ trên
  propNode: PropTypes.node,

  // Một React element.
  propElement: PropTypes.element,

  // Có thể limit props là một trong những kiểu nào đó 
  // bằng cách coi nó như enum
  propEnum: PropTypes.oneOf(['News', 'Photos']),

  // một object mà có thể là một trong nhiều kiểu
  propUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),

  // Là một mảng của các số chẳng hạn
  propArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Là một object mà trong đó có value là number
  propObjectOf: PropTypes.objectOf(PropTypes.number),

  // một object theo một format nào đó
  propShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // Hoặc là một mảng và trong mảng đó chứa các object
  propArrayObj: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number
    }),
  ),

  // bất cứ kiểu nào
  requiredAny: PropTypes.any,
}
```

Để bắt buộc phải truyền vào một prop nào đó thì chỉ cần thêm `isRequired` vào sau type là được:
```
propNumber: PropTypes.number.isRequired
```
## 4. Làm thế nào để truyền giá trị mặc định cho props?
Nó rất đơn giản chỉ cần bạn khai báo thêm `defaultProps` là được thôi
```js
import PropTypes from 'prop-types';

class Funny extends React.Component {
  render() {
    return (
      <h1>My name is {this.props.name}</h1>
    );
  }
}

Funny.propTypes = {
  name: PropTypes.string
};

Funny.defaultProps = {
  name: 'Sun*'
}
```

## 5. Kết luận
Trên đây là một số kiến thức về prop-types mà mình đã tìm hiểu được. Hi vọng nó giúp ích được cho bạn 😄

Link thảm khảo: https://reactjs.org/docs/typechecking-with-proptypes.html