/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Student: Ewerton Luna
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const pageHeaderDiv = document.querySelector('div.page-header')
const students = document.getElementsByClassName('student-item');
const numOfStudentsPerPage = 10;

const searchDiv = createElement('div', 'className', 'student-search');
const searchInput = createElement('input', 'placeholder', 'Search for students...');
const searchButton = createElement('button', 'textContent', 'Search');
searchButton.className = 'search-button';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
pageHeaderDiv.appendChild(searchDiv);

// Displaying the page for the first time
appendPageLinks(students);
showPage(students, 1);


searchButton.addEventListener('click', () => {
    names = searchName(students, searchInput);
    for (let i = 0; i < students.length; i++){
        students[i].style.display = 'none';
    }
    if (names.length === 0){
        showPage(students, 1);
        appendPageLinks(students);
    }
    else {
        showPage(names, 1);
        appendPageLinks(names);
    }

});


/* The searchName function 
- cleans the p.noResultsMessage element if there's one.
- takes an input element value and li collection
- for each li in the collection, it tests to see
if the input value is included in the li element
witch the student's name.
    - If the student name includes the input value
    the li element is pushed to the matchedNames array.

- If the matchedNames array ends up being empty it will
    - check to see the array is empty because the input 
    is an empty string.
        - If so, it will clean p.noResultsMessage element if 
        there's one.
    - Otherwise, it will create an p.noResultsMessage and 
    place it before the ul.student-list element.
*/
function searchName(liElements, inputElement){
    cleanNoResulstMessage();
    const matchedNames = [];
    
    
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
    if (matchedNames.length === 0){
        if (inputElement.value === '') {
            cleanNoResulstMessage();
        } else {
            cleanNoResulstMessage();
            const page = pageHeaderDiv.parentNode;
            const ul = document.querySelector('ul.student-list');
            const noResultsParagraph = createElement('p', 'id', 'noResultsMessage');
            noResultsParagraph.textContent = 'NO MATCHING RESULTS';
            noResultsParagraph.style.color = 'red';
            noResultsParagraph.style.backgroundColor = 'yellow';
            page.appendChild(noResultsParagraph);
            page.insertBefore(noResultsParagraph, ul);
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

/* The cleanNoResultsMessage function
- queries for elemenet contaning the noResultsMessage ID
- if the element exists, it will remove it from the DOM.
*/
function cleanNoResulstMessage(){
    const noResultsParagraph = document.getElementById('noResultsMessage');
    if (noResultsParagraph){
        const parent = noResultsParagraph.parentNode;
        parent.removeChild(noResultsParagraph);
    }
}


function createElement(elementName, property, value){
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
}

/* The showPage function
- takes a collection of student li elements and a page number
- displays the li element if it's index is inside the valid range
according to the number of students per page.  
*/
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


/* The appendPageLinks function
- takes a collection of student li elements
- firstly it will remove any pagination div to
prevent the script from duplicating page links.
- Creates a brand new pagination div.
- Math.ceil is used to calculate the number of links
because it will always have to round up if the number of
li elements is not a multiple of the number of students per
page. Exemple:
    - If numOfStudentsPerPage is 10 and liElements.length
    is 11, it will have to create 2 page links. One for the
    first 10 and another one for the next remaining student.
- Inside the for loop it will
    - create the elements to use as links
    - add the number of the page to the link
    - append the links to the ul element created inside the function.
    - make the first link as the active one
    - append the ul element to the correct location in the DOM (paginationDiv)
    - Add an event listener for the new created ul.
*/
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
    addClickEventListenerToUl(ul, liElements);
    
}


/*This function takes an ul element, 
more especifically, the one related to the
page links and adds the event handler to it.
The second parameter is necessary in order to display
the student li items according to which link was clicked */
function addClickEventListenerToUl(ul, studentLiItems){
    const links = ul.children;

    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'A'){
            for (let i = 0; i < links.length; i++){
                let a = links[i].firstElementChild;
                a.className = '';
            }
            const link = e.target;
            const pageNumber = link.textContent;
            link.className = 'active';
            showPage(studentLiItems, pageNumber);
        }
    });
}

