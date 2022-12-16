![](https://images.viblo.asia/56c2db70-7a0f-4636-93c2-5d86c5ea1c7a.jpeg)

Nếu bạn đang nghĩ đến việc học Python - hoặc là mới bắt đầu học nó, có thể bạn tự hỏi:

> Chính xác thì tôi có thể sử dụng Python để làm gì?

Vâng đó là một câu hỏi khó trả lời, bởi vì có rất nhiều ứng dụng sử dụng Python

Nhưng theo thời gian, tôi nhận thấy có 3 ứng dụng phổ biến sử dụng Python:

* Web Development
* Data Science - bao gồm machine learning, data analysis và data visualization
* Scripting

Chúng ta sẽ đi lần lượt từng thứ một nha :))

# Web Development
Các web frameworks xây dựng sử dụng Python như Django và Flask gần đây đã trở nên rất phổ biến cho việc phát triển web.
Các web frameworks này giúp bạn tạo ra serve-side code (backend code) bằng Python. Đó là những đoạn mã chạy trên phía máy chủ của bạn, trái ngược với trên các thiết bị và trình duyệt của người dùng (front-end code).

## Nhưng đợi đã, tại sao tôi cần một web framework?
Đó là vì một web framework giúp ta dễ dàng hơn trong việc xây dựng logic backend chung (common backed logic). Bao gồm ánh xạ các URLs khác nhau tới các đoạn code Python, xử lý cơ sở dữ liệu và tạo các tệp HTML mà người dùng thấy trên trình duyệt của họ.

## Tôi nên sử dụng web framework Python nào?

Django và Flask là hai trong số các web framework sử dụng Python phổ biến nhất. Bạn nên sử dụng một trong hai nếu bạn mới bắt đầu.
## Điều khác biệt giữa Django và Flask là gì vậy?

* Flask cung cấp sự đơn giản, linh hoạt và kiểm soát chi tiết. Nó cho phép bạn quyết định các bạn muốn thực hiện mọi thứ.
* Django cung cấp trải nghiệm đầy đủ hơn: bạn có bảng quản trị (admin panel), giao diện CSDL (database interfaces), ORM và cấu trúc thư mục cho các ứng dụng của bạn.

Bạn nên chọn:

* Flask, nếu bạn tập trung vào trải nghiệm và cơ hội học tập hoặc nếu bạn muốn kiểm soát nhiều hơn về những thành phần cần sử dụng (chẳng hạn như CSDL bạn muốn sử dụng và các bạn muốn tương tác với chúng).
* Django, nếu bạn tập trung và sản phẩm cuối cùng. Đặc biệt nếu bạn đang làm việc trên một ứng dụng đơn giản như trang web tin tức, cửa hàng điện tử hoặc blog và bạn muốn ở đó luôn luôn là một cách đơn giản, rõ ràng để làm mọi thứ.

Nói cách khác, nếu bạn là người mới bắt đầu, Flask có lẽ là sự lựa chọn tốt hơn vì nó có ít thành phần hơn để giải quyết. Ngoài ra, Flask là một sự lựa chọn tốt hơn nếu bạn muốn tùy biến hơn.

Ngoài ra, Flask phù hợp hơn cho việc tạo ra REST API hơn là Django do tính linh hoạt của nó.

Mặt khác, nếu bạn đang tìm cách xây dựng thứ gì đó tiến xa hơn, Django có thể sẽ cho phép bạn đến đó nhanh hơn.

Tạm vậy thôi, ta chuyển sang chủ đề tiếp theo nào!
# Data Science - bao gồm machine learning, data analysis và data visualization
## Trước hết, hãy xem Machine learning là gì?
Có lẽ cách tốt nhất để giải thích học máy là gì là lấy một ví dụ đơn giản.

Giả sử bạn muốn phát triển một chương trình tự động phát hiện nội dung trong ảnh.

Vì vậy, với hình ảnh dưới đây, bạn muốn chương trình nhận ra rằng đây là một con chó.

![](https://images.viblo.asia/235f2fe7-335c-4a12-b930-5ede92611918.jpeg)

Với bức ảnh khác, bạn muốn chương trình của mình nhận ra rằng đó là một cái bàn.

![](https://images.viblo.asia/fe3f3083-7e38-4ad8-8b9f-f5e6ade4fb9a.jpeg)


Bạn có thể nói, tốt, tôi có thể chỉ cần viết một vài đoạn mã để làm điều đó. VÍ dụ, có thể nếu có nhiều điểm ảnh màu nâu trong hình, thì chúng ta có thể nói đó là một con chó.

Hoặc, bạn có thể tìm ra cách phát hiện các cạnh trong hình. Sau đó, bạn có thể nói, nếu có nhiều cạnh thẳng, thì đó là một cái bàn.

Tuy nhiên, cách tiếp cận này khá phức tạp. Điều gì sẽ xảy ra nếu có một chú chó màu trằng trong ảnh không có quả đầu màu nâu? Điều gì xảy ra nếu hình ảnh chỉ hiển thị các phần của chiếc bàn.

## Đây là nơi mà học máy ứng dụng vào.
Học máy thường thực hiện một thuật toán tự động phát hiện một mẫu trong đầu vào đã cho.

Bạn có thể đưa ra, ví dụ, 1000 hình ảnh của một chú chó và 1000 hình ảnh của một chiếc bàn cho một thuật toán học máy. Sau đó, nó sẽ tìm hiểu sự khác biệt giữa một con chó và một cái bàn. Khi bạn đưa đào vào là một hình ảnh mới của một con chó hoặc một cái bàn, nó sẽ có thể nhận ra hình ảnh đó là cái gì.

Tôi nghĩ điều này có phần tương tự như cách một đứa trẻ học những điều mới. Làm thế nào để một đứa trẻ biết rằng một thứ trông giống như một con chó hay chiếc bàn? Có lẽ từ một loạt các ví dụ.

Bạn có thể không nói rõ cho một đứa trẻ, "Nếu thứ gì đó có lông và có quả đầu màu nâu, thì đó có thể là một con chó."

Có thể bạn sẽ chỉ cần nói, "Đó là một con chó. Đây cũng là một con chó. Và cái này là một cái bàn. Cái đó cũng là một cái bàn."

Các thuật tóan học máy cũng hoạt động theo cùng một cách.

Bạn có thể áp dụng cùng một ý tưởng cho:
* Hệ thống gợi ý (recommendation systems)
* Nhận diện khuôn mặt (face recognition)
* Nhận diện giọng nói (voice recognition)

trong nhiều ứng dụng khác nhau.

Các thuật toán học máy phổ biến mà bạn có thể đã nghe nói về bao gồm:
* Neural Networks
* Deep Learning
* Support Vector Machines
* Random forest

Bạn có thể sử dụng bất kì thuật toán nào ở trên để giải quyết vấn đề đánh nhãn hình ảnh mà tôi đã giải thích ở trên.

## Python cho học máy
Có các thư viện và các frameworks học máy phổ biến cho Python.

Hai trong số đó là **scikit-learn** và **TensorFlow**.
* scikit-learn đi kèm với một số thuật toán học máy phổ biến được tích hợp sẵn (đã đề cập bên trên).
* TensorFlow là một thư viện cấp thấp hơn cho phép bạn xây dựng các thuật toán học máy tùy chỉnh.

Nếu bạn chỉ mới bắt đầu với một dự án học máy, tôi khuyên bạn nên bắt đầu với scikit-learn. Nếu bạn bắt đầu chạy và các vấn đề hiệu năng (efficiency issues), bạn có thể quan tâm đến TensorFlow.

## Tôi nên học machine learning như thế nào?
Để tìm hiểu các nguyên tắc cơ bản về học máy, tôi khuyên bạn nên học các khóa học máy của [Stanford](https://www.coursera.org/learn/machine-learning) hoặc [Caltech](https://work.caltech.edu/telecourse.html).

Lưu ý rằng, bạn cần kiến thức cơ bản về tính toán và đại số tuyến tính để tìm hiểu một số tài liệu trong các khóa học đó.

Sau đó, bạn có thể thực hành những gì bạn đã học được từ một trong những khóa học đó với [Kaggle](https://www.kaggle.com/). ĐÓ là trang web, nơi mà mọi người có thể dùng nhau ganh đua để xây dựng thuật toán học máy tốt nhất cho một vấn đề nhất định. Họ có những tutorials tuyệt vời cho những người bắt đầu.
# Data analysis và data visualization
Để giúp bạn hiểu những điều này có thể trông như thế nào, tôi sẽ cung cấp cho bạn một ví dụ đơn giản tại đây.

Giả sử bạn đang làm việc cho một công ty bán hàng online.

Sau đó, với tư cách là nhà phân tích dữ liệu, bạn có thể vẽ một biểu đồ dạng như thế này

![](https://images.viblo.asia/d0a5092c-2325-46dd-b16e-c515f2dcc697.png)

Từ biểu đồ này, chúng ta có thể nói rằng, nam giới đã mua hơn 400 sản phẩm và phụ nữ mua khoảng 350 sản phẩm vào Chủ Nhật.

Là nhà phân tích dữ liệu, bạn có thể đưa ra một số giải thích cho sự khác biệt này.

Một lời giải thích rõ ràng có thể là sản phẩm này phổ biến hơn với đàn ông hơn là với phụ nữ. Một lời giải thích khác có thể là kích thước mẫu quá nhỏ và sự khác biệt này chỉ gây ra bởi sự tình cờ. Và một lời giải thích khác có thể là đàn ông có xu hướng mua sản phẩm này nhiều hơn vào Chủ Nhật vì một lý do nào đó.

Để hiều được lời giải thích nào là đúng, bạn có thể vẽ một biểu đồ như thế này.
![](https://images.viblo.asia/f926e8cf-3067-4b5c-8c9a-20b98da1b013.png)

Thay vì chỉ hiển thị dữ liệu cho ngày Chủ Nhật, chúng tôi phân tích dữ liệu trong một tuần. Như bạn có thể thấy, từ biểu đồ này, chúng ta có thể thấy sự khác biệt này khá nhất quán trong những ngày khác nhau.

Từ phân tích nhỏ này, bạn có thể kết luận rằng giải thích nhất cho sự khác biệt này là sản phẩm này đơn giản là phổ biến hơn với đàn ông hơn là cho phụ nữ.

Mặt khác, nếu bạn thấy biểu đồ như thế này thì sao?

![](https://images.viblo.asia/d4db0346-eb1d-41ad-a515-96cda957ed6f.png)


Sau đó, điều gì giải thích sự khác biệt vào ngày Chủ Nhật?

Bạn có thể nói, có lẽ đàn ông có xu hướng mua nhiều sản phẩm này chỉ vào Chủ Nhật vì một số lý do. Hoặc, có lẽ nó chỉ là một sự trùng hợp ngẫu nhiên mà đàn ông đã mua nhiều hơn vào ngày Chủ Nhật.

Vì vậy, đầy là một ví dụ đơn giản về phân tích dữ liệu có thể trông như thế nào trong thế giới thực.

Công việc phần tích dữ liệu của tác giả khi làm việc tại Google và Microsoft rất giống với ví dụ này - chỉ phức tạp hơn thôi. Tác giả đã sử dụng Python tại Google cho loại phân tích này và Javascript tại Microsoft.

Tác giả đã sử dụng SQL ở cả hai công ty đó để lấy dự liệu từ cơ sở dữ liệu của họ. Sau đó, sử dụng Python và Matplotlib (tại Google) hoặc JavaScript và D3.js (tại Microsoft) để trực quan hóa (visualize) và phân tích (analyze) dữ liệu này.

## Data analysis / visualization với Python
Một trong những thư viện phổ biến nhất để hiển thị hóa dữ liệu (data visualization) là [Matplotlib](https://matplotlib.org/)

Đó là một thư viện tốt để bắt đầu vì:

* Dễ dàng để bắt đầu
* Một số thư viện khác như [seaborn](https://seaborn.pydata.org/) được dựa trên base của nó. Vì vậy, việc học Matplotlib sẽ giúp bạn tìm hiểu các thư viện này sau này.

### Vậy nên học data analysis / visualization với Python như thế nào?
Trước tiên, bạn phải tìm hiểu các nguyên tắc cơ bản về data analysis và data visualization. Bạn có thể tham khảo video bên dưới.

{@youtube: https://youtu.be/a9UrKTVEeZA}


Bạn cũng có thể đăng ký khóa học về chủ đề này trên [Pluralsight](https://www.pluralsight.com/courses/data-visualization-with-python-introduction?irgwc=1&mpid=1194703&utm_source=impactradius&utm_medium=digital_affiliate&utm_campaign=1194703&aid=7010a000001xAKZAA2), bạn có thể sử dụng miễn phí bằng cách đăng ký bản dùng thử miễn phí 10 ngày của họ.

Sau khi tìm hiểu các nguyên tắc cơ bản về data analysis và data visualization, các nguyên tắc cơ bản về statistics từ các trang web như Coursera và Khan Academy cũng sẽ rất hữu ích.
# Scripting
## Scripting là gì?
Scripting thường đề cập đến việc viết các chương trình nhỏ được thiết kế để tự động hóa các tác vụ đơn giản.

Dưới đây là một ví dụ của tác giả bài viết mà mình dịch
> Tôi từng làm việc tại một công ty nhỏ ở Nhật Bản, nơi chúng tôi có hệ thống hỗ trợ qua email. Đó là một hệ thống để chúng tôi trả lời các câu hỏi mà khách hàng đã gửi cho chúng tôi qua email.

> Khi tôi làm việc ở đó, tôi có nhiệm vụ đếm số lượng email chứa các từ khóa nhất định để chúng tôi có thể phân tích các email mà chúng tôi nhận được.

> Chúng tôi có thể thực hiện nó một cách thủ công, nhưng thay vào đó, tôi đã viết một chương trình đơn giản/tập lệnh đơn giản để tự động hóa tác vụ này. 

> Trên thực tế, chúng tôi đã sử dụng Ruby cho việc này, nhưng Python cũng là một ngôn ngữ tốt cho việc này. Python phù hợp với loại nhiệm vụ này chủ yếu vì nó có cú pháp tương đối đơn giản và dễ viết. Nó cũng nhanh chóng để viết một cái gì đó nhỏ với nó và kiểm tra nó.
> 
# Ứng dụng nhúng
Python hoạt động với Rasberry Pi. Nó có vẻ giống một ứng dụng phổ biến trong số những người có sở thích phần cứng.
# Gaming
Bạn có thể sử dụng thư viện được gọi là PyGame để phát triển trò chơi, nhưng nó không phải là gaming engine phổ biến nhấ trên mạng. Bạn có thể sử dụng nó để xây dựng một dự án mình ưa thích, nhưng bạn không nên chọn nó nếu thực sự nghiêm túc về việc phát triển game.

Thay vào đó, tôi khuyên bạn nên bắt đầu với Unity với C, một trong những game engine phổ biến nhất. Nó cho phép bạn xây dựng một ứng dụng trò chơi cho nhiều nền tảng, bao gồm Mac, Windows, iOS, và Android.

# Ứng dụng desktop
Bạn có thể tạo ra một ứng dụng desktop với Python sử dụng Tkinter, nhưng có vẻ không phải là sự lựa chọn phổ biến nhất.

Thay vào đó, có vẻ như các ngôn ngữ như Java, C và C++ phổ biến hơn cho điều này.

Gần đây, một số công ty đã bắt đầu sử dụng JavaScript để tạo ra các ứng dụng desktop.

Ví dụ, ứng dụng dành cho máy tính để bàn của Slack được xây dựng với thứ gọi là Electron. Nó cho phép bạn xây dựng các ứng dụng desktop với JavaScript.

# Python 3 hay Python 2?
Tôi gợi ý bạn sử dụng Python 3 vì nó hiện đại hơn và là một lựa chọn phổ biến hơn tại thời điểm này.

-----

# Tài liệu tham khảo
https://medium.freecodecamp.org/what-can-you-do-with-python-the-3-main-applications-518db9a68a78

Youtube: https://www.youtube.com/channel/UCxX9wt5FWQUAAz4UrysqK9A