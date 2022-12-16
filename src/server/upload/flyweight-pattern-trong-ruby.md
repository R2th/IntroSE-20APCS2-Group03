Tiếp nối serise về Design Pattern : [(https://viblo.asia/s/design-pattern-ruby-P0lPmJGg5ox)]
hôm nay mình sẽ giới thiệu đến mọi người một pattern khá thú vị nữa đó là **Flyweight Pattern**
theo nguyên bản của GoF thì tác giả có viết thế này: 
***“Use sharing to support large numbers of fine-grained objects efficiently.”***

Đây là Pattern được dùng khi đối tượng phải được xử lý mà chương trình không thể chịu nổi một lượng dữ liệu khổng lồ.

- Ý nghĩa: Làm phương tiện dùng chung để quản lý một lượng lớn các đối tượng nhỏ có các đặc điểm chung, mà các đối tượng này lại được sử dụng tùy thuộc vào hoàn cảnh, và điều kiện ngoài.

- Ví dụ: Một ví dụ kinh điển về pattern này là các ký tự được lưu trong một bộ xử lý văn bản. Mỗi ký tự đại diện cho một đối tượng mà có dữ liệu là loại font (font face), kích thước font, và các dữ liệu định dạng khác.  Bạn có thể tưởng tượng là, với một tài liệu (document) lơn với cấu trúc dữ liệu như thế này thì sẽ bộ xử lý văn bản sẽ khó mà có thể xử lý được. Hơn nữa, vì hầu hết dữ liệu dạng này là lặp lại, phải có một cách để giảm việc lưu giữ này - đó chính là mẫu Flyweight. 

Để làm rõ về Pattern này, chúng ta sẽ có các khái niệm về nó như thế này nhé: 

***Flyweights:*** nó là một object chia sẽ, có thể được sử dụng ở động thời nhiều ngữ cảnh khác nhau, hoạt động như một đối tượng độc lập tại mỗi ngữ cảnh. Mỗi đối tượng cụ thể sẽ tham chiếu đến cùng một instance được chia sẽ ở trong pool của Flyweight objects.

***Flyweight state:*** Mỗi Flyweight có 2 state là bên trong (intrinsic) và bên ngoài (extrinsic). Intrinsic state được lưu trong chính đối tượng flyweight. Extrinsic state được lưu trữ trong bất kỳ đối đương flyweight tại mỗi ngữ cảnh.
Với cách này, một Flyweight object có thể được bổ sung thêm thông tin để sử dụng tại một ngữ cảnh cụ thể trong khi vẫn có thể chia sẽ trên nhiều ngữ cảnh khác nhau. đó là vì trong khi extrinsic state được áp dụng cho một Flyweight có thể thay đổi thì intrinsic state được điều khiển bởi chính Flyweight là hằng số không thay đổi.

***Flyweight factories:*** Bởi vì Flyweight phải được chia sẽ nên điều quan trọng là việc hạn chế tạo ra và quản lý chúng cho một thực thể nhất định. Trong Flyweight pattern thực thể này chính là Flyweight Factory. Để rõ ràng, nó có trách nhiệm tạo ra và quản lý các flyweight objects. Client trong Flyweight pattern phải sử dụng Flyweight Factory để tạo và sử dụng đối tượng Flyweight được chia sẽ. Client phải không bao giờ tạo ra  Flyweight object trực tiếp.

```
class Character
  attr_reader :character

  def initialize(character)
    @character = character
  end
end

class CharacterFactory
  def initialize
    # A pool is initialized. Characters,
    # on initialization, will be added to
    # the pool. When the same character
    # is requested again, a "shared" instance
    # of the character, stored in the pool,
    # will be returned.
    @pool = {}
  end

  def find_character(character)
    if @pool.has_key?(character)
      # if the character exists, reference it
      character = @pool[character]
    else
      # otherwise, create the character
      character = create_character(character)
      @pool[character] = character
    end
    character
  end

  def pool_size
    @pool.size
  end

  #######
  private
  #######

  def create_character(character)
    Character.new(character)
  end
end

class Document
  attr_reader :character_factory

  def initialize
    @character_factory = CharacterFactory.new

    @document = []
  end

  def add_character(character)
    character = @character_factory.find_character(character)
    @document << character
  end
  def output_document
    @document.inject("") do |printed, character|
      printed << character.character
    end
  end
end

# -------------------------------------------------
# Client usage
# -------------------------------------------------
#
# First, we initialize a Document object.
document = Document.new

# Next, we add characters to the document.
document.add_character("t") # The "t" character is added to the flyweight pool
document.add_character("h") # The "h" character is added to the flyweight pool
document.add_character("e") # The "e" character is added to the flyweight pool
document.add_character(" ") # The " " character is added to the flyweight pool
document.add_character("r") # The "r" character is added to the flyweight pool
document.add_character("a") # The "a" character is added to the flyweight pool
document.add_character("i") # The "i" character is added to the flyweight pool
document.add_character("n") # The "n" character is added to the flyweight pool
document.add_character(" ") # shared " "
document.add_character("i") # shared "i"
document.add_character("n") # shared "n"
document.add_character(" ") # shared " "
document.add_character("s") # The "s" character is added to the flyweight pool
document.add_character("p") # The "p" character is added to the flyweight pool
document.add_character("a") # shared "a"
document.add_character("i") # shared "i"
document.add_character("n") # shared "n"

# We output the document. The phrase
puts document.output_document # "the rain in spain"

puts document.character_factory.pool_size # 17
```
Như vậy có thể thấy rằng nếu không sử dụng Flyweight Pattern thì mỗi ký tự hiển thị khác nhau sẽ là một object. Nếu áp dụng thì mỗi ký tự sẽ chỉ là một đối tượng. xuất hiện nhiều lần. giảm thiểu số lượng các đối tượng đi rất nhiều.

**Khi nào thì sử dụng :**
 - Ứng dụng có nhiều đối tượng giống, hoặc gần giống nhau.
 - Với các đối tượng gần giống nhau khác nhau có thể tách rời, các phần giống nhau để cho phép các phần giống nhau có thể chia sẽ.
 - Nhóm các đối tượng gần giống nhau có thể được thay thế bởi một đối tượng chia sẻ mà các phần không giống nhau đã được loại bỏ.
 - Nếu ứng dụng cần phân biệt các đối tượng gần giống nhau trong trạng thái gốc của chúng.