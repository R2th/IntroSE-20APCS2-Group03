### Mở đầu
Do sắp tới dự án mình đang làm, KH mong muốn xây dựng chức năng tự động suggest keyword từ một đoạn text tiếng Nhật được nhập vào, và mình được giao cho nghiên cứu vụ này. Ban đầu mình cũng cảm thấy bế tắc vì mình không biết tiếng Nhật, cộng thêm xử lý ngôn ngữ tự nhiên cũng là một lĩnh vực không hề đơn giản chút nào khi gặp phải một số khó khăn như sau:   
+ Xử lý các từ đồng nghĩa, trái nghĩa.
+ Ngôn ngữ tự nhiên sử dụng ngữ cảnh một cách phức tạp một từ trong câu tuy theo hoàn cảnh mà mang ý nghĩa khác nhau: "con ngựa đá con ngựa đá".
+ Ngôn ngữ tự nhiên thường gây nhầm lẫn, trong tiếng Anh có khái niệm slang word(từ lóng) nó thường mang tính chất biến hóa, sinh động, ẩn dụ cho ngôn ngữ bình thường.

Cuối cùng thì KH vẫn là thượng đế và mình phải đưa ra giải pháp để xử lý vấn đề này. Sau một hồi tìm kiếm sự trợ giúp, mình cũng tìm được ra solution tuy chưa phải là giải pháp hoàn hảo nhưng cũng đã có một chút hy vọng để có thể deliver task cho KH. Sau đây là sẽ các bước mình xây dựng để giải quyết bài toán auto suggest tag:
1. Phân tách từ (Tokenizer) 
2. Tính toán tần xuất xuất hiện, mức độ quan trọng của từ (tf-idf)
3. Trích trọn từ khóa
 
Không vòng vo nữa, mình xin được phép bắt đầu.
### Phân tách từ (Tokenizer)
Để có thể rút trích từ khóa tự một câu hoặc đoạn văn nhập vào thì không thể để nguyên để xử lý được, do đó việc cần làm trước tiên là phân tách câu ra thành các cụm từ có ý nghĩa(POS). Đây cũng là bài toán được đem ra nghiên cứu từ rất sớm. Ví dụ với input: “con ruồi đậu mâm xôi đậu” hì chuỗi đầu ra sẽ là nhãn (tag sequence) được giống hàng tương ứng:
```
D N V N N N
```

Ở đây, D: determinator (định từ), N: noun (danh từ), V: verb (động từ). Khi đó, ta có chuỗi các cặp từ và từ loại tương ứng như sau: con (D); ruoi (N); dau (V); mam (N); xoi (N); dau (N)

Để hiểu rõ hơn các bạn có thể vào [đây](https://ongxuanhong.wordpress.com/2016/09/02/gan-nhan-tu-loai-part-of-speech-tagging-pos/) để đọc

Ở Việt Nam thì đã có công cụ để phân tích đó là: vnTokenizer của tác giả Lê Hồng Phương. Còn đối với tiếng Nhật thì Mecab là 1 công cụ phân tách từ rất nổi tiếng và hiệu quả (trên 99% với tiếng Nhật). Bản giới thiệu và hướng dẫn bằng tiếng Nhật tại [đây](http://taku910.github.io/mecab/)

Việc là tiếp theo bấy giờ là cài đặt Mecab vào máy, tại http://taku910.github.io/mecab/#download đã hướng dẫn bạn cách cài đặt chi tiết rồi hoặc tham khảo trên viblo đã có 1 số bài [viết](https://viblo.asia/p/phan-tich-ngon-ngu-tieng-nhat-voi-phan-mem-mecab-va-gem-natto-7rVRqpB9v4bP) hướng dẫn cài đặt mecab. Lưu ý
* Download và cài đặt cả 2 phần: source và dictionary của Mecab
* Khi cài đặt mecab-ipadic nếu gặp lỗi thì set ./configure --with-charset=utf8 chạy lại các bước tiếp theo

Sau khi cài đặt xong thì kết quả như sau
```
~$ mecab
すもももももももものうち
すもも	名詞,一般,*,*,*,*,すもも,スモモ,スモモ
も	助詞,係助詞,*,*,*,*,も,モ,モ
もも	名詞,一般,*,*,*,*,もも,モモ,モモ
も	助詞,係助詞,*,*,*,*,も,モ,モ
もも	名詞,一般,*,*,*,*,もも,モモ,モモ
の	助詞,連体化,*,*,*,*,の,ノ,ノ
うち	名詞,非自立,副詞可能,*,*,*,うち,ウチ,ウチ
EOS
```

Đến đây thì mình phải đi hỏi một chị comtor trong team, cộng thêm google thì thấy tool mecab đã giúp mình xử lý việc tách từ và gán nhãn cho loại từ đấy:
```
すもも	名詞_danh từ
も	助詞_trợ từ
もも	名詞_danh từ
も	助詞_ttrợ từ
もも	名詞_danh từ
の	助詞_ttrợ từ
うち	名詞_danh từ
```

### Tính toán tần xuất xuất hiện, mức độ quan trọng của từ (tf-idf)
Phần tiếp theo mình sẽ tính toán trọng số của của các POS thu được sau khi phân tách từ ở phần trên. POS có trọng số càng lớn thì khả năng POS đó chính là keyword của đoạn text vừa được nhập vào. 

Mình sẽ sử dụng thuật toán tf-idf để tính toán trọng số của các POS. Để có thể hiểu rõ hơn về thuật toán các bạn có thể xem bài của mình viết về [tf-idf](https://viblo.asia/p/tf-idf-term-frequency-inverse-document-frequency-JQVkVZgKkyd)

Tóm lại ta sẽ phải tính được 2 tham số tf và idf của các POS vừa thu được ở phía trên.

Để tính tf đầu vào là POS cần tính và đoạn text chứa nó
```
tf (POS, text)
  return (Number of times POS appears in text) / (Total number of terms in the text)
```
Trong đoạn text "すもももももももものうち" thì tf của "すもも" => 1/12

Cách tính idf với đầu vào là POS cần tính và 1 tập đoạn text(corpus). Corpus ở đây các bạn có thể lấy 3 đoạn text tiếng Nhật hoặc nhiều hơn, corpus càng lớn thì kết qủa càng chính xác hơn. Giả sử mình xây dựng được 1000 đoạn text trong corpus vậy idf sẽ được tính như sau:
```
idf (POS, corpus)
  return log_e(Total number of corpus / Number of corpus with POS in it)
```
Ví dụng Trong đoạn text "すもももももももものうち" thì idf của "すもも"(giả sử "すもも" xuất hiện ở 10 đoạn text trong corpus) => log_e(1000/10) ~= 4.6

Như vậy giá trị tf-idf của "すもも" = 1/12 * 4.6 ~= 0.38

### Trích trọn từ khóa
Các bước cở bản để rút trích từ khóa cho văn bẳn cũng đã xong bây giờ chỉ còn việc build code sao cho phù hợp với ứng dụng của bạn thôi. Do dự án hiện tại của mình phát triển với ruby on rails do đó mình sẽ demo một đoạn service như sau:

Để tích hợp mecab với ứng dụng ruby on rails thì mình sẽ sử dụng gem natto. Các bạn có thể xem thông tin về natto tại [đây](https://github.com/buruzaemon/natto)

Cách cài đặt thì không có gì khó cả, chỉ cần trước đấy đã cài mecab sau đó gõ lệnh:
```
gem install natto
```

Để kiểm tra xem máy bạn đã cài đặt thành công chưa bạn thử tạo một file ruby như dưới đây
```
#test_natto.rb

require 'natto'

nm = Natto::MeCab.new

puts nm.parse('俺の名前は星野豊だ！！そこんとこヨロシク！')
```

Sau đó chạy lệnh sau để kiểm tra
```
$ ruby test_natto.rb 
俺	名詞,代名詞,一般,*,*,*,俺,オレ,オレ
の	助詞,連体化,*,*,*,*,の,ノ,ノ
名前	名詞,一般,*,*,*,*,名前,ナマエ,ナマエ
は	助詞,係助詞,*,*,*,*,は,ハ,ワ
星野	名詞,固有名詞,人名,姓,*,*,星野,ホシノ,ホシノ
豊	名詞,固有名詞,人名,名,*,*,豊,ユタカ,ユタカ
だ	助動詞,*,*,*,特殊・ダ,基本形,だ,ダ,ダ
！	記号,一般,*,*,*,*,！,！,！
！	記号,一般,*,*,*,*,！,！,！
そこ	名詞,代名詞,一般,*,*,*,そこ,ソコ,ソコ
ん	助詞,特殊,*,*,*,*,ん,ン,ン
とこ	名詞,一般,*,*,*,*,とこ,トコ,トコ
ヨロシク	感動詞,*,*,*,*,*,ヨロシク,ヨロシク,ヨロシク
！	記号,一般,*,*,*,*,！,！,！
EOS
```
Tiếp theo mình sẽ viết code cho phần tính toán tf-idf. Tuy nhiên những đoạn code dưới đây chỉ là để tham khảo do tùy từng cách suy luận của mỗi người sẽ có những cách build khác nhau. Do đó mình sẽ viết để các bạn thấy được các công việc cần phải làm như sau:
```
def tf doc, term
  return count_sub_string(doc, term) / doc.split("").size.to_f
end
```

```
def idf docs, term
  n = 0
  docs.each do |doc|
    doc.each do |word|
      if word.include? term
        n += 1
        break;
      end
    end
  end
  (n > 0) ? Math.log(docs.size / n.to_f) : Math.log(docs.size)
end
```

```
def tfidf doc, docs, term
  return tf(doc, term) * idf(docs,term)
end
```

```
def count_sub_string string, substring
  string.scan(/(?=#{substring})/).count
end
```
Ngoài ra mình còn xây dựng một function make_tag sẽ thực hiện các công việc sau. Lưu ý các bạn còn phải tự xây dựng `corpus` để có thể đảm bảo cho kết quả chính xác như mình đã nói ở phần trên. Trong VD này mình sử dụng corpus có size lớn hơn 2000.
```
def make_tag text
  #sử dụng gem natto để tách text được truyền vào thành các POS
  nm = Natto::MeCab.new
  nm.parse(term) do |n|
    ...
  end
  
  #Với các pos thu thập được lần lượt tính tf-idf cho từng pos
  hash_result = {}
  pos_arr.each do |word|
    value = tfidf(text, corpus, word);
    hash_result[word] = {tfidf: value, type: pos_type}
  end
  
  # Sắp xếp lại kết quả
  Hash[hash_result.sort_by{|k,v| v[:tfidf]}]
end
```
Kết quả sau khi mình thực hiện
```
$ a = AutoSuggestService.new 
$ a.make_tag "洗面所の天井照明が部品交換になった場合、玄関についているセンサー付きのタイプと同じようなものに交換可能か。"
{
  ...
  "照明"=>{:tfidf=>0.11639073954166942, :type=>"名詞"},
  "同じ"=>{:tfidf=>0.11793002238154512, :type=>"連体詞"},
  "天井"=>{:tfidf=>0.11960331809288416, :type=>"名詞"},
  "タイプ"=>{:tfidf=>0.12346236992869475, :type=>"名詞"},
  "洗面"=>{:tfidf=>0.13125977585385176, :type=>"名詞"},
  "センサー"=>{:tfidf=>0.1347659596383509, :type=>"名詞"},
  "付き"=>{:tfidf=>0.1347659596383509, :type=>"名詞"},
  "交換"=>{:tfidf=>0.17460501422010105, :type=>"名詞"}
}
```
Như vậy mình đã tính được tf-idf của các pos được tách ra từ đoạn text được nhập vào. Kết quả ở trên hiển thị 8 pos có trọng số tf-idf cao nhất. Dựa vào kết quả thu được ta có thể suy ra đưowjc keyword của đoạn text nhập vào hoặc là tag cho đoạn text đó.

### Kết luận
Mình xin phép được tạm dừng tại đây mặc dùng là thuật toán còn đơn giản nhưng mà mình cũng đã phải bỏ công sức và thời giản để cài đặt và cải thiện thuật toán. 

Trong thời gian tới mình sẽ cải thiện thuật toán để đảm bảo độ chính xác của thuật toán hơn. Hy vọng là các bạn sẽ đón nhận

Nếu các bạn có thắc mắc thì hãy comment ở bên dưới nhé