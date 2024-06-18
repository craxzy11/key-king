import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserStatisticsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  gameStats:[{
    mode:{
        type:String,
        default:"Game Mode"
    },
    wpm: {
        type: Number,
        default: []
    },
    accuracy: {
        type: Number,
        default: 0
    }
  }],
  mistypedLetters: {
    type: [Number],
    default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
