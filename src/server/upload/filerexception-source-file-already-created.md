Hôm qua mình có setup 1 dự án java với số lượng code khá lớn trên eclipse, sau khi setup thì nó bị báo lỗi:

"javax.annotation.processing.FilerException: Source file already created"

Search thấy nhiều kết quả nhưng chỉ có cái này là giải quyết được vì vậy note vào đây để ae nào cần có thể sử dụng!

> In your Eclipse installation's eclipse.ini file, add the following line in
> the vmargs section:
> 
> -DmaxCompiledUnitsAtOnce=10000
> 
> Without this setting, annotation processing does not work reliably and the
> build is likely to fail with errors like:
> 
> Could not write generated class ... javax.annotation.processing.FilerException: Source file already created