

export async function fetchImages(query: string) {
    const res = await fetch(`https://pixabay.com/api/?key=43803023-a9757763213f77bacfcedf967&q=${query}&image_type=photo&pretty=true`);
    const json = await res.json();
    const flowers: FetchedHit[] =  json.hits;
    const results = flowers.map((flow) => {
        const urls = [
            flow.webformatURL,
            flow.previewURL,
            flow.fullHDURL,
            flow.imageURL,
            flow.userImageURL
        ];
        const url = urls.find(url => !!url);
       
        return {url: url, full:flow.webformatURL, views: flow.views, alt: flow.tags, likes: flow.likes}
    });
    return results;

}

type FetchedHit = {
    [key: string]: string;
};