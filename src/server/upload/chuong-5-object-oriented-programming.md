Chương 5 Object oriented programming

Tôi lần đầu tiên được giới thiệu về lập trình hướng đối tượng ở trường cao đẳng nơi tôi đã có một giới thiệu tóm tắc về c++. ở thời điểm này ngôn ngữ lập trình c++ thì vẫn tương đối mới mẻ. Thật sự thì phiên bản đầu tiên của ngôn ngữ này chỉ được xuất bản 3 năm trước khi tôi được giới thiệu về nó. Mô hình lập trình hướng đối tượng đã được hình thành từ mô hình lập trình hàm tôi đã học trong quá khứ vào thời điểm đó dường như khá áp đảo. Thậm chí tôi đã được giới thiệu rằng lập trình hướng đối tượng với c++. Tôi thực sự không có phát triển bất cứ điều gì quan trọng cho tới khi tôi học java sau này.

**Trong chương này, bạn sẽ học theo các mục sau:**

- Cách swift có thể được dùng như là một ngôn ngữ lập trình hướng đối tượng
- Cách chúng ta phát triển một API theo cách hướng đối tượng
- Lợi ích của việc thiết kế hướng đối tượng là gì
- Bất cập của lập trình hướng đối tượng là gì

Trong khi cuốn sách này nói về lập trình hướng protocol, chúng ta thực sự cần phải thảo luận về cách swift có thể dùng như một ngôn ngữ lập trình hướng đối tượng trước khi tìm hiểu xem cách nó có thể dùng như một ngôn ngữ hướng protocol. Có một sự hiểu biết về chương trình hướng đối tượng sẽ giúp chúng ta hiểu được chương trình hướng protocol và cho chúng ta một số vài góc nhìn về những vấn đề của chương trình hướng protocol được thiết kế ra để giải quyết.

**Lập trình hướng đối tượng là gì?**

Lập trình hướng đối tượng là một thiết kế triết học. Viết những ứng dụng với ngôn ngữ lập trình hướng đối tượng là phần khác nhau cơ bản đối với viết những ứng dụng với ngôn ngữ thủ tục cũ như C và pascal. Ngôn ngữ thủ tục dùng một tập những câu lệnh để nói tới máy tính làm công việc gì từng bước từng bước bằng cách dựa vào những thủ tục(hàm) hoặc là những luồng. Tuy nhiên ngôn ngữ lập trình hướng đối tượng thì tất cả đều là đối tượng. Việc này có thể trong khá hiển nhiên thì tên của nó, nhưng về cơ bản, khi chúng ta nghĩ về lập trình hướng đối tượng chúng ta cần nghĩ về đối tượng.

Đối tượng là một cấu trúc dữ liệu chứa đựng thông tin về những thuộc tính của đối tượng trong dạng là những đặc tính, và những hành động thực thi bởi hoặc tới đối tượng dưới dạng phương thức. Những đối tượng có thể được xem là những đồ vật và trong ngôn ngữ tiếng anh chúng được xem là danh từ. Những vật này có thể là vật trong thế giới thật hoặc vật ảo. Nếu bạn nhìn xung quanh bạn sẽ nhìn thấy nhiều vật trong thế giới thật và ảo hoá chúng có thể được mô hình lại bằng cách hướng đối tượng với những thuộc tính và hành động.

Như tôi đang viết chương này, tôi nhìn xung quanh và thấy nhiều cây, cỏ, con chó của tôi và hàng rào trong sân nhà tôi. Tất cả những thứ này có thể được mô hình hoá với những thuộc tính và hành động.

Tôi cũng có thể nghĩ về một trong những lần uống nước tăng lực. Nước tăng lực đó là Jolt Cola. Tôi không chắc cách nhiều người nhớ về Jolt. nhưng tôi sẽ không thể vượt qua được đại học nếu không có nó. Một lon Jolt có thể được mô hình hoá như một đối tượng với những thuộc tính (thể tích, hàm lượng caffeince, nhiệt độ, kích thước) và hành động (uống, đổi nhiệt độ)

Chúng ta có thể giữ nhiều lon Jolt trong tủ lạnh để giữ chúng lạnh. Tủ lại cũng có thể được mô hình hoá như một đối tượng bởi vì nó có thuộc tính (nhiệt độ, nhiều lon Jolt, và số lượng lon tối đa) và các hành động (thêm, lấy ra những cái lon)

Việc định nghĩa những thuộc tính và hành động của một đối tượng thì tốt, nhưng chúng ta cũng cần hiểu cách đối tượng tương tác. Như ví dụ trên, khi chúng ta đặt một lon Jolt vào trong tủ lạnh có mấy viên đá lạnh, Lon sẽ bắt đầu lạnh hơn, tuy nhiên nếu không có bất cứ viên đá nào trong tủ lạnh thì lon vẫn ở nhiệt độ phòng. Hiểu những sự tương tác thì rất qua trọng để việc thiết kế đối tượng được chính xác.

Với một ứng dụng máy tính chúng ta không thể tạo một đối tượng mà không có một bản thiết kế để nói với ứng dụng về những thuộc tính và hành động được mong chờ từ đối tượng. Trong hầu hết các ngôn ngữ hướng đối tượng, bản thiết kế có hình dạng của một lớp. Một lớp là một cấu trúc cho phép chúng ta đóng gói những thuộc tính và hành động của một đối tượng vào trong 1 kiểu duy nhất được mô hình hoá thực thể, chúng ta dùng để thể hiện trong code của mình

Chúng ta dùng hàm khởi tạo bên trong lớp của mình để tạo những thực thể của class, chúng ta thường dùng hàm khởi tạo để thiết lập giá trị cho các thuộc tính của đối tượng, hoặc để thực thi bất cứ hàm khởi tạo khác mà lớp của bạn cần. Một cái nữa chúng ta tạo thực thể của một lớp, chúng ta có thể dùng nó trong code của mình.

Vấn đề quan trọng để hiểu là lớp là bộ khung xường của lập trình hướng đối tượng. Nếu không có class và đối tượng được tạo từ class chúng ta sẽ không có lập trình hướng đối tượng. Nó quan trọng ngang nhau đó là class là kiểu tham chiếu và nó có thể kế thừa hoặc tạo sub class.

Tất cả những lý giải này trong lập trình hướng đối tượng là ổn đấy. Nhưng không có gì chứng minh khái niệm này tốt hơn là code. Trước khi chúng ta có thể bắt đầu code, chúng ta sẽ cần định nghĩa một số yêu cầu. Trong chương này, chúng ta sẽ trình bày cách chúng ta có thể thiết kế kiểu phương tiện giao thông cho một video game bằng cách hướng đối tượng. Trong chương tiếp theo chúng tôi sẽ trình bày cách chúng tôi có thể thiết kế giống như những lớp này nhưng bằng cách hướng protocol. Cùng xem những yêu cầu cho kiểu phương tiện giao thông

Khi chúng ta phát triển những ứng dụng, chúng ta thường cuyên có một tập những yêu cầu chúng ta cần để làm việc. Ví dụ dự án của mình trong chương này và nó sẽ khác trong phần tiếp theo. 

- Chúng ta có 3 thể loại địa hình cho phương tiện: biển, đất liền, trên trời. Một phương tiện có thể làm 1 thành viên của nhiều loại địa hình.
- Những phương tiện có thể di chuyển hoặc tấn công khi chúng trên một ô vuông khớp với bất kì loại địa hình nào chúng thuộc về.
- Những phương tiện sẽ không thể di chuyển hoặc tấn công trên ô vuông mà nó không khớp với bất kì loại phương tiện nào nó thuộc về.
- Khi một phương tiện số điểm của phương tiện về 0, phương tiện đó sẽ được xem là mất khả năng. Chúng ta sẽ cần giữ cho tất cả phương tiện 
còn khả năng trong 1 mảng chúng ta sẽ lặp trong đó

Chúng tôi sẽ chứng minh việc thiết kế chỉ với 1 vài phương tiện nhưng chúng tôi biết rằng số lượng những kiểu phương tiện sẽ phát triển cùng với sự phát triển của game. Trong chương này chúng ta sẽ không thực thi nhiều logic cho nhiều loại phương tiện bởi vì chúng ta tập trung vào thiết kế và không nhiều code để thực hiện việc di chuyển vào tấn công.

Cùng bắt đầu thiết kế những phương tiện theo hướng hướng đối tượng

Swift cung cấp đầy đủ sự hổ trợ cho việc phát triển ứng dụng theo hướng đối tượng.  Từ swift 2. tôi đã xem swift là ngôn ngữ hướng đối tượng giống như ngôn ngữ java và c#. trong phần này chúng ta sẽ thiết kế những kiểu phương tiện bằng cách hướng đối tượng và cùng xem những ưu điểm và khuyết điểm của thiết kế này

Trước khi chúng ta xem code, chúng ta cùng tạo một biểu đồ cơ bản để chỉ ra cách chúng ta sẽ thiết kế cấu trúc phân lớp cho thiết kế hướng đối tượng. Trong thiết kế hướng đối tượng chúng ta dùng cấu trúc phân lớp để nhóm những class có mối quan hệ tương tự nhau. Bởi vì Swift là ngôn ngữ kết thừa đơn. Một lớp chỉ có thể có một super class (lớp cha) và kết thừa từ lớp cha đó. Lớp gốc trong cấu trúc phân lớp là một lớp không có lớp cha.

Tôi thường bắt đầu với một biểu đồ cơ bản, nó đơn giản để chỉ ra những lớp mà không có phần chi tiết của chúng. Việc này giúp tôi có cái nhìn về cấu trúc phân lớp trong đầu mình. 

![](https://images.viblo.asia/6f72cb7d-24e5-42bb-b9ce-2bc05dc721c0.png)


Đây là biểu đồ trình bày chúng ta có một lớp gốc là Vehicle. Với 5 lớp con tên là Tank, Amphibious, Submarine, Jet, Transformer. Với một mô hình cấu trúc phân lớp mỗi lớp con sẽ kết thừa tất cả những thuộc tính và phương thức của lớp cha, do đó bất cứ code chung và thuộc tính có thể được thực hiện trong Vehicle và tất cả lớp con sẽ kết thừa nó.

Chúng ta có thể nghĩ rẳng với 3 loại địa hình (mặt đất, trên không, dưới biển) trong yêu cầu của mình, chúng ta sẽ muốn tạo một cấu trúc phân lớp lớn hơn nơi lớp giữa sẽ chứa đựng nhưng lớp cha được tách rời cho mặt đất, bầu trời, trên biển. Việc này cho phép chúng ta tách rời code cho mỗii loại vào trong lớp cha của chúng, tuy nhiên không thể với những yêu cầu được đặt ra. Nguyên nhân của việc không thể này là bất kì loại phương tiện nào cũng có thể là một thành viên của nhiều loại địa hình và với ngôn ngữ đơn kết thừa như swift, mỗi lớp chi có thể có 1 lớp cha. ĐIều này có nghĩa nếu chúng ta tạo những lớp cha tách rời cho từng loại địa hình sau đó. lớp Amphibious có thể trở thành lớp con của những loại địa hình đất hoặc biển nhưng không không là cả hai.

![](https://images.viblo.asia/2e909545-126f-4ec3-bfa8-ea1e96c66743.png)


Bởi vì swift là một ngôn ngữ đơn kế thừa, và chúng ta có thể chỉ có một lớp cha cho tất cả các lớp phương tiện (vehicle), Lớp cha. này sẽ cần chứa đựng code được đòi hỏi cho những yêu cầu cho cả 3 loại địa hình. Có một lớp cha đơn ở đây là một trong những nhược điểm của thiết kế hướng đối tượng bởi vì lớp cha có thể trở nên quá to.

Chúng ta sẽ bắt đầu xây dựng mô hình thiết kế hướng đối tượng bằng cách tạo enumeration TerrainType cái này sẽ dùng để định nghĩa những kiểu phương tiện khác nhau, tấn công, và kiểu di chuyển. Enumeration TerrianType giống như sau:

```enum TerrianType {
	case land
	case sea
	case air
}
```
Bây giờ cùng xem cách chúng ta sẽ định nghĩa lớp cha Vehicle và những thuộc tính trong class
```
class Vehicle {
fileprivate var vehicleTypes = [TerrainType]() 
fileprivate var vehicleAttackTypes = [TerrainType]() 
fileprivate var vehicleMovementTypes = [TerrainType]() 
fileprivate var landAttackRange = -1
fileprivate var seaAttackRange = -1
fileprivate var airAttackRange = -1
fileprivate var hitPoints = 0 
} 
```
Chúng ta bắt đầu kiểu Vehicle bằng việc định nghĩa 7 thuộc tính. 3 thuộc tính đầu là mảng chứa kiểu TerrainType. Những mảng này sẽ giữ vết của những kiểu vehicle (vehicleTypes), những kiểu địa hình có thể tấn công từ mảng vehicleAttackTypes, và những kiểu địa hình mà vehicle có thể di chuyển được (vehicleMovementTypes)

3 thuộc tính (landAttackRange, seaAttackRange, airAttackRange) sẽ chứa đựng những khoản tấn công của phương tiện cho mỗi loại địa hình. Nếu khoảng tấn công nhỏ hơn 0 có nghĩa là chúng ta không thể thực hiện kiểu tấn công đó. Cuối cùng là thuộc tính để lưu trữ điểm số của phương tiện.

Tham chiếu những thuộc tính như fileprivate bởi vì chúng ta muốn phân biệt chúng với các lớp con. Tuy nhiên chúng ta không muốn những phần bên ngoài thay đổi chúng. Mức độ truy xuất này được giới thiệu trong swift 3, và cho phép truy xuất tới những thuộc tính và phương thức từ bất cứ đâu trong cùng file mà thành phần đó được định nghĩa. Để điều này hoạt động, lớp con cần phải được định nghĩa trong cùng file vật lý với lớp cha, Điều này không phải là giải pháp bởi vì file này có thể rất lớn. Tuy nhiên trong thiết kế hướng đối tượng nó là lựa chọn tốt nhất chúng ta phải năng chặn những thuộc tính có thể bị thay đổi bởi những thực thể của kiểu dữ liệu khác. Nếu chúng ta thấy rằng chúng ta có nhiều hơn 5 loại kiểu phương tiện chúng ta có thể thay đổi mức độ truy cập tới internal vì vậy chúng ta có thể đặt phần thực thi của những phương tiện ở file tách biệt.

Bởi vì những thuộc tính được đánh dấu như là fileprivate chúng ta cần tạo một số phương thức lấy dữ liệu để nhận những giá trị của những thuộc tính. Chúng ta cũng sẽ tạo những phương thức để xem kiểu dữ liệu của địa hình mà phương tiện có thể tấn công và di chuyển. Cùng xem những phương thức sau:
```
func isVehicleType(type: TerrainType) -> Bool {
        return vehicleTypes.contains(type)
    }
    
    func canVehicleAttack(type: TerrainType) -> Bool {
        return vehicleAttackTypes.contains(type)
    }
    
    func canVehicleMove(type: TerrainType) -> Bool {
        return vehicleMovementTypes.contains(type)
    }
    
    func doLandAttack() {}
    func doLandMovement() {}
    func doSeaAttack() {}
    func doSeaMovement() {}
    func doAirAttack() {}
    func doAirMovement() {}
    func takeHit(amount: Int) { hitPoints -= amount }
    func hitPointsRemaining() ->Int { return hitPoints }
    func isAlive() -> Bool { return hitPoints > 0 ? true : false }
```
Phương thức isVehicleType chập nhận một tham số kiểu TerrainType và nó sẽ trả về true nếu mảng vehicleType chứa loại địa hình đó. Nó sẽ cho phép những code bên ngoài thấy được những loại dữ liệu. 2 phương thức tiếp theo cũng cho phép chấp nhận một kiểu địa hình và trả về true nếu vehicleAttackTypes  hoặc vehicleMovementTypes chứa đựng những loại địa hình đó. Những phương thức này sẽ được dùng để kiểm tra xem một phương tiện có thể di chuyển hoặc tấn công từ một kiểu địa hình nào đó.
Sáu hàm tiếp theo định nghĩa những cách tấn công hoặc di chuyển từ những loại địa hình của phương tiện.  2 hàm tiếp theo sẽ dùng để tính toán giảm số điểm khi phương tiện nhận một lần bắn và trả về điểm số còn lại. Phương thức cuối cùng sẽ dùng để xác định nếu phương tiện vẫn còn sống hoặc không. Có một số vấn đề chúng ta có thể thấy ngay lập tức với cách thiết kế này. Cùng xem qua trước khi chúng ta đi tiếp.

Một vấn đề lớn của thiết kế, chúng ta đã nói trước đây. Nếu chúng ta muốn dùng mức độ truy cập fileprivate sẽ ngăn chặn những truy xuất trực tiếp tới những thuộc tính sau đó tất cả những lớp con cần ở cùng file vật lý với lớp cha Vehicle. xảy ra vấn đề là lớp vehicle có thể quá lớn, chúng ta có thể không muốn chúng ở cùng một file. Để tránh việc này chúng ta có thể thiết lập mức độ truy cập cho những thuộc tính là internal, nhưng nó không ngăn chặn những thuộc tính này bị thay đổi bởi những thực thể kiểu khác. Đây chính là khuyến điểm của thiết kế hướng đối tượng bởi vì chúng ta không muốn những kiểu bên ngoài có thể truy xuất trực tiếp tới những thuộc tính.

Vấn đề khác của thiết kế hướng đối tượng là chúng ta cần cung cấp những phương thức sẽ cho phép phương tiện tấn công và di chuyển cho mỗi loại địa hình khác nhau, mặc dù hầu hết các phương tiện sẽ không thể tấn công và di chuyển trên tất cả các loại địa hình. mặc dù không có code trong phần thực thi của phương thức đó, code bên ngoài vẫn có thể gại phương thức di chuyển và tấn công. Ví dụ mặc dù kiểu tàu ngầm là kiểu ở biển, nhưng bên ngoài vẫn có thể gọi hàm di chuyển và tấn công trên đất liền và trên không.

Lớp cha sẽ bị phòng to đây là một vấn đề lớn của ngôn ngữ lập trình hướng đối tượng kế thừa duy nhất 1 lớp cha như swift. Với việc lớp cha bị phòng to như kiểu vehicle của chúng ta, nó rất dễ để tạo một lỗi và đưa ra một loại chức năng không nên có hoặc loại bỏ chức năng nên có. Ví dụ, nó sẽ rất dễ để thiết lập thuộc tính airAttackRange cho loại tàu ngầm và cho nó khả năng tấn công trên không, trong khi tàu ngầm thì ko thể.
(ghi chú)
Trong ví dụ này chúng ta chỉ định nghĩa một tập hợp rất nhỏ những tính năng cần cho kiểu Vehicle của chúng ta trong một trò chơi điện tử. Thử tưởng tượng lớp vehicle sẽ lớn như thế nào nếu tất cả các tính tăng được thực thi.

Cùng xem cách chúng ta sẽ tạo lớp con cho Vehicle bằng cách tạo những lớp Tank, Amphibious, Transformer. Chúng ta sẽ bắt đầu với lớp Tank.
```
class Tank: Vehicle {
    override init() {
        super.init()
        vehicleTypes = [.land]
        
        vehicleAttackTypes = [.land]
        vehicleMovementTypes = [.land]
        landAttachRange = 5
        hitPoints = 68
    }
    
    override func doLandAttack() {
        print("tank Attack")
    }
    
    override func doLandMovement() {
         print("Tank move")
    }
}
```
Lớp tank là một lớp con của lớp Vehicle và chúng ta bắt đầu lớp này bằng cách ghi đè hàm khởi tạo mặc định. Trong quá trình khởi tạo chúng ta thiết lập một số thuộc tính kết thừa. Chú ý chúng ta thêm giá trị land cho vehicleTypes, vehicleAttackTypes  và vehicleMovementTypes . Điều này chỉ ra rằng kiểu Tank là phương tiện trên đất liền có thể tấn công và di chuyển trên ô đất liền.

Dùng mảng để để lưu vết của lớp Vehicle là loại địa hình có thể di chuyển, tấn công là một vấn đề của thiết kế hướng đối tượng. Thậm chí hầu hết các lập trình viên rất dễ nhận được giá trị sai trong những mảng này dẫn đến hành vi không được mong đợi.

Trong lớp Tank, chúng ta cũng ghi đè phương thức doLandAttack() và doLandMovement() từ lớp cha bởi vì lớp Tank kế thừa vehicle.  Chúng ta ko ghi đè những phương thức khác như tấn công và di chuyển từ lớp cha Vehicle bởi vì Tank không nên di chuyển và tấn công ở dưới nước hoặc trên không. Mặc dù chúng ta không ghi đè những phương thức này nhưng chúng vẫn là một phần trong lớp Tank. Bởi vì chúng được kết thừa từ lớp cha, không có cách này để ngăn chặn code bên ngoài gọi những phương thức đó.

Bây giờ cùng xem lớp Amphibious và Transformer. Những lớp này khá giống với lớp Tank, ngoại trừ chứng có thể di chuyển và tấn công trên nhiều loại địa hình. Chúng ta sẽ xem Amphibious trước. Lớp này có thể di chuyển và tấn công cả trên đất liền và trên biển.
```
class Amphibious : Vehicle {
    override init() {
        super.init()
        vehicleTypes = [.land,.sea]
        vehicleAttackTypes = [.land, .sea]
        vehicleMovementTypes = [.land,.sea]
        landAttachRange = 1
        seaAttachRange = 1
        hitPoints = 25
    }
    
    override func doLandAttack() {
        print("Amphibious Land Attack")
    }
    
    override func doLandMovement() {
      print("Amphibious Land Move")
    }
    override func doSeaAttack() {
      print("Amphibious Sea Attack")
    }
    override func doSeaMovement() {
      print("Amphibious Sea Move")
    }
}
```
Lớp Amphibious thì rất giống với lớp Tank như chúng ta đã thấy.  Sự khác nhau giữa 2 kiểu này là kiểu Tank được định nghĩa chỉ cho địa hình đất liền trong khi amphibious được định nghĩa cho cả đất liền và biển. Vì vậy nó có loại đất liền và biển, Chúng ta ghi đè phương thức tấn công và di chuyển trên đất liền cũng như phương thức tấn công và di chuyển trên biển. Chúng ta cũng thêm cả 2 giá trị địa hình đất liền và biển cho những mảng vehicleTypes, vehicleAttackTypes, and vehicleMovementTypes 

Bây giờ cùng xem lớp Transformer. Lớp này có khả năng di chuyển và tấn công trên cả 3 loại địa hình.
```
class Transformer: Vehicle {
    override init() {
        super.init()
        vehicleTypes = [.land,.sea, .air]
        vehicleAttackTypes = [.land, .sea, .air]
        vehicleMovementTypes = [.land,.sea, .air]
        landAttachRange = 7
        seaAttachRange = 10
        airAttachRange = 12
        hitPoints = 75
    }
    
    override func doLandAttack() {
        print("Transformer Land Attack")
    }
    override func doLandMovement() {
      print("Transformer Land Move")
    }
    override func doSeaAttack() {
      print("Transformer Sea Attack")
    }
    override func doSeaMovement() {
      print("Transformer Sea Move")
    }
    override func doAirAttack() {
      print("Transformer air Attack")
    }
    override func doAirMovement() {
        print("Transformer Air Move")
    }
}
```
Với lớp Transformer chúng ta ghi đè tất các phương thức di chuyển và tấn công từ lớp cha Vehicle, vì vậy Transformer có khả năng di chuyển và tấn công trên tất cả 3 loại địa hinh. Chúng ta cũng thêm 3 loại địa hình cho 3 mảng vehicleTypes, vehicleAttackTypes, and vehicleMovementTypes 

Bây giờ chúng tã đã tạo những kiểu Vehicle, cùng xem cách chúng ta dùng chúng. Một yêu cầu chính đó là nó có thể lưu trữ những thực thể của tất cả các loại Vehicle trong 1 mảng duy nhất. Việc này sẽ cho chúng ta khả năng để lặp qua tất cả các vehicle còn hoạt động và thực hiện bất cứ hành động nào nếu cần. Để làm việc này chúng ta dùng đa hình(đa kế thừa)

**Polymorphism** (tạm dịch là đa hình)

Là từ tiếng hy lạp kết hợp của từ poly(nhiều) morph(hình dạng). Trong khoa học máy tính, chúng ta dùng đã hình khi chúng ta muốn dùng một interface duy nhất để thể hiện nhiều loại kiểu dữ liệu trong code của mình. Đa hình cho chúng ta khả năng để tương tác với nhiều kiểu dữ liệu thống nhất cùng một interface. Với ngôn ngữ lập trình hướng đối tượng, chúng ta có thể đạt được đa hình ở những lớp con nơi chúng ta tương tác với những lớp khác dùng cùng interface được cung cấp bởi lớp cha.

Cùng xem cách chúng ta dùng đa hình để giữ tất cả các thực thể khác nhau của kiểu vehicle trong một mảng duy nhất và tương tác với chúng. Vì vậy tất cả những kiểu phương tiện là lớp con của lớp cha Vehicle, chúng ta có thể tạo một mảng những kiểu phương tiện và lưu trữ những thực thể của bất cứ kiểu nào mà kiểu đó là con của lớp cha Vehicle.
```
var vehicles = [Vehicle]()
var vh1 = Amphibious()
var vh2 = Amphibious()
var vh3 = Tank()
var vh4 = Transformer()

vehicles.append(vh1)
vehicles.append(vh2)
vehicles.append(vh3)
vehicles.append(vh4)
```
Bây giờ chúng ta có thể lặp xuyên qua từng thực thể trong mảng và tương tác với từng thực thể thông qua interface được thể hiện bởi kiểu Vehicle. Code sau đây chứng minh
```
for (index, vehicle) in vehicles.enumerated() {
    if vehicle.isVehicleType(type: .air) {
        print("Vehicle at \(index) is Air")
        if vehicle.canVehicleMove(type: .air) {
            vehicle.doAirMovement()
        }
        
        if vehicle.canVehicleAttack(type: .air) {
            vehicle.doAirAttack()
        }
    }
    
    if vehicle.isVehicleType(type: .land) {
        print("Vehicle at \(index) is Air")
        if vehicle.canVehicleMove(type: .land) {
            vehicle.doLandMovement()
        }
        
        if vehicle.canVehicleAttack(type: .land) {
            vehicle.doLandAttack()
        }
    }
    
    if vehicle.isVehicleType(type: .sea) {
        print("Vehicle at \(index) is Air")
        if vehicle.canVehicleMove(type: .sea) {
            vehicle.doSeaMovement()
        }
        
        if vehicle.canVehicleAttack(type: .sea) {
            vehicle.doAirAttack()
        }
    }
}
```
Trong phần code này chúng ta đã lặp qua mảng vehicle và dùng phương thức isVehicleType(type) để xác định nếu phương tiện đó tồn tại và gọi phương thức di chuyển và tấn công thích hợp với loại phương tiện đó. Chú ý rằng chúng ta không dùng if -else hoặc switch case bởi vì mỗi loại phương tiện có thể là một thành viên của nhiều loại kiểu dữ liệu chúng ta muốn kiểm tra lại kiểu, thậm chi nếu phương tiện đó khớp với kiểu trước đó.

Nếu bạn muốn lọc những kết quả và chỉ trả về những phương tiện kiểu bay trên trời chúng ta sẽ dùng câu lệnh where với vòng lặp for được chứng minh ở đoạn code sau
```
for (index, vehicle) in vehicles.enumerated() where vehicle.isVehicleType(type: .air) {
    if vehicle.isVehicleType(type: .air) { print("**Vehicle at \(index) is Air")
        if vehicle.canVehicleAttack(type: .air) {
            vehicle.doAirAttack()
        }
        if vehicle.canVehicleMove(type: .air) {
            vehicle.doAirMovement()
        }
    }
}
```
Đọan code này chỉ thực thi phương thức tấn công và di chuyển nếu phương thức isVehicleType(type) trả về true cho kiểu air.

Thiết kế này làm việc khá tốt, nhưng chúng ta có thể thấy trong chương 6, Thiết kế hướng protocol trong swift, chúng ta có thể giải quyết được nhiều vấn đề được trình bày ở đây bằng cách thiết kế đó. Cùng xem lại những khuyết điểm của thiết kế hướng đối tượng vì vậy chúng ta có thể xem cách protocol giải quyết chúng trong chương tiếp theo.

**Những vấn đề với thiết kế hướng đối tượng**

2 vấn đề ta nhìn thấy được của mẫu thiết kế hướng đối tượng thì có liên hệ trực tiếp với nhau, và là nguyên nhân của việc Swift là ngôn ngữ đơn kế thừa. Hãy nhớ rằng ngôn ngữ đơn kế thừa là một ngôn ngữ giới hạn một lớp chỉ có 1 lớp cha.

Một thiết kế hướng đối tượng với một ngôn ngữ đơn kế thừa như swift có thể dẫn tới sự phình to của lớp cha bởi vì chúng ta cần phải thêm những tính năng cần thiết mà chỉ cần cho 1 số lớp con. Việc này dẫn tới vấn đề thứ 2 liên quan tới swift cái mà những tính năng được kế thừa lại không cần thiết.

Trong thiết kế của chúng ta, chúng ta phải thêm những tính năng cho 3 loại địa hình bởi vì kiểu vehicle có thể di chuyển và tấn công trên bất cứ loại địa hình nào. Có những tính năng thêm này có thể dẫn tới lỗi trong code của chúng ta nếu không cẩn thận. Nó có thể dẫn tới tai nạn như ví dụ sau:
```
class Infantry: Vehicle {
    override init() {
super.init()
        vehicleTypes = [.land]
        vehicleAttackTypes = [.land]
        vehicleMovementTypes = [.sea]
        landAttachRange = 1
        seaAttachRange = 1
        hitPoints = 25
    }
    
    override func doLandAttack() {
      print("Amphibious Land Attack")
    }
    override func doLandMovement() {
      print("Amphibious Land Move")
    }
}
```
Cùng xem code này chúng ta có thể dễ dàng thấy rằng mảng vehicleMovementTypes chứa đựng kiểu sea và kiểu land nhưng nó có thể dễ dàng tạo ra lỗi ở đây

Một vấn đề khác của thiết kế hướng đối tượng là chúng ta có thể không tạo được hằng số trong lớp cha cái mà có thể được thiết lập bởi lớp con. Trong thiết kế của chúng ta, có một số thuộc tính chúng ta muốn thiết lập trong hàm khởi tạo của lớp con và sau đó không bao giờ thay đổi. Đó sẽ là ý tưởng nếu chúng ta tạo những hằng số, tuy nhiên hằng số này được định nghĩa ở một lớp và không thể được thiết lập ở lớp con của nó.

Vấn đề cuối cùng chúng ta thấy là không có khả năng để thiết lập thuộc tính hoặc phương thức có thể được truy xuất bởi lớp con. Để giải quyết vấn đề này chúng ta dùng fileprivate để điều khiển, cách này có nghĩa là những đoạn code được định nghĩa trong cùng một file vật lý có thể truy cập đến những thuộc tính đó, Tuy nhiên cách giải quyết này không phải là ý tưởng tốt bởi vì chúng ta không muốn đặt tất cả những lớp con của kiểu đó vào trong cùng một file với với cha nó. Nếu chúng ta đặt những lớp con ở những file riêng biệt chúng ta có thể phải thiết lập mức độ truy xuất là internal, tuy nhiên việc này không ngăn chặn những kiểu dữ liệu khác trong project có thể thay đổi chúng.

**Tổng kết.**
Trong chương này chúng ta thấy được cách để thiết kế những phương tiện giao thông cho một video game bằng cách hướng đối tượng. Chúng ta cũng thấy cách dùng đa hình với cấu trúc phân lớp. Có một số vấn đề với kiểu thiết kế hướng đối tượng này và nhược điểm lớn nhất của nó có liên hệ trực tiếp bởi swift là ngôn ngữ đơn kết thừa.

Trong chương tiếp theo chúng ta sẽ thấy cách chúng ta có thể thiết kế cùng kiểu vehicle bằng cách hướng protocol và cùng xem cách nó giải quyết những vấn đề chúng ta thấy trong cách thiết kế hướng đối tượng.

*Hẹn các bạn ở chương tiếp theo*