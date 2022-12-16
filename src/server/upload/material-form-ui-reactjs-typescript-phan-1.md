Phần 2 https://viblo.asia/p/material-form-ui-reactjs-typescript-phan-2-GrLZD3XeKk0

---

Như tiêu đề bài viết, nội dung trong bài viết này của mình sẽ tạo một form basic sử dụng `Material UI`, `ReactJS` và `Typescript`. Vậy điều đầu tiên tại sao chúng ta lại cần typescript? Typescript hoạt động ra sao?

* Lý do đơn giản để sử dụng typescript đó là nếu bạn muốn code chặt chẽ hơn giữa các `data type`, có một sự đồng bộ giữa các member trong project thì hãy lên sử dụng typescript.

* Thực chất bạn không phải là học thêm một ngôn ngữ lập trình mới mà  `typescript` sẽ được transform qua `javascript` thông qua [Babel](https://reactnative.dev/docs/javascript-environment#javascript-syntax-transformers) và code của chúng ta vẫn là javascript như trước kia.

![](https://images.viblo.asia/41fdcca6-806d-4594-9e4e-061ea8705999.png)

---

**Yêu cầu:** 
- tạo form cho 2 loại input text và checkbox + submit button
- dữ liệu khi submit form có dạng (chỉ cần console.log trong hàm thực thi): `{categories: [1, 2, 3, 4], meta: ["a", "b", "c"]}`
- meta ko được chứa dữ liệu rỗng
- cho phép add or remove input text
- multi checkbox
---
 
## 2. Demo
Trước khi demo thì chúng ta cũng cần có các kiến thức cơ bản:
- [Basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html), các bạn chỉ cần dành thêm 5 phút để đọc chúng.
- [ReactJS Form basic](https://reactjs.org/docs/forms.html)
- [Material UI basic](https://material-ui.com/)
- [React Hooks basic](https://reactjs.org/docs/hooks-intro.html)

Và cài các dependency như sau:

- typescript
- types/react
- types/react-dom
- material-ui/core
- material-ui/lab

---
Start nào!!!

---

Đối với file `index.js` đơn giản chúng ta chỉ cần inport component Form mà chúng ta sẽ custom ngay bây giờ:
```js:index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { Form } from './form';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Form />
  </ThemeProvider>,
  document.querySelector('#root')
);
```

```js:form.tsx
import React, { useState } from "react";
import { Grid } from "@material-ui/core";

...

export function Form() {
    return (
    <>
      <Grid container direction="column">
        Hello!
      </Grid>
    </>
  );
}
```

Oke, giờ ta làm trước phần multi checkbox xem sao nhé, thay vì fix cứng data checkbox mình sẽ giả dụ như chúng ta đang có 1 cục data được server trả về như sau:

```js:form.tsx
import { FormComponent } from "./components/Form";

...

const categories = [
  { id: 1, name: "ryzen 3" },
  { id: 2, name: "ryzen 5" },
  { id: 3, name: "ryzen 7" },
  { id: 4, name: "ryzen 9" }
];
export function Form() {
    return (
        <>
          <Grid container direction="column">
            <FormComponent
              categories={categories}
            />
          </Grid>
        </>
      );
  };
```

Ở trên mình có pass `categories` qua một component khác mục đích đó là chúng ta sẽ xử lý tất cả ở trong component form.tsx và pass lại các hàm thực thi qua bên `FormComponent`, làm như vậy theo mình code sẽ được clean hơn rất nhiều.

```js:FormComponent.tsx
import React from "react";
import { FormControl, Grid, Button } from "@material-ui/core";
import { CategoryItem } from "./CategoryItem";
import { CategoryType } from "../types/form";

export const FormComponent = ({
  categories,
  handleChange,
}: {
  categories: CategoryType[];
  handleChange: (categoryId: number) => () => void;
}) => {
    return (
    <>
      <form>
        <Grid item>
          <h2>Categories</h2>
        </Grid>
        <FormControl>
          {categories.map((category: CategoryType) => {
            return (
              <CategoryItem
                category={category}
                handleChange={handleChange(category.id)}
              />
            );
          })}
        </FormControl>
      </form>
    </>
  );
};
```

```js:types/form.ts
export type CategoryType = {
  id: number;
  name: string;
};
```

```js:CategoryItem.tsx
import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { CategoryType } from "../types/form";

export const CategoryItem = ({
  category,
  handleChange
}: {
  category: CategoryType;
  handleChange: () => void;
}) => {
  return (
    <FormControlLabel
      key={category.id}
      control={<Checkbox onChange={handleChange} />}
      label={category.id + ". " + category.name}
    />
  );
};
```

Các bạn có thấy mình thêm 1 props `handleChange` vào trong FormComponent không? và nó được sử dụng để lấy id checkbox đã được click. Mục đích để chúng ta lấy các giá trị checkbox đã được chọn. Ok tiếp theo ta qua `form.tsx` và handle function `handleChange`:

```js:form.tsx
...
export function Form() {
  //tạo một state chứa các checkbox được chọn
  const [categoriesSelector, setCategoriesSelectors] = useState([]);

  const handleChange = (currentCheckBoxSelectored: number) => () => {
  //so sánh xem nếu category được chọn đã có trong state `categoriesSelector` chưa
    if (categoriesSelector.includes(currentCheckBoxSelectored)) {
      //nếu rồi thì tìm vị trí của nó theo tên phần tử `currentCheckBoxSelectored` và xóa nó đi
      let arrCheckBoxSelectored = [...categoriesSelector];
      arrCheckBoxSelectored.splice(
        categoriesSelector.indexOf(currentCheckBoxSelectored),
        1
      );
      setCategoriesSelectors(arrCheckBoxSelectored);
    } else {
    //còn chưa thì chúng ta sẽ thêm nó vào `categoriesSelector`
      let arrCheckBoxSelectored = [
        ...categoriesSelector,
        currentCheckBoxSelectored
      ];
      setCategoriesSelectors(arrCheckBoxSelectored);
    }
  };
  
  ...
  
  <Grid container direction="column">
        <FormComponent
          categories={categories}
          handleChange={handleChange}
        />
   </Grid>
```

Thêm button Submit để check kết quả thôi nhỉ :grinning:

```js:form.tsx
...

const handleSubmit = event => {
    console.log("categories", categoriesSelector);
    event.preventDefault();
 };
...
 <Grid container direction="column">
        <FormComponent
          categories={categories}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
 </Grid>
```

```js:FormComponent.tsx
import React from "react";
import { FormControl, Grid, Button } from "@material-ui/core";
import { CategoryItem } from "./CategoryItem";
import { CategoryType } from "../types/form";

export const FormComponent = ({
  ...
  handleSubmit
}: {
  ...
  handleSubmit: (event: object) => void;
}) => {
    return (
    <>
      <form onSubmit={handleSubmit}>
        ...
        <Grid container justify="flex-end" xs={10}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
         </Grid>
      </form>
    </>
  );
};
```
Cùng run xem kết quả nào:

và đây là kết quả khi mình lần đầu chọn 3 checkbox và sau đó bỏ chọn với check box `2. ryzen 5` đi

![](https://images.viblo.asia/594266e2-d4bf-499d-92a5-e148cb99ad29.png)