Is it possible to write a statement that selects a column from a table and converts the results to a string?
Ideally I would want to have comma separated values.
For example, say that the SELECT statement looks something like.....

![](https://images.viblo.asia/6069311b-0e30-4844-9835-811b1ca73e2b.PNG)

![](https://images.viblo.asia/f9ddfd0d-aeec-4723-8ca6-3310f95c1c46.PNG)

You can do it like this: :vulcan_salute: 

```
declare @results varchar(500)

select @results = coalesce(@results + ',', '') +  convert(varchar(12),SttRec)
from CNPhaiTra_HoaDonMuaHang
WHERE RowId in (70,74)

select @results as results
```


Good Luck