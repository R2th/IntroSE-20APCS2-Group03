![](https://images.viblo.asia/94f8c227-5ac8-4ad0-a353-3394469b2ea1.png)

*Không, tôi đã không viết nó, nhưng tôi biết nó thu hút sự chú ý của bạn*


Bắt đầu với một công nghệ mới có thể khá rắc rối. Bạn thường thấy mình trong một biển các bài hướng dẫn và bài viết, theo sau là hàng triệu ý kiến cá nhân. Và mọi người đều tuyên bố rằng họ đã tìm thấy cách **đúng và hoàn hảo**.


Điều này khiến chúng ta tranh luận về việc liệu hướng dẫn được chọn của chúng ta sẽ lãng phí thời gian hay không.

Trước khi lặn xuống đại dương, chúng ta phải hiểu các khái niệm cơ bản của một công nghệ. Sau đó, chúng ta cần phát triển một tư duy dựa trên công nghệ. Nếu chúng ta bắt đầu học React, trước tiên chúng ta phải nghĩ về React. Chỉ sau này chúng ta mới có thể bắt đầu trộn nhiều suy nghĩ khác nhau thành một.

Trong bài viết này, chúng tôi sẽ đề cập đến một số bài học tôi học được về tư duy này từ những trải nghiệm cá nhân của tôi với React. Chúng tôi sẽ trải qua những ngày làm việc ngày đêm với các dự án cá nhân và thậm chí cả bài nói chuyện tôi đã đưa ra tại một sự kiện JavaScript địa phương.

So let’s go!

### React đang phát triển, nên bạn phải cập nhật thường xuyên

Nếu bạn nhớ thông báo ban đầu của phiên bản 16.3.0, bạn sẽ nhớ mọi người đã phấn khích như thế nào.

Dưới đây là một số thay đổi và cải tiến mà chúng tôi đã nhận được:

- Official Context API
- createRef API
- forwardRef API
- StrictMode
- Component Lifecycle Changes


Team React Core và tất cả những người đóng góp đang làm rất tốt khi cố gắng cải thiện công nghệ mà tất cả chúng ta đều ngưỡng mộ. Và trong phiên bản 16.4.0, chúng tôi đã nhận được [Pointer Events](https://reactjs.org/blog/2018/05/23/react-v-16-4.html) .

Những thay đổi tiếp theo chắc chắn sẽ đến và đó chỉ là vấn đề thời gian: Async Rendering, Caching, version 17.0.0 và nhiều thứ khác chưa được biết đến.

Vì vậy, nếu bạn muốn đứng đầu, bạn phải cập nhật những điều đang diễn ra trong cộng đồng.

Biết cách mọi thứ hoạt động và tại sao chúng đang được phát triển. Tìm hiểu những vấn đề đang được giải quyết và làm thế nào phát triển được thực hiện dễ dàng hơn. Nó thực sự sẽ giúp bạn rất nhiều.

### Don’t be afraid to split your code into smaller chucks


React là dựa trên component. Vì vậy, bạn nên tận dụng khái niệm này và không ngại chia những phần lớn hơn thành những phần nhỏ hơn.

Đôi khi một thành phần đơn giản có thể được tạo từ 4-5 dòng code, và trong một số trường hợp, nó hoàn toàn OK.

Làm cho nó để nếu một người mới nhảy vào, họ sẽ không cần nhiều ngày để hiểu mọi thứ hoạt động như thế nào.

```
// isn't this easy to understand?
return (
  [
   <ChangeButton
    onClick={this.changeUserApprovalStatus}
    text="Let’s switch it!"
   />,
   <UserInformation status={status}/> 
  ]
);
```

Bạn không cần phải tạo các components mà tất cả đều có tích hợp logic phức tạp. Chúng có thể chỉ là hình ảnh. Nếu điều này cải thiện khả năng đọc và kiểm tra code, và giảm code hơn nữa, đó là một điều tuyệt vời cho mọi người trong team.

```
import ErrorMessage from './ErrorMessage';
const NotFound = () => (
  <ErrorMessage
    title="Oops! Page not found."
    message="The page you are looking for does not exist!"
    className="test_404-page"
  />
);
```

Trong ví dụ trên, các properties  là tĩnh. Vì vậy, chúng ta có thể có một component thuần túy chịu trách nhiệm về thông báo lỗi của trang web `Not Found` và không có gì nữa.

Ngoài ra, nếu bạn không thích có các class CSS làm tên class ở mọi nơi, tôi khuyên bạn nên sử dụng các component styled. Điều này có thể cải thiện khả năng đọc khá nhiều.

```
const Number = styled.h1`
  font-size: 36px;
  line-height: 40px;
  margin-right: 5px;
  padding: 0px;
`;
//..
<Container>
  <Number>{skipRatePre}</Number>
  <InfoName>Skip Rate</InfoName>
</Container>
```

Nếu bạn sợ tạo thêm các component vì làm rối thư mục dự án của bạn với các file, hãy suy nghĩ lại về cách tổ chức code của bạn. Tôi đã sử dụng [cấu trúc fractal](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) và nó thật tuyệt vời.


### Don’t stick to the basics — become advanced

Đôi khi bạn có thể nghĩ rằng bạn không hiểu điều gì đó đủ để chuyển sang những thứ tiên tiến. Nhưng thường thì bạn không nên lo lắng về nó quá nhiều - hãy vượt qua thử thách và chứng minh rằng mình đã sai.

Bằng cách tiếp nhận các chủ đề nâng cao và thúc đẩy bản thân, bạn có thể hiểu thêm về những điều cơ bản và cách chúng được sử dụng cho những điều lớn hơn.

Có rất nhiều patterns mà bạn muốn khám phá:

-Compound Components
- High Order Components
- Render Props
- Smart/Dumb Components
- many others (try out Profiling)

Khám phá, tìm hiểu tất cả chúng, và bạn sẽ biết tại sao và nơi chúng được sử dụng. Bạn sẽ trở nên thoải mái hơn với React.

```
// looks like magic?
// it's not that hard when you just try
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

Ngoài ra, đừng ngại thử một cái gì đó mới trong công việc của bạn - tất nhiên là trong giới hạn nhất định! Đừng chỉ thử nghiệm trên các dự án cá nhân.

Mọi người sẽ đặt câu hỏi, và đó là bình thường. Nhiệm vụ của bạn là bảo vệ công việc và quyết định của mình bằng những lập luận mạnh mẽ.

Mục tiêu của bạn là để giải quyết một vấn đề hiện có, làm cho sự phát triển dễ dàng hơn hoặc chỉ cần làm clean code. Ngay cả khi đề xuất của bạn bị từ chối, bạn sẽ biết nhiều hơn là ngồi im lặng.

### Don’t over-complicate things

Điều này có vẻ giống như một đối số, nhưng nó khác nhau. Trong cuộc sống, và ở mọi nơi, chúng ta phải có sự cân bằng. Chúng ta không nên quá cầu toàn để thể hiện. Chúng ta phải thực tế. Viết code dễ hiểu và hoàn thành mục đích của nó.

Nếu bạn không cần Redux, nhưng bạn muốn sử dụng nó vì mọi người đều sử dụng mà không biết mục đích thực sự của mình. Hãy có ý kiến và đừng ngại phản biện nếu người khác thúc ép bạn.

Đôi khi bạn có thể nghĩ rằng bằng cách tận dụng các công nghệ mới nhất và viết mã phức tạp mà bạn đang nói với thế giới: 
“I’m not a junior, I am becoming a mid/senior. Look what can I do!”

Thực sự, đó là suy nghĩ của tôi khi bắt đầu hành trình phát triển của mình. Nhưng theo thời gian, bạn hiểu rằng code được viết mà không hiển thị hoặc bởi vì nó chạy rất dễ dàng.

- Đồng nghiệp có thể làm việc trong các dự án của bạn và bạn không phải là người duy nhất chịu trách nhiệm developing / fixing / testing `insert task`.
- Team có thể hiểu những gì người khác đã làm mà không cần ngồi qua một cuộc họp dài. Một vài phút là đủ để thảo luận.
- Khi đồng nghiệp của bạn đi nghỉ hai tuần, bạn có thể đảm nhận nhiệm vụ của họ. Và bạn sẽ không phải làm việc với nó trong 8 giờ, bởi vì nó có thể được thực hiện trong một giờ.

Mọi người tôn trọng những người làm cho cuộc sống của người khác dễ dàng hơn. Do đó, nếu mục tiêu của bạn là giành được sự tôn trọng, tăng thứ hạng và cải thiện, hãy nhắm đến code cho nhóm chứ không phải cho chính bạn.

Bạn sẽ trở thành tất cả mọi người.

### Refactor, refactor and refactor — it’s normal

Bạn sẽ thay đổi suy nghĩ nhiều lần, mặc dù người PM sẽ thay đổi chúng thường xuyên hơn. Những người khác sẽ chỉ trích công việc của bạn, và bạn sẽ chỉ trích nó. Do đó, bạn sẽ phải thay đổi code của mình nhiều lần.

Nhưng đừng lo lắng, đó là một quá trình học tập tự nhiên. Không có sai lầm và lỗi, chúng ta không thể trở nên tốt hơn.

Càng nhiều lần chúng ta ngã xuống, chúng ta càng dễ dàng trở lại.

Nhưng đây là một gợi ý: đảm bảo bạn kiểm tra phần mềm hiện tại của mình. Smoke, unit, integration, snapshot — don’t be shy of them.

Mọi người đều phải đối mặt hoặc sẽ đối mặt với một scenario khi một bài test có thể tiết kiệm thời gian quý báu.

Và nếu bạn, giống như nhiều người, nghĩ rằng họ là một sự lãng phí thời gian, chỉ cần thử suy nghĩ một chút khác biệt.

- Bạn sẽ không phải ngồi với đồng nghiệp của mình để giải thích cách mọi thứ hoạt động.
- Bạn sẽ không phải ngồi với đồng nghiệp giải thích lý do tại sao mọi thứ bị phá vỡ.
- Bạn sẽ không phải sửa lỗi cho đồng nghiệp của mình.
- Bạn sẽ không phải sửa các lỗi được tìm thấy sau 3 tuần.
- Bạn sẽ có thời gian để làm những thứ bạn muốn.


Và đó là những lợi ích khá lớn.

### If you love it, you’ll thrive

Trong năm trước, mục tiêu của tôi là trở nên tốt hơn với React. Tôi muốn nói về nó. Tôi muốn người khác thích nó với tôi.

Tôi có thể ngồi suốt đêm code không ngừng, xem nhiều cuộc nói chuyện khác nhau và tận hưởng từng phút của nó.

Vấn đề là, nếu bạn muốn một cái gì đó, bằng cách nào đó mọi người sẽ bắt đầu giúp bạn. Và tháng trước, lần đầu tiên tôi đã nói về React với đám đông 200 người.

Trong khoảng thời gian này, tôi trở nên mạnh mẽ và thoải mái hơn với React - các mô hình(patterns), dạng thức (paradigms) và hoạt động bên trong khác nhau. Tôi có thể có các cuộc thảo luận nâng cao và dạy cho những người khác về các chủ đề mà tôi sợ không muốn làm.

Và hôm nay tôi vẫn cảm thấy phấn khích và thích thú như tôi đã cảm thấy một năm trước.

Do đó tôi muốn khuyên mọi người nên tự hỏi: *Bạn có thích những gì bạn làm không?*

Nếu không, hãy tiếp tục tìm kiếm mảnh ghép đặc biệt mà bạn có thể nói trong nhiều giờ, tìm hiểu về nó mỗi tối và trở lên hạnh phúc.

Bởi vì chúng ta phải tìm một thứ gì đó gần với trái tim mình nhất. Thành công không thể bị ép buộc, nó phải đạt được.

Nếu tôi có thể quay ngược thời gian một năm, đây là những gì tôi sẽ nói với bản thân mình để chuẩn bị trước hành trình lớn sắp tới.

Cảm ơn bạn đã đọc!

Nếu bạn thấy bài viết này hữu ích,. 👏👏👏.

Tham khảo: https://medium.com/free-code-camp/mindset-lessons-from-a-year-with-react-1de862421981