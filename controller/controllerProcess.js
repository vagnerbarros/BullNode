var Queue = require('bull');
var calculationQueue = new Queue('Calculation', { redis: { port: '6379', host: '127.0.0.1'}});

class ControllerProcess{

    addData(request, response){

        let data = request.body;

        calculationQueue.add(data);
        calculationQueue.process((job, done) => {

            let data = job.data;
            let result = data.a + data.b;
            done(null, result);
        });
        
        calculationQueue.on('completed', (job, result) => {

            response.status(200).send({ result: result});
        });
    }
}

let process = new ControllerProcess();

module.exports = process;