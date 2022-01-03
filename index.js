const fs = require('fs');
const path = require('path');

function arcreate(json) {
   //! database system
   //* info got from user about db 
      let dbName = json.db_name;
      let lowerName = dbName.toLowerCase();
      let upperName=lowerName.charAt(0).toUpperCase() + lowerName.slice(1);
      let info=json.db_info;
      let db_email=info[3];
      let db_confirmPassword=info[4];
      let db_password=info[5];

   //*creating models folder
      fs.mkdirSync(path.join(__dirname, 'models'));
      console.log('folder named models created successfully!');

   //* creating file in models folder
      let fileContent = "const mongoose = require('mongoose');\nconst {isEmail} = require('validator');\nconst bcrypt = require('bcrypt');\n\nconst "+lowerName+"Schema = new mongoose.Schema({\n";
   // The absolute path of the new file with its name
      let filepath = __dirname + '/models/' +upperName +'.js';
      fs.writeFileSync(filepath, fileContent);
      console.log("The file named "+upperName +'.js'+" created successfully.");
 
   //*Converting given information to code 
      for(let i = 0;i<3;i++){
          if(info[i]!="."){
            let content="   "+info[i]+":{\n"+"    "+"type:String,\n"+"    "+"required:true\n"+"   "+"},\n";
            fs.appendFileSync(filepath, content);
              console.log(info[i] + ' saved!');
          }
      }

   //* Email 
      if(db_email!="."){
          let content="   "+db_email+":{\n"+"    "+"type:String,\n"+"    "+"required:true,\n"+"    "+"unique: true,\n"+"    "+"lowercase: true,\n"+"    "+"validate:isEmail\n"+"   "+"},\n";
          fs.appendFileSync(filepath, content);
          console.log(db_email + ' saved!');
      }
   //*password 
   if(db_password!="."){
    let content="   "+db_password+":{\n"+"    "+"type:String,\n"+"    "+"required:true,\n"+"    "+"minlength:6\n"+"   "+"}\n});\n";
    fs.appendFileSync(filepath, content);
    console.log(db_password + ' saved!');
      }

   //! Functions 
   if(db_password!="."){
    let content=lowerName+"Schema.pre('save',async function (next){\n"+"  const salt = await bcrypt.genSalt();\n"+"  this."+db_password+" = await bcrypt.hash("+"this."+db_password+" ,salt);\n"+"  next();\n"+"});";
    fs.appendFileSync(filepath, content);
    console.log('pre hashing function is created');
      }
    
}

      arcreate({
        "db_name" : "User",
        "db_info" :["name","surname","username","email","confirmPassword","password"]
      });