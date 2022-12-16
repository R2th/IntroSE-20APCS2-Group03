Chào mọi người vậy là mình đi qua gần hết các Structural Patterns thông dụng rồi sau đây sẽ là bài viết nói về một Patterns dạo này không còn phổ biến nữa do con người ta ngày càng giàu và chuyện nâng cấp RAM là rất đơn giản @@  Flyweight Pattern !


## Intent (khái quát)

** Flyweight ** là một mẫu thiết kế cấu trúc cho phép bạn lưu nhiều đối tượng hơn vào lượng RAM có sẵn bằng cách chia sẻ các phần trạng thái chung giữa nhiều đối tượng thay vì giữ tất cả dữ liệu trong mỗi đối tượng.

![](https://images.viblo.asia/7a5467f3-06e7-4898-9e21-ebaed77e0ae4.png)



## Problem (vấn đề)

Để có một niềm vui sau những giờ làm việc dài, bạn quyết định tạo một trò chơi video đơn giản: người chơi sẽ di chuyển xung quanh bản đồ và bắn nhau. Bạn đã chọn thực hiện một hệ thống hạt thực tế và làm cho nó trở thành một tính năng đặc biệt của trò chơi. Một lượng lớn đạn, tên lửa và mảnh đạn từ vụ nổ sẽ bay khắp bản đồ và mang lại trải nghiệm ly kỳ cho người chơi.

Sau khi hoàn thành, bạn push commit, build trò chơi  và gửi nó cho bạn của bạn để chơi thử. Mặc dù trò chơi đã chạy hoàn hảo trên máy của bạn, nhưng bạn của bạn không thể chơi lâu được. Trên máy tính của mình, trò chơi liên tục bị sập sau vài phút chơi trò chơi. Sau khi dành vài giờ để đào bới các bản ghi gỡ lỗi, bạn phát hiện ra rằng trò chơi đã bị sập vì không đủ RAM.

Vấn đề thực tế có liên quan đến hệ thống hạt của bạn. Mỗi hạt, chẳng hạn như một viên đạn, một tên lửa hoặc một mảnh đạn được đại diện bởi một đối tượng riêng biệt chứa nhiều dữ liệu. Tại một số thời điểm, khi cuộc tàn sát trên màn hình người chơi đạt đến đỉnh điểm, các hạt mới được tạo ra không còn phù hợp với RAM còn lại, vì vậy chương trình đã bị sập.

![](https://images.viblo.asia/c3f49441-7786-4b85-bafb-f3756534798e.png)


## Solution (giải pháp)

Khi kiểm tra kỹ hơn lớp `Particle`(hạt), bạn có thể nhận thấy rằng các trường color và sprite sử dụng nhiều bộ nhớ hơn các trường khác. Điều tệ hơn nữa là hai trường này lưu trữ dữ liệu gần như giống hệt nhau trên tất cả các hạt. Ví dụ, tất cả các viên đạn có cùng color và sprite.

![](https://images.viblo.asia/7d25f302-099f-4f48-9e67-58073e330a16.png)


Các trạng thái(state) của thành phần khác của hạt, như coordinates, movement vector và speed, là duy nhất cho mỗi hạt. Các giá trị của các trường này thay đổi theo bối cảnh trong khi color và sprite không đổi.

Dữ liệu không đổi của một đối tượng thường được gọi là _intrinsic state_. Các đối tượng khác chỉ có thể đọc nó, không thể thay đổi nó. Phần còn lại của trạng thái đối tượng, thường được thay đổi bởi các đối tượng khác, được gọi là _extrinsic state_.

Mẫu Flyweight gợi ý rằng bạn ngừng lưu trữ extrinsic state bên trong đối tượng. Thay vào đó, bạn nên chuyển các state này sang các phương thức cụ thể dựa vào nó. Chỉ có intrinsic state ở trong đối tượng, cho phép bạn sử dụng lại nó trong các bối cảnh khác nhau.

![](https://images.viblo.asia/b3324aae-c222-4cf0-9db4-5896afc618e5.png)



Trở lại trò chơi của chúng ta. Giả sử rằng chúng ta đã trích xuất extrinsic state từ lớp hạt của mình, chỉ có ba vật thể khác nhau đủ để đại diện cho tất cả các hạt trong trò chơi: một viên đạn, một tên lửa và một mảnh đạn. Như bạn có thể đoán được bây giờ, một đối tượng chỉ lưu trữ trạng thái nội tại được gọi là flyweight.

#### Extrinsic state storage

Extrinsic state di chuyển đến đâu? Một số lớp vẫn nên lưu trữ nó, phải không? Trong hầu hết các trường hợp, nó được di chuyển đến đối tượng container, nó tổng hợp các đối tượng trước khi chúng ta áp dụng mẫu.

Trong trường hợp của chúng ta, đó là đối tượng `Game` chính lưu trữ tất cả các hạt trong trường   `particles`. Để di chuyển trạng thái bên ngoài vào lớp này, bạn cần tạo một số trường mảng để lưu trữ coordinates , vecto và speed của từng hạt riêng lẻ. Nhưng đó không phải là tất cả. Bạn cần một mảng khác để lưu trữ các tham chiếu đến một flyweight cụ thể đại diện cho một hạt. Các mảng này phải được đồng bộ hóa để bạn có thể truy cập tất cả dữ liệu của một hạt bằng cách sử dụng cùng một chỉ mục.

![](https://images.viblo.asia/7232bbaf-97a9-4098-a916-2f5434ce0a61.png)

Giải pháp tốt hơn là tạo ra một lớp bối cảnh(context) riêng biệt sẽ lưu trữ trạng thái bên ngoài cùng với tham chiếu đến đối tượng flyweight. Cách tiếp cận này sẽ yêu cầu chỉ một mảng duy nhất trong lớp container.

Ơ mà khoan !! có phải chúng ta cần có nhiều đối tượng theo ngữ cảnh như lúc ban đầu không? Về mặt kỹ thuật, vâng. Nhưng điều quan trọng là, những đối tượng nhỏ hơn nhiều so với trước đây. Các trường sử dụng nhiều bộ nhớ nhất đã được chuyển sang chỉ một vài đối tượng flyweight. Giờ đây, một ngàn đối tượng theo ngữ cảnh nhỏ có thể sử dụng lại một đối tượng flyweight nặng nhất thay vì lưu trữ một nghìn bản sao dữ liệu của nó.

#### Flyweight and immutability

Vì cùng một đối tượng flyweight có thể được sử dụng trong các bối cảnh khác nhau, bạn phải chắc chắn rằng trạng thái của nó không thể được sửa đổi. Một flyweight nên khởi tạo trạng thái của nó chỉ một lần, thông qua các tham số của hàm tạo.

#### Flyweight factory

Để truy cập thuận tiện hơn vào các flyweight khác nhau, bạn có thể tạo một phương thức factory quản lý một nhóm các đối tượng flyweight hiện có. Phương thức nhận intrinsic state của flyweight mong muốn từ client làm tham số, tìm kiếm một đối tượng flyweight hiện có phù hợp với trạng thái này và trả về nếu tìm thấy. Nếu không, nó tạo ra một đối tượng flyweight mới và thêm nó vào bộ nhớ dùng lại.

## Structure (cách tổ chức)

![](https://images.viblo.asia/f276f940-056d-476f-984f-b1522a0dc6de.png)


 1. Mẫu Flyweight chỉ đơn thuần là một sự tối ưu hóa. Trước khi áp dụng nó, hãy đảm bảo chương trình của bạn có vấn đề về mức tiêu thụ RAM liên quan đến việc có một số lượng lớn các đối tượng tương tự trong bộ nhớ cùng một lúc. Hãy chắc chắn rằng vấn đề này không thể được giải quyết theo bất kỳ cách nào khác.
 2. Lớp **Flyweight** chứa phần trạng thái ban đầu của đối tượng có thể được chia sẻ giữa nhiều đối tượng. Cùng một đối tượng flyweight có thể được sử dụng trong nhiều context khác nhau. Trạng thái được lưu trữ bên trong một flyweight được gọi là  “intrinsic”. Trạng thái được truyền cho các phương thức của flyweight được gọi là “extrinsic”.
 3. Lớp **Context**  chứa trạng thái extrinsic. Khi một context được ghép nối với một trong các đối tượng flyweight, nó đại diện cho trạng thái đầy đủ của đối tượng ban đầu.
 4. Thông thường, hành vi của đối tượng ban đầu vẫn thuộc lớp Flyweight.Trường hợp này, bất cứ khi nào  gọi một phương thức của flyweight cũng phải chuyển các giá trị thích hợp của extrinsic state vào các tham số của phương thức. Mặt khác, hành vi có thể được chuyển sang lớp Context, lớp này sẽ sử dụng flyweight được liên kết đơn thuần như một đối tượng dữ liệu
 5. **Client** tính toán hoặc lưu trữ extrinsic state của flyweights. Từ góc độ client , flyweight là một đối tượng mẫu có thể được cấu hình trong thời gian chạy bằng cách chuyển một số dữ liệu theo ngữ cảnh vào các tham số của các phương thức của nó.
 6. **Flyweight Factory** quản lý một nhóm các flyweight hiện có. Các client sẽ không tạo ra flyweights trực tiếp. Thay vào đó, họ gọi factory, chuyển cho nó intrinsic state mong muốn của flyweight. factory xem xét các flyweight được tạo trước đó và trả về một cái hiện có phù hợp với tiêu chí tìm kiếm hoặc tạo một cái mới nếu không tìm thấy gì.

## Applicability (sử dụng khi)
Chỉ sử dụng mẫu Flyweight khi chương trình của bạn phải hỗ trợ một số lượng lớn các đối tượng hầu như không vừa với RAM có sẵn.

## How to Implement (cách cài đặt)

 1. Chia các trường của một lớp sẽ trở thành một flyweight thành hai phần:


    * intrinsic state: các trường chứa dữ liệu không thay đổi và trùng lặp trên nhiều đối tượng
    * extrinsic state: các trường chứa dữ liệu theo ngữ cảnh duy nhất cho từng đối tượng

 2. Để lại các trường đại diện cho intrinsic state trong lớp, hãy chắc chắn rằng chúng không thay đổi và chỉ có giá trị ban đầu của mình bên từ hàm tạo.
  
 3. Loại bỏ các trường  extrinsic state. Thay chúng bằng các phương thức đại diện với tham số truyền vào là các giá trị của trường  extrinsic state.
   
 4. Điều này là tùy chọn, tạo một lớp factory để quản lý nhóm flyweights. Nó nên kiểm tra một factory hiện có trước khi tạo một cái mới. Khi nhà máy đã hoạt động, khách hàng chỉ phải yêu cầu các flyweight thông qua nó. Họ nên mô tả flyweight mong muốn bằng cách chuyển intrinsic state của nó đến nhà máy.
    
 5. Client phải lưu trữ hoặc tính toán các giá trị của extrinsic state (context)  để có thể gọi các phương thức của các đối tượng flyweight. Để thuận tiện, extrinsic state cùng với trường tham chiếu tới flyweight có thể được chuyển sang một lớp context riêng.

## Decorator in Ruby (ví dụ với ngôn ngữ ruby)

#### **main.rb:**  Conceptual Example
```ruby

 require 'json'
    

    class Flyweight
      # @param [String] shared_state
      def initialize(shared_state)
        @shared_state = shared_state
      end
    
      # @param [String] unique_state
      def operation(unique_state)
        s = @shared_state.to_json
        u = unique_state.to_json
        print "Flyweight: Displaying shared (#{s}) and unique (#{u}) state."
      end
    end
    
    # The Flyweight Factory creates and manages the Flyweight objects. It ensures
    # that flyweights are shared correctly. When the client requests a flyweight,
    # the factory either returns an existing instance or creates a new one, if it
    # doesn't exist yet.
    class FlyweightFactory
      # @param [Hash] initial_flyweights
      def initialize(initial_flyweights)
        @flyweights = {}
        initial_flyweights.each do |state|
          @flyweights[get_key(state)] = Flyweight.new(state)
        end
      end
    
      # Returns a Flyweight's string hash for a given state.
      def get_key(state)
        state.sort.join('_')
      end
    
      # Returns an existing Flyweight with a given state or creates a new one.
      def get_flyweight(shared_state)
        key = get_key(shared_state)
    
        if !@flyweights.key?(key)
          puts "FlyweightFactory: Can't find a flyweight, creating new one."
          @flyweights[key] = Flyweight.new(shared_state)
        else
          puts 'FlyweightFactory: Reusing existing flyweight.'
        end
    
        @flyweights[key]
      end
    
      def list_flyweights
        puts "FlyweightFactory: I have #{@flyweights.size} flyweights:"
        print @flyweights.keys.join("\n")
      end
    end
    
    # @param [FlyweightFactory] factory
    # @param [String] plates
    # @param [String] owner
    # @param [String] brand
    # @param [String] model
    # @param [String] color
    def add_car_to_police_database(factory, plates, owner, brand, model, color)
      puts "\n\nClient: Adding a car to database."
      flyweight = factory.get_flyweight([brand, model, color])
      # The client code either stores or calculates extrinsic state and passes it to
      # the flyweight's methods.
      flyweight.operation([plates, owner])
    end
    
    # The client code usually creates a bunch of pre-populated flyweights in the
    # initialization stage of the application.
    
    factory = FlyweightFactory.new([
                                     %w[Chevrolet Camaro2018 pink],
                                     ['Mercedes Benz', 'C300', 'black'],
                                     ['Mercedes Benz', 'C500', 'red'],
                                     %w[BMW M5 red],
                                     %w[BMW X6 white]
                                   ])
    
    factory.list_flyweights
    
    add_car_to_police_database(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red')
    
    add_car_to_police_database(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red')
    
    puts "\n\n"
    
    factory.list_flyweights
```


#### **output.txt:**  Execution result

```
FlyweightFactory: I have 5 flyweights:
Camaro2018_Chevrolet_pink
C300_Mercedes Benz_black
C500_Mercedes Benz_red
BMW_M5_red
BMW_X6_white

Client: Adding a car to database.
FlyweightFactory: Reusing existing flyweight.
Flyweight: Displaying shared (["BMW","M5","red"]) and unique (["CL234IR","James Doe"]) state.

Client: Adding a car to database.
FlyweightFactory: Can't find a flyweight, creating new one.
Flyweight: Displaying shared (["BMW","X1","red"]) and unique (["CL234IR","James Doe"]) state.

FlyweightFactory: I have 6 flyweights:
Camaro2018_Chevrolet_pink
C300_Mercedes Benz_black
C500_Mercedes Benz_red
BMW_M5_red
BMW_X6_white
BMW_X1_red
```

## Tham khảo
[refactoring.guru](https://refactoring.guru/design-patterns/flyweight)