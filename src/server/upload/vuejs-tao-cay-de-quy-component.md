Đệ quy luôn là một cái gì đó học rất là khó trong xử lý thuật toán, Tuy nhiên trong một vài trường hợp, sử dụng đệ quy lại cảm thấy nó tự nhiên hơn là mình dùng vòng lặp. Duyệt cây là một ví dụ

Chúng ta có thể tạo những đệ quy component trong VueJS hoặc bất cứ frameworkJS nào.

# Tạo Tree Component

Hãy tưởng tượng 1 component  phải render một cấu trúc dạng cây như bên dưới

```
+ Root directory
  + Directory A
    + Directory A1
  + Directory B
  ```
  
Chúng ta cứ coi `directory` là một cây thì tất cả các `subdirectories` sẽ là danh sách các `note` trong cây đó. Một cây luôn chỉ có 1 root node duy nhất

Cũng có thể sử dụng Object với các key là `label` và `children` :

  ```js
  const tree = {
  label: "A cool folder",
  children: [
    {
      label: "A cool sub-folder 1",
      children: [
        { label: "A cool sub-sub-folder 1" },
        { label: "A cool sub-sub-folder 2" }
      ]
    },
    { label: "This one is not that cool" }
  ]
}
```

Từ cấu trức trước, bây giờ chúng ta sẽ tạo 1 component có tên là Tree.Vue và coi nó là 1 `prop`
 và render `root node`:
 
 
 ```html
 Tree.Vue
 ====================================
 
 <template>
  <div class="tree">
    <ul class="tree-list">
      <node-tree :node="treeData"></node-tree>
    </ul>
  </div>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
  props: {
    treeData: Object
  },
  components: {
    NodeTree
  }
};
</script>

<style>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>
```

Ta sẽ CSS lại một chút để nó hiện thị theo dạng thứ bậc

Ở đây chưa có gì đặc biệt cả, nó chỉ nhận thuộc tính `treeData` và chuyền nó vào `:node` của NodeTree component và chưa thực hiện gì cả

# Xứ lý  Node Tree

Mỗi node sẽ show ra label của nó nhưng cũng lần render đó nó cũng phải render ra children của nó. Ở cách đó thì 1 `nodeTree` cũng sẽ là sub-tree

Dưới đây là một ví dụ của `NodeTree.vue`component:

```html
NodeTree.vue
=========================================

<template>
  <li class="node-tree">
    <span class="label">{{ node.label }}</span>
  </li>
</template>

<script>
export default {
  props: {
    node: Object
  }
};
</script>
```

Ví dụ trên mới chỉ show ra label, và chúng ta sẽ phải làm cho node đó render ra các children của nó. 

Nếu bạn để ý 1 chút thì nó cũng giống như các hàm đệ quy,  có chức năng gọi lại chính mình

Vì vậy chúng ta cần làm `NodeTree.vue` render ra danh sách node. Để truy cập một component từ chính component đó, chúng ta phải thêm thuộc tính `name` cho component đó:

```html
NodeTree.vue
=========================================

<template>
  <li class="node-tree">
    <span class="label">{{ node.label }}</span>

    <ul v-if="node.children && node.children.length">
      <node v-for="child in node.children" :node="child"></node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object
  }
};
</script>
```

Như vậy nó sẽ tạo ra các `NodeTree` bằng cách gọi lại chính nó cho tới node cuối cùng 
    
Có thể thấy chúng ta sử dụng  tên thẻ <node> để gọi chính nó. Các node của `children` chỉ được hiển thị khi có `children` có chứa node.
    
# Sử dụng Tree Component
    

 Để sử dụng chúng tạo 1 App.vue component và chuyền data có cấu trúc dạng `tree` vào `Tree.vue` Component
    
    
 ```html
App.vue
==========================================
    
<template>
  <div>
    <tree :tree-data="tree"></tree>
  </div>
</template>

<script>
import Tree from "./Tree";

export default {
  data: () => ({
    tree: {
      label: "A cool folder",
      children: [
        {
          label: "A cool sub-folder 1",
          children: [
            { label: "A cool sub-sub-folder 1" },
            { label: "A cool sub-sub-folder 2" }
          ]
        },
        { label: "This one is not that cool" }
      ]
    }
  }),
  components: {
    Tree
  }
};
</script>
  ```
   Mình hy vọng là sau bài viết này có thể giúp bạn build đc `awesome Tree component`. :D