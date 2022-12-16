Phần lớn trong các trang web của chúng ta sẽ sử dụng đến vòng lặp để lặp một danh sách các mục và hiển thị chúng trên trang web. Tương tự các ngôn ngữ lập trình khác chúng ta đều có vòng lặp `for` để in ra một danh sách nào để, thì trong `vuejs` cũng hỗ trợ chúng ta một thứ là `v-for` để in một danh sách ra một cách nhanh chóng và dễ dàng. Ví dụ như thế này.
![](https://images.viblo.asia/4e40ff30-bd0a-4e75-b4bb-54ca34c8e500.png)

Đây là vài phần trong mạng xã hội `twitter` cũng được sử dụng vòng lặp để in ra một danh sách. (ảnh mạng)
## v-for với mảng
Giả sử chúng ta có 1 list danh sách thông tin người dùng.
``` javascript
<script>
      data() {
        return {
          items: [
            {
                id: "1",
                name: "Phu",
                age: "22",
            },
            {
                id: "2",
                name: "Thuy",
                age: "18",
            },
            {
                id: "3",
                name: "Duc",
                age: "30"
            },
          ]
        }
      }
    }
</script>
```
Các bạn có thể thấy chúng ta có một mảng danh sách với tên là `items`, để thực hiện in các giá trị này lên màn hình sử dụng `v-for` chúng ta làm như sau:
```html
<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item">{{ item.name }} - {{ item.age }}</li>
    </ul>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          items: [
            {
                id: "1",
                name: "Phu",
                age: "22",
            },
            {
                id: "2",
                name: "Thuy",
                age: "18",
            },
            {
                id: "3",
                name: "Duc",
                age: "30"
            },
          ]
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>
```
Trong đó với `items` chính là thuộc tính `items` được đặt trong `data()`, còn `item` là `alias` đại diện cho lần lượt từng phần tử của mảng.
![](https://images.viblo.asia/c75d08d0-bcdf-427c-9ee9-a4ecace1855e.png)

`v-for` cũng hỗ trợ chúng ta thêm tham số thứ 2 là `index` để cho chúng ta biết chỉ mục của từng phần tử trong mảng. Chúng ta chỉ cần thêm như sau:
```html
<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="item">{{ index }} - {{ item.name }} - {{ item.age }}</li>
    </ul>
  </div>
</template>
```
Kết quả trả về là :
```
0 - Phu - 22
1 - Thuy - 18
2 - Duc - 30
```
> **Chú ý :** Chúng ta có thể sử dụng `of` thay cho `in` ở bên trong `v-for` như sau
> ```html
> <li v-for="item of items"></li>

## v-for với object
Tương tự như vòng lặp với một mảng, chúng ta cũng có thể lấy ra từng giá trị của 1 đối tượng bằng các sử dụng `v-for` như sau:
```html
<template>
  <div>
    <ul>
      <li v-for="value in info" :key="value">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          info: {
            id: 1,
            name: "Quang Phu",
            age: 22,
            address: "Ha Noi",
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>
```
Kết quả :
```
1
Quang Phu
22
Ha Noi
```
`v-for` với `object` cũng hỗ trợ thêm tham số để in ra `key` tương ứng với các `value`.
```html
<li v-for="(value, key) in info" :key="value">{{ key }} - {{ value }}</li>
```
Kết quả :
```
id - 1
name - Quang Phu
age - 22
address - Ha Noi
```
Tương tự với mảng, đối với object cũng hỗ trợ in ra chỉ mục của các `value` tương ứng với tham số thứ 3 được truyền vào.
```html
<li v-for="(value, key, index) in info" :key="value">{{ index }} - {{ key }} - {{ value }}</li>
```
Kết quả :
```
0 - id - 1
1 - name - Quang Phu
2 - age - 22
3 - address - Ha Noi
```
Khá là đơn giản và ngắn gọn hơn rất nhiều so với code thông thường nhỉ.

## v-for với range
Giả sử chúng ta muốn có một vòng lặp từ 1 đến 10 chả hạn, `v-for` cũng có luôn.
```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```
Kết quả 
```
1 2 3 4 5 6 7 8 9 10
```

## v-for và v-if
Giả sử chúng ta có một list các sản phẩm và bạn chỉ muốn in ra các sản phẩm mà giá của chúng lớn hơn 5000 chả hạn. Các bạn sẽ nghĩ ngay đến cách như thế này
```html
<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id" v-if="product.price > 5000">
          {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          products: [
            {
                id: 1,
                name: "sach",
                price: 10000,
            },
            {
                id: 2,
                name: "but",
                price: 5000,
            },
            {
                id: 3,
                name: "tay",
                price: 7000,
            }
          ]
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>
```

Thế nhưng các bạn sẽ nhận được một thông báo lỗi khi `compile` là `error  The 'products' variable inside 'v-for' directive should be replaced with a computed property that returns filtered array instead. You should not mix 'v-for' with 'v-if'`. Trong vuejs không khuyến khích cách viết sử dụng `v-for` và `v-if` trong cùng một phần tử. Nếu bạn viết như trên thì mỗi lần chúng ta render ra thì `v-if` sẽ lại kiểm tra lại một lần như thế. Giả sử chúng ta chỉ muốn in ra một vài giá trị của một mảng, nếu viết thế kia chúng sẽ phải chạy qua từng phần tử để check điều kiện xem có hợp lệ hay không rồi mới render ra, ít nhiều sẽ ảnh hưởng đến tốc độ render. Thay vào đó, `vuejs` khuyến khích chúng ta sử dụng `computed` trong trường hợp này
```html
<template>
  <div>
    <ul>
      <li v-for="product in validProducts" :key="product.id">
          {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          products: [
            {
                id: 1,
                name: "sach",
                price: 10000,
            },
            {
                id: 2,
                name: "but",
                price: 5000,
            },
            {
                id: 3,
                name: "tay",
                price: 7000,
            }
          ]
        }
      },

      computed: {
        validProducts() {
            return this.products.filter(product => product.price > 5000);
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>
```
Kết quả :
```
sach
tay
```
`Computed` chỉ tính toán lại khi chúng ta có sự thay đổi về dữ liệu, nên mỗi khi render chúng ta sẽ tránh được việc lặp đi lặp lại việc kiểm tra điều kiện hợp lệ. Để tìm hiểu rõ hơn về `computed` các bạn có thể xem lại bài viết của mình tại [đây](https://viblo.asia/p/vuejs-va-nhung-kien-thuc-cho-nguoi-moi-bat-daup2-GrLZD3Y3Kk0#_computed-0)
## "key"
Trong bài viết này các bạn nếu để ý sẽ thấy trong các phần tử sử dụng `v-for` mình có sử dụng thêm `key`. Điều này theo mình hiểu thì `key` này sẽ tạo ra một 'định danh' cho từng phần tử. Ví dụ ta có danh sách các sản phẩm nếu như chúng ta cập nhật lại danh sách đó, thay vì dich chuyển các phần tử theo vị trí tương ứng thì vuejs sẽ chọn cách thay đổi trong từng phần tử. Nhờ có `key` mà `vuejs` biết được phần tử nào bị xóa đi hoặc cập nhật.

Nếu bạn sắp xếp danh sách đó hoặc cập nhật , bạn sẽ cần `render` lại một số phần tử trong danh sách đó. Nhưng bạn không muốn `render` lại mọi thứ trong danh sách, chỉ `render` lại những thứ đã thay đổi thì sẽ cần dùng đến `key`.

**Chú ý :** Không nên sử dụng `index` để để xác định `key`. Ví dụ :
```html
const people = [
  { name: 'Evan', age: 34 },
  { name: 'Sarah', age: 98 },
  { name: 'James', age: 45 },
];

<ul>
  <li v-for="(person, index) in people" :key="index">
    {{ person.name }} - {{ index }}
  </li>
</ul>
```
Kết quả :
```
Evan - 0
Sarah - 1
James - 2
```
Nhưng nếu xóa phần tử thứ 2 là `Sarah` thì .
```
Evan - 0
James - 1
```
`Evan` vẫn nhận index là `0` và các thành phần của nó vẫn giữ nguyên, `Sarah` trước có chỉ số là `1` nhưng sau khi xóa đi thì `James` sẽ nhận chỉ số `1` là chỉ số của nó, do đó `James` sẽ lấy các thành phần của `Sarah` để sử dụng, do đó mà chỉ số `2` của `James` sau khi được update lại sẽ không tồn tại nữa.

Phần này giải thích hơi phức tạp nếu bạn nào có cách diễn đạt hay thấy suy nghĩ của mình không đúng chỗ nào thì comment phía dưới cho mình học hỏi với nhé.

## Tạm kết
Đây là những gì mà mình muốn chia sẻ trong bài viết lần này, hi vọng chúng sẽ hữu ích cho những bạn bắt đầu tìm hiểu về `Vuejs`, nếu có gì sai xót trong bài mong các bạn comment góp ý và bỏ qua ^^.