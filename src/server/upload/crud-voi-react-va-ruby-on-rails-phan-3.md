## Xóa dữ liệu
Để xóa dữ liệu, việc đầu tiên chúng ta cần là thêm một nút chức năng để xử lý việc xóa Item trong component <Allitems/>
```
// app/assets/javascripts/components/_all_items.js.jsx

var AllItems = React.createClass({
  handleDelete() {
    console.log("delete item clicked");
  },

  render() {
    var items = this.props.items.map(item => {
      return (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      );
    });

    return <div>{items}</div>;
  }
});
```
Tiếp theo chúng ta cần phải viết thêm một hàm để xử lý việc nhấn xóa
```
// app/assets/javascripts/components/_body.js.jsx

    handleDelete() {
        console.log('in handle delete');
    },




    render() {
        return (
            <div>
                <NewItem handleSubmit={this.handleSubmit}/>
                <AllItems  items={this.state.items} handleDelete={this.handleDelete}/>
            </div>
        )
    }
});
```
Bây giờ chúng ta sẽ sử dụng hàm `handleDelete` trong component <Allitems/> bằng cách sử dụng props
```
// app/assets/javascripts/components/_all_items.js.jsx

var AllItems = React.createClass({
    handleDelete() {
        this.props.handleDelete();
    },

    render() {
    //the rest of the component
```
Ok. Bây giờ làm thế nào để chúng ta biết được chúng ta đang muốn xóa Item nào? Ở đây chúng ta sẽ sử dụng method bind(). Method bind() sẽ lấy được id của Item `this` và gửi id dưới dạng tham số.
```
// app/assets/javascripts/components/_all_items.js.jsx

handleDelete(id) {
    this.props.handleDelete(id);
},

render() {
    var items= this.props.items.map((item) => {
        return (
            <div key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button onClick={this.handleDelete.bind(this, item.id)} >Delete</button>
            </div>
        )
    });
```
Tiếp theo chúng ta sẽ thực hiện một Ajax để xóa Item từ database
```
// app/assets/javascripts/components/_body.js.jsx

handleDelete(id) {
    $.ajax({
        url: `/api/v1/items/${id}`,
        type: 'DELETE',
        success(response) {
            console.log('successfully removed item')
        }
    });
},
```
Sau khi thực hiện xong việc xóa dữ liệu chúng ta cần phải tải lại trang danh sách để xem dữ liệu đã xóa hay chưa. Chúng ta sẽ làm điều này bằng cách cập nhật lại mảng items.
```
// app/assets/javascripts/components/_body.js.jsx

handleDelete(id) {
    $.ajax({
        url: `/api/v1/items/${id}`,
        type: 'DELETE',
        success:() => {
           this.removeItemClient(id);
        }
    });
},

removeItemClient(id) {
    var newItems = this.state.items.filter((item) => {
        return item.id != id;
    });

    this.setState({ items: newItems });
},
```
Như vậy là chúng ta đã hoàn thành xong việc xóa dữ liệu. Tiếp theo chúng ta cùng nhau xây dựng chức năng sửa dữ liệu.
## Sửa dữ liệu
Tất nhiên để có thể chỉnh sửa dữ liệu chúng ta cũng cần thêm một button sửa khi dữ liệu thay đổi và click vào button chúng ta sẽ thực hiện một yêu cầu Ajax nếu thành công Item sẽ được lưu với các giá trị mới.
Trước tiên, chúng ta sẽ triển khai button chỉnh sửa và trình xử lý sự kiện.
```
// app/assets/javascripts/components/_all_items.js.jsx

handleEdit() {

},
//render() and the rest of the tempalte
<button onClick={this.handleEdit()}> Edit </button>
```
Tiếp theo chúng ta cần thêm một thuộc tính là handleEdit cho Item
```
// app/assets/javascripts/components/_all_items.js.jsx

render() {
    var items= this.props.items.map((item) => {
        return (
            <div key={item.id}>
                <Item item={item}
                       handleDelete={this.handleDelete.bind(this, item.id)}
                       handleEdit={this.handleEdit}/>
            </div>
        )
    });
```
Bây giờ chúng ta sẽ sửa code ở component Item như sau:
```
// app/assets/javascripts/components/_item.js.jsx

var Item = React.createClass({
  render() {
    return (
      <div>
        <h3>{this.props.item.name}</h3>
        <p>{this.props.item.description}</p>
        <button onClick={this.props.handleDelete}>Delete</button>
        <button onClick={this.props.handleEdit}> Edit </button>
      </div>
    );
  }
});
```
Tiếp theo chúng ta sẽ di chuyển handleEdit() sang component Item. Chúng ta sẽ có một biến Boolean mà giá trị sẽ được thay đổi bằng cách nhấp nút. Nếu biến đó có giá trị là true thì thuộc tính của item đó sẽ được chuyển thành input và ngược lại. Khi di chuyển handleEdit() sang component Item chúng ta cũng phải sửa lại thuộc tính của nút sửa từ this.props.handleEdit thành this.handleEdit.
```
// _app/assets/javascripts/components/_item.js.jsx
<button onClick={this.handleEdit}> Edit </button>
```
Và khởi tạo phương thức handleEdit() trong component
```
// app/assets/javascripts/components/_item.js.jsx

var Item = React.createClass({
    handleEdit() {
        console.log('edit button clicked')
    },
```
Bây giờ chúng ta sẽ tạo một biến có tên là editable có giá trị ban đầu là false và thiết lập lại là true nếu nút edit được ấn:
```
// app/assets/javascripts/components/_item.js.jsx

var Item = React.createClass({
    getInitialState() {
        return {editable: false}
    },
    handleEdit() {
        this.setState({editable: !this.state.editable})
    },

    render() {
```
Tiếp đến chúng ta cần chỉnh sửa lại render Item để khi click vào nút edit các thuộc tính trong row sẽ được thay đổi thành input
```
// app/assets/javascripts/components/_item.js.jsx

render() {
    var name = this.state.editable ? <input type='text' defaultValue={this.props.item.name} /> : <h3>{this.props.item.name}</h3>;
    var description = this.state.editable ? <input type='text' defaultValue={this.props.item.description} />: <p>{this.props.item.description}</p>;
    return (
        <div>
            {name}
            {description}
            <button onClick={this.props.handleDelete} >Delete</button>
            <button onClick={this.handleEdit}> Edit </button>
 …
```
Như vậy, bây giờ name và description sẽ được thay đổi khi this.state.editable được thay đổi. Và hãy làm tương tự với button edit:
```
// app/assets/javascripts/components/_item.js.jsx

<button onClick={this.handleEdit}>
  {" "}
  {this.state.editable ? "Submit" : "Edit"}{" "}
</button>
```
Khi các thuộc tính trong row được chuyển thành input chúng ta cần phải đưa giá trị của row vào trong input đó. Để làm được điều này chúng ta làm như sau:
```
// app/assets/javascripts/components/_item.js.jsx

render() {
    var name = this.state.editable ? <input type='text' ref='name' defaultValue={this.props.item.name} /> : <h3>{this.props.item.name}</h3>;
    var description = this.state.editable ? <input type='text' ref='description' defaultValue={this.props.item.description} />: <p>{this.props.item.description}</p>;
```
```
// app/assets/javascripts/components/_item.js.jsx

handleEdit() {
    if(this.state.editable) {
        var name = this.refs.name.value;
        var description = this.refs.description.value;
        console.log('in handleEdit', this.state.editable, name, description);

    }
    this.setState({ editable: !this.state.editable })
},
```
Bây giờ khi bấm vào sửa chúng ta cần phải gửi nó đến component Body điều này có nghĩa là chúng ta cần phải sử dụng method props để truyền dữ liệu lên. Để làm được điều này chúng ta sẽ bắt đầu trên component Item:
```
// app/assets/javascripts/components/_item.js.jsx

handleEdit() {
    if(this.state.editable) {
        var name = this.refs.name.value;
        var id = this.props.item.id;
        var description = this.refs.description.value;
        var item = {id: id , name: name , description: description};
        this.props.handleUpdate(item);

    }
    this.setState({ editable: !this.state.editable })
},
```
Trong component Allitem chúng ta sẽ thêm một method handleUpdate sẽ lấy các thuộc tính được thiết lập trong onUpdate:
```
// app/assets/javascripts/components/_all_items.js.jsx

onUpdate(item) {
    this.props.onUpdate(item);
},

render() {
    var items= this.props.items.map((item) => {
        return (
            <div key={item.id}>
                <Item item={item}
                      handleDelete={this.handleDelete.bind(this, item.id)}
                      handleUpdate={this.onUpdate}/>
            </div>
        )
    });
```
Cuối cùng ở component Body sẽ lấy onUpdate với Item trong đó:
```
// app/assets/javascripts/components/_body.js.jsx

// app/assets/javascripts/components/_body.js.jsx

handleUpdate(item) {
    $.ajax({
            url: `/api/v1/items/${item.id}`,
            type: 'PUT',
            data: { item: item },
            success: () => {
                this.updateItems(item);

            }
        }
    )},

updateItems(item) {
    var items = this.state.items.filter((i) => { return i.id != item.id });
    items.push(item);

    this.setState({items: items });
},


render() {
    return (
        <div>
            <NewItem handleSubmit={this.handleSubmit}/>
            <AllItems  items={this.state.items}  handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
        </div>
    )
}

    )},
```
## Kết luận: 
Như vậy hôm nay mình cũng đã hoàn tất việc xây dựng một ứng dụng nhỏ sử dụng ruby on rails và react. Trong 3 phần trên do kiến thức còn yếu kém nên có thể chưa đúng mong các bạn thông cảm (bow)

Tài liệu: https://www.pluralsight.com/guides/building-a-crud-interface-with-react-and-ruby-on-rails

Github: https://github.com/DangDinhLuan/react-rails