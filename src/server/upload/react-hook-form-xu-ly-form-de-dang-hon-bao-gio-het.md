# Mở đầu
![](https://images.viblo.asia/dbc84cf6-b605-4a41-a39f-b70e1f01bee4.png)

Hầu hết một Front-end Developer ai cũng trải qua việc xử lý form, nếu như không dùng thư viện thì việc này sẽ tốn rất nhiều thời gian để xử lý. Vì thế mình sẽ giới thiệu tới các bạn một thư viện giúp chúng ta tiết kiệm thời gian cho việc quản lý form, đó là **React Hook Form**. 

Là một thư viện quản lý form tốt nhất hiện nay mà bạn nên dùng. Ở bài viết này mình sẽ demo code với ReactJS.
## Tải xuống
**NPM**
```markdown
npm install react-hook-form
```
**YARN**
```markdown
yarn add react-hook-form
```
## Ví dụ cơ bản
Dưới đây là một ví dụ cơ bản của **React Hook Form**, các bạn hãy chú ý vào comment code để có thể hiểu về dòng code đó dùng để làm gì.
```javascript
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
      criteriaMode: "all"
  });

  return (
    // Hàm handleSubmit sẽ validate trước khi gọi hàm onSubmit
    <form onSubmit={handleSubmit(onSubmit)}>

      // đăng kí input cho Hook vói tên example 
      <input defaultValue="test" {...register("example")} />

      // đăng kí thẻ input với React-Hook-Form với tên "exampleRequired"
      // validate là required
      <input {...register("exampleRequired", { required: true })} />

      // xử lý lỗi bằng errrors
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

```
## Khái niệm chính

### useForm
useForm là một custom hook giúp quản lý form một cách dễ dàng.

#### Tham số truyền vào
Ví dụ:
```javascript
 const { register, handleSubmit, formState: { errors } } = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {},
      resolver: undefined,
      context: undefined,
      criteriaMode: "firstError",
      shouldFocusError: true,
      shouldUnregister: false,
      shouldUseNativeValidation: false,
      delayError: undefined
})
```
Một vài tham số thường dùng để truyền vào **useForm**:

**mode** : có các giá trị **onChange | onBlur | onSubmit | onTouched | all** . Dùng để cấu hình một chiến lược validate trước khi submit form.
* onSubmit: sẽ thực hiện validate khi submit form, và những element không hợp lệ sẽ được lắng nghe sự thay đổi và sau đó tiếp tục validate những element đó bằng mode onChange.
* onChange: sẽ thực hiện validate khi mỗi khi onChange element, và nó dẫn đến re-render nhiều lần ( cần cân nhắc khi sử dụng ).
* onBlur: sẽ thực hiện validate mỗi khi element có sự kiện blur.
* onTouch: sẽ thực hiện validate cho lần blur đầu tiên, sau đó sẽ thực hiện validate cho mỗi lần change event.
* all: sẽ thực hiện validate khi blur và change event.

**defaultValues**: thiết lập giá trị mặc định ( lần đầu ) cho form.

**criteriaMode**: có các giá trị **firstError | all**. Đối với **firstError** sẽ chỉ nhận được một lỗi đầu tiên, **all** sẽ nhận được tất cả lỗi.

**resolver**: hổ trợ validate đối với thirt-party ( yup ).

#### Tham số trả về

**Register**

Một trong những nội dung chính của React Hook Form, để đăng kí component của bạn với **hook**.

```markdown
function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />        
        <input type="submit" />
      </form>
    </>
  );
}
```

Ví dụ:
```javascript
<input
  {...register("test", {

     // validate
    required: true

    // bắt sự kiện onChange
  onChange: (e) => console.log(e) 

    // bắt sự kiện onBlur
  onBlur: (e) => console.log(e) 

  })}
/>
```
**handleSubmit**

handleSubmit sẽ thực hiện validate, nếu validate thành công sẽ gọi hàm onSubmit.
ví dụ:
```markdown
    <form onSubmit={handleSubmit(onSubmit)}>

       // các thẻ input khác ...

      <input type="submit" />
    </form>
  );
```

**formState**

```javascript
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isSubmitted, submitCount, isValid, isValidating },
  } = useForm();
  const onSubmit = (data: FormInputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
}
```
Các giá trị của **formState**:
* **errors** trả về một object chứa lỗi.
* **isDirty** so sánh với defaultValue trả về true nếu value hiện tại khác với defaultValue ( dùng để show pop-up khi user chỉnh sửa nhưng chưa submit ).
* **isSubmitting** trả về true khi form đang submit.
* **isSubmitted** trả về true khi form submit xong.
* **submitCount** trả về thời gian ( dạng number ) submit form .
* **isValid** trả về true nếu không có bất kì lỗi nào, false khi có lỗi.
* **isValidating** trả về true nếu đang validate.

 **watch**

watch sẽ lắng nghe sự thay đổi của ô input ( giống như sự kiện onChange ). watchShowAge sẽ tự động trigger nếu có sự thay đổi.
```javascript
import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const watchShowAge = watch("showAge", false); // đăng kí watch cho field showAge, truyền giá trị mặc định bằng đối số thứ 2
  const watchAllFields = watch(); // nếu không truyền tham số, watch sẽ lắng nghe và trả về tất cả fields

  const onSubmit = data => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="checkbox" {...register("showAge")} />

        <input type="submit" />
      </form>
    </>
  );
}
```

**reset**

Reset dùng để đặt lại giá trị mặc định cho Form ( thường dùng để sau khi call API chúng ta sẽ đặt lại giá trị mặc định để lắng nghe sự thay đổi của isDirty ).
```
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
      // call API
      const data = fetchListUser();
      reset(data); // đặt lại giá trị mặc định cho Form
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  );
}
```

**setError**

setError dùng để set lỗi cho một element.
```javascript
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName'}/>
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <button onClick={() => setError("firstName",'Message Error')}} >
        Set Error
      </button>
    </form>
  );
};
```

**clearError**

Đã có setError thì phải có clearError.
```javascript
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, clearError, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName'}/>
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <button onClick={() => clearError("firstName")}} >
        Clear Error
      </button>
    </form>
  );
};
```

**setValue**

Đây là function cho phép bạn set value cho một element.
```javascript
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('firstName'}/>
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <button onClick={() => setValue("test",'')}} > // set value của ô input thành '' ( rỗng ) 
        Clear Value
      </button>
    </form>
  );
};
```

**setFocus**

setFocus được dùng để set focus cho một element.
```javascript
export default function App() {
  const { register, handleSubmit, setFocus } = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    setFocus("firstName");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <input type="submit" />
    </form>
  );
}
```

**getValues**

Thường được dùng để lấy value hiện tại trên element.
```javascript
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, getValues } = useForm();

  return (
    <form>
      <input {...register("test")} />
      <input {...register("test1")} />

      <button
        type="button"
        onClick={() => {
          const values = getValues(); // { test: "test-input", test1: "test1-input" }
          const singleValue = getValues("test"); // "test-input"
          const multipleValues = getValues(["test", "test1"]); // ["test-input", "test1-input"]
        }}
      >
        Get Values
      </button>
    </form>
  );
}
```

**trigger**
Đây là trường hợp bạn muốn re-validate một cách thủ công hãy dùng **trigger()**.
ví dụ:
```markdown
trigger("lastName"); // chỉ trigger lastName

trigger(["firstName", "lastName"]); // trigger lastName firstName

trigger(); // trigger tất cả
```
### Validation và xử lý lỗi như thế nào ?
Validate, đây là phần khá quan trọng trong **React Hook Form** nó giúp các bạn thực hiện việc validate dễ dàng hơn. React Hook Form hổ trợ một số case validate như sau:
* required
* min
* max
* minLength
* maxLength
* pattern
* validate

Chúng ta cùng xem ví dụ dưới đây:

```javascript
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
      criteriaMode: "all"
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>ErrorMessage</h1>
      <input
        {...register("multipleErrorInput", {

            // xử lý lỗi khi bỏ trống
          required: "This input is required.",

            // xử lý lỗi khi nhập khác giá trị là số
          pattern: {
            value: /\d+/,
            message: "This input is number only."
          },

            // xử lý lỗi khi nhập nhiều hơn 10 kí tự
          minLength: {
            value: 11,
            message: "This input must exceed 10 characters"
          }
        })}
      />

      // ErrorMessage được import từ thư viện 
      <ErrorMessage

          // nhận vào props errors ( errors lấy từ formState ở trên ) nó sẽ trigger khi phát hiện lỗi khác.
        errors={errors}

        // name tương ứng với name input đã đăng kí với hook
        name="multipleErrorInput"

        // sẽ render ra giao diện khi có error, ở đây là thẻ p
        render={({ messages }) => {
          return messages.map((message,index) => (
                <p key={index}>{message}</p>
              ))
            : null;
        }}
      />

      <input type="submit" />
    </form>
  );
}
```

Bạn có thể tham khảo thêm [tại đây](https://codesandbox.io/s/react-hook-form-v7-errormessage-multiple-error-messages-forked-tv7g32?file=/src/index.js)
### Validate với yup
React-Hook-Form hổ trợ validate với yup, các bạn cần phải hiểu rõ về yup để tạo được schema
Ví dụ:
```javascript
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// tạo schema để validate
const schema = yup.object({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();

export default function App() {
  const { register, handleSubmit, formState:{ errors } } = useForm({

      // resolver dùng để validate với yup
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input {...register("age")} />
      <p>{errors.age?.message}</p>

      <input type="submit" />
    </form>
  );
}
```
### Controller

Khi dùng thư viện bên ngoài như MaterialUI, Andt, ReactSelect, ReactDapicker chúng ta sẽ sử dụng Controller để xử lý form.

**control** chứa các phương thức để đăng kí component với hook
Ví dụ:
```javascript
function App() {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />

      <input type="submit" />
    </form>
  );
}
```
## Kết thúc
Đây là những khái niệm chính của React-Hook-Form, có thể giúp bạn quản lý form một cách dễ dàng. Cảm ơn đã đọc bài viết :D :D
## Tài liệu tham khảo 
https://react-hook-form.com/