# 1. Giới thiệu về clean code
Là một lập trình viên chắc hẳn ít nhiều các bạn đã biết đến các khái niệm về clean code, coding convention. Tuy nhiên, không phải ai cũng đánh giá đúng tầm quan trọng và ý nghĩa của việc này. Hoặc vì một lý do nào đó như sức ép về tiến độ, từ leader, từ khách hàng chúng ta thực hiện thiếu nhất quán và chưa triệt để. Chúng ta thường tự lừa dối mình rằng: "***Cứ làm cho nó chạy đã rồi sau này refactor, nhưng sau ở đây thường là không bao giờ***". Mỗi ngôn ngữ lập trình đều có những quy định riêng về coding convention, giữa chúng có những điểm giống và khác nhau nhất định. Còn clean code nó giống như một kim chỉ nam, hay nói đúng hơn là định hướng về tuy duy cho việc tối ưu code, giúp cho code dễ đọc, dễ hiểu, dễ bảo trì mà bất kì ngôn ngữ nào cũng có thể áp dụng được. Có nhiều cách định nghĩa khác nhau về clean code nhưng với tôi định nghĩa sau đây là tương đối dễ hiểu:


> Clean code can be read, and enhanced by a
developer other than its original author. It has
unit and acceptance tests. It has meaningful
names. It provides one way rather than many
ways for doing one thing. It has minimal depen-
dencies, which are explicitly defined, and pro-
vides a clear and minimal API. Code should be
literate since depending on the language, not all
necessary information can be expressed clearly
in code alone. 
--- **Dave Thomas** ---

# 2. Sự cần thiết của clean code
Tôi đã đọc cuốn sách **Clean code** của **Rebert C Martin**, trong đó tác giả có nhắc đến một câu chuyện của một công ty thế này: Công ty có một sản phẩm phần mềm đã được đưa vào hoạt động, nhưng do việc coding không được tối ưu ngay từ đầu cho nên qua thời gian khi các tính năng năng mới được đưa vào thì phần mềm đó ngày càng trở nên cồng kềnh và rối rắm. Đến một ngày, phần mềm đó không thể khắc phục nổi những vấn đề hiện có do sự lộn xộn trong code gây ra. Có hai khả năng có thể xảy ra. 
- Một là công ty này không có giải pháp khả dĩ nào đưa ra dẫn đến phần mềm hoạt động ngày càng kém hiệu quả, mất đi sức hút với người dùng, bị đối thủ cạnh tranh bỏ lại phía sau, doanh thu giảm sút và cuối cùng công ty có thể phá sản. 
- Thứ hai là công ty đó quyết định đập đi xây lại từ đầu, với cách này cần phải duy trì 2 đội phát triển, một đội bảo trì hệ thống đang chạy, một đội phát triển mới. Thế nhưng trong khi đội phát triển mới đang xây dựng thì đội bảo trì vẫn cần fix bug, hoặc bổ sung một tính năng nào đó và cứ như thế đội phát triển mới sẽ liên tục phải cập nhật những thay đổi này và việc phát triển mới cứ kéo dài mãi. 

Câu chuyện ở trên, tác giả muốn nhấn mạnh rằng nếu không chú trọng đến việc tối ưu hóa coding ngay từ đầu thì cái giá phải trả về sau sẽ rất lớn. Với những lập trình viên như chúng ta có hai cấp độ về coding cần quan tâm đến đó là kiến trúc hệ thống (design pattern) và clean code. Design pattern rất quan trọng, nó giống như một bản thiết kế, bản thiết kế có tốt thì ngôi nhà xây lên với vững chắc, mới đẹp. Tuy nhiên đây không phải chủ đề tôi muốn đề cập trong bài viết này. Cái mà lập trình viên thường xuyên tiếp xúc, thường xuyên làm việc hơn chính là các module, class, function, variables, loop, if/else,..Vì vậy, mình đánh giá việc tối ưu những thành phần này cũng rất quan trọng.

Theo đánh giá của cá nhân mình việc clean code có những lợi ích sau:

- Giúp code dễ đọc, dễ để hiểu, dễ bảo trì
- Nâng cao hiệu suất hoạt động của phần mềm
- Giảm chi phí phát triển, bảo trì cho cả vòng đời sản phẩm
- Việc thay thế nhân sự phát triển sẽ không  gặp nhiều khó khăn
- Nâng cao khả năng tư duy, tính cẩn thận, tỉ mỉ cho lập trình viên

Có thể nói, kiến thức về clean code là rất rộng nó bao gồm: Meaningful, simple condition/loop logic, function, class, unit test, error handing, comment, code format,..Vì thế trong một bài viết mình không thể trình bày hết ở đây. Trong bài viết này mình sẽ tập trung giới thiệu đến các bạn những quy định trong việc đặt tên (Meaningful). Trong các ví dụ, tôi sử dụng code C#.

# 3. Đặt tên có ý nghĩa (meaningful)

### Sử dụng tên tiết lộ thông tin
Để tìm một cái tên tốt tương đối mất thời gian, nhưng nó sẽ tiết kiệm rất nhiều thời gian cho bạn sau này. Vì vậy hãy luôn chú ý làm sao đặt tên tốt nhất có thể và thay chúng khi tìm được cái tên nào tốt hơn. Mọi người khi đọc code của bạn (bao gồm cả chính bạn) sẽ cảm thấy hạnh phúc hơn.

Vậy như thế nào được gọi là một cái tên tốt ? Tên của một variable, function, classs nên trả lời các câu hỏi lớn. Nó nên nói cho người đọc biết tại sao nó tồn tại và làm thế nào để sử dụng. Nếu tên bạn đặt yêu cầu một comment thì đây không phải là một tên tiết lộ thông tin. Ví dụ:

**Bad**:
```csharp
private int d; //elapsed time in days
```
**Good**:
```csharp
private int sedTimeInDays;
private int daysSinceCreation;
private int daysSinceModification;

```

Với biến là một kiển bool thì nên bắt đầu bằng các từ như: ```is, should, has, not,..```
```csharp
private bool isProductDeleted;
private bool hasProductOrdered;
```

**Bad**:
```csharp
public List<int[]> GetList()
{
    List<int[]> list1 = new List<int[]>();
    for (int[] x in theList)
    {
        if (x[0] == 4)
        {
            list1.Add(x);
        }
    }
    
    return list1;
}
```
**Good**:
```csharp
public List<Cell> GetFlaggedCells()
{
    List<Cell> flaggedCells = new List<Cell>();
    for (Cell cell in gameBoard)
    {
        if (cell.isFlagged())
        {
            flaggedCells.Add(cell);
        }
    }
    
    return flaggedCells;
}
```

### Đặt tên có ý nghĩa riêng biệt

Trong nhiều trường hợp, chúng ta thường gặp các cách đặt tên sau:

```
ProductInfo, ProductData, CustomerObject, loginResult,..
```

Nếu không phải là một người trực tiếp code, thật khó để hiểu ``Info``, ```Data```, ```Object```, hay ```Result``` để biểu thị cho cái gì, phạm vi của nó là gì. Những từ như thế này được gọi là **Noise words** hay có thể hiểu là các từ rất chung chung, không thể  hiện cụ thể dữ liệu nó sẽ mang là gì. Chúng ta nên tránh dùng các **Noise words** này. Thay vì thế, ta có thể đặt các tên làm cho cho thể hiện rõ dữ liệu đang nói đến. Ví dụ:

```
ProductOrder, ProductAttributes, CustomerAddresses, isLoginFailed,..
```

### Thống nhất trong cách đặt tên
Trong cùng một hệ thống phần mềm, nếu cùng một phạm vi, một hành động thì chúng ta nên dùng một từ thống nhất để đặt cho nó. Ví dụ, cùng là lấy dữ liệu từ databse nhưng có chỗ đặt là ```GetProducts()```, chỗ khác lại đặt là ```FetchProductOrders()``` hay ```LoadCategories()```. Tôi muốn nhất mạnh ở đây là cùng là hành động lấy dữ liệu ở database thì ta nên chỉ dùng hoặc là ```get``` hoặc ```fetch``` hoặc ```load``` chứ không nên dùng lẫn lộn. Bởi vì nếu làm vậy, một người khác đọc code sẽ băn khoăn liệu việc ```FetchProductOrders()``` có khác gì với ```GetProductOrders()``` hay không.

**Bad**:
```csharp
public List<Product> GetProducts()
public List<ProductOrder> FetchProductOrders()
public List<Category> LoadCategories()
```
**Good**:
```csharp
public List<Product> GetProducts()
public List<ProductOrder> GetProductOrders()
public List<Category> GetCategories()
```

Có ý kiến cho rằng việc đặt tên một cách thống nhất còn quan trọng hơn việc đặt tên sao cho chuẩn ngữ pháp (ngữ pháp ở đây kiểu như: tên biến nên là một danh từ, function bắt đầu bằng động từ, class là một danh từ,...). Tôi đồng tình với quan điểm này vì chỉ cần các rule được thông nhất xuyên suốt hệ thống thì dù tên có không đúng ngữ pháp thì người đọc vẫn có thể hiểu. Tôi có ví dụ thế này:

```csharp
getProductsParameters
```

Nếu theo chuẩn ngữ pháp thì đây giống như một function hơn là một biến. Nhưng nếu ta coi đây là một tham số để truyền vào một api để lấy danh sách sản phẩm thì cũng không vấn đề gì cả nếu như tất cả các api đều thống nhất cách đặt tên như vậy.

```csharp
getProductsParameters;
getCategoryParameters;
getCustomersParameters
```

### Đặt tên có thể phát âm được
Tại sao việc đặt tên có thể phát âm được lại quan trọng ? Bởi vì lập trình là một hoạt động mang tính xã hội, nhóm tức là cần nhiều sự thảo luận, trao đổi với nhau. Sẽ thế nào nếu lập trình viên A nói với lập trình viên B rằng "Tôi có debug biến x=1, biến y =2 nhưng tại sao hàm abc lại sai nhỉ ?". Liệu ông B có hiểu ông A đang nói gì không ? Khả năng lớn là không hiểu gì.

**Bad**:
```csharp
public static void CopyChars(char a1[], char a2[]) 
{
    for (int i = 0; i < a1.length; i++) 
    {
        a2[i] = a1[i];
    }
}
```
**Good**:
```csharp
public static void CopyChars(char source[], char destination[]) 
{
    for (int i = 0; i < source.Length; i++) 
    {
        destination[i] = source[i];
    }
}
```

### Đặt tên để có thể dễ tìm kiếm
Bạn đang cần một tên biến để sửa giá trị của nó ? Sẽ thế nào nếu bạn đặt tên như sau:

```csharp
public void HandleRequestsLimit()
{
    int r = 5;
    int requestCount = Session('RequestCount');
    if (requestCount == r)
    {
        return HTTP_NOTFOUND;
    }
    
    requestCount++;
    Session.Add("RequestCount", requestCount);
    
    return Next();
}
```

Cái tên ```r``` có thể xuất hiện ở rất nhiều nơi trong tên biến khác, tên function, tên class, thậm chí cả keywords do đó rất khó để nhanh chóng tìm ra. Hơn thế nữa, vì nó là cái tên không mang ý nghĩa nên sau một thời gian quay lại bạn có thể chẳng còn nhớ gợi ý nào để tìm nó nữa. Chính vì các lý do này chúng ta cần đặt các tên làm sao để sau này chúng ta có thể dễ dàng tìm lại. Tôi có thể sửa lại tên biến như bên dưới:

```csharp
public void HandleRequestsLimit()
{
    int MAX_REQUEST_LIMIT = 5;
    int requestCount = Session('RequestCount');
    if (count == MAX_REQUEST_LIMIT)
    {
        return HTTP_NOTFOUND;
    }
    
    requestCount++;
    Session.add("RequestCount", requestCount);
    
    return Next();
}
```

Có một lưu ý là với tất cả các hằng số các bạn đều nên đặt tên cho nó, ngay cả nó chỉ dùng một chỗ duy nhất. Mục đích để sau này tìm lại. Việc nhớ giá trị 5 sẽ là khó hơn nhớ tên ```MAX_REQUEST_LIMIT```

### Tên class
Với hầu hết các ngôn ngữ thì tên của class luôn là một danh từ hoặc một cụm danh từ như: 
```
Customer, Product, ProductOrder, WikiPage, ...
```
Nên tránh các từ như ```Manager```, ```Processor```, ```Data``` hoặc ```Info``` trong tên một class. Thêm nữa, tên class thì không nên là một động từ

### Tên function
Tên function nên bắt đầu bằng một động từ hoặc một cụm động từ như:

```
GetCustomerById()
DeleteCustomer()
SaveCustomer()
PostPayment()
IsUserAuthenticated()
...
```

# 4. Thảo luận
Ở mỗi ngôn ngữ sẽ có những quy định khác nhau về cách đặt tên biến, function, class. Trong bài viết này tôi chỉ nêu ra những điểm mà theo tôi là quan trọng giúp các bạn biết làm thế nào có thể đặt được một cái tên thật sự dễ hiểu. Các bạn có thể tìm hiểu thêm những điểm cần chú ý khác trong cuốn sách **Clean code by Rebert by C Martin**. Những rule này có thể áp dụng cho bất kì ngôn ngữ lập trình nào, do đó các bạn hoàn toàn có thể thử nghiệm trên ngôn ngữ hiện tại đang làm việc. Hy vọng bài viết mang lại những điều bổ ích cho các bạn. 

**Tài liệu tham khảo:**

Book: **Clean code by Rebert by C Martin**