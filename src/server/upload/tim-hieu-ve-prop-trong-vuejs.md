## 1. Mở đầu
<hr>

Trong bài viết trước, mình đã giới thiệu cho các bạn qua về **props** trong VueJS là gì, ở bài viết này chúng ta sẽ cùng nhau tìm hiểu rõ hơn về nó nhé.

## 2. Props
<hr>

### a. Truyền props vào component

Như các bạn đã biết thì ứng dụng VueJS của chúng ta được xây dựng bởi rất nhiều các component khác nhau kết hợp lại và phân thành nhiều cấp cha con. Giả sử chúng ta có một component `<PostItem />` và bên trong nó sẽ có các thành phần cơ bản như tiêu đề bài viết, nội dung bài viết, phần thanh điều hướng giữa các mục trong bài viết, ... và mô hình hóa nó chúng ta sẽ có hình như sau:

![](https://images.viblo.asia/b482f89f-86ea-434e-a25b-9f006cd05bdf.png)

Và tất nhiên để có các phần thông tin như tiêu đề bài viết, danh sách tag gắn với bài viết hay nội dung bài viết, ... thì chúng ta sẽ cần truyền dữ liệu từ component cha là `<PostItem />` xuống các component con của nó như trong hình ta thấy và ta có thể đạt được điều này bằng cách sử dụng props. Đây cũng chính là cách làm mặc định mà VueJS cung cấp cho chúng ta trong việc trao đổi dữ liệu từ component cha đến với các component con. Và trong một ứng dụng VueJS thực tế thì với ví dụ trên sẽ cho chúng ta phần code như sau:

```html
// PostDetailPage.vue
<template>
    <PostItem v-bind:post="post" />
</template>


// PostItem.vue
<template>
    <div class="post-item">
        <PostHeader v-bind:title="post.title" v-bind:tags="post.tags" />
        <div class="flex items-center">
            <PostContent v-bind:content="post.content" />
            <PostNavigator v-bind:navigator="post.nav" />
        </div>
    </div>
</template>
```

Như các bạn có thể thấy để có thể truyền được dữ liệu vào các component con ở đây ta sẽ dùng directive mà VueJS cung cấp đó là là `v-bind:[prop-name]`. Prop-name của bạn ở đây có thể là bất cứ cái tên nào mà bạn muốn như ở đây mình đã dùng v-bind:title, v-bind:tags, ... . Có một điều bạn cần lưu ý là nếu bạn truyền props giữa các component với nhau thì bạn có thể hoàn toàn sử dụng kiểu viết `camelCase` như là `postTitle`, `postNavigator`, ... để dùng với v-bind. Tuy nhiên nếu ứng dụng của bạn thuộc dạng sử dụng VueJS component trong một file html có sẵn thì bạn bắt buộc phải sử dụng `kehab-case` như sau: `post-title`, `post-navigator`, ... .

Trên thực tế, việc bạn phải truyền dữ liệu giữa các component cha con với nhau là rất thường xuyên vì thế dẫn đến nếu tiếp tục sử dụng cú pháp `v-bind` như nói trên sẽ làm code của bạn bị dài hơn, bạn phải gõ nhiều ký tự hơn. Chính vì thế VueJS cung cấp cho chúng ta một cách viết ngắn gọn hơn đó là bạn có thể thay thế `v-bind` bằng ký tự `:`. Cụ thể ta sẽ sửa lại đoạn code nói trên theo phiên bản ngắn hơn như sau:

```html
// PostDetailPage.vue
<template>
    <PostItem :post="post" />
</template>


// PostItem.vue
<template>
    <div class="post-item">
        <PostHeader :title="post.title":tags="post.tags" />
        <div class="flex items-center">
            <PostContent :content="post.content" />
            <PostNavigator :navigator="post.nav" />
        </div>
    </div>
</template>
```

Như bạn thấy sau khi bỏ hết v-bind đi thì đoạn code của chúng ta đã trở nên ngắn gọn hơn ban đầu. Ta có một ví dụ đơn giản hơn tiếp theo với cách sử dụng cú pháp ngắn gọn như nói trên:

```html
<template>
    <div class="some-wrapper-class">
        <img :src="image.url" alt="image.alt" />
    </div>
</template>
```

Ở đây ta chí có một component chưa thẻ `<img />` đơn giản với 2 thuộc tính truyền vào lần lượt là `:src` và `:alt`. Tuy nhiên ngoài cách viết như nói trên thì ta còn có một phương pháp nữa là truyền dưới dạng object như sau:

```html
<template>
    <div class="some-wrapper-class">
        <img v-bind="imgAttrs" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgAttrs: {
                    src: this.image.url,
                    alt: this.image.alt
                } 
            }
        }
    }
</script>
```

Với cách làm ở trên, thay vì ta phải chỉ rõ ràng cách bind là `:src` và `:alt` như ban đầu thì ta đang truyền vào v-bind cả một object  là `imgAttrs` luôn và nó sẽ đem lại cho chúng ta kết quả tương tự như cách làm ban đầu. Ví dụ nói trên bạn có thể thấy hơi ngớ ngẩn vì cách viết ban đầu rõ ràng là ngắn hơn thì chúng ta việc gì phải quan tâm đến cách viết sau làm gì. Nhưng thực tế bạn có lẽ sẽ gặp một số trương hợp mà chúng ta phải truyền vào khá nhiều dữ liệu và với cách viết bind cụ thể thì nó sẽ như này:

```html
<template>
    <ABigComponent 
        :propOne="propOne"
        :propTwo="propTwo"
        :propThree="propThree"
        :propFour="propFour"
        :functionPropOne="functionPropOne"
        :functionPropTwo="functionPropTwo"
    />
</template>
```

Thì với cách bind cả object ta chỉ cần viết:
```html
<template>
    <ABigComponent
         v-bind="{
            propOne, propTwo, propThree, propFour, functionPropOne, functionPropTwo
         }"
    />
</template>
```
Với các trường hợp mà bạn cần truyền xuống nhiều dữ liệu mà không cần phải đổi tên thì bạn có thể cân nhắc sử dụng phương pháp nói trên thay vì bind như cách ban đầu để code được ngắn gọn hơn. Tất nhiên bạn cũng đồng thời nên tránh việc phải truyền xuống quá nhiều dữ liệu mà thay vào đó có thể thử sử dụng các phương pháp khác như Vuex.

### b. Khai báo props cho component

Quay lại với ví dụ đơn giản mà chúng ta có:

```html
<template>
    <div class="some-wrapper-class">
        <img :src="image.url" alt="image.alt" />
    </div>
</template>
```
Mắc dù chúng ta đã có thể truyền dữ liệu vào các component thông qua props tuy nhiên chạy lên bạn sẽ không thấy ra kết quả gì cả mà chỉ xuất hiện warning dạng như sau:

![](https://images.viblo.asia/d3ea8de0-8f37-4a26-b3a2-5c6f71e46439.png)

Warning này xuất hiện là do bạn chưa khai báo các props sẽ được dùng trong component mà đã đem nó ra sử dụng luôn. Cách đơn giản nhất để khai báo các props có trong component đó là sử dụng dạng array như sau:

```html
<template>
    <div class="some-wrapper-class">
        <img :src="image.url" alt="image.alt" />
    </div>
</template>

<script>
    export default {
        props: ["image"]
    }
</script>
```
Cú pháp trên chính là cách nhanh chóng và đơn giản nhất để chúng ta khai bao cho component biết rằng chúng ta sẽ sử dụng props có tên là `image` được truyền vào và với nó bạn có thể sử dụng `image` thoải mái trong component của bạn mà không lo warning nữa. Nhưng cách khai báo như trên chỉ phù hợp khi bạn đang thử nghiệm nhanh các chức năng hoặc tạo nhanh prototype cho sản phẩm của bạn. Còn thực tế nếu bạn chỉ viết như trên sẽ dẫn tới khi những người sau sử dụng lại component của bạn sẽ rất khó hiểu và phải tìm đọc kĩ lại xem `image` thực chất nó là kiểu dữ liệu gì trong String, Number, Object, Function, ... . Chính vì thế trên thực tế khi phát triển sản phẩm bạn nên khai báo ít nhất như sau:

```html
<template>
    <div class="some-wrapper-class">
        <img :src="image.url" alt="image.alt" />
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: Object,
            }
        }
    }
</script>
```
Ở đây từ cách khai báo mảng đơn giản ban đầu, ta đã chuyển nó về dạng một object. Vì props mà chúng ta dùng ở đây có tên là `image` nên object của chúng ta bên trong `props: {}` cũng cùng tên như vậy. Tiếp đó bên trong `image` chúng ta có một thuộc tính là `type`. Đây chính ta thuộc tính cho phép chung ta khai báo sẽ props `image` mà component của chúng ta nhận được và sử dụng sẽ thuộc kiểu dữ liệu gì trong số **Object, String, Number, Array, Function, Boolean, Date, Symbol**. Ngoài ra bạn cũng có thể khai báo prop mà chúng ta dùng có thể là nhiều kiểu dữ liệu khác nhau bằng cách sử dụng array như sau:

```html
<script>
    export default {
        props: {
            someProp: {
                type: [Number, String],
            }
        }
    }
</script>
```

Ngoài việc khai báo type, ta có thể khai báo thêm hai thứ nữa đó là `require` và `default`. Như sau:

```html
<script>
    export default {
        props: {
            someProp: {
                type: [Number, String],
                required: true,
                default: 0
            }
        }
    }
</script>
```
Ý nghĩa của nó lần lượt là:
- **required**: Có bắt buộc phải truyền prop này vào component hay không, mặc định không khai báo là false tương đương với không yêu cầu truyền vào.
- **default**: Giá trị mặc định nếu không truyền dữ liệu vào.

Ở đây bạn chỉ cần khai báo một trong hai mà thôi chứ không cần khai báo cả hai. Vì nếu component của bạn bắt buộc phải truyền vào dữ liệu rồi thì bạn sẽ không cần định nghĩa dữ liệu mặc định cho nó nữa còn trái lại nếu component của bạn không yêu cầu bắt buộc truyền dữ liệu đầu vào thì bạn nên định nghĩa dữ liệu mắc định cho nó tránh bị lỗi component.


### c. Kế thừa thuộc tính

Giả sử chúng ta có component như sau:

```html
// FancyImage.vue
<template>
    <div class="some-wrapper-class" id="image">
        <img :src="image.url" alt="image.alt" />
    </div>
</template>

<script>
    export default {
        props: {
            image: {
                type: Object,
                required: true,
            }
        }
    }
</script>
```

Và chúng ta đem đi sử dụng như sau:

```html
// Header.vue
<template>
    <div class="header-wrapper">
       <FancyImage :image="image" />
    </div>
</template>

<script>
    import FancyImage from './FancyImage.vue';

    export default {
        components: {
            FancyImage
        },
        data() {
            return {
                image: {
                    src: '/images/logo.png',
                    alt: 'logo'
                }
            }
        }
    }
</script>
```

Tiếp đó trong component `<Header />`, ta sẽ truyền thêm một vài thuộc tính khác vào `<FancyImage />` như sau:

```html
<template>
    <div class="header-wrapper">
       <FancyImage :image="image" data-test="test" class="extra-class" id="external-id" />
    </div>
</template>
```

Các props ta truyền vào lần lượt là `data-test`, `class` và `id` và đồng thời bên trong component test chúng ta sẽ không thay đổi code thì việc ta truyền thêm vào như trên hoàn toàn không làm component của chúng ta bị lỗi hay xuất hiện warning như mình nói ở trên. Tuy nhiên nếu bạn bật phần GoogleDevtool và xem đoạn code sau khi được chuyển về html sẽ thu được nội dung như sau:

```html
<div class="header-wrapper">
    <div id="external-id" class="some-wrapper-class extra-class" data-test="test">
        <img src="../../assets/logo.png"  alt="image.alt" />
    </div>
</div>
```

Bạn có thể thấy ở đây component `<FancyImage />` đã được chuyển thành:

```html
<div id="external-id" class="some-wrapper-class extra-class" data-test="test">
    <img src="../../assets/logo.png"  alt="image.alt" />
</div>
```
Thay vì đoạn code gốc mà chúng ta là:

```html
 <div class="some-wrapper-class" id="image">
    <img :src="image.url" alt="image.alt" />
</div>
```
Sở dĩ điều này xảy ra là vì đối với các prop mà chúng ta truyền vào component từ bên ngoài mà không khai báo cũng như không sử dụng đến nó bên trong component thì các prop này sẽ được tự động được truyền vào root của component đó hay nói dễ hiểu là truyền vào thẻ bao bọc toàn bộ phần nội dung html trong component của bạn. Với trường hợp này nó là thẻ `<div class="some-wrapper-class" id="image">`. Thêm nữa ở đây đã diễn ra 2 sự kiện là:

- Thay thế (Replacing): Ở thẻ `<div>` gốc của chúng ta bạn sẽ thấy ta có `id="image"` tuy nhiên do ta truyền thêm id khác từ bên ngoài là `external-id` nên nó đã ghi đè id gốc của chúng ta. Tương tự với phần `data-test="test"` vì không có khai báo trước nên nó cứ thế ghi vào thôi.
- Gộp (Replacing): Đối với class thì nó được chuyển thành gộp class gốc là `some-wrapper-class` với class truyền thêm vào là `extra-class` và kết quả thu được là `class="some-wrapper-class extra-class"`. Lưu ý việc gộp này chỉ duy nhất cho hai prop là **class** và **style**

Nếu bạn muốn ngăn chặn sự tự động thay thế/ gộp này (hay còn gọi là kế thừa) thì ta chỉ cần đơn giản thêm dòng này ` inheritAttrs: false` vào component của bạn:

```html
// FancyImage.vue
<template>
    <div class="some-wrapper-class" id="image">
        <img :src="image.url" alt="image.alt" />
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            image: {
                type: Object,
                required: true,
            }
        }
    }
</script>
```

Nó sẽ loại bỏ việc kế thừa như mình nói ở trên. Đồng thời nếu bạn vẫn muốn truy cập vào các prop kế thừa - không khai báo như nói trên thì ta có thể truy cập thông qua biến `$attrs`.

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, cám ơn các bạn đã đọc bài. Đừng quên để lại một upvote và clip để ủng hộ mình nhé :D.