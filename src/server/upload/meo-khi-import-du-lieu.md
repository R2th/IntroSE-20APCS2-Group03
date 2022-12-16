# GIỚI THIỆU
Gần đây mình vừa có cơ hội làm một task về import dữ liệu khách hàng vào hệ thống. Có lẽ đây là một chủ đề quá quen thuộc với tất cả mọi người, Nhưng để làm cho nó hoàn chỉnh thì không phải là việc đơn giản. Trong phần mình đã thực hiện thì mình đã rút ra được vài điều mà mình thấy hay hay. Nên hôm nay mình sẽ giới thiệu nó lại với mọi người
# Triển khai
## Chuẩn bị
Cài đặt **gem "roo"** để đọc file dữ liệu. gem này hỗ trợ chúng ta đọc các file có định dạng như: *xslx, csv, xls* ... Chi tiết về gem này các bạn có thể tham khảo thêm [tại đây](https://github.com/roo-rb/roo).

## Mở file
```
def open_spreadsheet file
      case File.extname file.original_filename
      when ".csv" then Roo::CSV.new file.path, csv_options: {encoding: Encoding::ISO_8859_1}
      when ".xls" then Roo::Excel.new file.path
      when ".xlsx" then Roo::Excelx.new file.path
      end
end
```
Cách mở file như các bạn thấy ở trên. Nó khá là dể dàng nên mình không giải thích gì thêm ngoại trừ có một lưu ý là đối  với file *csv*, khi mở file này các bạn cần truyền thêm 1 option là `encoding: Encoding::ISO_8859_1` để encoding dữ liệu nhé.

## Đọc file
### Thiết  lập
Gia sử mình có 1 bảng *clients* để lưu khách hàng. bảng này có các các thuộc tính đơn giản như *full_name, address* .  Mỗi thuộc tính sẽ là 1 cột trong trong file excel, nên mình có cài đặt như sau:

```
mapping:
    datas:
        full_name: 1
        address: 2
```

### Mapping dữ liệu
```

def mapping row 
    mapping_datas = Settings.mapping.datas
   {
        full_name: row[mapping_datas.full_name],
        address: row[mapping_datas.address]
    }
end
```
## Import dữ liệu

```
def import file
    unless spreadsheet = open_spreadsheet(file)
        return {success: false, message: "không thể đọc file"}
    end

     clients = ActiveRecord::Base.transaction do
          (2..spreadsheet.last_row).map do |i|
                @current_index = i
                row = spreadsheet.row i
                Client.create! mapping(row)
          end
    end

    {success: true, clients: clients}
rescue ActiveRecord::RecordInvalid => invalid
        message = invalid.record.errors.full_messages.first
        {success: false, message: message, error_at: @current_index}
end
```

Logic ở trên có khá đơn giản. Phần tiếp theo mình sẽ cải tiến nó nhé.
# Nâng cao
## Phản hồi lỗi một lần
Các bạn chú ý  logic xử lý lỗi ở trên. Khi có 1 lỗi nào đó xãy ra thì ngay lập tức dừng import dữ liệu và rollback dữ liệu đã import trước đó và phản hồi lỗi cho người dùng. Giả sử Khi chúng ta import  một lượng dữ liệu lớn. Có hàng ngàn lỗi, thì ở đây chúng ta phải import hàng ngàn lần với mỗi lần server sẽ phản hồi 1 lỗi cho chúng ta sửa. Điều này rất bất tiên nên chúng ta cần đọc qua tất cả dữ liệu, tìm tất cả lỗi và trả về 1 lần cho người dùng.

```
def add_error error
    @errors.push index: current_index, detail: error
end

private
attr_reader :current_index, :errors
```

*Giải thích:* Method trên dùng để lưu lại tất cả lỗi đang có trong file dữ liệu. Mỗi khi phát hiện một lỗi chúng ta sẽ gọi method này để lưu lại. 

```
def import file
    unless spreadsheet = open_spreadsheet(file)
        return {success: false, message: "không thể đọc file"}
    end
        
    @errors = []
    clients = ActiveRecord::Base.transaction do
        (2..spreadsheet.last_row).map do |i|
            @current_index = i
            begin
                row = spreadsheet.row i
                Client.create! mapping(row)
            rescue ActiveRecord::RecordInvalid => error
                add_error error
            end
        end
    end

   explain_error if errors.present?

   {success: true}
end
```

*Giải thích:* Mỗi khi tạo client mình cần rescue lỗi lại để transaction tiếp tục chạy đến khi đọc hết dữ liệu. Sau khi đọc hết dữ liệu chúng ta kiễm tra nếu có bất kì lỗi nào xãy ra khi import thì chúng ta sẽ gọi *explain_error*  để phản lỗi, nếu không thì phản hồi thành công. 

## Phản hồi lỗi chi tiết
Hãy tưởng tượng file excel chúng ta có hàng ngàn dòng, và mỗi dòng có hàng ngàn cột, nhiệm vụ của chúng ta bây giờ là sẽ phản hồi lỗi cụ thể đã xãy ra ở đâu. Tại cột nào của dòng nào trong file excel.
Tại phần đọc dữ liệu chúng ta đã ánh xạ dữ liệu từ các cột  trong file excel đến các thuộc tính của client. Bây giờ chúng ta sẽ làm ngược lại, chúng ta sẽ ánh xạ các lỗi từ các thuộc tính của client đến các cột của file excel. 
Đầu tiên chúng ta cần cài đặt như sau:

```
    mapping
        cells:
            full_name: A
            address: B
```


```
def explain_error
    mapping_cells = Settings.mapping.cells

    details = errors.map do |error|
         record = error[:detail].record
         record.errors.keys.map do |attribute|
             cell = mapping_cells[attribute]
            {
                  row: error[:index],
                  cell: cell,
                  message: record.errors.full_messages_for(attribute).first
            }
          end
    end

    details.flatten.sort{|x, y| sort_error x, y}
end
```
*Giải thích:* Chúng ta sẽ có 1 vòng lặp cha  lặp qua các client bị lỗi và một vòng lặp con lặp  qua các thuộc tính bị lỗi của một client. từ tên thuộc tính chúng ta sẽ lấy được tên cột trên file excel dựa vào cài đặt chúng ta đã tạo. Tiếp theo chúng ta sẽ tiến hành sắp xếp các lỗi theo thứ tự từ trên trái qua phải, từ trên xuống dưới của các cell trong file excel.

```
def sort_error x_sortable, y_sortable
    result = x_sortable[:row] <=> y_sortable[:row]
    return result if result != 0

    settings = Settings.sorting
    x_cell = x_sortable[:cell][0..2].squish.rjust 2, "0"
    y_cell = y_sortable[:cell][0..2].squish.rjust 2, "0"
    x_cell <=> y_cell
end
```
![](https://images.viblo.asia/a3d7821b-1840-4652-acbe-711710b88bfb.png)
## Nested lỗi
###  Bài toán
Giả sử client có thêm 1 thuộc tính là job_id, thuộc tính này tham chiếu đến 1 bảng master data trong hệ thống. Yêu cầu đặt ra là nếu dữ liệu trong file excel khớp với 1 một trong những dữ liệu đã có trong master data thì lấy nó ra, còn nếu không thì tạo mới.
### Giải quyết
```
def mapping_job content
      return if content.blank?
          
      job = Job.find_by(name: content)
      job || Job.create!(name: content)
end
```
### Cải tiến
Chú ý ở đây thay vì chạy vào database  tìm xem nội dung này có khớp trong master data không, thì mình sẽ lấy tất cả dữ liệu trong master data và cache lại vào một biến instance. sau đó chúng ta sẽ tìm trong biến này. Mục đích để tránh mỗi row dữ liệu lại phải chọc vào database kiễm tra.  

```
def mapping_job content
      return if content.blank?
       @jobs ||= Job.all.each_with_object({}) do |job, jobs|
            jobs[job.name] = job
      end
      @jobs[content] ||= Job.create!(name: content)
end
```
*Lưu ý:*  Trường hợp tạo mới thêm chúng ta cũng cần thêm nó vào biến instance nhé. Dùng `||=` thay vì `||` để làm điều này. Có 1 vấn để ở đây là khi chúng ta tạo job thì lỗi sẽ nằm trên Job. Lúc này tại method `explain_error` chúng ta sẽ khó khăn để phản hồi lỗi về người dùng vì lỗi đang nằm trên 2 model khác nhau là job và client.  Vì vậy chúng ta thay đổi như sau:


```
def raise_error attribute, error, options = {}
    client = Client.new
    client.errors.add attribute, error, options
    add_error ActiveRecord::RecordInvalid.new client
end
```
*Giải thích:* Chúng ta sẽ giả mạo rằng có 1 một lỗi tại thuộc tính job_id trên client thay vì lỗi trên model Job.
```
def mapping_job content
      return if content.blank?
       @jobs ||= Job.all.each_with_object({}) do |job, jobs|
            jobs[job.name] = job
      end
      @jobs[content] ||= Job.create!(name: content)
rescue ActiveRecord::RecordInvalid
    raise_error :job_id, :too_long, count: 255
end
```

### Kết luận
Trên đây mình vừa giới thiệu các bạn một vài mẹo khi import dữ liệu. Nếu các bạn thấy hay thì hãy share, like và comment bên dưới video. Nhớ đăng kí kênh và nhấn vào chuông để nhận thông báo sớm nhất khi có video mới nhé.  Đùa thôi :D