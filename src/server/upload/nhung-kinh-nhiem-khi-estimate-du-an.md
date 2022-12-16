Estimate là gì? Estimate là việc đưa ra một con số effort với ý nghĩa "Bạn làm task ABC đó trong khoảng thời gian bao lâu".
Thông thường đơn vị estimate được tính bằng giờ (hour).
Bài viết này mình sẽ giới thiệu những kinh nghiệm và hiểu biết của bản thân về việc estimate trong dự án.

## Đầu tiên, Estimate có cần phải chính xác hay không?
Ngày xưa mới ra trường đi làm kiểu không biết gì nên mình cũng băn khoăn về điều này khi nghe người này người kia.
Có người bảo, estimate chỉ là con số "khoảng bao nhiêu" thôi; tức là nó ko yêu cầu độ chính xác hoàn toàn, có khả năng sai khác khi làm task thực tế.
Có người lại bảo rằng đã estimate làm tới bao giờ  xong thì phải đảm bảo được deadline đó. 

Vậy ai đúng?
Theo mình, ai đúng thì phải xét hoàn cảnh. Cụ thể sẽ xem xét theo 2 tiêu chí sau:
1. Khách hàng của bạn là ai?

Mình chưa làm với khách hàng Âu Mỹ bao giờ, nhưng nghe nói khi làm với bên Âu Mỹ thì việc con số estimate khác với thực tế làm việc là bình thường. 
Miễn đừng sai khác quá nhiều, ví dụ lệch 1,2 ngày thì không sao.

Mình chỉ làm với khách hàng Nhật thôi. Và đối với người Nhật một khi bạn đã estimate với người ta sẽ làm task đó trong 1 ngày mà không hoàn thành được đúng 1 ngày thì không thể chỉ đơn giản nói "ta làm không kịp, cho ta thêm 1 ngày nữa nhé".
Đối với người Nhật, khi thực tế làm trễ hơn estimate bạn có trách nhiệm giải thích lý do vì sao lại bị trễ hơn và chính xác khi nào sẽ hoàn thành được task đó. Nếu không giải thích được những điều đó bạn sẽ đánh mất đi niềm tin với khách hàng.

2. Thông  tin bạn nắm khi tiến hành estimate có những gì?

Tùy vào những thông tin mà khách hàng cung cấp, bản estimate được chia làm 2 loại:

**Estimate khái quát**

Thông thường Estimate khái quát được thực hiện ở giai đoạn đầu dự án. Tức là estimate để nhận dự án.
Ở giai đoạn đầu dự án thông thường chưa có spec cụ thể mà khách hàng chỉ đưa ra ra được ý tưởng họ muốn làm.

Tuy nhiên việc estimate thì phải dựa vào spec, dựa vào kỹ thuật thì mới thực hiện được. Vậy trường hợp này bạn phải làm thế nào?
Bạn sẽ tự đưa ra một bản đề án với khác hàng và bảo rằng "Với cách làm như bản đề án thì tôi đưa con số effort là abc...xyz. Nếu sau này thay đổi cách làm thì sẽ thực hiện estimate lại."

Khi estimate khái quát có những lưu ý sau:
- Thông thường estimate khái quát ở giai đoạn nhận dự án thì chỉ có dev estimate và sẽ áp dụng công thức riêng để tính ra effort của các team khác.
- Estimate khái quát khi đã nhận được dự án nhưng mới chỉ có ý tưởng chứ chưa có spec thì thường tất cả các team sẽ cùng estimate
- Sau khi estimate khái quát sẽ thực hiện estimate chính xác lại khi có Design cụ thể


**Estimate chính xác**

Estimate chính xác được thực hiện khi đã nhận được spec rõ ràng.
Sau khi đã estimate chính xác thì bạn phải có trách nhiệm đảm bảo thực tế đúng với con số mình đã estimate.
Nếu thực tế sai khác thì hoặc là  phải cắng răng OT để đảm bảo cho kịp, hoặc là đi quỳ gối năn nỉ khách hàng cho thêm người. :))
Nhưng phần lớn một khi đã đưa bản estimate chính xác thì nếu có sai lệch thì phải tự chịu, ít khi đi xin khách tăng người (chỉ chấp nhận quỳ gối khi thực sự lệch quá nhiều thôi. Vì nó còn ảnh hưởng đến niềm tin của khách hàng nữa)

## Vậy, vì sao đã gọi là estimate rồi mà phải đảm bảo cho đúng thực tế?
Bởi vì khách hàng sẽ dựa trên con số estimate ấy để chuẩn bị tài chính, kế hoạch bussiness, kế hoạch release,...
Nếu chỉ có  2 bên làm việc với nhau thì còn dễ, giả sử khách hàng của chúng ta cũng chỉ là bên đi thuê (tức là không phải end client) thì sẽ dẫn đến hệ lụy quan trọng hơn khi tất cả các bên đều bị ảnh hưởng.
Bạn thử nghĩ xem, nếu khách hàng dựa trên estimate của bạn và tung ra quảng cáo ngày abc..xyz sẽ ra mắt sản phẩm nhưng rồi bạn lại báo là làm không kịp thì tổn thất sẽ là bao nhiêu?

## Estimate do ai thực hiện và ai sẽ kiểm tra lại?
Thường thì team lead sẽ đại diện cả team để thực hiện estimate. Tuy nhiên con số effort đưa ra phải đúng với năng lực của  member trong team (hay người làm task).
Nếu team lead estimate theo năng lực của bản thân sẽ dẫn đến tình  trạng thực tế bị trễ hơn estimate do member năng lực thấp hơn, làm task chậm hơn, nhiều bug hơn,..

Sau khi team lead hoàn thành estimate thì người hiểu rõ dự án nhất có trách nhiệm kiểm tra lại. Thường thì là BRSE sẽ giữ vai trò này.
BRSE sẽ kiểm tra xem con số estimate có đang bị nhiều hơn hoặc ít hơn hay không dựa vào sự hiểu biết của mình đối với spec. 

Cuối cùng con số effort tổng sẽ được chuyển đổi thành đơn vị man month để báo cáo cho khách khàng


Hy vọng những kinh nghiệm của mình có thể giúp ích cho các ba