import { modelErrorHandler, ErrorHandler } from "../utils/error.js";
import { textLoader } from "../middleware/TextLoader.js"

export const textGenerator = (req, res) => {
    const queries = req.query;
    const timeMode = queries.timeMode;
    const theme = queries.theme;
    // const text=await textLoader(`Give me an easy english latest ${theme} of 200 words ` );
    try {
        const text = async () => {
            try {
                let texts = await textLoader(`Give me a   ${theme} of 200 words all small case and without punctuation marks `);
                console.log(texts);
                return res.status(200).json({ texts });
            }
            catch (err) {
                console.log(err);
                let texts = "once upon a time in a small village nestled between rolling hills there lived a young girl named lily she was curious and loved to explore the forests surrounding her village one day while wandering deeper into the woods than ever before she stumbled upon a hidden path covered in ivy and moss intrigued lily followed the path until she reached a shimmering pond at its end the water was crystal clear and in its reflection she saw not just her own image but the faint outline of a grand castle beneath the water's surface determined to uncover the mystery lily returned to the pond every day she began to notice that the reflection grew clearer with each visit eventually she saw a bridge leading to the castle with a leap of faith she stepped onto the bridge in the reflection to her amazement lily found herself standing at the entrance of the castle inside everything was made of glass reflecting light in beautiful patterns as she wandered through the castle she met a wise old woman who told her that the castle was a place of dreams accessible only to those with pure hearts and brave souls from that day on lily became a beacon of light in her village"
                return res.status(200).json({ texts });
            }
        }
        text();

    }
    catch (err) {
        console.log(err);
    }

}
