﻿# library-management-system
Module - Login(Admin and Reader). When Login API call, need validate the user credentials, i/p will username and password. Once that is success return the login response with status code, token (use JWT) and admin or reader identifier. If failed return the error with proper validation. 

Admin Related API 

Admin Profile update API     

Username 

Email 

Contact Number 

Add Book API   

Book name 

Book id(auto generate) 

Author 

Number of books 

Cost of each book------D 

Available rack------D 

Book Image 

Update Existing Book   

Book id 

New/Remove books number 

Reason for 	update 

Users dropdown 

Need to return the username and user id 

Issue Book API 

User id 

Book id 

Booking id ( Auto generated) 

Issue date 

Expiry date 

Book Stock check API 

Book name / Book ID 

Need to return the how many books available with that name or id 

Fines rates implement API 

From day 

To day 

Cost 

Add user 

Email 

Username 

Contact number 

Joining date 

Profile 

Book history track 

Book id – optional( If no request return the all booking history in desc) 

Need to return the response who taken the book previously. Response keys as follows 

Username 

Book taken date 

Book return date -  Return if not returned yet 

Booking id 

Fine calculate API 

Booking ID 

Returning date 

Submit Book 

Booking ID 

Returning date 

Fine amount if exists 

User related API 

Search API 

Book name or Book ID 

Response need to return as  

Count of available books, 

Available rack--D 

Cost per book 

Fine related API 

No Request 

Response should to return as 

From day  

To day 

Fine amount 

User taken books history 

 
