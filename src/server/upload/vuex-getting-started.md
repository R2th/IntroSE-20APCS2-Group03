Hà Nội, những ngày chớm đầu hè mà đã thấy nong nóng @@. Cũng theo như dự báo thì năm 2020 này mùa hè sẽ nóng hơn cả hè năm 2019 @@.

### 1. Mở đầu
Theo như trang chủ VueX giới thiệu, thì nó là state management pattern + library.

Và theo như mình hiểu thì nó giống như Ngrx với Angular 2+, Redux với ReactJS. Nó đều được sinh ra để quản lí các data là Singleton (Ít biến đổi trong app), hoặc để truyền sự kiện hay cũng có thể hiểu là để quản lí state và share data cho nhau giữa các Component.

Vì là tư tưởng là giống nhau nên bạn nào đã kinh qua Ngrx hoặc Redux rồi thì sẽ học VueX rất nhanh thôi, như mình thì nhận xét Ngrx khá khó dùng @@, Redux dễ hiểu hơn – dễ implement hơn.

### 2. Chi tiết
Trong phần này mình sẽ giới thiệu tổng quát các thành phần xung quanh sơ đồ này nhé.

Như các bạn có thể thấy ở đây chúng ta có một số Core concepts cần ghi nhớ đó là: State, Store, Getters, Actions, Mutations. Ở phần dưới chúng ta sẽ đi qua từ cái một và mình sẽ giới thiệu tổng quát đến cho các bạn nhé.

Trước khi vào chi tiết từng phần thì các bạn cần hiểu là khi dùng VueX thì các phần data là singleton sẽ được ưu tiên lưu vào store. Và khi đã lưu vào đây rồi, nếu muốn thay đổi các state này các bạn không được change trực tiếp mà bắt buộc phải change nó qua một action đến một mutations nào đó, ở đây mutations mới có thể change state của chúng ta nhé.

### State
Ở đây các bạn cần hiểu state là nơi lưu giữ data trong từng component. Đối với Angular 2+ nó là các thuộc tính của class (component), đối với React thì nó rõ ràng là các phần trong this.state (Đối với loại Class component) và useState (Đối với function component). Còn riêng đối với VueJS thì nó là các phần trong data nhé các bạn.

Và khi mà chúng ta add VueX vào Vue thì các bạn hiểu đơn giản là nó không cục bộ ở từng Component nữa mà nó sẽ được share cho các component, service khác trong hệ thống.

Vậy có bạn lại hỏi: Ơ thế cái gì cũng cho vào State của Redux à, liệu có nhiều quá không? Câu trả lời là không phải tất cả đều cho vào đó nhé các bạn. @@ cho vào nhiều vậy có mà chết à ^^. Chú ý là chỉ lên gắn những phần là singleton thôi nhé. Ở đây ta sẽ cần hiểu singleton nghĩa là ít thay đổi, hoặc không thay đổi trong suốt vòng đời của app nhé.

### Store
Store là phần quản lí State, nó sẽ có các phương thức cho phép bạn có thể thay đổi state một cách gian tiếp thông qua dispatch (Nghe giống React quá) hoặc một commit. Store là duy nhất bên trong một app, nó sẽ được khởi tạo cùng với root.

### Getters
Ở đây các bạn có thể hiểu nó kiểu là một computed dùng để tính toán data, xử lí một cái logic chung nào đó mà nhiều component dùng. Hàm viết ở đây chỉ có thể dùng để lấy data ra chứ không thể modify (Liên hệ một chút là nó giống như Getter trong OOP vậy – thể hiện tính bao đóng).

### Actions
Trong Action sẽ thường chứa logic liên quan đến business và các bạn nên hiểu là nó không trực tiếp thay đổi state. Nếu muốn thay đổi State thì các bạn cần dùng một Commit đã được định nghĩa tại Mutations. Lí do là bởi vì Actions thường được chạy bất đồng bộ (Code của bạn nó vẫn chạy khi mà actions chưa hoàn thành) và như vậy khi nó finished thì chúng ta mới lên Commit để change data.

### Mutations
Các hàm trong Mutations thường sẽ không nên chứa logic hay business gì, nó chỉ nên có một việc là update state. Các bạn nên hiểu là nó chạy đồng bộ và nên biết là một hàm bên trong một Mutations được gọi là một Commit.

Ok, nói vậy tạm đủ rồi – các phần trên đó là các phần Core rồi nhé. Bây giờ chúng ta sẽ làm một cái ví dụ nhỏ nhỏ để hiểu thêm nhé các bạn.

Đầu tiên thì các bạn sẽ cần tạo một Vue app và cái VueX, bằng cách chạy lệnh sau: (Nếu các bạn chưa biết sao lại có lệnh vue thì các bạn hãy search Vue cli)
+ `vue create demo-vuex`
+ `yarn add vuex` or `npm install vuex`

Khi các bạn đã xong rồi thì chúng ta sẽ cùng làm nhé. Đầu tiên chúng ta sẽ tạo ra một folder store và viết một file index.js nhé.

```
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: 'Chamdev.com',
        age: 10
    },

    getters: {
        // Here we will create getter
    },

    mutations: {
        // Here we will create commit
    },

    actions: {
        // Here we will create action
    }
});
```

Để sử dụng được file này chúng ta sẽ cần import và inject nó vào bên trong đối tượng Vue root nhé các bạn. Các bạn chỉnh file main.js thành như sau:

```
import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
Tiếp theo chúng ta sẽ cho hiện state trong store ra để xem thử nhé các bạn ^^, hãy cùng tạo ra một component và import nó vào bên trong App component root nhé.

<template>
    <div>
        <h1>Info</h1>
        <h2>{{username}}</h2>
        <h2>{{age}}</h2>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "Info",
    computed: {
        ...mapState(['username', 'age']),
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

Ở đây mình đang dùng mapState vì mình đang dùng nhiều hơn 1 state trong store, nếu các bạn dùng một cái thôi thì lên chuyển thành như thế này nhé.

```
<template>
    <div>
        <h1>Info</h1>
        <h2>{{username}}</h2>
        <h2>{{age}}</h2>
    </div>
</template>

<script>
export default {
    name: "Info",
    computed: {
        username() {
            return this.$store.state.username;
        },
        age() {
            return this.$store.state.age;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

Hãy so sánh 2 cách trên và cảm nhận (feeling ^^), cách nào đơn giản hơn, câu trả lời là tùy nhé: nếu không muốn viết thêm logic thì dùng cách đầu, còn nếu muốn viết thêm logic để hiện thì các bạn vẫn phải viết tường minh nó ra rồi chèn logic vào nhé.

Tiếp theo, chúng ta sẽ cùng update tiếp store/index.js nhé để xem tiếp actions và mutations nó hoạt động như thế nào ^^.

Chúng ta hãy cùng change file store/index.js nhé, ở đây các bạn hãy chú ý phần actions và mutations nhé.

```
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: 'Chamdev.com',
        age: 10
    },

    getters: {
        // Here we will create getter
    },

    mutations: {
        changeUsername(state, newUsername) {
            state.username = newUsername;
        }
    },

    actions: {
        handleChangeUsername(context, newUsername) {
            context.commit('changeUsername', newUsername);
        }
    }
});
```

Tiếp theo chúng ta sẽ change tiếp phần component của chúng ta nào.

```
<template>
    <div>
        <h1>Info</h1>
        <h2>{{username}}</h2>
        <br />
        <div>
            <input v-model="usernameInput"/>
            <button @click="changeUsername">Change username</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    data() {
        return {
            usernameInput: ''
        }
    },
    computed: {
        username() {
            return this.$store.state.username;
        }
    },
    methods: {
        changeUsername() {
            this.$store.dispatch('handleChangeUsername', this.usernameInput);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

Ở đây nếu như các bạn làm thành công thì khi mà change usernameInput thì và click button [Change username] thì phần username của chúng ta sẽ được update nhé. Còn nếu gặp lỗi gì thì hãy đừng ngần ngại mà comment hỏi nhé.

Tiếp theo chúng ta sẽ xem tiếp getter nó chạy như thế nào nhé. Như phần trên mình đã giới thiệu thì đây là phần mà các logic xử lí, để có thể lấy ra state mà đã được tính toán. Các bạn lên viết getter nếu như nhiều component dùng lại hàm này nhé, còn không thì lấy state ra rồi tính lại ở từng component thôi.

Chúng ta sửa lại store/index.js thành như sau nhé:

```
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: 'Chamdev.com',
        age: 10
    },

    getters: {
        getUsername: state => {
            return "Username: " + state.username;
        },
        getAge: state => {
            return state.age + " year old.";
        }
    },

    mutations: {
        changeUsername(state, newUsername) {
            state.username = newUsername;
        }
    },

    actions: {
        handleChangeUsername(context, newUsername) {
            context.commit('changeUsername', newUsername);
        }
    }
});
```

Tiếp đó để hiển thị ra bên ngoài chúng ta sẽ chỉnh file component thành như sau nhé.

```
<template>
    <div>
        <h1>Info</h1>
        <h2>{{username}}</h2>
        <br />
        <div>
            <input v-model="usernameInput"/>
            <button @click="changeUsername">Change username</button>
        </div>
        <br />
        <div>
            <div>{{getUsername}}</div>
            <div>{{getAge}}</div>
        </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
    name: "Info",
    data() {
        return {
            usernameInput: ''
        }
    },
    computed: {
        username() {
            return this.$store.state.username;
        },
        ...mapGetters(['getUsername', 'getAge']),
        // getUsername() {
        //     return this.$store.getters.getUsername;
        // },
        // getAge() {
        //     return this.$store.getters.getAge;
        // }
    },
    methods: {
        changeUsername() {
            this.$store.dispatch('handleChangeUsername', this.usernameInput);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
```

Ở đây các bạn cũng có thể dùng thêm tính năng của VueX để làm cho code được ngắn gọn hơn nhé như là: mapGetters, mapActions , mapState, mapMutations. Thật là quá tiện ^^.

### 3. Kết luận
Như vậy, các bạn chắc cũng hiểu một phần cơ bản nhất của VueX rồi chứ ạ. Nhưng bể học là vô biên, đây mới chỉ là một phần rất nhỏ mà bạn có thể làm với VueX thôi nhé. Nhưng mình tự tin nó là phần core quan trọng nhất. Nếu các bạn lắm được cơ bản như thế này rồi thì có sẽ làm quen với dự án dùng VueX rất nhanh thôi nhé.

Thêm một chút nữa thì đến thời điểm bây giờ có lẽ React vẫn là Framework phổ biến nhất, rồi ngay sau nó chính là Vue nhé các bạn. Còn Angular2+ thì ở cuối thôi vì nó cồng kềnh – khó dùng hơn 2 thằng này.

3s quảng cáo. Mình mới viết blogs từ đầu tháng 3, nên còn nhiều thiếu xót mong các bạn bỏ quá cho nhé https://chamdev.com/vuex-getting-started/ .

### 4. Tham khảo
[Vuex made simple — getting started!](https://itnext.io/vuex-made-simple-getting-started-6bf229d432cf)

[What is Vuex?](https://vuex.vuejs.org/)

[Vuex Tutorial](https://www.codingame.com/playgrounds/6661/vuex-tutorial)