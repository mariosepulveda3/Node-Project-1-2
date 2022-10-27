const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cinemaSchema = new Schema (
    {
        name: { type: String, required: true},
        location: { type: String, required: true},
        movies: [{ type: mongoose.Types.ObjectId, ref:""}]
    },
    {
        timestamps: true // Guarda cuando se crea o se edita el molde
    }
);

const Cinema = mongoose.model('cinema', cinemaSchema);
module.exports = Cinema