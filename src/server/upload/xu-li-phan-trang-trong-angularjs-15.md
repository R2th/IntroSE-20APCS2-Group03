## Đôi lời về phân trang
Phân trang là một chức năng rất đỗi quen thuộc trong việc lập trình web, tùy theo mục đích và nhu cầu sử dụng, có nhiều tư tưởng phân trang khác nhau:

1. Phân trang toàn bộ trên client
2. Phân trang kết hợp giữa client và API

Với cách phân trang toàn bộ trên client, tư tưởng của việc này chính là sử dụng 1 request duy nhất để get data từ API về. sau đó xử lí thuần phân trang trên client( ví dụ như sử dụng javascript).

**Ưu điểm**: 
* Chỉ cần sử dụng 1 request để lấy data
* Khi chuyển các page phân trang không cần load lại dữ liệu, khiến cho giao diện trở nên mượt mà hơn.

**Nhược điểm**: Ưu điểm cần ít request cũng chính là nhược điểm lớn nhất của phương pháp này, khi có data lớn, việc lưu trữ tất cả data tại client và tiến hành phân trang sẽ rất cồng kềnh, thời gian response toàn bộ data trong lần request đầu tiên có thể rất chậm, gây ảnh hưởng xấu đến người dùng.

Trong bài lần này, tôi xin được chia sẻ cách phân trang theo tư tưởng thứ 2: kết hợp giữa client và API ( với ví dụ client sử dụng angularJs 1.5 và API sử dụng Rails)
Với cách phân trang này, mỗi khi chuyển page phân trang, sẽ có một request gửi lên API để lấy đúng 1 lượng data ở page đó.

**Ưu điểm**: 
* Giảm gánh nặng của client khi data quá lớn
* Giảm lượng data không cần thiết ( nhưng page phân trang mà người dùng chưa xem đến)

**Nhược điểm**: 
* Cần phải request data mỗi khi chuyển trang.
* Phức tạp hơn khi muốn thêm các chức năng cần toàn bộ data như "search".

Lần này chúng ta sẽ sử dụng `Pagination Directive` để phân trang.

Install:

`bower install angular-utils-pagination`

hoặc với npm:

`npm install angular-utils-pagination`

## Sử dụng: (ví dụ phân trang 1 danh sách các member)
### Tại view html
```
<div dir-paginate="member in members | itemsPerPage: pagerOptions.perPage" total-items="pagerOptions.total" current-page="pagerOptions.current_page">
    
</div>
<dir-pagination-controls on-page-change="pageChanged(newPageNumber)"></dir-pagination-controls>
```
### Tại controller angular
Trong đoạn controller điểu khiển phần html phía trên, chúng ta thêm những dòng sau:
```

var current_page = 1;
$scope.pagerOptions = {
  current_page: 1,
  perPage: 25,
  total: 0,
};
function getMember(page) {
      $scope.pagerOptions.current_page = page;
      current_page = page;
      Members.get({page: $scope.pagerOptions.current_page, per_page: $scope.pagerOptions.perPage}).then(function(data) {
       $scope.members = data.users;
       $scope.pagerOptions.total = data.total_count;
 }
 $scope.pageChanged = function(newPage) {
  if(current_page !== newPage) {
    getMember(newPage);
  }
};
getMember(current_page);
```
\* Member.get ở trên sẽ request lên API với params bao gồm: page, per_page.

* Function pageChanged có nhiệm vụ get data mới khi người dùng chuyển trang.
* Function GetMember sẽ phụ trách vấn để get data từ API và gán vào các biến phục vụ cho view.
* \$scope.pagerOptions khởi tạo các biến quan trọng khi phân trang:page hiện tại, số lượng record trên 1 phân trang, tổng sổ lượng record.
### Xử lí trên API
Cuối cùng là phần xử lí trên API:
```
# app/controller/members_controller.rb
class MembersController < ApplicationController
    def index
        @total = Member.all.size
        @members = Member.page(params[:page]).per(params[:per_page])
    end
end
```
(Xử dụng gem [kaminari](https://github.com/kaminari/kaminari) để phân trang trong API)
```
#app/view/member/index.json.jbuilder
json.array!(@members) do |member|
  json.extract! member, :id, :name, :email
  json.set! :image
end
json.set! :total_count, @total
```
Hi vọng, bài viết này sẽ giúp đỡ được những người mới tiếp xúc với angular 1.5 xử lí phân trang một các hiệu quả
### Link tham khảo

Pagination Directive: https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination