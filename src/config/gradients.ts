import gradient from "gradient-string";

export const grassGradient = gradient([
    "#A8E6CF",
    "#56ab2f", 
    "#00b894" 
])

export const oceanGradient = gradient([
    "#00B4DB",
    "#0083B0" 
]);

export const sunsetGradient = gradient([
    "#ff7e5f",
    "#feb47b"  
]);

export const purpleHazeGradient = gradient([
    "#654ea3", 
    "#eaafc8"  
]);

export const neonGlowGradient = gradient([
    "#39ff14",
    "#f90093"  
]);

export const fireGradient = gradient([
    "#f12711", 
    "#f5af19" 
]);

export const kingGradient = gradient(["#FFD700", "#FFF700"])


export function randomGradient() {
    const grads = [
        "#ff0062",
        "#00b4fc",
        "#27e2a4",
        "#ec9a00",
        "#435f7a"
    ];
      
    return gradient([grads[Math.floor(Math.random() * grads.length)],grads[Math.floor(Math.random() * grads.length)]]);
}
