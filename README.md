1. Install packages and dependencis (npm install   (console));

2. Pre-parser : 
This component will scroll the page and collect links. 
Since the elements are constantly loaded from the server, 
they must first be assembled and saved, 
and after that each separately opened and parsed.

Pre-parser helps to avoid searching for the next element at each step.

Pre-parser save data to Preparse.xlsx

Run pre-parser (node pre-parser   (console))

Wait the end of pre-parser's work.

3. Parser :

This component opens links from the preparser and 
collects the necessary links from them 
(with verification of the response) as well as links to Social Media 

Parser save data to Parsed.xlsx

Run parser (node parser   (console))

Wait the end of parser's work.

4. Check Parser 

If there are a lot of omissions in the first column, 
this means that the script did not manage to get and
 write down the response about the site’s health.

Linkchecker : 

This component rechecks links and displays them in a separate document.

Linkchecker save data to linkcheck.xlsx.

Run linkchecker (node linkchecker   (console)).

Wait the end of linkchecker's work.

Take data fron linkchecker.xlsx to first column Parsed.xlsx.