I. Introduction

   Chắc hẳn mỗi dự án chúng ta đi qua đều sẽ có chức năng tìm kiếm với độ phức tạp và độ linh hoạt khác nhau, và hơn nữa việc tìm kiếm lại rất gần gũi với Elasticsearch, một công cụ tìm kiếm nearly real time đang rất chuộng hiện nay. Với elasticsearch, chúng ta có thể làm được rất rất nhiều thứ với nó, hôm nay mình sẽ chia sẻ một chút về cách mà chúng ta có thể lấy ra những từ khóa tìm kiếm nổi bật trong một khoảng thời gian mong muốn. Go!
    
II. How perform
    
   1.  Build mapping

         Mình bỏ qua các bước cài đặt Elasticsearch và sẽ đi luôn vào cách chúng ta sẽ thực hiện ra sao. Chúng ta biết rằng, để có thể tìm kiếm được dữ liệu thì sẽ cần 1 database(index), vì vậy đầu tiên chúng ta cần làm là tạo một hình dạng cho index đó, gọi là mapping.
         ```
         log_user_action_mapping = {
           "mappings": {
              "statistic_keyword_index": {
                 "properties": {
                    "keyword": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "user_id": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "@timestamp": {
                        "type": "date",
                        "format": "strict_date_optional_time||epoch_millis"
                    }
                  }
               }
            }
         }    
         ```
         
  2. Log searching history
  
        Để có thể lấy ra được những từ khóa tìm kiếm nổi bật nhất trong một khoảng thời gian, chúng ta cần lưu lại lịch sử những từ khóa đã được tìm kiếm, đặc biệt hơn có thể là của cụ thể một user nào đó nếu như họ đăng nhập, chúng ta sẽ đánh index sau mỗi lần chức năng search được thực hiện:
        
        ```
         ---Đây là service thực hiện chức năng đánh index---
         from elasticsearch.client import Elasticsearch
         es = Elasticsearch("127.0.0.1")
         STATISTIC_KEYWORD_INDEX = "statistic_keyword_index"
         STATISTIC_KEYWORD_TYPE = "statistic_keyword_type"
         
         log_user_action_mapping = {
           "mappings": {
              "statistic_keyword_type": {
                 "properties": {
                    "keyword": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "user_id": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "@timestamp": {
                        "type": "date",
                        "format": "strict_date_optional_time||epoch_millis"
                    }
                  }
               }
            }
         } 
         
         def log_user_search_deal(keyword, uuid):
            data = {
                "keyword": keyword,
                "uuid": uuid,
                "@timestamp": datetime.datetime.utcnow()
            }

            es.index(index=STATISTIC_KEYWORD_INDEX, doc_type=STATISTIC_KEYWORD_TYPE, body=data)
        ```
         
        Chúng ta sẽ call hàm này tại nơi mà chức năng search được thực hiện. Giả sử:
         
        ```
         if keyword:
            log_user_search_deal(keyword=keyword, uuid=self.get_uuid(request))
        ```
        
    3. Get trending keywords
    
       Và cuối cùng, việc chúng ta cần làm là lấy ra những từ khóa tìm kiếm nổi bật. Hãy build một function thực hiện chức năng này:
       
       ```
       def search_trending_keyword(limit=3):
         search_query = {
            "aggs": {
                "trending_keywords": {
                    "terms": {
                        "field": "keyword",
                        "size": limit
                    },
                    "aggs": {
                        "range": {
                            "date_range": {
                                "field": "@timestamp",
                                "format": "dd-MM-yyy",
                                "ranges": [
                                    {"to": "now"},
                                    {"from": "now-7d/d"}
                                ]
                            }
                        }
                    }
                }
            },
            "_source": [
                "keyword"
            ]
        }

        return es.search(index=STATISTIC_KEYWORD_INDEX, doc_type=STATISTIC_KEYWORD_TYPE, body=search_query)
       ```
       
   Mình dùng aggs để lấy ra 3 từ khóa terms trong index được sắp xếp theo độ trend và kết hợp với date range aggs để làm hẹp lại câu truy vấn và lấy ra được những trending keywords trong 7 ngày gần nhất, nếu không dùng date range aggs, mặc định sẽ là 3 keywords có độ trend lớn nhất. Bạn có thể lấy ra bao nhiêu keywords tùy bạn muốn, chỉ cần set size cho aggs là được.
   
   Hàm thực hiện việc lấy trending keywords đã xong, bạn chỉ cần call nó tại nơi bạn muốn lấy, và những trending keywords sẽ được lưu tại biến mà bạn đặt trong câu lệnh truy vấn, ở đây của mình là `trending_keywords`. Các bạn có thể tham khảo thêm 1 chút về cấu trúc dữ liệu trả về sau khi truy vấn của Elasticsearch để có thể parse ra kết quả. 

III. Conclusion

   Trên đây là cách mà mình thực hiện để tìm ra những từ khóa nổi bật khi dùng Elasticsearch, hi vọng sẽ có ích với các bạn.