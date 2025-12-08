export default async function handler(req, res) {
    const { title, author } = req.query;
    const GOOGLE_KEY = process.env.GOOGLE_API_KEY;

    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${GOOGLE_KEY}`;
    const r = await fetch(url);
    const json = await r.json();

    res.status(200).json(json);
}
