# Mở đầu 
![](https://images.viblo.asia/70b98fa7-ce5e-409b-8bd5-a9a0f7976b93.png)

Xin chào anh em hôm nay mình muốn giới thiệu đến anh em một thư viện UI mà bản thân mình thấy khá ngon, giúp cho việc xây dựng website của anh em trở lên nhẹ nhàng hơn :v . Đó chính là `Element UI`, `element UI` là một thư viện UI dành cho web có các phiên bản cho Vue,  React và Angular, Nhưng ở trong bài này mình mình chỉ giới thiệu nó trong phạm vi project Vue (vì mình chỉ biết Vue :D).
# Cách dùng
Như đã nói ở trên thì ở bài viết này này sẽ dùng nó cho project vue và cụ thể là project nuxjs, Ở bài trước [trước](https://viblo.asia/p/tao-mot-du-an-nuxtjs-tim-hieu-cau-truc-thu-muc-trong-nuxtjs-6J3Zg30PZmB) mình cũng đã tạo một projetc nuxjs, các bạn chú ý là phần  `UI framework` chỉ cần chọn `Element` là được. Khi tạo dự án nuxt js thì nó sẽ tự động cài element ui luôn cho chúng ta. các bạn có thể vào file `package.json` xem phần `dependencies` đã có `element-ui` hay chưa :v.
### Vì sao lại chọn element UI
Lý do mình chọn element ui là vì nó có số lượng `component` lớn, hầu như những gì bạn cần thì nó đều có trừ khi bạn có một số yêu cầu quá là đặc biệt, Document cũng khá dễ đọc, một điểm nữa mình nhận thấy là nó khá phù hợp để xây dựng các trang admin để quản lý, không quá màu mè, nhưng đầy đủ những thứ mình cần và lại còn xây dựng nhanh nữa. Ok để mình thử dựng một trang admin để xem Element tiện như thế nào nhé :D

Đầu tiên chúng ta cần phải tạo một project nuxt js đã nhé :D. Mình dự tính sẽ làm một trang gồm Header, sidebar, phần tìm kiếm, và bảng danh sách (quản lý user hay sản phẩm) và phân trang.
### Thực Hiện

#### Sidebar 
Bạn chỉ cần lên  [trang chủ](https://element.eleme.io/#/en-US) của `element UI` rồi chọn `Component` bạn sẽ thấy nó hiện ra một đống `Component`, mình tiếp tục chọn `Layout Container` và tìm một component mà mình thấy vừa ý rồi cóp đoạn code về thôi. Ở đây mình sẽ tạo một file có tên là `sildebar` ở thư mục `Component` để chứa code của component sliderbar, và import nó vào ở file index.vue trong thư mục page.
#### Header
Tương tự như `Slidebar` ở trên mình cũng tạo một file để chứa code của component header vào import nó vào file index.vue thôi
### Search
ở phần search này mình dùng 2 component đó là `date-picker` và `search`. cũng tạo 2 file để chứa nó và import vào file index. Có một lưu ý nhỏ là mình để 2 component này trên cùng một hàng nên ở file index mình dùng thêm một thẻ div để bao 2 component đó và chỉnh css lại cho nó.
###  List table
Có rất nhiều dạng table để bạn có thể nữa chọn, mình cũng tạo một file tablelist để chứa và import nó vào file index.vue. Có một lưu ý là mình return data của table ở file index nên ở file tablelist mình cần phải `props` để có thể nhận được data.
### Pagination
Bạn cũng tìm từ khóa `Pagination` và chọn một component phù hợp với mình nhé. Mình cũng tạo `Pagination` thành một file giêng và import nó ở file index.vue.

Đây là cấu trúc thư mục component của mình 
![](https://images.viblo.asia/bd1bb6de-4bea-472f-9c73-567831d57f17.png)

Còn đây là đoạn code trong file `index.vue`
```php
<template>
  <div class="container">
    <el-container style="border: 1px solid #eee">
      <slide-bar />

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <Header />
          <span>Tom</span>
        </el-header>

        <el-main>
          <div>
            <div class="search">
              <div class="block">
                  <Datepicker />
                </div>
                <div class="search2">
                  <Search />
                </div>
            </div>

            <table-list
              :tableData="tableData"
            />
          </div>

          <div class="pagination">
            <Pagination />
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
```
Cuối cùng là kết quả đạt được :
![](https://images.viblo.asia/d78ea9bc-daae-40ee-9d73-ee9e28eb3242.gif)

# Kết Luận
Trên đây là phần giới thiệu của mình về thư viện element UI, Các bạn hãy thử làm xem nhé có rất nhiều component đẹp đang chờ mọi người khám phá đấy :D. Bài viết của mình xin được dừng lại ở đây, cảm ơn các bạn đã quan tâm. Mọi ý kiến đóng góp các bạn hãy comment xuống bên dưới để mình được biết và bổ sung cho bài viết hoàn thiện hơn. Một lần nữa cảm ơn các bạn.