## Mở đầu
<hr>

Ở [bài viết trước](https://viblo.asia/p/quan-ly-form-trong-react-voi-formik-va-yup-p1-RQqKLvw4l7z) của mình, chúng ta đã nói sơ qua về cách cài đặt cũng như sử dụng `Formik & Yup` cho React form của chúng ta. Trong bài viết này, mình sẽ giải đáp nốt việc sử dụng `Formik & Yup` cho những field còn lại trong form của chúng ta cũng, các chúng ta xử lý việc submit form cũng như tối ưu lại code của chúng ta. Nào chúng ta cùng bắt đầu :D.

## Nhắc lại
<hr>
Trước khi bắt đầu vào nội dung chính của part 2 này, mình sẽ nhắc lại những gì chúng ta đã làm được ở phần trước. Đến cuối phần trước, chúng ta đã có được một form đơn giản gồm 1 field username duy nhất như sau:

![](https://images.viblo.asia/f409e467-1df6-4cb5-a1d4-cad9d55453c5.png)

Còn đây là toàn bộ nội dung mà chúng ta đã code được:
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

import { withFormik } from 'formik'
import * as Yup from 'yup'

class TestForm extends Component {

    render() {
        return (
            <Grid container justify='center' alignContent='center'>
                <Grid item xs={6} md={4}>
                    <Paper elevation={4} style={{ padding: '20px 15px', marginTop: '30px' }}>
                        <Typography variant="headline" gutterBottom>
                            Signup
                        </Typography>
                        <FormControl fullWidth margin='normal' error={!!this.props.errors.username}>
                            <InputLabel>Username</InputLabel>
                            <Input
                                fullWidth
                                name='username'
                                value={this.props.values.username}
                                onChange={this.props.handleChange} />
                            <FormHelperText>{this.props.errors.username}</FormHelperText>
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
})(TestForm)

export default FormikForm
```
Với những gì đã code ở phía trên, khi chúng ta nhập nội dung vào form mà không thỏa mãn các điều kiện như để trống username, username nhỏ hơn 5 kí tự hoặc lớn hơn 10 kí tự thì sẽ nhận được thông báo như sau:
![](https://images.viblo.asia/ed955e91-9e15-4d32-bf16-3fb016179da1.png)

Bên trên là toàn bộ nhữn gì chúng ta đã làm được tính đến cuối [bài viết trước](https://viblo.asia/p/quan-ly-form-trong-react-voi-formik-va-yup-p1-RQqKLvw4l7z). Đồng thời với form gốc ban đầu:

![](https://images.viblo.asia/0d1bf4b6-71f3-47f1-a050-4d297ae8ca81.png) 

Mình đã để cho các bạn có thể tự làm thử để trải nghiệm `Formik & Yup` thì ngay sau đây mình sẽ hoàn thiện nốt trước khi đi vào nội dung mới.

## Hoàn thiện form
<hr>

Đầu tiên ta xác định trong form gốc của chúng ta gồm có 5 field lần lượt là `username`, `email`, `password`, `plan` và `receive new letter`. Field `username` thì chúng ta đã xử lý xong nên sẽ bỏ qua và không nhắc lại nó nữa mà chỉ tập chung vào các field còn lại. Giả sử, với mỗi field còn lại ta đặt các điều kiện hợp lệ như sau:
- `email`:
    - Không được để trống
    - Định dạng đúng với email
- `password`:
    - Không được để trống
    - Có tối thiểu 8 kí tự
- `plan`:
    - Mặc định sẽ là basic
- `receive new letter`:
    - Mặc định là có

Chúng ta sẽ chữa nhanh lần lượt các field nói trên với các điều kiện đặt ra. Với field `email`, ở phần `withFormik()` chúng ta sẽ cập thêm code cho nó như sau:
```javascript
const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            username: '',
            email: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must have min 5 characters')
            .max(10, 'Username have max 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
    })
})(SignupForm)
```
Như các bạn thấy ở trên ta đã thêm một 2 phần mới trong hai method của `withFormik()` lần lượt là:
   - Trong method `mapPropsToValues()` ta sẽ thêm key `email` với nội dung mặc định là rỗng như với field `username`. 
   - Trong phần `validationSchema` ta cũng thêm phần nội dung dùng để kiểm tra dữ liệu nhập vào với field `email` gồm không được để trống và có định dạng là email. Cụ thể các `methods` mà `Yup` cung cấp sẵn cho chúng ta bạn có thể tham khảo tại [đây](https://github.com/jquense/yup) nếu không nhớ.
(*Lưu ý key trong `mapPropsToValues` và `validatationScheme` phải trùng với phần `name='email'` trong field Input của chúng ta trong giao diện*)
<br>

Tiếp đến chúng ta sẽ cập nhât lại phần code giao diện như sau:
   - Bạn hãy copy lại phần code giao diện của field `username` đã làm được ở phần trước sau đó paste lại xuống dưới và thay thế những chỗ có chứa từ `username` thành `email`. Kết quả thu được như sau
```javascript
<FormControl fullWidth margin='normal' error={!!this.props.errors.email}>
    <InputLabel>Email</InputLabel>
    <Input
        fullWidth
        name='email'
        value={this.props.values.email}
        onChange={this.props.handleChange} />
    <FormHelperText>{this.props.errors.email}</FormHelperText>
</FormControl>
```
Sau đó bạn mở trình duyệt lên và thử nhập lỗi sẽ thấy kết quả thu được như sau:
![](https://images.viblo.asia/5919c164-2028-41a6-b130-f3ae1c1b16a8.png)

- Tuy nhiên bạn có thể nhận thấy rằng bạn chỉ cần nhập 1 field bị lỗi thì lập tức field còn lại cũng sẽ báo lỗi mặc dù chúng ta chưa thao tác với nó. Sẽ tốt hơn nếu form chúng ta chỉ báo lỗi đối với field mà chúng ta đã hoặc đang thực hiện thao tác nhập dữ liệu chứ không phải kết quả như trên. Rất may là `Formik` đã cung cấp sẵn cho chúng ta một thuộc hỗ trợ cho việc này đó là `props.touch[field-name]`. Thuộc tính này sẽ dùng để xác nhận xem chúng ta đã thực hiện thao tác nhập với field đó hay chưa và bằng cách sử dụng nó ta có thể quyết định sẽ hiển thị lỗi hay không. Trước khi bắt tay vào việc sử dụng thuộc tính này thì chúng ta hãy hoàn thành  nốt form đã. 
<br>

- Tương tự với field `email` và `username` ta cũng làm tương tự cho `password` và thu được kết quả như sau:

**Phần code cho `Formik`:**
```javascript
const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            username: '',
            email: '',
            password: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must have min 5 characters')
            .max(10, 'Username have max 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must have min 8 characters')
    })
})(SignupForm)
```
**Phần code cho giao diện:**
```javascript
<FormControl fullWidth margin='normal' error={!!this.props.errors.password}>
    <InputLabel>Password</InputLabel>
    <Input
        fullWidth
        name='password'
        type='password'
        value={this.props.values.password}
        onChange={this.props.handleChange} />
    <FormHelperText>{this.props.errors.password}</FormHelperText>
</FormControl>
```
**Giao diện trên trình duyệt:**

![](https://images.viblo.asia/308072f6-abe0-4ebd-b3cb-552d7c44ac71.png)

Cuối cùng với field `plan` và `receive new letter` thì chúng ta chỉ cần cập nhật phần `mapPropsToValues` vì không yêu cầu điều kiện gì cụ thể:

**Code formik:**
```javascript
const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            username: '',
            email: '',
            password: '',
            receiveLetter: true,
            plan: 'basic'
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field
        username: Yup.string()
            .required('Username is required')
            .min(5, 'Username must have min 5 characters')
            .max(10, 'Username have max 10 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must have min 8 characters')
    }),
})(SignupForm)
```
**Code giao diện:**
```javascript
<FormControl fullWidth margin='normal'>
    <InputLabel>Plan</InputLabel>
    <Select
        name='plan'
        value={this.props.values.plan}
        onChange={this.props.handleChange}
    >
        <MenuItem value='basic'>Basic</MenuItem>
        <MenuItem value='advance'>Advance</MenuItem>
        <MenuItem value='enterprise'>Enterprise</MenuItem>
    </Select>
</FormControl>
<FormControlLabel
    control={
        <Checkbox
            name='receiveLetter'
            checked={this.props.values.receiveLetter}
            onChange={this.props.handleChange} />
    }
    label='Receive new letter'
/>
```
**Kết quả trên trình duyệt:**

![](https://images.viblo.asia/aff0f55f-8ecf-4f83-8e6a-0dd52affc590.png)

Vậy là chúng ta đã hoàn thành toàn bộ việc validate dữ liệu cho form. Tiếp theo chúng ta sẽ nói tới việc tối ưu lại code cũng như sửa vấn đề như chúng ta đã nói ở trên là việc 1 field bị lỗi dẫn đến các field cũng báo lỗi theo.

## Tối ưu lại code
<hr>

Như mình đã nói lướt qua ở trên, để giải quyết vấn đề khi ta tương tác với 1 field thì các field còn lại cũng báo lỗi ta sẽ sử dụng thuộc tính có tên là `touched` của `Formik`. Thuộc tính này ban đâu sẽ có giá trị dạng boolean và sẽ trả về true nếu chúng ta đã từng tương tác với field đó. Tương tác tính từ thời điểm lần đâu tiên chúng ta chạm vào field đó. Để sử dụng được thuộc tính này, ta sẽ cần import thêm hai component của `Formik` lần lượt là `Form` và `Field` ở cùng với vị trí mà chúng ta đã import `withFormik` đồng thời tối ưu lại trước một số đoạn code. Hãy bắt đầu bằng cách import thêm những nội dung cần thiết vào như sau::
```javascript
import { withFormik, Form, Field } from 'formik'
```
Tiếp đó, chúng ta sẽ tiến hành bọc toàn bộ phần code giao diện nằm trong method `render()` hiện tại của chúng ta vào trong component `Form` mà chúng ta vừa mới thêm vào như này:
```javascript
class TestForm extends Component {

    render() {
        return (
            <Form>
                # Toàn bộ nội dung cũ
            </Form>
        )
    }
}
```
Nếu bạn để ý thì trong code hiện tại của chúng ta đang bị lặp lại khá nhiều chỗ. Cụ thể ở mỗi field nhập liệu, ta đều phải thêm đi thêm lại các phần như:
```javascript
value={this.props.values.username}
onChange={this.props.handleChange}
``` 
Với việc sử dụng component `Field` ta có thể loại bỏ bớt các phần trên như sau:
```javascript
<Field
    name='email'
    render={({ field }) => (
        <Input fullWidth {...field} />
    )} />
```
Bằng cách sử dụng component `Field` như trên ta chỉ cần đặt `name` cho nó và 2 phần là `value`, `onChange` sẽ được tự động gán vào cho field nhập liệu của chúng ta (*Lưu ý phần select box không dùng được tính năng này nên chúng ta tạm thời giữu nguyên nó*). Sau khi cập nhật xong toàn bộ lại cái field với component `Field` thì đây là kết quả chúng ta thu được:
```javascript
<FormControl fullWidth margin='normal' error={!!this.props.errors.username}>
    <InputLabel>Username</InputLabel>
    <Field
        name='username'
        render={({ field }) => (
            <Input fullWidth {...field} />
        )} />
    <FormHelperText>{this.props.errors.username}</FormHelperText>
</FormControl>

<FormControl fullWidth margin='normal' error={!!this.props.errors.email}>
    <InputLabel>Email</InputLabel>
    <Field
        name='email'
        render={({ field }) => (
            <Input fullWidth {...field} />
        )} />
    <FormHelperText>{this.props.errors.email}</FormHelperText>
</FormControl>

<FormControl fullWidth margin='normal' error={!!this.props.errors.password}>
    <InputLabel>Password</InputLabel>
    <Field
        name='password'
        render={({ field }) => (
            <Input fullWidth type='password' {...field} />
        )} />
    <FormHelperText>{this.props.errors.password}</FormHelperText>
</FormControl>

<FormControl fullWidth margin='normal'>
    <InputLabel>Plan</InputLabel>
    <Select
        name='plan'
        value={this.props.values.plan}
        onChange={this.props.handleChange}
    >
        <MenuItem value='basic'>Basic</MenuItem>
        <MenuItem value='advance'>Advance</MenuItem>
        <MenuItem value='enterprise'>Enterprise</MenuItem>
    </Select>
</FormControl>

<Field
    name='receiveLetter'
    type='checkbox'
    render={({ field }) => (
        <FormControlLabel
            control={
                <Checkbox {...field} />
            }
            label='Receive new letter'
        />
    )}
/>
```
Như các bạn đã thấy ngoài phần select box thì toàn bộ các field của chúng ta giờ đây không còn phải thêm hai thuộc tính là `value` và `onChange` như ban đầu nữa mà chỉ cần như trên thôi. Ngoài ra việc sử dụng 2 component `Form` và `Field` như trên cho phép chúng ta sử dụng thuộc tính `touched`. Cụ thể ở vị trí hiển thị error cho các field nhập liệu bạn có thể sửa lại như sau:
```javascript
<FormControl fullWidth margin='normal' error={this.props.touched.username && !!this.props.errors.username}>
    <InputLabel>Username</InputLabel>
    <Field
        name='username'
        render={({ field }) => (
            <Input fullWidth {...field} />
        )} />
    {this.props.touched.username && <FormHelperText>{this.props.errors.username}</FormHelperText>}
</FormControl>
```
Bạn có thể thấy ta đã bổ sung thêm phần `this.props.touched.username` vào code của chúng ta, thuộc tính này sẽ trả về true nếu ta đã từng click vào field nhập liệu đó đồng thời chỉ khi ấy nó field của chúng ta mới bắt đầu hiển thị lỗi ra màn hình. Bạn có thể thử trên giao diện sẽ thấy sự khác biệt:

![](https://images.viblo.asia/ae82c002-631b-4a71-95bb-7b2b525af3e5.png)

Nếu như trước đây khi bạn nhập lỗi 1 field thì tất cả các field khác sẽ đồng loạt báo lỗi thì bây giờ khi bạn nhập lỗi một field thì field `username` mà chúng ta đã cập nhật hoàn toàn không báo lỗi gì cả mà chi khi ta tương tác với nó thì mới có lỗi. Ta cập nhật lại nốt cho `email` và `password` tương tự với `username` ở trên và đây là kết quả cuối cùng:

![](https://images.viblo.asia/bf0b9f27-3484-4e2c-a918-8c60588b3f47.png)

Chỉ duy nhất field `username` mà chúng ta đã tương tác bị lỗi còn lại thì không như chúng ta mong muốn.

## Lời kết
<hr>

Qua 2 phần về thao tác với React form sử dụng hai thư viện là `Formik & Yup` mong rằng bạn có thể hiểu được phần nào cách sử dụng 2 thư viện này và áp dụng nó vào project của mình. Nếu bạn có bất cứ thắc mắc nào có thể comment bên dưới mình sẽ giải đáp cho bạn. Cám ơn các bạn đã theo dõi.