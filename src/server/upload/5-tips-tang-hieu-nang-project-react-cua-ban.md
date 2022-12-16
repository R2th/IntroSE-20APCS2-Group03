![](https://images.viblo.asia/e05228c4-ab3f-4c2c-a39e-78ef1d9fe58d.jpg)

## 1. Use `memo` và `PureComponent`

Hãy thử xem qua ví dụ bên dưới nhé, bạn có nghĩ rằng, `ComponentB` sẽ re-render lại không nếu ta chỉ thay đổi mỗi `props.propA`
    
```
import React from 'react';

const MyApp = (props) => {
  return (
    <div>
      <ComponentA propA={props.propA}/>
      <ComponentB propB={props.propB}/>
    </div>
  );
};

const ComponentA = (props) => {
  return <div>{props.propA}</div>
};

const ComponentB = (props) => {
  return <div>{props.propB}</div>
};
    
```
    
Câu trả lời bất ngờ là có đấy, tại sao vậy, tôi chỉ thay đổi giá `prop` trong `componentA` thôi mà, tại sao `componentB`cũng re-render lại, như vậy thì quá là tốn tài nguyên
    
Bời vì `MyApp` nhận thấy rằng `<ComponentA>` có sự thay đổi, nên `MyApp` quyết định re-render lại, mặc dù các `props` của `<ComponentB>` vẫn giữ nguyên, nhưng parent của nó là `MyApp` re-render, nên nó cũng bị re-render theo
   
Các nhà phát triển React nhận thấy điều này là không phù hợp và khiến cho hiệu suất của bị giảm đi đáng kể
    
Và để giải quyết vấn đề trên, họ so sánh `props` cũ và mới của từng component con trước khi re-render lại, đó thực chất là những gì React.memo và React.PureComponent được ra đời 
    
Hãy bắt đầu với `React.memo` trong `stateless`:

```
import React, { memo } from 'react';

// Bad
const ComponentB = (props) => {
  return <div>{props.propB}</div>
};

// Good
const ComponentB = memo((props) => {
  return <div>{props.propB}</div>
});
    
```

Ở phần code bên dưới chính là `memo`, chỉ đơn giản là chúng ra sẽ bọc `<ComponentB>` với `memo`
    
`<ComponentB>` chỉ re-render lại khi gía trị của `propB` thay đổi, bấp kể `MyApp` thay đổi bao nhiêu lần

Bây giờ chúng ta sẽ tiếp tục với `PureComponent`, nó phù hợp với `stateful`
    
```
import React, { Component, PureComponent } from 'react';

// Bad
class ComponentB extends Component {
  render() {
    return <div>{this.props.propB}</div>
  }
}

// Good
class ComponentB extends PureComponent {
  render() {
    return <div>{this.props.propB}</div>
  }
}
```

Hiệu suất của project tăng đáng kinh ngạc với nhưng bạn đã bao giờ tự hỏi, tại sao React lại không để tự động các `memo`, `PureComponent` để tránh việc re-render này lại

Thực sự thì việc so sánh giữa `props` cũ và mới chính là nút thắt trong việc tối ưu performance hiện tại
    
Lấy ví dụ như là ta có một `props` cực lớn và thay đổi liên tục, bên cạnh việc re-render lại, React còn tốn hiệu năng cho việc so sánh các props thay đổi với nhau

Hơn nữa, phương thức `shouldComponentUpdate()` của `React.PureComponent` bỏ qua việc cập nhật prop cho toàn bộ các component con. Nên hãy chắc chắn rằng các component con cũng là “pure”.

Ngoài ra, React cũng tạo ra một hook tương đương với `React.memo` là [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)

    
## 2. Avoid Anonymous Functions

Các function bên trong body của component thường đuợc gắn với các `event handler` hoặc `callbacks`
    
Trong nhiều trường hợp, các function này không được định danh, hay còn được gọi là `anonymous function`
   
```
import React from 'react';

function Foo() {
  return (
    <button onClick={() => console.log('boop')}> // 🙅‍♀️
      BOOP
    </button>
  );
}    
```

Có thể thấy rằng function trên đã không được gán một định danh (khai báo thông qua const/let/var), điều này khiến Javascript phân bỏo bộ nhớ mỗi lần re-render lại thay vì chỉ phân bố một ô nhớ duy nhất một lần khi sử dụng các hàm này

Có 2 cách để giải quyết vấn đề này, một là đặt tên function đó và để nó nằm ngoài component
    
```
import React, { useCallback } from 'react';

// Variation 1: naming and placing handler outside the component 
const handleClick = () => console.log('boop');
function Foo() {
  return (
    <button onClick={handleClick}>  // 🙆‍♂️
      BOOP
    </button>
  );
}

// Variation 2: "useCallback"
function Foo() {
  const handleClick = useCallback(() => console.log('boop'), []);
  return (
    <button onClick={handleClick}>  // 🙆‍♂️
      BOOP
    </button>
  );
}
```
    
Cách thứ 2 là sử dung hook `useCallback`

Nó cũng giống với `useMemo`, tránh việc re-render component con khi component cha re-render, [tham khảo thêm](https://laptrinhx.com/han-che-re-render-khi-su-dung-react-hook-voi-memo-va-usecallback-1722328189/)
    
Với stateless thì ta dùng `useCallback`, còn stateful thì ta sẽ xử lí như sau:
    
```
import React from 'react';

//Bad
class Foo extends Component {
  render() {
    return (
      <button onClick={() => console.log('boop')}> 
        BOOP
      </button>
    );
  }
}

//Good
class Foo extends Component {
  render() {
    return (
      <button onClick={this.handleClick}>
        BOOP
      </button>
    );
  }
  handleClick = () => {  // this anonymous function is fine used like this
    console.log('boop');
  }
}
    
```
    
## 3. Avoid Object Literals
    
This performance tip is similar to the previous section about anonymous functions. Object literals don’t have a persistent memory space, so your component will need to allocate a new location in memory whenever the component re-renders:

Giống với ví dụ ở mục trên, việc phân bổ các thuộc tính không được định danh cũng làm cho `Component` bị re-render
    
```
function ComponentA() {
  return (
    <div>
      HELLO WORLD
      <ComponentB style={{  {/* 🙅‍♀️ */}
        color: 'blue',     
        background: 'gold'
      }}/>
    </div>
  );
}

function ComponentB(props) {
  return (
    <div style={this.props.style}>
      TOP OF THE MORNING TO YA
    </div>
  )
}
    
```
    
Mỗi lần `<ComponentA>` được re-render, một object literal (trong ví dụ là style) được tao ra trong bộ nhớ, điều đó có nghĩ là `<ComponentB>` cũng nhận đuợc giá trị khác 
    
Trong trường hợp này, ta cũng nên sử dung `useMemo` hoặc để phần khai báo ra bên ngoài component 
    
```
const myStyle = {
  color: 'blue',     
  background: 'gold'
};

function ComponentA() {
  return (
    <div>
      HELLO WORLD
      <ComponentB style={myStyle}/>
    </div>
  );
}

function ComponentB(props) {
  return (
    <div style={this.props.style}>
      TOP OF THE MORNING TO YA
    </div>
  )
}    
```
    
## 4. Use `React.lazy` and `React.Suspense`

Một cách khác đê cho ứng dụng React của bạn nhanh hơn đó là thực hiện việc tách mã (code-splitting). Tính năng này được giới thiệu cho React v16 với React.lazy và React.Suspense.

Nếu bạn không biết, `code-splitting` là việc chia nhỏ file thành các phần nhỏ của React, nếu không tự chia nhỏ, file đó sẽ rất lơn 
 
```   
- bundle.js (10MB!)
```

Khi sử dụng `code-splitting`, giúp cho file ban đầu trở nên nhỏ gọn đáng kế, sẽ giúp cho việc hiển thị, cũng như request qua mạng đuợc dễ dàng hơn
    
```
- bundle-1.js (5MB)
- bundle-2.js (3MB)
- bundle-3.js (2MB)
```
    
Với việc chia nhỏ, chỉ cần tải xuống 5MB đầu tiên, người dùng sẽ thấy được một phần của website hiện ra, sau đó sẽ tiếp tục tải xuống
    
Ví dụ như, một trang web, việc ta chia ra tải phần header, footer trước, sau đó sẽ show nhưng dữ liệu ở body ra sau, người dùng sẽ thích thú hơn với việc show một lúc ra cả trang mà phải chờ thời gian lâu hơn

**Vậy, React sử dụng `code-splitting` như thế nào?** 
    
Nếu bạn đã từng sử dụng [Create React App](https://create-react-app.dev/), thì nó thực sự đã đựoc cài đặt mặc định bên trong, việc còn lại của ta là sử dụng `React.lazy` và `React.Suspense`
    
Còn nếu bạn tự config, thì nó sẽ trông giống như [này](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269)
    
Dưới đây là ví dụ đơn gian của việc sử dụng `React.lazy` và `React.Suspense`
    
```
import React, { lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
const BlogPosts = React.lazy(() => import('./BlogPosts'));

function MyBlog() {
  return (
    <div>
      <Header>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPosts />
      </Suspense>
      <Footer>
    </div>
  );
}
```

[Tham khảo thêm ở đây](https://alligator.io/react/code-splitting-with-react-suspense/)

## 5. Avoid Frequent Mounting/Unmounting
    
Chúng ra vẫn thường sử dụng việc kiểm tra ẩn hiện component bằng các phép toán tử 3 ngôi
    
```
import React, { Component } from 'react';
import DropdownItems from './DropdownItems';

class Dropdown extends Component {
  state = {
    isOpen: false
  }
  render() {
    <a onClick={this.toggleDropdown}>
      Our Products
      {
        this.state.isOpen
          ? <DropdownItems>
          : null
      }
    </a>
  }
  toggleDropdown = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
}
```

Vì <DropdownItems> bị xóa khỏi DOM, nó có thể gây ra sự lặp lại (xóa/rồi lại hiển thị) bởi trình duyệt. Việc này cũng tốn khá nhiều hiệu năng, đặc biệt là nếu nó làm cho các yếu tố HTML xung quanh khác (sibling) thay đổi
        
Để giảm thiểu tốn kém kể trên, ta nên tránh các trường `unmounting` component ở những trường hợp thay đổi liên tục (ví dụ như click để hiện thị ra list sản phẩm lớn đã kể bên trên)
        
Thay vào đó, ta nên thay đổi css `visibility: hidden` hoặc `display: none` để tránh việc thay đổi, load DOM liên tục.

## 6. Kết luận
        
Trên đây là tìm hiểu của mình về 5 tips giúp tăng hiệu năng của ứng dụng react, mong là sẽ giúp ích được cho mọi người
        
Cảm ơn mọi người đã theo dõi.
        
Tài liêu tham khảo: 
        
[Pure component](https://alligator.io/react/performance-boost-purecomponent/)
        
[Sử dụng useCallBack, useMemo](https://laptrinhx.com/han-che-re-render-khi-su-dung-react-hook-voi-memo-va-usecallback-1722328189/)
        
[Code Splitting with React Suspense](https://alligator.io/react/code-splitting-with-react-suspense/)
        
[Keep react fast](https://alligator.io/react/keep-react-fast/)