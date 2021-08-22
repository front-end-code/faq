let searchInput = document.getElementById('search_input');
let output = document.querySelector('#output');

let SearchValue = searchInput.value;


let serverDataUrl = 'https://geo-faq.netlify.app/assets/js/about_data.json';
let localDataUrl = 'http://127.0.0.1:5500/assets/js/about_data.json'


// Loadind Data
document.addEventListener('load', loadingData());
async function loadingData () {
    const response = await fetch(localDataUrl);
    const questions = await response.json();

    const html = questions.map(question => `
            <section class="outputed_items">
                <h2 class="main_subtitle">${question.title}</h2>
                <section class="faq_content">
                    ${question.body.length > 0 ? `<p class='faq_body'>${question.body}</p>`: ''}

                    <ul class="list">
                    ${question.list.map(item => {
                        return `<li class="list_item">${item}</li>`
                    }).join("")}
                    </ul>

                    ${ question.img.length > 0 ? 
                        `<section class="show_img"><img class="img" src="${question.img}" alt="" /></section>` :
                        `<section class="hide_img"><img class="hide_img" src="${question.img}" alt="" /></section>`}
                </section>
            </section>
        `).join('');

        output.innerHTML = html;
        renderHtml();
        zoomImage ();
}
// Search Data
const searchFaqs = async searchText => {
    const res = await fetch(localDataUrl);
    const faqs = await res.json();
    
    let matches = faqs.filter( faq => {


        // const regex = new RegExp(`^${searchText}`, 'gi');
        // return faq.title.match(regex);


        return faq.title.toLowerCase().indexOf(searchText) > -1;
    } );
    if(searchText === 0) {
        matches = [];
    }
    outputHtml(matches);
} 
const outputHtml = matches => {

    if(matches.length > 0) {
        const html = matches.map(match => `
            <section class="outputed_items">
                <h2 class="main_subtitle">${match.title}</h2>
                <section class="faq_content">
                    ${match.body.length > 0 ? `<p class='faq_body'>${match.body}</p>`: ''}
                    ${ match.img.length > 0 ? 
                        `<section class="show_img"><img class="img" src="${match.img}" alt="" /></section>` :
                        `<section class="hide_img"><img class="hide_img" src="${match.img}" alt="" /></section>`}
                </section>
            </section>
        `).join('');

        output.innerHTML = html;
        renderHtml();
        zoomImage ();
    }
    else if (matches.length === 0) {
        output.innerHTML = "<p class='info_message'>No Questions Found</p>";
    }
    else {
        output.innerHTML = ``;
    }
};
searchInput.addEventListener('input', () => searchFaqs(searchInput.value));
// Toggle Accordion
function renderHtml () {
    let toggleAccordion = document.querySelectorAll('h2');
    let toggleContent = document.querySelectorAll('.faq_content');

    for( let i = 0; i < toggleAccordion.length; i++ ) {
        toggleAccordion[i].addEventListener('click', () => {
            toggleContent[i].classList.toggle('show_content');
            toggleAccordion[i].classList.toggle('plus');
        } );
    }
}
// Zoom images
let body = document.querySelector('body');
function zoomImage () {
    let show_img = document.querySelectorAll('.show_img');

    for( let i = 0; i < show_img.length; i++ ) {
        show_img[i].addEventListener('click', () => {
            show_img[i].classList.toggle('zoomInImg');
            
            if(show_img[i].classList.contains('zoomInImg')) {
                body.style.overflow = "hidden";
            } else {
                body.style.overflow = "visible";
            }
        } );
    }
}




    