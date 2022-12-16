### 4. Creating Wrapper Components with children

Trong bước này, bạn sẽ tạo một wrapper component, có thể gộp nhóm component không xác định làm prop. Điều này sẽ cung cấp cho bạn khả năng lồng ghép các components như HTML tiêu chuẩn và nó sẽ cung cấp cho bạn một pattern để tạo các wrappers có thể tái sử dụng cho phép bạn tạo nhiều components khác nhau cần thiết kế chung nhưng có nội thất linh hoạt. React cung cấp cho bạn một prop tích hợp có tên là children để gom bất kỳ component con nào. Sử dụng điều này làm cho việc tạo các component của wrapper trở nên trực quan và dễ đọc.

Để bắt đầu, hãy tạo một component mới có tên là Card. Đây sẽ là một wrapper component để tạo ra một style tiêu chuẩn cho bất kỳ card component mới nào.

Tạo một thư mục:  mkdir src/components/Card
tạo file: touch src/components/Card/Card.js

Tạo một component lấy children và title làm props và bọc chúng trong một div bằng cách thêm code sau

```
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ children, title }) {
  return(
    <div className="card">
      <div className="card-details">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  title: PropTypes.string.isRequired,
}
```

PropTypes của children là mới. Children prop có thể là một phần tử JSX hoặc một mảng các phần tử JSX. Title là một chuỗi.

Thêm style cho card
Touch src/components/Card/Card.css

```
.card {
    border: black solid 1px;
    margin: 10px;
    padding: 10px;
    width: 200px;
}

.card-details {
    border-bottom: gray solid 1px;
    margin-bottom: 20px;
}
```

Bây giờ bạn đã có component cần sử dụng. Bạn có thể wrap mỗi card AnimalCard với card component trong App.js, nhưng vì tên AnimalCard ngụ ý rằng nó đã là một Card, nên tốt hơn là sử dụng card component bên trong AnimalCard.

Không giống như các props khác, bạn không truyền children một cách rõ ràng. Thay vào đó, bạn include JSX như thể chúng là các children element của HTML. Nói cách khác, bạn chỉ cần lồng chúng vào bên trong element, như sau:
File: src/components/AnimalCard/AnimalCard.js

Sửa lại như sau: 

```
import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import AnimalDetails from '../AnimalDetails/AnimalDetails';

export default function AnimalCard({ name, size, ...props }) {
  return(
    <Card title="Animal">
      <h3>{name}</h3>
      <div>{size}kg</div>
      <AnimalDetails
        {...props}
      />
    </Card>
  )
}

AnimalCard.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}
```

Không giống như một thành phần React, bạn không cần phải có một phần tử root duy nhất như là child. Đó là lý do tại sao PropType của Card chỉ định nó có thể là một mảng các phần tử hoặc một phần tử đơn lẻ. Ngoài việc chuyển các children dưới dạng nested components bạn đang đặt cho tiêu đều của Animal.

F5 lại trình duyệt bạn sẽ thấy card component được cập nhật.

![](https://images.viblo.asia/f6e14d30-5420-4d26-bc9d-6af731caa31b.png)


Bây giờ bạn có một component Card có thể tái sử dụng, có thể lấy bất kỳ số lượng nested children nào. Ưu điểm chính của việc này là bạn có thể sử dụng lại Card với bất kỳ component tùy ý nào. Nếu bạn muốn tạo Plant Card, bạn có thể làm điều đó bằng cách wrapping thông tin plant với Card component. Nếu bạn muốn sử dụng lại Card component trong một ứng dụng khác có liệt kê những thứ như nhạc hoặc dữ liệu tài khoản, bạn cũng có thể làm điều đó. Thành phần card không quan tâm children là gì; bạn đang sử dụng lại phần tử wrapper, trong trường hợp này là border và title được style.
Nhược điểm của việc sử dụng children là bạn chỉ có thể có một ví dụ về children prop. Đôi khi, bạn sẽ muốn một component có JSX custom ở nhiều nơi. May mắn thay, bạn có thể làm điều đó bằng cách chuyển các component JSX và React làm prop, sẽ đề cập trong bước tiếp theo.

### 5. Passing Components as Props


Trong bước này, bạn sẽ sửa đổi Card component để lấy các component khác làm prop. Điều này sẽ cung cấp cho component của bạn sự linh hoạt tối đa hiển thị các component không xác định hoặc JSX ở nhiều vị trí trên toàn bộ trang. Không giống như children, bạn chỉ có thể sử dụng một lần, bạn có thể có nhiều component làm prop, giúp wrapper component có khả năng thích ứng với nhiều nhu cầu khác nhau trong khi vẫn giữ được giao diện và cấu trúc chuẩn.

Sau bước này, bạn sẽ có một component có thể wrap các children component và cũng hiển thị các component khác trong card. Mẫu này sẽ cung cấp cho bạn sự linh hoạt khi bạn cần tạo các component cần thông tin phức tạp hơn các chuỗi và số nguyên đơn giản.

Hãy sửa đổi Card component để lấy một phần tử React tùy ý được gọi đến detail.
Mở file nano src/components/Card/Card.js

```
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ children, details, title }) {
  return(
    <div className="card">
      <div className="card-details">
        <h2>{title}</h2>
        {details}
      </div>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  details: PropTypes.element,
  title: PropTypes.string.isRequired,
}

Card.defaultProps = {
  details: null,
}
```

Prop này sẽ có cùng loại với children, nhưng nó phải là optional. Để có optional, bạn thêm giá trị mặc định là null. Trong trường hợp này, nếu người dùng không chuyển thông tin chi tiết, component sẽ vẫn có giá trị và sẽ không hiển thị thêm bất kỳ thứ gì.

![](https://images.viblo.asia/dc6560f4-5b88-473e-aea0-0b5913d62a81.png)

```
import React from 'react';
...

export default function AnimalCard({ name, size, ...props }) {
  return(
    <Card title="Animal" details={<em>Mammal</em>}>
      <h3>{name}</h3>
      <div>{size}kg</div>
      <AnimalDetails
        {...props}
      />
    </Card>
  )
}
...
```
![](https://images.viblo.asia/3ca54ef2-44cb-43e8-a42e-5fa20cbd416e.png)

F5 trình duyệt và bạn sẽ thấy cập nhật như sau:

```
import React from 'react';
...

export default function AnimalCard({ name, size, ...props }) {
  return(
    <Card
      title="Animal"
      details={
        <AnimalDetails
          {...props}
        />
      }
    >
      <h3>{name}</h3>
      <div>{size}kg</div>
    </Card>
  )
}
...
```

AnimalDetails phức tạp hơn và có một số dòng đánh dấu. Nếu bạn thêm nó trực tiếp vào details, nó sẽ làm tăng đáng kể prop và gây khó đọc.

F5 trình duyệt sẽ có thông tin chi tiết sẽ xuất hiện ở đầu card.

![](https://images.viblo.asia/6eda0b79-8a2e-4477-b47b-5e0f2c6d3e8b.png)

Bây giờ bạn có card component có thể lấy JSX tùy chỉnh và đặt nó ở nhiều vị trí. Bạn không bị giới hạn ở một prop; bạn có thể chuyển các elenment cho bao nhiêu prop tùy thích. Điều này cung cấp cho bạn khả năng tạo các wrap component linh hoạt có thể mang lại cho các nhà phát triển khác cơ hội tùy chỉnh một component trong khi vẫn giữ được style và chức năng tổng thể của nó.

Chuyển một componet làm prop không phải là hoàn hảo. Nó khó đọc hơn một chút và không rõ ràng như những children đang chuyền nhau, nhưng chúng rất linh hoạt và bạn có thể sử dụng bao nhiêu tùy thích trong một component. Bạn nên sử dụng children trước, nhưng đừng ngần ngại quay lại với prop nếu điều đó là không đủ.

Trong bước này, bạn đã học cách chuyển các component JSX và React làm prop cho component khác. Điều này sẽ cung cấp cho component của bạn sự linh hoạt để xử lý nhiều tình huống trong đó một thành phần trình wrapper component có thể cần nhiều prop để xử lý JSX hoặc components