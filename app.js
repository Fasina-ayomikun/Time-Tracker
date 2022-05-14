const links = document.querySelectorAll('.link');
const container = document.querySelector('.person-info');



window.addEventListener('DOMContentLoaded',async function(){
    const response = await fetch('data.json');
    const data = await response.json();
    const infos = data.map((info)=>{
        links.forEach((link)=>{
            const id = link.firstChild.dataset.id;
            return id
        })
        
        const {title, timeframes} = info;
        const {daily,monthly,weekly}  = timeframes;
        let {current,previous} =daily;
        
        
       
        return `<div class="info-container ${title.split(' ').join('').toLowerCase()}container ">
        <div class="info">
          <div class="name">
            <h1>${title}</h1>
            <img src="./images/icon-ellipsis.svg" alt="" class="dots">
          </div>
          <p class="hours">${current}hrs</p>
          <p class="week">Last week - ${previous}hrs</p>
        </div>
        <img src="./images/icon-${title.split(' ').join('').toLowerCase()}.svg" alt="" class="${title.toLowerCase()}">
        </div>`
    }).join('')
    
    container.innerHTML = infos
    links.forEach((link)=>{
        if(link.firstChild.dataset.id === 'daily'){
            link.classList.add('active')
            console.log('yes');
        }
        console.log('no');
    })
    console.log(data[0]);
    
})
links.forEach((link)=>{
    link.addEventListener('click',async function(e){
        const element = e.currentTarget;
        links.forEach((link)=>{
            link.classList.remove('active')
        })
        element.classList.add('active')
        if(element.classList.contains('link')){

            const id = element.firstChild.dataset.id;
           const response = await fetch('data.json');
           const data = await response.json();
           
          
           const contents = data.map((content)=>{
            const {title, timeframes} = content;
            const {daily,monthly,weekly}  = timeframes;
            let {current,previous} =daily;
            let {current:monthlycurrent,previous:monthlyprevious} =monthly;
            let {current:weeklycurrent,previous:weeklyprevious} =weekly;
                if(id === 'monthly'){
                    current = monthlycurrent;
                    previous= monthlyprevious;
                }
                else if(id === 'weekly'){
                    current = weeklycurrent;
                    previous = weeklyprevious
                }
                
                return `<div class="info-container ${title.split(' ').join('').toLowerCase()}container ">
        <div class="info">
          <div class="name">
            <h1>${title}</h1>
            <img src="./images/icon-ellipsis.svg" alt="" class="dots">
          </div>
          <p class="hours">${current}hrs</p>
          <p class="week">Last week - ${previous}hrs</p>
        </div>
        <img src="./images/icon-${title.split(' ').join('').toLowerCase()}.svg" alt="" class="${title.toLowerCase()}">
        </div>`
            }).join('')
            container.innerHTML = contents
        }
        
        
    })
})