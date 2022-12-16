# Cài bằng câu lệnh
## Thực hiện lần lượt câu lệnh
```
GOVERSION="go1.12.9" // thay đổi version muốn tải 

sudo apt update
sudo apt -y upgrade

echo https://storage.googleapis.com/golang/$GOVERSION.linux-amd64.tar.gz
curl -O https://storage.googleapis.com/golang/$GOVERSION.linux-amd64.tar.gz
sudo tar -xvf $GOVERSION.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo mv go /usr/local
sudo rm $GOVERSION.linux-amd64.tar.gz
```
Set $GOPATH
```
echo 'export PATH=$PATH:/usr/local/go/bin' >>~/.profile
echo 'export GOPATH=$HOME/go' >>~/.profile 
echo 'export PATH=$PATH:$GOPATH/bin' >>~/.profile

source ~/.profile
```
### Restart computer

# Cài đặt bằng file script tự động
```
git clone https://github.com/long25vn/Configure
```
```
cd Configure/Golang
```
```
sudo ./Install-Go.sh
```
Tham khảo thêm tại https://github.com/long25vn/Configure