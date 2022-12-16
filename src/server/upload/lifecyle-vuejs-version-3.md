![](https://images.viblo.asia/8d2482fa-98b2-4f45-85d2-da861890c6d9.png)

Nhìn chung vòng đời của một instance giữa Vue2 và Vue3 làm việc  giống nhau, chúng đều có quyền truy cập vào các hook và vẫn sử dụng chúng cho các trường hợp sử dụng giống nhau. 
Tuy nhiên để truy cập các hook này cần chú ý có một số số các function hook mà vue định nghĩa lại đồng nghĩa việc trong tương lai sẽ và sử dụng nó. Cùng tớ tìm hiểu nhé !!!
# Lifecycle hook là gì ?
Lifecycle hook là quá trình khởi tạo đến khi kết thúc một instance, tìm hiểu về sơ đồ thì có bốn sự kiện chính và mỗi sự kiện được tách thành hai 2 hook được gọi trước và sau sự kiện đó, tùy thuộc vào cách bạn sử dụng. Dưới đây là bốn sự kiện chính : 
* Creation - Được chạy khi component của bạn được khởi tạo
* Mount - Được chạy khi DOM được gắn kết
* Update - ĐƯợc gọi khi data được thay đổi
* destruction - Được gọi khi component không còn sử dụng.
# Những thay đổi giữa Vue 2 và Vue 3 của lifececyle hook
Dưới đây là những thay đổi từ Vue 2 sang Vue 3 mà tớ nghĩ rằng đó là một cách tốt nhất để biết chính xác các hook thay đổi như thế nào và sử dụng như thế nào.

Vue 3 có bản cập nhật khá là hay đó là ``Composition`` : là một tính năng hoàn toàn mới giúp vải thiện cách chúng ta phân hối code cùng xem tớ dùng compostion trong vòng đời Vue nhé.
* befoceCreate và created -> sử dụng setup()
* beforeMount -> có thể sử dụng onBeforeMount (Composition)
* mounted -> có thể sử dụng onMounted (Composition)
* update -> có thể sử dụng onUpdate(Compostion)
* beforeDestroy -> beforeUnmoute và onBeforeUnmoute
* destroyed ->unMouted và onUnMounted

Để tìm hiểu và cách sử dụng cả Vue2 và Vue3 thì cùng tớ đi sâu vào từng sự kiện của lifecycle hook để xem chúng là gì, như thế nào và sử dụng chúng ra làm sao.
Cùng tớ tìm hiểu nhé :v: .

## Creation Hook - Bắt đầu của vòng đời VueJS
Creation hooks là sự kiện đầu tiên chạy trong ứng dụng
### beforeCreate() và created()
#### beforeCreate ()
Vì hook này là thứ khởi tạo tất cả dữ liệu và sự kiện phản ứng của dữ liệu. nên beforCreate() không có quyền truy cập vào bất kì dữ liệu và sự kiện phản ứng nào của một thành phần.

```js
<script>
export default {
  name: "Lifecycle",
  data () {
    return {
      message: "hello"
    }
  },
  beforeCreate() {
    console.log(this.message);
  }
}
</script>
```
Ở ví dụ này output trả về là `undefined` vì dữ liệu chưa được khai báo và chưa được gán vào trong component chính vì thế bạn cũng không thể gọi được các methods trong phương thức này. Sử dụng hook này rất hữu ích khi cần một số loại lệnh xử lý logic/API không cần gán cho dữ liệu bởi vì khi gán dữ liệu sau hook này nó sẽ tự mất.

Ví dụ : khi gán `this.message = "xinchao"` nhưng sau khi hoàn thành message vẫn gán về giá trị mặc định. Nhưng nếu khởi tạo `this.message2 = "xin chao"` thì nó sẽ tạo dữ liệu message2 và có thể sự dụng như bình thường. 
#### Created()
Ở trong hook này tớ có thể truy cập được dữ liệu bình thường vì dữ liệu đã được khai báo và phản ứng nếu có sự thay đổi chúng ta cùng xem sự thay đổi nhé :
```js
export default {
  name: "Lifecycle",
  data () {
    return {
      message: "hello",
      create: '',
    }
  },
  beforeCreate() {
    this.message = "xin chao"
    this.message2 = "xin chao";
  },
  created() {
    console.log(this.message);
    console.log(this.message2);
    this.create = "xin chao"
  },
}
</script>
```

Để chứng minh cho ví dụ mà tớ đã nêu ở **beforeCreate()** thì tớ đã khai báo để cho dễ hiểu. Ở đây output sẽ trả về `hello` ứng với `this.message` và `xin chao` ứng với this.mesage2.

==> Sử dụng phương thức này rất hữu ích khi xử lý việc đọc/ghi dữ liệu.

Ví dụ : create mình chưa gán dữ liệu do chưa có dữ liệu từ api trả về thì ở đây mình sẽ gán dữ liệu cho nó.

**Sau khi tìm hiểu xong 2 phương thức beforeCreate và created thì tớ cũng có thắc mắc tại sao làm vậy ? tại sao không dùng chung ở 1 phương thức thôi mà lại chia ra? nó cũng là hợp nhất dữ liệu mà ...** 

Thì tớ nghĩ đây cũng là thắc mắc khá lớn của tớ và người bạn cùng học với tớ. Nhân đây bản cập nhật Vue3 đã thay đổi để giải quyết thắc mắc cùng xem tiếp nhé :v: .
### Setup()
Theo tớ nghĩ ở Vue đã giải quyết vấn đề nhưng chưa hoàn toàn mà tớ thắc mắc trên nhờ hook `setup` thay thế cho 2 phương thức ở Vue 2. có nghĩa là bất kỳ code của bạn ở 2 phương thức trên sẽ viết ở method này. Tìm hiểu nhé.

Ái chà trong docs setup() nó còn để riêng 1 page để giải thích cơ. Có vẻ dài nhưng chắc tớ cũng để hiểu qua thôi nếu rảnh tớ cũng làm 1 bài để tìm hiểu nó như thế nào :))).

Hiểu đơn giản `setup()` được thiết lập và chạy xung quanh creation hook thì không cần xác định chúng hay nói cách khác là các thiết lập bên trong hook đề được viết được trong `setup()`.
```js
import {ref} from "vue";
export default {
  name: "demo",
    props: {
      user: {
        type: String,
        required: true
      }
    },
  setup(props, context) {
     const val = ref("hello");
    console.log(props.user);
    console.log(context.attrs)

    // Slots (Non-reactive object)
    console.log(context.slots)

    // Emit Events (Method)
    console.log(context.emit)
    
    return {
           val
    }
  }
}
```
Khi sử dụng phương thức setup() nó cũng có hỗ trợ 2 tham số truyền vào là:
* Props:  ở trong này có thể làm cái gì tùy thích như phá hủy, thay đổi... tùy theo dự án để sử dụng.
* Context: đây sẽ là tham số thứ 2 trả về nó thể hiện 3 thuộc tính thành phần : attrs, slots, emit.
=> tớ cũng giới thiệu qua mọi người có thể đọc qua ở trang docs của Vue3 : https://v3.vuejs.org/guide/composition-api-setup.html#props
* Vòng đời có thể được đăng ký với chức năng onX được (beforeMount -> onBeforeMount).

Chúng ta cần sử dụng đối tượng **ref** để hợp nhất dữ liệu vào trong component và xử lý DOM trong ref cũng được @@.

Ở trong function bạn chỉ có hợp nhất dữ liệu vào component, không thể truy cập vào data vì nó sẽ báo lỗi.

**- this không được tham chiếu để hoạt động**

**- Đối với Vue3 nó chưa xóa bỏ hoàn toàn 2 function của vue2 mà chỉ có thay thế và khuyến cáo không nên sử dụng**

**- tớ sẽ sử dụng Compositon ở đây nhé**
## Mounting hooks - Truy cập DOM
Ở hook này là quá trình xảy ra ngay trước và sau khi component được khởi tạo, thông thường được sử dụng khi truy cập vào các phân tử DOM. 

Nhìn chung thì không có gì thay đổi ở đây cả ngoài Compotion ở đây.
### beforeMount() và onBeforeMount()
**beforeMount()**

Được gọi trước khi DOM được hiển thị và gán cho component, trong phần này truy cập đến các phần tử DOM vẫn sẽ báo lỗi.
```js
<template>
  <div class="container" ref='root'>
    <p>{{create}}</p>
    <p>{{count}}</p>
      <button v-on:click="count += 1">click</button>
  </div>
</template>

<script>
export default {
  name: "Lifecycle",
  data () {
    return {
      message: "hello",
      count : 1,
      create: ' ',
    }
  },
  beforeMount() {
    console.log(this.$el);
    console.log(document.getElementsByClassName('container').innerhtml);
  }
}
</script>

<style scoped>

</style>
```
Trong ví dụ này output sẽ hiển thị `undefined` vì nó chưa được render nhưng compoent đã được compile

**onBeforeMount()**

function này có thể được đăng ký trong `setup()` như mình đã nêu ở trên.
```js
<script>
import { ref, onBeforeMount } from 'vue'

export default {
  setup() {
    const root = ref(null)
    onBeforeMount(() => {
      console.log(root.value)
    })
    return {
      root
    }
  },
  beforeMount() {
    console.log(this.$el)
  }
  }
</script>
```
### mounted() và onMouted()
Được gọi sau khi component được hiển thị lần đầu tiên, ở đây các element đã được hiển thị và khai báo cho phép truy cập DOM.
Tớ sẽ ví dụ luôn cả onMounted và mouted trong Vue 3 luôn vì chúng không khác nhau là bao chỉ khác nhau cách khai báo và có thể sử dụng 1 trong 2 cách đều được.
```js
<template>
  <div class="container" ref="root">
      Hello
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const root = ref(null)
    onMounted(() => {
      console.log(root.value)
    })
    return {
      root
    }
  },
  mounted() {
    console.log(this.$el)
  }
  }
</script>

<style scoped>

</style>
```
## Update Hooks - Quá trình lắng nghe sự thay đổi của dữ liệu
Ở sự kiện mỗi dữ liệu được thay đổi nó sẽ kích hoạt cập nhật hiển thị. Vue 3 và Vue 2 vẫn giữ nguyên các phương thức
### beforeUpdate() và onBeforeUpdate()
Khi dữ liệu được thay đổi, trước khi component rendered lại ở đây sẽ là nơi tốt nhất để cập nhật DOM theo cách thủ công trước bất kỳ thay đổi xảy ra.

`BeforeUpdate` có thể được sử dụng để theo dỗi số lượng chỉnh sửa được thực hiện đối với một thành phần hoặc thậm chí theo dõi các hành động để tính năng hoàn tất
### updated và onUpdated
Ở đây phương thức updated sẽ được gọi khi DOM đã được cập nhật

**Ở đây sẽ là ví dụ để sử dụng `beforeUpdate` và `updated`**
tớ sử dụng luôn Vue3 cho mới.
```js
**<template>
  <div class="container" ref="root">
      <p>{{ val }} : editor {{ count }} times</p>
    <button @click="val = Math.random(0, 100)">Click to Change</button>
  </div>
</template>

<script>
import { ref, onUpdated, onBeforeUpdate } from 'vue'

export default {
  setup() {
    const count = ref(0);
    const val = ref(0);
    onBeforeUpdate(() => {
        count.value +=1;
        console.log(count.value);
    })
    onUpdated(() => {
      console.log(val.value);
    });
    return {
      count,
      val,
    }
  },
  }
</script>

<style scoped>
```
Đối với từng trường hợp xử dụng, chúng ta có thể muốn xem xét sử dụng trình theo dỗi để xem xét sử dụng để theo dõi phát hiện dữ liệu thay đổi này. Đây là hook để chúng ta theo dõi tất cả các giá trị và giá trị mới đã thay đổi.
## Destruction Hook - Hủy bỏ hoặc xóa khỏi DOM
Khi Component  bị hủy bỏ (không sử dụng ) thì trong sự kiện này là cách tốt nhất để xóa bỏ và clearning dữ liệu. Đây là lúc để loại bỏ sự kiện và quản lý bộ nhớ nếu nó không còn được sử dụng.

### beforeDestroy() và (beforeUnmount() onBeforeUnmouted() )
Ở đây trước khi Component được hủy bỏ, ở trong giai đoạn này tất cả các thành phần vẫn hoạt động bình thường và chưa bị phá hủy vì thế chúng được sử dụng để quản lý tài nguyên các thành phần.

**Vue 2**
Trong bản vue 2 vẫn giữ nguyên function beforeDestroy().
```js
export default {
  name: "Lifecycle",
  data () {
    return {
      message: "hello",
      count : 1,
      create: ' ',
    }
  },
  beforeDestroy() {
    console.log(this.message);
    this.message = null;
    delete this.message;
  }
}
```
Ở đây chúng ta vẫn có thể gọi được và xóa khỏi bộ nhớ.

**Vue 3**
cũng tương tự như vậy nhưng Vue 3 đã thay đổi tên hàm và cách sử dụng cho hợp lý :v.
```js
  setup() {
    const root = ref(null)
    const count = ref(0);
    const val = ref(0);
    onBeforeUnmount(() => {
        root.value = null;
        delete count.value
    });
    return {
      root, count,val
    }
  },
  beforeUnmount() {
    console.log(this.count)
    this.count == null;
    delete this.count
  }
}
```
### Destroyed và (unMouted() , onUnmouted() )
Ở thời điểm này hầu hết các thành phần đã bị phá hủy. Nên không làm được gì nhiều và đây là giai đoạn cuối cùng của vòng đời.

**Vue 2**
```js
export default {
  name: "Lifecycle",
  data () {
    return {
      message: "hello",
      count : 1,
      create: ' ',
    }
  },
  methods : {
    test() {
      console.log('test');
    }
  },
  beforeDestroy() {
    this.message = null;
    delete this.message
    delete this
  },
  destroyed() {
    this.$destroy()
    console.log(this.message);
  }
}
```
**Vue 3**
```js
      setup() {
    const root = ref(null)
    const count = ref(0);
    const val = ref(0);
    onBeforeUnmount(() => {
        root.value = null;
        delete count.value
    });
    onMounted(() => {
        console.log(count.value)
    });
    return {
      root, count,val
    }
  },
  beforeUnmount() {
    this.count.value == null;
    delete this.count.value
  },
  unmounted() {
    console.log(this.count.value);
  }
}
```
**Theo cá nhân của tớ thì destroyed cũng giống `beforedestro`y chỉ khác là `beforedestroy` chạy trước, nếu không có beforeDestroy thì destroyed thay thế chúng và vẫn sử dụng bình thường. nếu ý kiến này sai mọi người góp ý để tớ hiểu sâu về nó nhé :3**
# Tóm lại
Theo những gì tớ tìm hiểu thì Vue 3 đã cập nhật và cải tiến khá nhiều thay thế cho những bất cập của Vue2 đặc biệt có Compotion giúp chúng ta có thể cải tiến và cải thiện code.
Trong bài viết này tớ giới thiệu những thay đổi hy vọng bài viết sơ sài này giúp chúng ta có thể hiểu sâu về vòng đời và ý nghĩa từng sự kiện.

**Tham khảo.**

- https://learnvue.co/2020/12/how-to-use-lifecycle-hooks-in-vue3/
- https://dzone.com/articles/vuejs-series-lifecycle-hooks
- https://v3.vuejs.org/api/options-lifecycle-hooks.html
- https://jungtin.me/vuecore-tim-hieu-composition-vue-3/#ib-toc-anchor-11