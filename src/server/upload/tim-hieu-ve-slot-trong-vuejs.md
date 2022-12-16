## 1. Mở đầu
<hr>

Trong bài viết trước của serie về VueJS chúng ta đã cùng nhau tìm hiểu về `props` cũng như cách sử dụng nó. Còn ở bài viết này, chúng ta sẽ cùng nhau tìm hiểu về `slot`.

## 2. Slot

### a. Giới thiệu về slot

Trong một ứng dụng VueJS, chắc hẳn bạn đã gặp một số trường hợp mà nhiều component của bạn có một số thành phần UI dùng chung. Để dễ hiểu nhất thì chúng ta xét ví dụ như sau:

![](https://images.viblo.asia/e7329c04-cbdc-4ed6-af59-0d4cff03e153.png)

Giả sử trang web của bạn sẽ gồm nhiều page, mỗi page sẽ có chung phần Header và Sidebar chỉ có phần Content là thay đổi. Từ đó ta sẽ có 2 component đầu tiên đó là `<Header />` và `<Sidebar />`. Nếu chuyển về dạng code thì mỗi trang của bạn sẽ có nội dung như sau:

```html
<template>
    <div>
        <Header />
        <div>
            <SideBar />
            <!-- Page Content Herre -->
        </div>
    </div>
</template>
```

Nếu với mỗi page trên trang của bạn đều copy đi copy lại cái khung như  trên và chỉ đổi phần content thì ta sẽ thu được kết quả như sau:

```html
// Homepage
<template>
    <div>
        <Header />
        <div>
            <SideBar />
            <HomePage />
        </div>
    </div>
</template>

// About page
<template>
    <div>
        <Header />
        <div>
            <SideBar />
            <AboutPage />
        </div>
    </div>
</template>

// Many other page
...
```

Giả sử chúng ta cần sửa lại design là thêm toàn bộ content vào một cái khung có box-shadown như sau:
```html
// Homepage
<template>
    <div>
        <Header />
        <div>
            <SideBar />
            <div class="box-shadow">
                <HomePage />
            </div>
        </div>
    </div>
</template>
```
Với cách làm như nói trên thì ta sẽ phải truy cập vào từng trang để thêm thẻ `<div class="box-shadow" />` như nói trên rất mất công. Chưa kể mỗi lần sau đó nếu có thay đổi như đổi chỗ sidebar từ trái sang phải thì bạn lại phải lặp lại công việc này cho toàn bộ các page. Để giải quyết vấn đề này thì chúng ta sẽ sử dụng đến slot mà VueJS cung cấp. Đầu tiên ta sẽ định nghĩa một component là `<PageLayout />` như sau:

```html
// PageLayout
<template>
    <div>
        <Header />
        <div>
            <SideBar />
            <slot />
        </div>
    </div>
</template>
```

Ở đây, phần `<slot />` đóng vai trò như một ô trống mà sau đó bạn có thể bỏ vào nó bất cứ kiểu giao diện nào mà bạn mong muốn, cụ thể ở đây sẽ là nội dung các trang cụ thể như sau:

```html
// Homepage
<template>
    <PageLayout>
        <HomePage />
    </PageLayout>
</template>

// About page
<template>
    <PageLayout>
        <AboutPage />
    </PageLayout>
</template>

...
```

Phần code nằm giữa `<PageLayout>` và `</PageLayout>` sẽ được tự động đặt vào vị trí mà bạn khai báo `<slot/>` trong component `<PageLayout />`. Ngoài ra trong component `<PageLayout />` bạn cũng có thể đặt một giá trị mặc định cho khe trống đó như sau:

```html
<template>
    <div>
        <Header />
        <div>
            <SideBar />
            <slot>Default content</slot>
        </div>
    </div>
</template>
```

Nếu bạn sử dụng component `<PageLayout />` nói trên mà không đặt vào nó bất cứ nội dung gì như này:
```html
<template>
    <PageLayout />
</template>
```
Thì nó sẽ tự động sử dụng nội dung mặc định mà bạn đã định nghĩa và ở đây là text *Default content*.

### b. Named slot

Bẩn thân slot không như nói trên đã giúp chúng ta giải quyết được một phần về vấn đề tái sử dụng lại UI như trong ví dụ trên. Tuy nhiên vẫn có một số trường hợp mà bạn sẽ cần nhiều hơn một slot và mỗi slot lại cần đặt ở một vị trí khác nhau. Xét ví dụ sau, giả sử chúng ta có một cái component `<Model />` như sau:

![](https://images.viblo.asia/c00079ce-3f47-4e69-b3fe-6ffd81a05fb8.PNG)

Như bạn có thể thấy model của chúng ta sẽ gồm 3 phần là header, content và footer bao gồm thêm một button close. Trên thực tế component model này chúng ta có thể thường xuyên tái sử dụng với hàng loạt các phiên bản khác nhau những vẫn giữ chung cấu trúc chung như chia rõ 3 phần, có borderr giữa các phần hoặc thậm chỉ kích thước và phần box-shadow chẳng hạn:

![](https://images.viblo.asia/7f8ce8d9-e1b5-4d82-aa41-6a4d374d9236.PNG)

Với phần content của model thì ta hoàn toàn có thể sử dụng `<slot>` mà ta đã nói đến ở trên để có thể tùy biến content bất cứ khi nào ta muốn. Tuy nhiên phần header và footer thì không thể vì ta đã dùng `<slot>` cho content mất rồi. Để giải quyết vấn đề này thì VueJS cung cấp cho chúng ta thêm một tính năng nữa liên quan đến slot đó là **named slot**. Bạn có thể hiểu nôm na là ta có thể tạo ra nhiều slot bằng cách đặt cho chúng một cái tên cố định. Với ví dụ nói trên thì ta sẽ có code sử dụng named slot như sau:

```html
// Model.vue
<template>
  <div class="model">
    <div class="w-64 border shadow-md rounded">
      <div class="border-b p-2">
        <slot name="header" />
      </div>
      <div class="px-2 py-4">
        <slot />
      </div>
      <div class="border-t p-2 flex justify-end">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
```

Nhu bạn thấy ở đây mình đẫ tạo ra một cái model gồm 3 slot lần lượ là header, footer và default (không có tên). Khi sử dụng trên thực tế thì ta sẽ gọi component model đó ra như sau:

```html
<template>
    <Model>
        <template v-slot:header>
            <p>Login</p>
        </template>
        <template>
            <label>Email</label>
            <input type="email" required />
            <label>Password</label>
            <input type="password" required />
            <input type="checkbox" />
            <span>Remember me</span>
        </template>
        <template v-slot:footer>
            <button>Cancel</button>
            <button>Login</butotn>
        </template>
    </Model>
</template>
```

Đoạn code nói trên sẽ thu được giao diện có dạng như này:

![](https://images.viblo.asia/6ef4eee2-25f3-40f7-8eaa-868560dddca1.PNG)

Như bạn phần nội dung chi tiết cho model của bạn vẫn sẽ được nằm giữa cặp thẻ `<Model></Model>`. Điều khác ở đây là với mỗi phần header, footer và content ta sẽ phải bọc chúng bên trong thẻ `<template>` và đồng thời đối với footer và header ta cần dùng tên từ khóa `v-slot:header` `và v-slot:footer` để VueJS biết được sẽ đặt phần nội dung đó vào đâu bên trong component model mà bạn đã định nghĩa. Đối với phần content vì bạn không đặt tên nó sẽ được coi là default slot và tự động tìm đến slot không có tên trong component Model để đặt nội dung vào. Lưu ý, tên mà bạn khai báo trong component Model phải trùng với tên mà bạn sử dụng `v-slot`. Với cách làm trên thì giờ đây ta có thể tạo ra nhiều hơn 1 slot cho các component của bạn.


Ngoài cách sử dụng `v-slot` như nói trên, VueJS còn cung cấp cho chúng ta thêm một cách viết ngắn gọn hơn đó là sử dụng ký tự `#` thay thế cho từ `v-slot`, cụ thể:

```html
// Cách viết ban đầu
<Model>
  <template v-slot:header>
      <p>Login</p>
   </template>
</Model>

// Cách viết ngắn
<Model>
  <template #header>
      <p>Login</p>
   </template>
</Model>
```

Bạn có thể tùy chọn sử dụng bất cứ cách nào mà bạn thấy phù hợp cho mình và team mình tuy nhiên hãy quyết định chọn 1 trong 2 cách mà thôi chú không nên dùng lẫn lộn giữa hai cách nói trên.

### c. Scoped Slots

Với 2 ví dụ nói trên thì bạn đã thấy slot mạnh mẽ như thế nào trong việc cung cấp cho chúng ta phương pháp để có thể tái sử dụng lại UI mà chúng ta mong muốn. Tuy nhiên có một điều nữa mà bạn có thể làm với slot là tái sử dụng cả phần logic bên trong nó. Ví dụ bên trong component Model của chúng ta có data như sau:

```html
<template>
  <div class="model">
    <div class="w-64 border shadow-md rounded">
      <div class="border-b p-2">
        <slot name="header" />
      </div>
      <div class="px-2 py-4">
        <slot />
      </div>
      <div class="border-t p-2 flex justify-end">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                testString: 'test'
            }
        },
        methods: {
            testClick() {
                console.log('Click');
            }
        }
    }
</script>
```

Ở các chỗ khác khi ta sử dụng component Model và muốn truy cập đến biến `testString` hay truy cập đến method `testClick()` thì sẽ phải làm như thế nào? Tất nhiên ta không thể cứ thế sử dụng như cách thông thường như này:

```html
<template>
    <Model>
        <template v-slot:header>
            <p>{{ testString }}</p>
        </template>
        <template>
             Content
        </template>
        <template v-slot:footer>
            <button @click="testClick">Click</button>
        </template>
    </Model>
</template>
```

Vì bản thân `testString` và `testClick` nó chỉ tồn tại phía bên trong scope của Model component mà thôi nên bạn sẽ không thể truy cập trực tiếp ở scope mà bạn dùng đến component Model được. Để giải quyết vấn đề này, ta có thể viết như sau:

```html
<template>
  <div class="model">
    <div class="w-64 border shadow-md rounded">
      <div class="border-b p-2">
        <slot name="header" :testString="testString" />
      </div>
      <div class="px-2 py-4">
        <slot />
      </div>
      <div class="border-t p-2 flex justify-end">
        <slot name="footer" :testClick="testClick" />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                testString: 'test'
            }
        },
        methods: {
            testClick() {
                console.log('Click');
            }
        }
    }
</script>
```

Cách viết như trên chỉ đơn giản là ta bind dữ liệu vào các slot mà ta mong muốn như cách mà ta truyền dữ liệu giữa component cha và con vậy. Lúc này phía bên component sử dụng đến model ta có thể viết như sau:

```html
<template>
    <Model>
        <template v-slot:header="headerSlotProps">
            <p>{{ headerSlotProps.testString }}</p>
        </template>
        <template>
             Content
        </template>
        <template v-slot:footer="footerSlotProps">
            <button @click="footerSlotProps.testClick">Click</button>
        </template>
    </Model>
</template>
```
Trong mỗi slot header và footer lúc này ta sẽ có thể truy cập thêm phần `headerSlotProps` và `footerSlotProps` như cách mình viết nó ở trên. 2 biến này sẽ là object chứa toàn bộ những gì mà chúng ta thực hiện bind ở bên trong Model component và cụ thể ở đây ta bind `testString` cho header và `testClick` cho footer. Phần tên ở đây bạn có thể đặt tuy ý nhưng mình đặt như vậy cho các bạn dễ hiểu. Cách làm như trên được VueJS gọi nó là `slot scope`, là cách cho phép component cha sử dụng đến component con có dùng scope có thể tái sử dụng logic bên trong component con. Ngoài cách viết như trên ra ta cũng có thể sử dụng object destructuring như sau:

```html
<template>
    <Model>
        <template v-slot:header="{ testString }">
            <p>{{ testString }}</p>
        </template>
        <template>
             Content
        </template>
        <template v-slot:footer="{ testClick }">
            <button @click="testClick">Click</button>
        </template>
    </Model>
</template>
```

Cả 2 cú pháp đều mang lại kết quả giống nhau.

## 3. Kết bài
<hr>

Bài viết của mình đến đây là hết, cảm ơn các bạn đã đọc và đừng quên để lại một update để ủng hộ mình nhé. Hẹn gặp lại các bạn trong những bài viết sau.