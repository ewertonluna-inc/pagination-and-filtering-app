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
searchButton.className = 'search-button';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
pageHeaderDiv.appendChild(searchDiv);

/* IGNORE INDENTED COMMENT
    //searchButton.addEventListener('click');
*/

function searchName(liElements, inputElement){
    let matchedNames = [];
    for (let i = 0; i < liElements.length; i++){
        let search = inputElement.value;
        let studentItem = liElements[i];
        let nameElement = studentItem.querySelector('h3');
       
        if ((search.length !== 0) && 
             (nameElement.textContent.toLowerCase()
               .includes(search.toLowerCase())))
        {
            matchedNames.push(studentItem);
        }
    }
    return matchedNames;
}

searchInput.addEventListener('keyup', () => {
    const names = searchName(students, searchInput);
    for (let i = 0; i < students.length; i++){
        students[i].style.display = 'none';
    }
    if (names.length === 0) {
        showPage(students, 1);
        appendPageLinks(students);
    } else {
        showPage(names, 1);
        appendPageLinks(names);
    }
});


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
    const isTherePaginationDiv = document.querySelector('div.pagination');
    if (isTherePaginationDiv){
        let parent = isTherePaginationDiv.parentNode;
        parent.removeChild(isTherePaginationDiv);
    }
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


let linksUl = document.querySelector('div.pagination').firstElementChild;
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

        // This line probably needs to be changed
        showPage(students, pageNumber);
    }
});