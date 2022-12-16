## ReactJS HOC(Higher Order Component) là gì ?

* **HOC (Higher Order Component)**  đơn giản là một component nhận đầu vào là một component và trả về là một component khác.
* Tất cả trong React đều là component. Và ở một số trường hợp HOC giúp chúng ta tránh việc lặp code và sử dụng lại logic cho nhiều component khác nhau.
* HOC giống như một dịch vụ mà khi cần chúng ta gọi nó để giúp chúng ta một việc gì đó. Ví dụ như dịch vụ nâng cấp máy tính, khi bạn giao máy tính của bạn cho một cưa hàng thì họ sẽ nâng cấp ổ cứng, hay RAM, card đồ hoạ cho máy tính của bạn.

**Giả sử như:**
```
const mayTinhCoSSD = dichVuSuaChua(mayTinhCuaBan)
```

* Như ví dụ này component dichVuSuaChua là một HOC trong React. Nó nhận vào một máy tính và trả về một máy tính có SSD
* Trong thực tế khi phát triển sản phẩm React, chúng ta hay lặp code một số chỗ và HOC sẽ giúp chúng ta sử dụng lại những logic đó một cách hiệu quả.
* Một HOC trong React thường có dạng như sau:

```
import React from 'react';
const higherOrderComponent = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return <WrappedComponent />;
    }
  }
  return HOC;
};
 
```


* Một ví dụ đơn giản là chúng ta muốn thêm một props cho tất cả những component là secretThing.

Chúng ta có thể viết một HOC như sau:
```

import React from 'react';
 
const withSecretToLife = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
          secretThing={42}
        />
      );
    }
  }
    
  return HOC;
};
 
export default withSecretToLife;
```

Và chúng ta sử dụng HOC withSecretToLife như sau:
```

import React from 'react';
import withSecretToLife from 'components/withSecretToLife';
 
const DisplayTheSecret = props => (
  <div>
    The secret to life is {props.secretThing}.
  </div>
);
 
const WrappedComponent = withSecretToLife(DisplayTheSecret);
export default WrappedComponent;
```
* Chú ý rằng, HOC không chỉnh sửa component ban đầu (Wrapper Component), mà nó chỉ bọc component gốc trong một Container. Sau đó nó sẽ truyền thêm một số data, props xuống cho Wrapped Component.
* HOC không quan tâm dữ diệu được sử dụng như thế nào. Cũng như Wrapped Component không quan tâm data, props đến từ đâu. Nó chỉ việc gọi HOC và xài dữ liệu được truyền từ HOC.
* HOC nên là một pure function nên nó không được phép chỉnh sửa input, và không có side-effect.