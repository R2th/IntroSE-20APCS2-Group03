Xin chào mọi người! Cũng gần 3 tháng rồi mình mới lại viết ở đây. Lần này chắc viết cái gì nó ngắn ngắn và dễ dễ tí thôi... à nhầm, đau đầu vãi chưởng: REGEX

Thôi vào bài luôn

# Bảng ASCII
## Các chữ cái alphabet
Chỉ cần từ a đến z là xong nên lấy cú pháp này
```
[a-z]
```
À tất nhiên còn phải tính chữ hoa tương tự trên
```
[A-Z]
```
Gộp lại thì ta có
```
[a-zA-Z]
```
## Các chữ số
Tương tự trên, chúng ta có thể dùng 
```
[0-9]
```
Nhưng có thể viết khác nhanh hơn là
```
\d
```
## Kí tự đặc biệt 1 byte
```
[ -/:-@\[-~]
```
## Tất cả các kí tự đặc biệt
Các kí tự từ dấu cách tới ~
```
[ -~]
```
## Ví dụ
Chuỗi chữ, số và kí tự thông thường theo bảng ASCII
```
[ -~]+
```
Cũng như trên nhưng số lượng kí tự chỉ từ 4-8
```
[ -~]{4,8}
```
# Các kí tự tiếng Nhật
## Regex cho tất cả các Hán tự tiếng Nhật cả phổ biến lẫn không phổ biến (4e00 – 9fcf) 
```
([一-龯])
```
## Regex của bộ Hiragana và Katakana
```
([ぁ-んァ-ン])
```
## Regex của các ký tự Non-Hirgana và Non-Katakana
```
([^ぁ-んァ-ン])
```
## Regex của Hirgana, Katakana và các dấu câu tiếng Nhật (、。’)
```
([ぁ-んァ-ン\w])
```
## Regex của Hirgana, Katakana và các kí tự random khác
```
([ぁ-んァ-ン！：／])
```
## Regex của Hirgana
```
([ぁ-ん])
```
## Regex của full-width Katakana (全角)
```
([ァ-ン])
```
## Regex của half-width Katakana (半角)
```
([ｧ-ﾝﾞﾟ])
```
## Regex của các số Nhật full-width (全角)
```
([０-９])
```
## Regex của các kí tự Hiragana (gồm cả các kí tự không phát âm)
```
([ぁ-ゞ])
```
## Regex của các kí tự full-width Katakana (gồm cả các kí tự không phát âm)
```
([ァ-ヶ])
```
## Regex của các kí tự half-width Katakana (thứ tự có hơi khác với Hiragana)
```
([ｦ-ﾟ])
```
## Regex mã bưu chính Nhật Bản
```
/^¥d{3}¥-¥d{4}$/
/^¥d{3}-¥d{4}$|^¥d{3}-¥d{2}$|^¥d{3}$/
```
## Regex cho số điện thoại di động của Nhật
```
/^¥d{3}-¥d{4}-¥d{4}$|^¥d{11}$/
/^0¥d0-¥d{4}-¥d{4}$/
```
## Regex của điện thoại để bàn của Nhật
```
/^[0-9-]{6,9}$|^[0-9-]{12}$/
/^¥d{1,4}-¥d{4}$|^¥d{2,5}-¥d{1,4}-¥d{4}$/
```
# Tham khảo
http://www-creators.com/archives/5187

https://gist.github.com/terrancesnyder/1345094