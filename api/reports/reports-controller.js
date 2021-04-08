const mongoose = require('mongoose');
const logger = require('../../lib/logs');
const Excercise = require('./reports-model');
const Math = require('math');

let message = '';


const middlewareExcerciseId = async function(req, res, next) {
    try{
        const { id } = req.params;
        const excercise = await Excercise.findById({_id: id});
        if(!excercise){
            message = 'Error - Excercise not exist';
            logger.error(message + error);
            return res.status(401).json({message});
        }
        else{
            next();
        }
    }
    catch(error){
        message = 'Error - Problem find excercise';
        logger.error(`${message} = ${error}`);
        return res.status(401).json({message});
    }
};
const getAllexcercises = async function(req, res){
    try{
        logger.info('getAllexcercises');
        const excercisies = await Excercise.find();
        logger.info(`founded ${excercisies.length} excercisies`);
        return res.status(200).json(excercisies);
    }
    catch(error){
        message = 'Error - Failed searching for all excercisies';
        logger.error(`${message} + ${error}`);
        return res.status(400).json({message})
    }
};
const getExcercise = async function(req, res){
    try{
        logger.info('getExcercise');
        const excercise = await Excercise.findOne({ _id: req.params.id });
        return res.status(200).json({excercise});
    }
    catch (error) {return res.status(400).json({error});}
};
const createExcercise = async function(req, res){
    try{
        logger.info('createExcercise');
        if(!req.body.count || !req.body.distance || !req.body.multiple){
            logger.error('Error - Missing Params - can not complete valis creation without (count & distance & multiple ) params');
            return res.status(400).send('Error - Missing Params - can not complete valis creation without (count & distance & multiple ) params');
        }
        let newExcercise = new Excercise ({
            _id: mongoose.Types.ObjectId(),
            count: req.body.count,
            distance: req.body.distance,
            multiple: req.body.multiple,
        });
        if(req.body.step) newExcercise.step = req.body.step;
        if(req.body.tempo) newExcercise.tempo = req.body.tempo;
        if(req.body.break) newExcercise.break = req.body.break;
        if(req.body.isPullbuoy) newExcercise.isPullbuoy = req.body.isPullbuoy;
        if(req.body.isFins) newExcercise.isFins = req.body.isFins;
        if(req.body.isHandPaddles) newExcercise.isHandPaddles = req.body.isHandPaddles;
        if(req.body.isKickBoard) newExcercise.isKickBoard = req.body.isKickBoard;


        const excercise = await Excercise.findById({_id:newExcercise._id});
        if(!excercise){
            newExcercise.save();
            logger.info(`Success ${newExcercise}`);
            return res.status(200).json(newExcercise);
        }
        else{
            message = 'Error - Excercise already exist';
            logger.error(message);
            return res.status(400).json(message);
        }
    }
    catch(error){
        message = 'Error - Faild Create new Excercise';
        logger.error(`${message} : ${error}`);
        return res.status(400).json(message);
    }
};
const updateExcercise = async function(req, res){
    try{
        logger.info('updateExcercise');
        const excercise = await Excercise.findOne({ _id: req.params.id });
        if(req.body.count) excercise.count = req.body.count;
        if(req.body.step) excercise.distance = req.body.distance;
        if(req.body.step) excercise.multiple = req.body.multiple;
        if(req.body.step) excercise.step = req.body.step;
        if(req.body.tempo) excercise.tempo = req.body.tempo;
        if(req.body.break) excercise.break = req.body.break;
        if(req.body.isPullbuoy) excercise.isPullbuoy = req.body.isPullbuoy;
        if(req.body.isFins) excercise.isFins = req.body.isFins;
        if(req.body.isHandPaddles) excercise.isHandPaddles = req.body.isHandPaddles;
        if(req.body.isKickBoard) excercise.isKickBoard = req.body.isKickBoard;

        Movie.update({ _id: excercise._id });
        logger.info(excercise);
        return res.status(200).json({excercise});
    }
    catch (error) {return res.status(400).json({error});}
};
const deleteExcercise = async function(req, res){
    try{
        logger.info('deleteExcercise');
        const excercise = await Excercise.findById({ _id: req.params._id });
        if (excercise.isDeleted == false) excercise.isDeleted = true;
        excercise.update({ id: excercise.id });
        logger.info(excercise);
        return res.status(200).json({excercise});
    }
    catch (error) {return res.status(400).json({error});}
};
const getByStep = async function(req, res){
    try{
        //const excercisies = await Excercise.find({ step: {$regex: `${req.params.stepName}`}}).sort();
        logger.debug(req.params.stepName);
        const excercisies = await Excercise.find({ step: req.params.stepName});
        logger.info(excercisies.length);
        return res.status(200).json(excercisies);
    }
    catch (error) {return res.status(400).json({error});}
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
// New try to generic random function (3 in 1)
async function randomExercises(totalExercisesDistance, exerciseStep) {

    try {
        // findes all the relevant exercises
        let results = await Excercise.find({ step: exerciseStep });

        // Counters
        let counter = 0;
        let exerciseCounter = 0;

        // Arrays to save the exercises
        let allExercises = [];
        let returnExercises = [];

        // Saves all the relevant exercises to an array
        results.forEach(result => {
            counter += 1;
            allExercises.push(result);
        });

        // Temporary variable to count the exercises' distance
        let totaltemp = 0;

        while (totaltemp < totalExercisesDistance) {

            // Saves random int
            let num = getRandomInt(counter - 1);

            // Chooses random exercise and pushes to the array
            returnExercises.push(allExercises[num]);
            exerciseCounter += 1;

            // Sums the total distance that saved into the array
            totaltemp += (allExercises[num].distance * allExercises[num].count);

            // Removes the exercise that added from all exercises' array
            allExercises.slice(num);
        }

        // logger.warn(`totalExercisesDistance ${totalExercisesDistance}`);
        // logger.warn(`totaltemp ${totaltemp}`);

        // In case that the distance is higher than required
        if (totaltemp > totalExercisesDistance) {

            let temp = returnExercises.pop();

            // logger.warn(`temp ${temp.distance * temp.count}`);
            totaltemp -= (temp.distance * temp.count);

            // logger.warn(`totaltemp after temp ${totaltemp}`);
            let diff = totalExercisesDistance - totaltemp;

            // logger.warn(`diff ${diff}`);
            let i = 0;

            // Empty the array
            allExercises = [];

            // Fills the array with the relevant exercises
            results.forEach(result => {
                counter += 1;
                allExercises.push(result);
            });

            // Searches for exercise that will match the missing distance
            while (allExercises.length > i) {
                if (allExercises[i].distance * allExercises[i].count == diff) {
                    returnExercises.push(allExercises[i]);
                    totaltemp += (allExercises[i].distance * allExercises[i].count);
                    // logger.warn(`totaltemp in if ${totaltemp}`);
                    i = allExercises.length;
                }
                i += 1;
            }
        }

        return returnExercises;
    }

    catch (error) {
        logger.error(`error of randomExercise ${error}`);
        return res.status(400).json({ error });
    }
}

const sendParamsRandom = async function (req, res) {
    try {
        logger.info('random');
        logger.debug(req.body);
        let distance = req.body.distance;
        let isFins = req.body.isFins;
        let isPullbuoy = req.body.isPullbuoy;
        let isHandPaddles = req.body.isHandPaddles;
        let isKickBoard = req.body.isKickBoard;
        logger.debug(`distance: ${distance} , isFins: ${isFins} , isPullbuoy: ${isPullbuoy} , isHandPaddles: ${isHandPaddles} , isKickBoard: ${isKickBoard} ,`);

        // relation 1,3,1
        let warmupDis = distance * 0.2;
        let mainsetDis = distance * 0.6;
        let warmdownDis = distance * 0.2;

        // Gets random warm up
        let workout = await randomExercises(warmupDis, 'Warm up');
        logger.info(`warmup function done`);
        
        // Gets random main set
        let workout2 = await randomExercises(mainsetDis, 'Main set');
        workout2.forEach(element => {
            workout.push(element);
        });
        //workout.push(await randomExercises(mainsetDis, 'Main set'));
        logger.info(`mainset function done`);

        // Gets random warm down
        let workout3 = await randomExercises(warmdownDis, 'Swim Down');
        workout3.forEach(element => {
            workout.push(element);
        });
        logger.info(`warmdown function done`);

        

        // logger.debug(`The workout: `);
        // workout.forEach(exer2 => {
        //     logger.warn(exer2);
        // });

        return res.status(200).json( workout );
    }
    catch (error) {
        logger.error(`random - ${error}`);
        return res.status(400).json({ error });
    }
}


module.exports =  { middlewareExcerciseId, getAllexcercises, getExcercise, createExcercise, updateExcercise, deleteExcercise, getByStep, sendParamsRandom  };
