Bạn có thể xem bài viết gốc của mình tại đây: https://phucluong.com/97-loi-khuyen-danh-cho-lap-trinh-vien-phan-2/

## Điều 6 – Before You Refactor – Trước khi bạn refactor
Hiển nhiên code của chúng ta luôn luôn có những thứ có thể “refactor” cho đẹp hơn, tốt hơn… Tuy nhiên trước khi làm điều ấy, hãy cân nhắc cẩn thận những điều sau đây để tránh lãng phí thời gian cũng như công sức của bạn (và các đồng nghiệp của bạn):

Chúng ta thường có xu hướng chê bai những đoạn code hay hệ thống cũ, và cho rằng mình có thể viết tốt hơn. Chúng ta có thật sự hiểu chúng trước khi quyết định refactor chưa? Hãy xem xét kĩ nó trước đã, và cả những unit-test đi kèm để có thể biết được lý do tồn tại, cũng như những điểm mạnh/điểm yếu của nó. Khi hiểu rồi, bạn mới có thể refactor nó tốt hơn và tránh gây ra những lỗi không mong muốn.

Lập trình viên cũng thường có xu hướng muốn “đập đi làm lại” mọi thứ một cách rất tự tin. Tuy nhiên, điều này cần phải hết sức cẩn thận và nên tránh. Là con người thì chắc chắn sẽ có sai sót. Những đoạn code cũ tuy nhìn có thể hơi “xấu”, nhưng nó đã được test cẩn thận hàng năm trời, và cũng có thể đã được nhiều lần tối ưu hoặc sửa lỗi ngay trên những đoạn code đó. Việc viết lại mới hoàn toàn, bạn có thể sẽ gây ra những lỗi tiềm ẩn (có thể đã được fix trước đó), và sẽ tốn khá nhiều thời gian để test lại toàn bộ chúng.

Chia việc refactor code thành nhiều lần nhỏ nhưng đều đặn, sẽ tốt hơn là refactor lớn một cách đột ngột. Việc chia nhỏ như vậy sẽ giúp giảm thiểu công sức refactor của chúng ta, giảm thiểu số lượng bug có thể gây ra, và công sức test lại chúng cũng nhỏ đi rất nhiều. Hãy tưởng tượng một lần thay đổi nhỏ, với 2 con bug được phát hiện, sẽ “dễ chịu” hơn nhiều so với một lần thay đổi lớn với vài chục con bug.

Bạn cần đảm bảo rằng unit-test hiện tại phải luôn pass, và cần viết thêm unit-test để cover những thay đổi mới. Hãy cẩn trọng và cân nhắc trước khi xóa những unit-test cũ vì có thể chúng vẫn còn có ích sau này.

Đừng refactor code chỉ vì nhận định chủ quan hay cái tôi của bạn. Nếu code hiện tại không có lỗi gì, sao lại phải fix nó chứ? Phải chăng bạn muốn viết lại chỉ vì nhìn nó không đúng “style” của bạn? Lý do này không hợp lý chút nào. Và cho rằng bạn có thể làm tốt hơn người trước cũng không phải là một lý do hợp lý.

“Công nghệ mới” cũng không phải là lý do đủ hợp lý để thay đổi. Chúng ta thường cho rằng code hiện tại khá lỗi thời, và thư viện mới, framework mới sẽ xử lý công việc tốt hơn rất nhiều. Tuy nhiên, bạn cần chắc chắn rằng chúng đã được chứng minh (thống kê tin cậy) về khả năng cải thiện hiệu suất cũng như chất lượng của các library/framework… Không thì tốt nhất cứ để nguyên hệ thống như vậy.** [Ý kiến cá nhân]** Việc sử dụng library/framework mới cũng cần cân nhắc về độ ổn định và phổ biến của chúng trong cộng đồng. Ai là người maintain chúng (cá nhân hay tổ chức), họ có khả năng drop dự án bất thình lình không?

## Điều 7 – Beware the Share – Cẩn thận khi share code
Tác giả kể rằng khi vừa tốt nghiệp, anh này tham gia vào dự án tại công ty đầu tiên của mình. Anh đã rất háo hức muốn thể hiện bản thân, nên đã cố gắng áp dụng rất nhiều thứ mà mình đã học vào dự án. Những đoạn code dùng chung, anh cố gắng đưa vào các thư viện để có thể dễ dàng tái sử dụng. Anh đã tự tin rằng code của mình sẽ được đón nhận, nhưng sự thật phũ phàng là các đồng nghiệp lại không nghĩ thế. Anh đã rất bối rối không hiểu vì sao, việc “tái sử dụng code” đã được chứng minh là mang lại hiệu quả tốt cơ mà, từ những cuốn sách cho đến những lời khuyên của các lập trình viên lâu năm. Cuối cùng tác giả nhận ra là mình thiếu một thứ rất quan trọng: **Ngữ cảnh** (Context).

Hóa ra vào thời điểm đó, có 2 phần của hệ thống cùng xử lý một số tác vụ tương tự nhau, vì thế nên tác giả mới đưa ra nó thành “shared code”. Tuy nhiên, vì hành động đó, 2 phần này của hệ thống biến đổi từ việc không phụ thuộc lẫn nhau, thành phụ thuộc lên nhau. 2 phần này có thể sẽ còn được phát triển độc lập trong tương lai, nhưng tác giả đã vô trình trói buộc chúng lại với nhau. Và bất kì sự thay đổi/phát triển nào cũng đều phải cân nhắc cả 2 phía, đảm bảo cả 2 không bị lỗi. Chi phí duy trì hệ thống cũng vì thế mà tăng lên, bao gồm cả việc testing nữa.

Bằng việc giảm được một số lượng dòng code, tác giả đã làm tăng lên sự ràng buộc lẫn nhau của hệ thống (dependencies). Tuy nhiên, việc dùng chung code bản chất không phải là điều sai. Nếu sử dụng đúng ngữ cảnh, nó sẽ mang lại nhiều lợi ích to lớn. Còn không, chi phí sẽ bị tăng lên đáng kể mà bạn có thể sẽ không nhận ra ngay thời điểm đó.

Sau này, khi bạn có ý định muốn tách một phần nào đó ra để dùng chung, hãy cẩn thận. Cân nhắc **ngữ cảnh** của nó, xem có khả năng mở rộng trong tương lai không hay nó sẽ thành một gánh nặng cho bạn và mọi người.

## Điều 8 – The Boy Scout Rule – Quy tắc “Hướng đạo sinh”
Quy tắc “hướng đạo sinh” nói rằng: “Luôn luôn giữ cho khu cắm trại được sạch sẽ hơn thời điểm bạn đến”. Nếu bạn gặp rác ở nơi cắm trại, bạn nên dọn dẹp sạch sẽ mà không cần quan tâm ai đã xả rác nơi ấy. Bằng cách đó, bạn đã giúp cho những nhóm tiếp theo có được một môi trường cắm trại sạch sẽ.

Khi áp dụng vào công việc của chúng ta – một lập trình viên – hãy luôn giữ cho code của chúng ta được “sạch sẽ” khi bạn vô tình bắt gặp một đoạn code “không sạch sẽ”, mà không cần quan tâm đoạn code đó do ai viết trước đó. Nếu ai cũng có ý thức như vậy, dù chỉ là một lần refactor nhỏ thôi, tích cóp nhiều lần nhỏ như vậy lại thì ta sẽ được gì?

Hiển nhiên, code của chúng ta sẽ ngày một “sạch” hơn, tốt hơn. Và hơn thế nữa, các thành viên trong nhóm cũng sẽ có trách nhiệm hơn cho hệ thống/codebase chung của cả tập thể, chứ không phải chỉ chăm chăm lo cho mỗi code của mình mà mặc kệ code của người khác. Bạn không cần phải làm điều gì to tát. Chỉ cần một vài hành động đơn giản như đổi tên biến để nó rõ nghĩa hơn, tách một hàm ra thành 2 hàm nhỏ hơn…

Thật vậy, quy tắc này cũng giống như việc bạn rửa tay sạch sẽ khi rời khỏi nhà vệ sinh, hoặc không xả rác bừa bãi vậy. Chúng ta tuân thủ quy tắc này vì một cộng đồng chung, một đội nhóm làm việc chung. Chúng ta thể hiện sự quan tâm lẫn nhau, chứ không phải ích kỉ cho mỗi riêng mình.

## Điều 9 – Check Your Code First Before Looking to Blame Others – Tự xem lại code của mình trước khi muốn chê bai người khác
Chúng ta luôn có xu hướng nghĩ rằng code của mình không có lỗi. Có khi, lỗi nó xảy ra là do compiler bị lỗi cũng nên.

Trong thực tế, việc compiler bị lỗi khá hiếm (bao gồm cả interpreter, OS, app server, database, memory manager, và một số phần khác của hệ thống phần mềm). Chúng vẫn có bug, nhưng nó không thường xuyên như chúng ta nghĩ đâu. Tôi (tác giả) đã từng gặp một lỗi của compiler, và tôi đã nghĩ là nó sẽ còn lỗi nhiều lần nữa. Tuy nhiên tôi đã sai, sau nhiều lần lãng phí thời gian và công sức vô ích, hóa ra những lỗi đó đều do tôi.

Với những tool/library/framework đã được sử dụng rộng rãi, đã trưởng thành, thì chúng ta không cần phải nghi ngờ quá nhiều về chất lượng của chúng. Nhưng với những tool còn mới, chưa được kiểm định bởi phần đông cộng đồng, thì khả năng lỗi từ chúng cũng không phải nhỏ. Thường thì chúng sẽ là những mã nguồn mở, hay version 0.1, hay phiên bản alpha của chúng.

Hãy chấp nhận rằng bug đến từ complier khá hiếm, và tốt nhất bạn nên dành thời gian nhiều hơn để kiểm tra lại code của mình. Hãy cố gắng debug, test, truy vết, xem log, trao đổi vấn đề với đồng nghiệp, thử build trên một môi trường khác (debug và release)… Nếu ai đó báo bug cho bạn và bạn không thể tái hiện được, hãy tìm hiểu xem các bước họ làm là gì để xảy ra bug. Đôi khi chúng ta luôn giả định rằng user/tester sử dụng hệ thống rất giống với chúng ta (developer) sử dụng, nhưng thường thì ngược lại.

Vì thế, trước khi bạn định đổ lỗi cho compiler, ghi nhớ lời khuyên này của Sherlock Holmes: “một khi bạn đã loại bỏ những điều bất khả thi, thì những gì còn lại – dù khó tin đến đâu – cũng sẽ là sự thật”.

## Điều 10 – Choose Your Tools with Care – Lựa chọn tools một cách cẩn thận
Các ứng dụng hiện đại thường hiếm khi nào được xây dựng từ con số 0. Chúng được cấu thành từ nhiều tool khác nhau, ví dụ như các thư viện, framework… Một số lợi ích có thể kể đến như:

Khi ứng dụng của bạn ngày càng phát triển, ngày càng phức tạp hơn, thì thời gian dành cho lập trình viên để tập trung vào viết code nghiệp vụ (business code) sẽ hiệu quả hơn là tốn quá nhiều thời gian cho việc xây dựng các cơ sở hạ tầng.
Những thư viện/framework phổ biến thường sẽ có ít bug hơn nhiều so với các phần mềm tự xây dựng nội bộ. Ngoài ra cũng có rất nhiều phần mềm miễn phí nhưng chất lượng vẫn rất cao, giúp giảm thiểu chi phí phát triển, cũng như chi phí duy trì đáng kể.
Tuy nhiên, để chọn được những tool phù hợp cho dự án của bạn cũng không phải điều dễ dàng. Hãy cân nhắc những điều sau đây:

Các công cụ khác nhau có thể được xây dựng trên các ngữ cảnh khác nhau, ví dụ như về cơ sở hạ tầng, kiến trúc dữ liệu… Những điều này có thể khiến hệ thống của bạn có kiến trúc không khớp với các công cụ đó, và buộc bạn phải chỉnh sửa (hacks and workarounds) code của bạn cho phù hợp khiến độ phức tạp của nó tăng cao không cần thiết.
Các công cụ khác nhau sẽ có những vòng đời phát triển khác nhau. Công sức để nâng phiên bản (upgrade) các công cụ này cũng tốn không ít thời gian & công sức, có khi upgrade xong lại có thêm cả đống bug trong dự án của bạn. Hoặc các công cụ này xung đột với nhau, hoặc giao diện của chúng thay đổi (các UI component library chẳng hạn)… Càng phụ thuộc vào nhiều tool trong dự án của bạn, khả năng xảy ra điều đó càng cao.

Một số tool đòi hỏi việc cấu hình rất phức tạp, điều này cũng khiến việc duy trì và mở rộng khó khăn và thách thức hơn cho bạn rất nhiều.

Các điều khoản về bản quyền sản phẩm cũng rất quan trọng, dù cho chúng có miễn phí đi chăng nữa. Ví dụ ở một số công ty, việc sử dụng phầm mềm có GNU licence là không được phép, vì nó quy định rằng phần mềm của công ty sẽ phải được phân phối cùng với mã nguồn của các phần mềm đó.

Hướng tiếp cận của tôi là bắt đầu với những tool thật sự cần thiết cho dự án, và chỉ thêm khi thật sự cần thiết. Tôi cũng cố gắng tách biệt các tool này ra khỏi business code bằng cách sử dụng interface và layering. Bằng cách này, việc thay đổi tool sẽ dễ dàng hơn và tốn ít chi phí hơn. Mặt khác, dự án của bạn cũng sẽ ít ràng buộc vào các tool bên ngoài hơn, điều này giảm thiểu được các rủi ro và gánh nặng về sau.