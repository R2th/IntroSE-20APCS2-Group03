- Để làm việc với database bạn sẽ pải dùng thư viện DatabaseLibrary 
- Cài đặt dùng lệnh pip install -U robotframework-databaselibrary 
- 
**Connect To Database** : keyword sử dụng để kết nối với database

*** Variables ***

${postgres_db_name}  postgres

${postgres_db_user}  postgres

${postgres_db_pass}  postgres

${postgres_db_host}  localhost

${postgres_db_port}  5432

*** Keywords ***

Connect to postgres

        Connect To Database    psycopg2    ${postgres_db_name}    ${postgres_db_user}    ${postgres_db_pass}    ${postgres_db_host}    ${postgres_db_port}

Connect to mysql

         Connect To Database Using Custom Params    pymysql    database='payment_dev', user='${msql_db_user}', password='123', host='localhost', port=5432

Connect to oracle

       Connect To Database      ${ORACLE DATABASE DRIVER}      ${ORACLE DATABASE URL}  ${ORACLE DATABASE USER}   ${ORACLE DATABASE PASSWORD}
       
 **query:** câu lệnh select trong database, kết quả câu lệnh sẽ trả về 1 list kết quả    
 
 ví dụ:  có bảng person trong database như ở dưới
![](https://images.viblo.asia/dd314f7b-9f61-4c62-aa4c-3699340c311a.png)

TC01 - Query test case

        @{queryResults}		Query	select * from person
        Log Many	@{queryResults}
        Log	${queryResults[0][1]}, ${queryResults[0][0]} 

=====> thì kết quả trả về kết quả 
[1, 'Franz Allan', 'See']
Franz Allan,1

**Check If Exists In Database** : câu lệnh truy vấn, nếu database ko có row nào thỏa mãn sẽ trả về Error

ví dụ

    Check If Exists In Database	select id from person where first_name = 'Franz Allan’    # Pass

    Check If Exists In Database	select id from person where first_name = 'Jon   # Fail
    
**Check If Not Exists In Database**: câu lệnh select , nếu có bất kỳ bản nghi nào trong database sẽ trả về Fail:
ví dụ:

    Check If Not Exists In Databaseselect id from person where first_name = 'John'	# PASS
    Check If Not Exists In Databaseselect id from person where first_name = 'Franz Allan'	#Fail

**Delete All Rows From Table**: cho phép xóa hết dữ liệu trong bảng

ví dụ:

    Delete All Rows From Table	person   # PASS
    Delete All Rows From Table	person   # FAIL khi ko ko tồn tại bảng person

**Disconnect From Database**: ngắt kết nối với database đang kết nối hiện thời

ví dụ:

    Disconnect From Database		# disconnects from current connection to the databas

**Execute Sql Script**: thực thi lệnh, được sử dụng thực thi nhiều lệnh , các lệnh ngăn cách với nhau bởi dấu ;

ví dụ

    Execute Sql Script	delete from person_employee_table; delete from person_table; delete from employee_table

**Row Count**: trả ra số ròng của kết quả

![](https://images.viblo.asia/84093d25-27bd-4366-9f51-6512c1079dec.png)

        ${rowCount}	Row Count	select * from person
        Log	${rowCount}    # return 2
        ${rowCount}	Row Count	select * from person where id = 2
        Log 	${rowCount} 	# return 1

**Row Count Is 0**: PASS nếu kết quả trả về ko có bản nghi nào, FAIL khi tồn tại bản nghi

        Row Count is 0		select id from person where first_name = 'Franz Allan'   # FAIL
        Row Count is 0		select id from person where first_name = 'John'	#PASS

**Row Count Is Equal To X**:  kết quả trả về có số bản ghi bằng x

            Row Count Is Equal To X		select id from person	1  #FAIL
            Row Count Is Equal To X		select id from person where first_name = 'John'	0  #PASS

**Row Count Is Less Than X**: số bản nghi phải nhỏ hơn

        Row Count Is Less Than X		select id from person	3	#PASS
        Row Count Is Less Than X		select id from person where first_name = 'John'	1	#FAIL

**Table Must Exist**: kiểm tra tồn tại của bảng trong database

ví dụ : 	

        Table Must Exist	person