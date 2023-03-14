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
//add data
async function addDept() {
    const questions = await inquirer.prompt([{

        type: 'input',
        message: 'What is the name of the department?',
        name: 'addDept',

    }])
    if (questions) {
        const results = db.promise().query('INSERT INTO department(dept_names) VALUES (?)', questions.addDept)
        console.table(results)
        console.log('Deptartment added!')
    }
    init()
}

// async function addRole() {

//     // const roleChoices = async () => {
//     //     const departments = await db.query('SELECT dept_names FROM department;');
//     //     return departments[0];
//     // };
//     const questions = await inquirer.prompt([
//         {

//             type: 'input',
//             message: 'What is the name of the role?',
//             name: 'newRole',
//         },
//         {
//             type: 'input',
//             message: 'What is the salary for this role?',
//             name: 'addSalary',
//         },
//         // {
//         //     type: 'list',
//         //     message: 'What department does this role belong to?',
//         //     choices: SELECT dept_names FROM department,
//         //     name: 'assignDept',
//         // }

//     ])
//     if (questions) {
//         const results = db.promise().query('INSERT INTO roles(title, salary, dept_id) VALUES (?)', questions.newRole, questions.addSalary, questions.assignDept)
//         console.table(results)
//         console.log('role added!')
//     }
//     init()
// }

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
            '],
        name: 'start'
    },])
        .then((response) => {
            console.log(response);
            if (response.start === "view all departments") {
                viewDepartments();
            }

            if(response.start === "view all roles"){
                viewRoles();
            }

            if(response.start === "view all employees"){
                viewEmployees();
            }

            if (response.start === "add a department") {
                addDept();
            }

            if (response.start === "add a role") {
                addRole();
            }
        });
};

init();