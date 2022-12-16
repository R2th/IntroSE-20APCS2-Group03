Trước khi đi vào nội dung chính, chúng ta sẽ tìm hiểu qua: 

Kiến trúc Multitenant trong Oracle Database là gì?

Để dễ hình dung mình sẽ so sánh kiến trúc của Oracle 11g và 12c ở một vài điểm, từ bản 11g trở về trước, mỗi instance chỉ phục vụ cho 1 database như vậy n database mình cần tạo n instance.
Với kiến trúc như vậy trong tình huống nếu có nhiều database chạy trên 1 máy chủ, sẽ có nhiều tài nguyên bị dư thừa, không tối ưu được.

![image.png](https://images.viblo.asia/7226fd66-2ce1-4e6f-ac00-ac1056d5dcb1.png)

Ở phiên bản 12c, Oracle đã đưa ra khái niệm Multitenant, chúng ta sẽ có một database mẹ Container Database (CDB), nó có nhiệm vụ lưu trữ, quản lý các thông tin điều khiển chung. Ngoài ra chung ta sẽ có các database con gắn vào database mẹ, gọi là các Pluggable database (PDB). Đây là nơi lưu trữ các dữ liệu thực sự của người dùng. Hiểu nôm na là các PDB sống dựa vào CDB. CDB cung cấp các proccess, memory để cho PDB hoạt động

![image.png](https://images.viblo.asia/410b9d22-5b3d-4b48-93e8-5ba437e8c2e5.png)

Ghi chú: CDB cũng có thể lưu trữ dữ liệu nhưng theo khuyên cáo của Oracle không nên lưu dữ liệu trong CDB để tránh các xung đột ảnh hưởng đến hiệu năng database.

Có một PDB đặc biệt được sinh ra khi khởi tạo CDB, nói gọi là PDB hạt giống (PDB$SEED) và nó chỉ có thể đọc chứ không thể sửa đổi

```
SQL> show pdbs;

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			      READ ONLY  NO
	 3 ORCLPDB1			      READ WRITE NO
```

Việc quản lý người dùng và quyền có một chút khác biệt so với môi trường oracle 11g. 

Trong môi trường Multitenant có hai loại người dùng:
* Người dùng chung (Common User): Người dùng được sử dụng trong tất cả các container (root và tất cả các PDB)
* Người dùng cục bộ (local User): Người dùng chỉ được dùng trong một PDB cụ thể. Tên người dùng giống nhau có thể được tạo trong các PDB khác nhau

Tương tự như vậy có có hai loại role:
* Common Role: Role này được dùng chung cho tất cả các container (Root và các PDB)
* Local Role: Role này được dùng cho các PDB cụ thể. Tên role có thể giống nhau ở các PDB khác nhau.

1. Kiểm tra Container name, chuyển Pluggable

```
SQL> show con_name

CON_NAME
------------------------------
CDB$ROOT
SQL> show pdbs;

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 ORCLPDB1			  READ WRITE NO
SQL> alter session set container=ORCLPDB1;

Session altered.

SQL> show con_name 

CON_NAME
------------------------------
ORCLPDB1
```

2. Tạo User, Role

* Tạo User
- Tạo common user trên Container Database (CDB), khi tạo thêm tiền tố C##

```
CONN / AS SYSDBA

CREATE USER c##user1 IDENTIFIED BY password1 CONTAINER=ALL;
GRANT CREATE SESSION TO c##user1 CONTAINER=ALL;
```

Ghi chú: Nếu không muốn dùng ký tự c## thì dùng tip sau

```
CONN / AS SYSDBA
alter session set "_ORACLE_SCRIPT"=true; 
```

config system dùng câu lệnh: alter system set _common_user_prefix = '' scope=spfile;

- Tạo local use

```
CONN / AS SYSDBA
ALTER SESSION SET CONTAINER = ORCLPDB1;
CREATE USER user2 IDENTIFIED BY password2 CONTAINER=CURRENT;
GRANT CREATE SESSION TO user2 CONTAINER=CURRENT;

Hoặc
CONN system/password@ORCLPDB1
CREATE USER user3 IDENTIFIED BY password3;
GRANT CREATE SESSION TO user3;
```

*  Tạo role

- Tạo common roles
```
CONN / AS SYSDBA
CREATE ROLE c##role1;
GRANT CREATE SESSION TO c##role1;
GRANT c##role1 TO c##user1 CONTAINER=ALL;

ALTER SESSION SET CONTAINER = ORCLPDB1;
GRANT c##role1 TO user2;
```

- Tạo local roles
```
CONN / AS SYSDBA
ALTER SESSION SET CONTAINER = ORCLPDB1;
-- CONN system/password@ORCLPDB1

CREATE ROLE role1;
GRANT CREATE SESSION TO role1;
GRANT role1 TO c##user1;
```

* Gán quyền role cho common và local user
```
-- Common grants.
CONN / AS SYSDBA
GRANT CREATE SESSION TO c##user1 CONTAINER=ALL;
GRANT CREATE SESSION TO c##role1 CONTAINER=ALL;
GRANT c##role1 TO c##user1 CONTAINER=ALL;

-- Local grants.
CONN system/password@ORCLPDB1
GRANT CREATE SESSION TO user1;
GRANT CREATE SESSION TO role1;
GRANT role1 TO user2;
```

3. Tạo tablespace
Để triển khai một dự án mới, ta cần tạo một tablesapce mới và tạo account gán quyền trên tablesapce mới đó cấp cho đội dự án sử dụng. Mục đính tạo ra các tablespace để dễ quản lý về mặt dung lượng phát triển của một dự án.
```
CONN / AS SYSDBA
-- tạo tabespace
CREATE TABLESPACE PROJECT_NAME DATAFILE 
'/opt/oracle/oradata/ORCLCDB/PROJECT_NAME01.dbf' SIZE 1G AUTOEXTEND ON NEXT 1G MAXSIZE 8G;

-- tạo user gán quyền trên tablespace PROJECT_NAME
CREATE USER USER_NAME IDENTIFIED BY <password> DEFAULT TABLESPACE PROJECT_NAME TEMPORARY TABLESPACE TEMP PROFILE DEFAULT ACCOUNT UNLOCK;

-- Gán quyền truy cập và kết nối cho User đã tạo
GRANT CONNECT TO USER_NAME;
GRANT RESOURCE TO USER_NAME;
```

Huy vọng bài viết giúp ích cho các bạn đang tìm hiểu về database Oracle