Nay rảnh một chút nên ngồi nhìn lại bản thân một xíu 🤭. Chủ để hôm nay về “transfer” spec nha. Mình nghĩ không chỉ riêng mình mà các bạn cũng vậy, ai cũng sẽ có lúc được giao nhiệm vụ này.

Trong trường hợp thay đổi member của dự án, hoặc có một người ngoài muốn tìm hiểu về dự án của bạn ... khi đó member hiện tại thường được giao nhiệm vụ “transfer” spec cho người kia. 

Câu hỏi đặt ra là: “Làm sao để mình nói mà người nghe hiểu được tổng quan dự án nhanh nhất?”

Mặc dù được giao nhiệm vụ transfer cho new member khá nhiều lần nhưng mình nhận ra cách truyền đạt của mình vẫn ngáo vãi chưởng ... hic 😟

Lần gần nhất là:

Có một chị tester dự kiến join dự án của mình trong vòng 1 tuần để support test. Chị ý được add vào channel từ ngày hôm trước và sáng hôm sau mình có lịch transfer cho chị ý. 

Mình cũng không hỏi lại chị ấy xem việc tìm hiểu đến đâu rồi vì nghĩ rằng: chắc bà chị đã tìm hiểu về dự án và nắm được các tính năng chính rồi (vì có SRS, design và các màn hình của mỗi feature được tách riêng ra thành từng cụm khá dễ nhìn). 
Vậy nên khi transfer mình chỉ nói qua về khái niệm dự án một chút như: Dự án quản lý gì; Nó liên kết với những hệ thống nào; Có những actor chính nào.. Sau đó nói luôn về những tính năng đã làm xong, những tính năng cần test trong vòng 1 tuần này và đi vào chi tiết logic của từng màn hình luôn. 

Nói blobla các thứ xong cái quay ra thấy bà chị ngồi ngáp ngủ :v 

Lúc đó mình mới hỏi xem chị có hiểu gì không thì chị mới bảo: Mày nên nói cho chị tên các feature/màn hình trước xem nó là gìì, rồi mới đi vào giải thích chi tiết từng màn chứ. Chưa gì mày nói luôn logic với API … chị chẳng hiểu gì cả 😖

Thế là thui, “*vậy để em nói lại nhé*” … và cuối cùng là ngồi giải thích lại từng tí một từ đầu. 🥴

Đó ... kiểu với những lúc rảnh thì không sao, nhưng trong lúc đang bận sml mà phải ngồi transfer spec. Trong khi lại transfer cho 1 người chưa biết gì về cả 1 hệ thống thì nó mất thời gian lắm :< , có phải nói 1 buổi sáng là xong hết đâu. Mà nói xong thì chắc gì họ đã nhớ luôn 😕

Nhìn lại mới thấy, trong trường hợp trên thì cách mình transfer có vấn đề thật =))

Cuối cùng mình đã ngồi kiểm điểm một chút và nghĩ ra một vài tips giúp cho việc transfer spec nhanh mà hiệu quả hơn, vừa tiết kiệm thời gian mà người nghe lại dễ hiểu. Đại khái sẽ có những bước như này:
1. Chuẩn bị sẵn script transfer: 

    Tóm tắt các nội dung mình sẽ nói về dự án. Cái này rất quan trọng nha: nên viết ra để biết mình sẽ nói về những cái gì, theo thứ tự như nào.

    VD: Đầu tiên cần nói về khái niệm dự án, tiếp đến là:
    
    + Các hệ thống liên quan (nếu có). Chỉ ra xem với mỗi hệ thống thì có ảnh hưởng gì?
    + Các tính năng/màn hình chính, flow chuyển màn hình
    + Đi vào detail từng màn hình: giải thích xem màn hình này sẽ chứa data gì, …
    + …

2. Tổng hợp các tài liệu được sử dụng thường xuyên nhất trong quá trình làm

    Note các file tài liệu chính như: 
    
    + Design, SRS, test cases, tài liệu phân quyền theo permission, …
    + Thông tin về environment, account test…
    + Thông tin URL để truy cập
    + v.v...

3. Hỏi new member về cách hiểu của họ với dự án

    Mình thấy việc này khá quan trọng vì bạn cần xác định xem họ đã tìm hiểu dự án đến đâu rồi, từ đó sẽ hình dung ra xem mình cần nói những gì.

4. Transfer dựa theo script đã viết 

    Cần dựa vào mục (3) để xác định đối tượng transfer đang ở tình trạng nào:
    
    + Nếu member đã biết về các tính năng của dự án rồi thì mình sẽ đi luôn vào logic, cách hiển thị data, thông tin các API, cách tính toán → tiết kiệm thời gian
    + Nếu member chưa biết gì thì sẽ cần nói tổng quan về các màn hình và tính năng trước → sau đó đến flow di chuyển giữa các màn hình → giải thích chi tiết về mỗi màn hình. Cuối cùng gửi lại file tổng hợp tài liệu để cho member tự nghiên cứu lại; có gì không hiểu thì confirm lại sau. Như vậy sẽ tiết kiệm thời gian của cả hai hơn,

5. Liệt kê thông tin về các member khác trong dự án

    Kiểu như: BE có ai, FE có ai, Comtor là ai, BA, PM … Điều này là cần thiết để new member biết được những ai làm dự án này, và khi cần confirm spec gì thì sẽ biết nên confirm với ai.

Tạm thời mình mới nghĩ ra những tips trên, có vẻ khá clear và không bị miss những phần quan trọng ... tuy nhiên vẫn hơi ngáo nhỉ! =))

Mọi người ai đã có kinh nghiệm trong việc transfer này rồi thì mách mình cùng biết với nhaaa 😚

P/S: Khi nào có thời gian thì mình sẽ nói về cách viết script demo nhéee😉