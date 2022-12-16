## Yêu cầu
<hr>

Trước khi đọc bài viết này, bạn nên có những kiến thức cơ bản về việc sử dụng `ReactJS` và biết cách xử lý form với `ReactJS`. Nếu chưa biết thì bạn nên tìm hiểu hai vấn đề này trước ở [đây](https://reactjs.org/docs/getting-started.html)

## Mở đầu
<hr>

Khi làm việc với các thư viện về front-end như `ReactJS`, `VueJS` hay `AngularJS` thì việc quản lý các form là điều không thể thiếu. Quản lý form ở đây có thể hiểu là cách mà bạn quản lý thông tin mà người dùng nhập vào, tiến hành kiểm trả dữ liệu đầu vào đó (validate) sau đó hiển thị ra cho người dùng nếu có hoặc gửi (submit) lên server nếu không có thông tin người dùng là hợp lệ. Trong bài viết này, mình sẽ giới thiệu cho bạn về 2 thư viện mình hay sử dụng trong `ReactJS` mà mình thường dùng để giải quyết công việc này một cách đơn giản nhất mà không cần phải tự code từ đầu.

## Chuẩn bị
<hr>

Trước khi bắt tay vào làm chúng ta cần cài đặt trước một số thứ như viện ngoài như sau:
<br> 
- [Material-UI](https://material-ui.com/) - package hỗ trợ sẵn việc style cho các component React<br>
- [Formik](https://github.com/jaredpalmer/formik) - package dùng để quản lý form<br>
- [Yup](https://github.com/jquense/yup) - package dùng để validate dữ liệu<br>

Bạn cũng có thể tham khảo bản đầy đủ của mình tại [đây](https://github.com/dqhuy78/try-formik-and-yup)

## Giao diện
<hr>

Trước khi tiến hành việc quản lý thao tác form chúng ta sẽ tạo một project `ReactJS` thông qua `create-react-app`. Sau đó chúng ta tạo một folder `components/Forms/` và một component có tên `SignupForm.js` nằm trong folder này. Tiếp theo trong file `src/App.js` ta sửa lại nộ dung ban đầu của nó về như sau:
<br>

```javascript
import React, { Component } from 'react'
import SignupForm from './components/Forms/SignupForm';

class App extends Component {
    render() {
        return (
            <SignupForm />
        )
    }
}

export default App
```
Phần ***<SignupForm />*** chính là component mà chúng ta sẽ làm việc tiếp sau đó. Trong file `src/index.js` ta cũng tiến hành xóa bớt những gì không cần thiết đi và chỉ để lại nội dung như sau:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```
Cuối cùng ta xóa cả những file không cần thiết trong thư mục `src/` đi và đây là kết quả về cấu trúc folder cuối cùng của chúng ta:

![](https://images.viblo.asia/ec82aa6c-db5a-45fa-8d29-85d3c59195e6.png)

Để tiết kiệm thời gian nhưng vẫn có được giao điện nhìn đẹp đẹp nên mình sẽ sử dụng thư viện [Material-UI](https://material-ui.com/) của google. Nếu thích bạn có thể tự tìm hiểu cách sử dụng còn không bạn chỉ cần copy y nguyên phần code của mình để có được 1 form đẹp mắt:

```javascript
import React, { Component } from 'react'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'

class SignupForm extends Component {

    render() {
        return (
            <Grid container justify='center' alignContent='center'>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
                        <Typography variant="headline" gutterBottom>
                            Signup
                        </Typography>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Username</InputLabel>
                            <Input name='username' fullWidth />
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Email</InputLabel>
                            <Input name='email' fullWidth />
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Password</InputLabel>
                            <Input fullWidth name='password' type='password' />
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Plan</InputLabel>
                            <Select
                                displayEmpty
                                name='plan'
                            >
                                <MenuItem value='basic'>Basic</MenuItem>
                                <MenuItem value='advance'>Advance</MenuItem>
                                <MenuItem value='enterprise'>Enterprise</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox />
                            }
                            label='Receive new letter'
                        />
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                            >
                                Signup
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default SignupForm
```
Và đây là kết quả bạn thu được với đoạn code trên:
![](https://images.viblo.asia/0d1bf4b6-71f3-47f1-a050-4d297ae8ca81.png)
Đến đây là chúng ta đã hoàn thành bước chuẩn bị project cũng như giao diện cần thiết. Tiếp đến chúng ta sẽ bắt tay vào quản lý và xử lý dữ liệu trong form.

## Formik & Yup
<hr>

Khi bạn tham khảo link github của [Formik](https://github.com/jaredpalmer/formik) ở ngay phân overview đã giới thiệu mục đích của việc dùng `Formik`:
<br>
> 1. Getting values in and out of form state
> 2. Validation and error messages
> 3. Handling form submission

Hiểu cơ bản là `Formik` sẽ giúp chúng ta thực hiện 3 công việc thường xuyên dùng khi thao tác với form trong `React` là:
- Đưa dữ liệu vào hoặc lấy dữ liệu nhập ra trong form dưới dạng props thông thường
- Kiểm tra tính hợp lệ của dữ liệu và hiển thị thông báo nếu lỗi
- Hỗ trợ việc gửi form lên server

Giá trị các field trong form của chúng ta nếu trước đây được lưu trong state của chính form component đó thì giờ đây, khi sử dụng `Formik` thì giá trị của các form này sẽ do `Formik` quản lý và truyền vào trong form component của chúng ta dưới dạng các `props`.
<br><br>

*Như mình đã nhắc đến ở đầu bài viết là bạn nên có những kiến thức cơ bản về thao tác với form trong `React` trước khi bắt đầu đọc bài này để mang lại hiệu quả tốt hơn.*

Đến đây chúng ta sẽ bắt đầu việc cài đặt `Formik` thông qua `npm` hoặc `yarn` (nếu bạn đã cài yarn) :
```bash
npm i formik
```
hoặc
```bash
yarn add formik
```
Sau đó chúng ta sẽ tiến hành `import` thêm nó ở ngay trên của phần chúng ta khai báo `class SignupForm extends Component` như sau:

```javascript
...
import { withFormik } from 'formik'

class SignupForm extends Component {
    ...
}
```
Để đơn giản hóa cho việc xử lý form, tạm thời chúng ta sẽ chỉ tập chung ta sẽ comment bớt các field khác và chỉ giữ lại field username và button signup. Đây là nội dung component `SingupForm.js` sau khi đã loại bỏ bớt các thành phần:

```javascript
import { withFormik } from 'formik'

class SignupForm extends Component {

    render() {
        return (
            <Grid container justify='center' alignContent='center'>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
                        <Typography variant="headline" gutterBottom>
                            Signup
                        </Typography>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel>Username</InputLabel>
                            <Input name='username' fullWidth />
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <Button
                                variant='extendedFab'
                                color='primary'
                                type='submit'
                            >
                                Signup
                                </Button>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default SignupForm
```

![](https://images.viblo.asia/f409e467-1df6-4cb5-a1d4-cad9d55453c5.png)

`withFormik` ở đây chính là một `Higher Order Component` dùng để bọc bên ngoài component của chúng ta đồng thời cung cấp cho component của chúng ta thêm một số tính năng mới. Ngay trươc phần `export default SignupForm` chúng ta sẽ thêm đoạn code sau đồng thời sửa lại luôn phần `export`:

```javascript
const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            username: '',
        }
    },
})(SignupForm)

export default FormikForm
```

Ở đây `FormikForm = withFormik({})` chính là phần chúng ta khai báo `HOCs` của `Formik` với nội dung bên trong đó chính là phần cài đặt riêng theo form của chúng ta. Về các option mà `Formik` hỗ trợ bạn có thể đọc ở [đây](https://github.com/jaredpalmer/formik#withformikoptions). Bài viết của mình sẽ chỉ giới thiệu đến các bạn một số option cơ bản nhất và cũng là đủ để dùng cho các form thông thường của bạn.<br>
Trong đoạn code mà chúng ta mới thêm vào, option đầu tiên mà chúng ta sử dụng là `mapPropsToValues() {}`, đây là nơi chúng ta sử dụng để khởi tạo giá trị cho các field trong form của chúng ta, ở đây là cho field `username`. Lưu ý ở đây bạn cần đặt phần `name` của input field trong form của bạn giống với tên của giá trị mà bạn khởi tạo trong `mapPropsToValues() {}`. Cụ thể như sau:

```javascript
# Nếu phần input của chúng ta có name=username
<Input name='username' fullWidth />

# Thì đồng nghĩa với việc trong hàm mapPropsToValues() 
# ta cũng cần khai báo key của object trong hàm return là username
mapPropsToValues() { // Init form field
    return {
        username: '',
    }
},
```
Sở dĩ chúng ta cần khai báo trùng như vậy vì `Formik` sẽ hỗ trợ sẵn cho chúng ta việc cập nhật giá trị mà chúng ta nhập vào các field input mà không cần phải tạo các hàm `handleInputChange` thông thường nữa. Vì các giá trị trong `Formik` truyền qua component của chúng ta dưới dạng `props` nên chúng ta có thể truy cập nó thông qua `this.props.values.username` với:
- `this.props.values` là props chứa đựng giá trị của các field
- `username` là tên của field

Sau đây chúng ta sẽ tiến hành tryền giá trị này vào field username của chúng ta như sau:

```javascript
<FormControl fullWidth margin='normal'>
    <InputLabel>Username</InputLabel>
    <Input 
        fullWidth
        name='username'
        value={this.props.values.username} />
</FormControl>
```
Để kiểm tra xem việc cài đặt đã chính xác chưa ta có thể thử thay đổi giá trị khởi tạo của `username` trong hàm `mapPropsToValues` từ rỗng thành giá trị bất kì để xem trong giao diện có thay đổi theo đó không như sau:

```javascript
mapPropsToValues() { // Init form field
    return {
        username: 'abc',
    }
},
```
Khi chuyển lại giao diện nếu chúng ta thấy có sẵn 3 kí tự `abc` xuất hiện ở trường `username` có nghĩa là chúng ta đã cài đặt thành công:

![](https://images.viblo.asia/db032465-75c2-41c3-89d4-f4032d91b669.png)

Lúc này, nếu bạn thử thay đổi kí nội dung `username` sẽ thấy chúng ta hoàn toàn không nhập được thêm cũng như không xóa được các kí tự đi vì chúng ta chưa khai báo hàm để đẩm nhiệm công việc này. Nếu bạn còn nhớ documents của `React` liên quan đến form thì chắc hẳn bạn sẽ nhớ phần code phục vụ cho việc cập nhật giá trị của các input field sẽ có dạng như sau:

```javascript
state = {
    username: '',
    password: '',
}

handleInputChange(event) {
    const target = event.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
}

render() {
    return (
        <form>
            <input name='username' value={this.state.username} onChange={this.handleInputChange} />
            <input name='password' value={this.state.password} onChange={this.handleInputChange} />
        </form>
    )
}
```
Tuy nhiên vì `Formik` đã định nghĩa sẵn hàm `handleInputChange` cho bạn rồi nên bạn chỉ cần thêm nó vào field của mình như sau:

```javascript
<FormControl fullWidth margin='normal'>
    <InputLabel>Username</InputLabel>
    <Input
        fullWidth
        name='username'
        value={values.username}
        onChange={this.props.handleChange} />
</FormControl>
```
Bây giờ bạn đã có thể hoàn toàn nhập thêm hoặc xóa bớt kí tự trong input filed của mình và mọi thay đổi đã được `Formik` đảm nhiệm thay cho chúng ta qua `props.handleChange`. Lưu ý là bạn phải có phần `name` tương ứng với giá trị khởi tạo bạn đầu trong `mapPropsToValues()`. Tiêp theo chúng ta sẽ tiến hành kiểm tra nội dung nhập vào có thỏa mãn yêu cầu mà chúng ta đặt ra không.<br><br>
Để thực hiện việc này, chúng ta sẽ cài đặt thêm package [Yup](https://github.com/jquense/yup) như sau:
```bash
npm install yup
```
hoặc
```bash
yarn add yup
```
Bạn có thể hiểu cơ bản thì ***Yup*** là package hỗ trợ chúng ta việc kiểm tra dữ liệu nhập vào theo từng kí tự chúng ta nhập vào form. Sau khi cài đặt `Yup`, ta tiếp tục thêm option liên quan đến kiểm tra nội dung dữ liệu nhập vào là `validationSchema` vào nội dung của `withFormik({})` mà chúng ta đã khai báo ở trên như sau:

```javascript
...
import { withFormik } from 'formik'
import * as Yup from 'yup'

class SignupForm extends Component {
    ...
}

const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            username: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must have min 5 characters')
            .max(10, 'Username have max 10 characters'),
    }),
})(SignupForm)

export default FormikForm
```
Ở đây, bên trong hàm `Yup.object().shape({})` là nơi chúng ta sẽ tiến hành khai báo các luật đặt ra cho fied của chúng ta. Cụ thể ở đây ta đang khai báo như sau:
- username là dạng chuỗi kí tự `string(message)`
- username không được để trống `required(message)`
- username có tối thiểu 5 kí tự `min(5, message)`
- username có tối đa 10 kí tự `max(10, message)`
- message ở đây chính lại nội dung thông báo lỗi nếu vi phạm.

Để sử lấy được nội dung lỗi, chúng ta sẽ truy cập vào một `props` đặc biệt mà `Formik` cung cấp cho chúng ta là `errors`. Bạn có thể hiểu nôm na đẫy là object chứa các message báo lỗi liên vi phạm quy ước cho các field của chúng ta và có thể truy cập vào cụ thể từng field theo cú pháp `this.props.errors.[field_name]` hay ở đây chính là `this.props.errors.username`. Trong giao diện chứa field username chúng ta sẽ bổ sung thêm 1 component của `Material-UI` để hỗ trợ việc hiển thị lỗi này như sau:

```javascript
<FormControl fullWidth margin='normal'>
    <InputLabel>Username</InputLabel>
    <Input
        fullWidth
        name='username'
        value={values.username}
        onChange={this.props.handleChange} />
    <FormHelperText>{this.props.errors.username}</FormHelperText>
</FormControl>
```

Sau đấy bạn quay lại form và thử nhập đúng một chữ cái sẽ thu  được kết quả như sau:

![](https://images.viblo.asia/984ba1e7-f350-4ee7-a376-136839c5deb7.png)

Nội dung message bên dưới đúng với nội dung mà bạn định nghĩa ở trên và nó sẽ chỉ mất đi khi bạn nhập thỏa mãn nội dung đặt ra đồng thời với mỗi kí tự bạn nhập vào thì nội dung message sẽ thay đổi luôn và báo ra lỗi đầu tiên mà bạn mắc phải theo thứ tự khai báo ở trên. Chúng ta thử tiếp tục nhập cho đến khi vượt quá 10 kí tự sẽ thu được lỗi mới:

![](https://images.viblo.asia/92a0aa48-d727-4d99-8d7f-581c3228eaa8.png)

Để tăng cường tính thẩm mỹ thì bạn có thể thêm vào một số nội dung của `Material-UI` như sau:

```javascript
<FormControl fullWidth margin='normal' error={!!this.props.errors.username}>
    <InputLabel>Username</InputLabel>
    <Input
        fullWidth
        name='username'
        value={this.props.values.username}
        onChange={this.props.handleChange} />
    <FormHelperText>{this.props.errors.username}</FormHelperText>
</FormControl>
```

Bây giờ bạn quay lại giao diện để test sẽ thấy đẹp hơn 1 tí :D

![](https://images.viblo.asia/ed955e91-9e15-4d32-bf16-3fb016179da1.png)

## Kết bài
<hr>

Mong rằng qua P1 của bài viết, các bạn đã nắm được cách sử dụng cơ bản đôi với `Formik & Yup`. Các field tiếp theo mình sẽ không hướng dẫn các bạn tự làm luôn ở part này mà mình muốn để các bạn tự làm thử để có thể hiểu được rõ hơn cách làm. Ở phần tiếp theo, mình sẽ đưa ra hướng dẫn các bạn xử lý nốt các field còn lại cũng như tối ưu lại code của mình, các bạn hãy chú ý đón đọc.