# Slot
## 1.Slot là gì
Hiểu đơn giản, slot được xem như là
* Một chỗ trống mà bạn muốn điền vào một phần nội dung
* Một số dòng code còn thiếu mà về sau bạn muốn thêm vào một cách dễ dàng


Một số trường hợp thường sử dụng slot đó là:

* Những component chung (Button, Modal, Card, Dropdown, Tabs, ...)
* Những component layout dùng chung (Header, Navbar, Footer...)
* Những component đệ quy (Tree, Menu...)


Ví dụ đơn giản với Slot:

* Giả sử như ta có một component <navigation-link>, trong template của <navigation-link>, ta viết
    ```html
    <a
      v-bind:href="url"
      class="nav-link"
    >
      <slot></slot>
    </a>
    ```
* Khi sử dụng component <navigation-link> ta có thể biên soạn như sau:
    ```html
    <navigation-link url="/profile">
      Your Profile
    </navigation-link>
    ```
* Khi component được render, `<slot></slot>` sẽ được thay thế bằng "Your Profile". Slot có thể chứa bất kì code template nào, bao gồm cả HTML:
    ```html
    <navigation-link url="/profile">
      <!-- Add a Font Awesome icon -->
      <span class="fa fa-user"></span>
      Your Profile
    </navigation-link>
    ```

    hoặc thậm chí  là component khác:
    ```html
    <navigation-link url="/profile">
      <!-- Use a component to add an icon -->
      <font-awesome-icon name="user"></font-awesome-icon>
      Your Profile
    </navigation-link>
    ```
    Nếu ở template của component `<navigation-link>` không chứa `<slot>`, bất kì nội dung nào được cung cấp giữa thẻ đóng và thẻ mở của component đó sẽ bị loại bỏ khi render component.
## 2. Compilation Scope
Khi chúng ta muốn sử dụng data ở trong một slot, chẳng hạn như
```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```
Ở ví dụ trên, slot có quyền truy cập đến data của component cha (vì cùng phạm vi). Tuy nhiên slot không có quyền truy cập đến phạm vi 
    của component <navigation-link>. Ví dụ, slot truy cập đến `url` là không được
```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!--
  The `url` will be undefined, because this content is passed
  _to_ <navigation-link>, rather than defined _inside_ the
  <navigation-link> component.
  -->
</navigation-link>
```

*NOTE: Mọi thứ trong template của component cha được biên dịch trong phạm vi của component cha, mọi thứ trong template của component con được biên dịch trong phạm vi của component con.*
    
#     Scoped Slots
## 1.  Scoped Slots được dùng như thế nào
Nhiều lúc chúng ta cần slot có quyền truy cập đến data trong phạm vi của component con. Chẳng hạn như, chúng ta có component <current-user>
với template như sau:
```html
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```    
Tuy nhiên Khi sử dụng component, chúng ta lại muốn render ra first name của user thay vì last name: 
```html
<current-user>
  {{ user.firstName }}
</current-user>
```    
Làm như trên là không được, bởi vì chỉ component `<current-user>` mới có quyền truy cập `user` mà nội dung mà chúng ta cung cấp `{{ user.firstName }}` lại ở component cha.

Để làm cho data `user` có thể truy cập bởi `slot` của cha, chúng ta cần bind `user` cho phần tử `slot`. Ở template của component `<current-user>`, ta viết:

```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```
Những thuộc tính mà  chúng ta liên kết với phần tử `<slot>` được gọi là **slot props**.  Bây giờ ở phạm vi của cha, chúng ta có thể sử dụng `v-slot` với giá trị là tên chúng ta đặt cho **slot props** :

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```
    
 Từ `slotProps` chúng ta có thể truy cập đến thuộc tính `user` mà chúng ta đã bind cho `slot` ở bên trên. Lưu ý ở ví dụ trên, chúng ta chọn tên của object chứa tất cả **slot props** của chúng ta là `slotProps`, tuy nhiên chúng ta có thể đặt cho nó một cái tên bất kì tùy thích.
     
## 2. Cách viết của ES6     
```html
<current-user v-slot="{ user }">
  {{ user.firstName }}
</current-user>
```
ES6 cho ta cách viết làm cho template trông sạch đẹp hơn, đặc biệt hữu dụng trong trường hợp slot cung cấp nhiều prop.
##   3. Ví dụ đơn giản với scoped slot
*Lưu ý: Ví dụ dưới đây sử dụng cú pháp cũ với thuộc tính `slot-scope`, vẫn hỗ trợ cho các phiên bản 2.x tiếp theo, tuy nhiên sẽ bị xóa bỏ ở phiên bản Vue 3. Hiện tại ở phiên bản Vue 2.6.0, chỉ thị `v-slot` được dùng thay thế cho thuộc tính `slot-scope` (như những ví dụ ở bên trên đã dùng)*
    
Trước tiên ta tạo một List.vue component
```html
<template>
  <div>
    <slot v-for="item in items"
          :item="item">
      <!-- fallback content here -->
    </slot> 
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>
<style>

</style>
```
Ở ví dụ trên ta sử dụng scoped slot ở chỗ thuộc tính `:item` được truyền vào `slot`, và như vậy ta có thể sử dụng nó khi chúng ta khai báo component `List` của chúng ta. Trong File App.vue:
```html
<template>
	<div id="app">
	  <div class="list-title">Text list</div>
		
		 <List :items="listItems">
		 	  <div slot-scope="row"
					   class="list-item1">
							 {{row.item.text}}
				</div>
		 </List>

		 <div class="list-separator"></div>

		<div class="list-title">Text & icons</div>
		 <List :items="listItems">
		 	  <div slot-scope="row"
					   class="list-item2">
							<i :class="row.item.icon"></i> 
							&nbsp {{row.item.text}}
				</div>
		 </List>
	</div>
</template>

<script>
import List from "./components/List.vue";
export default {
  name: "app",
  components: {
    List
  },
  data() {
    return {
      listItems: [
        { text: "First item", icon: "fa fa-user" },
        { text: "Second item", icon: "fa fa-copy" },
        { text: "Third item", icon: "fa fa-cut" }
      ]
    };
  }
};
</script>
```
Ở file trên chúng ta  sử dụng thuộc tính `slot-scope` liên kết với thuộc tính `item` mà chúng ta truyền vào `<slot>`:

![](https://images.viblo.asia/28166f15-b5e7-47f4-aa44-576d7dcd7341.png)
    
`row` ở đây là tên đặt tùy ý và bạn có thể đặt một cái tên khác mà bạn thích.

[Tham khảo link code](https://codesandbox.io/s/40mjwn311x?from-embed)
#     Kết luận
Slot và Scoped slot là một trong những tính năng mạnh mẽ nhất của Vuejs. Nó cho phép chúng ta có khả năng tùy biến các component với việc viết ít mã, code có thể tái sử dụng, giúp  clean code và tránh vi phạm nguyên tắc DRY. Hầu như tất cả các thư viện Vuejs UI đều sử dụng slot và scoped slot và có thể bạn đã dùng mà không hề biết. 
Nguồn tham khảo:
* https://vuejs.org/v2/guide/components-slots.html
* https://medium.com/binarcode/understanding-scoped-slots-in-vue-js-db5315a42391