Môn cờ tướng có một thể loại bài học mở đầu rất hay, gọi là "**Kỳ đạo**", đại ý cũng như "Tiên học lễ - Hậu học văn" - trước khi học đánh cờ thì ông phải học về **đạo cờ** trước đã. 

Ước gì trong mọi môn học, đều bắt học món "đạo" trước giống như cờ tướng vậy. Chẳng hạn như trong lập trình thì ông phải học "**Code đạo**" trước (đừng nhầm với ĐẠO CODE nhé :)), rồi bắt đầu mới được học C/C++, Java, Go, PHP, v.v...

Vậy nếu có món "**Code đạo**" thì nó sẽ dạy cái gì? Dưới đây tại hạ xin mạn phép bàn về một số "đạo" đã chiêm nghiệm và rút ra được, hi vọng cao nhân đi qua để lại vài lời bình cho tại hạ được thông tỏ thêm.


## Đạo 1: Trình càng cao, tâm phải càng tĩnh
![](https://images.viblo.asia/6b36afba-5b47-4539-a95d-3ce65e981ac1.jpg)

Nhớ lại hồi trước ngâm cứu cờ tướng có đọc một sách về "kỳ đạo", có một đoạn tại hạ thấy rất tâm đắc, ngụ ý thế này:

"Người đánh cờ phải luyện cho tâm thật tĩnh, đánh với người trên cơ thì không run sợ, đánh với kẻ yếu hơn thì không khinh thường". Lại có đoạn bàn về một cao thủ đánh cờ đã đạt đến cảnh giới cao nhất của "kỳ đạo" thì từ đầu tới cuối cuộc cờ người đó không nói một tiếng nào, thắng cũng như thua, lúc nào tâm thế cũng rất điềm tĩnh. Đó mới là cảnh giới cao nhất của cờ. Khi đánh cờ, họ quên hết mọi thứ xung quanh, tâm đã hoàn toàn thoát tục.

Dạo qua 1 vòng vào mấy diễn đàn lập trình thấy ngán vô cùng, những kẻ có chút kinh nghiệm khi gặp các câu hỏi của mấy cháu sinh viên đều nhao nhao vào chửi "ngu thế; cái đó mà cũng không biết; Hỏi thế cũng hỏi; Hỏi ngu như bò; Đơn giản chỉ cần thế này mà cũng không làm được; v.v..."

Hãy học cách mà người Tây họ giao tiếp trên các kênh "Stackoverflow", "Github", "Reddit", "Quora", ... Họ luôn điềm đạm trong mọi vấn đề, rất ít chửi mắng. Cơ bản là đóng góp ý kiến để khiến mọi thứ tốt hơn, chứ không tìm cách để biến nó tiêu cực hơn. Hãy nhớ rằng, trước khi biết ăn cơm thì có thể vài trong số chúng ta cũng đã từng bốc sit ăn. Vấn đề nào cũng khó, cũng dễ - khó với người mới và dễ với người đã gặp rồi, lập trình cũng thế thôi.

Nhớ rằng: “Cao nhân thực sự trong thế gian chính là người hiểu được những lúc có thể thắng mà không nhất định cần phải thắng, có tấm lòng khiêm nhường trước người khác.”

Thông được đạo này, chẳng những chúng ta có thể tiến xa trong lĩnh vực lập trình, mà trong mọi lĩnh vực của cuộc sống chúng ta rồi sẽ đạt được thành tựu thôi, không sớm thì muộn.

## Đạo 2: Không tỉ mỉ, đừng lập trình

> *"Mấy ông code ẩu chỉ viết ra toàn sit thôi, toàn làm khổ người đi dọn sit, ..."*

Trước đây khi đụng đến một vấn đề đơn giản, tại hạ thường chỉ code chứ không suy nghĩ gì nhiều, vì cảm thấy vấn đề đó nó quá phổ thông rồi, nhưng khi nghiên cứu về cách CODE của team Facebook thì tại hạ quả thực rất nể phục họ.

Các hạ có thể xem lại [**bài viết này**](https://www.facebook.com/groups/reactjs.vn/permalink/3364259927021258) của tại hạ để thấy được sự tỉ mỉ của họ. Tại hạ xin trích lại bài viết này để các vị huynh đài đây thấy rõ hơn:

Skeleton (hay loading placeholder, spinner, .....) là một component để biểu thị cho người dùng biết rằng dữ liệu đang được load và chưa sẵn sàng để hiển thị. Nếu không có Skeleton, người dùng sẽ không biết được website đang làm cái quái gì mà trống trơn vậy?. Đơn giản chỉ có thế.

Đối với hầu hết chúng ta, việc xử lý 1 cái Skeleton cho component chỉ là một công việc phụ. Nhưng với team Facebook thì họ rất chú ý đến trải nghiệm người dùng. Dưới đây là cách mà Skeleton hiển thị:

Trong 1 giây đầu tiên, Skeleton hiển thị với opacity = 0.25 cố định, không có hiệu ứng gì cả. Từ giây thứ 2 trở đi, Skeleton kiển thị với hiệu ứng nhấp nháy và trông rõ hơn (opacity được animation từ 0.25 đến 1).

Tại sao lại phải tách ra thành 2 giai đoạn như vậy?

Chúng ta biết rằng theo nguyên lý "Ngưỡng Doherty": khoảng thời gian phản hồi một thao tác hay mệnh lệnh nào đó từ người dùng nên xấp xỉ vào khoảng 400ms. Trong trường hợp này có nghĩa là người ta mong muốn dữ liệu load xong trong 0.4s và sau đó render ra cho họ thấy. Nhưng vì nhiều lý do nên con số 0.4s này sẽ không đạt ở nhiều nơi và vì vậy người dùng sẽ phải chờ "một lúc".

Nhưng trong lúc chờ đợi, người dùng hoàn toàn không muốn nhìn thấy một mớ Skeleton cứ nhấp nháy tùm lum trên trang như vậy. Vì vậy team Facebook đã quyết định trong 1 giây đầu tiên, người dùng sẽ chỉ nhìn thấy Skeleton rất mờ, và hoàn toàn không nhấp nháy.

Việc lựa chọn con số 1 giây theo mình cũng không phải là cảm tính, chắc chắn họ đã đo lường tốc độ tải đối với tất cả người dùng của họ và mới đưa ra con số này. Khi làm như vậy, họ kỳ vọng rằng với hầu hết người dùng thì dữ liệu đều đã load xong trong giây đầu rồi. Ai "không may mắn" mới phải nhìn thấy cái hiệu ứng nhấp nháy đó thôi.

Chúng ta có thể dùng cụm từ "Lập trình viên có tâm" để nói về một lập trình viên tỉ mỉ, mình nghĩ rằng nếu không tỉ mỉ thì không bao giờ có thể trở thành lập trình viên giỏi được. Cứ tàng tàng vậy thôi.


## Đạo 3: Đẻ con thì dễ, nuôi dạy nó thành tài mới khó

"Có thể chỉ mất 30 phút để viết ra một cái gì đó, nhưng để làm cho nó tốt thật sự thì phải mất hàng năm".

Viết một component thì dễ thôi, để làm cho nó tốt hơn từng ngày và hết lỗi thì cần phải coi nó như con đẻ của mình, thỉnh thoảng phải ngó tới nó. Phương châm của mình là "Keep them in eyes" - luôn giữ các components của mình trong tầm mắt, bắt bệnh nó thường xuyên để bốc thuốc kịp thời.

Cứ viết rồi tối ưu, tối ưu, tối ưu, .... Không được dừng lại, bời vì dừng lại là sẽ chết!

Mấu chốt của vấn đề này là ta phải đo lường được thứ mà mình đã viết ra, liệu lúc nó xảy ra lỗi ở phía người dùng thì chúng ta có biết không? Dưới đây là một phương pháp mà tại hạ đã học được từ team Facebook:

1. Bao (Wrapper) component trong 1 component cha để handle lỗi, tránh khi xảy ra lỗi thì người dùng nhìn thấy màn hình trắng.
2. Bắn lỗi về server theo nhiều cấp độ, ưu tiên những lỗi nghiêm trọng để xử lý trước, những lỗi nhẹ hơn thì xử sau
3. Vẫn là sự tỉ mỉ khi viết, phải cố gắng lường trước các trường hợp có thể xảy ra, đừng code ẩu.

Đạo này cũng không dễ mà đạt được, có lẽ tại hạ và các huynh đài sẽ phải phấn đấu dài, có khi là cả kiếp này.

## Đạo 4: Cái nào quan trọng ưu tiên trước, còn lại để sau

Trước đây, tại hạ luôn quan niệm khi code một thứ gì phải viết cho nó thật chuẩn chỉ luôn. Dẫn đến tình trạng là có nhiều thứ nhỏ nhưng ngốn rất nhiều thời gian. Từ lúc xem một video của Facebook về F8 (tại hạ không nhớ link), đại khái trong đó nói rằng: "Chúng tôi ưu tiên đầu tiên là tốc độ ra mắt sản phẩm, tiếp theo chúng tôi sẽ migration dần dần những thứ trong đống code...". Khi sắm vai một người làm Business, tại hạ lại càng thấm thía đạo lý này.

Nhiều lúc đang code, chợt phát hiện ra một thứ hay ho muốn thay đổi, cay đắng là nó sẽ dẫn đến phải sửa rất nhiều chỗ trong đống code. Lại phải đập đi xây lại khá nhiều thứ, mất thêm nhiều thời gian.

Chấp nhận phần mềm chạy chậm hơn một chút, nhưng ra mắt sớm (A), hay là chạy nhanh hơn một chút nhưng lại ra mắt muộn hơn (B), điều đó không phải do chúng ta quyết định. Với lập trình viên thì lúc nào cũng chọn (B), nhưng các "sếp" thì lúc nào cũng là (A).

Đương nhiên cũng không được vì thế mà cứ code bừa cho có bài nộp. Vẫn là phải chiếu theo "Đạo 2" và "Đạo 5" mà làm, thứ gì quan trọng thì vẫn phải làm tỉ mỉ, có chậm vẫn phải chịu.

## Đạo 5: Chưa đủ đam mê, khó giỏi lập trình

Đam mê lập trình, là chìm đắm trong code, quên ăn, quên ngủ là chuyện thường. Tìm hiểu một vấn đề thì cố gắng dành tâm huyết vào đó, đào sâu gốc rễ cho tường tận. 

Nếu so sánh một cách hàn lâm thì họ cũng giống như người làm khoa học nghiêm túc. Nhưng, người như vậy thì khó gặp lắm. Người mà chúng ta gặp hằng ngày, thường là rất hời hợt, dường như thứ gì cũng biết nhưng cuối cùng chẳng có cái gì biết sâu cả. Vì thế nên đụng đến vấn đề nào cũng loay hoay mãi, rồi thì cũng ra sản phẩm nhưng tóm lại là cũng chẳng nên cơm cháo gì.

Cũng không phải là xấu, đương nhiên lúc nào cũng tồn tại 2 kiểu lập trình viên như vậy, và chọn vào nhóm nào là quyết định ở chúng ta.

## Đạo 6: Cho đi để nhận lại nhiều hơn

Đừng bao giờ vỗ ngực tực đắc về code của mình, hãy để cộng đồng đánh giá nó. Chúng ta không thể khẳng định code của mình tốt nếu trong đời chưa public một dự án opensource nào....

Hãy chia sẻ nhiều nhất có thể, thứ gì mà các hạ nghĩ là hay nhất của mình, hãy chia sẻ nó đi, opensource nó đi, đừng ngại, đừng tiếc, đừng sợ gì cả.

Có rất nhiều thứ mà chúng ta sẽ học được khi tham gia những dự án opensource, hoặc từ những dự án opensource của chính mình. Đôi khi có những lỗi ta không nhìn ra, nhưng người khác có thể nhìn ra được.

## Kết
Đây chỉ là 6 đạo mà tại hạ nghĩ là quan trọng nhất với người học lập trình, nếu các hạ thấy không ưng chỗ nào, hãy chỉ cho tại hạ dưới phần comment, hay nếu các hạ thấy thiếu đạo nào, có thể vạch ra cho tại hạ bổ sung để bài viết được tốt hơn nhé!

Xin cảm tạ vì đã đọc đến đây!