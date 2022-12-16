MySQL is the most popular and probably the best database management system in the last few years. Backend programmers are most well known, working with MySQL. The project we are participating in also uses MySQL, and writing SQL transformation commands with MySQL is a daily task.

So now i will show you some tips with SQL query with MySQL that we can impove and make it has a good performance.

### 1. Union All is better than Union

What is Union quesry and how does it work?

We use the Union command to combine the results of multiple queries (with the same number of columns) together. Then MySQL engin will perform the following steps: 
* combining the results of each query,
* sorting them, removing duplicate data,
* returning set data

Example We have 2 table as below:

Table 1

| code | product_color
| -------- | --------
| 1     | White     
| 2     | Blue     
| 3     | Ping   
| 4     | Red     
| 5     | Yellow     
| 6     | Green     

Table 2

| code | product_color 
| -------- | -------- 
| 1     | Purpose    
| 2     | Green    
| 3     | Black    
| 4     | Yellow     

We use Union to get the color numbers in the table_1 and table_2 tables as follows:
```
Select color from table_a
Union
Select color from table_b;

result:
+ result with sort
product_color
------
Black
Blue
Green
Green
Ping
Purpose
Red
White
Yellow
Yellow

+ remove duplicate and return result

product_color
------
Black
Blue
Green
Ping
Purpose
Red
White
Yellow
```

When we use Union All MySQL only combines the results of 2 queries and returns the results.

```
Select product_color from table_a
Union All
Select product_color from table_b;

result:
product_color
------
White
Blue
Ping
Red
Yellow
Green
Purpose
Green
Black
Yellow
```

As the result above Union All does'nt perform the sorting and removal dupplicate data so the query is much faster than Union when perform query with large data. When we don't need to sort and remove duplicate data, use Union All for the MySQL query.

### 2 Page without removing the record

Using SQL in normal paging creation we use LIMIT and OFFSET. For example.
```
Select * from user
Limit 50 Offset 50;
```

The above query will return the users list for the first page (50 records per page). By default MySQL will scan the entire record 1 of the list, then remove the first 50 records taken only from 51 records onwards.

Because table design usually has a primary (or unique) key. Suppose the customer table has the following design.
Now we create a query that returns data for page 1.
```
Select * from user
Where id > 0
Limit 50;
```
Suppose the 50th record has id = 101, then the query for page 2 will be.
```
Select * from custormer
Where id > 101
Limit 50;
```
Because `id` the primary key is indexed, the speed of the query is very fast. By using the conditions `id >` we have the right to browse and remove the first records to get the desired records according to the page.

### 3. Replace Subquery IN in the Update statement with INNER JOIN

With the Update command using the IN condition with a Subquery, it is usually very slow, especially Subquery is a complex query with many filtering conditions. The reason for this is that because the search for each record in the main clause for updating data, Subquery is executed once. For example:
```
Update user
set ....
Where user_id IN
(Select user_id From user_board Where board_id...)
;
```

We optimize the above statement using INNER JOIN as follows.

```
Update user
INNER JOIN user_board using(user_id)
set ....
Where baord_id...
;
```

### 4. Replace INNER JOIN with Subquery when Join conditions have no Index
Usually the query using INNER JOIN will be faster than using Subquery when fields use to join between indexed tables. On the others way, when the join condition is not indexed, the query will be very slow, slower with large data.
```
Select A.cl1, A.cl2, B.cl1, B.cl2 From table1 A
INNER JOIN table2 B on A.cl1 = B.cl2
;
```

We will fix the non-indexed points for field join by using Subquery and typing order for the join condition.

```
Select * From
(Select cl1, cl2 From table1 Order by cl1) A
INNER JOIN
(Select cl1, cl2 From table2 Order by cl1) B
on A.cl1 = B.cl2
;Select * From
(Select cl1, cl2 From table1 Order by cl1) A
INNER JOIN
(Select cl1, cl2 From table2 Order by cl1) B
on A.cl1 = B.cl2
;
```