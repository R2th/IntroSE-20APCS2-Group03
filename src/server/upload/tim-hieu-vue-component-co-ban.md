# Giới thiệu
* Vuejs là một framework vô cùng mạnh mẽ và phổ biến hiện nay dùng cho phát triển frontend. Và nhắc đến Vuejs, người ta thường nhắc đến 1 thứ đặc trưng nhất của nó: Vue Component.
* Vì thế hôm nay, mình sẽ giới thiệu tới các bạn kiến thức cơ bản nhất về Vue Component để các bạn có thể dễ dàng áp dụng vào dự án mình đang làm nhé !
# Vue Component là gì?
- Component là 1 khối bao gồm 1 nhóm code liên quan tới 1 đối tượng và tất cả các xử lý sự kiện, thay đổi giá trị trên đối tượng đó, từ đó có thể tái sử dụng mà không cần viết lại code. Ngoài ra nó còn giúp cho việc quản lý code, bảo trì, sửa chữa code dễ dàng hơn, code dễ đọc hơn. 
- Sau đây để hiểu hơn về công dụng của Component ta thử xem qua 1 ví dụ dưới đây nhé:
# Ví dụ về Component
```JS
// Define a new component called button-counter
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
* Các component có thể được sử dụng bằng cách gọi tên, trong trường hợp trên là 
<button-counter> . Bạn có thể sử dụng component như là 1 phần tử trong Vue instance:
```HTML
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
```JS
new Vue({ el: '#components-demo' })
```
* Và đây là kết quả
    
![](https://images.viblo.asia/d60f9fb4-94c1-41ab-956b-18bb81c2ee07.gif)
    
# Tái sử dụng Component
  -   Component có thể được tái sử dụng nhiều lần nếu bạn muốn chỉ bằng cách gọi tên lại component thôi.
```HTML
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>    
```
# Data trong component phải là function.
 - Khi các bạn để ý thì sẽ thấy, data trong vue instance sẽ có dạng: 
```JS
data: {
    a: 1
  },
```
* Còn trong Vue Conponent:
```JS  
data: function () {
  return {
    count: 0
  }
}
```
- Sở dĩ có sự khác nhau này đó là do tính tái sử dụng của component. Nếu ta khai báo data trong component như của vue instance thì khi tái sử dụng nhiều lần component, khi data thay đổi thì tất cả các component sẽ thay đổi theo. Ví dụ:
```JS 
// Define a new component called button-counter
Vue.component('button-counter', {
  data: {
	count: 0
},
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
   
new Vue({ el: '#components-demo' })
```
```HTML
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```
- Kết quả sẽ như sau: 
    
   ![](https://images.viblo.asia/c1ab048a-db9f-4db7-b780-77e486479bd6.gif)
    
# Tổ chức component
- Việc cấu trúc 1 app theo  1 cây liên kết components là việc rất phổ biến.
    
    ![](https://images.viblo.asia/3f9af580-7004-431f-ae28-7dfe16b9d12e.png)
    
- Ví dụ bạn có  các components cho 1 header, siderbar, nội dung,.... Mỗi loại thường  chứa những components khác cho navigation links, blog posts, vv..
- Để sử dụng những components đó trong templates, chúng phải được đăng ký để Vue biết về chúng. Có 2 loại đăng ký component: global  và local. Thông thường ta thường đăng ký components theo kiểu global sử dụng Vue.component:
```JS 
Vue.component('my-component-name', {
  // ... options ...
})
```
* Đăng ký component theo kiểu global có thể sử dụng trong bất kỳ Vue instance nào tạo ra sau đó.
# Truyền data tới components con với props.
- Ở phần trên, ta đã đề cập tới việc tạo 1 components cho blog posts. Vấn đề là, component đó là vô dụng nếu bạn không truyền data cho nó, ví dụ như tiêu đề, nội dung bài post. 
- Props là 1 attributes bạn có thể đăng ký trong 1 component. Khi 1 giá trị được truyền vào prop, nó sẽ trở thành 1 giá trị trong component đó. Để truyền 1 tieu đề cho bài blog post của bạn, bạn phải truyền nó vào prop của component.
```JS
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
  -  Khi prop được đăng ký, bạn có thể truyền giá trị cho nó như sau:
```HTML
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```
- Kết quả:
    
    ![](https://images.viblo.asia/a81ddd79-0a69-44fa-8b33-00e84427d1aa.png)
- Nếu bạn có 1 mảng các bài post trong data: 
```JS
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```
- Và bạn muốn render 1 component với foreach để render ra hết các bài post
```HTML
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```
# Một Single Root Element
- Khi tạo ra 1  <blog-post> component, template của bạn sẽ chứa nhiều hơn chỉ là tiêu đề:
```HTML
<h3>{{ title }}</h3>
```
- Ít nhất bạn sẽ muốn bao gồm cả nội dung bài post:
```HTML
<h3>{{ title }}</h3>
<div v-html="content"></div>
```
- Nếu bạn thử làm điều này, Vue sẽ hiển thị ra lỗi, bởi vì mỗi component chỉ có 1 phần tử gốc. Bạn có thể fix lỗi này bằng cách:
```HTML
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```
- Nhưng khi ta không chỉ cần hiển thị ra mỗi tiêu đề, nội dung bài post mà còn ngày public, bình luận, ..... thì việc phải định nghĩa prop cho mỗi thông tin ấy sẽ rất là dài dòng. Ví dụ:
```HTML
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```
- Thay vì vậy, ta có thể cấu trúc component như sau:
```JS
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```
- Và khi đó code của ta sẽ như sau:
```HTML
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```
# Lắng nghe sự kiện từ các thành phần con
- Khi phát triển, sẽ có 1 vài tính năng yêu cầu giao tiếp với thành phần cha. Ví dụ bạn muốn 1 tính năng cho phép phóng to chữ của bài blog post trong khi những thành phần khác thì vẫn để kích thước như cũ. Vue component cung cấp cho chúng ta hàm emit cho phép truyền sự kiện từ thành phần con tới thành phần cha. Áp dụng như sau:
```JS
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
})
    
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [
    	{ id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ],
    postFontSize: 1
  }
})
```
    
```HTML
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
       v-on:enlarge-text="postFontSize += 0.1"
      
    ></blog-post>
  </div>
</div>
```
- Và đây là kết quả:
    
    ![](https://images.viblo.asia/39a052a3-bbf8-42e9-8d70-49350da2931c.gif)
    
# Phân phối nội dung với Slots
- Như 1 thẻ HTML, ta có thể truyền nội dung tới 1 component như sau:
```HTML
<alert-box>
  Something bad happened.
</alert-box>
```
```JS
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
})
```
- Kết quả thu được như sau: 
    
    ![](https://images.viblo.asia/66eeb61a-d9bf-4e51-a477-2f8cf7e98145.png)

# Kết luận
- Vậy là mình đã giới thiệu xong tới các bạn những kiến thức cơ bản của Vue Component.
- Chúc các bạn áp dụng vào dự án thành công.
- Những ý kiến đóng góp, phản hồi các bạn vui lòng để lại dưới phần bình luận để mình hoàn thiện bài viết hơn !
# Tài liệu tham khảo
*    https://vuejs.org/v2/guide/components.html