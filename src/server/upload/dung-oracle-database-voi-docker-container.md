### Intro

Oracle cung cấp một [github repository](https://github.com/oracle/docker-images) gồm các cấu hình, images, Dockerfiles cho các sản phẩm của họ, trong đó có Oracle Database.

Chúng ta có thể dụng tài nguyên sẵn có này để dựng Oracle DB trên Docker.

### Clone repo
Github repository mà Oracle cung cấp có kích thước khá lớn, để tiết kiệm thời gian bạn chỉ cần clone phần liên quan đến Oracle Database (single instance), ở đây là thư mục OracleDatabase/SingleInstance.

Do đó, ta sẽ sử dụng [sparse checkout ](https://git-scm.com/docs/git-sparse-checkout) của Git.

#1. Đảm bảo Git của bạn có version 2.2 hoặc cao hơn

git --version

#2. Clone repo

git clone --no-checkout https://github.com/oracle/docker-images

#3. Truy cập thư mục repo

cd docker-images

#4. Cập nhật cấu hình để enable sparse checkout

git config core.sparseCheckout true

#5. Initialize sparse-checkout

git sparse-checkout init --cone

#6. Checkout thư mục Oracle database

git sparse-checkout set OracleDatabase/SingleInstance

#7. Pull data

git checkout
### Build image
#1. Download bản cài đặt oracle database trên website [chính chủ](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html) 

![image.png](https://images.viblo.asia/c1077294-c24c-40d1-b8a6-242a84ab5f53.png)

Move bản cài vào thư mục version tương ứng, ở đây là OracleDatabase/SingleInstance/dockerfiles/<oracle-db-version>
    
![image.png](https://images.viblo.asia/0d286411-d2e8-4ad6-8433-cf21e9c88fc6.png)
    
#2. Khởi tạo image
    
Truy cập thư mục OracleDatabase/SingleInstance/dockerfiles, chạy lệnh build image:
    
```
./buildContainerImage.sh -v <oracle-db-version> -s 
```
    
Kiểm tra image đã được build thành công
    
```
docker images
```
    
### Run container
```
docker run \
--name oracledb \
-p 1521:1521 -p 5500:5500 \
-e ORACLE_PWD=My1passw \
-v ~/db/oracle:/opt/oracle/oradata \
<oracle-image-name>
```
Trong đó:
    
* ORACLE_PWD:  password cho các account SYS, SYSTEM, và PDB_ADMIN. Nếu bạn không khai báo biến này, mật khẩu mặc định sẽ được tự động gen và hiển thị trên màn hình khi khởi tạo container.
    Bạn có thể update password sau khi container đã khởi tạo xong với câu lệnh
    ```
    docker exec [container_name] /opt/oracle/setPassword.sh [new_password]
    ```
* -v ~/db/oracle:/opt/oracle/oradata: mount thư mục chứa dữ liệu oracle db tới thư mục ~/db/oracle. Lưu ý cần đảm bảo user của bạn có toàn quyền read, write, execute với thư mục  ~/db/oracle.

 Container khi khởi tạo xong sẽ hiện log tương tự như hình dưới:
    
 ![image.png](https://images.viblo.asia/8ebef618-2a5a-4a3d-b96d-e8d55574d8fb.png)
    
###  Kết nối thử với database
#1. Check  file ~/db/oracle/dbconfig/ORCLCDB/tnsnames.ora để xem thông tin kết nối
    
 ![image.png](https://images.viblo.asia/3946330b-1346-4c21-a45f-5c92e712d752.png)
    
 #2. Kết nối với database với account SYS, SYSTEM, hoặc PDB_ADMIN, password là giá trị của ORACLE_PWD khi bạn khởi tạo container.
    
 Vậy đấy, chúc mn cài đặt thành công!
###  Link tham khảo
https://eherrera.net/using-oracle-docker-container/