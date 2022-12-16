Phần 1 https://viblo.asia/p/material-form-ui-reactjs-typescript-phan-1-L4x5xMWbKBM

---

Tiếp nối phần 1 khi chúng ta đã hoàn thành được 1 nửa chặng đường khi đã hoàn thành xong các yêu cầu:
- tạo checkbox 
- submit có dạng : `{categories: [1, 2, 3, 4]`
- multi checkbox
---
bài viết này chúng ta sẽ hoàn thành các yêu cầu  còn lại.

---

**Yêu cầu:** 
- tạo form cho 2 loại input text và checkbox + submit button
- dữ liệu khi submit form có dạng (chỉ cần console.log trong hàm thực thi): `{categories: [1, 2, 3, 4], meta: ["a", "b", "c"]}`
- meta ko được chứa dữ liệu rỗng
- cho phép add or remove input text
- multi checkbox
---

Phần 1: (https://viblo.asia/p/material-form-ui-reactjs-typescript-phan-1-L4x5xMWbKBM)

---
![](https://images.viblo.asia/3ef28ece-11c5-4322-add5-e02acfd03f5c.png)

## Start!!!

Mình sử dụng code của phần 1, nên các bạn nào mới có thể quay lại phần 1 và xem lại code giúp mình nhé :hugs::hugs:

`form.tsx`
```js:form.tsx
...
//tạo 1 state với số lượng input
const [inputs, setInputs] = useState([
    {
      id: 1,
      content: ""
    }
]);
...
 };
  const onAddClick = async () => {};

  const onRemoveClick = index => () => { };
...
<Grid container direction="column">
        <FormComponent
          categories={categories}
          inputs={inputs}
          onAddClick={onAddClick}
          onRemoveClick={onRemoveClick}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setInputs={setInputs}
        />
 </Grid>
```
`FormComponent.tsx`
```js:FormComponent.tsx
...
import { DynamicInput } from "./DynamicInput";
import { CategoryType, InputType } from "../types/form";

export const FormComponent = ({
  ...
  inputs,
  onAddClick,
  onRemoveClick,
  setInputs
}: {
  ...
  inputs: InputType[];
  onAddClick: () => void;
  onRemoveClick: (index: number) => () => void;
  setInputs: (value: InputType[]) => void;
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        ...
        <Grid container direction="column">
          <Grid item>
            <h3>Meta</h3>
          </Grid>
          <Grid container direction="column">
            {inputs.map((input: InputType, index: number) => {
              return (
                <DynamicInput
                  key={input.id}
                  onRemoveClick={onRemoveClick(index)}
                />
              );
            })}
          </Grid>
          <Grid
            container
            justify="center"
            style={{ marginTop: 20, marginBottom: 20 }}
            xs={10}
          >
            <Button variant="outlined" onClick={onAddClick}>
              Add
            </Button>
          </Grid>
         //button submit
        </Grid>
      </form>
    </>
  );
};
```

`InputType`

```js:types/form.ts
...
export type InputType = {
  id: number;
  content: string;
};

```
Và cuối cùng là `DynamicInput`
```js:DynamicInput.tsx
import React from "react";
import { Grid, OutlinedInput, Button } from "@material-ui/core";

export const DynamicInput = ({
  onRemoveClick
}: {
  onRemoveClick: () => void;
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <OutlinedInput
          id="my-input"
          style={{ marginBottom: 10, marginTop: 10 }}
          placeholder="Type any thing in here"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" onClick={onRemoveClick}>
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};
```
ok chúng ta đã có giao diện như sau
![](https://images.viblo.asia/dc86971f-d769-4fa4-ad69-765cc86bacdd.png)
 
 Tiếp theo như đề bài là ta có thể thêm input mỗi khi click button `Add` và remove input đó đi với button `Remove`, ta sửa lại 2 function ở trên nhé
 
 ```js:form.tsx
 ...
 const onAddClick = async () => {
 //chèn thêm 1 object input mới mỗi khi click butotn `Add`
    let newInput: InputType = {
      id: inputs.length,
      content: ""
    };
    setInputs([...inputs, newInput]);
  };
//xóa input đó đi với vị trí index được click
  const onRemoveClick = index => () => {
    let newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };
  ...
 ```
 
 Và đây là kết quả
 ![](https://images.viblo.asia/ac087e79-b6c7-408a-a813-cd3e89b8c19e.png)
 
 Vậy là đã gần xong rồi đó, nhưng bất chợt nhận ra là nếu khi ta có nhiều hơn 1 input thì khi muốn sửa text của input 1 và input 2 thì sao? với code hiện tại sẽ như thế nào? giá trị sẽ vào state `inputs` ra sao? Chắc chắn nếu hiện tại bạn chạy project nên và nhập input, state `inputs` field content của các input sẽ không có nội dung gì cả, vậy để fix lỗi này ta làm như sau:
 
 thêm hàm onChange cho DynamicInput
 
 ```js:FormComponent.jsx
 ...
 <DynamicInput
     key={input.id}
     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
     //set lại value input mỗi khi thay đổi dựa theo index của input được chọn 
     //với index đã có trong state `inputs`
         setInputs(
             inputs.map((value, inputSelector) => {
                 if (index === inputSelector)
                     value.content = e.target.value;
                     return value;
              })
          )
      }
      onRemoveClick={onRemoveClick(index)}
/>
 ...
 ```
 `DynamicInput`
```js:DynamicInput.tsx
...
export const DynamicInput = ({
...
  onChange,
}: {
...
  onChange: (event: object) => void;
}) => {
  return (
    <OutlinedInput
          ...
          onChange={onChange}
     />
};
```

Vậy là đã xử lý xong, handle lại chút function onSubmit để thấy kết quả nào

```js:form.tsx
const handleSubmit = event => {
    console.log("categories", categoriesSelector);
    console.log("-------------------------------");
    console.log("meta", getMeta(inputs));
    event.preventDefault();
  };
```

function helper `getMeta`

```js:getMeta.tsx
export const getMeta = arrInputs => {
  const result = arrInputs.map(input => {
    return input.content;
  });

  return result;
};
```

![](https://images.viblo.asia/a66a58c6-0943-465c-9fab-94cc6045d51d.png)


Run lại và xem kết quả xem đã đúng với yêu cầu đề bài chưa nào :hugs:
Và đây là [Source code](https://codesandbox.io/s/material-ui-practice-z0pt5?file=/index.tsx) của cả 2 phần.

---
Have a nice day! 

Welcome to ReactJS!!!:hugs::hugs::hugs: