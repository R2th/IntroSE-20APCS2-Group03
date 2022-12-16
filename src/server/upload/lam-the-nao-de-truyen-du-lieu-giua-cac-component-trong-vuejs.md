### 1. Mở đầu
Khai làm việc với VueJS, chắc chắn chúng ta sẽ làm việc với component và cũng bởi vì vậy lên việc chúng ta biết cách giao tiếp giữa các component với nhau là hết sức cần thiết. Cũng như Angular hay React thì VueJS cũng có cáp implement riêng của nó, theo như mình thấy thì nó rất dễ hiểu và áp dụng. Chúng ta sẽ cùng xem chi tiết hơn ở phần sau nhé.

### 2. Chi tiết
Chúng ta có 4 cách để truyền data giữa các component trong VueJS, đó là: Truyền data từ cha xuống con qua Props, truyền từ con lên cha thông qua Emit event, truyền giữa các component không có quan hệ thông qua Event bus và cách cuối cùng là thông qua Store của VueX (Giống như store trong Redux vậy).

Truyền từ cha xuống con thông qua Props:
Các bạn hãy cùng xem ví dụ bên dưới chúng ta sẽ có một component cha, đóng vai trò là bao một component con.

```
<template>
  <div id="app">
    <ComponentFirst msg="Welcome to Your Vue.js App"/>
    //OR <ComponentFirst :msg="Welcome to Your Vue.js App">
    //OR <ComponentFirst v-bind:msg="Welcome to Your Vue.js App"></ComponentFirst>
  </div>
</template>

<script>
import ComponentFirst from './components/componentFirst';

export default {
  name: 'App',
  components: {
    ComponentFirst
  }
}
</script>
```

Khi này chúng ta sẽ truyền msg xuống cho thằng con nó, đây là phần props mà bạn muốn đặt tên như thế nào cũng được. Nó có thể truyền các loại data xuống thằng con nó và khi nào data của cha thay đổi thì thằng con nó cũng được tự động cập nhật lại.

```
<template>
    <div>{{msg}}</div>
</template>

<script>
export default {
    name: "Component first",
    props: {
        msg: String
    }
};
</script>
```

Trên đây là đoạn code của thằng con nhận được data tử cha nó truyền cho, các bạn lưu ý là props chỉ được truyền một chiều từ con xuống cha – không có chiều ngược lại. Vì thằng cha có thể cũng truyền data này cho nhiều thằng con nữa, mà một thằng con lại có quyền thay đổi data của cha thì không được. Đây chính là tính toàn vẹn, cũng như ReactJS bạn cũng có thể truyền data 1 chiều xuống thôi, không thể trực tiếp thay đổi data.

Khi so sánh với với Angular 2+ thì VueJS và React có vẻ dễ truyền props hơn, vì không cần khai báo thêm gì nhiều. @@

Truyền data từ con lên cha:
Đầu tiên chúng ta hãy cùng quan sát code của cha nó, ở phần này hãy chú ý đến cách mà nó nhận event nhé các bạn.

```
<template>
    <div id="app">
        <ComponentFirst @inputData="updateMessage"/>
        <h3>{{message}}</h3>
    </div>
</template>

<script>
import ComponentFirst from './components/componentFirst';

export default {
    name: 'App',
    components: {
        ComponentFirst
    },
    data() {
        return {
            message: 'Message default.'
        }
    },
    methods: {
        updateMessage(mes) {
            this.message = mes;
        }
    }
}
</script>
```

Ở Component cha chúng ta sẽ cần @inputData để match với key mà ở component con chúng ta emit lên. Và cần gắn một methods ở cha để có thể lắng nghe khi mà con Emit một sự kiện lên. Khi emit lên có thể truyền thêm data hoặc không cần truyền lên cũng được. Tương tự thì thằng cha cần tham số hoặc không có cũng được.

```
<template>
    <div>
        <input
            placeholder="Enter Text Here"
            v-model="tempMessage"
        />
        <div>
            <button @click="sendMessage">@Emit event</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "ComponentFirst",
    data() {
        return {
            tempMessage: ''
        }
    },
    methods: {
        sendMessage() {
            this.$emit('inputData', this.tempMessage);
            this.tempMessage = '';
        }
    }
};
</script>
```

Như các bạn có thể thấy rõ ở Component con chúng ta sẽ emit data như thế nào.

Ở phần này thì Anular lại tỏ ra mình cần cả @Output và Emit trong khi React thì lại không cần khai báo emit thêm. Còn VueJS lại cũng cần emit nhưng ít nhất, mình thấy nó gọn hơn Angular @@. Nói chung là mình đã code qua cả React, Angular và VueJS thì thấy VueJS và ReactJS dễ code hơn Angular. Angular chắc nó chỉ dàng cho dự án siêu to khổng lồ thôi. @@

Truyền data giữa các component với Event bus:
Đầu tiên các bạn cần biết là Event bus nó như một cái service bên ngoài để lưu tạm data vậy. Nó sẽ lưu ở đó và sẽ có 1 thằng cũng sẽ chọc vào chính chỗ đó để lắng nghe sự thay đổi. Nếu có sự thay đổi nó sẽ handle sự kiện. Đó là nói đến bản chất, còn khi thực sự Implement thì với mỗi Framework nó lại có cách triển khai khác nhau.

Đoạn code bên dưới là code ở root, nơi mà các bạn đặt hai component.

```
<template>
    <div id="app">
        <ComponentFirst />
        <hr />
        <ComponentSecond />
    </div>
</template>

<script>
import ComponentFirst from './components/component-first';
import ComponentSecond from './components/component-second';

export default {
    name: 'App',
    components: {
        ComponentFirst,
        ComponentSecond
    },
    data() {
        return {
            message: 'Message default.'
        }
    }
}
</script>
```

Các bạn phải nhớ điều kiện để các bạn có thể truyền data giữa 2 component chính là 2 component phải đang cùng sống (tồn tại). Nếu như một thằng sống và một thằng đã bị destroy thì tất nhiên là các bạn không thể truyền data được rồi. ^^

Code bên dưới chính là service Event bus trung chuyển của chúng ta. Nhìn nó khá đơn giản, nó chỉ là 1 instance của Vue thôi ^^.

```
import Vue from 'vue';

const EventBus = new Vue();

export default EventBus;
```

Đoạn code bên dưới chính là ComponentFirst nơi mà bạn bắt đầu truyền data đến Service event bus.

```
<template>
    <div>
        <input
            placeholder="Enter Text Here"
            v-model="tempMessage"
        />
        <div>
            <button @click="sendMessage">Emit data</button>
        </div>
    </div>
</template>

<script>
import EventBus from './../event-bus';

export default {
    name: "ComponentFirst",
    data() {
        return {
            tempMessage: ''
        }
    },
    methods: {
        sendMessage() {
            EventBus.$emit('inputData', this.tempMessage);
            this.tempMessage = '';
        }
    }
};
</script>
```

Ở đoạn code này các bạn hãy chú ý đến tên khi $emit nhé, nó tất nhiên là phải trùng với khi ta nhân event rồi.

Tiếp theo là code bên nhận data từ Event bus. Chúng ta phải thông qua mounted() để lắng nghe khi mà data được emit.

```
<template>
    <div>Component B: {{msg}}</div>
</template>

<script>
import EventBus from './../event-bus';

export default {
    name: "ComponentSecond",
    data() {
        return {
            msg: ''
        }
    },
    mounted() {
        EventBus.$on('inputData' ,payLoad => {
            this.msg = payLoad;
        });
    }
};
</script>
```

Truyền data giữa các component thông qua VueX:
VueX các bạn có thể hiểu nó như Redux với React hoặc như NgRX với Angular 2+, bản chất của nó cũng là Store để lưu data và sẽ có chỗ dùng thì lắng nghe – nhận lại data. Nhưng nó là tổng quát hơn và powerful hơn cách dùng service rất nhiều. @@

Cũng như khi ta dùng Event Bus thì các bạn phải chắc rằng cả 2 component của chúng ta đều đang được tồn tại nhé.

Với VueX các bạn hãy hiểu nó như là 1 Stage nơi mà Store tất cả nhưng data là Singleton (Data ít thay đổi) hoặc dùng để gắn acction (event) từ đó truyền data cho các phần khác trong app.

Đầu tiên các bạn cài nó vào app của mình nhé ở đây mình dùng yarn, các bạn không thích có thể dùng npm nhé: `yarn add vuex` or ` npm install vuex` .

Tiếp đó chúng ta hãy tạo một folder store và viết store của chúng ta nhé.

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        message: ''
    },
    getters: {
        MESSAGE: state => {
            return state.message;
        }
    },
    mutations: {
        SET_MESSAGE: (state, payload) => {
            state.message = payload;
        }
    },
    actions: {}
});
```

Như các bạn đã thấy thì mình vừa tạo ra một Store nơi mà chúng ta sẽ dùng cho toàn app. Sau khi tạp thì ta cũng lên config nó tiếp trong main.js để Vue nhận được nó nhé.

```
import Vue from 'vue';
import App from './App.vue';

import store from './store';

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
```

Ở phần dưới đây là code bên Component nguồn ở đây chúng ta sẽ commit một data đến cho Store và nó sẽ Set data này vào stage.

```
<template>
    <div>
        <div>Component first</div>
        <input
            placeholder="Enter Text Here"
            v-model="tempMessage"
        />
        <div>
            <button @click="sendMessage">Emit data</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "ComponentFirst",
    data() {
        return {
            tempMessage: ''
        }
    },
    methods: {
        sendMessage() {
            this.$store.commit("SET_MESSAGE", this.tempMessage);
            this.tempMessage = '';
        }
    }
};
</script>
```

Tiếp đó ở component Đích chúng ta sẽ dùng Compoted để lắng nghe nếu như data này thay đổi thì nó sẽ render lại ra view.

```
<template>
    <div>
        <div>Component second: {{msg}}</div>
    </div>
</template>

<script>

export default {
    name: "ComponentSecond",
    computed: {
        msg() {
            return this.$store.getters.MESSAGE;
        }
    }
};
</script>
```

### 3. Kết luận
Như vậy, các bạn đã thấy là có 4 cách để giao tiếp giữa các Component trong Vue. Tùy vào từng trường hợp cụ thể mà ta có thể quyết định xem mình lên dùng cách nào. Nhưng nếu dự án có VueX thì các bạn lên dùng triệt để nó nhé vì theo như bản thân mình thấy thì đây là một các rất hay để quản lí data trong VueJS.

VueX là một phần rất to mà mình sẽ viết ở phần sau nhé các bạn, mong các bạn hãy chú ý theo dõi nhé.

3s quảng cáo. Mình mới viết blogs từ đầu tháng 3, nên còn nhiều thiếu xót mong các bạn bỏ quá cho nhé https://chamdev.com/lam-the-nao-de-truyen-du-lieu-giua-cac-thanh-phan-trong-vuejs/ .

### 4. Tham khảo
[Sharing Data Between Components in Vue.js](https://dev.to/alexmourer/sharing-data-between-components-invuejs-48me)

[How to share data between components in VueJS](https://stackoverflow.com/questions/40224345/how-to-share-data-between-components-in-vuejs)

[Passing Data Between Vue Components](https://dev-notes.eu/2018/05/passing-data-between-vue-components/)

[A simple EventBus to communicate between Vue.js components](https://medium.com/@andrejsabrickis/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860)