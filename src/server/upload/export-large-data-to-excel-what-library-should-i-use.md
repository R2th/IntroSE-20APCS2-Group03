## Mở đầu
Thời gian qua mình được join vào dự án phải xử lí số lượng data khá lớn, nên có ít kinh nghiệm về việc sử dụng gem nào thì hợp lí để export large data ra file excel  muốn chia sẻ với mọi người :D

Hiện tại việc export data ra file excel có rất nhiều gem việc này, gem thông thường được sử dụng nhiều nhất có lẽ là [axlsx](https://github.com/randym/axlsx), đây là gem hỗ trợ rất tốt cho excel, tuy nhiên khi sử dụng để export ra 1 file với hơn 200k record thì thật sự nó gặp vấn để dù mình đã đưa vào background job, khi thời gian export mất hơn 10s. 

Và khi đó mình đã tìm kiểm và phát hiện thấy [fast_excel](https://github.com/Paxa/fast_excel). Với Fast_excel thì việc hỗ trợ để làm việc với excel thì có vẻ không phong phú bằng, nhưng hiệu suất để cho ra file thì cực kỳ tốt. Sau đây mình sẽ chứng minh đều đó nhé:

## So sánh
```
# Use gem axlsx
def axlsx
    Axlsx::Package.new do |p|
      p.workbook.add_worksheet(:name => "Basic Worksheet") do |sheet|
        sheet.add_row ["First Column", "Second", "Third"]

        for i in 1..amount
          sheet.add_row [1, 2, 3]
        end

      end
      p.use_shared_strings = true
      p.serialize('simple.xlsx')
    end
end
```

```
   # Use gem fast_excel
  def fast_excel
    workbook = FastExcel.open("hello_world_ffi.xlsx", constant_memory: true)

    worksheet = workbook.add_worksheet("Example Report")
    worksheet.write_row 0, ["First Column", "Second", "Third"]

    for i in 1..amount
      worksheet.write_row i, [1, 2, 3]
    end
    workbook.tmp_file = true
    workbook.read_string
 end
```
* Đây là 2 method dùng để tạo file excel.
* Và sử dụng module Benchmark của ruby để đo lại gian thực thi của 2 method này.
* Với 10K record cho ra kết quả:
```
"axlsx: 0.7578259999999999s"
"fast_excel: 0.11048999999999576s"
```
Thời gian export của fast_excel nhanh hơn gần 8 lần.

Đổi với dung lượng của file thì tương đương nhau:
```
fast_excel: 113,4 kB.
axlsx: 109,8 kB.
```
* Với 200k records:
```
"axlsx: 16.13538799999999s"
"fast_excel: 2.136643000000002s"
```
Thời gian export của fast_excel cũng nhanh hơn gần 8 lần.

Đổi với dung lượng của file thì cũng tương đương nhau:
```
fast_excel: 2,2 MB.
axlsx: 2,1 MB.
```

## Kết luận
Qua bài so sánh trên thì mọi người cũng có thể tự thấy được hiệu suất export ra file excel của nó và chọn thư viện nào phù hợp cho prj của mình. Có thể đây chưa phải là thư việc tốt nhất về hiệu suất, mong mọi người nếu biết được thư viện nào tốt hơn thì sẽ góp ý :D