Ở phần 2 chúng ta render ra được danh sách user. Vậy ta muốn thêm user mới vào danh sách users thì chúng ta tham khảo bài viết dưới đây
## Ta cần tìm biết về form input binding
Mọi người có thể xem chi tiết [tại đây](https://vuejs.org/v2/guide/forms.html)
Để có thể bind dữ liệu cho input form thì chúng ta sẽ sử dụng v-model nhé. 
Đây là kiểu "2 way binding" tức là dữ liệu các bạn khai báo từ data sẽ được bind với các input và dữ liệu nhập từ input sẽ được bind trực tiếp với những gì các bạn khai báo trong data

Trong bài này hầu hết mình sẽ đưa ra các ví dụ để các bạn có thể hiểu dễ dàng hơn.
### input
```
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
Các bạn nhập vào ô input thì giá trị các bạn vừa nhập sẽ được gán trực tiếp vào biến message đã được khai báo trong data sẽ thấy dòng text vừa nhập được in ra trực tiếp trên màn hình.
### textarea
```
<template>
    <div class="form-input-binding">
        <div class="text">
            {{ message }}
        </div>
        <div class="input-form">
           <textarea  v-model="message" name="" ></textarea>
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
Giống input khi nhập giá trị vào thì biến message sẽ được hiển thị ra màn hình
### checkbox
```
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
### Radio
```
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
Ta có 2 radio với 2 value khác nhau, bind 2 radio với cùng biến là message khi radio nào được chọn thì sẽ in ra message với giá trị là value của radio đó.
### Select
```
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
Ví dụ này sẽ in ra màn hình giá trị của message bằng với value trong các thẻ option mỗi khi chúng ta click chọn.
### value, placeholder
```
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
Ta đã thấy input đã có giá trị mặc định trước, sau đó thửu xoá dòng text này đi thì ta sẽ thấy placeholder.
### lazy
Mặc định thì Vue sẽ bind dữ liệu ngay khi chúng ta thực hiện một input event tức là ngay sau khi chúng ta nhập một kí tự. Ta có thể dùng lazy để Vue sẽ nhận ra và chỉ bind sau khi chúng ta kết thúc quá trình nhập:
```
<input v-model.lazy="message" >
```
Ta nhập 1 kí tự đã không thấy xuất ra màn hình, thay vào đó chúng ta có thể bấm enter hoặc click ra ngoài ô input sẽ thấy có dữ liệu mới được xuất ra.
### number
```
<input type="number" v-model="message" name="">
```
### trim
Khi muốn trim dữ liệu người dùng nhập vào(bỏ khoảng trắng 2 đầu), ta chỉ cần thêm option trim khi bind:
```
<input type="text" v-model.trim="message" name="">
```
## Thực hiện thêm user vào danh sách 

Tạo form nhập dữ liệu
```
<div class="modal-body">
  <div class="form-group text-left">
    <label for="">Tên</label>
    <input
      type="text"
      name=""
      class="form-control"
      v-model="name"
      placeholder="Tên"
    />
  </div>
  <div class="form-group text-left">
    <label for="">SDT</label>
    <input
      type="text"
      name=""
      class="form-control"
      v-model="phone"
      placeholder="SDT"
    />
  </div>
  <div class="form-group text-left">
    <label for="">Email</label>
    <input
      type="text"
      name=""
      class="form-control"
      v-model="email"
      placeholder="Email"
    />
  </div>
  <div class="form-group text-left">
    <label for="">Địa chỉ</label>
    <input
      type="text"
      name=""
      class="form-control"
      v-model="address"
      placeholder="Địa chỉ"
    />
  </div>
  <button @click="saveUser" type="button" class="btn btn-primary">Lưu</button>
</div>
```
script
 ```
export default {
  name: "listUser",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    saveUser() {
      if (this.name && this.phone && this.email && this.address) {
        this.users.push({
          name: this.name,
          phone: this.phone,
          email: this.email,
          address: this.address
        });
      }
    }
  }
};
</script>
```
Như vậy ta đã thực hiện thêm 1 user vào danh sách users, bind dữ liệu từ form người dùng nhập áp dụng vào  thực tế.