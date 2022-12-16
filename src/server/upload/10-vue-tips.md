Đôi khi để nghiên cứu một ngôn ngữ nào đó chúng ta phải đọc hàng tá trang docs thì mới moi được cái ý mình cần. Dạo này mình cũng lang thang đọc sang chút Vue chen chân nghề nghiệp nên cũng có lượm lặt được vài tips, nếu ai biết òi thì đọc sơ sơ òi đi ra tìm cái xịn hơn còn ai chưa biết thì mời các bạn xem qua một vài tip dưới đây xem có tận dụng được cho bản thân mình không nha:


## 1. Validate type đầu vào 

Sử dụng validator trong prop, bạn có thể hạn chế prop một tập giá trị cụ thể

```js
export default {
  name: 'Image',
  props: {
    src: {
      type: String,
    },
    style: {
      type: String,
      validator: s => ['square', 'rounded'].includes(s)
    }
  }
};
```
Hàm xác nhận này nhận vào một giá trị và trả về một trong hai `true` hoặc `false` nếu phương thức hỗ trợ hợp lệ hoặc không.

Điều này thường được sử dụng khi cần nhiều tùy chọn hơn mức `boolean` cho phép, nhưng vẫn muốn hạn chế những gì có thể được thiết lập.

Các loại `button` hoặc loại `alert` (info, success, danger, warning)  là một số cách sử dụng phổ biến nhất. Màu sắc cũng là một công dụng thực sự cho loại này

## 2. Content mặc định và mở rộng

Các `slot` trong `Vue` có thể có nội dung mặc định, cho phép bạn tạo các thành phần dễ sử dụng hơn nhiều:
```html
<button class="button" @click="$emit('click')">
  <slot>
    <!-- Used if no slot is provided -->
    Click me
  </slot>
</button>
```
Mặc dù vậy, cách sử dụng yêu thích của mình cho các vị trí mặc định là sử dụng chúng để tạo các điểm mở rộng.

Về cơ bản, thì phải lấy bất kỳ phần nào của một thành phần, bọc nó vào một vị trí và bây giờ bạn có thể ghi đè phần đó bằng phần khác. Theo mặc định, nó sẽ vẫn hoạt động theo cách mà nó luôn có, nhưng bây giờ thì chúng ta có nhiều tùy chọn hơn rồi :
```html
<template>
  <button class="button" @click="$emit('click')">
    <!-- Adding in the slot tag does nothing at first -->
    <!-- We can override this by providing content to the slot -->
    <slot>
      <div class="formatting">
        {{ text }}
      </div>
    </slot>
  </button>
</template>
```
Bây giờ bạn có thể sử dụng thành phần này theo nhiều cách khác nhau. Cách dễ dàng, mặc định hoặc theo cách tùy chỉnh của chính bạn:
```html
<!-- Uses default functionality of the component -->
<ButtonWithExtensionPoint text="Formatted text" />

<!-- Use the extension point to create custom behaviour -->
<ButtonWithExtensionPoint>
  <div class="different-formatting">
    Do something a little different here
  </div>
</ButtonWithExtensionPoint>
```



## 3. Sử dụng dấu '' để xem các giá trị lồng nhau
Có thể bạn chưa biết điều này, nhưng bạn có thể dễ dàng xem trực tiếp các giá trị lồng nhau, chỉ bằng cách sử dụng dấu ngoặc kép:
```js
watch {
  '$route.query.id'() {
    // ...
  }
}
```
Điều này thực sự hữu ích để làm việc với các đối tượng lồng nhau rắc rối nha
## 4. Khi nào dùng `v-if`

Thay vì sử dụng `v-if`, đôi khi sử dụng `v-show` thấy hiệu quả hơn nha:
```html
<ComplicatedChart v-show="chartEnabled" />
```
Khi `v-if` được bật và tắt, nó sẽ tạo và destroy hoàn toàn phần tử. Thay vào đó, `v-shows` ẽ tạo phần tử và để nó ở đó, ẩn nó bằng cách đặt kiểu của nó thành `display: none`.

Làm điều này có thể hiệu quả hơn nhiều nếu bạn đang muốn hiển thị nút on - off.

Mặt khác, nếu bạn không cần thành phần 'đắt giá' đó ngay lập tức, hãy sử dụng `v-if` để nó sẽ bỏ qua việc hiển thị và tải trang nhanh hơn một chút.

## 5. Viết tắt cho `slot` đơn

Khe cắm theo phạm vi rất thú vị, nhưng để sử dụng chúng, bạn cũng phải sử dụng nhiều thẻ `template`.

May mắn thay, có một cách viết tắt giúp chúng ta loại bỏ nó, nhưng chỉ khi chúng ta đang sử dụng một phạm vi slot duy nhất.

Thay vì viết thế này:
```html
<DataTable>
  <template #header="tableAttributes">
    <TableHeader v-bind="tableAttributes" />
  </template>
</DataTable>
```
Chúng ta có thể viết như này:
```html
<DataTable #header="tableAttributes">
  <TableHeader v-bind="tableAttributes" />
</DataTable>
```
Đơn giản hơn òi đó ^^

## 6. Slot hiển thị có điều kiện
Trước tiên, chúng ta xem cách thực hiện, sau đó chúng ta sẽ tìm hiểu lý do tại sao lại muốn ẩn các slot.

Mỗi thành phần `Vue` có một `$slots` đối tượng đặc biệt với tất cả các vị trí của bạn trong đó. Vị trí mặc định có khóa `default` và bất kỳ vị trí nào được đặt tên đều sử dụng tên của chúng làm khóa:
```js
const $slots = {
  default: <default slot>,
  icon: <icon slot>,
  button: <button slot>,
};
```
Nhưng đối tượng `$slots` này chỉ có các `slot` được áp dụng cho thành phần, không phải mọi `slot` được xác định .

Lấy thành phần này xác định một số vị trí, bao gồm một số vị trí được đặt tên:
```html
<!-- Slots.vue -->
<template>
  <div>
    <h2>Here are some slots</h2>
    <slot />
    <slot name="second" />
    <slot name="third" />
  </div>
</template>
```
Nếu chúng ta chỉ áp dụng một vị trí cho thành phần, chỉ vị trí đó sẽ hiển thị trong đối tượng `$slots` của chúng ta :
```html
<template>
  <Slots>
    <template #second>
      This will be applied to the second slot.
    </template>
  </Slots>
</template>
```
```html
$slots = { second: <vnode> }
```
Chúng ta có thể sử dụng điều này trong các thành phần của mình để phát hiện các vị trí đã được áp dụng cho thành phần, ví dụ: bằng cách ẩn phần tử div cho slot:
```html
<template>
  <div>
    <h2>A wrapped slot</h2>
    <div v-if="$slots.default" class="styles">
      <slot />
    </div>
  </div>
</template>
```
Bây giờ `div` áp dụng kiểu sẽ chỉ được hiển thị nếu chúng ta thực sự lấp đầy vị trí đó bằng thứ gì đó.

Nếu chúng ta không sử dụng `v-if`, chúng ta sẽ k còn `slot` và `div` không cần thiết nếu chúng ta không có một vị trí. Tùy thuộc vào kiểu dáng mà `div` có, điều này có thể làm rối bố cục của chúng ta và làm cho mọi thứ trông lạ lẫm. 

***Vậy tại sao chúng ta muốn hiển thị các vị trí có điều kiện?***

Có ba lý do chính để sử dụng vị trí có điều kiện:

1. Khi sử dụng wrapper divs để thêm các kiểu mặc định
1. slot trống
1. Nếu chúng ta đang kết hợp nội dung mặc định với các vị trí lồng nhau



Ví dụ: khi chúng ta thêm các kiểu mặc định, chúng ta sẽ thêm một `div` trống:

```html
<template>
  <div>
    <h2>This is a pretty great component, amirite?</h2>
    <div class="default-styling">
      <slot >
    </div>
    <button @click="$emit('click')">Click me!</button>
  </div>
</template>
```
Tuy nhiên, nếu không có nội dung nào được thành phần chính áp dụng cho slot đó, chúng ta sẽ kết thúc với một trang trống mà `div` được hiển thị cho trang:
```html
<div>
  <h2>This is a pretty great component, amirite?</h2>
  <div class="default-styling">
    <!-- No content in the slot, but this div
          is still rendered. Oops. -->
  </div>
  <button @click="$emit('click')">Click me!</button>
</div>
```
Mặc dù vậy, thêm điều đó `v-if` vào gói `div` giải quyết vấn đề. Không có nội dung nào được áp dụng cho vị trí? Không vấn đề gì:
```html
<div>
  <h2>This is a pretty great component, amirite?</h2>
  <button @click="$emit('click')">Click me!</button>
</div>
```
Đây là Codesandbox có bản demo đang hoạt động nếu bạn muốn xem (bản này mình cũng cóp về cho trực quan nha): https://codesandbox.io/s/reactive-slots-bth28?file=/src/components/HasSlot.vue

    
## 7. Cách biết các thay đổi bằng slot

Đôi khi chúng ta cần biết khi nào nội dung bên trong một vị trí đã thay đổi:
```html
<!-- Too bad this event doesn't exist -->
<slot @change="update" />
```
Thật không may, Vue không có cách tích hợp để chúng ta có thể dễ phát hiện điều này.

Tuy nhiên, các sư phụ mình đọc bài đã tìm ra một cách rất dễ thực hiện điều này bằng cách sử dụng [ mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) :
```js
export default {
  mounted() {
    // Call `update` when something changes
    const observer = new MutationObserver(this.update);

    // Watch this component for changes
    observer.observe(this.$el, {
      childList: true,
      subtree: true
    });
  }
};
```
Bạn cũng sẽ cần phải refresh `observer`, nhưng Austin đề cập đến điều đó và hơn thế nữa, trong bài viết của [anh ấy](https://austingil.com/watching-changes-vue-js-component-slot-content/) .

## 8. Kết hợp local và global styles
```html
<style scoped>
  .component {
    background: green;
  }
</style>
```

Bình thường, chúng ta có thể thêm scoped vào thẻ style để áp dụng riêng style cho component này.
Nhưng chúng ta cũng có thể kết hợp cả style global và style scope như sau

```html
<style>
  /* Applied globally */
  .component p {
    margin-bottom: 16px;
  }
</style>

<style scoped>
  /* Scoped to this specific component */
  .component {
    background: green;
  }
</style>
```

Hãy cân nhắc kỹ khi sử dụng phương pháp này vì có thể gây nên sự mất kiểm soát, khó debug
## 9. Truy cập style của component con
Style theo compoent là 1 thứ rất tuyệt vời, nó giúp chúng ta kiểm soát được tối đã style mà không làm ảnh hưởng đến các component khác.
Nhưng đôi khi chúng ta cũng nên linh động cho việc style, biết được điều đó Vue đã cung cấp cho chúng ta 1 chức năng để có thể style cho các component con

```html
<style scoped>
/* Override CSS of a child component
   while keeping styles scoped */
.my-component >>> .child-component {
  font-size: 24px;
}
</style>
```

Lưu ý: Nếu bạn đang sử dụng bộ xử lý trước CSS như SCSS, bạn có thể cần sử dụng /deep/thay thế
## 10. Destructuring in a v-for
Các ví dụ sau đây sẽ giúp bạn hiểu rõ hown

```html
<li
  v-for="{ name, id } in users"
  :key="id"
>
  {{ name }}
</li>
```
```html
<li v-for="(movie, index) in [
  'Lion King',
  'Frozen',
  'The Princess Bride'
]">
  {{ index + 1 }} - {{ movie }}
</li>
```
```html
<li v-for="(value, key) in {
  name: 'Lion King',
  released: 2019,
  director: 'Jon Favreau',
}">
  {{ key }}: {{ value }}
</li>
```
```html
<li v-for="(value, key, index) in {
  name: 'Lion King',
  released: 2019,
  director: 'Jon Favreau',
}">
  #{{ index + 1 }}. {{ key }}: {{ value }}
</li>
```