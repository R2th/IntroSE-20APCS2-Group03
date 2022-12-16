# Giới thiệu
Trong ứng dụng **React** của bạn thì **Props** là một phần khá quan trọng trong việc trao đổi thông tin giữa các **React Component**, thông thường khi bạn sử dụng **props** thì chúng thường phải có những kiểu dữ liệu nhất định. Khi ứng dụng của bạn ngày một lớn thì việc kiểm soát được những dữ liệu truyền qua lại giữa các **components** sẽ khó hơn, dễ sinh bug trong ứng dụng nếu chúng không validate(xác thực) cho chúng.

Việc **validate props** cho phép chúng ta kiểm tra được dữ liệu đầu vào trước khi **components** được render từ đó mà chúng ta cũng sẽ giảm thiểu được việc phát sinh những bug không mong muốn.

Nếu ai chưa biết **props** là gì có thể xem qua bài viết này để hình dung được **props** là gì để hiểu được tại sao cần **validate** nó. [https://viblo.asia/p/tim-hieu-reactjs-tu-con-so-0-63vKjvn6K2R#_props-8](https://viblo.asia/p/tim-hieu-reactjs-tu-con-so-0-63vKjvn6K2R#_props-8).

# Props validation
## Cú pháp
Trước tiên thì chắc chắn phải tìm hiểu xem cú pháp của nó là gì thì mới làm được.
```javascript
class Component extends React.Component {
    render() { /* code trong component của bạn */ }
}
/* Validate props */
Component.propTypes = {
    /* validate trong này */
}
```
Như với cú pháp tương ứng ở trên chúng ta sẽ **validate props** bằng cách **componentName.propsType**.

Để sử dụng các **validator** mà React cung cấp chúng ta cần phải import thêm **PropTypes**.
```javascript
import PropTypes from 'prop-types';
```
và để giả sử để validate **props** là kiểu chuỗi thì dùng **PropTypes.string** là được.

## Các Props Validator cơ bản
* **PropTypes.any**: Props có thể là bất cứ kiểu dữ liệu nào.
* **PropTypes.bool**: Props là kiểu dữ liệu boolean.
* **PropTypes.number**: Props là kiểu số
* **PropTypes.string**: Props là kiểu chuỗi
* **PropType.func**: Props là một function
* **PropTypes.array**: Props là một mảng
* **PropTypes.object**: Props là một Object
* **PropTypes.InstanceOf**: Props là một instance của một class
* **PropTypes.isRequired**: Props bắt buộc phải tồn tại.

## Giới thiệu vài Validator hay ho

### Xác thực loại dữ liệu

Truyền props là kiểu **string**.

```javascript:App.js
import React from 'react';
import Hello from './Hello.js'

function App(props) {
  return (
    <div>
      <Hello name="Nguyen Quang Phu" /> /* truyền props có kiểu dữ liệu là string */
    </div>
  );
}

export default App;
```

Validate **props**.

```javascript:Hello.js
import React from 'react';
import PropTypes from 'prop-types';

function Hello(props) {
  return <h2>Hello World, {props.name}</h2>;
}

/* validate props là kiểu string */
Hello.propTypes = {
  name: PropTypes.string
}

export default Hello;
```
Ở trong đoạn code trên sẽ không có bất cứ lỗi nào xảy ra cả, thế nhưng nếu chúng ta cố tình truyền kiểu dữ liệu sang là một array chả hạn 
```javascript:App.js
<Hello name={[1, 2, 3]} />
```
thì ngay lập tức bạn sẽ nhận được lỗi báo đỏ hỏn trên console của trình duyệt.
![](https://images.viblo.asia/de6feab9-02e3-4157-96ee-d9e76b51a1b5.png)

### Khai báo props bắt buộc tồn tại

Nếu như bạn vô tình hay cố ý không truyền **Props** sang thì cũng không có dữ liệu nào xảy ra cả, trong một vài trường hợp để tránh việc phát sinh những bug không mong muốn như việc bỏ xót việc truyền dữ liệu thì cũng là lúc chúng ta nên nghĩ tới một **validator** khác là **isRequired**. 

```javascript:App.js
Hello.propTypes = {
    name: PropTypes.string.isRequired
}
```
nêu quên mất không truyền **Props** thì trình duyệt sẽ báo lỗi ngay để sửa.
![](https://images.viblo.asia/2e9a7c03-0e4f-4614-af5f-4a011f96ab09.png)

### Khai báo những giá trị hợp lệ
Nhiều lúc chúng ta chỉ muốn nhận các giá trị truyền vào các **component** mà chúng ta mong muốn, để làm được việc này thì chúng ta sẽ sử dụng validator là **oneOf**.

```javascript:App.js
Hello.propTypes = {
    name: PropTypes.string.isRequired,
    name: PropTypes.oneOf(['male', 'female'])
}
```
Nếu giá trị truyền vào không phải là `male` hay `female` thì ngay lập tức lỗi sẽ được hiện ra.

![](https://images.viblo.asia/c15971c7-c5d2-4872-8c31-bb78f6e8c808.png)

###  Xác thực kiểu dữ liệu của một mảng, object
Để xác thực giá trị của các phần tử trong mảng có thể được truyền đi chúng ta sẽ dùng đến **arrayOf** để kiểm tra giá trị các phần tử trong mảng
```javascript:Hello.js
Hello.propTypes = {
  name: PropTypes.arrayOf(PropTypes.number),
}
```
Nếu bất cứ một phần tử nào trong mảng có kiểu dữ liệu khác với `number` thì chương trình sẽ báo lỗi ngay, giả sử như này.
```javascript:App.js
function App(props) {
  return (
    <div>
      <Hello name={[1,2,"3"]} />
      <p>Hihi</p>
    </div>
  );
}
```
trinh duyệt sẽ báo lỗi![](https://images.viblo.asia/cf3f7a60-eb19-4bf0-8f50-ee4f5135f996.png)

Cũng tương tự như array thì đối với `object` cũng có một validator để kiểm tra là **objectOf**
```javascript:Hello.js
Hello.propTypes = {
  name: PropTypes.objectOf(PropTypes.number),
}
```

### Props nhận nhiều hơn một kiểu dữ liệu
Như tiêu đề của phần này, **props** cũng có thể nhận nhiều hơn một kiểu dữ liệu được truyền đi bằng cách sử dụng `validator` là **any**, ngoài ra còn có thể sử dụng `validator` **oneOfType**.
```javascript:Hello.js
Hello.propTypes = {
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
}
```

### Mặc định giá trị cho Props
Khi mà vô tình quên mất truyền **props** khiến ứng dụng của bạn lỗi, để tránh việc **props** không được set này chúng ta cũng có thể mặc định được giá trị của **props** trong những trường hợp **props** không được set.
```javascript:Hello.js
Hello.defaultProps = {
  name: 'Phu'
}
```
Tất cả các **props** mà các bạn muốn mặc định giá trị thì cứ để trong **defaultProps** để set mặc định giá trị cho chúng. Tránh xảy ra những lỗi không đáng.

### Custom validator
Đối với những điều kiện lằng nhằng phức tạp hơn đối với **props** thì các `validator` có sẵn không đáp ứng đủ nhu cầu `validate` dữ liệu thì các bạn cũng có thể tự tay mình tạo ra một `validator` của riêng mình.

Custom validator nhận vào 3 tham số 
* **props**: Các props được truyền vào, thể hiển dưới dạng key-value
* **propName**: Tên của prop đang được validate
* **componentName**: Tên của component đang validate.

Giả sử chúng ta muốn truyền **props** mà chỉ nhận các giá trị lớn hơn 10 thì làm như sau.

```javascript:Hello.js
Hello.propTypes = {
    number: function(props, propName, componentName) {
      if(props[propName] < 10) {
        return new Error('Invalid number'); /* message tùy chỉnh do các bạn */
      }
    }
}
```

# Kết luận
Trên đây là những gì mình tìm hiểu được về **Props Validation**, mình thấy việc validate dữ liệu này khá quan trọng trong ứng dụng của bạn, giúp chúng ta kiểm soát được dữ liệu trong ứng dụng tốt hơn, tránh bug, dễ mở rộng nữa.

Ngoài những `validator` mình giới thiệu ở trên thì các bạn có thể xem thêm vài `validator` nữa trên trang chủ của React tại trang [https://reactjs.org/docs/typechecking-with-proptypes.html](https://reactjs.org/docs/typechecking-with-proptypes.html).

Nếu bài viết hữu ích hãy cho mình 1 upvote để lấy động lực viết tiếp =))