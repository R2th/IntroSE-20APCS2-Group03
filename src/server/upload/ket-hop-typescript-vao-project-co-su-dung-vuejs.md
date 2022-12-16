### Typescript là gì ?
TypeScript là một ngôn ngữ mã nguồn mở miễn phí hiện đang được phát triển và bảo trì bởi Microsoft (theo wikipedia). Người ta thường biết đến typescript và sử dụng nó trong các ngôn ngữ như C sharp, Angular hay Node.js. **Vì TypeScript là tập cha của JavaScript nên bất kì chương trình JavaScript nào đã có cũng đều là chương trình TypeScript hợp lệ**.
Chính vì vậy chúng ta hoàn toàn có thể áp dụng **TypeScript** vào project **vuejs**.
### Vì sao lại sử dụng TypeScript?
- Vấn đề về dự án: Việc phát triển các dự án có dễ dàng hay không cũng phụ thuộc khá nhiều vào bản thân người lập trình, nó phần lớn cũng phụ thuộc vào yếu tố khách quan nữa. Tuy nhiên, theo quan điểm của mình thì áp dụng được kỹ thuật mới và đặc biệt kỹ thuật lập trình hướng đối tượng như TypeScript làm việc phát triển các dự án lớn được dễ dàng, và việc code cũng hợp lý đúng không nào :<.
- Việc áp dụng TypeSCript có hỗ trợ nhiều Framework dễ dàng cho việc lựa chọn: Ví dụ như AngularJS 2.0
- Hỗ trợ các tính năng của Javascript phiên bản mới nhất: Hiện tại nó cũng hỗ trợ đến version mới của javascript là ECMAScript 2015 (ES6).
- Bên cạnh việc không bị tính phí, TypeScript dần trở nên phổ biến và được khá nhiều người dùng sử dụng. Chính vì vậy cộng đồng phát triển TypeScript ngày càng lớn, đã được hỗ trợ dễ dàng hơn.
- TypeScript là Javascript: Bản chất của TypeScript là biên dịch tạo ra các đoạn mã javascript nên bạn có thế chạy bất kì ở đâu miễn ở đó có hỗ trợ biên dịch Javascript. Ngoài ra bạn có thể sử dụng trộn lẫn cú pháp của Javascript vào bên trong TypeScript, điều này giúp các lập trình viên tiếp cận TypeScript dễ dàng hơn.
### Kết hợp TypeScript vào Vuejs
### Cài đặt vuejs
```bash
vue init webpack-simple vue-typescript
```
Sau khi chạy xong command sẽ tạo ra project có cấu trúc cơ bản như thế này:
```bash
+ |- dist
+   |- bundle.js
+ |- /src
+   |- index.js
+   |- hello.js
+ |- index.html
+ |- package.json
+ |- webpack.config.js
```
Bạn có thể tham khảo: https://viblo.asia/p/ban-biet-gi-ve-webpack-WAyK81wWZxX để hiểu thêm về cách tạo và chạy webpack. Sau đó cùng tiếp tục nhé ;D

Tuy nhiên để áp dụng TypeScript thì chúng ta cần phải config 1 chút nữa thôi nhé =)).
### Tạo file tsconfig.json
```bash
{
    "compilerOptions": {
        "outDir": "./built/",
        "sourceMap": true,
        "strict": true,
        "module": "es2015",
        "moduleResolution": "node",
        "target": "es5",
        "experimentalDecorators": true
    },
    "include": [
        "./src/**/*"
    ]
}
```
Thêm một chút trong trong *extensions* tại file webpack.config.js để có thể build được file .ts ra file .js
```bash
resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
```
### Cài đặt TypeScript dependencies
Cài đặt đặt ts-loader 
```bash
npm install typescript ts-loader --save-dev
```
Tiếp tục cài đặt vào project *vue-class-component* và *vue-property-decorator*.  Bắt buộc phải cài hai package này vì nó sẽ tạo Component, Prop,... để viết TypeScipt trong vuejs nên không thể không cài nhé :D
```bash
npm install vue-class-component vue-property-decorator --save-dev
```

Chúng ta cùng làm 1 ví dụ và so sánh khi chỉ sử dung vuejs và áp dụng TypeScript vào vuejs nhé:
Dưới đây là file Hello.vue và hoàn toàn sử dụng vuejs như bình thường.
```javascript
<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
```
 Tại màn hình có hai nút + và - . Khi bấm + sẽ thêm 1 dấu ! và - sẽ giảm đi 1 dấu !, đơn giản chỉ vậy thôi =)). Như bạn có thể thấy với cách sử dụng vuejs. Thẻ script có lang là javascript. Ta vẫn dùng  Props, data, methods và computed. prop viết trong props, state thì viết trong data, các actions thì tạo trong methods,...
 Tuy nhiên khi áp dụng TypeScript thì cách viết thay đổi một chút.
```javascript
<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    props: ['name', 'initialEnthusiasm'],
    data() {
        return {
            enthusiasm: this.initialEnthusiasm,
        }
    },
    methods: {
        increment() { this.enthusiasm++; },
        decrement() {
            if (this.enthusiasm > 1) {
                this.enthusiasm--;
            }
        },
    },
    computed: {
        exclamationMarks(): string {
            return Array(this.enthusiasm + 1).join('!');
        }
    }
});
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>

```
   Thẻ script viết TypeScript với lang="ts".  Và như mình đã nó ở trên, bạn phải import { Vue, Component, Prop } từ package ta vừa cài đặt ở trên là vue-property-decorator. Tuy nhiên bạn có thể viết riêng ra file .ts rồi import vào cũng được nhé ;D
```typescript
<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class HelloDecorator extends Vue {
    @Prop() name!: string;
    @Prop() initialEnthusiasm!: number;

    enthusiasm = this.initialEnthusiasm;

    increment() {
        this.enthusiasm++;
    }
    decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }

    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}
</script>

<style>
.greeting {
    font-size: 20px;
}
</style>
```
Import tất cả các component của vuejs muốn hiện thị tại file index.js. Bạn hãy yên tâm vì tại sao ở đây lại là file .ts. Sau khi build thì tất cả các file sẽ được webpack build vào 1 file .js.
```typescript
import Vue from "vue";
import HelloComponent from "./components/Hello.vue";
import HelloDecoratorComponent from "./components/HelloDecorator.vue";

let v = new Vue({
    el: "#app",
    template: `
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
        <h1>Hello Decorator Component</h1>
        <hello-decorator-component :name="name" :initialEnthusiasm="5" />
        </div>
    `,
    data: { name: "World" },
    components: {
        HelloComponent,
        HelloDecoratorComponent
    }
});
```
Cuối cùng bạn chỉ việc import file .js đã được buil và kiểm tra =))
```html
<!doctype html>
<html>
<body>
    <div id="app"></div>
</body>
<script src="./dist/build.js"></script>
</html>
```
### Cuối cùng có nên sử dụng TypeScript không?
Việc áp dụng *TypeScript* vào *Vuejs* cũng khá đơn giản đúng không nào. Ban đầu, các bạn sẽ thấy việc áp dụng này khiến chúng ta phải code phức tạp hơn, code nhiều file hơn, hay thậm chí là dài hơn chẳng hạn. Tuy nhiên, với những lợi ích mà nó mang lại thì không thể phủ nhận được. Nếu bạn là một người yêu thích tìm hiểu cái mới và không ngại thử thách, hãy thử áp dụng ngay nhé. Thú vị lắm đấy ;)
### Tham khảo:
- Viblo: https://viblo.asia/p/ban-biet-gi-ve-webpack-WAyK81wWZxX
- Wikipedia:https://vi.wikipedia.org/wiki/Typescript