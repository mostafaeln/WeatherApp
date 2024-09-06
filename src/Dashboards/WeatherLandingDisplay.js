import AnimatedText from "../Components/AnimatedText"
import { motion } from "framer-motion"

export default function WeatherLandingDisplay({isNightTime ,isInfoShown ,weatherIcon , location ,weather ,ShowInfo ,locationHandler ,OnOpen ,addedCities})
{
    return(
    <>
    <h1 className="text-4xl font-bold mb-4 mt-5">
          {isNightTime ?<AnimatedText text={"Good Evening!" } type="easeIn" delay={0.25}/> :<AnimatedText text={"Good Morning!" } type="easeIn" delay={0.25}/>}
        </h1>
        <motion.div
          className={`${isNightTime ? 'bg-blue-700' : 'bg-blue-800'} p-8 rounded-lg shadow-lg text-center w-full max-w-md`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {weather ? (
            <div className="flex flex-row">
              <motion.img
                src={weatherIcon}
                className="w-28 h-28 mb-4"
                alt="Weather Icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5  ,delay:1}}
              />
              <div className="flex flex-col ml-20">
                <h1
                  className="text-2xl font-semibold"
                >
                  <AnimatedText text={location } type="easeIn" delay={0.4}/>{}
                </h1>
                <motion.p
                  className="text-xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 ,delay:0.6 }}
                >
                  {weather.temp_C} °C
                </motion.p>
                <motion.p
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 ,delay:0.8 }}
                >
                  {weather.weatherDesc[0].value}
                </motion.p>
              </div>
            </div>
          ) : (
            <p>Loading......</p>
          )}
          <div className="flex justify-between mt-8">
            <motion.button
              className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100"
              onClick={OnOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={location==null}
            >
             <AnimatedText text={"Add More Cities"} type="easeIn" delay={1.2}/> 
            </motion.button>
            <motion.button
              className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100"
              onClick={ShowInfo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 ,delay:0.9}}
              
            >
              {isInfoShown ?  <AnimatedText text={ "Hide Info"} type="easeIn" delay={1.5}/> :<AnimatedText text={"Show Info"} type="easeOut" delay={1.8}/> }
            </motion.button>
          </div>
          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 , delay : 1 }}>
            {addedCities.length > 0 ? (
              <div  className="flex flex-col px-5">
                {addedCities.map((item ,index) => (
                  <motion.div key={index} className="flex flex-row items-center mb-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <p className="font-semibold flex-1">{item.name}</p>
                    <button className="px-2 text-white hover:bg-gray-800 rounded" onClick={() => locationHandler(item.name )}>
                    <AnimatedText text={"Choose" } type="easeIn" delay={0.4}/>
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p>No added cities.</p>
            )}
          </motion.div>
        </motion.div>
        </>
    );
}