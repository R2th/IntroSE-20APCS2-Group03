# 1 . Cách kiểm tra native log

![](https://images.viblo.asia/9d9b469c-255c-4301-b164-04a2cc65cdef.png)

Bạn chỉ cần ghi nhớ 2 dòng lệnh sau đây .

```
react-native log-ios
react-native log-android
```

Chỉ như vậy bạn có thể xem được log từ command line.

# 2. Sử dụng cấu trúc tệp phù hợp với bạn
Khi tôi lần đầu tiên bắt đầu học React Native, tôi đã bị ám ảnh bởi việc tạo ra cấu trúc tệp hoàn hảo. Tôi đã tìm kiếm trên web để tìm ý kiến, đề xuất, repos của mọi người, v.v. nhưng hầu hết đều cảm thấy không ổn. Sau khi phát triển với React Native một thời gian, tôi tin rằng cấu trúc tệp thực sự phụ thuộc vào loại ứng dụng, kích thước của ứng dụng và điều gì khiến bạn cảm thấy thoải mái, mặc dù tuyên bố đó gần như là sáo rỗng vào thời điểm này.

Tôi thường sử dụng cấu trúc dự án tương tự giữa các ứng dụng lớn hơn mà tôi đã phát triển vì nó có nghĩa là các mô-đun / thành phần có thể được sử dụng lại từ ứng dụng này sang ứng dụng khác. Việc sử dụng lại mã giữa các thành phần mặt trước hoạt động đặc biệt tốt khi mặt sau cũng là simialr!

Dưới đây là một số mẹo nhanh về cấu trúc mà tôi thường làm theo:

* Phân chia chức năng liên quan thành các thư mục.
* Có một thư mục cho các thành phần và một thư mục cho màn hình. Ví dụ: màn hình có thể được kết nối với global store và chuyển dữ liệu / chức năng xuống các thành phần.
* Có một thư mục để xử lý các chức năng xử lý dữ liệu trong các dịch vụ hoặc mô-đun, ví dụ: mô-đun “auth” và mô-đun “todo” trong ứng dụng loại Todo.
* Giữ các tệp kiểu liên quan đến màn hình / thành phần bằng cách sử dụng cùng một tên - ví dụ: `screens/home.js` và `screens/home.style.js`.

> Cấu trúc tệp này không dành cho tất cả mọi người vì như tôi đã đề cập, mọi người cảm thấy thoải mái với một số cấu trúc nhất định. Tôi là người ủng hộ việc giữ cho cấu trúc thư mục gọn gàng và trực quan nhất có thể để các nhà phát triển khác sử dụng.

Để có cái nhìn sâu hơn về một số cấu trúc tệp mà tôi đã sử dụng trong các ứng dụng trước đây, hãy xem một số repo trên Github như [jwt-react-native-boilerplate](https://github.com/jaygould/jwt-react-native-boilerplate) và [preact-jwt-apollo-boilerplate](https://github.com/jaygould/preact-jwt-apollo-boilerplate).

# 3. Style toàn cục.
Style toàn cầu có thể rất hữu ích được sử dụng phải không. Điều này có thể được thực hiện theo một số cách, nhưng nói chung tôi thích làm một số việc như:

```
// App.style.js
import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
	primaryColor: '#428c55',
	secondaryColor: '#58bfc6'
});
```

Sau đó, trong màn hình hoặc tệp thành phần của bạn:

```
// screens/Home/Home.js
import { globalStyle } from '../../App.style';
```

Điều này sẽ cho phép bạn sử dụng hiệu quả một số chúng để dễ dàng thay đổi màu sắc và kiểu dáng chung, cấp cao. Ngoài ra, bạn cũng có thể tạo các tệp riêng biệt cho các phần liên quan của việc tạo kiểu - ví dụ: tạo kiểu nút với tệp `Button.style.js`.

Mặc dù kiểu toàn cục thường có nghĩa là sử dụng các lớp tiện ích (ví dụ: tạo cho các phần tử một lớp “bold-text” để cung cấp cho phần tử đó thuộc tính **font-weight: bold;**, tôi thấy tốt nhất là không nên sử dụng quá nhiều chúng. React Native thúc đẩy tạo kiểu cấp thành phần trực quan giống như mô-đun CSS, vì vậy hãy cẩn thận khi sử dụng kiểu toàn cục.

# 4. Gán nhiều style cho một thành phần
Thường có thể hữu ích khi áp dụng nhiều kiểu cho một phần tử, ví dụ: nếu bạn đang chỉ định kiểu chung và kiểu được tạo riêng cho một thành phần. Điều này có thể được thực hiện khá dễ dàng bằng cách sử dụng một mảng:

```
<Text style={[styles.overviewText, styles.whiteText]}>
	Finn the cat.
</Text>

const styles = StyleSheet.create({
	overviewText: {
		...
	},
	whiteText: {
		color: '#ffffff'
	}
});
```
# 5. Jest + Enzyme để Testing
Kiểm tra các ứng dụng của bạn là điều mà mọi nhà phát triển nên làm và nó là bắt buộc ở nhiều công ty. Thử nghiệm các ứng dụng React có thể thực sự tuyệt vời với thiết lập phù hợp. Một thiết lập được sử dụng rộng rãi bao gồm Jest + Enzyme. Hãy xem! 

Jest đi kèm với các gói ứng dụng create-react-app theo mặc định và là một trình chạy thử nghiệm, thư viện xác nhận và thư viện mocking. Nó cũng cung cấp snapshot về cơ bản tạo ra snapshot được kết xuất của một thành phần sẽ tự động được so sánh vớisnapshot trước đó. Nếu hai điều đó không phù hợp, bài kiểm tra sẽ không thành công.

Điều này thực sự tuyệt vời cho các bài kiểm tra đơn vị, bài kiểm tra tích hợp nhưng với các thành phần thực của Ứng dụng React của bạn thì sao? Tham gia Enzyme, một thư viện thử nghiệm cho các Thành phần React được phát triển và duy trì bởi Airbnb và là đối tác lý tưởng cho Jest. 

Với các thư viện này, chúng tôi có thể thực hiện các bài kiểm tra gọn gàng như:

```
it("will render correctly", () => {
  const wrapper = shallow(
    <MyComponent />
  )
  expect(wrapper).toMatchSnapshot();
})
```

để kiểm tra hành vi kết xuất cơ bản của một trong các thành phần của chúng tôi. Nhưng chúng tôi có thể làm nhiều thứ hơn nữa, chẳng hạn như kiểm tra đạo cụ:

```
// We need to mock zum props first

const user = {
  name: 'ThePracticalDev',
  email: 'TPD@dev.to',
  username: 'tpd',
  image: null
}

// Then the tests

describe ('<UserProfile />', () => {
  it ('contains h3', () => {
    const wrapper = mount(<UserProfile user={user} />)
    const value = wrapper.find('h3').text()
    expect(value).toEqual('ThePracticalDev')
  })
  it ('accepts user props', () => {
    const wrapper = mount(<UserProfile user={user} />);
    expect(wrapper.props().user).toEqual(user)
  })
})
```

Điều này trông tuyệt vời, phải không? Và còn rất nhiều việc bạn có thể làm với thiết lập này như bắt chước lệnh gọi API hoặc thử nghiệm các phương pháp vòng đời ...
# 6.  Kết xuất có điều kiện của các thành phần phức tạp
Kết xuất có điều kiện là một trong những mẫu thường được sử dụng trong React. Giả sử, chúng tôi đang kết xuất có điều kiện `TestComponent` như sau:

```
<View>  //React Native
   {ifTheConditionIsTrue && <TestComponent>}
</View>
```

Đoạn mã trên hoạt động tốt trong React Native cho đến khi biến `ifTheConditionIsTrue` là một chuỗi trống. Nếu `ifTheConditionIsTrue` trở thành một chuỗi trống, React Native bắt đầu mong đợi một thành phần` <Text> `đóng gói nó và phá vỡ ứng dụng. Giải pháp là kiểu cưỡng chế. Thêm dấu `!!` trước `ifTheConditionIsTrue` sẽ thuyết phục React Native rằng biến đó là boolean. Giải pháp trông như thế này:

```
<View>  //React Native
   {!!ifTheConditionIsTrue && <TestComponent>}
</View>
```

Nếu bạn đang sử dụng tập chữ, [kết hợp nullish](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) cũng là một tùy chọn vì bạn có thể sử dụng các lợi ích của hoạt động bậc ba và vẫn duy trì khả năng đọc như sau:

```
<View>  //React Native
   {ifTheConditionIsTrue ?? <TestComponent>}
</View>
```

Vì liên kết nullish hoạt động bên trong như một toán tử bậc ba, React Native sẽ không mong đợi một thành phần `<Text>` nếu `ifTheConditionIsTrue` là một chuỗi trống.

# 7. Thay thế các phần tử HTML bằng các thành phần React Native
Bước đầu tiên và quan trọng nhất trong quá trình di chuyển là thay thế tất cả các phần tử HTML - vì React Native không hỗ trợ HTML - bằng các thành phần React Native. Ví dụ: `div / section` nên được thay thế bằng thành phần` View` và `h1`,` h2`,… `h6`,` p` và các phần tử dựa trên văn bản tương tự phải được thay thế bằng thành phần `Text`. Ví dụ:

```
// Web / HTML Component:
const TextComponent = ({content}) => <h1>{content}</h1>
// React - Native version of above Component:
import { Text } from 'react-native';
const TextComponent = ({content}) => <Text>{content}</Text>
```

Các thành phần React Native như vậy sẽ biên dịch thành mã Native dựa trên nền tảng và do đó, tạo thành các khối xây dựng cơ bản của ứng dụng.

# 8. Bạn luôn bấm ở trên màn hình, hãy học cách bấm.
Trong React, chúng ta sử dụng các sự kiện tổng hợp `onClick` trong các thành phần.

Vì chúng ta không sử dụng chuột trên điện thoại di động (chưa), chúng ta không có sự kiện `onClick`. Thay vào đó, chúng ta có thành phần `<TouchableOpacity onPress = {}>`, xử lý các sự kiện báo chí trong điện thoại di động. 

Do đó, tất cả các sự kiện `onClick` phải được thay đổi thành` onPress` để thực hiện lệnh gọi lại khi tương tác với các thành phần.
# 9. Học React Native có thể giúp nâng cấp Javascript của bạn
Điều này đúng đối với React cũng như React Native - việc sử dụng các framework này có thể giới thiệu cho bạn các khái niệm và mô hình như Lập trình chức năng chẳng hạn. Nếu là một nhà phát triển JS dày dạn, bạn có thể đã biết các khái niệm như currying, các hàm bậc cao hơn, v.v., nhưng khó tránh khỏi một số khái niệm này nếu bạn đang sử dụng React / React Native ở cấp độ nâng cao. 

Cũng như các khái niệm Lập trình chức năng (bạn có thể đọc thêm trong bài viết trước), React Native cũng sử dụng hầu hết các tính năng modren của ngôn ngữ Javascript với việc sử dụng[ Mảng và Cấu trúc đối tượng, Lớp Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), v.v. . Một trong những phần quan trọng khi học các nguyên tắc Javascript mới được đề cập ở đây là đảm bảo bạn dành thời gian và nỗ lực để tìm hiểu lý do tại sao bạn lại sử dụng các tính năng mới này, không chỉ sử dụng chúng vì mục đích và còn hiểu các lựa chọn thay thế.
# 10. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍

Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .