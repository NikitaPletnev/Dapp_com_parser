const {Builder,By, Key, until} = require("selenium-webdriver");
const excel = require('excel4node');
const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Repos Links');

async function nAnalist(){

    worksheet.cell(1,2).string("Site URL");
    let driver  = await new Builder().forBrowser("firefox").build();
    //Get all links to parse
    await driver.get("https://www.dapp.com/ru");
    let i = 0;
    let mainInterval = setInterval(() => {
              //
        driver.findElements(By.className("each-dapp-item")).then(data => {

            if(!data[i]){
            driver.findElement(By.className("view-more")).click();
            driver.findElement(By.className("view-more")).click();
            driver.findElement(By.className("view-more")).click();
            driver.findElement(By.className("view-more")).click();
            driver.findElement(By.className("view-more")).click();
            };
                data[i].findElement(By.tagName("a")).then(link => {
                    link.getAttribute("href").then(href => {
                        if(href){
                            worksheet.cell(i+1,2).string(href);
                            workbook.write('Preparse.xlsx');
                        }
                    });
                });
            });
            //
       
        driver.findElements(By.className("bo-number")).then(num => {
            num[0].getText().then(numText => {
            let endNum = parseInt(numText);
            i++;
            if(i == endNum){
                clearInterval(mainInterval);
                driver.quit();
            }
          })
        })
    },15000)
}

nAnalist()