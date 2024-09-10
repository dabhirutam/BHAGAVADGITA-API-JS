let chs = document.getElementById('chs');

fetch('https://vedicscriptures.github.io/chapters/').then(res => res.json()).then((rec) => {
    console.log("Rec",rec);
    
    rec.forEach(data => {
        chs.innerHTML += `<div class="col-md-6">
                                <a href="chapter.html" class="p-4 shadow rounded d-block text-decoration-none text-dark" onclick="return chapterView(${data.chapter_number})">
                                    <p class="fw-bold fs-5">अध्याय - ${data.chapter_number}</p>
                                    <h2>${data.name}</h2>
                                    <p>${data.summary.hi.slice(0, 270)} . . .</p>
                                    <span><i class="bi bi-list-ul"></i> ${data.verses_count} Verses</span>
                                </a>
                            </div>`
    });

}).catch(error => console.log("Error", error));

const chapterView = no => localStorage.setItem("chapterNo", JSON.stringify(no));