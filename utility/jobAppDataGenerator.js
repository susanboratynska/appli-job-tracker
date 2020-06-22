const faker = require('faker');

const fs = require('fs');


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomArrayItem(arr) {
    return arr[getRndInteger(0, arr.length)]
}

class JobApp {
    jobapp_title;
    jobapp_postlink;
    jobapp_postingID;
    jobapp_companyname;
    jobapp_companyphone;
    jobapp_companywebsite;
    jobapp_applydate;
    jobapp_followupdate;
    jobapp_contactfirstname;
    jobapp_contactlastname;
    jobapp_contactphone;
    jobapp_contactemail;
    jobapp_status;
    constructor(jobapp_title, jobapp_postlink, jobapp_postingID, jobapp_companyname, jobapp_companyphone, jobapp_companywebsite, jobapp_applydate, jobapp_followupdate, jobapp_contactfirstname, jobapp_contactlastname, jobapp_contactphone, jobapp_contactemail, jobapp_status) {
        this.jobapp_title = jobapp_title;
        this.jobapp_postlink = jobapp_postlink;
        this.jobapp_postingID = jobapp_postingID;
        this.jobapp_companyname = jobapp_companyname;
        this.jobapp_companyphone = jobapp_companyphone;
        this.jobapp_companywebsite = jobapp_companywebsite;
        this.jobapp_applydate = jobapp_applydate;
        this.jobapp_followupdate = jobapp_followupdate;
        this.jobapp_contactfirstname = jobapp_contactfirstname;
        this.jobapp_contactlastname = jobapp_contactlastname;
        this.jobapp_contactphone = jobapp_contactphone;
        this.jobapp_contactemail = jobapp_contactemail;
        this.jobapp_status = jobapp_status;


    }
}


const data = [];

const currentDate = new Date();

const jobPrefix = ['Junior', 'Lead', 'Team', 'Senior'];

const jobs = ['Web Developer', 'Data Scientist', 'Accountant', 'Manager', 'Full Stack Engineer', 'IT Support Technician', 'Sales Rep', 'Cook', 'Instructor'];

for(let i = 0; i < 1000; i++) {

    let applyDate = faker.date.past(2);
    let followUpDate = Math.random() > 0.5 ? faker.date.between(applyDate, currentDate) : null;
    let jobTitle = `${getRandomArrayItem(jobPrefix)} ${getRandomArrayItem(jobs)}`;
    let companyName = faker.company.companyName();
    let openOrClosed = Math.random() > 0.7;
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();

    let jobapp = new JobApp(
        jobTitle,
        '',
        '',
        companyName,
        faker.phone.phoneNumber(),
        faker.internet.url(),
        applyDate,
        followUpDate,
        firstName,
        lastName,
        faker.phone.phoneNumber(),
        faker.internet.email(firstName,lastName),
        openOrClosed

        )


    data.push(jobapp);
}

let outputdata = JSON.stringify(data);

fs.writeFile("outputdata.json", outputdata, function(err) {
    if (err) {
        console.log(err);
    }
});