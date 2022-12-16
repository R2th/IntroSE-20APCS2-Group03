As we know that WebDriver API is only good for testing a web app with the help of several web browsers and thus, in order to include testing of database, experts need to use the JDBC Connection – Java Database Connectivity.

**JDBC Introduction** 

JDBC is a [Java API](https://www.techopedia.com/definition/25133/application-programming-interface-api-java) that interacts with the database once the database connection is procured and SQL statements are executed. JDBC acts as a connector for the Java programming languages with several databases that uses their database drivers. Here are the classes and interfaces that are offered by the JDBC AP: 

1. Driver Manager: This class returns a database connection object once DB connection URL, username, and password are accepted.
2. Driver:  This driver assists in creating JDBC Connection with the database.
3. Connection: Connection is an interface that is intended to offer information explaining its table, supported SQL, stored procedures, grammar, features of this connection, and more.
4. Statement: Statement is also an interface to the pre-compiled object that is applied by professionals to execute SQL statements within the database efficiently.
5. ResultSet: It is an interface to the object that is intended to maintain a cursor pointing to its present data row. From the starting, the cursor is located before the first row. The next method is used to move the cursor to the next row and return a Boolean value in the presence of the fetched rows. 
6. SQLException: This is an exception class type that explains numerous SQL exceptions. When yours execute any SQL statement through JDBC connection, it is compulsory to catch SQL exception via SQLException. 

In this tutorial, we will discuss and learn:
* Make a connection to the Database
* Send Queries to the DB
* Result Processing 
* Example of DB testing with Selenium 

If you wish to test your DB using Selenium, you must understand the following 3 steps:

1. Make a connection to the Database
2. Send Queries to the Database
3. Result Processing 

**Step 1: Make a Connection to the Database** 

To make a connection to the DB, you can use the syntax:
         *DriverManager.getConnection(URL, “userid”, “password”)*

Understand the terms used in the syntax:

* Userid is referred to the username configured in the database 
* Password is the security pass code of the configured user 
* URL is of format jdbc:<dtbtype>: //ipaddress:portnumber/db_name”
* <dbtype> is the driver for the DB that you tries to connect. If the DB is of oracle, for connecting to oracle DB, the value will be “oracle”.

And the code used for creating connection looks like-

*Connection con = DriverManager.getConnection(dbUrl,username,password);*

You need to load the JDBC Driver with the help of following code:
    
*Class.forName("com.mysql.jdbc.Driver");*

**Step 2 – Send Queries to the DB** 
    
Once connection is established, you have to execute queries. You can apply the Statement Object to send queries –
*Statement stmt = con.createStatement();*			

Once you create the statement object, you can use the executeQuery method and execute the SQL queries. 
*stmt.executeQuery(select   from employee;);*

**Step 3 – Result Processing** 
    
The results achieved from the executed query are saved and stored inside the ResultSet Object. 
    
Java offers several advance methods to initiate result processing. Some of the methods are listed below:
    
* String getString()
* Int getInt()
* Double getDouble()
* Date getDate()
* Boolean next()
* Boolean previous()
* Boolean first()
* Boolean last()
* Boolean absolute (int rowNumber)

String getString() method is used to getch the string type data from the result set.
Int getInt() method is applied to fetch the integer type data from the result set.
Double getDouble() method is applied to fetch the double type data from the result set.
Date getDate() method is applied to get the Date type object from the result set.
Boolean next () method is applied to navigate to the next record in the result set.
Boolean first () method is applied to navigate to the first record inside the result set.
Boolean previous() method is applied to navigate to the previous record inside the result set.
Boolean absolute(int rowNumber) method is applied to move to the certain record in the result set.

Use the below example as a reference to test DB with Selenium 
    
**Here are the steps to setup eclipse for JDBC connection:**
    
1.	Right click on the selenium package and move cursor to ‘Build Path’> ‘Configure Build Path…’ 
![](https://images.viblo.asia/e8b552fa-0014-424f-a0b0-d11e0fbff243.jpg)

 2.	Select ‘Libraries’ tab and click on the ‘Add External JARs…’ and select the path after downloading and unzipping ‘mysql-connector-java-5.1.39.jar’ file as shown in below image. Once you click the Open button, this step is achieved.
 ![](https://images.viblo.asia/0b29572c-e52e-4b8f-91d7-41da3c50ff9b.jpg)
 
 3.	Click on OK to finish the build path set up 
 ![](https://images.viblo.asia/8f5e41c5-0fa1-4082-ba89-b03301e3f3aa.jpg)
  
4.	Once you set up the driver class, execute the test script. 
![](https://images.viblo.asia/e63aba13-1742-41f5-960f-33131b29b128.jpg)
    
**Make a DB connection:** you can make the MySQL DB connection once you load the JDBC driver and with the help of ConnectionManager. This class needs Username, URL, and password. 
Execute SQL queries in DB via JDBC connection – The SQL is created to select a record from the DB. Using Statement interface and ‘createStatement’ method of connection interface, you will get this SQL in the pre-compiled state.
    
**Processing the return result set from the DB:** In this step, you will execute the pre-compiled SQL using ‘executeQuery’ method that returns a result set that contains title and URL. 
    
**WebDriver Web Testing:** You can use the URL fetched from the DB to load the website on FireFox WebDriver. The driver fetches the page title loaded by the URL. This title is compared with the retrieved title from the DB.
    
This article is shared by [Selenium Offshore Testing Company Experts](https://www.nexsoftsys.com/services/selenium-automation-testing.html) to discuss on how to test database using selenium WebDriver. Hope it is helpful to you.