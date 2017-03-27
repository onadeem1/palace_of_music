const Composer = require('./models/composer-model')
const chai = require('chai')
const expect = chai.expect
const supertest = require('supertest')(require('./index'))

describe('Composers model and Spotify song retrieval', function () {

    beforeEach('Sync and empty our composer table', function (done) {
        Composer.sync({force: true})
            .then(function () {
                done();
            })
            .catch(done);
    });

    beforeEach('Populate information', function () {

            var creatingComposer1 = Composer.create({
                name: 'Brahms',
                description: 'A composer from Germany who wrote very technical music.',
                timeperiod: 'Romantic',
                born: 'May 7, 1833',
                birthCountry: 'Germany',
                meshName: 'T30'
            });

            var creatingComposer2 = Composer.create({
                name: 'Schubert',
                description: 'A composer from Austria who wrote very beautiful music.',
                timeperiod: 'Romantic',
                born: 'January 31, 1797',
                birthCountry: 'Austria',
                meshName: 'T35'
            });

            return Promise.all([creatingComposer1, creatingComposer2])
    });

    it('should exist in the db', function () {
        expect(Composer).to.be.an('object');
    });

    it('should have information about the composer upon hitting the correct mesh', function(){
        return supertest.get('/T30')
        .expect(200)
        .expect(function(res){
            expect(res.body.name).to.eql('Brahms')
        })
    })

});
