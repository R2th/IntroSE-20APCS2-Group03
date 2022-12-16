Trong bài này chúng ta sẽ cùng tìm hiểu về các dạng thường gặp của câu truy vấn **FROM**.

## 1. Setup

```
--DROP TABLE employees PURGE;
--DROP TABLE departments PURGE;

CREATE TABLE departments (
  department_id   NUMBER(2) CONSTRAINT departments_pk PRIMARY KEY,
  department_name VARCHAR2(14),
  location        VARCHAR2(13)
);

INSERT INTO departments VALUES (10,'ACCOUNTING','NEW YORK');
INSERT INTO departments VALUES (20,'RESEARCH','DALLAS');
INSERT INTO departments VALUES (30,'SALES','CHICAGO');
INSERT INTO departments VALUES (40,'OPERATIONS','BOSTON');
COMMIT;


CREATE TABLE employees (
  employee_id   NUMBER(4) CONSTRAINT employees_pk PRIMARY KEY,
  employee_name VARCHAR2(10),
  job           VARCHAR2(9),
  manager_id    NUMBER(4),
  hiredate      DATE,
  salary        NUMBER(7,2),
  commission    NUMBER(7,2),
  department_id NUMBER(2) CONSTRAINT emp_department_id_fk REFERENCES departments(department_id)
);

INSERT INTO employees VALUES (7369,'SMITH','CLERK',7902,to_date('17-12-1980','dd-mm-yyyy'),800,NULL,20);
INSERT INTO employees VALUES (7499,'ALLEN','SALESMAN',7698,to_date('20-2-1981','dd-mm-yyyy'),1600,300,30);
INSERT INTO employees VALUES (7521,'WARD','SALESMAN',7698,to_date('22-2-1981','dd-mm-yyyy'),1250,500,30);
INSERT INTO employees VALUES (7566,'JONES','MANAGER',7839,to_date('2-4-1981','dd-mm-yyyy'),2975,NULL,20);
INSERT INTO employees VALUES (7654,'MARTIN','SALESMAN',7698,to_date('28-9-1981','dd-mm-yyyy'),1250,1400,30);
INSERT INTO employees VALUES (7698,'BLAKE','MANAGER',7839,to_date('1-5-1981','dd-mm-yyyy'),2850,NULL,30);
INSERT INTO employees VALUES (7782,'CLARK','MANAGER',7839,to_date('9-6-1981','dd-mm-yyyy'),2450,NULL,10);
INSERT INTO employees VALUES (7788,'SCOTT','ANALYST',7566,to_date('13-JUL-87','dd-mm-rr')-85,3000,NULL,20);
INSERT INTO employees VALUES (7839,'KING','PRESIDENT',NULL,to_date('17-11-1981','dd-mm-yyyy'),5000,NULL,10);
INSERT INTO employees VALUES (7844,'TURNER','SALESMAN',7698,to_date('8-9-1981','dd-mm-yyyy'),1500,0,30);
INSERT INTO employees VALUES (7876,'ADAMS','CLERK',7788,to_date('13-JUL-87', 'dd-mm-rr')-51,1100,NULL,20);
INSERT INTO employees VALUES (7900,'JAMES','CLERK',7698,to_date('3-12-1981','dd-mm-yyyy'),950,NULL,30);
INSERT INTO employees VALUES (7902,'FORD','ANALYST',7566,to_date('3-12-1981','dd-mm-yyyy'),3000,NULL,20);
INSERT INTO employees VALUES (7934,'MILLER','CLERK',7782,to_date('23-1-1982','dd-mm-yyyy'),1300,NULL,10);
COMMIT;
```

## 2. Tables

Thường thì mệnh đề FROM sẽ chứa danh sách các bảng và các điều kiện join của chúng. Hình thức đơn giản nhất mà ta có thể gặp là khi chỉ lấy dữ liệu từ một bảng.
Như trong ví dụ dưới đây, chúng ta sẽ lấy ra tất cả dữ liệu của tất cả các cột trong bảng EMPLOYEES, những dữ liệu này sẽ được sắp xếp theo giá trị của cột EMPLOYEE_ID. Vì ta chỉ lấy dữ liệu từ một bảng, nên mệnh đề FROM cũng sẽ chỉ chứa một bảng.

```
SELECT *
FROM   employees
ORDER BY employee_id;

EMPLOYEE_ID EMPLOYEE_N JOB       MANAGER_ID HIREDATE                 SALARY COMMISSION DEPARTMENT_ID
----------- ---------- --------- ---------- -------------------- ---------- ---------- -------------
       7369 SMITH      CLERK           7902 17-DEC-1980 00:00:00        800                       20
       7499 ALLEN      SALESMAN        7698 20-FEB-1981 00:00:00       1600        300            30
       7521 WARD       SALESMAN        7698 22-FEB-1981 00:00:00       1250        500            30
       7566 JONES      MANAGER         7839 02-APR-1981 00:00:00       2975                       20
       7654 MARTIN     SALESMAN        7698 28-SEP-1981 00:00:00       1250       1400            30
       7698 BLAKE      MANAGER         7839 01-MAY-1981 00:00:00       2850                       30
       7782 CLARK      MANAGER         7839 09-JUN-1981 00:00:00       2450                       10
       7788 SCOTT      ANALYST         7566 19-APR-1987 00:00:00       3000                       20
       7839 KING       PRESIDENT            17-NOV-1981 00:00:00       5000                       10
       7844 TURNER     SALESMAN        7698 08-SEP-1981 00:00:00       1500          0            30
       7876 ADAMS      CLERK           7788 23-MAY-1987 00:00:00       1100                       20
       7900 JAMES      CLERK           7698 03-DEC-1981 00:00:00        950                       30
       7902 FORD       ANALYST         7566 03-DEC-1981 00:00:00       3000                       20
       7934 MILLER     CLERK           7782 23-JAN-1982 00:00:00       1300                       10
```

Trong nhiều trường hợp, dữ liệu ta mong muốn trích xuất nằm trong nhiều bảng khác nhau. Ví dụ tiếp theo chúng ta sẽ join hai bảng EMPLOYEES và DEPARTMENTS với nhau, với điều kiện join là cột DEPARTMENT_ID của hai bảng. 

```
SELECT e.employee_name, d.department_name
FROM   employees e
       JOIN departments d ON d.department_id = e.department_id
ORDER BY e.employee_name;

EMPLOYEE_N DEPARTMENT_NAM
---------- --------------
ADAMS      RESEARCH
ALLEN      SALES
BLAKE      SALES
CLARK      ACCOUNTING
FORD       RESEARCH
JAMES      SALES
JONES      RESEARCH
KING       ACCOUNTING
MARTIN     SALES
MILLER     ACCOUNTING
SCOTT      RESEARCH
SMITH      RESEARCH
TURNER     SALES
WARD       SALES
```

Ở oracle, chúng ta có thể viết câu join theo cách khác. Thay vì dùng key-word JOIN và ON, các bảng được join sẽ ngăn cách nhau bởi dấu phẩy, và điều kiện join được chỉ định ở mệnh đề WHERE. Câu query dưới đây cho ta kết qua tương tự với câu bên trên.

```
SELECT e.employee_name, d.department_name
FROM   employees e, departments d
WHERE  d.department_id = e.department_id
ORDER BY e.employee_name;

EMPLOYEE_N DEPARTMENT_NAM
---------- --------------
ADAMS      RESEARCH
ALLEN      SALES
BLAKE      SALES
CLARK      ACCOUNTING
FORD       RESEARCH
JAMES      SALES
JONES      RESEARCH
KING       ACCOUNTING
MARTIN     SALES
MILLER     ACCOUNTING
SCOTT      RESEARCH
SMITH      RESEARCH
TURNER     SALES
WARD       SALES
```

Các bạn có thể tham khảo các phương pháp join khác nhau ở [đây](https://oracle-base.com/articles/9i/ansi-iso-sql-support#Joins)

## 3. Inline Views

Chúng ta cũng có thể bắt gặp subquery trong mệnh đề FROM, các subquery này được gọi là inline view. Sau khi định nghĩa và gán alias, inline view có thể được sử dụng như một bảng bình thường. Ví dụ dưới đây sử dụng inline view để lấy dữ liệu tương tự như 2 ví dụ ở trên.

```
SELECT ed.employee_name, ed.department_name
FROM   (SELECT e.employee_name, d.department_name
        FROM   employees e, departments d
        WHERE  d.department_id = e.department_id) ed
ORDER BY ed.employee_name;

EMPLOYEE_N DEPARTMENT_NAM
---------- --------------
ADAMS      RESEARCH
ALLEN      SALES
BLAKE      SALES
CLARK      ACCOUNTING
FORD       RESEARCH
JAMES      SALES
JONES      RESEARCH
KING       ACCOUNTING
MARTIN     SALES
MILLER     ACCOUNTING
SCOTT      RESEARCH
SMITH      RESEARCH
TURNER     SALES
WARD       SALES
```

## 4. Mệnh đề WITH

Có một cách khác tương tự với inline view, đó là chuyển nội dung của câu sub query vào mệnh đề WITH, và gọi đến nó như một bảng bình thường. Cách này giúp ta đơn giản hóa những câu query rắc rối và phức tạp, ngoài ra cũng tăng tính dễ đọc của query.

```
WITH emp_dept_join AS (
  SELECT e.employee_name, d.department_name
  FROM   employees e, departments d
  WHERE  d.department_id = e.department_id
)
SELECT ed.employee_name, ed.department_name
FROM   emp_dept_join ed
ORDER BY ed.employee_name;

EMPLOYEE_N DEPARTMENT_NAM
---------- --------------
ADAMS      RESEARCH
ALLEN      SALES
BLAKE      SALES
CLARK      ACCOUNTING
FORD       RESEARCH
JAMES      SALES
JONES      RESEARCH
KING       ACCOUNTING
MARTIN     SALES
MILLER     ACCOUNTING
SCOTT      RESEARCH
SMITH      RESEARCH
TURNER     SALES
WARD       SALES
```

## 5. Views

Thêm một cách khác nữa để viết sub query là tạo view dựa trên query đó.

```
CREATE OR REPLACE VIEW emp_dept_join_v AS
  SELECT e.employee_name, d.department_name
  FROM   employees e, departments d
  WHERE  d.department_id = e.department_id;
```

View sẽ ẩn bớt một phần phức tạp của query, giúp cho phần còn lại trông đơn giản hơn nhiều.

```
SELECT ed.employee_name, ed.department_name
FROM   emp_dept_join_v ed
ORDER BY ed.employee_name;

EMPLOYEE_N DEPARTMENT_NAM
---------- --------------
ADAMS      RESEARCH
ALLEN      SALES
BLAKE      SALES
CLARK      ACCOUNTING
FORD       RESEARCH
JAMES      SALES
JONES      RESEARCH
KING       ACCOUNTING
MARTIN     SALES
MILLER     ACCOUNTING
SCOTT      RESEARCH
SMITH      RESEARCH
TURNER     SALES
WARD       SALES
```


Tham khảo: https://oracle-base.com/articles/misc/sql-for-beginners-the-from-clause