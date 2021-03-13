window.onload = function () {

    let comicTitle = document.getElementById("comic-title");
    let imageContent = document.getElementsByClassName("comic-content")[0];
    let starRate = document.getElementsByClassName("star-rate");

    console.log(comicTitle.innerHTML);

    const proxy = 'https://cors-anywhere.herokuapp.com/';

    const rnd = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    };

    const fetchComic = async () => {
        console.log("Fetch");


        let randomComic = 1;

        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(proxy + 'https://xkcd.com/info.0.json', {
                method: "GET",
                headers: myHeaders
            })

            const parseResponse = await response.json();

            console.log(parseResponse.num);

            randomComic = rnd(1, parseResponse.num)
            // setRandomComic(rnd(1, parseResponse.num));

        } catch (err) {
            console.log(err);
        }

        try {
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            const response = await fetch(proxy + `https://xkcd.com/${randomComic}/info.0.json`, {
                method: "GET",
                headers: myHeaders
            })

            const parseResponse = await response.json();

            console.log(parseResponse);

            comicTitle.innerHTML = parseResponse.title;
            imageContent.src = parseResponse.img;
            imageContent.alt = parseResponse.alt;

        } catch (err) {
            console.log(err);
        }

    }

    // document.addEventListener("DOMContentLoaded", () => {
    //     console.log("loaded");
    // })
    fetchComic();

    for (let index = 0; index < starRate.length; index++) {
        starRate[index].addEventListener("click", (e) => {
            console.log("click");
            console.log(e.target.id.split("-")[1]);
            fetchComic();
        })
    }

}
