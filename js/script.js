/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const students = document.getElementsByClassName('student-item');
const numOfStudentsPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

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


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
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

appendPageLinks(students);
showPage(students, 1);

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







// Remember to delete the comments that came with this file, and replace them with your own code comments.