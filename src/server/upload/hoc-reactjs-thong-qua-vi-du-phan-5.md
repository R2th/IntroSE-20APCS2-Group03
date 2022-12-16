# 1. Mở đầu.
Xin chào các bạn, hôm nay chúng ta sẽ đến với bài tiếp theo trong loạt bài "Học ReactJs thông qua ví dụ" - loạt bài nhằm mục đích cung cấp những kiến thức cơ bản về ReactJs thông qua việc xây dựng todo app. Trong phần 4 chúng ta đã thực hiện  việc sửa item
Các bạn có thể theo dõi các bài trước theo đường link sau:

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 1.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-1-yMnKMnGaZ7P)

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 2.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-2-eW65Ge2RZDO)

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 3.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-3-4dbZNwkLlYM)

[[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 4.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-4-ByEZkyQ25Q0)

Và trong bài viết của phần 5 này chúng ta  sẽ tiến hành thêm 1 item vào list.
# 2. Add Item.
## Bước 1: Viết hàm Toggle Form
Ban đầu khi mới vào trang web thì phần Form để thêm sản phẩm chưa xuất hiện. Khi người dùng click vào Add Item mới hiện ra.
Trong file App.js ta khai báo một biến state kiểu boolean để lưu việc ẩn hiện Form, giá trị mặc định của nó là false.
```javascript
constructor(props) {    
    super(props);
    this.state = {
        ...
        showForm: false
    }
}
```
Kéo xuống bên trong hàm render, giờ ta gửi state này cho Component Form để xử lí.
```javascript
<Form 
    showForm={this.state.showForm}
/>
```
Trong file Form.js bên trong hàm render của nó, ta chỉ việc check giá trị props được gửi sang. Nếu giá trị này khác false mới render phần HTML.
```javascript
render() {
    if (this.props.showForm === false) return null;
    return(
        <form className="form-inline">
            ...
        </form>
    )
}
```
Quay lại file App.js ta viết một hàm Toggle Form đảo ngược giá trị như sau.
```javascript
handleShowForm = () => {
    this.setState({
        showForm: !this.state.showForm
    });
}
```
Kéo xuống bên trong hàm render, ta gắn sự kiện onClick và gọi đến hàm khai báo ở trên, đồng thời ta thay đổi chữ cho phù hợp với trạng thái Add Item - Close Item.
```javascript
<button 
    type="button" className="btn btn-info btn-block marginB10"
    onClick={this.handleShowForm}
>
    { (this.state.showForm) ? 'Close Item' : 'Add Item' }
</button>
```
## Bước 2: Viết hàm Render Level Item.
Khi Form được hiện ra chúng ta có đoạn select - option liệt kê các level của sản phẩm nhưng thực ra đoạn đó chỉ là HTML có sẵn.
Trong file App.js chúng ta đã tạo được một mảng arrayLevel chứa giá trị number level, giờ ta gửi nó sang cho Component Form để xử lí.
```javascript
<Form 
    showForm={this.state.showForm}
    arrayLevel={this.state.arrayLevel}
/>
```
Trong file Form.js ta viết một hàm nhận props arrayLevel trên, duyệt mảng và in ra thẻ option tương ứng.
```javascript
renderLevel = () => {
    let {arrayLevel} = this.props;
    return arrayLevel.map((level,index)=>{
        switch (level) {
            case 0:
                return <option key={index} value={level}>Small</option>
            case 1:
                return <option key={index} value={level}>Medium</option>
            default:
                return <option key={index} value={level}>High</option>
        }
    });
}
```
Việc tiếp theo là xóa các thẻ HTML option bên dưới và thay bằng hàm trên.
```javascript
<select className="form-control">
    {this.renderLevel()}
</select>
```

## Bước 3: Viết hàm cho input onChange.
Theo phong cách quản lí tập trung tất cả các state đều để trong App.js ta cũng sẽ tạo một state kiểu string để lưu tên sản phẩm muốn add, sau đó cũng gửi sang Component Form.
```javascript
constructor(props) {    
    super(props);
    this.state = {
        ...
        valueItem: ''
    }
}
.....
<Form 
    showForm={this.state.showForm}
    arrayLevel={this.state.arrayLevel}
    valueItem={this.state.valueItem}
/>
```
Trong file Form.js ta gắn value của input bằng props được nhận.
```javascript
<input 
    type="text" className="form-control" placeholder="Item Name" 
    value={this.props.valueItem} 
/>
```
Cái còn thiếu là việc onChange thay đổi giá trị value của input, tất cả việc thay đổi đều gom vào trong file App.js còn sự kiện onChange chỉ gọi đến hàm đấy là xong.
Trong file App.js ta viết một hàm thay đổi giá trị valueItem nhận một tham số value đầu vào, sau đó gửi hàm này cho Component Form.
```javascript
handleFormInputChange = (value) => {
    this.setState({
        valueItem: value
    });
}
...
<Form 
    ...
    handleFormInputChange={this.handleFormInputChange}
/>
```
Trong file Form.js ta viết sự kiện onChange gọi đến props handleFormInputChange và truyền tham số value.
```javascript
<input 
    type="text" className="form-control" placeholder="Item Name" 
    value={this.props.valueItem} 
    onChange={(event)=>this.props.handleFormInputChange(event.target.value)}
/>
```
## Bước 4: Viết hàm cho select - option onChange.
Cũng làm tương tự như bước 3 ở trên, trong App.js ta tạo một state kiểu number lưu giá trị levelItem, mặc định bằng 0, sau đó gửi state này cho Componenet Form.
```javascript
constructor(props) {    
    super(props);
    this.state = {
        ...
        valueItem: '',
        levelItem: 0
    }
}
...
<Form 
    ...
    levelItem={this.state.levelItem}
/>
```
Trong file Form.js ta gắn value của select bằng props được nhận.
```javascript
<select 
    className="form-control"
    value={this.props.levelItem}
>
    {this.renderLevel()}
</select>
```
Quay lại file App.js ta viết một hàm thay đổi giá trị levelItem nhận một tham số value đầu vào, sau đó gửi hàm này cho Component Form.
```javascript
handleFormSelectChange = (value) => {
    this.setState({
        levelItem: value
    });
}
...
<Form 
    ...
    levelItem={this.state.levelItem}
    handleFormSelectChange={this.handleFormSelectChange}
/>
```
Trong file Form.js ta viết sự kiện onChange gọi đến props handleFormSelectChange và truyền tham số value.
```javascript
<select 
    className="form-control"
    value={this.props.levelItem}
    onChange={(event)=>this.props.handleFormSelectChange(event.target.value)} 
>
    {this.renderLevel()}
</select>
```
## Bước 5: Viết hàm cho nút cancel.
Ở đây tác vụ mình làm với nút Cancel là reset các giá trị tên - level sản phẩm về mặc định, còn không thì các bạn có thể làm theo ý khác.
Trong file App.js ta viết hàm reset giá trị vể mặc định, sau đó gửi hàm này cho Component Form.
```javascript
handleFormClickCancel = () => {
    this.setState({
        valueItem: '',
        levelItem: 0
    });
}
...
<Form 
    ...
    handleFormClickCancel={this.handleFormClickCancel}
/>
```
Trong file Form.js ta gắn sự kiện onClick cho nút Cancel và gọi đến props trên là xong.
```javascript
<button 
    type="button" className="btn btn-default"
    onClick={()=>this.props.handleFormClickCancel()}
>
    Cancel
</button>
```
## Bước 6: Viết hàm cho nút Submit.
Trong file App.js ta viết sẵn một hàm cho sự kiện click Submit và gửi qua Component Form.
```javascript
handleFormClickSubmit = () => {

}
...
<Form 
    ...
    handleFormClickSubmit={this.handleFormClickSubmit}
/>
```
Trong file Form.js ta gắn sự kiện onClick cho nút Submit và gọi đến props trên là xong.
```javascript
<button 
    type="button" className="btn btn-primary"
    onClick={()=>this.props.handleFormClickSubmit()}
>
    Submit
</button>
```
Một lưu ý nữa là khi người dùng nhập tên sản phẩm xong rất hay bấm Enter để thay cho việc kéo chuột nhấn nút Submit, vậy ta cũng cho sự kiện onSubmit vào thẻ HTML form gọi đến props trên.
```javascript
<form className="form-inline" onSubmit={()=>this.props.handleFormClickSubmit()}>
    ...
</form>
```
Quay lại hàm handleFormClickSubmit giờ là lúc xử lí code bên trong. Luồng xử lí của mình như sau.
* Lấy giá trị tên sản phẩm, level sản phẩm muốn add
* Kiểm tra nếu tên sp rỗng thì không add
* Nếu khác rỗng thì tạo đối tượng sp mới
* Gán các giá trị vào đối tượng
* Thêm package uuid để gán id cho sp
* Thêm đối tượng sp mới đó vào mảng sp ban đầu
* Cập nhật lại state các sp
* Thêm sp mới xong thì đóng Form, reset các giá trị về ban đầu
Trong file App.js các bạn lưu ý là nhớ import thêm uuid. Code toàn bộ phần này như sau.
```javascript
import uuidv4 from 'uuid/v4';
...
handleFormClickSubmit = () => {
    let {valueItem,levelItem} = this.state;
    if(valueItem.trim() === 0) return false;
    let newItem = {
        id: uuidv4(),
        name: valueItem,
        level: +levelItem
    }; 
    Items.push(newItem);
    this.setState({
        items: Items,
        valueItem: '',
        levelItem: 0,
        showForm: false
    });
}
```
# 3. Tạm kết.
Các bạn thân mến, như vậy trong bài viết này mình đã chia sẻ đến các bạn cách mà chúng ta sửa 1 item, bài viết hiện cũng đã khá dài nên mình xin phép được dừng bài viết †ại đây. Xin hẹn gặp lại các bạn trong những bài viết tiếp theo.