![](https://images.viblo.asia/22bdbe09-ab47-42f4-aad0-c93c25e3f2b8.png)

Mình đọc các bài trên mạng, thì các Technical leader về công nghệ nhận xét thế này:
🎉🎉 Announcing styled-components v4 🎉🎉
```
- 25% faster mounting, 7% faster updating
- New global styling API
- Native support for the "as" prop
- Full React v16 StrictMode compliance
- Native support for "ref", no more innerRef!
- and so much more!
```

Sự thật như thế nào thì chúng ta cùng nhau tìm hiểu về nó nhé.


API global styles hoàn toàn mới, hỗ trợ props “as” và “ref”, loại bỏ .extend, đầy đủ React v16 StrictMode-compliance, tăng tốc độ và hơn thế nữa.

Chúng tôi rất vui mừng thông báo rằng styled-components v4 chính thức được thử nghiệm! Hãy nhận nó với người quản lý package yêu thích của bạn và giúp chúng tôi kiểm tra những thay đổi, chúng tôi muốn nghe suy nghĩ của bạn. 

```
npm install styled-components@beta
```

Các bạn có thể xem chi tiết về những thay đổi tại đây:

[Migration instructions](https://www.styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v4)・[v4 beta changelog](https://github.com/styled-components/styled-components/blob/develop/CHANGELOG.md)



Những điểm nổi bật của bản phát hành này:

- **Nhỏ hơn và nhanh hơn nhiều**, từ 16.1kB đến dưới 15kB (tùy thuộc vào bundler của bạn và việc sử dụng plugin babel) và tăng tốc lên ~ 25% và hiển thị lại ~ 7,5% (có khả năng nhiều hơn nếu [PR này](https://github.com/styled-components/styled-components/pull/1994) được hợp nhất)
- `createGlobalStyleAPI` **hoàn toàn mới** , thay thế có thể tải lại và có thể thay thế được cho theme cũ `injectGlobal`
- **Hỗ trợ cho các** "as" **prop**, một thay thế linh hoạt hơn cho `.withComponent()`
- Loại bỏ `Comp.extend`, với một codemod tự động để di chuyển toàn bộ codebase của bạn sang `styled(Comp)` ký hiệu thống nhất
- `StrictMode` **tuân thủ đầy đủ cho React v16**, điều này cũng có nghĩa là chúng tôi phải giảm hỗ trợ cho React v15 và thấp hơn (bạn có thể sử dụng các polyfill để có được v15 làm việc với các thành phần có kiểu v4)
- **Native support cho** `ref` **mọi styled component** , không còn `innerRef` cảm ơn React v16


### Tại sao lại là một phiên bản beta?

Chúng tôi muốn đảm bảo mọi người có đủ thời gian để kiểm tra các thay đổi và nhận các kiểu được cập nhật và hỗ trợ làm nổi bật cú pháp cho tất cả các API mới. Chúng tôi đang lên kế hoạch cho giai đoạn beta kéo dài khoảng một tháng.

### Performance, Performance, Performance!

Quay trở lại khi chúng tôi phát hành v2, chúng tôi hứa sẽ tập trung vào hiệu suất sau khi đóng gói các API cốt lõi của chúng tôi, và kể từ đó được phân phối với các bản tăng tốc trong các bản vá khác nhau và [tăng gấp 10 lần trong phiên bản v3.1](https://medium.com/styled-components/v3-1-0-such-perf-wow-many-streams-c45c434dbd03).


Chúng tôi vui mừng thông báo rằng chúng tôi đang tiếp tục xu hướng với bản phát hành này! Nhờ tối ưu hóa nội bộ xung quanh việc sử dụng bộ nhớ, chi tiết triển khai JS engine và các phép tái cấu trúc khác nhau, **styled-components v4 gắn kết nhanh hơn ~ 25%** cho cả `component trees` sâu và rộng và **cập nhật styles nhanh hơn ~ 7%** (updates dynamic styles faster by):

![](https://images.viblo.asia/0442df07-4f17-41ba-aa36-4e6df2422c6c.png)


Trong khi đó là tuyệt vời trong sự cô lập, cho phép xem làm thế nào v4 so sánh với các thư viện khác trong hệ sinh thái CSS-in-JS rộng hơn với tốc độ gắn kết của nó:

![](https://images.viblo.asia/a37380e9-f0ff-416a-91b6-3aa8daac58ce.png)

Như bạn có thể thấy, **styled-components v4** rất nhanh ™. Chúng tôi đang ở trong một độ lệch chuẩn của tất cả các thư viện nhanh nhất hiện có, cả về lắp đặt cũng như tốc độ cập nhật, có nghĩa là hiệu suất chính thức không còn là vấn đề nữa! 🎉


Mặc dù đây là một sự cải tiến tuyệt vời đã được một thời gian dài trong các công việc, chúng tôi không thể hoàn thành - chúng tôi sẽ luôn theo các tối ưu hóa để cải thiện hiệu suất của mình.

### New Global Styles API

We’ve been cooking a new global styling API behind the scenes for a while. The old injectGlobal had three big issues: it couldn’t be dynamically updated, it wasn’t hot-reloadable and it wasn’t contextually themable.

We’re excited to introduce you to createGlobalStyle, our new dynamically updateable API for global styles! Here’s what it looks like:

Chúng tôi đã nấu một API tạo kiểu toàn cầu mới đằng sau hậu trường trong một thời gian. Cũ injectGlobalđã có ba vấn đề lớn: nó không thể được cập nhật động, nó không phải là nóng-tải lại và nó đã không được theo ngữ cảnh themable.

Chúng tôi rất vui được giới thiệu với bạn createGlobalStyle, API tự động cập nhật mới của chúng tôi cho các kiểu toàn cầu ! Dưới đây là hình thức:

```
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  html {
    color: red;
  }
`;
export default function App() {
  return (
    <div>
      <GlobalStyle />
      This is my app!
    </div>
  );
}
```

Với `createGlobalStyle`, global styles của bạn bây giờ là một phần của React component tree. Mặc dù điều đó có thể không giống như một sự khác biệt lớn nhưng nó có thể cập nhật động, hot-reload và chủ đề theo ngữ cảnh global styles của bạn , giống như bất kỳ styled component khác!

```
import { createGlobalStyle, ThemeProvider } from "styled-components";
// Global styles but theme- and update-able!
const GlobalStyle = createGlobalStyle`
  html {
    background: ${p => p.backgroundColor};
    color: red;
    font-family: ${p => p.theme.fontFamily};
  }
`;
export default function App() {
  return (
    <ThemeProvider theme={{ fontFamily: "Helvetica Neue" }}>
      <GlobalStyle backgroundColor="turquoise" />
    </ThemeProvider>
  );
}
```

#### Adios .extend, hello origami magic!

Bản phát hành này cũng bao gồm một bản làm lại nội bộ để các thành phần được bao bọc ngay bây giờ tự động "fold" và chỉ một thành phần được hiển thị.

#### “Okay, but… what does that mean for me?”
("Được rồi, nhưng ... điều đó có ý nghĩa gì đối với tôi?")

Chúng tôi đã giới thiệu `StyledComp.extendAPI` vì nó cho phép chúng tôi thực hiện một số tối ưu hóa dựa trên thực tế là thành phần bạn đang mở rộng là một styled component. Nhờ công việc nội bộ để tự động folding, sử dụng `styled(StyledComp)` tự động áp dụng cùng một tối ưu hóa `StyledComp.extend` được sử dụng để làm! Điều đó có nghĩa `.extend` là không phải là một phần hữu ích của API nữa, vì vậy chúng tôi sẽ xóa nó. Một API ít hơn để suy nghĩ và ít mã để ship — win-win!

#### The new “as” polymorphic prop
Mới “là” đa hình prop

Có một điều nữa mà chúng tôi thực sự đã nói đến trong bản phát hành phiên bản v4 này: hỗ trợ `prop` cho bộ phận trên bất kỳ styled component để thay đổi những gì được hiển thị động trong thời gian chạy! Nó được giải thích tốt nhất với một ví dụ:
```
import styled from "styled-components"
import { Link } from "react-router-dom"
// <Component /> renders a div to the DOM
const Component = styled.div`
  color: red;
`
<Component>Hello World!</Component>
// But we can also make it render any other HTML tag or component!
<Component as="span">Hello World!</Component>
<Component as={Link} to="home">Hello World!</Component>
```

So với hiện tại, `.withComponent(something)` đây là cách linh hoạt hơn vì bạn không phải xác định thay thế trước, và với cơ chế folding bên trong mới của chúng tôi, bạn không mất bất kỳ kiểu dáng nào nếu thành phần cơ bản của bạn là một styled-component!

```
import styled from "styled-components"
const RedColor = styled.div`
  color: red;
`
const BlueBackgroundRedColor = styled(RedColor)`
  background: blue;
`
<BlueBackgroundRedColor as="span">Hello!</BlueBackgroundRedColor>
// Even though we switch to rendering a `span` from rendering
// <RedColor />, this will still have a red color on top of 
// the blue background!! (.withComponent couldn't do that)
```


Như bạn thấy, `as` prop là siêu tuyệt vời và sẽ làm cho nó dễ dàng hơn nhiều để render HTML ở khắp mọi nơi trong các ứng dụng của bạn. Không còn lý do gì cho `<div>` nữa!

Lưu ý rằng chúng tôi không ngừng sử dụng `.withComponenttrong` khi chúng tôi đảm bảo rằng `as` prop là một sự thay thế phù hợp cho tất cả các trường hợp sử dụng. Giả sử nó sẽ trở thành, `.withComponent` sẽ bị loại bỏ trong bản phát hành chính tiếp theo.

### React v16 and refs
During our internal migration to the new React v16 APIs, we also found that innerRef could be done away-with via the new React.forwardRef API 👏 We never enjoyed this workaround because it felt so hacky… but thanks to the lovely work by the React team, now native ref can be used:

Trong quá trình chuyển đổi nội bộ của chúng tôi sang APIs React v16 mới, chúng tôi cũng thấy rằng `innerRef` có thể thực hiện được thông qua `React.forwardRefAPI` mới. Chúng tôi không bao giờ thích cách giải quyết này bởi vì nó cảm thấy rất khó khăn ... nhưng nhờ vào công việc thích thú của nhóm React `ref` có thể được sử dụng:

```
import styled from "styled-components"
const Component = styled.div`
  color: red;
`
// Later in your render function
<Component ref={element => { this.myRef = element; }}
```

### TypeScript improvements

Chúng tôi không chịu trách nhiệm trực tiếp về điều này, nhưng chúng tôi rất vui mừng về [@babel/preset-typescript](http://twitter.com/babel/preset-typescript) mới vì nó có nghĩa là người dùng TypeScript cuối cùng có thể sử dụng [plugin babel styled-components với tất cả các lợi ích của nó](https://github.com/styled-components/babel-plugin-styled-components), bao gồm debug dễ dàng hơn với tên component trong classes, hỗ trợ rendering server-side và kích thước gói nhỏ hơn! Highly recommended.

#### The types are now migrated to DefinitelyTyped!
We’ve also finished the migration of TS types to DefinitelyTyped so that the community can iterate on them and fix typing bugs at their own pace outside the release cycle of styled-components. Get them on npm as @types/styled-components!

Chúng tôi cũng đã hoàn thành việc di chuyển các loại `TS` thành `DefinitelyTyped` để cộng đồng có thể sử dụng lại chúng và fix typing bug theo tốc độ riêng của chúng bên ngoài chu kỳ phát hành của các styled-components. Nhận chúng vào npm như [@types/styled-components](https://www.npmjs.com/package/@types/styled-components)!



Từ tất cả chúng tôi, chúng tôi hy vọng bạn yêu thích v4 nhiều như chúng tôi yêu thích làm việc trên nó! Hãy cho chúng tôi biết suy nghĩ của bạn trong cộng đồng: https://spectrum.chat/styled-components

As always, stay stylish.

Giống như styled-components? Hãy cân nhắc việc đóng góp hoặc thuyết phục công ty của bạn tài trợ cho [OpenCollective](https://opencollective.com/styled-components) của chúng tôi ! Chúng tôi là một nhóm tình nguyện viên nguồn mở điển hình và đóng góp của bạn sẽ giúp chúng tôi làm những việc như giúp đỡ cho cộng tác viên, đi đến các hội nghị và tạo ra những điều mới mẻ.

#### Tham khảo
https://medium.com/styled-components/announcing-styled-components-v4-better-faster-stronger-3fe1aba1a112