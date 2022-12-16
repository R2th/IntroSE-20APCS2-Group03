## I. Abstract
In the present advanced age, the greater part of the worldwide populace currently utilizes email. Radicati discharged refreshed
information in mid-2019 indicating that the all outnumber of dynamic email clients has expanded to 3.9 billion.[1]

A major cyber threat to every business is email-based impersonation scams targeting key personnel. The scheme involves
cybercriminals mimicking business owners and executives through the use of phishing emails. Criminals typically pose as
personnel in positions of authority and ask victims to perform money transfers, pay invoices, or to send the attacker sensitive
data.

## II. Introduction
![](https://images.viblo.asia/f913f694-9f17-4c4f-a057-942451aa5649.png)

   The CNN reveals that ”Shark Tank” judge Barbara Corcoran reported nearly $4̇00,000 in losses caused by impersonation
email scam that tricked her staff in 2020. Nearly 30,000 people reported being a victim of that type of scam last year.Together they reported nearly $5̇0 million in losses, according to the FBI’s 2018 Internet Crime Report.[2]
   Base on that problems, this document is aim to provide a detailed study on the Email Scams attack. It covers all the
required topics for understanding this kind of scam. The proof of concept will help visualize how and why the attack happens
and after that, it will guide audiences on how to prevent and traceback suspicious email.

## III. Webmail vs Email Client

   To comprehend the substance beneath, we first need to comprehend the outline of the email types base in transit it stores information. Fundamentally, the email is divided into 2 kinds that are Web-based Email and Desktop-based Email or Email Client.
    
   The first one is the Web-based Email. You can typically recognize if you have ever started using a Gmail, Hotmail, Yahoo or other email account, chances are you have used webmail. With webmail, you peruse and send email through your internet browser and an online interface. Indeed, webmail permits you to get to your email from any internet browser, on any gadget, as long as you are associated with the Internet. One of its drawbacks is that clients don’t have a clue where their information is being put away.
    
   The subsequent one is Email Client. On the off chance that you’ve utilized a program like Microsoft Outlook, Windows Live Mail, Mozilla Thunderbird or Apple Mail to deal with your messages, at that point you’ve utilized an email client. An email client is a piece of software that is installed on your computer. In other words, in order to use an email client to access your domain emails, you will first need to install the email client software on your computer. Once you have installed the email client, you will then need to configure it so that it knows where to retrieve your emails from. Basic configurations include setting your domain email address, username, password, incoming and outcoming mail servers and ports. You then use this software to download your emails from the server to your computer and from there you can read an send emails. So you don’t need to stress over information security. On the other hand, this can likewise be viewed as a hindrance now and again, particularly when it is utilized in criminal examinations, the proof won’t be gathered from the server.
    
##     IV. SMTP Server 
![](https://images.viblo.asia/4965720c-8678-4ccb-8577-732c69bfafed.png)

   An SMTP (Simple Mail Transfer Protocol) server is an application that is a basic role is to send, receipt, as well as
hand-off active mail between email senders and recipients.

   An SMTP server will have an address that can be set by the mail client or application that you are using and is generally formatted as smtp.serveraddress.com. (For example, Gmail’s SMTP server address is smtp.gmail.com You can also find your SMTP server address in the account or settings section of your mail client.)

   At the point when you send an email, the SMTP server forms your email, chooses which server to send the message to, and transfers the message to that server. The recipient’s inbox service provider, such as Gmail or AOL then downloads the message and places it in the recipient’s inbox.

   Before going into the manner in which an email system works, we have to experience the inward segments of that system. Underneath will be a segment of the SMTP server.
    
   ![](https://images.viblo.asia/6ca4bff3-38d1-49fc-a7c7-2c25f0fa61d9.png)
    
   **Mail User Agent (MUA):** An MUA is a PC application that you associate with, instead of an email server, which transports email. A mail client application part interfaces straightforwardly by an end-client to get to a mail server to read, compose, and send email messages. This segment inside the Simple Mail Transfer Protocol (SMTP) system responsible for making email messages for the move to a Mail Transfer Agent (MTA). Instances of MUA are Thunderbird, MS Outlook, Zimbra Desktop software ... Webmail interfaces like Gmail and Yahoo! Additionally considered as the MUA.
   
   **Mail Submission Agent (MSA):** A server program that gets mail from a MUA, checks for any mistakes, and moves it to the MTA facilitated on a similar server. It utilizes ESMTP, a variation of the Simple Mail Transfer Protocol (SMTP), as indicated in RFC 6409[3]. The MTA acknowledges a client’s approaching mail, while the MSA acknowledges a client’s outgoing mail.

   **Mail Transfer Agent (MTA):** The MTA is also known as a mail relay, responsible for transferring the incoming email from the sender’s mail server to the mail recipient’s mail server of the end-user or destination. To detail, a server application that gets mail from the MSA, or from another MTA. It will discover (through name servers and the DNS) the MX record from the recipient domain’s DNS zone in order to know how to transfer the mail. It then transfers the mail (with SMTP) to another MTA (which is known as SMTP relaying) or, if the recipient’s server has been reached, to the MDA. Instances of MTAs are Postfix, Exim, Sendmail, qmail, ...

 **Mail Delivery Agent (MDA):** A server program that receives mail from the server’s MTA and stores it into the mailbox. MDA is also known as LDA (Local Delivery Agent). An example is Dovecot, which is mainly a POP3 and IMAP server allowing an MUA to retrieve mail, but also includes an MDA which takes mail from an MTA and delivers it to the server’s mailbox.

   **Mailbox (Maildir/mbox):** The server’s mail storage. Maildir is a way of storing email messages. It is usually preferable over mbox.

   **SMTP:** The protocol used by MUAs to send emails to an MSA. The recommended SMTP port for sending mail (from an MUA to an MSA) is the port 587, which uses TLS encryption.

   **IMAP/POP3:** POP and IMAP protocols are used to fetch emails from the mailbox of the recipient server to MUA the recipient. POP3 deletes the email messages from the server after they have been downloaded. IMAP is usually preferable as it maintains all email messages on the server, permitting management of a mailbox by multiple email clients.

   **Mail Exchanger record (MX record):** A Mail Exchanger (MX) basically serves as a guide for the email to reach your mail server. In detail, the MX record in the DNS specifies which server is responsible for accepting email addresses on behalf of a domain. The hostname from the MX record must map to one or more address record (A or AAAA) in the DNS, and must not point to any CNAME records.

   When the sender sends an email, SMTP ensures that the email sent from the sender server reaches the recipient server. When the email arrives at the recipient server The MTA of the receiving server will receive the sender’s email and forward it to the local MDA. MDA then writes the email to the recipient’s mailbox. When the recipient uses MUA to check email, MUA will use POP or IMAP to retrieve mail

![](https://images.viblo.asia/01275c83-8849-4873-9fc1-77bbae98a532.png)

   For further explanation, we assume that userA@exampleA.tst sent an email to userB@exampleB.tst so the flow will be :
    
   1. The sender’s MUA initiates a connection to the mail.exampleA.tst mail server using the SMTP protocol (usually TCP Port 25). The client and server start a brief “conversation” where the latter checks all the data concerning the message’s transmission (sender, recipient, domains, etc.). Note that SMTP language defines only the message’s transmission, and doesn’t deal with its body content. Then, if the domain where your recipient has his account is directly connected to the server, the email is immediately delivered. If it’s not the case, the SMTP hands it to another incoming server closer to the recipient (in jargon these passages are called relays). What if the recipient’s server is down or busy? The SMTP host simply drops the message to a backup server: if none of them is available, the email is queued and the delivery is retried periodically. After a determined period, however, the message is returned as undelivered. If there are no issues, however, the final segment is controlled by POP, another protocol that picks up the email from the receiving server and puts it into the recipient’s inbox.
        
   2. Mail server mail.exampleA.tst receives the email and knows that the destination domain to send email to is @exampleB.tst. The mail.exampleA.tst server creates a query to the DNS server to ask for the MX record information of the @exampleB.tst domain. Assume that there is no information about the @exampleB.tst domain in the DNS server cache.
    
   3. The DNS server, in turn, creates a recursive query against the authoritative DNS server and find information de- tail in the MX records of the @exampleB.tst domain. This information will be returned to the mail.exampleA.tst server. Now the mail.exampleA.tst server has the IP address of the destination mail server, it will send an email directly to the mail.exampleB.tst mail server via the Internet. SMTP is used to communicate between source and destination mail servers.

   4. Incoming email is received by the local SMTP (MTA) on the mail.exampleB.tst server. After receiving the email, it is delivered to MDA, then sent to the recipient’s mailbox stored on the server. The server has separate mailboxes for each user.

   5. When the recipient checks the email using POP or IMAP, the email is retrieved from the server to the user’s computer via MUA. Depending on the MUA configuration, the email may be downloaded in the workstation, the copy may be kept in both the server and the workstation or the email between the server and the MUA is synchronized, depending on which delivery you choose POP or IMAP protocol.
   
   In addition, there is still a mail gate, it stands before the mail server, acting as a firewall with anti-phishing, DLP (data loss prevention) protection, and advanced mail filtering ...

## V. Email authentification

   Email is sent utilizing SMTP—Simple Mail Transfer Protocol. At its generally essential, an SMTP server must speak this protocol. Current SMTP servers should also consider methods for authenticating, such as DKIM and SPF. Verifying email is perhaps the most ideal approach to motion toward getting servers that the email you are sending is authentic.

**DomainKeys Identified Email (DKIM):** It provides a way to validate that an organization delivering an email has the right to do so. The sender makes an MD5 hash value of certain components of the email (for example the email header). The sender at that point utilizes a private key (just known by him) to scramble that MD5 hash. The scrambled string is embedded into the mail, known as the DKIM signature. The sender stores an open key in a DNS record. The receiver finds the public key from the DNS for that domain. The recipient at that point utilizes this public key to decrypt the DKIM signature from the email back to the first MD5 hash. The receiver produces another MD5 hash from the components of the email marked by DKIM and compares it and the first MD5 hash. On the off chance that they coordinate the collector realizes that:

* The sending email domain is the owner of that domain (it is mathematically almost impossible to spoof a correct DKIM signature that decrypts to the original MD5 hash using the public key).

* The elements of the email signed by DKIM were not changed in transit (otherwise the original MD5 hash and the receiver’s generated MD5 hash would not match). The shortcoming of DKIM is that it can only protect mail that has been signed, but it doesn’t provide a mechanism to prove that an unsigned message should have been signed.

Querying the DKIM key need to use dig tool.

`dig txt google._domainkey.<your_domain>`

**Sender Policy Framework (SPF):** SPF enables the sender domain to publicly state which MTA servers (IPs) may send emails on its behalf.

The receiver server checks if SPF exists in the DNS for the domain in the MAIL FROM address (also called envelope sender address). If SPF exists, the receiver checks if the IP address of the sending server matches in the list of IPs in the SPF.

The shortcoming of SPF is that it validates the originating server only looking at the domain in the MAIL FROM address, not the mail header From address. The MAIL FROM address is the email address that receiving servers use to notify the sending server of delivery problems; it is also called envelope sender, envelope from, bounce address or Return Path address. So what’s a Return-Path?. It’s the email address that receiving servers use to notify the sending mail server of delivery problems, like bounces. So an email can pass SPF regardless of whether the address is fake.

![](https://images.viblo.asia/5b4910bc-5ee0-4c10-ac7a-49e0e06d8d2f.png)

The key specialized detail with SPF is that it works by looking at the domain of the Return-Path value included in the email’s headers. The receiving server extracts the domain’s SPF record and afterward browses if the source email server IP is approved to send messages for that domain.

Receiving servers verify SPF by checking a specific TXT DNS entry in your domain, which includes a list of approved IP addresses. This is one of the key aspects of SPF. By using DNS, it’s able to build on something that every website or application already has. That DNS entry includes several parts that each provide different information to the server. 

Querying the SPF record need to use nslookup

`nslookup -type=txt <your_domain>`

**Domain-based Message Authentication, Reporting, and Conformance (DMARC):** DMARC is a technical standard that helps protect email senders and recipients from spam, spoofing, and phishing. DMARC allows an organization to publish a policy that defines its email authentication practices and provides instructions for receiving mail servers for how to enforce them.

It built on top of SPF and DKIM to address the shortcomings of these two authentication standards. DMARC allows to enforce DKIM or SPF validation, and confirm that the Display From address is authentic.

Domain alignment consists of verifying that the From address (address displayed to the final recipient) matches with:

* For SPF, the envelope sender (MAIL FROM) domain.

* For DKIM, the DKIM d= domain (the signing domain included in the DKIM signature header alongside the encrypted
hash).

![](https://images.viblo.asia/d5a166ae-aa55-4621-b17e-ef24c0fc7917.png)

DMARC relies on the established SPF and DKIM standards for email authentication. It also piggybacks on the well-established Domain Name System (DNS). In general terms, the process of DMARC validation works like this:

1. A domain administrator publishes the policy defining its email authentication practices and how receiving mail servers should handle mail that violates this policy. This DMARC policy is listed as part of the domain’s overall DNS records.

2. When an inbound mail server receives an incoming email, it uses DNS to look up the DMARC policy for the domain contained in the message’s “From” (RFC 5322) header. The inbound server then checks evaluates the message for three key factors:

* Does the message’s DKIM signature validate?

* Did the message come from IP addresses allowed by the sending domain’s SPF records?

* Do the headers in the message show proper \domain alignment"?

3. With this information, the server is ready to apply the sending domain’s DMARC policy to decide whether to accept, reject, or otherwise flag the email message.

4 After using the DMARC policy to determine the proper disposition for the message, the receiving mail server will report the outcome to the sending domain owner.

Querying the DMARC record need to use nslookup.

`nslookup - type=txt _dmarc.<your_domain>`

To sum up, DKIM, SPF, and DMARC are all standards that enable different aspects of email authentication. They address complementary issues.

* SPF allows senders to define which IP addresses are allowed to send mail for a particular domain. 

* DKIM provides an encryption key and digital signature that verifies that an email message was not faked or altered.

* DMARC unifies the SPF and DKIM authentication mechanisms into a common framework and allows domain owners to declare how they would like an email from that domain to be handled if it fails an authorization test.

## VI. The Mechanisms of Spoofed Emails

There are two normal impersonation techniques every now and again utilized by cybercriminals. For illustrative purposes, let us say our person in a position of authority we wish to impersonate is Saul Goodman, and his email address is saul.goodman@sgassociates.com:

**Method 1 – Email Address Spoofing:** Saul’s email address and his name are spoofed on an incoming email so that the sender appears to be: Saul Goodman <saul.goodman@sgassociates.com>.

**Method 2 – Display Name Spoofing:** Only Saul’s name is spoofed, but not the email address: Saul Goodman
<saul.goodman1337@gmail.com> or SauI Goodman <sauI.goodman1337@gmail.com> (Because in some font the letter ”l” looks similar to letter ”i” in uppercase is ”I” )

With the accessibility of online free email, Method 2 is a straightforward and low-tech assault to do. An aggressor discovers the name of an individual in your business who is in a position of authority and then signs up to a free email service such as Gmail, Outlook.com or Yahoo Mail using their name. The attacker at that point utilizes openly accessible data on your business from sources, for example, LinkedIn, or your business site to target individuals in your association.

On the positive side, your IT staff can make a few simple changes to your email service to protect your business from both Method 1 and 2 above.

The following two sections feature detailed instructions that make changes to your mail service so that your business can help identify and block spoofed emails and help prevent impersonation attacks. The instructions are written with a technical audience in mind. If this is not you, we recommend you send this article to your IT staff, or contractor responsible for your email service and ask them to implement the changes below.

### Preventing Email Address Spoofing (Method 1)

Did you know that every email has two different senders? One email address is called the ’envelope sender’, and the other is set in the email header. The latter is known as the ’From:’ header, which is normally displayed by the email clients, like Microsoft Outlook. Unfortunately, cybercriminals can forge the ’From:’ header to trick email clients into displaying a name and email address that belong to your business.

You or your IT staff can make changes to your email service settings to help block deceptive emails coming into your organization, and put other email services on notice as to what a legitimate email coming from you should look like. This is done by adding what is known as SPF, DKIM and DMARC DNS records to your company’s domain name.

![](https://images.viblo.asia/c94127d5-703d-4893-9ac9-7e4f43b9a155.png)

Adding SPF, DKIM, and DMARC to a business’s domain name record is not as complicated as it sounds. In cases where your business uses Office 365 or G Suite, you only need to follow the instructions set out below for your mail provider.

Creating an SPF record:

* G Suite instructions[4]

* Office 365 instructions[5]

Creating a DKIM record:

* G Suite instructions[6]

* Office 365 instructions[7]

SPF alone can’t prevent spoofing. Without the DMARC record, cybercriminals can still forge the email address of your business as SPF is just checked against the invisible ’envelope sender’, however not the ’From:’ header. As it were, the criminals can spoof the sender’s email address, and it will pass the SPF checks – and this is the reason you need the DMARC record.

### How to Combat Display Name Spoofing (Method 2)

With Method 2 cybercriminals simply register a new email address with a free email provider using the same name as an executive from your organization (e.g. Saul Goodman ¡saul.goodman1337@gmail.com¿). Technically, the email address is valid, so emails sent from these accounts will slip through anti-spam filtering. Similarly, the SPF/DKIM/DMARC records will not block these phishing emails either, because the email address is not forged.

In this situation, the first and last line of defense is your employees. They need to be vigilant and be prepared to identify emails using the Display Name Spoofing technique. Employees should be trained to identify deceptive emails with the forged display names and should receive as many visual aids as possible to detect if something is off. Luckily, Office 365[8] and G Suite[9] can be configured to help combat display name spoofing by providing employees with visual clues.

## VII. Email Investigation Method

### 1. Header Analysis

The metadata in an email message is in the form of controlled information, which means the headers in the body of the message contain information about the sender or the path through which the message has passed. One of these can be forged to hide the identity of the sender. A detailed analysis of the email subject may give clues.

### 2. Bait Tactics

This type of investigation translates into a bait, and the investigator will somehow send an email with an ”<img src>” tag, which src will be a link to a tracking server. When the e-mail is opened, a log entry containing the IP address of the recipient (the sender of the e-mail being investigated) is recorded on the host HTTP server and so the sender is monitored. However, if the recipient (the email sender being investigated) is using the proxy server, the IP address of the proxy server will be recorded. Logs on the proxy server can be used to track the sender of the e-mail being investigated. If for some reason, proxy server logs are not available, investigators can send other tactical emails containing a) Embedded Java application running on the receiver’s computer or b) HTML page with Active X Object. Both are intended to extract the IP address of the computer receiving the computer and send e-mail to investigators.

### 3. Server Investigation

The server will usually save a copy of the email sent and received in their logs. From here we can purify out the necessary information. However, since server logs often store email copies for a limited period of time, timing matters. If they do not quickly get the necessary logs they will be deleted by the server and the second is that the number of new copies will be very much, making it difficult to investigate.

### 4. Software Embedded Identifiers

Some information about the email creator or the attachment information may be included in the email left behind by the email editing software. This information can be displayed in the header or in the form of MIME content such as Transport Neutral Encapsulation Format (TNEF). Investigating such information may help investigators gather additional evidence on the client’s side. The investigation may reveal the PST file name, username, MAC address, etc. of the client who sent the email.

### 5. Tracing Email With Header

As mentioned above, there are many techniques to investigate email, but in this section, I will detail a technique that is traceability of email based on header analysis. You can retrieve your email address by carefully analyzing the full subject of the email. The email header contains routing information and email metadata. This is information that most users often ignore but they play a very important role in tracing the origin of the email. Most email clients do not display the full standard email headers because they are filled with technical data that is a bit specialized and only makes the average user more confused. However, most email applications support full email header checking:

* To view the full email header in Gmail: Open your Gmail account, then open the email you want to trace. Scroll to the scroll bar in the top right corner, then select the Show original option.

![](https://images.viblo.asia/87747391-b5c7-4521-92cc-36e9d0552fac.png)
![](https://images.viblo.asia/6e202656-b199-45a8-a9d8-0fea8e8aefc6.png)

* View the full email header in Outlook: Double-click the email you want to trace, then go to File and select Properties. Information appears in internet headers (internet headers).

* View the full email subject in Apple Mail: Open the email you want to track, then move to View > Message > Raw Source.

There is a lot of information displayed in a full email header, but you only need to pay attention to the following: You read in order from bottom to top, from old information to new information (meaning information oldest will be at the bottom).

Let’s take a look at a sample email header from a Gmail account on MakeUseOf:

![](https://images.viblo.asia/ebad4ed4-bec3-4fea-8c03-cb7f03d86373.png)

**Components in the header**

Here is the meaning of the content displayed in a full Gmail header (read from bottom to top):

**Reply-To: **The email address you sent feedback to.

**From: **Display the sender of the message, this information is easy to be tampered with.

**Content-type:** Gives information to your browser or email application on how to interpret the content of the email. The most common character sets are UTF-8 (see in the example) and ISO-8859-1.

**MIME-Version:** Displays the standard format that email is using. MIME-Version is usually ”1.0”.

**Subject:** The subject of the email content.

**To:** The intended recipient of the email may display additional recipient addresses.

**DKIM-Signature:** DomainKeys Identified Mail, validates the domain the email was sent to and helps prevent email
fraud and sender fraud.

**Received:** The ”Received” line lists each server that email moved before it was delivered to your inbox. You read the ”Received” line from the bottom to the top; The bottom line is the email creator.

**Authentication-Results:** Contains records of authentication checks that have been performed; may contain various authentication methods.

**Received-SPF:** The Sender Policy Framework (SPF) constitutes part of the email authentication process to prevent fraudulent sender addresses.

**Return-Path:** The location of undelivered or bounced messages.

**ARC-Authentication-Results:** The Authenticated Received Chain, is another authentication standard. take.

**ARC-Message-Signature:** The notation records letterhead information for authentication, similar to DKIM.

**ARC-Seal:** Can be considered as a ”Seal” for ARC-Message-Signature authentication results, similar to DKIM.

**X-Received:** Different from ”Received” in that it is considered non-standard information; means that it may not be a fixed address, such as transfer agent or Gmail’s SMTP server.

**X-Google-Smtp-Source:** Shows emails being transferred using Gmail’s SMTP server.

**Delivered-To:** The final recipient of this email.

### Find the original IP address where email was sent

To retrieve the email address of the email sender, please pay attention to the ”Received” first in the full email header. Next to the first ”Received” line is the IP address of the server that sent the email. Sometimes this content is displayed as X-Originating-IP or Original-IP.

Find the IP address, then scroll to the MX Toolbox page[10]. Enter this IP address in the dialog box, change the search method to Reverse Lookup, then press enter. Search results will display a lot of information related to the sending server. 

Useful tools for analyzing email headers and retrieving IP addresses You can use some of the following tools to analyze
email headers:

* GSuite Toolbox Message header[11]

* MX Toolbox Email Header Analyzer[12]

* IP-Address Email Header Trace (can analyze both email header and retrieve email address)[13]

## VIII. Summary

In email impersonation attacks, Email Address Spoofing and Sender Name Spoofing are techniques that cybercriminals rely on. Once the victim traped, the attacker could trick them sending sensitive information or making payments to them. Besides that, digital analysis is a complex and time-consuming process and large cases go to a dead-end. In this article, we have visualized how a mail server works and recommended some technical protection solutions to decrease the risk of this attack, also discussed the key issues involved in investigating the header analysis of email.

## IX. References
[1] https://www.radicati.com/wp/wp-content/uploads/2018/12/Email-Statistics-Report-2019-2023-Executive-Summary.pdf

[2] https://edition.cnn.com/2020/02/27/business/barbara-corcoran-email-hack-trnd/index.html

[3] https://tools.ietf.org/html/rfc6409#section-3.1

[4] https://support.google.com/a/answer/33786?hl=en

[5] https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/how-office-365-uses-spf-to-prevent-spoofing?view=o365-worldwide#HowSPFWorks

[6] https://support.google.com/a/answer/174124?hl=en

[7] https://docs.microsoft.com/en-us/microsoft-365/security/office-365-security/use-dkim-to-validate-outbound-email?view=o365-worldwide#SetUpDKIMO365

[8] https://www.securit360.com/blog/configure-warning-messages-office-365-emails-external-senders/

[9] https://support.google.com/a/answer/7380041?hl=en

[10] https://mxtoolbox.com/

[11] https://toolbox.googleapps.com/apps/messageheader/analyzeheader

[12] https://mxtoolbox.com/EmailHeaders.aspx

[13] https://www.ip-adress.com/trace-email-address

## X. Useful Web Sites

https://sendgrid.com/blog/what-is-an-smtp-server/

https://viblo.asia/p/thu-thap-va-phan-tich-chung-cu-tu-email-924lJq7NZPM

https://blog.ironbastion.com.au/email-impersonation-scams-phishing-what-your-staff-can-do/

https://afreshcloud.com/sysadmin/mail-terminology-mta-mua-msa-mda-smtp-dkim-spf-dmarc

https://knowledge.ondmarc.redsift.com/en/articles/1519838-querying-spf-dkim-and-dmarc-records

https://www.sparkpost.com/resources/email-explained/dmarc-explained/

https://support.dnsimple.com/articles/dkim-record/

https://postmarkapp.com/guides/spf

https://www.campaignmonitor.com/blog/email-marketing/2019/07/email-usage-statistics-in-2019/

https://en.wikipedia.org/wiki/Message_submission_agent