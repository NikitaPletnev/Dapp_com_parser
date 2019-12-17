const {Builder,By, Key, until} = require("selenium-webdriver");
const excel = require('excel4node');
const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Repos Links');
async function Checker() {
    let i = 3050;
    let out_link;
    let intVal = setInterval(() =>{
    function Reader(){
        if(typeof require !== 'undefined') XLSX = require('xlsx');
        let book = XLSX.readFile('Preparse.xlsx');
        let first_sheet_name = book.SheetNames[0];
        let address_of_cell = `B${i}`;
        let worksheet = book.Sheets[first_sheet_name];
        let desired_cell = worksheet[address_of_cell];
        let desired_value = (desired_cell ? desired_cell.v : undefined);
        out_link =  desired_value;
    }Reader()
    let needle = require('needle');
    let URL = out_link;
    needle.get(URL, function(err,res){
        if(res && res.statusCode){
         worksheet.cell(i,1).string(res.statusCode.toString());
         console.log(i + " " + res.statusCode)
      }else{
        worksheet.cell(i,1).string("200");
      }
 });
 workbook.write('linkcheck.xlsx');
i++
    if(i == 3100){
        clearInterval(intVal)
    }
    },1000)
}Checker()