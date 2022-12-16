Condition Rendering là một thành phần quan trọng của Vue. Với việc xử lý render bằng DOM trong Javascript, việc này ở góc độ nào đó thực sự là cực hình cho các dev. Với Vue, việc xử lý render các component đã trở nên gọn gàng hơn rất nhiều, chúng ta chỉ cần quan tâm đến phần `condition` thôi chứ không cần quan tâm đến việc xử lý render nữa vì Vue đã làm cho chúng ta rồi. Sau đây là một vài ứng dụng về việc sử dụng Condition Rendering và List Rendering trong Vue
## 1. v-if
Cái tên gọi của nó cũng đã thể hiển quá rõ cái tác dụng của nó rồi nhỉ. `v-if` quết định xem component này có được render hay không tùy vào tham số mà nó được truyền vào.
```
<template>
    <div>
        <div id="text1" v-if="isActive">
            <h1>Hello World</h1>
        </div>
        <div id="text2" v-if="!isActive">
            <h1>Goodbye World</h1>
        </div>
    <div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```
Trong ví dụ này, div text1 là được render vì isActive = true, còn với div text 2 sẽ không được render vì !isActive = false. Ngoài ra chúng ta có thể sử dụng `v-else`  thay cho điều kiện false
```
<template>
    <div>
        <div id="text1" v-show="isActive">
            <h1>Hello World</h1>
        </div>
        <div id="text2" v-else>
            <h1>Goodbye World</h1>
        </div>
    <div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```
Lưu ý, chúng ta có thể sử dụng v-else khi nó nằm ngay sau v-if.
## 2. v-show
Về cơ bản, `v-show` cũng như `v-if` cũng là hook quyết định hiển thị các component. Tuy nhiên, với `v-show`, component sẽ được render ngay từ đầu, và sẽ bị ẩn đi bằng thuộc tính `style = "display: none"` nếu điều kiện là false
```
<template>
    <div>
        <div id="text1" v-show="isActive">
            <h1>Hello World</h1>
        </div>
        <div id="text2" v-show="!isActive">
            <h1>Goodbye World</h1>
        </div>
    <div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>
```
Còn đây là component được render ra
```
<div>
    <div id="text1"><h1>Hello World</h1></div>
    <div id="text2" style="display: none;">h1>Goodbye World</h1></div>
</div>
```
## 3. v-for
Trong một web app, khi chúng ta gọi request từ backend và nhận về một list json chẳng hạn. Với xử lý DOM thông thường, chúng ta phải sử dụng vòng lặp trên list đó, rồi add từng component vào document lạ nghe thật là phiền phức phải không nào. Với Vue, chúng ta có thể sử dụng `v-for` để xử lý điều này, chúng ta cũng chỉ cần khai báo đến data truyền vào, Vue sẽ tự xử lý và render cho chúng ta. Đồng thời chúng ta cũng có thể sử dụng `v-if` để có thể lồng ghép thêm các condition, tùy trường hợp. Cùng xem thử ví dụ sau:
```
<template>
  <div>
    <div id="text1" v-for="(value, index) in list" :key="index">
        <h1>Tên : {{value.name}} - Tuổi : {{value.age}}</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      list: [
        {name: 'ABC', age: 10},
        {name: 'CDE', age: 11},
        {name: 'XYZ', age: 12},
        {name: 'GHI', age: 13},
        {name: 'QWE', age: 14}
      ]
    }
  }
}
</script>
```
Kết quả
![](https://images.viblo.asia/4d61c606-b641-41cc-b962-baf7491121ec.png)

Trong ví dụ trên, mình đã truyền vào một list data gồm 5 element. Vue sẽ duyệt list này và render cả các div text1 theo các element đang được duyệt. Ngoài ra chúng ta có thể kết hợp thêm v-if
```
<template>
  <div>
    <div id="text1" v-for="(value, index) in list" :key="index">
        <h1 v-if="value.age <= 12">Tên : {{value.name}} - Tuổi : {{value.age}}</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      list: [
        {name: 'ABC', age: 10},
        {name: 'CDE', age: 11},
        {name: 'XYZ', age: 12},
        {name: 'GHI', age: 13},
        {name: 'QWE', age: 14}
      ]
    }
  }
}
</script>
```
![](https://images.viblo.asia/114fd42a-85c9-41f2-b12b-61881e032b76.png)

Lưu ý, để Vue có thể nhận biết các component cần render lại khi cập nhật list, chúng ta luôn phải có `key` đi kèm với `v-for`. Trong ví dụ trên, mình sử dụng luôn thuộc tính `index` để làm `key` cho v-for.