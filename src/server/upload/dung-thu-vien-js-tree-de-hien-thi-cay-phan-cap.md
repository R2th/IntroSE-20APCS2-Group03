## **I. Giới thiệu**

jsTree là 1 thư viện jquery, cung cấp cho chúng ta các hàm tiện ích để thao tác với cây phân cấp. Nó hoàn toàn miễn phí, là mã nguồn mở và được phân phối theo giấy phép MIT. jsTree có thể dễ dàng được mở rộng, nó hỗ trợ các nguồn dữ liệu HTML và JSON, AJAX.
Bài viết này tôi sẽ giới thiệu cho các bạn cách sử dụng thư viện jsTree ở trong rails và để cách bạn hiểu thì tôi sẽ làm 1 ứng dụng nho nhỏ, đó là ứng dụng về quản lí folder.

## **II. Nội dung**



Đầu tiên các bạn cần tạo ứng dụng mới và migarate ra 1 bảng `folders`.

`rails g model Folder name parent_id:integer`

Câu lệnh trên sẽ tạo ra 1 bảng folders trong DB của chúng ta. Để ý đến cột parent_id, vì ví dụ của tôi sẽ là duyệt cây thư mục cho nên cấu trúc DB cũng là cây thư mục. Trong 1 folder có thể có 1 hoặc có nhiều folder con. Vì vậy tôi sẽ dùng trường parent_id để lưu id của folder cha cho 1 folder. Nếu nó bằng nil tức là nó không có folder cha nào cả.

Với việc có cây phân cấp thì chúng ta cũng cần có 1 bảng dữ liệu để phục vụ cho việc duyệt cây, đó là bảng lưu trữ hệ thống phân cấp folder, có tên là folder_hierarchies. Sử dụng lệnh:

`rails g migration create_folder_hierarchies`

rồi sửa trong migration vừa tạo ra như sau:

```
class CreateFolderHierarchies < ActiveRecord::Migration[5.1]
  def change
    create_table :folder_hierarchies, id: false do |t|
      t.integer :ancestor_id, null: false
      t.integer :descendant_id, null: false
      t.integer :generations, null: false
    end

    add_index :folder_hierarchies, [:ancestor_id, :descendant_id, :generations],
      unique: true,
      name: "folder_anc_desc_idx"

    add_index :folder_hierarchies, [:descendant_id],
      name: "folder_desc_idx"
  end
end
```

Nhưng thế kia là chưa đủ, để phục vụ cho việc tạo cây thư mục, chúng ta không nên làm thủ công cho lâu. Ở đây tôi sẽ dùng thư viện để có các hàm duyệt cây thư mục, tạo thư mục trong thư mục bằng dòng lệnh, đó là thư viện `closure_tree`.

Chúng ta thêm vào bằng cách thêm dòng sau trong Gemfile và chạy bundle sau khi thêm:

`gem "closure_tree"` .

Nói sơ qua về thư viện này 1 chút. Nó hỗ trợ cho chúng ta 1 số hàm tiện ích để tạo ra cây thư mục, duyệt cây thư mục. Ví dụ như sau:

- Tạo 1 Folder: `grant_parent = Folder.create(name: "GrandParent")`
- `parent = grant_parent.children.create(name: "Parent")`

Nhìn vào hàm children ở ví dụ trên. Thư viện đã hỗ trợ cho chúng ta 1 cách ngắn gọn để tạo ra 1 thư mục con của thư mục grant_parent mà không phải truyền giá trị parent_id vào câu lệnh create. Ngoài ra nó còn hỗ trợ 1 vài hàm khác, các bạn có thể tham khảo [tại đây](https://github.com/ClosureTree/closure_tree)

Sau đây đi vào phần chính là duyệt cây thư mục và hiển thị của gem jsTree. Việc đầu tiên là chúng ta phải tạo dữ liệu giả. Các bạn gõ 1 vài dòng lệnh sau trong rails console để tạo ra vài folder như sau:
- `folder = Folder.create(name: "Folder")`
- `folder1 = folder.children.create(name: "Folder 1")`
- `folder2 = Folder.children.create(name: "Folder 2")`
- `folder1.children.create(name: "folder 3")`
- `folder2.children.create(name: "folder 4")`

Sau đó để sử dụng thư viện, chúng ta cần phải thêm thư viện vào trong Gemfile: 

`gem "rails-assets-jstree", source: "https://rails-assets.org"`

Chạy `bundle install` để cài đặt thư viện.

Thêm `//= require jstree`  vào trong file `app/assets/javascripts/application.js`.

Và thêm `*= require jstree` và trong file `app/assets/stylesheets/application.css`.

Có 2 cách để các bạn có thể dùng với thư viện jsTree, tôi sẽ giới thiệu cả 2 cách cho các bạn:

Cách 1: jsTree với HTML.

Tạo controller `folders_controller` như sau:

```
class FoldersController < ApplicationController
  def index
    @folders = Folder.all
  end
end
```

Nhớ tạo resource link cho action trên nhé. Thêm vào file `config/routes.rb` như sau:

`resources :folders, only: :index`

Các bạn vào link sau: http://jsfiddle.net/vakata/2kwkh2uL/
Các bạn sẽ nhìn thấy đoạn code:

```
<div id="container">
  <ul>
    <li>Root node
      <ul>
        <li>Child node 1</li>
        <li>Child node 2</li>
      </ul>
    </li>
  </ul>
</div>
```
Chúng ta để ý toàn bộ cây phân cấp hiển thị trong 1 thẻ ul và các node thì hiển thị ở trong thẻ li. Vì vậy chúng ta cũng phải làm giống với format hiển thị của jsTree hỗ trợ nhé. Ở đây tôi sẽ viết ra 1 helper để làm được điều như trên, và tôi sẽ sử dụng thuật toán đệ quy để in ra các folder.

Sửa file `application_helper.rb` như sau:

```
module ApplicationHelper
  def display_folders folders
    ret = ""
    ret += "<ul>"
    folders.each do |folder|
      if folder.parent_id == nil
        ret += "<li> #{folder.name}"
        ret += find_all_subfolders(folder)
      end
    end
    ret += "</ul>"
    ret
  end
   def find_all_subfolders folder
    ret = ""
    if folder.children.size > 0
      ret += "<ul>"
      folder.children.each do |sub_folder|
        ret += "<li> #{sub_folder.name}"
        ret += find_all_subfolders(sub_folder)
        ret += "</li>"
      end
      ret += "</ul>"
    end
    ret
  end
end
```

Thêm dòng `has_closure_tree` vào trong file `folder.rb`

```
class Folder < ActiveRecord::Base
  has_closure_tree
end
```

Tạo html cho trang index ứng với action index của controller, ở đây tôi sẽ sử dụng slim template để code. Thêm vào file index.slim như sau:

```
.container
  = display_folders(@folders).html_safe
```

Việc tiếp theo là thêm 1 đoạn javascript ngắn gọn vào để thư viện jsTree hiển thị cây phân cấp động, tức là click vào folder cha thì sẽ show ra folder con.

Trong file `application.js` thêm đoạn code sau:

```
$(document).on("ready page:load", function(){
  $('.container').jstree({
    plugins: ['themes'],
    themes: {
      theme: 'default'
    }
  });
});
```

Vậy là đã xong cách 1, các bạn tự chạy thử nhé :D .

Cách 2: jsTree với JSON

Ở trong file `application_helper.rb` chúng ta viết 1 hàm chuyển dữ liệu từ ActiveRecord sang Json. Chúng ta chỉ dùng 1 vài trường cụ thể

```
module ApplicationHelper
   def to_json_tree folders, folder_selected = Folder.root.try(:id)
     folders.map do |f|
       {id: f.id, text: f.name, parent: (f.parent_id || "#"), state: {selected: f.id == folder_selected}}
     end
   end
 end
```

Trong action index của controller, viết như sau:

```
class FoldersController < ApplicationController
   def index
     @folders_tree = Folder.roots
     respond_to do |format|
       format.html
       format.json{render json: to_json_tree(Folder.all)}
     end
   end
 end
```

Ở file index.slim thì chỉ cần tạo 1 div đơn giản:

```
#container
```

Giờ thì chúng ta viết javascript theo syntax của jsTree để có 1 cây folder phân cấp hiển thị trên trang index, thêm vào application.js:

```
$(document).on("turbolinks:load", function() {
   initFolderTree.init();
 })

 var initFolderTree = {
   constructor: {
     trigger: "#container",
   },
   init: function(){
     var self = this;
     var constructor = self.constructor;
     if ($(constructor.trigger).length > 0){
       $(constructor.trigger).jstree({
         "core": {
           "data": {
             "url": "/folders",
             "dataType": "json"
           }
         }
       });
     }
   }
 }
```

Vậy là đã xong cách 2, các bạn tự bật rails server lên để chiêm ngưỡng thành quả nhé :D