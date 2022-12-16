Để đơn giản hơn trong quá trình lab hoặc dựng nhanh các môi trường cần thiết, hôm nay mình chia sẻ script cài đặt docker, docker-compose trên môi trường các hệ điều hành Ubuntu và CentOS.

* Ubuntu Server 18.04 64 bit.
* CentOS 7 Server 64 bit.

## Các bước thực hiện như sau:
### Bước 1: Update & tải các gói cần thiết.
Đối với Centos
 ```
 yum update -y && yum install -y wget
```
Đối với Ubuntu
```
apt update -y && apt install -y wget
```
### Bước 2: Tạo script như sau
Tạo với tên là docer-install.sh
```
#!/bin/bash
if [ ! -z `sudo which apt | grep "/apt"` ]; then
sudo apt -y update
sudo apt -y install git wget
elif [ -z `sudo which yum | grep "/yum"` ]; then
yum update
yum install -y wget git
fi
is_ubuntu=`awk -F '=' '/PRETTY_NAME/ { print $2 }' /etc/os-release | egrep Ubuntu -i`
is_centos=`awk -F '=' '/PRETTY_NAME/ { print $2 }' /etc/os-release | egrep CentOS -i`
if [ ! -z "$is_ubuntu" ]; then
is_docker_exist=`dpkg -l | grep docker -i`
elif [ ! -z "$is_centos" ]; then
is_docker_exist=`rpm -qa | grep docker`
else
echo"Error: Current Linux release version is not supported, please use either centos or ubuntu. "
exit
fi
if [ ! -z "$is_docker_exist" ]; then
echo"Warning: docker already exists. "
fi
function ubuntu_install()
{
#Install docker
sudo apt-get -y update
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release software-properties-common git vim
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get -y update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker.service
sudo systemctl start docker
# Install docker-compose
COMPOSE_VERSION=`git ls-remote https://github.com/docker/compose | grep refs/tags | grep -oE "[0-9]+\.[0-9][0-9]+\.[0-9]+$" | sort --version-sort | tail -n 1`
sudo sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
sudo chmod +x /usr/local/bin/docker-compose
sudo sh -c "curl -L https://raw.githubusercontent.com/docker/compose/${COMPOSE_VERSION}/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose"
is_docker_success=`sudo docker run hello-world | grep -i "Hello from Docker"`
if [ -z "$is_docker_success" ]; then
echo"Error: Docker installation Failed."
exit
fi
echo"Docker has been installed successfully."
}
function centos_install()
{
#Install docker
sudo yum install -y yum-utils device-mapper-persistent-data lvm2 git vim
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum -y install docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker.service
sudo systemctl start docker
is_docker_success=`sudo docker run hello-world | grep -i "Hello from Docker"`
if [ -z "$is_docker_success" ]; then
echo"Error: Docker installation Failed."
exit
fi
echo"Docker has been installed successfully."
}
function docker_compose_install()
{
# Install docker-compose
COMPOSE_VERSION=`git ls-remote https://github.com/docker/compose | grep refs/tags | grep -oE "[0-9]+\.[0-9][0-9]+\.[0-9]+$" | sort --version-sort | tail -n 1`
sudo sh -c "curl -L https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
sudo chmod +x /usr/local/bin/docker-compose
sudo sh -c "curl -L https://raw.githubusercontent.com/docker/compose/${COMPOSE_VERSION}/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose"
}
if [ ! -z "$is_ubuntu" ]; then
ubuntu_install
elif [ ! -z "$is_centos" ]; then
centos_install
fi
docker_compose_install
docker-compose --version
echo "Docker-compose has been installed successfully."
```
### Bước 3: Chạy lệnh sau để cài đặt
Cấp quyền thực thi và chạy:
```
chmod +x docker-install.sh
./docker-install.sh
```
Sau khi thực hiện xong các bạn kiểm tra status docker
```
systemctl status docker
sudo docker run hello-world
```
Chúc các bạn thành công.!

Tham khảo: [Scripts cài đặt docker docker-compose trên Ubuntu, CentOS](https://vietcalls.com/scripts-cai-dat-docker-docker-compose-tren-ubuntu-centos/)