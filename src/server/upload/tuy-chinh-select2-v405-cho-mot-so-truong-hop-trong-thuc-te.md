*Bài viết này xuất phát từ thực tiễn làm việc. Các phương pháp trình bày trong bài viết chưa chắc đã tối ưu, và phù hợp cho mọi tình huống trong thực tế. <br>*
*Bài viết thực hiện dựa trên thư viện Select2 phiên bản v4.0.5.*<br>
## Tình huống
Tạo select box chọn tên tỉnh thành ở Việt Nam.<br>
Sử dụng thư viện Select2 phiên bản 4.0.5, với thuộc tính multiple, closeOnSelect (false) cho select box.
<br>
**Kết quả:**
![](https://images.viblo.asia/b75ccd20-6d4d-4fe3-8db6-422a99447f8d.png)

*Example Code:*
```
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <div class="form-group row">
          <%= label_tag "province","Select province: ", class: "col-md-4 form-control" %>
          <%= select_tag "province", options_for_select(@provinces), {class: "col-md-7 js-example-basic-multiple",
            multiple: "multiple",
            data: {close_on_select: false, placeholder: "Click To Select"}
          } %>
        </div>
      </div>
    </div>
  </div>
  <script>
    $(document).ready(function() {
      $('.js-example-basic-multiple').select2();
    });
  </script>
```

## Vấn đề đặt ra và giải pháp<br>
### Vấn đề 1: Scrollbar
*Khi chọn một tỉnh thành trong dropdown của select box thanh cuộn tự động nhảy về top. Tương tự cho trường hợp bỏ chọn trên dropdown*  
<br>
+ Yêu cầu: không nhảy về top mà dừng ở vị trí hiện tại vừa chọn/ bỏ chọn.
<br>
![](https://images.viblo.asia/3e4220ef-abd0-4c63-80c6-f2dde50f5d76.gif)
<br>
+ Giải pháp:
<br>
Ở đây, tôi chú ý đến 4 sự kiện của thư viện select2 sẽ xảy ra khi thực hiện chọn trên dropdown, đó là: select, selecting , unselect và unselecting. Do đó, để giải quyết vấn đề, tôi cần tùy biến lại 4 sự kiện này.  Việc tùy biến được thực hiện như sau:<br>
```
  <script>
    $(document).ready(function() {
      $('.js-example-basic-multiple').select2({})
        .on("select2:select", function(e) {
          setScrollTopForDropDown(e);
        })
        .on("select2:selecting", function(e) {
          setScrollTopForSelectBox(e);
        })
        .on("select2:unselect", function(e) {
          setScrollTopForDropDown(e);
        })
        .on("select2:unselecting", function(e) {
          setScrollTopForSelectBox(e);
        });

      function setScrollTopForDropDown(e){
        $(".select2-results__options").scrollTop($(e.currentTarget).data("scrolltop"));
      };

      function setScrollTopForSelectBox(e){
        $(e.currentTarget).data("scrolltop", $(".select2-results__options").scrollTop());
      };
    });
  </script>
```
Khi chuẩn bị lựa chọn một tỉnh thành trong dropdown, thì sự kiện *selecting* sẽ thay đổi giá trị thuộc tính *scrolltop* (vị trí hiện tại của vertical scrollbar) của dropdown bằng giá trị này của select box; khi lựa chọn thì sự kiện *select* sẽ thay đổi giá trị thuộc tính *scrolltop* của select box bằng giá trị này của dropdown. Vì vậy, thanh scrollbar sẽ không chạy trượt về top như ban đầu nữa. Điều này cũng tương tự cho việc bỏ lựa chọn tỉnh thành trên dropdown với sự kiện *unselecting và unselect*.<br>
### Vấn đề 2: Dropdown display
*Khi bỏ chọn một tỉnh thành từ select box, dropdown vẫn hiển thị*
<br>
+ Yêu cầu: Không hiển thị dropdown khi bỏ chọn ở select box. 
<br>
![](https://images.viblo.asia/3496c735-de1b-4cb4-9b76-a90f953689d2.gif)
<br>
+ Giải pháp:
<br>
Vì liên quan đến bỏ chọn và hiển thị dropdown nên tôi chú ý đến sự kiện *unselecting và open* của thư việc select2. Các thay đổi được thực hiện như sau:
<br>
```
    $(document).ready(function() {
      $('.js-example-basic-multiple').select2({})
        .on("select2:select", function(e) {
          setScrollTopForDropDown(e);
        })
        .on("select2:selecting", function(e) {
          setScrollTopForSelectBox(e);
        })
        .on("select2:unselect", function(e) {
          setScrollTopForDropDown(e);
        })
        .on("select2:unselecting", function(e) {
          $(this).data("state", "unselected");
          setScrollTopForSelectBox(e);
        })
        .on("select2:open", function(e) {
          if ($(this).data("state") === "unselected") {
            $(this).removeData("state");
            $(this).select2("close");
          }
        });

      function setScrollTopForDropDown(e){
        $(".select2-results__options").scrollTop($(e.currentTarget).data("scrolltop"));
      };

      function setScrollTopForSelectBox(e){
        $(e.currentTarget).data("scrolltop", $(".select2-results__options").scrollTop());
      };
    });
  </script>
```
Ở sự kiện *selecting*, tôi thay đổi giá trị thuộc tính *state* của select box là *unselected* nhằm mục đích xác nhận hành động đã bỏ chọn. Trong sự kiện *open*, tôi sẽ kiểm thuộc tính này của select box nếu *state* là *unselected* thì tôi xóa giá trị *state* hiện tại và thực hiện đóng dropdown lại. Như vậy vấn đề đã được giải quyết.
### Vấn đề 3: Dropdown Position
*Khi chọn nhiều tỉnh thành, số lượng chọn vượt quá độ rộng của select box. Lúc này, các lựa chọn sẽ được đẩy xuống dòng trong select box. Lúc này, vị trị của dropdown không sát select box. Tương tự cho việc bỏ chọn dropdown.*
<br>
+ Yêu cầu: Dropdown luôn ở vị trí với select box.
<br>
![](https://images.viblo.asia/ed8b8a80-9827-42ce-99a7-f258f523c3b8.png)

![](https://images.viblo.asia/e6c34292-a7d6-43bd-b7e7-8900f456e57c.png)
<br>
+ Giải pháp:
<br>
Ở hình trên, có thể thấy việc lựa chọn nhiều tỉnh thành sẽ làm chiều cao của select box tăng lên do các phần tử được lựa chọn rơi xuống dòng mới. Hoặc khi bỏ chọn vị trí của dropdown không phù hợp với select box. Để khắc phục vấn đề này, tôi cần cập nhật lại vị trí cho dropdown so với vị trí của select box trong các sự kiện *select, selecting, unselect, unselecting*.<br>
```
  <script>
    $(document).ready(function() {
      $('.js-example-basic-multiple').select2()
        .on("select2:select", function(e) {
          setScrollTopForDropDown(e);
          updatePositionSelect2Result(this);
        })
        .on("select2:selecting", function(e) {
          setScrollTopForSelectBox(e);
          updatePositionSelect2Result(this);
        })
        .on("select2:unselect", function(e) {
          setScrollTopForDropDown(e);
          updatePositionSelect2Result(this);
        })
        .on("select2:unselecting", function(e) {
          $(this).data("state", "unselected");
          setScrollTopForSelectBox(e);
          updatePositionSelect2Result(this);
        })
        .on("select2:open", function(e) {
          if ($(this).data("state") === "unselected") {
            $(this).removeData("state");
            $(this).select2("close");
          }
        });

      function setScrollTopForDropDown(e){
        $(".select2-results__options").scrollTop($(e.currentTarget).data("scrolltop"));
      };

      function setScrollTopForSelectBox(e){
        $(e.currentTarget).data("scrolltop", $(".select2-results__options").scrollTop());
      };

      function updatePositionSelect2Result(el){
        $(el).data("select2").dropdown._positionDropdown();
      };
    });
  </script>
```
Hàm *updatePositionSelect2Result* dùng để cập nhật lại vị trí cho dropdown bằng sử dụng hàm *_positionDropdown()* của thư viện select2 để cập nhật. Và gọi hàm ở 4 sự kiện *select, selecting, unselect, unselecting*.
## Kết quả
![](https://images.viblo.asia/9dfbe59b-baa3-4fc3-ad09-ecdf798419a1.gif)
Cuối cùng, các vấn đề cũng được giải quyết bằng cách tùy biến lại các sự kiện trong thư viện select2. <br>
Hy vọng bài viết có thể giúp các bạn giải quyết được vấn đề nêu trên khi sử dụng thư viện select2 phiên bản v4.0.5 hoặc có thể gợi ý cho các bạn một giải pháp để giải quyết các vấn đề khi sử dụng thư viện này.<br>
Cảm ơn sự theo dõi và góp ý của các bạn.
*Nguồn tham khảo: https://select2.org/ ; https://stackoverflow.com/*