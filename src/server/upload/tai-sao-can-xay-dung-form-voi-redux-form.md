# Tại sao cần xây dựng form với Redux Form ?
> 
> Bài viết được dịch từ bài [Why build your forms with Redux Form](https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8) của tác giả [Guilherme Gonçalves](https://medium.com/@guigonc)
> 

> Để đọc bài viết này, bạn cần có một chút kiến thức căn bản về **[ReactJs](https://viblo.asia/search?q=ReactJS)**

> Tiếp đó bạn cần tìm hiểu cơ bản về Redux Form, có thể tham khảo tại: [Bắt đầu với Reactjs- Phần 5, Tìm hiểu về redux-form](https://viblo.asia/p/bat-dau-voi-reactjs-phan-5-tim-hieu-ve-redux-form-bWrZnN9OZxw) của tác giả [Phan Quang Tien](https://viblo.asia/u/phan.quang.tien)
> 


**Nào bắt đầu thôi!**

![](https://images.viblo.asia/eeaa4270-c9bb-487c-a041-413fc886ebb9.png)

Khi tôi sử dụng forms cho ứng dụng React/Redux, tôi có xu hướng đẩy giá trị của input vào state, ngắn gọn hoặc không có chỉnh sửa( bởi vì forms thường đơn giản), tôi chưa bao giờ dừng lại để xem cách nó hoạt động như thế nào. Nhưng khi mà tôi và team của tôi được tham gia vào một dự án với các yêu cầu phức tạp hơn, tôi bắt đầu, chúng tôi bắt đầu tự hỏi rằng liệu có nên dùng tất cả những gì mà Redux đưa ra để kiểm soát dữ liệu đầu vào và state của ứng dụng hay không.

Trong những cuộc thảo luận, tôi nghe những thứ như: *"Đó chỉ là một form!"*, *"Chúng ta có thực sự cần các giá trị đầu vào trong state của ứng dụng không ?"*

Sau rất nhiều tranh luận, chúng tôi bắt đầu cân nhắc việc sử dụng thư viện Redux Form của Erik Rasmussen, nhưng việc đó lại nảy sinh ra các vấn đề khác như *Nó sẽ loại bỏ việc dễ tùy chỉnh trước đó để thực hiện các vi tùy chỉnh, có phải vậy không ?*

**Cuối cùng, chúng tôi đã quyết định sử dụng Redux Form và tôi chia sẻ những lí do với các bạn.**

## Tại sao cần có giá trị của form trong state của ứng dụng ?

**Bắt đầu đi vào một số ngữ cảnh cụ thể nào.**

Lịch sử phát triển web và công nghệ ngày nay dẫn tới việc tăng cường việc sử dụng client nhằm giảm tải việc xử lí của server và chia một phần gánh nặng đó cho client, việc mà trước đây trình duyệt chỉ cần nhận và hiển thị HTML và tất cả trách nhiệm do anh Server đảm nhận. Và hệ quả, bây giờ chúng ta đã sinh ra nhiều ứng dụng JavaScript có vẻ không còn đơn giản như trước. 

Các ứng dụng JavaScript này đã nhận các yêu cầu từ DOM, dễ thấy với các thư viện quá phổ biến như Jquery, Angular, và gần đây là React và Vue.js. Và khi React ra đời, nó đã thu hút được nhiều sự chú ý của cộng đồng Developer, nó mang theo khái niệm về luồng dữ liệu một chiều, về cơ bản dữ liệu của bạn (trạng thái của component hoặc trạng thái của ứng dụng nếu bạn sử dụng trình quản lí ứng dụng tương tự như Redux) hoạt động từ trên xuống và hầu nết các thay đổi chỉ nằm ở một phần của ứng dụng. Với React, là thư viện đầu tiên có thể dễ dàng render ra giao diện người dùng đại diện cho một nhóm dữ liệu không thực sự được sử dụng trong DOM, và nó mang đến một khái niệm khác, đoược gọi là `controlled components`.

**Controlled components là gì ?**

Controlled components thực ra là đầu vào HTML luôn luôn nhận giá trí của nó như là một thuộc tính. Nó cũng nhận được một loạt các handler sẽ được cập nhật trạng thái khi người dùng tương tác với nó.

```
const ControlledInput = ({ value, eventHandler }) => (
 <input value={value} onChange={eventHandler} />
)
```

**Nhưng đó vẫn chưa phải là câu trả lời hoàn chỉnh.**

Bằng cách có tất cả các trạng thái của ứng dụng trong Javascrip app và sử dụng các thành phần được kiểm soát, chúng ta có được một nguồn dữ liệu để có thể kiểm soát được hoàn toàn hành vi của ứng dụng.

Trong ngữ cảnh của một form, các React component có thể:

1.  Validate ngay lập tức
2.  Kiểm soát định dạng giá trị đầu vào
3.  Enable, disable, hiển thị hoặc ẩn các component.
4.  Xử lí giá trị đầu vào

**Redux form là gì ?**

Redux form là một lựa chọn tuyệt vời cho công việc của bạn. Nó theo dõi tất cả các trạng thái của ứng state như:

1. Định dạng của các trường.
2. Các giá trị của từng trường.
3. Các trường được tập trung xử lí.
4. Các giá trị hợp lệ
5. Các trường người dùng đã tương tác
6. Các form đang gửi.
7. Trường hợp xảy ra bất kì xác thực không đồng bộ nào.

Cùng xem xét đoạn code và xem cách thiết lập:

```
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import InputText from 'app/simpleForm/components/inputText'

const validateNotEmpty = value => !value ? 'Must enter a value' : null

const onSubmit = values => alert(JSON.stringify(values))

const SimpleForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <Field label="Country" name="country" component={InputText} validate={validateNotEmpty} type="text" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'simpleForm',
  initialValues: {
    country: 'Brazil'
  }
})(SimpleForm)
```

Ở đây, thực hiện kết nói form component với Redux bởi component reduxForm. Nó cũng cung cấp hàm `handleSubmit` để thực hiện hành động submit.

Component Field sử dụng lại input component giống như props của nó và hoạt động tương tự một container, đưa trạng thái của ứng dụng vào input compoent và xử lí cập nhật state trong store.

```
import React from 'react'

const InputText = ({ input, label, meta: { touched, error }}) => (<div>
  <label htmlFor={input.name}>{label}</label>
  <input {...input} type="text" />
  { touched && error && <span className="error">{error}</span>}
</div>)

export default InputText
```

Để ý đến component `InputText` ta nhận được các props trong Field.

Một điểm quan trọng là vẫn thuộc phần lớn vào lập trình viên khi viết các componnents inpút, theo cách đó, thư viện không lấy sự linh hoạt của bạn để quản lí các hành vi của form theo cách bạn muốn, thậm chí là thêm các tùy chỉnh khác.

Và để hoàn thiện việc tích hợp đó, chúng ta sẽ phải thêm reducer để xử lí thay đổi của statte trong form.

```
import { reducer as formReducer } from 'redux-form'

//...

const reducers = combineReducers({
  //...
  form: formReducer
})
```

Thật đơn giản phải không.

Tóm lại, chúng ta sẽ có tất cả các dữ liệu của form trong state của ứng dụng cho phéo bạn kiểm soát tất cả một cách đơn giản và dễ dàng thực hiện nó trong các ứng dụng React/Redux với Redux Form.

Tôi đã tạo một [repossitory](https://github.com/guigonc/redux-form-boilerplate) trên Github với sự tích hợp sẵn. Tôi khuyên bạn nên tìm hiểu [tài liệu](https://redux-form.com/)  Redux Form và xem qua Erik Rasmussen [video](https://www.youtube.com/watch?v=eDTi7lYR1VU&feature=youtu.be) để có một thông tin cụ thể và cách sử dụng trong từng trường hợp. Để có sự hiểu sâu hơn về controlled component nên xem bài [Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

Hi vọng những chia sẻ trên có thể giúp đỡ bạn trong việc quyết định sử dụng Redux Form trong project của bạn.