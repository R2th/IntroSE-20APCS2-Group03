Trong bài viết trước tôi đã giới thiệu đến các bạn về clean code - meaningful name, các bạn có thể theo dõi lại bài viết ở đây [Clean code - meaningful name](https://viblo.asia/p/clean-code-meaningful-name-XL6lA9Vmlek). Để tiếp nối về chủ đề clean code, trong bài viết này tôi sẽ giới thiệu tới các bạn về vấn đề clean code trong functions. Các nội dung của bài viết chủ yếu dựa vào cuốn sách Clean Code của tác giả Robert Martin và kinh nghiệm làm việc trên một số ngôn ngữ lập trình.


Như chúng ta đã biết, hầu hết các ngôn ngữ lập trình đều hỗ trợ function và các ứng dụng cũng được xây dựng nên bởi rất nhiều các function khác nhau hay nói một cách không quá rằng functions là những line code đầu tiên để tổ chức nên bất kì ứng dụng nào. Chính vì lẽ đó là làm sao để viết một function thật tốt là chủ đề của bài viết này.

# 1. Small
Quy định đầu tiền của function là nó nên nhỏ nhất có thể. Quy định thứ hai là nó nên nhỏ hơn thế. Thực tế không có quy định rõ ràng function có bao nhiêu dòng code được coi là nhỏ, điều này cũng phụ thuộc vào từng ngôn ngữ. Tuy nhiên, theo ý kiến cá nhân của tôi một function nên nhỏ hơn 20 line code, tốt nhất là dưới 10. Tại sao chúng ta lại cần function nhỏ? Bởi đơn gian càng ngắn gọn thì càng dễ đọc và dễ để hiểu. Bạn sẽ cảm thấy thế nào nếu đọc function như bên dưới:

```java
public static String testableHtml(
    PageData pageData,
    boolean includeSuiteSetup
) throws Exception {
    WikiPage wikiPage = pageData.getWikiPage();
    StringBuffer buffer = new StringBuffer();
    if (pageData.hasAttribute("Test")) {
        if (includeSuiteSetup) {
            WikiPage suiteSetup =
                PageCrawlerImpl.getInheritedPage(
                    SuiteResponder.SUITE_SETUP_NAME, wikiPage
                );
            if (suiteSetup != null) {
                WikiPagePath pagePath =
                    suiteSetup.getPageCrawler().getFullPath(suiteSetup);
                String pagePathName = PathParser.render(pagePath);
                buffer.append("!include -setup .")
                    .append(pagePathName)
                    .append("\n");
            }
        }
        WikiPage setup =
            PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
        if (setup != null) {
            WikiPagePath setupPath =
                wikiPage.getPageCrawler().getFullPath(setup);
            String setupPathName = PathParser.render(setupPath);
            buffer.append("!include -setup .")
                .append(setupPathName)
                .append("\n");
        }
    }
    buffer.append(pageData.getContent());
    if (pageData.hasAttribute("Test")) {
        WikiPage teardown =
            PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
        if (teardown != null) {
            WikiPagePath tearDownPath =
                wikiPage.getPageCrawler().getFullPath(teardown);
            String tearDownPathName = PathParser.render(tearDownPath);
            buffer.append("\n")
                .append("!include -teardown .")
                .append(tearDownPathName)
                .append("\n");
        }

        if (includeSuiteSetup) {
            WikiPage suiteTeardown =
                PageCrawlerImpl.getInheritedPage(
                    SuiteResponder.SUITE_TEARDOWN_NAME,
                    wikiPage
                );
            if (suiteTeardown != null) {
                WikiPagePath pagePath =
                    suiteTeardown.getPageCrawler().getFullPath(suiteTeardown);
                String pagePathName = PathParser.render(pagePath);
                buffer.append("!include -teardown .")
                    .append(pagePathName)
                    .append("\n");
            }
        }
    }
    pageData.setContent(buffer.toString());
    
    return pageData.getHtml();
}
```

Bạn sẽ thực sự thấy hoang mang khi nhìn thấy code trên phải không? Vậy bây giờ ta thử xem function mà tác giả đã refactor:

```java
public static String renderPageWithSetupsAndTeardowns(
    PageData pageData, boolean isSuite
) throws Exception {
    boolean isTestPage = pageData.hasAttribute("Test");
    if (isTestPage) {
        WikiPage testPage = pageData.getWikiPage();
        StringBuffer newPageContent = new StringBuffer();
        includeSetupPages(testPage, newPageContent, isSuite);
        newPageContent.append(pageData.getContent());
        includeTeardownPages(testPage, newPageContent, isSuite);
        pageData.setContent(newPageContent.toString());
    }
    
    return pageData.getHtml();
}
```

Rõ ràng code sau khi refactor đã rõ ràng hơn nhiều, ít nhất chúng làm bạn dễ tiếp cận hơn so với trước.

# 2. Do one thing
Kim chỉ nam cho điều này chính là:

> FUNCTIONS SHOULD DO ONE THING . THEY SHOULD DO IT WELL .
THEY SHOULD DO IT ONLY .

Đối với một function nó nên làm một cái gì đó hoặc trả lời một cái gì đó nhưng không nên làm cả hai. Ví dụ sau cho thấy việc làm 2 công việc trong một function:

```csharp
public News GetHotNews()
{
  	News hotNews = newsRepository.getHotNews();
   int viewNumber = hotNews.viewCount + 1;
   newsRepository.updateViewCount(viewNumber);

   return hotNews;
}

```

Bạn có thể thấy rằng function nhằm mục đích để lấy ra tin tức mới nhất, nhưng trong đó nó cũng thực hiện việc cập nhật lượt xem vào trong database. Như vậy, function này đang làm hai công việc. Ở đây chúng ta cần phân biệt giữa việc làm nhiều việc và việc có nhiều step để thực hiện một công việc nào đó. "Do one thing" ở đây không có nghĩa là nếu chỉ lấy dữ liệu là chỉ có duy nhất một line code để lấy nó từ database mà có thể có nhiều step chuẩn bị để lấy ra được dữ liệu đó. Dưới đây là ví dụ cho điều này:

```csharp
public News GetHotNews()
{
    int categoryId = Resquest.Get('category');
    string strCurrentDate = DateTime.Now().Format('dd-MM-YYYY');
  	News hotNews = newsRepository.getHotNews(categoryId, strCurentDate);

   return hotNews;
}

```
Các bạn có thể thấy fucntion trên thực hiện lấy ```categoryId``` từ request, tiếp theo lấy ```strCurrentDate``` từ đối tượng DateTime và cuối cùng lấy tin mới nhất với vào đầu vào là ```categoryId``` và ```strCurrentDate```. Tóm lại, các step mà trong đó thực hiện những việc nhằm mục đích để phục vụ cho nhiệm vụ cuối cùng của function thì vẫn coi function đó làm một việc. Vậy để xác định nhiệm vụ của function là gì chúng ta hãy xem function name là gì, hay dựa vào tên của nó để xác định nhiệm vụ và công việc nó phải làm. Nếu làm những việc khác không liên quan đến nhiệm vụ đó thì coi là làm nhiều hơn một việc.

Thực sự việc làm thế nào để xây dựng hay định nghĩa một cách đầy dễ hiểu "Do one thing" là rất khó khăn nhưng bạn có thể hiểu được ý tưởng chính của nó cũng là ổn rồi. Một function được gọi là làm một việc còn phải đảm bảo "One level of abstraction per function". Chúng ta sẽ đi đến phần tiếp theo để làm rõ hơn về điều này

# 3. One Level of Abstraction per Function
Chúng ta hãy xem xét một ví dụ sau:

```csharp
public List<Category> GetCategoriesInHomePage()
{
    List<Category> allCategories = categoryRepository.getAll();
    List<Category> categoriesInHomPage = allCategories.where("isInHomePage", True);
    
    return categoriesInHomePage;
}
```

Ở function trên có một điểm được coi là vi phạm rule "One Level of Abstraction per Function". Tại sao lại như vậy ? Bởi vì ```categoryRepository.getAll()``` là một function lấy dữ liệu ở tầng Repository và được gọi ở tầng Controller chẳng hạn, phần code ```allCategories.where("isInHomePage", True)``` thực hiện filter dữ liệu ngay ở tầng Controller. Như vậy ở function này tồn tại hai level khác nhau của code. Nghĩa là phần code filter đúng ra nên được viết trong một hàm ở Repository sau đó gọi hàm này trong Controller. Giống kiểu như thế này:

```csharp
public List<Category> GetCategoriesInHomePage()
{
    List<Category> allCategories = categoryRepository.getAll();
    List<Category> categoriesInHomPage = categoryRepository.GetCategoriesInHomePage(allCategories);
    
    return categoriesInHomePage;
}
```

Hay ngắn gọn hơn:

```csharp
public List<Category> GetCategoriesInHomePage()
{
    return categoryRepository.GetCategoriesInHomePage();;
}
```

Việc có nhiều level trong một hàm sẽ gây khó hiểu cho người đọc vì code bị mix giữa các tầng khác nhau. Vì vậy nếu có thể chúng ta nên viết các function trong cùng một level. Tuy nhiên, trong thực tế chúng ta vẫn phải viết nhiều level trong một function. Để giúp code dễ đọc trong trường hợp này, chúng ta nên tổ chức code như sau:

``` csharp
public function DoSomeThing()
{
   // Do works at level 1
   DoWork1();
   DoWork2();
   ...
   
   if (condition1)
   {
      // Do works at level 2
      DoWork3();
      ...
   } 
   else
   {
        // Do works at level 2
      DoWork4();
      ...
   }
   
}
```

Hoặc:

``` csharp
public function DoSomeThing()
{
   // Do works at level 1
   DoWork1();
   DoWork2();
   ...
   
   switch (condition)
   {
      case A:
          // Do works at level 2
          DoWorkA();
          ...
          break;
       case b:
          // Do works at level 2
          DoWorkB();
          ...
          break;
   } 
}
```

Chúng ta có thể hiểu đại ý là tổ chức code theo kiểu mục lục của một quyển sách. Làm sao để người khác đọc từ trên xuống dưới có thể hiểu nội dung function như một câu chuyện.

# 4. Function Arguments
Có một số rule về đối số của function mà các bạn nên tuân theo như bên dưới:

- Một function lý tưởng là function không có tham số
- Nên chỉ sử dụng một đến hai tham số
- Khi có một lý do đặc biệt thì mới dùng đến 3 tham số
- Tuyệt đối không nên viết một function trên 3 tham số
- Không dùng tham số kiểu boolean bởi vì như vậy đang làm 2 việc trong function.


Chúng ta biết rằng function càng nhiều tham số sẽ khiến logic của nó càng phức tạp, khiến người đọc phải phán đoán tham số đó là gì, nó lấy từ đâu, giá trị bằng A thì thế nào và bằng B thì ra sao,..Đồng thời việc viết unit test cho nó cũng trở nên khó khăn, số case tăng thêm, việc viết thiếu case hoàn toàn có thể xảy ra. Chính vì lẽ đó, chúng ta viết function càng ít tham số càng tốt. Đối với những function không có cách này giảm số tham số đi chúng ta hãy nghĩ đến cách dùng mảng hay object. Chẳng hạn:

**Thay vì:**
````csharp
public void AddCustomer(string firstName, string lastName, string phone)
{
    //
}
````
**Nên:**
````csharp
public void AddCustomer(Customer newCustomer)
{
    //
}
````

##
**Thay vì:**
````csharp
public void UpdateAddresses(string address1, string address2, string address3)
{
    //
}
````
**Nên:**
````csharp
public void UpdateAddresses(List<string> addresses)
{
    //
}
````

# 5. Don’t Repeat Yourself

Việc lặp code là xấu xí, không chỉ trong function mà ở trong bất kì thành phần nào của code trong ứng dụng. Bạn nên ngay lập tức refactor nếu thấy có code lặp lại, nên đưa phần code lặp đó vào một function khác. Bạn biết rằng khi code trùng lặp nếu có một thay đổi nào đó chúng ta sẽ cần thay đổi nhiều chỗ khác nhau, điều này dễ dẫn đến việc sửa thiếu. Mặc dù các editor hiện nay đều có thể hỗ trợ để hạn chế điều này. Dù vậy việc sửa chỉ một chỗ duy nhất sẽ tốt hơn nhiều so với việc phải sửa nhiều chỗ. Các bạn hãy quan sát code mà có sự lặp lại như bên dưới:

```csharp
public Response ValidateCustomer(Customer customer)
{
    if(customer.Id == null)
    {
        return new Response {
            "code": 404,
            "message": "Customer Id not found"
        };
    }
    
    if(customer.Id.Length < 10 )
    {
        return new Response {
            "code": 400,
            "message": "Customer Id not valid"
        };
    }
    
    if(customer.Name == "" )
    {
        return new Response {
            "code": 400,
            "message": "Name is required"
        };
    }
    
    return new Response {
         "code": 200,
         "message": "OK"
     };
}
```

**Refactor:**
```csharp
public Response ValidateCustomer(Customer customer)
{
    if(customer.Id == null)
    {
         return this.GetResponse(404, "Customer Id not found");
    }
    
    if(customer.Id.Length < 10)
    {
        return this.GetResponse(400, "Customer Id not valid");
    }
    
    if(customer.Name == "")
    {
        return this.GetResponse(400, "Name is required");
    }
    
    return this.GetResponse(200, "OK");
}

private Response GetResponse(int code, string message)
{
     return new Response {
         "code": code,
         "message": message
     };
}
```

# 6. Tổng kết
Function một đơn vị mà hầu hết các ngôn ngữ lập trình đều có, các lập trình viên hàng ngày thường xuyên làm việc với nó. Vì vậy việc làm sao viết một function ngắn gọn, dễ đọc, dễ hiểu là rất quan trọng. Và để thực hiện được điều này thì cũng cần có các rule cho nó. Hy vọng những rule mình giới thiệu trên đây dễ hiểu và có thể áp dụng cho ngôn ngữ các bạn đang làm. Những nội dung này tôi chủ yêu tham khảo từ cuốn sách **"CLEAN CODE- By Robert Martin"**. Cảm ơn các bạn đã chú ý theo dõi.