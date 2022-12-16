### 1. Hiển thị thông tin hệ thống
Để hiển thị chỉ tên của hệ thống, bạn có thể sử dụng lệnh `uname` và không có bất cứ options nào đằng sau:
```bash
$ uname

Linux
```

Để hiển thị network hostname, sử dụng option `-n`:
```bash
$ uname -n

vuonghung-pc
```

Để hiển thị thông tin về kernel-version, sử dụng option `-v`:
```bash
$ uname -v

#12-Ubuntu SMP Tue Oct 23 19:22:37 UTC 2018
```

Để hiển thị thông tin về kernel release, sử dụng option `-r`:

```bash
$ uname -r

4.18.0-11-generic
```

Để hiển thị thông tin về machine hardware, sử dụng option `-m`:

```bash
$ uname -m

x86_64
```

Để hiển thị tất cả thông tin liên quan đến hệ thống, có thể sử dụng option `-a`:

```bash
$ uname -a

Linux vuonghung-pc 4.18.0-11-generic #12-Ubuntu SMP Tue Oct 23 19:22:37 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
```

### 2. Hiển thị thông tin của phần cứng hệ thống
Bạn có thể sử dụng công cụ `lshw` để thu thập thông tin về các thành phần phần cứng như `cpu`, `ổ đĩa cứng`, `usb controllers`,....

Những thông tin được cung cấp bởi `lshw` được thu thập từ những tệp tin `/proc` khác nhau.

Để hiển thị các thông tin đó, bạn sử dụng câu lệnh `lshw` với `sudo`:
```bash
$ sudo lshw

vuonghung-pc             
    description: Notebook
    product: K53SD
    vendor: ASUSTeK Computer Inc.
    version: 1.0
    serial: C3N0AS38536711B
    width: 64 bits
    capabilities: smbios-2.6 dmi-2.6 smp vsyscall32
    configuration: boot=normal chassis=notebook family=K uuid=007FCB47-5972-E181-2D2D-C860004116BC
  *-core
       description: Motherboard
       product: K53SD
       vendor: ASUSTeK Computer Inc.
       physical id: 0
       version: 1.0
       serial: BSN12345678901234567
       slot: MIDDLE
     *-firmware
          description: BIOS
          vendor: American Megatrends Inc.
          physical id: 0
          version: K53SD.204
          date: 01/17/2012
          size: 64KiB
          capacity: 2496KiB
          capabilities: pci upgrade shadowing cdboot bootselect edd int13floppy1200 int13floppy720 int13floppy2880 int5printscreen int9keyboard int14serial int17printer acpi usb smartbattery biosbootspecification
.....
```

Dấu `...` ở trên là còn rất nhiều thông tin được hiển thị một cách chi tiết. Để hiển thị tổng hợp các thông tin ở trên một cách ngắn gọn, bạn có thể sử dụng thêm option `-short`:
```bash
$ sudo lshw -short

H/W path        Device           Class          Description
===========================================================
                                 system         K53SD
/0                               bus            K53SD
/0/0                             memory         64KiB BIOS
/0/4                             processor      Intel(R) Core(TM) i5-2450M CPU @
/0/4/5                           memory         32KiB L1 cache
/0/4/6                           memory         256KiB L2 cache
/0/4/7                           memory         3MiB L3 cache
/0/40                            memory         8GiB System Memory
.....
```

Nếu muốn hiển thị các thông tin đó ở trên trang html, bạn có thể sử dụng thêm option `-html`:
```bash
$ sudo lshw -html > ~/Desktop/lshw.html
```

![](https://images.viblo.asia/f89270c6-7630-431f-889e-6ce211eef6d9.png)

### 3. Hiển thị thông tin CPU
Sử dụng câu lệnh `lscpu` để hiện thị thông tin về kiến trúc CPU của bạn, ví dụ như số lượng CPU, số cores, CPU family modal, CPU caches, threads,... 

```bash
$ lscpu

Architecture:        x86_64
CPU op-mode(s):      32-bit, 64-bit
Byte Order:          Little Endian
CPU(s):              4
On-line CPU(s) list: 0-3
Thread(s) per core:  2
Core(s) per socket:  2
Socket(s):           1
NUMA node(s):        1
Vendor ID:           GenuineIntel
CPU family:          6
Model:               42
Model name:          Intel(R) Core(TM) i5-2450M CPU @ 2.50GHz
Stepping:            7
CPU MHz:             1808.661
CPU max MHz:         3100,0000
CPU min MHz:         800,0000
BogoMIPS:            4988.74
Virtualization:      VT-x
L1d cache:           32K
L1i cache:           32K
L2 cache:            256K
L3 cache:            3072K
NUMA node0 CPU(s):   0-3
```

### 4. Hiển thị thông tin về các Block Device
Các block devices là các thiết bị lưu trữ như ổ cứng, ổ đĩa flash,... `lsblk` được sử dụng để hiển thị thông tin về các block devices như sau:
```bash
$ lsblk 

sda      8:0    0 232,9G  0 disk 
├─sda1   8:1    0   549M  0 part 
├─sda2   8:2    0 116,7G  0 part 
├─sda3   8:3    0     1K  0 part 
├─sda4   8:4    0 108,1G  0 part /
└─sda5   8:5    0   7,6G  0 part [SWAP]
sdb      8:16   0 465,8G  0 disk 
├─sdb1   8:17   0  39,1G  0 part 
├─sdb2   8:18   0     1K  0 part 
├─sdb5   8:21   0 256,1G  0 part 
├─sdb6   8:22   0    20G  0 part /ubuntu-storage
└─sdb7   8:23   0 150,5G  0 part
.....
```

### 5. Hiển thị thông tin USB Controllers
Câu lệnh `lsusb` được sử dụng để hiển thị thông tin về các USB controllers và tất cả các thiết bị kết nối tới chúng:
```bash
$ lsusb

Bus 002 Device 003: ID 056e:0107 Elecom Co., Ltd 
Bus 002 Device 004: ID 1038:1702 SteelSeries ApS 
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 004: ID 058f:a014 Alcor Micro Corp. Asus Integrated Webcam
Bus 001 Device 007: ID 0cf3:3005 Atheros Communications, Inc. AR3011 Bluetooth
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

```

Bạn có thể sử dụng option `-v` để hiển thị thông tin chi tiết về từng thiết bị USB

### 6. Hiển thị thông tin các thiết bị PCI
Các thiết bị PCI bao gồm các cổng USB, card đồ họa, network adapters,... `lspci` được sử dụng để hiển thị các thông tin liên quan đến tất cả PCI controllers trong hệ thống của bạn, cộng với các thiết bị được kết nối tới chúng.

```bash
$ lspci

00:00.0 Host bridge: Intel Corporation 2nd Generation Core Processor Family DRAM Controller (rev 09)
00:01.0 PCI bridge: Intel Corporation Xeon E3-1200/2nd Generation Core Processor Family PCI Express Root Port (rev 09)
00:02.0 VGA compatible controller: Intel Corporation 2nd Generation Core Processor Family Integrated Graphics Controller (rev 09)
00:16.0 Communication controller: Intel Corporation 6 Series/C200 Series Chipset Family MEI Controller #1 (rev 04)
00:1a.0 USB controller: Intel Corporation 6 Series/C200 Series Chipset Family USB Enhanced Host Controller #2 (rev 05)
00:1b.0 Audio device: Intel Corporation 6 Series/C200 Series Chipset Family High Definition Audio Controller (rev 05)
00:1c.0 PCI bridge: Intel Corporation 6 Series/C200 Series Chipset Family PCI Express Root Port 1 (rev b5)
00:1c.1 PCI bridge: Intel Corporation 6 Series/C200 Series Chipset Family PCI Express Root Port 2 (rev b5)
00:1c.3 PCI bridge: Intel Corporation 6 Series/C200 Series Chipset Family PCI Express Root Port 4 (rev b5)
00:1c.5 PCI bridge: Intel Corporation 6 Series/C200 Series Chipset Family PCI Express Root Port 6 (rev b5)
00:1d.0 USB controller: Intel Corporation 6 Series/C200 Series Chipset Family USB Enhanced Host Controller #1 (rev 05)
00:1f.0 ISA bridge: Intel Corporation HM65 Express Chipset LPC Controller (rev 05)
00:1f.2 SATA controller: Intel Corporation 6 Series/C200 Series Chipset Family 6 port Mobile SATA AHCI Controller (rev 05)
00:1f.3 SMBus: Intel Corporation 6 Series/C200 Series Chipset Family SMBus Controller (rev 05)
01:00.0 VGA compatible controller: NVIDIA Corporation GF119M [GeForce 610M] (rev a1)
03:00.0 Network controller: Qualcomm Atheros AR9285 Wireless Network Adapter (PCI-Express) (rev 01)
04:00.0 USB controller: ASMedia Technology Inc. ASM1042 SuperSpeed USB Host Controller
05:00.0 Ethernet controller: Qualcomm Atheros AR8151 v2.0 Gigabit Ethernet (rev c0)
```

Sử dụng option `-t` để hiển thị kết quả đầu ra dưới định dạng cây:

```bash
$ lspci -t

-[0000:00]-+-00.0
           +-01.0-[01]----00.0
           +-02.0
           +-16.0
           +-1a.0
           +-1b.0
           +-1c.0-[02]--
           +-1c.1-[03]----00.0
           +-1c.3-[04]----00.0
           +-1c.5-[05]----00.0
           +-1d.0
           +-1f.0
           +-1f.2
           \-1f.3
```

Sử dụng option `-v` để hiển thị thông tin chi tiết về mỗi thiết bị được kết nối:

```bash
$ lspci -v

 Controller (rev 09)
	Subsystem: ASUSTeK Computer Inc. 2nd Generation Core Processor Family DRAM Controller
	Flags: bus master, fast devsel, latency 0
	Capabilities: <access denied>

00:01.0 PCI bridge: Intel Corporation Xeon E3-1200/2nd Generation Core Processor Family PCI Express Root Port (rev 09) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 24
	Bus: primary=00, secondary=01, subordinate=01, sec-latency=0
	I/O behind bridge: 0000d000-0000dfff
	Memory behind bridge: db000000-dc0fffff
	Prefetchable memory behind bridge: 00000000c0000000-00000000c9ffffff
	Capabilities: <access denied>
	Kernel driver in use: pcieport
.....
```

### 7. Hiển thị thông tin về các file hệ thống
Để thu thập thông tin về các file phân vùng hệ thống, bạn có thể sử dụng lệnh `fdisk`. Nhớ rằng, hãy chạy câu lệnh này với `sudo`, nếu không bạn có thể sẽ không thấy bất cứ thông tin nào cả.

```bash
$ sudo fdisk -l

Disk /dev/sda: 232,9 GiB, 250059350016 bytes, 488397168 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x55c756d3

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1  *         2048   1126399   1124352   549M  7 HPFS/NTFS/exFAT
/dev/sda2         1126400 245759999 244633600 116,7G  7 HPFS/NTFS/exFAT
/dev/sda3       245762046 261761023  15998978   7,6G  5 Extended
/dev/sda4       261761024 488396799 226635776 108,1G 83 Linux
/dev/sda5       245762048 261761023  15998976   7,6G 82 Linux swap / Solaris
.....
```

### 8. Hiển thị thông tin về các thành phần phần cứng
Bạn có thể sử dụng `dmidecode` để trích xuất thông tin về phần cứng bằng cách đọc dữ liệu từ các bảng DMI.

Hiển thị thông tin về memory:

```bash
$ sudo dmidecode -t memory

# dmidecode 3.1
Getting SMBIOS data from sysfs.
SMBIOS 2.6 present.

Handle 0x0040, DMI type 16, 15 bytes
Physical Memory Array
	Location: System Board Or Motherboard
	Use: System Memory
	Error Correction Type: None
	Maximum Capacity: 32 GB
	Error Information Handle: Not Provided
	Number Of Devices: 4
......
```

Hiển thị thông tin về hệ thống:

```bash
$ sudo dmidecode -t system

# dmidecode 3.1
Getting SMBIOS data from sysfs.
SMBIOS 2.6 present.

Handle 0x003F, DMI type 12, 5 bytes
System Configuration Options
	Option 1: DSN:3SLYXNK0373455 H                
	Option 2: DSN:CB611400068C                    
	Option 3: DSN:C860004116BC                    
	Option 4: SMI:00B2CA

Handle 0x0047, DMI type 32, 20 bytes
System Boot Information
	Status: No errors detected

Handle 0x0001, DMI type 1, 27 bytes
System Information
	Manufacturer: ASUSTeK Computer Inc.
	Product Name: K53SD
	Version: 1.0       
	Serial Number: C3N0AS38536711B     
	UUID: 47CB7F00-7259-81E1-2D2D-C860004116BC
	Wake-up Type: Power Switch
	SKU Number:                       
	Family: K
```

Hiển thị thông tin về BIOS:

```bash
$ sudo dmidecode -t bios

# dmidecode 3.1
Getting SMBIOS data from sysfs.
SMBIOS 2.6 present.

Handle 0x0000, DMI type 0, 24 bytes
BIOS Information
	Vendor: American Megatrends Inc.
	Version: K53SD.204
	Release Date: 01/17/2012
	Address: 0xF0000
	Runtime Size: 64 kB
	ROM Size: 2560 kB
	Characteristics:
		PCI is supported
		BIOS is upgradeable
		BIOS shadowing is allowed
		Boot from CD is supported
		Selectable boot is supported
		EDD is supported
		5.25"/1.2 MB floppy services are supported (int 13h)
		3.5"/720 kB floppy services are supported (int 13h)
		3.5"/2.88 MB floppy services are supported (int 13h)
		Print screen service is supported (int 5h)
		8042 keyboard services are supported (int 9h)
		Serial services are supported (int 14h)
		Printer services are supported (int 17h)
		ACPI is supported
		USB legacy is supported
		Smart battery is supported
		BIOS boot specification is supported
		Targeted content distribution is supported
	BIOS Revision: 4.6

Handle 0x004D, DMI type 13, 22 bytes
BIOS Language Information
	Language Description Format: Abbreviated
	Installable Languages: 1
		eng
	Currently Installed Language: eng
```

Hiển thị thông tin về vi xử lý:

```bash
$ sudo dmidecode -t processor

# dmidecode 3.1
Getting SMBIOS data from sysfs.
SMBIOS 2.6 present.

Handle 0x0004, DMI type 4, 42 bytes
Processor Information
	Socket Designation: CPU 1
	Type: Central Processor
	Family: Core 2 Duo
	Manufacturer: Intel            
	ID: A7 06 02 00 FF FB EB BF
	Signature: Type 0, Family 6, Model 42, Stepping 7
	Flags:
		FPU (Floating-point unit on-chip)
		VME (Virtual mode extension)
		DE (Debugging extension)
		PSE (Page size extension)
		TSC (Time stamp counter)
		MSR (Model specific registers)
		PAE (Physical address extension)
		MCE (Machine check exception)
		CX8 (CMPXCHG8 instruction supported)
		APIC (On-chip APIC hardware supported)
		SEP (Fast system call)
		MTRR (Memory type range registers)
		PGE (Page global enable)
		MCA (Machine check architecture)
		CMOV (Conditional move instruction supported)
		PAT (Page attribute table)
		PSE-36 (36-bit page size extension)
		CLFSH (CLFLUSH instruction supported)
		DS (Debug store)
		ACPI (ACPI supported)
		MMX (MMX technology supported)
		FXSR (FXSAVE and FXSTOR instructions supported)
		SSE (Streaming SIMD extensions)
		SSE2 (Streaming SIMD extensions 2)
		SS (Self-snoop)
		HTT (Multi-threading)
		TM (Thermal monitor supported)
		PBE (Pending break enabled)
	Version: Intel(R) Core(TM) i5-2450M CPU @ 2.50GHz       
	Voltage: 0.0 V
	External Clock: 100 MHz
	Max Speed: 4000 MHz
	Current Speed: 2500 MHz
	Status: Populated, Enabled
	Upgrade: Other
	L1 Cache Handle: 0x0005
	L2 Cache Handle: 0x0006
	L3 Cache Handle: 0x0007
	Serial Number: To Be Filled By O.E.M.
	Asset Tag: To Be Filled By O.E.M.
	Part Number: To Be Filled By O.E.M.
	Core Count: 2
	Core Enabled: 1
	Thread Count: 2
	Characteristics:
		64-bit capable
```

### Tài liệu tham khảo
1. https://www.tecmint.com/commands-to-collect-system-and-hardware-information-in-linux/