Hello hello, hôm nay mình sẽ chia sẻ một số cách để làm tăng hiệu suất của `React` khi chúng ta sử dụng với `MobX`. Và nó hầu hết có thể áp dụng khi chúng ta sử dụng `React`, không phải dành riêng cho `MobX` nhé.

Let's gooooooooooo!!!!!!!

### 1. Chia nhỏ các component (Use many small components)
`Observer components` sẽ theo dõi tất cả các giá trị mà chúng sử dụng và `tracking` lại nếu bất kỳ giá trị nào trong số chúng thay đổi. Vì vậy, các `component` của bạn càng nhỏ, thay đổi mà chúng phải `re-render `lại càng nhỏ. Điều đó có nghĩa là các `component` của bạn render độc lập với nhau.

### 2. Hiển thị danh sách trong các component riêng biệt (Render lists in dedicated components)
Điều trên đặc biệt đúng khi `rendering collection` lớn. `React` nổi tiếng là tệ trong việc `rendering collection` lớn vì trình điều chỉnh phải đánh giá các thành phần được tạo ra bởi một `collection` trên mỗi lần thay đổi `collection`. Do đó, bạn nên có `components` chỉ `map` một `collection` và `render` nó, và không `render` gì khác.

Không nên:

```js
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <ul>
            {todos.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
    </div>
))
```

Trong danh sách trên, `React` sẽ không cần thiết phải  điều chỉnh `components TodoView` khi `user.name` thay đổi. Chúng sẽ không `re-render`, nhưng bản thân quá trình điều chỉnh rất tốn kém.

Nên:

```js
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <TodosView todos={todos} />
    </div>
))

const TodosView = observer(({ todos }) => (
    <ul>
        {todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
        ))}
    </ul>
))
```

### 3. Không nên sử dụng indexes làm keys (Don't use array indexes as keys)

Không sử dụng `array indexes` hoặc bất kỳ giá trị nào có thể thay đổi trong tương lai làm `key`. Tạo `id` cho các đối tượng của bạn nếu cần.

### 4. Giá trị tham chiếu muộn (Dereference values late)
Khi sử dụng `mobx-react` khuyến khích sử dụng giá trị tham chiếu muộn. Điều này là do `MobX` sẽ tự động `re-render` `components` mà bỏ qua các giá trị có thể quan sát được. Nếu điều này xảy ra sâu hơn trong `component tree` của bạn, thì sẽ có ít `component` phải `re-render` lại hơn.

Chậm hơn:

```js
<DisplayName name={person.name} />
```

Nhanh hơn:

```js
<DisplayName person={person} />
```

Trong ví dụ nhanh hơn, sự thay đổi trong thuộc tính tên chỉ kích hoạt `DisplayName` để hiển thị lại, trong khi ở ví dụ chậm hơn, chủ sở hữu của thành phần cũng phải hiển thị lại. Không có gì sai với điều đó, và nếu việc hiển thị thành phần sở hữu đủ nhanh (thường là như vậy!), Thì cách tiếp cận này hoạt động tốt.

### 5. Function props {🚀}
Bạn có thể nhận thấy rằng để bỏ qua các giá trị tham chiếu muộn, bạn phải tạo `observer components` nhỏ trong đó mỗi `component` được tùy chỉnh để hiển thị một phần dữ liệu khác nhau, ví dụ:

```js
const PersonNameDisplayer = observer(({ person }) => <DisplayName name={person.name} />)

const CarNameDisplayer = observer(({ car }) => <DisplayName name={car.model} />)

const ManufacturerNameDisplayer = observer({ car}) => (
    <DisplayName name={car.manufacturer.name} />
)
```


Điều này nhanh chóng trở nên  mệt mỏi nếu bạn có nhiều dữ liệu có kiểu khác nhau. Một giải pháp thay thế là sử dụng một hàm trả về dữ liệu mà bạn muốn:

```js
const GenericNameDisplayer = observer(({ getName }) => <DisplayName name={getName()} />)
```

Sau đó, bạn có thể sử dụng component như sau:

```js
const MyComponent = ({ person, car }) => (
    <>
        <GenericNameDisplayer getName={() => person.name} />
        <GenericNameDisplayer getName={() => car.model} />
        <GenericNameDisplayer getName={() => car.manufacturer.name} />
    </>
)
```


 Với cách này sẽ cho phép bạn sử dụng lại `GenericNameDisplayer` trong toàn bộ ứng dụng của bạn để hiển thị bất kỳ tên nào và bạn vẫn giữ` component re-rendering` ở mức tối thiểu.
 
*Tài liệu tham khảo: https://mobx.js.org/react-optimizations.html*


 Cảm ơn mọi người đã theo dõi bài viết, hẹn mọi người ở các bài viết tiếp theo nhé <3
 
 
![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)