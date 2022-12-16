Chào mừng các bạn đã quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn các sử dụng [v-for trong VueJS](https://viblo.asia/p/bai-8-su-dung-v-for-trong-vuejs-YWOZr0gP5Q0), ở bài này mình cùng các bạn sẽ tìm hiểu các chia ứng dụng của chúng ta ra thành các component và giao tiếp giữa chúng nhé.

Bài này mình đánh giá khá quan trọng vì đó là điểm mạnh của Vue, và nhờ đó các bạn có thể chia ứng dụng lớn thành các component nhỏ hơn để dễ xử lý và quản lý. Mình sẽ hướng dẫn chi tiết nhất có thể để các bạn có thể hiểu được nhé :)
# Chia ứng dụng thành các component
Để bắt tay vào bài này hôm nay trước hết chúng ta sẽ tạo các file như sau:

`UserDashboard.vue`
```html
<template>
    <div class="user-dashboard">
        This is user dashboard
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
</style>
```
`ListUser.vue`
```html
<template>
    <div class="list-user">
        This is List user
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
</style>
```
`UserDetail.vue`
```html
<template>
    <div class="user-detail">
        This is user detail
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
</style>
```
Ý tưởng là chúng ta sẽ tạo component `UserDashboard` là cha chứa 2 component con là `UserDetail` và `ListUser`. Sau đó chúng ta cần khai báo component cha là `UserDashboard` trong file `app.js`
```js
Vue.component('user-dashboard', require('./components/UserDashboard.vue').default);
```
Sau đó là thêm nó vào trang `welcome.blade.php` của Laravel nhé: 
```html
<body>html
    <div id="app">
        <user-dashboard></user-dashboard>
    </div>
    <script src="/js/app.js"></script>
</body>
```
Nhớ luôn chạy `php artisan serve` và `npm run watch` nhé mọi người. Chạy thử trước xem trên màn hình có xuất hiện `This is user dashboard` không nhé (vì hiện tại ta mới chỉ có duy nhất component `UserDashboard`).

Để đưa 2 component `ListUser` và `UserDetail` vào component cha là `UserDashboard` chúng ta làm như sau: 
```html
<template>
    <div class="user-dashboard">
        <div class="list-user-comp">
            <ListUser></ListUser>
        </div>
        <div class="user-detail-comp">
            <UserDetail></UserDetail>
        </div>
    </div>
</template>

<script>
    import ListUser from './ListUser.vue'
    import UserDetail from './UserDetail.vue'
    export default {
        components: {
            ListUser,
            UserDetail
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây các bạn có thể thấy đầu tiên chúng ta phải import 2 component vào component cha, sau đó chúng ta phải khai báo 2 component đó ở trong phần `components: { }`. Cuối cùng là các bạn có thể cho nó vào đâu tuỳ ý trên component cha.

Các bạn thử load lại trang và xem kết quả nhé. Mở `Vue devtool` chúng ta có thể thấy: 

![test_Vue_dev_tool](https://images.viblo.asia/c49cec93-e76d-4bff-8aa5-55732fc9a00f.png)

Đã có 2 component `ListUser` và `UserDetail` là con của `user-dashboard` là ok rồi nhé. Rất đơn giản phải không nào. Nếu các bạn xem qua React thì ở đó vẫn có chia component nhưng với mỗi component riêng biệt chúng ta phải để code HTML của component ở trong hàm render() cộng thêm mấy dấu ngoặc ngoặc nhìn hơi rối mắt xíu, còn với Angular thì thôi khỏi nói, với mình vẫn là ác mộng, ngày hôm nay ở trên phòng làm việc vật lộn cả ngày với nó, mỗi component phải có 1 file HTML, 1 file controller, 1 file css, đọc hiểu được flow xong xuất được tí HTML ra giao diện thì cũng đủ mệt rồi :-D (sorry các bạn fan Angular nhé).

## Đổ dữ liệu và giao tiếp giữa các component
Để hướng dẫn các bạn phần này chúng ta sẽ cùng sử dụng một chút dữ liệu để các bạn có thể dễ hình dung nhé. Các bạn chuẩn bị file json ở [đây](https://gist.github.com/maitrungduc1410/e6a9c08af45ad9580187af7de3b13d63). Ở đó các bạn có thể thấy ta có một file JSON chứa thông tin cá nhân của 3 users. Các bạn tải về (hoặc tạo file mới copy nội dung) rồi đem vào thư mục `components` chúng với 3 component bên trên nhé.

Sau đây chúng ta sẽ tiến hành đổ dữ liệu ra component `ListUser` như sau, trước hết ta sẽ import thử vào và xem dữ liệu có chuẩn không nhé:
```html
<template>
    <div class="list-user">
        This is List user
    </div>
</template>

<script>
    import data from './data.json'
    export default {
        data() {
            return {
                userData: data
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Sau đó các bạn load lại trang, mở `Vue-devtool` và xem dữ liệu như thế này là oke nhé:

![user_Vue_dev_tool](https://images.viblo.asia/b122ecc2-bd90-4294-babc-c3c2880ab03a.png)

Sau đây ta sẽ đổ dữ liệu ra table nhé các bạn:
```html
<template>
    <div class="list-user">
        <table class="tbl-list-user">
            <thead>
                <th>Name</th>
                <th>Location</th>
                <th>DOB</th>
            </thead>
            <tbody>
                <tr v-for="user in userData">
                    <td><a>{{ user.name.title }} - {{ user.name.last }} {{ user.name.first }}</a></td>
                    <td>{{ user.location.city }}</td>
                    <td>{{ user.dob.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import data from './data.json'
    export default {
        data() {
            return {
                userData: data
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tbl-list-user {
        width: 100%;
    }
</style>
```
Ở đây các bạn có thể thấy mình dùng `v-for` để load các user trong `userData` (link bài viết về `v-for` ở [đây](https://viblo.asia/p/bai-8-su-dung-v-for-trong-vuejs-YWOZr0gP5Q0)). Vì thông tin của người dùng khá nhiều trường nên mình sẽ chỉ liệt kê ra một số trường cơ bản, thông tin chi tiết chúng ta sẽ để ở trong component `UserDetail` nhé. Phần code trên nếu có gì thắc mắc các bạn comment bên dưới nhé.

Sau đó các bạn thử load lại trang xem kết quả ra sao nhé ;)

Ta mông má lại chút xíu ở bên component `UserDashboard` để hiện thị rõ hơn nhé:
```html
<template>
    <div class="user-dashboard">
        <div class="list-user-comp">
            <h4>List User</h4>
            <ListUser></ListUser>
        </div>
        <hr>
        <div class="user-detail-comp">
            <h4>User Detail</h4>
            <UserDetail></UserDetail>
        </div>
    </div>
</template>

<script>
    import ListUser from './ListUser.vue'
    import UserDetail from './UserDetail.vue'
    export default {
        components: {
            ListUser,
            UserDetail
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Test thử xem sao nào các bạn ơi :) :

![user_test_Vue](https://images.viblo.asia/8888b5dd-103e-4f8e-8b1a-08feb59199c8.png)

Khá là oke rồi đó, nhưng bây giờ mình muốn khi click vào tên của một user thì bên dưới sẽ xuất hiện thông tin chi tiết của người đó. Chúng ta sẽ làm theo luồng xử lý như sau: click vào dòng dữ liệu ở `ListUser` -> dữ liệu được đẩy lên cho cha là `UserDashboard` -> sau đó được đưa vào `UserDetail`.

Ta cùng làm từng bước một nhé. Trước hết ta quay lại `ListUser` và sửa như sau để mỗi khi click vào tên user ta sẽ đưa dữ liệu lên component cha là `UserDashboard` bằng cách sử dụng `$emit`:
```html
<template>
    <div class="list-user">
        <table class="tbl-list-user">
            <thead>
                <th>Name</th>
                <th>Location</th>
                <th>DOB</th>
            </thead>
            <tbody>
                <tr v-for="user in userData">
                    <!-- This line below -->
                    <td><a @click="selectUser(user)">{{ user.name.title }} - {{ user.name.last }} {{ user.name.first }}</a></td>
                    <td>{{ user.location.city }}</td>
                    <td>{{ user.dob.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import data from './data.json'
    export default {
        data() {
            return {
                userData: data
            }
        },
        methods: {
            // This line below
            selectUser(user) {
                this.$emit('userSelected', user)
            }
        }
    }
</script>

<style lang="scss" scoped>
	.tbl-list-user {
		width: 100%;
	}
</style>
```
Mình chỉ sửa lại 2 dòng chỗ comment, ở trên là khi click vào tên user thì gọi hàm `selectUser` và truyền đối tượng user vào đó, tiếp theo ở hàm `selectUser` ta sẽ sử dụng `$emit` với tên sự kiện là `userSelected` và truyền đối tượng user lên component cha. Việc này giống như cách nói: cha ơi vừa có 1 user được chọn(event `userSelected`), và nó là thằng này này (object `user`).

Các bại save file tải lại trang, bật `Vue-devtool` và chuyển sang tab `Events`, sau đó thử click vào tên một user sẽ thấy xuất hiện như sau là event đã được emit thành công nhé:

![emit_Vue](https://images.viblo.asia/c9c128ed-2e4e-46f4-b19e-d684a29f8b1f.png)

Bây giờ ở cha chúng ta sẽ lắng nghe "con" của nó "nói" nhé :)
```html
<template>
    <div class="user-dashboard">
        <div class="list-user-comp">
            <h4>List User</h4>
            <!-- Listen event 'userSelected' emitted from child and process it using 'childrenSelectUser' -->
            <ListUser @userSelected="childrenSelectUser"></ListUser>
        </div>
        <hr>
        <div class="user-detail-comp">
            <h4>User Detail</h4>
            <UserDetail></UserDetail>
        </div>
    </div>
</template>

<script>
    import ListUser from './ListUser.vue'
    import UserDetail from './UserDetail.vue'
    export default {
        components: {
            ListUser,
            UserDetail
        },
        methods: {
            // Process event emitted from child
            childrenSelectUser(user) {
                console.log(user)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Mình chỉ thêm 2 chỗ dòng comment thôi nên các bạn chú ý nhé. Để lắng nghe sự kiện tử component con ta sử dụng `@<Tên sự kiện của con gửi lên>=<Hàm xử lý ở cha>`. Và ở hàm xử lý ở cha trong ví dụ này ta chỉ đơn giản là in nó ra ở console nhé. Các bạn tự load lại trang sau đó xem thành quả nhé ;). 

(**Sẽ có một số chú ý về việc truyền nhiều hơn 1 đối tượng lên cha hoặc ở cha vừa nhận đối tượng của con và vừa chèn thêm tham số trong 1 hàm xử lý mình sẽ giải thích ở cuối bài nhé**)

Tiếp theo nhiệm vụ của chúng ta là đưa thông tin vừa có được từ component cha và đưa vào `UserDetail` và hiển thị chi tiết của user được chọn. Việc này chúng ta sẽ truyền qua `prop` nhé.

Chúng ta sửa lại code của `UserDashboard` như sau:
```html
<template>
    <div class="user-dashboard">
        <div class="list-user-comp">
            <h4>List User</h4>
            <!-- Listen event 'userSelected' emitted from child and process it using 'childrenSelectUser' -->
            <ListUser @userSelected="childrenSelectUser"></ListUser>
        </div>
        <hr>
        <div class="user-detail-comp">
            <h4>User Detail</h4>
            <!-- pass 'userSelectedFromChild', child will use props 'userDetailInfo' -->
            <UserDetail :userDetailInfo="userSelectedFromChild"></UserDetail>
        </div>
    </div>
</template>

<script>
    import ListUser from './ListUser.vue'
    import UserDetail from './UserDetail.vue'
    export default {
        components: {
            ListUser,
            UserDetail
        },
        data() {
            return {
                userSelectedFromChild: {}
            }
        },
        methods: {
            // Process event emitted from child
            childrenSelectUser(user) {
                console.log(user)
                this.userSelectedFromChild = user
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Do `prop` chỉ nhận vào là các biến trong `data` hoặc `computed` nên chúng ta sẽ tạo biến `userSelectedFromChild` với giá trị chính là `user` mà ta mới `emit` từ `ListUser`. Sau đó chúng ta truyền biến này vào `UserDetail` thông qua một `props` là `userDetailInfo`.

Sau đó ta mở `UserDetail.vue` lên và sửa lại như sau:
```html
<template>
    <div class="user-detail">
        This is user detail
    </div>
</template>

<script>
    export default {
        props: {
            userDetailInfo: {
                type: Object
            }
        },
        // You can also write props: ['userDetailInfo'] but the above is recommended
    }
</script>

<style lang="scss" scoped>
</style>
```
Sau đó các bạn save lại và load lại trang, mở `Vue-devtool` click chọn component `UserDetail` và ta thử click vào tên một user sẽ thấy sự thay đổi của `props` trong `UserDetail` nhé (phần này mình không chụp hình nữa mà các bạn tự làm nhé).

Cuối cùng việc của chúng ta là in ra màn hình nữa thôi nhé ;) :
```html
<template>
    <div class="user-detail">
        <div class="user-detail-container" v-if="Object.keys(userDetailInfo).length !== 0">
            <div class="user-name">
                Name: {{ userDetailInfo.name.last }} {{ userDetailInfo.name.first }}
            </div>
            <div class="user-email">
                Email: {{ userDetailInfo.email }}
            </div>
            <div class="user-dob">
                DOB: {{ userDetailInfo.dob.date }}
            </div>
            <div class="user-gender">
                Gender: {{ userDetailInfo.gender }}
            </div>
            <div class="user-address">
                Address: {{ userDetailInfo.location.city }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            userDetailInfo: {
                type: Object
            }
        },
        // You can also write props: ['userDetailInfo'] but the above is recommended
    }
</script>

<style lang="scss" scoped>
</style>
```
Lý giải vì sao mình có để một `v-if` bao bên ngoài bởi vì ngay từ ban đầu ta đã render ra component `UserDetail` nên Vue sẽ cố gắng để in ra thông tin của props `UserDetailInfo` nhưng không có dữ liệu gì trong đó nên ngoài console sẽ báo lỗi (thực ra điều này cũng không ảnh hưởng gì lắm, lần sau các bạn click vào user có dữ liệu nó vẫn in ra bình thường, nhưng nó có thể ảnh hướng tới ứng dụng trong tương lai).

Cuối cùng là test thôi nào: 

![test_user_Vue](https://images.viblo.asia/ad39b4db-cbf7-4d4a-b50f-c32f5793b93c.png)

# Một số lưu ý và kết luận
Nếu các bạn đã đọc đến đây thì xin chúc mừng các bạn đã hoàn tất cơ bản được bài này, và dưới đây là những lưu ý rất cần thiết vì rất có thể các bạn sẽ dùng đến nó nhiều trong ứng dụng.
### Emit nhiều hơn một biến dữ liệu từ con lên cha
Quay trở lại component `ListUser`, để có thể `emit` nhiều hơn 1 biến ta sử dụng như sau:
```html
<script>
    import data from './data.json'
    export default {
        data() {
            return {
                userData: data,
                number: 1410,
                string: 'MTD'
            }
        },
        methods: {
            // This line below
            selectUser(user) {
                this.$emit('userSelected', user, this.number, this.string)
            }
        }
    }
</script>
```
Cứ thêm một biến thì viết liền ra sau cách nhau bởi dấy `phẩy` nhé mọi người.

Ở component cha `UserDashboard` ta sẽ thay đổi lại một xíu như sau:
```js
methods: {
    // Process event emitted from child
    childrenSelectUser(user, number, string) {
        console.log(user)
        console.log(number)
        console.log(string)
        this.userSelectedFromChild = user
    }
}
```
Thứ tự các biến truyền vào của hàm nhớ là phải đúng thứ tự như khi `emit` từ con lên nhé.
### Chèn thêm tham số xử lý với các biến được emit từ con
Nếu ở cha là `UserDashboard` ta muốn truyền thêm một biến của chính nó (không phải của con nhé) vào hàm `childrenSelectUser` ta sẽ làm như sau (cái này khá là hay nè :-D):
```html
<template>
    <div class="user-dashboard">
        <div class="list-user-comp">
            <h4>List User</h4>
            <!-- Listen event 'userSelected' emitted from child and process it using 'childrenSelectUser' -->
            <ListUser @userSelected="childrenSelectUser('this is test string', ...arguments)"></ListUser>
        </div>
        <hr>
        <div class="user-detail-comp">
            <h4>User Detail</h4>
            <!-- pass 'userSelectedFromChild', child will use props 'userDetailInfo' -->
            <UserDetail :userDetailInfo="userSelectedFromChild"></UserDetail>
        </div>
    </div>
</template>

<script>
    import ListUser from './ListUser.vue'
    import UserDetail from './UserDetail.vue'
    export default {
        components: {
            ListUser,
            UserDetail
        },
        data() {
            return {
                userSelectedFromChild: {}
            }
        },
        methods: {
            // Process event emitted from child
            childrenSelectUser(text, user, number, string) {
                console.log(text)
                console.log(user)
                console.log(number)
                console.log(string)
                this.userSelectedFromChild = user
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây các bạn để ý cách mình truyền vào  ở phía trên trong thẻ `ListUser`, như sau:
* Tất cả các biến truyền thêm vào thì ta để ở đầu, khi kết thúc các biến cần truyền thêm ta thêm vào ở sau `...arguments` ý bảo với Vue là còn nhiều tham số truyền từ con lên nữa chứ không phải chỉ có mấy cái này đâu :-D
* Sau đó dưới hàm xử lý thì các bạn viết đầy đủ các tham số truyền vào theo đúng thứ tự nhé.

### Về việc sử dụng `parent`
Ngoài việc sử dụng `emit` để truyền dữ liệu lên cha thì các bạn có thể sử dụng trực tiếp `this.$parent.userSelectedFromChild` ở trong component `ListDashboard` nhưng điều này là rất **không khuyến khích**. Nó có thể hữu ích trong một số trường hợp, nhưng sẽ mất đi tính tiêu chuẩn của một ứng dụng Vue đó là "props xuống, sự kiện lên" tức là khi truyền dữ liệu vào con thì ta dùng `prop` còn khi đưa dữ liệu lên cha ta dùng `emit`, điều này giúp cho ứng dụng có được tính thống nhất, người khác dễ đọc code hơn.
### Mô tả chi tiết cho props 
Quay trở lại component `UserDetail`, mình có để một dòng comment là bạn có thể viết ngắn hơn bằng cách `props: ['userDetailInfo']` nhưng điều này cũng không khuyến khích mà chúng ta nên mô tả cho các `prop` càng chi tiết càng tốt, để `props` được chặt chẽ hơn, hạn chế việc truyền vào `props` sai định dạng từ cha, đồng thời người khác đọc code của chúng ta cũng biết `props` đó là gì. Ví dụ, nên viết là: 
```js
props: {
  status: String
}
```
Hoặc: 
```js
// Càng tốt hơn! 
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```
### Note nhỏ
Ở trong bài mình muốn làm chi tiết hết mức có thể nên các bạn có thể thấy các sự kiện, tên hàm, emit, props mình đều dùng các tên riêng biệt để các bạn có thể thấy nó là cái gì, được gọi ở đâu.

Nhưng thực tế khi hiểu và làm thật thì mình hay để tên giống nhau, để cho thống nhất và cũng đỡ mất quá nhiều thời gian vào việc nghĩ tên mới không trùng lặp (lúc cạn vốn sẽ có những cái tên rất là củ chuối xuất hiện :-D).

Ví dụ như sau:

Ở `ListUser.vue` mình `emit` luôn một sự kiện giống với tên hàm:
```js
selectUser(user) {
    this.$emit('selectUser', user, this.number, this.string)
}
```
Ở `UserDashboard.vue`, ta lắng nghe và xử lý như sau: 
```html
<ListUser @selectUser="selectUser(...arguments, 'test')"></ListUser>
```
Sau đó đổi lại tên hàm cho chính xác nhé, với `props` các bạn cũng có thể làm tương tự.
### Kết luận
Ôi viết đến đây cũng khá dài rồi, bài dài viết giật tưng bừng (Viblo ơi cải thiện đi thôi), mình toàn viết trên sublime rồi paste vào đây :). 

Qua bài này mong rằng các bạn đã hiểu được cách truyền dữ liệu giữa các component sử dụng `props` và `emit`, với mình đây là cách phổ biến nhất, mình hay dùng nhất trong các dự án mình đã làm, và cũng dễ hiểu nhất :).

Ở bài tiếp theo chúng ta sẽ tìm hiểu về vòng đời của Vue bằng cách thử các ví dụ về `created`, `mounted`, `destroy`,..

Cám ơn các bạn đã theo dõi, nếu có gì thắc mắc các bạn để lại ở comment nhé ^^!