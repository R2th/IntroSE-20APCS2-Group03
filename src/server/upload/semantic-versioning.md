Bài viết xuất phát từ một lần tò mò xem `change log` của một extention khá quen thuộc là [chat++](https://github.com/wataridori/chatpp/blob/master/changelogs.md). Khi xem `change log` ở repo này mình thấy quy tắc đánh version khá **linh tinh**. Ví dụ như đang ở **5.6.3** nhảy lên luôn **5.7.0** mà không phải là **5.6.4**. Sau một thời gian tìm tòi cũng như hỏi ngu thì mình được một người anh chỉ cho keyword `Semantic versioning` để giải thích cách đặt version cho mỗi lần `release`.

Nhưng trước khi giải thích "công thức" đánh version kia thì chúng ta tìm hiểu trước một chút về  `Semantic versioning` xem chúng là gì ? và giải quyết mục đích gì đã nhé.

# 1. Semantic versioning ra đời như thế nào ?
Chuyện rằng trong một ngày đẹp trời, mình cần thực hiện việc lấy ra thông tin của các ca sĩ sao hạng A để phục vụ mục đích hiện thị trên trang web của mình. Thật may là sau một thời gian tìm kiếm thì cũng có một dịch vụ, mình tạm gọi là dịch vụ X có cung cấp một API hiển thị toàn bộ danh sách thông tin của các ca sĩ này. 

Khi thông tin của API này thì mình có thể liệt kê ra một vài thành phần đánh chú ý như sau:
* URL API:  https://xxx/list-singer
* METHOD: GET
* Response: 
```php
{
  "id": 1,
  "name": "Ưng Hoàng Hôn",
  "company": "XXX"
  ...
},
{
  "id": 2,
  "name": "Sơn Tường MTP",
  "company": "YYY"
}
{
  "id": 3,
  "name": "Chi Peo",
  "company": "ZZZ"
}
```
Vậy là trong code của mình chỉ việc tiến hành call API về gán vào một biến có tên `singers`
```php
    $client = new \GuzzleHttp\Client();
    $request = $client->get('https://xxx/list-singer');
    $singers = $request->getBody();
    
    Ở ngoài view hiển thị dữ liệu dạng 
    @foreach($singers as $singer)
    <tr>
        <td>{{ $singer->name }}</td>
        <td>{{ $singer->company }}</td>
    </tr>
    @endforeach
```

Vậy là ngon, mình đã hoàn thành việc liệt kê ra các ca sĩ dựa trên một API được public. Nhưng sau một thời gian sau, vào trang web mình tự nhiên thấy xuất hiện lỗi dạng `name undefined`. Sau một hồi debug thì mình phát hiện ra đầu API kia đã thay đổi `format response` trả về.
```php
// Before
{
  "id": 1,
  "name": "Ưng Hoàng Hôn",
  "company": "XXX"
  ...
},
// After
{
data: {
      "id": 1,
      "name": "Ưng Hoàng Hôn",
      "company": "XXX"
      ...
    },
status: 200,
},
```
Vậy là mình vừa sửa bug vừa viết email chửi bên cung cấp, rằng tại sao mày lại thay đổi reponse code dẫn đến hệ thống của tao bị lỗi. Và được bên cung cấp rằng trong quá trình vận hành, có một bên client cần cung cấp thêm `status code` và vài thứ khác nên đội dev đã phải tiến hành thay đổi response.

Dựa trên câu chuyện không có thật ở trên ta có thể nhận ra 2 vấn đề về cách phát triển một API như sau.
1. Phía `client`, cụ thể là nhà phát triển phải phụ thuộc vào response của API dẫn đến khi API thay đổi, `client` cũng thay đổi theo. Chúng ta thử tưởng tượng một service của chúng ta cần gọi tới 100 bên vendor cung cấp API, vậy là công việc của dev là chỉ ăn và sửa code theo response của các API.
>  Vẫn đề này gọi là Dependency hell - Phụ thuộc một cách bị động
2. Về phía `vendor` cung cấp API, họ sẽ phải cẩn thận hơn trong quá trình thay đổi response trả về, làm sao để dù có thêm `response` - như câu chuyện trên là status thì không ảnh hưởng tới logic code của các bên `client`. Nhưng thật khó để có thể `chiều lòng` tất cả các bên vendor nên có một số bên cung cấp API họ đành lựa chọn cách không cải thiện response gì thêm, đúng với tiêu chí: `Nếu nó đang hoạt động, đừng sửa nó`.
> Vẫn đề này gọi là version lock - Không phát triển được thêm.

Để giải quyết vấn đề trên, các nhà phát triển trên họ đã nghĩ đến việc đánh version cho những lần `thay đổi`. Làm sao để mỗi lần có một thay đổi response, ở đây tạm coi là một lần release, họ sẽ cung cấp thêm một version mới để đảm bảo việc sẽ không ảnh hưởng bở version cũ.
Ví dụ như ở trên đầu bài chúng là có 
* URL API:  https://xxx/list-singer

Bây giờ sau khi đánh version cho các lần release thì URL sẽ thay đổi theo dạng **v1**
* URL API:  https://xxx/v1/list-singer

Khi có sự thay đổi sẽ cung cấp **thêm** một version nữa **v2** chẳng hạn
* URL API:  https://xxx/v2/list-singer
Để không ảnh hưởng tới việc gọi API của các `client` cũ mà vừa có thể phát triển được version mới.

Hoặc khi chúng ta install một package dạng 
```
"laravelcollective/html": "5.8.0",
```
Sau khi nhà phát triển phát hành version `5.9.0`
thì cũng không ảnh hưởng tới version hiện tại đang dùng.


# 2. Quy tắc đánh version
Ở phần trước chúng ta đã nói đến việc cần thiết phải đánh `version` nhưng chưa có một quy tắc cụ thể nào cả. Việc không có quy tắc sẽ gặp một vài vấn đề nhỏ, ví dụ như khi trong quá trình maintain, việc sửa một số logic nhỏ nhưng không ảnh hưởng đến logic cũ thì có cần thiết phải nâng version hay không.

Quy tắc đánh version đầu tiên do [Tom Preston-Werner](https://tom.preston-werner.com/) tạo ra, anh ấy cũng là người phát minh ra `Gravatar` và đồng chủ sở hữu `GitHub`.
![](https://images.viblo.asia/f98a861a-b848-4b9c-9464-7e0e86460db4.jpg)

                                          Ảnh: wikipedia

Quy tắc này dựa trên 3 con số chính `MAJOR`, `MINOR`, `PATCH`.
Nó tương ứng với 3 con số trong việc định nghĩa version của 1 API hoặc 1 package.

![](https://images.viblo.asia/27de3bdb-1662-45eb-a83c-f948df0a5b3c.png)

Để giải thích cho 3 keyword trên chúng ta đi vào ví dụ cụ thể sau.

- Phiên bản đầu tiên `/v1/users/:id`, chúng ta viết một api trả về dữ liệu như sau:
```php
{
   "id": 1,
   "name": "sunh"
}
```
- Sau đó chúng ta cần thêm một thông tin về tuổi chẳng hạn, ta cập nhật lại thành.
```php
{
  "id": 1,
  "name": "sunh",
  "age": "24"
}
```
=> Bản api mới này chỉ thêm trường "age", còn 2 trường cũ vẫn tương thích với bản trước đó nên đây gọi là `MINOR change` , đại loại là những thay đổi không làm ảnh hưởng đến phần cũ đang hoạt động. Và như vậy, api version vẫn giữ nguyên là v1.

 Sau đó, ta nhận thấy trả về tuổi kiểu string là một lỗi, ta sửa lại nó thành số.
=> Bản api mới này chỉ sửa lại kiểu dữ liệu, sửa một lỗi nhỏ, không thêm gì mới và vẫn tương thích với bản trước đó nên gọi đây là `PATCH` (bản vá). Và như vậy api version vẫn giữ nguyên là v1.

Đến một lúc nào đấy, chúng ta thấy api mình cần trả nhiều thông tin khác hơn là chỉ thông tin người dùng.
```php
{
  "data": { "id": 1, "name": "sunh", "age": 24 },
  "meta": {
     "source": "foobar"
  }
}
```
=> Bản api mới này hoàn toàn khác với v1 đang chạy, nếu chúng ta sửa code, các phần các đang gọi sẽ oẳng. Vậy nên chúng ta phải viết một api mới đánh đấu là /v2/users/:id. Đây là `MAJOR` hay `breaking change`, thay đổi không tương thích với bản cũ.

Vậy túm lại là 

* `MAJOR`: Đại diện cho việc thay đổi lớn, không tương thích với bản cũ.

* `PATCH`: Đại diện cho những thay đổi nhỏ, vẫn tương thích với bản cũ, thường thay đổi sẽ là `update` gì đó. Nó làm mình liên tường đến `PUT`, `PATCH` trong `Http request methods`.

* `MINOR`: Đai diện cho những thay đổi nhỏ, vẫn tương thích với bản cũ, nó sẽ khác với `PATCH` là thay vì `update` một cái gì đó sẽ thành `create` một cái gì đó.

Dựa vào việc giải thích trên, chúng ta có thể hoàn toàn dựa vào hoàn cảnh của từng lần release khác nhau để quyết định tăng `MAJOR`, `PATCH` hay `MINOR`.

# 3. Một số lưu ý trong việc sử dụng Semantic versioning
Một số lưu ý đánh version được định nghĩa trong [semver](https://semver.org/). Mình xin phép lược dịch lại.
1. Phần mềm sử dụng `Semantic versioning(semver)` **phải** là một `public API`. Tuy nhiên với các `internal api` mình nghĩ các bạn cũng nên đánh version để khi `deploy zero time` nếu bạn xây dựng BE và FE ở 2 repo riêng biệt. Cái này nói ra cũng hơi dài. Nên bạn nào muốn tìm hiểu thêm thì comment xuống dưới mình giải thích nhé.


2. Một version định nghĩa đúng **phải** bao gồm 3 số X.Y.Z tương ứng với `MAJOR`, `PATCH`, `MINOR`. Mỗi phần tử phải tăng dần `1.9.0 -> 1.10.0 -> 1.11.0`. Từ giờ khi gọi X, Y, Z chúng tầm nhầm hiểu là các con số bên trên. Những con số này **phải** là số nguyên dương và không có số 0 đằng trước. 
```php
// Good
1.1.1
1.0.0
// Bad
1.01.01
1.-1.-1.
1.00.00
```


3. Khi một `package` đã được release. **Không được phép** tiến hành thay đổi nội dung trong `version` đó, mà **phải** release ở một `version` khác. **Dù sự thay đổi là nhỏ nhất.**


4. `Major version zero(0.y.z)` dành cho việc phát triển. Đây **không** được coi là một bản ổn định cho việc sử dụng.


5. `Version 1.0.0` định nghĩa cho việc `release` lần đầu tiên. Việc quyết định X, Y, Z sẽ tăng lên trong những lần release tiếp theo phụ thuộc vào các hoàn cảnh khác nhau.


6. `Patch version Z (x.y.Z | x > 0)` **phải** được tăng lên cho mỗi lần sửa lỗi. Cái này mình có nói ở phần trên rồi.


7. `Minor version Y (x.Y.z | x > 0)` **phải** được tăng lên nếu có gì đó mới, mà tương thích với bản cũ. Nó cũng **phải** được tăng lên nếu một chức năng nào đó trong API không dùng đến. Nó **có thể** được tăng nên nếu có cải tiến trong code. `Patch version` phải reset về **0** nếu `Minor version` tăng lên.


8. `Major version X (X.y.z | X > 0)` **phải** được tăng lên nếu có sự thay đổi lớn, không tương thích với bản cũ. Nó **có thể** bao gồm cả sự thay đổi của `Y, Z`. `Patch` và `minor` phải được reset về **0** nếu `X` được tăng lên.


9. Các bản `pre-release` **có thể** biểu diễn thêm bằng cách thêm kí tự gạch ngang **(-)** đi kèm với kí tự `ASCII`. Bản `pre-release` báo hiệu rằng đây **không phả**i là một `version` hoàn chỉnh. Ví dụ như `1.0.0-alpha, 1.0.0-alpha.1, 1.0.0-0.3.7, 1.0.0-x.7.z.92, 1.0.0-x-y-z.–.`.


10. Mức độ ưu tiên của các phần mềm sử dụng `semver` **được** định nghĩa như sau 
* Mức độ ưu tiên phụ thuộc vào độ lớn của X, Y, Z từ trái qua phải. Ví dụ `1.0.0 <2.0.0 <2.1.0 <2.1.1`

* Mức độ ưu tiên của version `release` được ưu tiên hơn so với phiên bản `pre-release`. Ví dụ `1.0.0-alpha < 1.0.0` 

* Mức độ ưu tiên của các version `pre-release` cũng được đánh giá từ trái qua phải, số với số, chữ với chữ. Ví dụ như `1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0`

  
# 4. Tổng kết
Trên đây mình đã giới thiệu cho các bạn tại sao phải đánh version cho từng lần release và sử dụng `Semantic versioning`. Khi đã có am hiểu về việc đánh `version` chúng ta sẽ tránh mắc phải những sai xót trong những lần `release`. Đánh giá được những sự thay đổi có ảnh hưởng đến logic hay không.

`Semantic` cũng không phải là nguyên tắc đánh version duy nhất,  ngoài ra nó còn kiểu đánh toàn number, gồm 4 phần nữa : `Major.Minor.Revision.Build`. Các bạn có thể tìm hiểu thêm nhé.

Dựa trên kiến thức của bài viết, chúng ta cũng phần nào giải thích được tại sao `chat++`  đang ở **5.6.3** nhảy lên luôn **5.7.0** mà không phải là **5.6.4** rồi đúng không.

Cảm ơn các bạn đã theo dõi bài viết, nếu bài viết hữu ích các bạn ấn `upvote` để ủng hộ mình và `follow` để nhận thông báo mỗi khi mình có bài viết mới nhé
# 5. Tham khảo
**Donate cho tác giả** : **[Buy me a coffee](https://www.buymeacoffee.com/su.lowkey)**

Bài viết của mình bao gồm cả sự tìm hiểu, đóng góp ý kiến của các thành viên trong `Avengers Group`để bài viết hoàn thiện hơn. Ngoài ra cũng được tham khảo từ tài liệu chính thức [Semantic Versioning](https://semver.org/). Các bạn có thể lên đó đọc thêm.