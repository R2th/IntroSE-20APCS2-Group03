Các kỹ sư đảm bảo chất lượng là rất quan trọng đối với mỗi phát hành sản phẩm công nghệ. Tùy thuộc vào quy mô và cấu trúc team, QA được xem xét và thực hiện những công việc khác nhau, nhưng phù hợp với nhu cầu cụ thể của tổ chức.
Thông thường, các chức danh cho công việc kiểm thử phần mềm được chỉ định là QA (Quality Assurance / Đảm bảo chất lượng) hoặc Tester. Cũng có thể bao gồm các thông số kỹ thuật sau:
* Technology (Công nghệ) : Selenium Tester
* Domain: Healthcare QA
* Expertise (Chuyên môn) : Senior QA Testing Specialist

Các biến thể khác của công việc liên quan đến QA là : QA analyst, QA engineer, Automation engineer, Test automation developer... Tuy nhiên,  các biến thể kiểm thử phần mềm này thì đúc kết vẫn có trách nhiệm và vai trò tương tự. Các tên gọi khác nhau có thể ứng dụng thực tế cho một nhóm quy mô lớn để chỉ ra kinh nghiệm hoặc chuyên môn sâu của mỗi cá nhân và đưa ra ý tưởng sơ bộ về năng lực của họ.
![](https://images.viblo.asia/0924f7d8-370e-4e7c-8d06-c7a369cca1e4.png)
*Các QA job title phổ viến nhất theo STATE OF TESTING REPORT 2018 bởi PractiTest*

Sự mơ hồ và phong phú của các QA job title có thể gây nhầm lẫn về cách chính xác vai trò phù hợp của người kiểm tra với bức tranh lớn hơn về phát triển phần mềm. Trong bài viết này, chúng tôi nhấn mạnh ba vai trò chính trong kiểm thử phần mềm và xây dựng các kỹ năng và trách nhiệm cụ thể cho mỗi vai trò:
* Manual QA Engineer
* Automation QA Engineer
* QA Lead

For the record, we previously published an article describing software developer roles in terms of their seniority.
Đối với mỗi vai trò, trước đây chúng tôi đã có một bài viết mô tả vai trò của nhà phát triển phần mềm về thâm niên của họ.

| Roles | Manual QA Engineer | Automation QA Engineer| QA Lead |
| -------- | -------- | -------- | -------- | -------- |
| **Core function**     |  Đánh giá một sản phẩm thủ công bằng sự quan sát cẩn thận | Thiết kế các thử nghiệm lặp lại tự động để hợp lý hóa quá trình thử nghiệm | Quản lý quy trình làm việc trong QA team 
| **Skills** |- Kiến thức cơ bản về kiểm thử phần mềm <hr>- Luôn có quan điểm hướng đến người dùng<hr>- Kỹ năng phân tích dữ liệu<hr>- Kỹ năng SQL| - Làm việc được trong môi trường Agile <hr>- Kỹ năng coding <hr>- Kỹ năng phân tích<hr> - Kỹ năng giải quyết vấn đề |- Có kiến thức rộng về các phương pháp thử nghiệm<hr>- Có cả kỹ năng manual và automated testing<hr>- Hiểu biết về lĩnh vực kinh doanh và yêu cầu của khách hàng<hr>-  Lập kế hoạch dự án, phối hợp nhiệm vụ và con người tốt|
| **Responsibilities** | - Phân tích yêu cầu<hr>- Test effort estimation<hr>- Daily status reports<hr>- Test cases documentation<hr>- Defect reports | - Thiết kế tài liệu cho các quy trình tự động<hr>- Viết, thực hiện và giám sát các bộ kiểm tra tự động<hr>- Lựa chọn công cụ mới| - Tuyển dụng và giám sát<hr>- Setting số liệu chất lượng<hr>- Lập kế hoạch và kiểm soát quá trình thử nghiệm<hr> - Tham gia vào các cuộc họp giữa các bộ phận |
| **Tools** | - Test management tools<hr>- Defect Tracking Tools<hr>- MS Excel<hr>- Management and tracking bugs/task tools (Jira/Redmine/Asana/Backlog/...)<hr>- SQL clients | - Automation tools<hr>- Automation frameworks<hr>-  IDEs<hr>- CI/CD tools | Management tools|

*Main QA Engineering roles: Core function ( Vai trò cốt lõi), Skills (kỹ năng), Responsibilities (trách nhiệm) và Tools (các công cụ) họ sử dụng*

## Manual Testing vs Automation Testing

Mặc dù có xu hướng ngày nay ưu chuộng hơn đối với thử nghiệm tự động hóa, một số test scenarios hiệu quả hơn về thời gian và chi phí thể hơn để chạy thủ công hoặc chúng không thể tự động hóa, ví dụ như tương tác người dùng thực. Bên cạnh đó, **manual testing** được sử dụng như một bước đầu tiên trong việc phát triển các kiểm tra tự động.

Khi chỉ có một thời gian ngắn, thì **manual testing** là một lựa chọn phù hợp vì nó ít về lập kế hoạch và nhiều hơn về thực hiện kiểm tra. Dựa vào các kỹ năng của con người là tốt hơn để kiểm tra khả năng sử dụng. Tính thân thiện với người dùng của ứng dụng chỉ có thể được đánh giá đúng bằng quan sát của con người - một bài kiểm tra thủ công giúp tìm ra các vấn đề về UI và khả năng sử dụng, mà các bài **automation tests**  không thể xác định được.

QA Engineers áp dụng **automated testing** để chạy thử nghiệm lặp lại và hồi quy sau khi thực hiện thay đổi code thường xuyên. Automation testing cũng được ưa thích để load test, giúp xác minh performance của hệ thống trong điều kiện load. Mặc dù chi phí ban đầu, tautomation testing nhanh hơn và ít bị lỗi hơn so với manual testing. Hơn nữa, automated tests có thể tái sử dụng và dễ dàng chạy trên các máy khác nhau.

Trong trường hợp bạn quan tâm đến phân tích chi tiết hơn về [manual testing so với automated testing](https://www.altexsoft.com/blog/engineering/striking-a-balance-between-manual-and-automated-testing-when-two-is-better-than-one/), chúng tôi sẽ có một bài viết tóm tắt các phương pháp này.

## Manual QA Engineer

Như đã đề cập trước đó, các chuyên gia manual QA tìm thấy các lỗi trong một hệ thống bằng cách dựa vào sự quan sát của con người. Họ cần đảm bảo rằng các yêu cầu kiểm tra phù hợp với mục tiêu kiểm tra. Sau khi QA Lead xây dựng kế hoạch kiểm tra với sự hiểu biết chi tiết về quy trình kiểm tra(testing workflow) (bao gồm chiến lược kiểm tra, yêu cầu môi trường, test schedule, các chức năng cần kiểm tra, resources và vai trò cũng như trách nhiệm, deliverables, exit criteria, tools, ... ), tester  test cases - các kịch bản mô tả input action vào và expected response.

Trong khi chạy thử nghiệm, QA engineers so sánh kết quả thực tế với kết quả được nêu trong test case, ghi lại lỗi nếu chúng không khớp. Các lỗi được tìm thấy được thông báo cho các bộ phận khác trong các test execution status report hoặc thông qua bất kỳ công cụ quản lý và theo dõi lỗi nào, ví dụ: Jira, Redmine , Backlog, Asana,...

![](https://images.viblo.asia/a03a9629-86f5-4eaf-8038-91c50a54857e.png)
*Vòng đời của quá trình manual testing. Image credit: [Abhishek Desai](https://www.esds.co.in/blog/manual-testing-process-lifecycle/#sthash.5C1niMWd.kVeTKljR.dpbs)*

Sau khi development team báo cáo rằng lỗi được giải quyết, một QA engineer phải xác minh xem lỗi đã được khắc phục chưa. Quy trình làm việc của QA engineer được quản lý trong các daily status report để theo dõi tiến trình của dự án và từng tester có liên quan. Các status report có các hình thức khác nhau:  email, document hoặc một cuộc họp trực tiếp. Bạn có thể đọc thêm về [các tạo phẩm tối ưu hóa quy trình kiểm thử phần mềm trong bài viết khác](https://www.altexsoft.com/blog/engineering/8-ways-to-improve-software-testing-through-planning-work-environment-automated-testing-and-reporting/). 

![](https://images.viblo.asia/80258dae-e971-4a89-91ce-fe302bf3a645.jpg)
QA Testing Status Report. Image source: [Software Testing Help](https://www.softwaretestinghelp.com/test-execution-report/)

Các tiêu đề phổ biến khác của Manual QA: manual tester, software test engineer, QA analyst.

Trong manual software testing, có ba cấp độ thâm niên: unior, middle, và senior QA engineers. Chúng tôi sẽ phân tích vai trò của các manual QA về skills trách nhiệm của họ và các công cụ khác nhau mà họ xử lý, xem xét cả các cấp độ thâm niên.

#### Manual QA engineer skills

Kiến thức cơ bản về kiểm thử phần mềm. Để tham gia vào lĩnh vực kiểm thử phần mềm, junior cần có sự hiểu biết đúng đắn về các khái niệm và quy trình chính: toàn bộ vòng đời lỗi; [sự khác nhau của các testing level , phương pháp và các phân loại](https://www.altexsoft.com/whitepapers/quality-assurance-quality-control-and-testing-the-basics-of-software-quality-management/); kiểm tra dự toán kỹ thuật.

![](https://images.viblo.asia/6ba1c338-5af8-43fe-b609-e09f3e5c084f.png)
Bug life cycle. Source: [ToolsQA](http://toolsqa.com/software-testing/defect-life-cycle/)

Tuy nhiên, để trở mid-level QA engineer, tester phải có kiến thức vững chắc về quy trình kiểm thử phần mềm, hiểu sâu về vòng đời phát triển và kinh nghiệm thực tế với các loại thử nghiệm khác nhau.

**Fast learning :** Vì các dự án thường phân bổ ít thời gian nhất để testing, các QA engineer cần học nhanh để có thể đơn giản hóa công việc và thực hiện công việc được giao đúng thời gian. Cần nhanh chóng hiểu các yêu cầu và mục đích của phần mềm, xem xét các nội dung vừa thay đổi.

**Ability to meet deadlines (Có khả năng đáp ứng deadline) :** Các QA engineer sẽ có thể lập kế hoạch hiệu quả cho công việc của họ theo cách cho phép họ đúng giờ với các task của họ.

**User-oriented perspective (Quan điểm hướng người dùng) :** Để thiết kế các kịch bản thời gian thực tế hơn, một QA engineer cần hiểu rõ người dùng cuối là ai, sản phẩm phục vụ mục đích gì và nó sẽ hữu ích như thế nào đối với khách hàng.

**Communication and collaboration skills (Kỹ năng giao tiếp và hợp tác) :** Có kỹ năng giao tiếp và làm việc nhóm tốt là điều cần thiết cho tester, vì họ liên tục tương tác với các thành viên trong nhóm dự án, khách hàng và các bên liên quan. Nắm vững giao tiếp point-to-point sẽ giúp QA engineer quyết định chính xác thông tin cần đưa vào daily status reports.

**Curiosity (Ham học hỏi, nghiên cứu /Tò mò) :** Trở thành QA engineer có nghĩa là liên tục đặt câu hỏi về chất lượng của sản phẩm. Thường làm việc với các yêu cầu không đầy đủ, họ cần đặt câu hỏi có ý nghĩa sẽ mang lại nhiều thông tin hơn và giúp thực hiện kiểm tra hiệu quả.

**Self-organized with no monitoring required / Autonomy (Tự tổ chức mà không cần giám sát) :** Trái ngược với một junior làm việc dưới sự giám sát liên tục, một senior biết cách ưu tiên và ước tính thực thi nhiệm vụ mà không cần bất kỳ sự trợ giúp nào. Senior cố gắng sửa đổi phong cách làm việc của họ để phù hợp với các quy trình.

**Communication tactics to work closely with a development team (Chiến thuật giao tiếp để làm việc chặt chẽ với một nhóm phát triển) :** Các Senior QA engineer thường phải cộng tác với các nhà developer: từ việc tái tạo vấn đề được báo cáo và nhấn mạnh cách khắc phục các lỗi nghiêm trọng đến hiểu cách sửa lỗi.

SQL skills can be of much use for certain projects. SQL experience is required to verify the test data, insert, update, and delete the test data values in the database. Therefore, as an advanced specialist, senior QA engineer should have the listed database and SQL knowledge:

Distinguish the database types
Connect to the database using SQL clients
Understand the relationship between database tables, keys, and indices
Write a simple SQL statement along with more complex join queries
Interpret more complex queries

**SQL skills** có thể được sử dụng nhiều cho các dự án nhất định. Cần có kinh nghiệm SQL để xác minh dữ liệu thử nghiệm, cinsert, update, và delete các giá trị dữ liệu thử nghiệm trong cơ sở dữ liệu. Do đó, là một chuyên gia nâng cao, senior QA engineer nên có kiến thức về cơ sở dữ liệu và SQL được liệt kê cơ bản như bên dưới:
* Phân biệt các loại cơ sở dữ liệu
* Kết nối với cơ sở dữ liệu bằng các SQL client
* Hiểu mối quan hệ giữa các database tables, keys, và indices
* Viết một câu lệnh SQL đơn giản cùng với các truy vấn nối phức tạp hơn
* Giải thích các truy vấn phức tạp hơn

#### Manual QA engineer responsibilities (Nhiệm vụ và trách nhiệm)

**Daily status reports :** QA engineer phải thông báo cho QA lead về các hoạt động kiểm tra được thực hiện thông qua các báo cáo trạng thái hàng ngày.

**Detailed defect reports :** Báo cáo lỗi chi tiết, đòi hỏi phải có kỹ năng về cách thức hoạt động của một AUT (ứng dụng đang thử nghiệm) cụ thể.

**Listing improvement areas :** Liệt kê các vùng cần cải tiến. Mặc dù có một cái nhìn mới về sản phẩm, junior QA dự kiến sẽ có ý tưởng về các cách để cải thiện khả năng sử dụng của sản phẩm.

**Test cases documentation :** middle QA có ngưỡng chuyên môn cho phép họ tự viết test cases. Bên cạnh đó, họ phải ghi lại test cases theo một định dạng cụ thể khác nhau tùy thuộc vào tổ chức.

**Requirement analysis (Phân tích yêu cầu) :** Hiểu các yêu cầu được cung cấp bởi khách hàng và lĩnh vực công việc có liên quan là cần thiết để chuẩn bị danh sách truy vấn cho QA lead.

**Test effort estimation :** Một QA engineer luôn đánh giá những effort cần thiết để hoàn thành nhiệm vụ một cách hiệu quả.

**Contributing to test planning, designing, and estimation (Góp phần lập kế hoạch kiểm tra, thiết kế và dự toán) :** Senior QA engineer có nhiều kinh nghiệm hơn, chịu trách nhiệm cung cấp đầu vào cho các high-level test scenario, các thách thức, rủi ro, resources,... , trong các cuộc họp lập kế hoạch kiểm tra. Họ cũng nên giúp đỡ trong việc thiết kế thử nghiệm và cấu trúc các high-level test scenario thành các medium-level test cases. Dựa trên kinh nghiệm đa dạng của họ, senior QA engineer có khả năng cung cấp các ước tính kiểm tra chính xác nhất.

#### Manual QA engineer tools

Ngoài việc sử dụng các hệ điều hành máy tính để bàn và thiết bị di động khác nhau, trình duyệt và proxy web để kiểm tra trình duyệt chéo, người kiểm tra thủ công sử dụng các công cụ sau.

**Test management tools (TMTs)** giúp tổ chức quá trình kiểm tra. Sử dụng TMT, manual tester có thể tạo và lưu trữ test reports, liên kết chúng với các yêu cầu release. Một số TMT là [Test Manager](https://docs.microsoft.com/en-us/azure/devops/organizations/billing/buy-access-tfs-test-hub?view=azure-devops-2019#buy-monthly-access-to-azure-test-plans), [TestLink](http://testlink.org/), [SpiraTest](https://www.inflectra.com/SpiraTest/), [TestRail](https://www.gurock.com/testrail?utm_source=adwords&utm_medium=cpc&utm_campaign=europe_en_brand&utm_content=testrail&gclid=Cj0KCQiArqPgBRCRARIsAPwlHoVDV1r659OS2SEVkQMiqnf5k1AOo9zNJV_LUyCF7Q_YTjJx2TrTJ3YaAt6VEALw_wcB), [HP-ALM (QC)](https://software.microfocus.com/en-us/products/quality-center-quality-management/overview).

**Defect tracking tools (DTTs)** Với sự trợ giúp của các DTT, các QA engineer theo dõi các lỗi được tìm thấy trong ứng dụng và tạo các bug report để truyền đạt chúng đến dev team. Ví dụ về các DTT là [BugZilla](https://www.bugzilla.org/), [Mantis](https://www.mantisbt.org/), [IBM Rational ClearQuest](https://www.ibm.com/us-en/marketplace/rational-clearquest).

**MS Excel** giúp viết các tập hợp lớn các test cases và sau đó nhập chúng vào TMTs. [Test Studio](https://www.telerik.com/download/teststudio) là một giải pháp thay thế cho Excel cung cấp trải nghiệm UI tốt hơn và khả năng sử dụng lại trường hợp thử nghiệm.

**Project management software** với các tính năng như theo dõi thời gian, wiki, danh sách task, biểu đồ Gantt, và nhiều thứ khác là phải có cho các dự án Agile. [Jira](https://www.atlassian.com/software/jira) là một lựa chọn quản lý sản phẩm phổ biến, cũng như [Redmine](https://www.redmine.org/), [YouTrack](https://www.jetbrains.com/youtrack/) và [Backlog](https://backlog.com/).

**SQL clients** có thể hữu ích cho các trường hợp cụ thể trong đó manual QA engineer phải kết nối với cơ sở dữ liệu.

## Automation QA Engineer

Vai trò và trách nhiệm của automation testers, hoặc automation QA engineers, có tính thay thế nhiều hơn và họ có các kỹ năng nâng cao hơn so với các chuyên gia manual QA. Cụ thể, khi họ viết scripts để chạy các bài kiểm tra lặp đi lặp lại. Programming skills cho phép họ viết automated test scripts. Vì lý do này, họ thường được gọi là nhà phát triển trong thử nghiệm. Sử dụng các automation tools khác nhau, các QA engineers này thiết kế, xây dựng, thử nghiệm và triển khai các giải pháp tự động hóa thử nghiệm hiệu quả. Mục tiêu của họ là tự động hóa càng nhiều testing effort càng tốt với một bộ code tối thiểu. Bằng cách này, họ tối ưu hóa việc kiểm tra, nếu được thực hiện thủ công, sẽ tiêu tốn một tỷ lệ lớn resources kiểm tra.

![](https://images.viblo.asia/6825f048-93ad-451e-bd57-c7cda3a1ca7b.jpg)
*Life cycle of the automated testing process. Source: [Kellton Tech](https://www.kelltontech.com/automation-testing)*

**Other common titles of Automation QA :** SDET (Software Development Engineer in Test / Kỹ sư phát triển phần mềm đang thử nghiệm), technical tester.

#### Automation QA engineer skills

**Coding skills :** Biết các ngôn ngữ máy tính phổ biến sẽ cho phép automation QA engineers viết code để tự động hóa các quy trình kiểm tra. Các ngôn ngữ lập trình phổ biến nhất để tự động hóa thử nghiệm là Python và Java, tiếp theo là Ruby, С ++, Perl và PHP. Với các gói hỗ trợ kiểm tra toàn diện và cụ thể, Python cho phép nắm bắt được bản chất của test case. Mặc dù Java là một ngôn ngữ khá phức tạp, nhưng nó được sử dụng rộng rãi và nhiều ví dụ có thể được tìm thấy trên các công cụ tìm kiếm. Java có một nền tảng đa dạng về các tools và packages và việc tích hợp liên tục với Java rất dễ dàng bằng cách tích hợp với các công cụ tự động hóa như Jenkins. Trong khi juniors hầu như không biết một ngôn ngữ lập trình, thì seniors lại giỏi một số ngôn ngữ code. Điều đó cho phép họ làm việc liền mạch trong bất kỳ team nào, bất kể ngôn ngữ họ sử dụng. Bên cạnh đó, họ cần nắm vững các ngôn ngữ cần thiết cho các công nghệ kiểm tra tự động hóa khác nhau.

**Working in an Agile environment (Làm việc trong môi trường Agile) :** Mặc dù chủ yếu làm việc trong Agile, các QA tự động hóa nên hiểu cách các quy trình automated QA hoạt động ở đó.

**Analytical skills (Kỹ năng phân tích) :** Sau khi kiểm tra bug reports, automation QA nên ưu tiên các kiểm tra cần thiết và hợp lý hóa các chức năng ứng dụng bằng phương pháp kiểm tra tự động.

**Problem-solving skills :** Kỹ năng giải quyết vấn đề giúp automation QA engineers tìm ra các lỗi một cách hiệu quả và tạo ra các bản sửa lỗi cho chúng.

#### Automation QA engineer responsibilities

**Writing, executing, and monitoring automated test suites :** Viết, thực hiện và giám sát automated test suites. QA automation engineers thiết kế các kiểm tra tự động bằng cách tạo các script chạy các chức năng kiểm tra tự động. Điều này bao gồm xác định mức độ ưu tiên cho test scenarios và tạo các kế hoạch thực hiện để thực hiện các scenario này.

**Designing documentation for automated processes :** Thiết kế tài liệu cho các quy trình tự động. Những tài liệu này bao gồm test plans, test procedures và test cases.

**Using automation testing frameworks :** Tóm lại, testing frameworks là tập hợp các practice và tool để tạo và thiết kế các trường hợp kiểm thử hiệu quả hơn. Mặc dù là một phần tùy chọn của quy trình thử nghiệm tự động, một khung có tổ chức giúp giảm chi phí bảo trì và nỗ lực thử nghiệm trong khi làm cho mã tự động thử nghiệm có thể tái sử dụng, bảo trì và ổn định. Xây dựng khung tự động hóa là một nhiệm vụ tiên tiến cho các kỹ sư QA tự động hóa cao cấp.

**New tools selection :**  Automation QA engineers có thể chịu trách nhiệm nghiên cứu, đề xuất và triển khai các công cụ để tăng khả năng tự động hóa cho dự án. Họ chủ động đưa các chiến lược và bộ công cụ thử nghiệm tự động sáng tạo vào các quy trình phát triển tổng thể. Những giải pháp mới này thường xuất hiện là các c[ông cụ tích hợp liên tục (continuous integration) (CI) và phân phối liên tục (continuous delivery) (CD)](https://www.altexsoft.com/blog/business/continuous-delivery-and-integration-rapid-updates-by-automating-quality-assurance/), đặc biệt khi nói đến regression testing.

#### Automation QA Engineer tools

In addition to the tools mentioned for a manual QA engineer, an automation tester uses the following.

Automation tools. Most popular of them are Selenium, TestComplete, Katalon Studio, and Ranorex. If you are considering having automated testing in your project, our article on the comparison of automated testing tools should be of use to you.

Automation frameworks. Instead of building elaborate automation frameworks from scratch, automation testers can also make use of ready-made products, like Serenity, a Java-based framework, or developer-centric Cypress, etc.

Ngoài các công cụ được đề cập cho manual QA engineer, automation tester sử dụng như sau.

**Automation tools :** Phổ biến nhất trong số đó là [Selenium](https://www.altexsoft.com/blog/engineering/the-good-and-the-bad-of-selenium-test-automation-tool/), TestComplete, Katalon Studio và [Ranorex](https://www.altexsoft.com/blog/engineering/the-good-and-the-bad-of-ranorex-gui-test-automation-tool/). Nếu bạn đang xem xét việc automated testing trong dự án của bạn, thì các bạn có thể tham khảo bài viết của chúng tôi về việc [so sánh các automated testing tools](https://www.altexsoft.com/blog/engineering/qa-engineering-roles-skills-tools-and-responsibilities-within-a-testing-team/).

**Automation frameworks :** Thay vì xây dựng các automation framework phức tạp từ đầu, automation testers cũng có thể sử dụng các sản phẩm làm sẵn (ready-made products), như [Serenity](http://www.thucydides.info/#/), Java-based framework hoặc nhà phát triển tập trung [Cypress](https://www.cypress.io/),... 

**IDEs for writing code :** [VSCode](https://code.visualstudio.com/), [Visual Studio](https://visualstudio.microsoft.com/), [IntelliJ IDEA](https://www.jetbrains.com/idea/), ...

**CI/CD tools :** [Jenkins](https://jenkins.io/), [TeamCity](https://www.jetbrains.com/teamcity/), ...

## QA Lead

Ngoài việc xử lý các nhiệm vụ hàng ngày như thiết lập các số liệu, giám sát các thành viên trong , quản lý resources bên ngoài và thiết kế các chương trình kiểm tra, QA lead có nhiều trách nhiệm công việc, vì họ phải thực hiện bất kỳ hành động nào cần thiết để đáp ứng các mục tiêu chất lượng.

![](https://images.viblo.asia/af6d152c-50a2-4d19-8bd4-2c44101c7fe5.png)
Thời gian của QA Lead được phân chia giữa các trách nhiệm trong một dự án. Source: [Software Testing Help](https://www.softwaretestinghelp.com/qa-test-lead-interview-questions-and-answers/)

**Các chức danh phổ biến khác của QA Lead :** test lead, lead QA analyst, test manager.

#### QA lead skills

Profound understanding of the business area and the client’s requirements. This is necessary to determine a test strategy, test goals, and objectives.

Being good at project planning, task, and people coordination. All management activities, including defining the task lists for subordinates, managing the necessary resources, and making sure necessary testing activities are being executed on time, fall on a QA lead’s shoulders.

**Bao gồm cả manual và automated testing skills** Nó cần thiết cho QA lead đến trải nghiệm cả về manual và automation testing để họ có thể xác định trường hợp nào sẽ có lợi và tốt nhất từ kiểm tra thủ công và cần automation.

**Kiến thức rộng về các phương pháp thử nghiệm (testing approaches) :** QA lead cần nhận thức rõ về các phương pháp, levels và các loại testing và các testing tool để chọn ra phương pháp phù hợp nhất cho dự án. Hơn nữa, họ cần cập nhật những xu hướng và công nghệ mới nhất.

**Hiểu biết sâu sắc về lĩnh vực kinh doanh và các yêu cầu của khách hàng :** Điều này là cần thiết để xác định một chiến lược thử nghiệm, mục tiêu thử nghiệm và mục tiêu.

**Lập kế hoạch dự án, phối hợp nhiệm vụ và con người tốt** Tất cả các hoạt động quản lý, bao gồm xác định danh sách nhiệm vụ cho cấp dưới, quản lý resources cần thiết và đảm bảo các hoạt động   cần thiết đang được thực hiện đúng hạn, nằm trên vai của QA lead.

#### QA lead responsibilities

**Chuẩn bị chiến lược thử nghiệm :** Các QA lead quyết định cách thiết lập test environment và cách quản lý luồng thông tin, testing tools nào được thực hiện và áp dụng các phương thức được chấp nhận trong ngành. Ngoài ra, QA leads thiết lập các template cho các tài liệu testing , reports và các quy trình khác. Do đó, công việc của họ có rất nhiều trách nhiệm.

**Chấp nhận và làm rõ các yêu cầu**. Một QA lead cần đảm bảo rằng các yêu cầu của dự án được xác định chính xác. Nếu không, họ cần làm rõ chúng thông qua giao tiếp với khách hàng.

**Setting số liệu chất lượng :** QA lead sẽ giúp các nhà phát triển xây dựng các số liệu để đo lường chất lượng cung cấp. Có các số liệu riêng biệt để phân loại lỗi, số liệu để xác định hiệu quả hoặc tỷ lệ hồi quy và số liệu để xác định xem chất lượng ban đầu đã được phân phối chưa.

**Lập kế hoạch và kiểm soát quá trình thử nghiệm :** QA lead cần xây dựng test plans và thủ tục, các hoạt động kiểm tra tiền độ, kế hoạch về ngân sách cho các thử nghiệm, và chuẩn bị test effort estimations. Thông qua phân tích liên tục (ongoing analysis), một QA lead kiểm tra xem team có đang tiến hành các quy trình một cách chính xác hay không. Một QA lead cũng theo dõi perfomance của từng
tester : kiểm tra loại khiếm khuyết nào tester có thể phát hiện ra và nơi có một xu hướng bỏ lỡ lỗi.

Với sự trợ giúp của equirements traceability matrix nắm bắt two-baseline documents - các yêu cầu và test cases  - QA lead kiểm tra xem các yêu cầu dự án hiện tại được đáp ứng và tất cả các test cases được corver.

![](https://images.viblo.asia/3588b9ff-363c-4178-b75f-8fffe2b325ee.png)
Requirements traceability matrix. Source: [Opencodez](https://www.opencodez.com/software-testing/create-requirement-traceability-matrix-rtm-free-sample-download.htm)

Recruitment and supervision. A QA lead is responsible for picking candidates for QA positions and afterwards identifying whether there’s a lack of knowledge or a skill gap that requires more training.

Represent QA team at meetings across departments. A test lead takes part in different cross-department meetings and updates the customer on the progress of testing activities.

Continuous test process improvement. A QA lead always aims at optimizing the test process, including the use of appropriate testing tools, test techniques, and test automation. If for some reason the team underperforms, it’s a QA lead’s responsibility to identify and fix the issue.

**Tuyển dụng và giám sát** Một QA lead chịu trách nhiệm chọn các ứng cử viên cho các vị trí QA và sau đó xác định xem có phải thiếu kiến thức hay khoảng cách kỹ năng cần được đào tạo nhiều hơn không.

**Đại diện QA team tại các cuộc họp giữa các bộ phận** Một test lead thử nghiệm tham gia vào các cuộc họp giữa các bộ phận khác nhau và cập nhật cho khách hàng về tiến trình của các hoạt động thử nghiệm.

**Cải tiến quy trình thử nghiệm liên tục :** Một QA lead luôn nhằm mục đích tối ưu hóa quá trình thử nghiệm, bao gồm việc sử dụng các công cụ kiểm tra thích hợp, kỹ thuật kiểm tra và tự động hóa thử nghiệm. Nếu vì một lý do nào đó mà team làm việc kém hiệu quả, thì đó là trách nhiệm QA lead để xác định và khắc phục vấn đề.

#### QA lead tools

QA lead cần chứng minh sự thành thạo với các công cụ manual và automation được sử dụng cho dự án. Thêm vào đó, họ sử dụng các công cụ quản lý khác nhau.

**Project management tools :** đã được đề cập trước đây (Jira, Redmine, YouTrack, Backlog, ...) có tầm quan trọng cao đối với các QA lead vì chúng giúp xác định cách giới thiệu phương pháp cho các team, cách đào tạo juniors và cách theo dõi tiến độ và chất lượng trong suốt quá trình phát triển.

## Vai trò của QA Engineers trong Software Development Life Cycle (SDLC)

Bằng cách xem SDLC (Software Development Life Cycle) từ bối cảnh của tester, chúng tôi có thể theo dõi mối quan hệ giữa tester và các bộ phận khác đã phát triển từ Waterfall đến Agile, sau đó đến DevOps.

Trong môi trường Waterfall, các QA engineer bị giới hạn trong domain của họ và tách biệt với các khu vực khác của SDLC. Về việc lấy thứ gì đó để kiểm tra từ các nhà phát triển, QA team tự lên kế hoạch thử nghiệm. Mặc dù họ tương tác với các vai trò khác, họ vẫn hoạt động như một nhánh độc lập của SDLC.

![](https://images.viblo.asia/191f81b0-e6ba-49e6-8d26-55b8b2147589.png)
Testing domain trong Waterfall model
Image Source: “[A Practical Guide to Testing in DevOps](https://leanpub.com/testingindevops)” by Katrina Clokie

Theo cách tiếp cận [Agile](https://www.altexsoft.com/whitepapers/agile-project-management-best-practices-and-methodologies/), chất lượng sản phẩm được xem là trách nhiệm tập thể. Do đó, các vai trò khác bắt đầu tham gia vào thử nghiệm, hợp tác như một nhóm lớn: các ý tưởng thử nghiệm đang được chia sẻ, các nhà phát triển thực hiện thử nghiệm đơn vị nhiều hơn, lĩnh vực kinh doanh hiện cũng được liên kết với các quy trình QA.

Trong [Scrum](https://www.altexsoft.com/blog/business/25-scrum-process-best-practices-that-set-your-agile-workflow-for-efficiency/), trong giai đoạn nước rút, các nhà phát triển và chuyên gia QA hợp tác trong cùng một nhiệm vụ để tránh những bất ngờ và sai sót.

![](https://images.viblo.asia/d5ef1205-e472-434e-bc74-9e13e3c54fa2.png)
Testing domain trong Agile
Image Source: “A Practical Guide to Testing in DevOps” by Katrina Clokie

The concept of continuous testing in DevOps means that the execution of automated tests is inseparable from the software delivery pipeline, which aims at instant feedback on the business risks associated with a software release. Because of continuous testing, the role of today’s tester is very much extended to deal with complex and accelerated product development and delivery.

Tuy nhiên, Agile vẫn có giới hạn của nó khi sự phát triển kết thúc khi sản phẩm được chuyển qua hoạt động để được đưa vào production. Mặc dù Agile định hình một nhóm cross-platform, nhưng nó thiếu các thành viên nhóm hoạt động, hỗ trợ, ...

Cuối cùng, [DevOps](https://www.altexsoft.com/blog/engineering/devops-principles-practices-and-devops-engineer-role/) tiến xa hơn bằng cách hợp nhất phát triển với các hoạt động thành một chu kỳ vô hạn có thử nghiệm ở từng giai đoạn. Tiến hành liên tục và tự nhiên, thử nghiệm là một phần của mọi nhiệm vụ khác trong dự án.

Khái niệm kiểm thử liên tục (continuous testing) trong DevOps có nghĩa là việc thực hiện automated tests không thể tách rời khỏi đường ống software delivery, nhằm phản hồi tức thì về các rủi ro kinh doanh liên quan đến việc phát hành phần mềm. Do thử nghiệm liên tục (continuous testing), vai trò của thử nghiệm ngày hôm nay được mở rộng rất nhiều để đối phó với việc phát triển và phân phối sản phẩm phức tạp và tăng tốc.

![](https://images.viblo.asia/e6a071b1-cec9-42c1-afa2-9dd78defe2ad.png)
Testing trong DevOps. Image credit: [Dan Ashby](https://danashby.co.uk/2016/10/19/continuous-testing-in-devops/)

Các vai trò bên ngoài liên quan đến thử nghiệm DevOps có thể là analytics team, infrastructure, giám sát và hỗ trợ - tất cả các loại vai trò khác nhau trong domain hoạt động. Ở đây có lợi ích chung vì không chỉ những người này đóng góp giá trị cho thử nghiệm, mà nhóm thử nghiệm còn cung cấp cho họ thông tin cho công việc của họ.

![](https://images.viblo.asia/42db88b2-d767-45e0-a2c3-54942f0f62b7.png)
Testing domain trong DevOps
Image Source: “A Practical Guide to Testing in DevOps” by Katrina Clokie

## Full-stack QA Engineer: a Tester of the Future

Với các mô hình phát triển mới - Agile và DevOps - kỷ luật thử nghiệm mở rộng để ảnh hưởng đến các team khác làm việc trong cùng một dự án. Vai trò của một tester tiếp tục phát triển, giúp các QA engineer có thêm sức mạnh trong một công ty.

![](https://images.viblo.asia/18baff86-0342-4c9d-879a-008037498385.png)
Core skills of the modern QA Engineer
Source: [Redgate](https://www.red-gate.com/wp-content/uploads/2014/02/Test-Engineering-Skills-v3.pdf)

Bằng cách kiểm tra tất cả các khía cạnh của chất lượng sản phẩm, chẳng hạn như functionality, usability, performance, security, globalization (toàn cầu hóa) ... và kết hợp các chiến lược và công nghệ khác nhau để kiểm tra một ứng dụng, tester chắc chắn có thể được gọi là full-stack QA engineer. Họ có sự kết hợp phong phú giữa kiến thức domain, technical skills và chuyên môn testing, cho phép họ phù hợp với nhu cầu hiện đại về giao hàng nhanh. Do đó, mọi tester nên theo đuổi con đường của một full-stack QA engineer, người tham gia vào vòng đời phát triển dự án ngay từ đầu và do đó, có tác động lớn hơn đến sản phẩm, dẫn đến chất lượng cao hơn bao giờ hết trước.

### Nguồn Tham khảo:
https://www.altexsoft.com/blog/engineering/qa-engineering-roles-skills-tools-and-responsibilities-within-a-testing-team/