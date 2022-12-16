Tên xuất hiện mọi nơi trong phần mềm. Chúng ta có tên biến, tên hàm, tên đối số, tên lớp, và package. Chúng ta đặt tên cho file mã nguồn, đường dẫn chứa chúng... Chúng ta thực hiện đặt tên, đặt tên và đặt tên. Bởi vì chúng ta làm việc đặt tên rất nhiều nên hãy cố làm nó một cách tốt nhất. Một số tips là một số rule đơn giản giúp bạn tạo ra một cái tên tốt ^^

# 1. Sử dụng tên có thể gợi lên các thông tin
Tên cuả một biến, hàm hoặc lớp nên trả lời tất cả các câu hỏi lớn: nó nói cho bạn là tại sao nó tồn tại, nó làm cái gì và sử dụng nó như thế nào. Hãy xem xét cách đặt tên sau:
```C
int d; // elapsed time in days
```
Tên d hoàn toàn không có một ý nghĩa nào. Bạn không nên đặt tên như vậy, thay vào đó bạn nên đặt một tên gợi lên ý nghĩa, như thêm đơn vị chẳng hạn, cái gì đang được đo lường trong biến này và đơn vị đo lường của nó là gì:

```C
int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
```

OK, code có vẻ dễ đọc hơn rồi đó. Bây giờ thử xem xét đoạn code sau:
```C
public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();
    for (int[] x : theList)
        if (x[0] == 4)
            list1.add(x);
    return list1;
}
```
Đoạn code chạy rất ổn nhưng có vẻ khó hiểu quá. Hàng tỉ câu hỏi có thể được đặt ra với đống code này nhưng mình trích xuất 4 câu hỏi chính:
1. theList là cái quái gì?
2. Tầm quan trọng cuả x[0], tại sao lại dùng nó để so sánh?
3. Dấu hiệu 4 để so sánh mang ý nghĩa gì ????
4. Giá trị trả về được sử dụng như thế nào?

Các câu trả lời hoặc hàm ý trả lời các câu hỏi đó hoàn toàn có thể được bạn thể hiện trong code nếu bạn tinh ý một chút trong việc đặt tên biến. Hãy coi đoạn code trên xử lý một trò chơi, mỗi hàng (Cell) trên bảng (gameBoard) được biểu diễn bởi một mảng đơn giản. Nhiện vụ của ta là xem phần tử đầu của mỗi hàng đó có phải là một "cờ" nào đó không (isFlagged) và trả về các cột thỏa mãn điều kiện đó, easy thôi mà:

```php
public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>();
    for (Cell cell : gameBoard)
        if (cell.isFlagged())
            flaggedCells.add(cell);
    return flaggedCells;
}
```
Đoạn code có vẻ ngon hơn rồi đó :D nó mang nhiều ý nghĩa hơn rồi.
    
# 2. Tránh sai lệch ý nghĩa
Lập trình viên nên tránh các tên gây hiểu nhầm, sai lệch nghĩa cho người khác. Ví dụ như đặt tên là `accountLists` nhưng các phần tử trong nó lại là một array chứ không phải là một list. Thay vào đó, hãy đặt tên là `accountGroup` hoặc `bunchofAccounts` hoặc tốt nhất là `accounts`.

# 3. Tạo sự phân biệt có nghĩa
Cách đặt tên biến theo kiểu `a1, a2, ... aN` tạo ra sự phân biệt nhưng đó thực sự là một cách đặt tên biến tồi. Xem xét đoạn code copy chuỗi mà ta vẫn hay viết:
```C
public static void copyChars(char a1[], char a2[]) {
    for (int i = 0; i < a1.length; i++) {
        a2[i] = a1[i];
    }
}
```
Nhìn vào tên hàm thật khó biết đâu là chuỗi đích đâu là chuỗi nguồn. Thay vào đó hãy đổi tên thành `source` và `destination`.
Các từ "noise words" (a, an, the...) cũng không nên xuất hiện xuất hiện làm tiền tố trong tên biến. Từ `varialbe` không bao giờ nên xuất hiện trong tên biến, từ `table` không bao giờ nên xuất hiện trong tên một cái bàn. Bạn có bao giờ thử hỏi `NameString` tốt hơn hay `Name` tốt hơn. Có khi nào Name lại có kiểu float hay int? OK tôi cứ thích thì sao? Vậy bạn nên đọc lại nguyên tắc số 2 :D.

# 4. Sử dụng một tên có thể phát âm được

Nghe có vẻ kỳ kỳ nhưng nó thực sự rất hay. Bạn đặt tên biến là `genymdhms` (giả sử là viết tắt các chữ cái đầu của 1 cụm từ nào đó bạn nhớ được đi) sau đó anh X review code cho bạn nói "X ơi, dòng XXX em viết biến ...." (5 phút để đọc).

Với các tên không thể phát âm gây khó chịu và rắc rối khi trao đổi giữa các thành viên, nó biến chúng ta nói chuyện như những người bất bình thường @@.

# 5. Sử dụng tên có thể tìm kiếm được
Các trình soạn thảo ngày càng được phát triển mạnh mẽ giúp việc tìm kiếm trở nên dễ dàng trong đó có cả tên. Bạn thích đặt tên ngắn, một hoặc 2 ký tự cho code nhanh (ví dụ tên `s` chẳng hạn), vào đoạn code 1000 dòng, bạn nhớ là mình đã đặ tên nó là `s` xong tìm kiếm từ s và kết quả là bạn nhận về 300 kết quả. Chịu khó ngồi dò đi nhé :D.

Các số cũng vậy, tìm một số sẽ có rất nhiều kết quả, thay vào đó bạn nên gắn nó một biến const:
```C
for (int j=0; j<34; j++) {
    s += (t[j]*4)/5;
}
```
nên được chuyển thành:
```C
int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;
for (int j=0; j < NUMBER_OF_TASKS; j++) {
    int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
```
Đặt tên một biến có thể tìm kiếm giúp bạn rút ngắn thời gian tìm kiếm tên biến, hàm và lớp đó một cách dễ dàng. Rõ ràng tìm kiếm biến NUMBER_OF_TASKS, realDaysPerIdealDay có ít kết quả hơn và dễ dàng hơn rất nhiều so với 4 hay 5 hay s.


# 6. Tránh các ánh xạ về tinh thần (Avoid Mental Mapping)

Nó nên được hiểu như thế nào? Bạn có để ý là trong vòng lặp `for()` bạn hay dùng biến `i` và `j` thậm chí `k` để chạy vòng lặp. Có bao giờ bạn dùng biến `n`? Hầu như mọi người lập trình đều bị tâm lý rằng biến `i,j` để lưu biến trong vòng lặp. Thật là thảm họa khi bạn dùng biến `i` lưu tổng số sinh viên của một lớp.

Nói đơn giản hơn, mọi người Việt Nam nhìn chữ "Thị" trong tên là trong đầu hiểu với nhau đưá đó là con gái rồi. Vì vậy nếu bạn là con trai, bạn không nên lấy cái tên "Bùi Thị Hiếu" =))

# 7. Tên lớp
Tên lớp nên là danh từ hoặc cụm danh từ như `Customer, WikiPage, Account and AddressParser` tránh sử dụng động từ như `Manager , Processor , Data , or Info.`
# 8. Tên phương thức
Tên phương thức hoặc tên hàm nên bắt đầu là động từ, trả lời câu hỏi làm gì với cái gì?. Accessors, mutators, và nhận định nên bắt đầu là get, set và is: 
```C
string name = employee.getName();
customer.setName("mike");
if (paycheck.isPosted())..
```
# 9. Đừng đặt tên "cute", chơi chữ
Cute và chơi chữ giúp văn của bạn trở nên sinh động cuốn hút người đọc nhưng làm ơn chúng ta đang lập trình, đừng nên đem lối viết văn đó vào việc đặt tên biến. Thay vì tên phương thức đặt là `HolyHandGrenade()` hãy đặt là `DeleteItem()`, thay vì đặt tên là `whack()`, hãy đặt là `kill()`, thay vì đặt tên là `eatMyShorts()` hãy đặt tên là `abort()`

# 10. Ngữ cảnh trong tên biến
Trong phương thức làm việc với địa chỉ, các tên biến như `firstName`, `lastName`, `street`, `houseNumber`, `state` có thể làm cho bạn dễ hiểu đó là các biến để lưu thông tin về địa chỉ. Tuy nhiên khi đứng một mình `state` liệu bạn có dám chắc là nó để lưu một thông tin về địa chỉ.
Do đó bạn có thể gán các thông tin về context (ngữ cảnh) cho nó để làm cho người đọc thực sự hiểu nó hơn. Bạn có thể thêm context bằng cách sử dụng prefix: `addrFirstName, addrLastName, addrState,...`

# Tổng kết
Tên ngắn hay tên dài không quan trọng, quan trọng là bạn phải đặt tên theo cách dễ đọc, dễ tìm kiếm, dễ maintain code, dễ trao đổi nhất có thể. Hi vọng với một số tips trên giúp các bạn có thể làm điều đó một cách tốt hơn.
# Tài liệu tham khảo
Chapter 2: [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)