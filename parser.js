const {Builder,By, Key, until} = require("selenium-webdriver");
const excel = require('excel4node');
const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Repos Links');

 
async function Getter(){ 
    let driver  = await new Builder().forBrowser("firefox").build();
    let i = 1;
    let intVal = setInterval(() =>{
        
        function Reader(){
            if(typeof require !== 'undefined') XLSX = require('xlsx');
            let book = XLSX.readFile('Preparse.xlsx');
            let first_sheet_name = book.SheetNames[0];
            let address_of_cell = `B${i}`;
            let worksheet = book.Sheets[first_sheet_name];
            let desired_cell = worksheet[address_of_cell];
            let desired_value = (desired_cell ? desired_cell.v : undefined);
            //Open site
             driver.get(desired_value);
        }
             Reader()
             setTimeout(() => {
                driver.findElement(By.className("left-side")).then(el=> {el.findElement(By.tagName("a")).then(link => {
                    let siteLink = driver.wait(until.elementIsVisible(link));
                    siteLink.getAttribute("href").then(currentLink => {
                             //Checking site 
                               let needle = require('needle');
                               let URL = currentLink;
                               needle.get(URL, function(err,res){
                                   if(res !== undefined){
                                    worksheet.cell(i+1,1).string(res.statusCode.toString());
                                 } 
                               });
                        worksheet.cell(i+1,3).string(currentLink);
                        workbook.write('Parsed.xlsx');
                    })
                })
                //Take titles
                driver.findElement(By.className("name")).then(name => {
                    name.getText().then(title => {
                        worksheet.cell(i+1,2).string(title.toString())
                    })
                })
                //Take social-media-links
                driver.findElements(By.className("dapp-socials")).then(links => {
                    let smmLinks = driver.wait(until.elementIsVisible(links[0]))
                    smmLinks.findElements(By.tagName("a")).then(al => {
                        for(let k = 0 ;k < al.length; k++){
                            al[k].getAttribute("href").then(socialMediasHref => {
                                worksheet.cell(i+1,k+4).string(socialMediasHref);
                            });
                        };
                    });
                });
            });
       },6500)
//Tic
   i++
   if(i == 3100){
       clearInterval(intVal);
       driver.quit();
   }
},12000)
   

}
Getter()