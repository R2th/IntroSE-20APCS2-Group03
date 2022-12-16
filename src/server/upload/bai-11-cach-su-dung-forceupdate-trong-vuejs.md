Chào mừng các bạn quay trở lại với series học VueJS của mình, ở bài trước ta đã tìm hiểu về [vòng đời của Vue instance](https://viblo.asia/p/bai-10-vong-doi-cua-mot-vue-instance-va-cach-ap-dung-vao-thuc-te-GrLZDwveKk0), và bài này sẽ giới thiệu cho các bạn về các re-render lại DOM khi cần thiết, và các lỗi liên quan. Mình tổng hợp dựa vào những gì mình học được trong quá trình phát triển ứng dụng.
# Giới thiệu `$forceUpdate`
`forceUpdate` được sử dụng khi các bạn cần thiết re-render lại DOM. Bằng cách sử dụng `forceUpdate` ta có thể bảo Vue re-render lại DOM khi cần thiết, hiển thị dữ liệu một cách chính xác.

Để sử dụng các bạn đơn giản là gọi `this.$forceUpdate`, Vue sẽ làm mọi thứ còn lại là tìm đến phần dữ liệu bị thay đổi và render lại phần đó.
# Cách sử dụng
Chắc có lẽ VueJS là framework đầu tiên mà mình thích đọc nghiền ngẫm docs của nó, và ở trong docs có một câu rất quan trọng, mình xin dùng trình tiếng Anh của bản thân để dịch cho các bạn :) :
`để Vue có thể tự động render lại DOM thì các dữ liệu phụ thuộc phải được khai báo ban đầu là "reactive data" (khai báo trong data)  hoặc được thiết lập bằng cách gọi Vue.set() `

Mình sẽ hướng dẫn các bạn cách sử dụng thông qua ví dụ dưới đây nhé: 
```html
<template>
    <div>
        <div>
            Name: {{ person.name }}
        </div>
        <div>
            Nick name: {{ person.nickname }}
        </div>
        <div>
            <button @click="changeName">Change Name</button>
        </div>
        <div>
            <button @click="changeNickname">Change Nick Name</button>
        </div>
        <div>
            <button @click="changeNicknameProperly">Change Nick name properly</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          person: {
                name: 'Edson'
            }
        }
    },
    methods: {
        changeName() {
            this.person.name = 'Arantes';
        },
        changeNickname() {
            this.person.nickname = Math.random().toString(36).substring(7);
        },
        changeNicknameProperly() {
            Vue.set(this.person, 'nickname', 'Louis');
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
```
Ở đây các bạn thấy dữ liệu ban đầu mình khai báo `person` chỉ có `name`, và 3 hàm: 
* changeName: để thay đổi `name`
* changeNickname: để vừa tạo vừa thiết lập giá trị `nickname`, mình thiết lập một giá trị nickname ngẫu nhiên mỗi lần click dùng hàm `random`
* changeNicknameProperly: để mô tả cách sử dụng đúng khi thêm mới thuộc tính `nickname`
Ở phần `template` bên trên mình có in ra `name` và `nickname` cùng với đó là 3 button gọi đến 3 phương thức ta vừa nói ở trên.
Sau đó các bạn save file lại, mở trình duyệt, mở `Vue-devtool` để quan sát nhé.

Đầu tiên khi load trên màn hình chỉ hiện `name` vì hiện tại `nickname` chưa có, sau đó click vào button `Change Name`, ta có thể thấy `name` đã thay đổi, vì nó là `reactive data` (được khai báo trực tiếp trong `data`.

Sau đó ta thử click button `Chang nickname`, vâng và vẫn chưa thấy `nickname` xuất hiện trên màn hình. Vào `Vue-devtool`, click `Refresh`, đã thấy có `nickname` rồi mà :'(, ầy gù. Quay lại với câu nói kinh điển mình dịch docs của Vue mà mình nói ở bài. Vì `nickname` ta không khai báo trong `data` cũng không dùng `Vue.set()` để thiết lập nên nó không phải `reactive data` nên khi nó thay đổi thì DOM sẽ không re-render, các bạn có click đến mỏi tay thì vẫn chỉ có dữ liệu ta nhìn ở `Vue-devtool` là thay đổi :). 

"OK, thế fix ra sao vì tôi không thích dùng Vue.set() cũng không muốn đưa nó vào `data` ngay lúc đầu?". Với trường hợp như thế thì ta cần gọi `this.$forceUpdate` để yêu cầu Vue re-render lại DOM, thì sẽ được kết quả mong muốn.
```js
changeNickname() {
    this.person.nickname = Math.random().toString(36).substring(7);
    this.$forceUpdate()
}
```
Và đây là một trường hợp mình rất hay gặp vì nhiều khi quên lúc load data từ backend thì có append thêm một số trường mà ko dùng `Vue.set` hay `$forceUpdate`, sau này khi trường đó thay đổi thì không thấy trên màn hình thay đổi :-D. 

Các bạn chú ý ở đây thì `nickname` vẫn không phải là `reactive data` nên sau này ở chỗ khác mà các bạn lỡ có thay đổi nó thì Vue vẫn sẽ không render lại và trên browser các bạn cũng sẽ không thấy sự thay đổi đâu nhé. Mà để `nickname` thay đổi và thấy kết qủa trên màn hình thì ta cứ luôn luôn phải gọi `$forceUpdate` (chưa nói tới `Vue.set`), vậy nếu project to lên mà quên không gọi `$forceUpdate` thì debug mỏi mắt không tìm ra lỗi nhỉ :-D :-D. 

Nên để tốt nhất mình khuyên các bạn nên khai báo nó sẵn ở `data` hoặc thêm cho nó luôn từ backend trước khi trả về kết quả bên Vue, hoặc làm theo cách bên dưới đây nhé (khuyến khích).

Có một bạn hỏi là có cách nào để tôi không dùng `forceUpdate` được không thì vẫn có một cách khác cũng khá là đơn giản và tốt hơn để DOM re-render mỗi khi nickname thay đổi. Đó là sử dụng `Vue.set()`. Xem ví dụ sau:
```html
<template>
    <div>
        <div>
            Name: {{ person.name }}
        </div>
        <div>
            Nick name: {{ person.nickname }}
        </div>
        <div>
            <button @click="changeName">Change Name</button>
        </div>
        <div>
            <button @click="changeNickname">Change Nick Name</button>
        </div>
        <div>
            <button @click="changeNicknameProperly">Change Nick name properly</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
          person: {
                name: 'Edson'
            }
        }
    },
    methods: {
        changeName() {
            this.person.name = 'Arantes';
        },
        changeNickname() {
            this.person.nickname = Math.random().toString(36).substring(7);
        },
        changeNicknameProperly() {
            Vue.set(this.person, 'nickname', 'Louis');
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
```
Giải pháp là lần đầu tiên ta click vào button `Change Nick name properly` để khởi tạo `nickname`, từ bây giờ nó đã là `reactive data` và khi ta click lại vào button `Change Nick Name` thì giờ đây không cần `forceUpdate` DOM đã re-render, và dữ liệu đã thay đổi trên màn hình.

## Đào sâu chút chút
Tại sao ban đầu `person` là reactive, khi `name` thay đổi thì ta thấy kết quả tự động đổi trên màn hình, mà giờ thêm có trường `nickname` xiu xíu xong thử đổi `nickname` lại không thấy có gì, cứ phải `Vue.set` hay `$forceUpdate()` thì mới được, sau này project to, quên ko để `Vue.set` hay `$forceUpdate()` thì chắc tìm mờ con mắt quá. :joy::joy:

Lí do ở phiên bản hiện tại Vue 2.x, khi component được khởi tạo, biến chúng ta khai báo ở `data` sẽ được Vue duyệt qua **chỉ 1 lần**, Vue sẽ "ghi nhớ" chúng tại thời điểm component khởi tạo và "theo dõi" khi chúng thay đổi,  vì thế khi ta thêm `nickname` thì `Vue` không "để ý" tới `nickname` khi nó thay đổi nữa mà ta phải dùng tới `Vue.set` hay `$forceUpdate` để "nhắc" Vue "nhớ tới" `nickname` :-D

Cùng với đó, ở Vue 2.x, Vue dùng `Object.defineProperty` là "core" cho việc xử lý reactive, do đó sẽ có 1 số trường hợp với Object hay Array mà Vue không "biết" được khi giá trị thay đổi, các bạn có thể xem thêm [tại đây](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)

Nhưng ở Vue 3 chuẩn bị release (hiện tại đang là cuối tháng 5/2020, Vue 3 đang ở bản Beta 14), thì "core" cho việc xử lý reactive đã được thay thế bằng [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Điều  này sẽ giải quyết được các vấn đề bên trên, mở ra 1 tương lai mới với không Vue.set hay $forceUpdate, đồng nghĩa với việc thích thêm gì cứ thế thêm vào tẹt bô `person.nickname2, person.nickname3,....` và Vue sẽ "tự biết" đó là reactive.

Sướng nhé các bạn :-D :-D
# Kết luận
Qua bài này mong rằng các bạn đã hiểu được cách `$forceUpdate` hoạt động, qua đó sử dụng một cách đúng đắn tránh được các trường hợp không hiểu vì sao hiển thị dữ liệu không đúng, hoặc những trường hợp `thôi cứ thêm vào forceUpdate cho nó chắc` :-D.

Nói chung khi code mình hạn chế sử dụng `$forceUpdate`, với mình đó là giải pháp tệ nhất khi không giải thích được lỗi về data. Như trang chủ Vue đã khuyến cáo:
```
If you find yourself needing to force an update in Vue, in 99.99% of cases, you’ve made a mistake somewhere.

Tạm dịch:
Nếu bạn thấy mình cần phải sử dụng forceUpdate, thì 99% là bạn đã phạm sai lầm ở đâu đó rồi :-D
```

Hôm nay viết nhiều buồn ngủ quá rồi. Hẹn gặp lại các bạn vào bài tới với cách `binding class và style` cho các thẻ HTML. Có gì thắc mắc các bạn comment bên dưới nhé ^^!