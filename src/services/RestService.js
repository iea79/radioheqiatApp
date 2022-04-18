const AUTH_KEY_VALUE = 'radioheqatOnline2022';

export default class RestService {

    // _wprest = 'http://radioheqatrest.frontendie.ru/wp-json/wp/v2';
    _wprest = 'https://radioheqiat.fm/wp-json/wp/v2';

    async mapBookArray(arr, count = 20) {
        const books = [];
        await arr.map((item, i) => {
            if (i < count) {
                books.push({
                    id: item.id,
                    title: item.title.rendered,
                    link: item.link,
                    image: item.media.image,
                    cover: item.media.cover,
                    audio: item.media.audio,
                    lotty: item.media.lotty,
                    // category: book-kategory,
                    authorPhoto: item.author.photo,
                    authorName: item.author.name,
                    authorRead: item.author.read_by,
                })
            }
        })

        console.log(books);

        return books;
    }

    async getResource(url) {

        const res = await fetch(`${this._wprest}${url}`);

        if (!res.ok) {
            throw new Error('Error')
        }

        return await res.json();
    }

    async getBooksList(ids) {
        let arr = '';
        if (ids) {
            ids.forEach((item) => {
                arr += `include[]=${item}&`;
            });
            console.log(arr);
        }
        const list = await fetch(`${this._wprest}/books?${arr}`)

        // console.log(list);

        return await list.json();
    }

    async getBooksCategories() {
        const list = await fetch(`${this._wprest}/book-category`);

        return await list.json();
    }

    async getBook(id) {
        const list = await fetch(`${this._wprest}/books/${id}`);

        return await list.json();
    }

    async getBooks(params, count = 20) {
        const list = await fetch(`${this._wprest}/books/${params}`)
        const arr = await list.json();

        return await this.mapBookArray(arr, count);
    }

    async getPage(slug) {
        const list = await fetch(`${this._wprest}/pages/?slug=${slug}`)

        // console.log(list);

        return await list.json();
    }

    async getPopularBooks() {
        const res = await fetch(`${this._wprest}/books/?book_views_count`)

        return res.json();
    }

    async getBookPage(id) {
        const res = await fetch(`${this._wprest}/books/${id}`)

        return res.json();
    }

    async getMenu() {
        const res = await fetch(`${this._wprest}/menu`)

        return res.json();
    }

    async getSortingMenu() {
        const res = await fetch(`${this._wprest}/sortmenu`)

        return res.json();
    }

    async getDashboardMenu() {
        const res = await fetch(`${this._wprest}/dashmenu`)

        return res.json();
    }

    async getSocMenu() {
        const res = await fetch(`${this._wprest}/socmenu`)

        return res.json();
    }

    async getAppMenu() {
        const res = await fetch(`${this._wprest}/appmenu`)

        return res.json();
    }

}
