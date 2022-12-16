Đây là bài dịch, bài gốc mời các bạn xem ở đây: https://rubyroidlabs.com/blog/2016/02/capistrano-tools/


-----
Các developer Rails luôn cố gắng sử dụng Capistrano để tránh phải cực nhọc trong việc deploy ứng dụng của mình. Đây là 1 công cụ tuyệt với với rất nhiều lựa chọn cho developer từ cơ bản đến nâng cao. Nhưng có 1 cái khó khi sử dụng Capistrano là có quá nhiều gem, cũng như thông tin nên mỗi khi cần, chúng ta sẽ mất nhiều thời gian để tìm ra thứ mình thực sự cần. Vậy nên trong bài viết này tôi sẽ  tổng hợp 1 vài tool mà tôi thường dùng.

## 1. capistrano-db-tasks
Hãy thử nhớ lại những lần ứng dụng của bạn chạy được ở local nhưng lại bỗng dưng trả ra lỗi 500 trên staging/production. Việc này xảy ra rất nhiều và bạn phải thực hiện đi thực hiện lại mấy thứ dưới đây để tái hiện bug:
1. ssh to remote server
1. check DB username and password
1. dump database
1. scp the dump to local machine
1. restore the database from dump

Đây là không phải toàn bộ công việc mà bạn phải làm, mà chỉ là liệt kê mấy bước những đã rất nhàm chán phải không. Để thay đổi điều này thì đây là `capistrano-db-tasks `  1 gem sẽ tiết kiệm thời gian và tiền bạc của chúng ta. Nó cho phép tận dụng config trong file `deploy.rb` và `database.yml` để thực hiện hết đống việc nhàm chán trên kia.
`Capistrano-db-tasks` đã có hầu hết những thứ bạn cần, vậy nên việc cài đặt chỉ đơn trong 2 bước đơn giản sau:

1: Thêm vào Gemfile:
```
 gem "capistrano-db-tasks", require: false 
```
2: Thêm vào `deploy.rb`:
```
 require "capistrano-db-tasks"
```

Vậy là xong, chạy `cap production db:pull` để copy remote database về máy local của bạn. Sử dụng `cap production db:push` bạn có thể đẩy dữ liệu từ local lên remote. Những hay đảm bảo rằng tất cả thành viên trong team bạn hiểu cách sử dụng tool này. Nếu không, tốt hơn hết, hãy tắt chức năng push đi bằng cách setting biến `disallow_pushing` thành `true`.

Thêm nữa, bạn có thể copy cả assets từ server về nếu bạn cần chúng để tái hiện bug. Sử dụng bằng cách bật 2 cài đặt sau: `assets_dir` và `local_assets_dir` trong file `deploy.rb` 

## 2. capistrano-maintenance
Trong trường hợp lí tưởng, quá trình phát triển tức thì, và không có downtime. Nhưng trong thực tế, bạn có thể rơi vào các trường hợp không thể tránh khỏi downtime hoặc nó sẽ tốn nhiều thời gian và tiền bạc hơn. Trong trường hợp này, bạn phải có sự chuẩn bị trước cho công việc của mình.

Rất nhiều công ty thực hiện việc test toàn bộ hệ thống trên staging và thông báo với người dùng qua email nhưng lại quên mất việc phải làm trang thông báo bảo trì. Trong thực thế, trang bảo trì là thứ quan trọng nhất để người dùng hiểu được lý do hệ thống ngững hoạt động. Người dùng sẽ không nghĩ là hệ thống bị hỏng, mà nó đang được cập nhật và sẽ trở nên tốt hơn sau khi cập nhật.

Để đơn giản hơn trong việc này, có 1 gem tên là `capistrano-maintenance`, chúng ta sẽ cùng cài đặt nó từng bước một nhé.

Sau khi cài đặt gem, bạn cần cài đặt thêm config của nginx như sau:
 ```
error_page 503 @503;
 
# Return a 503 error if the maintenance page exists.
 
if (-f /var/www/domain.com/shared/public/system/maintenance.html) {
 
return 503;
 
}
 
location @503 {
 
# Serve static assets if found.
 
if (-f $request_filename) {
 
break;
 
}
 
# Set root to the shared directory.
 
root /var/www/domain.com/shared/public;
 
rewrite ^(.*)$ /system/maintenance.html break;
 
}
```

Chúng ta sử dụng nginx để kiểm tra file `.../maintenance.html` và nếu có nó, khi có lỗi 503 sẽ hiển thị trang này cho người dùng. Bây giờ bạn có thể sử dụng capistrano để bắt đầu quá trình bảo trì rồi:
```
cap maintenance:enable REASON=”hardware upgrade” UNTIL=”12pm Central Time”
```
Và kết thúc quá trình bảo trì:

```
cap maintenance:disable
```


Hiểu được đoạn cài đặt trên của nginx, chúng ta có thể dễ dàng đoán được công việc mà capistrono maintenace sẽ làm.

Khi chúng ta bật bảo trì, file `maintenance.html` sẽ được tạo ra trên server. Nginx thấy có file này và hiển trị trang bảo trì thay vì chạy vào ứng dụng.

Sau khi tắt bảo trì, file `maintenance.html`  được xóa khỏi server và nginx sẽ hoạt động bình thường như trước.


## 3. capistrano_deploy_lock
Các team phát triển lớn sẽ có tốc độ hoàn thành sản phẩm nhanh hơn nhưng sẽ  bên cạnh đó cũng dễ gặp phải những vấn đề xung đột trong phát triển hơn.

Quá trình deploy là 1 bước quan trọng, nó nên được điều chỉnh, phân bổ 1 cách cẩn thân. Hãy tưởng tượng nếu 2 dev cũng deploy 1 lúc. Nếu nhẹ thì 1 trong 2 người sẽ bị fail trong quá trình deploy. Nhưng nếu xấu hơn thì team của bạn sẽ mất rất nhiều thời gian để sửa lỗi phát sinh do quá trình xung đột khi deploy.

`capistrano_deploy_lock` là 1 gem được tạo ra để tránh những trường hợp như trên.  Đại thể, khi bạn bắt đầu deploy, capistrano.locl.yml sẽ được tạo ra trong thư mục `shared`. Khi quá trình deploy bị crash, hoặc kết thúc, nó sẽ bị xóa đi lập tức.

Nếu có 2 người cùng deploy 1 lúc, khi người này bắt đầu, sẽ tạo ra file capistrano.lock.yml và bắt đầu deploy. Người còn lại bắt đầu deploy, nhưng vì đã có file capistrano.lock.yml nên quá trình deploy của người thứ 2 sẽ bị dừng lại, và trả về thông báo như sau:
```
*** Deploy locked 3 minutes ago by ‘y.kaliada’

*** Message: Deploying master branch

*** Expires in 12 minutes
```

Finally, if you have some urgent fixes, you see a name of the developer, who does the deploy right now and you can contact him pretty fast. It will save you a lot of time if you have more than 5 developers in a Team.

 

## 4. Monit integration
Monit được coi là một công cụ tuyệt vời để giữ cho toàn bộ ứng dụng tồn tại trong những khoảnh khắc quan trọng. Công việc chính của nó là giám sát các quy trình và khởi động lại chúng trong trường hợp có bất kỳ rắc rối nào. Nghe có vẻ rất dễ dàng nhưng chắc chắn nó đòi hỏi cả team phải hiểu cách nó hoạt động.

Hãy tưởng tượng khi cài đặt monit on server và bắt đầu deploy. Trong quá trình deploy, sidekiq bị tắt đi, monit được thông báo và bật lại sidekiq, sau đó cuối quá trình deploy, capistrano lại cố gắng bật sidekiq lần nữa. Chúng ta có vấn đề rồi đây.

Nhưng hầu hết các loại gem được phổ biến đều có tích hợp capistrano-monit rồi. Câu chuyện trên được biết đến rộng rãi và đã được sửa bởi các nhiệm vụ tiện ích cho capistrano để vô hiệu hóa hoặc kích hoạt tính năng đơn lẻ vào thời điểm thích hợp trong quá trình deploy. Hơn thế nữa nó cho phép tạo ra các tập tin config monit cho các gem như sidekiq và puma.

Hãy lấy sidekiq làm ví dụ trong quá trình cài đặt. 
Trước hết chúng ta sẽ phải cài đặt capistrano-sidekiq gem. 
Sau đó chúng ta phải thêm Capfile:
```
require 'capistrano/sidekiq'
require 'capistrano/sidekiq/monit' #to require monit tasks
```

Khởi tạo mẫu config monit cho sidekiq:
```bundle exec rails generate capistrano:sidekiq:monit:template ```

 Điểu chỉnh config, và bạn đã sẵn sàng để deploy. Mỗi lần deploy, config monit sẽ được cập nhật và nó sẽ không bao giờ làm hỏng quá trình deploy của bạn.

## 5. airbrush
**Nếu bạn sử dụng capistrano 3.5+ thì không cần đọc phần này, airbrush đã được tích hợp sẵn**

Capistrano là một công cụ khá chi tiết, nhưng tiết không có nghĩa là có thể đọc được. May mắn thay, chúng ta có những công cụ phụ để giúp đọc được log. Ở đây, airbrush giúp phân tích thông tin 1 cách trực quan và phù hợp, cho phép chúng ta tìm kiếm và đọc các bản ghi nhanh chóng và tiện dụng. 

Cài đặt có thể hòan thành nhanh chóng bằng vài bước sau:

1: Thêm vào Capfile
```
require "airbrussh/capistrano" 
```

2: Xóa khỏi deploy.rb nếu có:

```
set :format, :pretty 
```
Vậy là bạn đã có 1 trang log đẹp hơn trong quá trình deploy, dưới đây là ví dụ của kết quả deploy:
![](https://images.viblo.asia/30ad274a-f24c-4051-9aae-9dcb5d225f98.png)

## Tổng kết
Sẽ là không dễ dàng để mò kim đáy bể, nhưng bằng kinh nghiệm có thể giúp chúng ta loại bỏ những công cụ không cần thiết và tìm kiếm được những thứ thực sự tốt, nó sẽ giúp chúng ta tốt hơn qua mỗi ngày đi làm. Bây giờ bạn đã biết cách lấy dữ liệu từ production, cách làm người dùng thoải mái hơn trong quá trình bảo trì, phân bổ deploy trong 1 team lớn. Sử dụng monit hiệu quả hơn và bảo vệ mắt và thời gian của bạn cho những công việc trong tương lai. Sử dụng những công cụ trên sẽ giúp ích cho bạn nhiều cho việc cải thiện hiệu năng cũng tốc độ phát triển.