### Như chúng ta biết Role và Permissions là một phần quan trọng của nhiều ứng dụng web. Laravel đã cung cấp rất nhiều pakage để hỗ trợ việc này, và ngày càng được cải thiện. Và với hằng hà những pakage đó, chúng ta nên lọc lựa ra những gói tốt để dùng cho dự án của mình. Vậy bạn sẽ chọn ??? Riêng tôi có 2 sự lựa chọn (phần 1)

## Tại sao chúng ta lại lựa chọn phương án dùng pakage?
Nào, hãy bắt đầu từ Laravel 5.1.11, nó có logic riêng để quản lý các permissions và hầu như không thay đổi nhiều kể từ đó, và chúng ta đã có:
* Gates and Policies
* $this->authorize() method
* @can and @cannot Blade commands
Có thể nói nhiêu đó đã là quá đủ mà không cần dùng thêm pakage bên ngoài, và đó cũng là lý do để thời điểm đó ít có pakage nào được ra đời để hỗ trợ chúng ta tỏng việc quản lý roles, permissions.
Tuy nhiên vẫn có những việc mà chúng ta cần tới sự giúp đỡ từ các gói bên ngoài để quản lý roles, permissions,. và hai pakage sau đây đã chứng tỏ được khả năng của chúng:
* Laravel-permission của Spatie
* Bouncer của Joseph Silber
> Đặc biệt chú ý: santigarcor / larratust, là một phiên bản của Untrusted Entrust, cũng là một pakage không tồi. Vấn đề với Laratrust là nó thay thế các lệnh Laravel mặc định bằng lệnh của riêng nó, do đó bạn sẽ không thể sử dụng cú pháp của Gates hoặc @can. Thay vào đó, bạn cần sử dụng lệnh $ user-> can ('edit-user') hoặc @permission Blade. Nhưng nếu bạn không quan tâm đến những phần cú pháp phụ, Laratrust là một gói tuyệt vời. Nó còn có thêm chức năng Teams, không có trong gói của Spatie hoặc Bouncer.
Ngoài ra có một vài lựa chọn, nhưng có vẻ như đã lỗi thời. Tuy nhiên, bạn có thể xem xét chúng, biết đâu một ngày đẹp dời bạn lại cần đến nó thì sao:
* Zizaco / entrust
* Romanbican / roles
* Kodeine / Laravel-acl

Không tào lao nữa, chúng ta cùng đi thẳng vào nghiên cứu hai pakage đã đề cập bên trên.
## Các gói này thực sự làm những gì?
Họ cung cấp cho bạn một API để hỗ trợ quản lý roles, permissions một cách dễ dàng hơn. Ngoài ra, code của bạn nhìn sẽ trong sáng và thân thiện hơn rất nhiều.
Thay vì tạo tất cả các rules trong Policies và Gates, bị phân mảnh ở nhiều nơi khác nhau, bạn sẽ có code như sau:
```
$user->givePermissionTo('edit articles'); // Spatie package
$user->allow('ban-users'); // Bouncer package
```
Về cơ bản, hai gói cung cấp chức năng tương tự như nhau, với cú pháp và cấu trúc cơ sở dữ liệu hơi khác nhau chút xíu. Hãy đào sâu hơn và so sánh.
## Cài đặt và sử dụng
Cả hai gói đều được cài đặt tương tự nhau:
* Cài đặt bằng lệnh composer
* Thêm vàoprovider facade (Bouncer) trong file config / app.php.
* Publish và chạy migrations.
* Thêm trait vào UserModel (cả hai gói đều sử dụng trait trong UserModel)
Mặc định framwork đã cung cấp cho chúng t bảng User, xong để quản lý roles và permission thì tùy vào từng ứng dụng, bạn hãy thiết lập bảng và các trường cho phù hợp nhé.
Cả hai pakage đều có doc cụ thể và dễ hiểu, các bạn hãy đọc qua chúng nhé!
## Cấu trúc Database
![](https://images.viblo.asia/7d800646-bee7-4980-a870-4fc1ab4ccc04.png)
Xin giải thích qua một chút:
* Trường guard_name chứa giá trị mặc định web, cho phép pakage có thể sử dụng nhiều guard
* Như bạn thấy có 2 pivot table, một cho roles, một cho permissions, và cả hai đều có quan hệ với users
* Trường model_type có giá trị mặc định App\User, vì thế sẽ không có khóa ngoại đến bảng users, không có bảng nào khác có trường user_id
## Còn giờ cùng xem cấu trúc DB của pakage Bouncer
![](https://images.viblo.asia/b6a67a5b-5074-4519-9435-ec6946ab1ff6.png)

Có một chút khác biệt, thậm chí các quan hệ còn ít hơn so với cấu trúc bên trên, và chúng ta cùng xem nào:
* Cái mà Spatie gọi là permissions thì Bouncer gọi là abilities.Và bảng permissions là một tập hợp các abilities liên kết với các entuty
* Entity (trong tất cả các bảng) là một đối tượng có abilities, Nó có thể là một Role hoặc một user. Do đó nó không có mối quan hệ trực tiếp tới bảng user hay khóa user_id. Điều này thì khá giống với pakage Spatie
* Trường abilities.title, abilities.only_owned, roles.level cũng không xuất hiện trong pakage trên.
* Spatie có các guard mà trong Bouncer không có.

Túm lại cấu trúc của Bouncer có vẻ phức tạp hơ chút xíu và khiến chúng ta khó nắm bắt lúc đầu. Tuy nhiên điểm mạnh của nó là linh hoạt hơn.

Hôm sau mình sẽ tiếp tục phần 2 và giời thiệu với mọi người về các phương thức của 2 pakage. Xin cảm ơn các bạn đã quan tâm theo dõi :)))