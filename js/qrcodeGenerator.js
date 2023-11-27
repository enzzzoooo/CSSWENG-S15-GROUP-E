function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomSortedIndexes(uuid, count) {
    const nonHyphenIndexes = [];
    for (let i = 0; i < uuid.length; i++) {
      if (uuid[i] !== '-') {
        nonHyphenIndexes.push(i);
      }
    }

    if (count > nonHyphenIndexes.length) {
      throw new Error('Count should be less than or equal to the number of non-hyphen characters.');
    }

    const uniqueIndexes = [];
    while (uniqueIndexes.length < count) {
      const randomIndex = nonHyphenIndexes[Math.floor(Math.random() * nonHyphenIndexes.length)];
      if (!uniqueIndexes.includes(randomIndex)) {
        uniqueIndexes.push(randomIndex);
      }
    }

    // Sort the array of indexes
    uniqueIndexes.sort((a, b) => a - b);

    return uniqueIndexes;
  }


// Function to generate a UUID with "e", "n", "z", "o" appearing only once
function generateUUID() {
    const excludedChars = ['e', 'n', 'z', 'o'];

    // Function to generate a random character excluding 'e', 'n', 'z', 'o'
    function getRandomCharacter() {
      const allChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const availableChars = allChars.replace(new RegExp(excludedChars.join('|'), 'g'), '');
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      return availableChars[randomIndex];
    }

    // Generate the UUID without 'e', 'n', 'z', 'o'
    let uuid = 'xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = c === 'x' ? getRandomCharacter() : (Math.random() * 16 | 0);
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

    var number = 0;
      // Insert each character following the specific order
    var replaced = getRandomSortedIndexes(uuid, 4);
    replaced.forEach((index, i) => {
        uuid =
        uuid.substring(0, index) +
        excludedChars[i] +
        uuid.substring(index + 1);
    });

    return uuid;

}

  let uuid = generateUUID();
  console.log(uuid)

  let qrCodePayload = {
    userId: uuid,
    timestamp: new Date(new Date().toISOString()).toLocaleString()
  };

  let jsonString = JSON.stringify(qrCodePayload);

  console.log(jsonString);

  const qrplace = document.getElementById('qr');

  console.log(qrplace)
  const qr = new QRious({
    element: qrplace,
    value: jsonString,
    size: 200,
  });
