![](https://images.viblo.asia/684a985c-d0ee-4300-b5a8-73baa28b4e46.png)

([Nguồn ảnh](https://www.monkeyuser.com/2018/refactoring/))

Như bạn đã biết, Vue.js là một javascript-based framework đang phát triển nhanh chóng trong vài năm trở lại đây.

Có nhiều lý do đằng sau sự phát triển này, bao gồm sự đơn giản của framework, dễ dàng tích hợp, thân thiện với người dùng, có thể mở rộng. Những lý do này đã giúp Vue.js cạnh tranh với những anh lớn như Angular hay React.

Tuy nhiên, khi tìm kiếm về những hạn chế của Vue, tôi nhận thấy việc thiếu sự support cho các dự án quy mô lớn xuất hiện rất nhiều. Khi càng làm việc với VueJS, tôi có thể nói với bạn rằng: chúng ta có thể khắc phục được. :muscle:

Vì vậy, trong bài viết này, chúng ta sẽ thảo luận về 4 phương pháp có thể sử dụng để tổ chức các dự án Vue.js quy mô lớn.

## 1. Sử dụng Vue Slots để code của bạn dễ hiểu hơn.
![](https://images.viblo.asia/de80028c-78d8-42b7-b835-8f466a8f7c9a.jpg)

([Nguồn ảnh](https://simpletech.xyz/article/slots-in-vue/))

Mối quan hệ cha-con là một trong những phương pháp được sử dụng nhiều nhất khi kết nối các components với nhau. Nhưng đây có thể không phải là lựa chọn tốt nhất trong một số trường hợp. Hãy tưởng tượng một tình huống mà bạn có một số lượng lớn các components con trong một component cha duy nhất, bạn sẽ phải sử dụng một số lượng lớn các props và emit event để xử lý các components con đó và nó sẽ trở thành một mớ hỗn độn ngay lập tức. Đây là tình huống chính xác mà bạn sẽ phải đối mặt trong một dự án quy mô lớn. Vậy giải pháp cho vấn đề này là gì?

**Slots** được sử dụng trong Vue.js cung cấp một cách thay thế để đại diện cho mối quan hệ cha-con. Slots cung cấp cho bạn một cách đặt nội dung ở những vị trí mới.
Ví dụ cơ bản về  `slot` như sau:

```
<div class="demo-content">
   <slot></slot>
</div>
```

Khi component trên hiển thị tag `<slot></slot>` nó sẽ được thay thế bằng tag `demo-content` như bên dưới:

```
<demo-content>
  <h2>Hi!</h2>
  <class-name name="Welcome to Vue!"></class-name>
</demo-content>
```

Có nhiều loại **slots** khác nhau mà bạn có thể sử dụng trong các dự án Vue. Nhưng điều quan trọng nhất bạn cần nhớ là `slot` tạo ra sự khác biệt rất lớn cho các dự án, nó phát triển và maintain tốt,  lại dễ hiểu nữa.

## 2. Build và share các components độc lập
![](https://images.viblo.asia/53a92f21-1a52-470a-8e47-f90278662a1a.png)

([Nguồn ảnh](https://vuejs.org/v2/guide/components.html))

Hãy tuân theo [nguyên tắc F.I.R.S.T](https://addyosmani.com/first/) để xây dựng các components của bạn trở nên: focused, independent, reusable, small & testable (tập trung, độc lập, có thể tái sử dụng, nhỏ và có thể test).

> [..] the secret to efficiently building ‘large’ things is generally to avoid building them in the first place. Instead, compose your large thing out of smaller, more focused pieces. This makes it easier to see how the small thing fits within the broader scope of your large thing.”-Addy Osmani

Tạm dịch:
> “[..] bí quyết để xây dựng những thứ 'lớn' một cách hiệu quả thường là tránh xây dựng chúng ngay từ đầu. Thay vào đó, hãy sắp xếp việc 'lớn' từ những phần nhỏ hơn, tập trung hơn. Điều này giúp bạn dễ dàng thấy được việc nhỏ phù hợp với phạm vi rộng hơn của việc lớn như thế nào. ”- Addy Osmani

Bạn cũng có thể sử dụng các công cụ như [Bit (Github)](https://bit.dev/) để kiểm soát source code của từng components trong dự án một cách độc lập và chia sẻ nó với component hub của Bit.

Các components được chia sẻ được hiển thị trên component hub của Bit với các tài liệu được tạo tự động và các ví dụ liên quan.

Chúng có thể được cài đặt bằng NPM hoặc "cloned" và modified.

Điều này làm cho việc tìm kiếm, sử dụng và maintain các components dễ dàng hơn. Và do đó, việc maintain dự án cũng dễ dàng hơn.


Bạn có thể [tìm hiểu thêm về Bit](https://blog.bitsrc.io/how-to-easily-share-vue-components-between-applications-1d30a1ad4e4d) để dễ dàng chia sẻ Vue Component nhé.

## 3. Maintaining Vuex store

Vuex là một state management pattern trong Vue.js và nó hoạt động như một kho lưu trữ tập trung cho tất cả các components trong ứng dụng. Theo thời gian, tôi đã thấy các bình luận trên Vuex store nói rằng “Vuex hạn chế các developers cấu trúc các dự án khi họ cần”. Nhưng sự thật là Vuex giúp các nhà phát triển cấu trúc các dự án của họ theo cách có tổ chức hơn bằng cách sử dụng một bộ nguyên tắc.

Trước khi tìm hiểu những nguyên tắc đó, có 4 components chính trong Vuex store bạn nên biết. Nếu bạn đã quen với 4 điều này, bạn có thể dễ dàng tái cấu trúc Vuex store của mình một cách có tổ chức hơn.

1. States: Được sử dụng để lưu giữ data của ứng dụng.
2. Getters: Được sử dụng để truy cập các state object bên ngoài store.
3. Mutations: Được sử dụng để sửa đổi các state object.
4. Actions: Được sử dụng để commit mutations.

Bạn có thể đọc thêm ở [đây.](https://vuex.vuejs.org/guide/state.html)

Giả sử rằng bạn đã quen thuộc với 4 components đó, hãy xem những nguyên tắc bạn cần tuân theo là gì.

1. Bạn cần giữ application-level state tập trung trong store.
2. Các states phải luôn luôn cập nhật bằng cách committing mutations.
3. Logic không đồng bộ nên được đóng gói và chúng chỉ có thể được sử dụng với các actions.

Nếu bạn có thể tuân theo 3 nguyên tắc này, các dự án của bạn có thể được cấu trúc suôn sẻ và nếu bạn cảm thấy các file lưu trữ ngày càng lớn hơn, bạn có toàn quyền tự do chia chúng thành các file riêng biệt. Ví dụ một cấu trúc dự án sẽ giống như dưới đây:

```
├── index.html
├── main.js
├── api
├── components
└── store
    ├── index.js
    ├── actions.js
    ├── mutations.js
    └── modules
```

**'Mô-dun' hóa VUEX Store**

Chúng ta đang nói về các dự án quy mô lớn trong bài viết này và chúng ta có thể mong đợi các file sẽ rất lớn và phức tạp. Bạn cần quản lý store theo cách riêng của mình và cần tránh để store quá tải. Vì vậy, bạn nên module hóa store của mình theo cách mà bạn có thể dễ hiểu. Không có một quy tắc nào để break các modules trong dự án cả.

Một số developers module hóa theo các tính năng trong khi một số developers khác module hóa theo mô hình dữ liệu. 

Quyết định cuối cùng về việc module hóa hoàn toàn phụ thuộc vào bạn và điều này sẽ giúp ích cho cả bạn và nhóm của bạn về lâu về dài.

```
store/
   ├── index.js
   └── modules/
       ├── module1.store.js
       ├── module2.store.js
       ├── module3.store.js
       ├── module4.store.js
       └── module5.store.js
```

**Sử dụng helpers để đơn giản hóa code**

Trong phần trên, tôi đã đề cập đến 4 components được sử dụng trong Vuex store. Hãy xem xét một tình huống mà bạn cần truy cập các states, getters hoặc bạn cần call các actions, mutations trong components của bạn. Trong tình huống này bạn không cần phải tạo ra nhiều computed properties hoặc methods, bạn có thể dễ dàng sử dụng các helper methods(`mapState`, `mapGetters`, `mapMutations` và `mapActions`) . Cùng xem 4 helper methods đó hoạt động thế nào:

### mapState

Nếu chúng ta cần gọi nhiều store state properties hoặc getters trong một component, chúng ta có thể sử dụng `mapState` helper để tạo một hàm getter và điều này sẽ làm giảm đáng kể số lượng dòng code.

```
import { mapState } from 'vuex'

export default {
  computed: mapState({
    count: state => state.count,
    countAlias: 'count',
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

### mapGetters

`mapGetters` helper có thể được sử dụng để ánh xạ các getters store với các local computed properties.

```
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'count1',
      'getter1',
    ])
  }
}
```

### mapMutations

`mapMutations` helper có thể được sử dụng để commit các mutations trong các components và nó sẽ ánh xạ các components method tới `store.commit`. Ngoài ra, chúng ta cũng có thể sử dụng `mapMutations` để pass payloads.

```
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      cal: 'calculate' // map `this.cal()` to `this.$store.commit('calculate')`
    })
  }
}
```

### mapActions

Method helper này được sử dụng để gửi các actions trong components và nó ánh xạ các component methods tới `store.dispatch`.

```
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      cal: 'calculate' // map `this.cal()` to `this.$store.dispatch('calculate')`
    })
  }
}
```

## 4. Đừng quên viết Unit Test
![](https://images.viblo.asia/d1b17544-e7df-4355-9318-2f5146119a4d.jpg)

([Nguồn ảnh](https://twitter.com/dev_humor/status/1076537897711484930))

Testing là một khía cạnh quan trọng khác của bất kỳ dự án nào. Là một developer, chúng ta phải biết test đóng vai trò quan trọng không kém gì code cả. Đặc biệt khi dự án ngày càng lớn, có hàng trăm, hàng nghìn chức năng nhỏ, nhiệm vụ của chúng ta là phải test từng chức năng này. Unit test có tác dụng cho các tình huống như vậy và nó cho phép dev chúng ta chia nhỏ ra từng unit để test. Unit test, không chỉ tránh lỗi mà còn cải thiện sự tự tin của chúng ta nữa đấy hehe.  Bất cứ khi nào có thay đổi hay khi các dự án phát triển theo thời gian, dev có thể thêm các tính năng mới mà không sợ phá vỡ các tính năng khác bằng cách viết unit test tốt ngay từ đầu.

Nếu chúng ta muốn test unit trong Vue.js, bạn có thể sử dụng Jest, Karma hoặc Mocha với Vue.js một cách dễ dàng. Mặc dù là framework nhưng có một số lưu ý bạn cần ghi nhớ khi viết unit test.

- Test phải cung cấp thông báo lỗi rõ ràng nếu nó fails.
- Sử dụng một assertion library. (Ví dụ: Chai library được sử dụng với Mocha)
- Viết các unit test để cover từng components Vue. (Sử dụng coverage để kiểm tra xem line đó đã được cover chưa).

Bằng cách làm theo các bước này ngay từ đầu, bạn có thể giảm đáng kể thời gian dành cho việc fix bug và test thủ công khi cấu trúc dự án ngày càng lớn.

Ngoài Unit testing, Vue.js hỗ trợ cả test E2E và Integration testing (test tích hợp) giống như bất kỳ framework nào khác. Vì vậy, nó sẽ rất tốt để kết hợp những thứ đó với dự án của bạn. Thông thường phần routing không được test bằng cách sử dụng unit test và nó có thể được cover bằng test E2E. Vue store là phần khó test nhất và phương pháp được đề xuất cho điều đó là integration testing vì test riêng biệt cho các states, actions hoặc getters được coi là vô ích.

## Kết luận
Trên đây là một số các khả năng và cách khắc phục khi làm dự án Vue.js. Thay vì phải dành thời gian để sắp xếp lại mớ hỗn độn, chúng ta có thể dùng những cách tôi nói trên đây xây dựng một dự án tốt hơn ngay từ đầu. Nếu bạn có ý tưởng gì hay một quan điểm nào khác thì đừng ngần ngại comment và chia sẻ những kinh nghiệm của bạn nha.
Thanks for reading!

Ref: https://blog.bitsrc.io/4-best-practices-for-large-scale-vue-js-projects-9a533450bdb2