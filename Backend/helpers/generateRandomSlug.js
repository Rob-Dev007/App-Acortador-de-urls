const generateRandomSlug = ()=>{
    return Date.now() + toString(12) + Math.random().toString(12).substring(2)
};

export default generateRandomSlug;

