import { connectToDatabase } from '../../services/mongodb'

export async function getLastBlogPosts(limit = 1000) {
    let mongocli = await connectToDatabase();
    let db = mongocli.db;
    let posts = await db
        .collection('blog-posts')
        .find({}, { projection: {
            _id: false,
            slug: true,
            author: true,
            title: true,
            coverImgurl: true,
            description: true,
            datePublished: true,
            isPublished: true
          }})
        .sort({ datePublished: -1 })
        .limit(limit)
        .toArray();
    return posts?.length > 0 ? posts : []
}

export default async function handler(req, res) {
    res.status(401).send('This route is protected.');
}