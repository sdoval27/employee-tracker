const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Gandalf81643',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

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


    //if add role:
    // {
    //     type: 'list',
    //     message: 'What department does this role belong to?',
    //     choices: deptNamesArray,
    //     name: 'assignDept',
    // },
    // {

    //     type: 'input',
    //     message: 'What is the name of the role?',
    //     name: 'newRole',
    // },
    // {
    //     type: 'input',
    //     message: 'What is the salary for this role?',
    //     name: 'addSalary',
    // }


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


//view data
async function viewDepartments() {
    const results = await db.promise().query('SELECT * FROM department')
    console.table(results[0])
    console.log('\n')

    init()
}

async function viewRoles() {
    const results = await db.promise().query('SELECT * FROM roles')
    console.table(results[0])
    console.log('\n')

    init()
}

async function viewEmployees() {
    const results = await db.promise().query('SELECT * FROM employees')
    console.table(results[0])
    console.log('\n')

    init()
}
//functions that add data
async function addDept() {
    const questions = await inquirer.prompt([{

        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDept',

    }])
    if (questions) {
        const results = db.promise().query('INSERT INTO department(dept_names) VALUES (?)', questions.addDept)
        console.table(results[0])
        console.log('Deptartment added!')
    }
    init()
}

//HEY SASH IT'S ME SASH HERE'S THE PROBLEM CHILD I SAVED FOR YOU PLEASE FIX IT LOVE YOU BYEEE
async function addRole() {
    //create array of dept name for users to select in inquirer CURRENTLY RETURNS UNDEFINED
    let deptNamesArray = [];
    //supposedly pushes dept names into array
    const dept = await db.promise().query('SELECT dept_names FROM department');
    deptNamesArray.push(dept[0]);

    const questions = await inquirer.prompt([
        //put questions here
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'newRole',
        },
        {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'addSalary',
        },
        {
            type: 'list',
            message: 'What department does this role belong to?',
            choices: deptNamesArray,
            name: 'assignDept',
        }
    ])

    if (questions) {
        const results = db.promise().query('INSERT INTO roles(title, salary, dept_id) VALUES (?)', questions.newRole, questions.addSalary, questions.addDept)
        console.table(results)
        
        console.log(deptNamesArray);
    }
    init()
}

async function addEmployee() {
    //create array of dept name for users to select in inquirer CURRENTLY RETURNS UNDEFINED
    let roleNamesArray = [];
    let employeeNamesArray = [];
    //supposedly pushes roles and names into respective arrays
    const roles = await db.promise().query('SELECT title FROM roles');
    const names = await db.promise().query('SELECT (first_name, last_name) FROM employees');

    roleNamesArray.push(roles[0]);
    employeeNamesArray.push(names[0]);

    const questions = await inquirer.prompt([
        //put questions here
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
        // }
    ])

    if (questions) {
        const results = db.promise().query('INSERT INTO employees(first_name, last_name,) VALUES (?)', questions.firstname, questions.lastname)
        console.table(results[0])
        
        console.log(deptNamesArray);
    }
    init()
}

async function updateRole()


function init() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        choices: ['view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
            'exit'],
        name: 'start'
    },])
        .then((response) => {
            console.log(response);
            if (response.start === "view all departments") {
                viewDepartments();
            }

            if (response.start === "view all roles") {
                viewRoles();
            }

            if (response.start === "view all employees") {
                viewEmployees();
            }

            if (response.start === "add a department") {
                addDept();
            }

            if (response.start === "add a role") {
                addRole();
            }
            if (response.start === "add an employee") {
                addEmployee();
            }
            if (response.start === "update an employee role") {
                updateRole();
            }
            if (response.start === 'exit') {
                console.log("Bye for now");
            }
        });
};

init();