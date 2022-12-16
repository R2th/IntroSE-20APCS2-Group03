# LẤY HỌ TỪ CHUỖI HỌ VÀ TÊN
## Cách 1
```
CREATE FUNCTION [dbo].[FUNC_LAYHO_DAI] (@FULLNAME NVARCHAR(MAX))
RETURNs nvarchar(max)
AS BEGIN
declare @results nvarchar(max)=''
SET @FULLNAME =RTRIM(LTRIM(@FULLNAME));
SET @FULLNAME=replace(replace(replace(@FULLNAME,' ','<>'),'><',''),'<>',' ');
 declare @Index int =CHARINDEX(' ', @FULLNAME);
if(@Index >0)
	BEGIN
		 select @results =RTRIM(LTRIM(SUBSTRING(@FULLNAME,1,LEN(@FULLNAME) -CHARINDEX(' ', REVERSE(@FULLNAME)))))
	END
 if(@results ='') BEGIN set @results=@FULLNAME END
    RETURN @results
END
```
## Cách 2
```
CREATE FUNCTION [dbo].[FUNC_LAYHO_NGAN] (@FULLNAME NVARCHAR(MAX))
RETURNs nvarchar(max)
AS BEGIN
declare @results nvarchar(max)=''
SET @FULLNAME =RTRIM(LTRIM(@FULLNAME));
SET @FULLNAME=replace(replace(replace(@FULLNAME,' ','<>'),'><',''),'<>',' ');
 
declare @Index int =CHARINDEX(' ', @FULLNAME);
if(@Index >0)
	BEGIN
		select @results =RTRIM(LTRIM(SUBSTRING(@FULLNAME,1,CHARINDEX(' ', @FULLNAME))));
	END
 if(@results ='') BEGIN set @results=@FULLNAME END
    RETURN @results
END 
```
# LẤY TÊN TỪ CHUỖI HỌ VÀ TÊN
## Cách 1
```
CREATE FUNCTION [dbo].[FUNC_LAYTEN_NGAN] (@FULLNAME NVARCHAR(MAX))
RETURNs nvarchar(max)
AS BEGIN
declare @results nvarchar(max)=''
SET @FULLNAME =RTRIM(LTRIM(@FULLNAME));
SET @FULLNAME=replace(replace(replace(@FULLNAME,' ','<>'),'><',''),'<>',' ');
declare @Index int =CHARINDEX(' ', @FULLNAME);
if(@Index >0)
	BEGIN
		select @results =RTRIM(LTRIM((LEFT(RIGHT(@FULLNAME ,CHARINDEX(' ', REVERSE(@FULLNAME)) ), CHARINDEX(' ', REVERSE(@FULLNAME))))));
	END
 if(@results ='') BEGIN set @results=@FULLNAME END
    RETURN @results
END 
```
## Cách 2
```
CREATE FUNCTION [dbo].[FUNC_LAYTEN_DAI] (@FULLNAME NVARCHAR(MAX))
RETURNs nvarchar(max)
AS BEGIN
declare @results nvarchar(max)=''
SET @FULLNAME =RTRIM(LTRIM(@FULLNAME));
SET @FULLNAME=replace(replace(replace(@FULLNAME,' ','<>'),'><',''),'<>',' ');
declare @Index int =CHARINDEX(' ', @FULLNAME);
if(@Index >0)
	BEGIN
		select @results = RTRIM(LTRIM(SUBSTRING(@FULLNAME,CHARINDEX(' ', @FULLNAME),LEN(@FULLNAME))));
	END
 if(@results ='') set @results=@FULLNAME
    RETURN @results
END 
```