# I. Chuẩn bị:
Tạo mới 1 vue-app:

```
vue create authen-with-vue-router
```

Config cơ bản:

1. Babel.
2. Esint.

Oke. Run web nào:

```
yarn serve
```

# II.Ý tưởng:
Về cơ bản, mình sẽ viết 1 cái `dropdown-menu`, khá giống với của bootstrap (vì không chú trọng UI nên mình chỉ làm đầy đủ chức năng thôi nha, các bạn có thời gian thì cố gắng hoàn thiện nhé):

![dropdown-menu bootstrap 4](https://images.viblo.asia/94ce8943-3793-4c1a-8d62-f3a975f0e448.png)

[Check Document Dropdown Menu of Bootstrap Here!](https://getbootstrap.com/docs/4.5/components/dropdowns/)

Vấn đề ở đây là, mình không sử dụng 1 Library thứ 3 bên ngoài.

Okey, make some noises!

# II. Thực hiện:
## 1. Cây thư mục:
Vì chỉ tạo thêm component `DropdownMenu` theo dạng `List-Item`, cấu trúc thư mục của mình về cơ bản sẽ giống Vue CLI, nên mình sẽ hiển thị phần thay đổi:
```
- src/
|---components
        |---DropdownMenu
                |--- index.vue
                |--- Item.vue
```

## 2. UI:
Mình sẽ làm nhanh phần CSS, các bạn có thể sử dụng CSS có sẵn của `Bootstrap` nạp vào nếu không muốn làm phần UI :stuck_out_tongue_winking_eye:.

File `app.vue`:
```scss
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  box-sizing: border-box;
}

a {
  &:visited {
    color: #2c3e50;
  }
}

.spacing {
  padding: 100px 0;
}
```

File `DropdownMenu/index.vue`:
```scss
button {
  position: relative;
  padding: 10px 20px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.3s;

  &:focus {
    outline: 0px;
  }

  &:hover {
    background: #000;
    color: white;
  }

  &.isActive {
    background: #000;
    color: white;
  }
}

.dropdown {
  position: relative;
  width: fit-content;

  &-list {
    background: white;
    margin-top: 5px;
    position: absolute;
    z-index: 10;
    width: 100%;
    border: 1px solid black;
    border-radius: 4px;
  }
}
```

File `DropdownMenu/Item.vue`:
```scss
.item {
  display: block;
  width: 100%;
  padding: 5px 10px;
  transition: 0.3s;
  position: relative;

  &:hover {
    background: black;
    color: white;
  }
}
```

## 3. Code logic:
Ở `DropdownMenu/index.vue` mình sẽ có các `props`:
*  Sử dụng 1 `id` được truyền vào để hỗ trợ DOM và phân biệt giữa `multi dropdown-menu`.
*  Có `prop` `arrays` để truyền vào các `item` cho `dropdown-menu`.

File `Home.vue`:
```js
<template>
  <div class="home">
    <div class="spacing">
      <DropdownMenu id="dropdownmenu1" :arrays="arrays">
        DropdownMenu 1
      </DropdownMenu>
    </div>
  </div>
</template>
```
Bên trong `DropdownMenu/index.vue`:
* Có biến `isOpen` chính là công tắc đóng mở `Dropdown-menu` (`true` là mở, `false` là đóng).
* Truyền vào `Item.vue` 1 `function`: `closeDropdown` thực hiện việc đóng `Dropdown-menu` của chúng ta từ `Item` bên trong.
```js
<template>
  <div :id="id" class="dropdown">
    <button @click="isOpen = !isOpen" :class="{ isActive: isOpen }">
      <slot />
    </button>
    <div class="dropdown-list" v-if="isOpen">
      <Item
        v-for="(item, index) in arrays"
        :key="index"
        :item="item"
        :closeDropdown="callToClose"
      >
        {{ item.text }}
      </Item>
    </div>
  </div>
</template>

export default {
  name: 'DropdownMenu',
  components: {
    Item,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    arrays: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    callToClose() {
      this.isOpen = false;
    },
  },
};
</script>
```
File `DropdownMenu/Item.vue`:
```js
<template>
  <div class="item" @click="doFunc">
    <slot />
  </div>
</template>
<script>

export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
    closeDropdown: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    doFunc() {
      console.log(this.item.link);
      this.closeDropdown();
    }
  }
};
</script>
```

Theo lý thuyết, `click` `button` sẽ đóng mở `DropdownMenu` của chúng ta, ngoài ra khi `click` từng `Item`, cũng sẽ đóng `Dropdown`. Nếu muốn thực hiện 1 công việc nào đó ở `Item`, mình truyền `function` cho các `item` trong `arrays` và sử dụng `methods` tại `Item.vue` để gọi lại công việc đó là xong.

Ngoài ra, `DropdownMenu` còn phải đóng khi chúng ta click ra bên ngoài của nó nữa. Lúc này, mình sử dụng `window.addEventListener('click', ...)` để phát hiện từng click và kiểm tra xem đang click vào `DropdownMenu` hay không?

Lúc này, mình sẽ sử dụng `hook`:
* `created` để `addEventListener`.
* `beforeDestroy` để `removeEventListener`.

File `DropdownMenu/index.vue`:
```js
  created() {
    window.addEventListener('click', this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.checkClickOn);
  },
  methods: {
    checkClickOn(event) {
      if (!document.getElementById(this.id).contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
```

Đoạn code `document.getElementById('your-id).contains(event.target)` sẽ trả về `true` nếu chúng ta click vào 1 đối tượng HTML là con của `your-id` (prop) mà chúng ta đã truyền ở phía trên.

Giờ, mình sẽ tạo thêm 1 `DropdownMenu` bên cạnh để kiểm tra trường hợp `multi dropdown-menu`:

File `Home.vue`:
```js
<template>
  <div class="home">
    <div class="spacing">
      <DropdownMenu id="dropdownmenu1" :arrays="arrays">
        DropdownMenu 1
      </DropdownMenu>
    </div>
    <div class="spacing">
      <DropdownMenu id="dropdownmenu2" :arrays="arrays">
        DropdownMenu 2
      </DropdownMenu>
    </div>
  </div>
</template>
```
It worked, perfectly! :heart_eyes:

Mình xin phép share repos của mình, mọi người hãy clone về và nhận xét giúp mình nhé :bow:.

Link github: [Here!](https://github.com/trdbau/vuejs-dropdown-menu)

Cảm ơn anh Trần Đại Sơn đã góp ý cho em về phần `eventListener` :bow:. Cảm ơn mọi người đã đọc bài viết của mình.