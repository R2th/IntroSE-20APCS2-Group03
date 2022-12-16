# Introduction

## Introduction to Heroku

Đối với những developer lập trình Ruby on Rails, Heroku hẳn không phải là 1 cái tên xa lạ. Heroku là 1 nền tảng `platform as a service (PaaS)` cho phép developer có thể build, run, vận hành app trên môi trường Cloud. Thực ra Heroku không chỉ hỗ trợ mỗi ngôn ngữ Ruby mà còn support nhiều ngôn ngữ khác như Python, Java, PHP, NodeJS nhưng 1 lý do đơn giản mà hầu như Ruby dev nào cũng biết Heroku vì nó được giới thiệu nằm chình ình ngay đầu quyển `Rails tutorial` - sách nhập môn cho Ruby on Rails dev. Ngoài ra heroku là 1 nơi rất tiện để triển khai các project nhỏ khi chỉ cần dùng account free cũng có thể deploy 1 Rails app cá nhân, support 2 dynos (khái niệm do heroku đưa ra - có thể hiểu như 2 server instance), đủ để chạy 1 web app service + worker. Account Heroku free support sub-domain luôn, tiện cho việc set url các loại webhook, phù hợp để triển khai mấy cái tool nhỏ, 1 vài con BOT hay crawler.

## Heroku sample mini-project

Một format mini Rails project nhỏ khá phổ biến có thể chứa các phần sau:
- 1 web app server
- 1 worker - sidekiq, resque ...
- batch để lập lịch chạy mấy cái task định kì

Nhìn qua thì cũng thấy bình thường chẳng có gì nhưng bắt tay vào làm thì lại phát sinh 1 số vấn đề

Account free của heroku chỉ cho xài max là 2 dyno thôi nhưng cái đống trên có vẻ tốn 3 dyno rồi. Nếu xài tới cái dyno thứ 3 là mất tiền - không vui tí nào với dân xài chùa. Để xử lí cho việc này mình có tìm 1 số solution như sau:
- Chấp nhận hy sinh bớt 1 trong 3 thứ, lý do là thực ra cái tool mình nghịch mình không có ý định lúc nào cũng phải chạy full cả 3 thứ. Việc quyết định xài 2 dyno free này cho mục đích gì thì sẽ được quyết định trong file `Procfile` - chuyên dùng để định nghĩa command được thực thi trên các dynos khi server được deploy. Chi tiết xem tại [https://devcenter.heroku.com/articles/procfile#deploying-to-heroku](Profile)

- Sau 1 hồi điều tra thì Heroku có support `one-off dyno`. Dyno này được dùng khi muốn chạy 1 số lệnh trên heroku dynos remote từ local như `rake task` hay `rails runner` chẳng hạn. Dynos chỉ được sinh ra khi bạn có yêu cầu chạy remote từ local thôi nên khi lệnh bạn muốn thực hiện remote hoàn thành xong, dynos này cũng tự động tắt luôn chứ không keep như dyno web hay dyno worker được chỉ định trong `Procfile`.
Tác dụng của `one-off dyno` này khá phù hợp với nhu cầu của mình do mình có ý định lên 1 cái lịch 5 phút chạy lại 1 cái rake task nho nhỏ. Mình sẽ lập lịch bằng `crontab` và cứ 5 phút sẽ chạy lệnh để tự động bật cái `one-off dyno` lên, chạy `rake task`, xong việc thì `one-off dyno` tự ngắt. Mặc dù cách làm này chưa ổn vì vẫn dính dáng đến máy local nhưng ít ra cái `one-off dyno` không charge thêm phí cho cái account free của mình. Heroku chỉ tính thêm số h mà `one-off dyno`bị bật lên để thực thi tác vụ vào 1000h free mỗi tháng / tất cả các dynos của account free.

Đến đây thì vấn đề ban đầu của mình tương đối là giải quyết được rồi nhưng mình cảm thấy không thoả mãn với việc vẫn bị dính dáng đến máy local nên thử vọc vạch thêm tí nữa. Trong lúc mình thử không chạy web server nữa mà chỉ chạy 1 dynos batch với 1 dynos worker thôi thì phát hiện ra 1 vấn đề quan trọng - `Heroku không cho mình xài crontab`

# Scheduled Jobs and Custom Clock Processes

## Concept

Việc lập lịch để thực hiện 1 công việc chỉ định vào 1 thời điểm được xác định từ trước hay lặp đi lặp lại công việc định kì là 1 trong những xử lí phổ biến và thường thì chúng ta nghĩ ngay đến giải pháp đầu tiên là xài `crontab`. Tuy nhiên Heroku cho rằng `crontab` không phù hợp với môi trường `horizontal scalable` như Heroku. Thay vào đó họ đề xuất 1 giải pháp mà họ cho rằng mạnh mẽ và cơ động hơn là `clock process`. 1 clock process sẽ chạy 1 singleton process để đánh thức các công việc cần thực hiện sau 1 khoảng thời gian nhất định. Khi kết hợp với `background worker`, nó sẽ tạo nên 1 phương thức rõ ràng và có thể mở rộng (extendable) cho việc lập lịch.

Theo quan điểm trên, việc lập lịch 1 job và thực thi job đó tại thời điểm đã định là 2 công việc độc lập. Việc tác riêng phần thực thi job khỏi việc lập lịch giúp làm rõ ràng nhiệm vụ của mỗi phần và giúp hệ thống dễ cấu trúc hơn. Ý tưởng của việc này là sử dụng `job scheduler` chỉ để đẩy các `background work` vào `queue` chứ không thực hiện chúng. 1 `background worker` sẽ nhận công việc xử lí những job được đẩy vào `queue` bởi `scheduler`

![Clock process](https://s3.amazonaws.com/heroku-devcenter-files/article-images/732-imported-1443570270-Screen-20shot-202012-04-30-20at-202.28.04-20PM.png)

## Heroku Scheduler

Để xử lí cho vấn đề clock process này, Heroku cung cấp add-on Heroku Scheduler. Đây là 1 công cụ miến phí (yeah) để support cho công việc lập lịch trên Heroku dyno. Chi tiết về add-on này xem tại https://devcenter.heroku.com/articles/scheduler

Cách cài đặt và sử dụng add-on này khá đơn giản, có thể tham khảo tại article trên. Tuy nhiên dưới đây là 1 số chú ý.

- Mặc dù Scheduler là 1 free add-on nhưng về bản chất nó sẽ xài 1 `one-off dyno`, tức là vẫn count vào 1000h xài free trên tổng số dyno hàng tháng của bạn. (Cái này vẫn chấp nhận được)
- Bạn có thể thiết lập job cần chạy thông qua 1 màn hình dashboard GUI đẹp đẽ, tuy nhiên nó chỉ cho bạn cấu hình chạy job theo các format frequency định sẵn: daily, hourly, every 10 minutes. Đây là 1 tập lựa chọn quá nghèo nàn và trên thực tế mình còn đang muốn lập job chạy từng phút :(

Ngoài ra theo như thông báo từ heroku do đây là hàng free nên sẽ có xác suất xẩy ra 1 số lỗi sau (mặc dù sẽ hiếm khi bị)
- Job bị skip
- Job bị chạy 2 lần

Đến mức này thì hơi bị cùi bắp.

# Solution for scheduling at Heroku

## Custom clock process

Trên thực tế Heroku còn được dùng trong cả các dự án công ty với account trả phí nên mình không nghĩ rằng nó lại support tệ đến vậy. Cũng có thể là hàng free nên chỉ được nhiêu đó thôi. Xem 1 hồi document của Heroku cuối cùng mình phát hiện cái cần tìm:　`custom clock process`

Trên trang web của heroku có viết

```
Custom clock được implement trên rất nhiều ngôn ngữ.
Việc định nghĩa clock process cũng rất đơn giản.
Đây là ví dụ cho Profile của 1 Nodejs app kinh điển.

web:    node web.js
worker: node worker.js
clock:  node clock.js
```

Về cơ bản là có vẻ có solution thay thế để không phải dùng cái Scheduler add-on của Heroku nhưng mà cái quan trọng nhất là nội dung cái clock process đấy đâu. Bản thân cái ví dụ đã là cho Nodejs chứ không phải Rails mà thậm chí cũng không thấy nội dung cái file clock.js.

## Clockwork

Tiếp tục search google cho clock process cho Ruby on Rails, cuối cùng mình đã tìm được cái mình muốn: `gem clockwork`

https://github.com/Rykian/clockwork

 Cách sử dụng gem này rất đơn giản, việc sử dụng ở mức cơ bản chỉ cần lướt qua sample trong README của github là đủ hiểu. Áp dụng cho mục tiêu mình muốn là chạy 1 cái rake task nho nhỏ 5 phút 1 lần, mình chỉ cần tạo 1 file clock.rb với nội dung kiểu như sau:

 ```Ruby
 require 'clockwork'
 require './config/boot'
 require './config/environment'

 include Clockwork

 handler do |job|
   puts "Running #{job}"
 end

 every(ENV["JOB_INTERVAL"].to_i.minute, 'sample.job') {
   `bundle exec rake sample:all`
 }
 ```

 Với cách settings như thế này mình thậm chí còn có thể chỉnh thời gian giữa 2 lần chạy job tuỳ ý theo biến môi trường `JOB_INTERVAL`. Tiện thể thì biến môi trường trên Heroku ngoài việc setting thông qua heroku-cli thì cách trực quan dễ dùng nhất là vào trang console quản lí của heroku để cài đặt giá trị cho biến môi trường. Trước kia khi lên lịch kiểu n phút 1 lần như thế này này, thường thì mình sẽ update thẳng file cronjob hoặc sử dụng 1 gem support đặt lịch như `whenever` nhưng kể cả có dùng `whenever` thì vẫn cần chạy tay 1 lệnh của `whenever` để cập nhật lại cronjob. Còn bây giờ, chỉ cần vào trang console của Heroku change setting biến môi trường là được.

 Sau khi tạo xong file `clock.rb` như trên bạn chỉ cần thiết lập `clockwork clock.rb` cho dyno để chạy 1 clockwork dyno là được. Vẫn còn 1 vấn đề cuối là vẫn tốn 3 dyno nhưng lần này solution khá đơn giản. Lúc trước mình không tài nào cho web server và worker chạy chung trên 1 dyno nhưng không tài nào chạy được. Có vẻ như heroku đã thiết lập để bắt buộc chúng phải chạy trên 2 dyno riêng. Mấy giải pháp lúc trước thì phần batch - lập lịch toàn dùng `one-off dyno` nên cũng không gộp được phần batch đi kèm với dyno web hay dyno worker. Nhưng hiện tại sau khi xài `clockwork` mình đã có thể gộp được phần xử lí của worker và batch trên cùng 1 dyno. Setting `Procfile` như sau:

```Ruby
# Profile
web: RAILS_ENV=production bundle exec puma -C config/puma.rb
worker: sh ./lib/heroku_worker.sh
```

Lệnh thực thi trên dyno worker sẽ là chạy file `./lib/heroku_worker.sh`. Bản thân file `./lib/heroku_worker.sh` khi chạy thì sẽ chạy cả phần batch và worker luôn

```Ruby
# ./lib/heroku_worker.sh
#! /bin/bash
RAILS_ENV=production clockwork clock.rb &
RAILS_ENV=production bundle exec sidekiq -c 5
```

# Conclusion

Như vậy là sau 1 hồi điều tra, search mạng cuối cùng mình cũng tìm ra 1 solution mà mình khá ưng ý để triển khai cái Rails app nho nhỏ của mình. 1 số thứ rút ra sau công cuộc tìm kiếm này

- Heroku không support setting crontab mà dùng clock process thay thế
- Có thể xài add-on schedule của heroku để lập lịch nhưng phải chấp nhận hạn chế
- Để có thể lập lịch thoải mái, bạn nên dùng custome clock process, gem support mà mình tìm được là `clockwork`
- Có thể gộp chung phần batch (scheduler) và worker chạy trên 1 dyno để đỡ tốn thêm phí, nhất là khi bạn chỉ muốn xài chùa =))