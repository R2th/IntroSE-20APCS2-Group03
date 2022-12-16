Tại thời điểm này, thật khó để cho rằng React là một trong những thư viện được yêu thích nhất trên thế giới. Có một số lượng rất lớn sự quan tâm trong React và các new dev đang bị ảnh hưởng vào nền tảng này vì phương pháp tiếp cận UI-first của nó. Và trong khi cả thư viện và toàn bộ hệ sinh thái React đã trưởng thành qua nhiều năm thì vẫn có những trường hợp nhất định mà bạn tự hỏi:  "Chính xác, cách đúng đắn để làm điều này là gì?".

Và đó là một câu hỏi công bằng để hỏi - nhưng không phải luôn luôn có một cách làm đúng. Trong thực tế, như bạn có thể đã biết, đôi khi thực hành giỏi cũng không hẳn là tuyệt vời. Một số người trong số họ có thể làm cho hiệu suất, khả năng đọc và làm cho mọi thứ không hiệu quả về lâu dài.

Trong bài viết này, mình sẽ mô tả 5 thực tiễn phát triển chung được chấp nhận mà bạn thực sự có thể tránh khi sử dụng React. Đương nhiên, mình sẽ giải thích lý do tại sao mình xem xét việc thực hành có thể tránh được và đề xuất các phương pháp thay thế cho phép bạn thực hiện điều tương tự.

## Tối ưu hóa React ngay từ đầu
Các dev React đã đặt rất nhiều nỗ lực vào việc đưa ra các tối ưu hóa React nhanh và mới, được thêm trong bản mix sau mỗi lần cập nhật mới. Theo ý kiến của mình, bạn không nên dành thời gian tối ưu hóa nội dung cho đến khi bạn thấy số lần truy cập hiệu suất thực tế.

Tại sao vậy?

Quy mô React dễ dàng hơn so với các platform giao diện người dùng khác vì bạn không phải viết lại toàn bộ module để làm cho mọi thứ nhanh hơn. Thông thường thủ phạm gây ra các vấn đề hiệu suất là quá trình hòa hợp mà React sử dụng để cập nhật DOM ảo.

Chúng ta hãy xem cách React xử lý mọi thứ. Trên mỗi `render ()`, React tạo ra một cây bao gồm các phần tử giao diện người dùng - các nút lá là các phần tử DOM thực tế. Khi `state` hoặc `props` được cập nhật, React cần tạo ra một cây mới với số lượng thay đổi tối thiểu và giữ cho mọi thứ có thể dự đoán được.

Ví dụ bạn có 1 cây như thế này:

![](https://images.viblo.asia/2e8a260d-a8ac-4497-b60c-f7db65a72c2d.jpeg)

Hãy tưởng tượng rằng ứng dụng nhận dữ liệu mới và cần phải cập nhật các nút sau:

![](https://images.viblo.asia/4f3a44f0-3211-44c0-9e1c-3e6fd2bffaf8.jpeg)

React thường kết thúc bằng cách hiển thị lại toàn bộ cây con thay vì chỉ hiển thị các nút thích hợp như sau:

![](https://images.viblo.asia/6e56cf37-0b1c-4541-852c-4ccf328557d9.jpeg)

Khi `state` thay đổi ở các components bậc cao nhất, tất cả các components bên dưới nó sẽ được re-render lại. Đó là hành vi mặc định và ứng dụng có quy mô nhỏ sẽ ổn. Khi ứng dụng phát triển, bạn nên xem xét đo hiệu suất thực tế bằng cách sử dụng Chrome Profiling Tools của Chrome. Công cụ này sẽ cung cấp cho bạn các chi tiết chính xác về thời gian lãng phí trên các re-render không mong muốn. Nếu các con số là đáng kể, thì bạn có thể tối ưu hóa thời gian re-render bằng cách thêm móc `shouldComponentUpdate` vào component của bạn.

Móc được kích hoạt trước khi quá trình re-rendering bắt đầu và mặc định nó trả về true:

```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

Khi nó trả về true, thuật toán khác của React sẽ thay thế và re-render lại toàn bộ cây con. Bạn có thể tránh điều đó bằng cách thêm logic so sánh vào `shouldComponentUpdate` và cập nhật logic chỉ khi các `props` liên quan đã thay đổi.

```
shouldComponentUpdate(nextProps, nextState) {
  if (this.props.color !== nextProps.color) {
    return true;
  }
  if (this.state.count !== nextState.count) {
    return true;
  }
  return false;
}
```

Component sẽ không cập nhật nếu bất kỳ `props`/`state` nào khác đã thay đổi ngoại trừ `color`/`count`.

Ngoài ra, có một số thủ thuật tối ưu hóa không phải React mà các dev thường không để ý, nhưng chúng có tác động đến hiệu suất của ứng dụng.

Mình đã liệt kê một số thói quen có thể tránh được và các giải pháp bên dưới:

**1. Hình ảnh chưa được tối ưu hóa** - Nếu bạn đang xây dựng trên hình ảnh động, bạn cần xem xét các tùy chọn của mình trong khi xử lý hình ảnh. Hình ảnh có kích thước tệp lớn có thể làm người dùng cảm nhận rõ rằng ứng dụng chậm. Nén hình ảnh trước khi bạn đẩy chúng vào server hoặc sử dụng giải pháp thao tác hình ảnh động. Cá nhân tôi thích Cloudinary để tối ưu hóa hình ảnh react bởi vì nó có thư viện react riêng, nhưng bạn cũng có thể sử dụng Amazon S3 hoặc Firebase thay thế.

**2. Không nén file** - Gzipping build file (bundle.js) có thể giảm kích thước file xuống một số lượng tốt. Bạn sẽ cần thực hiện các sửa đổi đối với cấu hình server web. Webpack có một plugin nén gzip được gọi là [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin). Bạn có thể sử dụng kỹ thuật này để tạo bundle.js.gz trong suốt thời gian build.

## Server cho SEO
Mặc dù các ứng dụng Single Page tuyệt vời nhưng có hai vấn đề vẫn được feedback lại.

1. Khi ứng dụng load khởi tạo ban đầu, không có bộ nhớ cache JavaScript trong trình duyệt. Nếu ứng dụng lớn, thời gian thực hiện để load khởi tạo ban đầu cũng sẽ rất lớn.
2. Vì ứng dụng được hiển thị ở phía client-side, trình thu thập dữ liệu web mà search engine sử dụng sẽ không thể index nội dung được tạo bằng JavaScript. Các search engine sẽ thấy ứng dụng của bạn để trống và sau đó xếp hạng web của bạn kém.

Đó là nơi kỹ thuật hiển thị phía máy chủ có ích. Trong SSR, nội dung JavaScript được hiển thị từ máy chủ ban đầu. Sau khi render ban đầu, script phía client-side tiếp quản và nó hoạt động như một SPA bình thường. Sự phức tạp và chi phí liên quan đến việc thiết lập SSR truyền thống cao hơn vì bạn cần sử dụng server `Node` / `Express`.

Có tin tốt nếu bạn ở trong đó vì lợi ích SEO, Google lập index và thu thập nội dung JavaScript mà không gặp bất kỳ sự cố nào. Google thực sự bắt đầu thu thập dữ liệu JavaScript vào năm 2016 và thuật toán hoạt động hoàn hảo ngay lúc này.

## Inline styles & CSS imports
Trong khi làm việc với React, cá nhân mình đã thử các ý tưởng tạo kiểu khác nhau để tìm những cách mới để giới thiệu styles thành các component React. Phương pháp CSS-in-CSS truyền thống đã tồn tại trong nhiều thập kỷ hoạt động với các component React. Tất cả các stylesheets của bạn sẽ đi vào một thư mục stylesheets và sau đó bạn có thể import CSS cần thiết vào component của bạn.

Tuy nhiên, khi bạn đang làm việc với các components, stylesheets không còn ý nghĩa nữa. Trong khi React khuyến khích bạn nghĩ về ứng dụng của bạn về các components, stylesheets buộc bạn phải nghĩ về nó ở cấp độ document.

Có nhiều cách tiếp cận khác đang được thực hiện để hợp nhất CSS và JS code thành một file duy nhất. Inline styles có lẽ là phổ biến nhất trong số đó. 

```
import React from 'react';

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};
const pStyle = {
  fontSize: '15px',
  textAlign: 'center'
};

const TextBox = () => (
  <div style={divStyle}>
    <p style={pStyle}>Yeah!</p>
  </div>
);

export default TextBox;
```

Bạn không phải import CSS nữa, nhưng bạn đang hy sinh khả năng đọc và khả năng bảo trì. Ngoài ra, Inline Styles không hỗ trợ truy vấn media, class giả và các element giả và các kiểu style dự phòng. Chắc chắn, có rất nhiều cách **hack** cho phép bạn thực hiện một số trong số chúng, nhưng nó không thuận tiện.

Đó là nơi CSS-in-JSS có ích và Inline Styles không chính xác là CSS-in-JSS. Code dưới đây thể hiện khái niệm bằng cách sử dụng các styled-components.

```
import styled from 'styled-components';

const Text = styled.div`
  color: white,
  background: black
`
<Text>This is CSS-in-JS</Text>
```

Những gì browser thấy là một cái gì đó như thế này:

```
<style>
.hash234dd2 {
  background-color: black;
  color: white;
}
</style>

<p class="hash234dd3">This is CSS-in-JS</p>
```

Thẻ <style> mới được thêm vào đầu DOM và không giống như inline styles, các CSS styles thực tế được tạo ở đây. Vì vậy, mọi thứ hoạt động trong CSS cũng hoạt động trong các styled components. Hơn nữa, kỹ thuật này tăng cường CSS, cải thiện khả năng đọc và phù hợp với kiến trúc component. Với lib styled-components, bạn cũng nhận được hỗ trợ SASS đã được nhóm vào lib.
    
## Toán tử bậc ba lồng nhau
Các toán tử bậc ba rất phổ biến trong React. Đó là toán tử go-to của mình để tạo các câu lệnh có điều kiện và nó hoạt động tốt bên trong phương thức `render()`. Ví dụ: chúng giúp bạn hiển thị element inline trong ví dụ bên dưới, mình đã sử dụng nó để hiển thị status đăng nhập.

```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

Tuy nhiên, khi bạn lồng ghép các toán tử bậc ba lặp đi lặp lại, chúng có thể trở nên xấu xí và khó đọc.

```
int median(int a, int b, int c) {
    return (a<b) ? (b<c) ? b : (a<c) ? c : a : (a<c) ? a : (b<c) ? c : b;
}
```

Như bạn có thể thấy, các ký hiệu viết tắt nhỏ gọn hơn, nhưng chúng làm cho code thật lộn xộn. Bây giờ hãy tưởng tượng nếu bạn có một tá hoặc nhiều toán tử bậc ba lồng nhau trong cấu trúc của bạn. Và điều đó xảy ra thường xuyên hơn bạn nghĩ. Khi bạn bắt đầu với các toán tử có điều kiện, thật dễ dàng để tiếp tục lồng ghép nó và cuối cùng, bạn sẽ đạt đến một điểm mà bạn quyết định rằng bạn cần một kỹ thuật tốt hơn để xử lý hiển thị có điều kiện.

Nhưng thật tốt là bạn có nhiều lựa chọn thay thế mà bạn có thể lựa chọn. Bạn có thể sử dụng một plugin babel như `JSX Control Statements` extends JSX để include các components cho các câu lệnh và vòng lặp điều kiện.

```
// before transformation
<If condition={ test }>
  <span>Truth</span>
</If>

// after transformation
{ test ? <span>Truth</span> : null }
```

Có một kỹ thuật phổ biến khác gọi là **iify** (IIFE - Các biểu thức hàm được gọi ngay lập tức). Đó là một hàm ẩn danh được gọi ngay sau khi chúng được xác định.

```
(function() {
  // Do something
}
)()
```

Chúng ta đã bọc hàm bên trong một cặp dấu ngoặc đơn để làm cho hàm ẩn danh biểu hiện hàm. Parttern này phổ biến trong JavaScript vì nhiều lý do. Nhưng trong React, chúng ta có thể đặt tất cả các câu lệnh `if` / `else` bên trong hàm và trả về bất cứ thứ gì mà chúng ta muốn render.

Dưới đây là một ví dụ minh họa cách chúng ta sẽ sử dụng IFFE trong React.

```
{
   (() => {
      if (this.props.status === 'PENDING') {
         return (<div className="loading" />);
      }
      else {
         return (<div className="container" />);

   })()
} 
```

IIFE có thể có tác động đến hiệu suất, nhưng sẽ không có gì đáng kể trong hầu hết các trường hợp. Có nhiều phương pháp để chạy các câu lệnh có điều kiện trong React và chúng tôi đã đề cập trong [8 phương pháp hiển thị React có điều kiện](https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e).

## Bao đóng (Closures) trong React
Các **bao đóng (Closures)** là các hàm bên trong có quyền truy cập vào các biến và tham số của hàm bên ngoài. Bao đóng ở khắp mọi nơi trong JavaScript và bạn có thể sử dụng nó ngay cả khi bạn chưa nhận ra.
```
class SayHi extends Component {
render () {
 return () {
  <Button onClick={(e) => console.log('Say Hi', e)}>
    Click Me
  </Button>
 }
}
}
```

Nhưng thực sự là rất tệ khi bạn đang sử dụng các bao đóng bên trong phương thức `render ()`. Mỗi khi component `SayHi` được trả về, một hàm ẩn danh mới được tạo và chuyển đến component `Button`. Mặc dù `props` không thay đổi nhưng `<Button />` sẽ bị buộc phải render lại. Như đã đề cập trước đây, render bị lãng phí có thể có tác động trực tiếp đến hiệu suất.

Thay vào đó, thay thế các bao đóng bằng một class method. Các class methods dễ đọc hơn và dễ debug hơn.

```
class SayHi extends Component {

  showHiMessage = this.showMessage('Hi')
 
  render () {
   return () {
      <Button onClick={this.showHiMessage}>
            Click Me
      </Button>
   }
  }
}
```

## Kết luận
Khi một nền tảng phát triển, các partterns mới sẽ xuất hiện mỗi ngày. Một số partterns giúp bạn cải thiện quy trình làm việc tổng thể của mình trong khi một số khác có tác dụng phụ đáng kể. Khi các tác dụng phụ tác động đến hiệu suất của ứng dụng hoặc khả năng đọc thì có lẽ tìm kiếm các lựa chọn thay thế là ý tưởng tốt hơn. Trong bài đăng này, mình đã đề cập đến một số thực tiễn trong React mà bạn có thể tránh được do thiếu sót của chúng.

Suy nghĩ của bạn về React và các practices hay nhất trong React là gì? Hãy chia sẻ chúng trong phần bình luận nhé. :)

Refer: [Reactjs Practice](https://blog.logrocket.com/5-common-practices-that-you-can-stop-doing-in-react-9e866df5d269), [Closure và Scope trong JS](https://kipalog.com/posts/Closure-va-scope-trong-javascript)