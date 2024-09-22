import Particles from "react-tsparticles";
import {loadSlim} from "tsparticles-slim";
//import {loadFull} from "tsparticles";
import { useCallback, useMemo } from "react";


const ParticlesComponent = () => {
    const options = useMemo(()=>{
      return{
        background:{
          color: "var(--body-background)",
        },
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        interactivity:{
          events : {
            onClick:{
              enable: true,
              mode: "push",
            },
  
            onHover:{
              enable: true,
              mode: "repulse"
            }
          }
        },
        particles: {
          number: {
              value: 58,
          },
          move: {
              enable: true,
              speed: {min:1, max:4}
          },
          size: {
              value: {min:1, max:4}
          },
          shape: {
              type: "circle",
          },
          links:{
            enable: true,
            distance: 180,
            color:{
              value: "#006283"
            }
          },
          opacity:{
            value: {min: 0.2, max: 0.8}
          },
          color:{
            value: "#00afe9"
          }
          
      },

      };  
    },[]);

    const particlesInit = useCallback(async (engine)=>{
        await loadSlim(engine);
    },[]);


    return <Particles className="particles-container" init={particlesInit} options={options}/>
    
}
 
export default ParticlesComponent;