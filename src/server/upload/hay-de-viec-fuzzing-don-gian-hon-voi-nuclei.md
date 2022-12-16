# Intro
Dạo gần đây mình hay sử dụng các tool tự động recon khai thác các lỗi, phần vì để đơn giản hoá, phần vì mình đỡ bỏ qua các lỗi cơ bản không đáng có, nhất là với lượng sub-domain khá lớn, hay scope rộng của các program.

Trong khoảng thời gian tìm kiếm tools tự động có thể đơn giản hoá việc recon website thì người anh ngồi cạnh mình suggest cho mình một tool khá hay. [Nuclei](https://github.com/projectdiscovery/nuclei)

Vậy tại sao mình lại viết bài này, mình thấy Nuclei khá hay, có nhiều module, có thể custom rules thoải mái, ...  
Một số thông tin về Nuclei:
- Github: https://github.com/projectdiscovery/nuclei
- Home page: https://nuclei.projectdiscovery.io/
- Blog: https://blog.projectdiscovery.io/

# Cài đặt Nuclei
Việc cài đặt vô cùng đơn giản và không hề phức tạp, có hẳn 3 cách để cài đặt Nuclei lên VPS của bạn (ở đây mình sử dụng VPS vừa đỡ tốn điện vừa tiện chạy recon trên đó đỡ ảnh hưởng phần cứng máy thật):
#### Cách 1: Cài đặt sử dụng binary
```
Tải binary mới nhất tại https://github.com/projectdiscovery/nuclei/releases

▶ tar -xzvf nuclei-linux-amd64.tar.gz #Giải nén
▶ mv nuclei /usr/local/bin/ #Di chuyển file binary vào path để gọi ở bất cứ đâu
▶ nuclei -version #Kiểm tra đã cài đặt xong chưa
```
#### Cách 2: Cài đặt lấy trực tiếp từ source  
Nuclei yêu cầu cài đặt **go1.14** trở lên, sau khi các bạn cài **go1.14+** thì chạy 1 command này là có thể sử dụng nuclei rồi
```
▶ GO111MODULE=on go get -u -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei
```
#### Cách 3: Cài đặt vẫn là từ source, nhưng bằng cách khác :kissing_heart:
```
▶ git clone https://github.com/projectdiscovery/nuclei.git; cd nuclei/v2/cmd/nuclei/; go build; mv nuclei /usr/local/bin/; nuclei -version
```
Cài đặt xong rồi, tuy nhiên chúng ta chưa sử dụng nuclei được ngay đâu, nuclei chạy được khi sử dụng rules, tuy nhiên nuclei có hỗ trợ các templates có sẵn tải về bằng cách 
```
nuclei -update-templates
```
hoặc có thể download từ Github
```sh
git clone https://github.com/projectdiscovery/nuclei-templates.git
```
# Khởi chạy Nuclei
Có khá nhiều cách sử dụng Nuclei, các bạn có thể tìm hiểu thông qua `--help` nhé, ở đây mình hướng dẫn sử dụng cơ bản thôi ^^;

#### Chạy Nuclei với 1 template
Ví dụ chúng ta có 1 list domain, chúng ta cần kiểm tra xem trong list domain này có cấu hình lỗi thư mục `.git` hay không, chạy lệnh
```sh
nuclei -l urls.txt -t files/git-core.yaml -o results.txt
```
với 
- `urls.txt` tổng hợp list domain cần test
- `files/git-core.yaml` là file template kiểm tra
- `results.txt` là file xuất ra kết quả sau này kiểm tra lại.

#### Chạy Nuclei với toàn bộ templates
Đây là cách mình hay sử dụng, chạy toàn bộ luôn, thà giết nhầm còn hơn bỏ sót, chạy toàn bộ hình như là khoảng 350 cái template thì phải, cũng hay được update template, bạn có thể đọc log trên trang chủ.
```
nuclei -l urls.txt -t nuclei-template/ -o results.txt
```
### Chạy Nuclei với tính năng loại trừ template
#### Chạy template dựa theo mức độ nghiêm trọng
```
nuclei -l urls.txt -t nuclei-template/ -severity critical, medium
```
Với câu lệnh này nuclei sẽ chỉ chạy những template được đánh dấu mức độ nguy hiểm là critical và medium mà thôi.
#### Chạy toàn bộ template nhưng loại trừ một vài thư mục
```
nuclei -l urls.txt -t nuclei-templates -exclude panels/ -exclude files/wp-xmlrpc.yaml
```

Còn rất nhiều tính năng của nuclei đang chờ bạn khám phá nhé ;)
# Viết template cho Nuclei
Ở đây chúng ta sử dụng 1 template có sẵn của Nuclei tìm kiếm các lỗi directory traversal
```yaml
id: directory-traversal

info:
  name: Generic Directory Traversal
  author: pentest_swissky
  severity: high
  description: Detect basic directory traversal leading to a leak of sensitive files.

requests:
  - method: GET
    path:
      - "{{BaseURL}}/..%5cetc/passwd"
      - "{{BaseURL}}/..%5c..%5cetc/passwd"
      - "{{BaseURL}}/..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/..%5c..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/..%5c..%5c..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5c..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5c..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5c..%5c..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/static/..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc/passwd"
      - "{{BaseURL}}/./../../../../../../../../../../etc/passwd"
    matchers-condition: and
    matchers:
      - type: status
        status:
          - 200
      - type: regex
        regex:
          - "root:[x*]:0:0:"
        part: body
```
Ở đây chúng ta có thể thấy được, template này được chia ra làm 3 phần
- Phần 1: chỉ rõ tên id của template này `directory-traversal`
- Phần 2: Ở đây viết toàn bộ thông tin liên quan đến lỗ hổng này, tên là gì, người viết là ai, mức độ nguy hiểm ra sao, mô tả lỗ hổng thế nào
- Phần 3: Phần này là phần quan trọng nhất, nó sẽ chỉ cho Nuclei chạy các request như thế nào, khi trả về kết quả như thế nào thì xác định được đấy đúng là lỗi, ...

Toàn bộ hướng dẫn viết template của nuclei có tại https://nuclei.projectdiscovery.io/templating-guide/, hi vọng các bạn viết được các template thật hay để contribute cho nuclei nhé ;)

# Kết quả
Một số lỗ hổng mình đã tìm được khi sử dụng Nuclei
![](https://images.viblo.asia/a0683ed4-39cc-4ec6-8aa1-b58077a70a40.jpg)

![](https://images.viblo.asia/4279568c-eb9d-484d-becb-63a1d2230e35.jpg)
Command mình hay sử dụng là 
```
A=<domain>;subfinder -d $A | httprobe | tee ~/sub-domain/$A | nuclei -t nuclei-templates/ -o ~/project-pentest/$A-output.txt
```
# Tham khảo
- https://blog.projectdiscovery.io/post/nuclei-fuzz-all-the-things/
- https://nuclei.projectdiscovery.io/templating-guide/
- https://medium.com/@vedanttekale20/how-recon-helped-me-to-find-an-interesting-bug-17a2d8cf1778
- https://github.com/projectdiscovery/nuclei