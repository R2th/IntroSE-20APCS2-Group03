Chào các bạn, đến hẹn lại lên, hôm nay mình xin phép chia sẻ 1 chút về unit test :v 1 trong những thứ mình đã né tránh bao năm qua nhưng không thoát

## React Unit Test Tools
Unit Test của React Component có một chút khác biệt, thay vì xác minh đầu ra của các functions, Unit Test của React yêu cầu 4 mục đích kiểm tra đặt biệt:

* Testing basic component rendering.
* Testing props.
* Testing events.
* Testing event handlers.

Có hai tùy chọn công cụ phổ biến nhất là Jest và Enzyme.

### jest
Jest là một trình chạy thử nghiệm JavaScript được duy trì bởi Facebook. Bao gồm performance, mocking, snapshot, code coverage, sandbox.

-----

Khi sử dụng Jest để kiểm tra ứng dụng React hoặc React Native, bạn có thể viết một bài kiểm tra snapshot sẽ lưu kết quả đầu ra của một thành phần được kết xuất vào tập tin và so sánh đầu ra của thành phần với snapshot trong các lần chạy tiếp theo. Điều này rất hữu ích trong việc biết khi nào thành phần của bạn thay đổi hành vi của nó.

-----
Xem thêm về jest tại : [đây](https://jestjs.io/docs/en/getting-started)

### Enzyme
Enzyme là một thư viện bao bọc các gói như React TestUtils, JSDOM và CheerIO để tạo ra một giao diện đơn giản hơn để viết Unit Test.

-----
Xem thêm về enzyme tại : [đây](https://airbnb.io/enzyme/docs/api/)

## Should know
### 1. Xác minh giá trị của state/proprs trong một component
```js
const wrapper = shallow(<ComponentName />);

expect(wrapper.state().data).toBe('something');
expect(wrapper.props().data).toBe('something');
```
### 2. Xác minh giá trị của thẻ trong một component
```js
const wrapper = shallow(<ComponentName />);

expect(wrapper.find('h4').length).toBe(1);
expect(wrapper.find('h4').at(0).text()).toBe('Something');
```
### 3. Mô phỏng sự kiện nhấn nút
```js
const wrapper = shallow(<ComponentName />);

expect(wrapper.state().data).toBe('state1');
wrapper.find('button').simulate('click');
expect(wrapper.state().data).toBe('state2');

-----

## Trick
### Xác nhận style
wrapper.find('.myClassname').get(0).style;
expect(containerStyle).to.have.property('opacity', '1');
### Xác nhận class name
const span = mount(<Test />).find('span');
expect(span.html().match(/style="([^"]*)"/i)[1]).toBe('color: #000;');
## Remark
### Shallow Rendering
Kiểm tra một component như một unit.
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent />);
```
### Full Rendering
Các component có thể tương tác với API DOM hoặc có thể yêu cầu đầy đủ lifecycle để kiểm tra đầy đủ component.
```js
import { mount } from 'enzyme';

const wrapper = mount(<MyComponent />);
```
### Static Rendering
Nó được sử dụng để render components với HTML tĩnh và phân tích kết quả cấu trúc HTML.
```js
import { render } from 'enzyme';

const wrapper = render(<MyComponent />);
```
## Example
### Install
```
$ git clone https://github.com/wahengchang/react-test-must-know

$ npm install
```
### Run Tests
```
$ npm test

> jest
PASS  src/__tests__/simpleFoo-test.js
PASS  src/__tests__/Foo-test.js
Test Summary
› Ran all tests.
› 7 tests passed (7 total in 2 test suites, run time 1.37s)

-----
-----
```

Nguồn tham khảo: https://hackernoon.com/react-unit-test-example-tutorial-jest-enzyme-jsdom-mocha-chai-state-props-component-7ec850a98566