const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Test GET Method
// router.get('/', (req, res)=>{
//     res.send('hare we are')
// });


//GET ALL Employees
router.get('/', async (req, res) => {
    try {
        const getAllEmp = await Employee.find();
        res.json(getAllEmp)
    }
    catch (err) {
        res.json({ message: err })
    }
});

//GET Specific Employee by id
router.get('/:EmpId', async (req, res) => {
    try {
        const getEmp = await Employee.findById(req.params.EmpId);
        res.json(getEmp);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//Delete Specific Employee by Id
router.delete('/:EmpId', async (req, res) => {
    try {
        const deleteEmp = await Employee.remove({_id: req.params.EmpId });
        res.json(deleteEmp)
    }
    catch (err) {
        res.json({ message: err });
    }
});

//Update Employee By Id
router.put('/:EmpId', async (req, res) => {
    try {
        const updateEmp = await Employee.updateOne(
            { _id: req.params.EmpId },
            { $set: { emp_Name: req.body.emp_Name, emp_Dep: req.body.emp_Dep, emp_Salary: req.body.emp_Salary, join_Date: req.body.join_Date, gender: req.body.gender, description: req.body.description } }
        )
        res.json(updateEmp)
    }
    catch (err) {
        res.json({ message: err })
    }
});


//POST Employee using try catch

router.post('/', async (req, res) => {
    const employee = new Employee({
        emp_Name: req.body.emp_Name,
        emp_Dep: req.body.emp_Dep,
        emp_Salary: req.body.emp_Salary,
        join_Date: req.body.join_Date,
        gender: req.body.gender,
        description: req.body.description
    });
    try {
        const saveEmp = await employee.save();
        res.json(saveEmp);
    }
    catch (err) {
        res.json({ message: err });
    }
})

//POST Employee using promises .then and .catch
router.post('/', (req, res) => {
    // console.log(req.body);
    const employee = new Employee({
        emp_Name: req.body.emp_Name,
        emp_Dep: req.body.emp_Dep,
        emp_Salary: req.body.emp_Salary,
        join_Date: req.body.join_Date,
        gender: req.body.gender,
        description: req.body.description
    });
    employee.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ message: err })
        })
})
module.exports = router;

