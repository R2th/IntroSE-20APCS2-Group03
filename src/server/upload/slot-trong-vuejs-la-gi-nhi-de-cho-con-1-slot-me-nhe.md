Đúng như tiêu đề mình có đề cập. Slot theo đúng nghĩa đen là "Chỗ" luôn.
- Để cho con 1 chỗ trong component Vue mẹ nhé
- ok con trai
# Slot là đặt chỗ
Slot trong vue là dạng "đặt chỗ" trong component, sau này khi sử dụng ta có thể đưa nội dung khác vào những vị trí đã đặt chỗ.
Vue cho phép chúng ta đặt nhiều chỗ, số lượng tùy thích, nhà có điều kiện mà =)))) Mỗi chỗ ấy được gọi là "slot"
Mọi người cùng xem ví dụ sau nhé (Chán component cha rồi, chuyển sang chơi với mẹ cho thân thiện :D)
```
<!-- mother.vue: bà mẹ xây 1 cái card có 2 thành phần có thể thay đổi là image và name nhé. Mẹ đặt 2 chỗ đấy cho con-->

<template>
  <div class="card">
    <div class="card-header">
      <slot name="image">
        <img class="ava" src="https://i.pravatar.cc/150?img=35" alt="Avatar">
      </slot>
    </div>
    <div class="card-body">
      <slot name="name">Tao la me day.</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mother",
  data() {
    return {};
  }
};
</script>
```
![](https://images.viblo.asia/3e8588bf-dae9-469e-b42e-797423c29270.png)
```
<!-- son.vue --> Nhưng cu con khi dùng cái card này ko thích kiểu này mà lại muốn ở trên là hiện tên..OMG
Cãi mẹ là ko vui rồi. Nhưng ko. Cu cậu chỉ cần làm những gì cu cậu muốn bằng việc là người mẹ đã biết kiểu gì cậu cũng bày trò.
Bây giờ c chỉ cần change 2 cái chỗ mà mẹ đã đặt thôi

<template>
  <div id="app" class="container">
    <Con>
      <template slot="ava">Đây là tên con, your handsome son ✌🏼</template>
      <template slot="name">
         Đây là ảnh của con, your handsome son ✌🏼
        <img height="150" width="150" src="https://i.pravatar.cc/150?img=2" alt="Avatar">
      </template>
    </Card>
  </div>
</template>

<script>
import Con from "./components/Con";

export default {
  name: "App",
  components: {
    Con
  }
};
</script>
```
![](https://images.viblo.asia/c4913efa-b8ee-4836-b655-7a18b3b70ee9.png)

Vậy là con đã thay đổi cái component mẹ sinh ra với 2 chỗ mà mẹ đã đặt chỗ trước cho con là image và name

# Slot name
Như ví dụ trên ta thấy thì khi slot có name, và truyền name vào cho slot thì chỉ slot có name ấy mới bị change, những thứ còn lại vẫn nguyên vẹn
Còn nếu slot ko tên thì toàn bộ những gì truyền vào sẽ được chuyển vào slot hết
# Slot scope
Đề truyền dữ liệu từ mẹ sang con, chúng ta bind dữ liệu muốn truyền qua slot <slot :ten-bien="du-lieu"/>

# Một ví dụ để thấy lợi ích của slot trong thực tế.

Khi mới nhận thiết kế từ bên design, popup modal vô cùng đơn giản, chỉ gồm title, description và dâm ba cái button bên dưới. Thoạt nhìn chúng ta chỉ cần 3 cái prop và một sự kiện bắn ra khi click button để thay đổi tùy theo tình huống sử dụng.

Nhưng sau một thời gian, bên design họ vẽ vời thêm một mớ mới, nhúng form, chèn hẳn một component khác vào trong đó, vâng vâng. Prop không đáp ứng nổi độ khùng của mấy bạn design. Và cách mà chúng ta refactor lại cái modal bằng slot

Với việc sử dụng slot bạn sẽ có những component với khả năng xào đi nấu lại dễ hơn.
Hi vọng với thủ thuật này mọi người sẽ làm chủ được component một cách linh động hơn (y)