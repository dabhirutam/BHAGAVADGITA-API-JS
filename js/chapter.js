let chapter = document.getElementById('chapter');
let sloks = document.getElementById('sloks');
let chapterNo = JSON.parse(localStorage.getItem("chapterNo"));

fetch(`https://vedicscriptures.github.io/chapter/${chapterNo}`).then(res => res.json()).then((rec) => {
    name(rec.verses_count);
    chapter.innerHTML += `<p class="text-danger fs-3">अध्याय ${rec.chapter_number}</p>
                            <h2 class="my-5 fw-bold">${rec.name}</h2>
                            <p class="fs-5">${rec.summary.hi}</p>`;

}).catch(error => console.log("Error", error));

async function name(count) {
    for (let r = 1; r <= count; r++) {
        let response = await fetch(`https://vedicscriptures.github.io/slok/${chapterNo}/${r}/`);
        let rec = await response.json();

        sloks.innerHTML +=`<li class="shadow p-5 rounded-3 d-flex flex-column row-gap-4">
                            <h2>${rec._id}</h2>
                            <p class="fs-2 text-danger">${rec.slok.replaceAll('\n', '<br>')}</p>
                            <h3>Translation</h3>
                            <p class="fs-4">${rec.siva.et}</p>
                        </li>`;
    }
};