Chào các bạn, 

Tiếp nối bài viết [Nắm vững Conditional Rendering trong React (phần 1) ](https://viblo.asia/p/nam-vung-conditional-rendering-trong-react-phan-1-XL6lAo9DKek), hôm nay chúng ta sẽ tiếp tục cover các hướng tiếp cận hay hơn, tốt hơn và clean hơn.

![Nắm vững Conditional Rendering trong React](https://images.viblo.asia/adb0c513-9ade-489a-af88-78b594238ed9.png)


Let's get started 🏁.

## 5. Enums 

> **Enum** nôm na là 1 kiểu dự liệu giới hạn các biến thành một giá trị từ một tập các hằng số được xác định trước.
> > Trong javascript không có kiểu dữ liệu **enum**, nhưng chúng ta có thể dùng **Object** như là 1 **enum** với các cặp key-value.
>  > >  Ví dụ:
>  >  > ```
>  >  > const WeekDay = {
>  >  > MONDAY : "MONDAY",
>  >  > TUESDAY: "TUESDAY",
>  >  > WEDNESDAY: "WEDNESDAY",
>  >  > THURSDAY: "THURSDAY",
 >  >  > FRIDAY: "FRIDAY",
 >  >  > SATURDAY: "SATURDAY",
  >  >  > SUNDAY: "SUNDAY" };
  > > >``` 



Áp dụng vào *Conditional Rendering React*, các bạn sẽ thấy được sức mạnh của **enum**. 

Cùng nhìn lại `Notification`  component ở bài trước sử dụng `switch case` :  

```
const Notification = ({ text, state }) => {
  return (
    <div>
      {(() => {
        switch(state) {
         case 'success':
        return <Success text={text} />;
           case 'error':
            return <Error text={text} />;
          case 'info':
            return <Info text={text} />;
          case 'warning':
            return <Warning text={text} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
```

Với enum, chúng ta có thể refactor lại như sau: 


```
const Notification = ({ text, state }) => {
  return (
    <div>
      {{
          success: <Success text={text} />,
          error: <Error text={text} />,
          info: <Info text={text} />,
          warning: <Warning text={text} />,
      }[state]}
    </div>
  );
}
```

>  Khi `Notification` được render, `state` sẽ được truyền vào **enum** và quyết định component nào sẽ được render. 
>> Cách này clean hơn, dễ nhìn hơn nhiều so với hướng `switch case` ở bài trước. 


Có thể tốt hơn nữa nếu sử dụng function wrapper để tách hẳn phần **enum** trong JSX ra bên ngoài hàm `render`.

```
const renderNotification = (text) => ({
     success: <Success text={text} />,
     error: <Error text={text} />,
     info: <Info text={text} />,
     warning: <Warning text={text} />,
});

const Notification = ({ text, state }) => {
  return (
    <div>
      {renderNotification(text)[state]}
    </div>
  );
}
```
Còn rất nhiều hướng tuỳ biến **enum** để có thể `multiple conditional renderings`. 

Dưới dây là 1 ví dụ mình thấy rất hay: 
```
function FooBarOrFooOrBar({ isFoo, isBar }) {
  const key = `${isFoo}-${isBar}`;
  return (
    <div>
      {{
        ['true-true']: <FooBar />,
        ['true-false']: <Foo />,
        ['false-true']: <Bar />,
        ['false-false']: null,
      }[key]}
    </div>
  );
}

FooBarOrFooOrBar.propTypes = {
   isFoo: React.PropTypes.boolean.isRequired,
   isBar: React.PropTypes.boolean.isRequired,
}
```



-----
## 6. Nested conditional rendering
Ở case chúng ta cần lồng nhiều điều kiện render lên nhau, ví dụ đơn giản nhất là 1 Component sẽ có 3 trạng thái: render **a list todos**, todo list **empty** ( list rỗng), **nothing** ( bị null).
```
const TodoList = ({ todos }) => {
  const isNull = !todos;
  const isEmpty = !isNull && !todos.length;

  return (
    <div>
      { isNull
        ? null
        : ( isEmpty
          ? <p>No have any todos.</p>
          : <div>{todos.map(todo => <Todo todo={todo} />)}</div>
        )
      }
    </div>
  );
}

<TodoList todos={null} /> // <div></div>
<TodoList todos={[]} /> // <div><p>No have any todos.</p></div>
<TodoList todos={['Do A', 'Finish B', 'Go To C']} /> 
// <div>
//  <Todo>Do A</Todo>
//  <Todo>Finish B</Todo>
//  <Todo>Go To C</Todo>
// <div>
```
> Hướng tiếp cận bên trên theo mình thấy được sử dụng khá nhiều, nhưng với 1 loạt ternary operator sẽ làm code của bạn khó đọc hơn. 


Chúng ta có thể chia thành 2 component, 1 cho  **render list** và 1 cho **null và empty** như sau: 
```
const TodoList = ({ todos }) => {
   const isList = todos && todos.length;

  return (
    <div>
      { isList
        ? <div>{todos.map(todo => <Todo todo={todo} />)}</div>
        : <NoList isNull={!todos} isEmpty={todos && !todos.length} />
      }
    </div>
  );
}
const NoList = ({ isNull, isEmpty }) => {
  return (!isNull && isEmpty) && <p>No have any todos.</p>;
}
```



##  7. Higher Order Component ( HOCs)


>  Higher Order Component ( HOCs) là 1 function nhận vào 1 tham số là 1 `Component` và trả về 1 `Component` mới. 

Với HOCs, nó cho phép chúng ta có thể truy cập và xử lý được giai đoạn *pre-rendering* trước khi render ra phía client. Từ đó, HOCs sẽ giúp ích chúng ta rất nhiều trong `multiple conditional renderings `, cùng phân tích ví dụ bên dưới để hiểu rõ hơn nhé :
```
const withSpinner = Component => ({ isLoading, ...props }) => {
    if (!isLoading) {
        return <Component {...props} />;
    }
    return (
        <div>
            <Spinner />
        </div>
    );
};

const TodoListWithSpinner = withSpinner(TodoList);

<TodoListWithSpinner
  isLoading={props.isLoading}
  todos={props.todos}
/>
```

> Ví dụ bên trên xử lý state Loading của `TodoList`, nếu đang loading ( `isLoading` === `true` ) thì render `<Spinner />` và ngược lại load xong thì render `TodoList`.
>> Function `withSpinner` dựa trên `isLoading` prop để quyết định trả về Spinner`` hay là `TodoList` component.

Với hướng tiếp cận này thì `TodoList` chỉ làm nhiệm vụ render list `todos`, còn việc xử lý `conditional renderings` được đảm nhiệm bởi HOCs. Điều này giúp code chúng ta clean, logic hơn và quan trọng là có thể `reusable` ( sử dụng lại ) ở các components khác .



-----

Congras again 👏👏👏!

Qua 2 bài viết, chúng ta đã cover được kha khá cách để nắm vững `conditional rendering` trong React rồi nhỉ. Still, vẫn còn những hướng tiếp cận khác, mình rất vui khi được thảo luận với các bạn, comment bên dưới nhé :D.