# III. Memoization và React.memo.
 Nó là 1 kỹ thuật nó giúp mình tăng tốc, tốc độ xử lý máy tính lên bằng cách nó sẽ lưu trử lại cái dử liệu, kết quả của những lần tính toán trước đó, để những lần sau mình không cần phải tính toán lại nếu như chúng ta gặp lại bộ input củ. 

## 1. Memoization là gì?

> "In computing, memoization or memoisation is an optimization technique used primarily to speed up
> computer programs by storing the results of expensive function calls and returning the
> cached result when the same inputs occur again." - Wikipedia

* Tính toán và lưu kết quả cho từng bộ input.
* Khi gặp lại bộ input đã từng làm thì không tính toán lại, mà trả về kết quả sẵn có.

Ví dụ:
Lần đầu: add(1, 2) --> tính ra KQ = 3 và lưu lại.
Lần hai: add(1, 2) --> đã từng làm, ko tính toán lại --> trả ngay về 3.

Thực chất của nó là ban đầu nó sẽ tính toán  lưu kết quả cho từng bộ input .
Lần 1 bạn gặp 1 bộ input bạn tính toán và lưu. Lần 2 bạn gặp 1 bộ input mới thì nó tính toán và lưu mới . Nếu đến lần thứ 3 bạn gặp 1 bộ input giống với bộ số 1 hoặc số 2 chẳng hạn thì bạn không cần tính toán lại mà sử dựng kết quả tính toán của 1 và 2 đả được lưu để sử dụng. 

Bài toán này  sử dụng với các expensive function (Những hàm tính toán xử lý rất nặng) . Đối với nhưng hàm kiểu này mà bạn không lưu lại kết quả để gọi lại thì nó chạy rất là nặng nhé. Đó là kỹ thuật Memoization các bạn nhé .

## 2. Một ví dụ đơn giản của memoization.

```javascript
const addMemo = (a, b) => {
  // Init cache
  if (!addMemo.cache) {
    addMemo.cache = {};
  }
  // Return cache if found
  const key = `${a}_${b}`;
  const synmetricKey = `${b}_${a}`;
  if (addMemo.cache[key]) return addMemo.cache[key];
  if (addMemo.cache[synmetricKey]) return addMemo.cache[synmetricKey];
  // Calculate and save to cache
  const sum = a + b;
  addMemo.cache[key] = sum;
  addMemo.cache[synmetricKey] = sum;
  return sum;
};
addMemo(2, 3); // Tính toán và lưu cache, trả về 5
addMemo(3, 2); // Phát hiện đã có trong cache, trả về 5
addMemo(1, 2); // Ko có trong cache, tính toán, lưu cache và trả về 3

```

Ta quan sát nhé, ta có 1 cái hàm là addMemo. Ban đầu ta gọi addMemo(2, 3) thì nó trả về kết quả là 5. Đến lần tiêps theo, ta gọi addMemo(3, 2) . Ta thấy thì 2 với 3 nó y chang 3 và 2. đầu vào y chang nhau nhé. Nêu strong catch có rùi. Nó sẽ trả về 5 luôn. Còn addMemo(1, 2) thì nó sẽ tính toán lại nhé.  Trong cái hàm này chúng ta sẽ check key đối xứng để kiểu tra trong catch nhé. Đó là ví dụ đơn giản minh hoạ cho memoization.
## 3. Giới thiệu HOC React.memo()

* React.memo() là một HOC, chứ ko phải hooks.
* React.memo() tương tự như PureComponent.
* PureComponent thì cho class component.
* React.memo() dùng cho functional component.
* Chỉrenderlại component nếu props thay đổi.
* Sử dụng shallow comparison.

**HOC(Higher Order Component)** đơn giản là một component nhận đầu vào là một component và trả về là một component khác.

Tất cả trong React đều là component. Và ở một số trường hợp HOC giúp chúng ta tránh việc lặp code và sử dụng lại logic cho nhiều component khác nhau.

HOC giống như một dịch vụ mà khi cần chúng ta gọi nó để giúp chúng ta một việc gì đó. Ví dụ như dịch vụ nâng cấp máy tính, khi bạn giao máy tính của bạn cho một cưa hàng thì họ sẽ nâng cấp ổ cứng, hay RAM, card đồ hoạ cho máy tính của bạn. Giả sử như:

```javascript
const mayTinhCoSSD = dichVuSuaChua(mayTinhCuaBan)
```
Như ví dụ này component **dichVuSuaChua** là một HOC trong React. Nó nhận vào một máy tính và trả về một máy tính có SSD.

Trong thực tế khi phát triển sản phẩm React, chúng ta hay lặp code một số chỗ và HOC sẽ giúp chúng ta sử dụng lại những logic đó một cách hiệu quả. Một HOC trong React thường có dạng như sau:

```javascript
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

Một ví dụ đơn giản là chúng ta muốn thêm một props cho tất cả những component là **secretThing**. Chúng ta có thể viết một HOC như sau:

```javascript
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
Và chúng ta sử dụng HOC **withSecretToLife** như sau:

```javascript
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

Chú ý rằng, HOC không chỉnh sửa component ban đầu(Wrapper Component) mà nó chỉ bọc component gốc trong một Container. Sau đó nó sẽ truyền thêm một số data, props xuống cho Wrapped Component. HOC không quan tâm dữ diệu được sử dụng như thế nào. Cũng như Wrapped Component không quan tâm data, props đến từ đâu. Nó chỉ việc gọi HOC và xài dữ liệu được truyền từ HOC.

HOC nên là một pure function nên nó không được phép chỉnh sửa input, và không có side-effect.

Rồi . Mình đả giải thích **HOC** rùi nhé. vậy **React.memo()** không phải là Hook đâu nhé. Nó sử dụng cho Functional Component 

* Sử dụng shallow comparison.

 Có nghĩa là nó đang chỉ dừng lại ở việc so sánh nông (cạn) thôi nhé .
 
 Ví dụ cách sài nhé: 
 
 ```javascript
// Class component - PureComponent
export default class Hero extends PureComponent {
  render() {
    return <div>Super hero!</div>;
  }
}
// Functional component - React.memo
function Hero() {
  return <div>Super hero!</div>;
}
export default React.memo(Hero);

```

## 4.   Tổng kết .

 Tại sao mình lại giới thiêu cái **React.memo()** và mình lại giới thiệu **Memoization** . Vậy  nghĩa là gì ?
 
Thực chất  React.memo() có sử dụng kỹ thuật Memoization. Nếu props không thay đổi thì nó render lại kết quả củ . nếu 1 bộ prop nó lưu 1 kết quá, lần sau chạy mà vẫn bộ props đó thì nó kết xuất kết quả củ . Nó giống với Memoization không các bạn =))


 
* Memoization = trả về kết quả đã từng làm, không cần phải đi tính toán lại.
* Dùng cho các xử lý, tính toán nặng, tốn thời gian, tài nguyên.
* React.memo() là một HOC, chứ ko phải hooks.


## 6. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc . Một số nguồn :

React.memo(): https://reactjs.org/docs/react-api.html#reactmemo

Định nghĩa Memoization: https://en.wikipedia.org/wiki/Memoization

https://blog.bitsrc.io/understanding-memoization-in-javascript-to-improve-performance-2763ab107092

https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/

https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19