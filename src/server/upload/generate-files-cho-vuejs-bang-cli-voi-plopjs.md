![](https://images.viblo.asia/c1939841-c689-48aa-ba44-5cba6dfb020b.jpg)

Chào các bạn, 
Lâu lắm rồi mình mới quay trở lại viết do deadline dí sát quá 🥲🥲🥲

*Các bạn follow mình nhé [https://blog.ngthuongdoan.com/](https://blog.ngthuongdoan.com/). Link bài gốc [https://blog.ngthuongdoan.com/generate-files-cho-vuejs-bang-cli-voi-plopjs](https://blog.ngthuongdoan.com/generate-files-cho-vuejs-bang-cli-voi-plopjs)*

Bắt đầu nhé, nếu bạn muốn tạo một component trong Vue thì sẽ như thế nào? Theo flow thông thường thì sẽ tạo một file và cấu trúc vào như thế này phải không.
```html
<template>
  <div>A Component</div>
</template>

<script>
export default {}
</script>

<style scoped></style>
```
Đó là công việc thủ công khá nhàm chán, nếu bạn đã dùng Angular CLI thì chắc sẽ biết đến lệnh
```bash
ng generate component <path>
```

Hôm nay mình sẽ hướng dẫn các bạn cách tạo công cụ đó nhưng ở một bước nâng cao hơn, bạn có thể tự điều chỉnh cho các framework khác, riêng bài viết này mình dùng cho VueJS nhé (tại mình là fanboy :v)

![https://github.com/plopjs/plop](https://camo.githubusercontent.com/e6cd703c332e7041ee945d6c0ee75084bb19b485e10d4c6467a62a65e9a02071/68747470733a2f2f692e696d6775722e636f6d2f70656e55466b722e676966)
# 1. Giới thiệu Plop.js ( [https://plopjs.com/](https://plopjs.com/) )

> Plop is a little tool that saves you time and helps your team build new files with consistency.

Đọc dòng giới thiệu xong thì các bạn cũng hiểu sơ sơ rồi phải không, đây là một công cụ giúp chúng ta config sẵn công việc tạo file một cách thống nhất trong team, ví dụ như: component, module trong store,  module trong router, common data,...
# 2. Cài đặt
Cài đặt plop một cách bình thường nhé:
```bash
#npm
npm install --save-dev plop
#yarn
yarn add -D plop
```

Đầu tiên bạn tạo một ```plopfile.js``` ở root folder. 

```js
// Import hết các template vào
const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')

// Tạo function để plop có thể map vào cli
module.exports = function(plop) {
  // plop view
  plop.setGenerator('view', viewGenerator)
  // plop component
  plop.setGenerator('component', componentGenerator)
  // plop store
  plop.setGenerator('store', storeGenerator)
}
```
Ứng với mỗi command bạn sẽ tạo một folder bao gồm file template và file cấu hình hướng dẫn plop làm việc.
![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628823320216/M7DnG0uYy.png)

Ví dụ như cấu hình cho command tạo component

```html
<!-- plop-templates/component/index.hbs -->
{{#if template}}
<template>
  <div />
</template>
{{/if}}

{{#if script}}
<script>
export default {
  name: '{{ properCase name }}',
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
{{/if}}

{{#if style}}
<style lang="scss" scoped>

</style>
{{/if}}
```

Ở đây mình cấu hình cho plop sẽ gồm 3 công việc đó là hỏi tên của component (có validate nếu trống), thư mục sẽ tạo component, các phần trong file hbs sẽ được generate.

Các type của command thì bạn có thể tham khảo tại đây [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) 
```js
/* plop-templates/component/prompt.js*/
const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate vue component',
  prompts: [
  // Hỏi tên của component
  {
    type: 'input',
    name: 'name',
    message: 'component name please',
    validate: notEmpty('name')
  },
   /* Hỏi folder tạo componet với dạng select, ở đây mình dùng theo
   Atomic Design nên mình sẽ config theo */
  {
    type: "list",
    name: "level",
    message: "What level of atomic design?",
    choices:[{
      name: "Atoms",
      value: "atoms"
    },
    {
      name: "Molecules",
      value: "molecules"
    },
    {
      name: "Organisms",
      value: "organisms"
    },
    {
      name: "Templates",
      value: "templates"
    },
  ],
  },
  // Check xem cần phải generate phần nào trong file template
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'Components require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  // Đây là phần plop sẽ làm những công việc sau khi nhận các tham số trên
  actions: data => {
    /* Bạn có thể đổi case của tham số theo Case Modifiers
    https://github.com/plopjs/plop#case-modifiers */
    const name = '{{properCase name}}'
    const level = '{{lowerCase level}}'
    const actions = [{
      type: 'add',
      path: `src/components/${level}/${name}.vue`,
      templateFile: 'plop-templates/component/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
```

Cuối cùng chúng ta thêm 1 script trong package.json để chạy plop:
![image.png](https://images.viblo.asia/6ee7b0d4-6db2-4b73-8be1-cee0c0843e08.png)

Kết quả chúng ta sẽ được như sau
![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628824262589/YwslXZg5x.png)

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628824277425/zG5x-1r1L.png)

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628824288958/DsxlLwEwP.png)

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1628824374357/ZIaNv4TUp.png)

# 3. Kết luận
Với công cụ này sẽ tiết kiệm phần công việc thủ công trước đây, tạo sự thống nhất cho các thành viên mới của team nếu team theo một chuẩn nào đó. Đối với các framework hay cấu trúc khác nhau các bạn đều có thể tự mình config theo mà không bị rào cản nào cả.

Cảm ơn các bạn đã đọc ❤️

## Tham khảo

- [https://github.com/plopjs/plop](https://github.com/plopjs/plop)
- [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 
- [https://github.com/SBoudrias/Inquirer.js/](https://github.com/SBoudrias/Inquirer.js/)