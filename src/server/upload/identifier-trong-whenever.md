Trong Rails, khi cần thực hiện 1 task xử lý cron jobs chạy ngầm, hẳn các bạn sẽ nghĩ ngay đến [gem whenever](https://github.com/javan/whenever).

Sử dụng gem này khá đơn giản, chỉ cần add nó vào Gemfile, `bundle install`, định nghĩa những cái jobs của bạn vào `config/schedule.rb` rồi chạy lệnh `whenever --update-crontab`, vậy là những jobs của bạn đã được add vào cron list chờ tới giờ thực thi.

Tuy nhiên bài viết hôm nay của mình không phải nhằm hướng dẫn sử dụng gem whenever, mà mình xin được giới thiệu 1 option khá hay ho của whenever - `identifier`.

### Đặt vấn đề

Khi deploy 1 ứng dụng Rails bằng capistrano hẳn các bạn cũng biết rằng capistrano nó sẽ cho phép quản lý và lưu lại các bản build gần nhất theo timestamp và link current tới bản build mới nhất. 

Giả sử, app của bạn đang sử dụng gem whenever để quản lý các cron jobs. Như vậy mỗi lần deploy bạn phải add thêm lệnh `whenever --update-crontab` để whenever add những cái jobs trong `config/schedule.rb` của crontab list.

Thử deploy 2 - 3 lần và access vào server gõ `crontab -l`. Ôi không, một list các jobs giống nhau được sinh ra theo số lần deploy và chỉ khác nhau ở đường dẫn tới thư mục releases. Nó tương tự như thế này:

```bash
# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_1}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_1} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_1}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700

# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_2}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_2} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_2}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
```

Lí do khá đơn giản, bạn đang đứng trên 1 folder release mới để update-crontab thì nó không có lí do gì để update vào crontab list của folder cũ cả. Điều này có nghĩa là mỗi lần deploy, whenever sẽ sinh ra một list jobs mới và add vào crontab list, cũng có nghĩa là tới giờ chạy jobs sẽ có n jobs tương tự nhau cùng chạy. Điều này quả thật không thể chấp nhận được.

Hmm, vấn đề của chúng ta bây giờ là chỉ cần 1 cái cron job của code ở thư mục release mới nhất. Vậy thì hãy tìm cách xóa những cái job ở thư mục release cũ đi. Quá đơn giản, chúng ta lại có 2 cách xóa:

* `crontab -r`: Nhanh gọn, chính xác. Câu lệnh này sẽ xóa tất cả các jobs đang có trong crontab list. Tuy nhiên, ở local bạn thích xóa gì thì là quyền của bạn. Nhưng khi deploy lên server, crontab list không chỉ có những job của ứng dụng mà nó còn những job khác như theo dõi server, ... Vậy thì cách này không áp dụng được
*  `whenever --clear-crontab`: Cách này có vẻ ổn áp, nó chỉ xóa những jobs được quản lý bởi whenever mà thôi, không đụng chạm đến các jobs của hệ thống

Bây giờ ta add thêm lệnh `whenever --clear-crontab` vào trước lệnh `whenever --update-crontab` mỗi lần deploy. Deploy lại và what? Không có cái jobs nào bị xóa cả 

Không chấp nhận sự thật, bạn access vào server cd tới thư mục current của dự án gõ `whenever --clear-crontab` thì nó chỉ xóa đúng 1 cái job ứng với folder release mới nhất.

### Đi tìm sự thật

Bây giờ hãy cùng xem một số option của whenever

```bash
whenever --help

Usage: whenever [options]
    -i [identifier],                 Default: full path to schedule.rb file
        --update-crontab
    -w, --write-crontab [identifier] Default: full path to schedule.rb file
    -c, --clear-crontab [identifier]
    -s, --set [variables]            Example: --set 'environment=staging&path=/my/sweet/path'
    -f, --load-file [schedule file]  Default: config/schedule.rb
    -u, --user [user]                Default: current user
    -k, --cut [lines]                Cut lines from the top of the cronfile
    -r, --roles [role1,role2]        Comma-separated list of server roles to generate cron jobs for
    -x, --crontab-command [command]  Default: crontab
    -v, --version
```

Để ý 2 cái lệnh mà chúng ta nói nãy giờ là `--update-crontab` và `--clear-crontab` ta thấy có cái option `[identifier], Default: full path to schedule.rb file`. Ơn giời cậu đây rồi!

Mặc định khi ta chạy `whenever --update-crontab` nó sẽ tạo ra các crontab với identifier là đường dẫn tới file schedule.rb tương ứng với phiên bản release mới nhất, và `whenever --clear-crontab` cũng tương tự như vậy.

Trở lại với crontab list ban đầu:

```bash
# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_1}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_1} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_1}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700

# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_2}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_2} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_2}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
```

Ta có thể dễ dàng giải thích được những gì đã xảy ra với các bước chúng ta đã triển khai ở trên, khi deploy 1 phiên bản mới, giả sử là `timestamp_3`, lúc này lệnh `whenever --clear-crontab` sẽ xóa toàn bộ các crontab có identifier là `{your_project_path}/releases/{timestamp_3}/config/schedule.rb`. Và bạn biết đấy, chả có cái crontab nào có identifier như vậy cả. Sau đó, lệnh `whenever --update-crontab` thực thi và nó sẽ tiếp tục sinh ra một list các crontab mới

```bash
# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_1}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_1} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_1}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700

# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_2}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_2} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_2}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700

# Begin Whenever generated tasks for: {your_project_path}/releases/{timestamp_3}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{timestamp_3} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: {your_project_path}/releases/{timestamp_3}/config/schedule.rb at: yyyy-mm-dd hh:mm:ss +0700
```

Cứ như thế, list crontab sẽ càng ngày càng dài theo số phiên bản deploy.

### Giải quyết vấn đề

Sự thật đã phơi bày, vậy thì chúng ta sẽ làm gì để xử lý vấn đề ban đầu đã nêu ra. Tiếp tục sẽ là 2 lựa chọn:

* Lệnh `whenever --clear-crontab` phải được thực thi ở folder release trước đó, tức là bạn phải config step deploy để nó nhảy về folder release trước đó xóa cái crontab cũ đi
* Đặt một cái identifier cố định chứ không dùng default nữa

Cách nào dễ thì mình làm, hãy thử sửa lại trong file config deploy của bạn 2 câu lệnh như sau `whenever --clear-crontab your_identifier` và `whenever --update-crontab your_identifier`. Vào server xóa hết các crontab bị sai nãy giờ đi. Deploy lại vô số lần và bạn sẽ thấy kết quả như mong đợi

```bash
# Begin Whenever generated tasks for: your_identifier at: yyyy-mm-dd hh:mm:ss +0700
0 * * * * /bin/bash -l -c 'cd {your_project_path}/releases/{latest_timestamp} && bundle exec bin/rails runner -e dev '\''your_job'\'''

# End Whenever generated tasks for: your_identifier at: yyyy-mm-dd hh:mm:ss +0700
```

### Cái kết

Nói cho dài nhưng cách làm lại khá đơn giản. Và đơn giản hơn nữa nếu bạn deploy Rails app bằng capistrano thì whenever nó có sẵn cái module `whenever/capistrano`, chỉ cần include nó vào và sử dụng, bạn sẽ không gặp phải những rắc rối mình nêu trên. Còn nếu bạn tự build step deploy và cũng keep phiên bản release tương tự như capistrano thì hi vọng bài viết của mình có ích.