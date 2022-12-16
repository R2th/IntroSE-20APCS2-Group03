Một trong những dự án sớm nhất mà tôi đã tham gia tại Valiant đã nghiên cứu các cách để tối ưu hóa hiệu năng và mức tiêu thụ bộ nhớ trong ứng dụng web Rails của chúng tôi. Mặc dù tôi đã nghe những lời phàn nàn cũ về các ứng dụng Rails đang chậm chạp, cồng kềnh và bộ nhớ ngày một phình to ra, tôi vẫn chưa tìm ra bất kỳ giải pháp thực tế, dễ điều hướng nào cho những vấn đề này.

Cho đến khi chúng tôi phát hiện ra jemalloc.

Trong bài đăng trên blog này, tôi sẽ đưa ra một tổng quan ngắn gọn về những gì về jemalloc, cách kiểm tra hiệu suất và mức tiêu thụ bộ nhớ của ứng dụng Rails hiện tại của bạn (bao gồm cả việc kiểm thử xem dữ liệu của bạn có bị rò rỉ bộ nhớ) hay không? làm thế nào để cài đặt jemalloc tại môi trường Development và cả trên Production. Và cuối cùng, sẽ cho bạn thấy kết quả cuối cùng của chúng tôi là gì sau khi chúng tôi chuyển sang dùng jemalloc (cảnh báo spoiler :D chúng tôi đã giảm được một nửa lượng tiêu thụ bộ nhớ của mình trong sản xuất!).

## Jemalloc là gì?

Ruby truyền thống sử dụng malloc với thư viện C để phân bổ động, giải phóng và cấp phát bộ nhớ khi lưu trữ các đối tượng, có nghĩa là khi bạn tạo ra các đối tượng trong Ruby, chức năng Garbage collection (Quá trình thu gom rác) sẽ loại bỏ các đối tượng này.

Jemalloc là một triển khai malloc (3) được phát triển bởi Jason Evans (do đó là chữ "je" khi bắt đầu malloc), dường như có hiệu quả hơn trong việc xử lý các đối tượng so với các trình phân bổ khác. Kết quả là, chuyển sang jemalloc cho phép bạn phân bổ, tái sử dụng và / hoặc giải phóng bộ nhớ của ứng dụng của bạn hiệu quả hơn rất nhiều.

## 1. Kiểm tra mức tiêu thụ bộ nhớ của ứng dụng

Để xác định xem chuyển đổi sang jemalloc thực sự có bất kỳ hiệu ứng tích cực nào trên ứng dụng Rails của bạn, trước tiên bạn cần phải biết lượng bộ nhớ đang được tiêu thụ và tốc độ phản hồi của trang web. Để kiểm tra điều này dưới Local, tôi đã thêm các gem sau vào Gemfile (và đã thực hiện một gói cài đặt):

```Ruby
gem "memory_profiler"
gem "derailed_benchmarks"
```

*(Lưu ý: bạn có thể chạy thử nghiệm với những Gem này trong môi trường Development/Testing hay ngay cả Production. Nếu bạn muốn chạy chúng trong môi trường Develoment/Testing, hãy chắc chắn rằng bạn đã loại bỏ Gem dotenv-rails khỏi các môi trường này trong Gemfile.)*

Để xác định tổng bộ nhớ được sử dụng bởi Gem này trong Gemfile, hãy chạy lệnh sau:

```Ruby
bundle exec derailed bundle:mem
```

Để chỉ hiển thị các tệp ở trên mức sử dụng bộ nhớ nhất định, hãy thêm CUT_OFF = 0,3 (hoặc bất kỳ hình nào bạn muốn làm phần cắt). Cũng lưu ý rằng vì Ruby chỉ yêu cầu tệp một lần, nếu cùng một tệp được yêu cầu bởi một số thư viện, chi phí chỉ được liên kết với thư viện đầu tiên để yêu cầu tệp (mục trùng lặp sẽ liệt kê tất cả các đối số mà chúng thuộc về).

Ví dụ: một đoạn trích ngắn về kết quả của chúng tôi trông như sau:

```
TOP: 70.2617 MiB
  rails/all: 16.4805 MiB
    rails: 6.1523 MiB (Also required by: active_record/railtie, active_model/railtie, and 8 others)
      rails/application: 4.707 MiB
        rails/engine: 3.543 MiB (Also required by: coffee/rails/engine)
          rails/railtie: 3.293 MiB (Also required by: global_id/railtie, sprockets/railtie, and 3 others)
            rails/configuration: 3.1484 MiB (Also required by: rails/railtie/configuration)
              active_support/core_ext/object: 3.0469 MiB (Also required by: paper_trail/has_paper_trail)
                active_support/core_ext/object/conversions: 2.5078 MiB
                  active_support/core_ext/hash/conversions: 1.8945 MiB (Also required by: active_record/serializers/xml_serializer, active_model/serializers/xml)
                    active_support/time: 1.7031 MiB (Also required by: active_record/base)
                      active_support/core_ext/time: 1.625 MiB
                        active_support/core_ext/time/calculations: 1.5391 MiB (Also required by: active_support/core_ext/numeric/time, active_support/core_ext/string/conversions)
                          active_support/core_ext/time/conversions: 1.1094 MiB (Also required by: active_support/core_ext/time, active_support/core_ext/date_time/conversions)
                            active_support/values/time_zone: 1.0664 MiB (Also required by: active_support/time_with_zone, active_support/core_ext/date_time/conversions)
                              tzinfo: 0.8438 MiB (Also required by: et-orbi)
                                tzinfo/timezone: 0.3867 MiB
```

*(Chú ý: 1 Mebibyte (MiB) = approximately 1.05 Megabytes.)*

Ngoài ra, trong môi trường Production của bạn, bạn có thể thấy số lượng các đối tượng được cấp phát được tạo ra (theo vị trí, cũng như bằng Gem) khi các phụ thuộc được yêu cầu bằng cách chạy:
```Ruby
bundle exec derailed bundle:objects
```

Dưới đây là một ví dụ về số lượng các đối tượng được tạo ra bởi đá quý của chúng tôi:
```
348351  activesupport
66931  erubis
54842  json
23655  addressable
15078  bundler
14833  heroics
13313  ruby
13034  haml
7186  actionpack
6370  sass
```

Để kiểm tra xem liệu bạn có rò rỉ bộ nhớ trong môi trường sản xuất hay không, bạn có thể chạy:
```Ruby
bundle exec derailed exec perf:mem_over_time
```

*❗️ Mẹo: Để đặt số lượng kiểm tra bạn muốn chạy thay vì để cho nó chạy vĩnh viễn, bạn có thể sử dụng: TESTCOUNT = 20000 gói thực thi trật tự exec perf: memovertime.*
Lệnh này gửi nhiều yêu cầu đến ứng dụng và sử dụng bộ nhớ hồ sơ theo thời gian - nếu bạn có rò rỉ bộ nhớ thực, việc sử dụng bộ nhớ sẽ tiếp tục tăng; nếu bạn không có một rò rỉ bộ nhớ, thông thường bạn sẽ thấy bộ nhớ ứng dụng sử dụng ngày càng tăng cho đến khi nó chạm vào một "ngưỡng max", sau đó tắt.

Hãy nhớ rằng kết quả thay đổi (và dường như thay đổi một chút khi chạy 2.000 bài kiểm tra so với 20.000 bài kiểm tra). Bằng cách chạy thử nghiệm một số lần, chúng tôi phát hiện ra rằng trung bình, cao nguyên của ứng dụng của chúng tôi dường như xuất hiện xung quanh dấu 1,7 MiB - 1,8 MiB. Điều này dường như gần tương ứng với các bản ghi Heroku của chúng tôi, cho thấy một "ngưỡng max" xung quanh điểm đánh dấu 1,6 MiB.

## 2. Kiểm tra hiệu suất và tốc độ của ứng dụng
Để kiểm tra hiệu quả tổng thể của ứng dụng của bạn, bạn có thể nhấn điểm cuối trong ứng dụng bằng cách sử dụng điểm chuẩn-ips (có nghĩa là, điểm chuẩn một khối các lần lặp của mã trên giây) bằng lệnh này:

```Ruby
bundle exec derailed exec perf:ips
```

Giá trị cao hơn là tốt hơn vì nó có nghĩa là nhiều lần lặp lại của khối mã trên mỗi giây. Một vài kết quả của chúng tôi như sau:
```
Warming up --------------------------------------
                 ips     1.000  i/100ms
Calculating -------------------------------------
                 ips      5.070  (± 0.0%) i/s -     26.000  in   5.141956s
                 
Warming up --------------------------------------
                 ips     1.000  i/100ms
Calculating -------------------------------------
                 ips      5.162  (± 0.0%) i/s -     26.000  in   5.051505s
           
Warming up --------------------------------------
                 ips     1.000  i/100ms
Calculating -------------------------------------
                 ips      4.741  (± 0.0%) i/s -     24.000  in   5.125214s
```

## 3. Cài đặt Jemalloc (Development/Production)

Để cài đặt jemalloc dưới Local, chỉ cần thêm phần này vào tệp Gemfile và `bundle install`
```Ruby
gem 'jemalloc'
```

Lưu ý: nếu bạn sử dụng rvm (và đã cài đặt Ruby 2.4.1), hãy chạy rvm cài đặt lại 2.4.1 -C —with-jemalloc để cài đặt lại Ruby bằng jemalloc.
 
Để kiểm tra xem phiên bản Ruby của bạn có sử dụng jemalloc hay không, hãy chạy:
```Ruby
ruby -r rbconfig -e "puts RbConfig::CONFIG['LIBS']".
```

Kết quả chạy của bạn phải giống như sau:
```Ruby
-lpthread -ljemalloc -ldl -lobjc
```

(Các -ljemalloc có nghĩa là jemalloc được nạp khi khởi động Ruby.)
Nhưng những gì cần làm trên môi trường Production? Có một vài cách để thêm jemalloc vào Heroku, nhưng chúng tôi thấy rằng cách dễ nhất là chỉ cần thêm buildpack với lệnh này:

```Ruby
heroku buildpacks:add --index 1 https://github.com/mojodna/heroku-buildpack-jemalloc.git --app [your app name here]
```

Để xác nhận rằng nó đã được cài đặt, chạy `heroku buildpacks --app [Tên App]`, và bạn sẽ thấy buildpack được liệt kê. 
Ngoài ra, bạn có thể thêm buildpack trong Cài đặt → Buildpacks → Thêm buildpack trong bảng điều khiển Heroku.

## 4. Kiểm tra kết quả dưới Local (Development ENV)
Chạy các lệnh tương tự như trong Bước 1 để kiểm tra mức tiêu thụ bộ nhớ và tốc độ post-jemalloc. \

Kết quả của chúng tôi cho thấy một 8.6953 MiB (9.117 MB) - đó là 12.38% - tiết kiệm bộ nhớ trên toàn bộ ứng dụng. Đối với các đối tượng được phân bổ theo vị trí, chúng tôi đã lưu 5.064 MiB (5.310 MB) bộ nhớ.

## 5. Kiểm tra kết quả trên Production
Chúng tôi sử dụng bao vây, một thử nghiệm tải http và tiện ích điểm chuẩn, để quá tải các ứng dụng xem xét của chúng tôi với các yêu cầu (hãy theo dõi bài viết sắp tới của chúng tôi về cách thực hiện điều này!). Nếu không có jemalloc, chúng tôi nhận thấy rằng chúng tôi đã tính trung bình khoảng 2,5 giao dịch mỗi giây, với trung bình khoảng 160 giao dịch không thành công trong khoảng thời gian 20 phút. Với jemalloc, chúng tôi kết thúc với trung bình 6,6 giao dịch mỗi giây và chỉ có 1,5 giao dịch không thành công trong khoảng thời gian 20 phút.

Ấn tượng nhất, kết quả bảng điều khiển Heroku của chúng tôi cho thấy sự cải thiện đáng kể, gần như ngay lập tức. Trước khi jemalloc, sử dụng bộ nhớ của chúng tôi sẽ đạt khoảng 2 GB trước khi được tự động khởi động lại. Sau khi jemalloc, việc sử dụng bộ nhớ của chúng tôi giảm xuống mức 1 GB, tránh việc khởi động lại hoàn toàn.

Tương tự như vậy, thời gian phản hồi yêu cầu của chúng tôi cho thấy sự suy giảm nhanh chóng - trước khi jemalloc, một số yêu cầu đã được thực hiện miễn là 30 giây. Sau đó, thời gian phản ứng của chúng tôi giảm xuống còn khoảng 5-10 giây.

## Tổng kết

Chúng tôi đã đạt được hiệu suất đáng kinh ngạc, hiệu suất hữu hình và tiêu thụ bộ nhớ sau khi triển khai jemalloc; và trong khi điều này có thể không phải là viên đạn bạc để chống lại danh tiếng của Rails trong ngành công nghiệp để thu gom rác thải tối ưu, nó chắc chắn đã giúp chúng tôi tối ưu hóa nền tảng của mình.
 
Hãy cho tôi biết trong các nhận xét nếu bạn đã có bất kỳ thành công nào với chiến lược tối ưu hóa hoặc các chiến lược tối ưu hóa khác - chúng tôi luôn tìm cách để làm cho ứng dụng của chúng tôi trở nên tốt hơn nữa!

Bài viết dịch từ: https://medium.com/rubyinside/how-we-halved-our-memory-consumption-in-rails-with-jemalloc-86afa4e54aa3