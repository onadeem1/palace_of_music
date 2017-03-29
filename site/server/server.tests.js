const request = require('supertest-as-promised')
const db = require('')
const {expect} = require('chai')
const app = require('./index')
const Composer = require('../../babylon/server/models/composer-model');

describe('Reviews', () => {

  beforeEach('Synchronize and clear database', () => db.sync({force: true}))

  describe('/', () => {

    beforeEach(() => {
      return Composer.create({
        name: "composerName",
        description: "composerDescription",
        timeperiod: "timePeriod",
        born: "date of birth",
        birthCountry: "country",
        meshName: "mesh"
      })
      .then(newComposer => {
        res.json(newComposer)
      })
      .catch(console.error())
    })

    describe('/period', () => {
      it('GET by period', (done) => {
        request(app).get('/period/timePeriod')
        .expect(200)
        .end((err,res) => {
          if (err) return done(err)
          expect(res.body.name).to.equal(newComposer.name)
          done();
        })
      })
    })
  })
});
