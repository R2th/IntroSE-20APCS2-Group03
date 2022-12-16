Lần này mình muốn chia sẻ lại bài viết của một mobile developer về góc nhìn đối với ML, AI và các bước để một mobile developer bước đầu làm quen với ML, AI.

Gần đây thuật ngữ AI, ML, DL... trở thành những từ khóa hot đối với dân lập trình, bạn là một mobile dev, bạn có thấy căng thẳng với thuật ngữ mới này không? 

Tôi không phải là một nhà khoa học dữ liệu, cũng không phải là một chuyên gia về machine learning. 

Tôi chỉ là một mobile dev tò mò và bắt đầu tìm hiểu về ML. Bài viết này nhằm mục đích chia sẻ, giải thích tất cả những điều tôi biết theo cách mà tôi mong mình được người khác hướng dẫn cho tôi.

Nội dung sẽ chia sẻ những concept cơ bản trong ML, theo một cách dễ hiểu nhất. 

Sau đó nó sẽ giúp bạn làm thế nào để đưa ML vào thực hành với ML-KIT và TensorFlow Lite. Nó sẽ không cung cấp kiến thức khoa học dữ liệu chuyên sâu, nhưng sẽ giúp bạn cách thực hành với tư cách là một mobile dev để bắt đầu tạo ra các ứng dụng thông minh hơn hoặc ứng dụng với khả năng ML.  

# Part 1: Tất cả những điều họ nói về ML
Từ khi sinh ra, con người luôn bị lôi cuốn vào nghiên cứu những hoạt động của thiên nhiên, và làm thế nào để có thể sử dụng nó cho lợi ích của con người. 

![](https://images.viblo.asia/4b807ea2-2b50-44b5-ad85-67372574eb30.jpeg)

Ví dụ như nghiên cứu cấu tạo của loài chim để thiết kế ra máy bay

![](https://images.viblo.asia/f5f7c770-5e75-439b-aabb-9712254d4294.jpeg)

Nghiên cứu loài dơi và cá heo để tạo ra các máy truyền sóng từ nhằm múc đích phát hiện vật thể dưới nước hoặc trong bóng tối.

![](https://images.viblo.asia/0bfb3300-c712-4659-b60a-4d4e7c5a49ab.png)

Có một con chim đáng yêu rất nhỏ được gọi là King Fisher. Nó có khả năng bay rất nhanh, lặn được trong nước, bắt một con cá và bay lên mà nhanh đến nỗi không làm chú cá giật mình. Đó là nhờ cấu trúc của mỏ và đầu. Các nhà khoa học đã lấy cảm hứng từ chú chim này để nghiên cứu ra tàu cao tốc.


Và khi con người muốn tạo ra một cỗ máy có thể học được, có thể lấy dữ liệu, tổng hợp dữ liệu và đưa ra các quyết định. Họ có thể sử dụng những gì từ tự nhiên để làm nó. Bạn đoán xem? Đó chính là não bộ của con người.

![](https://images.viblo.asia/fba16806-79dd-49d5-8a88-c45643e870e1.png)

# Làm thế nào để bộ não học
Như các bạn đã biết, não của chúng ta chứa rất nhiều tế bào thần kinh, mỗi tế bào thần kinh là một hạt, về cơ bản nó là một mẩu thông tin nhỏ, một chút dữ liệu.

Chúng ta có bao nhiêu hạt đó? Khoảng 100 tỷ! Nghe có vẻ rất nhiều đúng không. Để dễ hình dung hơn nếu bạn lấy 100 tỷ tờ giấy xếp chồng lên nhau bạn sẽ có một cái cột cao khoảng 8500 km.

Một nơ-ron thần kinh, một chút data, không có ý nghĩa gì nhiều. Nó giống như một chữ cái trong một trang sách, khi không nằm trong ngữ cảnh, nó đơn giản là không có ý nghĩa gì nhiều. Một chữ cái được kết nối với nhiều chữ cái khác để tạo thành một từ. Một từ lại được kết nối với nhiều từ khác để tạo thành một câu, và một câu được kết nối với nhiều câu khác để tạo thành một cuốn sách. Khi đó cuốn sách đó đã mang lại rất nhiều ý nghĩa.

Cũng giống như vậy, các nơ-ron, các bit thông tin của chúng ta có khuynh hướng kết nối với các nơ-ron khác trong cùng bối cảnh, trong một kết nối vật lý thực tế, được gọi là các khớp thần kinh (synapse). Một nơ-ron có khoảng 10k-40k kết nối. Các nơ-ron thần kinh được kết nối tạo thành một mạng lưới trong bộ não của chúng ta, chúng được gọi là mạng thần kinh (Neural Network). 

Đối với mỗi một kỹ năng hoặc thói quen, chúng ta có một vùng các nơ-ron để điều khiển thông tin cho kỹ năng đó. Bằng cách này, chúng ta đã có những vùng để chơi guitar, có vùng để tập yogar, một vùng để lập trình Android-iOs :D

Bất cứ khi nào bạn học một cái gì đó mới, một nơ-ron được chỉ định và sẽ kết nối với các nơ-ron liên quan khác. Các bạn cũng nên nhớ số nơ-ron này không phải là vô hạn nên hãy dùng cẩn thận nó nhé!

Dưới đây là một video thực tế về quá trình học một cái gì đó mới của bộ não con người. Một kết nối mới được tạo ra giữa các nơ-ron. Thật tuyệt vời đúng ko?


{@embed: https://www.youtube.com/embed/-qIvvd2nFqI}

Đó là một chút về những gì xảy ra trong não bộ của chúng ta. Vậy câu hỏi là, làm thế nào để chúng ta có thể chuyển nó thành một cỗ máy, và làm cho máy học giống như não bộ của chúng ta.

Trong bài tiếp theo tôi sẽ trình bày một ví dụ cụ thể, để làm cho các khái niệm trở nên dễ hiểu và có tính hữu hình hơn. Nó sẽ rất đơn giản!

Nguồn: 

https://www.youtube.com/watch?v=8YDt2J7dHXA

https://medium.com/google-developer-experts/https-medium-com-britt-barak-whos-afraid-of-ml-part1-e464264c3cf0