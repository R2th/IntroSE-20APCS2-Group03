Materialized views are not something widely used in Ruby on Rails applications. However, I have recently tried to use it and the results were very satisfying.

In this case study I would like to present a simple application using Ruby 2.4.1, Rails 5.1.4, PostgreSQL 10 and the scenic gem.

## What are database views?
 
> From PostgreSQL documentation:
> 
> Suppose the combined listing of weather records and city location is of particular interest to your application, but you do not want to type the query each time you need it. You can create a view over the query, which gives a name to the query that you can refer to like an ordinary table:
> 
> ```
> CREATE VIEW myview AS
>  SELECT city, temp_lo, temp_hi, prcp, date, location
>  FROM weather, cities
>  WHERE city = name;
>  
> SELECT * FROM myview;
> ```
> 
> Making liberal use of views is a key aspect of good SQL database design. Views allow you to encapsulate the details of the structure of your tables, which might change as your application evolves, behind consistent interfaces.
> 
> Views can be used in almost any place a real table can be used. Building views upon other views is not uncommon.

This is just a very handy method not to write complicated queries. It does not help with performance – the complicated query is still executed every time.

## Materialized views

Fortunately the views can be materialized. Again, let’s take a look into PostgreSQL documentation:

> Materialized views in PostgreSQL use the rule system like views do, but persist the results in a table-like form. The main differences between:
> 
> `CREATE MATERIALIZED VIEW mymatview AS SELECT * FROM mytab;`
> and:
> 
> `CREATE TABLE mymatview AS SELECT * FROM mytab;`
> are that the materialized view cannot subsequently be directly updated and that the query used to create the materialized view is stored in exactly the same way that a view’s query is stored, so that fresh data can be generated for the materialized view with:
> 
> `REFRESH MATERIALIZED VIEW mymatview;`

Simply speaking, the results of the view query are stored in the database – just like any other table. The only difference is that we can not update the view directly but it can be refreshed using records from its source tables.

This way, instead of executing expensive queries, we can use data organized in a more simple way in a materialized view.
 
For case study please go here: https://ideamotive.co/blog/materialized-views-ruby-rails-scenic/