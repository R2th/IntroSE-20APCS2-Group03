## Intro

Khi làm các dự án React, chúng ta đều nhận thấy được sự phức tạp và khó khăn mà chúng ta có thể gặp phải khi làm việc với `form`. Chúng ta phải xử lý các `form` dài dòng, `validate`, quản lý `state` của form và các `component` bên trong nó.

Điều này đã dẫn đến sự ra đời của các thư viện như [`redux-form`](https://redux-form.com/) hay sau đó là [`formik`](https://jaredpalmer.com/formik). Và gần đây là  [`react-hook-form`](https://react-hook-form.com/).

Ở bài viết này chúng ta sẽ cùng nhìn sơ qua một xíu về thư viện  [`react-hook-form`](https://react-hook-form.com/) này xem có gì hot ko nhé. Ok gâu gâu :dog: 

##  Một vài điểm nổi bật 

Thực sự thì có nhiều bài so sánh trên GG các bạn có thể tìm đọc, mình thì chỉ quan tâm đến `formik` (thư viện đang dùng) và `react-hook-form` 

![](https://images.viblo.asia/d31cc595-9381-447e-b8ac-16fe4a16db7d.png)

Sau một thời gian research (khoảng 16h :D ) và dùng thử thì mình cảm thấy một vài điểm đáng chú ý sau:
+ repo đạt > 13k stars => khá xịn 
+ Lượng download cũng tương đối lớn (tầm 1/3 `formik`)
+ 10 issues (mình vào repo xem thì hiện tại chỉ có 2 issues nhỏ): con số khá ấn tượng pk nào mn, cũng có thể là do thư viện mới, dự án chưa có QA, nhưng nhìn vậy là vui rồi :v 
+ Sử dụng hook (nhìn tên là biết rồi)
+ Có hỗ trợ `Yup`: cái này thì giúp mình có cảm giác quen thuôc, ko phải tìm hiểu cách viết validate khác. Đều muốn sử dụng thì chúng ta cần cài thêm package `@hookform/resolvers` vì package này được tách riêng
+ Có `FieldArray` như bên `formik`
+ Và theo như quảng cáo ở trang chủ `react-hook-form` thì lúc `onChange` nó render ít hơn (cái này thì mn thử tìm hiểu thêm nhé)

Ok, mình cảm giác chừng đó lý do đã đủ để chúng ta dùng thử e đó rồi pk nào. Sau đây là một vài đoạn code nhỏ mà mình đã vọc thử 

## Vọc vạch

### Form
```js
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Form = ({ onSubmit, errors, ...rest }) => {
  const methods = useForm(); // useForm tương tự như useFormik
  const { handleSubmit, setError } = methods;

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([name, message]) => {
        setError(name, {
          types: "mannual",
          message,
        });
      });
    }
  }, [errors]);

  return (
    <FormProvider {...methods}> // chúng ta cần FormProvider này để sử dụng context
      <form onSubmit={handleSubmit(onSubmit)} {...rest} />
    </FormProvider>
  );
};

export default Form;
```

### Field + Error
```js
import React from "react";
import { useFormContext } from "react-hook-form";
import _get from "lodash-es/get";

import Input from "../Input";

import Feedback from "./Feedback";

const Control = ({ type = "text", register, ...rest }) => {
  switch (type) {
    default:
      return <Input type={type} ref={register} {...rest} />; // register để khai báo một cái field
  }
};

const Field = ({ name, ...rest }) => {
  const { errors, register } = useFormContext(); 
  const error = _get(errors, `${name}.message`); //chỗ này thì mình dùng lodash cho tiện 

  return (
    <>
      <Control name={name} invalid={!!error} register={register} {...rest} />
      {error && <Feedback>{error}</Feedback>}
    </>
  );
};
```
Ngoài ra, còn có 1 package là `@hookform/error-message` để sử lý error, mn có thể tham khảo nhé 

Như vậy chúng ta đã có 1 form khá ok để sử dụng 

### Sử dụng
```js
import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Form from "@/components/Form"; // Cái Form mới viết đấy mn
import Button from "@/components/Button"; // Mẫy chỗ này làm màu thôi, ko có gì đâu nhé :v 
import { useAuthContext } from "@/contexts/AuthContext";

import * as S from "./styled";

const Login = () => {
  const history = useHistory();
  const { setUser } = useAuthContext();
  const [mutate, { isLoading, error }] = useMutation((data) =>
    axios.post("http://localhost:5000/login", data),
  );

  const handleSubmit = values => {
    mutate(values, {
      onSuccess(response) {
        setUser({ ...response.data, isAuthenticated: true });
        history.push("/");
      },
    });
  };

  return (
    <S.Wrapper>
      <S.FormWrapper>
      {/* Nhân vật chính là đây :v */}
        <Form onSubmit={handleSubmit} errors={error?.response?.data}>
          <Form.Group>
            <Form.Label htmlFor="email">Email (*)</Form.Label>
            <Form.Field type="text" name="email" id="email" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password (*)</Form.Label>
            <Form.Field type="password" name="password" id="password" />
          </Form.Group>
          <Button type="submit" disabled={isLoading} extend>
            Submit
          </Button>
        </Form>
      </S.FormWrapper>
    </S.Wrapper>
  );
};

export default Login;
```

Khoe hàng tý thôi ạ ^^

## Kết luận 
PR Tham khảo: https://github.com/JeDTr/react-query-boilerplate

Mình chỉ mới vọc qua sơ sơ thôi đều cảm giác khá thú vị, nhiều thứ để tìm hiểu mọi người ạ. Chúc mọi người thành công <3