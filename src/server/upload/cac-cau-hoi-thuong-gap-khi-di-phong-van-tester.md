> Các câu hỏi thường gặp khi Phỏng vấn Tester

1. Static testing là gì?

• Được kiểm tra ở giai đoạn đầu, khi mà ta mới chỉ có các tài liệu yêu cầu, thiết kế mà chưa tiến hành viết code hay thực thi thì việc kiểm thử động là chưa khả thi, nó đòi hỏi phải duyệt lại các yêu cầu và đặc tả để kiểm tra tính logic mà không không cần chạy chương trình

2. Dynamic testing là gì?

• Việc kiểm thử được thực hiện sau khi đã có code, và đã được build. Dùng máy chạy chương trình để kiểm tra trạng thái tác động của chương trình

• Kiểm tra dựa trên các case kiểm thử xác định bằng sự thực hiệ của đối tượng kiểm thử

• Nhập giá trị đầu vào và giá trị đầu ra để kiểm tra kết quả mong muốn

3. Black box ?

• Dữ liệu kiểm tra được lấy từ cấc đặc tả như: Phân lớp tương đương, Gía trị biên, Dựa vào mô hình, Ma trận dấu vết, Thăm dò, Đặc tả, ...

• Không liên quan đến mã lệnh, đây là 1 sự đánh giá khách quan. Là thăm dò mù vì không biết phần mềm được xây dựng như thế nào

4. White box?

• Khảo sát cấu trúc bên trong. Ta sẽ truy cập vào cấu trúc dữ liệu và giải thuật bên trong chương trình gồm: Giao diện API, Bao phủ lệnh, Gán lỗi, Hoán chuyển, Static.

• Được sử dụng để đánh giá hoàn thành phần mềm được tạo cùng với phương pháp black box

5. Gray box?

• Truy cập tới cấu trúc dữ liệu và giải thuật bên trong nhưng chỉ được kiểm tra ở mức người sử dụng hay black box, việc thao tác dữ liệu ra vào là không rỏ ràng

6. Làm sao để viết Test case có thể cover hết requirment?

• Khi test ta nên đối chiếu qua lại giữa màn hình và test case. Dựa vào phần vùng tương đương, xát định giá trị biên, pairwise (kết hợp điều kiện test), đoán lỗi và dựa vào kinh nghiệm.

• Nếu yêu cầu xử lý quá phức tạp, thì ta nên vẽ Flow chart của yêu cầu, rồi lần theo từng nhánh mà viết test case để khảo sát trường hợp test. Còn với những màn hình tương đối thì không cần vẽ flow chart mà viết test case theo thứ tự giao diện (GUI) validate cho từng item, rồi đến chức năng từng button ( thêm, xóa, sửa, hủy, seach...)

7. Kiểm thử hiệu năng là gì?

=> Kiểm thử hiệu năng nói chung là một loại kiểm thử với với ý định là để xác định khả

năng phản hồi, thông lượng, độ tin cậy và/hoặc khả năng mở rộng của hệ thống tải công việc (workload) xác định

8. Giải thích các loại kiểm thử : Stress Testing, Load Testing

- Kiểm thử tải để kiểm tra khả năng xử lý của ứng dụng ở các điều kiện tải bình thường hoặc điều kiện tải tối đa.

- Kiểm thử áp lực (Stress testing):

Tập trung xác định hoặc kiểm tra các đặc tính hiệu năng của hệ thống hoặc ứng dụng

cần kiểm thử trong những điều kiện vượt ra ngoài những điều kiện dự đoán trước trong

các hoạt động của sản phẩm. Nó liên quan đến những kiểm thử vượt quá khả năng bình thường của hệ thống.

-> khác nhau:

+ Load: điều kiện thường

+ Stress: vượt quá khả năng tải của nó.

9. Hệ thống có những tính năng: Đăng nhập, Đăng ký, Xem Sản Phẩm, Mua Hàng...

TH1: User 1 thực hiện các thao tính năng như trên xong, sẽ đến User 2, tương tự, User 2 xong, sẽ đến User 3, các User sẽ thực hiện tuần tự...

TH2: n User sẽ cùng access vào hệ thống và cùng lúc sẽ thực hiện những chức năng trên

Hỏi tốc độ xử lý và khả năng phản hồi của Server trong 2 trường hợp trên là như thế nào? Giống nhau hay khác nhau, và nếu khác thì khác như thế nào?

10. JMeter ứng dụng kiêm thử hiệu năng trên mobile ra sao ?

Jmeter dùng để test hiệu năng của server nên chỉ cần giả lập dc request sau đó config là test được (ko phân biệt mobile hay webpage)

11. Ngoài jmeter ra thì em còn dùng công cụ nào nữa so sánh công cụ đó với jmeter. tại sao em sử dụng jmeter để áp dụng test hiệu năng game của em mà không dùng cái khác

=> Jmeter, Appload, Loadrunner.

12. Sự khác nhau giữa công cụ kiểm thử hồi qui tự động và công cụ kiểm thự hiệu năng tự động?

- Các công cụ kiểm thử tự động: ghi lại các thao tác test và thực hiện lại chúng sau một thời điểm nào đó. Chức năng ghi và thực hiện lại là điều cốt yếu của kiểm thử hồi qui.

- Công cụ kiểm thử hiệu năng: xác định tải của một máy chủ có thể xử lý được. Và chức năng phải có là làm cho nhiều User chạy trên cùng một máy, lập lịch và đồng bộ các user khác, có thể đo lường mức tải của mạng - network load - khi có nhiều user giả lập truy cập vào

13. ODBC là gì?

Open Database Connectivity (ODBC) là một chuẩn application-programming interface (API) mở cho phép truy cập vào Cơ sở dữ liệu. ODBC dựa trên Structured Query Language (SQL) có giao tiếp ở mức Call-Level. Nó cho phép các chương trình sử dụng SQL để truy vấn trực tiếp vào database mà không cần phải biết giao tiếp cá nhân - proprietary interfaces - vào database. ODBC sử dụng SQL truy vấn và biến đổi thành truy vấn mà hệ thống CSDL riêng hiểu được - individual database system.

14. Exception Testing không phải là Exploratory Testing

Theo mình nghĩ thì exception testing là kiểm thử những trường hợp liên quan đến lỗi của hệ thống, có thể là kiểm thử xem hệ thống (phần mềm, ứng dụng,...) xử lý như thế nào khi server bị down, hay Database server không hoạt động, timeout, mất kết nối khi đang xử lý,... hoặc những trường hợp crash hệ thống do dữ liệu đầu vào không đúng với kiểu dữ liệu mong đợi.

Mình nghĩ Exception Testing giống Recovery Testing hơn

15. Có thể kiểm thử cover hết tất cả trường hợp không?

Không, Vì đôi khi có những lỗi xảy ra vô chừng, đôi khi 1 số trường chỉ xảy dù chỉ 1 lần

16. Đã kiểm thử thì sẽ không còn bugs?

Không ai có thể cam đoan hay đảm bảo là ứng dụng 100% không có bugs

17. Tester chỉ có 1 việc là tìm bug?

Tìm bugs là nhiệm vụ của tester, nhưng cũng là chuyên gia của 1 phần mềm vì phải hiểu rỏ toàn bộ hoạt động của PM và mối liên quan rang buộc là gì? ảnh hưởng của modul khác. Đôi khi tester phải phân tích yêu cầu và đưa ra hướng giải quyết vấn đề

18. Khi nào thì kiểm thử tự động?

- Khi dự án lớn và lâu dài. 1 chương trình (pm) có yêu cầu giống nhau, ít sự thay đổi trong tương lai, ổn định và đáp ứng được test tay

- Trường hợp kiểm thử cần thực hiện nhiều lần, thường xuyên phải thực hiện regression test, một số lượng test data lớn cần hoàn thành trong một thời gian ngắn.

- Kiểm thử cần thực hiện ở môi trường khác nhau

- Kiểm thử hoạt động cơ bản mà phải thực hiện lặp lại với lượng test data lớn

- Kiểm tra nhiều màn hình trong thời gian ngắn, liên tục

- Thực thi test performance test hoặc load test thì kiểm thử tự động gần như là lựa chọn duy nhất

19. Điểm cộng của tester là gì?

Biết nhiều business domain khác nhau, nhìn sâu vào toàn bộ hệ thống, có thể nhìn 1 vấn đề ở nhiều góc cạnh, có thể xử lý tình huống tốt

20. Kỹ năng cần có của 1 tester?

Khả năng hân tích, học hỏi nhanh, tỉ mĩ, giao tiếp, tiếng anh và có thể hỗ trợ team

21. Thứ tự khi test web?

- Phân trang ra theo top, buttom, right, left, test treebn từng khu vực

- Top: phần header có nhiều menu

- Từng menu: có nhiều function

- Function: sẽ có nhiều order, add, edit, delete….

- Môi trường test: trình duyệt, flow, resize, zoom, tooltip, highlight, tab, font, function…

22. Lý do bạn chuyển công ty?

Cty củ tốt, nhưng hiện tại muốn tham gia vào 1 môi trường …( kể những điểm tốt của cty mà bạn đang pv), muốn học hỏi them….

23. Bạn muốn làm việc trong 1 môi trường như thế nào?

( Nên kham thảo công ty trupocws khi phỏng vấn)

24. Thực hiện test là làm nhưng gì?

Độc tài liệu đặc tả -> Thiết kế test plan -> Tạo test case -> thực thi test -> post bugs -> report bugs

25. Test nói bug nhưng Dev nói không phải, bạn sẽ làm gì?

Kiểm tra tất cả môi trường, điều kiện cần có để sinh ra bug ( như trình duyệt, cấu hình…), quay lại màn hình demo hoặc có thể demo trực tiếp cho dev xem, nếu Dev vẫn không chịu đó là bugs thì kiểm tra nguyên nhân sinh ra bugs đó. Nếu Dev vẫn không chịu thì có thể hỏi đồng nghiệp trước, tiếp theo là báo cấp trên mình và note bug

26. Điểm mạnh, điểm yếu của bạn

- Mạnh: Khả năng phân tích, học hỏi, quan sát và sang tạo. có lập trường

- Yếu: Hay tập trung vào 1 vấn đề nên gây ra lố time, để ý quá nhiều lỗi nhỏ, quá cầu toàn

27. Bạn sẽ đóng góp gì vào công ty chúng tôi?

Tôi sẽ giúp công ty bạn tạo ra những phần mềm chất lượng, ít xảy ra lỗi nhất. và sẽ góp phần vào sự phát triển của công ty

28. Nếu trúng tuyển, thì khi nào bạn đi làm được?

Nên trả lời k quá 1 tháng

29. Mức lương mong muốn của bạn

Nên deal thẳng. không bao quát, hay khoảng

30. Mục tiêu tương lai và kế hoạc để đạt được ?

Muốn phát triển vị trí hiện tại lên level cao hơn, muốn trở thành 1 chuyên gia test trong vòng … năm nữa

31. Người quản lý trước nhận xét gì về bạn?

Chân thật, có tính logic cao. Hay phản biện để tìm ra nhiều trường hợp xảy ra

32. Vấn đề nào mà bạn cảm thấy lớn và khó khan nhất khi tham gia KTPM?

Thuật ngữ. Vì khi bước vào 1 công việc mới thì việc tìm hiểu học hỏi để hiểu rỏ về phần mềm.. đó cũng là 1 trở ngại

33. Bạn tổ chức khối lượng công việc của mình như thế nào?

Sắp xếp thời gian phù hợp cho từng task, những task nào cần phải xử lý trong ngày, mức độ quan trọng và cần thiết của 1 task

34. Ưu và nhược điểm của 1 tester?

Ưu: Học hỏi được nhiều công nghệ, nhiều chương trình, nhiều nghiệp vụ để tạo ra 1 chương trình tốt cho người dung

Nhượt: Tìm kiếm lỗi và retest 1 lỗi nhiều lần gây ra nhàm chán

35. Mục tiêu chính của test plan là gì?

Lên kế hoạch phân tích và thiết kế time , nhiệm vụ, nhân sự phù hợp, Nhằm tiết kiệm thời gian, nhân sự và tài chính

36. Thực thi test nên thực hiện khi nào?

Nên thực thi test ở tất cả level test

37. Sự khác nhau giữa test hồi quy và retest ?

- Kiểm thử lại có nghĩa là kiểm thử lại chức năng hoặc lỗi để đảm bảo lỗi đã được sửa.

- Kiểm thử hồi quy có nghĩa là kiểm thử ứng dụng phần mềm khi có trải qua thay đổi code để đảm bảo rằng code mới thay đổi không ảnh hưởng đến các phần khác của phần mềm.

38. Sự khác nhau của beta test và alpha test? (có thể tìm hiểu them trên mạng)

- Beta testing nhằm cung cấp thông tin từ những phản hồi của người dùng thực.

- Alpha testing giúp bạn giả lập môi trường thực để kiểm thử phần mềm trước khi đến với quá trình Beta testting. Alpha và Beta testing không thể thiếu vòng đời phát triển phần mềm.

39. có bao nhiêu mức test và loại test?
https://blog.haposoft.com/kiem-thu-phan-mem-cac-loai.../

40. Negative Testing là gì?

Thử nghiệm nhằm mục đích làm cho phần mềm không hoạt động. Đây cũng được gọi là "test to fail"

41. Positive Testing là gì?

Kiểm tra nhằm mục đích hiển thị phần mềm hoạt động. Đây cũng được gọi là "test to pass".

42. Stress Testing là gì?

Thử nghiệm tiến hành để đánh giá một hệ thống hoặc thành phần tại hoặc vượt quá giới hạn của các yêu cầu cụ thể của nó để xác định tải trọng mà nó không thành công và như thế nào. Thường thì đây là thử nghiệm hiệu suất sử dụng một mức độ mô phỏng rất ca

43. Test plan gồm những gì

44. Quy trình test từ lúc nhận yêu cầu đến khi xong?

45. Auto test có thay thế manual test được không, khi nào nên dùng auto test

46. Nếu deadline không kịp để test full hết hệ thống thì sao?

47. Nếu đến deadline mà còn quá nhiều bug không thể fix hết thì sao?

48. Nếu phải yêu cầu test hệ thống mà ko có tài liệu gì thì sao?

49. Ví dụ một chức năng trên mobile (2 người đang call giống skype chẳng hạn), thì có các exception case nào?

50 Mô hình agile có ưu/nhược điểm gì? khi nào dùng agile? vai trò QC trong agile?

51. Exploratory testing là gì? Tự seach

52. Ad-hoc test là gì? Tự seach

53. Trong test case cần có những thành phần nào?

54. jmeter là gì?

55. jmeter có hổ trợ mobile application test k?

56. Làm sao để bik test case cover đủ requirement

57. Tìm hiểu về end to end testing

58. API testing, tool dùng để test, viết testcase api

59. Đưa 1 hình upload file (yêu cầu là cho phép upload 1 image dưới 7 bytes) list ra test case cho nó

60. Đưa 1 câi If else, vẽ ra cái flow ứng với kết quả (if width > height -> biggest dimension = width else ...)

61. Kiến thức về scrum? quy trình?
- khi áp dụng Scrum, có 4 cuộc họp (Meetings or Ceremonies) quan trọng tạo nên cấu trúc trong mỗi Sprint như sau:
+ Sprint planning: Cuộc họp lên kế hoạch của đội dự án, nhằm xác định những gì cần hoàn thành trong Spring sắp tới.
+ Daily stand-up: Cũng được biết đến như “Daily Scrum”, một cuộc họp nhỏ 15 phút mỗi ngày để trao đổi công việc giữa đội phát triển.
+ Sprint demo: Một cuộc họp chia sẻ, nơi mà các thành viên chỉ ra những gì họ đã làm được trong Sprint đó
+ Sprint retrospective:họp cải thiện cho mỗi sprint: Sự đánh giá, nhìn lại những điều đã làm được và chưa làm được của Sprint hiện tại, và đưa ra giải pháp hành động cho Sprint tiếp theo được tốt và hoàn thiện hơn
http://ecci.com.vn/qui-trinh-scrum-la-gi

62. Cách retest bug như thế nào?
Test case được mô tả trong bug, nếu pass thì test them ad-hoc xung quanh

63. Cách viết test case sao cho hiệu quả?
- Hiểu tính năng của Feature mình đang viết Test (nếu là function test)
Sau đó mình phải tách việc viết TC ra theo 2 hướng:
- UI/UX:
+ Aligment
+ Color
+ Easy to use....
- Function
+ Coi nó gồm những tính năng gì, list ra hết, rồi mới đdi vào từng case (positive case trước)
+ Sau đó cùng chú ý thêm những abnormal case như: 1 userA đang Edit, User B Delete cùng record, User A đang Edit, User A remove permission User A trên record... etc

64. Cách review test case của người khác viết ntn?
- Về review thì mình cũng phải đi từ tổng quát đến chi tiết như khi mình viết test case
- Khi review cần chú ý thêm là Test case có nằm trong Testing Level hợp lí không

65. Gioi thiệu về project tưng làm, em lam gi trong du an do?
66. Cách giải quyết vấn đề khi xảy ra mâu thuẩn với dev?
67. sytem test khác interation test như thế nào? em làm gì ở giai đoạn sytem test?
68. cho 1 màn hình seach. hãy liệt kê các test case có thể?
69. Database test là gì
Database Testing là quá trình kiểm tra độ chính xác và tính toàn vẹn của cơ sở dữ liệu (CSDL). Đảm bảo rằng các dữ liệu là chính xác và duy nhất. Những lỗi sau đây của CSDL có thể gây ra một số vấn đề nghiêm trọng: deadlock, hỏng dữ liệu, hiệu suất kém, không thống nhất, vv...

70. nêu 5 kĩ thuật test cơ bản. Trong đó transition state test làm sao?
- Phân tích giá trị biên (Boundary Value Analysis - BVA): kiểm thử tại các ranh giới giữa các phân vùng, bao gồm các ranh giới tối đa, tối thiểu, bên trong hoặc bên ngoài. Nếu một điều kiện đầu vào bị giới hạn giữa các giá trị x và y, thì các test cases phải được thiết kế với các giá trị x và y cũng như các giá trị ở trên và dưới x và y.
- Phân vùng tương đương (Equivalence Class Partitioning): cho phép chia tập hợp điều kiện kiểm thử thành một phân vùng được coi là giống nhau. cho phép xác định các lớp tương đương hợp lệ cũng như không hợp lệ.
- Bảng quyết định (Decision Table based testing): được sử dụng cho các chức năng đáp ứng sự kết hợp của các yếu tố đầu vào các biến cố. đầu tiên là xác định các chức năng trong đó đầu ra phụ thuộc vào sự kết hợp của các đầu vào
- Chuyển đổi trạng thái (State Transition): Phương pháp này được sử dụng khi hệ thống có xử lý thay đổi từ trạng thái này sang trạng thái khác sau hành động cụ thể.
Các thay đổi trong điều kiện đầu vào sẽ thay đổi trạng thái của Ứng dụng đang được Kiểm thử (Application Under Test - AUT).Tester sẽ thực hiện hành động nhập các điều kiện đầu vào khác nhau theo trình tự, có thể là hợp lệ và k hợp lệ đê đánh giá xử lý hệ thống.
Có 2 cách biểu diễn:
- Trong sơ đồ chuyển trạng thái, các trạng thái được hiển thị trong các đoạn text được đóng khung và quá trình chuyển đổi được thể hiện bằng các mũi tên.
- Trong bảng chuyển trạng thái, tất cả các trạng thái được liệt kê ở phía bên trái và các sự kiện được mô tả ở trên cùng.
Ưu điểm chính của kỹ thuật kiểm thử này là nó sẽ cung cấp sự biểu diễn bằng hình ảnh hoặc dạng bảng cách xử lý của hệ thống, điều này sẽ khiến tester bao quát và hiểu cách xử lý của hệ thống một cách hiệu quả.
Nhược điểm chính của kỹ thuật kiểm thử này là chúng ta không thể dựa vào kỹ thuật này trong mọi thời gian.
- Đoán lỗi (Error Guessing): Đây là một kỹ thuật dựa trên kinh nghiệm, hiểu về hệ thống, ..

71. ng ta làm gì trong giai đoạn sytem test
System Test chủ yếu là Test san pham tren nhieu moi truong cai dat khac nhau (ma san pham ho tro) Cac scenario test di tu Deploy app, Và những main test case của toàn bộ project.
cần đảm bảo hoạt động của phần mềm là một khối thống nhất .
Cần kiểm tra xem sản phẩm không bỏ qua bất kỳ yêu cầu về chức năng cũng như phi chức năng.
Cần thực hiện kiểm tra sản phẩm trên môi trường giống như môi trường thực tế của sản phẩm.
Cần thực hiện kiểm tra sản phẩm với dữ liệu giống như dữ liệu thực tế của sản phẩm.
Đây là bước đầu tiên để kiểm thử ứng dụng trên sản phẩm phần mềm hoàn chỉnh đã được tích hợp đầy đủ trước khi nó được phát hành.

72. cách viết test case?
- Các Test Cases cần phải đơn giản và minh bạch:
Tạo các Test Cases đơn giản nhất có thể. Test Cases phải rõ ràng và ngắn gọn vì tác giả của Test Cases có thể không thực hiện chúng.
Sử dụng ngôn ngữ dễ hiểu như: đi đến trang chủ, nhập dữ liệu, click vào Submit... Điều này làm cho việc hiểu các bước kiểm thử dễ dàng và thực hiện kiểm thử nhanh hơn.
- Tạo Test Cases với vai trò như người dùng cuối
- Tránh lặp lại Test Cases.
- Không phỏng đoán
- Đảm bảo bao phủ 100%
- Các Test Cases phải được xác định.
- Thực hiện các kỹ thuật kiểm thử
+Phân tích giá trị biên (Boundary Value Analysis ­- BVA)
+ Phân vùng tương đương (Equivalence Partition - EP)
+ Kỹ thuật chuyển trạng thái (State Transition Technique)
+ Kỹ thuật đoán lỗi (Error Guessing Technique)
- Làm sạch môi trường kiểm thử: Điều này đặc biệt đúng đối với kiểm thử cấu hình.
- Tescase phải tương ứng với mỗi level test
-. Đánh giá của các đồng nghiêp. review testcase

73. hỏi về auto test: API, tool posman, các yếu tố để tạo 1 website, kinh nghiệm về DB và code ở mức nào?
74. Sự khác nhau giữa Smoke test và Sanity test?
75. Web app và mobile app khác nhau ntn? Khi test hybrid app (offline webapps) thì nên test ntn?
76. POM (auto test) giúp gì cho việc test?
77. Tại sao chọn testing là career path?
78. Test localize và internationlize là gì?
79. Trong việc test dùng những kĩ thuật gì?
80. API là test gì? Bản chất của việc test API là gì và giúp ích ntn trg việc test pm?
81. Daily task của e là gì?
82. Mô tả các acitivities trg Scrum model
83. Khi chạy regression thì pick các bộ regression ntn? Có kn gì trg việc chọn các TCs để chạy regression, smoke test... k? Và sẽ run ntn?
84. Black box testing là gì?