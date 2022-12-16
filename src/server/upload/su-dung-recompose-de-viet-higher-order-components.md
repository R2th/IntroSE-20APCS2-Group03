Nếu bạn muốn giữ mọi thứ đơn giản trong React, bằng cách tạo ra các component nhỏ và sử dụng chúng để tạo ra những component lớn hơn, thì recompose có thể giúp bạn làm điều đó với Higher-Order Components (HOCs).
Với cách tiếp cận của Recompose, bạn không cần phải dùng nhiều syntax Class để tạo các React component, 
Trước khi đi vào chi tiết, chúng ta sẽ xem lại khái niềm về Higher Order Component.

*Higher Order Component: Là một Function nhận params là một component và trả về một component mới.*

### Recompose

*Recompose là một tiện ích của React cho component và HOCs, nó tương tự với lodash cho React.
Nó cung cấp cho ta những methods mà ta có thể sử dụng để tối ưu tổ chức của dự án React.*

Cùng bắt đầu với những methods thường dùng nhất của Recompose:

* compose:  Với compose chúng ta có thể sắp xếp nhiều HOCs vào một HOC. Nếu như cứ dùng một Function của recompose ta lại phải định nghĩa một Function và rồi export nó thì sẽ rất bất tiện.
```
    import React from 'react';
    import { defaultProps, renameProps } from 'recompose' //import

    const enhance = defaultProps({
      counter: 0
    })

    const enhance1 = renameProps({
      counter: 'counterX'
    })

    const App = ({counterX}) => (
      <div>
        <h1>Demo Recompose {counterX}</h1>
      </div>
    );

    export default enhance(enhance1(App));
```
Hãy nhìn xem cú pháp của compose.

```
import { compose } from "recompose";

...

const ButtonWithTrack = compose(
  withState('times', 'setTimes', 0),
  withHandlerClick,
  withDisplayTrack
)(Button)
```

Sạch sẽ hơn và dễ đọc hơn đúng không ?

* WithState

```
   const enhance = withState('times', 'setTimes', 0);
```
Với phương thức này chúng sẽ thêm một state, một function handler set value cho state và giá trị khởi tạo ban đầu, 3 thứ trong một dòng lệnh, Recompose bắt đầu có ý nghĩa hơn rồi =))

* withHandlers: Phương thức này tạo ra 1 object các function handler. với mỗi một giá trị của object này sẽ được nhận giá trị là một Higher-Order Function, nhận props và trả về một function handler. Bằng cách này ta có thể tạo ra các Function handler có thể sử sụng các props của component.

```
    const enhance = compose(
      withState('value', 'updateValue', ''),
      withHandlers({
        onChange: props => event => {
          props.updateValue(event.target.value)
        },
        onSubmit: props => event => {
          event.preventDefault()
          submitForm(props.value)
        }
      })
    )
```

* lifecycle: Với method này chúng ta có thể tạo ra các method lifecycle của React

```
lifecycle({
    componentDidMount() {
      this.props.fetchData();
    },
    componentDidUpdate(prevProps) {
      #Do Something
    },
  })
```

Ngoài ra còn có thêm rất nhiều methods hữu dụng khác như mapsProps, DefaultProps, withContext ... mà có thể giúp ta rất nhiều trong việc tối ưu mã nguồn của một dự án React