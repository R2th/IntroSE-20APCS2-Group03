# Data warehouse là gì?
Data warehouse (DW) là một cơ sở dữ liệu quan hệ được thiết kế để truy vấn và phân tích hơn là xử lý giao dịch. Nó bao gồm dữ liệu lịch sử thu được từ dữ liệu giao dịch từ một nguồn và nhiều nguồn.

DW cung cấp dữ liệu lịch sử được tích hợp trên toàn doanh nghiệp và tập trung vào việc cung cấp hỗ trợ cho những người ra quyết định trong việc lập mô hình và phân tích dữ liệu.

DW là một nhóm dữ liệu cụ thể cho toàn bộ tổ chức, không chỉ cho một nhóm người dùng cụ thể.

Nó không được sử dụng cho các hoạt động hàng ngày và xử lý giao dịch nhưng được sử dụng để đưa ra quyết định.

DW có thể được xem như một hệ thống dữ liệu với các thuộc tính sau:

Nó là một cơ sở dữ liệu được thiết kế cho các nhiệm vụ điều tra, sử dụng dữ liệu từ các ứng dụng khác nhau.
Nó hỗ trợ một số lượng tương đối nhỏ khách hàng với các tương tác tương đối dài.
Nó bao gồm dữ liệu hiện tại và lịch sử để cung cấp một quan điểm lịch sử của thông tin.
Việc sử dụng nó là đọc chuyên sâu.
Nó chứa một vài bảng lớn.
DW là một kho lưu trữ thông tin theo hướng chủ đề, tích hợp và biến thể theo thời gian để hỗ trợ các quyết định của ban quản lý.”

# Đặc điểm của [Data warehouse](https://indaacademy.vn/khoa-hoc-data-warehouse/)
**Subject-Oriented**
Mục tiêu DW về mô hình hóa và phân tích dữ liệu cho những người ra quyết định. Do đó, thường cung cấp một cái nhìn ngắn gọn và dễ hiểu về một chủ đề cụ thể, chẳng hạn như khách hàng, sản phẩm hoặc bán hàng, thay vì các hoạt động liên tục của tổ chức toàn cầu. Điều này được thực hiện bằng cách loại trừ dữ liệu không hữu ích liên quan đến chủ đề và bao gồm tất cả dữ liệu mà người dùng cần để hiểu chủ đề.
![image.png](https://images.viblo.asia/32c30353-7da7-4f85-b668-902af6223e83.png)

**Integrated**
Data warehouse tích hợp nhiều nguồn dữ liệu không đồng nhất khác nhau như RDBMS, tệp phẳng và hồ sơ giao dịch trực tuyến. Nó yêu cầu thực hiện làm sạch và tích hợp dữ liệu trước khi lưu trữ dữ liệu để đồng bộ về mặt đặt tên, loại thuộc tính, v.v. giữa các nguồn data tổng.
![image.png](https://images.viblo.asia/e66d65d5-b200-4529-b8a0-41109373b1d3.png)

**Time-Variant**
Thông tin lịch sử được lưu giữ trong Data warehouse. Ví dụ, người ta có thể truy xuất các tệp từ 3 tháng, 6 tháng, 12 tháng, hoặc thậm chí dữ liệu trước đó từ một Data warehouse. Các biến thể này với hệ thống giao dịch, nơi thường chỉ lưu trữ tệp mới nhất.
![image.png](https://images.viblo.asia/91798224-8126-4522-9bb0-7e54885e05fe.png)

**Non-Volatile**
Data warehouse là nơi lưu trữ dữ liệu riêng biệt về mặt vật lý, được chuyển đổi từ RDBMS hoạt động nguồn. Các cập nhật hoạt động của dữ liệu không xảy ra trong Data warehouse, tức là các hoạt động cập nhật, chèn và xóa không được thực hiện. Nó thường chỉ yêu cầu hai thủ tục trong truy cập dữ liệu: Tải dữ liệu ban đầu và truy cập dữ liệu. Do đó, DW không yêu cầu khả năng xử lý giao dịch, khôi phục và đồng thời, cho phép tăng tốc đáng kể việc truy xuất dữ liệu. Non-Volatile định nghĩa rằng một khi đã được nhập vào kho và dữ liệu không được thay đổi.
![image.png](https://images.viblo.asia/aa7ad8ce-5d81-4416-850d-cdc6be440fb0.png)

# Mục tiêu của [Data warehouse](https://indaacademy.vn/khoa-hoc-data-warehouse/)
1. Để giúp báo cáo cũng như phân tích
2. Duy trì thông tin lịch sử của tổ chức
3. Làm nền tảng cho việc ra quyết định.
# Data warehouse có cần thiết
Data warehouse là cần thiết vì những lý do sau:
![image.png](https://images.viblo.asia/69cf1ce4-f1ca-49ee-ba9c-6632bddb2ce2.png)

**1) Người dùng doanh nghiệp:** Người dùng doanh nghiệp yêu cầu một Data warehouse để xem dữ liệu tóm tắt trong quá khứ. Vì những người này không phải là kỹ thuật, nên dữ liệu có thể được trình bày cho họ ở dạng cơ bản.

**2) Cửa hàng chào**

Dữ liệu theo giai đoạn: Data warehouse được yêu cầu để lưu trữ dữ liệu biến thời gian trong quá khứ. Đầu vào này được tạo ra để sử dụng cho các mục đích khác nhau.

**3) Đưa ra quyết định chiến lược:** Một số chiến lược có thể phụ thuộc vào dữ liệu trong Data warehouse. Vì vậy, Data warehouse góp phần đưa ra các quyết định chiến lược.

**4) Đối với tính nhất quán và chất lượng của dữ liệu:** Đưa dữ liệu từ các nguồn khác nhau đến một địa điểm chung, người dùng có thể thực hiện một cách hiệu quả để mang lại sự đồng nhất và nhất quán trong dữ liệu.

**5) Thời gian phản hồi cao:** Data warehouse phải sẵn sàng cho các tải và loại truy vấn hơi đột xuất, đòi hỏi mức độ linh hoạt đáng kể và thời gian phản hồi nhanh chóng.

# Các thành phần hoặc các khối xây dựng của Data warehouse
Kiến trúc là sự sắp xếp hợp lý của các yếu tố. Chúng tôi xây dựng một Data warehouse với các thành phần phần mềm và phần cứng. Để phù hợp với yêu cầu của các tổ chức của chúng tôi, chúng tôi sắp xếp tòa nhà này mà chúng tôi có thể muốn tăng cường một phần khác với các công cụ và dịch vụ bổ sung. Tất cả những điều này phụ thuộc vào hoàn cảnh của chúng ta.
![image.png](https://images.viblo.asia/fa6459f0-2749-4099-b409-db6cdaf12390.png)

Hình thể hiện các yếu tố cần thiết của một nhà kho điển hình. Chúng tôi thấy thành phần Dữ liệu nguồn hiển thị ở bên trái. Phần tử dàn dữ liệu đóng vai trò là khối xây dựng tiếp theo. Ở giữa, chúng ta thấy thành phần Data Storage xử lý dữ liệu của các Data warehouse. Yếu tố này không chỉ lưu trữ và quản lý dữ liệu; nó cũng theo dõi dữ liệu bằng cách sử dụng kho siêu dữ liệu. Thành phần Cung cấp thông tin hiển thị ở bên phải bao gồm tất cả các cách khác nhau để cung cấp thông tin từ Data warehouse cho người dùng.

## Thành phần dữ liệu nguồn
Dữ liệu nguồn đi vào Data warehouse có thể được nhóm thành bốn loại lớn:

**Production Data:** Loại dữ liệu này đến từ các hệ điều hành khác nhau của doanh nghiệp. Dựa trên các yêu cầu về dữ liệu trong Data warehouse, chúng tôi chọn các phân đoạn dữ liệu từ các chế độ hoạt động khác nhau.

**Internal Data:** Trong mỗi tổ chức, khách hàng lưu giữ các bảng tính, báo cáo, hồ sơ khách hàng và đôi khi thậm chí cả cơ sở dữ liệu bộ phận “riêng tư” của họ. Đây là dữ liệu nội bộ, một phần có thể hữu ích trong Data warehouse.

**Archived Data:** Các hệ thống hoạt động chủ yếu nhằm mục đích điều hành công việc kinh doanh hiện tại. Trong mọi hệ thống hoạt động, chúng tôi định kỳ lấy dữ liệu cũ và lưu trữ trong các tệp đã đạt được.

**External Data:** Hầu hết các giám đốc điều hành phụ thuộc vào thông tin từ các nguồn bên ngoài cho một tỷ lệ lớn thông tin họ sử dụng. Họ sử dụng số liệu thống kê liên quan đến ngành của họ do bộ phận bên ngoài cung cấp.

## Thành phần cấu trúc dữ liệu
Sau khi chúng tôi đã được trích xuất dữ liệu từ các hệ thống hoạt động khác nhau và các nguồn bên ngoài, chúng tôi phải chuẩn bị các tệp để lưu trữ trong Data warehouse. Dữ liệu được trích xuất từ ​​một số nguồn khác nhau cần được thay đổi, chuyển đổi và sẵn sàng ở định dạng phù hợp để lưu lại cho việc truy vấn và phân tích.
![image.png](https://images.viblo.asia/4a2d6eec-2ce4-41a9-9782-186780fdef82.png)

Bây giờ chúng ta sẽ thảo luận về ba chức năng chính diễn ra trong khu vực tổ chức.

**1) Trích xuất dữ liệu:** Phương pháp này phải xử lý nhiều nguồn dữ liệu. Chúng tôi phải sử dụng các kỹ thuật thích hợp cho từng nguồn dữ liệu.

**2) Chuyển đổi dữ liệu:** Như chúng ta đã biết, dữ liệu cho một Data warehouse đến từ nhiều nguồn khác nhau. Nếu việc trích xuất dữ liệu cho một Data warehouse là thách thức lớn, thì việc chuyển đổi dữ liệu thậm chí còn có những thách thức đáng kể. Chúng tôi thực hiện một số tác vụ riêng lẻ như một phần của quá trình chuyển đổi dữ liệu.

Đầu tiên, chúng tôi làm sạch dữ liệu được trích xuất từ ​​mỗi nguồn. Làm sạch có thể là sửa lỗi chính tả hoặc có thể giải quyết việc cung cấp giá trị mặc định cho các phần tử dữ liệu bị thiếu hoặc loại bỏ các bản sao khi chúng tôi đưa cùng một dữ liệu từ các hệ thống nguồn khác nhau vào.

Tiêu chuẩn hóa các thành phần dữ liệu tạo thành một phần lớn của quá trình chuyển đổi dữ liệu. Chuyển đổi dữ liệu chứa nhiều hình thức kết hợp các phần dữ liệu từ các nguồn khác nhau. Chúng tôi kết hợp dữ liệu từ bản ghi nguồn duy nhất hoặc các phần dữ liệu liên quan từ nhiều bản ghi nguồn.

Mặt khác, chuyển đổi dữ liệu cũng chứa dữ liệu nguồn không hữu ích và tách các bản ghi bên ngoài thành các tổ hợp mới. Việc sắp xếp và hợp nhất dữ liệu diễn ra trên quy mô lớn trong vùng dữ liệu. Khi chức năng chuyển đổi dữ liệu kết thúc, chúng ta có một tập hợp dữ liệu tích hợp được làm sạch, chuẩn hóa và tóm tắt.

**3) Tải dữ liệu:** Hai loại nhiệm vụ riêng biệt tạo thành các chức năng tải dữ liệu. Khi chúng tôi hoàn thành cấu trúc và xây dựng Data warehouse và đi vào hoạt động lần đầu tiên, chúng tôi thực hiện tải thông tin ban đầu vào kho lưu trữ dữ liệu. Tải ban đầu di chuyển khối lượng lớn dữ liệu sử dụng một lượng thời gian đáng kể.

## Thành phần lưu trữ dữ liệu
Lưu trữ dữ liệu cho Data warehouse là một kho lưu trữ chia nhỏ. Data warehouse cho các hệ thống hoạt động thường chỉ bao gồm dữ liệu hiện tại. Ngoài ra, các Data warehouse này bao gồm dữ liệu có cấu trúc được chuẩn hóa cao để xử lý nhanh chóng và hiệu quả.

## Thành phần cung cấp thông tin
Phần tử cung cấp thông tin được sử dụng để cho phép quá trình đăng ký tệp Data warehouse và chuyển nó đến một hoặc nhiều điểm đến theo một số thuật toán lập lịch do khách hàng chỉ định.

## Thành phần siêu dữ liệu
Siêu dữ liệu trong Data warehouse giống như từ điển dữ liệu hoặc danh mục dữ liệu trong hệ quản trị cơ sở dữ liệu. Trong từ điển dữ liệu, chúng tôi giữ dữ liệu về cấu trúc dữ liệu logic, dữ liệu về bản ghi và địa chỉ, thông tin về chỉ mục, v.v.
![image.png](https://images.viblo.asia/fb3c7617-5be2-4e97-b3c0-18ec7a0ce820.png)

Nó bao gồm một tập hợp con dữ liệu toàn công ty có giá trị đối với một nhóm người dùng cụ thể. Phạm vi được giới hạn cho phụ được chọn cụ thể

jects. Dữ liệu trong Data warehouse phải khá hiện tại, nhưng không chủ yếu đến từng phút, mặc dù sự phát triển trong ngành Data warehouse đã làm cho việc lưu trữ dữ liệu tiêu chuẩn và gia tăng trở nên khả thi hơn. Các Data warehouse thấp hơn các Data warehouse và thường chứa tổ chức. Xu hướng hiện tại trong Data warehouse là phát triển một Data warehouse với một số Data warehouse liên quan nhỏ hơn cho các loại truy vấn và báo cáo cụ thể.

## Thành phần quản lý và kiểm soát
Các yếu tố quản lý và kiểm soát điều phối các dịch vụ và chức năng trong Data warehouse. Các thành phần này kiểm soát việc chuyển đổi dữ liệu và chuyển dữ liệu vào Data warehouse lưu trữ. Mặt khác, nó kiểm duyệt việc cung cấp dữ liệu cho khách hàng. Nó hoạt động với hệ thống quản lý cơ sở dữ liệu và cho phép dữ liệu được lưu một cách chính xác vào kho lưu trữ. Nó giám sát sự di chuyển của thông tin vào phương thức dàn dựng và từ đó vào chính các Data warehouse lưu trữ.

# Tại sao chúng ta cần một Data warehouse riêng biệt?
Các truy vấn của Data Warehouse rất phức tạp vì chúng liên quan đến việc tính toán các nhóm lớn dữ liệu ở các mức tóm tắt.

Nó có thể yêu cầu sử dụng cách tổ chức, truy cập và triển khai dữ liệu riêng biệt dựa trên các quan điểm đa chiều.

Thực hiện các truy vấn OLAP trong cơ sở dữ liệu hoạt động làm giảm hiệu suất của các tác vụ chức năng.

Data Warehouse được sử dụng để phân tích và ra quyết định, trong đó cần có cơ sở dữ liệu mở rộng, bao gồm cả dữ liệu lịch sử, mà cơ sở dữ liệu hoạt động thường không duy trì.

Việc tách cơ sở dữ liệu hoạt động khỏi Data warehouse dựa trên các cấu trúc và cách sử dụng dữ liệu khác nhau trong các hệ thống này.

Vì hai hệ thống cung cấp các chức năng khác nhau và yêu cầu các loại dữ liệu khác nhau, nên cần phải duy trì các cơ sở dữ liệu riêng biệt.

# Lợi ích của Data warehouse
* Hiểu xu hướng kinh doanh và đưa ra quyết định dự báo tốt hơn.
* Data warehouse được thiết kế để thực hiện tốt lượng dữ liệu khổng lồ.
* Cấu trúc của Data warehouse dễ tiếp cận hơn cho người dùng cuối để điều hướng, hiểu và truy vấn.
* Các truy vấn phức tạp trong nhiều cơ sở dữ liệu chuẩn hóa có thể dễ dàng hơn để xây dựng và duy trì trong Data warehouse.
* Data warehouse là một phương pháp hiệu quả để quản lý nhu cầu về nhiều thông tin từ nhiều người dùng.
* Data warehouse cung cấp khả năng phân tích một lượng lớn dữ liệu lịch sử.

Trước khi tìm hiểu về Data Warehouse, bạn phải có kiến ​​thức nền tảng về các khái niệm cơ sở dữ liệu cơ bản như lược đồ, mô hình ER, ngôn ngữ truy vấn có cấu trúc, v.v.

Hướng dẫn này sẽ giúp sinh viên khoa học máy tính hiểu các khái niệm cơ bản đến nâng cao liên quan đến lưu trữ dữ liệu.

Học viện [INDAACADEMY](indaacademy.vn) chuyên đào tạo các khóa học về DWH / ETL – Tổng hợp, chuẩn hóa và Xây dựng kho dữ liệu (Cơ bản).