## Mở đầu

Bạn có bao giờ nhận được file excel từ khách hàng và bắt code chức năng hiển thị, tìm kiếm các thứ trên giao diện web và ứng dụng. Ok đầu tiên thiết kế database sau đó bằng cách nào đó import cái file excel này vào csdl. Vấn đề sẽ đơn giản nếu file excel tương ứng với 1 bảng. Ta dùng một tool gì đó như mình thì dùng Navicat để import. Mọi việc sẽ phức tạp hơn nếu như ta cần từ file excel import tới related table. Lần thứ nhất gặp phải ngồi code ít nhanh nhanh để import được, code xong bỏ đi, lần thứ 2 làm được thì tốt nhất là làm cái tools. Trước khi code thì xem đã có giải pháp nào chưa. Tìm rồi thấy rồi thì chia sẻ, contribute lại cho người ta. Có thể bạn vẫn chưa hiểu import nhiều bảng là gì thì xem tiếp phần bên dưới.

## Import 1 bảng

Sử dụng Navicat [Hướng dẫn crack](https://viblo.asia/p/cong-cu-quan-ly-co-so-du-lieu-navicat-va-huong-dan-crack-tren-ubuntu-window-aWj539DeZ6m)

## Công cụ import vào nhiều bảng

Mình tìm thấy ở đây [Github original csv2db](https://github.com/goFrendiAsgard/csv2db.py). Hoặc tham khảo bản [fork](https://github.com/taminhluan/csv2db.py) của mình thêm được ít code ví dụ và collation utf8 khi import.

Xin phép copy README.md của tác giả

What is it?
===========

csv2db.py is a simple program to import data into any database platform (which is supported by sqlalchemy).

New features
===========

Use pip install -r requirements.txt

Issues
===========

* [ ] Truncage float type if empty string


What is it for?
===============

__Short answer:__

To help you

__Long answer:__ 

You have make a complex and perfect database structure. You have also finish the program, so it should work just fine. Later, you find that your client already has a primitive-worksheet data storage which is consist of thousands rows (usually in xls extension). Simply import csv into database is impossible since a row in the worksheet is related to several tables.

Look for this `normal` worksheet: 

| Transaction code  | Date          | Item code     | Item name     | Price        | Quantity     |
| :---------------- | :------------ | :------------ | :------------ | :----------- | :----------- |
| T001              | 08/10/2013    | I001          | Candy         | $5           | 4 pcs        |
|                   |               | I002          | Chocolate     | $10          | 5 pcs        |
| T002              | 08/20/2013    | I003          | Coke          | $7           | 1 bottle     |
|                   |               | I001          | Candy         | $5           | 1 pcs        |
| T003              | 08/21/2013    | I004          | Coffee        | $2           | 1 cup        |
|                   |               | I003          | Coke          | $7           | 1 bottle     |
|                   |               | I001          | Candy         | $5           | 1 pcs        |
|                   |               | I005          | 新聞          | $10.00       | 1 exemplar   |


Pretty normal, right?

Now, you need to import the worksheet into 3 tables, `transaction`, `transaction_detail`, and `item`
The content and structure of `transaction` table should be:

| id  | code     | date          |
| --: | :------- | :------------ |
| 1   | T001     | 2013-08-10    |
| 2   | T002     | 2013-08-20    |
| 3   | T003     | 2013-08-21    |

The content and structure of `item` table should be:

| id  | code     | name          | price       | unit     |
| --: | :------- | :------------ | ----------: | :------- |
| 1   | I001     | Candy         | 5           | pcs      |
| 2   | I002     | Chocolate     | 10          | pcs      |
| 3   | I003     | Coke          | 7           | bottle   |
| 4   | I004     | Coffee        | 2           | cup      |
| 5   | I005     | 新聞          | 10          | exemplar |

The content and structure of `transaction detail` table should be:

| id  | id_transaction   | id_item     | qty     |
| --: | ---------------: | ----------: | ------: |
| 1   | 1                | 1           | 4       |
| 2   | 1                | 2           | 5       |
| 3   | 2                | 3           | 1       |
| 4   | 2                | 1           | 1       |
| 5   | 3                | 4           | 1       |
| 6   | 3                | 3           | 1       |
| 7   | 3                | 1           | 1       |
| 8   | 3                | 5           | 1       |

Firstly you think it is going to be easy, but after realize that `transaction` and `item` has many-to-many relationship, you start to think it is not as easy as it firstly seen.

You start to curse your client's primitive datastore. You know, make your own code is possible, but it going to take a very long time.

csv2db.py is made to turn the possible into easy.


Prerequisites
=============

* python 2.7.
* sqlalchemy.
* a functioning brain.
* an ability to code in Python (at least able to modify what need to be modified).

Linux users can do this:

    sudo apt-get install python python-sqlalchemy

Windows users should find their own way. 

How to use
==========

* If your file is in either `xls` or `ods` extension, you must convert them into `csv` (i.e: By using `File|Save As` menu).
  The `csv` file is still readable and editable by your office program. In addition, the csv can also be viewed as `text file`

* Here is the `csv` of the previous worksheet example:
    ```
        "Transaction Code","Date","Item Code","Item Name","Price","Quantity"
        "T001",08/10/13,"I001","Candy","$5.00","4 pcs"
        ,,"I002","Chocolate","$10.00","5 pcs"
        "T002",08/20/13,"I003","Coke","$7.00","1 bottle"
        ,,"I001","Candy","$5.00","1 pcs"
        "T004",08/21/13,"I004","Coffee","$2.00","1 cup"
        ,,"I003","Coke","$7.00","1 bottle"
        ,,"I001","Candy","$5.00","1 pcs"
        ,,"I005","新聞","$10.00","1 exemplar"

    ```

* Ensure your database & tables are already exists.

* Make a python script just as in [test.py](test.py)

    ```python        

        from csv2db import csv2db

        # connection string (used by sqlalchemy)
        connection_string = 'sqlite:///test.db'
        # MySQL connection_string example. Beware of the charset
        # connection_string = 'mysql://root:toor@localhost:3306/test?charset=utf8'

        # the csv file name. If your worksheet is on "xls" format, please convert them into csv first (i.e: in MS Excel you can use File | Save As)
        # the first line of the csv should be the header
        file_name = 'test.csv'

        # more info about csv_param: http://docs.python.org/2/library/csv.html#csv-fmt-params
        csv_param = {
            'delimiter': ',',   # libre office usually use "," while microsoft office usually use "tab"
            'quotechar': '"'    # both, libre office and microsoft office usually use '"'
        }

        ########################################################################

        # define several preprocessing callbacks. These callbacks will be used to preprocess every cell based on it's column

        def change_date_format(human_date):
            ''' change 08/31/2000 into 2000-08-31
            '''
            date_part = human_date.split('/')
            if len(date_part) == 3:
                day = date_part[1]
                month = date_part[0]
                year = date_part[2]
                computer_date = year + '-' + month + '-' + day
            else:
                computer_date = ''
            return computer_date

        def remove_dollar(value):
            ''' remove $, computer doesn't understand $
            '''
            return float(value.replace('$', ''))

        # callback dictionary. The key is caption of the column, the value is the function used
        callback = {
            'Date' : change_date_format,
            'Price' : remove_dollar
        }

        ########################################################################

        # specific preprocess function (in case of 2 different fields refer to the same csv column)

        def filter_qty(value):
            ''' get "1" as int from "1 bottle" string
            '''
            return int(value.split(' ')[0])

        def filter_unit(value):
            ''' get "bottle" from "1 bottle"
            '''
            return ' '.join(value.split(' ')[1:])

        ########################################################################

        # the table structure of your database and how they related to your csv file
        # WARNING: "unique" doesn't has any correlation with database unique constraint, unique is used as csv record identifier (since primary key does not exists in csv)
        # if you have many "unique" field, AND logic will be used to distinguish a field from another field
        table_structure_list = [
            {
                'table_name' : 'trans',
                'column_list': {
                    'id'    : {'primary': True},
                    'code'  : {'caption': 'Transaction Code', 'unique': True},
                    'date'  : {'caption': 'Date'}
                }
            },
            {
                'table_name' : 'item',
                'column_list': {
                    'id'    : {'primary': True},
                    'code'  : {'caption': 'Item Code', 'unique': True},
                    'name'  : {'caption': 'Item Name'},
                    'price' : {'caption': 'Price'},
                    'unit'  : {'caption': 'Quantity', 'preprocess' : filter_unit}
                }
            },
            {
                'table_name' : 'trans_detail',
                'column_list': {
                    'id'                : {'primary'  : True},
                    'id_transaction'    : {'reference': 'trans.id', 'unique': True},
                    'id_item'           : {'reference': 'item.id', 'unique': True},
                    'qty'               : {'caption'  : 'Quantity', 'preprocess': filter_qty}
                }
            }
        ]

        # and here is the magic:
        csv2db(file_name, csv_param, connection_string, table_structure_list, callback)
    ```

* Run your python script, and your database should be filled automagically

    ```
        python test.py
    ```

Todo
=====

* Make db2csv.py

Help me
========

* If you are a `python-coder` and `github-user`, you can fork this project and do some `pull requests` or submit some `issues`
* If you think this simple script help you save your time and money, please consider to [![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YDES6RTA9QJQL)

Disclaimer
==========

If you are a `mere-mortal-computer-user`, and doesn't have any intention to learn programming, than sadly said, this thing is not for you.

Author: Tạ Minh Luận

Original Link: https://taminhluan.github.io/blog/Import-File-csv-toi-nhieu-bang-trong-co-so-du-lieu-quan-he/

Copyright Notice: All articles in this blog use CC BY-NC-SA 4.0 unless otherwise stated. License Agreement. Please indicate the source!