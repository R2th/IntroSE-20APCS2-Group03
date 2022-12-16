![](https://images.viblo.asia/c87135ed-bef6-4420-8060-c90e781ea7bf.png)
## I. Làm chậm kiểm tra ràng buộc:
- Trong hệ quản trị cơ sở dữ liệu Oracle thì mỗi lần xuất hiện một sửa đổi cơ sở dữ liệu => ràng buộc toàn vẹn sẽ được kiểm tra ngay sau đó nếu phép sửa đổi đòi hỏi kiểm tra (NON DEFERABLE). Nhưng có thể thay đổi bằng cách sử dụng: DEFERRABLE.
- Nếu một ràng buộc (constraint) được tạo với từ khóa DEFERRABLE, sẽ chia làm 2 loại:

    +) **INITIALLY IMMEDIATE:** việc kiểm tra ràng buộc toàn vẹn sẽ được kiểm tra ngay lập tức khi có bất kỳ sửa đổi trong database.
    
    +) **INITIALLY DEFERRED:** việc kiểm tra ràng buộc toàn vẹn sẽ được trì hoãn đến hết giao tác hiện tại.
    ```
    CREATE TABLE tab1 (id  NUMBER(10), tab2_id NUMBER(10));
    CREATE TABLE tab2 (id  NUMBER(10));

    ALTER TABLE tab2 ADD PRIMARY KEY (id);

    ALTER TABLE tab1 ADD CONSTRAINT fk_tab1_tab2
      FOREIGN KEY (tab2_id)
      REFERENCES tab2 (id)
      DEFERRABLE
      INITIALLY IMMEDIATE;
    ```

=> Khi có bất kì thay đổi nào trên tab1, tab2 thì hệ thống sẽ ngay lập tức kiểm tra ràng buộc khóa ngoại fk_tab1_tab2.
Có thể thay đổi trang thái bằng các câu lệnh sau, tuy nhiên nó chỉ hoạt động đối với các ràng buộc có sử dụng từ khóa DEFERRABLE:
```
    ALTER SESSION SET CONSTRAINTS = DEFERRED;
    ALTER SESSION SET CONSTRAINTS = IMMEDIATE;
```
## II. Duy trì toàn vẹn tham chiếu:
### 1. CASCADE:
- Hệ thống sẽ loại bỏ một bộ giá trị của quan hệ được tham chiếu để duy trì toàn vẹn tham chiếu, hệ thống sẽ loại bỏ các bộ giá trị tương ứng của quan hệ tham chiếu.
```
CREATE TABLE department (
  id           NUMBER,
  description  VARCHAR2(50),
  CONSTRAINT t1_pk PRIMARY KEY (id)
);

CREATE TABLE employees (
  id             NUMBER,
  department_id  NUMBER,
  name           VARCHAR2(50),
  CONSTRAINT t2_pk PRIMARY KEY (id),
  CONSTRAINT t2_t1_fk FOREIGN KEY (t1_id) REFERENCES t1 (id) ON DELETE CASCADE
);

-- Insert a data into each table.
INSERT INTO department VALUES (1, 'developer');
INSERT INTO department VALUES (2, 'back office');

INSERT INTO employees VALUES (1, 1, 'employees ONE');
INSERT INTO employees VALUES (2, NULL, 'employees TWO');
INSERT INTO employees VALUES (3, 2, 'employees THREE');

COMMIT;

DELETE FROM department WHERE id = 1 CASCADE;
```
=> Khi record 1 trong bảng department bị xóa thì các record trong table employees có tham chiếu đến sẽ tự động bị xóa theo để đảm bảo ràng buộc tham chiếu.
### 2. SET NULL
- Thay đổi giá trị của khóa ngoại của các bộ bị loại(delete) hoặc cập nhật thành NULL.
- Trong ví dụ ở phần 1 nếu ta thay ON DELETE CASCADE bằng ON DELETE SET NULL thì khi record 1 trong bảng department bị xóa thì các record trong table employees có tham chiếu đến sẽ không bị xóa mà cột department_id sẽ được update giá trị NULL để đảm bảo ràng buộc tham chiếu.
```
CREATE TABLE department (
  id           NUMBER,
  description  VARCHAR2(50),
  CONSTRAINT t1_pk PRIMARY KEY (id)
);

CREATE TABLE employees (
  id             NUMBER,
  department_id  NUMBER,
  name           VARCHAR2(50),
  CONSTRAINT t2_pk PRIMARY KEY (id),
  CONSTRAINT t2_t1_fk FOREIGN KEY (t1_id) REFERENCES t1 (id) ON DELETE SET NULL
);

-- Insert a data into each table.
INSERT INTO department VALUES (1, 'developer');
INSERT INTO department VALUES (2, 'back office');

INSERT INTO employees VALUES (1, 1, 'employees ONE');
INSERT INTO employees VALUES (2, NULL, 'employees TWO');
INSERT INTO employees VALUES (3, 2, 'employees THREE');

COMMIT;

DELETE FROM department WHERE id = 1;
```
## III. Kiểm tra điều kiện:
- Các khẳng định(assertion). Dạng của 1 khẳng định:
```
CREATE ASSERTION <ASSERTION_NAME>
CHECK (<condition>)
```
- Ví dụ:
```
CREATE TABLE employees (
  id             NUMBER,
  department_id  NUMBER,
  name           VARCHAR2(50),
  salary         NUMBER
)

CREATE ASSERTION check_salary_less_than_1000
CHECK (1000 >= ALL (SELECT SUM(salary)
                    FROM employees
                    GROUP BY department_id))

```
=> Tổng lương của mỗi phòng ban không được vượt quá 1000.