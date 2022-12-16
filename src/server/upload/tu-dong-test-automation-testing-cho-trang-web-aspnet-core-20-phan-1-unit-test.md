![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/testing-pyramid.png)


Để đọc được trơn tru và hiểu hết toàn bộ source code được chia sẻ ở bài viết này, bạn cần phải có base vững về làm web bằng AspNet Mvc5 trở lên hoặc tốt nhất là đã từng làm qua project web ASPNET Core 2.0.


Unit Test là một công cụ mạnh mẽ sẵn có dành cho bất kỳ developer nào. Trong loạt bài này, chúng ta sẽ xem cách thêm các Unit Test vào một dự án web ASP.NET Core. Chúng ta sẽ đưa ra chiến lược test tự động lần lượt từng bước từ Unit Test rồi lên đến Test tích hợp cuối cùng là test toàn diện (end-to-end) một trang web.

> Có người từng nói: "Nếu bạn muốn đảm bảo ứng dụng của bạn hoạt động trơn tru như mong đợi, thì bạn cần phải test nó từng tí một. Không có cách nào khác".

> Tất nhiên, nói thì dễ hơn làm!

Có rất nhiều cách test, mỗi cách đều có những điểm mạnh riêng. Mỗi phương pháp tập trung vào test các khía cạnh khác nhau của ứng dụng. Để test một dự án hiệu quả nhất, bạn phải kết hợp các kỹ thuật test này. Giống như bạn phải test một trang web từ trong ra ngoài, từ BackEnd cho đến FrontEnd không bỏ sót ngóc ngách nào vậy.

# Chiến lược test tự động
Khi bạn test tự động ứng dụng của mình, bạn cần phải cố gắng kết hợp các phương pháp test khác nhau để test nhiều khía cạnh của ứng dụng nhiều nhất có thể. Tôi sẽ tóm tắt nhanh chóng các phương pháp test và điểm mạnh, điểm yếu của từng cái. Nếu phần này bạn đã biết rồi thì bạn có thể bỏ qua và bạn hãy đọc phần tiếp theo luôn (phần **Đối tượng cần test trong bài này**)

## Giới thiệu về Unit Test (Test từng hàm)
Unit Test tập trung vào việc test một `hàm` riêng lẻ được tách biệt với phần còn lại của hệ thống. Unit Test sẽ mocks (giả lập) hoặc stubs (giả danh) các tham số đầu vào của hàm đó để đảm bảo hàm đó tạo ra các kết quả đầu ra mong muốn với đầu vào tương ứng.

Chúng ta thường xem các class là các Unit (đơn vị), test các hàm public của class đó bằng cách giả lập đầu vào của hàm. Nếu bạn không thể test một class độc lập với các class khác, có nghĩa là các class của bạn kết nối quá chặt chẽ và sửa một cái này sẽ ảnh hưởng lớn đến cái kia. Bạn nên code đảm bảo được sự lỏng lẻo, các hàm này gọi hàm kia phải riêng biệt, không quá phụ thuộc.

Chúng ta cũng sẽ thấy lợi ích cực lớn của Unit Test là viết và chạy thử code của bạn (debug) mà không phải chạy toàn bộ ứng dụng lên để thao tác mà bạn có thể chọc thẳng vào hàm vừa viết để truyền tham số và xem kết quả trả về xem có đúng hay không. Lợi ích nữa là khi test các hàm chứa logic nghiệp vụ phức tạp, có nhiều if else, nhiều trường hợp rẽ nhánh, nhiều điều kiện bắt lỗi sẽ rất chính xác vì đầu vào mình chủ động truyền vào được. 

Tuy nhiên, nếu code của bạn phải xử lý nhiều đầu vào phức tạp và phụ thuộc nhiều vào code bên ngoài (như nối đến cơ sở dữ liệu, đọc file, kết nối services, kết nối thư viện hoặc framework của bên thứ 3), thì Unit test sẽ ít có tác dụng. Hầu hết Unit Test muốn hoạt động được thì phải giả lập (mocks) được các đối tượng đầu vào để truyền vào cho hàm cần test. Nếu đối tượng được khởi tạo bên trong thân hàm thì sẽ rất khó để test hàm đó với các điều kiện thay đổi. Do đó tầm quan trọng của chiến lược test là kết hợp các phương pháp khác nhau!

Viết xong một đoạn code để test một đoạn code khác hiển nhiên bạn sẽ mất thời gian gấp đôi ngồi code. Nhưng lợi ích quá rõ ràng, bạn chạy hàm để test cực kỳ nhanh. Nghĩa là bạn code và chạy test ngay khi đang code được mà không cần debug bằng cách F5 để chạy thử.

## Giới thiệu về Integration Testing (Test tích hợp)

Các test dạng này sẽ tập hợp nhiều Unit lại với nhau (có thể hiểu là nhiều class liên quan đến nhau gọi nhau), và xử lý chúng như một hộp đen được truyền một số đầu vào cụ thể để xem kết quả trả về có đúng business logic hay không.

Trong bối cảnh các ứng dụng web, người ta thường xem máy chủ web là hộp đen, viết các bài test test tích hợp các API mà không cần tác động đến trang web bằng trình duyệt hoặc tool REST nào đó (ví dụ k cần dùng đến POSTMan, Fiddle...để test).

Điều này có nghĩa là các bài test tích hợp sẽ thực thi code máy chủ web với các request HTTP thực sự, và bạn có quyền quyết định có test cả các phụ thuộc bên ngoài ví dụ như test cả DB hay không.

Khi bạn viết trang web cùng cấp các API REST, các test tích hợp này cực kỳ có giá trị. Vì test bằng debug thì bình thường các máy chủ web cần phải được bật lên (chạy web bằng F5), các bản ghi cơ sở dữ liệu cần phải được cách ly hoặc xóa toàn bộ DB và thêm dữ liệu test mẫu vào cho đúng trường hợp test. Và hãy tưởng tượng mỗi lần test liên quan đến các yêu cầu HTTP thực chúng ta phải tạo lại DB?!!. Nhưng nhược điểm đó là viết test tích hợp tốn thời gian hơn để viết và bảo trì các Unit Test. Test tích hợp cũng chạy chậm hơn và khó gỡ lỗi hơn khi có bị lỗi lúc test.

Đó là lý do tại sao test tích hợp rất hay được sử dụng khi viết các API, cần test tính đúng đắn của API ngay khi code để đảm bảo deploy lên cho user dùng thử thì sẽ không có lỗi nào nghiêm trọng vì một API sẽ gồm nhiều hàm gọi nhau và thường là đọc ghi cả DB.

Nhưng đừng nghĩ test tích hợp đã là cái gì ghê gớm, kiểm thử tích hợp không hề thay thế cho Unit Test. Bạn vẫn cần phải có test từng hàm trước đó để đảm bảo hàm nào cũng chạy đúng đã, rồi mới viết code test tích hợp các hàm đó gộp lại. Không ai đi viết Test tích hợp mà không hề test Unit bằng Automation (tự động) trước đó.

## Giới thiệu về End–to-End Testing (Test toàn diện hệ thống, còn gọi là Test giao diện)

Các bài test End-to-End sẽ test hệ thống của bạn bằng cách sử dụng thông qua giao diện như bất kỳ người dùng thông thường nào, tức là thông qua giao diện người dùng (UI) và code test cũng sẽ chọc vào các control html trên màn hình, click chuột, gõ URL điều hướng... Điều này làm cho Test toàn bộ trở nên rất tốn thời gian viết và bảo trì. Vì test được kết hợp chặt chẽ với giao diện người dùng, mà UI thường xuyên bị phá để code lại nên code để test UI cũng phải code lại luôn.

Như đã nói bên trên, trong ứng dụng web, các Test toàn bộ này sẽ tương tác với trình duyệt giống như cách người dùng làm, và thường sẽ sử dụng Selenium framework để chọc vào trình duyệt web (ví dụ chọc vào Chrome). Dĩ nhiên là các bài test này chạy chậm nhất và tốn nhất về thời gian để viết và duy trì! Nếu bạn đã từng viết code Test toàn bộ, bạn sẽ thấy thời gian viết code test là gần (hầu như là bằng) thời gian code giao diện luôn. Như vậy là gấp đôi công sức để cùng làm ra một cái app.

Và đổi lại, chúng ta có một công cụ quá tuyệt vời để chạy test toàn bộ hệ thống trên các trình duyệt và trên thiết bị thực sự (Ví dụ test trang web hiển thị trên iPhone, Android). Có công cụ này rồi bạn sẽ không sợ layout trang web bị vỡ trên Safari hay không hiển thị đẹp trên mobile nữa, các trang này gọi trang kia nếu chết bạn cũng sẽ biết rõ nguyên nhân. Bạn sẽ test hệ thống không phải từ bên trong ra như 2 cách trên, mà là từ bên ngoài vào, tức là đứng nhìn app từ góc nhìn phía người dùng.

## Các cách khác nữa để test code của bạn
Ba  phương pháp test bên trên mà chúng ta vừa thảo luận tập trung vào việc đảm bảo rằng ứng dụng hoạt động như mong muốn. Nhưng đó chưa phải là kết thúc của quá trình test tự động, vì ứng dụng của bạn có thể chạy ngon sau 3 cách test trên nhưng vẫn có thể có sai sót như thời gian phản hồi thấp (một số trang trong app tự dưng chạy chậm) hoặc các vấn đề về bảo mật.

Đó là lý do tại sao bạn có thể bổ sung cho chiến lược test của mình bằng các phương pháp bổ sung như test tải (Load Testing), test thâm nhập (Penetration Testing) hoặc Phân tích code tĩnh (Static Code Analysis).

Test tự động là một chủ đề rất lớn vượt ra ngoài 3 cách test đã trao đổi bên trên (Unit Test, Test tích hợp và Test toàn bộ hệ thống).

Và cuối cùng, đừng bao giờ quá tin tưởng vào Automation Test hoàn toàn. Mà bạn vẫn phải test thủ công như cách bạn hay debug. Hệ thống lớn thì chắc chắn vẫn cần đến các kỹ sư QA (Quality Assurance) dày dặn. Họ sẽ không chỉ bắt lỗi trên các tình huống mà bạn không lường trước, họ còn sẽ đảm bảo ứng dụng của bạn hoạt động gần nhất với các nghiệp vụ khó của hệ thống.

# Kim tự tháp test
Sau khi đã tìm hiểu 3 phương pháp test phổ biến, chúng ta có thể gom nó lại một biểu đồ thể hiện sự phức tạp khi viết test code như hình sau đây. Hình này được [Martin Fowler](https://martinfowler.com/bliki/TestPyramid.html) vẽ ra và ông gọi nó là "Kim tự tháp về testing"

![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/testing-pyramid.png)

Hình 1, Kim tự tháp test

Như bạn có thể thấy, biểu đồ này mô tả các chiến lược test và những điểm mạnh và điểm yếu của chúng.

Ở dưới cùng, bạn có một khối lớn nhất, ý nghĩa là viết các code Unit Test sẽ rất nhiều và dàn trải toàn bộ hệ thống. Gần như là mỗi hàm sẽ có một test code tương ứng, nên số lượng test code là nhiều nhất. Ví dụ một Class có 5 hàm thêm, sửa, xóa, getbyID(), getAll() thì bạn cũng sẽ phải có 5 hàm test tương ứng cho class đó. Viết Unit Test sẽ giúp developer nhận được phản hồi ngay lập tức (fast-running, chạy rất nhanh) vì chỉ test một hàm cụ thể.

Ở level 2, bạn sẽ thấy khối lượng test code viết dưới dạng Test tích hợp giảm bớt xuống. Test tích hợp đảm bảo các Unit Test sau khi lắp ghép với nhau hoạt động trơn tru, trả về kết quả mong đợi (Trong lập trình ứng dụng web, có nghĩa sẽ là test được ngay các code ở Back-End mà chưa cần code gì ở Font-End, chưa cần sử dụng interface để nhập liệu đã validate xong các hàm thêm sửa xóa DB). Các developer thường chạy test tích hợp khi thêm tính năng mới vào hệ thống hoặc trước khi commit thay đổi lên github, để đảm bảo code mới không phá vỡ cấu trúc Back-End.

Cuối cùng, ở trên cùng, bạn thấy có rất ít các bài test End-to-End để đảm bảo rằng ứng dụng của bạn về cơ bản không có bug từ góc độ người dùng thực sự. Hầu hết các đoạn code test toàn bộ hệ thống chạy rất chậm, cần phải quét lần lượt qua các Url và chụp ảnh lại interface để chắc chắn là hệ thống hiển thị đúng (Ví dụ không lỗi font, không lỗi layout, không báo lỗi vớ vỉn 404, 503...). Thường thì lập trình viên sẽ không cần chạy các Test này trên máy cá nhân mà Test này được đưa vào máy chủ và sẽ được chạy bởi các máy chủ CI (Continuous Integration Server) sau khi code đã được đưa lên môi trường được triển khai. Developer sẽ thường chỉ viết Unit Test và integration Test. Còn End2End Test thì thường do một đội QA hoặc Tester triển khai.

Hãy nhớ rằng 3 phần test trong kim tự tháp là độc lập nhau và không nhất thiết phải viết cả 3 cái. Bạn có thể chỉ dùng một hoặc 2 trong 3 cái cũng được.

Trong phần tiếp theo, chúng ta sẽ xem cách viết các bài test cho đối tượng test của chúng ta. Và phần này tập trung vào level thấp nhất của Kim tự tháp Test, đó là viết Unit Test.

# Đối tượng cần test trong bài này
Bài viết này chúng ta sẽ không đi xây dựng một ứng dụng ASP.NET Core web application từ đầu đến cuối mà chúng ta chỉ đi test web app. Do đó tôi sẽ lấy một source code cơ bản nhất, đã được viết rất gọn gàng bằng  ASP.NET Core 2.0. Trang này có thể hiểu là một trang quản lý và xuất bản các bài viết Blog. 


[Source Code của BlogPlayground ](https://github.com/dotnetcurry/asp.net-core-blogging-site) dùng để viết Unit Test.

Tên project là BlogPlayground. Và để xây dựng source code này từ đầu các bạn có thể đọc bài viết này : [aspnet-core-blog-playground](http://www.dotnetcurry.com/aspnet/1321/aspnet-core-clean-frontend-code).

![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/aspnet-core-blog-playground.png)
Hình 2, Ứng dụng Web blog mẫu được sử dụng làm đối tượng sẽ được viết Unit Test


Về cơ bản, khi bạn viết xong một ứng dụng web ASP.NET Core 2.0 thì solution sẽ chưa bao gồm project test nào cả.

Ứng dụng chúng ta sẽ test được viết rất đơn giản không có xử lý logic phức tạp. Nhưng web app kiểu này rất phổ biến và hi vọng là bài viết này sẽ miêu tả được hết các trường hợp cần test của web app nói chung.

# Viết Unit Test cho ứng dụng ASP.NET Core
Chúng ta sẽ bắt đầu từ đáy của kim tự tháp, thêm các Unit Test vào ứng dụng viết blog mẫu của chúng ta.

Để viết và chạy các Unit Test, chúng ta sẽ sử dụng:

* [xUnit](https://xunit.github.io/) làm thư viện chạy các đoạn test để test code.
* [Moq](https://github.com/Moq/moq4/wiki/Quickstart) là thư viện dùng để giả lập (mocking) đầu vào.
* Cũng cần tạo một project riêng độc lập để chứa tất cả các Unit Test tách biệt với project web app.


Điều đầu tiên chúng ta cần là một dự án Unit Test mới, nơi chúng ta có thể viết các Unit Test!

> Lưu ý: Trong thực tế nếu bạn đã code xong một project chạy ngon lành thì thường Developer sẽ bắt tay vào viết integration Test và End-To-End Test chứ ít khi người ta lại đi ngồi viết lại Unit Test. Chỉ khi nào có Change Request (có sự thay đổi yêu cầu từ KH, cần code lại chức năng) thì lúc đó bạn mới cần dùng Unit Test để test nhanh hàm mới thêm vào.

Lý do tại sao tôi không theo cách tiếp cận từ End-to-End rồi xuống integration Test rồi mới đến Unit Test, là vì tôi tin rằng dễ dàng hơn để giới thiệu các khái niệm bằng cách nhìn vào các Unit Test, hiểu điểm mạnh và thiếu sót của nó, làm nổi bật nhu cầu test mức cao hơn trước khi chuyển sang test tích hợp và kiểm thử toàn diện.

Trong Visual Studio, kích chuột phải vào Solution BlogPlayground và chọn Add> `New Project`, sau đó chọn `xUnit Test Project`.

Vì dự án chúng ta muốn test được đặt tên là BlogPlayground , hãy đặt tên cho dự án test mới là `BlogPlayground.Test`. 

Ngoài cách trên, bạn có thể gõ lệnh sau đây từ CMD để tạo project tương đương bên trên:
```
mkdir BlogPlayground.Test && cd BlogPlayground.Test && dotnet new xunit
```

Lưu ý: Nếu bạn đang băn khoăn sự khác nhau giữa các dự án test dạng `xUnit` và Visual Studio Unit Test, thì rất đơn giản cái xUnit sẽ viết code test hơi khác một chút so với MSTest (là ứng dụng test mặc định của web app của Visual Studio). Nếu bạn thích MSTest thay vì xUnit, bạn vẫn có thể làm theo bài viết này, như các quy tắc code test là như nhau, chỉ khác nhau một chút về cú pháp.

Hãy kết thúc thiết lập dự án test của chúng ta bằng cách thêm một tham chiếu đến Project cần test là `BlogPlayground` và cài đặt gói Nuget Moq (sẽ rất cần thiết để giả lập các tham số đầu vào dạng Dependency Injection).

Chúng ta sẽ tập trung vào việc thêm các Unit Test cho class `ArticlesController` , vì vậy hãy đổi tên class test đã tạo thành `ArticlesControllerTest` và move file `ArticlesControllerTest.cs` vào thư mục mới đặt tên là `Controllers`.

Lúc này Solution của bạn trông sẽ như sau:

![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/solution-explorer-unit-test-project.png)

Hình 3, Solution sau khi thêm dự án Testing Unit mới.

Chúng ta đã sẵn sàng để viết bài test đầu tiên của chúng ta cho `ArticlesController`! 

Hãy bắt đầu bằng cách thêm một unit test để đảm bảo hàm Index hiển thị đúng trang Article Blog với một danh sách các bài viết chứa trong model của trang Index Views. Vì hàm Action Result Index trả về một views trong đó có một model chứa List<Article> mà.

Tuy nhiên, sau khi xem qua đoạn code viết ở Index() chúng ta đụng ngay phải chướng ngại vật đầu tiên:

Làm thế nào chúng ta có thể tạo ra một class ArticlesController mà không truyền vào một ApplicationDbContext và một UserManager? Và nếu chúng ta test hàm Index, làm thế nào chúng ta có thể giả lập ApplicationDbContext bên trong hàm đó?

```
public ArticlesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)  //Chỗ này cần truyền vào 2 tham số từ bên ngoài
{
    _context = context;
    _userManager = userManager;
}
 
public async Task<IActionResult> Index()
{
    var applicationDbContext = _context.Article.Include(a => a.Author);  \\Chỗ này có một biến _context giời ơi được truyền vào từ bên ngoài
    return View(await applicationDbContext.ToListAsync());
}
 
// Other simpler methods omitted here!
 
public async Task<IActionResult> Create([Bind("Title, Abstract,Contents")] Article article)
{
    if (ModelState.IsValid)
    {
        article.AuthorId = _userManager.GetUserId(this.User);  //Chỗ này dùng đến một biến _userManager được truyền vào từ bên ngoài.
        article.CreatedDate = DateTime.Now;
        _context.Add(article);
        await _context.SaveChanges();
        return RedirectToAction("Index");
    }
    return View(article);
}
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var article = await _context.Article.SingleOrDefaultAsync(m => m.ArticleId == id);
    _context.Article.Remove(article);
    await _context.SaveChanges();
    return RedirectToAction("Index");
}
```

Class của chúng ta đã được viết kết hợp rất chặt chẽ với các class ApplicationDbContext và UserManager, và chúng ta sẽ phải tái cấu trúc lại code để đảm bảo code được kết nối lỏng lẻo hơn và có thể test được. Nếu không, chúng ta sẽ không thể test nó trừ khi chúng ta cung cấp các instances (các thực thể của class) của những phụ thuộc đó, trong trường hợp này chúng ta sẽ chạy các test với ApplicationDbContext được kết nối với cơ sở dữ liệu gốc. Và giả sử một người nào đó đang nhập liệu lên DB, việc chạy test sẽ dễ dàng ảnh hưởng, có thể là làm mất DB dẫn đến phải nhập lại toàn bộ DB, quá nguy hiểm.

# Tái cấu trúc theo hướng thiết kế lỏng lẻo
Hãy bắt đầu bằng cách tái cấu trúc code truy cập cơ sở dữ liệu của chúng ta để Controller không phụ thuộc trực tiếp vào ApplicationDbContext. Trong code mẫu của dự án BlogPlayground này, thì chúng ta thấy code logic được viết chung trong Controller luôn. Nhưng thực tế các dự án lớn, thường thì hầu hết các ứng dụng sẽ có một vài class viết riêng ra khỏi Controller và class truy cập dữ liệu, ví dụ như service layer, business layer or repository layer.

![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/loosely-coupled-refactor.png)

Hình 4, Tái cấu trúc theo hướng thiết kế lỏng lẻo

Có nhiều cách để phá vỡ sự phụ thuộc giữa Controller và class DBcontext, nhưng cách hay làm nhất là bạn sẽ tạo mới một Interface, truyền nó vào cho Controller, và sử dụng một thư viện Dependency Injection nào đó (VD Autofact...) của Dotnet để khởi tạo biến Context từ interface và controller sẽ nhận được biến đó. Làm như vậy thì chúng ta có thể tạo động được tham số đầu vào cho class Controller theo cách lập trình hướng đối tượng, và giờ thì dễ dàng thay đổi tham số đầu vào mà ta mong muốn.

> Cách làm này trong lập trình hướng đối tượng là viết theo kiểu Design Pattern, và mẫu code ở đây là code theo kiểu repository pattern và dependencies injection.

Trong bài viết này, chúng ta sẽ tạo ra một interface `IArticlesRepository` đơn giản mà Controller của chúng ta cần được truyền vào. Định nghĩa như sau:

```
public interface IArticlesRepository
{
    Task<List<Article>> GetAll();
    Task<Article> GetOne(int id);
    void Add(Article article);
    void Remove(Article article);
    Task SaveChanges();
}
```

Để sử dụng được interface này chúng ta cần tạo một Class kế thừa nó, bên trong class có viết rõ các hàm đã được đặt tên sẵn ở interface (tức là implement interface này). Tạo một class ArticlesRepository như sau, class ArticlesRepository  sẽ phụ thuộc vào một biến ApplicationDbContext cố định:

```

public class ArticlesRepository : IArticlesRepository
{
    private readonly ApplicationDbContext _context;
 
    public ArticlesRepository(ApplicationDbContext context)
    {
        _context = context;
    }
 
    public Task<List<Article>> GetAll() =>
        _context.Article.Include(a => a.Author).ToListAsync();
 
    public Task<Article> GetOne(int id) =>
            _context.Article.Include(a => a.Author)
.SingleOrDefaultAsync(m => m.ArticleId == id);
 
    public void Add(Article article) =>
        _context.Article.Add(article);
 
    public void Remove(Article article) => 
        _context.Article.Remove(article);        
 
    public Task SaveChanges() => 
        _context.SaveChangesAsync();
}
```

Bây giờ chúng ta có thể sửa đổi Controller để nó được truyền Interface IArticlesRepository vào. Nếu đến thời điểm này mà bạn vấp ở đâu đó và không hình dung ra code, bạn hãy[ xem lại code trên github hoàn chỉnh ở đây.](https://github.com/DaniJG/BlogPlayground)

```
private readonly IArticlesRepository _articlesRepository;
private readonly UserManager<ApplicationUser> _userManager;
 
public ArticlesController(IArticlesRepository articlesRepository, UserManager<ApplicationUser> userManager)
{
    _articlesRepository = articlesRepository;
    _userManager = userManager;
}
 
public async Task<IActionResult> Index()
{
    return View(await _articlesRepository.GetAll());
}
 
// Other simpler methods omitted here!
 
public async Task<IActionResult> Create([Bind("Title, Abstract,Contents")] Article article)
{
    if (ModelState.IsValid)
    {
        article.AuthorId = _requestUserProvider.GetUserId();
        article.CreatedDate = DateTime.Now;
        _articlesRepository.Add(article);
        await _articlesRepository.SaveChanges();
        return RedirectToAction("Index");
    }
    return View(article);
}
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var article = await _articlesRepository.GetOne(id);
    _articlesRepository.Remove(article);
    await _articlesRepository.SaveChanges();
    return RedirectToAction("Index");
}
```


Đừng quên đăng ký interface trên vào Startup của project và sử dụng DI để trỏ IArticlesRepository đến ArticlesRepository. Nếu không, ứng dụng sẽ không chạy được và test tích hợp của bạn sẽ không chạy được! Viết đoạn này trong Startup.cs như sau:

```
// Add repos as scoped dependency so they are shared per request.
services.AddScoped<IArticlesRepository, ArticlesRepository>();
```

Chúng ta đã gần hoàn tất!

Controller vẫn được kết hợp chặt chẽ với class `UserManager` được sử dụng để lấy id của người dùng hiện tại, nó được dùng để lưu vào trường AuthorId khi tạo một bài viết mới. Chúng ta làm theo cách tiếp cận tương tự và tạo ra một interface mới:


```
public class RequestUserProvider: IRequestUserProvider
{
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
 
    public RequestUserProvider(IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager)
    {
        _contextAccessor = contextAccessor;
        _userManager = userManager;
    }
 
    public string GetUserId()
    {
        return _userManager.GetUserId(_contextAccessor.HttpContext.User);
    }
}
```


Việc cập nhật code trong Controller để sử dụng interface mới này sẽ không có gì khó khăn, bạn hãy vào xem code trong [GitHub](https://github.com/DaniJG/BlogPlayground) nhé.

# Bài test đầu tiên, giả lập đầu vào (mocking) bằng Dependency Injection

Cuối cùng, chúng ta đã sẵn sàng để bắt đầu viết các bài test vì `ArticlesController` giờ chỉ phụ thuộc vào hai interface mà chúng ta có thể dễ dàng khởi tạo và truyền vào bằng Dependency Injection.



Hãy quay mở class `ArticlesControllerTest` và cập nhật code để bắt đầu viết test, chúng ta cần khởi tạo một đối tượng Controller mới, với các đầu vào đã được tạo bằng giả lập (mock). Chúng ta sẽ sử dụng thư viện `Moq` để tạo và thiết lập các mocks như sau:

```
public class ArticlesControllerTest
{
    private Mock<IArticlesRepository> articlesRepoMock;  //Đây là biến sẽ giả lập đầu vào 1 danh sách bài viết cho Blog
    private Mock<IRequestUserProvider> requestUserProviderMock;
    private ArticlesController controller;
 
    public ArticlesControllerTest()
    {
        articlesRepoMock = new Mock<IArticlesRepository>();
        requestUserProviderMock = new Mock<IRequestUserProvider>();
        controller = new ArticlesController(articlesRepoMock.Object, requestUserProviderMock.Object);
    }
 
    [Fact]
    public void IndexTest_ReturnsViewWithArticlesList()
    {
 
    }
}
```

Thiết lập này rất quan trọng, vì nó đảm bảo mỗi bài test riêng lẻ sẽ được khởi tạo Controller mới với giá trị Mock mới (Tức là DB mới, User mới). Nó cũng sẽ giúp đảm bảo code test của chúng ta luôn sạch sẽ và có thể bảo trì, vì toàn bộ các hàm test không cần viết lại nếu đầu vào thay đổi mà chỉ cần sửa ở hàm chung, hàm khởi tạo `ArticlesControllerTest` mà thôi.

Viết Unit Test tốt là một nghệ thuật. Nếu bạn cần xem qua một số hướng dẫn cơ bản, tôi khuyên bạn nên đọc cuốn sách `The Art of Unit Testing` của Roy Osherove, nhưng nếu bạn không thích đọc sách thì hãy lên mạng tìm hiểu thêm về cách code Unit Test cơ bản nhé!

Bây giờ chúng ta hãy viết bài test đầu tiên, xác minh rằng hàm Index() sẽ hiển thị Views chuẩn trong View chứa model có List các bài viết được đăng lên Blog. Hãy xem qua hàm ActionResult ở Controller mà chúng ta đang cần test:

```
// GET: Articles
public async Task<IActionResult> Index()
{
    return View(await _articlesRepository.GetAll());
}
```

Rồi, hãy viết test cho hàm này. Bài test tôi viết dưới đây sẽ sử dụng theo mẫu **arrange/act/assert** để kiểm tra đầu ra của hàm có đếm đúng số lượng cần tính toán hay không:

```
[Fact]
public async Task IndexTest_ReturnsViewWithArticlesList()
{
    // Arrange (Arrange nghĩa là đầu vào. Giả sử truyền vào 2 bài viết cho Blog)
    var mockArticlesList = new List<Article>
    {
        new Article { Title = "mock article 1" },
        new Article { Title = "mock article 2" }
    };
    ArticlesRepoMock    Sử dụng biến Mock đã tạo sẵn ở hàm khởi tạo test, và đưa `mockArticlesList` vào
        .Setup(repo => repo.GetAll())
        .Returns(Task.FromResult(mockArticlesList));      
 
    // Act   (Bắt đầu thực thi gọi hàm Index trong controller hiện tại.
    var result = await controller.Index();
 
    // Assert (Kiểm tra tính toán kết quả trả về)
    var viewResult = Assert.IsType<ViewResult>(result);
    var model = Assert.IsAssignableFrom<IEnumerable<Article>>(viewResult.ViewData.Model);
    Assert.Equal(2, model.Count());  //Đếm cái viewResult.ViewData.Model chứa trong Views của Action trả về xem có đúng 2 bản ghi hay không.
}
```

Tôi hy vọng bạn thấy nó dễ làm theo, nhưng về cơ bản chúng ta thiết lập hành vi của mô hình IArticlesRepository để nó trả về một danh sách các bài viết được xác định trước. Sau đó chúng ta gọi phương thức Index của controller và xác minh rằng kết quả của nó là một ViewResult chứa một model là một List<Article> có thể đếm được với hai phần tử.

Bây giờ chạy các test, bằng cách gõ Ctrl + R, A trong Visual Studio hoặc gõ `dotnet test` từ dòng lệnh command line.

Xin chúc mừng, bạn đã viết và test bài test đầu tiên!

![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/running-first-unit-test.png)

Hình 5, chạy Unit Test đầu tiên từ studio

Nếu bạn gõ bằng dòng lệnh thì kết quả chạy test sẽ như hình dưới đây

![](http://www.dotnetcurry.com/images/aspnet-core/unit-testing/running-first-unit-test-command-line.png)

Hình 6, chạy Unit Test từ dòng lệnh bằng cách sử dụng `dotnet test`

# Viết các bài test tiếp theo
Bây giờ chúng ta quan tâm đến `DetailsController`. Controller này thú vị hơn một chút vì có một số logic liên quan đến việc tìm một bài viết theo id đã cho. Hãy xem qua đoạn code cần test:

```
// GET: Articles/Details/5
public async Task<IActionResult> Details(int? id)
{
    if (id == null)
    {
        return NotFound();
    }
 
    var article = await _articlesRepository.GetOne(id.Value);
    if (article == null)
    {
        return NotFound();
    }
 
    return View(article);
}
```

Chúng ta có thể dễ dàng thêm một bài test cho đầu vào id là null và kiểm tra đầu ra nhận được kết quả trả về là NotFoundResult:

```
[Fact]
public async Task DetailsTest_ReturnsNotFound_WhenNoIdProvided()
{
    // Act
    var result = await controller.Details(null);
 
    // Assert
    var viewResult = Assert.IsType<NotFoundResult>(result);
}
```

Như như vậy chúng ta mới chỉ test được một trường hợp. Thế còn trường hợp tìm đúng được id thì sao? Vì chúng ta đã có một cái repository mock (cài đặt sẵn cơ sở dữ liệu tạm trong bộ nhớ ở hàm khởi tạo mọi bài test), chúng ta sẽ dễ dàng đưa cái id đó vào controller này để test và xem nó trả về kết quả có đúng object bài viết tương ứng ID hay không. Thao tác lấy data lúc này là chọc vào đối tượng Mock nằm trong RAM chứ k hề đụng vào DB thực.

Bài test thứ nhất ở đây sẽ kiểm tra là truyền vào một ID, và không tìm thấy nó trong db thì phải báo lỗi NotFoundResult.

```
[Fact]
public async Task DetailsTest_ReturnsNotFound_WhenArticleDoesNotExist()
{
    // Arrange
    var mockId = 42;  //Giả lập một id bất kỳ
    articlesRepoMock.Setup(repo => repo.GetOne(mockId)).Returns(Task.FromResult<Article>(null));  //Cài đặt làm sao để đối tượng articlesRepoMock sẽ chứa một object mà id=42 và khi chạy hàm GetOne() thì nó trả về null
 
    // Act
    var result = await controller.Details(mockId);
 
    // Assert
    var viewResult = Assert.IsType<NotFoundResult>(result);
}
```

Bài test thứ hai sẽ truyền vào một Id và Id đó tìm thấy trong DB thì kết quả trả về phải đúng là cái object tương ứng với Id đã cho.


```
[Fact]
public async Task DetailsTest_ReturnsDetailsView_WhenArticleExists()
{
    // Arrange
    var mockId = 42;  //Giả lập một id bất kỳ
    var mockArticle = new Article { Title = "mock article" }; //Giả lập một Bài viết trong DB ảo trong RAM
    articlesRepoMock.Setup(repo => repo.GetOne(mockId)).Returns(Task.FromResult(mockArticle)); //Cài đặt làm sao để đối tượng articlesRepoMock sẽ chứa một object mà id=42 và khi chạy hàm GetOne() thì nó trả về mockArticle trong RAM đã tạo
 
    // Act
    var result = await controller.Details(mockId);
 
    // Assert
    var viewResult = Assert.IsType<ViewResult>(result);
    Assert.Equal(mockArticle, viewResult.ViewData.Model);  
}
```



Như bạn có thể thấy, chúng ta phải viết khá nhiều bài test (còn gọi là case test, trường hợp test). Nhưng một khi bạn đã ngồi nghĩ và viết ra hết các case test thì bạn hầu như yên tâm là các trường hợp lỗi, trường hợp đúng đều đã được cover (được kiếm tra) toàn diện đảm bảo bug không có đường thoát.

Trước khi chúng ta tiếp tục, chúng ta sẽ viết bài test cho phương thức Create POST (bài test cho phương thức GET thì không cần thiết lắm). code cần test như sau:

```
// POST: Articles/Create
[HttpPost]
[ValidateAntiForgeryToken]
[Authorize]
public async Task<IActionResult> Create([Bind("Title, Abstract,Contents")] Article article)
{
    if (ModelState.IsValid)
    {
        article.AuthorId = _requestUserProvider.GetUserId();
        article.CreatedDate = DateTime.Now;
        _articlesRepository.Add(article);
        await _articlesRepository.SaveChanges();
        return RedirectToAction("Index");
    }
    return View(article);
}
```

Case đầu tiên cần test đó là cần xác minh nếu trạng thái model không hợp lệ. Nghĩa là đầu vào ở form đã bị nhập sai định dạng, ví dụ nhập sai email, sai kiểu số điện thoại... Chúng ta cần thiết lập mock một cái controller.ModelState để nó bị báo lỗi từ trước, rồi sau đó truyền vào cho controller một bài viết bất kỳ. Khi kiểm tra chúng ta cần kiểm tra rằng View có nhận được đúng model không.

```
[Fact]
public async Task CreateTest_Post_ReturnsCreateView_WhenModelStateIsInvalid()
{
    // Arrange
    var articlesRepoMock = new Article { Title = "mock article" };  //Thêm một bài viết giả lập
    controller.ModelState.AddModelError("Description", "This field is required");
 
    // Act
    var result = await controller.Create(mockArticle);
 
    // Assert
    var viewResult = Assert.IsType<ViewResult>(result);  //Trước tiên kiểm tra xem View giả về có đúng k
    Assert.Equal(mockArticle, viewResult.ViewData.Model);  //View giả về có chưa cái model đã tạo hay không
    articlesRepoMock.Verify(repo => repo.Add(mockArticle), Times.Never()); //kiểm tra articlesRepoMock (tức là DB tạm trong RAM) chắc chắn là không được phép thêm bản ghi articlesRepoMock đang bị lỗi vào DB.
}
```

Bạn sẽ thấy code của bài test vừa rồi thiếu một case, đó là đoạn này có vẻ thừa `controller.ModelState.AddModelError("Description", "This field is required");` vì tôi không hề kiểm tra xem lỗi báo nhập sai là lỗi gì.

Nhưng tôi cố tình viết như vậy đấy. Vì trường hợp báo lỗi nhập sai đầu vào là nhiều vô kể, nếu các bạn kiểm tra bắt lỗi hết thì sẽ thành quá nhiều case cho một bài test. Ở đây chúng ta chỉ cần đơn giản là kiểm tra xác minh nếu đầu vào đang lỗi thì đừng bao giờ lưu gì vào DB là đúng và đủ.

Tiếp theo, hãy kiểm tra để biết chắc chắn là bài viết không có lỗi, thì sẽ được create vào DB và trang web sẽ điều hướng sang trang List sau khi nhập xong.

```
[Fact]
public async Task CreateTest_Post_AddsArticleToRepository_AndRedirectsToIndex()
{
    // Arrange
    var mockArticle = new Article { Title = "mock article" };
    articlesRepoMock.Setup(repo => repo.SaveChanges()).Returns(Task.CompletedTask);
 
    // Act
    var result = await controller.Create(mockArticle);
 
    // Assert
    articlesRepoMock.Verify(repo => repo.Add(mockArticle));
    var viewResult = Assert.IsType<RedirectToActionResult>(result);
    Assert.Equal("Index", viewResult.ActionName);
}
```

Logic cuối cùng cần được kiểm thử đó là phải đảm bảo cả **AuthorId** và **CreatedDate** của bài viết được lưu vào cơ sở dữ liệu. Cả hai tham số này khá là khoai và thú vị vì thông tin tác giả được lấy từ một mock khác và ngày tạo phụ thuộc vào thời gian hiện tại:


```
[Fact]
public async Task CreateTest_Post_SetsAuthorId_BeforeAddingArticleToRepository()
{
    // Arrange
    var mockArticle = new Article { Title = "mock article" };
    var mockAuthorId = "mockAuthorId";
    articlesRepoMock.Setup(repo => repo.SaveChanges()).Returns(Task.CompletedTask);  //Sử dụng đến biến mock Article giả lập bài viết trogn RAM.
    requestUserProviderMock.Setup(provider => provider.GetUserId()).Returns(mockAuthorId);  //Sử dụng đến cái biến giả lập mock User trong RAM
 
    // Act
    var result = await controller.Create(mockArticle);
 
    // Assert
    articlesRepoMock.Verify(repo => 
        repo.Add(It.Is<Article>(article => 
            article == mockArticle 
            && article.AuthorId == mockAuthorId)));
}
 
[Fact]
public async Task CreateTest_Post_SetsCreatedDate_BeforeAddingArticleToRepository()
{
    // Arrange
    var mockArticle = new Article { Title = "mock article" };
    var startTime = DateTime.Now;
    articlesRepoMock.Setup(repo => repo.SaveChanges()).Returns(Task.CompletedTask);
 
    // Act
    var result = await controller.Create(mockArticle);
    var endTime = DateTime.Now;
 
    // Assert
    articlesRepoMock.Verify(repo =>
        repo.Add(It.Is<Article>(article =>
            article == mockArticle
            && article.CreatedDate >= startTime
            && article.CreatedDate <= endTime)));
}
```


Bạn sẽ có thể làm theo các bước tương tự để test các hàm còn lại, và bạn có thể tham khảo [code GitHub ở đây](https://github.com/DaniJG/BlogPlayground) nếu code test không hoạt động đúng.

# Test các API Controller 
Controller mà chúng ta test nãy giờ là các MVC Controller  trả về các Views và đầu vào là các form. Giờ hãy xem ví dụ về cách test Controller API. Vì dự án chưa có API Controller nào để test, ta sẽ đi tạo một api như sau:


```
[Produces("application/json")]
[Route("api/articles")]
public class ArticlesApiController : Controller
{
    private readonly IArticlesRepository _articlesRepository;
    private readonly IRequestUserProvider _requestUserProvider;
 
    public ArticlesApiController(IArticlesRepository articlesRepository, IRequestUserProvider requestUserProvider)
    {
        _articlesRepository = articlesRepository;
        _requestUserProvider = requestUserProvider;
    }
 
    [HttpGet()]
    public async Task<IEnumerable<Article>> GetArticles()
    {
        return await _articlesRepository.GetAll();
    }
 
    [HttpGet("{id}")]
    public async Task<ActionResult> GetArticle(int id)
    {
        var article = await _articlesRepository.GetOne(id);
        if (article == null) return NotFound();
 
        return Ok(article);
    }
 
    [HttpPost()]
    [ValidateAntiForgeryToken]
    [Authorize]
    public async Task<ActionResult> AddArticle([FromBody]Article article)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
             
        article.AuthorId = _requestUserProvider.GetUserId();
        article.CreatedDate = DateTime.Now;
        _articlesRepository.Add(article);
        await _articlesRepository.SaveChanges();
        return Ok(article);
    }
 
    [HttpDelete("{id}")]
    [ValidateAntiForgeryToken]
    [Authorize]
    public async Task<ActionResult> DeleteArticle(int id)
    {
        var article = await _articlesRepository.GetOne(id);
        if (article == null) return NotFound();
 
        _articlesRepository.Remove(article);
        await _articlesRepository.SaveChanges();
 
        return NoContent();
    }        
}
```

Đây là một **Controller API** khá chuẩn. Nó có chức năng tương tự như Controller vừa test (thêm sửa xóa get) nhưng mà giờ đây chúng ta sẽ thao tác với controller này thông qua giao thức **API REST**, gửi và nhận dữ liệu dạng **JSON**, chứ không còn là **Html Views** và **Model** nữa.

Nếu bạn đọc qua code, bạn sẽ thấy chúng ta lại sử dụng lại một lần nữa việc sử dụng **Dependency Injection** và **IArticlesRepository** và **IRequestUserProvider** abstractions để chúng ta có thể test nó.

Điều đó có nghĩa là chúng ta có thể viết các bài test giống như cách đã viết trước đây. Ví dụ, đây là cách viết bài test đơn giản đầu tiên xác minh phương thức `GetArticles` hoạt động như mong đợi:

```
private Mock<IArticlesRepository> articlesRepoMock;
private Mock<IRequestUserProvider> requestUserProviderMock;
private ArticlesApiController controller;
 
public ArticlesApiControllerTest()
{
    articlesRepoMock = new Mock<IArticlesRepository>();
    requestUserProviderMock = new Mock<IRequestUserProvider>();
    controller = new ArticlesApiController(articlesRepoMock.Object, requestUserProviderMock.Object);
}
[Fact]
public async Task GetArticlesTest_RetursArticlesList()
{
    // Arrange
    var mockArticlesList = new List<Article>
    {
        new Article { Title = "mock article 1" },
        new Article { Title = "mock article 2" }
    };
    articlesRepoMock.Setup(repo => repo.GetAll()).Returns(Task.FromResult(mockArticlesList));            
 
    // Act
    var result = await controller.GetArticles();
 
    // Assert
    Assert.Equal(mockArticlesList, result);
}
```

Tôi hy vọng bạn đọc đoạn code test vừa rồi đã dễ dàng hơn trước, vì tôi vẫn sử dụng 3 bước cài đặt và gán rồi kiểm tra (arrange/act/assert) trong bài test như bên trên.

Giờ hãy xem cái gì đó thú vị hơn một chút, ví dụ bài test cho phương thức `AddArticle` trả về một `ActionResult`:

```
[Fact]
public async Task AddArticleTest_ReturnsBadRequest_WhenModelStateIsInvalid()
{
    // Arrange
    var mockArticle = new Article { Title = "mock article" };
    controller.ModelState.AddModelError("Description", "This field is required");
 
    // Act
    var result = await controller.AddArticle(mockArticle);
 
    // Assert
    var actionResult = Assert.IsType<BadRequestObjectResult>(result);
    Assert.Equal(new SerializableError(controller.ModelState), actionResult.Value);
}
 
[Fact]
public async Task AddArticleTest_ReturnsArticleSuccessfullyAdded()
{
    // Arrange
    var mockArticle = new Article { Title = "mock article" };
    articlesRepoMock.Setup(repo => repo.SaveChanges()).Returns(Task.CompletedTask);
 
    // Act
    var result = await controller.AddArticle(mockArticle);
 
    // Assert
    articlesRepoMock.Verify(repo => repo.Add(mockArticle));
    var actionResult = Assert.IsType<OkObjectResult>(result);
    Assert.Equal(mockArticle, actionResult.Value);
}
```

Code test này cũng không có gì mới, chỉ là chỉnh các test để kiểm tra các kiểu trả về ActionResult khác nhau. Có thể là một bài tập, bạn hãy tự viết toàn bộ các case test cho toàn bộ các Controller trong project giúp tôi được không?

Nếu bạn quá lười?! Không sao, có thể vào xem code trong [GitHub](https://github.com/DaniJG/BlogPlayground) luôn cho nhanh.


# Kết luận
Như các bạn có thể thấy, sau khi viết code xong và viết test cho code đó, bạn sẽ dễ dàng nhìn thấy kết quả trả về của hàm mà không cần bật chương trình lên, không cần chờ đợi debug từng bước đề bò được đến đúng dòng code bạn đang cần test. Có thể nói thời gian lọ mọ ngồi debug sẽ giảm gấp 10 20 lần.

Một khi bạn đã quen với việc viết code xong rồi viết test code, bạn sẽ cảm thấy như thành công một bước tiến lớn!

Nhưng đừng quá tự phụ nhé! Viết Unit Test tốt là cả một nghệ thuật và tôi mới chỉ cho bạn có vài chiêu thôi đấy.

Để thành thục thành thạo Unit Test và Automation test còn cả một con đường dài phía trước để học hỏi. Nếu bạn tự phụ và nghĩ là mình đã siêu đẳng, bạn dễ dàng tạo ra một đoạn test code tồi và thậm chí có bạn còn bỏ quá nhiều thời gian để viết testcode cho đẹp thay vì viết code logic cho chuẩn. Như vậy là lại làm giảm giá trị của việc test.

Trong bài viết này, chúng ta đã thêm các Unit Test vào một dự án ví dụ đơn giản ASP.NET Core cung cấp một API rất đơn giản để quản lý các bài đăng trên blog. Mặc dù Unit Test khá là hữu ích, tuy nhiên tôi phải chỉ ra một số nhược điểm của nó như sau:

* Làm thế nào bạn có thể đảm bảo rằng class repository mà bạn thêm vào khi tách code hoạt động đúng?
* Giả sử bạn cần test chuyên sâu hơn ví dụ test về routing (url gọi sai gọi đúng thì báo lỗi gì), bind dữ liệu hoặc bảo mật?
* Làm thế nào các test này có thể bắt được các lỗi đơn giản, giống như cách bạn quên đăng ký các interface trong phương thức ConfigureServices của class startup của bạn?
* Mỗi một class cần tới rất nhiều code Unit Test cho các case test, vậy dự án mà Logic thay đổi xoành xạch thì có nên mạo hiểm bỏ nhiều thời gian công sức ra viết test code hay không?

Chính vì các nhược điểm trên, bạn muốn kiểm thử toàn diện hệ thống hơn nữa, thì bạn phải nhờ đến 2 anh lớn là **integration** và **end-to-end tests** nữa để đạt được kết quả loại bỏ bug tốt hơn nữa.

Bài viết thứ 2 chúng ta sẽ đi viết tiếp các case test cho việc test Tích hợp, mời các bạn đón đọc.