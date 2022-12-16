Một trong những điều ức chế của khi làm mấy việc dạng sysadmin trong windows là `ssh`, đặc biệt khi bạn dùng laptop chạy windows, và manage một đống server chạy linux. 
May thay, từ Win 10, đội của anh Bill đã về-với-chính-đạo khi [hỗ trợ OpenSSH](https://quantrimang.com/cach-cai-dat-openssh-tren-windows-10-145183) 
Trong bài này, sẽ tóm tắt lại lịch sử vụ ssh-from-windows-with-luv này của mình. 
1. Cài OpenSSH vào windows, chi tiết [tham khảo link trên](https://quantrimang.com/cach-cai-dat-openssh-tren-windows-10-145183), tóm tắt như sau: 
    1. Download OpenSSH từ [github Powershell/Win32-OpenSSH/releases](https://github.com/PowerShell/Win32-OpenSSH/releases)
    chỗ này có điểm 2 củ chuối, 1 là code của openssh-for-windows thì nằm trong https://github.com/PowerShell/openssh-portable, nhưng release và issue của nó thì nằm đây, 
    2 là trong trang [docs của Microsoft ](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)có 1 đoạn hơi bị nguy hiểm, bảo là nếu không cài bằng powershell theo [hướng dẫn chuẩn](1) thì phải làm theo hướng dẫn trong cái github kia, chả hiểu các bạn Microsoft nghĩ gì :joy:
    2. Chạy cái file powershell để install vào: `powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1`
2. Bật `cmd` lên, `ssh -i user@ip` như một vị thần


[1] https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse