Two scripts here: 

1. auto pm members on quest finished - auto accept quest invitations
2. auto-accept-quests

@1. auto pm members on quest finished - auto accept quest invitations  

If a party desires automated PM when a quest is finished, one member can install a Habitica webhook,  
set up the google apps script and shall set up a google sheet.  
  
It is supposed that the user installing this script also wants to auto-accept-quests,  
so the Webhook on Habitica has to be set up using the following parameters:   
  
  
  webhook id (optional)  // no input here  
  url: https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec  // get this from deploying the script  
  webhook label  //no input necessary  
  enable  
  questActivity  
  {"questStarted":false,"questFinished":true,"questInvited":true}   
    
      
      
@2. auto-accept-quests
If you just want to auto-accept quest invitations without pmailing your party members, please use this script and set  
up the Habitica Webhook like this:  
  
  webhook id (optional)  
  url: https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec    
  webhook label   
  enable  
  questActivity  
  {"questStarted":false,"questFinished":false,"questInvited":true}


Further reference: 

 Requirements for this script to work are:  
 (1) to set up a webhook-server: 
     - script.google.com offers an easy way to do this:
     - open script.google.com in a web-browser. 
     - create a new project (this will happen automatically if this is your fist google script) 
     - paste this code snippet into the google script. 
     - save this script as a new version. Read here: https://developers.google.com/apps-script/guides/web
     - deploy the script as a web-app. Read here, also: https://developers.google.com/apps-script/guides/web
     - ! execute the script as "yourself"
     - ! grant acces to everyone, even anonymous. 
           (please evaluate for youself about security issues.) 
           (You might want to use a bot-character for this)
           (Auto accept quest invitation cannot work if using a bot character)
     - click "accept". In the following screen: copy the url-snippet (ending with "exec"). This is your webook-url! You need this for  step 2!
     - done
     - each time you edit the script, it has to be saved as a new version and the new version has to be deployes as a web-app again. 

 (2) to set up a Habitica-Webhook: 
     - To set up a webhook, you can use the tool: API-Helper on github: https://github.com/PitiTheGrey/Habitica-Api-Helper
     - The webhook has to be set up as "questActivity" and has to have webhook-options set to the following criteria: 
         - for noticing, when a quest has finished, webhook-option "questFinished" has to be set to true. (true has to be coded as boolean without double-quotes). 
         - for noticing, when a quest invitation in online, the webhook-option "questInvited" has to be set to true.  
         - provide the url-snippet of the google-apps-script from (1) as url (ends with "exec")
         - click "create"
         - click "display" to check if options are set correctly (copy and paste id if you'd like to delete the webhook. 
         - done
       

  (3) Google Sheet is a means to get any response from the above scripts. The scripts were tested with a deployed sheet, that is is visible to everyone who owns the link. 
