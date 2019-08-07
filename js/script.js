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
    //searchInput.addEventListener('keyup');
    //searchButton.addEventListener('click');
*/


/* The following function should: 
1 - take a li collection and an input element. 

2 - If the li element matches the search then
        append li element to the namesMatched array
3 - Create the page links on the webpage
4 - Display the matching li elements starting from the
    first page
*/
function searchName(liElements, inputElement){
    let namesMatched = [];
    for (let i = 0; i < liElements.length; i++){
        let search = inputElement.value;
        let studentItem = liElements[i];
        let nameElement = studentItem.querySelector('h3');
       
        if ((search.length !== 0) && 
             (nameElement.textContent.toLowerCase()))
        {
            namesMatched.push(studentItem);
        }
    }
    appendPageLinks(namesMatched);
    showPage(namesMatched, 1);
}

/* These next three lines after the comments
I'm testing the searchName function.
1 - I hard code the searchInput value
2 - studentUl contains all student li elements.
3 - Passes the student li elements and the hard coded 
    searchInput to the searchName function.
I think it should work, but when searchName is run and
gets to the if block, the first condition seems to always
return false and I cant figure out why.
(I don't know if this the exact problem, though)
*/
searchInput.value = 'th';
const studentUl = document.querySelector('.student-list');
searchName(studentUl.children, searchInput);


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