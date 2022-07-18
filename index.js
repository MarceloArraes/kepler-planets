const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36
    && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}


fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true,
    delimiter: ','
  }))
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      results.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(results.map((planet) =>{
    return planet['kepler_name'];
  }
));
    console.log(`There are ${results.length} habitable planets.`);
    console.log('done');
  }
);
