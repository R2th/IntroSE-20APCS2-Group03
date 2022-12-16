Hello anh em, sau 2 bài viết giới thiệu sự kết giữa Material Form UI + ReactJS + TypeScript thì nay mình sẽ convert chúng sang một thư viện hữu ích hơn thay vì sử dụng Form default của ReactJS, đó là [Formik](https://jaredpalmer.com/formik/)

Video giới thiệu Formik https://www.youtube.com/watch?v=oiNtnehlaTo&feature=youtu.be

![](https://images.viblo.asia/b8712188-b285-45b1-b4c9-c875c29410e9.png)


---
Phần 1 https://viblo.asia/p/material-form-ui-reactjs-typescript-phan-1-L4x5xMWbKBM

Phần 2 https://viblo.asia/p/material-form-ui-reactjs-typescript-phan-2-GrLZD3XeKk0

---
Như ở document của họ đã ghi rõ ràng 3 đặc điểm của họ như sau:

---

- Getting values in and out of form state
- Validation and error messages
- Handling form submission

---

Ok, mình bắt đầu convert qua Formik nào!!!

## Start!!!

Trước tiên xem lại yêu cầu nafo:

---
- tạo form cho 2 loại input text và checkbox + submit button
- dữ liệu khi submit form có dạng (chỉ cần console.log trong hàm thực thi):`{categories: [1, 2, 3, 4], meta: ["a", "b", "c"]}`
- meta ko được chứa dữ liệu rỗng
- cho phép add or remove input text
- multi checkbox
---

### Formik
Đầu tiên đối với Formik ta sẽ không phải tạo một đống state như trước nữa, mà sẽ sử dụng một props của nó, là `initialValues` để khởi tạo các field và value ban đầu của Form.

```js:FormControlComponent
<Formik
        initialValues={{
          categoriesSelector: [],
          inputs: [
            {
              id: Math.random(),
              content: ""
            }
          ]
        }}
        onSubmit={values => {
          console.log("categories", values.categoriesSelector);
          console.log("meta", getMeta(values.inputs));
        }}
      >
      {({
      // render
      })}
</Formik>
```
### render
Đối với Formik có 3 cách để render:

- <Formik component>
- <Formik children>
- <Formik render> //  `in 2.x`

 ### Props
Và rất nhiều [Props](https://jaredpalmer.com/formik/docs/api/formik#props-1) nhưng trong project demo này chúng ta chỉ cần 2 props mà Formik đã cung cấp sẵn cho đó là `values` và `handleChange`
    
```js:FormControlComponent
    ...
{({ values, handleChange }) => (
          <Form>
            <Grid container direction="column">
              <Grid item>
                <h2>Categories</h2>
              </Grid>
              <FieldArray name="categoriesSelector">
                {arrayHelpers => (
                  <Grid container direction="column">
                    {categories.map(category => {
                      return (
                        <CategoryItem
                          key={category.id}
                          category={category}
                          checked={values.categoriesSelector.includes(
                            category.id
                          )}
                          onSelector={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (event.target.checked) {
                              arrayHelpers.push(category.id);
                            } else {
                              const idx = values.categoriesSelector.indexOf(
                                category.id
                              );
                              arrayHelpers.remove(idx);
                            }
                          }}
                        />
                      );
                    })}
                  </Grid>
                )}
              </FieldArray>
            </Grid>
          </Form>
)}    
    ...
```
Formik có nhiều cách để render field, nhưng trong bài toán của chúng ta thì Categories đang là 1 array lên mình sẽ áp dụng FieldArray để làm bài toán này.
    
 - bạn có thấy trong `FieldArray` có một prrops tên là `name="categoriesSelector"` không

```js
    <FieldArray name="categoriesSelector">
 ```
        
- thấy nó giống tên filed trong `initialValues` của mình không? Vâng, bạn cứ hiểu đơn giản là bất kỳ xử lý dữ liệu gì ở `FieldArray` này sẽ được cập nhật giá trị vào values `categoriesSelector`.

### ArrayHeplers
- Tiếp theo như mình nói, vậy để handle các hàm, các giá trị thì làm như nào? Formik support chúng ta rõ ràng nhưng function cơ bản, mà từ cơ bản thì chúng ta có thể làm được mọi thứ đúng không, đó là [arrayHelpers](https://jaredpalmer.com/formik/docs/api/fieldarray#fieldarray-helpers), arrayHelpers support những hàm cơ bản như sau: 
- push
- swap
- move
- insert
- unshift
- remove
- pop
- replace

- Như các bạn thấy khác một chút với bản Form ReactJS

```js:Form-ReactJS
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
```
và
```js:Formik
 <CategoryItem
      key={category.id}
      category={category}
      checked={values.categoriesSelector.includes(
          category.id
      )}
      onSelector={(
          event: React.ChangeEvent<HTMLInputElement>
      ) => {
          if (event.target.checked) {
              arrayHelpers.push(category.id);
          } else {
              const idx = values.categoriesSelector.indexOf(
                  category.id
              );
              arrayHelpers.remove(idx);
          }
      }}
/> 
```
    
- ở đây mình có truyền thêm 1 props `checked`, và onSelector với 2 điểm chú ý đó là `arrayHelpers.push()` và `arrayHelpers.remove`. Bạn nào làm lâu với Form React JS thì sẽ nhận ra ngay 2 arrayHelpers này dùng làm gì, nó sẽ thêm 1 id checkbox được chọn hoặc xóa nó khỏi array được chọn đi. Chúng ta cùng quay lại bài trước và xem lại ta đã phải handle phần này như nào nhé

- Tiếp theo xử lý input cũng tương tự

```js
 <FieldArray name="inputs">
                {({ push, remove }) => (
                  <Grid container direction="column">
                    <Grid item>
                      <h3>Meta</h3>
                    </Grid>
                    <Grid container direction="column" alignItems="center">
                      {values.inputs.map((input, index) => {
                        const content = `inputs[${index}].content`;
                        return (
                          <DynamicInput
                            key={input.id}
                            name={content}
                            input={input}
                            onChange={handleChange}
                            onRemove={() => remove(index)}
                          />
                        );
                      })}
                      <Grid item style={{ marginTop: 20, marginBottom: 20 }}>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            push({ id: Math.random(), content: "" })
                          }
                        >
                          Add
                        </Button>
                      </Grid>
                      <Grid container justify="flex-end">
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
  </FieldArray>
 ```
 ---
 Như mình đã nói ở trên thì Formik đã support chúng ta tất cả những cái cơ bản nên ta convert qua dễ hiểu, và đây là [SourceCode](https://codesandbox.io/s/material-ui-practice-using-formik-cpddm?file=/components/CategoryItem.tsx) của mình.
 
---
### Thanks 
Thank you!~