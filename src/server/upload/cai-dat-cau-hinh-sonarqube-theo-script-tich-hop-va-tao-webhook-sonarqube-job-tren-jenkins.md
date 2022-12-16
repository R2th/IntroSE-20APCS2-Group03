Hi mọi người, hôm nay mình sẽ chia sẻ một ít kinh nghiệm cài đặt SonarQube trên môi trường CentOS 7 và cách tích hợp SonarQube trên Jenkins để quét source code và tạo Code Quality Gate.

## **1\. Cài đặt SonarQube**

Mình có dựa vào script từ gist của một anh DEV mà lâu quá mình không lưu lại link (Nếu anh có vô tình đọc bài này nếu có thể comment em để em note tác giả nhé, em cảm ơn ^^) tạo một script để cài đặt SonarQube mọi người cần định nghĩa phiên bản cũng như lưu ý giúp mình cài đặt phiên bản Java tương thích.

- Cài đặt phiên bản Java lưu ý cài bản openjdk-devel giúp mình nhé

- Cài đặt database PostgreSQL

- Nhớ đổi thông tin password nhé mình để mặc định xxxxxx

```shell
#!/bin/bash
 
# This script install sonarqube in your RHEL/Centos7 System.
function install_postgres {
    # Install PostgreSQL repository
    yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
    #Install PostgreSQL database server 
    yum -y install yum -y install postgresql13-server postgresql13 postgresql13-contrib
    # Initialize the database
    /usr/pgsql-13/bin/postgresql-13-setup initdb
    # Edit the /var/lib/pgsql/13/data/pg_hba.conf to enable MD5-based authentication
    cat >> /var/lib/pgsql/13/data/pg_hba.conf <<EOF
# TYPE  DATABASE        USER            ADDRESS                 METHOD
 
# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
EOF
 
    # Start PostgreSQL server and enable
    systemctl start postgresql-13
    systemctl enable postgresql-13
    #Change the password for the default PostgreSQL user.
    echo -e "xxxxxx\nxxxxxx" | passwd postgres
    #Switch to the postgres user.
    su - postgres
    #Create a new user by typing
    createuser sonar
    #Set a password for the newly created user for SonarQube database.
    psql -c "ALTER USER sonar WITH ENCRYPTED password 'xxxxxx'";
    # Create a new database for PostgreSQL database
    psql -c "CREATE DATABASE sonar OWNER sonar;"
    #Exit from the psql shel and exit user .
    exit
}
 
function update_install_java {
    #update package
    yum update -y
    #yum install java
    yum -y install java-11-openjdk-devel wget unzip vim net-tools
    cp /etc/profile /etc/profile_backup
    echo 'export JAVA_HOME=/usr/lib/jvm/jre-11-openjdk' | sudo tee -a /etc/profile
    echo 'export JRE_HOME=/usr/lib/jvm/jre' | sudo tee -a /etc/profile
    source /etc/profile
}
 
function install_sonar_config {
    # Use temp folder
    cd /tmp
    # pull repo sonarqube
    wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.5.0.56709.zip
    # install SonarQube at /opt/sonarqube
    unzip -o -j sonarqube-9.5.0.56709.zip -d /tmp/sonarqube-9.5.0.56709
    mv /tmp/sonarqube-9.5.0.56709/sonarqube-9.5.0.56709 /opt/sonarqube
    # Create sonar user and sonar group
    groupadd sonar
    useradd -c "Sonar System User" -d /opt/sonarqube/ -g sonar -s /bin/bash sonar
    sudo chown -R sonar:sonar /opt/sonarqube/
    # Make a backup configuration file.
    cp /opt/sonarqube/conf/sonar.properties /opt/sonarqube/conf/sonar.properties.bka
    cat >> /opt/sonarqube/conf/sonar.properties << EOF
# Database information
sonar.jdbc.username=sonar
sonar.jdbc.password=xxxxxx
sonar.jdbc.url=jdbc:postgresql://localhost:5432/sonar
EOF
    # Change user to run Sonar
    sed -i 's/#RUN_AS_USER=/RUN_AS_USER=sonar/g' /opt/sonarqube/bin/linux-x86-64/sonar.sh
 
    # Make a file to manage Sonar service via systemctl
    cat > /etc/systemd/system/sonar.service << EOF
[Unit]
 
Description=SonarQube service
After=syslog.target network.target
 
[Service]
Type=forking
 
ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
 
User=sonar
Group=sonar
Restart=always
 
LimitNOFILE = 65536
 
[Install]
WantedBy=multi-user.target
EOF
 
    #Allow the required HTTP port through the system firewall.
    #    sudo firewall-cmd --add-service=http --permanent
    #   sudo firewall-cmd --reload
    # Set vm.max_map_count
    echo 'vm.max_map_count=262144' >> /etc/sysctl.conf
    sysctl -p
    # Stop firewalld
    systemctl stop firewalld
    # Start sonarqube
    systemctl start sonar
    systemctl enable sonar
    systemctl status sonar
 
}
 
 
function install_auto_sonar {
   update_install_java
   install_postgres
   install_sonar_config
}
 
 
function main {
    OS=$( cat /etc/*-release | grep 'NAME' | tr [:upper:] [:lower:] | grep -Poi '(ubuntu|centos|fedora|amazon)' | uniq )
 
    if [[ $EUID -ne 0 ]]; then
        echo "This script must be run as root" 1>&2
        exit 1
    fi
 
    if [[ $OS == "centos" || $OS == "amazon" ]];
    then
        install_auto_sonar
        echo "[SUCCESS] Sonar installed complete!"
    else
        echo "[ERROR] This operating system is not supported."
    fi
}
 
main
```

Sau khi cài đặt xong thì check lại status của SonarQube xem đã active chưa nhé bằng câu lệnh: **systemctl status sonarqube**

![](https://gociter.files.wordpress.com/2022/09/image.png?w=1024)

Mọi người muốn kiểm tra hoặc thay đổi cấu hình truy cập theo đường dẫn này nhé: **/opt/sonarqube/conf/sonar.properties**

## **2\. Tích hợp triển khai SonarQube trên Jenkins**

Cài đặt Plugin SonarQube Scanner trên Jenkins

![](https://gociter.files.wordpress.com/2022/09/image-1.png?w=1024)

Vào phần Manage Jenkins => Configure System

![](https://gociter.files.wordpress.com/2022/09/image-2.png?w=1024)

Đến mục SonarQube server và cài đặt các thông số cần thiết

![](https://gociter.files.wordpress.com/2022/09/image-3.png?w=1024)

Lưu ý phần token mình thực hiện 2 bước giúp mình: Đầu tiên đăng nhập vào site SonarQube để tạo token nhé

![](https://gociter.files.wordpress.com/2022/09/image-5.png?w=1024)

Bước 2: Truy cập phần Credentials => System => Gloabl để tạo ra secret key từ site SonarQube vừa lấy

![](https://gociter.files.wordpress.com/2022/09/image-4.png?w=1024)

Sau khi hoàn tất xong thì lần lượt tạo Job SonarQube để quét source code

Cấu hình Pipeline nhé mọi người

![](https://gociter.files.wordpress.com/2022/09/image-6.png?w=1024)

![](https://gociter.files.wordpress.com/2022/09/image-7.png?w=1024)

Thông tin pipeline mình đính kèm bên dưới

```groovy
pipeline{
  agent any
    tools {
        maven 'Maven'
        jdk 'jdk11'
    }
     
  stages{
    stage ('checkout'){
      steps{
        deleteDir()
        checkout scm
      }
    }
     
    stage('Build') {
        tools {
            jdk "JDK8" // the name you have given the JDK installation using the JDK manager (Global Tool Configuration)
        }
        steps {
            sh 'mvn compile'
            sh 'mvn clean'
        }
    }
    stage('SonarQube analysis') {
        tools {
            jdk "jdk11" // the name you have given the JDK installation using the JDK manager (Global Tool Configuration)
        }
        environment {
            scannerHome = tool 'SonarQube' // the name you have given the Sonar Scanner (Global Tool Configuration)
            jdk = tool name: 'jdk11'
            javahome = "${jdk}/jdk-11.0.2"
        }
        steps {
            withSonarQubeEnv(installationName: 'SonarQube') {
//                sh 'mvn sonar:sonar'
 
                withEnv(["JAVA_HOME=${ tool 'jdk11' }/jdk-11.0.2/","PATH+JAVA=${ tool 'jdk11'}/jdk-11.0.2/bin"]) {
                     
                    sh "echo JDK:   ${jdk}"
                    sh "echo JAVA_HOME:   $JAVA_HOME"
                    // note that simple quote strings are not evaluated by Groovy
                    // substitution is done by shell script using environment
                    sh '$JAVA_HOME/bin/java -version'
                    sh 'mvn clean package'
                    sh 'mvn sonar:sonar -Dsonar.projectKey=Project_Backend -Dsonar.host.url=http://xx.xx.xx.xx:9000 -Dsonar.login=xxx'
                }
            }
            timeout(time: 60, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
        }
    }
  }
}
```

Lưu ý dòng mvn sonar:sonar giúp mình nhé là project mọi người đã tạo trên SonarQube, sau khi tạo sẽ có dòng token scan này nhớ lưu lại cho các lần sử dụng sau này.

Tạo mới project sẽ theo các bước bên dưới, đầu tiên mình tạo manual project và chọn Localy project nhé bà con

![](https://gociter.files.wordpress.com/2022/09/image-8.png?w=1024)

![](https://gociter.files.wordpress.com/2022/09/image-9.png?w=440)

![](https://gociter.files.wordpress.com/2022/09/image-10.png?w=1024)

![](https://gociter.files.wordpress.com/2022/09/image-11.png?w=1024)

![](https://gociter.files.wordpress.com/2022/09/image-13.png?w=1024)

Dòng token mình lưu ý với mọi người chính là dòng khi khởi tạo project này.

## **3\. Tạo Webhook cho SonarQube Job trên Jenkins**

Ok đến đây là hoàn tất quá trình cài đặt và thiết lập 1 job pipeline trên Jenkins nhưng SonarQube có 1 thiết lập cuối cùng chính là tạo webhook để bắn event cho Jenkins biết là Sonar đã quét xong vui lòng cập nhật trạng thái cho Job là thành công hay thất bại. Trong phần Project Settings mọi người chọn đến webhooks nhé.

![](https://gociter.files.wordpress.com/2022/09/image-14.png?w=233)

![](https://gociter.files.wordpress.com/2022/09/image-15.png?w=1024)

Lưu ý đường dẫn webhook trên Jenkins sẽ là **http://jenkins-host:port/sonarqube-webhook/** nhé mọi người, khi truy cập trên giao diện sẽ báo như hình

![](https://gociter.files.wordpress.com/2022/09/image-17.png?w=1024)

Okie giờ bắt đầu bật job lên và chờ thành quả thui nếu không có Webhook thì job sẽ chạy đến lúc bị timeout mới dừng nhé mọi người.

![](https://gociter.files.wordpress.com/2022/09/image-18.png?w=636)

Trên Sonar mọi người truy cập Project Settings => Background Tasks để check trạng thái job quét nhé

![](https://gociter.files.wordpress.com/2022/09/image-19.png?w=1024)

Ah thêm một lưu ý với những ai quét source code Java thì nên thêm cấu hình ignore những thư mục source không muốn quét để tăng tốc độ lên nhé. Sample template như hình bên dưới của mình.

![](https://gociter.files.wordpress.com/2022/09/image-20.png?w=981)

Cảm ơn mọi người đã follow đến dòng này, hẹn gặp mọi người trong bài viết lần sau nhé ^^

Link bài viết của mình: [https://gociter.wordpress.com/2022/09/29/cai-dat-cau-hinh-sonarqube-tren-jenkins-va-tao-webhook-sonarqube-job/](https://gociter.wordpress.com/2022/09/29/cai-dat-cau-hinh-sonarqube-tren-jenkins-va-tao-webhook-sonarqube-job/)