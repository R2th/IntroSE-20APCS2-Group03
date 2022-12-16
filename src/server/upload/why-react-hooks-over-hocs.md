Bài viết được dịch từ nguồn: https://www.robinwieruch.de/react-hooks-higher-order-components

Trong React gần đây, mọi người đều sử dụng các function component với React Hooks. Tuy nhiên, khái niệm higher-order components (HOC) vẫn có thể áp dụng, vì chúng có thể được sử dụng cho class và function component. Do đó, chúng là cầu nối hoàn hảo để sử dụng các  reusable abstractions giữa các thành phần React cũ và mới.

Ngày nay, tôi vẫn là người ủng hộ higher-order components vì bản chất có thể kết hợp của component khiến tôi mê mẩn. Tuy nhiên, có những vấn đề với HOC không thể phủ nhận và hoàn toàn được giải quyết bằng React Hooks. Đây là lý do tại sao tôi muốn chỉ ra những vấn đề này, để các nhà phát triển có thể đưa ra quyết định sáng suốt xem họ muốn sử dụng HOC qua Hook cho các tình huống nhất định hay liệu họ chỉ muốn sử dụng React Hooks.

## HOCs vs Hooks: Prop Confusion

Hãy lấy higher-order components (HOC) sau đây được sử dụng condition rendering. Nếu có lỗi, nó sẽ hiển thị thông báo lỗi. Nếu không có lỗi, nó sẽ hiển thị thành phần đã cho:

```
import * as React from 'react';
 
const withError = (Component) => (props) => {
  if (props.error) {
    return <div>Something went wrong ...</div>;
  }
 
  return <Component {...props} />;
};
 
export default withError;
```

Lưu ý cách HOC chuyển tất cả các props đến component đã cho nếu không có lỗi. Mọi thứ sẽ hoạt động tốt theo cách này, tuy nhiên, có thể có quá nhiều props được chuyển cho component tiếp theo mà không nhất thiết phải quan tâm đến tất cả chúng.

Ví dụ: có thể component tiếp theo hoàn toàn không quan tâm đến lỗi, do đó, cách tốt hơn là loại bỏ lỗi bằng toán tử rest khỏi props trước khi chuyển tiếp props đến component tiếp theo:

```
import * as React from 'react';
 
const withError = (Component) => ({ error, ...rest }) => {
  if (error) {
    return <div>Something went wrong ...</div>;
  }
 
  return <Component {...rest} />;
};
 
export default withError;
```

Phiên bản này cũng sẽ hoạt động, ít nhất là nếu component đã cho không cần chống lỗi. Tuy nhiên, cả hai phiên bản này của HOC đều đã cho thấy vấn đề nổi lên là nhầm lẫn khi sử dụng HOC. Hầu hết các props chỉ được chuyển qua HOC bằng cách sử dụng toán tử spread và chỉ được sử dụng một phần trong chính HOC. Thường thì không rõ ngay từ đầu liệu component đã cho có cần tất cả các props được cung cấp cho HOC (phiên bản đầu tiên) hay chỉ tốt với một phần props (phiên bản thứ hai).

Đó là cảnh báo đầu tiên của việc sử dụng HOC; điều này nhanh chóng không thể đoán trước được khi sử dụng nhiều HOC được ghép vào nhau, bởi vì khi đó người ta không chỉ phải xem xét props nào cần thiết cho component nhất định mà còn cả props nào cần thiết cho các HOC khác. Ví dụ: giả sử chúng ta có một HOC khác để hiển thị chỉ báo tải có điều kiện:

```
import * as React from 'react';
 
const withLoading = (Component) => ({ isLoading, ...rest }) => {
  if (isLoading) {
    return <div>Loading ...</div>;
  }
 
  return <Component {...rest} />;
};
 
export default withLoading;
```

Cả HOC, withError và withLoading đều được tạo trên một component. Khi component này được sử dụng, nó có thể trông giống như sau:

```
const DataTableWithFeedback = compose(
  withError,
  withLoading,
)(DataTable);
 
const App = () => {
  ...
 
  return (
    <DataTableWithFeedback
      columns={columns}
      data={data}
      error={error}
      isLoading={isLoading}
    />
  );
};
```

Nếu không biết chi tiết triển khai của HOC, bạn có biết props nào được HOC sử dụng và props nào dành riêng cho component cơ bản không? Không rõ props nào thực sự được chuyển qua component DataTable thực tế và props nào được HOC sử dụng trên đường đi.

Hãy làm ví dụ này thêm một bước nữa, bằng cách giới thiệu một HOC khác để tìm nạp dữ liệu trong đó chúng tôi không hiển thị chi tiết triển khai:

```
const DataTableWithFeedback = compose(
  withFetch,
  withError,
  withLoading,
)(DataTable);
 
const App = () => {
  ...
 
  const url = 'https://api.mydomain/mydata';
 
  return (
    <DataTableWithFeedback
      url={url}
      columns={columns}
    />
  );
};
```

Đột nhiên, chúng tôi không cần dữ liệu, isLoading và lỗi nữa, vì tất cả thông tin này được tạo trong withFetch HOC mới bằng cách sử dụng url. Tuy nhiên, điều thú vị là isLoading và lỗi, trong khi được tạo bên trong withFetch HOC, sẽ được xử lý bằng withLoading và withError. Mặt khác, dữ liệu được tạo (được tìm nạp tại đây) từ withFetch sẽ được chuyển cho component DataTable bên dưới.

```
App     withFetch   withError   withLoading   DataTable
 
        data->      data->      data->        data
url->   error->     error
        isLoading-> isLoading-> isLoading
```

Hãy xem thứ tự cũng quan trọng như thế nào: withFetch cần phải là HOC bên ngoài trong khi withLoading và withError tuân theo mà không có bất kỳ thứ tự cụ thể nào ở đây, điều này tạo ra rất nhiều chỗ cho lỗi.

Tóm lại, tất cả các props này đến và đi từ HOC đều di chuyển bằng cách nào đó qua một hộp đen mà chúng ta cần kiểm tra kỹ hơn để thực sự hiểu props nào được tạo ra trên đường đi, props nào được xử lý trên đường đi và props nào được chuyển xuyên qua. Nếu không xem xét các HOC, chúng ta không biết nhiều về những gì xảy ra giữa các lớp này.

Cuối cùng, để so sánh, hãy xem cách React Hooks giải quyết vấn đề này với một - dễ hiểu từ góc độ sử dụng:

```
const App = () => {
  const url = 'https://api.mydomain/mydata';
  const { data, isLoading, error } = useFetch(url);
 
  if (error) {
    return <div>Something went wrong ...</div>;
  }
 
  if (isLoading) {
    return <div>Loading ...</div>;
  }
 
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
};
```

Khi sử dụng React Hooks, mọi thứ đều được sắp xếp: Chúng tôi thấy tất cả các props (url) đang đi vào "hộp đen" của chúng tôi (useFetch) và tất cả các props xuất phát từ nó (tại đây dữ liệu, isLoading, lỗi ). Mặc dù chúng tôi không biết chi tiết triển khai của useFetch, nhưng chúng tôi thấy rõ ràng đầu vào nào đi vào và đầu ra nào đi ra. Và mặc dù useFetch có thể được coi là một hộp đen giống như withFetch và các HOC khác, chúng tôi thấy toàn bộ API với React Hook này chỉ trong một dòng mã đơn giản.

Điều này không rõ ràng với HOC trước đây, vì chúng tôi không thấy rõ props nào là cần thiết (đầu vào) và props nào được sản xuất (đầu ra). Ngoài ra, không có các lớp HTML khác ở giữa, bởi vì chúng tôi chỉ sử dụng kết xuất có điều kiện trong thành phần mẹ (hoặc trong thành phần con).

## HOCs vs Hooks: Name Conflicts/Collision

Nếu bạn đặt cho một component có cùng tên hai lần, component sau sẽ ghi đè thành phần trước:

```
<Headline text="Hello World" text="Hello React" />
```

Khi sử dụng một component thuần túy như trong ví dụ trước, vấn đề này trở nên khá rõ ràng và chúng ta ít có khả năng vô tình ghi đè các props (và chỉ có chủ đích nếu chúng ta cần). Tuy nhiên, với HOC, điều này lại trở nên lộn xộn khi hai HOC vượt qua các props có cùng tên.

Minh họa dễ nhất cho vấn đề này là bằng cách tạo hai HOC giống hệt nhau trên đầu một thành phần:

```
const UserWithData = compose(
  withFetch,
  withFetch,
  withError,
  withLoading,
)(User);
 
const App = () => {
  ...
 
  const userId = '1';
 
  return (
    <UserWithData
      url={`https://api.mydomain/user/${userId}`}
      url={`https://api.mydomain/user/${userId}/profile`}
    />
  );
};
```

Thường các component cần tìm nạp từ nhiều điểm cuối API.

Như chúng ta đã tìm hiểu trước đây, withFetch HOC mong đợi một url cho việc tìm nạp dữ liệu. Bây giờ chúng tôi muốn sử dụng HOC này hai lần và do đó chúng tôi không thể thực hiện cả hai HOC nữa. Ngược lại, cả hai HOC sẽ chỉ hoạt động trên URL sau, điều này sẽ dẫn đến sự cố. Một giải pháp (và vâng, có nhiều giải pháp) cho vấn đề này sẽ là thay đổi withFetch HOC của chúng tôi thành một thứ gì đó mạnh mẽ hơn để thực hiện không chỉ một mà là nhiều yêu cầu:

```
const UserWithData = compose(
  withFetch,
  withError,
  withLoading,
)(User);
 
const App = () => {
  ...
 
  const userId = '1';
 
  return (
    <UserWithData
      urls={[
        `https://api.mydomain/user/${userId}`,
        `https://api.mydomain/user/${userId}/profile`,
      ]}
    />
  );
};
```

Giải pháp này có vẻ hợp lý, nhưng chúng ta hãy để vấn đề này: withFetch HOC, trước đây chỉ quan tâm đến một lần tìm nạp dữ liệu - dựa trên một lần tìm nạp dữ liệu này thiết lập các trạng thái cho isLoading và error - đột nhiên trở thành một con quái vật phức tạp. Có rất nhiều câu hỏi cần trả lời ở đây:

    Loading indicator có vẫn hiển thị mặc dù một trong các yêu cầu đã hoàn thành trước đó không?
    Toàn bộ component có hiển thị dưới dạng lỗi không nếu chỉ một yêu cầu không thành công?
    Điều gì xảy ra nếu một yêu cầu phụ thuộc vào một yêu cầu khác?
    ...
    
Mặc dù vậy, điều này làm cho HOC đã trở thành một HOC siêu phức tạp (nhưng mạnh mẽ) - nơi mà cá nhân tôi sẽ nói với tôi rằng nó quá mạnh - chúng tôi đã đưa ra một vấn đề khác trong nội bộ. Chúng tôi không chỉ gặp vấn đề khi truyền một sự trùng lặp (ở đây là url, chúng tôi đã giải quyết bằng url) tới HOC, mà HOC cũng sẽ xuất ra một sự trùng lặp (ở đây là dữ liệu) và chuyển nó đến component bên dưới.

Đó là lý do tại sao, trong trường hợp này, User compoennt phải nhận props dữ liệu đã hợp nhất - thông tin từ cả hai lần tìm nạp dữ liệu - hoặc phải nhận một mảng dữ liệu - trong khi mục nhập đầu tiên được đặt tương ứng với URL đầu tiên và URL thứ hai mục nhập tương ứng với URL thứ hai. Ngoài ra, khi cả hai yêu cầu không thực hiện song song, một mục nhập dữ liệu có thể bị trống trong khi mục nhập còn lại đã ở đó ...

Được chứ. Tôi không muốn tiếp tục sửa chữa điều này ở đây. Có những giải pháp cho vấn đề này, nhưng như tôi đã đề cập trước đó, nó sẽ dẫn đến việc làm cho withFetch HOC phức tạp hơn mức bình thường và tình huống về cách sử dụng dữ liệu được hợp nhất hoặc mảng dữ liệu trong component cơ bản không tốt hơn nhiều so với kinh nghiệm của nhà phát triển Góc nhìn cá nhân.

Hãy xem cách React Hooks giải quyết vấn đề này cho chúng ta bằng một đoạn code - dễ hiểu từ góc độ sử dụng:

```
const App = () => {
  const userId = '1';
 
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError
  } = useFetch(`https://api.mydomain/user/${userId}`);
 
  const {
    data: userProfileData,
    isLoading: userProfileIsLoading,
    error: userProfileError
  } = useFetch(`https://api.mydomain/user/${userId}/profile`);
 
  if (userError || userProfileError) {
    return <div>Something went wrong ...</div>;
  }
 
  if (userIsLoading) {
    return <div>User is loading ...</div>;
  }
 
  const userProfile = userProfileIsLoading
    ? <div>User profile is loading ...</div>
    : <UserProfile userProfile={userProfileData} />;
 
  return (
    <User
      user={userData}>
      userProfile={userProfile}
    />
  );
};
```

Bạn có thấy sự linh hoạt mà chúng tôi đạt được ở đây không? Chúng tôi chỉ quay lại sớm với chỉ báo loading nếu người dùng vẫn đang tải, tuy nhiên, nếu người dùng đã ở đó và chỉ có hồ sơ người dùng đang chờ xử lý, chúng tôi chỉ hiển thị một phần chỉ báo tải khi dữ liệu bị thiếu (ở đây cũng do sức mạnh của component cấu tạo). Tuy nhiên, chúng tôi có thể làm điều tương tự đối với lỗi, vì chúng tôi đã có được tất cả quyền về cách xử lý kết quả của các yêu cầu, chúng tôi có thể hiển thị cùng một thông báo lỗi cho cả hai lỗi. Nếu sau đó chúng tôi quyết định muốn xử lý cả hai lỗi theo cách khác nhau, chúng tôi có thể thực hiện điều này trong một component này chứ không phải trong phần trừu tượng của chúng tôi (cho dù đó là HOC hay Hook).

Rốt cuộc, và đó là lý do tại sao chúng tôi đi đến kết luận này ngay từ đầu, chúng tôi đã tránh va chạm đặt tên bằng cách đổi tên các biến xuất phát từ đầu ra của React Hooks trong cấu trúc đối tượng. Khi sử dụng HOC, chúng ta cần lưu ý về việc các HOC có thể sử dụng cùng tên cho các props trong nội bộ. Điều hiển nhiên là khi sử dụng cùng một HOC hai lần, nhưng điều gì sẽ xảy ra nếu bạn đang sử dụng hai HOC khác nhau - chỉ do ngẫu nhiên? Họ sẽ ghi đè dữ liệu của nhau và khiến bạn bối rối tại sao thành phần nhận của bạn không nhận được các props chính xác.

## HOCs vs Hooks: Dependencies

HOC rất mạnh, có lẽ quá mạnh? HOC có thể nhận đối số theo hai cách: Khi chúng nhận được các đạo cụ từ thành phần mẹ (như chúng ta đã thấy trước đây) và khi chúng tăng cường một thành phần. Hãy giải thích sau bằng ví dụ.

Sử dụng các HOC withLoading và withError của chúng tôi từ trước nhưng lần này mạnh hơn:

```
const withLoading = ({ loadingText }) => (Component) => ({ isLoading, ...rest }) => {
  if (isLoading) {
    return <div>{loadingText ? loadingText : 'Loading ...'}</div>;
  }
 
  return <Component {...rest} />;
};
 
const withError = ({ errorText }) => (Component) => ({ error, ...rest }) => {
  if (error) {
    return <div>{errorText ? errorText : 'Something went wrong ...'}</div>;
  }
 
  return <Component {...rest} />;
};
```

Với các đối số bổ sung này - ở đây được chuyển qua một hàm bậc cao xung quanh HOC - chúng tôi có thêm sức mạnh để cung cấp các đối số khi tạo thành phần nâng cao với HOC của chúng tôi:

```
const DataTableWithFeedback = compose(
  withError({ errorText: 'The data did not load' }),
  withLoading({ loadingText: 'The data is loading ...' }),
)(DataTable);
 
const App = () => {
  ...
 
  return (
    <DataTableWithFeedback
      columns={columns}
      data={data}
      error={error}
      isLoading={isLoading}
    />
  );
};
```

Điều này góp phần (1) tích cực và (2) tác động tiêu cực đến vấn đề Nhầm lẫn Dự đoán từ trước, bởi vì bây giờ chúng ta có (2) nhiều hơn một nơi mà HOC nhận được props (điều này không làm cho mọi thứ dễ hiểu hơn), nhưng sau đó, một lần nữa (1), chúng ta có thể tránh việc truyền đi phần hỗ trợ ngầm từ thành phần mẹ (nơi chúng tôi không biết liệu phần hỗ trợ này được HOC hay component bên dưới sử dụng hay không) và cố gắng chuyển các props ngay từ đầu khi tăng cường component thay thế.

Tuy nhiên, cuối cùng, các đối số này (ở đây là các đối tượng có errorText và loadingText) được truyền khi nâng cao thành phần là tĩnh. Chúng tôi không thể nội suy chúng với bất kỳ props nào từ thành phần mẹ ở đây, bởi vì chúng tôi đang tạo component được tổng hợp bên ngoài bất kỳ component nào. Ví dụ: trong ví dụ tìm nạp dữ liệu, chúng tôi sẽ không thể giới thiệu ID người dùng linh hoạt:

```
const UserWithData = compose(
  withFetch('https://api.mydomain/user/1'),
  withFetch('https://api.mydomain/user/1/profile'),
)(User);
 
const App = () => {
  ...
 
  return (
    <UserWithData
      columns={columns}
    />
  );
};
```

Mặc dù có nhiều cách để khắc phục điều này, nhưng nó không làm cho toàn bộ props này vượt qua dễ hiểu hơn:

```
const UserWithData = compose(
  withFetch(props => `https://api.mydomain/user/${props.userId}`),
  withFetch(props => `https://api.mydomain/user/${props.userId}/profile`),
)(User);
 
const App = () => {
  ...
 
  const userId = '1';
 
  return (
    <UserWithData
      userId={userId}
      columns={columns}
    />
  );
};
```

Làm cho kịch bản này trở nên phức tạp hơn bằng cách thêm một thử thách khác: Điều gì sẽ xảy ra nếu yêu cầu thứ hai phụ thuộc vào yêu cầu đầu tiên? Ví dụ: yêu cầu đầu tiên trả về người dùng theo ID và yêu cầu thứ hai trả về hồ sơ của người dùng dựa trên profileId mà chúng tôi chỉ nhận được với yêu cầu đầu tiên:

```
const UserProfileWithData = compose(
  withFetch(props => `https://api.mydomain/users/${props.userId}`),
  withFetch(props => `https://api.mydomain/profile/${props.profileId}`),
)(UserProfile);
 
const App = () => {
  ...
 
  const userId = '1';
 
  return (
    <UserProfileWithData
      columns={columns}
      userId={userId}
    />
  );
};
```

Chúng tôi đã giới thiệu hai HOC được kết hợp chặt chẽ ở đây. Trong một giải pháp khác, chúng tôi có thể đã tạo một HOC mạnh mẽ để giải quyết vấn đề này cho chúng tôi. Tuy nhiên, điều này cho chúng ta thấy rằng rất khó để tạo các HOC phụ thuộc vào nhau.

Ngược lại, hãy xem lại cách giải quyết mớ hỗn độn này bằng React Hooks:

```
const App = () => {
  const userId = '1';
 
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError
  } = useFetch(`https://api.mydomain/user/${userId}`);
 
  const profileId = userData?.profileId;
 
  const {
    data: userProfileData,
    isLoading: userProfileIsLoading,
    error: userProfileError
  } = useFetch(`https://api.mydomain/user/${profileId}/profile`);
 
  if (userError || userProfileError) {
    return <div>Something went wrong ...</div>;
  }
 
  if (userIsLoading || userProfileIsLoading) {
    return <div>Is loading ...</div>;
  }
 
  return (
    <User
      user={userData}>
      userProfile={userProfileData}
    />
  );
};
```

Bởi vì React Hooks có thể được sử dụng trực tiếp trong một component, chúng có thể tích hợp với nhau và thật dễ dàng để truyền dữ liệu từ hook này sang hook khác nếu chúng phụ thuộc vào nhau. Cũng không có hộp đen thực sự nữa, bởi vì chúng ta có thể thấy rõ ràng thông tin nào cần được chuyển đến các hook tùy chỉnh này và thông tin nào xuất phát từ chúng. Khi sử dụng React Hooks phụ thuộc vào nhau, các phụ thuộc sẽ rõ ràng hơn so với sử dụng HOC.

Sau đó, tôi vẫn là một fan hâm mộ lớn của HOC để che chắn sự phức tạp khỏi các component (ví dụ: kết xuất có điều kiện, các tuyến được bảo vệ). Nhưng như những kịch bản cuối cùng này đã chỉ ra, chúng không phải lúc nào cũng là giải pháp tốt nhất. Do đó, đề xuất của tôi sẽ sử dụng React Hooks thay thế.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn