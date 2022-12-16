![](https://images.viblo.asia/205eec97-3923-4360-a74b-d6c7963b4ced.jpg) 

Trong những năm gần đây, các **frameworks** và **libraries** front-end đã mọc lên như nấm khiến bạn rơi vào tình huống khó xử để lựa chọn một cái tốt nhất, phù hợp nhất. 
Đã có rất nhiều bài viết thảo luận về **Angular**, **React** và **Vue.js** - Sự lựa chọn hoàn hảo cho dự án của bạn.  
Bài viết này chỉ mang tính tổng hợp, so sánh giữa Vue.js và React.js, hai công nghệ đang được sử dụng rộng rãi bởi các nhà phát triển web và trên thế giới. Là một lập trình viên web , tôi đã tiếp cận và thử nghiệm cả hai công nghệ trên một số dự án. Thực tế thì cả hai công nghệ đều đáp ứng tốt nhu cầu của dự án, nhưng React đã đánh bại Vue trong một số tình huống, bên cạnh đó thì trong một số trường hợp Vue đã trở thành người chiến thắng.  

## Giới thiệu 

#### React 

[React.js](https://reactjs.org/) là một thư viện JavaScript được phát triển và duy trì bởi Facebook. Được phát hành vào năm 2013, ban đầu nó được phát triển để tạo giao diện người dùng nhưng giờ đây nó đã lan rộng và có thể phát triển di động, IOT và AR/VR. Đặc tính linh hoạt và cung cấp sự tự do của nó đã khiến nó trở thành một trong những công nghệ JavaScript phổ biến nhất trong số các nhà phát triển web. 

![](https://images.viblo.asia/270c693f-d53f-4a25-aeef-bb31cb57a4d9.png)

#### Vue.js 
Mặt khác, **Vue.js** là một đứa trẻ hơn, được biết đến là framework JavaScript nhẹ nhất. Được phát triển và phát hành vào năm 2014 bởi [Evan You](https://evanyou.me/), một nhân viên cũ của Google, người đã làm việc cho một số dự án **Angular**. Trong những năm gần đây, nó đã trở nên phổ biến rộng rãi vì trên thực tế nó đơn giản nhất nhất trong tất cả các frameworks và libraries khổng lồ ngoài kia. 

![](https://images.viblo.asia/b71f32af-ff4a-46b4-a13b-3a9cbc13f468.png) 

Mặc dù **React** là một thư viện và **Vue.js** là một framework, nhưng chúng có rất nhiều điểm tương đồng.  
Trên trang web của Vue.js có viết:  
> “React and Vue.js share many similarities. They both: – utilize a virtual DOM – provide reactive and composable view components – maintain focus in the core library, with concerns such as routing and global state management handled by companion libraries” 

 Cả hai  sử dụng một DOM ảo - cung cấp các thành phần view có thể phản ứng và có thể kết hợp, với các action như định tuyến và quản lý trạng thái toàn cầu được xử lý bởi các thư viện đồng hành như **react-router-dom** hay **vue-router** ...  
 
## So sánh React và Vue 

#### React dành cho bạn nếu bạn đang tìm kiếm: 

* **Một công nghệ được hỗ trợ bởi một ông lớn**  
Khi nói đến độ tin cậy, một câu hỏi luôn luôn xuất hiện trong đầu chúng ta, Ai là người tạo ra công nghệ đó? Nếu một công nghệ được hỗ trợ bởi một ông lớn, bạn sẽ cảm thấy an toàn hơn khi sử dụng nó. Và React được hỗ trợ bởi **Facebook**.  
Và bạn có thể thắc mắc vậy Vue.js có đáng tin cậy không? Và câu trả lời là có bởi vì Vue cũng có một cộng đồng lớn và đang khá tích cực phát triển với tốc độ nhanh hơn. Ngay cả những tên tuổi lớn như Alibaba, Xiaomi và Gitlabs cũng đã thể hiện niềm tin vào nó. Tuy nhiên, nếu bạn đang chi rất nhiều xiền cho dự án của mình, thì tôi khuyên bạn nên sử dụng công nghệ đã có mặt trên thị trường trong một thời gian dài hơn và được hỗ trợ bởi một tên tuổi lớn. 

* **Tự do xây dựng ứng dụng theo cách riêng của bạn**  
Mặc dù React và Vue đều rất linh hoạt, nhưng trước đây React có một số lợi thế hơn Vue vì đây là một **thư viện**, không phải là một **framework**. Với React, không có quy tắc hay giới hạn nào. Vì vậy, bạn có thể xây dựng dự án của bạn theo cách riêng của bạn. Tuy nhiên, bạn phải nhớ rằng không có quy tắc, sai lầm sẽ dễ xảy ra hơn.  
React tích hợp liền mạch với các gói và thư viện của bên thứ 3. Đây là một trong những tính năng nổi trội của React với các đối thủ cạnh tranh của nó. 
* **Ứng dụng di động đa nền tảng**  
Trong thời gian gần đây, **React Native** đã nhận được tiếng hét lớn từ các nhà phát triển trên toàn cầu. Và lý do đằng sau là nó đã làm cho cuộc sống của các nhà phát triển dễ dàng hơn bằng cách cung cấp các chu kỳ phát triển ngắn hơn và triển khai ứng dụng ngay lập tức.  
Trước đó, trong khi phát triển ứng dụng **Android** hoặc **iOS**, các mã hoàn toàn khác nhau để viết hai nền tảng. Điều này tiêu tốn nhiều thời gian và năng lượng hơn vì cả hai mã được viết và xây dựng từ đầu. Để giải quyết vấn đề này, **Facebook** đã ra mắt **React Native** giúp phát triển các ứng dụng đa nền tảng bằng cách sử dụng lại cùng một mã. Một số ứng dụng di động nổi tiếng trên thế giới như - **Facebook**, **Skype**, **Instagram**, **Tesla**, **Wallmart** ... đều được tạo bằng **React Native**. 

* **Một hệ sinh thái**  
Nếu dự án của bạn không chỉ giới hạn trong một ứng dụng web và bạn cần một công nghệ để đáp ứng nhu cầu của bạn, bao gồm các ứng dụng trang đơn , ứng dụng di động, thực tế ảo, Internet vạn vật ... không có framework hoặc thư viện có thể tốt hơn React. Đó là một hệ sinh thái hoàn chỉnh với hàng ngàn thư viện và gói của bên thứ ba có sẵn. 

* **Có đầy đủ các chức năng của Javascript**  
Nếu bạn là một trong những người yêu thích JavaSCript thì React là sự lựa chọn phù hợp nhất với bạn. Trong React, mọi thứ đều là JavaScript. Từ các cấu trúc của HTML được thể hiện thông qua JSX đến quản lý CSS.  
JSX là một chút tiên tiến so với các HTML-based template trong Vue mang lại cho nó lợi thế của việc sử dụng toàn bộ khả năng của JavaScript để xây dựng  view và tool hỗ trợ.  

#### Vue.js là hoàn hảo cho dự án của bạn nếu bạn cần: 
* **Một framework nhẹ nhưng mạnh mẽ**  
Khi được so sánh với những gã khổng lồ như React và Angular, Vue là gã khổng lồ thư hai của JavaScript. Mặc dù React khá nhẹ với kích thước tệp được nén là 43K, nhưng Vue có kích thước bằng gần một nửa với 23K. Mặc dù nó có kích thước nhẹ nhất, nhưng nó cực kỳ tệ trong hiệu suất.
* **Làm việc với các template**   
Vue.js cung cấp các mẫu template theo mặc định. Vì vậy, nếu bạn là nhà phát triển HTML hoặc bạn thích cách tiếp cận truyền thống, làm việc với một template do Vue cung cấp sẽ dễ dàng hơn rất nhiều. Tuy nhiên, Vue cũng cung cấp chức năng **render**, trong trường hợp bạn cần sử dụng toàn bộ sức mạnh lập trình của JavaScript.
* **Thiết lập đơn giản và mã thân thiện**  
Trong số tất cả các công nghệ JavaScript, Vue giữ danh tiếng là đơn giản và dễ dàng nhất. Mã được viết bằng Vue là sạch nhất và có thể bảo trì. Nó rất dễ cài đặt, có tài liệu phong phú và chi tiết. Vì vậy, nếu bạn đang tìm kiếm một thiết lập dễ dàng hoặc muốn một mã sạch và có thể bảo trì, hãy chọn Vue.js cho dự án của bạn. 
* **Dễ học**   
**Vue** đã có được một cộng đồng lớn trong một khoảng thời gian nhỏ. Điều này là do các nhà phát triển thích sự đơn giản của nó và dễ hiểu. Do cấu trúc đơn giản của nó, nó giúp nhà phát triển web dễ dàng phát triển và phát hiện bug. Và tài liệu của nó khá dễ hiểu và rõ ràng.

## Kết Luận
Mỗi cái một ưu nhược điểm, việc quyết định xem lựa chon cái nào thì phụ thuộc vào dự án mà thôi. Về cá nhân thì để phát triển một ứng dụng có kích thước nhỏ hãy đi với Vue còn nếu phát triển một ứng dụng lớn thì hãy đi với React.

=> [Bài viết gốc](https://www.facebook.com/notes/bkfa-team/react-vs-vue-c%C3%A1i-n%C3%A0o-t%E1%BB%91t-h%C6%A1n-cho-vi%E1%BB%87c-ph%C3%A1t-tri%E1%BB%83n-ui/553264031868648/)