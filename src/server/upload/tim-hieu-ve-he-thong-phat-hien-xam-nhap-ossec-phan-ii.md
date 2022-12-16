Hầy, sau một thời gian khá dài bận rộn với công việc và hoàn thành bài tìm hiểu về lỗ hổng CVE 2017-0016 thì nay, mình đã quay trở lại đây :D. Hôm nay mình sẽ tiếp tục trình bày về phần II của bài viết này, nói rõ hơn về luật trong OSSEC , cách cài đặt OSSEC Server, Agent và cuối cùng là quản lý các log với ELK Stack. Thôi, không luyên thuyên nữa, vào bài thôi! :sweat_smile::sweat_smile::sweat_smile:
# III. Luật và cách tạo luật trong OSSEC
Luật (rules) là một phần vô cùng quan trọng trong hệ thống OSSEC, nó chính là cốt lõi trong việc đảm bảo hệ thống OSSEC có được hoạt động theo quy trình, chính xác và hiệu quả hay không. Rules có định dạng XML, được cấu hình trong ossec server /var/ossec/etc/ossec.config và nằm trong thẻ `<ossec_config>`. Rules được lưu trong `/var/ossec/rules.`
## 1. Các đặc điểm của luật ossec:
- OSSEC có 16 cấp độ luật:

    `00 - Ignored`: Không thực hiện hành động nào. Khi gặp luật có cấp độ này thì sẽ không có thông báo. Các luật này được quét trước tất cả các luật khác. Chúng bao gồm các sự kiện không có sự liên quan về bảo mật.
    
    `01 - None` (không).
    
    `02 - System low priority notification` (hệ thống thông báo ưu tiên thấp): Thông báo hệ thống hoặc thông báo trạng thái. Không có sự liên quan về bảo mật.
    
    `03 - Successful/Authorized events` (sự kiện thành công/được ủy quyền): Bao gồm các lần đăng nhập thành công, tường lửa cho phép sự kiện, v.v.
    
    `04 - System low priority error `(lỗi ưu tiên hệ thống thấp): Các lỗi liên quan đến cấu hình hoặc thiết bị/ứng dụng không sử dụng. Chúng không có sự liên quan về bảo mật và thường được gây ra bởi các cài đặt mặc định hoặc kiểm thử phần mềm.
    
    `05 - User generated error `(lỗi do người dùng tạo): Chúng bao gồm mật khẩu bị bỏ lỡ, hành động bị từ chối, v.v. Chính chúng không có sự liên quan về bảo mật.
    
    `06 - Low relevance attack` (tấn công mức độ liên quan thấp): Chúng chỉ ra một con sâu hoặc virus không ảnh hưởng đến hệ thống (như mã màu đỏ cho các máy chủ apache, vv). Chúng cũng bao gồm các sự kiện IDS thường xuyên và các lỗi thường xuyên.
    
    `07 - “Bad word” matching` (kết hợp “Từ xấu”): Chúng bao gồm các từ như "bad", "error", v.v. Những sự kiện này hầu như không được phân loại và có thể có một số mức độ liên quan về bảo mật.
    
    `08 -  First time seen` (lần đầu tiên nhìn thấy): Bao gồm các sự kiện lần đầu tiên được xem. Lần đầu tiên một sự kiện IDS được kích hoạt hoặc lần đầu tiên người dùng đăng nhập. Nếu bạn mới bắt đầu sử dụng OSSEC HIDS, những thông báo này có thể sẽ thường xuyên. Sau một thời gian sẽ giảm dần, Nó cũng bao gồm các hành động bảo mật có liên quan (như bắt đầu của một sniffer).
    
   ` 09 - Error from invalid source `(lỗi từ nguồn không hợp lệ): Bao gồm các lần đăng nhập dưới dạng người dùng không xác định hoặc từ nguồn không hợp lệ. Có thể có sự liên quan về bảo mật (đặc biệt nếu được lặp lại). Chúng cũng bao gồm các lỗi liên quan đến tài khoản "quản trị" (root).
    
    `10 - Multiple user generated errors` (tập hợp lỗi do người dùng tạo): Chúng bao gồm nhiều mật khẩu không hợp lệ, nhiều lần đăng nhập không thành công, v.v. Họ có thể chỉ ra một cuộc tấn công hoặc có thể chỉ là người dùng vừa quên thông tin đăng nhập của mình.
    
    `11 -  Integrity checking warning` (cảnh báo kiểm tra tính toàn vẹn): Chúng bao gồm các thông báo liên quan đến việc sửa đổi các tệp nhị phân hoặc sự hiện diện của rootkit (bằng kiểm tra root). Nếu bạn chỉ cần sửa đổi cấu hình hệ thống của bạn, bạn sẽ được báo về các thông báo "syscheck". Nó có thể chỉ ra một cuộc tấn công thành công. Cũng bao gồm các sự kiện IDS sẽ bị bỏ qua (số lần lặp lại cao).
    
    `12 - High importancy event` (sự kiện quan trọng cao): Chúng bao gồm các thông báo lỗi hoặc cảnh báo từ hệ thống, hạt nhân, v.v. Chúng có thể chỉ ra một cuộc tấn công chống lại một ứng dụng cụ thể.
    
    
    `13 - Unusual error` (high importance) - Lỗi bất thường (mức độ quan trọng cao): Hầu hết các lần khớp với một kiểu tấn công chung.
    
    `14 - High importance security event` (sự kiện bảo mật quan trọng cao): Hầu hết thời gian được thực hiện với sự tương quan và nó chỉ ra một cuộc tấn công.
    
    `15 - Severe attack` (tấn công nghiêm trọng): Cần chú ý ngay lập tức.
   
* Rules trong OSSEC được hỗ trợ quản lý theo nhóm, các bộ luật được xây dựng sẵn trong hệ thống OSSEC thuộc 12 nhóm sau:

    `invalid_login`
    
    `authentication_success`
    
    `authentication_failed`
    
    `connection_attempt`
    
    `attacks`
    
    `adduser`
    
    `sshd`
    
    `ids`
    
    `firewall`
    
    `squid`
    
    `apache`
    
    `syslog`
    
    => **Đặc biệt:** admin có thể tự tạo một group chứa một hoặc nhiều bộ luật mới. 
    
    **Một vài thuộc tính của 1 rule trong OSSEC:**
    
*    `Level` (bắt buộc phải có): thể hiện mức độ của rule, ossec có 16 cấp độ từ 0-15.
*    `Id` (bắt buộc phải có): id của rule, mỗi rule sẽ có một id riêng biệt không trùng lặp và là 1 trong các số từ 100-99999. (Khi tạo một luật mới nên đặt ip từ khoảng 100.000).
*    `Maxsize`: chỉ định kích thước tối đa của sự kiện tiến hành, là 1 trong các số từ 1-99999.
*    `Frequency`: chỉ định số lần rules được kiểm tra trước khi thực hiện. Số lần kích hoạt phải gấp đôi số lần cài đặt. Ví dụ: tần sô = 2 => rule phải được so sánh 4 lần.
*    `Timeframe`: khung thời gian tính bằng giây, được sử dụng để kết hợp với frequency.
*    `Ignore`: thời gian (s) bỏ qua rule này.
*    `Overwrite`: Cho phép chỉnh sửa rule.
## 2. Phân loại luật
Trong OSSEC, luật được chia thành 2 loại: Luật nguyên tố và luật kết hợp:

-  **Luật nguyên tố** - các luật xử lý 1 sự kiện: cảnh báo, thông báo hay hành động ứng phó sẽ xuất hiện khi có 1 sự kiện thỏa mãn. Ví dụ: Bao nhiêu lần đăng nhập thất bại sẽ xuất hiện bấy nhiêu lần thông báo.

``` PHP
<rule id="100000" level="7">
  <list lookup="match_key" field="srcip">path/to/list/file</list>
  <description>Checking srcip against cdb list file</description>
</rule>
```

- **Luật kết hợp** – xử lý nhiều sự kiện một lúc trong 1 luật: 

    *    Có thể sử dụng với thẻ `Frequency` và `Timeframe` để xử lý một xự kiện được diễn ra nhiều lần.
    
    *    Các luật được kết hợp với nhau thông qua id, sử dụng thẻ `<if_sid>` hoặc (`<if_matched_sid>` hoặc `<same_id>` hoặc `<same_source_ip>` - các thẻ này được kết hợp với `Frequency` và `Timeframe`).

``` PHP
<rule id="100103" level="7"> 
    <if_sid>100102</if_sid> 
    <match>^Failed</match>
    <description>Fakeinc Custom: Failed password</description> 
</rule>
```

# IV. Cài đặt OSSEC server và OSSEC agent
**Chú ý:** Một điều cần lưu ý khi cài đặt OSSEC là hệ điều hành windows chỉ hộ trợ cài đặt ossec agent, nó không hỗ trợ cài đặt ossec server. OSSEC server chỉ được hỗ trợ cài đặt trên các hệ điều hành hệ Linux/Unix.

* Tải gói cài đặt tại:        https://www.ossec.net/downloads.html
*    Các gói yêu cầu:  
         `#sudo apt-get install build-essential`
                                    
        `# yum groupinstall 'Development Tools'`
                                    
     `# yum install openssl*.`
     
##      1. Cài OSSEC server

```
# wget https://bintray.com/artifact/download/ossec/ossec-hids/ossec-hids-2.8.3.tar.gz
# tar -xzvf ossec-hids-2.8.3.tar.gz
# cd ossec-hids-2.8.3
# ./install.sh
```

*    Sau đó chọn server để cài đặt.   
*   Đến đây đã cài đặt xong ossec server. Toàn bộ dữ liệu cài đặt được lưu trong /var/ossec. Để kiểm tra hoạt động của OSSEC, sử dụng câu lệnh: 
```
# /var/ossec/bin/ossec-control start
```

* Trước khi chuyển sang cài đặt ossec agent trên client, cần đảm bảo rằng đã mở cổng 1514 hoặc 514. Để mở port UDP 1514 hoặc 514:
```
# iptables -A INPUT -p UDP --dport 1514 -s YOUR_AGENT_IP -j ACCEPT
# iptables -A INPUT -p UDP --dport 1514 -s “agent ip” -j ACCEPT
# service iptables save    //Lưu cấu hình iptables
```


- **Hoặc**

```
# firewall-cmd --permanent --zone=public --add-port=1514/udp //add permanent = service iptables save
# firewall-cmd --reload
# firewall-cmd --permanent --list-ports   //Liệt kê các port đã add
```

## 2. Cài đặt OSSEC agent
*    Cài đặt agent trên hệ điều hành UNIX tương tự như cài đặt trên server, tại mục 1 thay đổi server thành agent.                                 
*    Cũng tương tự như trên server cần mở port UPD 1514, 514 trên agent.

**Trên Windows**
* Tải gói cài đặt agent cho windows trên trang chủ của ossec.
* Tiến hành cài đặt như bình thường:

![](https://images.viblo.asia/e4f334a5-f511-402f-acbe-7ad658525db7.png)

![](https://images.viblo.asia/feac3e22-194b-4324-9939-ade72d19c183.png)

![](https://images.viblo.asia/3302720e-0d72-4da7-8dce-b49a3c5b8e64.png)

![](https://images.viblo.asia/0f6205fe-be8b-4b66-9750-3971f4fcca49.png)

## 3. Thêm Agent vào Server
Để OSSEC Server và OSSEC Agent có thể giao tiếp với nhau, phía agent cần xác minh với OSSEC Server. Traffic giữa OSSEC Server và OSSEC Agent được mã hóa sử dụng khóa bí mật do phía server sinh, sau đó được imported cho agent.

**Quy trình:**
* Chạy manage agent trên máy chủ OSSEC.
* Thêm agent.
* Giải nén khóa cho agent.
* Sao chép khóa đó vào agent.
* Chạy các manage agent trên agent.
* Nhập khóa được sao chép từ trình quản lý.
* Khởi động lại quy trình OSSEC của manager.
* Khởi động agent.
# V. Bộ công cụ quản lý log ELK Stack
## 1. Giới thiệu
Với những hệ thống lớn việc quản lý log và phân loại log bằng việc xem file log của server để xác định thông tin của log, phân loại log là khá khó khăn. Cần thiết phải có một công cụ quản lý log một cách tốt hơn, sớm phát hiện những lỗi phát sinh của server hoặc kiểm tra các thông tin về log. Hiện nay cũng có khá nhiều công cụ để quản lý log khác nhau. Qua tìm hiểu thì bộ công cụ Logstash, Elasticsearch, Kibana có nhiều ưu điểm như phần mềm mã nguồn mở hoàn toàn miễn phí, cung cấp dịch vụ quản lý log rất tốt và dễ sử dụng. Dưới đây tôi sẽ giới thiệu về bộ công cụ này.

- **Logstash:** Đây là một công cụ sử dụng để thu thập, xử lý log được viết bằng java. Nhiệm vụ chính của logstash là thu thập log sau đó chuyển vào Elastichsearch. Mỗi dòng log của logstash được lưu trữ đưới dạng json.
- **Elasticsearch:** sử dụng cơ sở dữ liệu NoSQL dựa trên nền tảng của Apache Lucene engine. Dùng để lưu trữ dữ liệu và cung cấp interface cho phép truy vấn đến cơ sở dữ liệu.
- **Kibana:** Đây là giao diện sử dụng dành cho người dùng trên môi trường web. Kibana sẽ sử dụng Elashtichsearch để tìm kiếm các dữ liệu phù hợp với yêu cầu của người dùng.

Trong hệ thống OSSEC, ELK là một thành phần được tích hợp để nhận, quản lý và hiện thị log cho người dùng thông qua giao diện web. OSSEC Server tập hợp log từ nhiều nguồn, đặc biệt là phía các ossec agent sau đó phân tích, xử lý và gửi đến Logstash và elasticsearch để xử lý và lưu trữ và sau đó báo cáo hoặc đưa ra kết qua dưới dạng web bằng Kibana.

![](https://images.viblo.asia/1c4d7373-3f55-499c-a8ec-23fb351c3003.png)

**Ưu điểm của ELK**

- **Đọc log từ nhiều nguồn:** Logstash có thể đọc được log từ rất nhiều nguồn, từ log file cho đến log database cho đến UDP hay REST request.
- **Dễ tích hợp:** Dù bạn có dùng Nginx hay Apache, dùng MSSQL, MongoDB hay Redis, Logstash đều có thể đọc hiểu và xử lý log của bạn nên việc tích hợp rất dễ dàng.
- **Hoàn toàn free:** Chỉ cần tải về, setup và dùng, không tốn một đồng nào cả. Công ty tạo ra ELK Stack kiếm tiền bằng các dịch vụ cloud hoặc các sản phẩm premium phụ thêm.
- **Khả năng scale tốt:** Logstash và Elasticsearch chạy trên nhiều node nên hệ thống ELK cực kì dễ scale. Khi có thêm service, thêm người dùng, muốn log nhiều hơn, bạn chỉ việc thêm node cho Logstash và Elasticsearch là xong.
- **Search và filter mạnh mẽ:** Elasticsearch cho phép lưu trữ thông tin kiểu NoSQL, hỗ trợ luôn Full-Text Search nên việc query rất dễ dàng và mạnh mẽ.
- **Cộng đồng mạnh, tutorial nhiều:** Nhiều công ty dùng nên dĩ nhiên là có nhiều tutorial để học và dùng ELK Stack rồi.

## 2. Cài đặt 
### 2.1 Yêu cầu cài đặt
* Cần quyền root
* ElasticSearch và Logtash yêu cầu cài đặt java 8 mới có thể hoạt động:

```
sudo add-apt-repository -y ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get -y install oracle-java8-installer
```

### 2.2 Cài đặt ElasticSearch 
Elasticsearch có thể cài đặt từ package manager như apt & yum từ Elastic’s package source list. Chạy command sau để import `Elasticsearch public GPG key.`
```
$ wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
```
Tạo Elasticsearch source list file.
```
echo "deb http://packages.elastic.co/elasticsearch/2.x/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-2.x.list
```
Sau đó tiến hành cài đặt:
```
sudo apt-get -y install elasticsearch
```

### 2.3 Cài đặt Kibana
Thêm Kibana source list cho APT
```
echo "deb http://packages.elastic.co/kibana/4.4/debian stable main" | sudo tee –a /etc/apt/sources.list.d/kibana-4.4.x.list
```
Update lại APT cache: `$sudo apt-get update`

Sau đó, cài đặt Kibana thông qua APT:
```
apt-get install -y kibana
```
 Start Kibana bằng lệnh:
 ```
 service kibana start
 ```
 
###  2.4 Cài đặt Logstash
Thêm Logstash source list cho APT
```
echo 'deb http://packages.elastic.co/logstash/2.2/debian stable main' | sudo tee /etc/apt/sources.list.d/logstash-2.2.x.list
```
 Cập nhật lại APT cache: `apt-get update`
 
 Sau đó cài đặt:
 ```
 apt-get install -y logstash
service logstash start
 ```
 
#  Tiểu kết
 Trên đây là toàn bộ những thứ kiến thức cơ bản nhất và các công cụ hỗ trợ cần thiết để có thể xây dựng được một hệ thống kiểm thử xâm nhập đơn giản với OSSEC. Trong phần sau (phần cuối), mình sẽ DEMO một cuộc tấn công nho nhỏ sau đó tiến hành phát hiện và thông báo với OSSEC. Rất mong nhận được sự đón đọc của các bạn. Xin cảm ơn! :) :) :)