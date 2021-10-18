import express from "express";
import Queue from "bull";

const app = express();


const queueMain = new Queue('main-app', {
  redis: { port: 6379, host: "redis" },
});

const queueWorker = new Queue('worker-app', {
  redis: { port: 6379, host: "redis" },
});

queueWorker.process((job)=>{
  console.log('queueWorker process');
  return "process worker is complete"
})


queueWorker.on('completed', (job, res)=>{
  console.log(res)
  queueMain.add({data: 'push from worker'}, { delay: 10000 });
  console.log('queueWorker complete');
  console.log(`${job.id} is finished, its data was ${res}`)
})




app.listen(4000, () => {
  console.log(`listening on port 300`);
});
