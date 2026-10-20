const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
const mobile=matchMedia('(max-width:700px)');
function syncMenu(){nav.hidden=mobile.matches;menu.setAttribute('aria-expanded','false')}
syncMenu();mobile.addEventListener('change',syncMenu);
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));nav.hidden=expanded});
nav.addEventListener('click',e=>{if(e.target.closest('a')&&mobile.matches){nav.hidden=true;menu.setAttribute('aria-expanded','false')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobile.matches&&!nav.hidden&&!document.querySelector('.nav-services[open]')){nav.hidden=true;menu.setAttribute('aria-expanded','false');menu.focus()}});

// Local product/project discovery; no technical selection is performed.
const filterButtons=[...document.querySelectorAll('[data-filter]')];
const filterItems=[...document.querySelectorAll('[data-category]')];
const catalogueSearch=document.querySelector('#catalogue-search');
let activeFilter='all';
function applyFilter(){
 const query=(catalogueSearch?.value||'').trim().toLowerCase();
 let count=0;
 filterItems.forEach(item=>{const categoryMatches=activeFilter==='all'||item.dataset.category.split(' ').includes(activeFilter);const searchMatches=!query||(item.dataset.search||item.textContent).toLowerCase().includes(query);item.hidden=!(categoryMatches&&searchMatches);if(!item.hidden)count++});
 filterButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===activeFilter)));
 const status=document.querySelector('#filter-status');if(status)status.textContent=`${count} ${catalogueSearch?'bearing options':'projects'} shown`;
 const empty=document.querySelector('.empty-state');if(empty)empty.hidden=count>0;
}
filterButtons.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;applyFilter()}));
catalogueSearch?.addEventListener('input',applyFilter);
if(filterItems.length){const initial=new URLSearchParams(location.search).get('category');if(filterButtons.some(button=>button.dataset.filter===initial))activeFilter=initial;applyFilter()}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const dropdown=document.querySelector('.nav-services[open]');if(dropdown){dropdown.open=false;dropdown.querySelector('summary').focus()}}});

// Prepare a mailto link only. No form data is sent or persisted by the prototype.
const enquiryForm=document.querySelector('#enquiry-builder');
enquiryForm?.addEventListener('submit',e=>{
 e.preventDefault();
 const topic=document.querySelector('#enquiry-topic').value;
 const name=document.querySelector('#enquiry-name').value.trim();
 const company=document.querySelector('#enquiry-company').value.trim();
 const message=document.querySelector('#enquiry-message').value.trim();
 if(!name||!message){document.querySelector('#enquiry-feedback').textContent='Please add your name and a brief project outline.';return}
 const body=`Hello EKSPAN,\n\n${message}\n\nName: ${name}${company?'\nCompany: '+company:''}`;
 const link=document.querySelector('#prepared-email');link.href=`mailto:info@ekspan.com?subject=${encodeURIComponent('Project enquiry: '+topic)}&body=${encodeURIComponent(body)}`;link.hidden=false;
 document.querySelector('#enquiry-feedback').textContent='Your email is prepared. Use the link below to open your mail app; review it there before sending.';
 link.focus();
});
enquiryForm?.addEventListener('input',()=>{document.querySelector('#prepared-email').hidden=true;document.querySelector('#enquiry-feedback').textContent=''});

// Shared, keyboard-accessible image enlargement for product and project pages.
const assetDialog=document.querySelector('#asset-lightbox');
let assetOpener;
document.querySelectorAll('[data-enlarge]').forEach(button=>button.addEventListener('click',()=>{
 if(!assetDialog)return;
 assetOpener=button;
 const original=button.querySelector('img'),large=document.querySelector('#asset-large');
 large.src=button.dataset.enlarge;large.alt=original.alt;
 document.querySelector('#asset-caption').textContent=button.dataset.caption||original.alt;
 assetDialog.showModal();
}));
document.querySelector('#asset-close')?.addEventListener('click',()=>assetDialog.close());
assetDialog?.addEventListener('close',()=>assetOpener?.focus());
assetDialog?.addEventListener('click',event=>{if(event.target===assetDialog){const r=assetDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)assetDialog.close()}});

// Service-specific links can prepare the enquiry topic without sending anything.
if(enquiryForm){
 const params=new URLSearchParams(location.search),topic=params.get('topic'),product=params.get('product');
 const select=document.querySelector('#enquiry-topic');
 if(topic&&[...select.options].some(option=>option.value===topic))select.value=topic;
 if(product&&!document.querySelector('#enquiry-message').value)document.querySelector('#enquiry-message').value='I would like to discuss '+product.slice(0,120)+'.';
}

const readingProgress=document.querySelector('#reading-progress-fill');
if(readingProgress){
 let progressQueued=false;
 const updateReadingProgress=()=>{const root=document.documentElement;const available=root.scrollHeight-root.clientHeight;const progress=available>0?Math.min(1,Math.max(0,root.scrollTop/available)):0;readingProgress.style.transform=`scaleX(${progress})`;progressQueued=false};
 window.addEventListener('scroll',()=>{if(!progressQueued){progressQueued=true;requestAnimationFrame(updateReadingProgress)}},{passive:true});
 window.addEventListener('resize',updateReadingProgress);window.addEventListener('load',updateReadingProgress);updateReadingProgress();
}

const relatedBearingTrack=document.querySelector('.related-bearing-track');
if(relatedBearingTrack){
 const cards=[...relatedBearingTrack.querySelectorAll('.related-bearing-card')];
 const prev=document.querySelector('#related-bearing-prev'),next=document.querySelector('#related-bearing-next'),status=document.querySelector('#related-bearing-status');
 const spacing=()=>cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:relatedBearingTrack.clientWidth;
 const update=()=>{const step=spacing()||1;const first=Math.max(0,Math.min(cards.length-1,Math.round(relatedBearingTrack.scrollLeft/step)));const visible=Math.max(1,Math.round((relatedBearingTrack.clientWidth+24)/step));const last=Math.min(cards.length,first+visible);status.textContent=`${first+1}${last>first+1?'–'+last:''} / ${cards.length} other bearing ranges`;prev.disabled=relatedBearingTrack.scrollLeft<2;next.disabled=relatedBearingTrack.scrollLeft>=relatedBearingTrack.scrollWidth-relatedBearingTrack.clientWidth-2};
 const move=direction=>relatedBearingTrack.scrollBy({left:direction*spacing(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 relatedBearingTrack.addEventListener('scroll',update,{passive:true});relatedBearingTrack.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
 window.addEventListener('resize',update);window.addEventListener('load',update);update();
}



// Topic-specific preparation guidance; no form values are submitted or stored.
const enquiryGuidance=document.querySelector('#enquiry-guidance-copy');
if(enquiryGuidance){
 const topicSelect=document.querySelector('#enquiry-topic');
 const guidance={
  'Bearing design':'Include the application, drawings, loads, movements, rotations, available space and programme where known.',
  'Manufacture':'Describe the component or assembly, available drawings, quantities, materials specified and required delivery programme.',
  'Installation & replacement':'Include existing bearing details, condition photographs available, access constraints and planned working windows.',
  'Temporary works & jacking':'Describe the structure, support interfaces, access, proposed sequence and any known jacking requirements.',
  'Early contractor involvement':'Share the outline scope, programme, interfaces and methodology or buildability questions you would like to discuss.',
  'Industrial or bespoke bearings':'Describe the application, operating environment, loads, movements and available space where known.'
 };
 const updateGuidance=()=>{enquiryGuidance.textContent=guidance[topicSelect.value]||'Describe your project and the support you need. Share what is available; the team can discuss any gaps.'};
 topicSelect.addEventListener('change',updateGuidance);updateGuidance();
}
