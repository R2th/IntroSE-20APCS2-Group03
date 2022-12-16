# Intro
Khi tạo một project mới sử dụng yarn hay npm thì project mới sinh ra sẽ có một file App.test.js 

```javascript
yarn create react-app testing
```

Sau khi run lệnh trên thì create-react-app sẽ sinh ra :
* React : React lib
* Webpack: để kết nối js các file js lại với nhau
* Babel: Dùng để chuyển ES2015, ES2016, ES2017 và JSX code thành ES5 code
* Jest: Automated test runner : Nó có nhiệm vụ chạy tất cả các test file trong project và in ra màn hình kết quả test trên terminal sau khi bạn chạy câu lệnh `yarn test` hay `npm run test`


Trong đó có file App.test.js với nội dung như sau 

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
  
```

Sử dụng câu lệnh sau để chạy test 
```
yarn test
```
Trên màn hình terminal sẽ hiện thị kết quả test

![](https://images.viblo.asia/62dade7f-32f7-4d87-be29-5eba73a4e7c9.png)


Quá trình test có thể được hiểu như sau:

![](https://images.viblo.asia/126c027c-1dcf-4b95-971e-a0a47cdae2ba.png)

Để cho tiện quản lý thì ta có thể  tạo ra một thư mục test riêng trong folder `src/components/__test__`

Cấu trúc của test như sau:
```javascript
It ('Chuỗi mô tả của test', hàm logic test)
```

Như trong App.test.js ta có đoạn test 

```javascript
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```
Nếu như bạn đã từng viết code rspecs thì nó cũng có điểm khá tương đồng, chỉ thay `do end` bằng function của js
rspecs code 
```javascript
it 'has 200 status code if logged in' do
  expect(response).to respond_with 200
end
```

# enzyme 
Enzym là một thư công cụ test js cho react, Nó có nhiều phương thức cho việc hỗ trợ rendering component, tìm các element hay tương tác với các element

Cả Jest và Enzyme đều được thiết kế cho việc test ứng dụng react, Jest có thể được sử dụng với các dụng JS khác nhưng Enzyme thì chỉ được dùng cho React

Jest có thể render các components mà không cần đến Enzyme, Enzyme chỉ đơn giản là có thêm các phương thức support cho việc test trở nên dễ dàng hơn

Enzym bắt buộc phải được dùng với một test runner trong bài viết này là Jest

### Cài đặt enzym với react 16

```
yarn add enzyme enzym-adapter-react16
```

Tiếp đến là tạo file setupTests.js

```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

Khi chạy test thì file setupTests.js này sẽ được tìm và chạy trước đầu tiên trước mọi đoạn code test nào khác trong ứng dụng 

Chỉ cần cấu hình như trên là ta có thể dùng Enzyme ở bất cứ đâu trong project

**Enzyme có 3 phương thức được dùng để tạo các instance :**

![](https://images.viblo.asia/a9c2bb6c-fb43-4779-ab20-46b957343593.png)


## Shallow

Giả sử ta sử dụng shallow trong ví dụ sau: Ta có một CommentBox bên trong App và khi test expection chỉ cần test là CommentBox có tồn tại bên trong component App mà không cần quan tâm bên trong CommentBox bên trong có gì 

```javascript
import React from 'react';
import { shallow } from 'enzyme';

import CommentBox from '../CommentBox';
import App from '../App';

it('show a comment box', () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('show a comment list', () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(CommentList).length).toEqual(1);
});
```

### DRY code 
Enzyme cũng support beforeEach hay afterEach giống như rspecs , đoạn code bên trong beforeEach sẽ được thực thi trước mỗi hàm test

Như ở ví dụ phía trên ta phải khai báo 2 lần ` const wrapped = shallow(<App />);` thì có thể viết gọn lại như sau với beforeEach 

```javascript
let wrapped;
beforeEach(() => {
  wrapped = shallow(<App />);
});

it('show a comment box', () => {
  expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('show a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
});

```

## Full Dom

Full redering được dùng trong trường hợp khi mà component tương tác với DOM api hay cần test các component được wrapped bởi HOCs component 

**Chú ý**: Full rendering mount component ở trong DOM nên có thể các test khác nhau sẽ bị ảnh hưởng lẫn nhau do sử dụng chung DOM, do đó sau mỗi test nên sử dụng unmount để clean up không làm ảnh hưởng tới các test khác

Ví dụ 
```javascript
import React from 'react';
import { mount, unmount } from 'enzyme';
import Root from '../../Root';

import CommentBox from '../CommentBox';

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('Has a text area and button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
 });

```

Để chi tiết hơn bạn có thể tham khảo trong repo của Enzym cũng như Enzyme docs api để biết thêm về assertion và các helper khác nữa 

https://airbnb.io/enzyme/docs/api/

https://github.com/airbnb/enzyme

# Nguồn tham khảo 
https://jestjs.io/

https://airbnb.io/enzyme/docs/api/

https://github.com/airbnb/enzyme