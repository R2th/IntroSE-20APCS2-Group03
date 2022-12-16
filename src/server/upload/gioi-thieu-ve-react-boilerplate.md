# Tổng quan
Chắc hẳn React không còn quá xa lạ đối với nhiều người, một thư viện tạo và quản lý phần view cho người dùng một cách rất dễ dàng. Tuy nhiên, không giống như các framework khác, React có bố cục và các module của nodeJS rất phong phú, chính điều này làm cho việc quản lý cấu trúc, kĩ thuật của dự án trở nên khó khăn.
Để giải quyết vấn đề đó, boilerplate ra đời. Bản chất là một template với phần core là react kết hợp với redux (giống như framework). Chúng có sẵn các module, CLI, structure rõ ràng, hỗ trợ tối đa lập trình viên. Từ đó giúp chúng ta quản lý các module, code ... một cách dễ dàng, khoa học và đặc biệt là rất dễ để maintain.

# Tính năng, đặc điểm
## Phi chức năng
### CLI hỗ trợ tạo kiến trúc thư mục
- Việc tạo component, container routers, selectors ... trong dự án không còn phải hardcode nữa mà có command cli để khởi tạo kiến trúc.
### Hiệu năng.
- React-boilerplate được config và sử dụng các thư viện giúp cho việc compiler và chạy trên production tốt hơn.
### debug dễ dàng.
- Luồng dữ liệu được boilerplate quản lý và ghi log giúp cho lập trình viên kiểm soát các trạng thái của ứng dụng một cách dễ dàng.
### Sử dụng JS mới
- ES6 được sử dụng tối đa trong dự án.
### Style component
- react boilerplate sử dụng styled component tối ưu hiệu năng tải css trong html, dễ dàng maintain và quản lý.
## Một số module chính
### Redux
- redux là một thư viện khá nổi tiếng trong việc quản lý state tập trung trong react (store)
### ImmutableJS
- Đúng với tên gọi, đây là thư viện "đóng băng" object, array trong JS. Người dùng không thể lấy giá trị hay gán giá trị phần tử trong object, array đã bị immutable. Điều này giúp cho dữ liệu ứng dụng của bạn được kiểm soát tốt hơn.
```
import { fromJS } from 'immutable';

const initialState = fromJS({
  myData: {
  	message: 'Hello World!'
  },
});
```
### reselect
- reselect là một thư viện giúp cho việc lấy dữ liệu trở nên dễ dàng hơn. boilerplate sẽ lưu cache state và select state cho component rất nhanh.
```
import { createSelector } from 'reselect';
import mySelector from 'mySelector';

const myComplexSelector = createSelector(
  mySelector,
  (myState) => myState.get('someNestedState')
);

export {
  myComplexSelector,
};
```
### redux-saga
- redux saga là một thư viện middleware trong react. (nằm giữa dispatch action và thay đổi state). Nhằm xử lý bất đồng bộ của việc lưu state trong react.
- thường chúng ta sẽ xử dụng cho việc Fetch API để lấy dữ liệu về.
```
import { takeLatest, call, put, select } from 'redux-saga/effects';

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all` 
  yield [
    takeLatest(LOAD_REPOS, getRepos),
    takeLatest(LOAD_USERS, getUsers),
  ];
}
```
### I18n 
- react sử dụng thư viện react-intl cho việc thay đổi ngôn ngữ của ứng dụng, boilerplate đã config sẵn, bạn chỉ cần việc sử dụng theo CLI và hướng dẫn đã có trên document.
```
import { defineMessages } from 'react-intl';

export default defineMessages({
  licenseMessage: {
    id: 'boilerplate.components.Footer.license.message',
    defaultMessage: 'This project is licensed under the MIT license.',
  },
  authorMessage: {
    id: 'boilerplate.components.Footer.author.message',
    defaultMessage: `
      Made with love by {author}.
    `,
  },
});
```
### router
- react boilerplate sử dụng react-router làm thư viện quản lý history trong html5.
```
import { Switch, Route } from 'react-router-dom';

class AboutPage extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/about/our-team" />
      </Switch>
    );
  }
}
```
# Tổng kết
React boilerplate là một "Framework" react tuyệt vời để có thể xây dựng một dự án nhanh, hiệu năng tốt và maintain dễ dàng.
# Nguồn
https://github.com/react-boilerplate/react-boilerplate