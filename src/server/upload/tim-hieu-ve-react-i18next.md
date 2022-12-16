# Giới Thiệu
Hiện nay các sản phẩm đều hướng tới việc quảng bá rộng rãi ở nhiều các quốc gia nên việc đa ngôn ngữ các sản phẩm là điều tất yếu.
Khi làm việc với Ruby on Rails thì chúng ta đã quen với việc dùng tới `gem "rails-i18n"` và `gem "i18n-js"` .
Gần đây khi tìm hiểu về React thì mình biết đến và sử dụng bộ `react-i18next`.
`react-i18next` là một package của npm cung cấp 1 số function để cấu hình đa ngôn ngữ.
Trong bài viết này mình sẽ không hướng dẫn cài đặt mà sẽ chỉ hướng dẫn một số các sử dụng nó và so sánh với cách sử dụng trong rails.

# Các Cách Sử Dụng
Đa ngôn ngữ một đoạn text bình thường
Trong rails:
```
# en.yml
en:
    key: value
    
 # i18n
 
 <%= t('key') %>
```

Trong react:
```
# en.json
common: {
    "key": "value" 
}

# i18n

t('common:key')
```

Đa ngôn ngữ một đoạn text có params truyền vào, dành cho nhưng trường hợp cần truyền vào đoạn text cần đa ngôn ngữ một param nào đó dựa theo từng ngữ cảnh.

Trong rails ta sẽ làm như sau:
```
# en.yml
en:
    key: "#{attr} value"
    
# i18n
 
<%= t("key", attr: "attribute") %>
```

Còn trong react:

```
# en.json
common: {
    "key": "{{attr}} value" 
}

# i18n

t('common:key', { attr: "attribute" })
```

Đa ngôn ngữ đoạn văn bản có chứa các thẻ HTML:

Trong rails ta có:

```
# en.yml
en:
    key: "< p>Recovery< /p>"
    
# i18n
 
<%= raw t("key") %>
```

Còn trong React ta dùng Function `Trans`:

```
# en.json
common: {
    "key": "text1<0>text2</0>text3" 
}

# i18n

<Trans i18nKey="key"><Link to="">key</Link></Trans>
```
Với cặp `<0>text2< /0>` là vị trí của thẻ mà mình muốn truyền vào.
Cụ thể ở đây đó là `<Link></Link>`, Lưu ý ở trong `Trans` chúng ta chỉ cần truyền vào đúng thứ tự các thẻ còn khuyết không cần tryền các đoạn text.

Trans Component:


| Name | Type (default) | Description |
| -------- | -------- | -------- |
| i18nKey     | string (undefined)     | dịch text từ key được truyền vào     |
| count     | integer  (undefined)     | sử dụng nếu text có chỉ số      |
| parent     | node  (undefined)     | node bọc ngoài      |
| i18n     | object  (undefined)     | i18next instance sử dụng nếu như chưa có trong context      |
| t     | function  (undefined)     | t function sử dụng nếu chưa có trong context      |
| defautls     | string  (undefined)     | dịch text truyền vào từ defaults     |
| components     | array[nodes]   (undefined)     | các component dựa trên các chỉ mục <0>< /0>     |



# Kết Luận
Trên đây là một số cách sử dụng react-i18next tương ứng với từng trường hợp sử dụng trong rails.