# Why Nuxt ?
Tại sao chúng ta nên sử dụng Nuxt cho project của mình ? 
  -  Nếu bạn chưa biết Nuxt.js là gì bạn có thể đọc ở đây https://en.wikipedia.org/wiki/Nuxt.js . 
  -  Và để cài đặt thì ở đây https://nuxtjs.org/docs/2.x/get-started/installation

6 vấn đề được giải quyết khi dùng Nuxt trong project của mình.

**1. Building form scratch is difficult**: 
   Nuxt được định cấu hình sẵn với Vuex, Vue Router và Vue-Meta. Chỉ cần 1 câu lệnh thì ta có 1 project có đầy đủ ko cần tốn time để build. 
   
 **2. No standard folder structure** :
    Project của bạn code ngày càng bự thì việc tổ chức code sao cho hợp lý nó rất quan trọng. Nuxt.js đã set up cho mình 3 folder base rất hay: 
    
  `pages`:  Chứa cái views và tên file trong pages sẽ được Nuxt.js auto gen ra là route.   
  
  `layouts`: Chứa các layout templates.   
  
  `store`: là Vuex store.   

**3. Routing configuration can get long in a big Vue app**:
    Bình thường khi project của bạn ngày càng lớn thì bộ router của bạn config sẽ càng bự và dài. Với Nuxt.js, thì việc đó trở nên dễ dàng khi bạn tạo 1 view trong folder pages thì Nuxt automatically genertes Vue router configuration. 
    
**4. No standard way to configure things all together** :
    Trong structure Nuxt thì file nuxt.config.js là  nơi chứa các thông tin về cấu hình , khai báo các dependencies trong ứng dụng. Nuxt được định cấu hình trước để tạo ứng dụng của bạn trên server, cùng với việc cung cấp năng lượng cho các tuyến đường của bạn để tạo ra nó. dễ dàng thêm các thẻ liên quan đến SEO
    
  **5.Vue apps aren't not SEO-friendly**:
  Nếu như trong project dùng Vue thì khó có thể SEO, thì dĩ nhiên đây là tính năng quan trọng khi nhắc về NuxtJs. Ngoài ra NuxtJs cũng có mode spa để trở thành Single Page App đơn thuần như Vuejs App.
Để hiểu Server Side Rendering 1 cách đơn giản, ta click chuột phải chọn View Page Source, sẽ thấy trả về tất cả nguồn trang đầy đủ. Ngược lại với VueJs App chỉ là 1 cây Html với thẻ body rỗng.

**6.Vue applications on initial load can be slow** :
    Với Nuxt.js nếu bạn chọn hiển thị ứng dụng của mình theo cách phổ biến hoặc tĩnh, thì HTML được kết xuất trước sẽ khiến trang của bạn tải nhanh hơn trong trình duyệt. Sau khi tải xong, nó sẽ bắt đầu chạy như một SPA bình thường. Ngoài ra, với tính năng phân tách mã tự động, nó sẽ chỉ tải JavaScript cần thiết để tạo chức năng route. Điều này làm cho trải nghiệm người dùng tối ưu.
    
  Ở phần này mình giới thiệu 1 trong những concept quan trọng của Nuxt: layouts. Và những concept còn lại mình sẽ giới thiệu qua bài viết tiếp theo nhé !
## Layouts
 Đối với dân Frontend thì nghe từ "Layouts" quá đỗi quen thuộc đúng ko ạ :D. Thì trong Nuxt, Layouts như là trung tâm của project, nó chịu trách nhiệm giữ các phần chung của mỗi navigation ở 1 nơi duy nhất. Tùy từng page bạn muốn áp dụng cho layout nào cho page đó. Hình vẽ dưới đây sẽ giúp chúng ta dễ hình hơn. 
![image.png](https://images.viblo.asia/f7421db8-cfda-433f-b840-6775b27b3b38.png)

Tổng thể sơ đồ trên có thể hình dung là 1 page. Chúng ta có thể thấy chiếm toàn bộ khung hình là navigation. 
1.   `<gradient-background/>` :  là background cả page. 
2.   `<arc/>` :   là component custom loading indicator. Có nghĩa là nơi để thực hiện hiển thị một trạng thái loading khi ko có nội dung nào từ Server Side Rendering khi load page đầu tiên.
3.   `<mega-menu/>` :  là component chứa những custom elements như: animated title, subtopics menu, auto-playing tips components. (nội dung chính của page mình )
4.  `<page-navigation/>` : là back and next buttons
5. `<nav-bar/>` : chắc ai cũng biết rùi :D
6. `<nuxt-shape/>` :  component cố định như footer, header của page.

Trong thực tế thì các component này chứ trong folder Layouts của structure.Và có layouts/default.vue chúng ta có thể tự tạo các layout tùy ý muốn như: layouts/auth.vue để dùng cho những page nào cần authentication mới xem được page đó, hoặc layouts/guest.vue cho những page nào public ko cần login.

```
<template>
  <div class="default">

    <!-- 1. GRADIENT BRACKGROUND WITH SUN AND CIRCLES -->
    <gradient-background />

    <!-- 2. SVG ARC FOR CIRCLES TO TRAVEL -->
    <arc />

    <!-- 3. MEGA-MENU, i.e. SUB-NAVIGATION FOR POINTS -->
    <mega-menu />

    <!-- TOPIC CONTENT - DISPLAYED THROUGH pages/_id.vue -->
    <main>
      <nuxt />
    </main>

    <nav>
      <!-- 4. PAGE NAVIGATION, i.e. BACK AND NEXT NAVIGATION -->
      <page-navigation />
      <!-- 5. NAVBAR -->
      <nav-bar />
    </nav>

    <!-- 6. NUXT SHAPE -->
    <footer>
      <nuxt-shape />
    </footer>

  </div>
</template>

```

## Kết luận
Mong rằng bài viết của mình giúp các bạn hiểu thêm một phần nào đó về Nuxt.js. Nếu bài viết mình có gì sai sót comment mình phía dưới để mình có thể sửa chữa lỗi lầm của mình. Cảm ơn các bạn. Hẹn gặp lại các bạn trong các bài viết tiếp theo nhé ! ❤️