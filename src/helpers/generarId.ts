export const generarId = (): string => {
    return (
        Date.now().toString(32) +
        Math.random().toString(32).substring(0) +
        Date.now().toString(32)
    );
};
