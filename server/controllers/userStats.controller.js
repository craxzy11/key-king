import User from "../models/User.model.js";
import { modelErrorHandler, ErrorHandler } from "../utils/error.js";
import UserStats from "../models/UserStats.model.js";
import DailyStats from "../models/DailyStats.model.js";



const recordStats = async (req, res, next) => {
    console.log("here");
    //make sure all data to send properly from frontend
    const {
        id,
        wpm,
        accuracy,
        mistypedLetters,
        time,  //indicates the time of the mode played
        mode,
    } = req.body;
    try {
        const user = await DailyStats.findOne({
            userId: id
        });
        if (user) {
            const normalizeDate = (date) => {
                const normalized = new Date(date);
                normalized.setUTCHours(0, 0, 0, 0);
                return normalized;
            };

            const date1 = user.date;
            const date2 = new Date();

            const areDatesEqual = (d1, d2) => {
                return normalizeDate(d1).getTime() === normalizeDate(d2).getTime();
            };

            if (areDatesEqual(date1,date2) == true) {
               user.gameStats.push({
                mode,
                wpm,
                accuracy
               }) 

                for(let i=0;i<256;i++){
                    user.mistypedLetters[i]=(user.mistypedLetters[i]||0)+(mistypedLetters[i]||0);
                }

                user.totalGamesPlayed+=1;
                user.totalTimePlayed+=time;
                await user.save();
                console.log(user);
                res.status(200).json({ message: "Stats recorded successfully" });

            }
            else{
                try {
                    const result = await DailyStats.deleteOne({ userId: userId });
                    const newDailyStats=new DailyStats({
                        userId:id,
                        date:new Date(),
                        gameStats:{
                            mode,wpm,accuracy
                        },
                        mistypedLetters,
                        totalTimePlayed: time,
                        totalGamesPlayed: 1
                    })
                    console.log(newDailyStats);
                    await newDailyStats.save();
                    res.status(201).json({ message: "New stats recorded successfully" });
                } catch (err) {
                    console.error('Error deleting document:', err);
                }
            }
        }
        else{
            // console.log("here");
            const newDailyStats=new DailyStats({
                userId:id,
                date:new Date(),
                gameStats:{
                    mode,wpm,accuracy
                },
                mistypedLetters,
                totalTimePlayed: time,
                totalGamesPlayed: 1
            })
            console.log(newDailyStats);
            await newDailyStats.save();
            res.status(201).json({ message: "New stats recorded successfully" });
        }
    
    } catch (err) {
        modelErrorHandler(err, next);
    }
};


export {  recordStats };