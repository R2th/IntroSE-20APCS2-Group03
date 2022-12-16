Okay nối tiếp series Clean code, qua phần 1 chúng ta có thể hình dung được tại sao chúng ta nên tìm hiểu clean code và cách viết code như thế nào cho hợp lý khi vào các dự án thực tế. Từ đó khi hệ thống thay đổi cấu trúc hoặc yêu cầu chúng ta có thể dễ dàng điều chỉnh lại phần code chúng ta đã xây dựng trước kia. Okay bắt đầu thôi!


-----


# 1. Khi đặt tên có nghĩa, chúng ta được lợi gì?
Mọi người có thể thấy **đặt tên** - là một phần không thể thiếu khi chúng ta lập trình. Đặt tên biến, tên hàm, tên arguments, tên class, tên package, tên module, vân vân và mây mây... Suy nghĩ ra cái tên đã khó, đặt tên sao cho nó hợp lý còn khó hơn. Chà không biết có bí kíp gì giúp mình đỡ khổ trong việc đặt tên không ta chớ suy nghĩ như ri chắc bể cái đầu quá :( 

Có một câu nói vui mà mình hay nói với đồng nghiệp và đám bạn như này: "Nhiều khi đặt cái tên còn tốn thời gian hơn mình code ấy chứ nhỉ!". Chính vì chúng ta phải đặt tên mọi lúc, mọi nơi **nên** chúng ta càng phải đặt tên một cách **hợp lý**! Thật may là chúng ta có thể follow theo một vài **quy tắc đơn giản** và cách đặt tên của chúng ta có thể đi đến một chân trời mới, mọi người cùng theo dõi nhá!

>À mà quên có vài điều mình muốn nhắn nhủ với các bạn trong mỗi bài viết nhá, khi chúng ta bắt đầu **"tinh thông"** thì đừng ngần ngại hỏi các anh lead hay đồng nghiệp về **ý nghĩa** của các đoạn code trong app của mình, cứ mạnh dạn **đề xuất** việc thay đổi nếu như nó hướng tới việc tốt hơn về **kiến trúc** cũng như là khả năng **readable của code** nha. Và trước khi làm một chức năng gì đó cho app, mình khuyên mấy bạn hãy giành ra ít thời gian **làm rõ yêu cầu**, **phân tích nó sẽ áp vào app hiện có** cũng chúng ta **như thế nào** một chút thì mình tin chắc rằng những dòng code đấy sẽ **chất lượng hơn hẳn** là chúng ta cứ cắm đầu vào làm cho xong đấy nhá.

-----

# 2. Tập trung vào ý chính đi!
**Một cái tên tốt** là một cái tên nói lên được **ý nghĩa** của nó là gì! Nghe có vẻ khó hiểu nhỉ, để mình làm rõ hơn nha. Chúng ta nên chú trọng vào ý nghĩa chính mà chúng ta muốn **truyền đạt** là gì. Các bạn hãy xem qua ví dụ ở dưới nha:

```javascript
function main() {
    const d = new Date().getDate(); // Current date
    // Some different code here..
    const encodedDate = d + 3;
    const token = generateTokenByDate(encodedDate);
     //...
}
```

Có thể nhiều bạn cười :D và mình cũng vậy, chắc hẳn ai mới lập trình cũng đã từng đặt tên như vậy cả, nhưng mà nhìn xem nào chữ cái **d** ở đây rõ ràng là không cho cho chúng ta thấy được ý nghĩa của nó tồn tại làm gì nhỉ! **d** có thể là date, có thể là duck, .... không hiểu tác giả đặt tên này có ý nghĩa gì ta. Là một người có kinh nghiệm mấy mươi năm trong nghề khi nhìn vào, tôi đã khóc các bạn à :(

![image.png](https://images.viblo.asia/a0ac95ce-76dd-46ab-9688-e1dea16a18b8.png)

Rồi khi chúng ta nhìn vào `const encodedDate = d + 3;`, đấy cái tên `encodedDate` thì nó lại khác, nó mang đủ ý nghĩa mà nó truyền đạt, nó cho chúng ta biết vì sao nó sinh ra trên đời này và khi nó mất đi cũng không hề nuối tiếc về việc mình đã làm. Nó cho chúng ta thấy: **đây này**, ta đang giữ giá trị của **cái ngày đã được mã hóa**, và nhiệm vụ sử dụng tao làm vào việc gì đó là việc của lập trình viên của bọn mày. :(

Vậy mà nhìn vào cái cách nó được sinh ra đi, thật đau lòng. Cái `d+3` là cái gì thế này, tại sao cái ngày mã hóa lại được sinh ra từ  `d+3`, d là cái gì, 3 là cái gì ... tôi cạn lời khi nhìn vào đây và khi chúng tìm kiếm chữ cái **d** nó nằm ở đâu thì may quá, người code ra nó còn có chút lương tâm để lại dòng comment đó là ngày hiện tại. Thế nhưng tôi vẫn chưa hiểu vì sao lại có 1 pha `+3` ở đây, tôi buồn và thế là tôi ra tay chỉnh sửa lại đoạn code này một tí:

```javascript
function getEncodedDate(date) {
    const INCREASEMENT_ENCODE_KEY = 3;
    return date + INCREASEMENT_ENCODE_KEY;
}

function main() {
    const currentDate = new Date().getDate();
    // Some different code here..
    const encodedDate = getEncodedDate(currentDate);
    const token = generateTokenByDate(encodedDate);
    //...
}
```

Các bạn có thể thấy được chỉ với một vài thay đổi đoạn code đã trở nên rõ ràng hơn hơn so với lúc nó mới được sinh ra. Cái tên `currentDate` biểu thị được ý nghĩa của nó và chúng ta không cần phải comment giải thích thêm, `encodedDate` cũng vậy, chúng ta nên tập dần và sau này khi nhìn lại code của mình, ta sẽ cảm thấy **thoải mái** hơn đấy tin mình đi, kinh nghiệm xương máu và xác thịt đấy nhá :D. Còn về phần vì sao mình tách phần encoded date ra 1 hàm riêng thì một tí nữa mình sẽ đề cập sau nhá. 

**Từ đó mình rút ra được vài điều là:**
- Chúng ta nên chọn được cái tên **nhấn mạnh được ý nghĩa** mà chúng ta muốn **truyền đạt**
- Nó dễ hiểu và chúng ta có thể dễ dàng thay đổi những phần code liên quan đến nó.

---

Chúng ta cùng nhìn vào ví dụ về đoạn code java tiếp theo nha, giả sử chúng ta đang lập trình trò chơi quét mìn của window đi và board là một class chứa một danh sách các ô đang tồn tại trên bảng trò chơi:
```java
@AllArgsConstructor
public class Board {
    private List<int[]> theList;
    
    // Others code

    public List<int []> getCells() {
        List<int[]> list1 = new ArrayList<int[]>();
        for (int[] x: theList) {
            if (x[0] == 4)
                list1.add(x); // Spacing right here
        }
        return list1;
    }
}
```

Khi nhìn vào đoạn code này, thật khó để chúng ta hình dung về việc mà **phương thức đang cố thực hiện** phải không nhỉ? Đương nhiên với lập trình viên như chúng ta thì nhìn vào và mất một khoảng thời gian ngắn để hiểu là nó đang thực hiện logic gì là việc đơn giản. Nhưng hãy nghĩ kỹ lại nào, khi chúng ta đang debug hay cố gắng hiểu **một đống code trong 1 app lớn** đang làm những việc gì và chúng ta bị chững lại mất vài phút để hiểu một phương thức nhỏ như vậy thì có đáng không chứ!

**Vậy thì đoạn code này có gì khó hiểu nào?**
- Đoạn code này trông khá đơn giản, không có thuật toán gì phức tạp cả. Có vẻ như việc spacing trong code làm đoạn code hơi rối tí (chỗ condition if không có quote block).
- Ý nghĩa chính của nó không rõ ràng lắm.

-> Có vẻ như vấn đề không nằm ở sự phức tạp mà là ở sự **không rõ ràng**. Để mình liệt kê ra vài điểm chưa rõ ràng nhé:
- `theList` ở đây thật sự có ý nghĩa gì?
- Ý nghĩa của việc truy xuất phần tử thứ 0 trong mảng của `theList` là gì?
- Ý nghĩa của con số 4?
- Và một điều quang trọng nữa là mình sẽ sử dụng cái list được trả về như thế nào nhỉ? Dùng để làm gì ta?

**Okay chúng ta sẽ giải quyết ở những nơi mà vấn đề sinh ra:**
- Có vẻ như `theList` là danh sách các ô trong trò chơi không biểu thị rõ lắm ý nghĩa của các ô trong trò chơi nên mình sẽ đổi cái tên lại một chút. How about `gameBoard` or `gameCells`? Nó tốt hơn cái tên `theList`, hai cái tên kia cho ta thấy được đây là những thứ thuộc về cái bảng trò chơi hoặc là những ô trong game chúng ta đang chơi!
- Và cái index số 0 trong một ô là cái gì đấy nhỉ? Nó là vị trí của giá trị status và giá trị tương đương với số 4 nó có nghĩa là đã được **flagged** tức là đã được người chơi đặt cờ! Ô kê khi chúng ta đã nắm rõ ý nghĩa mà mình muốn truyền đạt rồi thì chúng ta quay lại chỉnh sửa đoạn code thôi nào:

```java
@AllArgsConstructor
public class Board {
    private static int STATUS_VALUE = 0;
    private List<int[]> gameCells;
    
    public enum CellStatus {
        ..., FLAGGED(4);

        @Getter
        private value;

        CellStatus(int value) { this.value = value; }
    }
    
    // Others code

    public List<int []> getFlaggedCells() {
        List<int[]> flaggedCells = new ArrayList<int[]>();
        for (int[] cell: gameCells) {
            if (cell[STATUS_VALUE] == CellStatus.FLAGGED.getValue())
                flaggedCells.add(cell);
        }
        return flaggedCells;
    }
}
```

Chúng ta có thể nhận thấy là **độ phức tạp** của đoạn code **không hề thay đổi**, vẫn ngần ấy **biến số**, chừng đấy **constant** (hằng số), cùng một **nesting level** (cấp code lồng nhau) nhưng mà đoạn code đã trở nên **tường minh** hơn. Các cái tên có ý nghĩa hơn và dường như là chúng bộc lộ được hết ý nghĩa của bản thân nó! **Các status của ô** được tách biết ra thành **một enum để quản lý tốt hơn** vì về cơ bản chúng đều là status của một ô trong Board và khác nhau về giá trị thôi, nếu bạn nào thắc mắc vì sao mình dùng enum thì mấy bạn tìm hiểu kĩ hơn về enum nha.

Và điều đặc biệt hơn là chúng ta có thể tách biệt một vài thông tin ra 1 class giành cho cell vì class Cell đó sẽ chịu trách nhiệm cho việc quản lý các ô trong game, còn việc của board là làm việc gì đó với những cái ô này, nghe hơi khó hiểu nhỉ! Mình đến với ví dụ ngay đây:

```java
class Cell {
    private static int STATUS_VALUE = 0;

    @Getter
    private int[] attributes;
    
    public enum CellStatus {
        ..., FLAGGED(4);

        @Getter
        private value;

        CellStatus(int value) { this.value = value; }
    }
    
    // Some code here

    public boolean isFlagged() {
         return attributes[STATUS_VALUE] == CellStatus.FLAGGED.getValue();
   }
}

@AllArgsConstructor
public class Board {
    private List<Cell> gameCells;

    // Others code

    public List<Cell> getFlaggedCells() {
        List<Cell> flaggedCells = new ArrayList<Cell>();
        for (Cell cell: gameCells) {
            if (cell.isFlagged())
                flaggedCells.add(cell);
        }
        return flaggedCells;
    }
}
```

Và đây là kết quả của new version of GameBoard. Chúng ta **tách biệt** được "cái" **ô** trong game board **ra khỏi board** và để nó chịu trách nhiệm với những việc liên quan tới bản thân nó! Cái ô đó ở tọa độ nào, bị flagged hay chưa, đã nổ chưa bây giờ chúng ta sẽ quản lý các hành vi đó ngay tại class Cell thôi. Còn việc quản lý tất cả các cells, tương tác với cell, ... là việc của class Board vì lúc này nó là người sẽ quản lý trò chơi này.

Oke với một vài việc **thay đổi tên**, **tách biệt đoạn code** ra theo **trách nhiệm của nó** thì bây giờ về mặt tổng thể, code có thể nhiều lên một chút nhưng suy nghĩ kĩ lại sau này khi app phát triển lên một chút, thì nếu ta không đặt tên rõ ràng, không tách biệt chức năng, trách nhiệm của nó ra thì lúc đấy trong class Board sẽ là 7749 tỷ dòng code và bug đấy :D

---

# 3. Tránh việc truyền đạt thông tin bị sai lệch!
Khi đặt tên chúng ta nên **tránh việc** để lại những phần gây hiểu lầm khi đọc tên, nghe hơi khó hiểu nhỉ để mình giải thích thêm! Ví dụ như bên Unix platform sẽ tồn tại những tên biến cực kì ngắn như là: `hp, aix, sco, ...` và xin khuyến cáo mọi người **không nên đặt tên biến** như bên Unix nha, nó rất rất rất khó hiểu, những từ này có thể quen thuộc với bên Unix nhưng đối với app của chúng ta thì **đừng có khiêm tốn** như vậy.

Chúng ta không nên đặt tên cho một tập các accounts như là: `accountList` - chừ khi nó đúng là một list thật. Cái từ **"List"** là một thứ gì đó khá là **giành riêng cho lập trình viên** chúng ta. Sẽ tốt hơn nếu chúng ta đặt những cái tên như là: `accountGroup` hoặc là `bunchOfAccounts` hay chỉ đơn giản là `accounts` đều sẽ tốt hơn `accountList` đấy.

Oke tới đây thì sẽ có một vài ý kiến cho rằng: **"Chúng ta viết code cho lập trình viên đọc chứ ai?"**

Mình **đồng ý** là chúng ta viết code cho lập trình viên đọc nhưng đồng thời chúng ta cũng viết sao cho nó **gần với thực tế**. Nếu dịch thô ra, giữa hai từ `accounts` và `accountList` thì chúng ta sẽ thấy sự khác biệt giữa chúng. Từ `accounts` là 1 từ ngữ rất chi là **tự nhiên**, nó cho ta thấy được đây là những tài khoản. Không như `accounts`, `accountList` dịch thô ra là "danh sách các tài khoản" - đọc đến đây chúng ta dù ít hay nhiều có lẽ sẽ **chững lại vài giây** để não chúng ta hiểu rằng đấy là các tài khoản và  nó **được quản lý** bởi 1 lớp `List` trong Java. Đấy mấy bạn hiểu ý tôi chứ. Mình sẽ **không ép các bạn** phải dùng theo cách của mình nhưng mà hãy suy nghĩ về ví dụ mình vừa nêu và đưa ra cách sử dụng phù hợp cho mình nhé.

Và bên cạnh đó việc chúng ta **đặt tên theo 1 concept** cũng tương đương với việc truyền đạt thông tin một cách rõ nghĩa đấy. Sự nhất quán trong việc đặt tên rất quan trọng. Cùng xem qua ví dụ đó là chúng ta sẽ có những lớp Service phụ trách về việc quản lý flow (luồng chạy) của business (nghiệp vụ) của 1 api và trong quá khứ chúng ta đã đặt tên như thế này:

```java
class UserBusinessService {}

class TransactionService {}
```

Có thể thấy hai cái tên, hai cách đặt khác nhau nhưng chúng đều đang hướng tới một nhiệm vụ, đó là xử lý **nghiệp vụ**. Vậy khi nhìn vào lớp **TransactionService** chúng ta sẽ không chắc nó là một lớp chuyên xử lý về nghiệp vụ và ta cần phải vào coi cách nó triển khai để hiểu. Vậy nếu cả team thống nhất đặt tên các lớp xử lý nghiệp vụ sẽ có postfix là BusinessService thì sao nhỉ, cùng xem nào.

```java
class UserBusinessService {}

class TransactionBusinessService {}
```

Có vẽ như chúng ta đã truyền đạt một cách rõ ràng hơn tới đội dev hiện tại và trong tương lai rồi đấy :-). Này nhớ nhé các bạn, chúng ta nên thống nhất cách đặt tên và đặt làm sao cho nó làm rõ được ý nghĩa về việc "bọn nó" đang làm nhé. Những người đồng nghiệp và các developer tương lai sẽ rất vui khi đọc những dòng code này đấy.

À một thêm một ghi chú nữa nè: về cách sắp xếp các method, function trong 1 class java hoặc trong file javascript nhé:
> Sắp xếp các method, function cách đặt tên **"khá" giống nhau** lại gần nhau và **nếu được** thì chúng ta nên **sắp xếp theo bảng chữ cái alphabet** các bạn nha.

Sẽ dễ chịu hơn nếu chúng ta **tìm kiếm** một vật gì đó trong **một tập các vật đã được sắp xếp ngăn nắp** đúng không nhỉ? Không ai muốn tìm trong **đống lộn xộn** cả, vậy nên hãy để ý vị trí khi chúng ta đặt thêm một hàm vào trong 1 class bên java và thêm một function trong js nha các bạn.

![](https://images.viblo.asia/02efdbd7-889c-4137-a0f6-7bd4d5087493.jpeg)

Bức hình trên nó sẽ trông giống như đoạn code này này:

```java
class UserBusinessService {
        public void createNewPartner(PartnerCreationDto dto) {...}
        public void createNewAccount(AccountCreationDto dto) {...}
        public Page<User> searchPartners(SearchCriteria criteria) {...}
        public Page<User> searchAccounts(SearchCriteria criteria) {...}
        public void updateUser(UserDto dto) {...}
}
```

---
# 4. Phân biệt một cách có ý nghĩa:
Mình viết cái tiêu đề hơi khó hiểu ha, ý mình ở đây là sẽ có những lúc các bạn cố gắng sửa **tên** của một **biến** vì nó đặt **trùng tên** và chúng ta cố gắng **đổi cách đặt** để trông nó thật sự **"khác"** với biến đã tồn tại mà lại quên đi **"quy luật vàng"** trong làng đặt tên đó là: 
> Chúng ta nên đặt những cái tên làm rõ ý nghĩa mình muốn truyền đạt.

Việc đặt tên sẽ không có ý nghĩa nếu các bạn thêm một series các số vào làm tên biến hoặc thêm một từ kì lạ nào đó vào - mặc dụ trình biên dịch nó vẫn hiểu và chạy nhưng chúng ta nên tránh việc này.

```java
public void pickActiveUser(List<User> u1, List<User> u2) {
    for (User user : u1) {
        if (user.status == "ACTIVE") {
            u2.add(user);
        }
    }
}
```

Hàm pickActiveUser này rõ ràng là khó hiểu khi chúng ta nhìn vào các tham số u1, u2 chúng ta còn không biết là đang pick active user từ đâu bỏ vào đâu nữa. Vậy thì chúng ta rename một tí nào:

```java
public void pickActiveUser(List<User> soureUsers, List<User> targetUsers) {
    for (User user : soureUsers) {
        if (user.status == "ACTIVE") {
            targetUsers.add(user);
        }
    }
}
```

Rõ ràng hơn rồi nhỉ! Đấy là ví dụ về việc chúng ta truyền một series các biến dùng số để đặt tên, vậy còn việc dùng những cái tên gây "khó chịu" thì sao nhỉ?

Tưởng tượng các bạn có một class là User và nếu như trong ứng dụng của các bạn có các class như là **UserInfo, UserData** thì ở đây các bạn đang cố gắng đặt tên hai class **UserInfo, UserData** cho nó khác so với class User ban đầu như về bản chất thì hai cái tên này đều biểu thị về **thông tin User không khác gì về ý nghĩa cả**. **Info, Data** đều không rõ ràng cũng tương tự như sử dụng các từ **a, an, the**.

Những từ như này thường được gọi là **Noise words**, đặt tên như vậy là thừa. Chúng ta nên tránh một vài trường hợp như sau:
- **variable** không bao giờ nên đặt cho tên biến.
- **table** không nên dùng đặt cho tên của một cái table (bảng), chúng ta nên đặt tên rõ ra là cái bảng đó được sử dụng cho việc gì!
- Nếu đặt tên cho tên của user là **NameString**  thì liệu nó có tốt hơn **Name** không? Một cái tên thì có bao giờ là một con số hoặc kiểu dữ liệu khác không.
- Tưởng tượng chúng ta muốn lấy thông tin về những account đang active và khi nhìn vào các phương thức mà class AccountService đang cung cấp thì chúng ta sẽ sử dụng cái nào nhỉ?
```java
public getActiveAccount();
public getActiveAccountInfo();
public getActiveAccountData();
```

Vậy nên là mình xin nhấn mạnh với mọi người là khi chúng ta đặt tên để phân biệt sự khác nhau thì chúng ta nên nhấn mạnh vào **sự khác nhau** để người đọc họ hiểu nha mọi người.

---
# 5. Sử dụng những cái tên có thể "đọc được" và "tìm kiếm được":
Chỉ đơn giản là chúng ta nên đặt tên để **đọc được** thôi! Sẽ có lúc các bạn thấy cái tên mình đặt **dài quá** và cố gắng **viết tắt** lại để trông nó **"gọn"** hơn. Đừng cố viết tắt, khi viết tắt chúng ta đã làm cho nó **khó hiểu** thêm một phần và nó không mang lại nhiều lợi ích ngoại trừ việc **đoạn code trông "ngắn" hơn nhưng khó hiểu hơn**. Hãy thử xem xét hai đoạn code sau nhé:

```javascript
function createInitialDummyData() {...}

function createIDD() {...}
```

Ta có thể thấy một việc rõ ràng là **phương thức thứ hai** sẽ gây cho chúng ta **sự khó hiểu** hơn là **phương thức thứ nhất** và nếu muốn hiểu ta lại phải nhấc cái mông lên và đi **hỏi người đã code** ra cái hàm đó dùng cho việc gì nếu đoạn code bên trong **implement chưa đủ rõ ràng** và đấy việc không rõ ràng làm ta tốn thời gian vào việc **đọc vào cách phương thức đó triển khai** và nếu không hiểu lại phải đi hỏi về người đã tạo ra đoạn code đó nữa! Thật **tốn thời gian** nhỉ :(

Vậy còn những cái tên có thể **tìm kiếm** được thì sao nhỉ? Những cái tên một ký tự và những con số sẽ thật khó để tìm kiếm mặc dù trình biên dịch ngày nay phục vụ ta rất nhiều về việc search. Một cái tên rõ ràng sẽ tốt hơn nhưng cái tên và những con số không rõ mục đích, để mình demo ngay đây nha:

```java
// Trích đoạn code này từ sách clean code nha
for (int j=0; j < 34; j++) {
    s += (t[j]*4)/5;
}

// Chuyển thành
int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;

for (int j=0; j < NUMBER_OF_TASKS; j++) {
    int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
```

Đoạn code sau khi chuyển có vẻ dài hơn 1 tí nhưng về mặt ngữ nghĩa thì rõ ràng là nó ăn đứt cái đầu rồi nhỉ. Rõ ràng, rành mạch như một bài nhạc rõ lời :D 

---
# Tạm kết:
Vậy thì mình muốn nhấn mạnh lại vài ý sau đây và mong mọi người sẽ ghi nhớ nó trong quá trình làm nghề nhá:
- Tập trung, tập trung và tập trung vào ý nghĩa mà mọi người muốn truyền đạt tới người đọc.
- Tránh việc truyền đạt thiếu thông tin, nguy hiểm lắm đấy.
- Nếu đặt tên bị trùng thì tốt nhất là chúng ta hãy đổi tên nhưng vẫn làm rõ được ý nghĩa chúng ta muốn truyền đạt, đừng vì một phút lười nhác làm cho chương trình chạy mà đặt những cái tên sai trái nhá.
- Đặt tên cho người khác họ đọc được và tìm kiếm được nha.

Okay phần sau mình sẽ tiếp tục đi tới phần cuối của việc đặt những cái tên có ý nghĩa, mọi người cùng đón đọc nha.