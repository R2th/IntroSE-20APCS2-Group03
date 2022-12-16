Chào các bạn, ở [bài trước](https://viblo.asia/p/atomic-design-va-cach-dung-ap-dung-vao-react-bJzKmr8EZ9N) mình đã giới thiệu với các bạn về **Atomic design** và một vài ví dụ về cách sử dụng nó với React. Hôm nay mình sẽ tiếp tục giới thiệu với các bạn về một công cụ giúp các bạn tận dụng tốt hơn Atomic design. Đó chính là **Storybook** - một công cụ dùng để phát triển giao diện người dùng.
# Giới thiệu
**Storybook** là một công cụ để phát triển giao diện người dùng. Nó làm cho việc phát triển trở nên nhanh hơn và dễ dàng hơn bằng cách tách riêng các component với nhau. Điều này cho phép bạn làm việc trên một component tại một thời điểm. <br>
Sử dụng **Storybook** để xây dựng các atomic component và các trang phức tạp trong ứng dụng web của bạn dựa trên các atomic component đã có. <br>
Không chỉ như vậy, **Storybook** còn giúp bạn ghi lại các component để tái sử dụng và tự động kiểm tra trực quan các component của bạn giúp ngăn chặn các lỗi thường gặp xảy ra.
# Cài đặt
Đầu tiên các bạn cần cài đặt một React project trước. Ở đây mình sử dụng luôn [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) cho nó lẹ :)
```js
npx create-react-app react-storybook
```
## Storybook
Để cài đặt storybook các bạn truy cập vào folder của React project vừa tạo (ở trường hợp của mình là `react-storybook`). Sau đó chạy lệnh sau:
```js
npx sb init
```
Lưu ý, trong quá trình cài đặt có thể các bạn sẽ bị hỏi như bên dưới. Lúc này cứ mạnh dạn mà phang `y` cho mình nhé :v: 
```
Need to install the following packages:
  sb
Ok to proceed? (y)
```
Sau khi cài đặt xong thì các bạn chạy thử lệnh `yarn storybook` để khởi động storybook. <br>
Mặc định thì storybook sẽ chạy trên port `6006` nên sau khi chạy command ở trên xong các bạn truy cập vào `http://localhost:6006` để xem kết quả nhớ. Nếu ra được hình như bên dưới là các bạn đã thành công rồi đó :)

![](https://images.viblo.asia/a18d66cd-e60a-41da-93ca-abed7b7ac1d5.png)
Một Storybook ghi lại trạng thái được hiển thị của một UI component. Các developers viết nhiều stories cho mỗi component mô tả tất cả các trạng thái mà một component có thể hỗ trợ.<br>
Lúc các bạn chạy lệnh `yarn storybook` thì CLI đã tạo sẵn 1 vài các component ví dụ để minh họa các loại component bạn có thể xây dựng với Storybook: Button, Header và Page. Các bạn có thể lượn 1 vài vòng quanh những component này để xem thử như thế nào :)<br><br>
Mỗi component trong ví dụ có một tập hợp các stories hiển thị các trạng thái mà nó hỗ trợ. Bạn có thể duyệt qua các stories trong giao diện người dùng (ở browser qua đường dẫn `http://localhost:6006`) và xem các đoạn code đằng sau chúng trong các file kết thúc bằng .stories.js hoặc .stories.ts.

![](https://images.viblo.asia/750d2572-c893-4699-a409-480e724fb746.png)

Các stories mà bạn định nghĩa trong file `*.stories.js` sẽ được hiển thị bên trong component menu. Và khi bạn click vào story bất kỳ, canvas cũng như docs tương ứng sẽ được render ra.<br>
Như hình trên thì các bạn có thể thấy được button trong ví dụ hiện đang có các props là: backgroundColor, primary, label, size, onClick với các giá trị tương ứng. Các bạn cũng có thể chỉnh sửa các giá trị này để xem cái button nó biến hình như thế nào mà không cần phải code thêm cái gì nữa cả. Rất là tiện luôn phải không nào :heart_eyes::heart_eyes::heart_eyes:
# Tạo storybook
Sau đây mình sẽ lấy một ví dụ về cách tạo một component stories để mọi người dễ hiểu hơn nhé :)
## Tạo component
Trước hết các bạn cần tạo một component để có thứ mà show lên Storybook cái đã.
Ở đây mình sẽ tạo thêm một component `Input` nha mọi người. Các bạn tạo một file `Input.jsx` trong folder stories và thêm đoạn code như sau:
```js
import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

export const Input = ({ disabled, placeholder, value, onChange, ...props }) => {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      className="storybook-input"
      {...props}
    />
  );
};
Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
Input.defaultProps = {
  placeholder: '',
  value: '',
  onChange: undefined,
  disabled: false,
};
```
Ở đây chỉ là bước tạo component bình thường thôi, chắc hẳn mọi người cũng đã thuộc nằm lòng rùi nên mình không giải thích nữa.
Ngoài ra ở đây mình có import file `input.css` để style lại component 1 tý cho nó đẹp thôi.<br>
Mọi người cũng có thể tự css hoặc copy đoạn css của mình cho nó lẹ nhá :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:
## File input.css
```css
// mình đang đặt file input.css nằm trong folder stories lun nhá
.storybook-input {
  border-radius: 3em;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 16px;
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 0px 1px inset;
  color: black;
}

.storybook-input:focus {
  box-shadow: rgb(30 167 253) 0px 0px 0px 1px inset;
}

.storybook-input:disabled {
  opacity: 0.4;
  background: #dcd9d9;
  cursor: not-allowed;
}
```
## Tạo stories 
Cuối cùng sẽ là bước tạo file stories. Các bạn mở thư mục `stories` ra rồi tạo thêm file `Input.stories.jsx` và ném đoạn code bên dưới vào.
```js
import React from 'react';
import { Input } from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  disabled: false,
  placeholder: '',
  value: '',
  onChange: undefined,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...DefaultState.args,
  placeholder: 'placeholder',
};

export const Disable = Template.bind({});
Disable.args = {
  ...DefaultState.args,
  value: 'Disabled',
  disabled: true,
};
```
Ở đây các bạn chú ý cho mình những điểm này:<br>
* **title** - đây chính là nơi bạn tạo nên cấu trúc cho storybook của bạn bên phía browser. Trong ví dụ của mình thì lúc hiển thị sẽ hiển thị Input nằm phía bên trong mục Forms.
* **component** - tên component các bạn muốn dùng.
* **Template** - component sẽ nhận những gì và render ra những gì.
* **Template.bind({})** - dùng để tạo một bản copy để tái sử dụng các đoạn code trùng lặp.
* **...DefaultState.args** - copy data để tái sử dụng lại.

Ta la, như vậy là các bạn đã tạo xong một stories đơn giản cho component Input rồi đó. Các bạn save code lại và truy cập vào `http://localhost:6006` để xem kết quả nhớ :laughing::laughing::laughing:

![](https://images.viblo.asia/2b6b9aa9-5f1d-4b3e-bc39-1b09a6afc8a7.png)

Cũng rất gì và này nọ đúng không mọi người :sweat_smile: <br>
# Tổng kết
Như vậy là mình đã cùng các bạn đã tìm hiểu xong storybook và cách tạo một stories cơ bản rùi đó. Về cơ bản thì mọi thứ vẫn chưa có gì cả do mình cũng chưa có tạo nhiều component để thấy được giá trị của **Storybook** mang lại.<br>
Sắp tới thì mình sẽ tung ra phần 2 với nhiều thứ ngon lành cành đào hơn nhiều. Phần sau mình sẽ tạo đủ số lượng component cần thiết cho 1 màn hình để mọi người dễ dàng hình dung hơn nhé. <br>
Bên cạnh đó mình cũng sẽ kết hợp thêm cả Atomic design vào để tận dụng sức mạnh của cặp đôi này. Mong mọi người ủng hộ. <br>
Chào thân ái và quyết thắng.
# Tham khảo
[https://storybook.js.org/docs/react/get-started/introduction](https://storybook.js.org/docs/react/get-started/introduction)