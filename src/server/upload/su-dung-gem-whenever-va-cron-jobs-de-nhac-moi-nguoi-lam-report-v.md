#  Cron là gì 
:stopwatch: :stopwatch: :stopwatch:

+Trên Windows, Task Schedule dùng để chạy các lệnh theo một chu kỳ xác định, tương tự với Linux chúng ta có Cron.

+Cron là một tiện ích giúp lập lịch chạy những dòng lệnh bên phía server để thực thi một hoặc nhiều công việc nào đó theo thời gian được lập sẵn. Một số người gọi những công việc đó là Cronjob hoặc Crontab.

Cronjob là các lệnh thực thi hành động đặt trước vào thời điểm nhất định.
Crontab là nơi lưu trữ các cronjob.

Đấy, lý thuyết là như vậy. Nhưng với rails, cụ thể là trong bài này chúng ta sẽ sử dụng gem whenever để thay thế cho crontab 
#  :gear: Chuẩn bị và cài đặt 
## Gem whenever
Như đã nói trên, gem whenever là một gem trong rails giúp triển khai thực hiện cronjobs trong linux, thực hiện công việc tự động hóa theo chu kì mà ta có thể cấu hình. Khi sử dụng gem whenever thì cũng giống như trên terminal ở linux ta sử dụng crontab -e để add công việc và hẹn lịch chạy. Nói cách khác Whenever là 1 cái đồng hồ báo thức và chúng ta có thể cài đặt thời gian trong schedule.rb
Phần này mình sẽ chỉ nói về Gem whenever, nên nếu các bạn muốn tham khảo thêm về crontab của Linux thì mình để link ở đây: https://viblo.asia/p/lap-lich-tasks-tren-linux-su-dung-crontab-6J3Zg28MKmB

Đầu tiên, add `gem 'whenever', require: false` vào Gemfile rồi thực hiện câu thần chú quen thuộc "bundle install".

Lúc này một file config/schedule.rb sẽ tạo ra. Đây là chỗ mình hẹn giờ giấc cụ thể để cho các job chạy định kỳ.

Để Linux có thể hiểu đc file schedule.rb và update vào trong crontab, ta lại thực hiện 
```
$ whenever --update-crontab
```
Xong!
.... à mới xong cái môi trường để chạy các job thôi, bây giờ mới đi tạo job nè! 
# :level_slider: Tiến hành tạo và thực hiện tác vụ

Như tiêu đề. Mình muốn tạo ra một cái đồng hồ báo thức để tự động nhắc nhở mọi người trong team/group/... làm report theo định kỳ. Cái đồng hồ này sẽ được tích hợp trong một trang web hoặc phần mềm nội bộ và được sử dụng bởi tất cả members trong team/group/.. 
OK! Đã hiểu vấn đề cần giải quyết phải không nào? Vậy cùng bắt tay vào tạo cái đồng hồ đó thôi! Let's go!
## Tạo tác vụ
Bạn có thể thực hiện được một số thứ với gem whenever, với từng loại tác vụ như:
```
job_type :command, ":task :output"
job_type :rake,    "cd :path && :environment_variable=:environment bundle exec rake :task --silent :output"
job_type :runner,  "cd :path && bin/rails runner -e :environment ':task' :output"
job_type :script,  "cd :path && :environment_variable=:environment bundle exec script/:task :output"
```
Ở đây, để dễ hiểu thì mình sẽ tạo job và thực hiện bằng `job_type :rake` nhé! Việc chạy bằng runner có thể gọi task và task sẽ thực hiện tính toán và gọi đến job cần chạy. Nếu muốn các bạn cũng có thể gọi trực tiếp, nhưng việc này sẽ không minh bạch nếu như tham số truyền vào job cần phải tính toán trước và phức tạp. 
Đầu tiên bạn cần tạo một job bằng câu lệnh

```$ rails generate job member_notify```

Ok, một file member_notify.rb được tạo ra. Bây giờ thì cùng "cốt" vào dòng cơ bản nhé

![](https://images.viblo.asia/fee6e3d5-06e2-40c0-87e8-febfbbe690f0.png)



Tiếp theo là tạo một file member_notify.rake ở trong list tasks và "cốt" vào đấy thêm vào dòng nữa :female_detective::female_detective::female_detective:

![](https://images.viblo.asia/bc9deea3-7f38-4d04-88fa-1db3f88f1dc5.png)

Xong rồi đấy. Tác vụ đã có, bây giờ cùng đi hẹn giờ thôi!

## Tiến hành - hẹn giờ :alarm_clock:

Còn nhớ file schedule.rb lúc nãy được tạo ra khi chạy gem whenever không nào? Ok mở nó lên và thêm vào đây vài dòng như sau
![](https://images.viblo.asia/27b02ca0-fefd-4deb-8e40-0f8a74f9573d.png)

Và tiếp theo là...... xong rồi đấy. :D Chỉ đơn giản như vậy thôi :D

Vậy, syntax hẹn giờ ở đây là gì ? 
![](https://images.viblo.asia/69c6e52c-33c4-4ec0-9236-a69965822e0d.png)

Trên hình chúng ta có 5 dấu * và thứ tự của chúng tương ứng từng đơn vị cho thời gian. Theo như file schedule của chúng ta thì cứ 0h00 ngày 28 hàng tháng nó sẽ gọi thằng task member_notify ra và chạy những dòng lệnh trong đó! Dễ hiểu nhỉ

Ngoài ra còn có những cách viết khác như là  
```
schedule.rb
-----------------

every 1.minute do
  runner "task1"
end

every 2.days do
  runner "task2"
end

```
Khỏi giải thích nhé! Đọc phát hiểu luôn :female_detective:

# Kết luận
Tóm lại whenever chỉ có như vậy, nhưng lại rất rất rất hữu dụng và thường xuyên xử dụng trên hầu hết các app lớn nhỏ. 
=> Vậy nên là ngại gì nữa mà không tìm hiểu thêm và áp dụng ngay vào luôn nào ?

### Link tham khảo: 
http://rordevelopmenttips.over-blog.com/2018/09/cron-job-in-ruby-on-rails-application-a-complete-tutorial-for-beginners.html
https://dev.to/risafj/cron-jobs-in-rails-a-simple-guide-to-actually-using-the-whenever-gem-now-with-tasks-2omi
http://tutorials.jumpstartlab.com/topics/systems/automation.html