**Mojinizer** là một gem dùng để convert  giữa các hệ chữ hiragana, katakana và romaji.
# **1. Cài đặt**

Trong Ruby on the Rails, thêm dòng sau vào Gemfile sau đó bundle:

```Ruby
# Gemfile

gem 'mojinizer'
```

# **2. Cách dùng**

Các method được sử dụng để convert và detect đã được thêm vào class String sau khi cài đặt gem. Do đó, ta có thể gọi thông qua String object's method.

**Các method dùng để convert:**

- Hiragana/katakana --> romaji  (平仮名/片仮名 --> ロ－マ字 変換)

```Ruby
"つくえ".romaji #=> "tsukue"
"ツクエ".romaji #=> "tsukue"
```

- Katakana/romaji--> hiragana  (片仮名/ロ－マ字 --> 平仮名 変換)

```Ruby
"ツクエ".hiragana #=> "つくえ"
"tsukue".hiragana #=> "つくえ"
```

- Hiragana/romaji --> katakana (平仮名/ロ－マ字 --> 片仮名 変換)

```Ruby
"つくえ".katakana #=> "ツクエ"
"tsukue".katakana #=> "ツクエ"
```

- Hiragana --> katakana  (平仮名 --> 片仮名 変換)

```Ruby
"つくえ".hira_to_kata #=> "ツクエ"
```

- Katakana --> hiragana (片仮名 --> 平仮名 変換)

```Ruby
"ツクエ".kata_to_hira #=> "つくえ"
```

- Hankaku --> zenkaku (半角 --> 全角 文字種変換)

```Ruby
"ｱﾛﾊ".han_to_zen #=> "アロハ"
"Aloha!".han_to_zen #=> "Ａｌｏｈａ！"
```

- Zenkaku --> hankaku (全角 --> 半角 文字種変換)

```Ruby
"アロハ".zen_to_han #=> "ｱﾛﾊ"
"Ａｌｏｈａ！".zen_to_han #=> "Aloha!"
```

- Zenkaku <--> hankaku normalization (全角 <--> 半角 文字規準化)

```Ruby
"ｱﾛﾊ！".normalize_zen_han #=> "アロハ!"
"｢Ａｌｏｈａ｣".normalize_zen_han #=> "「Aloha」"
```

```"tsukue".katakana.zen_to_han #=> "ﾂｸｴ"
"ﾂｸｴ".han_to_zen.hiragana #=> "つくえ"
"ﾂｸｴ".han_to_zen.romaji #=> "tsukue"
"ﾂｸｴ".han_to_zen.romaji.upcase #=> "TSUKUE"
"ﾂｸｴ".han_to_zen.romaji.upcase.han_to_zen #=> "ＴＳＵＫＵＥ"
```

**Các method dùng để kiểm tra**

Các hàm detection giúp kiểm tra chuỗi truyền vào thuộc kiểu Hiragana, Katakana, ... trả về giá trị true, false.

 - Cả chuỗi là kiểu Hiragana/Katakana ?
```Ruby
"アロハ".kana? #=> true
"すし".kana? #=> true
"Aloha".kana? #=> false
"Let's eat すし".kana? #=> false
"アロハ".katakana? #=> true
"すし".katakana? #=> false
"アロハ everybody".katakana? #=> false
"アロハ".hiragana? #=> false
"すし".hiragana? #=> true
"Let's eat すし".hiragana? #=> false
```

- Cả chuỗi là kiểu Kanji ?
```Ruby
""金曜日".kanji? #=> true
"金曜日だよ".kanji? #=> false
"It's Friday, 金曜日".kanji? #=> false
```

- Cả chuỗi là chữ tiếng Nhật ?
```Ruby
"アロハ".japanese? #=> true
"Let's eat すし".japanese? #=> false
```

**Check chuỗi string có chữa kiểu chữ nào hay không, trả về true, false**

- Có chứa  kana(hiragana/katakana) ?
```Ruby
"Let's eat すし".contains_kana? #=> true
```
- Có chứa hiragana ? katakana?
```Ruby
"アロハ everybody".contains_katakana? #=> true
"Let's eat すし".contains_katakana? #=> false
"アロハ everybody".contains_hiragana? #=> false
"Let's eat すし".contains_hiragana? #=> true
```
- Có chứa kanji?
```Ruby
"金曜日だよ".contains_kanji? #=> true
"It's Friday, Friday".contains_kanji? #=> false
```

- Có chứa tiếng Nhật?
```Ruby
"Let's eat すし".contains_japanese? #=> true
"It's Friday, Friday".contains_japanese? #=> false
```
 
Tài liệu dịch: https://github.com/ikayzo/mojinizer