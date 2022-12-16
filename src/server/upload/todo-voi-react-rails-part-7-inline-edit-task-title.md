Hôm nay, chúng ta sẽ tiếp tục làm demo basic project Reactjs + Rails với chức năng Inline Edit task title.

Với task chưa hoàn thanh, người dùng có thể update lại task title bằng cách click trên task title đó. Khi focus out, nó sẽ tự động save. 

![](https://images.viblo.asia/8334ec00-1771-4574-a553-35eb6f4ea39d.png)

## Phần API:

Ở đây, chúng ta sẽ gọi API update task có sẵn trong bài trước với params:
+ id : id của task
+ title : title của task
```
URL: {url}/api/v1/tasks/:id
Method: "PUT"
Params:
title: :string
```

## Phần ReactJs

Ở đây, mình sẽ sử dụng thư viện này https://github.com/bfischer/react-inline-editing để hỗ trợ với chức năng inline edit.

**Cài đặt**
```
npm install --save react-inline-editing
```

**Các props:**

* text (*) : string
* isEditing : bool
* emptyEdit	: bool
* labelPlaceHolder : string
* labelClassName : string
* labelFontSize	: string
* labelFontWeight : string
* inputMaxLength : number
* inputPlaceHolder	: string	
* inputWidth : string	
* inputHeight : string	
* inputFontSize	: string	
* inputFontWeight : string	
* inputClassName : string	
* inputBorderWidth : string	
* onFocus : function, Parameter(s): text
* onFocusOut : function, Parameter(s): text

Có nhiều method và props bạn có thể dùng, nhưng ở đây mình chỉ cần dùng props event onFocusOut. Event này sẽ trigger khi người dùng focus ra ngoài input. Sau đó mình sẽ gọi lên api update để update task title. 

**Sửa lại ToDoItem**

Trong file `src/ToDoItem.js`, trong điều kiện task chưa hoàn thành, mình sẽ sửa code như sau:

```js
...
import EditableLabel from 'react-inline-editing';

class ToDoItem extends Component {
  renderData() {
    let task = this.props.task;
    if (task.completed) {
      return(
        ...
      )
    } else {
      return(
        <tr>
        
          <td>
            <EditableLabel
              text={task.title}
              onFocusOut={this.props.onFocusOut}
            />
          </td>
          
         ...
         
        </tr>
      )
    }
  }

 ...
 
}

export default ToDoItem
```

**Sửa lại ToDoList**

Vào file `src/ToDoList.js`, trong hàm renderItem(), chúng ta sẽ bổ sung props onFocusOut này

```js
  renderItem() {
    const items = this.state.items.map((task) =>
      <ToDoItem
        key={task.id}
        task={task}
        onDelete={() => this.onDelete(task.id)}
        onDone={() => this.onUpdate({id: task.id, completed: true})}
        // props vừa thêm: onFocusOut
        onFocusOut={(title) => this.onUpdate({id: task.id, title: title})}
      />
    )
    return items;
  }
```

Như đã thấy, chúng ta chỉ cần dùng lại method cũ `onUpdate(params)` là xong.

Đến đây là chúng ta đã làm xong phần Inline Edit Task rồi. Hẹn gặp lại ở bài tiếp theo. :