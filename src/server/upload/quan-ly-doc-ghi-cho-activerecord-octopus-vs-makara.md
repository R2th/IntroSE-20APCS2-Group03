Hầu hết các ứng dụng web hiện tại đều sử dụng cơ sở dữ liệu replication khi cài đặt cơ sở dữ liệu cho hệ thống của mình. Nó bao gồm một database master và nhiều bản sao (replicas) được gọi là slaves. Master và slave sử dụng chung dữ liệu và schema, và chúng luôn luôn được giữ trong trạng thái nhất quán. Trong kiến trúc này thì tất cả các thao tác ghi và cập nhật phải được thực hiện trên master. Còn việc đọc sẽ thực hiện trên một hoặc nhiều slaves. Thiết kế này giúp việc ghi vào database nhanh hơn và cải thiện hiệu suất của hệ thống. Nó cũng cung cấp một thiết lập có độ tin cậy và độ sẵn sàng cao. Nếu master database bị lỗi thì việc đọc vẫn có thể tiếp tục từ các slaves.

![](https://images.viblo.asia/f0d74119-cde4-4338-8468-440bc1b81205.png)

Trong ứng dụng Rails, ActiveRecord là một ORM framework, được dùng để kết nối các đối tượng của ứng dụng đến các bảng cơ sở dữ liệu. ActiveRecord cung cấp các adapter cho hầu như tất cả hệ thống cơ sở dữ liệu quan hệ. Tuy nhiên, ActiveRecord không hỗ trợ nhân rộng. Điều đó có nghĩa là, nếu chúng ta sử dụng MySQL làm cơ sở dữ liệu, và ActiveRecord làm adapter thì dù MySQL có hỗ trợ nhân rộng, nhưng ActiveRecord lại không. Như vậy chung quy lại ứng dụng của bạn vẫn không thể đọc từ database slave.

Có một vài loại gem giúp thực hiện việc này, trong đó Octopus và Makara được sử dụng rộng rãi nhất. Dù sử dụng loại gem nào thì mặc định đọc sẽ từ slaves còn, còn ghi vẫn sẽ vào master. Cả 2 loại gem đều thực hiện công việc cơ bản là cho phép đọc từ slaves khá tốt, tuy nhiên bài viết này sẽ so sánh 2 loại gem ở một vài thông số khác và giải thích ngắn gọn để bạn đọc lựa chọn cho phù hợp với mục đích sử dụng.

![](https://images.viblo.asia/88046f74-18c1-42fa-9fec-108374d8de58.jpg)

Giả sử chúng ta có 2 cơ sở dữ liệu A và B. Cả 2 đều theo mô hình master-slave, vì thế A có 2 slaves A1 và A2, còn B có 2 slaves B1 và B2.
# 1. Khi Slave bị lỗi
Giả sử khi đang tạo một query đọc trên database A1 mà A1 bị lỗi, mong muốn là query đó sẽ được chuyển sang A2 hoặc về master A.

Octopus không hỗ trợ việc chuyển hướng sang salve khác hoặc master. Nếu 1 slave đang thực hiện truy vấn mà bị lỗi thì nó sẽ báo lỗi database về cho ứng dụng.

Còn Makara xử lý lỗi của slave bằng cách duy trì một blacklist. Khi 1 slave bị lỗi nó sẽ được cho vào blacklist trong 1 thời gian cụ thể. Trong khi đó query sẽ được thực hiện ở 1 slave khác. Các slave trong blacklist sẽ được thử lại sau khi hết thời gian quy định.

# 2. Replication lag
> Replication lag là độ trễ giữa một thao tác xảy ra trên bản chính và cùng thời gian đó một hành động tương tự được thực hiện trên bản phụ.

Nếu một dữ liệu được ghi vào database A, có thể mất một thời gian trước khi dữ liệu được có sẵn trên các slaves A1 và A2. Rõ ràng đây là một vấn đề.

Octopus không cung cấp bất kỳ một giải pháp nào cho vấn đề này, nhưng có khuyến cáo các query có thể gặp `replication lag` nên được thực hiện trên master thay vì các slaves.

Makara cố gắng giải quyết vấn đề `replication lag` bằng cách sử dụng cookie. Nó là phương thức `stick_to_master!` thêm một cookie sẽ duy trì bối cảnh master trong một thời gian bạn có thể chỉ định (thường thì sẽ dài hơn `replication lag`). Giả sử tôi đang tạo một record bằng một query và muốn ngay lập tức đọc nó trong query tiếp theo, `stick_to_master!` sẽ đảm bảo rằng yêu cầu đọc sẽ đến master chứ không vào các slaves.

# 3. Linh hoạt khi phân phối các lệnh đọc trên master và slave

Cách tốt nhất để giải quyết `replication lag` là query đến master chứ không phải là slave cho các query có thể bị `replication lag`. 

Trong trường hợp này, Octopus config một cách dễ dàng để xác định lệnh đọc nào nên đến master, lệnh nào nên đến slave. Mặc định thì tất cả các lệnh đọc sẽ từ slave, nhưng bằng cách sử dụng phương thức "using(:master)", bạn có thể query từ master. Ngoài ra bạn có thể thay đổi config mặc định, để tất cả các lệnh đọc đều từ master, sau đó sử dụng phương thức "using(:slave)" để query từ slave khi được yêu cầu.

Makara thì không có config linh hoạt như vậy. Mặc định của nó tất cả các lệnh đọc đều từ slave và không thể thay đổi. Tuy nhiên có một nhóm người đã viết một `extension` để thay đổi mặc định này, vì vậy tất cả các lệnh đọc có thể từ master và chỉ những lệnh đặc biệt được chỉ định sẽ từ slave.

# 4. Đọc từ các slaves của nhiều databases.

Với Octopus, không hỗ trợ đọc từ slave của multiple database. Do đó khi bạn cần dữ liệu từ database B, lý tưởng nhất là query đến slave B1 hoặc B2, nhưng không, nó sẽ query thẳng đến master B. 

Còn Makara thì đang hỗ trợ query đến các slaves của multiple databases.

# 5. Xử lý lỗi

Octopus xử lý lỗi không tốt. 

Trong khi đó, Makara định hướng chính mình là một ActiveRecord adapter, nó có thể bắt lỗi từ những database adaptors và xử lý chúng một cách gọn gàng và hợp lý.

# 6. Sự hỗ trợ của cộng đồng

Octopus hoạt động nhiều hơn Makara và có vẻ như cũng được sử dụng nhiều hơn. Vì thế các câu hỏi và các vấn đề đều được giải đáp nhanh hơn. Tuy nhiên Makara cũng đang dần có được một lượng người dùng và nó cũng cố gắng khắc phục những nhược điểm của Octopus.


Trên đây là một vài sự khác nhau của Octopus và Makara. Tùy thuộc vào yêu cầu và độ ưu tiên của bạn trong các vấn đề mà bạn cần chọn một công cụ thích hợp hơn. Happy coding!

# Nguồn
https://ypoonawala.wordpress.com/2015/11/15/octopus-vs-makara-read-write-adapters-for-activerecord-2/

More Reading :

Octopus : http://dandemeyere.com/blog/rails-replication-with-octopus

Makara : http://tech.taskrabbit.com/blog/2013/01/02/makara/