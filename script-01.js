
const buttons=[...document.querySelectorAll('.filter')];
const projects=[...document.querySelectorAll('.project')];
buttons.forEach(b=>b.addEventListener('click',()=>{
 buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');
 const f=b.dataset.filter;projects.forEach(p=>p.style.display=(f==='all'||p.dataset.type===f)?'block':'none');
}));
