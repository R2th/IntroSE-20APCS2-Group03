![](https://i1.wp.com/beautyoncode.com/wp-content/uploads/2021/02/lamborghini-605334_1920.jpg?w=1920&ssl=1)

Hôm ni, mình học tiếp về bạn “Lớp(class) trong python”, bài blog tiếp theo nằm trong series [“Khám phá Đại Bản Doanh Python”](https://beautyoncode.com/dai-ban-doanh-python-series-overview/)(nội dung trong bài series này từ chủ yếu mình lấy từ python.org rồi viết lại hoặc dịch lại theo ngôn ngữ của mình)

Ở bài này, tụi mình sẽ học sâu hơn về cách tạo và sử dụng các lớp đối tượng này cùng các khái niệm liên quan nhé.


-----

Lớp như là tinh tuý trong Python vậy đó, nó có quyền năng cực kỳ mạnh mẽ là cho phép tụi mình nhóm các dữ liệu(fields) và các hàm chức năng liên quan(methods) lại với nhau để tạo ra một loại nhà máy nơi mà có thể sản xuất ra vô số các thực thể đối tượng(instance).

Bạn có thể hình dung lớp như là một bản thiết kế mẫu cho một loại đối tượng nào đó, như bản thiết kế nhà chẳng hạn, từ bản thiết kể này mình có thể tạo nên những thực thể khác nhau, là những ngôi nhà khác nhau. 

Tuy nhiên, trước khi học về class, **có hai khái niệm là namespace, scope và một quy luật gọi là LEGB** bạn cần biết để hiểu vì sao chương trình, hiểu sao class lại hoạt động như vậy. Kiến thức này khá trừu tượng và có nhiều nội dung nên mình đã tách các bạn ấy ra một bài post riêng tên là **[“Không gian tên(namespace) và phạm vi(scope) trong Python”](https://beautyoncode.com/khong-gian-ten-va-pham-vi-trong-python/)**, bạn hãy ghé đọc xong rồi quay lại học về lớp nhé.

5 phút trôi qua, … hi vọng bạn đã đọc hết bài trên nha, bạn có thể xạo với tớ không được xạo với chính bản thân mình đó nha =)) Okay, đã đến lúc mình dô nội dung chính của hôm nay rồi.

## Cuộc hẹn đầu tiên với Cờ-lát

Trong lúc đang hẹn hò cùng Python, thì mình quen được anh chàng Cờ-lát, cậu ấy là đồng bọn chí thân với Python nhà mình.  Python đã kể với tớ rất nhiều về bạn này, có rất nhiều điều mới mẻ hay ho đấy, cùng tớ đi khám phá Cờ-lát nhé.

### Cậu ấy nhìn như thế này này

```
class TenCuaLop:
    <lệnh-1>
    .
    .
    .
    <lệnh-N>
```

Cờ-lát nói với tớ là, cậu ta là kiểu người đọc kỹ hướng dẫn sử dụng trước khi dùng, á nhầm, cậu ta là kiểu cần phải **định nghĩa trước khi sử dụng**, và bắt buộc phải định nghĩa với từ khoá “**class**“.

Một khi mà cậu ta được dùng á hả, là một **không gian tên được khởi tạo**, và nó được sử dụng như là một phạm vi nội bộ, nơi **chứa tất cả các biến** được khai báo trong cậu ấy. 

Nghe hay ho phếch nhỉ. Thế cụ thể là như nào? 

Ừ, thì cụ thể là, ví dụ một hàm được định nghĩa trong cậu ấy, tên của hàm này sẽ thuộc cái không gian tên kia, và mình có thể dùng nó từ cậu ấy được. Khi cậu ấy đã được định nghĩa(tức là viết hết tới <lệnh-N> ở trên đó), **một lớp đối tượng được khởi tạo**. Lớp đối tượng này về cơ bản sẽ bao bọc tất cả thành phần của không gian tên được tạo bởi định nghĩa lớp này(phần tiếp học kỹ hơn khúc này).

Đại khái chỗ này là phạm vi cục bộ của class sẽ bật chế độ chơi ngay khi tên cậu ấy được sử dụng và đối tượng lớp ở đây được liên kết với tên class mà bạn ấy nhận được trong tiêu đề sau chữ class khi định nghĩa đó, ở đây là chữ **“TenCuaLop”**.

### Cậu ấy là lớp của các đối tượng

Cờ-lát còn bảo với tớ, là ai quen cậu ấy đều biết cậu ấy có hai điểm mạnh: 

– biết rõ bản thân mình

– biết cách khởi tạo cuộc sống của mình

#### Biết rõ bản thân mình

BIết rõ bản thân mình chính là cậu ấy biết cách **tham chiếu thuộc tính**(attribute references) sẵn có trong cậu ấy. 

Cách cậu ấy hay dùng, là cách mà Python chỉ cho cậu ấy, là dùng dấu “.” để tham chiếu đến các thuộc tính của bản thân mình, ví dụ như là obj.name. Do đó, nếu Cờ-lát được định nghĩa như thế này:

```
class MyCoLat:
    """This is my class"""
    ten = "my class"

    def say_hi(self):
        return "Hi, nice to meet you"
```

```
x = MyCoLatDating()
x.counter = 1
while x.counter < 10:
    x.counter = x.counter * 2
print(x.counter)
del x.counter
```

thì MyCoLat.**ten**, MyCoLat.**say_hi** là các thuộc tính tham chiếu, trả về giá trị là chuỗi(ten), và một hàm(say_hi).  

Các thuộc tính của cậu ấy cũng có thể gán được, vì vậy mình có thể thay đổi giá trị của nó. Ngoài ra,  __doc__ cũng là một thuộc tính, nó sẽ trả ra giá trị của đoạn mô tả “Class cua BeautyOnCode“, đây là thuộc tính mặc định của cậu ấy.

#### Khởi tạo cuộc sống của chính mình

Để khởi tạo cuộc sống cho chính mình, Cờ-lát của tớ sẽ bật chế độ “**gọi hàm**”, nhưng lúc này hàm đó không có tham số nào và sẽ trả về một thực thể mới của chính cậu ấy.

```
co_lat_empty = MyCoLat()
```

Dòng trên chính là Cờ-lát của tớ đã được khởi tạo thành một thực thể mới mang tên tạm gọi là “co_lat_empty”, lúc này “co_lat_empty” của tớ hoàn toàn trống rỗng nhé.

Ơ, thế Cờ-lát của mày biến hình à, hay là đa nhân cách? Vâng, chính thế đó, bạn nhìn ra nhanh vậy, Cờ-lát của tớ thuộc loại đa nhân cách siêu đẳng nhé. 

Trong mỗi tình huống, hoặc mỗi ngữ cảnh, là cậu ấy có thể biến hình thành những con người hoàn toàn khác biệt đấy.  Chưa hết, cậu ấy còn có bí kíp để khởi tạo từng cuộc sống riêng cho chính mình, ví dụ như là đi biển thì sẽ mặc đồ bơi, đi chùa thì phải mặc quần dài, trời nắng thì đội mũ, trời mưa thì mang áo mưa, … 

Và, chiếc túi Doraemon của cậu ấy, chính là hàm __init__ đấy nhé. 

Cùng xem hàm này giúp Cờ-lát của tớ biến hình ra sao:

```
def __init__(self):
    self.language = "Python"
```

Khi Cờ-lát của tớ nắm trong tay hàm này, thì mỗi phiên bản biến hình của cậu ấy, não bộ sẽ tự động gọi qua hàm này để khởi tạo các thuộc tính là các đặc điểm, tính cách mà cậu ấy mong muốn. 

Chưa hết, chỉ cần một ý nghĩ trong đầu như một dạng dữ liệu đầu vào là hàm này đã có thể nhận các giá trị khác nhau rồi nhé. Đây là Cờ Lát cải tiến của tớ với hàm __init__

```
class MyCoLat:
    """This is my class"""
    ten = "my class"

    def __init__(self, handsome_like="Hyun Bin", love_exp=5):
        """Hàm khởi tạo"""
        self.handsome_like = handsome_like
        self.love_exp = love_exp

    def keep_it(self):
        return "Hi, nice to meet you"
```

Ví dụ khi cậu ấy muốn đi chơi với tớ, cậu ấy sẽ tạo ra một phiên bản của mình như sau:

```
>>> from example import MyCoLat
>>> x = MyCoLat("Lee Min Ho", 10)
>>> x.handsome_like, x.love_exp
('Lee Min Ho', 10)
>>> 
```

Đấy, nhìn hẳn các cậu cũng hiểu rồi phải không, hihi. Bạn cờ lát của tớ sẽ biến hình thành handsome_like “Lee Min Ho” với 10 năm kinh nghiệm tình trường love_exp.

Đấy là khi cậu ấy suy nghĩ và đặt các giá trị cụ thể vào để biến hình, còn khi mà lười á, cậu ấy sẽ chả phải đặt gì vào cả, mặc định sẽ đẹp trai như “HyunBin” và có 5 năm tình trường đấy(cậu ấy đã không còn trống không như trước nữa rồi).

```
>>> y = MyCoLat()
>>> y.handsome_like, y.love_exp
('Hyun Bin', 5)
>>> 
```

Ui, nên tớ mê cậu ấy ngẩn tò te luôn ấy, quá ngầu mà phải không ^^.

### Các phiên bản của đối tượng

Các bạn đã biết Cờ-lát của tớ có thể tham chiếu các thuộc tính và khởi tạo phải không nào. Thế còn các phiên bản biến hình của cậu ấy thì có thể làm gì nhỉ?

Các phiên bản là thực thể của cậu ấy hỗ trợ duy nhất một hoạt động là **“tham chiếu thuộc tính”**, tức là mỗi phiên bản này đều biết rất rõ các đặc điểm của bản thân mình và biết cách truy cập vào chúng.

Các đặc điểm này có thể chia làm hai lọại là:

#### Đặc điểm nhận dạng

Đặc điểm riêng của cậu ấy hay còn gọi là các **thuộc tính dữ liệu**(data attributes)

Các thuộc tính dữ liệu thì không cần khai báo, như là các biến địa phương, và chúng bắt đầu tồn tại kể từ khi chúng được gán. 

Ví dụ, từ x là một thực thể của MyCoLat ở trên, mình tạo một thuộc tính dữ liệu cho nó mang tên “counter” nó bắt đầu tồn tại tại thời điểm mình gán giá trị và có thể sử dụng ngay sau đó.

```
>>> x.counter = 1
>>> while x.counter < 10:
...     x.counter = x.counter * 2
... 
>>> print(x.counter)
16
>>> del x.counter
>>> 
```

#### Các hành động

Còn hành động của từng phiên bản như thấy gái là auto chảnh hay thấy người lớn là auto lịch sự  chính là các **phương thức**(methods). 

Phương thức của đối tượng là một hàm thuộc về đối tượng đó.

Tên các phương thức của một đối tượng sẽ phụ thuộc vào lớp của đối tượng đó. Theo định nghĩa, tất cả các thuộc tính của lớp thể hiện các hành động của các đối tượng thì sẽ dùng phương thức để thể hiện. 

Ở ví dụ của tụi mình, x.f là một tham chiếu phương thức f hợp lệ, vì MyCoLat.keep_it là một hàm

Nhưng MyCoLat.handsome_like thì không phải là tham chiếu phương thức, vì handsome_like chỉ là một thuộc tính dữ liệu. 

**Thế còn x.keep_it và MyClassDating.keep_it có giống nhau? **

Hai bạn này khác nhau nhé ạ, 

– với x.keep_it thì keep_it là phương thức của thực thể x

– với MyCoLat.keep_it thì keep_it là phương thức của đối tượng MyCoLat

### Hành động của các đối tượng

Cờ-lát của tớ có thể tạo ra nhiều đối tượng là các phiên bản của cậu ấy, và cậu ấy cũng có thể tạo các hành động chung cho các loại phiên bản này.

Như ở trên, **keep_it** chính là một phương thức như vậy,  phương thức này có thể gọi ngay lập tức hoặc cũng có thể được gán vào một giá trị để sử dụng sau này.

– Khi gọi từ thực thể x, mình gọi x.keep_it()

– Khi muốn gán vào giá trị mình gán: y = x.keep_it, và có thể dùng giá trị y này như một biến số bình thường.

**Vậy thì, điều gì đã xảy ra khi phương thức này được gọi như thế này x.keep_it()? **

Bạn có thấy x.keep_it() được gọi mà không cần biến số nào, ngay cả khi keep_it được định nghĩa với một biến số là self. 

Vì sao lại thể nhỉ? Có điều gì đó sai sai, có phải là thiếu biến số không? Nếu mà thiếu là Python nó la làng lên lỗi thiếu biến số rồi cậu à, dù cho biến này cậu không dùng nhưng Python nó sẽ vẫn yêu cầu phải có, gọi là required args ấy, cơ mà ở đây thì hoàn toàn không có lỗi nào, lạ thật.

Thực ra thì, mình tin bạn đã toán được câu trả lời rồi: có một điểm đặc biệt ngay chỗ phương thức này là thực thể mà gọi phương thức ấy sẽ được tự động bỏ vào cho biến self đó. Trong ví dụ, khi mình gọi x.keep_it() thì sẽ tương đương với gọi như vầy nè **MyCoLat.keep_it(x)**.

Nói chung thì, khi gọi một phương thức từ các thực thể với các biến số sẽ tương đương với gọi phương thức đó từ class của nó cộng với chính thực thể đó được truyền vào ở vị trí đầu tiên, đại diện cho thực thể đó.

---

Nếu bạn vẫn chưa hiểu, bạn có thể xem về cách class thực thi có lẽ sẽ hiểu hơn ý.

Ví dụ nha, khi một thuộc tính không phải dữ liệu riêng của x được tham chiếu, ở đây là keep_it(nó của Cờ lát), thì chương trình sẽ đi tìm kiếm nó ở trong lớp của x, tức là nó nhảy vô trong bạn MyCoLat nó tìm, và nó nhận ra bạn keep_it chính là **phương thức của lớp đối tượng**(keep_it của MyCoLat), nên nó tạo một đối tượng phương thức mới bằng cách đóng gói **x** kèm với **cái hàm đó** lại, để cho tụi nó đi cùng nhau, tạo nên một đối tượng trừu tượng là **phương thức của đối tượng**(keep_it của x).

Khi x gọi phương thức này kèm với một danh sách đối số, một danh sách đối số mới sẽ được xây dựng bao gồm thực thể gọi và danh sách đối số đi kèm, rồi nó sẽ gọi **phương thức của đối tượng** trên bằng đám đối số mới này.

Hi vọng bạn sẽ hiểu 😅 

### Thuộc tính của Cờ-lát và thuộc tính của các phiên bản

Nói chung là, tính cách của cờ lát thì các phiên bản đều được kế thừa, còn tính cách của từng phiên bản thì chỉ là của riêng phiên bản đó thôi.

Dưới đây là một ví dụ:

```
class Dog:
    """Đây là cờ lát của các bạn chó"""
    kind = "chó ta"  # biến ni của lớp sẽ được chia sẻ
                     #với tất cả các thực thể tạo từ lớp này

    def __init__(self, name):
        self.name = name  # biến ni của từng thực thể được
                          # khởi tạo bởi hàm __init__ sẽ tương ứng
                          # với giá trị của từng thực thể truyền vào
 ```
 
 ```
 >>> from example import Dog
>>> v = Dog("Vàng")
>>> m = Dog("Mili")
>>> v.kind
'chó ta'
>>> m.kind
'chó ta'
>>> v.name
'Vàng'
>>> m.name
'Mili'
 ```
 
 Như mình thấy ở trên, “**kind**” là một thuộc tính **được chia sẻ**. Với các thuộc tính chia sẻ như vậy, nếu nó là các kiểu dữ liệu có thể thay đổi được như là list, dict thì có khả năng sẽ tạo ra nhiều trường hợp mình không mong muốn, vì tính chất chia sẻ này.

Ví dụ mình thêm một thuộc tính nữa mô tả sở thích của các bạn chó là “interest”, là một dict:

```
class Dog:
    """Đây là cờ lát của các bạn chó"""
    kind = "chó ta"  # biến ni của lớp sẽ được chia sẻ
                     # với tất cả các thực thể tạo từ lớp này

    interest = []  # biến ni của lớp sẽ được chia sẻ
                   # với tất cả các thực thể tạo từ lớp này

    def __init__(self, name):
        self.name = name  # biến ni của từng thực thể được
                          # khởi tạo bởi hàm __init__ sẽ tương ứng
                          # với giá trị của từng thực thể truyền vào

    def add_interest(self, interest_name):
        self.interest.append(interest_name)
```

```
>>> from example import Dog
>>> v = Dog("Vàng")
>>> m = Dog("Mili")
>>> v.add_interest("ngủ")
>>> m.add_interest("ăn")
>>> v.interest
['ngủ', 'ăn']
>>> # Ở đây mình mong đợi v chi có một interest là "ngủ" thôi 
    # mà lại trả ra hai cơ, vậy là bị sai goài!
```

Như vậy, khi “interest” là một thuộc tính chung được chia sẻ với tất cả các phiên bản khác thì sẽ gây vấn đề phải không? 

Vậy ở đây, mình cần phải đặt bạn “interest” này vào cho từng phiên bản một, bằng cách đặt thuộc tính này vào hàm __init__, do đó thuộc tính này sẽ được khởi tạo cho từng phiên bản riêng biệt, như thế này sẽ hoạt động như mong đợi là v chỉ có một interest là [“ngủ”] thôi nè:

```
class Dog:
    """Đây là cờ lát của các bạn chó"""
    kind = "chó ta"  # biến ni của lớp sẽ được chia sẻ
                     # với tất cả các thực thể tạo từ lớp này

    def __init__(self, name):
        self.name = name  # biến ni của từng thực thể được
        self.interest = []  # biến ni của từng thực thể được

    def add_interest(self, interest_name):
        self.interest.append(interest_name)
 ```
 
 ```
 >>> from example import Dog
>>> v = Dog("Vàng")
>>> m = Dog("Mili")
>>> v.add_interest("ngủ")
>>> m.add_interest("ăn")
>>> v.interest
['ngủ']
```

## Một vài lưu ý nữa nha
### Cờ-lát và phiên bản có cùng tên thuộc tính, thì ưu tiên tên ở phiên bản

Nếu cùng một tên thuộc tính có mặt ở cả thực thể và cả lớp đối tượng thì thuộc tính thuộc thực thể sẽ được ưu tiên sử dụng nhé.

```
>>> x = Dog("Beck")
>>> x.kind
'chó ta'
>>> x.kind = "chó ngoại"
>>> x.kind
'chó ngoại
```

Ở đây sau khi mình tạo một phiên bản x là bạn chó có tên “Beck” rồi mình mới gán tiếp biến kind qua giá trị là “chó ngoại”, thì lúc này kind của x sẽ có giá trị mới này.

### Một vài nguyên tắc về ngữ nghĩa

Biến số đầu tiên của phương thức trong class thường sẽ bắt đầu với self(như mình đã học ở trên). 

**Thế thì nếu không có self có được không nhỉ?** 

Câu trả lời là ĐƯỢC. Cơ mà, đây là quy định về mặt ngữ nghĩa của class trong Python, nên dù có viết được nhưng mình cũng hạn chế nhất có thể, vì sẽ gây hiểu lầm với người khác.

**Thế còn mình có thể đặt code của các phương thức ở ngoài code của class được không?**

Câu trả lời là ĐƯỢC luôn nghe, vì không ai bắt buộc phải đặt ở trỏng hết á. Người ta hay đặt bên trong cũng là cho dễ đọc thôi à.

```
# Hàm này được khai báo ở ngoài class nè
def f1(self, x, y):
    return min(x, x + y)

class C:
    f = f1

    def g(self):
        return "Hello"

    h = g
```

#### Gọi hàm
##### Có thể gọi hàm trong cùng một class với self

Phương thức này có thể gọi phương thức khác trong cùng một lớp đối tượng, sử dụng **self** để gọi. 

Ví dụ dưới đây gọi hai lần hàm add trong hàm **addtwice** nè:

```
class Bag:
    def __init__(self):
        self.data = []

    def add(self, x):
        self.data.append(x)

    def addtwice(self, x):
        self.add(x)
        self.add(x)
```

##### Gọi phương thức của lớp đối tượng

Các phương thức trong một lớp có thể tham chiếu toàn cục giống như các hàm thông thường với phạm vi toàn cục được liên kết với phương thức đó chính là mô-đun chứa định nghĩa của nó. Ví dụ như mình có thể gọi hàm add của Bag như thế này: Bag.add(1)

Cơ mà lớp đối tượng thì không bao giờ sử dụng như là một phạm vi toàn cục được nghen. Trong khi hiếm có lý do cho việc sử dụng phương thức của một lớp ở phạm vi toàn cục, thì có nhiều cách sử dụng phạm vi toàn cục hợp lý hơn: đơn cử như, các hàm và các mô-đun được nạp vào phạm vi toàn cục để có thể sử dụng trong các phương thức, cũng như việc định nghĩa các hàm hay các lớp trong phạm vi toàn cục. 

Thường thì, lớp chứa phương thức được định nghĩa trong phạm vi toàn cục, và trong phần tiếp theo, mình sẽ tìm thấy thêm vài nguyên nhân tại sao phương thức lại tham chiếu đến lớp của chính nó. 

Mỗi giá trị là một đối tượng, và do đó sẽ có một lớp(còn được gọi là type của nó), được lưu trữ dưới dạng đối tượng object.__class__.

## Kế thừa

Khi nói đến lớp, tất nhiên sẽ nói đến kế thừa, vì đây là viên kim cương trong lập trình hướng đối tượng. 

Để kế thừa một lớp rất đơn giản, chỉ việc bọc lớp mình tạo với lớp mình định kế thừa là xong, nó sẽ như vậy nè:

```
class DerivedClassName(BaseClassName):
    <statement-1>
    .
    .
    .
    <statement-N>
```

**Lớp cơ sở** BaseClassName phải được định nghĩa trong phạm vi chứa **lớp dẫn xuất** DerivedClassName. Trong chỗ BaseClassName mình cũng cho phép một số dạng khác như là gọi lớp đó từ mô-đun nào đó, ví dụ: class DerivedClassName(modname.BaseClassName):

Việc thực thi định nghĩa của lớp dẫn xuất được tiến hành giống với lớp cơ sở. Khi lớp đối tượng được khởi tạo, thì nó sẽ **nhớ lớp cơ sở của nó**. Điều này sẽ dùng để giải quyết chuyện tham chiếu thuộc tính: **nếu một thuộc tính được yêu cầu không tìm thấy trong lớp dẫn xuất, nó sẽ đi kiếm trong lớp cơ sở**. Quy tắc này được áp dụng đệ quy nếu bản thân lớp cơ sở chính là lớp dẫn xuất từ các lớp cơ sở khác nữa.

Việc tạo một phiên bản mới từ lớp dẫn xuất cũng tương tự như mình đã học: DerivedClassName(). Các phương thức tham chiếu được giải quyết như sau: thuộc tính lớp tương ứng được tìm kiếm, đi sâu dần vào trong các lớp cơ sở nếu cần, và phương thức tham chiếu sẽ hợp lệ nếu quá trình này trả ra một đối tượng hàm.

Lớp dẫn xuất có thể ghi đè các phương thức của các lớp cơ sở của chúng. Vì các phương thức không có đặc quyền đặc biệt khi gọi các phương thức khác của cùng loại đối tượng, một phương thức của lớp cơ sở được phép gọi một phương thức khác được định nghĩa trong cùng lớp cơ sở đó có thể kết thúc bằng việc gọi một phương thức của lớp dẫn xuất ghi đè nó.

Một phương thức được ghi đè trong lớp dẫn xuất có thể muốn mở rộng hơn là chỉ thay thế phương thức cùng tên của lớp cơ sở. Một cách đơn giản để gọi phương thức từ lớp cơ sở một cách trực tiếp là gọi BaseClassName.methodName(self, đối số).

Python cung cấp hai hàm dựng sẵn để làm việc với sự kế thừa này:

Dùng **isinstance() để kiểm tra loại của thực thể**: isinstance(obj, int) sẽ trả ra True chỉ khi obj.__class__ là int có lớp dẫn xuất từ int

Dùng **issubclass() để kiểm tra sự kế thừa**:  issubclass(bool, int) là True khi bool là lớp con của int. Tuy nhiên, issubclass(float, int) là False do float không phải là lớp con của int đâu nghen.

## Kế thừa từ nhiều lớp

Python cũng hỗ trợ kế thừa nhiều lớp nữa.

```
class DerivedClassName(Base1, Base2, Base3):
    <statement-1>
    .
    .
    .
    <statement-N>
```

Vậy ở đây việc kế thừa được thực hiện thế nào nhỉ?

Đối với hầu hết các mục đích, trong các trường hợp đơn giản nhất, bạn có thể nghĩ là việc tìm kiếm các thuộc tính được kết thừa từ lớp cha là tìm kiếm theo chiều sâu, từ trái sang phải, và không phải tìm kiếm hai lần trong cùng một lớp nơi có sự chồng chéo trong phân cấp. 

Do đó, nếu một thuộc tính không tìm thấy trong DerivedClassName, thì nó sẽ đi kiếm trong Base1, sau đó tìm kiếm đệ quy trong các lớp cơ sở của Base1, và nếu không tìm thấy nó sẽ tìm kiếm trong Base2, và cứ thế cho đến hết.

Thực tế thì nó sẽ phức tạp hơn như thế, thứ tự giải quyết các phương thức thay đổi động để hỗ trợ các lệnh gọi hợp tác tới super(). 

Thứ tự động là cần thiết vì tất cả các trường hợp đa kế thừa đều thể hiện một hoặc nhiều mối quan hệ một cách chặt chẽ(trong đó có ít nhất một trong các lớp cha có thể được truy cập thông qua nhiều đường dẫn từ lớp dưới cùng). 

Ví dụ: tất cả các lớp kế thừa từ đối tượng, vì vậy bất kỳ trường hợp đa kế thừa nào cũng cung cấp một đường dẫn để tiếp cận đối tượng. Để giữ cho lớp cơ sở không bị truy cập nhiều lần, thuật toán động tuyến tính hoá thứ tự tìm kiếm theo cách bảo toàn thứ tự từ trái sang phải được chỉ định trọng mỗi lớp, chỉ gọi lớp cha một lần và điều đó là đơn điệu(nghĩa là một lớp có thể được phân lớp mà không ảnh hưởng đến thứ tự ưu tiên của lớp cha của nó). Kết hợp lại với nhau, các thuộc tính này giúp bạn có thể thiết kế các lớp đáng tin cậy và có thể mở rộng với đa kế thừa. Để biết thêm chi tiết bạn có thể đọc thêm ở [đây](https://www.python.org/download/releases/2.3/mro/)

## Các biến riêng

“Các biến riêng tư thì không thể được truy cập trừ khi nó được truy cập từ bên trong một đối tượng”, **điều này không tồn tại trong Python, như các ngôn ngữ hướng đối tượng khác**. 

Tuy nhiên, có một quy ước: một tiền tố là dấu gạch dưới(ví dụ: _spam) có thể được hiểu đây là phần không được công khai của API(nó có thể là một hàm, một phương thức hay một biến dữ liệu), và các thành phần này được xem là có thể thay đổi mà không cần báo trước.

Có một trường hợp hay gặp trong việc sử dụng các biến riêng là để tránh tên bị xung đột khi mình cùng định nghĩa tên đó ở lớp con. Do đó, có một cơ chế hỗ trợ việc xung đột trên, gọi là phân loại tên(“name mangling”), với định nghĩa ở dạng **hai dấu gạch dưới** `__spam`, biến này sẽ được thay thế bằng `__classname__spam`, việc phân loại này không liên quan đến vị trí cú pháp của mã định danh, miễn là nó nằm trong định nghĩa của lớp là được.

Việc phân loại tên như vậy khá hữu ích trong khi ghi đè các phương thức của lớp cha mà không làm ảnh hưởng tới các phương thức khác được gọi. Ví dụ:

```
class Mapping:
    def __init__(self, iterable):
        self.items_list = []
        self.__update(iterable)

    def update(self, iterable):
        for item in iterable:
            self.items_list.append(item)

    __update = update   # private copy of original update() method

class MappingSubclass(Mapping):

    def update(self, keys, values):
        # provides new signature for update()
        # but does not break __init__()
        for item in zip(keys, values):
            self.items_list.append(item)
```
Ở ví dụ trên, mình thấy dòng gán `__update = update` trong lớp Mapping chính là việc thực hiện phân loại tên `__update` của class này, chính là `Mapping__update`(bạn gọi `Mapping.__dict__` sẽ thấy biến này).

Vì thế, dù phương thức update được ghi đè trong lớp con MappingSubclass thì phương thức __init__ vẫn hoạt động bình thường mà không bị ảnh hưởng.

Thậm chí, dù mình có viết thêm một phương thức `__update` riêng của lớp MappingSubclass thì được code vẫn có thể hoạt động được, vì lúc này phương thức nó tên là `_MappingSubclass__update`. 

Thật hay phải không nào? 🥳

Một lưu ý là, các nguyên tắc về phân biệt như vậy được thiết lập nhằm tránh các tình huống ngoài mong đợi. Việc truy cập và sửa đổi một biến riêng là hoàn toàn có thể. Điều này có khi sẽ hữu dụng trong tình huống mình cần gỡ lỗi gì đó.

---

Đôi khi, mình chỉ cần một lớp trống để sau đó gán các giá trị thuộc tính cụ thể vào:

```
class Employee:
    pass

john = Employee()  # Create an empty employee record

# Fill the fields of the record
john.name = 'John Doe'
john.dept = 'computer lab'
john.salary = 1000
```

Một phương thức của một thực thể đối tượng cũng có thuộc tính riêng của nó. Ví dụ mình tạo một thực thể mapping = MappingSubclass([]), thì mapping.update là một phương thức của nó, và mapping.update.__self__ là thực thể mapping, còn mapping.update.__func__ là hàm update của thực thể đó.

Dù còn một đoạn nội dung nói về iterator và generator nữa, nhưng bài viết về class đến đây đã khá dài rồi, mình sẽ để giành hai bạn này ở bài tiếp theo, sẽ nghiên cứu và viết kỹ càng hơn nha.

Cám ơn bạn đã đọc, 

**[Bài gốc](https://beautyoncode.com/lop-trong-python/)** ở blog riêng của mình nhé ạ, mời bạn ghé chơi nha.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!