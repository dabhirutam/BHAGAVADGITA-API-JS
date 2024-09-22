let chapter = document.getElementById('chapter');
let slokNo = document.getElementById('slokNo');
let slok = document.getElementById('slok');
let chName = document.getElementById('chName');

async function chapters() {
    let response = await fetch('https://vedicscriptures.github.io/chapters/');
    let rec = await response.json();

    rec.forEach((data, index) => {
        chapter.innerHTML += `<li onclick="return viewSlNo(${data.chapter_number},${data.verses_count})" class="chs text-start ps-4 p-2 mb-3 rounded-3 shadow bg-dark border-5 border-bottom border-black ${data.chapter_number == 1 ? 'activeCh' : ''}">${index+1}. &nbsp;${data.name}</li>`;
    });

};

const activeBtn = (cl, act) => {
    let btn = document.querySelectorAll(cl);

    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            let current = document.getElementsByClassName(act);
            current[0].className = current[0].className.replace(act, "");
            this.className += act;
        });
    };
};

const viewSlNo = (no, count) => {
    viewSlok(no, 1), activeBtn('.chs', 'activeCh');

    chName.innerHTML = `अध्याय - ${no}`;
    slokNo.innerHTML = '';
    for (let r = 1; r <= count; r++) {
        slokNo.innerHTML += `<li onclick="return viewSlok(${no},${r})" class="sloks p-2 mb-3 rounded-3 shadow bg-dark border-5 border-bottom border-black  ${r == 1 ? 'activeSl' : ''}">श्लोक - ${r}</li>`;
    };
};

async function viewSlok(chNo, slNo) {
    activeBtn('.sloks', 'activeSl');

    let response = await fetch(`https://vedicscriptures.github.io/slok/${chNo}/${slNo}/`);
    let rec = await response.json();

    slok.innerHTML = `<div class="fs-5 fw-medium d-flex flex-column row-gap-4">
                        <h2 class="fw-bold" style="text-shadow:0px 2px 2px #fff">${rec._id.replace('BG', 'BG - ')}</h2>
                        <p class="fs-2 text-black" style="text-shadow: 0px 0px 15px #ff6f08">${rec.slok.replaceAll('\n', '<br>')}</p>
                        <p>${rec.transliteration.replaceAll('\n', '<br>')}</p>
                        <hr style="border: 1px solid #000;">
                        <h2 class="fw-bold" style="text-shadow:0px 2px 2px #fff">Translation</h2>
                        <p class="text-start mb-5">${rec.siva.et}</p>
                        <h2 class="fw-bold" style="text-shadow:0px 2px 2px #fff">Commentary</h2>
                        <p class="text-start">${rec.siva.ec}</p>
                    </div>`;
};
chapters(), viewSlNo(1, 47), viewSlok(1, 1);