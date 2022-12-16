Trong bài này chúng ta sẽ cùng tìm hiểu về các dạng thường gặp của câu truy vấn **WHERE**.

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

## 2. Giới thiệu

Cú pháp WHERE dùng để lọc kết quả của câu query. Nếu điều kiện trong WHERE trả về FALSE với một row, thì row đó sẽ không được trả về trong kết quả query cuối cùng. Thường thì sẽ có nhiều điều kiện được tổ hợp lại bằng key word AND hoặc OR để lọc kết quả.

Với trường hợp sử dụng cú pháp join không theo chuẩn ANSI, thì cả điều kiện join và điều kiện lọc đều được chỉ định trong WHERE.

```sql
SELECT e.employee_name, e.salary, d.department_id, d.department_name
FROM   employees e, departments d
WHERE  e.department_id = d.department_id  -- Join Condition
AND    d.department_id = 20               -- Filter
AND    e.salary >= 2000                   -- Filter
ORDER BY e.employee_name;

EMPLOYEE_N     SALARY DEPARTMENT_ID DEPARTMENT_NAM
---------- ---------- ------------- --------------
FORD             3000            20 RESEARCH
JONES            2975            20 RESEARCH
SCOTT            3000            20 RESEARCH

3 rows selected.
```

Còn với cú pháp join theo chuẩn ANSI, trong WHERE chỉ chứa điều kiện lọc.
```sql
SELECT e.employee_name, e.salary, d.department_id, d.department_name
FROM   employees e
       JOIN departments d ON e.department_id = d.department_id
WHERE  d.department_id = 20               -- Filter
AND    e.salary >= 2000                   -- Filter
ORDER BY e.employee_name;

EMPLOYEE_N     SALARY DEPARTMENT_ID DEPARTMENT_NAM
---------- ---------- ------------- --------------
FORD             3000            20 RESEARCH
JONES            2975            20 RESEARCH
SCOTT            3000            20 RESEARCH

```

## 3. Các điều kiện bằng, khác

Điều kiện lọc có thể chứa so sánh bằng hoặc khác
* = : bằng
* <> or != : khác
* > : lớn hơn
* < : nhỏ hơn
* >= : lớn hơn hoặc bằng
* <= : nhỏ hơn hoặc bằng

```shell
SELECT e.employee_name, e.department_id, e.salary
FROM   employees e
WHERE  e.department_id = 20
AND    e.salary >= 2000
ORDER BY e.employee_name;

EMPLOYEE_N DEPARTMENT_ID     SALARY
---------- ------------- ----------
FORD                  20       3000
JONES                 20       2975
SCOTT                 20       3000

```

## 4. IN, NOT IN

Điều kiện IN trả về giá trị TRUE cho những giá trị nằm trong một list chỉ định.
```markdown
SELECT e.department_id, e.employee_id, e.employee_name
FROM   employees e
WHERE  e.department_id IN (10, 20)
ORDER BY e.department_id, e.employee_id;

DEPARTMENT_ID EMPLOYEE_ID EMPLOYEE_N
------------- ----------- ----------
           10        7782 CLARK
           10        7839 KING
           10        7934 MILLER
           20        7369 SMITH
           20        7566 JONES
           20        7788 SCOTT
           20        7876 ADAMS
           20        7902 FORD
```

Điều kiện NOT IN trả về giá trị TRUE cho những giá trị **không** nằm trong một list chỉ định.
```markdown
SELECT e.department_id, e.employee_id, e.employee_name
FROM   employees e
WHERE  e.department_id NOT IN (10, 20)
ORDER BY e.department_id, e.employee_id;

DEPARTMENT_ID EMPLOYEE_ID EMPLOYEE_N
------------- ----------- ----------
           30        7499 ALLEN
           30        7521 WARD
           30        7654 MARTIN
           30        7698 BLAKE
           30        7844 TURNER
           30        7900 JAMES
```

List chỉ định trong IN và NOT IN có thể là một subquery.
```markdown
SELECT e.department_id, e.employee_id, e.employee_name
FROM   employees e
WHERE  e.department_id IN (SELECT d.department_id
                           FROM   departments d
                           WHERE  d.department_id < 30)
ORDER BY e.department_id, e.employee_id;

DEPARTMENT_ID EMPLOYEE_ID EMPLOYEE_N
------------- ----------- ----------
           10        7782 CLARK
           10        7839 KING
           10        7934 MILLER
           20        7369 SMITH
           20        7566 JONES
           20        7788 SCOTT
           20        7876 ADAMS
           20        7902 FORD
```

## 5. EXISTS, NOT EXIST

Điều kiện EXIST trả về giá trị TRUE nếu subquery trả về ít nhất là 1 record.
```sql
SELECT d.department_id, d.department_name
FROM   departments d
WHERE  EXISTS (SELECT 1
               FROM   employees e
               WHERE  d.department_id = e.department_id)
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM
------------- --------------
           10 ACCOUNTING
           20 RESEARCH
           30 SALES
```

Điều kiện NOT EXIST trả về TRUE nếu subquery trả về 0 record.
```sql
SELECT d.department_id, d.department_name
FROM   departments d
WHERE  NOT EXISTS (SELECT 1
                   FROM   employees e
                   WHERE  d.department_id = e.department_id)
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM
------------- --------------
           40 OPERATIONS

```

## 6. BETWEEN, NOT BETWEEN

Điều kiện BETWEEN trả về true với những value nằm trong khoảng chỉ định, bao gồm cả giá trị biên.
```sql
SELECT d.department_id, d.department_name
FROM   departments d
WHERE  department_id BETWEEN 20 AND 40
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM
------------- --------------
           20 RESEARCH
           30 SALES
           40 OPERATIONS
```

Điều kiện NOT BETWEEN trả về TRUE cho những giá trị nằm ngoài khoảng chỉ, bao gồm cả giá trị biên.
```sql
SELECT d.department_id, d.department_name
FROM   departments d
WHERE  department_id NOT BETWEEN 20 AND 40
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM
------------- --------------
           10 ACCOUNTING
```

## 7. LIKE, NOT LIKE

Điều kiện LIKE trả về TRUE nếu giá trị match theo pattern chỉ định. '%' đại điện cho 0 đến n kí tự bất kì. Đại diện cho 1 kí tự bất kì là kí tự _
```sql
SELECT d.department_id, d.department_name
FROM   departments d
WHERE  department_name LIKE '%O%'
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM
------------- --------------
           10 ACCOUNTING
           40 OPERATIONS

```

Điều kiện NOT LIKE trả về TRUE nếu không có pattern match.
```sql
SELECT d.department_id, d.department_name
FROM   departments d
WHERE  department_name NOT LIKE '%O%'
ORDER BY d.department_id;

DEPARTMENT_ID DEPARTMENT_NAM
------------- --------------
           20 RESEARCH
           30 SALES
```

## 8. AND, OR

Để nối các điều kiện với nhau, ta dùng AND hoặc OR. Tuy nhiên bạn nên cẩn thận khi dùng cả AND và OR, vì dẫn đễ dẫn đến hiểu lầm trong thứ tự check các điều kiện. Ví dụ dưới đây có vẻ như để tìm kiếm các employee là MANAGER và CLERK trong department 20.
```shell
SELECT e.employee_id, e.employee_name, e.department_id, e.salary, e.job
FROM   employees e
WHERE  e.department_id = 20
AND    e.job = 'MANAGER'
OR     e.job = 'CLERK'
ORDER BY e.employee_id;

EMPLOYEE_ID EMPLOYEE_N DEPARTMENT_ID     SALARY JOB
----------- ---------- ------------- ---------- ---------
       7369 SMITH                 20        800 CLERK
       7566 JONES                 20       2975 MANAGER
       7876 ADAMS                 20       1100 CLERK
       7900 JAMES                 30        950 CLERK
       7934 MILLER                10       1300 CLERK
```

Tuy nhiên ta lại thấy employee của department 10 và 30 cũng có trong kết quả. Đó là bởi vì điều kiện AND có thứ tự ưu tiên tính toán cao hơn, nên điều kiện trong where đã trở thành
 (e.department_id = 20 AND e.job = 'MANAGER') OR e.job = 'CLERK'
Trong trường hợp này, chúng ta nên dùng dấu ngoặc để đảm bảo về tính đúng đắn của logic
```shell
SELECT e.employee_id, e.employee_name, e.department_id, e.salary, e.job
FROM   employees e
WHERE  e.department_id = 20
AND    (e.job = 'MANAGER' OR e.job = 'CLERK')
ORDER BY e.employee_id;

EMPLOYEE_ID EMPLOYEE_N DEPARTMENT_ID     SALARY JOB
----------- ---------- ------------- ---------- ---------
       7369 SMITH                 20        800 CLERK
       7566 JONES                 20       2975 MANAGER
       7876 ADAMS                 20       1100 CLERK
```

Tham khảo:[https://oracle-base.com/articles/misc/sql-for-beginners-the-where-clause](https://oracle-base.com/articles/misc/sql-for-beginners-the-where-clause)