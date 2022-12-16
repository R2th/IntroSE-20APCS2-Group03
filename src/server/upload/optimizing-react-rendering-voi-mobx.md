`Mobx` là một thư viện hữu ích hỗ trợ việc quản lý  state trong `react` app được dễ dàng và hiệu quả, nếu so với `redux` thì cá nhân mình cảm nhận `mobx` có  một số ưu điểm như đơn giản; dễ dàng mở rộng nếu app càng phát triển; tổ chức data theo các store class; mobx tự detect store thay đổi để tối ưu render component mà không cần quan tâm đến immutable như trong redux; không cần nhiều thư viện liên quan như trong redux; cách tổ chức code, cấu trúc thư mục đơn giản và cuối cùng là dễ học cho những người mới.

Đã có rất nhiều bài viết liên quan đến `mobx` cơ bản, bây giờ mình chỉ nói sơ qua một chút về `mobx` trước khi bắt đầu nói về việc **tối ưu render react component với mobx**

![](https://images.viblo.asia/6fd610d0-0a7c-4c7c-a523-5831015b9862.png)

1. Đầu tiên, **State** ở đây là được ví như là nơi chứa cấu trúc data phục vụ cho app, cấu trúc state ở đây có thể bao gồm objects, arrays, primitives, references. Ví dụ state chứ một list todos dạng array (@observable)
2. Tiếp đến là **Derivations**, những thứ được tính toán tự động nếu `state`thay đổi đều được gọi là `derivations`, các bạn cần hình dung derivations với ký pháp như sau: state thay đổi => tự động tính toán từ state này => trả về một giá trị mới: có thể là data, JSX code, ...(@computed)
3. Tiếp đến là Reactions, tương tự như derivations, nhưng thay vì return một giá trị mới thì các reactions sẽ tự động run một task nào đấy, reactions được hình dung như sau: state thay đổi => tự động run task liên quan đến state này như render component, chạy 1 async networking task, ... (@autorun, @observer)
4. Cuối cùng là Actions, chỉ đơn giản là các function làm thay đổi application state, có một rules rất quan trọng chúng ta nên tuân theo là chỉ được thay đổi state thông qua các actions (@action)

Kết luận lại thì flow của mobx chỉ đơn giản như sau: các actions làm thay đổi state, những derivations liên quan đến state này sẽ tự động được tính toán, reactions liên quan đến state sẽ được tự động thực thi.

Chỉ đơn giản như vậy, sau đây mình sẽ đi vào phần optimize render, còn phần mobx cơ bản thì các bạn có thể tham khảo rất nhiều bài viết trước đó nhé

### Tối ưu React component rendering
#### Sử dụng và chia nhỏ thành nhiều component
@observer components sẽ track tất cả các data mà nó sử dụng và sẽ re-render lại nếu data này thay đổi. Vì vậy càng chia nhỏ components thì số lượng component cần re-render sẽ giảm.

#### Nên tách một component sử dụng riêng cho việc render list item
Khi một list có số lượng lớn item thì cần tạo riêng một component chỉ dùng để render list mà không render những data khác ngoài list này. Điều này sẽ hưũ ích nếu những data khác thay dổi thì component render list của chúng ta sẽ không cần phải render lại, ví dụ

*Bad:*
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
Trong ví dụ trên, nếu `user.name `thay đổi thì list todos sẽ được tính toán lại để render, điều này ảnh hưởng lớn đến performance.

*Good:*
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

#### Không nên sử dụng indexes làm key prop khi render list
Không nên sử dụng indexes hay một giá trị nào đó sẽ thay đổi trong tương lai làm key prop, vì những giá trị này React sẽ không định danh phân biệt từng item trong list nếu render lại, điều này dẫn đến react sẽ tạo mới hoàn toàn một component khác. Cách tốt nhất là dùng một id gắn với item đó làm key props.

*Bad:*
```js
const TodosView = observer(({ todos }) => (
    <ul>
        {todos.map((todo, index) => (
            <TodoView todo={todo} key={index} />
        ))}
    </ul>
))
```

*Good:*
```js
const TodosView = observer(({ todos }) => (
    <ul>
        {todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
        ))}
    </ul>
))
```

#### Get observable data (dereference) càng muộn(deep) càng tốt
Mobx sẽ re-render component dereference một cách tự động, nếu chúng ta deference càng sâu thì càng ít component sẽ re-render lại, hơi khó hiểu nên chúng ta sẽ đi vào ví dụ sau

*Slower:*
```js
<Profile>
    <OtherComponent />
    <DisplayName name={person.name} />
</Profile>
```
Ở ví dụ này thì khi property name thay đổi thì cả component Profile sẽ re-render lại, do component Profile có get trực tiếp person.name (deference trong mobx)

*Faster:*
```js
<Profile>
    <OtherComponent />
    <DisplayName name={person} />
</Profile>
```
Ở ví dụ này thì khi property name thay đổi thì chỉ mỗi component DisplayName re-render, còn Profile thì không re-render, do component Profile không get trực tiếp person.name

### Kết luận
Trên đây là những típ nhỏ chún ta có thể apply để tối ưu hoá render react component khi sử dụng mobx, cám ơn các bạn đã theo dõi :D

Reference: https://mobx.js.org/