![](https://images.viblo.asia/caea6f4a-a5e5-4136-9d72-a32a9f636d44.png)



Vì React chỉ là một thư viện, nó không quy định các quy tắc về cách bạn nên tổ chức và cấu trúc các dự án của mình.
Điều này khá hay, bởi vì chúng ta sự tự do để thử các cách tiếp cận khác nhau và thích nghi với những cách phù hợp hơn với chúng ta. Mặt khác, điều này có thể gây ra một số nhầm lẫn cho các nhà phát triển đang bắt đầu trong thế giới React.


Trong bài này, tôi sẽ giới thiệu một số cách tiếp cận mà tôi đã sử dụng một thời gian và đã mở rộng quy mô rất tốt. Những cách tiếp cận này không tạo lại một vòng luẩn quẩn, mà chỉ tập hợp và tinh chỉnh những gì chúng tôi có trên thị trường.

> Lưu ý: Không có gì được viết ở đây là cố đinh! Bạn chỉ có thể sử dụng các phương pháp bạn cho là có ý nghĩa và thích ứng/thay đổi để nó phù hợp với tình hình của bạn.


### Cấu trúc thư mục

Một trong những câu hỏi tôi thường thấy về cách cấu trúc file và thư mục. Trong bài viết này, chúng ta đang xem xét cấu trúc tối thiểu, như được tạo với `create-react-app`
Lệnh `create-react-app` tạo ra một dự án cơ bản cho chúng ta, bao gồm thư mục gốc root, các files:  .gitignore, package.json, README.md, yarn.lock

Nó cũng tạo ra các thư mục: public và src. Chúng ta hãy xem source code được tạo ra thế nào.

Hãy nhìn vào ảnh bên dưới, sẽ thấy cấu trúc được mô tả:

![](https://images.viblo.asia/b45cc92b-a2ca-4d1e-be5c-26aa46d123af.png)

Trong bài này, chúng ta tập trung vào thư mục `src`. Mọi thứ bên ngoài nó sẽ không thay đổi.

### Containers và Components

Có thể bạn đã thấy sự tách biệt giữa `Containers` và `Presentation` trong thư mục gốc của một số dự án. 
Ý tôi là, bên trong `src`, bạn có một thư mục có tên thư mục là `components` và một thư mục có tên là `containers`:
```
src
├─ components 
└─ containers
```

Tuy nhiên cách tiếp cân này có một số vấn đề như sau:

- **Quy tắc chủ thể** (Subjectives rules): Bạn không có quy tắc gì rõ ràng về `Container` và `Presentationnal Component`. 
Sự khác biệt giữa nhau có thể mang tính chủ quan và khi bạn ở trong một nhóm, nó sẽ rất khó để tất cả các devs đồng ý và đánh giá cùng quan điểm về vấn đề này.
- **Nó không xem xét tính năng động của các thành phần** (It doesn’t consider the dynamism of the components): Ngay cả khi bạn quyết định `component` phù hợp với một trong các loại cụ thể, thật dễ dàng để thay đổi nó trong suốt thời gian của dự án, trở thành các type và forcing bạn di chuyển từ `components` sang `containers` và ngược lại.
- **Cho phép 2 components có cùng tên** (Allow two components with the same name): Các components nên khai báo và có một trên duy nhất trong ứng dụng, để tránh nhầm lẫn về kết quả của một component. Tuy nhiên, cách tiếp cận trên mở ra một vi phạm để có hai thành phần có cùng tên, một là một container và khác là một presentational.
- **Mất năng suất** (Productivity loss): Bạn phải liên tục điều chỉnh giữa các thư mục `containers` và `components`, khi bạn làm việc với một feature. Vì thông thường, một tính năng duy nhất lại có `components` của 2 kiểu.

Ngoài ra còn có một biến thể của cách tiếp cận này, là giữ cho sự tách biệt này, nhưng bên trong các mô-đun.

Hãy tưởng tượng rằng bên trong ứng dụng của bạn, bạn có User module. Bên trong nó, bạn sẽ có hai thư mục để tách các thành phần của bạn:
```
src
└─ User
  ├─ components
  └─ containers
```

Với cách tiếp cận trên, sẽ giảm thiếu được điều hướng giữa các thư mục trong dự án. Tuy nhiên, nó phải thêm rất nhiều thư mục trong ứng dụng, và tạo ra rất nhiều thư mục có chứa `containers` và `components`.
Vì những lý do đó, khi chúng ta đang nói về việc tổ chức các thư mục và tệp, việc chia tách các thành phần của chúng ta bằng khái niệm `presentational ` vs `container` là không liên quan. Điều đó nói rằng, chúng tôi sẽ giữ tất cả các `components` bên trong thư mục `components`, ngoại trừ màn hình.


> Thậm chí không liên quan đến việc tách chúng trong các thư mục, điều quan trọng là phải biết sự khác biệt về khái niệm giữa một và khác. Nếu bạn vẫn có câu hỏi về chủ đề này, tôi khuyên bạn nên đọc bài viết: [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
 

### Separating and grouping the code

Trong thư mục `components`, chúng ta nhớm các file theo module/feature.

Trong một CRUD của người dùng, chúng ta có module User. Vậy cấu trúc sẽ như sau:
```
src
└─ components
  └─ User
    ├─ Form.jsx
    └─ List.jsx
```
Khi một component được tạo nên bởi nhiều hơn một tệp, chúng ta đặt component này và các file của nó trong một thư mục cùng tên. Vú dụ: bạn có một Form.css chứa các style của Form.jsx, trong trường hợp này bạn cấu trúc như sau:

```
src
└─ components
  └─ User
    ├─ Form
    │ ├─ Form.jsx
    │ └─ Form.css
    └─ List.jsx
```
> Các tập tin kiểm tra ở lại với tập tin đang được thử nghiệm. Trong trường hợp trên, kiểm tra cho Form.jsx sẽ ở trong cùng một thư mục và sẽ được đặt tên là Form.spec.jsx

### UI Components

Ngoài việc tách các thành phần theo các mô-đun, chúng ta cũng bao gồm một thư mục UI (giao diện người dùng) bên trong các `src/components`, để giữ tất cả các thành phần chung của chúng ta trong đó.

UI components là components chung để không phụ thuộc vào một module. Chúng là các thành phần mà bạn có thể giữ trong một thư viện nguồn mở, bởi vì chúng không có bất kỳ logic nghiệp vụ nào từ ứng dụng cụ thể. Ví dụ như các components: 
Buttons, Inputs, Checkboxes, Selects, Modals, Data display elements, ...


### Đặt tên components

Ở trên chúng ta đã thấy cách cấu trúc các thư mục và phân tách các thành phần của chúng ta bằng các mô-đun. Tuy nhiên, vẫn còn một câu hỏi: Làm thế nào để đặt tên cho chúng?

> Khi chúng ta đặt tên cho component, nó liên quan đến tên mà chúng ta cung cấp cho `class` hoặc `const` để định nghĩa một component:
> class MyComponent extends Component {
> }
> const MyComponent () => {};
 
Như đã đề cập ở trên, tên chúng ta đặt cho các components, nên rõ ràng và duy nhất trong ứng dụng, để cho chúng dễ tìm và tránh nhấm lẫn có thể xảy ra.

Tên một component là rất tiện dụng khi chúng ta cần gỡ lỗi bằng cách sử dụng các tool như `React Dev Tools`, và khi các lỗi run time xả ray trong ứng dụng. Lỗi luôn luôn đi kèm với tên thành phần nơi nó xảy ra.

Để đặt tên cho các thành phần, chúng ta thực hiện theo cách đặt tên `component` dựa trên đường dẫn, bao gồm việc đặt tên cho `component` tương ứng với đường dẫn tương đối của nó tới các thư mục `components` hoặc `src`, trong trường hợp bạn ở bên ngoài thư mục `components`. Về cơ bản, một component được đặt tại: `components/User/List.jsx` nên đặt tên là `UserList.jsx`.

Khi file nằm trong một thư mục có cùng tên, chúng ta không cần lặp lại tên. Điều đó nói rằng, `components/User/Form/Form.jsx`, nên đặt tên là `UserForm` chứ không nên đặt là `UserFormForm`.

Lợi ích của pattern trên có các lợi ích chúng ta thấy bên dưới:

#### Tạo thuận lợi cho việc tìm kiếm các file trong dự án.
Nếu editor bạn dùng có hỗ trợ fuzzy search, chỉ càn search tên `UserForm` sẽ tìm được đúng file bạn cần:

![](https://images.viblo.asia/58f36ffb-cc38-4ef9-8bb7-7e9dc61c8436.png)

Nếu bạn muốn search một file trọng một danh sách các thư mục lồng nhau, bạn có thể dễ dàng định hướng bằng tên các thành phần:

![](https://images.viblo.asia/af717c96-6ea2-4562-8310-4fe13d0ee113.png)


### Tránh lặp lại tên

Theo pattern, bạn sẽ luôn đặt tên file phù hợp với ngữ cảnh của nó. Xem xét form ở trên, chúng ta biết đó là user form, nhưng khi chúng ta đã ở trong thư mục User, chúng ta không cần lặp lại từ đó trong tên file thành phần. Nên chúng ta chỉ cần đặt là `Form.jsx`

Khi tôi bắt đầu làm việc với `React`, Tôi đã sử dụng full name trong file. Tuy nhiên, điều này bạn tạo nên sự lặp lại một tên nhiều lần và đường dẫn nhập trở lên quá lớn. Hãy xem xét sự khác biệt giữa các cách tiếp cận:
```
import ScreensUserForm from './screens/User/UserForm';
// vs
import ScreensUserForm from './screens/User/Form';
```

Trong ví dụ trên, bạn không thể thấy lợi thế từ cách tiếp cận này đến phương pháp khác. Nhưng ứng dụng ngày càng tăng, có thể thấy sự khác biệt. Hãy xem ví dụ bên dưới, xem xét một thành phần từ dự án mà tôi làm việc:

```
import MediaPlanViewChannel from '/MediaPlan/MediaPlanView/MediaPlanViewChannel.jsx';
// vs
import MediaPlanViewChannel from './MediaPlan/View/Channel';
```

Bây giờ hãy tưởng tượng điều này nhân với 5, với 10 lần một file.

Vì lý do đó, chúng tôi luôn đặt tên file cho phù hợp với ngữ cảnh của nó và thành phần phù hợp với vị trí tương đối của nó đối với các `components ` hoặc thư mục `src`.


### Screens

Màn hình, như tên đã mô tả, sẽ là màn hình mà chúng ta có trong ứng dụng.

Trong CRUD người dùng, chúng ta sẽ có màn hình cho danh sách người dùng, màn hình để tạo người dùng mới và màn hình để chỉnh sửa người dùng hiện có.

Màn hình là nơi bạn sử dụng các thành phần để soạn một trang cho ứng dụng. Lý tưởng nhất, màn hình sẽ không chứa bất kỳ logic nào và sẽ là một thành phần chức năng.

Chúng ta giữ các màn hình trong một thư mục riêng biệt trong thư mục gốc của `src`, vì chúng sẽ được nhóm lại theo định nghĩa tuyến đường chứ không phải theo mô-đun:

```
src
├─ components 
└─ screens
  └─ User
    ├─ Form.jsx
    └─ List.jsx
```

Xem xét dự án đang sử dụng `react-router`, chúng tôi giữ file `Root.jsx` bên trong thư mục `screen` và chúng tôi xác định trong đó tất cả các routes trong ứng dụng.

Code cho `Root.jsx` sẽ như sau:

```
import React, { Component } from 'react';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import ScreensUserForm from './User/Form';
import ScreensUserList from './User/List';

const ScreensRoot = () => (
  <Router>
    <Switch>
      <Route path="/user/list" component={ScreensUserList} />
      <Route path="/user/create" component={ScreensUserForm} />
      <Route path="/user/:id" component={ScreensUserForm} />
    </Switch>
  </Router>
);

export default ScreensRoot;
```

Lưu ý rằng chúng ta đặt tất cả các màn hình bên trong một thư mục có cùng tên của route, `user/ -> User/`. Cố gắng giữ một thư mục cho mỗi route, và nhóm các sub-routes trong đó. Trong trường hợp này, chúng ta đã tạo thư mục `User` và giữ màn hình `List` và màn hình `Form` trong đó. Pattern này giúp bạn dễ dàng tìm thấy màn hình nào đang hiển thị route, bằng cách chỉ xem url.

Một màn hình đơn có thể được sử dụng để hiển thị hai routes khác nhau, như chúng ta làm ở trên với các tuyến đường để tạo mới và chỉnh sửa người dùng.

Bạn có thể thấy rằng tất cả các `components` chứa Screen dưới dạng tiền tố trong tên của nó. Khi thành phần nằm bên ngoài `components`, chúng ta nên đặt tên nó cho phù hợp với đường dẫn tương đối của nó đến thư mục `src`. Một component có đường dẫn `src/screens/User/List.jsx` nên được đặt tên là `ScreensUserList`

Với `Root.jsx` được tạo, cấu trúc thư mục sẽ là:

```
src
├─ components 
└─ screens
  ├─ User
  │ ├─ Form.jsx
  │ └─ List.jsx
  └─ Root.jsx
```

> Đừng quên import `Root.jsx` bên trong `index.js` làm thành phần gốc của ứng dụng.


Trong trường hợp bạn vẫn còn nghi ngờ về một màn hình như thế nào, hãy xem ví dụ dưới đây, cho những gì sẽ là màn hình cho các form người dùng.

```
import React from 'react';
import UserForm from '../../components/User/Form/Form';

const ScreensUserForm = ({ match: { params } }) => (
  <div>
    <h1>
      {`${!params.id ? 'Create' : 'Update'}`} User
    </h1>
    <UserForm id={params.id} />
  </div>
);

export default ScreensUserForm;
```

Cuối cùng, ứng dụng của chúng ta sẽ được cấu trúc sau:

```
src
├─ components 
│  ├─ User
│  │ ├─ Form
│  │ │ ├─ Form.jsx
│  │ │ └─ Form.css
│  │ └─ List.jsx
│  └─ UI 
│
└─ screens
  ├─ User
  │ ├─ Form.jsx
  │ └─ List.jsx
  └─ Root.jsx
```


### Tóm lại
- Các components `Presentational` và `Container` sẽ được đặt ở `src/components`
- Các components được nhóm theo module/feature.
- Giữ các components bên trong `src/components/UI`
- Giữ các `screens` đơn giản, tối giản cấu trúc và code
- Nhóm các `screens` phù hợp theo route đã định nghĩa. Như route `user/list` là dành cho đường dẫn `/src/screens/User/List.jsx`.
- Components là được đặt tên phù hợp tương ứng với đường dẫn tương đối của nó với `components` hay `src`. Như một component tại `src/components/User/List.jsx` nên đặt tên là `UserList`. Component tại `src/screens/User/List` nên đặt tên là `ScreensUserList`.
- Componets nằm trong một thự mục có cùng tên, không lặp lại tên trong một component. Như một component tại `src/components/User/List/List.jsx` nên đặt là `UserList` chứ KHÔNG được đặt là `UserListList`.


### Kết luận

Các mẹo trên chỉ bao gồm một phần từ tổ chức và cấu trúc của một dự án. Tôi đã cố gắng để giữ nó về React và để lại Redux cho một bài đăng trong tương lai.

Còn bạn thì sao? Bạn có cách tổ chức khác thì share với chúng tôi, bằng cách viết comment bên dưới, Tôi thích điều đó.

Bạn đọc thấy thế nào? Nếu OK hãy giúp chúng tôi bằng cách like và share bài này nhé. <3 ;)




#### Tham khảo

- https://hackernoon.com/structuring-projects-and-naming-components-in-react-1261b6e18d76
- https://reactjs.org/