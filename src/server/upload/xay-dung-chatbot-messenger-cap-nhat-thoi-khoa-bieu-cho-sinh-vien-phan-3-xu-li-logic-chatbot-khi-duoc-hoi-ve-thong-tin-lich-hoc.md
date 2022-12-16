![](https://images.viblo.asia/4a8fa908-8ad1-4be2-863d-90faf8fe9467.png)

# 1. Đặt vấn đề 
Tiếp tục chuỗi bài viết về chatbot Messanger, hôm nay mình tiếp tục viết phần thứ 3. Trong bài viết trước: [Xây dựng chatbot Messenger cập nhật thời khóa biểu cho sinh viên (Phần 2) - Chatbot đơn giản và kết nối messenger](https://viblo.asia/p/xay-dung-chatbot-messenger-cap-nhat-thoi-khoa-bieu-cho-sinh-vien-phan-2-chatbot-don-gian-va-ket-noi-messenger-L4x5xL4m5BM), chúng ta đã có một cái base khá ổn cho chatbot, và cũng có thể giao tiếp cơ bản trên messenger được rồi. Các chức năng tiếp theo của chatbot, chúng ta sẽ chỉ cần cập nhật thêm là sẽ hoàn thiện chatbot dần trở lên thông minh hơn. 

Trong bài viết này, mình sẽ cập nhật chức năng chính đầu tiên của chatbot: Hỏi đáp về lịch học trong một khoảng thời gian.

Bắt đầu nào :smile:
* ## Luồng hội thoại
Trước khi tiến hàn code, chúng ta cần clear ý tưởng một chút đã. 

Dưới đây là một biểu đồ hoạt động mình vẽ tạm ra (mình không phải dân chuyên thiết kế hệ thống nên các bạn đừng gạch đá cái ảnh này nha, mình vẽ để mô tả cho dễ hiểu hơn thôi). Mình sẽ mô tả qua một chút: 

![](https://images.viblo.asia/d0c09f42-4a17-4c7e-8867-0f87feb32126.PNG)

* Ok, đầu tiên, khi một người dùng (sinh viên) bất kì muốn hỏi về lịch học của họ, họ sẽ bắt đầu với bot bằng một câu đại loại như này: "Cho mình xem lịch học vào thứ 4 tuần sau đi"
* Khi đó, chatbot sẽ có được user_id của người hỏi (user id của facebook nhá), tiến hành kiểm tra xem ở database đã có lưu MSSV của user này hay chưa (Tức là muốn xem trước đây người này đã từng cung cấp MSSV chưa ấy mà)
    * Nếu trong database đã có MSSV của người đó, việc tiếp đến là dùng MSSV để search xem trong database lưu thông tin thời khóa biểu đã có thông tin về thời khóa biểu của MSSV này không
        * Nếu có, chúng ta sẽ lấy được ra thời khóa biểu. Việc tiếp đến là phân tích message để trích rút ra thông tin "thứ 4 tuần sau" xem nó là thời gian nào, kết hợp với thời khóa biểu, chúng ta sẽ có message trả ra
        * Nếu không, chúng ta cần thực hiện một request đến trang web của trường để lấy thời khóa biểu tương ứng với MSSV của user, sau đó lưu lại vào database. Lại tiếp tục lấy từ thời khóa biểu ra, xử lí tin nhắn lấy thông tin thời gian và trả ra message
    * Nếu chưa, chúng ta sẽ đưa user sang một action khác : "action_ask_studentcode", ở đây, user sẽ cập nhật MSSV vào database để tiện cho những lần hỏi sau.
* Done! Kết thúc 

* ##  Các vấn đề cần xử lí
Một vài vấn đề cần xử lí ở đây có thể kể đến như:
* Lưu trữ database như thế nào?
    * Trước hết là về lưu mssv: Cần đảm bảo các vấn đề về bảo mật thông tin user (ở đây là MSSV của user), nhẹ, nhanh, ...
    * Lưu thời khóa biểu: Trong [phần 1](https://viblo.asia/p/xay-dung-chatbot-messenger-cap-nhat-thoi-khoa-bieu-cho-sinh-vien-phan-1-phan-tich-thiet-ke-he-thong-OeVKBW8QZkW), chúng ta đã crawl được một dictionary về các thông tin trong thời khóa biểu, lưu trữ như nào đây: cơ sở dữ liệu quan hệ ?? phi quan hệ ??? làm sao để update lại database theo định kì (vì thời khóa biểu có bao giờ cố định lâu được đâu)
* Xử lí tin nhắn thế nào?
    * Rasa giúp chúng ta xác định được intent của message, nhưng xác định thời gian được nhắc đến thì rasa lại không giúp được 
    * Làm thế nào để trích xuất ra được thông tin thời gian trong câu??

Các bạn có đề xuất gì không nhỉ ???
# 2. Đề xuất phương pháp
* ## Temporary Database
*Về vấn đề lưu trữ MSSV*, ở đây mình sử dụng sqlite (1 nosql nhẹ và đơn giản để sử dụng)

Thông tin về user id khi lưu vào database sẽ được mã hóa bằng hash md5 để đảm bảo tính bảo mật
```
import sqlite3

sql_path = './chatbot_backend/schedule.db'

def insert_student(sender_id, student_id):
    # sender_id ở đây là user_id của facebook sau khi đã hash bằng md5
    try:
        sqliteConnection = sqlite3.connect(sql_path)
        cursor = sqliteConnection.cursor()
        print("Connected to SQLite")
        cursor.execute('INSERT INTO student(sender_id, student_id) VALUES(?, ?)', (sender_id, student_id))
        sqliteConnection.commit()
        cursor.close()
    except sqlite3.Error as error:
        print("Failed to insert data: ", error)
    finally:
        if(sqliteConnection):
            sqliteConnection.close()
            print("The sqlite connection is closed")
```
*Về lưu trữ thời khóa biểu*, mình từng nghĩ đến khá nhiều cách khác nhau, nhưng sau tất cả, mình chọn lưu thời khóa biểu vào 1 file json. File json này có đặc điểm gì ???
* Có 1 trường date: lưu thông tin ngày cập nhật thời khóa biểu
* Các trường tiếp theo là "MSSV":"thời khóa biểu"  của từng sinh viên khác nhau
* Cập nhật file json như nào ?? Khi có một MSSV và bạn muốn lấy ra thời khóa biểu:
    * Kiểm tra giá trị của "date" với ngày hôm nay: Nếu "date" == "datetime.now().date()", chúng ta sẽ kiểm tra MSSV
        * Nếu MSSV có trong file json, chúng ta sẽ lấy ra thời khóa biểu tương ứng
        
        * Nếu MSSV không có trong file json, tiến hành crawl web và lấy ra thời khóa biểu
    * Nếu "date" != "datetime.now().date()", xóa toàn bộ file json, cập nhật lại date, crawl data và lưu lại thời khóa biểu vào file json. 
```
    def insert_schedule_json(self, student_code):   
        schedule  = ScheduleCrawler(student_code=student_code).get_schedule()
        new = {student_code : schedule}

        with open(json_path, "r+") as file:
            data = json.load(file)
        if datetime.strptime(data["date"], '%d-%m-%Y').date() == datetime.now().date():
            data.update(new)
        else:
            data = {"date" : (datetime.now().date()).strftime("%d-%m-%Y")}
            data.update(new)
        with open(json_path, "w") as file:
            json.dump(data, file)
```

Hơi rối nhỉ, nhưng việc xử lí logic như này là cần thiết
> Có thể bạn sẽ thắc mắc là tại sao không cứ trực tiếp gửi request lên web để crawl data là được rồi, làm thế này làm gì mệt ra. Vậy hãy hình dung có một ngày, chatbot của bạn có 500 người hỏi, mỗi người hỏi đùa vui khoảng 10-20 câu hỏi về lịch học, vậy chúng ta sẽ cần gửi 5000-10000 request lên web trường. Cẩn thận lại bị BAN mất đấy :smile:

> Trường "date" mình cho trong file json để đảm bảo chúng ta sẽ cập nhật thời khóa biểu theo ngày, nếu sang một ngày mới, chúng ta sẽ xóa và cập nhật file json. Các bạn có thể muốn cập nhật theo tuần, tháng, năm, ... thì sửa trường này này week, month, year và so sánh với now().month(), now().year(), ... là được.

* ## Lấy thông tin thời gian trong câu
Vấn đề tiếp theo là làm sao biết được user hỏi về khoảng thời gian nào. Chúng ta hãy điểm qua một vài hướng xử lí sau đây
* **Duckling HTTP Extractor**

Rasa NLU có hỗ trợ trích chọn ra những đặc trưng trong câu về thời gian, nhiệt độ, tiền tệ, ... với [Duckling HTTP Extractor](https://rasa.com/docs/rasa/nlu/components/#ducklinghttpextractor). Extractor này giúp kết nối đến thư viện [duckling](https://github.com/facebook/duckling) được viết chuyên cho việc trích xuất các thông tin sau: 

![](https://images.viblo.asia/dea1ddf1-3e4f-4adf-9b4d-65314e008f18.PNG)

Đặc biệt khá may mắn, Duckling HTTP Extractor cũng có hỗ trợ tiếng Việt luôn

* Tuy nhiên, vẫn có một vài điểm bất tiện sau:
    * Về thời gian, Duckling HTTP Extractor chỉ extract ra được thông tin về 1 ngày cụ thể (hoặc 1 giờ, ...), không thể extract ra khoảng thời gian => Không giúp chúng ta biết được khoảng thời gian nếu có sinh viên hỏi lịch học trong cả 1 tuần
    * Để Duckling HTTP Extractor có thể hoạt động, chúng ta cần phải mở một cổng 8000 để server duckling hoạt động, vậy là chỉ để cho chạy được chatbot này, chúng ta sẽ cần 3 cổng tất cả : 5005 (rasa), 5055 (action) và 8000 (duckling) - Khá bất tiện
        ```
        docker run -p 8000:8000 rasa/duckling.
        ```
Vậy nên chúng ta sẽ xét một vài phương án khác.

* **Dateparser, Datefinder**

Một vài thư viện khác mình tìm được cũng hỗ trợ cho việc trích xuất ra thông tin về thời gian trong câu là [Dateparser](https://dateparser.readthedocs.io/en/latest/) và [Datefinder](https://datefinder.readthedocs.io/en/latest/). Cả 2 thư viện này đều cho chung một vài điểm sau:
* Ưu điểm
    * Có hỗ trợ Tiếng Việt
    * Kết quả extract khá tốt
* Nhược điểm 
    * Vẫn chưa đưa ra được kết quả về khoảng thời gian
    * Câu để làm tham số truyền vào cần chỉ thời gian: Ví dụ: "tuần sau" và "Mình muốn hỏi lịch học vào tuần sau", thì chỉ có thể xử lí được "tuần sau"

Vậy nên, chúng ta sẽ đi đến cách cuối cùng
* **Custom**

Dùng thư việc Rasa hỗ trợ hay thư viện python bên ngoài đều không đáp ứng nổi yêu cầu chatbot, chúng ta sẽ tự tạo ra 1 hàm của riêng mình, đáp ứng riêng nhu cầu cho chức năng này. (có làm thì mới có ăn :smile:)

Điểm qua một số thứ cần làm:
* Hàm có khả năng trích ra thông tin nếu hỏi một ngày cụ thể
* Hàm có khả năng trích ra ngày đầu và ngày cuối nếu hỏi một tuần cụ 

Đến phần tiến theo nào ...
# 3. Xây dựng hàm lấy thông tin về thời gian 
Trước tiên, ta cần hình dung tất cả các trường hợp tin nhắn có thể xảy ra nếu sinh viên hỏi lịch học
```
- ngày 30-5-2020 học môn gì đấy
- thời khóa biểu ngày 12-05
- cho xem thời khóa biểu ngày mai 
- sắp tới học cái gì vào thứ 6 tuần sau?
- thời khóa biểu ngày 12 tháng này
- lịch học ngày này tuần trước
- môn gì ngày 13/5-2019
- ...
```
Khá đa dạng nhỉ, nhưng chúng ta có thể chia làm 2 dạng chính (theo thông tin thời gian trong câu)
* Thời gian dạng dd-mm-yyyy hoặc dd-mm
* Thời gian dạng câu từ: tuần sau, ngày mai, ...

Chúng ta sẽ dựa trên cơ sở này để bắt thông tin thời gian cho từng trường hợp cụ thể. 
* ## Regular Expression (Regex)
Với thời gian dạng dd-mm-yyyy hay dd-mm, mình sẽ sử dụng cách đơn giản và thần thánh nhất: *Regular Expression* hay gọi tắt là Regex. Nếu các bạn chưa học Regex, chắc các bạn đã bỏ lỡ một công cụ vô cùng mạnh mẽ để xử lí với chuỗi (dù ở bất cữ ngôn ngữ lập trình nào). 

Để bắt đầu làm quen với Regex, các bạn có thể tham khảo bài viết sau: [Học Regular Expression và cuộc đời bạn sẽ bớt khổ (Updated v2.2)](https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY). Ngoài ra thì nếu ai chưa biết Regex thú vị thế nào, các bạn co thể đọc thêm một vài viết khác: [Kiểm tra một số có phải số nguyên tố không bằng regex?](https://viblo.asia/p/kiem-tra-mot-so-co-phai-so-nguyen-to-khong-bang-regex-ORNZqDGGK0n)

Ok, hết phần PR, quay lại công việc của chúng ta, chúng ta cần một Regex để bắt được các thông tin về thời gian có dạng dd-mm-yyyy
```
# REGEX
REGEX_DATE = r"(3[01]|[12][0-9]|0?[1-9])[-\/:|](1[0-2]|0?[1-9])([-\/:|](2[0-1][0-9][0-9]))"
REGEX_DAY_MONTH = r"(3[01]|[12][0-9]|0?[1-9])[-\/:|](1[0-2]|0?[1-9])"
REGEX_MONTH_YEAR = r"(1[0-2]|0?[1-9])([-\/:|](2[0-1][0-9][0-9]))"

def regex_date(msg, timezone="Asia/Ho_Chi_Minh"):
    ''' use regex to capture date string format '''

    tz = pytz.timezone(timezone)
    now = datetime.datetime.now(tz=tz)

    date_str = []
    regex = REGEX_DATE
    regex_day_month = REGEX_DAY_MONTH
    regex_month_year = REGEX_MONTH_YEAR
    pattern = re.compile("(%s|%s|%s)" % (
        regex, regex_month_year, regex_day_month), re.UNICODE)

    matches = pattern.finditer(msg)
    for match in matches:
        _dt = match.group(0)
        _dt = _dt.replace("/", "-").replace("|", "-").replace(":", "-")
        for i in range(len(_dt.split("-"))):
            if len(_dt.split("-")[i]) == 1:
                _dt = _dt.replace(_dt.split("-")[i], "0"+_dt.split("-")[i])
        if len(_dt.split("-")) == 2:
            pos1 = _dt.split("-")[0]
            pos2 = _dt.split("-")[1]
            if 0 < int(pos1) < 32 and 0 < int(pos2) < 13:
                _dt = pos1+"-"+pos2+"-"+str(now.year)
        date_str.append(_dt)
    return date_str
```
Chắc mình sẽ không giải thích về cách mà hàm regex_date này họat động, vì nó khá khó giải thích. Output của hàm này sẽ là một list các ngày mà regex bắt được (dạng dd-mm-yyyy, dd-mm, ...), và tự động đưa về cùng 1 chuẩn chung

Xong phần dễ, bây giờ chúng ta đổi mặt với vấn đề to hơn.
* ## N-gram and matching
Chúng ta sẽ áp dụng một phương pháp khá phổi biến trong NLP: N-grams. Tuy nhiên, sẽ không có word embedding hay tính xác suất gì ở đây cả. Chỉ đơn giản là dùng n-gram để lấy ra các cụm từ : 2 từ (bigram), 3 từ (trigram), ... sau đó, matching 1 loạt các cụm từ này với file synonyms mà chúng ta định nghĩa, với mong muốn quy đổi các cụm từ này thành các thông tin về thời gian. Cụ thể như sau 

Viết 1 file synonyms.json
```
{
  "hôm qua": "daysago",
  "ngày hôm qua": "daysago",
  "ngày mai": "nextday",
  "mai": "nextday",
  "hôm nay": "today",
  "ngày hôm nay": "today",
  "hôm này": "today",
  "ngày qua": "daysago",
  "hôm trước": "daysago",
  "ngày tới": "nextday",
  ...
  "tháng 9": "month9",
  "tháng chín": "month9",
  "tháng 10": "month10",
  "tháng mười": "month10",
  "tháng 11": "month11",
  "tháng mười một": "month11",
  "tháng 12": "month12",
  "tháng mười hai": "month12"
  }
```
Tiếp theo là xử lí message

Đầu tiên, thao tác cơ bản trong NLP trước khi xử lí một câu: Loại bỏ dấu câu, đưa về chữ thường, ...
```
def preprocess_msg(msg):
    ''' return a list of character of messenger without punctuation'''
    msg = msg.lower()
    # rm punctuation
    special_punc = string.punctuation
    for punc in "-+/:|":
        special_punc = special_punc.replace(punc, '')
    msg = ''.join(c for c in msg if c not in special_punc)
    return msg.split()
```
Tiếp đến, tiến hành lấy ra các token về thời gian trong câu sau khi đã dùng n-grams và matching với file synonyms
```
def tokenize(msg):
    ''' extract date in messenger by matching in synonyms.json '''

    words = preprocess_msg(msg)

    tokens = []
    n_grams = (8, 7, 6, 5, 4, 3, 2, 1)
    i = 0
    while i < len(words):
        has_gram = False
        token = None
        for n_gram in n_grams:
            token = ' '.join(words[i:i + n_gram])
            if token in data:
                w = words[i-1] if i > 0 else ''
                W = words[i+n_gram] if i < len(words) - n_gram else ''
                #i += n_gram
                has_gram = True
                break
        if has_gram is False:
            token = words[i]
            i += 1
        if token in data:
            if data[token] in ["daysago", "nextday", "lastweek", "nextweek", "lastmonth", "nextmonth", "lastyear", "nextyear"]:
                if w in number_str.keys():
                    tokens.append({data[token]: number_str[w] + " " + token})
                    words.remove(w)
                    remove_token(words=words, token=token)
                elif w.isnumeric():
                    tokens.append({data[token]: w + " " + token})
                    words.remove(w)
                    remove_token(words=words, token=token)
                else:
                    tokens.append({data[token]: token})
                    remove_token(words=words, token=token)
                continue
            if data[token] in ["week", "year"]:
                if W in number_str.keys():
                    tokens.append({data[token]: token + " " + number_str[W]})
                    remove_token(words=words, token=token)
                    words.remove(W)
                elif W.isnumeric():
                    tokens.append({data[token]: token + " " + W})
                    remove_token(words=words, token=token)
                    words.remove(W)
                else:
                    tokens.append({data[token]: token})
                    remove_token(words=words, token=token)
                continue

            tokens.append({data[token]: token})
            remove_token(words=words, token=token)
    return tokens
```
* ## Xử lí logic
Sau khi đã có thông tin các token, chúng ta cần xử lí logic các token này sao cho hợp lí nhất. Vì token hiện giờ chỉ là thông tin về ngày, tuần, tháng, năm một cách riêng rẽ, cái chúng ta cần là liên kết các thông tin này lại để có một ngày cụ thể dạng dd-mm-yyyy

Chúng ta sẽ phân chia token thu được làm 3 nhóm chính: 
* Nhóm token có thể thu được luôn thời gian: "ngày mai", "hôm qua", "tuần sau", "2 ngày nữa", ...
```
def get_date(tokens, timezone='Asia/Ho_Chi_Minh'):
    tz = pytz.timezone(timezone)
    now = datetime.datetime.now(tz=tz).date()
    dates = []

    for token in tokens:
        tok_key = list(token.keys())[0]
        tok_value = list(token.values())[0]
        date = now
        if tok_key == "beforeyesterday":
            date = now + datetime.timedelta(days=-2)
        if tok_key == "aftertomorrow":
            date = now + datetime.timedelta(days=2)
        if tok_key == "daysago":
            if tok_value.split()[0].isnumeric():
                num_days = -int(tok_value.split()[0])
                date = now + datetime.timedelta(days=num_days)
            else:
                date = now + datetime.timedelta(days=(-1))
        if tok_key == "nextday":
            if tok_value.split()[0].isnumeric():
                num_days = int(tok_value.split()[0])
                date = now + datetime.timedelta(days=num_days)
            else:
                date = now + datetime.timedelta(days=(1))
        dates.append(date.strftime("%d-%m-%Y"))
    return dates
```
* Nhóm token chứa thông tin ngày --> Cần thêm thông tin tháng, năm
```
def get_day_month_year(tokens, timezone='Asia/Ho_Chi_Minh'):
    tz = pytz.timezone(timezone)
    now = datetime.datetime.now(tz=tz).date()
    day_month_years = []
    for i in range(0, len(tokens)):
        day_tok_key = list(tokens[i].keys())[0]
        day_tok_value = list(tokens[i].values())[0]
        if "day" in day_tok_key or day_tok_key == "endmonth":
            day = int(day_tok_key.split("day")[1])
            if day_tok_key == "endmonth":
                day = calendar.monthrange(now.year, now.month)[1]
            month = now.month
            year = now.year
            for j in range(i+1, len(tokens)):
                month_tok_key = list(tokens[j].keys())[0]
                month_tok_value = list(tokens[j].values())[0]
                if "month" in month_tok_key and month_tok_key != "endmonth":
                    if month_tok_key.startswith("month"):
                        month = int(month_tok_key.split("month")[1])
                        for k in range(j+1, len(tokens)):
                            year_tok_key = list(tokens[k].keys())[0]
                            year_tok_value = list(tokens[k].values())[0]
                            if "year" in year_tok_key:
                                if year_tok_key == "year":
                                    year = int(year_tok_value.split()[-1])
                                    break
                                if year_tok_key == "nextyear":
                                    if year_tok_value.split()[0].isnumeric():
                                        num_year = int(
                                            year_tok_value.split()[0])
                                        year = (
                                            now + relativedelta(years=num_year)).year
                                    else:
                                        year = now.year + 1
                                    break
                                if year_tok_key == "lastyear":
                                    if year_tok_value.split()[0].isnumeric():
                                        num_year = - \
                                            int(year_tok_value.split()[0])
                                        year = (
                                            now + relativedelta(years=num_year)).year
                                    else:
                                        year = now.year - 1
                                    break
                        break
                    if month_tok_key == "nextmonth":
                        if month_tok_value.split()[0].isnumeric():
                            num_month = int(month_tok_value.split()[0])
                            month = (
                                now + relativedelta(months=num_month)).month
                            year = (now + relativedelta(months=num_month)).year
                        else:
                            month = now.month + 1
                        break
                    if month_tok_key == "lastmonth":
                        if month_tok_value.split()[0].isnumeric():
                            num_month = -int(month_tok_value.split()[0])
                            month = (
                                now + relativedelta(months=num_month)).month
                            year = (now + relativedelta(months=num_month)).year
                        else:
                            month = now.month - 1
                        break
            date = datetime.date(int(year), int(month), int(day))
            day_month_years.append(date.strftime("%d-%m-%Y"))
    return day_month_years
```
* Nhóm token chứa thông tin về thứ  --> Cần thêm thông tin về tuần
```
def get_weekday_week(tokens, week_now, timezone='Asia/Ho_Chi_Minh'):
    tz = pytz.timezone(timezone)
    now = datetime.datetime.now(tz=tz).date()
    weekday_now = now.weekday() + 2
    weekday_weeks = []
    week_day = 0
    for i in range(0, len(tokens)):
        tok_key = list(tokens[i].keys())[0]
        tok_value = list(tokens[i].values())[0]
        num_week = 0
        if "weekday" in tok_key:
            week_day = int(tok_key.split("weekday")[1])
            for j in range(i+1, len(tokens)):
                week_tok_key = list(tokens[j].keys())[0]
                week_tok_value = list(tokens[j].values())[0]
                if week_tok_key == "week":
                    week = int(week_tok_value.split()[-1])
                    num_week = week - week_now
                    break
                if week_tok_key == "nextweek":
                    if week_tok_value.split()[0].isnumeric():
                        num_week = int(week_tok_value.split()[0])
                    else:
                        num_week = 1
                    break
                if week_tok_key == "lastweek":
                    if week_tok_value.split()[0].isnumeric():
                        num_week = -int(week_tok_value.split()[0])
                    else:
                        num_week = -1
                    break
            date = now + \
                datetime.timedelta(weeks=num_week) + \
                datetime.timedelta(days=week_day-weekday_now)
            weekday_weeks.append(date.strftime("%d-%m-%Y"))

        else:
            if tok_key == "week":
                week = int(tok_value.split()[-1])
                num_week = week - week_now
            if tok_key == "nextweek":
                if tok_value.split()[0].isnumeric():
                    num_week = int(tok_value.split()[0])
                else:
                    num_week = 1
            if tok_key == "lastweek":
                if tok_value.split()[0].isnumeric():
                    num_week = -int(tok_value.split()[0])
                else:
                    num_week = -1
            if week_day == 0:
                week = [(now + datetime.timedelta(weeks=num_week) + datetime.timedelta(days=2-weekday_now)).strftime("%d-%m-%Y"),
                        (now + datetime.timedelta(weeks=num_week) + datetime.timedelta(days=8-weekday_now)).strftime("%d-%m-%Y")]
                weekday_weeks.append(week)
            else:
                date = now + \
                    datetime.timedelta(weeks=num_week) + \
                    datetime.timedelta(days=week_day-weekday_now)
                weekday_weeks.append(date.strftime("%d-%m-%Y"))

    return weekday_weeks
```
Sau cùng, chúng ta gộp tất cả các thời gian tổng hợp được từ regex cũng như việc tokenize, loại bỏ các thông tin trùng lặp, chúng ta sẽ thu được thông tin thời gian cần thiết.
```
def summary_date(message):
    dates = regex_date(message)
    tokens = tokenize(message)
    date_tokens, weekday_week_tokens, day_month_year_tokens = cluster_tokens(
        tokens=tokens)
    dates += get_date(tokens=date_tokens)
    dates += get_day_month_year(tokens=day_month_year_tokens)
    dates += get_weekday_week(tokens=weekday_week_tokens, week_now=36)

    return list(uniq(dates))
```
# 4. Xây dựng nlu, core cho action hỏi đáp về lịch học
Các phần xử lí chuẩn bị cho chatbot đã khá ổn rồi, chúng ta bắt đầu xây dựng những thứ quen thuộc vẫn thường làm
*  ## Nlu
Thêm vào file nlu.md các intent cần thiết
```
## intent: ask_schedule
- ngày mai có môn gì đấy
- mai mình có những môn nào?
- mai học gì ấy nhỉ
- ngày 30-4-2020 học môn gì đấy
- thời khóa biểu ngày 12-04-2020
- cho xem thời khóa biểu với 
- sắp tới học cái gì
- thời khóa biểu
- lịch học
- môn gì ngày sắp tới
- cập nhật calendar bot ơi
- thời khóa biêu có gì mới nào
- mai học gì vậy?
- ngày 12-3-2020 có lịch học là gì
- cho xem lịch học tháng sau
- thời khóa biểu năm sau
- kì trước học gì ấy nhỉ
- thời khóa biểu kì này
- cho xem lịch học đi
```
*  ## Core
Thêm vào story.md
```
## ask_schedule
* ask_schedule
  - action_show_schedule
```
Thêm vào domain.yml
```
intents:
  - ask_schedule
actions:
  - action_show_schedule
```
Viết file actions.py
```
class ActionShowSchedule(Action):

    def name(self) -> Text:
        return "action_show_schedule"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        sender_id = [x["sender_id"] for x in tracker.events if x["event"] == "user"][-1]
        message = tracker.latest_message.get('text')
         
        student_code = PreProcess().get_student_code(sender_id=sender_id)
        if student_code:
            dates = summary_date(message=message)
            if dates:
                schedule = PreProcess().get_schedule_json(student_code=student_code)
                if schedule:
                    response = ""
                    for date in dates:
                        if isinstance(date, str):
                            response += Schedule(student_code=student_code).get_schedule_a_day(date=date, schedule=schedule)
                        if isinstance(date, list):
                            response += Schedule(student_code=student_code).get_schedule_a_week(week=date, schedule=schedule)
                    return dispatcher.utter_message(response)
                return dispatcher.utter_message(message_no_schedule)
            return dispatcher.utter_message(message_no_datetime_info)
        return FollowupAction('action_ask_studentcode')
```
Ok, tạm kết bài ở đây. Phần cuối sẽ là bài viết [Xây dựng chatbot Messenger cập nhật thời khóa biểu cho sinh viên (Phần 4) - Xử lí logic chatbot khi được hỏi các thông tin về học phần](https://viblo.asia/p/xay-dung-chatbot-messenger-cap-nhat-thoi-khoa-bieu-cho-sinh-vien-phan-4-xu-li-logic-chatbot-khi-duoc-hoi-cac-thong-tin-ve-hoc-phan-Qbq5Q0jJlD8). Hi vọng các bạn vẫn còn hứng thú đọc tiếp :smile:

See ya!