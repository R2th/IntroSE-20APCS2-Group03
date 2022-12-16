# Mở đầu
Trong quá trình phát triển phần mềm thì việc viết và thực hiện unit testing là việc không thể bỏ qua với các developer. Vậy việc viết test như nào hay chọn framework nào để viết test luôn là 1 câu hỏi khó nhất là với những người mới tìm hiểu về test như tôi. Thật may trong lúc đọc doc của react native tôi đã tìm ra 2 framework giúp thực hiện công việc viết test đó chính là Jest và Enzyme. Ở phần này tôi sẽ giới thiệu với các bạn về snapshot test, jest, enzyme và cách cài đặt với project react-native.

# Snapshot testing là gì ???
* Snapshot tests là một công cụ rất hữu ích trong trường hợp Developer muốn đảm bảo rằng UI không bị thay đổi ngoài ý muốn.
* Trong react native , snapshot testing là việc tạo ra 1 file snapshot dưới dạng một file serializable từ component, sau đó trong những lần test sau, các component sẽ tiếp tục tạo ra các rendered output khác để so sánh với file snapshot ban đầu, nếu có sự thay đổi thì kết quả test sẽ fail. Giúp cho dev có thể nhận biết được sự thay đổi và có thể update cũng như sửa lại code cho chính xác.
* Vậy thì khi nào sẽ xảy ra fail test :

    * Do dev thay đổi lại ui nhưng chưa buid lại file snapshot dẫn đến báo fail. Khắc phục bằng cách build lại 1 file snapshot mới .
    * Do khi dev vô tình thay đổi UI ở 1 nơi nào đó có mỗi quan hệ với components hiện tại dẫn đến UI thay đổi .

# Viết test như nào ???

Khi đang mông lung không biết nên viết test như nào cũng như sử dụng công cụ gì thì thật may mắn, tôi đã vô tình đọc được trên docs và biết được rằng Jest là công cụ hỗ trợ test tuyệt vời được tạo bởi Facebook và được tích hợp sẵn khi chúng ta tạo project RN. Khá tiện lợi phải không nào :v . Vậy Jest là gì :-?

##  Jest
Jest là một thư viện testing được tạo bởi facebook.
Nó được tạo ra với mục tiêu ban đầu là cho reactjs, nhưng nó đã vượt xa những nhu cầu ban đầu, để trở thành một thư viện testing cho javascript một cách hoàn chỉnh.

Một trong nhưng ưu điểm lớn của jest là nó làm việc hiệu quả với rất ít bước setup và configuration. Nó đến với các tính năng chính là assertion library và hỗ trợ mocking.

Nó được viết theo BDD style như hầu hết các thư viện testing hiện nay. Jest còn có một tính năng đặc biệt, đó là snapshot testing, nó lưu lại snapshot (hay nói cách khác là cấu trúc view tại thời điểm hiện tại) rồi so sánh với snapshot trong tương lai, nếu chúng không giống nhau thì test của chúng ta đã fail hoặc có một số thứ đã thay đổi. 

## Cài đặt 

###  Add Jest vào project
Ở các phiên bản RN 0.38 trở lên, Jest đã được tích hợp sẵn khi bạn tạo project bằng react-native init, vì thế việc setup này đối với bạn có thể đã có sẵn và ko cần setup thêm nữa. Nếu muốn tìm hiểu thêm bạn có thể vào đây để xem ([ setting up testing with React Native](https://jestjs.io/docs/en/tutorial-react-native.html#setup)).

### Tạo thử project
*  Sau khi chúng ta tạo project bằng câu lệnh `react-native init` thì đây là toàn bộ cấu trúc thư mục sau khi được build thành công trên IDE.

![](https://images.viblo.asia/1dff9ad5-251a-46f0-8ab6-bf1f0e16d849.PNG)

*  Như hình trên xuất hiện file `App-test.js` theo mặc định nhưng chúng ta custom lại cấu trúc project 1 chút : thêm thư mục `src` dùng để chứa các file source trong project. Trong thư mục này chúng ta tạo thêm 1 file tên là `Main.js` là 1 component dùng để test.

```js
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Main extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>{'My name is ' + `${this.props.name}`}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

```

   Ở component trên mình có tạo 1 View nhỏ bên trong chứa Text component dùng để hiện thị dòng chữ  `My name is ` =)) . Chúng ta cùng bắt tay vào viết test cho component này nhé ;) 


Sau khi tạo project (hoặc setup cơ bản với những phiên bản RN < 0.38) thì chúng ta đã có thể chạy test thông qua lệnh `npm test`.

![](https://images.viblo.asia/1fa1f2f3-209b-4725-86de-a83f68143a16.png)

### Chạy thử test 
Khoan, thế test chạy như nào vào ở đâu ???  Hmm chúng ta quay lại project đọc lướt qua 1 lượt thì phát hiện ra 1 foder nhỏ tên là  `__test__.` Vậy nó ở đâu ra :-? 

Câu trả lời là sau khi tạo project thành công thì xuất hiện thư mục __test__ . Sau này tát cả thao tác với test ta đều thực hiện trong thư mục này :D 

![](https://images.viblo.asia/efcf6027-fd8b-4199-a89c-acac392385ab.PNG)

Và tương ứng file `App-test.js` là file test cho componetn `App.js` mà chúng ta vừa tạo ra. 

Thử chọc vào code xem bên trong có gì nào :v 

```js
/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

```

Đọc từ trên xuống thì cũng chỉ là những dòng import bình thường :/ . 

**Stopppp!!!!!!!!!!!!!!!!** đã xuất hiện sự khác biệt :o 

![](https://images.viblo.asia/cf8ea112-894a-4d5d-b12c-c07aac12bcff.PNG)

Dòng import này nghĩa là gì ._. và tại sao lại được sử dụng ở đây ???

Sau 1 hồi đàm đạo với chị Google cuối cùng mình cũng đã tìm ra được câu trả lời :v 

### react-test-renderer
`'react-test-renderer'` là một thư viện giúp chúng ta có thể thực hiện render snapshot một cách đơn giản nhất. Thay vì phải render ra các objec thật thì nó render ra các JS object để có thể thực hiện test trực tiếp trên Node.

### Viết thử test lần đầu tiên

Ở thư mục test vùa rồi chung ta tạo file `Main-test.js` để viết test cho component Main nhé :3 

```js
import 'react-native';
import React from 'react';
import Main from '../src/Main';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Main snapshot', () => {
  const snap = renderer.create(
    <Main />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});

```

Vậy đoạn code mình vừa thêm vào có ý nghĩa gì ??? Cùng giải nghĩa nào :v 

Để khởi chạy test thì chúng ta phải sử dụng hàm __test__ 

__test__ function ở đây gồm 2 parameter.

*   Tham số đầu tiên là tên của test 
  
*   Tham số tiếp theo là hàm cho test của chúng ta. Kiểu như là hàm chứa các kì vọng mà test đạt được.
  
*   Tham số cuối cùng là timeout (đơn vị mà ms) dùng để làm thời gian chờ đợi cho các hàm test bất đồng bộ (mặc định là 5000 ms). Ví du khi có 1 promise được return từ test thì Jest sẽ đợi cho promise đấy được resolve trước khi test được thực hiện xong. 
  
* Đi sâu vào trong chúng ta thấy xuất hiện `renderer.create(<Main/>)`. Câu lệnh này dùng để tạo ra 1 TestRenderer instance khi chúng ta truyền vào 1 React element. Nó không sử dụng các tài nguyên thật để render ra Component chúng ta truyền vào nhưng nó vẫn được render đầy đủ 'Component tree' vào trong memory để bạn có thể kiểm tra nó.
* Câu lệnh testRenderer.toJSON()  dùng để trả về 1 tree gồm các nút là các thành phần như View và các props của chúng để thuận tiện cho việc sử dụng snapshot testing.
* Dòng cuối cùng là giá trị mong đợi khi bạn viết đoạn test này. `expect`  cho phép chúng ta truy cập vào  các phương thức `matcher` để phát hiện ra những sự sai khác. Ở đây chúng ta sử dụng `toMatchSnapshot`  để đảm bảo rằng nó trùng với snapshot gần đây nhất

* Chạy thử thôiiiiii ! Chúng ta sử dụng câu lệnh `npm test` để chạy thử

![](https://images.viblo.asia/9b73d131-18e5-4f1e-8505-521b4be63d4b.PNG)

Test chạy thành công nhưng khoan đã sao lại có chữ FAIL đỏ lòm thế kia ._. đọc error message xem nào 

'Your test suite must contain at least one test'
Đừng lo lắng, chỉ là do lỗi textRegex của Jest thôi ;) quan trọng là kết quả cuối cùng mà chúng ta cần đó chính là những dòng xanh xanh kia kìa :v 

![](https://images.viblo.asia/9207b811-b8ad-46f2-acaf-293cf72b5338.PNG)

Và đây là kết quả khi mình thử chạy trên 1 máy khác 

![](https://images.viblo.asia/695199ff-37c7-4e31-ac94-ae3c3de9bfd7.png)

Thật bất ngờ vì đã không còn hiện lỗi kia nữa :v 

Thử kiểm tra xem bên trong thư mục __test__  xem có sự thay đổi gì không nhé :3 

![](https://images.viblo.asia/d6aa441b-1fdc-4d93-adc5-ae34f3d448bf.png)

Bên trong đã xuất hiện thư mục `__snapshot __`   bên trong chứa 1 file Main-test.js.snap vì khi viết file test cho file Main mình thêm vào đoạn code để tạo snapshot. Hãy cùng xem trong file snapshot này chứ những gì nào. 

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Main snapshot 1`] = `
<View>
  <Text
    style={
      Object {
        "alignItems": "center",
        "fontSize": 24,
        "justifyContent": "center",
      }
    }
  >
    My name is 
  </Text>
</View>
`;
```
Đây chính là nội dung của file snapshot, nó convert view của chúng ta sang object để tiện so sánh cũng như test.

Vậy khi chúng ta muốn sửa giao diện của ui vừa tạo thì test sẽ thay đổi như nào :/ Cùng thử nhé ;)

Chúng ta sửa lại giao diện của Main 1 chút nhé. Thay vì để text size là 24 chúng ta đổi lên thành 28 xem thế nào nhé 

![](https://images.viblo.asia/9a772dbe-c47b-4072-9f89-b0514fb210d6.png)

Jest đã thông báo sự thay đổi và báo fail test giúp chúng ta có thể dễ dàng nhận thấy sự khác biệt và có thể sửa kịp thời. 

Vậy cơ chế hoạt động của snapshot như nào ???

* Đầu tiên chúng ta chạy lệnh npm test
* Sau đó snapshot mới sẽ được tạo và sẽ được compare với file snapshot đã được lưu trữ trong thư mục `__snapshot_ `trước đó (nếu trong thư mục đó đã xuất hiện file snapshot trước)
* Nếu xuất hiện sự khác biệt giữa 2 snapshot thì test fail 

Thế khi chúng ta chủ động thay đổi lại code sửa lại UI thì sao ??? Lúc đó chúng ta sẽ sử dụng câu lệnh `npm test -- -u` để update và test lại với UI mới nhất . Cùng xem nào

![](https://images.viblo.asia/a836ae53-0062-42c5-aa53-8aeaa8f5adf2.png)

Done snapshopt đã được cập nhật rồi :D


### Snapshot with Enzyme


Những bài test đầu tiên khá đơn giản nhưng khi chúng ta thử test với những component phức tạp thì `'react-test-renderer' `cho thấy nó không còn là một lựa chọn hàng đầu :( sau đó mình lại hỏi chị Google và đã tìm ra 1 thư viện mới khá là xịn xò của `AirbnbEng` đó chính là [Enzyme](https://airbnb.io/enzyme/) 

Enzyme cho phép truy cập trực tiếp props và state của các component. Vì thế chúng ta có thể tạo snapshot cho nhiều render trong một component, khá là tiện phải không nào :D

* Cài đặt

Chúng ta chạy lệnh
```js
npm install --save-dev enzyme enzyme-adapter-react-16 enzyme-to-json
```

Sau đó là 

```
npm install react-dom 
npm install react-addons-test-utils
```


* Bắt đầu viết thử test với Enzyme ;)

```js
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme'
import Main from '../src/Main'
Enzyme.configure({ adapter: new Adapter() });

it('Main test Enzyme', () => {
  const snap = shallow(
    <Main />
  )
  expect(snap).toMatchSnapshot()

})
```

Enzyme cung cấp cho chúng ta 3 loại để render 

* mount(<Component />)  Mount Còn được gọi là Full DOM rendering, nó cho phép chung ta vẽ lên một cây DOM cho component đó và cho cả component con.


* shallow(<Component />) Shallow rendering Được dùng để test component như một đơn vị và không thể truy cập vào các component con. Với phiên bản mới(v3), shallow rendering đã hỗ trợ test componentDidMount và componentDidUpdate


* render hay còn gọi là static dùng để render các React Component với HTML tĩnh và phân tích cấu trúc của HTML đó. Chỉ gọi hàm render của component. Không có lifecycle hooks.


Ở đây chúng ta sử dụng shallow :3

Chạy thử để kiểm tra thành quả nào

![](https://images.viblo.asia/81ca721f-7c25-4196-810b-009e376f118b.png)

Đã thành công rồi :D chúng ta thử xem file snapshot của Enzyme có khác gì không nhé ;) 

![](https://images.viblo.asia/ea6bcdcb-e1dc-4cad-b397-848646dee69c.png)

Tại sao lại không có gì ngoài `ShallowWrapper` :(  ? 

Là vì chúng ta chưa cài thư viện enzyme-to-json, nó cung cấp một định dạng thành phần tốt hơn để so sánh snapshot nhanh hơn so với biểu diễn thành phần bên trong của Enzyme. snapshotSerialulators cho phép bạn giảm thiểu sao chép mã khi làm việc với snapshot. Nếu không có trình tuần tự hóa mỗi khi component được tạo ra trong thử nghiệm thì nó phải có phương thức enzyme-to-json .toJson () được sử dụng riêng lẻ trước khi có thể được chuyển đến trình snapshot Jest matcher

Update lại file `package.json`

```js
"jest": {
  "snapshotSerializers": ["enzyme-to-json/serializer"]
}
```

Chạy lại với lệnh `npm test -- -u` 

![](https://images.viblo.asia/81ca721f-7c25-4196-810b-009e376f118b.png)

Và đây là kết quả khi mở file snapshot của Enzyme chúng ta đã xuất hiện giống với cấu trúc của Jest 

![](https://images.viblo.asia/de3f4362-c32c-4675-9406-5b4d3589ee6b.png)

Như mình đã nói ở trên, ngoài phần cơ bản thì Enzyme còn có thể tạo snapshot cho nhiều render trong 1 component bằng cách truy cập trực tiếp state và props của các component bằng cách chỉnh sửa thêm 1 chút ở file `Main-enzyme.test.js`

```js
import React from 'react'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme'
import Main from '../src/Main'
Enzyme.configure({ adapter: new Adapter() });

it('Main test Enzyme', () => {
  const snap = shallow(
    <Main name={'Duc'} />
  )
  expect(snap).toMatchSnapshot()

  snap.setProps({ name: 'Duc Dep trai' });

  expect(snap).toMatchSnapshot();
})
```

Ở đây Main nhận vào props là name để hiển thị tên được thêm vào. Đoạn test này sẽ tạo ra 2 snapshot riêng biệt cho mỗi case (2 snapshot này nằm chung trong file `Main-enzyme.test.js.snap` nhé ;)) điều mà cách trên chưa làm đươc.

Chạy test ta được kết quả 

![](https://images.viblo.asia/acf3a9b6-5b74-4651-b40c-9252379e9ef4.png)

Sau đó chúng ta mở file snapshot để cảm nhận sự khác biệt

![](https://images.viblo.asia/58a8ffe0-1e3e-4412-b3a5-616ce4fd3a78.png)

Kiến thức về phần này còn rất nhiều nhưng mình không thể truyền tải hết trong 1 bài viết được =))) chắc tẩu hỏa nhập ma mất. Phần sau mình sẽ giới thiệu sâu hơn về test trong react native nhé ;)

# Tổng kết
Chúc mừng các bạn đã viết thành công test đầu tiên :v

Bài viết trên chúng ta đã cùng tìm hiểu về snapshot testing là gì , dùng như nào và các cách để tạo snapshot với các component đơn giản. 

Cảm ơn các bạn đã theo dõi. Bài viết còn nhiều thiếu sót mong các bạn góp ý ;)

Đây là repo trên github của mình demo các bạn có thể tham khảo 
https://github.com/ducbvm-1727/demoTest

:D Happy Coding !

# Tham khảo
https://jestjs.io/docs/en/getting-started

https://airbnb.io/enzyme/