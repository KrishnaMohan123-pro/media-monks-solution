// loading screen animations control
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 3000);
}

function animationChangeLoadingImage() {
    const loadingImage = document.getElementsByClassName('loading-image')[0];
    setTimeout(() => {
        loadingImage.classList.remove('popImage');
        loadingImage.classList.add('moveImage');
    }, 300);
}

function firstTextAnimation() {
    const firstText = document.getElementsByClassName('first-text')[0];
    firstText.insertAdjacentText('beforeend', '!');

    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            firstText.textContent = firstText.textContent.slice(0, -1);
            resolve();
        }, 1000);
    });
    promise.then(() => {
        firstText.insertAdjacentText('beforeend', ',');
    });
}

function secondTextAnimation() {
    const secondText = document.getElementsByClassName('second-text')[0];
    const text = 'young padawan...';

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            secondText.style.display = 'inline-block';
            resolve();
        }, 1000);
    });
    let count = text.length - 1;
    promise.then(() => {
        setInterval(() => {
            if (count >= 0) {
                secondText.textContent = text[count] + secondText.textContent;
                count--;
            }
        }, 8);
    })
}

// main screen carousel control
function showMainScreen(){
    const mainScreen = document.getElementById('main-screen');
    const totalCount = document.querySelectorAll('[data-carousel-slide]').length - 2;
    document.querySelector('[data-total-pages]').innerText=totalCount;
    setTimeout(()=>{
        mainScreen.style.display = 'block';
    }, 3000)
}

function moveBackground(index, totalSize){
    const backgroundImage = document.querySelector('.carousel-image');
    const imageWidth = backgroundImage.width;
    const offset = index / totalSize * imageWidth ;
    const newLeft = 0 - offset ;
    const newLeftStr = newLeft.toString() + 'px'
    backgroundImage.style.left=newLeftStr;    
}

function carouselSlideControl(){
    const controlbtn = document.querySelectorAll('[data-carousel-control]');
    const paginationBtn = document.getElementsByClassName('page-btn');
    const stepWrapper = document.querySelector('.steps');
    controlbtn.forEach(btn=>{
        btn.addEventListener('click', function(){
            const offset = this.id === 'next' ? 1 : -1;
            const slides = document.querySelectorAll('[data-carousel-slide]');
            const activeIndex = Array.from(slides).findIndex( slide => slide.classList.contains('active'));
            const newIndex = activeIndex + offset;
            controlbtn.forEach(btn=>btn.classList.remove('hidden'));
            if (newIndex === slides.length - 1){
                this.classList.add('hidden')
            }
            if(newIndex === 0){
                this.classList.add('hidden')
            }
            slides[activeIndex].classList.remove('fade-in');
            slides[activeIndex].classList.add('fade-out');
            setTimeout(() => {
                slides[activeIndex].classList.add('hidden');    
            }, 500);
            Array.from(paginationBtn).forEach(pagebtn=>pagebtn.classList.remove('active'));
            paginationBtn[newIndex].classList.add('active');
            Array.from(slides).forEach( slide => slide.classList.remove('active'));
            setTimeout(() => {
                slides[newIndex].classList.remove('hidden')
                slides[newIndex].classList.remove('fade-out');    
                slides[newIndex].classList.add('active');
                slides[newIndex].classList.add('fade-in');    
            }, 1000);
            stepWrapper.classList.remove('fade-in');
            stepWrapper.classList.add('fade-out');
            if(newIndex === 0 || newIndex===slides.length-1){
                setTimeout(() => {
                    stepWrapper.classList.add('hidden');    
                }, 1000);
            }else{
                setTimeout(() => {
                    document.querySelector('[data-page-count]').innerText = newIndex;
                    stepWrapper.classList.remove('hidden');
                    stepWrapper.classList.add('fade-in');
                    stepWrapper.classList.remove('fade-out')
                }, 1000);
            }
            moveBackground(newIndex, slides.length);  
        });
    });
}

// pagination
function renderPagination(){
    const slides = document.querySelectorAll('[data-carousel-slide]');
    const pages = slides.length;
    const el = document.getElementById('pages');
    for (let i=0; i<pages; i++){
        const newEL = document.createElement('button');
        newEL.classList.add('page-btn');
        if(i === 0) newEL.classList.add('active');
        newEL.id = i;
        newEL.innerText = i;
        el.appendChild(newEL);
    }
}

function paginationClick(){
    const pageBtns = document.getElementsByClassName('page-btn');
    const slides = document.querySelectorAll('[data-carousel-slide]');
    const stepWrapper = document.querySelector('.steps');
    Array.from(pageBtns).forEach(function(btn){
        btn.addEventListener('click', function(){
            const prevActivePage = Array.from(document.querySelectorAll('.page-btn')).findIndex(pageBtn=> pageBtn.classList.contains('active'));
            moveBackground(this.id, pageBtns.length);
            Array.from(slides).forEach( slide => slide.classList.remove('active'));
            Array.from(pageBtns).forEach(pageBtn=> pageBtn.classList.remove('active'));
            slides[prevActivePage].classList.remove('fade-in');
            slides[prevActivePage].classList.add('fade-out');
            setTimeout(() => {
                slides[prevActivePage].classList.add('hidden');    
            }, 500);
            Array.from(slides).forEach( slide => slide.classList.remove('active'));
            setTimeout(() => {
                slides[this.id].classList.remove('hidden');
                slides[this.id].classList.remove('fade-out');
                slides[this.id].classList.add('active');
                slides[this.id].classList.add('fade-in');
            }, 1000);
            this.classList.add('active');
            stepWrapper.classList.remove('fade-in');
            stepWrapper.classList.add('fade-out');
            if(this.id === '0' || this.id===(pageBtns.length-1).toString()){
                setTimeout(() => {
                    stepWrapper.classList.add('hidden');    
                }, 1000);
            }else{
                setTimeout(() => {
                    document.querySelector('[data-page-count]').innerText = this.id;
                    stepWrapper.classList.remove('hidden');
                    stepWrapper.classList.add('fade-in');
                    stepWrapper.classList.remove('fade-out')
                }, 1000);
            }
            document.getElementById('prev').classList.remove('hidden');
            document.getElementById('next').classList.remove('hidden')
            if(this.id==='0'){
                document.getElementById('prev').classList.add('hidden');
            }else if(this.id===(pageBtns.length-1).toString()){
                document.getElementById('next').classList.add('hidden')
            }
        });
    });
}

// all functions
function documentOnload() {
    animationChangeLoadingImage();
    firstTextAnimation();
    secondTextAnimation();
    hideLoadingScreen();
    showMainScreen();
    carouselSlideControl();
    renderPagination();
    paginationClick();
    
}
document.onload = documentOnload();