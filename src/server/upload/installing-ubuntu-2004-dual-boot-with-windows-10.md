## Prerequisites

### System requirements:
1. 2 GHz dual core processor
2. 4 GiB RAM (system memory)
3. 25 GB of hard-drive space (or USB stick, memory card or external drive but see LiveCD for an alternative approach)
4. VGA capable of 1024x768 screen resolution
5. Either a CD/DVD drive or a USB port for the installer media
6. Internet access is helpful

### Other requirements:
* Because of installing Ubuntu dual boot with Windows 10 UEFI/GPT, you have to have Windows 10 UEFI installed on your computer and your hard drive should be GPT format. How to check if [your Windows is UEFI](https://www.addictivetips.com/windows-tips/check-uefi-or-bios-legacy-firmware-on-windows-10/) and [your drive is GPT](https://www.howtogeek.com/245610/how-to-check-if-a-disk-uses-gpt-or-mbr-and-how-to-convert-between-the-two/)
* A 4GB or larger USB stick/flash drive (remember to backup your data because we will format the USB stick/flash drive)
* 

## Installing Instruction
### Download Ubuntu
You need to access Ubuntu home page to download the latest version. In this post, I will use [Ubuntu 18.04 LTS](https://releases.ubuntu.com/18.04.5/)

![](https://images.viblo.asia/604225f4-1a28-4327-b5ff-7eb51c086601.jpg)

Choose **Not now, take me to the download** to download Ubuntu

![](https://images.viblo.asia/19cc1dbc-7083-479b-89e7-fb44f3e7b169.jpg)

### Create the partition to install Ubuntu on
When waiting for downloading, let's partition your disk:
* Right click on **This PC => choose Manage**

![](https://images.viblo.asia/f2d00e71-e05e-498a-aea8-94a842460621.jpg)

Choose **Disk Management** => right click on the partition that has the most free space (I choose **D:** drive) => choose **Shrink Volume**

![](https://images.viblo.asia/660dff56-a9af-4de2-84b7-047ef5c9af55.jpg)

Enter the size of the partition you want to install Ubuntu on, I recommend the size should be 30GB minimum. Here I will get 50GB (50 * 1024MB = 51200MB). You can enter as much as the free space that your drive has. => Choose **Shrink** and wait for some minutes

![](https://images.viblo.asia/8b2020a5-5530-4eab-9131-c7f35cf18864.jpg)

Here is the partition to install Ubuntu on:

![](https://images.viblo.asia/49202cd3-3f95-49bd-b5e4-c5c571427216.jpg)

### Create bootable USB flash drive
Next, you need to create a **Bootable USB flash drive**, I will use [Rufus 2.18](https://rufus.ie/) create one. Download Rufus and follow the steps in the screenshot:

![](https://images.viblo.asia/1f041bca-7fb9-4fb5-9d82-763605052ce2.jpg)

I will explain the steps:
1. Choose the USB stick/flash drive to create Bootable
2. Choose GPT partition scheme for UEFI because you are installing Ubuntu dual boot with Windows UEFI/GPT
3. Leave this part as default
4. Choose the .iso file you have downloaded previously

Choose **Start** to create the bootable USB. Click **OK** on any pop-up screens. And here is the result:

![](https://images.viblo.asia/a0645e43-7e1a-4f32-abc6-86e5d9871e4c.jpg)

### Turn off fast startup
Open **Control Panel => Power Options=> Choose what the power buttons do** and do as screenshot shown to disable **fast startup on Windows 10** (if it is turned on)

![](https://images.viblo.asia/3c28d26f-b93f-44cb-802a-37117059cb25.jpg)

### Installing Ubuntu
1. After all the previous steps are done, restart your computer. You should research to find out the hotkey to open Boot Order/ Boot Menu (It is different among computer manufacturers)

2. Choose boot from your USB. If there are 2 USB appeared, choose the one with **UEFI (or EFI)** prefix. In my case, I get only one

![](https://images.viblo.asia/5642c2d7-28e6-4329-8645-46f39d91bb28.jpg)

3. Choose **Install Ubuntu** to start the installation

![](https://images.viblo.asia/c3783070-4dd7-4ca2-89e2-ac373d477638.jpg)

4. Choose your language. Here I choose English

![](https://images.viblo.asia/5dc8790c-a45b-4039-8646-28451faed944.jpg)

5. Connect to the Wifi (you can choose none) and click **Continue**

![](https://images.viblo.asia/ec7aec69-aee4-4f72-8e06-4cbd1b4f3f45.jpg)

6. Unselect all to install faster or choose **Install third-party software** to install additional software

![](https://images.viblo.asia/bd5d5f5d-f82f-4c65-a5d2-65058ede0bb6.jpg)

7. This is an important step, you have these following choices:
* **Install Ubuntu alongside Windows Boot Manager**: to install dual boot with Windows 10 but it will affect the partition where Windows is installed on
* **Erase disk and install Ubuntu**: This option will erase every data on disk (inlcuding Windows) and install Ubuntu
* **Something else**: I will choose this option to dual boot Ubuntu and Windows on the partition created previously

![](https://images.viblo.asia/f8f0151a-cae7-465c-a8d2-53ae24ff5e57.jpg)

7. This is the most important step in this tutorial, so be careful 
> *Don't blink, or you'll miss me* ;)

I will create 3 partition for Ubuntu: **root**, **swap** and **home**

Looking for the partition you have created, it will be named **Free space**, its size is nearly the same as you provided (The size calculation of Windows and Ubuntu are different, don't worry about that)

Choose **Free space** partition and click **+** sign

![](https://images.viblo.asia/a52bc53f-b5a1-439a-8e66-40552e3bfb18.jpg)

In the opened dialog, enter the size for root partition (should be 15-20GB). Here I get 20GB. Setting as below  and choose **OK** to create.

![](https://images.viblo.asia/b5459c26-0b81-412b-8c30-c10e923db812.jpg)

Next is the **swap** partition, choose **Free space** and click **+** sign. This is the space when your RAM is not enough, Ubuntu will use it as virtual RAM. This partition should be **x2 RAM** in size. I got 4GB RAM so my **swap** will be **4 * 1024MB = 8192MB**. Configure as below and choose **OK**.

![](https://images.viblo.asia/6d23b0a9-6c00-4cdb-ac9c-ed0f0266ec1b.jpg)

One more thing, **home** partition is used to store your data. You can config **home** as same as **root** except size of this partition is the remaining size you have created:
* **Type for the new partition**: choose Primary
* **Location for the new partition**: choose Beginning of this space
* **Use as**: choose **Ext4 jouraling file system**.
* **Mount point**: **/home**
*  => click **OK**

Last but not least, in **Device for boot loader installation**, choose **Windows Boot Manager**

![](https://images.viblo.asia/8e1fa212-6f84-4424-90e0-26c1c14fe118.jpg)

Click **Install now**. One dialog will pop-up, just click **OK**.

8. Choose your timezone and **Continue**

![](https://images.viblo.asia/50cc490a-c8df-4b41-b3b5-32cfa3be8654.jpg)

9. Choose your keyboard

![](https://images.viblo.asia/835977da-88d7-4469-9ab8-07b9bb422458.jpg)

10. Create an account to login into Ubuntu

![](https://images.viblo.asia/d12f34a3-6456-4603-8854-85858ab58aef.jpg)

11. Now, just wait for the installation finished and restart

<img src="https://images.viblo.asia/c2f92c17-5056-4dff-8ef6-81063573c877.jpg" width="70px" height="50px"/> <img src="https://images.viblo.asia/517b1a4f-a410-4477-b990-fbfec84fc4f7.jpg" width="70px" height="50px"/> <img src="https://images.viblo.asia/2157090e-616f-45b1-93ac-9158ff28670a.jpg" width="70px" height="50px"/>

Nếu máy tính khởi động lại không có màn hình Grub chọn Ubuntu mà vào thẳng Windows bạn có thể vào chỉnh BIOS/UEFI. Tại phần thứ tự boot bạn hãy đưa Ubuntu lên đầu tiên.

Giao diện BIOS/UEFI của các hãng có thể khác nhau, nói chung bạn hãy tìm các phần liên quan đến Boot. Ví dụ như giao diện của mình:

If your computer restart and you get Windows welcome screen instead of Grub screen to access Ubuntu, you can configure it in BIOS/UEFI. In Boot order, move Ubuntu to first order.

BIOS/UEFI interface is different among PC manufacturers so you should search for yours. For example, my BIOS interface shows like this:

![](https://images.viblo.asia/03ed032d-b2f2-4935-bf74-c946c66f6f05.jpg)

## Conclusion
By this guideline, hope you guys can install Ubuntu by yourself. GLHF