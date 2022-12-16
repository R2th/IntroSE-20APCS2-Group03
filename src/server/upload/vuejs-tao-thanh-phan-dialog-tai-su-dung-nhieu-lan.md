## 1. Giới thiệu

Trên thực tế, việc hiển thị một hộp thoại thông báo hoặc một hộp thoại xác nhận thường xuyên sảy ra. Nhưng làm sao để tối ưu và quản lý dễ dàng các hộp thoại được tạo ra là một vấn đề lớn, vì vậy hôm nay mình xin chia sẻ một vài kiến thức cơ bản áp dụng làm thành phần **dialog** có thể tái sử dụng nhiều lần.

## 2. Phân tích

Đối với thành phần **dialog** chúng ta có thể chia thành hai component chính mang hai chức năng khác nhau:

- Component **base-dialog** có chức năng chính là tạo ra khung dialog và thực hiện các hiệu ứng chuyển động cho dialog.
- Các component như **alert-dialog**, **confirm-dialog**, **input-dialog**, ... sẽ được đặt trong **base-dialog** và có chức năng chính là hiển thị nội dung của dialog.

## 3. Triển chiêu

#### 3.1 Đầu tiên là chuẩn bị một project VUE cơ bản :D

![](https://images.viblo.asia/9110a0a9-34ce-4666-9e69-6ac12a5c23fe.png)

- Nội dung file **BaseDialog.vue**

```
<template>
  <h1>{{msg}}</h1>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    msg: String
  }
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
```

- Nội dung file **App.vue**

```
<template>
  <div id="app">
    <BaseDialog msg="Welcome to dialog App"/>
  </div>
</template>

<script>
import BaseDialog from "./components/BaseDialog.vue";

export default {
  name: "app",
  components: {
    BaseDialog
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
```

#### 3.2 Code cho BaseDialog.vue

- Để sử dụng các hiệu ứng CSS trong VUE mình sẽ thiết kế template của component BaseDialog như sau:

```
<template>
  <transition name="dialog">
    <div v-if="active" class="dialog-backdrop" @click="handleBackdropClick">
      <div class="dialog-container" @click.stop>
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    active: { type: Boolean, default: false }
  },
  methods: {
    handleBackdropClick() {
      this.$emit("update:active", false);
    }
  }
};
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-container {
  max-width: 768px;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  background-color: #fff;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-container,
.dialog-leave-active .dialog-container {
  transition: transform 0.4s;
}
.dialog-enter .dialog-container,
.dialog-leave-to .dialog-container {
  transform: scale(0.9);
}
</style>
```

- Toàn bộ nội dung template của BaseDialog mình bọc trong thẻ <transition> có name là "dialog", transition này sẽ được trigger qua thuộc tính "active" là một prop của BaseDialog.

- Khi thuộc tính "active" thay đổi VUE sẽ thêm các class CSS vào element ".dialog-backdrop" và mình chỉ cần viết một chút CSS cho element này cũng như là các element con bên trong để có hiệu ứng theo mong muốn.
- Ở element ".dialog-backdrop" mình gắn thêm một sự kiện click gọi đến method "handleBackdropClick", method này có nhiệm vụ thay đổi thuộc tính "active" để đóng dialog.
- Element ".dialog-container" là phần sẽ hiển thị nội dung của dialog, do đó mọi sự kiện click phát ra từ element này mình không mong muốn nó lan truyền sang element ".dialog-backdrop" nên mình gắn một event modifier là "@click.stop".
- Nội dung của dialog sẽ được truyền vào bởi một component khác khi gọi nó và được thể hiện tại <slot/>

#### 3.3 Code cho App.vue

```
<template>
  <div id="app">
    <BaseDialog :active.sync="show">
      <h1>Test</h1>
      <button type="button" @click="show = !show">Close</button>
    </BaseDialog>
    <button type="button" @click="show = !show">Toggle</button>
  </div>
</template>

<script>
import BaseDialog from "./components/BaseDialog.vue";

export default {
  name: "app",
  components: {
    BaseDialog
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
```

- Tại component App mình sẽ gọi component BaseDialog và truyền vào template là nội dung mình mong muốn hiển thị trên dialog.
- Mình gán prop "active" của BaseDialog bằng giá trị của "show", prop này có một modifier là "sync" có nhiệm vụ nhận cập nhật lại giá trị cho "show" khi component BaseDialog phát ra sự kiện `this.$emit("update:active", false);`

#### 3.4 Test v1
Các bạn lưu lại, chạy project lên và nhấn vào toggle, nếu dialog đã xuất hiện như này là ngon rồi :D

![](https://images.viblo.asia/4a0793d2-53ec-4560-827c-b361b3e5d83e.png)

#### 3.5 Tách riêng chức năng cho component

Ở ví dụ trên thì mới chỉ có một component là BaseDialog, component này làm tất cả nhiệm vụ từ tạo khung, sử lý hiệu ứng đến hiển thị nội dung và chức năng của dialog. Với BaseDialog này chúng ta có thể extends ra để thêm các component mang các chức năng riêng biệt khác nhằm tập chung vào sử lý chức năng của từng loại dialog và giúp chúng phát huy các điểm mạnh của mình.

- Tại ví dụ này mình sẽ thêm một component là **AlertDialog**, nằm chung thư mục với BaseDialog, có nội dung như sau:

```
<template>
  <BaseDialog v-bind="$attrs" v-on="$listeners">
    <div class="dialog-title">{{title}}</div>
    <div class="dialog-body" v-html="message"></div>
    <div class="dialog-footer">
      <button type="button" @click="$emit('update:active', false)">Ok</button>
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from "./BaseDialog.vue";

export default {
  name: "AlertDialog",
  components: {
    BaseDialog
  },
  props: {
    title: String,
    content: String,
    confirmText: {
      type: String,
      default: "Ok"
    }
  }
};
</script>

<style scoped>
.dialog-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}
.dialog-footer {
  text-align: right;
  margin-top: 20px;
}
.dialog-footer button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
```

- Component này sẽ extend từ BaseDialog và chỉ làm một nhiệm vụ duy nhất là hiển thị một nội dung lên màn hình.
- Mình gán các props của BaseDialog thông qua AlertDialog bằng `v-bind="$attrs"`, và các event từ BaseDialog phát ra bằng `v-on="$listeners"`
- AlertDialog sẽ có thêm 3 props riêng là **title**, **content** và **confirmText**, 3 props này không liên quan đến BaseDialog.
- Mình sửa lại code của App.vue như sau:

```
<template>
  <div id="app">
    <AlertDialog :active.sync="show" title="Test Alert" content="Hello world"/>
    <AlertDialog :active.sync="show2" title="Test Alert 2222" content="Hello world 222" confirmText="Yes"/>

    <button type="button" @click="show = !show">Alert</button>
    <button type="button" @click="show2 = !show2">Alert222</button>
  </div>
</template>

<script>
import AlertDialog from "./components/AlertDialog.vue";

export default {
  name: "app",
  components: {
    AlertDialog
  },
  data() {
    return {
      show: false,
      show2: false
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
```

- Ở đây mình có thể sử dụng bao nhiêu AlertDialog tùy ý và cũng không cần quan tâm đến BaseDialog nữa.

## 4. Lời kết

Các bạn có thể thấy việc thiết kế các component và định nghĩa chức năng chính xác cho chúng rất quan trọng, việc đó giúp chúng ta có thể tập chung đào sâu vào một chức năng của một component, khiến việc debug và bảo trì trở nên rất dễ dàng. Từ ví dụ trên đây mình hi vọng mọi người sẽ có ý tưởng làm nhiều thứ hơn thế nữa, chúc các bạn thành công!