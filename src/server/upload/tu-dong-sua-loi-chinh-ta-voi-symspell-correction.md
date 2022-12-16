![](https://lh3.googleusercontent.com/proxy/mWTBBjKJ-fvY4NR-zoxusLEDZicFmo8tEsJ0F_sAXUjnyhedQX1CU0zbmWuFQaVMitLpF7ckg18ik3a-KPnjAMAoPsSO9fmHzAQh2eBKpk9PIr36HbM_GxVDFL2OjXqE3ZktxP7Mbg)

Trong đời sống hàng ngày, chúng ta gặp các văn bản có chứa lỗi chính tả là rất nhiều. Đặc biệt, các mô hình học máy có dự đoán đầu ra là 1 văn bản mà độ chính xác chưa cao, thì kết quả dự đoán đó có thể có nhiều lỗi chính tả.

Symspell Correction là 1 giải pháp mà mọi người có thể tham khảo, với chức năng là đưa 1 văn bản có lỗi chính tả thành 1 văn bản đúng.

# Symspell

Symspell là 1 phương pháp sử dụng kỹ thuật Fuzzy Search (còn gọi là Approximate Search) để tìm kiếm 1 chuỗi "gần giống" (thay vì giống hệt) so với chuỗi ban đầu.

Ví dụ: Khi chúng ta có chuỗi đầu vào là "Lậpp trinh ứng dung", rõ ràng chuỗi này đã sai chính tả hoàn toàn (cụ thể là 3 lỗi), thì bằng Symspell chúng ta có thể trả về kết quả "Lập trình ứng dụng".

Kỹ thuật Fuzzy Search có thể được thực hiện bằng nhiều thuật toán khác nhau, như: Substring Comparison, Levenshtein distance, Longest common substring, ...

Symspell sử dụng Fuzzy Search thông qua thuật toán Xóa đối xứng (Symmetric Delete). Thuật toán này nhanh gấp 1 triệu lần so với những thuật toán thông thường khác.

Thuật toán xóa đối xứng này giảm độ phức tạp trong việc chỉnh sửa chuỗi ban đầu để có 1 ứng cử viên cũng như việc tra cứu trong bộ từ điển cho khoảng cách chỉnh sửa Damerau-Levenshtein. Nó có thể nhanh hơn 6 lần so với cách tiếp cận thông thường là: thêm, sửa, xóa, chuyển vị trí. Thuật toán này cũng hỗ trợ đa ngôn ngữ

Khoảng cách chỉnh sửa là số thao tác trên mỗi ký tự trong chuỗi ban đầu để đưa ra 1 chuỗi ứng cử viên.

Chúng ta cùng đi qua 3 loại chỉnh sửa lỗi chính tả được nhắc đến trong Symspell Correction:

# Chỉnh sửa 1 từ đơn

**Lookup** là 1 phương thức cho phép chỉnh sửa 1 từ đơn với tốc độ cao, với 1 số tham số như sau:
- Verbosity, cho phép điều chỉnh các kết quả trả về, nó gồm các giá trị như sau:
    
    + Top: Trả về các kết quả có tần suất trong bộ từ điển cao nhất và có khoảng cách chỉnh sửa là nhỏ nhất.
    + Closest: Trả về tất cả các kết quả có khoảng cách chỉnh sửa nhỏ nhất, và được sắp xếp theo tần suất giảm dần
    + All: Trả về tất cả các kết quả có khoảng cách chỉnh sửa trong mức cho phép, sắp xếp tăng dần theo khoảng cách chỉnh sửa và giảm dần về tần suất. **Thường được sử dụng nhiều**
- Maximum edit distance: Khoảng cách chỉnh sửa tối đa để đưa ra 1 ứng cử viên
- include_unknow: Đối số này quyết định xem có trả về chuỗi ban đầu hay không khi không có ứng cử viên nào được tìm thấy.
- ignore_token: Là 1 chuỗi regex và để xác định sẽ bỏ qua các chuỗi nào
- transfer_casing: Đối số quyết định xem có giữ lại định dạng viết hoa/thường như chuỗi đầu vào hay không.

Kết quả là:
- Với khoảng cách chỉnh sửa là 2, thì thời gian đưa ra kết quả là 0.033 ms/từ
- Với khoảng cách chỉnh sửa là 3, thì thời gian đưa ra kết quả là 0.18 ms/từ

Với kết quả này, có thể thấy thuật toán xóa đối xứng nhanh hơn 1870 lần so với BK-tree, và 1 triệu lần so với thuật toán của Norvig.

![](https://camo.githubusercontent.com/4345cd34a5feb5e4540ce640f6703c8d759449e414393811b312367456795d00/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f3830302f312a316c5f35704f59553341686f696a4b6656442d5161672e706e67)

# Chỉnh sửa 1 chuỗi nhiều từ (cụm từ)

Trong trường hợp này, Symspell sử dụng phương thức **LookupCompound** để hỗ trợ việc phân cách hoặc xóa phân cách trong các trường hợp lỗi chính tả:
- Chèn dấu cách vào 1 từ đúng
- Xóa dấu cách giữa 2 từ đúng
- 1 câu gồm nhiều từ có lỗi hoặc không có lỗi.

Có 1 số tham số như sau:
- Maximum edit distance, transfer_casing có chức năng tương tự phương thức **lookup**
- ignore_non_words: Quyết định xem ký tự không phải chữ cái thì có giữ nguyên hay không
- split_by_space: Quyết định xem có tách các cụm thành các từ bằng dấu cách hay không
- ignore_any_term_with_digits: Xem có bỏ qua từ nào có chữ số trong đó hay không

Ví dụ:

Với chuỗi đầu vào là:

`whereis th elove hehad dated forImuch of thepast who couqdn'tread in sixthgrade and ins pired him`

Kết quả đầu ra với khoảng cách chỉnh sửa là 9:

`where is the love he had dated for much of the past who couldn't read in sixth grade and inspired him`

Tốc độ là 0.2 ms/từ, tương ứng với 5000 từ/s

# Chỉnh sửa 1 chuỗi bị thiếu dấu cách

Trong trường hợp chuỗi đầu vào không bị sai chính tả ngoại trừ việc các dấu cách bị xóa, thì Symspell hỗ trợ phương thức **WordSegmentation**

Phương thức này có 1 số đối số như sau:
- Maximum edit distance, ignore_token: Giống với phương thức **lookup**
- Max segmentation word length: Độ dài tối đa của 1 từ sau khi được tách ra

Ví dụ:

Chuỗi đầu vào như sau:

`thequickbrownfoxjumpsoverthelazydog`

Kết quả đầu ra là:

`the quick brown fox jumps over the lazy dog`

Tốc độ xử lý cho 1 chuỗi đầu vào có 185 ký tự mất 4 ms để có kết quả gồm 53 từ

# Xây dựng bộ từ điển

Độ chính xác của phương pháp Symspell Correction phụ thuộc chủ yếu vào chất lượng của bộ từ điển mà chúng ta có. Có nhiều bộ từ điển có sẵn và các bạn có thể tham khảo [ở đây](https://github.com/wolfgarbe/SymSpell#frequency-dictionaries-in-other-languages)

Cấu trúc bộ từ điển:

- Phải là 1 file text được mã hóa dưới dạng UTF-8
- Mỗi dòng là 1 cặp gồm từ và tần suất xuất hiện, ký tự phân cách là dấu cách hoặc dấu tab. Như vậy sẽ có 2 cột trong file từ điển, 1 cột là từ và 1 cột là tần suất. Chúng ta có thể truyền các đối số thích hợp để Python có thể đọc được file từ điển. Các dòng kết thúc bởi ký tự `\r`, `\n` hoặc `\r\n`
- Tất cả ký tự phải viết thường

Mọi người có thể tham khảo nhiều bộ từ điển có sẵn ở [github này](https://github.com/wooorm/dictionaries), trong đó có cả Tiếng Việt.

Mọi người cũng có thể tự xây dựng 1 bộ từ điển theo đúng định dạng của mình. Đương nhiên, dữ liệu trong bộ từ điển càng lớn thì độ chính xác của phương pháp càng cao, nhưng tốc độ xử lý thì lại lâu hơn.

# Kết thúc

- Symspell là 1 phương pháp cho phép chỉnh sửa các lỗi chính tả 1 cách tự động, dựa trên kỹ thuật Fuzzy Search
- Độ chính xác của phương pháp phụ thuộc phần lớn vào chất lượng bộ từ điển chúng ta có. Bộ từ điển càng lớn thì càng chính xác, nhưng thời gian xử lý lại lâu hơn
- Symspell hỗ trợ đa ngôn ngữ trong đó có tiếng Việt.

## Tham khảo

- https://github.com/wolfgarbe/SymSpell
- https://medium.com/@wolfgarbe/1000x-faster-spelling-correction-algorithm-2012-8701fcd87a5f
- https://medium.com/@wolfgarbe/fast-approximate-string-matching-with-large-edit-distances-in-big-data-2015-9174a0968c0b
- https://github.com/mammothb/symspellpy
- https://symspellpy.readthedocs.io/en/latest/examples/index.html

Cảm ơn mọi người đã theo dõi :grinning: