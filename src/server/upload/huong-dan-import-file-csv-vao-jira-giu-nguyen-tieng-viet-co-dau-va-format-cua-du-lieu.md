Jira là công cụ để quản lý dự án, kiểm soát và theo dõi các vấn đề xảy ra trong dự án, quản lý lỗi, tính năng, công việc, những cải tiến hoặc bất kỳ vấn đề gì.
<br>
<br>
Với nhiều tiện ích như đã nêu trên, Jira đang trở thành công cụ phổ biển trong các dự án phát triển phần mềm.
<br>
<br>
Việc chuyển giao những dữ liệu dự án đang được quản lý trên các công cụ khác sang Jira sẽ trở nên nhanh chóng và tiện lợi hơn với tiện ích **[Improt issue from CSV]**
<br>
<br>
Tuy nhiên, định dạng file CSV không hỗ trợ tiếng việt có dấu hoặc format của dữ liệu như enter, bold, ...
<br>
<br>
Vậy làm sao để import file CSV vào Jira giữ nguyên tiếng việt có dấu và format của dữ liệu?


### 1. Hướng dẫn giữ nguyên tiếng việt có dấu khi import:

**Dưới đây là các bước giúp tạo file .csv sẽ import vào Jira vẫn giữ nguyên được định dạng tiếng việt có dấu mà không bị lỗi font chữ.**
<br>
<br>
**STEP 1:** Chuẩn bị file excel gồm các dữ liệu, trường cần import

**STEP 2:** Trong file excel chọn 

File > Save as > Unicode text (.txt) > Save file

**STEP 3:** Mở file vừa tạo bằng Notepad/ Notepad ++

**STEP 4:** Ngăn cách các trường dữ liệu bằng dấu "," và " "" "

![](https://images.viblo.asia/984fce20-3d74-4708-98d3-4602ff014983.png)

**STEP 5:** Save as file dưới định dạng Encoding là UTF-8

![](https://images.viblo.asia/acd8ac74-c355-429b-94ec-9acb2b1b233d.png)

**STEP 6:** Rename file từ .txt thành .csv

*(trước đó nhớ chọn trên tab công cụ View > check vào check box "File name extentions")*


### 2. Hướng dẫn giữ nguyên format của dữ liệu khi import:

**Để giữ nguyên format của dữ liệu sử dụng các kí hiệu theo quy chuẩn**

*(Text Formatting Notation Help)*

*Ví dụ:*

*- Xuống dòng bằng kí hiệu "\\"*

*- Bold bằng kí hiệu " * *"*

*- ...*

Chi tiết kí hiệu lấy theo hướng dẫn ở ảnh dưới:

![](https://images.viblo.asia/3a4a6af6-cb70-4077-80b0-3cffcdc44309.png)

### 3. Hướng dẫn import file CSV vào Jira:

**STEP 1:** Chuẩn bị file .csv cần import

![](https://images.viblo.asia/9e99e42d-2e7b-456a-afa3-25d0a13593e0.png)

`Title,Description`

`"[Bug] Mô tả bug thứ nhất","*[Step]* \\1.Step thứ nhất \\2.Step thứ hai \\ *[Actual]* \\Hiện trạng bug \\ *[Expected]* \\Kết quả mong đợi"`

`"[Bug] Mô tả bug thứ hai","*[Step]* \\1.Step thứ nhất \\2.Step thứ hai \\ *[Actual]* \\Hiện trạng bug \\ *[Expected]* \\Kết quả mong đợi"`
<br>
<br>
*Ghi chú: Các trường có thể map trong jira khi import bao gồm các field như hình dưới:*

![](https://images.viblo.asia/05350786-5722-4dbd-8ac3-ae60b2fd2975.png)![](https://images.viblo.asia/20f4edde-9c87-4060-b0c3-fa4b9e57bc79.png)

**STEP 2:** Trên Jira, thực hiện theo hướng dẫn

![](https://images.viblo.asia/9f0c5bef-a29d-4ef6-99be-013692e8822c.png)

![](https://images.viblo.asia/c0533567-a073-483d-84f7-c45c0288bad3.png)

![](https://images.viblo.asia/4346b986-a4b7-4def-b2fd-e8162ab955ec.png)

![](https://images.viblo.asia/2eb70bf7-a0e1-4230-83b2-3730893d8121.png)

![](https://images.viblo.asia/7370c273-8c73-4a81-ab81-bd9b07a44162.png)

**Như vậy là đã hoàn thành việc import thành công 2 bản ghi tương ứng đã tạo ở STEP 1**

*(Với font tiếng việt có dấu và format của dữ liệu được giữ nguyên)*
<br>
<br>
<br>
***Chúc các bạn thành công!***