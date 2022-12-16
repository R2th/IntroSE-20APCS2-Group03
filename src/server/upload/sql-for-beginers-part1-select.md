Đây là bài viết đầu tiên trong sê ri SQL For Beginers. Trong bài này chúng ta sẽ cùng tìm hiểu về các dạng thường gặp của câu truy vấn **SELECT** 

## 1. Setup

   Các ví dụ trong bài sử dụng những bảng dưới đây.
   (các bạn có thể thực thi những câu query trong bài bằng tool online free [SQL Fiddle](http://sqlfiddle.com/#!4))

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

## 2. Wildcard *
  Kí tự * là một wildcard. Dùng cách thức select này cũng giống như yêu cầu " mang cho ta tất cả các cột nhìn thấy được trong bảng".

 ```sql
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

  Ở ví dụ trên, khi ta thực hiện câu query, tất cả dữ liệu của tất cả các cột được hiển thị.
  Kí tự wildcard cũng có thể được sử dụng ở trong câu select với nhiều bảng. Ở ví dụ dưới đây ta có 2 bảng được join với nhau, và ta sẽ query tất cả các cột ở cả 2 bảng.

 ```sql
 SELECT employees.*, departments.*
FROM   employees
       JOIN departments ON departments.department_id = employees.department_id
ORDER BY employees.employee_id;

EMPLOYEE_ID EMPLOYEE_N JOB       MANAGER_ID HIREDATE                 SALARY COMMISSION DEPARTMENT_ID DEPARTMENT_ID DEPARTMENT_NAM LOCATION
----------- ---------- --------- ---------- -------------------- ---------- ---------- ------------- ------------- -------------- -------------
       7369 SMITH      CLERK           7902 17-DEC-1980 00:00:00        800                       20            20 RESEARCH       DALLAS
       7499 ALLEN      SALESMAN        7698 20-FEB-1981 00:00:00       1600        300            30            30 SALES          CHICAGO
       7521 WARD       SALESMAN        7698 22-FEB-1981 00:00:00       1250        500            30            30 SALES          CHICAGO
       7566 JONES      MANAGER         7839 02-APR-1981 00:00:00       2975                       20            20 RESEARCH       DALLAS
       7654 MARTIN     SALESMAN        7698 28-SEP-1981 00:00:00       1250       1400            30            30 SALES          CHICAGO
       7698 BLAKE      MANAGER         7839 01-MAY-1981 00:00:00       2850                       30            30 SALES          CHICAGO
       7782 CLARK      MANAGER         7839 09-JUN-1981 00:00:00       2450                       10            10 ACCOUNTING     NEW YORK
       7788 SCOTT      ANALYST         7566 19-APR-1987 00:00:00       3000                       20            20 RESEARCH       DALLAS
       7839 KING       PRESIDENT            17-NOV-1981 00:00:00       5000                       10            10 ACCOUNTING     NEW YORK
       7844 TURNER     SALESMAN        7698 08-SEP-1981 00:00:00       1500          0            30            30 SALES          CHICAGO
       7876 ADAMS      CLERK           7788 23-MAY-1987 00:00:00       1100                       20            20 RESEARCH       DALLAS
       7900 JAMES      CLERK           7698 03-DEC-1981 00:00:00        950                       30            30 SALES          CHICAGO
       7902 FORD       ANALYST         7566 03-DEC-1981 00:00:00       3000                       20            20 RESEARCH       DALLAS
       7934 MILLER     CLERK           7782 23-JAN-1982 00:00:00       1300                       10            10 ACCOUNTING     NEW YORK
```

## 3. Columns
  Trong nhiều trường hợp, ta không cần thiết phải select tất cả các cột trong bảng, mà chỉ cần lấy ra một vài cột cụ thể, trường hợp đó ta có thể select bằng  tên cột.

  ```objectivec
SELECT employee_id, employee_name
FROM   employees
ORDER BY employee_id;

EMPLOYEE_ID EMPLOYEE_N
----------- ----------
       7369 SMITH
       7499 ALLEN
       7521 WARD
       7566 JONES
       7654 MARTIN
       7698 BLAKE
       7782 CLARK
       7788 SCOTT
       7839 KING
       7844 TURNER
       7876 ADAMS
       7900 JAMES
       7902 FORD
       7934 MILLER
```

## 4. Alias
  1.   Column Alias
   
       Ta có thể thay đổi tên của các column trả về (thay đổi giá trị trả về chứ không thay đổi cấu trúc bảng) thông qua alias. Ví dụ dưới đây ta có 2 aliase. Cái thứ nhất không phải case-sensitive, còn cái thứ 2, sử dụng double-quote, để ép kiểu hiển thị case-sensitive tên cột như mong muốn.

```objectivec
SELECT employee_id AS employee_no, employee_name AS "Name"
FROM   employees
ORDER BY employee_id;

EMPLOYEE_NO Name
----------- ----------
   7369 SMITH
   7499 ALLEN
   7521 WARD
   7566 JONES
   7654 MARTIN
   7698 BLAKE
   7782 CLARK
   7788 SCOTT
   7839 KING
   7844 TURNER
   7876 ADAMS
   7900 JAMES
   7902 FORD
   7934 MILLER
```

  2.  Table Alias

      Table aliase cải thiện tính dễ đọc, hiểu của câu query khi độ phức tạp của query tăng lên (join, subquery...). Ở ví dụ tiếp theo, ta có 'e' là alias cho bảng employees và 'd' là alias cho bản departments.
  ```
  SELECT e.employee_id,
       e.employee_name,
       d.department_id,
       d.department_name
FROM   employees e
       JOIN departments d ON e.department_id = d.department_id
ORDER BY e.employee_id;

EMPLOYEE_ID EMPLOYEE_N DEPARTMENT_ID DEPARTMENT_NAM
----------- ---------- ------------- --------------
       7369 SMITH                 20 RESEARCH
       7499 ALLEN                 30 SALES
       7521 WARD                  30 SALES
       7566 JONES                 20 RESEARCH
       7654 MARTIN                30 SALES
       7698 BLAKE                 30 SALES
       7782 CLARK                 10 ACCOUNTING
       7788 SCOTT                 20 RESEARCH
       7839 KING                  10 ACCOUNTING
       7844 TURNER                30 SALES
       7876 ADAMS                 20 RESEARCH
       7900 JAMES                 30 SALES
       7902 FORD                  20 RESEARCH
       7934 MILLER                10 ACCOUNTING
  ```

## 5. Functions
  Danh sách select cũng có thể bao gồm các function (có thể là buil-in function hoặc các PL/SQL function bạn tự định nghĩa). Ví dụ sau sử dụng function UPPER để biến string có chưa lower case text thành upper case text.

  ```
  SELECT UPPER('lowercase text') AS text
FROM   dual;

TEXT
--------------
LOWERCASE TEXT
  ```

  Oracle cung cấp khá nhiều build-in function. Tham khảo [Oracle built-in function list](https://docs.oracle.com/javadb/10.8.3.0/ref/rrefsqlj29026.html)

## 6. Expressions
  Các expression cũng có thể được liệt kê trong select list, bao gồm các expression về toán học.

  ```
  SELECT 1+2 AS addition
FROM   dual;

  ADDITION
----------
         3
  ```

## 7. Scalar Subqueries
  Scalar subquery là các subquery mà chỉ trả về môt record và record đó chỉ bao gồm một cột. Scalar subquery cũng có thể liệt kê trong select list như trong ví dụ dưới.

  ```
  SELECT d.department_id, d.department_name,
       (SELECT COUNT(*) FROM employees e WHERE e.department_id = d.department_id) AS emp_count
FROM   departments d
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM  EMP_COUNT
------------- -------------- ----------
           10 ACCOUNTING              3
           20 RESEARCH                5
           30 SALES                   6
           40 OPERATIONS              0

  ```

  Nguồn tham khảo: https://oracle-base.com/articles/misc/sql-for-beginners-the-select-list