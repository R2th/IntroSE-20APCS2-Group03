Với React, thay vì phải thay đổi trạng thái state cho đến khi đạt được kết quả mong muốn, một ứng dụng sẽ bao gồm một hệ thống phân cấp của các stateless component. Một component sẽ không là gì cả nhưng một function thì khác. Một function bao gồm kết quả trả về chỉ phụ thuộc vào logic bên trong và các thuộc tính truyền vào nó. Function không tạo ra cac side-effect (hiệu ứng phụ). Chúng ta không cần phải quan tâm đến các state rườm rà hoạt động bên ngoài  cần phải theo dõi. Điều này cũng khá giống với styled-component. Thay vì viết style chung, việc sử dụng styled-component sẽ giúp việc style riêng cho các component trở nên dễ dàng và dễ quản lý hơn việc viết style chung. Nhưng nếu không cẩn thận thì sẽ gặp vài trường hợp gây hoang mang kiểu như các ví dụ dưới đây.

Chúng ta muốn style cho một phần tử HTML cơ bản với sự trợ giúp của styled-components. Đây là một phương thức ở mức cơ bản nhất dưới dạng styled.tagname. Tagname ở đây là bất kì HTML-tag hợp lệ nào.

```
import React from 'react';
import styled from 'styled-components';

const MyStyledDiv = styled.div`
  margin: auto;
  width: calc(100% - 40px);
`;

const Component = () => <div>
    <MyStyledDiv>
        I have a horizontal margin
    </MyStyledDiv>
</div>;
export default Component;
```

Ở ví dụ trên, cần style margin sao cho div được căn giữa đều hai bên trái phải. 

Thực tế một component có style như vậy cũng không hẳn là sai. Nhưng nếu như muốn hai component có chung một style như vậy thì sao?. Không thành vấn đề. 
Nếu một component mở rộng thêm, thì có thể kế thừa lại style. Hoặc nếu thích thì có thể viết đè lên style cũ.

```
import React from 'react';
import styled from 'styled-components';

const MyStyledDiv = styled.div`
  margin: auto;
  width: calc(100% - 40px); /* 40px == 2*20px margin */
`;

const MyBorderedStyledDiv = styled(MyStyledDiv)`
  border: 2px dashed black;
  width: calc(100% - 40px - 2 * 2px); /* subtract the border, too */
`;

const Component = () => <div>
    <MyBorderedStyledDiv>
        I have a border and a horizontal margin.
    </MyBorderedStyledDiv>
    <MyStyledDiv>
        I have a horizontal margin.
    </MyStyledDiv>
</div>;
export default Component;
```

Tiếp đó, tạo component *MyBorderStyledDiv* có style dùng chung với *MyStyledDiv* và thêm border. Cần trừ width của hai border left và right để căn chỉnh 2 div đều nhau.
Tính toán lại một chút, hai component cũng không thành vấn đề. Nếu muốn share style giữa hai component mà không cần đến parent, thì có thể sử dụng css-function của styled-components.

```
import React from 'react';
import styled, { css } from 'styled-components';

const MyStyledDiv = styled.div`
  margin: auto;
  width: calc(100% - 40px); /* 40px == 2*20px margin */
`;

const MyBorderedStyledDiv = styled(MyStyledDiv)`
  border: 2px dashed black;
  width: calc(100% - 40px - 2 * 2px); /* subtract the border, too */
`;

const backgroundStyle = css`
  background: green;
`;

const MyGreenBorderedStyledDiv = styled(MyBorderedStyledDiv)`
  ${backgroundStyle};
`;

const MyGreenStyledDiv = styled(MyStyledDiv)`
  ${backgroundStyle};
`;

const Component = () => <div>
    <MyGreenBorderedStyledDiv>
        I have a border and a horizontal margin. I am green.
    </MyGreenBorderedStyledDiv>
    <MyGreenStyledDiv>
        I have a horizontal margin. I am green, too.
    </MyGreenStyledDiv>
    <MyStyledDiv>
        I have a horizontal margin.
    </MyStyledDiv>
</div>;
export default Component;
```

Tiếp theo, add same background cho các component có border và không có border. Sau đó tiếp tục sử dụng *</MyStyledDiv />*. Không thể add background cho base component này.

Chúng ta đang xây dựng một lô các component. Bốn cái rồi, thêm cả css share chung nữa. 
Nếu hỏi rằng "functional styles" này trông thế nào, có hơn việc sử dụng css chung không? Biết nói gì đây, trông cứ sai sai sao sao ấy.

Vấn đề ở đây là có quá nhiều styles phụ thuộc vào các ngữ cảnh đặc biệt mà bạn muốn sử dụng trong component. Component này ở đầu trang hay cuối trang vậy? Hãy cẩn thận khi đắm chìm trong một lố các component thế này dễ khiến bạn phạm sai lầm. Và đúng là sai rồi đấy, hoàn toàn có thể sử dụng CSS operators trong các styled-component được mà, phải không?

```
import React from 'react';
import styled from 'styled-components';

const MyStyledDiv = styled.div`
  margin: auto;
  width: calc(100% - 40px); /* 40px == 2*20px margin */
`;

const MyGreenStyledDivBorderedWhenFirst = styled(MyStyledDiv)`
  background: green;
  &:first-of-type {
    border: 2px dashed black;
    width: calc(100% - 40px - 2 * 2px); /* 40px == 2*20px margin */
  }
`;

const Component = () => <div>
    <MyGreenStyledDivBorderedWhenFirst>
        I have a border and a horizontal margin. I am green.
    </MyGreenStyledDivBorderedWhenFirst>
    <MyGreenStyledDivBorderedWhenFirst>
        I have a horizontal margin. I am green, too.
    </MyGreenStyledDivBorderedWhenFirst>
    <MyStyledDiv>
        I have a horizontal margin.
    </MyStyledDiv>
</div>;
export default Component;
```

Thật nhẹ nhõm khi đã loại bỏ được một đống các component. Có lẽ không nên quên mọi thứ về CSS khi xài thằng styled-component như này. 

Nhưng câu chuyện chưa kết thúc đâu. Chúng ta gặp vấn đề về trùng lặp trong đoạn code trên. Ở cả hai component *<MyStyledDiv/>* và *<MyStyledDivBorderedWhenFirst/>* đều có width riêng. Nếu muốn căn chỉnh đều cả hai, cần đảm bảo cả hai có cùng *width*. Hãy loại bỏ sự trùng lặp này. Việc sử dụng size border ở cả hai bên nghe chừng cũng được. Chúng ta có thể thay thế bằng các constants như sau:

```
const margin = "40px";
const borderWidth = "2px";
 
const MyGreenStyledDivBorderedWhenFirst = styled(MyStyledDiv)`
  background: green;
  &:first-of-type {
    border: ${borderWidth} dashed black;
    width: calc(100% - ${margin} - 2 * ${borderWidth});
  }
`;
```

Nhưng đây chính là side-effect, là tác dụng phụ đấy. Có thể là ok với các trường hợp đơn giản, nhưng nếu viết quá nhiều style như trên ở nhiều loại file, thì chắc chắn gặp phải cái bẫy là import quá nhiều. Vừa phải copy paste nhiều lần rồi import ti tỉ thứ, đây chắc không phải React-way rồi đúng không. Styled-component có cung cấp một phương pháp để loại trừ được trường hợp trên. Đó là sử dụng *ThemeProvider* và *withTheme-HOC* (higher-order component).

```
import React from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';

const MyStyledDiv = withTheme(styled.div`
  margin: auto;
  width: calc(100% - ${props => props.theme.margin});
`);

const MyGreenStyledDivBorderedWhenFirst = withTheme(styled(MyStyledDiv)`
  background: green;
  &:first-of-type {
    border: ${props => props.theme.border} dashed black;
    width: calc(100% - ${props => props.theme.margin} - 2 * ${props => props.theme.border});
  }
`);

const Component = () => <ThemeProvider theme={{margin: "40px", border: "2px"}}>
    <MyGreenStyledDivBorderedWhenFirst>
        I have a border and a horizontal margin. I am green.
    </MyGreenStyledDivBorderedWhenFirst>
    <MyGreenStyledDivBorderedWhenFirst>
        I have a horizontal margin. I am green, too.
    </MyGreenStyledDivBorderedWhenFirst>
    <MyStyledDiv>
        I have a horizontal margin.
    </MyStyledDiv>
</ThemeProvider>;
export default Component;
```

Theme ở đây là một Javascript Object. Chúng ta định nghĩa nó như một thuộc tính trong component *<ThemeProvider/>*. Vẫn có thể đặt nó ở một vị trí riêng nào đó rồi import vào, nhưng tốt nhất là chỉ nên import ít nhất một lần thôi.
*<ThemeProvider/>* là một component bọc ngoài. Component này sẽ cung cấp theme cho toàn bộ các component React trong nó. Trong render tree, tất cả các children sẽ access vào theme, kể cả có nhiều level deep hơn nữa. Như vậy là chúng ta sẽ gói gọn toàn bộ hệ thống phân cấp trong component *<ThemeProvider/>*.
Khi sử dụng theme trong component, cần access chúng thông qua *withTheme-HOC*. Chúng ta sẽ nhận được giá trị cần, không có tác dụng phụ và cũng chẳng gặp phải cái bẫy import nào ở đây nữa.

Đến đây chúng ta đã có một global theme gần như hoàn chỉnh. Còn một vấn đề là chúng ta đang để share border-width cho toàn bộ theme, nhưng ban đầu chỉ có một component cần border. Thế nên cần modify lại chút, đẩy lại border vào trong component *MyGreenStyledDivBorderedWhenFirst*.

```
const MyGreenStyledDivBorderedWhenFirst = (props) => {
    const border = "2px";
    const C = withTheme(styled(MyStyledDiv)`
      ${backgroundStyle};
      &:first-of-type {
        border: ${border} dashed black;
        width: calc(100% - ${props => props.theme.margin} - 2 * ${border});
      }
    `);
    return <C {...props}/>
};
```

Chúng ta đã định nghĩa nó như một function React Component với border là một constant. Sau đó sử dụng const đó trong sub-component *<C />*. 

Nếu đã mất công tránh side-effects và phần lặp, thì backgroundStyle và tính toán width cũng phải làm gì đó. Theme dù sao cũng chỉ là một Javascript-object đơn giản, nên có thể đặt bất kỳ thứ gì vào trong, miễn là không phải chuỗi nào đó. Hãy đặt backgroundStyle vào trong, sau đó thêm function tính toán width.

```
import React from 'react';
import styled, { css, ThemeProvider, withTheme } from 'styled-components';

const MyStyledDiv = withTheme(styled.div`
  margin: auto;
  width: ${props => props.theme.calculateWidth(props.theme, false)};
`);

const MyGreenStyledDivBorderedWhenFirst = (props) => {
    const border = "2px";
    const C = withTheme(styled(MyStyledDiv)`
      ${props => props.theme.backgroundStyle};
      &:first-of-type {
        border: ${border} dashed black;
        width: ${props => props.theme.calculateWidth(props.theme, border)}
      }
    `);
    return <C {...props}/>
};
const Component = () => <ThemeProvider theme={{
    margin: "40px",
    backgroundStyle: css`
      background: green;
    `,
    calculateWidth: (theme, border) => `calc(100% - ${theme.margin}  - 2 * ${ border ? border : "0px"})`
  }}>
    <MyGreenStyledDivBorderedWhenFirst>
        I have a border and a horizontal margin. I am green.
    </MyGreenStyledDivBorderedWhenFirst>
    <MyGreenStyledDivBorderedWhenFirst>
        I have a horizontal margin. I am green, too.
    </MyGreenStyledDivBorderedWhenFirst>
    <MyStyledDiv>
        I have a horizontal margin.
    </MyStyledDiv>
</ThemeProvider>;
export default Component;
```

Ừm, có vẻ tuy rằng code đã hoạt động, nhưng lại phức tạp hơn trước. Vì sao vậy?
Lý do đưa ra là bạn đã bị rơi vào vũng lầy của sự trừu tượng, hiểu một cách đơn giản là chỉ vì bạn muốn mọi thứ không bị lặp lại và có logic. Vậy tại sao không biến block *first-of-type* thành một function ngay từ đầu?

Styled-component đã hỗ trợ quá đắc lực. chúng cho phép chúng ta tạo style theo dạng React-way, nhưng không phải là làm hết mọi thứ dùm. Cấu trúc code và các component vẫn phụ thuộc vào chúng ta. Vì vậy vẫn có thể viết nhiều component và chấp nhận side-effects, đồng thời lựa chọn được mức độ trừu tượng code hợp lý là được.

Link code demo [tại đây](https://codesandbox.io/s/keen-wildflower-89ixc)

Bài viết tham khảo [tại đây](https://codeburst.io/are-you-drowning-in-a-pile-of-styled-react-components-75feb87392ca)