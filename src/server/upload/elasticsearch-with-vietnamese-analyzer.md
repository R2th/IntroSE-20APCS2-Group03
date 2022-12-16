**I. Introduction**
    
   Đã có một bài nói về áp dụng tiếng việt trong `elasticsearch` nhưng mình vẫn quyết định viết bài này vì mình thấy khá nhiều bạn gặp khó khăn trong việc cài cắm plugin. Vì vậy bài này mình tập trung vào cách cài plugin và sau đó sử dụng ra sao. Hi vọng sẽ giúp ích được cho các bạn.
   
   Đầu tiên chúng ta sẽ nói về `Vietnamese Analysis Plugin`, thì plugin này là của anh `Duy Đỗ` phát triển và đã được Elasticsearch đăng chính thức trên https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis.html
   
   Plug này cho giúp cho việc phân tích và tìm kiếm với dữ liệu text là tiếng việt bằng cách tích hợp 1 bộ vietnamese analysis vào Elasticsearch. Nó cung cấp `vi_analyzer` analyzer và `vi_tokenizer` tokenizer, trong đó `vi_analyzer` là kết hợp của `vi_tokenizer` tokenizer và `lowercase` và `stop` filter.
   
   Nếu chưa biết về  Elasticsearch Analyzer là gì, gồm những gì và có tác dụng thì bạn nên đọc trước để  dễ  hiểu hơn và có khả năng custom hơn đối với từng loại requirements khác nhau. 

**II. How to install plugin**

   Chúng ta có 2 cách để có thể tích hợp được `Vietnamese Analysis Plugin` vào `elasticsearch`, cách đầu tiên là các bạn down đúng bản plugin tương ứng với bản elasticsearch hiện tại. Có một điểm hơi bất cập 1 chút là plugin yêu cầu bản Elasticsearch nào thì phải là bản đó chứ không có chuyện cho bản thấp hơn. Ví dụ:
Plugin bản 5.3.1 yêu cầu Elasticsearch 5.3.1 thì phải là 5.3.1 chứ 5.3.0 cũng không được @@, cái này hơi bất tiện vì đôi lúc chúng ta phải cài lại bản Elasticsearch khác.
    
   1. Cài trực tiếp   
      Trỏ đến thư mục plugin của elasticsearch
      ```
      sudo /usr/share/elasticsearch/bin/elasticsearch-plugin install file:///path/to/plugin.zip
      --- Đoạn này nhớ là full đường dẫn đến thư mục chứa plugin ---
      ```
      
   2. Cài bằng cách build thông qua resource
   
      Đây cũng là một cách để cài nhưng not advisable vì phải cài khá nhiều và bước cuối cùng cũng tương tự như bước bên trên. Cần lưu ý chút về phiên bản elasticsearch, chúng ta cần chọn đúng phiên bản elasticsearch để cài nếu không sẽ raise lỗi. 
      ```
      <properties>
      ...
        <project.build.java.version>1.8</project.build.java.version>
        <elasticsearch.version>5.2.1</elasticsearch.version>
        <lucene.version>6.4.1</lucene.version>
      ...
      </properties>
      ```
      Các bạn có thể đọc và làm theo link này và lưu ý những gì mình đã nói bên trên.
      http://duydo.me/how-to-build-elasticsearch-vietnamese-analysis-plugin/
 
**III. Show all plugins installed**
    
   Chúng ta sẽ chạy lệnh sau để kiểm tra những plugin nào đã được cài
   
   ```
   sudo /usr/share/elasticsearch/bin/elasticsearch-plugin list
   ```

**IV. How to use vietnamese Analysis**

   Vì đây là plugins chúng ta phải manual install, vì vậy để sử dụng nó chúng ta phải khai báo nó là custom analyzer trong phần settings của mỗi body index. Đây là ví dụ:
   
   ```
   example_body = {
    "settings": {
        "analysis": {
            "analyzer": {
                "vi_analyzer": {
                    "type": "custom",
                    "tokenizer": "vi_tokenizer",
                    "filter": [
                        "lowercase",
                        "stop"
                    ]
                }
            }
        }
    },
    "mappings": {
        "example": {
            "properties": {
                "example_id": {
                    "type": "string"
                },
                "created": {
                    "type": "date",
                    "format": "strict_date_optional_time||epoch_millis"
                },
                "tags": {
                    "type": "text",
                    "fielddata": True,
                    "analyzer": "vi_analyzer"
                },
                "detail_tags": {
                    "type": "nested",
                    "properties": {
                        "label": {
                            "type": "text",
                            "fielddata": True,
                            "analyzer": "vi_analyzer"
                        },
                        "type": {
                            "type": "text",
                            "fielddata": True,
                            "analyzer": "vi_analyzer"
                        },
                        "tags": {
                            "type": "text",
                            "fielddata": True,
                            "analyzer": "vi_analyzer"
                        },
                        "priority": {
                            "type": "integer"
                        }
                    },
                 },
               }
            }
        }
    }
   ```
   
   Sau khi có body index, nhiệm vụ của chúng ta tiếp theo chỉ là make dữ liệu và đánh index. :D
   
**V. Conclusion**   
   Trên đây là một vài lưu ý nhỏ khi chúng ta cài plugin này để  tránh một vài lỗi không mong muốn. Hi vọng phần nào đó có ích cho mọi người