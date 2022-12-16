Bài viết được dịch lại của tác giả Austin Malerba từ https://medium.freecodecamp.org/how-i-built-an-async-form-validation-library-in-100-lines-of-code-with-react-hooks-81dbff6c4a04

Form là một thứ mà gần như bất kì ứng dụng nào cũng có, và khi đã có form thì chúng ta còn cần phải validate chúng nữa. Đây là một công việc ko mấy vui vẻ và nhiều khi dẫn đến đau đầu khi mà có thể có hàng tá trường hợp xảy ra. Rất may mắn là có rất nhiều thư viện giúp chúng ta làm công việc này. Tuy nhiên tôi muốn tự thử thách bản thân bằng cách tự build một thư viện như vậy với React Hooks API. Bạn nào chưa biết về Hooks API thì có thể xem [ở đây](https://reactjs.org/docs/hooks-reference.html)

Thư viện mà tôi build chỉ có khoảng 100 dòng code, tuy nhiên bài tuts này có khoảng 200 dòng vì tôi cần show cách sử dụng của nó nữa.

Rất nhiều bài tuts về validate form mà tôi đã đọc đều ko cover 3 vấn đề khá lớn sau: validate một cách bất đồng bộ, validate một trường khi trường khác thay đổi và tối ưu tuần suất validate. Đó là những vấn đề thường xuyên gặp phải của một ứng ụng thực tế mà nhiều bài tuts đã ko chỉ ra đc. Vậy nên trong bài này, tôi muốn cover càng nhiều use case càng tốt.


Đây là một số use case mà tôi muốn thực hiện:
+ Validate đồng bộ một trường và bất kì trường nào phụ thuộc vào nó khi nó thay đổi.
+ Validate bất đồng bộ một trường và bất kì trường nào phụ thuộc vào nó khi nó thay đổi.
+ Validate đồng bộ tất cả các trường trc' khi submit
+ Validate bất đồng bộ tất cả các trường trc' khi submit
+ Hiển thị lỗi khi submit trả về fail
+ Expose các hàm validate để dev có thể dùng nó ở bất kì họ muốn
+ Cho phép validate nhiều trường hợp cho một trường
+ Disable nút submit nếu form có lỗi
+ Ko hiển thị lỗi của trường nào đó nếu nó chưa đc động đến hoặc nút submit chưa đc bấm

Chúng ta sẽ làm một form đăng kí tài khoản với các trường username, password, password confirmation vì form này sẽ hội tụ đủ các use case đã được đề ra ở trên. Mục tiêu của chúng ta sẽ có đoạn code kiểu kiểu như sau:
```
const form = useForm({
  onSubmit,
});

const usernameField = useField("username", form, {
  defaultValue: "",
  validations: [
    async formData => {
      await timeout(2000);
      return formData.username.length < 6 && "Username already exists";
    }
  ],
  fieldsToValidateOnChange: []
});
const passwordField = useField("password", form, {
  defaultValue: "",
  validations: [
    formData =>
      formData.password.length < 6 && "Password must be at least 6 characters"
  ],
  fieldsToValidateOnChange: ["password", "confirmPassword"]
});
const confirmPasswordField = useField("confirmPassword", form, {
  defaultValue: "",
  validations: [
    formData =>
      formData.password !== formData.confirmPassword &&
      "Passwords do not match"
  ],
  fieldsToValidateOnChange: ["password", "confirmPassword"]
});

// const { onSubmit, getFormData, addField, isValid, validateFields, submitted, submitting } = form
// const { name, value, onChange, errors, setErrors, pristine, validate, validating } = usernameField
```

Về phía API thì có vẻ đơn giản, nhưng chúng lại rất linh hoạt. Bạn có thể nhận ra đoạn code trên có hai hàm tên khá giống nhau: validation và validate. Validation là một function nhận vào form data + tên trường và trả về message lỗi nếu có lỗi xảy ra hoặc là một giá trị falsy. Còn Validate là function sẽ chạy tất cả các validation function cho một trường và update list error của trường đó.

Việc trc' tiên cần làm là thêm phần xử lý khi thay đổi dữ liệu và submit form, chúng ta tạm thời chưa thêm gì liên quan đến validation cả, chỉ đơn giản là xử lý state thôi.

```
export const useField = (name, form, { defaultValue } = {}) => {
  let [value, setValue] = useState(defaultValue);

  let field = {
    name,
    value,
    onChange: e => {
      setValue(e.target.value);
    }
  };
  // đăng kí trường này vào form
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  let fields = [];

  const getFormData = () => {
    // lấy ra object chứa form data
    return fields.reduce((formData, field) => {
      formData[field.name] = field.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      return onSubmit(getFormData());
    },
    addField: field => fields.push(field),
    getFormData
  };
};

const Field = ({ label, name, value, onChange, ...other }) => {
  return (
    <FormControl className="field">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input value={value} onChange={onChange} {...other} />
    </FormControl>
  );
};

const App = props => {
  const form = useForm({
    onSubmit: async formData => {
      window.alert("Account created!");
    }
  });

  const usernameField = useField("username", form, {
    defaultValue: ""
  });
  const passwordField = useField("password", form, {
    defaultValue: ""
  });
  const confirmPasswordField = useField("confirmPassword", form, {
    defaultValue: ""
  });

  return (
    <div id="form-container">
      <form onSubmit={form.onSubmit}>
        <Field {...usernameField} label="Username" />
        <Field {...passwordField} label="Password" type="password" />
        <Field {...confirmPasswordField} label="Confirm Password" type="password" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
```

Chúng ta thêm state cho các giá trị của từng trường, sau khi khởi tạo từng trường thì sẽ đăng kí chúng vào form. Các hàm onChange handler cũng khá đơn giản. Hàm getFormData chỉ đơn giản là duyệt qua tất cả các trường và lưu lại giá trị của chúng vào một object. Ngoài ra bạn nên để ý thêm preventDefault để ngăn cả trang web bị reload khi chúng ta bấm submit.

Giờ thì bắt tay vào validation thôi. Trc' tiên, chúng ta chưa cần validate từng trường mà sẽ validate tất cả các trường mỗi khi một giá trị thay đổi hoặc khi form đc submit.

```
export const useField = (
  name,
  form,
  { defaultValue, validations = [] } = {}
) => {
  let [value, setValue] = useState(defaultValue);
  let [errors, setErrors] = useState([]);

  const validate = async () => {
    let formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    );
    errorMessages = errorMessages.filter(errorMsg => !!errorMsg);
    setErrors(errorMessages);
    let fieldValid = errorMessages.length === 0;
    return fieldValid;
  };

  useEffect(
    () => {
      form.validateFields(); // validate các trường khi giá trị thay đổi
    },
    [value]
  );

  let field = {
    name,
    value,
    errors,
    validate,
    setErrors,
    onChange: e => {
      setValue(e.target.value);
    }
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  let fields = [];

  const getFormData = () => {
    return fields.reduce((formData, field) => {
      formData[field.name] = field.value;
      return formData;
    }, {});
  };

  const validateFields = async () => {
    let fieldsToValidate = fields;
    let fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    let formValid = fieldsValid.every(isValid => isValid === true);
    return formValid;
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      let formValid = await validateFields();
      return onSubmit(getFormData(), formValid);
    },
    addField: field => fields.push(field),
    getFormData,
    validateFields
  };
};

const Field = ({
  label,
  name,
  value,
  onChange,
  errors,
  setErrors,
  validate,
  ...other
}) => {
  let showErrors = !!errors.length;
  return (
    <FormControl className="field" error={showErrors}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={validate}
        {...other}
      />
      <FormHelperText component="div">
        {showErrors &&
          errors.map(errorMsg => <div key={errorMsg}>{errorMsg}</div>)}
      </FormHelperText>
    </FormControl>
  );
};

const App = props => {
  const form = useForm({
    onSubmit: async formData => {
      window.alert("Account created!");
    }
  });

  const usernameField = useField("username", form, {
    defaultValue: "",
    validations: [
      async formData => {
        await timeout(2000);
        return formData.username.length < 6 && "Username already exists";
      }
    ]
  });
  const passwordField = useField("password", form, {
    defaultValue: "",
    validations: [
      formData =>
        formData.password.length < 6 && "Password must be at least 6 characters"
    ]
  });
  const confirmPasswordField = useField("confirmPassword", form, {
    defaultValue: "",
    validations: [
      formData =>
        formData.password !== formData.confirmPassword &&
        "Passwords do not match"
    ]
  });

  return (
    <div id="form-container">
      <form onSubmit={form.onSubmit}>
        <Field {...usernameField} label="Username" />
        <Field {...passwordField} label="Password" type="password" />
        <Field {...confirmPasswordField} label="Confirm Password" type="password" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
```

Đoạn code trên đã được cải tiến khá nhiều và nhìn thì có vẻ chạy ngon, tuy nhiên [đối với người dùng cuối thì nó rất củ chuối.](https://codesandbox.io/s/wy074qmk98?module=%2Fsrc%2FformHooks.js). Nó thiếu rất nhiều flag để chống lỗi bị hiển thị ở những thời điểm ko thích hợp. Nó validate trường trc' cả khi người dùng động vào chúng và hiển thị lỗi tương ứng.

Ít nhất thì chúng ta cần một flag để check xem người dùng đã động đến trường đó chưa để hiển thị lỗi. Ngoài flag đó ra, chúng ta cần thêm vài flag nữa. Ví dụ như flag chỉ người dùng đã bấm submit form, flag chỉ ra khi form đang đc submit và khi mỗi trường đang đc validate bất đồng bộ. Cũng có thể bạn đang thắc mắc tại sao chúng ta lại gọi validateFields ở useEffect mà ko phải là ở onChange handler. Chúng ta cần useEffect vì setValue chạy bất đồng bộ và nó ko trả về một Promise hay nhận vào một callback. Do đó, chỉ có cách duy nhất để biết đc setValue đã hoàn thành là theo dõi giá trị có bị thay đổi ko ở useEffect.

Giờ thì thêm những flag mà tôi đã nói ở trên để giúp UI gọn gàng hơn và xử lý mấy case trớ trêu

```
export const useField = (
  name,
  form,
  { defaultValue, validations = [], fieldsToValidateOnChange = [name] } = {}
) => {
  let [value, setValue] = useState(defaultValue);
  let [errors, setErrors] = useState([]);
  let [pristine, setPristine] = useState(true);
  let [validating, setValidating] = useState(false);
  let validateCounter = useRef(0);

  const validate = async () => {
    let validateIteration = ++validateCounter.current;
    setValidating(true);
    let formData = form.getFormData();
    let errorMessages = await Promise.all(
      validations.map(validation => validation(formData, name))
    );
    errorMessages = errorMessages.filter(errorMsg => !!errorMsg);
    if (validateIteration === validateCounter.current) {
      // đây là lần gọi gần nhất
      setErrors(errorMessages);
      setValidating(false);
    }
    let fieldValid = errorMessages.length === 0;
    return fieldValid;
  };

  useEffect(
    () => {
      if (pristine) return; // Tránh validate khi mới khởi tạo
      form.validateFields(fieldsToValidateOnChange);
    },
    [value]
  );

  let field = {
    name,
    value,
    errors,
    setErrors,
    pristine,
    onChange: e => {
      if (pristine) {
        setPristine(false);
      }
      setValue(e.target.value);
    },
    validate,
    validating
  };
  form.addField(field);
  return field;
};

export const useForm = ({ onSubmit }) => {
  let [submitted, setSubmitted] = useState(false);
  let [submitting, setSubmitting] = useState(false);
  let fields = [];

  const validateFields = async fieldNames => {
    let fieldsToValidate;
    if (fieldNames instanceof Array) {
      fieldsToValidate = fields.filter(field =>
        fieldNames.includes(field.name)
      );
    } else {
      // nếu fieldNames ko có gì thì sẽ validate tất cả các trường
      fieldsToValidate = fields;
    }
    let fieldsValid = await Promise.all(
      fieldsToValidate.map(field => field.validate())
    );
    let formValid = fieldsValid.every(isValid => isValid === true);
    return formValid;
  };

  const getFormData = () => {
    return fields.reduce((formData, f) => {
      formData[f.name] = f.value;
      return formData;
    }, {});
  };

  return {
    onSubmit: async e => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitted(true); // Người dùng đã bấm submit ít nhất một lần
      let formValid = await validateFields();
      let returnVal = await onSubmit(getFormData(), formValid);
      setSubmitting(false);
      return returnVal;
    },
    isValid: () => fields.every(f => f.errors.length === 0),
    addField: field => fields.push(field),
    getFormData,
    validateFields,
    submitted,
    submitting
  };
};

const Field = ({
  label,
  name,
  value,
  onChange,
  errors,
  setErrors,
  pristine,
  validating,
  validate,
  formSubmitted,
  ...other
}) => {
  let showErrors = (!pristine || formSubmitted) && !!errors.length;
  return (
    <FormControl className="field" error={showErrors}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        value={value}
        onChange={onChange}
        onBlur={() => !pristine && validate()}
        endAdornment={
          <InputAdornment position="end">
            {validating && <LoadingIcon className="rotate" />}
          </InputAdornment>
        }
        {...other}
      />
      <FormHelperText component="div">
        {showErrors &&
          errors.map(errorMsg => <div key={errorMsg}>{errorMsg}</div>)}
      </FormHelperText>
    </FormControl>
  );
};

const App = props => {
  const form = useForm({
    onSubmit: async (formData, valid) => {
      if (!valid) return;
      await timeout(2000); // Giả lập thời gian load qua mạng
      if (formData.username.length < 10) {
        // Giả lập trả về lỗi 400 từ server
        usernameField.setErrors(["Make a longer username"]);
      } else {
        //Giả lập trả về lỗi 201 từ server
        window.alert(
          `form valid: ${valid}, form data: ${JSON.stringify(formData)}`
        );
      }
    }
  });

  const usernameField = useField("username", form, {
    defaultValue: "",
    validations: [
      async formData => {
        await timeout(2000);
        return formData.username.length < 6 && "Username already exists";
      }
    ],
    fieldsToValidateOnChange: []
  });
  const passwordField = useField("password", form, {
    defaultValue: "",
    validations: [
      formData =>
        formData.password.length < 6 && "Password must be at least 6 characters"
    ],
    fieldsToValidateOnChange: ["password", "confirmPassword"]
  });
  const confirmPasswordField = useField("confirmPassword", form, {
    defaultValue: "",
    validations: [
      formData =>
        formData.password !== formData.confirmPassword &&
        "Passwords do not match"
    ],
    fieldsToValidateOnChange: ["password", "confirmPassword"]
  });

  let requiredFields = [usernameField, passwordField, confirmPasswordField];

  return (
    <div id="form-container">
      <form onSubmit={form.onSubmit}>
        <Field
          {...usernameField}
          formSubmitted={form.submitted}
          label="Username"
        />
        <Field
          {...passwordField}
          formSubmitted={form.submitted}
          label="Password"
          type="password"
        />
        <Field
          {...confirmPasswordField}
          formSubmitted={form.submitted}
          label="Confirm Password"
          type="password"
        />
        <Button
          type="submit"
          disabled={
            !form.isValid() ||
            form.submitting ||
            requiredFields.some(f => f.pristine)
          }
        >
          {form.submitting ? "Submitting" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
```

Ở lần chỉnh sửa này, chúng ta đã thêm khá nhiều. Chúng ta thêm 4 cờ: pristine, validating, submitted, và submitting. Chúng ta thêm cả pass cả params fieldsToValidateOnChange cho validateFields để chỉ ra những trường nào cần validate khi một trường thay đổi. Chúng ta dùng những flag đó để điều khiển UI khi hiển thị spinner hoặc error hoặc để disable nút submit.

Còn một điều nữa có thể bạn đã để ý là validateCounter. Chúng ta cần lưu lại số lần mà những validate function đc gọi vì tại thời điểm mà validate function đó có kết quả, có khả năng là validate lại bị gọi lần nữa. Ở trường hợp này, chúng ta sẽ bỏ qua kết quả của lần validate đó và chỉ dùng kết quả của lần validate gần nhất.

Cuối cùng cũng đã xong, và đây là thành quả cuối cùng: https://codesandbox.io/embed/x964kxp2vo