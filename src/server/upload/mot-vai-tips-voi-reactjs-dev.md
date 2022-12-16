### 1. Bạn có yêu thích **React** ? 
Chắc hẳn bạn biết **React** không phải là hệ sinh thái duy nhất, cũng không dám chắc chắn là tốt nhất cho việc phát triển ứng dụng **Web**. Nhưng tôi tin chắc **React** thực sự tốt, ổn định và mạnh mẽ trong lĩnh vực này. Nếu bạn đã từng sử dụng,hoặc trải qua vài **Project** với **React**, tôi sẽ đưa ra vấn đề về việc bạn có thật sự yêu thích nó, vì chỉ có tình yêu hay sự đam mê mới giúp chúng ta có thêm động lực để đón nhận nhiều thử thách hơn. Nếu thật sự yêu thích **React**, tôi hi vọng những phần mình chia sẻ phía sau sẽ phần nào giúp bạn định hình bước phát triển tiếp theo của mình.

### 2. React đang không ngừng phát triển, cập nhật, và chúng ta cũng nên như vậy

Chắc hẳn bạn còn nhớ những điều mới mẻ mà phiên bản **React** 16.0.3 mang lại, như **Context**, **StrictMode**, hay một vài thay đổi đối với vòng đời của **component**. Đội ngũ phát triển của **React** cũng như cộng đồng **contributors** đã thật sự làm việc hiệu quả với mục tiêu nâng tầm công nghệ mà chúng ta yêu mến. Và chỉ một thời gian ngắn sau đó, chúng ta đã được chào đón phiên bản 16.4.0 với việc bổ sung **Pointer Events**.  

Và không quá bất ngờ khi có thể ngay trong năm nay, chúng ta sẽ được đón nhận **React** 17.0 với **Async Rendering, Caching**,... và nhiều điều mới mẻ nữa. Vì vậy, chúng ta cũng cần sẵn sàng để **update** chính bản thân mình trước sự thay đổi đến từ cộng đồng cũng như hệ sinh thái rộng lớn của **React**. Nắm bắt những tính năng, những phương pháp mới sẽ cho việc xây dựng ứng dụng trở nên dễ dàng và hiệu quả hơn.  

### 3. Đừng ngại việc chia nhỏ mã **code** của bạn.  
Với **React**, chúng ta xây dựng giao diện người dùng dựa trên các **Component**. Bạn cần nắm rõ phương pháp này và sẵn sàng chia nhỏ giao diện thành các phần nhỏ hơn.  
Đôi khi một **Component** đơn giản chỉ bao hàm 4-5 dòng **code**, điều đó chẳng sao cả. Miễn sao khi ai đó nhìn vào các **Component** của bạn, họ sẽ nhanh chóng nắm bắt được cách thức chúng giao tiếp và làm việc.  
```go:js
return (
  [
   <ChangeButton
    onClick={this.changeUserApprovalStatus}
    text="Let’s switch it!"
   />,
   <UserInformation status={status}/> 
  ]
)
```
Các **components** không cần thiết luôn luôn bao hàm nhiều **logic** phức tạp, chỉ có một vài yêu cầu đối với các **component** đó là chúng cần dễ đọc, dễ **test** và dễ mở rộng sau này.   
```javascript:js
import ErrorMessage from './ErrorMessage'

const NotFound = () => (
  <ErrorMessage
    title="Oops! Page not found."
    message="The page you are looking for does not exist!"
    className="test_404-page"
  />
)
```
Trong ví dụ trên, các thuộc tính đều ở dạng tĩnh. Chúng ta chỉ cần có một **PureComponent** xử lý trường hợp **404**.   
Một điều nữa là nếu bạn không thích sử dụng CSS **class** quá nhiều, hãy cân nhắc việc sử dụng [**styled-components**](https://www.styled-components.com/)  
```html:html:js
import styled from 'styled-components'
const Container = styled.div`
  padding: 20px;
`
const Number = styled.h1`
  font-size: 36px;
  line-height: 40px;
  margin-right: 5px;
  padding: 0px;
`
...

<Container>
  <Number>{skipRatePre}</Number>
</Container>
```
Hoặc nếu như bạn không thích việc tạo ra quá nhiều **components** khiến cấu trúc **project** trở nên quá phức tạp. Hãy tham khảo các phương pháp tối ưu hoá cấu trúc của **project**, ví dụ như **[fractal structure](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af)**. 

### 4. Không chỉ dừng lại ở những khái niệm cơ bản.
Sự thật là bạn không cần thiết nắm bắt và áp dụng toàn bộ các **API** của **React** để có thể xây dựng ứng dụng **Web** cho mình, một vài khái niệm nâng cao khá là khó hiểu và chúng ta thường bỏ qua chúng, miễn sao ứng dụng hoạt động tốt. Bây giờ là lúc để bạn tìm hiểu và nắm bắt các chủ đề trên, điều đó chắc chắn sẽ giúp chúng ta hiểu hơn bản chất và khiến **React** trở nên thân thuộc hơn. Một vài **API** nâng cao có mà bạn có thể tìm hiểu ngay như là:
* **Coupount Components**  
* **High Order Components (HOCs)**  
* **Render Props**  
* **Smart/Dumb Components**  

Tham khảo thêm tại **[React documentation](https://reactjs.org/docs/getting-started.html)**
```javascript:js
// đoạn code sau trông có giống React mà bạn vẫn biết không ?

render() {
  const children = React.Children.map(this.props.children,
   (child, index) => {
      return React.cloneElement(child, {
        onSelect: () => this.props.onTabSelect(index)
    });   
 });  
 return children;
}
```
### 5. Đừng làm phức tạp hoá vấn đề.  
Một vấn đề với hệ sinh thái **React** có thể khiến bạn thích thú hoặc ngược lại, đó là thường có khá nhiều lựa chọn để xử lý vấn đề, **React** là một hệ sinh thái mở cho phép cộng đồng hàng ngày thêm vào đó những giải pháp khác nhau cho những vấn đề từ đơn giản đến phức tạp, vì vậy đôi khi bạn sẽ thấy chán nản vì có quá nhiều thư viện mới được gợi ý để đọc và tìm hiểu, tiêu biểu nhất là việc khi bắt đầu làm quen với **React**, chúng ta thường nghe rất nhiều về **Redux** hay **Mobx**, những thư viện giúp quản lý **state** cho ứng dụng **React**, nhưng các **Tutorial** hay sẽ thường khuyên bạn cố gắng hiểu và chỉ dùng **React** để xử lý, và chỉ dùng đến các thư viện khác khi thực sự cần thiết. Rõ ràng chúng ta đều thấy việc dùng **Redux** sẽ chỉ thật sự tốt với ứng dụng cỡ tầm trung trở lên, đối với các **App** nhỏ, **Redux** khiến mọi thứ phức tạp và quá dài dòng. Ngoài ra, tại sao trước hết ta không thử áp dụng **Context** - một **API** mới của **React 16**.

Hãy nắm bắt thật tốt và vận dụng linh hoạt cách mà **React** hoạt động, thật sự **Think In React** sẽ giúp ta giải quyết được nhiều vấn đề hơn mà chúng ta tưởng, trước khi nghĩ đến việc sử dụng nhiều thư viện **third-party** cho ứng dụng của bạn.  
### 6. Refactor, Refactor và Refactor...
Việc chỉnh sửa và tối ưu mã **code** nhiều lần đem lại một lợi ích chung, không những giúp chúng ta nắm bắt **React** chắc chắn hơn, mà còn giúp nâng cao kinh nghiệm và kĩ năng xử lý vấn đề sau này.  
Chắc chắn bạn sẽ thay đổi cách nhìn nhận một vấn đề không chỉ một lần, tôi tin chắc rằng mặc dù ngày hôm nay chức năng **A** trong ứng dụng của bạn đã hoạt động tốt, ngay ngày mai khi nhìn lại, bạn sẽ tìm ra một vài điểm có thể chỉnh sửa để nó thực sự hoạt động tốt hơn, hay đơn giản bạn sẽ tìm ra cách giúp mã **code** ngắn gọn và dễ đọc hơn sau này, hãy cố gắng **refactor** nhiều lần mà không chỉ một, chỉ cần lưu ý rằng sau mỗi lần **refactor**, hãy kiểm tra thật kĩ lưỡng để đảm bảo việc đó không làm phát sinh **bugs**, đừng ngần ngại rằng việc **refactor** sẽ gây mất thời gian, việc hạn chế các **bugs** tiềm ẩn đồng thời tối ưu khả năng đọc và bảo trì qua quá trình **refactor** thực sự sẽ đáng giá hơn rất rất nhiều thời gian bạn bạn bỏ ra cho công việc đó.  

Trên đây là một vài tips mình muốn chia sẻ với các **Dev** đã và đang làm việc với hệ sinh thái **Reactjs**, tham khảo từ bài viết [The most important lessons I’ve learned after a year of working with React](https://medium.freecodecamp.org/mindset-lessons-from-a-year-with-react-1de862421981), cảm ơn đã đọc bài viết.