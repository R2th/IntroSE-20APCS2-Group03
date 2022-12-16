# Tailwind Css là gì
![](https://images.viblo.asia/8a1a4e3c-2ebf-4ae3-be28-1ee3f25023a2.png)

 Tailwind Là một Css Framework mới dùng để phát triển UI nhanh chóng, được phát hành lần đầu tiên từ tháng 10 năm 2019 dự án ban đầu được phát triển bởi Adam Wathan. khi nói đến các framework css thì chúng ta đều nghĩ đến ngay Bootstrap, Foundation, Material Design ... tuy nhiên Tailwind lại khác các framework đó ở hướng tiếp cận.
 
Hầu hết các framework css chọn hướng tiếp cận là "Component first" đó là hướng tiếp cận theo kiểu mì ăn liền, họ tạo ra các components sẵn giúp cho lập trình viên chỉ việc sử dụng để hoàn thiện sản phẩm nhanh chóng nhưng chính vì vậy lại mang đến nhưng nhược điểm là việc Override các component đó rất khó khăn, còn Tailwind Css thì sử dụng hướng tiếp cận "Utility-first Framework",
# Điểm mạnh của Tailwind
![](https://images.viblo.asia/3cfb2f8c-9923-4864-a71b-e5bc6942caf2.jpg)

Với hướng tiếp cận "Utility-first Framework" Tailwind có những điểm mạnh là:

* Dễ dàng quản lý và sử đổi trong các dự án lớn.
* Sử dụng các class được định nghĩa sẵn có khả năng tùy biến và mở rộng rất cao.
* Các tên class được đặt  dễ hiểu và thân thiện, nhìn vào class đó và có thể biết được class này nó đang style cái gì
* Sử dụng Flex nên rất dễ chia Layout
* Dễ cài đặt, dễ sử dụng, document của Tailwind rất dễ hiểu. 
* Tối ưu cho môi trường di động và hỗ trợ responsive dễ dàng.
* Có khả năng trích xuất các pattern phổ biến, lặp đi lặp lại thành các thành phần tùy chỉnh, có thể sử dụng lại trong hầu hết các trường hợp mà không cần viết một dòng CSS tùy chỉnh.

**Qua các điểm mạnh ở trên thì ta cũng đã có câu trả lời cho vấn đề vì sao nhiều dự án sử dụng tailwinds rồi, với những dự án cần giao diên có khả năng tùy biến và mở rộng cao thì Tailwind là một lựa chọn phù hợp**
# Nhược điểm của Tailwind
Nhược điểm lớn nhất là khi sử dụng Tailwind thì các thẻ của chúng ta cần rất nhiều class, mỗi thuộc tính là một class khi đó code cũng sẽ rất dài và rắc rối.
# cài đặt Tailwind
1. Sử dụng link trực tiếp trong html
``` html
<link href="https://unpkg.com/tailwindcss@2.0.1/dist/tailwind.min.css" rel="stylesheet">
```
2. Ta cài đặt  qua npm
```
npm install tailwindcss
```
Ta tạo file styles.css, ở đây sẽ chứa các framework style dùng chỉ thị @tailwind:
```
@tailwind base;

@tailwind components;

@tailwind utilities;
```

Sau đó chạy lệnh `npx tailwind init`
Lệnh này  tạo ra một tệp tailwind.config.js rỗng, trong đó chúng ta sẽ đặt các tùy chọn tùy chỉnh trong quá trình phát triển. Tệp được tạo chỉ chứa:
```
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
}
```

Bước tiếp theo là xây dựng style để sử dụng chúng:

```
npx tailwind build styles.css -o output.css
```

Cuối cùng, chúng ta hãy link tệp output.css được tạo và Font Awesome trong HTML.
``` html
<link rel="stylesheet" type="text/css" href="output.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
```

# Sử dụng utility classes xây dựng giao diện
![](https://images.viblo.asia/9685aee8-477f-4db0-8468-25a311bf3cbf.png)
Ta xây dựng giao diện box chat trên bằng đoạn code này
``` html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```
Ở ví dụ trên ta sử dụng các class: 
- (flex, flex-shrink-0, and p-6) : để kiểm soát thẻ bao bọc
-  (max-w-sm and mx-auto) : để giới hạn chiều rộng và căn giữa theo chiều ngang
-  (bg-white, rounded-xl, and shadow-md)  css nền, viền, bóng cho thẻ
-  (w-12 and h-12) : chiều rộng và cao cho ảnh
-  (space-x-4) : khoảng cách giữa logo và text
-  (text-xl, text-black, font-medium, etc.) : font size, text color, và font-weight
**Qua các class ví dụ trên ta thấy cách đặt tên class rất dễ hiểu, tên đúng như chức năng của nó, các bạn có thể xem qua các ví dụ dưới tương tự**

Ví dụ:

![](https://images.viblo.asia/f7618b53-6a00-4a0f-90dc-d06ab24fc89e.png)
Ta chỉ cần 1 đoạn code đơn giản như này là có thể tạo được giao diện trên 
``` html
<div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
  <template x-for="i in 4" :key="i">
    <div
      class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg"
    >
      <div class="flex items-start justify-between">
        <div class="flex flex-col space-y-2">
          <span class="text-gray-400">Total Users</span>
          <span class="text-lg font-semibold">100,221</span>
        </div>
        <div class="p-10 bg-gray-200 rounded-md"></div>
      </div>
      <div>
        <span class="inline-block px-2 text-sm text-white bg-green-300 rounded"
          >14%</span
        >
        <span>from 2019</span>
      </div>
    </div>
  </template>
</div>
```

![](https://images.viblo.asia/b5b9d6b0-c7b2-4238-960c-42007ccc1984.png)
Hay bạn cần tạo box như trên thì sử dụng tailwind với các class có sẵn cũng rất đơn giản bằng đoạn code này
``` html
<div class="mt-6">
  <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">Feb 14, 2021</span
      ><a
        href="#"
        class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
        >PHP</a
      >
    </div>
    <div class="mt-2">
      <a href="#" class="text-2xl text-gray-700 font-bold hover:underline"
        >PHP: Array to Map</a
      >
      <p class="mt-2 text-gray-600">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
        expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
        enim reprehenderit nisi, accusamus delectus nihil quis facere in modi
        ratione libero!
      </p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <a href="#" class="text-blue-500 hover:underline">Read more</a>
      <div>
        <a href="#" class="flex items-center"
          ><img
            src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
            alt="avatar"
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
          />
          <h1 class="text-gray-700 font-bold hover:underline">Lisa Way</h1>
        </a>
      </div>
    </div>
  </div>
</div>
```
# Kết bài
Qua bài này chúng ta cũng thấy được điểm mạnh điểm yếu và cách dùng cơ bản của framework css tailwind từ đó cũng có thể cân nhắc sử dụng.