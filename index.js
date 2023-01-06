const inquirer= require('inquirer')
const db = require('./connection')


function questions() {
    inquirer.prompt([
      {
        name: "prompt",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View departments",
          "View roles",
          "View employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Quit"
        ]
      }])
      .then(function (response) {
        switch (response.prompt) {
          case "View departments":
            viewDepartments();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Add a department":
            addDepartment();
            break;
          case "Add a role":
            adderall();
            break;
          case "Add an employee":
            addEmployee();
            break;
          case "Update employee role":
            upDateRole();
            break;
          case "Quit":
            db.end();
            break;
        }
      });
  };



function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentname',
            message: 'What is the name of the new department? 😃'
        }
    ]).then(data => {
db.query('insert into department set ?', {
    name: data.departmentname
})
questions()
    })
}

function adderall() {
  db.query('SELECT * FROM department', (err, res) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the new role???'
      }, 
      {
        type: 'input',
        name: 'salary',
        message: 'how much they payin?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'what department is this role in?',
        choices: res.map(department => department.name)
      }
    ]).then(data => {
    const departmentname = res.find(department => department.name === data.department)
    db.query('INSERT INTO role set ?', {
      title: data.title,
      salary: data.salary,
      department_id: departmentname.id
    })
     questions()
    })
  })
} 


function addEmployee() {
  db.connect((err) => {
    if (err) throw err;
  
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is the employees first name?',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the employees last name?',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'What is the employees role ID?',
        },
      ])
      .then((answers) => {
        db.query('INSERT INTO employee SET ?', answers, (err, res) => {
          if (err) throw err;
          console.log('Employee added successfully.');
          db.end();
        });
      });
  });
}


function upDateRole() {
  db.connect((err) => {
    if (err) throw err;
  
    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
          },
          {
            type: 'input',
            name: 'role_id',
            message: 'What is the new role ID for this employee?',
          },
        ])
        .then((answers) => {
          const employee = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === answers.employee);
  
  
          db.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [answers.role_id, employee.id],
            (err, res) => {
              if (err) throw err;
              console.log('Employee updated successfully.');
              db.end();
            }
          );
        });
    });
  });
}

  function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if(err) throw err
        console.table(res)
        questions()
    })
  };

  function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if(err) throw err
        console.table(res)
        questions()
    })
  };

  function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if(err) throw err
        console.table(res)
        questions()
    })
  };

  questions();