Bản thân React đã sử dụng những kỹ thuật để tối ưu hoá quá trình render UI, nhưng tuỳ vào độ phức tạp và business của app mà bản thân React không thể đáp ứng đủ tối ưu hoá quá trình render; vì vậy chúng ta cần implement những kỹ thuật để cải thiện performance của app.

### Sử dụng shouldComponentUpdate
Thông thường các child components luôn luôn re-render lại theo parent component cho dù những props truyền vào cho các child components này không thay đổi.

Trong thực tế chúng ta chỉ cần render child components chỉ khi props truyền vào thay đổi, để làm được điều này chúng ta cần implement hàm `shouldComponentUpdate` như sau:
```js
shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data) {
        return false; // skip re-render component
    }
  return true; // re-render component (default)
}
```

Trong hầu hết tất cả các trường hợp, thay vì ta implement hàm `shouldComponentUpdate` manual, thì có thể kế thừa một class component từ `PureComponent` thay vì `Component`.

`PureComponent` tương tự như `shouldComponentUpdate` với *shallow comparison* của props, state

Tương tự với `PureComponent` trong class component thì ta có thể sử dụng `React.memo` trong functional component như sau:

```js
function MyComponent(props) {
  /* render using props */
}

export default React.memo(MyComponent);
```

### Sử dụng useMemo, useCallback hooks trong functional component
Nếu app có những data cần tính toán phức tạp thì ta cần cached (memorized) những data này để khỏi phải tính toán lại nếu input không thay đổi.

##### useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

`useMemo` chỉ thực hiện `computeExpensiveValue` nếu `a` hoặc `b` thay đổi.

Chúng ta cũng có thể apply `useMemo` để cached một react component như sau:

```js
const memoizedGreeting = useMemo(() => <div>Hello {name}!</div>, [name]);
```

##### useCallback
`useMemo` sử dụng để cached value, còn `useCallback` dùng để cached một `callback` function

Như vậy ta có thể sử dụng `useCallback` để cached một `callback` funtion không thay đổi reference trong mỗi lần render
```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```


### Virtualize Long Lists
Đây là kỹ thuật tối ưu performance nếu render một list data dài và phức tạp. Kỹ thuật này chỉ render một nhóm các item trong list ra trên UI chứ không render toàn bộ list data

Có nhiều libs support kỹ thuật này, mà điển hình là [react-window](https://github.com/bvaughn/react-window) và [react-virtualized](https://github.com/bvaughn/react-virtualized) , các libs này cung cấp các components cho việc hiển thị list, grid, table.

### Sử dụng Production Build
Khi release một react app chúng ta cần build ở mode `production`, việc này đảm bảo version react sẽ được loại bỏ các warning không cần thiết, các đoạn code debug, component, tools support khi dev và giảm build size,...

Sử dụng build file:
```html
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

webpack:
```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // important
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};
```

### Kết luận
Trên đây là một số điểm cần lưu ý để cải thiện performance của react app, một số kỹ thuật nữa sẽ có trong phần tiếp theo, các bạn đón đọc nhé, xin cám ơn!