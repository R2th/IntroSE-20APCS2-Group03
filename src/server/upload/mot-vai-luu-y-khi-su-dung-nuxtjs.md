#### Mở đầu
Xin chào tất cả mọi người, hôm này mình sẽ chia sẻ một số lưu ý khi sử dụng Nuxt.js. Một framework xây dựng ứng dựng Vue.js.
Để hiểu rõ hơn về Nuxt.js, bạn có thể xem thêm tại [**đây**](https://nuxtjs.org/).
Mình xin được bắt đầu luôn nhé. 
#### Nội dung
##### 1. Sử dụng phương thức asyncData không đúng.
Khi mới bắt đầu tiếp xúc với Nuxt.js, mình có biết đến method asyncData này, nó thật sự rất hữu dụng. Và đương nhiên, mình sử dụng nó bất cứ khi nào. Rồi 1 hôm nào đó, như bao hôm nào, bỗng dưng phát hiện một lỗi mà không có bugs =))<br>Đó là khi mình sử dụng methods này trong component con của một page. Ví dụ:
```js
import { getTotalScore } from '~/api/profile';

export default {

async asyncData() {
    await getTotalScore();
},
```

Khi bạn load page có chưa component con này, bạn mở network ( F12->network ) lên sẽ thấy request này chạy và trả về kết quả như bình thường. Tuy nhiên bạn lại không thể sử dụng. Đầu tiên khi mình bắt đầu tìm hiểu, do chưa đọc document kĩ, nên cũng không hiểu. May có một người bạn của mình đã chỉ lại và giải thích chi tiết cho mình. Còn đây là trang chủ của Nuxt.js có ghi lại:
>> asyncData is called every time before loading the **page** component
<br>

Một bài học khi bắt đầu tìm hiểu vội vàng một thứ gì mới =))
#### 2. Method nuxtServerInit không hoạt động
Haizz, cũng là một lỗi mà mình đã rất mất công để tự tìm hiểu, cuối cùng cũng được anh ngồi cạnh chỉ cho nốt =))<br>

Đầu tiên, các bạn check lại xem file `nuxt.config.js`, xem có phải trong file đó có `mode: 'spa'` . Cái này có thể do lúc cài đặt các bạn cứ next nhiều lần nên nó bị mà các bạn không để ý.  Mình có tìm hiểu được thì nếu khi bạn để `'mode: spa'` thì nghĩa là **ssr** (Server Side Rendering) đã bị tắt, và bạn không thể sử dụng method `nuxtServerInit` được. Giải pháp là bạn viết một plugins `nuxt-client-init.js` như sau.<br>
Tại folder plugins:
```js
// file nuxt-client-init.js 
export default async (ctx) => {
    await ctx.store.dispatch('nuxtClientInit', ctx);
};
```
rồi import vào `nuxt.config.js`:
```js
plugins: [
    '~/plugins/nuxt-client-init',
],
```
Xong bạn ra ngoài check lại tại store nhé. Chắc là được đó. :D 
#### 3. Không sử dụng props.sync
Được support tại `Vue 2.3+`, `.sync` sẽ làm cho code của bạn được rút ngắn hơn khi sử dụng nó trong việc cập nhật dữ liệu cho `props`.

Ví dụ, khi không sử dụng **props.sync**:
```js
<template>
    <child :text="text" @update=update/>
    
    data: {
        return {
            text: 'text'
        }
    },
    
    methods: {
        update(value) {
                console.log(value)
            this.text = value
        }
    }
</template>

//child
<template>
    <div>
        <input :value="text" @input="handleChange" />
    </div>
    
    methods: {
        handleChange(event)
        {
            this.$emit('update', event.target.value)
        }
    }
</template>

```
Sử dụng **props.sync**: 
```js
<template>
    <child :text.sync="text" />
    
    data: {
        return {
            text: 'text'
        }
    }
</template>

//child
<template>
    <div>
        <input :value="text" @input="$emit('update:text', $event.target.value)"/>
    </div>
</template>
```

Ngắn hơn nhiều phải không nào. Hehe
#### 4. Get value trong child template
Cái này nghe có vẻ khó hiểu nè =]], mình cũng k biết giải thích như nào. Ví dụ như mình đang sử dụng package `element-ui` để làm giao diện. Và có đoạn mình muốn xử lý như sau:
```js
<template>
    <div>
        ....
        <ElTable
            :data="data"
        >
            <template>
               <input :value="?">
            </template>
        </ElTable>
    </div>
</template>
```
Mình muốn lấy dữ liệu trong cái đống **data** kia truyền vào `template` con thì làm như nào. Chúng ta sẽ thêm như sau:
```js
<template slot-scope="{ row }">
    ...
</template>
```
Phần này có thể chưa gặp nhiều nhưng nếu gặp thì hi vọng phần này có thể giúp đỡ bạn.
#### 5. Custom Directive
Mình có một component hay dùng trong dự án, và mình muốn dùng nó như một component có sẵn thay vì phải import. <br>
Bạn chỉ cần đăng kí chúng trong plugins:
```js
Vue.component('your-component', Component)
```

sau đó bạn import chúng vào nuxt.config.js. Cuối cùng là bỏ import file đó đi. Sử dụng thẳng luôn như dưới:
```js
<your-component />
```
Tương tự như vậy, bạn cũng có thể làm tương tự với các directive khác như `Vue.filter`, `Vue.mixin`. <br>
#### Lời kết
Trên đây là một số lưu ý khá quan trọng mà mình đã rút ra khi làm việc với Nuxt.js. <br>
Qua bài viết này, nếu các bạn sử dụng Nuxt.js, hãy lưu ý những điều này nhé. <br>
Bài viết của mình đến đây xin dừng lại, nếu có thắc mắc gì các bạn cứ comment lại nhé. Mình xin cảm ơn mọi người đã đọc bài. Tạm biệt!