import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserStatisticsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  registrationDate: {
    type: Date
  },
  wpm: {
    //wpm[0] will store the avg wpm of the first month after registration and so on
    type: [Number],
    default: []
  },
  accuracy: {
    //wpm[0] will store the avg accuracy of the first month after registration and so on
    type: [Number],
    default: []
  },
  mistypedLetters: {
    //count of mistyped characters 
    type: [Number],
    default:[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
      
  },
  dayStreak: {
    type: Number,
    default: 0
  },
  totalTimePlayed: {
    type: Number,
    default: 0
  },
  totalGamesPlayed:[{
    mode:{
        type:String,
        default:"Mode of the game"
    },
    games:{
        type:Number,
        default:0
    }
  }]
}, { timestamps: true });

const UserStats = mongoose.model('UserStats', UserStatisticsSchema);

export default UserStats;
