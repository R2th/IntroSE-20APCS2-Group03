Khi tham gia vào các dự án cho khách hàng Nhật Bản, chắc hẳn không ít người từng phải lên mạng tìm kiếm các Regular expression để thực hiện validate dữ liệu tiếng Nhật.
Dưới đây là một số Regular expression thông dụng.

## Trường hợp chữ số

### Tất cả đều là chữ số (fullwidth)

```
/^[０-９]+$/
```

### Tất cả đều là chữ số (halfwidth)

```
/^[0-9]+$/
```

### Tất cả đều là chữ số (fullwidth, halfwidth)

```
/^[0-9０-９]+$/
```

### Tất cả các số fullwidth (kể cả số âm, số thập phân)

```
/^[ー]?[０-９]+(\．[０-９]+)?$/
```

### Tất cả các số halfwidth (kể cả số âm, số thập phân)

```
/^[-]?[0-9]+(\.[0-9]+)?$/
```

## Trường hợp ký tự thường

### Ký tự alphabet halfwidth (chữ thường)

```
/^[a-z]+$/
```

### Ký tự alphabet halfwidth (chữ in hoa)

```
/^[A-Z]+$/
```

### Ký tự alphabet halfwidth (chữ in hoa và chữ thường)

```
/^[a-z0-9]+$/
```

### Ký tự alphabet halfwidth và chữ số (chữ in hoa, chữ thường, chữ số)

```
 /^[a-zA-Z0-9]+$/
 ```
 
 ### Ký tự Hiragana fullwidth
 
 ```
 /^[ぁ-ん]+$/
 ```
 
 ### Ký tự Katakana fullwidth
 
 ```
 /^([ァ-ン]|ー)+$/
 ```
 
 ### Ký tự Hiragana và Katakana fullwidth
 
 ```
 /^[ぁ-んァ-ン]+$/
 ```
 
 ### Ký tự Kana halfwidth
 
 ```
 /^[ｧ-ﾝﾞﾟ]+$/
 ```
 
 ### Ký tự Kanji
 
 ```
 /^[一-龥]+$/
 ```
 
 ### Ký tự Hiragana fullwidth và Kanji
 
 ```
 /^[一-龥ぁ-ん]/
 ```
 
 ### Ký tự Hiragana, Katakana fullwidth và Kanji
 
 ```
 /^[ぁ-んァ-ン一-龥]/
 ```
 
 ## Trường hợp Email
 
 ```
 /^\S+@\S+\.\S+$/
 ```
 
 ## URL
 
 ```
 /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/
 ```
 
 ## Trường hợp số điện thoại
 
 ### Số điện thoại (không có dấu gạch ngang, 10 ký tự)
 
 ```
 /^\d{10}$/
 ```
 
 ### Số điện thoại (không có dấu gạch ngang, 11 ký tự)
 
 ```
 /^\d{11}$/
 ```
 
 ### Số điện thoại (không có dấu gạch ngang, 10 hoặc 11 ký tự)
 
 ```
 /^\d{10}$|^\d{11}$/
 ```
 
 ## Trường hợp số thẻ tín dụng
 
 ```
 /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/
 ```
 
 ## Trường hợp Mã bưu chính (postal code)
 
 ### Mã bưu chính (Có dấu gạch ngang, 3, 5 hoặc 7 chữ số)
 
 ```
 /^\d{3}[-]\d{4}$|^\d{3}[-]\d{2}$|^\d{3}$/
 ```
 
 ### Mã bưu chính (Không có dấu gạch ngang, 3 chữ số)
 
 ```
 /^\d{3}$/
 ```
 
  ### Mã bưu chính (Có dấu gạch ngang, 5 chữ số)
 
 ```
/^\d{3}[-]\d{2}$/
 ```
 
  ### Mã bưu chính (Có dấu gạch ngang, 7 chữ số)
 
 ```
/^\d{3}[-]\d{4}$/
 ```
 
 ### Mã bưu chính (Có hoặc không có dấu gạch ngang)
 
 ```
 /^\d{3}[-]\d{4}$|^\d{3}[-]\d{2}$|^\d{3}$|^\d{5}$|^\d{7}$/
 ```
 
 ## Kết luận

Khi bạn đã biết về Regular expression,  trong nhiều trường hợp ở trên bạn hoàn toàn có thể tự viết được đoạn code của mình (trừ các trường hợp liên quan đến Hiragana hay Katakana). Hi vọng bài có thể giúp bạn đỡ mất thời gian tìm hiểu các đoạn Regular expression của mình

## Tham khảo
https://qiita.com/fubarworld2/items/9da655df4d6d69750c06