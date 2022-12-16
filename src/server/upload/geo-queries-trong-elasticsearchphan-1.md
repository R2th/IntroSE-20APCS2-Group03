## Ngày làm quen
Như chúng ta đã biết Elastic Search(ES) là một engine full-text search và là một analytics engine. Nó cho phép chúng ta lưu, search và phân tích dữ liệu với một lượng lớn nhanh chóng và hiệu quả nhất. Và hôm nay tôi xin mạn phép giới thiệu đến các bạn một loại query trong ES là `Geo query`. Geo query là loại query phục vụ cho việc search theo vị trí mà cụ thể là kinh độ(longitude), vĩ độ(latitude) trên bản đồ. Trong version 5.5 của ES nó có hỗ trợ 2 types geo data là [geo point](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/geo-point.html) hỗ trợ cho việc so sánh trực tiếp lat/lon và type thứ 2 là `geo shape` mà trong bài viết này tôi sẽ đề cập về nó. Geo shape hỗ trợ chúng ta trong việc search theo points, lines, circles, polygons, multi-polygons...
## Quá trình tìm hiểu
### Ngày 1: Geo shape
Muốn sử dụng geo shape query thì điều cơ bản nhất chúng ta phải làm là config geo_shape mappping\
VD: 
```
PUT /example
{
    "mappings": {
        "doc": {
            "properties": {
                "location": {
                    "type": "geo_shape"
                }
            }
        }
    }
}
```
Geo shape query sử dụng dạng ô vuông lưới giống như geo_shape mapping để tìm các document có geo_shape field giao với geo_shape mapping. Và nó cũng sử dụng giống như  config [PrefixTree](https://www.elastic.co/guide/en/elasticsearch/reference/5.5/geo-shape.html#prefix-trees) đã được định nghĩa trong mapping.\
Nó cũng hỗ trợ cho chúng ta 2 cách để định nghĩa query này, một là cung cấp toàn bộ shape được định nghĩa:
```
POST /example/doc?refresh
{
    "name": "Keangnam, Ha noi, Viet Nam",
    "location": {
        "type": "point",
        "coordinates": [21.016813, 105.783841]
    }
}

GET /example/_search
{
    "query":{
        "bool": {
            "must": {
                "match_all": {}
            },
            "filter": {
                "geo_shape": {
                    "location": {
                        "shape": {
                            "type": "envelope",
                            "coordinates" : [[13.0, 53.0], [14.0, 52.0]]
                        },
                        "relation": "within"
                    }
                }
            }
        }
    }
}
```
Hai là reference tên của shape đó mà đã đánh index trước đó đến index khác. Cái này cực kỳ hữu ích khi mà bạn đã có danh sách các shape đó, ví dụ như Hà nội thì thay vì mỗi lần search phải cung cấp tọa độ cho nó thì ở cách thứ 2 này chúng ta chỉ cần cung cấp: 
* id: Id của document ở trong danh sách đã index shape từ trước
* index: Tên của index là nơi mà chúng ta đã index shape trước đó
* type: Type của index shape
* path: Đường dẫn đến danh sách đã index shape
```
PUT /shapes/doc/deu
{
    "location": {
        "type": "envelope",
        "coordinates" : [[13.0, 53.0], [14.0, 52.0]]
    }
}

GET /example/_search
{
    "query": {
        "bool": {
            "filter": {
                "geo_shape": {
                    "location": {
                        "indexed_shape": {
                            "index": "shapes",
                            "type": "doc",
                            "id": "deu",
                            "path": "location"
                        }
                    }
                }
            }
        }
    }
}
```
Ở cách thứ nhất chúng ta để ý rằng trong phần query có đoạn `"relation": "within"`, vậy nó là gì? Trong ES nó được gọi là `spatial relations`, tùy thuộc vào môĩ relation mà chúng ta có truy vấn khác nhau và trả về kết quả khác nhau:
* INTERSECTS: Là loại mặc định khi chúng ta không config thuộc tính này. Return tất cả cá document mà có geo_shape field giao với geo shape query.
* DISJOINT: Return tất cả các document mà geo_shape field không có điểm chung với geo shape query.
* WITHIN: Return tất cả các document mà geo shape field nằm trong geo shape query.
* CONTAINS: Return tất cả các documents mà geo_shape field chứa geo_shape query.
### Ngày 2: Geo Bounding Box Query
Geo bounding box query là loại query cho phép chúng ta bao box lại bằng point location. Ví dụ chúng ta có document đã index như sau:
```
PUT /my_locations
{
    "mappings": {
        "location": {
            "properties": {
                "pin": {
                    "properties": {
                        "location": {
                            "type": "geo_point"
                        }
                    }
                }
            }
        }
    }
}

PUT /my_locations/location/1
{
    "pin" : {
        "location" : {
            "lat" : 40.12,
            "lon" : -71.34
        }
    }
}
```
và sau đó chúng ta query:
```
GET /_search
{
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_bounding_box" : {
                    "pin.location" : {
                        "top_left" : {
                            "lat" : 20.9801642,
                            "lon" : 105.7240037
                        },
                        "bottom_right" : {
                            "lat" : 20.7208616,
                            "lon" : 105.8600734
                        }
                    }
                }
            }
        }
    }
}
```
**Query options**
* _name: Tên của field được xác định
* ignore_malformed: Set true để chấp nhận geo point có tọa độ lat/lon sai.(mặc định là false).
* validation_method: Nếu set là IGNORE_MALFORMED thì giống như định nghĩa phiá trên và nếu set là COERCE thì nó sẽ try để tìm một cặp lat/lon chính xác nhất, và mặc định là STRICT.
* type: Set thành `indexed` or `memory` để  biết được rằng filter trong index hay memory và mặc định là memory.

**Một số format được phép sử dụng**\
Để tiện cho việc query thì ES cũng cung cấp cho chúng ta một số query tương tự để sử dụng cho từng trường hợp khác nhau:\
* Dạng đầy đủ thông số:
```
"filter" : {
    "geo_bounding_box" : {
        "pin.location" : {
            "top_left" : {
                "lat" : 40.73,
                "lon" : -74.1
            },
            "bottom_right" : {
                "lat" : 40.01,
                "lon" : -71.12
            }
        }
    }
}
```
* Dạng Array:
```
"filter" : {
    "geo_bounding_box" : {
        "pin.location" : {
            "top_left" : [-74.1, 40.73],
            "bottom_right" : [-71.12, 40.01]
        }
    }
}
```
* Dạng String:
```
"filter" : {
    "geo_bounding_box" : {
        "pin.location" : {
            "top_left" : "40.73, -74.1",
            "bottom_right" : "40.01, -71.12"
        }
    }
}
```
* Dạng hash:
```
"filter" : {
    "geo_bounding_box" : {
        "pin.location" : {
            "top_left" : "dr5r9ydj2y73",
            "bottom_right" : "drj7teegpus6"
        }
    }
}
```
* Dạng vertical:
```
"filter" : {
    "geo_bounding_box" : {
        "pin.location" : {
            "top" : 40.73,
            "left" : -74.1,
            "bottom" : 40.01,
            "right" : -71.12
        }
    }
}
```
và filter cũng có thể hoạt động với nhiều location hoặc points trên mỗi document. Mỗi một location hoặc point duy nhất match với filter và document sẽ được include vào filter.
### Ngày 3: Ngày nghỉ
Như vậy là hôm nay mình đã giới thiệu đến các bạn cách để tán đổ một cô nàng ES mà cụ thể là GEO query và đã giới thiệu được 2 query đầu tiên là geo_shape và geo_bounding_box. Ở phần 2, mình sẽ giới thiệu nốt với các bạn 2 query còn lại của Geo query nhé. Xin chân thành cảm ơn các bạn đã đọc bài viết của mình. Rất mong nhận được sự đóng góp ý kiển của mọi người để bài viết được tốt hơn.\
Link tham khảo:\
https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl-geo-shape-query.html \
https://www.elastic.co/guide/en/elasticsearch/reference/5.5/query-dsl-geo-bounding-box-query.html