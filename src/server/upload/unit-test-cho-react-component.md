Nhân dịp mình được tham gia vào dự án React. Ngoài công việc chính vẫn làn fix bug thì mình được thêm nhiệm vụ nhẹ nhàng hơn là viết test cho React. Trước, mình có đọc phần test cho Laravel nên thôi cứ mạnh mẽ đọc thêm tài liệu viết cho React vậy. Cùng với viết test thì cũng rảnh rảnh sửa Eslint. Đáng ra viết test để hạn chế lỗi thì trong những phút yếu lòng mình lại tạo thêm rất nhiều bug cho dự án. Nói thế cho có tí liên quan câu chuyện hôm nay viết thôi. Nội dung thì mình sẽ giới thiệu 2 thư viện viết test cho React là Jest và Enzyme. Hai cái này thì ở phần [Testing](https://reactjs.org/community/testing.html) của doc có nói đến. Thực ra là còn nói đến mấy cái nữa nhưng dự án mình có sẵn một số file đã dùng Jest với Enzyme rồi nên cứ thế ta đi xem 2 cái đấy thế nào nhé :smiley:.

Jest là một testing framework với mục đích là để kiểm thử javascript cũng như React. Cùng với Enzyme kết hợp nên một cặp đôi hoàn hảo để kiểm thử ứng dụng React của bạn một cách dễ dàng.
# Jest
Bài viết đang là viết test cho React nên bạn nhớ có cho mình 1 ứng dụng React nhé :frowning_face:. Trong những ví dụ sau đây thì mình sử dụng cho một ứng dụng React được cài đặt bằng `react-create-app`.

Cài đặt Jest mình dùng npm:
```sh
npm install --save-dev jest
```
Nếu có lỗi gì dạng như bạn không có quyền ... blahblah thì bạn thêm sudo vào nhé. Như máy của mình toàn bị thế :smirk:.

Để kiểm tra nhẹ nhàng thì mình lấy ngay ví dụ trong [doc](https://jestjs.io/docs/en/getting-started) của Jest là hàm sum để thử.
```js
// src/function.js
export const sum = (a, b) => {
    return a + b;
}
```
Quy định viết test thì các file dùng để kiểm thử đều đặt trong thư mục `__test__` với cấu trúc các file test sẽ tương ứng với các file trong thư mục `src`. Tên file test tương ứng với file gốc với phần mở rộng là `.test.js` hoặc `.spec.js`.
```js
// src/__test__/function.test.js
import {sum} from '../function'

describe('Test function', () => {
    it('Sum', () => {
        expect(sum(1, 2)).toBe(3);
    })
})
```
Chạy test:
```sh
npm test
```
Kết quả sẽ như sau:
![](https://images.viblo.asia/d6c921df-1f3e-4c26-bc92-952ed091f22b.png)

Bạn có thể thấy kết quả là **passed**.

Nếu thử thay đổi ở hàm test  chút xem kết quả ra sao nhé:
```js
// src/__test__/function.test.js
import {sum} from '../function'

describe('Test function', () => {
    it('Sum', () => {
        expect(sum(1, 1)).toBe(1);
    })
})
```
Kết quả:
![](https://images.viblo.asia/e931687e-1caa-4053-8ed9-f39e073be5ad.png)

Tất nhiên là `1 + 1 = 2` chứ không thể là 1 được rồi.
## Snapshot testing
Một trường hợp mà mình luôn viết test cho mỗi component là snapshot testing.  Nó là một công cụ hữu ích để bạn có thể kiểm tra xem có sự thay đổi bất ngờ nào ở UI của component. Việc này nghĩa là ở lần chạy test đầu tiên thì nội dung hiển thị của component sẽ được xuất ra một tập tin. Ở những lần chạy test sau, nó sẽ kiểm tra xem nội dung thời điểm kiểm thử có trùng với nội dung cũ đã được lưu không. Nếu 2 cái khác nhau thì fail thôi. Đồng nghĩa rằng, UI của component đã bị thay đổi khi nào mà bạn không hay.

Thử với component Link sau:
```js
// src/components/Link.js
import React from 'react';
import PropTypes from 'prop-types'

class Link extends React.Component {
    handleClick = () => {
        alert('clicked!');
    };

    render() {
        const {title, url} = this.props;
        return <a href={url} onClick={this.handleClick}>{title}</a>;
    }
}

Link.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string
};

Link.defaultProps = {
    title: '',
    url: ''
};

export default Link;
```
```js
// src/__test__/components/Link.test.js
import renderer from 'react-test-renderer';
import React from 'react';
import Link from '../../components/Link';

const props = {
    title: 'Default title',
    url: '/link/to/test'
};

describe('Components > Link', () => {
    it('Render a snapshot for Link use renderer', () => {
        const tree = renderer.create(<Link {...props} />).toJSON();
        
        expect(tree).toMatchSnapshot();
    })
})
```
Sau khi chạy Jest thì sẽ có 1 thư mục `src/__test__/components/__snapshots__` được tạo ra chứa tập tin ghi lại nội dung của component Link.
```json
// src/__test__/components/__snapshots__/Link.test.js.snap
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Components > Link Render a snapshot for Link use renderer 1`] = `
<a
  href="/link/to/test"
  onClick={[Function]}
>
  Default title
</a>
`;
```
## Matchers
Như ở ví dụ đầu tiên là hàm `sum`, mình có dùng `toBe`. Nó là một trong những matchers của Jest. Jest sử dụng "matchers" để bạn có thể kiểm tra các giá trị bằng nhiều cách khác nhau.
* `toBe` là cách đơn giản nhất để kiểm tra giá trị 2 vế có bằng nhau hay không.
* Phân biệt `undefined`, `null`, `false` ta có thể sử dụng `toBeNull`, `toBeUndefined`, `toBeDefined`, `toBeTruthy`, `toBeFalsy`.
* Để so sánh với số ta có `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBeLessThan`, `toBeLessThanOrEqual`. Đặc biệt với trường hợp số thực, bạn nên dùng `toBeCloseTo`.
* Đối với chuỗi thì ta có `toBeMatch`.
* Kiểm thử với mảng dùng `toContain`.
* Với exception ta có `toThrow`.

Trong [đây](https://jestjs.io/docs/en/using-matchers) có các ví dụ chi tiết về những "matcher" nêu ở trên.
# Enzyme
> Enzyme là một tiện ích dùng trong kiểm thử Javascript cho React.
> 

## Cài đặt và cấu hình
Để sử dụng Enzyme với React 16, bạn cần cài đặt như sau:
```sh
npm i --save-dev enzyme enzyme-adapter-react-16
```
Trong thư mục `src` tạo một tập tin tên `setupTests.js` với nội dung sau:
```js
// src/setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```
Với các phiên bản React khác, bạn có thể theo dõi ở [trang chủ](https://airbnb.io/enzyme/docs/installation/) của Enzyme để thực hiện cài đặt và cấu hình.
## Snapshot testing
Như ở trên dùng renderer thì ở đây dùng Enzyme để tạo snapshot cho component. Cách làm cũng tương đối giống nhau. Ở đây mình cài đặt thêm 1 package nữa để tạo snapshot ngắn gọn và dễ hiểu hơn.
```sh
npm i --save-dev enzyme-to-json
```
Với đoạn sau:
```js
// src/__test__/components/Link.test.js
import ...
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
...
describe('Components > Link', () => {
    // Snapshot use renderer
   ...
   
    it('Render a snapshot for Link use enzyme', () => {
        const tree = shallow(<Link {...props} />);
        
        expect(shallowToJson(tree)).toMatchSnapshot();
    })
})
```
Kết quả snapshot tương tự như ở ví dụ trên. Bạn có thể thử bỏ không dùng `shallowToJson` và tự cảm nhận kết quả nhé.
## Shallow Rendering & Full DOM Rendering
* **[Shallow Rendering](https://airbnb.io/enzyme/docs/api/shallow.html)** dùng trong trường hợp muốn kiểm thử component dưới dạng unit, và chắc chắn rằng các kiểm thử của bạn không gây ảnh hưởng đến các hành vi của các component con. `shallow` không gọi đến các phương thức liên quan đến lifecycle của React component.
* **[Full DOM Rendering](https://airbnb.io/enzyme/docs/api/mount.html)** sử dụng khi component có sự tương tác với DOM APIs hoặc kiểm thử các component được tạo nên bởi HOC component.

Để có thể hình dung rõ hơn về 2 loại render này thì vẫn với ví dụ component Link ở trên. Ta thay vì sử dụng `shallow` mà dùng `mount` sẽ được kết quả như sau:
```json
exports[`Components > Link Render a snapshot for Link use enzyme 1`] = `
<Link
  title="Default title"
  url="/link/to/test"
>
  <a
    href="/link/to/test"
    onClick={[Function]}
  >
    Default title
  </a>
</Link>
`;
```
Như vậy, ta thấy ở lần render này thì chính bản thân component Link cùng với các prop của nó cũng được render. Về các API của từng loại thì tương đối giống nhau. Bạn có thể vào doc của từng loại để xem rõ hơn.
## Một số trường hợp bản thân thường kiểm thử
### Kiểm tra selector
```js
it('Render "a" tag', () => {
    const tree = shallow(<Link {...props} />);
        
    expect(tree.find('a')).toHaveLength(1);
})
```
### Render với component con
```js
// src/components/Hello.js
import React from 'react';
import Link from './Link';

const props = {
    title: 'Default title',
    url: '/link/to/test'
};

export default class Hello extends React.Component {
    render() {
        return(
            <div>
                <h1>
                    Hello
                </h1>
                <Link {...props} />
            </div>
        );
    }
};
```
```js
// src/__test__/components/Hello.test.js
import React from 'react';
import Hello from '../../components/Hello';
import {shallowToJson} from 'enzyme-to-json';
import {shallow} from 'enzyme';

it('Render Hello component', () => {
    const wrapper = shallow(<Hello />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});
```
Kết quả snapshot:
```json
// src/__test__/components/__snapshots__/Hello.test.js.snap
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Render Hello component 1`] = `
<div>
  <h1>
    Hello
  </h1>
  <Link
    title="Default title"
    url="/link/to/test"
  />
</div>
`;
```
### Kiểm tra với prop
Mình sẽ sửa lại một chút ở component Link:
```js
// src/components/Link.js
....
const {url} = this.props;
const title = this.props.title ? this.props.title : 'This is default titile if not have title pass to prop';
....
```
Còn đây là test:
```js
it('not pass "title" prop to component', () => {
    const wrapper = shallow(<Link url={'/link/to/test'} />);
    expect(wrapper.find('a').text()).toEqual('This is default titile if not have title pass to prop');
})

it('pass "title" prop to component', () => {
    const title = 'Title is passed to component';
    const wrapper = shallow(<Link url={'/link/to/test'} title={title}/>);
    expect(wrapper.find('a').text()).toEqual(title);
})
```
### Mô phỏng sự kiện
```js
it('Simulate click event', () => {
    window.alert = jest.fn();
    const wrapper = shallow(<Link {...props} />);

    wrapper.find('a').simulate('click');
    expect(window.alert).toHaveBeenCalledWith('clicked!');
})
```
# Kết luận
Bài viết là một số nội dung cơ bản về kiểm thử cho component của React. Trên đây cũng là một số trường hợp mà mình hay thực hiện kiểm thử nhất đối với một component. Về sâu hơn còn có kiểm thử với Redux. Phần này mình cũng đang tìm hiểu để thực hiện. Bài viết có thể có gì sai soi mong bạn đọc bỏ qua.
# Tham khảo
* https://jestjs.io/
* https://airbnb.io/enzyme/