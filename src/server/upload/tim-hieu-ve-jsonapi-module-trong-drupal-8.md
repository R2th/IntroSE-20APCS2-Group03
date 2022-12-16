##  **Mở Đầu**
Hôm nay mình sẽ giới thiệu cho mọi người một module phổ biến của Drupal. Đó là JSON:API Module. <br>
JSON API là công cụ giúp định dạng các phản hồi JSON của bạn. Bằng cách tuân thủ các quy ước được chia sẻ, bạn có thể tăng hiệu suất, tận dụng công cụ tổng quát và tập trung vào ứng dụng của mình. <br>
Client có thể tận dụng bộ nhớ đệm phản hồi hiệu quả của nó, đôi khi loại bỏ hoàn toàn các yêu cầu mạng.<br>
## **Cấu trúc Resource**
Dưới đây là cấu trúc resource của JSON API:
```
{
    "jsonapi": {
        "version": "1.0",
        "meta": {
            "links": {
                "self": {
                    "href": "http://jsonapi.org/format/1.0/"
                }
            }
        }
    },
    "data": {
        "type": "node--article",
        "id": "1adbc40c-3fe6-4c03-8c2d-78fe45d49741",
        "links": {
            "self": {
                "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741?resourceVersion=id%3A5"
            }
        },
        "attributes": {
            "drupal_internal__nid": 5,
            "drupal_internal__vid": 5,
            "langcode": "en",
            "revision_timestamp": "2019-12-28T01:40:21+00:00",
            "revision_log": null,
            "status": true,
            "title": "TEST",
            "created": "2019-12-28T01:40:06+00:00",
            "changed": "2019-12-28T01:40:21+00:00",
            "promote": true,
            "sticky": false,
            "default_langcode": true,
            "revision_translation_affected": true,
            "path": {
                "alias": null,
                "pid": null,
                "langcode": "en"
            },
            "body": {
                "value": "<p>TEST</p>\r\n",
                "format": "basic_html",
                "processed": "<p>TEST</p>",
                "summary": ""
            },
            "comment": {
                "status": 2,
                "cid": 0,
                "last_comment_timestamp": 1577497221,
                "last_comment_name": null,
                "last_comment_uid": 1,
                "comment_count": 0
            }
        },
        "relationships": {
            "node_type": {
                "data": {
                    "type": "node_type--node_type",
                    "id": "dec5583f-5ba3-4dab-9091-6e99d9aa344d"
                },
                "links": {
                    "related": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/node_type?resourceVersion=id%3A5"
                    },
                    "self": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/relationships/node_type?resourceVersion=id%3A5"
                    }
                }
            },
            "revision_uid": {
                "data": {
                    "type": "user--user",
                    "id": "9e75aa54-6b21-4dcf-8bcc-d983575fa91b"
                },
                "links": {
                    "related": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/revision_uid?resourceVersion=id%3A5"
                    },
                    "self": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/relationships/revision_uid?resourceVersion=id%3A5"
                    }
                }
            },
            "uid": {
                "data": {
                    "type": "user--user",
                    "id": "9e75aa54-6b21-4dcf-8bcc-d983575fa91b"
                },
                "links": {
                    "related": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/uid?resourceVersion=id%3A5"
                    },
                    "self": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/relationships/uid?resourceVersion=id%3A5"
                    }
                }
            },
            "field_image": {
                "data": null,
                "links": {
                    "related": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/field_image?resourceVersion=id%3A5"
                    },
                    "self": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/relationships/field_image?resourceVersion=id%3A5"
                    }
                }
            },
            "field_tags": {
                "data": [],
                "links": {
                    "related": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/field_tags?resourceVersion=id%3A5"
                    },
                    "self": {
                        "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741/relationships/field_tags?resourceVersion=id%3A5"
                    }
                }
            }
        }
    },
    "links": {
        "self": {
            "href": "https://drupal.dd:8443/jsonapi/node/article/1adbc40c-3fe6-4c03-8c2d-78fe45d49741"
        }
    }
}
``` 
**jsonapi**: Chứa thông tin, phiên bản của module JSON:API đang sử dụng. <br>
**attributes**: lưu trữ các giá trị cụ thể cho một Resource cơ bản. Ví dụ: title, body, thời gian created,langcode,... <br>
**relationships**: là các giá trị thuộc về một Resource khác trong hệ thống. **relationships** thường đại diện cho các giá trị được lưu trữ bởi một tham chiếu thực thể.
## **Fetching resources (GET)**
Ở phần này, chúng ta tìm hiểu làm cách nào để truy xuất một hoặc nhiều Resource thuộc **content type** là **article**. <br>
**1. Get tất cả resource:** <br> 
    **URL**: http://{host}/jsonapi/node/article<br>
    **Method**: GET
    **Response**: <br>
        **Statuscode**: 200 OK <br>
        **Body**:  chứa tất cả các đối tượng JSON: API của article node. <br><br>
    Ta có thể test trên Postman: <br><br>
    ![](https://images.viblo.asia/dcf5d6e4-f84a-42c2-8b9d-f31e39053458.PNG) <br>
    
**2. Get resource theo uuid:** <br>
    **URL**:  http://{host}/jsonapi/node/article/{{article_uuid}}<br>
    **Method**: GET<br>
    **Response**: <br>
         **Statuscode**: 200 OK <br>
         **Body**: chứa đối tượng JSON:API có article_uuid trùng với article_uuid truyền vào. <br>
     Ta có thể test trên Postman: <br><br>
     ![](https://images.viblo.asia/f07c5236-e0ee-4e2a-8f84-4009c3c9e6ca.PNG)

## Creating new resources (POST)
Trong phần này, chúng ta tìm hiểu làm cách nào để tạo một Resource mới có **content type** là **article**. <br>
Đâu tiên, chúng ta cần vào *admin/config/services/jsonapi* và chọn mục *"Accept all JSON:API create, read, update, and delete operations."*.<br><br>
![](https://images.viblo.asia/4bd5b5a3-e9c2-44b2-ace9-c0d1b131d0d9.PNG)<br>
Thông thường một số hình thức xác thực được sử dụng cho các yêu cầu POST. Các ví dụ của mình đều sử dụng Basic Authentication. <br>
Bật Module HTTP Basic Authentication của Drupal, đặt quyền cho người dùng API (và vai trò) và đặt username và password được mã hóa thành tiêu đề yêu cầu 'Authorization'.<br><br>
Chúng ta có thể test trên Postman:
- **Header**: 
  + **Accept**: application/vnd.api+json
  + **Content-Type**: application/vnd.api+json
  + **Authorization**: Basic dnVvbmduZ286MTIzNDU2Nzh4QFg=
- **URL**: http://{host}/jsonapi/node/article<br>
- **Method**: POST<br>
- **Request body**:<br>
```
{
  "data": {
    "type": "node--article",
    "attributes": {
      "title": "Creat new article",
      "body": {
        "value": "Creat new article",
        "format": "plain_text"
      }
    }
  }
}
```
- **Response**:<br>
    + **Statuscode**: 201 (created)<br>
    + **Body**: chứa đối tượng JSON: API của article được tạo<br><br>
![](https://images.viblo.asia/b1a00ba6-9fc5-4b45-9d56-93b8686ba9a4.PNG)

## Updating existing resources (PATCH)
Trong phần này, chúng ta tìm hiểu làm cách nào để update một Resource đã có.<br>
Chúng ta có thể test trên Postman:<br>
- **Header**: 
  + **Accept**: application/vnd.api+json
  + **Content-Type**: application/vnd.api+json
  + **Authorization**: Basic dnVvbmduZ286MTIzNDU2Nzh4QFg=
- **URL**: http://{host}/jsonapi/node/article/{{article_uuid}}<br>
- **Method**: PATCH<br>
- **Request body**:<br>
```
{
  "data": {
    "type": "node--article",
    "id": "{{article_uuid}}",
    "attributes": {
      "title": "My updated title"
    }
  }
}
```
- **Response**:<br>
    + **Statuscode**: 200 (OK)<br>
    + **Body**: chứa đối tượng JSON: API của article đã được update<br><br>
![](https://images.viblo.asia/36ad8fdb-82e0-49f0-b62a-86028537697a.PNG)

## Removing existing resources (DELETE)
Trong phần này, chúng ta tìm hiểu làm cách nào để xóa một Resource đã có.<br><br>
Chúng ta có thể test trên Postman:<br>
- **Header**: 
  + **Accept**: application/vnd.api+json
  + **Content-Type**: application/vnd.api+json
  + **Authorization**: Basic dnVvbmduZ286MTIzNDU2Nzh4QFg=
- **URL**: http://{host}/jsonapi/node/article/{{article_uuid}}<br>
- **Method**: DELETE<br>
- **Response**:
    + **Statuscode**: 204 No content
    +  **Body**: empty <br><br>
![](https://images.viblo.asia/10919cf9-ffbb-44bc-b347-3549b0bf0319.PNG)