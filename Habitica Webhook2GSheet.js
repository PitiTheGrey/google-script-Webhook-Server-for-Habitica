var error ;
function doGet(e) {
    //return message if called via url (browswer)
    return ContentService.createTextOutput(JSON.stringify({"from":"googleAppsScript - doGet -- Some Parts by tenazur@gmail.com"}));
}


function doPost(e) {

    var now = new Date();
    var habId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // your Habitica UserId
    var habToken = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // your Habitica API-Token (don't share, = password!)
    SOURCE_SHEET_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // your google sheet id //docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXX/
    SOURCE_WORKSHEET_NAME = 'Sheet1'; // Page name
    fromSpreadsheet = SpreadsheetApp.openById(SOURCE_SHEET_ID);
    sheet = fromSpreadsheet.getSheetByName(SOURCE_WORKSHEET_NAME);

    try {
        var dataContents = JSON.parse(e.postData.contents); // [object]; get rid of backslashes in e.postData.contents-object  // e.postData.contents has to be parsed!!!

        // cheklist restructure for convenience
        if (typeof dataContents.task.checklist !==  'undefined' && dataContents.task.checklist.length > 0  ) {
            let arr = [];
            for (i=0; i < dataContents.task.checklist.length; i++) {
                arr.push(dataContents.task.checklist[i].id +", " + dataContents.task.checklist[i].text +", "+ dataContents.task.checklist[i].completed) ;
            }
            dataContents["checklist"] = arr;
        }
        // tags restructure for convenience
        if (typeof dataContents.task.tags !== 'undefined'){dataContents["tagsid"]= dataContents.task.tags.join(", "); }

        //flatten whole json with keys as map for value dont remember source but not my function
        var flatjson = flattenObject(dataContents);

        // Creating a stamp for checking rows if same task ticked 2. or more time in a day
        var curDate = Utilities.formatDate(now, "GMT+3", "yyyy-MM-dd")
        flatjson["Time"]= now;
        flatjson["Date"]= curDate;
        flatjson["ID"]= curDate + "_" + flatjson[".task.id"];
        //var arr = [JSON.stringify(dataContents)] // theese 2 lines writes json to sheet can be helpfull for debugging
        //sheet.appendRow(arr);

        // call main write function
        writeJSONtoSheet(flatjson);

        function writeJSONtoSheet(json) {

            // get last row and columns create header array from first column
            var last = sheet.getLastColumn();
            var header = sheet.getRange(1, 1, 1, last).getValues()[0];
            var lastrow = sheet.getLastRow();
            var columnforMatch = sheet.getRange(1,1,lastrow,1).getValues(); // this part picks which column will be used as identifier i used A column if you want to duplicate functionality nam A column as ID
            // Next line contains my header for sheet if you wan to copy copy this line to first line of your sheet
            //ID	Time	Date	.task.text	.task.type	.checklist[0]	.checklist[1]	.checklist[2]	.checklist[3]	.checklist[4]	.task.isDue	.task.completed	.direction	.task.date	.task.up	.task.down	.task.priority	.task.counterDown	.task.counterUp	.task.attribute	.task.everyX	.task.frequency	.delta	.task.value	.task.repeat.m	.task.repeat.t	.task.repeat.s	.task.repeat.w	.task.repeat.t	.task.repeat.s	.task.repeat.su	.task.streak	.task.startDate	.task.updatedAt	.task.isDue	.tagsid	.task.notes	.type	.task.nextDue[0]

            //IF you want to take all data keys as column names and create new columns delete /*  */ (comment symbols) from this part
            /*
            var keys = Object.keys(json).sort();
            var newCols = [];
            for (var k = 0; k < keys.length; k++) {
            if (header.indexOf(keys[k]) === -1) {
            newCols.push(keys[k]);
        }
    }

    ;
    if (newCols.length > 0) {
    sheet.insertColumnsAfter(last, newCols.length);
    sheet.getRange(1, last + 1, 1, newCols.length).setValues([newCols]);
    header = header.concat(newCols);
}*/

//creating row from headers as key values
var row = [];
for (var h = 0; h < header.length; h++) {
    row.push(header[h] in json ? json[header[h]] : "");
}



// loop through master data to find the correct match from column
function findrow (row, col)  {
    for (var i = lastrow-1 ; i > -1 ; i-- ) {
        if(row[0] === col[i][0]) {
            return i;
        }
    } return -1 ;
}


var matchrow = findrow (row,columnforMatch);


//append row ur update
if (matchrow==-1){
    sheet.appendRow(row);
}
else{
    var rowarray =[]
    rowarray.push(row);
    /*for( let i =0 ; i < row.length; i++){
    rowarray.push([row[i]]);

}*/
var range = sheet.getRange (matchrow+1,1,1,row.length)
range.setValues(rowarray);

}
}
} // end try




catch (err) {
    if (JSON.stringify(err).length >0) {
        error =err;
    }}


    return HtmlService.createHtmlOutput("Hey! Webhook request received: " + JSON.stringify(e));
}
