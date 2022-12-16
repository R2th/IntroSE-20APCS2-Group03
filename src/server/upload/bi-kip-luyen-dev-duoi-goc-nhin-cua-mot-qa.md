*Nếu bạn hỏi bất kỳ một PM nào về team của họ, họ sẽ nói với bạn rằng QA và Dev cần phối hợp với nhau để đạt được kết quả tốt nhất có thể. Rằng chúng tôi gạt bỏ sự khác biệt của chúng tôi sang một bên để nhắm tới mục đích tối thượng là một phần mềm không có lỗi, xinh đẹp và sạch bong kin kít. Tuy nhiên, nếu bạn hỏi một QA bất kỳ cùng điều đó, họ sẽ nói với bạn rằng Devs là những cỗ máy láu cá đã đi quá xa trong thế giới Ma trận tới mức mà họ đã đạt đến sự hợp lý ở mức độ phi con người. Các Devs là kẻ ác vĩnh cửu đi lang thang trong đêm và đánh dấu các bug của chúng ta là "**Không thể tái hiện**" mặc dù chúng ta vừa chỉ cho họ cách tái hiện chúng từng bước một!*

*Mặt khác, nếu bạn hỏi các Dev điều tương tự, họ sẽ lẩm bẩm rằng QA là lũ khùng với mục đích duy nhất trong đời là phá hủy những đoạn code đẹp đẽ, quý giá của họ. Họ sẽ tuyên bố rằng chúng ta đang tưởng tượng ra các kịch bản phi thực tiễn và gần như lên cơn cực khoái mỗi khi phần mềm bị treo hay crash (thực ra chuyện này cũng không phải là không có).*

**Giữa sự cạnh tranh gay gắt của hai lực lượng này, làm thế nào để bạn đạt được sự cân bằng hài hòa, và quan trọng hơn, là làm thế nào để bạn đào tạo Dev của mình trở nên tử tế, mềm dẻo và giảm thiểu tối đa việc chửi bới quát tháo đối với bạn? Hãy đọc tiếp, tôi sẽ cố chia sẻ cho bạn cách làm việc đó. Trong suốt sự nghiệp QA không quá dài của mình, tôi đã trải nghiệm phần lớn thể loại Devs khác nhau và tôi đã dũng cảm thuần hóa hầu hết trong số họ.**

![](https://images.viblo.asia/5f331159-0c2c-4022-b752-37bf11735aca.jpg)

Hãy ngó qua 5 quy tắc thuần hóa Dev của tôi:

### 1. Dạy con từ thuở còn thơ, dạy vợ từ thuở bơ vơ mới về. 
Như thường lệ, các Devs có ý nghĩ rằng họ biết tất cả mọi thứ và họ đứng đầu chuỗi thức ăn trong việc phát triển phần mềm. Tôi đã gặp trường hợp các Senior devs ném thiết bị cho tôi và ngạo nghễ nói "Thách kẹo tìm ra bug đấy!". Hãy kìm hãm sự thôi thúc quăng thiết bị vào mặt họ. Thay vào đó, hãy đọc quy tắc số 2.

### 2. Hãy test như là bạn được trả 50k cho mỗi bug vậy. 
Hãy tò mò, bướng bỉnh và rất, rất kiên trì. Mọi tính năng đều có lỗi! Việc của bạn là tìm ra chúng và gáy thật to mỗi khi bắt được bất kỳ bug nào. Hãy cho Dev thấy rằng họ còn non và xanh lắm, đừng hòng qua mặt bạn! Chỉ bằng cách làm cho họ tâm phục khẩu phục thì họ mới bớt kiêu căng và chịu hợp tác.

### 3. Đừng chỉ đâm đầu vào report những lỗi hiển thị lặt vặt! 
Nếu tất cả những gì bạn đóng góp cho dự án là mấy chỗ nhòe màu, chồng chéo, thiếu pixel và cải tiến UI vớ vẩn, thì có lẽ bạn nên chuyển qua làm biên tập viên hoặc giám định tử thi thì hơn! Dù tôi biết chúng ta đều rất khoái cười nhạo người khác về mấy lỗi chính tả, nhưng tôi cũng muốn phá hủy hoàn toàn công trình của tụi Dev cơ. Tôi muốn cho họ thấy rằng tôi không chỉ là một Kẻ chuyên săm soi vặt vãnh. Đôi khi bạn phải cất kính hiển vi đi và cầm búa lên để đập thì mới biết là gạch vữa có bền chắc hay không. Nếu bạn cứ làm phiền tụi Devs hoài với mấy lỗi vớ vẩn kiểu đó, họ sẽ cảm thấy khó chịu cực kì và cảm thấy như bạn đang lãng phí tiềm năng của họ. Hãy thách thức họ bằng cách tìm ra những lỗi phức tạp và khó nhằn, chỉ ra một kịch bản mà họ đã hoàn toàn không nghĩ tới. Hãy chứng tỏ bản thân có giá trị và họ sẽ tin tưởng chia sẻ với bạn từng dòng code.

### 4. Hãy thiết lập tầm ảnh hưởng của bạn đối với các Dev junior. 
Tụi Dev non tay trẻ tuổi cực đáng yêu khi làm việc. Tụi nó thiếu kinh nghiệm và có chút không chắc chắn về các kỹ năng của mình. Khi báo cáo bug với họ, họ thường hỏi tôi rằng tôi muốn xử lý vấn đề như thế nào. Lúc đầu tôi hơi căng thẳng, vì tôi nghĩ rằng đây là công việc của một kiến trúc sư giải pháp hoặc người quản lý dự án nhưng sau đó tôi bắt đầu đưa ra quyết định. Hãy tự tin và nghe theo tiếng nói trong bạn. Không cần phải là một QA thì bạn cũng đã thấy qua rất nhiều phần mềm và ngay cả khi bạn không nhận ra điều đó, bạn cũng đã rất giỏi trong việc giải thích Hành vi được mong đợi sẽ như thế nào. Bạn đã luôn có những tiêu chí chấp nhận như người dùng cuối, bạn đã viết các trường hợp kiểm thử, do đó bạn hoàn toàn có thể nói cho họ bạn muốn mọi thứ trông như thế nào. Tất nhiên bạn cũng nên biết khi câu hỏi vượt quá kiến thức của bạn và tham khảo ý kiến của người khác nếu bạn còn không chắc chắn.

### 5. Hãy làm cho mình trở nên cần thiết và đáng tin cậy! 
Lời khen lớn nhất đối với tôi là khi nhà phát triển từ chối phát hành một tính năng mà tôi chưa kiểm thử trước. Bạn nên thiết lập sự tin tưởng rằng bạn luôn ở đằng sau chống lưng ch họ. Đúng thế, dù bán đã rú lên sung sướng khi tìm thấy bug nhưng đồng thời, bạn cũng là phao cứu hộ của họ trong trường hợp họ mắc lỗi hoặc quên kịch bản người dùng. Bạn đạt được điều này bằng cách cực kỳ tò mò, rất sáng tạo và năng động với công việc kiểm thử của mình. Tôi đã phát hiện ra rằng các lập trình viên thường là những sinh vật rất logic và họ tuân theo các quy tắc nghiêm ngặt tới mức mù quáng. Bạn nên là người thay đổi cái tôi cao ngạo của họ. Hãy suy nghĩ theo cách mà họ không bao giờ ngờ tới để có thể đưa ra những kịch bản kiểm thử hiệu quả.


*Hy vọng tất cả những điều trên là hữu ích, giúp bạn đạt được sự tôn trọng và hiểu biết lẫn nhau. Một khi bạn thuần hóa và khiến Devs tin tưởng bạn, họ có thể là những người bạn và đồng nghiệp đáng yêu và trung thành, sẵn sàng giúp đỡ bạn mọi thứ!*

**Một mẹo nhỏ khác, trong trường hợp tất cả các lời khuyên trên của tôi đều thất bại, là hãy mời họ đi uống bia và tán phét đến lúc say mèm. Nếu không thể đánh bại họ thì ít nhất hãy làm bạn với họ!**