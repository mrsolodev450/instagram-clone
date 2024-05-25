import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    reacts: [{
        likes: {type: Number},
        share: {type: Number},
        saves: {type: Number}
    }]
});

export default mongoose.model('Post', PostSchema)