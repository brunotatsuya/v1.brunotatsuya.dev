// Generate slug from post title
export function generateSlug(title='') {
    return title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}