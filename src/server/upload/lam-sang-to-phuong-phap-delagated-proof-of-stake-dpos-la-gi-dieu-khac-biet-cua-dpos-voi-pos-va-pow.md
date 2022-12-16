- Nói đến Blockchain ta sẽ nói đến các thuật toán đồng thuận **Proof of Work** (PoW) nổi bật nhất trong Bitcoin và **Proof of Stake** (PoS) của Peercoin và NXT. Ngoài các thuật toán đồng thuận trên thì người ta đã nghĩ ra một thuật toán đồng thuận, giải quyết một số hạn chế của hai thuật toán đồng thuận trên đó là DPoS.

# Giới Thiệu
- **Delegated Proof of Stake** (DPOS) được ủy quyền là một phương pháp mới để bảo đảm mạng lưới của đồng tiền. DPOS xuất hiện lần đầu tiên vào khoảng năm 2014 với hệ thống Bitshares. Nó đã được tạo ra bởi một nhóm các nhà phát triển được dẫn dắt bởi **Daniel Larimer**. ( người này cũng là đồng sáng lập của Steemit & hiện tại là sáng lập của dự án đình đám EOS ).
- Cả PoS và DPoS đều được sử dụng để thay thế cho thuật toán đồng thuận Bằng chứng Công việc PoW, bởi thiết kế của hệ thống PoW yêu cầu rất nhiều các tài nguyên bên ngoài. Thuật toán PoW sử dụng một số lượng lớn các phép tính toán để bảo mật một sổ cái phân tán không thể thay đổi, phi tập trung và minh bạch. Ngược lại, PoS và DPoS yêu cầu ít nguồn lực hơn và thiết kế của chúng bền vững và thân thiện với sinh thái hơn. Để hiểu cách thức hoạt động của DPoS, chúng ta cần hiểu khái niệm cơ bản về các thuật toán PoW và PoS xuất hiện trước nó.

# Bằng chứng công việc - Proof of Work (PoW)
-  Đúng như cái tên thì **PoW** là một thuật toán đồng thuận mà ở đó tồn tại các thợ đào (miner), các thợ đào sẽ là người thực hiện xác thực giao dịch nhưng không đơn giản là tìm đến block cần xác thực và chứng minh cho mọi người thấy giao dịch đó là đúng, mà thợ đào cần phải lao động nhưng ở đây không phải là lao động chân tay mà lao động đây là dùng phần cứng và tiêu hao năng lượng điện. Họ sẽ sử dụng một phần cứng chuyên dụng (ASIC) để thử và giải các bài toán mật mã phức tạp mà các block đặt ra. Đối với BitCoin trung bình cứ mỗi 10 phút lại có một khối mới được đào. Thợ đào chỉ có thể thêm một khối mới vào blockchain nếu anh ta có thể tìm được lời giải cho khối đó. Nói cách khác, thợ đào chỉ có thể làm được điều đó sau khi hoàn thành một proof of work, điều đó sẽ mang lại cho anh ta phần thưởng là các coin mới được tạo và toàn bộ phí giao dịch của khối đó. 
-  Ngoài nỗ lực duy trì hệ thống, còn có các câu hỏi được đặt ra về mức độ áp dụng hệ thống PoW – đặc biệt liên quan đến khả năng mở rộng của hệ thống (số lượng giao dịch mỗi giây rất hạn chế). Tuy nhiên, các blockchain PoW được xem là bảo mật và đáng tin cậy nhất và tiếp tục là tiêu chuẩn cho một giải pháp với sự chấp nhận các sự cố.

![](https://images.viblo.asia/5eae5e4e-5105-4235-a4ce-2d20783b3dfb.jpeg)

# Bằng chứng cổ phần - Proof of Stake (PoS)
- Thuật toán đồng thuận PoS là thuật toán thay thế phổ biến nhất cho PoW. Các hệ thống PoS được thiết kế để giải quyết sự thiếu hiệu quả và các vấn đề mới thường xuất hiện trên các blockchain dựa trên PoW. Nó đặc biệt giải quyết vấn đề về các chi phí liên quan đến việc đào PoW (sự tiêu thụ điện năng và phần cứng). Về cơ bản, blockchain dựa trên PoS được bảo mật theo một cách thức tiền định. Ở các hệ thống này không có việc đào khối và sự xác thực các khối mới phụ thuộc vào số lượng coin mà những người xác thực nắm giữ. Người nào có số lượng coin càng lớn càng có khả năng cao được chọn là người xác thực khối.

- Mọi người muốn xác thực block sẽ phải đặt cược một khoản tiền để xác minh độ tin tưởng của mình, khoản tiền này sẽ bị khóa lại để đảm bảo người xác nhận không thể chối bỏ trách nhiệm. Sau đó hệ thống sẽ chọn ngẫu nhiên một người trong số những người đặt cọc làm người xác thực giao block. Khoản tiền đặt cọc sẽ không được mở lại ngay sau khi người đó xác thực xong, vì người đó có thể gian lận hoặc cố tình xác thực sai, nếu khoản tiền được mở lại ngay người đó có thể trối bỏ trách nghiệm. Phải khóa một khoảng thời gian để chờ đợi xem có bất kỳ một tố cáo nào về sự sai phạm hay không, nếu không có tố cáo sau một khoảng thời gian nhất định người đó sẽ nhận lại cả tiền đặt cọc lẫn tiền công xác thực.

- Trong khi các hệ thống PoW dựa vào các khoản đầu tư từ bên ngoài (tiêu thụ điện năng và phần cứng), blockchain PoS lại được bảo mật qua các khoản đầu tư nội bộ (bản thân tiền điện tử của nó).

- Ngoài ra, các hệ thống PoS khiến việc tấn công một blockchain trở nên rất tốn kém, vì để thực hiện một cuộc tấn công kẻ tấn công phải sở hữu ít nhất 51% tổng số coin đang lưu hành. Nếu cuộc tấn công thất bại nó sẽ gây ra một sự mất mát khổng lồ về tài chính vì toàn bộ lượng coin đặt cọc khổng lồ dùng để đặt cọc cho việc xác minh block sẽ bị phạt, nên chưa chắc nắm giữ hơn nửa số coin mà đã chắc chắn đây là một sự đánh cược rất lớn. Mặc dù có những điểm tích cực và những lập luận thuyết phục về PoS, nhưng những hệ thống này vẫn đang ở trong các giai đoạn đầu của nó và vẫn chưa được thử nghiệm ở các quy mô lớn hơn.

![](https://images.viblo.asia/f543af0f-2c6f-455d-98c3-82567dca8929.jpeg)

# PoS được ủy quyền (DPoS)

![](https://images.viblo.asia/3ccce2c7-ea07-4b76-8563-4c2071df6e70.png)

- Để giải thích nguyên lý của **DPoS** chúng ta cùng đi vào một ví dụ. Hãy tưởng tượng rằng có một nền tảng blockchain với cộng đồng gồm một trăm nút. DPoS được liên kết với nền dân chủ theo cách này: các nút phải bỏ phiếu để chọn hai mươi nhân chứng sẽ điều hành mạng. Chỉ hai mươi nút này có quyền xác nhận giao dịch.Sức mạnh tính toán không giải quyết bất kỳ vấn đề nào ở đây; động lực duy nhất mà nút cần là một cổ phần mà anh ta sở hữu. Cổ phần càng lớn, quyền biểu quyết càng mạnh. 

- Các nhân chứng với 20 node có quyền xác thực các giao dịch, kiếm được tiền lương do công việc họ làm trên mạng. Và xác nhận các giao dịch không phải là nghĩa vụ duy nhất để thực hiện. Các nhân chứng cũng được chọn để giữ an toàn cho mạng.

- Càng nhiều người tham gia vào mạng, cuộc cạnh tranh càng trở nên khó khăn hơn và vị trí của các nhân chứng trở nên được trả lương cao hơn, vì vậy hầu như mọi nút trong mạng đều muốn trở thành một nhân chứng. Do đó, khi một nhân chứng  thực hiện muốn thực hiện các công việc sai trái, người dùng có thể lấy lại phiếu bầu của họ và nếu số phiếu ít hơn sẽ mất quyền làm nhân chứng, người nhiều hơn sẽ lên thay thế. Quá trình bỏ phiếu thời gian thực không bao giờ dừng lại.


    ### DPoS và PoS
    - Mặc dù PoS và DPoS giống nhau ở chỗ cùng sử dụng hình thức cổ phần, nhưng DPoS có một hình thức bầu chọn dân chủ hơn, và qua đó chọn ra những người tạo ra các khối. Do hệ thống  DPoS được duy trì bởi những người bầu chọn, nên những đại diện được bầu có động lực để làm việc trung thực và hiệu quả nếu không sẽ bị trục xuất. Ngoài ra, các blockchain DPoS có vẻ xử lý nhanh hơn với số lượng giao dịch mỗi giây lớn hơn các blockchain PoS.
    
    ### DPoS và PoW
    - Trong khi PoS cố gắng để giải quyết các vấn đề của PoW, thì DPoS tìm cách cải thiện quá trình tạo khối mới. Vì lý do này, các hệ thống DPoS có khả năng xử lý một số lượng giao dịch lớn hơn trên blockchain với tốc độ nhanh hơn. Hiện tại, DPoS không được sử dụng theo cách thức giống như PoW hoặc PoS. PoW vẫn được coi là thuật toán đồng thuận bảo mật nhất, và như vậy, là nơi thực hiện nhiều giao dịch chuyển tiền nhất. PoS nhanh hơn PoW và có thể có nhiều tính năng sử dụng hơn. DPoS chỉ sử dụng cổ phần để bầu chọn ra những người tạo khối. Việc tạo khối thực sự của nó đã được xác định trước, ngược lại với hệ thống dựa trên sự cạnh tranh của PoW. Mỗi nhân chứng đều có một lượt để tạo khối. Một số người cho rằng DPoS nên được coi là một hệ thống Proof of Authority (Bằng chứng về Quyền lực).

 # DPoS có hoàn hảo không?
  - Như chúng ta đã biết, không có gì là hoàn hảo, đặc biệt là công nghệ. Luôn luôn có ai đó sẽ thiết kế một cái gì đó tốt hơn, nhanh hơn, hiệu quả hơn hoặc có lợi hơn. Điều tương tự cũng đúng đối với các giao thức đồng thuận trên blockchain – mỗi giải quyết một vấn đề nhất định, có khả năng tạo ra một vấn đề khác cho các giao thức trong tương lai để khắc phục.

- Có hai yếu tố mang lại sự đồng thuận cao hơn cho DPoS trên thị trường:

    + Giải quyết vấn đề cần thiết cho sức mạnh tính toán
    + Thúc đẩy sự phi tập trung
- Tuy nhiên, trong khi số lượng đại biểu được rút ngắn xuống một con số nhất định, cắt giảm thời gian xử lý giao dịch, nó ngăn chặn nền tảng đạt được sự phân cấp đầy đủ. Theo thực tế là việc tăng số lượng nhân chứng gây ra các vấn đề về khả năng mở rộng và tăng trưởng liên tục của mạng, cần cân bằng giữa số lượng khối được tạo và khả năng mở rộng trên nền tảng. Tuy nhiên, tình huống này có khả năng xảy ra cực kỳ thấp.

- Đây không phải là mối đe dọa duy nhất có thể đối với mạng, vì việc chọn một số lượng đại biểu nhất định gây ra xác suất va chạm, ảnh hưởng đến các mối quan hệ tin cậy trong cộng đồng. Thật đúng là các đại biểu thường xuyên được cộng đồng lựa chọn lại nếu họ thực hiện không tốt, nhưng không phải trong thời điểm của cuộc tấn công. Vấn đề vẫn là một điểm yếu trong giao thức đồng thuận DPoS.

- Lấy ví dụ, hãy để hồi tưởng lại một sự cố xảy ra trên nền tảng EOS. Một nút cho rằng khóa riêng của anh ta đã bị đánh cắp và ai đó đã chuyển tiền của anh ta vào một ví không xác định. Theo hiến pháp của **EOS**, cần có một trọng tài viên xác minh giao dịch và giám sát 21 đại biểu để đảm bảo trọng tài đưa ra lựa chọn chính xác. Giao dịch, được cho là gian lận, trên thực tế đã được cả hai xác nhận. Nút đã đưa ra một lệnh để thay đổi trạng thái của giao dịch. Các nút đã phê duyệt điều này, dẫn đến việc ghi đè trạng thái blockchain.

- Nếu một nút có thể làm điều đó, điều đó đặt toàn bộ ý tưởng đồng thuận DPoS bị đe dọa bị coi là không đáng tin cậy.

# Kết Luận
- DPoS rất khác biệt so với PoW và thậm chí cả PoS. Trong hệ thống này, việc các chủ sở hữu cổ phần bầu chọn là một cách thức để tìm ra và thúc đẩy những đại diện (hoặc nhân chứng) trung thực và hiệu quả. Tuy nhiên, việc tạo ra khối mới thực sự khác so với các hệ thống PoS và trong phần lớn các trường hợp, nó mang lại hiệu suất cao hơn tính theo số lượng giao dịch được thực hiện mỗi giây.


-----



##### Tài liệu liên quan: 
- https://medium.com/loom-network/understanding-blockchain-fundamentals-part-3-delegated-proof-of-stake-b385a6b92ef
- https://www.binance.vision/blockchain/delegated-proof-of-stake-explained
- https://lisk.io/academy/blockchain-basics/how-does-blockchain-work/delegated-proof-of-stake