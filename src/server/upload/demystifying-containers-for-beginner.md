## Lời mở đầu
Nếu như bạn là một web developer, hẳn là bạn đã từng nghe đến cụm từ *containers*. Nhiều người nói rằng containers là máy ảo (*virtual machine*) dạng nhỏ, nhưng điều đó có nghĩa là gì, cách thức hoạt động của container ra sao, và tại sao lại phải sử dụng container
Bài viết này sẽ cho tìm hiểu giúp bạn bản chất của container là gì, cách thức hoạt động của container dể bạn có thể hiểu qua về chủ đề này.

## Kernel và OS

Chắc hản bạn cũng đã biết, chiếc máy tính, laptop mà chúng ta sử dụng hàng ngày được cấu tạo bởi những phần cứng như CPU, RAM, ổ cứng, card màn hình, card mạng,... Nhưng để có thể tương tác với các phần cứng này thì bắt buộc phải có một phần mềm trung gian, kết nối phần cứng với những chương trình, phần mềm còn lại trong hệ thống. Phần mềm đảm nhận nhiệm vụ này được gọi là **Kernel**. Kernel có vai trò thiết lập các tiến trình, chương trình, quản lý các thiết bị (đọc và ghi dữ liệu vào bộ nhớ và ổ đĩa,...)

Những phần mềm còn lại của hệ thống, nhờ có sự trợ giúp của kernel mà có thể thực hiện các chức năng khởi động máy, khởi động màn hình làm việc cho người dùng, từ đó có thể chạy các chương trình, tác vụ (trong khi đó các chương trình này cũng liên tục tương tác với kernel).

![](https://images.viblo.asia/ee9fca2a-f401-4d5a-b618-201cd9126da9.png)

## Máy ảo (virtual machine)

Giả sử bạn có một chiếc macbook với hệ điều hành MacOS, nhưng yêu cầu dự án đòi hỏi bạn phải chạy một chương trình chỉ có trên nền tảng Ubuntu. Có lẽ bạn sẽ nghĩ ngay đến việc chạy một máy ảo Ubuntu trên hệ điều hành MacOS, và chạy chương trình của bạn trong máy ảo đó.

Máy ảo (*virtual machine*) được tạo thành khi bạn gộp các thành phần ảo hóa (*virtualization*): kernel ảo và phần cứng ảo, và dựa vào đó chạy một hệ điều hành khách (guest operating system - guest OS). Ở đây chúng ta gọi là *guest OS* vì hệ điều hành chính của bạn là MacOS, còn hệ điều hành phụ  cần để thực hiện một số chương trình nhất định sẽ gọi là hệ điều hnahf khách. Để có thể "ảo hóa" phần cứng và kernel, bạn cần một phần mềm gọi là *hypervisor*, nó sẽ giúp bạn tạo ra ổ đĩa ảo, môi trường mạng ảo, CPU ảo, và một số phần cứng khác nữa. Máy ảo cũng sẽ chứa một *guest kernel* (ý nghĩa tên gọi cũng tương tự như guest OS) để có thể tương tác với các phần cứng ảo

Bạn có thể "host" hypervisor trên một nền tảng nào đó, nghĩa là chạy chương trình hypervisor này trên một hệ điều hành chính (Host OS). Trong ví dụ trên thì Host OS của bạn là MacOS. Ngoài ra thì hypervisor cũng có thể được xây dựng dựa trên việc lắp ghép các phần cứng thật lại với nhau (phần cứng vật lý), và chạy trực tiếp trên máy tính của bạn, thay thế cho Host OS. Tuy nhiên với cả 2 cách này thì Guest OS cũng được cho là tốn tài nguyên, nguồn lực vì phải xây dựng nhiều thành phần phần cứng cũng như kernel.

Bạn sẽ gặp phải nhiều vấn đề khi cần tách biệt máy ảo thành các nhóm chức năng khác nhau trên cùng một máy tính. Máy bạn phải chịu tải rất nhiều và các tiến trình chạy sẽ rất nặng nếu phải chạy một máy ảo cho mỗi nhóm chức năng này, đồng thời cũng lãng phí rất nhiều tài nguyên không cần thiết.

![](https://images.viblo.asia/e2ae7a85-667b-4aa5-a311-25c2f92dc8d1.png)

Nếu số lượng nhóm chức năng tăng lên nhiều lần thì chi phí cố định mà bạn cần để xây dựng một hệ thống máy ảo theo đó cũng sẽ tăng lên theo rất nhiều lần. Ở đây chi phí cố định có thể hiều là nguồn lực cần để xây dựng cơ sở hạ tầng - infrastructure cho một hệ thống) cần cho việc xây dựng, lắp đặt và đưa vào hoạt động một loại máy ảo nào đó.

## cgroups

vào năm 2006, các kỹ sư tại Google đã sáng chế ra tính năng Linux "control groups", viết tắt là *cgroups*. Tính năng này của Linux có khả năng tách biệt các tiến trình và quản lý *resources* (CPU, RAM, ổ cứng, bao nhiêu phần trăm các nguồn lực này sẽ được tiêu thụ) để sử dụng cho các process này.

Những process này có thể nhóm theo *namespaces* khác nhau, tương tự một tập hợp các process có chung giới hạn sử dụng *resource*. Một máy tính có thể có nhiều namespace khác nhau, với thiết lập cấu hình cho từng namespace khác biệt để phù hợp với mục đích sử dụng của chúng. Và cùng với đó thì tài nguyên của máy sẽ được phân bổ dựa trên từng thiết lập cho namespace, để giới hạn cho process chỉ có thể sử dụng một phần CPU, RAM,... Ví dụ như một background process thực hiện việc tạo log cho một ứng dụng nào đó thì sẽ chỉ được cấp một lượng resource nhỏ về ổ cứng, CPU và RAM, nhằm tránh việc ngốn hết tài nguyên mà ứng dụng cần phải sử dụng.

Dù đây không phải tính năng chính thức, *cgroups* vẫn được các nhà phát triển thay đổi, cải thiện để thêm tính năng mới *namespace isolation*, nghĩa là tách biệt cả các namespace. Ví dụ cho tính năng này là tách biệt từng process đơn lẻ để tránh trường hợp share bộ nhớ (RAM)

Cgroup isolation là sự tách biệt cấp cao hơn, nhằm đảm bảo những process trong một namespace cgroup có thể chạy độc lập so với process ở những namespace khác. Một số tính năng cô lập namespace được liệt kê ra dưới đây, và đồng thời cũng là tiền để cho việc sử dụng container:

* PID (Process Identifier) namespace: Dảm bảo những process trong cùng một namespace không liên quan hay bị ảnh hưởng bởi những process thuộc namespace khác
* Network namespaces: Tách biệt phần điều khiển hệ thống network, iptables, routing tables và các công cụ network khác.
* Mount namespaces: Các file hệ thống được mount (thiết lập) để phạm vi của các file hệ thống trong một namespace chỉ được sử dụng cho các folder được mount.
* User namespaces: Giới hạn người dùng trong một namespace, tách biệt với namespace khác, tránh việc trùng ID giữa các user ở namespaces khác nhau.

Nói một cách đơn giản thì có thể coi namespace như một máy tính riêng với các process riêng chạy bên trong nó.


## Linux containers

Linux groups (*cgroup* - như đã nói ở trên là tiền đề cho sự phát triển của công nghệ *linux container* (**LXC**). LXC là sự đột phá về công nghệ mà chúng ta biết đến hiện nay với cái tên container, với cải tiến những điểm mạnh của cgroup và namespace isolation để tạo ra môi trường ảo tối ưu hơn, với các process và không gian mạng tách biệt

## Docker

Ngoài ra thì công nghệ này cho phép tách biệt *user spaces*.
Docket là lựa chọn phổ biến nhất của người dùng khi cần implement công nghệ container, và phần lớn nhiều người khi nhắc đến container là nhắc đến docker. Ngoài ra cố một số lựa chọn khác như **rkt** của CoreOS, thậm chị Google còn tự tạo công cụ container của họ dể sử dụng (**lmctfy**). Docker đã trở thành chuẩn mực của giới developer để áp dụng tính năng *containerization*. Và như đã nói ở trên thì docker cũng được xây dựng dựa trên nền tảng của *cgroup* và *namespace* của nhân Linux.

![](https://images.viblo.asia/174423fc-0861-4cd9-94c4-8cb57065bd30.png)

Một docker container được tạo thành bởi nhiều lớp **images**. Image này có thể hiểu như một đĩa ảo, chứa những bộ phần mềm có sẵn, một ví dụ cho image mà có thể bạn đã gặp là file .iso của một bộ cài hệ điều hành ubuntu. 

Với một docker container, các *images* sẽ được nén lại thành một package. Base image sẽ chứa hệ điều hành của container, và hệ điều hành này có thể là bất cứ gì, không quan trọng Host OS là gì. Guest OS chứa bên trong image không nhất thiết phải là một hệ điều hành hoàn chỉnh. Điểm khác biệt giữa image với một hệ điều hành hoàn chỉnh là nếu như Host OS bao gồm file hệ thống, các đoạn thực thi nhị phân và kernel, thì image chỉ cần file hệ thống và các đoạn code nhị phân.

Và dựa trên base image trên, bạn có thể sử dụng một loạt các images khác nhau, mỗi image là một phần khác nhau của container. Ví dụ như, image với phần mềm `apt-get` sẽ dựa trên image base, còn image chứa application lại dựa trên dependencies của apt-get

Trong hình d ưới đây, có một điểm thú vị là có hai containers với lớp image `a, b, c` và `a, b, d`, bạn chỉ cần lưu một bản copy của mỗi image a, b, c, d rồi đưa lên github. Đây là hình ảnh ví dụ về Docker file *union file* system:

![](https://images.viblo.asia/5ec8af60-00b8-4f1b-aff9-b67e44e2cf14.png)

Mỗi image được xác định bằng một đoạn hash, có thể là một hoặc rất nhiều tầng image tạo nên một container. Tuy nhiên một container lại được chỉ định bởi top-level image của nó, tương đương với việc image cha. Trong hình trên, image 1 và image 2 dùng chung 3 lớp imaeg đầu tiên, nhưng mỗi image lại dùng một số lớp khác nhau nữa.

Khi một container được khởi động, image của nó và các image cha sẽ phải được download từ trên repository về, sau đó sẽ tạo ra cgroup và namespaces và image được sử dụng để xây dựng nên một môi trường ảo. Bên trong container sẽ chỉ tồn tại các files và binaries được định nghĩa tại image. Sau đó process  chính  của container sẽ khởi động và trạng thái của container trở thành "alive"

Ngoài ra thì docker cũng có một số feature thú vị nữa như copy, tạo volumes (volumes là những file hệ thống sử dụng chung cho nhiều containers), docker daemon (quản lý các container trên một máy), quản lý phiên bản repositories (giống như github, nhưng dành cho containers), và nhiều tính năng khác nữa...

![](https://images.viblo.asia/20b5386b-1d5c-4985-9e8e-a3df692f44de.png)

## Tại sao lại nên sử dụng Containers

Ngoài việc tách biệt các process, containers có một số đặc tính khác vô cùng hữu ích.

Containers có chức năng giống như một đơn vị độc lập tách biệt có thể chạy ở bất kỳ đâu mà có hỗ trợ container. Và đối với mỗi *instance* (có thể là máy chủ, OS, máy tính nào đó) thì các container ở mỗi máy sẽ hoàn toàn giống nhau. Hệ điều hành của bạn có thể là CentOS, Ubuntu, MacOS, hay thậm chí là Windowsm, thì bên trong container, hệ điều hành của container sẽ là hệ điều hành được chỉ định qua config của container đó. Vì vậy bạn có thể chắc chắn một điều rằng container được build trên máy cá nhân của bạn cũng có thể hoạt động được trên server.

Ngoài ra, container cũng được chuẩn hóa thành một đơn vị hoạt động, đơn vị tính toán. Một mô hình được sử dụng phổ biến là cho mỗi container chạy trên một web server khác nhau, một cấu trúc database riêng, hay một worker riêng,... Và để ứng dụng có thể scale, bạn chỉ cân scale số lượng container.

Trong mô hình này, mỗi container sẽ được thiết lập một lượng tài nguyên cố định mà nó cho phép sử dụng (CPU, RAM, disk space, số lượng thread,...). Và khi ứng dụng mở rộng, yêu cầu về tài nguyên tăng lên thì số lượng container này sẽ tăng lên thay vì tăng cấu hình cho từng bộ phần CPU, RAM hay disk. Như vậy sẽ giúp các kỹ sư làm việc dễ dàng hơn khi cần mở rộng ứng dụng vì đã bỏ qua các thiết lập phức tạp. 

Container cũng là công cụ vô cùng hữu ích để implement *micro service architecture*, với mỗi mircroservice là một tập hợp các containers bổ trợ cho nhau. Ví dụ như Redis microservice có thể sử dụng một master container và nhiều slave containers.

## Kết luận

Trên đây là những kiến thức giúp bạn có thể hiểu rõ hơn về nguồn gốc xuất hiện của containers, bản chất và cách hoạt động của containers ở mức đơn giản. Hi vọng qua bài viết bạn có thể vận dụng những kiến thức này để áp dụng vào việc sử dụng container một cách rõ ràng, thuần thục hơn.

Cảm ơn đã theo dõi!

Nguồn:

https://medium.freecodecamp.org/demystifying-containers-101-a-deep-dive-into-container-technology-for-beginners-d7b60d8511c1