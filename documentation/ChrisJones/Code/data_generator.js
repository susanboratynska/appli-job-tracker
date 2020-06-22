function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getUnixCurrDiff(date) {
    return ((Date.now() - date));
}

function unixToDays(unixtime) {
    return Math.floor(unixtime / 1000 / 86400);
}

function daysToUnix(days) {
    return days * 1000 * 86400;
}



function getRandomArrayItem(arr) {
    return arr[getRndInteger(0, arr.length)]
}

function addRandomDays(date, min, max) {
    return new Date(date.valueOf() + getRndInteger(daysToUnix(min), daysToUnix(max)));

}

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobApplications = [];
    }
}

class JobApplication {
    constructor(jobTitle, company, outcome) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.pay = getRndInteger(14, 100);
        this.outcome = outcome;
        this.events = [];
    }
}

class Event {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }
}


const companies = ['Google', 'Facebook', 'Amazon', 'Bell', 'Rogers', 'Apple', 'Rogers', 'Mozilla', 'TD Bank'];

const jobPrefix = ['Junior', 'Lead', 'Team', 'Senior'];

const jobs = ['Web Developer', 'Data Scientist', 'Accountant', 'Manager', 'Full Stack Engineer', 'IT Support Technician']

const firstNames = ['John', 'Jane', 'Peter', 'Chris', "Paul", 'Adam', 'Quincey', 'Jim', 'Miho', 'Maho', 'Erika', 'Kay'];

const lastNames = ['Smith', 'Walker', 'Fonda', 'McKinnon', "Sanders", 'Jones', 'Johnson', 'Doe', 'Nishizumi', 'Itsumi'];

const stage = ['Contacted', 'Phone Inteview', 'In-Person Interview', 'Technical Interview'];

const outcome = ['Job Offer Accepted', 'Job Offer Declined', 'Rejected', 'Pending'];


const date1 = new Date(2020, 1, 1);
const date2 = new Date(2020, 2, 1);

let test_date = unixToDays(getUnixCurrDiff(date1));

const rando_people = [];

for (let i = 0; i < 15; i++) {
    let person = new Person(getRandomArrayItem(firstNames), getRandomArrayItem(lastNames));

    for (let j = 0; j < 10; j++) {
        let job = new JobApplication(`${getRandomArrayItem(jobPrefix)} ${getRandomArrayItem(jobs)}`, getRandomArrayItem(companies), getRandomArrayItem(outcome));
        let applyDate = addRandomDays(date1, 1, 14);
        job.events.push(new Event('Applied', applyDate));

        for (let x = 0; x < 15; x++) {
            if (Math.random() > 0.75) {
                applyDate = addRandomDays(applyDate, 1, 7);
                job.events.push(new Event(getRandomArrayItem(stage), applyDate));
            }

        }
        person.jobApplications.push(job);

    }
    rando_people.push(person);
}

console.log(JSON.stringify(rando_people));
// console.log(rando_people[0].jobApplications[0]);
// console.log(rando_people[0].jobApplications[0].events);