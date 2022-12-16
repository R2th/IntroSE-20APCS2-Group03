# Giới thiệu
Chào mọi người, như mọi người cũng đã biết, xử lý hiển thị và tương tác với các bảng dữ liệu (datatable) là một phần quan trọng của các ứng dụng Website, đặc biệt là các ứng dụng về quản lý dữ liệu (Vd: Admin page, ...). Nhiều thư viện ra đời nhằm mục đích hỗ trợ cho các lập trình viên việc các bảng dữ liệu đó một cách nhanh chóng, đầy đủ các chức năng cần thiết.

Và trong `VueJs` cũng có nhiều package hỗ trợ việc hiển thị và tương tác với các bảng dữ liệu một cách nhanh chóng, hỗ trợ đầy đủ các chức năng như tìm kiếm, sắp xếp, export,... dữ liệu. Trong bài viết này mình sẽ giới thiệu với các bạn một package như vậy, đó là `vue-materialize-datatable`, chúng ta cùng tìm hiểu về nó nhé :D.
# Cài đặt
Bạn cần copy và paste lệnh sau vào terminal để cài đặt `vue-materialize-datatable`:
```
npm i vue-materialize-datatable --save
```
**Lưu ý:** `vue-materialize-datatable` yêu cầu `VueJs 2`và thư viện [materialize-css](https://www.npmjs.com/package/materialize-css). 

Ngoài ra `vue-materialize-datatable` còn yêu cầu bạn phải  import `Material Design icons`. Bạn có thể import trực tiếp thông qua link Google's CDN hoặc cài đặt package và import file vào ứng dụng:
* CDN: import trong file Html hoặc file Css/Sass:
    * Html:
         ```
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        ```
    * Css/Sass:
        ```
        @import url(http://fonts.googleapis.com/icon?family=Material+Icons);
        ```
* NPM package:
    * Cài đặt
        ```
        npm i material-design-icons-iconfont -S
        ```
    * Import:
        ```
        @import "~material-design-icons-iconfont/dist/material-design-icons";
        ```
# Sử dụng
Sau khi cài đặt `vue-materialize-datatable`, bạn chỉ cần import và khai báo nó vào ứng dụng Vue của bạn. Và sau đó bạn có thể sử dụng thông qua component `<datatable>`:
```
import DataTable from "vue-materialize-datatable";
```
```
{
    ...
    components: {
        ...
        "datatable": DataTable
    }
}
```
```
<datatable></datatable>
```
Một Ví dụ đơn giản sử dụng `vue-materialize-datatable`:
```
<template>
    <div id="app">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <div class="content">
          <datatable
            title="List Student"
            :columns="tableColumns1"
            :rows="tableRows1"
          />
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import App from './App.vue'

    import 'materialize-css';
    import 'materialize-css/dist/css/materialize.css';
    import DataTable from "vue-materialize-datatable";

    export default {
        name: 'app',
        data() {
            return {
                list: [],
                tableColumns1: [
                {
                  label: "Character name",
                  field: "charName",
                  numeric: false,
                  html: false
                },
                {
                  label: "First appearance",
                  field: "firstAppearance",
                  numeric: false,
                  html: false
                },
                {
                  label: "Created by",
                  field: "createdBy",
                  numeric: false,
                  html: false
                },
                {
                  label: "Voiced by",
                  field: "voicedBy",
                  numeric: false,
                  html: false
                }
              ],
              tableRows1: [
                {
                  charName: "Abu",
                  firstAppearance: "Alladin (1992)",
                  createdBy: "Joe Grant",
                  voicedBy: "Frank Welker"
                },
                {
                  charName: "Magic Carpet",
                  firstAppearance: "Peter (1994)",
                  createdBy: "Randy Cartwright",
                  voicedBy: "N/A"
                },
                {
                  charName: "The Sultan",
                  firstAppearance: "John (1995)",
                  createdBy: "Navid Negahban",
                  voicedBy: "Douglas Seale"
                }
              ],
            }
        },
        components: {
            "datatable": DataTable
        }
    }
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
.content {
  padding: 20px;
}
</style>
```
# Các thuộc tính
`vue-materialize-datatable` cung cấp cho chúng ta các thuộc tính để sử dụng và tùy chỉnh như sau:

* `title`: Tiêu đề của bảng dữ liệu (Vd: "List Student")
* `columns`: Thiết lập các thông tin của các cột tiêu để (header) của bảng dữ liệu, có giá trị là một mảng các đối tượng. Ví dụ:
    ```
    [ 
      {    
        label: "Name", // Tên cột
        field: "name", // Tên trường sẽ hiển thị từ dữ liệu của mỗi hàng
        numeric: false,  // Ảnh hưởng đến sorting
        html: false    // Có hiển thị dữ liệu html hay không.
      },
      ...
    ];
    ```
* `rows`: Thiết lập các thông tin dữ liệu các hàng (body) trong bảng dữ liệu, có giá trị là một mảng các đối tượng. Ví dụ:

    ```
    [
      {    
        name: 'test', // "name" sẽ mapping với data của "field" của các cột ở trên.
        age: 23,
        ...
      },
      ...
    ];
    ```
* `perPage`: Thiết lập giá trị cho selectBox hiển thị số lượng record của bảng dữ liệu trên trang. (Giá trị mặc định là `[10, 20, 30, 40, 50]`).
* `defaultPerPage`: Thiết lập số record mặc định trên page (Giá trị mặc định là `10`). Nếu không thiết lập thì mặc định nó sẽ là giá trị đầu tiên của `perPage`.
* `initSortCol`: Thiết lập cột mà dữ liệu sẽ được sắp xếp khi khởi tạo. (Giá trị mặc định là `-1` - bảng dữ liệu sẽ không sắp xếp theo bất kì cột nào).
* `onClick`: Lắng nghe sự kiện click vào các hàng dữ liệu.
* `clickable`: Thiết lập cho phép sự kiện click trên hàng dữ liệu (Giá trị mặc định là `true`).
* `sortable`: Thiếp lập cho phép sắp xếp dữ liệu trên bảng hay không (Giá trị mặc định là `true`).
* `searchable`: Thiết lập hiển thị chức năng tìm kiếm dữ liệu (Giá trị mặc định là `true`).
* `exactSearch`: Tắt chức năng fuzzy search (Giá trị mặc định là `true`).
* `serverSearch`: Được sử dụng khi bạn muốn search và lấy data từ server (Giá trị mặc định là `false`).
* `serverSearchFunc`: Function dùng để search và lấy data từ server. Lưu ý để sử dụng function này thì bạn cần phải thiết lập cho `serverSearch` ở trên là `true`.
* `paginate`: Thiết lập hiển thị các button `next`/`prev` ở cuối bảng dữ liệu (Giá trị mặc định là `true`).
* `exportable`: Thiết lập hiển thị chức năng export dữ liệu (Giá trị mặc định là `true`).
* `printable`: Thiết lập hiển thị chức năng in dữ liệu (Giá trị mặc định là `true`).
* `customButtons`: Thiết lập tùy chỉnh các button, có giá trị là một mảng các đối tượng. Ví dụ:
    ```
    [
      { 
        hide: false, // Có ẩn button không
        icon: "search", // Materialize icon 
        onclick: aFunc() // Lắng nghe sự kiện onclick của button
      },
      ...
    ];
    ```
# Localization
`vue-materialize-datatable` còn hỗ trợ đa ngôn ngữ, bạn có thể thiết lập ngôn ngữ hiển thị thông qua thuộc tính `locale`. Các ngôn ngữ khả dụng mà `vue-materialize-datatable` hỗ trợ:
* `en` (English, default)
* `ar` (Arabic)
* `es` (Spanish)
* `cat` (Catalan)
* `br` (Brazilian Portuguese)
* `nl` (Netherlands)
* `fr` (French)
# Row-click Event
Nếu bạn thiết lập thuộc tính `clickable` là `true` (mặc định) thì bạn có thể bind event `row-click` như bên dưới:
```
<datatable v-on:row-click="onRowClick"></datatable>

<script>
  var app = new Vue({
    el: '#app',
    ...
    methods: {
      onRowClick: function (row) {
        //row contains the clicked object from `rows`
        console.log(row)
      }
    },
  })
</script>
```
# Row buttons
`vue-materialize-datatable` còn cho phép bạn có thể thêm các action button vào bảng dữ liệu một cách dễ dàng tương tự như sau:
```
<datatable title="News" ...>
  <th slot="thead-tr">
    Actions
  </th>
  <template slot="tbody-tr" scope="props">
    <td>
      <button class="btn red darken-2 waves-effect waves-light compact-btn"
          @click="(e) => deleteItem(props.row, e)">
        <i class="material-icons white-text">delete</i>
      </button>
    </td>
  </template>
</datatable>
```
# Demo
Mình có làm một demo nho nhỏ sử dụng `vue-materialize-datatable` như sau :D

![](https://images.viblo.asia/667e4532-2706-46ba-a555-c856fd11a59d.gif)
# Kết luận
Qua bài viết này mình đã giới thiệu cho các bạn về `vue-materialize-datatable`, một package dùng để hiển thị và tương tác với các bảng dữ liệu (datatable) trong các ứng dụng `VueJs` một cách nhanh chóng, đơn giản, có đầy đủ các chức năng cần thiết và dễ dàng tùy biến.

Hi vọng bài viết này sẽ có ích cho các bạn :D
# Tham khảo
https://github.com/MicroDroid/vue-materialize-datatable