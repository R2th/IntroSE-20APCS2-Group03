### 1. Data Management
Các công cụ quản lý dữ liệu mã nguồn mở được sử dụng rộng rãi nhất hiện nay:
* Các cơ sở dữ liệu quan hệ như MySQL và PostgreSQL.
* Cơ sở dữ liệu NoQuery như MongoDB Apache CouchDB và Apache Cassandra
* Các công cụ dựa trên tệp như hệ thống tệp Hadoop hoặc hệ thống tệp đám mây như Ceph. Elaticsearch chủ yếu được sử dụng để lưu trữ dữ liệu văn bản và tạo chỉ mục tìm kiếm để truy xuất tài liệu nhanh. 

### 2. Data Integration and transformation
Nhiệm vụ tích hợp và chuyển đổi dữ liệu trong thế giới kho dữ liệu được gọi là ETL, là viết tắt của "Extract, Transform, Load" - trích xuất, biến đổi và tải. 
Ngày nay, các nhà khoa học dữ liệu thường đề xuất thuật ngữ "ELT" - trích xuất, tải, biến đổi, nhấn mạnh thực tế là dữ liệu được đổ ở đâu đó và kỹ sư dữ liệu hoặc nhà khoa học dữ liệu mà chính họ chịu trách nhiệm về dữ liệu. 
Một thuật ngữ khác cho quá trình này là: "data refinery and cleansing." 

Dưới đây là các công cụ tích hợp và chuyển đổi dữ liệu nguồn mở được sử dụng rộng rãi nhất: 
* Apache Airflow, ban đầu được tạo bởi Airbnb; 
* Kubeflow, cho phép bạn thực hiện các đường ống khoa học dữ liệu trên đỉnh Kubernetes; 
* Apache Kafka, có nguồn gốc từ LinkedIn; 
* Apache Nifi, nơi cung cấp một trình soạn thảo trực quan rất đẹp; 
* Apache Sparksql (cho phép bạn sử dụng ANSI SQL và chia tỷ lệ để tính toán các cụm của 1000 nút) và Nodered, cũng cung cấp một trình soạn thảo trực quan. 
* Nodered tiêu thụ rất ít tài nguyên đến nỗi nó thậm chí chạy trên các thiết bị nhỏ như Raspberry Pi. 

### 3. Data Visualization
Bây giờ mình sẽ giới thiệu các công cụ trực quan hóa dữ liệu nguồn mở được sử dụng rộng rãi nhất. 
Mình sẽ phải phân biệt giữa các thư viện lập trình nơi bạn cần sử dụng code và tools có chứa giao diện người dùng. 
* Hue, có thể trực quan hóa từ các truy vấn SQL. 
* Kibana, một ứng dụng web khám phá và trực quan hóa dữ liệu, được giới hạn trong Elaticsearch (bên cung cấp dữ liệu). 
* Apache SuperSet là một ứng dụng web khám phá và trực quan hóa dữ liệu. 

### 4. Model Deployment
Triển khai mô hình là vô cùng quan trọng. Khi bạn đã tạo ra một mô hình học máy có khả năng dự đoán một số khía cạnh trong tương lai, bạn nên làm cho mô hình đó có thể sử dụng bởi các nhà phát triển khác và biến nó thành API. 
* Apache Prediction IO hiện chỉ hỗ trợ các mô hình Apache Spark ML để triển khai, nhưng hỗ trợ cho tất cả các loại thư viện khác nằm trên roadmap. 
* Seldon là một sản phẩm thú vị vì nó hỗ trợ gần như mọi framework, bao gồm Tensorflow, Apache Sparkml, R và Scikit-Learn. Seldon có thể chạy trên Kubernetes và Redhat OpenShift. 
* Một cách khác để triển khai các mô hình SparkML là sử dụng MLEAP. 
* Cuối cùng, TensorFlow có thể phục vụ bất kỳ mô hình nào của nó bằng dịch vụ TensorFlow. Bạn có thể triển khai đến một thiết bị nhúng như Raspberry Pi hoặc điện thoại thông minh sử dụng TensorFlow Lite và thậm chí triển khai cho trình duyệt web bằng Tenorflow Dot JS. 

### 5. Model Monitoring and assessment
Giám sát mô hình là một bước quan trọng khác. Khi bạn đã triển khai mô hình học máy, bạn cần theo dõi hiệu suất dự đoán của nó khi dữ liệu mới đến để duy trì và thay đổi các mô hình lỗi thời. 
Sau đây là một số ví dụ về các công cụ giám sát mô hình: 
ModelDB là một siêu dữ liệu mô hình máy nơi thông tin về các mô hình được lưu trữ và có thể được truy vấn. Nó được hỗ trợ bởi Apache Spark ML Pipelines và Scikit-learn. 
Prometheus cũng được sử dụng rộng rãi để theo dõi mô hình học máy, mặc dù nó không được thực hiện cụ thể cho mục đích này. Hiệu suất mô hình không được đo lường độc quyền thông qua độ chính xác. 
Bộ công cụ nguồn mở IBM AI Fairness 360 thực hiện chính xác điều này. Nó phát hiện và giảm thiểu sự thiên vị trong các mô hình học máy. Các mô hình học máy, đặc biệt là các mô hình học tập sâu dựa trên mạng lưới thần kinh, có thể phải chịu các cuộc tấn công, trong đó kẻ tấn công cố gắng đánh lừa mô hình với dữ liệu bị thao túng hoặc bằng cách thao tác với chính mô hình.  IBM AI Fairness 360 có thể được sử dụng để phát hiện tính dễ bị tổn thương đối với các cuộc tấn công bất lợi và giúp làm cho mô hình mạnh mẽ hơn. Các chế độ học máy thường được coi là một hộp đen áp dụng một số "ma thuật" bí ẩn.  IBM AI Fairness 360 làm cho quá trình học máy dễ hiểu hơn bằng cách tìm các ví dụ tương tự trong bộ dữ liệu có thể được trình bày cho người dùng để so sánh thủ công

### 6. Code asset Management
Các tùy chọn cho các công cụ quản lý code đã được đơn giản hóa rất nhiều. Đối với quản lý code - còn được gọi là quản lý phiên bản hoặc kiểm soát phiên bản - Git hiện là tiêu chuẩn:
* Nhiều dịch vụ đã xuất hiện để hỗ trợ Git, với sự nổi bật nhất là GitHub, nơi cung cấp lưu trữ để quản lý phiên bản phát triển phần mềm. 
* Á quân chắc chắn là Gitlab, có lợi thế là một nền tảng nguồn mở hoàn toàn mà bạn có thể lưu trữ và quản lý chính mình. 
* Một lựa chọn khác là Bitbucket. Quản lý tài sản dữ liệu, còn được gọi là quản trị dữ liệu hoặc dòng dữ liệu, là một phần quan trọng khác của khoa học dữ liệu cấp doanh nghiệp. Dữ liệu phải được phiên bản và chú thích bằng siêu dữ liệu. 
* Apache Atlas là một công cụ hỗ trợ nhiệm vụ này. 
* Một dự án thú vị khác, ODPI Egeria, được quản lý thông qua Linux Foundation và là một hệ sinh thái mở. Nó cung cấp một tập hợp các API mở, loại và giao thức trao đổi mà các kho lưu trữ siêu dữ liệu sử dụng để chia sẻ và trao đổi dữ liệu. 
* Cuối cùng, KYLO là một nền tảng phần mềm quản lý hồ dữ liệu nguồn mở cung cấp hỗ trợ rộng rãi cho một loạt các nhiệm vụ quản lý tài sản dữ liệu. Điều này kết thúc phần một của loạt hai phần này. Bây giờ chúng ta hãy chuyển sang phần hai.

### 7. Development Enviroment
Một trong những môi trường phát triển phổ biến nhất hiện nay mà các nhà khoa học dữ liệu đang sử dụng là "Jupyter". Jupyter lần đầu tiên nổi lên như một công cụ để lập trình Python tươhttps://viblo.asia/posts/3P0lP8W8lox/settings/seong tác. Bây giờ nó hỗ trợ hơn một trăm ngôn ngữ lập trình khác nhau thông qua "kernels".  Các kernels Jupyter đang đóng gói các phiên dịch tương tác khác nhau cho các ngôn ngữ lập trình khác nhau. Một thuộc tính chính của Jupyter là khả năng thống nhất tài liệu, mã, đầu ra từ mã, lệnh shell và trực quan hóa thành một tài liệu. 
Jupyterlab là thế hệ tiếp theo của Jupyter Notebooks và về lâu dài, thực sự sẽ thay thế Jupyter. Những thay đổi kiến trúc được giới thiệu trong Jupyterlab làm cho Jupyter hiện đại và mô -đun hơn. Từ góc độ của người dùng, sự khác biệt chính được giới thiệu bởi JupyterLab là khả năng mở các loại tệp khác nhau, bao gồm Jupyter, dữ liệu và thiết bị đầu cuối. Sau đó, bạn có thể sắp xếp các tệp này trên khung vẽ.
Mặc dù Apache Zeppelin đã được làm lại hoàn toàn, nhưng nó được lấy cảm hứng từ Jupyter Notebook và cung cấp trải nghiệm tương tự. Một điểm khác biệt quan trọng là khả năng vẽ sơ đồ tích hợp. Trong Notebook Jupyter, bạn được yêu cầu sử dụng các thư viện bên ngoài trong Apache Zeppelin và âm mưu không yêu cầu mã hóa. Bạn cũng có thể mở rộng các khả năng này bằng cách sử dụng các thư viện bổ sung. 
RSTUDIO là một trong những môi trường phát triển lâu đời nhất về thống kê và khoa học dữ liệu, đã được giới thiệu vào năm 2011. Nó chỉ chạy R và tất cả các thư viện R được liên kết. Tuy nhiên, với sự phát triển của Python, nó đã được R  tích hợp chặt chẽ vào công cụ này để cung cấp trải nghiệm người dùng tối ưu. RSTudio hợp nhất lập trình, thực thi, gỡ lỗi, truy cập dữ liệu từ xa, khám phá dữ liệu và trực quan hóa thành một công cụ duy nhất. 
Spyder cố gắng bắt chước các thao tác của Rstudio để đưa chức năng của nó vào thế giới Python. Mặc dù Spyder không có cùng mức độ chức năng như rstudio, các nhà khoa học dữ liệu coi đó là một giải pháp thay thế. 

### 8. Excution Enviroment
Đôi khi dữ liệu của bạn không phù hợp với dung lượng lưu trữ hoặc dung lượng bộ nhớ chính của một máy tính. Từ đó mà Cluster execution environments xuất hiện:
* Cluster-computing framework Apache Spark là một trong những dự án Apache được sử dụng trên tất cả các ngành công nghiệp. Thuộc tính chính của Apache Spark là khả năng mở rộng tuyến tính. Điều này có nghĩa là, nếu bạn tăng gấp đôi số lượng máy chủ trong một cụm, bạn cũng sẽ tăng gấp đôi hiệu suất của nó. 
* Sau khi Apache Spark bắt đầu đạt được thị phần, Apache Flink đã được tạo ra. Sự khác biệt chính giữa Apache Spark và Apache Flink là Apache Spark là công cụ xử lý dữ liệu hàng loạt, có khả năng xử lý một lượng lớn tệp dữ liệu theo tệp. Apache Flink, mặt khác, là một hình ảnh xử lý luồng, với trọng tâm chính của nó là xử lý các luồng dữ liệu thời gian thực. Mặc dù động cơ hỗ trợ cả hai mô hình xử lý dữ liệu, Apache Spark thường là sự lựa chọn trong hầu hết các trường hợp sử dụng. 
* Một trong những phát triển mới nhất trong môi trường thực hiện khoa học dữ liệu được gọi là "Ray", nơi tập trung rõ ràng vào đào tạo mô hình học tập sâu quy mô lớn. Hãy xem xét các công cụ nguồn mở cho các nhà khoa học dữ liệu được tích hợp đầy đủ và trực quan. Với các công cụ này, không có kiến thức lập trình nào là cần thiết. Hầu hết các nhiệm vụ quan trọng được hỗ trợ bởi các công cụ này; Các nhiệm vụ này bao gồm tích hợp dữ liệu, chuyển đổi, trực quan hóa dữ liệu và xây dựng mô hình. 
* Knime có nguồn gốc từ Đại học Konstanz vào năm 2004. Knime có giao diện người dùng trực quan với các khả năng kéo và thả. Nó cũng có khả năng trực quan tích hợp. Knime có thể được mở rộng bằng cách lập trình trong R và Python, và có các kết nối với Apache Spark. 

#### Tham khảo từ quyển Getting Started with Data Science của IBM