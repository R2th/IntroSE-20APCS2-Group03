## **Tạo rails app**

-----



Tạo 1 rails app có tên là import_csv

> rails new import_csv


## **File CSV**

-----



Đặt file .csv vào folder airport/public

**Ví dụ:** Mình có 1 file csv tên là demo.csv thì thư mục của mình sẽ là import_csv/public/demo.csv 

## **Đọc file CSV**

-----



Để đọc file CSV này thì mình sẽ viết 1 rake task để thực hiện việc lướt qua từng row của nó. 


## **Thực hiện**

### **Bước 1: Tạo 1 model có tên là import_csv gồm có 2 thuộc tính là: city, country**

```
rails g model import_csv city:string country:string
rails rake:migrate
```

### **Bước 2: Tạo 1 task.**

```
create  lib/tasks/import.rake 
rails g task import demo
```

### **Bươc 3: Viết gì cho task import airport đây:**

```
require 'csv'
namespace :import do
  desc "Get csv data from csv file"
  task demo: :environment do
    # get pwd demo.csv
    import_file = Rails.root + "public/demo.csv"

    CSV.foreach(import_file, headers: true) do |row|
         ImportCsv.create! city: row.to_h["city"], country: row.to_h["country"]
    end
  end

end
```

### **Run những gì đã viết ở bước 3:**

```rake import:demo```

### **Kiểm tra lại data mình đã đọc từ file CSV và lưu vào trong database của mình:**

```
rails c
ImportCsv.all
```

**Đã xong rồi đấy. Khá là đơn giản phải hok nào @_@**

-----



## Tìm hiểu thêm tại: 

CSV của Ruby: 
>   [https://ruby-doc.org/stdlib-2.5.1/libdoc/csv/rdoc/CSV.html](https://ruby-doc.org/stdlib-2.5.1/libdoc/csv/rdoc/CSV.html)