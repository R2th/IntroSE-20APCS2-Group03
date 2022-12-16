# `Two way data binding in Vue`

Two way data binding Vue là một trong những tính năng mà Vue cung cấp, đồng bộ hóa đầu vào của người dùng và state của modal, tương tác qua lại giữa view và modal. Như vậy state sẽ được cập nhật bất cứ khi nào template thay đổi và ngược lại.

Two way binding là một tính năng mạnh mẽ, nếu được sử dụng đúng cách, có thể tăng tốc đáng kể quá trình phát triển. Đồng thời làm giảm sự phức tạp của việc quản lý các tương tác của người dùng phù hợp với state component.
![](https://images.viblo.asia/13b03eb1-92e6-4e4f-a8ff-0e4eb7565663.png)
Trong Vue, two way binding được thực hiện nhờ `v-model directive`. Với các sementic tag cơ bản, vue đã giúp tự động thực hiện việc này rồi

### V-model
Vue đã build sẵn các hàm api tương ứng. Khi thực hiện chỉ cần truyền data vào v-model của input đó
```html
<input v-model="text"/>
```
```js
data() {
  return {
    text: 'Hello there'  
  }
}
```
Với trường hợp input là check box thì sao. Vue sẽ coi rằng model lúc này sẽ phải là một array và khi input sẽ tương ứng là các value checkbox đó
```js
<p>A list of names: {{ names.join(', ') }}</p>
<label>
  <input type="checkbox" value="Daniel" v-model="names" />
  Daniel
</label>
<label>
  <input type="checkbox" value="Nathaniel" v-model="names" />
  Nathaniel
</label>
<label>
  <input type="checkbox" value="Hubert" v-model="names" />
  Hubert
</label>
```

### Binding với custom component
Vậy với component phức tạp hơn thi sao thì sao?
```js
<customer-input v-model="text" />
```
Giả sử bạn có một component như sau, vậy làm thế nào để v-model này có thể thực hiện cập nhật các dự liệu tương ứng với template input và chuyển tải các updated prop xuống component
```js
<template>
  <div>
    <h1>Custom component</h1>
    <input :value="value" @input="$emit('input', $event.target.value)" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    }
  },
}
</script>
```
Tại customer component, data được bind từ view modal xuống input thông qua prop value. Đây là nhờ `v-model directive` đã giúp truyền prop này. Tại view, khi user tương tác với input và trigger ra event input, vue sẽ bắt sự kiện và lấy giá trị value truyền lại lên cho parent component. Tại lúc này sẽ update data tương ứng.
```js
<customer-input :value="name" @input="name = $event" />
```
Cách này tương tự với trên khi không sử dụng `v-model directive`

### Conclusion
Trên đây là những bước cơ bản để thực hiện two way data binding. Ngoài directive `v-model`, trên Vue còn support một số util như `trim` `lazy` để thực hiện 1 số điều hết sức thú vị. Điều quan trọng khi sử dụng v-model là không trực tiếp thay đổi prop được truyền vào component mà hãy để chính vm thay đổi nó.

### `References`
1. https://alligator.io/vuejs/v-model-two-way-binding/
2. https://vuejs.org/v2/guide/forms.html