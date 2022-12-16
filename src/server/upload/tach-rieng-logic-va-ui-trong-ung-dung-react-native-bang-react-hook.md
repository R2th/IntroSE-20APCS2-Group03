# I. Mở đầu
## 1. Đặt vấn đề
HIện tại, React Native là một trong những cross-platform được ưa thích nhất khi phát triển ứng dụng mobile. Nếu bạn đã từng làm những app về React Native, có lẽ bạn sẽ nhận ra một trong những vấn đề cực kỳ khó chịu của React Native, đó là việc xử lý local state. Nếu bạn xử lý tất cả local state ở trong cùng một file thì hoàn toàn có khả năng file đó sẽ rất dài, có thể lên tới 1-2000 dòng code trong vòng 1 file. Như vậy, khi có lỗi xảy ra, việc debug sẽ là ác mộng cho chính bạn, hoặc là cho bất kỳ người đồng nghiệp nào maintaince đống code của bạn.

![](https://images.viblo.asia/f94db957-cdaa-4c98-9ad3-adcad54281e2.png)
> Một trong những file code mà mình từng làm việc cùng. Hơn 2000 dòng code, debug lòi mắt =))

Vậy nên việc tách biệt UI và logic ra trở nên cực kỳ cần thiết vì những ưu điểm rõ ràng của nó: 
* Code gọn gàng hơn, dễ quản lý
* Các chức năng được tách biệt rõ ràng, tầng xử lý UI thì chỉ có UI, tầng xử lý logic thì chỉ có logic.
* Dễ debug, dễ viết unit test khi mà các chức năng đã được tách biệt.

Vậy, chúng ta cần tách logic và UI ra như thế nào?
## 2. Hướng giải quyết
Thông thường, để quản lý state, người ta thường có xu hướng chuyển state thành các biến global để có thể dễ dàng quản lý. Có những thư viện rất nổi tiếng mà người ta hay dùng để quản lý state như [Redux](https://redux.js.org/), [MobX](https://mobx.js.org/README.html) hoặc [Context API](https://reactjs.org/docs/context.html). Các loại hình quản lý global state này có rất nhiều ưu điểm, nhưng không phải lúc nào cũng nên dùng global state, vì nếu dùng global state nhiều thì chắc chắn sẽ ảnh hưởng tới hiệu năng của ứng dụng. Để tránh việc lạm dụng global state, Dan Abramov, tác giả của Redux đã phải viết bài viết [You might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367). 

Như vậy, để tách riêng UI và logic, global state là một giải pháp chưa được hay lắm. Global state chỉ nên sử dụng khi bạn thật sự cần dùng đi dùng lại những state đó ở nhiều component khác nhau. Còn đối với việc xử lý local state, bạn sẽ cần cách khác.

Để thực hiện việc tách biệt xử lý UI và local state, chúng ta sẽ có 2 cách để tách làm: đó là sử dụng thư viện [Recompose](https://github.com/acdlite/recompose) hoặc [Hook](https://reactjs.org/docs/hooks-intro.html). Nguyên lý của cả 2 đều giống hệt nhau, vì chúng đều do cùng một tác giả viết ra.  [Recompose](https://github.com/acdlite/recompose) ra đời vào khoảng năm 2015 để giải quyết bài toán tách biệt việc xử lý local state sang một file khác, khi mà các component còn viết bằng class và khái niệm React Hook còn chưa được hình thành. Khoảng 1 năm sau, tác giả của thư viện Recompose đã về làm việc cùng các nhà phát triển React và tạo ra [Hook](https://reactjs.org/docs/hooks-intro.html). Có thể nói, Hook chính là phiên bản "nâng cao" của Recompose. Ở trong phạm vi bài viết này, mình sẽ chỉ giới thiệu cách dùng Hook để xử lý local state. Nếu các bạn muốn, hãy comment bên dưới bài viết và mình sẽ viết thêm về thư viện [Recompose](https://github.com/acdlite/recompose) ở bài sau. 
# II. Thực hiện
Đối với bài này, mình sẽ sử dụng một ví dụ đơn giản, đó là 1 component với 1 con số, 2 chức năng cộng và trừ. Đây chắc là ví dụ kinh điển rồi.
![](https://images.viblo.asia/586ebdf3-0f34-494f-94b3-56bab769dcaa.png)
Anh em nếu đã quan tâm đến chủ đề này thì chắc cũng đều ở level middle rồi, bỏ qua những thứ cơ bản như kiểu tạo project, config các thứ nhé ^^.
## 1. Tạo file xử lý logic
Chúng ta sẽ tạo một file để xử lý các logic về local state ở trong màn hình. Anh em có thể đặt tên file tuỳ ý, do React không có quy tắc cụ thể nào cả. Mình đặt tạm nó là `ExampleViewModel.js` nhé.
```javascrpit
import {useState} from 'react';

export default function exampleViewModel() {
  const [count, setCount] = useState(0);

  const _increment = () => setCount(count + 1);
  const _decrement = () => setCount(count - 1);

  return {count, _increment, _decrement};
}
```

Ở trong file này, chúng ta chỉ tập trung vào xử lý logic, không có dính dáng gì tới UI ở đây cả. Chúng ta tạo một function `exampleViewModel()`, function này sẽ trả về các giá trị như `count`, `_increment` và `_decrement` để file UI có thể gọi tới. 
## 2. Tạo file UI
Mình sẽ tạo 1 file UI, gọi tạm là `ExampleView.js`. Vậy ở trong file UI này, làm sao để gọi được `count`, `_increment` và `_decrement` ra? Rất đơn giản, chỉ cần 1 dòng: 
```javascript
//import
import exampleViewModel from './ExampleViewModel';
...
const {count, _increment, _decrement} = exampleViewModel();
```
Và như vậy là chúng ta đã gọi được các giá trị từ file `ExampleViewModel` ra, việc còn lại chỉ là vẽ UI thôi:
```javascript
export function ExampleView() {
  const {count, _increment, _decrement} = exampleViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonContainer}>
        <ExampleButton text={'+'} onPress={_increment} />
        <ExampleButton text={'-'} onPress={_decrement} />
      </View>
    </View>
  );
}

function ExampleButton(props) {
  const {onPress, text} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
```

Như vậy là xong. Và như vậy, chúng ta đã tách được UI và Logic ra 2 file riêng biệt mà không cần đến các kiến trúc quản lý global state phức tạp như `Redux` hay `MobX`.
# Lời nói thêm
Đây là lần đầu mình viết blog, vậy nên cả về kiến thức và văn phong có thể còn chưa hoàn thiện. Tuy nhiên, mình sẽ cố gắng cải tiến không ngừng để mang lại những kiến thức đúng đắn đến với anh em. Có gì sai sót, cho dù là về kiến thức hay về văn phong, ngữ pháp, mong anh em có thể comment ở bên dưới để mình có thể sửa chữa. Đồng thời, nếu anh em muốn mình viết thêm về chủ đề nào trong React Native hoặc Flutter thì anh em cũng có thể comment luôn :D.

Xem mã nguồn [tại đây](https://github.com/hieuvh3011/blog_split_ui_logic_hook).
Bài viết này có tham khảo từ https://medium.com/@sairysss/react-separating-responsibilities-using-hooks-b9c90dbb3ab9