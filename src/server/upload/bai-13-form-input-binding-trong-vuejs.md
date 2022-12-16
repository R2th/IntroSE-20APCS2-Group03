Chào mừng các bạn quay trở lại với series học VueJS của mình, ở bài trước chúng ta đã tìm hiểu về [class và style binding](https://viblo.asia/p/bai-12-class-va-style-binding-trong-vuejs-1VgZvwa1lAw), ở bài này chúng ta sẽ tiếp tục tìm hiểu về một kiểu binding nữa đó là binding cho các dữ liệu được nhập từ form: input, textarea, select,....

Để có thể bind dữ liệu cho các loại input form thì chúng ta sẽ sử dụng `v-model` nhé. Đây là kiểu "2 way binding" tức là dữ liệu các bạn khai báo từ `data` sẽ được bind với các `input` và dữ liệu nhập từ `input` sẽ được bind trực tiếp với những gì các bạn khai báo trong `data`

Trong bài này hầu hết mình sẽ đưa ra các ví dụ để các bạn có thể hiểu dễ dàng hơn, vì nội dung khá giống bài trước.

# input, textarea
Chúng ta cùng xem ví dụ sau:
```html
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
            <input type="text" v-model="message" name="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```

Ở đây khi các bạn nhập vào ô `input` thì giá trị các bạn vừa nhập sẽ được gán trực tiếp vào biến `message` đã được khai báo trong `data` sẽ thấy dòng text vừa nhập được in ra trực tiếp trên màn hình.

Chúng ta cũng có thể làm tương tự với `textarea` nhé.
# checkbox
Ví dụ dưới đây sẽ in ra giá trị của checkbox tuỳ thuộc vào checkbox ở trạng thái nào (có được checked hay không):
```html
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
            <input type="checkbox" v-model="message" name="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: false
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
# Radio
```html
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
            <input type="radio" v-model="message" value="one">
            <input type="radio" v-model="message" value="two">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ví dụ trên ta có 2 radio với 2 value khác nhau, sau đó ta bind 2 radio với cùng biến là `message` ở đây khi radio nào được chọn thì sẽ in ra message với giá trị là `value` của radio đó.

# Select
```html
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
            <select v-model="message">
                <option disabled="">Choose one</option>
                <option value="one">One</option>
                <option value="two">Two</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ví dụ này sẽ in ra màn hình giá trị của `message` bằng với `value` trong các thẻ `option` mỗi khi chúng ta click chọn.

Các bạn cũng có thể bind `value` trong các thẻ `option` như sau:
```html
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
            <select v-model="message">
                <option disabled="">Choose one</option>
                <option :value="values.one">One</option>
                <option :value="values.two">Two</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '',
                values: {
                    one: 'This is One',
                    two: 'This is Two'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Các bạn thử load lại trang để xem kết quả nhé.

# value, placeholder
Các bạn cũng có thể binding cho `value` hoặc `placeholder` khá giống như những gì chúng ta đã làm từ đầu bài đến giờ nhé:
```html
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
            <input type="text" :placeholder="placeholder" :value="value" name="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: '',
                placeholder: 'This is placeholder',
                value: 'This is value'
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Các bạn thử sửa lại code như bên trên, load lại trang thì ta đã thấy `input` đã có giá trị mặc định trước, sau đó thửu xoá dòng text này đi thì ta sẽ thấy `placeholder`.

Ngoài ra Vue cũng cung cấp cho chũng ta một số option khi binding như sau:
### lazy
Mặc định thì Vue sẽ bind dữ liệu ngay khi chúng ta thực hiện một input event tức là ngay sau khi chúng ta nhập một kí tự. Ta có thể dùng `lazy` để Vue sẽ nhận ra và chỉ bind sau khi chúng ta kết thúc quá trình nhập:
```html
<input v-model.lazy="message" >
```
Test thử thì mỗi lập nhập 1 kí tự đã không thấy xuất ra màn hình, thay vào đó chúng ta có thể bấm `enter` hoặc click ra ngoài ô `input` sẽ thấy có dữ liệu mới được xuất ra.
### number
Bình thường nếu như chúng ta `bind` như sau:
```html
<input type="number" v-model="message" name="">
```
Ta mở `Vue-devtool` có thể thấy rằng giá trị của message là kiểu `string`, mặc dù `input` ta để type là `number`. Do đó để Vue cast giá trị ta nhập từ `input` sang `number` ta làm như sau:
```html
<input type="number" v-model.number="message" name="">
```
### trim
Khi muốn `trim` dữ liệu ngừoi dùng nhập vào(bỏ khoảng trắng 2 đầu), ta chỉ cần thêm option `trim` khi bind:
```html
<input type="number" v-model.trim="message" name="">
```
Các bạn có thể load lại trang và test thử nhé
**Chú ý, trong bài mình hay viết theo kiểu short-hand như `:placeholder`, `:value`,...các bạn cũng có thể dùng cách đầy đủ là `v-bind:value` hay `v-bind-placeholder`,....**


-----
Qua bài này hi vọng rằng các bạn đã hiểu cách bind dữ liệu từ form người dùng nhập, qua đó áp dụng vào các bài toán thực tế.

Ở bài sau chúng ta sẽ cùng tìm hiểu về cách xử lý các event khi người dùng tương tác nhé. Cám ơn các bạn đã theo dõi, có gì thắc mắc các bạn để lại dưới comment nhé ^^!