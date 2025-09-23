const User = require('../user/userModel');
const Role = require('../user/roleModel');

module.exports = {
    async join(req, res) {
        try {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobilePhone: req.body.mobilePhone,
                areaOfInterest: req.body.areaOfInterest,
                streetName: req.body.streetName,
                city: req.body.city,
                state: req.body.state,
                postcode: req.body.postcode,
            });
    
            await user.hashPassword(); // Hash the password before saving
            if (req.body.role) { // If role is provided, find and assign it 
                const role = await Role.findOne({ name: req.body.role });
                user.role = role._id;
            } else {
                const defaultRole = await Role.findOne({ name: "member" });
                user.role = defaultRole._id;
            }
            console.log("User before saving:", user);
            await user.save(); // Save the user to the database
            console.log("User saved successfully");
            return res.status(201).json({ message: "User was registered successfully." });
        } catch (error) {
            console.log("req.body:", req.body);
            console.error("Error during user registration:", error);
            return res.status(400).json({ message: 'Registration failed. Please try again.', errors: error.message });
        }
    },
};
    