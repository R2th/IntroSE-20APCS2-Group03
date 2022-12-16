Chào mừng các bạn quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn cách sử dụng [Conditional rendering](https://viblo.asia/p/bai-7-tim-hieu-ve-conditional-renderingv-if-v-else-v-show-trong-vuejs-63vKjaRb52R), ở bài này chúng ta sẽ cùng tìm hiểu tiếp một loại `directives` nữa mà trong các dự án sẽ rất hay dùng đến đó là `v-for`
# Cách sử dụng v-for
Bằng cách sử dụng v-for các bạn có thể thực hiện nhiều công việc tương tự nhau chỉ với đoạn code gọn gàng hơn rất nhiều so với trước đây. Chúng ta sẽ cùng đi vào ví dụ luôn để các bạn có thể hiểu được điều đó. Ở bài này chúng ta sẽ tạo ra một file component mới đặt tên là `ListRendering.vue`, các bạn khai báo component này trong `app.js` và đặt tên là `list-rendering`, sau đó các bạn thay thế thẻ này vào thẻ `conditional-rendering` ở bài trước nhé: (sau đó nhớ luôn chạy `php artisan serve` và `npm run watch` nhé)
```html
<template>
	<div class="list-rendering">
		
	</div>
</template>

<script>
    export default {
        data() {
            return {
                foods: [
                    { name: 'Hamburger' },
                    { name: 'Sandwich' },
                    { name: 'Chicken chop' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây các bạn có thể thấy mình có 1 mảng tên là `foods` với 3 objects. Và để in 3 đối tượng này ra màn hình chúng ta sẽ sử dụng `v-for` làm như sau:
```html
<template>
    <div class="list-rendering">
        <ul>
            <li v-for="food in foods">{{ food.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                foods: [
                    { name: 'Hamburger' },
                    { name: 'Sandwich' },
                    { name: 'Chicken chop' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Thay vì phải viết hẳn 3 thẻ `li` với 3 giá trị là 3 object trong mảng thì giờ đây Vue giúp chúng ta chỉ cần viết một lần. Giải thích: khi viết `food in foods`, thì `foods` ở đây chính là `food` ở trong `data()` bên dưới, còn `food` thì chúng ta có thể chọn tên tùy ý (nên chọn tên ý nghĩa như trong ví dụ, "món ăn trong danh sách các món ăn"), sau đó với mỗi `food` lấy ra thì in ra `name` của nó.

Ngoài ra các bạn cũng có thể in ra cả chỉ số vị trí của đối tượng trong mảng: 
```html
<template>
    <div class="list-rendering">
        <ul>
            <li v-for="(food, index) in foods">
                {{ food.name }} - at index {{ index }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                foods: [
                    { name: 'Hamburger' },
                    { name: 'Sandwich' },
                    { name: 'Chicken chop' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
**Chú ý: bạn cũng có thể sử dụng `of` thay cho `in` khi sử dụng `v-for`**

Chúng ta cũng có thể sử dụng `v-for` cho một object, cùng xem qua ví dụ sau nhé:
```html
<template>
    <div class="list-rendering">
        <ul>
            <li v-for="item of myInfo">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myInfo: {
                    name: 'Mai Trung Duc',
                    age: '2x',
                    country: 'vietnam'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây khi dùng `v-for` cho object  thì Vue sẽ duyệt qua các thuộc tính của object đó và kết quả là ta sẽ được giá trị tương ứng với từng thuộc tính. Nếu muốn in ra cả thuộc tính và giá trị đồng thời thì các bạn làm như sau:
```html
<template>
    <div class="list-rendering">
        <ul>
            <li v-for="(value, key) of myInfo">
                {{ key }} - {{ value }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myInfo: {
                    name: 'Mai Trung Duc',
                    age: '2x',
                    country: 'vietnam'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Chú ý ở trên khi dùng `v-for` thì thứ tự sẽ là `(value, key)` chứ không phải `(key, value)` như thuận miệng chúng ta hay nói nhé. Và để in ra đồng thời `key, value, index` ta chỉ cần sửa lại thành `v-for="(value, key, index) in myInfo"` là được nhé

**`v-for` cũng có thể được sử dụng với template nhé các bạn, cách dùng cũng tương tự**
# Một vài lưu ý khi sử dụng v-for
### Sử dung v-for với một dãy
Chẳng hạn các bạn chỉ cần đơn giản là in ra 10 số nguyên từ một đến 10, thì chúng ta sẽ làm như sau:
```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```
### v-for và v-if
Ở trên trang chủ của Vue có giải thích khá rõ ràng như sau: khi được dùng trên dùng một node,  `v-if` có độ ưu tiên `v-for` và sẽ được thực hiện trước, nên với đoạn code sau sẽ trả ra lỗi bởi vì tại thời điểm chạy `v-if` thì `todo` còn chưa tồn tại:
```html
<template>
<ul>
    <li v-for="todo in todos" v-if="!todo.isComplete">
      {{ todo.name }}
    </li>
</ul>
</template>

<script>
    export default {
        data() {
            return {
                todos: [
                    {
                        name: 'go shopping',
                        isComplete: true
                    },
                    {
                        name: 'go school',
                        isComplete: false
                    }
                ]
            }
        }
    }
</script>
```
Ở đoạn code trên thì `todo` chỉ được khởi tạo khi `v-for` chạy, mà `v-if` lại chạy trước `v-for` nên với đoạn code trên ta sẽ gặp lỗi.

Ngược lại, nếu bạn muốn bỏ qua việc thực thi vòng lặp v-for theo điều kiện, hãy dùng v-if trên một phần tử wrapper (hoặc `<template>`). Ví dụ:
```html
<ul v-if="!todos.length">
    <li v-for="todo in todos">
      {{ todo }}
    </li>
</ul>
<p v-else>Không có todo nào.</p>
```
### v-for dùng với component
 Chúng ta cũng có thể dùng `v-for` cho component như một phần tử bình thường:
 ```html
 <my-component v-for="item in items" :key="item.id"></my-component>
 ```
Chú ý giá trị của mỗi `item` lấy được từ `items` sẽ không được truyền tự động vào component mà chúng phải truyền qua `props` sẽ được nói ở bài sau nhé. Lí do item không được truyền tự động vào component là bởi vì nếu làm vậy component sẽ bị gắn chặt vào `v-for`. Bằng cách bắt buộc khai báo nguồn dữ liệu một cách minh bạch (explicit), chúng ta có thể sử dụng lại component trong các tình huống khác.

**Chú ý với "key", Vue sẽ bắt buộc chúng ta sử dụng "key" khi dùng v-for với component:**

**Update 2020**: Hiện tại thì `key` đã luôn luôn là bắt buộc bất kì khi nào ta dùng `v-for`

Phần này khá khó giải thích, mình xin trích dẫn từ trang chủ Vue: "Khi cập nhật một danh sách các phần tử được render với `v-for`, mặc định Vue sẽ sử dụng kĩ thuật “inline patch” (hiểu nôm na là “vá tại chỗ”). Điều này có nghĩa là nếu thứ tự của các item thay đổi, thay vì dịch chuyển các phần tử web theo thứ tự tương ứng, Vue sẽ patch mỗi phần tử tại chỗ và bảo đảm phản ánh đúng những gì cần phải render tại vị trí đó".

Vì việc trong các component có thể có các trạng thái và xử lý khác nhau, nên việc vá này có thể dẫn tới sự không đúng khi mà chúng ta cập nhật lại danh sách. Và chú ý là nên thiết lập các giá trị độc nhất cho các key.

Vue khuyến khích sử dụng key bất cứ khi nào bạn dùng v-for, trừ phi nội dung DOM được duyệt qua quá đơn giản hoặc bạn đang cố ý sử dụng behavior mặc định của Vue để tăng tốc cho ứng dụng.

```html
<!-- ở đây ta dùng shorthand `:key` thay vì `v-bind:key` -->
<div v-for="item in items" :key="item.id">
  <!-- nội dung -->
</div>
```
> Key thì không cần global unique nhưng phải unique trong 1 file `.vue` nhé các bạn.

Note: Không dùng key, hoặc dùng key mà lấy luôn là index của mảng (cách mà nhiều người chúng ta vẫn chọn làm luôn, cho "nhanh" :)) sẽ dẫn tới hậu quả là tốn nhiều thời gian cho việc debug khi gặp lỗi. Trường hợp có thể xảy ra: xoá phần tử trong mảng, thay đổi vị trí phần tử trong mảng, thay đổi HTML element của 1 phần tử trong mảng. Mình đã từng gặp và rất khó debug vì không hiểu có gì sai :rofl::rofl:
### Lưu ý về dùng v-for chung với v-if
Ở bên trên mình có đưa ra cho các bạn ví dụ về dùng `v-for` và `v-if` trong cùng một phần tử, điều này sẽ dẫn tới lỗi khi chạy (mình đã giải thích ở trên - update 2022).

Thay vào đúng chúng ta sử dụng như sau:
```html
<template>
    <div class="list-rendering">
        <ul>
            <li v-for="todo in listCompleteTodo">
              {{ todo.name }} - {{ todo.isComplete }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                todos: [
                    {
                        name: 'to do 1',
                        isComplete: true
                    },
                    {
                        name: 'to do 2',
                        isComplete: false
                    },
                    {
                        name: 'to do 3',
                        isComplete: true
                    },
                ]
            }
        },
        computed: {
            listCompleteTodo() {
                return this.todos.filter(item => item.isComplete)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
ở đây chúng ta sử dụng `computed` để trả về danh sách các todo đã hoàn tất, mình viết gọn `item => item.isComplete` ý nghĩa giống như `item => item.isComplete == true` nhé. Bởi vì computed chỉ tính toán lại khi dữ liệu phụ thuộc bị thay đổi vì thế nên ở ví dụ trên ta sẽ loại bỏ được việc kiểm tra `v-if` ở mỗi lần lặp, do đó với các tập dữ liệu mà ít khi thay đổi trong suốt vòng đời của component thì khi tính toán chúng ta nên dùng computed đã được mô tả ở [bài trước](https://viblo.asia/p/bai-5-su-dung-computed-trong-vuejs-su-khac-nhau-giua-computed-va-methods-Do754MMQKM6) của mình. 
# Kết luận
Qua bài này hi vọng rằng các bạn đã hiểu thêm được các sử dụng `v-for` từ đó có thể tận dụng cho việc duyệt các danh sách dữ liệu và in ra màn hình, đồng thời nắm trong tày một số kĩ thuật để sử dụng `v-for`. 

Ở bài tiếp theo chúng ta sẽ cùng nhau tìm hiểu về các tạo các component con và truyền dữ liệu giữa chúng.

Cám ơn các bạn đã theo dõi, nếu có bất kì thắc mắc nào bạn hãy để lại dưới comment nhé ^^!