const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const date = document.querySelector("#datepicker").value;
document.querySelector("#app").innerHTML = "<p>loading...</p>";
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
.then(data => {
  document.querySelector("#app").innerHTML = `<h1>${data.title}</h1>`;
    if (data.media_type === "image") {
        document.querySelector("#app").innerHTML = `<img src="${data.url}"/>`;
    } else {
        document.querySelector("#app").innerHTML = `<video src="${data.url}" controls></video>`;
    }
    document.querySelector("#app").innerHTML = `<p>${data.explanation}</p>`;
})
.then(data => {
    let media;

    if (data.media_type === "image") {
        media = `<img src="${data.url}"/>`;
    } else {
        media = `<video src="${data.url}" controls></video>`;
    }
})
document.querySelector("#app").innerHTML = `
    <h1>${data.title}</h1>
    ${media}
    <p>${data.explanation}</p>
`;