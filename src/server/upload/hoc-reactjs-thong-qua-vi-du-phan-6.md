# 1. Mở đầu.
Xin chào các bạn, hôm nay chúng ta sẽ đến với bài tiếp theo trong loạt bài "Học ReactJs thông qua ví dụ" - loạt bài nhằm mục đích cung cấp những kiến thức cơ bản về ReactJs thông qua việc xây dựng todo app. Trong phần 5 chúng ta đã thực hiện  việc add item
Các bạn có thể theo dõi các bài trước theo đường link sau:

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 1.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-1-yMnKMnGaZ7P)

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 2.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-2-eW65Ge2RZDO)

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 3.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-3-4dbZNwkLlYM)

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 4.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-4-ByEZkyQ25Q0)

[HỌC REACTJS THÔNG QUA VÍ DỤ PHẦN 5.](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-5-YWOZrwd7lQ0)


Và trong bài viết của phần 6 này chúng ta  sẽ tiến hành thêm sắp xếp các phần tử.
# 2. Sắp xếp các phần tử Item.
## Bước 1: Xác định các kiểu sắp xếp.
Sau khi nghiên cứu tỉ mỉ ta có thể chia việc sắp xếp dựa trên 2 trường dữ liệu. 
* Kiểu sortType cho chúng ta biết sắp xếp theo kiểu name hay level.
* Kiểu sortOrder cho chúng ta biết sắp xếp theo thứ tự lên hay xuống.
Trong file App.js ta tạo ra 2 state kiểu string để lưu giá trị sắp xếp.
```javascript
constructor(props) {
    super(props);
    this.state = {
        ..
        sortType: '',
        sortOrder: ''
    };
}
```
Kéo xuống phần render ta gửi 2 state này cho Component Sort.
```javascript
<Sort 
    sortType={this.state.sortType}
    sortOrder={this.state.sortOrder}
/>
```
Trong file Sort.js ta thấy việc hiển thị kiểu sắp xếp đang là HTML tĩnh. Giờ ta sẽ viết một hàm chịu trách nhiệm render HTML này và gọi hàm trong phần render.
```javascript
renderSort = () => {
    
}

render() {
    return (
        <div className="dropdown">
            ...
            {this.renderSort()}
        </div>
    )
}
```
Trong hàm renderSort đầu tiên ta phải lấy 2 props nhận được, check 2 giá trị này khác rỗng thì ta render ra HTML tương ứng.
```javascript
renderSort = () => {
    let {sortType, sortOrder} = this.props;
    if(sortType !== '' && sortOrder !== '') {
        return (
            <span className="label label-success label-medium text-uppercase">
                {sortType} - {sortOrder}
            </span>
        )
    }
}
```
## Bước 2: Viết hàm thay đổi kiểu sắp xếp.
Trong file App.js ta viết một hàm để thay đổi các giá trị sortType và sortOrder. Gửi tiếp hàm này cho Component Sort.
```javascript
handleSort = (sortType,sortOrder) => {
    console.log(sortType + " - " + sortOrder);
}
<Sort 
    ...
    handleSort={this.handleSort}
/>
```
Trong file Sort.js ta viết một hàm handleClick với 2 tham số đầu vào. Truyền 2 giá trị này sang cho props handleSort.
```javascript
handleClick = (sortType,sortOrder) => {
    this.props.handleSort(sortType,sortOrder);
}
```
Kéo xuống phần render của Sort.js ta gắn sự kiện click và truyền giá trị thủ công bằng tay cho thẻ tương ứng.
```javascript
render() {
    return (
        <div className="dropdown">
            ...
            <ul className="dropdown-menu" id="dropdownMenu1">
                <li onClick={() => this.handleClick('name','asc')}>
                    <a role="button" className="text-uppercase">Name ASC</a>
                </li>
                <li onClick={() => this.handleClick('name','desc')}>
                    <a role="button" className="text-uppercase">Name DESC</a>
                </li>
                <li role="separator" className="divider"></li>
                <li onClick={() => this.handleClick('level','asc')}>
                    <a role="button" className="text-uppercase">Level ASC</a>
                </li>
                <li onClick={() => this.handleClick('level','desc')}>
                    <a role="button" className="text-uppercase">Level DESC</a>
                </li>
            </ul>
            ...
        </div>
    )
}
```
Sau khi click sắp xếp thử nếu chúng ta console ra được các giá trị sortType và sortOrder được là ok rồi.
Việc tiếp theo là xử lí luồng dữ liệu, cách làm sẽ như sau.
1. Nhận các tham số đầu vào, lấy giá trị đó gắn cho 2 state sortType - sortOrder.
2. Lấy danh sách các sp.
3. Sử dụng phương thức orderBy của lodash để sắp xếp danh sách trên.
4. Sắp xếp xong gán lại danh sách ban đầu.

Trong file App.js ta sử dụng phương thức orderBy của lodash nên nhớ import nó vào. Các bạn có thể tham khảo phương thức này tại: https://lodash.com/docs/4.17.5#orderBy
```javascript
import { orderBy as orderByld } from 'lodash';
...
handleSort = (sortType,sortOrder) => {
    this.setState({
        sortType: sortType,
        sortOrder: sortOrder
    });
    let {items} = this.state;
    this.setState({
        items: orderByld(items, [sortType],[sortOrder])
    });
}
```
# 3. Tạm kết.
Các bạn thân mến, như vậy trong bài viết này mình đã chia sẻ đến các bạn cách mà chúng ta sort Item, bài viết hiện cũng đã khá dài nên mình xin phép được dừng bài viết †ại đây. Xin hẹn gặp lại các bạn trong những bài viết tiếp theo.