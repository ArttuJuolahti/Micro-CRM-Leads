# Micro CRM Leads (Project 1)

## Live Deployment
Live: https://micro-crm-leads-c3w6.onrender.com/ 


## Run Locally

### Setup Instructions
works on both macOS, Linux and Windows.


```bash
git clone https://github.com/ArttuJuolahti/Micro-CRM-Leads.git
```
```bash
npm install
```
```bash
npm start
```
Avaa selaimessa:
http://localhost:3000/

### Features

-Create new leads (name, email, company, source, notes)

-List all leads

-Filter by status

-Search by name or company

-Update lead status

Data stored in a JSON file



### Reflection 

This project was very interesting to build, and I tried to follow the instructions closely in order to fully understand what each step did and why it was necessary.
I learned how to create a small but functional Express backend together with a simple front-end interface where leads can be created, filtered, searched, and updated.
At the same time, I practiced handling data in a JSON file, making fetch requests from the client. The UI was not the focus of the project, so it was kept to a bare minimum.
The main goal was to ensure the core functionality worked correctly and reliably.

I also encountered some concrete challenges during the project. One of the most time-consuming issues was a simple typing mistake where I wrote buitton instead of button. This small error broke the functionality silently and did not produce a clear error message, which made it difficult to track down. Eventually, by systematically reviewing my selectors and event bindings, I found the problem. The experience taught me how important attention to detail is and how even tiny mistakes can affect the entire flow.

Overall, the project deepened my understanding of full-stack development and strengthened my confidence in solving problems independently.
