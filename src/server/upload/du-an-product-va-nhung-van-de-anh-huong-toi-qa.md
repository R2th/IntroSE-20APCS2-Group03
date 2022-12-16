*Product và Outsource là hai mặt song hành của Phát triển phần mềm. Trong thế giới hội nhập và toàn cầu hóa, hầu hết lập trình viên ở các quốc gia đang phát triển đều nhận làm vô số dự án Outsource để kiếm vốn liếng và tích lũy kinh nghiệm để một ngày nào đó tự lập ra Startup, làm dự án Product của riêng mình. Ở những quốc gia mà khởi nghiệp công nghệ đã phát triển mạnh như Hoa Kỳ thì các dự án Product là chuyện như cơm bữa, nhưng ở những quốc gia chuyên làm Outsource như Việt Nam thì cách thực hiện một dự án Product vẫn còn rất mù mờ. Cũng bởi thế mà dẫn tới rất nhiều hiểu lầm về dự án Product mà lập trình viên của ta mắc phải. Tôi không có đủ kinh nghiệm làm việc trong các dự án Product để có thể liệt kê ra tất cả, nhưng với tư cách là một QA, tôi xin được chỉ ra một vài vấn đề của các dự án Product ở VN mà gây khó khăn cho công việc của QA.*

# 1. Làm Product thì không cần QA
Thực sự hiểu lầm này không rõ là do đâu mà có, cũng không biết là phải giải thích ra sao, tuy nhiên nó gần như trở thành truyền thống trên thị trường tuyển dụng tại nước ta. Các công ty làm Product gần như không bao giờ đăng tuyển QA, hoặc nếu có cũng rất ít và không được chú trọng. Các QA nào may mắn (hoặc không may) lọt vào các công ty Product thì thường không có cơ hội thể hiện cũng như phát triển trình độ (do số lượng dev áp đảo, nhiều trường hợp dev cũng chính là Project Owner nên quan điểm của QA bị gạt qua một bên khi có mâu thuẫn). QA trong các dự án Product cũng thường không có cơ hội thăng tiến, do một công ty làm Product thì thường chỉ có một vài dự án nhỏ, số lượng QA rất ít ỏi và không phân cấp; con đường hiếm hoi duy nhất cho QA phát triển là trở thành PM, nhưng QA lại thường thiếu những kĩ năng đặc trưng và hiểu biết về công nghệ của một PM. Ví trí QA của dự án Product dường như là cái ghế bị nguyền rủa: không ai cho làm mà dù có cho cũng không ai muốn làm.
<br>
<br>
QA không chỉ là một vị trí, QA còn là người đại diện cho một hướng tiếp cận bắt buộc của Phát triển phần mềm, đó là Đảm bảo chất lượng. Cho dù một dự án Product không có vị trí QA đúng nghĩa, nhưng bất kì ai là người cuối cùng confirm chất lượng của phần mềm thì cũng chính là đang thực hiện vai trò của một QA vậy. Một QA chuyên nghiệp chỉ phân biệt với một người thực hiện vai trò của QA ở những kĩ năng nghiệp vụ và quan điểm đảm bảo phần mềm mà thôi. Một bộ phận Dev sau nhiều năm làm việc trong môi trường Outsource có một định kiến rất nặng nề về QA hoặc một mối quan hệ nghiệp vụ không lành mạnh với QA khiến cho khi ra làm Product, họ như được giải phóng và không còn muốn bị kiềm tỏa bởi QA nữa. Tuy nhiên, một dự án đương nhiên phải có Đảm bảo chất lượng, nếu không thì nó sẽ là một dự án què quặt. Đừng nói rằng Product thì không cần QA, mà hãy nói rằng một dự án Product kém cỏi và lệch lạc thì không cần QA. Tại sao khi ta sản xuất phần mềm cho khách hàng thì cần chất lượng, con khi sản xuất cho chính mình thì lại không cần? - đó là câu hỏi mà các Project Owner cần phải trả lời. Nói rằng "Làm Product thì không cần QA" chẳng khác nào đang nói "Nấu cho chính mình ăn thì không vệ sinh an toàn thực phẩm" vậy.

# 2. Làm Product thì không cần tài liệu
Lại một hiểu lầm đáng quan ngại nữa của những người làm Product: họ cho rằng dự án Product là ý tưởng của họ rồi, mọi thứ đã ở trong đầu thì không cần phải viết ra thành văn bản, không cần phải phân tích yêu cầu hay thiết kế tổng quát nữa, cứ thế mà làm thôi.
<br>
<br>
Thực ra cho dù là dự án Product hay Outsource đi chăng nữa, thì Quy trình phát triển phần mềm vẫn là dùng chung. Điều đó có nghĩa là không phải chỉ có dự án Outsource thì mới cần tìm hiểu yêu cầu, phân tích yêu cầu, thiết kế tổng quát, thiết kế chi tiết, viết quan điểm test và testcase, mà là tất cả các dự án đều cần có những bước làm đó. Tùy theo Quy trình phát triển phần mềm mà dự án lựa chọn là gì (Waterfall hay Agile, Scrum hay Kanban,...) mà tầm quan trọng độ chi tiết đối với những văn bản đó có khác biệt đôi chút mà thôi. Đối với dự án sử dụng Agile, tài liệu có thể được coi nhẹ hơn, đơn giản hơn do specs thay đổi liên tục, nhưng không có nghĩa là chúng không quan trọng và không cần thiết. Ngược lại, vì specs thay đổi liên tục nên tài liệu văn bản lại càng quan trọng hơn để PM có thể theo dõi những thay đổi mà dự án đã trải qua, dự liệu những risk mà sự thay đổi đó mang lại và ước lượng thời gian, phân bố nhân lực để đáp ứng sự thay đổi. QA dù là trong Quy trình phát triển phần mềm nào cũng đều phụ thuộc sâu sắc vào specs để viết testcase và thực hành kiểm thử. Project owner và một vài dev có thể hiểu rõ và nhớ hết specs nhưng điều đó không có nghĩa là họ đã xác định được mọi trường hợp có thể xảy ra khi người dùng sử dụng phần mềm trong môi trường thực tế. Nói đúng hơn, những gì mà PO và dev nghĩ hầu như chỉ là những trường hợp sử dụng lý tưởng mà thôi. Nếu như không có một tập tài liệu đầy đủ và rõ ràng thì sẽ là cực kì khó cho bất kì ai có thể hoạch định ra tất cả các trường hợp có thể xảy ra và chiến lược để check cũng như confirm chúng. 
<br>
<br>
Sự thiếu vắng tài liệu dự án không chỉ gây khó khăn cho QA mà còn gây khó cho chính các Dev mới tham gia vào dự án hoặc khi dự án đã trải qua quá nhiều lần thay đổi specs. Nếu muốn dự án trơn tru và tránh những rắc rối không cần thiết, hãy làm đúng ngay từ đầu. Nếu bạn là một QA của dự án như vậy, hãy hiểu rằng việc này ảnh hưởng sâu sắc đến chất lượng của dự án và bởi thế nên dù không hẳn là việc của bạn, nhưng nếu có thể, hãy chủ động tham gia vào viết tài liệu dự án. 10 dự án thành công cũng chưa chắc là do QA nhưng 1 dự án thất bại thì QA sẽ lãnh đủ.

# 3. Làm Product thì không cần quản lý chặt chẽ
Khá nhiều những dự án Product không có quy trình quản lý hoặc quản lý rất lỏng lẻo. Tôi nói chung Quản lý là bao gồm cả Quản lý nhân sự, Quản lý tiến độ và Quản lý chất lượng. Quản lý lỏng lẻo, nghe có vẻ không liên quan gì tới QA, nhưng lại có thể trở thành cơn ác mộng tồi tệ nhất mà QA phải trải qua.
<br>
<br>
Nhiều dự án Product nằm trong công ty Startup, các member đều có quen biết trước với nhau thành ra cách mà họ "quản lý" nhau cũng rất kì cục. Hầu hết là các member "chơi" với nhau là chính, ít khi nghiêm túc nhắc nhở, đặt ra quy định hay trách phạt nhau. Cách quản lý này đối với những người thân thiết dễ gây "nhờn", quên mất ai chủ ai tớ, khi trao đổi công việc sẽ rất khó nói chuyện công tâm. Hơn nữa, khi kích cỡ của dự án phình ra, tuyển thêm nhân lực mới, cách quản lý này vô hình trung làm cho member mới khó hoà nhập, member cũ kết bè phái, team bị chia rẽ, dẫn tới chất lượng và tiến độ bị ảnh hưởng nặng nề. Việc quản lý nhân lực này vốn là nhiệm vụ của PM, tuy nhiên nếu PM là người quen chung của nhóm dự án thì sẽ rất khó cho anh ta thực hiện quy định một cách cương quyết. Khi đó, một QA có tiếng nói độc lập sẽ rất hữu dụng nếu có thể đặt ra một số quy tắc cơ bản và phụ giúp giám sát việc thực thi. QA phải cho thấy được tầm ảnh hưởng (Influence) của mình mà không cần phải ra mặt thị uy. Như vậy, team vẫn có tính kết nối đặc trưng của Startup lại vẫn có những chỉ dẫn cơ bản về nguyên tắc để tạo ra môi trường làm việc chuyên nghiệp hơn. 
<br>
<br>
Vì là dự án Product nên không cần có deadline cụ thể và báo cáo review Sprint? Sai lầm. Càng là dự án Product thì càng nên chú trọng vào khâu này, bởi vì dự án Product không có khách hàng đứng sau giục giã, sẽ rất dễ bị mất ý thức về thời gian. PM cần phải nắm rõ được Sprint này member đã xong cái gì và sẽ làm cái gì, chất lượng mỗi đầu việc như thế nào, có gặp khó khăn gì hay không. Những thông tin này là critical đối với công việc của QA bởi mỗi đầu việc hoành thành hay chưa hoàn thành, đạt chuẩn hay không đạt chuẩn đều là do QA quyết định. Nếu PM không nắm được hoặc tỏ ra kém quan tâm đôi với việc báo cáo Sprint, QA có nghĩa vụ chất vấn PM và các member, nêu ra những vẫn đề mình nhận thấy trong quá trình làm việc thúc giục PM tìm phương hướng giải quyết. Trong trường hợp này, QA buộc phải đóng vai trò Scrum Master. Một QA mà để bị dev qua mặt là một QA bỏ đi. Hãy nhớ, công việc của QA ngoài test ra còn là phải đảm bảo cho việc test được xảy ra nữa. QA ko thể làm việc của mình nếu tiến độ bị chậm, task bị trì hoãn, không có sản phẩm đầu ra để test. Muốn hoàn thành nhiệm vụ, QA phải ý thức rõ và yêu cầu được thực thi Quyền (Authority) của mình.
<br>
<br>
Như đã nói ở phần đầu, hầu hết các dự án Product không tuyển QA hoặc không quan tâm tới vai trò này. Tuy nhiên, Quản lý chất lượng đầu ra là thứ mà không một dự án nào được phép quay lưng lại bởi nó đóng vai trò quyết định thành bại của dự án. Là QA trong một dự án Product, bạn buộc phải chủ động tìm hiểu, nắm rõ và văn bản hoá specs chi tiết nhất có thể, từ đó soạn thảo được testcase để đảm bảo chất lượng cho sản phẩm. Bạn cần có chính kiến và hết sức bảo vệ chính kiến của mình, giữ vững vị trí trung lập hướng tới kết quả của dự án và không cho phép dev qua mặt dù chỉ một lần. Tất nhiên, việc dĩ hoà vi quý với dev là quan trọng, nhưng bạn vẫn phải giữ tác phong chuyên nghiệp khi làm việc và đứng ở quan điểm của người dùng cuối để xét đoán sản phẩm. Nếu không thể làm được việc tối thiểu của một QA, thì bạn không xứng đáng có mặt trong dự án. Làm tốt công việc của mình, đó là thể hiện giá trị cốt lõi (Core Value) cũng như tạo ra dấu ấn trong dự án.

# Vĩ thanh
*Trên đây chỉ là 3 trong số rất nhiều những vấn đề trong các dự án Product ở Việt Nam mà có thể ảnh hưởng nghiêm trọng tới công việc của một QA. Tuy nhiên, mọi vấn đề nghiêm trọng tới đâu thì đều có thể giải quyết, quan trọng là chúng ta phải muốn giải quyết và chủ động xắn tay áo lên giải quyết chúng. 
Chúc các QA gặt hái được nhiều thành công trong các dự án Product nói riêng và trong cả sự nghiệp nói chung.*