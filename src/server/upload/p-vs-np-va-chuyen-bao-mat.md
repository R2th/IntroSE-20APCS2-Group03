> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/10/20/p-vs-np-va-chuyen-bao-mat.html (đã xin phép tác giả :D)

Nhiều người nó "P vs. NP" là vấn đề lý thuyết **quan trọng nhất** của đời đại.  Trong bài viết này, chúng ta sẽ tìm hiểu nó là thế nào, quan trọng ra sao, cũng như vai trò quan trọng của nó trong một lĩnh vực cũng rất quan trọng hiện nay: bảo mật.

# P vs. NP

P vs. NP (có thể được viết là `P \= NP`) là một bài toán chưa được giải trong toán học cũng như khoa học máy tính.  Đây là một trong [7 bài toán thiên niên kỷ](https://www.claymath.org/millennium-problems) được viện toán học Clay chọn ra.  Bất cứ bài toán nào trong số 7 bài toán này đều có giải thưởng `$1,000,000` cho người đầu tiên giải được.

Bài toán P vs. NP (Polynomial versus Nondeterministic Polynomial) là một bài toán được đưa ra bởi [Leonid Levin và Stephen Cook](https://www.cs.toronto.edu/~sacook/homepage/1971.pdf) vào năm 1971.  Nói một cách đơn giản, bài toán này là câu hỏi: với bất cứ vấn đề nào mà lời giải của nó được kiểm chứng một cách nhanh chóng, liệu chúng ta có thể tìm ra lời giải đó một cách nhanh chóng được hay không?

"Nhanh chóng" ở đây được hiểu là có thể hoàn thành trong thời gian đa thức.  Thời gian đa thức cũng là một khái niệm phức tạp của toán học và khoa học máy tính, có liên quan đến độ phức tạp của thuật toán. Một thuật toán được gọi là hoàn thành trong thời gian đa thức, nếu số bước thực thi của thuật toán đó cho tới khi tìm ra lời giải là `O(n^k)` với `k > 0`, trong đó `n` là độ phức tạp của đề bài.

Các phép toán cơ bản cộng trừ nhân chia, luỹ thừa, logarithm đều được thực hiện trong thời gian đa thức.  Những thuật toán thực thi trong thời gian đa thức được coi là thực thi nhanh chóng, vì khi độ phức tạp đầu vào tăng lên, thời gian để tìm ra lời giải cũng tăng lên, nhưng tăng từ từ.

Ngược lại, một số thuật toán không hoàn thành trong thời gian đa thức là hoàn thành chậm.  Ví dụ một thuật toán hoàn thành trong thời gian hàm mũ chẳng hạn `O(3^n)`, thì khi đầu vào phức tạp hơn, thời gian để tìm ra lời giải sẽ tăng rất nhanh.  Với trường hợp trên, nếu `n` tăng gấp đôi thì thời gian sẽ tăng gấp 9 lần, nếu `n` tăng gấp 4 thì thời gian sẽ tăng gấp 81 lần, `n` tăng gấp 8 thì thời gian sẽ tăng gấp 6561 lần, v.v...  Một tốc độ tăng rất khủng khiếp.

Quay trở lại với bài toán P vs. NP.  `P` là tập hợp các bài toán mà lời giải của nó có thể được tìm ra trong thời gian đa thức, còn `NP` là tập hợp các bài toán mà lời giải có thể được kiểm tra trong thời gian đa thức.

Xét một ví dụ về bài toán `NP` như sau:

Cho một tập hợp các số nguyên, yêu cầu tìm ra một tập con khác rỗng có tổng bằng `0`.  Ví dụ với đầu vào là `{-2, -3, 14, 15, 7, -10}` chúng ta có một lời giải là `{-2, -3, -10, 15}`.  Đây là một bài toán mà lời giải của nó rất dễ kiểm chứng (chỉ cần cộng các số đó lại với nhau), nhưng lời giải đó lại không dễ dàng tìm ra được.  Ít nhất là hiện nay chưa có một thuật toán nào có thể tìm ra lời giải bài toán này trong thời gian đa thức.  Thuật toán đơn giản nhất để tìm ra lời giải là thử tất cả các tập con của đầu vào, nhưng thuật toán này có thời gian hoàn thành là hàm mũ.

Câu hỏi đặt ra liệu có tồn tại một thuật toán tìm ra lời giải bài toán này trong thời gian đa thức hay không?  Đó cũng là vấn đề lớn nhất của bài toán P vs. NP, mối quan hệ của `P` và `NP` thực sự là gì.  Đương nhiên là `P` và `NP` có giao nhau, tức là có những bài toán vừa nhanh chóng kiểm chứng được lời giải, vừa nhanh chóng tìm ra được lời giải đó.

Nếu `P = NP` có nghĩa là tất cả các bài toán trong `NP`, bao gồm bài toán tổng tập con ở trên, đều có thể được giải trong thời gian đa thức (dù chưa tìm ra thuật toán nhưng về lý thuyết là có tồn tại).  Nếu `P ≠ NP` thì nhiều bài toán trong `NP`, dù lời giải rất dễ kiểm chứng thì có nhiều bài toán trong `NP` có lời giải có thể kiểm chứng được trong thời gian đa thức nhưng không thể tìm ra một lời giải như vậy trong thời gian đa thức.

Mối quan hệ của `P` và `NP` đã được đặt ra bởi [Godel vào năm 1956](https://rjlipton.wordpress.com/the-gdel-letter/) trong một bức thư gửi Von Neumann.  Nhưng bài toán mới được chú ý vào năm 1971, khi Cook và Levin chứng minh được rằng, trong `NP` có những bài toán gọi là NP-complete (bài toán NP đầy đủ).  Đây là bài toán khó nhất trong số các bài toán `NP`, mọi bài toán khác thuộc `NP` đều có thể đưa về bài toán NP-complete trong thời gian đa thức.

Chỉ cần một bài toán NP-complete có thể giải được trong thời gian đa thức, thì mọi bài toán `NP` cũng sẽ giải được trong thời gian đa thức, khi đó `P = NP`.  Nhưng đáng tiếc, hiện nay thuật toán để giải các bài toán này vẫn chưa có (và cũng chưa biết là nó có tồn tại hay không).

Vì vậy, hiện tại, bài toán P vs. NP có thể có những hướng sau:

- `P = NP` và một lúc nào đó sẽ có người chứng minh điều này.
- `P ≠ NP` và một lúc nào đó sẽ có người chứng minh điều này.
- `P ≠ NP` nhưng sẽ không bao giờ có ai chứng minh được (hình dung rằng bài toán chứng minh `P ≠ NP` cũng là một bài toán NP, nếu có lời giải thì có thể kiểm chứng nhanh chóng, nhưng tìm ra lời giải thì đời này qua đời khác).
- `P = NP` nhưng sẽ không bao giờ có người chứng minh được điều này.
- Vấn đề P vs. NP sẽ mãi mãi không có lời giải, tức là không thể chứng minh được mối quan hệ giữa hai tập hợp này.

# P vs. NP và vấn đề bảo mật

Vậy bài toán thiên niên kỷ P vs. NP có liên quan gì đến bảo mật.  Mối liên quan ở đây là cực kỳ mật thiết.

Mọi vấn đề bảo mật hiện nay đều liên quan đến mã hoá.  Và các hệ mã hoá hiện này đều được xây dựng dựa trên **niềm tin** rằng `P ≠ NP`. Niềm tin này cũng giống như toàn bộ các kiến thức hình học đều dựa trên niềm tin vào tiên đề Euclid vậy.  Thậm chí niềm tin vào tiên đề Euclid có phần mù quáng hơn do nó đã được chứng minh là không thể chứng minh được.

Trong khi `P ≠ NP` là một điều chưa được chứng minh, nhưng cũng chưa bị phủ nhận.  Các bài toán `NP` hiện nay đều yêu cầu một thuật toán phức tạp để tìm ra lời giải, có những bài toán phải mất hàng tỉ năm mới tìm ra được lời giải.

Một ví dụ cụ thể chính là [hệ mã hoá RSA](https://manhhomienbienthuy.bitbucket.io/2017/Feb/20/rsa-cryptosystem-and-digital-signature.html).  Mức độ bảo mật của hệ mã hoá này phụ thuộc vào độ khó của bài toán: phân tích một số nguyên thành các nhân tử.  Đây là một bài toán `NP` do kết quả của nó rất dễ dàng để kiểm chứng (nhân các nhân tử lại với nhau), nhưng việc tìm ra các nhân tử đó không hề dễ dàng một chút nào.

Về mặt thực tiễn, hiện tại chưa có một thuật toán hiệu quả nào có thể phân tích mọi số nguyên thành nhân tử trong thời gian đa thức.  Về mặt lý thuyết, một thuật toán như vậy chưa được chứng minh là có tồn tại hay không.  Và niềm tin rằng nó không tồn tại chính là cơ sở để tin rằng, hệ mã hoá RSA vẫn an toàn.

Vào thời điểm hiện tại, mọi cố gắng để giải bài toán này cũng chưa có một kết quả khả quan.  Một nỗ lực của nhóm [các nhà khoa học vào năm 2009](https://eprint.iacr.org/2010/006.pdf), nhằm phân tích thành nhân tử một số của 232 chữ số (số RSA-768) cũng mất tới hai năm dù đã sử dụng hàng trăm máy tính.  Một số RSA-1024 được dự đoán sẽ mất hàng nghìn năm để phân tích.  Nhiều hệ thống hiện này còn sử dụng RSA-2048 trong mã hoá, khiến nó gần như không thể bị phá vỡ với công nghệ hiện tại.

Không chỉ riêng RSA, hầu như mọi hệ mã hoá đều đang an toàn bởi "niềm tin" rằng `P ≠ NP`, tức là phải mất nhiều năm để giải mã, nếu dùng một khoá đủ mạnh.  Thế nhưng nếu chứng minh được `P = NP` thì mọi thứ sẽ sụp đổ, nhưng thứ được tin là an toàn, sẽ không còn an toàn nữa.

Không chỉ có các hệ mã hóa mất an toàn, rất nhiều khía cạnh của công nghệ hiện đại cũng sụp đổ.  Bitcoin, Etherium, blockchain, những công nghệ rất hot hiện nay cũng sẽ sụp đổ nếu `P = NP`.

# Nếu `P = NP` thì mức độ an toàn sẽ kém đến mức nào?

Thật may mắn là dù chứng minh được `P = NP` thì mọi thứ cũng không đến nổi quá tệ.  Như đã nói ở trên, "nhanh chóng" hay "thời gian đa thức" là những khái niệm phức tạp trong toán học.  Nếu một nhà toán học nói rằng, hệ mã hoá RSA có thể được phá vỡ một cách nhanh chóng, thì nhiều khi trong thực tế, việc đó cũng không "nhanh" lắm.

Mọi thứ còn phụ thuộc vào thuật toán được dùng để giải các bài toán `NP` nữa.  Nếu trong trường hợp, một thuật toán giải các bài toán NP-complete với thời gian `O(n ^ 4)` thì đó không phải là thời gian quá lớn.  Điều này sẽ khiến các hệ mã hoá hiện tại, kể cả loại đối xứng hay loại public key, đều không còn an toàn nữa.  Trong lúc này, chỉ còn các hệ mã hoá đã được chứng minh là an toàn như one-time pad hay phương thức xác thực [kiểu Carter-Wegan](https://eprint.iacr.org/2013/126.pdf), là còn có thể bảo vệ được chúng ta.

Khi đó, các hệ mã hoá cũ không còn an toàn nữa, nhân loại phải tiếp tục thiết kế các hệ mã hoá mới an toàn hơn.  Sẽ mất một vài năm để chúng ta chuyển qua các hệ mã hoá mới.  Thế nhưng ngay cả những hệ mã hoá mới này cũng chưa chắc đã an toàn, bởi mọi bài toán có thể nhanh chóng kiểm chứng được lời giải, thì có thể nhanh chóng tìm ra lời giải đó.

Nếu hôm nay có một hệ mã hoá phải mất nhiều hơn `O(n ^ 4)` thời gian để giải, thì trong lúc nhân loại chưa kịp chuyển qua hệ mã hoá mới, rất có thể một thuật toán tối ưu hơn đã được đưa ra.  Trong trường hợp này, mọi thứ cần phải được thiết kế lại, chứ không riêng gì việc mã hoá.  Đó thực sự là một thảm hoạ.

Thế nhưng, nếu may mắn hơn, thuật toán để giải các bài toán NP-complete phải mất `O(n ^ 100)` thời gian để giải, thì tương lai cũng không quá khó khăn.  Vì luỹ thừa 100 là một số khá lớn, chúng ta có thể tạm thời tăng mức độ bảo mật lên bằng cách tăng độ lớn của các khoá.  Vì vậy, dù đã được chứng minh là kém an toàn, nhưng trong tương lai gần, chúng ta vẫn được bảo vệ.

Thế nhưng, cũng không nên hy vọng quá, bởi nhân tài thế giới nhiều vô cùng.  Biết đâu sau một hoặc hai năm, có một thiên tài nào đó tối ưu hoá thuật toán đó về thời gian `O(n ^ 10)` hay thậm chí `O(n ^ 4)` để giải các bài toán NP-complete.  Vâng, dù không có tác động ngay lập tức, nhưng việc chứng minh `P = NP` cũng có những ảnh hưởng rất đáng sợ.

May mắn nhất đối với chúng ta, là trường hợp có người chứng minh được `P = NP` nhưng không hề tìm ra được thuật toán nào để giải các bài toán `NP` trong thực tế, hoặc ít nhất là nó đủ nhanh trong thực tế. Khi dó chúng ta sẽ ở trong một tình trạng tương đối hỗn loạn khi lý thuyết thì bảo "có" nhưng thực tế thì lại nó "không".

Tất cả những điều trên sẽ không thể xảy ra trong tương lai gần, vì bài toán thiên niên kỷ đâu có dễ giải đến thế.  Vì vậy, nếu bạn đang tự hỏi mình nên làm thế nào để bảo vệ mình nếu có ai đó chứng minh được `P = NP`.  Câu trả lời là đừng bận tâm đến nó, trước mắt, chúng ta có nhiều mối quan tâm thực tế hơn, như tình trạng theo dõi người dùng, cracker tấn công hệ thống đánh cắp thông tin, thông tin cá nhân bị rao bán tràn lan trên chợ đen, v.v...