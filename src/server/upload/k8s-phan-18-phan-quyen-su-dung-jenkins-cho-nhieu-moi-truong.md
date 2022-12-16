# Giới thiệu
Hello mọi người. Trong phần trước mình đã chia sẻ cách **[xây dựng một luồng CICD cơ bản](https://viblo.asia/p/k8s-phan-17-xay-dung-luong-cicd-voi-gitlab-va-jenkins-RnB5pJAGZPG)** để tự động hóa quá trình đưa ứng dụng tới môi trường triển khai (DEV or PRODUCTION).
Nhưng sau khi dựng được các job CICD này thì một câu hỏi đặt ra là phân quyền quản trị và sử dụng các job CICD này với các môi trường khác nhau như thế nào?
Trong bài này mình sẽ chia sẻ cách phân quyền trên Jenkins sử dụng plugin "**Role-based Authorization Strategy**" của Jenkins.
![image.png](https://images.viblo.asia/a422017b-f388-459d-8f65-27073cc9fa4d.png)

Lấy ví dụ cụ thể như sau: Bạn có một hệ thống Jenkins, trên đó bạn đã tạo 2 thư mục riêng chứa các job cho 2 môi trường DEV và PROD là **DEMO_DEV** và **DEMO_PROD**:
![image.png](https://images.viblo.asia/42311c9b-8b7c-4ae5-92a0-557c65fb2f60.png)

Trong mỗi thư mục, bạn đã dựng xong 2 job CICD cho 2 service là **service_A** và **service_B** như sau:

Môi trường DEV:
![image.png](https://images.viblo.asia/def555cf-2681-460b-a9bc-06209f9f2890.png)

Môi trường PROD:
![image.png](https://images.viblo.asia/48b51f8d-29ee-494f-9d9f-69fa0fdd9208.png)

Bài toán đặt ra là sếp muốn cho các bạn nhóm Dev có quyền view và build các job trên môi trường DEV, còn nhóm Devops thì full quyền trên cả 2 môi trường. Vậy phải làm thế nào.

**Có thể mô tả chi tiết yêu cầu như thế này:**

![image.png](https://images.viblo.asia/d83e66a7-8f5e-4d47-95fa-f6167bdcedba.png)



# Ý tưởng thực hiện
Ý tưởng phân quyền trên Jenkin để giải quyết bài toán này đó là sử dụng các **Item Role**. 
Với mỗi môi trường + nhóm quyền ==> Tạo một Item Role.
Ví dụ danh sách Item Role:
- **DEV_View**: Chỉ có quyền **View** đối với các Job ở thư mục **DEMO_DEV** (tương ứng môi trường DEV)
- **DEV_Ope**: Có quyền View và Run với các Job ở thư mục  **DEMO_DEV** (tương ứng môi trường DEV), không có quyền create/update/delete job.
- **DEV_Admin**: Có full quyền với các Job ở thư mục  **DEMO_DEV** (tương ứng môi trường DEV)
- **PROD_View**: Chỉ có quyền View đối với các Job ở thư mục DEMO_PROD (tương ứng môi trường PROD)
- **PROD_Ope**: Có quyền View và Run với các Job ở thư mục DEMO_PROD (tương ứng môi trường PROD) , không có quyền create/update/delete job.
- **PROD_Admin**: Có full quyền với các Job ở thư mục DEMO_PROD (tương ứng môi trường PROD)

Mỗi "môi trường" DEV/PROD sẽ được thể hiện bởi một "Folder" chứa các job của Jenkins. Trong ví dụ này là mình tạo 2 thư mục DEMO_DEV và DEMO_PROD. Cách này giúp ta quản lý và phân quyền dễ dàng hơn. Sau này khi tạo Item Role ta sẽ sử dụng "Pattern" theo format tên của thư mục để chọn môi trường tương ứng. Ví dụ tạo Item Role cho môi trường DEV trong ví dụ này, thì pattern cần cấu hình cho nó là "**DEMO_DEV.\***".

Sau khi tạo xong các Item Role thì ta sẽ tạo User, và User cần quyền nào thì chỉ cần gán Item Role cho user đó là được.
Ví dụ user develope1 cần quyền View và Build được job ở môi trường DEV --> Ta gán Item Role là DEV_Ope. User devops1 có full quyền trên 2 môi trường DEV/PROD thì gán 2 Item Role là DEV_Admin và PROD_Admin. 


# Các bước thực hiện trong bài lab như sau:
- **Chuẩn bị Gitlab:**
    - Mình sử dụng lại repo hôm trước đã dùng để dựng luồng CICD lên K8S và tạo ra các branch mới để cài thành các service tương ứng
    - Môi trường DEV: **DEV_service_A**, **DEV_service_B**
    - Môi trường PROD: **PROD_service_A**, **PROD_service_B**
- **Chuẩn bị K8S:**
    - Tạo 2 namespace là **demo-dev** và **demo-prod** để tương ứng với 2 môi trường
    - Deploy các **service-a**, **service-b** lên 2 namespace **demo-dev** và **demo-prod**
- **Chuẩn bị Jenkins:**
    - Tạo 2 thư mục **DEMO_DEV** và **DEMO_PROD**
    - Trong mỗi thư mục xây dựng luồng CICD tương ứng. Ví dụ **job dev_service_A** sẽ update code từ branch **DEV_service_A**, sau đó build và update vào service **service-a** ở namespace **demo-dev**

- **Thực hiện cài đặt, cấu hình phân quyền trên Jenkins:**

    - Cài đặt plugin "**Role-based Authorization Strategy**" trên Jenkins.
    - Cấu hình các role tương ứng với các thư mục chứa job trên jenkins
    - Tạo các user Dev/Devops và gán vào các Role tương ứng
    - Login vào các user Dev/Devops để xem kết quả

***Rồi, mục tiêu và công việc đã rõ ràng, ta bắt tay vào làm từng việc một.***

## Chuẩn bị Gitlab
Trong bài trước mình đã có 1 repo để demo luồng CICD rồi. Mình tạo ra các branch mới từ branch master.
- Môi trường DEV: Dùng 2 branch **DEV_service_A**, **DEV_service_B**
- Môi trường PROD: Dùng 2 branch **PROD_service_A**, **PROD_service_B**

![image.png](https://images.viblo.asia/ae8eaeaa-5862-4343-b7b7-985526d0c52f.png)

## Chuẩn bị K8S
Trước tiên mình tạo 2 namespace mới là **demo-dev** và **demo-prod**:
```
[sysadmin@vtq-cicd ~]$ kubectl create ns demo-dev
namespace/demo-dev created
[sysadmin@vtq-cicd ~]$ kubectl create ns demo-prod
namespace/demo-prod created
[sysadmin@vtq-cicd ~]$
```
**Và mình đã deploy các service lên các namespace khác nhau như sau:**
![image.png](https://images.viblo.asia/c8dbc347-7179-4866-a4bf-e534cf7e9a45.png)


## Chuẩn bị Jenkins
**Tạo các thư mục và pipeline tương ứng như sau:**
- Folder: **DEMO_DEV**
    - pipeline: **dev_service_A**
    - pipeline: **dev_service_B**
- Folder: **DEMO_PROD**
    - pipeline: **prod_service_A**
    - pipeline: **prod_service_B**

**Theo cách dựng CICD hôm trước, mình dựng xong các job CICD cho 4 service này trên Jenkins như sau**

Môi trường DEV:
![image.png](https://images.viblo.asia/958df04e-6150-4ff1-8aff-1e5c5740726f.png)

Môi trường PROD:
![image.png](https://images.viblo.asia/7dcdde24-d092-4647-a0e6-51f2068c7a4f.png)


## Thực hiện cài đặt, cấu hình phân quyền trên Jenkins
### Cài đặt plugin "**Role-based Authorization Strategy**" trên Jenkins
Để cài đặt plugin này, các bạn vào Manage Jenkins --> Plugin Manager --> Available. Tìm theo tên role-based và chọn pluglin để cài đặt --> Chọn **install without restart**:

![image.png](https://images.viblo.asia/3467f3fe-8608-4f27-b7d7-b7d1528eef1f.png)

Tiếp theo vào Manage Jenkins ==> Configure Global Security ==> Authorization ==> Chọn **Role-Based Strategy** ==> Chọn Apply và Save.

![image.png](https://images.viblo.asia/551f9a5f-2f24-4fd4-8ec6-972cc050fbb5.png)

### Cấu hình các role tương ứng với các thư mục chứa job trên jenkins
Để cấu hình role trên Jenkins các bạn vào Manage Jenkins ==> Manage and Assign Roles ==> Manage Roles.
Trong phần Global roles tạo một role là **login** chỉ cấp quyền read:

![image.png](https://images.viblo.asia/93954be1-b9c4-400b-87e9-482c5f57ecc7.png)

Trong phần Item roles ta tạo các Item Role như mô tả trong phần ý tưởng:

![image.png](https://images.viblo.asia/42738ee3-809c-46dd-96c4-68d1f5876124.png)

**Tiếp đến ta sẽ tạo các user có quyền tương ứng để test:**

```
Các user thuộc nhóm dev: u_dev_view, u_dev_ope, u_dev_admin
Các user thuộc nhóm devops: u_devops_view, u_devops_ope, u_devops_admin
```

**Để tạo user, các bạn vào Manage Jenkins ==> Manage Users ==> Create User:**

![image.png](https://images.viblo.asia/73fe1896-ca90-4c2d-bae8-9c55b3b59d5b.png)

**Kết quả sau khi tạo:**

![image.png](https://images.viblo.asia/8a91cb74-ea6e-4304-8829-53e295cfe056.png)

**Các bạn mở một trình duyệt mới (hoặc tạo profile mới cho trình duyệt) và đăng nhập vào khi chưa gán quyền gì, hệ thống sẽ báo lỗi như sau**

![image.png](https://images.viblo.asia/c0f4890e-3860-4c68-88b3-8484456aaf03.png)


**Tiếp đến phần quan trọng nhất là gán quyền cho user mới tạo**
Các bạn vào phần Manage Jenkins ==> Manage and Assign Roles ==> Assign Roles.
Tại đây trước hết ta gán cho tất cả các user mới tạo một quyền Global Role là Login trước: 

![image.png](https://images.viblo.asia/b19c1fb1-064c-4ff2-ae6d-3a02fd5309c1.png)

**Sau khi gán quyền Read này thì user mới login được vào hệ thống nhưng chưa có quyền xem được gì cả:**
![image.png](https://images.viblo.asia/f285daa1-fef9-43a6-844c-05d071b559d8.png)

**Rồi tiếp tục ta gán Item Role cho user này quyền DEV_View:**

![image.png](https://images.viblo.asia/1ac314c9-1639-4f50-a3bc-98bdb3c70912.png)

**Sau khi gán Item Role "DEV_View"  thì user "u_dev_view" mới thấy được thư mục DEMO_DEV và các job bên trong.**

![image.png](https://images.viblo.asia/3192621a-2a88-457f-ad52-8a8a5b6d0bfd.png)

![image.png](https://images.viblo.asia/3dbb20e8-4516-4a9a-9f4e-7921cc3da1e5.png)

**Tuy nhiên chưa có quyền build hay configure job:**

![image.png](https://images.viblo.asia/de0d289e-6ab0-41c0-b5f3-21f2611b309d.png)

**Giờ ta sẽ gán thêm Item Role là DEV_Ope để user này có quyền build job:**
![image.png](https://images.viblo.asia/639d02bb-04e1-459d-83a3-d6969bc8d7d0.png)

**Kết quả user này đã có thể build được job này:**
![image.png](https://images.viblo.asia/e547777d-ea49-49ac-b41b-c3407cac4d09.png)


Tương tự, giờ ta gán thêm Item Role là **DEV_Admin** để user này có thể thêm/sửa/xóa job:
![image.png](https://images.viblo.asia/c4554e1c-52cf-4fb3-b5c8-1e0062960d28.png)

**Kết quả: User có thêm các quyền như Configure, Rename, Delete Pipeline..:**
![image.png](https://images.viblo.asia/c1483eec-833c-4f29-885d-d1d4bfa16e45.png)

**Như vậy là mình đã demo được cách thức gán quyền cho user. Và để hoàn thành yêu cầu ban đầu thì mình sẽ quyền cho 6 user vừa tạo như sau:**

![image.png](https://images.viblo.asia/afbbd832-6e6c-47f4-a5c9-769091fb1e9b.png)

Như vậy ông **u_devops_admin** có full quyền với 2 môi trường. Các ông **u_dev_ope** có quyền build trên môi trường **DEV**, **u_devops_ope** có quyền build trên **PROD**.

![image.png](https://images.viblo.asia/c4f6bb75-cf18-4d56-a363-c3b70a67ab56.png)

Từ ý tưởng trong bài này, các bạn hoàn toàn có thể tùy biến và phát triển thêm để sử dụng cho hệ thống có nhiều dự án, nhiều môi trường khác nhau.

***Cảm ơn các bạn đã đọc tới đây. Nếu thấy hữu ích thì vui lòng ủng hộ mình bằng cách upvote cho bài viết nhé!***

#viettq #cicd #jenkins #kubernetes #gitlab #node.js #devops