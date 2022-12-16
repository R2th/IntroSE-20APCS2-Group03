### Step 1: Ensure system is updated and has basic build tools
```
sudo apt-get update 
sudo apt-get --assume-yes upgrade 
sudo apt-get --assume-yes install tmux build-essential gcc g++ make binutils 
sudo apt-get --assume-yes install software-properties-common
```

### Step 2: Install your nvidia graphics driver. 

Search for software & update and click tab additional drivers in menu and open it. Wait for minute and select nvidia driver and hit apply and restart.

![Install your nvidia graphics driver](https://lh3.googleusercontent.com/wSPIocUpy47kSzv4vE_mn3FJbKkMFg2rjxzhEBHYmHJmzEIDCx6A3nngHeVT9uDAzXUcYZ7be0C5ft0ZdeoIVIFI8lv2_NSMffm5nVKY32jHt6qj0UWqZL60DadjLBZv8aqcO3hjB-mE4ABQ8Tucj3B03CtEY8RYI7usuP-qSOKoE6NVtBjWri3uvsDu6dCTWfkpEIQRcFaHyNYqtDZl_N8KfzhNYWwBt3sH15xQAvNCDhOUULDdPkwoOpW3gee9JauzkuvAhTWGJJ9_m0uKmUaWkY9yFXLxqWN5rkqQu2NJxmKmqKbK3pKVbCCrBFeNtH-XwHk4cl5ViE5EiEENqwswOqTXQl1I-Dcz99BVmSKef2Xo5Xx91waGesZlm24lbRaX1eeHMxEFb9PtuX8BdPe6RPa5RoUHLmCzhI13t9FVUTa-LUMbRazNOzC1mNVqSOKkGp__0JkzF7tKjOzW7RnYbFJCv9-gg1TNHUZKxegK3cSghzzqt-9sACW6IPpTvj4flVwpdsO1TWNf_EV2jGebvcbSGRWQum9n6_PowBk76dbvHEx2RhyVGH2mDl1cyijF684WfPbSpUSQDqDjj5hMCSj9rUMcvf3JcUi_Tix60HrSBsC3thZb4ktHgOq1VGh6BAkU52p2w2dEm7ItMt9NEb5RroN_=w736-h361-no)

### Step 3: Download cuda-9.0 .deb package and install it

[Choose version cuda suitable with OS](https://developer.nvidia.com/cuda-downloads)

[Ubuntu 17.10 allow this guide](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1704&target_type=deblocal)

```
cd Downloads
sudo dpkg -i cuda-repo-ubuntu1704-9-1-local_9.1.85-1_amd64.deb (This is the deb file you've downloaded)
sudo apt-get update
sudo apt-get install cuda
```

Open terminal, type: 
```
cd ~
nano ~/.bashrc 
```

And add 2 lines below file above:
```
export PATH=/usr/local/cuda-9.1/bin${PATH:+:${PATH}} 
export LD_LIBRARY_PATH=/usr/local/cuda-9.1/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}} 
```

In terminal,  type: `source ~/.bashrc`

### Step 4: Download cudnn v7.1 and run following command:
[Download cuDNN v7.1.1 for CUDA 9.1](https://developer.nvidia.com/rdp/cudnn-download)

```
cd Downloads 
wget https://developer.nvidia.com/compute/machine-learning/cudnn/secure/v7.1.1/prod/9.1_20180214/cudnn-9.1-linux-x64-v7.1
tar -xzvf cudnn-9.1-linux-x64-v7.1.tgz 
sudo cp cuda/include/cudnn.h /usr/local/cuda/include 
sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64 
sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn* 
```
### Step 5: Prepare TensorFlow dependencies
`sudo apt-get install libcupti-dev`

### Step 6: Download Python and then tensorflow gpu

[Install Anaconda](https://www.anaconda.com/download/#linux): Because anaconda support lots of library for Python programming 

```
wget https://repo.continuum.io/archive/Anaconda2-5.1.0-Linux-x86_64.sh
bash Anaconda2-5.1.0-Linux-x86_64.sh
pip3 install tensorflow-gpu  # for Python 3.n   
```

Open terminal, type: 
```
cd ~
nano ~/.bashrc 
```

And add a line below file above:
```
# Add by anaconda2 5.1.0 installer 
export PATH="/home/swapnil/anaconda2/bin:$PATH"
```

In terminal,  type: `source ~/.bashrc`

+ Check anaconda2 have you installed yet?
  + Type: `python`

  + If you successful installation, you will see result:

![Check anaconda2 have you installed yet?](https://lh3.googleusercontent.com/vnb2xc52lb3oDBHegOAREBSzJJZdlVgpwG7fLOPZ_DIDk2F7CvSnyyyKyggR9w3Tb_paElty9PLZST2jZK2lot0AfSbRC5UcEvbek4dyYk1aZkqGWYGPoSnFVJ4R426IWkp2QkMyfZcR9BM319_hoHwMJS-ZI4ndO7MLSsZhzByHwOodYD7GaMIke-IDwfPF1RvW2RfsWuB1bL0BY8XNMFlJ6RNm4_anfTJTjYc-Nwq1lptUlXM8wqlqNO91FSA5MEVVSJwrbDzPSEf8D3ozJJfducGVOscEYQuCs7lHuvMUbSU6nEW_DQHXlt1WUaibeCw0WdqNyu-E0XNUl_NCyAnaU7fCMx60m3HBt9BAAllrjtOB-xLyFvQp_T9uLvd7Ww9sxVRBB9O6firp8xGtRa7nrXp4bJCXyIWUYvXUKYY9vD8kvVfl5qQIU1Ro5WDDDQGO2Ld64fz2ptSEGPAgMzZhZJJHng71upY8tj4yOaS9cZ4h2-QaVuUhylSVZFzqHJOsK1LljBcxiBqNZ-pvIRBCSaG7pyGA9Ruuy8q4_YrbNHOIMwF7MNB2J5xFqHGi39sCzGeTsOjkx18GnB1kBJsoV0RkPUlmxeMolV54kL1PoI5L45dHQLC8YkRTHmR64c1ACtOnG8MnLZ-mI6pvi3opLWGN4eUD=w488-h94-no)

+ Check tensorflow-gpu have you installed yet?
  + You type: `pip list`
  + If you successful installation, you will see result:
  
  ![Check tensorflow-gpu have you installed yet?](https://lh3.googleusercontent.com/Ea1AiHeSzFG5yz2km5NKCawfEZvILGU27u48dIvgcNLDW7ao92qV5uF-0X_mssWgJDIv_5KBNMLCQ_zqazb870SP2uLp2PU2Im2cmc0tOQ9beIeoYwYaXt0BwFZE5izX5OJBSaCxuXIfhhSpvC20wOk7KNtUJK0J66_6JnqQC1Hcdr55WLB6PA9JcEe0yUHpVu2OjWJC2BoZLwTDSc52DYZRJMJMI8nV9e95WXCW4C0pNSG9-PNQVJ6G3NlE9XZBYh0iAyA6OhcmueIndon0UVTUFG8ul7XY1_Stup6ChT-VZ3bxKxXOAs8TBGuKN607Vo8J7U7aOrxMfdDDNpn1RpeEr96yCetbOMqs5AkRaP4_un-nXYSjss58bStGbXhv4xPHhHgFk7zV6-geOAFa_Tu51tVOtkYdRDfIIoSag_hl1hOIJAtV9KwgHB4b8UY0lJjqxx39OflLsBmv0OJ79k2_ZpIioNyAnXVlCmDiP0WG_8jhSlcT4XkzN-6f3ppt0-5WisnKvR7U_DfpJpfTcnA7qgMvBCaEorgzQONOXV1-xqByZrueZuvUhaohL4pI1R-OENDNc1k6JkB4cGw5VPi-8Q6lmweYrB6j-G2j6lgTbI0Frj5R-NoTbRcI4X09YRycrR1ClkII8nKKctdAZAskEr9GoLZd=w201-h598-no)

### Step 7: Check gpu has been step properly or not. 

`cd Downloads`

Download this git repo [https://github.com/tensorflow/models](https://github.com/tensorflow/models) and unzip it. 

Use one of statements: 

`python models-master/tutorials/image/imagenet/classify_image.py`

Or 

`python models-master/tutorials/image/cifar10/cifar10_train.py`

![Check gpu has been step properly or not](https://lh3.googleusercontent.com/WHH73b2IlutcizIour7zVvubtJ1kL9-EzIhF4JYhpCWjNXx1bWN99Urhq9ooLTIWjfJPMUwxcYgly07AnPVPdsT_QZmzFYv7MU4OQtlJEXI3tiAaU9oDzcLUY4puYu05reN9sT_8-u9Ng5ALtOsWmP9tNokZkLlPqX6vg_LkLHSrSfa94o5KcW_ed5jSzeRtfOSKDQGZ_6LZ2BTKTSqabC4AVCse5yCWJjipo0xpayWnPSjqa1YOnrkexp_b1lIJXimwkP9aRxoRyjhpSyUtjCVhTkvX4BtwmN_Ds72phRx5sOzK6nNDNtW9j7XdJbKhCsQnjPElnl5lgXGA91CABVqxom-qdfXoRueCeJY28RwYGxiODil3jK_QExrL5ytAN0hfgSaUd-RgRZL-DwWePQNSnksQuNa9GFq-AhlkixxrLL83H630MQdTDGiLRSxmL_bdl9NmDUB47N0oElDlCjwJodqSfRcImwWQFVyj4NH3ewE_MWSZYCiO3sIk4MtGkyrGhLt7y6l_deOGEqY6tuCXM4sSogNCqsoqYzpSxhGugzz3YVAW2zaQG-laqobk1cs_kUEAaIK-M-h8psfNdb0HJgrqSc_lSbQ7bSJ5DdesSmN8hlt8rXhonGKA-IgyyVHhFVHqNwODlqVBFacKPTtnVetNIjKo=w624-h647-no)

Step 8: Demo

Open terminal:
```
python
import tensorflow as tf
hello = tf.constant('Hello Tensorflow')
sess = tf.Session()
print(sess.run(hello))
```