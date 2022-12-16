![](https://images.viblo.asia/174c28c2-a72b-4776-bb79-e40609b592b8.png)

Thằng bạn mình, nó có một project rất hay, nên xin join vào để học hỏi vài thứ. Nhưng ngại cái là mình chỉ 1 github account của công ty. Giờ join vào, lỡ sau này bị đuổi việc thì phiền. Mà lâu nay có bao giờ để tâm tới mấy cái account git này đâu vì toàn làm cho công ty. Thế là lên google mò mẫn các kiểu.
<br>Cuối cùng tìm được một keyword khá chuẩn: manage multiple git accounts. Sau thời gian đọc vài bài, thì mình muốn chia sẻ lại một bài mà dễ đọc và dễ làm theo nhất. Tiện thể note lại cho bản thân, sau này đỡ phải đi tìm.
Bài viết mình có nhiều mục, nhưng tới đây thì chưa thể tưởng tượng được có bao nhiêu mục nên viết đến đâu đánh số đến đấy.

### 1. Tạo SSH keys
Mình giả sử các bạn đã tạo ra ít nhất một SSH key. Nếu chưa thì các bạn có thể tham khảo ở đây: https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
<br>Nếu đã tạo rồi, các bạn có thể dùng lệnh này để liệt kê các cặp public và private key: ```ls -al ~/.ssh```. Hiện tại các bạn đã có một cặp key: ```id_rsa``` và ```id_rsa.pub``` được tạo (by default) ứng với email của công ty (ex: "**email@company_email.com**"). <br>Bây giờ chúng ta sẽ tạo ra một SSH key khác ứng với email cá nhân (ex:"**email@_email.com**" ):
 <br>```$ ssh-keygen -t rsa -C "email@work_mail.com" -f "id_rsa_personal"```  
 
Vậy là hiện tại chúng ta có 2 key khác nhau:

    ~/.ssh/id_rsa
    ~/.ssh/id_rsa_personal

### 2. Add SSH key vào tài khoản Git tương ứng
Bây giờ mình sẽ add cái SSH key mà mình tạo với email cá nhân vào tài khoản git cá nhân nhé:
Đầu tiên là copy public key: ```pbcopy < ~/.ssh/id_rsa.pub```
Sau đó login vào account Git cá nhân và làm theo các bước sau:
1. Di chuyển đến màn hình ```Settings``` 
2. Chọn mục ```SSH and GPG keys``` từ menu bên trái
3. Click vào ```New SSH key```, đặt một cái title phù hợp, sau đó paste cái key vừa copy vào đó
4. Click ```Add key``` button - DONE!

### 3. Đăng kí SSH key với ssh-agent
Giống như bán vé máy bay,  muốn bán thì phải mở đại lí. Tương tự, muốn chứng minh gới Git là ta có thể tạo một kết nối hợp lệ, thì phải đăng kí cái SSH đấy vào ssh-agent.
<br>Cú pháp đăng kí:
<br>Với tài khoản của công ty: ```ssh-add ~/.ssh/id_rsa```
<br>Với tài khoản cá nhân:       ```ssh-add ~/.ssh/id_rsa_personal```
<br>Kiểm tra lại bằng cách:     ```eval "$(ssh-agent -s)"```
<br>

>Đến đây thì mọi công tác chuẩn bị đã xong. Phần quan trọng đó là quản lí như thế nào, sẽ được giới thiệu tiếp theo đây.

### 4. Tạo SSH config file
Bây giờ  ta sẽ đi đến bước config để biết được cái nào dùng cho domain nào
File SSH config đã có sẵn tại ```~/.ssh/config```. <br>
Nếu chưa thì các bạn dùng lệnh sau để tạo:

    $ cd ~/.ssh/
    $ touch config
Bây giờ, hãy mở file config lên và điền nội dung vào giống như mẫu dưới đây:<br>

    # Company domain
    Host [company-name (ex: MyCompany)]
        HostName github.com
       User git
       IdentityFile ~/.ssh/id_rsa
    
    # Personal domain
    Host [personal-name (ex: Personal)]
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_rsa_personnal

>(Lưu ý: những đoạn text nào mình đặt trong ```[...]``` là có thể thay đổi, miễn sao dễ nhớ)
<br>"**Personal**" là git Github user id dùng cho account cá nhân. Nó giống như 1 ký kiệu để phân biệt với các Git account khác. Tất nhiên các bạn có thể đổi tên tuỳ ý như mình đã nói ở trên. Những thông tin này liên quan đến remote mà chúng ra sẽ clone sau này.
<br>Những dòng lệnh ở trên sẽ thông báo với ssh-agent là:
1. Sử dụng **id_rsa** để xác thực với Git account tương ứng với email của công ty
2. Sử dụng **id_rsa_personal** để xác thực với Git account tương ứng với email của cá nhân

### 5. Một SSH key được activce trong ssh-agent tại một thời điêm xác định
Việc config như thế không chịu bất kì qui tắc nào cả và cũng không quan tâm key đó đã tồn tại hay chưa. Do đó chúng ta phải chắc chắn là ssh-agent phải có những key tương ứng tại thời điểm xác thực với Git.
<br>Để kiểm tra, ta sẽ thực hiện các thao tác sau:
<br>Liệt kê tất cả các SSH key đã được add vào ssh-agent: ```ssh-add -l```
<br>Để remove tất cả các SSH đã được add: ```ssh-add -D```
<br>Sau đó, ta sẽ tự add lại những key cần để xác thực, và được liệt kê trong file config vào ssh-agent theo cú pháp:
<br> ```ssh-add ~/.ssh/[name]``` với "**[name]**" là tên của private key tương ứng với email của Git account. (ex: ```id_rsa_personal)```
<br>Bây giờ nó có thể map với Git account tương ứng và ta có thể dùng nó để xác thực.

> Làm tương tự với các tài khoản Git còn lại nhé!

### 6. Thực hành với mẫu ví dụ cụ thể
Hiện tại chúng ta đang join vào repo của công ty: 
<br>```git@github.com:company-name/company-project-name.git```

Chúng ta sẽ clone cái project này về máy:
<br>Thay vì sử dụng lệnh: ```git clone git@github.com:company-name/company-project-name.git```
<br>Chúng ta sẽ sử dụng lệnh:  ```git clone git@MyCompany:company-name/company-project-name.git```
<br>Thử list ra danh sách remote dưới local, sử dụng: ```git remote -v```

<br>Lúc này, chúng ta có thể pull hay push các kiểu bà liễu lên repo của công ty rồi. Làm tương tự lệnh clone trên với repo cá nhân.
<br>Khi hoàn thành, tại mỗi branch, chúng ta sẽ ko cần quan tâm là lệnh ```git push origin branch-name``` sẽ push cái nhánh của mình lên repo nào nữa. Nó sẽ dựa vào domain mà mình đã config mà làm việc.

<br>Đến đây thì mọi việc đã hoàn thành. Tay cũng đã mỏi. 
<br>Hy vọng là nó sẽ đủ chi tiết để giúp mọi người quản lí các account Git của mình.
<br> Link chính chủ: [How to manage multiple GitHub accounts on a single machine with SSH keys](https://medium.freecodecamp.org/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)
<br>THÂN ÁI!