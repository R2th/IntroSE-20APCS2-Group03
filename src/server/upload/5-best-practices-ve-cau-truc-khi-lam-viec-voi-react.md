# Mở đầu
Có lẽ ta không cần phải nghi ngờ gì nữa về việc React đã tạo ra môt cuộc cách mạng trong cách mà chúng ta xây dựng các giao diện cho người dùng. Giờ đây chúng thật dễ để học và tạo điều kiện tuyệt vời cho phép ta tạo ra những component có khả năng sử dụng lại được ở nhiều chỗ, giúp cho trang web của bạn có một giao diện đồng nhất.

Tuy nhiên, vì React chỉ đảm nhiệm các công việc ở tầng view trong của một ứng dụng, nên React không bắt buộc ta phải tuân theo một kiến trúc cụ thể nào (như MVC hay MVVM). Điều này có thể sẽ khiến cho ta gặp khó trong việc giữ cho code được tổ chức, sắp xếp một cách hợp lý khi Project React ngày càng lớn.

Tại công ty của tác giả bài viết [9elements](https://9elements.com/), nơi chính tác giả là CEO, sản phẩm hàng đậu của họ là [PhotoEditorSDK](https://www.photoeditorsdk.com/?utm_source=Sitepoint&utm_medium=article&utm_campaign=sitepoint-react-best-practices-2018) - một ứng dụng React quy mô lớn. Tác giả cùng với team đã chọn ra và cung cấp cho chúng ta một số Best practices mà họ đúc kết được trong việc tổ chức một ứng dụng React quy mô lớn.

# 1. Cấu trúc thư mục dự án
Thông thường thì code cho việc tạo style và code cho các component được tách riêng biệt ra các thư mục khác nhau. Tất cả các style được viết vào một file CSS dùng chung chia sẻ trong Project. Component được tách rời khỏi file chứa style của nó. Ở ví dụ dưới đây component `FilterSlider` được để ở thư mục component, style của nó được viết vào file `photo-editor-sdk.scss` và được đặt trong thư mục `styles`

```
├── components
│   └── FilterSlider
│       ├──  __tests__
│       │   └── FilterSlider-test.js
│       └── FilterSlider.jsx
└── styles
    └── photo-editor-sdk.scss
```

Sau rất nhiều lần refactor, một kinh nghiệm đã được rút ra rằng phương pháp tiếp cận trên sẽ không tốt khi dự án ngày càng được mở rộng. Trong tương lai, các component của ta sẽ cần phải được chia sẻ giữa các module trong dự án, hay giữa các dự án liên quan đến nhau. Vì vậy mà đội ngũ của tác giả đã chuyển sang sử dụng cách tổ chức thư mục lấy component làm trung tâm.

```
components
    └── FilterSlider
        ├── __tests__
        │   └── FilterSlider-test.js
        ├── FilterSlider.jsx
        └── FilterSlider.scss
```

Ý tưởng ở đây là tất cả những đoạn code, style thuộc về một component (Ví dụ: JavaScript, CSS, assets, tests...)
đều được đặt trong một trong folder. Điều này sẽ giúp chúng ta dễ dàng tách code ra để gói thành một npm module hoặc, trong trường hợp đang vội hay cần gấp, có thể chia sẻ folder này cho các dự án khác một cách đơn giản.

## Import các component
Một nhược điểm của cách tổ chức thư mục trên đó là khi phải import một component nào đó, ta buộc phải import đầy đủ đường dẫn sao cho hợp lệ, như sau:

```
import FilterSlider from 'components/FilterSlider/FilterSlider'
```

Nhưng có lẽ ai cũng muốn viết kiểu này hơn:

```
import FilterSlider from 'components/FilterSlider'
```

Một giải pháp đơn giản, ngây thơ cho vấn đề này đó là đổi tên file chính của component thành `index.js`:

```
components
    └── FilterSlider
        ├── __tests__
        │   └── FilterSlider-test.js
        ├── FilterSlider.scss
        └── index.jsx
```

Nhưng thật không may rằng, khi phải debug các React Component trên trình duyệt Chrome và khi các lỗi xảy ra, Debugger sẽ show ra cho bạn hàng loạt các file cùng tên `index.js` và đó là một lý do khiến ta không nên lựa chọn phương pháp.

Một giải pháp khác đó là sử dụng *[directory-named-webpack-plugin](https://www.npmjs.com/package/directory-named-webpack-plugin)*. Plugin này tạo ra một quy luật nhỏ cho webpack resolver, giúp webpack có thể tìm thấy một file JavaScript hoặc JSX có tên trùng với tên thư mục mà nó đang được import. Nhưng nhược điẻm của phương pháp này đó là thư mục vendor sẽ bị gắn liền với webpack. Đó là một vấn đề với những người sử dụng **Rollup** để bundle các library. Và việc update lên các phiên bản webpack gần đây luôn là điều không dễ dàng chút nào.

Giải pháp cuối cùng được lựa chọn có một chút mở rộng, nhưng nó sử dụng một cơ chế resolve tiêu chuẩn của Node.js,
khiến mọi thứ trở nên chắc chắn hơn và tránh được các rủi ro tương lai. Tất cả những gì chúng ta cần làm là thêm một file `package.json` vào trong cấu trúc thư mục:

```
components
    └── FilterSlider
        ├── __tests__
        │   └── FilterSlider-test.js
        ├── FilterSlider.jsx
        ├── FilterSlider.scss
        └── package.json
```

Và ngay bên trong file `package.json`, ta sử dụng thuộc tính `main` để set đầu vào cho component, như sau:

```
{
  "main": "FilterSlider.jsx"
}
```

Với việc thêm như trên, chúng ta đã có thể import component như sau:
```
import FilterSlider from 'components/FilterSlider'
```

# 2. CSS trong Javascript
Tạo style và đặc biệt là tạo theme vẫn luôn là một trong những vấn đề khó mà ta phải đối mặt. Như đã để cập ở trên, thông thường ta hay sử dụng một file CSS (SCSS) đồ sộ chứa tất cả các class css. Và để tránh việc trùng lặp tên, ta thường sử dụng các prefix toàn cục và tuân theo *[BEM convention](https://www.sitepoint.com/css-architecture-block-element-modifier-bem/)* để đặt tên class. Khi ứng dụng ngày càng phát triển, phương pháp này có vẻ sẽ không phù hợp lắm và cần được thay thế. Sử dụng *[CSS modules](https://www.sitepoint.com/understanding-css-modules-methodology/)* là một trong những ý tưởng nhưng nó có thể gây ra một vài vấn đề về hiệu năng. Phương pháp tách CSS thông qua việc sử dụng *[Extract Text plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)* của webpack cũng tạo ra một sự phụ thuộc nặng nề vào webpack khiến cho việc test sau này rất khó khăn.

Sau đó, một vài giải pháp *CSS-in-JS* rất là mới cũng đã được xem xét qua:
* *[Styled Components](https://github.com/styled-components/styled-components)*: lựa chọn phổ biến nhất hiện nay với cộng đồng vô cùng lớn.
* *[EmotionJS](https://github.com/emotion-js/emotion)*: một đối thủ cạnh tranh với Style components.
* *[Glamorous](https://glamorous.rocks/)*: một giải pháp phổ biến khác.

Việc lựa chọn một trong các thư viện trên hoàn toàn phụ thuộc vào các trường hợp sử dụng của dự án:
1. Bạn có cần một thư viện có thể xuất ra một file CSS đã được compile cho môi trường production không? *EmotionJS* có thể làm được điều này.
2. Bạn có gặp phải vấn đề phức tạp trong việc tạo theme? *Styled Components* và *Glamorous* là bạn đồng hành phù hợp với bạn.
3. Bạn cần chúng phải hoạt động tốt trên server? Đây không còn là vấn đề nữa với những phiên bản gần đây của các thư viện trên.

Hầu hêt với các project, *Styled Components* thường được lựa chọn nhiều nhất bởi tính năng mạnh mẽ và cộng đồng vô cùng lớn của nó. Thư viện này vô cùng hữu ích, đặc biệt là khi bạn gặp phải vấn đề tạo theme vô cùng phức tạp.

## Cố gắng xây dựng các React Component chỉ đảm nhiệm một vai trò duy nhất
Khi xây dựng các component UI có tính trừu tượng cao, đôi khi rất là khó để có thể tách và lựa chọn các tiêu chí. Đến một thời điểm nào đó, component của bạn sẽ cần đến các logic nhất định từ model của bạn, và mọi thứ lúc này sẽ trở nên lộn xộn hơn. Ở các phần tiếp theo, một số phương pháp để DRY các component sẽ được giới thiệu. Các kĩ thuật dưới đây có thể sẽ trùng lặp về tính năng và việc lựa chọn kĩ thuật phù hợp cho kiến trúc của bạn thường phụ thuộc vào sở thích hơn thực tế. Nhưng hãy cùng lướt qua các trường hợp sử dụng trước:

* Khi cần một cơ chế làm việc với các component có nội dung khác nhau đối với người dùng đăng nhập/chưa đăng nhập.
* Khi cần render một table với nhiều phần tử `<tbody>` có thể collaspe.
* Khi cần hiển thị các component khác nhau phụ thuộc vào state.
Và các phần tiếp theo sẽ là giải pháp cho các vấn đề được miêu tả ở trên.

# 3. Higher-order Component (HOC)
Đôi khi bạn cần được đảm bảo rằng một React Component nào đó sẽ chỉ xuất hiện khi mà người dùng đã đăng nhập vào ứng dụng của bạn. Ban đầu, bạn sẽ thực hiện công việc kiểm tra này liên tục trong hàm `render` cho đến khi bạn nhận ra rằng mình đang lặp code rất là nhiều. Với nhiệm vụ phải DRY code của mình, sớm hay muộn bạn cũng sẽ nhận thấy rằng các *[higher-order component](https://www.sitepoint.com/react-higher-order-components/)* giúp cho bạn có thể tách và trừu tượng hóa một số tiêu chí của component. Theo thuật ngữ của phát triển phần mềm, higher-order component giống như một dạng của *decorator pattern*. Một higher-order component (HOC) chỉ đơn thuần là một hàm nhận một React component làm tham số và trả về một React component khác. Hãy nhìn vào ví dụ sau:

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function requiresAuth(WrappedComponent) {
  class AuthenticatedComponent extends Component {
    static propTypes = {
      user: PropTypes.object,
      dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { dispatch, user } = this.props;

      if (!user) {
        dispatch(push('/signin'));
      }
    }

    render() {
      return (
        <div className="authenticated">
          { this.props.user ? <WrappedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  AuthenticatedComponent.displayName = `Authenticated(${wrappedComponentName})`;

  const mapStateToProps = (state) => {
    return {
      user: state.account.user
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
```

Hàm `requiresAuth` nhận vào một component (WrappedComponent) là một tham số, component đó sẽ được "trang trí"  với những tính năng mong muốn. Bên trong hàm, class `AuthenticatedComponent` sẽ render ra component đó và thêm vào các tính năng để kiểm tra xem người dùng có tồn tại không, nếu không sẽ redirect sang trang đăng nhập. Cuối cùng, component này sẽ được kết nối tới `store` của Redux và return về. Redux rất là có ích trong ví dụ này, nhưng không phải nhất thiết phải cần tới nó.

# 4. Truyền hàm render vào component với `children` prop
Việc tạo ra một Row của Table có thể collaspe không phải là một task dễ dàng. Bạn sẽ render nút collaspe như thế nào? Bạn sẽ hiển thị children như thế nào khi table không collaspe? Với JSX 2.0 mọi thứ đã trở nên dễ dàng hơn một chút, giờ bạn đã có thể return một mảng thay vì duy nhất một html tag. Dưới đây cũng là một ví dụ để bạn có thể hiểu một chút về pattern `Function as children`. Hãy xem table dưới đây:

```
export default class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Just a table</th>
          </tr>
        </thead>
        {this.props.children}
      </table>
    );
  }
}
```

Và một table body có thể collapse

```
import React, { Component } from "react";

export default class CollapsibleTableBody extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <tbody>
        {this.props.children(this.state.collapsed, this.toggleCollapse)}
      </tbody>
    );
  }
}
You’d use this component in the following way:

<Table>
  <CollapsibleTableBody>
    {(collapsed, toggleCollapse) => {
      if (collapsed) {
        return (
          <tr>
            <td>
              <button onClick={toggleCollapse}>Open</button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>
              <button onClick={toggleCollapse}>Closed</button>
            </td>
            <td>CollapsedContent</td>
          </tr>
        );
      }
    }}
  </CollapsibleTableBody>
</Table>
```

Bạn chỉ cần đơn giản chuyền một function qua children, function được gọi trong hàm render của các component. Kĩ thuật này còn có thể được gọi là `render callback` hay trong các trường hợp đặc biệt `render prop`.

# 5. Render props
Thuật ngữ "render prop" được đặt ra bởi *Michael Jackson*, người đã gợi ý rằng pattern higher-order component lúc nào cũng có thể được thay thể bởi các component bình thường với một "render prop". Ý tưởng ban đầu là truyền một React component vào trong một hàm có thể gọi dưới dạng một thuộc tính và gọi hàm này ở trong hàm render.

Hãy nhìn đoạn code sau:

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Fetch extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };

  state = {
    data: {},
    isLoading: false,
  };

  _fetch = async () => {
    const res = await fetch(this.props.url);
    const json = await res.json();

    this.setState({
      data: json,
      isLoading: false,
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this._fetch);
  }

  render() {
    return this.props.render(this.state);
  }
}
```

Như bạn thấy, có một thuộc tính là `render`, là một function được gọi trong quá trình render. Hàm được gọi trong nó lấy về state hoàn chỉnh làm tham số của nó và trả về JSX. Và sau đây là công năng của nó:

```
<Fetch
  url="https://api.github.com/users/imgly/repos"
  render={({ data, isLoading }) => (
    <div>
      <h2>img.ly repos</h2>
      {isLoading && <h2>Loading...</h2>}

      <ul>
        {data.length > 0 && data.map(repo => (
          <li key={repo.id}>
            {repo.full_name}
          </li>
        ))}
      </ul>
    </div>
  )} />
```

Với đoạn code trên, tham số `data` và `isLoading` được destruct từ object state và được sử dụng để lấy về response của JSX. Trong trường hợp này, trong lúc promise chưa được fulfilled, thì một dòng "Loading" sẽ được hiển thị. Tùy thuộc vào bạn quyết định phần nào của state sẽ được truyền vào cho "render prop" và cách bạn sử dụng chúng cho giao diện của bạn. Vì `render prop` pattern là sự tổng quát của pattern `Function as children`, nên không có gì ngăn cản việc bạn có nhiều render props trong một component.

# Tham khảo
* https://www.sitepoint.com/react-architecture-best-practices/
* https://www.sitepoint.com/css-architecture-block-element-modifier-bem/
* https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c
* https://americanexpress.io/faccs-are-an-antipattern/