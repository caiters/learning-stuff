const model = {
    cats: [{
            name: 'Lily',
            photo: 'lily.jpg',
            clicks: 0
        },
        {
            name: 'Blurry',
            photo: 'blurry.jpg',
            clicks: 0
        },
        {
            name: 'Maeby',
            photo: 'maeby.jpg',
            clicks: 0
        },
        {
            name: 'Photo',
            photo: 'photo.jpg',
            clicks: 0
        },
        {
            name: 'Kitty',
            photo: 'kitty.jpg',
            clicks: 0
        }
    ],
    addClick(id) {
        this.cats[id].clicks++;
    }
};

const octopus = {
    init() {
        catListView.init();
    },
    getClicks(id) {
        return model.cats[id].clicks;
    },
    catClick(id) {
        model.addClick(id);
        const numberClicks = this.getClicks(id);
        catDetailView.updateClicks(numberClicks);
    },
    selectCat(id) {
        catDetailView.load(id);
    }
};

const catListView = {
    init() {
        document.querySelector('#catsList').innerHTML = this.buildListHtml();

        const catLinks = document.querySelectorAll('#catsList a');
        catLinks.forEach(function(link){
            link.addEventListener('click', function(e){
                e.preventDefault();
                octopus.selectCat(e.target.dataset.id);
            });
        });
    },
    buildListHtml() {
        let listHtml = '';
        model.cats.forEach(function(cat, i) {
            listHtml += `
            <li>
                <a href="#" data-id="${i}">
                    ${cat.name}
                </a>
            </li>
            `;
        });
        return listHtml;
    }
}

const catDetailView = {
    load(id) {
        const cat = document.querySelector('#cat');
        cat.innerHTML = this.buildCatHtml(id);
        const catImg = document.querySelector('img.cat');
        const catClickCounter = document.querySelector('span.cat-clicks');
        catImg.addEventListener('click', function(e){
            octopus.catClick(e.target.dataset.id)
        });
    },
    buildCatHtml(id) {
        return `
            <p>${model.cats[id].name}</p>
            <img class="cat" data-id="${id}" src="img/${model.cats[id].photo}" alt="cat" />
            <p>Clicks: <span class="cat-clicks" data-id="${id}">${model.cats[id].clicks}</span></p>
        `;
    },
    updateClicks(num) {
        const catClicks = document.querySelector('#cat .cat-clicks');
        catClicks.innerHTML = num;
    }
}

octopus.init();