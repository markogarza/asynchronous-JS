const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I clould not find the file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('could not write the file');
      resolve('Success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1pro, res2pro, res3pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('File written');
  } catch (err) {
    console.log(err.message);
    throw err;
  }

  return '2: Ready doggy';
};

(async () => {
  try {
    console.log('1: Getting doggy');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Ready number 3');
  } catch (err) {
    console.log('New Error!');
  }
})();

// console.log('1: Getting doggy');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Ready number 3');
//   })
//   .catch((err) => {
//     console.log('New Error!');
//   });

// Second solution

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => console.log('Success'))
//   .catch((err) => {
//     console.log(err.message);
//   });

//   First solution

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random image saved to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
