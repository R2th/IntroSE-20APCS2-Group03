**1** Check connection to Oracle when you meet the issue https://stackoverflow.com/questions/19660336/how-to-approach-a-got-minus-one-from-a-read-call-error-when-connecting-to-an-a
```bat
telnet ipaddress 1521
```

**2** Ask permission for inserting rows into table when you meet the issue https://stackoverflow.com/questions/21671008/ora-01950-no-privileges-on-tablespace-users

**3** Import data from the csv file using SQL*Loader

**3.1** Create file test.ctl with mode INSERT, REPLACE, APPEND. Follow the guideline https://www.oracle-dba-online.com/sql_loader.htm
The order of inserted column is as the same as the csv file
```bat
load data
CHARACTERSET UTF8
infile '/home/oracle/data.csv'
REPLACE
into table SCHEMA.TABLENAME
fields terminated by "," optionally enclosed by '"'		  
TRAILING NULLCOLS
( request_id,response_timestamp,error_code,for_service)
```
**3.2** Run
```bat
sqlldr userid=scott/tiger@db10g control=test.ctl log=test.log
``` 

**3.3** Backup and Restore oracle data

Follow the guideline https://oracle-base.com/articles/10g/oracle-data-pump-10g

```sql
CREATE OR REPLACE DIRECTORY test_dir AS '/home/oracle/oradata/';
```

```bat
# dump table
expdp scott/tiger@db10g tables=TABLE_NAME directory=TEST_DIR dumpfile=TABLE_NAME.dmp logfile=expdpTABLE_NAME.log
# dump schema
expdp scott/tiger@db10g schemas=SCHEMA_NAME directory=TEST_DIR dumpfile=SCHEMA_NAME.dmp logfile=expdpSCHEMA_NAME.log
# import
impdp scott/tiger@db10g schemas=SCHEMA_NAME directory=TEST_DIR dumpfile=SCHEMA_NAME.dmp logfile=expdpSCHEMA_NAME.log
```

**Note**:
*1*.Truncate table if nothing happen when runing
 
*2*. When you meet the error message like "Rejected - Error on table xxx, column xx. Field in data file exceeds maximum length"
although in oracle database, this field already set maximum length. The error message is because the data read in from the data file is larger that 
sqlldr's default character buffer of 255 wich is used if no CHAR and size is specified
 
https://stackoverflow.com/questions/31578781/field-in-data-file-exceeds-maximum-length-error
```bat
load data
CHARACTERSET UTF8
infile '/home/oracle/data.csv'
REPLACE
into table SCHEMA.TABLE_NAME
fields terminated by "," optionally enclosed by '"'               
TRAILING NULLCOLS
(response_timestamp,
search_engine_response  CHAR(4000))
```

*3* If you want to import timestamp Oracle field, please refer the below example
```bat
load data
CHARACTERSET UTF8
infile '/home/oracle/migrate-csv-to-oracle2/data.csv'
REPLACE
into table SCHEMA.TABLE_NAME
fields terminated by "," optionally enclosed by '"'               
TRAILING NULLCOLS
(request_id,
CREATED_TIMESTAMP DATE "yyyy-mm-dd hh24:mi:ss",
MODIFIED_TIMESTAMP DATE "yyyy-mm-dd hh24:mi:ss")
```

*4* The issue "Sql loader - second enclosure string not present" is means that one of the fields has a new line character (CRLF) in its data.
You can remove them in BQ, for example
```bat
SELECT * ,
 REPLACE(REPLACE(TEXT_FIELD, '\r', ''), '\n', '') ASTEXT_FIELD_REPLACE
 FROM TABLE_NAME 
```