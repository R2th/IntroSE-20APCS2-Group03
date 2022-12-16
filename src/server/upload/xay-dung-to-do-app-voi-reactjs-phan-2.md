## 1. Mở đầu
<hr>

Ở [phần 1](https://viblo.asia/p/xay-dung-to-do-app-voi-reactjs-phan-1-Do754jBeZM6) của bài viết, chúng ta đã hoàn thành 2 tính năng cơ của to-do-app đó là tạo thêm mới một task mới và xóa bỏ một task. Trong phần này, mình sẽ hướng dẫn các bạn hoàn thành nốt nó với hai tính năng nữa là sửa task và kéo thả task giữa các cột. Nào chúng ta cùng bắt đầu.

## 2. Sửa task
<hr>

Trong component task của chúng ta từ đầu mình đã để sẵn 2 nút là sửa và xóa như sau:

![](https://images.viblo.asia/33f728c3-2f7e-4dd2-bfb6-5766e7f2ae80.png)

Mục tiêu của chúng ta là khi click vào icon edit thì phần text `Demo task` kia sẽ chuyển về dạng input để cho phép chúng ta thay đổi nội dung của nó giống như trên trello. Để làm được điều đó thì chúng ta sẽ cần lầm lần lượt các việc như sau:
- Chuyển text về dạng input khi click vào icon edit
- Cập nhật nội dung task khi bấm ra ngoài ô input
<br>

Giả sử chúng ta có một danh sách các task như sau:

![](https://images.viblo.asia/f45c248d-3b60-4027-ac7f-85bee3cee61b.png)

Để có thể thay đổi nội dung component từ text về dạng input thì đầu tiên chúng ta sẽ tạo thêm một trường input trong component của chúng ta như sau:
```javascript
<div className="Task">
    // Phần input mới thêm vào
    <div className="Task__editing">
        <input type="text"
            className="Task__editor"
            defaultValue={props.task.get('content')} />
        <div className="Task__editing-action">
            <i className="fas fa-check"></i>
            <i className="fas fa-ban"></i>
        </div>
        <div className="Task__editing-bgr"></div>
    </div>
    
    // Phần gốc
    <div className="Task__time">
        <i className="far fa-calendar-alt"></i> {props.task.get('time')}
    </div>
    <div className="Task__main">
        <div className="Task__content">
            {props.task.get('content')}
        </div>
        <div className="Task__action">
            <div className="Task__btn">
                <i className="far fa-edit"></i>
            </div>
            <div className="Task__btn">
                <i className="far fa-trash-alt"></i>
            </div>
        </div>
    </div>
</div>
```

Còn đây là phần giao diện của đoạn input chúng ta mới thêm vào:

![](https://images.viblo.asia/b5378878-facc-4041-9a8e-6c471a691477.png)

Như bạn đã thấy nó rất đơn giản, gồm một ô input, một button để xác nhận sự thay đổi và một button để hủy. Ngoài ra bạn còn thấy thêm một phần code giao diện là:
```javascript
<div className="Task__editing-bgr"></div>
```
Phần này đóng vai trò giống như 1 background hỗ trợ chúng ta khi đang trong trạng thái edit thì sẽ không thao tác được với phần nội dung khác nữa ngoài form edit để tránh tình trạng bug xảy ra đồng thời cũng để chúng ta có thể click vào nền đó để thoát chế độ edit task. Toàn cảnh kết quả nó sẽ như sau:
![](https://images.viblo.asia/862dca29-3f80-4a7c-9428-a5cc4538e7f3.png)
Ở trên là phần giới thiệu qua về phần UI của chúng ta, bây giờ ta sẽ đi sâu vào làm chức năng. Đầu tiên, để có thể hiển thị qua lại giữa phần nội dung text và phần input ta sẽ cần thêm một thuộc tính để xác định trạng thái hiện tại của task đang là edit hay hiển thị. Mình sẽ tạm gọi trạng thái này là `isEditing` và truyền vào component `<Task />` như sau:
```javascript
<div className="Task">
   {
       props.isEditing
    ? <div className="Task__editing">
            <input type="text"
                className="Task__editor"
                defaultValue={props.task.get('content')} />
            <div className="Task__editing-action">
                <i className="fas fa-check"></i>
                <i className="fas fa-ban"></i>
            </div>
            <div className="Task__editing-bgr"></div>
        </div>
    : <Fragment>
        <div className="Task__time">
            <i className="far fa-calendar-alt"></i> {props.task.get('time')}
        </div>
        <div className="Task__main">
            <div className="Task__content">
                {props.task.get('content')}
            </div>
            <div className="Task__action">
                <div className="Task__btn">
                    <i className="far fa-edit"></i>
                </div>
                <div className="Task__btn">
                    <i className="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
    </Fragment>
    }
</div>
```
Với thuộc tính trên, component của chúng ta chỉ hiển thị ô edit khi thuộc tính `isEditing` là true và hiển thị nội dung khi là false. Khi click vào icon edit trên mỗi task đồng nghĩa với việc ta sẽ chuyển thuộc tính `isEditing` của task đó từ  false về true đồng thời chỉ có thể edit 1 task 1 lúc. Để làm việc này, ta sẽ thêm một `state` mới vào file `App.js` của chúng ta với tên là `editingTaskId`. `State` này ta sẽ để mặc định bằng `null` và sẽ cập nhập giá trị của nó thành `id` tương ứng với task mà ta muốn chỉnh sửa:
```javascript
state = {
        ...
        editingTaskId: null,
    }
```
Hàm phục vụ cho việc thay đổi và hủy thay đổi giá trị của `state`:
```javascript
handleChooseEditTask = (taskId) => () => {
    this.setState({
        editingTaskId: taskId
    })
}

handleCancelEdit = () => {
    this.setState({
        editingTaskId: null,
    });
}
```
Tiếp đó ta sẽ gán nó vào phần render component `<Task />` như sau:
```javascript
{
    column.get('tasks').map((task, taskIndex) => (
        <Task key={task.get('id')}
            task={task}
            handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)}
            isEditing={task.get('id') === editingTaskId}
            handleCancelEdit={this.handleCancelEdit}
            handleChooseEditTask={this.handleChooseEditTask(task.get('id')} />
    ))
}
```
Với cách gán như trên chỉ khi nào thuộc tính `editingTaskId` trùng với `id` của task thì đồng nghĩa task đó đang trong trạng thái edit và tất nhiên thuộc tính isEditing mà chúng ta tạo trong component `<Task />` sẽ được chuyển về true, ngược lại là false. Trong component `<Task />` phần nội dung input sẽ thêm các event tương ứng là `handleCancelEdit` và trong phần hiển thị nội dung sẽ thêm event là `handleChooseEditTask`:
```javascript
<div className="Task">
   {
       props.isEditing
    ? <div className="Task__editing">
            <input type="text"
                className="Task__editor"
                defaultValue={props.task.get('content')} />
            <div className="Task__editing-action">
                <i className="fas fa-check"></i>
                <i className="fas fa-ban" onClick={props.handleCancelEdit}></i>
            </div>
            <div className="Task__editing-bgr" onClick={props.handleCancelEdit}></div>
        </div>
    : <Fragment>
        <div className="Task__time">
            <i className="far fa-calendar-alt"></i> {props.task.get('time')}
        </div>
        <div className="Task__main">
            <div className="Task__content">
                {props.task.get('content')}
            </div>
            <div className="Task__action">
                <div className="Task__btn" onClick={props.handleChooseEditTask}>
                    <i className="far fa-edit"></i>
                </div>
                <div className="Task__btn">
                    <i className="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
    </Fragment>
    }
</div>
```
Đến đây thì chúng ta đã có thể chuyển đổi dễ dàng giữa trạng thái edit và hiển thị của task 1 cách đơn giản như sau:

![](https://images.viblo.asia/f4d19324-9b8c-4104-a3bb-83e9b95dff54.gif)

Tiếp đó chúng ta sẽ thực hiện tiếp 2 công việc đó là thay đổi nội dung của task và lưu thay đổi đó. Ở đây trong phần input edit task chúng ta đang để nội dung mặc định là nội dung tương ứng của task đó tuy nhiên nếu ta edit trực tiếp nội dung đó sẽ dẫn tới việc kể cả khi ta ấn nút gọi hàm để hủy việc edit thì nội dung của task đó vẫn được cập nhật. Để tránh tình trạng này thì ta sẽ tạo thêm một `state` mới trong `App.js` để chứa nội dung mới mà ta thay đổi như sau:
```javascript
state = {
    ...
    taskContent: ''
}
```
Và một hàm phục vụ việc thay đổi nội dung `state` này khi ta thay đổi nội dung trong ô input:
```javascript
handleChangeTaskContent = (e) => this.setState({ taskContent: e.target.value })
```
Tiếp đó trong component `<Task />` ở phần nội dung input ta sẽ gán nó vào event `onChange` của ô input:
```javascript
{
    column.get('tasks').map((task, taskIndex) => (
        <Task key={task.get('id')}
            task={task}
            handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)}
            isEditing={task.get('id') === editingTaskId}
            handleCancelEdit={this.handleCancelEdit}
            handleChooseEditTask={this.handleChooseEditTask(task.get('id')}
            handleChangeTaskContent={this.handleChangeTaskContent} />
    ))
}
```
```javascript
<div className="Task__editing">
    <input type="text"
        className="Task__editor"
        defaultValue={props.task.get('content')}
        onChange={props.handleChangeTaskContent} />
    <div className="Task__editing-action">
        <i className="fas fa-check"></i>
        <i className="fas fa-ban" onClick={props.handleCancelEdit}></i>
    </div>
    <div className="Task__editing-bgr" onClick={props.handleCancelEdit}></div>
</div>
```
Đồng thời ta cũng nên reset lại nội dung của `state` mới này về rỗng khi ta bấm hủy việc thay đổi:
```javascript
handleCancelEdit = () => {
    this.setState({
        editingTaskId: null,
        taskContent: ''
    });
}
```
Bây giờ ta có thể thoải mái gõ nội dung mới và hủy bỏ nó mà không làm ảnh hưởng đến task ban đầu của chúng ta. Đồng thời ta cũng có thể dùng nội dung của `state` mới này để thay thế cho nội dung task cũ khi chúng ta xác định việc cập nhật. Tới đây, chúng ta chỉ còn việc duy nhất đó là cập nhật dữ liệu của task mà ta đang chọn với nội dung mới mà ta đã gõ. Tuy nhiên, việc cập nhật không phải chỉ  đơn giản là `setState`cho content của task đó vì các task của chúng ta đang nằm trong 1 mảng chứa trong 1 column. Nếu bạn còn nhớ trong [phần trước](https://viblo.asia/p/xay-dung-to-do-app-voi-reactjs-phan-1-Do754jBeZM6) để dễ dàng cho việc cập nhật và thay đổi các task thì chúng ta sẽ cần thêm 2 yếu tố khác đó là cột nào đang chứa task đó và vị trí của task đó trong cột. Ta sẽ làm điều tương tự với phần này. Đầu tiên để có được chỉ số cột và chỉ số mảng thì ta sẽ  cần sửa lại phần code dùng để chọn task muốn edit như sau:
```javascript
handleChooseEditTask = (columnIndex, taskIndex, taskId) => () => {
    this.setState({
        editingColumnIndex: columnIndex,
        editingTaskIndex: taskIndex,
        editedTaskId: taskId
    })
}
```
Đồng thời trong phần thực hiện việc render `<Task />` cũng cần bổ sung lại:
```javascript
{
    column.get('tasks').map((task, taskIndex) => (
        <Task key={task.get('id')}
            task={task}
            handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)}
            isEditing={task.get('id') === editingTaskId}
            handleCancelEdit={this.handleCancelEdit}
            handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
            handleChangeTaskContent={this.handleChangeTaskContent} />
    ))
}
```
Tiếp theo chúng ta sẽ viết hàm xác nhận việc cập nhật:
```javascript
handleEdit = () => {
    // Lấy các dữ liệu cần thiế t trong state
    const { columns, editingColumnIndex, taskContent, editingTaskIndex } = this.state;
    // Cập nhật nội dung task theo index của cột và của task
    const updatedColumn = columns.updateIn(
        [editingColumnIndex, 'tasks'],
        tasks => tasks.setIn([editingTaskIndex, 'content'], taskContent)
    );
    // Lưu lại nội dung mới
    this.setState({
        editingColumnIndex: '',
        taskContent: '',
        editedTaskId: null,
        editingTaskIndex: null,
        columns: fromJS(updatedColumn)
    });
}
```
Cuối cùng ta chỉ cần gán nó phần render `<Task />` và event `onClick` ở component này:
```javascript
// Phần render
{
    column.get('tasks').map((task, taskIndex) => (
        <Task key={task.get('id')}
            task={task}
            handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)}
            isEditing={task.get('id') === editingTaskId}
            handleCancelEdit={this.handleCancelEdit}
            handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
            handleChangeTaskContent={this.handleChangeTaskContent}
            handleCancelEdit={this.handleCancelEdit} />
    ))
}

// Component Task
<div className="Task__editing">
    <input type="text"
        className="Task__editor"
        defaultValue={props.task.get('content')}
        onChange={props.handleChangeTaskContent} />
    <div className="Task__editing-action">
        <i className="fas fa-check" onClick={props.handleEdit}></i>
        <i className="fas fa-ban" onClick={props.handleCancelEdit}></i>
    </div>
    <div className="Task__editing-bgr" onClick={props.handleCancelEdit}></div>
</div>
```
Và đây là kết quả cuối cùng mà chúng ta thu được:

![](https://images.viblo.asia/cd419716-179e-46d1-b711-71f528c516c1.gif)

## 3. Thay đổi cột
<hr>

Để có thể thay đổi vị trí task giữa các cột bằng việc drag&drop ta sẽ sử dụng một thư viện có tên là [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd). Thư viện này sẽ giúp chúng ta tối đa trong việc kéo thả giữa các cột, chi tiết bạn có thể đọc document tại chính repo của nó. Về cơ bẳn thì toàn bộ việc kéo thả sẽ gồm 3 component chính như sau:

![](https://images.viblo.asia/6aa8251c-9e6d-434f-a589-0b043fc75e6c.gif)

- **<DragDropContext />**: bọc toàn bộ phần trong ứng dụng của bạn muốn sử dụng tính năng drag&drop
- **<Droppable />**: phần có thể thả các item vào đó
- **<Draggable />**: phần nội dung có thể kéo di chuyển qua lại và thả vào **<Dropable />**

Như vậy đầu tiên ta sẽ tiến hành bọc phần ứng dụng mà chúng ta muốn sử cho phép kéo thả vào component `<DragDropContext />` như sau:
```javascript
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

...
<div className="App">
    <h1 className="App__title">TO DO LIST</h1>
    <DragDropContext onDragEnd={this.handleSaveDrag}>
        <div className="App__content">
            {
                ...
             }
         /div>
    </DragDropContext>
    ...
</div>
```
Lưu ý ta chỉ cần bọc phần nội dung cần cho việc kéo thả thôi. Vậy là xong bước thứ nhất. Ở đoạn code trên bạn có thể thấy mình đã truyền thêm vào component `<DragDropContext />` một function là `handleSaveDrag` ứng với thuộc tính `onDragEnd`. Thuộc tính này chính là nơi mà bạn tiến hành việc lưu thay đổi sau khi kéo thả xong.
<br>
Tiếp theo trong phần render các column ta sẽ cần bọc component `<Droppable />` vào vì chính các cột này là nơi mà chúng ta có thể thả item vào. Đoạn code như sau:
```javascript
{
    columns.map((column, columnIndex) => (
        <Column key={column.get('id')}
            column={column}
            handleAddNewTask={this.handleToggleModal}
        >
            <Droppable droppableId={column.get('id')}>
                {
                    provided => (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{ minHeight: '300px' }}
                        >
                            {
                                column.get('tasks').map((task, taskIndex) => (
                                    <Task key={task.get('id')}
                                        index={taskIndex}
                                        isEditing={task.get('id') === editedTaskId}
                                        handleChangeTaskContent={this.handleChangeTaskContent}
                                        task={task}
                                        handleEdit={this.handleEdit}
                                        handleCancelEdit={this.handleCancelEdit}
                                        handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
                                        handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </Column>
    ))
}
```
Giải thích qua đoạn code ở trên, lúc này phần nội dung bên trong của component `<Column />` của chúng ta sẽ chính là phần mà ta có thể thực hiện thả các task vào đó. Chính vì thế bạn có thể thây ta đã bọc component `<Droppable />` vào bên trong nó. Tiếp đó component `<Droppable />` sẽ cần một số thứ như sau:
- `droppabledID`: dùng để phân định giữa các cột hay các phần `<Droppable />` và phục vụ cho việc lưu dữ liệu sau này
-  Tiếp đến bên trong `<Droppable />` ta sẽ sử dụng dạng render props của React với dữ liệu 1 biến provided được cung cấp bởi thư viện drag&drop với các thuộc tính cần thiết theo document.
-  Cuối cùng bạn có thể thấy ở cuối ta có 1 phần là `{provided.placeholder}` chính là cái slot trống cho phép ta thả các item khác vào đó.

Sau khi hoàn thành 2 bước tên ta sẽ chuyển qua component Task và bọc toàn bội nội dung của nó với component `<Draggable />` như sau:
```javascript
<Draggable
    index={props.index}
    draggableId={props.task.get('id')}
    isDragDisabled={props.isEditing}
>
    {
        provided => (
            <div className="Task"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {
                    props.isEditing
                        ? <div className="Task__editing">
                            <input type="text"
                                className="Task__editor"
                                defaultValue={props.task.get('content')}
                                onChange={props.handleChangeTaskContent} />
                            <div className="Task__editing-action">
                                <i className="fas fa-check" onClick={props.handleEdit}></i>
                                <i className="fas fa-ban" onClick={props.handleCancelEdit}></i>
                            </div>
                            <div className="Task__editing-bgr" onClick={props.handleCancelEdit}></div>
                        </div>
                        : <Fragment>
                            <div className="Task__time">
                                <i className="far fa-calendar-alt"></i> {props.task.get('time')}
                            </div>
                            <div className="Task__main">
                                <div className="Task__content">
                                    {props.task.get('content')}
                                </div>
                                <div className="Task__action">
                                    <div className="Task__btn" onClick={props.handleChooseEditTask}>
                                        <i className="far fa-edit"></i>
                                    </div>
                                    <div className="Task__btn" onClick={props.handleDeleteTask}>
                                        <i className="far fa-trash-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
        )
    }
</Draggable>
```
Component này cũng sử dụng dạng render props trong React nhằm kế thừa ác chức năngtừ thư viện drag&drop. Nó cũng khá tương tự như component `<Dropable />` bạn có thể tham khảo kĩ hơn về các thuộc tính trên document của thư viện. Tuy nhiên những thuộc tính mình dùng ở đây là các thuộc tính cần thiết. Component này cũng có dùng `draggableId` và `index` để phục vụ cho việc lưu kết quả kéo thả sau này. Ngoài ra bạn có thể thấy mình sử dụng thêm một thuộc tính khác là `isDragDisabled` nhằm disable chức năng kéo thả khi chúng ta đạng thực hiện edit nội dung task. Đó là toàn bộ phần UI, đến bước này bạn hoàn toàn có thể kéo thả rồi chỉ có điều chưa lưa được kết quả đâu :)

![](https://images.viblo.asia/7104568d-290e-47c6-8d37-6d6edebd0c29.gif)
<br>

Sau đây chúng ta sẽ cùng thực hiện chức năng lưu kết quả đã khai báo ở trước đó là hàm `handleSaveDrag()`. Mặc định thì hàm này sẽ nhận vào một biến từ thuộc tính `onDragEnd()` và biến này có dạng như sau:
```javascript
{
    destination: {
        droppableId: "ip"
        index: 0
    }
    draggableId: "aeb38dd0-5f86-11e9-828f-b7135a2fc491"
    reason: "DROP"
    source: {
        droppableId: "td"
        index: 0
    }
}
```
Chúng ta cần quan tâm đến 2 phần là **source** và **destination** vì đây nó chứa dữ liệu liên quan đến việc task chúng ta được kéo đi từ đâu và được thả vào đâu. Tiếp đó là giữ liệu **reason** là action vừa thực hiện ở đây thông thường sẽ là **"DROP"**. Đây là những gì ta sẽ cần viết trong hàm của mình:
```javascript
handleSaveDrag = (result) => {
    // Lấy dữ liệu cần thiết từ result
    const { source, destination, reason } = result;
    
    // Kiểm tra điều kiện
    if (reason === 'DROP' && destination) {
    
        // Lấy dữ liệu cột từ state
        const { columns } = this.state;
        
        // Lấy cột gốc mà task được kéo đi
        const sourceColumnIndex = columns.findIndex(column => column.get('id') === source.droppableId);
        
        // Lấy nội dung task đó
        const task = columns.getIn([sourceColumnIndex, 'tasks', source.index]);
        
        // Xóa task đó khỏi cột gốc
        let updatedColumn = columns.updateIn(
            [sourceColumnIndex, 'tasks'],
            tasks => tasks.remove(source.index)
        );
        
        // Lấy cột đích đến của task
        const destinationColumnIndex = columns.findIndex(column => column.get('id') === destination.droppableId);
        
        // Lưu task đó vào cột mới
        updatedColumn = updatedColumn.updateIn(
            [destinationColumnIndex, 'tasks'],
            tasks => tasks.insert(destination.index, task)
        );
        
        // Cập nhật dữ liệu của state
        this.setState({
            columns: fromJS(updatedColumn)
        });
    }
}
```
Bạn để ý trước khi thực hiện lưu kéo thả ta cần check 2 điều kiện trên vì trong trường hợp ta không thả vào đâu cả thì **destination** sẽ là null. Còn phần nội dung lưu trữ thì đơn giản nó chỉ là sử dụng index của cột và task để lưu trữ.

### 4. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc nếu bạn có thắc mắc gì có thể comment ở dưới mình sẽ giải đáp. Cám ơn bạn đã đọc.