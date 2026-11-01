const hamburger = document.querySelector('#ham-btn');
const navigation = document.querySelector('#nav-bar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('show');
    navigation.classList.toggle('show');
})


/***************** CERTIFICATE COMPLETION******************/
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'ITM',
        number: 111,
        title: 'Introduction to Databases',
        credits: 2,
        certificate: 'Web Development',
        description: 'This course introduces database concepts, design, and basic SQL queries.',
        technology: [
            'SQL'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 330,
        title: 'Web Frontend Development II',
        credits: 2,
        certificate: 'Web Development',
        description: 'Advanced frontend development focusing on frameworks, state management, and performance.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 340,
        title: 'Web Backend Development',
        credits: 2,
        certificate: 'Web Development',
        description: 'Covers server-side programming, databases, and backend frameworks.',
        technology: [
            'Node.js',
            'SQL'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 341,
        title: 'Web Services',
        credits: 2,
        certificate: 'Web Development',
        description: 'Focuses on APIs, RESTful services, and integration between systems.',
        technology: [
            'REST',
            'JSON',
            'Node.js'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 430,
        title: 'Web Full-Stack Development',
        credits: 2,
        certificate: 'Web Development',
        description: 'Capstone course combining frontend and backend into full-stack applications.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript',
            'Node.js',
            'SQL'
        ],
        completed: false
    }
]

// First Certificate Elements
const list1 = document.getElementById('ListFirstCert');
const count1 = document.getElementById('countFirstCert');
const credit1 = document.getElementById('firstCertCredits');
const filters1 = document.querySelectorAll('#filterFirstCert a');

// Second Certificate Elements
const list2 = document.getElementById('ListWebCert');
const count2 = document.getElementById('countWebCert');
const credit2 = document.getElementById('webCertCredits');
const filters2 = document.querySelectorAll('#filterWebCert a');

// Base Array for each certificate
const firstCertCourses = courses.filter(course => course.certificate === 'Web and Computer Programming');

const webCertCourses = courses.filter(course => course.certificate === 'Web Development');

// Render Function

function renderCourses(courseArray, targetListElement, targetCountElement, targetCreditElement) {
    targetListElement.innerHTML = '';
    courseArray.forEach(element => {

    });
}

/***************** FOOTER ******************/
const year = document.querySelector("#currentyear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

document.getElementById("lastModified").innerHTML = document.lastModified;
