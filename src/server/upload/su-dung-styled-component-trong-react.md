Dạo gần đây, mình đã có cơ hội được tiếp xúc với Styled-Components và áp dụng nó vào React. Thật sự là mình cảm thấy khá thú vị với nó. Trong bài viết này mình xin phép được chia sẻ kiến thức về Styled- Components

Phần đầu tiên, mình sẽ giới thiệu Styled-Components cho những bạn chưa từng nghe về nó hoặc đã nghe qua nhưng chưa từng dùng lần nào

**1/ Style-Components là gì**

Về cơ bản, Styled-Components là 1 thư viện, được phát triển với mục đích để quản lý code CSS 1 cách dễ dàng. Trong React, thông thường bạn sẽ viết Component ở file .js và viết style cho nó ở file .css, sau đó sẽ import nó vào file .js, và khi bạn có 10 Component ở 10 file js khác nhau, lúc đó bạn sẽ viết 10 file css tương ứng hay gộp hết css vào 1 file, nếu như vậy, mỗi lần bạn muốn sửa 1 class, 1 thuộc tính nào đó của class, bạn sẽ phải lần mò trong vài trăm dòng code (nghe chẳng vui chút nào phải không?). Nếu chúng ta áp dụng Styled-Components, các thuộc tính css đó có thể viết trực tiếp vào được trong file .js, vì vậy chúng ta có thể dễ dàng kiểm tra và quản lý code, không cần phải chuyển qua lại giữa các file nhìu lần nữa. Nhưng điều  làm mình thấy thú vị nhất trong Styled-Components chính là truyền props của nó.


Cài đặt styled components như thế nào, vẫn là cú pháp thần thánh với npm thôi

``npm install -save styled-components``

Để sử dụng nó vào file js thì t phải import nó vào nữa

``import styled from 'styled-components'``;

**2/ Sử dụng Styled-Components**

chúng ta sẽ dùng nó vào project React, vì vậy chúng ta phải tạo ra 1 project React đã, thần chú để tạo là

``npx create-react-app ten-cua-project-react``

sau đó  cài đặt styled-components, xong xuôi rồi thì chúng ta code thôi (yaoming)

chúng ta sẽ làm 1 trang bán hàng, có Header, Body và Footer, chúng ta khai báo như sau

``const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 1000px;
    height: 70px;
    background-color: #4d4d4d;
    border-bottom: 1px solid #3e3e3e;
 `;``

Ở bên phải header sẽ là logo, bên trái sẽ nút Đăng ký,

``const Logo = styled.div`
    width: 50px;
    height: 50px;
    box-shadow: 0 0 3px 6px rgba(0, 0, 0, 0.2);
    border-radius: 999px;
`;
``

``const RegisterButton = styled.div`
    width: fit-content;
    height: 48px;
    padding: 10px 20px;
    box-shadow: 0 0 3px 6px rgba(0, 0, 0, 0.2);
    border-radius: 999px;
`;
``

Giờ mình sẽ apply cái này vào trước nhé, nếu bạn đã quen với Component trong React thì việc dùng nó cũng vô cùng đơn giản.

``<HeaderContainer>
    <Logo />
    <RegisterButton>Đăng ký</RegisterButton>
</HeaderContainer>``

Thấy đơn giản không nào? Ngoài ra bạn cũng có thể viết nó ra 1 file riêng, sau đó export như này.

``export { HeaderContainer, Logo, RegisterButton };``


``import * as SC from './style';``

mình import và khai báo nó theo kiểu alias vì muốn phân biệt component của styled-components với component của react, khi dùng sẽ như thế này
``<SC.HeaderContainer>
    <SC.Logo />
    <SC.RegisterButton>Đăng ký</SC.RegisterButton>
</SC.HeaderContainer>``

Việc phân biệt rạch ròi như thế này rất có lợi khi bạn fix bug.

**3/ Props trong Styled-Components**

Đây là cái mình thấy thích nhất ở styled-components, bạn có thể truyền props vào css như component của React, và đây là ví dụ, chúng ta sẽ khai báo Body, màu của nó sẽ được tùy thuộc vào props truyền vào.

``
const Body = styled.div`
    min-width: 1000px;
    min-height:700px;
    padding: 20px;
    background-color: ${props => props.bgColor ? props.bgColor : '#4d4d4d'};
`;
``

Và sẽ truyền props như thế này ``<SC.Body bgColor='#ffffff' />``, nếu bạn truyền giá trị vào cho bgColor, thì nó sẽ nhận giá trị màu là '#4d4d4d'. Hoặc bạn có thể dùng props như thế này, trước đó bạn phải import thêm css, ``import { css } from 'styled-components';``

``${props =>
    props.lightGrey &&
    css`
      background-color: '#4d4d4d';
    `}``
    
``${props =>
    props.white &&
    css`
      background-color: '#ffffff';
    `}``
    
Sử dụng sẽ như thế này: ``<SC.Body lightGrey />``, lightGrey và white lúc này sẽ thành boolean.

**4/ Kế thừa trong Styled-Components**

Component cuối cùng chúng ta sẽ khai báo là Footer.

``
const Footer = styled.div`
    min-width: 1000px;
    min-height: 300px;
    background-color: #4d4d4d;
    border-top: 1px solid #3e3e3e;
`;
``

Và bạn muốn có 1 cái Footer khác với Footer trên, nhưng có quá nhiều property khác với Footer gốc, nếu truyền quá nhiều props thì sẽ khá rắc rối, nên chúng ta sẽ làm như thế này

``
const FooterBlack = styled(Footer)`
  padding; 20px;
  margin-top: 50px;
  border-top: solid blue;
`;
``

**5/ Styled-Components có đáp ứng đầy đủ như CSS không?**

Dĩ nhiên là có, bao gồm cả css selector, animation, keyframes, transition, ...

``const rotateLogo = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
``

``const Logo = styled.div`
	animation: ${rotateLogo} 2s linear infinite;
`;``

Với css selector

``const Logo = styled.div`
	&::hover {
        background-color: black;
    }
`;``

**6/ Kết luận**

kết hợp lại tất cả chúng ta sẽ được 1 component như thế này 

``
<React.Fragment>
    <SC.HeaderContainer>
        <SC.Logo />
        <SC.RegisterButton>Đăng ký</SC.RegisterButton>
    </SC.HeaderContainer>
    <SC.Body lightGrey/>
    <SC.Footer />
</React.Fragment>
``

vậy là qua những lời giới thiệu và ví dụ phía trên, bạn đã có được ít nhiều kiến thức về styled-components, và hy vọng bạn cũng cảm thấy nó thú vị như mình. Cảm ơn mọi người đã bỏ thời gian để đọc bài viết này