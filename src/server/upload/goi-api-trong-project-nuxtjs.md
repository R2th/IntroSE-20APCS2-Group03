# Mở Đầu
Xin chào các bạn hôm nay mình sẽ giới thiệu đến mọi người một cách gọi api trong project nuxtjs. Để xem nó có gì khác so với gọi api trong Angular mà mình cũng đã có dịp giới thiệu ở bài một bài [trước](https://viblo.asia/p/thu-lay-data-tu-api-bang-angular-lam-trang-danh-sach-san-pham-1VgZveJRKAw) đó nhé :D .
# Chuẩn bị
Đầu tiên chúng ta sẽ cần tạo api mình sẽ dùng mockpi để tạo api nhé mọi người vào  [đây](https://mockapi.io/projects)  tạo projects mới ấn New resource đặt tên cho resource rồi thêm các trường, kiểu dữ liệu, cuối cùng ấn Create, rồi ấn vào tên resource đó nó sẽ hiển thị ra như thế này![](https://images.viblo.asia/598f7921-0380-49ce-952c-524bd9696664.png)

Ở đây đây mình tạo 1 api có các trường là: id, ngày tạo, tên, email, và địa chỉ. Chúng ta cần copy địa chỉ của api trên URL để tí nữa còn gọi nó vào.

Tiếp theo là bên Nuxjs. Ở bài trước mình đã tạo một project Nuxjs và có sử dụng `elementUI` để tạo ra một trang giao diện admin. Ở bài này mình sẽ sử dụng lại giao diện đó để có thể gọi api và đổ dữ liệu ra đó. Nếu các bạn quan tâm thì có thể xem lại hai bài viết  [Tạo một dự án Nuxtjs, tìm hiểu cấu trúc thư mục trong Nuxtjs](https://viblo.asia/p/tao-mot-du-an-nuxtjs-tim-hieu-cau-truc-thu-muc-trong-nuxtjs-6J3Zg30PZmB) và  [Xây dựng UI web nhanh hơn với Element UI](https://viblo.asia/p/xay-dung-ui-web-nhanh-hon-voi-element-ui-XL6lA27A5ek) thì các bạn có thể tham khảo tại đây.
# Thực hiện
Như ở bài   [Xây dựng UI web nhanh hơn với Element UI](https://viblo.asia/p/xay-dung-ui-web-nhanh-hon-voi-element-ui-XL6lA27A5ek) thì mình đã có một trang index.vue là nơi chứa giao diện,  trong phần `export default` mình thêm đoạn code như sau
```php
  data() {
    return {
      tableData: []
    };
  },
  async fetch() {
    this.tableData = await fetch(
      "https://5fc09c43cb4d020016fe5b04.mockapi.io/Uses"
    ).then(res => res.json());
  },
```
Hàm ` async fetch()` được dùng để gọi dữ liệu api theo URL và trả về dạng json. Các bạn muốn lấy data của api nào thì chỉ cần chuyền đúng URL Của api đó vào là được.  Hàm data chứa data ở đây là theo kiểu mảng.
Chúng ta cần chuyền data vào bảng để hiển thị ra bảng ở đây chính là components `tableList` hôm trước mình tạo , Nhưng ở đây chúng ta lại đang gọi data ở file index nên không thể và cũng không nên trực tiếp gọi tới parent data trong child component template. Vì thế mình sử dụng một thuộc tính đó là `props` để có thể truyền data từ component cha xuống cho component con.

Ở file `tableList.vue` mình có đoạn `props` để lấy data như sau:

```php
<script>
export default {
  props: {
    tableData: Array
  }
};
</script>
```
Còn đây là code phần table
```php
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="STT" width="80"></el-table-column>
    <el-table-column label="Name" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Name: {{ scope.row.name }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Date" width="280">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="Email" label="Email" width="280"></el-table-column>
    <el-table-column prop="add" label="Address" width="280"></el-table-column>
    <el-table-column label="Operations">
      <template>
        <el-button size="mini">Edit</el-button>
        <el-button size="mini" type="danger">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
```
Kết quả chúng ta được 

![](https://images.viblo.asia/05cf71ce-ad69-4f3a-a3a6-0b2b9069d420.png)

# Kết luận
Như vậy là mình đã giới thiệu một cách call api trong nuxtjs ngoài ra chúng ta còn có thể sử dụng `axios` để gọi api. Bài tiếp theo mình sẽ làm thêm chức năng thêm sửa xóa.... Bài viết của mình xin được dừng lại ở đây, cảm ơn các bạn đã quan tâm. Mọi ý kiến đóng góp các bạn hãy comment xuống bên dưới để mình được biết và bổ sung cho bài viết hoàn thiện hơn. Một lần nữa cảm ơn các bạn.