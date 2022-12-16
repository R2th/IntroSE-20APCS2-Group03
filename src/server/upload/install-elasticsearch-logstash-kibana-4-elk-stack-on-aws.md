ELK là một bộ công cụ bao gồm 3 phần mềm: Logstash, elasticsearch,kibana


+ Logstash: Đây là một công cụ sử dụng để thu thập, xử lý log được viết bằng java. Nhiệm vụ chính của logstash là thu thập log sau đó chuyển vào Elastichsearch. Mỗi dòng log của logstash được lưu trữ đưới dạng json.

+ Elasticsearch: sử dụng cơ sở dữ liệu NoSQL dựa trên nền tảng của Apache Lucene engine. Dùng để lưu trữ dữ liệu và cung cấp interface cho phép truy vấn đến cơ sở dữ liệu.

+ Kibana: Đây là giao diện sử dụng dành cho người dùng trên môi trường web. Kibana sẽ sử dụng Elashtichsearch để tìm kiếm các dữ liệu phù hợp với yêu cầu của người dùng.

### Install VM instances EC2

### Step 1:

![](https://lh3.googleusercontent.com/ODJBdIWEyics6jCo63wEtnGudanMhqecE-iu-v_NHk8eOe0U_N9-e5nVvTRAKLVMsEwmJS0Mzsm6aBdLAZnFtBK4dALMMY_qyvrHsnOrQry6dgK0o9stTXDPtDom9-5KwyGn6GRdbxIPMDZlutqc38fBrHnLdkwnlfpTh487u-Ou2cI_jJHtXTXLOXx9MSnhzOsW2y8qvUliuAwHwMuMWyNbhR3ERyC_OhP9nwhNoc4ngiMjjldRcl6qLt7SaUu5I3v5D856Ls1hgB4ca_tPU9vqbR0OYjbXjYxWvGr4uXczB1OokoCNYMhbUaF7rcaR6cfvdkav4fHDOhqE9KKLUyo9HkRlvEmg8o-5V0K21RKfZLUmy7GpT4Wj1O1osXNW5xd1GHVDYEzQR1nbrMlmXSsatl1-LYEdpRNC6Gv19usjZUZPWDNtb1Uncs3rzCc4bLDkQ6OvTsIx-QY69TZEpRNMAbria8p1x3ze8WXCEJ_eBkkDCy-cIeKR94rX_ckg76CRJqstKEyv1_I8Eh4s1gk6tx8wxvXbTAFovmP3kJ_qoKuFSuyCA1rcqoaCONhCcNQDVfxyUmTDvkcxxwz6T5NybgXdDy3HTIvXcmgUcq9CQW-EyTgUAhhlQJdPDI5Eu1qYoM9iac2SJW0WqsLbRtMlXwRN1kk0=w1276-h603-no)
----------------

### Step 2:

![](https://lh3.googleusercontent.com/yLa6W8bzbvlADqLrDzqzFXucvOyEI3uWkEkcLedz1xvwkPFuCAzRwmlnTLMo7yITCVjo-c4U5jYdwWGbewAWcqIgIcB6-Vy27JZhKg6qsYvmSjLRYc9akiMjKUIPxA1QWT9iY1JGnhwYamy3O0bsmKSh9LoggxLWE2B2_vh-7K6xfsGNhagfmkps-5ZNgiQr62MlUofZANo0dDou-t5SaePeI9faVbGoVtBjtDpI23anbjeufHL1Ne7W80mPUHPuJotFha9hv5_eDAKTCJmE-LhqsIdCJZbXAwCe2B1pY6bXEU2d9Zx9r1N0scCDSzLdhCHB0vX1rvPkpAgXPtV6CbL3W3LTl-MtMXn5n5qdfkDNQAheYCzSbVOO83AIm3i9QOgEOO3uUU3uO-ZdwmLsYFCMCpbJai5C5eSJkF6xgt12F5Lx_HUCU9bx222XXX2hRSUTzQepGxz2gzl_iR9oIRtH2XGSjjR2dKZg21jjbF8Yn_nU4rWNGoCwbvmp0rZk4cji99k3e1qjy90Ou_D0YBMG7oF9sJ3QEwys_FTCWbFrIh7pciiCYv7YgkEnDF-FMk0aWfSQCUI0TzrOH4gCyOwcCfciJUFHCBW4PGAQcon_aRxMzll4BxrgUp4UXhv36Rf-mT0zhEQrX9dexhHwmeoAvxISqFPV=w1292-h611-no)
----------------

### Step 3:

![](https://lh3.googleusercontent.com/7i17J8VE61fA_dshT3D4P5i-43vzjpyTYy0V1lQZdPqSGmnMDwHh9rjZI42iOSFqdwWo8uGxvzaSuZ5Q9JkSjG9797i5Xs71rBv8EFrgzeh7Bt8vWzWvu4BGXevFZnv5h5cTwiJe3PAu-guDK70PE5aC7Jp-Xk5YXAApFvmmoZCrhMv1YTTm9HbE0IYLed2MwYEE19Ow-2lQUO1ZmfN8eG9Sl7ANLJ50XCO_bUcr2ATYzqiecgL0yA7cxTUB37ikiq3EkeX35BsxYnx-psjMuv5A5LZZz3U2874hyPeFta-GxesHbUkBUxtFWcL5NYmw0bO7m-XPuUPZxs43rrs8B9Lrj8e32pikoxKJ6Rav8qFdzqVQvqi8fHq8g41D5S2XKLJzWlOs338xMqh4WZi22jjL888RycWEUovb3CizXiesNoAX3S_M4GbSaOAMuMuuZFOQOjpzh3RsO8suPFokm1kpHEwqtzgrdwWoSNzFtr1gJT0-9u6NBQXCV8r3b8Yjm51Mq5y_b2TA2Iggnj0TnA626c0cH1qYZNO--sH17CNoDGWGpbdETFARqYjP5BCuI2dbdlouZ9QXct8yb00zWtA2ndn4XMe6o97wYSRPYyI6Anvx1fR36pcYHqxTCBNHqBKfm4nMwOtYXHURUufXXM3yAdFWy6hM=w1289-h611-no)
----------------

### Step 4:

![](https://lh3.googleusercontent.com/ZorJLQWC0fNSCeNc7Sb8TdruZwaDw4RuckgFdlktzYik3MT0FwJsKtDYysKlMe3OEJSyfqhKGSwQ00fJzJryiH7tm9VfdkKtY11mPwtdKAlSWMLbADsIcPIyZGH_xkgKt896U_PBq4bTaknOPaECYWS2WX3o5uh5TstSOmrKaySsih9OlMDQeWXObsL07YTRlV34Uq2YzZLgMVEL-rkuKBeEd8-MmY5bYBkLAAIgthFQFbRzLQlEdtlBdouzx45usbH0fKWLmKvO2YuXdux0H3KbihzA4Ncv4gARBgbqhOdlLUVzzm8x2yQt-Jb-Vhtp9UREEP1ShLEXQN55n1K5WR9TArGgYeLSAORycgf0o5p_T7aAC6dq2xIcZZ7qQA6OtXKhWiymkR-jMRctavL9Dcz62dCGTRgU9UlrA9I8PTeLAGdwXMk0405rYf9gcEZdGqroqCQhvfIHERL0lnCTn8LrVaFqbcuLX_7zDo_Y5btOXG7GmB1cXqTvzhgVicmVJe0hGeBUGWlgEurnBEbIvJK6ywj-JhOYeffGXFDpNrt6qtfXPoOEZSYy8tjHw3bV744Z5ewyz2Rmlu6OqylLH7wxiTw1w7SdqSbKvvbRqLEgVetDeWCN9MgOBQGsHK35QjGn_2K6nXQl_ZtAMH2_nAaamAwdLyHI=w1276-h610-no)
----------------

### Step 5:

![](https://lh3.googleusercontent.com/GbDNHnuFr-qzIUQwFWZ-GCOUTT8H30rU9blI6DWuMfnuq0a32wBBuk7OqJTMnh-NJn_zuDxrHe3jI8gDphL4gIE49HlpNdxeGV02HkpBBi9KsoaXIhK6ZnuIGWYQeVbU6QF-ff1Wvqy9tgV7-MR2IueXRLFnq0-0tNyC6vUoUdYhQnHaA9nLFEIzP2EP5sEDFAoHkBb2_WDKVmHfZkh59RFK_8Q5MnBgL4v0la_tOSVC6h9SjT7ColHafq2kZ0_lSO2ncOva9vxKdz2UCKqjjZsBC0E6HtRL0ZO191eK8ztQpafjuQz_M8WVfu6lFtZDLy72nKWIUnl_yQ8KJWxJc4eyJly1jfEeRHQg6fDeH9S-DFaSRNSJZR3-4KQLUAtWJIDzgBixgQk3nVyKW7cUzKoVYa80lVl811-yZl4i9jrVCiGZgXHLCSiFlXbLjKchlAjWioi5Mv5-BSzOal9Frvp2aUk7xMjaYxrMGzBpQQa67hmjIr6dqO5lObM6v9vxnVq6Y79yMDq2_yiMB1XbbaweBrxOEWJsK3_L9CaWuultlSCZWjByTVupEBjGtRHkj7rSwUt93xxp80jXMU998Wal9MjhY1W19X5_1T0VHobzbOg3C7XSOzRPTVFwOJE2e22W2ATX2wURwnFFETOll8rtWXe3t2dQ=w1289-h608-no)
----------------

### Step 6:

![](https://lh3.googleusercontent.com/tSCIgZDKNKYb_P89PHdPKXAvChNCqMin61U0DpqIKzpo7TGdV9hSHe_SHnqLqAazs5t0bRQi9NnUMiZvNE_PNDSI3UWWWAP828OlEF4E-2IpwGIhjB2028PioDtavYlSDK98XfA6ibJiJCHh8D1pPDPDLC6brC_PSLQZcHp1ce9aBCKIzI6ConaeGAuWi5-RO-i0cGoLj3yqXuQa6RgLoy35i17HmmruG0HBNMJschp6OQtr_YCrwEnjHV_80qAHnOzbXtwW01QciDJzqQQCGdqVNkCBDaWp5ysZtXu21EaEurRzgJRL-WgmP2aQ2nxoj1-tr5OmRVjgOB6R5siVxMHs0Zl61h8M1O3ZieA8ORZ190DpRutL-tKnJCDXTsMKRH609DZptGKY-xdVFsf0F5T2LCYRGu9SZWZud5UlMrVPMCH3Rln1vv6h0qbE1TBK3COjIkQa4DERiztoegyo9-92PJmBAqwSTXZ4PYlJKz4ZOo4Ias2psXr8-ikG1bD-8NramwLfgeuhSUI3tjg1vtnEVP3JJURLTfuZ7rOnVFKfEM17DqxkLs7-Mq3lVZ4E3d4qM-IQ7bDfR94vlNxNFQgEGOAFTkfy9nzIDtplYwLF-_lEwzo18z20UUfpFAbvIDHhdFTmSA0GwGWeMLV-3fKcHxRc_v7H=w1277-h614-no)
----------------

### Step 7:

![](https://lh3.googleusercontent.com/_g0pwOV85D_RI5vUINJBXKBlBKoygqL2GeWmaQgCbYXlho1w25bXpmF3q9kRHas0Sft2Ctsw9w9z-ErC3E7iBeELZYZtco0l9HBZCP0vq7XCvlq5Dki0ec6g2Uzq_OR_ne19qTNYqc7OswqcOANzvixb4J70WZbvSQxRbIJPix64iVQZzgqdtCas9Z3U2W9BDrWNwjNjMV4O0rEadcOXJJ1LXjiA0JDpJET5ES7XSb4DmLbPdNhC5z_C9TFTkB6xCsUjV2MLeScylLG4Kh03d3Cfk3oU_MK_MqBhZc5M1ZJA4w9G8QZFOgoIBqXhLhTMQMZj8MxZwiSp1yEAzXmIctuFcpx4SFTWo-CKVIb-Nv0cHe99m_mrmLw-PexEfpZH63tFQWzCUgI2DRDPG3CNoQjra3eA-BN0rWtnyC8XNH4y4S3Fjdibh-YGQRxTKHMkvJkZHhloJnvMCoj7FWThCgXo-OdJSnm1sX5aRn0pQagC0jxvugPSvD0juqOxbKAncYQC9pt-df6ds0fpr9nPk9awfT9rZzHYVesG3xeZPZ1FbBoKskUa0xOGFDPdAdJqMX10J8BFflhRAWyGLAyD8SZiWfWrJkZ7KbEioc7iL_bvAi66m7sK4Rtu9kaaizhl7--UxO8xdebYkk9VMTxr1dib7vk8kU2z=w1282-h577-no)
----------------

### Step 8:

![](https://lh3.googleusercontent.com/PUqLT-am8LHOuqEcbOJK4V1ydSmuN43wlxBKciUILOCnnQo1ke_lgZe7KD9A0KxOAUafdCYFjl8IKo-HnifAYbNk8myrf0RF0gQ0yeWJF-xle8QxwqbfDKu1oTiE93qLuYVo3W6O5qVIIC-XMYQW89a3kO08_gpfHaHQJFmx9d_l41bF7Dny-2-k1eklmw4eqlJmY-x9VS6qfbnZ2KHr7PRmC9BVLsHXUPcdba0haD4i4u_CUY4QOh7Jr65V0HJj2rU4ufJpQKs2JM-aR_QUYB0frPahRkVXFk93sJ_eGB8-Zo4w7dZUefcJQDdtfNAindAFL1dB8dVzeRF_pbBGBXUlcusnj5S7RuezXls8JggjiAuknYWfXyMOKzYhgxTX3u3JKhZqhg1kUWUpzu0nhTwXHS0vvhnpkeiq7M4dV5RQrGgmc1QdP1AwgSFJ6xKd8hVZep2xZ8tQtlbhEG3Q53_2pDci34BTfZr-hKS5KG_ZP6M8ThlqcSWsk206FqVLPMYl1FLY2cKukk0RYFiKTkOCN1CvwjeY8ihGHC-Y3hS5Jp7r13GRl7HlpzfARtdQjTOYf_yVJ7YiG8yjz0RnDT_mtukCyuzNAQHCV5JreqFEEMPmwk_5Rr03OZBhilHZZsombXR7lHlJUnAA8RF_QaCyO8c0QKNk=w1280-h616-no)

![](https://lh3.googleusercontent.com/hjei-JSQA7Yzies663gLvoJEumDeE2upbrIpGy7I9JFwHULv6SwE8fRqYTnQr4jxDc_1OqQsvn3zCKMbBzpMesMjskPvEESwELUecvwgTa1kg_Yum0C-ObY_M8WucOBz0hBqtbej_unVZmBxj0Xr8tYu9y0NpkGqwGohrXBp6sg3BgIpu5-0-xVRPJYrp-Mui6P_Anl14viDX5WkPUyHe8Ji8SgmIrNYIUqXoPNCUztXRDP0rAhihxplH6Fgb0aTNg1w_belbglI4opRNN_2YgoSlHkq9ZgN7eoJMMqh3VyYKoPrka6GNIUdJ2y6IFwB6PkXyRHX0XoYs8_tx2ZyorBapEvyCLr-16tmpmRC5IdTK_XZEc0VDNoCu997PoZWKyifCmQQl9G4gW1PgmXpuTV9F-2TqdEzawOvKM1rnkZPFNoxhIGwIrOH_5ye36qivjqsUQTbCZXCNKuZDZxGk2mOQ4qB58xvVxFgnwEbOqHc1DWu62iUpjkVhSrPnQuvgVYlDacU8mfoIwxMfPRX05lMg6mHnqjIBZ72WJtq0vWfNhftMPEiTOEIvyKw508a94jeRytM9mXyB-65BEnVLnW2LB2QUIUoKPUQCJnVKBJTj6JF3l6LAgIk0dtxrqUXSTX_faao1QWNW1GnmJ8uetHdPazK_Cp1=w1205-h571-no)
-------------------


### Install ELK on AWS

First, connect to AWS by **Putty, PuttyGen**

----------------------------------------------------
### Install Elasticsearch 1.7.2

------------------
Commands
--------------------------

```
sudo su

yum update -y

cd /root

wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.2.noarch.rpm

yum install elasticsearch-1.7.2.noarch.rpm -y

rm -f elasticsearch-1.7.2.noarch.rpm

cd /usr/share/elasticsearch/

./bin/plugin -install mobz/elasticsearch-head

./bin/plugin -install lukas-vlcek/bigdesk

./bin/plugin install elasticsearch/elasticsearch-cloud-aws/2.7.1

./bin/plugin --install lmenezes/elasticsearch-kopf/1.5.7

cd /etc/elasticsearch

nano elasticsearch.yml

```

### Config
----------------------------

```
cluster.name: awstutorialseries

cloud.aws.access_key: 

cloud.aws.secret_key: 

cloud.aws.region: us-east-2

discovery.type: ec2

discovery.ec2.tag.Name: "Elasticsearch" (tên của instance)

http.cors.enabled: true

http.cors.allow-origin: "*"
```
---------------------------------------------

##### This should work
sudo service elasticsearch start

##### This should also work, though the PID file will not be removed
```
sudo service elasticsearch stop
```

##### Crash -- permissions error
```
sudo service elasticsearch restart
```

##### But this will work because it doesnt try to remove the PIDFILE
```
sudo service elasticsearch start
```


### Logstash 1.5.4-1
-----------------------
### Commands
--------------------------
```
sudo su

yum update -y

cd /root

wget https://download.elastic.co/logstash/logstash/packages/centos/logstash-1.5.4-1.noarch.rpm

yum install logstash-1.5.4-1.noarch.rpm -y

rm -f logstash-1.5.4-1.noarch.rpm

nano /etc/logstash/conf.d/logstash.conf
```
-----------------------------
### Config
```
input { file { path => "/tmp/logstash.txt" } } output { elasticsearch { host => "ELASTICSEARCH_URL_HERE" protocol => "http" } }
```
------------------------------------------
```
service logstash start
```

----------------------------------------------
### Kibana 4.1.2
---------------
### Commands
-------------

```
sudo su

yum update -y

cd /root

wget https://download.elastic.co/kibana/kibana/kibana-4.1.2-linux-x64.tar.gz

tar xzf kibana-4.1.2-linux-x64.tar.gz

rm -f kibana-4.1.2-linux-x64.tar.gz

cd kibana-4.1.2-linux-x64

nano config/kibana.yml
```
----------------
### Config

```
elasticsearch_url: "ELASTICSEARCH_URL_HERE"
nohup ./bin/kibana &
```

-------------------

**Navigate In Browser**

```
http://KIBANA_URL:5601
```