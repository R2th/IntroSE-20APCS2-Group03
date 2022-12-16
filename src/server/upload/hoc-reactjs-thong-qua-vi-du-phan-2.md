# 1. Mở đầu.
Xin chào các bạn, trong phần 1 của bài Học React thông qua ví dụ phần 1 chúng ta đã cùng nhau đi tạo giao diện sau đó phân chia giao diện thành các component. Hôm nay chúng ta sẽ tiếp tục đi hoàn thành các công việc tiếp theo là tạo mock data và render Item.
Các bạn có thể tham khảo bài viết trước của mình theo link sau : [PHẦN 1](https://viblo.asia/p/hoc-reactjs-thong-qua-vi-du-phan-1-yMnKMnGaZ7P).
Dưới đây là nội dung chính của bài viết.
1. Tạo mock data.
2. Thêm package UUID.
3. Hàm Render Item ở App.js.
4. In giá trị ở Item.js.
Nào chúng ta cùng đi vào từng phần 1 nhé.

# 2. Tạo mock data.
Vì đây là một project cơ bản nên chúng ta sẽ làm việc với các dữ liệu do chính mình tạo ra, cái này gọi là mockdata hay dữ liệu ảo. Các bạn vào folder src và tạo thêm folder mockdata
Bên trong folder này ta thêm file nữa tên là Items.js để tạo 1 mảng các đối tượng chứa dữ liệu. 
```javascript

const Items = [
    {
        id: "abc1",
        name: "Tìm thấy mảnh vỡ máy bay rơi ở Iran làm 66 người chết",
        level: 2 // high
    },
    {
        id: "abc2",
        name: "Không còn tranh cướp lộc hoa tre ở lễ hội đền Gióng 2018",
        level: 0 // low
    },
    {
        id: "abc3",
        name: "Hơn 37.000 người nhập viện vì tai nạn giao thông, đốt pháo",
        level: 1 // medium
    },
    {
        id: "abc4",
        name: "Gần 200 người chết vì tai nạn giao thông 7 ngày nghỉ Tết",
        level: 0 // low
    },
    {
        id: "abc5",
        name: "VFF giải ngân 15 tỷ đồng, tiền thưởng tới tay U23 VN trước Tết",
        level: 2 // high
    },
    {
        id: "abc6",
        name: "F1 muốn tổ chức giải đua xe tại Việt Nam vào năm 2020",
        level: 1 // medium
    }
];

export default Items;
```
# 3. Thêm package UUID.
Ta thấy ở mảng trên các id đều là do mình tự đặt, chúng ta có thể sử dụng thêm package uuid để nó tự sinh mã id, các bạn có thể tham khảo thêm về package này tại https://www.npmjs.com/package/uuid .ĐỂ thêm package này trước tiên ta phải dừng chạy project, quay lại màn hình cmd và nhấn tổ hợp phím **Ctrl + C**, nhấn **Y** và nhấn **enter** để xác nhận dừng chạy project. Để thêm package ta gõ vào dòng sau **npm install uuid --save** . Sau khi đã add xong chúng ta chạy lại project của mình bằng cách gõ **npm star**. Trong package có nhiều kiểu uuid khác nhau, chúng ta sẽ import uuidv4 để nó sinh ra mã ngẫu nhiên và gắn vào giá trị của các id như code bên dưới.
```javascript
import uuidv4 from 'uuid/v4';

const Items = [
    {
        id: uuidv4(),
        name: "Tìm thấy mảnh vỡ máy bay rơi ở Iran làm 66 người chết",
        level: 2 // high
    },
    {
        id: uuidv4(),
        name: "Không còn tranh cướp lộc hoa tre ở lễ hội đền Gióng 2018",
        level: 0 // low
    },
    {
        id: uuidv4(),
        name: "Hơn 37.000 người nhập viện vì tai nạn giao thông, đốt pháo",
        level: 1 // medium
    },
    {
        id: uuidv4(),
        name: "Gần 200 người chết vì tai nạn giao thông 7 ngày nghỉ Tết",
        level: 0 // low
    },
    {
        id: uuidv4(),
        name: "VFF giải ngân 15 tỷ đồng, tiền thưởng tới tay U23 VN trước Tết",
        level: 2 // high
    },
    {
        id: uuidv4(),
        name: "F1 muốn tổ chức giải đua xe tại Việt Nam vào năm 2020",
        level: 1 // medium
    }
];

export default Items;

```
# 4. Hàm Render Item ở App.js.
**Bước 1:** Trước tiên chúng ta phải import các dữ liệu mockdata ở Items.js vào trong file App.js.
```javascript
import Items from './mockdata/Items';
```
**Bước 2 :** Sau đó chúng ta sẽ cho Items vào làm một state ở trong constructor của App.js.
```javascript
constructor(props) {    
    super(props);
    this.state = {
        items: Items
    }
}
```
**Bước 3:** Tiếp theo ta viết một hàm là renderItem có nhiệm vụ tách dữ liệu mảng trên và tương ứng với mỗi đối tượng trong mảng sẽ là một Component Item, cách viết hàm dưới đây và về sau này đều sử dụng cách viết của ES6.
```javascript
renderItem = () => {
    return(111);
}
```
**Bước 4 :** Tiếp theo ta sẽ gọi hàm này bên trong đoạn tbody vì các sản phẩm sinh ra sẽ nằm bên trong đó.
```javascript
<tbody>
    {this.renderItem()}
</tbody>
```
**Bước 5:** Trong phương thức renderItem, việc đầu tiên là ta phải lấy được state items chứa mảng dữ liệu.
```javascript
renderItem = () => {
    let {items} = this.state;
}
```
**Bước 6 :** Ta sử dụng hàm map để duyệt mảng items. 
```javascript
renderItem = () => {
    let {items} = this.state;
    return items.map((item) => {
        console.log(item);
    });
}
```
Nếu bạn bấm phím F12 trên trình duyệt Chrome và chọn tab Console thấy in ra được kết quả như ảnh dưới là chúng ta đã sử dụng thành công phương thức map rồi (tất nhiên là id của bạn sinh ra sẽ khác của mình).
![](https://images.viblo.asia/4c0aa426-743e-4716-8dad-7158225f2f71.png)

**Bước 7 :** Trước khi in các Component Item vào bên trong hàm map ta phải import chúng vào trước đã.
```javascript
import Item from './components/Item';
```
Việc tiếp theo là thay đoạn console.log(item) bằng Component Item đã add ở trên, lưu ý là ta sẽ phải thêm một tham số index trong hàm trả về. Ta sẽ gắn các giá trị trả về tương ứng làm props của Item, index được dùng để đánh số thứ tự, key để tránh trùng mỗi phần tử khi lặp và item để gửi sang in kết quả. 
```javascript
renderItem = () => {
    let {items} = this.state;
    return items.map((item, index) => {
        return (
            <Item
                item={item}
                index={index}
              />
        )
    });
}
```
Nếu trên trình duyệt in được ra kết quả như này là chúng ta sắp đi đến thành công rồi.
![](https://images.viblo.asia/360c968e-f5b8-4889-8c4f-f42313f1b44a.png).
# 5 . In  trị ở Item.js.
Ở phần trên chúng ta đã gửi các giá trị thông qua props của <Item />, giờ chỉ việc lấy các giá trị đó gắn vào là xong. Mở file Item.js nằm trong folder components Trong hàm render của nó ta phải lấy được các giá trị đã được gửi qua từ file App.js.
```javascript
render() {
    let {item,index} = this.props;
    return(
        ...
    )
}
```
Đơn giản nhất là ta in số thứ tự ra trước đã. 
```javascript
render() {
    let {item,index} = this.props;
    return(
        <tr>
            <td className="text-center">
                {index}
            </td>
            ...
        </tr>
    )
}
```
Tiếp theo là in tên của item, lưu ý item là đối tượng.
```javascript
render() {
    let {item,index} = this.props;
    return(
        <tr>
            <td className="text-center">
                {index}
            </td>
            <td>
                {item.name}
            </td>
            ...
        </tr>
    )
}
```
Việc tiếp theo là in giá trị level, cái khó ở đây là giá trị level là số number và tương ứng mỗi giá trị sẽ có một kiểu label khác nhau.
```javascript
level = 0  ===> class: label-info    ===> text: Low
level = 1  ===> class: label-warning ===> text: Medium
level = 2  ===> class: label-danger  ===> text: High
```
Để code dễ dàng có lẽ chúng ta nên dùng switch ... case là tốt nhất. Sau một hồi hí hoáy chúng ta có code của toàn bộ file Item.js như sau.
```javascript
render() {
    let {item,index} = this.props;
    return(
        <tr>
            <td className="text-center">
                {index}
            </td>
            <td>
                {item.name}
            </td>
            ...
        </tr>
    )
}
```
Việc tiếp theo là in giá trị level, cái khó ở đây là giá trị level là số number và tương ứng mỗi giá trị sẽ có một kiểu label khác nhau.

```javascript
level = 0  ===> class: label-info    ===> text: Low
level = 1  ===> class: label-warning ===> text: Medium
level = 2  ===> class: label-danger  ===> text: High
```
Để code dễ dàng có lẽ chúng ta nên dùng switch ... case là tốt nhất. Sau một hồi hí hoáy chúng ta có code của toàn bộ file Item.js như sau. 

```javascript
import React, {Component} from 'react';

class Item extends Component {
    render() {
        let {item,index} = this.props;
        let classNameLabel = '';
        let nameLabel = '';
        switch (item.level) {
            case 1:
                classNameLabel = 'label label-warning';
                nameLabel = 'Medium';
                break;
            case 2:
                classNameLabel = 'label label-danger';
                nameLabel = 'High';
                break;
            default:
                classNameLabel = 'label label-info';
                nameLabel = 'Low';
                break;
        }
        return(
            <tr>
                <td className="text-center">
                    {index}
                </td>
                <td>
                    {item.name}
                </td>
                <td className="text-center">
                    <span className={classNameLabel}>{nameLabel}</span>
                </td>
                <td>
                    <button type="button" className="btn btn-warning btn-sm">Edit</button>
                    <button type="button" className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        )
    }
}
 
export default Item;
```
Nếu ngon nghẻ và suôn sẻ không thấy có lỗi gì cả ở trong tab Console thì chúng ta đã in được các dữ liệu ở trong mockdata ra ngoài thành công. Đây là kết quả của chúng ta sau một hồi vất vả.
![](https://images.viblo.asia/d3f5d87b-96bc-40d1-ac04-04d323ef7657.png).
# 6. Tạm kết. 
Bài viết này cũng khá dài mình xin dừng lại tại đây, hẹn gặp lại các bạn trong những bài viết tiếp theo. Rất mong được sự ủng hộ và theo dõi của các bạn để mình có thể viết thêm được nhiều bài viết hơn nữa.