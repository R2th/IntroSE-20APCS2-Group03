Khi vòng đời của một sản phẩm thì không thể thiếu công đoạn test, trong công việc test thì phải nhắc đến unit test, vậy unit test là gì, tại sao lại phải sử dụng kỹ thuật unit test, và tạo ra một unit test như thế nào?

## Unit test là gì?

Unit testing là công việc _validate_ những đơn vị riêng lẻ (**individual units**) của một chương trình phần mềm có hoạt động đúng hay không. Trong một dự án lập trình cấu trúc thì các đơn vị riêng lẻ như là các hàm, procedure,... còn đối với lập trình hướng đối tượng thì các đơn vị riêng lẻ là các method. Dưới đây là một ví dụ một đơn vị riêng lẻ:

```java
public class Math {
    static public int add(int a, int b) {
        return a + b;
    }
} 
```

Các thiết bị sử dụng trong unit test
**Tested software units**: là các phần mềm hỗ trợ test tỷ dụ như các tools
**Các tài liệu liên quan**

- Các test case
- Danh sách các defect tìm được
- Bản báo cáo test

Dưới đây sẽ mô tả một unit test hoạt động như thế nào:

```java
public class TestMath extends TestCase {
    public void testAdd() {
    int num1 = 3;
    int num2 = 2;
    int total = 5;
    int sum = 0;
    sum = Math.add(num1, num2);
    assertEquals(sum, total);
    }
} 
```

Ta sẽ kiểm tra hàm tính tổng xem nó có ra kết quả không. `num1, num2, total` lần lượt là số thứ nhất, số thứ 2 và kết quả mong muốn. `sum` là kết quả trả ra của hàm tính tổng mà chúng ta đã viết. Công việc `assertEquals(sum, total);` là để so sánh xem kết quả mong đợi và kết quả trả về của hàm có chính xác hay không. Đây là một ví dụ đơn giản của một unit test.

## Tại sao cần Unit Test?

Mục tiêu của unit test là để

- Đảm bảo được chất lượng phần mềm.
- Phát hiện sớm các defect và các issue.
- Giảm chi phí sửa chữa.

Biểu đồ dưới đây sẽ mô tả về số lượng defect tìm được qua các phase và giá để giải quyết defect đó để hiểu rõ hơn về lý do tại sao chúng ta cần phải test và fix càng sớm càng tốt.

![Unit Test 1](https://i.imgur.com/nfISnJ8.jpg)

## Unit Test như thế nào?

![Unit Test 2](https://i.imgur.com/ERbMrZu.jpg)

Có 2 Methodologies trong unit test đó là: black-box testing và white-box testing

**Black-box testing**:

- Functional testing: toàn bộ các unit acts đúng với design (Design detail)
- Bussiness testing: toàn bộ các chương trình phần mềm đúng với yêu cầu người dùng (User requirement)

![Unit Test 3](https://i.imgur.com/YvTSo3M.jpg)

Ưu điểm của loại này:

- Không cần hiểu logic của source code mà chỉ quan tâm đến input và output, phù hợp với các dự án _porting projects_.
- Không cần tài liệu detail design để tạo ra unit test cụ thể.

Nhược điểm:

- Không thể xác định được múc độ bao phủ.
- Không thể cover hết được toàn bộ các trường hợp.

Sử dụng trong các trường hợp:

- Không hiểu logic source code.
- Không cần cover tất cả các trường hợp.

Black-Box có 3 phương pháp test:

- **Specification derived**: là loại test dựa trên document specification để test.
- **Equivalence partitioning**: là loại test dựa trên các khoảng, mỗi khoảng lấy một giá trị thỏa mãn để test.
- **Boundary value analysis**: test ở biên, lấy giá trị ở bên và xung quanh biên, nhưng xung quanh biên chỉ cần lấy một giá trị xung quanh biên.

**White-box testing**:

- Kiểm tra cú pháp bởi compiler để tránh lỗi cú pháp.
- Chạy code bằng chế độ debug, chạy từng dòng để đảm bảo rằng tất cả các câu lệnh được chạy ít nhất một lần.
- Kiểm tra cấu trúc dữ liệu cục bộ để bảo đảm toàn bộ dữ liệu được lưu trữ tạm thời duy trì tính toàn vẹn của nó trong tất cả các bước chạy code.
- Kiểm tra các điều kiện để đảm bảo rằng toàn bộ code chạy đúng tại các ranh giới được thiết lập theo yêu cầu.
- Review lại tất cả các đường dẫn xử lý lỗi.

![Unit test 4](https://i.imgur.com/RBQ2SG5.jpg)

Ưu điểm của loại này:

- Có thể xác định các level coverage.
- Có thể cover được 100% các trường hợp.

Nhược điểm:

- Phải hiểu logi của source code để tạo ra các unit test specification.
- Phải sử dụng detail design document để tạo ra các unit test specification với những module logic phức tạp (nhiều vòng lặp, for, nhánh,..)
- Mất nhiều thời gian công sức hơn back-box test

Sử dụng loại này khi

- Yêu cầu cover toàn bộ source code.
- Hiểu logic của source code.

White-Box có 3 phương pháp test:

- Statement coverage: là test đi qua tất cả các node, miễn sao nó đi từ đầu đến cuối là được, tính bằng số statement cover trên tổng số statement.
- Decision (branch) coverage: là test đi qua tất cả các path, tính bằng số các nhánh mà tại node mà có nhánh.
- Path coverage: là test đi qua tất cả các trường hợp có thể xảy ra.

Khi xử lý vòng lặp đối với white-box cần phải test 4 trường hợp:

- Ngắt vòng lặp
- Cho chạy qua một lần
- Cho chạy qua hai lần
- Cho chạy qua n lần

## Ví dụ mã đi tuần

Mã đi tuần (hay hành trình của quân mã) là bài toán về việc di chuyển một quân mã trên bàn cờ vua với kích thước bàn cờ là người dùng nhập vào. Quân mã được đặt ở một ô trên một bàn cờ trống nó phải di chuyển theo quy tắc của cờ vua để đi qua mỗi ô trên bàn cờ đúng một lần.

[Toàn bộ source code và các test case](https://github.com/Sharp-Team/ma-di-tuan)