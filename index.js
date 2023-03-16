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
        const results = await db.promise().query('INSERT INTO department(dept_names) VALUES (?)', questions.addDept)
        console.log(results)
        console.log('Deptartment added!')
    }
    init()
}

// async function addRole() {
//     const questions = await inquirer.prompt([
//         //put questions here
//         {
//             type: 'input',
//             message: 'What is the name of the role?',
//             name: 'newRole',
//         }])
//         if (questions) {
//             const results = await db.promise().query('INSERT INTO roles(title) VALUES (?)', questions.newRole)
//             console.log(results)
//             //console.log(deptNamesArray);
//         }
//         addRoleSalary()
//     }

// async function addRoleSalary(){
//     const questions = await inquirer.prompt([
//         //put questions here
//         {
//             type: 'input',
//             message: 'What is the salary for this role?',
//             name: 'addSalary',
//         }])
//     if (questions){
//         const results = await db.promise().query('INSERT INTO roles(salary) VALUES (?)', questions.addSalary)
//     }
//     chooseDept()
// }

// async function chooseDept(){
//     let deptNamesArray = [];
//     const dept = await db.promise().query('SELECT dept_names FROM department');
//     dept[0].ForEach(element => {
//         deptNamesArray.pust(element.dept_names)
//     });

//     const questions = await inquirer.prompt([
//         {
//             type: 'list',
//             message: 'What department does this role belong to?',
//             choices: deptNamesArray,
//             name: 'assignDept',
//         }
//     ])
//     if (questions){
//         const results = await db.promise.query('INSERT INTO roles(dept_id) VALUES (?)', questions.assignDept)
//         console.log(results)
//             //console.log(deptNamesArray);
//             console.log('A new role has been added!')
//     }
//     init();
// }

async function addRole() {
    // //create array of dept name for users to select in inquirer CURRENTLY RETURNS UNDEFINED
    const depts = await db.promise().query("SELECT * FROM department;")
    const deptNamesArray = depts[0].map(({ id, dept_names }) => ({ name: dept_names, value: id }))
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
        const results = await db.promise().query(`INSERT INTO roles (title, salary, dept_id) VALUES ("${questions.newRole}", ${questions.addSalary}, ${questions.assignDept});`)
        console.log(results)
        //console.log(deptNamesArray);
        console.log('A new role has been added!', results)
    }
    init()
}



async function addEmployee() {
    //create array of roles for users to select in inquirer

    const roles = await db.promise().query("SELECT * FROM roles;")
    const roleNamesArray = roles[0].map(({ id, title }) => ({ name: title, value: id }))
    //create array of employees for users to select in inquirer
    const emp = await db.promise().query("SELECT * FROM employees;")
    const employeeNamesArray = emp[0].map(({ id, first_name, last_name }) => ({ name: (first_name, last_name), value: id }))
    
    // let employeeNamesArray = [];
    // const emp = await db.promise().query('SELECT (id) FROM employees');
    // emp[0].forEach(element => {
    //     employeeNamesArray.push(element.id)
    // });

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

        {
            type: 'list',
            message: "What is this employee's role?",
            choices: roleNamesArray,
            name: 'assignRole',
        },
        {
            type: 'list',
            message: "Who is this employee's manager?",
            choices: employeeNamesArray,
            name: 'assignManager',
        }
    ])

    if (questions) {
        const results = await db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (${questions.firstName}, ${questions.lastName}, ${questions.assignRole}, ${questions.assignManager});`);
        console.log(results[0])

        console.log(roleNamesArray);
        console.log(employeeNamesArray);
    }
    init()
}

//update function
async function updateRole() {
    //employee list
    const emp = await db.promise().query("SELECT * FROM employees;")
    const employeeNamesArray = emp[0].map(({id, first_name, last_name }) => ({ name: (first_name, last_name), value: id }))

    //create array of roles for users to select in inquirer
    const roles = await db.promise().query("SELECT * FROM roles;")
    const roleNamesArray = roles[0].map(({ id, title }) => ({ name: title, value: id }))

    const questions = await inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: employeeNamesArray,
            name: 'selectEmp'//selects the WHERE ID value
        },
        {
            type: 'list',
            message: 'which role do you want to assign to the selected employee?',
            choices: roleNamesArray,
            name: 'updateRole' //updates role_id  
        }
    ])
   
    if (questions) {
        const results = await db.promise().query(`UPDATE employees SET role_id = ${questions.updateRole} WHERE id = ${questions.selectEmp};`);
        console.table(results[0])
        console.log('database updated')
    };
    init()
}


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