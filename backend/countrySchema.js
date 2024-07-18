import mongoose from 'mongoose';
const countryCodeSchema = new mongoose.Schema({
    Country: {
        type: String,
        required: true
    },
    CountryCode: {
        type: String,
        required: true
    }
});

// // Define the model for the country code
const CountryCode = mongoose.model('CountryCode', countryCodeSchema);

export default CountryCode;