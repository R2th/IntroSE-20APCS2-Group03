Xin chào mọi người, chắc hẳn mọi người đều làm qua chức năng upload file trên một hệ thống nào đó. Để nâng cấp tính năng upload của mình pro hơn, nay mình sẽ giới thiệu mọi người cách check file upload có chứa virus, tránh gây nguy hiểm cho server của mình. Ở đây mình sẽ áp dụng trên ứng dụng Ruby on Rails nhé :) :) :)
### 1. ClamAV là gì?
- ClamAV(Clam AntiVirus) là bộ công cụ phần mềm chống vi-rút miễn phí, đa nền tảng và mã nguồn mở có thể phát hiện nhiều loại phần mềm độc hại, bao gồm cả vi-rút. Một trong những ứng dụng chính của nó là trên các máy chủ mail như một trình quét virus email phía máy chủ. Sơ sơ khái niệm là như vậy, đơn giản nó là một service hỗ trợ quét virus, đi build nó và vọc vạch xí nào.
### 2. Cài đặt môi trường.
- Đầu tiên chúng ta sẽ setup môi trường trên máy (Ở đây mình sẽ setup trên môi trường Ubuntu)
  ```
  sudo apt-get install clamav-daemon clamav-freshclam clamav-unofficial-sigs
  sudo freshclam
  sudo service clamav-daemon start
  ```
  Nếu chạy sudo freshclam bị lỗi thì mọi người nên tắt server của clamav-daemon đi bằng cách
  ```
  sudo systemctl stop clamav-freshclam.service
  ```
  Ngoài ra sẽ có một số bạn gặp phải lỗi không thể downoad database của clamav được thì mọi người hãy vào đường dẫn `/etc/clamav/freshclam.conf` rồi tìm đến dòng có chứa **ReceiveTimeout** và sửa lại giá trị thành **3000** rồi đi chạy lại `freshclam`. Mà nhớ tải xong thì restart service clamav-deamon lại nhé.
Vậy là setup môi trường đã xong, chúng ta cùng nhau tìm hiểu gem clamby nào :D
### 3. Gem clamby
- Để sử dụng được clamav trong ứng dụng của mình thì chúng ta cùng nhau tìm hiểu gem clamby nhé.
- Để sử dụng clamav chúng ta add `gem 'clamby'`vào Gemfile sau đó `bundle` để chạy nó. Link trang chủ của gem clamav mình để ở đây nhé: https://github.com/kobaltz/clamby
- Trong ứng dụng của mình bạn có sử dụng 2 method của clamby cung cấp

  `Clamby.safe?(path_to_file)` nó sẽ trả về `true` nếu file đó không tìm thấy virus, còn nếu có virus thì nó sẽ trả về `false`. Ngoài ra nó sẽ trả về `nil` khi sử dụng clamscan gặp vấn đề.
  
  `Clamby.virus?(path_to_file)` nó sẽ trả về `false` nếu file đó không tìm thấy virus, còn nếu có virus thì nó sẽ trả về `true`. Ngoài ra nó sẽ trả về `nil` khi sử dụng clamscan gặp vấn đề.
  
  Hai hàm này bạn sử dụng hàm nào cũng được, miễn là thuận tiện cho các bạn viết code.
### 4. Cách sử dụng
- Tạo file config trong `config/initializers/clamby.rb`
  ```
   Clamby.configure({
        :check => false,
        :daemonize => true,
        :config_file => nil,
        :error_clamscan_missing => true,
        :error_clamscan_client_error => false,
        :error_file_missing => true,
        :error_file_virus => false,
        :fdpass => false,
        :stream => false,
        :output_level => 'medium', # one of 'off', 'low', 'medium', 'high'
        :executable_path_clamscan => 'clamscan',
        :executable_path_clamdscan => 'clamdscan',
        :executable_path_freshclam => 'freshclam',
      })
  ```
  Hoặc dùng cách config sau đây nếu như bạn muốn đọc config từ service của `clamav` mà đã cài ở phía trên
   ```
  clamby_configs = {
    daemonize: true
  }
  clamby_configs[:config_file] = '/etc/clamav/clamd.conf'
  Clamby.configure(clamby_configs)
  ```
  Ở đây, tôi  khuyên bạn để giá trị của`daemonize` thành `true`. Điều này sẽ cho phép` clamscan` vẫn còn trong bộ nhớ và sẽ không phải tải cho mỗi lần quét vi-rút. Nó sẽ tiết kiệm vài giây mỗi lần yêu cầu quét. Còn chi tiết của các giá trị cài đặt thì các bạn đọc ở [đây](https://linux.die.net/man/5/clamd.conf) để tìm hiểu thêm.
- Kiểm tra file có chứa virus trước khi lưu vào Database
  ```
    before_create :scan_for_viruses

    private
        def scan_for_viruses
          path = self.attribute.path
          scan_result = Clamby.safe?(path)
          if scan_result
            return true
          else
            File.delete(path)
            return false
          end
        end
  ```
- Nếu bạn sử dụng gem carriwewave để upload thì trong quá trình xử lý file mình sẽ tiến hành check file đó xem có virus không rồi mới tiến hành encode file để lưu. Ở đây mình có ví dụ upload phim chẳng hạn.

  `app/uploaders/upload_video.rb`
   ```
   class UploadVideo < CarrierWave::Uploader::Base
       class FileContainVirus < StandardError
           def message
               "This file already has a virus"
           end
       end
       
       process  :convert_to_video
       ......
       
       def convert_to_vìdeo
          # xử lý đường dẫn file 
          raise FileContainVirus if check_virus(file_path)

          #Nếu không có virus thì tiếp tục xử lý ...
       end

       def check_virus file_path
          result = Clamby.safe? file_path
          return true if result

          File.delete(file_path)
          false
       end
   end
   ```
- Ở bên controller chỉ cần gọi ra như thế này

  `app/controller/upload_video_controller.rb`
  ```
  class UploadVideoController < ApplicationController
      def upload
          Movie.create(...);
          ....
      rescue UploadVideo::FileContainVirus => e
          render json: {message: e.message}
      end
  end
  ```
### Kết luận
- Bài viết của mình đến đây là kết thúc, hy vọng bài viết này sẽ giúp cho các bạn có thêm một số kiến thức mới và áp dụng vào hệ thống của mình trở nên xịn xò hơn. Cảm ơn các bạn đã theo dõi bài viết này nhé <3