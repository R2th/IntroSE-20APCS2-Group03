# `Unit test with React: Dom events`
Trong bài viết lần này, mình sẽ tiến hành viết unit test cho các feature cho một component điển hình là Modal. Đây là một trong những component hết sức phổ biến mà hầu như dự án nào cũng sẽ có và cần. Điểm trở ngại với các bạn viết unit test là không biết viết bắt đầu từ đâu và nên viết những gì thì đủ.
![](https://images.viblo.asia/de94b619-1d99-45e4-8cf8-710bed50d062.jpeg)
Đầu tiên mình sẽ giới thiệu qua spec yêu cầu của một modal:
Modal cần được render đầy đủ, có một overlay để che ngăn cản thao tác với phía đằng sau modal
Modal có các event đóng, mở. Hỗ trợ việc dùng ESC để tắt modal
Một modal thì không nên chịu trách nhiệm việc ẩn/hiện của chính mình. Việc này sẽ không làm modal trở thành một stateful component, và vì thế component trở nên nhẹ hơn và cũng đơn giản hơn cho việc viết unit test.
Tuy nhiên việc thực hiện các event trigger thì nên viết trong Modal component để tránh việc lặp lại các function này
## Should modal render successful
Một modal thì thường có cấu trúc 2 phần, Phần overlay bao ngoài và phần content bên trong
```js
import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

it('should renders Modal component given the props', () => {
    const closeFn = jest.fn();
    const container = shallow(
        <Modal closeFn={closeFn}>
            Hello world
        </Modal>
    );
    const overlay = container.find('.modal-overlay');
    expect(overlay).toHaveLength(1);
    const modal = overlay.find('.modal');
    expect(overlay).toHaveLength(1);
    expect(modal.text()).toEqual('Hello World');
});
```
Phần test sẽ kiểm tra rằng liệu container sau khi modal render thì có overlay hay không qua hàm `find` và `toHaveLength(1)`. Sau khi kiểm tra đã có overlay thì kiểm tra tiếp content bên trong đã đúng chưa.
Ở phần này mình không cần phải kiểm tra các trường hợp như liệu modal có nhận được 2 props là closeFn hay children hay không. Đây đều là những feature mà React cung cấp, nên ngoài phạm vi mà ta cần test. Hơn nữa những tính năng này đã được React viết unit test cho rồi, nên việc mình viết lại là không cần thiết.
Một modal thì thường có những đặc điểm như màu sắc, hình dáng, kích thước style của chúng. Việc unit test thì không nên quá quan tâm đến những spec chi tiết này. Hơn nưa một unit test quá chi tiết vào spec thì việc unit test cần cập nhật liên tục do chỉ cần một thay đổi nhỏ như tên class cũng dẫn đến unit test toàn bộ fail.

## Should component close when trigger event
Modal cần được close khi user ấn ESC hay click vào overlay bên ngoài. Như vậy mình cần có 2 unittest tại đây
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

it('should closes the Modal when ESC key is pressed', () => {
    const closeFn = jest.fn();
    const root = document.createElement('div');
    ReactDOM.render(
        <Modal closeFn={closeFn}>
            Hello World
        </Modal>,
        root
    );
    const evt = new KeyboardEvent('keydown', { keyCode: 27 });    // 27 == Escape Key
    document.dispatchEvent(evt);
    expect(closeFn).toHaveBeenCalledTimes(1);
});

it('should closes modal if document is clicked', () => {
    const closeFn = jest.fn();
    const root = document.createElement('div');
    ReactDOM.render(
        <Modal closeFn={closeFn}>
            Hello World
        </Modal>,
        root
    );
    const evt = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(evt);
    expect(closeFn).toHaveBeenCalledTimes(1);
});
```
Tại đây mình thấy có một case phát sinh cũng rất cần unit test. Khi user click vào overlay thì sẽ đóng modal. Nhưng liệu click vào content, thuộc vào child của overlay nhưng sẽ không được phép đóng. Đây cũng là lý do mình sử dụng `bubbles` tại đây
```js
it('should keep modal if content of modal is clicked', () => {
    const closeFn = jest.fn();
    const root = document.createElement('div');
    ReactDOM.render(
        <Modal closeFn={closeFn}>
            Hello World
        </Modal>,
        root
    );
    const modal = document.body.querySelector('.modal');
    const evt = new MouseEvent('click', { bubbles: true });
    modal.dispatchEvent(evt);
    expect(closeFn).toHaveBeenCalledTimes(0);
});
```

Như vậy các phần unit test cần cho một modal đã xong. Tại đây mình thấy các unit test đang có phần bị lặp lại. Do vậy refactor tại đây là điều cần thiết. Ta sẽ group các unit test liên quan lại với nhau
```js
describe('close modals on certain actions', () => {
    const element = document.createElement('div');
    const closeFn = jest.fn();
   
    beforeEach(() => {
        ReactDOM.render(
            <Modal closeFn={closeFn}>Hello World</Modal>
        , element);
    });
    
    afterEach(() => {
       ReactDOM.unmountComponentAtNode(element);
       closeFn.mockReset();
    });
   
    it('should closes the Modal when ESC key is pressed', () => {
       ...
    });
    it('should closes modal if document is clicked', () => {
       ...
    });
    it('should keep modal if content of modal is clicked', () => {
       ...
    });
});
```
## Conclusion
Qua một số ví dụ unit test đơn giản, chắc hẳn các bạn cũng hình dung được phần nào một test thì cần có những gì. Trong phần tới, mình sẽ tiếp tục thực hiện với những unit phức tạp và yêu cầu nhiều spec khó hơn. Cám ơn các bạn đã theo dõi.

## `References`
1. https://medium.com/front-end-weekly/tested-react-build-and-test-modal-using-react-features-and-dom-events-39b7246a3a6f
1. https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent