Quản lý code bằng cách chia nhỏ một trong những phần quan trọng nhất của lập trình, đồng thời cũng có thể là một trong những thách thức nhất. Lập trình hướng đối tượng (OOP) trong Ruby cũng không ngoại lệ. Quy trình chung của tôi để phá vỡ OO Ruby như sau:

# Bước 1: mối quan hệ giữa các đối tượng
Trước khi bắt đầu, bạn cần hiểu mối quan hệ giữa các đối tượng. Trong bài viết này, chúng ta sẽ xem xét một nhóm gồm ba đối tượng.  

Một công ty khởi nghiệp (**startup**) có thể có nhiều nhà đầu tư mạo hiểm (**venture capitalists**), và một nhà đầu tư mạo hiểm có thể hỗ trợ nhiều công ty khởi nghiệp. Đây được gọi là mối quan hệ `many-to-many`.

![](https://images.viblo.asia/79646f14-a856-4669-96dd-63393af714bf.png)

Các công ty khởi nghiệp và nhà đầu tư mạo hiểm này được kết nối bằng các vòng tài trợ (**funding round**). Một công ty khởi nghiệp và một nhà đầu tư mạo hiểm có thể có nhiều vòng cấp vốn. Nhưng khi một nhà đầu tư mạo hiểm ủng hộ một công ty khởi nghiệp, điều đó xảy ra thông qua một vòng cấp vốn cá nhân. Mối quan hệ giữa ba lớp này được gọi là mối quan hệ `has-many-through`.

![](https://images.viblo.asia/f6268448-d04f-41d0-967b-83e4a8a46843.png)

Bởi vì mối quan hệ `many-to-many` giữa một công ty khởi nghiệp và một nhà đầu tư mạo hiểm tồn tại thông qua một vòng cấp vốn, nên vòng tài trợ là joiner.

# Bước 2: xây dựng 2 class chính
Bây giờ chúng ta đã xác định được joiner, chúng ta có thể bắt đầu xây dựng các class. Khi xây dựng các class, joiner luôn được xây dựng cuối cùng. Đầu tiên hãy khai báo class startup như sau:
```Ruby
class Startup
end
```

Tiếp theo, chúng ta sẽ thêm một số thông tin cơ bản và phương thức khởi tạo. Một startup được khởi tạo với `name`, `founder` và `domain` nên chúng ta sẽ  thêm như sau:

```Ruby
class Startup
    @@all = []
    attr_accessor :name
    attr_reader :founder, :domain

    def initialize(name, founder, domain)
        @name = name
        @founder = founder
        @domain = domain
        @@all << self
    end
end
```

Lưu ý rằng `name` của một startup có thể thay đổi, nhưng `founder` và `domain` của nó thì không thể. Ví vậy `name` sẽ được khai báo bằng `attr_accessor`, còn `founder` và `domain` sẽ được khai báo bằng `attr_reader`. Ngoài ra, lớp được khai báo với một `mảng @@all` trống và phương thức khởi tạo thêm từng instance  của class vào mảng này. Điều này cho phép chúng ta theo dõi tất cả các instance chúng ta tạo.

Bây giờ chúng ta đã có thông tin cơ bản cho class startup, hãy để xây dựng thông tin cơ bản cho class đầu tư mạo hiểm. Ở đây chúng ta hãy coi rằng nhà đầu tư mạo hiểm sẽ có 2 thuộc tính là `name` và `total_month` có thể thay đổi được như sau:

```Ruby
class VentureCapitalist 
    @@all = [] 
    attr_accessor :name, :total_worth

    def initialize(name, total_worth) 
        @name = name 
        @total_worth = total_worth 
        @@all << self 
    end
end
```

# Bước 3: xây dựng class joiner
Tiếp theo sẽ xây dựng class joiner. Class joiner sẽ được khởi tạo với 2 thuộc tính có thể thay đổi được là `type` và `investment`. Class joiner phải biết về các class mà nó tham gia để nó sẽ được khởi tạo với các instance variables cho mỗi class khác.

Khi một nhà đầu tư mạo hiểm ủng hộ một startup, họ có thể đầu tư bao nhiêu tùy thích, nhưng họ không thể lấy tiền từ startup. Để đảm bảo rằng một khoản đầu tư được khởi tạo chính xác, chúng ta sẽ sử dụng một câu lệnh `if` để tự động đảm bảo rằng khoản đầu tư sẽ không nhỏ hơn 0.

```Ruby
class FundingRound 
    @@all = [] 
    attr_accessor :type, :investment 
    attr_reader :startup, :venture_capitalist 

    def initialize(startup, venture_capitalist, type, investment)
        @startup = startup 
        @venture_capitalist = venture_capitalist 
        @type = type 
        if investment < 0 
            @investment = 0 
        else 
            @investment = investment.to_f 
        end 
        @@all << self 
    end
end
```

# Bước 4: khai báo các method liên qua tới một class
Bây giờ chúng ta có thông tin cơ bản cho các class, chúng ta có thể bắt đầu tạo các phương thức để sử dụng thông tin này. Một lời khuyên ở đây là bạn nên viết tất cả các method chỉ liên quan đến một class trước, sau đó viết các method liên quan đến nhiều class. Method đầu tiên chúng tôi sẽ viết như sau:

```Ruby
def self.all
  @@all
end
```

Đây là một method quan trọng sẽ cho phép chúng ta truy cập tất cả các instances của một class, sẽ hữu ích trong việc xây dựng các method khác. Tất cả các class trên sẽ được khai báo phương thức này.

Tiếp theo sẽ viết một method để tìm một startup với `founder` của nó. Để làm điều này, hãy lặp qua `mảng @@all` cho đến khi tìm thấy phần startup với `founder` phù hợp. 

```Ruby
class Startup
    [...]
    def self.find_by_founder(founder_name)
        self.all.find do |startup|
            startup.founder == founder_name
        end
    end
end
```

Tiếp đến, một method trả về tất cả các lĩnh vực khởi nghiệp của chúng ta. Tương tư, cũng cần lặp qua `mảng @@all` và sử dụng map để trả về các `domain`

```Ruby
class VentureCapitalist
    [...]
    def self.domains
        self.all.map do |startup|
            startup.domain
        end
    end
end
```

# Bước 5: xử lí trên nhiều class
Method tiếp theo chúng ta mong muốn là biết tất cả các `investment` mà một startup đã nhận được. Class startup sẽ không theo dõi thông tin đó. Thay vào đó, class funding round đang theo dõi thông tin này, vì vậy để có được tổng số tiền của một startup, chúng ta cần xem xét các vòng cấp vốn của nó.

Trước khi có thể tìm ra số tiền mà startup đã nhận được, chúng ta cần biết tất cả các vòng cấp vốn thuộc về một startup. Đây là một thông tin quan trọng và nó có thể giúp chúng ta có thêm thông tin về các vòng tài trợ khởi nghiệp và về các nhà đầu tư mạo hiểm đã đầu tư vào nó.

Để có được điều này, chúng ta sẽ lặp qua tất cả các vòng cấp vốn và chọn các startup khớp với `name` của startup đang tìm kiếm. Tiếp theo, sẽ lặp lại qua mảng kết quả để xác định số tiền đầu tư cho mỗi vòng cấp vốn mà một startup có. Sau đó, chúng tôi sẽ tổng hợp tất cả các khoản đầu tư đã được thực hiện trong quá trình khởi nghiệp để có được tổng số tiền của startup. 

```Ruby
class FundingRound
    [...]
    def funding_rounds
        FundingRound.all.select do |round|
            round.startup == self
        end
    end

    def total_funds
        investments = funding_rounds.map do |round|
            round.investment
        end
        investments.sum 
    end
end
```

Bây giờ chúng ta cần danh sách tất cả các  `venture capitalist` đã đầu tư vào `startup`. Tương tự như trên thì class `Startup` theo dõi các `venture capitalist` đã ủng hộ nó, nhưng vì mỗi vòng cấp vốn theo dõi cả `startup` và `venture capitalist`, chúng ta có thể sử dụng các vòng cấp vốn để có được thông tin này. 

```Ruby
class FundingRound
    [...]
    def investors 
        funding_rounds.map do |round|
            round.venture_capitalist
        end.uniq    
    end
end
```

Tương tự bây giờ chúng ta cần danh sách các `startup` mà  `venture capitalist` đã đầu tư. Class  `VentureCapitalist` không theo dõi thông tin về các `startup`, nhưng vì class tài trợ theo dõi cả `startup` và `venture capitalist`, chúng tôi có thể sử dụng các vòng tài trợ để có được thông tin này.

```Ruby
class FundingRound
    [...]
    def funding_rounds
        FundingRound.all.select do |round|
            round.venture_capitalist == self
        end
    end

    def portfolio
        self.funding_rounds.map do |round|
            round.startup
        end.uniq
    end
end
```

# Bước 6: kiểm tra
Trên đây chúng ta đã xây dựng tất cả ba class, thông tin về từng class và có thể nhận thông tin về các class liên quan. Điều cuối cùng chúng ta phải làm là kiểm tra để đảm bảo rằng chúng ta đã tạo ra mọi thứ chính xác.

Để làm điều này, chúng ta bắt đầu bằng cách `seed data`, một loạt các ví dụ về các instances  mà chúng ta có thể thử nghiệm. Để kiểm tra code, chúng ta chỉ cần chạy các file trên.

Bài viết được dịch từ [nguồn](https://medium.com/better-programming/breaking-down-object-oriented-ruby-cb0a79e55a70). Cảm ơn các bạn đã theo dõi!