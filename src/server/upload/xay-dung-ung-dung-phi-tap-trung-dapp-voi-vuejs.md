Các bài viết trước trong chuỗi bài "Xây dựng dapp":

* Plain: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-gAm5y8LLldb
* Reactjs: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-reacjs-L4x5x8p15BM
* Cocos Creator: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-cocos-creator-63vKjk2bZ2R
* Unity: https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-unity-QpmlexwVZrd
# Mở đầu
Để tiếp tục series xây dựng Dapp, bài này sẽ hướng dẫn xây dựng sample Dapp bằng framework **vuejs**. về cơ bản thì chúng ta sẽ xây dựng một ứng dụng dựa trên **smart cotnract** đã được xây dựng trong bài đầu tiên : [Xây dựng smart contract ](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-reactjs-gAm5y8LLldb#_frontend-3)

Về cơ bản chúng ta sẽ sử dụng smart contract đã có và xây dựng ứng dụng chuyển các **token** như đã thực hiện với React. Đối với Vuejs thì sẽ có một số thứ cần thay đổi tuy nhiên tư tưởng về cơ bản sẽ khá giống nhau

![](https://images.viblo.asia/b07a96de-a795-4e39-8fc3-8314e54a8ae2.PNG)

# Chuẩn bị
Cũng giống như việc init **react**, chỉ cần chạy câu lệnh 
```js
vue create vue-frontend
```

* Lưu ý: phiên bản vue mình dùng là vue 3 nên nếu bạn đang dùng các phiên bản cũ hơn (1.x hoặc 2.x) thì có thể gỡ cài đặt bằng các câu lệnh **npm uninstall vue-cli -g** hoặc **yarn global remove vue-cli**.

Trong trường hợp bạn chưa có **vue** thì có thể cài thông qua câu lệnh sau :
```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Sau khi hoàn tất thì cấu trúc thư mục sẽ có dạng như sau:
![](https://images.viblo.asia/0433f1bf-c774-49ba-86e9-eb04b2606cb0.png)

Tiếp tục sẽ thêm phần **contracts** đã được **migrate** vào folder **src** của **vue-fronted** - bước này tương tự như bên react

![](https://images.viblo.asia/148000e6-8a86-45d4-95e6-49c7fc452c7e.png)

# Triển khai ứng dụng

Đối với những bạn mới chỉ dùng **react** sẽ thấy các components của **vue** được thiết kế tương đối khác khi có chứa đầy đủ cả **js**, **html** và **css** - đối với mình thì mình thấy cách thiết kế này khá tiện và gọn hơn so với **react**

Trong khuôn khổ bài viết chỉ hướng dẫn cách tương tác với **smart contract** do đó mình sẽ không nói đến việc **cấu trúc các file** cũng như việc chia **components** hay **view**, với demo mình sẽ code trực tiếp trên component **App.vue**

Khác với việc phải thêm đủ bộ combo **action**, **reducer**, **store** hay thêm 1 **middleware** (mình sử dụng thunk) như react thì với vue chỉ một **store** là đủ.

> Lưu ý : Điểm khác nhau lớn nhất bạn cần lưu ý khi quyết định xử dụng react hay vue để xây dựng đó chính là việc đi kèm với bộ quản lý **State** tương ứng là **redux** và **vuex**. Điểm khác biệt lớn nhất ở đây chính là **redux** là immuatble còn **vuex** là mutable. Các state trong react sẽ là bất biến, các state không thể sửa đổi mà chỉ có thể được thay mới hoàn toàn ( như trong bài trước có thể thấy các reducer dùng đến cú pháp **...state** mục đích để sử dụng lại **state** cũ kết hợp với các biến mới để tạo ra **state mới**). Đối với **vuex** thì tư tưởng của họ đó chính là ta có thể thay đổi trực tiếp **state** . Để nói về cái nào tốt hơn thì khá khó, tùy vào mục đích của mỗi người
>  

Thêm 2 package **vuex** và **web3** vào **package.json** : 
```js
"dependencies": {
    "core-js": "^3.4.3",
    "vue": "^2.6.10",
    "vuex": "^3.1.2",
    "web3": "1.2.4"
 }
```

## Store
Thêm một file **store/index.js** có dạng như sau:
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutation: {},
  actions: {},
  getters: {}
});
```

Nhìn sơ qua thì cũng có vẻ tương tự như combo 3 thứ **action**, **reducer** và **store** như react chỉ khác mỗi điều là chúng được thiết kế trong cùng 1 file.

Về cách sử dụng thì các bạn có thể đọc trực tiếp ở [trang chủ ](https://vuex.vuejs.org/guide/state.html)của vuex hoặc có thể đọc qua phần overview của cá nhân mình :

* **state**: Tương tự như react thì đây là các state sẽ được app sử dụng và được dùng, chia sẻ giữa các views, components
* **mutation**: Đây là thứ duy nhất để có thể thay đổi các state và thứ duy nhất nó quan tâm cũng là state
* **actions**: Có thể coi là các business logic thực hiện các hành động của ứng dụng, một action có thể gọi đến nhiều mutations
* **getter**: Getter về cơ bản được thêm vào để tiện hơn cho việc trả về các state, có thể thêm các function (vd: filter dữ liệu) vào đây để trả về state cần thiết thay vì những state dạng thô.

Cuối cùng là cập nhật để App biết rằng chúng ta đang sử dụng **vuex** để quản lý **state**, sửa lại file **main.js:**

```js
import Vue from 'vue';
import App from './App.vue';
import store from '@/store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app');
```

### State

Các state ban đầu được init sẽ tương tự với bên react:

```js
state: { web3: null, account: null, balance: null, metaCoin: null }
```

### Actions

Đầu tiên chúng ta cũng thêm action để kết nối với metamask vào folder **utils/getWeb3.js**:
```js
/* eslint-disable no-console */
import Web3 from 'web3';

const getWeb3 = async () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.', window.web3);
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
};

export default getWeb3;
```

Tiếp đó sẽ tương tự như **react** là các action **web3Connect**, **initContract**, **sendCoin**, **getBalance** :

**web3Connect:**
```js
import getWeb3 from '@/utils/getWeb3';

async setWeb3({ commit }) {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    window.web3.version.getNetwork((e, netId) => {
      if (netId !== process.env.VUE_APP_NETWORK_ID) {
        alert('Unknown network, please change network to Ropsten testnet network');
        return;
      }
    });
    if (accounts.length > 0) {
      const account = accounts[0];
      commit('setWeb3', { web3: getWeb3 });
      commit('setAccount', {account: account});
    } else {
      console.log('Account not found');
    }
}
```


**initContract:**

```js
import MetaCoin from '@/contracts/MetaCoin.json';

async initContarct({ commit, state }) {
    const web3 = await state.web3();
    const networkId = process.env.VUE_APP_NETWORK_ID;
    const metaCoin = new web3.eth.Contract(Factory.abi, MetaCoin.networks[networkId].address, {
      transactionConfirmationBlocks: 1
    });
    let metaCoinyFunc = () => metaCoin;
    commit('setMetaCoin', { factoryFunc });
}
```

**sendCoin:**

```js
async sendCoin({ commit, state }, params) {
      const metaCoin = state.metaCoin;
      const account = state.account;
      let amount = params.amount;
      let receiver = params.receiver;
      metaCoin.methods
        .sendCoin(receiver, amount)
        .send({ from: account })
        .on('confirmation', () => {
          commit('setNewAmount', { amount: amount });
        })
        .catch((e) => {
          console.log(e);
        });
    }
```

**getBalance:**

```js
async getBalance({ commit, state }) {
      const metaCoin = state.metaCoin;
      const account = state.account;
      let balance = await metaCoin.methods.getBalance(account).call({ from: account });
      commit('setBalance', { balance: balance });
}
```

Các bạn sẽ để ý thấy chúng ta sẽ có các lệnh **commit** xuất hiện khá nhiều, đó chính là cú pháp để kích hoạt các **mutations**

### Mutations

Chúng ta sẽ định nghĩa các mutations đã được sử dụng trong tất cả các **actions** phía trên:
```js
mutations: {
    setWeb3(state, payload) {
      state.web3 = payload.web3;
    },
    setAccount(state, payload) {
      state.account = payload.account;
    },
    setMetaCoin(state, payload) {
      state.metaCoin = payload.metaCoin;
    },
    setNewAmount(state, payload) {
      state.balance = state.balance - payload.amount;
    },
    setBalance(state, payload) {
      state.balance = payload.balance;
    }
}
```


## App

Phần **store** về cơ bản đã tương đối hoàn thiện, giờ là lúc viết lại chút giao diện và gọi các **actions** sao cho phù hợp

Phần **script** :
```js
<script>
/* eslint-disable no-console */
import { mapActions, mapState } from "vuex";

export default {
  name: "app",
  components: {},
  data() {
    return { receiver: "", amount: "" };
  },
  computed: { ...mapState(["balance", "account"]) },
  methods: {
    ...mapActions(["setWeb3", "initContarct", "getBalance", "sendCoin"]),
    send: async function() {
      await this.sendCoin({ receiver: this.receiver, amount: this.amount });
    }
  },
  async mounted() {
    await this.setWeb3();
    await this.initContarct();
    await this.getBalance();
  }
};
</script>
```

Tại phần này thì các function **setWeb3**, **initContract**, **getBalance**  sẽ được gọi ngay khi compenent được mount. Để sử dụng các **state** hay **action** trong vuex thì chúng ta sẽ sử dụng **mapActions** và **mapState**. Function **send()** được thêm vào để kích hoạt hàm **sendCoin** một cách thuận tiện hơn vì sẽ cần đến 2 đối số do user nhập vào là **receiver** và **amount**.

Cuối cùng là thêm một chút HTML để có thể show ra **account**, **balance** và form để user có thể submit **sendCoin:**

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>Account: {{this.account}}</p>
    <p>Balance: {{this.balance}}</p>
    <input v-model="receiver" placeholder="Receiver">
    <input v-model="amount" placeholder="Receiver">
    <button v-on:click="send">Submit</button>
  </div>
</template>
```

# Kết quả
Kết quả thì chúng ta cũng sẽ có một ứng dụng khá tương tự như đã xây dựng với **react** sẽ hiển thị địa chỉ , balance của user và có thể tạo các transaction:
![](https://images.viblo.asia/23b1487f-44cb-45d2-b778-d0c98354e6c3.png)

Link repo để tham khảo: https://github.com/tranchien2002/EthCodeBased/tree/add-vuejs