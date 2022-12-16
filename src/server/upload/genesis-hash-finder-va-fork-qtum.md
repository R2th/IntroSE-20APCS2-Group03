Fork Qtum tạo chain mới
Hãy xem video mình đã thực hiện, kết hợp với các câu lệnh đã được ghi lại bên dưới
https://www.youtube.com/watch?v=5rqiGruTe4E

![](https://images.viblo.asia/d183f855-62b2-4568-9c4a-891585386d6d.png)


Như bitcoin đã biết nó mã hóa chuẩn SHA256,
Litecoin là SCRYPT
hay Dash là X11.. thì ta đã có các công cụ tìm genesis hash
Dưới đây là một số công cụ để tìm genesis hash

```
https://github.com/vuicash/node-genesis-block
```

```
https://github.com/vuicash/GenesisH0
```

```
https://github.com/vuicash/generate-genesis
```


Nhưng một số coin nó không tiết lộ nên phải Debug
Các bạn nên build từ bản cũ hơn của Qtum để tìm genesis hash cho nhanh
Nó mất thời gian ở công đoạn chạy lệnh "make" mất tầm 30 phút
Sau đó nâng cấp dần coin của bạn
Qtum là một dự án khai thác trước
Bạn sẽ tìm 5000 block đầu tiên rồi hãy tiến hành nâng cấp coin tạo checkpoint ở block thứ 5000 sau đó mới public
Và tôi chọn Qtum làm vật thí nghiệm cho việc debug này

Cách Debug
```
https://github.com/boxaltcoin/vuicoin/blob/master/qtum.txt
```



```
############################### Thay đổi magic key để tạo chain mới #################################

git clone https://github.com/qtumproject/qtum --recursive

consensus.nMinimumChainWork = uint256S("0x0000000000000000000000000000000000000000000000000000000000000000");// Start

https://en.bitcoin.it/wiki/List_of_address_prefixes

48 	L 

70-71 	V 
132-133 	v 



############################## Tạo publickey ##################################

openssl ecparam -genkey -name secp256k1 -out genesiscoinbase.pem

openssl ec -in genesiscoinbase.pem -text > genesiscoinbase.hex

################################################################

date +%s


############################## Genesis hash Debug ##################################


File  src/chainparams.cpp

Thêm đoạn mã này vào trước

/**
 * Main network
 */
#######################
static void MineGenesis(CBlockHeader& genesisBlock, const uint256& powLimit, bool noProduction)
{
    if(noProduction)
        genesisBlock.nTime = std::time(0);
    genesisBlock.nNonce = 0;

    LogPrintf("NOTE: Genesis nTime = %u \n", genesisBlock.nTime);
    LogPrintf("WARN: Genesis nNonce (BLANK!) = %u \n", genesisBlock.nNonce);

    arith_uint256 besthash;
    memset(&besthash,0xFF,32);
    arith_uint256 hashTarget = UintToArith256(powLimit);
    LogPrintf("Target: %s\n", hashTarget.GetHex().c_str());
    arith_uint256 newhash = UintToArith256(genesisBlock.GetHash());
    while (newhash > hashTarget) {
        genesisBlock.nNonce++;
        if (genesisBlock.nNonce == 0) {
            LogPrintf("NONCE WRAPPED, incrementing time\n");
            ++genesisBlock.nTime;
        }
        // If nothing found after trying for a while, print status
        if ((genesisBlock.nNonce & 0xfff) == 0)
            LogPrintf("nonce %08X: hash = %s (target = %s)\n",
                   genesisBlock.nNonce, newhash.ToString().c_str(),
                   hashTarget.ToString().c_str());

        if(newhash < besthash) {
            besthash = newhash;
            LogPrintf("New best: %s\n", newhash.GetHex().c_str());
        }
        newhash = UintToArith256(genesisBlock.GetHash());
    }
    LogPrintf("Genesis nTime = %u \n", genesisBlock.nTime);
    LogPrintf("Genesis nNonce = %u \n", genesisBlock.nNonce);
    LogPrintf("Genesis nBits: %08x\n", genesisBlock.nBits);
    LogPrintf("Genesis Hash = %s\n", newhash.ToString().c_str());
    LogPrintf("Genesis hashStateRoot = %s\n", genesisBlock.hashStateRoot.ToString().c_str());
    LogPrintf("Genesis Hash Merkle Root = %s\n", genesisBlock.hashMerkleRoot.ToString().c_str());
}
#######################

####################### 1. Mainnet #######################

Tìm đoạn này và thay thế
#######################
        genesis = CreateGenesisBlock(1504695029, 8026361, 0x1f00ffff, 1, 50 * COIN);
        consensus.hashGenesisBlock = genesis.GetHash();
        assert(consensus.hashGenesisBlock == uint256S("0x000075aef83cf2853580f8ae8ce6f8c3096cfa21d98334d6e3f95e5582ed986c"));
        assert(genesis.hashMerkleRoot == uint256S("0xed34050eb5909ee535fcb07af292ea55f3d2f291187617b44d3282231405b96d"));
#######################
bằng
#######################
//Debug Mainnet
        startNewChain = true;

        genesis = CreateGenesisBlock(1506211200, 0, 0x1f00ffff, 1, 50 * COIN);// Change time and set nonce =0

        if (startNewChain)
            MineGenesis(genesis, consensus.powLimit, false);
			
		//genesis = CreateGenesisBlock(1504695029, 8026361, 0x1f00ffff, 1, 50 * COIN);
        consensus.hashGenesisBlock = genesis.GetHash();
        //assert(consensus.hashGenesisBlock == uint256S("0x000075aef83cf2853580f8ae8ce6f8c3096cfa21d98334d6e3f95e5582ed986c"));
        //assert(genesis.hashMerkleRoot == uint256S("0xed34050eb5909ee535fcb07af292ea55f3d2f291187617b44d3282231405b96d"));
		
		LogPrintf("Main Genesis nTime = %u \n", genesis.nTime);
        LogPrintf("Main Genesis nNonce = %u \n", genesis.nNonce);
        LogPrintf("Main Genesis nBits: %08x\n", genesis.nBits);
        LogPrintf("Main Genesis Hash = %s\n", genesis.GetHash().ToString().c_str());
        LogPrintf("Main Genesis hashStateRoot = %s\n", genesis.hashStateRoot.ToString().c_str());
        LogPrintf("Main Genesis Hash Merkle Root = %s\n", genesis.hashMerkleRoot.ToString().c_str());			
//End Debug Mainnet
	
####################### 2. Testnet #######################

Tìm đoạn này và thay thế
#######################
        genesis = CreateGenesisBlock(1504695029, 7349697, 0x1f00ffff, 1, 50 * COIN);
        consensus.hashGenesisBlock = genesis.GetHash();
        assert(consensus.hashGenesisBlock == uint256S("0x0000e803ee215c0684ca0d2f9220594d3f828617972aad66feb2ba51f5e14222"));
        assert(genesis.hashMerkleRoot == uint256S("0xed34050eb5909ee535fcb07af292ea55f3d2f291187617b44d3282231405b96d"));
#######################
bằng
#######################
//Debug Testnet
        startNewChain = true;
		
        genesis = CreateGenesisBlock(1645276728, 0, 0x1f00ffff, 1, 50 * COIN);// Change time and set nonce =0

        if (startNewChain)
            MineGenesis(genesis, consensus.powLimit, false);
			
        //genesis = CreateGenesisBlock(1504695029, 7349697, 0x1f00ffff, 1, 50 * COIN);
        consensus.hashGenesisBlock = genesis.GetHash();
        //assert(consensus.hashGenesisBlock == uint256S("0x0000e803ee215c0684ca0d2f9220594d3f828617972aad66feb2ba51f5e14222"));
        //assert(genesis.hashMerkleRoot == uint256S("0xed34050eb5909ee535fcb07af292ea55f3d2f291187617b44d3282231405b96d"));

        LogPrintf("Test Genesis nTime = %u \n", genesis.nTime);
        LogPrintf("Test Genesis nNonce = %u \n", genesis.nNonce);
        LogPrintf("Test Genesis nBits: %08x\n", genesis.nBits);
        LogPrintf("Test Genesis Hash = %s\n", genesis.GetHash().ToString().c_str());
        LogPrintf("Test Genesis hashStateRoot = %s\n", genesis.hashStateRoot.ToString().c_str());
        LogPrintf("Test Genesis Hash Merkle Root = %s\n", genesis.hashMerkleRoot.ToString().c_str());
//End Debug Testnet		

####################### 3. Regtest #######################	

Tìm đoạn này và thay thế
#######################
        genesis = CreateGenesisBlock(1504695029, 17, 0x207fffff, 1, 50 * COIN);
        consensus.hashGenesisBlock = genesis.GetHash();
        assert(consensus.hashGenesisBlock == uint256S("0x665ed5b402ac0b44efc37d8926332994363e8a7278b7ee9a58fb972efadae943"));
        assert(genesis.hashMerkleRoot == uint256S("0xed34050eb5909ee535fcb07af292ea55f3d2f291187617b44d3282231405b96d"));
#######################
bằng
#######################
//Debug Regtest
        startNewChain = true;
		
        genesis = CreateGenesisBlock(1506211200, 17, 0x207fffff, 1, 50 * COIN);// Change time and set nonce = any number

        if (startNewChain)
            MineGenesis(genesis, consensus.powLimit, false);
			
        //genesis = CreateGenesisBlock(1504695029, 17, 0x207fffff, 1, 50 * COIN);
        consensus.hashGenesisBlock = genesis.GetHash();
        //assert(consensus.hashGenesisBlock == uint256S("0x665ed5b402ac0b44efc37d8926332994363e8a7278b7ee9a58fb972efadae943"));
        //assert(genesis.hashMerkleRoot == uint256S("0xed34050eb5909ee535fcb07af292ea55f3d2f291187617b44d3282231405b96d"));	

        LogPrintf("Reg Genesis nTime = %u \n", genesis.nTime);
        LogPrintf("Reg Genesis nNonce = %u \n", genesis.nNonce);
        LogPrintf("Reg Genesis nBits: %08x\n", genesis.nBits);
        LogPrintf("Reg Genesis Hash = %s\n", genesis.GetHash().ToString().c_str());
        LogPrintf("Reg Genesis hashStateRoot = %s\n", genesis.hashStateRoot.ToString().c_str());
        LogPrintf("Reg Genesis Hash Merkle Root = %s\n", genesis.hashMerkleRoot.ToString().c_str());		
//End Debug Regtest

		
			
##############################################
File src/chainparams.h

Thêm đoạn mã

bool startNewChain;

và trước

CCheckpointData checkpointData;




############################### Chạy thử debug chain #################################

sudo apt-get install build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils git cmake libboost-all-dev libgmp3-dev

sudo apt-get install software-properties-common

sudo add-apt-repository ppa:bitcoin/bitcoin

sudo apt-get update

sudo apt-get install libdb4.8-dev libdb4.8++-dev


sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler qrencode


./autogen.sh

./configure

make -j4

#### Mất khoảng 20-30 phút để hoàn thành ####


cd src/qt

./qtum-qt


Sau khi chạy nó sẽ bị lỗi như thế này
qtum-qt: validation.cpp:1639: void InvalidChainFound(CBlockIndex*): Assertion `tip' failed.
Aborted (core dumped)

############################## Kiểm tra file debug.log ##################################

Nhấn tổ hợp Ctr H

Để hiển thị tệp và thư mục bị ẩn


############## MainNet Find ##############

2022-02-19T14:16:06Z Main Genesis nTime = 1645278122 
2022-02-19T14:16:06Z Main Genesis nNonce = 35110 
2022-02-19T14:16:06Z Main Genesis nBits: 1f00ffff
2022-02-19T14:16:06Z Main Genesis Hash = 00007c13b508f80a556139c390a06ee51e59ecd9246e03bf00acac4299a508b0
2022-02-19T14:16:06Z Main Genesis hashStateRoot = 9514771014c9ae803d8cea2731b2063e83de44802b40dce2d06acd02d0ff65e9
2022-02-19T14:16:06Z Main Genesis Hash Merkle Root = 49e2dd855ad104b945cd2f6980d7d69d0470bc69646dbdb77a275b4196f7a55f

############## TestNet Find ##############

2022-02-19T14:16:06Z Test Genesis nTime = 1645278327 
2022-02-19T14:16:06Z Test Genesis nNonce = 13721 
2022-02-19T14:16:06Z Test Genesis nBits: 1f00ffff
2022-02-19T14:16:06Z Test Genesis Hash = 00008067af1d36cacf194d0f0508ee0f58371314b84e21cbf4ec3d60f1f4cc2c
2022-02-19T14:16:06Z Test Genesis hashStateRoot = 9514771014c9ae803d8cea2731b2063e83de44802b40dce2d06acd02d0ff65e9
2022-02-19T14:16:06Z Test Genesis Hash Merkle Root = 49e2dd855ad104b945cd2f6980d7d69d0470bc69646dbdb77a275b4196f7a55f

############## RegTest Find ##############

2022-02-19T14:16:06Z Reg Genesis nTime = 1645278420 
2022-02-19T14:16:06Z Reg Genesis nNonce = 1 
2022-02-19T14:16:06Z Reg Genesis nBits: 207fffff
2022-02-19T14:16:06Z Reg Genesis Hash = 71b2f068167ce06588cb167d10acbffc4e069ab6172fc5db6c24e3e83e10e1b9
2022-02-19T14:16:06Z Reg Genesis hashStateRoot = 9514771014c9ae803d8cea2731b2063e83de44802b40dce2d06acd02d0ff65e9
2022-02-19T14:16:06Z Reg Genesis Hash Merkle Root = 49e2dd855ad104b945cd2f6980d7d69d0470bc69646dbdb77a275b4196f7a55f

############################## Sửa lại file chainparams.cpp với thông tin mà bạn lấy được khi debug xong ##################################

Remove //Debug Mainnet
Remove //Debug Testnet
Remove //Debug Regtest


############################## Sửa lại file chainparams.h ##################################

src/chainparams.h 

Xóa dòng này đi

bool startNewChain;


############################### Chạy lại chain mới #################################

cd ../..

make -j4

cd src/qt

./qtum-qt


Tuyệt vời bạn đã hoàn thành xong việc debug Qtum và tạo coin mới


```

Mọi thắc mắc xin vui lòng để lại bình luận bên dưới, Mình sẽ giải đáp trong tầm hiểu biết của mình