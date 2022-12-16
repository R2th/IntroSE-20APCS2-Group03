# 1.Tạo một Custom Modal Hook

Hook trong React là một chức năng chia sẻ logic chung giữa nhiều component.
Bắt đầu bằng cách tạo một tệp mới có tên useModal.js

**useModal.js**
```
import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;
```

Cần làm một vài điều trong Custom Hook ở trên:

* Khởi tạo mới "isShowing" và "setIsShowing" là các giá trị để lưu trạng thái xem hiện tại của modal.
* Khai báo một hàm toggle thay đổi giá trị của "isShowing" trái ngược với những gì hiện tại
* Trả về giá trị của "isShowing" và "toggle function" từ Hook, vì vậy component có quyền truy cập vào chúng.

# 2.Tạo Modal Component

Sau khi có Custom Hook, tiếp theo tạo Modal Component. Tạo 1 file Model.js

**Modal.js**
```
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Hello, I'm a modal.
        </p>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;
```

Modal là một "stateless functional component" có hai "props" và chỉ trả về HTML khi "isShowing" là đúng.

Tuy nhiên, hãy xem code của các phần tử con Modal, đặc biệt là phần cuối của dòng đầu tiên.

```
const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    ...
  </React.Fragment>, document.body
) : null;
```

Ở đây có một khái niệm là "Portal".

* Portal cho phép các component React hiển thị trong một phần khác của DOM nằm ngoài thành phần chính của chúng.
* Do đó, Portal sử dụng để gắn component Modal vào document.body element, chứ không phải là con của một component khác.
* Để làm điều này trong code trên, hai đối số được chỉ định cho createProtal( ) là: component muốn render và vị trí của nơi muốn nối thêm component đó.

# 3.Sử dụng Modal Component

Tạo một file App.js

**App.js**
```
import React from 'react';
import './App.css';
import Modal from "./Modal";
import useModal from './useModal';

const App = () => {
  const {isShowing, toggle} = useModal();
  return (
    <div className="App">
      <button className="button-default" onClick={toggle}>Show Modal</button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
    </div>
  );
};

export default App;
```

Nhập Custom Hook bên trong component, khởi tạo "isShowing" và "toggle" từ Hook.

```
const {isShowing, toggle} = useModal();
```

Tiếp theo, chuyển "toggle" vào nút onClick để đặt giá trị của "isShowing" thành TRUE khi nhấp vào.

```
<button className="button-default" onClick={toggle}>Show Modal</button>
```

Kết quả thu được:

![](https://images.viblo.asia/037d90f1-56ff-45ea-a5a1-cadd7de6f42e.gif)

**Cảm ơn các bạn đã theo dõi đến đây. Xin chào và hẹn gặp lại !!**

link tham khảo: https://upmostly.com/tutorials/modal-components-react-custom-hooks