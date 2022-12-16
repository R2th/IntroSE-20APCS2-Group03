**Loading skeleton** là một hiệu ứng làm đẹp khi đang load dữ liệu giúp cho trang web trở nên sinh động và mượt mà hơn, các trang web hay ứng dụng nổi tiếng cũng đang dùng phương pháp loading này để làm đẹp trang web hay ứng dụng của mình, các bạn cùng xem những hình ảnh bên dưới nhé.

![](https://images.viblo.asia/11d878a0-565d-4440-8a2c-0ce4a8c80714.gif)

![](https://images.viblo.asia/4cc3826a-1318-41a6-9904-bd5f70736598.gif)

![](https://images.viblo.asia/d327895c-c0e8-4aeb-8afb-b5bcab346735.png)

![](https://images.viblo.asia/4dc9e89a-a151-44e2-998c-9b10948853bb.png)

## Dùng thư viện hỗ trợ react-loading-skeleton
### Cách sử dụng
Chúng ta sử dụng thư viện **react-loading-skeleton**. Cài đặt bằng npm hoặc yarn:

`npm install react-loading-skeleton`

hoặc

`yarn add react-loading-skeleton`

Import để sử dụng:
```
import Skeleton from 'react-loading-skeleton';
 
<Skeleton/> // Simple, single-line loading skeleton
<Skeleton count={5}/> // Five-line loading skeleton
```

### Nguyên tắc

`<Skeleton> `được thiết kế để được sử dụng trực tiếp trong các component của bạn thay cho nội dung trong khi nó vẫn đang tải. Không giống như các thư viện khác, không phải tỉ mỉ crafting từng skeleton màn hình để phù hợp với `font-size`, `line-height` hay `margin` của nội dung của mà `<Skeleton>` component sẽ tự động điều chỉnh chính xác các kích thước của nội dung.

Ví dụ:

```
class Blogpost extends Component {
  render() {
    return (
      <div style={{ fontSize: 20, lineHeight: 2 }}>
        <h1>{this.props.title || <Skeleton />}</h1>
        {this.props.body || <Skeleton count={10} />}
      </div>
    );
  }
}
```
... sẽ tạo ra các Skeleton có kích thước chính xác ứng với các phần header và body mà không cần thêm bất kỳ style nào của component.

Điều này đảm bảo trạng thái tải vẫn được cập nhật với bất kỳ thay đổi nào đối với bố cục hoặc kiểu chữ của bạn.

### Theming
Sử dụng `<SkeletonTheme>` component, bạn có thể dễ dàng thay đổi màu sắc của tất cả các skeleton components bên dưới nó trong hệ thống phân cấp của React:

```
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
 
<SkeletonTheme color="#202020" highlightColor="#444">
  <p>
    <Skeleton count={3} />
  </p>
</SkeletonTheme>;
```

### Duration
Là thời gian để thực hiện một chu kỳ animation của skeleton.

`<Skeleton duration={2} />`

Định dạng Duration là Number, có giá trị mặc định 1.2

### Width
Là chiều cao của skeleton. Hữu ích khi bạn không muốn điều chỉnh skeleton thành một text element, ví dụ như thẻ, ảnh hay avatar chẳng hạng.

`<Skeleton height={100} />`

Định dạng Height là Number | String | null, có giá trị mặc định là null.

### Circle
Là để làm cho bộ xương trông giống như một vòng tròn, ví dụ như khi bạn đang tạo một thẻ người dùng với một hình ảnh hồ sơ chẳng hạn.

`<Skeleton circle={true} height={50} width={50} />`

Định dạng Circle là Boolean | false, có giá trị mặc định là false

### Một số ví dụ hình ảnh có mà bạn có thể thực hiện được bằng thư viện này

![](https://images.viblo.asia/7bf17d7b-5c42-42df-b2c5-e9c751b5b1fc.jpg)

![](https://images.viblo.asia/a7ea7996-933d-4cae-a4cb-d27f3632846e.png)

![](https://images.viblo.asia/da109660-3273-4db1-b971-42423fc5f0cd.gif)

**Cảm ơn các bạn đã đọc.**