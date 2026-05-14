const testPaths = [
  "/models/character.enc",
  "/draco/draco_decoder.js",
  "/draco/draco_decoder.wasm",
  "/ultron.wav"
];

for (const path of testPaths) {
  const url = `http://localhost:5173${path}`;
  fetch(url)
    .then(res => console.log(`${url}: ${res.status}`))
    .catch(err => console.error(`${url}: ERROR`, err.message));
}
