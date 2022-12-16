# **Làm sao để tiếp thị và làm cho bug đã log được sửa?**
Nghe có vẻ văn hoa nhưng đúng là nếu mà log lỗi không cẩn thận, dev đọc không hiểu thì fix làm sao đây nhỉ?

Đầu tiên, hãy đi tìm hiểu câu hỏi dưới đây:

**Tại sao cần tiếp thị lỗi?**

Nghe giống như đi bán hàng ý nhỉ? Hãy xem tiếp thị lỗi là gì nhé!

Có 1 câu nổi tiếng của chuyên gia phần mềm Cem Kaner như này: **“Người tester tốt nhất không phải là người tìm thấy hầu hết các lỗi hay người làm cho các lập trình viên lúng túng. Mà là người làm cho nhiều lỗi được sửa nhất”**

Bây giờ thì hãy tìm hiểu xem: sự khác nhau giữa tìm được hầu hết lỗi và làm cho hầu hết lỗi được sửa là gì nhé.

Chẳng phải là bất kỳ lỗi nào log trong hệ thống quản lý lỗi nên được sửa bởi Dev hay sao? Câu trả lời là Không. Các yếu tố như thời gian để tiếp thị sản phẩm, thời gian hoàn thành sản phẩm đúng tiến độ và các Dev thì làm việc theo các lịch trình không chặt chẽ thực tế.... Buộc các công ty release sản phẩm với 1 vài lỗi mà nó không ảnh hưởng nhiều tới người dùng.

Ai là người đưa ra sự tin tưởng là các lỗi có trong sản phẩm sẽ không ảnh hưởng đến niềm tin của khách hàng, độ tin cậy và sự quan tâm của các bên liên quan? - Kỹ sư kiểm thử hay nhóm Kiểm thử - nhiệm vụ của mỗi kỹ sư kiểm thử là làm sao để các lỗi được sửa để giảm tác động tiêu cực đến chất lượng sản phẩm.

Theo quan điểm của mình thì độ ưu tiên của lỗi sẽ phụ thuộc lớn vào việc mà tester trình bày nó với nhóm quản lý và nhóm phát triển.
Nghĩ về nó như là quảng cáo hay là tiếp thị issue thì nó liên quan tới 2 bước:

1. Viết hoặc báo cáo chính xác
2. Hiểu mọi thứ về lỗi đó, vì vậy bất kỳ vấn đề chi tiết nào về lỗi đó cũng có thể được giải thích tốt hơn

# Nghệ thuật báo cáo lỗi
Quả là báo cáo lỗi là 1 nghệ thuật, còn tester là 1 người nghệ sĩ. Cách mà lỗi được viết sẽ cho thấy kỹ năng về tech, sự hiểu biết về domain kiểm thử và khả năng giao tiếp của 1 kỹ sư kiểm thử. 

Thông thường, 1 lỗi nên chứa các thông tin dưới đây:
* Tóm tắt lỗi
* Các bước tái hiện
* File đính kèm (chụp màn hình, Log files etc.,)
* Khả năng tái hiện lỗi
* Độ nghiêm trọng của lỗi
* Phiên bản phần mềm, thông tin môi trường
* Các thông tin khác dựa theo yêu cầu của tổ chức

**Một lưu ý quan trọng:** Luôn tìm hiểu nguyên nhân gốc rễ của vấn đề và báo cáo nó. 

Ví dụ, 1 lỗi đăng nhập đơn giản với sự kết hợp chính xác của username và mật khẩu có thể liên quan tới 1 số lý do như sau:
1. Thông tin đăng nhập không được xác thực hoàn toàn
1. Vấn đề hết thời gian đăng nhập trong trường hợp đăng nhập từ xa
1. Hệ thống có thể xem xét tới tất cả các ký tự hoa hoặc không 

Vì vậy, với tư cách là 1 tester bạn có thể giải mã sự khác biệt trong các báo cáo lỗi dưới đây:

 “Không thể đăng nhập với username và mật khẩu đúng”
 
 “Không thể đăng nhập với username và mật khẩu đúng, khi username và mật khẩu chứa cả ký tự viết hoa và không.”


Phần sau là 1 sự mô tả rõ ràng về vấn đề. Với điều này thì bạn không chỉ làm tăng độ tin cậy của bạn với tư cách là 1 tester mà bạn còn báo cáo được vấn đề thực tế thay vì chỉ báo cáo về triệu chứng của vấn đề.

**Bây giờ hãy cùng xem cụ thể về các thông tin liên quan trong 1 báo cáo lỗi và thảo luận về các khía cạnh quan trọng của mỗi thông tin đó nhé!**

**#1. Tóm tắt lỗi**

Một bản tóm tắt lỗi nên cung cấp 1 cái nhìn nhanh để thấy được lỗi đó chính xác là gì. Nó cần phải chính xác và rõ ràng.

Ví dụ:
Hãy giả sử 1 module đăng nhập đơn giản. Hãy giả sử vấn đề là 1 người dùng mới truy cập vào 1 trang web nhưng không thể đăng nhập bằng mật khẩu mặc định của họ. Dưới đây là 1 số ví dụ về việc tóm tắt lỗi đó như thế nào:

“Người dùng mới không thể đăng nhập”

“Chức năng đăng nhập không làm việc như mong đợi”

“Người dùng không thể đăng nhập với mật khẩu chính xác“

![](https://images.viblo.asia/d5b25bae-5210-4416-ba31-f1abb068e8c9.jpg)

Từ các ví dụ trên, bạn có thể chọn ra 1 câu mà thực sự mô tả được vấn đề là gì không? Mình nghĩ là không. Bản tóm tắt nên có 1 thông tin đầy đủ về kịch bản lỗi

Hãy xem mô tả dưới đây:

“Một người dùng mới không thể đăng nhập bằng mật khẩu mặc định cung cấp qua email hoặc SMS”

Như bạn có thể thấy, từ mô tả trên thì Dev có thể hiểu rõ được vấn đề là gì và nó xảy ra ở đâu.

Vì vậy, cố gắng tìm từ chính xác để mô tả tóm tắt mà có thể đưa ra được những thông tin 1 cách trực tiếp. Tránh đưa ra các mô tả chung chung như “không hoạt động bình thường”, “không hoạt động như mong đợi”,...

**#2. Các bước để tái hiện và file đính kèm**

Các lỗi không thể tái hiện luôn được xếp lại sau mặc dù chúng có ảnh hưởng đáng kể. Chính vì thế, hãy cẩn thận khi viết các bước để tái hiện lỗi 1 cách chính xác và mang tính mô tả.

Các bước nên cần phải chính xác và giống hệt với các bước để phát sinh ra vấn đề. Đối với các lỗi liên quan tới chức năng, các ví dụ dưới đây là các ví dụ tốt nhất.

**Ví dụ:**
Hãy xem vấn đề tương tự nêu ra ở trên.

1. Tạo 1 người dùng mới sử dụng option đăng ký trong trang Home (ví dụ Username: HelloUser)
1. 1 email và 1 SMS sẽ được nhận với 1 mật khẩu mặc định. Email ID và số điện thoại để nhận SMS được cung cấp khi tạo người dùng ở bước 1 (Ví dụ email: HelloUser@hello.com, số điện thoại: 444-222-1123)
1. Chọn option đăng nhập ở trang home.
1. Trong trường username, nhập username ở bước 1.
1. Trong trường mật khẩu, nhập mật khẩu mặc định nhận được thông qua email hay SMS.
1. Ấn vào nút đăng nhập
1. **Kết quả mong đợi**: Người dùng có thể đăng nhập với username và mật khẩu đã nhập và chuyển tới trang tài khoản người dùng.
1. **Kết quả thực tế**: Thông báo “Username và mật khẩu không đúng” được hiển thị.


Nếu bất kỳ thông tin nào không được cung cấp ở trên ví dụ trên thì dẫn đến kết quả là sẽ có 1 khoảng trống trong việc liên lạc và Dev sẽ không thể nào tái hiện được vấn đề. Các bước phải cụ thể và chi tiết với các dữ liệu mà bạn sử dụng trong quá trình kiểm thử.

Nếu có thể hãy, hãy cung cấp 1 ảnh chụp màn hình thứ mà bạn nhìn thấy chính xác ở màn hình đó là gì. Cách này sẽ không chỉ giúp cho Dev có thể dễ dàng nhìn thấy được ngay lỗi là gì mà còn là bằng chứng về kết quả kiểm thử của bạn nữa. 

Các test case phi chức năng như stress test, kiểm thử tính ổn định hay hiệu năng thì ngoài các thông tin chi tiết ở trên thì thông tin về kịch bản mà gây ra stress hệ thống cũng có thể được báo cáo. Ngoài ra, có 1 số hệ thống có chức năng báo cáo log khi có bất kỳ hoạt động của hệ thống được thực hiện. Logs thường in các câu lệnh cung cấp bởi các dev trong code của họ. Bất kỳ khi nào 1 module được thực thi thì các bản log tương ứng sẽ được in ra và hiển thị. Các bản log sẵn có sẽ giúp rất nhiều cho dev tái hiện lỗi.
 
**#3. Khả năng tái hiện lỗi**

Một vấn đề được đánh độ nghiêm trọng lớn hay nhỏ dựa trên khả năng tái hiện. Tần suất có thể là luôn luôn, thỉnh thoảng hay hiếm khi hay thậm chí là chỉ thấy 1 lần. Một vấn đề mà khả năng tái hiện là luôn luôn thấy (nói cách khác là xảy ra 100%) thì sẽ được đánh độ ưu tiên cao hơn những cái khác.

![](https://images.viblo.asia/9a856e1f-e41a-4123-8c77-5b4aab1df752.jpg)

Vì vậy, nhiệm vụ của kỹ sư kiểm thử là theo dõi 1 cách chính xác đối với các vấn đề mà có tần suất xảy ra 100% này. Thỉnh thoảng có 1 số vấn đề nằm ngoài tầm kiểm soát của các kỹ sư kiểm thử mà kết dẫn kết quả là vấn đề đó chỉ xảy ra 1 vài lần trong nhiều nhiều lần kiểm thử. Đối với những case như thế, hãy luôn thêm số lần thử nghiệm vào, 1 kịch bản cụ thể được thực hiện cùng với số lần vấn đề xảy ra trong suốt những lần kiểm thử này.

Điều này làm cho báo cáo lỗi của bạn thêm phần uy tín hơn. Một lần nữa, điều này sẽ góp phần cải thiện danh tiếng của bạn với tư cách là 1 tester. Mình sẽ nói lý do để có 1 danh tiếng tốt.

**#4. Độ nghiêm trọng của lỗi**

![](https://images.viblo.asia/ee164996-ff27-43cc-a3c7-afbbf1ad5323.jpeg)

Độ nghiêm trọng của lỗi là chắc chắn là 1 yếu tố ảnh hưởng lớn nhất đến độ ưu tiên của lỗi.

Dưới đây là các phân loại mức độ nghiêm trọng khác nhau. Xin lưu ý rằng đây chỉ là những mẫu chung và nó khác nhau tùy vào các công ty.

1. Mức độ nghiêm trọng 1 - Show Stopper - Các lỗi mà nếu không được sửa thì người dùng sẽ không thể tiếp tục sử dụng phần mềm và không có cách nào đó để giải quyết
1. Mức độ nghiêm trọng 2 - Cao - đối với các lỗi tương tự như Mức độ nghiêm trọng 1, nhưng có một cách giải quyết nào đó.
1. Mức độ nghiêm trọng 3 - Trung bình
1. Mức độ nghiêm trọng 4 - Thấp
1. Mức độ nghiêm trọng 5 - Tầm thường.

Ví dụ: hãy so sánh hai vấn đề tương tự dưới đây:

Trong các hộp set-top của chúng tôi, rất ít nhà cung cấp dịch vụ cung cấp thông tin tần suất của dịch vụ như đã được điều chỉnh hiện tại. Hãy giả sử rằng tần số được hiển thị là 100 MHz thay vì 100,20 MHz. Điều này có thể không ảnh hưởng đến việc người dùng xem các dịch vụ nhưng có thể ảnh hưởng đến việc giám sát các chẩn đoán của set-top. Do đó, đây có thể coi là 1 một vấn đề có mức độ nghiêm trọng 3.

Giả sử vấn đề tương tự trong lĩnh vực ngân hàng: Nếu số dư tài khoản của bạn được hiển thị là 100$, thay vì 100,20$, hãy tưởng tượng xem vấn đề này có ảnh hưởng như thế nào. Đây chắc chắn phải là 1 vấn đề có mức độ nghiêm trọng 1. Như bạn có thể thấy trong cả hai trường hợp, vấn đề rất giống nhau đều là giao diện người dùng không hiển thị các chữ số sau dấu thập phân. Tuy nhiên, sự ảnh hưởng thì thay đổi tùy theo lĩnh vực.

# Tham gia vào các cuộc họp kiểm soát phiên bản phần mềm một cách hiệu quả

Thường thì mọi tổ chức đều có quy trình riêng để điều tra và sắp xếp độ ưu tiên các cho lỗi. Nói chung là một cuộc họp sẽ diễn ra vào các khoảng thời gian cụ thể trong suốt dự án để thảo luận về các lỗi và đánh độ ưu tiên.

Quy trình trong các cuộc họp như sau:

1. Lập danh sách lỗi từ hệ thống quản lý lỗi theo mức độ nghiêm trọng.
2.  Xem bản tóm tắt và thảo luận về ảnh hưởng của các lỗi đối với trải nghiệm của người dùng khi sử dụng sản phẩm phần mềm.
3. Dựa trên đánh giá rủi ro và ảnh hưởng, đặt mức độ ưu tiên và assign lỗi cho một Dev thích hợp để sửa nó

Trong bước 2, mọi kỹ sư kiểm thử buộc phải lên tiếng nếu như về ảnh hưởng của lỗi đối với trải nghiệm người dùng nếu lỗi đó được đánh 1 mức độ ưu tiên đáng có. Vì sau tất cả, tester là các kỹ sư kiểm thử là người dựa trên quan điểm của người dùng để viết các test case và kiểm thử sản phẩm.

Hãy xem xét vấn đề ví dụ ở trên về việc không hiển thị các chữ số sau dấu thập phân trong lĩnh vực ngân hàng. Đối với Dev, nó có vẻ là một vấn đề ít nghiêm trọng hơn. Anh ta có thể lập luận rằng thay vì khai báo biến dưới dạng số nguyên, anh ta sẽ khai báo biến đó như một dấu phẩy động để giải quyết vấn đề và do đó nó ít nghiêm trọng hơn.
 
Nhưng với tư cách là 1 tester, vai trò của bạn là giải thích tình trạng của khách hàng đang gặp phải. Quan điểm của bạn nên là người dùng sẽ phàn nàn như thế nào trong trường hợp này. Tester nên nói rằng điều này sẽ gây ra sự hoảng sợ cho người dùng đó là khách hàng bị mất tiền.


**Tác động của việc tiếp thị lỗi không đúng cách**

Nếu một lỗi mà không được tiếp thị đúng cách, nó sẽ tạo ra các vấn đề như sau:
* Mức độ ưu tiên của lỗi không chính xác
* Các vấn đề quan trọng được sửa chậm
* Sản phẩm phát hành có lỗi nghiêm trọng
* Phản hồi tiêu cực của khách hàng
* Giảm giá trị thương hiệu

Ngoài những lý do đã đề cập ở trên, thì điều rất quan trọng đó là xây dựng danh tiếng của bạn với tư cách là một kỹ sư kiểm thử. Nó giống như phát triển giá trị thương hiệu cho chính bản thân bạn.

Trong giai đoạn đầu của sự nghiệp, nếu bạn có thể giữ nguyên số lỗi “Không thể tái hiện” hoặc “Cần thêm thông tin” hoặc “Không phải lỗi hợp lệ” hoặc các thay đổi về mức độ nghiêm trọng càng thấp càng tốt, thì sẽ có giai đoạn lỗi của bạn sẽ không được xem xét 1 cách kỹ lưỡng và chúng sẽ được giao trực tiếp cho 1 Dev thích hợp nào đó để sửa.

Để phát triển giá trị thương hiệu như vậy và giành được sự tin tưởng của chính nhóm kiểm thử và các nhóm phát triển hay nhóm quản lý, bạn phải phát triển một số kỹ năng kỹ thuật về kiến thức kiểm tra, lĩnh vực và kỹ năng giao tiếp của mình.
# Kết luận

Bất kỳ sản phẩm hoặc dịch vụ nào dù lớn hay nhỏ nếu không có 1 sự quảng cáo thích hợp thì đều thất bại cả. Tuy nhiên, một khi thương hiệu đã được thành lập, thì bất kỳ sản phẩm nhỏ nào cũng có thể trở thành siêu phẩm với khán giả.

Phải nói rằng, việc quảng cáo quá mức một sản phẩm cũng có thể gây tổn hại đến danh tiếng.

Chính vì vậy, một lỗi phải luôn được viết một cách rõ ràng, ngắn gọn và chính xác để nó cung cấp vị trí chính xác của lỗi đó trong bản đồ phần mềm. Mình xin nhắc lại rằng điều này không chỉ cải thiện chất lượng của phần mềm mà còn làm giảm chi phí kiểm thử và phát triển phần mềm ở một mức độ lớn.

Bài viết được dịch từ link:
https://www.softwaretestinghelp.com/bug-reporting-get-your-bugs-fixed/