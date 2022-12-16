![image.png](https://images.viblo.asia/4576e797-7f60-482a-bb42-5b97c36b8005.png)
# Tại sao lại sử dụng Laravel Service và Repository Pattern?

Có rất nhiều cách mà laravel có thể xây dựng chức năng CRUD. Nhưng cá nhân tôi đề xuất mô hình service-repository design pattern bởi vì nó clear và bền. Khái niệm về repositories and services đảm bảo rằng bạn viết mã có thể sử dụng lại và giúp giữ cho controller của bạn càng đơn giản càng tốt, làm cho chúng dễ đọc hơn.

Repositories thường là một trình bao bọc chung cho mô hình của bạn và là nơi bạn sẽ viết các truy vấn khác nhau trong cơ sở dữ liệu của mình. Mặt khác, một Service là một lớp để xử lý tất cả logic của ứng dụng của bạn. Dựa trên kinh nghiệm, sẽ thực sự hữu ích khi tách biệt logic và trình bao bọc của mô hình, đặc biệt là khi bạn đang làm việc trong nhóm hoặc các dự án lớn.

Để minh họa Service và Repository, chúng tôi sẽ xây dựng một ứng dụng CRUD.

Để bắt đầu, hãy thiết lập Model, Controller và Migration bằng cách thực hiện:
> php artisan make:model Post -mcr

- -m:  --migration tạo mới file migration
- -c: --controller  tạo mới file controller
- -r: --resource để chỉ định controller có tài nguyên hay không

![image.png](https://images.viblo.asia/50fd853e-5924-48ee-9e8a-4b940dbc9000.png)

### Route
![image.png](https://images.viblo.asia/00ec7e88-089c-450c-be17-6de84d8131d3.png)
### Model
![image.png](https://images.viblo.asia/e1f1a287-9278-4fad-8161-a45f5c06a64a.png)
### Migration
Sau đó, update post migration như bên dưới rồi thực hiện:
> php artisan migrate

![image.png](https://images.viblo.asia/e582b64b-82af-4b83-97d7-ce2bee7ee65f.png)
### Repository
Laravel không có lệnh tạo repository. Bạn phải làm điều đó bằng tay. Chỉ cần tạo một thư mục Repositories, sau đó thêm file PostRepository và thêm code bên dưới.
![image.png](https://images.viblo.asia/b4eec811-1d82-4a6b-b390-3b38b15901f3.png)
Gọi model Post trong hàm tạo (construct)

### Service
Giống như Repository, laravel không có lệnh tạo Service. Tạo thư mục Services, thêm file PostService và thêm code bên dưới.
![image.png](https://images.viblo.asia/24001d54-99a4-4b97-a900-707829518127.png)
Gọi PostRepositoryt trong hàm tạo (construct) của class PostService.

Bây giờ chúng ta đã hoàn tất việc thiết lập Service và Repository. Hãy tiếp tục tạo CRUD.

### Create
PostController -> PostService -> PostRepository
![image.png](https://images.viblo.asia/6ded00dc-f383-4c46-90a2-5cfa6d6e6d65.png)
$this->postService->savePostData($data) phần này gọi hàm savePostData trong post service.

Trong post service, xác nhận dữ liệu. Nếu không có lỗi, $this->postRepository->save($data); - Gọi function save trong post repository để lưu dữ liệu trong database.
![image.png](https://images.viblo.asia/d50a41c3-0b6c-4ec0-90fa-b39783010df7.png)
![image.png](https://images.viblo.asia/1965797d-9c57-4eb4-8314-a8a4650d2313.png)

Nếu có lỗi, chẳng hạn như khi không nhập tiêu đề, thì điều này sẽ được hiển thị khi thực thi trong postman.
![image.png](https://images.viblo.asia/90711c52-8cbb-4bcf-be6e-1cf0a56dabaf.png)

### Read
1. GetAllData

![image.png](https://images.viblo.asia/50f5185d-c199-4237-94af-f6d8c260e06d.png)
![image.png](https://images.viblo.asia/2d590e88-ef3b-47e3-a0ac-f266395f0b75.png)
![image.png](https://images.viblo.asia/92ac4dcc-c33e-4a12-b4eb-2786bd83dc6b.png)

2. GetById

![image.png](https://images.viblo.asia/62487f4f-8bd6-4a14-9528-ef53d6c6e04d.png)
![image.png](https://images.viblo.asia/0e6c54ec-32d6-43b7-af8e-489c738ac543.png)

### Update

![image.png](https://images.viblo.asia/25ae3e6f-8de6-4bd8-8f7e-605edeae91ff.png)
![image.png](https://images.viblo.asia/cbabf8a8-b492-4b0d-a4bc-d68ae56e521f.png)
![image.png](https://images.viblo.asia/bef102f4-5317-449b-992a-21c69b0b7ecb.png)

### Delete

![image.png](https://images.viblo.asia/30ad9567-b547-460b-a8f2-5e91cea48967.png)
![image.png](https://images.viblo.asia/e9792f15-d7f1-47b0-ace9-e82df1f3f489.png)

# Kết luận
Hy vọng chỉ cần nhìn vào ảnh chụp màn hình, bạn đã có thể thấy mô hình và sau đó bạn có thể dễ dàng hiểu tại sao laravel service-repository pattern lại clear và bền vững.

# Nguồn
- https://dev.to/jsf00/implement-crud-with-laravel-service-repository-pattern-1dkl/