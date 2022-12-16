## 1. Mở đầu
<hr>

Trong bài viết ngày hôm nay mình sẽ hướng dẫn các bạn làm một `To-do-app` với `ReactJS` có dạng giống như `Trello` như sau: 

![](https://images.viblo.asia/f0889bcd-9da4-4799-adf7-5e313b5ddc8c.gif)

Bạn có thể tham khảo link demo hoặc link github repository trước ở đây:
- Demo: [https://dqhuy78.github.io/to-do-list/](https://dqhuy78.github.io/to-do-list/)
- Github repo: [https://github.com/dqhuy78/to-do-list/tree/master](https://github.com/dqhuy78/to-do-list/tree/master)

Trước khi bắt đầu bắt tay vào làm ứng dụng này thì bạn nên chuẩn bị trước các kiến thức cơ bản nhất về `ReactJS` để không bị bỡ ngỡ. Nếu không bạn hãy tìm hiểu về `ReactJS` trước rồi sau đó quay lại với bài viết của mình.

## 2. Chuẩn bị
<hr>

### a. Khởi tạo ứng dụng
Ứng dụng của chúng ta sẽ có một số tính năng cơ bản như sau:
- Tạo mới task.
- Xóa task.
- Sửa nội dung task.
- Cho phép kéo thả task giữa các cột.

Vì nội dung khá dài nên mình sẽ chia thành 2 phần và nội dung phần này sẽ là tạo mới + xóa task. 
Để tiện cho hơn cho mọi người trong việc code các tính năng thì mình đã chuẩn bị sẵn 1 repo có chứa code của các component cần thiết cũng như style cho các component đó mọi người có thể pull code về tại [đây](https://github.com/dqhuy78/to-do-list-template). Sau khi clone về các bạn tiến hành chạy hai lệnh sau đề tải node_modules và chạy project:
```bash
$ yarn install
$ yarn start
```
Sau khi chạy hai lệnh kia kết thúc bạn sẽ thu được kết quả như sau là chúng ta đã sẵn sàng để bắt tay vào code:

![](https://images.viblo.asia/a76ffbad-2846-46a2-8673-8b5162171b5a.png)

### b. Giải thích qua về nội dung đã có

Đầu khi mở lên bạn có thể thấy bên trong mình đã xóa bớt vài file mặc định của `create-react-app` đồng thời thêm mới 3 components lần lượt là:
<br>
`<AddNewModal>`: Là một modal chứa form phục vụ cho việc chúng ta thêm mới 1 task

![](https://images.viblo.asia/a290c20e-8918-4471-ab61-4444a5506e38.png)

`<Column>`: Là cột chứa danh sách các task tương ứng với trạng thái của chúng

![](https://images.viblo.asia/e7e81a44-3a9e-42b8-9c1e-6b218ff54bdc.png)

`<Task>`: Là nội dung của một task

![](https://images.viblo.asia/33f728c3-2f7e-4dd2-bfb6-5766e7f2ae80.png)

Trong file `App.js` lúc này nếu bạn mở lên sẽ thấy mình đã định nghĩa sẵn `state` cho ứng dụng của chúng ta:
```javascript
state = {
    displayModal: false,
    columns: fromJS([
        { id: 'td', title: 'TO DO', tasks: [{id: 1, content: 'Demo task', time: '04/15/2019, 9:25:35 PM'}] },
        { id: 'ip', title: 'IN PROGRESS', tasks: [] },
        { id: 'de', title: 'DONE', tasks: [] }
    ])
}
```
- **displayModal**: là state hỗ trợ chúng ta trong việc ẩn và hiện `<AddNewModal>`
- **columns**: là nội dung các cột trong ứng dụng của chúng ta, nó sẽ gồm các phần sau:
    - **id**: id của cột
    - **title**: tiêu đề của cột
    - **tasks**: là một mảng chứa các **task** của chúng ta, mỗi **task** sẽ gồm có id, nội dung và thời gian tạo.

Nếu bạn để ý thì ở đây mình có dùng một hàm là `fromJS()` để bọc quanh nội dung của state **columns**. Hàm này được cung cấp bởi thư viện [immubtalejs](https://immutable-js.github.io/immutable-js/), một thư viện hỗ trợ chúng ta trong việc tương tác với object hoặc array mà không làm thay đổi tính bất biến của chúng. Ở đây state **columns** là một mảng các object nên nếu xử lý bằng cách thông thường sẽ mất công hơn nên mình đã quyết định dùng thư viện này đễ hỗ trợ.

Ngoài ra trong file `App.js` mình cũng đã tạo sẵn đoạn code phục vụ cho việc hiển thị danh sách các task theo từng cột và phần hiển thị `<AddNewModal>`.
```javascript
render() {
    const { columns, displayModal } = this.state;

    return (
        <div className="App">
            <h1 className="App__title">TO DO LIST</h1>
            <div className="App__content">
                {
                    columns.map(column => (
                        <Column key={column.get('id')} column={column}>
                            <div style={{ minHeight: '300px' }}>
                                {
                                    column.get('tasks').map(task => (
                                        <Task key={task.get('id')} task={task} />
                                    ))
                                }
                            </div>
                        </Column>
                    ))
                }
            </div>
            {displayModal && <AddNewModal />}
        </div>
    );
}
```
Đó là toàn bộ những gì mình đã khởi tạo sẵn để thuận tiện hơn cho các bạn. Còn bây giờ chúng ta cùng bắt tay vào xây dựng từng tính năng của ứng dụng nào.

## 3. Xây dựng tính năng
<hr>

### a. Thêm task

Đầu tiên chúng ta sẽ bắt đầu với tính năng tạo 1 task mới thông qua `<AddNewModal>`. Nhưng trước tiên để có thể nhập nội dung vào trong fomr của Modal này thì chúng ta cần hiện thị nó lên đã. Để làm điều này, khi bấm vào nut **+ New Task** chúng ta sẽ cho hiển thị `<AddNewModal>` lên bằng cách thay đổi state **displayModal** như sau:
```javascript
handleToggleModal = () => {
    this.setState(prevState => ({
        displayModal: !prevState.displayModal,
    }));
}
```
Với hàm trên ta có thể dùng nó cho cả 2 trường hợp là mở và đóng modal, siêu tiện lợi :D. Sau đó chúng ta sẽ truyền hàm này vào component `Column` rồi gán hàm đó với sự kiện click vào nút **+ New Task**:
```javascript
<Column key={column.get('id')}
    column={column}
    handleAddNewTask={this.handleToggleModal}
>
```
```javascript
const Column = ({ column, handleAddNewTask, children }) => (
    <div className="Column">
        <div className="Column__header">
            <h2 className="Column__title">
                <span className="Column__item-count">{column.get('tasks').size}</span>
                <span className="Column__text">{column.get('title')}</span>
            </h2>
            <p className="Column__btn" onClick={handleAddNewTask}>
                <i className="fas fa-plus"></i> New task
            </p>
        </div>
        <div className="Column__content">
            {children}
        </div>
    </div>
)
```
Lúc này bạn có thể hiển thị `<AddNewModal>` bằng cách click chuột vào nút **+ New Task** ở cột bất kì. Còn nếu muốn đóng `<AddNewModal>` thì chúng ta cũng làm việc tương tự là truyền hàm `handleToggleModal` vào trong component `<AddNewModa>` và gán vào nút **Cancel** như sau:
```javascript
{displayModal && <AddNewModal handleToggleModal={this.handleToggleModal} />}
```
```javascript
<button className="AddNewModal__btn AddNewModal__btn--cancel"
    onClick={props.handleToggleModal}
>
    Cancel
</button>
```
Vậy là giờ đây chúng ta đã có thể đóng và mở Modal như ý muốn. Tuy nhiên như bạn thấy mỗi khi chúng ta ấn vào nút **+ New Task** ở cột bất kì thì Modal hiển thị lên nhưng ở phần chọn trạng thái Task lại đang để trống:

![](https://images.viblo.asia/a290c20e-8918-4471-ab61-4444a5506e38.png)

Để tiện hơn thì chúng ta có thể làm sao cho mỗi khi click vào nút **+ New Task** ở cột nào thì tự động phần status của Task trong Modal sẽ được chọn vào ô tương ứng. Để làm như vậy thì ý tưởng sẽ như sau:
- Mỗi khi click New Task ở cột nào thì sẽ truyền thêm cả id của cột đó vào Modal
- Sử dụng id này để có thể xác định và check cột tương tự

Như vậy nghĩa là trong `<AddNewModal>` của chúng ta sẽ cần thêm thuộc tính từ state để có thể xác định trạng thái tương ứng đó.  Và như mình đã phân tích ở trên ta sẽ dùng id của cột để xác định điều này. Chúng ta sẽ thêm một thuộc tính nữa vào trong state như sau:
```javascript
state = {
    ...
    selectedColumn: ''
}
```
Tiếp đến ta sẽ truyền nó vào trong `<AddNewModal>` và sử dụng nó như sau:
```javascript
...
{
    displayModal && 
    <AddNewModal handleToggleModal={this.handleToggleModal}
        selectedColumn={this.state.selectedColumn}
        handleChangeSelectedColumn={this.handleChangeSelectedColumn}
    />
}
```
```javascript
<div className="AddNewModal__task-status">
    <span className="AddNewModal__radio">
        <input type="radio"
            checked={props.selectedColumn === 'td'}
            onChange={props.handleChangeSelectedColumn('td')} />
        <span>TODO</span>
    </span>
    <span className="AddNewModal__radio">
        <input type="radio"
            checked={props.selectedColumn === 'ip'}
            onChange={props.handleChangeSelectedColumn('ip')} />
        <span>IN PROGRESS</span>
    </span>
    <span className="AddNewModal__radio">
        <input type="radio"
            checked={props.selectedColumn === 'de'}
            onChange={props.handleChangeSelectedColumn('de')} />
        <span>DONE</span>
    </span>
</div>
```
Việc sử dụng thuộc tính mới này rất đơn giản ta chỉ cần so sánh nó với giá trị mà chúng ta đặt ra ở đây sẽ là id của cột nếu nó bằng true thì tức là nó đang được chọn. Và tất nhiên chúng ta cũng cần thêm sự kiện cho phép người dùng đổi sang trạng thái khác và đó là hàm `handleChangeSelectedColumn`:
```javascript
handleChangeSelectedColumn = (selectedColumn) => () => {
    this.setState({ selectedColumn: selectedColumn })
}
```
Khi đã hoàn thành hết các bước trên thì chúng ta đã có thể đóng/ mở Modal và đồng thời thay đổi giá trị muốn chọn. Nhưng khoan chúng ta chưa làm phần cho phép chọn trạng thái tương ứng với cột khi nhấn nút **+ New Task**. Chúng ta sẽ sửa lại hàm `handleToggleModal` như sau:
```javascript
handleToggleModal = (choosenColumn = '') => () => {
    this.setState(prevState => ({
        displayModal: !prevState.displayModal,
        selectedColumn: choosenColumn
    }));
}
```
Như bạn thấy ở đây chúng ta truyền thêm biến là `choosenColumn` hay nó chính là id của cột tương ứng. Biến này có giá trị mặc định là rỗng và sẽ dùng cho trường hợp chúng ta đóng Modal. Bây giờ ở trong component `<Column>` chúng ta sẽ truyền thêm biến vào sự kiện click ở nút **+ New Task** như sau:
```javascript
<p className="Column__btn" onClick={handleAddNewTask(column.get('id'))}>
    <i className="fas fa-plus"></i> New task
</p>
```
Vì mặc định chúng ta đã truyền thông tin của column từ state vào nó nên chúng ta có thể dùng `column.get('id')` để lấy id cột tương ứng. Vậy là đến đây ta đã có thể đóng/ mở modal với trạng thái task được chọn tương ứng với cột ta mong muốn và cũng có thể thay đổi trạng thái đó trong modal. Tiếp đây chúng ta sẽ xử lý phần nội dung của task. Nếu bạn đã nằm được kiến thức cơ bản thì ở đây chúng ta sẽ cần thêm 2 thứ đó là state chứa nội dung của task trong modal và một hàm cho phép sửa nội dung từ modal và truyền vào `<AddNewModal>` như sau:
<br>
Tạo state và hàm thay đổi state:
```javascript
state = {
    ...
    taskContent: ''
}
```
```javascript
handleChangeTaskContent = (e) => this.setState({ taskContent: e.target.value })
```
<br>

Thêm vào trong `<AddNewModal>`
```javascript
{
    displayModal && 
    <AddNewModal handleToggleModal={this.handleToggleModal}
        selectedColumn={this.state.selectedColumn}
        handleChangeSelectedColumn={this.handleChangeSelectedColumn}
        taskContent={taskContent}
        handleChangeTaskContent={this.handleChangeTaskContent}
    />
}
```
```javascript
...
<div className="AddNewModal__task">
    <input className="AddNewModal__input"
        type="text"
        placeholder="Enter your task..."
        value={props.taskContent}
        onChange={props.handleChangeTaskContent} />
</div>
...
```
Tới đây là chúng ta có thêm tính năng cho phép thay đổi nội dung task mới rồi và nó sẽ như sau:

![](https://images.viblo.asia/f354b43c-08bc-409b-9c06-75082a0d48cd.gif)

Nhiệm vụ còn lại của chúng ta là hoàn thành nốt hàm cho phép chúng ta lưu lại task đó vào cột tương ứng như sau:
```javascript
handleAddNewTask = () => {
    // Lấy nội dung task từ state
    // Kiểm tra xem nội dung có rỗng hay không trước khi lưu lại
    // Lấy id cột mà chúng ta muốn thêm task vào từ state
    // Tạo task mới với đầy đủ thông tin là id, nội dung và thời gian tạo
    // Lấy vị trí cột đó trong state
    // Lưu lại task đó vào cột
    // Cập nhật lại state
}
```
Như trên mình đã viết qua phần nội dung mà chúng ta cần làm. Trong thực tế bạn cũng nên viết nháp lại nội dung mà chúng ta cần xử lý như trên rồi mới bắt tay vào code để có cái nhìn tổng quan về luồng xử lý của chúng ta. Với mỗi bước nói trên nội dung cụ thể sẽ như sau:
```javascript
handleAddNewTask = () => {
    // Lấy nội dung task từ state
    const { taskContent } = this.state
    
    // Kiểm tra xem nội dung có rỗng hay không trước khi lưu lại
    if (taskContent.trim() === '') {
            return toastr.warning('Please enter your task', 'Notice', { timeOut: 2000 });
     }
     
    // Lấy id cột mà chúng ta muốn thêm task vào từ state
    const { selectedColumn, columns } = this.state;
    
    // Tạo task mới với đầy đủ thông tin là id, nội dung và thời gian tạo
    const newTask = fromJS({
        id: uuidv1(),
        content: taskContent,
        time: new Date().toLocaleString()
    });
    
    // Lấy vị trí cột đó trong state
    const columnIndex = columns.findIndex(column => column.get('id') === selectedColumn);
    
    // Lưu lại task đó vào cột
    const updatedColumn = columns.updateIn(
        [columnIndex, 'tasks'],
        tasks => tasks.push(newTask)
    );
    
    // Cập nhật lại state, ở đây chúng ta đồng thời sẽ reset lại các state của modal 
    // như đóng modal và clear nội dung task, cột được chọn
    this.setState({
        displayModal: false,
        selectedColumn: '',
        taskContent: '',
        columns: fromJS(updatedColumn)
    })
}
```
*Lưu ý: ở trên mình có dùng thêm 2 thư viện là `toastr` và `uuid`, bạn cần cài nó bằng cách chạy lần lượt 2 lệnh là:*
```bash
$ yarn add toastr
$ yarn add uuid
```
và import vào đầu file `App.js`:
```javascript
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import uuidv1 from 'uuid/v1';
```
Sau khi đã viết xong hàm phục vụ cho việc lưu task, lúc này ta sẽ tryền hàm đó vào modal và gán nó với nút **Save** như sau:
```javascript
{
    displayModal && 
    <AddNewModal handleToggleModal={this.handleToggleModal}
        selectedColumn={this.state.selectedColumn}
        handleChangeSelectedColumn={this.handleChangeSelectedColumn}
        taskContent={taskContent}
        handleChangeTaskContent={this.handleChangeTaskContent}
        handleAddNewTask={this.handleAddNewTask}
    />
}
```
```javascript
...
<button className="AddNewModal__btn AddNewModal__btn--confirm"
    onClick={props.handleAddNewTask}
>
    Save
</button>
...
```
Như vậy là chúng ta đã hoàn thành phần thêm mới task và đây là kết quả của chúng ta:

![](https://images.viblo.asia/e41749f1-0328-41ad-a433-6d560dcc7944.gif)

### b. Xóa task

Để xóa được một task ta sẽ cần 2 thông tin như sau:
- Cột mà task đó nằm trong
- Vị trí của task đó trong cột

Đầu tiên ta sẽ tạo một hàm nhận vào 2 thông tin này như sau:
```javascript
handleDeleteTask = (columnIndex, taskIndex) => () => {
    // Hỏi người dùng xác nhận xóa task này
    // Nếu người dùng xác nhận, tiến hành xóa task
    // Cập nhật state
}
```
Hai tham số truyền vào ở đây chính là chỉ số tương ứng của cột và của task trong mảng của nó. Sau khi triển khai phần nội dung đây là kết quả của chúng ta:
```javascript
handleDeleteTask = (columnIndex, taskIndex) => () => {
    const result = window.confirm('Are your sure to delete this task?');
    if (result) {
        const { columns } = this.state;
        const updatedColumn = columns.updateIn(
            [columnIndex, 'tasks'],
            tasks => tasks.remove(taskIndex));
        this.setState({ columns: fromJS(updatedColumn) }, () => {
            toastr.success('Delete task success', 'Notice', { timeOut: 2000 });
        });
    }
}
```
Với chỉ số trong mảng của cột và task ta có thể xóa nó đi 1 cách dễ dàng. Tuy nhiên ở đây bạn nên chú ý nếu ta muốn chắc chắn rằng chỉ sau khi thay đổi state thành công thì ta mới hiện thị thông báo thì ta phải sử dụng hàm callback trong `this.setState` như trên vì hàm này là hàm async. Cuối cùng ta thêm hàm này vào component task và gán vào nút xóa như sau:
```javascript
{
    columns.map((column, columnIndex) => (
        <Column key={column.get('id')}
            column={column}
            handleAddNewTask={this.handleToggleModal}
        >
            {
                column.get('tasks').map((task, taskIndex) => (
                    <Task key={task.get('id')}
                        task={task}
                        handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)} />
                ))
            }
        </Column>
}
```
```javascript
<div className="Task__btn" onClick={props.handleDeleteTask}>
    <i className="far fa-trash-alt"></i>
</div>
```
Và đây là kết quả của chúng ta:

![](https://images.viblo.asia/d9128a49-8558-4da0-be62-f86263874778.gif)

## 4. Kết bài
<hr>

Phần một của bài viết đến đây là hết. Nếu các bạn cảm thấy mình giải thích khó hiểu hoặc chữa rõ phần nào có thể comment phía dưới mình sẵn sàng giúp đỡ. Cám ơn bạn đã đọc bài viết của mình và hẹn bạn trong phần tiếp theo với nội dung vô cùng thú vị là chỉnh sửa nội dung task và kéo thả task qua lại các cột :D.