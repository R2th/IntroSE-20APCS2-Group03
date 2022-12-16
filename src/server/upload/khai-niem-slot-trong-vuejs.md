## 1. Slots là gì ? 
Slots là một kỹ thuật  `Vue Components` cho phép bạn đặt nội dụng ở một vị trí mới hoặc tạo ra những component chung. Cách tốt nhất để hiểu Slots hoạt động như thế nào ?. Tôi sẽ đưa ra những khái niệm tới việc vận dụng nó vào những trường hợp nào bạn sẽ thấy trực quan khi làm dự án.

Hãy cùng tôi bắt đầu một ví dụ đơn giản:

(1)
```javascript
// Button.vue
<template>
  <button class="btn-wrapper">
    <slot /> // Vị trí giữa thẻ đóng/mở của Button sẽ được thay thế vào đây.
  </button>
</template>
```

(2)
```javascript
// App.vue
<template>
  <div id="app">
    <Button>Submit</Button>  // text 'Submit' sẽ được thay vào vị trí của slot tag trong Button component.
  </div>
</template>
```

Bạn cũng có thể để một nội dung mặc định khi mà bạn không thêm gì vào giữa thẻ đóng/mở của Button component

Tôi sửa một chút ở code:

(1)
```javascript
// Button.vue
<template>
  <button class="btn-wrapper">
    <slot>Default Content</slot> // Vị trí giữa thẻ đóng/mở của Button không có sẽ hiển thị nội dung này.
  </button>
</template>
```

(2)
```javascript
// App.vue
<template>
  <div id="app">
    <Button></Button> // Nội dung thẻ đóng/mở không có.
  </div>
</template>
```


## 2. Multiple/Named Slots
Bạn có thể thêm nhiều slot vào trong một component. Nếu làm cách này thì bạn cần cung cấp `name` cho mỗi `slot`. Nếu như `slot` nào không có `name`, nó là `default slot`. Ví dụ để tạo `multiple slots`.

```javascript
// Card.vue
<template>
  <div class="card-wapper">
    <slot name="title" /> // Ở đây sẽ render nội dụng của (1) có v-slot:title trong App .
    <slot /> // Ở đây sẽ render nội dung của (2).
  </div>
</template>
```

```javascript
// App.vue
<template>
  <div id="app">
    <Card>
      <template v-slot:title> // sử dụng v-slot directive để biết được là phần code trong `template` sẽ được thêm vào slot có name="title" trong Card component (1).
        <h1>Title</h1>
      </template>
      <div>Content</div> // render trong default slot (2).
    </Card>
  </div>
</template>
```

## 3. Scoped Slot
Một điều bạn cần biết là bạn có thể truyền data/function từ `children component` lên `parent component`. Để giải thích cái này, chúng ta sẽ tạo một `CurrentUser` component:

```javascript
// CurrentUser.vue
<template>
  <span>
    <slot v-bind:user="user"> // bind data vào slot.
      {{ user.firstName }}
    </slot>
  </span>
</template>
```

```javascript
// App.vue
<template>
  <div id="app">
    <CurrentUser v-slot:default="slotProps"> // Lấy data từ slot.
      {{ slotProps }} // Xem slotProps có gì nhé.
    </CurrentUser>
  </div>
<template>
```

Một số lưu ý:
- `slotProps` bạn có thể thay thế bằng một cái tên mà bạn muốn.
- Nếu bạn chỉ sử dụng `default slot`, bạn có thể bỏ `template` tag and đặt `v-slot` directive vào trực tiếp `CurrentUser` tag.
- Bạn có thể sử dụng `Object Destructuring` để tạo tham chiếu trực tiếp tới data thay vì sử dụng một tên biến: `v-slot="slotProps"` => `v-slot="{ user }"`.
-  Nếu `default slot` bạn có thể viết thành: `v-slot:default="slotProps"` => `v-slot="slotProps"`.
- `v-slot` có thể viết tắt `#`.
    - default slot: `v-slot="slotProps"` => `#default="shotProps"`.
    - named slot: `v-slot:title="slotProps"` => `#title="shotProps"` .

<br>
Nếu thấy bài viết bổ ích đối với bạn khi mới học Vue thì cho mình 1 vote nhé !@#$%^&*