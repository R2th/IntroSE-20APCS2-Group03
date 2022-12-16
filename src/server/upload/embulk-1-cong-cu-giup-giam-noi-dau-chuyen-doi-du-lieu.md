## Embulk là gì?
![](https://images.viblo.asia/30932429-166c-40b9-a610-098284fd7681.png)


### Khái niệm
**Embulk** là một công cụ open source có chức năng cơ bản là load các record từ database này và import sang database khác. Ngoài ra, còn có các chức năng import data vào database khác thông qua việc sử dụng các plugins làm cho công việc chuyển đổi và xử lý dữ liệu trở nên đơn giản và thuận tiện hơn.

Embulk hoạt động trên nền tảng java nên có thể dễ dàng hoạt động trên nhiều hệ điều hành khác nhau.

### Ưu điểm

* Cài đặt đơn giản, hoạt động được trên nhiều hệ điều hành khác nhau
* Các chức năng được cung cấp dưới dạng plugin nên với mỗi đặc thù công việc sẽ có các plugin cần thiết.
* Các plugin luôn được cập nhật liên tục từ nhà phát triển 
* Embulk và các plugin của nó được cung cấp miễn phí và cho phép người dùng thoải mái cải tiến để phù hợp với yêu cầu riêng

## Cấu trúc của Embulk

![](https://images.viblo.asia/e58e2919-58a8-4019-9f6f-5a49d0da0cad.png)

Về cơ bản thì cấu trúc của embulk được chia làm 3 phần chính:
* Các input plugins data, Decoder plugins, Parser plugins: Cung cấp các phương thức input data khác nhau. ví dụ: mysql, postgresql, Amazon S3, HDFS, http(get data từ api)
* Các plugin xử lý dữ liệu: Cung cấp các plugins cho phép chọn lọc dữ liệu (filter plugins)
* Các output plugins data, Formater plugins, Encoder plugins

Một số plugins:

**input plugins**:

* RDBS ( mysql, postgres, jdbc... )
* NoSQL ( redis, mongodb)
* Cloud Service (redshift, s3 )
* Files (CSV, JSON ...)
* Etc ( hdfs, http, elastic search, slack-history, google analitics )

**output plugins**:
* RDBS ( mysql, postgres, oracle, jdbc...)
* Cloud Service ( redshift, s3, bigquery)
* NoSQL ( redis, hdfs )
* Files
* Etc ( elastic search, hdfs, swift)

**filter plugins**:
* column (cut the column)
* insert Add columns such as host name to the specified location
* row Extract only rows that meet certain conditions
* rearrange Reconstructs one row of data into multiple rows

**File parser plugins**:
* json
* xml
* csv
* apache log
* query_string
* regex

**File formatter Plugin**:
* json
    * A plugin that formats the contents of a record in the format of jsonl (1 json 1 line)
* poi_excel
    * Plugin to convert to Excel (xls, xlsx) format data

**Excutor Plugin**:
* mapreduce
    * Plugin for running Embulk tasks on Hadoop

Chi tiết các plugins này có thể xem thêm tại đây: https://plugins.embulk.org/ .
Tại đây chứa rất nhiều các flugins hữu ích.

## Cách thức hoạt động
Trong trường hợp dữ liệu từ database -> database khác. Ta có sở đồ sau: 

![](https://images.viblo.asia/fcd356b1-e87e-4b83-9f9c-67a0a4004061.png)

Dữ liệu sẽ được input plugin read -> xử lý dữ liệu -> output plugin sẽ tiến hành import vào database mới.

Trong trường hợp tổng quát hơn. Dữ liệu có thể được đọc từ file hay một số kiểu dữ liệu đặc thù

![](https://images.viblo.asia/ac5315c0-ff72-4918-b742-36c6a23914be.png)


## Cài đặt Embulk

Để cài đặt được Embulk trước tiên bạn cần cài java cho thiết bị của mình. Chú ý hiện tại Embulk mới chỉ hoạt động trên **java8**.

```
sudo apt update
sudo apt install openjdk-8-jre-headless
```

Cài đặt embulk

```
curl --create-dirs -o ~/.embulk/bin/embulk -L "https://dl.embulk.org/embulk-latest.jar"
chmod +x ~/.embulk/bin/embulk
echo 'export PATH="$HOME/.embulk/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Cài đặt plugin cho embulk
```
embulk gem install embulk-output-postgresql embulk-filter-column embulk-filter-add_time embulk-input-postgresql embulk-filter-ruby_proc embulk-input-http embulk-parser-jsonpath embulk-filter-eval
```
Phía trên là cài đặt một số plugin phục vụ cho việc import dữ liệu từ csv hoặc api json -> vào database postgresql. Để phục vụ mục đích khác có thể xem các plugins phía trên.

Thực thi chạy embulk với file config

```
embulk run --log-level warn config.yml.liquid
```

## Một số ví dụ config cho Embulk

 **Import dữ liệu từ csv -> vào database postgresql**

```
in:
  type: file
  path_prefix: /var/batch/data/csv_year_generic_medicine_export_pjx.csv
  parser:
    charset: UTF-8
    newline: LF
    type: csv
    delimiter: ','
    quote: '"'
    escape: '"'
    null_string: ''
    trim_if_not_quoted: false
    skip_header_lines: 1
    allow_extra_columns: true
    allow_optional_columns: true
    columns:
    - {name: personal_id, type: string}
    - {name: 対象年度, type: string}
    - {name: ジェネリック医薬品数量, type: long}
    - {name: 置き換え可能医薬品数量, type: long}
    - {name: ジェネリック医薬品費, type: long}
    - {name: ジェネリック医薬品のある先発医薬品費, type: long}
    - {name: ジェネリック医薬品のない先発医薬品費, type: long}
filters:
  - type: add_time
    to_column:
      name: create_datetime
      type: timestamp
    from_value:
      mode: upload_time
  - type: add_time
    to_column:
      name: update_datetime
      type: timestamp
    from_value:
      mode: upload_time
  - type: column
    add_columns:
      - {name: create_user, type: string, default: "SYSTEM"}
      - {name: update_user, type: string, default: "SYSTEM"}
  - type: rename
    columns:
      personal_id: personal_id
      対象年度: target_year
      ジェネリック医薬品数量: generic_drug_quantity
      置き換え可能医薬品数量: replaceable_drug_quantity
      ジェネリック医薬品費: original_drug_cost
      ジェネリック医薬品のある先発医薬品費: original_drug_cost_with_generic
      ジェネリック医薬品のない先発医薬品費: original_drug_cost_without_generic
out:
  type: postgresql
  host: {{ env.DB_HOST }}
  user: {{ env.DB_USER }}
  password: {{ env.DB_PASSWORD }}
  database: {{ env.DB_NAME }}
  table: raw_yearly_generic_medicine
  mode: truncate_insert

```

**Import dữ liệu từ api json -> vào database postgresql**
 
 ```
 in:
  type: http
  url: {{ env.API_URL }}
  method: get
  params:
  - {name: limit, value: {{ env.PAGINATE }}}
  pager: {from_param: offset, pages: {{ env.TOTAL_PAGE }}, start: 0, step: {{ env.PAGINATE }}}
  flatten_json_array: true
  parser:
    charset: UTF-8
    newline: LF
    type: jsonpath
    columns:
    - {name: personal_id, type: string}
    - {name: event_at, type: timestamp, format: '%Y-%m-%dT%H:%M:%S%z'}
    - {name: event_name, type: string}
    - {name: flow_type, type: long}
    - {name: flow_type_name, type: string}
    - {name: point, type: long}
    - {name: id, type: string}
    - {name: deleted_at, type: timestamp, format: '%Y-%m-%dT%H:%M:%S%z'}
filters:
  - type: add_time
    to_column:
      name: create_datetime
      type: timestamp
    from_value:
      mode: upload_time
  - type: add_time
    to_column:
      name: update_datetime
      type: timestamp
    from_value:
      mode: upload_time
  - type: column
    add_columns:
      - {name: create_user, type: string, default: "SYSTEM"}
      - {name: update_user, type: string, default: "SYSTEM"}
      - {name: delete_flg, type: boolean, default: false}
  - type: rename
    columns:
      id: amulet_id
out:
  type: postgresql
  host: {{ env.DB_HOST }}
  user: {{ env.DB_USER }}
  password: {{ env.DB_PASSWORD }}
  database: {{ env.DB_NAME }}
  table: a_point_history
  mode: merge
  merge_keys:
    - amulet_id
 ```
Tham khảo plugin http của embulk tại đây:  https://github.com/takumakanari/embulk-input-http
## Tổng kết

Trên đây mình đã giới thiệu về Embulk một công cụ chuyển đổi dữ liệu xịn xò. Hi vọng nó có thể giúp các bạn giảm bớt nỗi đau

Tham khảo thêm tại:

https://www.embulk.org/

https://dev.embulk.org/customization.html

https://plugins.embulk.org

https://www.embulk.org/docs/

https://qiita.com/tashiro_gaku/items/f7fa0f1a99c759d947a7#configxml%E3%81%ABmysql%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E6%83%85%E5%A0%B1%E3%82%92%E8%BF%BD%E8%A8%98