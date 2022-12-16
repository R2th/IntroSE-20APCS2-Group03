Xin chào tất cả các bạn
Lại là mình đây chứ không phải mình đâu 😁
Mình vừa hoàn thành Video fork Dash để tạo coin mới
Hãy like share và sub giúp mình nhé

Trước khi thực hiện hãy xem qua việc cài vmware hay virtualbox để cài Ubuntu 18 hay 16 nhé
https://www.youtube.com/watch?v=EILveQZFivU

Trong phần mô tả của mỗi video đều có note để các bạn thực hiện

https://www.youtube.com/playlist?list=PLTG7ob4rDKn4uS51yAmlDKahxf2AP4VQ8

Phần 1

```
Install Ubuntu 18 and 16 version to your VM Machine

##########################################################

sudo apt-get update

sudo apt-get install build-essential gcc make perl dkms

sudo reboot

sudo apt-get install git
 
sudo apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils
 
sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev
 
sudo apt-get install libboost-all-dev
 
sudo apt-get install software-properties-common
 
sudo add-apt-repository ppa:bitcoin/bitcoin
 
sudo apt-get update
 
sudo apt-get install libdb4.8-dev libdb4.8++-dev
 
sudo apt-get install libminiupnpc-dev
 
sudo apt-get install libzmq3-dev
 
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler
 
sudo apt-get install libqt4-dev libprotobuf-dev protobuf-compiler
 
 
sudo apt-get install openssl1.0

sudo apt-get install libssl1.0-dev 

################################################################## 

On the Ubuntu 18 istall go lang

sudo apt  install golang-go

####### If show error ##########

sudo killall apt apt-get
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock*
sudo dpkg --configure -a
sudo apt update
### Try install go again ####

sudo apt install golang-go

sudo apt install gccgo-go

cd Desktop

git clone https://github.com/vuicash/generate-genesis

cd generate-genesis

go get -d -v

go build

go test


##################################################################

git clone https://github.com/dashpay/dash.git

cd dash


openssl ecparam -genkey -name secp256k1 -out mainnet.pem

openssl ec -in mainnet.pem -text > mainnet.hex

date +%s


############# Reg Test = Dev net for latest of Dash ###################

./generate-genesis -algo x11 -bits 207fffff -psz "Make Dash great again Feb 16/2022" -pubkey "04ce3e098125b0292f3bc2a91060c53674bf6cbdb92ce2a637bb01cb3bf3003428d150b0ebdebdbb265f22667b0f0fec4e18a744db9dc122fa551fce82d57ea26f" -timestamp 1645026221 -nonce 0

Ctrl Hash:	0x6629bdf7b8fb68c7ececb832faa1372499611f39eafa9b6769ed46a0f516ad8b
Target:		0x7fffff0000000000000000000000000000000000000000000000000000000000
Blk Hash:	0x6629bdf7b8fb68c7ececb832faa1372499611f39eafa9b6769ed46a0f516ad8b
Mkl Hash:	0x679600f651ba8617c649cc63b987253c7f4e4a674a0c48e4c370a9efaacf3ad1
Nonce:		0
Timestamp:	1645026221
Pubkey:		04ce3e098125b0292f3bc2a91060c53674bf6cbdb92ce2a637bb01cb3bf3003428d150b0ebdebdbb265f22667b0f0fec4e18a744db9dc122fa551fce82d57ea26f
Coins:		5000000000
Psz:		'Make Dash great again Feb 16/2022'

############# Test net ###################

./generate-genesis -algo x11 -bits 1e0ffff0 -psz "Make Dash great again Feb 16/2022" -pubkey "04ce3e098125b0292f3bc2a91060c53674bf6cbdb92ce2a637bb01cb3bf3003428d150b0ebdebdbb265f22667b0f0fec4e18a744db9dc122fa551fce82d57ea26f" -timestamp 1645028221 -nonce 0

Ctrl Hash:	0x000007aaf90782153e3111fb20cff710172825af00397ba31b91a1e80e192795
Target:		0x00000ffff0000000000000000000000000000000000000000000000000000000
Blk Hash:	0x000007aaf90782153e3111fb20cff710172825af00397ba31b91a1e80e192795
Mkl Hash:	0x679600f651ba8617c649cc63b987253c7f4e4a674a0c48e4c370a9efaacf3ad1
Nonce:		605870
Timestamp:	1645028221
Pubkey:		04ce3e098125b0292f3bc2a91060c53674bf6cbdb92ce2a637bb01cb3bf3003428d150b0ebdebdbb265f22667b0f0fec4e18a744db9dc122fa551fce82d57ea26f
Coins:		5000000000
Psz:		'Make Dash great again Feb 16/2022'

############# Main Net ###################

./generate-genesis -algo x11 -bits 1e0ffff0 -psz "Make Dash great again Feb 16/2022" -pubkey "04ce3e098125b0292f3bc2a91060c53674bf6cbdb92ce2a637bb01cb3bf3003428d150b0ebdebdbb265f22667b0f0fec4e18a744db9dc122fa551fce82d57ea26f" -timestamp 1645029221 -nonce 0

Ctrl Hash:	0x000009b1323ca3db939dde765caf07c0a588f870cb9a6724c7c49a41f5b2dbdb
Target:		0x00000ffff0000000000000000000000000000000000000000000000000000000
Blk Hash:	0x000009b1323ca3db939dde765caf07c0a588f870cb9a6724c7c49a41f5b2dbdb
Mkl Hash:	0x679600f651ba8617c649cc63b987253c7f4e4a674a0c48e4c370a9efaacf3ad1
Nonce:		252006
Timestamp:	1645029221
Pubkey:		04ce3e098125b0292f3bc2a91060c53674bf6cbdb92ce2a637bb01cb3bf3003428d150b0ebdebdbb265f22667b0f0fec4e18a744db9dc122fa551fce82d57ea26f
Coins:		5000000000
Psz:		'Make Dash great again Feb 16/2022'



############################### Change magic key make new chain #################################



consensus.nMinimumChainWork = uint256S("0x0000000000000000000000000000000000000000000000000000000000000000");// Start

https://en.bitcoin.it/wiki/List_of_address_prefixes

76 	X 

70-71 	V 
132-133 	v 


Important: Save for feature info (*)

############################### Build #################################

sudo apt-get install curl build-essential libtool autotools-dev automake pkg-config python3 libssl-dev libevent-dev bsdmainutils

sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev

sudo apt-get install libboost-all-dev

sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler

sudo apt-get install libqrencode-dev

cd depends

make -j4

### Take 30 min to complete
### Mat khoang 30 phut moi xong ^^

cd ..

./autogen.sh

./configure --prefix=`pwd`/depends/x86_64-pc-linux-gnu

make -j4

### Take 15 min to complete
### Mat khoang 15 phut moi xong ^^
### OK

cd src/qt

./dash-qt

You will get Error

Invalid spork address specified with -sporkaddr


Whatis vSporkAddresses ???????????????????????????????????????????????

How to find and replace this 

Please see my next Video ^^
```

Phần 2
```
##########################################################

sudo apt-get update

sudo apt-get install build-essential gcc make perl dkms

sudo reboot

sudo apt-get install git
 
sudo apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils
 
sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev
 
sudo apt-get install libboost-all-dev
 
sudo apt-get install software-properties-common
 
sudo add-apt-repository ppa:bitcoin/bitcoin
 
sudo apt-get update
 
sudo apt-get install libdb4.8-dev libdb4.8++-dev
 
sudo apt-get install libminiupnpc-dev
 
sudo apt-get install libzmq3-dev
 
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler
 
sudo apt-get install libqt4-dev libprotobuf-dev protobuf-compiler
 
 
sudo apt-get install openssl1.0

sudo apt-get install libssl1.0-dev 

########## For Ubuntu 16 need upgrade ###########

sudo apt-get upgrade

################################################################## 

On the Ubuntu 16

Build from Dash Core 0.12.2.1 

git clone https://github.com/dashpay/dash.git

git checkout -b 0.12

or download from github


##################################################################

Copy from Important Save for feature info (*) to your src/chainparams.cpp



###################################################################

sudo apt-get install curl build-essential libtool autotools-dev automake pkg-config python3 libssl-dev libevent-dev bsdmainutils

sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev

sudo apt-get install libboost-all-dev

sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler

sudo apt-get install libqrencode-dev

cd depends

make -j4

########## If make error Please upgrade and try make again ##########

sudo apt-get upgrade


########## Fix link ##########

########## dash-0.12.2.1/depends/sources/download-stamps/.stamp_fetched-expat-expat-2.1.0.tar.gz.hash] Error 22

depends/packages/expat.mk

$(package)_download_path=https://github.com/libexpat/libexpat/releases/download/R_2_1_0/


########### dash-0.12.2.1/depends/sources/download-stamps/.stamp_fetched-qt-qtbase-opensource-src-5.5.0.tar.gz.hash] Error 22

depends/packages/qt.mk

$(package)_download_path=http://download.qt.io/new_archive/qt/5.5/$($(package)_version)/submodules

########## Fix link ##########



cd ..

./autogen.sh

./configure --prefix=`pwd`/depends/x86_64-pc-linux-gnu

make -j4


###################################################################
Tuyệt vời

cd src/qt

./dash-qt

Copy Mainnet vSporkAddresses

VX3NVP2AS45P2Kj1A2iH5xEH2jLR6VYQkG

./dash-qt --testnet

Copy Testnet vSporkAddresses

v7wFdeJUKbC8XFqZYcnjMLxgqbaMhyAfZv


./dash-qt --regtest

Copy Regtest =  Devnet vSporkAddresses


ycBCjTMDHFLcxUKXFt91RTUqqCGD2BnoV9


################################################################## 
Come back Ubuntu 18

Put your vSporkAddresses you have on Ubuntu 16

Check your new chain

Have a fun!

Good luck.
```