### Write A Simple DNS Server With Golang
The following DNS knows how to answer A queries and it only knows IP address of domain.
First we need to get the package:
```
go get github.com/miekg/dns
```
Then we have this code:
```
package main

import (
	"fmt"
	"log"
	"strconv"

	"github.com/miekg/dns"
)

var records = map[string]string{
	"nguyenxuanquang.service": "192.168.1.15",
}

func parseQuery(m *dns.Msg) {
	for _, q := range m.Question {
		switch q.Qtype {
		case dns.TypeA:
			log.Printf("Query for %s\n", q.Name)
			ip := records[q.Name]
			if ip != "" {
				rr, err := dns.NewRR(fmt.Sprintf("%s A %s", q.Name, ip))
				if err == nil {
					m.Answer = append(m.Answer, rr)
				}
			}
		}
	}
}
func handleDnsRequest(w dns.ResponseWriter, r *dns.Msg) {
	m := new(dns.Msg)
	m.SetReply(r)
	m.Compress = false
	switch r.Opcode {
	case dns.OpcodeQuery:
		parseQuery(m)
	}

	w.WriteMsg(m)
}

func main() {
	dns.HandleFunc("service.", handleDnsRequest)

	//start server
	port := 8080
	server := &dns.Server{
		Addr: ":" + strconv.Itoa(port), Net: "udp",
	}
	log.Printf("Starting at %d\n", port)
	err := server.ListenAndServe()
	defer server.Shutdown()
	if err != nil {
		log.Fatalf("Failed to start server: %s\n", err.Error())
	}
}
```
Use dig(linux) to query the server. If you are the windows user, use this https://help.dyn.com/how-to-use-binds-dig-tool/
Now the result:
![image.png](https://images.viblo.asia/dd5b8bb9-617d-43d8-8f37-b4ae246ed592.png)
So easy right? Hope you guys feel this topic useful. Thank you for read my topic, have a nice day <3.
Ref:
Simple Golang Server: https://gist.github.com/walm/0d67b4fb2d5daf3edd4fad3e13b162cb