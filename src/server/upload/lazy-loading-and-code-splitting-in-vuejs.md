Việc giữ cho ứng dụng của bạn tải nhanh ngày càng khó hơn. Trong loạt bài này, tôi sẽ đi sâu vào các kỹ thuật tối ưu hiệu suất Vue và bạn có thể sử dụng trong các ứng dụng Vue.js của mình để làm cho chúng tải ngày lập tức và hoạt động trơn tru hơn. Mục tiêu của tôi là làm cho loạt bài này trở thành một hướng dẫn đầy đủ  và hoàn chỉnh về hiệu suất ứng dụng Vue.


## Cách Webpack đóng gói(bundling)?

Hầu hết các mẹo trong loạt bài này sẽ tập trung vào việc làm cho JS bundle(gói) của chúng ta nhỏ hơn. Để hiểu điều quan trọng, trước tiên, chúng ta cần hiểu cách Webpack đóng gói tất cả các tệp của chúng ta.

Trong khi gói assets(thư mục chứa css, icon, image của app) của chúng ta, Webpack đang tạo ra một thứ gọi là biều đồ phụ thuộc([dependency graph](https://cloud.githubusercontent.com/assets/1365881/5745055/40da9236-9c26-11e4-9e2b-6611cd743423.png)). Đó là biểu đồ liên kết tất cả các tệp của chúng ta dựa trên các lần import. Giả sử chúng ta có một file là *main.js* được chỉ định làm *entry point*(điểm vào : nơi được truy cập đầu tiên khi chạy app) trong cấu hình *webpack* của chúng ta, nó sẽ là gốc của  biều đồ phụ thuộc . Bây giờ mọi js modunle mà chúng ta sẽ import trong file này sẽ trở thành nút của nó trong biểu đồ và mọi module được import trong các nút này sẽ trở thành nút của chúng.

Webpack đang sử dụng biểu đồ phụ thuộc này để phát hiện file nào nó nên đưa vào gói đầu ra(*output bundle*). Gói đầu ra chỉ là một file js duy nhất (hoặc nhiều như chúng ta sẽ thấy trong các phần sau) chứa tất cả các module từ biểu đồ phụ thuộc.

Về cơ bản, gói này là toàn bộ ứng dụng JavaScript của chúng ta.

Chúng ta có thể minh họa quá trình này bằng hình ảnh dưới đây:

![](https://images.viblo.asia/df72543a-6013-4464-a096-0fc3a19d1fb9.png)


Bây giờ chúng ta đã biết cách đóng gói(budling) của webpack như thế nào, rõ ràng là dự án của chúng ta càng lớn thì gói JavaScript ban đầu càng lớn.

Gói lớn hơn, thời gian tải xuống và phân tích cú pháp cho người dùng càng lâu. Người dùng càng phải đợi lâu thì khả năng họ rời khỏi trang web của chúng ta càng cao. Trên thực tế, theo Google, 53% người sủ dụng di động rời khỏi một trang mất hơn 3 giây để tải.

Tóm lại, **gói lớn hơn = ít người dùng hơn**(*bigger bundle = fewer users*), điều này có thể trực tiếp dẫn đến mất doanh thu tiềm năng. **Bing** là một ví dụ điển hình - **2 giây chậm trễ khiến họ mất 4,3% doanh thu trên mỗi khách truy cập.**

## Lazy loading 

Vậy làm cách nào chúng ta có thể cắt bớt kích thước gói khi chúng ta vẫn cần thêm các tính năng mới và cải thiện ứng dụng của mình? Câu trả lời là có  -  **lazy loading and code splitting**(tải lười biến và tách code)

Như tên cho thấy *lazy loading* là một quá trình tải các phần ứng dụng của bạn một cách lười biếng(lazily). Nói cách khác - chỉ tải chúng khi chúng ta thực sự cần.  *Code splitting* chỉ là một quá trình tách ứng dụng thành các phần được tải chậm rãi này

![](https://images.viblo.asia/82e96a80-d074-4581-b2be-10259be2df68.png)

Trong hầu hết các trường hợp, bạn không cần tất cả code từ gói Javascript(javascript bundle) ngay lập tức khi người dùng truy cập trang web của bạn.

Ví dụ: chúng ta không cần dành các tài nguyên có giá trị để tải khu vực “*My Page*” cho những khách truy cập trang web của chúng ta lần đầu tiên. Hoặc có thể có các modals, tooltips và các bộ phận và thành phần khác không cần thiết trên mọi trang.

Tính năng *lazy loading* cho phép chúng ta chia nhỏ gói và chỉ phân phát các phần cần thiết để người dùng không mất thời gian tải xuống và phân tích cú pháp code không được sử dụng.

Để xem có bao nhiêu mã JavaScript thực sự được sử dụng trong trang web của chúng ta, chúng ta có thể truy cập devtools(F12) -> Coverage -> ấn icon reload ngay bên dưới (với chrome) . Bây giờ, chúng ta sẽ có thể thấy lượng code đã tải xuống và thực sự được sử dụng.

![](https://images.viblo.asia/136b4f72-f4d9-412d-92c9-3cf6834b2a3c.png)

Mọi thứ được đánh dấu là màu đỏ là thứ không cần thiết trên đường dẫn hiện tại(*current route*) và có thể được tải một cách lười biếng(*lazy loaded*). Nếu bạn đang sử dụng bản đồ nguồn, bạn có thể nhấp vào bất kỳ file nào trong danh sách này và xem phần nào của file đó không được sủ dụng. Như chúng ta có thể thấy, ngay cả vuejs.org cũng có rất nhiều điểm để cải thiện.

Bằng cách tải lười biến(*lazy loading*) các thành phần và thư viện thích hợp, đây có lẽ là cách dễ nhất để tăng hiệu suất.

Ok, chúng ta đã biết *lazy loading* là gì và nó hữu ích ra sao. Bạn hãy sử dụng trong Vue app của mình nhé :smile_cat:

## Dynamic Import(import động)
Chúng ta có thể dễ dàng tải một số phần của úng dụng một cách lười biến(*lazily*) với [wepack dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports). Hãy nhìn xem cách chúng hoạt động và chúng khác với cách import thông thường(*regular imports*) như thế nào.

Nếu chúng ta import một module js với cách chuẩn như thế này :

```js
// cat.js
const Cat = {
  meow: function () {
    console.log("Meowwwww!")
  }
}
export default Cat

// main.js
import Cat from './cat.js'
Cat.meow()
```

Nó sẽ được thêm vào dưới dạng một nút của *main.js* trong biểu đồ phụ thuộc và đã được đóng gói(*bundled*).

Nhưng điều gì sẽ xảy ra nếu chúng ta chỉ cần module **Cat** của mình trong một số trường hợp nhất định như phản hồi đối với tương tác của người dùng? Gói module này với gói ban đầu(*initial bundle*) của chúng ta là một ý tưởng tồi vì nó không cần thiết mọi lúc. Chúng ta cần một cách để thông báo cho ứng dụng của mình khi nào nó sẽ tải xuống đoạn code này.

Đây là lúc *dynamic imports* có thể giúp chúng ta! Hãy xem ví dụ này:

```js
// main.js
const getCat = () => import('./cat.js')
// later in the code as a response to some user interaction like click or route change
getCat()
  .then({ meow } => meow())
```

Hãy xem nhanh những gì đã xảy ra ở đây:

Thay vì *import*  trực tiếp module **Cat**, chúng ta đã tạo một hàm trả về hàm *import ()*. **Bây giờ webpack sẽ đóng gói(*bundle*) nội dung của module được import động vào một file riêng biệt**. Hàm đại diện cho module được import động  trả về một *Promise* sẽ cung cấp cho chúng ta quyền truy cập vào các thành viên được *export* của *module* khi *resolved*.

Sau đó, chúng ta có thể tải xuống đoạn tùy chọn này sau, khi cần. Ví dụ: phản hồi cho một tương tác người dùng nhất định (như route change hay click chuột).

Bằng cách thực hiện import động, về cơ bản, chúng ta đang cô lập nút đã cho (trong trường hợp đó là **Cat**) sẽ được thêm vào biểu đồ phụ thuộc và tải xuống phần này khi chúng ta quyết định nó cần thiết (chúng ta cũng đang cắt bỏ các module được import bên trong **Cat.js**).

Hãy xem một ví dụ khác sẽ minh họa rõ hơn cơ chế này.

Giả sử chúng ta có một cửa hàng trực tuyến rất nhỏ với 4 files:

*  *main.js*: gói chính (main bundle).
*  *product.js*:  chứa scripts của trang product.
*  *productGallery.js*: chứa scripts của trang product page.
*   *category.js*: chứa scripts của trang category.

Không cần đi sâu vào chi tiết, hãy xem cách các file đó được phân phối trên ứng dụng:

```js
// category.js
const category = {
  init () { ... }
}
export default category

// product.js
import gallery from ('./productGallery.js')

const product = {
  init () { ... }
}
export default product

// main.js
const getProduct = () => import('./product.js')
const getCategory = () => import('./category.js')

if (route === "/product") {
  getProduct()
    .then({init} => init()) // run scripts for product page
}
if (route === "/category") {
  getCategory()
    .then({init} => init()) // run scripts for category page
}
```

Trong đoạn code trên, tùy thuộc vào đường dẫn hiện tại(*current route*), chúng ta đang *import động*  module *product* hoặc *category* và sau đó chạy hàm *init* được *export* bởi cả hai.

Khi biết cách *import động*(dynamic import) hoạt động, chúng ta biết rằng *product* và *category* sẽ kết thúc trong một gói riêng biệt(separate bundles) nhưng điều gì sẽ xảy ra với module *productGallery* không được import động? Như chúng ta đã biết cách import động module là đang cắt một phần của biểu đồ phụ thuộc. Mọi thứ được import vào bên trong phần này sẽ được nhóm lại với nhau để *productGallery* cùng được đóng gói với module *product*.

Nói cách khác, chúng ta chỉ đang tạo ra một số loại *entry point* mới cho biểu đồ phụ thuộc.

![](https://images.viblo.asia/fc2f8e3b-c441-423f-9416-e63f9efdf036.png)


## Lazy loading Vue components

Bây giờ chúng ta đã biết lazy loading là gì và tại sao chúng ta cần nó. Đã đến lúc xem chúng ta có thể sử dụng nó như thế nào trong các ứng dụng Vue của mình.

TViệc này cực kỳ dễ dàng và chúng ta có thể tải toàn bộ *Single Page Component* một cách lười biếng(*lazily*), với CSS và HTML của nó với cùng một cú pháp như trước đây!

```js
const lazyComponent = () => import('Component.vue')
```

…đó là tất cả những gì bạn cần! Giờ đây, *Component* sẽ chỉ được tải xuống khi được yêu cầu. Dưới đây là những cách phổ biến nhất để gọi *dynamic loading* của Vue component:

* Gọi hàm được import:

```js
const lazyComponent = () => import('Component.vue')
lazyComponent()
```

* Component được yêu cầu để render :

```js
<template>
  <div> 
    <lazy-component />
  </div>
</template>

<script>
const lazyComponent = () => import('Component.vue')
export default {
  components: { lazyComponent }
}

// Another syntax
export default {
  components: {
    lazyComponent: () => import('Component.vue')
  }
}
</script>
```

Xin lưu ý rằng việc gọi hàm *lazyComponent* sẽ chỉ xảy ra khi thành phần được yêu cầu hiển thị trong một template. Ví dụ:

```js
<lazy-component v-if="false" /> 
```

Component sẽ không được tải cho đến khi nó được yêu cầu trong DOM, ngay sau khi giá trị *v-if* thay đổi thành *true*.

Thank you for watching, đón xem các phần tiếp theo nhé.
Dịch từ [vueschool](https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/)