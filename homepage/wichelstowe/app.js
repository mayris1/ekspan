const gallery=document.querySelector('.gallery');
const slides=[...document.querySelectorAll('[data-slide]')];
const previous=document.querySelector('#previous'),next=document.querySelector('#next'),status=document.querySelector('#slide-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function step(){return slides[1].offsetLeft-slides[0].offsetLeft}
function current(){return Math.round(gallery.scrollLeft/step())}
function update(){const i=current();status.textContent=`${String(i+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;previous.disabled=gallery.scrollLeft<2;next.disabled=gallery.scrollLeft>=gallery.scrollWidth-gallery.clientWidth-2}
function move(direction){gallery.scrollBy({left:direction*step(),behavior:reduced.matches?'instant':'smooth'})}
previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));gallery.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
const lightbox=document.querySelector('#lightbox');let opener;
document.querySelectorAll('.enlarge').forEach(button=>button.addEventListener('click',()=>{opener=button;const image=button.querySelector('img');document.querySelector('#lightbox-image').src=image.src;document.querySelector('#lightbox-image').alt=image.alt;document.querySelector('#lightbox-caption').textContent=button.parentElement.querySelector('figcaption').textContent;lightbox.showModal()}));
document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('close',()=>opener?.focus());lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close()}});
if('IntersectionObserver' in window&&!reduced.matches){document.documentElement.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
update();
