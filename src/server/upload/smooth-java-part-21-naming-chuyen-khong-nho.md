Đặt tên cho bất cứ cái gì, đối với mình, luôn là một công việc đau đầu. Là coder thì đặt tên lại là việc thường xuyên, tuy nhiên có thể do thường xuyên nên nó thường bị các "cao thủ code" coi nhẹ. Hay dẫu biết việc đặt tên là quan trọng nhưng đến khi bí quá thì lại tự nhủ rằng viết nhanh cho xong chứ ngồi vắt óc ra để đặt mỗi cái tên để làm gì (cũng đúng). 

Nhưng:

> *  Choosing good names takes time but saves more than it takes
> *  Our goal, as authors, is to make our code as easy as possible to understand. We want our code to be a quick skim, not an intense study.
> 
>    Robert C. Martin - the Author of "Clean Code"


Và dưới đây mình có liệt kê một số tip nhỏ trong việc đặt tên. Tips mình đưa ra ở đây chủ yếu liên quan đến **ý nghĩa** của tên. Cùng bắt đầu nhé!

## 1. **Mọi cái tên đều cần được gửi gắm một điều gì đó**

> #### ***"If a name requires a comment, then the name does not reveal its intent."***

Ví dụ đơn giản nhất là thay vì đặt là 
```
Date d = new Date(); \\ birthday
```
Nên đặt theo ngữ nghĩa của nó là :
```
Date birthday = new Date();
```

> #### ***"Make your code easy to understand "***

Ví dụ, bạn cần thiết kế một board game là một mảng 2 chiều, trong đó: bị chặn - đánh dấu 1, đi qua được - đánh dấu là 0, cửa thoát - đánh dấu là 2. 

Bạn cần viết một hàm cập nhật vị trí người chơi sau khi có thao tác di chuyển.

```
1. public void move(int xdes, int ydes){
2.		if(gameBoard[xdes][ydes]==0){
3.			player.setLocation(xdes, ydes);
4.		}
5.		else if(gameBoard[xdes][ydes]==2){
6.			player.levelUp();
7.		}
8.	}
```

Nhìn có vẻ ổn nhưng nó sẽ tốt hơn nếu bạn cung cấp thêm thông tin về ```0``` hay ```2``` mang ý nghĩa như thế nào.
```
1. public void move(int xdes, int ydes){
2. 		if(!isBlocked(xdes, ydes)){
3. 			player.setLocation(xdes, ydes);
4. 		}
5. 		else if(isExit(xdes, ydes)){
6. 			player.levelUp();
7. 		}
8. }
```
## 2. **Gắn với bản chất, tránh hiểu nhầm**
- Giả sử, bạn cần quản lý một danh sánh sinh viên kiểu  ```Student[]``` , cái tên nào là phù hợp nhất: ```studentList```, ```students``` hay ```studentArray```. Cùng phân tích nhé: 
    + `studentList`: rất dễ gây hiểu nhầm rằng kiểu dữ liệu ở đây là ```List<Student>```. Vậy nên, theo mình, cái tên này là không phù hợp.
    + Hai cái còn lại đều phù hợp. ```studentArray``` thể hiện nhiều thông tin hơn nhưng trong nhiều trường hợp ```students``` cũng OK rồi
## 3. **Tạo sự khác biệt đúng nghĩa** 

> #### ***"If names must be different, then they should also mean something different"***
Điều này luôn cần phải ghi nhớ vì chúng ta không để đặt 2 tên biến giống nhau trong cùng một scope. Do vậy, chúng ta đôi khi làm chúng khác nhau một cách tùy ý. 

Đánh số cho biến ``` b1, b2, b3, ... bN``` thường được nhiều người nghĩ đến . Cách này phù hợp khi những đối tượng  thực sự giống nhau. Nhưng các bạn thử xem ví dụ dưới đây:
```
1. public static void copyChars(char a1[], char a2[]) {
2. 		for (int i = 0; i < a1.length; i++) {
3. 			a2[i] = a1[i];
4. 		}
5. }
 ```
 Thực chất a1, a2 không giống nhau và việc đánh số không thể hiện rõ sự khác biệt đó là gì. Giải pháp đó là đặt tên lại là ```source``` và ```target```
 
Tiếp đó là ***nên bỏ qua những từ thừa thãi.***
 
 Ví dụ, bạn có một class ```Student``` thì những cái tên khác như ```StudentData``` hay ```StudentInfo``` cơ bản không tạo sự khác biệt về nghĩa.  
 
 Hay, ```variable``` không nên xuất hiện trong tên biến; ```person``` không nên xuất hiện trong tên người. 
 
 Thế vậy thì  ```Name``` với ```NameString``` nên chọn cái nào?  Hãy thử nghĩ xem có thể có trường hợp Name kiểu float hay không? Nếu có ```NameFloat``` sẽ là hợp lý còn nếu không thì chỉ cần ```Name``` là OK rồi.
 
## 4. **Độ dài của tên biến ~ phạm vi của nó** 
Những tên có một chữ cái ```i```, ```a``` nên chỉ dùng trong các **phương thức ngắn** như một local variable. 

Ngược lại, nếu một biến/ hằng số được sử dụng ở nhiều nơi thì nên đặt tên **dễ tìm, dễ hiểu** cho nó

## 5. **Rõ ràng hơn là đầy ẩn ý sâu xa** 

> #### *"Clarity is king! Professionals use their powers for good and write code that others can understand."* 

Trong các vòng lặp, biến đếm thường được đặt tên ```i```,  ```j```,  ```k```. 

Vậy có bao giờ bạn nghĩ biến đếm của mình sao không đặt tên là ```c``` không? Nó cũng ngắn gọn như vậy, mà hơn nữa, còn khác lạ nữa chớ. 

Những đấng coder thông minh thường thích tạo sự khác biệt. Nhưng sự thông minh khác người đối với bạn đôi khi lại trở thành sự khó hiểu đối với người khác. Vậy nên ```c``` chỉ nên được sử dụng nếu trước đó bạn đã sử dụng các biến  ```a```, ```b``` . 

## 6. **Tên và chức năng của nó**
#### Class Name

Đầu tiên, tên của class phải là một danh từ, viết hoa chữ cái đầu (quy ước chung)

> ***Avoid words like ```Manager```, ```Processor```, ```Data```, or `Info` in the name of a class.***

Có nhiều trường hợp đặt tên là `SomethingManager`, kiểu tên này rất phổ biến ví dụ như: `SessionManager`, `ConnectionManager`, `PolicyManager`, `QueueManager`, `UrlManager`, `ConfigurationManager`. Nghe có vẻ ổn?

Vậy bạn biết được điều gì về class có tên `UrlManager`?

Cái tên này cho biết rằng đây không phải là một URL, công việc của chính của nó là làm việc với URL. Nhưng nó không thể hiện rõ công việc cụ thể của lớp (thu thập các URL hay xác thực URL hay nó chứa mọi thao tác với URL?)

Đây chính là lý do mà thêm `Manager`vào tên giống như thêm` Object, A, An, The` vào vậy. Đây là từ được sử dụng khá nhiều vì chúng ta thường xuyên cần tạo class để quản lý, xử lý các đối tượng.

Ở đây mình xin nêu ra một số hậu tố để thay thế `Manager` mà mình tìm được:
- `Bucket/ Pool`: dùng cho kho chứa các đối tượng mà bạn không thường xuyên dùng tới

Ví dụ: Bạn cần một class để chứa các connections tới một số nguồn khác nhau. Khi cần, bạn sẽ lấy ra một connection từ class đó, đến khi dùng xong thì trả lại. Vậy tên thế nào là ổn? - `ConnectionBucket`

- `Supervisor`: cho class có công việc chính là phân bổ công việc và giám sát tiến độ

Ví dụ: Trong một hệ thống, Class chịu trách nhiệm điều phối việc thực hiện công việc cho nhiều người dùng khác nhau có thể đặt tên là `QueueSupervisor`

- `Factory`: dùng cho class chịu trách nhiệm tạo ra đối tượng
- `Shepherd`: dùng cho class quản lý vòng đời của đối tượng (khi nào khởi tạo, khi nào hủy)
- `Synchronizer`: dùng cho class chuyên copy dữ liệu giữa 2/nhiều đối tượng
- `Helper`: dùng cho class mà sinh ra chỉ để chứa method. 
Ví dụ bạn có một class `PriceHelper`, class này sẽ có các hàm tính toán/ xử lý liên quan đến giá cả ví dụ (`.calculatePrice(...)`)

Ngoài ra còn nhiều hậu tố khác có thể sử dụng như: `Coordinator, Builder, Writer, Reader, Handler, Container, Protocol, Converter, Controller, View, Entity,...`

Nếu như bạn biết gì thêm về các tình huống sử dụng các hậu tố trên thì hãy comment nhé! 

Rất sẵn lòng đón nhận :v

#### Method Name

Tên của phương thức thường bắt đầu bằng một động từ (theo quy ước chung)

Những phương thức dùng để  **truy cập**, **thiết lập** hay **kiểm tra điều kiện** liên quan đến thuộc tính thì nên ưu tiên:   `get`, `set`, hay `is`

## 7. **Nhất quán trong việc đặt tên**

>  #### ***Pick one word for one abstract concept and stick with it.***

Ví dụ, nghĩa của 3 từ `fetch`, `retrieve`, `get` là tương tự nhau. Việc sử dụng kết hợp 3 từ này sẽ có thể gây sự khó hiểu về sau. Do vậy, với một mục đích/ ý nghĩa nên chỉ sử dụng một từ để diễn tả.

## 8. **Ngữ cảnh của tên**
>  #### ***You should place names in meaningful context***

Đôi lúc cần gói các biến thành một class nếu chúng thường đi cùng nhau

Giải sử bạn có các thuộc tính sau: `firstName`, `lastName`, `street`, `houseNumber`, `city`, `state`, và `zipcode`. Sẽ là tốt hơn nếu bạn có một lớp `Address` chứa các thuộc tính:  `street`, `houseNumber`, `city`, `state`, và `zipcode`.

Đặt tên hơi lằng nhằng nhưng nó không cần phải ổn luôn ngay lập tức. Nếu bạn nghĩ ra một cái tên phù hợp hơn cái tên mà mình đã đặt, thì cứ việc thay đổi. 

Và quan trọng: Không nên đau đầu quá nhiều về việc phải có một cái tên phù hợp ngay từ lúc đầu. Nếu không nghĩ ra, bỏ qua luôn đi. Đặt sau được mà 😉!