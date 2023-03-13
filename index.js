const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role'],
        name: 'start'
    },
    //if add dept:
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDept',
    },
    //if add role:
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'addRole',
    },
    {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'addSalary',
    },
    // {
    //     type: 'list',
    // message: 'What department does this role belong to?',
    // choices:[list existing departments],
    // name: 'assignDept',}

    //if add employee:
    {
        type: 'input',
        message: "What is the new Employee's first name?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "What is the new Employee's last name?",
        name: 'lastName',
    },
//     {
//         type: 'list',
//         message: "What is this employee's role?",
//         choices: [list existing roles],
//         name: 'assignRole',
//     },
// {
//     type: 'list',
//     message: "Who is this employee's manager?",
//     choices: [list employee names],
//     name: 'assignManager',
// },

//if update employee role:
    // {
    //     type: 'list',
    //     message: "Which employee's role do you want to update?",
    //     choices: [list employees],
    //     name: 'updateEmp'
    // }
    // {
    //     type: 'list',
    //     message: 'which role do you want to assign to the selected employee?',
    //     choices: [roles],
    //     name: 'updateRole'
    // }
    
 ]

function init() {
    inquirer.prompt(questions)
        .then((response) => {
            console.log(response);
        });
};

init();