# Sử dụng `shouldComponentUpdate` để tránh việc render lại tốn tài nguyên.

React Components sẽ render lại mỗi khi props hay state của nó hay đổi. Vậy hãy tưởng tượng việc phải render lại toàn bộ page khi có 1 action, nó sẽ tốn một lượng tài nguyên lớn để load lại trên trình duyệt. Và đó là lý do ta nên sử dụng `shouldComponentUpdate`, nó sẽ check hàm `shouldComponentUpdate` trả về true hoặc false. Vậy nên bạn có một Component tĩnh, hãy mạnh dạn return false trong `shouldComponentUpdate`. Hoặc nếu nó không phải một component tĩnh hoàn toàn, hãy chỉ trả về true khi props/state đã thay đổi. (Hoặc dùng PureComponent).

**Bad**
```js
const AutocompleteItem = (props) => {
  const selectedClass = props.selected === true ? "selected" : "";
  var path = parseUri(props.url).path;
  path = path.length <= 0 ? props.url : "..." + path;

  return (
    <li
      onMouseLeave={props.onMouseLeave}
      className={selectedClass}>
      <i className="ion-ios-eye"
         data-image={props.image}
         data-url={props.url}
         data-title={props.title}
         onClick={props.handlePlanetViewClick}/>
      <span
        onMouseEnter={props.onMouseEnter}
      >
        <div className="dot bg-mint"/>
        {path}
      </span>
    </li>
  );
};
```

**Good**
```js
export default class AutocompleteItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.url !== this.props.url ||
      nextProps.selected !== this.props.selected;
  }

  render() {
    const {props} = this;
    const selectedClass = props.selected === true ? "selected" : "";
    var path = parseUri(props.url).path;
    path = path.length <= 0 ? props.url : "..." + path;

    return (
      <li
        onMouseLeave={props.onMouseLeave}
        className={selectedClass}>
        <i className="ion-ios-eye"
           data-image={props.image}
           data-url={props.url}
           data-title={props.title}
           onClick={props.handlePlanetViewClick}/>
        <span
          onMouseEnter={props.onMouseEnter}>
          <div className="dot bg-mint"/>
          {path}
        </span>
      </li>
    );
  }
}
```

# Sử dụng PureComponent
Pure Components sẽ tự implement mặc định cho bạn hàm `shouldComponentUpdate` và trong đó nó sẽ shallow compare props/state cho bạn. Việc này nhằm mục đích tránh rennder lại khi state hoặc props không thay đổi.

**Bad**
```JS
export default (props, context) => {
  // ... do expensive compute on props ...
  return <SomeComponent {...props} />
}
```

**Good**
```js
import { pure } from 'recompose';
// This won't be called when the props DONT change
export default pure((props, context) => {
  // ... do expensive compute on props ...
  return <SomeComponent someProp={props.someProp}/>
})
```
**Better**
```js
// This is better mainly because it uses no external dependencies.
import { PureComponent } from 'react';

export default class Example extends PureComponent {
  // This won't re-render when the props DONT change
  render() {
    // ... do expensive compute on props ...
    return <SomeComponent someProp={props.someProp}/>
  }
}
})
```

# Sử dụng reselect
Mục đích của reselect tương tự như PureComponent hoặc `shouldComponentUpdate` nhưng lại là dùng cho redux.
Sử dụng Reselect trong Redux connect(mapState) sẽ tránh việc store update dữ liệu nếu giá trị của nó không có gì thay đổi.
**Bad**
```js
let App = ({otherData, resolution}) => (
  <div>
    <DataContainer data={otherData}/>
    <ResolutionContainer resolution={resolution}/>
  </div>
);

const doubleRes = (size) => ({
  width: size.width * 2,
  height: size.height * 2
});

App = connect(state => {
  return {
    otherData: state.otherData,
    resolution: doubleRes(state.resolution)
  }
})(App);
```

Trong trường hợp này, mỗi lần otherData trong state thay đổi, cả DataContainer và ResolutionContainer sẽ bị render lại dù resolution trong state không hề thay đổi. Lý do là vì doubleRes function luôn trả về một resolution object mới với một địa chỉ mới. Nếu sử dụng reselect ta sẽ giải quyết được vấn đề này: Reselect sẽ lưu lại giá trị tính toàn của hàm doubleRes và sẽ không thay đổi cho đến khi có arguments mới được truyền vào.

**Good**
```js
import { createSelector } from 'reselect';
const doubleRes = createSelector(
  r => r.width,
  r => r.height,
  (width, height) => ({
    width: width * 2,
    height: height * 2
  })
);
```