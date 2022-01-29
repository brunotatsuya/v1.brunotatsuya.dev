import { connectToDatabase } from '../../services/mongodb'

export async function getBlogPostBySlug(slug) {
    let mongocli = await connectToDatabase();
    let db = mongocli.db;
    let post = await db
        .collection('blog-posts')
        .findOne({ slug: slug }, { projection: {
            _id: false,
            slug: true,
            author: true,
            title: true,
            content: true,
            coverImgurl: true,
            description: true,
            datePublished: true,
            isPublished: true
          }});
    return post;
}

export default async function handler(req, res) {
    res.status(401).send('This route is protected.');
}