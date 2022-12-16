# Build-Yolo-model-on-Jetson-TX2

Step by step in building Yolo model on Jetson TX2
You have to prepare your host computer, it includes Ubuntu OS (18.4 or 16.04). I am not sure about v18.04, I used v16.04. One more thing, You can run on a real machine, you also install Ubuntu dual your Window or something like that. I ran Ubuntu OS on VM (Remember to set up your network on your VM, choose "Bridge: Connected directly to the physical network"), It's quite important in installing process.
## Download your Jetpack
**Note**: Jetpack have to be compatible to your target device. I use the latest version Jetpack 3.3 on JTX2.
You can use this link to download the latest version of [Jetpack] (https://developer.nvidia.com/embedded/downloads).
## Prepare components
- After download, open terminal in Downloads folder run command `chmod +x JetPack-${VERSION}.run` to add execute permission for the JetPack-${VERSION}.run.
- Choose the installation directory on your system and select the **development environment** to setup.
- The JetPack installer will pop up a window to ask for permission to use during the installation process; you will need to enter your sudo password here.
- The Component Manager opens, which allows you to customize which components to install. Select the Jetson Developer Kit you would like to develop for to customize the installation components for each device (recommend for all).
- Accept the license agreement for the selected component.
- If you selected Flash OS in the Component Manager, you will need to select the network layout for your specific environment (You can choose the other but you have to connect follow the graph and choose a suitable interface).
- A pop-up window will instruct you to put your device into Force USB Recovery Mode, so you can flash the OS.
## Connect your hardware
- Connect Internet to your host computer and your Jetson also.
- Connect the Micro-B to USB cable from the Jetson to your computer.
- Press the POWER butto. The Jetson powers up like normal. Press and hold the FORCE RECOVERY button, and while holding the FORCE RECOVERY button, press the RESET button. After two more seconds, release the FORCE RECOVERY button.
- Make sure that your virtual machine detects the `NVIDIA Corp` USB device by a command `lsusb`.

__(Or go to the VM tab at the top of the virtual machine, go to Removable Devices, choose USB and select NVIDIA Corp. APX)__
- Press Enter in the waiting pop-up window, wait ...

## Install Kernel and Modules
- Download buildJetsonTX2Kernel on github.
>`$ git clone https://github.com/jetsonhacks/buildJetsonTX2Kernel.git`

>`$ cd buildJetsonTX2Kernel`

![Install Kernel 1](https://images.viblo.asia/9bb7b2c3-c844-4fae-b3b7-9dabb85db27d.png)![Đang tải lên ker2.png…]()

- There are three main scripts. The first script, getKernelSources.sh gets the kernel sources from the NVIDIA developer website, then unpacks the sources into /usr/src/kernel.

>`$ ./getKernelSources.sh`

- After the sources are installed, the script opens an editor on the kernel configuration file.

**Note**: The local version needs to be set to match the release that you are building. For example, if you are building modules for a stock kernel, then the local versions should be -tegra which makes the kernel release name 4.4.38-tegra. If you are building a custom kernel, then you should add your own local version. In the video above, we used -jetsonbotv0.1 which results in 4.4.38-jetsobotv0.1.

- You can add or edit elements on kernel configuration window.

![Install Kernel 2](https://images.viblo.asia/263699bb-2c79-4a2e-a542-b6eeffefe53d.png)

## Install OpenCV

- Back to terminal, download packet and install it:

>`$ git clone https://github.com/jetsonhacks/buildOpenCVTX2.git`

>`$ ./buildOpenCV.sh`

![Download OpenCV](https://images.viblo.asia/796df451-4fec-4860-9be4-5dc80e12af73.png)

**Note**: It took me about an hour to finish this process. 

- Checking modules after installation (These commands will install a gui to show modules):

>`$ cd /opencv/build`

>`$ apt search ccmake`

>`$ sudo apt-get install cmake-curses-gui`

>`$ ccmake ..`

- Testing `cannyDetection.py` in `buildOpenCVTX2/Examples` , get result:

![Run example](https://images.viblo.asia/e2da9663-bdbc-4a30-94dd-468b47c93a9d.png)

## Build YOLO Application

- Downlaod and install `darknet` framework.

>`$ git clone https://github.com/pjreddie/darknet yolov3`

- Access the folder and config 'Makefile'. We need to change some parameters to be suitable in this system.

![Config Makefile](https://images.viblo.asia/0d3bcf7b-61cf-40ef-99ca-325e8b152191.png)


- Run in max-lock mode with:

>`$ sudo nvpmodel -m 0`

>`$ make`

- You can also config in `yolov3.cfg` in `yolov3/cfg` directory. Remember to run `make` after changing anything in config file.

## Run Application

- Run application: Detect objects in video.

>`$ ./darknet detector demo cfg/coco.data cfg/yolov3.cfg yolov3.weights traffic.mp4`

- Run application: In streaming video.

>`$ ./darknet detector demo cfg/coco.data cfg/yolov3.cfg yolov3.weights -c 1`

![Video-result](https://images.viblo.asia/c385f749-d2b8-4e0f-b492-b2dbb679dc88.png)

![Camera-result](https://images.viblo.asia/04c0a051-3396-421a-8cdd-98d8ea989840.png)

# ![Camera-result](https://images.viblo.asia/13a0e93a-b986-4475-91f7-780feb0722d6.png)

## Finish

**HAPPY HACKING**

## References
https://docs.nvidia.com/jetson/archives/jetpack-archived/jetpack-411/index.html#jetpack/4.1.1/release_notes.htm%3FTocPath%3D_____2

http://www.slothparadise.com/setup-cuda-7-0-nvidia-jetson-tx1-jetpack-detailed/