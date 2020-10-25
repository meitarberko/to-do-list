import express from 'express';
import bodyParser from 'body-parser';
import {assignmentSchema}  from './assignment';
import mongoose from 'mongoose';
import conn from './dal';

const app = express();

app.set('port', 27017);
app.listen(27017, function () {
  console.log('app listening on port 27017!');
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allows us to relax default security rules which prevent HTTP calls from being made between different servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 app.get('/api/todos', async function(req,res) {
  const assignments = await assignmentSchema.find().then(
    (assignments) => {
      res.send(assignments).status(200);
    }
    ).catch((err) => {
      {
        console.log({ err });
        res.send('there was an error, please try again').status(400)
      }
    });
    return conn.close();
 })

 app.post('/api/todos', async function(req, res){
   const newAssignment = new assignmentSchema({
    assignmentName: req.body.assignmentName
   });
   await newAssignment.save().then(
     () => {
      res.send(newAssignment).status(201);
      console.log(newAssignment);
     }
   ).catch(
     (err) => {
       console.log({ err });
       res.send('there was an error, please try again').status(400);
     }); 
     return conn.close();
 })

 app.put('api/todos/id:', async function(req, res){
   const updateAssignment = new assignmentSchema({
     id: req.params.id,
     assignmentName: req.body.assignmentName
   });
   await assignmentSchema.updateOne({id: req.params.id}, updateAssignment).
   then(
     () => {
       res.send(updateAssignment).status(200)
     }
   ).catch(
     (err) => {
      console.log({ err });
      res.send('there was an error, please try again').status(400);
     }
   );
   return conn.close();
 })

 app.delete('api/todos/id:', async function(req, res){
  await assignmentSchema.deleteOne({id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: "assignment deleted succsesfully!"
      })
    }
  ).catch(
    (err) => {
     console.log({ err });
     res.send('there was an error, please try again').status(400);
    }
  );
  return conn.close();
  })

export default app;



  