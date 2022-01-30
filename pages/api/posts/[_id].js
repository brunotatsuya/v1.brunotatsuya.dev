import { connectToDatabase } from '../../../services/mongodb'
import { verifyJwt } from '../../../services/auth'
import { ObjectId } from 'mongodb'

export async function getBlogPostBySlug(slug) {
    const mongocli = await connectToDatabase();
    let db = mongocli.db;
    let post = await db
        .collection('blog-posts')
        .findOne({ slug: slug }, { projection: {
            _id: true,
            slug: true,
            author: true,
            title: true,
            content: true,
            coverImgurl: true,
            description: true,
            datePublished: true,
            isPublished: true
          }});
    return JSON.parse(JSON.stringify(post));
}

export async function getBlogPostById(_id) {
    const mongocli = await connectToDatabase();
    let db = mongocli.db;
    let post = await db
        .collection('blog-posts')
        .findOne({ _id: new ObjectId(_id) }, { projection: {
            _id: true,
            slug: true,
            author: true,
            title: true,
            content: true,
            coverImgurl: true,
            description: true,
            datePublished: true,
            isPublished: true
          }});
    return JSON.parse(JSON.stringify(post));
}

export async function updateBlogPostById(_id, data) {
    const mongocli = await connectToDatabase();
    let db = mongocli.db;
    let result = await db
        .collection('blog-posts')
        .findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: {...data} });
    if (!result.ok) {
        return {
            success: false,
            message: 'Unable to update document.'
        }
    } else {
        return {
            success: true,
            message: 'Updated successfully.'
        }
    };
}


export async function deleteBlogPostById(_id) {
    const mongocli = await connectToDatabase();
    let db = mongocli.db;
    let result = await db
        .collection('blog-posts')
        .deleteOne({ _id: new ObjectId(_id) });
    if (!result.deletedCount) {
        return {
            success: false,
            message: 'Unable to delete document.'
        }
    } else {
        return {
            success: true,
            message: 'Deleted successfully.'
        }
    };
}


export default async function handler(req, res) {
    // Restricts endpoint to only PUT and DELETE requests
    if (!['PUT', 'DELETE'].includes(req.method)) {
        res.status(405).send('Only PUT and DELETE requests are allowed');
        return;
    }

    // Checks if Jwt in cookies is valid
    const decodedResult = verifyJwt({req});
    if (!decodedResult) {
        res.status(403).json({ success: false, message: 'This route is protected to admin.' });
        return;
    }

    const { _id } = req.query;
    const data = req.body;

    if (req.method === 'PUT'){
        const updateResult = await updateBlogPostById(_id, data);

        if (updateResult.success) {
            res.status(200).json(updateResult);
            return;
        } else {
            res.status(400).json(updateResult);
            return;
        }
    }

    if (req.method === 'DELETE'){
        const deletionResult = await deleteBlogPostById(_id);

        if (deletionResult.success) {
            res.status(200).json(deletionResult);
            return;
        } else {
            res.status(400).json(deletionResult);
            return;
        }
    }

}