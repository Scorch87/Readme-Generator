const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');

inquirer
    .prompt([
    // Project Title
    {
        type:'input',
        name:'title',
        message: chalk.yellow('What is the title of your project?'),
    },
    // Project Description
    {
        type:'input',
        name:'description',
        message: chalk.yellow('Enter a description of the project.'),
    },
        // Installation Instructions
    {
        type:'input',
        name:'installation',
        message: chalk.yellow('Enter installation instructions'),
    },
    
    // Usage Information
    {
        type:'input',
        name:'usage',
        message: chalk.yellow('Describe the usage of your application'),
    },
    // Contribution Guidelines
    {
        type:'input',
        name:'contributionGuidelines',
        message: chalk.yellow('What are the guidelines for contribution?'),
    },
    // Testing Instructions
    {
        type:'input',
        name:'testing',
        message: chalk.yellow('Enter the testing instructions'),
    },
    // Questions
    {
        type:'input',
        name:'questionsGhUser',
        message: chalk.yellow('Enter your github user name'),
    },
    // When I enter my github name, then it is added to Questions with a link to my GitHub profile
    {
        type:'input',
        name:'questionsGhProfileLink',
        message: chalk.yellow('Enter your github profile url'),
    },
    // When I enter my email address, then it is added to Questions with instructions on how to reach me with additional questions.
    {
        type:'input',
        name:'email',
        message: chalk.yellow('Enter your email address'),
    },
    // License Information with a badge
    {
        type:'checkbox',
        name:'licenseInfo',
        message: 'Select Licensing Information',
        choices: [
            {
                name: chalk.red('Public Domain'),
                value: 'Public Domain',
            },
            {
                name: chalk.green('MIT'),
                value: 'MIT',
            },
            {
                name: chalk.blue('BSD'),
                value: 'BSD',
            },
            {
                name: chalk.magenta('GPL'),
                value: 'GPL',
            },
            ],
    }
    
])
    .then((answers) =>{
        console.log(answers);
        var projectTitle = answers.title;
        // iterate through the JSON object to create the README.
        fs.writeFile('README.md', `# ${projectTitle}`, (err)=>{
            err ? console.log(err) : console.log('Success!')
        })
        var projectDesc = answers.description;
        fs.appendFile('README.md', `\n## Description\n${projectDesc}\n`, (err)=>{
            if(err) throw err;
            console.log('Description appended to file.');
        });
        fs.appendFile('README.md',`## Table of Contents:\n1. [Installation Instructions](#installation)
        \n2. [Usage](#usage)\n3. [Contributing](#contributing)\n4. [Testing Instructions](#testing)
        \n5. [Questions](#questions)\n6. [Licensing](#license)`,(err)=>{
            if(err) throw err;
            console.log('Table of Contents appended to file.');
        });
        var installationInstructions = answers.installation;
        fs.appendFile('README.md',`\n<a name="installation"></a>
        \n## Installation\n${installationInstructions}`, (err)=>{
            if(err) throw err;
            console.log('Installation appended to file');
        });
        var usageSection = answers.usage;
        fs.appendFile('README.md',`\n<a name="usage"></a>
        \n## Usage\n${usageSection}`, (err)=>{
            if(err) throw err;
            console.log('Usage appended to file');
        });
        var contributionSection = answers.contribution;
        fs.appendFile('README.md',`\n<a name="contributing"></a>
        \n## Contributing\n${contributionSection}`, (err)=>{
            if(err) throw err;
            console.log('Contributions appended to file');
        });
        var testingInstructions = answers.testing;
        fs.appendFile('README.md',`\n<a name="testing"></a>
        \n## Testing\n${testingInstructions}`, (err)=>{
            if(err) throw err;
            console.log('Testing appended to file');
        });
        var gHUser = answers.questionsGhUser;
        var gHProfile = answers.questionsGhProfileLink;
        var email = answers.email;
        fs.appendFile('README.md',`\n<a name="questions"></a>
        \n## Questions\nGitHub: ${gHUser}\nGitHub Profile: ${gHProfile}
        \nEmail: ${email}`, (err)=>{
            if(err) throw err;
            console.log('Questions appended to file');
        });
        var licenseSection = answers.licenseInfo;
        fs.appendFile('README.md', `\n<a name="license"></a>
        \n## License Information\n${licenseSection}`, (err)=>{
            if(err) throw err;
            console.log('License Info appended to file');
        })

    })
    .catch((error)=>{
        console.error(error);
    });
