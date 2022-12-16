Bài viết được dịch từ nguồn: https://hackernoon.com/how-to-pack-javascript-code-with-webpack-hn4y3y1g

## What is Webpack?

`Webpack` là một `module packed` cho `JavaScript` cũng như các ứng dụng HTML. Nó lấy các phần `module` của mã được sắp xếp trong các thư mục. Tiếp theo là biến chúng thành một hình thức biên dịch. Sau đó, nó được đọc toàn bộ bởi `App`. Bạn phải suy nghĩ, "Tại sao phải bỏ cách code cũ?" Khi code của bạn quy mô, sự phức tạp của nó cũng vậy. Tìm một mối tương quan trở thành một thách thức.

![](https://images.viblo.asia/9a066175-c802-4d1a-ad2f-50bace14d556.png)

Do đó Webpack được hình thành để cung cấp các lợi ích sau:

- Tách các mối quan tâm - mã có thể được phân chia theo chức năng (nghĩa là logic, DOM).
- Việc tách các tệp JS cho phép tải các tệp riêng biệt thay vì toàn bộ trên lần truy cập trang đầu tiên.
- Dịch chuyển Babel sang ES5 mẫu ES6 mà không phải lo lắng về việc hỗ trợ các trình duyệt cũ hơn.
- Chạy lại `packed` khi nó phát hiện các thay đổi đã lưu. Xử lý thay thế `module` và / hoặc thay đổi.

Điều đó nói rằng, tìm ra những gì có thể gây khó khăn cho người mới bắt đầu. Bắt đầu với Webpack giống như một ngày di chuyển. Đặc biệt là quyết định để phân loại, đóng gói và theo thứ tự để giải nén. 
Để cho dễ hiểu có thể hình dung là các đĩa và bát phải được đóng gói trong một hộp có bọt như những vật dễ vỡ và được đặt trên đống trên cùng để tránh vỡ. Trong khi đó sách và tạp chí có thể chất đống từ dưới lên trong hộp vì nó có thể nặng nhất. Nguyên tắc chung là không trộn lẫn các loại mặt hàng khác nhau vào một hộp. Nếu không, bạn sẽ gặp khó khăn trong việc theo dõi nơi ở của những thứ cụ thể. 

![](https://images.viblo.asia/4a3a3265-4a04-4332-a646-139a86c3d595.jpeg)

Bài viết này giả định rằng người đọc có kiến thức trước về thiết lập Webpack. Và phục vụ như một hướng dẫn để tách các tệp JS.

Tùy thuộc vào ứng dụng JS của bạn, bạn có thể phân chia các tệp của mình theo chức năng. Trong trường hợp của tôi, ứng dụng To-Do-List của tôi được chia thành nhiều cách bên dưới;

- Event listener - Nhấp vào nút gửi đầu vào của người dùng đến phụ trợ
- User input - Dữ liệu nhận được từ người dùng
- Control  - DOM logic ứng dụng - Đầu ra HTML
- Starter - Mục nhập mặc định
- Constructor - Dành cho các đối tượng mới
- Local Storage - Lưu trữ mới và chỉnh sửa các mục

Hình ảnh dưới đây minh họa tệp JS phân chia. Nó giúp loại bỏ sự nhầm lẫn và cố gắng diễn giải mã hoặc đi theo dấu vết.

![](https://images.viblo.asia/57d239d7-7a30-4d16-a0cc-639bf9ef8027.jpeg)

Lưu đồ dưới đây minh họa luồng cuộc gọi của các chức năng;

![](https://images.viblo.asia/6275be86-2e1d-4afc-9d26-d2a2c7ebd05f.png)

Ở trên bạn sẽ thấy mô hình từ chức năng bắt đầu đến chức năng cuối cùng vì nó cũng tương tự đối với các tệp được phân chia. Sau khi tách tệp, tiếp theo là xuất và nhập chúng dưới dạng các `module`. Sự phân chia bắt đầu từ cuối đến đầu.

Đối với chức năng trong thư mục cuối cùng, hãy sử dụng phương thức xuất và nhập mặc định như dưới đây;

```
./src/DOM/TaskDOM.js

export default function renderTaskCard() {
.
.
}
```

```
.src/control/taskControl.js 

import renderTaskCard from '../DOM/taskDOM';
.
.
```

Việc sử dụng chức năng `export` `ES5` được `Eslint` cho phép. Trong khi `export default renderTaskCard() { ....` của ES6 hiển thị dưới dạng var được xác định do `renderTaskCard ()` không được gán cho một biến.

Hình ảnh dưới đây minh họa việc `export` và `import` một số chức năng;

```
.src/DOM/taskDOM.js

export const renderTaskCard = () => {
.
.
}

export const closeTaskForm = () => {
.
.
}
```

```
import { renderTaskCard, closeTaskForm } from '../DOM/taskDOM';

.
.
```

Tên của hàm được đặt trong dấu ngoặc nhọn như khai báo nhập hàm. Nhưng làm thế nào để chúng ta biết những gì cần `import, export` ? Dễ dàng, xác định các chức năng đang được gọi.

```
.src/control/taskControl.js

import { renderTaskCard, closeTaskForm } from '../DOM/taskDOM';


export const addTaskToProject = (..) => {
  .
  .
  .
    renderTaskCard(..);
    closeTaskForm();
  }
};
```

Sau đó, xuất các hàm trong tệp người nhận bên dưới;

```
./src/DOM/taskDOM

export const renderTaskCard = () => {
.
.
}

export const closeTaskForm = () => {
.
.
}
```

Hoạt động `import` và `export` này được gọi tại `index.js`.

Tóm tắt:
- Tách tập tin theo chức năng hoặc loại chức năng.
- Khi các hàm được `import` hàm mục tiêu phải được khai báo.
- Tiếp theo là `export` các hàm mục tiêu cho liên kết và gói tệp.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.