// Manual project spotlight. No automatic rotation or decorative geometry.
const spotlightProjects={
 wichelstowe:{href:'wichelstowe/index.html',image:'hero.webp',alt:'Bushey Fox Bridge during construction at Wichelstowe.',caption:'WICHELSTOWE / CONSTRUCTION-STAGE PHOTOGRAPH',label:'BRIDGE MANUFACTURE & INSTALLATION',title:'A crossing.\nA connection.\nA moving part.',description:'Bushey Fox Bridge. Manufactured in Sheffield. Installed at Wichelstowe.',note1:'BRIDGE DESIGN / MASON CLARK ASSOCIATES',note2:'EKSPAN / MANUFACTURE & INSTALLATION',link:'Explore Wichelstowe',announcement:'Showing Wichelstowe: bridge manufacture and installation.',detail:false},
 govan:{href:'project-govan.html',image:'public-govan-4.webp',alt:'Bearing assembly and temporary steelwork at the Govan–Partick project.',caption:'GOVAN–PARTICK / BEARING & TEMPORARY STEELWORK DETAIL',label:'PERMANENT & TEMPORARY BEARING SYSTEMS',title:'Support for\na moving\ncrossing.',description:'Bearing engineering and temporary works at Govan–Partick Bridge, Glasgow.',note1:'LOCATION / GLASGOW',note2:'EKSPAN / BEARING SYSTEMS & TEMPORARY WORKS',link:'Explore Govan–Partick',announcement:'Showing Govan–Partick: permanent and temporary bearing systems.',detail:true},
 bishopgate:{href:'project-bishopgate.html',image:'public-bishopgate-0.webp',alt:'Installation work beneath steel beams at Bishopgate, Leeds.',caption:'BISHOPGATE / INSTALLATION-STAGE WORKS',label:'BEARING INSTALLATION & JACKING',title:'Installation.\nJacking.\nLoad transfer.',description:'Specialist installation and controlled jacking above the Mill Goit at Leeds Station.',note1:'WORKING WITH / BALFOUR BEATTY',note2:'EKSPAN / INSTALLATION & JACKING',link:'Explore Bishopgate',announcement:'Showing Bishopgate: bearing installation and controlled jacking.',detail:true},
 westquay:{href:'project-westquay.html',image:'public-westquay-0.webp',alt:'Scaffolding and structural works beneath Westquay Shopping Centre.',caption:'WESTQUAY / ACCESS & STRUCTURAL WORKS',label:'BEARING INVESTIGATION & REPLACEMENT',title:'Understand.\nSupport.\nReplace.',description:'Bearing investigation, temporary works and uplift-bearing replacement in Southampton.',note1:'LOCATION / SOUTHAMPTON',note2:'EKSPAN / PRINCIPAL CONTRACTOR',link:'Explore Westquay',announcement:'Showing Westquay: bearing investigation and replacement.',detail:false}
};
const spotlight=document.querySelector('.project-feature');
const spotlightButtons=[...document.querySelectorAll('[data-spotlight]')];
function selectSpotlight(key){
 const project=spotlightProjects[key];if(!project||!spotlight)return;
 spotlight.href=project.href;spotlight.classList.toggle('is-detail',project.detail);
 const image=spotlight.querySelector('img');image.src='assets/'+project.image;image.alt=project.alt;
 spotlight.querySelector('figcaption').textContent=project.caption;
 spotlight.querySelector('.project-copy .eyebrow').textContent=project.label;
 const heading=spotlight.querySelector('h3');heading.textContent=project.title;heading.style.whiteSpace='pre-line';
 spotlight.querySelector('.project-copy>p').textContent=project.description;
 spotlight.querySelector('.project-link').textContent=project.link+' ↗';
 const notes=document.querySelectorAll('.project-notes>span');notes[0].textContent=project.note1;notes[1].textContent=project.note2;
 document.querySelector('#spotlight-status').textContent=project.announcement;
 spotlightButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.spotlight===key)));
}
spotlightButtons.forEach(button=>button.addEventListener('click',()=>selectSpotlight(button.dataset.spotlight)));
