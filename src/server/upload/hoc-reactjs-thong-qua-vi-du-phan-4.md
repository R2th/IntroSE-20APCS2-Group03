# 1. Mở Đầu.
Xin chào các bạn,  hôm nay chúng ta sẽ đến với bài tiếp theo trong loạt bài  "Học ReactJs thông qua ví dụ" - loạt bài nhằm mục đích cung cấp những kiến thức cơ bản về ReactJs thông qua việc xây dựng todo app.
Trong phần 3 chúng ta đã thực hiện được những việc sau:
* Sử dụng package SweetAlert trong việc hiển thị popup thông báo.
* Delete item theo id.

Các bạn có thể theo dõi các bài trước theo đường link sau: 
1.  [HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 1](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-1-yMnKMnGaZ7P).
2.  [HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 2](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-2-eW65Ge2RZDO).
3.  [HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 3](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-3-4dbZNwkLlYM).

Và trong bài viết của phần 4 này chúng ta sẽ cùng nhau đi hoàn thiện chức năng sửa item. Nào chúng ta cùng bắt đầu nhé.
# 2. Sửa Item.
   Bước đầu trước khi xử lý bài toán chúng ta cùng phân tích luồng xử lí của  bài toán này. Khi người dùng click vào nút Edit sẽ sửa trực tiếp dòng đó, sửa xong bấm Save để lưu còn không thì bấm Cancel để hủy.
## Bước 1: Lấy thông tin của Item cần sửa.
   Nếu các bạn đã đọc kĩ [PHẦN 3 - XOÁ ITEM](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-3-4dbZNwkLlYM) thì sửa Item cũng có đôi phần giống giống như vậy.
Chúng ta sẽ chỉ sửa phần tên và level của sản phẩm, còn sửa sản phẩm nào thì sẽ dựa vào id của nó.
Trong file App.js ta tạo thêm các state để lưu các giá trị cần sửa, lưu ý level là kiểu số number.
```javascript
constructor(props) {    
    super(props);
    this.state = {
        ...
        indexEdit: 0,
        idEdit: '',
        nameEdit: '',
        levelEdit: 0
    }
}
```
Mở file App.js ta sẽ viết một hàm để nhận thông tin Item muốn sửa.
```javascript
handleEditItem = (index,item) => {
    console.log(index,item);
}
```
Ta gắn hàm trên làm props của Component Item.
```javascript
renderItem = () => {
    const {items} = this.state;
    return mapld(items,(item,index) => {
        return (
            <Item 
                ...
                handleEditItem={this.handleEditItem}
            />
        )
    });
}
```
Mở file Item.js vì nút Edit nằm trong file này. Ta sẽ viết một hàm cho sự kiện click Edit để gửi toàn bộ thông tin Item muốn sửa.
```javascript
<button 
    type="button" className="btn btn-sm btn-warning marginR5"
    onClick={() => this.props.handleEditItem(index, item)}
>
    Edit
</button>
```
Nếu test trên trình duyệt mà nó console ra giá trị index và item muốn sửa là ok rồi.
Trong file App.js giờ ta chỉ cần gắn các giá trị đó vào các biến state để lưu.
```javascript
handleEditItem = (index,item) => {
    this.setState({
        indexEdit: index,
        idEdit: item.id,
        nameEdit: item.name,
        levelEdit: item.level
    });
}
```
## Bước 2: Import component ItemEdit.
Trong file App.js hàm renderItem chúng ta đã lấy về một mảng các sản phẩm, sau đó check độ dài của mảng này, nếu bằng 0 thì hiển thị thông báo, nếu có thì bắt đầu duyệt mảng.
Trong quá trình duyệt mảng ta kiểm tra id của sản phẩm có trùng với idEdit không, nếu trùng thì sẽ load riêng một Component để edit sản phẩm.
Trong file App.js ta sẽ import thêm Component ItemEdit.
```javascript
import ItemEdit from './components/ItemEdit';
```
Tại hàm renderItem ta sẽ lấy state idEdit để kiểm tra lúc nào thì load Component ItemEdit.
```javascript
renderItem = () => {
    const {items,idEdit} = this.state;
    if(items.length === 0) {
        return <Item item={0} />
    }
    return mapld(items,(item,index) => {
        if(item.id === idEdit) {
            return (
                <ItemEdit />
            )
        }
        return (
            <Item 
                key={index}
                ...
            />
        )
    });
}
```
Tổng kết lại khi click vào nút Edit thì chúng ta đã load được Component Edit cho đúng dòng đó rồi, việc tiếp theo là load các giá trị vào.
## Bước 3: Load số thứ tự và tên sản phẩm.
Cần nhớ rằng tất cả các thông tin như số thứ tự, id sản phẩm, tên sản phẩm, level sản phẩm chúng ta đã lấy được từ Component Item, giờ chỉ việc chuyển chúng sang Component ItemEdit thông qua các state ở App.js
Trong file App.js hàm renderItem ta lấy các giá trị state và gửi vào ItemEdit.
```javascript
renderItem = () => {
    const {items,idEdit,indexEdit,nameEdit,levelEdit} = this.state;
    if(items.length === 0) {
        return <Item item={0} />
    }
    return mapld(items,(item,index) => {
        if(item.id === idEdit) {
            return (
                <ItemEdit 
                    key={index}
                    indexEdit={indexEdit}
                    nameEdit={nameEdit}
                    levelEdit={levelEdit}
                />
            )
        }
        return (
            <Item 
                key={index}
                ...
            />
        )
    });
}

```
Trong file ItemEdit.js có lẽ việc load đúng số thứ tự là dễ nhất nên chúng ta làm trước phần đó.
```javascript
render() {
    return(
        <tr>
            <td className="text-center">
                {this.props.indexEdit}
            </td>
            ...
        </tr>
    )
}
```
Việc tiếp theo là chúng ta load tên sản phẩm vào giá trị của input, sau khi thêm xong và test thử chúng ta sẽ bị cảnh báo warning về sự kiện onChange của input. Việc đó tạm thời để phần sau giải quyết.
```javascript
render() {
    return(
        <tr>
            <td className="text-center">
                {this.props.indexEdit}
            </td>
            <td>
                <input 
                    type="text" className="form-control" 
                    value={this.props.nameEdit} 
                />
            </td>
            ...
        </tr>
    )
}
```
## Bước 4: Load level của sản phẩm.
Việc hiển thị level sản phẩm tương đối rắc rối ở chỗ giá trị của nó là số và tương ứng với mỗi số là một kiểu hiển thị label với tên khác nhau.
Trong project này chúng ta có 2 phần hiển thị level dưới dạng select - option là ở Component ItemEdit và ở Component Form thêm sản phẩm.
Theo cá nhân mình để tối ưu thì ta tạo một mảng chứa các giá trị level này, Component nào cần thì gửi mảng này sang.
Cách xử lí mảng này sẽ như sau:
*  Tạo một mảng rỗng.
*  Duyệt mảng các sản phẩm và lọc lấy giá trị level.
* Nếu level chưa có thì add vào mảng rỗng.
* Nếu level có rồi thì không add nữa.

Trong file App.js, tại constructor của nó chúng ta sẽ tạo mảng mới và sử dụng map để lọc giá trị level rồi push vào mảng đó.
```javascript
class App extends Component {
    constructor(props) {    
        super(props);
        let arrayLevel = [];
        if(Items.length > 0) {
            for(let i = 0; i < Items.length; i++) {
                if(arrayLevel.indexOf(Items[i].level) === -1) {
                    arrayLevel.push(Items[i].level);
                }
            }
        }
        this.state = {
            ...
        }
  ...
```
Việc tiếp theo là ta sắp xếp cho mảng này có giá trị từ nhỏ đến lớn.
```javascript
class App extends Component {
    constructor(props) {    
        ...
        if(Items.length > 0) {
            ...
        }
        arrayLevel.sort(function(a, b){return a - b});
        ...
```
Vậy là ta đã có một mảng arrayLevel chứa các giá trị level từ 0 - 1 - 2, tiện thì ta lưu state này luôn.
```javascript
class App extends Component {
    constructor(props) {    
        ...
        this.state = {
            ...
            arrayLevel: arrayLevel
        }
 }
```
Tại hàm renderItem ta lấy state arrayLevel và gửi cho Component ItemEdit.
```javascript
const { items, idEdit, indexEdit, nameEdit, evelEdit, arrayLevel } = this.state;
...
<ItemEdit 
    key={index}
    indexEdit={indexEdit}
    nameEdit={nameEdit}
    levelEdit={levelEdit}
    arrayLevel={arrayLevel}
/>
```
Trong file ItemEdit.js ta viết một hàm có nhiệm vụ render các thẻ option tương ứng với mảng được nhận ở trên. Cách render các thẻ option sẽ như sau:
* Lấy mảng arrayLevel từ props Component.
* Duyệt mảng arrayLevel.
* Với mỗi phần tử sẽ sinh ra một thẻ option tương ứng.
* Duyệt mảng mình lại dùng hàm map của ES6, viết xong hàm renderLevel thì mình gọi nó luôn ở phía dưới.
```javascript
class ItemEdit extends Component {
    renderLevel = () => {
        const {arrayLevel} = this.props;
        return arrayLevel.map((level, index)=>{
            switch (level) {
                case 0:
                    return <option key={index} value={level}>Lowl</option>
                case 1:
                    return <option key={index} value={level}>Medium</option>
                default:
                    return <option key={index} value={level}>High</option>
            }
        });
    }
    
    render() {
        return(
            <tr>
                <td className="text-center">
                    {this.props.indexEdit}
                </td>
                <td>
                    <input 
                        type="text" className="form-control" 
                        value={this.props.nameEdit} 
                    />
                </td>
                <td className="text-center">
                    <select className="form-control">
                        {this.renderLevel()}
                    </select>
                </td>
                ...
            </tr>
        )
    }
}

export default ItemEdit;
```
Chúng ta đã render được list các option, giờ vấn đề là khi người dùng click sửa một sản phẩm có level là "high" thì chúng ta cũng phải để giá trị mặc định của select - option cũng là "high"
Việc này cũng không quá khó chúng ta chỉ cần gắn giá trị levelEdit vào thẻ select thì nó sẽ ra đúng.
```javascript
<select 
    className="form-control"
    value={this.props.levelEdit}
>
    {this.renderLevel()}
</select>
```
## Bước 5:  Viết hàm xử lý sự kiện click cancel sửa item.
Khi đang load giao diện sửa sản phẩm, nếu thấy sửa chữa không đúng ý người dùng có thể bấm Cancel để hủy. Có lẽ sự kiện này là đơn giản nhất nên ta làm trước.
Cần phải hiểu rằng việc có load ItemEdit hay không phụ thuộc vào idEdit, ban đầu idEdit là string rỗng, chỉ khi click Edit mới có giá trị. Vậy giờ chỉ cần bấm Cancel ta set cho idEdit về rỗng là xong.
Trong file App.js chúng ta viết một hàm để set giá trị idEdit.
```javascript
handleEditClickCancel = () => {
    this.setState({
        idEdit: ''
    });
}
```
Sau đó ta gắn hàm này vào Component ItemEdit.
```javascript
<ItemEdit 
    ...
    handleEditClickCancel={this.handleEditClickCancel}
/>
```
Trong file ItemEdit.js ta viết sự kiện onClick cho nút Cancel, mỗi lần click thì gọi thẳng đến props luôn.
```javascript
<button 
    type="button" className="btn btn-default btn-sm marginR5"
    onClick={() => this.props.handleEditClickCancel()}
>
    Cancel
</button>
```
## Bước 6: Viết hàm xử lý sự kiện onChange của ô input name.
Ở bước trên chúng ta đã bấm hủy để không sửa sản phẩm, bước tiếp theo là bấm lưu để lưu sản phẩm sau khi sửa. Vấn đề là chúng ta chưa viết các hàm cho sự thay đổi tên và level, ở đây chính là input và select.
Trong file ItemEdit.js đoạn input ta mới chỉ viết value={this.props.nameEdit} còn giá trị nameEdit nằm ở trong file App.js. Cách xử lí như sau:
* Viết một hàm thay đổi giá trị nameEdit.
* Gửi qua cho Component ItemEdit.
* Viết sự kiện onChange gọi đến hàm đó.
Trong file App.js ta viết một hàm thay đổi giá trị state nameEdit và nhận tham số truyền vào.
```javascript
handleEditInputChange = (value) => {
    this.setState({
        nameEdit: value
    });
}
```
Sau đó ta gắn hàm này vào Component ItemEdit.
```javascript
<ItemEdit 
    ...
    handleEditClickCancel={this.handleEditClickCancel}
    handleEditInputChange={this.handleEditInputChange}
/>
```
Trong file ItemEdit.js ta viết sự kiện onChange cho input, mỗi lần thay đổi thì gọi thẳng đến props luôn.
```javascript
<input 
    type="text" className="form-control" 
    value={this.props.nameEdit} 
    onChange={(event) => this.props.handleEditInputChange(event.target.value)}
/>
```
## Bước 7: Viết hàm xử lý sự kiện thay đổi select option của level.
Cách làm cũng sẽ tương tự như ở bước trên, tất cả các sự thay đổi giá trị state đều tập trung trong file App.js
Trong file App.js ta viết một hàm thay đổi giá trị state levelEdit và nhận tham số truyền vào.
```javascript
handleEditSelectChange = (value) => {
    this.setState({
        levelEdit: value
    });
}
```
Sau đó ta gắn hàm này vào component ItemEdit.
```javascript
<ItemEdit 
    ...
    handleEditClickCancel={this.handleEditClickCancel}
    handleEditInputChange={this.handleEditInputChange}
    handleEditSelectChange={this.handleEditSelectChange}
/>
```
Trong file ItemEdit.js ta viết sự kiện onChange cho select, mỗi lần thay đổi thì sẽ gọi thẳng đến props.
```javascript
<select 
    className="form-control"
    value={this.props.levelEdit}
    onChange={(event) => this.props.handleEditSelectChange(event.target.value)} 
>
    {this.renderLevel()}
</select>
```
## Bước 8: Viết hàm xử lý sự kiện save item vừa thay đổi.
Sau khi làm xong các bước trên ta đã thay đổi được giá trị name và level. Việc tiếp theo là click vào nút Save chúng ta mới sửa lại sản phẩm với giá trị mới này.
* Lấy danh sách sản phẩm, lấy id - tên - level của sản phẩm muốn sửa
* Duyệt danh sách sản phẩm
* So sánh id của mỗi sản phẩm với id sản phẩm muốn sửa
* Thay đổi lại tên và level của sản phẩm đó
Trong file App.js ta viết một hàm để lưu sản phẩm sau khi sửa.
```javascript
handleEditClickSubmit = () => {
    
}
```
Trong hàm này cần lấy danh sách sản phẩm, id, tên, level, của item cần sửa.
```javascript
handleEditClickSubmit = () => {
   let {items,idEdit,nameEdit,levelEdit} = this.state; 
}
```
Việc tiếp theo là duyệt mảng danh sách sản phẩm ban đầu, trong quá trình duyệt ta so sánh id của mỗi sản phẩm với idEdit, nếu giống thì gán lại giá trị tên và level cho nó.
```javascript
handleEditClickSubmit = () => {
    let {items,idEdit,nameEdit,levelEdit} = this.state;
    if(items.length > 0) { 
        for(let i = 0; i < items.length; i++) {
            if(items[i].id === idEdit) {
                items[i].name = nameEdit;
                items[i].level = +levelEdit;
                break;
            }
        }
    }
}
```
Các bạn lưu ý ở trên mình viết thêm dấu cộng trước levelEdit để ép nó sang number. Việc tiếp theo là sau khi sửa sản phẩm với các giá trị mới ta cũng set lại idEdit về lại ban đầu.
```javascript
handleEditClickSubmit = () => {
    let {items,idEdit,nameEdit,levelEdit} = this.state;
    if(items.length > 0) { 
        ...
    }
    this.setState({
        idEdit: ''
    });
}
```
Ở đây mình cũng chỉ mới làm ở mức đơn giản còn nếu kĩ lưỡng thì các bạn sẽ phải check giá trị nameEdit, chẳng hạn như không được để tên sản phẩm rỗng hoặc tên sản phẫm đã có rồi.
Việc tiếp theo sau khi viết xong hàm là gửi hàm này qua Component ItemEdit.
```javascript
<ItemEdit 
    ...
    handleEditClickCancel={this.handleEditClickCancel}
    handleEditInputChange={this.handleEditInputChange}
    handleEditSelectChange={this.handleEditSelectChange}
    handleEditClickSubmit={this.handleEditClickSubmit}
/>
```
Trong file ItemEdit.js chúng ta viết sự kiện onClick cho nút Save thì gọi đến props.
```javascript
<button 
    type="button" className="btn btn-success btn-sm"
    onClick={() => this.props.handleEditClickSubmit()}
>
    Save
</button>
```
# 3. Tạm kết.
Các bạn thân mến, như vậy trong bài viết này mình đã chia sẻ đến các bạn cách mà chúng ta sửa 1 item, bài viết hiện cũng đã khá dài nên mình xin phép được dừng bài viết †ại đây.
Xin hẹn gặp lại các bạn trong những bài viết tiếp theo.