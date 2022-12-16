# `Viết unit test cho React với React Testing Library`
Nếu bạn đã từng viết unit test trước đây thì chắc hẳn khá quen với bộ combo jest + enzyme dùng để viết unit test cho React. Jest thì có dùng với bất kỳ framework nào được viết bằng javascript nhưng Enzyme thì được Air bnb dành riêng cho React giúp việc render component một cách dễ dàng hơn trong qua trình viết test. Còn với React Testing Library, thư viện này được kỳ vọng sẽ có thể thay thế hoàn toàn Enzyme, giúp quá trình viết test còn đơn giản hơn nữa.
![](https://images.viblo.asia/0bd14b20-a4df-443d-b104-fd4a917d554f.png)
## Target Component
Đây sẽ là component mà chúng ta sẽ cần phải viết test. Bao gồm TodosContainer nơi khai báo state và function chính, Todos xử lý mặt view và là children của TodosContainer
```js
const Todos = ({ todos, select, selected }) => (
  <React.Fragment>
  {todos.map(todo => (
    <React.Fragment key={todo.title}>
      <h3 data-testid="item" className={ selected && selected.title === todo.title ? 'selected' :'' }>{todo.title}</h3>
      <div>{todo.description}</div>
      <button onClick={() => select(todo)}>Select</button>
    </React.Fragment>
  ))}
  </React.Fragment>
);

class TodosContainer extends React.Component {
  state = {
    todo: 0,
  }
  
  select = (todo) => {
    this.setState({
      todo,
    })
  }
  
  render() {
    return (
      <Todos select={this.select} selected={this.state.todo} />
    );
  }
}
export default TodosContainer;
```
## Writing test case
Ta sẽ cần tiến hành các case test cơ bản như sau:
```js
const todos = [
  {
    title: 'todo1'
  },
  {
    title: 'todo2'
  }
];

describe('Todos', () => {
  it('should each title match with data', () => {
  })

  it('should the selected todo update class when be selected', () => {   
  })
});
```

Với `react-testing-library` support ta cách render nhanh chóng như sau:
```js
 const {getByText, getByTestId, container} = render(<Todos todos={todos} />);
```

* getByText: lấy element thông qua label text của chúng
* getByTestId: lấy element bằng thuộc tính data-attribute, ở đây sẽ là data-testid="saved" nếu bạn lấy bằng getByTestId('saved')
* container: Khối thẻ đó mà component được render vào hay còn là wrapper

Bây giờ thì ta có thể hoàn thiện đoạn test trên được rồi
```js
describe('Todos', () => {
  it('should each title match with data', () => {
    const {getByText, getByTestId, container} = render(<Todos todos={todos} />);
    const elem = getByTestId('item');
    expect(elem.innerHTML).toBe('todo1');
  })
  
it('should the selected todo update class when be selected', () => {  
    const {getByText, getByTestId, container} = render(<Todos todos={todos} />);
    fireEvent.click(getByText('Select'));
    const elem = getByTestId('item');
    expect(elem.classList[0]).toBe('selected');
  })
});
```
## Conclusion

Nhìn chung, qua một số bước cơ bản, ta đã có thể hoàn thành được những test case cần thiết cho một component. Ngoài ra, react testing library còn hỗ trợ nhiều hàm thú vị, các bạn có thể tham khảo trên document của nó nhé

## `References`
https://softchris.github.io/pages/react-testing-library.html#dealing-with-asynchronous-code
https://jestjs.io/en/