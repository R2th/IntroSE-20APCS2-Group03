Đầu tiên hãy cùng nhìn qua 2 password dưới đây:
1. jK8v!ge4D
2. motconvitxoerahaicaicanh

Password nào bạn nghĩ sẽ khiến máy tính mất nhiều thời gian để hack hơn? Và cái nào bạn cho rằng dễ nhớ hơn?

Câu trả lời cho cả hai câu hỏi này đều là số 2. Và mặc dù điều này dường như là hiển nhiên nhưng mọi người vẫn được khuyến khích sử dụng một password có dạng như loại 1. Ngày nay người ta được dạy rằng phải sử dụng một password khó nhớ đối với con người, nhưng lại dễ dàng bị bẻ gãy bởi máy tính, mà chẳng vì lý do gì cả. Ngồi xuống và bàn luận về việc này một chút nào.

![](https://images.viblo.asia/028c505f-5b04-4d30-90c6-1a4890b927fd.png)

# Validation

Có nhiều thứ quái dị trong các quy chuẩn của internet. Và validation là một trong số đó. Nếu là một front-end developer, bạn sẽ không mong người dùng nhập những thứ không hợp lệ vào ô input của bạn. Sẽ có rất nhiều dạng input mà bạn cần validate, ví dụ như email, họ tên, địa chỉ, mã bưu điện,.. vân vân mây mây. Và nghĩa vụ của của một front-end developer là đảm bảo rằng người dùng không nhập bất cứ thứ gì độc hại hay không đúng định dạng vào những trường đó.

Validation được áp dụng vì một số lý do nhất định. Một trong số đó là vấn đề về security. Validation ngăn người dùng nhập những đoạn code đáng sợ vào trong ô input, chẳng hạn như xóa cơ sở dữ liệu hay thực hiện một hành động ác ý nào đó. Một lý do khác là buộc người dùng nhập vào một dạng dữ liệu nhất quán. Nếu một trường được coi là chỉ nhận vào dữ liệu dạng số, thì cơ sở dữ liệu rất có thể đang được set up cột đó chỉ chấp nhận đầu vào là số, điều này có nghĩa là bất kì ký tự nào không phải dạng số đều sẽ sinh ra lỗi.

Dù sao thì lý do chính, và thực sự của validation là giúp người dùng tránh gặp lỗi khi dùng ứng dụng.

# Định dạng mật khẩu

Vì một lý do nào đó, các developer đều hướng người dùng đến việc nhập vào một mật khẩu - theo quan niệm được coi là một mật khẩu tốt. Đó là nó phải chứa ít nhất 8 ký tự, bao gồm cả ký tự viết hoa và viết thường, ít nhất một chữ số, và nếu khó tính hơn nữa, thậm chí nó còn đòi một ký tự đặc việt, kiểu như dấu chấm than chẳng hạn.
![](https://images.viblo.asia/e1b6a02f-7a41-46b3-b742-e86ae786d409.png)
Đây là ví dụ về những gì được coi là một mật khẩu mạnh theo những yêu cầu trên:
> jK8v!ge4D

Ừ thì bỏ qua sự thật rằng bạn thường xuyên được đề nghị nhập một mật khẩu kiểu như thế này, nhưng công bằng mà nói thì bạn cũng sẽ đồng ý với mình rằng đây không phải là một mật khẩu tốt, thậm chí còn chẳng phải một mật khẩu mạnh.

Đầu tiên, làm thế quái nào bạn có thể nhớ được nó? Điều này dẫn đến người dùng không thế nhớ mật khẩu mà họ đã nhập và họ phải lưu nó vào một chỗ nào đó. Vừa tốn công sức vừa dễ bị lộ.

Thứ hai, người dùng sử dụng cùng một mật khẩu cho nhiều dịch vụ khác nhau, đơn giản là vì rất khó chịu khi phải nhớ một đống password phức tạp.

Khi bạn tạo một tài khoản trên một trang web, sẽ có một số magic code nằm ở đằng sau hậu trường sẽ chuyển password của bạn thành dạng *băm* (còn được gọi là mã hóa). Password của bạn sẽ trông thế này sau quá trình băm và lưu vào cơ sở dữ liệu:
>k5ka2p8bFuSmoVT1tzOyyuaREkkKBcCNqoDKzYiJL9RaE8yMnPgh2XzzF0NDrUhgrcLwg78xs1w5pJiypEdFX

Kể cả khi cơ sở dữ liệu của bạn bị hack, hacker cũng không dễ dàng chiếm quyền tài khoản của bạn vì không thể biết mật khẩu ban đầu. Tuy nhiên, hacker **hoàn toàn có thể** tìm ra mật khẩu ban đầu từ chuỗi băm nếu mật khẩu đủ phổ biến và thuật toán băm đủ đơn giản để phá. Tuy vậy một mật khẩu khá và được băm đúng cách vẫn khá là an toàn.

Vấn đề ở đây là không phải tất cả dịch vụ đều băm mật khẩu của người dùng. Nếu bạn sử dụng cùng một mật khẩu cho quá nhiều dịch vụ, sớm muộn bạn cũng sẽ đụng đến một dịch vụ được lập trình tệ mà lưu trực tiếp mật khẩu của bạn vào cơ sở dữ liệu mà không cần băm. Và nếu dịch vụ đó bị hack? Hacker đột nhiên sẽ có mật khẩu của tất cả tài khoản của bạn ở bất kì đâu bạn sử dụng mật khẩu đó. Điều này thực sự đáng sợ, và nó xảy ra rất thường xuyên, thường xuyên hơn bạn nghĩ đấy.

Đó là lý do tại sao bạn **PHẢI** sử dụng mật khẩu khác nhau cho các dịch vụ khác nhau. Tuy nhiên ngày nay người có hàng tá tài khoản trên hàng tá website. Làm thế nào để có thể nhớ tất cả từng password cho từng website? Một vài người sẽ sử dụng công cụ để lưu trữ password, nhưng không phải ai cũng làm điều đó.

# Mất bao lâu để bẻ khóa password?
![](https://images.viblo.asia/8873179a-b6ac-46dc-b6ab-9b0ebb23e029.jpg)

Hãy nhìn qua chuỗi mật khẩu sau đây: gtypohgt. Nó là chuỗi ngẫu nhiên 8 ký tự, tất cả đều viết thường. Nó chỉ mất một vài phút đối với máy tính hiện đại để brute force. Thay đi vài ký tự với vài con số, và bạn sẽ có một mật khẩu sẽ tốn đến hàng giờ để bẻ khóa (g9ypo3gt). Chuyển một vài ký tự thành viết hoa, và nó sẽ mất đến vài ngày để bẻ (g9YPo3gT). Và khi thêm chỉ một ký tự đặc biệt vào đó, và nó có thể mất đến hàng tháng (g9Y!o3gT).

g9Y!o3gT về mặt kỹ thuật là một mật khẩu tốt. Sẽ chẳng có ai có thể đoán nổi ra nó, nó không nằm trong danh sách các mật khẩu thông dụng, và máy tính sẽ mất một lượng lớn thời gian để bẻ khóa nó. Vấn đề duy nhất ở đây là password này khó nhớ đối với con người.

Giờ, nhìn qua đoạn này nào: motconvitxoerahaicaicanh. Đây là một chuỗi 24 ký tự, tất cả viết thường, không có số, không ngẫu nhiên, không trông "quái dị". Vâng, và máy tính cần hàng ngàn năm để bẻ khóa. Bạn thấy đấy, với mỗi ký tự bạn thêm vào, thời gian máy tính cần để bẻ khóa nó tăng lên rất nhiều. motconvitxoerahaicaicanh không nằm trong bất kì danh sách mật khẩu thông dụng nào, mà cũng sẽ chẳng có ai có thể đoán ra nó cả.

# Đấy mới là password mạnh
Bạn thấy đấy, một mật khẩu mạnh vừa có thể khiến máy tính bó tay khi cố gắng bẻ khóa vừa có thể khiến con người nhớ được nó dễ dàng. Đôi khi bạn chỉ cần gắn nó với một câu chuyện, nó sẽ trở nên dễ dàng hơn nhiều. Bạn cần mật khẩu cho Facebook? Bạn có thể thử: chiduoconlinefacebooktamtiengmotngay (chỉ được online facebook tám tiếng một ngày). Dễ nhớ đùng không, thậm chí khi bạn gõ mật khẩu này người ta đứng cạnh nhìn chắc cũng chả thèm đoán nữa là =)). Đấy là một ví dụ để bạn có thể tạo ra một mật khẩu của riêng bạn và chỉ riêng bạn biết.

Tuy nhiên có một vài website vẫn không cho phép bạn nhập những mật khẩu này. Chúng sẽ phàn nàn rằng bạn không chứa số, chứa ký tự viết hoa hay rằng nó quá dài, hoặc là vì một lý do nào đó chẳng liên quan đến kỹ thuật gì cả.

Khi đó bạn có thể ăn gian một chút bằng cách này. Bạn chỉ cần thêm A1! vào cuối mật khẩu của bạn, và mật khẩu đó sẽ được chấp nhận bởi bất kì hệ thống nào (trừ khi nó báo mật khẩu quá dài). Giờ bạn sẽ có một mật khẩu đủ ký tự viết hoa, viết thường, số và kí tự đặc biệt.

# Tổng kết
Mục đích của developer là tốt. Người dùng thì hay nhập password tệ.  Các nhà quản lý website thì không muốn dính vào scandal, vì vậy họ buộc người dùng nhập vào password theo ý họ, tuy nhiên lại khiến nó ngày càng cồng kềnh hơn.

Hãy nhớ điều này trong lần tới bạn tạo một password. Tạo một password khiến máy tính khó bẻ khóa và dễ nhớ đối với bạn - không phải ngược lại.

À, ngoài ra, nhớ tránh xa mấy cái mật khẩu kiểu 123456, password123 và qwerty. Chúng nằm trong top đầu những mật khẩu thông dụng nhất và dễ bị bẻ nhất đấy.

Source: https://towardsdatascience.com/why-password-validation-is-garbage-56e0d766c12e