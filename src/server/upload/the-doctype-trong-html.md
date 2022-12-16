Ở đầu mỗi file HTML chúng ta thường thấy một dòng như thế này
```
<!DOCTYPE html>
```

Vậy dòng này có ý nghĩa gì ? Và tại sao lại cần dòng này ?

# 1. Document type declaration (khai báo loại tài liệu)
Lược dịch từ [wiki](https://en.wikipedia.org/wiki/Document_type_declaration):
> Document type declaration (DTD) là một chỉ dẫn liên quan đến một [SGML](https://vi.wikipedia.org/wiki/SGML) (Standard Generalized Markup Language) hoặc một tài liệu XML (ví dụ như một trang web) với một định nghĩa kiểu tài liệu (ví dụ, định nghĩa phiên bản cụ thể của HTML). Tuân thủ theo cú pháp của tài liệu, nó thường được thể hiện dưới dạng một chuỗi đánh dấu ngắn.
(Nói chung, <!DOCTYPE> không phải là một thẻ HTML, nó là một lệnh khai báo, dùng để khai báo kiểu của tài liệu HTML.)

Theo cách thức bố cục các trang mà không theo chuẩn HTML5 thì DOCTYPE có nhiệm vụ "đánh hơi" hoặc "chuyển đổi", cụ thể DOCTYPE sẽ xác định cách thức bố trí các trang tài liệu dạng text/html theo cách thức nào, chẳng hạn như "quirks mode" hay "standards mode".

Định nghĩa DOCTYPE là bắt buộc nếu như document được xử lý qua một validating environment. Để được hợp lệ, định nghĩa loại văn bản trong thẻ <!DOCTYPE> phải tương ứng với cấu trúc của file document.

# 2. Thẻ <!DOCTYPE>

Thẻ <!DOCTYPE> của chúng ta có một cấu trúc đầy đủ như sau:

```html
<!DOCTYPE root-element SYSTEM "URI" [ 
    <!-- internal subset declarations -->
]>
<!-- hoặc -->
<!DOCTYPE root-element PUBLIC "FPI" ["URI"] [ 
    <!-- internal subset declarations -->
]>
```

1. **root-element**: Như ở các file html chúng ta thường thấy, ngay sau `<!DOCTYPE` sẽ là `html`, vậy theo cấu trúc như trên thì `html` ở đây là chỉ đến một root-element - phần tử đầu tiên của document, chứa toàn bộ các phần tử khác của document ở phía bên trong nó.
2. **PUBLIC/SYSTEM**: Chỉ rõ xem DTD là public hay là private trong hệ thống:
    * Nếu DTD nằm bên trong hệ thống đang sử dụng thì chỉ cần cung cấp đường dẫn đến DTD đó
    * Nếu ta cần lấy DTD từ bên ngoài thì phải chọn PUBLIC và cung cấp định danh public để hệ thống có thể tìm kiếm được chính xác DTD đó
3. **Phần trong []** là chỉnh sửa trực tiếp đối với DTD, nếu như ta không sử dụng một DTD bên ngoài mà tự định nghĩa thì sẽ viết trong phần này

# 3. Ví dụ
Trước đây, các trang World Wide Web thường có <!DOCTYPE> được viết một cách đầy đủ như sau:

```html
<!DOCTYPE html PUBLIC
  "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

Khai báo kiểu tài liệu này là cho XHTML được tham chiếu tới một DTD. DTD này được tìm kiếm bằng cách truy cập đến đường dẫn SYSTEM "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" và sử dụng bộ định danh PUBLIC  "-//W3C//DTD XHTML 1.0 Transitional//EN". Khai báo này không có tập con trong và có phần tử gốc là `html`.

# 4. Một số DTD thông dụng:

## HTML 4.01 DTD
Strict DTD:
```html
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">
```

Transitional DTD:
```html
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
```

## XHTML 1.0 DTD
Strict DTD:
```html
 <!DOCTYPE html
     PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

Transitional DTD:
```html
 <!DOCTYPE html
     PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
     "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

# 5. Khác biệt với HTML5
Đối với HTML5, ta thường chỉ thấy <!DOCTYPE> như sau:

```html
<!DOCTYPE html>
```

Trong khai báo này ta không hề thấy PUBLIC/SYSTEM hay các đường dẫn như trên. Bởi vì HTML5 là chuẩn HTML không dựa trên SGML nên không cần sử dụng một DTD cho nó. Và hiện nay các trình duyệt cũng đã hỗ trợ rất tốt cho việc sử dụng chuẩn HTML5 nên ta không cần tham chiếu đến một đường dẫn bên ngoài, việc khai báo <!DOCTYPE> ở đây chỉ mang tính chất xác định kiểu văn bản và chỉ ra root-element.

# 6. Nguồn trích dẫn

https://vi.m.wikipedia.org/wiki/HTML

https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/ms256059(v=vs.100)?redirectedfrom=MSDN