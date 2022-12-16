Có nhiều giải pháp trong Rails để chuyển các job thành các process chạy nền (background-processs). Có thể kể đến như Resque, Sidekiq. Trong bài này, chúng ta cùng tìm hiểu về Sidekiq. Sidekiq xử lý các job 1 cách đồng thời sử dụng thread thay vì process, vì đó có thể tiết kiệm bộ nhớ cần sử dụng để xử lý.
Chúng ta hãy cùng demo 1 ứng dụng đơn giản 

**1. Ứng dụng "Code Snippet" :**

Ứng dụng chỉ đơn giản là tạo 1 snippet với các ngôn ngữ : Ruby, PHP, ...

```
class SnippetsController < ApplicationController
    def show
      @snippet = Snippet.find(params[:id])
    end
  
    def new
      @snippet = Snippet.new
    end
  
    def create
      @snippet = Snippet.new(snippet_params)
      if @snippet.save
        # PygmentsWorker.perform_in(1.hour, @snippet.id)
        PygmentsWorker.perform_async(@snippet.id)
        redirect_to @snippet
      else
        render :new
      end
    end

    private

    def snippet_params
      params.require(:snippet).permit(:language, :plain_code)
    end
  end
```

Sau khi 1 "code snippet" được lưu, 1 request sẽ được gửi đến 1 web service bên ngoài sử dụng Pygments để highlight code theo ngôn ngữ tương ứng. Chúng ta nên chuyển các lời gọi đến các web service bên ngoài vào trong background-process đề phòng khi server của web service trục trặc. Ta sử dụng Sidekiq để thực hiện điều này. 

**2. Thêm Sidekiq vào ứng dụng : **

- Giống như Resque, Sidekiq sử dụng Redis để quản lý hàng đợi các job. Ta tiến hành cài đặt Sidekiq như sau 
    
    Terminal :
    `brew install redis`

- Khởi động Redis server :

    `redis-server /usr/local/etc/redis.conf `
    
 - Thêm gem "sidekiq" vào trong Gemfile :

    `gem "sidekiq"`

    `bundle install`

- Tạo file pygments_worker.rb trong folder app/workers . Các file trong folder này sẽ được load tự động bởi ứng dụng 

```
class PygmentsWorker 
    include Sidekiq::Worker
    
    def perform(snippet_id)
        snippet = Snippet.find(snippet_id)
        uri = URI.parse("http://pygments.appspot.com")
        request = Net::HTTP.post_form(uri, lang: snippet.language, code: snippet.plain_code)
        snippet.update_attribute(:highlighted_code, request.body)
    end
end
```

Class này phải include module Sidekiq::Worker. Trong module này có phương thức method chứa code mà ta muốn chạy ở phần background. Ta sẽ chuyển phần thực hiện việc highlight từ controller vào trong này. 
Để thực hiện việc này, ta gọi method **PygmentsWorker.perform_async,** method này sẽ thêm job vào trong Redis và thực hiện lời gọi perform trong PygmentsWorker 1 cách bất đồng bộ . Tham số cho phương thức perform_async nên là string, integer thay vì là object. 

Bước cuối cùng là khởi động background process bằng cách chạy câu lệnh sidekiq. 

```
bundle exec sidekiq
```

Bây giờ sidekiq sẽ lắng nghe các job mới.

Khi ta post 1 snippet mới thì syntax-highlighting chưa được hiện ra vì background-process vẫn đang chạy. Ta đợi 1-2 s và reload lại page sẽ thấy code được highlight.

**3. Các feature khác trong Sidekiq : **

- Retry : nếu 1 job fail, Sidekiq sẽ retry lại job đó. Nếu 1 exception xảy ra tại 1 điểm bất kì trong phương thức perform, ta cần đảm bảo không có các xử lý không mong muốn khi code được chạy lại 1 lần nữa. Ví dụ cụ thể như khi gửi mail, ta không muốn người dùng nhận mail hơn 2 lần. 

Để loại bỏ việc retry, ta thêm vào trong class **PygmentsWorker** như sau :

```
class PygmentsWorker
    include Sidekiq::Worker
    sidekiq_options retry: false
    ......
end
```

Một vấn đề khác là worker nên là thread-safe. Thread-safe là gì ? 

Thread-safety : 1 đoạn code được gọi là thread-safe nếu nó hoạt động đúng khi có nhiều thread chạy cùng lúc. Nói chung, các thread tuy truy cập vào chung 1 dữ liệu nhưng 1 phần dữ liệu chỉ được access bởi 1 thread tại bất kì thời điểm nào. 

Trong Ruby, chúng ta không nên sử dụng dữ liệu tại mức class (dữ liệu dùng chung giữa các instances của class). Vì class này là chung giữa các thread, điều này không đảm bảo vấn đề thread-safety cho code. 

- Pool size limit : Pool size limit được cài đặt trong file database config. Default là 5, có nghĩa là có 5 thread có thể connect vào database vào cùng 1 thời điểm.