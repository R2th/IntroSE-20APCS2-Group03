Chào mừng các bạn quay trở lại series các nguyên lý SOLID trong lập trình Ruby on Rails. 

Chúng ta đã trải qua 3 nguyên lý và các ví dụ thực tế là Single Responsibility Principle, Open/Closed Principle và Liskov Substitution Principle.

Bài này chúng ta tiếp tục tìm hiểu nguyên lý thứ tư, đó là Interface Segregation Principle
# Định nghĩa Interface Segregation Principle
> Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể
> 
hoặc hiểu theo 1 cách khác

> Nhiều giao diện dành riêng cho khách hàng tốt hơn một giao diện có 1 mục đích chung
> 
Ví dụ thực tế, các lớp con nên mở rộng từ lớp cha mà không thay đổi bất cứ hành vi nào của lớp cha.



Trong C hoặc Java thì khác niệm này có thể dễ hiểu hơn nhiều, bởi vì 2 ngôn ngữ đó đều hỗ trợ interface, còn Ruby thì sau, nó không hỗ trợ interface. 

Nhiều người nói Ruby là ngôn ngữ dynamic-type vì vậy chúng ta không thể vi phạm nguyên lý ISP được, chúng ta có thể thảo luận trong một thời gian dài về điều này. Đối với tôi, khi không vi phạm nguyên tắc ISP 1 cách rõ ràng, nhưng chúng ta vẫn có thể tận dụng được những lợi ích mang lại của nguyên tắc này trong Ruby.

Chúng ta sẽ cùng làm 1 ví dụ nho nhỏ tận dụng lợi thế của nguyên lý này nhé, thay vì sử dụng 1 method có thể xử lý nhiều logic khác nhau chúng ta hãy tạo ra những method nhỏ hơn để tiện quản lý.
Ví dụ:
```

class PostRepository
  def get_all_by_ids(ids:)
    entity.where(id: ids)
  end
  
  private
  
  def entity
    Post
  end
end

# Usage

module Admin
  class PostsController
    def index
      @posts = PostRepository.new.get_all_by_ids(params[:ids])
    end
  end
end
```

method `get_all_by_ids` được gọi trong PostsController, trông ngôn lành đó chứ. Nhưng đây chúng ta chỉ sử dụng tại 1 vị trí mà thôi. 

Khi hệ thống của chúng ta lớn dần, việc phải sử dụng lại hàm ở nhiều chỗ là điều ko thể tránh khỏi
```
class PostRepository
  def get_all_by_ids(ids:, sort:)
    posts = entity.where(id: ids)
    posts.order(title: :asc) if sort
    posts
  end
  
  private
  
  def entity
    Post
  end
end

# Usage

module Admin
  class PostsController
    def index
      @posts = PostRepository.new.get_all_by_ids(params[:ids], false)
    end
  end
end

module Client
  class HomeController
    def index
      @posts = PostRepository.new.get_all_by_ids(params[:ids], true)
    end
  end
end
```

Liệu có ổn ko nhỉ, vấn đề ở đâu? Nhìn có vẻ logic không có gì sai, chương trình vẫn chạy ngon. Nhưng khi không sort mà vẫn phải thêm 1 paramester false khi gọi `get_all_by_ids` trong khi đó logic trong method `get_all_by_ids` lại to thêm.

Cùng xem giải pháp bên dưới
```

class PostRepository
  def get_all_by_ids(ids:)
    entity.where(id: ids)
  end
  
  def get_all_by_ids_sorted(ids:)
    get_all_by_ids(ids).order(title: :asc)
  end
    
  private
  
  def entity
    Post
  end
end

# Usage

module Admin
  class PostsController
    def index
      @posts = PostRepository.new.get_all_by_ids(params[:ids])
    end
  end
end

module Client
  class HomeController
    def index
      @posts = PostRepository.new.get_all_by_ids_sorted(params[:ids])
    end
  end
end
```

Việc tách thành các hàm khác nhau giúp việc sử dụng rất dễ dàng, không cần phải thêm biến true, false dễ gây hiểu lầm. Chúng ta có thể tạo ra hàng trăm method khác nhau tái sử dụng lẫn nhau mà không phải mất công gộp chung vào 1 làm gì như: "get_by_id_with_this", "get_by_id_with_that", "get_by_id_with_this_sorted_by_title",...

Ví dụ trên hi vọng sẽ giúp các bạn hiểu hơn về nguyên lý ISP, thay vì bắt buộc phải sử dụng interface, chúng ta tận dụng lợi ích của nguyện lý này áp dụng trong chính các method vậy.


# Tổng kết

Nguyên lý Interface Segregation Principle dường như rất đơn giản trong các ngôn ngữ lập trình static-type, có interface. Trong ngôn ngữ dynamic-type, có thể có nhiều tranh luận, nhưng tuỳ theo cách hiểu của mỗi người chúng ta áp dụng được lợi ích của nguyên lý này. Thay vì sử lý nhiều vẫn đề ở 1 vị trí thì chúng ta hãy cố tách nhỏ ra được hay không. Class, method hay block đều có thể áp dụng được.

Tham khảo: https://www.netguru.co/codestories/solid-4-isp