Chào mọi người, ở bài này chúng ta tiếp tục với phần 2 của series VueJs cơ bản, ở bài này chúng ta cùng tìm hiểu kiến thức về props và slot trong VueJs nhé.

# Props
Một ứng dụng VueJS được xây dựng bằng các thành phần components và khi cần phải chuyền dữ liệu từ các component đến nhau thì ta sẽ sử dụng Props. Props trong Vuejs là một giá trị tùy chỉnh sử dụng để truyền dữ liệu từ component bậc cha đến các component con. Để có thể nhận được dữ liệu từ component cha thì component con phải khai báo prop mà nó mong muốn nhận được từ component cha, bằng cách đặt tên prop ở trong props scope. và các component con có thể truyền thông báo đến các component cha thông qua sự kiên.
Ví dụ ta có component cha sử dụng prop chuyền dữ liệu xuống component con.
``` php
// Component parent
<template>
    <child message="Xin chào!"></child>
</template>

<script>
    import child from 'path-to-child';

    export default {
        components: {
            child
        },
        data() {
        }
    }
</script>
```

```php
// Component child
<template>
    <div id="app">{{ message }}</div>
</template>

<script>
    export default {
        props: ['message'],
    }
</script>
```

ở ví dụ trên ta sử dụng static props, giá trị truyền từ component cha xuống component con là cố định.
Nếu ta muốn chuyền prop là một biến động ta dùng như sau

``` php
<child v-bind:message="message"></child>
```

**Chuyền một số**

Static:

`<blog-post v-bind:likes="42"></blog-post>`

dynamic 

`<blog-post v-bind:likes="post.likes"></blog-post>`

**Chuyền dữ liệu kiểu Boolean**

Static: 

`<base-input v-bind:favorited="false">`

Dynamic:  

`<base-input v-bind:favorited="post.currentUserFavorited">`

**Chuyền dữ liệu kiểu mảng**

Static: 

` <blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>`

Dynamic: <blog-post v-bind:comment-ids="post.commentIds"></blog-post>

**Chuyền dữ liệu là object hoặc thuộc tính của object**

Chuyền dự liệu object bài post 
``` php
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

`<blog-post v-bind="post"></blog-post>`

Chuyền các thuộc tính của object

``` php
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

# Slot
Nếu bạn muốn có những component có khả năng tùy biến linh hoạt cao, component  dùng chung button, modal, hay những component layout dùng chung header, navbar thì slot sẽ giúp bạn điều này.
Slot là một vị trí được xác định trước để ta có thể điền nội dung vào đó, ta có thể dùng nhiều slot để đặt nhiều chỗ, mỗi chỗ sẽ điền nội dung tùy biến vào chỗ đó, slot giúp code có thể tái sử dụng, clearn code và viết ít mã hơn và là một tính năng rất mạnh mẽ của VueJs 

### Dùng slot căn bản

vd: ta cần trèn nột dung html từ component cha vào component con

1.  tạo component con và xác định vị trí slot sẽ nhận dữ liệu

``` php
<div class="children">
  <slot></slot>
</div>
```

2. Tạo component cha và truyền nội dung muốn trèn vào vị trí slot ở component con

``` php
<div class="parent">
  <h2>Form thông tin user</h2>
  <child>
    <p>Họ và tên: Nguyễn Văn Thịnh</p>
  </child>
</div>
```

Nội dung sau khi render ra như sau:

![](https://images.viblo.asia/52d02e46-b0b7-4fbb-afcb-5e8f76a03898.png)

### Scoped slots
Scoped slots là một loại slot đặt biệt để có thể truyền dữ liệu  từ component con lên component cha thông qua việc gán dữ liệu thông qua thuộc tính.
Những kiểu dữ liệu có thể truyền là string, number, object, array .. hoặc method

 Ví dụ mình có một component con như sau:

``` php
<div class="children">
  <slot text="this is child!"></slot>
</div>
```

Như các bạn thấy, mình truyền vào slot một attribute là text kiểu như prop bạn thường thấy khi truyền vào component.

Tiếp theo đến component cha. Chúng ta sẽ lấy nội dung từ text thông qua thuộc tính slot-scope

``` php
<div class="parent">
  <p>Hello from parent</p>
  <child>
    <p slot-scope="props" v-text="props.text"></p>
  </child>
</div>
<p slot-scope="{ text }" v-text="text"></p>
```
# Kết luận
Prop và slot là những tính năng mạnh mẽ và quan trọng trong VueJs chúng ta nên dành thời gian tìm hiểu kỹ hơn phần này.
Cảm ơn mọi người đã đón đọc
Nguồn tham khảo: 
https://vi.vuejs.org/v2/guide/components-slots.html
https://vi.vuejs.org/v2/guide/components-props.html