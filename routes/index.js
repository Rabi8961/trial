var express = require('express');
var router = express.Router();
var emp = require('../models/Emp_table');
var emp_detail = require("../models/Emp_details");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.get('/view', function(req, res){
    emp.aggregate([{
      "$lookup" :{
        "from" : "emp_details",
        "localField" : "age",
        "foreignField" : "age",
        "as" : "detail"
      }
    },{ "$unwind": "$detail" }
  ]).exec(function(err, Employee){
      if(err){
        console.log("Error", err);
      }
      else{
        console.log(JSON.stringify(Employee));
        res.render("./view", {emp : Employee})
      }
    });
  
});
// emp.find({}).exec(function(err, Employee){
//   console.log(Employee);
//   res.render("./view", {emp : Employee});
// })


//   emp.find({},{_id:0,position:0,city:0,updated_at:0}).exec(function(err, employees){
    
//     if(err){
//         console.log("Error", err);
//     }
//     else{
//       var empArray =[];
//       var empObject ={};
//       console.log(employees[0].age);
//       for(var i=0;i<employees.length;i++)
//       {
//         var emp_age = employees[i].age;
//            empObject.name = employees[i].name ;
//             empObject.age = employees[i].age;
//           empObject.salary = employees[i].salary;
//         // console.log(emp_age);
//         emp_detail.find({age:emp_age}).exec(function(err, detail){
//           if(err){
//             console.log("Error", err);
//         }
//         else{
//           // console.log(emp_age);
//           // console.log(detail);
        
//           empObject.position = detail[0].position ;
//           empObject.city =  detail[0].city;
//           // console.log(detail);
//           console.log(empObject);
//           empArray.push(empObject);
//         }
//         });
//       }
//         console.log(empArray);
//         // res.render("./view", {emp : employees});
//     }
// });


router.post('/create',function(req, res){
  console.log(req.body.name);
  emp.find({name:req.body.name}).exec(function(err, employees){
    console.log(employees.length);
    if(employees.length == 0)
    {
      console.log(req.body);
      emp.insertMany([req.body],(err,doc)=>{
        err ? console.log(err) : res.render("./output", {info : "Inserted"});;
      });
    }
    else{
      console.log(req.body);
      emp.update({name: req.body.name}, {$set: {salary: req.body.salary, age: req.body.age}}, function(){
        console.log("Successfully updated");
      });
      
      res.render("./output", {info : "Updated"});
    }
  });
});
  
  // Employee.insertMany([req.body],(err)=>{
  //   err ? console.log(err): res.send("Successfull entered");
  // console.log(req.body);

module.exports = router;



