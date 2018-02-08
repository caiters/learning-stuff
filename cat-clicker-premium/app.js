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
    },
    getCat(id) {
        return { ...this.cats[id] }
    },
    getAllCats() {
        return [ ...this.cats ]
    },
    saveCat(catData, id) {
        this.cats[id] = catData;
    }
};

const octopus = {
    init() {
        const cats = model.getAllCats();
        catListView.loadCatListView(cats);
        adminView.init();
        this.selectCat(0); // load first cat by default
    },
    getClicks(id) {
        return model.cats[id].clicks;
    },
    catClick(id) {
        model.addClick(id);
        const numberClicks = this.getClicks(id);
        catDetailView.updateClicks(numberClicks);
        adminView.updateClicks(numberClicks);
    },
    selectCat(id) {
        const cat = model.getCat(id);
        catDetailView.load(cat, id);
        adminView.load(cat, id);
    },
    saveCat(catData, id) {
        model.saveCat(catData, id);
        catListView.loadCatListView(model.cats);
        catDetailView.load(model.getCat(id), id);
    }
};

const adminView = {
    init() {
        document.querySelector('#admin').classList.remove('admin-wrapper--hidden');
        document.querySelector('#adminBtn').addEventListener('click', this.toggleWindow);
        document.querySelector('#adminCancel').addEventListener('click', this.toggleWindow);
    },
    toggleWindow() {
        document.querySelector('.admin-window').classList.toggle('admin-window--hidden')
    },
    closeWindow() {
        document.querySelector('.admin-window').classList.add('admin-window--hidden')
    },
    load(cat, id) {
        document.querySelector('#name').value = cat.name;
        document.querySelector('#image').value = cat.photo;
        document.querySelector('#clicks').value = cat.clicks;
        document.querySelector('#adminSubmit').dataset.catId = id;
        document.querySelector('#adminSubmit').addEventListener('click', this.saveCat);
    },
    updateClicks(num){
        document.querySelector('#clicks').value = num;
    },
    saveCat(e) {
        const id = e.target.dataset.catId;
        const catData = {
            name: document.querySelector('#name').value,
            photo: document.querySelector('#image').value,
            clicks: document.querySelector('#clicks').value,
        };
        octopus.saveCat(catData, id);
        adminView.toggleWindow();
    }
}

const catListView = {
    loadCatListView(cats) {
        document.querySelector('#catsList').innerHTML = this.buildListHtml(cats);

        const catLinks = document.querySelectorAll('#catsList a');
        catLinks.forEach(function(link){
            link.addEventListener('click', function(e){
                e.preventDefault();
                octopus.selectCat(e.target.dataset.id);
            });
        });
    },
    buildListHtml(cats) {
        console.log(cats);
        let listHtml = '';
        cats.forEach(function(cat, i) {
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
    catDiv: document.querySelector('#cat'),
    load(cat, id) {
        this.catDiv.innerHTML = this.buildCatHtml(cat, id);
        const catImg = document.querySelector('img.cat');
        catImg.addEventListener('click', function(e){
            octopus.catClick(e.target.dataset.id)
        });
        adminView.closeWindow();
    },
    buildCatHtml(cat, id) {
        return `
            <p>${cat.name}</p>
            <img class="cat" data-id="${id}" src="img/${cat.photo}" alt="cat" />
            <p>Clicks: <span class="cat-clicks" data-id="${id}">${cat.clicks}</span></p>
        `;
    },
    updateClicks(num) {
        const catClickCounter = document.querySelector('span.cat-clicks');
        catClickCounter.innerHTML = num;
    }
}

octopus.init();