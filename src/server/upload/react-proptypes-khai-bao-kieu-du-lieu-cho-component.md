React PropTypes là một cách tốt giúp bạn bắt lỗi thông qua việc kiểm tra loại dữ liệu được truyền vào component thông qua `props`. PropTypes mang lại lợi ích tuyệt vời trong khi lại bỏ ra rất ít công sức để cài đặt

#### Giới thiệu

Nếu bạn muốn truyền một giá trị bất kì nào đó đến một component, và bạn không khai báo kiểu dữ liệu cho thuộc tính truyền vào. Khi ứng dụng của bạn bắt đầu phình to ra và rất phức tạp, có rất nhiều component liên quan đến nhau và chúng truyền dữ liệu từ component này đến component khác theo cấu trúc cây. Một thời gian sau khi bạn hoặc một ai đó muốn tái sử dụng lại một component hoặc phát triển mở rộng nó thì họ phải rất mất công. Họ phải dành thời gian kiểm tra tìm kiếm để hiểu được cách sử dụng component và biết những props nào bắt buộc cần thiết phải truyền vào cho component và dữ liệu của nó ra sao. Để thực hiện được việc này, bạn phải vào đọc source code của component đang kiểm tra, đồng thời xem component này được gọi đến ở đâu như thế nào. Thời gian bạn bỏ ra phụ thuộc vào độ phức tạp của component và tần suất nó được sử dụng nhiều hay ít. Nếu bạn biết rõ props truyền vào cho component là gì, kiểu dữ liệu là string hay object ... nó có bắt buộc không mọi thứ đã đơn giản hơn rất nhiều. Giải pháp cho vấn đề này là React PropTypes

#### Vậy PropTypes là gì?
PropTypes không chỉ đơn thuần giúp bạn bắt lỗi liên quan đến dữ liệu truyền qua lại giữ các component mà còn giúp bạn có được tài liệu mô tả các sử dụng và các dữ liệu cần truyền cho component này như thế nào. Hãy xem một ví dụ dưới đây

```
import React from 'react';
import PropTypes from 'prop-types';
const Person = (props) => <div>
  <h1>{props.firstName} {props.lastName}</h1>
  {props.country ? <p>Country: {props.country}</p> : null}
</div>;
Person.propTypes = {
  firstName:PropTypes.string,
  lastName:PropTypes.string,
  country:PropTypes.string
};
export default Person;
```

Bạn có thể thấy, tôi đã tạo ra một component nhỏ để hiển thị thông tin tên và quốc tịch của một trước. Chúng ta hiển thị tên và tên đệm ở trong thẻ h1, hiển thị tên quốc gia trong thẻ p nếu nó có giá trị. Trong ví dụ  đơn giản này tôi chỉ khai báo kiểu dữ liệu cho các props (chứ không bao gồm khai báo có bắt buộc không).

Vậy nó hoạt động thế nào? PropTypes dùng để định nghĩa kiểu dữ liệu được truyền vào cho component. Vậy mỗi lần, một giá trị được truyền vào thông qua props, nó phải được kiểm tra loại dữ liệu có đúng không. Nếu bạn truyền vào kiểu dữ liệu không đúng với kiểu được khai báo một đoạn message lỗi sẽ hiển thị ở phần console trên trình duyệt của bạn.

Nếu bạn khai báo được PropTypes như trên, trước hết bạn có thể đạt được những lợi ích sau:
- Bạn có thể bắt lỗi dễ dàng các vấn đề liên quan đến truyền sai loại dữ liệu giữa các component
- Những nguời sử dụng component của bạn có thể biết rõ loại dữ liệu được truyền vào cho component ở một vị trí duy nhất (không phải đọc hiểu cách sử dụng thông qua những chỗ gọi đến component)
- Một số trình soạn thảo có thể hỗ trợ tốt việc sử dụng component như thế nào, ví dụ khi bạn gõ tên component trình soạn thảo sẽ hiển thị cho bạn biết bạn cần truyền vào những gì loại dữ liệu như thế nào.

Qua trên bạn có thể hiểu được cơ bản PropTypes là gì, ích lợi của nó ra làm sao. Dưới đây tôi sẽ nói chi tiết việc sử dụng PropTypes

#### Xác thực loại dữ liệu
Giống như trong ví dụ trên, tôi nghĩ chức năng chính của React PropTypes cũng là sử dụng cho việc xác thực loại dữ liệu.

##### Dữ liệu cơ bản
```
Person.propTypes = {
  email: PropTypes.string,
  age: PropTypes.number,
  worksRemote: PropTypes.bool,
  updateCallback: PropTypes.func
}
```
Hơn nữa bạn có thể dùng như sau
```
PropTypes.array,
PropTypes.arrayOf(PropTypes.string),
PropTypes.object,
PropTypes.objectOf(PropTypes.number)
```

##### Dữ liệu phức tạp

Nó có thể xác thực chính xác các thuộc tính của một đối tượng (plain JavaScript object) thông qua shape

```
Person.propTypes = {
  car: PropTypes.shape({
    registrationNumber: PropTypes.string,
    year: PropTypes.number
  })
}
```
Trong ví dụ trên bạn có thể thấy, bạn cần truyền vào cho prop car là một đối tượng có thuộc tính `registrationNumber` là string và `year` là number. Nếu đối tượng truyền vào có thuộc tính với kiểu dữ liệu ko đúng bạn sẽ nhận được thông báo lỗi ngay.

##### Định nghĩa các giá trị hợp lệ của prop

Ví dụ bạn muốn giá trị của prop truyền vào chính xác chỉ được là một trong các giá trị được định nghĩa từ trước bạn có thể làm như sau
```
Person.propTypes = {
  gender: PropTypes.oneOf([
    'female', 'male'
  ])
}
```
Trong ví dụ trên bạn có thể thấy prop gender sẽ chỉ có 2 giá trị hợp lệ là male và female, nếu bạn truyền vào giá trị khác ngoài 2 giá trị này bạn sẽ nhận được thông báo lỗi

Bên cạnh việc chỉ rõ các giá trị có thể cho một prop bạn cũng có thể khai báo một tập hợp các kiểu dữ liệu có thể  của prop như sau

```
PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])
```

#### Khai báo prop là bắt buộc

Đây cũng là một phần rất quan trọng của PropTypes. Nếu bạn muốn ai đó sử dụng component của bạn bắt buộc phải truyền một số props nào đó, bạn có thể gọi là các props bắt buộc (mandatory). Để làm điều này cũng rất đơn giản, ta lấy luôn ví dụ ban đầu ra để thực hiện

```
const Person = (props) => <div>
  <h1>{props.firstName} {props.lastName}</h1>
  {props.country ? <p>Country: {props.country}</p> : null}
</div>;
Person.propTypes = {
  firstName:PropTypes.string.isRequired,
  lastName:PropTypes.string.isRequired,
  country:PropTypes.string
};
```

Bạn có thể thấy để khai báo bắt buộc đối với một prop nào đó bạn chỉ cần thêm `isRequired` vào sau loại dữ liệu khai báo. Trong ví dụ trên ta thấy 2 props firstName và lastName là bắt buộc còn country là không bắt buộc (bạn có thể không truyền gì cả không sao cả)

#### Khởi tạo giá trị props mặc định cho component

Bên cạnh đó bạn có thể khởi tạo giá trị props mặc định cho component. Bạn có thể khởi tạo thông qua `defaultProps` của component ví dụ

```
Person.defaultProps = {
  country: 'Austria'
}
```

Trong ví dụ trên ta khai báo giá trị default prop country là `Austria`, nếu gọi component Person mà không truyền prop country thì giá trị mặc định của nó sẽ là `Austria`

#### Kết luận

React PropTypes là một cách tốt để xác thực đầu vào của component. Hơn nữa nếu một ai đó muốn sử dụng component của bạn, nó cung cấp một cái nhìn tổng quan cho tất cả các props và loại dữ liệu của nó. Tôi nghĩ việc sử dụng PropTypes là rất hữu dụng nó tránh được những lỗi khó chịu và cải thiện được tính tái sử dụng component của bạn rất nhiều!

#### Tham khảo
1. [validating-props-easily-with-react-proptypes](https://codeburst.io/validating-props-easily-with-react-proptypes-96e80208207)

2. [facebook/prop-types](https://github.com/facebook/prop-types)