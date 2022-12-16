Chào các bạn,



Chuyên mục lần này chúng ta sẽ cùng nhau bàn tới đó là `Conditional Rendering` trong `React`. 
Đảm nhận việc render trong React chính là JSX, nó cho phép chúng ta sử dụng `pure Javascript` ( javascript thuần ) với các câu lệnh với điều kiện quen thuộc như `if else`, `switch case` .
Sử dụng linh hoạt 2 cái để render theo ý muốn của chúng ta đó chính là `Conditional Rendering`.

Trong React, chúng ta có `thinking in components` vậy với một `conditional render` (điều kiện) thì 1 `component` sẽ quyết định hướng render trả về dựa trên điều kiện đó. 
> Ví dụ, 1 `conditional rendering List component` sẽ có thể trả về 1 danh sách các `items` hoặc là 1 `message` **"List is empty"** . 

Chúng ta sẽ lần lượt đi qua từng `case` một để nắm rõ hơn kỹ thuật `Conditional Rendering` trong React.

Vì nội dung bài viết khá dài và lê thê =)) nên mình sẽ chia làm 2 phần, các bạn chú ý follow nhé :D. 


![](https://images.viblo.asia/adb0c513-9ade-489a-af88-78b594238ed9.png)

## 1. IF ELSE 

`if else` thì mình nghĩ ai học React đều sẽ biết cách sử dụng để render component theo các trường hợp cụ thể. 

> Ví dụ đơn giản : Chúng ta có 1 component `ToDoList` và `expected`  là component sẽ render 1 list các `TodoItem`, nhưng với trường hợp list rỗng không có `TodoItem` nào thì component sẽ render ra cái gì ? Tất nhiên sẽ là render ra 1 thông báo cho user là 'No Todo Item in List' đúng không nào ? 

Đầu tiên chúng ta phải xử lý luôn trường hợp props `todos` của Todolist bị `null` : 

```
function TodoList({ todos }) {
  if (!todos) {
    return null;
  }
  return (
    <div>
      {todos.map(item => <TodoItem key={item.id} item={item} />)}
    </div>
  );
}
```

Done, giờ thì check tiếp trường hợp list rỗng và hiển thị `message` :

```
function TodoList({ todos }) {
  if (!todos) {
    return null;
  }
if (!todos.length) {
    return <p>No more todos.</p>;
  }
  return (
    <div>
      {todos.map(item => <TodoItem key={item.id} item={item} />)}
    </div>
  );
}
```


**Tóm lại, chúng ta đã giải quyết được 3 trường hợp render của `TodoList` Component : **  

    1. Không render gì cả ( props 'todos' bị null)
    2. 1 Message ( props 'todos' bị empty )
    3.  1 danh sách các TodoItem  

## 2. Ternary Operation ([Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) )

1 cách viết `if else` tốt hơn, ngắn gọn hơn trong 1 số trường hợp :
```
condition ? trueExpression : falseExpression 
```

> Tiếp tục ví dụ Todolist để áp dụng  Ternary Operation nhé, `TodoItem` component sẽ có 2 trạng thái là 'edit' và 'display'. Chúng ta sẽ sử dụng 1 biến true false ( boolean ) để đặt điều kiện component sẽ render ra trạng thái nào : 

```
function TodoItem({ item, isEditing }) {
  return (
    <div className="container">
      { isEditing
        ? <TodoEdit item={item} />
        : <TodoItem item={item} />
      }
    </div>
  );
}
```

Câu lệnh `Ternary Operation` sẽ giúp code các bạn rõ ràng hơn, tốt hơn nhưng chỉ với inline nhé, nếu nhiều dòng quá cũng nên dùng `if else`.

## 3. logical && operator ([Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) )

```
expression01 && expression02
```
> `&&` được sử dụng khi bạn muốn render component hoặc return null. Nếu `expression01` có giá trị true thì `expression02` sẽ được return và ngược lại nếu false thì sẽ không return gì cả thay vì `expression02`.


Áp dụng 2 cách #1,#2 ta có thể làm như sau: 

```
#1
const LoadingSpinner = ({ isLoading }) => {
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return null;
    }
  }
  
  #2
const LoadingSpinner = ({ isLoading }) => {
    return (
        <div>
        { isLoading
            ? <p>Loading...</p>
            : null
        }
        </div>
    );
}
```

Cách 2 có vẻ như đã khá là oke rồi nhưng chúng ta có thểm 1 cách nữa để bỏ luôn phần return `null` không cần thiết của #2 , cùng xem qua ví dụ này để hiểu cách hoạt động của nó nhé: 

```
const result = true && 'Hello World';
console.log(result);
// Hello World

const result = false && 'Hello World';
console.log(result);
// false
```

Áp dụng vào `LoadingSpinner` ta có: 

```
const LoadingSpinner = ({ isLoading }) => {
  return (
    <div>
      { isLoading && <p>Loading...</p> }
    </div>
  );
}
```


## 4. Switch Case operator ([Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) )

Giả sử thay vì chúng ta chỉ có 2 trường hợp như ban đầu mà chúng ta có 3,4 hoặc thậm chí nhiều hơn thì phải chuyển sang sử dụng `Switch Case`. 

> Ví dụ chúng ta có 1 component `Notification` render 4 trạng thái khác nhau : `success` , `error`, `warning`, `info`, sử dụng `switch case` để xử lý các trạng thái render của component: 

```
const Notification = ({ text, state }) => {
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

```

Tận dụng `ES6 Arrow Function` và `self invoking JavaScript function` chúng ta có thể sử dụng `switch case` inline trong return của component: 

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


*Congras 👏👏👏!*

Vậy là chúng ta đã cover được 4 hướng tiếp cận của 'conditional rendering'. Phần tiếp theo chúng ta sẽ tiếp tục với các cách mới hay hơn, tốt hơn và clean code hơn ( enums, HOCs, ...) .