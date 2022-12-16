*Trong các phương pháp phát triển Agent hiện tại, hoặc là quá trình phát triển nhắm mục tiêu một tổ chức đại diện, mà cấu trúc không nhất thiết phải luôn tốt nhất, như trong giai đoạn định nghĩa yêu cầu, hoặc việc xác định và thiết kế của các Agent rất phức tạp,và kinh nghiệm thiết kế đóng một vai trò thiết yếu trong định nghĩa yêu cầu này. Trong bài này,  tôi trình bày phương pháp luận SONIA (Set of models for a Natural Identification of Agents - Tập các mô hình cho một nhận dạng tự nhiên của Agent) trong một nỗ lực để giải quyết vấn đề này. Dựa trên một phân tích vấn đề độc lập chung chung và một quá trình xác định Agent từ dưới lên (bottom-up), SONIA đưa ra kết quả đầu ra là một hệ thống Agent cơ bản như trên và một thiết kế xã hội Agent thích hợp một cách tự nhiên nhất.*

# 4. Phương pháp luận SONIA
Phương pháp luận SONIA (Tập các mô hình để phát triển agent tự nhiên ) tạo ra một kiến trúc đa agent để giải quyết một vấn đề theo một mô hình thiết kế đa Agent hệ thống hóa và tự động hóa các hoạt động của việc xác định các thành phần MAS. Tương tự, bằng cách sử dụng kiến trúc MAS này để định nghĩa Agent xã hội một cách linh hoạt và năng động để tạo điều kiện cho việc giải quyết các vẫn đề và có thể được sử dụng để tích hợp hệ thống.

![](https://images.viblo.asia/4398130a-1bf4-4865-8931-04b6dbd1d9d7.jpg)

                   Hình 1. Các pha của phương pháp luận SONIA
                                            
Trong phần tiếp theo, các giai đoạn của phương pháp luận SONIA và các ứng dụng để phát triển dự án ALBOR sẽ được mô tả ngắn gọn.
ALBOR được hình thành như một hệ thống thông minh dựa trên Internet, dung để hương dẫn về đánh giá các kỹ năng truy cập máy tính của nguời tàn tật và sự lựa lựa chọn công nghệ hỗ trợ phù hợp nhất. 

Mỗi phần của hệ thống được chia ra làm 4 giai đoạn:
- Xác định người dùng (thông tin cá nhân và các thông tin khác theo tuần tự để bắt đầu phiên làm việc)
- chuẩn bị phiên (mục đích của bảng các câu hỏi, làm thế nào để phiên làm việc hiệu quả và có cần thiết đạo tạo sơ bộ hay không?)
- Khảo sát (một tập các câu hỏi, sau đó sẽ dựa vào các phản hồi và để giới hạn các câu hỏi thực sự cần thiết cho việc đánh giá)
- Đánh giá kết quả (một bản báo cáo kết quả đánh giá với gợi ý/đề nghị cho người sử dụng để quyết định cái nào là tốt nhất cho họ).

### 4.1. Pha phân tích

Đưa ra các yêu cầu và được phân tích bằng cách sử dụng Mô hình khái niệm dựa trên tập lý thuyết (Set Theory Based Conceptual Model – SETCM) [39], một phương pháp phân tích đã được xác định để kết hợp một nền tảng chính thức với một cách tiếp cận thiết thực. Phương pháp phân tích này là thiết kế độc lập: nó sử dụng một thuật ngữ khác với ngôn ngữ thiết kế để cung cấp một sự hiểu biết thực sự của vấn đề đang được phân tích.  Nó đã được áp dụng để phát triển các hệ thống thực tế, hệ thống này được thiết kế sử dụng nhiều loại kiểu mẫu (có cấu trúc, hướng đối tượng, dựa trên tri thức) và có thể là một sự kết hợp giữa các mô hình.

Mô hình cấu trúc khởi tạo và Mô hình nhiệm vụ khởi tạo  được xây dựng dựa trên SETCM. Mô hình cấu trúc khởi tạo mô tả kiến trúc chung của miền vấn đề (dựa trên các khái niệm, thuộc tính khái niệm, liên kết, thuộc tính liên kết, phân loại khái niệm và phân loại liên kết). Mô hình nhiệm vụ khởi tạo  mô tả làm thế nào để các vấn đề được đưa lên trên miền được giải quyết (dựa vào nhiệm vụ và phương thức).

Các mô hình này rất tính tế và được mở rộng để nắm bắt môi trường hệ thống và các thực thể bên ngoài, sản xuất thành công:
- 1 Mô hình môi trường trong đó xác định hệ thống các thực thể ngoài và các hoạt động bên trong của nó
- 1 Mô hình cấu trúc bao gồm các cấu trúc từ lĩnh vực kiến thức của các thực thể ngoài tương tác với hệ thống.
- 1 Mô hình nhiệm vụ được thêm vào các chức năng yêu cầu tương tác với hệ thống thực thể bên ngoài được xác định trong mô hình môi trường.

### 4.2 Thiết kế kiến trúc đa Agent

Pha thiết kế được thực hiện bởi Thiết kế kiến trúc đa Agent (MAAD) được chia thành 2 khía cạnh: Tổng hợp và Thiết kế kiến trúc

Pha Tổng Hợp: cung cấp cho việc xác định thành phần theo hướng button-up, các thành phần của SM và TM được nhóm lại dựa trên tri thức, hành vi, trách nhiệm: 
-	Mô hình tri thức: Trong đó xác định các thành phần kiến thức bằng cách nhóm các khái niệm và liên kết của mô hình cấu trúc và các liên kết. Những nhóm này được xác định nhóm khác là thấp và chúng được sử dụng để thực hiện các tác vụ của hành vi.
-	Mô hình hành vi: Được sản xuất bởi việc nhóm các mô hình tác vụ và các phương thức. Hành vi sẽ là một phần của các agent. Những nhóm này được xác định bởi nhiều tác vụ và tác vụ của chúng phụ thuộc vào mỗi phương thức của chúng và chúng sử dụng thành phần kến thức tương tự trong việc giải quyết vấn đề.
-	Mô hình trách nhiệm:  Đầu ra bằng các liên kết các thành phần tri thức với các thành phần hành vi. Mục đích của mô hình này là để xác định các agent và các đối tượng môi trường.
Thiết kế kiến trúc: tập trung vào việc định nghĩa ra các kiến trúc thành phần theo các mô hình sau đây:
-	Mô hình agent: Được xác định và định nghĩa từ trách nhiệm, kiến thức và mô hình hành vi mà thực thể nào được thiết kế như một agent tự trị. Một agent được xác định bởi vì nó là một thực thể môi trường nhạy cảm (nó nhận thức và hành động trong môi trường). Nó có kiến thức để phát huy hành vi của mình trong việc theo đuổi các mục tiêu và được kích hoạt khi các tiện ích của nó được yêu cầu.
-	Mô hình đối tượng: Được xác định và định nghĩa từ mô hình trách nhiệm, kiến thức, hành vi, mà các thành phần bị động là một phần của môi trường. Các đối tượng là các thành phần tri thức được xác định trong pha tổng hợp. Các tính năng chính của một đối tượng là các kiến thức của đối tượng này có trách nhiệm nhiều hơn một hành vi hay nói cách khác được chia sẻ bởi một số hành vi. Truy cập vào các đối tượng sẽ được chia theo mức độ và các thành phần kiến thức được truy cập bởi các nhiệm vụ cùng một hành vi sẽ được nhóm cung cấp.
-	Mô hình liên kết: Được xác định và định nghĩa là mối quan hệ giữa các agent và giữa agent với các đối tượng.

### 4.3 Thiết kế hệ thông ALBOR
Hình dưới đây cho thấy quá trình xác định agent từ dưới lên của các phương pháp Sonia áp dụng cho sự phát triển của các hệ thống thông minh ALBOR. Nghiên cứu trường hợp này được giới hạn ở việc xác định các hệ thống kiến trúc đa agent. 

Trong giai đoạn thiết kế, các khái niệm và các liên kết tập hợp được tổng hợp như các thành phần kiến thức bằng cách sử dụng một kỹ thuật dựa trên cấu trúc của Kelly [42], và các nhiệm vụ và phương pháp hành vi sử dụng công nghệ tự động áp dụng để công việc phân hủy và nhiệm vụ phụ thuộc. Những kỹ thuật này, được sử dụng để sản xuất các thành phần kiến thức và hành vi, đảm bảo các nhóm rất mạch lạc và cùng thấp. Sau đó, trách nhiệm giữa các thành phần kiến thức và hành vi đã được thành lập từ những mối quan hệ của khái niệm / liên kết được sử dụng trong công việc / nhãn công việc. Những trách nhiệm dẫn đến những thay đổi trong kiến thức và mô hình hành vi. Các mô hình được điều chỉnh theo kiến thức và hành vi của nhóm / quy tắc phân chia dựa trên một số yếu tố của các mối quan hệ của khái niệm / hội được sử dụng trong nhiệm vụ / nhãn nhiệm vụ. Các kiến thức, hành vi và mô hình trách nhiệm là kết quả cuối cùng của quá trình tổng hợp. 

Nó không được tổng hợp cho đến khi Mô hình Agent được xây dựng mà có quyết định về việc liệu kiến trúc có thể được thực hiện bằng các định nghĩa của cácagent hoặc cần một mô hình khác nhau được sử dụng. Sự lựa chọn này phụ thuộc vào việc các agent có được định nghĩa hay không. Đối với một thực thể để có thể được coi như một agent tự trị, nó cần phải có một hành vi và các thành phần kiến thức đúng để thực hiện các nhiệm vụ của hành vi này, có ít nhất một mục tiêu xác định và một tiện ích, và nhận thức và hành động trong các môi trường.

Để hoàn thành giai đoạn thiết kế kiến trúc các đa-agent, các agent môi trường agent và các đối tượng đã được xác định. Các đối tượng đã được xác định từ mô hình trách nhiệm, và những kiến thức được chia sẻ bởi một số hành vi đã được chọn làm đối tượng môi trường. Sau tiêu chí này, chúng tôi xác định các đối tượng “Users”, “External” and “Media”. Các agent cũng đã được xác định từ trách nhiệm. Một lần nữa, agent  nên có một hành vi, thành phần tri thức, mục tiêu và các tiện ích, và các cảm biến và các tác nhân. Ví dụ, trách nhiệm giữa "Bảng câu hỏi" kiến thức và "Khảo sát" sản phẩm hành vi “ Người khảo sát". Các mô hình agent, đối tượng và mô hình tương tác này là kết quả cuối của giai đoạn thiết kế kiến trúc.

![](https://images.viblo.asia/42d020d2-1040-4c7d-b677-e6da75c5d41e.png)

                Hình 2. ALBOR: Từ mô hình phân tích đến mô hình thiết kế kiến

### 4.4 Thiết kế agent xã hội
Kết quả của quá trình thiết kế kiến trúc hệ đa agent là một trong các cách giải quyết vấn đề phân tán, trong đó tất cả các agent của hệ thông được chia sẻ 1 mục địch chung và vấn được được chia thành các nhiệm vụ nhỏ hơn đó là chia sẻ giữa các agent hoặc một xã hội agent, trong đó hệ thống được thiết kế như một tập các agent được nhúng vào cấu trúc giao tiếp.

Trong trường hợp này, phương pháp tự nhiên dẫn đến một mô hình xã hội agent dựa trên mô hình publish-subcribe. Một xã hội bao gồm xác agent và các đối tượng của môi trường:
-	Các agent, hoặc các đối tượng chủ động trong giao tiếp, có thể là Agent thành phần, chuyên thực hiện một nhiệm vụ nhất định, hoặc Spoke-Agent đại diện cho xã hội này trước các xã hội khác.
-	Blackboard: các đối tượng bị động trong giao tiếp có thể là miền Blackboard, được mô tả các vấn đề tồn tại và cách giải quyết chúng. Subcription Blackboard mô tả cấu trúc của xã hội của các thành phần agent và vai trò xã hội của mỗi thành phần đó, hoặc Statement Blackboard mô tả các kiến thức đầu vào/đầu ra của xã hội.

# 5.	Kết luận
Không còn nghi  ngờ gì nữa, AOSE là 1 kỹ thuật rất tốt để giải quyết vấn đề phức tạp đặc biệt là sự phân tán trong hệ thống phần mềm, trong môi trường mở và không đồng nhất. Để công nghệ này thường xuyên được sử dụng trong các công ty phần mềm giống như phương pháp tiếp cận hướng đối tượng, cần có 1 cơ chế phù hợp để quyết định xem có nên giải quyêt vấn đề bằng cách sử dụng agent. Việc xác định và thiết kế agent nên là 1 quá trình tự nhiên và theo đường thẳng và không yêu cầu nhiều về chuyên môn cũng như là không có trở ngại nào cho người phát triển ứng dụng này. Mặc dù họ có sự đóng góp to lớn để cải tiến AOSE, các phương pháp phát triển agent hiện tại không thể giải quyết thỏa mãn các vấn đề được đề cập ở trên.

Trong bài viết này, tôi đã chỉ ra 1 vài tính năng mà phương pháp phát triển agent cần hướng tới và chi tiết các tính năng chúng ta đã bỏ qua từ phương pháp quan trọng nhất được sử dụng trong mô hình agent. Do đó, chúng tôi đã trình bày tổng quan phương pháp SONIA, được minh họa trong trường hợp nghiên cứu ALBOR, bao gồm những tính năng này và dẫn đến 1 cách tự nhiên nhất từ việc khám phá những yêu cầu từ MAS và phát triển giao tiếp agent.