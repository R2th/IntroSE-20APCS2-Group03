## 1/ Vuex là gì?
- Vuex là một mẫu quản lý trạng thái (state) + thư viện cho các ứng dụng Vue.js, lấy cảm hứng từ Flux, Redux và kiến trúc Elm nhưng được thiết kế và điều chỉnh đặc biệt để tích hợp tốt với Vue.js và tận dụng Reactivity của Vue.
- Tất cả các thư viện này đều nhằm giải quyết một vấn đề đơn giản: Khi có trạng thái được chia sẻ trên nhiều thành phần, đặc biệt là các thành phần là anh chị em hoặc theo view rất khác nhau, việc quản lý phân phối và cập nhật trạng thái đó là một thách thức.
- Các thư viện như VueX cho phép quản lý trạng thái chia sẻ giữa các thành phần theo cách có cấu trúc và có thể duy trì, bằng cách tạo một cây trạng thái toàn cầu có thể được truy cập và cập nhật bởi mọi thành phần theo cách có cấu trúc.
- Nó phục vụ như một cửa hàng tập trung cho tất cả các thành phần trong một ứng dụng, với các quy tắc đảm bảo rằng trạng thái chỉ có thể bị đột biến theo kiểu có thể dự đoán được. 
- Nó cũng tích hợp với tiện ích mở rộng devtools chính thức của Vue để cung cấp các tính năng nâng cao như gỡ lỗi thời gian không cấu hình và xuất/nhập ảnh chụp nhanh trạng thái.
## 2/ Tại sao nên sử dụng Vuex
- Phần lớn các framework JavaScript đều có cái gọi là store. Bạn có thể đã gặp thuật ngữ này khá nhiều lần. Chính xác thì từ này có nghĩa là gì? Nó có phải là một loại lưu trữ?
- Store là thứ có thể nói là nắm giữ chìa khóa để tạo các ứng dụng và trang web nâng cao trong framework JavaScript bạn chọn. Cho dù đó là Vue.js, React, Ember hay Angular. Bây giờ, điều này không có nghĩa là bạn hoàn toàn phải sử dụng một store để tạo một ứng dụng web nâng cao. Bạn có thể tạo một trang web khá tiên tiến ngay cả với các tính năng đơn giản, được xây dựng được cung cấp bởi framework đó. Tuy nhiên, một store cung cấp cho bạn nhiều quyền kiểm soát hơn trong sự hỗn loạn của một ứng dụng trang web / web tiên tiến và khổng lồ (chưa kể phức tạp). Việc sử dụng một store cho phép bạn tổ chức một số thứ, cụ thể là trạng thái (state).
- Trạng thái (state) của một trang web hoặc ứng dụng web là cần thiết để tăng tính tương tác với người dùng. Nếu bạn đã từng sử dụng `props` để gửi một số dữ liệu đến một thành phần con và đã sử dụng các sự kiện tùy chỉnh để gửi lại một số dữ liệu cho cha mẹ (sử dụng `this.$emit`), thì những gì bạn đang làm là quản lý trạng thái. Ví dụ, chuyển các `props` để báo cho thành phần con tất cả các mục trong danh sách và phát ra một sự kiện để báo cho cha mẹ một mục bị bỏ qua, đang quản lý trạng thái của danh sách đó.
- Theo dõi và quản lý state cho trang weblà rất quan trọng.Và  Vuex làm điều rất tốt.

**Vậy thì tại sao nên dùng Vuex**

- Vue không giới hạn trong việc sử dụng một store cụ thể. Nhiều store có sẵn để sử dụng. Redux là một thư viện quản lý state rất phổ biến vì nó được sử dụng bởi hầu hết mọi người sử dụng React. Nhưng ngay cả khi bạn có thể sử dụng Redux và các store khác nhưng với Vue vẫn nên sử dụng Vuex.
- Lý do cho điều đó là Vuex, giống như Redux, cũng được lấy cảm hứng từ Flux và được xây dựng để tận dụng các tính năng mà Vue cung cấp vượt trội. Đối với một người, trong khi trạng thái trong Redux là bất biến, và hoàn toàn thay thế khi thay đổi nó, Vuex cung cấp một cách rất cụ thể để biến đổi trạng thái.
- Điều làm cho Vuex trở nên mạnh mẽ hơn là các thành phần có được trạng thái từ cửa hàng Vuex và có thể cập nhật một cách hiệu quả bất cứ khi nào trạng thái của store thay đổi.
- Do đó Vuex nên đứng đầu danh sách khi chọn một công cụ quản lý state cho các dự án Vue.
## 3/ Khi nào thích hợp để sử dụng Vuex?
- Vuex mạnh mẽ, hiệu quả. Vì vậy, chúng ta nên sử dụng nó nhiều hơn?

- Vuex cung cấp rất nhiều lợi thế không có nghĩa là nó được sử dụng mọi lúc.

- Một ví dụ điển hình là VueRouter. Mặc dù nó có nhiều tính năng thực sự hữu ích, nhưng có lẽ bạn sẽ không sử dụng trong tất cả các trang web. Một số trang web không cần Bộ định tuyến. Có thể có một back-end như Express, được cho là để xử lý việc định tuyến của các trang hoặc có thể bạn có Ứng dụng một trang (SPA) sử dụng các thành phần động. Tương tự, không phải mọi trang web hoặc ứng dụng web đều sử dụng Vuex.
Nói một cách đơn giản, nó giống như mua một chiếc điện thoại thông minh khi bạn chỉ đơn giản muốn một cái gì đó để thực hiện và nhận cuộc gọi. Điện thoại đó có camera tốt, dung lượng lưu trữ 256GB, RAM cho phép bạn chơi các trò chơi cao cấp. Nhưng nếu bạn chỉ muốn thực hiện cuộc gọi, bạn có thực sự cần tất cả điều đó không?

- Đó là điều tương tự với các dự án Vue và Vuex. Những thứ Vuex cung cấp phải là cần thiết nếu không thay vì hữu ích, nó sẽ là gánh nặng cho trang web. Có một số tình huống mà bạn có thể nhận được bằng các tính năng Vue cơ bản và một số khác bạn thực sự cần phải sử dụng sức mạnh của Vuex. 

**Vậy khi nào bạn nên cân nhắc khi nào sử dụng Vuex?**

- Cốt lõi của Vuex là một store lưu giữ tất cả trạng thái ứng dụng. Nói chung, sử dụng `props` và các sự kiện tùy chỉnh để theo dõi trạng thái. Điều đó là tốt miễn là trang web có một vài thành phần thay đổi trạng thái. 

- Và điều gì sẽ xảy ra nếu dự án trở nên lớn hơn và phức tạp hơn? Sẽ có nhiều thành phần hơn. Props được thông qua cho nhiều thành phần hơn, hàng loạt các sự kiện tùy chỉnh bắn ra. Ai đã thay đổi trạng thái đó, nó được cho là một cái gì đó khác nhưng một số thành phần đã thay đổi nó. Làm thế nào mà thành phần đó truy cập vào nó và nó là thành phần nào vậy? 
Một đống hỗn loạn! Khi một trang web có nhiều thành phần và thêm độ phức tạp, bạn cần tổ chức cách thay đổi trạng thái được thực hiện. Đây là một tình huống lý tưởng mà Vuex sẽ hỗ trợ tốt cho dự án. Việc Vuex được sử dụng cho các ứng dụng / trang web nhỏ hoặc đơn giản sẽ giống như ví dụ về điện thoại, quá mức cần thiết. Chỉ sử dụng nó khi bạn cảm thấy dự án của bạn có sự phức tạp cần sự trợ giúp trong việc quản lý nó.

## 4/ Sử dụng Vuex
Ở đây mình không đi sâu Vuex, chỉ giới thiệu cơ bản, một ví dụ đơn giản để thay đổi trạng thái trong Vuex và trạng thái truy xuất.

Bước đầu tiên là cài đặt Vuex: `npm install vuex`

Mình sẽ giữ logic trong một tập tin được gọi là `store.js`. Tất nhiên, bạn có thể đặt tên cho nó bất cứ điều gì bạn muốn. Mình sẽ có đối tượng store trong tệp này và sau đó nhập nó vào `app.js` nơi sẽ đăng ký nó với phiên bản Vue toàn cầu.

File `store.js`
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.store({
    state: {
        count: 0,
    },
    getters: {
        double: state => {
            return state.count * 2;
        }
    },
    mutations: {
        increment: state => {
            state.count++;
        }
    }
})
```

File `app.js`
```
import Vue from 'vue'
import App from './App.vue'

import {store} from './store.js'

new Vue({
    store,
    render: h =>h(App),
}).mount('#app');
```

File `App.vue`
```
<template>
    <div class="home">
        <h2>Number of click: {{ count }}</h2>
        <h2>Number of double click: {{ double }}</h2>
        <button @click="increment">Click to increment</button>
    </div>
</template>

<script>
    export default {
        computed: {
            count() {
                return this.$store.state.count;
            },
            double() {
                return this.$store.getters.double;
            }
        },
        method: {
            increment() {
                this.$store.commit('increment');
            }
        }
    }
</script>
```

- Trong `store.js`, chúng tôi có một đối tượng store Vuex. Cần phải có một số dữ liệu trong cửa hàng của chúng tôi sau đó sẽ bị thay đổi hoặc thay đổi và truy xuất bởi các thành phần khác. Có thể thêm dữ liệu vào store bằng từ khóa được xác định trước state. Chúng ta có thể sử dụng nó khi chúng ta sử dụng data() trong các component Vue thông thường. Trong store đã có một dữ liệu truy cập. Bây giờ chúng ta cần lấy nó từ một thành phần. Lấy `count` từ App.vue . Chúng ta có thể làm điều này bằng cách sử dụng lệnh `this.$store.state.count`. Tại đây, $store có sẵn khi đăng ký  Vuex trong app.js.

- Bây giờ có một khái niệm khác bạn sẽ sử dụng rất nhiều khi lấy dữ liệu. Có thể có các tình huống mà bạn cần phải làm việc trên dữ liệu hoặc thực hiện một số thao tác toán học trước khi sử dụng nó. Nếu công việc này là khác nhau cho các thành phần khác nhau, thì không có lựa chọn nào khác ngoài việc thực hiện nó riêng cho từng thành phần. Nhưng nếu hoạt động giống nhau cho tất cả các thành phần, thì bạn có thể sử dụng getters. Sử dụng getters, có thể thực hiện các thao tác trên dữ liệu của mình và sau đó lấy kết quả cuối cùng. Một getter cảm thấy tương tự như một chức năng. Nhưng nó khác. Đó là bởi vì một getter yêu cầu đối tượng trạng thái. Điều này được Vuex tự động chuyển đến getter. Việc đã sử dụng thuộc tính `count` để theo dõi số lần nhấp vào nút và sau đó chúng tôi truy xuất nó. Vì vậy, làm thế nào về chúng tôi tăng gấp đôi số lần nhấp trước khi hiển thị chúng. Chúng ta có thể sử dụng một getter `double` để đạt được kết quả này.
Mình sử dụng nó trong App.vue. Hãy nhớ rằng sử dụng getter thì không thể sử dụng this.$store.state. Đối với getters phải sử dụng this.$store.getters.

- Hãy nhớ chỉ sử dụng tên của getter. Trong ví dụ, điều này có nghĩa là sử dụng double và mà không phải double() . Đó là bởi vì không cần phải chạy nó mặc dù nó có vẻ giống như một chức năng thông thường. Hãy nghĩ về nó như khi gắn chức năng gọi lại với người nghe sự kiện. Giống như cách gọi lại đó được gọi tự động, getters được Vuex tự động gọi và thực hiện.

- Cuối cùng, chúng ta sẽ thấy mutations. Khi đột biến trạng thái của một thuộc tính dữ liệu, bạn chỉ cần thực hiện đột biến đó. Các thay đổi được thực hiện đối với thuộc tính dữ liệu được chỉ định trong đột biến. Trạng thái sau đó có thể được thay đổi từ bất kỳ thành phần nào và vẫn được cập nhật theo cùng một cách.
Mình thay đổi thuộc tính `count` bằng cách tăng thủ công. Hãy tạo ra một đột biến cho nó. `mutations` cần truy cập vào đối tượng trạng thái để biến đổi nó.
Khi nói đến việc sử dụng đột biến thì có một chút khác biệt. Không giống như với getters và trạng thái , đột biến không được truy cập như thế nào this.$store.mutations. Thay vào đó như đã đề cập trước đó, một đột biến được cam kết và chúng tôi chỉ định tên của đột biến trong ngoặc đơn.

*Đây là những ví dụ khá đơn giản và bạn không nên sử dụng Vuex trong một dự án nhỏ, đơn giản. Nhưng mình hy vọng các bạn có thể hiểu một số khái niệm cơ bản khi sử dụng Vuex.*

**Kết luận:** *Vuex rất hữu dụng trong những dự án lớn, phức tạp. Vì vậy hãy sử dụng nó đúng cách để dự án của bạn vận hành trơn tru nhất nhé :D*

Tài liệu tham khảo: 

https://dev.to/napoleon039/when-why-and-how-to-use-vuex-9fl

https://vuex.vuejs.org