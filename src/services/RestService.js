export default class RestService {

    // _wprest = 'http://radioheqatrest.frontendie.ru/wp-json/wp/v2';
    _wprest = 'https://radioheqiat.fm/wp-json/wp/v2';

    async mapBookArray(arr, count = 20) {
        const books = [];
        await arr.map((item, i) => {
            // console.log(item);
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
                    content: item.content.rendered,
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
                arr += `${item},`;
            });
            console.log(arr);
        }
        const list = await fetch(`${this._wprest}/books?include=${arr}`)

        const data = await list.json();

        return await this.mapBookArray(data);
    }

    async getBooksCategories(params = '') {
        // ?parent=0
        const list = await fetch(`${this._wprest}/book-category${params}`);

        return await list.json();
    }

    async getAllBooksCategory(id, count = 20) {
        const list = await fetch(`${this._wprest}/books?book-category=${id}`);

        const arr = await list.json();

        // console.log(arr);

        return await this.mapBookArray(arr, count);
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

    async getSearchData(data) {
        const list = await fetch(`${this._wprest}/books?search=${data}&per_page=20`);

        const arr = await list.json();

        console.log(arr);

        return await this.mapBookArray(arr);
    }

}
