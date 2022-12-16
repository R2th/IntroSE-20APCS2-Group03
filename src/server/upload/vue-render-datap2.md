Bạn muốn hiển thị 1 danh sách dữ liệu, bạn không biết làm như nào. Hãy tham khảo bài viết dưới đây nó có thể giúp ích cho bạn.
Bạn cũng có thể tham khảo ở[ document của vue ](https://vuejs.org/v2/guide/list.html)
## Render data
### v-if
Nếu ta muốn chỉ render ra từng block ở những điều kiện nhất định, khi đó chúng ta có thể sử dụng v-if để quản lý việc render
```
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="isActive == true">
            This is block 1
        </div>
        <div class="block-2" v-if="isActive == false">
            This is block 2
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isActive: true
            }
        },
    }
</script>
<style lang="scss" scoped>
</style>
```
Ở đây block 1 chỉ được render khi isActive có giá trị true và block 2 sẽ được render khi isActive có giá trị false.
### v-else, v-else-if
Với ví dụ trên luồng xử lý của chúng ta có performance chưa tốt, vì mỗi lần component này render, đến block 1 nó sẽ kiểm tra giá trị isActive, sau đó đến block 2 nó lại kiểm tra giá trị isActive một lần nữa. Thay vì phải kiểm tra 2 lần như thế chúng ta có thể sử dụng v-else để Vue bỏ qua kiểm tra biểu thức còn lại.
```
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="isActive == true">
            This is block 1
        </div>
        <div class="block-2" v-else>
            This is block 2
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isActive: true
            }
        },
    }
</script>
<style lang="scss" scoped>
</style>
```
Tiếp theo khi chúng ta có nhiều block muốn render theo từng điều kiện cụ thể thì đó là lúc chúng ta dùng đến v-else-if
```
<template>
    <div class="conditional-rendering">
          <div class="block-1" v-if="isActive==1">
            This is block 1
          </div>
          <div class="block-2" v-else-if="isActive==2">
            This is block 2
          </div>
           <div class="block-2" v-else>
            This is block 2
          </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isActive: 2
            }
        },
    }
</script>
<style lang="scss" scoped>
</style>
```
Với đoạn code trên ta thấy được block 2 được hiển thị
### v-show
Dể có thể hiện thị 1  block tùy theo giá trị của isActive, chúng ta cũng có thể sử dụng cách khác đó là dùng v-show:
```
<template>
    <div class="conditional-rendering">
           <div class="block-1" v-show="isActive==1">
            This is block 1
          </div>
          <div class="block-2" v-show="isActive==2">
            This is block 2
          </div>
           <div class="block-2" v-show="isActive==3">
            This is block 2
          </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isActive: 2
            }
        },
    }
</script>
<style lang="scss" scoped>
</style>
```
Như đoạn code trên hiện thị trên browser là block 2.
Vậy điểm khác nhau giữa v-if và v-show là gì
* Với v-if: render ngay ra toàn bộ các element khi đúng với điều kiện 
* Với v-show  sẽ render ra ngay từ đầu các element và chỉ quyết định có display nó hay không dựa trên điều kiện
### v-for
 v-for giúp các bạn có thể thực hiện nhiều công việc tương tự nhau chỉ với đoạn code gọn gàng hơn rất nhiều 
 ```
 <template>
    <div class="list-rendering">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">SĐT</th>
              <th scope="col">Email</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <th scope="row">1</th>
              <td>{{ user.name }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.address }}</td>
              <td>
                <button @click="editUser(index)" class="btn btn-warning btn-sm">
                  Sửa
                </button>
                <button
                  @click="deleteUser(index)"
                  class="btn btn-danger btn-sm"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [
                {
                  id:1,
                  name: "User 1",
                  email: "user2@gmail.com",
                  phone: "0972218xxx",
                  address: "hà đông hà nội",
                  publish:true
                },
                {
                  id:2,
                  name: "User 2",
                  email: "user2@gmail.com",
                  phone: "0972218xxx",
                  address: "hà đông hà nội",
                  publish:true
                },
                {
                  id:3,
                  name: "User 3",
                  email: "user3@gmail.com",
                  phone: "0972218xxx",
                  address: "hà đông hà nội",
                  publish:false
                }
              ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
 ```
 Thay vì phải viết hẳn 3 thẻ li với 3 giá trị là 3 object trong mảng thì giờ đây Vue giúp chúng ta chỉ cần viết một lần. Ta cho thêm thuộc tính khóa v-bind:key (:key) thể hiện tính duy nhất cho mỗi mục.

Kết quả:
![](https://images.viblo.asia/b433fea3-e980-4b40-a8a8-b68689f739bb.PNG)
### Hiển thị data lọc theo thuộc tính
Ta muốn hiển thị những user có thuộc tính publish là 1 thì làm như thể nào?
* Cách 1 dùng v-for v-if lọc điều kiện pulish là 1,điều này không tốt khi mỗi lần Vue render ra một phần tử nó lại phải kiểm tra v-if 1 lần.
```vue
 <tr v-for="(user, index) in users" :key="index" v-if="item.publish">
  <th scope="row">1</th>
  <td>{{ user.name }}</td>
  <td>{{ user.phone }}</td>
  <td>{{ user.email }}</td>
  <td>{{ user.address }}</td>
  <td>
    <button @click="editUser(index)" class="btn btn-warning btn-sm">
      Sửa
    </button>
    <button
      @click="deleteUser(index)"
      class="btn btn-danger btn-sm"
    >
      Xóa
    </button>
  </td>
</tr>
 ```
*  Cách 2 trước khi render dữ liệu ta lọc trước dữ liệu sau đó mới trả ra (ưu tiên cách 2)
```vue
<tr v-for="(user, index) in userPublic" v-bind:key="index">
  <th scope="row">1</th>
  <td>{{ user.name }}</td>
  <td>{{ user.phone }}</td>
  <td>{{ user.email }}</td>
  <td>{{ user.address }}</td>
  <td>
    <button @click="editUser(index)" class="btn btn-warning btn-sm">
      Sửa
    </button>
    <button
      @click="deleteUser(index)"
      class="btn btn-danger btn-sm"
    >
      Xóa
    </button>
  </td>
</tr>
         
script
 computed: {
    userPublish() {
      return this.users.filter(function(u) {
        return u.publish;
      });
    }
  },
```
Kết quả
![](https://images.viblo.asia/042cbcd0-094d-403c-a63d-20dd338bbd77.PNG)
ở đây chúng ta sử dụng computed để trả về danh sách các user publish là true, mình viết gọn user => user.publish ý nghĩa giống trên.
Qua bài này hi vọng rằng các bạn đã hiểu thêm được cách render dữ liệu và in ra màn hình, đồng thời nắm trong tày một số kĩ thuật để sử dụng.