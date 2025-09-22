const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobilePhone: { type: String, required: true },
    areaOfInterest: { type: String, default: '' },
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true, maxlength: 3 },
    postcode: { type: String, required: true, maxlength: 4 },
    isActive: { type: Boolean, default: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    createdAt: { type: Date, default: Date.now }
});

// Adding static methods to the schema
userSchema.statics.getEmailExists = async function (email) {
    const user = await this.findOne({ email });
    if (!user) return false;
    return true;
};


// Instance method to hash password
userSchema.methods.hashPassword = async function () {
    const salt = 12;
    try {
        this.password = await bcrypt.hash(this.password, salt); // Update the document's password field
    } catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};

module.exports = mongoose.model('User', userSchema);