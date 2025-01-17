function sum(...numbers) {
    // work to do...
    return numbers.reduce((acc, n) => acc + n);
}

const server = require('./server');
const request = require('supertest');


describe('server', () => {
    it('[GET] / works', () => {
        return request(server)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect('Content-Length', '12')
        .then(res => {
            expect(res.body).toEqual({ api: 'up' });
        });
    }) 
})

// describe('jokes', () => {
//     it('[GET] /jokes works', () => {
//         return request(server)
//             .get('/jokes')
//             .expect(200)
//             // .expect('Content-Type', /json/)
//             // .expect('Content-Length', '12')
//             .then(res => {
//                 expect(res.body).toEqual(res.data.results);
//             });
//     })
// })
// describe('sum function', () => {
//     it('sums two numbers!!', () => {
//       // an assert is about asserting
//       // that actual output is equal to expected output
  
//       expect(sum(1, 2)).toBe(3);
//       expect(sum(1, -2)).toBe(-1);
//     });
  
//     xit('returns null if passed an arg which is not a number!!', () => {
//       expect(sum(null, 3)).toBe(null);
//       expect(sum(7, undefined)).toBe(null);
//       expect(sum(7, NaN)).toBe(null);
//     });
  
//     it('can add up any number of number arguments', () => {
//       expect(sum(1, 2, 3)).toBe(6); // toBe works with scalar // .toEqual([1,2,3])
//     });
//   });
  