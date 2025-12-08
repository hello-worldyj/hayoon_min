document.getElementById("generateBtn").addEventListener("click", generate);

async function generate() {
    const title = document.getElementById("titleInput").value.trim();
    const author = document.getElementById("authorInput").value.trim();
    const lang = document.getElementById("langSelect").value;

    if (!title || !author) {
        alert("책 제목과 작가를 입력하세요!");
        return;
    }

    document.getElementById("introBox").innerText = "Google Books에서 불러오는 중...";
    document.getElementById("summaryBox").innerText = "생성 중...";

    // ⚠️ 너의 Vercel 서버 주소로 변경
    const url = "https://YOUR-VERCEL-APP.vercel.app/api/summary";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, lang }),
        });

        const data = await res.json();

        document.getElementById("introBox").innerText = data.intro ?? "소개 생성 실패 병민한테 말하샘";
        document.getElementById("summaryBox").innerText = data.summary ?? "서머리 생성 실패 병민한테 말하샘";

    } catch (err) {
        document.getElementById("introBox").innerText = "오류 발생! 병민한테 말하샘";
        document.getElementById("summaryBox").innerText = err.message;
    }
}
