const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');


const questions = [
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
];
inquirer
    .prompt(questions)
    .then((answers) =>{
        console.log(answers);
        fs.writeFile('README.md', `# ${answers.title}`, (err)=>{
            err ? console.log(err) : console.log('Success!')
        })
        const promises = [
            Promise.resolve(`\n## Description\n${answers.description}\n`),
            Promise.resolve(`## Table of Contents:\n1. [Installation Instructions](#installation)
            \n2. [Usage](#usage)\n3. [Contributing](#contributing)\n4. [Testing Instructions](#testing)
            \n5. [Questions](#questions)\n6. [Licensing](#license)`),
            Promise.resolve(`\n<a name="installation"></a>
            \n## Installation\n${answers.installation}`),
            Promise.resolve(`\n<a name="usage"></a>
            \n## Usage\n${answers.usage}`),
            Promise.resolve(`\n<a name="contributing"></a>
            \n## Contributing\n${answers.contributionGuidelines}`),
            Promise.resolve(`\n<a name="testing"></a>
            \n## Testing\n${answers.testing}`),
            Promise.resolve(`\n<a name="questions"></a>
            \n## Questions\nGitHub: ${answers.questionsGhUser}\nGitHub Profile: ${answers.questionsGhProfileLink}
            \nEmail: ${answers.email}`),
            Promise.resolve(`\n<a name="license"></a>
            \n## License Information\n${answers.licenseInfo}`),
        ];

        return Promise.all(promises);
    })
    .then((contentArray) =>{
        const content = contentArray.join('');
        fs.appendFile('README.md', content, (err)=>{
            if(err){
                console.error(err);
            } else {
                console.log('Content appended successfuly to file!');
            }
        })
    })
    .catch((err)=>{
        console.error(err);
});
