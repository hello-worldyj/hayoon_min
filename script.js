// 네 Vercel API 주소
const API_BOOK = "https://hayoonmin.vercel.app/api/book";
const API_SUMMARY = "https://hayoonmin.vercel.app/api/summary";

async function generate() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const lang = document.getElementById("lang").value;
    const tone = document.getElementById("tone").value;
    const num = document.getElementById("num").value;

    document.getElementById("intro").innerText = "Google Books에서 불러오는 중...";
    document.getElementById("summary").innerText = "생성 중...";

    // 1) Google Books API → 설명 가져오기
    const introRes = await fetch(API_BOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author })
    });
    const introData = await introRes.json();

    const intro = introData.description || "설명이 없습니다.";
    document.getElementById("intro").innerText = intro;

    // 2) ChatGPT API → 서머리 생성
    const sumRes = await fetch(API_SUMMARY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            author,
            description: intro,
            tone,
            lang,
            num
        })
    });

    const sumData = await sumRes.json();
    document.getElementById("summary").innerText = sumData.summary;
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("복사 완료!");
}
