import gradient from "gradient-string";

export const grassGradient = gradient([
    "#A8E6CF",
    "#56ab2f", 
    "#00b894" 
])

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
