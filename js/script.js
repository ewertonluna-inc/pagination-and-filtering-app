/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Student: Ewerton Luna
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const pageHeaderDiv = document.querySelector('div.page-header')
const students = document.getElementsByClassName('student-item');
const numOfStudentsPerPage = 10;

appendPageLinks(students);
showPage(students, 1);


const searchDiv = createElement('div', 'className', 'student-search');
const searchInput = createElement('input', 'placeholder', 'Search for students...');
const searchButton = createElement('button', 'textContent', 'Search');
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
pageHeaderDiv.appendChild(searchDiv);





function createElement(elementName, property, value){
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
}

function showPage(liElements, pageNumber){
    const startingIndex = (pageNumber - 1) * numOfStudentsPerPage;
    const endingIndex = (pageNumber * numOfStudentsPerPage) - 1;
    for (let i = 0; i < liElements.length; i++){
        if ((i >= startingIndex) && (i <= endingIndex)) {
            liElements[i].style.display = '';
        } else {
            liElements[i].style.display = 'none';
        }
    }
}

function appendPageLinks(liElements){
    const numOfLinks = Math.ceil(liElements.length / numOfStudentsPerPage);
    const pageDiv = document.querySelector('div.page');
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    const ul = document.createElement('ul');
    
    for (let i = 0; i < numOfLinks; i++){
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.textContent = i + 1;
        a.href = '#';
        if (i === 0) {
            a.className = 'active';
        }
        li.appendChild(a);
        ul.appendChild(li);
    }
    paginationDiv.appendChild(ul);
    pageDiv.appendChild(paginationDiv);
}


const linksUl = document.querySelector('div.pagination').firstElementChild;
linksUl.addEventListener('click', (e) => {
    const links = linksUl.children;
    
    if (e.target.tagName === 'A'){
        for (let i = 0; i < links.length; i++) {
            let a = links[i].firstElementChild;
            a.className = '';
        }
        const link = e.target;
        const pageNumber = link.textContent;
        link.className = 'active';
        showPage(students, pageNumber);
    }
});