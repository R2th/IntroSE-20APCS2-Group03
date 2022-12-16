![](https://images.viblo.asia/9ec13682-c164-4d47-8fa1-c246dca76021.png)

Từ khi chuyển từ code các ứng dụng mobile bằng native sang React Native thì viết test là việc cuối cùng mà tôi nghĩ đến trong quá trình phát triển ứng dụng. Ưu tiên số một của chúng tôi là làm lại ứng dụng bằng React Native từ con số 0 nhanh nhất có thể. Sau khi release, có rất nhiều tính năng cần phải triển khai test, và tất nhiên, chúng tôi cần phải viết test... cho hàng nghìn dòng code trước đó. Chúng tôi biết việc viết test là good practice, nhưng để có động lực để viết chúng là một điều hoàn toàn khác.

Rất may là khi chúng tôi bắt đầu viết test, chúng tôi viết bằng Jest và nhận ra việc viết test này khá dễ dàng. Mục tiêu của tôi hôm nay là hướng dẫn bạn viết test bằng Jest một cách dễ dàng hơn nữa bằng cách giải thích những thứ mà tôi đã học được khi làm việc với nó.

# I. Thêm Jest vào project:
*Ở các phiên bản RN 0.38 trở lên, Jest đã được tích hợp sẵn khi bạn tạo project bằng `react-native init`, vì thế việc setup này đối với bạn có thể đã có sẵn và ko cần setup thêm nữa. Nếu muốn tìm hiểu thêm bạn có thể vào đây để xem: setting up testing with React Native.*
## 1. Install packages:
Cài đặt 3 thư viện: `jest`, `babel-jest` và `react-native-renderer`. 

## 2. Hoàn tất để chúng ta có thể bắt đầu test:
```javascript
// Thêm vào package.json
"scripts": {
 "test": "jest"
},
"jest": {
 "preset": "react-native"
}
// Thêm vào .babelrc
{
 "presets": ["react-native"]
}

```

Bây giờ chúng ta chỉ cần chạy lệnh `npm test` ở command line để test!

## 3. Tạo thử phát test đầu tiên:
Đoạn test sau khá đơn giản, tạo một snapshot cho ouput của render cho component Login.
```javascript
import'react-native';
import React from 'react';
import Login from 'components/login';
import renderer from 'react-test-renderer';


it('renders correctly', () => {

 const tree = renderer.create(
   <Login />
   ).toJSON();
   
 expect(tree).toMatchSnapshot();
 
});
```

Tôi sẽ không nói rõ về snapshot ở đây vì nó khá dài. Nếu bạn muốn hiểu tại sao cần snapshot thì có thể tham khảo thêm[ tại đây](https://blog.callstack.io/unit-testing-react-native-with-the-new-jest-i-snapshots-come-into-play-68ba19b1b9fe) . Về cơ bản, chúng ta cần đảm bảo rằng mỗi lần chạy test thì output của render khớp với nhau (update snapshot khi chúng thay đổi).

# II. Làm nhiều thứ hơn với snapshot (Enzyme):
Khi bắt đầu viết test, tôi nhanh chóng nhận ra `react-test-renderer` ko ok lắm với các component phức tạp, vì thế chúng tôi đã sử dụng một thư viện khá là ngon của Airbnb là Enzyme.

Setup Enzyme khá dễ dàng: install `react-dom`, `react-addons-test-utils` sau đó là các packages `enzyme` và `jest-serializer-enzyme`. Thêm serializer vào package.json như sau:

```javascript
"jest": {
 "preset": "react-native",
 "snapshotSerializers": [
   "./node_modules/jest-serializer-enzyme"
 ]
},
```

Enzyme cho phép truy cập trực tiếp props và state của các component. Vì thế chúng ta có thể tạo snapshot cho nhiều render trong một component:
```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { ReassignLocationMenu } from 'components/menu/ReassignLocationMenu';

describe('Testing ReassignLocationMenu component', () => {

 it('renders as expected', () => {
   const wrapper = shallow(
     <ReassignLocationMenu count={2} />
   );

   expect(wrapper).toMatchSnapshot();

   wrapper.setProps({ count: 1 });

   expect(wrapper).toMatchSnapshot();
 });
 
});
```
Component `ReassignLocationMenu` nhận props `count` để xác định có bao nhiêu item được thêm vào. Đoạn test này sẽ tạo ra 2 snapshot riêng biệt cho mỗi case (khi count là 1 hoặc 2).

Với cách test trước chúng ta không thể test cả 2 case. Enzyme còn có thể làm được nhiều hơn thế nữa, tìm hiểu thêm [tại đây ](https://airbnb.io/enzyme/)nhé các bạn.

# III. Test render với component được connect:
Ứng dụng của chúng ta sử dụng `react-redux` để lưu trữ thông tin ở local, và hầu hết các component được connect như này:
```javascript
export default connect(mapStateToProps)(CameraSettings);
```
Khá là nhọ khi chúng ta tạo test render bằng cách sử dụng `shallow(<CameraSettings />)` chúng ta sẽ dính lỗi: "*Invariant Violation: Could not find ‘store’ in either the context or props of ‘Connect(CameraSettings)*"... phải làm cách khác thôi!

Một cách tạm ổn như sau (tách state)
Cách cũ thông dụng là chúng ta vẫn làm như cũ export component và import vào test:
```javascript
// components/menu/CameraSettings.js
export class CameraSettings extends Component { ... }
// __tests__/components/menu/CameraSettings.test.js
import { CameraSettings } from 'components/menu/CameraSettings';
```
Nhưng cách này phải viết khá tù và chính vì thế chúng ta phải tự thêm tất cả các props từ mapStateToProps,...

Hơn thế nữa, nếu chúng ta thay đổi state bằng bất kỳ logic nào bên trong `mapStateToProps` chúng ta cũng phải copy các logic đó vào test. Việc này khiến chúng ta dễ bị gây ra lỗi và trùng lặp code không cần thiết.

Cách “hịn" hơn (dùng mock!)
Thay vì tự thêm props, sẽ ok hơn nếu dùng mock để tránh trùng lặp code, thêm vào đó chúng ta có thể test luôn cả function mapStateToProps!
Để mock state, chúng ta sử dụng thư viện `redux-mock-store` :
```javascript
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

// imported as a connected component!
import CameraSettings from 'components/menu/CameraSettings';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const initialState = {
 preferences: {
   save_photos_locally: false,
   open_to_camera: false,
 },
};

describe('Testing CameraSettings', () => {
 it('renders as expected', () => {
   const wrapper = shallow(
     <CameraSettings />,
     { context: { store: mockStore(initialState) } },
   );
   expect(wrapper.dive()).toMatchSnapshot();
 });
});
```
Cách bước là như sau:
1. Component `CameraSettings` render một nút switch để toggle, đại diện cho ý muốn của người dùng về `save photos locally` và `open to camera`. Nó lấy giá trị từ state để render nút switch on hoặc off.
2. Để đưa chúng vào một mock store mà bộ test của chúng ta có thể sử dụng, đầu tiên chúng ta tạo `initialState`, sau đó truyền vào function `mockStore`.
3. Tiếp theo, chúng ta truyền store đã được mock vào component đã được connect bằng cách thêm vào function shallow: `{ context: { store: mockStore() } }`.
4. Cuối cùng, để render snapshot cho component đã được connect của chúng ta, dùng `wrapper.dive()` để truy cập output thực sự của component đối với snapshot.
Note: chúng ta có thể sử dụng function `wrapper.setContext()` để thay đổi thay đổi state và test render tuỳ theo ý bạn.

# IV. Mới chỉ là bắt đầu thôi…
Đây là điều những thứ đầu tiên mà tôi học được khi triển khai test bằng Jest với ứng dụng React Native. Hy vọng những thứ này sẽ ít nhiều giúp ích được cho bạn ;) Tôi đã dành hàng giờ đồng hồ để cố gắng chau chuốt và viết nó một cách dễ hiểu. Bạn cũng tốn nhiều thời gian và công sức để học nó. Vì thế tôi sẽ cố gắng viết và giải thích rõ ràng hơn nữa ở các phần sau. 

Đây là những thứ tôi sẽ đề cập đến trong những phần tiếp theo:
- Sử dụng `jest` command line không cần npm
- Tìm hiểu về các test coverage report
- Mock các response từ API
- Test các component functions
- Setup các global mock
- Các best practice khi mock 
- Test các tính năng và các component Touchable…

Cảm ơn các bạn đã theo dõi bài viết này. Nếu có ý kiến hãy nhớ để lại comment bên dưới nha :D !