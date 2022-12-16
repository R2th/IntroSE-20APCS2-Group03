### **I. Tổng quan về Modals**

- `Modal` là một meta component của bootstrap hỗ trợ tạo một popup có nội dung và các action được customize như một page thông thường.
- `Modal` được sử dụng rất dễ dàng với cấu trúc các tag trong thư bootstrap.

### **II. Cài đặt**

- `Modal` là một component của bootstrap, vì vậy để sử dụng `Modal` chỉ cần cài đặt `react-bootstrap`
- `react-bootstrap` được cài đặt rất dễ dàng bằng câu lệnh `npm install --save react-bootstrap` hoặc thêm vào file `package.json` thư viện:
```
{
    "dependencies": {
        "react-bootstrap": "0.30.0"
    }
}
```
trước khi chạy câu lệnh `npm install`

### **III. Các cách sử dụng Modal**

#### 1. Một ví dụ đơn giản nhất về Modal:
- Sử dụng thẻ `<Modal/>`  và các thẻ con với cấu trúc:
```html
<Modal show={this.state.showModal} onHide={this.close}>
    <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
       Modal body
    </Modal.Body>
    <Modal.Footer>
        <Button onClick={this.close}>Close</Button>
    </Modal.Footer>
</Modal>
```

- Cần khai báo một giá trị state `showModal` trong hàm khởi tạo để điều khiển việc đóng mở của modal:
```js
constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
  }
```

- Cần tạo 2 action `open` và `close` để thực hiện đóng và mở `modal`:
```js
close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
```

- Tạo button để mở modal từ trang gốc:
```html
<Button onClick={this.open} >
    Launch demo modal
</Button>
```

**Như vậy là ta đã tạo được một modal đơn giản nhất với bố cục đầy đủ 3 phần. Tiếp theo ta sẽ tìm hiểu cách tạo một modal phức tạp hơn.**

#### 2. Customize modal bằng css:
-  Ta có thể tạo modal nằm trong một frame bằng cách custom css như sau:
```css
.modal-container {
  position: relative;
}
.modal-container .modal, .modal-container .modal-backdrop {
  position: absolute;
}
```
Với `modal-container` là class của một thẻ `<div>` bao ngoài `<Modal>` mà ta muốn đóng khung.
- Ta cũng có thể chỉnh size cho `<Modal>` bằng thuộc tính `bsSize` với các giá trị `lg`, `large`, `sm`, `small` hoặc theo size custom bằng thuộc tính `dialogClassName`.
- Nội dung của modal được tạo ra như một page thông thường.

### **V. Kết luận**
Trên đây là những ví dụ cơ bản nhất trong việc sử dụng `Modal` của `react-bootstrap` để tạo ra các popup page. Hi vọng bài viết có thể cung cấp cách nhìn tổng quan, dễ hiểu nhất cho những bạn mới tiếp xúc với các components đơn giản của thư viện `react-bootstrap`. Chúng ta có thể tìm hiểu rất nhiều components khác rất tiện dụng trong thư viện `react-bootstrap` của `react` qua trang chính thức: https://react-bootstrap.github.io/components/

Tài liệu tham khảo và demo: https://react-bootstrap.github.io/components/modal/