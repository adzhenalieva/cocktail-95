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
        {role: 'admin', displayName: 'admin', token: nanoid(), facebookId: "2337892856277871", avatar: "https://platform-lookaside.fbsbx.com/platform/prof…=50&width=50&ext=1560954797&hash=AeTx6XB9tQW1gFj2"}
    );

    await Cocktail.create(
        {title: "Margarita",
            user: users,
            recipe: "Add all the ingredients into a shaker with ice, and shake until chilled.\n" +
                "\n" +
                "Strain into the prepared rocks glass over fresh ice.\n" +
                "\n" +
                "Garnish with a lime wheel and kosher salt (optional).",
        image: "margarita.jpeg",
        published: true,
        ingredients: [{name: "Blanco tequila", amount: "2 oz"}, {name: "Fresh lime juice", amount: "1 oz"}, {name: "Orange liqueur", amount: "1⁄2 oz"}, {name: "Agave syrup", amount: "1⁄2 oz"}]},
        {title: "Test",
            user: users,
            recipe: "Add all the ingredients into a shaker with ice, and shake until chilled.\n" +
                "\n" +
                "Strain into the prepared rocks glass over fresh ice.\n" +
                "\n" +
                "Garnish with a lime wheel and kosher salt (optional).",
            image: "margarita.jpeg",
            published: true,
            ingredients: [{name: "Blanco tequila", amount: "2 oz"}, {name: "Fresh lime juice", amount: "1 oz"}, {name: "Orange liqueur", amount: "1⁄2 oz"}, {name: "Agave syrup", amount: "1⁄2 oz"}]},
    );

    await connection.close();
};


run().catch(error => {
    console.log('Something went wrong', error);
});