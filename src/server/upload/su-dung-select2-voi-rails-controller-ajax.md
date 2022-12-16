Chào các bạn, hôm nay chúng ta cùng tìm hiểu về select2 nhé. Nội dung của bài viết này bao gồm các phần như sau:
* Giới Thiệu: Tổng quan về select2, khi nào thì cần sử dụng select2
* Cách cài đặt
* Cách sử dụng select2 bình thường.
* **Cách sử dụng select2 với AJAX và dữ liệu load ra màn hình là 1000 records trở lên**.

Chúng ta cùng bắt đầu nhé.
# Giới thiệu
`select2` là một plugin JQuery sử dụng để thay thế select box bình thường, nó có ưu điểm gì mà lại sử dụng nhỉ?
- Giúp bạn `vừa typing vừa search dữ liệu` ngay trên select box, điều mà select box thông thường không làm được.
- Hỗ trợ sẵn các option để `custom lại chính select2` cho phù hợp với yêu cầu của từng dự án.

Muốn mường tượng được select2 khi chạy như thế nào thì vào link này xem nhé: https://select2.org/getting-started/basic-usage

# Cách cài đặt
Thường sẽ có 2 cách cài đặt là `thông qua CDN` hoặc `download source` về bỏ vào trong thư mục javascripts. Tất nhiên cách lựa chọn tuỳ thuộc bạn muốn gì, tuy nhiên nên download source về nhé các bạn. Vào link sau download về và bỏ vào thư mục javascripts nhé:
https://github.com/select2/select2/blob/develop/dist/js/select2.full.min.js

**VD:** nếu bạn bỏ cái `select2.full.min.js` trên vào thư mục `app/assets/javascripts/libs/` thì ở thư mục `application.js` phải require nó vào nhé. Dùng `//= require ./libs/select2.full.min.js` là được.

# Cách sử dụng select2 thông thường
Giả sử ta có trang Edit User, trên trang này có select2 để chọn cho những user đó các địa điểm làm việc (`WorkingLocation`). Thì:
***
Trong Controller ta sẽ có:
```
def edit
  @user = User.find_by id: params[:id]
  @working_locations = WorkingLocation.pluck(:name, :id)
end
```

Lúc này trong view vẫn dùng f.select như bình thường (`select2 sẽ được raise trong file js`):
```
<div>
  <%= f.select :working_location_id, options_for_select(@working_locations, selected: f.object.working_location_id), {include_blank: false}, {id: "working-location-select"} %>
</div>
```

Ngang đây thì bạn đã có 1 select box bình thường như trước đến giờ, nếu muốn biến nó thành `select2` thì: Trong file JS thêm:
```
$('#working-location-select').select2();
```

Thế là xong, đã biến select box thông thường thành select2, giờ bạn có thể vừa typing vừa search tên `WorkingLocation` rồi đấy.

# Cách sử dụng select2 với AJAX và load dữ liệu 1000 records

Trong cách sử dụng trên, để ý rằng khi ta `@working_locations` ra thì ta phải load tất cả. Giả sử record bạn chưa nhiều thì không sao, chứ data tầm 1000 records trở lên thì khi vào trang hoặc F5 lại trang sẽ `rất lâu` vì ta `phải load tất cả 1000 records ra đổ lên select2` mà.

Nên việc giải pháp ở đây là gì? **Chính là:**
* Ban đầu khi hiển thị ta chỉ load ra `limit 20 records` thôi.
* Nhưng khi User bắt đầu nhập search thì ta sẽ `không search trong 20 records này` mà sẽ gọi đến controller và `search trong 1000 records trên`.
* Sau khi search xong sẽ gửi về lại cho select2 để hiện thị data vừa search được và `vẫn limit 20 records`

Tóm lại: `Vẫn cung cấp chức năng search của select2 trên toàn bộ dữ liệu, nhưng limit record hiển thị ra màn hình`

***
Trong file JS lúc này, ta sửa lại select2 để nó hoạt động với AJAX, chi tiết có thể tìm hiểu trong link sau: https://select2.org/data-sources/ajax

```
$('#working-location-select').select2({
    width: '100%',
    ajax: {
      url: '/users/find_working_location',
      dataType: 'json',
      data: function(params) {
        var selectedLocationId = $(this).val();
        return { search_content: params.term, selected_location_id: selectedLocationId }
      },
      processResults: function(data) {
        return { results: data.results };
      }
    },
    templateResult: formatResult,
    templateSelection: formatSelection,
  }).trigger('change');
  
function formatResult(station) {
    return station.name;
 }
 
 function formatSelection(station) {
   return station.text || station.name;
 }
```

Cùng tìm hiểu sơ qua các options trên của `select2` là cái gì nhé.
* `width`: Là một options cho phép độ rộng của select2 tràn đầy div, nếu thấy select-box không full div thì truyền vào cho nó full div cho đẹp nhé.
* `ajax`: Là options cho phép custom lại select2 và gửi request đến server thông qua các tham số bên trong nó.
* `url` : URL của server chúng ta, trong trường hợp bài viết này là gửi lên server. Vào action `find_working_location` để lấy dữ liệu theo ý mình.
* `data`: Là function cho phép gửi params kèm theo khi request lên server thông qua option `url` . Ở đây chúng ta gửi `selectedLocationId` cho trường hợp đối với trang Edit User, user sẽ có sẵn `working_location_id` rồi, chúng ta không gửi kèm `working_location_id` lên để search là sai spec nhé các bạn.
* `processResults`: Là dữ liệu `select2` sẽ nhận từ server gửi về và hiển thị lên màn hình (Lưu ý từ `results` nhé, bên server phải gửi về format json với cấu trúc {results: []} y chang thì select2 mới nhận.
* `templateResult`: Quy định dữ liệu hiển thị lên select box.
* `templateSelection`: Quy định khi select thì sẽ lấy dữ liệu gì trong phần `results` được gửi về.

Giờ thì ta qua controller để định nghĩa thêm action `find_working_location` nhé:

```
def edit
  @user = User.find_by id: params[:id]
  @working_locations = WorkingLocation.limit(20).pluck(:name, :id)
end

def find_working_location
  if search_content = params[:search_content].presence # Vì bên select2 gửi qua params search_content nên kiểm tra nếu có thì ta search
    # Ta sẽ search trong tất cả records xem có record nào nội dung "like" nội dung đã search không, nếu có lấy limit 20 thôi nhé.
    working_locations = WorkingLocation.where("name like ?", "%#{search_content}%").limit(20)
  elsif selected_working_location_id = params[:selected_location_id].presence # Trong trường hợp trang edit User đã nhắc ở trên
    # Lấy ra working_location đã được chọn từ trước và thêm nó vào 20 record được lấy ra ngẫu nhiên.
    selected_working_location = WorkingLocation.find_by id: selected_working_location_id
    results = WorkingLocation.where.not(id: selected_working_location.id).take(19).unshift selected_working_location
  else # Trường hợp không search, không select từ trước, load ra 20 records đầu tiên
    results = WorkingLocation.limit 20
  end

  render json: {results: results.as_json(only: [:name, :id])}
end
```

Rồi thế là xong rồi đấy, chúng ta đã cùng nhau tìm hiểu cách sử dụng select2 với AJAX và còn bonus thêm `giải pháp cho 1000 records trên select2` nữa.

**Xin lưu ý là code trên mình viết thẳng ra luôn, không có tách hàm ra cho đẹp với mục đích dễ theo dõi, nên các bạn nếu áp dụng thì refactor lại cho đẹp nhé. Cảm ơn các bạn rất nhiều, hẹn gặp lại ở bài viết tiếp theo.**