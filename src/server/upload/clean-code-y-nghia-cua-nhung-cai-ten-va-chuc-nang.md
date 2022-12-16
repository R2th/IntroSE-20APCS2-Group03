### I. Mở đầu
- Nếu không tính 4 năm đại học, thì hiện tại mình đã code được gần 2 năm. Trong 2 năm có thể nói mình đã học nhiều ngôn ngữ (ruby, php, nodejs, reactjs, ...)
- Tại một số thời điểm mình cảm thấy mình chỉ chuyển từ ngôn ngữ này sang ngôn ngữ khác nhưng việc cải thiện kĩ năng như một lập trình viên thì lại không có
- Lúc đấy mình muốn trở thành một lập trình viên giỏi hơn, không còn tư duy như một sinh viên đại học. Vì vậy mình đi tìm tại liệu để đọc, mà cũng cmn thần kỳ, mới vắt trán suy nghĩ hôm trước, hôm sau công ty có dạy một khóa về "Clean Code: A Handbook of Agile Software Craftsmanship". Thế là vát mông đi đăng ký học =))
- Những gì mình chia sẽ ở đây là chỉ là những gì mình nhớ và tham khảo nên bạn muốn đào sau nữa thì nãy nên đọc cuốn sách này
- À và những điều này không có nghĩa nó sẽ đúng hoàn toàn, bạn không nên rập khuôn áp dụng mọi lúc, hãy linh động vì tùy theo ngữ cảnh khác nhau, bạn sẽ áp dụng những cách riêng biệt để tạo ra giá trị tốt nhất
- "Không có đúng sai, chỉ là đã hợp lý hay chưa hợp lý". Đây là câu nói mình đúc kết từ khi có ý thức và tâm đắc nhất =)).
### II. Meaningful names
1. Đầu tiên meaningful là gì?
    - Không biết các bạn thế nào nhưng khi còn là sinh viên mình có 1 kiểu viết rất là đặc trưng, bạ đâu comment đó =)), kiểu nó thế này:
        ```
        // lập 10 lần i
        // i là vị trí
        for (const i = 0, i < 10, i++) {
            // bắn i ra
            console.log(i);
        }
        ```
    - À mà có khi không có comment luôn ấy chứ :v, thành ra là khi đọc lại code mình chẳng hiểu mình đang viết cái gì hết cả
    - Vậy thì meaningful được định nghĩa là sẽ giúp cho những variable, function hoặc class trở lên có nghĩa mà không nhất thiết phải comment
    - Ví dụ:
        ```
            // Không meaningful
            const d; // elapsed time in days
        ```
        vs
        ```
            // meaningful
            const elapsedTimeInDays;
        ```
2. Tất nhiên đã sử dụng thì phải hợp lý
    - Mất bao lâu để bạn phân biệt được 2 biến này?
        ```
        XYZControllerForEfficientHandlingOfStrings 
        ```
        vs
        ```
        XYZControllerForEfficientStorageOfStrings
        ```
    - Vậy lên hãy để sự khác biệt lên đầu hoặc cuối để dễ phân biệt 
        ```
        HandleXYZControllerForEfficientOfStrings 
        ```
        vs
        ```
        StorageXYZControllerForEfficientOfStrings
        ```
3. Class names
    - Tên của class nên là danh từ hoặc cụm danh từ như: Customer, WikiPage, Account, ...
    - Một tên class không nên chứa động từ bên trong
4. Method names
    - Các method nên có tên động từ hoặc cụm động từ như postPayment, deletePage hoặc save.
    - Khi các hàm tạo bị overloaded, hãy sử dụng các hàm tĩnh tự tạo và mô tả các đối số sẽ truyền vào
        ```
        Complex fulcrumPoint = new Complex(23.0)
        ```
        vs
        ```
        Complex fulcrumPoint = Complex.FromRealNumber(23.0);
        ```
5. Chọn 1 từ cho mỗi concept
    - Điều này khá quan trọng. Khi bạn bắt đầu có một mã thực sự lớn, bạn và team không nhất quán về concept.
    - Kết thúc thì việc sẽ thừa code trong mỗi class khác nhau
    - Hãy thử nghĩ, khi bạn đang gọi một api có object của bạn nhưng bạn lại nhận được là chỉ có vài property. Và vì vậy bạn phải tìm xem nó vì sao lại như thế nếu bạn không gắn bó với concept này
    - Vì vậy chỉ bên chọn 1 từ cho mỗi concept
### III. Functions
- Câu cửa miệng: “The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that”
- Function dưới có thực sự ngắn
    ```
    public static String renderPageWithSetupAndTeardowns(
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
- Áp dụng câu cửa miệng trên
    ```
    public static String renderPageWithSetupAndTeardowns(
        PageData pageData, boolean isSuite
    ) throws Exception {
        boolean isTestPage = pageData.hasAttribute("Test");
        if (isTestPage(pageData)) {
            includeSetupAndTeardownPages(pageData, isSuite);
        }

        return pageData.getHtml();
    }
    ```
1. Làm từng việc (do one thing)
    - Ngụ ý rằng với mỗi if, else thì nên dùng những block
    -  Tức là các câu lệnh nên gộp lại thành một hàm rồi gọi trong if, như vậy có thể mô tả hàm làm gì mà còn dễ nhìn trong if, else
    -  Chức năng không nên quá lớn để giữ các cấu trúc lồng nhau
2. Làm từ trên xuống dưới (The stepdown rule)
    - Là từ những thằng nhỏ đến thằng lớn, theo level tăng dần
    - To include the setups and teardowns, we include setups, then we include the test page content, and then we include the teardowns.
    - To include the setups, we include the suite setup if this is a suite, then we include the regular setup.
    - To include the suite setup, we search the parent hierarchy for the “SuiteSetUp” page and add an include statement with the path of that page.
    - To search the parent. . .
    - Đoạn trên mình dịch thì mất hay nên thôi để nguyên =))
        ```
        includeSetupAndTeardownPages();
        includeSetup();
        includeSuiteSetup()
        searchParent();
        ...
        includeRegularSetup();
        ```
3. Sử dụng switch thay cho if else trong một số trường hợp
    - Ví dụ ta có bài toán: Có 2 thằng nhóc đang chơi oẳn tù xì, thằng A muốn là phân tích khi thằng B ra gì thì A nên ra cái gì
    - Nếu dùng if else ta sẽ có một đoạn lệnh như sau
        ```
        if (A.hand === 'hammer') { B.hand = 'bag' }
        if (A.hand === 'bag') { B.hand = 'drag' }
        if (A.hand === 'drag') { B.hand = 'hammer' }
        ```
    - Nhìn thì nó cũng đẹp đấy chứ :v nhưng không nó đang lặp code rất nhiều, thế này thì được gọi là phí tài nguyên
    - Vì vậy đổi sang dùng switch
        ```
        function handlingB {
            switch(A.hand) {
                case 'hammer':
                    return 'bag';
                case 'bag':
                    return 'drag';
                case 'drag':
                    return 'hammer';
            }
        }
        ```
 ### IV. Kết
 - Đây chỉ là một trong số những ví dụ cực hay trong cuốn sách, mình nghĩ bạn nên tìm và đọc cuốn này để có thể cải thiện tốt khả năng viết code của mình
 - Có thể nhiều người sẽ nghĩ: "Xì, cái này có gì mà viết post, những điều cơ bản này không cần đọc cũng biết"
 - Vâng có lẽ đúng như vậy, nhưng mình viết bài post này không chỉ là muốn share cho mọi người mà còn là để nhắc lại bản thân mình, khi mình đã làm quen một việc quá lâu, bạn sẽ thường quên đi những gì đã từng làm ban đầu
     - Khi gặp 1 vấn đề khó, mình bỏ qua những vấn đề nhỏ nhặt trên
     - Khi gặp 1 function lớn, mình bỏ qua
     - Khi lặp lại những chức năng có cấu trúc giống nhau, vấn đề trên lại bị bỏ qua
 - Khi bạn có quá nhiều kiến thức mới, bạn thường bỏ qua những kiến thức cũ, bộ não con người không như máy tính, nó không thể tới case này thì lại chạy logic bên trong, đôi lúc mình sẽ quên, nhưng nếu có 1 thứ gì đó để giúp ta nhớ lại, đoạn code của mọi người sẽ nhìn viên mãn hơn :v