const fs = require('fs');
const path = require('path');

function arcreate(json) {
   //! database system
   //* info got from user about db 
 let dbName = json.db_name;
 let db_name=json.db_info[0];
 let db_surname=json.db_info[1];
 let db_username=json.db_info[2];
 let db_email=json.db_info[3];
 let db_password=json.db_info[4];
 let db_confirmPassword=json.db_info[5];

     //*creating models folder
   fs.mkdir(path.join(__dirname, 'models'), (err) => {
      if (err) {
          return console.error(err);
      }
      console.log('models folder created succesfully!');
   });

     //* creating file in models folder
  let fileContent = "const mongoose = require('mongoose');";
  // The absolute path of the new file with its name
    let filepath = __dirname + '/models/' +dbName +'.js';
  
  fs.writeFile(filepath, fileContent, (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
  }); 
   
}

arcreate({
   "db_name" : "User",
   "db_info" :["name","surname","username","email","password","confirmPassword"]
});