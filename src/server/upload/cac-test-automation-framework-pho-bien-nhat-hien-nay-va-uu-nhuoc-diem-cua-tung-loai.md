**Framework là gì?**

Framework là một thư viện các lớp đã được xây dựng hoàn chỉnh , bộ khung để phát triển các Phần mềm ứng dụng. có thể ví framework như tập các “Vật liệu” ở từng lĩnh vực cho người lập trình viên, thay vì họ phải mất nhiều thời gian để tự thiết kế trước khi dùng.

**Test automation framework là gì?**

Các automated testing framework cung cấp một kiến trúc riêng cho project kiểm thử của chúng ta, điều mà nền tảng của các công cụ test mà chúng ta sử dụng thì lại thường không cung cấp. Mỗi kiểu framework lại có những quy tắc riêng, các hướng dẫn, giao thức và thủ tục riêng dành cho các công việc như tạo test case, tổ chức và thực thi các test case.

Dưới đây là 6 framework dành cho kiểm thử tự động thường gặp nhất. 

![](https://images.viblo.asia/39b66346-7e16-44a8-a548-ad373d8dbe78.jpg)


Thứ tự được sắp xếp tăng dần theo độ phức tạp và các mức độ trong việc định hướng để đạt được các mục tiêu kiểm thử. Và các khía cạnh dùng để đánh giá việc đó bao gồm khả năng mở rộng, tính tái sử dụng, nỗ lực dành cho việc bảo trì và chi phí đầu tư dành cho các kỹ năng liên quan đến kỹ thuật như là chuyển giao kiến thức, đào tạo nhân lực hay các nỗ lực cần có để học hỏi các công nghệ mới…

**1. Module Based Testing Framework**

Với framework này, thì ta sẽ xây dựng các test script độc lập, tương ứng với từng module, các compoment hoặc các function của phần mềm ứng dụng. Việc tránh sử dụng các script phụ thuộc nhau là một yếu tố quan trọng đối với sự ổn định và khả năng bảo trì của framework này.

![](https://images.viblo.asia/c5bfda03-12b6-4502-9520-e993bc626299.jpg)

**Ưu điểm:**

Bảo trì dễ dàng và tiết kiệm chi phí.

Nếu các thay đổi được triển khai trong một phần của ứng dụng, chỉ test script của phần đó của ứng dụng cần được fixed để giữ cho tất cả các phần khác không bị ảnh hưởng.

**Nhược điểm:**

Khi có sự thay đổi về test data thì các script cũng phải thay đổi tương ứng, hoặc là bạn phải tạo mới một test script riêng biệt khác để đáp ứng sự thay đổi đó. 

**2. Library Architecture Testing Framework**

Framework này thì về cơ bản nó có nền tảng dựa theo Module Based Framework nhưng có một một số ưu điểm hơn. 

![](https://images.viblo.asia/03b16de5-77f3-4d52-b5b3-1eb647bc5285.jpg)

**Ưu điểm:**

Bảo trì dễ dàng và tiết kiệm chi phí.

Thay vì chia ứng dụng với các module và các test script tương ứng, thì ở đây ta sẽ thực hiện tách các test script của các chức năng dùng chung vào trong một thư viện chung, và có thể gọi đến bất cứ khi nào cần dùng, mà không phải làm đi làm lại cùng một scipt giống hệt nhau. Việc này giúp cho code không bị dài và dư thừa, và giảm nỗ lực thực hiện xây dựng script.

Ví dụ đơn giản bạn có thể hình dung trong việc sử dụng framework này như công việc Login vào một ứng dụng nào đó.

Thường thì bước login là bước đầu tiên phải làm trước khi thực hiện các chức năng sau đó. Vì thế, thay vì bước login này phải được xây dựng trước toàn bộ các function cần test, thì ta sẽ xây dựng một Common Lib, có chứa bước login này, vậy là từ sau ta chỉ cần gọi chức năng này ở Common ra dùng thôi chứ không phải làm đi làm lại ở từng script nữa. Việc này còn giúp ta nhàn nhã hơn nhiều trong việc nếu như bước login này có sự thay đổi nào đó cần cập nhật, thì lúc này ta cũng chỉ phải chỉnh sửa ở một nơi thôi chứ không phải đi khắp nơi để chỉnh sửa nữa!

**Nhược điểm:**

Giống với Module Based Testing Framework khi có sự thay đổi về test data thì các script cũng phải thay đổi tương ứng, hoặc là bạn phải tạo mới một test script riêng biệt khác để đáp ứng sự thay đổi đó.

**3. Data Driven Testing Framework**

Trong quá trình automation hay trong quá trình kiểm thử thông thường, việc thực hiện test một chức năng phải lặp đi lặp lại nhiều lần với các dữ liệu test khác nhau là việc mà ta sẽ phải gặp rất thường xuyên. Hơn nữa, trong một số trường hợp, ta không thể nhúng dữ liệu test vào trong test script được. Do đó mà người ta phải nghĩ tới việc sẽ lưu trữ các test data ra bên ngoài, tách biệt với các test script.

Hướng tiếp cận theo data-driven trong trường hợp này rõ ràng sẽ hiệu quả và dễ dàng quản lý hơn so với hai cách trên. Các test data cho các script được truyền vào từ một database bên ngoài, do đó tính sử dụng lại của script đó cũng cao hơn.  Các database lưu trữ dữ liệu đó có thể là các file xml, excel, file text, CSV, … Các dữ liệu này được lưu trữ theo một quy ước chung là ‘Key – Value’, các key này sẽ được sử dụng để truy cập và truyền dữ liệu vào các test script tương ứng thông qua một số thư viện chung.

![](https://images.viblo.asia/eb247d1e-bbfc-492c-bd65-e8925154efa6.jpg)

**Ưu điểm:**

Framework này sẽ giúp giảm đáng kể số lượng test script cần có so với việc sử dụng framework hướng module. 

Test data có thể thay đổi độc lập với các test script, có nghĩa là khi bạn thay đổi các giá trị của test data thì bạn chỉ cần cập nhật ở phần dữ liệu lưu trữ bên ngoài, chứ không phải vào trong từng script để chỉnh sửa gì cả.

**Nhược điểm:**

Framework này phức tạp hơn và nó cũng yêu cầu người dùng phải có một kỹ năng lập trình nhất định trong việc setup và bảo trì project.

**Ví dụ:**

Về chức năng "Gmail - Login"

**Bước 1**: Đầu tiên là tạo một tệp bên ngoài lưu trữ test data (Input data and Expected Data). 

![](https://images.viblo.asia/3ddfbbd1-42fc-4666-ac44-adf4ffc659ee.jpg)

**Bước 2:** Đưa test data vào Automation test Script. 

```
1
public void readTD(String TestData, String testcase) throws Exception {
2
                   TestData=readConfigData(configFileName,"TestData",driver);
3
                   testcase=readConfigData(configFileName,"testcase",driver);
4
                                FileInputStream td_filepath = new FileInputStream(TestData);
5
                                Workbook td_work =Workbook.getWorkbook(td_filepath);      
6
                                Sheet td_sheet = td_work.getSheet(0);
7
                                if(counter==0)
8
                                {             
9
                for (int i = 1,j = 1; i <= td_sheet.getRows()-1; i++){
10
                                if(td_sheet.getCell(0,i).getContents().equalsIgnoreCase(testcase)){
11
                   startrow = i;
12
                                   arrayList.add(td_sheet.getCell(j,i).getContents());
13
                                   testdata_value.add(td_sheet.getCell(j+1,i).getContents());}}
14
                for (int j = 0, k = startrow +1; k <= td_sheet.getRows()-1; k++){
15
                                if (td_sheet.getCell(j,k).getContents()==""){
16
                                                arrayList.add(td_sheet.getCell(j+1,k).getContents());
17
                                                testdata_value.add(td_sheet.getCell(j+2,k).getContents());}}  
18
                                }
19
                                counter++;
20
}
```

Phương pháp trên giúp đọc test data và bước kiểm tra bên dưới giúp người dùng nhập test data trên GUI.

**4. Keyword Driven Testing Framework**

Keyword driven là một dạng mở rộng của Data driven framework, nó còn được gọi với một tên khác là table-driven. Đối với hướng tiếp cận này, các test data cũng được tách khỏi các test script, và thêm vào đó các giá trị keywork của các aciton được lưu trữ trong file database bên ngoài. Các key word này chính là các hướng dẫn để xác định các action nào sẽ cần được thực hiện để test ứng dụng.

![](https://images.viblo.asia/af5fff5d-3ee3-4f18-a569-b1fe26246db6.jpg)

**Ví dụ:**   Một test case theo keyword driven testing framework như sau:

![](https://images.viblo.asia/f63d0092-3ba4-4366-96ce-2af1470af117.jpg)

Như bảng dữ liệu trên, ta có cột keywork với các giá trị như login, clickLink và verifyLink. Tùy thuộc vào tính chất của ứng dụng, thì các keyword sẽ được gọi và sử dụng tương ứng. Các keyword này có thể được gọi đến và sử dụng nhiều lần trong quá trình thực hiện test. Cột Locator/Data là giá trị locator của phần tử trên màn hình hoặc các test data cần truyền vào cho phần tử ấy.

**Ưu điểm:**

Đối với keyword driven framework, không yêu cầu quá cao đối với kỹ năng của người tạo các test cript.

Framework này cũng giúp cho các test cript của chúng ta dễ đọc hơn

**Nhược điểm:**

Người dùng nên thành thạo với cơ chế Keyword creation mechanism để có thể tận dụng hiệu quả các lợi ích do Framework cung cấp.

Framwork dần trở nên phức tạp khi nó phát triển.

**5. Hybrid Testing Framework**

Hybrid test framework là sự kết hợp giữa hai hoặc nhiều các loại framework trên. Điểm cộng lớn ở đây chính là việc phát huy các ưu điểm của các framework mà nó kết hợp sử dụng.

![](https://images.viblo.asia/03d62e8b-ccda-4bab-977b-f572686293a2.jpg)

**Ví dụ:**   một hybrid có sự kết hợp giữa common library cùng với một kho dữ liệu test là các dữ liệu đầu vào/ra và các action keyword, lúc này mỗi bộ trong kho dữ liệu sẽ bao gồm tên của đối tượng, mô tả, action keyword, UI locator và test data tương ứng.

![](https://images.viblo.asia/9719fd73-b7a7-441c-95e0-40c18c60b0d4.jpg)

**Ưu điểm:**

Nếu như sự cân bằng giữa các framework được kết hợp được đánh giá và thực thi cẩn thận thì nó lại có một sự linh hoạt rất cao đối với việc nâng cấp và bảo trì project.

**Nhược điểm:**

Đối với hybrid thì các công việc ban đầu có thể phức tạp hơn đối với các hướng tiếp cận là các framework phía trên

**6. Behavior Driven Development Framework**


Behavior Driven Developmet Framework viết tắt là BDD, framework này không giống như các framework đã kể trên, mục đích của nó là tạo điều kiện cho các bên liên quan trong quy trình phát triển phần mềm như: Business Analysts, Developers, Testes… 

Vấn đề trọng tâm đối với framework này đó là việc sử dụng các ngôn ngữ non-technical, semi-formal, hay dễ hiểu hơn là nó sẽ gần giống với ngôn ngữ tự nhiên mà chúng ta vẫn thường sử dụng để mô tả các test case theo hướng hành vi của người dùng. Có một số công cụ hỗ trợ chúng ta trong việc này như Cucumber hay Jbehave, Rbehave…

**Ưu điểm:**

Có thể tiếp cận với các yêu cầu kỹ thuật của sản phẩm sớm nhất có thể. 

**Nhược điểm:** 

Đòi hỏi sự hợp tác cao giữa team DEV và team test.

Trên đây là chia sẻ của mình về các Test Automation Framework phổ biến nhất hiện nay và ưu nhược điểm của từng loại. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!

Link tham khảo: https://sallycorner.wordpress.com/2017/12/28/types-of-test-automation-frameworks/