/* eslint-disable */

// const faker = require('faker');
// const mongoose = require('mongoose');
// const { Schema } = mongoose;
const RecipeModel = require('../../src/models/recipe');
const UserModel = require('../../src/models/user');

const log = console.log;

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

const loadDummyData = async () => {
  let debug = false;
  // debug = true;

  try {
    await UserModel.deleteMany();
  } catch (err) {
    if (err.message !== 'ns not found') {
      console.error(err.message);

      process.exit(1);
    }
  }

  try {
    await RecipeModel.collection.drop();
  } catch (err) {
    if (err.message !== 'ns not found') {
      console.error(err.message);
      process.exit(1);
    }
  }

  const firstUser = {
    name: 'Antonia',
    email: 'tonia@mail.com',
    password: '1234567',
  };

  const onlyUser = await new UserModel(firstUser);

  await onlyUser
    .save()
    .then(rec => {
      if (debug) {
        console.log('Saved user', rec);
      }
    })
    .catch(err => console.error(err.message));

  // Promise.all([onlyUser]).then((user) => console.log(user));

  const recipe1 = {
    title: 'Eggs Benny',
    versions: [
      {
        cookingTime: randomBetween(5, 120),
        servingSize: randomBetween(1, 12),

        directions: ['a string', 'is a string', 'is a string'],
        ingredients: ['a carrot', 'egg', 'another egg'],
        notes: ['a string', 'is a string', 'is a string'],
      },
    ],
  };

  const recipe2 = {
    title: 'Orange Miso Salmon Surpise!',
    versions: [
      {
        cookingTime: randomBetween(5, 120),
        servingSize: randomBetween(1, 12),

        directions: ['a string', 'is a string', 'is a string'],
        ingredients: ['a carrot', 'egg', 'another egg'],
        notes: ['a string', 'is a string', 'is a string'],
      },
    ],
  };

  const recipe3 = {
    title: 'Red Beets Winter Salad',
    versions: [
      {
        cookingTime: randomBetween(5, 120),
        servingSize: randomBetween(1, 12),

        directions: ['a string', 'is a string', 'is a string'],
        ingredients: ['a carrot', 'egg', 'another egg'],
        notes: ['a string', 'is a string', 'is a string'],
      },
    ],
  };

  const r1 = new RecipeModel(recipe1);
  const r2 = new RecipeModel(recipe2);
  const r3 = new RecipeModel(recipe3);

  // const recipes = [r1];
  const recipes = [r1, r2, r3];

  const promiseArr = recipes.map(async recipe => {
    try {
      await recipe.save();
      // .then(rec => onlyUser.recipes.push(rec));

      if (debug) {
        console.log('Saved', recipe);
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  // ERR (when the first save() at the top isn't awaited:
  // Can't save() the same doc multiple times in parallel. Document: user
  // SAI: why does the code below work outside of my loop?

  const whatever = recipes.map(async recipe => {
    try {
      await onlyUser.recipes.push(recipe);

      await onlyUser.save();
    } catch (err) {
      console.error(err.message);
    }

    console.log('new save try');
    console.log(onlyUser);
  });

  // console.log(typeof whatever);
  // console.log(whatever);

  // promiseArr.forEach(promise => Promise
  //   .resolve(promise)
  //   .then(() => process.exit(0)),
  // );
  await Promise.all(whatever);
  Promise.all(promiseArr).then(() => process.exit(0));

  // const p1 = r1
  //   .save()
  //   .then(rec => {
  //     if (debug) {
  //       console.log('Saved', rec);
  //     }
  //   })
  //   .catch(err => console.error(err.message));
  // const p2 = r2
  //   .save()
  //   .then(rec => {
  //     if (debug) {
  //       console.log('Saved', rec);
  //     }
  //   })
  //   .catch(err => console.error(err.message));
  // const p3 = r3
  //   .save()
  //   .then(rec => {
  //     if (debug) {
  //       console.log('Saved', rec);
  //     }
  //   })
  //   .catch(err => console.error(err.message));
  //
  //
  // Promise.all([p1, p2, p3]).then(() => process.exit(0));
};

module.exports = loadDummyData;
