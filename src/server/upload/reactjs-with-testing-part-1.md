# Giới thiệu
Kiểm thử là công việc nhằm cải thiện chất lượng sản phẩm cũng như giúp các lập trình viên có thể kiểm tra các lỗi trong quá trình lập trình.
Bài viết này mình sẽ giới thiệu với các bạn cách viết test cho 1 ứng dụng web react. 
# Giới thiệu về 1 Testing cơ bản 
- Đầu tiên khởi tạo react project với: 
  `npx create-react-app demo-testing`
- Với câu lệnh trên sẽ genarate project. Và trong thư mục src bạn sẽ thấy file `App.test.js` được genarate ra để test cho file App.js
  
  - Chúng ta thử add thêm `console.log(div.textContent)` trong file `App.test.js` để lấy nội dung trong component App xem sao! 
  
  - chạy `yarn test` trên terminal xem kết quả trả về ra sao?
  
  ![](https://images.viblo.asia/e3acdb5d-db60-4419-9824-aeb4ed181d30.png)
  
  - Viết 1 đoan test cho nội dung bên trong App component
  
  - `expect(div.textContent).toEqual('Welcome to ReactTo get started, edit src/App.js and save to reload.')`
  
  Kết quả trả ra thành công cho câu testcase đầu tiên
  ![](https://images.viblo.asia/a21e8e6c-e627-47a4-9ef3-71c921cb0a4d.png)
  
  Đừng lo lắng j cả. Mình sẽ giải thích cho bạn về cách viết 1 test cơ bản nhất ^^
   
  - Đầu tiên là `it`. Nó chính là cấu trúc của 1 test cơ bản nhất:
    
    Bao gồm 2 tham số:  `it('description of the test', 'function containing our tes logic')`
    Tham số đầu tiên là 1 chuỗi nhằm mô tả mục đích của test này đang muốn test cái j?
    Tham số thứ 2 là 1 function sẽ chứa các logic để chạy.
    
  - `const div = document.createElement('div');` : Đừng nghĩ rằng chúng ta đang tạo ra 1 <div> trong browser. Nó sẽ không xuất hiện trong các browser nào cả dù là FireFox or IE, Chorme. Thay vào đó nó sẽ tự động tạ ra 1 fake div nhờ vào thư viện dom (dom library) nó được gọi là JSDOM và nó đang chứa <div> trong bộ nhớ mà không bị trói buộc bởi bất cứ trình duyệt or điều j cả. ^^
  - `expect(div.textContent).toEqual('Welcome to ReactTo get started, edit src/App.js and save to reload.')`
    
    `expect` là 1 function nhằm so sánh các kết quả kỳ vọng và kết quả nhận được. Nếu nó true thì test case này đúng và ngược lại
    
    `expect('value thay we are inspecting').matcher statement(value that we expect to see)`
    
    - value that we are inspecting là tất cả nhưng gì chúng ta muốn test

    - mathcher statement các thức so sánh 
    - value that we expect to see là giá trị kỳ vọng nhận được
  - `ReactDOM.unmountComponentAtNode(div); `: unmountComponentAtNode sẽ xóa component mà ta vừa tạo ra
  
# Jest
- Jest hỗ trợ để chạy tự động các test trong app react và dưới đây là các bước hoạt động của việc test với jest
  - Khi chúng ta chạy test với câu lệnh `yarn test`
  - Jest sẽ được chạy lên và nó sẽ tìm tất cả các file với đuôi là `.test.js`
  - Jest sẽ in các kết quả test ra terminal
  - Khi các file thay đổi, Jest sẽ tự động chạy lại các tests.
- Phần đầu mình sẽ hướng dẫn mọi người test với các component trước
  - remove các file không cần thiết trong thư mục src : 
    
    `App.css, App.test.js, index.css, logo.svg, registerServiceWorker.js App.js`
  - Chỉnh sửa file index.js với nội dung như sau:
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```
  - Tạo thư mục `components` trong thư mục src
    - Tạo file App.jsx và add nội dung file như sau:
      ```
      import React from 'react';

      export default () => <div>App Component</div>
      ```
  
  - OK, Giờ mình sẽ tập viết test cho App Component  với thằng Jest xem sao nhé.
  - Tạo 1 folder `__tests__` trong thư mục `components` để có thể chứa các file test.js giúp test các file components và  để dễ quản lý các file test hơn
  - Tạo file `App.test.js` trong thư mục `__test__` vừa mới tạo để test file `App.jsx`
  - Add nội dung vào file App.test.js
    ```
    import React from 'react'
    import ReactDom from 'react-dom'
    import App from '../App'

    it('Test App Component', () => {
      const div = document.createElement('div')

      ReactDom.render(<App />, div)

      expect(div.textContent).toEqual('App Component')

      ReactDom.unmountComponentAtNode(div)
    })
    ```
    
    Toàn những kiến thúc cơ bản mình giới thiệu ở phần trên rồi nhé.
    
  - Vậy thử test với 1 component được import vào bên trong React xem sao?
    - Tạo 1 CommentBox component  trong thư mục components `CommentBox.jsx`
    - Add nội dung file:
      ```
      import React from 'react'

      export default () => (
        <div>
          <form>
            <h4>Comment Box</h4>
            <textarea />
            <div><button>Send Comment</button></div>
          </form>
        </div>
      )
      ```
   - import CommentBox component vào App.jsx
     ```
     <div>
      <h1>App Component<h1>
      <CommentBox />
     </div>
     ```
   - test thử expect `expect(div.textContent).toEqual('App ComponentComment BoxSend Comment')` 
   - OK. vậy nó vẫn đúng khi test vs 1 component được import vào ^^
 
 Tuy nhiên không, nó chưa chứng minh được điều j cả? ở trong App của tôi hoàn toàn có thể có text Comment BoxSend Comment. Và việc để tôi kiểm tra xem CommentBox có đúng là có nội dung là `Comment BoxSend Comment` hay không hoàn toàn không được đảm bảo? Trong khi đó việc test component không chỉ dừng lại ở việc tôi test nội dung. Tôi có thể test xem CommnentBox có `textarea` or `button` hay không? Vậy để dễ dàng làm được điều đó tôi cần 1 thư viện có tên là `Enzyme`, Vậy Enzyme là gi?
#  Enzyme
`enzyme`: nó sẽ giúp hỗ trợ việc rendering component và tìm các element,..
- Cài đặt: `yarn add --dev enzyme enzyme-adapter-react-16`
 
  Chú ý `16` tương ứng với phiên bản React của bạn. VD của tôi là `"react": "^16.5.2"` => tôi sẽ cài `enzyme-adapter-react16`
  
 Thế thằng enzym-adapter-react16 này là gi? Nó sẽ giúp ta config để có thể enzyme khi các file test được chạy thì enzyme có thể được gọi ở bất cứ đâu trong project
- tạo file config `setupTests.js`: như đã nói khi test được chạy thì file setupTests.js sẽ được chạy đầu tiên
- add nội dung file:
 ```
 import Enzyme from 'enzyme'
 import Adapter from 'enzyme-adapter-react-16'

 Enzyme.configure({ adapter: new Adapter() })
 ```
 
 - Enzyme Api cung cấp cho chúng ta các method để có viết test
 - Rendering các component có 3 method:
   - Static: Render component và trả về text HTML (như phần trên chúng ta test đó)
   - Shallow: Trả về duy nhất 1 component nhưng không bao gồm các component con. (Tức là ta chỉ test CommentBox có tồn tại bên trong App hay không? còn nội dung bên trong CommentBox thì không cần quan tâm)
   - Full DOm: Render tất cả các component ^^
 
 - Enzyme còn cung cấp khá nhiều function, method nữa. mọi người có thể  vào đây xem https://airbnb.io/enzyme/docs/api/
 - OK, Giờ chúng ta viết thử nhé:
   Trong file App.test.js chúng ta import shallow từ emzyme và CommentBox component
   
   `import { shallow } from 'enzyme'` && `import CommentBox from '../CommentBox';`
   
   Tạo test với `it`
   ```
   it('show the comment box component', () => {
     const wrapped = shallow(<App />) // trả về App component (truy cập zô App component)
     expect(wrapped.find(CommentBox).length).toEqual(1) // tìm thằng CommentBox và kiểm tra xem nó có tồn tại trong App hay không?
     wrapped.unmount 
   })
   ```
   
   Vậy là tôi đã biết chắc chắn rằng tồn tại 1 thằng CommentBox trong App
   Phần tiếp theo tôi sẽ test xem `textarea, button` có trong thằng CommentBox hay không?
   
   - Tạo file CommentBox.test.js trong thư mục __tests__
   - Add nội dung
     ```
     import React from 'react'
     import CommentBox from '../CommentBox'
     import { mount } from 'enzyme'
     
     it('has a text area and a button', () => {
       const wrapped = mount(<CommentBox />)
       expect(wrapped.find('textarea').length).toEqual(1)
       expect(wrapped.find('button').length).toEqual(1)
       wrapped.unmount()
     })
     ```
    Dễ hiểu là khi shallow(ShallowWrapper) rendering component thì mount (ReactWrapper) nó sẽ chọc sâu vào để tìm nội dung bên trong component đó
    
    OK expect của chúng ta hoàn toàn đúng rồi ^^
    
 - `enzyme` cung cấp cho bạn 2 function rất hữu dụng là `beforeEach và afterEach` giúp bạn có thể DRY code hiệu quả
   VD: Ở trong App của bạn có nhiều component khác. Và bạn cần phải test tất cả nó. Tương ứng với việc trong mỗi `it` bạn cần phải `shallow` và `unmount` nó. làm code bạn nhìn không DRY và dài. Vì vậy bạn cần dùng `beforeEach và afterEach`  (nó như kiểu before vs after của rspec vậy =)))
   
   OK thử viết xem sao:
   
   ```
    //CommentBox.test.js
    let wrapped

    beforeEach(() => {
      wrapped = mount(<CommentBox />)
    })

    afterEach(() => {
      wrapped.unmount()
    })

    it('has a text area and a button', () => {
      expect(wrapped.find('textarea').length).toEqual(1)
      expect(wrapped.find('button').length).toEqual(1)
    })
   ```
   
# Kết Luận
Ok Ở phần 1 mình chỉ xin giới thiệu với mọi người về cú pháp của test, cách viết test 1 component, Jest, Enzyme.
Bài sau mình sẽ hướng dẫn test reducer, action,...
Hẹn gặp mọi người ở loạt bài sau ^^