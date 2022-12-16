Ngày nay, khi mà các vụ tấn công ngày càng nhiều, các vụ rò rỉ dữ liệu mỗi năm mỗi lớn hơn thì việc bảo mật đối với các tổ chức lại càng phải được đề cao. Trong số các mục tiêu mà các hackers nhắm tới, các ứng dụng là nơi rất thường xuyên bị khai thác và tấn công. Đây có thể là nơi mà các hacker có thể khai thác, tấn công cũng đồng thời là cửa ngõ để kẻ tấn công khai thác sâu hơn vào trong hệ thống. Do đó, để tăng tính an toàn là một nhu cầu bức thiết trong xây dựng và phát triển ứng dụng. Trong các phương pháp để tăng tính an toàn cho ứng dụng, không thể không kể tới *phân tích tĩnh* (Static Code Analysis).
## I. Static Code Analysis
![](https://images.viblo.asia/6b94c691-d6b5-4181-b601-ac9604c16231.png)

### 1. Khái niệm phân tích tĩnh
Hiểu một cách đơn giản, việc phân tích tĩnh là một quá trình phân tích, đánh giá source code để tìm ra các lỗi và lỗ hổng trong đó mà không cần thực thi source code. Đây là một quá trình nằm trong Code Review process cũng như là White-box testing process. Thông thường, quá trình này được thực hiện với các công cụ phân tích source code, sau đó sẽ được review lại kết quả một cách thủ công để hạn chế các *False Positive* mà các công cụ trả về.
### 2. Tại sao cần phân tích tĩnh
Việc phân tích tĩnh mang lại rất nhiều lợi ích trong quá trình phát triển phần mềm cũng như đảm bảo tính an toàn của phần mềm. Mình có thể kể qua một số các ưu điểm như:
- Tự động hóa quá trình phân tích giúp tiết kiệm thời gian và tài nguyên.
- Dễ dàng tích hợp, đồng bộ với các tiến trình khác trong quá trình phát triển ứng dụng.
- Tìm ra các lỗ hổng và lỗi của ứng dụng từ các phase rất sớm của quá trình phát triển
- Tăng chất lượng code, hạn chế các lỗ hổng có thể có trong ứng dụng.
- Đối với các nhà phát triển ứng dụng, việc phân tích tĩnh giúp họ hiểu hơn về các lỗ hổng có thể có trong code của mình.
- ...


### 3. Hạn chế
Đương nhiên, bất cứ phương pháp nào cũng có các hạn chế riêng của nó, phân tích tĩnh cũng không phải ngoại lệ. Các hạn chế của phương pháp này có thể kể tới như:
- Phụ thuộc ứng dụng, ngôn ngữ lập trình
- Rất nhiều các *False Positive*
- Cần phải thực hiện thủ công để kiểm tra lại kết quả trả về
- Cần phải có quyền truy cập tới toàn bộ source code
- ...
## II. ShiftLeft NextGen Static Analysis

Hiện nay, trên thị trường có rất nhiều các công cụ hay giải pháp hỗ trợ việc phân tích tĩnh. Các công cụ và giải pháp này có thể là trả phí hoặc mất phí. Ở bài này mình xin phép giới thiệu về một trong số các công cụ mà mình đã sử dụng trong việc phân tích source code là **ShiftLeft Nextgen Static Analysis**.


### 1. ShiftLeft
![](https://images.viblo.asia/b37d1e14-f4bd-4995-9583-131fdbb54890.jpeg)

Trước hết là về công ty ShiftLeft, công ty này có trụ sở tại Santa Clara, California. CEO của ShiftLeft là [Manish Gupta](https://www.linkedin.com/in/manishgupta00/). Theo giới thiệu tại trang chủ của [shiftleft](https://www.shiftleft.io/), ông từng là Chief Product and Strategy Officer của FireEye. Ngoài ra, có thể xem thêm các thông tin về công ty này tại [trang mô tả của dự án](https://www.shiftleft.io/company/).


### 2. NG SAST
#### a. Giới thiệu về NG SAST
Ở đây mình xin phép dẫn nguyên lại mô tả của dự án 

> ShiftLeft’s NextGen Static Analysis (NG SAST) was purpose-built to insert security into developer workflows. NG SAST's speed and accuracy enables security automation with every pull request, which provides the right developer with the right vulnerability information at the right time. Hence, vulnerabilities get fixed faster and earlier, which drives down mean-time-to-remediation (MTTR), reduces attack surfaces, and minimizes technical debt accrual. Furthermore, NG SAST goes beyond technical vulnerabilities (e.g., The OWASP Top Ten) to identify cloud-centric vulnerabilities that traditional static analysis tools can't find, such as business logic flaws, data leakage, hard-coded literals, and insider threats.

Theo đó, NG SAST là công cụ được xây dựng nhằm tăng tính bảo mật trong quá trình làm việc của nhà phát triển. Công cụ này sẽ tự động thực hiện quét đối với mỗi pull request mà nhà phát triển cấp quyền nhanh và chính xác nhất có thể.

#### b. Tính năng
- Tìm kiếm các lỗ hổng bảo mật phổ biến như Authentication Bypass, Cross-Site Scripting (XSS), ...
- Tìm kiếm các chức năng nhạy cảm trong bảo mật
- Tìm kiếm các secret có trong source code
- Kiểm tra Common Weakness Enumeration (CWE)
- ...

Có thể xem thêm về các tính năng của công cụ tại [đây](https://docs.shiftleft.io/ngsast/product-info/coverage).

#### c. Các ngôn ngữ hỗ trợ
ShiftLeft NG SAST hiện tại hỗ trợ các ngôn ngữ:
- C#
- Go
- Java
- JavaScript/TypeScript
- Python
- Scala
#### c. Cách hoạt động
ShiftLeft NG SAST sử dụng *Code Property Graph* là phương pháp tiếp cận và phân tích source code. 

![](https://images.viblo.asia/4b32010b-c130-40ce-9b75-ae5a31725563.png)

Mô hình này sử dụng 3 cấu trúc phổ biến trong phân tích source code là *Abstract Syntax Trees (AST)*, *Control Flow Graphs (CFG)* và *Program Dependence Graphs (PDG)*. Họ có cung cấp tài liệu chi tiết về mô hình này tại [đây](https://cdn2.hubspot.net/hubfs/3887453/Resources/whitepapers/IEEE%20Whitepaper/Modeling_and_Discovering_Vulnerabilities_with_Code_Property_Graphs.pdf?__hstc=174850045.9588eddac00c0e2955998df0b20eede4.1619404246674.1619423397393.1619427328040.5&__hssc=174850045.3.1619427328040&__hsfp=1510026103). (Cá nhân mình đã đọc và thấy là nó cụ thể chi tiết nhưng mình hơi ngu để hiểu :D :D ).  Ví dụ về việc sử dụng mô hình này có thể xem thêm tại phần [mô tả ](https://docs.shiftleft.io/core-concepts/code-property-graph) của shiftleft. 

#### d. Demo qua với một ứng dụng
Dưới đây, mình sẽ thực hiện quét thử 1 project với cli cũng như là đồng bộ với github.
##### d.1 Cli
Đầu tiên, cần tải file thực thi của NG SAST về. 

```bash
curl https://cdn.shiftleft.io/download/sl >/usr/local/bin/sl && chmod a+rx /usr/local/bin/sl
```

Sau đó, thực hiện xác thực với phía server.

```bash
sl auth  --token "YOUR_ACCESS_TOKEN"
```

Sau khi đã xác thực, chúng ta có thể sử dụng file **sl** để có thể phân tích source code. Ở đây mình sử dụng một vuln app với ngôn ngữ python là vulpy. Repo của dự án tại [đây](https://github.com/fportantier/vulpy). Để phân tích source code này với cli, trước tiên mình clone về máy, sau đó gọi tới file **sl**.

```bash
cd vulpy
sl analyze --python --app vulpy_cli .
```

##### d.2 Github
Trước tiên mình fork repo trên về github của mình.

**Tạo secret**

Sau đó, vào **Setting > Secret > New reposity secret**. Ở đây, thêm vào access token của shiftleft.

![](https://images.viblo.asia/e2af0d52-d208-41a5-980c-ab716edf8d68.png)

Sau đó, t sẽ tạo 1 work flow tại phần Action. Work flow file cho python có thể như sau:

```
# This workflow integrates ShiftLeft NG SAST with GitHub
# Visit https://docs.shiftleft.io for help
name: ShiftLeft

on:
  pull_request:
  workflow_dispatch:
  push:
  # We recommend triggering a scan when merging to your default branch as a best practice,
  # especially if you'd like to compare the results of two scans (e.g., a feature branch against the
  # default branch)
    branches:
      - main
      - master

jobs:
  NextGen-Static-Analysis:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Download ShiftLeft CLI
      run: |
        curl https://cdn.shiftleft.io/download/sl > ${GITHUB_WORKSPACE}/sl && chmod a+rx ${GITHUB_WORKSPACE}/sl
    - name: NextGen Static Analysis
      run: ${GITHUB_WORKSPACE}/sl analyze --wait --app vulpy --tag branch=${{ github.head_ref }} --python .
      env:
        SHIFTLEFT_ACCESS_TOKEN: ${{ secrets.SHIFTLEFT_ACCESS_TOKEN }}
        SHIFTLEFT_API_TOKEN: ${{ secrets.SHIFTLEFT_API_TOKEN }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Sau đó với mỗi pull request, shiftleft sẽ phân tích lại source code của chúng ta.
##### d.5 Kết quả
Các app được shiftleft phân tích có thể xem kết quả tại [trang chủ](https://www.shiftleft.io/dashboard) của shiftleft.

![](https://images.viblo.asia/b966aa10-8628-44f5-ba1d-4894069d0218.png)

Tại đây sẽ thể hiện ra các ứng dụng của bạn đã được quét với shiftleft. Bấm vào một ứng dụng để có thể xem chi tiết báo cáo.

![](https://images.viblo.asia/698f6e5e-30a2-4f18-8396-582b503d8de3.png)

Ở đây sẽ có báo cáo khá chi tiết về các lỗ hổng, điểm yếu mà shiftleft đã tìm ra. Các lỗ hổng cũng được phân ra hành các nhóm lỗ hổng, theo mức độ nguy hiểm theo từng version của code. Chọn một lỗi cụ thể trong phần *Vulnerabilities*, các file và dòng code xảy ra lỗi đó sẽ được thể hiện ra chi tiết hơn

![](https://images.viblo.asia/fc54f463-2996-4d71-a9c9-08d1f806fcdc.png)

Có thể bấm vào dòng lỗi để xem chi tiết đoạn code được báo. Ví dụ ở đây mình thấy báo ở dòng 17 file bad/mod_user.py:

![](https://images.viblo.asia/c32b8c3e-efb0-473b-a4bb-e86fca3d7dff.png)


Tiếp đó đoạn code này gọi tới 2 hàm login và create bad/libuser.py cũng được thông báo phía dưới 

![](https://images.viblo.asia/e5cc6892-227b-492c-af87-a1f3bc7d4947.png)

![](https://images.viblo.asia/3c964de6-9978-4233-9727-120bc7291051.png)

## III. Đánh giá 
Nhìn chung, shiftleft là một công cụ phân tích source code khá ổn. Đây chỉ là các đánh giá cá nhân của bản thân mình, mọi người có thể tự mình trải nghiệm và đưa ra nhận xét.
### Cách sử dụng
Việc sử dụng shiftleft nhìn chung là khá đơn giản. Việc chúng ta cần làm chỉ cần tải file **sl** về và thực thi nó. Các thao tác với shiftleft cũng được mô tả rất chi tiết kiểu step-by-step trong document nên ngay cả người không chuyên môn gì cũng có thể thực hiện được.

### Tài liệu
Tài liệu của shiftleft được viết khá chi tiết. Từ những thứ trừu tượng đến các chức năng cụ thể đều được mô tả và lấy ví dụ cụ thể, rất dễ tiếp cận.

### Báo cáo
Báo cáo của shiftleft khá chi tiết. Các lỗi được phân loại theo từng nhóm và có lịch sử lỗ hổng của từng version của code. Với tài khoản free, tuy link dẫn vào source code hay lỗi nhưng vẫn có chỉ ra dòng nào lỗi và thông báo lỗi khá cụ thể. Mô tả lỗi thì là mô tả chung của loại lỗi đó chứ không phải của lỗi cụ thể xảy ra. Có thể gắn task, comment vào từng lỗi để những người khác có thể thấy và khắc phục.

### Hiệu quả
Nhìn chung mình mới sử dụng công cụ này với các source code vừa và nhỏ. Theo đánh giá của cá nhân mình thì tốc độ xử lí của shiftleft ở mức ổn, lượng false positive tương đối thấp, có thể chấp nhận được, các lỗ hổng chỉ ra khá chính xác và cụ thể. Có thể sẽ cần phải test với nhiều source code hơn cũng như số lượng code lớn hơn để có thể đánh giá được cụ thể về hiệu quả của công cụ này.

### Giá cả
Hiện tại thì ShiftLeft hỗ trợ 4 loại là Free, Premium trial, Team và Enterprise.

![](https://images.viblo.asia/1a5cbefb-820e-43ae-a67b-b986b336f575.png)

Với người dùng cá nhân, việc sử dụng free đã khá là ổn với các tính năng cần thiết. Có thể liên hệ với team ShiftLeft để nâng cấp lên Primium Trial trong 15 ngày. Với hai gói còn lại mình chưa có cơ hội trải nghiệm nên không có nhận xét gì.

### Cân nhắc
Việc thực hiện phân tích source code với shiftleft luôn đẩy kết quả về phía server của shiftleft. Điều này nên được xem xét trước khi sử dụng nó để phân tích source code của bạn. Nếu source code là mã nguồn đóng hoặc chỉ lưu hành nội bộ thì không nên sử dụng để tránh vi phạm các quy tắc bảo mật của công ty, tổ chức.