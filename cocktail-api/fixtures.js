const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require('nanoid');


const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
    await mongoose.connect(config.dbURL, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }
    const users = await User.create(
        {
            role: 'admin', displayName: 'admin', token: nanoid(), facebookId: "108783050363945",
            avatar: "data:image/jpeg;base64,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"
        }
    );

    await Cocktail.create(
        {
            title: "Margarita",
            user: users,
            recipe: "Add all the ingredients into a shaker with ice, and shake until chilled.\n" +
                "\n" +
                "Strain into the prepared rocks glass over fresh ice.\n" +
                "\n" +
                "Garnish with a lime wheel and kosher salt (optional).",
            image: "margarita.jpeg",
            published: true,
            ingredients: [{name: "Blanco tequila", amount: "2 oz"},
                {name: "Fresh lime juice", amount: "1 oz"},
                {name: "Orange liqueur", amount: "1⁄2 oz"},
                {name: "Agave syrup", amount: "1⁄2 oz"}],
            ratings: [{userId: 'Adel', rating: 4.5}]
        },
        {
            title: "Test",
            user: users,
            recipe: "Add all the ingredients into a shaker with ice, and shake until chilled.\n" +
                "\n" +
                "Strain into the prepared rocks glass over fresh ice.\n" +
                "\n" +
                "Garnish with a lime wheel and kosher salt (optional).",
            image: "margarita.jpeg",
            published: true,
            ingredients: [{name: "Blanco tequila", amount: "2 oz"},
                {name: "Fresh lime juice", amount: "1 oz"},
                {name: "Orange liqueur", amount: "1⁄2 oz"},
                {name: "Agave syrup", amount: "1⁄2 oz"}],
            ratings: [{userId: 'Adel', rating: 3}]
        }
    );

    await connection.close();
};


run().catch(error => {
    console.log('Something went wrong', error);
});