### 1. Giới thiệu.
* Trong bài này, chúng ta sẽ tìm hiểu về hai khái niệm quan trọng khác đó là: biến (Variable) và hằng số (Constant) trong Java.

### 2. Variable (Biến)
#### 2.1 Khái niệm
* Biến là tên gọi của một vùng nhớ dùng để lưu trữ giá trị mà chương trình của chúng ta cần sử dụng.
* Mỗi biến trong Java bao gồm 3 phần sau: tên biến, kiểu dữ liệu và giá trị.
    * Tên biến: là do bạn đặt và bạn nên đặt làm sao cho ngắn gọn, khái quát lên được ý nghĩa của biến đó.
    * Kiểu dữ liệu: dùng để xác định kích thước và loại giá trị có thể được lưu trữ.
    * Giá trị: là dữ liệu thực tế được lưu trữ trên biến và có thể thay đổi được.
* Trong Java có 3 loại biến thường gặp:
    * Local variable (biến cục bộ),
    * Instance variable (thuộc tính)
    * Static variable (biến tĩnh)
* Có 2 cách khai báo biến trong Java:
    * Cách 1: `[kiểu_dữ_liệu] [tên_biến];`
    ```
    int age;
    String fistName;
    String lastName;
    ```

    * Cách 2: `[kiểu_dữ_liệu] [tên_biến] = [giá_trị];`
    ```
    int age = 20;
    String fistName = "A"
    String lastName = "Nguyễn Văn"
    ```
    
#### 2.2 Local variable (biến cục bộ).
* Local variable được khai báo trong các phương thức, hàm contructor hoặc trong các block.
* Biến cục bộ được tạo bên trong các phương thức, contructor, block và sẽ bị hủy khi kết thúc các phương thức, contructor và block.
* Không được sử dụng “access modifier” khi khai báo biến cục bộ.
* Các biến cục bộ sẽ nằm trên vùng bộ nhớ stack của bộ nhớ.
* Bạn cần khởi tạo giá trị mặc định cho biến cục bộ trước khi có thể sử dụng.

![Screen Shot 2022-08-06 at 15.00.01.png](https://images.viblo.asia/5d4bcf8a-d934-45d4-9ad7-1f5f8226d534.png)

#### 2.3 Instance variable (biến toàn cục).
* Biến instance được khai báo trong một lớp(class), bên ngoài các phương thức, constructor và các block.
* Biến instance được lưu trong bộ nhớ heap.
* Biến instance được tạo khi một đối tượng được tạo bằng việc sử dụng từ khóa “new” và sẽ bị phá hủy khi đối tượng bị phá hủy.
* Biến instance có thể được sử dụng bởi các phương thức, constructor, block, ... Nhưng nó phải được sử dụng thông qua một đối tượng cụ thể.
* Được phép sử dụng "access modifier" khi khai báo biến instance, mặc định là "default".
* Biến instance có giá trị mặc định phụ thuộc vào kiểu dữ liệu của nó. Ví dụ nếu là kiểu int, short, byte thì giá trị mặc định là 0, kiểu double thì là 0.0d, ... Vì vậy, bạn sẽ không cần khởi tạo giá trị cho biến instance trước khi sử dụng.
* Bên trong class mà bạn khai báo biến instance, bạn có thể gọi nó trực tiếp bằng tên khi sử dụng ở khắp nơi bên trong class đó.

![Screen Shot 2022-08-06 at 15.11.41.png](https://images.viblo.asia/e74327fd-9cf4-4358-8102-033297d36dae.png)

#### 2.4 Static variable (biến tĩnh).
* Biến static được khai báo trong một class với từ khóa "static", phía bên ngoài các phương thức, constructor và block.
* Sẽ chỉ có duy nhất một bản sao của các biến static được tạo ra, dù bạn tạo bao nhiêu đối tượng từ lớp tương ứng.
* Biến static được lưu trữ trong bộ nhớ static riêng.
* Biến static được tạo khi chương trình bắt đầu chạy và chỉ bị hủy khi chương trình dừng.
* Giá trị mặc định của biến static phụ thuộc vào kiểu dữ liệu bạn khai báo tương tự biến instance.
* Biến static được truy cập thông qua tên của class chứa nó, với cú pháp: TenClass.tenBien.
* Trong class, các phương thức sử dụng biến static bằng cách gọi tên của nó khi phương thức đó cũng được khai báo với từ khóa "static".

![Screen Shot 2022-08-06 at 15.16.34.png](https://images.viblo.asia/7fbf22e1-da29-40c3-ab0a-2954db2fc0b0.png)

### 3. Constant (hằng số).
* Hằng số là những giá trị không bao giờ thay đổi trong suốt quá trình sử dụng, là một giá trị bất biến trong chương trình.
* Nếu bạn cố ý thay đổi giá trị của Constant thì sẽ xảy ra lỗi.

![Screen Shot 2022-08-06 at 15.27.36.png](https://images.viblo.asia/34fb37ce-81fe-459d-99c1-07e836207f90.png)